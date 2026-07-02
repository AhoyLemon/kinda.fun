<script setup>
  // Root component + full per-page <head>, migrated from src/views/wrongest/Page.pug
  // (fonts, branded favicons, theme color, canonical, OpenGraph).
  import Wrongest from "@/views/wrongest/Wrongest.vue";

  useHead({
    title: "The Wrongest Words | A party game where you will defend some very stupid ideas.",
    link: [
      { rel: "canonical", href: "https://kinda.fun/wrongest" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;600&display=swap" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/wrongest/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/wrongest/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/wrongest/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/wrongest/favicon.ico", key: "fav-shortcut" },
    ],
    meta: [
      { name: "description", content: "A party game where you will defend some very stupid ideas." },
      { name: "theme-color", content: "#ef507a" },
      { name: "msapplication-TileColor", content: "#ef507a" },
      { property: "og:title", content: "The Wrongest Words" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "A party game where you will defend some very stupid ideas." },
      { property: "og:image", content: "https://kinda.fun/img/og-wrongest.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/wrongest" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
  });
</script>

<template>
  <Wrongest />
</template>
