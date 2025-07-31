<script setup>
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // IMPORTS
  import { reactive, computed, onMounted, getCurrentInstance, watch } from "vue"; // Import reactive from Vue 3
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

  // Firebase & VueFire Stuff
  import {
    doc,
    increment,
    serverTimestamp,
    Timestamp,
    addDoc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    collection,
    query,
    where,
    onSnapshot,
  } from "firebase/firestore";
  import { useFirestore, useCollection, useDocument } from "vuefire";

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
    console.log("Game document reference:", gameRef);

    onSnapshot(
      gameRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          game.isGameStarted = data.isGameStarted ?? false;
          game.roomCreatorID = data.roomCreatorID ?? "";
          game.isGameOver = data.isGameOver ?? false;
          
          // Handle game state updates
          const gamePhase = data.gamePhase;
          if (gamePhase) {
            handleGamePhaseChange(gamePhase, data);
          }
          
          // Update game state from Firestore
          if (data.currentChallenge) {
            round.challenge = data.currentChallenge;
          }
          if (data.currentRules) {
            round.rules = data.currentRules;
          }
          if (data.currentBugs) {
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
            game.roundSummary = data.roundSummary;
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
    round.phase = newPhase;
    
    switch (newPhase) {
      case "choose-challenge":
        if (my.role === "SysAdmin") {
          definePossibleChallenges();
        }
        break;
      case "choose-rules":
        if (my.role === "SysAdmin") {
          my.rulebux = settings.default.rulebux;
        }
        break;
      case "create-password":
        if (previousPhase !== "create-password") {
          roundStartTimer();
          soundinvalidStartGuessing.play();
        }
        break;
      case "crashed":
        if (data.crashedPlayer && data.crashedWord) {
          round.crash.active = true;
          round.crash.player = game.players.find(p => p.playerID === data.crashedPlayer);
          round.crash.word = data.crashedWord;
          soundSystemCrash.play();
          endTheGuessingRound();
        }
        break;
      case "final-round":
        ui.enterFinalPasswords = true;
        startFinalRoundCounter();
        musicFinalRound.play();
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
    if (!game.roomCode) return;
    
    try {
      const roomRef = doc(db, "rooms", game.roomCode);
      await updateDoc(roomRef, updates);
    } catch (error) {
      console.error("Error updating room state:", error);
    }
  }

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Functions

  const generateUniqueID = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

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
      gamePhase: "lobby", // lobby, choose-challenge, choose-rules, create-password, crashed, final-round, game-over
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
    };
    await setDoc(roomRef, newRoom);
    game.roomCode = roomCode;
    console.log("Room created with code:", roomCode);
    // Update the browser URL to the new meeting page
    const protocol = window.location.protocol; // http: or https:
    const host = window.location.host; // e.g., localhost:5173 or example.com
    const newUrl = `${protocol}//${host}/invalid?room=${game.roomCode}`;
    window.history.replaceState(null, "", newUrl);
    joinRoom();
  };

  const joinRoom = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get("room");

    if (!roomCode) {
      console.error("Room code is missing in the URL");
      game.isFailedToGetRoomData = true;
      return;
    }

    game.roomCode = roomCode.toUpperCase();
    const roomRef = doc(db, "rooms", game.roomCode);

    // Fetch room data
    game.roomData = useDocument(roomRef);

    // Fetch players
    const playersCollectionRef = collection(db, `rooms/${game.roomCode}/players`);
    game.players = useCollection(playersCollectionRef);
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

  const savePlayerInfo = async () => {
    my.name = ui.nameInput.toUpperCase();
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

  const updatePlayer = () => {
    my.name = my.name.toUpperCase();
    ui.appliedForJob = true;
    //Is this a new player or a player update
    let newPlayer = true;

    const p = {
      name: my.name,
      employeeNumber: my.employeeNumber,
      socketID: my.socketID,
      isRoomHost: my.isRoomHost,
      role: null,
      score: 0,
      passwordAttempts: 0,
      passwordSuccess: false,
    };

    game.players.forEach(function (player, index) {
      if (player.employeeNumber == my.employeeNumber) {
        game.players[index] = p;
        newPlayer = false;
      }
    });

    // It's a new player, add that to the array.
    if (newPlayer) {
      game.players.push(p);
    }

    game.players.forEach(function (player, index) {
      if (player.employeeNumber == my.employeeNumber) {
        my.playerIndex = index;
      }
    });
    document.title = my.name + " | " + gameTitle;

    if (my.playerIndex < 0) {
      alert("could not get a player index. this is a bug. this should not happen.");
    }

    if (!ui.musicPlaying) {
      musicLobby.play();
      ui.musicPlaying = true;
    }
  };

  const startTheGame = async () => {
    // Assign the host as SysAdmin, all other players are employees
    game.players.forEach(function (player, index) {
      if (player.isRoomHost) {
        game.players[index].role = "SysAdmin";
      } else {
        game.players[index].role = "employee";
      }
    });

    if (game.players.length == 2) {
      game.maxRounds = 6;
    } else if (game.players.length == 3) {
      game.maxRounds = 6;
    } else if (game.players.length == 4) {
      game.maxRounds = 8;
    } else {
      game.maxRounds = game.players.length;
    }

    // Find the first host as the initial SysAdmin
    const hostIndex = game.players.findIndex(player => player.isRoomHost);
    
    const roomRef = doc(db, `rooms/${game.roomCode}`);
    await updateDoc(roomRef, {
      isGameStarted: true,
      gamePhase: "choose-challenge",
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

  /////////// SysAdmin Methods
  const definePossibleChallenges = () => {
    round.possibleChallenges = [];

    let n = 0;

    // Create some possible challenges, based on some rulesets.
    while (n < settings.default.numberOfPossibleChallenges) {
      let randomChallenge = randomFrom(challenges);

      let appendThisChallenge = true;
      if (randomChallenge.naughty && !game.allowNaughty) {
        // This challenge is too naughty for this game, pick again.
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

    // Update Firestore instead of using Socket.IO
    await updateRoomState({
      currentChallenge: round.challenge,
      gamePhase: "choose-rules",
    });

    sendEvent("Invalid", "Challenge Selected", round.challenge.name);
  };

  const chooseRule = async (rule) => {
    if (rule.name == "Flying Pig") {
      // Special process for summoning a flying pig.
      my.rulebux -= rule.cost;
      round.flyingPig.active = true;
      let r = {
        type: "Flying Pig",
        message: "Look at the flying pig.",
      };
      round.rules.push(r);
      // Update Firestore instead of using Socket.IO
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

      // Pay for it.
      my.rulebux = my.rulebux - rule.cost;

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

      // Pay for it.
      my.rulebux = my.rulebux - rule.cost;
      round.rules.push(r);
      // Recalculate Possible Right Answers.
      findPossibleRightAnswers();

      // Update Firestore instead of using Socket.IO
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
    } else if (rule.name == "Demand A Letter") {
      r.type = rule.name;
      r.inputValue = ui.currentRule.inputValue.toUpperCase();
      r.message = "You must use the letter " + r.inputValue;
    } else if (rule.name == "Shibboleth") {
      r.type = rule.name;
      r.inputValue = ui.currentRule.inputValue;
      r.message = "Before entering a password, you must type " + r.inputValue;
      round.shibboleth = r.inputValue;
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
      // Pay for it.
      my.rulebux = my.rulebux - rule.cost;

      // Update Firestore instead of using Socket.IO
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
    let foundMatch = false;
    round.challenge.possible.forEach(function (p, index) {
      if (bug == p.toUpperCase()) {
        foundMatch = true;
      }
    });

    if (!foundMatch) {
      ui.addBugErrors.push("Just so you know, " + bug + " wasn't a valid password");
    }

    if (findInArray(round.bugs, bug)) {
      ui.addBugErrors.push("You already added " + bug + ".");
    }

    // Charge for adding the bug.
    if (round.bugs && round.bugs.length > 0) {
      my.rulebux -= 1;
    }

    ui.addBug = "";
    round.bugs.push(bug);

    // Update Firestore instead of using Socket.IO
    await updateRoomState({
      currentBugs: round.bugs,
    });

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

  const roundStartTimer = () => {
    round.roundTimer = setInterval(() => {
      round.elapsedTime += 1;
      game.players[round.sysAdminIndex].score += 1;
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
          // if the pig isn't active, kill the pig.
          clearInterval(round.flyingPig.timer);
          round.flyingPig.timer = undefined;
        } else {
          // Otherwise, let's generate a new line for the pig.
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
    round.elapsedTime = 0;
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
    // Update Firestore to indicate round is over
    await updateRoomState({
      gamePhase: "round-over",
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
    round.claimedPasswords.forEach(function (claimedPW) {
      if (attempt.replace(/[^0-9a-z]/gi, "") == claimedPW.toUpperCase().replace(/[^0-9a-z]/gi, "")) {
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
      timestamp: serverTimestamp(),
    };

    if (crashCheck) {
      attemptRecord.result = "crash";
      attemptRecord.challengeName = round.challenge.name;
      
      // Update crash state in Firestore
      const newCrashSummary = [...(game.crashSummary || []), {
        playerIndex: my.playerIndex,
        sysAdminIndex: round.sysAdminIndex,
        word: attempt,
      }];
      
      await updateRoomState({
        gamePhase: "crashed",
        crashedPlayer: my.playerID,
        crashedWord: attempt,
        crashSummary: newCrashSummary,
        attempts: [...(round.attempts || []), attemptRecord],
      });
      
      my.crashesCaused += 1;
      sendEvent("Invalid", "Server Crashed", attempt);
    } else if (correctAnswer) {
      soundCorrectGuess.play();
      await passwordSuccess(attempt);
    } else {
      soundBadGuess.play();
      attemptRecord.result = "failed";
      
      // Update attempts in Firestore for failed password
      await updateRoomState({
        attempts: [...(round.attempts || []), attemptRecord],
      });
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

    if (round.claimedPasswords.length < 1 && game.players.length > 2) {
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
    const newClaimedPasswords = [...(round.claimedPasswords || []), attempt];
    const newEmployeePasswords = [...(game.allEmployeePasswords || []), {
      pw: attempt,
      name: my.name,
      playerIndex: my.playerIndex,
      playerID: my.playerID,
      claimed: false,
    }];
    
    const attemptRecord = {
      playerIndex: my.playerIndex,
      pwAttempt: attempt,
      attemptCount: my.passwordAttempts,
      playerScore: my.score,
      challengeName: round.challenge.name,
      result: "success",
      timestamp: serverTimestamp(),
    };

    await updateRoomState({
      claimedPasswords: newClaimedPasswords,
      allEmployeePasswords: newEmployeePasswords,
      attempts: [...(round.attempts || []), attemptRecord],
    });

    if (round.flyingPig.active) {
      round.flyingPig.message = randomFrom(flyingPigLines.afterCorrect);
      clearInterval(round.flyingPig.timer);
      round.flyingPig.timer = undefined;
      soundOink.play();
    }
  };

  const startNextRoundClicked = async () => {
    var summary = {
      challenge: round.challenge.name,
      sysAdmin: my.name,
      rules: round.rules,
      bugs: round.bugs,
      attempts: round.attempts,
      listSource: round.challenge.source,
      possibleAnswers: round.possibleAnswerCount,
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
        gamePhase: "choose-challenge",
        // Reset round state
        currentChallenge: null,
        currentRules: [],
        currentBugs: [],
        currentShibboleth: "",
        claimedPasswords: [],
        attempts: [],
        flyingPigActive: false,
      });
    }
  };

  const onPaste = (evt) => {
    console.log("on paste", evt);
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
        if (p.name == my.name || p.playerIndex == my.playerIndex) {
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
          // sendEvent("Invalid", "Self-pwn", attempt);
        } else if (p.claimed) {
          soundTooSlow.play();
          passwordClaimed = true;
          pwMatchErrorMessage = "This password was already cracked by " + p.claimed;
        } else {
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
    
    // Set game over state
    await updateRoomState({
      gamePhase: "game-over",
      isGameOver: true,
    });
  };

  const usedRuleNames = () => {
    let u = [];
    round.rules.forEach(function (r) {
      u.push(r.type);
    });
    return u;
  };

  const computedAmIHost = computed(() => {
    const roomCreatorExists = game.players.some((player) => player.id === game.roomCreatorID);

    if (roomCreatorExists) {
      console.log(1335);
      return my.playerID === game.roomCreatorID;
    } else {
      // Check if my.player is the first player in the players array
      return game.players.length > 0 && game.players[0].id === my.playerID;
    }
  });

  // const uncrackedPasswords = () => {

  //   // Go through all of game.allEmployeePasswords
  //   // Filter to only those where claimed doesn't have a string attached.
  //   // return both the array of uncracked passwords as well as a count of how many there are.

  //   return {
  //     array,
  //     count
  //   }

  // };

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Computeds

  const computedSysAdminName = computed(() => {
    if (game.players && game.players.length > 0 && round.sysAdminIndex > -1) {
      return game.players[round.sysAdminIndex].name;
    } else {
      return null;
    }
  });
  const computedSysAdminIndex = computed(() => {
    return round.sysAdminIndex;
  });

  //I've probably deprecated this one.
  const computedUsedRuleNames = computed(() => {
    let u = [];
    round.rules.forEach(function (r) {
      u.push(r.type);
    });
    return u;
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
      bestCracker = bestCrackersList[0];
      if (bestCrackersList[0].cracks == bestCrackersList[1].cracks) {
        bestCracker.name = "TIE";
      }
    }

    //Find the most cracked.
    let mostCrackedList = [...playerTrophyStats].sort((a, b) => (a.cracked <= b.cracked ? 1 : -1));
    let mostCracked = null;
    if (mostCrackedList && mostCrackedList[0].cracked > 0) {
      mostCracked = mostCrackedList[0];
      if (mostCrackedList[0].cracked == mostCrackedList[1].cracked) {
        mostCracked.name = "TIE";
      }
    }

    //Find the most selfpwned.
    let mostSelfPwnsList = [...playerTrophyStats].sort((a, b) => (a.selfPwn <= b.selfPwn ? 1 : -1));
    let mostSelfPwns = null;
    if (mostSelfPwnsList && mostSelfPwnsList[0].selfPwn > 0) {
      mostSelfPwns = mostSelfPwnsList[0];
      if (mostSelfPwnsList[0].selfPwn == mostSelfPwnsList[1].selfPwn) {
        mostSelfPwns.name = "TIE";
      }
    }

    //Find the most crashhappy.
    let mostCrashesList = [...playerTrophyStats].sort((a, b) => (a.crashesCaused <= b.crashesCaused ? 1 : -1));
    let mostCrashes = null;
    if (mostCrashesList && mostCrashesList[0].crashesCaused > 0) {
      mostCrashes = mostCrashesList[0];
      if (mostCrashesList[0].crashesCaused == mostCrashesList[1].crashesCaused) {
        mostCrashes.name = "TIE";
      }
    }

    //Find the player with the most successful passwords
    let mostPasswordsList = [...playerTrophyStats].sort((a, b) => (a.passwordsCreated <= b.passwordsCreated ? 1 : -1));
    let mostPasswords = null;
    if (mostPasswordsList && mostPasswordsList[0].passwordsCreated > 0) {
      mostPasswords = mostPasswordsList[0];
      if (mostPasswordsList[0].passwordsCreated == mostPasswordsList[1].passwordsCreated) {
        mostPasswords.name = "TIE";
      }
    }

    //Find the player with the most password attempts
    let mostAttemptsList = [...playerTrophyStats].sort((a, b) => (a.passwordAttempts <= b.passwordAttempts ? 1 : -1));
    let mostAttempts = null;
    if (mostAttemptsList && mostAttemptsList[0].passwordAttempts > 0) {
      mostAttempts = mostAttemptsList[0];
      if (mostAttemptsList[0].passwordAttempts == mostAttemptsList[1].passwordAttempts) {
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
  // Real-time Game Events (now handled by Firestore listeners)
  // All socket.io listeners have been replaced with Firestore onSnapshot listeners
  // in the subscribeToGameStatus function above. Game events like challenges, rules,
  // password attempts, crashes, and round transitions are now synchronized through
  // the Firestore document updates in the updateRoomState function.

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Directives

  // Define the v-focus directive
  const vFocus = {
    mounted(el) {
      el.focus();
    },
  };
  // Define the  directive
  // const vToUppercase = {
  //   mounted(el) {
  //     el.addEventListener("input", () => {
  //       if (el.value) {
  //         el.value = el.value.toUpperCase();
  //       }
  //     });
  //   },
  // };

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Mounted

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
      joinRoom();
      // game.roomCode = urlParams.get("room").toUpperCase();
      // socket.on("connect", () => {
      //   console.log(`Connected with socketId: ${socket.id}`);
      //   my.socketID = socket.id;

      // });
    } else if (urlParams.has("join")) {
      document.getElementById("EnterRoomCode").focus();
    }
    if (urlParams.has("ref")) {
      sendEvent("Invalid", "Ref", urlParams.get("ref"));
    }
    // Initialize socket event handlers

    const instance = getCurrentInstance();
    if (instance) {
      instance.appContext.app.directive("focus", vFocus);
      // instance.appContext.app.directive("touppercase", vToUppercase);
    }

    // setupSocketHandlers(socket);
  });
</script>
<template lang="pug" src="./Invalid.pug"></template>
<style lang="scss" src="./Invalid.scss"></style>
