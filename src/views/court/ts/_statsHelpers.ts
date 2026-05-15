import { doc, getDoc, increment, serverTimestamp, setDoc, type Firestore, type FieldValue } from "firebase/firestore";

import type { Case, Side, TacticEffectType, TurnActor } from "./_types";

export type CourtOutcome = "won" | "lost" | "tied";
export type JusticeVote = "prosecution" | "defense" | "abstain";

interface TacticShiftMetrics {
  netShift: number;
  absoluteShift: number;
}

interface TacticWriteOptions {
  tacticName: string;
  actor: TurnActor;
  metrics: TacticShiftMetrics;
}

interface CaseWriteOptions {
  caseName: string;
  outcome: CourtOutcome;
  winningSide: Side | null;
}

interface JusticeWriteOptions {
  benchJusticeNames: string[];
  attackedJusticeNames?: string[];
  retiredJusticeNames?: string[];
  nominatedJusticeNames?: string[];
}

interface CampaignWriteOptions {
  campaignName: string;
  event: "start" | "win" | "loss";
}

interface ObjectiveWriteOptions {
  objectiveName: string;
  chosen?: boolean;
  succeeded?: boolean;
  failed?: boolean;
}

interface RewardWriteOptions {
  rewardName: string;
  chosen?: boolean;
  activated?: boolean;
}

interface StanceWriteOptions {
  stanceNames: string[];
  outcome: CourtOutcome;
}

interface CaseJusticeVoteWriteOptions {
  caseName: string;
  voteByJusticeName: Record<string, JusticeVote>;
}

interface StatsDeps {
  doc: typeof doc;
  getDoc: typeof getDoc;
  increment: typeof increment;
  serverTimestamp: typeof serverTimestamp;
  setDoc: typeof setDoc;
}

const defaultDeps: StatsDeps = {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
};

function uniqueNames(values: string[] = []): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function classifyJusticeVote(leaning: number, playerSide: Side): JusticeVote {
  if (leaning === 0) return "abstain";

  if (playerSide === "prosecution") {
    return leaning > 0 ? "prosecution" : "defense";
  }

  return leaning > 0 ? "defense" : "prosecution";
}

export function getOutcomeFromVerdict(verdict: { won: boolean; tied: boolean }): CourtOutcome {
  if (verdict.tied) return "tied";
  return verdict.won ? "won" : "lost";
}

export function getWinningSide(playerSide: Side, outcome: CourtOutcome): Side | null {
  if (outcome === "tied") return null;
  if (outcome === "won") return playerSide;
  return playerSide === "prosecution" ? "defendant" : "prosecution";
}

export function getTrackedStanceNamesForOutcome(courtCase: Case, playerSide: Side, outcome: CourtOutcome): string[] {
  const getTopics = (side: Side): string[] => {
    const stanceMap = side === "prosecution" ? courtCase.prosecution.stances : courtCase.defendant.stances;
    if (!stanceMap) return [];

    return Object.entries(stanceMap)
      .filter(([, position]) => position && position !== "Neutral")
      .map(([topic]) => topic);
  };

  if (outcome === "tied") {
    return uniqueNames([...getTopics("prosecution"), ...getTopics("defendant")]);
  }

  const winningSide = getWinningSide(playerSide, outcome);
  if (!winningSide) return [];

  return uniqueNames(getTopics(winningSide));
}

export function computeTacticShiftMetrics(results: Array<{ change: number }>): TacticShiftMetrics {
  return results.reduce(
    (acc, result) => {
      acc.netShift += result.change;
      acc.absoluteShift += Math.abs(result.change);
      return acc;
    },
    { netShift: 0, absoluteShift: 0 },
  );
}

interface AttackedJusticeTrackingOptions {
  effectType: TacticEffectType;
  targetJusticeName?: string | null;
  multiTargetJusticeNames?: string[];
}

export function getAttackedJusticeNamesForPlay(options: AttackedJusticeTrackingOptions): string[] {
  const { effectType, targetJusticeName, multiTargetJusticeNames = [] } = options;

  if (effectType === "swap-clerks") {
    return uniqueNames(multiTargetJusticeNames);
  }

  if (!targetJusticeName) return [];
  return uniqueNames([targetJusticeName]);
}

export function createCourtStatsHelpers(db: Firestore, deps: StatsDeps = defaultDeps) {
  async function safeWrite(writeLabel: string, callback: () => Promise<void>): Promise<void> {
    try {
      await callback();
    } catch (error) {
      console.error(`[Court stats] Write failed (${writeLabel}):`, error);
    }
  }

  async function writeCourtAggregateStats(updates: Record<string, FieldValue | string | number | null>): Promise<void> {
    await safeWrite("aggregate", async () => {
      const aggregateRef = deps.doc(db, "stats/court");
      const normalizedUpdates = Object.fromEntries(
        Object.entries(updates).map(([key, value]) => {
          if (typeof value === "number") return [key, deps.increment(value)];
          if (value === "__SERVER_TIMESTAMP__") return [key, deps.serverTimestamp()];
          return [key, value];
        }),
      );

      await deps.setDoc(aggregateRef, normalizedUpdates, { merge: true });
    });
  }

  async function writeCaseStats(options: CaseWriteOptions): Promise<void> {
    await safeWrite("case", async () => {
      const { caseName, outcome, winningSide } = options;
      const caseRef = deps.doc(db, `stats/court/cases/${caseName}`);
      await deps.setDoc(
        caseRef,
        {
          name: caseName,
          timesPlayed: deps.increment(1),
          timesWon: deps.increment(outcome === "won" ? 1 : 0),
          timesLost: deps.increment(outcome === "lost" ? 1 : 0),
          timesTied: deps.increment(outcome === "tied" ? 1 : 0),
          prosecutionWins: deps.increment(winningSide === "prosecution" ? 1 : 0),
          defenseWins: deps.increment(winningSide === "defendant" ? 1 : 0),
          lastPlayedAt: deps.serverTimestamp(),
        },
        { merge: true },
      );
    });
  }

  async function writeJusticeStats(options: JusticeWriteOptions): Promise<void> {
    const benchJusticeNames = uniqueNames(options.benchJusticeNames);
    const attacked = new Set(uniqueNames(options.attackedJusticeNames));
    const retired = new Set(uniqueNames(options.retiredJusticeNames));
    const nominated = new Set(uniqueNames(options.nominatedJusticeNames));

    await Promise.all(
      benchJusticeNames.map((justiceName) =>
        safeWrite("justice", async () => {
          const justiceRef = deps.doc(db, `stats/court/justices/${justiceName}`);
          await deps.setDoc(
            justiceRef,
            {
              name: justiceName,
              timesAdjudicated: deps.increment(1),
              timesAttacked: deps.increment(attacked.has(justiceName) ? 1 : 0),
              timesRetired: deps.increment(retired.has(justiceName) ? 1 : 0),
              timesNominated: deps.increment(nominated.has(justiceName) ? 1 : 0),
              lastAdjudicatedAt: deps.serverTimestamp(),
            },
            { merge: true },
          );
        }),
      ),
    );
  }

  async function writeTacticStats(options: TacticWriteOptions): Promise<void> {
    await safeWrite("tactic", async () => {
      const { tacticName, actor, metrics } = options;
      const tacticRef = deps.doc(db, `stats/court/tactics/${tacticName}`);

      const existingSnapshot = await deps.getDoc(tacticRef);
      const existing = (existingSnapshot.exists() ? existingSnapshot.data() : {}) as {
        timesPlayed?: number;
        totalNetLeaningShift?: number;
        totalAbsoluteLeaningShift?: number;
      };

      const previousPlays = Number(existing.timesPlayed ?? 0);
      const previousNet = Number(existing.totalNetLeaningShift ?? 0);
      const previousAbsolute = Number(existing.totalAbsoluteLeaningShift ?? 0);

      const nextPlays = previousPlays + 1;
      const nextNet = previousNet + metrics.netShift;
      const nextAbsolute = previousAbsolute + metrics.absoluteShift;

      await deps.setDoc(
        tacticRef,
        {
          name: tacticName,
          timesPlayed: deps.increment(1),
          playerPlays: deps.increment(actor === "player" ? 1 : 0),
          opponentPlays: deps.increment(actor === "opponent" ? 1 : 0),
          totalNetLeaningShift: deps.increment(metrics.netShift),
          totalAbsoluteLeaningShift: deps.increment(metrics.absoluteShift),
          averageNetShiftPerPlay: nextPlays > 0 ? nextNet / nextPlays : 0,
          averageAbsoluteShiftPerPlay: nextPlays > 0 ? nextAbsolute / nextPlays : 0,
          lastPlayedAt: deps.serverTimestamp(),
        },
        { merge: true },
      );
    });
  }

  async function writeCampaignStats(options: CampaignWriteOptions): Promise<void> {
    await safeWrite("campaign", async () => {
      const { campaignName, event } = options;
      const campaignRef = deps.doc(db, `stats/court/campaigns/${campaignName}`);

      await deps.setDoc(
        campaignRef,
        {
          name: campaignName,
          timesPlayed: deps.increment(event === "start" ? 1 : 0),
          timesWon: deps.increment(event === "win" ? 1 : 0),
          timesLost: deps.increment(event === "loss" ? 1 : 0),
          lastPlayedAt: deps.serverTimestamp(),
        },
        { merge: true },
      );
    });
  }

  async function writeObjectiveStats(options: ObjectiveWriteOptions): Promise<void> {
    await safeWrite("objective", async () => {
      const { objectiveName, chosen, succeeded, failed } = options;
      const objectiveRef = deps.doc(db, `stats/court/objectives/${objectiveName}`);

      const updates: Record<string, string | number | FieldValue> = {
        name: objectiveName,
        timesChosen: deps.increment(chosen ? 1 : 0),
        timesSucceeded: deps.increment(succeeded ? 1 : 0),
        timesFailed: deps.increment(failed ? 1 : 0),
      };

      if (chosen) {
        updates.lastChosenAt = deps.serverTimestamp();
      }

      await deps.setDoc(objectiveRef, updates, { merge: true });
    });
  }

  async function writeRewardStats(options: RewardWriteOptions): Promise<void> {
    await safeWrite("reward", async () => {
      const { rewardName, chosen, activated } = options;
      const rewardRef = deps.doc(db, `stats/court/rewards/${rewardName}`);

      const updates: Record<string, string | number | FieldValue> = {
        name: rewardName,
        timesChosen: deps.increment(chosen ? 1 : 0),
        timesActivated: deps.increment(activated ? 1 : 0),
      };

      if (chosen) {
        updates.lastChosenAt = deps.serverTimestamp();
      }
      if (activated) {
        updates.lastActivatedAt = deps.serverTimestamp();
      }

      await deps.setDoc(rewardRef, updates, { merge: true });
    });
  }

  async function writeStanceStats(options: StanceWriteOptions): Promise<void> {
    const { stanceNames, outcome } = options;
    const uniqueStances = uniqueNames(stanceNames);

    await Promise.all(
      uniqueStances.map((stanceName) =>
        safeWrite("stance", async () => {
          const stanceRef = deps.doc(db, `stats/court/stances/${stanceName}`);
          await deps.setDoc(
            stanceRef,
            {
              name: stanceName,
              casesFor: deps.increment(outcome === "won" ? 1 : 0),
              casesAgainst: deps.increment(outcome === "lost" ? 1 : 0),
              casesTied: deps.increment(outcome === "tied" ? 1 : 0),
              lastAdjudicatedAt: deps.serverTimestamp(),
            },
            { merge: true },
          );
        }),
      ),
    );
  }

  async function writeCaseJusticeVoteStats(options: CaseJusticeVoteWriteOptions): Promise<void> {
    const { caseName, voteByJusticeName } = options;

    await Promise.all(
      Object.entries(voteByJusticeName).map(([justiceName, vote]) =>
        safeWrite("justice-case-vote", async () => {
          const caseVoteRef = deps.doc(db, `stats/court/justices/${justiceName}/cases/${caseName}`);
          await deps.setDoc(
            caseVoteRef,
            {
              name: caseName,
              prosecutionVotes: deps.increment(vote === "prosecution" ? 1 : 0),
              defenseVotes: deps.increment(vote === "defense" ? 1 : 0),
              abstainVotes: deps.increment(vote === "abstain" ? 1 : 0),
              lastVotedAt: deps.serverTimestamp(),
            },
            { merge: true },
          );
        }),
      ),
    );
  }

  return {
    writeCourtAggregateStats,
    writeCaseStats,
    writeJusticeStats,
    writeTacticStats,
    writeCampaignStats,
    writeObjectiveStats,
    writeRewardStats,
    writeStanceStats,
    writeCaseJusticeVoteStats,
  };
}
