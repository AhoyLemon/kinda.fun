<script setup lang="ts">
  // Root component + full per-page <head>, migrated from src/views/guillotine/Page.pug.
  import Guillotine from "@/views/guillotine/Guillotine.vue";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "No More Billionaires",
    keywords: "billionaires, ultra-wealthy, class warfare, net worth, eat the rich, kill the rich, guillotine",
    url: "https://kinda.fun/guillotine",
    image: "https://kinda.fun/img/og-guillotine.jpg",
    playMode: "https://schema.org/SinglePlayer",
    applicationCategory: "GameApplication",
    gamePlatform: "web browser",
    operatingSystem: "Any",
    runtimePlatform: "Web browser",
    genre: "satire",
    description: "Choose five billionaires each day and redistribute their wealth to fund public schools.",
    inLanguage: "en",
    numberOfPlayers: { "@type": "QuantitativeValue", value: 1 },
    creator: {
      "@type": "Person",
      name: "Lemon",
      url: "https://ahoylemon.xyz",
      email: "lemon@ahoylemon.xyz",
      sameAs: ["https://github.com/AhoyLemon", "https://bsky.app/profile/ahoylemon.xyz", "https://mastodon.social/@ahoylemon", "https://thefpl.us/meet/lemon"],
    },
    isAccessibleForFree: true,
    screenshot: [
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/guillotine-01.png",
        caption: "No More Billionaires: opening screen",
        width: 1600,
        height: 1000,
      },
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/guillotine-02.png",
        caption: "No More Billionaires: two billionaires sent to the guillotine",
        width: 1600,
        height: 1000,
      },
    ],
    offers: {
      "@type": "Offer",
      description: "free",
      price: "0",
      priceCurrency: "USD",
    },
    datePublished: "2022-04-04",
  };

  useGameHead({
    title: "No More Billionaires | Generating wealth with a guillotine.",
    ogTitle: "No More Billionaires",
    description: "Generating wealth with a guillotine.",
    path: "/guillotine",
    ogImage: "https://kinda.fun/img/og-guillotine.jpg",
    routeClass: "guillotine",
    fonts: [
      "https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@300..700&display=swap",
      // $monospaced (counters, title/share screens, stats) uses JetBrains Mono.
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap",
    ],
    jsonLd,
  });
</script>

<template>
  <div class="guillotine-view">
    <Guillotine />
  </div>
</template>
