/**
 * Unique IDs Test Suite
 *
 * This test suite checks that all IDs are unique across various game data sources:
 * - Court game: Justice IDs (across all pools), Case IDs
 * - Megachurch game: Religion IDs, Theme IDs
 *
 * Duplicate IDs can cause unexpected behavior in games and data lookups.
 */

import { describe, it, expect } from "vitest";

// Court imports
import type { Justice } from "../src/views/court/ts/_types";
import type { Case } from "../src/views/court/ts/_types";
import {
  justiceCurrent,
  justiceHistorical,
  justiceFictional,
  justiceCelebrity,
  justiceWarrenExtra,
  justiceLochnerExtra,
} from "../src/views/court/ts/_justices";
import { cases as allCases, casesHistorical, casesFictional } from "../src/views/court/ts/_cases";

// Megachurch imports
import type { Religion, Theme } from "../src/views/megachurch/ts/_types";
import { religions } from "../src/views/megachurch/ts/_religions";
import { themes } from "../src/views/megachurch/ts/_sermons";

/**
 * Helper function to check for duplicate IDs in an array.
 * Looks for a 'name' or 'title' field for display purposes.
 */
function checkDuplicateIds<T extends { id: number }>(items: T[], idType: string): string[] {
  const seen = new Map<number, string>();
  const duplicates: string[] = [];

  for (const item of items) {
    const displayName = (item as any).name || (item as any).title || `Unknown ${idType}`;

    if (seen.has(item.id)) {
      duplicates.push(`ID ${item.id} is used by both "${seen.get(item.id)}" and "${displayName}"`);
    } else {
      seen.set(item.id, displayName);
    }
  }

  if (duplicates.length > 0) {
    console.error(`\n❌ Duplicate ${idType} IDs:\n` + duplicates.map((d) => `  - ${d}`).join("\n"));
  }

  return duplicates;
}

describe("Unique IDs Across Games", () => {
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
          const displayName = `${justice.name} (pool: ${name})`;
          if (seen.has(justice.id)) {
            duplicates.push(`ID ${justice.id} is used by both "${seen.get(justice.id)}" and "${justice.name}" (pool: ${name})`);
          } else {
            seen.set(justice.id, displayName);
          }
        }
      }

      if (duplicates.length > 0) {
        console.error("\n❌ Duplicate justice IDs:\n" + duplicates.map((d) => `  - ${d}`).join("\n"));
      }

      expect(duplicates).toEqual([]);
    });
  });

  describe("Case IDs", () => {
    it("every case in casesHistorical has a unique id", () => {
      const duplicates = checkDuplicateIds(casesHistorical, "case");
      expect(duplicates).toEqual([]);
    });
  });

  describe("Religion IDs", () => {
    it("every religion has a unique id", () => {
      const duplicates = checkDuplicateIds(religions, "religion");
      expect(duplicates).toEqual([]);
    });
  });

  describe("Theme IDs", () => {
    it("every theme has a unique id", () => {
      const duplicates = checkDuplicateIds(themes, "theme");
      expect(duplicates).toEqual([]);
    });
  });
});
