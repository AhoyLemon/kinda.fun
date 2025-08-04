// scripts/firebase/updateCameoCelebScores.js
// Usage: node scripts/firebase/updateCameoCelebScores.js
// Updates sortScore and birthdayWishCount for each cameo celeb in dev Firestore from the CSV file.

import admin from "firebase-admin";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Helper to parse CSV
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

async function updateCelebScores() {
  const csvPath = join(__dirname, "./OLD_SQL/cameoCelebScores.csv");
  const csvText = readFileSync(csvPath, "utf8");
  const rows = parseCSV(csvText);

  let updatedCount = 0;
  for (const row of rows) {
    const cameoName = row.cameoName;
    const sortScore = Number(row.sortScore);
    const birthdayWishCount = Number(row.birthdayWishes);
    const docRef = devDb.doc(`stats/cameo/celebs/${cameoName}`);
    try {
      await docRef.set({ sortScore, birthdayWishCount }, { merge: true });
      console.log(`Updated: ${cameoName} (sortScore: ${sortScore}, birthdayWishCount: ${birthdayWishCount})`);
      updatedCount++;
    } catch (err) {
      console.error(`Failed to update ${cameoName}:`, err);
    }
  }
  console.log(`\n✅ Update complete. Total celebs updated: ${updatedCount}.`);
  process.exit(0);
}

updateCelebScores().catch((err) => {
  console.error("❌ Error in updateCelebScores:", err);
  process.exit(1);
});
