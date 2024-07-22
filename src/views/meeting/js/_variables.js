import { reactive, ref } from "vue";

export const gameName = "Let's Ruin This Meeting!";
export const timeToScore = 10000; // 10 seconds
export const badGuessPenalty = 4;
export const cardsPerPlayer = 5; // Number of cards each player will get
export const game = reactive({
  roomCode: "",
  isFailedToGetRoomData: false,
  fb: null,
  roomData: null,
  isGameStarted: false,
  isGameOver: false,
  deck: [],
  players: [],
  badGuesses: [],
});
export const you = reactive({
  playerID: "",
  nameInput: "",
  jobTitleInput: "",
  name: "",
  jobTitle: "",
  isHost: false,
  isCurrentlyPlayingACard: false,
  currentCard: {},
  guess: "",
  stolenCards: [],
});
