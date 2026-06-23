# Nuxt 4 Migration — Status (issue #128)

Branch: `refactor_128--nuxt-4`. This document records exactly what is done,
what is verified, and what remains, per the execution plan in
`docs/nuxt-migration-plan.md`.

## Toolchain gate (confirmed)

- ✅ Dependencies install (`bun install`, plus Nuxt 4 and harness deps).
- ✅ `nuxt generate` produces static output in `.output/public`.
- ✅ A trivial Playwright test passes. Playwright's browser CDN
  (`cdn.playwright.dev`) is blocked by this environment's egress policy, so the
  harness drives the Chromium binary bundled in `@sparticuz/chromium` (from the
  allowed npm registry; version matches Playwright's expected build).
- ⚠️ **Firebase emulator suite: started successfully once** (Firestore + Auth
  both reachable, jar downloaded over the proxy), then every subsequent launch
  — via `firebase emulators:start`, and even `java -jar
  cloud-firestore-emulator-*.jar` directly — is killed instantly with signal 16
  and no output. Short-lived `java -version` works; the long-running emulator
  JVM is reaped by the environment. **Emulator-backed checks cannot run here.**

## Architecture (Phase A — proven on the slice)

- Nuxt 4 with the default `app/` directory; `~` resolves to `app/`. A legacy
  `@` alias still points at `src/` so ported pages reuse existing SCSS, pug
  templates and TS helpers without a mass move.
- Static generation (`nuxt generate` → `.output/public`), served by Firebase
  Hosting.
- **Firebase is client-only** (`app/plugins/firebase.client.ts`). Nothing
  Firebase touches browser APIs during prerender. VueFire is always installed
  (demo app fallback) so client composables never throw; the emulator is
  connected only when `NUXT_PUBLIC_USE_EMULATOR=true`.
- 404 is rendered as real, prerendered HTML via a catch-all page
  (`app/pages/[...slug].vue`) that is copied to `404.html` by
  `scripts/nuxt/finalize.mjs`; `app/error.vue` remains as the runtime fallback.
- `firebase.json`: `cleanUrls`, legacy `/<game>.html` → 301 redirects, and an
  `emulators` block.

## Verification harness (`bun run verify`)

`scripts/verify/` runs Playwright against a static server that mimics Firebase
Hosting (clean URLs, 301 redirects, `404.html` on miss). Per route it checks:
HTTP status, prerendered content present (white-page detector), hydration,
a page-specific selector visible, a rendered-text floor, and zero uncaught
console errors. It also checks every legacy `.html` → 301 redirect and a
Firestore emulator write/read round-trip.

Run modes:
- `node scripts/verify/verify.mjs` — uses an already-running emulator if present.
- `--spawn-emulator` — harness starts the emulator itself (for normal machines).
- `--no-emulator` — skips emulator-backed checks (used here, since the
  environment kills the emulator).

### Latest result (`--no-emulator`)

```
BUILD (1/1)      ✓ nuxt generate + finalize
REDIRECT (9/9)   ✓ all legacy .html → 301
ROUTE (12/20)    ✓ home, ✓ 404, ✓ cameo  (each: HTTP, prerender, hydrate,
                   selector, text floor, zero console errors)
                 ✗ stats, sisyphus, megachurch, wrongest, guillotine, invalid,
                   meeting, pretend  (not yet ported — Phase B)
TOTAL: 22/30
SLICE (ported routes): GREEN ✅
```

The 8 red routes are the un-ported games and are expected to be red until
Phase B. The Firestore round-trip is the only check blocked by the environment.

## Remaining work

- **Phase B:** port stats, sisyphus, megachurch, wrongest, guillotine, invalid,
  meeting, pretend, each green on the harness. Apply the slice pattern
  (client-guard Firebase/toast/sounds, prerenderable initial view).
- **Emulator-backed game checks:** multiplayer room create/join and
  single-player state-survives-reload. Implemented conceptually in the harness;
  must be run where the emulator stays alive (CI / a normal machine).
- **Phase C:** remove the Vite multi-entry artifacts (`src/entries/`, root
  `.html` shells, `vite.config.js`, legacy `package.json` scripts), wire
  sitemap generation, finalize the deploy command in GitHub Actions.

## Why this is a draft PR

Per the plan: open a non-draft PR only when `bun run verify` is green across all
11 routes and the adversarial findings are resolved. Here, 8 routes are
un-ported and the emulator round-trip cannot run in this environment, so this is
a **draft** documenting exactly what passes and what does not.
