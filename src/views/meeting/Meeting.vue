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

  const timeToScore = 10000;
  const badGuessPenalty = 4;
  const fakePlayerCount = 3;
  const cardsPerPlayer = 4; // Number of cards each player will get
  const game = reactive({
    roomCode: "",
    isGameStarted: false,
    deck: [],
    players: [],
  });
  const you = reactive({
    isRoomHost: false,
    hand: [],
    isCurrentlyPlayingACard: false,
    currentCard: {},
    score: 0,
    guess: "",
    stolenCards: [],
  });
  const timer = ref(0); // Reactive reference to store timer value
  let interval = null; // Store the interval ID

  const generateFakePlayers = () => {
    while (game.players.length < fakePlayerCount) {
      const randomCelebrity = randomFrom(allValues);

      let i = 0;
      game.players.push({
        id: randomNumber(1000, 10000),
        name: randomCelebrity.name,
        hand: [],
        // knownHand: playerHand,
        score: 0,
      });
    }
  };

  const dealTheCards = () => {
    const totalPlayers = game.players.length + 1; // Including you
    const totalCardsNeeded = totalPlayers * cardsPerPlayer;

    if (game.deck.length < totalCardsNeeded) {
      console.error("Not enough cards to deal");
      return;
    }

    // Deal cards to your hand
    for (let i = 0; i < cardsPerPlayer; i++) {
      let newCard = game.deck.shift(); // Remove the first card from the deck
      newCard.status = "unplayed";
      you.hand.push(newCard);
    }

    // // Deal cards to each player's hand
    game.players.forEach((player) => {
      for (let i = 0; i < cardsPerPlayer; i++) {
        let newCard = game.deck.shift(); // Remove the first card from the deck
        newCard.status = "unplayed";

        // Fake some statuses for these cards....
        const r = randomNumber(1, 10);
        let cardStatus;
        if (r < 6) {
          cardStatus = "unplayed";
        } else if (r < 8) {
          cardStatus = "played";
          player.score += newCard.points;
          alert;
        } else {
          cardStatus = "stolen";
        }
        newCard.status = cardStatus;
        player.hand.push(newCard);
      }
    });
  };

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
        // alert("hi");
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
    you.score += card.points;
    card.status = "played";
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
        if (card.phrase.toLowerCase() === yourGuess) {
          actualPhrase = card.phrase;
          if (card.status === "stolen") {
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
              playerId: player.id,
              playerName: player.name,
            };
            card.status = "stolen";
            card.stolenBy = "Vladimir Fakename";
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
            // points: match.points,
            message: `${actualPhrase ?? yourGuess} has already been stolen by ${stolenBy}.`,
          },
        },
        {
          position: POSITION.BOTTOM_RIGHT,
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
          position: POSITION.BOTTOM_RIGHT,
          toastClassName: "yellow",
          timeout: 8000,
          icon: false,
        },
      );
      you.guess = "";
    } else {
      // Check through the user's own hand
      for (const card of you.hand) {
        if (card.phrase.toLowerCase() === yourGuess) {
          severelyPenalizeTerribleGuess(card);
          return;
        }
      }
      penalizeBadGuess();
    }
  };

  const penalizeBadGuess = () => {
    you.score -= badGuessPenalty;
    toast(
      {
        component: MyToast,
        props: {
          title: "Nope!",
          points: 0 - badGuessPenalty,
          message: `Nobody had ${you.guess}.`,
        },
      },
      {
        position: POSITION.BOTTOM_RIGHT,
        toastClassName: "red",
        timeout: 8000,
        icon: false,
      },
    );
    you.guess = "";
  };

  const severelyPenalizeTerribleGuess = (card) => {
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
        position: POSITION.BOTTOM_RIGHT,
        toastClassName: "red",
        timeout: 8000,
        icon: false,
      },
    );
    you.guess = "";
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
    console.table(match);
    you.score += match.points;
    you.stolenCards.push({
      phrase: match.phrase,
      stolenFrom: {
        id: match.id,
        name: match.playerName,
        index: match.playerIndex,
      },
    });
    you.guess = "";
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

    socket.emit("createMeetingLobby", {
      roomCode: game.roomCode,
    });

    let url = new URL(
      location.protocol + "//" + location.host + location.pathname,
    );
    url.searchParams.set("room", game.roomCode);
    window.history.pushState({}, "", url);
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

  // game.players = [{"name":"Roger Stone","hand":[{"phrase":"\"true out of the box thinking\"","points":15,"status":"stolen"},{"phrase":"\"exactly six dollars\"","points":15,"status":"stolen"},{"phrase":"\"bite the bullet\"","points":15,"status":"unplayed"},{"phrase":"Sriracha","points":10,"status":"played"}],"score":10},{"name":"Ted DiBiase","hand":[{"phrase":"\"haters gonna hate\"","points":15,"status":"stolen"},{"phrase":"Sonia Sotomayor","points":30,"status":"unplayed"},{"phrase":"stickers","points":10,"status":"unplayed"},{"phrase":"1947","points":30,"status":"stolen"}],"score":0},{"name":"Kent “Toast” French","hand":[{"phrase":"stuffed animal","points":10,"status":"unplayed"},{"phrase":"Sufjan Stevens","points":30,"status":"unplayed"},{"phrase":"\"thrown under the bus\"","points":15,"status":"stolen"},{"phrase":"Alaska","points":10,"status":"unplayed"}],"score":0}]

  onMounted(() => {
    createRoom();

    // game.deck = shuffle(allCards);

    /*
    generateFakePlayers();
    dealTheCards(); // Call the dealTheCards function here
    */
  });
</script>
<template lang="pug" src="./Meeting.pug"></template>
<style lang="scss" src="./Meeting.scss"></style>
