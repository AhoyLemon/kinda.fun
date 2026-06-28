<script setup>
  // The game component carries its own template (Pretend.pug) and styles
  // (Pretend.scss). Firebase usage inside it is client-guarded so the
  // title screen prerenders as real HTML.
  import Pretend from "@/views/pretend/Pretend.vue";

  // Pretend's SCSS expects "Limelight" and "Merriweather". The global head only
  // loads Inter/Lora for home + 404, so each game page loads its own fonts —
  // matching the per-page <head> model of the legacy pug build
  // (src/views/pretend/Page.pug).
  useHead({
    title: "Pretend World | You are at a party of celebrity impersonators...",
    meta: [
      { name: "description", content: "You are at a party of celebrity impersonators..." },
      { property: "og:title", content: "Pretend World" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Limelight|Merriweather:400,400i,900",
      },
    ],
  });
</script>

<template>
  <Pretend />
</template>
