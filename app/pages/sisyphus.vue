<script setup lang="ts">
  // Root component + full per-page <head>, migrated from src/views/sisyphus/Page.pug.
  import Sisyphus from "@/views/sisyphus/Sisyphus.vue";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Sisyphus Clicker",
    description: "Push a rock uphill as Sisyphus in a clicker game about an endlessly futile task.",
    keywords: "futile, futility, clicker, depressing, pointless, achievements, rock, the myth of sisyphus",
    url: "https://kinda.fun/sisyphus",
    image: "https://kinda.fun/img/og-sisyphus.png",
    playMode: "https://schema.org/SinglePlayer",
    applicationCategory: "GameApplication",
    gamePlatform: "web browser",
    operatingSystem: "Any",
    runtimePlatform: "Web browser",
    genre: "clicker",
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
        contentUrl: "https://kinda.fun/img/screenshots/sisyphus-01.png",
        caption: "Sisyphus Clicker: opening screen",
        width: 1600,
        height: 1000,
      },
      {
        "@type": "ImageObject",
        contentUrl: "https://kinda.fun/img/screenshots/sisyphus-02.png",
        caption: "Sisyphus Clicker: Sisyphus pushing the rock halfway up the hill",
        width: 1600,
        height: 1000,
      },
    ],
    datePublished: "2021-09-21",
  };

  useGameHead({
    title: "Sisyphus Clicker | Click on Sisyphus to push the rock up the mountain (formerly futile.fun)",
    ogTitle: "Sisyphus Clicker",
    description: "Click on Sisyphus to push the rock up the mountain (formerly futile.fun)",
    path: "/sisyphus",
    ogImage: "https://kinda.fun/img/og-sisyphus.png",
    // Match the legacy per-page viewport: disable zoom so rapid tapping in this
    // clicker doesn't trigger mobile double-tap zoom.
    noZoomViewport: true,
    routeClass: "sisyphus",
    fonts: ["https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,700|Poppins:400,400i,700"],
    favicons: [
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/sisyphus/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/sisyphus/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/sisyphus/favicon-16x16.png", key: "fav-16" },
      { rel: "mask-icon", href: "/img/sisyphus/safari-pinned-tab.svg", color: "#f9ca77", key: "fav-mask" },
      { rel: "shortcut icon", href: "/img/sisyphus/favicon.ico", key: "fav-shortcut" },
      { rel: "manifest", href: "/img/sisyphus/site.webmanifest" },
    ],
    jsonLd,
  });
</script>

<template>
  <div class="sisyphus-view">
    <Sisyphus />
  </div>
</template>
