<script setup>
import Sisyphus from '@/views/sisyphus/Sisyphus.vue'

// SEO and meta tags
useHead({
  title: 'Sisyphus Clicker | Kinda fun.',
  meta: [
    { name: 'description', content: 'This is a clicker-style game where you take on the role of sisyphus and push the rock uphill. You will never succeed.' },
  ],
})
</script>

<template lang="pug">
ClientOnly
  Sisyphus
  template(#fallback)
    .loading-state
      .loading-content
        h1 Sisyphus Clicker
        p Loading game...
</template>

<style lang="scss" scoped>
.loading-state {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2c3e50;
  
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
