// scripts/npm-run/watch-pages.js
// Spawns all nodemon page watchers in parallel
import { spawn } from "child_process";

const watchers = [
  { name: "cameo", color: "yellow", file: "src/views/cameo/Page.pug", build: "cameo" },
  { name: "guillotine", color: "red", file: "src/views/guillotine/Page.pug", build: "guillotine" },
  { name: "home", color: "green", file: "src/views/home/Page.pug", build: "index" },
  { name: "invalid", color: "blue", file: "src/views/invalid/Page.pug", build: "invalid" },
  { name: "meeting", color: "magenta", file: "src/views/meeting/Page.pug", build: "meeting" },
  { name: "pretend", color: "cyan", file: "src/views/pretend/Page.pug", build: "pretend" },
  { name: "sisyphus", color: "white", file: "src/views/sisyphus/Page.pug", build: "sisyphus" },
  { name: "wrongest", color: "gray", file: "src/views/wrongest/Page.pug", build: "wrongest" },
  { name: "stats", color: "brightBlue", file: "src/views/stats/Page.pug", build: "stats" },
];

function runWatcher(w) {
  const proc = spawn("nodemon", ["--quiet", "-w", w.file, "-x", `node build-pages.js ${w.build}`], { stdio: "inherit", shell: true });
  proc.on("close", (code) => {
    if (code !== 0) {
      console.log(`[${w.name}] exited with code ${code}`);
    }
  });
  return proc;
}

const procs = watchers.map(runWatcher);

process.on("SIGINT", () => {
  procs.forEach((p) => p.kill());
  process.exit();
});
