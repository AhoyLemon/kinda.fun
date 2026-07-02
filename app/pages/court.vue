<script setup>
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

  useHead({
    title: "Supreme Court: The Card Game | The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!",
    link: [
      { rel: "canonical", href: "https://kinda.fun/court" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,700|Poppins:400,400i,700" },
    ],
    meta: [
      // Match the legacy per-page viewport: disable zoom so double-tapping cards
      // doesn't trigger mobile zoom mid-game. (Overrides the global viewport.)
      { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
      { name: "description", content: "The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!" },
      { property: "og:title", content: "Supreme Court: The Card Game" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!" },
      { property: "og:image", content: "https://kinda.fun/img/og-court.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/court" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) },
    ],
  });
</script>

<template>
  <Court />
</template>
