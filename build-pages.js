import pug from "pug";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//const baseUrl = process.argv[3] || process.env.BASE_URL || "https://kinda.fun";
const baseUrl = process.argv[3] || process.env.BASE_URL || "https://kinda-fun.web.app";
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
];

const arg = process.argv[2];

const filteredPages = arg
  ? pages.filter((page) => page.name.replace(/\.html$/, "") === arg || page.out.endsWith(arg) || page.src.endsWith(arg) || page.name === arg)
  : pages;

for (const page of filteredPages) {
  if (fs.existsSync(page.src)) {
    // Render the Pug template to HTML with build-time variables
    let html = pug.renderFile(page.src, { lastUpdated, baseUrl });

    // --- DIST OUTPUT: inject built asset chunk tags, remove dev script ---
    // 1. Determine the chunk base name for this page (e.g., 'Cameo' for 'cameo.html')
    const pageBase = page.name.replace(/\.html$/, "");
    const chunkBase = pageBase.charAt(0).toUpperCase() + pageBase.slice(1);
    const assetsDir = path.join(__dirname, "dist", "assets");
    let chunkTags = "";
    let foundChunk = false;
    let mainJs = "";
    let mainCss = "";
    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      // 2. Try to find a JS and CSS chunk matching this page (case-insensitive)
      const jsChunk = files.find((f) => new RegExp(`^${chunkBase}(-[\\w\\d]+)?\\.js$`, "i").test(f));
      const cssChunk = files.find((f) => new RegExp(`^${chunkBase}(-[\\w\\d]+)?\\.css$`, "i").test(f));
      if (jsChunk) {
        chunkTags += `<script type=\"module\" src=\"/assets/${jsChunk}\"></script>\n`;
        foundChunk = true;
      }
      if (cssChunk) {
        chunkTags = `<link rel=\"stylesheet\" href=\"/assets/${cssChunk}\">\n` + chunkTags;
        foundChunk = true;
      }
      // 3. Always find main index js/css for fallback if no page-specific chunk
      mainJs = files.find((f) => /^index(-[\w\d]+)?\.js$/i.test(f));
      mainCss = files.find((f) => /^index(-[\w\d]+)?\.css$/i.test(f));
    }
    // 4. Fallback to main index assets if no chunk found
    if (!foundChunk) {
      if (mainCss) chunkTags += `<link rel=\"stylesheet\" href=\"/assets/${mainCss}\">\n`;
      if (mainJs) chunkTags += `<script type=\"module\" src=\"/assets/${mainJs}\"></script>\n`;
    }
    // 5. Remove the dev script from the HTML (for production)
    let distHtml = html.replace(/<script type="module" src="\/src\/main.js"><\/script>/g, "");
    // 6. Inject the built asset tags before </head>
    distHtml = distHtml.replace(/<\/head>/i, chunkTags + "\n</head>");
    // 7. Write the transformed HTML to dist/{filename}.html
    fs.writeFileSync(page.out, distHtml, "utf8");

    // --- ROOT OUTPUT: write original HTML for local dev/file access ---
    // 1. No asset injection, keep the dev script as-is
    // 2. Write the unmodified HTML to {filename}.html in the project root
    const rootOut = path.join(__dirname, page.name);
    fs.writeFileSync(rootOut, html, "utf8");

    // Log the build result
    console.log(`Built ${page.name} with lastUpdated=${lastUpdated} and baseUrl=${baseUrl}`);
  } else {
    console.warn(`Source not found: ${page.src}`);
  }
}
