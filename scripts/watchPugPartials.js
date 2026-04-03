import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsDir = path.join(__dirname, "../src/views");

function getAllPugPartials() {
  const result = [];
  const subdirs = fs.readdirSync(viewsDir, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const dirent of subdirs) {
    const pugDir = path.join(viewsDir, dirent.name, "pug");
    if (fs.existsSync(pugDir) && fs.statSync(pugDir).isDirectory()) {
      const main = path.join(viewsDir, dirent.name, `${capitalize(dirent.name)}.pug`);
      collectPugFiles(pugDir, main, result);
    }
  }
  return result;
}

function collectPugFiles(dir, main, result) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectPugFiles(fullPath, main, result);
    } else if (entry.name.endsWith(".pug")) {
      result.push({ file: fullPath, main });
    }
  }
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
      const now = new Date();
      fs.utimesSync(main, now, now);
      console.log(chalk.cyan("[touch-main-pug]") + " " + chalk.green(path.basename(main)) + " touched due to change in " + chalk.yellow(path.basename(file)));
    }
  });
});

console.log(chalk.gray("   ◉  ") + chalk.cyan("Partials") + chalk.gray(`  —  ${watched.length} pug partials`) + "\n");

process.on("SIGINT", () => {
  console.log(chalk.gray("\nStopping partials watcher..."));
  process.exit();
});
