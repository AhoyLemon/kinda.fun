<script setup lang="ts">
  import { onMounted, reactive, ref, computed, watchEffect, watch } from "vue";
  import Multiselect from "@vueform/multiselect";
  import "@vueform/multiselect/themes/default.css";
  import { religions } from "./ts/_religions";
  import { themes } from "./ts/_sermons";
  import { famousPastors } from "./ts/_arrays";
  import { randomNumber, randomFrom, shuffle, addCommas, findInArray, removeFromArray, percentOf, sendEvent, dollars } from "@/shared/js/_functions.js";

  interface Theme {
    id: number;
    title: string;
    desc: string;
    [key: string]: any;
  }
  //const selectedThemes = ref<Array<Theme | null>>([null, null, null]);

  // Pick a random famous pastor for the placeholder
  const randomPastor = famousPastors[Math.floor(Math.random() * famousPastors.length)];

  import { ui, my } from "./ts/_variables";

  // Provide topic options for a given index
  function provideTopicOptions(index: number): typeof themes {
    // Get all selected topic ids except for the current index
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
    // Get selected topic ids
    const topicIDs = my.selectedTopics.filter((id): id is number => typeof id === "number");
    // Find the corresponding themes
    const selectedThemes = topicIDs.map((id) => themes.find((t) => t.id === id)).filter(Boolean);

    // Gather all liked/disliked tags and religions
    const likedTags = selectedThemes.flatMap((t) => t.likedBy.tags ?? []);
    const likedReligions = selectedThemes.flatMap((t) => t.likedBy.religions ?? []);
    const dislikedTags = selectedThemes.flatMap((t) => t.dislikedBy.tags ?? []);
    const dislikedReligions = selectedThemes.flatMap((t) => t.dislikedBy.religions ?? []);

    // Find mixed messages (tags/religions in both liked and disliked)
    const mixedTags = likedTags.filter((tag) => dislikedTags.includes(tag));
    const mixedReligions = likedReligions.filter((rel) => dislikedReligions.includes(rel));

    my.sermonToday = {
      topics: selectedThemes.map((t) => t.title),
      topicIDs,
      likedBy: {
        tags: likedTags,
        religions: likedReligions,
      },
      dislikedBy: {
        tags: dislikedTags,
        religions: dislikedReligions,
      },
      mixedMessages: {
        tags: mixedTags,
        religions: mixedReligions,
      },
    };
  }

  function getTopN(arr: string[], n: number): string[] {
    const freq: Record<string, number> = {};
    arr.forEach((item) => {
      freq[item] = (freq[item] || 0) + 1;
    });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    if (sorted.length <= n) return sorted.map(([item]) => item);
    // Find cutoff frequency
    const cutoff = sorted[n - 1][1];
    const candidates = sorted.filter(([_, count]) => count >= cutoff).map(([item]) => item);
    // If more than n, randomly pick n
    if (candidates.length > n) {
      const shuffled = candidates.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, n);
    }
    return candidates.slice(0, n);
  }

  const computedSermonDiagnosis = computed(() => {
    const sermon = my.sermonToday;
    if (!sermon || !sermon.topics || !sermon.topics.length) return null;
    return {
      biggestThemes: getTopN(sermon.likedBy.tags, 3),
      preferredReligions: getTopN(sermon.likedBy.religions, 2),
      mostHatedThemes: getTopN(sermon.dislikedBy.tags, 3),
      opposedReligions: getTopN(sermon.dislikedBy.religions, 2),
    };
  });

  // Expose for external Pug template
  //defineExpose({ Multiselect, selected, options, chooseReligion, selectedSermons, chooseSermon, showSermonDescription, randomPastor });
</script>

<template lang="pug" src="./MegaChurch.pug"></template>
<style lang="scss" src="./MegaChurch.scss"></style>
