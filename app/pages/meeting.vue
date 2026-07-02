<script setup>
  // Root component + full per-page <head>, migrated from src/views/meeting/Page.pug.
  import Meeting from "@/views/meeting/Meeting.vue";

  // JSON-LD (VideoGame) ported from src/views/meeting/pug/_schema.pug.
  const lastUpdated = new Date().toISOString();

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: "This Meeting Has Points",
    description: "So now you have a reason to pay attention.",
    keywords: "multiplayer, social game, deduction, card game, meeting game, screwing around at work, virtual team game, coworkers",
    genre: "comedy",
    url: "https://kinda.fun/meeting",
    image: "https://kinda.fun/img/og-meeting.png",
    playMode: "MultiPlayer",
    applicationCategory: "browser game",
    gamePlatform: "web browser",
    operatingSystem: "web browser",
    inLanguage: "English",
    numberOfPlayers: {
      minValue: 2,
      maxValue: 8,
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
    datePublished: "2025-07-10",
    dateModified: lastUpdated,
  };

  useHead({
    title: "This Meeting Has Points | So now you have a reason to pay attention.",
    link: [
      { rel: "canonical", href: "https://kinda.fun/meeting" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap" },
    ],
    meta: [
      { name: "description", content: "So now you have a reason to pay attention." },
      { property: "og:title", content: "This Meeting Has Points" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "So now you have a reason to pay attention." },
      { property: "og:image", content: "https://kinda.fun/img/og-meeting.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/meeting" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) },
    ],
  });
</script>

<template>
  <Meeting />
</template>
