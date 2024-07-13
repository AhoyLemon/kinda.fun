import { reactive, ref } from "vue";

export const gameName = "Let's Ruin This Meeting!";
export const timeToScore = 10000;
export const badGuessPenalty = 4;
export const fakePlayerCount = 3;
export const cardsPerPlayer = 4; // Number of cards each player will get
export const game = reactive({
  roomCode: "",
  isGameStarted: false,
  deck: [],
  players: [],
});
export const you = reactive({
  socketID: "",
  nameInput: "",
  jobTitleInput: "",
  name: "",
  jobTitle: "",
  isHost: false,
  hand: [],
  isCurrentlyInGame: false,
  isCurrentlyPlayingACard: false,
  currentCard: {},
  score: 0,
  guess: "",
  stolenCards: [],
});
