import { reactive } from "vue";

export const gameName = "Let's Ruin This Meeting!";
export const timeToScore = 10000; // Time in milliseconds that players have to score points after playing a card
export const badGuessPenalty = 4; // Number of points deducted from a player for a bad guess (i.e., when they guess a card that isn't theirs)
export const cardsPerPlayer = 5; // Number of cards each player starts with

export const game = reactive({
  roomCode: "",
  isFailedToGetRoomData: false,
  fb: null as null,
  roomData: null as null,
  isGameStarted: false,
  isGameOver: false,
  isDealingInProgress: false,
  roomCreatorID: "",
  deck: [] as any[],
  players: [] as any,
  badGuesses: [] as any,
});

export const you = reactive({
  playerID: "",
  roomCodeInput: "",
  nameInput: "",
  jobTitleInput: "",
  name: "",
  jobTitle: "",
  isHost: false,
  isCurrentlyPlayingACard: false,
  currentCard: {} as Record<string, unknown>,
  guess: "",
  stolenCards: [] as unknown[],
});

export const ui = reactive({
  isHelpScreenVisible: false,
});

export const settings = reactive({
  minPlayers: 2,
  maxPlayers: 6,
  isEventActive: false,
  eventCardsPerGame: 9,
});
