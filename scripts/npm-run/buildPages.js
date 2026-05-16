import pug from "pug";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import beautify from "js-beautify";
import chalk from "chalk";
import Table from "cli-table3";

/*
 * buildPages.js
 *
 * Generates static HTML pages from Pug templates for each game view.
 * Ensures local HTML uses dev script paths and production HTML uses built script paths.
 * Sets the correct baseUrl for local and production environments.
 */

// Step 1: Set up environment variables and output paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lastUpdated = new Date().toISOString();

// Define dev and dist base URLs
const devBaseUrl = "http://localhost:5173";
const distBaseUrl = "https://kinda.fun";

// Step 2: Ensure dist directory exists in project root
const PROJECT_ROOT = process.cwd();
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
fs.mkdirSync(DIST_DIR, { recursive: true });

// Step 3: Define all pages to build
const SRC_DIR = path.join(PROJECT_ROOT, "src");

const pages = [
  {
    src: path.join(SRC_DIR, "views", "cameo", "Page.pug"),
    out: path.join(DIST_DIR, "cameo.html"),
    name: "cameo.html",
  },
  {
    src: path.join(SRC_DIR, "views", "court", "Page.pug"),
    out: path.join(DIST_DIR, "court.html"),
    name: "court.html",
  },
  {
    src: path.join(SRC_DIR, "views", "guillotine", "Page.pug"),
    out: path.join(DIST_DIR, "guillotine.html"),
    name: "guillotine.html",
  },
  {
    src: path.join(SRC_DIR, "views", "invalid", "Page.pug"),
    out: path.join(DIST_DIR, "invalid.html"),
    name: "invalid.html",
  },
  {
    src: path.join(SRC_DIR, "views", "meeting", "Page.pug"),
    out: path.join(DIST_DIR, "meeting.html"),
    name: "meeting.html",
  },
  {
    src: path.join(SRC_DIR, "views", "megachurch", "Page.pug"),
    out: path.join(DIST_DIR, "megachurch.html"),
    name: "megachurch.html",
  },
  {
    src: path.join(SRC_DIR, "views", "pretend", "Page.pug"),
    out: path.join(DIST_DIR, "pretend.html"),
    name: "pretend.html",
  },
  {
    src: path.join(SRC_DIR, "views", "sisyphus", "Page.pug"),
    out: path.join(DIST_DIR, "sisyphus.html"),
    name: "sisyphus.html",
  },
  {
    src: path.join(SRC_DIR, "views", "wrongest", "Page.pug"),
    out: path.join(DIST_DIR, "wrongest.html"),
    name: "wrongest.html",
  },
  {
    src: path.join(SRC_DIR, "views", "stats", "Page.pug"),
    out: path.join(DIST_DIR, "stats.html"),
    name: "stats.html",
  },
  {
    src: path.join(SRC_DIR, "views", "home", "Page.pug"),
    out: path.join(DIST_DIR, "home.html"),
    name: "home.html",
  },
  {
    src: path.join(SRC_DIR, "views", "404", "Page.pug"),
    out: path.join(DIST_DIR, "404.html"),
    name: "404.html",
  },
];

// Step 5: Build pages
const arg = process.argv[2];

// Optionally filter which pages to build via CLI arg
const filteredPages = arg
  ? pages.filter((page) => page.name.replace(/\.html$/, "") === arg || page.out.endsWith(arg) || page.src.endsWith(arg) || page.name === arg)
  : pages;

const watchMode = process.env.DEV_WATCH === "1";

if (!watchMode) {
  console.log(chalk.bold.blue(`\n📄 Build Pages${arg ? ` — ${arg}` : ""} (${filteredPages.length} page${filteredPages.length === 1 ? "" : "s"})\n`));
}

const builtPages = [];
const failedPages = [];

for (const page of filteredPages) {
  if (fs.existsSync(page.src)) {
    try {
      // a. Render the Pug template to HTML (dev version)
      let html = pug.renderFile(page.src, { lastUpdated, baseUrl: devBaseUrl });
      // b. Beautify the HTML for readability
      const prettyHtml = beautify.html(html, { indent_size: 2, wrap_line_length: 120 });
      // c. Write pretty HTML to the project root (dev version)
      fs.writeFileSync(path.join(PROJECT_ROOT, page.name), prettyHtml, "utf8");
      // d. Rewrite script tags for production and write to dist/
      let distHtml = pug.renderFile(page.src, { lastUpdated, baseUrl: distBaseUrl });
      distHtml = beautify.html(distHtml, { indent_size: 2, wrap_line_length: 120 });
      distHtml = distHtml.replace(
        /<script\s+type=["']module["']\s+src=["']\/src\/entries\/([a-zA-Z0-9_-]+)\.js["'][^>]*>.*?<\/script>/gs,
        (match, p1) => `<script type="module" src="/${p1}.js?lastUpdated=${lastUpdated}"></script>`,
      );
      // e. Write the dist HTML (production version)
      fs.writeFileSync(page.out, distHtml, "utf8");
      builtPages.push(page.name);
    } catch (err) {
      console.warn(chalk.red(`\n❌ Failed: ${page.name} — ${err.message}`));
      failedPages.push(page.name);
    }
  } else {
    console.warn(chalk.yellow(`⚠️  Source not found: ${page.src}`));
    failedPages.push(page.name);
  }
}

if (watchMode) {
  builtPages.forEach((name) => console.log(chalk.gray("   📄  ") + chalk.cyan(name) + chalk.gray(" rebuilt")));
  failedPages.forEach((name) => console.error(chalk.red(`   ❌  ${name} build failed`)));
  if (failedPages.length > 0) process.exit(1);
} else {
  const summaryTable = new Table({
    head: [chalk.white("Page"), chalk.white("Status")],
    style: { head: [] },
  });
  builtPages.forEach((name) => summaryTable.push([name, chalk.green("✅ Built")]));
  failedPages.forEach((name) => summaryTable.push([name, chalk.red("❌ Failed")]));

  console.log(summaryTable.toString());

  if (failedPages.length > 0) {
    console.log(chalk.red(`\n❌ ${failedPages.length} page(s) failed.\n`));
    process.exit(1);
  } else {
    console.log(chalk.bold.green("\n✅ All pages built successfully!\n"));
  }
}
