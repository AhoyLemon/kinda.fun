<template lang="pug" src="./CelebrityFriendToast.pug"></template>
<script setup>
  import { dollars } from "@/shared/js/_functions.js";

  const props = defineProps({
    /**
     * The celebrity object with name and other details
     */
    celebrity: {
      type: Object,
      required: true,
    },
    /**
     * The type of effect - 'acquisition', 'daily', or 'termination'
     */
    effectType: {
      type: String,
      required: true,
      validator: (value) => ["acquisition", "daily", "termination"].includes(value),
    },
    /**
     * The effects object containing all the celebrity effects
     */
    effects: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  });
</script>
<style lang="scss">
  @import "../../scss/variables";
  .Vue-Toastification__icon {
    display: none;
  }
  .Vue-Toastification__toast {
    &:has(.celebrity-friend.container) {
      background-color: oklch(0.18 0.08 271.66 / 0.9);
      color: $white;
      font-family: $sans-serif;
    }
  }
</style>
<style lang="scss" src="./CelebrityFriendToast.scss" scoped></style>
