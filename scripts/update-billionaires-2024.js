import fs from "fs";
import path from "path";

// Read the new CSV file
const csvData = fs.readFileSync("./src/views/guillotine/csv/2024 Billionaire List.csv", "utf8");
const lines = csvData.split("\n").slice(1); // Skip header

// Country to flag mapping
function parseFlag(country) {
  switch (country.trim()) {
    case "United States":
      return "us";
    case "France":
      return "fr";
    case "India":
      return "in";
    case "Mexico":
      return "mx";
    case "China":
      return "cn";
    case "Canada":
      return "ca";
    case "Spain":
      return "es";
    case "Germany":
      return "de";
    case "Hong Kong":
      return "hk";
    case "Italy":
      return "it";
    case "Australia":
      return "au";
    case "Austria":
      return "at";
    case "Japan":
      return "jp";
    case "Indonesia":
      return "id";
    case "Switzerland":
      return "ch";
    case "Chile":
      return "cl";
    case "Russia":
      return "ru";
    case "Singapore":
      return "sg";
    case "Sweden":
      return "se";
    case "Israel":
      return "il";
    case "Brazil":
      return "br";
    case "Netherlands":
      return "nl";
    case "Philippines":
      return "ph";
    case "Turkey":
      return "tr";
    case "Ireland":
      return "ie";
    case "Nigeria":
      return "ng";
    case "Thailand":
      return "th";
    case "Denmark":
      return "dk";
    case "Cyprus":
      return "cy";
    case "Malaysia":
      return "my";
    case "Taiwan":
      return "tw";
    case "Monaco":
      return "mc";
    case "Colombia":
      return "co";
    case "New Zealand":
      return "nz";
    case "South Korea":
      return "kr";
    case "Belgium":
      return "be";
    case "South Africa":
      return "za";
    case "Egypt":
      return "eg";
    case "Greece":
      return "gr";
    case "Norway":
      return "no";
    case "Vietnam":
      return "vn";
    case "Poland":
      return "pl";
    case "Peru":
      return "pe";
    case "Algeria":
      return "dz";
    case "Kazakhstan":
      return "kz";
    case "Georgia":
      return "ge";
    case "Portugal":
      return "pt";
    case "Finland":
      return "fi";
    case "Ukraine":
      return "ua";
    case "Argentina":
      return "ar";
    case "Belize":
      return "bz";
    case "Venezuela":
      return "ve";
    case "Lebanon":
      return "lb";
    case "Zimbabwe":
      return "zw";
    case "Romania":
      return "ro";
    case "United Arab Emirates":
      return "ae";
    case "Saudi Arabia":
      return "sa";
    case "Oman":
      return "om";
    case "Iceland":
      return "is";
    case "Guernsey":
      return "gg";
    case "Liechtenstein":
      return "li";
    case "Qatar":
      return "qa";
    case "Morocco":
      return "ma";
    case "Bulgaria":
      return "bg";
    case "Macau":
      return "mo";
    case "Slovakia":
      return "sk";
    case "Barbados":
      return "bb";
    case "Uruguay":
      return "uy";
    case "Nepal":
      return "np";
    case "Hungary":
      return "hu";
    case "Tanzania":
      return "tz";
    case "Estonia":
      return "ee";
    case "St. Kitts and Nevis":
      return "kn";
    case "Eswatini (Swaziland)":
      return "sz";
    case "Czechia":
    case "Czech Republic":
      return "cz";
    case "United Kingdom":
    case "Great Britain":
      return "gb";
    case "Luxembourg":
      return "lu";
    case "Slovenia":
      return "si";
    case "Latvia":
      return "lv";
    case "Lithuania":
      return "lt";
    case "Croatia":
      return "hr";
    case "Serbia":
      return "rs";
    case "Moldova":
      return "md";
    case "Belarus":
      return "by";
    case "Azerbaijan":
      return "az";
    case "Armenia":
      return "am";
    case "Kyrgyzstan":
      return "kg";
    case "Uzbekistan":
      return "uz";
    case "Tajikistan":
      return "tj";
    case "Turkmenistan":
      return "tm";
    case "Afghanistan":
      return "af";
    case "Pakistan":
      return "pk";
    case "Bangladesh":
      return "bd";
    case "Sri Lanka":
      return "lk";
    case "Myanmar":
      return "mm";
    case "Cambodia":
      return "kh";
    case "Laos":
      return "la";
    case "Mongolia":
      return "mn";
    case "North Korea":
      return "kp";
    case "Brunei":
      return "bn";
    case "Maldives":
      return "mv";
    case "Bhutan":
      return "bt";
    case "East Timor":
      return "tl";
    case "Fiji":
      return "fj";
    case "Papua New Guinea":
      return "pg";
    case "Solomon Islands":
      return "sb";
    case "Vanuatu":
      return "vu";
    case "Samoa":
      return "ws";
    case "Tonga":
      return "to";
    case "Kiribati":
      return "ki";
    case "Tuvalu":
      return "tv";
    case "Nauru":
      return "nr";
    case "Palau":
      return "pw";
    case "Marshall Islands":
      return "mh";
    case "Micronesia":
      return "fm";
    default:
      return "flagMissing";
  }
}

// Parse net worth (remove $ and B, convert to number)
function parseBillions(str) {
  if (!str || str === "N/A") return 0;

  // Remove $ and any spaces
  let cleaned = str.replace(/[\$\s]/g, "");

  // Handle billions (B)
  if (cleaned.includes("B")) {
    return parseFloat(cleaned.replace("B", ""));
  }

  // Handle millions (M) - convert to billions
  if (cleaned.includes("M")) {
    return parseFloat(cleaned.replace("M", "")) / 1000;
  }

  // Handle thousands (K) - convert to billions
  if (cleaned.includes("K")) {
    return parseFloat(cleaned.replace("K", "")) / 1000000;
  }

  // If no suffix, assume billions
  return parseFloat(cleaned) || 0;
}

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
function processBillionaire(csvLine, rank) {
  const fields = parseCSVLine(csvLine);
  if (fields.length < 12) return null;

  const name = fields[0] || "";
  const age = parseInt(fields[1]) || null;
  const netWorth = parseBillions(fields[2]);
  const industry = fields[3] || "Diversified";
  const source = fields[4] || "";
  const residence = fields[10] || "";
  const citizenship = fields[11] || "";

  // Extract country from citizenship or residence
  let country = citizenship;
  if (!country && residence) {
    // Try to extract country from residence (e.g., "Paris, France" -> "France")
    const parts = residence.split(",");
    if (parts.length > 1) {
      country = parts[parts.length - 1].trim();
    }
  }

  const output = {
    rank,
    name,
    age,
    netWorth,
    country,
    flag: parseFlag(country),
    source,
    industry,
    residence,
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

// Sort by net worth (descending) and reassign ranks
billionaires.sort((a, b) => b.netWorth - a.netWorth);
billionaires.forEach((billionaire, index) => {
  billionaire.rank = index + 1;
});

// Add King Charles III
const charles = {
  rank: billionaires.length + 1,
  name: "King Charles III",
  age: 75,
  netWorth: 2.293,
  country: "United Kingdom",
  flag: "gb",
  source: "jewels, paintings, horses, cars, stolen loot, total immunity from inheritance tax",
  industry: "The Aristocracy",
  residence: "London, United Kingdom",
  manualAdd: true,
  specialSource: "https://www.theguardian.com/uk-news/ng-interactive/2023/apr/20/revealed-king-charless-private-fortune-estimated-at-almost-2bn",
};

billionaires.push(charles);

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

console.log(`✅ Generated billionaires data with ${billionaires.length} entries`);
console.log(`📊 Breakdown by industry:`);

// Count by industry
const industryCount = {};
billionaires.forEach((b) => {
  industryCount[b.industry] = (industryCount[b.industry] || 0) + 1;
});

Object.entries(industryCount)
  .sort((a, b) => b[1] - a[1])
  .forEach(([industry, count]) => {
    console.log(`   ${industry}: ${count}`);
  });

console.log(`💰 Net worth range: $${Math.min(...billionaires.map((b) => b.netWorth))}B - $${Math.max(...billionaires.map((b) => b.netWorth))}B`);
