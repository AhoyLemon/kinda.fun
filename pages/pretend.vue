<script setup>
import Pretend from '@/views/pretend/Pretend.vue'

// Disable SSR due to Firebase dependencies
definePageMeta({
  ssr: false
})

// SEO and meta tags
useHead({
  title: 'Pretend World | Kinda fun.',
  meta: [
    { name: 'description', content: 'The game of bad impersonations and good cheese logs. Guess who is impersonating whom at this cocktail party.' },
  ],
})
</script>

<template>
  <Pretend />
</template>
