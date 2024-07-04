<template>
  <div :class="'container text-wrapper ' + customClass ?? ''">
    <div class="title">{{ title }}</div>
    <div
      v-if="points && points > 0"
      class="points"
    >
      ({{ points }} points)
    </div>
    <div class="message">{{ message }}</div>
  </div>
</template>
<script setup>
  //import { defineProps } from "vue";
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: false,
    },
    customClass: {
      type: String,
      required: false,
    },
  });
</script>
<style lang="scss" scoped>
  @import "@/views/sisyphus/scss/partials/_variables";
  .text-wrapper {
    display: grid;
    gap: 10px;
  }
  .title {
    font-family: $crimson;
    font-size: 1.65em;
    font-weight: 545;
  }
  .points {
    text-align: right;
  }
</style>
<style lang="scss">
  .Vue-Toastification__toast {
    &.cheevo-toast {
      background: #333;
      border: 2px solid rgba(255, 255, 255, 0.2);

      .Vue-Toastification__progress-bar {
        background-color: rgba(255, 255, 255, 0.65);
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
