import { places } from "./_places";
import {
  EternalLegacyShopItem,
  EternalLegacyDarkDeed,
} from "./variables/_eternalLegacy";

export function computeTopicsYesterday(sermonYesterday: any): number[] {
  if (
    !sermonYesterday ||
    !Array.isArray(sermonYesterday.topics) ||
    sermonYesterday.topics.length === 0
  ) {
    return [];
  }
  return sermonYesterday.topics
    .map((t: any) => {
      if (t && typeof t === "object") {
        if ("id" in t) return t.id;
        if ("_custom" in t && t._custom.value && "id" in t._custom.value)
          return t._custom.value.id;
      }
      return null;
    })
    .filter((id: any): id is number => typeof id === "number");
}

export function sortAudienceReactions(audienceReactions: any[]): any[] {
  if (!audienceReactions || !Array.isArray(audienceReactions)) return [];

  return [...audienceReactions].sort((a, b) => {
    // First sort by most liked
    if (a.liked !== b.liked) {
      return b.liked - a.liked;
    }
    // Then by most disliked (if liked is 0)
    if (a.liked === 0 && b.liked === 0 && a.disliked !== b.disliked) {
      return b.disliked - a.disliked;
    }
    // Finally by most heard (if both liked and disliked are 0)
    if (
      a.liked === 0 &&
      b.liked === 0 &&
      a.disliked === 0 &&
      b.disliked === 0
    ) {
      const totalA = a.liked + a.disliked + a.neutral;
      const totalB = b.liked + b.disliked + b.neutral;
      return totalB - totalA;
    }
    return 0;
  });
}

export function calculateIgnoredAudience(audienceReactions: any[]): number {
  if (!audienceReactions || !Array.isArray(audienceReactions)) return 0;

  return audienceReactions
    .filter((reaction) => reaction.liked === 0 && reaction.disliked === 0)
    .reduce((total, reaction) => total + reaction.neutral, 0);
}

export function getAvailablePlaces(
  hasVan: boolean,
  currentPlaceId: number,
): any[] {
  if (hasVan) {
    // Filter out Starting Location (id: 0) and current location when player has a van
    return places.filter((place) => place.id !== 0);
  }
  return places;
}

export function computeTopReligions(
  place: any,
  religiousScorecard: any[],
  churchReligionId?: number,
): any[] {
  if (!place || !Array.isArray(place.religions)) return [];

  return place.religions
    .map((rel) => {
      const scorecard = religiousScorecard.find((r) => r.id === rel.id);
      let score = scorecard ? scorecard.score : 0;
      // Double the score if this religion matches the church's religion
      if (churchReligionId && rel.id === churchReligionId) {
        score *= 2;
      }
      return {
        id: rel.id,
        name: rel.name,
        chance: rel.weight + score,
      };
    })
    .sort((a, b) => b.chance - a.chance);
}

export function getPurchasedItems(
  purchasedItems: EternalLegacyShopItem[] | EternalLegacyDarkDeed[],
): any[] {
  return purchasedItems;
}

export function computeTemporarySermonScores(
  selectedTopics: (number | null)[],
  themes: any[],
  religions: any[],
): { mostLiked: any[]; mostDisliked: any[] } {
  // If no topics selected, return empty arrays
  const selectedTopicIds = selectedTopics.filter(
    (id): id is number => typeof id === "number",
  );
  if (selectedTopicIds.length === 0) {
    return {
      mostLiked: [],
      mostDisliked: [],
    };
  }

  // Get the selected themes
  const selectedThemes = selectedTopicIds
    .map((id) => themes.find((t) => t.id === id))
    .filter(Boolean);

  // Calculate scores for each religion based on both religion matches and tag matches
  const religionScores: Record<
    number,
    { name: string; likeScore: number; dislikeScore: number }
  > = {};

  // Initialize scores for all religions
  religions.forEach((religion) => {
    religionScores[religion.id] = {
      name: religion.name,
      likeScore: 0,
      dislikeScore: 0,
    };
  });

  selectedThemes.forEach((theme) => {
    // Process religion-based likes (weight = 3x for religion match)
    (theme.likedBy.religions ?? []).forEach((rel: any) => {
      let id: number;
      if (typeof rel === "object") {
        id = rel.id;
      } else if (typeof rel === "number") {
        id = rel;
      } else {
        // rel is a string, use its hash as id
        id = rel
          .split("")
          .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
      }
      if (religionScores[id]) {
        religionScores[id].likeScore += 3; // Religion match = 3x weight
      }
    });

    // Process religion-based dislikes (weight = 3x for religion match)
    (theme.dislikedBy.religions ?? []).forEach((rel: any) => {
      let id: number;
      if (typeof rel === "object") {
        id = rel.id;
      } else if (typeof rel === "number") {
        id = rel;
      } else {
        // rel is a string, use its hash as id
        id = rel
          .split("")
          .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
      }
      if (religionScores[id]) {
        religionScores[id].dislikeScore += 3; // Religion match = 3x weight
      }
    });

    // Process tag-based likes (weight = 1x for tag match)
    (theme.likedBy.tags ?? []).forEach((tagObj: any) => {
      const tag = tagObj.tag || tagObj; // Handle both {tag: "value", weight: 1} and "value" formats
      const weight = tagObj.weight || 1;

      religions.forEach((religion) => {
        if (religion.likes.includes(tag)) {
          religionScores[religion.id].likeScore += weight; // Tag match = 1x weight
        }
      });
    });

    // Process tag-based dislikes (weight = 1x for tag match)
    (theme.dislikedBy.tags ?? []).forEach((tagObj: any) => {
      const tag = tagObj.tag || tagObj; // Handle both {tag: "value", weight: 1} and "value" formats
      const weight = tagObj.weight || 1;

      religions.forEach((religion) => {
        if (religion.likes.includes(tag)) {
          // Religion likes this tag, but we're attacking it = dislike
          religionScores[religion.id].dislikeScore += weight;
        }
      });
    });
  });

  // Build top 3 most liked religions (excluding mixed messages)
  const mostLiked = Object.entries(religionScores)
    .filter(
      ([_, v]) => v.likeScore > 0 && !(v.likeScore > 0 && v.dislikeScore > 0),
    ) // Exclude mixed messages
    .map(([id, v]) => ({ name: v.name, id: Number(id), weight: v.likeScore }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3);

  // Build top 3 most disliked religions (excluding mixed messages)
  const mostDisliked = Object.entries(religionScores)
    .filter(
      ([_, v]) =>
        v.dislikeScore > 0 && !(v.likeScore > 0 && v.dislikeScore > 0),
    ) // Exclude mixed messages
    .map(([id, v]) => ({
      name: v.name,
      id: Number(id),
      weight: v.dislikeScore,
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3);

  return {
    mostLiked,
    mostDisliked,
  };
}
