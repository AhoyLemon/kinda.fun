# Vite → Nuxt: "where do I edit that now?"

A practical map for anyone who knew the **old** build (Vite multi-entry + Pug
MPA) and needs to find where things live in the **new** Nuxt 4 setup. If you're
looking for step-by-step "add a whole new game," see
[`new-game.md`](./new-game.md); this doc is the quick "I used to edit X, now
what?" reference.

## The mental-model shift

- **Before:** the site was a set of *separate single-page apps*. Each game had a
  full HTML document (`Page.pug`) and its own JS bundle entry
  (`src/entries/<game>.js`) that mounted the Vue app into that page. `vite.config.js`
  wired them together. Everything ran **in the browser**.
- **Now:** it's **one Nuxt app**. Each URL is a file in `app/pages/`, and Nuxt
  **statically prerenders** every route to real HTML at build time
  (`nuxi generate` → `.output/public`), then hydrates it in the browser. There's
  no per-game HTML document and no per-game entry file.

The single biggest consequence: **the initial render runs on the server (at build
time), where there is no `window`/`document`/Firebase.** That's why you'll see
`import.meta.client` guards (details below).

## Where things moved

| If you used to edit… | …now edit | Notes |
|---|---|---|
| `src/views/<game>/Page.pug` (title, meta, **favicons, og:image, canonical, theme-color, fonts**) | **`app/pages/<game>.vue`** → `useHead({...})` | This is the big one. See [Per-page `<head>`](#per-page-head). |
| Site-wide favicons / fonts / `<meta>` in every `Page.pug` | **`nuxt.config.ts`** → `app.head` | Global defaults; per-page `useHead` overrides them (favicons override by `key`). |
| `src/entries/<game>.js` (mount app, `.use(VueFire/Toast/Tippy)`) | **`app/plugins/*.client.ts`** | Registered once, globally. See [Plugins](#plugins). |
| `vite.config.js` `rollupOptions.input` (register a build entry) | **`app/pages/<game>.vue`** (auto-routed) + add the route to `nitro.prerender.routes` in `nuxt.config.ts` | File-based routing; no manual entry list. |
| `vite.config.js` dev-server middleware (`/slug` → `/slug.html`) | **Nuxt file routing** + `firebase.json` `cleanUrls` | Clean URLs are automatic now. |
| `vite.config.js` `resolve.alias` / `define` / `css.preprocessorOptions` | **`nuxt.config.ts`** (`alias`, `runtimeConfig`, `vite.css.preprocessorOptions`) | `@` → `src/` still works. |
| `VITE_FIREBASE_*` env vars | **`NUXT_PUBLIC_FIREBASE_*`** | `VITE_*` still read as a fallback (see `runtimeConfig` in `nuxt.config.ts`). |
| `src/views/404/Page.pug` | **`app/pages/[...slug].vue`** (+ `app/error.vue` runtime fallback) | A Nitro `prerender:generate` hook writes the prerendered `/not-found` page to `404.html`. |
| `src/views/home/` entry, dev at `/home.html` | **`app/pages/index.vue`**, dev at `/` | |
| `npm run dev:client` (Vite, `:5173/home.html`) | **`bun run dev`** (Nuxt, `http://localhost:3000/`) | |
| `npm run build:pages` / `build` → `dist/` | **`bun run build`** → `.output/public/` | `dist/` is gone. |
| **The game itself** — `src/views/<game>/*.vue`, `*.pug`, `*.scss`, `*.ts` | **unchanged** — still there | Gameplay, template, styles, and logic all still live in `src/views/<game>/`. Only the *wrapper/head/mount* moved. |
| Data tooling (`scripts/firebase/*`, `guillotine:*`) | **unchanged** | |

## Per-page `<head>`

Everything the old `Page.pug` `<head>` carried now lives in the route's
`app/pages/<game>.vue` via `useHead`. Look at `app/pages/cameo.vue` (branded
favicons + theme-color) and `app/pages/court.vue` (global favicons) as templates.

```vue
<script setup>
  import Cameo from "@/views/cameo/Cameo.vue";

  useHead({
    title: "Comparatively Famous | The Game of Celebrity Value",
    link: [
      { rel: "canonical", href: "https://kinda.fun/cameo" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=..." },
      // Branded favicons OVERRIDE the global ones via matching `key`s
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/famous/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/famous/favicon-32x32.png", key: "fav-32" },
      { rel: "mask-icon", href: "/img/famous/safari-pinned-tab.svg", color: "#1cb3ef", key: "fav-mask" },
    ],
    meta: [
      { name: "description", content: "The Game of Celebrity Value" },
      { name: "theme-color", content: "#3b1666" },
      { property: "og:title", content: "Comparatively Famous" },
      { property: "og:image", content: "https://kinda.fun/img/og-famous.png" },
      { property: "og:url", content: "https://kinda.fun/cameo" },
      // …og:type, og:description, og:image:width/height, og:email
    ],
  });
</script>

<template>
  <Cameo />
</template>
```

- **Site-wide defaults** (the favicons/fonts every page shared) live in
  `nuxt.config.ts` under `app.head`. A page's `useHead` **overrides** them.
- **Favicon override:** the global favicons are keyed (`fav-apple`, `fav-32`,
  `fav-16`, `fav-mask`). A game with its own branded set reuses the same `key`s
  so it **replaces** the global icon instead of emitting a duplicate.
- **`og:url`/`canonical`** are absolute (`https://kinda.fun/...`) so social
  scrapers resolve them.

## Global site config

`nuxt.config.ts` is the new home for what `vite.config.js` + the shared pug
partials used to do:

- `app.head` — site-wide `<meta>`, default favicons, preconnect + Inter/Lora fonts.
- `nitro.prerender.routes` — **every route must be listed here to be prerendered.**
- `alias` — `@` → `src/`.
- `runtimeConfig.public.firebase` — Firebase config from `NUXT_PUBLIC_FIREBASE_*`.
- `vite.css.preprocessorOptions.scss` — the SCSS deprecation silencing.

## Plugins

The old per-entry `createApp().use(VueFire).use(Toast).use(VueTippy)` is now
three global, **client-only** plugins (the `.client.ts` suffix means they never
run during prerender):

- `app/plugins/firebase.client.ts` — initializes Firebase + VueFire, optional
  emulator, anonymous sign-in.
- `app/plugins/toast.client.ts` — vue-toastification.
- `app/plugins/tippy.client.ts` — vue-tippy.

You rarely touch these; components just call `useToast()`, `useFirestore()`, or
use the `v-tippy` directive as before.

## SSR / prerender gotchas (this is new)

Because the initial render happens on the server at build time, anything that
touches the browser or Firebase must be **guarded** so it only runs on the
client. Patterns used throughout `src/views/*`:

```ts
// Firebase (VueFire has no app during prerender)
const db = import.meta.client ? useFirestore() : null;
const statsRef = db ? doc(db, "stats/cameo") : null;
// …and Firestore writes early-return on the server:
async function logSomething() { if (!db) return; /* … */ }

// Toasts (client-only). Use the CALLABLE stub if the game calls toast() directly:
const toast = import.meta.client ? useToast() : Object.assign(() => {}, { success() {}, error() {}, info() {}, warning() {} });

// window / document / localStorage
if (import.meta.client) { /* … */ }
// (code already inside onMounted or an event handler is client-only already — no guard needed)
```

Rule of thumb: **the initial/title screen must render with no browser or network
access.** Live data loads after hydration (`onMounted`, click handlers). The
`stats` dashboard is the clearest example — it prerenders a "Loading data…"
shell and fetches on mount.

## Routing, redirects, output

- **Add a route:** create `app/pages/<name>.vue` **and** add it to `ROUTES` in
  `scripts/verify/_routes.mjs` — `nuxt.config.ts` imports `PRERENDER_ROUTES` from
  there, so that single edit drives both the static output and the verify sweep.
- **Legacy `.html` URLs:** `firebase.json` 301-redirects `/<game>.html` →
  `/<game>`. The verify harness derives its redirect checks from `firebase.json`,
  so that's the only place to add them.
- **Build output:** `.output/public/<game>/index.html` (was `dist/<game>.html`).
- **404:** `app/pages/[...slug].vue` prerenders as `/not-found`; a Nitro
  `prerender:generate` hook (in `nuxt.config.ts`) writes it to
  `.output/public/404.html`.

## Verifying a change

- `bun run dev` — Nuxt dev server at `http://localhost:3000`.
- `bun run verify` (`--no-emulator` to skip the Firestore round-trip) — generates
  the site and drives every route headless: prerendered content, hydration,
  visible selector, **zero console errors**, and the `.html` → 301 redirects.
- `bun run typecheck` / `bun run lint` / `bun run test:run`.

If you add a route, add it to `ROUTES` in `scripts/verify/_routes.mjs` (that also
drives prerendering) so `verify` covers it.
