<script setup>
  // The game component carries its own template (Meeting.pug) and styles
  // (Meeting.scss). Firebase/toast usage inside it is client-guarded so the
  // initial landing screen (create/join a meeting) prerenders as real HTML.
  import Meeting from "@/views/meeting/Meeting.vue";

  // Meeting's SCSS expects Montserrat (sans-serif), Source Code Pro (monospace)
  // and Vollkorn (serif). The global head only loads Inter/Lora for home + 404,
  // so each game page loads its own fonts — matching the per-page <head> model
  // of the legacy pug build (src/views/meeting/Page.pug). The href keeps a
  // literal "&" (not "&amp;") so the Google Fonts query parameters parse.
  useHead({
    title: "This Meeting Has Points | So now you have a reason to pay attention.",
    meta: [
      { name: "description", content: "So now you have a reason to pay attention." },
      { property: "og:title", content: "This Meeting Has Points" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap",
      },
    ],
  });
</script>

<template>
  <Meeting />
</template>
