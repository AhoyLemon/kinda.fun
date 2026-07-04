import { fileURLToPath } from "node:url";
import { defineNuxtConfig } from "nuxt/config";
// Single route manifest (also drives the verify harness). Adding a route there
// prerenders it here too.
import { PRERENDER_ROUTES } from "./scripts/verify/_routes.mjs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 4 defaults to compatibility version 4, so no top-level
  // `compatibilityVersion` key is needed (it isn't a valid top-level option —
  // it lives under `future` — which is why it tripped the type-checker).
  // Pin Nitro's compatibility date so builds are reproducible and the
  // "using fallback date" warning goes away.
  compatibilityDate: "2026-06-27",
  ssr: true,

  // Styled "server ready" banner for `bun run dev`. The `listen` hook only
  // fires for the dev server, so this never runs during build/generate.
  hooks: {
    async listen(_server, listener) {
      const { printDevBanner } = await import("./scripts/nuxt/_devBanner.mjs");
      printDevBanner(listener?.url);
    },
  },

  // Static generation -> .output/public, served by Firebase Hosting.
  nitro: {
    prerender: {
      // Home's game links are behind interaction (not static <a href>), so
      // crawling can't discover the routes — drive them from the manifest.
      // "/not-found" renders the catch-all page (app/pages/[...slug].vue, which
      // returns 200 so it prerenders); the prerender:generate hook below writes
      // that render to 404.html (Nitro reserves its own /404.html as an empty
      // SPA-fallback shell, so we can't prerender straight to that filename).
      crawlLinks: false,
      routes: PRERENDER_ROUTES,
      // Fail the build if any route errors during prerender, so a broken page
      // can never ship silently as a 404.
      failOnError: true,
    },
    hooks: {
      // Emit the prerendered /not-found HTML as 404.html directly, so Firebase
      // Hosting serves real 404 content for unmatched routes with no post-build
      // copy step. Runs after Nitro's own empty 404.html shell is written, so
      // this fires last and wins.
      "prerender:generate"(route) {
        if (route.route === "/not-found" && route.contents) {
          route.fileName = "404.html";
        }
      },
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
        // Preconnect helps every page that pulls Google fonts. The Inter/Lora
        // stylesheet itself is only used by the home page, so it lives in
        // index.vue's useGameHead (fonts) rather than loading site-wide.
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
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

  vite: {
    // Pre-bundle the client-plugin deps so Vite doesn't discover them at
    // runtime mid-session (which forces a dev page reload).
    optimizeDeps: {
      include: ["firebase/app", "firebase/auth", "firebase/firestore", "vue-tippy", "vuefire"],
    },
    // The SCSS was migrated to @use / @forward (#286), so there are no Sass
    // deprecation warnings to silence — the build stays quiet on its own.
  },

  typescript: {
    typeCheck: false,
  },

  devtools: { enabled: false },
});
