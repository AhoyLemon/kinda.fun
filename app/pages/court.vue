<script setup>
  // The game component carries its own template (Court.pug) and styles
  // (Court.scss). Toast/Firestore usage inside it is client-guarded so the
  // title screen prerenders as real HTML.
  import Court from "@/views/court/Court.vue";

  // Court's SCSS expects "Crimson Text" and "Poppins". The global head only
  // loads Inter/Lora for home + 404, so each game page loads its own fonts —
  // matching the per-page <head> model of the legacy pug build
  // (src/views/court/Page.pug).
  useHead({
    title: "Supreme Court: The Card Game",
    meta: [
      {
        name: "description",
        content: "The single player game about meddling with the law. Because if justice isn't fair, at least it should be fun!",
      },
      { property: "og:title", content: "Supreme Court: The Card Game" },
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
  <Court />
</template>
