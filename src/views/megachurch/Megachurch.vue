<script setup lang="ts">
  // ================= IMPORTS =================
  import { onMounted, reactive, ref, computed, watchEffect, watch, h } from "vue";
  import Multiselect from "@vueform/multiselect";
  import "@vueform/multiselect/themes/default.css";
  import { religions } from "./ts/_religions";
  import { places } from "./ts/_places";
  import { themes } from "./ts/_sermons";

  import { randomNumber, randomFrom, shuffle, addCommas, findInArray, removeFromArray, percentOf, sendEvent, dollars } from "../../shared/js/_functions.js";
  import { ui, my, gameSettings } from "./ts/_variables";

  // Toasts
  import Toast, { POSITION } from "vue-toastification";
  import FollowerToast from "./components/Toasts/FollowerToast.vue";
  import ListenerToast from "./components/Toasts/ListenerToast.vue";
  import DonationToast from "./components/Toasts/DonationToast.vue";
  import MerchToast from "./components/Toasts/MerchToast.vue";
  import Chat from "./components/Chat/Chat.vue";
  import SterlingNote from "./components/Sterling/SterlingNote.vue";
  import WorshopZoneBanner from "./components/WorshopZone/WorshopZoneBanner.vue";
  import WorshopZone from "./components/WorshopZone/WorshopZone.vue";
  import HeatMeter from "./components/EternalLegacy/HeatMeter.vue";
  import EternalLegacyShop from "./components/EternalLegacy/EternalLegacyShop.vue";
  import SterlingVoicemail from "./components/Sterling/SterlingVoicemail.vue";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  // Component references
  const sterlingNoteRef = ref<{ showNote: () => void } | null>(null);

  import type { Theme, Place, WeightedTag, WeightedReligion, MixedTag, MixedReligion, Sermon, Religion, UI, My } from "./ts/_types";

  import {
    computeTopicsYesterday,
    sortAudienceReactions,
    calculateIgnoredAudience,
    getAvailablePlaces,
    computeTopReligions,
    getPurchasedItems,
    computeTemporarySermonScores,
  } from "./ts/_computeds";

  // ================= FUNCTIONS =================

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
    if (!id) {
      return { name: "Unknown" };
    }
    const religion = (religions as any[]).find((r) => r.id === id);
    if (!religion) {
      return { name: "Unknown" };
    }
    return religion;
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

  // Church setup functions
  function foundChurch() {
    if (!my.church.name || !ui.churchLocationIndex || !ui.churchReligionIndex) {
      return;
    }

    const churchLocation = places.find((p: any) => p.id === ui.churchLocationIndex);
    const churchReligion = religions.find((r: any) => r.id === ui.churchReligionIndex);

    if (churchLocation && churchReligion) {
      my.church.isFounded = true;
      my.church.location = { ...churchLocation };
      my.church.religion = { ...churchReligion };
      my.isStreetPreaching = false; // No longer street preaching
      my.congregation = []; // Initialize empty congregation

      // Send message to Sterling confirming the church
      const confirmationMessage = {
        id: Date.now(),
        sender: "sterling",
        text: `Excellent choice, ${my.name}. The ${my.church.name} in ${churchLocation.name} will serve us well. Remember our arrangement - I expect my cut every day.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      my.chats.sterling.chatHistory.push(confirmationMessage);

      // Close Sterling chat and go back to game
      ui.chats.sterling.isOpen = false;
      ui.view = "sermon";

      // Show success toast
      toast.success(`${my.church.name} has been established!`);
    }
    if (my.place.name != my.church.location.name) {
      my.place = { ...my.church.location };
      toast.info(`You have moved to ${my.church.location.name}.`);
    }
    advanceToNextDay();
  }

  function cancelChurchSetup() {
    ui.view = "sermon-results";
    ui.chats.sterling.isOpen = false;
  }

  function showThemeDescription(id: number): string {
    const theme = (themes as Theme[]).find((s) => s.id === id);
    return theme ? theme.desc || "" : "";
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
    // Create sermon objects for tracking but don't update scorecard yet
    // Scorecard updates only happen in church preaching
    my.sermonYesterday = Object.assign({}, my.sermonToday);

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
    let totalDonors = 0;
    const likers = crowd.filter((p) => p.reaction === "like");

    for (const liker of likers) {
      if (Math.random() * 100 < settings.donation.chance) {
        const donation = randomNumber(settings.donation.min, settings.donation.max);
        totalDonations += donation;
        totalDonors++;
        // TODO: Future enhancement - modify donation amount based on location's avgNetWorth
      }
    }

    // Store donation amount and statistics
    const roundedDonations = Math.round(totalDonations * 100) / 100;
    my.donationsYesterday = roundedDonations;
    my.streetDonorsYesterday = totalDonors;
    my.streetAttendanceYesterday = crowd.length;

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
            totalEarnings: donationAmount,
            totalDonations: donationAmount,
            totalMerch: 0,
            sterlingCut: 0,
          }),
          {
            position: POSITION.BOTTOM_LEFT,
            timeout: ui.timing.donationToastDuration,
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
              timeout: ui.timing.toastDuration,
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
              timeout: ui.timing.toastDuration,
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
              timeout: ui.timing.toastDuration,
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
          totalEarnings: donationAmount,
          totalDonations: donationAmount,
          totalMerch: 0,
          sterlingCut: 0,
        }),
        {
          position: POSITION.BOTTOM_LEFT,
          timeout: ui.timing.donationToastDuration,
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
              timeout: ui.timing.toastDuration,
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
              timeout: ui.timing.toastDuration,
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
              timeout: ui.timing.toastDuration,
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
          totalEarnings: donationAmount,
          totalDonations: donationAmount,
          totalMerch: 0,
          sterlingCut: 0,
        }),
        {
          position: POSITION.BOTTOM_LEFT,
          timeout: ui.timing.toastDuration,
        },
      );

      // Switch to results view
      setTimeout(() => {
        ui.view = "sermon-results";
      }, ui.timing.resultsViewDelay);
    }, finalDelay);
  }

  function gatherChurchAudience(): number {
    if (!my.church.isFounded || !my.church.location) {
      return 0;
    }

    // Start with base attendance
    let churchAttendees = gameSettings.churchPreaching.expectedAttendees;

    // Apply preacher strength
    churchAttendees = Math.round(churchAttendees * (my.preacherStrengths?.gatherCrowd || 1));

    // Apply buzz effect - multiply buzz by buzzMultiplier to get extra attendees
    const buzzBonus = Math.round(my.church.buzz * gameSettings.church.buzzMultiplier);
    churchAttendees += buzzBonus;

    // Apply marketing effects to attendance (marketing was purchased yesterday, affects today)
    if (my.marketing.generalAdActive) {
      churchAttendees = Math.round(churchAttendees * (1 + gameSettings.church.marketing.generalAd.attendanceBoost / 100));
    }
    if (my.marketing.signSpinnerActive) {
      churchAttendees = Math.round(churchAttendees * (1 + gameSettings.church.marketing.signSpinner.attendanceBoost / 100));
    }

    // Calculate effective church capacity (base + extra pews)
    const maxPews = gameSettings.church.upgrades.extraPews.maxPews;
    const actualExtraPews = Math.min(my.church.upgrades.extraPews, maxPews);
    const effectiveCapacity = my.church.maxAttendance + actualExtraPews * gameSettings.church.upgrades.extraPews.capacityIncrease;

    // Cap attendance at church capacity
    const finalAttendance = Math.min(churchAttendees, effectiveCapacity);

    // Show toast if we hit capacity
    if (churchAttendees > effectiveCapacity) {
      setTimeout(() => {
        toast("🏛️ Your church is at maximum capacity! Consider expanding.", {
          position: POSITION.BOTTOM_LEFT,
          timeout: ui.timing.toastDuration,
        });
      }, 500);
    }

    return finalAttendance;
  }

  function createChurchSermonEffect() {
    ui.view = "preaching";
    my.church.days += 1;

    // Check if player has a church, if not fall back to street preaching
    if (!my.church.isFounded || !my.church.location) {
      // Fall back to old street preaching logic
      createStreetPreachingEffect();
      return;
    }

    const churchLocation = my.church.location as Place;
    if (!churchLocation || !churchLocation.religions || !Array.isArray(churchLocation.religions)) return;

    // Get spice multiplier for this sermon
    const spiceMultiplier = getSpiceMultiplier();

    // Gather today's church attendance
    const churchAttendees = gatherChurchAudience();

    // Build today's congregation from church location demographics and scorecard
    const todaysCongregation: Array<{
      id: number;
      count: number;
      likes: number;
      dislikes: number;
    }> = [];

    // Use scorecard to adjust weights for church attendance
    const scorecardMap = new Map<number, { score: number }>();
    my.religiousScorecard.forEach((entry: any) => {
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
      if (my.church.religion && my.church.religion.id === locationReligion.id) {
        weight += scorecardScore; // Add scorecard score again for doubling effect
      }

      // Apply targeted marketing boost
      if (my.marketing.targetedAd.active && my.marketing.targetedAd.targetReligion?.id === locationReligion.id) {
        weight = Math.round(weight * (1 + gameSettings.church.marketing.targetedAd.targetReligionBoost / 100));
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

    // Calculate likes and dislikes for each religious group
    todaysCongregation.forEach((group) => {
      const religion = religions.find((r: any) => r.id === group.id);
      if (!religion) return;

      // Topic repetition penalty
      let repetitionPenalty = 1;
      if (my.sermonYesterday && Array.isArray(my.sermonYesterday.topics)) {
        const preachedYesterday = my.sermonYesterday.topics.some((t: any) => my.sermonToday.topics.some((tt: any) => tt.id === t.id));
        if (preachedYesterday) repetitionPenalty = gameSettings.churchPreaching.topicRepetitionPenalty;
      }

      // First, get likes and dislikes by religion match
      if (!my.sermonToday.mixedMessages.religions.find((mr: any) => mr.id === group.id)) {
        // Check for dislikes by religion
        const dislikedReligionMatch = my.sermonToday.dislikedBy.religions.find((dr: any) => dr.id === group.id);
        if (dislikedReligionMatch) {
          const dislikeChance = gameSettings.churchPreaching.dislikeChance.byReligion / 100;
          const modifiedChance = dislikeChance * (my.preacherStrengths?.getDislikes || 1) * spiceMultiplier * repetitionPenalty;
          group.dislikes += Math.round(group.count * modifiedChance);
        }

        // Check for likes by religion
        const likedReligionMatch = my.sermonToday.likedBy.religions.find((lr: any) => lr.id === group.id);
        if (likedReligionMatch) {
          const likeChance = gameSettings.churchPreaching.likeChance.byReligion / 100;
          const modifiedChance = likeChance * (my.preacherStrengths?.getLikes || 1) * spiceMultiplier * repetitionPenalty;
          group.likes += Math.round(group.count * modifiedChance);
        }
      }

      // Then, get likes and dislikes by tag match
      const allSermonTags = [
        ...my.sermonToday.likedBy.tags.map((tag: any) => ({ ...tag, sermon: "positive" })),
        ...my.sermonToday.dislikedBy.tags.map((tag: any) => ({ ...tag, sermon: "negative" })),
      ].filter((tag: any) => !my.sermonToday.mixedMessages.tags.find((mt: any) => mt.tag === tag.tag));

      // Shuffle tags for random checking order
      const shuffledTags = shuffle([...allSermonTags]);

      shuffledTags.forEach((sermonTag: any) => {
        let tagScore = 0;

        // Calculate tag score based on religion's preferences
        if (religion.likes.includes(sermonTag.tag)) {
          tagScore += sermonTag.sermon === "positive" ? sermonTag.weight : -sermonTag.weight;
        }
        if (religion.dislikes.includes(sermonTag.tag)) {
          tagScore += sermonTag.sermon === "positive" ? -sermonTag.weight : sermonTag.weight;
        }

        // Apply tag score to likes/dislikes
        if (tagScore > 0) {
          const likeChance = (gameSettings.churchPreaching.likeChance.byTag / 100) * (tagScore / 5);
          const modifiedChance = likeChance * (my.preacherStrengths?.getLikes || 1) * spiceMultiplier * repetitionPenalty;
          group.likes += Math.round(group.count * Math.min(modifiedChance, 0.5));
        } else if (tagScore < 0) {
          const dislikeChance = (gameSettings.churchPreaching.dislikeChance.byTag / 100) * (Math.abs(tagScore) / 5);
          const modifiedChance = dislikeChance * (my.preacherStrengths?.getDislikes || 1) * spiceMultiplier * repetitionPenalty;
          group.dislikes += Math.round(group.count * Math.min(modifiedChance, 0.5));
        }
      });

      // Apply church upgrade effects to likes
      let upgradeBonus = 0;

      // Audio/Visual equipment increases like chance
      if (my.church.upgrades.audioVisual) {
        upgradeBonus += gameSettings.church.upgrades.audioVisual.likeBoost / 100;
      }

      // Sacrament upgrades increase like chance
      if (my.church.upgrades.sacrament.wine.level > 0) {
        const wineLevel = gameSettings.church.upgrades.sacraments.wine.levels[my.church.upgrades.sacrament.wine.level];
        if (wineLevel) {
          upgradeBonus += wineLevel.likeBoost / 100;
        }
      }

      if (my.church.upgrades.sacrament.bread.level > 0) {
        const breadLevel = gameSettings.church.upgrades.sacraments.bread.levels[my.church.upgrades.sacrament.bread.level];
        if (breadLevel) {
          upgradeBonus += breadLevel.likeBoost / 100;
        }
      }

      // Apply targeted marketing effects to specific religions
      if (my.marketing.targetedAd.active && my.marketing.targetedAd.targetReligion?.id === group.id) {
        upgradeBonus += gameSettings.church.marketing.targetedAd.targetReligionBoost / 100;
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

    // Store congregation data for potential future use
    my.congregation = todaysCongregation;

    // Create audience reactions for the results display (church preaching version)
    my.audienceReactions = todaysCongregation.map((group) => {
      const religion = religions.find((r: any) => r.id === group.id);
      return {
        id: group.id,
        name: religion?.name || `Religion ${group.id}`,
        liked: group.likes,
        disliked: group.dislikes,
        neutral: group.count - group.likes - group.dislikes,
        followerName: religion?.follower || "follower",
        followersName: religion?.followers || "followers",
      };
    });

    // Update scorecard and track daily change - ONLY based on likes/dislikes from congregation
    todaysCongregation.forEach((group) => {
      const scorecardEntry = my.religiousScorecard.find((entry: any) => entry.id === group.id);
      if (scorecardEntry) {
        const change = group.likes - group.dislikes;
        scorecardEntry.score += change;
        scorecardEntry.change = change;
      }
    });

    // Apply PR campaign reputation boost if active
    if (my.marketing.prCampaign.active && my.marketing.prCampaign.targetReligion) {
      const targetEntry = my.religiousScorecard.find((entry: any) => entry.id === my.marketing.prCampaign.targetReligion.id);
      if (targetEntry) {
        targetEntry.score += gameSettings.church.marketing.prCampaign.reputationBoost;
        // Add to existing change or create new change if none exists
        targetEntry.change = (targetEntry.change || 0) + gameSettings.church.marketing.prCampaign.reputationBoost;
      }
    }

    // Force Vue reactivity by replacing the scorecard array
    my.religiousScorecard = my.religiousScorecard.map((entry) => ({ ...entry }));

    // Update church buzz based on overall sermon performance
    // Calculate total likes minus dislikes for buzz adjustment
    const buzzLikes = todaysCongregation.reduce((sum, group) => sum + group.likes, 0);
    const buzzDislikes = todaysCongregation.reduce((sum, group) => sum + group.dislikes, 0);
    const buzzChange = buzzLikes - buzzDislikes;

    // Update buzz, ensuring it never goes below 0
    my.church.buzz = Math.max(0, my.church.buzz + buzzChange);

    // Calculate total donations from people who liked the sermon
    let totalLikes = 0;
    let totalDonations = 0;
    let totalDonors = 0;
    let totalAttendance = 0;

    todaysCongregation.forEach((group) => {
      totalLikes += group.likes;
      totalAttendance += group.count;

      // Calculate donations from this group
      const donationChance = gameSettings.churchPreaching.donation.chance / 100;
      const donors = Math.round(group.likes * donationChance);
      totalDonors += donors;

      for (let i = 0; i < donors; i++) {
        const donation = randomNumber(gameSettings.churchPreaching.donation.min, gameSettings.churchPreaching.donation.max);
        totalDonations += donation;
      }
    });

    // Apply donation strength multiplier
    totalDonations *= (my.preacherStrengths?.getDonations || 1) * spiceMultiplier;
    totalDonations = Math.round(totalDonations * 100) / 100; // Round to cents

    // Calculate merch sales revenue
    let totalMerchRevenue = 0;
    let merchSalesDetails = {
      holyWater: { sold: 0, revenue: 0 },
      prayerCandles: { sold: 0, revenue: 0 },
      energyDrinks: { sold: 0, revenue: 0 },
    };

    todaysCongregation.forEach((group) => {
      // Each person in the group gets a chance to buy merch
      for (let i = 0; i < group.count; i++) {
        // Holy Water sales
        if (my.church.merch.holyWater.inventory > 0) {
          let holyWaterChance = gameSettings.church.merch.holyWaterBottles.baseChance / 100;
          if (my.church.merch.holyWater.isVendingMachine) {
            holyWaterChance += gameSettings.church.merch.holyWaterVendingMachine.bonusChance / 100;
          }
          if (Math.random() < holyWaterChance) {
            my.church.merch.holyWater.inventory--;
            my.church.merch.holyWater.soldToday++;
            merchSalesDetails.holyWater.sold++;
            const revenue = my.church.merch.holyWater.price;
            merchSalesDetails.holyWater.revenue += revenue;
            totalMerchRevenue += revenue;
          }
        }

        // Prayer Candles sales
        if (my.church.merch.prayerCandles.inventory > 0) {
          const candleChance = gameSettings.church.merch.bluetoothPrayerCandles.baseChance / 100;
          if (Math.random() < candleChance) {
            my.church.merch.prayerCandles.inventory--;
            my.church.merch.prayerCandles.soldToday++;
            merchSalesDetails.prayerCandles.sold++;
            const revenue = my.church.merch.prayerCandles.price;
            merchSalesDetails.prayerCandles.revenue += revenue;
            totalMerchRevenue += revenue;
          }
        }

        // Energy Drinks sales
        if (my.church.merch.energyDrinks.inventory > 0) {
          const drinkChance = gameSettings.church.merch.saintsFlow.baseChance / 100;
          if (Math.random() < drinkChance) {
            my.church.merch.energyDrinks.inventory--;
            my.church.merch.energyDrinks.soldToday++;
            merchSalesDetails.energyDrinks.sold++;
            const revenue = my.church.merch.energyDrinks.price;
            merchSalesDetails.energyDrinks.revenue += revenue;
            totalMerchRevenue += revenue;
          }
        }
      }
    });

    totalMerchRevenue = Math.round(totalMerchRevenue * 100) / 100; // Round to cents

    // Calculate VIP confession booth revenue
    let confessionRevenue = 0;
    if (my.church.upgrades.vipConfessionBooths) {
      // VIP confession booths generate revenue based on total attendance
      // Assuming some percentage of attendees use the VIP confession service
      const confessionUsers = Math.round(totalAttendance * 0.15); // 15% of attendees use VIP confession
      confessionRevenue = confessionUsers * gameSettings.church.upgrades.vipConfessionBooths.revenuePerUse;
      confessionRevenue = Math.round(confessionRevenue * 100) / 100; // Round to cents
    }

    // Store church preaching statistics for results display
    my.donationsYesterday = totalDonations; // Total before Sterling's cut
    my.churchAttendanceYesterday = totalAttendance;
    my.churchDonorsYesterday = totalDonors;
    my.merchRevenueYesterday = totalMerchRevenue;
    my.merchSalesDetailsYesterday = merchSalesDetails;
    my.confessionRevenueYesterday = confessionRevenue;

    // Show audience reactions in toasts
    const reactionToastDuration = ui.timing.toastDuration;
    const reactionToastDelay = 1400;

    todaysCongregation
      .filter((group) => group.likes > 0 || group.dislikes > 0)
      .forEach((group, i) => {
        setTimeout(() => {
          const religion = religions.find((r: any) => r.id === group.id);

          // Show separate toasts for likes and dislikes if both exist
          if (group.likes > 0) {
            toast(
              {
                component: ListenerToast,
                props: {
                  reaction: "liked",
                  count: group.likes,
                  religion: religion,
                  religionMatch: my.church.religion && my.church.religion.id === group.id,
                  tagMatch: false,
                  primaryTag: null,
                },
              },
              {
                position: POSITION.BOTTOM_LEFT,
                timeout: reactionToastDuration,
              },
            );
          }

          if (group.dislikes > 0) {
            setTimeout(
              () => {
                toast(
                  {
                    component: ListenerToast,
                    props: {
                      reaction: "disliked",
                      count: group.dislikes,
                      religion: religion,
                      religionMatch: my.church.religion && my.church.religion.id === group.id,
                      tagMatch: false,
                      primaryTag: null,
                    },
                  },
                  {
                    position: POSITION.BOTTOM_LEFT,
                    timeout: reactionToastDuration,
                  },
                );
              },
              group.likes > 0 ? 800 : 0,
            ); // Delay if we showed a like toast first
          }
        }, i * reactionToastDelay);
      });

    // Show donation toast after all reactions
    const finalDelay = todaysCongregation.length * reactionToastDelay + 2000;
    setTimeout(() => {
      // Apply Sterling's cut to combined donations, merch revenue, AND confession revenue
      const totalChurchRevenue = totalDonations + totalMerchRevenue + confessionRevenue;
      let playerShare = totalChurchRevenue;
      let sterlingCut = 0;

      if (my.chats.sterling.hasContacted && my.eternalLegacy.sterlingAlive) {
        const cutPercentage = gameSettings.churchPreaching.sterling.cutPercentage / 100;
        const minimumCut = gameSettings.churchPreaching.sterling.minimumCut;

        sterlingCut = Math.max(minimumCut, totalChurchRevenue * cutPercentage);
        playerShare = totalChurchRevenue - sterlingCut;

        if (playerShare < 0) {
          sterlingCut = totalChurchRevenue;
          playerShare = 0;
        }
      } else {
        // If Sterling hasn't contacted yet, player gets all revenue
        playerShare = totalChurchRevenue;
      }

      my.money += playerShare;

      // Store Sterling's cut for results display
      my.sterlingCutYesterday = sterlingCut;
      my.playerShareYesterday = playerShare;

      // Show merch toast first if there's merch sales, confession revenue, or a no-merch message if player owns merch but sold none
      const hasMerchSales = totalMerchRevenue > 0;
      const hasConfessionRevenue = confessionRevenue > 0;
      const ownsMerch =
        my.church.merch.holyWater.inventory > 0 ||
        my.church.merch.holyWater.soldToday > 0 ||
        my.church.merch.prayerCandles.inventory > 0 ||
        my.church.merch.prayerCandles.soldToday > 0 ||
        my.church.merch.energyDrinks.inventory > 0 ||
        my.church.merch.energyDrinks.soldToday > 0;

      if (hasMerchSales || hasConfessionRevenue || ownsMerch) {
        setTimeout(() => {
          toast(
            {
              component: MerchToast,
              props: {
                totalMerchRevenue: totalMerchRevenue,
                merchSalesDetails: merchSalesDetails,
                confessionRevenue: confessionRevenue,
              },
            },
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.timing.toastDuration,
            },
          );
        }, 0);
      }

      // Show donation toast after merch toast (or immediately if no merch)
      const donationToastDelay = hasMerchSales || hasConfessionRevenue || ownsMerch ? 3000 : 0;
      setTimeout(() => {
        toast(
          {
            component: DonationToast,
            props: {
              totalEarnings: playerShare + confessionRevenue,
              totalDonations: totalDonations,
              totalMerch: totalMerchRevenue,
              sterlingCut: sterlingCut,
            },
          },
          {
            position: POSITION.BOTTOM_LEFT,
            timeout: ui.timing.donationToastDuration,
          },
        );
      }, donationToastDelay);

      // Add Sterling's cut message if applicable
      if (sterlingCut > 0) {
        setTimeout(() => {
          const cutMessage = {
            id: Date.now(),
            sender: "sterling",
            text: `My cut for today: ${dollars(sterlingCut)}. The Lord rewards those who honor their business commitments.`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          my.chats.sterling.chatHistory.push(cutMessage);
        }, 3000);
      }

      // Switch to results view
      setTimeout(() => {
        ui.view = "sermon-results";

        // Is it time for Sterling's voicemail?
        checkEternalLegacyTrigger();
      }, ui.timing.resultsViewDelay);
    }, finalDelay);
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
      // Store addiction increase for next day (rounded to integer)
      my.spice.pendingAddictionIncrease = Math.round(excess * gameSettings.spice.addictionProgression);
    } else {
      my.spice.pendingAddictionIncrease = 0;
    }
  }

  function applyPendingAddiction() {
    // Apply addiction progression that was calculated yesterday
    if (my.spice.pendingAddictionIncrease > 0) {
      const oldRequirement = my.spice.requiredAmount;
      my.spice.requiredAmount = my.spice.requiredAmount + my.spice.pendingAddictionIncrease;
      const newRequirement = my.spice.requiredAmount;
      my.spice.pendingAddictionIncrease = 0;
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

  function handlePlugMessage(data: any) {
    if (data.messages && Array.isArray(data.messages)) {
      data.messages.forEach((message: any) => {
        // Replace typing indicator if specified (use in-place update for smooth transitions)
        if (message.replaceTyping) {
          const typingMessage = my.chats.plug.chatHistory.find((m) => m.isTyping && m.sender === "plug");
          if (typingMessage) {
            // Update the existing message object instead of removing and adding
            typingMessage.text = message.text;
            typingMessage.time = message.time;
            typingMessage.isTyping = false;
          }
        } else {
          // Add new message normally
          my.chats.plug.chatHistory.push(message);
        }
      });
    }
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

  function openSterlingInterface() {
    ui.chats.sterling.isOpen = true;
  }

  function closeSterlingInterface() {
    ui.chats.sterling.isOpen = false;
  }

  function showWorkshopZone() {
    if (ui.workshopZone.showBanner && my.church.isFounded) {
      ui.workshopZone.showBanner = true;
    } else {
      ui.workshopZone.isOpen = true;
    }
  }

  function closeWorkshopZone() {
    ui.workshopZone.isOpen = false;
    ui.workshopZone.showBanner = false;
  }

  function onBannerAccepted() {
    ui.workshopZone.showBanner = false;
    ui.workshopZone.isOpen = true;
  }

  function openWorkshopZoneForSeraph() {
    // Mark nag as shown and open Workshop Zone to Upgrades tab
    ui.seraphAINag.hasShown = true;
    ui.workshopZone.defaultTab = "upgrades";
    ui.workshopZone.isOpen = true;
  }

  function dismissSeraphNag() {
    ui.seraphAINag.hasShown = true;
  }

  // === Eternal Legacy Shop Functions ===

  function showEternalLegacyShop() {
    if (my.eternalLegacy.isActive) {
      ui.eternalLegacyShop.isOpen = true;
    } else {
      toast.warning("The Eternal Legacy catalog is not yet available.");
    }
  }

  function closeEternalLegacyShop() {
    ui.eternalLegacyShop.isOpen = false;
  }

  function handleEternalLegacyPurchase({ item, category }) {
    if (my.money < item.cost) {
      toast.error("Insufficient funds for this divine acquisition.");
      return;
    }

    if (my.eternalLegacy.purchasedItems.includes(item.id)) {
      toast.warning("You already own this item.");
      return;
    }

    // Process purchase
    my.money -= item.cost;
    my.eternalLegacy.purchasedItems.push(item.id);

    if (category === "mammon") {
      // Mammon items increase score
      my.eternalLegacy.totalMammon += item.mammon;
      toast.success(`${item.name} acquisition secured! +${item.mammon} mammon`);
    } else if (category === "underTheTable") {
      // Handle Under The Table item effects
      updateHeat(item.heat);

      // Apply specific mechanics based on item ID
      switch (item.id) {
        case "shredder":
          // Slows heat gain - could be implemented as a modifier
          toast.success(`${item.name}: Documents shredded. Heat gain reduced, but church reputation damaged.`);
          break;

        case "sterling-cut":
          // Increase Sterling's cut permanently
          my.eternalLegacy.sterlingCutModifier += 10; // 10% additional cut
          toast.success(`${item.name}: Sterling handles the authorities. His cut of your income increases permanently.`);
          break;

        case "tax-attorney":
          // Reduce Sterling payments but increase heat and scandal
          toast.success(`${item.name}: Legal protection secured. Sterling's leverage reduced, but congregation scandalized.`);
          break;

        case "consultation-tony":
          // Eliminate Sterling but massive heat increase
          my.eternalLegacy.sterlingAlive = false;
          toast.error(`${item.name}: Sterling has been... permanently removed. Heat MASSIVELY increased!`);
          break;
      }

      toast.warning(`🔥 Heat increased by ${item.heat}! Current: ${my.eternalLegacy.heat}/${gameSettings.eternalLegacy.heat.max}`);
    }

    // Don't auto-close shop - let player continue shopping
  }

  function handleSterlingMessage(data: any) {
    if (data.messages && Array.isArray(data.messages)) {
      data.messages.forEach((message: any) => {
        // Replace typing indicator if specified
        if (message.replaceTyping) {
          const typingMessage = my.chats.sterling.chatHistory.find((m) => m.isTyping && m.sender === "sterling");
          if (typingMessage) {
            typingMessage.text = message.text;
            typingMessage.time = message.time;
            typingMessage.isTyping = false;
          }
        } else {
          // Add new message normally
          my.chats.sterling.chatHistory.push(message);
        }
      });
    }
  }

  function handleChurchFounding() {
    // Close Sterling chat and show church setup UI
    ui.chats.sterling.isOpen = false;
    ui.view = "church-setup";
  }

  function trackMoneyEarned(amount: number) {
    my.totalMoneyEarned += amount;

    // Check if player qualifies for van but hasn't been contacted yet
    if (!my.chats.harold.hasContacted && my.daysPlayed >= gameSettings.triggers.harold.days) {
      my.canBuyVan = true;
      setTimeout(() => {
        triggerHaroldContact();
      }, 4000);
    }

    // Check if player qualifies for Sterling contact (church phase)
    // Trigger when player has had a van for the required amount of days.
    if (!my.chats.sterling.hasContacted && my.hasVan && my.chats.sterling.daysWithVan >= gameSettings.triggers.sterling.daysWithVan) {
      setTimeout(() => {
        triggerSterlingContact();
      }, 6000);
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

  function triggerSterlingContact() {
    my.chats.sterling.hasContacted = true;

    // Show toast that player found a note
    toast(
      {
        component: h("div", { class: "sterling-note-toast" }, [h("strong", "You found a note on your van"), h("br"), h("span", "A handwritten message...")]),
      },
      {
        position: POSITION.BOTTOM_RIGHT,
        timeout: ui.timing.toastDuration,
        onClose: () => {
          // Show the actual note after toast disappears
          setTimeout(() => {
            if (sterlingNoteRef.value) {
              sterlingNoteRef.value.showNote();
            }
          }, 500);
        },
      },
    );
  }

  function onSterlingNoteRead() {
    // After reading the note, Sterling becomes available for texting
    // No initial chat messages - player must initiate contact
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
          toast.info("🚚 Your spice will be delivered in the morning", {
            timeout: 3500,
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
        under: "⚠️ You're still under-dosed",
        optimal: "You're now feeling normal",
        over: "⚡ You're feeling enhanced",
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
    my.daysPlayed += 1;
    if (!my.chats.sterling.hasContacted && my.hasVan) {
      my.chats.sterling.daysWithVan += 1;
    }

    // Check for Eternal Legacy trigger
    //checkEternalLegacyTrigger();

    // Update heat if Eternal Legacy is active
    if (my.eternalLegacy.isActive) {
      updateHeat(gameSettings.eternalLegacy.heat.dailyBaseIncrease);
    }

    // Calculate pending addiction BEFORE resetting spice consumption
    resetDailySpice();

    // Spice wears off at the end of the day (AFTER addiction calculation)
    my.spice.consumedToday = 0;

    // Reset van travel for the day
    my.hasTraveledToday = false;

    // Reset marketing effects (they only last one day)
    my.marketing.generalAdActive = false;
    my.marketing.signSpinnerActive = false;
    my.marketing.targetedAd.active = false;
    my.marketing.targetedAd.targetReligion = null;
    my.marketing.prCampaign.active = false;
    my.marketing.prCampaign.targetReligion = null;

    // Process daily Seraph AI subscription cost
    my.seraphAICostYesterday = 0;
    if (my.church.upgrades.seraphAI) {
      const dailyCost = gameSettings.church.upgrades.seraphAI.cost;
      if (my.money >= dailyCost) {
        my.money -= dailyCost;
        my.seraphAICostYesterday = dailyCost;
      } else {
        // Can't afford subscription - deactivate service
        my.church.upgrades.seraphAI = false;
        toast.warning("Seraph AI subscription cancelled due to insufficient funds.");
      }
    }

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

    if (my.spice.consumedToday >= my.spice.fatalAmount) {
      toast.error("Uh oh", { timeout: 3000 });
      setTimeout(() => {
        toast.error("That was probably too much...", { timeout: 4000 });
      }, 1000);
      // Blur and darken the screen by adding a class to body
      //document.body.classList.add("fatal-overdose-blur");
      ui.view = "game-over";
      my.gameOverCause = "drug overdose";
    } else {
      ui.view = "sermon";
    }
  }

  // ================= ETERNAL LEGACY SYSTEM =================
  function checkEternalLegacyTrigger() {
    // Only trigger if church is founded and we haven't already activated Eternal Legacy
    if (!my.church.isFounded || my.eternalLegacy.isActive) {
      return;
    }

    if (my.church.days >= gameSettings.eternalLegacy.trigger.churchDays) {
      triggerEternalLegacy();
    }
  }

  function triggerEternalLegacy() {
    my.eternalLegacy.isActive = true;
    my.eternalLegacy.voicemailReplayAvailable = true;

    // Show voicemail notification
    setTimeout(() => {
      toast.info("You have a new voicemail from Sterling.", {
        timeout: 10000,
      });

      // Open voicemail interface after 3 seconds
      setTimeout(() => {
        ui.sterlingVoicemail.isOpen = true;
      }, 3000);
    }, 1000);
  }

  function playEternalLegacyVoicemail() {
    // This is now called when manually triggering voicemail replay
    ui.sterlingVoicemail.isOpen = true;
  }

  function closeSterlingVoicemail() {
    ui.sterlingVoicemail.isOpen = false;
    my.eternalLegacy.voicemailPlayed = true;

    // Show heat meter notification
    setTimeout(() => {
      toast.warning("The Heat Meter is now tracking federal attention. Your days are numbered.");
    }, 1000);

    // Check for immediate endgame trigger
    if (my.eternalLegacy.heat >= gameSettings.eternalLegacy.heat.max) {
      triggerEndgame();
    }
  }

  function openEternalLegacyFromVoicemail() {
    my.eternalLegacy.voicemailPlayed = true;
    ui.eternalLegacyShop.isOpen = true;

    // Check for immediate endgame trigger
    if (my.eternalLegacy.heat >= gameSettings.eternalLegacy.heat.max) {
      triggerEndgame();
    }
  }

  function updateHeat(amount: number) {
    my.eternalLegacy.heat = Math.min(my.eternalLegacy.heat + amount, gameSettings.eternalLegacy.heat.max);

    // Check for endgame trigger
    if (my.eternalLegacy.heat >= gameSettings.eternalLegacy.heat.max) {
      triggerEndgame();
    }
  }

  function triggerEndgame() {
    toast.error("🚨 FEDERAL INVESTIGATION INITIATED 🚨");

    // Close any open dialogs
    ui.eternalLegacyShop.isOpen = false;
    ui.sterlingVoicemail.isOpen = false;

    // Switch to game over view
    setTimeout(() => {
      ui.view = "game-over";
    }, 2000);
  }

  // function enterFullscreen() {
  //   // Try to request fullscreen on the main game container for best compatibility
  //   const el = document.getElementById("app") || document.body;
  //   if (el.requestFullscreen) {
  //     el.requestFullscreen();
  //   } else if ((el as any).webkitRequestFullscreen) {
  //     (el as any).webkitRequestFullscreen();
  //   } else if ((el as any).msRequestFullscreen) {
  //     (el as any).msRequestFullscreen();
  //   }
  // }
  // document.addEventListener("fullscreenchange", () => {
  //   ui.isFullscreen = !!document.fullscreenElement;
  // });

  // === Debug Functions ===

  function debugTriggerSpeedPreaching() {
    if (ui.timing.toastDelayMin != 1) {
      ui.timing.toastDelayMin = 1;
      ui.timing.toastDelayMax = 10;
      ui.timing.donationToastDelay = 500;
      ui.timing.resultsViewDelay = 5;
      ui.timing.churchToastOffset = 1;
      toast.success("🐇 Speed Preaching ACTIVATED");
    } else {
      ui.timing.toastDelayMin = 1600;
      ui.timing.toastDelayMax = 3200;
      ui.timing.donationToastDelay = 6000;
      ui.timing.resultsViewDelay = 6000;
      ui.timing.churchToastOffset = 1000;
      toast.error("🐢 Speed Preaching deactivated");
    }
  }

  function debugTriggerEternalLegacy() {
    // Set up church if not founded
    if (!my.church.isFounded) {
      my.church.isFounded = true;
      my.church.name = "DEBUG CHURCH";
      my.church.location = places[Math.floor(Math.random() * places.length)];
      my.church.religion = my.religiousScorecard[Math.floor(Math.random() * my.religiousScorecard.length)];
      my.chats.sterling.hasContacted = true;
      toast.info("DEBUG: Church auto-founded for Eternal Legacy testing");
      my.place = { ...my.church.location };
      my.isStreetPreaching = false;
    }

    if (!my.eternalLegacy.isActive) {
      triggerEternalLegacy();
      toast.success("DEBUG: Eternal Legacy phase manually triggered!");
    } else {
      toast.warning("Eternal Legacy is already active!");
    }
  }

  function debugAddHeat() {
    if (my.eternalLegacy.isActive) {
      updateHeat(10);
      toast.info(`DEBUG: Added 10 heat. Current: ${my.eternalLegacy.heat}/${gameSettings.eternalLegacy.heat.max}`);
    } else {
      toast.warning("Eternal Legacy must be active to add heat!");
    }
  }

  function debugTriggerHarold() {
    if (!my.chats.harold.hasContacted) {
      my.chats.harold.hasContacted = true;
      my.canBuyVan = true;
      const haroldDebugMessages = [
        "i got this van",
        "u need a van???",
        `$${gameSettings.van.cost}`, // This message triggers the van interface
        "u culd relly go places w it",
        "mb help u w ur preachin",
        "wana buy???",
        "DEBUG: Harold initial contact triggered!",
      ];
      const debugMessageStructure = {
        id: 0,
        sender: "harold",
        text: "",
        time: "DEBUG",
        isTyping: false,
      };
      haroldDebugMessages.forEach((msg) => {
        my.chats.harold.chatHistory.push({
          ...debugMessageStructure,
          id: randomNumber(500, 1000),
          text: msg,
        });
      });
      toast.success("DEBUG: Harold initial contact triggered!");
    } else {
      toast.warning("Harold has already been contacted!");
    }
  }

  function debugTriggerSterling() {
    if (!my.chats.sterling.hasContacted) {
      my.chats.sterling.hasContacted = true;
      toast.success("DEBUG: Sterling initial contact triggered!");
    } else {
      toast.warning("Sterling has already been contacted!");
    }
  }

  // ================= INITIALISE STUFF AT GAME START =================
  function initialiseScoreCard() {
    my.religiousScorecard = religions.map((r) => ({
      id: r.id,
      name: r.name,
      score: 0,
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
  const computedTopicsYesterday = computed(() => {
    return computeTopicsYesterday(my.sermonYesterday);
  });

  const sortedAudienceReactions = computed(() => {
    return sortAudienceReactions(my.audienceReactions);
  });

  const totalIgnoredAudience = computed(() => {
    return calculateIgnoredAudience(my.audienceReactions);
  });

  const availablePlaces = computed(() => {
    return getAvailablePlaces(my.hasVan, (my.place as any)?.id);
  });

  const computedTopReligions = computed(() => {
    return computeTopReligions(my.place, my.religiousScorecard, my.church.religion?.id);
  });

  const purchasedMammonItems = computed(() => {
    return getPurchasedItems(my.eternalLegacy.purchasedItems, gameSettings.eternalLegacy.shop.mammonItems);
  });

  const purchasedUnderTableItems = computed(() => {
    return getPurchasedItems(my.eternalLegacy.purchasedItems, gameSettings.eternalLegacy.shop.underTheTable);
  });

  const temporarySermonScores = computed(() => {
    return computeTemporarySermonScores(ui.selectedTopics, themes, religions);
  });

  // === Game Control Functions ===

  function restartGame() {
    if (confirm("Are you sure you want to start a new ministry? All progress will be lost.")) {
      location.reload();
    }
  }

  // ================= LIFECYCLE =================
  onMounted(() => {
    initialiseGame();
    my.name = localStorage.getItem("kindaFunPlayerName") || "";
  });
</script>

<template lang="pug" src="./Megachurch.pug"></template>
<style lang="scss" src="./Megachurch.scss"></style>
