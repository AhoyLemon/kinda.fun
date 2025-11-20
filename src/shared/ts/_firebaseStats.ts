/**
 * Shared Firebase statistics tracking functions
 * Used across multiple games to avoid code duplication
 */
import { doc, increment, serverTimestamp, getDoc, setDoc, updateDoc, type Firestore, type DocumentReference } from "firebase/firestore";

/**
 * Update or create a player record in /stats/general/players/{playerName}
 * @param db - Firestore database instance
 * @param playerName - Player's name
 * @param gameSlug - Game identifier (e.g., "wrongest", "meeting", "invalid")
 */
export async function updateGeneralPlayerStats(db: Firestore, playerName: string, gameSlug: string): Promise<void> {
  try {
    const playerStatsRef: DocumentReference = doc(db, `stats/general/players/${playerName}`);
    const playerStatsSnap = await getDoc(playerStatsRef);

    if (playerStatsSnap.exists()) {
      await updateDoc(playerStatsRef, {
        gamesPlayed: increment(1),
        lastPlayed: serverTimestamp(),
        mostRecentGame: gameSlug,
      });
    } else {
      await setDoc(playerStatsRef, {
        name: playerName,
        gamesPlayed: 1,
        lastPlayed: serverTimestamp(),
        mostRecentGame: gameSlug,
      });
    }
  } catch (err) {
    console.error(`Error updating general stats for player ${playerName}:`, err);
  }
}

/**
 * Update or create a player record in a game-specific stats collection
 * @param db - Firestore database instance
 * @param gameSlug - Game identifier (e.g., "wrongest", "meeting", "invalid")
 * @param playerName - Player's name
 * @param additionalFields - Optional additional fields to include
 */
export async function updateGamePlayerStats(db: Firestore, gameSlug: string, playerName: string, additionalFields: Record<string, any> = {}): Promise<void> {
  try {
    const playerStatsRef: DocumentReference = doc(db, `stats/${gameSlug}/players/${playerName}`);
    const playerStatsSnap = await getDoc(playerStatsRef);

    if (playerStatsSnap.exists()) {
      await updateDoc(playerStatsRef, {
        timesPlayed: increment(1),
        lastPlayed: serverTimestamp(),
        ...additionalFields,
      });
    } else {
      await setDoc(playerStatsRef, {
        name: playerName,
        timesPlayed: 1,
        lastPlayed: serverTimestamp(),
        ...additionalFields,
      });
    }
  } catch (err) {
    console.error(`Error updating ${gameSlug} stats for player ${playerName}:`, err);
  }
}

/**
 * Update or create game size stats in /stats/{gameSlug}/gameSizes/{playerCount} players
 * @param db - Firestore database instance
 * @param gameSlug - Game identifier
 * @param playerCount - Number of players
 * @param statType - Type of stat to update ('gamesStarted' or 'gamesFinished')
 */
export async function updateGameSizeStats(
  db: Firestore,
  gameSlug: string,
  playerCount: number,
  statType: "gamesStarted" | "gamesFinished" = "gamesStarted",
): Promise<void> {
  try {
    const docId = `${playerCount} players`;
    const gameSizeRef: DocumentReference = doc(db, `stats/${gameSlug}/gameSizes/${docId}`);
    const gameSizeSnap = await getDoc(gameSizeRef);

    const updateField: Record<string, any> = {};
    updateField[statType] = increment(1);

    if (statType === "gamesStarted") {
      updateField.lastGameStarted = serverTimestamp();
    } else if (statType === "gamesFinished") {
      updateField.lastGameFinished = serverTimestamp();
    }

    if (gameSizeSnap.exists()) {
      await updateDoc(gameSizeRef, updateField);
    } else {
      await setDoc(gameSizeRef, {
        players: playerCount,
        [statType]: 1,
        ...(statType === "gamesStarted" ? { lastGameStarted: serverTimestamp() } : {}),
        ...(statType === "gamesFinished" ? { lastGameFinished: serverTimestamp() } : {}),
      });
    }
  } catch (err) {
    console.error(`Error updating ${gameSlug} gameSizes stats for ${playerCount} players:`, err);
  }
}
