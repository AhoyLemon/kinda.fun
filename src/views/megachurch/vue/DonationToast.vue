<template>
  <div class="donation-collected container" :class="{ positive: totalDonations > 0, negative: totalDonations <= 0 }">
    <div class="row first"></div>

    <template v-if="totalEarnings > 0">
      <div class="row first">
        <div class="point-holder">
          <div class="number" :class="{ positive: totalDonations > 0, negative: totalDonations < 0 }">
            {{ dollars(totalEarnings) }}
          </div>
        </div>

        <div class="text-holder">
          <div class="text">
            <template v-if="totalDonations && !sterlingCut && !totalMerch">
              <div class="label">in donations collected</div>
            </template>
            <template v-else>
              <div class="label">in donations collected</div>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="text-holder">
        <div class="text">
          <div class="religion-label label">You didn't make any money today.</div>
        </div>
      </div>
    </template>

    <template v-if="totalDonations || totalMerch || sterlingCut">
      <div class="row second">
        <dl class="breakdown">
          <template v-if="totalDonations && totalDonations != totalEarnings">
            <dt>Donations:</dt>
            <dd>{{ dollars(totalDonations) }}</dd>
          </template>
          <template v-if="totalMerch">
            <dt>Merch Sales:</dt>
            <dd>{{ dollars(totalMerch) }}</dd>
          </template>
          <template v-if="sterlingCut">
            <dt class="sterling">Sterling's Cut:</dt>
            <dd class="minus">{{ dollars(sterlingCut) }}</dd>
          </template>
        </dl>
      </div>
    </template>
  </div>
</template>
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
    // change: {
    //   type: Number,
    //   required: true,
    // },
    // sterlingCut: {
    //   type: Number,
    //   required: false,
    // },
    // religion: {
    //   type: String,
    //   required: false,
    // },
    // before: {
    //   type: Number,
    //   required: false,
    // },
    // after: {
    //   type: Number,
    //   required: false,
    // },
  });

  // const totalDonations = computed(() => {
  //   return props.change + (props.sterlingCut || 0);
  // });
</script>
<style lang="scss">
  @import "../scss/_variables.scss";
  .Vue-Toastification__icon {
    display: none;
  }
  .Vue-Toastification__toast {
    &:has(.donation-collected.positive) {
      background-color: rgba(3, 3, 3, 0.82);
      color: #eee;
      font-family: $sans-serif;
    }
    &:has(.donation-collected.negative) {
      background-color: $pink;
      color: #111;
    }
  }
</style>
<style lang="scss" scoped>
  @import "../scss/_variables.scss";
  .container {
    display: flex;
    gap: 6px;
    flex-direction: column;
    .row.first {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
    }
    //color: #222;
    .number {
      font-size: 2.5em;
      flex-basis: 32px;
      flex-grow: 1;
      flex-shrink: 0;
      font-family: $monospace;
      font-weight: 900;
      &.positive {
        color: #0f0;
      }
    }
    .text-holder {
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    .breakdown {
      display: grid;
      grid-template-columns: 7em auto;
      column-gap: 1em;
      dt {
        text-align: right;
        font-size: 0.875rem;
      }
      dd {
        font-weight: 800;
        font-family: $monospace;
        &.minus {
          color: $pink;
        }
      }
    }
  }
</style>
