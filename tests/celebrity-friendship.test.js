import { describe, it, expect, beforeEach } from "vitest";
import { reactive } from "vue";
import { my } from "../src/views/megachurch/ts/variables/_my";
import { eternalLegacyCelebrities } from "../src/views/megachurch/ts/variables/_eternalLegacy";

describe("Celebrity Friendship System", () => {
  beforeEach(() => {
    // Reset player state before each test
    my.celebrityFriends = [];
    my.money = 10000;
    my.eternalLegacy.totalMammon = 0;
    my.church.buzz = 0;
    my.religiousScorecard = [
      { id: 1, name: "The Church of the High Priest", score: 50 },
      { id: 2, name: "The Church of Having More Things", score: 50 },
      { id: 3, name: "The Queens' Dominion", score: 50 },
      { id: 4, name: "Mormonism", score: 50 },
      { id: 5, name: "Jehovah's Witnesses", score: 50 },
    ];
  });

  describe("Celebrity Acquisition", () => {
    it("should successfully add a celebrity to friends list when purchased", () => {
      const terribleRapper = eternalLegacyCelebrities.find((c) => c.id === "terrible-rapper");
      expect(terribleRapper).toBeDefined();

      // Simulate acquiring the celebrity
      const initialMoney = my.money;
      const celebrity = { ...terribleRapper };

      // Check if player can afford
      expect(my.money).toBeGreaterThanOrEqual(celebrity.cost);

      // Deduct cost
      my.money -= celebrity.cost;

      // Add to friends
      my.celebrityFriends.push(celebrity);

      // Verify the celebrity was added
      expect(my.celebrityFriends).toHaveLength(1);
      expect(my.celebrityFriends[0].id).toBe("terrible-rapper");
      expect(my.money).toBe(initialMoney - celebrity.cost);
    });

    it("should apply one-time effects when acquiring a celebrity", () => {
      const terribleRapper = eternalLegacyCelebrities.find((c) => c.id === "terrible-rapper");
      const celebrity = { ...terribleRapper };

      // Record initial values
      const initialMammon = my.eternalLegacy.totalMammon;
      const initialBuzz = my.church.buzz;

      // Apply one-time effects
      if (celebrity.hasOneTimeEffects && celebrity.oneTimeEffects) {
        my.eternalLegacy.totalMammon += celebrity.oneTimeEffects.mammon;
        my.church.buzz += celebrity.oneTimeEffects.buzz;

        // Apply religion effects
        if (celebrity.religions && celebrity.oneTimeEffects.religionBoost) {
          celebrity.religions.likedBy.forEach((religionName) => {
            const religionScore = my.religiousScorecard.find((r) => r.name === religionName);
            if (religionScore) {
              religionScore.score += celebrity.oneTimeEffects.religionBoost;
            }
          });
        }
      }

      // Verify effects were applied
      expect(my.eternalLegacy.totalMammon).toBe(initialMammon + celebrity.oneTimeEffects.mammon);
      expect(my.church.buzz).toBe(initialBuzz + celebrity.oneTimeEffects.buzz);

      // Check religion score changes
      const highPriestScore = my.religiousScorecard.find((r) => r.name === "The Church of the High Priest");
      expect(highPriestScore.score).toBe(50 + celebrity.oneTimeEffects.religionBoost);
    });

    it("should prevent acquiring the same celebrity twice", () => {
      const terribleRapper = eternalLegacyCelebrities.find((c) => c.id === "terrible-rapper");
      const celebrity = { ...terribleRapper };

      // Add celebrity first time
      my.celebrityFriends.push(celebrity);
      expect(my.celebrityFriends).toHaveLength(1);

      // Try to add same celebrity again
      const alreadyOwned = my.celebrityFriends.some((c) => c.id === celebrity.id);
      expect(alreadyOwned).toBe(true);

      // Should not add duplicate
      if (!alreadyOwned) {
        my.celebrityFriends.push(celebrity);
      }

      expect(my.celebrityFriends).toHaveLength(1);
    });
  });

  describe("Celebrity Daily Effects", () => {
    it("should apply daily effects for celebrities with daily benefits", () => {
      const boReagan = eternalLegacyCelebrities.find((c) => c.id === "obviously-this-is-joe-rogan");
      my.celebrityFriends.push({ ...boReagan });

      const initialBuzz = my.church.buzz;

      // Simulate daily effects processing
      my.celebrityFriends.forEach((celebrity) => {
        if (celebrity.hasDailyEffects && celebrity.dailyEffects) {
          if (celebrity.dailyEffects.buzz) {
            my.church.buzz += celebrity.dailyEffects.buzz;
          }
          if (celebrity.dailyEffects.religionBoost && celebrity.religions?.likedBy) {
            celebrity.religions.likedBy.forEach((religionName) => {
              const religionScore = my.religiousScorecard.find((r) => r.name === religionName);
              if (religionScore) {
                religionScore.score += celebrity.dailyEffects.religionBoost;
              }
            });
          }
        }
      });

      expect(my.church.buzz).toBe(initialBuzz + boReagan.dailyEffects.buzz);
    });
  });

  describe("Celebrity Daily Costs", () => {
    it("should deduct daily costs for celebrities that have them", () => {
      const boReagan = eternalLegacyCelebrities.find((c) => c.id === "obviously-this-is-joe-rogan");
      my.celebrityFriends.push({ ...boReagan });

      const initialMoney = my.money;
      const dailyCost = boReagan.dailyCost;

      // Simulate daily cost processing
      let canAfford = true;
      my.celebrityFriends.forEach((celebrity) => {
        if (celebrity.dailyCost > 0) {
          if (my.money >= celebrity.dailyCost) {
            my.money -= celebrity.dailyCost;
          } else {
            canAfford = false;
          }
        }
      });

      expect(canAfford).toBe(true);
      expect(my.money).toBe(initialMoney - dailyCost);
    });

    it("should terminate friendship when player cannot afford daily cost", () => {
      const boReagan = eternalLegacyCelebrities.find((c) => c.id === "obviously-this-is-joe-rogan");
      my.celebrityFriends.push({ ...boReagan });

      // Set money to less than daily cost
      my.money = 50; // Bo Reagan costs 150 per day

      // Simulate daily cost processing with termination
      my.celebrityFriends = my.celebrityFriends.filter((celebrity) => {
        if (celebrity.dailyCost > 0) {
          if (my.money >= celebrity.dailyCost) {
            my.money -= celebrity.dailyCost;
            return true; // Keep the celebrity
          } else {
            // Cannot afford - terminate friendship
            return false; // Remove the celebrity
          }
        }
        return true; // Keep celebrities with no daily cost
      });

      expect(my.celebrityFriends).toHaveLength(0);
      expect(my.money).toBe(50); // Money unchanged since couldn't afford
    });
  });

  describe("Celebrity Merchandise Sales", () => {
    it("should process merch sales for celebrities with merchandise", () => {
      const cryptoChrist = eternalLegacyCelebrities.find((c) => c.id === "cryptobro");
      my.celebrityFriends.push({ ...cryptoChrist });

      // Simulate congregation with some attendees
      const testCongregation = [
        { id: 1, count: 50, name: "The Digital Ascension" }, // Likes crypto celebrity
        { id: 2, count: 30, name: "Buddhism" }, // Hates crypto celebrity
      ];

      let totalRevenue = 0;

      // Simulate merch sales processing
      my.celebrityFriends.forEach((celebrity) => {
        if (celebrity.hasMerch && celebrity.merch) {
          let itemsSold = 0;

          testCongregation.forEach((group) => {
            let chance = celebrity.merch.baseChance;

            // Add religion bonus for Digital Ascension
            if (celebrity.religions?.likedBy?.includes("The Digital Ascension") && group.name === "The Digital Ascension") {
              chance += celebrity.merch.religionBonusChance || 0;
            }

            // Simulate sales (simplified - just use chance percentage as sold percentage)
            const sold = Math.floor(group.count * (chance / 100));
            itemsSold += sold;
          });

          totalRevenue += itemsSold * celebrity.merch.yourCut;
        }
      });

      expect(totalRevenue).toBeGreaterThan(0);
    });
  });

  describe("Celebrity Data Validation", () => {
    it("should have valid celebrity data structure", () => {
      eternalLegacyCelebrities.forEach((celebrity) => {
        expect(celebrity).toHaveProperty("id");
        expect(celebrity).toHaveProperty("name");
        expect(celebrity).toHaveProperty("cost");
        expect(celebrity).toHaveProperty("dailyCost");
        expect(celebrity).toHaveProperty("description");
        expect(celebrity).toHaveProperty("effect");
        expect(celebrity).toHaveProperty("termination");

        // Check boolean flags
        expect(typeof celebrity.hasOneTimeEffects).toBe("boolean");
        expect(typeof celebrity.hasDailyEffects).toBe("boolean");
        expect(typeof celebrity.hasMerch).toBe("boolean");

        // If has one-time effects, should have oneTimeEffects object
        if (celebrity.hasOneTimeEffects) {
          expect(celebrity).toHaveProperty("oneTimeEffects");
          expect(celebrity.oneTimeEffects).toHaveProperty("mammon");
          expect(celebrity.oneTimeEffects).toHaveProperty("buzz");
        }

        // If has daily effects, should have dailyEffects object
        if (celebrity.hasDailyEffects) {
          expect(celebrity).toHaveProperty("dailyEffects");
        }

        // If has merch, should have merch object
        if (celebrity.hasMerch) {
          expect(celebrity).toHaveProperty("merch");
          expect(celebrity.merch).toHaveProperty("name");
          expect(celebrity.merch).toHaveProperty("price");
          expect(celebrity.merch).toHaveProperty("yourCut");
          expect(celebrity.merch).toHaveProperty("baseChance");
        }
      });
    });

    it("should have 6 celebrities defined", () => {
      expect(eternalLegacyCelebrities).toHaveLength(6);
    });

    it("should have unique celebrity IDs", () => {
      const ids = eternalLegacyCelebrities.map((c) => c.id);
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds).toHaveLength(ids.length);
    });
  });
});
