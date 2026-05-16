// scripts/firebase/dumpFirestoreToProd.js
// ⚠️  WARNING: This will overwrite PROD data with DEV data.
// You must type an exact confirmation string before anything is written.
//
// Usage: node scripts/firebase/dumpFirestoreToProd.js

// Top-level collections to push (recursively, including subcollections)
const collectionsToPush = [
  ////////////////////////////////////
  // GENERAL
  // "stats/general/players",
  //
  ////////////////////////////////////
  // COMPARATIVELY FAMOUS
  // "stats/cameo/celebs",
  // "stats/cameo/specialGames",
  //
  ////////////////////////////////////
  // NO MORE BILLIONAIRES
  // "stats/guillotine/heads",
  //
  ////////////////////////////////////
  // INVALID
  // "stats/invalid/bugs",
  // "stats/invalid/challenges",
  // "stats/invalid/gameSizes",
  // "stats/invalid/letters",
  // "stats/invalid/passwords",
  // "stats/invalid/rules",
  //
  ////////////////////////////////////
  // THIS MEETING HAS POINTS
  // "stats/meeting/cards",
  // "stats/meeting/jobTitles",
  // "stats/meeting/players",
  //
  ////////////////////////////////////
  // PRETEND WORLD
  //"stats/pretend/impersonators",
  //
  ////////////////////////////////////
  // SISYPHUS CLICKER
  // "stats/sisyphus/cheevos",
  // "stats/sisyphus/purchases",
];

// Individual documents to push (fields only, no subcollections)
const documentsToPush = [
  ////////////////////////////////////
  // GENERAL
  // "stats/general",
  //
  ////////////////////////////////////
  // COMPARATIVELY FAMOUS
  //"stats/cameo",
  //
  ////////////////////////////////////
  // NO MORE BILLIONAIRES
  // "stats/guillotine",
  //
  ////////////////////////////////////
  // INVALID
  // "stats/invalid",
  //
  ////////////////////////////////////
  // THIS MEETING HAS POINTS
  // "stats/meeting",
  //
  ////////////////////////////////////
  // PRETEND WORLD
  //"stats/pretend",
  //
  ////////////////////////////////////
  // SISYPHUS CLICKER
  //"stats/sisyphus",
];

import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname } from "path";
import chalk from "chalk";
import Table from "cli-table3";
import { loadServiceAccount, confirmExact } from "../shared/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prodServiceAccount = loadServiceAccount("prod-service-account.json", __dirname);
const devServiceAccount = loadServiceAccount("dev-service-account.json", __dirname);

const prodApp = admin.initializeApp({ credential: admin.credential.cert(prodServiceAccount) }, "production");
const devApp = admin.initializeApp({ credential: admin.credential.cert(devServiceAccount) }, "development");
const prodDb = prodApp.firestore();
const devDb = devApp.firestore();

async function cloneCollection(sourceCollectionRef, targetCollectionRef, onDoc) {
  const snapshot = await sourceCollectionRef.get();
  let writeCounter = 0;
  if (snapshot.size === 0) {
    console.log(chalk.gray(`   (No documents in ${sourceCollectionRef.path})`));
  }
  for (const doc of snapshot.docs) {
    await targetCollectionRef.doc(doc.id).set(doc.data());
    writeCounter++;
    if (onDoc) onDoc();
    try {
      const subcollections = await doc.ref.listCollections();
      for (const subcollection of subcollections) {
        const targetSubcollectionRef = targetCollectionRef.doc(doc.id).collection(subcollection.id);
        writeCounter += await cloneCollection(subcollection, targetSubcollectionRef, onDoc);
      }
    } catch {
      // listCollections() requires datastore.indexes.list IAM permission;
      // if missing, document fields were still copied above — subcollections skipped.
    }
  }
  return writeCounter;
}

async function main() {
  console.log(chalk.bold.red("\n⚠️  DUMP TO PRODUCTION — DANGEROUS OPERATION\n"));
  console.log(chalk.red(`   Source (DEV):  ${devServiceAccount.project_id}`));
  console.log(chalk.red(`   Target (PROD): ${prodServiceAccount.project_id}\n`));

  if (collectionsToPush.length === 0 && documentsToPush.length === 0) {
    console.log(chalk.yellow("⚫ Nothing selected to push."));
    console.log(chalk.gray("   Uncomment lines in the arrays at the top of this file."));
    process.exit(0);
  }

  // Preview what will be pushed
  const previewTable = new Table({
    head: [chalk.white("Type"), chalk.white("Path")],
    style: { head: [] },
  });
  collectionsToPush.forEach((c) => previewTable.push([chalk.cyan("collection"), c]));
  documentsToPush.forEach((d) => previewTable.push([chalk.gray("document"), d]));

  console.log(chalk.red.bold("🚨 The following will be written to PRODUCTION:\n"));
  console.log(previewTable.toString());

  const ok = await confirmExact(chalk.red.bold("You are about to OVERWRITE PRODUCTION with DEV data. This cannot be undone."), "Yes that is what I want");
  if (!ok) {
    console.log(chalk.gray("\nAborted. No changes made.\n"));
    process.exit(0);
  }

  console.log("");
  let totalDocsPushed = 0;
  const results = [];

  for (const collectionId of collectionsToPush) {
    console.log(chalk.yellow(`\n📂 Pushing collection: ${chalk.bold(collectionId)}...`));
    const sourceCollection = devDb.collection(collectionId);
    const targetCollection = prodDb.collection(collectionId);

    let docsWritten = 0;
    const count = await cloneCollection(sourceCollection, targetCollection, () => {
      docsWritten++;
      process.stdout.write(chalk.gray(`\r   ${docsWritten} doc(s) written...`));
    });
    process.stdout.write("\n");
    totalDocsPushed += count;
    results.push({ path: collectionId, docs: count, status: chalk.green("✅") });
  }

  for (const docPath of documentsToPush) {
    console.log(chalk.yellow(`\n📄 Pushing document: ${chalk.bold(docPath)}...`));
    const docSnap = await devDb.doc(docPath).get();
    if (docSnap.exists) {
      await prodDb.doc(docPath).set(docSnap.data());
      totalDocsPushed++;
      results.push({ path: docPath, docs: 1, status: chalk.green("✅") });
    } else {
      console.log(chalk.red(`   ❌ Not found in DEV: ${docPath}`));
      results.push({ path: docPath, docs: 0, status: chalk.red("❌ missing") });
    }
  }

  // Record the dump timestamp on DEV
  try {
    await devDb.doc("stats/general").set({ lastDumped: new Date().toISOString() }, { merge: true });
  } catch {
    // Non-fatal
  }

  const summaryTable = new Table({
    head: [chalk.white("Path"), chalk.white("Docs"), chalk.white("Status")],
    style: { head: [] },
  });
  results.forEach(({ path, docs, status }) => summaryTable.push([path, docs.toLocaleString(), status]));

  console.log("\n" + summaryTable.toString());
  console.log(chalk.bold.green(`\n✅ Dump complete! ${totalDocsPushed.toLocaleString()} doc(s) written to PRODUCTION.\n`));
  process.exit(0);
}

main().catch((err) => {
  console.error(chalk.red("\n❌ An error occurred during the dump process:"), err.message);
  process.exit(1);
});
