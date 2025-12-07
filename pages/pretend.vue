<script setup>
import Pretend from '@/views/pretend/Pretend.vue'

// SEO and meta tags
useHead({
  title: 'Pretend World | Kinda fun.',
  meta: [
    { name: 'description', content: 'The game of bad impersonations and good cheese logs. Guess who is impersonating whom at this cocktail party.' },
  ],
})
</script>

<template lang="pug">
ClientOnly
  Pretend
  template(#fallback)
    .loading-state
      .loading-content
        h1 Pretend World
        p Loading game...
</template>

<style lang="scss" scoped>
.loading-state {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  
  .loading-content {
    text-align: center;
    color: #333;
    
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
