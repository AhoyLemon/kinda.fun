// scripts/firebase/updateCameoValuations.js
// Usage: node scripts/firebase/updateCameoValuations.js
// Updates actualValue, averagePlayerValue, and valuationCount for each cameo celeb in dev Firestore from the aggregated CSV file.

import admin from "firebase-admin";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Helper to parse CSV
function parseCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  const headers = lines[0].replace(/"/g, "").split(",");
  return lines.slice(1).map((line) => {
    // Split by comma, but keep quoted strings together
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

async function updateCameoValuations() {
  const csvPath = join(__dirname, "./OLD_SQL/cameoValuations.aggregated.csv");
  const csvText = readFileSync(csvPath, "utf8");
  const rows = parseCSV(csvText);

  let updatedCount = 0;
  for (const row of rows) {
    const cameoName = row.cameoName;
    const actualValue = Number(row.actualValue);
    const averagePlayerValue = Number(row.averagePlayerValue);
    const valuationCount = Number(row.playerValueCount);
    const docRef = devDb.doc(`stats/cameo/celebs/${cameoName}`);
    try {
      await docRef.set({ name: cameoName, actualValue, averagePlayerValue, valuationCount }, { merge: true });
      // Remove cameoName field if it exists
      await docRef.update({ cameoName: admin.firestore.FieldValue.delete() });
      console.log(
        `Updated: ${cameoName} (name: ${cameoName}, actualValue: ${actualValue}, averagePlayerValue: ${averagePlayerValue}, valuationCount: ${valuationCount})`,
      );
      updatedCount++;
    } catch (err) {
      console.error(`Failed to update ${cameoName}:`, err);
    }
  }
  console.log(`\n✅ Update complete. Total celebs updated: ${updatedCount}.`);
  process.exit(0);
}

updateCameoValuations().catch((err) => {
  console.error("❌ Error in updateCameoValuations:", err);
  process.exit(1);
});
