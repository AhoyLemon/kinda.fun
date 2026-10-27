import type { Card } from "./_allCards";

interface HandHolder<C extends Card> {
  hand?: C[];
}

export interface GuessMatch<P, C> {
  card: C;
  player: P;
}

/** First card (in player order) that the guess matches by exact phrase, alternate, or `stringMatch` substring. */
export function findGuessMatch<C extends Card, P extends HandHolder<C>>(players: P[], guess: string): GuessMatch<P, C> | null {
  const normalizedGuess = guess.toLowerCase();
  for (const player of players) {
    for (const card of player.hand ?? []) {
      const isExactMatch = card.phrase.toLowerCase() === normalizedGuess;
      const isAltMatch = card.alternates && card.alternates.some((alt) => alt.toLowerCase() === normalizedGuess);
      const isStringMatch = card.stringMatch && normalizedGuess.includes(card.stringMatch.toLowerCase());

      if (isExactMatch || isAltMatch || isStringMatch) {
        return { card, player };
      }
    }
  }
  return null;
}
