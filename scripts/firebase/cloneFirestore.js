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

// Individual documents to clone (fields only, no subcollections)
const documentsToClone = [
  //"stats/cameo", "stats/guillotine", "stats/invalid", "stats/meeting", "stats/pretend", "stats/sisyphus"
];

// =============================================================
// =============================================================

import admin from "firebase-admin";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Helper to read JSON files in ES Modules
const readJsonFile = (path) => {
  return JSON.parse(readFileSync(path, "utf8"));
};

// Since __dirname is not available in ES Modules, we create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import your service account keys using the file system
const prodServiceAccount = readJsonFile(join(__dirname, "./prod-service-account.json"));
const devServiceAccount = readJsonFile(join(__dirname, "./dev-service-account.json"));

// Initialize the two Firebase apps
const prodApp = admin.initializeApp(
  {
    credential: admin.credential.cert(prodServiceAccount),
  },
  "production",
); // Use a unique name for the app

const devApp = admin.initializeApp(
  {
    credential: admin.credential.cert(devServiceAccount),
  },
  "development",
); // Use a unique name for the app

// Get a reference to the Firestore database for each app
const prodDb = prodApp.firestore();
const devDb = devApp.firestore();

/**
 * Clones data from a source collection to a target collection.
 * @param {FirebaseFirestore.CollectionReference} sourceCollectionRef - The source collection.
 * @param {FirebaseFirestore.CollectionReference} targetCollectionRef - The target collection.
 */
async function cloneCollection(sourceCollectionRef, targetCollectionRef) {
  const documentsSnapshot = await sourceCollectionRef.get();
  console.log(`Found ${documentsSnapshot.size} docs in ${sourceCollectionRef.path}`);
  let writeCounter = 0;

  for (const doc of documentsSnapshot.docs) {
    // Set the data in the target collection with the same document ID
    await targetCollectionRef.doc(doc.id).set(doc.data());
    console.log(`Cloned doc: ${sourceCollectionRef.path}/${doc.id}`);
    writeCounter++;

    // Recursively clone subcollections
    const subcollections = await doc.ref.listCollections();
    for (const subcollection of subcollections) {
      const targetSubcollectionRef = targetCollectionRef.doc(doc.id).collection(subcollection.id);
      console.log(`  -> Found subcollection: ${subcollection.path}. Cloning...`);
      await cloneCollection(subcollection, targetSubcollectionRef);
    }
  }
  return writeCounter;
}

async function main() {
  // Print actual project IDs from service accounts
  console.log("prodServiceAccount.project_id:", prodServiceAccount.project_id);
  console.log("devServiceAccount.project_id:", devServiceAccount.project_id);

  console.log("Starting Firestore clone process...");
  console.log("Source Project ID:", prodApp.options.credential.projectId);
  console.log("Target Project ID:", devApp.options.credential.projectId);

  let totalDocsCloned = 0;

  // Clone collections (with subcollections)
  if (collectionsToClone.length === 0) {
    console.log("No collections to clone. Skipping collectionsToClone.");
  } else {
    for (const collectionId of collectionsToClone) {
      console.log(`\n--- Cloning collection: ${collectionId} ---`);
      const sourceCollection = prodDb.collection(collectionId);
      const targetCollection = devDb.collection(collectionId);

      const count = await cloneCollection(sourceCollection, targetCollection);
      totalDocsCloned += count;
      console.log(`--- Finished cloning ${collectionId}. Cloned ${count} documents. ---`);
    }
  }

  // Clone individual documents (fields only)
  if (documentsToClone.length === 0) {
    console.log("No documents to clone. Skipping documentsToClone.");
  } else {
    for (const docPath of documentsToClone) {
      console.log(`\n--- Cloning document (fields only): ${docPath} ---`);
      const sourceDocRef = prodDb.doc(docPath);
      const targetDocRef = devDb.doc(docPath);
      const docSnap = await sourceDocRef.get();
      if (docSnap.exists) {
        await targetDocRef.set(docSnap.data());
        totalDocsCloned++;
        console.log(`Cloned document fields: ${docPath}`);
      } else {
        console.warn(`Document not found: ${docPath}`);
      }
    }
  }

  // Update lastCloned field in /stats/general in the dev database
  try {
    const now = new Date();
    await devDb.doc("stats/general").set({ lastCloned: now.toISOString() }, { merge: true });
    console.log(`Updated /stats/general.lastCloned to ${now.toISOString()}`);
  } catch (err) {
    console.error("Failed to update lastCloned field in /stats/general:", err);
  }

  console.log(`\n✅ Clone process complete. Total documents cloned: ${totalDocsCloned}.`);

  // Explicitly exit the script
  process.exit(0);
}

main().catch((error) => {
  console.error("❌ An error occurred during the clone process:", error);
  process.exit(1);
});
