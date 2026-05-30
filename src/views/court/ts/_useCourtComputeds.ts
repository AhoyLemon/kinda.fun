import { computed } from "vue";
import type { CourtGameState, TurnActor } from "./_types";
import {
  currentJustices,
  historicalJustices,
  fictionalJustices,
  celebrityJustices,
  warrenJustices,
  lochnerJustices,
  presetBenchConfigs,
} from "./justices";
import { gameSettings } from "./_settings";

interface CourtPlay {
  actor: TurnActor;
  tacticName: string;
  cardType: string;
  targetName: string;
  results: { justiceName: string; change: number }[];
  round: number;
}

interface CourtComputedsDeps {
  game: CourtGameState;
  ui: { courtMode: string | null; previewPresetId: string | null };
  courtReport: { plays: CourtPlay[] };
}

export function useCourtComputeds({ game, ui, courtReport }: CourtComputedsDeps) {
  const allJustices = computed(() => [
    ...currentJustices,
    ...historicalJustices,
    ...fictionalJustices,
    ...celebrityJustices,
    ...warrenJustices,
    ...lochnerJustices,
  ]);

  const historicalPresets = computed(() => presetBenchConfigs.filter((b) => ["current", "warren-court", "lochner-era"].includes(b.id)));
  const fictionalPresets = computed(() => presetBenchConfigs.filter((b) => !["current", "warren-court", "lochner-era"].includes(b.id)));

  const sortedBench = computed(() =>
    [...game.bench].sort((a, b) => {
      if (a.id === game.chiefJusticeId) return -1;
      if (b.id === game.chiefJusticeId) return 1;
      return 0;
    }),
  );

  const hasStrongAlly = computed(() => game.bench.some((j) => (game.leanings[j.id] ?? 0) >= 60));

  const reframeStanceStats = computed(() => {
    return game.reframeStanceChoices.map((stance) => {
      let forCount = 0;
      let againstCount = 0;
      game.bench.forEach((j) => {
        const s = j.stances?.find((st) => st.topic === stance);
        if (!s || s.position === "Neutral") return;
        if (s.position === "For") forCount++;
        else againstCount++;
      });
      return { stance, forCount, againstCount };
    });
  });

  const benchOverview = computed(() => {
    const bench = game.bench;
    if (!bench.length) return null;
    const maleCount = bench.filter((j) => j.gender === "M").length;
    const femaleCount = bench.filter((j) => j.gender === "F").length;
    const partyCounts: Record<string, number> = {};
    bench.forEach((j) => {
      const raw = j.nominatedBy?.party ?? "Unknown";
      const label =
        raw === "Republican" || raw === "Federalist" || raw === "Whig"
          ? "Conservative"
          : raw === "Democrat" || raw === "Democratic-Republican"
            ? "Liberal"
            : raw;
      partyCounts[label] = (partyCounts[label] ?? 0) + 1;
    });
    const statKeys = ["logic", "charisma", "empathy", "susceptibility", "partyLoyalty"] as const;
    const statAvg = (k: (typeof statKeys)[number]) => bench.reduce((s, j) => s + j.stats[k], 0) / bench.length;
    const bestStat = statKeys.reduce((a, b) => (statAvg(a) >= statAvg(b) ? a : b));
    const worstStat = statKeys.reduce((a, b) => (statAvg(a) <= statAvg(b) ? a : b));
    const weaknessKeys = ["flattery", "bribery", "blackmail", "threats"] as const;
    const wkAvg = (k: (typeof weaknessKeys)[number]) => bench.reduce((s, j) => s + j.weaknesses[k], 0) / bench.length;
    const greatestWeakness = weaknessKeys.reduce((a, b) => (wkAvg(a) >= wkAvg(b) ? a : b));
    const t = gameSettings.abstentionThreshold;
    const votingFor = bench.filter((j) => (game.leanings[j.id] ?? 0) >= t).length;
    const votingAgainst = bench.filter((j) => (game.leanings[j.id] ?? 0) <= -t).length;
    const abstaining = bench.length - votingFor - votingAgainst;
    return { maleCount, femaleCount, partyCounts, bestStat, worstStat, greatestWeakness, votingFor, votingAgainst, abstaining };
  });

  const verdict = computed(() => {
    if (!game.bench.length) return null;
    const t = gameSettings.abstentionThreshold;
    const forCount = game.bench.filter((j) => (game.leanings[j.id] ?? 0) >= t).length;
    const againstCount = game.bench.filter((j) => (game.leanings[j.id] ?? 0) <= -t).length;
    const abstainCount = game.bench.length - forCount - againstCount;
    return { forCount, againstCount, abstainCount, won: forCount > againstCount, tied: forCount === againstCount };
  });

  const tallyDisplay = computed(() => {
    if (!benchOverview.value) return "0-0";
    const { votingFor, votingAgainst, abstaining } = benchOverview.value;
    return abstaining > 0 ? `${votingFor}-${votingAgainst}-${abstaining}` : `${votingFor}-${votingAgainst}`;
  });

  const tallyClass = computed(() => {
    if (!benchOverview.value) return "";
    const { votingFor, votingAgainst, abstaining } = benchOverview.value;
    return [votingFor > votingAgainst ? "is-winning" : "is-losing", abstaining > 0 ? "has-abstentions" : ""].filter(Boolean).join(" ");
  });

  const tallyTooltip = computed(() => {
    if (!benchOverview.value) return "";
    const { votingFor, votingAgainst, abstaining } = benchOverview.value;
    const parts = [`${votingFor} for you`, `${votingAgainst} against you`];
    if (abstaining > 0) parts.push(`${abstaining} abstaining`);
    return parts.join(" · ");
  });

  const reportByRound = computed(() =>
    Array.from({ length: gameSettings.numberOfRounds }, (_, i) => {
      const r = i + 1;
      const roundPlays = courtReport.plays.filter((p) => p.round === r);
      const playerPlay = roundPlays.find((p) => p.actor === "player") ?? null;
      const opponentPlay = roundPlays.find((p) => p.actor === "opponent") ?? null;
      const allResults = roundPlays.flatMap((p) => p.results);
      const netTraction = allResults.reduce((sum, res) => sum + res.change, 0);

      const byParty: Record<string, number> = {};
      allResults.forEach((res) => {
        const justice = game.bench.find((j) => j.name === res.justiceName);
        const party = justice?.nominatedBy?.party ?? "Unknown";
        byParty[party] = (byParty[party] ?? 0) + res.change;
      });
      const tractionByParty = Object.fromEntries(Object.entries(byParty).filter(([, v]) => v !== 0));

      return {
        round: r,
        playerPlay,
        opponentPlay,
        netTraction,
        tractionByParty,
        leansToward: netTraction > 0 ? "player" : netTraction < 0 ? "opponent" : "neutral",
        hasPlays: roundPlays.length > 0,
        isFuture: r > game.round,
      };
    }),
  );

  const verdictSections = computed(() => {
    if (!verdict.value || !game.bench.length) return [];
    const t = gameSettings.abstentionThreshold;
    const forJustices = game.bench.filter((j) => (game.leanings[j.id] ?? 0) >= t);
    const againstJustices = game.bench.filter((j) => (game.leanings[j.id] ?? 0) <= -t);
    const abstainJustices = game.bench.filter((j) => {
      const l = game.leanings[j.id] ?? 0;
      return l > -t && l < t;
    });
    const sections = [
      { label: "Votes For", justices: forJustices, type: "for" as const },
      { label: "Votes Against", justices: againstJustices, type: "against" as const },
      { label: "Abstaining", justices: abstainJustices, type: "abstain" as const },
    ].filter((s) => s.justices.length > 0);
    if (!verdict.value.won && !verdict.value.tied) {
      const againstIdx = sections.findIndex((s) => s.type === "against");
      if (againstIdx > 0) {
        const [against] = sections.splice(againstIdx, 1);
        sections.unshift(against);
      }
    }
    return sections;
  });

  const verdictRuledFor = computed(() => {
    if (!verdict.value || !game.currentCase || !game.playerSide || verdict.value.tied) return "";
    if (verdict.value.won) {
      return game.playerSide === "prosecution" ? game.currentCase.prosecution.name : game.currentCase.defendant.name;
    }
    return game.playerSide === "prosecution" ? game.currentCase.defendant.name : game.currentCase.prosecution.name;
  });

  const verdictWinningArgument = computed(() => {
    if (!verdict.value || !game.currentCase || !game.playerSide || verdict.value.tied) return "";
    const winningSide = verdict.value.won ? game.playerSide : game.playerSide === "prosecution" ? "defendant" : "prosecution";
    return winningSide === "prosecution" ? game.currentCase.prosecution.argument : game.currentCase.defendant.argument;
  });

  const verdictScoreDisplay = computed(() => {
    if (!verdict.value) return "";
    const { forCount, againstCount, abstainCount } = verdict.value;
    return abstainCount > 0 ? `${forCount}–${againstCount}–${abstainCount}` : `${forCount}–${againstCount}`;
  });

  const justiceTargetings = computed(() => {
    const map: Record<number, Array<{ tacticName: string; actor: TurnActor }>> = {};
    courtReport.plays.forEach((play) => {
      const justice = game.bench.find((j) => j.name === play.targetName);
      if (justice) {
        if (!map[justice.id]) map[justice.id] = [];
        map[justice.id].push({ tacticName: play.tacticName, actor: play.actor });
      }
    });
    return map;
  });

  const chiefJustice = computed(() => game.bench.find((j) => j.id === game.chiefJusticeId) ?? null);

  const benchLabel = computed(() => {
    if (!chiefJustice.value) return "The Bench";
    if (ui.courtMode && ui.courtMode !== "current") {
      const preset = presetBenchConfigs.find((b) => b.id === ui.courtMode);
      if (preset) return preset.name;
    }
    const courtName = chiefJustice.value.courtName;
    const label = courtName ?? chiefJustice.value.name.split(" ").at(-1);
    return `The ${label} Court`;
  });

  const previewPreset = computed(() => {
    if (!ui.previewPresetId) return null;
    return presetBenchConfigs.find((b) => b.id === ui.previewPresetId) ?? null;
  });

  const previewPresetChief = computed(() => {
    if (!previewPreset.value) return null;
    return allJustices.value.find((j) => j.id === previewPreset.value!.chiefJusticeId) ?? null;
  });

  return {
    allJustices,
    historicalPresets,
    fictionalPresets,
    sortedBench,
    hasStrongAlly,
    reframeStanceStats,
    benchOverview,
    verdict,
    tallyDisplay,
    tallyClass,
    tallyTooltip,
    reportByRound,
    verdictSections,
    verdictRuledFor,
    verdictWinningArgument,
    verdictScoreDisplay,
    justiceTargetings,
    chiefJustice,
    benchLabel,
    previewPreset,
    previewPresetChief,
  };
}
