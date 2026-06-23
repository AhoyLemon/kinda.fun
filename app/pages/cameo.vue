<script setup>
  // The game component carries its own template (Cameo.pug) and styles
  // (Cameo.scss). Firebase/toast usage inside it is client-guarded so the
  // title screen prerenders as real HTML.
  import Cameo from "@/views/cameo/Cameo.vue";

  useHead({
    title: "Comparatively Famous | The game of relative celebrity value",
    meta: [
      { name: "description", content: "Sort celebrities by their listed value on Cameo." },
      { property: "og:title", content: "Comparatively Famous" },
    ],
  });
</script>

<template>
  <Cameo />
</template>
