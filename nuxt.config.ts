import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityVersion: 4,
  // Pin Nitro's compatibility date so builds are reproducible and the
  // "using fallback date" warning goes away.
  compatibilityDate: "2026-06-27",
  ssr: true,

  // Static generation -> .output/public, served by Firebase Hosting.
  nitro: {
    prerender: {
      crawlLinks: false,
      // Routes are added here as each page is ported (vertical slice first).
      // "/not-found" renders the catch-all page; scripts/nuxt/finalize.mjs
      // copies it to the 404.html Firebase Hosting serves for unmatched routes
      // (rendering directly to "/404" collides with Nuxt's empty SPA fallback).
      // Phase B single-player games: court, guillotine, megachurch, sisyphus, pretend.
      // Phase B multiplayer games: invalid, meeting, wrongest.
      // Phase B stats dashboard: prerenders a loading shell, hydrates with data.
      routes: ["/", "/cameo", "/not-found", "/court", "/guillotine", "/megachurch", "/sisyphus", "/pretend", "/invalid", "/meeting", "/wrongest", "/stats"],
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
        // Site-wide default favicons. Keyed so game pages with their own branded
        // favicons override (rather than duplicate) these via the same key.
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png", key: "fav-apple" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png", key: "fav-32" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png", key: "fav-16" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#e5e828", key: "fav-mask" },
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

  // vue-toastification ships CommonJS; transpile so SSR/prerender can resolve
  // its named exports (e.g. useToast, POSITION) without ESM interop errors.
  build: {
    transpile: ["vue-toastification"],
  },

  // The legacy SCSS still relies on @import, global Sass built-ins, and legacy
  // color functions. Silence those deprecation warnings here so the build stays
  // quiet. The proper fix (migrate the SCSS to @use / @forward) is tracked in
  // its own issue (#286) and should land before/with this migration.
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ["import", "global-builtin", "color-functions"],
        },
      },
    },
  },

  typescript: {
    typeCheck: false,
  },

  devtools: { enabled: false },
});
