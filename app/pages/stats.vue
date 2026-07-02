<script setup>
  // Firestore-backed dashboard: prerenders a loading shell and fetches live
  // data on mount (Firebase client-guarded inside the component). Head migrated
  // from src/views/stats/Page.pug (fonts, theme color, canonical, OpenGraph).
  import Stats from "@/views/stats/Stats.vue";

  useHead({
    title: "Kinda Fun Stats | Let's see what people are playing.",
    link: [
      { rel: "canonical", href: "https://kinda.fun/stats" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Lora:ital,wght@0,400..700;1,400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" },
    ],
    meta: [
      { name: "description", content: "Let's see what people are playing." },
      { name: "theme-color", content: "#e5e828" },
      { name: "msapplication-TileColor", content: "#e5e828" },
      { property: "og:title", content: "Kinda Fun Stats" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Let's see what people are playing." },
      { property: "og:url", content: "https://kinda.fun/stats" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
  });
</script>

<template>
  <Stats />
</template>
