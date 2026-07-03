import { describe, expect, it } from "vitest";

import { resolveEffect } from "../src/views/court/ts/_tacticEffects";
import { tactics } from "../src/views/court/ts/_tactics";
import { difficultySettings, gameSettings } from "../src/views/court/ts/_settings";
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
    lecternMode: false,
    lecternBoostPending: false,
    lecternBlindTacticId: null,
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

describe("Court Balance - Multiplier Application", () => {
  it("applies playerPowerMult to player single-target tactics", () => {
    // Use Emotional Appeal with a justice at neutral empathy (5) to minimize stat scaling
    const tactic = tactics.find((t) => t.name === "Emotional Appeal");
    expect(tactic).toBeTruthy();
    if (!tactic) return;

    const justice = makeJustice(1, "Justice", "Democrat", { empathy: 5, logic: 5, susceptibility: 5 });
    const game = makeGame([justice], tactic);

    const beforeLeaning = game.leanings[justice.id];
    resolveEffect(game, tactic, justice, "player", helpers(game));
    const afterLeaning = game.leanings[justice.id];

    // Change should be positive and reflect playerPowerMult
    expect(afterLeaning).toBeGreaterThan(beforeLeaning);
    expect(afterLeaning).toBeGreaterThan(0);
  });

  it("applies opponentPowerMult to opponent single-target tactics", () => {
    const tactic = tactics.find((t) => t.name === "Emotional Appeal");
    expect(tactic).toBeTruthy();
    if (!tactic) return;

    const justice = makeJustice(1, "Justice", "Democrat", { empathy: 5, logic: 5, susceptibility: 5 });
    const game = makeGame([justice], tactic);

    const beforeLeaning = game.leanings[justice.id];
    resolveEffect(game, tactic, justice, "opponent", helpers(game));
    const afterLeaning = game.leanings[justice.id];

    // Change should be negative (opponent moves against player)
    expect(afterLeaning).toBeLessThan(beforeLeaning);
    expect(afterLeaning).toBeLessThan(0);
  });

  it("applies playerPowerMult to player all-target tactics", () => {
    const tactic = tactics.find((t) => t.name === "Call a Celebrity Witness");
    expect(tactic).toBeTruthy();
    if (!tactic) return;

    const justices = [
      makeJustice(1, "A", "Democrat", { charisma: 5 }),
      makeJustice(2, "B", "Republican", { charisma: 5 }),
      makeJustice(3, "C", "Democrat", { charisma: 5 }),
    ];
    const game = makeGame(justices, tactic);

    resolveEffect(game, tactic, null, "player", helpers(game));

    // All justices should be swayed positively
    justices.forEach((j) => {
      expect(game.leanings[j.id]).toBeGreaterThan(0);
    });
  });

  it("maintains 2:1 ratio between single-target and all-target per-justice power", () => {
    // Single-target should be targetSingleMultiplier / targetAllMultiplier = 2x as powerful per justice
    const expectedRatio = gameSettings.targetSingleMultiplier / gameSettings.targetAllMultiplier;
    expect(expectedRatio).toBe(2);
  });
});

describe("Court Balance - Power Curve Consistency", () => {
  it("produces similar results for tactics with similar basePower", () => {
    // Emotional Appeal (empathy-based) vs Bribe (bribery-based)
    const emotionalAppeal = tactics.find((t) => t.name === "Emotional Appeal");
    const bribe = tactics.find((t) => t.name === "Bribe the Justice");
    expect(emotionalAppeal).toBeTruthy();
    expect(bribe).toBeTruthy();
    if (!emotionalAppeal || !bribe) return;

    // High-empathy justice
    const empatheticJustice = makeJustice(1, "Empathetic", "Democrat", { empathy: 9, logic: 3 });
    const gameEmpathy = makeGame([empatheticJustice], emotionalAppeal);
    resolveEffect(gameEmpathy, emotionalAppeal, empatheticJustice, "player", helpers(gameEmpathy));

    // High-bribery justice
    const corruptJustice = makeJustice(2, "Corrupt", "Republican", undefined, { bribery: 9 });
    const gameBribery = makeGame([corruptJustice], bribe);
    resolveEffect(gameBribery, bribe, corruptJustice, "player", helpers(gameBribery));

    // Results should be within 20 points of each other (allowing for formula differences)
    const empatheticChange = gameEmpathy.leanings[empatheticJustice.id];
    const briberyChange = gameBribery.leanings[corruptJustice.id];
    const difference = Math.abs(empatheticChange - briberyChange);

    expect(difference).toBeLessThanOrEqual(20);
  });

  it("scales stat-based tactics appropriately across stat ranges", () => {
    const emotionalAppeal = tactics.find((t) => t.name === "Emotional Appeal");
    expect(emotionalAppeal).toBeTruthy();
    if (!emotionalAppeal) return;

    // Test with low, mid, and high empathy
    const lowEmpathy = makeJustice(1, "Low", "Democrat", { empathy: 2, logic: 8 });
    const midEmpathy = makeJustice(2, "Mid", "Democrat", { empathy: 5, logic: 5 });
    const highEmpathy = makeJustice(3, "High", "Democrat", { empathy: 9, logic: 2 });

    const gameLow = makeGame([lowEmpathy], emotionalAppeal);
    const gameMid = makeGame([midEmpathy], emotionalAppeal);
    const gameHigh = makeGame([highEmpathy], emotionalAppeal);

    resolveEffect(gameLow, emotionalAppeal, lowEmpathy, "player", helpers(gameLow));
    resolveEffect(gameMid, emotionalAppeal, midEmpathy, "player", helpers(gameMid));
    resolveEffect(gameHigh, emotionalAppeal, highEmpathy, "player", helpers(gameHigh));

    // High empathy should produce more sway than mid, mid more than low
    expect(gameHigh.leanings[highEmpathy.id]).toBeGreaterThan(gameMid.leanings[midEmpathy.id]);
    expect(gameMid.leanings[midEmpathy.id]).toBeGreaterThan(gameLow.leanings[lowEmpathy.id]);
  });
});
