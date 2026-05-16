import { describe, expect, it } from "vitest";

import { classifyJusticeVote, computeTacticShiftMetrics, getTrackedStanceNamesForOutcome, getWinningSide } from "../src/views/court/ts/_statsHelpers";
import type { Case } from "../src/views/court/ts/_types";

function makeCase(): Case {
  return {
    id: 777,
    name: "Telemetry Case",
    caseType: "fictional",
    primaryQuestion: "Question",
    prosecution: {
      name: "Prosecution",
      argument: "Argument",
      favoredBy: "Democrat",
      stances: {
        VotingRights: "For",
        FreeSpeech: "Neutral",
      },
    },
    defendant: {
      name: "Defense",
      argument: "Argument",
      favoredBy: "Republican",
      stances: {
        Privacy: "Against",
      },
    },
  };
}

describe("Court campaign stats helpers (#192)", () => {
  it("classifies votes relative to player side", () => {
    expect(classifyJusticeVote(15, "prosecution")).toBe("prosecution");
    expect(classifyJusticeVote(-15, "prosecution")).toBe("defense");
    expect(classifyJusticeVote(15, "defendant")).toBe("defense");
    expect(classifyJusticeVote(-15, "defendant")).toBe("prosecution");
    expect(classifyJusticeVote(0, "defendant")).toBe("abstain");
  });

  it("returns winning side from player-relative outcomes", () => {
    expect(getWinningSide("prosecution", "won")).toBe("prosecution");
    expect(getWinningSide("prosecution", "lost")).toBe("defendant");
    expect(getWinningSide("defendant", "won")).toBe("defendant");
    expect(getWinningSide("defendant", "lost")).toBe("prosecution");
    expect(getWinningSide("prosecution", "tied")).toBeNull();
  });

  it("tracks all stance topics on ties and only winning-side topics otherwise", () => {
    const courtCase = makeCase();

    expect(getTrackedStanceNamesForOutcome(courtCase, "prosecution", "won")).toEqual(["VotingRights"]);
    expect(getTrackedStanceNamesForOutcome(courtCase, "prosecution", "lost")).toEqual(["Privacy"]);
    expect(getTrackedStanceNamesForOutcome(courtCase, "prosecution", "tied").sort()).toEqual(["Privacy", "VotingRights"]);
  });

  it("computes net and absolute tactic movement for mixed multi-target outcomes", () => {
    const metrics = computeTacticShiftMetrics([{ change: 5 }, { change: -2 }, { change: -3 }, { change: 0 }]);

    expect(metrics.netShift).toBe(0);
    expect(metrics.absoluteShift).toBe(10);
  });

  it("opponent-played tactics produce negative netShift, confirming caller must abs-normalize before storing", () => {
    // Opponent plays a card that swings 3 justices against the player (-8, -5, -3).
    // netShift is negative because changes are in the player-reference frame.
    // Court normalizes with Math.abs(metrics.netShift) before calling writeTacticStats,
    // so averageNetShiftPerPlay measures card POWER regardless of who played it.
    const opponentMetrics = computeTacticShiftMetrics([{ change: -8 }, { change: -5 }, { change: -3 }]);

    expect(opponentMetrics.netShift).toBe(-16);
    expect(Math.abs(opponentMetrics.netShift)).toBe(16);
    expect(opponentMetrics.absoluteShift).toBe(16);
  });
});
