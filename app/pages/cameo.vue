<script setup>
  // The game component carries its own template (Cameo.pug) and styles
  // (Cameo.scss). Firebase/toast usage inside it is client-guarded so the
  // title screen prerenders as real HTML.
  import Cameo from "@/views/cameo/Cameo.vue";

  // Cameo's SCSS expects "Big Shoulders Display" (displayFont) and "Open Sans"
  // (body). The global head only loads Inter/Lora for home + 404, so each game
  // page loads its own fonts — matching the per-page <head> model of the legacy
  // pug build (src/views/cameo/Page.pug).
  useHead({
    title: "Comparatively Famous | The game of relative celebrity value",
    meta: [
      { name: "description", content: "Sort celebrities by their listed value on Cameo." },
      { property: "og:title", content: "Comparatively Famous" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700&family=Open+Sans:wght@400;700&display=swap",
      },
    ],
  });
</script>

<template>
  <Cameo />
</template>
