// megachurch-tag-usage-report.js
// Usage: node scripts/megachurch-tag-usage-report.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load tag types from _types.ts
const typesPath = path.join(__dirname, "../src/views/megachurch/ts/_types.ts");
const religionsPath = path.join(__dirname, "../src/views/megachurch/ts/_religions.ts");

function extractTagsFromTypes(fileContent) {
  const match = fileContent.match(/export type Tags\s*=\s*([\s\S]*?);/);
  if (!match) return [];
  return match[1]
    .split("|")
    .map((s) => s.replace(/['"`]/g, "").trim())
    .filter(Boolean);
}

function extractPopulations(fileContent) {
  const match = fileContent.match(/export const populations:\s*Population\[]\s*=\s*\[(.*)\];/s);
  if (!match) return [];
  // This is a very naive parser, but works for this structure
  const arrStr = match[1];
  const likeMatches = [...arrStr.matchAll(/likes:\s*\[(.*?)\]/gs)];
  const dislikeMatches = [...arrStr.matchAll(/dislikes:\s*\[(.*?)\]/gs)];
  const likes = likeMatches.flatMap((m) =>
    m[1]
      .split(",")
      .map((s) => s.replace(/['"`]/g, "").trim())
      .filter(Boolean),
  );
  const dislikes = dislikeMatches.flatMap((m) =>
    m[1]
      .split(",")
      .map((s) => s.replace(/['"`]/g, "").trim())
      .filter(Boolean),
  );
  return { likes, dislikes };
}

const typesContent = fs.readFileSync(typesPath, "utf8");
const religionsContent = fs.readFileSync(religionsPath, "utf8");

const tags = extractTagsFromTypes(typesContent);
const { likes, dislikes } = extractPopulations(religionsContent);

const tagStats = tags.map((tag) => {
  const likeCount = likes.filter((l) => l === tag).length;
  const dislikeCount = dislikes.filter((d) => d === tag).length;
  return {
    tag,
    total: likeCount + dislikeCount,
    likes: likeCount,
    dislikes: dislikeCount,
  };
});

tagStats.sort((a, b) => b.total - a.total);

console.table(tagStats, ["tag", "total", "likes", "dislikes"]);

// Write unused tags to unusedtags.txt
// Output single-used and unused tags to src/views/megachurch/ts/unused-tags.txt
const singleUsedTags = tagStats.filter((t) => t.total === 1).map((t) => t.tag);
const unusedTags = tagStats.filter((t) => t.total === 0).map((t) => t.tag);
const unusedTagsPath = path.join(__dirname, "../src/views/megachurch/ts/unused-tags.txt");

let output = "**SINGLE USE TAGS**\n";
output += singleUsedTags.join("\n") + "\n\n";
output += "**UNUSED TAGS**\n";
output += unusedTags.join("\n") + "\n";

fs.writeFileSync(unusedTagsPath, output, "utf8");
console.log(`Single-used and unused tags written to src/views/megachurch/ts/unused-tags.txt`);
