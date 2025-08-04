# Firebase Scripts Help

This document explains the purpose and usage of the main Firebase-related scripts in the `scripts/firebase/` directory.

---

## `purgeRooms.js`

**Purpose:**
Deletes all documents in the `/rooms` collection of the dev Firestore database, except for `/rooms/_STATS`. This includes recursively deleting all subcollections and their documents. After purging, it updates `/rooms/_STATS` by incrementing the `timesPurged` field and setting `lastPurged` to the current date and time.

**Usage:**
Run with Node.js:

```sh
node scripts/firebase/purgeRooms.js
```

---

## `cloneFirestore.js`

**Purpose:**
Clones selected collections and documents from the production Firestore database to the development Firestore database. It supports recursive cloning of collections and their subcollections, as well as individual document cloning (fields only).

**Usage:**
Run with Node.js:

```sh
node scripts/firebase/cloneFirestore.js
```

Or use the npm script:

```sh
npm run firebase:hydrate
```

---

## `dumpFirestoreToProd.js`

**Purpose:**
(Assumed from filename) This script likely copies or dumps data from the development Firestore database to the production Firestore database. It may be used for promoting test data or restoring production from a backup. Please review the script for specific details and safety checks before running.

**Usage:**
Run with Node.js:

```sh
node scripts/firebase/dumpFirestoreToProd.js
```

---

**Note:**
Always ensure you have backups and understand the impact of these scripts before running them, especially when deleting or overwriting data in Firestore.
