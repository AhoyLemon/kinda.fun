<script setup>
  // Root component + full per-page <head>, migrated from src/views/invalid/Page.pug
  // (fonts, branded favicons, canonical, OpenGraph). Firebase/toast are
  // client-guarded so the landing screen prerenders as real HTML.
  import Invalid from "@/views/invalid/Invalid.vue";

  useHead({
    title: "Invalid | A trivia game of unnecessary suffering.",
    link: [
      { rel: "canonical", href: "https://kinda.fun/invalid" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/invalid/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/invalid/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/invalid/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/invalid/favicon.ico", key: "fav-shortcut" },
    ],
    meta: [
      { name: "description", content: "A trivia game of unnecessary suffering." },
      { property: "og:title", content: "Invalid" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "A trivia game of unnecessary suffering." },
      { property: "og:image", content: "https://kinda.fun/img/og-invalid.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/invalid" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
  });
</script>

<template>
  <Invalid />
</template>
