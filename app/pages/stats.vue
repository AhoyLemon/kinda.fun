<script setup>
  // The stats dashboard carries its own template (Stats.pug) and styles
  // (Stats.scss). It is Firestore-backed: the initial render is a loading shell
  // (sidebar + "Loading data…") that prerenders as real HTML, and onMounted
  // fetches the live data on the client. Firebase is client-guarded inside the
  // component so the shell prerenders without a VueFire app.
  import Stats from "@/views/stats/Stats.vue";

  // Stats' SCSS expects "Fira Code", "Lora", and "Noto Sans". The global head
  // only loads Inter/Lora for home + 404, so this page loads its own fonts —
  // matching the per-page <head> model of the legacy pug build
  // (src/views/stats/Page.pug).
  useHead({
    title: "Kinda Fun Stats | Let's see what people are playing.",
    meta: [
      { name: "description", content: "Let's see what people are playing." },
      { property: "og:title", content: "Kinda Fun Stats" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Lora:ital,wght@0,400..700;1,400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap",
      },
    ],
  });
</script>

<template>
  <Stats />
</template>
