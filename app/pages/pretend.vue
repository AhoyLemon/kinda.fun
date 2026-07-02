<script setup>
  // Root component + full per-page <head>, migrated from src/views/pretend/Page.pug.
  import Pretend from "@/views/pretend/Pretend.vue";

  useHead({
    title: "Pretend World | You are at a party of celebrity impersonators...",
    link: [
      { rel: "canonical", href: "https://kinda.fun/pretend" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Limelight|Merriweather:400,400i,900" },
    ],
    meta: [
      { name: "description", content: "You are at a party of celebrity impersonators..." },
      { property: "og:title", content: "Pretend World" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "You are at a party of celebrity impersonators..." },
      { property: "og:image", content: "https://kinda.fun/img/og-pretend.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/pretend" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
  });
</script>

<template>
  <Pretend />
</template>
