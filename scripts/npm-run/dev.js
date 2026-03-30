// scripts/npm-run/dev.js
// Runs Vite dev server, all page watchers, and the partials watcher in parallel
import { spawn } from "child_process";
import chalk from "chalk";

function run(cmd, args, name) {
  const proc = spawn(cmd, args, { stdio: "inherit", shell: true });
  proc.on("close", (code) => {
    if (code !== 0) {
      console.log(chalk.yellow(`[${name}] exited with code ${code}`));
    }
  });
  return proc;
}

console.log(chalk.bold.cyan("\n  🎮  Kinda Fun") + chalk.bold.white("  —  Development Mode"));
console.log(chalk.gray("  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━") + "\n");

const processes = [
  run("npm", ["run", "--silent", "dev:client"], "CLIENT"),
  run("node", ["scripts/npm-run/watch-pages.js"], "WATCH"),
  run("node", ["scripts/touch-main-pug-on-partial-change.js"], "PARTIALS"),
];

process.on("SIGINT", () => {
  processes.forEach((p) => p.kill());
  process.exit();
});
