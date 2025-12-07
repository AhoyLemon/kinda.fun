<script setup>
import Megachurch from '@/views/megachurch/Megachurch.vue'

// SEO and meta tags
useHead({
  title: 'Megachurch Tycoon | Kinda fun.',
  meta: [
    { name: 'description', content: 'Turn their faith into your fortune. Starting with no money and a crippling drug addiction, Megachurch Tycoon will have you preaching to larger audiences.' },
  ],
})
</script>

<template lang="pug">
ClientOnly
  Megachurch
  template(#fallback)
    .loading-state
      .loading-content
        h1 Megachurch Tycoon
        p Loading game...
</template>

<style lang="scss" scoped>
.loading-state {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  
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
