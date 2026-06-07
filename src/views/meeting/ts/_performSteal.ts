import { doc, increment, runTransaction } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";

export type StealResult = "success" | "played" | "stolen" | "not_found";

interface StealMatch {
  id: string;
  phrase: string;
  points: number;
}

interface StealPlayer {
  playerID: string;
  name: string;
}

export async function performSteal(
  db: Firestore,
  roomCode: string,
  match: StealMatch,
  cardHolder: StealPlayer,
  you: StealPlayer,
): Promise<StealResult> {
  const cardRef = doc(db, `rooms/${roomCode}/players/${cardHolder.playerID}/hand/${match.id}`);
  const playerRef = doc(db, `rooms/${roomCode}/players/${you.playerID}`);

  try {
    await runTransaction(db, async (transaction) => {
      const cardSnap = await transaction.get(cardRef);
      if (!cardSnap.exists()) throw new Error("not_found");
      const { status } = cardSnap.data();
      if (status === "played") throw new Error("played");
      if (status === "stolen") throw new Error("stolen");
      transaction.update(cardRef, { status: "stolen", stolenBy: you.name });
      transaction.update(playerRef, { score: increment(match.points) });
    });
    return "success";
  } catch (err: any) {
    const msg: string = err?.message ?? "unknown";
    if (msg === "played" || msg === "stolen" || msg === "not_found") return msg;
    throw err;
  }
}
