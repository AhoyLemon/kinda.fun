// scripts/npm-run/watchPages.js
// Spawns all nodemon page watchers in parallel
import { spawn } from "child_process";
import chalk from "chalk";

const watchers = [
  { name: "cameo", file: "src/views/cameo/Page.pug", build: "cameo" },
  { name: "guillotine", file: "src/views/guillotine/Page.pug", build: "guillotine" },
  { name: "home", file: "src/views/home/Page.pug", build: "home" },
  { name: "invalid", file: "src/views/invalid/Page.pug", build: "invalid" },
  { name: "meeting", file: "src/views/meeting/Page.pug", build: "meeting" },
  { name: "megachurch", file: "src/views/megachurch/Page.pug", build: "megachurch" },
  { name: "pretend", file: "src/views/pretend/Page.pug", build: "pretend" },
  { name: "sisyphus", file: "src/views/sisyphus/Page.pug", build: "sisyphus" },
  { name: "wrongest", file: "src/views/wrongest/Page.pug", build: "wrongest" },
  { name: "stats", file: "src/views/stats/Page.pug", build: "stats" },
];

console.log(chalk.gray("   ◉  ") + chalk.cyan("Pages") + chalk.gray(`  —  ${watchers.length} game watchers`));

function runWatcher(w) {
  const proc = spawn("nodemon", ["--quiet", "-w", w.file, "-x", "node", "scripts/npm-run/buildPages.js", w.build], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, DEV_WATCH: "1" },
  });
  proc.on("close", (code) => {
    // Suppressed watcher exit logs for quieter output
  });
  return proc;
}

const procs = watchers.map(runWatcher);

process.on("SIGINT", () => {
  procs.forEach((p) => p.kill());
  process.exit();
});
