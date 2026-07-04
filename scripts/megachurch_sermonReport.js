// megachurch_sermonReport.js
// Usage: bun run megachurch:sermons
//
// Reports how each tag and religion is used across the game's data:
//   - religions (_religions.ts): a religion's likes/dislikes
//   - places (_places.ts): a place population's liked/disliked tags
//   - sermon themes (_sermons.ts): what each theme is likedBy / dislikedBy
// The goal is to surface coverage gaps — tags and religions that few (or no)
// sermon themes serve — so new topics can be authored to fill them.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import Table from "cli-table3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsDir = path.join(__dirname, "../src/views/megachurch/ts");
const typesPath = path.join(tsDir, "_types.ts");
const religionsPath = path.join(tsDir, "_religions.ts");
const placesPath = path.join(tsDir, "_places.ts");
const sermonsPath = path.join(tsDir, "_sermons.ts");
const outputPath = path.join(tsDir, "coverage-report.txt");

// ---------------------------------------------------------------- helpers

function readFileOrExit(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(chalk.red(`\n❌ Could not read ${path.basename(filePath)}: ${err.message}`));
    process.exit(1);
  }
}

// Split a comma-separated list of quoted strings into clean values. Only the
// surrounding quotes are stripped, so names with internal apostrophes (e.g.
// "Jehovah's Witnesses") survive intact.
function splitList(str) {
  return str
    .split(",")
    .map((s) =>
      s
        .trim()
        .replace(/^['"`]|['"`]$/g, "")
        .trim(),
    )
    .filter(Boolean);
}

// Pull the items of a named array (e.g. `tags: [ ... ]`) out of a text block.
function extractArray(block, key) {
  const m = block.match(new RegExp(`${key}\\s*:\\s*\\[([\\s\\S]*?)\\]`));
  return m ? splitList(m[1]) : [];
}

const countOf = (arr, value) => arr.filter((x) => x === value).length;

// ------------------------------------------------------------- extractors

// The full ordered list of tags, straight from the `Tags` union.
function extractTags(typesContent) {
  const match = typesContent.match(/export type Tags\s*=\s*([\s\S]*?);/);
  if (!match) return [];
  return match[1]
    .split("|")
    .map((s) => s.replace(/['"`]/g, "").trim())
    .filter(Boolean);
}

// Religion display names, in declaration order.
function extractReligionNames(religionsContent) {
  return [...religionsContent.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
}

// Every tag listed in any religion's likes / dislikes.
function extractReligionTagUsage(religionsContent) {
  const likes = [...religionsContent.matchAll(/likes:\s*\[([\s\S]*?)\]/g)].flatMap((m) => splitList(m[1]));
  const dislikes = [...religionsContent.matchAll(/dislikes:\s*\[([\s\S]*?)\]/g)].flatMap((m) => splitList(m[1]));
  return { likes, dislikes };
}

// Every tag listed in any place's likedTags / dislikedTags.
function extractPlaceTagUsage(placesContent) {
  const likes = [...placesContent.matchAll(/likedTags:\s*\[([\s\S]*?)\]/g)].flatMap((m) => splitList(m[1]));
  const dislikes = [...placesContent.matchAll(/dislikedTags:\s*\[([\s\S]*?)\]/g)].flatMap((m) => splitList(m[1]));
  return { likes, dislikes };
}

// Tags and religions referenced by each sermon theme's likedBy / dislikedBy.
// Every theme has a `likedBy: { ... }` block immediately followed by a
// `dislikedBy: { ... }` block; neither contains nested braces, so a lazy
// match to the first `}` captures each block cleanly.
function extractThemeUsage(sermonsContent) {
  const tags = { liked: [], disliked: [] };
  const religions = { liked: [], disliked: [] };
  const blocks = [...sermonsContent.matchAll(/likedBy:\s*\{([\s\S]*?)\}\s*,\s*dislikedBy:\s*\{([\s\S]*?)\}\s*,/g)];
  blocks.forEach(([, likedBlock, dislikedBlock]) => {
    tags.liked.push(...extractArray(likedBlock, "tags"));
    tags.disliked.push(...extractArray(dislikedBlock, "tags"));
    religions.liked.push(...extractArray(likedBlock, "religions"));
    religions.disliked.push(...extractArray(dislikedBlock, "religions"));
  });
  return { tags, religions, count: blocks.length };
}

// ------------------------------------------------------------------- load

const typesContent = readFileOrExit(typesPath);
const religionsContent = readFileOrExit(religionsPath);
const placesContent = readFileOrExit(placesPath);
const sermonsContent = readFileOrExit(sermonsPath);

const tags = extractTags(typesContent);
const religionNames = extractReligionNames(religionsContent);
const religionTagUsage = extractReligionTagUsage(religionsContent);
const placeTagUsage = extractPlaceTagUsage(placesContent);
const themeUsage = extractThemeUsage(sermonsContent);

// ------------------------------------------------------------------ stats

const tagStats = tags
  .map((tag) => {
    const relL = countOf(religionTagUsage.likes, tag);
    const relD = countOf(religionTagUsage.dislikes, tag);
    const plL = countOf(placeTagUsage.likes, tag);
    const plD = countOf(placeTagUsage.dislikes, tag);
    const thL = countOf(themeUsage.tags.liked, tag);
    const thD = countOf(themeUsage.tags.disliked, tag);
    return {
      tag,
      total: relL + relD + plL + plD + thL + thD,
      themeTotal: thL + thD,
      religion: `${relL}/${relD}`,
      place: `${plL}/${plD}`,
      theme: `${thL}/${thD}`,
    };
  })
  .sort((a, b) => b.total - a.total);

const religionStats = religionNames
  .map((name) => {
    const liked = countOf(themeUsage.religions.liked, name);
    const disliked = countOf(themeUsage.religions.disliked, name);
    return { name, liked, disliked, total: liked + disliked };
  })
  // Least-served first, so coverage gaps float to the top.
  .sort((a, b) => a.liked - b.liked || a.total - b.total);

// --------------------------------------------------------------- printing

console.log(chalk.bold.blue("\n🇭  Megachurch Tag & Religion Coverage Report"));
console.log(chalk.gray(`Scanned ${themeUsage.count} sermon themes, ${religionNames.length} religions.\n`));

const tagTable = new Table({
  head: [chalk.white("Tag"), chalk.white("Total"), chalk.white("Religion (L/D)"), chalk.white("Place (L/D)"), chalk.white("Theme (L/D)")],
  style: { head: [] },
});
tagStats.forEach((t) => {
  const totalColor = t.total === 0 ? chalk.red : t.total === 1 ? chalk.yellow : chalk.green;
  // Flag tags no sermon touches, even if religions/places use them.
  const themeColor = t.themeTotal === 0 ? chalk.red : chalk.gray;
  tagTable.push([chalk.cyan(t.tag), totalColor(t.total), chalk.gray(t.religion), chalk.gray(t.place), themeColor(t.theme)]);
});
console.log(chalk.bold("Tag usage"));
console.log(tagTable.toString());

const religionTable = new Table({
  head: [chalk.white("Religion"), chalk.white("Themes liked"), chalk.white("Themes disliked")],
  style: { head: [] },
});
religionStats.forEach((r) => {
  const likedColor = r.liked === 0 ? chalk.red : r.liked <= 2 ? chalk.yellow : chalk.green;
  religionTable.push([chalk.cyan(r.name), likedColor(r.liked), chalk.gray(r.disliked)]);
});
console.log(chalk.bold("\nReligion coverage (sorted least-served first)"));
console.log(religionTable.toString());

// ----------------------------------------------------------------- output

const singleUsedTags = tagStats.filter((t) => t.total === 1).map((t) => t.tag);
const unusedTags = tagStats.filter((t) => t.total === 0).map((t) => t.tag);
const tagsNeverInSermon = tagStats.filter((t) => t.themeTotal === 0).map((t) => t.tag);
const underServedReligions = religionStats.filter((r) => r.liked <= 2);

let output = "";
output += "**SINGLE USE TAGS** (used exactly once anywhere)\n";
output += singleUsedTags.join("\n") + "\n\n";
output += "**UNUSED TAGS** (used nowhere)\n";
output += unusedTags.join("\n") + "\n\n";
output += "**TAGS NEVER USED BY A SERMON** (target for new topics)\n";
output += tagsNeverInSermon.join("\n") + "\n\n";
output += "**UNDER-SERVED RELIGIONS** (<= 2 themes appeal to them)\n";
output += underServedReligions.map((r) => `${r.name} — ${r.liked} liked / ${r.disliked} disliked`).join("\n") + "\n";

fs.writeFileSync(outputPath, output, "utf8");
console.log(
  chalk.gray(
    `\nSingle-use: ${chalk.yellow(singleUsedTags.length)} | ` +
      `Unused: ${chalk.red(unusedTags.length)} | ` +
      `Never in a sermon: ${chalk.red(tagsNeverInSermon.length)} | ` +
      `Under-served religions: ${chalk.red(underServedReligions.length)}\n` +
      `Written to ${path.relative(process.cwd(), outputPath)}\n`,
  ),
);
