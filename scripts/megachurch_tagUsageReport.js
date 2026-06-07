// megachurch_tagUsageReport.js
// Usage: node scripts/megachurch_tagUsageReport.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import Table from "cli-table3";

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

function extractReligions(fileContent) {
  const match = fileContent.match(/export const religions:\s*Religion\[]\s*=\s*\[(.*)\];/s);
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

let typesContent, religionsContent;
try {
  typesContent = fs.readFileSync(typesPath, "utf8");
  religionsContent = fs.readFileSync(religionsPath, "utf8");
} catch (err) {
  console.error(chalk.red(`\n❌ Could not read source files: ${err.message}`));
  process.exit(1);
}

const tags = extractTagsFromTypes(typesContent);
const { likes, dislikes } = extractReligions(religionsContent);

// Load and parse places
const placesPath = path.join(__dirname, "../src/views/megachurch/ts/_places.ts");
let placesContent;
try {
  placesContent = fs.readFileSync(placesPath, "utf8");
} catch (err) {
  console.error(chalk.red(`\n❌ Could not read places file: ${err.message}`));
  process.exit(1);
}

function extractTagsFromPlaces(fileContent) {
  const likedMatches = [...fileContent.matchAll(/likedTags:\s*\[(.*?)\]/gs)];
  const dislikedMatches = [...fileContent.matchAll(/dislikedTags:\s*\[(.*?)\]/gs)];
  const likes = likedMatches.flatMap((m) =>
    m[1]
      .split(",")
      .map((s) => s.replace(/['"`]/g, "").trim())
      .filter(Boolean),
  );
  const dislikes = dislikedMatches.flatMap((m) =>
    m[1]
      .split(",")
      .map((s) => s.replace(/['"`]/g, "").trim())
      .filter(Boolean),
  );
  return { likes, dislikes };
}

const { likes: placeLikesArr, dislikes: placeDislikesArr } = extractTagsFromPlaces(placesContent);

const tagStats = tags.map((tag) => {
  const likeCount = likes.filter((l) => l === tag).length;
  const dislikeCount = dislikes.filter((d) => d === tag).length;
  const placeLikeCount = placeLikesArr.filter((l) => l === tag).length;
  const placeDislikeCount = placeDislikesArr.filter((d) => d === tag).length;
  return {
    tag,
    total: likeCount + dislikeCount + placeLikeCount + placeDislikeCount,
    religion: `${likeCount}/${dislikeCount}`,
    place: `${placeLikeCount}/${placeDislikeCount}`,
  };
});

tagStats.sort((a, b) => b.total - a.total);

console.log(chalk.bold.blue("\n🇭  Megachurch Tag Usage Report\n"));

const tagTable = new Table({
  head: [chalk.white("Tag"), chalk.white("Total"), chalk.white("Religion (L/D)"), chalk.white("Place (L/D)")],
  style: { head: [] },
});
tagStats.forEach((t) => {
  const totalColor = t.total === 0 ? chalk.red : t.total === 1 ? chalk.yellow : chalk.green;
  tagTable.push([chalk.cyan(t.tag), totalColor(t.total), chalk.gray(t.religion), chalk.gray(t.place)]);
});
console.log(tagTable.toString());

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
console.log(
  chalk.gray(
    `\nSingle-used: ${chalk.yellow(singleUsedTags.length)} | Unused: ${chalk.red(unusedTags.length)} — written to src/views/megachurch/ts/unused-tags.txt\n`,
  ),
);
