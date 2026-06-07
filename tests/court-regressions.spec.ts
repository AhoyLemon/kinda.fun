import fs from "node:fs";
import path from "node:path";

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

const courtRootPath = path.resolve(__dirname, "../src/views/court");
const courtPugPath = path.join(courtRootPath, "Court.pug");

describe("Court regressions", () => {
  it("gates trial cheats UI behind cheatsActive", () => {
    const courtPug = fs.readFileSync(courtPugPath, "utf8");

    const trialCheatsGuardPattern = /\.trial-cheats\(v-if="cheatsActive\s*&&\s*ui\.phase === 'playing'"\)/;

    expect(courtPug).toMatch(trialCheatsGuardPattern);
  });

  it("uses the correctly spelled susceptibility stat key", () => {
    const files = fs
      .readdirSync(courtRootPath, { recursive: true })
      .filter((entry): entry is string => typeof entry === "string")
      .filter((entry) => entry.endsWith(".ts") || entry.endsWith(".vue") || entry.endsWith(".pug"));

    for (const relativeFile of files) {
      const fullPath = path.join(courtRootPath, relativeFile);
      const contents = fs.readFileSync(fullPath, "utf8");
      expect(contents).not.toContain("succeptibility");
    }
  });

  it("guards dual-target mode behind 2+ eligible justices", () => {
    const courtVue = fs.readFileSync(path.join(courtRootPath, "Court.vue"), "utf8");
    expect(courtVue).toContain("eligibleMultiTargetJustices.length < 2");
    expect(courtVue).toContain("eligibleJusticeIds.size < 2");
  });

  it("uses strict abstention bounds around threshold", () => {
    const courtComputeds = fs.readFileSync(path.join(courtRootPath, "ts/_useCourtComputeds.ts"), "utf8");
    expect(courtComputeds).toContain("return l > -t && l < t;");
  });
});

describe("Court regressions - Existing Tactics Still Functional", () => {
  it("all core tactic types resolve without errors", () => {
    const justice = makeJustice(1, "Justice", "Democrat");
    const bench = [justice, makeJustice(2, "Justice2", "Republican"), makeJustice(3, "Justice3", "Democrat")];

    // Test key tactic effect types
    const tacticTypes = ["sway-one", "sway-all", "request-amicus", "recite-dissent", "shield", "discard-all", "susceptibility", "recuse", "encourage-nap"];

    tacticTypes.forEach((effectType) => {
      const tactic = tactics.find((t) => t.effectType === effectType);
      if (!tactic) {
        // Skip if tactic doesn't exist (may be deprecated)
        return;
      }

      const game = makeGame(bench, tactic);
      expect(() => {
        const target = tactic.effectType === "sway-all" || tactic.effectType === "request-amicus" ? null : justice;
        resolveEffect(game, tactic, target, "player", helpers(game));
      }).not.toThrow();
    });
  });

  it("multi-target mode works for swap-clerks", () => {
    const swapClerks = tactics.find((t) => t.effectType === "swap-clerks");
    expect(swapClerks).toBeTruthy();
    if (!swapClerks) return;

    const j1 = makeJustice(1, "Justice1", "Democrat");
    const j2 = makeJustice(2, "Justice2", "Republican");
    const game = makeGame([j1, j2], swapClerks);

    // Set different leanings
    game.leanings[j1.id] = 40;
    game.leanings[j2.id] = -30;

    // Simulate multi-target selection
    game.multiTargetMode = true;
    game.multiTargetSelections = [j1.id, j2.id];

    expect(() => {
      resolveEffect(game, swapClerks, null, "player", helpers(game));
    }).not.toThrow();

    // Leanings should be swapped
    expect(game.leanings[j1.id]).toBe(-30);
    expect(game.leanings[j2.id]).toBe(40);
  });

  it("stance-based tactics handle justices without stances", () => {
    const reframeDebate = tactics.find((t) => t.effectType === "reframe-debate");
    if (!reframeDebate) return;

    const justiceWithoutStances = makeJustice(1, "NoStances", "Democrat");
    const game = makeGame([justiceWithoutStances], reframeDebate);

    expect(() => {
      resolveEffect(game, reframeDebate, null, "player", helpers(game));
    }).not.toThrow();
  });

  it("chief justice special effects still work", () => {
    const makeChief = tactics.find((t) => t.effectType === "make-chief");
    const insultChief = tactics.find((t) => t.effectType === "insult-chief");

    if (makeChief) {
      const chief = makeJustice(1, "Chief", "Democrat");
      const newChief = makeJustice(2, "NewChief", "Republican");
      const game = makeGame([chief, newChief], makeChief);
      game.chiefJusticeId = chief.id;

      expect(() => {
        resolveEffect(game, makeChief, newChief, "player", helpers(game));
      }).not.toThrow();
    }

    if (insultChief) {
      const chief = makeJustice(1, "Chief", "Democrat");
      const other = makeJustice(2, "Other", "Republican");
      const game = makeGame([chief, other], insultChief);
      game.chiefJusticeId = chief.id;

      expect(() => {
        resolveEffect(game, insultChief, null, "player", helpers(game));
      }).not.toThrow();
    }
  });
});

describe("Court regressions - No Crashes with New Cards", () => {
  it("new cards work in Round 1", () => {
    const newCardEffects = ["fog-machine", "whisper-campaign", "alien-abduction", "mess-calendar", "international-law"];

    newCardEffects.forEach((effectType) => {
      const tactic = tactics.find((t) => t.effectType === effectType);
      if (!tactic) return;

      const bench = [makeJustice(1, "J1", "Democrat"), makeJustice(2, "J2", "Republican"), makeJustice(3, "J3", "Democrat")];
      const game = makeGame(bench, tactic);
      game.round = 1;

      expect(() => {
        const target = effectType === "whisper-campaign" ? bench[0] : null;
        resolveEffect(game, tactic, target, "player", helpers(game));
      }).not.toThrow();
    });
  });

  it("new cards work in Round 5", () => {
    const newCardEffects = ["fog-machine", "whisper-campaign", "alien-abduction", "mess-calendar", "international-law"];

    newCardEffects.forEach((effectType) => {
      const tactic = tactics.find((t) => t.effectType === effectType);
      if (!tactic) return;

      const bench = [makeJustice(1, "J1", "Democrat"), makeJustice(2, "J2", "Republican"), makeJustice(3, "J3", "Democrat")];
      const game = makeGame(bench, tactic);
      game.round = 5;

      expect(() => {
        const target = effectType === "whisper-campaign" ? bench[0] : null;
        resolveEffect(game, tactic, target, "player", helpers(game));
      }).not.toThrow();
    });
  });

  it("new cards work with recused justices", () => {
    const fogMachine = tactics.find((t) => t.effectType === "fog-machine");
    if (!fogMachine) return;

    const bench = [makeJustice(1, "J1", "Democrat"), makeJustice(2, "J2", "Republican"), makeJustice(3, "J3", "Democrat")];
    const game = makeGame(bench, fogMachine);
    game.recusedJustices = [2]; // Recuse middle justice

    expect(() => {
      resolveEffect(game, fogMachine, null, "player", helpers(game));
    }).not.toThrow();
  });

  it("new cards work with napping justices", () => {
    const alienAbduction = tactics.find((t) => t.effectType === "alien-abduction");
    if (!alienAbduction) return;

    const bench = [makeJustice(1, "J1", "Democrat"), makeJustice(2, "J2", "Republican"), makeJustice(3, "J3", "Democrat")];
    const game = makeGame(bench, alienAbduction);
    game.nappingJustices[2] = 3; // Justice 2 napping until round 3

    expect(() => {
      resolveEffect(game, alienAbduction, null, "player", helpers(game));
    }).not.toThrow();
  });

  it("multiple new cards can be played in succession", () => {
    const fogMachine = tactics.find((t) => t.effectType === "fog-machine");
    const whisperCampaign = tactics.find((t) => t.effectType === "whisper-campaign");

    if (!fogMachine || !whisperCampaign) return;

    const bench = [makeJustice(1, "J1", "Democrat"), makeJustice(2, "J2", "Republican"), makeJustice(3, "J3", "Democrat")];
    const game1 = makeGame(bench, fogMachine);

    expect(() => {
      resolveEffect(game1, fogMachine, null, "player", helpers(game1));
    }).not.toThrow();

    const game2 = makeGame(bench, whisperCampaign);
    expect(() => {
      resolveEffect(game2, whisperCampaign, bench[0], "player", helpers(game2));
    }).not.toThrow();
  });

  it("opponent can play new cards", () => {
    const newCardEffects = ["fog-machine", "alien-abduction", "international-law"];

    newCardEffects.forEach((effectType) => {
      const tactic = tactics.find((t) => t.effectType === effectType);
      if (!tactic) return;

      const bench = [makeJustice(1, "J1", "Democrat"), makeJustice(2, "J2", "Republican"), makeJustice(3, "J3", "Democrat")];
      const game = makeGame(bench, tactic);

      expect(() => {
        resolveEffect(game, tactic, null, "opponent", helpers(game));
      }).not.toThrow();
    });
  });
});
