import pug from "pug";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import beautify from "js-beautify";

/*
 * build-pages.js
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
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
fs.mkdirSync(DIST_DIR, { recursive: true });

// Step 3: Define all pages to build
const PROJECT_ROOT = process.cwd();
const SRC_DIR = path.join(PROJECT_ROOT, "src");

const pages = [
  {
    src: path.join(SRC_DIR, "views", "cameo", "Page.pug"),
    out: path.join(DIST_DIR, "cameo.html"),
    name: "cameo.html",
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

const arg = process.argv[2];

// Step 4: Optionally filter which pages to build via CLI arg
const filteredPages = arg
  ? pages.filter((page) => page.name.replace(/\.html$/, "") === arg || page.out.endsWith(arg) || page.src.endsWith(arg) || page.name === arg)
  : pages;

// Step 5: For each page, render, beautify, and write output

// Collect output info for grouped table
const groupedTable = [];

for (const page of filteredPages) {
  if (fs.existsSync(page.src)) {
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
      (match, p1) => `<script type="module" src="/${p1}.js"></script>`,
    );
    // e. Write the dist HTML (production version)
    fs.writeFileSync(page.out, distHtml, "utf8");
    // f. Add grouped info for table
    groupedTable.push({
      Page: page.name,
      DevBaseUrl: devBaseUrl,
      DistBaseUrl: distBaseUrl,
      LastUpdated: lastUpdated,
    });
  } else {
    console.warn(`Source not found: ${page.src}`);
  }
}

// Print grouped output table (with single quotes around string cells)
console.table(groupedTable);
