// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-08',
  
  devtools: { enabled: true },
  
  // SSR enabled by default for all pages
  ssr: true,
  
  // Runtime configuration for Firebase and other env vars
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.VITE_FIREBASE_API_KEY || '',
      firebaseAuthDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      firebaseProjectId: process.env.VITE_FIREBASE_PROJECT_ID || 'kinda-fun-dev',
      firebaseStorageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      firebaseMessagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      firebaseAppId: process.env.VITE_FIREBASE_APP_ID || '',
      appUrl: process.env.VITE_APP_URL || 'https://kinda.fun',
    }
  },
  
  // Configure path aliases (same as Vite config)
  alias: {
    '@': '/src',
  },
  
  // Global CSS and SCSS
  css: [
    '~/assets/scss/global.scss',
  ],
  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Make SCSS variables and mixins available globally
          additionalData: `
            @import "~/assets/scss/_variables.scss";
            @import "~/assets/scss/_mixins.scss";
          `,
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'mixed-decls'],
        },
      },
    },
  },
  
  // Nitro configuration for static site generation
  nitro: {
    preset: 'static',
    output: {
      dir: '.output',
      publicDir: '.output/public',
    },
  },
  
  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  
  // Build configuration
  build: {
    transpile: ['firebase', 'vuefire'],
  },
  
  // Modules (none for now, but can add later)
  modules: [],
})
