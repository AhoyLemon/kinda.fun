<script setup>
import Megachurch from '@/views/megachurch/Megachurch.vue'

// Disable SSR for this page due to browser-only dependencies
definePageMeta({
  ssr: false
})

// SEO and meta tags
useHead({
  title: 'Megachurch Tycoon | Kinda fun.',
  meta: [
    { name: 'description', content: 'Turn their faith into your fortune. Starting with no money and a crippling drug addiction, Megachurch Tycoon will have you preaching to larger audiences.' },
  ],
})
</script>

<template>
  <Megachurch />
</template>
