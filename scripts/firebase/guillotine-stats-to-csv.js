// scripts/firebase/guillotine-stats-to-csv.js
// Reads all head documents from /stats/guillotine/heads/{name} and the main
// /stats/guillotine document, then exports them to CSV files in scripts/csv/stats/.
//
// Usage: node scripts/firebase/guillotine-stats-to-csv.js

import admin from "firebase-admin";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import chalk from "chalk";
import Table from "cli-table3";
import { createProgressBar } from "../shared/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readJsonFile = (path) => JSON.parse(readFileSync(path, "utf8"));
const devServiceAccount = readJsonFile(join(__dirname, "./dev-service-account.json"));
const devApp = admin.initializeApp({ credential: admin.credential.cert(devServiceAccount) }, "development");
const devDb = devApp.firestore();

// Output directory
const OUTPUT_DIR = join(__dirname, "../csv/stats");

// CSV columns
const HEAD_COLUMNS = ["name", "headCount", "lastRemoved", "netWorth"];
const STATS_COLUMNS = ["gamesFinished", "gameLastFinished", "gamesStarted", "lastGameStarted", "scoresShared", "wealthCreated"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeCSV(value) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCSVString(rows, columns) {
  const header = columns.join(",");
  const lines = rows.map((row) => columns.map((col) => escapeCSV(row[col])).join(","));
  return [header, ...lines].join("\n") + "\n";
}

/** Convert Firestore Timestamp or raw value to an ISO string. */
function toSerializable(value) {
  if (value && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }
  return value ?? "";
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(chalk.bold.blue("\n📊 Guillotine Stats → CSV Exporter\n"));
  console.log(chalk.gray(`   Project: ${devServiceAccount.project_id}\n`));

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(chalk.green(`✅ Created output directory: ${OUTPUT_DIR}\n`));
  }

  // ---------------------------------------------------------------------------
  // 1. Export head documents
  // ---------------------------------------------------------------------------
  console.log(chalk.yellow("📂 Reading /stats/guillotine/heads..."));

  const headsRef = devDb.collection("stats/guillotine/heads");
  const headsSnapshot = await headsRef.get();
  const totalDocs = headsSnapshot.size;

  console.log(chalk.cyan(`   Found ${totalDocs} head documents.\n`));

  const headRows = [];
  const missingFieldsRows = [];
  let calculatedWealthCreated = 0;

  const bar = createProgressBar("Processing heads");
  bar.start(totalDocs, 0);

  for (const doc of headsSnapshot.docs) {
    const data = doc.data();
    const name = doc.id;
    const headCount = data.headCount;
    const lastRemoved = toSerializable(data.lastRemoved);
    const netWorth = data.netWorth;

    const missing = [];
    if (headCount === undefined || headCount === null) missing.push("headCount");
    if (!lastRemoved) missing.push("lastRemoved");
    if (netWorth === undefined || netWorth === null) missing.push("netWorth");

    if (missing.length > 0) {
      missingFieldsRows.push({ name, missingFields: missing.join(", ") });
    }

    headRows.push({ name, headCount: headCount ?? "", lastRemoved, netWorth: netWorth ?? "" });

    if (typeof headCount === "number" && typeof netWorth === "number") {
      calculatedWealthCreated += headCount * netWorth;
    }

    bar.increment();
  }
  bar.stop();

  // Write heads CSV
  const headsPath = join(OUTPUT_DIR, "guillotine-heads.csv");
  writeFileSync(headsPath, toCSVString(headRows, HEAD_COLUMNS), "utf8");
  console.log(chalk.green(`\n✅ Wrote ${headRows.length} head records to:`));
  console.log(chalk.gray(`   ${headsPath}`));

  // Report and save missing fields
  if (missingFieldsRows.length > 0) {
    console.log(chalk.red(`\n⚠️  Found ${missingFieldsRows.length} record(s) with missing fields!\n`));

    const missingTable = new Table({
      head: [chalk.red("Name"), chalk.red("Missing Fields")],
      style: { head: [] },
    });
    missingFieldsRows.slice(0, 20).forEach(({ name, missingFields }) => {
      missingTable.push([name, chalk.yellow(missingFields)]);
    });
    if (missingFieldsRows.length > 20) {
      missingTable.push([chalk.gray(`... and ${missingFieldsRows.length - 20} more`), ""]);
    }
    console.log(missingTable.toString());

    const missingPath = join(OUTPUT_DIR, "guillotine-missing-fields.json");
    writeFileSync(missingPath, JSON.stringify(missingFieldsRows, null, 2), "utf8");
    console.log(chalk.yellow(`\n   Missing fields report saved to:\n   ${missingPath}`));
  } else {
    console.log(chalk.green("✅ All head records have all 4 required fields."));
  }

  // ---------------------------------------------------------------------------
  // 2. Export main guillotine stats document
  // ---------------------------------------------------------------------------
  console.log(chalk.yellow("\n📂 Reading /stats/guillotine..."));

  const statsDocSnap = await devDb.doc("stats/guillotine").get();
  if (!statsDocSnap.exists) {
    console.log(chalk.red("❌ Document /stats/guillotine does not exist!"));
    process.exit(1);
  }

  const statsData = statsDocSnap.data();

  // Check for expected fields
  const expectedStatsFields = ["gamesFinished", "gameLastFinished", "gamesStarted", "lastGameStarted", "scoresShared", "wealthCreated"];
  const missingStatsFields = expectedStatsFields.filter((f) => statsData[f] === undefined || statsData[f] === null);
  if (missingStatsFields.length > 0) {
    console.log(chalk.yellow(`⚠️  Stats doc is missing fields: ${missingStatsFields.join(", ")}`));
  }

  // Compare the stored wealthCreated against the value derived from head data.
  const storedWealthCreated = typeof statsData.wealthCreated === "number" ? statsData.wealthCreated : Number(statsData.wealthCreated);
  const wealthRatio = storedWealthCreated > 0 ? calculatedWealthCreated / storedWealthCreated : null;

  const wealthTable = new Table({
    head: [chalk.white("wealthCreated source"), chalk.white("Value"), chalk.white("Notes")],
    style: { head: [] },
  });
  wealthTable.push(["Stored in Firestore", storedWealthCreated.toLocaleString(), chalk.gray("/stats/guillotine.wealthCreated")]);
  wealthTable.push(["Calculated from heads", Math.round(calculatedWealthCreated).toLocaleString(), chalk.gray("sum(headCount × netWorth) per head")]);
  wealthTable.push([
    "Ratio (calc / stored)",
    wealthRatio !== null ? wealthRatio.toFixed(4) + "x" : chalk.red("N/A"),
    wealthRatio !== null && Math.abs(wealthRatio - 1) > 0.01
      ? chalk.yellow("⚠️  Values differ — CSV will use calculated value")
      : chalk.green("✅ Values match"),
  ]);

  console.log("\n" + wealthTable.toString());

  if (wealthRatio !== null && Math.abs(wealthRatio - 1) > 0.01) {
    console.log(
      chalk.yellow(
        `\n⚠️  wealthCreated mismatch detected.\n` +
          `   Stored:     ${storedWealthCreated.toLocaleString()}\n` +
          `   Calculated: ${Math.round(calculatedWealthCreated).toLocaleString()}\n` +
          `   The stats CSV will use the CALCULATED value so inflation is consistent.`,
      ),
    );
  }

  const statsRow = {
    gamesFinished: statsData.gamesFinished ?? "",
    gameLastFinished: toSerializable(statsData.gameLastFinished),
    gamesStarted: statsData.gamesStarted ?? "",
    lastGameStarted: toSerializable(statsData.lastGameStarted),
    scoresShared: statsData.scoresShared ?? "",
    // Use the value derived from head data, not the potentially-drifted stored value.
    wealthCreated: Math.round(calculatedWealthCreated),
  };

  const statsPath = join(OUTPUT_DIR, "guillotine-stats.csv");
  writeFileSync(statsPath, toCSVString([statsRow], STATS_COLUMNS), "utf8");
  console.log(chalk.green(`\n✅ Wrote stats document to:`));
  console.log(chalk.gray(`   ${statsPath}`));

  // ---------------------------------------------------------------------------
  // 3. Summary table
  // ---------------------------------------------------------------------------
  const summaryTable = new Table({
    head: [chalk.white("File"), chalk.white("Records"), chalk.white("Status")],
    style: { head: [] },
  });

  summaryTable.push([
    "guillotine-heads.csv",
    headRows.length.toLocaleString(),
    missingFieldsRows.length > 0 ? chalk.yellow(`⚠️  ${missingFieldsRows.length} missing`) : chalk.green("✅ OK"),
  ]);
  summaryTable.push(["guillotine-stats.csv", "1", missingStatsFields.length > 0 ? chalk.yellow(`⚠️  ${missingStatsFields.join(", ")}`) : chalk.green("✅ OK")]);

  if (missingFieldsRows.length > 0) {
    summaryTable.push(["guillotine-missing-fields.json", missingFieldsRows.length.toLocaleString(), chalk.red("❌ Review before inflating")]);
  }

  console.log("\n" + summaryTable.toString());
  console.log(chalk.bold.green("\n✅ Export complete!\n"));
  console.log(chalk.gray("   Next step: node scripts/firebase/guillotine-inflate-stats.js\n"));

  process.exit(0);
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error:"), err);
  process.exit(1);
});
