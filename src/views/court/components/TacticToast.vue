<template lang="pug" src="./TacticToast.pug"></template>

<script setup>
  defineProps({
    actor: { type: String, required: true }, // 'player' | 'opponent'
    tacticName: { type: String, required: true },
    results: { type: Array, required: true }, // { justiceName, change }[]
  });
</script>

<style lang="scss">
  // Global (unscoped) — targets the outer toast container via :has()
  .Vue-Toastification__icon {
    display: none;
  }
  .Vue-Toastification__toast:has(.tactic-toast.is-player) {
    background-color: rgba(30, 20, 5, 0.97);
    border-left: 3px solid #c9a84c;
  }
  .Vue-Toastification__toast:has(.tactic-toast.is-opponent) {
    background-color: rgba(35, 15, 5, 0.97);
    border-left: 3px solid #ef9f5a;
  }
</style>

<style lang="scss" src="./TacticToast.scss" scoped></style>
