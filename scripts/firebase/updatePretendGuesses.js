// scripts/firebase/updatePretendGuesses.js
// Updates or creates /stats/pretend/impersonators/{iname} with correctGuessCount,
// closeGuessCount, badGuessCount, and lastGuess (on create).
//
// Usage: node scripts/firebase/updatePretendGuesses.js

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
    headers.forEach((h, i) => { obj[h] = values[i]; });
    return obj;
  });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const devServiceAccount = loadServiceAccount("dev-service-account.json", __dirname);
const devApp = admin.initializeApp({ credential: admin.credential.cert(devServiceAccount) }, "development");
const devDb = devApp.firestore();

async function main() {
  console.log(chalk.bold.blue("\n🎭 Update Pretend Guesses — DEV only\n"));
  console.log(chalk.gray(`   Project: ${devServiceAccount.project_id}\n`));

  const csvPath = join(__dirname, "./OLD_SQL/pretendGuesses.csv");
  if (!existsSync(csvPath)) {
    console.error(chalk.red(`\n❌ CSV not found:\n   ${csvPath}`));
    process.exit(1);
  }

  const rows = parseCSV(readFileSync(csvPath, "utf8"));
  console.log(chalk.yellow(`📂 Loaded ${rows.length.toLocaleString()} rows from pretendGuesses.csv\n`));

  const bar = createProgressBar("Updating guesses");
  bar.start(rows.length, 0);

  let updatedCount = 0;
  let createdCount = 0;
  let errorCount = 0;

  for (const row of rows) {
    const iname = row.iname;
    const correctGuessCount = parseInt(row.correctGuess, 10);
    const closeGuessCount = parseInt(row.closeGuess, 10);
    const badGuessCount = parseInt(row.badGuess, 10);
    const docRef = devDb.doc(`stats/pretend/impersonators/${iname}`);
    try {
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        await docRef.set({ correctGuessCount, closeGuessCount, badGuessCount }, { merge: true });
        updatedCount++;
      } else {
        await docRef.set({
          name: iname,
          correctGuessCount,
          closeGuessCount,
          badGuessCount,
          lastGuess: admin.firestore.FieldValue.serverTimestamp(),
        });
        createdCount++;
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
  summaryTable.push(["Rows in CSV", rows.length.toLocaleString()]);
  summaryTable.push(["Updated (existing docs)", chalk.green(updatedCount.toLocaleString())]);
  summaryTable.push(["Created (new docs)", chalk.cyan(createdCount.toLocaleString())]);
  summaryTable.push(["Errors", errorCount > 0 ? chalk.red(errorCount.toLocaleString()) : chalk.gray("0")]);

  console.log("\n" + summaryTable.toString());
  console.log(chalk.bold.green("\n✅ Done!\n"));
  process.exit(0);
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error:"), err.message);
  process.exit(1);
});
