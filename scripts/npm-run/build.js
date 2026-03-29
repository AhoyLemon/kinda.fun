// Cross-platform build script for Kinda Fun
// Usage: node scripts/npm-run/build.js [--mode <mode>]

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";
import chalk from "chalk";
import Table from "cli-table3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function run(cmd) {
  execSync(cmd, { stdio: "inherit", shell: true });
}

function promptForMode() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(chalk.bold.blue("\n🏗️  Build Mode Selection"));
    console.log(chalk.gray("1. production ") + chalk.gray("(default)") + chalk.gray(" — Optimized for deployment"));
    console.log(chalk.gray("2. development — Faster build with debug info\n"));

    rl.question(chalk.yellow("Select build mode (1-2) [1]: "), (answer) => {
      rl.close();

      const choice = answer.trim() || "1";

      switch (choice) {
        case "1":
        case "production":
          resolve("production");
          break;
        case "2":
        case "development":
          resolve("development");
          break;
        default:
          console.log(chalk.yellow(`Invalid choice "${choice}", defaulting to production`));
          resolve("production");
          break;
      }
    });
  });
}

async function main() {
  // Check if mode was provided as command line argument
  const args = process.argv.slice(2);
  let mode = null;

  // Look for --mode argument
  const modeIndex = args.findIndex((arg) => arg === "--mode");
  if (modeIndex !== -1 && args[modeIndex + 1]) {
    mode = args[modeIndex + 1];
    console.log(chalk.gray(`🎯 Using specified mode: ${chalk.bold(mode)}`));
  }

  // If no mode specified, prompt user
  if (!mode) {
    mode = await promptForMode();
  }

  console.log(chalk.bold.blue(`\n🚀 Building in ${chalk.yellow(mode)} mode...\n`));

  // 1. Update sitemap
  run("node scripts/update-sitemap.js");

  // 2. Vite build with selected mode
  if (mode === "production") {
    run("vite build");
  } else {
    run(`vite build --mode ${mode}`);
  }

  // 3. Build static pages
  run("npm run build:pages");

  // 4. Copy home.html to index.html (cross-platform)
  const distDir = path.join(__dirname, "../../dist");
  const src = path.join(distDir, "home.html");
  const dest = path.join(distDir, "index.html");

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(chalk.gray("\nCopied home.html → index.html"));
  } else {
    console.error(chalk.red("❌ home.html not found in dist/"));
    process.exit(1);
  }

  const summaryTable = new Table({
    head: [chalk.white("Step"), chalk.white("Status")],
    style: { head: [] },
  });
  summaryTable.push(["Update sitemap", chalk.green("✅ Done")]);
  summaryTable.push([`Vite build (${mode})`, chalk.green("✅ Done")]);
  summaryTable.push(["Build HTML pages", chalk.green("✅ Done")]);
  summaryTable.push(["Copy home.html → index.html", chalk.green("✅ Done")]);

  console.log("\n" + summaryTable.toString());
  console.log(chalk.bold.green(`\n✅ Build complete in ${chalk.bold.yellow(mode)} mode!\n`));
}

main().catch(console.error);
