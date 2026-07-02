<script setup>
  // Root component + full per-page <head>, migrated from src/views/guillotine/Page.pug.
  import Guillotine from "@/views/guillotine/Guillotine.vue";

  // JSON-LD (VideoGame) ported from src/views/guillotine/pug/partials/_schema.pug.
  const lastUpdated = new Date().toISOString();

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: "No More Billionaires",
    keywords: "billionaires, ultra-wealthy, class warfare, net worth, eat the rich, kill the rich, guillotine",
    url: "https://kinda.fun/guillotine",
    image: "https://kinda.fun/img/og-guillotine.jpg",
    playMode: "SinglePlayer",
    applicationCategory: "browser game",
    gamePlatform: "web browser",
    operatingSystem: "web browser",
    genre: "guessing game",
    description: "Generating wealth with a guillotine.",
    inLanguage: "English",
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
    datePublished: "2022-04-04",
    dateModified: lastUpdated,
  };

  useHead({
    title: "No More Billionaires | Generating wealth with a guillotine.",
    link: [
      { rel: "canonical", href: "https://kinda.fun/guillotine" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@300..700&display=swap" },
      // $monospaced (counters, title/share screens, stats) uses JetBrains Mono.
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap" },
    ],
    meta: [
      { name: "description", content: "Generating wealth with a guillotine." },
      { property: "og:title", content: "No More Billionaires" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Generating wealth with a guillotine." },
      { property: "og:image", content: "https://kinda.fun/img/og-guillotine.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/guillotine" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) },
    ],
  });
</script>

<template>
  <Guillotine />
</template>
