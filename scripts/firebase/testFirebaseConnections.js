// scripts/firebase/testFirebaseConnections.js
// =============================================================
// Checks DEV and PROD Firestore connectivity and permissions.
// Run this to diagnose auth or IAM issues before using other
// firebase scripts.
//
// Usage: node scripts/firebase/testFirebaseConnections.js
// =============================================================

import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, readFileSync } from "fs";
import chalk from "chalk";
import Table from "cli-table3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PASS = chalk.green("✅ pass");
const FAIL = (msg) => chalk.red(`❌ ${msg}`);
const SKIP = chalk.gray("⏭  skipped");

const IAM_ROLES_NEEDED = [
  "Cloud Datastore User          — read/write Firestore documents",
  "Firebase Admin SDK Administrator Service Agent  — list collections, subcollections",
];

function iam_hint(email, projectId) {
  return [
    chalk.yellow("   → Fix: grant this service account the required IAM roles:"),
    ...IAM_ROLES_NEEDED.map((r) => chalk.gray(`      • ${r}`)),
    chalk.yellow(`   → GCP Console: https://console.cloud.google.com/iam-admin/iam?project=${projectId}`),
    chalk.yellow(`   → Principal:   ${email}`),
  ].join("\n");
}

// Map GRPC numeric status codes to human-readable names
const GRPC_CODES = {
  1: "CANCELLED",
  2: "UNKNOWN",
  3: "INVALID_ARGUMENT",
  4: "DEADLINE_EXCEEDED",
  5: "NOT_FOUND",
  7: "PERMISSION_DENIED",
  8: "RESOURCE_EXHAUSTED",
  12: "UNIMPLEMENTED",
  13: "INTERNAL",
  14: "UNAVAILABLE",
  16: "UNAUTHENTICATED",
};

function errorCode(err) {
  const raw = err?.code ?? err?.errorInfo?.code;
  if (typeof raw === "number" && GRPC_CODES[raw]) return GRPC_CODES[raw];
  if (raw) return String(raw);
  return String(err?.message || err).slice(0, 80);
}

// ---------------------------------------------------------------------------
// Check: credentials file
// ---------------------------------------------------------------------------

function checkCredentialsFile(filename) {
  const fullPath = join(__dirname, filename);
  if (!existsSync(fullPath)) {
    return {
      ok: false,
      label: FAIL("file not found"),
      hint: `   → Expected: ${fullPath}\n   → Copy the service account JSON from the Firebase Console.`,
    };
  }
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(fullPath, "utf8"));
  } catch {
    return {
      ok: false,
      label: FAIL("invalid JSON"),
      hint: `   → File at ${fullPath} is not valid JSON. Re-download from Firebase Console.`,
    };
  }
  for (const field of ["project_id", "client_email", "private_key"]) {
    if (!parsed[field]) {
      return {
        ok: false,
        label: FAIL(`missing field: ${field}`),
        hint: `   → The service account JSON is missing "${field}". Re-download from Firebase Console.`,
      };
    }
  }
  return { ok: true, label: PASS, account: parsed };
}

// ---------------------------------------------------------------------------
// Check: Firestore read
// ---------------------------------------------------------------------------

async function checkRead(db, docPath) {
  try {
    const snap = await db.doc(docPath).get();
    const note = snap.exists ? "" : chalk.gray(" (doc doesn't exist yet — that's ok)");
    return { ok: true, label: PASS + note };
  } catch (err) {
    const code = errorCode(err);
    return {
      ok: false,
      label: FAIL(code),
      errorCode: code,
    };
  }
}

// ---------------------------------------------------------------------------
// Check: Firestore write + delete (DEV only — never runs on PROD)
// ---------------------------------------------------------------------------

async function checkWrite(db, docPath) {
  try {
    const ref = db.doc(docPath);
    await ref.set({ _test: true, _ts: new Date().toISOString() });
    await ref.delete();
    return { ok: true, label: PASS };
  } catch (err) {
    const code = errorCode(err);
    return {
      ok: false,
      label: FAIL(code),
      errorCode: code,
    };
  }
}

// ---------------------------------------------------------------------------
// Check: listCollections (requires elevated IAM)
// ---------------------------------------------------------------------------

async function checkListCollections(db, docPath) {
  try {
    const ref = db.doc(docPath);
    await ref.listCollections();
    return { ok: true, label: PASS };
  } catch (err) {
    const code = errorCode(err);
    return {
      ok: false,
      label: FAIL(code),
      errorCode: code,
    };
  }
}

// ---------------------------------------------------------------------------
// Check: collection query
// ---------------------------------------------------------------------------

async function checkQuery(db, collectionPath) {
  try {
    const snap = await db.collection(collectionPath).limit(1).get();
    const note = snap.empty ? chalk.gray(" (empty collection — that's ok)") : "";
    return { ok: true, label: PASS + note };
  } catch (err) {
    const code = errorCode(err);
    return {
      ok: false,
      label: FAIL(code),
      errorCode: code,
    };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function runChecks(label, serviceAccountFile, isProduction) {
  console.log(chalk.bold(`\n🔍 Checking ${label}...`));

  const results = {};

  // 1. Credentials file
  const creds = checkCredentialsFile(serviceAccountFile);
  results["Credentials file"] = { label: creds.label, hint: creds.hint };
  if (!creds.ok) {
    console.log(chalk.red(`   credentials file check failed — skipping remaining checks for ${label}`));
    return results;
  }

  const { account } = creds;
  const projectId = account.project_id;
  const clientEmail = account.client_email;

  // 2. Init Firebase app
  let db;
  const appName = `check-${label.replace(/\s+/g, "-")}-${Date.now()}`;
  try {
    const app = admin.initializeApp({ credential: admin.credential.cert(account) }, appName);
    db = app.firestore();
    results["App init / auth"] = { label: PASS };
  } catch (err) {
    results["App init / auth"] = {
      label: FAIL(errorCode(err)),
      hint: `   → Could not initialise Firebase Admin SDK.\n   → Verify the service account JSON is valid and belongs to project "${projectId}".`,
    };
    return results;
  }

  // 3. Read a known document
  const readResult = await checkRead(db, "stats/cameo");
  results["Read  (stats/cameo)"] = readResult;
  if (!readResult.ok) {
    readResult.hint = iam_hint(clientEmail, projectId);
  }

  // 4. Query a known collection
  const queryResult = await checkQuery(db, "stats/cameo/celebs");
  results["Query (stats/cameo/celebs)"] = queryResult;
  if (!queryResult.ok) {
    queryResult.hint = iam_hint(clientEmail, projectId);
  }

  // 5. listCollections (needed for recursive cloning)
  const listResult = await checkListCollections(db, "stats/cameo");
  results["listCollections()"] = listResult;
  if (!listResult.ok) {
    listResult.hint = iam_hint(clientEmail, projectId);
  }

  // 6. Write + delete (DEV only — never on PROD)
  if (!isProduction) {
    const writeResult = await checkWrite(db, "_connectionTest/_test");
    results["Write + delete (DEV only)"] = writeResult;
    if (!writeResult.ok) {
      writeResult.hint = iam_hint(clientEmail, projectId);
    }
  } else {
    results["Write + delete"] = {
      label: SKIP + chalk.gray(" (PROD writes not tested here)"),
    };
  }

  return results;
}

async function main() {
  console.log(chalk.bold.blue("\n🔧 Firebase Connection Checker\n"));
  console.log(chalk.gray("   Tests credentials, auth, read, write, and listCollections"));
  console.log(chalk.gray("   for both DEV and PROD Firestore instances.\n"));

  const [devResults, prodResults] = await Promise.all([
    runChecks("DEV  (kinda-fun-dev)", "dev-service-account.json", false),
    runChecks("PROD (kinda-fun)", "prod-service-account.json", true),
  ]);

  // Collect all check names across both
  const allChecks = Array.from(new Set([...Object.keys(devResults), ...Object.keys(prodResults)]));

  const table = new Table({
    head: [chalk.white("Check"), chalk.cyan("DEV (kinda-fun-dev)"), chalk.magenta("PROD (kinda-fun)")],
    style: { head: [] },
    colWidths: [32, 45, 45],
    wordWrap: true,
  });

  for (const check of allChecks) {
    const dev = devResults[check] || { label: SKIP };
    const prod = prodResults[check] || { label: SKIP };
    table.push([chalk.white(check), dev.label, prod.label]);
  }

  console.log("\n" + table.toString());

  // Print hints for any failures
  const hints = [];
  for (const [check, result] of Object.entries(devResults)) {
    if (!result.ok && result.hint) hints.push({ env: "DEV", check, hint: result.hint });
  }
  for (const [check, result] of Object.entries(prodResults)) {
    if (!result.ok && result.hint) hints.push({ env: "PROD", check, hint: result.hint });
  }

  if (hints.length === 0) {
    console.log(chalk.bold.green("\n✅ All checks passed! Both Firestore connections are healthy.\n"));
  } else {
    console.log(chalk.bold.red(`\n⚠️  ${hints.length} issue(s) found:\n`));
    for (const { env, check, hint } of hints) {
      console.log(chalk.bold(`[${env}] ${check}`));
      console.log(hint);
      console.log();
    }
  }
}

main().catch((err) => {
  console.error(chalk.red("\n💥 Unexpected error:"), err);
  process.exit(1);
});
