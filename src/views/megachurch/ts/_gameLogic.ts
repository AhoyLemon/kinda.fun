// Shared game logic functions that can be used by both the game and tests
// Extracted from Megachurch.vue to eliminate code duplication

import { randomNumber } from "../../../shared/js/_functions.js";
import { religions } from "./_religions.js";
import { gameSettings } from "./variables/_gameSettings.js";

export interface Person {
  religionId: number;
  religionName: string;
  reaction: "neutral" | "like" | "dislike";
}

export interface StreetPreachingResult {
  crowdSize: number;
  liked: number;
  disliked: number;
  neutral: number;
  donations: number;
  crowd: Person[];
}

/**
 * Calculate crowd size based on location and spice multiplier
 * Extracted from createStreetPreachingEffect in Megachurch.vue
 */
export function calculateCrowdSize(
  place: any,
  spiceMultiplier: number = 1,
): number {
  const settings = gameSettings.streetPreaching;

  // Calculate base crowd size
  let crowdSize = settings.baseCrowdSize;

  // Adjust for location population (larger cities get bigger crowds)
  const populationFactor = Math.min(2.0, place.totalPopulation / 100000); // Cap at 2x for very large cities
  crowdSize = Math.floor(crowdSize * populationFactor);

  // Add random variation
  const variation = settings.randomCrowdVariation;
  const minCrowd = Math.floor(crowdSize * (1 - variation));
  const maxCrowd = Math.floor(crowdSize * (1 + variation));
  crowdSize = randomNumber(minCrowd, maxCrowd);

  // Apply spice multiplier
  crowdSize = Math.floor(crowdSize * spiceMultiplier);

  return Math.max(1, crowdSize); // Always at least 1 person
}

/**
 * Generate a crowd of people with religions based on location weights
 * Extracted from createStreetPreachingEffect in Megachurch.vue
 */
export function generateCrowd(place: any, crowdSize: number): Person[] {
  const crowd: Person[] = [];
  const totalWeight = place.religions.reduce(
    (sum: number, r: any) => sum + r.weight,
    0,
  );

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

  return crowd;
}

/**
 * Build sermon data structure from selected themes
 * Extracted and simplified from createStreetPreachingEffect in Megachurch.vue
 */
export function buildSermonData(selectedThemes: any[]) {
  const sermonData = {
    topics: selectedThemes.map((t) => ({ id: t.id, title: t.title })),
    likedBy: { tags: [] as any[], religions: [] as any[] },
    dislikedBy: { tags: [] as any[], religions: [] as any[] },
    mixedMessages: { tags: [] as any[], religions: [] as any[] },
  };

  // Build tag and religion arrays from themes
  const tagWeights: Record<string, { liked: number; disliked: number }> = {};
  const religionWeights: Record<
    number,
    { name: string; liked: number; disliked: number }
  > = {};

  selectedThemes.forEach((theme) => {
    // Process liked tags
    (theme.likedBy.tags || []).forEach((tag: string) => {
      if (!tagWeights[tag]) tagWeights[tag] = { liked: 0, disliked: 0 };
      tagWeights[tag].liked++;
    });

    // Process disliked tags
    (theme.dislikedBy.tags || []).forEach((tag: string) => {
      if (!tagWeights[tag]) tagWeights[tag] = { liked: 0, disliked: 0 };
      tagWeights[tag].disliked++;
    });

    // Process liked religions
    (theme.likedBy.religions || []).forEach((rel: any) => {
      const name = typeof rel === "string" ? rel : rel.name || rel;
      const religion = religions.find((r) => r.name === name);
      if (religion) {
        if (!religionWeights[religion.id]) {
          religionWeights[religion.id] = {
            name: religion.name,
            liked: 0,
            disliked: 0,
          };
        }
        religionWeights[religion.id].liked++;
      }
    });

    // Process disliked religions
    (theme.dislikedBy.religions || []).forEach((rel: any) => {
      const name = typeof rel === "string" ? rel : rel.name || rel;
      const religion = religions.find((r) => r.name === name);
      if (religion) {
        if (!religionWeights[religion.id]) {
          religionWeights[religion.id] = {
            name: religion.name,
            liked: 0,
            disliked: 0,
          };
        }
        religionWeights[religion.id].disliked++;
      }
    });
  });

  // Build sermon arrays
  Object.entries(tagWeights).forEach(([tag, weights]) => {
    if (weights.liked > 0 && weights.disliked > 0) {
      // Mixed message
      sermonData.mixedMessages.tags.push({
        tag,
        weight: Math.min(weights.liked, weights.disliked),
      });
    } else if (weights.liked > 0) {
      sermonData.likedBy.tags.push({ tag, weight: weights.liked });
    } else if (weights.disliked > 0) {
      sermonData.dislikedBy.tags.push({ tag, weight: weights.disliked });
    }
  });

  Object.entries(religionWeights).forEach(([idStr, data]) => {
    const id = parseInt(idStr);
    if (data.liked > 0 && data.disliked > 0) {
      // Mixed message
      sermonData.mixedMessages.religions.push({ id, name: data.name });
    } else if (data.liked > 0) {
      sermonData.likedBy.religions.push({ id, name: data.name });
    } else if (data.disliked > 0) {
      sermonData.dislikedBy.religions.push({ id, name: data.name });
    }
  });

  return sermonData;
}

/**
 * Process crowd reactions to the sermon
 * Extracted from createStreetPreachingEffect in Megachurch.vue
 */
export function processCrowdReactions(crowd: Person[], sermonData: any): void {
  const settings = gameSettings.streetPreaching;

  for (const person of crowd) {
    const religionData = religions.find((r) => r.id === person.religionId);
    if (!religionData) continue;

    // Check if this person's religion is in mixed messages (skip if so)
    const isReligionMixed = sermonData.mixedMessages.religions.some(
      (r: any) => r.id === person.religionId,
    );
    if (isReligionMixed) continue;

    // STEP 1: Check religion-based DISLIKES first
    const religionAttacked = sermonData.dislikedBy.religions.some(
      (r: any) => r.id === person.religionId,
    );
    if (religionAttacked) {
      if (Math.random() * 100 < settings.dislikeChance.byReligion) {
        person.reaction = "dislike";
        continue; // Stop processing this person
      }
    }

    // STEP 2: Check religion-based LIKES
    const religionPraised = sermonData.likedBy.religions.some(
      (r: any) => r.id === person.religionId,
    );
    if (religionPraised) {
      if (Math.random() * 100 < settings.likeChance.byReligion) {
        person.reaction = "like";
        continue; // Stop processing this person
      }
    }

    // STEP 3: Check tag-based DISLIKES (only if still neutral)
    if (person.reaction === "neutral") {
      for (const tagObj of sermonData.dislikedBy.tags) {
        // Skip if tag is in mixed messages
        const tagNotMixed = !sermonData.mixedMessages.tags.some(
          (t: any) => t.tag === tagObj.tag,
        );
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

    // STEP 4: Check tag-based LIKES (only if still neutral)
    if (person.reaction === "neutral") {
      for (const tagObj of sermonData.likedBy.tags) {
        // Skip if tag is in mixed messages
        const tagNotMixed = !sermonData.mixedMessages.tags.some(
          (t: any) => t.tag === tagObj.tag,
        );
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
}

/**
 * Calculate donations from people who liked the sermon
 * Extracted from createStreetPreachingEffect in Megachurch.vue
 */
export function calculateDonations(
  crowd: Person[],
  spiceMultiplier: number = 1,
): number {
  const settings = gameSettings.streetPreaching;

  let totalDonations = 0;
  const likers = crowd.filter((p) => p.reaction === "like");

  for (const liker of likers) {
    if (Math.random() * 100 < settings.donation.chance) {
      const donation = randomNumber(
        settings.donation.min,
        settings.donation.max,
      );
      totalDonations += donation;
    }
  }

  // Apply spice multiplier to total donations (matching main game logic)
  totalDonations *= spiceMultiplier;

  return Math.round(totalDonations * 100) / 100; // Round to cents
}

/**
 * Main street preaching simulation function using actual game logic
 * This replaces the duplicated logic in street-preaching-simulator.ts
 */
export function simulateStreetPreachingCore(
  place: any,
  selectedThemes: any[],
  spiceMultiplier: number = 1,
): StreetPreachingResult {
  // Use actual game functions
  const crowdSize = calculateCrowdSize(place, spiceMultiplier);
  const crowd = generateCrowd(place, crowdSize);
  const sermonData = buildSermonData(selectedThemes);

  // Process reactions using actual game logic
  processCrowdReactions(crowd, sermonData);

  // Calculate donations using actual game logic
  const donations = calculateDonations(crowd, spiceMultiplier);

  // Count reactions
  const liked = crowd.filter((p) => p.reaction === "like").length;
  const disliked = crowd.filter((p) => p.reaction === "dislike").length;
  const neutral = crowd.filter((p) => p.reaction === "neutral").length;

  return {
    crowdSize,
    liked,
    disliked,
    neutral,
    donations,
    crowd,
  };
}
