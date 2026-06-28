<script setup>
  // The game component carries its own template (Wrongest.pug) and styles
  // (Wrongest.scss). Firebase/VueFire usage inside it is client-guarded so the
  // title screen (create/join a room) prerenders as real HTML.
  import Wrongest from "@/views/wrongest/Wrongest.vue";

  // Wrongest's SCSS expects "Comfortaa". The global head only loads Inter/Lora
  // for home + 404, so each game page loads its own fonts — matching the
  // per-page <head> model of the legacy pug build
  // (src/views/wrongest/Page.pug).
  useHead({
    title: "The Wrongest Words | A party game where you will defend some very stupid ideas.",
    meta: [
      { name: "description", content: "A party game where you will defend some very stupid ideas." },
      { property: "og:title", content: "The Wrongest Words" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;600&display=swap",
      },
    ],
  });
</script>

<template>
  <Wrongest />
</template>
