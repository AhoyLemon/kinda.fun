<script setup lang="ts">
  // Root component + full per-page <head>, migrated from src/views/meeting/Page.pug.
  import Meeting from "@/views/meeting/Meeting.vue";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "This Meeting Has Points",
    description: "A multiplayer game where coworkers score points by slipping secret phrases into a meeting.",
    keywords: "multiplayer, social game, deduction, card game, meeting game, screwing around at work, virtual team game, coworkers",
    genre: "comedy",
    url: "https://kinda.fun/meeting",
    image: "https://kinda.fun/img/og-meeting.png",
    playMode: "https://schema.org/MultiPlayer",
    applicationCategory: "GameApplication",
    gamePlatform: "web browser",
    operatingSystem: "Any",
    runtimePlatform: "Web browser",
    inLanguage: "en",
    numberOfPlayers: {
      "@type": "QuantitativeValue",
      minValue: 2,
      maxValue: 6,
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
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/meeting-01.png",
        caption: "This Meeting Has Points: opening screen",
        width: 1600,
        height: 1000,
      },
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/meeting-02.png",
        caption: "This Meeting Has Points: player cards and scores during a meeting",
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
    datePublished: "2025-07-10",
  };

  useGameHead({
    title: "This Meeting Has Points | So now you have a reason to pay attention.",
    ogTitle: "This Meeting Has Points",
    description: "So now you have a reason to pay attention.",
    path: "/meeting",
    ogImage: "https://kinda.fun/img/og-meeting.png",
    routeClass: "meeting",
    fonts: [
      "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap",
    ],
    jsonLd,
  });
</script>

<template>
  <div class="meeting-view">
    <Meeting />
  </div>
</template>
