import { describe, expect, it } from "vitest";

import { resolveEffect } from "../src/views/court/ts/_tacticEffects";
import { tactics } from "../src/views/court/ts/_tactics";
import type { Case, CourtGameState, Justice, Party, Tactic } from "../src/views/court/ts/_types";

function makeJustice(id: number, name: string, party: Party): Justice {
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
    },
    weaknesses: {
      flattery: 5,
      bribery: 5,
      blackmail: 5,
      threats: 5,
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
    totalRounds: 3,
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

describe("Court tactic effects (#193)", () => {
  it("request-amicus scales with current support", () => {
    const amicus = tactics.find((t) => t.effectType === "request-amicus");
    expect(amicus).toBeTruthy();
    if (!amicus) return;

    const bench = [makeJustice(1, "A", "Democrat"), makeJustice(2, "B", "Democrat"), makeJustice(3, "C", "Republican")];
    const game = makeGame(bench, amicus);
    game.leanings[1] = 45;
    game.leanings[2] = 30;
    game.leanings[3] = -10;

    const out = resolveEffect(game, amicus, null, "player", helpers(game));
    expect(out.results).toHaveLength(3);
    expect(game.leanings[1]).toBe(51);
    expect(game.leanings[2]).toBe(36);
    expect(game.leanings[3]).toBe(-4);
  });

  it("encourage-nap applies the +15 leaning immediately and sets nap state", () => {
    const encourageNap = tactics.find((t) => t.effectType === "encourage-nap");
    expect(encourageNap).toBeTruthy();
    if (!encourageNap) return;

    const target = makeJustice(1, "Target", "Democrat");
    const game = makeGame([target], encourageNap);

    const out = resolveEffect(game, encourageNap, target, "player", helpers(game));
    expect(game.leanings[target.id]).toBe(15);
    expect(game.nappingJustices[target.id]).toBe(2);
    expect(out.results).toEqual([{ justiceName: "Target", change: 15, newLeaning: 15 }]);
  });

  it("uses Playbook terminology in tactic text", () => {
    expect(tactics.some((t) => t.description.includes("Docket") || (t.feedback ?? "").includes("Docket"))).toBe(false);
  });

  it("plant-story is single-target with stronger loyalty pressure", () => {
    const plantStory = tactics.find((t) => t.effectType === "plant-story");
    expect(plantStory).toBeTruthy();
    if (!plantStory) return;

    const target = makeJustice(1, "Target", "Democrat");
    const other = makeJustice(2, "Other", "Republican");
    const game = makeGame([target, other], plantStory);
    game.leanings[target.id] = 10;
    game.leanings[other.id] = -5;

    resolveEffect(game, plantStory, target, "player", helpers(game));

    expect(game.statMods[target.id]?.partyLoyalty).toBe(5);
    expect(game.statMods[other.id]?.partyLoyalty ?? 0).toBe(0);
    expect(game.leanings[target.id]).toBe(24);
    expect(game.leanings[other.id]).toBe(-5);
  });
});
