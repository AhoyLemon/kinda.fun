# Scripts Help

> This document describes the main scripts in the `/scripts` and `/scripts/firebase` directories, including their purpose and usage.

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

## `/scripts/generate-arrests.js`

### Why!?

Do you want to redefine which billionaires are arrested on which days? This script will do that for you.

### Purpose:

Loops thru all the possible billionaires and provides a random(ish) list of 20 billionaires for each day of the year. This data is then used to determine which billionaires are arrested on which days.

### Usage:

```sh
node scripts/generate-arrests.js
```

---

## `/scripts/update-billionaires-2024.js`

### Why!?

Parse the CSV file of billionaries (scraped from Forbes) and use it to populate which billionaires are available in the game. As new billionaire lists are published, this should be done again.

### Purpose:

Updates the list of billionaires for 2024. This script likely fetches new data, processes updates, and refreshes the relevant database or files for the current year. Review the script for specifics on data sources and update logic.

**Usage:**

```sh
node scripts/update-billionaires-2024.js
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
