<template>
  <div class="test-page">
    <h1>Nuxt 4 Migration Test</h1>
    <p>If you can see this, Nuxt is working!</p>
  </div>
</template>

<script setup>
useHead({
  title: 'Test Page - Kinda Fun',
})
</script>

<style scoped>
.test-page {
  padding: 2rem;
  text-align: center;
}
h1 {
  color: #42b983;
}
</style>
