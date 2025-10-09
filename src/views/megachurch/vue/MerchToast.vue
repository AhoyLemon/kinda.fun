<template>
  <div class="merch-collected container" :class="{ positive: totalMerchRevenue > 0, negative: totalMerchRevenue <= 0 }">
    <div class="row first">
      <template v-if="totalMerchRevenue > 0">
        <div class="number">
          {{ dollars(totalMerchRevenue) }}
        </div>
        <div class="text-holder">
          <div class="label">in merch sales today</div>
        </div>
      </template>
      <template v-else>
        <div class="text-holder">
          <div class="label">You didn't sell any merch today.</div>
        </div>
      </template>
    </div>
    <div class="row second" v-if="itemsSold.length > 0">
      <ul class="breakdown">
        <template v-for="item in itemsSold" :key="item.name">
          <li>
            <strong>{{ item.sold }}</strong> {{ item.name }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
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
<style lang="scss">
  @import "../scss/_variables.scss";
  .Vue-Toastification__icon {
    display: none;
  }
  .Vue-Toastification__toast {
    &:has(.merch-collected.container) {
      background-color: rgba(3, 3, 20, 0.9);
      // background-color: $purple;
    }
    // &:has(.merch-collected.negative) {
    //   background-color: $yellow;
    // }
  }
</style>
<style lang="scss" scoped>
  @import "../scss/_variables.scss";
  .container {
    display: flex;
    gap: 5px;
    flex-direction: column;
    color: #eee;

    .row.first {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .number {
      font-size: 1.75em;
      flex-basis: 32px;
      flex-grow: 1;
      flex-shrink: 0;
      font-family: $monospace;
      font-weight: 900;
      display: flex;
      //align-items: center;
    }
    .text-holder {
      display: flex;
      align-items: center;
      font-weight: 600;
      flex-grow: 5;
      flex-direction: column;
      align-items: flex-start;
    }
    .breakdown {
      margin: 0;
      font-size: 0.85em;
      color: #aaa;
      line-height: 1.3;
      font-size: 0.75em;
      padding-left: 2.25em;
      li {
        list-style: disc;
      }

      // dt {
      //   font-weight: bold;
      //   display: inline;
      //   margin-right: 4px;
      // }

      // dd {
      //   display: inline;
      //   margin: 0 0 4px 0;

      //   &:after {
      //     content: "\A";
      //     white-space: pre;
      //   }

      //   &:last-child:after {
      //     content: "";
      //   }
      // }
    }
  }
</style>
