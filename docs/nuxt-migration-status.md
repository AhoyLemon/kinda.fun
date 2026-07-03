# Nuxt 4 Migration — Status (issue #128)

Branch: `refactor_128--nuxt-4`. Executes `docs/nuxt-migration-plan.md`.
**Status: complete** — every route is ported and green; the legacy Vite/pug
build has been removed.

## Architecture

- Nuxt 4 with the default `app/` directory. A legacy `@` alias still points at
  `src/` so pages reuse the existing SCSS, pug templates, and TS helpers without
  a mass file move.
- Static generation (`nuxi generate` → `.output/public`), served by Firebase
  Hosting (`firebase.json`: `cleanUrls`, legacy `/<game>.html` → 301 redirects,
  `emulators` block).
- **Firebase is client-only** (`app/plugins/firebase.client.ts`; toast + tippy
  plugins likewise). Game components client-guard `useFirestore`/`useToast`/
  `localStorage` behind `import.meta.client`, so every initial screen prerenders
  as real HTML and hydrates with zero console errors.
- Each route is a thin `app/pages/<name>.vue` wrapper: imports the existing root
  component and sets the full per-page `<head>` (fonts, canonical, OpenGraph,
  per-game theme-color + branded favicons) via `useHead`. Site-wide favicons/
  fonts live in `nuxt.config.ts`'s global head; branded favicons override by key.
- 404 is prerendered via `app/pages/[...slug].vue`, copied to `404.html` by
  `scripts/nuxt/finalize.mjs`; `app/error.vue` is the runtime fallback.
- Stats is Firestore-backed: it prerenders a loading shell and fetches live data
  on mount.

## Routes (all green)

home, 404, cameo, court, guillotine, megachurch, sisyphus, pretend, invalid,
meeting, wrongest, stats.

## Verification harness (`bun run verify`)

`scripts/verify/` runs Playwright against a static server that mimics Firebase
Hosting (clean URLs, 301 redirects, `404.html` on miss). Per route: HTTP status,
prerendered content (white-page detector), hydration, a page-specific selector
visible, a rendered-text floor, and zero uncaught console errors. It also checks
every legacy `.html` → 301 redirect and a Firestore emulator write/read
round-trip.

Run modes: default (uses a running emulator if present), `--spawn-emulator`
(harness starts it), `--no-emulator` (skips emulator-backed checks). Live-data
pages opt into `waitUntil: "domcontentloaded"`; Firestore-unreachable errors
under `--no-emulator` are treated as environmental noise.

**Latest result:** `60/60` with the emulator (incl. the Firestore round-trip),
`59/59` without. 11/11 routes, 9/9 redirects. Unit tests: 105/105.

## Phase C — done

- Removed the Vite multi-entry artifacts: `src/entries/*`, `vite.config.js`, the
  legacy `Page.pug` document wrappers + their `_head`/`_javascripts`/`_opengraph`
  partials, and the legacy `package.json` scripts + `scripts/npm-run/{build,
  buildPages,dev,watchPages}.js`.
- Dependency hygiene: removed unused deps (`vite-plugin-vue-devtools`,
  `nodemon`, `concurrently`, root `firebase-functions`), declared used-but-
  missing deps (`tippy.js`, `chalk`), and removed the stale root
  `package-lock.json` (project uses bun; `bun.lock` is canonical).
- `build` refreshes `public/sitemap.xml` before generating; `deploy` = `build`
  + `firebase deploy --only hosting` (`firebase.json` already serves
  `.output/public`).
- Editor parity: `.eslintrc.cjs` declares Nuxt/Vue auto-imports as globals;
  `tsconfig.json` includes `app/**` + `.nuxt` type decls and the pug language
  plugin (consolidated from the removed `jsconfig.json`); `postinstall` runs
  `nuxi prepare`.

## Related

- #286 — migrate SCSS `@import` → `@use`/`@forward` (recommended before/with
  this merge).
