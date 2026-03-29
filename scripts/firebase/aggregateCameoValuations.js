// scripts/firebase/aggregateCameoValuations.js
// Aggregates average playerValue per celebrity from cameoValuations.csv,
// filtering out values <10 or >1000. Outputs cameoValuations.aggregated.csv.
//
// Usage: node scripts/firebase/aggregateCameoValuations.js

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import Table from "cli-table3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function parseCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  const headers = lines[0].replace(/"/g, "").split(",");
  return lines.slice(1).map((line) => {
    const values = line.match(/("[^"]*"|[^,]+)/g).map((v) => v.replace(/"/g, ""));
    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i]; });
    return obj;
  });
}

async function main() {
  console.log(chalk.bold.blue("\n🧭 Aggregate Cameo Valuations\n"));

  const csvPath = join(__dirname, "./OLD_SQL/cameoValuations.csv");
  const outPath = join(__dirname, "./OLD_SQL/cameoValuations.aggregated.csv");

  if (!existsSync(csvPath)) {
    console.error(chalk.red(`\n❌ Source file not found:\n   ${csvPath}`));
    process.exit(1);
  }

  console.log(chalk.yellow("📂 Reading cameoValuations.csv..."));
  const csvText = readFileSync(csvPath, "utf8");
  const rows = parseCSV(csvText);
  console.log(chalk.gray(`   ${rows.length.toLocaleString()} rows loaded.\n`));

  const cameoMap = new Map();
  let filtered = 0;

  for (const row of rows) {
    const cameoName = row.cameoName;
    const actualValue = parseInt(row.actualValue, 10);
    const playerValue = parseInt(row.playerValue, 10);
    if (isNaN(playerValue) || playerValue < 10 || playerValue > 1000) {
      filtered++;
      continue;
    }
    if (!cameoMap.has(cameoName)) {
      cameoMap.set(cameoName, { actualValue, playerValueSum: 0, playerValueCount: 0 });
    }
    const entry = cameoMap.get(cameoName);
    entry.playerValueSum += playerValue;
    entry.playerValueCount++;
    entry.actualValue = actualValue;
  }

  let outCSV = '"cameoName",averagePlayerValue,actualValue,playerValueCount\n';
  for (const [cameoName, entry] of cameoMap.entries()) {
    const avgPlayerValue = entry.playerValueCount > 0 ? Math.round(entry.playerValueSum / entry.playerValueCount) : 0;
    outCSV += `"${cameoName}",${avgPlayerValue},${entry.actualValue},${entry.playerValueCount}\n`;
  }

  writeFileSync(outPath, outCSV, "utf8");

  const summaryTable = new Table({
    head: [chalk.white("Stat"), chalk.white("Value")],
    style: { head: [] },
  });
  summaryTable.push(["Rows in source CSV", rows.length.toLocaleString()]);
  summaryTable.push(["Rows filtered (out of range)", chalk.yellow(filtered.toLocaleString())]);
  summaryTable.push(["Unique celebs aggregated", chalk.green(cameoMap.size.toLocaleString())]);
  summaryTable.push(["Output file", chalk.gray(outPath)]);

  console.log(summaryTable.toString());
  console.log(chalk.bold.green("\n✅ Aggregation complete!\n"));
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error:"), err.message);
  process.exit(1);
});

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
