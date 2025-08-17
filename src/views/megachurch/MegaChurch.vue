<script setup lang="ts">
  // ================= IMPORTS =================
  import { onMounted, reactive, ref, computed, watchEffect, watch } from "vue";
  import Multiselect from "@vueform/multiselect";
  import "@vueform/multiselect/themes/default.css";
  import { religions } from "./ts/_religions";
  import { themes } from "./ts/_sermons";
  import { randomNumber, randomFrom, shuffle, addCommas, findInArray, removeFromArray, percentOf, sendEvent, dollars } from "@/shared/js/_functions.js";
  import { ui, my } from "./ts/_variables";

  // ================= VARIABLES =================

  import type { Theme, WeightedTag, WeightedReligion, MixedTag, MixedReligion, SermonToday, Religion } from "./ts/_types";

  // ================= FUNCTIONS =================
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
    ui.choosing = "sermon";
  }

  function getReligion(id: number): Religion | {} {
    const religion = (religions as any[]).find((r) => r.id === id);
    if (!id) {
      return {};
    } else {
      return religion;
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

    ui.choosing = "sermon-confirm";
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
    ui.choosing = "preached";
  }

  // Helper to get top N from weighted arrays
  function getTopNWeighted<T extends { weight: number }>(arr: T[], n: number): T[] {
    if (!arr.length) return [];
    const sorted = arr.slice().sort((a, b) => b.weight - a.weight);
    if (sorted.length <= n) return sorted;
    const cutoff = sorted[n - 1].weight;
    const candidates = sorted.filter((item) => item.weight >= cutoff);
    if (candidates.length > n) {
      const shuffled = candidates.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, n);
    }
    return candidates.slice(0, n);
  }

  // ================= INITIALISE RELIGIOUS SCORECARD =================
  function initialiseScoreCard() {
    my.religiousScorecard = religions.map((r) => ({
      id: r.id,
      name: r.name,
      score: 0,
    }));
  }

  // ================= COMPUTEDS =================

  onMounted(() => {
    initialiseScoreCard();
  });
</script>

<template lang="pug" src="./Megachurch.pug"></template>
<style lang="scss" src="./Megachurch.scss"></style>
