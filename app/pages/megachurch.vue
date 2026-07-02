<script setup>
  // Root component + full per-page <head>, migrated from src/views/megachurch/Page.pug
  // (fonts, branded favicons; OpenGraph added from the page's og consts).
  import Megachurch from "@/views/megachurch/Megachurch.vue";

  useHead({
    title: "Megachurch Tycoon | Turn their faith into your fortune, one scam at a time.",
    link: [
      { rel: "canonical", href: "https://kinda.fun/megachurch" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Commissioner:wght@100..900&display=swap" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/megachurch/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/megachurch/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/megachurch/favicon-16x16.png", key: "fav-16" },
      { rel: "shortcut icon", href: "/img/megachurch/favicon.ico", key: "fav-shortcut" },
    ],
    meta: [
      { name: "description", content: "Turn their faith into your fortune, one scam at a time." },
      { property: "og:title", content: "Megachurch Tycoon" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Turn their faith into your fortune, one scam at a time." },
      { property: "og:image", content: "https://kinda.fun/img/og-megachurch.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/megachurch" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
  });
</script>

<template>
  <Megachurch />
</template>
