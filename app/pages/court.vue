<script setup>
  // Root component + full per-page <head>, migrated from src/views/court/Page.pug.
  import Court from "@/views/court/Court.vue";

  useHead({
    title: "Supreme Court: The Card Game | The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!",
    link: [
      { rel: "canonical", href: "https://kinda.fun/court" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,700|Poppins:400,400i,700" },
    ],
    meta: [
      { name: "description", content: "The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!" },
      { property: "og:title", content: "Supreme Court: The Card Game" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!" },
      { property: "og:image", content: "https://kinda.fun/img/og-court.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/court" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
  });
</script>

<template>
  <Court />
</template>
