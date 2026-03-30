// scripts/firebase/deleteCelebsWithoutName.js
// Deletes any document in /stats/cameo/celebs/ in DEV Firestore that has no 'name' field.
//
// Usage: node scripts/firebase/deleteCelebsWithoutName.js

import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname } from "path";
import chalk from "chalk";
import Table from "cli-table3";
import { loadServiceAccount, confirm } from "../shared/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const devServiceAccount = loadServiceAccount("dev-service-account.json", __dirname);
const devApp = admin.initializeApp({ credential: admin.credential.cert(devServiceAccount) }, "development");
const devDb = devApp.firestore();

async function main() {
  console.log(chalk.bold.red("\n🗑️  Delete Unnamed Cameo Celebs — DEV only\n"));
  console.log(chalk.gray(`   Project:    ${devServiceAccount.project_id}`));
  console.log(chalk.gray("   Collection: /stats/cameo/celebs\n"));

  console.log(chalk.yellow("📂 Scanning /stats/cameo/celebs..."));
  const collectionRef = devDb.collection("stats/cameo/celebs");
  const snapshot = await collectionRef.get();

  const toDelete = snapshot.docs.filter((doc) => !doc.data().name);

  if (toDelete.length === 0) {
    console.log(chalk.green("\n✅ No unnamed celebs found. Nothing to delete.\n"));
    process.exit(0);
  }

  console.log(chalk.yellow(`\n⚠️  Found ${chalk.bold(toDelete.length)} celeb(s) without a name field (of ${snapshot.size} total).`));

  // Preview the first few
  if (toDelete.length <= 10) {
    toDelete.forEach((doc) => console.log(chalk.gray(`   • ${doc.id}`)));
  } else {
    toDelete.slice(0, 5).forEach((doc) => console.log(chalk.gray(`   • ${doc.id}`)));
    console.log(chalk.gray(`   ... and ${toDelete.length - 5} more.`));
  }

  const ok = await confirm(`Delete ${toDelete.length} unnamed celeb doc(s) from DEV Firestore?`);
  if (!ok) {
    console.log(chalk.gray("\nAborted. No changes made.\n"));
    process.exit(0);
  }

  let deletedCount = 0;
  let errorCount = 0;
  for (const doc of toDelete) {
    try {
      await doc.ref.delete();
      deletedCount++;
    } catch (err) {
      console.error(chalk.red(`\n❌ Failed to delete ${doc.id}: ${err.message}`));
      errorCount++;
    }
  }

  const summaryTable = new Table({
    head: [chalk.white("Stat"), chalk.white("Value")],
    style: { head: [] },
  });
  summaryTable.push(["Total celebs scanned", snapshot.size.toLocaleString()]);
  summaryTable.push(["Unnamed celebs found", toDelete.length.toLocaleString()]);
  summaryTable.push(["Successfully deleted", chalk.green(deletedCount.toLocaleString())]);
  if (errorCount > 0) summaryTable.push(["Errors", chalk.red(errorCount.toLocaleString())]);
  summaryTable.push(["Production affected", chalk.green("No")]);

  console.log("\n" + summaryTable.toString());
  console.log(chalk.bold.green("\n✅ Done!\n"));
  process.exit(0);
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Unexpected error:"), err.message);
  process.exit(1);
});
