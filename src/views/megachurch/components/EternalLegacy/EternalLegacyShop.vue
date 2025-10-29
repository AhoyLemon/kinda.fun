<template lang="pug" src="./EternalLegacyShop.pug"></template>

<script setup>
  import { ref, reactive, computed, onMounted } from "vue";
  import { addCommas, dollars } from "../../../../shared/ts/_functions";

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

  const celebrityUI = reactive({
    detailedId: -1,
  });

  const randomBibleVerse = computed(() => {
    const verses = props.gameSettings.eternalLegacy.bibleVerses;
    return verses[Math.floor(Math.random() * verses.length)];
  });

  function toggleCelebrityDetails(celebrity) {
    if (celebrityUI.detailedId === celebrity.id) {
      celebrityUI.detailedId = -1;
    } else {
      celebrityUI.detailedId = celebrity.id;
    }
  }

  function purchaseItem(item, category) {
    emit("purchase", { item, category });
  }
</script>

<style lang="scss" src="./EternalLegacyShop.scss" scoped></style>
