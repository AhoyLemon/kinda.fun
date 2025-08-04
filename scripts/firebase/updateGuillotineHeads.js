// scripts/firebase/updateGuillotineHeads.js
// Usage: node scripts/firebase/updateGuillotineHeads.js
// For each row in guillotineHeads.csv, if /stats/guillotine/heads/{iname} exists, update headCount to 135% of icount (integer).
// If not, output missing rows to missingHeads.csv

import admin from "firebase-admin";
import { readFileSync, writeFileSync } from "fs";
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

async function updateGuillotineHeads() {
  const csvPath = join(__dirname, "./OLD_SQL/guillotineHeads.csv");
  const csvText = readFileSync(csvPath, "utf8");
  const rows = parseCSV(csvText);

  let updatedCount = 0;
  let missingRows = [];
  for (const row of rows) {
    const iname = row.iname;
    const icount = parseInt(row.icount, 10);
    const headValue = row.headValue !== undefined ? row.headValue : "";
    const lastRemoved = row.lastRemoved !== undefined ? row.lastRemoved : "";
    if (!iname || isNaN(icount)) continue;
    const headCount = Math.round(icount * 1.35);
    const docRef = devDb.doc(`stats/guillotine/heads/${iname}`);
    try {
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        await docRef.update({ headCount });
        updatedCount++;
        console.log(`Updated: ${iname} (headCount: ${headCount})`);
      } else {
        missingRows.push({ iname, headValue, icount, lastRemoved });
      }
    } catch (err) {
      console.error(`Error for ${iname}: ${err.message}`);
    }
  }

  // Write missing rows to CSV
  if (missingRows.length) {
    const outPath = join(__dirname, "./OLD_SQL/missingHeads.csv");
    const header = '"iname","headValue","icount","lastRemoved"\n';
    const lines = missingRows.map((row) => `"${row.iname}",${row.headValue},${row.icount},"${row.lastRemoved}"`);
    writeFileSync(outPath, header + lines.join("\n"), "utf8");
    console.log(`Missing heads written to: ${outPath}`);
  }

  console.log(`\n✅ Update complete. Total heads updated: ${updatedCount}.`);
  process.exit(0);
}

updateGuillotineHeads().catch((err) => {
  console.error("❌ Error in updateGuillotineHeads:", err);
  process.exit(1);
});
