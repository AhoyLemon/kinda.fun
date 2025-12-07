<script setup>
import { ref, onMounted } from "vue";

// SEO and meta tags
useHead({
  title: '404 - Page Not Found | Kinda fun.',
  meta: [
    { name: 'description', content: 'This page does not exist. Try one of our games instead!' },
    { property: 'og:title', content: '404 - Page Not Found' },
  ],
})

const currentUrl = ref('');
const baseURL = import.meta.client ? `${window.location.protocol}//${window.location.host}` : 'https://kinda.fun';

const goHome = () => {
  if (import.meta.client) {
    window.location.href = baseURL;
  }
};

const goBack = () => {
  if (import.meta.client) {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      goHome();
    }
  }
};

const visitLemon = () => {
  if (import.meta.client) {
    window.location.href = "https://ahoylemon.xyz";
  }
};

onMounted(() => {
  if (import.meta.client) {
    currentUrl.value = window.location.href;
    // Log the 404 for analytics if needed
    console.log("404 - Page not found:", window.location.pathname);
  }
});
</script>

<template lang="pug">
.NotFoundPage
  .container
    .not-found-content
      .error-number 404
      .error-message Page Not Found
      
      .navigation-options
        button.btn.btn-primary(@click="goBack") ⬅️ Go Back
        button.btn.btn-secondary(@click="goHome") 🏠 Home
        button.btn.btn-secondary(@click="visitLemon") 🍋 ahoylemon.xyz
        
      .quick-links
        h3 Or try one of these games:
        .game-links
          a(href="/invalid" class="game-link") Invalid
          a(href="/meeting" class="game-link") This Meeting Has Points  
          a(href="/guillotine" class="game-link") No More Billionaires
          a(href="/pretend" class="game-link") Pretend World
          a(href="/cameo" class="game-link") Comparatively Famous
</template>

<style lang="scss" scoped>
@import '@/views/404/NotFound.scss';
</style>
