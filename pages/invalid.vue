<script setup>
import Invalid from '@/views/invalid/Invalid.vue'

// Disable SSR for this page due to browser-only dependencies
definePageMeta({
  ssr: false
})

// SEO and meta tags
useHead({
  title: 'Invalid | Kinda fun.',
  meta: [
    { name: 'description', content: 'A trivia game of unnecessary suffering. A multiplayer competitive trivia game best with 3-7 players.' },
  ],
})
</script>

<template>
  <Invalid />
</template>
