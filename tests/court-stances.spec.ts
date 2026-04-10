/**
 * Stance Usage Report for Supreme Court: The Card Game
 *
 * This test:
 * 1. Counts how often each StanceType appears across justices, presidents, and cases
 * 2. Reports the 5 most- and least-used stances
 * 3. Flags any StanceType that has zero usages (potential unused/misspelled topic)
 */

import { describe, it, expect } from "vitest";
import { ALL_STANCE_TYPES } from "../src/views/court/ts/_types";
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

const casesArray = [...allCases, ...casesHistorical, ...casesFictional];

// ─── Build usage counts ──────────────────────────────────────────────────────

const counts: Record<
  StanceType,
  {
    justices: number;
    presidents: number;
    cases: number;
    total: number;
  }
> = {} as never;

ALL_STANCE_TYPES.forEach((t) => {
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

const sorted = ALL_STANCE_TYPES.slice().sort((a, b) => counts[b].total - counts[a].total);
const top5 = sorted.slice(0, 5);
const bottom5 = sorted.slice(-5).reverse();
const unused = sorted.filter((t) => counts[t].total === 0);

// ─── Console output ──────────────────────────────────────────────────────────

console.log("\n══════════════════════════════════════════");
console.log("  STANCE USAGE REPORT — Court Card Game  ");
console.log("══════════════════════════════════════════\n");

console.log(`Total stances tracked: ${ALL_STANCE_TYPES.length}`);
console.log(`Total justice stances: ${allJustices.reduce((n, j) => n + (j.stances?.length ?? 0), 0)}`);
console.log(`Total president stances: ${presidents.reduce((n, p) => n + (p.stances?.length ?? 0), 0)}`);
const caseStanceCount = casesArray.reduce((n, c) => n + Object.keys(c.prosecution.stances ?? {}).length + Object.keys(c.defendant.stances ?? {}).length, 0);
console.log(`Total case stances: ${caseStanceCount}\n`);

console.log("🔝 Top 5 Most Used Stances:");
top5.forEach((t, i) => {
  const { justices, presidents: pres, cases: cs, total } = counts[t];
  console.log(`  ${i + 1}. ${t.padEnd(25)} total=${total}  (justices=${justices}, presidents=${pres}, cases=${cs})`);
});

console.log("\n🔻 Bottom 5 Least Used Stances:");
bottom5.forEach((t, i) => {
  const { justices, presidents: pres, cases: cs, total } = counts[t];
  console.log(`  ${i + 1}. ${t.padEnd(25)} total=${total}  (justices=${justices}, presidents=${pres}, cases=${cs})`);
});

if (unused.length > 0) {
  console.log(`\n⚠️  UNUSED STANCES (${unused.length}) — these may be candidates for removal or need more coverage:`);
  unused.forEach((t) => console.log(`  • ${t}`));
} else {
  console.log("\n✅ All stance types are used at least once.");
}
console.log("\n══════════════════════════════════════════\n");

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Stance Usage", () => {
  it("has at least 30 stance types defined", () => {
    expect(ALL_STANCE_TYPES.length).toBeGreaterThanOrEqual(30);
  });

  it("every justice stance topic is a valid StanceType", () => {
    const invalidJusticeStances: string[] = [];
    allJustices.forEach((j) => {
      (j.stances ?? []).forEach(({ topic }) => {
        if (!ALL_STANCE_TYPES.includes(topic as StanceType)) {
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
        if (!ALL_STANCE_TYPES.includes(topic as StanceType)) {
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
        if (!ALL_STANCE_TYPES.includes(topic as StanceType)) {
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
