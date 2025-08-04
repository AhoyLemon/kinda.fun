// scripts/firebase/deleteCelebsWithoutName.js
// Usage: node scripts/firebase/deleteCelebsWithoutName.js
// Deletes any document in /stats/cameo/celebs/ in dev Firestore that does not have a 'name' field.

import admin from "firebase-admin";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load dev service account
const devServiceAccount = JSON.parse(readFileSync(join(__dirname, "./dev-service-account.json"), "utf8"));

// Initialize Firebase app
const devApp = admin.initializeApp(
  {
    credential: admin.credential.cert(devServiceAccount),
  },
  "development",
);
const devDb = devApp.firestore();

async function deleteCelebsWithoutName() {
  const collectionRef = devDb.collection("stats/cameo/celebs");
  const snapshot = await collectionRef.get();
  let deletedCount = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    if (!data.name) {
      await doc.ref.delete();
      console.log(`Deleted: ${doc.id}`);
      deletedCount++;
    }
  }

  console.log(`\n✅ Delete complete. Total documents deleted: ${deletedCount}.`);
  process.exit(0);
}

deleteCelebsWithoutName().catch((err) => {
  console.error("❌ Error in deleteCelebsWithoutName:", err);
  process.exit(1);
});
