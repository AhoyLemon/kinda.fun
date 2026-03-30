// scripts/firebase/updateCameoValuations.js
// Updates actualValue, averagePlayerValue, and valuationCount for each cameo celeb
// in dev Firestore from the aggregated CSV. Also removes the legacy `cameoName` field.
//
// Usage: node scripts/firebase/updateCameoValuations.js

import admin from "firebase-admin";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import Table from "cli-table3";
import { loadServiceAccount, createProgressBar } from "../shared/utils.js";

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
  console.log(chalk.bold.blue("\n🎦 Update Cameo Valuations — DEV only\n"));
  console.log(chalk.gray(`   Project: ${devServiceAccount.project_id}`));
  console.log(chalk.gray(`   Note: legacy \`cameoName\` field will be removed from each doc.\n`));

  const csvPath = join(__dirname, "./OLD_SQL/cameoValuations.aggregated.csv");
  if (!existsSync(csvPath)) {
    console.error(chalk.red(`\n❌ CSV not found:\n   ${csvPath}`));
    console.error(chalk.yellow("   Run aggregateCameoValuations.js first to generate this file."));
    process.exit(1);
  }

  const rows = parseCSV(readFileSync(csvPath, "utf8"));
  console.log(chalk.yellow(`📂 Loaded ${rows.length.toLocaleString()} rows from cameoValuations.aggregated.csv\n`));

  const bar = createProgressBar("Updating valuations");
  bar.start(rows.length, 0);

  let updatedCount = 0;
  let errorCount = 0;

  for (const row of rows) {
    const cameoName = row.cameoName;
    const actualValue = Number(row.actualValue);
    const averagePlayerValue = Number(row.averagePlayerValue);
    const valuationCount = Number(row.playerValueCount);
    const docRef = devDb.doc(`stats/cameo/celebs/${cameoName}`);
    try {
      await docRef.set({ name: cameoName, actualValue, averagePlayerValue, valuationCount }, { merge: true });
      await docRef.update({ cameoName: admin.firestore.FieldValue.delete() });
      updatedCount++;
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
  summaryTable.push(["Rows in CSV", rows.length.toLocaleString()]);
  summaryTable.push(["Updated", chalk.green(updatedCount.toLocaleString())]);
  summaryTable.push(["Errors", errorCount > 0 ? chalk.red(errorCount.toLocaleString()) : chalk.gray("0")]);
  summaryTable.push(["cameoName field deleted", chalk.cyan(`on ${updatedCount.toLocaleString()} docs`)]);

  console.log("\n" + summaryTable.toString());
  console.log(chalk.bold.green("\n✅ Done!\n"));
  process.exit(0);
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error:"), err.message);
  process.exit(1);
});
