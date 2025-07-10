<template>
  <div :class="'container text-wrapper ' + customClass ?? ''">
    <div class="title">{{ title }}</div>
    <div v-if="points" class="points-holder">
      <span v-if="points > 0" class="points positive-points">
        {{ points }}
      </span>
      <span v-if="points < 0" class="points negative-points">
        {{ points }}
      </span>
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
    padding: 14px;
    &.cheevo-toast {
      border: 2px solid rgba(255, 255, 255, 0.2);

      .Vue-Toastification__progress-bar {
        background-color: rgba(0, 0, 0, 0.65);
      }
    }
    .Vue-Toastification__icon {
      margin-top: 16px;
    }
    .trophy {
      font-style: normal;
      width: 36px;
      font-size: 2em;
      &:after {
        content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 1200 1200"><path d="M1072.7 226.55H937.33c2.766-32.531 3.234-53.859 3.375-57.844.234-9.703-3.469-18.938-10.312-25.922-6.844-6.937-16.078-10.781-25.688-10.781h-609.24c-9.703 0-18.938 3.844-25.688 10.781-6.703 6.938-10.453 16.219-10.312 25.922 0 3.938.61 25.312 3.375 57.844H127.47c-19.547 0-35.391 15.469-36 35.062-3.937 145.45 65.766 427.78 357.84 455.39 27.375 24 58.547 43.078 94.312 55.219 18.234 6.14 37.312 9.234 56.391 9.234s38.297-3.14 56.391-9.234c35.766-12.141 66.938-31.219 94.312-55.219 292.08-27.609 361.78-309.94 357.84-455.39-.469-19.453-16.453-35.062-36-35.062zm-908.29 72h106.31c13.312 96.234 42.375 227.53 105.23 329.76C202.09 567.841 170.03 378 164.4 298.55zm505.08 227.9-63.375-34.547a12.868 12.868 0 0 0-12.234 0l-63.375 34.547c-9.469 5.156-20.625-3-18.609-13.547l13.312-71.062c.844-4.219-.61-8.625-3.703-11.625l-52.547-49.547c-7.781-7.313-3.61-20.531 7.078-21.844l71.625-9.234c4.313-.61 8.063-3.235 9.844-7.22l30.938-65.296c4.547-9.703 18.375-9.703 23.062 0l30.938 65.297c1.781 3.937 5.531 6.61 9.844 7.219l71.625 9.234c10.688 1.313 14.859 14.531 7.078 21.844l-52.547 49.547c-3.14 3-4.547 7.313-3.703 11.625l13.312 71.062c2.062 10.547-9.235 18.703-18.61 13.547zm332.16-77.672c-36.141 91.219-95.766 151.22-177.71 179.53 62.859-102.23 91.922-233.53 105.23-329.76h106.08c-2.766 35.297-10.688 92.531-33.609 150.24zM396 1032c0 19.922 16.078 36 36 36h336c19.922 0 36-16.078 36-36V924H396zM711.61 787.45c-13.781 7.313-28.312 13.688-43.688 18.844-21.844 7.453-44.766 11.156-67.922 11.156s-46.078-3.703-67.922-11.156c-14.531-4.922-28.312-10.922-41.531-17.625-12.375 52.078-52.078 90.938-67.219 99.469h355.78c-15.234-8.531-55.312-47.766-67.453-100.55z"/></svg>');
      }
    }
  }
</style>
