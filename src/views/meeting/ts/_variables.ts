import { reactive } from "vue";

export const gameName = "Let's Ruin This Meeting!";
export const timeToScore = 10000;
export const badGuessPenalty = 4;
export const cardsPerPlayer = 5;

export const game = reactive({
  roomCode: "",
  isFailedToGetRoomData: false,
  fb: null as null,
  roomData: null as null,
  isGameStarted: false,
  isGameOver: false,
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
  // maxPlayers added by #244
  // isEventActive, eventCardsPerGame added by #246
});
