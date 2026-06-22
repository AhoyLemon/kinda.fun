// scripts/npm-run/dev.js
// Runs Vite dev server, all page watchers, and the partials watcher in parallel.
// During startup the noisy child output is hidden behind a progress bar that
// advances on real build milestones; once Vite reports ready we clear the screen
// and show only the clean Vite banner + homepage table.
import { spawn } from "child_process";
import chalk from "chalk";
import cliProgress from "cli-progress";

const PAGE_COUNT = 10; // number of page watchers in watchPages.js — our build milestones

// Strip color codes without putting a literal control char in the source (keeps eslint happy).
const ANSI = new RegExp(String.fromCharCode(27) + "\\[[0-9;]*m", "g");
const stripAnsi = (s) => s.replace(ANSI, "");

const VITE_READY = /VITE\s+v[\d.]+\s+ready in/i;
const PAGE_DONE = /rebuilt|built successfully/gi;
const ERROR_LINE = /(❌|\bfailed\b|not recognized|exited with code|Error:)/i;

// ── Shared phase state ───────────────────────────────────────────────────────
let pagesBuilt = 0; // real progress signal from the page watchers
let viteReady = false; // becomes true the moment Vite prints its "ready" banner
let watchersLive = false; // pass watcher output through only after the initial build settles
let finished = false;
const errorLines = []; // startup problems we swallowed but want to surface after the clear

function run(cmd, args, name, { detectReady = false, isWatcher = false } = {}) {
  const proc = spawn(cmd, args, {
    // Pipe stdout/stderr so we can hide the noisy startup; keep stdin inherited.
    stdio: ["inherit", "pipe", "pipe"],
    shell: process.platform === "win32",
    // Piping makes the child's stdout a non-TTY, so chalk disables color by
    // default. Force it on so the homepage table keeps its colors downstream.
    env: { ...process.env, FORCE_COLOR: "3" },
  });

  let acc = ""; // rolling buffer so a split "ready" banner still matches

  const onData = (chunk) => {
    const text = chunk.toString();
    const clean = stripAnsi(text);

    // Advance the progress bar as pages finish building.
    if (!viteReady && isWatcher) {
      const hits = clean.match(PAGE_DONE);
      if (hits) pagesBuilt = Math.min(PAGE_COUNT, pagesBuilt + hits.length);
    }

    // The Vite banner is the signal to clear and reveal the clean output.
    if (detectReady && !viteReady) {
      acc = (acc + clean).slice(-2000);
      if (VITE_READY.test(acc)) {
        finishLoading();
        process.stdout.write(text); // banner + Local/Network URLs
        return;
      }
    }

    // After ready: Vite output always flows; watcher output flows once it settles.
    if (viteReady) {
      if (!isWatcher || watchersLive) {
        process.stdout.write(text);
        return;
      }
    }

    // Otherwise the line is hidden behind the bar — keep only real errors.
    for (const ln of clean.split(/\r?\n/)) {
      if (ln.trim() && ERROR_LINE.test(ln)) errorLines.push(ln.trim());
    }
  };

  proc.stdout.on("data", onData);
  proc.stderr.on("data", onData);

  proc.on("close", (code) => {
    if (code) {
      errorLines.push(`[${name}] exited with code ${code}`);
      if (!finished) finishLoading();
    }
  });
  return proc;
}

// ── Progress bar (anchored to page-build milestones, with a gentle crawl) ──────
const bar = new cliProgress.SingleBar(
  {
    format: chalk.cyan("  Starting dev server ") + " {bar} " + chalk.gray("{percentage}%  {status}"),
    barCompleteChar: "█",
    barIncompleteChar: "░",
    hideCursor: true,
    clearOnComplete: true,
    barsize: 28,
  },
  cliProgress.Presets.shades_classic
);

bar.start(100, 0, { status: chalk.gray("warming up…") });

let crawl = 0;
let lastPages = 0;
const timer = setInterval(() => {
  if (pagesBuilt !== lastPages) {
    lastPages = pagesBuilt; // a real milestone just landed — reset the crawl so it visibly jumps
    crawl = 0;
  }
  crawl = Math.min(crawl + 0.5, 10);
  const base = (pagesBuilt / PAGE_COUNT) * 80; // pages = up to 80%, Vite ready brings it home
  bar.update(Math.min(95, Math.round(base + crawl)), {
    status: chalk.gray(`pages ${pagesBuilt}/${PAGE_COUNT}`),
  });
}, 150);

function finishLoading() {
  if (finished) return;
  finished = true;
  viteReady = true;
  clearInterval(timer);
  bar.update(100, { status: chalk.green("ready") });
  bar.stop();
  if (errorLines.length) {
    console.log(chalk.yellow("\n  ⚠ Startup warnings:"));
    [...new Set(errorLines)].forEach((l) => console.log(chalk.gray("   • ") + l));
    console.log("");
  }
  // Let live rebuild output through once the initial parallel build has settled.
  setTimeout(() => {
    watchersLive = true;
  }, 1500);
}

// Safety net: never spin forever if the ready banner is missed.
setTimeout(() => finishLoading(), 60000);

// ── Spawn ────────────────────────────────────────────────────────────────────
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

const processes = [
  run(npmCmd, ["run", "--silent", "dev:client"], "CLIENT", { detectReady: true }),
  run("node", ["scripts/npm-run/watchPages.js"], "WATCH", { isWatcher: true }),
  run("node", ["scripts/watchPugPartials.js"], "PARTIALS", { isWatcher: true }),
];

process.on("SIGINT", () => {
  if (!finished) finishLoading();
  processes.forEach((p) => p.kill());
  process.exit();
});
