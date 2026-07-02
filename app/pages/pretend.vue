<script setup>
  // Root component + full per-page <head>, migrated from src/views/pretend/Page.pug.
  import Pretend from "@/views/pretend/Pretend.vue";

  // JSON-LD (VideoGame) ported from src/views/pretend/pug/_schema.pug.
  const lastUpdated = new Date().toISOString();

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: "Pretend World",
    url: "https://kinda.fun/pretend",
    image: "https://kinda.fun/img/og-pretend.png",
    keywords: "celebrity impersonators, pretend celebrities, guessing game, cheese log, funny game, single player",
    playMode: "SinglePlayer",
    applicationCategory: "browser game",
    gamePlatform: "web browser",
    operatingSystem: "web browser",
    genre: "comedy",
    description: "You are at a party of celebrity impersonators...",
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
      { "@type": "ImageObject", url: "https://kinda.fun/img/pretend/screenshots/1.jpg", width: 1200, height: 650 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/pretend/screenshots/2.jpg", width: 1200, height: 650 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/pretend/screenshots/3.jpg", width: 980, height: 980 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/pretend/screenshots/4.jpg", width: 980, height: 980 },
    ],
    datePublished: "2023-08-23",
    dateModified: lastUpdated,
  };

  useHead({
    title: "Pretend World | You are at a party of celebrity impersonators...",
    link: [
      { rel: "canonical", href: "https://kinda.fun/pretend" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Limelight|Merriweather:400,400i,900" },
    ],
    meta: [
      { name: "description", content: "You are at a party of celebrity impersonators..." },
      { property: "og:title", content: "Pretend World" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "You are at a party of celebrity impersonators..." },
      { property: "og:image", content: "https://kinda.fun/img/og-pretend.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/pretend" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) },
    ],
  });
</script>

<template>
  <Pretend />
</template>
