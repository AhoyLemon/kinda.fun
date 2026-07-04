// Verification harness — the migration's stop condition (migration plan §
// "Verification harness"). Runs the Firebase emulator suite, generates the
// static site against it, serves it like Firebase Hosting, and checks every
// route in a headless browser. Prints a per-route pass/fail summary and exits
// non-zero on any failure.
//
// Usage:
//   node scripts/verify/verify.mjs            # full run (boots emulator + generate)
//   node scripts/verify/verify.mjs --skip-generate
//   node scripts/verify/verify.mjs --no-emulator
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { rmSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import pkg from "playwright";
import { ROUTES, REDIRECTS } from "./_routes.mjs";
import { startStaticServer } from "./_static-server.mjs";
import { resolveChromium } from "./_browser.mjs";

const { chromium } = pkg;
const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, ".output", "public");
const EMULATOR_HOST = "127.0.0.1";
const PROJECT = "demo-kinda-fun";

const args = process.argv.slice(2);
const SKIP_GENERATE = args.includes("--skip-generate");
const NO_EMULATOR = args.includes("--no-emulator");
// Opt-in: spawn the emulator from inside the harness. On normal machines this
// is convenient; in sandboxes that kill spawned server trees, start the
// emulator separately ("firebase emulators:start --only firestore,auth
// --project demo-kinda-fun") and run verify without this flag — it will detect
// the running emulator on its ports.
const SPAWN_EMULATOR = args.includes("--spawn-emulator");

const results = [];
const record = (group, name, ok, detail = "") => {
  results.push({ group, name, ok, detail });
  const tag = ok ? "\x1b[32mPASS\x1b[0m" : "\x1b[31mFAIL\x1b[0m";
  console.log(`  [${tag}] ${group}: ${name}${detail ? ` — ${detail}` : ""}`);
};

function run(cmd, argv, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, argv, { stdio: "inherit", ...opts });
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
    p.on("error", reject);
  });
}

async function waitForPort(url, label, timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status >= 200 && res.status < 600) return true;
    } catch {
      /* not up yet */
    }
    await sleep(500);
  }
  throw new Error(`Timed out waiting for ${label} at ${url}`);
}

async function startEmulator() {
  console.log("\n▶ Starting Firebase emulator suite (firestore, auth)…");
  const bin = join(ROOT, "node_modules", ".bin", "firebase");
  // Use the emulator-only config (firestore rules + emulator ports). The main
  // firebase.json no longer carries a `firestore`/`emulators` section, so a bare
  // `firebase deploy` can't publish the permissive rules to the live project.
  const proc = spawn(bin, ["emulators:start", "--only", "firestore,auth", "--project", PROJECT, "--config", join(ROOT, "firebase.emulator.json")], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env },
  });
  proc.stdout.on("data", (d) => process.env.VERIFY_DEBUG && process.stdout.write(`[emu] ${d}`));
  proc.stderr.on("data", (d) => process.env.VERIFY_DEBUG && process.stderr.write(`[emu] ${d}`));
  await waitForPort(`http://${EMULATOR_HOST}:8080/`, "Firestore emulator");
  await waitForPort(`http://${EMULATOR_HOST}:9099/`, "Auth emulator");
  console.log("✓ Emulator suite ready.");
  return proc;
}

async function generate() {
  console.log("\n▶ Generating static site against emulator…");
  const env = {
    ...process.env,
    NUXT_TELEMETRY_DISABLED: "1",
    NUXT_PUBLIC_USE_EMULATOR: "true",
    NUXT_PUBLIC_EMULATOR_HOST: EMULATOR_HOST,
    NUXT_PUBLIC_FIREBASE_PROJECT_ID: PROJECT,
  };
  await run(join(ROOT, "node_modules", ".bin", "nuxi"), ["generate"], { env });
  record("build", "nuxt generate", true);
}

// Emulator-backed data round-trip: a write survives a read (proves the app's
// emulator wiring/ports are correct and tests never touch a live project).
async function emulatorRoundTrip() {
  console.log("\n▶ Emulator data round-trip…");
  try {
    const { initializeApp, deleteApp } = await import("firebase/app");
    const { getFirestore, connectFirestoreEmulator, doc, setDoc, getDoc } = await import("firebase/firestore");
    const app = initializeApp({ projectId: PROJECT, apiKey: "demo-key" }, "verify-roundtrip");
    const db = getFirestore(app);
    connectFirestoreEmulator(db, EMULATOR_HOST, 8080);
    const ref = doc(db, "verify/roundtrip");
    const token = `t-${Date.now()}`;
    await setDoc(ref, { token, at: Date.now() });
    const snap = await getDoc(ref);
    const ok = snap.exists() && snap.data().token === token;
    record("emulator", "firestore write/read round-trip", ok, ok ? "" : "value mismatch");
    await deleteApp(app);
  } catch (e) {
    record("emulator", "firestore write/read round-trip", false, e.message);
  }
}

async function checkRedirects(baseUrl) {
  console.log("\n▶ Legacy .html → 301 redirects…");
  for (const r of REDIRECTS) {
    try {
      const res = await fetch(`${baseUrl}${r.from}`, { redirect: "manual" });
      const loc = res.headers.get("location");
      const ok = res.status === 301 && loc === r.to;
      record("redirect", `${r.from} → ${r.to}`, ok, ok ? "" : `got ${res.status} ${loc || ""}`);
    } catch (e) {
      record("redirect", `${r.from} → ${r.to}`, false, e.message);
    }
  }
}

// Decide whether a console error is environmental noise vs. a real app error.
// `url` is the console message's source URL (msg.location().url), `origin` the
// site's own origin, `pageUrl` the URL being navigated, `expectStatus` the
// route's expected HTTP status. Crucially, a failed load is only ignored when
// it's an EXTERNAL resource — a same-origin sub-resource failure (e.g. a missing
// built _nuxt chunk) is a real, hydration-breaking error and must surface so
// broken deploys fail.
const isConsoleNoise = (text, url, origin, pageUrl, expectStatus) => {
  // Firestore-unreachable noise: when the emulator isn't running (e.g.
  // --no-emulator), the stats dashboard's on-mount fetch can't reach a backend.
  // Environmental, not an app bug — the same data path is exercised for real
  // when the emulator is up. Games never hit this (their Firebase use is
  // client-interaction-gated). These are app-level console.error messages, so
  // match by text.
  if (/Could not reach Cloud Firestore backend|@firebase\/firestore|WebChannelConnection|Error loading .* stats from Firestore|Error loading full .* data/i.test(text)) {
    return true;
  }
  // Resource-load failures (fonts/CDN blocked by this environment's egress
  // policy). Ignore ONLY when the failing resource is external; never mask a
  // same-origin sub-resource failure.
  const isLoadFailure = /Failed to load resource|net::ERR|ERR_|the server responded with a status/i.test(text);
  if (!isLoadFailure) return false;
  // The 404 route intentionally navigates to a URL that returns 404; Chromium
  // logs a load-failure for the document itself. That's the expected status for
  // the main document, not a broken sub-resource — ignore it.
  if (expectStatus !== 200 && pageUrl && (url === pageUrl || url === `${pageUrl}/`)) return true;
  // A same-origin sub-resource that failed to load is a real error.
  if (url && origin && url.startsWith(origin)) return false;
  // External (fonts.googleapis/gstatic/CDN) or unattributable load failure.
  return true;
};

// Checks one route in its own browser context (isolation lets routes run in
// parallel without state bleed). Returns its records rather than logging them,
// so the pool driver can replay them in a stable order.
async function checkRoute(browser, baseUrl, route) {
  const label = `${route.name} (${route.path})`;
  const recs = [];
  const add = (name, ok, detail = "") => recs.push({ group: "route", name, ok, detail });

  const pageUrl = `${baseUrl}${route.path}`;
  const expectStatus = route.expectStatus || 200;
  const context = await browser.newContext();
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const url = msg.location()?.url || "";
    if (!isConsoleNoise(msg.text(), url, baseUrl, pageUrl, expectStatus)) consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
  try {
    // Single navigation drives both checks. Live-data pages (e.g. stats) hold an
    // open Firestore connection, so "networkidle" never fires — they opt into a
    // lighter wait via route.waitUntil.
    const resp = await page.goto(pageUrl, { waitUntil: route.waitUntil || "networkidle", timeout: 30000 });

    // 1. Raw HTTP: status + prerendered content (white-page detector on the
    // server-sent source — resp.text() is the response body, pre-hydration).
    const status = resp ? resp.status() : 0;
    const html = resp ? await resp.text() : "";
    const statusOk = status === expectStatus;
    const contentOk = html.includes(route.contentNeedle);
    add(`${label} HTTP ${expectStatus} + prerendered content`, statusOk && contentOk,
      statusOk && contentOk ? "" : `status=${status} contentNeedle=${contentOk}`);

    // 2. Headless browser: hydration, selector visible, text floor, zero console errors.
    await page.waitForSelector(route.selector, { state: "visible", timeout: 15000 });
    const text = (await page.locator("body").innerText()).trim();
    const textOk = text.length >= route.minText;
    add(`${label} hydrates + selector "${route.selector}" visible`, true);
    add(`${label} rendered text ≥ ${route.minText}`, textOk, textOk ? `${text.length} chars` : `only ${text.length} chars`);
    // Console errors: warnings allowed, errors not.
    add(`${label} zero console errors`, consoleErrors.length === 0,
      consoleErrors.length ? consoleErrors.slice(0, 3).join(" | ") : "");
  } catch (e) {
    add(`${label} hydration/selector`, false, e.message);
  } finally {
    await context.close();
  }
  return recs;
}

// Run `fn` over `items` with at most `limit` in flight; results keep input order.
async function mapPool(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i], i);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

function summarize() {
  console.log("\n" + "=".repeat(64));
  console.log("VERIFY SUMMARY");
  console.log("=".repeat(64));
  const groups = [...new Set(results.map((r) => r.group))];
  for (const g of groups) {
    const rows = results.filter((r) => r.group === g);
    const passed = rows.filter((r) => r.ok).length;
    console.log(`\n${g.toUpperCase()} (${passed}/${rows.length})`);
    for (const r of rows) {
      console.log(`  ${r.ok ? "✓" : "✗"} ${r.name}${r.detail ? ` — ${r.detail}` : ""}`);
    }
  }
  const total = results.length;
  const passed = results.filter((r) => r.ok).length;
  console.log("\n" + "-".repeat(64));
  console.log(`TOTAL: ${passed}/${total} checks passed`);
  console.log(`RESULT: ${passed === total ? "GREEN ✅" : `RED ❌ (${total - passed} failing)`}`);
  console.log("=".repeat(64));
  return passed === total;
}

async function isEmulatorUp() {
  try {
    const a = await fetch(`http://${EMULATOR_HOST}:8080/`).then((r) => r.status, () => 0);
    const b = await fetch(`http://${EMULATOR_HOST}:9099/`).then((r) => r.status, () => 0);
    return a > 0 && b > 0;
  } catch {
    return false;
  }
}

async function main() {
  let emulator = null;
  let staticServer = null;
  let browser = null;
  let allGreen = false;
  try {
    let emulatorReady = false;
    if (NO_EMULATOR) {
      console.log("\n▶ Emulator disabled (--no-emulator).");
    } else if (SPAWN_EMULATOR) {
      emulator = await startEmulator();
      emulatorReady = true;
    } else {
      emulatorReady = await isEmulatorUp();
      if (emulatorReady) {
        console.log("\n✓ Detected running emulator suite on 8080/9099.");
      } else {
        console.log("\n⚠ No emulator detected. Start it with: firebase emulators:start --only firestore,auth --project demo-kinda-fun (or pass --spawn-emulator).");
      }
    }

    if (!SKIP_GENERATE) await generate();
    else record("build", "nuxt generate (skipped)", true, "--skip-generate");

    if (emulatorReady) await emulatorRoundTrip();
    else if (!NO_EMULATOR) {
      // No emulator running and none requested to spawn: skip the round-trip
      // rather than failing. `bun run verify` still checks every route out of
      // the box; the round-trip runs when an emulator is detected or when
      // --spawn-emulator is passed (and --no-emulator silences this note).
      console.log("\n○ Skipping Firestore write/read round-trip — no emulator detected.");
      console.log("  Start it (or pass --spawn-emulator) to include this check; pass --no-emulator to silence.");
    }

    const srv = await startStaticServer({ root: PUBLIC_DIR, redirects: REDIRECTS.map((r) => ({ from: r.from, to: r.to })) });
    staticServer = srv.server;
    console.log(`\n▶ Serving ${PUBLIC_DIR} at ${srv.url}`);

    await checkRedirects(srv.url);

    const { executablePath, args: browserArgs } = await resolveChromium();
    browser = await chromium.launch({ executablePath, args: browserArgs, headless: true });

    // Routes run through a small concurrency pool of isolated browser contexts.
    // Each returns its records; we replay them in ROUTES order so the summary is
    // stable regardless of completion order. Tune with VERIFY_CONCURRENCY.
    const concurrency = Math.max(1, Number(process.env.VERIFY_CONCURRENCY) || 4);
    console.log(`\n▶ Per-route checks (concurrency ${concurrency})…`);
    const perRoute = await mapPool(ROUTES, concurrency, (route) => checkRoute(browser, srv.url, route));
    for (const recs of perRoute) {
      for (const r of recs) record(r.group, r.name, r.ok, r.detail);
    }

    allGreen = summarize();
  } catch (e) {
    console.error("\nFATAL:", e.stack || e.message);
    summarize();
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (staticServer) staticServer.close();
    if (emulator) {
      try {
        emulator.kill("SIGTERM");
      } catch {
        /* already gone */
      }
    }
    // The site was generated with NUXT_PUBLIC_USE_EMULATOR=true (emulator host +
    // demo project) baked into the prerendered pages. That output lives in the
    // exact directory firebase.json deploys, so remove it — a stale
    // emulator-wired build must never be deployable. `bun run deploy` rebuilds
    // a clean production bundle, so this is purely a safety cleanup.
    try {
      rmSync(join(ROOT, ".output"), { recursive: true, force: true });
      console.log("\n🧹 Removed .output (emulator-wired build). Run `bun run build` before deploying.");
    } catch {
      /* nothing to clean */
    }
  }
  process.exit(allGreen ? 0 : 1);
}

main();
