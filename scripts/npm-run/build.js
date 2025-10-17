// Cross-platform build script for Kinda Fun
// Usage: node scripts/npm-run/build.js [--mode <mode>]

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function run(cmd) {
  execSync(cmd, { stdio: "inherit", shell: true });
}

function promptForMode() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log("\n🏗️  Build Mode Selection");
    console.log("1. production (default) - Optimized for deployment");
    console.log("2. development - Faster build with debug info");
    console.log("");

    rl.question("Select build mode (1-2) [1]: ", (answer) => {
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
          console.log(`Invalid choice "${choice}", defaulting to production`);
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
  const modeIndex = args.findIndex(arg => arg === "--mode");
  if (modeIndex !== -1 && args[modeIndex + 1]) {
    mode = args[modeIndex + 1];
    console.log(`🎯 Using specified mode: ${mode}`);
  }
  
  // If no mode specified, prompt user
  if (!mode) {
    mode = await promptForMode();
  }
  
  console.log(`\n🚀 Building in ${mode} mode...\n`);

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
    console.log("Copied home.html to index.html");
  } else {
    console.error("home.html not found in dist/");
    process.exit(1);
  }
  
  console.log(`\n✅ Build completed in ${mode} mode!`);
}

main().catch(console.error);
