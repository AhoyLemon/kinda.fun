// Cross-platform build script for Kinda Fun
// Usage: node scripts/npm-run/build.js

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function run(cmd) {
  execSync(cmd, { stdio: "inherit", shell: true });
}

// 1. Update sitemap
run("node scripts/update-sitemap.js");

// 2. Vite build
run("vite build");

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
