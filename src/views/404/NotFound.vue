<script setup>
  import { ref, onMounted } from "vue";
  
  const currentUrl = ref(window.location.href);
  const baseURL = `${window.location.protocol}//${window.location.host}`;
  
  const goHome = () => {
    window.location.href = baseURL;
  };
  
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      goHome();
    }
  };
  
  onMounted(() => {
    // Log the 404 for analytics if needed
    console.log('404 - Page not found:', window.location.pathname);
  });
</script>

<template lang="pug" src="./NotFound.pug"></template>
<style lang="scss" src="./NotFound.scss"></style>