// Street preaching income balance test
// Purpose: Verify players can afford van ($75) within 5-10 days through street preaching

import { describe, test, expect } from "vitest";
import Table from "cli-table3";
import colors from "colors/safe.js";
import { religions } from "../ts/_religions.js";
import { places } from "../ts/_places.js";
import { themes } from "../ts/_sermons.js";
import { gameSettings } from "../ts/variables/_gameSettings.js";
import { my } from "../ts/variables/_my.js";
import { simulateStreetPreaching } from "./simulators/street-preaching-simulator.js";

// VARIABLES FOR OUR TESTS
const maxSpicePerDay = 3;
const totalVanCost = gameSettings.van.cost + gameSettings.van.fixedGasPrice;

// Helper function to select random topics (matching game logic)
function selectRandomThemes(count = 3) {
  const shuffled = [...themes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to simulate spice purchasing logic
function simulateSpicePurchase(playerMoney, spiceConsumed, spiceRequired) {
  const spiceNeeded = Math.max(0, spiceRequired - spiceConsumed);
  const maxAffordable = Math.floor(playerMoney / gameSettings.spice.pricePerUnit);
  const targetPurchase = Math.min(3, spiceNeeded); // Buy 1-3 spice as mentioned in requirements
  const actualPurchase = Math.min(targetPurchase, maxAffordable);
  const cost = actualPurchase * gameSettings.spice.pricePerUnit;

  return {
    spicePurchased: actualPurchase,
    cost: cost,
    canAfford: cost <= playerMoney,
  };
}

// Helper function to calculate spice multiplier (from game logic)
function calculateSpiceMultiplier(consumed, required) {
  const shortage = Math.max(0, required - consumed);
  const excess = Math.max(0, consumed - required);

  let multiplier = 1;

  if (shortage > 0) {
    // Apply penalty for not meeting requirements
    const penalty = Math.min(gameSettings.spice.maxPenalty, shortage * gameSettings.spice.penaltyPerUnit);
    multiplier = 1 - penalty;
  } else if (excess > 0) {
    // Apply bonus for excess consumption
    const bonus = Math.min(gameSettings.spice.maxBonus, excess * gameSettings.spice.bonusPerUnit);
    multiplier = 1 + bonus;
  }

  return Math.max(0.1, multiplier); // Never go below 10% effectiveness
}

describe("Street Preaching Income Balance Test", () => {
  test("Paired comparison: Spice vs No Spice using same sermon topics - 10 simulation runs", () => {
    console.log("\\n=== STREET PREACHING INCOME BALANCE TEST ===");
    console.log(`Van cost: $${totalVanCost} (includes ${gameSettings.van.fixedGasPrice} for gas)`);
    console.log(`Spice price per unit: $${gameSettings.spice.pricePerUnit}`);
    console.log(`Starting location: ${places[0].name} (${places[0].totalPopulation.toLocaleString()} population)`);
    console.log("🔬 PAIRED COMPARISON: Each run tests both WITH and WITHOUT spice using identical sermon topics");
    console.log("");

    const startingPlace = places[0]; // Use starting location
    const results = [];

    // Run 10 paired simulations (each run tests both spice and no-spice scenarios)
    for (let run = 1; run <= 10; run++) {
      // Generate the same sermon topics for both scenarios to eliminate randomness
      const fixedTopics = selectRandomThemes(3);

      // Create a modified simulation function that uses fixed topics
      const simulateWithFixedTopics = (useSpice) => {
        let playerMoney = 0;
        let spiceRequired = 2; // Starting addiction level from my.spice.requiredAmount
        let day = 1;

        const dailyResults = [];
        let totalMoneyEarned = 0; // Track total earnings across all days

        while (day <= 100 && playerMoney < totalVanCost) {
          // Start each day with 0 spice consumed
          let spiceConsumed = 0;

          // Try to buy spice at start of day (up to $15 as per requirements) - only if useSpice is true
          let spicePurchase = { spicePurchased: 0, cost: 0, canAfford: true };
          if (useSpice) {
            spicePurchase = simulateSpicePurchase(playerMoney, spiceConsumed, spiceRequired);
            if (spicePurchase.canAfford && spicePurchase.cost <= 15) {
              playerMoney -= spicePurchase.cost;
              spiceConsumed = spicePurchase.spicePurchased;
            }
          }

          // Calculate spice multiplier for preaching effectiveness
          const spiceMultiplier = calculateSpiceMultiplier(spiceConsumed, spiceRequired);

          // Use the SAME fixed topics for both scenarios
          const todaysTopics = fixedTopics;

          // Simulate street preaching with spice effects
          const preachingResult = simulateStreetPreaching(startingPlace, todaysTopics, spiceMultiplier);

          // Add donations to money and track total earnings
          playerMoney += preachingResult.donations;
          totalMoneyEarned += preachingResult.donations;

          // Calculate addiction progression (from game logic)
          const excess = Math.max(0, spiceConsumed - spiceRequired);
          const addictionIncrease = excess > 0 ? Math.round(excess * gameSettings.spice.addictionProgression) : 0;

          // Record daily results
          dailyResults.push({
            day: day,
            startingMoney: playerMoney - preachingResult.donations + spicePurchase.cost,
            spiceRequired: spiceRequired,
            spiceConsumed: spiceConsumed,
            spiceCost: spicePurchase.cost,
            spiceMultiplier: spiceMultiplier,
            crowdSize: preachingResult.crowdSize,
            liked: preachingResult.liked,
            donations: preachingResult.donations,
            endingMoney: playerMoney,
            addictionIncrease: addictionIncrease,
            canAffordVan: playerMoney >= totalVanCost,
          });

          // Apply addiction increase for next day (only if using spice)
          if (useSpice) {
            spiceRequired += addictionIncrease;
          }

          day++;
        }

        return {
          totalDays: day - 1,
          finalMoney: playerMoney,
          totalMoneyEarned: totalMoneyEarned,
          canAffordVan: playerMoney >= totalVanCost,
          dailyResults: dailyResults,
          spiceRequirement: spiceRequired,
        };
      };

      // Run both scenarios with the same topics
      const withSpiceSimulation = simulateWithFixedTopics(true);
      const noSpiceSimulation = simulateWithFixedTopics(false);

      // Calculate min/max daily earnings for both
      const withSpiceEarnings = withSpiceSimulation.dailyResults.map((day) => day.donations);
      const noSpiceEarnings = noSpiceSimulation.dailyResults.map((day) => day.donations);

      // Add WITH SPICE result
      results.push({
        run: run,
        scenario: "WITH",
        totalSpiceTaken: withSpiceSimulation.dailyResults.reduce((sum, day) => sum + day.spiceConsumed, 0),
        totalMoneyEarned: withSpiceSimulation.totalMoneyEarned,
        finalMoney: withSpiceSimulation.finalMoney,
        daysUntilVanAffordable: withSpiceSimulation.canAffordVan ? withSpiceSimulation.totalDays : -1,
        success: withSpiceSimulation.canAffordVan,
        minDailyEarnings: Math.min(...withSpiceEarnings),
        maxDailyEarnings: Math.max(...withSpiceEarnings),
      });

      // Add NO SPICE result
      results.push({
        run: run,
        scenario: "NO",
        totalSpiceTaken: noSpiceSimulation.dailyResults.reduce((sum, day) => sum + day.spiceConsumed, 0),
        totalMoneyEarned: noSpiceSimulation.totalMoneyEarned,
        finalMoney: noSpiceSimulation.finalMoney,
        daysUntilVanAffordable: noSpiceSimulation.canAffordVan ? noSpiceSimulation.totalDays : -1,
        success: noSpiceSimulation.canAffordVan,
        minDailyEarnings: Math.min(...noSpiceEarnings),
        maxDailyEarnings: Math.max(...noSpiceEarnings),
      });
    }

    // Expected criteria - simplified to min/max expected days
    const expectedMinDays = 4;
    const expectedMaxDays = 9;

    console.log("");
    console.log("=== EXPECTED CRITERIA ===");
    console.log(`• Target range: ${expectedMinDays}-${expectedMaxDays} days until van`);
    console.log(`• Too Easy: Average < ${expectedMinDays} days`);
    console.log(`• Too Hard: Average > ${expectedMaxDays} days`);
    console.log(`• Success rate should be: ≥80% of runs`);

    console.log("");
    console.log("=== SIMULATION RESULTS TABLE ===");

    // Create a nice table with colors
    const table = new Table({
      head: ["Run", "Spice", "Total $", "Daily", "Van Day", "Result"],
      colWidths: [5, 12, 16, 16, 10, 12],
    });

    results.forEach((result) => {
      let resultStr;
      let resultColor;

      if (!result.success) {
        resultStr = "FAILED";
        resultColor = colors.yellow(resultStr);
      } else {
        const days = result.daysUntilVanAffordable;

        if (days < expectedMinDays) {
          resultStr = "TOO EASY";
          resultColor = colors.green(resultStr);
        } else if (days > expectedMaxDays) {
          resultStr = "TOO HARD";
          resultColor = colors.red(resultStr);
        } else {
          resultStr = "GOOD";
          resultColor = colors.white(resultStr);
        }
      }

      const dailyRange = `$${result.minDailyEarnings.toFixed(0)}-${result.maxDailyEarnings.toFixed(0)}`;
      const daysStr = result.success ? result.daysUntilVanAffordable.toString() : "FAILED";

      table.push([result.run, result.totalSpiceTaken, "$" + result.totalMoneyEarned.toFixed(0), dailyRange, daysStr, resultColor]);
    });

    console.log(table.toString());

    // Separate results by scenario for analysis
    const spiceResults = results.filter((r) => r.scenario === "WITH");
    const noSpiceResults = results.filter((r) => r.scenario === "NO");

    // Calculate statistics for combined results
    const allSuccessfulRuns = results.filter((r) => r.success);
    const allDaysTaken = allSuccessfulRuns.map((r) => r.daysUntilVanAffordable);
    const avgAllDays = allDaysTaken.length > 0 ? allDaysTaken.reduce((sum, days) => sum + days, 0) / allDaysTaken.length : 0;
    const minAllDays = allDaysTaken.length > 0 ? Math.min(...allDaysTaken) : 0;
    const maxAllDays = allDaysTaken.length > 0 ? Math.max(...allDaysTaken) : 0;

    // Calculate spice-specific statistics
    const spiceSuccessful = spiceResults.filter((r) => r.success);
    const noSpiceSuccessful = noSpiceResults.filter((r) => r.success);

    const spiceDays = spiceSuccessful.map((r) => r.daysUntilVanAffordable);
    const noSpiceDays = noSpiceSuccessful.map((r) => r.daysUntilVanAffordable);

    const avgSpiceDays = spiceDays.length > 0 ? spiceDays.reduce((sum, days) => sum + days, 0) / spiceDays.length : 0;
    const avgNoSpiceDays = noSpiceDays.length > 0 ? noSpiceDays.reduce((sum, days) => sum + days, 0) / noSpiceDays.length : 0;

    // Count successful runs within target range (combined)
    const withinTarget = allSuccessfulRuns.filter((r) => r.daysUntilVanAffordable >= expectedMinDays && r.daysUntilVanAffordable <= expectedMaxDays).length;
    const offTarget = allSuccessfulRuns.length - withinTarget;

    // Calculate additional statistics
    const avgSpice = spiceResults.reduce((sum, r) => sum + r.totalSpiceTaken, 0) / spiceResults.length; // Only average spice-using runs
    const avgTotalMoney = results.reduce((sum, r) => sum + r.totalMoneyEarned, 0) / results.length;
    const avgSpiceMoney = spiceResults.reduce((sum, r) => sum + r.totalMoneyEarned, 0) / spiceResults.length;
    const avgNoSpiceMoney = noSpiceResults.reduce((sum, r) => sum + r.totalMoneyEarned, 0) / noSpiceResults.length;

    console.log("");
    console.log("=== SUMMARY STATISTICS ===");
    console.log(`🟢 Within Target Range:       ${withinTarget}/20 (${Math.round(withinTarget * 5)}%)`);
    console.log(`🟡 Outside Target Range:      ${offTarget}/20 (${Math.round(offTarget * 5)}%)`);
    console.log(`📊 Average Days Until Van:    ${avgAllDays.toFixed(1)} days (combined)`);
    console.log(`⏰ Fastest Run:               ${minAllDays} days`);
    console.log(`🐌 Slowest Run:               ${maxAllDays} days`);
    console.log(`💊 Average Spice Consumed:    ${avgSpice.toFixed(1)} units (spice runs only)`);
    console.log(`💰 Average Total Money Earned: $${avgTotalMoney.toFixed(0)} (combined)`);
    console.log("");
    console.log("=== SPICE COMPARISON ===");
    console.log(`📈 Average Days (With Spice):    ${avgSpiceDays.toFixed(1)} days`);
    console.log(`📉 Average Days (No Spice):      ${avgNoSpiceDays.toFixed(1)} days`);
    console.log(
      `⚖️  Time Difference:             ${(avgSpiceDays - avgNoSpiceDays).toFixed(1)} days ${avgSpiceDays > avgNoSpiceDays ? "(slower with spice)" : avgSpiceDays < avgNoSpiceDays ? "(faster with spice)" : "(no difference)"}`,
    );
    console.log(`💰 Average Money (With Spice):   $${avgSpiceMoney.toFixed(0)}`);
    console.log(`💰 Average Money (No Spice):     $${avgNoSpiceMoney.toFixed(0)}`);
    console.log(
      `💸 Money Difference:             $${(avgSpiceMoney - avgNoSpiceMoney).toFixed(0)} ${avgSpiceMoney > avgNoSpiceMoney ? "(more with spice)" : "(less with spice)"}`,
    );

    // Determine overall balance assessment
    const isTooEasy = avgAllDays < expectedMinDays;
    const isTooHard = avgAllDays > expectedMaxDays;
    const hasGoodSuccessRate = allSuccessfulRuns.length >= 16; // 80% of 20 total runs

    // Only fail the test if there are critical issues, but provide detailed feedback
    const passedBasicCriteria = hasGoodSuccessRate && !isTooEasy && !isTooHard;

    console.log("");
    if (!passedBasicCriteria) {
      console.log("❌ TEST FAILED: Critical balance issues detected");
      console.log("RECOMMENDED ACTIONS:");
      if (isTooEasy) {
        console.log("• TOO EASY: Average < 5 days - reduce donation amounts, crowd sizes, or like chances");
      }
      if (isTooHard) {
        console.log("• TOO HARD: Average > 10 days - increase donation amounts, crowd sizes, or reduce spice costs");
      }
      if (!hasGoodSuccessRate) {
        console.log("• Low success rate suggests fundamental balance problems");
      }
    } else {
      if (isTooEasy) {
        console.log("⚠️  TEST PASSED: Balance slightly too easy but acceptable");
      } else if (isTooHard) {
        console.log("⚠️  TEST PASSED: Balance slightly too hard but acceptable");
      } else {
        console.log("✅ TEST PASSED: Balance is good");
      }
    }

    // Spice impact conclusion
    console.log("");
    console.log("=== SPICE IMPACT CONCLUSION ===");
    if (avgSpiceDays < avgNoSpiceDays - 0.5) {
      console.log("✅ Spice provides a meaningful advantage - reduces time to van");
    } else if (avgSpiceDays > avgNoSpiceDays + 0.5) {
      console.log("⚠️  Spice is counterproductive - increases time to van (cost vs benefit issue)");
    } else {
      console.log("🤔 Spice has neutral time impact - may need rebalancing for clearer benefit/cost tradeoff");
    }

    // Simple assertion based on simplified criteria
    expect(passedBasicCriteria).toBe(true);
  });
});
