import fs from "fs";
import path from "path";

// Function to parse CSV files
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n").filter((line) => line.trim());
  const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim());

  return lines.slice(1).map((line) => {
    const values = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // Add the last value

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    return row;
  });
}

// Function to normalize name for matching
function normalizeName(name) {
  let normalized = name.replace(/"/g, "").replace(/\s+/g, " ").trim().toLowerCase();

  // Remove common family suffixes for better matching
  normalized = normalized.replace(/\s*&\s*family$/i, "");
  normalized = normalized.replace(/\s*&\s*family\s*/i, " ");

  // Handle accent variations - convert accented characters to basic versions
  const accentMap = {
    á: "a",
    à: "a",
    ä: "a",
    â: "a",
    ā: "a",
    ã: "a",
    é: "e",
    è: "e",
    ë: "e",
    ê: "e",
    ē: "e",
    í: "i",
    ì: "i",
    ï: "i",
    î: "i",
    ī: "i",
    ó: "o",
    ò: "o",
    ö: "o",
    ô: "o",
    ō: "o",
    õ: "o",
    ú: "u",
    ù: "u",
    ü: "u",
    û: "u",
    ū: "u",
    ç: "c",
    ñ: "n",
    ß: "ss",
  };

  for (const [accented, basic] of Object.entries(accentMap)) {
    normalized = normalized.replace(new RegExp(accented, "g"), basic);
  }

  return normalized;
}

// Function to parse net worth value (remove $, B, M and convert to billions)
function parseNetWorth(value) {
  if (!value) return 0;

  const cleanValue = value.replace(/[$",]/g, "").trim();

  if (cleanValue.includes("B")) {
    return parseFloat(cleanValue.replace("B", ""));
  } else if (cleanValue.includes("M")) {
    return parseFloat(cleanValue.replace("M", "")) / 1000;
  }

  return parseFloat(cleanValue) || 0;
}

// Function to format net worth for output
function formatNetWorth(value) {
  return Math.round(value * 10) / 10; // Round to 1 decimal place
}

// Function to escape CSV field
function escapeCSV(field) {
  if (!field) return "";
  const str = String(field);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function main() {
  console.log("🏛️  Generating current billionaire list...\n");

  // Read the CSV files
  const forbes2024 = parseCSV("./src/views/guillotine/csv/forbes-2024.csv");
  const forbes2025 = parseCSV("./src/views/guillotine/csv/forbes-2025.csv");

  console.log(`📊 Loaded ${forbes2024.length} entries from Forbes 2024`);
  console.log(`📊 Loaded ${forbes2025.length} entries from Forbes 2025\n`);

  // Create a map of 2025 data for quick lookup
  const forbes2025Map = new Map();
  const forbes2025Array = forbes2025; // Keep reference for secondary matching
  forbes2025.forEach((person) => {
    const normalizedName = normalizeName(person.Name);
    forbes2025Map.set(normalizedName, person);
  });

  // Function to find fuzzy matches for names that don't match exactly
  function findFuzzyMatch(name2024, forbes2025Array) {
    const normalized2024 = normalizeName(name2024);

    // Try various fuzzy matching strategies
    for (const person2025 of forbes2025Array) {
      const normalized2025 = normalizeName(person2025.Name);

      // Check if one name contains the other (for family suffix variations)
      if (normalized2024.includes(normalized2025) || normalized2025.includes(normalized2024)) {
        // Make sure it's not a very short match that could be coincidental
        const shorterLength = Math.min(normalized2024.length, normalized2025.length);
        if (shorterLength > 8) {
          // Avoid matching very short names
          return person2025;
        }
      }

      // Check for last name + first name match (for different ordering)
      const words2024 = normalized2024.split(" ").filter((w) => w.length > 2);
      const words2025 = normalized2025.split(" ").filter((w) => w.length > 2);

      if (words2024.length >= 2 && words2025.length >= 2) {
        // Check if both first and last name appear in both
        const commonWords = words2024.filter((word) => words2025.includes(word));
        if (commonWords.length >= 2) {
          return person2025;
        }
      }
    }

    return null;
  }

  // Process the 2024 data and merge with 2025 where available
  const mergedData = [];
  const matched2025Names = new Set();

  // ANSI color codes
  const color = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    magenta: "\x1b[35m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    gray: "\x1b[90m",
  };

  const totalRows = forbes2024.length;
  let lastProgress = -1;
  forbes2024.forEach((person2024, idx) => {
    const normalizedName = normalizeName(person2024.Name);
    let person2025 = forbes2025Map.get(normalizedName);

    // If no exact match, try fuzzy matching
    if (!person2025) {
      person2025 = findFuzzyMatch(person2024.Name, forbes2025Array);
    }

    const netWorth2024 = parseNetWorth(person2024["2024 Net Worth"]);
    let currentNetWorth = netWorth2024;

    if (person2025) {
      currentNetWorth = parseNetWorth(person2025["Net Worth"]);
      const matched2025Name = normalizeName(person2025.Name);
      matched2025Names.add(matched2025Name);
    }

    let prevNetWorthRaw = person2024["2024 Net Worth"];
    let prevNetWorth = "";
    if (person2025 && prevNetWorthRaw && prevNetWorthRaw.trim() !== "") {
      // Only output if original value is present and not zero
      const parsedPrev = parseNetWorth(prevNetWorthRaw);
      prevNetWorth = parsedPrev > 0 ? parsedPrev : "";
    }
    mergedData.push({
      Name: person2024.Name,
      "Net Worth": currentNetWorth,
      "Previous Net Worth": prevNetWorth,
      Country: person2025 ? person2025["Country/Territory"] : person2024.Citizenship,
      "Source of Wealth": person2024["Source of Wealth"],
      Industry: person2024.Industry,
      Title: person2024.Title,
      Organization: person2024.Organization,
      Age: parseInt(person2025 ? person2025.Age : person2024.Age) || 0,
      Gender: person2024.Gender,
      Residence: person2024.Residence,
      Citizenship: person2024.Citizenship,
      Education: person2024.Education,
      "Marital Status": person2024["Marital Status"],
      Children: parseInt(person2024.Children) || 0,
    });
    // Progress bar update every 50 rows
    if (idx % 50 === 0 || idx === totalRows - 1) {
      const percent = Math.floor(((idx + 1) / totalRows) * 100);
      if (percent !== lastProgress) {
        const barLength = 40;
        const filled = Math.floor((barLength * percent) / 100);
        const empty = barLength - filled;
        // Unicode block bar
        const bar = color.cyan + "[" + color.green + "█".repeat(filled) + color.gray + "░".repeat(empty) + color.cyan + "]" + color.reset;
        process.stdout.write(
          `\r${bar} ${color.bold}${percent}%${color.reset} (${color.yellow}${idx + 1}${color.reset}/${color.yellow}${totalRows}${color.reset})`,
        );
        lastProgress = percent;
      }
    }
  });
  process.stdout.write("\n");

  // Find unmatched 2025 entries
  const unmatched2025 = [];
  forbes2025.forEach((person) => {
    const normalizedName = normalizeName(person.Name);
    if (!matched2025Names.has(normalizedName)) {
      unmatched2025.push(person.Name);
    }
  });

  console.log(`\n📋 Found ${unmatched2025.length} people in 2025 list not in 2024 list`);

  // Sort by net worth descending
  mergedData.sort((a, b) => b["Net Worth"] - a["Net Worth"]);

  // Assign ranks (handling ties)
  let currentRank = 1;
  for (let i = 0; i < mergedData.length; i++) {
    if (i > 0 && mergedData[i]["Net Worth"] !== mergedData[i - 1]["Net Worth"]) {
      currentRank = i + 1;
    }
    mergedData[i].Rank = currentRank;
  }

  console.log(`\n🏆 Rankings assigned. Top 5:`);
  mergedData.slice(0, 5).forEach((person) => {
    console.log(`   ${person.Rank}. ${person.Name} - $${formatNetWorth(person["Net Worth"])}B`);
  });

  // Generate CSV content
  const headers = [
    "Rank",
    "Name",
    "Net Worth",
    "Previous Net Worth",
    "Country",
    "Source of Wealth",
    "Industry",
    "Title",
    "Organization",
    "Age",
    "Gender",
    "Residence",
    "Citizenship",
    "Education",
    "Marital Status",
    "Children",
  ];

  let csvContent = headers.join(",") + "\n";

  mergedData.forEach((person) => {
    const row = [
      person.Rank,
      escapeCSV(person.Name),
      formatNetWorth(person["Net Worth"]),
      person["Previous Net Worth"] === "" ? "" : formatNetWorth(person["Previous Net Worth"]),
      escapeCSV(person.Country),
      escapeCSV(person["Source of Wealth"]),
      escapeCSV(person.Industry),
      escapeCSV(person.Title),
      escapeCSV(person.Organization),
      person.Age,
      escapeCSV(person.Gender),
      escapeCSV(person.Residence),
      escapeCSV(person.Citizenship),
      escapeCSV(person.Education),
      escapeCSV(person["Marital Status"]),
      person.Children,
    ];
    csvContent += row.join(",") + "\n";
  });

  // Write the main CSV file
  const outputPath = "./src/views/guillotine/csv/current-list.csv";
  fs.writeFileSync(outputPath, csvContent);
  console.log(`\n✅ Generated: ${color.yellow}${outputPath}${color.reset}`);
  console.log(`📊 Total entries: ${color.yellow}${mergedData.length}${color.reset}`);

  // Write unmatched names to text file
  if (unmatched2025.length > 0) {
    const unmatchedPath = "./src/views/guillotine/csv/unmatched-2025-names.txt";
    const unmatchedContent = "Names in Forbes 2025 that were NOT found in Forbes 2024:\n\n" + unmatched2025.join("\n");
    fs.writeFileSync(unmatchedPath, unmatchedContent);
    console.log(`📝 Unmatched names written to: ${color.yellow}${unmatchedPath}${color.reset}`);
  }

  // Pretty summary with colors
  console.log(`\n${color.bold}${color.blue}🎯 Summary:${color.reset}`);
  console.log(`   - Total billionaires: ${color.yellow}${mergedData.length}${color.reset}`);
  console.log(`   - Updated from 2025: ${color.yellow}${matched2025Names.size}${color.reset}`);
  console.log(`   - Only in 2024: ${color.yellow}${mergedData.length - matched2025Names.size}${color.reset}`);
  console.log(`   - Only in 2025: ${color.yellow}${unmatched2025.length}${color.reset}`);
}

// Run the script
main();
