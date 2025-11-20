<script setup lang="ts">
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // IMPORTS
  import { reactive, computed, onMounted, getCurrentInstance } from "vue"; // Import reactive from Vue 3
  import { randomNumber, randomFrom, shuffle, percentOf, addCommas, findInArray, removeFromArray, sendEvent, dollars } from "../../shared/ts/_functions";
  import { allDecks } from "./ts/_decks";
  import type { GameState, MyState, RoundState, UIState, Player, PresentedCard } from "./ts/_types";

  import { Howl, Howler } from "howler";
  import { settings, soundBeginTalking, soundPresentationOver } from "./ts/_variables";

  //////// Firebase & VueFire
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
  import { updateGeneralPlayerStats, updateGamePlayerStats, updateGameSizeStats } from "../../shared/ts/_firebaseStats";

  // Initialize Firestore
  const db = useFirestore();
  const statsRef = doc(db, `stats/wrongest`);

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Variables
  const game = reactive<GameState>({
    roomCode: "",
    gameName: "wrongest",
    inRoom: false,
    gameStarted: false,
    gameOver: false,
    maxRounds: 0,
    allDecks: allDecks,
    chosenDeck: {},
    gameDeck: { cards: [] },
    players: [],
    cardsPlayed: [],
    statementHistory: [],
    voteHistory: [],
    roomData: null,
    roomCreatorID: "",
    isFailedToGetRoomData: false,
  });

  const my = reactive<MyState>({
    isRoomHost: false,
    name: "",
    nameInput: "",
    playerID: "",
    card: "",
    playerIndex: -1,

    upVote: "",
    downVote: "",
  });
  const round = reactive<RoundState>({
    phase: "",
    number: 0,
    dealerIndex: -1,
    activePlayerIndex: -1,
    playerPresenting: false,
    presentationTimer: undefined,
    presentationTimeLeft: settings.timeToPresent,
    cardsPresented: [],
    votesSubmitted: 0,
    playersVoted: [], // Track which players have voted this round
  });
  const ui = reactive<UIState>({
    watchingVideo: false,
    nameEntered: false,
    deckName: "",
    upVoteIndex: -1,
    downVoteIndex: -1,
    iVoted: false,
    roomCodeInput: "",
  });

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Functions

  // Generate unique player ID
  const generateUniqueID = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Generate room code
  const generateRoomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const createRoom = async () => {
    game.isFailedToGetRoomData = false;
    const roomCode = generateRoomCode();
    const roomRef = doc(db, "rooms", roomCode);

    // Check if the room already exists
    const roomSnapshot = await getDoc(roomRef);
    if (roomSnapshot.exists()) {
      alert("ERROR: room already exists");
      console.error("Room already exists");
      return;
    }

    // Create the new room document
    const newRoom = {
      gameSlug: "wrongest",
      roomCode: roomCode,
      isGameStarted: false,
      isGameOver: false,
      roomCreatorID: my.playerID,
      createdAt: serverTimestamp(),
      ttl: Timestamp.fromMillis(Date.now() + 86400000), // 1 day from now
    };
    await setDoc(roomRef, newRoom);

    // Create initial game state sub-document
    const gameStateRef = doc(db, `rooms/${roomCode}/gameState/state`);
    await setDoc(gameStateRef, {
      phase: "lobby",
      currentRound: 0,
      maxRounds: 0,
      chosenDeckName: "",
      gameDeck: { cards: [] },
      cardsPresented: [],
      votesSubmitted: 0,
      activePlayerIndex: -1,
      playerPresenting: false,
      statementHistory: [],
      playersVoted: [], // Initialize empty array for tracking votes
    });

    game.roomCode = roomCode;
    // TODO: Remove debug log before merging PR
    console.log("Room created with code:", roomCode);

    // Set your local variables
    my.isRoomHost = true;
    game.inRoom = true;

    // Update the browser URL
    const protocol = window.location.protocol;
    const host = window.location.host;
    const newUrl = `${protocol}//${host}/wrongest?room=${game.roomCode}`;
    window.history.pushState({}, "", newUrl);

    joinRoom();
  };

  const joinRoom = async () => {
    const roomRef = doc(db, "rooms", game.roomCode);

    // Fetch room data
    game.roomData = useDocument(roomRef);

    // Subscribe to room status
    await subscribeToGameStatus(game.roomCode);

    // Subscribe to players
    await subscribeToPlayers(game.roomCode);

    // Subscribe to game state
    await subscribeToGameState(game.roomCode);

    my.isRoomHost = false;
    game.inRoom = true;
  };

  const joinRoomByInput = () => {
    game.roomCode = ui.roomCodeInput.toUpperCase();
    const protocol = window.location.protocol;
    const host = window.location.host;
    const newUrl = `${protocol}//${host}/wrongest?room=${game.roomCode}`;
    window.history.pushState({}, "", newUrl);
    joinRoom();
  };

  // Subscribe to game status (room document)
  async function subscribeToGameStatus(roomCode) {
    const gameRef = doc(collection(db, "rooms"), roomCode);
    // TODO: Remove debug log before merging PR
    console.log("Subscribing to game document:", gameRef);

    onSnapshot(
      gameRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          game.gameStarted = data.isGameStarted ?? false;
          game.roomCreatorID = data.roomCreatorID ?? "";
          game.gameOver = data.isGameOver ?? false;
          my.isRoomHost = data.roomCreatorID === my.playerID;
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

  // Subscribe to players collection
  async function subscribeToPlayers(roomCode) {
    const playersRef = collection(db, `rooms/${roomCode}/players`);

    onSnapshot(playersRef, (snapshot) => {
      const players = [];
      snapshot.forEach((doc) => {
        players.push({ id: doc.id, ...doc.data() });
      });

      // Sort by playerIndex to maintain order
      players.sort((a, b) => a.playerIndex - b.playerIndex);
      game.players = players;

      // Update my playerIndex
      game.players.forEach((player, index) => {
        if (player.playerID === my.playerID) {
          my.playerIndex = index;
          my.card = player.card || "";
        }
      });
    });
  }

  // Subscribe to game state
  async function subscribeToGameState(roomCode) {
    const gameStateRef = doc(db, `rooms/${roomCode}/gameState/state`);

    onSnapshot(gameStateRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log("Game state update received:", {
          phase: data.phase,
          currentRound: data.currentRound,
          cardsPresented: data.cardsPresented?.length,
          votesSubmitted: data.votesSubmitted,
          playersVoted: data.playersVoted?.length,
        });

        round.phase = data.phase || "lobby";
        round.number = data.currentRound || 0;
        game.maxRounds = data.maxRounds || 0;
        game.chosenDeck.name = data.chosenDeckName || "";
        game.gameDeck = data.gameDeck || { cards: [] };
        round.cardsPresented = data.cardsPresented || [];
        round.votesSubmitted = data.votesSubmitted || 0;
        round.activePlayerIndex = data.activePlayerIndex ?? -1;
        round.playerPresenting = data.playerPresenting ?? false;
        game.statementHistory = data.statementHistory || [];
        round.playersVoted = data.playersVoted || []; // Store for computed properties

        // Check if current player has voted this round
        const playersVoted = data.playersVoted || [];
        ui.iVoted = playersVoted.includes(my.playerID);
        console.log("Player", my.playerID, "has voted:", ui.iVoted, "in phase:", round.phase);

        // Reset vote selections when entering voting phase with no votes cast yet
        // This prevents the "Submit Votes" button from appearing prematurely
        if ((data.phase === "voting" || data.phase === "presenting") && playersVoted.length === 0) {
          if (my.upVote || my.downVote) {
            console.log("Clearing vote selections for new round/voting phase");
            my.upVote = "";
            my.downVote = "";
            // Also ensure iVoted is false to prevent button flashing
            ui.iVoted = false;
          }
        }

        // Handle phase-specific logic
        if (data.playerPresenting && !round.presentationTimer) {
          startPresentationTimer();
        } else if (!data.playerPresenting && round.presentationTimer) {
          resetPresentationTimer();
        }
      }
    });
  }

  const watchVideo = () => {
    ui.watchingVideo = true;
    if (game.inRoom) {
      sendEvent("The Wrongest Words", "Instruction Video", "Pregame Screen");
    } else {
      sendEvent("The Wrongest Words", "Instruction Video", "Title Screen");
    }
  };

  ////////////////////////////////////////
  // Pregame
  const updateMyInfo = async () => {
    // Normalize the name input - handle emojis properly
    let normalizedName = my.nameInput.trim();

    // Only convert to uppercase if the string doesn't contain emojis
    // This prevents emoji corruption from toUpperCase()
    const hasEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
      normalizedName,
    );

    if (!hasEmoji) {
      normalizedName = normalizedName.toUpperCase();
    }

    my.name = normalizedName;
    localStorage.setItem("kindaFunPlayerName", my.name);

    const playersCollection = collection(db, "rooms", game.roomCode, "players");
    const playerQuery = query(playersCollection, where("playerID", "==", my.playerID));
    const querySnapshot = await getDocs(playerQuery);

    let playerFound = false;

    if (!querySnapshot.empty) {
      // Update the existing player document
      querySnapshot.forEach(async (docSnapshot) => {
        const playerRef = doc(db, "rooms", game.roomCode, "players", docSnapshot.id);
        await updateDoc(playerRef, {
          name: my.name,
          isConnected: true,
          lastSeen: serverTimestamp(),
        });
        playerFound = true;
      });
    }

    if (!playerFound) {
      // Get current player count to assign playerIndex
      const playersSnapshot = await getDocs(playersCollection);
      const playerIndex = playersSnapshot.size;

      const newPlayer = {
        name: my.name,
        playerID: my.playerID,
        score: 0,
        card: "",
        playerIndex: playerIndex,
        isConnected: true,
        lastSeen: serverTimestamp(),
      };

      // Create a new player document
      const playerRef = doc(db, "rooms", game.roomCode, "players", my.playerID);
      await setDoc(playerRef, newPlayer);

      my.playerIndex = playerIndex;
    }

    ui.nameEntered = true;
  };

  const sendPlayerUpdate = async () => {
    // This is now handled by Firestore updates
    // Update lastSeen timestamp
    if (my.playerID && game.roomCode) {
      const playerRef = doc(db, "rooms", game.roomCode, "players", my.playerID);
      await updateDoc(playerRef, {
        lastSeen: serverTimestamp(),
      });
    }
  };

  const changeDeck = () => {
    if (ui.deckName == "EVERYTHING!") {
      let cardStack = [];
      game.allDecks.forEach(function (deck) {
        if (deck.cards && Array.isArray(deck.cards)) {
          cardStack = cardStack.concat(deck.cards);
        }
      });
      game.chosenDeck = {
        name: "EVERYTHING!",
        description: "I don't wanna choose! Just shuffle in all the cards and let's see what happens...",
        cards: cardStack,
      };
      console.log("EVERYTHING deck created with", cardStack.length, "cards");
    } else {
      let chosenDeck = game.allDecks.filter((deck) => deck.name == ui.deckName);
      if (chosenDeck.length > 0) {
        game.chosenDeck = chosenDeck[0];
        console.log("Deck selected:", game.chosenDeck.name, "with", game.chosenDeck.cards.length, "cards");
      } else {
        console.error("Deck not found:", ui.deckName);
        game.chosenDeck = {};
      }
    }
  };

  const startTheGame = async () => {
    try {
      // Validate that a deck has been chosen
      if (!game.chosenDeck || !game.chosenDeck.name || !game.chosenDeck.cards) {
        alert("Please select a deck before starting the game.");
        return;
      }

      // Validate deck has cards
      if (!Array.isArray(game.chosenDeck.cards) || game.chosenDeck.cards.length === 0) {
        alert("The selected deck has no cards. Please choose a different deck.");
        console.error("Invalid deck:", game.chosenDeck);
        return;
      }

      console.log("Starting game with deck:", game.chosenDeck.name, "containing", game.chosenDeck.cards.length, "cards");

      let d = shuffle(game.chosenDeck.cards);
      game.gameDeck.cards = d;
      await dealOutCards();

      if (game.players.length == 3 || game.players.length == 4) {
        game.maxRounds = 4;
      } else if (game.players.length == 5 || game.players.length == 6) {
        game.maxRounds = 3;
      } else if (game.players.length > 6) {
        game.maxRounds = 2;
      }

      console.log("Updating Firestore with game start...");

      // Update player stats in /stats/general/players and /stats/wrongest/players
      for (const player of game.players) {
        await updateGeneralPlayerStats(db, player.name, "wrongest");
        await updateGamePlayerStats(db, "wrongest", player.name);
      }

      // Update game stats in /stats/wrongest
      await updateDoc(statsRef, {
        gamesStarted: increment(1),
        lastGameStarted: serverTimestamp(),
      });

      // Update game size stats in /stats/wrongest/gameSizes
      await updateGameSizeStats(db, "wrongest", game.players.length, "gamesStarted");

      // Update room document
      const roomRef = doc(db, `rooms/${game.roomCode}`);
      await updateDoc(roomRef, {
        isGameStarted: true,
      });

      // Update game state - create a clean object to avoid Vue reactivity properties
      const gameStateRef = doc(db, `rooms/${game.roomCode}/gameState/state`);
      await updateDoc(gameStateRef, {
        phase: "presenting",
        currentRound: 1,
        maxRounds: game.maxRounds,
        chosenDeckName: game.chosenDeck.name,
        gameDeck: {
          cards: game.gameDeck.cards || [],
        },
        activePlayerIndex: -1,
        playerPresenting: false,
        playersVoted: [], // Initialize empty array for tracking votes
      });

      console.log("Game started successfully");
      sendEvent("The Wrongest Words", "Game Started", game.roomCode);
      changeFavicon("wrongest/favicons/favicon.ico");
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Failed to start game: " + error.message);
    }
  };
  ////////////////////////////////////////
  // In Game
  const dealOutCards = async () => {
    try {
      if (game.gameDeck.cards.length <= computedPlayerCount.value) {
        ////////////////////////////////////////////////////////////
        // You've run out of cards.
        // EMERGENCY BACKUP SCENARIO.
        let newDeck = randomFrom(allDecks);
        let d = shuffle(newDeck.cards);
        game.gameDeck.cards = d;

        alert("You've run out of cards. As such, I've chosen a new deck and shuffled that for you.");
      }

      // Deal cards to each player in Firestore
      for (let index = 0; index < game.players.length; index++) {
        const player = game.players[index];
        const card = game.gameDeck.cards[0];
        game.gameDeck.cards.shift();

        // Use the document ID (player.id) which matches the playerID
        const playerRef = doc(db, "rooms", game.roomCode, "players", player.id);
        await updateDoc(playerRef, {
          card: card,
        });
      }

      // Update game deck in game state
      const gameStateRef = doc(db, `rooms/${game.roomCode}/gameState/state`);
      await updateDoc(gameStateRef, {
        gameDeck: {
          cards: game.gameDeck.cards || [],
        },
      });
    } catch (error) {
      console.error("Error dealing cards:", error);
      throw error; // Re-throw to be caught by startTheGame
    }
  };

  const sendGameDeck = async () => {
    // This is now handled by Firestore updates
    const gameStateRef = doc(db, `rooms/${game.roomCode}/gameState/state`);
    await updateDoc(gameStateRef, {
      gameDeck: {
        cards: game.gameDeck.cards || [],
      },
    });
  };

  const dealCard = async () => {
    try {
      round.activePlayerIndex++;
      const gameStateRef = doc(db, `rooms/${game.roomCode}/gameState/state`);
      await updateDoc(gameStateRef, {
        activePlayerIndex: round.activePlayerIndex,
        playerPresenting: true,
      });
      soundBeginTalking.play();
    } catch (error) {
      console.error("Error dealing card:", error);
      alert("Failed to deal card: " + error.message);
    }
  };

  const presentationFinished = async () => {
    try {
      round.playerPresenting = false;
      resetPresentationTimer();

      const activePlayer = game.players[round.activePlayerIndex];
      const cardPresented = {
        card: activePlayer.card,
        playerIndex: round.activePlayerIndex,
        playerName: activePlayer.name,
        score: 0,
      };

      const updatedCardsPresented = [...round.cardsPresented, cardPresented];

      const gameStateRef = doc(db, `rooms/${game.roomCode}/gameState/state`);
      await updateDoc(gameStateRef, {
        playerPresenting: false,
        cardsPresented: updatedCardsPresented,
      });

      soundPresentationOver.play();
    } catch (error) {
      console.error("Error finishing presentation:", error);
      alert("Failed to finish presentation: " + error.message);
    }
  };

  /////////////////////////////////////////
  // Voting
  const startVoting = async () => {
    try {
      console.log("Starting voting phase with", round.cardsPresented.length, "cards presented");
      const gameStateRef = doc(db, `rooms/${game.roomCode}/gameState/state`);
      await updateDoc(gameStateRef, {
        phase: "voting",
        cardsPresented: round.cardsPresented,
        votesSubmitted: 0,
        playersVoted: [], // Reset playersVoted when voting starts
      });
      console.log("Voting phase started successfully");
    } catch (error) {
      console.error("Error starting voting:", error);
      alert("Failed to start voting: " + error.message);
    }
  };

  const voteUp = (statement) => {
    my.upVote = statement.card;
    if (my.downVote === statement.card) {
      my.downVote = "";
    }
  };
  const voteDown = (statement) => {
    my.downVote = statement.card;
    if (my.upVote === statement.card) {
      my.upVote = "";
    }
  };

  // const voteDown = (index) => {
  //   console.log(`ui.downVoteIndex == ${ui.downVoteIndex}`);
  //   ui.downVoteIndex = index;
  //   if (ui.upVoteIndex === index) {
  //     ui.upVoteIndex = -1;
  //   }
  // };

  const submitVotes = async () => {
    try {
      let upVoteIndex;
      let downVoteIndex;
      let upVoteCard = my.upVote;
      let downVoteCard = my.downVote;

      // Find the upVote and downVote cards and their indices
      round.cardsPresented.forEach((card, index) => {
        if (card.card === my.upVote) {
          upVoteIndex = index;
          upVoteCard = card.card;
        }
        if (card.card === my.downVote) {
          downVoteIndex = index;
          downVoteCard = card.card;
        }
      });

      // Get the actual players from the cardsPresented data
      const downVotedCard = round.cardsPresented[downVoteIndex];
      const upVotedCard = round.cardsPresented[upVoteIndex];
      const downVotedPlayer = game.players[downVotedCard.playerIndex];
      const upVotedPlayer = game.players[upVotedCard.playerIndex];

      // Update scores in Firestore
      const downVotePlayerRef = doc(db, "rooms", game.roomCode, "players", downVotedPlayer.id);
      await updateDoc(downVotePlayerRef, {
        score: increment(-1),
      });

      const upVotePlayerRef = doc(db, "rooms", game.roomCode, "players", upVotedPlayer.id);
      await updateDoc(upVotePlayerRef, {
        score: increment(1),
      });

      // Update card scores in cardsPresented
      const updatedCardsPresented = [...round.cardsPresented];
      updatedCardsPresented[downVoteIndex].score -= 1;
      updatedCardsPresented[upVoteIndex].score += 1;

      // Add to vote history
      const newVoteHistory = [
        ...game.voteHistory,
        {
          downVoteIndex: downVoteIndex,
          voterName: my.name,
          voted: "down",
          presenter: round.cardsPresented[downVoteIndex].playerName,
          card: round.cardsPresented[downVoteIndex].card,
        },
        {
          upVoteIndex: upVoteIndex,
          voterName: my.name,
          voted: "up",
          presenter: round.cardsPresented[upVoteIndex].playerName,
          card: round.cardsPresented[upVoteIndex].card,
        },
      ];

      // Update game state
      const gameStateRef = doc(db, `rooms/${game.roomCode}/gameState/state`);

      // Get current playersVoted array from Firestore
      const gameStateDoc = await getDoc(gameStateRef);
      const currentPlayersVoted = gameStateDoc.data()?.playersVoted || [];

      // Add current player to playersVoted if not already there
      const updatedPlayersVoted = currentPlayersVoted.includes(my.playerID) ? currentPlayersVoted : [...currentPlayersVoted, my.playerID];

      await updateDoc(gameStateRef, {
        votesSubmitted: increment(1),
        cardsPresented: updatedCardsPresented,
        playersVoted: updatedPlayersVoted,
      });

      console.log("Vote submitted by player", my.playerID, "- total votes:", updatedPlayersVoted.length);
      sendEvent("The Wrongest Words", "Downvote", downVoteCard);
      sendEvent("The Wrongest Words", "Upvote", upVoteCard);
    } catch (error) {
      console.error("Error submitting votes:", error);
      alert("Failed to submit votes: " + error.message);
    }
  };

  const startNextRound = async () => {
    try {
      console.log("Starting next round from round", round.number);

      // Rotate players array (move first to end)
      const rotatedPlayers = [...game.players];
      rotatedPlayers.push(rotatedPlayers.shift());

      // Update player indices in Firestore
      for (let index = 0; index < rotatedPlayers.length; index++) {
        const player = rotatedPlayers[index];
        const playerRef = doc(db, "rooms", game.roomCode, "players", player.id);
        await updateDoc(playerRef, {
          playerIndex: index,
        });
      }

      // Calculate next round number from current state
      const nextRound = round.number + 1;
      const newStatementHistory = game.statementHistory.concat(round.cardsPresented);

      console.log("Advancing to round", nextRound);

      // Increment rounds played in /stats/wrongest
      await updateDoc(statsRef, {
        roundsPlayed: increment(1),
      });

      // Deal out new cards
      await dealOutCards();

      // Update game state - use calculated nextRound value
      const gameStateRef = doc(db, `rooms/${game.roomCode}/gameState/state`);
      await updateDoc(gameStateRef, {
        phase: "presenting",
        currentRound: nextRound,
        statementHistory: newStatementHistory,
        cardsPresented: [],
        votesSubmitted: 0,
        activePlayerIndex: -1,
        playerPresenting: false,
        playersVoted: [], // Reset playersVoted for new round
      });

      console.log("Round", nextRound, "started successfully");

      // Note: Vote selections are now automatically reset by the Firestore listener
      // when it detects playersVoted is empty in the presenting phase
    } catch (error) {
      console.error("Error starting next round:", error);
      alert("Failed to start next round: " + error.message);
    }
  };

  const sendGameOver = async () => {
    try {
      const newStatementHistory = game.statementHistory.concat(round.cardsPresented);

      // Update game completion stats in /stats/wrongest
      await updateDoc(statsRef, {
        roundsPlayed: increment(1),
        gamesFinished: increment(1),
        lastGameFinished: serverTimestamp(),
      });

      // Update game size completion stats
      await updateGameSizeStats(db, "wrongest", game.players.length, "gamesFinished");

      // Update statement stats for each card played
      for (const statement of newStatementHistory) {
        try {
          const statementRef = doc(db, `stats/wrongest/statements/${statement.card}`);
          const statementSnap = await getDoc(statementRef);

          if (statementSnap.exists()) {
            await updateDoc(statementRef, {
              timesPlayed: increment(1),
              totalScore: increment(statement.score || 0),
              lastPlayed: serverTimestamp(),
            });
          } else {
            await setDoc(statementRef, {
              card: statement.card,
              timesPlayed: 1,
              totalScore: statement.score || 0,
              lastPlayed: serverTimestamp(),
            });
          }
        } catch (err) {
          console.error(`Error updating stats for statement "${statement.card}":`, err);
        }
      }

      // Update room document
      const roomRef = doc(db, `rooms/${game.roomCode}`);
      await updateDoc(roomRef, {
        isGameOver: true,
      });

      // Update game state
      const gameStateRef = doc(db, `rooms/${game.roomCode}/gameState/state`);
      await updateDoc(gameStateRef, {
        phase: "GAME OVER",
        statementHistory: newStatementHistory,
      });
    } catch (error) {
      console.error("Error ending game:", error);
      alert("Failed to end game: " + error.message);
    }
  };

  ////////////////////////////////////////
  // Timers
  const startPresentationTimer = () => {
    function amIPresenting() {
      if (round.playerPresenting == true && round.activePlayerIndex == my.playerIndex) {
        return true;
      } else {
        return false;
      }
    }

    round.presentationTimeLeft = settings.timeToPresent;
    round.presentationTimer = setInterval(() => {
      round.presentationTimeLeft -= 0.05;
      if (round.presentationTimeLeft <= 0) {
        if (amIPresenting()) {
          presentationFinished();
        }
      }
    }, 50);
  };

  const resetPresentationTimer = () => {
    clearInterval(round.presentationTimer);
    round.presentationTimer = undefined;
    round.presentationTimeLeft = settings.timeToPresent;
  };

  const cardText = (txt) => {
    function amIPresenting() {
      if (round.playerPresenting == true && round.activePlayerIndex == my.playerIndex) {
        return true;
      } else {
        return false;
      }
    }
    if (game.gameStarted && amIPresenting()) {
      let t = txt.replace("{", '<span class="secret-text">').replace("}", "</span>");
      return t;
    } else if (round.phase == "presenting" && round.activePlayerIndex < my.playerIndex) {
      return txt.replace(/\{.*?\}/, "...");
    } else {
      return txt.replace("{", "").replace("}", "");
    }
  };

  function resetRoundVariables() {
    round.phase = "presenting";
    round.activePlayerIndex = -1;
    round.dealerIndex = 0;
    round.playerPresenting = false;
    round.presentationTimer = undefined;
    round.presentationTimeLeft = settings.timeToPresent;
    round.cardsPresented = [];
    round.votesSubmitted = 0;
  }

  function resetUIVariables() {
    console.log("Resetting UI variables (vote selections only - iVoted managed by Firestore)");
    my.upVote = "";
    my.downVote = "";
    // Note: ui.iVoted is now managed by Firestore playersVoted array
  }

  function changeFavicon(src) {
    var link = document.createElement("link"),
      oldLink = document.getElementById("dynamic-favicon");
    link.id = "dynamic-favicon";
    link.rel = "shortcut icon";
    link.href = src;
    if (oldLink) {
      document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
  }

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Computeds
  const computedPlayerCount = computed(() => {
    if (game.players && game.players.length >= 0) {
      return game.players.length;
    } else {
      return 0;
    }
  });

  const computedAmIPresenting = computed(() => {
    if (round.playerPresenting == true && round.activePlayerIndex == my.playerIndex) {
      return true;
    } else {
      return false;
    }
  });

  const computedCanIAdvanceTheGame = computed(() => {
    if (round.phase == "presenting") {
      if (round.activePlayerIndex + 1 == my.playerIndex && !round.playerPresenting) {
        // I'm next to play, I see a button.
        return true;
      } else if (my.playerIndex == 0 && game.players.length == round.activePlayerIndex + 1 && !round.playerPresenting) {
        // It's time to vote, and I'm the first player.
        return true;
      } else {
        return false;
      }
    } else if (round.phase == "voting") {
      if (my.playerIndex == 0 && round.votesSubmitted >= game.players.length) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  });

  const computedAreAllVotesCast = computed(() => {
    if (round.votesSubmitted >= computedPlayerCount.value) {
      return true;
    } else {
      return false;
    }
  });

  const computedStatementsToVoteOn = computed(() => {
    return round.cardsPresented.map((card, index) => {
      let cardClass = "";

      if (ui.upVoteIndex === index) {
        cardClass = "agree";
      } else if (ui.downVoteIndex === index) {
        cardClass = "disagree";
      }

      return {
        ...card,
        originalIndex: index,
        class: cardClass,
      };
    });
  });

  const computedDashOffset = computed(() => {
    let a = percentOf(round.presentationTimeLeft, settings.timeToPresent);
    let d = 251 - percentOf(a, 251);
    return d.toFixed(2) + "px";
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

  const computedStatementsByScore = computed(() => {
    const computedStatements = [...game.statementHistory];

    function compare(a, b) {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    }

    let sortedListAll = computedStatements.sort(compare);
    let leastWrongList = sortedListAll.filter((statement) => statement.score >= sortedListAll[0].score);
    let wrongestList = sortedListAll.filter((statement) => statement.score <= sortedListAll[sortedListAll.length - 1].score);

    return {
      wrongest: wrongestList,
      wrongestCount: wrongestList.length,
      leastWrong: leastWrongList,
      leastWrongCount: leastWrongList.length,
      all: sortedListAll,
      allCount: sortedListAll.length,
    };
  });

  // Computed property to get players who haven't voted yet
  const computedPlayersWhoHaventVoted = computed(() => {
    // Get playersVoted array from game state subscription
    const gameStateRef = doc(db, `rooms/${game.roomCode}/gameState/state`);

    // Filter players who are not in the playersVoted array
    return game.players.filter((player) => {
      // Check against the stored playersVoted data in round
      // We'll need to track this in the gameState subscription
      return !round.playersVoted?.includes(player.playerID);
    });
  });

  // Computed property for vote status message
  const computedVoteStatusMessage = computed(() => {
    const votedCount = round.votesSubmitted || 0;
    const totalPlayers = game.players.length;

    if (votedCount === 0) {
      return "";
    }

    if (ui.iVoted) {
      // After I've voted, show who hasn't voted yet
      const playersWhoHaventVoted = game.players.filter((player) => {
        return !round.playersVoted?.includes(player.playerID);
      });

      if (playersWhoHaventVoted.length === 0) {
        return `All ${totalPlayers} players have voted.`;
      } else if (playersWhoHaventVoted.length === 1) {
        return `${playersWhoHaventVoted[0].name} still needs to vote.`;
      } else if (playersWhoHaventVoted.length === 2) {
        return `${playersWhoHaventVoted[0].name} and ${playersWhoHaventVoted[1].name} still need to vote.`;
      } else {
        // More than 2 players haven't voted
        const names = playersWhoHaventVoted
          .slice(0, -1)
          .map((p) => p.name)
          .join(", ");
        const lastName = playersWhoHaventVoted[playersWhoHaventVoted.length - 1].name;
        return `${names}, and ${lastName} still need to vote.`;
      }
    } else {
      // Before I've voted, show generic count
      if (votedCount === 1) {
        return "One player has voted.";
      } else {
        return `${votedCount} players have voted.`;
      }
    }
  });

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Mounted
  onMounted(() => {
    // Get or create player ID
    let playerID = localStorage.getItem("kindaFunPlayerID");
    let playerName = localStorage.getItem("kindaFunPlayerName");

    if (!playerID) {
      playerID = generateUniqueID();
      localStorage.setItem("kindaFunPlayerID", playerID);
    }

    if (playerName) {
      my.nameInput = playerName;
      my.name = playerName;
    }

    my.playerID = playerID;

    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("create")) {
      createRoom();
    } else if (urlParams.has("room")) {
      game.roomCode = urlParams.get("room").toUpperCase();
      let url = new URL(location.protocol + "//" + location.host + location.pathname);
      url.searchParams.set("room", game.roomCode);
      window.history.pushState({}, "", url);
      joinRoom();
    } else if (urlParams.has("join")) {
      document.getElementById("EnterRoomCode").focus();
    }

    // game.gameStarted = true;
    // round.phase = "voting";
    // round.cardsPresented = [
    //   {
    //     card: "Sweat is created by {small aphid-like creatues} that live inside your pores.",
    //     playerIndex: 0,
    //     playerName: "Lemon",
    //     score: 0,
    //   },
    //   {
    //     card: "If a rabbit {hears a D# note,} it will immediately attack any other rabbit it sees.",
    //     playerIndex: 1,
    //     playerName: "Butt",
    //     score: 0,
    //   },
    //   {
    //     card: "PCP was originally used as a {water substitute for American soldiers} in World War I.",
    //     playerIndex: 2,
    //     playerName: "dsadadas",
    //     score: 0,
    //   },
    // ];
  });
</script>
<template lang="pug" src="./Wrongest.pug"></template>
<style lang="scss" src="./Wrongest.scss"></style>
