<template lang="pug" src="./MerchToast.pug"></template>
<script setup>
  import { dollars } from "@/shared/js/_functions.js";
  import { computed } from "vue";

  const props = defineProps({
    /**
     * Total revenue from all merch sales
     */
    totalMerchRevenue: {
      type: Number,
      required: true,
      default: 0,
    },
    /**
     * Details about each merch item sold
     */
    merchSalesDetails: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    /**
     * VIP confession booth revenue
     */
    confessionRevenue: {
      type: Number,
      required: false,
      default: 0,
    },
  });

  // Create array of items that were actually sold for display
  const itemsSold = computed(() => {
    const items = [];
    const details = props.merchSalesDetails;

    if (details.holyWater && details.holyWater.sold > 0) {
      items.push({
        name: "Holy Water",
        sold: details.holyWater.sold,
        revenue: details.holyWater.revenue,
      });
    }

    if (details.prayerCandles && details.prayerCandles.sold > 0) {
      items.push({
        name: "Bluetooth Prayer Candles",
        sold: details.prayerCandles.sold,
        revenue: details.prayerCandles.revenue,
      });
    }

    if (details.energyDrinks && details.energyDrinks.sold > 0) {
      items.push({
        name: "Saints Flow Energy Drinks",
        sold: details.energyDrinks.sold,
        revenue: details.energyDrinks.revenue,
      });
    }

    return items;
  });
</script>
<style lang="scss" src="./MerchToast.scss"></style>
