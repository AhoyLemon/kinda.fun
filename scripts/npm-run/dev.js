// scripts/npm-run/dev.js
// Runs Vite dev server, all page watchers, and the partials watcher in parallel
import { spawn } from "child_process";

function run(cmd, args, name, color) {
  const proc = spawn(cmd, args, { stdio: "inherit", shell: true });
  proc.on("close", (code) => {
    if (code !== 0) {
      console.log(`[${name}] exited with code ${code}`);
    }
  });
  return proc;
}

const processes = [
  run("npm", ["run", "dev:client"], "CLIENT", "magenta"),
  run("node", ["scripts/npm-run/watch-pages.js"], "WATCH", "cyan"),
  run("node", ["scripts/touch-main-pug-on-partial-change.js"], "PARTIALS", "green"),
];

process.on("SIGINT", () => {
  processes.forEach((p) => p.kill());
  process.exit();
});
