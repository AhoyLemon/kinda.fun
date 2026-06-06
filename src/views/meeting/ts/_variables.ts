import { reactive } from "vue";

export const gameName = "Let's Ruin This Meeting!";

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
  timeToScore: 10000,
  badGuessPenalty: 4,
  cardsPerPlayer: 5,
  byLemon: {
    gameTimerMs: 5 * 60 * 1000,
    cardPlayThreshold: 5,
    cardPlayDelayMs: 30 * 1000,
  },
});
