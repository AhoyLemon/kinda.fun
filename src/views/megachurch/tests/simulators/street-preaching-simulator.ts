// Street preaching simulation utility
// Uses shared game logic from _gameLogic.ts to eliminate code duplication

import { simulateStreetPreachingCore, Person } from "../../ts/_gameLogic.js";

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

/**
 * Simulates street preaching using the actual game logic functions
 * @param place - The location where preaching occurs
 * @param selectedThemes - The themes being preached
 * @param spiceMultiplier - Optional spice multiplier (defaults to 1 for tests)
 */
export function simulateStreetPreaching(place: any, selectedThemes: any[], spiceMultiplier: number = 1): SimulationResult {
  // Use the shared game logic instead of duplicating code
  const result = simulateStreetPreachingCore(place, selectedThemes, spiceMultiplier);

  // Convert to the expected interface format
  return {
    location: place.name,
    topics: selectedThemes.map((t) => t.title),
    crowdSize: result.crowdSize,
    liked: result.liked,
    disliked: result.disliked,
    neutral: result.neutral,
    donations: result.donations,
    crowd: result.crowd,
  };
}
