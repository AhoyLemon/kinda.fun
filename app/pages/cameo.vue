<script setup>
  // Root component + full per-page <head>, migrated from the legacy
  // src/views/cameo/Page.pug (fonts, branded favicons, theme color, canonical,
  // OpenGraph). Firebase/toast usage inside the component is client-guarded so
  // the title screen prerenders as real HTML.
  import Cameo from "@/views/cameo/Cameo.vue";

  useHead({
    title: "Comparatively Famous | The Game of Celebrity Value",
    link: [
      { rel: "canonical", href: "https://kinda.fun/cameo" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700&family=Open+Sans:wght@400;700&display=swap" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/famous/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/famous/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/famous/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/famous/favicon.ico", key: "fav-shortcut" },
      { rel: "mask-icon", href: "/img/famous/safari-pinned-tab.svg", color: "#1cb3ef", key: "fav-mask" },
    ],
    meta: [
      { name: "description", content: "The Game of Celebrity Value" },
      { name: "theme-color", content: "#3b1666" },
      { name: "msapplication-TileColor", content: "#3b1666" },
      { property: "og:title", content: "Comparatively Famous" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "The Game of Celebrity Value" },
      { property: "og:image", content: "https://kinda.fun/img/og-famous.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/cameo" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
  });
</script>

<template>
  <Cameo />
</template>
