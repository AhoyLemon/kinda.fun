# Issue 169 — Node Script DX Standardization

> **Status:** Complete — all 25 scripts standardized.
> **Scope:** All 25 scripts in `scripts/`, `scripts/npm-run/`, and `scripts/firebase/`.

---

## The Problem

The scripts folder has grown organically. Every developer (or AI assistant) who touched it brought their own habits. The result is five different console output styles, four different progress bar implementations (including three verbatim copy-pastes of the same function), three different ANSI color strategies, and destructive Firebase operations that run without any confirmation gate. Some scripts are genuinely beautiful to run; others crash silently with a raw Node.js stack trace and leave you guessing what happened.

This issue proposes a single, enforce-able standard so that every script looks and behaves consistently — whether it's a 30-line sitemap helper or a 300-line Firestore batch pipeline.

---

## The Standard

### Philosophy

> A well-run script should look good, tell you what it's about to do, tell you when it's done, and never silently fail.

Scripts are developer tools. They're not shipped to users and don't need to be minimal or neutral. They should be **legible**, **colorful**, and **predictable**. If a script takes more than a second or touches more than one document, it should show you progress. If it does something destructive, it should pause and ask.

---

## Tools

| Tool           | Role           | Why                                                                                                                                                                                                                                  |
| -------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `chalk`        | All coloring   | Already a project dependency. Eliminates the raw-ANSI-strings problem entirely. Never write `\x1b[32m` again.                                                                                                                        |
| `cli-table3`   | Tabular output | Already a project dependency. Used well in the guillotine pipeline. `console.table()` is uncolored and uncontrollable.                                                                                                               |
| `cli-progress` | Progress bars  | **New dependency.** Currently the progress bar function is copy-pasted three times and reimplemented two more ways. `cli-progress` provides a maintained, configurable, multi-bar-capable replacement. One install, zero copy-paste. |

> **On TypeScript:** Converting scripts to TypeScript is not required by this standard. The scripts are short, standalone, and run outside the main build pipeline. The benefits (type safety, IDE completion) are real but the migration cost is non-trivial. This standard can be adopted in plain JS without TS. If the project later adds a `tsconfig` config that covers the scripts folder, migration would be a natural next step — but it is not a blocker.

---

## The Rules

### R1 — Use `chalk` for all console color. No raw ANSI codes.

**Rule:** Every colored console output must use `chalk`. The `color` object pattern (`\x1b[32m`) and the inline ANSI string pattern (`` `\x1b[1m\x1b[32m text\x1b[0m` ``) are both banned.

**Why:** Three different ANSI approaches exist today. They all do the same thing. `chalk` is already installed, handles terminal detection (disables color in non-TTY contexts like CI logs), and is readable in code. Raw codes are hard to read, easy to break, and invisible to linters.

**Current violations:** `guillotine-csv.js` (color object), `guillotine-js.js` (inline codes), `touch-main-pug-on-partial-change.js` (inline codes).

---

### R2 — Use `cli-table3` for all tabular output. No `console.table()` or manual `padEnd` formatting.

**Rule:** Any time you're showing a structured set of rows, use `cli-table3`. Never use `console.table()` or manually right-pad strings with `padEnd` to fake a table.

**Why:** `console.table()` is Node's built-in but has no color support, no column control, and the column headers are whatever the object keys are — which often read poorly (e.g., `headCount` instead of `Head Count`). Manual `padEnd` formatting breaks if any value is longer than expected. `cli-table3` already handles this, handles wrapping, and already produces the best-looking output in the codebase (see the guillotine summary tables).

**Current violations:** `megachurch-tag-usage-report.js` (`console.table()`), `guillotine-js.js` (padEnd manual table).

---

### R3 — Use `cli-progress` for all progress bars. No copy-pasted `renderProgressBar`.

**Rule:** Any script that iterates over more than ~50 items, or makes more than ~10 async calls, must show a progress bar using `cli-progress`. The `renderProgressBar()` function must be deleted from all scripts once extracted; it must not appear in any new script.

**Why:** The `renderProgressBar` function has been copy-pasted verbatim into three scripts. This is the single clearest violation of DRY in the scripts folder. `cli-progress` is a first-class library with multibar support, ETA, custom formatting, and no `process.stdout.write` management required. It also gracefully handles non-TTY output (CI logs).

**Setup example:**

```js
import { SingleBar, Presets } from "cli-progress";

const bar = new SingleBar(
  {
    format: `${chalk.cyan("{label}")} [{bar}] {percentage}% | {value}/{total}`,
    barCompleteChar: "█",
    barIncompleteChar: "░",
    clearOnComplete: false,
    hideCursor: true,
  },
  Presets.shades_classic,
);

bar.start(totalDocs, 0, { label: "Processing heads" });
// ...in loop:
bar.increment();
// ...
bar.stop();
```

**Current violations:** `guillotine-stats-to-csv.js`, `guillotine-inflate-stats.js`, `guillotine-csv-to-firestore.js` (renderProgressBar copy-paste ×3), `guillotine-csv.js` (inline ANSI bar).

---

### R4 — Every script must have a header block.

**Rule:** The first thing printed when any script runs must be a styled header block. Minimum: script name and one-line purpose. Firebase scripts must also print the target project ID.

**Why:** Right now you can run half these scripts and the first line of output is either a document path being logged (`Deleted: stats/...`) or nothing at all. If you run the wrong script by accident (tab-complete failure, copy-paste error), you have no indication until something breaks or finishes.

**Template:**

```js
console.log(chalk.bold.blue("\n🔥 Script Name — What It Does\n"));
console.log(chalk.gray(`   Project: ${serviceAccount.project_id}\n`)); // Firebase scripts only
```

---

### R5 — Every script must have a final summary output.

**Rule:** The last thing printed before `process.exit()` must be a summary. For read-only/report scripts: what was read and how many items. For write scripts: how many items were created/updated/deleted, how many were skipped. Use a `cli-table3` summary table for anything with more than 2 stats.

**Why:** Several scripts today exit with no final message (`build-pages.js` is completely silent; `updatePretendGuesses.js` calls `process.exit(0)` in the loop body without printing anything). You run them and stare at a prompt wondering if they worked. A summary makes success unambiguous.

**Current violations:** `build-pages.js` (silent), `watch-pages.js` (silent), `dev.js` (silent startup), `aggregateCameoValuations.js` (single emoji line), `updatePretendGuesses.js` (exits inside loop without summary).

---

### R6 — Errors must be caught, colored, and descriptive. No raw stack traces on expected failures.

**Rule:** Every script must have a top-level `main().catch(...)` handler (or equivalent) that prints a `chalk.red("❌ Error: ...")` message before exiting with code 1. For async scripts with Firebase, this means:

```js
main().catch((err) => {
  console.error(chalk.red("\n❌ Unexpected error:"), err.message);
  process.exit(1);
});
```

For scripts that can fail for _expected_ reasons (missing file, empty CSV), use early `process.exit(1)` with a descriptive message, not an error throw that produces a stack trace.

**Why:** A raw Node.js stack trace says very little to someone who didn't write the script. Missing file? "Error: ENOENT: no such file or directory, open 'C:\...\guillotine-heads.csv'" is much less useful than "❌ Cannot inflate — required CSV file is missing. Run guillotine-stats-to-csv.js first." The guillotine pipeline already does this correctly; the standard brings every other script up to that level.

**Current violations:** `megachurch-tag-usage-report.js`, `theme-usage-report.js`, `update-sitemap.js`, `guillotine-csv.js`, `guillotine-js.js`, `build-pages.js` (all lack any error handling).

---

### R7 — Destructive operations require a `y/N` confirmation prompt. Dangerous operations require an exact-match string.

**Rule:** Define three operation tiers and their required gates:

| Tier            | Definition                                                  | Gate                                                                                     |
| --------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Safe**        | Read-only, writes to local files only                       | None required                                                                            |
| **Destructive** | Deletes Firestore documents, overwrites dev database fields | `y/N` prompt before proceeding                                                           |
| **Dangerous**   | Writes to production Firestore, bulk-deletes collections    | Exact-match string (`"Yes, I want to overwrite production"`) + `chalk.red` warning block |

**Why:** Today the only script with a confirmation is `dumpFirestoreToProd.js`, which writes to prod. But `purgeRooms.js` bulk-deletes an entire collection, `deleteCelebsWithoutName.js` batch-deletes documents, and `cloneFirestore.js` overwrites dev — all without any pause. `dumpFirestoreToProd.js` got it right; this rule applies the same logic consistently.

**Reusable prompt helper (inline in each script, or extracted to a shared util):**

```js
import readline from "readline";

async function confirm(message) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(chalk.yellow(`\n${message} [y/N] `), (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "y");
    });
  });
}
```

**Current violations:** `purgeRooms.js`, `deleteCelebsWithoutName.js`, `cloneFirestore.js` (all destructive, no prompt).

---

### R8 — Service account loading must use the `readJsonFile` helper, and missing files must produce a clear error.

**Rule:** All Firebase scripts must use:

```js
const readJsonFile = (path) => {
  if (!existsSync(path)) {
    console.error(chalk.red(`❌ Service account file not found: ${path}`));
    console.error(chalk.yellow("   Copy the appropriate service account JSON to scripts/firebase/"));
    process.exit(1);
  }
  return JSON.parse(readFileSync(path, "utf8"));
};
```

The inline `JSON.parse(readFileSync(...))` one-liner (Pattern B) is banned.

**Why:** Every Firebase script today crashes with a raw `ENOENT` error if the service account JSON is missing. This is an extremely common first-run problem (dev environment setup, CI, new team member). One guard, applied consistently, turns a confusing crash into an actionable instruction. Pattern B is also just noisier to read than the named helper.

**Current violations:** `deleteCelebsWithoutName.js`, `updateCameoCelebScores.js`, `updateCameoValuations.js`, `updateGuillotineHeads.js`, `updatePretendGuesses.js`, `updateSisyphusCheevos.js`, `updateSisyphusPurchases.js`.

---

### R9 — Long-running processes must handle `SIGINT` and clean up.

**Rule:** Any script that runs indefinitely (watchers, servers) or spawns child processes must register a `process.on("SIGINT", ...)` handler that cleans up and exits cleanly.

**Why:** `touch-main-pug-on-partial-change.js` is a long-running watcher with no `SIGINT` handler. Both `dev.js` and `watch-pages.js` have them; this is the one that doesn't. Pressing Ctrl+C on a script with no handler leaves dangling file watchers that can hold the process alive or produce confusing errors on next run.

**Current violations:** `touch-main-pug-on-partial-change.js`.

---

### R10 — Dead code must be removed on update.

**Rule:** When updating a script under this standard, remove any dead code discovered in the process. Specific known instances:

- `build-pages.js` — `groupedTable` is populated but never printed.
- `updatePretendGuesses.js` — `results` array is built but never used.
- `dev.js` and `watch-pages.js` — the `color` property in each watcher entry is never read.

**Why:** Dead code that looks functional deceives future editors into thinking something is being logged/used when it isn't. The `groupedTable` in `build-pages.js` is the most dangerous — it looks like it should produce output, and the fact that it doesn't is entirely non-obvious.

---

## Output Style Guide

### Color semantics

Always use these colors for these meanings, consistently:

| Color             | Use                                              |
| ----------------- | ------------------------------------------------ |
| `chalk.bold.blue` | Script title / section headers                   |
| `chalk.yellow`    | Warnings, configuration values, things to review |
| `chalk.green`     | Success, positive numbers, ✅ messages           |
| `chalk.red`       | Errors, ❌ messages, dangerous operations        |
| `chalk.gray`      | Metadata, file paths, supplementary detail       |
| `chalk.cyan`      | Progress bar labels, process names               |
| `chalk.white`     | Table headers                                    |
| `chalk.bold`      | Emphasis within a message                        |

### Standard script skeleton

```js
// scripts/[folder]/my-script.js
// One-line description of what this script does.
// Usage: node scripts/[folder]/my-script.js

import { existsSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import chalk from "chalk";
import Table from "cli-table3";
import { SingleBar, Presets } from "cli-progress";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------------------------------------------------------------
// ⚙️  CONFIGURATION — edit these before running
// ---------------------------------------------------------------------------

const SOME_CONSTANT = "value";

// ---------------------------------------------------------------------------

async function main() {
  // Header
  console.log(chalk.bold.blue("\n🔥 Script Title — Brief Purpose\n"));

  // Pre-flight checks
  if (!existsSync(SOME_FILE)) {
    console.error(chalk.red(`❌ Required file not found: ${SOME_FILE}`));
    process.exit(1);
  }

  // Progress
  const bar = new SingleBar({ format: `${chalk.cyan("{label}")} [{bar}] {percentage}% | {value}/{total}` }, Presets.shades_classic);
  bar.start(total, 0, { label: "Processing" });
  for (const item of items) {
    // ...work...
    bar.increment();
  }
  bar.stop();

  // Summary table
  const table = new Table({ head: [chalk.white("Field"), chalk.white("Value")] });
  table.push(["Items processed", chalk.green(count.toLocaleString())]);
  console.log("\n" + table.toString());

  console.log(chalk.bold.green("\n✅ Done!\n"));
  process.exit(0);
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Unexpected error:"), err.message);
  process.exit(1);
});
```

---

## Current Script Audit

The table below shows every script, what rules it currently violates, and what changes are needed to bring it into compliance. Scripts are listed in upgrade-priority order (most used / most dangerous first).

### Priority 1 — Destructive/Dangerous Firebase scripts (safety gap)

| Script                                | Violations                                                                                                                                               | Changes needed                                                                                                                                           |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `firebase/purgeRooms.js`              | R1 (no chalk), R4 (no header), R5 (no summary table), R6 (no descriptive errors), R7 (no confirmation before bulk delete), R8 (readJsonFile lacks guard) | Add header, add `y/N` confirmation prompt, wrap per-doc logs in a counter (not per-doc spam), add summary table, add error guard on service account load |
| `firebase/cloneFirestore.js`          | R1 (chalk only on one code path), R4 (no header), R5 (no summary), R7 (no prompt before overwriting dev), R8 (no file guard)                             | Add header, add `y/N` confirmation, add summary table, add progress bar during clone, apply chalk consistently throughout                                |
| `firebase/deleteCelebsWithoutName.js` | R1 (no chalk), R4 (no header), R5 (no summary table), R7 (no confirmation before batch delete), R8 (Pattern B + no guard)                                | Add header, add `y/N` confirmation, batch log deletions into a counter, add summary table                                                                |

### Priority 2 — Firebase update scripts (inconsistency + missing patterns)

| Script                                 | Violations                                                                                                                                              | Changes needed                                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `firebase/updateCameoCelebScores.js`   | R1, R3 (no progress bar), R4, R5 (no full summary), R8 (Pattern B + no guard)                                                                           | Add chalk throughout, add cli-progress bar, add header, replace final log with summary table, fix service account loading |
| `firebase/updateCameoValuations.js`    | R1, R3, R4, R5, R8 + silent `cameoName` field deletion (undocumented side effect)                                                                       | Same as above, plus add a log line noting field removal                                                                   |
| `firebase/updateGuillotineHeads.js`    | R1, R3, R4, R5, R8 + hardcoded inflation factor (1.35) should be a named constant                                                                       | Add chalk, progress bar, header, summary; extract `1.35` to `const INFLATION_FACTOR`                                      |
| `firebase/updatePretendGuesses.js`     | R1, R3, R4, R5, R8 + dead `results` array + `process.exit(0)` inside loop                                                                               | Remove dead `results` array, move `process.exit(0)` to after summary table, add chalk, progress bar, header               |
| `firebase/updateSisyphusCheevos.js`    | R1, R3, R4, R5, R8 + hardcoded 1.5× factor                                                                                                              | Add chalk, progress bar, header, summary; extract `1.5` to `const INFLATION_FACTOR`                                       |
| `firebase/updateSisyphusPurchases.js`  | Same as above (structurally identical)                                                                                                                  | Same changes                                                                                                              |
| `firebase/dumpFirestoreToProd.js`      | R1 (no chalk despite being most dangerous), R3 (no progress during clone), R4 (no header), R5 (no final summary), R8 (no file guard)                    | Add chalk throughout (especially `chalk.red.bold` on the danger warnings), add cli-progress, add header, add summary      |
| `firebase/aggregateCameoValuations.js` | R4 (no header), R5 (single emoji line isn't a summary), R6 (no top-level catch despite `async`). Misplaced in `firebase/` — has no Firebase dependency. | Move to `scripts/` root or `scripts/npm-run/`, add header, summary, catch                                                 |

### Priority 3 — npm-run scripts (usability improvements)

| Script                          | Violations                                                                                                                  | Changes needed                                                                                                                        |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `npm-run/guillotine-csv.js`     | R1 (custom color object instead of chalk), R3 (custom inline progress bar), R6 (no error handling whatsoever)               | Replace `color` object with `chalk`, replace inline bar with `cli-progress`, add `try/catch` on file reads                            |
| `npm-run/guillotine-js.js`      | R1 (inline ANSI codes), R2 (manual `padEnd` table), R6 (no error handling)                                                  | Replace ANSI codes with chalk, replace padEnd table with cli-table3, add error handling. Remove commented-out King Charles III block. |
| `npm-run/build.js`              | R1 (no chalk despite interactive prompts), R5 (emoji-only final log, not a summary table)                                   | Add chalk to the prompt and all status lines, replace final `console.log` with a cli-table3 summary of what was built                 |
| `npm-run/build-pages.js`        | R1, R4 (completely silent on success), R5 (completely silent), R6 (no try/catch), R10 (dead `groupedTable` code)            | Add chalk, header, a progress indicator per page, a summary table, remove dead code                                                   |
| `npm-run/guillotine-arrests.js` | R1 (no chalk), R4 (no header — first output is `📅 ...`), minification runs at module top level (should be inside `main()`) | Add chalk, add header, move minification call into `main()`                                                                           |
| `npm-run/dev.js`                | R4 (no startup header showing what's being spawned), R10 (dead `color` parameter in `run()`)                                | Add a startup table listing each process being started (name + command), drop unused `color` param                                    |
| `npm-run/watch-pages.js`        | R4 (completely silent), R5 (no startup confirmation of what's being watched), R10 (dead `color` property on entries)        | Add a startup table listing pages being watched, drop dead `color` properties                                                         |

### Priority 4 — Utility / report scripts

| Script                                | Violations                                                                                                                                               | Changes needed                                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `update-sitemap.js`                   | R1 (no chalk), R4 (single `console.log` line is not a header), R6 (no error handling), R9 (has shebang that no other script has — remove or standardize) | Add chalk, a minimal header, try/catch on `execSync`, decide on shebang consistency                                 |
| `touch-main-pug-on-partial-change.js` | R1 (raw ANSI codes), R9 (no `SIGINT` handler despite being a long-running watcher)                                                                       | Replace `\x1b[...]` with chalk, add `process.on("SIGINT", ...)` handler listing what file watchers are being closed |
| `megachurch-tag-usage-report.js`      | R1 (no chalk), R2 (`console.table()`), R4 (no header), R6 (no error handling)                                                                            | Add chalk, replace `console.table()` with cli-table3, add header, add try/catch                                     |
| `theme-usage-report.js`               | R1 (no chalk), R2 (uses `=== SECTION ===` format unique to this file), R4 (no header block), R6 (no error handling)                                      | Add chalk, replace `=== SECTION ===` with `chalk.bold.blue` section headers, add try/catch                          |

---

## Shared Utilities Proposal

Once the standard is adopted, these repeated patterns should be extracted to a small shared module at `scripts/shared/utils.js`:

```js
// scripts/shared/utils.js
// Shared helpers for all kinda.fun scripts.

export function loadServiceAccount(filename, __dirname) { ... }  // R8 — guarded JSON load
export async function confirm(message) { ... }                   // R7 — y/N prompt
export async function confirmExact(message, expected) { ... }    // R7 — exact-match prompt
```

The `renderProgressBar` function from the guillotine scripts should be **deleted entirely** and replaced by `cli-progress` (R3). It should not be migrated to `utils.js`.

> **Note:** Utility extraction is a secondary goal. Scripts should be converted to the standard first; extraction can happen in a follow-up pass once the patterns stabilize.

---

## Acceptance Criteria

- [ ] `cli-progress` added to `devDependencies` in `package.json`
- [ ] Every script uses `chalk` for all colored output — no raw `\x1b[` codes remain anywhere in `scripts/`
- [ ] Every script uses `cli-table3` for tabular output — no `console.table()` or `padEnd` table formatting remains
- [ ] Every script with a loop over >50 items uses `cli-progress`
- [ ] `renderProgressBar` function is removed from all three guillotine scripts
- [ ] Every script prints a header block on startup (R4)
- [ ] Every script prints a summary on completion (R5)
- [ ] All scripts have error handling — no uncaught crashes with raw stack traces (R6)
- [ ] `purgeRooms.js`, `deleteCelebsWithoutName.js`, and `cloneFirestore.js` have confirmation prompts (R7)
- [ ] All Firebase scripts use the guarded `readJsonFile` helper (R8)
- [ ] `touch-main-pug-on-partial-change.js` has a `SIGINT` handler (R9)
- [ ] Dead code removed from `build-pages.js`, `updatePretendGuesses.js`, `dev.js`, `watch-pages.js` (R10)
- [ ] `scripts-help.md` updated to reflect any scripts that are moved or renamed
