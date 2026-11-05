<script setup lang="ts">
  // Root component + full per-page <head>, migrated from the legacy
  // src/views/cameo/Page.pug (fonts, branded favicons, theme color, canonical,
  // OpenGraph). Firebase/toast usage inside the component is client-guarded so
  // the title screen prerenders as real HTML.
  import Cameo from "@/views/cameo/Cameo.vue";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Comparatively Famous",
    url: "https://kinda.fun/cameo",
    image: "https://kinda.fun/img/og-famous.png",
    keywords: "comedy game, celebrity, sorting, cameo, famous people, kinda fun games",
    playMode: "https://schema.org/SinglePlayer",
    applicationCategory: "GameApplication",
    gamePlatform: "web browser",
    operatingSystem: "Any",
    runtimePlatform: "Web browser",
    genre: "comedy",
    description: "Sort celebrities by the price of their Cameo videos and guess their value.",
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
        contentUrl: "https://kinda.fun/img/screenshots/cameo-01.png",
        caption: "Comparatively Famous: opening screen",
        width: 1600,
        height: 1000,
      },
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/cameo-02.png",
        caption: "Comparatively Famous: third round with celebrity cards on both sides",
        width: 1600,
        height: 1000,
      },
    ],
    datePublished: "2021-02-16",
  };

  useGameHead({
    title: "Comparatively Famous | The Game of Celebrity Value",
    ogTitle: "Comparatively Famous",
    description: "The Game of Celebrity Value",
    path: "/cameo",
    ogImage: "https://kinda.fun/img/og-famous.png",
    themeColor: "#3b1666",
    routeClass: "cameo",
    fonts: ["https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700&family=Open+Sans:wght@400;700&display=swap"],
    favicons: [
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/famous/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/famous/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/famous/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/famous/favicon.ico", key: "fav-shortcut" },
      { rel: "mask-icon", href: "/img/famous/safari-pinned-tab.svg", color: "#1cb3ef", key: "fav-mask" },
    ],
    jsonLd,
  });
</script>

<template>
  <div class="cameo-view">
    <Cameo />
  </div>
</template>
