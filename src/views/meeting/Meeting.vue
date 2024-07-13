<script setup>
  import { onMounted, reactive, ref, computed } from "vue";
  import { allCards } from "./js/_allCards";
  import {
    randomNumber,
    randomFrom,
    shuffle,
    preceisePercentOf,
    // percentOf,
    // addCommas,
    // findInArray,
    // removeFromArray,
    // sendEvent,
    // dollars,
  } from "@/shared/js/_functions.js";
  import { allValues } from "../cameo/js/_values.js";

  // Toasts
  import Toast, { POSITION } from "vue-toastification";
  import "vue-toastification/dist/index.css";
  import MyToast from "./vue/MyToast.vue";
  import LemonToast from "./vue/LemonToast.vue";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  // socket.io
  import { io } from "socket.io-client";
  const socket = io.connect();

  import {
    gameName,
    timeToScore,
    badGuessPenalty,
    fakePlayerCount,
    cardsPerPlayer,
    game,
    you,
  } from "./js/_variables";
  const timer = ref(0); // Reactive reference to store timer value
  let interval = null; // Store the interval ID

  const savePlayerInfo = () => {
    you.name = you.nameInput;
    you.jobTitle = you.jobTitleInput;

    let playerFound = false;

    // Loop through each player in game.players
    for (let player of game.players) {
      if (player.socketID === you.socketID) {
        // Update player information if socketID matches
        player.name = you.name;
        player.jobTitle = you.jobTitle;
        player.isHost = you.isHost;
        playerFound = true;
        break;
      }
    }

    // If you.socketID isn't found in any of the players, add a new player
    if (!playerFound) {
      game.players.push({
        name: you.name,
        jobTitle: you.jobTitle,
        socketID: you.socketID,
        isHost: you.isHost,
        score: 0,
      });
    }

    socket.emit("sendPlayerList", {
      roomCode: game.roomCode,
      from: you.socketID,
      players: game.players,
    });
  };

  // const generateFakePlayers = () => {
  //   while (game.players.length < fakePlayerCount) {
  //     const randomCelebrity = randomFrom(allValues);

  //     let i = 0;
  //     game.players.push({
  //       id: randomNumber(1000, 10000),
  //       name: randomCelebrity.name,
  //       hand: [],
  //       // knownHand: playerHand,
  //       score: 0,
  //     });
  //   }

  // };

  const shuffleUpAndDeal = () => {
    game.deck = shuffle([...allCards]);

    const totalPlayers = game.players.length;
    const totalCardsNeeded = totalPlayers * cardsPerPlayer;
    if (game.deck.length < totalCardsNeeded) {
      console.error("Not enough cards to deal");
      alert("Not enough cards to deal");
      return;
    }

    // // Deal cards to each player's hand
    game.players.forEach((player) => {
      player.hand = [];
      for (let i = 0; i < cardsPerPlayer; i++) {
        let newCard = game.deck.shift(); // Remove the first card from the deck
        newCard.status = "unplayed";
        player.hand.push(newCard);
      }
    });

    socket.emit("startTheGame", {
      roomCode: game.roomCode,
      from: you.socketID,
      players: game.players,
    });
  };

  // const dealTheCards = () => {
  //   const totalPlayers = game.players.length + 1; // Including you
  //   const totalCardsNeeded = totalPlayers * cardsPerPlayer;

  //   if (game.deck.length < totalCardsNeeded) {
  //     console.error("Not enough cards to deal");
  //     return;
  //   }

  //   // Deal cards to your hand
  //   for (let i = 0; i < cardsPerPlayer; i++) {
  //     let newCard = game.deck.shift(); // Remove the first card from the deck
  //     newCard.status = "unplayed";
  //     you.hand.push(newCard);
  //   }

  //   // // Deal cards to each player's hand
  //   game.players.forEach((player) => {
  //     for (let i = 0; i < cardsPerPlayer; i++) {
  //       let newCard = game.deck.shift(); // Remove the first card from the deck
  //       newCard.status = "unplayed";

  //       // Fake some statuses for these cards....
  //       const r = randomNumber(1, 10);
  //       let cardStatus;
  //       if (r < 6) {
  //         cardStatus = "unplayed";
  //       } else if (r < 8) {
  //         cardStatus = "played";
  //         player.score += newCard.points;
  //         alert;
  //       } else {
  //         cardStatus = "stolen";
  //       }
  //       newCard.status = cardStatus;
  //       player.hand.push(newCard);
  //     }
  //   });
  // };

  const playThisCard = (card) => {
    you.currentCard = card;
    you.isCurrentlyPlayingACard = true;
    if (interval) {
      clearInterval(interval); // Clear any existing interval
    }
    card.status = "playing";
    timer.value = timeToScore;
    interval = setInterval(() => {
      timer.value -= 10; // Decrease timer by 10 milliseconds

      if (timer.value <= 0) {
        clearInterval(interval); // Clear the interval when timer reaches 0
        scoreThisCard(card);
      }
    }, 10);
  };

  const scoreThisCard = (card) => {
    you.currentCard = {};
    you.isCurrentlyPlayingACard = false;
    toast(
      {
        component: MyToast,
        props: {
          points: card.points,
          message: `nobody caught you saying “${card.phrase}”.`,
        },
      },
      {
        position: POSITION.BOTTOM_LEFT,
        toastClassName: "green",
        timeout: 8000,
        icon: false,
      },
    );
    findMe().score += card.points;
    card.status = "played";

    socket.emit("sendPlayerUpdate", {
      roomCode: game.roomCode,
      from: you.socketID,
      socketID: you.socketID,
      score: findMe().score,
      scoredCard: card,
      toast: {
        message: `${you.name} just scored a card and got ${card.points} points.`,
      },
    });
  };

  // const you = reactive({
  //   hand: [
  //     { phrase: "stickers", points: 10, status: "unplayed" },
  //     { phrase: "cold press coffee", points: 10, status: "unplayed" },
  //     { phrase: '"haters gonna hate"', points: 15, status: "unplayed" },
  //     { phrase: '"hot dog!"', points: 10, status: "unplayed" },
  //   ],
  //   isCurrentlyPlayingACard: false,
  //   currentCard: {},
  //   score: -8,
  //   guess: "",
  //   stolenCards: [],
  // });

  const performGuess = () => {
    const yourGuess = you.guess.toLowerCase();
    let match = null;
    let matchFound = false;
    let stolenBy = "";
    let alreadyScoredBy = "";
    let actualPhrase = "";

    // Go through every player's hand in game.players
    for (
      let playerIndex = 0;
      playerIndex < game.players.length;
      playerIndex++
    ) {
      const player = game.players[playerIndex];
      for (const card of player.hand) {
        if (
          card.phrase.toLowerCase() === yourGuess ||
          (card.alternates &&
            card.alternates.some((alt) => alt.toLowerCase() === yourGuess))
        ) {
          actualPhrase = card.phrase;
          if (player.socketID === you.socketID) {
            severelyPenalizeTerribleGuess(card);
            matchFound = true;
          } else if (card.status === "stolen") {
            stolenBy = card.stolenBy;
            matchFound = true;
          } else if (card.status === "played") {
            alreadyScoredBy = player.name;
            matchFound = true;
          } else {
            // Create an object called match with the card, playerIndex, and player.name
            match = {
              ...card,
              status: "stolen",
              playerIndex,
              socketID: player.socketID,
              playerName: player.name,
            };
            card.status = "stolen";
            card.stolenBy = you.name;
            matchFound = true;
          }
          break;
        }
      }
      if (match) break; // Exit the loop early if a match is found
    }

    if (matchFound && match) {
      rewardGoodGuess(match);
    } else if (stolenBy) {
      toast(
        {
          component: MyToast,
          props: {
            title: "Too Late!",
            message: `${actualPhrase ?? yourGuess} has already been stolen by ${stolenBy}.`,
          },
        },
        {
          position: POSITION.BOTTOM_LEFT,
          toastClassName: "yellow",
          timeout: 8000,
          icon: false,
        },
      );
    } else if (alreadyScoredBy) {
      toast(
        {
          component: MyToast,
          props: {
            title: "Too Late!",
            // points: match.points,
            message: `${actualPhrase ?? yourGuess} has already been scored by ${alreadyScoredBy}.`,
          },
        },
        {
          position: POSITION.BOTTOM_LEFT,
          toastClassName: "yellow",
          timeout: 8000,
          icon: false,
        },
      );
    } else if (!matchFound) {
      penalizeBadGuess(yourGuess);
    }
    you.guess = "";
  };

  const findMe = () => {
    const myPlayerObject = game.players.find(
      (player) => player.socketID === you.socketID,
    );
    if (!myPlayerObject) {
      return {
        hand: [],
        isHost: false,
        name: "",
        jobTitle: "",
        score: "",
        socketID: "",
      };
    } else {
      return myPlayerObject;
    }
  };

  const penalizeBadGuess = (yourGuess) => {
    const yourLoss = 0 - badGuessPenalty;
    findMe().score -= badGuessPenalty;
    toast(
      {
        component: MyToast,
        props: {
          title: "Nope!",
          points: yourLoss,
          message: `Nobody had ${you.guess}.`,
        },
      },
      {
        position: POSITION.BOTTOM_LEFT,
        toastClassName: "red",
        timeout: 8000,
        icon: false,
      },
    );
    you.guess = "";

    socket.emit("sendPlayerUpdate", {
      roomCode: game.roomCode,
      from: you.socketID,
      socketID: you.socketID,
      score: findMe().score,
      toast: {
        message: `${findMe().name} lost ${badGuessPenalty} for a bad guess`,
      },
    });
  };

  const severelyPenalizeTerribleGuess = (card) => {
    const yourLoss = 0 - card.points;
    findMe().score -= card.points;
    toast(
      {
        component: MyToast,
        props: {
          title: "You idiot!",
          points: 0 - card.points,
          message: `${card.phrase} was one of YOUR cards!!! I'm subtracting ${card.points} points from your score. Pay attention next time.`,
        },
      },
      {
        position: POSITION.BOTTOM_LEFT,
        toastClassName: "red",
        timeout: 8000,
        icon: false,
      },
    );
    you.guess = "";
    socket.emit("sendPlayerUpdate", {
      roomCode: game.roomCode,
      from: you.socketID,
      socketID: you.socketID,
      score: findMe().score,
      toast: {
        message: `${findMe().name} lost ${card.points} for trying to guess their own card`,
      },
    });
  };

  const rewardGoodGuess = (match) => {
    toast(
      {
        component: MyToast,
        props: {
          title: "Got 'em!",
          points: match.points,
          message: `${match.playerName} had ${match.phrase}.`,
        },
      },
      {
        position: POSITION.BOTTOM_LEFT,
        toastClassName: "green",
        timeout: 8000,
        icon: false,
      },
    );
    findMe().score += match.points;
    you.stolenCards.push({
      phrase: match.phrase,
      points: match.points,
      stolenFrom: {
        playerName: match.playerName,
        socketID: match.socketID,
      },
    });

    socket.emit("sendPlayerUpdate", {
      roomCode: game.roomCode,
      from: you.socketID,
      socketID: you.socketID,
      score: findMe().score,
      stolenCard: match,
    });

    // console.table(match);
    // you.score += match.points;
    // you.stolenCards.push({
    //   phrase: match.phrase,
    //   stolenFrom: {
    //     id: match.id,
    //     name: match.playerName,
    //     index: match.playerIndex,
    //   },
    // });
    // you.guess = "";
  };

  const createRoom = () => {
    function makeID(digits) {
      let text = "";
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < digits; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
    game.roomCode = makeID(4);

    socket.emit("createRoom", {
      roomCode: game.roomCode,
      gameName: gameName,
    });

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
      gameName: gameName,
    });

    socket.emit("askHostForPlayersList", {
      roomCode: game.roomCode,
      from: you.socketID,
    });

    // you.isCurrentlyPlayingACard = true;
    // let url = new URL(
    //   location.protocol + "//" + location.host + location.pathname,
    // );
    // url.searchParams.set("room", game.roomCode);
    // window.history.pushState({}, "", url);
  };

  const prettyTimerOutput = computed(() => {
    if (!timer || timer.value < 3) {
      return "";
    }
    if (timer.value) {
      const splitSeconds = (timer.value / 1000).toFixed(2).split(".");
      const s = splitSeconds[0].padStart(2, 0);
      const ms = splitSeconds[1];
      return `<span class="s">${s}</span><sup class="ms">${ms}</sup>`;
    }
  });

  const timerProgressPercent = computed(() => {
    if (!timer || timer.value < 3) {
      return "";
    }
    if (timer.value) {
      const pct = 100 - Number(preceisePercentOf(timeToScore, timer.value));
      return pct;
    }
  });

  const computedPlayerHand = computed(() => {
    // Loop through all the players in game.players
    for (let player of game.players) {
      // If player.socketID matches you.socketID, return the player.hand array
      if (player.socketID === you.socketID) {
        return player.hand;
      }
    }
    // Return an empty array if no match is found
    return [];
  });

  socket.on("hostSelected", (hostSocketId) => {
    console.log(`Host selected: ${hostSocketId}`);
    if (socket.id === hostSocketId) {
      you.isHost = true;
      console.log("You are the host!");
    } else {
      you.isHost = false;
      console.log("You are not the host.");
    }
    // Add any additional logic for the host or non-host here
  });

  socket.on("receivePlayerList", (msg) => {
    console.log(`Receiving new player list from  ${msg.from}`);
    // console.table(msg.players);
    game.players = msg.players;
    game.isGameStarted = msg.isGameStarted;
  });

  socket.on("sendThePlayerListIfYouAreHost", (msg) => {
    console.log(`Player List request from  ${msg.from}`);
    if (you.isHost) {
      socket.emit("sendPlayerList", {
        roomCode: game.roomCode,
        from: you.socketID,
        players: game.players,
        isGameStarted: game.isGameStarted,
      });
    }
  });

  socket.on("handleDisconnectIfYouAreHost", (socketID) => {
    console.log("SOMEBODY DISCONNECTED!");
    if (you.isHost) {
      console.log("And I'm the host");
      // Find the index of the player with the matching socketID
      const playerIndex = game.players.findIndex(
        (player) => player.socketID === socketID,
      );
      if (playerIndex !== -1) {
        console.log("I'm removing that player from the player list");
        game.players.splice(playerIndex, 1);
      }
      console.log("And now I'm updating the other players.");
      socket.emit("sendPlayerList", {
        roomCode: game.roomCode,
        from: you.socketID,
        players: game.players,
      });
    }
  });

  socket.on("receiveStartGameMessage", (msg) => {
    console.log(`Receiving new player list from  ${msg.from}`);
    game.players = msg.players;
    game.isGameStarted = true;
  });

  socket.on("receivePlayerUpdate", (msg) => {
    console.log(`Receiving player update from ${msg.from}`);
    if (you.socketID == msg.from) {
      console.log("That's me. I'm ignoring it");
      return;
    }

    // Find the player in game.players whose socketID matches msg.socketID
    const player = game.players.find(
      (player) => player.socketID === msg.socketID,
    );
    if (player) {
      // Update the score if a new score came in the payload
      if (msg.score || msg.score === 0) {
        player.score = msg.score;
        console.log(
          `Updated score for player ${player.name} to ${player.score}`,
        );
      }

      // Mark the card played if it has been scored on
      if (msg.scoredCard) {
        game.players.some((p) =>
          p.hand.some((card) => {
            if (card.phrase === msg.scoredCard.phrase) {
              card.status = "played";
              return true; // Exit the loop once a match is found
            }
          }),
        );
      }

      // Mark the card stolen if somebody guessed it before it was scored.
      if (msg.stolenCard) {
        game.players.some((p) =>
          p.hand.some((card) => {
            if (card.phrase === msg.stolenCard.phrase) {
              card.status = "stolen";
              return true; // Exit the loop once a match is found
            }
          }),
        );

        // Is somebody stealing YOUR card!??
        if (msg.stolenCard.phrase === you.currentCard.phrase) {
          clearInterval(interval);
          timer.value = 0;
          you.currentCard = {};
          you.isCurrentlyPlayingACard = false;
        }

        // Send a different toast, depending on if you were robbed or not.
        if (msg.stolenCard.socketID === you.socketID) {
          toast(
            {
              component: MyToast,
              props: {
                title: `You got robbed!`,
                points: msg.stolenCard.points,
                message: `${player.name} just scored your ${msg.stolenCard.phrase} card`,
              },
            },
            {
              position: POSITION.BOTTOM_RIGHT,
              toastClassName: "red",
              timeout: 8000,
              icon: false,
            },
          );
        } else {
          toast(
            `${player.name} just stole a card from ${msg.stolenCard.playerName} for ${msg.stolenCard.points}`,
            {
              timeout: 6000,
            },
          );
        }
      }

      // Show a toast if the payload says so.
      if (msg.toast && msg.toast.message) {
        toast(msg.toast.message, {
          timeout: 6000,
        });
      }
    } else {
      console.log("Player not found");
    }
  });

  onMounted(() => {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("create")) {
      createRoom();
    } else if (urlParams.has("room")) {
      game.roomCode = urlParams.get("room").toUpperCase();
      socket.on("connect", () => {
        you.socketID = socket.id;
        console.log(`Connected with socketId: ${socket.id}`);
        joinRoom();
      });
    }
  });
</script>
<template lang="pug" src="./Meeting.pug"></template>
<style lang="scss" src="./Meeting.scss"></style>
