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
