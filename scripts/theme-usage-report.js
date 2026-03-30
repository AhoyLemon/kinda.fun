import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import Table from "cli-table3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the themes file
const themesPath = path.join(__dirname, "..", "src", "views", "megachurch", "ts", "_sermons.ts");
let themesContent;
try {
  themesContent = fs.readFileSync(themesPath, "utf8");
} catch (err) {
  console.error(chalk.red(`\n❌ Could not read _sermons.ts: ${err.message}`));
  process.exit(1);
}

console.log(chalk.bold.blue("\n🏩  Megachurch Theme Usage Report\n"));

const themeMatches = [...themesContent.matchAll(/\{\s*id:\s*(\d+)/g)];
console.log(chalk.gray(`   Total themes analyzed: ${chalk.bold(themeMatches.length)}\n`));

// Extract religions and tags by finding context
const religionStats = {};
const tagStats = {};

// Find all likedBy and dislikedBy sections
const likedByMatches = [...themesContent.matchAll(/likedBy:\s*\{[^}]*?religions:\s*\[(.*?)\]/gs)];
const dislikedByMatches = [...themesContent.matchAll(/dislikedBy:\s*\{[^}]*?religions:\s*\[(.*?)\]/gs)];

// Process liked religions
for (const match of likedByMatches) {
  const religions = match[1]
    .split(",")
    .map((r) => r.trim().replace(/['"]/g, ""))
    .filter((r) => r.length > 0);

  religions.forEach((religion) => {
    if (!religionStats[religion]) {
      religionStats[religion] = { liked: 0, disliked: 0 };
    }
    religionStats[religion].liked++;
  });
}

// Process disliked religions
for (const match of dislikedByMatches) {
  const religions = match[1]
    .split(",")
    .map((r) => r.trim().replace(/['"]/g, ""))
    .filter((r) => r.length > 0);

  religions.forEach((religion) => {
    if (!religionStats[religion]) {
      religionStats[religion] = { liked: 0, disliked: 0 };
    }
    religionStats[religion].disliked++;
  });
}

// Find all likedBy and dislikedBy tag sections
const likedByTagMatches = [...themesContent.matchAll(/likedBy:\s*\{[^}]*?tags:\s*\[\s*(.*?)\s*\]/gs)];
const dislikedByTagMatches = [...themesContent.matchAll(/dislikedBy:\s*\{[^}]*?tags:\s*\[\s*(.*?)\s*\]/gs)];

// Process liked tags
for (const match of likedByTagMatches) {
  const tags = match[1]
    .split(",")
    .map((t) => t.trim().replace(/['"]/g, ""))
    .filter((t) => t.length > 0);

  tags.forEach((tag) => {
    if (!tagStats[tag]) {
      tagStats[tag] = { liked: 0, disliked: 0 };
    }
    tagStats[tag].liked++;
  });
}

// Process disliked tags
for (const match of dislikedByTagMatches) {
  const tags = match[1]
    .split(",")
    .map((t) => t.trim().replace(/['"]/g, ""))
    .filter((t) => t.length > 0);

  tags.forEach((tag) => {
    if (!tagStats[tag]) {
      tagStats[tag] = { liked: 0, disliked: 0 };
    }
    tagStats[tag].disliked++;
  });
}

// Religion analysis
console.log(chalk.bold.cyan("\n🛉  Religion Usage (sorted by total)\n"));
const religionEntries = Object.entries(religionStats)
  .map(([name, stats]) => ({
    name,
    liked: stats.liked,
    disliked: stats.disliked,
    total: stats.liked + stats.disliked,
  }))
  .sort((a, b) => b.total - a.total);

const religionTable = new Table({
  head: [chalk.white("Religion"), chalk.white("Total"), chalk.white("Liked"), chalk.white("Disliked")],
  style: { head: [] },
});
religionEntries.forEach((r) => {
  religionTable.push([chalk.cyan(r.name), chalk.yellow(r.total), chalk.green(r.liked), chalk.red(r.disliked)]);
});
console.log(religionTable.toString());

// Find underrepresented religions
console.log(chalk.bold.yellow("\n⚠️  Underrepresented Religions (\u22642 uses)\n"));
const underReligions = religionEntries.filter((r) => r.total <= 2);
if (underReligions.length === 0) {
  console.log(chalk.gray("   None — all religions well represented!\n"));
} else {
  underReligions.forEach((religion) => {
    console.log(chalk.yellow(`   • ${religion.name}: ${religion.total} time(s)`));
  });
}

// Tag analysis
console.log(chalk.bold.cyan("\n🏷️  Tag Usage — Top 20\n"));
const tagEntries = Object.entries(tagStats)
  .map(([name, stats]) => ({
    name,
    liked: stats.liked,
    disliked: stats.disliked,
    total: stats.liked + stats.disliked,
  }))
  .sort((a, b) => b.total - a.total);

const tagTable = new Table({
  head: [chalk.white("Tag"), chalk.white("Total"), chalk.white("Liked"), chalk.white("Disliked")],
  style: { head: [] },
});
tagEntries.slice(0, 20).forEach((tag) => {
  tagTable.push([chalk.cyan(tag.name), chalk.yellow(tag.total), chalk.green(tag.liked), chalk.red(tag.disliked)]);
});
console.log(tagTable.toString());

// Find underrepresented tags
console.log(chalk.bold.yellow("\n⚠️  Underrepresented Tags (\u22642 uses)\n"));
const underrepresentedTags = tagEntries.filter((t) => t.total <= 2);
console.log(chalk.gray(`   ${underrepresentedTags.length} tag(s):`));
underrepresentedTags.forEach((tag) => {
  console.log(chalk.yellow(`   • ${tag.name}: ${tag.total} time(s)`));
});

// Find completely unused tags
const typesPath = path.join(__dirname, "..", "src", "views", "megachurch", "ts", "_types.ts");
let typesContent;
try {
  typesContent = fs.readFileSync(typesPath, "utf8");
} catch (err) {
  console.error(chalk.red(`\n❌ Could not read _types.ts: ${err.message}`));
  process.exit(1);
}
const tagsMatch = typesContent.match(/export type Tags =\s*([\s\S]*?);/);

if (tagsMatch) {
  const allTags = tagsMatch[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"))
    .map((line) => line.replace(/^\|\s*"([^"]*)".*$/, "$1"))
    .filter((tag) => tag.length > 0);

  const usedTags = new Set(tagEntries.map((t) => t.name));
  const unusedTags = allTags.filter((tag) => !usedTags.has(tag));

  console.log(chalk.bold.red(`\n❌ Completely Unused Tags (${unusedTags.length} total):\n`));
  unusedTags.forEach((tag) => {
    console.log(chalk.red(`   • ${tag}`));
  });
}

// Balance analysis
console.log(chalk.bold.magenta("\n⚖️  Balance Issues\n"));
let issueCount = 0;
religionEntries.forEach((religion) => {
  if (religion.total === 0) return;

  const ratio = religion.liked === 0 ? `0:${religion.disliked}` : religion.disliked === 0 ? `${religion.liked}:0` : `${religion.liked}:${religion.disliked}`;

  const likeRatio = religion.disliked === 0 ? Infinity : religion.liked / religion.disliked;
  const dislikeRatio = religion.liked === 0 ? Infinity : religion.disliked / religion.liked;

  if (likeRatio > 3 || dislikeRatio > 3 || religion.liked === 0 || religion.disliked === 0) {
    let issue = "";
    if (religion.liked === 0) issue = "NO LIKES";
    else if (religion.disliked === 0) issue = "NO DISLIKES";
    else if (dislikeRatio > 3) issue = "TOO MANY DISLIKES";
    else if (likeRatio > 3) issue = "TOO MANY LIKES";

    console.log(chalk.yellow(`   ⚠️  ${religion.name}: ${ratio} (${chalk.red(issue)})`));
    issueCount++;
  }
});
if (issueCount === 0) console.log(chalk.green("   ✅ No balance issues detected.\n"));
else console.log("");
