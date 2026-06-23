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
  // ---- Not yet ported (Phase B) ----
  { name: "stats", path: "/stats", ported: false, selector: "body", contentNeedle: "stats", minText: 50 },
  { name: "sisyphus", path: "/sisyphus", ported: false, selector: "body", contentNeedle: "Sisyphus", minText: 50 },
  { name: "megachurch", path: "/megachurch", ported: false, selector: "body", contentNeedle: "Megachurch", minText: 50 },
  { name: "wrongest", path: "/wrongest", ported: false, selector: "body", contentNeedle: "Wrongest", minText: 50 },
  { name: "guillotine", path: "/guillotine", ported: false, selector: "body", contentNeedle: "Billionaires", minText: 50 },
  { name: "invalid", path: "/invalid", ported: false, selector: "body", contentNeedle: "Invalid", minText: 50 },
  { name: "meeting", path: "/meeting", ported: false, selector: "body", contentNeedle: "Meeting", minText: 50 },
  { name: "pretend", path: "/pretend", ported: false, selector: "body", contentNeedle: "Pretend", minText: 50 },
];

// Legacy .html URLs that must 301 to their clean path.
export const REDIRECTS = [
  { from: "/cameo.html", to: "/cameo" },
  { from: "/stats.html", to: "/stats" },
  { from: "/sisyphus.html", to: "/sisyphus" },
  { from: "/megachurch.html", to: "/megachurch" },
  { from: "/wrongest.html", to: "/wrongest" },
  { from: "/guillotine.html", to: "/guillotine" },
  { from: "/invalid.html", to: "/invalid" },
  { from: "/meeting.html", to: "/meeting" },
  { from: "/pretend.html", to: "/pretend" },
];
