// scripts/firebase/updateSisyphusCheevos.js
// For each row in sisyphusCheevos.csv, if /stats/sisyphus/cheevos/{iname} exists,
// update earnedCount to INFLATION_FACTOR × icount (integer). Skips docs that don't exist.
//
// Usage: node scripts/firebase/updateSisyphusCheevos.js

import admin from "firebase-admin";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import Table from "cli-table3";
import { loadServiceAccount, createProgressBar } from "../shared/utils.js";

// ---------------------------------------------------------------------------
// ⚙️  CONFIGURATION
// ---------------------------------------------------------------------------
const INFLATION_FACTOR = 1.5;
// ---------------------------------------------------------------------------

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const devServiceAccount = loadServiceAccount("dev-service-account.json", __dirname);
const devApp = admin.initializeApp({ credential: admin.credential.cert(devServiceAccount) }, "development");
const devDb = devApp.firestore();

async function main() {
  console.log(chalk.bold.blue("\n🏆 Update Sisyphus Cheevos — DEV only\n"));
  console.log(chalk.gray(`   Project:          ${devServiceAccount.project_id}`));
  console.log(chalk.gray(`   Inflation factor:  ${chalk.bold.yellow(INFLATION_FACTOR)}x\n`));

  const csvPath = join(__dirname, "./OLD_SQL/sisyphusCheevos.csv");
  if (!existsSync(csvPath)) {
    console.error(chalk.red(`\n❌ CSV not found:\n   ${csvPath}`));
    process.exit(1);
  }

  const allRows = parseCSV(readFileSync(csvPath, "utf8"));
  const rows = allRows.filter((r) => r.iname && !isNaN(parseInt(r.icount, 10)));
  console.log(chalk.yellow(`📂 Loaded ${rows.length.toLocaleString()} valid rows from sisyphusCheevos.csv\n`));

  const bar = createProgressBar("Updating cheevos");
  bar.start(rows.length, 0);

  let updatedCount = 0;
  let notFoundCount = 0;
  let errorCount = 0;

  for (const row of rows) {
    const iname = row.iname;
    const icount = parseInt(row.icount, 10);
    const earnedCount = Math.round(icount * INFLATION_FACTOR);
    const docRef = devDb.doc(`stats/sisyphus/cheevos/${iname}`);
    try {
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        await docRef.update({ earnedCount });
        updatedCount++;
      } else {
        notFoundCount++;
      }
    } catch (err) {
      errorCount++;
    }
    bar.increment();
  }
  bar.stop();

  const summaryTable = new Table({
    head: [chalk.white("Stat"), chalk.white("Value")],
    style: { head: [] },
  });
  summaryTable.push(["Rows processed", rows.length.toLocaleString()]);
  summaryTable.push(["Updated", chalk.green(updatedCount.toLocaleString())]);
  summaryTable.push(["Not found (skipped)", chalk.yellow(notFoundCount.toLocaleString())]);
  summaryTable.push(["Errors", errorCount > 0 ? chalk.red(errorCount.toLocaleString()) : chalk.gray("0")]);
  summaryTable.push(["Inflation factor", `${INFLATION_FACTOR}x`]);

  console.log("\n" + summaryTable.toString());
  console.log(chalk.bold.green("\n✅ Done!\n"));
  process.exit(0);
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error:"), err.message);
  process.exit(1);
});
