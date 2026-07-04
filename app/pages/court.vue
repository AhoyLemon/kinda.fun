<script setup lang="ts">
  // Root component + full per-page <head>, migrated from src/views/court/Page.pug.
  import Court from "@/views/court/Court.vue";

  // JSON-LD (VideoGame) ported from src/views/court/pug/_schema.pug.
  const lastUpdated = new Date().toISOString();

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: "Supreme Court: The Card Game",
    url: "https://kinda.fun/court",
    image: "https://kinda.fun/img/og-court.png",
    keywords: "card game, supreme court, justices, satirical",
    playMode: "SinglePlayer",
    applicationCategory: "browser game",
    gamePlatform: "web browser",
    operatingSystem: "web browser",
    genre: "comedy",
    description: "The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!",
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
      { "@type": "ImageObject", url: "https://kinda.fun/img/famous/screenshots/midtrial.jpg", width: 1270, height: 760 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/famous/screenshots/select-court.jpg", width: 1270, height: 760 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/famous/screenshots/case-selection.jpg", width: 1270, height: 760 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/famous/screenshots/justice-selection.jpg", width: 1270, height: 760 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/famous/screenshots/verdict.jpg", width: 1270, height: 760 },
    ],
    datePublished: "2026-05-25",
    dateModified: lastUpdated,
  };

  useGameHead({
    title: "Supreme Court: The Card Game | The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!",
    ogTitle: "Supreme Court: The Card Game",
    description: "The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!",
    path: "/court",
    ogImage: "https://kinda.fun/img/og-court.png",
    bodyClass: "court",
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
