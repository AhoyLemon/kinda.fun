<script setup lang="ts">
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

  useGameHead({
    title: "This Meeting Has Points | So now you have a reason to pay attention.",
    ogTitle: "This Meeting Has Points",
    description: "So now you have a reason to pay attention.",
    path: "/meeting",
    ogImage: "https://kinda.fun/img/og-meeting.png",
    routeClass: "meeting",
    fonts: ["https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap"],
    jsonLd,
  });
</script>

<template>
  <div class="meeting-view">
    <Meeting />
  </div>
</template>
