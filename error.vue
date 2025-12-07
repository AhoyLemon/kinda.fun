<script setup lang="ts">
import NotFound from '@/views/404/NotFound.vue'

const error = useError()

// Determine if this is a 404 or another error
const is404 = computed(() => error.value?.statusCode === 404)
const errorMessage = computed(() => error.value?.message || 'An unexpected error occurred')

// SEO and meta tags
useHead({
  title: computed(() => is404.value ? '404 - Page Not Found | Kinda fun.' : '500 - Server Error | Kinda fun.'),
  meta: [
    { name: 'description', content: computed(() => is404.value ? 'This page does not exist. Try one of our games instead!' : 'Something went wrong. Please try again later.') },
  ],
})

const goHome = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div>
    <NotFound v-if="is404" />
    <main v-else class="error-page server-error">
      <div class="error-content">
        <h1>{{ error?.statusCode || 500 }}</h1>
        <h2>Server Error</h2>
        <p>{{ errorMessage }}</p>
        <p>Something went wrong on our end. Please try again later.</p>
        <button class="btn btn-primary" @click="goHome">Go Home</button>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  
  .error-content {
    text-align: center;
    max-width: 600px;
    
    h1 {
      font-size: 6rem;
      margin: 0;
      font-weight: bold;
    }
    
    h2 {
      font-size: 2rem;
      margin: 1rem 0;
    }
    
    p {
      font-size: 1.2rem;
      margin: 1rem 0;
      
      &:last-of-type {
        margin-bottom: 2rem;
      }
    }
    
    .btn {
      padding: 0.75rem 2rem;
      font-size: 1.1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background: white;
      color: #667eea;
      font-weight: bold;
      transition: all 0.2s;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
    }
  }
}
</style>

