import type { Ref } from "vue";
import { useClientFirestore } from "@/shared/ts/_useClientFirestore";
import type { CourtGameState, Tactic, TurnActor } from "./_types";
import {
  classifyJusticeVote,
  computeTacticShiftMetrics,
  createCourtStatsHelpers,
  getOutcomeFromVerdict,
  getTrackedStanceNamesForOutcome,
  getWinningSide,
  type CourtOutcome,
  type JusticeVote,
} from "./_statsHelpers";

// The verdict computed only needs its won/tied flags here; keep the dependency narrow.
type VerdictRef = Readonly<Ref<{ won: boolean; tied: boolean } | null>>;

/* eslint-disable no-unused-vars -- base eslint rule incorrectly flags TS interface/param names */
interface StatsDeps {
  game: CourtGameState;
  verdict: VerdictRef;
  trialAttackedJustices: Set<string>;
}
/* eslint-enable no-unused-vars */

/**
 * All Firestore analytics for Supreme Court live here, behind a thin set of `track*`
 * functions. Court.vue calls these at the relevant moments and never touches Firestore
 * (or the raw stat-writers) directly. Every write is fire-and-forget and already
 * error-swallowed inside createCourtStatsHelpers, so callers can `void` them freely.
 */
export function useCourtStats(deps: StatsDeps) {
  const { game, verdict, trialAttackedJustices } = deps;
  // Firebase/VueFire is client-only: during prerender/SSR there is no VueFire
  // app, so pass null on the server. createCourtStatsHelpers accepts
  // Firestore | null and no-ops every write when db is null (see its safeWrite
  // guard), so nothing is dereferenced during prerender.
  const courtStats = createCourtStatsHelpers(useClientFirestore());

  function getCurrentOutcome(): CourtOutcome | null {
    if (!verdict.value) return null;
    return getOutcomeFromVerdict(verdict.value);
  }

  function buildVoteBuckets(): Record<string, JusticeVote> {
    if (!game.playerSide) return {};
    const playerSide = game.playerSide;
    return Object.fromEntries(
      game.bench.map((justice) => {
        const leaning = game.leanings[justice.id] ?? 0;
        return [justice.name, classifyJusticeVote(leaning, playerSide)];
      }),
    );
  }

  async function trackQuickplayStarted(): Promise<void> {
    await courtStats.writeCourtAggregateStats({
      gamesStarted: 1,
      quickplaysStarted: 1,
      lastQuickplayStarted: "__SERVER_TIMESTAMP__",
      lastGameStarted: "__SERVER_TIMESTAMP__",
    });
  }

  async function trackTacticPlay(tactic: Tactic, actor: TurnActor, results: Array<{ change: number }>): Promise<void> {
    const metrics = computeTacticShiftMetrics(results);
    await courtStats.writeTacticStats({
      tacticName: tactic.name,
      actor,
      metrics: { ...metrics, netShift: Math.abs(metrics.netShift) },
    });
  }

  async function trackTrialVerdictStats(options: { isQuickplay: boolean }): Promise<void> {
    if (!game.currentCase || !game.playerSide) return;

    const outcome = getCurrentOutcome();
    if (!outcome) return;

    const winningSide = getWinningSide(game.playerSide, outcome);
    const aggregateOutcomeField = outcome === "won" ? "Won" : outcome === "lost" ? "Lost" : "Tied";
    const benchJusticeNames = game.bench.map((justice) => justice.name);
    const stanceNames = getTrackedStanceNamesForOutcome(game.currentCase, game.playerSide, outcome);
    const voteByJusticeName = buildVoteBuckets();

    const aggregateUpdates: Record<string, string | number> = {
      totalCasesWon: outcome === "won" ? 1 : 0,
      totalCasesLost: outcome === "lost" ? 1 : 0,
      totalCasesTied: outcome === "tied" ? 1 : 0,
    };

    if (options.isQuickplay) {
      aggregateUpdates.gamesFinished = 1;
      aggregateUpdates.quickplaysFinished = 1;
      aggregateUpdates[`quickplays${aggregateOutcomeField}`] = 1;
      aggregateUpdates.lastQuickplayFinished = "__SERVER_TIMESTAMP__";
      aggregateUpdates.lastGameFinished = "__SERVER_TIMESTAMP__";
    }

    await Promise.all([
      courtStats.writeCourtAggregateStats(aggregateUpdates),
      courtStats.writeCaseStats({ caseName: game.currentCase.name, outcome, winningSide }),
      courtStats.writeJusticeStats({ benchJusticeNames, attackedJusticeNames: [...trialAttackedJustices] }),
      courtStats.writeStanceStats({ stanceNames, outcome }),
      courtStats.writeCaseJusticeVoteStats({
        caseName: game.currentCase.name,
        voteByJusticeName,
        prosecutionName: game.currentCase.prosecution.name,
        defenseName: game.currentCase.defendant.name,
      }),
    ]);
  }

  async function trackCampaignStarted(campaignName: string): Promise<void> {
    await Promise.all([
      courtStats.writeCourtAggregateStats({
        gamesStarted: 1,
        campaignsStarted: 1,
        lastCampaignStarted: "__SERVER_TIMESTAMP__",
        lastGameStarted: "__SERVER_TIMESTAMP__",
      }),
      courtStats.writeCampaignStats({ campaignName, event: "start" }),
    ]);
  }

  async function trackCampaignCompleted(campaignName: string, won: boolean): Promise<void> {
    await Promise.all([
      courtStats.writeCourtAggregateStats({
        gamesFinished: 1,
        campaignsFinished: 1,
        campaignsWon: won ? 1 : 0,
        campaignsLost: won ? 0 : 1,
        lastCampaignFinished: "__SERVER_TIMESTAMP__",
        lastGameFinished: "__SERVER_TIMESTAMP__",
      }),
      courtStats.writeCampaignStats({ campaignName, event: won ? "win" : "loss" }),
    ]);
  }

  // ── Campaign objective / reward writes (thin wrappers over the raw stat-writers) ──
  function trackObjectiveChosen(objectiveName: string): void {
    void courtStats.writeObjectiveStats({ objectiveName, chosen: true });
  }
  function trackObjectiveResult(objectiveName: string, won: boolean): void {
    void courtStats.writeObjectiveStats({ objectiveName, succeeded: won, failed: !won });
  }
  function trackRewardActivated(rewardName: string): void {
    void courtStats.writeRewardStats({ rewardName, activated: true });
  }
  function trackRewardChosen(rewardName: string): void {
    void courtStats.writeRewardStats({ rewardName, chosen: true });
  }

  return {
    trackQuickplayStarted,
    trackTacticPlay,
    trackTrialVerdictStats,
    trackCampaignStarted,
    trackCampaignCompleted,
    trackObjectiveChosen,
    trackObjectiveResult,
    trackRewardActivated,
    trackRewardChosen,
  };
}
