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
    /**
     * Celebrity merchandise sales
     */
    celebMerchSales: {
      type: Array,
      required: false,
      default: () => [],
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

    if (details.weightLossTea && details.weightLossTea.sold > 0) {
      items.push({
        name: "Miracle Weight Loss Tea",
        sold: details.weightLossTea.sold,
        revenue: details.weightLossTea.revenue,
      });
    }

    if (details.beachTowel && details.beachTowel.sold > 0) {
      items.push({
        name: "Shroud of Turin Beach Towel",
        sold: details.beachTowel.sold,
        revenue: details.beachTowel.revenue,
      });
    }

    if (details.exorcismKit && details.exorcismKit.sold > 0) {
      items.push({
        name: "Lil' Reagan's Exorcism Kit",
        sold: details.exorcismKit.sold,
        revenue: details.exorcismKit.revenue,
      });
    }

    // Add celebrity merch sales
    if (props.celebMerchSales && props.celebMerchSales.length > 0) {
      props.celebMerchSales.forEach((sale) => {
        items.push({
          name: `${sale.itemName} (via ${sale.celebrityName})`,
          sold: sale.itemsSold, // Note: celebrity sales use 'itemsSold' property
          revenue: sale.revenue,
          isCelebrity: true,
        });
      });
    }

    return items;
  });
</script>
<style lang="scss">
  @import "../../scss/_variables.scss";
  .Vue-Toastification__icon {
    display: none;
  }

  .Vue-Toastification__toast {
    &:has(.merch-collected.container) {
      background-color: rgba(3, 3, 20, 0.9);
    }
  }
</style>
<style lang="scss" src="./MerchToast.scss" scoped></style>
