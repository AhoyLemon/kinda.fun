<script setup lang="ts">
  // Root component + full per-page <head>, migrated from src/views/wrongest/Page.pug
  // (fonts, branded favicons, theme color, canonical, OpenGraph, JSON-LD).
  import Wrongest from "@/views/wrongest/Wrongest.vue";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "The Wrongest Words",
    url: "https://kinda.fun/wrongest",
    image: "https://kinda.fun/img/wrongest/og-wide.png",
    playMode: "https://schema.org/MultiPlayer",
    applicationCategory: "GameApplication",
    gamePlatform: "web browser",
    operatingSystem: "Any",
    runtimePlatform: "Web browser",
    genre: "comedy",
    description: "A party game where you will defend some very stupid ideas.",
    inLanguage: "en",
    numberOfPlayers: {
      "@type": "QuantitativeValue",
      minValue: 3,
      maxValue: 10,
    },
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
        contentUrl: "https://kinda.fun/img/screenshots/wrongest-01.png",
        caption: "The Wrongest Words: opening screen",
        width: 1600,
        height: 1000,
      },
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/wrongest-02.png",
        caption: "The Wrongest Words: players voting on statements",
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
  };

  useGameHead({
    title: "The Wrongest Words | A party game where you will defend some very stupid ideas.",
    ogTitle: "The Wrongest Words",
    description: "A party game where you will defend some very stupid ideas.",
    path: "/wrongest",
    ogImage: "https://kinda.fun/img/og-wrongest.png",
    themeColor: "#ef507a",
    routeClass: "wrongest",
    fonts: ["https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;600&display=swap"],
    favicons: [
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/wrongest/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/wrongest/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/wrongest/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/wrongest/favicon.ico", key: "fav-shortcut" },
    ],
    jsonLd,
  });
</script>

<template>
  <div class="wrongest-view">
    <Wrongest />
  </div>
</template>
