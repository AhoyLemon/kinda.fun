<script setup>
  import { onMounted } from "vue";

  // Nuxt passes the error object to error.vue. We don't need its fields for the
  // 404 UI, but declaring the prop keeps Nuxt happy.
  defineProps({
    error: { type: Object, default: () => ({}) },
  });

  useHead({
    title: "404 — Page Not Found | Kinda fun.",
  });

  const goHome = () => {
    if (import.meta.client) window.location.href = `${window.location.protocol}//${window.location.host}`;
  };

  const goBack = () => {
    if (!import.meta.client) return;
    if (window.history.length > 1) {
      window.history.back();
    } else {
      goHome();
    }
  };

  const visitLemon = () => {
    if (import.meta.client) window.location.href = "https://ahoylemon.xyz";
  };

  onMounted(() => {
    console.log("404 - Page not found:", window.location.pathname);
  });
</script>

<template lang="pug" src="@/views/404/NotFound.pug"></template>
<style lang="scss" src="@/views/404/NotFound.scss"></style>
