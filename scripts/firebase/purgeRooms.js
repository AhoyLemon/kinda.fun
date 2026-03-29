// scripts/firebase/purgeRooms.js
// Purges all documents in /rooms except /rooms/_STATS, including all subcollections.
// Updates /rooms/_STATS with timesPurged and lastPurged.
//
// Usage: node scripts/firebase/purgeRooms.js

import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import chalk from "chalk";
import Table from "cli-table3";
import { loadServiceAccount, confirm, createProgressBar } from "../shared/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const devServiceAccount = loadServiceAccount("dev-service-account.json", __dirname);
const devApp = admin.initializeApp({ credential: admin.credential.cert(devServiceAccount) }, "development");
const devDb = devApp.firestore();

// Recursively delete a document and all its subcollections (silent — caller tracks count)
async function deleteDocumentAndSubcollections(docRef) {
  const subcollections = await docRef.listCollections();
  for (const subcol of subcollections) {
    const docs = await subcol.listDocuments();
    for (const subDoc of docs) {
      await deleteDocumentAndSubcollections(subDoc);
    }
  }
  await docRef.delete();
}

async function main() {
  console.log(chalk.bold.red("\n🗑️  Purge Rooms — DEV only\n"));
  console.log(chalk.gray(`   Project: ${devServiceAccount.project_id}`));
  console.log(chalk.gray("   Target:  /rooms (all docs except _STATS, recursive)\n"));

  // Count rooms first so we can confirm and show progress
  const roomsCol = devDb.collection("rooms");
  const roomsSnapshot = await roomsCol.get();
  const toDelete = roomsSnapshot.docs.filter((d) => d.id !== "_STATS").map((d) => d.ref);

  if (toDelete.length === 0) {
    console.log(chalk.green("✅ Nothing to purge — /rooms is already empty (or only has _STATS).\n"));
    process.exit(0);
  }

  console.log(chalk.yellow(`⚠️  This will permanently delete ${chalk.bold(toDelete.length)} room(s) and all their subcollections.`));

  const ok = await confirm("Purge all rooms from DEV Firestore?");
  if (!ok) {
    console.log(chalk.gray("\nAborted. No changes made.\n"));
    process.exit(0);
  }

  console.log("");
  const bar = createProgressBar("Purging rooms");
  bar.start(toDelete.length, 0);
  let purgedCount = 0;

  for (const docRef of toDelete) {
    await deleteDocumentAndSubcollections(docRef);
    purgedCount++;
    bar.update(purgedCount);
  }
  bar.stop();

  // Update /rooms/_STATS
  const statsRef = roomsCol.doc("_STATS");
  const statsSnap = await statsRef.get();
  const timesPurged = statsSnap.exists && typeof statsSnap.data().timesPurged === "number" ? statsSnap.data().timesPurged + 1 : 1;
  const lastPurged = new Date().toISOString();
  await statsRef.set({ timesPurged, lastPurged }, { merge: true });

  const summaryTable = new Table({
    head: [chalk.white("Stat"), chalk.white("Value")],
    style: { head: [] },
  });
  summaryTable.push(["Rooms purged", chalk.green(purgedCount.toLocaleString())]);
  summaryTable.push(["/rooms/_STATS timesPurged", chalk.green(timesPurged)]);
  summaryTable.push(["lastPurged", chalk.gray(lastPurged)]);
  summaryTable.push(["Production affected", chalk.green("No")]);

  console.log("\n" + summaryTable.toString());
  console.log(chalk.bold.green("\n✅ Purge complete!\n"));
  process.exit(0);
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error during purge:"), err.message);
  process.exit(1);
});
