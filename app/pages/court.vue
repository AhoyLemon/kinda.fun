<script setup lang="ts">
  // Root component + full per-page <head>, migrated from src/views/court/Page.pug.
  import Court from "@/views/court/Court.vue";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Supreme Court: The Card Game",
    url: "https://kinda.fun/court",
    image: "https://kinda.fun/img/og-court.png",
    keywords: "card game, supreme court, justices, satirical",
    playMode: "https://schema.org/SinglePlayer",
    applicationCategory: "GameApplication",
    gamePlatform: "web browser",
    operatingSystem: "Any",
    runtimePlatform: "Web browser",
    genre: "comedy",
    description: "The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!",
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
        contentUrl: "https://kinda.fun/img/screenshots/court-01.png",
        caption: "Supreme Court: The Card Game: opening screen",
        width: 1600,
        height: 1000,
      },
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/court-02.png",
        caption: "Supreme Court: The Card Game: trial in progress",
        width: 1600,
        height: 1000,
      },
    ],
    datePublished: "2026-05-25",
  };

  useGameHead({
    title: "Supreme Court: The Card Game | The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!",
    ogTitle: "Supreme Court: The Card Game",
    description: "The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!",
    path: "/court",
    ogImage: "https://kinda.fun/img/og-court.png",
    routeClass: "court",
    // Match the legacy per-page viewport: disable zoom so double-tapping cards
    // doesn't trigger mobile zoom mid-game.
    noZoomViewport: true,
    fonts: ["https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,700|Poppins:400,400i,700"],
    jsonLd,
  });
</script>

<template>
  <div class="court-view">
    <Court />
  </div>
</template>
