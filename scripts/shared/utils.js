// scripts/shared/utils.js
// Shared helpers for all kinda.fun scripts.
// Import only what you need; every export is independent.

import { existsSync, readFileSync } from "fs";
import { join } from "path";
import readline from "readline";
import chalk from "chalk";
import { SingleBar, Presets } from "cli-progress";

// ---------------------------------------------------------------------------
// Service account loading (R8)
// ---------------------------------------------------------------------------

/**
 * Load a Firebase service account JSON file with a friendly error on missing files.
 * @param {string} filename  e.g. "dev-service-account.json"
 * @param {string} dir       __dirname of the calling script
 */
export function loadServiceAccount(filename, dir) {
  const fullPath = join(dir, filename);
  if (!existsSync(fullPath)) {
    console.error(chalk.red(`\n❌ Service account file not found:\n   ${fullPath}`));
    console.error(chalk.yellow("   Copy the appropriate service account JSON to scripts/firebase/"));
    process.exit(1);
  }
  return JSON.parse(readFileSync(fullPath, "utf8"));
}

// ---------------------------------------------------------------------------
// Confirmation prompts (R7)
// ---------------------------------------------------------------------------

/**
 * y/N confirmation — use for destructive operations (bulk deletes, dev overwrites).
 * Returns true if the user enters "y" or "Y".
 */
export async function confirm(message) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(chalk.yellow(`\n${message} [y/N] `), (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "y");
    });
  });
}

/**
 * Exact-match confirmation — use for truly dangerous operations (prod writes).
 * Returns true only if the user types the expected string verbatim.
 */
export async function confirmExact(message, expected) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(chalk.red(`\n${message}\nType exactly: "${expected}"\n> `), (answer) => {
      rl.close();
      resolve(answer.trim() === expected);
    });
  });
}

// ---------------------------------------------------------------------------
// Progress bars (R3)
// ---------------------------------------------------------------------------

/**
 * Create a standard progress bar.
 * @param {string} label  Short label shown to the left of the bar (max ~22 chars)
 * @returns {SingleBar}   Call .start(total, 0), .increment(), .stop()
 *
 * @example
 * const bar = createProgressBar("Processing heads");
 * bar.start(rows.length, 0);
 * for (const row of rows) { ... ; bar.increment(); }
 * bar.stop();
 */
export function createProgressBar(label) {
  return new SingleBar(
    {
      format: `  ${chalk.cyan(label.padEnd(22))} [{bar}] {percentage}%  {value}/{total}`,
      barCompleteChar: "█",
      barIncompleteChar: "░",
      hideCursor: true,
      clearOnComplete: false,
    },
    Presets.shades_classic,
  );
}
