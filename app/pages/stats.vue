<script setup lang="ts">
  // Firestore-backed dashboard: prerenders a loading shell and fetches live
  // data on mount (Firebase client-guarded inside the component).
  import Stats from "@/views/stats/Stats.vue";

  useGameHead({
    title: "Kinda Fun Stats | Let's see what people are playing.",
    ogTitle: "Kinda Fun Stats",
    description: "Let's see what people are playing.",
    path: "/stats",
    themeColor: "#e5e828",
    routeClass: "stats",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Kinda Fun Stats",
      description: "Statistics about the games on Kinda fun.",
      url: "https://kinda.fun/stats",
      isPartOf: { "@type": "WebSite", name: "Kinda fun.", url: "https://kinda.fun" },
      inLanguage: "en",
    },
    fonts: [
      "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Lora:ital,wght@0,400..700;1,400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap",
    ],
  });
</script>

<template>
  <div class="stats-view">
    <Stats />
  </div>
</template>
