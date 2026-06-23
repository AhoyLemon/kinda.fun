// Post-generate finalize step.
// Copies the prerendered catch-all 404 page (/not-found) to 404.html so
// Firebase Hosting serves real, prerendered 404 content for unmatched routes.
import { existsSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const publicDir = join(process.cwd(), ".output", "public");
const src = join(publicDir, "not-found", "index.html");
const dest = join(publicDir, "404.html");

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log(`[finalize] wrote ${dest} from prerendered /not-found`);
} else {
  console.warn(`[finalize] WARNING: ${src} not found; 404.html left as SPA fallback`);
  process.exitCode = 1;
}
