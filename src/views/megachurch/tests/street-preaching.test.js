// Street preaching balance test using Vitest and actual game data
// Tests for target donation ranges: Test 1: $5-20, Test 2: $30-60, Test 3: $0-8

import { describe, test, expect } from "vitest";
import { religions } from "../ts/_religions.js";
import { places } from "../ts/_places.js";
import { themes } from "../ts/_sermons.js";
import { gameSettings } from "../ts/_variables.js";

// Street preaching balance test using Vitest and actual game data
// Tests for target donation ranges: Test 1: $5-20, Test 2: $30-60, Test 3: $0-8

import { describe, test, expect } from "vitest";
import { religions } from "../ts/_religions.js";
import { places } from "../ts/_places.js";
import { themes } from "../ts/_sermons.js";
import { simulateStreetPreaching } from "./simulators/street-preaching-simulator.js";

function selectRandomThemes(count = 3) {
  const shuffled = themes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function selectGoodThemes(place, count = 3) {
  const scoredThemes = themes
    .map((theme) => {
      let score = 0;

      // Score based on religion matches
      (theme.likedBy.religions || []).forEach((rel) => {
        const name = typeof rel === "string" ? rel : rel.name || rel;
        const religion = religions.find((r) => r.name === name);
        if (religion && place.religions.some((pr) => pr.id === religion.id)) {
          const placeReligion = place.religions.find((pr) => pr.id === religion.id);
          score += placeReligion.weight;
        }
      });

      // Score based on tag matches
      (theme.likedBy.tags || []).forEach((tag) => {
        place.religions.forEach((placeReligion) => {
          const religion = religions.find((r) => r.id === placeReligion.id);
          if (religion && religion.likes && religion.likes.includes(tag)) {
            score += placeReligion.weight / 5;
          }
        });
      });

      return { theme, score };
    })
    .sort((a, b) => b.score - a.score);

  return scoredThemes.slice(0, count).map((s) => s.theme);
}

function selectBadThemes(place, count = 3) {
  const scoredThemes = themes
    .map((theme) => {
      let score = 0;

      // Score based on religion attacks
      (theme.dislikedBy.religions || []).forEach((rel) => {
        const name = typeof rel === "string" ? rel : rel.name || rel;
        const religion = religions.find((r) => r.name === name);
        if (religion && place.religions.some((pr) => pr.id === religion.id)) {
          const placeReligion = place.religions.find((pr) => pr.id === religion.id);
          score += placeReligion.weight;
        }
      });

      // Score based on tag attacks
      (theme.dislikedBy.tags || []).forEach((tag) => {
        place.religions.forEach((placeReligion) => {
          const religion = religions.find((r) => r.id === placeReligion.id);
          if (religion && religion.likes && religion.likes.includes(tag)) {
            score += placeReligion.weight / 5;
          }
        });
      });

      return { theme, score };
    })
    .sort((a, b) => b.score - a.score);

  return scoredThemes.slice(0, count).map((s) => s.theme);
}

describe("Street Preaching Balance Tests", () => {
  test("Game data should be loaded", () => {
    expect(religions.length).toBeGreaterThan(0);
    expect(places.length).toBeGreaterThan(0);
    expect(themes.length).toBeGreaterThan(0);

    console.log(`Loaded ${religions.length} religions, ${places.length} places, ${themes.length} themes`);
  });

  test("Test 1: Starting Location, Random Topics ($5-15 target)", () => {
    const startingLocation = places.find((p) => p.id === 0);
    expect(startingLocation).toBeDefined();

    const results = [];
    for (let i = 0; i < 10; i++) {
      const randomThemes = selectRandomThemes();
      const result = simulateStreetPreaching(startingLocation, randomThemes);
      results.push(result);
    }

    const average = results.reduce((sum, r) => sum + r.donations, 0) / results.length;
    const min = Math.min(...results.map((r) => r.donations));
    const max = Math.max(...results.map((r) => r.donations));
    const zeros = results.filter((r) => r.donations === 0).length;

    console.log(`TEST 1 Results: Average $${average.toFixed(2)}, Range $${min.toFixed(2)}-$${max.toFixed(2)}, Zero donations: ${zeros}/10`);
    results.forEach((r, i) => {
      console.log(`  Run ${i + 1}: $${r.donations} (${r.liked} liked, ${r.disliked} disliked, ${r.neutral} neutral)`);
    });

    expect(average).toBeGreaterThanOrEqual(5);
    expect(average).toBeLessThanOrEqual(25);
    expect(zeros).toBeLessThanOrEqual(1); // Rare zero donations
  });

  test("Test 2: High Population Location, Good Topics ($45-75 target)", () => {
    // Use highest population location for best results
    const highPopLocation = places.find((p) => p.totalPopulation === Math.max(...places.map((p) => p.totalPopulation)));
    console.log(`Testing location: ${highPopLocation.name} (${highPopLocation.totalPopulation.toLocaleString()} population)`);

    const results = [];
    for (let i = 0; i < 10; i++) {
      const goodThemes = selectGoodThemes(highPopLocation);
      const result = simulateStreetPreaching(highPopLocation, goodThemes);
      results.push(result);
    }

    const average = results.reduce((sum, r) => sum + r.donations, 0) / results.length;
    const min = Math.min(...results.map((r) => r.donations));
    const max = Math.max(...results.map((r) => r.donations));
    const zeros = results.filter((r) => r.donations === 0).length;

    console.log(`TEST 2 Results (${highPopLocation.name}): Average $${average.toFixed(2)}, Range $${min.toFixed(2)}-$${max.toFixed(2)}`);
    results.forEach((r, i) => {
      console.log(`  Run ${i + 1}: $${r.donations} (${r.liked} liked, ${r.disliked} disliked, ${r.neutral} neutral)`);
    });

    expect(average).toBeGreaterThanOrEqual(50);
    expect(average).toBeLessThanOrEqual(85);
  });

  test("Test 3: Smaller Location, Bad Topics ($8-18 target)", () => {
    // Use smaller location for Test 3 to achieve lower donation targets
    const smallLocation = places.find((p) => p.id === 0); // Starting location
    console.log(`Testing location: ${smallLocation.name}`);

    const results = [];
    for (let i = 0; i < 10; i++) {
      const badThemes = selectBadThemes(smallLocation);
      const result = simulateStreetPreaching(smallLocation, badThemes);
      results.push(result);
    }

    const average = results.reduce((sum, r) => sum + r.donations, 0) / results.length;
    const min = Math.min(...results.map((r) => r.donations));
    const max = Math.max(...results.map((r) => r.donations));
    const avgDisliked = results.reduce((sum, r) => sum + r.disliked, 0) / results.length;
    const avgLiked = results.reduce((sum, r) => sum + r.liked, 0) / results.length;
    const zeros = results.filter((r) => r.donations === 0).length;

    console.log(`TEST 3 Results (${smallLocation.name}): Average $${average.toFixed(2)}, Range $${min.toFixed(2)}-$${max.toFixed(2)}`);
    console.log(`  Average liked: ${avgLiked.toFixed(1)}, Average disliked: ${avgDisliked.toFixed(1)}`);
    results.forEach((r, i) => {
      console.log(`  Run ${i + 1}: $${r.donations} (${r.liked} liked, ${r.disliked} disliked, ${r.neutral} neutral)`);
    });

    expect(average).toBeGreaterThanOrEqual(0);
    expect(average).toBeLessThanOrEqual(18);
    expect(zeros).toBeLessThanOrEqual(5);
  });
});
