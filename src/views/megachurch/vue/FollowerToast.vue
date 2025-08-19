<template>
  <div class="follower-change container" :class="{ positive: change > 0, negative: change < 0 }">
    <div class="point-holder" v-if="change">
      <div class="number" :class="{ positive: change > 0, negative: change < 0 }">
        {{ change > 0 ? `+${change}` : change }}
      </div>
    </div>
    <div class="text-holder">
      <div class="text">
        <div v-if="religion" class="title religion">
          {{ religion }}
        </div>
        <div class="religion-label label">
          {{ change > 0 ? "followers gained" : "followers lost" }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    change: {
      type: Number,
      required: true,
    },
    religion: {
      type: String,
      required: true,
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
    &:has(.container.positive) {
      background-color: rgba(3, 20, 3, 0.9);
    }
    &:has(.container.negative) {
      background-color: rgba(38, 3, 3, 0.9);
    }
  }
</style>
<style lang="scss" scoped>
  @import "../scss/_variables.scss";
  .container {
    display: flex;
    gap: 20px;
    .number {
      font-size: 2em;
      flex-basis: 32px;
      flex-grow: 1;
      flex-shrink: 0;
      font-family: $monospace;
      &.positive {
        color: $green;
      }
      &.negative {
        //color: $red;
        color: $pink;
      }
    }
    .religion {
      font-size: 1.25em;
      font-weight: 620;
      font-family: $serif;
    }
    .label {
      font-size: 0.875em;
    }
  }
</style>
