// scripts/firebase/updatePretendGuesses.js
// Usage: node scripts/firebase/updatePretendGuesses.js
// Updates or creates /stats/pretend/impersonators/{iname} with correctGuessCount, closeGuessCount, badGuessCount, and lastGuess.

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

async function updatePretendGuesses() {
  const csvPath = join(__dirname, "./OLD_SQL/pretendGuesses.csv");
  const csvText = readFileSync(csvPath, "utf8");
  const rows = parseCSV(csvText);

  const results = [];
  for (const row of rows) {
    const iname = row.iname;
    const correctGuessCount = parseInt(row.correctGuess, 10);
    const closeGuessCount = parseInt(row.closeGuess, 10);
    const badGuessCount = parseInt(row.badGuess, 10);
    const docRef = devDb.doc(`stats/pretend/impersonators/${iname}`);
    let action = "";
    try {
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        await docRef.set({ correctGuessCount, closeGuessCount, badGuessCount }, { merge: true });
        action = "updated";
        console.log(`Updated: ${iname} (correct: ${correctGuessCount}, close: ${closeGuessCount}, bad: ${badGuessCount})`);
      } else {
        await docRef.set({
          name: iname,
          correctGuessCount,
          closeGuessCount,
          badGuessCount,
          lastGuess: admin.firestore.FieldValue.serverTimestamp(),
        });
        action = "created";
        console.log(`Created: ${iname} (correct: ${correctGuessCount}, close: ${closeGuessCount}, bad: ${badGuessCount})`);
      }
      results.push({ iname, correctGuessCount, closeGuessCount, badGuessCount, action });
    } catch (err) {
      console.error(`Error for ${iname}: ${err.message}`);
      results.push({ iname, error: err.message });
    }
  }
  process.exit(0);
}

updatePretendGuesses().catch((err) => {
  console.error("❌ Error in updatePretendGuesses:", err);
  process.exit(1);
});
