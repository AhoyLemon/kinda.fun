<script setup>
import Invalid from '@/views/invalid/Invalid.vue'

// SEO and meta tags
useHead({
  title: 'Invalid | Kinda fun.',
  meta: [
    { name: 'description', content: 'A trivia game of unnecessary suffering. A multiplayer competitive trivia game best with 3-7 players.' },
  ],
})
</script>

<template lang="pug">
ClientOnly
  Invalid
  template(#fallback)
    .loading-state
      .loading-content
        h1 Invalid
        p Loading game...
</template>

<style lang="scss" scoped>
.loading-state {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  
  .loading-content {
    text-align: center;
    color: white;
    
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.5rem;
      opacity: 0.8;
    }
  }
}
</style>
