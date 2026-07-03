import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useCourtTurns } from "../src/views/court/ts/_useCourtTurns";
import type { CampaignState, CourtGameState, Justice, Party, Tactic } from "../src/views/court/ts/_types";

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makeJustice(id: number, party: Party = "Democrat"): Justice {
  return {
    id,
    name: `Justice ${id}`,
    image: "",
    description: "",
    justiceType: "current",
    gender: "M",
    birthYear: 1960,
    nominatedBy: { id: 100 + id, name: "President", party },
    religion: "Other",
    ethnicity: "White",
    stats: { logic: 5, charisma: 5, empathy: 5, susceptibility: 5, partyLoyalty: 5 },
    weaknesses: { flattery: 5, bribery: 5, blackmail: 5, threats: 5 },
  };
}

function makeTactic(id: number, effectType: Tactic["effectType"] = "sway-one"): Tactic {
  return {
    id,
    name: `Tactic ${id}`,
    description: "",
    flavorText: "",
    cardType: "attack",
    effectType,
    basePower: 3,
  };
}

function makeGame(justices: Justice[], overrides: Partial<CourtGameState> = {}): CourtGameState {
  return {
    bench: justices,
    currentCase: {
      id: 1,
      name: "Test Case",
      caseType: "fictional",
      primaryQuestion: "?",
      prosecution: { name: "P", argument: "Pa", favoredBy: "Democrat" },
      defendant: { name: "D", argument: "Da", favoredBy: "Republican" },
    },
    playerSide: "prosecution",
    chiefJusticeId: justices[0]?.id ?? null,
    chiefJusticeHardened: false,
    deck: [],
    discardPile: [],
    playbook: [],
    claimedCards: [],
    currentTurn: "player",
    round: 1,
    totalRounds: 5,
    selectedTacticId: null,
    claimingMode: false,
    claimedSelections: [],
    leanings: Object.fromEntries(justices.map((j) => [j.id, 0])),
    susceptibilityMods: Object.fromEntries(justices.map((j) => [j.id, 0])),
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
    ...overrides,
  };
}

function makeUi(overrides: Partial<{ phase: string; isCampaignMode: boolean; opponentThinking: boolean; opponentHighlightedCardId: number | null }> = {}) {
  return { phase: "playing", isCampaignMode: false, opponentThinking: false, opponentHighlightedCardId: null, ...overrides };
}

function makeDeps() {
  return {
    trackTrialVerdictStats: vi.fn().mockResolvedValue(undefined),
    applyTactic: vi.fn(),
    shuffle: <T>(arr: T[]) => [...arr],
    triggerLemonMomentIfDue: vi.fn(),
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("useCourtTurns", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  // ── getEligibleMultiTargetJustices ────────────────────────────

  describe("getEligibleMultiTargetJustices", () => {
    it("returns all bench justices for swap-clerks when none are napping or recused", () => {
      const justices = [makeJustice(1), makeJustice(2), makeJustice(3)];
      const game = makeGame(justices);
      const { getEligibleMultiTargetJustices } = useCourtTurns(game, { data: null }, makeUi(), makeDeps());
      const tactic = makeTactic(1, "swap-clerks");
      expect(getEligibleMultiTargetJustices(tactic)).toHaveLength(3);
    });

    it("excludes napping justices from swap-clerks targets", () => {
      const justices = [makeJustice(1), makeJustice(2), makeJustice(3)];
      const game = makeGame(justices, { nappingJustices: { 2: 3 } });
      const { getEligibleMultiTargetJustices } = useCourtTurns(game, { data: null }, makeUi(), makeDeps());
      const tactic = makeTactic(1, "swap-clerks");
      const eligible = getEligibleMultiTargetJustices(tactic);
      expect(eligible).toHaveLength(2);
      expect(eligible.every((j) => j.id !== 2)).toBe(true);
    });

    it("excludes recused justices from swap-clerks targets", () => {
      const justices = [makeJustice(1), makeJustice(2), makeJustice(3)];
      const game = makeGame(justices, { recusedJustices: [3] });
      const { getEligibleMultiTargetJustices } = useCourtTurns(game, { data: null }, makeUi(), makeDeps());
      const tactic = makeTactic(1, "swap-clerks");
      const eligible = getEligibleMultiTargetJustices(tactic);
      expect(eligible).toHaveLength(2);
      expect(eligible.every((j) => j.id !== 3)).toBe(true);
    });

    it("returns empty array for non-swap-clerks tactics", () => {
      const justices = [makeJustice(1), makeJustice(2)];
      const game = makeGame(justices);
      const { getEligibleMultiTargetJustices } = useCourtTurns(game, { data: null }, makeUi(), makeDeps());
      expect(getEligibleMultiTargetJustices(makeTactic(1, "sway-all"))).toHaveLength(0);
    });

    it("returns empty array for null tactic", () => {
      const game = makeGame([makeJustice(1)]);
      const { getEligibleMultiTargetJustices } = useCourtTurns(game, { data: null }, makeUi(), makeDeps());
      expect(getEligibleMultiTargetJustices(null)).toHaveLength(0);
    });
  });

  // ── endOpponentTurn ───────────────────────────────────────────

  describe("endOpponentTurn", () => {
    it("increments round when below max", () => {
      const game = makeGame([makeJustice(1)], { round: 3, totalRounds: 5 });
      const ui = makeUi({ opponentThinking: true });
      const { endOpponentTurn } = useCourtTurns(game, { data: null }, ui, makeDeps());
      endOpponentTurn();
      expect(game.round).toBe(4);
    });

    it("does not increment round at max rounds — triggers verdict instead", () => {
      const game = makeGame([makeJustice(1)], { round: 5, totalRounds: 5 });
      const ui = makeUi({ opponentThinking: true, phase: "playing" });
      const deps = makeDeps();
      const { endOpponentTurn } = useCourtTurns(game, { data: null }, ui, deps);
      endOpponentTurn();
      expect(deps.trackTrialVerdictStats).toHaveBeenCalledWith({ isQuickplay: true });
      vi.runAllTimers();
      expect(ui.phase).toBe("verdict");
      expect(game.round).toBe(5);
    });

    it("clears opponent thinking flag", () => {
      const game = makeGame([makeJustice(1)]);
      const ui = makeUi({ opponentThinking: true });
      const { endOpponentTurn } = useCourtTurns(game, { data: null }, ui, makeDeps());
      endOpponentTurn();
      expect(ui.opponentThinking).toBe(false);
    });

    it("triggers lemon moment check", () => {
      const game = makeGame([makeJustice(1)]);
      const deps = makeDeps();
      const { endOpponentTurn } = useCourtTurns(game, { data: null }, makeUi(), deps);
      endOpponentTurn();
      expect(deps.triggerLemonMomentIfDue).toHaveBeenCalled();
    });

    it("wakes napping justices whose nap ends this round", () => {
      const game = makeGame([makeJustice(1), makeJustice(2)], {
        round: 3,
        nappingJustices: { 1: 3, 2: 5 },
      });
      const { endOpponentTurn } = useCourtTurns(game, { data: null }, makeUi({ opponentThinking: true }), makeDeps());
      endOpponentTurn();
      expect(game.nappingJustices[1]).toBeUndefined();
      expect(game.nappingJustices[2]).toBe(5);
    });

    it("applies empathy and susceptibility buffs when yoga justice wakes up", () => {
      const game = makeGame([makeJustice(1)], {
        round: 3,
        yogaJustices: { 1: 3 },
        statMods: {},
      });
      const { endOpponentTurn } = useCourtTurns(game, { data: null }, makeUi({ opponentThinking: true }), makeDeps());
      endOpponentTurn();
      expect(game.yogaJustices[1]).toBeUndefined();
      expect(game.statMods[1]?.empathy).toBe(3);
      expect(game.statMods[1]?.susceptibility).toBe(3);
    });

    it("handles skipNextRound — advances 2 rounds and re-triggers opponent turn", () => {
      const game = makeGame([makeJustice(1)], { round: 2, skipNextRound: true });
      const ui = makeUi({ opponentThinking: true });
      const deps = makeDeps();
      // put a sway-all tactic in playbook so playOpponentTurn has something to do
      game.playbook = [makeTactic(1, "sway-all")];
      const { endOpponentTurn } = useCourtTurns(game, { data: null }, ui, deps);
      endOpponentTurn();
      expect(game.skipNextRound).toBeUndefined();
      expect(game.round).toBe(4);
      expect(game.currentTurn).toBe("opponent");
    });
  });

  // ── endPlayerTurn ─────────────────────────────────────────────

  describe("endPlayerTurn", () => {
    it("clears doubleTapActive and stays on player turn", () => {
      const game = makeGame([makeJustice(1)]);
      const campaign = { data: { doubleTapActive: true } as unknown as CampaignState };
      const ui = makeUi();
      const { endPlayerTurn } = useCourtTurns(game, campaign, ui, makeDeps());
      endPlayerTurn();
      expect(campaign.data!.doubleTapActive).toBe(false);
      expect(game.currentTurn).toBe("player");
      expect(ui.opponentThinking).toBe(false);
    });

    it("hands off to opponent when no double-tap is active", () => {
      const game = makeGame([makeJustice(1)]);
      const ui = makeUi();
      const { endPlayerTurn } = useCourtTurns(game, { data: null }, ui, makeDeps());
      endPlayerTurn();
      expect(game.currentTurn).toBe("opponent");
      expect(ui.opponentThinking).toBe(true);
    });

    it("handles skipNextRound — advances 2 rounds and stays on player", () => {
      const game = makeGame([makeJustice(1)], { round: 2, skipNextRound: true });
      const ui = makeUi();
      const { endPlayerTurn } = useCourtTurns(game, { data: null }, ui, makeDeps());
      endPlayerTurn();
      expect(game.skipNextRound).toBeUndefined();
      expect(game.round).toBe(4);
      expect(game.currentTurn).toBe("player");
    });

    it("skipNextRound triggers verdict when it pushes past max rounds", () => {
      const game = makeGame([makeJustice(1)], { round: 4, totalRounds: 5, skipNextRound: true });
      const ui = makeUi({ phase: "playing" });
      const deps = makeDeps();
      const { endPlayerTurn } = useCourtTurns(game, { data: null }, ui, deps);
      endPlayerTurn();
      expect(deps.trackTrialVerdictStats).toHaveBeenCalledWith({ isQuickplay: true });
      vi.runAllTimers();
      expect(ui.phase).toBe("verdict");
    });
  });
});
