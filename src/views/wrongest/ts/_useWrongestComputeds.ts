import { computed } from "vue";
import { percentOf } from "../../../shared/ts/_functions";
import type { GameState, MyState, Player, PresentedCard, RoundState, UIState } from "./_types";
import { settings } from "./_variables";

/* eslint-disable no-unused-vars */
interface WrongestComputedsDeps {
  game: GameState;
  my: MyState;
  round: RoundState;
  ui: UIState;
  normalizePlayerName: (...args: [string]) => string;
}
/* eslint-enable no-unused-vars */

function compareByScoreDescending<T extends Player | PresentedCard>(a: T, b: T): number {
  if (a.score < b.score) return 1;
  if (a.score > b.score) return -1;
  return 0;
}

export function useWrongestComputeds({ game, my, round, ui, normalizePlayerName }: WrongestComputedsDeps) {
  const isRoomFull = computed(() => game.players.length >= settings.maxPlayers);

  const computedPlayerCount = computed(() => game.players.length);

  const computedMinimumPlayerCount = computed(() => Math.max(computedPlayerCount.value, 3));

  const computedMaxRounds = computed(() => {
    const playerCount = computedPlayerCount.value;
    if (playerCount === 3 || playerCount === 4) {
      return 4;
    }
    if (playerCount === 5 || playerCount === 6) {
      return 3;
    }
    if (playerCount > 6) {
      return 2;
    }
    return 4;
  });

  const computedMinimumCards = computed(() => computedMaxRounds.value * computedMinimumPlayerCount.value);

  const computedSelectedDecks = computed(() => game.allDecks.filter((deck) => game.selectedDeckIds.includes(deck.id)));

  const computedTotalSelectedCards = computed(() =>
    computedSelectedDecks.value.reduce((total, deck) => total + (deck.cards?.length || 0), 0),
  );

  const computedHasEnoughCards = computed(() => computedTotalSelectedCards.value >= computedMinimumCards.value);

  const computedCanSubmitName = computed(() => {
    const normalizedName = normalizePlayerName(my.nameInput);

    if (normalizedName.length < 1) {
      return false;
    }

    if (!ui.nameEntered) {
      return true;
    }

    return normalizedName !== my.name;
  });

  const computedHostName = computed(() => {
    const host = game.players.find((player) => player.playerID === game.roomCreatorID);
    return host ? host.name : "the host";
  });

  const computedAmIPresenting = computed(() => round.playerPresenting === true && round.activePlayerIndex === my.playerIndex);

  const computedCanIAdvanceTheGame = computed(() => {
    if (round.phase === "presenting") {
      if (round.activePlayerIndex + 1 === my.playerIndex && !round.playerPresenting) {
        return true;
      }

      return my.playerIndex === 0 && game.players.length === round.activePlayerIndex + 1 && !round.playerPresenting;
    }

    if (round.phase === "voting") {
      return my.playerIndex === 0 && round.votesSubmitted >= game.players.length;
    }

    return false;
  });

  const computedAreAllVotesCast = computed(() => round.votesSubmitted >= computedPlayerCount.value);

  const computedDashOffset = computed(() => {
    const remainingPercent = Math.min(Math.max(percentOf(settings.timeToPresent, round.presentationTimeLeft), 0), 100);
    const dashOffset = 251 - (remainingPercent / 100) * 251;
    return `${dashOffset.toFixed(2)}px`;
  });

  const computedPlayersByScore = computed(() => [...game.players].sort(compareByScoreDescending));

  const computedStatementsByScore = computed(() => {
    const sortedStatements = [...game.statementHistory].sort(compareByScoreDescending);
    if (sortedStatements.length === 0) {
      return {
        wrongest: [],
        wrongestCount: 0,
        leastWrong: [],
        leastWrongCount: 0,
        all: [],
        allCount: 0,
      };
    }

    const highestScore = sortedStatements[0]?.score;
    const lowestScore = sortedStatements[sortedStatements.length - 1]?.score;
    const leastWrongList = sortedStatements.filter((statement) => statement.score >= highestScore);
    const wrongestList = sortedStatements.filter((statement) => statement.score <= lowestScore);

    return {
      wrongest: wrongestList,
      wrongestCount: wrongestList.length,
      leastWrong: leastWrongList,
      leastWrongCount: leastWrongList.length,
      all: sortedStatements,
      allCount: sortedStatements.length,
    };
  });

  const computedPlayersWhoHaventVoted = computed(() => game.players.filter((player) => !round.playersVoted?.includes(player.playerID)));

  const computedVoteStatusMessage = computed(() => {
    const votedCount = round.votesSubmitted || 0;
    const totalPlayers = game.players.length;

    if (votedCount === 0) {
      return "";
    }

    if (!ui.iVoted) {
      return votedCount === 1 ? "One player has voted." : `${votedCount} players have voted.`;
    }

    if (computedPlayersWhoHaventVoted.value.length === 0) {
      return `All ${totalPlayers} players have voted.`;
    }

    if (computedPlayersWhoHaventVoted.value.length === 1) {
      return `${computedPlayersWhoHaventVoted.value[0].name} still needs to vote.`;
    }

    if (computedPlayersWhoHaventVoted.value.length === 2) {
      return `${computedPlayersWhoHaventVoted.value[0].name} and ${computedPlayersWhoHaventVoted.value[1].name} still need to vote.`;
    }

    const names = computedPlayersWhoHaventVoted.value
      .slice(0, -1)
      .map((player) => player.name)
      .join(", ");
    const lastName = computedPlayersWhoHaventVoted.value[computedPlayersWhoHaventVoted.value.length - 1].name;
    return `${names}, and ${lastName} still need to vote.`;
  });

  return {
    isRoomFull,
    computedPlayerCount,
    computedMinimumPlayerCount,
    computedMaxRounds,
    computedMinimumCards,
    computedSelectedDecks,
    computedTotalSelectedCards,
    computedHasEnoughCards,
    computedCanSubmitName,
    computedHostName,
    computedAmIPresenting,
    computedCanIAdvanceTheGame,
    computedAreAllVotesCast,
    computedDashOffset,
    computedPlayersByScore,
    computedStatementsByScore,
    computedVoteStatusMessage,
  };
}
