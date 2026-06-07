import fs from "node:fs";
import path from "node:path";

import { reactive } from "vue";
import { describe, expect, it } from "vitest";

import { useWrongestComputeds } from "../src/views/wrongest/ts/_useWrongestComputeds";
import { useWrongestHelpers } from "../src/views/wrongest/ts/_useWrongestHelpers";
import {
  createWrongestGameState,
  createWrongestMyState,
  createWrongestRoundState,
  createWrongestUiState,
} from "../src/views/wrongest/ts/_useWrongestState";

function makeSetup() {
  const game = reactive(createWrongestGameState());
  const my = reactive(createWrongestMyState());
  const round = reactive(createWrongestRoundState());
  const ui = reactive(createWrongestUiState());

  const helpers = useWrongestHelpers({
    game,
    my,
    round,
    ui,
    onPresentationFinished: () => undefined,
    sendEvent: () => undefined,
  });

  const computeds = useWrongestComputeds({
    game,
    my,
    round,
    ui,
    normalizePlayerName: helpers.normalizePlayerName,
  });

  return { game, my, round, ui, helpers, computeds };
}

describe("Wrongest regressions", () => {
  it("keeps Wrongest.vue under the soft line threshold", () => {
    const wrongestVuePath = path.resolve("src/views/wrongest/Wrongest.vue");
    const lineCount = fs.readFileSync(wrongestVuePath, "utf8").trimEnd().split("\n").length;

    expect(lineCount).toBeLessThan(900);
  });

  it("computes deck requirements from player count and selected decks", () => {
    const { game, computeds } = makeSetup();

    game.players = Array.from({ length: 5 }, (_, index) => ({
      id: `p${index}`,
      name: `Player ${index}`,
      playerID: `player-${index}`,
      score: 0,
      card: "",
      playerIndex: index,
      isConnected: true,
      lastSeen: null,
    }));
    game.allDecks = [
      { id: "alpha", name: "Alpha", description: "", isNaughty: false, cards: ["a", "b", "c", "d", "e", "f", "g", "h"] },
      { id: "beta", name: "Beta", description: "", isNaughty: false, cards: ["i", "j", "k", "l", "m", "n", "o"] },
    ];
    game.selectedDeckIds = ["alpha"];

    expect(computeds.computedMinimumPlayerCount.value).toBe(5);
    expect(computeds.computedMaxRounds.value).toBe(3);
    expect(computeds.computedMinimumCards.value).toBe(15);
    expect(computeds.computedTotalSelectedCards.value).toBe(8);
    expect(computeds.computedHasEnoughCards.value).toBe(false);

    game.selectedDeckIds = ["alpha", "beta"];
    expect(computeds.computedTotalSelectedCards.value).toBe(15);
    expect(computeds.computedHasEnoughCards.value).toBe(true);
  });

  it("formats the post-vote status message from remaining voters", () => {
    const { game, round, ui, computeds } = makeSetup();

    game.players = [
      { id: "1", name: "Lemon", playerID: "1", score: 0, card: "", playerIndex: 0, isConnected: true, lastSeen: null },
      { id: "2", name: "Butt", playerID: "2", score: 0, card: "", playerIndex: 1, isConnected: true, lastSeen: null },
      { id: "3", name: "Beans", playerID: "3", score: 0, card: "", playerIndex: 2, isConnected: true, lastSeen: null },
    ];
    round.votesSubmitted = 2;
    round.playersVoted = ["1", "2"];
    ui.iVoted = true;

    expect(computeds.computedVoteStatusMessage.value).toBe("Beans still needs to vote.");

    round.playersVoted = ["1", "2", "3"];
    expect(computeds.computedVoteStatusMessage.value).toBe("All 3 players have voted.");
  });

  it("preserves card text reveal and hiding behavior", () => {
    const { game, my, round, helpers } = makeSetup();

    my.playerIndex = 1;
    round.activePlayerIndex = 1;
    round.playerPresenting = true;
    game.gameStarted = true;

    expect(helpers.cardText("The moon is made of {lasagna}.")).toBe('The moon is made of <span class="secret-text">lasagna</span>.');

    game.gameStarted = false;
    round.phase = "presenting";
    round.activePlayerIndex = 0;
    expect(helpers.cardText("The moon is made of {lasagna}.")).toBe("The moon is made of ....");

    round.activePlayerIndex = 2;
    expect(helpers.cardText("The moon is made of {lasagna}.")).toBe("The moon is made of lasagna.");
  });
});
