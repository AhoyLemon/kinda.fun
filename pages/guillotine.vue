<script setup>
import Guillotine from '@/views/guillotine/Guillotine.vue'

// SEO and meta tags
useHead({
  title: 'No More Billionaires | Kinda fun.',
  meta: [
    { name: 'description', content: 'A single player game about funding public schools by executing the world\'s richest people. Generating wealth with a guillotine!' },
  ],
})
</script>

<template>
  <Guillotine />
</template>
