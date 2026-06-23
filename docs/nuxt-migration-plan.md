# Nuxt 4 Migration — Execution Plan

Executable plan for issue #128. A Claude Code cloud session (`claude --remote "Execute docs/nuxt-migration-plan.md"`) runs this end to end. The stop condition is the verification harness, not a human's judgment. Do not improvise the locked decisions below.

## Locked decisions (do not deviate)

1. **Nuxt 4, default `app/` directory structure.** Pages live in `app/pages/`, the error page is `app/error.vue`, and `~` resolves to `app/`. Do not place a `pages/` directory at the repo root. That is the Nuxt 3 layout and it fights Nuxt 4's auto-detection.
2. **Static generation.** `nuxt generate` outputs to `.output/public`, which Firebase Hosting serves. Prerendering produces real HTML for SEO, but the app must hydrate cleanly on the client.
3. **Firebase is client-only.** Initialize Firebase in a `.client.ts` plugin (or a composable guarded by `import.meta.client`). Nothing Firebase-related may touch browser APIs during prerender. This is the single highest risk. The blank pages in the prior two attempts were almost certainly Firebase running server-side during generation, or a resulting hydration mismatch. Treat this as the #1 thing to get right and the #1 thing the harness must catch.
4. **All tests run against the Firebase emulator suite, never the live project.** If the repo has no emulator config, add it as part of this work: a `firebase.json` emulators block plus minimal seed data for room create/join and single-player state. Never point a test at the production Firebase project.
5. **Legacy `.html` URLs redirect.** Each `/<game>.html` returns a 301 to `/<game>` via `firebase.json` redirects.

## Build order (vertical slice first)

The earlier attempts went off the rails because a wrong early decision compounded across all 11 pages. Prove the architecture on a slice before repeating it.

**Phase A — slice, then stop.**
Set up `nuxt.config.ts`, the `app/` structure, the Firebase client plugin, and global SCSS. Port exactly three things: `app/pages/index.vue` (home), `app/error.vue` (404), and `app/pages/cameo.vue` (one multiplayer game).
Gate: the harness must be green on `/`, the 404 path, and `/cameo` before anything else is touched. If it is not green, fix the architecture here, not later.

**Phase B — repeat the proven pattern.**
Port the remaining pages one at a time, running the harness after each: stats, sisyphus, megachurch, wrongest, guillotine, invalid, meeting, pretend.

**Phase C — wiring.**
Build and deploy config, `firebase.json` redirects, sitemap generation, removal of the old multi-entry artifacts (`src/entries/`, root `.html` files, `vite.config.js`).

## Verification harness (the stop condition)

A single command, `npm run verify`, that must pass green across all 11 routes before any PR opens. Build it with Playwright plus the Firebase emulator.

Per route:
- Resolves at its clean URL, returns 200.
- Prerendered HTML contains real page content, not just an empty app shell.
- In a headless browser: page hydrates, a page-specific selector is visible, and rendered text clears a minimum length floor. This is the white-page detector.
- Browser console has zero uncaught errors on load. Warnings are allowed.

Games (emulator-backed):
- Multiplayer: one client creates a room, a second client joins it.
- Single-player: a state write survives a page reload.

Routing and build:
- Each `/<game>.html` returns a 301 to `/<game>`.
- `nuxt generate` succeeds, typecheck passes, lint baseline holds.

The harness prints a per-route pass/fail summary. That summary goes into the PR description.

## Adversarial review (before the PR opens)

Spawn a second agent. Give it the full diff and the harness output. Its job is to find ways this breaks at runtime:
- SSR / hydration mismatches.
- Firebase reaching browser APIs during prerender.
- Dead or unreachable routes, leftover multi-entry artifacts.
- Broken asset paths (audio, images, SVGs) after the move to `public/`.

It does not judge gameplay or aesthetics. Address every finding, re-run the harness to green, then open the PR.

## PR conditions

- Open the PR only when `npm run verify` is green on all 11 routes and the adversarial findings are resolved.
- Paste the harness summary into the PR description so the result is auditable.
- If the harness cannot be made green after reasonable iteration, open a **draft** PR that documents exactly which route fails and why. Do not declare success on partial work.

## Out of scope for the auto-gate (Lemon spot-checks after the PR)

Visual styling fidelity, audio actually playing, real two-human multiplayer feel, mobile responsiveness, and full game-round correctness. The agent must not certify these.
