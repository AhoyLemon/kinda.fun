<template>
  <div class="donation-collected container" :class="{ positive: totalDonations > 0, negative: totalDonations <= 0 }">
    <template v-if="totalDonations > 0">
      <div class="point-holder">
        <div class="number">
          {{ dollars(totalDonations) }}
        </div>
      </div>
      <div class="text-holder">
        <div class="text">
          <div class="religion-label label">total donations collected</div>
          <div v-if="sterlingCut" class="sterling-cut">
            Sterling's cut: {{ dollars(sterlingCut) }}<br>
            Your share: {{ dollars(change) }}
          </div>
          <div v-else-if="change !== totalDonations" class="player-share">
            Your share: {{ dollars(change) }}
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="text-holder">
        <div class="text">
          <div class="religion-label label">You didn't get any donations today.</div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
  import { dollars } from "@/shared/js/_functions.js";
  import { computed } from "vue";
  
  const props = defineProps({
    change: {
      type: Number,
      required: true,
    },
    sterlingCut: {
      type: Number,
      required: false,
    },
    religion: {
      type: String,
      required: false,
    },
    before: {
      type: Number,
      required: false,
    },
    after: {
      type: Number,
      required: false,
    },
  });

  const totalDonations = computed(() => {
    return props.change + (props.sterlingCut || 0);
  });
</script>
<style lang="scss">
  @import "../scss/_variables.scss";
  .Vue-Toastification__icon {
    display: none;
  }
  .Vue-Toastification__toast {
    &:has(.donation-collected.positive) {
      background-color: $green;
    }
    &:has(.donation-collected.negative) {
      background-color: $pink;
    }
  }
</style>
<style lang="scss" scoped>
  @import "../scss/_variables.scss";
  .container {
    display: flex;
    gap: 20px;
    color: #222;
    .number {
      font-size: 2em;
      flex-basis: 32px;
      flex-grow: 1;
      flex-shrink: 0;
      font-family: $monospace;
      font-weight: 900;
    }
    .text-holder {
      display: flex;
      align-items: center;
      font-weight: 600;
      
      .sterling-cut, .player-share {
        font-size: 0.85em;
        margin-top: 8px;
        color: #666;
        line-height: 1.3;
      }
    }
  }
</style>
