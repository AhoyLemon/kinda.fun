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
<style lang="scss" src="./FollowerToast.scss"></style>
