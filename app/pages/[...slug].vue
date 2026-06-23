<script setup>
  import { onMounted } from "vue";

  // Catch-all page: renders the 404 UI as real, prerenderable HTML. The build
  // copies the prerendered /not-found output to 404.html, which Firebase
  // Hosting serves (with a real 404 status) for unmatched routes. We do NOT set
  // a 404 status here: the Nitro prerenderer skips writing files for non-2xx
  // responses, so the page must render 200 to be emitted.
  useHead({
    title: "404 — Page Not Found | Kinda fun.",
    meta: [{ name: "robots", content: "noindex" }],
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
