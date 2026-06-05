import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";

import { performSteal } from "../src/views/meeting/ts/_performSteal";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("firebase/firestore", () => ({
  doc: vi.fn(() => ({ _isMockRef: true })),
  increment: vi.fn((n: number) => ({ _increment: n })),
  runTransaction: vi.fn(),
}));

import { runTransaction } from "firebase/firestore";
const mockRunTransaction = runTransaction as Mock;

// ── Fixtures ──────────────────────────────────────────────────────────────────

const mockDb = {} as any;

const match = { id: "card-1", phrase: "Circle Back", points: 3 };
const cardHolder = { playerID: "player-2", name: "Karen" };
const you = { playerID: "player-1", name: "Alex" };
const roomCode = "ABCDE";

function makeFakeTransaction(cardStatus: string | null) {
  const update = vi.fn();
  const get = vi.fn().mockResolvedValue({
    exists: () => cardStatus !== null,
    data: () => ({ status: cardStatus }),
  });
  return { get, update };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("performSteal", () => {
  beforeEach(() => {
    mockRunTransaction.mockReset();
  });

  it("returns 'success' and writes both docs when card is unplayed", async () => {
    const tx = makeFakeTransaction("unplayed");
    mockRunTransaction.mockImplementation(async (_db, fn) => fn(tx));

    const result = await performSteal(mockDb, roomCode, match, cardHolder, you);

    expect(result).toBe("success");
    expect(tx.update).toHaveBeenCalledTimes(2);
    expect(tx.update).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ status: "stolen", stolenBy: "Alex" }),
    );
    expect(tx.update).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ score: expect.objectContaining({ _increment: 3 }) }),
    );
  });

  it("returns 'stolen' and does not increment score when card is already stolen", async () => {
    const tx = makeFakeTransaction("stolen");
    mockRunTransaction.mockImplementation(async (_db, fn) => {
      await fn(tx).catch(() => {}); // transaction callback throws; runTransaction propagates it
      throw new Error("stolen");
    });

    const result = await performSteal(mockDb, roomCode, match, cardHolder, you);

    expect(result).toBe("stolen");
    expect(tx.update).not.toHaveBeenCalled();
  });

  it("returns 'played' when card has already been scored", async () => {
    const tx = makeFakeTransaction("played");
    mockRunTransaction.mockImplementation(async (_db, fn) => {
      await fn(tx).catch(() => {});
      throw new Error("played");
    });

    const result = await performSteal(mockDb, roomCode, match, cardHolder, you);

    expect(result).toBe("played");
    expect(tx.update).not.toHaveBeenCalled();
  });

  it("returns 'not_found' when card document does not exist", async () => {
    const tx = makeFakeTransaction(null); // null → exists() returns false
    mockRunTransaction.mockImplementation(async (_db, fn) => {
      await fn(tx).catch(() => {});
      throw new Error("not_found");
    });

    const result = await performSteal(mockDb, roomCode, match, cardHolder, you);

    expect(result).toBe("not_found");
    expect(tx.update).not.toHaveBeenCalled();
  });

  it("simulates race: first caller succeeds, second caller sees 'stolen'", async () => {
    // tx1: card still unplayed — first caller wins
    const tx1 = makeFakeTransaction("unplayed");
    // tx2: card is already stolen by the time the second caller's read resolves
    const tx2 = makeFakeTransaction("stolen");

    let callCount = 0;
    mockRunTransaction.mockImplementation(async (_db, fn) => {
      callCount++;
      if (callCount === 1) {
        await fn(tx1);
      } else {
        // The callback throws "stolen" before reaching update; runTransaction propagates it
        await fn(tx2).catch(() => {});
        throw new Error("stolen");
      }
    });

    const [r1, r2] = await Promise.all([
      performSteal(mockDb, roomCode, match, cardHolder, you),
      performSteal(mockDb, roomCode, match, cardHolder, { playerID: "player-3", name: "Bob" }),
    ]);

    expect(r1).toBe("success");
    expect(r2).toBe("stolen");
    // Winning transaction wrote exactly one score increment
    const scoreUpdates = tx1.update.mock.calls.filter(
      (call) => call[1] && "_increment" in (call[1]?.score ?? {}),
    );
    expect(scoreUpdates).toHaveLength(1);
    // Losing transaction never reached update
    expect(tx2.update).not.toHaveBeenCalled();
  });
});
