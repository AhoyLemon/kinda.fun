// scripts/firebase/cloneFirestore.js
// =============================================================
// 🔥 EDIT THESE ARRAYS TO CONTROL WHAT GETS CLONED 🔥
// =============================================================

// Top-level collections to clone (recursively, including subcollections)
const collectionsToClone = [
  ////////////////////////////////////
  // GENERAL
  // "stats/general/players",
  //
  ////////////////////////////////////
  // COMPARATIVELY FAMOUS
  "stats/cameo/celebs",
  "stats/cameo/specialGames",
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
  //
  ////////////////////////////////////
  // MEGACHURCH TYCOON
  // "/stats/megachurch/cheats",
  // "/stats/megachurch/churchNames",
  // "/stats/megachurch/darkDeeds",
  // "/stats/megachurch/eternalLegacy",
  // "/stats/megachurch/locations",
  // "/stats/megachurch/marketing",
  // "/stats/megachurch/merch",
  // "/stats/megachurch/players",
  // "/stats/megachurch/religions",
  // "/stats/megachurch/sermonTopics",
  // "/stats/megachurch/upgrades",
];

// Individual documents to clone (fields only, no subcollections)
const documentsToClone = [
  ////////////////////////////////////
  // GENERAL
  // "stats/general",
  //
  ////////////////////////////////////
  // GAMES
  "stats/cameo",
  // "stats/guillotine",
  // "stats/invalid",
  // "stats/meeting",
  // "stats/pretend",
  // "stats/sisyphus",
  // "stats/megachurch",
];

// =============================================================
// =============================================================

import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname } from "path";
import chalk from "chalk";
import Table from "cli-table3";
import { loadServiceAccount, confirm } from "../shared/utils.js";

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
  for (const doc of snapshot.docs) {
    await targetCollectionRef.doc(doc.id).set(doc.data());
    writeCounter++;
    if (onDoc) onDoc();
    // Recursively clone subcollections (listCollections requires elevated IAM;
    // skip gracefully if not available)
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
  console.log(chalk.bold.blue("\n🔧 Clone Firestore — PROD → DEV\n"));

  if (collectionsToClone.length === 0 && documentsToClone.length === 0) {
    console.log(chalk.red.bold("⚫ No collections or documents selected for cloning."));
    console.log(chalk.yellow("   Edit the arrays at the top of this file to select what to clone."));
    process.exit(0);
  }

  // Pre-flight summary
  const previewTable = new Table({
    head: [chalk.white("Type"), chalk.white("Path")],
    style: { head: [] },
  });
  collectionsToClone.forEach((c) => previewTable.push([chalk.cyan("collection"), c]));
  documentsToClone.forEach((d) => previewTable.push([chalk.gray("document"), d]));

  console.log(chalk.gray(`   Source: ${prodServiceAccount.project_id}  (PROD)`));
  console.log(chalk.gray(`   Target: ${devServiceAccount.project_id}  (DEV)\n`));
  console.log(chalk.yellow("💻 Planned clone:"));
  console.log(previewTable.toString());

  const ok = await confirm("Clone from PROD into DEV Firestore? (DEV data will be overwritten)");
  if (!ok) {
    console.log(chalk.gray("\nAborted. No changes made.\n"));
    process.exit(0);
  }

  console.log("");
  let totalDocsCloned = 0;
  const collectionResults = [];

  // Clone collections
  for (const collectionId of collectionsToClone) {
    console.log(chalk.yellow(`\n📂 Cloning collection: ${chalk.bold(collectionId)}...`));
    const sourceCollection = prodDb.collection(collectionId);
    const targetCollection = devDb.collection(collectionId);

    let docsCloned = 0;
    const count = await cloneCollection(sourceCollection, targetCollection, () => {
      docsCloned++;
      process.stdout.write(chalk.gray(`\r   ${docsCloned} doc(s) written...`));
    });
    process.stdout.write("\n");
    totalDocsCloned += count;
    collectionResults.push({ path: collectionId, docs: count, status: chalk.green("✅") });
  }

  // Clone individual documents
  for (const docPath of documentsToClone) {
    console.log(chalk.yellow(`\n📄 Cloning document: ${chalk.bold(docPath)}...`));
    const sourceDocRef = prodDb.doc(docPath);
    const targetDocRef = devDb.doc(docPath);
    const docSnap = await sourceDocRef.get();
    if (docSnap.exists) {
      await targetDocRef.set(docSnap.data());
      totalDocsCloned++;
      collectionResults.push({ path: docPath, docs: 1, status: chalk.green("✅") });
    } else {
      console.log(chalk.red(`   ❌ Not found in PROD: ${docPath}`));
      collectionResults.push({ path: docPath, docs: 0, status: chalk.red("❌ missing") });
    }
  }

  // Update lastCloned on DEV
  try {
    await devDb.doc("stats/general").set({ lastCloned: new Date().toISOString() }, { merge: true });
  } catch {
    // Non-fatal: stats/general may not exist yet
  }

  // Summary
  const summaryTable = new Table({
    head: [chalk.white("Path"), chalk.white("Docs"), chalk.white("Status")],
    style: { head: [] },
  });
  collectionResults.forEach(({ path, docs, status }) => summaryTable.push([path, docs.toLocaleString(), status]));

  console.log("\n" + summaryTable.toString());
  console.log(chalk.bold.green(`\n✅ Clone complete! ${totalDocsCloned.toLocaleString()} total doc(s) written to DEV.\n`));
  process.exit(0);
}

main().catch((err) => {
  if (err.message?.includes("PERMISSION_DENIED")) {
    console.error(chalk.red("\n❌ PERMISSION_DENIED reading from PROD Firestore."));
    console.error(chalk.yellow("   The prod service account needs the 'Cloud Datastore User' IAM role."));
    console.error(chalk.gray("   GCP Console → kinda-fun project → IAM → grant role to:"));
    const email = prodServiceAccount?.client_email ?? "the client_email in prod-service-account.json";
    console.error(chalk.gray(`   ${email}\n`));
  } else {
    console.error(chalk.red("\n❌ An error occurred during the clone process:"), err.message);
  }
  process.exit(1);
});
