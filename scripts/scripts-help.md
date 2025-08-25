# Scripts Help

> This document describes the main scripts in the `/scripts`, `/scripts/npm` and `/scripts/firebase` directories, including their purpose and usage.

---

## `/scripts/firebase/purgeRooms.js`

### Why!?

- To clean up the rooms in the dev environment.

### Purpose

- Deletes all documents in the `/rooms` collection of the dev Firestore database, except for `/rooms/_STATS`. Recursively deletes all subcollections and their documents. After purging, updates `/rooms/_STATS` by incrementing `timesPurged` and setting `lastPurged` to the current date/time.

### Usage

```sh
node scripts/firebase/purgeRooms.js
```

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

### /scripts/npm-run/guillotine-csv.js

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

## `/scripts/npm-run/guillotine-js.js`

### Why!?

Parse the CSV file of billionaries (scraped from Forbes) and use them to populate which billionaires are available in the game. As new billionaire lists are published, this should be done again.

### Purpose:

Combines several CSV files and don't post-parsing to ensure `_billionaires.js` is the best gameplay file we can use.

**Output files:**

- `src/views/guillotine/js/_billionaires.js` (main gameplay file populated with billionaire data)

**Usage:**

```sh
## Use the npm script:
npm run guillotine:js
```

---

## `/scripts/npm-run/guillotine-arrests.js`

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

## `/scripts/update-sitemap.js`

### Why!?

You should never need to touch this. It is run automatically to update the `lastmod` values for the sitemap, based on the last time `npm run build` was run

### Purpose:

Regenerates the sitemap for the site, ensuring all pages and resources are included for search engines. This script may scan the site structure, update `sitemap.xml`, and handle custom URLs or exclusions.

### Usage:

```sh
node scripts/update-sitemap.js
```

---

**Note:**
Always ensure you have backups and understand the impact of these scripts before running them, especially when deleting or overwriting data in Firestore or updating site-wide files.
