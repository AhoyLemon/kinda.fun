// scripts/firebase/aggregateCameoValuations.js
// Usage: node scripts/firebase/aggregateCameoValuations.js
// Aggregates average playerValue for each cameoName from the CSV, filtering out values <10 or >1000.
// Outputs a CSV with cameoName, actualValue, playerValue, playerValueCount

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Helper to parse CSV
function parseCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  const headers = lines[0].replace(/"/g, "").split(",");
  return lines.slice(1).map((line) => {
    const values = line.match(/("[^"]*"|[^,]+)/g).map((v) => v.replace(/"/g, ""));
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i];
    });
    return obj;
  });
}

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function aggregateCameoValuations() {
  const csvPath = join(__dirname, "./OLD_SQL/cameoValuations.csv");
  const outPath = join(__dirname, "./OLD_SQL/cameoValuations.aggregated.csv");
  const csvText = readFileSync(csvPath, "utf8");
  const rows = parseCSV(csvText);

  // cameoName -> { actualValue, playerValueSum, playerValueCount }
  const cameoMap = new Map();

  for (const row of rows) {
    const cameoName = row.cameoName;
    const actualValue = parseInt(row.actualValue, 10);
    const playerValue = parseInt(row.playerValue, 10);
    if (isNaN(playerValue) || playerValue < 10 || playerValue > 1000) continue;
    if (!cameoMap.has(cameoName)) {
      cameoMap.set(cameoName, {
        actualValue,
        playerValueSum: 0,
        playerValueCount: 0,
      });
    }
    const entry = cameoMap.get(cameoName);
    entry.playerValueSum += playerValue;
    entry.playerValueCount++;
    // Always update actualValue to the latest (if it changes between rows)
    entry.actualValue = actualValue;
  }

  // Prepare output CSV
  let outCSV = '"cameoName",averagePlayerValue,actualValue,playerValueCount\n';
  for (const [cameoName, entry] of cameoMap.entries()) {
    const avgPlayerValue = entry.playerValueCount > 0 ? Math.round(entry.playerValueSum / entry.playerValueCount) : 0;
    outCSV += `"${cameoName}",${avgPlayerValue},${entry.actualValue},${entry.playerValueCount}\n`;
  }

  writeFileSync(outPath, outCSV, "utf8");
  console.log(`✅ Aggregation complete. Output written to ${outPath}`);
}

aggregateCameoValuations().catch((err) => {
  console.error("❌ Error in aggregateCameoValuations:", err);
  process.exit(1);
});
