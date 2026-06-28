<script setup>
  // The game component carries its own template (Guillotine.pug) and styles
  // (Guillotine.scss). Firebase usage inside it is client-guarded so the
  // title screen prerenders as real HTML.
  import Guillotine from "@/views/guillotine/Guillotine.vue";

  // Guillotine's SCSS expects "Red Hat Text". The global head only loads
  // Inter/Lora for home + 404, so each game page loads its own fonts —
  // matching the per-page <head> model of the legacy pug build
  // (src/views/guillotine/Page.pug).
  useHead({
    title: "No More Billionaires | Generating wealth with a guillotine.",
    meta: [
      { name: "description", content: "Generating wealth with a guillotine." },
      { property: "og:title", content: "No More Billionaires" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@300..700&display=swap",
      },
    ],
  });
</script>

<template>
  <Guillotine />
</template>
