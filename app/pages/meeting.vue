<script setup>
  // Root component + full per-page <head>, migrated from src/views/meeting/Page.pug.
  import Meeting from "@/views/meeting/Meeting.vue";

  useHead({
    title: "This Meeting Has Points | So now you have a reason to pay attention.",
    link: [
      { rel: "canonical", href: "https://kinda.fun/meeting" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap" },
    ],
    meta: [
      { name: "description", content: "So now you have a reason to pay attention." },
      { property: "og:title", content: "This Meeting Has Points" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "So now you have a reason to pay attention." },
      { property: "og:image", content: "https://kinda.fun/img/og-meeting.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/meeting" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
  });
</script>

<template>
  <Meeting />
</template>
