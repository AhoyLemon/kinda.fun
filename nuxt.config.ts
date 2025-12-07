// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-12-07',
  
  // Enable devtools in development
  devtools: { enabled: true },
  
  // Nuxt 4 future compatibility flags
  future: {
    compatibilityVersion: 4,
  },

  // Runtime configuration for Firebase
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.VITE_FIREBASE_API_KEY || '',
      firebaseAuthDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      firebaseProjectId: process.env.VITE_FIREBASE_PROJECT_ID || 'kinda-fun-dev',
      firebaseStorageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      firebaseMessagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      firebaseAppId: process.env.VITE_FIREBASE_APP_ID || '',
      isDev: process.env.IS_DEV === 'true',
      isProd: process.env.IS_PROD === 'true',
      environment: process.env.ENVIRONMENT || 'unknown',
    }
  },

  // Path aliases
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },

  // CSS configuration
  css: [
    // Global reset and base styles
    './assets/scss/globals/_reset.scss',
    './assets/scss/globals/_z-index.scss',
    // Library overrides
    './assets/scss/libraries/vue_toastification.scss',
    // Tippy styles (needed for tooltips)
    'tippy.js/dist/tippy.css',
    // Toast notification styles
    'vue-toastification/dist/index.css',
  ],

  // Vite configuration
  vite: {
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'mixed-decls'],
          // Make SCSS variables/mixins available in all components
          additionalData: `
            @use "sass:math";
            @use "sass:color";
            @import "./assets/scss/globals/_variables.scss";
            @import "./assets/scss/globals/_mixins.scss";
            @import "./assets/scss/globals/_extends.scss";
          `
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    }
  },

  // Build configuration
  nitro: {
    preset: 'static',
    // Firebase hosting expects output in .output/public
    output: {
      dir: '.output',
      publicDir: '.output/public'
    },
    // Skip pre-rendering for pages that have browser-only dependencies
    prerender: {
      routes: [
        '/',
        '/stats',
        '/pretend', 
        '/guillotine',
        '/wrongest',
        '/404'
      ],
      ignore: [
        '/cameo',
        '/sisyphus',
        '/invalid',
        '/meeting',
        '/megachurch'
      ]
    }
  },

  // Static site generation
  ssr: true,

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Kinda Fun',
    }
  },

  // Modules
  modules: [],

  // Experimental features
  experimental: {
    payloadExtraction: true,
  },
})
