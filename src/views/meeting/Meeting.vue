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
  const statsRef = doc(db, `stats/meeting`);

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

    const { data: playersCollection } = useCollection(playersRef, {
      wait: true,
    });

    // Watching players collection for updates

    const toastedCardIds = new Set();

    watch(
      () => playersCollection.value,
      async (newPlayers) => {
        if (newPlayers) {
          for (const player of newPlayers) {
            const cardHolderPlayerID = player.id;
            if (player.hand === undefined) {
              const handRef = collection(doc(playersRef, player.id), "hand");
              const handSnapshot = await getDocs(handRef);
              player.hand = handSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

              // Subscribe to the player's hand collection for real-time updates
              onSnapshot(handRef, (snapshot) => {
                const newHand = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));

                newHand.forEach((newCard) => {
                  const oldCard = player.hand.find(
                    (card) => card.id === newCard.id,
                  );
                  if (oldCard && oldCard.status !== newCard.status) {
                    if (newCard.status === "stolen") {
                      if (newCard.stolenBy !== you.name) {
                        if (cardHolderPlayerID === you.playerID) {
                          // Your card was stolen.
                          timer.value = 0;
                          clearInterval(interval);
                          toast(
                            {
                              component: MyToast,
                              props: {
                                title: `You got robbed!`,
                                points: newCard.points,
                                message: `<strong>${newCard.stolenBy}</strong> just scored your “<strong>${newCard.phrase}</strong>” card`,
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
                            `“${newCard.stolenBy}” just stole a ${newCard.points} card from ${player.name}`,
                            {
                              timeout: 6000,
                            },
                          );
                        }
                      }
                    } else if (newCard.status === "played") {
                      if (cardHolderPlayerID !== you.playerID) {
                        // Check if the card ID has already triggered a toast
                        if (!toastedCardIds.has(newCard.id)) {
                          toast(
                            `“${player.name}” just played a card for ${newCard.points} points.`,
                            {
                              timeout: 6000,
                            },
                          );
                          // Add the card ID to the set
                          toastedCardIds.add(newCard.id);
                        }
                      }
                    }
                  }
                });

                player.hand = newHand;
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

    // Subscribe to activities collection for real-time updates
    const activitiesRef = collection(db, `rooms/${roomCode}/activities`);
    game.badGuesses = useCollection(activitiesRef);
    onSnapshot(activitiesRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newActivity = change.doc.data();

          if (newActivity.playerID !== you.playerID) {
            if (newActivity.activityType === "badGuess") {
              if (newActivity.isOwnCard) {
                toast(
                  `${newActivity.name} just lost ${Math.abs(newActivity.penalty)} points for a terrible guess.`,
                  {
                    timeout: 6000,
                  },
                );
              } else {
                toast(
                  `${newActivity.name} just lost ${Math.abs(newActivity.penalty)} points for a bad guess.`,
                  {
                    timeout: 6000,
                  },
                );
              }
            }
            // Add additional activity types and corresponding toasts as needed
          }
        }
      });
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
          // console.log("Game status update:", data);
          game.isGameStarted = data.isGameStarted ?? false;
          game.roomCreatorID = data.roomCreatorID ?? "";
          game.isGameOver = data.isGameOver ?? false;
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
  import { playerID } from "../invalid/js/_variables.js";
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

  const savePlayerInfo = async () => {
    you.name = you.nameInput;
    localStorage.save;
    you.jobTitle = you.jobTitleInput;

    localStorage.setItem("kindaFunPlayerName", you.name);

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
    await updateDoc(statsRef, {
      gamesStarted: increment(1),
      lastGameStarted: serverTimestamp(),
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
        timer.value = 0;
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

    const playerRef = doc(db, `rooms/${game.roomCode}/players/${you.playerID}`);
    updateDoc(playerRef, {
      score: increment(card.points),
    });

    console.log(
      `rooms/${game.roomCode}/players/${you.playerID}/hand/${card.id}`,
    );
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
      severelyPenalizeTerribleGuess(match, you.guess);
    } else {
      penalizeBadGuess(you.guess);
    }
    you.guess = "";
  };

  const penalizeBadGuess = async (yourGuess) => {
    const yourLoss = 0 - badGuessPenalty;
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

    const playerRef = doc(db, `rooms/${game.roomCode}/players/${you.playerID}`);
    updateDoc(playerRef, {
      score: increment(yourLoss),
    });

    const newActivity = {
      activityType: "badGuess",
      guess: yourGuess,
      penalty: yourLoss,
      name: you.name,
      playerID: you.playerID,
      isOwnCard: false,
      timestamp: serverTimestamp(),
    };

    const activitiesRef = collection(db, `rooms/${game.roomCode}/activities`);
    await addDoc(activitiesRef, newActivity);
  };

  const severelyPenalizeTerribleGuess = async (card, yourGuess) => {
    const yourLoss = 0 - card.points;
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

    const playerRef = doc(db, `rooms/${game.roomCode}/players/${you.playerID}`);
    updateDoc(playerRef, {
      score: increment(yourLoss),
    });

    const newActivity = {
      activityType: "badGuess",
      guess: yourGuess,
      penalty: yourLoss,
      name: you.name,
      playerID: you.playerID,
      isOwnCard: true,
      timestamp: serverTimestamp(),
    };
    const activitiesRef = collection(db, `rooms/${game.roomCode}/activities`);
    await addDoc(activitiesRef, newActivity);
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
      stolenBy: you.name,
    });
  };

  const createRoom = async () => {
    game.isFailedToGetRoomData = false;
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
      gameSlug: "meeting",
      roomCode: roomCode,
      isGameStarted: false,
      isGameOver: false,
      roomCreatorID: you.playerID,
      createdAt: serverTimestamp(),
      ttl: serverTimestamp(),
    };
    await setDoc(roomRef, newRoom);
    game.roomCode = roomCode;
    console.log("Room created with code:", roomCode);

    // Update the browser URL to the new meeting page
    const protocol = window.location.protocol; // http: or https:
    const host = window.location.host; // e.g., localhost:5173 or example.com
    const newUrl = `${protocol}//${host}/meeting?room=${game.roomCode}`;
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
    const playersCollectionRef = collection(
      db,
      `rooms/${game.roomCode}/players`,
    );
    game.players = useCollection(playersCollectionRef);
  };

  const joinRoomByInput = () => {
    game.roomCode = you.roomCodeInput.toUpperCase();
    const protocol = window.location.protocol; // http: or https:
    const host = window.location.host; // e.g., localhost:5173 or example.com
    const newUrl = `${protocol}//${host}/meeting?room=${game.roomCode}`;
    window.history.replaceState(null, "", newUrl);
    joinRoom();
  };

  const endTheGame = async () => {
    const roomRef = doc(db, `rooms/${game.roomCode}`);
    await updateDoc(roomRef, {
      isGameOver: true,
    });

    await updateDoc(statsRef, {
      gamesFinished: increment(1),
      lastGameFinished: serverTimestamp(),
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

  const computedPlayerList = computed(() => {
    if (!gamePlayers.value || gamePlayers.value.length === 0) {
      return [];
    }

    // Clone and sort the players array by score in descending order
    return [...gamePlayers.value].sort((a, b) => b.score - a.score);
  });

  const amITheHost = computed(() => {
    // You are the host if the first player in the player list shares your playerID.
    // Structurally, this means you were the first one to enter your name.
    if (game.players && game.players.length > 0) {
      return game.players[0].playerID === you.playerID;
    }
    return false;
  });

  onMounted(() => {
    let playerID = localStorage.getItem("kindaFunPlayerID");
    let playerName = localStorage.getItem("kindaFunPlayerName");
    if (!playerID) {
      playerID = generateUniqueID();
      localStorage.setItem("kindaFunPlayerID", playerID);
    }
    if (playerName) {
      you.nameInput = playerName;
    }
    you.playerID = playerID;
    you.name = playerName;

    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("create")) {
      createRoom();
    } else if (urlParams.has("room")) {
      joinRoom();
    }
  });
</script>
<template lang="pug" src="./Meeting.pug"></template>
<style lang="scss" src="./Meeting.scss"></style>
