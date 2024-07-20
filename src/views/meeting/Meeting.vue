<script setup>
  import { onMounted, reactive, ref, computed, watchEffect, watch } from "vue";
  import { allCards } from "./js/_allCards.ts";
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

  // Toasts
  import Toast, { POSITION } from "vue-toastification";
  import "vue-toastification/dist/index.css";
  import MyToast from "./vue/MyToast.vue";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  // socket.io
  import { setupSocketHandlers } from "./js/_socketHandlers";
  import { io } from "socket.io-client";
  const socket = io.connect();

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
  const gamePlayers = ref([]);

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
    const playersRef = collection(
      doc(collection(db, "rooms"), roomCode),
      "players",
    );
    // console.log("Players collection reference:", playersRef);

    const { data: playersCollection } = useCollection(playersRef, {
      wait: true,
    });

    watch(
      () => playersCollection.value,
      async (newPlayers) => {
        // console.log("New players:", newPlayers);

        if (newPlayers) {
          for (const player of newPlayers) {
            if (player.hand === undefined) {
              const handRef = collection(doc(playersRef, player.id), "hand");
              // console.log("Hand collection reference:", handRef);
              const handSnapshot = await getDocs(handRef);
              player.hand = handSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              // Subscribe to the player's hand collection for real-time updates
              onSnapshot(handRef, (snapshot) => {
                player.hand = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
              });
            }
          }
          gamePlayers.value = newPlayers;
        } else {
          gamePlayers.value = [];
        }
      },
      { immediate: true, deep: true },
    );
  }

  async function subscribeToGameStatus(roomCode) {
    const gameRef = doc(collection(db, "rooms"), roomCode);
    console.log("Game document reference:", gameRef);

    onSnapshot(
      gameRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          // console.log("Game status update:", data);
          game.isGameStarted = data.isGameStarted ?? false;
          game.roomCreatorID = data.roomCreatorID ?? "";
          game.isGameOver = data.isGameOver ?? false;
        } else {
          console.error("Game document does not exist.");
        }
      },
      (error) => {
        console.error("Error subscribing to game status:", error);
      },
    );
  }

  // Example function to set roomCode
  function setRoomCode(newRoomCode) {
    game.roomCode = newRoomCode;
  }

  import {
    gameName,
    timeToScore,
    badGuessPenalty,
    cardsPerPlayer,
    game,
    you,
  } from "./js/_variables";
  const timer = ref(0); // Reactive reference to store timer value
  let interval = null; // Store the interval ID

  const generateUniqueID = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateRoomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // const savePlayerInfo = () => {
  //   you.name = you.nameInput;
  //   you.jobTitle = you.jobTitleInput;

  //   let playerFound = false;

  //   const newPlayer = {
  //     name: you.name,
  //     jobTitle: you.jobTitle,
  //     score: 0,
  //     hand: [
  //       {
  //         phrase: `I like things that are kinda fun.`,
  //         points: 5,
  //         alternates: [
  //           "kinda.fun",
  //           "things that are kinda.fun",
  //           "i like things that are kinda.fun",
  //         ],
  //         stringMatch: "kinda fun",
  //       }
  //     ]
  //   }
  // };

  const savePlayerInfo = async () => {
    you.name = you.nameInput;
    you.jobTitle = you.jobTitleInput;

    const newPlayer = {
      name: you.name,
      jobTitle: you.jobTitle,
      score: 0,
    };

    const playersCollection = collection(db, "rooms", game.roomCode, "players");
    const playerQuery = query(
      playersCollection,
      where("playerID", "==", you.playerID),
    );
    const querySnapshot = await getDocs(playerQuery);

    let playerFound = false;

    if (!querySnapshot.empty) {
      // Update the existing player document
      querySnapshot.forEach(async (docSnapshot) => {
        const playerRef = doc(
          db,
          "rooms",
          game.roomCode,
          "players",
          docSnapshot.id,
        );
        await updateDoc(playerRef, {
          name: newPlayer.name,
          jobTitle: newPlayer.jobTitle,
        });
        playerFound = true;
      });
    }

    if (!playerFound) {
      const newPlayer = {
        name: you.name,
        jobTitle: you.jobTitle,
        score: 0,
      };

      // Create a new player document with an empty hand collection
      const playerRef = doc(
        db,
        "rooms",
        game.roomCode,
        "players",
        you.playerID,
      );
      await setDoc(playerRef, { ...newPlayer, playerID: you.playerID });
    }
  };

  const shuffleUpAndDeal = async () => {
    game.deck = shuffle([...allCards]);

    const totalPlayers = game.players.length;
    const totalCardsNeeded = totalPlayers * cardsPerPlayer;
    if (game.deck.length < totalCardsNeeded) {
      console.error("Not enough cards to deal");
      alert("Not enough cards to deal");
      return;
    }

    // Deal cards to each player's hand
    for (const player of game.players) {
      let playerHand = [];
      for (let i = 0; i < cardsPerPlayer; i++) {
        let newCard = game.deck.shift(); // Remove the first card from the deck
        newCard.status = "unplayed";
        playerHand.push(newCard);
      }
      // Create a collection called hand for this player, and add the documents defined in playerHand.
      const handCollectionRef = collection(
        db,
        `rooms/${game.roomCode}/players/${player.playerID}/hand`,
      );
      for (const card of playerHand) {
        const cardDocRef = doc(handCollectionRef);
        await setDoc(cardDocRef, card);
      }
    }

    // Set game.roomData.isGameStarted to true
    const roomRef = doc(db, `rooms/${game.roomCode}`);
    await updateDoc(roomRef, {
      isGameStarted: true,
    });

    // set game.roomData.isGameStarted to true
  };

  const playThisCard = (card) => {
    you.currentCard = { ...card };
    you.isCurrentlyPlayingACard = true;
    if (interval) {
      clearInterval(interval); // Clear any existing interval
    }
    const cardRef = doc(
      db,
      `rooms/${game.roomCode}/players/${you.playerID}/hand/${card.id}`,
    );
    updateDoc(cardRef, {
      status: "playing",
    });
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
          message: `Nobody called you out for saying “<strong>${card.phrase}</strong>”.`,
        },
      },
      {
        position: POSITION.BOTTOM_LEFT,
        toastClassName: "green",
        timeout: 8000,
        icon: false,
      },
    );

    const playerRef = doc(`rooms/${game.roomCode}/players/${you.playerID}`);
    updateDoc(playerRef, {
      score: increment(card.points),
    });

    const cardRef = doc(
      db,
      `rooms/${game.roomCode}/players/${you.playerID}/hand/${card.id}`,
    );
    updateDoc(cardRef, {
      status: "played",
    });
  };

  const performGuess = () => {
    const yourGuess = you.guess.toLowerCase().replace(/"/g, "");

    let isThatPhraseYours = false;
    let isAlreadyPlayed = false;
    let isAlreadyStolen = false;
    let isSuccess = false;
    let cardHolder = {};

    let match = {};

    // Loop through every player in gamePlayers
    outerLoop: for (const player of gamePlayers.value) {
      for (const card of player.hand) {
        const isExactMatch = card.phrase.toLowerCase() === yourGuess;
        const isAltMatch =
          card.alternates &&
          card.alternates.some((alt) => alt.toLowerCase() === yourGuess);
        const isStringMatch =
          card.stringMatch &&
          yourGuess.includes(card.stringMatch.toLowerCase());

        if (isExactMatch || isAltMatch || isStringMatch) {
          match = { ...card };
          cardHolder = { ...player };

          if (player.playerID === you.playerID) {
            isThatPhraseYours = true;
          } else if (card.status === "played") {
            isAlreadyPlayed = true;
          } else if (card.status === "stolen") {
            isAlreadyStolen = true;
          } else {
            isSuccess = true;
          }
          break outerLoop; // break out of both loops
        }
      }
    }

    if (isSuccess === true) {
      rewardGoodGuess(match, cardHolder);
    } else if (isAlreadyPlayed) {
      toast(
        {
          component: MyToast,
          props: {
            title: "Too Late!",
            // points: match.points,
            message: `“<strong>${match.phrase}</strong>” has already been scored.`,
          },
        },
        {
          position: POSITION.BOTTOM_LEFT,
          toastClassName: "yellow",
          timeout: 8000,
          icon: false,
        },
      );
    } else if (isAlreadyStolen) {
      toast(
        {
          component: MyToast,
          props: {
            title: "Too Late!",
            message: `“${actualPhrase ?? yourGuess}” has already been stolen.`,
          },
        },
        {
          position: POSITION.BOTTOM_LEFT,
          toastClassName: "yellow",
          timeout: 8000,
          icon: false,
        },
      );
    } else if (isThatPhraseYours) {
      severelyPenalizeTerribleGuess(match);
    } else {
      penalizeBadGuess(you.guess);
    }
    you.guess = "";
  };

  // const performGuess = () => {
  //   const yourGuess = you.guess.toLowerCase().replace(/"/g, "");

  //   let isThatPhraseYours = false;
  //   let isAlreadyPlayed = false;
  //   let isAlreadyStolen = false;
  //   let isSuccess = true;

  //   let match = {}

  //   // loop thru every player in gamePlayers
  //   // loop thru every card in the hand of each player
  //   // Try to find a match in one of the following ways...
  //   // 1. if the lowercase of card.phrase is equal to yourGuess (that's an exact match)
  //   // 2. card.alternates is an optional array. if the lowercase of any of those is equal to your guess, that's an alt match
  //   // 3. card.stringMatch is an optional string. If the text of yourGuess contains the full text of card.stringText, that's a partial match

  //   // If you find a match, define match as the card you just found.
  //   // Then....
  //   // 1. Check the player's playerID against you.playerID. If those are a match, set isThatPhraseYours = true;
  //   // 2. Check to see if the card status is marked to played. If it is, set isAlreadyPlayed = true
  //   // 3. Check to see if the card status is set to to stolen. If it is, set isAlreadyStolen = true;
  //   // 4. If none of the above, set isSuccess true.

  //   if (isSuccess === true) {
  //     rewardGoodGuess(match);
  //   } else if (isAlreadyPlayed) {
  //     toast(
  //       {
  //         component: MyToast,
  //         props: {
  //           title: "Too Late!",
  //           // points: match.points,
  //           message: `“<strong>${match.phrase}</strong>” has already been scored.`,
  //         },
  //       },
  //       {
  //         position: POSITION.BOTTOM_LEFT,
  //         toastClassName: "yellow",
  //         timeout: 8000,
  //         icon: false,
  //       },
  //     );
  //   } else if (isAlreadyStolen) {
  //     toast(
  //       {
  //         component: MyToast,
  //         props: {
  //           title: "Too Late!",
  //           message: `“${actualPhrase ?? yourGuess}” has already been stolen.`,
  //         },
  //       },
  //       {
  //         position: POSITION.BOTTOM_LEFT,
  //         toastClassName: "yellow",
  //         timeout: 8000,
  //         icon: false,
  //       },
  //     );
  //   } else if (isThatPhraseYours) {
  //     severelyPenalizeTerribleGuess(match);
  //   } else {
  //     penalizeBadGuess(you.guess);
  //   }
  // }

  const performGuessOld = () => {
    const yourGuess = you.guess.toLowerCase().replace(/"/g, "");
    let match = null;
    let matchFound = false;
    let stolenBy = "";
    let alreadyScoredBy = "";
    let actualPhrase = "";

    isThatPhraseYours = false;

    // Go through every player's hand in game.players
    for (
      let playerIndex = 0;
      playerIndex < game.players.length;
      playerIndex++
    ) {
      const player = gamePlayers[playerIndex];
      for (const card of player.hand) {
        if (
          // exact match
          card.phrase.toLowerCase() === yourGuess ||
          // match in alternates
          (card.alternates &&
            card.alternates.some((alt) => alt.toLowerCase() === yourGuess)) ||
          // match in stringMatch
          (card.stringMatch &&
            yourGuess.includes(card.stringMatch.toLowerCase()))
        ) {
          actualPhrase = card.phrase;
          if (player.socketID === you.socketID) {
            severelyPenalizeTerribleGuess(card, you.guess);
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
              stolenBy: you.name,
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
            message: `“${actualPhrase ?? yourGuess}” has already been stolen.`,
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
            message: `“<strong>${actualPhrase ?? yourGuess}</strong>” has already been scored.`,
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
      penalizeBadGuess(you.guess);
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
          message: `Nobody had “<strong>${you.guess}</strong>”.`,
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
    game.badGuesses.push({
      name: you.name,
      guess: yourGuess,
      penalty: you.yourLoss,
      isOwnCard: false,
    });
    socket.emit("sendPlayerUpdate", {
      roomCode: game.roomCode,
      from: you.socketID,
      socketID: you.socketID,
      score: findMe().score,
      badGuess: {
        name: you.name,
        guess: yourGuess,
        penalty: yourLoss,
        isOwnCard: false,
      },
      toast: {
        message: `${findMe().name} lost ${badGuessPenalty} for a bad guess`,
      },
    });
  };

  const severelyPenalizeTerribleGuess = (card, yourGuess) => {
    const yourLoss = 0 - card.points;
    findMe().score -= card.points;
    toast(
      {
        component: MyToast,
        props: {
          title: "You idiot!",
          points: 0 - card.points,
          message: `<p>“<strong>${card.phrase}</strong>” was one of YOUR cards!!!</p>
                    <p>I'm subtracting <strong>${card.points}</strong> points from your score.</p>
                    <p>Pay attention next time.</p>`,
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
    game.badGuesses.push({
      name: you.name,
      guess: yourGuess,
      penalty: you.yourLoss,
      isOwnCard: true,
    });
    socket.emit("sendPlayerUpdate", {
      roomCode: game.roomCode,
      from: you.socketID,
      socketID: you.socketID,
      score: findMe().score,
      badGuess: {
        name: you.name,
        guess: yourGuess,
        penalty: yourLoss,
        isOwnCard: true,
      },
      toast: {
        message: `${findMe().name} lost ${card.points} for trying to guess their own card`,
      },
    });
  };

  const rewardGoodGuess = (match, cardHolder) => {
    toast(
      {
        component: MyToast,
        props: {
          title: "Got 'em!",
          points: match.points,
          message: `<strong>${cardHolder.name}</strong> had “<strong>${match.phrase}</strong>.”`,
        },
      },
      {
        position: POSITION.BOTTOM_LEFT,
        toastClassName: "green",
        timeout: 8000,
        icon: false,
      },
    );

    console.log(`rooms/${game.roomCode}/players/${you.playerID}`);
    const playerRef = doc(db, `rooms/${game.roomCode}/players/${you.playerID}`);
    updateDoc(playerRef, {
      score: increment(match.points),
    });

    const cardRef = doc(
      db,
      `rooms/${game.roomCode}/players/${cardHolder.playerID}/hand/${match.id}`,
    );
    updateDoc(cardRef, {
      status: "stolen",
    });

    // findMe().score += match.points;
    // you.stolenCards.push({
    //   phrase: match.phrase,
    //   points: match.points,
    //   stolenFrom: {
    //     playerName: match.playerName,
    //     socketID: match.socketID,
    //   },
    // });

    // socket.emit("sendPlayerUpdate", {
    //   roomCode: game.roomCode,
    //   from: you.socketID,
    //   socketID: you.socketID,
    //   score: findMe().score,
    //   stolenCard: match,
    // });
  };

  const createRoom = async () => {
    // Generate a room code
    function makeID(digits) {
      let text = "";
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < digits; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
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
      roomId: roomCode,
      isGameStarted: false,
      isGameOver: false,
      roomCreatorID: you.playerID,
      createdAt: serverTimestamp(),
      ttl: serverTimestamp(),
    };
    await setDoc(roomRef, newRoom);
    game.roomCode = roomCode;
    console.log("Room created with code:", roomCode);

    game.gameData = useDocument(doc(collection(db, "rooms"), game.roomCode));
    game.players = useCollection(
      collection(db, `rooms/${game.roomCode}/players`),
    );
  };

  const joinRoom = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get("room");

    if (!roomCode) {
      console.error("Room code is missing in the URL");
      return;
    }

    game.roomCode = roomCode.toUpperCase();
    const roomRef = doc(db, "rooms", game.roomCode);

    // Fetch room data
    game.roomData = useDocument(roomRef);

    // Fetch players
    const playersCollectionRef = collection(
      db,
      `rooms/${game.roomCode}/players`,
    );
    game.players = useCollection(playersCollectionRef);
  };

  // const joinRoom = () => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const roomCode = urlParams.get("room");

  //   if (!roomCode) {
  //     console.error("Room code is missing in the URL");
  //     return;
  //   }

  //   game.roomCode = roomCode.toUpperCase();
  //   const roomRef = doc(db, "rooms", game.roomCode);

  //   // Fetch room data
  //   game.roomData = useDocument(roomRef);

  //   // Fetch players
  //   const playersCollectionRef = collection(
  //     db,
  //     `rooms/${game.roomCode}/players`,
  //   );
  //   const playersCollection = useCollection(playersCollectionRef);

  //   // Set up a computed property to handle real-time updates for players
  //   const playersWithHands = computed(() => {
  //     return playersCollection.value.map((playerDoc) => {
  //       const playerId = playerDoc.id;
  //       const playerData = playerDoc.data();
  //       const handCollection = fetchPlayerHand(playerId);

  //       return {
  //         id: playerId,
  //         ...playerData,
  //         hand: handCollection.value, // Use the reactive reference directly
  //       };
  //     });
  //   });

  //   // Watch the playersWithHands computed property and update game.players
  //   watchEffect(() => {
  //     game.players = playersWithHands.value;
  //   });
  // };

  const endTheGame = () => {
    socket.emit("endTheGame", {
      roomCode: game.roomCode,
      from: you.socketID,
      gameName: gameName,
      players: game.players,
      badGuesses: game.badGuesses,
    });
  };

  const isThisPlayerTheHost = (p) => {
    if (game.players && game.players.length > 0) {
      return game.players[0].playerID === p.playerID;
    }
    return false;
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
    // Find the player whose playerID matches you.playerID
    const player = gamePlayers.value.find(
      (player) => player.id === you.playerID,
    );

    // Return the player's hand if found, otherwise return an empty array
    return player ? player.hand || [] : [];
  });

  const amITheHost = computed(() => {
    // You are the host if the first player in the player list shares your playerID.
    // Structurally, this means you were the first one to enter your name.
    if (game.players && game.players.length > 0) {
      return game.players[0].playerID === you.playerID;
    }
    return false;
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
              card.stolenBy = msg.stolenCard.stolenBy;
              return true; // Exit the loop once a match is found
            }
          }),
        );

        // Is somebody stealing YOUR active card!??
        // If so, clear those timers.
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
                message: `<strong>${player.name}</strong> just scored your “<strong>${msg.stolenCard.phrase}</strong>” card`,
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
            `<strong>${player.name}</strong> just stole a card from <strong>${msg.stolenCard.playerName}</strong> for <strong>${msg.stolenCard.points}</strong> points`,
            {
              timeout: 6000,
            },
          );
        }
      }

      // Log bad guesses, for reference later in the game over screen
      if (msg.badGuess && msg.badGuess.name) {
        game.badGuesses.push(msg.badGuess);
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
    let playerID = localStorage.getItem("kindaFunPlayerID");
    if (!playerID) {
      playerID = generateUniqueID();
      localStorage.setItem("kindaFunPlayerID", playerID);
    }
    you.playerID = playerID;

    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("create")) {
      createRoom();
    } else if (urlParams.has("room")) {
      joinRoom();
    }

    setTimeout(() => setRoomCode("ZCNT"), 2000); // Replace 'ZCNT' with your dynamic room code

    // setupSocketHandlers(socket);
  });
</script>
<template lang="pug" src="./Meeting.pug"></template>
<style lang="scss" src="./Meeting.scss"></style>
