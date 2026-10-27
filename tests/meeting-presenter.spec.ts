import { describe, expect, it } from "vitest";

import { countSeatedPlayers, isPresenterPlayer, presenterLast } from "../src/views/meeting/ts/_presenter";
import type { PresenterContext } from "../src/views/meeting/ts/_presenter";
import { findGuessMatch } from "../src/views/meeting/ts/_findGuessMatch";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const eventOn: PresenterContext = { isEventActive: true, roomCreatorID: "host", presenterName: "lemon" };
const eventOff: PresenterContext = { ...eventOn, isEventActive: false };

const presenter = {
  playerID: "host",
  name: "Corporate Lemon",
  hand: [{ phrase: "let's sync offline", points: 10, stringMatch: "sync" }],
};

const audience = Array.from({ length: 6 }, (_, i) => ({
  playerID: `player-${i + 1}`,
  name: `Player ${i + 1}`,
  hand: [] as { phrase: string; points: number; stringMatch?: string }[],
}));

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("isPresenterPlayer", () => {
  it("is the host whose name loosely contains the presenter name", () => {
    expect(isPresenterPlayer(presenter, eventOn)).toBe(true);
    expect(isPresenterPlayer({ playerID: "host", name: "LEMON" }, eventOn)).toBe(true);
  });

  it("is nobody when event mode is off", () => {
    expect(isPresenterPlayer(presenter, eventOff)).toBe(false);
  });

  it("ignores a non-host named Lemon and a host with another name", () => {
    expect(isPresenterPlayer({ playerID: "player-1", name: "Lemon" }, eventOn)).toBe(false);
    expect(isPresenterPlayer({ playerID: "host", name: "Bob" }, eventOn)).toBe(false);
  });
});

describe("countSeatedPlayers", () => {
  it("doesn't count the presenter against the seat limit", () => {
    expect(countSeatedPlayers([presenter, ...audience], eventOn)).toBe(6);
  });

  it("counts the host normally when event mode is off", () => {
    expect(countSeatedPlayers([presenter, ...audience], eventOff)).toBe(7);
  });
});

describe("guessing with a presenter in the room", () => {
  it("matches a real player's card before a presenter card that would shadow it", () => {
    const karen = { ...audience[0], hand: [{ phrase: "sync up", points: 5 }] };
    const players = presenterLast([presenter, karen], eventOn);

    // Presenter first, the "sync" stringMatch would win this guess
    const found = findGuessMatch(players, "sync up");

    expect(found?.player.playerID).toBe("player-1");
    expect(found?.card.phrase).toBe("sync up");
  });

  it("falls back to the presenter's hand when no real player has the card", () => {
    const players = presenterLast([presenter, ...audience], eventOn);

    const found = findGuessMatch(players, "let's sync offline");

    expect(found?.player.playerID).toBe("host");
  });
});
