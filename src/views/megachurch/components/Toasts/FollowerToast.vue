<template lang="pug" src="./FollowerToast.pug"></template>
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
  @import "../../scss/variables";
  .Vue-Toastification__icon {
    display: none;
  }
  .Vue-Toastification__toast {
    &:has(.follower-change.positive) {
      background-color: rgba(3, 20, 3, 0.9);
    }
    &:has(.follower-change.negative) {
      background-color: rgba(38, 3, 3, 0.9);
    }
  }
</style>
<style lang="scss" src="./FollowerToast.scss" scoped></style>
