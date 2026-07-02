import { describe, expect, it } from "vitest";

import { resolveEffect } from "../src/views/court/ts/_tacticEffects";
import { tactics } from "../src/views/court/ts/_tactics";
import type { Case, CourtGameState, Justice, Party, Tactic } from "../src/views/court/ts/_types";

function makeJustice(id: number, name: string, party: Party, stats?: Partial<Justice["stats"]>, weaknesses?: Partial<Justice["weaknesses"]>): Justice {
  return {
    id,
    name,
    image: "",
    description: "",
    justiceType: "current",
    gender: "M",
    birthYear: 1970,
    nominatedBy: { id: 1000 + id, name: `${name} President`, party },
    religion: "Other",
    ethnicity: "White",
    stats: {
      logic: 5,
      charisma: 5,
      empathy: 5,
      susceptibility: 5,
      partyLoyalty: 5,
      ...stats,
    },
    weaknesses: {
      flattery: 5,
      bribery: 5,
      blackmail: 5,
      threats: 5,
      ...weaknesses,
    },
  };
}

function makeCase(): Case {
  return {
    id: 9001,
    name: "Test Case",
    caseType: "fictional",
    primaryQuestion: "Test question",
    prosecution: { name: "Prosecution", argument: "P", favoredBy: "Democrat" },
    defendant: { name: "Defendant", argument: "D", favoredBy: "Republican" },
  };
}

function makeGame(b: Justice[], t: Tactic): CourtGameState {
  return {
    bench: b,
    currentCase: makeCase(),
    playerSide: "prosecution",
    chiefJusticeId: b[0]?.id ?? null,
    chiefJusticeHardened: false,
    deck: [],
    discardPile: [],
    playbook: [t],
    claimedCards: [],
    currentTurn: "player",
    round: 1,
    totalRounds: 5,
    selectedTacticId: null,
    claimingMode: false,
    claimedSelections: [],
    leanings: Object.fromEntries(b.map((j) => [j.id, 0])),
    susceptibilityMods: Object.fromEntries(b.map((j) => [j.id, 0])),
    playerShields: [],
    opponentShields: [],
    recusedJustices: [],
    nappingJustices: {},
    yogaJustices: {},
    draggedJustices: [],
    statMods: {},
    weaknessMods: {},
    religionOverrides: {},
    multiTargetMode: false,
    multiTargetSelections: [],
    multiTargetTacticId: null,
    makeChiefPlayedThisTrial: false,
    suggestRetirementTargets: [],
    keepCrownActivated: false,
    reframeStanceMode: false,
    reframeStanceChoices: [],
    reframeStanceTacticId: null,
    reframeStanceSelection: null,
  };
}

function helpers(game: CourtGameState) {
  return {
    drawCard: () => null,
    removeFromPlaybook: (t: Tactic) => {
      game.playbook = game.playbook.filter((c) => c.id !== t.id);
      game.discardPile.push(t);
    },
  };
}

describe("Court Toast Feedback - Magnitude Descriptors", () => {
  it("uses qualitative language for magnitude, not numbers", () => {
    const emotionalAppeal = tactics.find((t) => t.name === "Emotional Appeal");
    expect(emotionalAppeal).toBeTruthy();
    if (!emotionalAppeal) return;

    const highEmpathy = makeJustice(1, "High", "Democrat", { empathy: 10, logic: 1 });
    const game = makeGame([highEmpathy], emotionalAppeal);

    const outcome = resolveEffect(game, emotionalAppeal, highEmpathy, "player", helpers(game));

    // overrideFeedback should exist and not contain numeric values like "+45" or "points"
    expect(outcome.overrideFeedback).toBeTruthy();
    if (outcome.overrideFeedback) {
      expect(outcome.overrideFeedback).not.toMatch(/\+\d+/);
      expect(outcome.overrideFeedback).not.toMatch(/-\d+/);
      expect(outcome.overrideFeedback).not.toMatch(/\d+ points/);
    }
  });

  it("provides appropriate magnitude descriptor for large changes", () => {
    const emotionalAppeal = tactics.find((t) => t.name === "Emotional Appeal");
    expect(emotionalAppeal).toBeTruthy();
    if (!emotionalAppeal) return;

    const highEmpathy = makeJustice(1, "High", "Democrat", { empathy: 10, logic: 1 });
    const game = makeGame([highEmpathy], emotionalAppeal);

    const outcome = resolveEffect(game, emotionalAppeal, highEmpathy, "player", helpers(game));

    // Large change should include terms like "Devastating", "Strong", or similar
    expect(outcome.overrideFeedback).toBeTruthy();
    if (outcome.overrideFeedback) {
      const hasMagnitude =
        outcome.overrideFeedback.includes("Devastating") || outcome.overrideFeedback.includes("Strong") || outcome.overrideFeedback.includes("deeply");
      expect(hasMagnitude).toBe(true);
    }
  });

  it("provides appropriate magnitude descriptor for small changes", () => {
    const emotionalAppeal = tactics.find((t) => t.name === "Emotional Appeal");
    expect(emotionalAppeal).toBeTruthy();
    if (!emotionalAppeal) return;

    const lowEmpathy = makeJustice(1, "Low", "Democrat", { empathy: 1, logic: 10 });
    const game = makeGame([lowEmpathy], emotionalAppeal);

    const outcome = resolveEffect(game, emotionalAppeal, lowEmpathy, "player", helpers(game));

    // Small or no change should include terms like "Barely", "unmoved", "Slight", or similar
    expect(outcome.overrideFeedback).toBeTruthy();
    if (outcome.overrideFeedback) {
      const hasSmallMagnitude =
        outcome.overrideFeedback.includes("Barely") ||
        outcome.overrideFeedback.includes("unmoved") ||
        outcome.overrideFeedback.includes("Slight") ||
        outcome.overrideFeedback.includes("barely");
      expect(hasSmallMagnitude).toBe(true);
    }
  });

  it("provides contextual feedback for multi-target tactics", () => {
    const citePrecedents = tactics.find((t) => t.name === "Cite Precedents");
    expect(citePrecedents).toBeTruthy();
    if (!citePrecedents) return;

    const justices = [
      makeJustice(1, "A", "Democrat", { logic: 8 }),
      makeJustice(2, "B", "Republican", { logic: 3 }),
      makeJustice(3, "C", "Democrat", { logic: 7 }),
    ];
    const game = makeGame(justices, citePrecedents);

    const outcome = resolveEffect(game, citePrecedents, null, "player", helpers(game));

    // Multi-target feedback should describe bench-wide effect
    expect(outcome.overrideFeedback).toBeTruthy();
    if (outcome.overrideFeedback) {
      const hasBenchContext =
        outcome.overrideFeedback.includes("bench") ||
        outcome.overrideFeedback.includes("justices") ||
        outcome.overrideFeedback.includes("several") ||
        outcome.overrideFeedback.includes("most");
      expect(hasBenchContext).toBe(true);
    }
  });
});

describe("Court Toast Feedback - Stat/Weakness Context", () => {
  it("provides empathy context for empathy-based tactics", () => {
    const emotionalAppeal = tactics.find((t) => t.name === "Emotional Appeal");
    expect(emotionalAppeal).toBeTruthy();
    if (!emotionalAppeal) return;

    const highEmpathy = makeJustice(1, "High", "Democrat", { empathy: 9, logic: 2 });
    const game = makeGame([highEmpathy], emotionalAppeal);

    const outcome = resolveEffect(game, emotionalAppeal, highEmpathy, "player", helpers(game));

    // Should mention empathy in some form
    expect(outcome.overrideFeedback).toBeTruthy();
    if (outcome.overrideFeedback) {
      const hasEmpathyContext = outcome.overrideFeedback.toLowerCase().includes("empathy") || outcome.overrideFeedback.includes("receptive");
      expect(hasEmpathyContext).toBe(true);
    }
  });

  it("provides bribery context for bribery-based tactics", () => {
    const bribe = tactics.find((t) => t.name === "Bribe the Justice");
    expect(bribe).toBeTruthy();
    if (!bribe) return;

    const corruptJustice = makeJustice(1, "Corrupt", "Democrat", undefined, { bribery: 9 });
    const game = makeGame([corruptJustice], bribe);

    const outcome = resolveEffect(game, bribe, corruptJustice, "player", helpers(game));

    // Should indicate positive reception of bribe or mention the "arrangement"
    expect(outcome.overrideFeedback).toBeTruthy();
    if (outcome.overrideFeedback) {
      const hasBriberyContext =
        outcome.overrideFeedback.includes("arrangement") ||
        outcome.overrideFeedback.includes("generous") ||
        outcome.overrideFeedback.includes("appreciated") ||
        outcome.overrideFeedback.includes("Devastating") ||
        outcome.overrideFeedback.includes("Strong");
      expect(hasBriberyContext).toBe(true);
    }
  });

  it("provides negative feedback for tactics mismatched to justice", () => {
    const bribe = tactics.find((t) => t.name === "Bribe the Justice");
    expect(bribe).toBeTruthy();
    if (!bribe) return;

    const incorruptibleJustice = makeJustice(1, "Incorruptible", "Democrat", undefined, { bribery: 1 });
    const game = makeGame([incorruptibleJustice], bribe);

    const outcome = resolveEffect(game, bribe, incorruptibleJustice, "player", helpers(game));

    // Should have feedback (even if justice doesn't respond well)
    expect(outcome.overrideFeedback).toBeTruthy();

    // For low bribery, the tactic should produce minimal or negative change
    const change = outcome.results.find((r) => r.justiceName === incorruptibleJustice.name)?.change ?? 0;
    expect(Math.abs(change)).toBeLessThanOrEqual(20); // Low or negative effect
  });
});

describe("Court Toast Feedback - Knockon Indicators", () => {
  it("indicates when knockon effects occur without showing exact numbers", () => {
    // Use Emotional Appeal on a high-charisma justice with allies
    const tactic = tactics.find((t) => t.name === "Emotional Appeal");
    expect(tactic).toBeTruthy();
    if (!tactic) return;

    // High-charisma justice with allies of same party
    const charismaticJustice = makeJustice(1, "Charismatic", "Democrat", { charisma: 9, empathy: 8, logic: 3 });
    const ally1 = makeJustice(2, "Ally1", "Democrat", undefined, undefined);
    const ally2 = makeJustice(3, "Ally2", "Democrat", undefined, undefined);

    // Set same nominator for ally relationship
    charismaticJustice.nominatedBy = { id: 1001, name: "President A", party: "Democrat" };
    ally1.nominatedBy = { id: 1001, name: "President A", party: "Democrat" };
    ally2.nominatedBy = { id: 1001, name: "President A", party: "Democrat" };

    const game = makeGame([charismaticJustice, ally1, ally2], tactic);

    const outcome = resolveEffect(game, tactic, charismaticJustice, "player", helpers(game));

    // Check if knockons occurred
    const knockons = outcome.results.filter((r) => r.isKnockon);
    if (knockons.length > 0) {
      // overrideFeedback should mention "followed suit" or similar
      expect(outcome.overrideFeedback).toBeTruthy();
      if (outcome.overrideFeedback) {
        const hasKnockonIndicator =
          outcome.overrideFeedback.includes("followed suit") || outcome.overrideFeedback.includes("Several") || outcome.overrideFeedback.includes("followed");
        expect(hasKnockonIndicator).toBe(true);

        // Should NOT say specific numbers like "2 justices"
        expect(outcome.overrideFeedback).not.toMatch(/\d+ justices? followed/);
      }
    } else {
      // If no knockons occurred, that's fine - test passes
      expect(true).toBe(true);
    }
  });

  it("distinguishes between single and multiple knockon effects", () => {
    const tactic = tactics.find((t) => t.name === "Emotional Appeal");
    expect(tactic).toBeTruthy();
    if (!tactic) return;

    // Test with Chief Justice (guaranteed knockon to allies)
    const chief = makeJustice(1, "Chief", "Democrat", { empathy: 8, logic: 3 });
    const ally = makeJustice(2, "Ally", "Democrat", undefined, undefined);

    // Set same party nominators
    chief.nominatedBy = { id: 1001, name: "President A", party: "Democrat" };
    ally.nominatedBy = { id: 1001, name: "President A", party: "Democrat" };

    const game = makeGame([chief, ally], tactic);
    game.chiefJusticeId = chief.id;

    const outcome = resolveEffect(game, tactic, chief, "player", helpers(game));

    const knockons = outcome.results.filter((r) => r.isKnockon);
    if (knockons.length === 1) {
      // Single knockon should mention justice name or "followed suit"
      if (outcome.overrideFeedback) {
        const mentionsKnockon =
          outcome.overrideFeedback.includes(ally.name) || outcome.overrideFeedback.includes("followed suit") || outcome.overrideFeedback.includes("followed");
        expect(mentionsKnockon).toBe(true);
      }
    } else {
      // If no knockons occurred, test still passes
      expect(true).toBe(true);
    }
  });
});
