<template>
  <div
    class="container"
    :class="{ 'points-and-text': points }"
  >
    <div
      class="point-holder"
      v-if="points"
    >
      <div
        class="points"
        :class="{ positive: points > 0, negative: points < 0 }"
      >
        {{ points }}
      </div>
    </div>
    <!-- <div
      v-if="points"
      class="points"
    >
      {{ points }} points
    </div> -->
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
        >
          {{ message }}
        </div>
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
  $serif: "Vollkorn", serif;
  $sans-serif: "Montserrat", sans-serif;
  $monospace: "Noto Sans Mono", monospace;

  $cardColor: #f4f4e0;
  $cardColorPlaying: #f2f2ba;
  $focusColor: #ffc107;

  $blue: #574ae2;
  $cream: #f0f0c9;
  $yellow: #f2bb05;
  $green: #4daa57;
  $red: #6e0e0a;

  .points-and-text {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 10px;
    .point-holder {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .points {
      font-size: 1.25em;
      font-family: $monospace;
      font-weight: 600;
      // background: red;
      width: 60px;
      height: 60px;
      text-align: center;
      border-radius: 50%;
      line-height: 56px;
      border: 2px solid;
      &.positive {
        background: $cream;
        color: #222;
        border-color: #222;
        font-weight: 825;
      }
      &.negative {
        background: #222;
        color: #efefef;
        border-color: #efefef;
      }
    }
  }

  .text-wrapper {
    display: grid;
    gap: 10px;
  }
  .text-holder {
    display: flex;
    align-items: center;
  }
  .title {
    font-family: $serif;
    font-weight: 725;
    font-size: 1.25rem;
  }
  .message {
    font-weight: 500;
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

    // .trophy {
    //   font-style: normal;
    //   width: 36px;
    //   font-size: 2em;
    //   &:after {
    //     content: "🏆";
    //   }
    // }
  }
</style>
