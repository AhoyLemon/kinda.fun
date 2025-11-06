import { themes } from "./_sermons";
import { religions } from "./_religions";
import { places } from "./_places";
import { gameSettings } from "./variables/_gameSettings";
import {
  randomNumber,
  randomFrom,
  shuffle,
  addCommas,
  findInArray,
  removeFromArray,
  percentOf,
  sendEvent,
  dollars,
} from "../../../shared/ts/_functions";

import {
  calculateCrowdSize,
  generateCrowd,
  buildSermonData,
  processCrowdReactions,
  calculateDonations,
  simulateStreetPreachingCore,
  type Person,
  type StreetPreachingResult,
} from "./_gameLogic";

import type {
  Theme,
  Place,
  WeightedTag,
  WeightedReligion,
  MixedTag,
  MixedReligion,
  Sermon,
  Religion,
  UI,
  My,
} from "./_types";

/**
 * Creates a comprehensive sermon definition from selected topics
 * This processes the selected topics and builds the complete sermon data structure
 * with liked/disliked tags and religions, plus mixed message detection
 */
export function buildSermonDefinition(
  selectedTopics: number[],
  sermonToday: any,
): any {
  const selectedThemes = selectedTopics
    .filter((id): id is number => typeof id === "number")
    .map((id) => themes.find((t) => t.id === id))
    .filter(Boolean);

  // Count weights for tags
  const tagWeights: Record<string, { liked: number; disliked: number }> = {};
  // Count weights for religions
  const religionWeights: Record<
    number,
    { name: string; liked: number; disliked: number }
  > = {};

  selectedThemes.forEach((theme) => {
    // Liked tags
    (theme.likedBy.tags ?? []).forEach((tag: string) => {
      if (!tagWeights[tag]) tagWeights[tag] = { liked: 0, disliked: 0 };
      tagWeights[tag].liked++;
    });
    // Disliked tags
    (theme.dislikedBy.tags ?? []).forEach((tag: string) => {
      if (!tagWeights[tag]) tagWeights[tag] = { liked: 0, disliked: 0 };
      tagWeights[tag].disliked++;
    });
    // Liked religions
    (theme.likedBy.religions ?? []).forEach((rel: any) => {
      let id: number;
      let name: string;
      if (typeof rel === "object") {
        id = rel.id;
        name = rel.name;
      } else if (typeof rel === "number") {
        id = rel;
        name = String(rel);
      } else {
        // rel is a string, use its hash as id
        id = rel
          .split("")
          .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        name = rel;
      }
      if (!religionWeights[id])
        religionWeights[id] = { name, liked: 0, disliked: 0 };
      religionWeights[id].liked++;
    });
    // Disliked religions
    (theme.dislikedBy.religions ?? []).forEach((rel: any) => {
      let id: number;
      let name: string;
      if (typeof rel === "object") {
        id = rel.id;
        name = rel.name;
      } else if (typeof rel === "number") {
        id = rel;
        name = String(rel);
      } else {
        // rel is a string, use its hash as id
        id = rel
          .split("")
          .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        name = rel;
      }
      if (!religionWeights[id])
        religionWeights[id] = { name, liked: 0, disliked: 0 };
      religionWeights[id].disliked++;
    });
  });

  // Build liked/disliked arrays sorted by weight
  const likedTagsArr = Object.entries(tagWeights)
    .filter(([_, v]) => v.liked > 0)
    .map(([tag, v]) => ({ tag, weight: v.liked }))
    .sort((a, b) => b.weight - a.weight);
  const dislikedTagsArr = Object.entries(tagWeights)
    .filter(([_, v]) => v.disliked > 0)
    .map(([tag, v]) => ({ tag, weight: v.disliked }))
    .sort((a, b) => b.weight - a.weight);

  const likedReligionsArr = Object.entries(religionWeights)
    .filter(([_, v]) => v.liked > 0)
    .map(([id, v]) => ({ name: v.name, id: Number(id), weight: v.liked }))
    .sort((a, b) => b.weight - a.weight);
  const dislikedReligionsArr = Object.entries(religionWeights)
    .filter(([_, v]) => v.disliked > 0)
    .map(([id, v]) => ({ name: v.name, id: Number(id), weight: v.disliked }))
    .sort((a, b) => b.weight - a.weight);

  // Mixed messages: tags and religions that appear in both liked and disliked
  const mixedTagsArr = Object.entries(tagWeights)
    .filter(([_, v]) => v.liked > 0 && v.disliked > 0)
    .map(([tag, v]) => ({ tag, liked: v.liked, disliked: v.disliked }));
  const mixedReligionsArr = Object.entries(religionWeights)
    .filter(([_, v]) => v.liked > 0 && v.disliked > 0)
    .map(([id, v]) => ({
      name: v.name,
      id: Number(id),
      liked: v.liked,
      disliked: v.disliked,
    }));

  return {
    topics: selectedThemes.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.desc,
    })),
    likedBy: {
      tags: likedTagsArr,
      religions: likedReligionsArr,
    },
    dislikedBy: {
      tags: dislikedTagsArr,
      religions: dislikedReligionsArr,
    },
    mixedMessages: {
      tags: mixedTagsArr,
      religions: mixedReligionsArr,
    },
  };
}

/**
 * Processes street preaching effect with comprehensive audience reaction generation
 * This handles the complex logic for street preaching including crowd generation,
 * reaction processing, and toast data preparation
 */
export function processStreetPreachingEffect(
  place: Place,
  sermonToday: any,
  spiceMultiplier: number,
): {
  donations: number;
  crowdSize: number;
  audienceReactions: any[];
  toastData: any[];
} {
  if (!place || !place.religions || !Array.isArray(place.religions)) {
    return { donations: 0, crowdSize: 0, audienceReactions: [], toastData: [] };
  }

  // === USE SHARED GAME LOGIC ===

  // Reconstruct full theme objects from the topic IDs for buildSermonData
  const fullThemes = (sermonToday.topics || [])
    .map((topic: any) => themes.find((t) => t.id === topic.id))
    .filter(Boolean);

  // Build sermon data from full theme objects (same as game logic)
  const sermonData = buildSermonData(fullThemes);

  // Use shared logic to simulate street preaching
  const result = simulateStreetPreachingCore(
    place,
    fullThemes,
    spiceMultiplier,
  );

  // Use the crowd from shared logic for toast generation
  const crowd = result.crowd;

  // === STEP 4: PREPARE TOAST DATA ===
  // New approach: One toast per religion maximum, prioritize most influential

  // Track reactions by religion to find the most influential per religion
  const religionReactions = new Map();

  // Process all reactions and find the strongest one per religion
  for (const person of crowd) {
    if (person.reaction === "neutral") continue;

    const religionId = person.religionId;
    const religionData = religions.find((r) => r.id === religionId);
    if (!religionData) continue;

    if (!religionReactions.has(religionId)) {
      religionReactions.set(religionId, {
        religionData,
        reactions: { like: 0, dislike: 0 },
        causes: { like: [], dislike: [] },
      });
    }

    const religionInfo = religionReactions.get(religionId);
    religionInfo.reactions[person.reaction]++;

    // Determine what caused this reaction
    let cause = null;
    let isReligionMatch = false;

    // Check if it was a religion match
    if (
      person.reaction === "like" &&
      sermonToday.likedBy.religions.some((r) => r.id === religionId)
    ) {
      cause = "religion";
      isReligionMatch = true;
    } else if (
      person.reaction === "dislike" &&
      sermonToday.dislikedBy.religions.some((r) => r.id === religionId)
    ) {
      cause = "religion";
      isReligionMatch = true;
    } else {
      // Check for tag matches
      if (person.reaction === "like") {
        for (const tagObj of sermonToday.likedBy.tags) {
          if (religionData.likes.includes(tagObj.tag as any)) {
            cause = tagObj.tag;
            break;
          }
        }
      } else if (person.reaction === "dislike") {
        for (const tagObj of sermonToday.dislikedBy.tags) {
          if (religionData.likes.includes(tagObj.tag as any)) {
            cause = tagObj.tag;
            break;
          }
        }
      }
    }

    if (
      cause &&
      !religionInfo.causes[person.reaction].some((c) => c.cause === cause)
    ) {
      religionInfo.causes[person.reaction].push({ cause, isReligionMatch });
    }
  }

  // Create toasts - one per religion with their strongest reaction
  const toastCandidates = [];

  religionReactions.forEach((info, religionId) => {
    const likeCount = info.reactions.like;
    const dislikeCount = info.reactions.dislike;

    // Determine which reaction was stronger
    if (likeCount > dislikeCount && likeCount > 0) {
      const cause = info.causes.like[0]; // Use first/primary cause
      toastCandidates.push({
        type: "like",
        count: likeCount,
        religionData: info.religionData,
        cause: cause?.cause || null,
        isReligionMatch: cause?.isReligionMatch || false,
        priority: likeCount,
      });
    } else if (dislikeCount > 0) {
      const cause = info.causes.dislike[0];
      toastCandidates.push({
        type: "dislike",
        count: dislikeCount,
        religionData: info.religionData,
        cause: cause?.cause || null,
        isReligionMatch: cause?.isReligionMatch || false,
        priority: dislikeCount,
      });
    }
  });

  // Add mixed message toasts (limit to 2)
  const mixedToasts = [];
  for (const mixedTag of sermonToday.mixedMessages.tags) {
    const affectedCount = crowd.filter((p) => {
      const religionData = religions.find((r) => r.id === p.religionId);
      return (
        religionData &&
        (religionData.likes.includes(mixedTag.tag as any) ||
          religionData.dislikes.includes(mixedTag.tag as any))
      );
    }).length;

    if (affectedCount > 0) {
      const affectedReligions = Array.from(
        new Set(
          crowd
            .filter((p) => {
              const religionData = religions.find((r) => r.id === p.religionId);
              return (
                religionData &&
                (religionData.likes.includes(mixedTag.tag as any) ||
                  religionData.dislikes.includes(mixedTag.tag as any))
              );
            })
            .map((p) => {
              const religionData = religions.find((r) => r.id === p.religionId);
              return religionData?.followers || p.religionName;
            }),
        ),
      );

      mixedToasts.push({
        type: "mixed",
        count: affectedCount,
        cause: mixedTag.tag,
        affectedReligions,
        priority: affectedCount,
      });
    }
  }

  // Sort mixed toasts by priority and take top 2
  mixedToasts.sort((a, b) => b.priority - a.priority);
  const limitedMixedToasts = mixedToasts.slice(0, 2);

  // Combine all toasts and sort by priority
  const allToasts = [...toastCandidates, ...limitedMixedToasts];
  allToasts.sort((a, b) => b.priority - a.priority);

  // Limit to 10 total toasts
  const finalToasts = allToasts.slice(0, 10);

  // Shuffle the toasts so they're not in priority order
  const shuffledToasts = shuffle([...finalToasts]);

  // Store legacy audience reactions format for compatibility
  const reactionsByReligion = place.religions
    .map((placeReligion) => {
      const religionCrowd = crowd.filter(
        (p) => p.religionId === placeReligion.id,
      );
      const liked = religionCrowd.filter((p) => p.reaction === "like").length;
      const disliked = religionCrowd.filter(
        (p) => p.reaction === "dislike",
      ).length;
      const neutral = religionCrowd.filter(
        (p) => p.reaction === "neutral",
      ).length;

      const religionData = religions.find((r) => r.id === placeReligion.id);

      return {
        id: placeReligion.id,
        name: placeReligion.name,
        liked,
        disliked,
        neutral,
        likedTags: [], // Not needed for new system
        dislikedTags: [], // Not needed for new system
        mixedTags: [], // Not needed for new system
        followerName: religionData?.follower || placeReligion.name,
        followersName: religionData?.followers || placeReligion.name,
      };
    })
    .filter((r) => r.liked > 0 || r.disliked > 0 || r.neutral > 0);

  return {
    donations: result.donations,
    crowdSize: result.crowdSize,
    audienceReactions: reactionsByReligion,
    toastData: shuffledToasts,
  };
}

/**
 * Calculates church audience attendance considering various factors
 * This handles the complex logic for determining how many people attend church
 */
export function calculateChurchAudience(my: any): number {
  if (!my.church.isFounded || !my.church.location) {
    return 0;
  }

  // Start with base attendance
  let churchAttendees = gameSettings.churchPreaching.expectedAttendees;

  // Apply preacher strength
  churchAttendees = Math.round(
    churchAttendees * (my.preacherStrengths?.gatherCrowd || 1),
  );

  // Apply buzz effect - multiply buzz by buzzMultiplier to get extra attendees
  const buzzBonus = Math.round(
    my.church.buzz * gameSettings.church.buzzMultiplier,
  );
  churchAttendees += buzzBonus;

  // Apply marketing effects to attendance (marketing was purchased yesterday, affects today)
  // General Ad now provides permanent buzz boost, so it's applied through my.church.buzz
  // Sign Spinner provides temporary boost when active
  if (
    my.marketing.signSpinner.active &&
    my.marketing.signSpinner.daysRemaining > 0
  ) {
    churchAttendees = Math.round(
      churchAttendees *
        (1 + gameSettings.church.marketing.signSpinner.attendanceBoost / 100),
    );
  }
  // Targeted ads boost specific religion attendance
  if (
    my.marketing.targetedAd.active &&
    my.marketing.targetedAd.daysRemaining > 0
  ) {
    // This would need specific logic to boost the targeted religion's attendance
    // For now, apply general boost if the church religion matches the targeted religion
    if (my.church.religion?.id === my.marketing.targetedAd.targetReligion?.id) {
      churchAttendees = Math.round(
        churchAttendees *
          (1 +
            gameSettings.church.marketing.targetedAd.targetReligionBoost / 100),
      );
    }
  }

  // Calculate effective church capacity (base + extra pews)
  const maxPews = gameSettings.church.upgrades.extraPews.maxPews;
  const actualExtraPews = Math.min(my.church.upgrades.extraPews, maxPews);
  const effectiveCapacity =
    my.church.maxAttendance +
    actualExtraPews * gameSettings.church.upgrades.extraPews.capacityIncrease;

  // Cap attendance at church capacity
  const finalAttendance = Math.min(churchAttendees, effectiveCapacity);

  return finalAttendance;
}

/**
 * Sends a series of text messages with typing simulation
 * This handles the complex messaging system for NPCs
 */
export function sendTextMessagesWithTyping(
  messages: Array<{ sender: string; text: string }>,
  chatType: "harold" | "sterling" | "plug",
  chatHistory: any[],
  typingTime = 3500,
): void {
  if (messages.length === 0) return;

  // Add the first message immediately (whether it's from player or NPC)
  const firstMessage = {
    id: Date.now(),
    sender: messages[0].sender,
    text: messages[0].text,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
  chatHistory.push(firstMessage);

  // Queue subsequent messages with typing simulation
  const subsequentMessages = messages.slice(1); // Skip first message
  if (subsequentMessages.length === 0) return;

  let messageIndex = 0;

  function sendNextMessage() {
    if (messageIndex >= subsequentMessages.length) return;

    const messageData = subsequentMessages[messageIndex];

    // Show typing indicator (only for NPCs, not player)
    if (messageData.sender !== "player") {
      const typingMessage = {
        id: Date.now() + 9000 + messageIndex,
        sender: messageData.sender,
        text: "",
        time: "",
        isTyping: true,
      };
      chatHistory.push(typingMessage);
      // After typing delay, replace with actual message
      setTimeout(() => {
        // Find and update the typing message
        const typingMsg = chatHistory.find(
          (msg) => msg.isTyping && msg.sender === messageData.sender,
        );
        if (typingMsg) {
          typingMsg.text = messageData.text;
          typingMsg.time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          typingMsg.isTyping = false;
        }
        messageIndex++;
        // Queue next message if there are more
        if (messageIndex < subsequentMessages.length) {
          setTimeout(sendNextMessage, 1250); // 1.25 second delay between messages
        }
      }, typingTime); // Use configurable typing time
    } else {
      // For player messages, add immediately without typing indicator
      const playerMessage = {
        id: Date.now() + messageIndex,
        sender: messageData.sender,
        text: messageData.text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      chatHistory.push(playerMessage);
      messageIndex++;
      // Queue next message if there are more
      if (messageIndex < subsequentMessages.length) {
        setTimeout(sendNextMessage, 1000); // Shorter delay for player messages
      }
    }
  }

  // Start sending subsequent messages after a short delay
  setTimeout(sendNextMessage, 2500);
}

/**
 * Generates daily themes for the player to choose from
 * This creates a randomized selection of themes available for the day
 */
export function generateDailyThemesSelection(currentDailyThemes: any[]): any[] {
  // Generate a random selection of themes for today
  const shuffledThemes = shuffle([...themes]);
  const selectedThemes = shuffledThemes.slice(0, gameSettings.themesPerDay);

  // Ensure uniqueness by ID (defensive programming)
  return selectedThemes.filter(
    (theme, index, array) =>
      array.findIndex((t) => t.id === theme.id) === index,
  );
}

/**
 * Provides available topic options for sermon selection
 * This filters out already selected topics and marks yesterday's topics
 */
export function getTopicOptionsForSermon(
  index: number,
  selectedTopics: number[],
  dailyThemes: any[],
  topicsYesterday: number[],
): typeof themes {
  const selectedIds = selectedTopics
    .map((id, i) => (i !== index && id !== null && id !== 0 ? id : null))
    .filter((id): id is number => id !== null);

  // Use daily themes instead of all themes
  const availableThemes = dailyThemes.length > 0 ? dailyThemes : themes;

  // Map and mark topics preached yesterday
  const themedWithYesterday = availableThemes.map((theme) => {
    if (topicsYesterday.includes(theme.id)) {
      return {
        ...theme,
        isPreachedYesterday: true,
      };
    }
    return theme;
  });

  // Filter out already selected topics and ensure uniqueness by ID
  const filteredThemes = themedWithYesterday.filter(
    (theme) => !selectedIds.includes(theme.id),
  );

  // Remove any potential duplicates by ID (defensive programming)
  const uniqueThemes = filteredThemes.filter(
    (theme, index, array) =>
      array.findIndex((t) => t.id === theme.id) === index,
  );

  return uniqueThemes;
}

/**
 * Builds the congregation for church preaching based on location demographics and scorecard
 */
export function buildChurchCongregation(
  churchLocation: any,
  churchAttendees: number,
  religiousScorecard: any[],
  churchReligion: any,
  marketing: any,
  gameSettings: any,
): Array<{ id: number; count: number; likes: number; dislikes: number }> {
  const todaysCongregation: Array<{
    id: number;
    count: number;
    likes: number;
    dislikes: number;
  }> = [];

  // Use scorecard to adjust weights for church attendance
  const scorecardMap = new Map<number, { score: number }>();
  religiousScorecard.forEach((entry: any) => {
    scorecardMap.set(entry.id, { score: entry.score || 0 });
  });

  let totalWeight = 0;
  const weightedReligions: Array<{ id: number; weight: number }> = [];

  churchLocation.religions.forEach((locationReligion: any) => {
    // Start with base weight from location
    let weight = locationReligion.weight;

    // Add scorecard score
    const scorecardScore = scorecardMap.get(locationReligion.id)?.score || 0;
    weight += scorecardScore;

    // Double the scorecard effect if this religion matches the church's religion
    if (churchReligion && churchReligion.id === locationReligion.id) {
      weight += scorecardScore; // Add scorecard score again for doubling effect
    }

    // Apply targeted marketing boost
    if (
      marketing.targetedAd.active &&
      marketing.targetedAd.targetReligion?.id === locationReligion.id
    ) {
      weight = Math.round(
        weight *
          (1 +
            gameSettings.church.marketing.targetedAd.targetReligionBoost / 100),
      );
    }

    // Ensure minimum weight of 1
    weight = Math.max(1, weight);

    weightedReligions.push({ id: locationReligion.id, weight });
    totalWeight += weight;
  });

  // Assign attendees based on weighted probabilities
  for (const { id, weight } of weightedReligions) {
    let attendeeCount = Math.round((churchAttendees * weight) / totalWeight);
    if (attendeeCount > 0) {
      todaysCongregation.push({
        id,
        count: attendeeCount,
        likes: 0,
        dislikes: 0,
      });
    }
  }

  return todaysCongregation;
}

/**
 * Calculates likes and dislikes for church congregation based on sermon content
 */
export function calculateCongregationReactions(
  congregation: Array<{
    id: number;
    count: number;
    likes: number;
    dislikes: number;
  }>,
  sermonToday: any,
  sermonYesterday: any,
  preacherStrengths: any,
  spiceMultiplier: number,
  churchUpgrades: any,
  marketing: any,
  gameSettings: any,
): void {
  congregation.forEach((group) => {
    const religion = religions.find((r: any) => r.id === group.id);
    if (!religion) return;

    // Topic repetition penalty
    let repetitionPenalty = 1;
    if (sermonYesterday && Array.isArray(sermonYesterday.topics)) {
      const preachedYesterday = sermonYesterday.topics.some((t: any) =>
        sermonToday.topics.some((tt: any) => tt.id === t.id),
      );
      if (preachedYesterday)
        repetitionPenalty = gameSettings.churchPreaching.topicRepetitionPenalty;
    }

    // First, get likes and dislikes by religion match
    if (
      !sermonToday.mixedMessages.religions.find((mr: any) => mr.id === group.id)
    ) {
      // Check for dislikes by religion
      const dislikedReligionMatch = sermonToday.dislikedBy.religions.find(
        (dr: any) => dr.id === group.id,
      );
      if (dislikedReligionMatch) {
        const dislikeChance =
          gameSettings.churchPreaching.dislikeChance.byReligion / 100;
        const modifiedChance =
          dislikeChance *
          (preacherStrengths?.getDislikes || 1) *
          spiceMultiplier *
          repetitionPenalty;
        group.dislikes += Math.round(group.count * modifiedChance);
      }

      // Check for likes by religion
      const likedReligionMatch = sermonToday.likedBy.religions.find(
        (lr: any) => lr.id === group.id,
      );
      if (likedReligionMatch) {
        const likeChance =
          gameSettings.churchPreaching.likeChance.byReligion / 100;
        const modifiedChance =
          likeChance *
          (preacherStrengths?.getLikes || 1) *
          spiceMultiplier *
          repetitionPenalty;
        group.likes += Math.round(group.count * modifiedChance);
      }
    }

    // Then, get likes and dislikes by tag match
    const allSermonTags = [
      ...sermonToday.likedBy.tags.map((tag: any) => ({
        ...tag,
        sermon: "positive",
      })),
      ...sermonToday.dislikedBy.tags.map((tag: any) => ({
        ...tag,
        sermon: "negative",
      })),
    ].filter(
      (tag: any) =>
        !sermonToday.mixedMessages.tags.find((mt: any) => mt.tag === tag.tag),
    );

    // Shuffle tags for random checking order
    const shuffledTags = shuffle([...allSermonTags]);

    shuffledTags.forEach((sermonTag: any) => {
      let tagScore = 0;

      // Calculate tag score based on religion's preferences
      if (religion.likes.includes(sermonTag.tag)) {
        tagScore +=
          sermonTag.sermon === "positive"
            ? sermonTag.weight
            : -sermonTag.weight;
      }
      if (religion.dislikes.includes(sermonTag.tag)) {
        tagScore +=
          sermonTag.sermon === "positive"
            ? -sermonTag.weight
            : sermonTag.weight;
      }

      // Apply tag score to likes/dislikes
      if (tagScore > 0) {
        const likeChance =
          (gameSettings.churchPreaching.likeChance.byTag / 100) *
          (tagScore / 5);
        const modifiedChance =
          likeChance *
          (preacherStrengths?.getLikes || 1) *
          spiceMultiplier *
          repetitionPenalty;
        group.likes += Math.round(group.count * Math.min(modifiedChance, 0.5));
      } else if (tagScore < 0) {
        const dislikeChance =
          (gameSettings.churchPreaching.dislikeChance.byTag / 100) *
          (Math.abs(tagScore) / 5);
        const modifiedChance =
          dislikeChance *
          (preacherStrengths?.getDislikes || 1) *
          spiceMultiplier *
          repetitionPenalty;
        group.dislikes += Math.round(
          group.count * Math.min(modifiedChance, 0.5),
        );
      }
    });

    // Apply church upgrade effects to likes
    let upgradeBonus = 0;

    // Audio/Visual equipment increases like chance
    if (churchUpgrades.audioVisual) {
      upgradeBonus += gameSettings.church.upgrades.audioVisual.likeBoost / 100;
    }

    // Sacrament upgrades increase like chance
    if (churchUpgrades.sacrament.wine.level > 0) {
      const wineLevel =
        gameSettings.church.upgrades.sacraments.wine.levels[
          churchUpgrades.sacrament.wine.level
        ];
      if (wineLevel) {
        upgradeBonus += wineLevel.likeBoost / 100;
      }
    }

    if (churchUpgrades.sacrament.bread.level > 0) {
      const breadLevel =
        gameSettings.church.upgrades.sacraments.bread.levels[
          churchUpgrades.sacrament.bread.level
        ];
      if (breadLevel) {
        upgradeBonus += breadLevel.likeBoost / 100;
      }
    }

    // Apply targeted marketing effects to specific religions
    if (
      marketing.targetedAd.active &&
      marketing.targetedAd.targetReligion?.id === group.id
    ) {
      upgradeBonus +=
        gameSettings.church.marketing.targetedAd.targetReligionBoost / 100;
    }

    // Apply upgrade bonus to likes
    if (upgradeBonus > 0) {
      const bonusLikes = Math.round(group.count * upgradeBonus);
      group.likes += bonusLikes;
    }

    // Ensure likes and dislikes don't exceed total count
    group.likes = Math.min(group.likes, group.count);
    group.dislikes = Math.min(group.dislikes, group.count);
  });
}

/**
 * Processes merchandise sales for the church
 */
export function processChurchMerchSales(
  congregation: Array<{
    id: number;
    count: number;
    likes: number;
    dislikes: number;
  }>,
  churchMerch: any,
  gameSettings: any,
): { totalRevenue: number; salesDetails: any } {
  let totalMerchRevenue = 0;
  let merchSalesDetails = {
    holyWater: { sold: 0, revenue: 0 },
    prayerCandles: { sold: 0, revenue: 0 },
    weightLossTea: { sold: 0, revenue: 0 },
    beachTowel: { sold: 0, revenue: 0 },
    exorcismKit: { sold: 0, revenue: 0 },
  };

  congregation.forEach((group) => {
    // Each person in the group gets a chance to buy merch
    for (let i = 0; i < group.count; i++) {
      // Holy Water sales
      if (churchMerch.holyWater.inventory > 0) {
        let holyWaterChance =
          gameSettings.church.merch.holyWater.baseChance / 100;
        if (churchMerch.holyWater.isVendingMachine) {
          holyWaterChance +=
            gameSettings.church.merch.holyWaterVendingMachine.bonusChance / 100;
        }
        if (Math.random() < holyWaterChance) {
          churchMerch.holyWater.inventory--;
          churchMerch.holyWater.soldToday++;
          merchSalesDetails.holyWater.sold++;
          const revenue = churchMerch.holyWater.price;
          merchSalesDetails.holyWater.revenue += revenue;
          totalMerchRevenue += revenue;
        }
      }

      // Prayer Candles sales
      if (churchMerch.prayerCandles.inventory > 0) {
        const candleChance =
          gameSettings.church.merch.prayerCandles.baseChance / 100;
        if (Math.random() < candleChance) {
          churchMerch.prayerCandles.inventory--;
          churchMerch.prayerCandles.soldToday++;
          merchSalesDetails.prayerCandles.sold++;
          const revenue = churchMerch.prayerCandles.price;
          merchSalesDetails.prayerCandles.revenue += revenue;
          totalMerchRevenue += revenue;
        }
      }

      // Weight Loss Tea sales
      if (churchMerch.weightLossTea.inventory > 0) {
        const teaChance =
          gameSettings.church.merch.weightLossTea.baseChance / 100;
        if (Math.random() < teaChance) {
          churchMerch.weightLossTea.inventory--;
          churchMerch.weightLossTea.soldToday++;
          merchSalesDetails.weightLossTea.sold++;
          const revenue = churchMerch.weightLossTea.price;
          merchSalesDetails.weightLossTea.revenue += revenue;
          totalMerchRevenue += revenue;
        }
      }

      // Beach Towel sales
      if (churchMerch.beachTowel.inventory > 0) {
        const towelChance =
          gameSettings.church.merch.beachTowel.baseChance / 100;
        if (Math.random() < towelChance) {
          churchMerch.beachTowel.inventory--;
          churchMerch.beachTowel.soldToday++;
          merchSalesDetails.beachTowel.sold++;
          const revenue = churchMerch.beachTowel.price;
          merchSalesDetails.beachTowel.revenue += revenue;
          totalMerchRevenue += revenue;
        }
      }

      // Exorcism Kit sales
      if (churchMerch.exorcismKit.inventory > 0) {
        const kitChance =
          gameSettings.church.merch.exorcismKit.baseChance / 100;
        if (Math.random() < kitChance) {
          churchMerch.exorcismKit.inventory--;
          churchMerch.exorcismKit.soldToday++;
          merchSalesDetails.exorcismKit.sold++;
          const revenue = churchMerch.exorcismKit.price;
          merchSalesDetails.exorcismKit.revenue += revenue;
          totalMerchRevenue += revenue;
        }
      }
    }
  });

  return {
    totalRevenue: Math.round(totalMerchRevenue * 100) / 100,
    salesDetails: merchSalesDetails,
  };
}
