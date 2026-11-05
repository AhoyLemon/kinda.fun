<script setup lang="ts">
  // Root component + full per-page <head>, migrated from src/views/pretend/Page.pug.
  import Pretend from "@/views/pretend/Pretend.vue";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Pretend World",
    url: "https://kinda.fun/pretend",
    image: "https://kinda.fun/img/og-pretend.png",
    keywords: "celebrity impersonators, pretend celebrities, guessing game, cheese log, funny game, single player",
    playMode: "https://schema.org/SinglePlayer",
    applicationCategory: "GameApplication",
    gamePlatform: "web browser",
    operatingSystem: "Any",
    runtimePlatform: "Web browser",
    genre: "comedy",
    description: "Guess who celebrity impersonators are pretending to be while trying to reach the cheese log.",
    inLanguage: "en",
    numberOfPlayers: { "@type": "QuantitativeValue", value: 1 },
    creator: {
      "@type": "Person",
      name: "Lemon",
      url: "https://ahoylemon.xyz",
      email: "lemon@ahoylemon.xyz",
      sameAs: ["https://github.com/AhoyLemon", "https://bsky.app/profile/ahoylemon.xyz", "https://mastodon.social/@ahoylemon", "https://thefpl.us/meet/lemon"],
    },
    offers: {
      "@type": "Offer",
      description: "free",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
    screenshot: [
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/pretend-01.png",
        caption: "Pretend World: celebrity impersonator guessing screen",
        width: 1600,
        height: 1000,
      },
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/pretend-02.png",
        caption: "Pretend World: result of a guess",
        width: 1600,
        height: 1000,
      },
    ],
    datePublished: "2023-08-23",
  };

  useGameHead({
    title: "Pretend World | You are at a party of celebrity impersonators...",
    ogTitle: "Pretend World",
    description: "You are at a party of celebrity impersonators...",
    path: "/pretend",
    ogImage: "https://kinda.fun/img/og-pretend.png",
    routeClass: "pretend",
    fonts: ["https://fonts.googleapis.com/css?family=Limelight|Merriweather:400,400i,900"],
    jsonLd,
  });
</script>

<template>
  <div class="pretend-view">
    <Pretend />
  </div>
</template>
