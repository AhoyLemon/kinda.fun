<script setup lang="ts">
  // ================= IMPORTS =================
  import { onMounted, reactive, ref, computed, watchEffect, watch, h } from "vue";
  import Multiselect from "@vueform/multiselect";
  import "@vueform/multiselect/themes/default.css";
  import { religions } from "./ts/_religions";
  import { places } from "./ts/_places";
  import { themes } from "./ts/_sermons";

  import { randomNumber, randomFrom, shuffle, addCommas, findInArray, removeFromArray, percentOf, sendEvent, dollars } from "@/shared/js/_functions.js";
  import { ui, my, gameSettings } from "./ts/_variables";

  // Toasts
  import Toast, { POSITION } from "vue-toastification";
  import FollowerToast from "./vue/FollowerToast.vue";
  import ListenerToast from "./vue/ListenerToast.vue";
  import DonationToast from "./vue/DonationToast.vue";
  import Chat from "./vue/Chat.vue";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  // ================= VARIABLES =================

  import type { Theme, Place, WeightedTag, WeightedReligion, MixedTag, MixedReligion, Sermon, Religion, UI, My } from "./ts/_types";

  // ================= FUNCTIONS =================
  // ================= COLLECT DONATIONS =================
  function collectDonations() {
    const place = my.place as Place;
    if (!place || !place.religions || !Array.isArray(place.religions)) return 0;

    // Get spice multiplier for donations
    const spiceMultiplier = getSpiceMultiplier();

    let totalDonations = 0;
    my.followers.forEach((followerObj: any) => {
      const religionId = followerObj.id;
      const followers = followerObj.followers || 0;
      if (followers === 0) return;

      // Find score for this religion and calculate score multiplier
      const scoreEntry = my.religiousScorecard.find((r: any) => r.id === religionId);
      const score = scoreEntry ? scoreEntry.score : 0;
      let scoreMultiplier = Math.max(
        gameSettings.donationCalculation.scoreMultiplierMin,
        Math.min(gameSettings.donationCalculation.scoreMultiplierMax, score / gameSettings.donationCalculation.scoreDivisor),
      );

      // Calculate net worth multiplier for this location
      const placeReligion = place.religions.find((r: any) => r.id === religionId);
      const netWorthMultiplier = place.avgNetWorth
        ? Math.max(
            gameSettings.donationCalculation.netWorthMultiplierMin,
            Math.min(gameSettings.donationCalculation.netWorthMultiplierMax, place.avgNetWorth / gameSettings.donationCalculation.netWorthDivisor),
          )
        : 1;

      // Calculate donation strength with spice effects
      const baseDonation = gameSettings.baseDonation || gameSettings.donationCalculation.fallbackBaseDonation;
      const donationStrength = (my.preacherStrengths?.getDonations || 1) * spiceMultiplier * gameSettings.donationCalculation.strengthBoostMultiplier;

      // Calculate donation for this religion
      const donation = followers * baseDonation * scoreMultiplier * donationStrength * netWorthMultiplier;
      totalDonations += donation;
    });
    // Round donations to nearest cent using configured rounding factor
    const roundedDonations = Math.round(totalDonations * gameSettings.donationCalculation.roundingFactor) / gameSettings.donationCalculation.roundingFactor;
    my.donationsYesterday = roundedDonations; // Store for yesterday's effect
    my.money += roundedDonations; // And give it to you.

    trackMoneyEarned(roundedDonations);
  }

  function provideTopicOptions(index: number): typeof themes {
    const selectedIds = ui.selectedTopics.map((id, i) => (i !== index && id !== null && id !== 0 ? id : null)).filter((id): id is number => id !== null);

    // Use daily themes instead of all themes
    const availableThemes = my.dailyThemes.length > 0 ? my.dailyThemes : themes;

    // Map and mark topics preached yesterday using computedTopicsYesterday
    const themedWithYesterday = availableThemes.map((theme) => {
      if (computedTopicsYesterday.value.includes(theme.id)) {
        return {
          ...theme,
          isPreachedYesterday: true,
        };
      }
      return theme;
    });

    return themedWithYesterday.filter((theme) => !selectedIds.includes(theme.id));
  }

  function generateDailyThemes() {
    // Generate a random selection of themes for today
    const shuffledThemes = shuffle([...themes]);
    my.dailyThemes = shuffledThemes.slice(0, gameSettings.themesPerDay);
  }

  function chooseReligion(religionId: number) {
    const religion = religions.find((r: any) => r.id === religionId);
    if (religion) {
      my.religion = religion;
    } else {
      alert("Religion not found.");
    }
    ui.view = "place";
  }

  function getReligion(id: number): Religion | {} {
    const religion = (religions as any[]).find((r) => r.id === id);
    if (!id) {
      return {};
    } else {
      return religion;
    }
  }

  function getPlace(id: number): Place | {} {
    const place = (places as any[]).find((p) => p.id === id);
    if (!id) {
      return {};
    } else {
      return place;
    }
  }

  // Travel with van
  function travelToPlace(placeId: number) {
    if (!my.hasVan || my.hasTraveledToday) return;

    // Check if player can afford gas
    if (my.money < gameSettings.van.fixedGasPrice) {
      toast.error("You don't have enough money for gas!");
      return;
    }

    // Charge for gas
    my.money -= gameSettings.van.fixedGasPrice;
    my.hasTraveledToday = true;

    // Change location
    choosePlace(placeId);
  }

  function choosePlace(placeId: number) {
    const place = places.find((p: any) => p.id === placeId);
    if (place) {
      my.place = { ...place };
      ui.selectedTopics = [null, null, null] as [number, number, number];
      ui.view = "sermon";
    } else {
      alert("Place not found.");
    }
  }

  function showThemeDescription(id: number): string {
    const theme = (themes as Theme[]).find((s) => s.id === id);
    return theme ? theme.desc : "";
  }

  function defineSermon() {
    const selectedThemes = ui.selectedTopics
      .filter((id): id is number => typeof id === "number")
      .map((id) => themes.find((t) => t.id === id))
      .filter(Boolean);

    // Count weights for tags
    const tagWeights: Record<string, { liked: number; disliked: number }> = {};
    // Count weights for religions
    const religionWeights: Record<number, { name: string; liked: number; disliked: number }> = {};

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
          id = rel.split("").reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
          name = rel;
        }
        if (!religionWeights[id]) religionWeights[id] = { name, liked: 0, disliked: 0 };
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
          id = rel.split("").reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
          name = rel;
        }
        if (!religionWeights[id]) religionWeights[id] = { name, liked: 0, disliked: 0 };
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
      .map(([id, v]) => ({ name: v.name, id: Number(id), liked: v.liked, disliked: v.disliked }));

    my.sermonToday = {
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

    ui.view = "sermon-confirm";
  }

  function preachSermon() {
    // ===== Multipliers and effect variables (easy to tweak) =====
    // Use configured scoring multipliers for sermon effect calculations
    const MULTIPLIERS = gameSettings.sermonScoring;

    // Track score changes for yesterday's effect reporting
    const scoreChanges: Record<number, { id: number; name: string; scoreChange: number; changes: string[] }> = {};

    // Initialize scoreChanges for all religions in the scorecard
    my.religiousScorecard.forEach((religion) => {
      scoreChanges[religion.id] = {
        id: religion.id,
        name: religion.name,
        scoreChange: 0,
        changes: [],
      };
    });

    // Process liked tags
    my.sermonToday.likedBy.tags.forEach((tagObj) => {
      const tag = tagObj.tag;
      let effect = tagObj.weight * MULTIPLIERS.likedTagMultiplier;
      let doubled = false;

      // Check if this tag is in mixed messages (if so, skip)
      const isMixed = my.sermonToday.mixedMessages.tags.some((mixedTag) => mixedTag.tag === tag);
      if (isMixed) return;

      religions.forEach((religion) => {
        const religionScore = scoreChanges[religion.id];
        if (!religionScore) return;

        let thisEffect = effect;
        if ((my.religion as Religion) && typeof (my.religion as Religion).id === "number" && religion.id === (my.religion as Religion).id) {
          thisEffect *= MULTIPLIERS.likedTagDoubledMultiplier;
          doubled = true;
        }
        if (religion.likes.includes(tag as any)) {
          religionScore.scoreChange += thisEffect;
          religionScore.changes.push(`+${thisEffect} for liking ${tag}${doubled ? " (doubled for your religion)" : ""}`);
          const scorecardEntry = my.religiousScorecard.find((r) => r.id === religion.id);
          if (scorecardEntry) scorecardEntry.score += thisEffect;
        }
        if (religion.dislikes.includes(tag as any)) {
          religionScore.scoreChange -= thisEffect;
          religionScore.changes.push(`-${thisEffect} for disliking ${tag}${doubled ? " (doubled for your religion)" : ""}`);
          const scorecardEntry = my.religiousScorecard.find((r) => r.id === religion.id);
          if (scorecardEntry) scorecardEntry.score -= thisEffect;
        }
      });
    });

    // Process disliked tags (halved effect)
    my.sermonToday.dislikedBy.tags.forEach((tagObj) => {
      const tag = tagObj.tag;
      let effect = Math.floor(tagObj.weight * MULTIPLIERS.dislikedTagHalvedMultiplier);
      let doubled = false;
      if (effect === 0) return;

      const isMixed = my.sermonToday.mixedMessages.tags.some((mixedTag) => mixedTag.tag === tag);
      if (isMixed) return;

      religions.forEach((religion) => {
        const religionScore = scoreChanges[religion.id];
        if (!religionScore) return;

        let thisEffect = effect * MULTIPLIERS.dislikedTagMultiplier;
        if ((my.religion as Religion) && typeof (my.religion as Religion).id === "number" && religion.id === (my.religion as Religion).id) {
          thisEffect *= MULTIPLIERS.dislikedTagDoubledMultiplier;
          doubled = true;
        }
        if (religion.likes.includes(tag as any)) {
          religionScore.scoreChange -= thisEffect;
          religionScore.changes.push(`-${thisEffect} for attacking ${tag} (which they like)${doubled ? " (doubled for your religion)" : ""}`);
          const scorecardEntry = my.religiousScorecard.find((r) => r.id === religion.id);
          if (scorecardEntry) scorecardEntry.score -= thisEffect;
        }
        if (religion.dislikes.includes(tag as any)) {
          religionScore.scoreChange += thisEffect;
          religionScore.changes.push(`+${thisEffect} for attacking ${tag} (which they dislike)${doubled ? " (doubled for your religion)" : ""}`);
          const scorecardEntry = my.religiousScorecard.find((r) => r.id === religion.id);
          if (scorecardEntry) scorecardEntry.score += thisEffect;
        }
      });
    });

    // Process liked religions
    my.sermonToday.likedBy.religions.forEach((religionObj) => {
      const religionId = religionObj.id;
      let effect = religionObj.weight * MULTIPLIERS.likedReligionMultiplier;
      let doubled = false;
      const isMixed = my.sermonToday.mixedMessages.religions.some((mixedRel) => mixedRel.id === religionId);
      if (isMixed) return;
      const religionScore = scoreChanges[religionId];
      if (!religionScore) return;
      let thisEffect = effect;
      if ((my.religion as Religion) && typeof (my.religion as Religion).id === "number" && religionId === (my.religion as Religion).id) {
        thisEffect *= MULTIPLIERS.likedReligionDoubledMultiplier;
        doubled = true;
      }
      religionScore.scoreChange += thisEffect;
      religionScore.changes.push(`+${thisEffect} for praising ${religionObj.name}${doubled ? " (doubled for your religion)" : ""}`);
      const scorecardEntry = my.religiousScorecard.find((r) => r.id === religionId);
      if (scorecardEntry) scorecardEntry.score += thisEffect;
    });

    // Process disliked religions
    my.sermonToday.dislikedBy.religions.forEach((religionObj) => {
      const religionId = religionObj.id;
      let effect = religionObj.weight * MULTIPLIERS.dislikedReligionMultiplier;
      let doubled = false;
      const isMixed = my.sermonToday.mixedMessages.religions.some((mixedRel) => mixedRel.id === religionId);
      if (isMixed) return;
      const religionScore = scoreChanges[religionId];
      if (!religionScore) return;
      let thisEffect = effect;
      if ((my.religion as Religion) && typeof (my.religion as Religion).id === "number" && religionId === (my.religion as Religion).id) {
        thisEffect *= MULTIPLIERS.dislikedReligionDoubledMultiplier;
        doubled = true;
      }
      religionScore.scoreChange -= thisEffect;
      religionScore.changes.push(`-${thisEffect} for condemning ${religionObj.name}${doubled ? " (doubled for your religion)" : ""}`);
      const scorecardEntry = my.religiousScorecard.find((r) => r.id === religionId);
      if (scorecardEntry) scorecardEntry.score -= thisEffect;
    });

    // Create yesterday's effect summary, sorted by scoreChange descending
    const yesterdaysEffect = Object.values(scoreChanges)
      .filter((change) => change.scoreChange !== 0)
      .sort((a, b) => b.scoreChange - a.scoreChange);

    // Force Vue reactivity by replacing the scorecard array
    my.religiousScorecard = my.religiousScorecard.map((entry) => {
      const updated = scoreChanges[entry.id];
      return updated ? { ...entry, score: entry.score } : entry;
    });

    my.sermonYesterday = Object.assign({}, my.sermonToday);
    my.effectYesterday = yesterdaysEffect;

    // Move to next phase
    createSermonEffect();
  }

  function createSermonEffect() {
    if (my.isStreetPreaching) {
      createStreetPreachingEffect();
    } else {
      createChurchSermonEffect();
    }
  }

  function createStreetPreachingEffect() {
    ui.view = "preaching";

    const place = my.place as Place;
    if (!place || !place.religions || !Array.isArray(place.religions)) return;

    // Get spice multiplier for this sermon
    const spiceMultiplier = getSpiceMultiplier();
    const settings = gameSettings.streetPreaching;

    // === STEP 1: GATHER A CROWD ===

    // Calculate crowd size with location population influence and random variation
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

    // Create individual people in the crowd with religions based on location weights
    interface Person {
      religionId: number;
      religionName: string;
      reaction: "neutral" | "like" | "dislike";
    }

    const crowd: Person[] = [];
    const totalWeight = place.religions.reduce((sum, r) => sum + r.weight, 0);

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

    // === STEP 2: SERMON REACTIONS ===

    // Process each person to see if they react to the sermon
    // As per docs: check dislikes first, then likes, skip mixed messages
    for (const person of crowd) {
      const religionData = religions.find((r) => r.id === person.religionId);
      if (!religionData) continue;

      // Check if this person's religion is in mixed messages (skip if so)
      const isReligionMixed = my.sermonToday.mixedMessages.religions.some((r) => r.id === person.religionId);
      if (isReligionMixed) continue;

      // STEP 2A: Check religion-based DISLIKES first
      const religionAttacked = my.sermonToday.dislikedBy.religions.some((r) => r.id === person.religionId);
      if (religionAttacked) {
        if (Math.random() * 100 < settings.dislikeChance.byReligion) {
          person.reaction = "dislike";
          continue; // Stop processing this person
        }
      }

      // STEP 2B: Check religion-based LIKES
      const religionPraised = my.sermonToday.likedBy.religions.some((r) => r.id === person.religionId);
      if (religionPraised) {
        if (Math.random() * 100 < settings.likeChance.byReligion) {
          person.reaction = "like";
          continue; // Stop processing this person
        }
      }

      // STEP 2C: Check tag-based DISLIKES (only if still neutral)
      if (person.reaction === "neutral") {
        for (const tagObj of my.sermonToday.dislikedBy.tags) {
          // Skip if tag is in mixed messages
          const tagNotMixed = !my.sermonToday.mixedMessages.tags.some((t) => t.tag === tagObj.tag);
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
        for (const tagObj of my.sermonToday.likedBy.tags) {
          // Skip if tag is in mixed messages
          const tagNotMixed = !my.sermonToday.mixedMessages.tags.some((t) => t.tag === tagObj.tag);
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

    // === STEP 3: COLLECT DONATIONS ===

    let totalDonations = 0;
    const likers = crowd.filter((p) => p.reaction === "like");

    for (const liker of likers) {
      if (Math.random() * 100 < settings.donation.chance) {
        const donation = randomNumber(settings.donation.min, settings.donation.max);
        totalDonations += donation;
        // TODO: Future enhancement - modify donation amount based on location's avgNetWorth
      }
    }

    // Store donation amount but don't apply to money yet
    const roundedDonations = Math.round(totalDonations * 100) / 100;
    my.donationsYesterday = roundedDonations;

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
      if (person.reaction === "like" && my.sermonToday.likedBy.religions.some((r) => r.id === religionId)) {
        cause = "religion";
        isReligionMatch = true;
      } else if (person.reaction === "dislike" && my.sermonToday.dislikedBy.religions.some((r) => r.id === religionId)) {
        cause = "religion";
        isReligionMatch = true;
      } else {
        // Check for tag matches
        if (person.reaction === "like") {
          for (const tagObj of my.sermonToday.likedBy.tags) {
            if (religionData.likes.includes(tagObj.tag as any)) {
              cause = tagObj.tag;
              break;
            }
          }
        } else if (person.reaction === "dislike") {
          for (const tagObj of my.sermonToday.dislikedBy.tags) {
            if (religionData.likes.includes(tagObj.tag as any)) {
              cause = tagObj.tag;
              break;
            }
          }
        }
      }

      if (cause && !religionInfo.causes[person.reaction].some((c) => c.cause === cause)) {
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
    for (const mixedTag of my.sermonToday.mixedMessages.tags) {
      const affectedCount = crowd.filter((p) => {
        const religionData = religions.find((r) => r.id === p.religionId);
        return religionData && (religionData.likes.includes(mixedTag.tag as any) || religionData.dislikes.includes(mixedTag.tag as any));
      }).length;

      if (affectedCount > 0) {
        const affectedReligions = Array.from(
          new Set(
            crowd
              .filter((p) => {
                const religionData = religions.find((r) => r.id === p.religionId);
                return religionData && (religionData.likes.includes(mixedTag.tag as any) || religionData.dislikes.includes(mixedTag.tag as any));
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
        const religionCrowd = crowd.filter((p) => p.religionId === placeReligion.id);
        const liked = religionCrowd.filter((p) => p.reaction === "like").length;
        const disliked = religionCrowd.filter((p) => p.reaction === "dislike").length;
        const neutral = religionCrowd.filter((p) => p.reaction === "neutral").length;

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

    my.audienceReactions = reactionsByReligion;

    // Show audience feedback toasts
    showNewToasts(shuffledToasts, roundedDonations);
  }

  function showNewToasts(toastData: any[], donationAmount: number) {
    if (toastData.length === 0) {
      // No reactions, just show donation toast
      setTimeout(() => {
        my.money += donationAmount;
        trackMoneyEarned(donationAmount);

        toast.success(
          h(DonationToast, {
            change: donationAmount,
          }),
          {
            position: POSITION.BOTTOM_LEFT,
            timeout: ui.toastDuration,
          },
        );

        setTimeout(() => {
          ui.view = "sermon-results";
        }, ui.timing.resultsViewDelay);
      }, 1000);
      return;
    }

    // Stagger the reaction toasts
    let currentDelay = 0;
    let toastCount = 0;
    let toastArray = [];

    toastData.forEach((data, i) => {
      setTimeout(() => {
        let toastType: "success" | "warning" | "info" = "info";

        if (data.type === "like") {
          toastType = "success";
          toast.success(
            h(ListenerToast, {
              reaction: "liked",
              count: data.count,
              religion: data.religionData,
              religionMatch: data.isReligionMatch,
              tagMatch: !data.isReligionMatch && data.cause !== null,
              primaryTag: !data.isReligionMatch ? data.cause : undefined,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.toastDuration,
            },
          );
        } else if (data.type === "dislike") {
          toastType = "warning";
          toast.warning(
            h(ListenerToast, {
              reaction: "disliked",
              count: data.count,
              religion: data.religionData,
              religionMatch: data.isReligionMatch,
              tagMatch: !data.isReligionMatch && data.cause !== null,
              primaryTag: !data.isReligionMatch ? data.cause : undefined,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.toastDuration,
            },
          );
        } else if (data.type === "mixed") {
          toastType = "info";
          toast.info(
            h(ListenerToast, {
              reaction: "mixed",
              primaryTag: data.cause,
              affectedReligions: data.affectedReligions,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.toastDuration,
            },
          );
        }

        toastCount++;
        toastArray.push({ type: toastType, count: data.count, cause: data.cause });
      }, currentDelay);

      currentDelay += randomNumber(ui.timing.toastDelayMin, ui.timing.toastDelayMax);
    });

    // Show donation toast after all reaction toasts
    const finalDelay = currentDelay + ui.timing.donationToastDelay;
    setTimeout(() => {
      console.log(`toastCount: ${toastCount}`);
      console.table(toastArray);

      my.money += donationAmount;
      trackMoneyEarned(donationAmount);

      toast.success(
        h(DonationToast, {
          change: donationAmount,
        }),
        {
          position: POSITION.BOTTOM_LEFT,
          timeout: ui.toastDuration,
        },
      );

      setTimeout(() => {
        ui.view = "sermon-results";
      }, ui.timing.resultsViewDelay);
    }, finalDelay);
  }

  function showAudienceReactions(donationAmount: number) {
    if (!my.audienceReactions) return;

    // Collect all reactions (both likes and dislikes) for better timing control
    const allReactions: Array<{
      reaction?: any;
      reactionType: "liked" | "disliked" | "mixed";
      delay: number;
      mixedMessageTag?: string;
      affectedReligions?: string[];
    }> = [];

    // Collect mixed messages by tag (not by religion)
    const mixedMessagesByTag: { [tag: string]: string[] } = {};

    my.audienceReactions.forEach((reaction) => {
      if (reaction.liked > 0) {
        allReactions.push({ reaction, reactionType: "liked", delay: 0 });
      }
      if (reaction.disliked > 0) {
        allReactions.push({ reaction, reactionType: "disliked", delay: 0 });
      }
      // Collect mixed message data by tag for later processing
      if (reaction.mixedTags && reaction.mixedTags.length > 0) {
        reaction.mixedTags.forEach((tag) => {
          if (!mixedMessagesByTag[tag]) {
            mixedMessagesByTag[tag] = [];
          }
          // Use followersName instead of name for proper plural form
          mixedMessagesByTag[tag].push(reaction.followersName);
        });
      }
    });

    // Add mixed message reactions (one per tag, not per religion)
    Object.entries(mixedMessagesByTag).forEach(([tag, affectedReligions]) => {
      allReactions.push({
        mixedMessageTag: tag,
        affectedReligions,
        reactionType: "mixed",
        delay: 0,
      });
    });

    // Calculate randomized but overlapping delays
    let currentDelay = 0;
    allReactions.forEach((item, i) => {
      // Random delay between 1100-3800ms, but ensure overlap
      const randomDelay = randomNumber(ui.timing.toastDelayMin, ui.timing.toastDelayMax);
      item.delay = currentDelay;
      currentDelay += randomDelay;
    });

    // Show all reaction toasts
    allReactions.forEach((item) => {
      setTimeout(() => {
        const { reaction, reactionType, mixedMessageTag, affectedReligions } = item;

        // For mixed messages, we don't have a reaction object
        if (reactionType === "mixed") {
          // Mixed message - confused audience (new structure)
          toast.info(
            h(ListenerToast, {
              reaction: "mixed",
              mixedMessageTag,
              affectedReligions,
              religion: null, // Not used for mixed messages
              religionMatch: false,
              tagMatch: true,
              primaryTag: mixedMessageTag,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.toastDuration,
            },
          );
          return; // Exit early for mixed messages
        }

        // For regular reactions, we have a reaction object
        const religionData = religions.find((r) => r.id === reaction.id);

        if (reactionType === "liked") {
          const religionMatch = my.sermonToday.likedBy.religions.find((r: any) => r.id === reaction.id);
          const tagMatch = reaction.likedTags && reaction.likedTags.length > 0;
          const primaryTag = tagMatch ? reaction.likedTags[0] : undefined;

          toast.success(
            h(ListenerToast, {
              reaction: "liked",
              count: reaction.liked,
              religion: religionData,
              religionMatch: !!religionMatch,
              tagMatch: tagMatch,
              primaryTag: primaryTag,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.toastDuration,
            },
          );
        } else if (reactionType === "disliked") {
          const religionMatch = my.sermonToday.dislikedBy.religions.find((r: any) => r.id === reaction.id);
          const tagMatch = reaction.dislikedTags && reaction.dislikedTags.length > 0;
          const primaryTag = tagMatch ? reaction.dislikedTags[0] : undefined;

          toast.warning(
            h(ListenerToast, {
              reaction: "disliked",
              count: reaction.disliked,
              religion: religionData,
              religionMatch: !!religionMatch,
              tagMatch: tagMatch,
              primaryTag: primaryTag,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.toastDuration,
            },
          );
        }
      }, item.delay);
    }); // Show donation toast after all reactions, and apply money then
    const finalDelay = allReactions.length > 0 ? Math.max(...allReactions.map((r) => r.delay)) + ui.timing.donationToastDelay : ui.timing.donationToastDelay;
    setTimeout(() => {
      // Apply the money now
      my.money += donationAmount;

      // Track money for van unlock
      trackMoneyEarned(donationAmount);

      toast.success(
        h(DonationToast, {
          change: donationAmount,
        }),
        {
          position: POSITION.BOTTOM_LEFT,
          timeout: ui.toastDuration,
        },
      );

      // Switch to results view
      setTimeout(() => {
        ui.view = "sermon-results";
      }, ui.timing.resultsViewDelay);
    }, finalDelay);
  }

  function createChurchSermonEffect() {
    ui.view = "preaching";

    const place = my.place as Place;
    if (!place || !place.religions || !Array.isArray(place.religions)) return;

    // Get spice multiplier for this sermon
    const spiceMultiplier = getSpiceMultiplier();

    // Track follower changes for reporting
    const followerChangesArr: { id: number; name: string; before: number; change: number; after: number }[] = [];

    place.religions.forEach((placeReligion: any) => {
      const { id, name, weight } = placeReligion;
      // Find matching religion in yesterday's effect
      const effect = my.effectYesterday?.find((r: any) => r.id === id);
      if (!effect) return;
      // Followers gained/lost for this religion, using sqrt(weight) for non-linear scaling
      // Apply spice multiplier to follower effectiveness
      let followersDelta = effect.scoreChange * Math.sqrt(weight) * ((my.preacherStrengths?.getFollowers || 1) * spiceMultiplier);
      // Always round to nearest integer
      followersDelta = Math.round(followersDelta);

      // Get before value
      let followerObj = my.followers.find((f: any) => f.id === id) as { id: number; followers: number } | undefined;
      const before = followerObj ? followerObj.followers : 0;

      // Update followerCount (on placeReligion)
      placeReligion.followerCount = Math.round((placeReligion.followerCount || 0) + followersDelta);
      if (placeReligion.followerCount < 0) placeReligion.followerCount = 0;

      // Update my.followers array
      if (!followerObj) {
        followerObj = { id, followers: 0 };
        my.followers.push(followerObj);
      }
      followerObj.followers = Math.round(followerObj.followers + followersDelta);
      if (followerObj.followers < 0) followerObj.followers = 0;

      const after = followerObj.followers;
      const change = after - before;

      // Only report if before > 0 or after > 0 and there was a change
      if (change !== 0 && (before > 0 || after > 0)) {
        followerChangesArr.push({ id, name: name || String(id), before, change, after });
      }
    });

    // We'll update my.followerCount as each toast is shown

    // Sort and assign to my.followerChanges
    my.followerChanges = followerChangesArr.sort((a, b) => b.change - a.change);

    // Show toasts for each follower change, 1200ms apart, and last longer
    const followerToastDuration = ui.toastDuration;
    const followerToastDelay = 1200;
    followerChangesArr.forEach((changeObj, i) => {
      setTimeout(() => {
        // Apply the follower change for this religion
        let followerObj = my.followers.find((f: any) => f.id === changeObj.id) as { id: number; followers: number } | undefined;
        if (followerObj) {
          // Only apply the delta for this change now
          followerObj.followers = changeObj.after;
          // Increment my.followerCount by the change
          my.followerCount += changeObj.change;
        }
        // Show the toast
        toast(
          {
            component: FollowerToast,
            props: {
              change: changeObj.change,
              religion: changeObj.name,
              before: changeObj.before,
              after: changeObj.after,
            },
          },
          {
            position: POSITION.BOTTOM_LEFT,
            timeout: followerToastDuration,
          },
        );
      }, i * followerToastDelay);
    });

    // After all toasts, run collectDonations and show money collected
    setTimeout(
      () => {
        // Capture money before collecting
        const moneyBefore = my.money;
        collectDonations();
        const moneyCollected = Math.round((my.money - moneyBefore) * 100) / 100;
        const donationToastDuration = 9000;

        toast(
          {
            component: DonationToast,
            props: {
              change: moneyCollected,
            },
          },
          {
            position: POSITION.BOTTOM_LEFT,
            timeout: donationToastDuration,
          },
        );
        // Switch to 'preached' view after donation toast
        setTimeout(() => {
          ui.view = "sermon-results";
        }, donationToastDuration - ui.timing.churchToastOffset);
      },
      followerChangesArr.length * followerToastDelay + 800,
    );
  }

  // ================= SPICE MECHANICS =================
  function getSpiceMultiplier() {
    // Returns a multiplier for preacher strengths based on consumption vs requirement
    const consumed = my.spice.consumedToday;
    const required = my.spice.requiredAmount;
    const shortage = Math.max(0, required - consumed);
    const excess = Math.max(0, consumed - required);

    let multiplier = 1;

    if (shortage > 0) {
      // Apply penalty for not meeting requirements
      const penalty = Math.min(gameSettings.spice.maxPenalty, shortage * gameSettings.spice.penaltyPerUnit);
      multiplier = 1 - penalty;
    } else if (excess > 0 && my.spice.canOverperform) {
      // Apply bonus for excess consumption
      const bonus = Math.min(gameSettings.spice.maxBonus, excess * gameSettings.spice.bonusPerUnit);
      multiplier = 1 + bonus;
    }

    return Math.max(0.1, multiplier); // Never go below 10% effectiveness
  }

  function progressAddiction() {
    // Calculate addiction progression but don't apply it yet
    const consumed = my.spice.consumedToday;
    const required = my.spice.requiredAmount;
    const excess = Math.max(0, consumed - required);

    if (excess > 0) {
      // Store addiction increase for next day
      my.spice.pendingAddictionIncrease = excess * gameSettings.spice.addictionProgression;
    } else {
      my.spice.pendingAddictionIncrease = 0;
    }
  }

  function applyPendingAddiction() {
    // Apply addiction progression that was calculated yesterday
    if (my.spice.pendingAddictionIncrease > 0) {
      const oldRequirement = Math.ceil(my.spice.requiredAmount);
      my.spice.requiredAmount += my.spice.pendingAddictionIncrease;
      const newRequirement = Math.ceil(my.spice.requiredAmount);
      my.spice.pendingAddictionIncrease = 0;

      // Only return true if the rounded requirement actually changed
      return newRequirement > oldRequirement;
    }
    return false; // No change
  }

  function resetDailySpice() {
    // Calculate but don't apply addiction progression yet
    progressAddiction();

    // DON'T reset daily consumption here - it happens just before purchase screen
  }

  // ================= SPICE DELIVERY SYSTEM =================
  function openPlugInterface() {
    ui.chats.plug.isOpen = true;
  }

  function closePlugInterface() {
    ui.chats.plug.isOpen = false;
  }

  // Harold Chat Functions
  function openHaroldInterface() {
    ui.chats.harold.isOpen = true;
  }

  function closeHaroldInterface() {
    ui.chats.harold.isOpen = false;
  }

  function handleHaroldMessage(data: any) {
    if (data.messages && Array.isArray(data.messages)) {
      data.messages.forEach((message: any) => {
        // Replace typing indicator if specified (use in-place update for smooth transitions)
        if (message.replaceTyping) {
          const typingMessage = my.chats.harold.chatHistory.find((m) => m.isTyping && m.sender === "harold");
          if (typingMessage) {
            // Update the existing message object instead of removing and adding
            typingMessage.text = message.text;
            typingMessage.time = message.time;
            typingMessage.isTyping = false;
          }
        } else {
          // Add new message normally
          my.chats.harold.chatHistory.push(message);
        }
      });
    }
  }

  function buyVan() {
    if (my.money >= gameSettings.van.cost) {
      my.money -= gameSettings.van.cost;
      my.hasVan = true;
    }
  }
  function trackMoneyEarned(amount: number) {
    my.totalMoneyEarned += amount;

    // Check if player qualifies for van but hasn't been contacted yet
    if (!my.chats.harold.hasContacted && my.daysPlayed >= gameSettings.van.daysToUnlock) {
      my.canBuyVan = true;
      setTimeout(() => {
        triggerHaroldContact();
      }, 4000);
    }
  }
  function triggerHaroldContact() {
    my.chats.harold.hasContacted = true;

    // Add just the first message and open chat immediately
    const firstMessage = {
      id: Date.now(),
      sender: "harold",
      text: "hey kid it ur uncl harold",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    my.chats.harold.chatHistory.push(firstMessage);

    // Open Harold chat immediately with just the first message
    setTimeout(() => {
      ui.chats.harold.isOpen = true;
    }, 2200);
    // Queue the rest of the messages with typing simulation
    const subsequentMessages = [
      "i got this van",
      "u need a van???",
      `$${gameSettings.van.cost}`, // This message triggers the van interface
      "u culd relly go places w it",
      "mb help u w ur preachin",
      "wana buy???",
    ];

    let messageIndex = 0;

    function sendNextMessage() {
      if (messageIndex >= subsequentMessages.length) return;

      const messageText = subsequentMessages[messageIndex];

      // Show typing indicator
      const typingMessage = {
        id: Date.now() + 9000 + messageIndex, // Unique ID for typing messages
        sender: "harold",
        text: "",
        time: "",
        isTyping: true,
      };
      my.chats.harold.chatHistory.push(typingMessage);

      // After typing delay, replace with actual message
      setTimeout(() => {
        // Find and update the typing message instead of removing and adding
        const typingMessage = my.chats.harold.chatHistory.find((msg) => msg.isTyping && msg.sender === "harold");
        if (typingMessage) {
          // Update the existing message object
          typingMessage.text = messageText;
          typingMessage.time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          typingMessage.isTyping = false;
        }

        // Van purchase interface will show automatically based on chat history length

        messageIndex++;

        // Queue next message if there are more
        if (messageIndex < subsequentMessages.length) {
          setTimeout(sendNextMessage, 2000); // 2 second delay between messages
        }
      }, 1500); // 1.5 second typing delay
    }

    // Start sending subsequent messages after a short delay
    setTimeout(sendNextMessage, 2500);
  }

  function handlePlugOrder(orderData) {
    if (orderData.messages) {
      // Add messages to chat history
      orderData.messages.forEach((message) => {
        if (message.replaceTyping) {
          // Remove the last typing message and add the actual response
          const typingIndex = my.chats.plug.chatHistory.findIndex((m) => m.isTyping);
          if (typingIndex !== -1) {
            my.chats.plug.chatHistory.splice(typingIndex, 1);
          }
        }
        my.chats.plug.chatHistory.push(message);
      });
    }

    if (orderData.amount > 0) {
      // Process the actual order
      my.chats.plug.totalOrders++;
      my.spice.spiceToDeliver += orderData.amount;
      my.money -= orderData.cost;

      // Show delivery notification for first-time users
      if (my.chats.plug.totalOrders <= 2) {
        setTimeout(() => {
          toast.info("Your spice will be delivered in the morning", {
            timeout: 4000,
          });
        }, 2000);
      }
    }
  }

  function deliverOrderedSpice() {
    if (my.spice.spiceToDeliver > 0) {
      // Auto-consume delivered spice
      my.spice.consumedToday = my.spice.spiceToDeliver;

      // Show delivery notification
      const statusMessages = {
        under: "You're still under-dosed",
        optimal: "You're now feeling normal",
        over: "You're feeling enhanced",
      };

      let status = "optimal";
      if (my.spice.consumedToday < my.spice.requiredAmount) {
        status = "under";
      } else if (my.spice.consumedToday > my.spice.requiredAmount) {
        status = "over";
      }

      toast.success(`${my.spice.spiceToDeliver} spice taken. ${statusMessages[status]}.`, {
        timeout: 4000,
      });

      // Clear delivery queue
      my.spice.spiceToDeliver = 0;
    }
  }
  function advanceToNextDay() {
    // Spice wears off at the end of the day
    my.spice.consumedToday = 0;

    // Reset van travel for the day
    my.hasTraveledToday = false;

    // Calculate pending addiction but don't reset spice consumption yet
    resetDailySpice();

    // Generate new daily themes for tomorrow
    generateDailyThemes();

    // reset daily effects.
    my.effectYesterday = [];
    my.sermonToday = {
      topics: [],
      likedBy: { tags: [], religions: [] },
      dislikedBy: { tags: [], religions: [] },
      mixedMessages: { tags: [], religions: [] },
    };
    ui.selectedTopics = [null, null, null];
    my.followerChanges = [];

    // Start the morning routine (delivery, then show sermon selection)
    startMorningRoutine();
  }

  function startMorningRoutine() {
    // Apply pending addiction increase from yesterday
    const addictionIncreased = applyPendingAddiction();

    // Deliver any ordered spice first thing in the morning
    deliverOrderedSpice();

    // Show notification if addiction increased
    if (addictionIncreased) {
      setTimeout(() => {
        toast.warning(`Your spice addiction has worsened! You now need ${Math.ceil(my.spice.requiredAmount)} units daily.`);
      }, 1000);
    }

    ui.view = "sermon";
  }

  // ================= INITIALISE STUFF AT GAME START =================
  function initialiseScoreCard() {
    my.religiousScorecard = religions.map((r) => ({
      id: r.id,
      name: r.name,
      score: 0,
    }));
  }

  function initialiseFollowers() {
    my.followers = religions.map((r) => ({
      id: r.id,
      name: r.name,
      followers: 0,
    }));
  }

  function initialiseStartingLocation() {
    // Set the starting location (id: 0)
    const startingLocation = places.find((p: any) => p.id === 0);
    if (startingLocation) {
      my.place = { ...startingLocation };
    }
  }

  function initialiseGame() {
    initialiseScoreCard();
    initialiseFollowers();
    initialiseStartingLocation();
    generateDailyThemes();
  }

  function toggleDebugMode() {
    gameSettings.isDebug = !gameSettings.isDebug;
    if (gameSettings.isDebug) {
      console.log("Debug mode enabled");
    } else {
      console.log("Debug mode disabled");
    }
  }

  // ================= COMPUTEDS =================
  const computedTopReligions = computed(() => {
    if (!my.followers || !Array.isArray(my.followers) || my.followers.length === 0) return null;
    const sorted = my.followers.map((f) => f as { id: number; followers: number }).sort((a, b) => (b.followers || 0) - (a.followers || 0));
    if (sorted.length === 0 || (sorted[0].followers || 0) === 0) return null;
    return sorted;
  });

  const computedTopicsYesterday = computed(() => {
    if (!my.sermonYesterday || !Array.isArray(my.sermonYesterday.topics) || my.sermonYesterday.topics.length === 0) {
      return [];
    }
    return my.sermonYesterday.topics
      .map((t: any) => {
        if (t && typeof t === "object") {
          if ("id" in t) return t.id;
          if ("_custom" in t && t._custom.value && "id" in t._custom.value) return t._custom.value.id;
        }
        return null;
      })
      .filter((id: any): id is number => typeof id === "number");
  });

  const sortedAudienceReactions = computed(() => {
    if (!my.audienceReactions || !Array.isArray(my.audienceReactions)) return [];

    return [...my.audienceReactions].sort((a, b) => {
      // First sort by most liked
      if (a.liked !== b.liked) {
        return b.liked - a.liked;
      }
      // Then by most disliked (if liked is 0)
      if (a.liked === 0 && b.liked === 0 && a.disliked !== b.disliked) {
        return b.disliked - a.disliked;
      }
      // Finally by most heard (if both liked and disliked are 0)
      if (a.liked === 0 && b.liked === 0 && a.disliked === 0 && b.disliked === 0) {
        const totalA = a.liked + a.disliked + a.neutral;
        const totalB = b.liked + b.disliked + b.neutral;
        return totalB - totalA;
      }
      return 0;
    });
  });

  const totalIgnoredAudience = computed(() => {
    if (!my.audienceReactions || !Array.isArray(my.audienceReactions)) return 0;

    return my.audienceReactions.filter((reaction) => reaction.liked === 0 && reaction.disliked === 0).reduce((total, reaction) => total + reaction.neutral, 0);
  });

  const availablePlaces = computed(() => {
    if (my.hasVan) {
      // Filter out Starting Location (id: 0) and current location when player has a van
      const currentPlaceId = (my.place as any)?.id;
      return places.filter((place) => place.id !== 0 && place.id !== currentPlaceId);
    }
    return places;
  });

  // ================= LIFECYCLE =================
  onMounted(() => {
    initialiseGame();
    my.name = localStorage.getItem("kindaFunPlayerName") || "";
  });
</script>

<template lang="pug" src="./Megachurch.pug"></template>
<style lang="scss" src="./Megachurch.scss"></style>
