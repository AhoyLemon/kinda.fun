<script setup>
import NotFound from '@/views/404/NotFound.vue'

const error = useError()

// Determine if this is a 404 or another error
const is404 = computed(() => error.value?.statusCode === 404)
const isServerError = computed(() => error.value?.statusCode >= 500)

// SEO and meta tags
useHead({
  title: computed(() => is404.value ? '404 - Page Not Found | Kinda fun.' : 'Error | Kinda fun.'),
  meta: [
    { name: 'description', content: computed(() => is404.value ? 'This page does not exist. Try one of our games instead!' : 'An error occurred. Please try again.') },
    { property: 'og:title', content: computed(() => is404.value ? '404 - Page Not Found' : 'Error') },
  ],
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div v-if="is404">
      <NotFound />
    </div>
    <div v-else class="error-page">
      <div class="error-content">
        <h1>{{ error?.statusCode || 500 }}</h1>
        <h2>{{ error?.message || 'An error occurred' }}</h2>
        <p v-if="isServerError">Something went wrong on our end. Please try again later.</p>
        <p v-else>{{ error?.message }}</p>
        <button @click="handleError" class="btn btn-primary">Go Home</button>
      </div>
    </div>
  </NuxtLayout>
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
}

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
    margin: 1rem 0 2rem;
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
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
  }
}
</style>
