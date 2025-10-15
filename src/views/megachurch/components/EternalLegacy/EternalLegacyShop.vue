<template lang="pug" src="./EternalLegacyShop.pug"></template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { addCommas, dollars } from "../../../../shared/js/_functions.js";

  const props = defineProps({
    my: {
      type: Object,
      required: true,
    },
    gameSettings: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(["close", "purchase"]);

  const activeTab = ref("mammon");

  const randomBibleVerse = computed(() => {
    const verses = props.gameSettings.eternalLegacy.bibleVerses;
    return verses[Math.floor(Math.random() * verses.length)];
  });

  function purchaseItem(item, category) {
    emit("purchase", { item, category });
  }
</script>

<style lang="scss" src="./EternalLegacyShop.scss" scoped></style>
