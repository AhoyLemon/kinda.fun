// scripts/firebase/guillotine_updateHeads.js
// For each row in guillotineHeads.csv, if /stats/guillotine/heads/{name} exists,
// update headCount to INFLATION_FACTOR x original value (integer).
// Unmatched names are written to missingHeads.csv.
//
// Usage: node scripts/firebase/guillotine_updateHeads.js

import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import Table from "cli-table3";
import { loadServiceAccount, createProgressBar } from "../shared/utils.js";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const INFLATION_FACTOR = 1.35;
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const devServiceAccount = loadServiceAccount("dev-service-account.json", __dirname);
const devApp = admin.initializeApp({ credential: admin.credential.cert(devServiceAccount) }, "development");
const devDb = devApp.firestore();

async function main() {
  console.log(chalk.bold.blue("\n💀 Update Guillotine Heads — DEV only\n"));
  console.log(chalk.gray(`   Project:          ${devServiceAccount.project_id}`));
  console.log(chalk.gray(`   Inflation factor:  ${chalk.bold.yellow(INFLATION_FACTOR)}x\n`));

  const csvPath = join(__dirname, "./OLD_SQL/guillotineHeads.csv");
  if (!existsSync(csvPath)) {
    console.error(chalk.red(`\n❌ Source CSV not found:\n   ${csvPath}`));
    process.exit(1);
  }

  const rows = parseCSV(readFileSync(csvPath, "utf8")).filter((r) => r.iname && !isNaN(parseInt(r.icount, 10)));
  console.log(chalk.yellow(`📂 Loaded ${rows.length.toLocaleString()} rows from guillotineHeads.csv\n`));

  const bar = createProgressBar("Updating heads");
  bar.start(rows.length, 0);

  let updatedCount = 0;
  let skippedCount = 0;
  const missingRows = [];

  for (const row of rows) {
    const iname = row.iname;
    const icount = parseInt(row.icount, 10);
    const headCount = Math.round(icount * INFLATION_FACTOR);
    const docRef = devDb.doc(`stats/guillotine/heads/${iname}`);
    try {
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        await docRef.update({ headCount });
        updatedCount++;
      } else {
        missingRows.push({ iname, headValue: row.headValue ?? "", icount, lastRemoved: row.lastRemoved ?? "" });
        skippedCount++;
      }
    } catch (err) {
      console.error(chalk.red(`\n❌ Error for ${iname}: ${err.message}`));
      skippedCount++;
    }
    bar.increment();
  }
  bar.stop();

  // Write missing rows
  if (missingRows.length > 0) {
    const outPath = join(__dirname, "./OLD_SQL/missingHeads.csv");
    const header = '"iname","headValue","icount","lastRemoved"\n';
    const lines = missingRows.map((r) => `"${r.iname}",${r.headValue},${r.icount},"${r.lastRemoved}"`);
    writeFileSync(outPath, header + lines.join("\n"), "utf8");
    console.log(chalk.yellow(`\n⚠️  ${missingRows.length} missing head(s) written to:\n   ${outPath}`));
  }

  const summaryTable = new Table({
    head: [chalk.white("Stat"), chalk.white("Value")],
    style: { head: [] },
  });
  summaryTable.push(["Rows processed", rows.length.toLocaleString()]);
  summaryTable.push(["Updated", chalk.green(updatedCount.toLocaleString())]);
  summaryTable.push(["Not found (see missingHeads.csv)", chalk.yellow(missingRows.length.toLocaleString())]);
  summaryTable.push(["Inflation factor", `${INFLATION_FACTOR}x`]);

  console.log("\n" + summaryTable.toString());
  console.log(chalk.bold.green("\n✅ Done!\n"));
  process.exit(0);
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Unexpected error:"), err.message);
  process.exit(1);
});