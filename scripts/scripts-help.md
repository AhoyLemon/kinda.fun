# Scripts Help

> This document describes the main scripts in the `/scripts`, `/scripts/npm` and `/scripts/firebase` directories, including their purpose and usage.

---

## `/scripts/firebase/guillotine_statsToCsv.js`

### Why!?

- To snapshot the current guillotine head stats and aggregate game data from the dev Firestore into CSV files for review or manipulation.
- Step 1 of the inflate-heads workflow.

### Purpose

Reads every document in `/stats/guillotine/heads/{name}` and the top-level `/stats/guillotine` document from the **dev** Firestore, then writes two CSV files:

| Output file                              | Contents                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `scripts/csv/stats/guillotine-heads.csv` | `name`, `headCount`, `lastRemoved`, `netWorth` for each head                                            |
| `scripts/csv/stats/guillotine-stats.csv` | `gamesFinished`, `gameLastFinished`, `gamesStarted`, `lastGameStarted`, `scoresShared`, `wealthCreated` |

If any head document is missing one of its 4 expected fields, a report is printed in the console **and** saved to `scripts/csv/stats/guillotine-missing-fields.json`.

### Usage

```sh
node scripts/firebase/guillotine_statsToCsv.js
```

---

## `/scripts/firebase/guillotine_inflateStats.js`

### Why!?

- To inflate guillotine stats in the dev environment to compensate for a database wipe, simulating the activity that should have accumulated.

### Purpose

Reads the two CSV files produced by `guillotine-stats-to-csv.js` and writes two new inflated CSV files:

| Output file                                       | Contents                                                                                                                                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scripts/csv/stats/guillotine-heads-inflated.csv` | Same columns as source; `headCount` multiplied by `INFLATION_FACTOR` (rounded to integer)                                                                                                               |
| `scripts/csv/stats/guillotine-stats-inflated.csv` | `gamesStarted` and `scoresShared` multiplied by `INFLATION_FACTOR`; `gamesFinished` = 90% of new `gamesStarted`; `wealthCreated` recalculated as sum of `inflatedHeadCount × netWorth` across all heads |

**Will refuse to run if:**

- Source CSVs don't exist (run `guillotine_statsToCsv.js` first)
- `guillotine-missing-fields.json` exists and has entries (data quality gate)

**Configuration:** Edit `INFLATION_FACTOR` at the top of the script (default: `1.75`).

### Usage

```sh
node scripts/firebase/guillotine_inflateStats.js
```

---

## `/scripts/firebase/guillotine_csvToFirestore.js`

### Why!?

- Final step of the inflate-heads workflow: pushes the inflated CSV data back into the **dev** Firestore.

### Purpose

Reads `guillotine-heads-inflated.csv` and `guillotine-stats-inflated.csv` (configurable via constants at the top of the file) and updates the dev Firestore:

- `/stats/guillotine/heads/{name}` — updates `headCount` only; all other fields are untouched.
- `/stats/guillotine` — updates `gamesStarted`, `gamesFinished`, `scoresShared`, `wealthCreated` only.

Uses Firestore batch writes (450 ops/batch) to minimise API calls and stay within the free tier.  
**Never touches production.**

### Usage

```sh
node scripts/firebase/guillotine_csvToFirestore.js
```

**To use different input files**, edit `HEADS_CSV` and `STATS_CSV` at the top of the script.

---

## Inflate-Heads Workflow (all three scripts together)

```sh
# 1 — Export current dev stats to CSV
node scripts/firebase/guillotine_statsToCsv.js

# 2 — Review scripts/csv/stats/ for any missing-field warnings, then inflate
node scripts/firebase/guillotine_inflateStats.js

# 3 — Review the inflated CSVs, then push to dev Firestore
node scripts/firebase/guillotine_csvToFirestore.js
```

---

## `/scripts/firebase/invalid_purgeRooms.js`

### Why!?

- To clean up the rooms in the dev environment.

### Purpose

- Deletes all documents in the `/rooms` collection of the dev Firestore database, except for `/rooms/_STATS`. Recursively deletes all subcollections and their documents. After purging, updates `/rooms/_STATS` by incrementing `timesPurged` and setting `lastPurged` to the current date/time.

### Usage

```sh
node scripts/firebase/invalid_purgeRooms.js
```

---

## `/scripts/firebase/testFirebaseConnections.js`

### Why!?

- To diagnose Firebase connectivity and IAM permission problems before running any other Firebase scripts.
- Run this first if you see `PERMISSION_DENIED`, auth errors, or missing credentials errors.

### Purpose

Runs a full suite of checks against both the **DEV** (`kinda-fun-dev`) and **PROD** (`kinda-fun`) Firestore instances:

| Check | DEV | PROD |
|---|---|---|
| Credentials file exists & is valid JSON | ✅ | ✅ |
| Firebase Admin SDK initialises | ✅ | ✅ |
| Read a known document (`stats/cameo`) | ✅ | ✅ |
| Query a known collection (`stats/cameo/celebs`) | ✅ | ✅ |
| `listCollections()` (needed for recursive clone) | ✅ | ✅ |
| Write + delete a test document | ✅ | ⏭ skipped (not tested on PROD) |

For any failed check, the script prints an actionable suggestion including the exact IAM role and GCP Console URL to fix it.

### Usage

```sh
node scripts/firebase/testFirebaseConnections.js

# Or via npm:
npm run firebase:check
```

### Required IAM Roles

For checks to pass, both service accounts need:

- **Cloud Datastore User** — read/write Firestore documents
- **Firebase Admin SDK Administrator Service Agent** — `listCollections()` support

Grant roles at: GCP Console → IAM → find the service account `client_email` from the JSON file.

---

## `/scripts/firebase/cloneFirestore.js`

### Why!?

- To get data from the `kinda-fun` firestore (prod) to the dev environment, so it can be used for testing or development purposes.

### Purpose

Clones selected collections and documents from the production Firestore database to the development Firestore database. Supports recursive cloning of collections and subcollections, as well as individual document cloning (fields only).

### Usage

```sh
node scripts/firebase/cloneFirestore.js

## Or use the npm script:

npm run firebase:hydrate
```

---

## `/scripts/firebase/dumpFirestoreToProd.js`

### Why!?

⚠️ **DANGEROUS!** So maybe you need to get a specific chunk of data from the dev Firestore (`kinda-fun-dev`) to the prod environment (`kinda-fun`)

### Purpose

Copies or dumps data from the development Firestore database to the production Firestore database. Useful for promoting test data or restoring production from a backup. Review the script for specific details and safety checks before running.

### Usage

```sh
node scripts/firebase/dumpFirestoreToProd.js
```

---

### /scripts/npm-run/guillotine_mergeCsv.js

**Purpose:**
Generates a master CSV list of billionaires by merging and reconciling data from `forbes-2024.csv` and `forbes-2025.csv`. It updates net worths, assigns ranks (handling ties), and outputs a canonical list for use in the guillotine game.

**How it works:**

- Loops through all rows in `forbes-2024.csv`, looking for matches in `forbes-2025.csv`.
- If a match is found, updates the net worth to the 2025 value; otherwise, keeps the 2024 value.
- After merging, assigns ranks based on net worth, handling ties correctly.
- Outputs the result to `src/views/guillotine/csv/current-list.csv`.
- Also outputs a text file (`unmatched-2025-names.txt`) listing names found in 2025 but not in 2024 (useful for identifying new billionaires or string matching issues).

**Usage:**

```sh
npm run guillotine:csv
```

**Output files:**

- `src/views/guillotine/csv/current-list.csv` (main merged and ranked list)
- `src/views/guillotine/csv/unmatched-2025-names.txt` (names in 2025 not found in 2024)

**Notes:**

- The script uses a progress bar in the console for feedback.
- Handles fuzzy name matching and family suffixes to improve accuracy.

---

## `/scripts/npm-run/guillotine_generateJs.js`

### Why!?

Parse the CSV file of billionaries (scraped from Forbes) and use them to populate which billionaires are available in the game. As new billionaire lists are published, this should be done again.

### Purpose:

Combines several CSV files and don't post-parsing to ensure `_billionaires.js` is the best gameplay file we can use.

**Output files:**

- `src/views/guillotine/js/data/_billionaires.js` (main gameplay file populated with billionaire data)

**Usage:**

```sh
## Use the npm script:
npm run guillotine:js
```

---

## `/scripts/npm-run/guillotine_createArrests.js`

### Why!?

Do you want to redefine which billionaires are arrested on which days? This script will do that for you.

### Purpose:

Loops thru all the possible billionaires and provides a random(ish) list of 20 billionaires for each day of the year. This data is then used to determine which billionaires are arrested on which days.

### Usage:

```sh
## Use the npm script:
npm run guillotine:arrests
```

---

## `/scripts/updateSitemap.js`

### Why!?

You should never need to touch this. It is run automatically to update the `lastmod` values for the sitemap, based on the last time `npm run build` was run

### Purpose:

Regenerates the sitemap for the site, ensuring all pages and resources are included for search engines. This script may scan the site structure, update `sitemap.xml`, and handle custom URLs or exclusions.

### Usage:

```sh
node scripts/updateSitemap.js
```

---

**Note:**
Always ensure you have backups and understand the impact of these scripts before running them, especially when deleting or overwriting data in Firestore or updating site-wide files.
