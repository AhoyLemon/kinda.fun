import { describe, expect, it } from "vitest";

import { createCourtStatsHelpers } from "../src/views/court/ts/_statsHelpers";

interface FakeDocRef {
  path: string;
}

interface FakeCall {
  path: string;
  data: Record<string, unknown>;
}

function createFakeDeps(existingByPath: Record<string, Record<string, unknown>> = {}) {
  const calls: FakeCall[] = [];

  const fakeDeps = {
    doc: (_db: unknown, ...segments: string[]) => ({ path: segments.join("/") }) as FakeDocRef,
    getDoc: async (ref: FakeDocRef) => ({
      exists: () => !!existingByPath[ref.path],
      data: () => existingByPath[ref.path] ?? {},
    }),
    increment: (value: number) => ({ __increment: value }),
    serverTimestamp: () => ({ __serverTimestamp: true }),
    setDoc: async (ref: FakeDocRef, data: Record<string, unknown>) => {
      calls.push({ path: ref.path, data });
    },
  };

  return { fakeDeps, calls };
}

describe("Court stats helpers (#192)", () => {
  it("uses name-based Firestore paths for cases and justice vote docs", async () => {
    const { fakeDeps, calls } = createFakeDeps();
    const helpers = createCourtStatsHelpers({} as never, fakeDeps as never);

    await helpers.writeCaseStats({
      caseName: "A Case With Spaces",
      outcome: "won",
      winningSide: "prosecution",
    });

    await helpers.writeCaseJusticeVoteStats({
      caseName: "A Case With Spaces",
      voteByJusticeName: {
        "Justice Alpha": "prosecution",
      },
    });

    expect(calls.some((call) => call.path === "stats/court/cases/A Case With Spaces")).toBe(true);
    expect(calls.some((call) => call.path === "stats/court/justices/Justice Alpha/cases/A Case With Spaces")).toBe(true);
  });

  it("increments case counters for win/loss/tie correctly", async () => {
    const { fakeDeps, calls } = createFakeDeps();
    const helpers = createCourtStatsHelpers({} as never, fakeDeps as never);

    await helpers.writeCaseStats({
      caseName: "Case A",
      outcome: "tied",
      winningSide: null,
    });

    const caseCall = calls.find((call) => call.path === "stats/court/cases/Case A");
    expect(caseCall).toBeTruthy();
    if (!caseCall) return;

    expect(caseCall.data.timesPlayed).toEqual({ __increment: 1 });
    expect(caseCall.data.timesWon).toEqual({ __increment: 0 });
    expect(caseCall.data.timesLost).toEqual({ __increment: 0 });
    expect(caseCall.data.timesTied).toEqual({ __increment: 1 });
    expect(caseCall.data.prosecutionWins).toEqual({ __increment: 0 });
    expect(caseCall.data.defenseWins).toEqual({ __increment: 0 });
  });

  it("tracks reward chosen and activated as separate events", async () => {
    const { fakeDeps, calls } = createFakeDeps();
    const helpers = createCourtStatsHelpers({} as never, fakeDeps as never);

    await helpers.writeRewardStats({ rewardName: "Dream Justice", chosen: true });
    await helpers.writeRewardStats({ rewardName: "Dream Justice", activated: true });

    const rewardCalls = calls.filter((call) => call.path === "stats/court/rewards/Dream Justice");
    expect(rewardCalls).toHaveLength(2);

    expect(rewardCalls[0]?.data.timesChosen).toEqual({ __increment: 1 });
    expect(rewardCalls[0]?.data.timesActivated).toEqual({ __increment: 0 });
    expect(rewardCalls[1]?.data.timesChosen).toEqual({ __increment: 0 });
    expect(rewardCalls[1]?.data.timesActivated).toEqual({ __increment: 1 });
  });

  it("updates justice case vote buckets for prosecution, defense, and abstain", async () => {
    const { fakeDeps, calls } = createFakeDeps();
    const helpers = createCourtStatsHelpers({} as never, fakeDeps as never);

    await helpers.writeCaseJusticeVoteStats({
      caseName: "Case B",
      voteByJusticeName: {
        "Justice P": "prosecution",
        "Justice D": "defense",
        "Justice A": "abstain",
      },
    });

    const prosecutionCall = calls.find((call) => call.path === "stats/court/justices/Justice P/cases/Case B");
    const defenseCall = calls.find((call) => call.path === "stats/court/justices/Justice D/cases/Case B");
    const abstainCall = calls.find((call) => call.path === "stats/court/justices/Justice A/cases/Case B");

    expect(prosecutionCall?.data.prosecutionVotes).toEqual({ __increment: 1 });
    expect(defenseCall?.data.defenseVotes).toEqual({ __increment: 1 });
    expect(abstainCall?.data.abstainVotes).toEqual({ __increment: 1 });
  });

  it("computes tactic averages from existing totals with mixed shifts", async () => {
    const { fakeDeps, calls } = createFakeDeps({
      "stats/court/tactics/Big Swing": {
        timesPlayed: 4,
        totalNetLeaningShift: 10,
        totalAbsoluteLeaningShift: 26,
      },
    });
    const helpers = createCourtStatsHelpers({} as never, fakeDeps as never);

    await helpers.writeTacticStats({
      tacticName: "Big Swing",
      actor: "player",
      metrics: {
        netShift: -2,
        absoluteShift: 6,
      },
    });

    const tacticCall = calls.find((call) => call.path === "stats/court/tactics/Big Swing");
    expect(tacticCall).toBeTruthy();
    if (!tacticCall) return;

    expect(tacticCall.data.timesPlayed).toEqual({ __increment: 1 });
    expect(tacticCall.data.totalNetLeaningShift).toEqual({ __increment: -2 });
    expect(tacticCall.data.totalAbsoluteLeaningShift).toEqual({ __increment: 6 });
    expect(tacticCall.data.averageNetShiftPerPlay).toBeCloseTo(1.6, 5);
    expect(tacticCall.data.averageAbsoluteShiftPerPlay).toBeCloseTo(6.4, 5);
  });
});
