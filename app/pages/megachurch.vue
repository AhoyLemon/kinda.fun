<script setup>
  // The game component carries its own template (Megachurch.pug) and styles
  // (Megachurch.scss). Firebase/toast usage inside it (and its ~15 child
  // components) is client-guarded so the title screen prerenders as real HTML.
  import Megachurch from "@/views/megachurch/Megachurch.vue";

  // Megachurch's SCSS expects "Bitter" and "Commissioner". The global head only
  // loads Inter/Lora for home + 404, so each game page loads its own fonts —
  // matching the per-page <head> model of the legacy pug build
  // (src/views/megachurch/Page.pug).
  useHead({
    title: "Megachurch Tycoon",
    meta: [
      { name: "description", content: "Turn their faith into your fortune, one scam at a time." },
      { property: "og:title", content: "Megachurch Tycoon" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Commissioner:wght@100..900&display=swap",
      },
    ],
  });
</script>

<template>
  <Megachurch />
</template>
