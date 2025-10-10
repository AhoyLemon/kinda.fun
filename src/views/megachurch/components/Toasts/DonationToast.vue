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
<style lang="scss" src="./DonationToast.scss"></style>
