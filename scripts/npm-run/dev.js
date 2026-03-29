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

console.log(chalk.bold.blue("\n🎮 Kinda Fun — Development Mode\n"));
console.log(chalk.gray("   Starting:  ") + chalk.cyan("Vite dev client") + chalk.gray("  →  http://localhost:5173"));
console.log(chalk.gray("   Starting:  ") + chalk.cyan("Page watchers") + chalk.gray("   (nodemon per game)"));
console.log(chalk.gray("   Starting:  ") + chalk.cyan("Partials watcher") + chalk.gray(" (touch on .pug partial change)\n"));

const processes = [
  run("npm", ["run", "dev:client"], "CLIENT"),
  run("node", ["scripts/npm-run/watch-pages.js"], "WATCH"),
  run("node", ["scripts/touch-main-pug-on-partial-change.js"], "PARTIALS"),
];

process.on("SIGINT", () => {
  processes.forEach((p) => p.kill());
  process.exit();
});
