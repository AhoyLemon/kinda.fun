<script setup lang="ts">
  // Root component + full per-page <head>, migrated from the legacy
  // src/views/cameo/Page.pug (fonts, branded favicons, theme color, canonical,
  // OpenGraph). Firebase/toast usage inside the component is client-guarded so
  // the title screen prerenders as real HTML.
  import Cameo from "@/views/cameo/Cameo.vue";

  // JSON-LD (VideoGame) ported from src/views/cameo/pug/_schema.pug.
  const lastUpdated = new Date().toISOString();

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: "Comparatively Famous",
    url: "https://kinda.fun/cameo",
    image: "https://kinda.fun/img/og-famous.png",
    keywords: "comedy game, celebrity, sorting, cameo, famous people, kinda fun games",
    playMode: "SinglePlayer",
    applicationCategory: "browser game",
    gamePlatform: "web browser",
    operatingSystem: "web browser",
    genre: "comedy",
    description: "The Game of Celebrity Value",
    inLanguage: "English",
    numberOfPlayers: 1,
    aggregateRating: {
      ratingValue: 5,
      ratingCount: 12,
    },
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
      { "@type": "ImageObject", url: "https://kinda.fun/img/famous/screenshots/title-screen.jpg", width: 1270, height: 760 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/famous/screenshots/sort-three.jpg", width: 1270, height: 760 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/famous/screenshots/sort-midway.jpg", width: 1270, height: 760 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/famous/screenshots/valuate.jpg", width: 1270, height: 760 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/famous/screenshots/final-round.jpg", width: 1270, height: 760 },
    ],
    datePublished: "2021-02-16",
    dateModified: lastUpdated,
  };

  useGameHead({
    title: "Comparatively Famous | The Game of Celebrity Value",
    ogTitle: "Comparatively Famous",
    description: "The Game of Celebrity Value",
    path: "/cameo",
    ogImage: "https://kinda.fun/img/og-famous.png",
    themeColor: "#3b1666",
    fonts: ["https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700&family=Open+Sans:wght@400;700&display=swap"],
    favicons: [
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/famous/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/famous/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/famous/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/famous/favicon.ico", key: "fav-shortcut" },
      { rel: "mask-icon", href: "/img/famous/safari-pinned-tab.svg", color: "#1cb3ef", key: "fav-mask" },
    ],
    jsonLd,
  });
</script>

<template>
  <Cameo />
</template>
