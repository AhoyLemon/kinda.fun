<script setup>
import Sisyphus from '@/views/sisyphus/Sisyphus.vue'

// Disable SSR for this page due to browser-only dependencies
definePageMeta({
  ssr: false
})

// SEO and meta tags
useHead({
  title: 'Sisyphus Clicker | Kinda fun.',
  meta: [
    { name: 'description', content: 'This is a clicker-style game where you take on the role of sisyphus and push the rock uphill. You will never succeed.' },
  ],
})
</script>

<template>
  <Sisyphus />
</template>
