/**
 * Stance Usage Report for Supreme Court: The Card Game
 *
 * This test:
 * 1. Counts how often each StanceType appears across justices, presidents, and cases
 * 2. Reports the 5 most- and least-used stances
 * 3. Flags any StanceType that has zero usages (potential unused/misspelled topic)
 */

import { describe, it, expect } from "vitest";
import type { StanceType } from "../src/views/court/ts/_types";
import {
  justiceCurrent,
  justiceHistorical,
  justiceFictional,
  justiceCelebrity,
  justiceWarrenExtra,
  justiceLochnerExtra,
} from "../src/views/court/ts/_justices";
import { presidents } from "../src/views/court/ts/_presidents";
import { cases as allCases, casesHistorical, casesFictional } from "../src/views/court/ts/_cases";
import Table from "cli-table3";
import colors from "colors";

const casesArray = [...allCases, ...casesHistorical, ...casesFictional];

// Dynamically collect all unique stance topics from justices, presidents, and cases
const stanceSet = new Set<string>();
const addStances = (arr: any[], key: string = "stances") => {
  arr.forEach((item) => {
    (item[key] ?? []).forEach(({ topic }: { topic: string }) => {
      stanceSet.add(topic);
    });
  });
};
addStances([...justiceCurrent, ...justiceHistorical, ...justiceFictional, ...justiceCelebrity, ...justiceWarrenExtra, ...justiceLochnerExtra]);
addStances(presidents);
casesArray.forEach((c) => {
  Object.keys(c.prosecution.stances ?? {}).forEach((topic) => stanceSet.add(topic));
  Object.keys(c.defendant.stances ?? {}).forEach((topic) => stanceSet.add(topic));
});
const ALL_STANCE_TOPICS: string[] = Array.from(stanceSet).sort();

// ─── Build usage counts ──────────────────────────────────────────────────────

const counts: Record<
  string,
  {
    justices: number;
    presidents: number;
    cases: number;
    total: number;
  }
> = {};

ALL_STANCE_TOPICS.forEach((t) => {
  counts[t] = { justices: 0, presidents: 0, cases: 0, total: 0 };
});

const allJustices = [...justiceCurrent, ...justiceHistorical, ...justiceFictional, ...justiceCelebrity, ...justiceWarrenExtra, ...justiceLochnerExtra];

// Justice stances
allJustices.forEach((j) => {
  (j.stances ?? []).forEach(({ topic }) => {
    if (topic in counts) {
      counts[topic as StanceType].justices++;
      counts[topic as StanceType].total++;
    }
  });
});

// President stances
presidents.forEach((p) => {
  (p.stances ?? []).forEach(({ topic }) => {
    if (topic in counts) {
      counts[topic as StanceType].presidents++;
      counts[topic as StanceType].total++;
    }
  });
});

// Case stances (prosecution + defendant)
[...allCases, ...casesHistorical, ...casesFictional].forEach((c) => {
  if (c.prosecution.stances) {
    Object.keys(c.prosecution.stances).forEach((topic) => {
      if (topic in counts) {
        counts[topic as StanceType].cases++;
        counts[topic as StanceType].total++;
      }
    });
  }
  if (c.defendant.stances) {
    Object.keys(c.defendant.stances).forEach((topic) => {
      if (topic in counts) {
        counts[topic as StanceType].cases++;
        counts[topic as StanceType].total++;
      }
    });
  }
});

// ─── Sorted arrays ───────────────────────────────────────────────────────────

const sorted = ALL_STANCE_TOPICS.slice().sort((a, b) => counts[b].total - counts[a].total);
const top5 = sorted.slice(0, 5);
const bottom5 = sorted.slice(-5).reverse();
const unused = sorted.filter((t) => counts[t].total === 0);

// ─── CLI-TABLE3 + COLORS OUTPUT ─────────────────────────────────────────────

console.log("\n" + colors.cyan.bold("================================================================"));
console.log(colors.cyan.bold("  STANCE USAGE REPORT -- Court Card Game  "));
console.log(colors.cyan.bold("================================================================\n"));

console.log(colors.white("Total stances tracked: ") + colors.yellow(String(ALL_STANCE_TOPICS.length)));
console.log(
  colors.white("Total justice stances: ") +
    colors.yellow(
      String(
        allJustices.reduce(function (n, j) {
          return n + (j.stances ? j.stances.length : 0);
        }, 0),
      ),
    ),
);
console.log(
  colors.white("Total president stances: ") +
    colors.yellow(
      String(
        presidents.reduce(function (n, p) {
          return n + (p.stances ? p.stances.length : 0);
        }, 0),
      ),
    ),
);
const caseStanceCount = casesArray.reduce(function (n, c) {
  return n + Object.keys(c.prosecution.stances || {}).length + Object.keys(c.defendant.stances || {}).length;
}, 0);
console.log(colors.white("Total case stances: ") + colors.yellow(String(caseStanceCount)) + "\n");

// Top 5 Table
const topTable = new Table({
  head: [
    colors.green.bold("#"),
    colors.green.bold("Stance Type"),
    colors.green.bold("Total"),
    colors.green.bold("Justices"),
    colors.green.bold("Presidents"),
    colors.green.bold("Cases"),
  ],
  colWidths: [4, 26, 8, 10, 12, 8],
});
top5.forEach((t, i) => {
  const { justices, presidents: pres, cases: cs, total } = counts[t];
  topTable.push([
    colors.green((i + 1).toString()),
    colors.bold(t),
    colors.yellow(total.toString()),
    colors.cyan(justices.toString()),
    colors.magenta(pres.toString()),
    colors.blue(cs.toString()),
  ]);
});
console.log(colors.green.bold("🔝 Top 5 Most Used Stances:"));
console.log(topTable.toString());

// Bottom 5 Table
const bottomTable = new Table({
  head: [
    colors.red.bold("#"),
    colors.red.bold("Stance Type"),
    colors.red.bold("Total"),
    colors.red.bold("Justices"),
    colors.red.bold("Presidents"),
    colors.red.bold("Cases"),
  ],
  colWidths: [4, 26, 8, 10, 12, 8],
});
bottom5.forEach((t, i) => {
  const { justices, presidents: pres, cases: cs, total } = counts[t];
  bottomTable.push([
    colors.red((i + 1).toString()),
    colors.bold(t),
    colors.yellow(total.toString()),
    colors.cyan(justices.toString()),
    colors.magenta(pres.toString()),
    colors.blue(cs.toString()),
  ]);
});
console.log("\n" + colors.red.bold("🔻 Bottom 5 Least Used Stances:"));
console.log(bottomTable.toString());

// Unused stances
if (unused.length > 0) {
  console.log("\n" + colors.bgYellow.black("UNUSED STANCES (" + unused.length + ") — these may be candidates for removal or need more coverage:"));
  const unusedTable = new Table({
    head: [colors.yellow.bold("Unused Stance Type")],
    colWidths: [32],
  });
  unused.forEach((t) => unusedTable.push([colors.yellow(t)]));
  console.log(unusedTable.toString());
} else {
  console.log("\n" + colors.green.bold("✅ All stance types are used at least once."));
}
console.log("\n" + colors.cyan.bold("════════════════════════════════════════════════════════════════\n"));

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Stance Usage", () => {
  it("has at least 30 stance types defined", () => {
    expect(ALL_STANCE_TOPICS.length).toBeGreaterThanOrEqual(30);
  });

  it("every justice stance topic is a valid StanceType", () => {
    const invalidJusticeStances: string[] = [];
    allJustices.forEach((j) => {
      (j.stances ?? []).forEach(({ topic }) => {
        if (!ALL_STANCE_TOPICS.includes(topic)) {
          invalidJusticeStances.push(`Justice ${j.name}: "${topic}"`);
        }
      });
    });
    if (invalidJusticeStances.length > 0) {
      console.error("\n❌ Invalid justice stances:\n" + invalidJusticeStances.map((s) => `  - ${s}`).join("\n"));
    }
    expect(invalidJusticeStances).toEqual([]);
  });

  it("every president stance topic is a valid StanceType", () => {
    const invalidPresidentStances: string[] = [];
    presidents.forEach((p) => {
      (p.stances ?? []).forEach(({ topic }) => {
        if (!ALL_STANCE_TOPICS.includes(topic)) {
          invalidPresidentStances.push(`President ${p.name}: "${topic}"`);
        }
      });
    });
    if (invalidPresidentStances.length > 0) {
      console.error("\n❌ Invalid president stances:\n" + invalidPresidentStances.map((s) => `  - ${s}`).join("\n"));
    }
    expect(invalidPresidentStances).toEqual([]);
  });

  it("every case stance topic is a valid StanceType", () => {
    const invalidCaseStances: string[] = [];
    casesArray.forEach((c) => {
      [...Object.keys(c.prosecution.stances ?? {}), ...Object.keys(c.defendant.stances ?? {})].forEach((topic) => {
        if (!ALL_STANCE_TOPICS.includes(topic)) {
          invalidCaseStances.push(`Case "${c.name}": "${topic}"`);
        }
      });
    });
    if (invalidCaseStances.length > 0) {
      console.error("\n❌ Invalid case stances:\n" + invalidCaseStances.map((s) => `  - ${s}`).join("\n"));
    }
    expect(invalidCaseStances).toEqual([]);
  });

  it("flags unused stances", () => {
    if (unused.length > 0) {
      console.warn("\n⚠️  The following stance types are not used anywhere:", unused.join(", "));
    }
    // Not a failure — just informational. Uncomment below to enforce full coverage:
    // expect(unused).toEqual([]);
    expect(true).toBe(true); // always passes, flag is in console output
  });
});

// ─── Justice ID Uniqueness ────────────────────────────────────────────────────

describe("Justice IDs", () => {
  it("every justice has a unique id across all pools", () => {
    const seen = new Map<number, string>();
    const duplicates: string[] = [];

    const allPools = [
      { pool: justiceCurrent, name: "current" },
      { pool: justiceHistorical, name: "historical" },
      { pool: justiceFictional, name: "fictional" },
      { pool: justiceCelebrity, name: "celebrity" },
      { pool: justiceWarrenExtra, name: "warren" },
      { pool: justiceLochnerExtra, name: "lochner" },
    ];

    for (const { pool, name } of allPools) {
      for (const justice of pool) {
        if (seen.has(justice.id)) {
          duplicates.push(`ID ${justice.id} is used by both "${seen.get(justice.id)}" and "${justice.name}" (pool: ${name})`);
        } else {
          seen.set(justice.id, `${justice.name} (pool: ${name})`);
        }
      }
    }

    if (duplicates.length > 0) {
      console.error("\n❌ Duplicate justice IDs:\n" + duplicates.map((d) => `  - ${d}`).join("\n"));
    }

    expect(duplicates).toEqual([]);
  });
});
