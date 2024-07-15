<template>
  <div class="container">
    <div class="text-holder">
      <div class="text">
        <div
          v-if="title"
          class="title"
        >
          {{ title }}
        </div>
        <div
          v-if="message"
          class="message"
          v-html="message"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
  //import { defineProps } from "vue";
  const props = defineProps({
    title: {
      type: String,
      required: false,
    },
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
  .container {
    .text-holder {
      .text {
        .title {
          font-size: 1.75rem;
        }
      }
    }
  }
</style>
