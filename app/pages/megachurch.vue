<script setup lang="ts">
  // Root component + full per-page <head>, migrated from src/views/megachurch/Page.pug
  // (fonts, branded favicons; OpenGraph added from the page's og consts).
  import Megachurch from "@/views/megachurch/Megachurch.vue";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Megachurch Tycoon",
    url: "https://kinda.fun/megachurch",
    image: "https://kinda.fun/img/og-megachurch.jpg",
    keywords:
      "satire, management game, dark humor, American religion, parody, organized religion, materialism, greed, hypocrisy, browser game, single player, sermon, profit, social commentary, prosperity gospel",
    playMode: "https://schema.org/SinglePlayer",
    applicationCategory: "GameApplication",
    gamePlatform: "web browser",
    operatingSystem: "Any",
    runtimePlatform: "Web browser",
    genre: "comedy",
    description: "Build a religious empire by preaching to audiences and collecting donations in a satirical management game.",
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
        contentUrl: "https://kinda.fun/img/screenshots/megachurch-01.png",
        caption: "Megachurch Tycoon: opening screen",
        width: 1600,
        height: 1000,
      },
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/megachurch-02.png",
        caption: "Megachurch Tycoon: street preaching results after several days",
        width: 1600,
        height: 1000,
      },
    ],
    datePublished: "2025-11-18",
  };

  useGameHead({
    title: "Megachurch Tycoon | Turn their faith into your fortune, one scam at a time.",
    ogTitle: "Megachurch Tycoon",
    description: "Turn their faith into your fortune, one scam at a time.",
    path: "/megachurch",
    ogImage: "https://kinda.fun/img/og-megachurch.jpg",
    routeClass: "megachurch",
    fonts: ["https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Commissioner:wght@100..900&display=swap"],
    favicons: [
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/megachurch/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/megachurch/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/megachurch/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/megachurch/favicon.ico", key: "fav-shortcut" },
    ],
    jsonLd,
  });
</script>

<template>
  <div class="megachurch-view">
    <Megachurch />
  </div>
</template>
