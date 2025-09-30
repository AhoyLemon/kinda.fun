<template>
  <div class="donation-collected container" :class="{ positive: change > 0, negative: change < 0 }">
    <template v-if="change">
      <div class="point-holder" v-if="change">
        <div class="number">
          {{ dollars(change) }}
        </div>
      </div>
      <div class="text-holder">
        <div class="text">
          <div class="religion-label label">in donations collected</div>
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
  const props = defineProps({
    change: {
      type: Number,
      required: true,
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
    }
  }
</style>
