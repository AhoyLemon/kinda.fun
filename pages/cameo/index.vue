<script setup>
import Cameo from '@/views/cameo/Cameo.vue'

// Disable SSR for this page due to browser-only dependencies
definePageMeta({
  ssr: false
})

// SEO and meta tags
useHead({
  title: 'Comparatively Famous | Kinda fun.',
  meta: [
    { name: 'description', content: 'Sort celebrities by their listed value on Cameo. The game of relative celebrity value.' },
  ],
})
</script>

<template>
  <Cameo />
</template>
