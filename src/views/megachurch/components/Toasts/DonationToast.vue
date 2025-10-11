<template lang="pug" src="./DonationToast.pug"></template>
<script setup>
  import { dollars } from "@/shared/js/_functions.js";
  import { computed } from "vue";

  const props = defineProps({
    /**
     * The final amount the player keeps for the day (donations + merch - sterlingCut).
     */
    totalEarnings: {
      type: Number,
      required: true,
      default: 0,
    },
    /**
     * donations collected today (before deductions)
     */
    totalDonations: {
      type: Number,
      required: false,
      default: 0,
    },
    /**
     * combination of all merch sold (in dollars)
     */
    totalMerch: {
      type: Number,
      required: false,
      default: 0,
    },
    /**
     * The amount of dollars Sterling deducts
     */
    sterlingCut: {
      type: Number,
      required: false,
      default: 0,
    },
  });
</script>
<style lang="scss">
  @import "../../scss/variables";
  .Vue-Toastification__icon {
    display: none;
  }
  .Vue-Toastification__toast {
    &:has(.donation-collected.positive) {
      background-color: rgba(3, 8, 3, 0.82);
      color: #eee;
      font-family: $sans-serif;
    }
    &:has(.donation-collected.negative) {
      background-color: rgba(18, 3, 3, 0.82);
      color: #111;
    }
  }
</style>
<style lang="scss" src="./DonationToast.scss" scoped></style>
