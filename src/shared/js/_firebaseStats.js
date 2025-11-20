/**
 * Shared Firebase statistics tracking functions
 * Used across multiple games to avoid code duplication
 */
import { doc, increment, serverTimestamp, getDoc, setDoc, updateDoc } from "firebase/firestore";

/**
 * Update or create a player record in /stats/general/players/{playerName}
 * @param {object} db - Firestore database instance
 * @param {string} playerName - Player's name
 * @param {string} gameSlug - Game identifier (e.g., "wrongest", "meeting", "invalid")
 */
export async function updateGeneralPlayerStats(db, playerName, gameSlug) {
  try {
    const playerStatsRef = doc(db, `stats/general/players/${playerName}`);
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
 * @param {object} db - Firestore database instance
 * @param {string} gameSlug - Game identifier (e.g., "wrongest", "meeting", "invalid")
 * @param {string} playerName - Player's name
 * @param {object} additionalFields - Optional additional fields to include
 */
export async function updateGamePlayerStats(db, gameSlug, playerName, additionalFields = {}) {
  try {
    const playerStatsRef = doc(db, `stats/${gameSlug}/players/${playerName}`);
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
 * @param {object} db - Firestore database instance
 * @param {string} gameSlug - Game identifier
 * @param {number} playerCount - Number of players
 * @param {string} statType - Type of stat to update ('gamesStarted' or 'gamesFinished')
 */
export async function updateGameSizeStats(db, gameSlug, playerCount, statType = "gamesStarted") {
  try {
    const docId = `${playerCount} players`;
    const gameSizeRef = doc(db, `stats/${gameSlug}/gameSizes/${docId}`);
    const gameSizeSnap = await getDoc(gameSizeRef);

    const updateField = {};
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
