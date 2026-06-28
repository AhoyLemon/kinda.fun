// Route manifest for the verification harness.
//
// `ported: true` routes are expected to be GREEN (real prerendered content +
// clean hydration). Routes still on the legacy stack are listed so the summary
// shows all 11, but they will report RED until ported (migration plan Phase B).
//
// Each route declares a `selector` that must be visible after hydration and a
// `contentNeedle` that must appear in the raw prerendered HTML (white-page
// detector), plus a `minText` floor for visible rendered text.

export const ROUTES = [
  {
    name: "home",
    path: "/",
    ported: true,
    selector: ".game-grid",
    contentNeedle: "Comparatively Famous",
    minText: 150,
  },
  {
    name: "404",
    path: "/this-route-does-not-exist-xyz",
    ported: true,
    expectStatus: 404,
    selector: ".error-number",
    contentNeedle: "Page Not Found",
    minText: 30,
  },
  {
    name: "cameo",
    path: "/cameo",
    ported: true,
    selector: "main.title-screen",
    contentNeedle: "is a site where people",
    minText: 80,
  },
  // ---- Phase B: single-player games (ported) ----
  {
    name: "court",
    path: "/court",
    ported: true,
    selector: ".court-game",
    contentNeedle: "Select Your Court",
    minText: 50,
  },
  {
    name: "guillotine",
    path: "/guillotine",
    ported: true,
    selector: "main",
    contentNeedle: "This game works much better on bigger screens",
    minText: 50,
  },
  {
    name: "megachurch",
    path: "/megachurch",
    ported: true,
    selector: ".game-screen",
    contentNeedle: "This game requires a larger screen",
    minText: 50,
  },
  {
    name: "sisyphus",
    path: "/sisyphus",
    ported: true,
    selector: "main",
    contentNeedle: "Click Sisyphus to push the rock uphill",
    minText: 50,
  },
  {
    name: "pretend",
    path: "/pretend",
    ported: true,
    // pretend's figure/figcaption are position:fixed on desktop, so the root
    // <main> collapses to 0px height (Playwright would call it "hidden").
    // Target the fixed, full-height figcaption that actually has a visible box.
    selector: ".qa-screen figcaption",
    contentNeedle: "Who is this supposed to be?",
    minText: 50,
  },
  // ---- Phase B: multiplayer games (ported) ----
  {
    name: "invalid",
    path: "/invalid",
    ported: true,
    selector: ".create button",
    contentNeedle: "Create a New Room",
    minText: 50,
  },
  {
    name: "meeting",
    path: "/meeting",
    ported: true,
    selector: "main.title-screen",
    contentNeedle: "turn that boring meeting into a stealthy battle",
    minText: 50,
  },
  {
    name: "wrongest",
    path: "/wrongest",
    ported: true,
    selector: ".title-screen .help-holder",
    contentNeedle: "Need instructions?",
    minText: 50,
  },
  // ---- Not yet ported (stats dashboard) ----
  { name: "stats", path: "/stats", ported: false, selector: "body", contentNeedle: "stats", minText: 50 },
];

// Legacy .html URLs that must 301 to their clean path.
export const REDIRECTS = [
  { from: "/cameo.html", to: "/cameo" },
  { from: "/court.html", to: "/court" },
  { from: "/stats.html", to: "/stats" },
  { from: "/sisyphus.html", to: "/sisyphus" },
  { from: "/megachurch.html", to: "/megachurch" },
  { from: "/wrongest.html", to: "/wrongest" },
  { from: "/guillotine.html", to: "/guillotine" },
  { from: "/invalid.html", to: "/invalid" },
  { from: "/meeting.html", to: "/meeting" },
  { from: "/pretend.html", to: "/pretend" },
];
