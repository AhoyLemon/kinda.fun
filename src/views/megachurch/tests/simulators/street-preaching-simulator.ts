// Street preaching simulation utility
// Core logic extracted from Megachurch.vue for reuse in tests

import { religions } from "../../ts/_religions.js";
import { gameSettings } from "../../ts/_variables.js";

export interface Person {
  religionId: number;
  religionName: string;
  reaction: "neutral" | "like" | "dislike";
}

export interface SimulationResult {
  location: string;
  topics: string[];
  crowdSize: number;
  liked: number;
  disliked: number;
  neutral: number;
  donations: number;
  crowd: Person[];
}

export function randomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Simulates street preaching with the exact same logic as the main game
 * @param place - The location where preaching occurs
 * @param selectedThemes - The themes being preached
 * @param spiceMultiplier - Optional spice multiplier (defaults to 1 for tests)
 */
export function simulateStreetPreaching(place: any, selectedThemes: any[], spiceMultiplier: number = 1): SimulationResult {
  const settings = gameSettings.streetPreaching;

  // === STEP 1: GATHER A CROWD === (exact copy from game)

  // Calculate crowd size with location population influence and random variation
  let crowdSize = settings.baseCrowdSize;

  // Adjust for location population (larger cities get bigger crowds)
  const populationFactor = Math.min(2.0, place.totalPopulation / 100000); // Cap at 2x for very large cities
  crowdSize = Math.floor(crowdSize * populationFactor);

  // Add random variation
  const variation = settings.randomCrowdVariation;
  const minCrowd = Math.floor(crowdSize * (1 - variation));
  const maxCrowd = Math.floor(crowdSize * (1 + variation));
  crowdSize = Math.floor(randomNumber(minCrowd, maxCrowd));

  // Apply spice multiplier
  crowdSize = Math.floor(crowdSize * spiceMultiplier);

  // Create individual people in the crowd with religions based on location weights
  const crowd: Person[] = [];
  const totalWeight = place.religions.reduce((sum: number, r: any) => sum + r.weight, 0);

  for (let i = 0; i < crowdSize; i++) {
    // Randomly assign religion based on weights
    const roll = Math.random() * totalWeight;
    let currentWeight = 0;

    for (const placeReligion of place.religions) {
      currentWeight += placeReligion.weight;
      if (roll <= currentWeight) {
        crowd.push({
          religionId: placeReligion.id,
          religionName: placeReligion.name,
          reaction: "neutral",
        });
        break;
      }
    }
  }

  // Build sermon data structures (simplified for testing)
  const sermonToday = {
    topics: selectedThemes.map((t) => ({ id: t.id, title: t.title })),
    likedBy: { tags: [] as any[], religions: [] as any[] },
    dislikedBy: { tags: [] as any[], religions: [] as any[] },
    mixedMessages: { tags: [] as any[], religions: [] as any[] },
  };

  // Build arrays from themes (exact copy from game logic)
  const tagWeights: Record<string, { liked: number; disliked: number }> = {};
  const religionWeights: Record<number, { name: string; liked: number; disliked: number }> = {};

  selectedThemes.forEach((theme) => {
    (theme.likedBy.tags || []).forEach((tag: string) => {
      if (!tagWeights[tag]) tagWeights[tag] = { liked: 0, disliked: 0 };
      tagWeights[tag].liked++;
    });
    (theme.dislikedBy.tags || []).forEach((tag: string) => {
      if (!tagWeights[tag]) tagWeights[tag] = { liked: 0, disliked: 0 };
      tagWeights[tag].disliked++;
    });
    (theme.likedBy.religions || []).forEach((rel: any) => {
      const name = typeof rel === "string" ? rel : rel.name || rel;
      const religion = religions.find((r) => r.name === name);
      if (religion) {
        if (!religionWeights[religion.id])
          religionWeights[religion.id] = {
            name: religion.name,
            liked: 0,
            disliked: 0,
          };
        religionWeights[religion.id].liked++;
      }
    });
    (theme.dislikedBy.religions || []).forEach((rel: any) => {
      const name = typeof rel === "string" ? rel : rel.name || rel;
      const religion = religions.find((r) => r.name === name);
      if (religion) {
        if (!religionWeights[religion.id])
          religionWeights[religion.id] = {
            name: religion.name,
            liked: 0,
            disliked: 0,
          };
        religionWeights[religion.id].disliked++;
      }
    });
  });

  sermonToday.likedBy.tags = Object.entries(tagWeights)
    .filter(([_, v]) => v.liked > 0)
    .map(([tag, v]) => ({ tag, weight: v.liked }));

  sermonToday.dislikedBy.tags = Object.entries(tagWeights)
    .filter(([_, v]) => v.disliked > 0)
    .map(([tag, v]) => ({ tag, weight: v.disliked }));

  sermonToday.likedBy.religions = Object.entries(religionWeights)
    .filter(([_, v]) => v.liked > 0)
    .map(([id, v]) => ({ id: Number(id), name: v.name, weight: v.liked }));

  sermonToday.dislikedBy.religions = Object.entries(religionWeights)
    .filter(([_, v]) => v.disliked > 0)
    .map(([id, v]) => ({ id: Number(id), name: v.name, weight: v.disliked }));

  sermonToday.mixedMessages.tags = Object.entries(tagWeights)
    .filter(([_, v]) => v.liked > 0 && v.disliked > 0)
    .map(([tag, v]) => ({ tag, liked: v.liked, disliked: v.disliked }));

  sermonToday.mixedMessages.religions = Object.entries(religionWeights)
    .filter(([_, v]) => v.liked > 0 && v.disliked > 0)
    .map(([id, v]) => ({
      id: Number(id),
      name: v.name,
      liked: v.liked,
      disliked: v.disliked,
    }));

  // === STEP 2: SERMON REACTIONS === (exact copy from game)

  // Process each person to see if they react to the sermon
  // As per docs: check dislikes first, then likes, skip mixed messages
  for (const person of crowd) {
    const religionData = religions.find((r) => r.id === person.religionId);
    if (!religionData) continue;

    // Check if this person's religion is in mixed messages (skip if so)
    const isReligionMixed = sermonToday.mixedMessages.religions.some((r) => r.id === person.religionId);
    if (isReligionMixed) continue;

    // STEP 2A: Check religion-based DISLIKES first
    const religionAttacked = sermonToday.dislikedBy.religions.some((r) => r.id === person.religionId);
    if (religionAttacked) {
      if (Math.random() * 100 < settings.dislikeChance.byReligion) {
        person.reaction = "dislike";
        continue; // Stop processing this person
      }
    }

    // STEP 2B: Check religion-based LIKES
    const religionPraised = sermonToday.likedBy.religions.some((r) => r.id === person.religionId);
    if (religionPraised) {
      if (Math.random() * 100 < settings.likeChance.byReligion) {
        person.reaction = "like";
        continue; // Stop processing this person
      }
    }

    // STEP 2C: Check tag-based DISLIKES (only if still neutral)
    if (person.reaction === "neutral") {
      for (const tagObj of sermonToday.dislikedBy.tags) {
        // Skip if tag is in mixed messages
        const tagNotMixed = !sermonToday.mixedMessages.tags.some((t) => t.tag === tagObj.tag);
        if (!tagNotMixed) continue;

        // Check if this person's religion likes this tag (which we're attacking)
        if (religionData.likes.includes(tagObj.tag as any)) {
          const chance = settings.dislikeChance.byTag * tagObj.weight;
          if (Math.random() * 100 < chance) {
            person.reaction = "dislike";
            break; // Stop processing tags for this person
          }
        }
      }
    }

    // STEP 2D: Check tag-based LIKES (only if still neutral)
    if (person.reaction === "neutral") {
      for (const tagObj of sermonToday.likedBy.tags) {
        // Skip if tag is in mixed messages
        const tagNotMixed = !sermonToday.mixedMessages.tags.some((t) => t.tag === tagObj.tag);
        if (!tagNotMixed) continue;

        // Check if this person's religion likes this tag (which we're praising)
        if (religionData.likes.includes(tagObj.tag as any)) {
          const chance = settings.likeChance.byTag * tagObj.weight;
          if (Math.random() * 100 < chance) {
            person.reaction = "like";
            break; // Stop processing tags for this person
          }
        }
      }
    }
  }

  // === STEP 3: COLLECT DONATIONS === (exact copy from game)

  let totalDonations = 0;
  const likers = crowd.filter((p) => p.reaction === "like");

  for (const liker of likers) {
    if (Math.random() * 100 < settings.donation.chance) {
      const donation = randomNumber(settings.donation.min, settings.donation.max);
      totalDonations += donation;
    }
  }

  return {
    location: place.name,
    topics: selectedThemes.map((t) => t.title),
    crowdSize,
    liked: likers.length,
    disliked: crowd.filter((p) => p.reaction === "dislike").length,
    neutral: crowd.filter((p) => p.reaction === "neutral").length,
    donations: Math.round(totalDonations * 100) / 100,
    crowd,
  };
}
