<script setup lang="ts">
  // ================= IMPORTS =================
  import { onMounted, reactive, ref, computed, watchEffect, watch } from "vue";
  import Multiselect from "@vueform/multiselect";
  import "@vueform/multiselect/themes/default.css";
  import { religions } from "./ts/_religions";
  import { themes } from "./ts/_sermons";
  import { famousPastors } from "./ts/_arrays";
  import { randomNumber, randomFrom, shuffle, addCommas, findInArray, removeFromArray, percentOf, sendEvent, dollars } from "@/shared/js/_functions.js";
  import { ui, my } from "./ts/_variables";

  // ================= VARIABLES =================

  import type { Theme, WeightedTag, WeightedReligion, MixedTag, MixedReligion, SermonToday } from "./ts/_types";

  //const randomPastor = famousPastors[Math.floor(Math.random() * famousPastors.length)];

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

  function showReligionDescription(id: number): string {
    const religion = (religions as any[]).find((r) => r.id === id);
    return religion ? religion.description || "" : "";
  }

  function showThemeDescription(id: number): string {
    const theme = (themes as Theme[]).find((s) => s.id === id);
    return theme ? theme.desc : "";
  }

  function defineSermon() {
    const topicIDs = my.selectedTopics.filter((id): id is number => typeof id === "number");
    const selectedThemes = topicIDs.map((id) => themes.find((t) => t.id === id)).filter(Boolean);

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
      topics: selectedThemes.map((t) => t.title),
      topicIDs,
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

  // ================= COMPUTEDS =================
  const computedSermonDiagnosis = computed(() => {
    const sermon = my.sermonToday;
    if (!sermon || !sermon.topics || !sermon.topics.length) return null;
    return {
      biggestThemes: getTopNWeighted<WeightedTag>(sermon.likedBy.tags as WeightedTag[], 3).map((t) => t.tag),
      preferredReligions: getTopNWeighted<WeightedReligion>(sermon.likedBy.religions as WeightedReligion[], 2).map((r) => r.name),
      mostHatedThemes: getTopNWeighted<WeightedTag>(sermon.dislikedBy.tags as WeightedTag[], 3).map((t) => t.tag),
      opposedReligions: getTopNWeighted<WeightedReligion>(sermon.dislikedBy.religions as WeightedReligion[], 2).map((r) => r.name),
    };
  });
</script>

<template lang="pug" src="./MegaChurch.pug"></template>
<style lang="scss" src="./MegaChurch.scss"></style>
