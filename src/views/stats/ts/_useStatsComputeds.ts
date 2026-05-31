import { computed } from "vue";

type StatRecord = Record<string, unknown>;
type StatCollection = StatRecord[];

export type StatsState = {
  [key: string]: StatRecord;
  cameo: StatRecord & { specialGames?: StatCollection; celebs?: StatCollection };
  court: StatRecord & { cases?: StatCollection; justices?: StatCollection; stances?: StatCollection; tactics?: StatCollection };
  pretend: StatRecord & { impersonators?: StatCollection };
  guillotine: StatRecord & { heads?: StatCollection; heads_isLimited?: boolean; wealthCreated?: number };
  invalid: StatRecord & {
    bugs?: StatCollection;
    challenges?: StatCollection;
    gameSizes?: StatCollection;
    passwords?: StatCollection;
    rules?: StatCollection;
  };
  sisyphus: StatRecord & { purchases?: StatCollection; cheevos?: StatCollection };
  wrongest: StatRecord & { players?: StatCollection; statements?: StatCollection; gameSizes?: StatCollection };
};

export type StatsUiState = {
  selectedJusticeId: string | number | null;
};

const asNumber = (value: unknown): number => (typeof value === "number" && !Number.isNaN(value) ? value : 0);

export const stripWrongestBraces = (statement: unknown): unknown => {
  if (typeof statement !== "string") return statement;
  return statement.replace(/\{([^}]+)\}/g, "<strong>$1</strong>");
};

export const humanizeStanceName = (name: unknown): unknown => {
  if (typeof name !== "string") return name;
  return name.replace(/([A-Z])/g, " $1").trim();
};

export function useStatsComputeds(stats: StatsState, ui: StatsUiState) {
  const computedCameo = computed(() => {
    const specialGames = stats.cameo.specialGames ?? [];
    const celebs = stats.cameo.celebs ?? [];

    let mostPopularSpecialGame: StatRecord | null = null;
    let highestCount = -Infinity;
    let specialGameCount = 0;
    specialGames.forEach((game) => {
      const count = asNumber(game.startedCount);
      specialGameCount += count;
      if (count > highestCount) {
        highestCount = count;
        mostPopularSpecialGame = game;
      }
    });

    const validMarketForces = celebs.map((celeb) => celeb.marketForces).filter((value) => typeof value === "number" && !Number.isNaN(value)) as number[];
    const averageMarketForces = validMarketForces.length
      ? (validMarketForces.reduce((sum, value) => sum + value, 0) / validMarketForces.length).toFixed(2)
      : "0.00";

    let mostOvervalued: StatRecord | null = null;
    let minMarketForces = Infinity;
    celebs.forEach((celeb) => {
      const marketForces = celeb.marketForces;
      if (typeof marketForces === "number" && !Number.isNaN(marketForces) && marketForces < minMarketForces) {
        minMarketForces = marketForces;
        mostOvervalued = celeb;
      }
    });

    let mostUndervalued: StatRecord | null = null;
    let maxMarketForces = -Infinity;
    celebs.forEach((celeb) => {
      const marketForces = celeb.marketForces;
      if (typeof marketForces === "number" && !Number.isNaN(marketForces) && marketForces > maxMarketForces) {
        maxMarketForces = marketForces;
        mostUndervalued = celeb;
      }
    });

    let mostBirthdays: StatRecord | null = null;
    let maxBirthdayWishCount = -Infinity;
    celebs.forEach((celeb) => {
      const count = asNumber(celeb.birthdayWishCount);
      if (count > maxBirthdayWishCount) {
        maxBirthdayWishCount = count;
        mostBirthdays = celeb;
      }
    });

    const totalValuationCount = celebs.reduce((sum, celeb) => sum + asNumber(celeb.valuationCount), 0);
    const gameCountByValuations = celebs.length > 0 && totalValuationCount ? Math.round(totalValuationCount / 5) : 0;

    return {
      mostPopularSpecialGame,
      specialGameCount,
      averageMarketForces,
      mostOvervalued,
      mostUndervalued,
      mostBirthdays,
      gameCountByValuations,
    };
  });

  const computedCourt = computed(() => {
    const cases = stats.court.cases ?? [];
    const justices = stats.court.justices ?? [];
    const stances = stats.court.stances ?? [];
    const tactics = stats.court.tactics ?? [];

    const mostPopularCase = cases.reduce<StatRecord | null>((max, item) => (asNumber(item.timesPlayed) > asNumber(max?.timesPlayed) ? item : max), null);
    const mostActiveJustice = justices.reduce<StatRecord | null>(
      (max, item) => (asNumber(item.timesAdjudicated) > asNumber(max?.timesAdjudicated) ? item : max),
      null,
    );
    const mostCommonStance = stances.reduce<StatRecord | null>(
      (max, item) => (asNumber(item.timesAdjudicated) > asNumber(max?.timesAdjudicated) ? item : max),
      null,
    );
    const mostUsedTactic = tactics.reduce<StatRecord | null>((max, item) => (asNumber(item.timesPlayed) > asNumber(max?.timesPlayed) ? item : max), null);
    const bestNetTactic = tactics.reduce<StatRecord | null>(
      (max, item) => (asNumber(item.averageNetShiftPerPlay) > asNumber(max?.averageNetShiftPerPlay) ? item : max),
      null,
    );

    return {
      mostPopularCase,
      mostActiveJustice,
      mostCommonStance,
      mostUsedTactic,
      bestNetTactic,
    };
  });

  const selectedJusticeCases = computed(() => {
    if (!ui.selectedJusticeId || !stats.court.justices) return [];
    const justice = stats.court.justices.find((item) => item.id === ui.selectedJusticeId);
    if (!justice || !Array.isArray(justice.cases)) return [];

    return justice.cases.map((courtCase) => {
      const prosecutionVotes = asNumber(courtCase.prosecutionVotes);
      const defenseVotes = asNumber(courtCase.defenseVotes);
      const abstainVotes = asNumber(courtCase.abstainVotes);
      const prosecutionSideName = typeof courtCase.prosecutionSideName === "string" ? courtCase.prosecutionSideName : "Prosecution";
      const defenseSideName = typeof courtCase.defenseSideName === "string" ? courtCase.defenseSideName : "Defense";

      return {
        ...courtCase,
        timesAdjudicated: abstainVotes + defenseVotes + prosecutionVotes,
        verdicts: `<div class="justice-verdicts"><dl><dt class="side-name side-prosecution">${prosecutionSideName}</dt><dd>${prosecutionVotes}</dd></dl><dl><dt class="side-name side-defense">${defenseSideName}</dt><dd>${defenseVotes}</dd></dl></div>`,
      };
    });
  });

  const computedPretend = computed(() => {
    const impersonators = stats.pretend.impersonators ?? [];
    if (!impersonators.length) {
      return { bestImpersonator: null, worstImpersonator: null, badGuessPercent: 0, closeGuessPercent: 0, exactGuessPercent: 0 };
    }

    let bestImpersonator: StatRecord | null = null;
    let worstImpersonator: StatRecord | null = null;
    let maxPercent = -Infinity;
    let minPercent = Infinity;
    let totalBad = 0;
    let totalClose = 0;
    let totalCorrect = 0;

    impersonators.forEach((impersonator) => {
      const correct = asNumber(impersonator.correctGuessCount);
      const close = asNumber(impersonator.closeGuessCount);
      const bad = asNumber(impersonator.badGuessCount);
      const percent = typeof impersonator.correctPercent === "number" ? impersonator.correctPercent : Number.parseFloat(String(impersonator.correctPercent ?? 0));
      totalBad += bad;
      totalClose += close;
      totalCorrect += correct;
      if (percent > maxPercent) {
        maxPercent = percent;
        bestImpersonator = impersonator;
      }
      if (percent > 0 && percent < minPercent) {
        minPercent = percent;
        worstImpersonator = impersonator;
      }
    });

    const totalGuesses = totalBad + totalClose + totalCorrect;
    const badGuessPercent = totalGuesses > 0 ? Number(((totalBad / totalGuesses) * 100).toFixed(1)) : 0;
    const closeGuessPercent = totalGuesses > 0 ? Number(((totalClose / totalGuesses) * 100).toFixed(1)) : 0;
    const exactGuessPercent = totalGuesses > 0 ? Number(((totalCorrect / totalGuesses) * 100).toFixed(1)) : 0;

    return { bestImpersonator, worstImpersonator, badGuessPercent, closeGuessPercent, exactGuessPercent };
  });

  const computedGuillotine = computed(() => {
    const heads = stats.guillotine.heads ?? [];
    if (!heads.length) return { mostExecuted: null, moneyLiberated: 0, averageHeadValue: 0 };

    let mostExecuted: StatRecord | null = null;
    let maxCount = -Infinity;
    let moneyLiberated = 0;
    let totalHeadCount = 0;
    heads.forEach((head) => {
      const count = asNumber(head.headCount);
      const worth = asNumber(head.netWorth);
      if (count > maxCount) {
        maxCount = count;
        mostExecuted = head;
      }
      moneyLiberated += worth * count;
      totalHeadCount += count;
    });

    if (stats.guillotine.heads_isLimited) moneyLiberated = asNumber(stats.guillotine.wealthCreated);
    return {
      mostExecuted,
      moneyLiberated: Number(moneyLiberated.toFixed(2)),
      averageHeadValue: totalHeadCount > 0 ? Number((moneyLiberated / totalHeadCount).toFixed(2)) : 0,
      totalHeads: totalHeadCount,
    };
  });

  const computedInvalid = computed(() => {
    const gameSizes = stats.invalid.gameSizes ?? [];
    if (!gameSizes.length) {
      return {
        mostCommonGameSize: null,
        averageGameSize: null,
        mostRecentSize: null,
        mostCreatedPassword: null,
        mostCrackedPassword: null,
        mostUsedRule: null,
      };
    }

    const mostPopularGroupSize = gameSizes.reduce((max, size) => (asNumber(size.gamesPlayed) > asNumber(max.gamesPlayed) ? size : max), gameSizes[0]);
    const averageGameSize = (() => {
      let totalPlayers = 0;
      let totalGames = 0;
      gameSizes.forEach((size) => {
        const games = asNumber(size.gamesStarted);
        const players = asNumber(size.players);
        totalPlayers += games * players;
        totalGames += games;
      });
      return totalGames > 0 ? (totalPlayers / totalGames).toFixed(2) : null;
    })();

    const mostRecentGroupSize = gameSizes.reduce((latest, size) => {
      if (!latest.lastGameStarted) return size;
      if (!size.lastGameStarted) return latest;
      return new Date(size.lastGameStarted as string | number | Date) > new Date(latest.lastGameStarted as string | number | Date) ? size : latest;
    }, gameSizes[0]);

    const mostDangerousBug =
      stats.invalid.bugs && stats.invalid.bugs.length
        ? stats.invalid.bugs.reduce((max, bug) => (asNumber(bug.timesCreated) + asNumber(bug.timesCrashed) > asNumber(max.timesCreated) + asNumber(max.timesCrashed) ? bug : max))
        : null;
    const mostPopularChallenge =
      stats.invalid.challenges && stats.invalid.challenges.length
        ? stats.invalid.challenges.reduce((max, challenge) => (asNumber(challenge.timesChosen) > asNumber(max.timesChosen) ? challenge : max))
        : null;
    const mostCreatedPassword =
      stats.invalid.passwords && stats.invalid.passwords.length
        ? stats.invalid.passwords.reduce((max, password) => (asNumber(password.timesCreated) > asNumber(max.timesCreated) ? password : max))
        : null;
    const mostCrackedPassword =
      stats.invalid.passwords && stats.invalid.passwords.length
        ? stats.invalid.passwords.reduce((max, password) => (asNumber(password.timesCracked) > asNumber(max.timesCracked) ? password : max))
        : null;
    const mostUsedRule =
      stats.invalid.rules && stats.invalid.rules.length
        ? stats.invalid.rules.reduce((max, rule) => (asNumber(rule.count) > asNumber(max.count) ? rule : max))
        : null;

    return { mostPopularGroupSize, averageGameSize, mostRecentGroupSize, mostDangerousBug, mostPopularChallenge, mostCreatedPassword, mostCrackedPassword, mostUsedRule };
  });

  const computedSisyphus = computed(() => {
    const purchases = stats.sisyphus.purchases ?? [];
    const cheevos = stats.sisyphus.cheevos ?? [];
    const totalPurchases = purchases.reduce((sum, purchase) => sum + asNumber(purchase.timesBought), 0);
    const pushesSpent = purchases.reduce((sum, purchase) => sum + asNumber(purchase.timesBought) * asNumber(purchase.price), 0);
    const cheevosEarned = cheevos.reduce((sum, cheevo) => sum + asNumber(cheevo.earnedCount), 0);
    const pointsEarned = cheevos.reduce((sum, cheevo) => sum + asNumber(cheevo.earnedCount) * asNumber(cheevo.pointValue), 0);
    return { totalPurchases, cheevosEarned, pushesSpent, pointsEarned };
  });

  const computedWrongest = computed(() => {
    const statements = stats.wrongest.statements ?? [];
    const gameSizes = stats.wrongest.gameSizes ?? [];

    const mostPopularGroupSize = gameSizes.length > 0 ? gameSizes.reduce((max, size) => (asNumber(size.gamesPlayed) > asNumber(max.gamesPlayed) ? size : max), gameSizes[0]) : null;

    let totalPlayers = 0;
    let totalGames = 0;
    gameSizes.forEach((size) => {
      const games = asNumber(size.gamesStarted);
      const players = asNumber(size.players);
      totalPlayers += games * players;
      totalGames += games;
    });

    const averageGameSize = totalGames > 0 ? (totalPlayers / totalGames).toFixed(2) : null;
    const wrongestStatement = statements.length > 0 ? statements.reduce((max, statement) => (asNumber(statement.totalScore) < asNumber(max.totalScore) ? statement : max), statements[0]) : null;
    const leastWrongStatement = statements.length > 0 ? statements.reduce((min, statement) => (asNumber(statement.totalScore) > asNumber(min.totalScore) ? statement : min), statements[0]) : null;

    return { mostPopularGroupSize, averageGameSize, wrongestStatement, leastWrongStatement };
  });

  return { computedCameo, computedCourt, selectedJusticeCases, computedPretend, computedGuillotine, computedInvalid, computedSisyphus, computedWrongest };
}
