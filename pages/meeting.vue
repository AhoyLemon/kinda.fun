<script setup>
import Meeting from '@/views/meeting/Meeting.vue'

// SEO and meta tags
useHead({
  title: 'This Meeting Has Points | Kinda fun.',
  meta: [
    { name: 'description', content: 'A multiplayer game meant to be played while having a meeting about something else. Gather 2 to 6 people to slip their cards into conversation.' },
  ],
})
</script>

<template lang="pug">
ClientOnly
  Meeting
  template(#fallback)
    .loading-state
      .loading-content
        h1 This Meeting Has Points
        p Loading game...
</template>

<style lang="scss" scoped>
.loading-state {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  
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
