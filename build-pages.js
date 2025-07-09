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

    // Now mutate/inject assets for dist output only
    const pageBase = page.name.replace(/\.html$/, "");
    const capitalizedBase = pageBase.charAt(0).toUpperCase() + pageBase.slice(1);
    const assetsDir = path.join(__dirname, "dist", "assets");
    let chunkTags = "";
    let foundChunk = false;
    let mainJs = "";
    let mainCss = "";
    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      // Try capitalized first, then lowercase
      const jsChunk = files.find((f) => new RegExp(`^(${capitalizedBase}|${pageBase})(-[\\w\\d]+)?\\.js$`, "i").test(f));
      const cssChunk = files.find((f) => new RegExp(`^(${capitalizedBase}|${pageBase})(-[\\w\\d]+)?\\.css$`, "i").test(f));
      if (cssChunk) {
        chunkTags += `<link rel=\"stylesheet\" href=\"/assets/${cssChunk}\">\n`;
        foundChunk = true;
      }
      if (jsChunk) {
        chunkTags += `<script type=\"module\" src=\"/assets/${jsChunk}\"></script>\n`;
        foundChunk = true;
      }
      // Always find main index js/css for fallback
      mainJs = files.find((f) => /^index(-[\w\d]+)?\.js$/i.test(f));
      mainCss = files.find((f) => /^index(-[\w\d]+)?\.css$/i.test(f));
    }
    // Fallback to main index assets if no chunk found
    if (!foundChunk) {
      if (mainCss) chunkTags += `<link rel=\"stylesheet\" href=\"/assets/${mainCss}\">\n`;
      if (mainJs) chunkTags += `<script type=\"module\" src=\"/assets/${mainJs}\"></script>\n`;
    }
    // Remove any existing <script type=\"module\" src=\"\/src\/main.js\"><\/script> from html
    let distHtml = html.replace(/<script type=\"module\" src=\"\/src\/main.js\"><\/script>/g, "");
    // Inject tags before </head>
    distHtml = distHtml.replace(/<\/head>/i, chunkTags + "\n</head>");
    fs.writeFileSync(page.out, distHtml, "utf8");
    console.log(`Built ${page.name} with lastUpdated=${lastUpdated} and baseUrl=${baseUrl}`);
  } else {
    console.warn(`Source not found: ${page.src}`);
  }
}
