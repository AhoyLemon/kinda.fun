import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const distDir = path.resolve(__dirname, "../dist");
const expectedFiles = [
  "cameo.html",
  "guillotine.html",
  "invalid.html",
  "meeting.html",
  "pretend.html",
  "sisyphus.html",
  "wrongest.html",
  "stats.html",
  "home.html",
  "404.html",
];
describe("Build Output Validation", () => {
  it("runs build:pages and checks output files are freshly generated", () => {
    // Run the build:pages script
    execSync("npm run build:pages", { stdio: "inherit" });
    const now = Date.now();
    const maxAgeMs = 1000 * 60 * 2; // 2 minutes
    let allPassed = true;
    for (const file of expectedFiles) {
      const filePath = path.join(distDir, file);
      const exists = fs.existsSync(filePath);
      if (!exists) allPassed = false;
      expect(exists).toBe(true);
      const stats = fs.statSync(filePath);
      const diff = now - stats.mtimeMs;
      if (diff >= maxAgeMs) allPassed = false;
      expect(diff).toBeLessThan(maxAgeMs);
    }
    // Visually appealing summary line
    // eslint-disable-next-line no-console
    if (allPassed) {
      console.log("\x1b[42m\x1b[30m ✔ Build output validation PASSED \x1b[0m");
    } else {
      console.log("\x1b[41m\x1b[37m ✖ Build output validation FAILED \x1b[0m");
    }
  });
});
