<script setup>
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // IMPORTS
  import { reactive, computed, onMounted, getCurrentInstance } from "vue"; // Import reactive from Vue 3
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

  //////// socket.io
  // TODO: MIGRATION TO FIREBASE REQUIRED
  // This game currently uses Socket.IO for multiplayer functionality.
  // It needs to be migrated to use Firebase Firestore for real-time multiplayer.
  // See Issue #4 for the complete migration plan.
  // References:
  // - Invalid game (src/views/invalid/Invalid.vue) - Complete Firebase multiplayer implementation
  // - Meeting game (src/views/meeting/Meeting.vue) - Complete Firebase multiplayer implementation
  //
  // TEMPORARILY DISABLED until Firebase migration is complete
  // import { io } from "socket.io-client";
  // const socket = io.connect();
  
  // Stub socket object to prevent errors
  const socket = {
    emit: () => console.warn('Socket.IO disabled - game needs Firebase migration'),
    on: () => console.warn('Socket.IO disabled - game needs Firebase migration'),
    id: 'disabled'
  };

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
    socketID: "",
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
  const createRoom = () => {
    function makeID(digits) {
      let text = "";
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      for (let i = 0; i < digits; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    game.roomCode = makeID(4);

    // Create a room with the randomly generated code.
    socket.emit("createRoom", {
      roomCode: game.roomCode,
      gameName: game.gameName,
    });

    // Set your local variables.
    my.isRoomHost = true;
    game.inRoom = true;
    let url = new URL(
      location.protocol + "//" + location.host + location.pathname,
    );
    url.searchParams.set("room", game.roomCode);
    window.history.pushState({}, "", url);
  };

  const joinRoom = () => {
    // Try to join a room with the entered code.
    socket.emit("joinRoom", {
      roomCode: game.roomCode,
      gameName: game.gameName,
    });

    socket.emit("askHostForPlayersList", {
      roomCode: game.roomCode,
      from: my.socketID,
    });

    my.isRoomHost = false;
    game.inRoom = true;
  };

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
  const updateMyInfo = () => {
    const p = {
      name: my.name,
      socketID: my.socketID,
      card: "",
      score: 0,
    };

    // Put this player in the Player Array.
    if (!ui.nameEntered) {
      game.players.push(p);
    } else {
      my.playerIndex = -1;
      game.players.forEach(function (player, index) {
        if (player.socketID == my.socketID) {
          //alert('found one');
          game.players[index].name = my.name;
        }
      });
    }

    // find this player's playerIndex
    game.players.forEach(function (player, index) {
      if (player.socketID == my.socketID) {
        my.playerIndex = index;
      }
    });

    ui.nameEntered = true;
    sendPlayerUpdate();
    if (my.playerIndex < 0) {
      alert(
        "WARNING: I have a player index of " +
          my.playerIndex +
          "! This should not happen. I am a bug.",
      );
    }
  };

  const sendPlayerUpdate = () => {
    socket.emit("sendPlayerList", {
      roomCode: game.roomCode,
      from: my.socketID,
      players: game.players,
    });
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

  const startTheGame = () => {
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

    socket.emit("startTheGame", {
      roomCode: game.roomCode,
      gameName: game.gameName,
      players: game.players,
      gameDeck: game.gameDeck,
      maxRounds: game.maxRounds,
      chosenDeckName: game.chosenDeck.name,
    });

    sendEvent("The Wrongest Words", "Game Started", game.roomCode);
  };
  ////////////////////////////////////////
  // In Game
  const dealOutCards = () => {
    if (game.gameDeck.cards.length <= computedPlayerCount) {
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

  const sendGameDeck = () => {
    socket.emit("sendGameDeck", {
      roomCode: game.roomCode,
      gameDeck: game.gameDeck,
    });
  };

  const dealCard = () => {
    round.activePlayerIndex++;
    socket.emit("wrongestStartPresenting", {
      roomCode: game.roomCode,
      activePlayerIndex: round.activePlayerIndex,
      activePlayerName: game.players[round.activePlayerIndex].name,
    });
    soundBeginTalking.play();
  };

  const presentationFinished = () => {
    round.playerPresenting = false;
    resetPresentationTimer();
    socket.emit("wrongestDonePresenting", {
      roomCode: game.roomCode,
      activePlayerIndex: round.activePlayerIndex,
      activePlayerName: game.players[round.activePlayerIndex].name,
      activePlayerCard: game.players[round.activePlayerIndex].card,
    });
    soundPresentationOver.play();
  };

  /////////////////////////////////////////
  // Voting
  const startVoting = () => {
    socket.emit("wrongestStartVoting", {
      roomCode: game.roomCode,
      cardsPresented: round.cardsPresented,
    });
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

  const submitVotes = () => {
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

    socket.emit("wrongestSubmitVotes", {
      roomCode: game.roomCode,
      votingPlayerIndex: my.playerIndex,
      votingPlayerName: my.name,
      downVoteIndex: downVoteIndex,
      upVoteIndex: upVoteIndex,
      downVoteCard: downVoteCard,
      upVoteCard: upVoteCard,
    });

    ui.iVoted = true;
    sendEvent("The Wrongest Words", "Downvote", downVoteCard);
    sendEvent("The Wrongest Words", "Upvote", upVoteCard);
  };

  const startNextRound = () => {
    game.players.push(game.players.shift());
    round.number += 1;
    dealOutCards();
    const s = game.statementHistory.concat(round.cardsPresented);
    game.statementHistory = s;
    socket.emit("wrongestStartNextRound", {
      roomCode: game.roomCode,
      gameName: game.gameName,
      players: game.players,
      gameDeck: game.gameDeck,
      statementHistory: game.statementHistory,
      roundNumber: round.number,
    });
  };

  const sendGameOver = () => {
    const s = game.statementHistory.concat(round.cardsPresented);
    game.statementHistory = s;
    socket.emit("wrongestGameOver", {
      roomCode: game.roomCode,
      players: game.players,
      //gameDeck: game.gameDeck,
      statementHistory: game.statementHistory,
      roundNumber: round.number,
    });
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
    if (round.votesSubmitted >= computedPlayerCount) {
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
  // Sockets  (I can't easily move these into a file without annoying refactor)
  socket.on("hostSelected", (hostSocketId) => {
    console.log(`Host selected: ${hostSocketId}`);
    if (socket.id === hostSocketId) {
      my.isRoomHost = true;
      console.log("You are the host!");
    } else {
      my.isRoomHost = false;
      console.log("You are not the host.");
    }
  });

  socket.on("receivePlayerList", (msg) => {
    console.log(`Receiving new player list from  ${msg.from}`);
    game.players = msg.players;
  });

  socket.on("sendThePlayerListIfYouAreHost", (msg) => {
    if (my.isRoomHost && msg.from != my.socketID) {
      console.log(`Player List request from ${msg.from}`);
      socket.emit("sendPlayerList", {
        roomCode: game.roomCode,
        from: my.socketID,
        players: game.players,
        isGameStarted: game.gameStarted,
      });
    }
  });

  socket.on("receivePlayerList", (msg) => {
    console.log(`Receiving new player list from  ${msg.from}`);
    game.players = msg.players;
  });

  socket.on("getSocketID", function (msg) {
    console.info("Player socketID is " + msg);
    my.socketID = msg;
  });

  socket.on("startTheGame", function (msg) {
    game.players = msg.players;
    game.gameDeck = msg.gameDeck;
    game.chosenDeck.name = msg.chosenDeckName;
    game.maxRounds = msg.maxRounds;
    game.gameStarted = true;
    round.number = 1;
    round.dealerIndex = 0;
    round.phase = "presenting";

    // Assign my player index...
    game.players.forEach(function (player, index) {
      if (player.socketID == my.socketID) {
        my.playerIndex = index;
      }
    });

    //Grab my card.
    if (my.playerIndex > -1) {
      my.card = game.players[my.playerIndex].card;
    }

    changeFavicon("wrongest/favicons/favicon.ico");
  });

  // A player must present now!
  socket.on("wrongestStartPresenting", function (msg) {
    round.activePlayerIndex = msg.activePlayerIndex;
    round.playerPresenting = true;
    // UNUSED : activePlayerName
    startPresentationTimer();
  });

  // A player has finished presenting.
  socket.on("wrongestDonePresenting", function (msg) {
    round.cardsPresented.push({
      card: msg.activePlayerCard,
      playerIndex: msg.activePlayerIndex,
      playerName: msg.activePlayerName,
      score: 0,
    });
    round.playerPresenting = false;
    resetPresentationTimer();
  });

  // Voting begins
  socket.on("wrongestStartVoting", function (msg) {
    round.cardsPresented = msg.cardsPresented;
    round.phase = "voting";
  });

  socket.on("wrongestSubmitVotes", function (msg) {
    const dI = game.voteHistory.push({
      downVoteIndex: msg.downVoteIndex,
      voterName: msg.votingPlayerName,
      voted: "down",
      presenter: round.cardsPresented[msg.downVoteIndex].playerName,
      card: round.cardsPresented[msg.downVoteIndex].card,
    });

    game.voteHistory.push({
      upVoteIndex: msg.upVoteIndex,
      voterName: msg.votingPlayerName,
      voted: "up",
      presenter: round.cardsPresented[msg.upVoteIndex].playerName,
      card: round.cardsPresented[msg.upVoteIndex].card,
    });
    game.players[msg.downVoteIndex].score -= 1;
    round.cardsPresented[msg.downVoteIndex].score -= 1;

    game.players[msg.upVoteIndex].score += 1;
    round.cardsPresented[msg.upVoteIndex].score += 1;

    round.votesSubmitted += 1;

    if (round.votesSubmitted >= computedPlayerCount) {
      // This should be handled in the UI.
    }
  });

  // The host has started the game!
  socket.on("wrongestStartNextRound", function (msg) {
    game.players = msg.players;
    game.gameDeck = msg.gameDeck;
    round.number = msg.roundNumber;
    game.statementHistory = msg.statementHistory;
    resetRoundVariables();
    resetUIVariables();

    // Assign my player index...
    game.players.forEach(function (player, index) {
      if (player.socketID == my.socketID) {
        my.playerIndex = index;
      }
    });

    //Grab my card.
    if (my.playerIndex > -1) {
      my.card = game.players[my.playerIndex].card;
    }
  });

  socket.on("wrongestGameOver", function (msg) {
    game.players = msg.players;
    game.statementHistory = msg.statementHistory;
    resetRoundVariables();
    resetUIVariables();
    round.phase = "GAME OVER";
    game.gameOver = true;
    if (my.isRoomHost) {
      sendEvent("The Wrongest Words", "Game Over", game.roomCode);
    }
  });

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
      socket.on("connect", () => {
        console.log(`Connected with socketId: ${socket.id}`);
        my.socketID = socket.id;
        joinRoom();
      });
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
