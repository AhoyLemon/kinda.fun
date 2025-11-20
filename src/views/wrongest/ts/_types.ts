/**
 * Type definitions for The Wrongest Words game
 */

/**
 * Represents a card in the game
 * Cards contain statements with a hidden portion enclosed in curly braces
 */
export type Card = string;

/**
 * Represents a deck of cards with metadata
 */
export interface Deck {
  /** The display name of the deck */
  name: string;
  /** A description explaining the theme and content of this deck */
  description: string;
  /** Array of card statements (only present for regular decks, not the "EVERYTHING!" meta-deck) */
  cards?: Card[];
}

/**
 * Settings for game timing and behavior
 */
export interface GameSettings {
  /** Time limit in seconds for each player's presentation */
  timeToPresent: number;
}

/**
 * Represents a player in the game
 */
export interface Player {
  /** Unique identifier for the player */
  id: string;
  /** Player's display name */
  name: string;
  /** Unique player ID used across games */
  playerID: string;
  /** Current score in the game */
  score: number;
  /** The card currently held by this player */
  card: string;
  /** Index position of the player in the turn order */
  playerIndex: number;
  /** Whether the player is currently connected */
  isConnected: boolean;
  /** Timestamp of the player's last activity */
  lastSeen: any; // Firestore Timestamp
}

/**
 * Represents a card that has been presented during the round
 */
export interface PresentedCard {
  /** The card statement that was presented */
  card: string;
  /** Index of the player who presented this card */
  playerIndex: number;
  /** Name of the player who presented this card */
  playerName: string;
  /** Current vote score for this card (positive or negative) */
  score: number;
}

/**
 * Represents a vote cast by a player
 */
export interface VoteHistoryEntry {
  /** Index of the card that was voted on */
  downVoteIndex?: number;
  /** Index of the card that was voted on */
  upVoteIndex?: number;
  /** Name of the player who cast the vote */
  voterName: string;
  /** Direction of the vote ("up" or "down") */
  voted: "up" | "down";
  /** Name of the player who presented the card */
  presenter: string;
  /** The card that was voted on */
  card: string;
}

/**
 * Main game state containing room and game information
 */
export interface GameState {
  /** Room code for this game session */
  roomCode: string;
  /** Identifier for this game type */
  gameName: string;
  /** Whether the player has joined a room */
  inRoom: boolean;
  /** Whether the game has started */
  gameStarted: boolean;
  /** Whether the game is over */
  gameOver: boolean;
  /** Maximum number of rounds for this game */
  maxRounds: number;
  /** All available decks */
  allDecks: Deck[];
  /** The deck chosen for this game */
  chosenDeck: Partial<Deck>;
  /** The current game deck with remaining cards */
  gameDeck: { cards: Card[] };
  /** Array of players in the game */
  players: Player[];
  /** Cards that have been played (legacy, may not be used) */
  cardsPlayed: Card[];
  /** History of all cards presented across all rounds */
  statementHistory: PresentedCard[];
  /** History of all votes cast */
  voteHistory: VoteHistoryEntry[];
  /** VueFire document reference for room data */
  roomData: any | null;
  /** ID of the player who created the room */
  roomCreatorID: string;
  /** Whether there was an error fetching room data */
  isFailedToGetRoomData: boolean;
}

/**
 * State for the current player
 */
export interface MyState {
  /** Whether this player is the room host */
  isRoomHost: boolean;
  /** Player's confirmed name */
  name: string;
  /** Name being typed into the input field */
  nameInput: string;
  /** Unique player identifier */
  playerID: string;
  /** Card held by this player */
  card: string;
  /** This player's index in the turn order */
  playerIndex: number;
  /** Card this player voted up (card text) */
  upVote: string;
  /** Card this player voted down (card text) */
  downVote: string;
}

/**
 * State for the current round
 */
export interface RoundState {
  /** Current phase of the game ("lobby", "presenting", "voting", "GAME OVER") */
  phase: string;
  /** Current round number (1-indexed) */
  number: number;
  /** Index of the dealer for this round */
  dealerIndex: number;
  /** Index of the currently active player */
  activePlayerIndex: number;
  /** Whether a player is currently presenting */
  playerPresenting: boolean;
  /** Timer interval for the presentation countdown */
  presentationTimer: ReturnType<typeof setInterval> | undefined;
  /** Time remaining for the current presentation (in seconds) */
  presentationTimeLeft: number;
  /** Cards that have been presented this round */
  cardsPresented: PresentedCard[];
  /** Number of votes submitted this round */
  votesSubmitted: number;
  /** Array of player IDs who have voted this round */
  playersVoted: string[];
}

/**
 * UI state for the game interface
 */
export interface UIState {
  /** Whether the instruction video is being watched */
  watchingVideo: boolean;
  /** Whether the player has entered their name */
  nameEntered: boolean;
  /** Name of the selected deck */
  deckName: string;
  /** Index of the card the player voted up (deprecated - using my.upVote instead) */
  upVoteIndex: number;
  /** Index of the card the player voted down (deprecated - using my.downVote instead) */
  downVoteIndex: number;
  /** Whether this player has voted in the current round */
  iVoted: boolean;
  /** Room code typed into the join input */
  roomCodeInput: string;
}
