<script setup>
  import { onMounted, reactive, ref, computed, watchEffect, watch } from "vue";
  import Multiselect from "@vueform/multiselect";
  import "@vueform/multiselect/themes/default.css";
  import { populations } from "./ts/_religions";
  import { sermons } from "./ts/_sermons";

  const selected = ref(null);
  const options = populations.map((pop) => pop.religion);

  const selectedSermons = ref([null, null, null]);

  // function getSermonOptions() {
  //   return sermons.map((sermon) => ({ value: sermon, label: sermon.title, id: sermon.id }));
  // }

  const ui = reactive({
    choosing: "sermon",
  });

  watch(
    () => selectedSermons.value[0],
    (val) => {
      if (val === null) {
        selectedSermons.value[0] = {};
      }
    },
  );

  function chooseReligion(religion) {
    alert(`You chose: ${religion}`);
    ui.choosing = "sermon";
  }

  function chooseSermon() {
    // You can replace this with any logic you want
    alert(`You chose: ${selectedSermons.value.map((s) => s?.title || "").join(", ")}`);
  }

  function showSermonDescription(id) {
    const sermon = sermons.find((s) => s.id === id);
    return sermon ? sermon.desc : "";
  }

  // Expose for external Pug template
  defineExpose({ Multiselect, selected, options, chooseReligion, selectedSermons, chooseSermon, showSermonDescription });
</script>

<template lang="pug" src="./MegaChurch.pug"></template>
<style lang="scss" src="./MegaChurch.scss"></style>
<style lang="scss" src="./multiselect.custom.scss"></style>
