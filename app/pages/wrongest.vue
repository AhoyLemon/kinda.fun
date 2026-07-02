<script setup>
  // Root component + full per-page <head>, migrated from src/views/wrongest/Page.pug
  // (fonts, branded favicons, theme color, canonical, OpenGraph).
  import Wrongest from "@/views/wrongest/Wrongest.vue";

  // JSON-LD (VideoGame) ported from the inline schema the site actually served
  // (src/views/wrongest/Page.pug), not the orphaned pug/_schema.pug partial.
  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: "The Wrongest Words",
    url: "https://kinda.fun/wrongest",
    image: "https://kinda.fun/img/wrongest/og-wide.png",
    playMode: "MultiPlayer",
    applicationCategory: "browser game",
    gamePlatform: "web browser",
    operatingSystem: "web browser",
    genre: "comedy",
    description: "A party game where you will defend some very stupid ideas.",
    inLanguage: "English",
    numberOfPlayers: {
      minValue: 3,
      maxValue: 20,
    },
    aggregateRating: {
      ratingValue: 4.33333,
      ratingCount: 3,
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
    screenshot: [
      { "@type": "ImageObject", url: "https://kinda.fun/img/wrongest/screenshots/1.png", width: 980, height: 780 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/wrongest/screenshots/2.png", width: 980, height: 780 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/wrongest/screenshots/3.jpg", width: 980, height: 780 },
    ],
  };

  useHead({
    title: "The Wrongest Words | A party game where you will defend some very stupid ideas.",
    link: [
      { rel: "canonical", href: "https://kinda.fun/wrongest" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;600&display=swap" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/wrongest/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/wrongest/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/wrongest/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/wrongest/favicon.ico", key: "fav-shortcut" },
    ],
    meta: [
      { name: "description", content: "A party game where you will defend some very stupid ideas." },
      { name: "theme-color", content: "#ef507a" },
      { name: "msapplication-TileColor", content: "#ef507a" },
      { property: "og:title", content: "The Wrongest Words" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "A party game where you will defend some very stupid ideas." },
      { property: "og:image", content: "https://kinda.fun/img/og-wrongest.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/wrongest" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) },
    ],
  });
</script>

<template>
  <Wrongest />
</template>
