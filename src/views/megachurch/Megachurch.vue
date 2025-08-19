<script setup lang="ts">
  // ================= IMPORTS =================
  import { onMounted, reactive, ref, computed, watchEffect, watch } from "vue";
  import Multiselect from "@vueform/multiselect";
  import "@vueform/multiselect/themes/default.css";
  import { religions } from "./ts/_religions";
  import { places } from "./ts/_places";
  import { themes } from "./ts/_sermons";

  import { randomNumber, randomFrom, shuffle, addCommas, findInArray, removeFromArray, percentOf, sendEvent, dollars } from "@/shared/js/_functions.js";
  import { ui, my, gameSettings } from "./ts/_variables";

  // Toasts
  import Toast, { POSITION } from "vue-toastification";
  // import "vue-toastification/dist/index.css";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  // ================= VARIABLES =================

  import type { Theme, Place, WeightedTag, WeightedReligion, MixedTag, MixedReligion, Sermon, Religion } from "./ts/_types";

  // ================= FUNCTIONS =================
  // ================= COLLECT DONATIONS =================
  function collectDonations() {
    const place = my.place as Place;
    if (!place || !place.religions || !Array.isArray(place.religions)) return 0;

    let totalDonations = 0;
    my.followers.forEach((followerObj: any) => {
      const religionId = followerObj.id;
      const followers = followerObj.followers || 0;
      if (followers === 0) return;

      // Find score for this religion
      const scoreEntry = my.religiousScorecard.find((r: any) => r.id === religionId);
      const score = scoreEntry ? scoreEntry.score : 0;
      // Score multiplier: scale from 1 (bad) to 12 (great)
      let scoreMultiplier = Math.max(1, Math.min(12, score / 2));

      // Find place religion weight
      const placeReligion = place.religions.find((r: any) => r.id === religionId);
      // Use avgNetWorth for net worth multiplier, but dampen its effect
      const netWorthMultiplier = place.avgNetWorth ? Math.max(0.75, Math.min(2, place.avgNetWorth / 150000)) : 1;

      // Use gameSettings.baseDonation and my.preacherStrengths.donations
      const baseDonation = gameSettings.baseDonation || 0.18; // Raised from 0.1
      const donationStrength = (my.preacherStrengths?.donations || 1) * 1.5; // Boosted effect

      // Calculate donation for this religion
      const donation = followers * baseDonation * scoreMultiplier * donationStrength * netWorthMultiplier;
      totalDonations += donation;
    });
    // Round to nearest cent
    const roundedDonations = Math.round(totalDonations * 100) / 100;
    // And give it to you.
    my.money += roundedDonations;
    console.log(roundedDonations);
  }

  function provideTopicOptions(index: number): typeof themes {
    const selectedIds = my.selectedTopics.map((id, i) => (i !== index && id !== null && id !== 0 ? id : null)).filter((id): id is number => id !== null);
    return shuffle(themes).filter((theme) => !selectedIds.includes(theme.id));
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
      my.selectedTopics = Array(3).fill(null); // Reset topics
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
    const selectedThemes = my.selectedTopics
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
    // Track score changes for yesterday's effect
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
      const weight = tagObj.weight;

      // Check if this tag is in mixed messages (if so, skip)
      const isMixed = my.sermonToday.mixedMessages.tags.some((mixedTag) => mixedTag.tag === tag);
      if (isMixed) return;

      // Find religions that have this tag in their likes or dislikes
      religions.forEach((religion) => {
        const religionScore = scoreChanges[religion.id];
        if (!religionScore) return; // Guard against undefined

        let effect = weight;
        let doubled = false;
        if ((my.religion as Religion) && typeof (my.religion as Religion).id === "number" && religion.id === (my.religion as Religion).id) {
          effect *= 2;
          doubled = true;
        }
        if (religion.likes.includes(tag as any)) {
          religionScore.scoreChange += effect;
          religionScore.changes.push(`+${effect} for liking ${tag}${doubled ? " (doubled for your religion)" : ""}`);

          // Update actual scorecard
          const scorecardEntry = my.religiousScorecard.find((r) => r.id === religion.id);
          if (scorecardEntry) scorecardEntry.score += effect;
        }

        if (religion.dislikes.includes(tag as any)) {
          religionScore.scoreChange -= effect;
          religionScore.changes.push(`-${effect} for disliking ${tag}${doubled ? " (doubled for your religion)" : ""}`);

          // Update actual scorecard
          const scorecardEntry = my.religiousScorecard.find((r) => r.id === religion.id);
          if (scorecardEntry) scorecardEntry.score -= effect;
        }
      });
    });

    // Process disliked tags (halved effect)
    my.sermonToday.dislikedBy.tags.forEach((tagObj) => {
      const tag = tagObj.tag;
      const weight = Math.floor(tagObj.weight / 2); // Halved effect

      // Skip if weight is zero
      if (weight === 0) return;

      // Check if this tag is in mixed messages (if so, skip)
      const isMixed = my.sermonToday.mixedMessages.tags.some((mixedTag) => mixedTag.tag === tag);
      if (isMixed) return;

      // Find religions that have this tag in their likes or dislikes
      religions.forEach((religion) => {
        const religionScore = scoreChanges[religion.id];
        if (!religionScore) return; // Guard against undefined

        let effect = weight;
        let doubled = false;
        if ((my.religion as Religion) && typeof (my.religion as Religion).id === "number" && religion.id === (my.religion as Religion).id) {
          effect *= 2;
          doubled = true;
        }
        if (religion.likes.includes(tag as any)) {
          religionScore.scoreChange -= effect;
          religionScore.changes.push(`-${effect} for attacking ${tag} (which they like)${doubled ? " (doubled for your religion)" : ""}`);

          // Update actual scorecard
          const scorecardEntry = my.religiousScorecard.find((r) => r.id === religion.id);
          if (scorecardEntry) scorecardEntry.score -= effect;
        }

        if (religion.dislikes.includes(tag as any)) {
          religionScore.scoreChange += effect;
          religionScore.changes.push(`+${effect} for attacking ${tag} (which they dislike)${doubled ? " (doubled for your religion)" : ""}`);

          // Update actual scorecard
          const scorecardEntry = my.religiousScorecard.find((r) => r.id === religion.id);
          if (scorecardEntry) scorecardEntry.score += effect;
        }
      });
    });

    // Process liked religions
    my.sermonToday.likedBy.religions.forEach((religionObj) => {
      const religionId = religionObj.id;
      const weight = religionObj.weight * 3;

      // Check if this religion is in mixed messages (if so, skip)
      const isMixed = my.sermonToday.mixedMessages.religions.some((mixedRel) => mixedRel.id === religionId);
      if (isMixed) return;

      const religionScore = scoreChanges[religionId];
      if (!religionScore) return; // Guard against undefined
      let effect = weight;
      let doubled = false;
      if ((my.religion as Religion) && typeof (my.religion as Religion).id === "number" && religionId === (my.religion as Religion).id) {
        effect *= 2;
        doubled = true;
      }
      religionScore.scoreChange += effect;
      religionScore.changes.push(`+${effect} for praising ${religionObj.name}${doubled ? " (doubled for your religion)" : ""}`);

      // Update actual scorecard
      const scorecardEntry = my.religiousScorecard.find((r) => r.id === religionId);
      if (scorecardEntry) scorecardEntry.score += effect;
    });

    // Process disliked religions
    my.sermonToday.dislikedBy.religions.forEach((religionObj) => {
      const religionId = religionObj.id;
      const weight = religionObj.weight * 3;

      // Check if this religion is in mixed messages (if so, skip)
      const isMixed = my.sermonToday.mixedMessages.religions.some((mixedRel) => mixedRel.id === religionId);
      if (isMixed) return;

      const religionScore = scoreChanges[religionId];
      if (!religionScore) return; // Guard against undefined
      let effect = weight;
      let doubled = false;
      if ((my.religion as Religion) && typeof (my.religion as Religion).id === "number" && religionId === (my.religion as Religion).id) {
        effect *= 2;
        doubled = true;
      }
      religionScore.scoreChange -= effect;
      religionScore.changes.push(`-${effect} for condemning ${religionObj.name}${doubled ? " (doubled for your religion)" : ""}`);

      // Update actual scorecard
      const scorecardEntry = my.religiousScorecard.find((r) => r.id === religionId);
      if (scorecardEntry) scorecardEntry.score -= effect;
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

    console.log("Yesterday's Effect:", yesterdaysEffect);
    my.effectYesterday = yesterdaysEffect;

    // Move to next phase
    createSermonEffect();
    // ================= CREATE SERMON EFFECT =================
  }

  function createSermonEffect() {
    ui.view = "preaching";

    const place = my.place as Place;
    if (!place || !place.religions || !Array.isArray(place.religions)) return;

    // Track follower changes for reporting
    const followerChangesArr: { id: number; name: string; before: number; change: number; after: number }[] = [];

    place.religions.forEach((placeReligion: any) => {
      const { id, name, weight } = placeReligion;
      // Find matching religion in yesterday's effect
      const effect = my.effectYesterday?.find((r: any) => r.id === id);
      if (!effect) return;
      // Followers gained/lost for this religion, using sqrt(weight) for non-linear scaling
      let followersDelta = effect.scoreChange * Math.sqrt(weight) * (my.preacherStrengths?.followers || 1);
      // Always round to nearest integer
      followersDelta = Math.round(followersDelta);
      if (followersDelta < 0) followersDelta = Math.max(followersDelta, -Math.round(Math.sqrt(weight) * (my.preacherStrengths?.followers || 1))); // Don't lose more than sqrt(weight) * preacherStrength

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
    // Update global followerCount
    my.followerCount = my.followers.reduce((sum: number, f: any) => sum + (f.followers || 0), 0);

    // Sort and assign to my.followerChanges
    my.followerChanges = followerChangesArr.sort((a, b) => b.change - a.change);

    // Show toasts for each follower change, 1200ms apart, and last longer
    const followerToastDuration = 7000;
    const followerToastDelay = 1200;
    followerChangesArr.forEach((changeObj, i) => {
      setTimeout(() => {
        if (changeObj.change > 0) {
          toast.success(`Gained ${changeObj.change} followers in ${changeObj.name}!`, {
            position: POSITION.BOTTOM_LEFT,
            timeout: followerToastDuration,
          });
        } else if (changeObj.change < 0) {
          toast.error(`Lost ${Math.abs(changeObj.change)} followers in ${changeObj.name}.`, {
            position: POSITION.BOTTOM_LEFT,
            timeout: followerToastDuration,
          });
        }
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
        if (moneyCollected > 0) {
          toast.success(`Collected $${moneyCollected} in donations!`, {
            position: POSITION.BOTTOM_LEFT,
            timeout: donationToastDuration,
          });
        } else {
          toast.info(`No donations collected this week.`, {
            position: POSITION.BOTTOM_LEFT,
            timeout: donationToastDuration,
          });
        }
        // Switch to 'preached' view after donation toast
        setTimeout(() => {
          ui.view = "sermon-results";
        }, donationToastDuration - 1000);
      },
      followerChangesArr.length * followerToastDelay + 800,
    );
  }

  function advanceToNextDay() {
    // reset daily effects.
    my.effectYesterday = [];
    my.sermonToday = {
      topics: [],
      likedBy: { tags: [], religions: [] },
      dislikedBy: { tags: [], religions: [] },
      mixedMessages: { tags: [], religions: [] },
    };
    my.selectedTopics = [null, null, null];
    my.followerChanges = [];

    ui.view = "sermon";
  }

  // // Helper to get top N from weighted arrays
  // function getTopNWeighted<T extends { weight: number }>(arr: T[], n: number): T[] {
  //   if (!arr.length) return [];
  //   const sorted = arr.slice().sort((a, b) => b.weight - a.weight);
  //   if (sorted.length <= n) return sorted;
  //   const cutoff = sorted[n - 1].weight;
  //   const candidates = sorted.filter((item) => item.weight >= cutoff);
  //   if (candidates.length > n) {
  //     const shuffled = candidates.sort(() => Math.random() - 0.5);
  //     return shuffled.slice(0, n);
  //   }
  //   return candidates.slice(0, n);
  // }

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

  onMounted(() => {
    initialiseScoreCard();
    initialiseFollowers();
    toast.success(`Bottom Left`, {
      position: POSITION.BOTTOM_LEFT,
    });

    toast.success(`Bottom Right`, {
      position: POSITION.BOTTOM_RIGHT,
    });

    toast.success(`Top Left`, {
      position: POSITION.TOP_LEFT,
    });

    toast.success(`Top Right`, {
      position: POSITION.TOP_RIGHT,
    });
  });
</script>

<template lang="pug" src="./Megachurch.pug"></template>
<style lang="scss" src="./Megachurch.scss"></style>
