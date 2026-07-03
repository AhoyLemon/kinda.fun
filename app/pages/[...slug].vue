<script setup lang="ts">
  // Catch-all page: renders the 404 UI as real, prerenderable HTML. The build
  // copies the prerendered /not-found output to 404.html, which Firebase
  // Hosting serves (with a real 404 status) for unmatched routes. We do NOT set
  // a 404 status here: the Nitro prerenderer skips writing files for non-2xx
  // responses, so the page must render 200 to be emitted.
  useHead({
    title: "404 — Page Not Found | Kinda fun.",
    meta: [{ name: "robots", content: "noindex" }],
  });
</script>

<template>
  <NotFound />
</template>
