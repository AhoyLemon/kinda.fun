<script setup lang="ts">
  // Root component + full per-page <head>, migrated from src/views/pretend/Page.pug.
  import Pretend from "@/views/pretend/Pretend.vue";

  // JSON-LD (VideoGame) ported from src/views/pretend/pug/_schema.pug.
  const lastUpdated = new Date().toISOString();

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: "Pretend World",
    url: "https://kinda.fun/pretend",
    image: "https://kinda.fun/img/og-pretend.png",
    keywords: "celebrity impersonators, pretend celebrities, guessing game, cheese log, funny game, single player",
    playMode: "SinglePlayer",
    applicationCategory: "browser game",
    gamePlatform: "web browser",
    operatingSystem: "web browser",
    genre: "comedy",
    description: "You are at a party of celebrity impersonators...",
    inLanguage: "English",
    numberOfPlayers: 1,
    creator: {
      "@type": "Person",
      name: "Lemon",
      url: "https://ahoylemon.xyz",
      email: "lemon@ahoylemon.xyz",
      sameAs: [
        "https://github.com/AhoyLemon",
        "https://bsky.app/profile/ahoylemon.xyz",
        "https://mastodon.social/@ahoylemon",
        "https://thefpl.us/meet/lemon",
      ],
    },
    offers: {
      "@type": "Offer",
      description: "free",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
    screenshot: [
      { "@type": "ImageObject", url: "https://kinda.fun/img/pretend/screenshots/1.jpg", width: 1200, height: 650 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/pretend/screenshots/2.jpg", width: 1200, height: 650 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/pretend/screenshots/3.jpg", width: 980, height: 980 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/pretend/screenshots/4.jpg", width: 980, height: 980 },
    ],
    datePublished: "2023-08-23",
    dateModified: lastUpdated,
  };

  useGameHead({
    title: "Pretend World | You are at a party of celebrity impersonators...",
    ogTitle: "Pretend World",
    description: "You are at a party of celebrity impersonators...",
    path: "/pretend",
    ogImage: "https://kinda.fun/img/og-pretend.png",
    fonts: ["https://fonts.googleapis.com/css?family=Limelight|Merriweather:400,400i,900"],
    jsonLd,
  });
</script>

<template>
  <Pretend />
</template>
