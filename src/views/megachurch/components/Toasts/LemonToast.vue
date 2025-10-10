<template lang="pug" src="./LemonToast.pug"></template>
<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  });
</script>
<style lang="scss" src="./LemonToast.scss"></style>
