<script setup>
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // IMPORTS
  import { reactive, computed, onMounted, onBeforeUnmount, getCurrentInstance } from "vue"; // Import reactive from Vue 3
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
  import { allDecks } from "./js/_decks";

  import { Howl, Howler } from "howler";
  import {
    settings,
    soundBeginTalking,
    soundPresentationOver,
  } from "./js/_variables";

  //////// Firebase/Firestore
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

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Variables
  const game = reactive({
    roomCode: "",
    gameName: "wrongest",
    inRoom: false,
    gameStarted: false,
    gameOver: false,
    maxRounds: 0,
    allDecks: allDecks,
    chosenDeck: {},
    gameDeck: {},
    players: [],
    cardsPlayed: [],
    statementHistory: [],
    voteHistory: [],
  });

  const my = reactive({
    isRoomHost: false,
    name: "",
    playerID: generatePlayerID(),
    card: "",
    playerIndex: -1,

    upVote: "",
    downVote: "",
  });
  const round = reactive({
    phase: "",
    number: 0,
    dealerIndex: -1,
    activePlayerIndex: -1,
    playerPresenting: false,
    presentationTimer: undefined,
    presentationTimeLeft: settings.timeToPresent,
    cardsPresented: [],
    votesSubmitted: 0,
  });
  const ui = {
    watchingVideo: false,
    nameEntered: false,
    deckName: "",
    upVoteIndex: -1,
    downVoteIndex: -1,
    iVoted: false,
  };

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Functions
  const generatePlayerID = () => {
    return 'player_' + Math.random().toString(36).substr(2, 9);
  };

  const createRoom = async () => {
    function makeID(digits) {
      let text = "";
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      for (let i = 0; i < digits; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    game.roomCode = makeID(4);

    try {
      // Create a room document in Firestore
      const roomRef = doc(collection(db, "rooms"), game.roomCode);
      await setDoc(roomRef, {
        host: my.playerID,
        createdAt: serverTimestamp(),
        lastActivity: serverTimestamp(),
        gameType: "wrongest"
      });

      // Create gameState subcollection
      const gameStateRef = doc(collection(roomRef, "gameState"), "current");
      await setDoc(gameStateRef, {
        phase: "lobby",
        started: false,
        gameOver: false,
        currentRound: 0,
        maxRounds: 0,
        dealerIndex: 0,
        activePlayerIndex: -1,
        chosenDeck: {},
        gameDeck: {},
        cardsPlayed: [],
        statementHistory: [],
        voteHistory: [],
        presentationTimer: null,
        votesSubmitted: 0,
        cardsPresented: []
      });

      // Set your local variables.
      my.isRoomHost = true;
      game.inRoom = true;
      let url = new URL(
        location.protocol + "//" + location.host + location.pathname,
      );
      url.searchParams.set("room", game.roomCode);
      window.history.pushState({}, "", url);

      console.log(`Created room ${game.roomCode} with host ${my.playerID}`);
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create room. Please try again.");
    }
  };

  const joinRoom = async () => {
    try {
      // Check if room exists
      const roomRef = doc(collection(db, "rooms"), game.roomCode);
      const roomSnap = await getDoc(roomRef);
      
      if (!roomSnap.exists()) {
        alert("Room not found. Please check the room code and try again.");
        return;
      }

      const roomData = roomSnap.data();
      
      // Subscribe to room changes
      await subscribeToRoom(game.roomCode);
      await subscribeToGameState(game.roomCode);

      my.isRoomHost = false;
      game.inRoom = true;
      
      console.log(`Joined room ${game.roomCode}`);
    } catch (error) {
      console.error("Error joining room:", error);
      alert("Failed to join room. Please try again.");
    }
  };

  // Firebase subscription functions
  let unsubscribeRoom = null;
  let unsubscribeGameState = null;

  async function subscribeToRoom(roomCode) {
    const playersRef = collection(doc(collection(db, "rooms"), roomCode), "players");

    unsubscribeRoom = onSnapshot(playersRef, (snapshot) => {
      const updatedPlayers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      game.players = updatedPlayers;
      console.log("Players updated:", updatedPlayers);
    });
  }

  async function subscribeToGameState(roomCode) {
    const gameStateRef = doc(collection(doc(collection(db, "rooms"), roomCode), "gameState"), "current");

    unsubscribeGameState = onSnapshot(gameStateRef, (doc) => {
      if (doc.exists()) {
        const gameState = doc.data();
        
        // Handle game start
        if (gameState.started && !lastGameState.started) {
          game.gameStarted = true;
          round.number = 1;
          round.dealerIndex = 0;
          round.phase = "presenting";
          
          // Find my player index by playerID
          my.playerIndex = game.players.findIndex(player => player.playerID === my.playerID);
          
          // Grab my card
          if (my.playerIndex > -1 && game.players[my.playerIndex]) {
            my.card = game.players[my.playerIndex].card;
          }
          
          changeFavicon("wrongest/favicons/favicon.ico");
        }
        
        // Handle presentation phase changes
        if (gameState.activePlayerIndex !== lastGameState.activePlayerIndex && gameState.phase === "presenting") {
          round.activePlayerIndex = gameState.activePlayerIndex;
          if (gameState.activePlayerIndex >= 0) {
            round.playerPresenting = true;
            startPresentationTimer();
          }
        }
        
        // Handle phase changes
        if (gameState.phase !== lastGameState.phase) {
          if (gameState.phase === "voting") {
            round.phase = "voting";
            round.playerPresenting = false;
            resetPresentationTimer();
          } else if (gameState.phase === "presenting") {
            round.phase = "presenting";
            resetUIVariables();
          } else if (gameState.phase === "GAME OVER") {
            round.phase = "GAME OVER";
            game.gameOver = true;
            resetRoundVariables();
            resetUIVariables();
            if (my.isRoomHost) {
              sendEvent("The Wrongest Words", "Game Over", game.roomCode);
            }
          }
        }
        
        // Update local game state
        game.gameStarted = gameState.started || false;
        game.gameOver = gameState.gameOver || false;
        game.maxRounds = gameState.maxRounds || 0;
        game.chosenDeck = gameState.chosenDeck || {};
        game.gameDeck = gameState.gameDeck || {};
        game.cardsPlayed = gameState.cardsPlayed || [];
        game.statementHistory = gameState.statementHistory || [];
        game.voteHistory = gameState.voteHistory || [];
        
        // Update round state
        round.phase = gameState.phase || "lobby";
        round.number = gameState.currentRound || 0;
        round.dealerIndex = gameState.dealerIndex || 0;
        round.activePlayerIndex = gameState.activePlayerIndex || -1;
        round.cardsPresented = gameState.cardsPresented || [];
        round.votesSubmitted = gameState.votesSubmitted || 0;

        lastGameState = { ...gameState };
        console.log("Game state updated:", gameState);
      }
    });
    
    // Also subscribe to votes
    subscribeToVotes(roomCode);
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
    const p = {
      name: my.name,
      playerID: my.playerID,
      isHost: my.isRoomHost,
      isConnected: true,
      card: "",
      playerIndex: -1,
      upVote: "",
      downVote: "",
      lastSeen: serverTimestamp(),
      score: 0
    };

    try {
      // Add or update player in Firestore
      const playerRef = doc(collection(doc(collection(db, "rooms"), game.roomCode), "players"), my.playerID);
      await setDoc(playerRef, p, { merge: true });

      // Update my player index
      const playersSnap = await getDocs(collection(doc(collection(db, "rooms"), game.roomCode), "players"));
      const players = playersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      my.playerIndex = players.findIndex(player => player.playerID === my.playerID);
      
      ui.nameEntered = true;
      
      console.log("Player info updated:", p);
    } catch (error) {
      console.error("Error updating player info:", error);
    }
  };

  const sendPlayerUpdate = async () => {
    // This is now handled automatically through Firestore subscriptions
    try {
      const playerRef = doc(collection(doc(collection(db, "rooms"), game.roomCode), "players"), my.playerID);
      await updateDoc(playerRef, {
        lastSeen: serverTimestamp(),
        isConnected: true
      });
    } catch (error) {
      console.error("Error sending player update:", error);
    }
  };

  const changeDeck = () => {
    if (ui.deckName == "EVERYTHING!") {
      let cardStack = [];
      game.allDecks.forEach(function (deck) {
        cardStack = cardStack.concat(deck.cards);
      });
      game.chosenDeck = {
        name: "EVERYTHING!",
        description:
          "I don't wanna choose! Just shuffle in all the cards and let's see what happens...",
        cards: cardStack,
      };
    } else {
      let chosenDeck = game.allDecks.filter((deck) => deck.name == ui.deckName);
      game.chosenDeck = chosenDeck[0];
    }
  };

  const startTheGame = async () => {
    let d = shuffle(game.chosenDeck.cards);
    game.gameDeck.cards = d;
    dealOutCards();

    if (game.players.length == 3 || game.players.length == 4) {
      game.maxRounds = 4;
    } else if (game.players.length == 5 || game.players.length == 6) {
      game.maxRounds = 3;
    } else if (game.players.length > 6) {
      game.maxRounds = 2;
    }

    try {
      // Update game state in Firestore
      const gameStateRef = doc(collection(doc(collection(db, "rooms"), game.roomCode), "gameState"), "current");
      await updateDoc(gameStateRef, {
        started: true,
        phase: "presenting",
        currentRound: 1,
        maxRounds: game.maxRounds,
        gameDeck: game.gameDeck,
        chosenDeck: game.chosenDeck,
        dealerIndex: 0,
        activePlayerIndex: -1
      });

      // Update all players with their cards
      const playersRef = collection(doc(collection(db, "rooms"), game.roomCode), "players");
      const playersSnap = await getDocs(playersRef);
      
      let cardIndex = 0;
      for (const playerDoc of playersSnap.docs) {
        await updateDoc(playerDoc.ref, {
          card: game.players[cardIndex].card,
          playerIndex: cardIndex
        });
        cardIndex++;
      }

      sendEvent("The Wrongest Words", "Game Started", game.roomCode);
      console.log("Game started successfully");
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };
  ////////////////////////////////////////
  // In Game
  const dealOutCards = () => {
    if (game.gameDeck.cards.length <= computedPlayerCount.value) {
      ////////////////////////////////////////////////////////////
      // You've run out of cards.
      // EMERGENCY BACKUP SCENARIO.
      let newDeck = randomFrom(allDecks);
      let d = shuffle(newDeck.cards);
      game.gameDeck.cards = d;

      let instance = Vue.$toast.open({
        message:
          "<div style='max-width:32ch; line-height:150%;'><h3 style='font-size:130%; margin-bottom:1em;'>You've run out of cards.</h3>As such, I've chosen a new deck and shuffled that for you.</div>",
        type: "info",
        duration: 50000,
      });
    }

    game.players.forEach(function (player, index) {
      game.players[index].card = game.gameDeck.cards[0];
      game.gameDeck.cards.shift();
    });
  };

  const sendGameDeck = async () => {
    try {
      const gameStateRef = doc(collection(doc(collection(db, "rooms"), game.roomCode), "gameState"), "current");
      await updateDoc(gameStateRef, {
        gameDeck: game.gameDeck,
      });
    } catch (error) {
      console.error("Error sending game deck:", error);
    }
  };

  const dealCard = async () => {
    round.activePlayerIndex++;
    try {
      const gameStateRef = doc(collection(doc(collection(db, "rooms"), game.roomCode), "gameState"), "current");
      await updateDoc(gameStateRef, {
        activePlayerIndex: round.activePlayerIndex,
        phase: "presenting"
      });
      soundBeginTalking.play();
      console.log(`Player ${round.activePlayerIndex} is now presenting`);
    } catch (error) {
      console.error("Error starting presentation:", error);
    }
  };

  const presentationFinished = async () => {
    round.playerPresenting = false;
    resetPresentationTimer();
    
    try {
      const cardData = {
        card: game.players[round.activePlayerIndex].card,
        playerIndex: round.activePlayerIndex,
        playerName: game.players[round.activePlayerIndex].name,
        score: 0,
      };

      const gameStateRef = doc(collection(doc(collection(db, "rooms"), game.roomCode), "gameState"), "current");
      await updateDoc(gameStateRef, {
        cardsPresented: [...round.cardsPresented, cardData]
      });
      
      soundPresentationOver.play();
      console.log("Presentation finished for player", round.activePlayerIndex);
    } catch (error) {
      console.error("Error finishing presentation:", error);
    }
  };

  /////////////////////////////////////////
  // Voting
  const startVoting = async () => {
    try {
      const gameStateRef = doc(collection(doc(collection(db, "rooms"), game.roomCode), "gameState"), "current");
      await updateDoc(gameStateRef, {
        phase: "voting",
        cardsPresented: round.cardsPresented
      });
      console.log("Voting phase started");
    } catch (error) {
      console.error("Error starting voting:", error);
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

    try {
      const voteData = {
        votingPlayerIndex: my.playerIndex,
        votingPlayerName: my.name,
        downVoteIndex: downVoteIndex,
        upVoteIndex: upVoteIndex,
        downVoteCard: downVoteCard,
        upVoteCard: upVoteCard,
        timestamp: serverTimestamp()
      };

      // Add individual vote record
      const votesRef = collection(doc(collection(db, "rooms"), game.roomCode), "votes");
      await addDoc(votesRef, voteData);

      // Update game state with incremented vote count
      const gameStateRef = doc(collection(doc(collection(db, "rooms"), game.roomCode), "gameState"), "current");
      await updateDoc(gameStateRef, {
        votesSubmitted: increment(1)
      });

      ui.iVoted = true;
      sendEvent("The Wrongest Words", "Downvote", downVoteCard);
      sendEvent("The Wrongest Words", "Upvote", upVoteCard);
      
      console.log("Votes submitted:", voteData);
    } catch (error) {
      console.error("Error submitting votes:", error);
    }
  };

  const startNextRound = async () => {
    game.players.push(game.players.shift());
    round.number += 1;
    dealOutCards();
    const s = game.statementHistory.concat(round.cardsPresented);
    game.statementHistory = s;
    
    try {
      const gameStateRef = doc(collection(doc(collection(db, "rooms"), game.roomCode), "gameState"), "current");
      await updateDoc(gameStateRef, {
        currentRound: round.number,
        gameDeck: game.gameDeck,
        statementHistory: game.statementHistory,
        phase: "presenting",
        activePlayerIndex: -1,
        cardsPresented: [],
        votesSubmitted: 0
      });

      // Update player cards and positions
      const playersRef = collection(doc(collection(db, "rooms"), game.roomCode), "players");
      const playersSnap = await getDocs(playersRef);
      
      let cardIndex = 0;
      for (const playerDoc of playersSnap.docs) {
        await updateDoc(playerDoc.ref, {
          card: game.players[cardIndex].card,
          playerIndex: cardIndex
        });
        cardIndex++;
      }
      
      console.log("Next round started:", round.number);
    } catch (error) {
      console.error("Error starting next round:", error);
    }
  };

  const sendGameOver = async () => {
    const s = game.statementHistory.concat(round.cardsPresented);
    game.statementHistory = s;
    
    try {
      const gameStateRef = doc(collection(doc(collection(db, "rooms"), game.roomCode), "gameState"), "current");
      await updateDoc(gameStateRef, {
        gameOver: true,
        phase: "GAME OVER",
        statementHistory: game.statementHistory,
        currentRound: round.number
      });
      
      console.log("Game over");
    } catch (error) {
      console.error("Error sending game over:", error);
    }
  };

  ////////////////////////////////////////
  // Timers
  const startPresentationTimer = () => {
    function amIPresenting() {
      if (
        round.playerPresenting == true &&
        round.activePlayerIndex == my.playerIndex
      ) {
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
      if (
        round.playerPresenting == true &&
        round.activePlayerIndex == my.playerIndex
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (game.gameStarted && amIPresenting()) {
      let t = txt
        .replace("{", '<span class="secret-text">')
        .replace("}", "</span>");
      return t;
    } else if (
      round.phase == "presenting" &&
      round.activePlayerIndex < my.playerIndex
    ) {
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
    ui.upVote = "";
    ui.downVote = "";
    ui.iVoted = false;
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
    if (
      round.playerPresenting == true &&
      round.activePlayerIndex == my.playerIndex
    ) {
      return true;
    } else {
      return false;
    }
  });

  const computedCanIAdvanceTheGame = computed(() => {
    if (round.phase == "presenting") {
      if (
        round.activePlayerIndex + 1 == my.playerIndex &&
        !round.playerPresenting
      ) {
        // I'm next to play, I see a button.
        return true;
      } else if (
        my.playerIndex == 0 &&
        game.players.length == round.activePlayerIndex + 1 &&
        !round.playerPresenting
      ) {
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
    let leastWrongList = sortedListAll.filter(
      (statement) => statement.score >= sortedListAll[0].score,
    );
    let wrongestList = sortedListAll.filter(
      (statement) =>
        statement.score <= sortedListAll[sortedListAll.length - 1].score,
    );

    return {
      wrongest: wrongestList,
      wrongestCount: wrongestList.length,
      leastWrong: leastWrongList,
      leastWrongCount: leastWrongList.length,
      all: sortedListAll,
      allCount: sortedListAll.length,
    };
  });

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Firebase listeners and game state management
  
  // Additional Firebase subscription for vote processing
  async function subscribeToVotes(roomCode) {
    const votesRef = collection(doc(collection(db, "rooms"), roomCode), "votes");
    
    onSnapshot(votesRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const voteData = change.doc.data();
          
          // Process the vote
          game.voteHistory.push({
            downVoteIndex: voteData.downVoteIndex,
            voterName: voteData.votingPlayerName,
            voted: "down",
            presenter: round.cardsPresented[voteData.downVoteIndex]?.playerName,
            card: round.cardsPresented[voteData.downVoteIndex]?.card,
          });

          game.voteHistory.push({
            upVoteIndex: voteData.upVoteIndex,
            voterName: voteData.votingPlayerName,
            voted: "up",
            presenter: round.cardsPresented[voteData.upVoteIndex]?.playerName,
            card: round.cardsPresented[voteData.upVoteIndex]?.card,
          });
          
          // Update scores (this should ideally be done server-side with Cloud Functions)
          if (game.players[voteData.downVoteIndex]) {
            game.players[voteData.downVoteIndex].score -= 1;
          }
          if (round.cardsPresented[voteData.downVoteIndex]) {
            round.cardsPresented[voteData.downVoteIndex].score -= 1;
          }
          
          if (game.players[voteData.upVoteIndex]) {
            game.players[voteData.upVoteIndex].score += 1;
          }
          if (round.cardsPresented[voteData.upVoteIndex]) {
            round.cardsPresented[voteData.upVoteIndex].score += 1;
          }
        }
      });
    });
  }

  // Watch for game state changes to trigger specific actions
  let lastGameState = {};

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Mounted
  onMounted(() => {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("create")) {
      createRoom();
    } else if (urlParams.has("room")) {
      game.roomCode = urlParams.get("room").toUpperCase();
      let url = new URL(
        location.protocol + "//" + location.host + location.pathname,
      );
      url.searchParams.set("room", game.roomCode);
      window.history.pushState({}, "", url);
      
      // Join the room immediately
      joinRoom();
    } else if (urlParams.has("join")) {
      document.getElementById("EnterRoomCode").focus();
    }

    // Clean up subscriptions when component unmounts
    onBeforeUnmount(() => {
      if (unsubscribeRoom) unsubscribeRoom();
      if (unsubscribeGameState) unsubscribeGameState();
    });

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
