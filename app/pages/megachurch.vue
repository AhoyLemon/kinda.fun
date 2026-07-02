<script setup>
  // Root component + full per-page <head>, migrated from src/views/megachurch/Page.pug
  // (fonts, branded favicons; OpenGraph added from the page's og consts).
  import Megachurch from "@/views/megachurch/Megachurch.vue";

  // JSON-LD (VideoGame) ported from src/views/megachurch/pug/_schema.pug.
  const lastUpdated = new Date().toISOString();

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: "Megachurch Tycoon",
    url: "https://kinda.fun/megachurch",
    image: "https://kinda.fun/img/og-megachurch.jpg",
    keywords: "satire, management game, dark humor, American religion, parody, organized religion, materialism, greed, hypocrisy, browser game, single player, sermon, profit, social commentary, prosperity gospel",
    playMode: "SinglePlayer",
    applicationCategory: "browser game",
    gamePlatform: "web browser",
    operatingSystem: "web browser",
    genre: "comedy",
    description: "Turn their faith into your fortune, one scam at a time.",
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
    datePublished: "2025-11-18",
    dateModified: lastUpdated,
  };

  useHead({
    title: "Megachurch Tycoon | Turn their faith into your fortune, one scam at a time.",
    link: [
      { rel: "canonical", href: "https://kinda.fun/megachurch" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Commissioner:wght@100..900&display=swap" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/megachurch/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/megachurch/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/megachurch/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/megachurch/favicon.ico", key: "fav-shortcut" },
    ],
    meta: [
      { name: "description", content: "Turn their faith into your fortune, one scam at a time." },
      { property: "og:title", content: "Megachurch Tycoon" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Turn their faith into your fortune, one scam at a time." },
      { property: "og:image", content: "https://kinda.fun/img/og-megachurch.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/megachurch" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) },
    ],
  });
</script>

<template>
  <Megachurch />
</template>
