// Firebase connections, room management, game lifecycle, round logic, and timers.
// Functions that require MyToast (chooseRule, saveRule, addBug, onPaste, tryToCrackWith,
// setGameOver) stay in Invalid.vue where the component reference is available.

import { nextTick } from "vue";
import { useFirestore } from "vuefire";
import { useToast } from "vue-toastification";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  increment,
  Timestamp,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  type DocumentData,
  type Unsubscribe,
} from "firebase/firestore";
import { randomFrom, sendEvent } from "@/shared/js/_functions";
import { my, round, ui, game, settings, defaults, gameTitle, flyingPigLines } from "./_variables";
import { challenges } from "./_challenges";
import {
  soundOink,
  soundNewRule,
  soundinvalidStartGuessing,
  soundBadGuess,
  soundCorrectGuess,
  soundSystemCrash,
  musicFinalRound,
  soundFinalRoundOver,
} from "./_sounds";
import { countVowels } from "./_functions";
import {
  convertPhaseToTemplate,
  tryToFailThis,
  tryToCrashWith,
  tryToFindDuplicatePassword,
  tryToFind,
  findAverageSize,
  findAverageVowelCount,
  countLettersInEachWord,
  findPossibleRightAnswers,
  resetRoundTimer,
  resetHurryTimer,
  resetAdminTimer,
  summonTheFlyingPig,
  killThePig,
  startFlyingPigTimer,
} from "./_useInvalidHelpers";
import type { AttemptRecord, CrackRecord, Player } from "./_types";
import type { Challenge } from "./_challenges";

export function useInvalidGame(statsRef: ReturnType<typeof doc> | null) {
  // Firebase/VueFire is client-only; guard so the landing screen prerenders.
  const db = import.meta.client ? useFirestore() : null;
  // Toast is client-only.
  const toast = import.meta.client
    ? useToast()
    : Object.assign(() => {}, { success() {}, error() {}, info() {}, warning() {} });
  let unsubscribeRoomPlayers: Unsubscribe | undefined;
  let unsubscribeGameStatus: Unsubscribe | undefined;

  /////////////////////////////////////////////////////////
  // FIREBASE SUBSCRIPTIONS

  async function subscribeToRoom(roomCode: string): Promise<Unsubscribe> {
    if (!db) return () => {};
    unsubscribeRoomPlayers?.();
    const playersRef = collection(doc(collection(db, "rooms"), roomCode), "players");
    unsubscribeRoomPlayers = onSnapshot(playersRef, (snapshot) => {
      game.players = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Player[];
    });
    return unsubscribeRoomPlayers;
  }

  async function subscribeToGameStatus(roomCode: string): Promise<Unsubscribe> {
    if (!db) return () => {};
    unsubscribeGameStatus?.();
    const gameRef = doc(collection(db, "rooms"), roomCode);

    unsubscribeGameStatus = onSnapshot(
      gameRef,
      async (docSnapshot) => {
        if (!docSnapshot.exists()) {
          console.error("Game document does not exist.");
          game.isFailedToGetRoomData = true;
          return;
        }

        const data = docSnapshot.data();

        game.isGameStarted = data.isGameStarted ?? false;
        game.roomCreatorID = data.roomCreatorID ?? "";
        game.isGameOver = data.isGameOver ?? false;

        const gamePhase = data.gamePhase;
        if (gamePhase) {
          const templatePhase = convertPhaseToTemplate(gamePhase);
          const currentPhase = round.phase;
          const isAddBugsSubPhase = currentPhase === "add bugs" && templatePhase === "choose rules";

          if (!isAddBugsSubPhase && templatePhase !== currentPhase) {
            handleGamePhaseChange(gamePhase, data);
          }
        }

        if (data.currentChallenge !== undefined) {
          if (data.currentChallenge && round.challenge?.id !== data.currentChallenge.id) {
            soundNewRule.play();
          }
          round.challenge = data.currentChallenge;
        }
        if (data.currentRules) {
          if (round.rules?.length !== data.currentRules.length) soundNewRule.play();
          round.rules = data.currentRules;
        }
        if (data.currentBugs) {
          if (round.bugs?.length !== data.currentBugs.length) soundNewRule.play();
          round.bugs = data.currentBugs;
        }
        if (data.currentShibboleth !== undefined) round.shibboleth = data.currentShibboleth;
        if (data.roundNumber !== undefined) round.number = data.roundNumber;
        if (data.sysAdminIndex !== undefined) round.sysAdminIndex = data.sysAdminIndex;
        if (data.maxRounds !== undefined) game.maxRounds = data.maxRounds;
        if (data.claimedPasswords) round.claimedPasswords = data.claimedPasswords;
        if (data.allEmployeePasswords) game.allEmployeePasswords = data.allEmployeePasswords;
        if (data.crashSummary) game.crashSummary = data.crashSummary;
        if (data.crackSummary) game.crackSummary = data.crackSummary;

        if (data.roundSummary) {
          const previousLength = game.roundSummary?.length || 0;
          game.roundSummary = data.roundSummary;
          const currentGamePhase = data.gamePhase ? convertPhaseToTemplate(data.gamePhase) : round.phase;
          if (data.roundSummary.length > previousLength && my.role === "SysAdmin" && currentGamePhase === "choose rules") {
            definePossibleChallenges();
          }
        }

        if (data.attempts) round.attempts = data.attempts;

        if (data.flyingPigActive !== undefined) {
          round.flyingPig.active = data.flyingPigActive;
          if (data.flyingPigActive) {
            summonTheFlyingPig();
          } else {
            killThePig();
          }
        }

        if (data.isRoundOver !== undefined) {
          const wasRoundOver = ui.roundOver;
          ui.roundOver = data.isRoundOver;

          if (!wasRoundOver && data.isRoundOver) {
            if (my.isRoomHost && round.sysAdminIndex >= 0 && game.players[round.sysAdminIndex]) {
              if (!round.sysAdminCrashAwarded) {
                const adminPlayer = game.players[round.sysAdminIndex];
                adminPlayer.score += round.elapsedTime;
                if (my.playerIndex === round.sysAdminIndex) {
                  my.score = adminPlayer.score;
                }
                try {
                  const adminRef = doc(db, "rooms", game.roomCode, "players", adminPlayer.playerID);
                  await updateDoc(adminRef, { score: adminPlayer.score });
                } catch (err) {
                  console.error("Error updating admin score after round over:", err);
                }
              }
            }
            round.elapsedTime = 0;
            resetRoundTimer();
            resetHurryTimer();
          }
        }
      },
      (error) => {
        console.error("Error subscribing to game status:", error);
      },
    );
    return unsubscribeGameStatus;
  }

  /////////////////////////////////////////////////////////
  // PHASE HANDLING

  function handleGamePhaseChange(newPhase: string, data: DocumentData): void {
    const previousPhase = round.phase;
    const templatePhase = convertPhaseToTemplate(newPhase);
    round.phase = templatePhase;

    if (data.sysAdminIndex !== undefined && game.players.length > 0) {
      console.log("Updating player roles. sysAdminIndex:", data.sysAdminIndex);
      console.log(
        "Players before role update:",
        game.players.map((p) => ({ name: p.name, role: p.role, playerID: p.playerID })),
      );

      game.players.forEach((player, index) => {
        player.role = index === data.sysAdminIndex ? "SysAdmin" : "employee";
      });

      console.log(
        "Players after role update:",
        game.players.map((p) => ({ name: p.name, role: p.role, playerID: p.playerID })),
      );

      const myIndex = game.players.findIndex((player) => player.playerID === my.playerID);
      if (myIndex !== -1) {
        my.role = game.players[myIndex].role ?? null;
        my.playerIndex = myIndex;
        console.log("My role updated to:", my.role, "at index:", myIndex);
      }
    }

    switch (newPhase) {
      case "choose-rules":
        ui.roundOver = false;
        ui.passwordSucceeded = false;
        ui.passwordAttemptErrors = [];
        ui.challengeID = null;
        ui.shibboleth = "";
        round.sysAdminCrashAwarded = false;

        if (previousPhase !== "choose rules") {
          game.players.forEach(async (player) => {
            if (player.passwordSuccess) {
              const playerRef = doc(db, "rooms", game.roomCode, "players", player.playerID);
              await updateDoc(playerRef, { passwordSuccess: false });
            }
          });
        }

        if (my.role === "SysAdmin") {
          if (previousPhase !== "choose rules") {
            my.rulebux = settings.default.rulebux;
          }
          if (!game.roundSummary || game.roundSummary.length === 0) {
            definePossibleChallenges();
          }
          document.title = my.role + " | " + gameTitle;
        } else {
          document.title = my.name + " | " + gameTitle;
        }
        break;

      case "create-password":
        if (previousPhase !== "create password") {
          roundStartTimer();
          soundinvalidStartGuessing.play();
        }
        break;

      case "crashed":
        if (data.crashedPlayer && data.crashedWord) {
          round.crash.active = true;
          round.crash.player = game.players.find((p) => p.playerID === data.crashedPlayer) ?? {};
          round.crash.word = String(data.crashedWord);
          soundSystemCrash.play();
          endTheGuessingRound();
        }
        break;

      case "final-round":
        startCountdownToFinalRound();
        document.title = "FINAL ROUND | " + gameTitle;
        break;

      case "game-over":
        musicFinalRound.stop();
        soundFinalRoundOver.play();
        clearInterval(round.roundTimer);
        round.roundTimer = undefined;
        document.title = "GAME OVER" + " | " + gameTitle;
        break;
    }
  }

  /////////////////////////////////////////////////////////
  // FIRESTORE HELPERS

  async function updateRoomState(updates: Record<string, unknown>): Promise<void> {
    if (!db) return;
    if (!game.roomCode) {
      console.error("updateRoomState: No room code available");
      return;
    }
    try {
      const roomRef = doc(db, "rooms", game.roomCode);
      await updateDoc(roomRef, updates);
    } catch (error) {
      console.error("Error updating room state:", error);
      throw error;
    }
  }

  /////////////////////////////////////////////////////////
  // ROOM MANAGEMENT

  const createRoom = async (): Promise<void> => {
    if (!db) return;
    game.isFailedToGetRoomData = false;
    function makeID(digits: number): string {
      let text = "";
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < digits; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
    const roomCode = makeID(4);
    const roomRef = doc(db, "rooms", roomCode);

    const roomSnapshot = await getDoc(roomRef);
    if (roomSnapshot.exists()) {
      alert("ERROR: room already exists");
      console.error("Room already exists");
      return;
    }

    const newRoom = {
      gameSlug: game.gameName,
      roomCode,
      roomCreatorID: my.playerID,
      isGameStarted: game.isGameStarted,
      allowNaughty: game.allowNaughty,
      maxRounds: game.maxRounds,
      createdAt: serverTimestamp(),
      ttl: Timestamp.fromMillis(Date.now() + 86400000),
      gamePhase: "lobby",
      currentChallenge: null,
      currentRules: [],
      currentBugs: [],
      currentShibboleth: "",
      roundNumber: 0,
      sysAdminIndex: -1,
      claimedPasswords: [],
      allEmployeePasswords: [],
      crashSummary: [],
      crackSummary: [],
      roundSummary: [],
      attempts: [],
      flyingPigActive: false,
      isRoundOver: false,
    };
    await setDoc(roomRef, newRoom);
    game.roomCode = roomCode;

    const protocol = window.location.protocol;
    const host = window.location.host;
    window.history.replaceState(null, "", `${protocol}//${host}/invalid?room=${game.roomCode}`);
    joinRoom();
  };

  const joinRoom = async (): Promise<void> => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get("room");
    if (!roomCode) {
      console.error("Room code is missing in the URL");
      game.isFailedToGetRoomData = true;
      return;
    }
    await connectToRoom(roomCode);
  };

  const joinRoomFromInput = async (): Promise<void> => {
    if (!ui.roomCodeInput) {
      console.error("No room code provided in input");
      game.isFailedToGetRoomData = true;
      return;
    }
    const protocol = window.location.protocol;
    const host = window.location.host;
    window.history.replaceState(null, "", `${protocol}//${host}/invalid?room=${ui.roomCodeInput}`);
    await connectToRoom(ui.roomCodeInput);
  };

  const checkForExistingPlayer = async (roomCode: string): Promise<void> => {
    if (!db) return;
    try {
      ui.reconnecting = true;
      const playersCollectionRef = collection(db, `rooms/${roomCode}/players`);
      const playerQuery = query(playersCollectionRef, where("playerID", "==", my.playerID));
      const querySnapshot = await getDocs(playerQuery);

      if (!querySnapshot.empty) {
        const playerData = querySnapshot.docs[0].data();
        my.name = playerData.name;
        my.score = playerData.score || 0;
        my.rulebux = playerData.rulebux || 0;
        my.passwordAttempts = playerData.passwordAttempts || 0;
        my.employeeNumber = playerData.employeeNumber || my.employeeNumber;
        my.color = playerData.color || "#ff0000";
        my.isRoomHost = playerData.isHost || false;

        await nextTick();
        if (game.players && game.players.length > 0 && typeof round.sysAdminIndex === "number" && round.sysAdminIndex > -1) {
          const myIndex = game.players.findIndex((player) => player.playerID === my.playerID);
          if (myIndex !== -1) {
            my.role = myIndex === round.sysAdminIndex ? "SysAdmin" : "employee";
            my.playerIndex = myIndex;
          }
        }

        ui.appliedForJob = true;
        ui.nameInput = my.name;
        console.log(`Reconnected player: ${my.name} (${my.role})`);
        toast.success(`Reconnected as ${my.name}!`);
      }
    } catch (error) {
      console.error("Error checking for existing player:", error);
    } finally {
      ui.reconnecting = false;
    }
  };

  const connectToRoom = async (roomCode: string): Promise<void> => {
    game.roomCode = roomCode.toUpperCase();
    await checkForExistingPlayer(game.roomCode);
  };

  const savePlayerInfo = async (): Promise<void> => {
    if (!db) return;
    let normalizedName = ui.nameInput.trim();
    const hasEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
      normalizedName,
    );
    if (!hasEmoji) normalizedName = normalizedName.toUpperCase();
    my.name = normalizedName;
    ui.appliedForJob = true;
    localStorage.setItem("kindaFunPlayerName", my.name);

    const playersCollection = collection(db, "rooms", game.roomCode, "players");
    const playerQuery = query(playersCollection, where("playerID", "==", my.playerID));
    const querySnapshot = await getDocs(playerQuery);

    let playerFound = false;
    let isHost = false;

    const allPlayersSnapshot = await getDocs(playersCollection);
    const existingPlayerIsHost = querySnapshot.docs.some((d) => d.data().isHost);
    if (existingPlayerIsHost || allPlayersSnapshot.empty) {
      isHost = true;
    } else {
      const hostExists = allPlayersSnapshot.docs.some((d) => d.data().isHost);
      if (!hostExists) isHost = true;
    }

    if (!querySnapshot.empty) {
      playerFound = true;
      for (const docSnapshot of querySnapshot.docs) {
        const playerRef = doc(db, "rooms", game.roomCode, "players", docSnapshot.id);
        await updateDoc(playerRef, { name: my.name, isHost });
      }
    }

    my.isRoomHost = isHost;

    if (!playerFound) {
      const newPlayer = {
        name: my.name,
        employeeNumber: my.employeeNumber,
        playerID: my.playerID,
        score: 0,
        passwordAttempts: 0,
        isHost,
      };
      const playerRef = doc(db, "rooms", game.roomCode, "players", my.playerID);
      await setDoc(playerRef, { ...newPlayer, playerID: my.playerID });
    }
  };

  /////////////////////////////////////////////////////////
  // GAME LIFECYCLE

  const startTheGame = async (): Promise<void> => {
    if (!db) return;
    game.players.forEach((player, index) => {
      game.players[index].role = player.isHost ? "SysAdmin" : "employee";
    });

    for (const player of game.players) {
      try {
        const playerStatsRef = doc(db, `stats/general/players/${player.name}`);
        const playerStatsSnap = await getDoc(playerStatsRef);
        if (playerStatsSnap.exists()) {
          await updateDoc(playerStatsRef, { gamesPlayed: increment(1), lastPlayed: serverTimestamp() });
        } else {
          await setDoc(playerStatsRef, { gamesPlayed: 1, lastPlayed: serverTimestamp(), mostRecentGame: "invalid", name: player.name });
        }
      } catch (err) {
        console.error(`Error updating stats for player ${player.name}:`, err);
      }
    }

    const playerCount = game.players.length;
    if (playerCount <= 3) {
      game.maxRounds = 6;
    } else if (playerCount === 4) {
      game.maxRounds = 8;
    } else {
      game.maxRounds = playerCount;
    }

    try {
      const docId = `${playerCount} players`;
      const gameSizeRef = doc(db, `stats/invalid/gameSizes/${docId}`);
      const gameSizeSnap = await getDoc(gameSizeRef);
      if (gameSizeSnap.exists()) {
        await updateDoc(gameSizeRef, { gamesStarted: increment(1), lastGameStarted: serverTimestamp() });
      } else {
        await setDoc(gameSizeRef, { players: playerCount, gamesStarted: 1, lastGameStarted: serverTimestamp() });
      }
    } catch (err) {
      console.error(`Error updating stats/invalid/gameSizes/${playerCount} players:`, err);
    }

    const hostIndex = game.players.findIndex((player) => player.isHost);
    const roomRef = doc(db, `rooms/${game.roomCode}`);
    await updateDoc(roomRef, {
      isGameStarted: true,
      gamePhase: "choose-rules",
      roundNumber: 1,
      sysAdminIndex: hostIndex,
      maxRounds: game.maxRounds,
    });
    await updateDoc(statsRef, { gamesStarted: increment(1), lastGameStarted: serverTimestamp() });
    sendEvent("Invalid", "Game Started", game.roomCode);
  };

  const payForRule = async (name: string, cost: number): Promise<void> => {
    if (!db) return;
    my.rulebux -= cost;
    try {
      const ruleStatsRef = doc(db, `stats/invalid/rules/${name}`);
      const now = serverTimestamp();
      await updateDoc(ruleStatsRef, { name, cost, lastUsed: now, count: increment(1) }).catch(async () => {
        await setDoc(ruleStatsRef, { name, cost, lastUsed: now, count: 1 });
      });
    } catch (err) {
      console.error(`Error updating rule stats for ${name}:`, err);
    }
  };

  /////////////////////////////////////////////////////////
  // CHALLENGE SELECTION

  const definePossibleChallenges = (): void => {
    round.possibleChallenges = [];
    const usedChallengeNames = (game.roundSummary || []).map((summary) => summary.challenge);
    let n = 0;
    while (n < settings.default.numberOfPossibleChallenges) {
      const randomChallenge = randomFrom(challenges) as Challenge;
      let appendThisChallenge = true;
      if (randomChallenge.naughty && !game.allowNaughty) {
        appendThisChallenge = false;
      } else if (usedChallengeNames.includes(randomChallenge.name)) {
        appendThisChallenge = false;
      } else if (round.possibleChallenges.some((c) => c.id === randomChallenge.id)) {
        appendThisChallenge = false;
      }
      if (appendThisChallenge) {
        round.possibleChallenges.push(randomChallenge);
        n++;
      }
    }
  };

  const chooseAChallenge = async (): Promise<void> => {
    if (!db) return;
    const chosen = challenges.find((c) => c.id === ui.challengeID);
    if (chosen) round.challenge = chosen;
    findPossibleRightAnswers(countVowels);
    const possible = (round.challenge as Challenge).possible;
    round.averageSize = findAverageSize(possible);
    round.averageVowels = findAverageVowelCount(possible);
    const { letterCounts, demandableLetters } = countLettersInEachWord(possible, game.players.length);
    round.letterCounts = letterCounts;
    round.demandableLetters = demandableLetters;
    startAdminTimer();

    await updateRoomState({ currentChallenge: round.challenge, gamePhase: "choose-rules" });

    try {
      const challengeName = (round.challenge as Challenge).name;
      const challengeStatsRef = doc(db, `stats/invalid/challenges/${challengeName}`);
      await updateDoc(challengeStatsRef, { timesChosen: increment(1), lastChosen: serverTimestamp() }).catch(async () => {
        await setDoc(challengeStatsRef, { name: challengeName, timesChosen: 1, lastChosen: serverTimestamp() });
      });
    } catch (err) {
      console.error("Error updating challenge stats:", err);
    }

    sendEvent("Invalid", "Challenge Selected", (round.challenge as Challenge).name);
  };

  /////////////////////////////////////////////////////////
  // RULE HELPERS

  const onboardEmployees = async (): Promise<void> => {
    resetAdminTimer();
    await updateRoomState({ gamePhase: "create-password", sysAdminIndex: my.playerIndex });
  };

  const finishRules = (): void => {
    round.phase = "add bugs";
  };

  /////////////////////////////////////////////////////////
  // TIMERS

  const startAdminTimer = (): void => {
    round.adminTimeLeft = defaults.adminTimeLeft;
    round.adminTimer = setInterval(() => {
      round.adminTimeLeft -= 0.05;
      if (round.adminTimeLeft <= 0) {
        onboardEmployees();
      }
    }, 50);
  };

  const roundStartTimer = (): void => {
    round.elapsedTime = 0;
    round.roundTimer = setInterval(() => {
      round.elapsedTime += 1;
      if (round.elapsedTime >= settings.timer.employeeMaxTime - settings.timer.hurryTime && round.hurryTimer === undefined) {
        startHurryTimer();
      }
    }, 1000);

    if (round.flyingPig.active && my.role === "employee") {
      startFlyingPigTimer();
    }
  };

  const startHurryTimer = (): void => {
    round.hurryTimer = setInterval(() => {
      round.hurryTime -= 0.1;
      if (round.hurryTime <= 0) {
        endTheGuessingRound();
      }
    }, 100);
  };

  const endTheGuessingRound = async (): Promise<void> => {
    resetRoundTimer();
    resetHurryTimer();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await updateRoomState({ isRoundOver: true });
  };

  const startCountdownToFinalRound = (): void => {
    round.hurryTime = settings.timer.countdownToFinal;
    round.hurryTimer = setInterval(() => {
      round.hurryTime -= 1;
      if (round.hurryTime <= 0) {
        ui.enterFinalPasswords = true;
        clearInterval(round.hurryTimer);
        round.hurryTimer = undefined;
        startFinalRoundCounter();
      }
    }, 1000);
    musicFinalRound.play();
  };

  const startFinalRoundCounter = (): void => {
    round.finalTimeLeft = settings.timer.finalRound;
    round.roundTimer = setInterval(() => {
      round.finalTimeLeft -= 1;
      if (round.finalTimeLeft <= 0) {
        setGameOver();
      }
    }, 1001);
  };

  /////////////////////////////////////////////////////////
  // PASSWORD SUBMISSION (employee)

  const tryThisPassword = async (attempt: string): Promise<void> => {
    if (!db) return;
    attempt = attempt.toUpperCase();
    ui.passwordAttemptErrors = [];

    const hasDrowssapRule = round.rules.some((r) => r.type === "DROWSSAP");
    if (hasDrowssapRule) attempt = attempt.split("").reverse().join("");

    const crashCheck = tryToCrashWith(attempt, round.bugs);
    const failCheck = tryToFailThis(attempt, round.rules, countVowels);
    const duplicateCheck = tryToFindDuplicatePassword(attempt, game.allEmployeePasswords);
    const matchCheck = tryToFind(attempt, (round.challenge as Challenge).possible);

    let correctAnswer = false;

    if (failCheck) {
      ui.passwordAttemptErrors = failCheck.reasons;
      ui.passwordInputError = true;
    }
    if (duplicateCheck) {
      ui.passwordAttemptErrors.push("Someone else has already used " + attempt + " as a password.");
      ui.passwordInputError = true;
    }
    if (!matchCheck) {
      const errorMessage = (round.challenge as Challenge).failedMessage.replace("[PASS]", attempt);
      ui.passwordInputError = true;
      ui.passwordAttemptErrors.push(errorMessage);
    }
    if (matchCheck && !failCheck && !crashCheck && !duplicateCheck) {
      correctAnswer = true;
    }

    my.passwordAttempts++;
    ui.passwordAttempt = "";
    ui.shibboleth = "";

    const attemptRecord: AttemptRecord = {
      playerIndex: my.playerIndex,
      pwAttempt: attempt,
      attemptCount: my.passwordAttempts,
      timestamp: new Date(),
    };

    if (crashCheck) {
      round.sysAdminCrashAwarded = true;
      attemptRecord.result = "crash";
      attemptRecord.challengeName = (round.challenge as Challenge).name;

      if (round.sysAdminIndex >= 0 && game.players[round.sysAdminIndex]) {
        const adminPlayer = game.players[round.sysAdminIndex];
        if (typeof round.elapsedTime === "number" && round.elapsedTime > 0) {
          adminPlayer.score += round.elapsedTime;
        }
        adminPlayer.score += settings.points.forServerCrash;
        if (my.playerIndex === round.sysAdminIndex) my.score = adminPlayer.score;
        const adminRef = doc(db, "rooms", game.roomCode, "players", adminPlayer.playerID);
        await updateDoc(adminRef, { score: adminPlayer.score });
      }

      const newCrashSummary = [
        ...(game.crashSummary || []),
        { playerIndex: my.playerIndex, sysAdminIndex: round.sysAdminIndex, word: attempt },
      ];

      await updateRoomState({
        gamePhase: "crashed",
        crashedPlayer: my.playerID,
        crashedWord: attempt,
        crashSummary: newCrashSummary,
        attempts: [...(round.attempts || []), attemptRecord],
      });

      my.crashesCaused += 1;

      try {
        const bugCrashRef = doc(db, `stats/invalid/bugs/${attempt}`);
        const bugCrashSnap = await getDoc(bugCrashRef);
        if (bugCrashSnap.exists()) {
          await updateDoc(bugCrashRef, { timesCrashed: increment(1), lastCrashed: serverTimestamp() });
        } else {
          await setDoc(bugCrashRef, { name: attempt, timesCrashed: 1, lastCrashed: serverTimestamp(), timesCreated: 0 });
        }
      } catch (err) {
        console.error(`Error logging bug crash for ${attempt}:`, err);
      }

      sendEvent("Invalid", "Server Crashed", attempt);
    } else if (correctAnswer) {
      soundCorrectGuess.play();
      await passwordSuccess(attempt);
    } else {
      soundBadGuess.play();
      attemptRecord.result = "failed";
      const newAttempts = [...(round.attempts || []), attemptRecord];
      try {
        await updateRoomState({ attempts: newAttempts });
      } catch (error) {
        console.error("Error in updateRoomState:", error);
      }
    }
  };

  const passwordSuccess = async (attempt: string): Promise<void> => {
    if (!db) return;
    my.score += settings.points.forGoodPassword;
    if (game.allEmployeePasswords.length < 1 && game.players.length > 2) {
      my.score += settings.points.forFirstPassword;
    }
    ui.passwordSucceeded = true;

    const playerRef = doc(db, "rooms", game.roomCode, "players", my.playerID);
    await updateDoc(playerRef, { score: my.score, passwordSuccess: true });

    const newEmployeePasswords = [
      ...(game.allEmployeePasswords || []),
      { pw: attempt, name: my.name, playerIndex: my.playerIndex, playerID: my.playerID, claimed: false as const },
    ];

    const attemptRecord: AttemptRecord = {
      playerIndex: my.playerIndex,
      pwAttempt: attempt,
      attemptCount: my.passwordAttempts,
      playerScore: my.score,
      challengeName: (round.challenge as Challenge).name,
      result: "success",
      timestamp: new Date(),
    };

    const totalPlayers = game.players.length;
    const employeeCount = totalPlayers - 1;
    const updatedAttempts = [...(round.attempts || []), attemptRecord];
    const successfulPasswordsThisRound = updatedAttempts.filter((a) => a.result === "success").length;
    const shouldEndRound = employeeCount === successfulPasswordsThisRound;

    await updateRoomState({ allEmployeePasswords: newEmployeePasswords, attempts: updatedAttempts });

    try {
      const passwordStatsRef = doc(db, `stats/invalid/passwords/${attempt}`);
      await updateDoc(passwordStatsRef, { timesCreated: increment(1), lastCreated: serverTimestamp() }).catch(async () => {
        await setDoc(passwordStatsRef, { name: attempt, timesCreated: 1, lastCreated: serverTimestamp() });
      });
    } catch (err) {
      console.error("Error updating password attempt stats:", err);
    }

    if (shouldEndRound) {
      resetRoundTimer();
      resetHurryTimer();
      await updateRoomState({ isRoundOver: true });
    }

    if (round.flyingPig.active) {
      round.flyingPig.message = randomFrom(flyingPigLines.afterCorrect);
      clearInterval(round.flyingPig.timer);
      round.flyingPig.timer = undefined;
      soundOink.play();
    }
  };

  /////////////////////////////////////////////////////////
  // CRACK & GAME-OVER HELPERS

  const updateCrackResults = async (crackSummary: CrackRecord): Promise<void> => {
    if (!db) return;
    const attackerRef = doc(db, "rooms", game.roomCode, "players", game.players[crackSummary.attackerIndex].playerID);
    const victimRef = doc(db, "rooms", game.roomCode, "players", game.players[crackSummary.victimIndex].playerID);

    await updateDoc(attackerRef, { score: game.players[crackSummary.attackerIndex].score });

    const passwordStatsRef = doc(db, `stats/invalid/passwords/${crackSummary.pw}`);
    await updateDoc(passwordStatsRef, { timesCracked: increment(1), lastCracked: serverTimestamp() });

    if (crackSummary.attackerIndex !== crackSummary.victimIndex) {
      await updateDoc(victimRef, { score: game.players[crackSummary.victimIndex].score });
    }

    await updateRoomState({
      allEmployeePasswords: game.allEmployeePasswords,
      crackSummary: [...(game.crackSummary || []), crackSummary],
    });
  };

  const setGameOver = async (): Promise<void> => {
    if (!db) return;
    musicFinalRound.stop();
    soundFinalRoundOver.play();
    clearInterval(round.roundTimer);
    round.roundTimer = undefined;
    round.phase = "GAME OVER";

    const playerRef = doc(db, "rooms", game.roomCode, "players", my.playerID);
    await updateDoc(playerRef, { passwordAttempts: my.passwordAttempts });

    // Only the host logs gamesFinished
    const roomCreatorExists = game.players.some((p) => p.playerID === game.roomCreatorID);
    const amIHost =
      roomCreatorExists
        ? my.playerID === game.roomCreatorID
        : game.players.length > 0 && (game.players[0].playerID === my.playerID || game.players.some((p) => p.playerID === my.playerID && p.isHost));

    if (amIHost) {
      await updateDoc(statsRef, { gamesFinished: increment(1), lastGameFinished: serverTimestamp() });
      const docId = `${game.players.length} players`;
      const gameSizeRef = doc(db, `stats/invalid/gameSizes/${docId}`);
      await updateDoc(gameSizeRef, { gamesFinished: increment(1), lastGameFinished: serverTimestamp() });
    }

    await updateRoomState({ gamePhase: "game-over", isGameOver: true });
  };

  /////////////////////////////////////////////////////////
  // ROUND PROGRESSION

  const startNextRoundClicked = async (): Promise<void> => {
    const summary = {
      challenge: (round.challenge as Challenge)?.name || "Unknown Challenge",
      sysAdmin: my.name,
      rules: round.rules || [],
      bugs: round.bugs || [],
      attempts: round.attempts || [],
      listSource: (round.challenge as Challenge)?.source || "Unknown Source",
      possibleAnswers: round.possibleAnswerCount || 0,
    };

    const newRoundSummary = [...(game.roundSummary || []), summary];
    const nextRoundNumber = round.number + 1;

    if (nextRoundNumber > game.maxRounds) {
      await updateRoomState({ roundSummary: newRoundSummary, gamePhase: "final-round" });
    } else {
      let nextSysAdminIndex = round.sysAdminIndex + 1;
      if (nextSysAdminIndex >= game.players.length) nextSysAdminIndex = 0;

      await updateRoomState({
        roundSummary: newRoundSummary,
        roundNumber: nextRoundNumber,
        sysAdminIndex: nextSysAdminIndex,
        gamePhase: "choose-rules",
        currentChallenge: null,
        currentRules: [],
        currentBugs: [],
        currentShibboleth: "",
        attempts: [],
        flyingPigActive: false,
        isRoundOver: false,
      });
    }
  };

  return {
    // Subscriptions
    subscribeToRoom,
    subscribeToGameStatus,
    // Room
    createRoom,
    joinRoom,
    joinRoomFromInput,
    connectToRoom,
    savePlayerInfo,
    // Game lifecycle
    startTheGame,
    payForRule,
    // Challenge / round
    definePossibleChallenges,
    chooseAChallenge,
    onboardEmployees,
    finishRules,
    // Timers
    startAdminTimer,
    roundStartTimer,
    resetRoundTimer,
    resetHurryTimer,
    resetAdminTimer,
    endTheGuessingRound,
    // Password
    tryThisPassword,
    passwordSuccess,
    // Crack / game-over
    updateCrackResults,
    setGameOver,
    // Round progression
    startNextRoundClicked,
    // Firestore helper (needed by Invalid.vue's chooseRule/saveRule/addBug)
    updateRoomState,
  };
}
