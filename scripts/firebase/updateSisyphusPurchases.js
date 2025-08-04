// scripts/firebase/updateSisyphusPurchases.js
// Usage: node scripts/firebase/updateSisyphusPurchases.js
// For each row in sisyphusPurchases.csv, if /stats/sisyphus/purchases/{iname} exists, update timesBought to 150% of icount (integer).

import admin from "firebase-admin";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Helper to parse CSV
function parseCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  const headers = lines[0].replace(/"/g, "").split(",");
  return lines.slice(1).map(line => {
    const values = line.match(/("[^"]*"|[^,]+)/g).map(v => v.replace(/"/g, ""));
    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i]; });
    return obj;
  });
}

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load dev service account
const devServiceAccount = JSON.parse(readFileSync(join(__dirname, "./dev-service-account.json"), "utf8"));

// Initialize Firebase app
const devApp = admin.initializeApp({
  credential: admin.credential.cert(devServiceAccount),
}, "development");
const devDb = devApp.firestore();

async function updateSisyphusPurchases() {
  const csvPath = join(__dirname, "./OLD_SQL/sisyphusPurchases.csv");
  const csvText = readFileSync(csvPath, "utf8");
  const rows = parseCSV(csvText);

  let updatedCount = 0;
  for (const row of rows) {
    const iname = row.iname;
    const icount = parseInt(row.icount, 10);
    if (!iname || isNaN(icount)) continue;
    const timesBought = Math.round(icount * 1.5);
    const docRef = devDb.doc(`stats/sisyphus/purchases/${iname}`);
    try {
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        await docRef.update({ timesBought });
        updatedCount++;
        console.log(`Updated: ${iname} (timesBought: ${timesBought})`);
      }
    } catch (err) {
      console.error(`Error for ${iname}: ${err.message}`);
    }
  }
  console.log(`\n✅ Update complete. Total purchases updated: ${updatedCount}.`);
  process.exit(0);
}

updateSisyphusPurchases().catch(err => {
  console.error("❌ Error in updateSisyphusPurchases:", err);
  process.exit(1);
});
