import { places } from "./_places";

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
    return places.filter(
      (place) => place.id !== 0 && place.id !== currentPlaceId,
    );
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
  purchasedItemIds: (string | number)[],
  itemShop: any[],
): any[] {
  return purchasedItemIds
    .map((itemId) => itemShop.find((item) => item.id === itemId))
    .filter(Boolean);
}
