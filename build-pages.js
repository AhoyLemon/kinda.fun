import pug from "pug";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import beautify from "js-beautify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = process.argv[3] || process.env.BASE_URL || "https://kinda.fun";
const lastUpdated = new Date().toISOString();

// Ensure dist directory exists
fs.mkdirSync(path.join(__dirname, "dist"), { recursive: true });

const pages = [
  {
    src: path.join(__dirname, "src", "views", "cameo", "Page.pug"),
    out: path.join(__dirname, "dist", "cameo.html"),
    name: "cameo.html",
  },
  {
    src: path.join(__dirname, "src", "views", "guillotine", "Page.pug"),
    out: path.join(__dirname, "dist", "guillotine.html"),
    name: "guillotine.html",
  },
  {
    src: path.join(__dirname, "src", "views", "invalid", "Page.pug"),
    out: path.join(__dirname, "dist", "invalid.html"),
    name: "invalid.html",
  },
  {
    src: path.join(__dirname, "src", "views", "meeting", "Page.pug"),
    out: path.join(__dirname, "dist", "meeting.html"),
    name: "meeting.html",
  },
  {
    src: path.join(__dirname, "src", "views", "pretend", "Page.pug"),
    out: path.join(__dirname, "dist", "pretend.html"),
    name: "pretend.html",
  },
  {
    src: path.join(__dirname, "src", "views", "sisyphus", "Page.pug"),
    out: path.join(__dirname, "dist", "sisyphus.html"),
    name: "sisyphus.html",
  },
  {
    src: path.join(__dirname, "src", "views", "wrongest", "Page.pug"),
    out: path.join(__dirname, "dist", "wrongest.html"),
    name: "wrongest.html",
  },
  {
    src: path.join(__dirname, "src", "views", "stats", "Page.pug"),
    out: path.join(__dirname, "dist", "stats.html"),
    name: "stats.html",
  },
  {
    src: path.join(__dirname, "src", "views", "home", "Page.pug"),
    out: path.join(__dirname, "dist", "home.html"),
    name: "home.html",
  },
  {
    src: path.join(__dirname, "src", "views", "404", "Page.pug"),
    out: path.join(__dirname, "dist", "404.html"),
    name: "404.html",
  },
];

const arg = process.argv[2];

const filteredPages = arg
  ? pages.filter((page) => page.name.replace(/\.html$/, "") === arg || page.out.endsWith(arg) || page.src.endsWith(arg) || page.name === arg)
  : pages;

for (const page of filteredPages) {
  if (fs.existsSync(page.src)) {
    let html = pug.renderFile(page.src, { lastUpdated, baseUrl });
    // Write pretty, unmodified HTML to the project root
    const prettyHtml = beautify.html(html, { indent_size: 2, wrap_line_length: 120 });
    fs.writeFileSync(path.join(__dirname, page.name), prettyHtml, "utf8");
    // Write the same HTML to dist (with script src replaced for production)
    let distHtml = prettyHtml.replace(
      new RegExp(`<script type=\"module\" src=\"/src/entries/([a-zA-Z0-9_-]+)\\.js\"></script>`, "g"),
      (match, p1) => `<script type=\"module\" src=\"/${p1}.js\"></script>`,
    );
    fs.writeFileSync(page.out, distHtml, "utf8");
    console.log(`Built ${page.name} with lastUpdated=${lastUpdated} and baseUrl=${baseUrl}`);
  } else {
    console.warn(`Source not found: ${page.src}`);
  }
}
