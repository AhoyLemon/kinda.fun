<script setup>
const props = defineProps({
  error: Object
})

// SEO for error pages
useHead({
  title: props.error?.statusCode === 404 ? 'Page Not Found' : 'Server Error',
})

// Navigate to home page
const handleError = () => clearError({ redirect: '/' })
</script>

<template lang="pug">
div.error-page(v-if="error")
  template(v-if="error.statusCode === 404")
    .error-content
      h1 404
      h2 Page Not Found
      p The page you're looking for doesn't exist.
      button.button(@click="handleError") Go Home
  template(v-else)
    .error-content
      h1 {{ error.statusCode || '500' }}
      h2 Server Error
      p Something went wrong.
      button.button(@click="handleError") Go Home
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.error-content {
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
    opacity: 0.9;
  }
  
  .button {
    display: inline-block;
    padding: 1rem 2rem;
    background: white;
    color: #667eea;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
