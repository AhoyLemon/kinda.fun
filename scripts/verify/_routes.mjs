// Single source of truth for the site's routes.
//
// - `ROUTES` drives the verify harness (per route: a `selector` that must be
//   visible after hydration and a `contentNeedle` that must appear in the raw
//   prerendered HTML, plus a `minText` floor for visible rendered text).
// - `PRERENDER_ROUTES` (derived below) is imported by nuxt.config.ts as the
//   `nitro.prerender.routes` list, so adding a route here prerenders it too.
// - `REDIRECTS` is derived from firebase.json's hosting redirects, so the
//   redirect list lives in exactly one place (firebase.json) and the harness
//   verifies whatever production actually serves.
import { readFileSync } from "node:fs";

export const ROUTES = [
  {
    name: "home",
    path: "/",
    selector: ".game-grid",
    contentNeedle: "Comparatively Famous",
    minText: 150,
  },
  {
    name: "404",
    // Verify requests a non-existent path (expecting a 404), but the page that
    // gets prerendered is the catch-all render target, /not-found. A Nitro
    // prerender:generate hook (nuxt.config.ts) writes that render to 404.html,
    // the file Firebase Hosting serves for unmatched routes.
    path: "/this-route-does-not-exist-xyz",
    prerenderPath: "/not-found",
    expectStatus: 404,
    selector: ".error-number",
    contentNeedle: "Page Not Found",
    minText: 30,
  },
  {
    name: "cameo",
    path: "/cameo",
    selector: "main.title-screen",
    contentNeedle: "is a site where people",
    minText: 80,
  },
  {
    name: "court",
    path: "/court",
    selector: ".court-game",
    contentNeedle: "Select Your Court",
    minText: 50,
  },
  {
    name: "guillotine",
    path: "/guillotine",
    selector: "main",
    contentNeedle: "This game works much better on bigger screens",
    minText: 50,
  },
  {
    name: "megachurch",
    path: "/megachurch",
    selector: ".game-screen",
    contentNeedle: "This game requires a larger screen",
    minText: 50,
  },
  {
    name: "sisyphus",
    path: "/sisyphus",
    selector: "main",
    contentNeedle: "Click Sisyphus to push the rock uphill",
    minText: 50,
  },
  {
    name: "pretend",
    // pretend's figure/figcaption are position:fixed on desktop, so the root
    // <main> collapses to 0px height (Playwright would call it "hidden").
    // Target the fixed, full-height figcaption that actually has a visible box.
    path: "/pretend",
    selector: ".qa-screen figcaption",
    contentNeedle: "Who is this supposed to be?",
    minText: 50,
  },
  {
    name: "invalid",
    path: "/invalid",
    selector: ".create button",
    contentNeedle: "Create a New Room",
    minText: 50,
  },
  {
    name: "meeting",
    path: "/meeting",
    selector: "main.title-screen",
    contentNeedle: "turn that boring meeting into a stealthy battle",
    minText: 50,
  },
  {
    name: "wrongest",
    path: "/wrongest",
    selector: ".title-screen .help-holder",
    contentNeedle: "Need instructions?",
    minText: 50,
  },
  {
    // Firestore-backed: prerenders a loading shell (sidebar + "Loading data…")
    // and fetches live data on mount. Full data + zero-console-errors needs a
    // reachable Firestore, so this route is meaningfully verified WITH the
    // emulator (or in CI); under --no-emulator it logs Firestore-unreachable
    // errors, which verify.mjs treats as environmental noise.
    name: "stats",
    path: "/stats",
    selector: ".stats-screen",
    contentNeedle: "Loading data...",
    minText: 10,
    // Stats holds an open Firestore connection on mount, so networkidle never
    // settles — wait for DOM + hydration instead and let the selector gate.
    waitUntil: "domcontentloaded",
  },
];

// Real page paths Nitro should statically prerender (each route's own path,
// except the 404 which prerenders the /not-found render target).
export const PRERENDER_ROUTES = ROUTES.map((r) => r.prerenderPath ?? r.path);

// Redirects come straight from firebase.json (the production source of truth),
// so the harness tests exactly what Hosting serves and the list can't drift.
const firebaseConfig = JSON.parse(readFileSync(new URL("../../firebase.json", import.meta.url), "utf8"));
export const REDIRECTS = (firebaseConfig.hosting?.redirects ?? [])
  .filter((r) => r.type === 301)
  .map((r) => ({ from: r.source, to: r.destination }));
