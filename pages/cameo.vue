<script setup>
import Cameo from '@/views/cameo/Cameo.vue'

// SEO and meta tags
useHead({
  title: 'Comparatively Famous | Kinda fun.',
  meta: [
    { name: 'description', content: 'Sort celebrities by their listed value on Cameo. The game of relative celebrity value.' },
  ],
})
</script>

<template lang="pug">
ClientOnly
  Cameo
  template(#fallback)
    .loading-state
      .loading-content
        h1 Comparatively Famous
        p Loading game...
</template>

<style lang="scss" scoped>
.loading-state {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
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
