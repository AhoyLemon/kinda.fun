<script setup>
  import { onMounted } from "vue";

  // Nuxt passes the error object to error.vue. We don't need its fields for the
  // 404 UI, but declaring the prop keeps Nuxt happy.
  defineProps({
    error: { type: Object, default: () => ({}) },
  });

  // Head migrated from the legacy src/views/404/Page.pug. Fonts + site favicons
  // come from nuxt.config's global head.
  useHead({
    title: "404 — Page Not Found | Kinda fun.",
    meta: [
      { name: "description", content: "Sorry, the page you're looking for doesn't exist. Check out our games instead!" },
      { name: "theme-color", content: "#e5e828" },
      { name: "msapplication-TileColor", content: "#e5e828" },
      { property: "og:title", content: "404 - Page Not Found | Kinda fun." },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Sorry, the page you're looking for doesn't exist. Check out our games instead!" },
      { property: "og:image", content: "https://kinda.fun/img/og-wide.png" },
      { property: "og:image:width", content: "1280" },
      { property: "og:image:height", content: "640" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
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
