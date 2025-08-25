import fs from "fs";
import path, { parse } from "path";
import { parseFlag, parseBillions, parseName, parseSource, parseIndustry } from "../../src/views/guillotine/js/parseFunctions.js";

// Read the new CSV file
const csvData = fs.readFileSync("./src/views/guillotine/csv/current-list.csv", "utf8");
const lines = csvData.split("\n").slice(1); // Skip header

// Parse CSV line (handling quoted values and commas)
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Main processing function
function processBillionaire(csvLine) {
  const fields = parseCSVLine(csvLine);
  if (fields.length < 12) return null;

  const rank = fields[0] || 0;
  const name = fields[1] || "";
  const netWorth = fields[2] || 0;
  const prevNetWorth = fields[3] || null;
  let country = fields[4] || "";
  const source = fields[5] || "";
  const industry = fields[6] || "";
  const title = fields[7] || "";
  const org = fields[8] || "";
  const age = fields[9] || "";
  const gender = fields[10] || "";
  const residence = fields[11] || "";
  const citizenship = fields[12] || "";
  const education = fields[13] || "";

  if (!country && residence) {
    // Try to extract country from residence (e.g., "Paris, France" -> "France")
    const parts = residence.split(",");
    if (parts.length > 1) {
      country = parts[parts.length - 1].trim();
    }
  }

  const output = {
    rank,
    name: parseName(name),
    //age,
    netWorth,
    //prevNetWorth,
    country,
    flag: parseFlag(country),
    source: parseSource(name, source),
    industry: parseIndustry(industry, source, name),
    //residence,
  };

  return output;
}

// Process all lines
const billionaires = [];

lines.forEach((line, index) => {
  if (line.trim()) {
    const parsed = processBillionaire(line, index + 1);
    if (parsed && parsed.netWorth > 0) {
      billionaires.push(parsed);
    }
  }
});

// // Sort by net worth (descending) and reassign ranks
// billionaires.sort((a, b) => b.netWorth - a.netWorth);
// billionaires.forEach((billionaire, index) => {
//   billionaire.rank = index + 1;
// });

// // Add King Charles III
// const charles = {
//   rank: billionaires.length + 1,
//   name: "King Charles III",
//   age: 75,
//   netWorth: 2.293,
//   country: "United Kingdom",
//   flag: "gb",
//   source: "jewels, paintings, horses, cars, stolen loot, total immunity from inheritance tax",
//   industry: "The Aristocracy",
//   residence: "London, United Kingdom",
//   manualAdd: true,
//   specialSource: "https://www.theguardian.com/uk-news/ng-interactive/2023/apr/20/revealed-king-charless-private-fortune-estimated-at-almost-2bn",
// };

// billionaires.push(charles);

// Generate the JavaScript file content
const jsContent = `export const allBillionaires = [
${billionaires
  .map(
    (b) => `  {
    rank: ${b.rank},
    name: "${b.name}",${
      b.age
        ? `
    age: ${b.age},`
        : ""
    }
    netWorth: ${b.netWorth},
    country: "${b.country}",
    flag: "${b.flag}",
    source: "${b.source}",
    industry: "${b.industry}",${
      b.residence
        ? `
    residence: "${b.residence}",`
        : ""
    }${
      b.manualAdd
        ? `
    manualAdd: ${b.manualAdd},`
        : ""
    }${
      b.specialSource
        ? `
    specialSource: "${b.specialSource}",`
        : ""
    }
  }`,
  )
  .join(",\n")}
];
`;

fs.writeFileSync("./src/views/guillotine/js/data/_billionaires.js", jsContent);

console.log("\n\x1b[1m\x1b[32m✅ Generated billionaires data\x1b[0m");
console.log(`\x1b[1mTotal entries:\x1b[0m ${billionaires.length}\n`);

console.log("\x1b[1m📊 Breakdown by industry:\x1b[0m");
console.log("----------------------------------------");
const industryCount = {};
billionaires.forEach((b) => {
  industryCount[b.industry] = (industryCount[b.industry] || 0) + 1;
});
Object.entries(industryCount)
  .sort((a, b) => b[1] - a[1])
  .forEach(([industry, count]) => {
    console.log(`\x1b[36m${industry.padEnd(26)}\x1b[0m : \x1b[33m${count}\x1b[0m`);
  });
console.log("----------------------------------------\n");

const minWorth = Math.min(...billionaires.map((b) => b.netWorth));
const maxWorth = Math.max(...billionaires.map((b) => b.netWorth));
console.log(`💰 \x1b[1mNet worth range:\x1b[0m \x1b[32m$${minWorth}B\x1b[0m - \x1b[32m$${maxWorth}B\x1b[0m\n`);
