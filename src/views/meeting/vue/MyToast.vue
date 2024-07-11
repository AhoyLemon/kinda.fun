<template>
  <div :class="'container text-wrapper ' + customClass ?? ''">
    <div
      v-if="points"
      class="points"
    >
      {{ points }} points
    </div>
    <div class="message">{{ message }}</div>
  </div>
</template>
<script setup>
  //import { defineProps } from "vue";
  const props = defineProps({
    points: {
      type: Number,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
    customClass: {
      type: String,
      required: false,
    },
  });
</script>
<style lang="scss" scoped>
  $serif: "Vollkorn", serif;
  $sans-serif: "Montserrat", sans-serif;
  $monospace: "Noto Sans Mono", monospace;

  $cardColor: #f4f4e0;
  $cardColorPlaying: #f2f2ba;
  $focusColor: #ffc107;

  .points {
    font-size: 1.25em;
    font-family: $monospace;
    font-weight: 600;
  }
  .text-wrapper {
    display: grid;
    gap: 10px;
  }
  .message {
    font-weight: 400;
    font-family: $sans-serif;
  }
</style>
<style lang="scss">
  .Vue-Toastification__toast {
    &.blue {
      background: #574ae2;
    }
    &.white {
      background: #f0f0c9;
    }
    &.yellow {
      background: #f2bb05;
    }
    &.green {
      background: #4daa57;
    }
    &.red {
      background: #6e0e0a;
    }

    &.blue,
    &.red {
      border: 2px solid rgba(255, 255, 255, 0.2);
      color: #efefef;
      .Vue-Toastification__progress-bar {
        background-color: rgba(255, 255, 255, 0.65);
      }
    }
    &.white,
    &.yellow,
    &.green {
      border-color: 2px solid rgba(0, 0, 0, 0.2);
      color: #222;
      .Vue-Toastification__progress-bar {
        background-color: rgba(0, 0, 0, 0.65);
      }
    }

    .trophy {
      font-style: normal;
      width: 36px;
      font-size: 2em;
      &:after {
        content: "🏆";
      }
    }
  }
</style>
