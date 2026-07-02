<script setup>
  // Root component + full per-page <head>, migrated from src/views/invalid/Page.pug
  // (fonts, branded favicons, canonical, OpenGraph). Firebase/toast are
  // client-guarded so the landing screen prerenders as real HTML.
  import Invalid from "@/views/invalid/Invalid.vue";

  // JSON-LD (VideoGame) ported from src/views/invalid/pug/_schema.pug.
  const lastUpdated = new Date().toISOString();

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: "Invalid",
    description: "A trivia game of unnecessary suffering.",
    keywords: "trivia game, party game, multiplayer, suffering, password, password guess, guessing, cracking, bugs",
    genre: "comedy",
    url: "https://kinda.fun/invalid",
    image: "https://kinda.fun/img/og-invalid.png",
    playMode: "MultiPlayer",
    applicationCategory: "browser game",
    gamePlatform: "web browser",
    operatingSystem: "web browser",
    inLanguage: "English",
    numberOfPlayers: {
      minValue: 2,
      maxValue: 10,
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
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      description: "free",
      price: "0",
      priceCurrency: "USD",
    },
    screenshot: [
      { "@type": "ImageObject", url: "https://kinda.fun/img/invalid/screenshots/1.jpg", width: 1920, height: 1080 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/invalid/screenshots/2.jpg", width: 1920, height: 1080 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/invalid/screenshots/3.jpg", width: 1920, height: 1080 },
    ],
    datePublished: "2025-08-01",
    dateModified: lastUpdated,
  };

  useHead({
    title: "Invalid | A trivia game of unnecessary suffering.",
    link: [
      { rel: "canonical", href: "https://kinda.fun/invalid" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/invalid/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/invalid/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/invalid/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/invalid/favicon.ico", key: "fav-shortcut" },
    ],
    meta: [
      { name: "description", content: "A trivia game of unnecessary suffering." },
      { property: "og:title", content: "Invalid" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "A trivia game of unnecessary suffering." },
      { property: "og:image", content: "https://kinda.fun/img/og-invalid.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/invalid" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) },
    ],
  });
</script>

<template>
  <Invalid />
</template>
