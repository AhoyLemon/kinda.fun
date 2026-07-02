<script setup lang="ts">
  // Shared error/not-found UI, used by both the /not-found catch-all
  // (app/pages/[...slug].vue) and the runtime error boundary (app/error.vue).
  // Defaults render the classic 404; error.vue passes the real status/heading.
  defineProps({
    statusCode: { type: [Number, String], default: 404 },
    heading: { type: String, default: "Page Not Found" },
  });

  // Click-only handlers — they never run during prerender, so no client guard.
  const goHome = () => {
    window.location.href = `${window.location.protocol}//${window.location.host}`;
  };
  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else goHome();
  };
  const visitLemon = () => {
    window.location.href = "https://ahoylemon.xyz";
  };
</script>

<template lang="pug" src="@/views/404/NotFound.pug"></template>
<style lang="scss" src="@/views/404/NotFound.scss"></style>
