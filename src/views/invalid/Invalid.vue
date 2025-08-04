<script setup>
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // IMPORTS
  import { reactive, computed, onMounted, getCurrentInstance, watch, nextTick } from "vue"; // Import reactive from Vue 3
  import {
    randomNumber,
    randomFrom,
    shuffle,
    preceisePercentOf,
    percentOf,
    addCommas,
    findInArray,
    removeFromArray,
    sendEvent,
    dollars,
  } from "@/shared/js/_functions.js";
  import { countVowels } from "./js/_functions";
  import {
    gameTitle,
    siteURL,
    playerID,
    employeeNumberSeed,
    defaults,
    settings,
    roundDefaults,
    resetRoundVariables,
    resetUI,
    rulePhrasings,
    flyingPigLines,
    my,
    round,
    ui,
    game,
  } from "./js/_variables";
  import { challenges } from "./js/_challenges";

  /////// Sounds
  import { Howl, Howler } from "howler";
  import {
    musicLobby,
    soundOink,
    soundNewRule,
    soundinvalidStartGuessing,
    soundBadGuess,
    soundCorrectGuess,
    soundSystemCrash,
    soundCorrect,
    soundNo,
    soundCracked,
    soundYouIdiot,
    soundTooSlow,
    musicFinalRound,
    soundFinalRoundOver,
  } from "./js/_sounds";

  ////////////// Toasts
  import Toast, { POSITION } from "vue-toastification";
  import "vue-toastification/dist/index.css";
  import MyToast from "./vue/MyToast.vue";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  // Are you in devMode?
  const devMode = import.meta.env.DEV;

  // Firebase & VueFire Stuff
  import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    increment,
    Timestamp,
    addDoc,
    getDocs,
    collection,
    query,
    where,
    onSnapshot,
  } from "firebase/firestore";
  import { useFirestore, useCollection, useDocument } from "vuefire";

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // UTILITY FUNCTIONS

  // Convert Firestore phase names (with dashes) to template phase names (with spaces)
  const convertPhaseToTemplate = (firestorePhase) => {
    switch (firestorePhase) {
      case "choose-rules":
        return "choose rules";
      case "create-password":
        return "create password";
      case "final-round":
        return "FINAL ROUND";
      case "game-over":
        return "GAME OVER";
      default:
        return firestorePhase;
    }
  };

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // FIREBASE & FIRESTORE

  // Initialize Firestore
  const db = useFirestore();
  const statsRef = doc(db, `stats/invalid`);

  // Firebase Subscription Watch
  watch(
    () => game.roomCode,
    async (newRoomCode) => {
      if (newRoomCode) {
        try {
          await subscribeToRoom(newRoomCode);
          await subscribeToGameStatus(newRoomCode);
        } catch (error) {
          console.error("Error subscribing to room:", error);
        }
      }
    },
    { immediate: true },
  );

  async function subscribeToRoom(roomCode) {
    const playersRef = collection(doc(collection(db, "rooms"), roomCode), "players");

    // Use onSnapshot to keep game.players in sync with the playersRef
    onSnapshot(playersRef, (snapshot) => {
      const updatedPlayers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      game.players = updatedPlayers;
    });
  }

  async function subscribeToGameStatus(roomCode) {
    const gameRef = doc(collection(db, "rooms"), roomCode);

    onSnapshot(
      gameRef,
      async (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();

          game.isGameStarted = data.isGameStarted ?? false;
          game.roomCreatorID = data.roomCreatorID ?? "";
          game.isGameOver = data.isGameOver ?? false;

          // Handle game state updates - only call phase change handler if phase actually changed
          const gamePhase = data.gamePhase;
          if (gamePhase) {
            // Convert Firestore phase to template phase for comparison
            const templatePhase = convertPhaseToTemplate(gamePhase);

            // Only handle phase change if the phase actually changed
            // Special case: "add bugs" is a local sub-phase of "choose rules"
            const currentPhase = round.phase;
            const isAddBugsSubPhase = currentPhase === "add bugs" && templatePhase === "choose rules";

            // CRITICAL FIX: Don't trigger phase change if we're in "add bugs" sub-phase
            // The "add bugs" phase is local-only and should not be overridden by Firestore
            if (isAddBugsSubPhase) {
              // Do NOT call handleGamePhaseChange - stay in add bugs phase
            } else if (templatePhase !== currentPhase) {
              handleGamePhaseChange(gamePhase, data);
            }
          }

          // Update game state from Firestore
          if (data.currentChallenge !== undefined) {
            // Play sound if challenge changed (only create previous value when needed)
            if (data.currentChallenge && round.challenge?.id !== data.currentChallenge.id) {
              soundNewRule.play();
            }
            round.challenge = data.currentChallenge;
          }
          if (data.currentRules) {
            // Play sound if rules changed (only create previous value when needed)
            if (round.rules?.length !== data.currentRules.length) {
              soundNewRule.play();
            }
            round.rules = data.currentRules;
          }
          if (data.currentBugs) {
            // Play sound if bugs changed (only create previous value when needed)
            if (round.bugs?.length !== data.currentBugs.length) {
              soundNewRule.play();
            }
            round.bugs = data.currentBugs;
          }
          if (data.currentShibboleth !== undefined) {
            round.shibboleth = data.currentShibboleth;
          }
          if (data.roundNumber !== undefined) {
            round.number = data.roundNumber;
          }
          if (data.sysAdminIndex !== undefined) {
            round.sysAdminIndex = data.sysAdminIndex;
          }
          if (data.maxRounds !== undefined) {
            game.maxRounds = data.maxRounds;
          }
          if (data.claimedPasswords) {
            round.claimedPasswords = data.claimedPasswords;
          }
          if (data.allEmployeePasswords) {
            game.allEmployeePasswords = data.allEmployeePasswords;
          }
          if (data.crashSummary) {
            game.crashSummary = data.crashSummary;
          }
          if (data.crackSummary) {
            game.crackSummary = data.crackSummary;
          }
          if (data.roundSummary) {
            const previousRoundSummaryLength = game.roundSummary?.length || 0;
            game.roundSummary = data.roundSummary;

            // If round summary was updated and we're a SysAdmin in choose rules phase,
            // update possible challenges to exclude newly completed rounds
            const currentGamePhase = data.gamePhase ? convertPhaseToTemplate(data.gamePhase) : round.phase;
            if (data.roundSummary.length > previousRoundSummaryLength && my.role === "SysAdmin" && currentGamePhase === "choose rules") {
              definePossibleChallenges();
            }
          }
          if (data.attempts) {
            round.attempts = data.attempts;
          }
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

            // Stop the timer when round becomes over
            if (!wasRoundOver && data.isRoundOver) {
              // If current player is the admin, increment their score by round.elapsedTime
              if (my.playerIndex === round.sysAdminIndex) {
                my.score += round.elapsedTime;
                // Also update the score in Firestore
                try {
                  const playerRef = doc(db, "rooms", game.roomCode, "players", my.playerID);
                  await updateDoc(playerRef, { score: my.score });
                } catch (err) {
                  console.error("Error updating admin score after round over:", err);
                }
              }
              // Reset elapsedTime for all
              round.elapsedTime = 0;
              resetRoundTimer();
              resetHurryTimer();
            }
          }
        } else {
          console.error("Game document does not exist.");
          game.isFailedToGetRoomData = true;
        }
      },
      (error) => {
        console.error("Error subscribing to game status:", error);
      },
    );
  }

  // Handle game phase changes from Firestore
  function handleGamePhaseChange(newPhase, data) {
    const previousPhase = round.phase;

    // Convert Firestore phase names (with dashes) to template phase names (with spaces)
    const templatePhase = convertPhaseToTemplate(newPhase);

    round.phase = templatePhase;

    // Update player roles based on sysAdminIndex
    if (data.sysAdminIndex !== undefined && game.players.length > 0) {
      console.log("Updating player roles. sysAdminIndex:", data.sysAdminIndex);
      console.log(
        "Players before role update:",
        game.players.map((p) => ({ name: p.name, role: p.role, playerID: p.playerID })),
      );

      game.players.forEach((player, index) => {
        if (index === data.sysAdminIndex) {
          player.role = "SysAdmin";
        } else {
          player.role = "employee";
        }
      });

      console.log(
        "Players after role update:",
        game.players.map((p) => ({ name: p.name, role: p.role, playerID: p.playerID })),
      );

      // Update my role
      const myIndex = game.players.findIndex((player) => player.playerID === my.playerID);
      if (myIndex !== -1) {
        my.role = game.players[myIndex].role;
        my.playerIndex = myIndex;
        console.log("My role updated to:", my.role, "at index:", myIndex);
      }
    }

    switch (newPhase) {
      case "choose-rules":
        // Reset UI state for new round
        ui.roundOver = false;
        ui.passwordSucceeded = false;
        ui.passwordAttemptErrors = [];
        ui.challengeID = null;
        ui.shibboleth = ""; // Clear shibboleth input from previous round

        // Clear password success indicators from all players
        if (previousPhase !== "choose rules") {
          game.players.forEach(async (player) => {
            if (player.passwordSuccess) {
              const playerRef = doc(db, "rooms", game.roomCode, "players", player.playerID);
              await updateDoc(playerRef, {
                passwordSuccess: false,
              });
            }
          });
        }

        if (my.role === "SysAdmin") {
          // Only reset rulebux if this is a true phase change (not just a reconnect)
          if (previousPhase !== "choose rules") {
            my.rulebux = settings.default.rulebux;
          }
          // Only define possible challenges if we don't have round summary yet
          // or if this is the very first round (no previous rounds to exclude)
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
          round.crash.player = game.players.find((p) => p.playerID === data.crashedPlayer);
          round.crash.word = data.crashedWord;
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

  // Helper function to update room state in Firestore
  async function updateRoomState(updates) {
    if (!game.roomCode) {
      console.error("updateRoomState: No room code available");
      return;
    }

    try {
      const roomRef = doc(db, "rooms", game.roomCode);
      await updateDoc(roomRef, updates);
    } catch (error) {
      console.error("Error updating room state:", error);
      throw error; // Re-throw so calling code can handle it
    }
  }

  const createRoom = async () => {
    game.isFailedToGetRoomData = false;
    // Generate a room code
    function makeID(digits) {
      let text = "";
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < digits; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
    const roomCode = makeID(4);
    const roomRef = doc(db, "rooms", roomCode);

    // Check if the room already exists
    const roomSnapshot = await getDoc(roomRef);
    if (roomSnapshot.exists()) {
      alert("ERROR: room already exists");
      console.error("Room already exists");
      return;
    }

    // Room does not exist, create the new room document
    const newRoom = {
      gameSlug: game.gameName,
      roomCode: roomCode,
      roomCreatorID: my.playerID,
      isGameStarted: game.isGameStarted,
      allowNaughty: game.allowNaughty,
      maxRounds: game.maxRounds,
      createdAt: serverTimestamp(),
      ttl: Timestamp.fromMillis(Date.now() + 86400000), // 1 day from now
      // Game state fields for real-time sync
      gamePhase: "lobby", // lobby, choose-rules, create-password, crashed, final-round, game-over
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
    // Update the browser URL to the new meeting page
    const protocol = window.location.protocol; // http: or https:
    const host = window.location.host; // e.g., localhost:5173 or example.com
    const newUrl = `${protocol}//${host}/invalid?room=${game.roomCode}`;
    window.history.replaceState(null, "", newUrl);
    joinRoom();
  };

  /**
   * Joins a room using a room code from the URL parameter.
   * Called automatically when the page loads with a ?room= parameter.
   */
  const joinRoom = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get("room");

    if (!roomCode) {
      console.error("Room code is missing in the URL");
      game.isFailedToGetRoomData = true;
      return;
    }

    await connectToRoom(roomCode);
  };

  /**
   * Joins a room using a room code from form input.
   * Updates the URL and then connects to the room.
   */
  const joinRoomFromInput = async () => {
    if (!ui.roomCodeInput) {
      console.error("No room code provided in input");
      game.isFailedToGetRoomData = true;
      return;
    }

    // Update the URL with the room code from form input
    const protocol = window.location.protocol;
    const host = window.location.host;
    const newUrl = `${protocol}//${host}/invalid?room=${ui.roomCodeInput}`;
    window.history.replaceState(null, "", newUrl);

    await connectToRoom(ui.roomCodeInput);
  };

  /**
   * Check if the current player already exists in the Firebase room
   * and restore their state if found (for reconnection scenarios).
   */
  const checkForExistingPlayer = async (roomCode) => {
    try {
      ui.reconnecting = true;

      const playersCollectionRef = collection(db, `rooms/${roomCode}/players`);
      const playerQuery = query(playersCollectionRef, where("playerID", "==", my.playerID));
      const querySnapshot = await getDocs(playerQuery);

      if (!querySnapshot.empty) {
        // Player found in Firebase - restore their state
        const playerData = querySnapshot.docs[0].data();

        // Restore player state from Firebase
        // Do NOT restore role from Firebase, recalculate using sysAdminIndex and game.players
        my.name = playerData.name;
        my.score = playerData.score || 0;
        my.rulebux = playerData.rulebux || 0;
        my.passwordAttempts = playerData.passwordAttempts || 0;
        my.employeeNumber = playerData.employeeNumber || my.employeeNumber;
        my.color = playerData.color || "#ff0000";
        my.isRoomHost = playerData.isHost || false;

        // Recalculate my.role using sysAdminIndex and game.players
        await nextTick();
        if (game.players && game.players.length > 0 && typeof round.sysAdminIndex === "number" && round.sysAdminIndex > -1) {
          const myIndex = game.players.findIndex((player) => player.playerID === my.playerID);
          if (myIndex !== -1) {
            my.role = myIndex === round.sysAdminIndex ? "SysAdmin" : "employee";
            my.playerIndex = myIndex;
          }
        }

        // Update UI state to reflect successful reconnection
        ui.appliedForJob = true;
        ui.nameInput = my.name;

        console.log(`Reconnected player: ${my.name} (${my.role})`);

        // Show reconnection success toast
        toast.success(`Reconnected as ${my.name}!`);
      }
    } catch (error) {
      console.error("Error checking for existing player:", error);
    } finally {
      ui.reconnecting = false;
    }
  };

  /**
   * Core connection logic for joining a room with a given room code.
   * Sets up Firestore subscriptions for room data and players.
   */
  const connectToRoom = async (roomCode) => {
    game.roomCode = roomCode.toUpperCase();
    const roomRef = doc(db, "rooms", game.roomCode);

    // Fetch room data
    game.roomData = useDocument(roomRef);

    // Fetch players
    const playersCollectionRef = collection(db, `rooms/${game.roomCode}/players`);
    game.players = useCollection(playersCollectionRef);

    // Check for existing player and restore state if needed
    await checkForExistingPlayer(roomCode);
  };

  const savePlayerInfo = async () => {
    // Normalize the name input - handle emojis properly
    let normalizedName = ui.nameInput.trim();

    // Only convert to uppercase if the string doesn't contain emojis
    // This prevents emoji corruption from toUpperCase()
    const hasEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
      normalizedName,
    );

    if (!hasEmoji) {
      normalizedName = normalizedName.toUpperCase();
    }

    my.name = normalizedName;
    ui.appliedForJob = true;

    localStorage.setItem("kindaFunPlayerName", my.name);

    const playersCollection = collection(db, "rooms", game.roomCode, "players");
    const playerQuery = query(playersCollection, where("playerID", "==", my.playerID));
    const querySnapshot = await getDocs(playerQuery);

    let playerFound = false;
    let isHost = false;

    // Check if there are existing players and if any of them are hosts
    const allPlayersSnapshot = await getDocs(playersCollection);
    if (allPlayersSnapshot.empty) {
      isHost = true; // No other players in the room, this player will be the host
    } else {
      const hostExists = allPlayersSnapshot.docs.some((doc) => doc.data().isHost);
      if (!hostExists) {
        isHost = true; // No host exists among the existing players, this player will be the host
      }
    }

    if (!querySnapshot.empty) {
      // Update the existing player document
      querySnapshot.forEach(async (docSnapshot) => {
        const playerRef = doc(db, "rooms", game.roomCode, "players", docSnapshot.id);
        await updateDoc(playerRef, {
          name: my.name,
          isHost: isHost,
        });
        playerFound = true;
      });
    }

    if (!playerFound) {
      const newPlayer = {
        name: my.name,
        employeeNumber: my.employeeNumber,
        playerID: my.playerID,
        score: 0,
        passwordAttempts: 0,
        isHost: isHost,
      };
      const playerRef = doc(db, "rooms", game.roomCode, "players", my.playerID);
      await setDoc(playerRef, { ...newPlayer, playerID: my.playerID });
    }
  };

  const startTheGame = async () => {
    // Assign the host as SysAdmin, all other players are employees
    game.players.forEach(function (player, index) {
      if (player.isHost) {
        game.players[index].role = "SysAdmin";
      } else {
        game.players[index].role = "employee";
      }
    });

    // Save/update player stats in /stats/general/players/{playerName}
    for (const player of game.players) {
      try {
        const playerStatsRef = doc(db, `stats/general/players/${player.name}`);
        const playerStatsSnap = await getDoc(playerStatsRef);
        if (playerStatsSnap.exists()) {
          await updateDoc(playerStatsRef, {
            gamesPlayed: increment(1),
            lastPlayed: serverTimestamp(),
          });
        } else {
          await setDoc(playerStatsRef, {
            gamesPlayed: 1,
            lastPlayed: serverTimestamp(),
            mostRecentGame: "invalid",
            name: player.name,
          });
        }
      } catch (err) {
        console.error(`Error updating stats for player ${player.name}:`, err);
      }
    }

    // Use a variable for player count
    const playerCount = game.players.length;

    if (playerCount == 2) {
      game.maxRounds = 6;
    } else if (playerCount == 3) {
      game.maxRounds = 6;
    } else if (playerCount == 4) {
      game.maxRounds = 8;
    } else {
      game.maxRounds = playerCount;
    }

    // Save/update player count stats in /stats/invalid/gameSizes/{playerCount} players
    try {
      const docId = `${playerCount} players`;
      const gameSizeRef = doc(db, `stats/invalid/gameSizes/${docId}`);
      const gameSizeSnap = await getDoc(gameSizeRef);

      if (gameSizeSnap.exists()) {
        await updateDoc(gameSizeRef, {
          gamesStarted: increment(1),
          lastGameStarted: serverTimestamp(),
        });
      } else {
        await setDoc(gameSizeRef, {
          players: playerCount,
          gamesStarted: 1,
          lastGameStarted: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error(`Error updating stats/invalid/gameSizes/${playerCount} players:`, err);
    }

    // Find the first host as the initial SysAdmin
    const hostIndex = game.players.findIndex((player) => player.isHost);

    const roomRef = doc(db, `rooms/${game.roomCode}`);
    await updateDoc(roomRef, {
      isGameStarted: true,
      gamePhase: "choose-rules",
      roundNumber: 1,
      sysAdminIndex: hostIndex,
      maxRounds: game.maxRounds,
    });
    await updateDoc(statsRef, {
      gamesStarted: increment(1),
      lastGameStarted: serverTimestamp(),
    });

    sendEvent("Invalid", "Game Started", game.roomCode);
  };

  // Pay for a rule and update rule stats in Firebase
  const payForRule = async (name, cost) => {
    my.rulebux -= cost;
    try {
      const ruleStatsRef = doc(db, `stats/invalid/rules/${name}`);
      const now = serverTimestamp();
      await updateDoc(ruleStatsRef, {
        name: name,
        cost: cost,
        lastUsed: now,
        count: increment(1),
      }).catch(async () => {
        // If doc doesn't exist, create it
        await setDoc(ruleStatsRef, {
          name: name,
          cost: cost,
          lastUsed: now,
          count: 1,
        });
      });
    } catch (err) {
      console.error(`Error updating rule stats for ${name}:`, err);
    }
  };

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // FUNCTIONS

  const generateUniqueID = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  /////// BEFORE GAME (game hasn't started yet)
  const watchVideo = () => {
    ui.watchingVideo = true;
    if (game.currentlyInGame) {
      sendEvent("Invalid", "Instruction Video", "Pregame Screen");
    } else {
      sendEvent("Invalid", "Instruction Video", "Title Screen");
    }
    if (ui.musicPlaying) {
      musicLobby.volume(0);
    }
  };

  const stopWatchingVideo = () => {
    ui.watchingVideo = false;
    if (ui.musicPlaying) {
      if (ui.musicHushed) {
        musicLobby.volume(0.05);
      } else {
        musicLobby.volume(0.6);
      }
    }
  };

  const toggleMusicVolume = () => {
    ui.musicHushed = !ui.musicHushed;
    if (ui.musicHushed) {
      musicLobby.volume(0.05);
      musicFinalRound.volume(0.1);
    } else {
      musicLobby.volume(0.6);
      musicFinalRound.volume(0.75);
    }
  };

  /////////// SysAdmin Methods
  const definePossibleChallenges = () => {
    round.possibleChallenges = [];

    // Get list of previously used challenge names from round summaries
    const usedChallengeNames = (game.roundSummary || []).map((summary) => summary.challenge);

    let n = 0;

    // Create some possible challenges, based on some rulesets.
    while (n < settings.default.numberOfPossibleChallenges) {
      let randomChallenge = randomFrom(challenges);

      let appendThisChallenge = true;
      if (randomChallenge.naughty && !game.allowNaughty) {
        // This challenge is too naughty for this game, pick again.
        appendThisChallenge = false;
      } else if (usedChallengeNames.includes(randomChallenge.name)) {
        // This challenge was already used in a previous round, pick again.
        appendThisChallenge = false;
      } else if (round.possibleChallenges.length != []) {
        round.possibleChallenges.forEach(function (c) {
          if (c.id == randomChallenge.id) {
            // This challenge already exists in your list.
            appendThisChallenge = false;
          }
        });
      }

      if (appendThisChallenge) {
        round.possibleChallenges.push(randomChallenge);
        n++;
      }
    }
  };

  const chooseAChallenge = async () => {
    challenges.forEach(function (c) {
      if (c.id == ui.challengeID) {
        round.challenge = c;
      }
    });
    findPossibleRightAnswers();
    findAverageSize();
    findAverageVowelCount();
    countLettersInEachWord();
    startAdminTimer();

    await updateRoomState({
      currentChallenge: round.challenge,
      gamePhase: "choose-rules",
    });

    // Send challenge stat to Firebase
    try {
      const challengeName = round.challenge.name;
      const challengeStatsRef = doc(db, `stats/invalid/challenges/${challengeName}`);
      const challengeStatsSnap = await getDoc(challengeStatsRef);
      await updateDoc(challengeStatsRef, {
        timesChosen: increment(1),
        lastChosen: serverTimestamp(),
      }).catch(async () => {
        await setDoc(challengeStatsRef, {
          name: challengeName,
          timesChosen: 1,
          lastChosen: serverTimestamp(),
        });
      });
    } catch (err) {
      console.error("Error updating challenge stats:", err);
    }

    sendEvent("Invalid", "Challenge Selected", round.challenge.name);
  };

  const chooseRule = async (rule) => {
    if (rule.name == "DROWSSAP") {
      // DROWSSAP rule: password must be entered backwards
      await payForRule(rule.name, 3);
      let r = {
        type: "DROWSSAP",
        message: "Your password must be entered backwards. PASSWORD = DROWSSAP",
      };
      round.rules.push(r);
      await updateRoomState({
        currentRules: round.rules,
      });
    } else if (rule.name == "Flying Pig") {
      // Special process for summoning a flying pig.
      await payForRule(rule.name, rule.cost);
      round.flyingPig.active = true;
      let r = {
        type: "Flying Pig",
        message: "Look at the flying pig.",
      };
      round.rules.push(r);
      await updateRoomState({
        currentRules: round.rules,
        currentShibboleth: round.shibboleth,
        flyingPigActive: true,
      });
    } else if (rule.name == "Peek At Answers") {
      let shuffledAnswers = shuffle(round.challenge.possible);
      let answerHTML = "";
      let i = 0;
      while (i < 5) {
        answerHTML += "<li>" + shuffledAnswers[i] + "</li>";
        i++;
      }

      toast(
        {
          component: MyToast,
          props: {
            title: `5 Random ${round.challenge.name}`,
            message: `<ul>${answerHTML}</ul>`,
          },
        },
        {
          position: POSITION.TOP_RIGHT,
          type: "info",
          timeout: 50000,
        },
      );

      await payForRule(rule.name, rule.cost);

      let r = {
        type: "Peek At Answers",
        message: my.name + " peeked at the answers",
        inputValue: "",
        inputValueTwo: "",
      };
      round.rules.push(r);
      await updateRoomState({
        currentRules: round.rules,
        currentShibboleth: round.shibboleth,
      });
    } else if (rule.name == "Set A Maximum" || rule.name == "Set A Minimum" || rule.name == "Limit Vowels") {
      // For situations where you DON'T have a second rule input.
      let r = {
        type: rule.name,
        message: "",
        inputValue: "",
        inputValueTwo: "",
      };

      if (rule.name == "Set A Maximum") {
        r.inputValue = round.averageSize + round.maxOffset;
        r.message = randomFrom(rulePhrasings.max);
      } else if (rule.name == "Set A Minimum") {
        r.inputValue = round.averageSize - round.minOffset;
        r.message = randomFrom(rulePhrasings.min);
      } else if (rule.name == "Limit Vowels") {
        r.inputValue = round.averageVowels + round.vowelOffset;
        r.message = randomFrom(rulePhrasings.vowels);
      }

      r.message = r.message.replace("[SIZE]", r.inputValue);
      r.message = r.message.replace("[SIZE+1]", r.inputValue + 1);
      r.message = r.message.replace("[SIZE-1]", r.inputValue - 1);

      await payForRule(rule.name, rule.cost);
      round.rules.push(r);
      findPossibleRightAnswers();

      await updateRoomState({
        currentRules: round.rules,
        currentShibboleth: round.shibboleth,
      });
    } else {
      ui.currentRule.name = rule.name;
      ui.currentRule.cost = rule.cost;
      ui.currentRule.editing = true;
    }
  };

  const isRuleButtonDisabled = (ruleName, ruleCost, ruleUnique) => {
    if (my.rulebux < ruleCost) {
      // Too expensive
      return true;
    } else if (ui.currentRule.editing) {
      // You're in edit mode.
      return true;
    } else if (ruleUnique && round.rules.some((rule) => rule.type === ruleName)) {
      // this is a unique rule and you've already used it.
      return true;
    } else {
      return false;
    }
  };

  const saveRule = async (rule) => {
    let r = {
      type: "",
      message: "",
      inputValue: "",
      inputValueTwo: null,
    };
    if (rule.name == "Ban A Letter") {
      r.type = rule.name;
      r.inputValue = ui.currentRule.inputValue.toUpperCase();
      r.message = "You may not use the letter " + r.inputValue;
      try {
        const bannedLetterRef = doc(db, `stats/invalid/letters/${r.inputValue}`);
        await updateDoc(bannedLetterRef, {
          timesBanned: increment(1),
        }).catch(async () => {
          await setDoc(bannedLetterRef, {
            letter: r.inputValue,
            timesBanned: 1,
          });
        });
      } catch (err) {
        console.error(`Error updating banned letter stats for ${r.inputValue}:`, err);
      }
    } else if (rule.name == "Demand A Letter") {
      r.type = rule.name;
      r.inputValue = ui.currentRule.inputValue.toUpperCase();
      r.message = "You must use the letter " + r.inputValue;
      try {
        const demandLetterRef = doc(db, `stats/invalid/letters/${r.inputValue}`);
        await updateDoc(demandLetterRef, {
          timesDemanded: increment(1),
        }).catch(async () => {
          await setDoc(demandLetterRef, {
            letter: r.inputValue,
            timesDemanded: 1,
          });
        });
      } catch (err) {
        console.error(`Error updating demand letter stats for ${r.inputValue}:`, err);
      }
    } else if (rule.name == "Shibboleth") {
      r.type = rule.name;
      r.inputValue = ui.currentRule.inputValue;
      r.message = "Before entering a password, you must type " + r.inputValue;
      round.shibboleth = r.inputValue;
      try {
        const shibbolethRef = doc(db, `/stats/invalid/rules/Shibboleth/shibboleths/${r.inputValue}`);
        await updateDoc(shibbolethRef, {
          count: increment(1),
        }).catch(async () => {
          await setDoc(shibbolethRef, {
            name: r.inputValue,
            count: 1,
          });
        });
      } catch (err) {
        console.error(`Error updating demand letter stats for ${r.inputValue}:`, err);
      }
    } else if (rule.name == "Set A Maximum") {
      r.type = rule.name;
      r.inputValue = round.averageSize + round.maxOffset;
      r.message = ui.currentRule.inputValue;
    } else if (rule.name == "Set A Minimum") {
      r.type = rule.name;
      r.inputValue = round.averageSize - round.minOffset;
      r.message = ui.currentRule.inputValue;
    } else if (rule.name == "Limit Vowels") {
      r.type = rule.name;
      r.inputValue = round.averageVowels + round.vowelOffset;
      r.message = ui.currentRule.inputValue;
    } else if (rule.name == "Ban A Combo") {
      r.type = rule.name;
      r.inputValue = ui.currentRule.inputValue.toUpperCase();
      r.inputValueTwo = ui.currentRule.inputValueTwo.toUpperCase();
      if (r.inputValue == r.inputValueTwo) {
        r.message = "You may only use the letter " + r.inputValue + " once";
      } else {
        r.message = "Your password cannot contain both " + r.inputValue + " and " + r.inputValueTwo + " (simultanously)";
      }
    }

    // Add it to the rule list.
    round.rules.push(r);
    // Recalculate Possible Right Answers.
    findPossibleRightAnswers();

    // if possibleRightAnswers is high enough, save the rule.
    if (round.possibleAnswerCount >= game.players.length) {
      await payForRule(rule.name, rule.cost);
      await updateRoomState({
        currentRules: round.rules,
        currentShibboleth: round.shibboleth,
      });
    } else {
      toast(
        {
          component: MyToast,
          props: {
            title: `Error`,
            message: `Sorry, this rule would make the game impossible. Rule undone.`,
          },
        },
        {
          type: "error",
        },
      );
      round.rules.pop();
      findPossibleRightAnswers();
    }

    // Clear out current rule.
    clearCurrentRule();
  };

  const clearCurrentRule = () => {
    ui.currentRule.name = "";
    ui.currentRule.inputValue = "";
    ui.currentRule.inputValueTwo = "";
    ui.currentRule.cost = 0;
    ui.currentRule.editing = false;
  };

  const addBug = async () => {
    ui.addBugErrors = [];
    const bug = ui.addBug.toUpperCase();
    // Check for duplicate
    const isDuplicate = round.bugs.some((b) => b.toUpperCase() === bug);
    // Check for validity
    const isValid = round.challenge.possible.some((p) => p.toUpperCase() === bug);

    // Toast message variants for invalid and duplicate bugs
    const invalidBugMessages = [
      `<p><code>{BUG}</code> would not have been a valid password.</p>
        <p>Our compliance robots have flagged this entry for further review, which will be ignored by the entire company, but you'll receive a number of emails about it.</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p>
        <p>Please consult your company handbook, your supervisor, or the nearest sentient office plant for advice.</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p>
        <p>The system has notified HR, IT, and your 5th grade teacher. Please review the challenge requirements, try again, and remember: every mistake is logged for posterity.</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p>
        <p>Double-check your ruleset, your spelling, and your life choices.</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p>
        <p>Refer to the official documentation, or at least tell your supervisor that you did</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p>
        <p>The compliance department has asked that you provide valid passwords. For compliance, please use an approved password, or invent a new department to handle this situation.</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p>
        <p>Check your spelling, your company rules, and your horoscope.</p>`,
      `<p><code>{BUG}</code> is invalid for this round.</p>
        <p>Hey, that's the name of the game! That's fun! :)</p>`,
      `<p><code>{BUG}</code> is invalid for this round.</p>
        <p><code>{BUG}</code> has been flagged as "creative" but not "correct." We at BigCorp discourage creativity.</p>`,
    ];

    const duplicateBugMessages = [
      `<p><code>{BUG}</code> has already generated a bug for this round.</p>
        <p>BigCorp appreciates your continued vigilance. For compliance purposes, your duplicate bug will still be logged and you will be charged accordingly. Please consult the official bug tracker for further updates, or just move on with your life.</p>`,
      `<p><code>{BUG}</code> is a duplicate bug entry.</p>
        <p>You will still be charged for compliance, but not for originality.</p>`,
      `<p><code>{BUG}</code> was already submitted for this round.</p>
        <p>BigCorp thanks you for your attention to detail. Please check the bug tracker for updates, or just pretend this never happened.</p>`,
      `<p><code>{BUG}</code> is a repeat entry.</p>
        <p>Your duplicate will be processed, but not celebrated.</p>`,
      `<p><code>{BUG}</code> is already in the system.</p>
        <p>No need to report it again, but your duplicate will be processed, charged, and possibly used as an example in next week's training video.</p>`,
      `<p><code>{BUG}</code> is already famous in our system. Further reports will be archived in the "Hall of Redundancy Hall."</p>`,
      `<p>You already added <code>{BUG}</code>, but your enthusiasm is noted. Please consult the bug tracker for updates, or just go get a snack.</p>`,
    ];

    // Show invalid toast if not valid
    if (!isValid && !isDuplicate) {
      const msg = invalidBugMessages[Math.floor(Math.random() * invalidBugMessages.length)].replace("{BUG}", bug);
      toast(
        {
          component: MyToast,
          props: {
            message: msg,
          },
        },
        {
          position: POSITION.BOTTOM_RIGHT,
          type: "warning",
          timeout: 6000,
        },
      );
    }

    // Show duplicate toast if duplicate
    if (isDuplicate) {
      const msg = duplicateBugMessages[Math.floor(Math.random() * duplicateBugMessages.length)].replace("{BUG}", bug);
      toast(
        {
          component: MyToast,
          props: {
            message: msg,
          },
        },
        {
          position: POSITION.BOTTOM_RIGHT,
          type: "warning",
          timeout: 6000,
        },
      );
    }

    // Charge for adding the bug.
    if (round.bugs && round.bugs.length > 0) {
      my.rulebux -= 1;
    }

    ui.addBug = "";
    round.bugs.push(bug);
    await updateRoomState({
      currentBugs: round.bugs,
    });

    // Log bug creation in Firestore
    try {
      const bugRef = doc(db, `stats/invalid/bugs/${bug}`);
      const bugSnap = await getDoc(bugRef);
      if (bugSnap.exists()) {
        await updateDoc(bugRef, {
          timesCreated: increment(1),
          lastCreated: serverTimestamp(),
        });
      } else {
        await setDoc(bugRef, {
          name: bug,
          timesCreated: 1,
          timesCrashed: 0,
          lastCreated: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error(`Error logging bug creation for ${bug}:`, err);
    }

    sendEvent("Invalid", "Add Bug", bug);
  };

  const onboardEmployees = async () => {
    resetAdminTimer();

    // Update Firestore to start the guessing phase
    await updateRoomState({
      gamePhase: "create-password",
      sysAdminIndex: my.playerIndex,
    });
  };

  const finishRules = async () => {
    round.phase = "add bugs";
    // Don't update Firestore phase yet - keep it as "choose-rules"
    // until we actually onboard employees
  };

  /////////// Timers
  const startAdminTimer = () => {
    round.adminTimeLeft = defaults.adminTimeLeft;
    round.adminTimer = setInterval(() => {
      round.adminTimeLeft -= 0.05;
      if (round.adminTimeLeft <= 0) {
        onboardEmployees();
      }
    }, 50);
  };

  const resetAdminTimer = () => {
    clearInterval(round.adminTimer);
    round.adminTimer = undefined;
    round.adminTimeLeft = defaults.adminTimeLeft;
  };

  // Timer logic for round
  const roundStartTimer = () => {
    round.elapsedTime = 0;
    round.roundTimer = setInterval(() => {
      round.elapsedTime += 1;
      if (round.elapsedTime >= settings.timer.employeeMaxTime - settings.timer.hurryTime && round.hurryTimer == undefined) {
        startHurryTimer();
      }
    }, 1000);

    // Also, get the Flying Pig talking if he should be....
    if (round.flyingPig.active && my.role == "employee") {
      if (round.phase == "create password") {
        round.flyingPig.message = randomFrom(flyingPigLines.guessing);
      }
      round.flyingPig.timer = setInterval(() => {
        if (!round.flyingPig.active) {
          clearInterval(round.flyingPig.timer);
          round.flyingPig.timer = undefined;
        } else {
          if (round.phase == "create password") {
            round.flyingPig.message = randomFrom(flyingPigLines.guessing);
            soundOink.play();
          }
        }
      }, 6501);
    }
  };

  const resetRoundTimer = () => {
    clearInterval(round.roundTimer);
    round.roundTimer = undefined;
  };

  const startHurryTimer = () => {
    round.hurryTimer = setInterval(() => {
      round.hurryTime -= 0.1;
      if (round.hurryTime <= 0) {
        endTheGuessingRound();
      }
    }, 100);
  };

  const resetHurryTimer = () => {
    clearInterval(round.hurryTimer);
    round.hurryTimer = undefined;
    round.hurryTime = defaults.hurryTime;
  };

  const startCountdownToFinalRound = () => {
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

  const startFinalRoundCounter = () => {
    round.finalTimeLeft = settings.timer.finalRound;
    round.roundTimer = setInterval(() => {
      round.finalTimeLeft -= 1;
      if (round.finalTimeLeft <= 0) {
        setGameOver();
      }
    }, 1001);
  };

  const summonTheFlyingPig = () => {
    round.flyingPig.active = true;
    if (my.role == "employee") {
      round.flyingPig.message = randomFrom(flyingPigLines.intro);
    }
  };

  const killThePig = () => {
    round.flyingPig.active = false;
    clearInterval(round.flyingPig.timer);
    round.flyingPig.timer = undefined;
  };

  const endTheGuessingRound = async () => {
    resetRoundTimer();
    resetHurryTimer();
    // Give a small delay to ensure final score update propagates before ending round
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Update Firestore to indicate round is over
    await updateRoomState({
      isRoundOver: true,
    });
  };

  const tryToFailThis = (attempt) => {
    attempt = attempt.toUpperCase();
    let attemptFailed = false;
    let attemptFailedReasons = [];

    round.rules.forEach(function (r) {
      if (r.type == "Ban A Letter") {
        if (attempt.includes(r.inputValue)) {
          attemptFailed = true;
          attemptFailedReasons.push("Password cannot contain " + r.inputValue);
        }
      }
      if (r.type == "Demand A Letter") {
        if (!attempt.includes(r.inputValue)) {
          attemptFailed = true;
          attemptFailedReasons.push("Password must contain " + r.inputValue);
        }
      }
      if (r.type == "Set A Maximum") {
        if (attempt.length > r.inputValue) {
          attemptFailed = true;
          attemptFailedReasons.push("Password is too long");
        }
      }
      if (r.type == "Set A Minimum") {
        if (attempt.length < r.inputValue) {
          attemptFailed = true;
          attemptFailedReasons.push("Password is too short");
        }
      }
      if (r.type == "Limit Vowels") {
        // BUG - this line doesn't work.
        if (countVowels(attempt) > r.inputValue) {
          attemptFailed = true;
          attemptFailedReasons.push("Password has too many vowels");
        }
      }
      if (r.type == "Ban A Combo") {
        if (r.inputValue == r.inputValueTwo) {
          if (attempt.replace(/[^a]/g, "").length > 1) {
            attemptFailed = true;
            attemptFailedReasons.push("Password can only contain one " + r.inputValue);
          }
        } else if (r.inputValue != r.inputValueTwo) {
          if (attempt.includes(r.inputValue) && attempt.includes(r.inputValueTwo)) {
            attemptFailed = true;
            attemptFailedReasons.push("Password cannot contain both the letters " + r.inputValue + " and " + r.inputValueTwo);
          }
        }
      }
    });

    if (!attemptFailed) {
      return false;
    } else {
      return {
        failed: true,
        reasons: attemptFailedReasons,
      };
    }
  };

  const tryToCrashWith = (attempt) => {
    let systemCrashed = false;

    round.bugs.forEach(function (bug) {
      if (bug == attempt) {
        systemCrashed = true;
      }
    });
    return systemCrashed;
  };

  const tryToFindDuplicatePassword = (attempt) => {
    attempt = attempt.toUpperCase();

    let foundDupe = false;
    game.allEmployeePasswords.forEach(function (empPW) {
      if (attempt.replace(/[^0-9a-z]/gi, "") == empPW.pw.toUpperCase().replace(/[^0-9a-z]/gi, "")) {
        foundDupe = true;
      }
    });
    return foundDupe;
  };

  const tryToFind = (attempt) => {
    attempt = attempt.toUpperCase();

    let foundOne = false;
    round.challenge.possible.forEach(function (possibility) {
      if (attempt.replace(/[^0-9a-z]/gi, "") == possibility.toUpperCase().replace(/[^0-9a-z]/gi, "")) {
        foundOne = true;
      }
    });
    return foundOne;
  };

  const tryThisPassword = async (attempt) => {
    attempt = attempt.toUpperCase();
    ui.passwordAttemptErrors = [];

    // Check for DROWSSAP rule and reverse attempt if active
    const hasDrowssapRule = round.rules.some((r) => r.type === "DROWSSAP");
    if (hasDrowssapRule) {
      attempt = attempt.split("").reverse().join("");
    }

    const crashCheck = tryToCrashWith(attempt);
    const failCheck = tryToFailThis(attempt);
    const duplicateCheck = tryToFindDuplicatePassword(attempt);
    const matchCheck = tryToFind(attempt);

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
      let errorMessage = round.challenge.failedMessage.replace("[PASS]", attempt);
      ui.passwordInputError = true;
      ui.passwordAttemptErrors.push(errorMessage);
    }

    if (matchCheck && !failCheck && !crashCheck && !duplicateCheck) {
      correctAnswer = true;
    }

    // Deal with the results of the attempt.
    my.passwordAttempts++;
    ui.passwordAttempt = "";
    ui.shibboleth = "";

    // Create attempt record
    const attemptRecord = {
      playerIndex: my.playerIndex,
      pwAttempt: attempt,
      attemptCount: my.passwordAttempts,
      timestamp: new Date(), // Use regular Date instead of serverTimestamp() for arrays
    };

    if (crashCheck) {
      attemptRecord.result = "crash";
      attemptRecord.challengeName = round.challenge.name;

      // Award points to the SysAdmin for causing a crash BEFORE updating score in Firestore
      if (round.sysAdminIndex >= 0 && game.players[round.sysAdminIndex]) {
        game.players[round.sysAdminIndex].score += settings.points.forServerCrash;
      }

      // Update crash state in Firestore
      const newCrashSummary = [
        ...(game.crashSummary || []),
        {
          playerIndex: my.playerIndex,
          sysAdminIndex: round.sysAdminIndex,
          word: attempt,
        },
      ];

      // Update SysAdmin score in Firestore (now includes timer points + crash points)
      if (round.sysAdminIndex >= 0 && game.players[round.sysAdminIndex]) {
        const adminPlayer = game.players[round.sysAdminIndex];
        const adminRef = doc(db, "rooms", game.roomCode, "players", adminPlayer.playerID);
        await updateDoc(adminRef, {
          score: adminPlayer.score,
        });
      }

      await updateRoomState({
        gamePhase: "crashed",
        crashedPlayer: my.playerID,
        crashedWord: attempt,
        crashSummary: newCrashSummary,
        attempts: [...(round.attempts || []), attemptRecord],
      });

      my.crashesCaused += 1;
      // Log bug crash in Firestore
      try {
        const bugCrashRef = doc(db, `stats/invalid/bugs/${attempt}`);
        const bugCrashSnap = await getDoc(bugCrashRef);
        if (bugCrashSnap.exists()) {
          await updateDoc(bugCrashRef, {
            timesCrashed: increment(1),
            lastCrashed: serverTimestamp(),
          });
        } else {
          await setDoc(bugCrashRef, {
            name: attempt,
            timesCrashed: 1,
            lastCrashed: serverTimestamp(),
            timesCreated: 0,
          });
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

      // Update attempts in Firestore for failed password
      const newAttempts = [...(round.attempts || []), attemptRecord];

      try {
        await updateRoomState({
          attempts: newAttempts,
        });
      } catch (error) {
        console.error("Error in updateRoomState:", error);
      }
    }
  };

  const findPossibleRightAnswers = () => {
    let possibleAnswerCount = 0;
    round.challenge.possible.forEach(function (possibility) {
      if (tryToFailThis(possibility) == false) {
        possibleAnswerCount++;
      }
    });

    round.possibleAnswerCount = possibleAnswerCount;
  };

  const findAverageSize = () => {
    const possibilities = round.challenge.possible;

    var total = 0;
    for (var i = 0; i < possibilities.length; i++) {
      total += possibilities[i].length;
    }
    var avg = total / possibilities.length;

    round.averageSize = Math.round(avg);
  };

  const findAverageVowelCount = () => {
    const possibilities = round.challenge.possible;

    var total = 0;
    for (var i = 0; i < possibilities.length; i++) {
      // Search text with Regex and store all matching instances
      let matchingInstances = possibilities[i].match(/[aeiou]/gi);
      if (matchingInstances) {
        total += matchingInstances.length;
      }
    }
    var avg = total / possibilities.length;

    round.averageVowels = Math.round(avg);
    //round.averageVowels = avg.toFixed(1);
  };

  const countLettersInEachWord = () => {
    const allLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const possibilities = round.challenge.possible;
    let letter = "";
    let count = 0;
    let letterReport = [];

    // For every letter in the alphabet...
    allLetters.forEach(function (l, lIndex) {
      letter = l;
      count = 0;

      // Add +1 if the possibility contains that letter.
      possibilities.forEach(function (p, pIndex) {
        if (p.toUpperCase().includes(l)) {
          count++;
        }
      });

      // And then add it to a report.
      let r = {
        letter: l,
        count: count,
      };
      letterReport.push(r);
    });

    round.letterCounts = letterReport;
    round.demandableLetters = [];

    round.letterCounts.forEach(function (letter) {
      if (letter.count >= game.players.length + 2) {
        round.demandableLetters.push(letter.letter);
      }
    });
  };

  const passwordSuccess = async (attempt) => {
    // YOU GOT IT!
    // Let's give you some points
    my.score += settings.points.forGoodPassword;

    if (game.allEmployeePasswords.length < 1 && game.players.length > 2) {
      my.score += settings.points.forFirstPassword;
    }

    // Let's change the UI to reflect you having won.
    ui.passwordSucceeded = true;

    // Update player score in Firestore
    const playerRef = doc(db, "rooms", game.roomCode, "players", my.playerID);
    await updateDoc(playerRef, {
      score: my.score,
      passwordSuccess: true,
    });

    // Update game state
    const newEmployeePasswords = [
      ...(game.allEmployeePasswords || []),
      {
        pw: attempt,
        name: my.name,
        playerIndex: my.playerIndex,
        playerID: my.playerID,
        claimed: false,
      },
    ];

    const attemptRecord = {
      playerIndex: my.playerIndex,
      pwAttempt: attempt,
      attemptCount: my.passwordAttempts,
      playerScore: my.score,
      challengeName: round.challenge.name,
      result: "success",
      timestamp: new Date(),
    };

    // Check if all employees have successfully guessed BEFORE updating Firestore
    // Use sysAdminIndex to determine employee count instead of relying on role property
    // since roles might not be synced at this exact moment
    const totalPlayers = game.players.length;
    const sysAdminCount = 1; // There's always exactly one SysAdmin
    const employeeCount = totalPlayers - sysAdminCount;

    // Count successful passwords in the current round only
    // Note: We count from the current round attempts plus the new success attempt
    const updatedAttempts = [...(round.attempts || []), attemptRecord];
    const successfulPasswordsThisRound = updatedAttempts.filter((attempt) => attempt.result === "success").length;

    const shouldEndRound = employeeCount === successfulPasswordsThisRound;

    await updateRoomState({
      allEmployeePasswords: newEmployeePasswords,
      attempts: [...(round.attempts || []), attemptRecord],
    });

    try {
      const passwordStatsRef = doc(db, `stats/invalid/passwords/${attempt}`);
      await updateDoc(passwordStatsRef, {
        timesCreated: increment(1),
        lastCreated: serverTimestamp(),
      }).catch(async () => {
        await setDoc(passwordStatsRef, {
          name: attempt,
          timesCreated: 1,
          lastCreated: serverTimestamp(),
        });
      });
    } catch (err) {
      console.error("Error updating password attempt stats:", err);
    }

    if (shouldEndRound) {
      // Stop the timer immediately
      resetRoundTimer();
      resetHurryTimer();
      // End the round
      await updateRoomState({
        isRoundOver: true,
      });
    }

    if (round.flyingPig.active) {
      round.flyingPig.message = randomFrom(flyingPigLines.afterCorrect);
      clearInterval(round.flyingPig.timer);
      round.flyingPig.timer = undefined;
      soundOink.play();
    }
  };

  const startNextRoundClicked = async () => {
    var summary = {
      challenge: round.challenge?.name || "Unknown Challenge",
      sysAdmin: my.name,
      rules: round.rules || [],
      bugs: round.bugs || [],
      attempts: round.attempts || [],
      listSource: round.challenge?.source || "Unknown Source",
      possibleAnswers: round.possibleAnswerCount || 0,
    };

    // Update round summary and start new round
    const newRoundSummary = [...(game.roundSummary || []), summary];

    // Check if it's time for final round
    const nextRoundNumber = round.number + 1;
    if (nextRoundNumber > game.maxRounds) {
      await updateRoomState({
        roundSummary: newRoundSummary,
        gamePhase: "final-round",
      });
    } else {
      // Find next SysAdmin
      let nextSysAdminIndex = round.sysAdminIndex + 1;
      if (nextSysAdminIndex >= game.players.length) {
        nextSysAdminIndex = 0;
      }

      await updateRoomState({
        roundSummary: newRoundSummary,
        roundNumber: nextRoundNumber,
        sysAdminIndex: nextSysAdminIndex,
        gamePhase: "choose-rules",
        // Reset round state
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

  const onPaste = (evt) => {
    evt.preventDefault();

    my.score -= 10;
    game.players[my.playerIndex].score -= 10;

    toast(
      {
        component: MyToast,
        props: {
          title: `Pasting is disabled`,
          message: `<p>BigCorp prevents any employee from pasting in passwords, for... uhhhhh... security reasons.</p><p>You have been docked 10 points for breaking this perfectly reasonable rule.</p>`,
        },
      },
      {
        position: POSITION.BOTTOM_RIGHT,
        type: "error",
        timeout: 8000,
        icon: false,
      },
    );

    return false;
  };

  const tryToCrackWith = async (attempt) => {
    attempt = attempt.toUpperCase();
    document.getElementById("PasswordAttempt").focus();

    ui.passwordAttempt = "";
    ui.passwordSuccessMessage = "";
    ui.passwordAttemptErrors = [];
    let pwMatch = false;
    let pwMatchErrorMessage = null;
    let pwPlayerIndex = -1;
    let passwordClaimed = false;
    let matchIndex = -1;

    game.allEmployeePasswords.forEach(function (p, i) {
      if (p.pw.replace(/[^0-9a-z]/gi, "") == attempt.replace(/[^0-9a-z]/gi, "")) {
        pwMatch = true;
        // First check if password is already claimed
        if (p.claimed) {
          passwordClaimed = true;
          // Check if it was claimed by the current player
          if (p.claimed === my.name || p.playerIndex === my.playerIndex) {
            soundNo.play();
            pwMatchErrorMessage = "This password was already cracked by you.";
          } else {
            soundTooSlow.play();
            pwMatchErrorMessage = "This password was already cracked by " + p.claimed;
          }
        } else if (p.name == my.name || p.playerIndex == my.playerIndex) {
          // Password is not claimed and belongs to current player - process as self-hack
          soundYouIdiot.play();
          pwMatchErrorMessage = "You just hacked into your own account. Did you mean to do that?";
          game.players[my.playerIndex].score += settings.points.forCrackingOwnPassword;
          game.allEmployeePasswords[i].claimed = my.name;

          // Update Firestore for self-hack
          const crackSummary = {
            pw: attempt,
            attackerIndex: my.playerIndex,
            victimIndex: my.playerIndex,
          };

          updateCrackResults(crackSummary);

          if (computedUnclaimedPasswords.value < 1) {
            setGameOver();
          }
        } else {
          // Password is not claimed and belongs to someone else - ready to crack
          pwPlayerIndex = p.playerIndex;
          matchIndex = i;
        }
      }
    });

    if (pwMatchErrorMessage) {
      ui.passwordAttemptErrors.push(pwMatchErrorMessage);
    } else if (!pwMatch) {
      soundNo.play();
      ui.passwordAttemptErrors.push("There is no employee with the password " + attempt);
    } else if (pwMatch && pwPlayerIndex != -1) {
      soundCracked.play();
      ui.passwordSuccessMessage = "The password " + attempt + " belongs to " + game.players[pwPlayerIndex].name;
      game.players[my.playerIndex].score += settings.points.forCrackingPassword;
      game.players[pwPlayerIndex].score += settings.points.forHavingPasswordCracked;

      game.allEmployeePasswords[matchIndex].claimed = my.name;

      const crackSummary = {
        pw: attempt,
        attackerIndex: my.playerIndex,
        victimIndex: pwPlayerIndex,
      };

      await updateCrackResults(crackSummary);
      sendEvent("Invalid", "Password Cracked", attempt);

      if (computedUnclaimedPasswords.value < 1) {
        setGameOver();
      }
    }
    document.getElementById("PasswordAttempt").focus();
  };

  // Helper function to update crack results in Firestore
  async function updateCrackResults(crackSummary) {
    // Update player scores
    const attackerRef = doc(db, "rooms", game.roomCode, "players", game.players[crackSummary.attackerIndex].playerID);
    const victimRef = doc(db, "rooms", game.roomCode, "players", game.players[crackSummary.victimIndex].playerID);

    await updateDoc(attackerRef, {
      score: game.players[crackSummary.attackerIndex].score,
    });

    // Update stats to mark this password as cracked
    const passwordStatsRef = doc(db, `stats/invalid/passwords/${crackSummary.pw}`);
    await updateDoc(passwordStatsRef, {
      timesCracked: increment(1),
      lastCracked: serverTimestamp(),
    });

    if (crackSummary.attackerIndex !== crackSummary.victimIndex) {
      await updateDoc(victimRef, {
        score: game.players[crackSummary.victimIndex].score,
      });
    }

    // Update game state
    await updateRoomState({
      allEmployeePasswords: game.allEmployeePasswords,
      crackSummary: [...(game.crackSummary || []), crackSummary],
    });
  }

  const setGameOver = async () => {
    musicFinalRound.stop();
    soundFinalRoundOver.play();
    clearInterval(round.roundTimer);
    round.roundTimer = undefined;
    round.phase = "GAME OVER";

    // Update player attempts in Firestore
    const playerRef = doc(db, "rooms", game.roomCode, "players", my.playerID);
    await updateDoc(playerRef, {
      passwordAttempts: my.passwordAttempts,
    });

    // Only host logs gamesFinished and lastGameFinished
    if (computedAmIHost.value) {
      await updateDoc(statsRef, {
        gamesFinished: increment(1),
        lastGameFinished: serverTimestamp(),
      });

      // Update gamesFinished for this player count
      const docId = `${game.players.length} players`;
      const gameSizeRef = doc(db, `stats/invalid/gameSizes/${docId}`);
      await updateDoc(gameSizeRef, {
        gamesFinished: increment(1),
        lastGameFinished: serverTimestamp(),
      });
    }
    // Set game over state
    await updateRoomState({
      gamePhase: "game-over",
      isGameOver: true,
    });
  };

  const computedAmIHost = computed(() => {
    const roomCreatorExists = game.players.some((player) => player.playerID === game.roomCreatorID);

    if (roomCreatorExists) {
      return my.playerID === game.roomCreatorID;
    } else {
      // Check if my player is the first player in the players array or if I'm marked as host
      return (
        game.players.length > 0 && (game.players[0].playerID === my.playerID || game.players.some((player) => player.playerID === my.playerID && player.isHost))
      );
    }
  });

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // COMPUTED PROPERTIES

  const computedSysAdminName = computed(() => {
    // Debug logging to track down the emoji issue
    console.log("computedSysAdminName debug:", {
      playersCount: game.players?.length || 0,
      sysAdminIndex: round.sysAdminIndex,
      players: game.players?.map((p) => ({ name: p.name, role: p.role, playerID: p.playerID })) || [],
    });

    if (game.players && game.players.length > 0 && round.sysAdminIndex > -1) {
      const adminPlayer = game.players[round.sysAdminIndex];
      console.log("adminPlayer at index", round.sysAdminIndex, ":", adminPlayer);

      if (adminPlayer && adminPlayer.name) {
        console.log("Returning admin name:", adminPlayer.name);
        return adminPlayer.name;
      }
    }

    // Fallback: find any player with SysAdmin role
    if (game.players && game.players.length > 0) {
      const adminPlayer = game.players.find((player) => player.role === "SysAdmin");
      console.log("Fallback admin player:", adminPlayer);

      if (adminPlayer && adminPlayer.name) {
        console.log("Returning fallback admin name:", adminPlayer.name);
        return adminPlayer.name;
      }
    }

    console.log("No admin found, returning default");
    return "System Administrator";
  });
  const computedSysAdminIndex = computed(() => {
    return round.sysAdminIndex;
  });

  const hasEmojiInName = computed(() => {
    if (!ui.nameInput) return false;
    return /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
      ui.nameInput,
    );
  });

  const computedShibbolethRequired = computed(() => {
    if (round.shibboleth && ui.shibboleth.toUpperCase() != round.shibboleth.toUpperCase()) {
      return true;
    } else {
      return false;
    }
  });
  const computedUnclaimedPasswords = computed(() => {
    if (game.allEmployeePasswords.length < 1) {
      return 0;
    } else {
      let n = 0;
      game.allEmployeePasswords.forEach(function (p) {
        if (!p.claimed) {
          n++;
        }
      });
      return n;
    }
  });
  const computedUncrackedPasswords = computed(() => {
    if (!game || !Array.isArray(game.allEmployeePasswords)) {
      return {
        array: [],
        count: 0,
      };
    }

    const uncracked = game.allEmployeePasswords.filter((password) => !password.claimed);
    const count = uncracked.length;

    return {
      array: uncracked,
      count: count,
    };
  });
  const computedPlayersByScore = computed(() => {
    const computedPlayers = [...game.players];

    function compare(a, b) {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    }

    return computedPlayers.sort(compare);
  });
  const computedCheevos = computed(() => {
    // TODO: This entire setup sucks balls.
    // Come up with a better way to hand out cheevos.
    let playerTrophyStats = [];
    game.players.forEach((player) =>
      playerTrophyStats.push({
        name: player.name,
        cracks: 0,
        cracked: 0,
        selfPwn: 0,
        passwordsCreated: 0,
        crashesCaused: 0,
        passwordAttempts: 0,
      }),
    );

    // Let's count the cracks/cracked/selfPwn numbers....
    game.crackSummary.forEach((crack, cIndex) => {
      playerTrophyStats[crack.attackerIndex].cracks += 1;
      playerTrophyStats[crack.victimIndex].cracked += 1;
      if (crack.attackerIndex == crack.victimIndex) {
        playerTrophyStats[crack.attackerIndex].selfPwn += 1;
      }
    });

    // Let's count the passwords created...
    game.allEmployeePasswords.forEach((pw, pwIndex) => {
      playerTrophyStats[pw.playerIndex].passwordsCreated += 1;
    });

    // Let's count the crashes
    game.crashSummary.forEach((crash, crashIndex) => {
      playerTrophyStats[crash.playerIndex].crashesCaused += 1;
    });

    // Let's count the password attempts
    game.players.forEach((player, playerIndex) => {
      playerTrophyStats[playerIndex].passwordAttempts = player.passwordAttempts;
    });

    //Find the best cracker.
    let bestCrackersList = [...playerTrophyStats].sort((a, b) => (a.cracks <= b.cracks ? 1 : -1));
    let bestCracker = null;
    if (bestCrackersList && bestCrackersList[0].cracks > 0) {
      bestCracker = { ...bestCrackersList[0] }; // Create a copy to avoid mutating original
      if (bestCrackersList.length > 1 && bestCrackersList[0].cracks == bestCrackersList[1].cracks) {
        bestCracker.name = "TIE";
      }
    }

    //Find the most cracked.
    let mostCrackedList = [...playerTrophyStats].sort((a, b) => (a.cracked <= b.cracked ? 1 : -1));
    let mostCracked = null;
    if (mostCrackedList && mostCrackedList[0].cracked > 0) {
      mostCracked = { ...mostCrackedList[0] }; // Create a copy to avoid mutating original
      if (mostCrackedList.length > 1 && mostCrackedList[0].cracked == mostCrackedList[1].cracked) {
        mostCracked.name = "TIE";
      }
    }

    //Find the most selfpwned.
    let mostSelfPwnsList = [...playerTrophyStats].sort((a, b) => (a.selfPwn <= b.selfPwn ? 1 : -1));
    let mostSelfPwns = null;
    if (mostSelfPwnsList && mostSelfPwnsList[0].selfPwn > 0) {
      mostSelfPwns = { ...mostSelfPwnsList[0] }; // Create a copy to avoid mutating original
      if (mostSelfPwnsList.length > 1 && mostSelfPwnsList[0].selfPwn == mostSelfPwnsList[1].selfPwn) {
        mostSelfPwns.name = "TIE";
      }
    }

    //Find the most crashhappy.
    let mostCrashesList = [...playerTrophyStats].sort((a, b) => (a.crashesCaused <= b.crashesCaused ? 1 : -1));
    let mostCrashes = null;
    if (mostCrashesList && mostCrashesList[0].crashesCaused > 0) {
      mostCrashes = { ...mostCrashesList[0] }; // Create a copy to avoid mutating original
      if (mostCrashesList.length > 1 && mostCrashesList[0].crashesCaused == mostCrashesList[1].crashesCaused) {
        mostCrashes.name = "TIE";
      }
    }

    //Find the player with the most successful passwords
    let mostPasswordsList = [...playerTrophyStats].sort((a, b) => (a.passwordsCreated <= b.passwordsCreated ? 1 : -1));
    let mostPasswords = null;
    if (mostPasswordsList && mostPasswordsList[0].passwordsCreated > 0) {
      mostPasswords = { ...mostPasswordsList[0] }; // Create a copy to avoid mutating original
      if (mostPasswordsList.length > 1 && mostPasswordsList[0].passwordsCreated == mostPasswordsList[1].passwordsCreated) {
        mostPasswords.name = "TIE";
      }
    }

    //Find the player with the most password attempts
    let mostAttemptsList = [...playerTrophyStats].sort((a, b) => (a.passwordAttempts <= b.passwordAttempts ? 1 : -1));
    let mostAttempts = null;
    if (mostAttemptsList && mostAttemptsList[0].passwordAttempts > 0) {
      mostAttempts = { ...mostAttemptsList[0] }; // Create a copy to avoid mutating original
      if (mostAttemptsList.length > 1 && mostAttemptsList[0].passwordAttempts == mostAttemptsList[1].passwordAttempts) {
        mostAttempts.name = "TIE";
      }
    }

    return {
      trophyStats: playerTrophyStats,
      bestCracker: bestCracker,
      mostCracked: mostCracked,
      mostSelfPwns: mostSelfPwns,
      mostCrashes: mostCrashes,
      mostPasswords: mostPasswords,
      mostAttempts: mostAttempts,
    };
  });

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // DIRECTIVES

  // Define the v-focus directive
  const vFocus = {
    mounted(el) {
      el.focus();
    },
  };

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // LIFECYCLE

  // Watch for shibboleth requirement changes to auto-focus appropriate field
  watch(
    () => computedShibbolethRequired.value,
    (newValue, oldValue) => {
      // Use nextTick to ensure the DOM has updated before trying to focus
      nextTick(() => {
        if (newValue === true && oldValue === false) {
          // Shibboleth just became required - focus the shibboleth input
          const shibbolethInput = document.getElementById("ShibbolethInput");
          if (shibbolethInput) {
            shibbolethInput.focus();
          }
        } else if (oldValue === true && newValue === false) {
          // Shibboleth requirement was just satisfied - focus the password field
          const passwordInput = document.getElementById("PasswordAttempt");
          if (passwordInput) {
            passwordInput.focus();
          }
        }
      });
    },
  );

  onMounted(() => {
    let playerID = localStorage.getItem("kindaFunPlayerID");
    let playerName = localStorage.getItem("kindaFunPlayerName");
    if (!playerID) {
      playerID = generateUniqueID();
      localStorage.setItem("kindaFunPlayerID", playerID);
    }
    if (playerName) {
      my.name = playerName;
      ui.nameInput = playerName;
    }
    my.playerID = playerID;

    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("create")) {
      createRoom();
    } else if (urlParams.has("room")) {
      // Instead of automatically joining, pre-fill the room code and show title screen
      const roomCode = urlParams.get("room") || "";
      ui.roomCodeInput = roomCode.toUpperCase();
      // Focus the submit button so user can easily join
      nextTick(() => {
        const submitButton = document.getElementById("SubmitRoomCodeButton");
        if (submitButton) {
          submitButton.focus();
        }
      });
    } else if (urlParams.has("join")) {
      document.getElementById("EnterRoomCode").focus();
    }
    if (urlParams.has("ref")) {
      sendEvent("Invalid", "Ref", urlParams.get("ref"));
    }

    const instance = getCurrentInstance();
    if (instance) {
      instance.appContext.app.directive("focus", vFocus);
    }
  });
</script>
<template lang="pug" src="./Invalid.pug"></template>
<style lang="scss" src="./Invalid.scss"></style>
<style lang="scss" src="./Invalid.scss"></style>
