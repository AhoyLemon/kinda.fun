import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsDir = path.join(__dirname, "../src/views");

function getAllPugPartials() {
  const result = [];
  const subdirs = fs.readdirSync(viewsDir, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const dirent of subdirs) {
    const pugDir = path.join(viewsDir, dirent.name, "pug");
    if (fs.existsSync(pugDir) && fs.statSync(pugDir).isDirectory()) {
      const files = fs
        .readdirSync(pugDir)
        .filter((f) => f.endsWith(".pug"))
        .map((f) => ({
          file: path.join(pugDir, f),
          main: path.join(viewsDir, dirent.name, `${capitalize(dirent.name)}.pug`),
        }));
      result.push(...files);
    }
  }
  return result;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const watched = getAllPugPartials();
const watchedFiles = watched.map((w) => w.file);
const mainFiles = Object.fromEntries(watched.map((w) => [w.file, w.main]));

watchedFiles.forEach((file) => {
  fs.watchFile(file, { interval: 200 }, () => {
    const main = mainFiles[file];
    if (fs.existsSync(main)) {
      // Touch the main file (update mtime)
      const now = new Date();
      fs.utimesSync(main, now, now);
      console.log(`[touch-main-pug] Touched ${main} because ${file} changed.`);
    }
  });
});

console.log("[touch-main-pug] Watching partials:", watchedFiles);
