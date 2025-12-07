<script setup>
import NotFound from '@/views/404/NotFound.vue'

const error = useError()

// SEO and meta tags
useHead({
  title: '404 - Page Not Found | Kinda fun.',
  meta: [
    { name: 'description', content: 'This page does not exist. Try one of our games instead!' },
    { property: 'og:title', content: '404 - Page Not Found' },
  ],
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <NotFound />
  </NuxtLayout>
</template>
