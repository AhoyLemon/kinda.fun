<script setup>
  import { reactive, computed, onMounted } from "vue";
  import $ from "jquery";
  import draggable from "vuedraggable";

  import { allValues } from "../src/views/cameo/ts/_values.js";
  import { gimmickRounds } from "../src/views/cameo/ts/_gimmick-rounds.js";
  import { settings } from "../src/views/cameo/ts/_settings.js";
  import { randomNumber, randomFrom, shuffle, addCommas, findInArray, removeFromArray, percentOf, sendEvent, dollars } from "@/shared/ts/_functions.js";

  // Nuxt-specific setup
  useHead({
    title: 'Comparatively Famous - Kinda Fun',
    meta: [
      { name: 'description', content: 'Sort celebrities by their Cameo price in this valuation game' },
      { property: 'og:title', content: 'Comparatively Famous' },
      { property: 'og:description', content: 'Sort celebrities by their Cameo price in this valuation game' },
    ]
  })

  // Sounds
  import { Howl, Howler } from "howler";
  import {
    soundMiss,
    soundCorrect,
    soundPerfectValue,
    soundCloseValue,
    soundBadValue,
    soundNewEmail,
    soundUnderBudget,
    soundOverBudget,
    soundFutherOverBudget,
    soundGameOverMusic,
    birthdayHowls,
  } from "../src/views/cameo/js/_sounds.js";

  // Firebase & VueFire Stuff - only on client
  let db, statsRef;
  if (import.meta.client) {
    const { useFirestore } = await import("vuefire");
    const { doc } = await import("firebase/firestore");
    db = useFirestore();
    statsRef = doc(db, `stats/cameo`);
  }

  // Toasts
  import Toast, { POSITION } from "vue-toastification";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  const gameName = "cameo";
  let allCelebs = [...allValues];
  let isDragging = false;

  const my = reactive({
    name: "",
    score: 0,
    pointsEarnedInFinalRound: 0,
    correctSorts: 0,
    incorrectSorts: 0,
    averageValuationOffset: 0,
    valuationOffBy: 0,
  });

  // Placeholder for remaining game logic
  // Full game logic from src/views/cameo/Cameo.vue would go here
</script>

<template lang="pug">
main
  p Cameo game coming soon...
</template>

<style lang="scss">
@import '../src/views/cameo/Cameo.scss';
</style>
