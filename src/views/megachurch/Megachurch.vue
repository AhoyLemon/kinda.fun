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
  import { useToast } from "vue-toastification";
  const toast = useToast();

  // ================= VARIABLES =================

  import type { Theme, Place, WeightedTag, WeightedReligion, MixedTag, MixedReligion, Sermon, Religion } from "./ts/_types";

  // UI state for spice purchasing
  const spiceToBuy = ref(0);

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
      const donationStrength = (my.preacherStrengths?.donations || 1) * spiceMultiplier * gameSettings.donationCalculation.strengthBoostMultiplier;

      // Calculate donation for this religion
      const donation = followers * baseDonation * scoreMultiplier * donationStrength * netWorthMultiplier;
      totalDonations += donation;
    });
    // Round donations to nearest cent using configured rounding factor
    const roundedDonations = Math.round(totalDonations * gameSettings.donationCalculation.roundingFactor) / gameSettings.donationCalculation.roundingFactor;
    my.donationsYesterday = roundedDonations; // Store for yesterday's effect
    my.money += roundedDonations; // And give it to you.
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

    // Track audience reactions for reporting
    const audienceReactions: {
      id: number;
      name: string;
      liked: number;
      disliked: number;
      neutral: number;
      likedTags?: string[];
      dislikedTags?: string[];
      mixedTags?: string[];
      followerName?: string;
      followersName?: string;
    }[] = [];

    let totalDonations = 0;

    place.religions.forEach((placeReligion: any) => {
      const { id, name, weight } = placeReligion;

      // Calculate base audience size for this religion (scaled by population and weight)
      // For street preaching, we expect smaller but more engaged audiences
      const baseAudience = Math.floor((weight / 100) * (place.totalPopulation / gameSettings.streetPreaching.audienceScaleDivisor));

      // Calculate how this religion responds to the sermon
      let likedScore = 0;
      let dislikedScore = 0;

      // Check sermon themes against religion preferences
      my.sermonToday.likedBy.religions.forEach((religionObj: any) => {
        if (religionObj.id === id) {
          likedScore += religionObj.weight * 2; // Double weight for direct religion matches
        }
      });

      my.sermonToday.dislikedBy.religions.forEach((religionObj: any) => {
        if (religionObj.id === id) {
          dislikedScore += religionObj.weight * 2;
        }
      });

      // Check tags against religion preferences (need to implement religion tag preferences)
      my.sermonToday.likedBy.tags.forEach((tagObj: any) => {
        const religion = religions.find((r) => r.id === id);
        if (religion && religion.likes && religion.likes.includes(tagObj.tag)) {
          likedScore += tagObj.weight;
        }
        if (religion && religion.dislikes && religion.dislikes.includes(tagObj.tag)) {
          dislikedScore += tagObj.weight;
        }
      });

      my.sermonToday.dislikedBy.tags.forEach((tagObj: any) => {
        const religion = religions.find((r) => r.id === id);
        if (religion && religion.likes && religion.likes.includes(tagObj.tag)) {
          dislikedScore += tagObj.weight;
        }
        if (religion && religion.dislikes && religion.dislikes.includes(tagObj.tag)) {
          likedScore += tagObj.weight;
        }
      });

      // Calculate audience breakdown - street preaching with configurable settings
      const netScore = likedScore - dislikedScore;
      const enthusiasm = Math.max(0.1, Math.min(2.0, 1 + netScore / 10)); // 0.1x to 2x multiplier

      // Use configurable engagement rate (convert percentage to decimal)
      const actualAudience = Math.floor(baseAudience * enthusiasm * spiceMultiplier * (gameSettings.streetPreaching.audienceEngagement / 100));

      // Use configurable thresholds and percentages for likes/dislikes (convert percentages to decimals)
      const liked =
        netScore > gameSettings.streetPreaching.likeThreshold
          ? Math.floor(actualAudience * (gameSettings.streetPreaching.likePercentage / 100))
          : Math.floor(actualAudience * (gameSettings.streetPreaching.baselikePercentage / 100));

      const disliked =
        netScore < gameSettings.streetPreaching.dislikeThreshold
          ? Math.floor(actualAudience * (gameSettings.streetPreaching.dislikePercentage / 100))
          : Math.floor(actualAudience * (gameSettings.streetPreaching.baseDislikePercentage / 100));

      const neutral = actualAudience - liked - disliked;

      // Calculate donations using configurable amounts (but don't apply yet)
      if (liked > 0) {
        const avgDonation = randomNumber(gameSettings.streetPreaching.donationMin, gameSettings.streetPreaching.donationMax);
        const religionDonations = liked * avgDonation;
        totalDonations += religionDonations;
      }

      // Store reaction for feedback with tag details
      if (actualAudience > 0) {
        // Find what tags this religion specifically liked/disliked in the sermon
        const religionData = religions.find((r) => r.id === id);
        const likedTags: string[] = [];
        const dislikedTags: string[] = [];
        const mixedTags: string[] = [];

        if (religionData) {
          my.sermonToday.likedBy.tags.forEach((tagObj: any) => {
            if (religionData.likes.includes(tagObj.tag)) {
              likedTags.push(tagObj.tag);
            }
          });
          my.sermonToday.dislikedBy.tags.forEach((tagObj: any) => {
            if (religionData.dislikes.includes(tagObj.tag)) {
              dislikedTags.push(tagObj.tag);
            }
          });

          // Check for mixed messages that would confuse this religion
          my.sermonToday.mixedMessages.tags.forEach((mixedTag: any) => {
            if (religionData.likes.includes(mixedTag.tag) || religionData.dislikes.includes(mixedTag.tag)) {
              mixedTags.push(mixedTag.tag);
            }
          });
        }

        audienceReactions.push({
          id,
          name,
          liked,
          disliked,
          neutral,
          likedTags,
          dislikedTags,
          mixedTags,
          followerName: religionData?.follower || name,
          followersName: religionData?.followers || name,
        });
      }
    });

    // Store audience reactions for display
    my.audienceReactions = audienceReactions;

    // Store donation amount but don't apply to money yet
    const roundedDonations = Math.round(totalDonations * 100) / 100;
    my.donationsYesterday = roundedDonations;

    // Show audience feedback toasts with improved timing
    showAudienceReactions(roundedDonations);
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
        prepareSpicePurchaseScreen();
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
      let followersDelta = effect.scoreChange * Math.sqrt(weight) * ((my.preacherStrengths?.followers || 1) * spiceMultiplier);
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
          // Apply addiction progression and reset spice just before showing purchase screen
          prepareSpicePurchaseScreen();
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

  function consumeSpice(amount: number) {
    const cost = amount * gameSettings.spice.pricePerUnit;
    if (my.money >= cost && amount > 0) {
      my.money -= cost;
      my.spice.consumedToday += amount;

      // Check for fatal overdose
      if (my.spice.consumedToday >= my.spice.fatalAmount) {
        alert("💀 You have died from a spice overdose! Game Over.");
        // Reset game or handle death
        my.money = 0;
        my.spice.consumedToday = 0;
        return false;
      }

      return true;
    }
    return false;
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

  function prepareSpicePurchaseScreen() {
    // Apply pending addiction increase from yesterday
    const addictionIncreased = applyPendingAddiction();

    // Reset daily consumption for new day
    my.spice.consumedToday = 0;

    // Show notification if addiction increased
    if (addictionIncreased) {
      toast.warning(`Your spice addiction has worsened! You now need ${Math.ceil(my.spice.requiredAmount)} units daily.`);
    }
  }
  function advanceToNextDay() {
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

  // ================= LIFECYCLE =================
  onMounted(() => {
    initialiseGame();
    my.name = localStorage.getItem("kindaFunPlayerName") || "";
  });
</script>

<template lang="pug" src="./Megachurch.pug"></template>
<style lang="scss" src="./Megachurch.scss"></style>
