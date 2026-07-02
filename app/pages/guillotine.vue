<script setup>
  // Root component + full per-page <head>, migrated from src/views/guillotine/Page.pug.
  import Guillotine from "@/views/guillotine/Guillotine.vue";

  useHead({
    title: "No More Billionaires | Generating wealth with a guillotine.",
    link: [
      { rel: "canonical", href: "https://kinda.fun/guillotine" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@300..700&display=swap" },
    ],
    meta: [
      { name: "description", content: "Generating wealth with a guillotine." },
      { property: "og:title", content: "No More Billionaires" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Generating wealth with a guillotine." },
      { property: "og:image", content: "https://kinda.fun/img/og-guillotine.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/guillotine" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
  });
</script>

<template>
  <Guillotine />
</template>
