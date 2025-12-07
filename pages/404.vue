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
.NotFoundPage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  
  .container {
    max-width: 800px;
    width: 100%;
  }
  
  .not-found-content {
    text-align: center;
    color: white;
    
    .error-number {
      font-size: 8rem;
      font-weight: bold;
      margin: 0;
      line-height: 1;
    }
    
    .error-message {
      font-size: 2rem;
      margin: 1rem 0 3rem;
    }
    
    .navigation-options {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 3rem;
      
      .btn {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.2s;
        
        &.btn-primary {
          background: white;
          color: #667eea;
        }
        
        &.btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
        }
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
      }
    }
    
    .quick-links {
      h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
      
      .game-links {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        
        .game-link {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          text-decoration: none;
          border-radius: 4px;
          transition: all 0.2s;
          
          &:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
          }
        }
      }
    }
  }
}
</style>
