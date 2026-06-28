<script setup>
  // The game component carries its own template (Sisyphus.pug) and styles
  // (Sisyphus.scss). Firebase/toast usage inside it is client-guarded so the
  // title screen prerenders as real HTML.
  import Sisyphus from "@/views/sisyphus/Sisyphus.vue";

  // Sisyphus's SCSS expects "Crimson Text" and "Poppins". The global head only
  // loads Inter/Lora for home + 404, so each game page loads its own fonts —
  // matching the per-page <head> model of the legacy pug build
  // (src/views/sisyphus/Page.pug).
  useHead({
    title: "Sisyphus Clicker",
    meta: [
      { name: "description", content: "Click on Sisyphus to push the rock up the mountain (formerly futile.fun)" },
      { property: "og:title", content: "Sisyphus Clicker" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,700|Poppins:400,400i,700",
      },
    ],
  });
</script>

<template>
  <Sisyphus />
</template>
