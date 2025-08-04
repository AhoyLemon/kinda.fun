// scripts/firebase/purgeRooms.js
// Purges all documents in /rooms except /rooms/_STATS, including all subcollections.
// Updates /rooms/_STATS with timesPurged and lastPurged.

import admin from "firebase-admin";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const readJsonFile = (path) => JSON.parse(readFileSync(path, "utf8"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const devServiceAccount = readJsonFile(join(__dirname, "./dev-service-account.json"));
const devApp = admin.initializeApp({ credential: admin.credential.cert(devServiceAccount) }, "development");
const devDb = devApp.firestore();

// Recursively delete a document and all its subcollections
async function deleteDocumentAndSubcollections(docRef) {
  // Delete subcollections first
  const subcollections = await docRef.listCollections();
  for (const subcol of subcollections) {
    const docs = await subcol.listDocuments();
    for (const subDoc of docs) {
      await deleteDocumentAndSubcollections(subDoc);
    }
  }
  // Delete the document itself
  await docRef.delete();
  console.log(`Deleted: ${docRef.path}`);
}

async function main() {
  const roomsCol = devDb.collection("rooms");
  const roomDocs = await roomsCol.listDocuments();
  let purgedCount = 0;

  for (const docRef of roomDocs) {
    if (docRef.id === "_STATS") continue;
    await deleteDocumentAndSubcollections(docRef);
    purgedCount++;
  }

  // Update /rooms/_STATS
  const statsRef = roomsCol.doc("_STATS");
  const statsSnap = await statsRef.get();
  let timesPurged = 1;
  if (statsSnap.exists && typeof statsSnap.data().timesPurged === "number") {
    timesPurged = statsSnap.data().timesPurged + 1;
  }
  await statsRef.set(
    {
      timesPurged,
      lastPurged: new Date().toISOString(),
    },
    { merge: true },
  );
  console.log(`Updated /rooms/_STATS: timesPurged=${timesPurged}, lastPurged=${new Date().toISOString()}`);
  console.log(`✅ Purged ${purgedCount} room(s).`);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error during purge:", err);
  process.exit(1);
});
