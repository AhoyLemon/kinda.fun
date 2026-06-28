<script setup>
  // The game component carries its own template (Invalid.pug) and styles
  // (Invalid.scss). Firebase/toast usage inside it (and its composables) is
  // client-guarded so the title screen prerenders as real HTML.
  import Invalid from "@/views/invalid/Invalid.vue";

  // Invalid's SCSS expects "Big Shoulders", "Lora", and "Open Sans". The global
  // head only loads Inter/Lora for home + 404, so each game page loads its own
  // fonts — matching the per-page <head> model of the legacy pug build
  // (src/views/invalid/Page.pug).
  useHead({
    title: "Invalid",
    meta: [
      { name: "description", content: "A trivia game of unnecessary suffering." },
      { property: "og:title", content: "Invalid" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
      },
    ],
  });
</script>

<template>
  <Invalid />
</template>
