// scripts/firebase/dumpFirestoreToProd.js
// Usage: node scripts/firebase/dumpFirestoreToProd.js
// WARNING: This will overwrite data in PROD with data from DEV.
// You must confirm by typing: Yes that is what I want

import admin from "firebase-admin";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import readline from "readline";

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

// Helper to read JSON files in ES Modules
const readJsonFile = (path) => {
  return JSON.parse(readFileSync(path, "utf8"));
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prodServiceAccount = readJsonFile(join(__dirname, "./prod-service-account.json"));
const devServiceAccount = readJsonFile(join(__dirname, "./dev-service-account.json"));

const prodApp = admin.initializeApp(
  {
    credential: admin.credential.cert(prodServiceAccount),
  },
  "production",
);
const devApp = admin.initializeApp(
  {
    credential: admin.credential.cert(devServiceAccount),
  },
  "development",
);
const prodDb = prodApp.firestore();
const devDb = devApp.firestore();

async function cloneCollection(sourceCollectionRef, targetCollectionRef) {
  const documentsSnapshot = await sourceCollectionRef.get();
  let writeCounter = 0;
  if (documentsSnapshot.size === 0) {
    console.log(`    (No documents found in ${sourceCollectionRef.path})`);
  }
  for (const doc of documentsSnapshot.docs) {
    await targetCollectionRef.doc(doc.id).set(doc.data());
    writeCounter++;
    console.log(`    Pushed doc: ${sourceCollectionRef.path}/${doc.id}`);
    // Recursively clone subcollections
    const subcollections = await doc.ref.listCollections();
    for (const subcollection of subcollections) {
      const targetSubcollectionRef = targetCollectionRef.doc(doc.id).collection(subcollection.id);
      console.log(`      -> Found subcollection: ${subcollection.path}. Pushing...`);
      await cloneCollection(subcollection, targetSubcollectionRef);
    }
  }
  console.log(`    Finished pushing ${sourceCollectionRef.path}. Pushed ${writeCounter} documents.`);
  return writeCounter;
}

async function main() {
  // Print warning and list collections/documents
  console.log("\n⚠️  WARNING: You are about to OVERWRITE PROD with DEV data!");
  console.log("Collections to push:");
  collectionsToPush.forEach((c) => console.log("  - " + c));
  console.log("Documents to push:");
  documentsToPush.forEach((d) => console.log("  - " + d));
  console.log("\nType exactly: Yes that is what I want\n");

  // Confirm with user
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) => {
    rl.question("Are you sure? ", (ans) => {
      rl.close();
      resolve(ans);
    });
  });
  if (answer !== "Yes that is what I want") {
    console.log("Aborted. No changes made.");
    process.exit(0);
  }

  let totalDocsPushed = 0;

  // Push collections (with subcollections)
  if (collectionsToPush.length === 0) {
    console.log("No collections to push. Skipping collectionsToPush.");
  } else {
    for (const collectionId of collectionsToPush) {
      console.log(`\n--- Pushing collection: ${collectionId} ---`);
      const sourceCollection = devDb.collection(collectionId);
      const targetCollection = prodDb.collection(collectionId);
      const count = await cloneCollection(sourceCollection, targetCollection);
      totalDocsPushed += count;
      console.log(`--- Finished pushing collection: ${collectionId}. Total pushed: ${count} documents. ---`);
    }
  }

  // Push individual documents (fields only)
  if (documentsToPush.length === 0) {
    console.log("No documents to push. Skipping documentsToPush.");
  } else {
    for (const docPath of documentsToPush) {
      console.log(`\n--- Pushing document (fields only): ${docPath} ---`);
      const sourceDocRef = devDb.doc(docPath);
      const targetDocRef = prodDb.doc(docPath);
      const docSnap = await sourceDocRef.get();
      if (docSnap.exists) {
        await targetDocRef.set(docSnap.data());
        totalDocsPushed++;
        console.log(`Pushed document fields: ${docPath}`);
      } else {
        console.warn(`Document not found in DEV: ${docPath}`);
      }
    }
  }

  // Update lastDumped field in /stats/general in DEV
  try {
    const now = new Date();
    await devDb.doc("stats/general").set({ lastDumped: now.toISOString() }, { merge: true });
    console.log(`Updated /stats/general.lastDumped in DEV to ${now.toISOString()}`);
  } catch (err) {
    console.error("Failed to update lastDumped field in /stats/general in DEV:", err);
  }

  console.log(`\n✅ Dump process complete. Total documents pushed: ${totalDocsPushed}.`);
  process.exit(0);
}

main().catch((error) => {
  console.error("❌ An error occurred during the dump process:", error);
  process.exit(1);
});
