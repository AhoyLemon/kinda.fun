# Code review — PR #285 (Nuxt 4 migration)

> **This file is review scaffolding, not documentation.** It exists so an agent can act on the findings below. Delete it before merging the PR.
>
> Process: adversarial review at max effort — 8 independent finder passes over `git diff main...HEAD` (line-by-line, removed-behavior audit, cross-file tracing, reuse/simplification/efficiency/altitude, conventions), 42 raw candidates deduped, each survivor independently re-verified against the code and `git show main:` before making this list. Verdicts below reflect that verification, with `file:line` evidence throughout.

## Overall verdict

The migration itself is solid: every route prerenders, navigation is plain `<a href>` (true MPA — no `NuxtLink` anywhere), and the verify harness is a genuinely good idea. But **four deploy/infra findings should block merge** (Findings 1–4), and several "behavior unchanged" contract violations (Findings 5–6) should be fixed before this ships.

For each finding: fix it, or if you disagree, say why in the PR discussion rather than silently skipping it.

---

## Blockers

### 1. The CI deploy workflow still expects `dist/` — every production deploy fails after merge

**File:** `.github/workflows/firebase-deploy.yml:65-75` (untouched by this PR)

The "Verify dist directory exists" step runs `[ ! -d "dist" ] && exit 1`, but the new build (`bun run build` → `nuxi generate` + `scripts/nuxt/finalize.mjs`) writes to `.output/public` and never creates `dist/`. First merge to main → the deploy job fails before the Firebase deploy step → the site can never receive the Nuxt build via CI.

Also stale in the same workflow:

- Line 43: `bun pm ls vite vue @vitejs/plugin-vue` as a "key dependencies" sanity check — vite is no longer a direct dependency.
- Line 52: `bun run build -- --mode production` — the trailing `--mode production` now lands on `finalize.mjs`, which ignores it. Harmless but vestigial.

**Fix:** update the workflow to check/announce `.output/public`, drop or update the dependency sanity check, and drop the vestigial `--mode` flag. Consider also running `bun run verify` in CI while you're in there (see Finding 4). `monthly-deps-update.yml:103` has the same `--mode production` vestige.

### 2. Allow-all `firestore.rules` is registered against the live project

**Files:** `firestore.rules:8`, `firebase.json:44-46`, `.firebaserc:3`

The new `firestore.rules` contains `allow read, write: if true;` — the comment says it's emulator-only and "never loaded against the live project," but `firebase.json` registers it under the top-level `firestore.rules` key and `.firebaserc` defaults to the live `kinda-fun` project. Nothing enforces the comment's claim: one bare `firebase deploy` (no `--only hosting`) publishes world-readable/world-writable rules to production Firestore. `docs/games/megachurch/DEVELOPER.md:225` even tells developers "Run `firebase deploy` if needed."

The sanctioned paths (`package.json` `deploy` script and the CI workflow) are both `--only hosting`, which is why this is a latent footgun rather than a live regression — but it's one muscle-memory command away from an open production database.

**Fix:** move the emulator rules to a separate config the emulator loads explicitly (e.g. `firebase emulators:start --config firebase.emulator.json`), or remove the top-level `firestore` key from the deployed `firebase.json`. Also fix the megachurch doc's bare-deploy advice.

### 3. `bun run verify` leaves an emulator-wired build in the deploy directory

**File:** `scripts/verify/verify.mjs:82-89`; interacts with `firebase.json:4` and `nuxt.config.ts:83`

The verify harness regenerates the site with `NUXT_PUBLIC_USE_EMULATOR: "true"`, `NUXT_PUBLIC_EMULATOR_HOST: "127.0.0.1"`, and projectId `demo-kinda-fun` — into `.output/public`, the exact directory `firebase.json` deploys. For a static `nuxi generate` site the public runtimeConfig is serialized into the prerendered pages at build time (there is no Nitro server to override it at runtime), so the emulator flag is baked in. Nothing cleans or marks the output afterward.

Failure path: `bun run verify`, then `firebase deploy --only hosting` directly (instead of `bun run deploy`, which rebuilds) → every production visitor's Firebase client connects to `127.0.0.1:8080/9099` → stats writes and all multiplayer games (invalid, meeting, wrongest) silently fail site-wide.

**Fix:** have verify generate into its own directory (Nitro output override or `NITRO_OUTPUT_DIR`), or delete/taint `.output/public` when verify finishes so a stale emulator build can't be deployed.

### 4. `failOnError: false` + hand-maintained route list ships broken or missing pages silently

**File:** `nuxt.config.ts:24-36`

Three settings compound: `crawlLinks: false`, a hand-maintained `routes` array, and `failOnError: false`. Consequences:

- A route that throws during prerender is logged but the build exits 0, no `index.html` is emitted, and `bun run deploy` publishes a site where that route serves the 404 page. Nothing in the build/deploy chain catches it (`verify` is a separate manual command; `finalize.mjs` only guards `/not-found`).
- A future page not added to the routes array is silently never prerendered.

`failOnError: false` is not needed for the `/not-found` → `404.html` trick: `app/pages/[...slug].vue:6-8` already renders 200 specifically so the prerenderer emits it.

**Fix:** set `failOnError: true`, and make the route list self-maintaining — either enable `crawlLinks` (home links every game) with `/not-found` listed explicitly, or derive the array from `app/pages/` / a shared manifest (see Finding 9).

---

## Behavior regressions (the PR's "behavior unchanged" contract)

### 5. Schema.org VideoGame JSON-LD dropped site-wide

**Files:** all `app/pages/*.vue`; orphans at `src/views/*/pug/**/_schema.pug`

Every legacy game `Page.pug` emitted VideoGame JSON-LD (nine games via `pug/_schema.pug` includes, wrongest inline with ratings/screenshots/creator). No `useHead` block or config on this branch emits any `application/ld+json` — grep of `app/` returns zero. On the next Google recrawl, all rich-result structured data disappears from every game page. The ten `_schema.pug` files remain in the tree as dead code.

**Fix:** port the JSON-LD into `useHead` (`script: [{ type: "application/ld+json", textContent: JSON.stringify(...) }]`) — a natural fit for the shared `useGameHead()` composable proposed in Finding 11 — then delete the orphaned `_schema.pug` files.

### 6. Three per-game `<head>` behaviors dropped in the Page.pug → useHead port

1. **No-zoom viewport (court, sisyphus).** `main:src/views/court/Page.pug:9` and `main:src/views/sisyphus/Page.pug:9` set `maximum-scale=1.0, user-scalable=no`; the new pages inherit only the plain global viewport (`nuxt.config.ts:44`). Rapid tapping in Sisyphus (a clicker!) or double-tapping cards in Court now triggers mobile zoom mid-game. *Judgment call: dropping `user-scalable=no` is arguably an accessibility win — but it's an unflagged behavior change on the two games where zoom hurts most. Decide deliberately.*
2. **JetBrains Mono (guillotine).** Legacy head loaded Red Hat Text AND JetBrains Mono; `app/pages/guillotine.vue:9` loads only Red Hat Text, while `src/views/guillotine/scss/abstracts/_variables.scss:42,45` still sets `$monospaced: "JetBrains Mono"`, used in 7 partials (counters, title screen, share screen, stats). All of it silently falls back to system monospace.
3. **Webmanifest links (sisyphus, invalid).** `main:src/views/sisyphus/Page.pug:27` linked `/img/sisyphus/site.webmanifest`; the file (and invalid's) still exists in `public/` but nothing links it — add-to-home-screen degrades to a plain bookmark.

**Fix:** re-add each to the respective page's `useHead`.

### 7. `app/error.vue` presents every error as a 404

**File:** `app/error.vue:6-50`

The error page declares the `error` prop and deliberately ignores it, hardcoding the 404 title/meta/copy (and logging "404 - Page not found" in `onMounted` regardless of the actual error). The twist: route-level 404s never reach `error.vue` — they're handled by the `[...slug].vue` catch-all — so the *only* realistic path into `error.vue` is a non-404 fatal client error (a plugin throwing at startup, a fatal hydration error). Every one of those renders as "404 — Page Not Found," hiding the real failure. Low frequency, 100% misleading when it fires.

**Fix:** branch on `error.statusCode` — keep the 404 copy for 404s, show status + message otherwise. Pairs well with extracting the shared NotFound UI (Finding 12).

### 8. Court hydration mismatch for returning players

**File:** `src/views/court/Court.vue:236,240`; template at `src/views/court/pug/screens/_court-select.pug:8-9`

`hasPlayedQuickplay()`/`hasPlayedCurrentCourt()` return `false` during SSR (this PR's guard) but are read in `v-if` branches of the prerendered court-select screen (`ui.phase` starts as `"courtSelect"`). A returning player's prerendered HTML shows "New? Start here!" while hydration computes "Default" → genuine Vue hydration text mismatch (console warning in dev, silent patch in prod). Impact is small — `onMounted` immediately flips `ui.phase` to `"title"` — but Court is the only game reading localStorage during hydration; every other game defers to `onMounted`.

**Fix:** match the other games — read localStorage in `onMounted` into a ref.

---

## Structural cleanups

### 9. The route/redirect inventory is hand-maintained in four places and has already drifted

**Files:** `nuxt.config.ts:34`, `scripts/verify/routes.mjs:15,126`, `firebase.json:8-20`, `public/sitemap.xml`

The same route list lives in the prerender array, `ROUTES`, the sitemap, and (as redirects) both `REDIRECTS` and `firebase.json`. Drift is already real: `firebase.json` has 11 redirects, `REDIRECTS` has 10 — `/index.html → /` is never verified. Adding the next game requires four synchronized edits, and nothing fails loudly when one is missed (compounded by Finding 4).

**Fix:** make `routes.mjs` the single route manifest (`nuxt.config.ts` already imports from `scripts/` for the dev banner, so importing `ROUTES` is proven viable) and derive `REDIRECTS` by parsing `firebase.json` instead of copying it.

### 10. ~25 copy-pasted `import.meta.client` guards in three divergent variants

**Files:** 13 files across `src/views/**`; variants at `src/views/court/Court.vue:36` (callable stub), `src/views/cameo/Cameo.vue:40` (plain-object stub, NOT callable), `src/views/court/ts/_useCourtStats.ts:39` (`null as unknown as Firestore`)

Seven games use the callable toast stub (`Object.assign(() => {}, {...})` — needed because some call `toast(...)` directly), Cameo uses a plain object that would throw on a direct call, and court's stats helper casts null to `Firestore`, defeating null-checking. Plus 11 copies of `const db = import.meta.client ? useFirestore() : null`. The Cameo variant is a **latent prerender crash**: today all Cameo usage is `toast.success/error/info`, but the first direct `toast(...)` there (or in a new game copied from Cameo) throws during `nuxi generate` — and with `failOnError: false`, the broken page ships silently.

**Fix:** shared composables in `src/shared/ts/` (e.g. `_useClientToast.ts` returning the callable stub, `_useClientFirestore.ts`) — kills ~19 copies and makes the stub shape a single decision.

### 11. Eleven near-identical `useHead` blocks

**Files:** all `app/pages/*.vue`

~25 lines of identical canonical/OG/favicon scaffolding per page, already drifting (stats has no og:image; court/meeting/pretend/guillotine skip the favicon override block). Any cross-page change (OG shape, `og:email`, domain) means 11 synchronized edits.

**Fix:** a shared `useGameHead({ title, description, path, ogImage, fonts, favicons, themeColor })` composable on top of the keyed defaults already in `nuxt.config.ts` `app.head`. Natural home for the JSON-LD port (Finding 5).

### 12. Two parallel 404 implementations

**Files:** `app/error.vue`, `app/pages/[...slug].vue`

Same template/handlers copy-pasted, heads already diverged (full OG set vs bare `robots: noindex`), and both wrap click-handler code in `import.meta.client` guards that can never be false. **Fix:** one shared NotFound component (handlers unguarded); each wrapper keeps only its own `useHead`. Pairs with Finding 7.

### 13. Dead code the migration left behind

- `src/App.vue` — the old SPA shell, still importing `vue-router` (the only `vue-router` reference left in the repo). Unreferenced.
- `src/firebase.js` — legacy Firebase init, superseded by `app/plugins/firebase.client.ts`. Unreferenced.
- `src/vite-env.d.ts` — `/// <reference types="vite/client" />` for the removed build.
- Ten orphaned `src/views/*/pug/**/_schema.pug` files (see Finding 5 — port their content first, then delete).
- `scripts/verify/routes.mjs:15` — every route is `ported: true`, so the `ported` flag, the early-return in `verify.mjs:143`, and the "SLICE (ported routes)" summary line are dead migration scaffolding.
- `package.json:16` — `postinstall:nuxt` is not a lifecycle hook and duplicates `postinstall`'s `nuxi prepare`. Delete.

---

## Conventions (Lemon's own rules)

14. **Committed `console.log`s** — `app/error.vue:46` and `app/pages/[...slug].vue:32` ship a `console.log` to every 404 visitor. Remove (or `console.warn` if genuinely wanted).
15. **`<script setup>` without `lang="ts"`** — all 13 new `app/` Vue files (every page, `error.vue`) violate the "always `<script setup lang="ts">`" rule, and `docs/new-game.md` now codifies the non-TS form for future games. Fix the docs at minimum; converting the wrappers is low-effort since they're thin.
16. **Missing `alt` on touched `img` lines** — the diff touched 7 cameo `img` lines (`_final-round.pug:19,38`, `_game-over.pug:26`, `_sort-three.pug:18,36,48,83`) that still have no alt text; `:alt="element.name"` is available right there.
17. **`_` prefix on import-only files** — `scripts/verify/routes.mjs`, `static-server.mjs`, `browser.mjs`, and `scripts/nuxt/devBanner.mjs` are only ever imported but lack the `_` prefix the rest of the PR follows.

---

## Worth considering (not blocking)

- **Global fonts on every page** (`nuxt.config.ts:51`): Inter/Lora now load on all 11 game pages on top of each game's own fonts (the old build scoped them to home), and invalid/stats request Lora a second time in their own css2 URLs. Move the Inter/Lora stylesheet into `index.vue`'s `useHead` (keyed) and dedupe.
- **`static-server.mjs` mimics Firebase Hosting** (97 lines re-implementing cleanUrls/redirects/404 semantics): `firebase-tools` is already a devDependency and the emulator config exists — adding `hosting` to the emulator list would test the real production routing and delete the file.
- **`finalize.mjs` may be unnecessary**: Nitro treats prerender routes ending in `.html` as literal file paths, so `routes: ["/404.html"]` might emit `404.html` directly. **Unverified — test before adopting.**
- **`@sparticuz/chromium`** adds a second ~280MB Chromium to every fresh install as a workaround for one sandboxed environment. Gate it behind an env flag / on-demand install and default `resolveChromium` to Playwright's bundled browser.
- **`.eslintrc.cjs` hand-maintained globals list**: the file's own comment concedes `@nuxt/eslint` would generate it. The migration PR is the natural moment to adopt it.
- **Verify harness speed**: route checks run strictly sequentially with a networkidle floor, and each route's HTML is fetched twice (raw `fetch` + `page.goto`). A small concurrency pool + using the `goto` response for the status/needle checks would cut the runtime severalfold.
- **Pre-existing, not a regression**: `og:image:width/height` declare 1280×640 but `public/img/og-wide.png` is 1200×630 — the legacy Page.pug had the same wrong numbers. One-line fix while you're in the head blocks.
