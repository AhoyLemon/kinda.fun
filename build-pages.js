import pug from "pug";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = process.argv[3] || process.env.BASE_URL || "https://kinda.fun";
const lastUpdated = new Date().toISOString();

const pages = [
  {
    src: path.join(__dirname, "src", "views", "cameo", "Page.pug"),
    out: path.join(__dirname, "cameo.html"),
    name: "cameo.html",
  },
  {
    src: path.join(__dirname, "src", "views", "guillotine", "Page.pug"),
    out: path.join(__dirname, "guillotine.html"),
    name: "guillotine.html",
  },
  {
    src: path.join(__dirname, "src", "views", "home", "Page.pug"),
    out: path.join(__dirname, "index.html"),
    name: "index.html",
  },
  {
    src: path.join(__dirname, "src", "views", "invalid", "Page.pug"),
    out: path.join(__dirname, "invalid.html"),
    name: "invalid.html",
  },
  {
    src: path.join(__dirname, "src", "views", "meeting", "Page.pug"),
    out: path.join(__dirname, "meeting.html"),
    name: "meeting.html",
  },
  {
    src: path.join(__dirname, "src", "views", "pretend", "Page.pug"),
    out: path.join(__dirname, "pretend.html"),
    name: "pretend.html",
  },
  {
    src: path.join(__dirname, "src", "views", "sisyphus", "Page.pug"),
    out: path.join(__dirname, "sisyphus.html"),
    name: "sisyphus.html",
  },
  {
    src: path.join(__dirname, "src", "views", "wrongest", "Page.pug"),
    out: path.join(__dirname, "wrongest.html"),
    name: "wrongest.html",
  },
  {
    src: path.join(__dirname, "src", "views", "stats", "Page.pug"),
    out: path.join(__dirname, "stats.html"),
    name: "stats.html",
  },
];

const arg = process.argv[2];

const filteredPages = arg
  ? pages.filter((page) => page.name.replace(/\.html$/, "") === arg || page.out.endsWith(arg) || page.src.endsWith(arg) || page.name === arg)
  : pages;

for (const page of filteredPages) {
  if (fs.existsSync(page.src)) {
    const html = pug.renderFile(page.src, { lastUpdated, baseUrl });
    fs.writeFileSync(page.out, html, "utf8");
    console.log(`Built ${page.name} with lastUpdated=${lastUpdated} and baseUrl=${baseUrl}`);
  } else {
    console.warn(`Source not found: ${page.src}`);
  }
}
