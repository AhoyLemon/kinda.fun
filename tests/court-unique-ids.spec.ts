import { describe, expect, it } from "vitest";

import { campaignSetups } from "../src/views/court/ts/_campaigns";
import { cases } from "../src/views/court/ts/_cases";
import { objectives } from "../src/views/court/ts/_objectives";
import { presidents } from "../src/views/court/ts/_presidents";
import { rewardCards } from "../src/views/court/ts/_rewards";
import { tactics } from "../src/views/court/ts/_tactics";
import {
  currentJustices,
  historicalJustices,
  fictionalJustices,
  celebrityJustices,
  warrenJustices,
  lochnerJustices,
} from "../src/views/court/ts/justices/index";

type IdLike = string | number;

/**
 * Returns the list of ids that appear more than once, each paired with how
 * many times it occurred. An empty array means every id is unique.
 */
function findDuplicateIds(items: { id: IdLike }[]): { id: IdLike; count: number }[] {
  const counts = new Map<IdLike, number>();
  for (const item of items) {
    counts.set(item.id, (counts.get(item.id) ?? 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count > 1).map(([id, count]) => ({ id, count }));
}

describe("Court — unique ids", () => {
  // Each dataset owns its own id space: a tactic with id 3 and a case with id 3
  // is fine. These cases only fail if ids collide *within* a single dataset.
  const datasets: { name: string; items: { id: IdLike }[] }[] = [
    { name: "campaigns", items: campaignSetups },
    { name: "cases", items: cases },
    { name: "objectives", items: objectives },
    { name: "presidents", items: presidents },
    { name: "rewards", items: rewardCards },
    { name: "tactics", items: tactics },
  ];

  for (const { name, items } of datasets) {
    it(`${name} have no reused ids`, () => {
      const duplicates = findDuplicateIds(items);
      expect(duplicates, `Duplicate ${name} ids: ${JSON.stringify(duplicates)}`).toEqual([]);
    });
  }

  // Justices are special: every justice — across every bench/era file — must
  // have a globally unique id, since benches mix justices from different pools.
  it("justices have no reused ids across all justice files", () => {
    const allJustices = [
      ...currentJustices,
      ...historicalJustices,
      ...fictionalJustices,
      ...celebrityJustices,
      ...warrenJustices,
      ...lochnerJustices,
    ];
    const duplicates = findDuplicateIds(allJustices);
    expect(duplicates, `Duplicate justice ids: ${JSON.stringify(duplicates)}`).toEqual([]);
  });
});
