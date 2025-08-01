const fs = require("fs");

// Read the CSV file
const csvData = fs.readFileSync("src/views/guillotine/csv/forbes_dataset.csv", "utf8");
const lines = csvData.split("\n").slice(1); // Skip header

// Country to flag mapping
const countryToFlag = {
  "United States": "us",
  France: "fr",
  India: "in",
  China: "cn",
  Germany: "de",
  Spain: "es",
  Mexico: "mx",
  Canada: "ca",
  Brazil: "br",
  "United Kingdom": "gb",
  Italy: "it",
  Japan: "jp",
  Russia: "ru",
  "Hong Kong": "hk",
  Taiwan: "tw",
  Switzerland: "ch",
  Australia: "au",
  Sweden: "se",
  Netherlands: "nl",
  "South Korea": "kr",
  Norway: "no",
  Israel: "il",
  Austria: "at",
  Belgium: "be",
  Singapore: "sg",
  Denmark: "dk",
  Finland: "fi",
  Thailand: "th",
  Indonesia: "id",
  Malaysia: "my",
  Philippines: "ph",
  Chile: "cl",
  Colombia: "co",
  Argentina: "ar",
  Peru: "pe",
  "South Africa": "za",
  Nigeria: "ng",
  Egypt: "eg",
  Morocco: "ma",
  Turkey: "tr",
  Greece: "gr",
  Cyprus: "cy",
  Ireland: "ie",
  "New Zealand": "nz",
  "Czech Republic": "cz",
  Poland: "pl",
  Hungary: "hu",
  Ukraine: "ua",
  Georgia: "ge",
  Kazakhstan: "kz",
  Qatar: "qa",
  "Saudi Arabia": "sa",
  "United Arab Emirates": "ae",
  Oman: "om",
  Lebanon: "lb",
  Portugal: "pt",
  Monaco: "mc",
  Liechtenstein: "li",
  Luxembourg: "lu",
  Belize: "bz",
  "St. Kitts and Nevis": "kn",
  Guernsey: "gg",
  Romania: "ro",
  Estonia: "ee",
  Bulgaria: "bg",
  Algeria: "dz",
  Vietnam: "vn",
  "Eswatini (Swaziland)": "sz",
  Venezuela: "ve",
};

// Industry mapping based on source
function getIndustry(source) {
  const s = source.toLowerCase();
  if (
    s.includes("tesla") ||
    s.includes("spacex") ||
    s.includes("automobile") ||
    s.includes("car") ||
    s.includes("automotive") ||
    s.includes("electric vehicle") ||
    s.includes("bmw") ||
    s.includes("ferrari") ||
    s.includes("hyundai")
  )
    return "Automotive";
  if (
    s.includes("amazon") ||
    s.includes("facebook") ||
    s.includes("google") ||
    s.includes("microsoft") ||
    s.includes("oracle") ||
    s.includes("software") ||
    s.includes("tech") ||
    s.includes("internet") ||
    s.includes("online") ||
    s.includes("gaming") ||
    s.includes("semiconductor") ||
    s.includes("computer") ||
    s.includes("apple") ||
    s.includes("zoom") ||
    s.includes("netflix") ||
    s.includes("uber") ||
    s.includes("airbnb") ||
    s.includes("fintech") ||
    s.includes("cryptocurrency") ||
    s.includes("cybersecurity")
  )
    return "Technology";
  if (
    s.includes("lvmh") ||
    s.includes("zara") ||
    s.includes("fashion") ||
    s.includes("luxury") ||
    s.includes("retail") ||
    s.includes("walmart") ||
    s.includes("h&m") ||
    s.includes("nike") ||
    s.includes("supermarket") ||
    s.includes("chanel") ||
    s.includes("lululemon") ||
    s.includes("prada")
  )
    return "Fashion & Retail";
  if (
    s.includes("berkshire") ||
    s.includes("investments") ||
    s.includes("finance") ||
    s.includes("banking") ||
    s.includes("hedge fund") ||
    s.includes("private equity") ||
    s.includes("venture capital") ||
    s.includes("brokerage") ||
    s.includes("money management") ||
    s.includes("trading")
  )
    return "Finance & Investments";
  if (
    s.includes("pharma") ||
    s.includes("biotech") ||
    s.includes("medical") ||
    s.includes("healthcare") ||
    s.includes("hospital") ||
    s.includes("vaccine") ||
    s.includes("drug")
  )
    return "Healthcare & Pharmaceuticals";
  if (
    s.includes("oil") ||
    s.includes("gas") ||
    s.includes("energy") ||
    s.includes("mining") ||
    s.includes("coal") ||
    s.includes("steel") ||
    s.includes("metal") ||
    s.includes("chemical") ||
    s.includes("petrochemical") ||
    s.includes("aluminum") ||
    s.includes("copper") ||
    s.includes("pipeline")
  )
    return "Energy & Materials";
  if (s.includes("real estate") || s.includes("property") || s.includes("construction") || s.includes("cement") || s.includes("building"))
    return "Real Estate & Construction";
  if (
    s.includes("food") ||
    s.includes("beverage") ||
    s.includes("agriculture") ||
    s.includes("restaurant") ||
    s.includes("candy") ||
    s.includes("dairy") ||
    s.includes("beer") ||
    s.includes("liquor") ||
    s.includes("wine") ||
    s.includes("coffee") ||
    s.includes("fast food") ||
    s.includes("meat") ||
    s.includes("chocolate")
  )
    return "Food & Beverage";
  if (
    s.includes("media") ||
    s.includes("entertainment") ||
    s.includes("bloomberg") ||
    s.includes("tv") ||
    s.includes("movie") ||
    s.includes("music") ||
    s.includes("publishing") ||
    s.includes("newspaper")
  )
    return "Media & Entertainment";
  if (s.includes("telecom") || s.includes("cable") || s.includes("mobile") || s.includes("satellite") || s.includes("internet service")) return "Telecom";
  if (s.includes("shipping") || s.includes("logistics") || s.includes("transport") || s.includes("cruise") || s.includes("airline") || s.includes("aviation"))
    return "Transportation & Logistics";
  if (
    s.includes("sport") ||
    s.includes("team") ||
    s.includes("nfl") ||
    s.includes("football") ||
    s.includes("basketball") ||
    s.includes("baseball") ||
    s.includes("soccer") ||
    s.includes("casino") ||
    s.includes("gambling")
  )
    return "Sports & Gaming";
  return "Diversified";
}

// Parse net worth (remove $ and B, convert to number)
function parseNetWorth(netWorthStr) {
  return parseFloat(netWorthStr.replace(/[\$B,]/g, ""));
}

// Parse CSV line (handling quoted values)
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

const billionaires = [];

lines.forEach((line) => {
  if (line.trim()) {
    const fields = parseCSVLine(line);
    if (fields.length >= 8) {
      const rank = parseInt(fields[0]);
      const name = fields[1].trim();
      const netWorth = parseNetWorth(fields[2]);
      const country = fields[7].trim();
      const source = fields[6].trim();

      billionaires.push({
        rank,
        name,
        netWorth,
        country,
        flag: countryToFlag[country] || "unknown",
        source,
        industry: getIndustry(source),
      });
    }
  }
});

// Generate the JavaScript file content
const jsContent = `export const allBillionaires = [
${billionaires
  .map(
    (b) => `  {
    rank: ${b.rank},
    name: "${b.name}",
    netWorth: ${b.netWorth},
    country: "${b.country}",
    flag: "${b.flag}",
    source: "${b.source}",
    industry: "${b.industry}",
  }`,
  )
  .join(",\n")}
];
`;

fs.writeFileSync("src/views/guillotine/js/data/_billionaires.js", jsContent);

console.log(`Generated billionaires data with ${billionaires.length} entries`);
