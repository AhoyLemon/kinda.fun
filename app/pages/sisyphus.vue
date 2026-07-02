<script setup>
  // Root component + full per-page <head>, migrated from src/views/sisyphus/Page.pug
  // (fonts, branded favicons, canonical, OpenGraph).
  import Sisyphus from "@/views/sisyphus/Sisyphus.vue";

  // JSON-LD (VideoGame) ported from src/views/sisyphus/pug/_schema.pug.
  const lastUpdated = new Date().toISOString();

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: "Sisyphus Clicker",
    description: "Click on Sisyphus to push the rock up the mountain (formerly futile.fun)",
    keywords: "futile, futility, clicker, depressing, pointless, achievements, rock, the myth of sisyphus",
    url: "https://kinda.fun/sisyphus",
    image: "https://kinda.fun/img/og-sisyphus.png",
    playMode: "SinglePlayer",
    applicationCategory: "browser game",
    gamePlatform: "web browser",
    operatingSystem: "web browser",
    genre: "clicker",
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
    offers: {
      "@type": "Offer",
      description: "free",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
    screenshot: [
      { "@type": "ImageObject", url: "https://kinda.fun/img/sisyphus/screenshots/ss1.png", width: 1083, height: 924 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/sisyphus/screenshots/ss2.png", width: 1083, height: 924 },
      { "@type": "ImageObject", url: "https://kinda.fun/img/sisyphus/screenshots/ss3.png", width: 1083, height: 924 },
    ],
    datePublished: "2021-09-21",
    dateModified: lastUpdated,
  };

  useHead({
    title: "Sisyphus Clicker | Click on Sisyphus to push the rock up the mountain (formerly futile.fun)",
    link: [
      { rel: "canonical", href: "https://kinda.fun/sisyphus" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,700|Poppins:400,400i,700" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/sisyphus/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/sisyphus/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/sisyphus/favicon-16x16.png", key: "fav-16" },
      { rel: "mask-icon", href: "/img/sisyphus/safari-pinned-tab.svg", color: "#f9ca77", key: "fav-mask" },
      { rel: "shortcut icon", href: "/img/sisyphus/favicon.ico", key: "fav-shortcut" },
      { rel: "manifest", href: "/img/sisyphus/site.webmanifest" },
    ],
    meta: [
      // Match the legacy per-page viewport: disable zoom so rapid tapping in this
      // clicker doesn't trigger mobile double-tap zoom. (Overrides the global viewport.)
      { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
      { name: "description", content: "Click on Sisyphus to push the rock up the mountain (formerly futile.fun)" },
      { property: "og:title", content: "Sisyphus Clicker" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Click on Sisyphus to push the rock up the mountain (formerly futile.fun)" },
      { property: "og:image", content: "https://kinda.fun/img/og-sisyphus.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/sisyphus" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) },
    ],
  });
</script>

<template>
  <Sisyphus />
</template>
