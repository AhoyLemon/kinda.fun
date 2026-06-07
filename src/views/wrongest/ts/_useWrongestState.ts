import { allDecks } from "./_decks";
import type { GameState, MyState, RoundState, UIState } from "./_types";
import { settings } from "./_variables";

export function createWrongestGameState(): GameState {
  return {
    roomCode: "",
    gameName: "wrongest",
    inRoom: false,
    gameStarted: false,
    gameOver: false,
    maxRounds: 0,
    allDecks,
    selectedDeckIds: [],
    gameDeck: [],
    players: [],
    cardsPlayed: [],
    statementHistory: [],
    voteHistory: [],
    roomData: null,
    roomCreatorID: "",
    isFailedToGetRoomData: false,
  };
}

export function createWrongestMyState(): MyState {
  return {
    isRoomHost: false,
    name: "",
    nameInput: "",
    playerID: "",
    card: "",
    playerIndex: -1,
    upVote: "",
    downVote: "",
  };
}

export function createWrongestRoundState(): RoundState {
  return {
    phase: "",
    number: 0,
    dealerIndex: -1,
    activePlayerIndex: -1,
    playerPresenting: false,
    presentationTimer: undefined,
    presentationTimeLeft: settings.timeToPresent,
    cardsPresented: [],
    votesSubmitted: 0,
    playersVoted: [],
  };
}

export function createWrongestUiState(): UIState {
  return {
    watchingVideo: false,
    isClosingVideo: false,
    nameEntered: false,
    showingDeckSelection: false,
    deckName: "",
    upVoteIndex: -1,
    downVoteIndex: -1,
    iVoted: false,
    roomCodeInput: "",
    disableButtons: false,
    isStartingGame: false,
    isSavingName: false,
    isOpeningDeckSelection: false,
    isSavingDeckSelection: false,
    sidebarVisible: false,
    isCreatingRoom: false,
    isLoadingLobby: false,
  };
}
