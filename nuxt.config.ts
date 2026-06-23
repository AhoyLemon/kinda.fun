import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityVersion: 4,
  ssr: true,

  // Static generation -> .output/public, served by Firebase Hosting.
  nitro: {
    prerender: {
      crawlLinks: false,
      // Routes are added here as each page is ported (vertical slice first).
      // "/not-found" renders the catch-all page; scripts/nuxt/finalize.mjs
      // copies it to the 404.html Firebase Hosting serves for unmatched routes
      // (rendering directly to "/404" collides with Nuxt's empty SPA fallback).
      routes: ["/", "/not-found"],
      failOnError: false,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "UTF-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap",
        },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#e5e828" },
      ],
    },
  },

  // Keep the legacy "@" alias pointing at the existing src/ tree so ported
  // pages can reuse shared SCSS, TS helpers, pug partials and game logic
  // without a mass file move during the slice phase.
  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
  },

  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || "",
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN || "",
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || "",
        storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET || "",
        messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
        appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID || "",
      },
      // When "true", the Firebase client plugin connects to the local
      // emulator suite instead of any live project. The verify harness
      // generates the site with this set.
      useEmulator: process.env.NUXT_PUBLIC_USE_EMULATOR || "",
      emulatorHost: process.env.NUXT_PUBLIC_EMULATOR_HOST || "127.0.0.1",
    },
  },

  typescript: {
    typeCheck: false,
  },

  devtools: { enabled: false },
});
