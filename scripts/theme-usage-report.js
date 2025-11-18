import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the themes file
const themesPath = path.join(__dirname, "..", "src", "views", "megachurch", "ts", "_sermons.ts");
const themesContent = fs.readFileSync(themesPath, "utf8");

console.log("=== THEME USAGE ANALYSIS ===");

// Count total themes
const themeMatches = [...themesContent.matchAll(/\{\s*id:\s*(\d+)/g)];
console.log(`Total themes analyzed: ${themeMatches.length}`);

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
console.log("\n=== RELIGION USAGE (sorted by total) ===");
const religionEntries = Object.entries(religionStats)
  .map(([name, stats]) => ({
    name,
    liked: stats.liked,
    disliked: stats.disliked,
    total: stats.liked + stats.disliked,
  }))
  .sort((a, b) => b.total - a.total);

religionEntries.forEach((religion) => {
  console.log(`${religion.name}: ${religion.total} total (${religion.liked} liked, ${religion.disliked} disliked)`);
});

// Find underrepresented religions
console.log("\n=== UNDERREPRESENTED RELIGIONS ===");
console.log("Religions used 2 times or less:");
religionEntries
  .filter((r) => r.total <= 2)
  .forEach((religion) => {
    console.log(`- ${religion.name}: ${religion.total} times`);
  });

// Tag analysis
console.log("\n=== TAG USAGE (sorted by total) ===");
const tagEntries = Object.entries(tagStats)
  .map(([name, stats]) => ({
    name,
    liked: stats.liked,
    disliked: stats.disliked,
    total: stats.liked + stats.disliked,
  }))
  .sort((a, b) => b.total - a.total);

console.log("Top 20 most used tags:");
tagEntries.slice(0, 20).forEach((tag) => {
  console.log(`${tag.name}: ${tag.total} total (${tag.liked} liked, ${tag.disliked} disliked)`);
});

// Find underrepresented tags
console.log("\n=== UNDERREPRESENTED TAGS ===");
const underrepresentedTags = tagEntries.filter((t) => t.total <= 2);
console.log(`Tags used 2 times or less (${underrepresentedTags.length} total):`);
underrepresentedTags.forEach((tag) => {
  console.log(`- ${tag.name}: ${tag.total} times`);
});

// Find completely unused tags by reading the types file
const typesPath = path.join(__dirname, "..", "src", "views", "megachurch", "ts", "_types.ts");
const typesContent = fs.readFileSync(typesPath, "utf8");
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

  console.log(`\nCompletely unused tags (${unusedTags.length} total):`);
  unusedTags.forEach((tag) => {
    console.log(`- ${tag}`);
  });
}

// Balance analysis
console.log("\n=== BALANCE ISSUES ===");
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

    console.log(`⚠️  ${religion.name}: ${ratio} (${issue})`);
  }
});
