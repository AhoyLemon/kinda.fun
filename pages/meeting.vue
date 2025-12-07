<script setup>
import Meeting from '@/views/meeting/Meeting.vue'

// Disable SSR for this page due to browser-only dependencies
definePageMeta({
  ssr: false
})

// SEO and meta tags
useHead({
  title: 'This Meeting Has Points | Kinda fun.',
  meta: [
    { name: 'description', content: 'A multiplayer game meant to be played while having a meeting about something else. Gather 2 to 6 people to slip their cards into conversation.' },
  ],
})
</script>

<template>
  <Meeting />
</template>
