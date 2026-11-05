<script setup lang="ts">
  // Root component + full per-page <head>, migrated from src/views/invalid/Page.pug
  // (fonts, branded favicons, canonical, OpenGraph). Firebase/toast are
  // client-guarded so the landing screen prerenders as real HTML.
  import Invalid from "@/views/invalid/Invalid.vue";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Invalid",
    description: "A multiplayer trivia game where employees create passwords while the SysAdmin sets the rules.",
    keywords: "trivia game, party game, multiplayer, suffering, password, password guess, guessing, cracking, bugs",
    genre: "comedy",
    url: "https://kinda.fun/invalid",
    image: "https://kinda.fun/img/og-invalid.png",
    playMode: "https://schema.org/MultiPlayer",
    applicationCategory: "GameApplication",
    gamePlatform: "web browser",
    operatingSystem: "Any",
    runtimePlatform: "Web browser",
    inLanguage: "en",
    numberOfPlayers: {
      "@type": "QuantitativeValue",
      minValue: 2,
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
      { "@type": "ImageObject", contentUrl: "https://kinda.fun/img/screenshots/invalid-01.png", caption: "Invalid: opening screen", width: 1600, height: 1000 },
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/invalid-02.png",
        caption: "Invalid: SysAdmin setting password rules",
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
    datePublished: "2025-08-01",
  };

  useGameHead({
    title: "Invalid | A trivia game of unnecessary suffering.",
    ogTitle: "Invalid",
    description: "A trivia game of unnecessary suffering.",
    path: "/invalid",
    ogImage: "https://kinda.fun/img/og-invalid.png",
    routeClass: "invalid",
    fonts: [
      "https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
    ],
    favicons: [
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/invalid/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/invalid/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/invalid/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/invalid/favicon.ico", key: "fav-shortcut" },
    ],
    jsonLd,
  });
</script>

<template>
  <div class="invalid-view">
    <Invalid />
  </div>
</template>
