import { computed, type ComputedRef } from "vue";
import type { Justice, Case, CourtGameState, CampaignState, ObjectiveCard, RewardCard, President, Side } from "./_types";
import { currentJustices, historicalJustices, fictionalJustices, celebrityJustices, warrenJustices, lochnerJustices } from "./justices";
import { cases as allCases, casesHistorical, casesFictional } from "./_cases";
import { objectives } from "./_objectives";
import { rewardCards } from "./_rewards";
import { campaignSetups } from "./_campaigns";
import { presidents } from "./_presidents";
import { campaignSettings } from "./_settings";
import { rightParties, leftParties, partiesAligned } from "./_tacticEffects";
import { cheats, cheatsActive } from "./_cheats";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VerdictSummary {
  won: boolean;
  tied: boolean;
  forCount: number;
  againstCount: number;
  abstainCount: number;
}

/** Subset of the ui reactive used by campaign management. */
export interface CampaignUiAccess {
  phase: string;
  isCampaignMode: boolean;
  campaignSetupId: number | null;
  rewardTargetJustice: number | null;
  rewardEligibleTarget: number | null;
  activatingRewardId: string | null;
  courtReportVisible: boolean;
  opponentThinking: boolean;
  opponentHighlightedCardId: number | null;
  detailJustice: Justice | null;
  detailPresident: President | null;
  targetingChoice: Justice | null;
}

type CourtPlay = {
  actor: "player" | "opponent";
  tacticName: string;
  cardType: string;
  targetName: string;
  results: { justiceName: string; change: number }[];
  round: number;
};

// ─── Composable ───────────────────────────────────────────────────────────────

export function useCampaignManager(
  game: CourtGameState,
  campaign: { data: CampaignState | null },
  ui: CampaignUiAccess,
  verdict: ComputedRef<VerdictSummary | null>,
  courtReport: { plays: CourtPlay[] },
  shuffle: <T>(array: T[]) => T[],
) {
  // ─── Internal Helpers ──────────────────────────────────────────

  /** Builds all justices array for use in campaign functions. */
  function getAllJusticesRaw(): Justice[] {
    return [...currentJustices, ...historicalJustices, ...fictionalJustices, ...celebrityJustices, ...warrenJustices, ...lochnerJustices];
  }

  /** Pick a random president from a given party alignment (left/right) that is NOT the current one. */
  function pickNewPresident(currentPresident: President, preferOppositeParty: boolean): President {
    const currentIsRight = rightParties.includes(currentPresident.party);
    const filtered = presidents.filter((p) => {
      if (p.id === currentPresident.id) return false;
      const isRight = rightParties.includes(p.party);
      return preferOppositeParty ? isRight !== currentIsRight : isRight === currentIsRight;
    });
    const pool = filtered.length > 0 ? filtered : presidents.filter((p) => p.id !== currentPresident.id);
    return pool[Math.floor(Math.random() * pool.length)] ?? currentPresident;
  }

  /** Returns a candidate justice to fill a vacancy, respecting president stances and party preference. */
  function pickNominee(
    currentPresident: President,
    currentBench: Justice[],
    dreamJusticeId: number | null,
    departedIds: Set<number> = new Set(),
  ): Justice | null {
    const allJ = getAllJusticesRaw();
    const onBench = new Set(currentBench.map((j) => j.id));
    const available = allJ.filter((j) => !onBench.has(j.id) && !departedIds.has(j.id));
    if (!available.length) return null;
    // Dream Justice queued → use that justice if available
    if (dreamJusticeId !== null) {
      const dream = available.find((j) => j.id === dreamJusticeId);
      if (dream) return dream;
    }
    // Prefer justices nominatedBy the current president (exact match)
    const preferred = available.filter((j) => j.nominatedBy?.id === currentPresident.id);
    if (preferred.length) return preferred[Math.floor(Math.random() * preferred.length)];

    // Score available justices by shared stances with the president
    if (currentPresident.stances?.length) {
      const presStanceMap = new Map(currentPresident.stances.map((s) => [s.topic, s.position]));
      const scored = available.map((j) => {
        let score = 0;
        // Party alignment base score
        if (partiesAligned(j.nominatedBy?.party, currentPresident.party)) score += 2;
        // Shared stances add to score
        if (j.stances) {
          for (const { topic, position } of j.stances) {
            const presPosition = presStanceMap.get(topic);
            if (!presPosition || presPosition === "Neutral" || position === "Neutral") continue;
            if (position === presPosition) score += 3;
            else score -= 1;
          }
        }
        return { justice: j, score };
      });
      // Candidates with at least 2 same-party score AND 1+ shared stance
      const strong = scored.filter((s) => s.score >= 5);
      if (strong.length) {
        const pick = strong[Math.floor(Math.random() * strong.length)];
        return pick.justice;
      }
      // Fall back to best scorer in same party
      const samePartyCandidates = scored.filter((s) => partiesAligned(s.justice.nominatedBy?.party, currentPresident.party));
      if (samePartyCandidates.length) {
        samePartyCandidates.sort((a, b) => b.score - a.score);
        // Pick from top half to allow some variance
        const topHalf = samePartyCandidates.slice(0, Math.max(1, Math.ceil(samePartyCandidates.length / 2)));
        return topHalf[Math.floor(Math.random() * topHalf.length)].justice;
      }
    }

    // Fall back to same party (no stances scored)
    const sameParty = available.filter((j) => partiesAligned(j.nominatedBy?.party, currentPresident.party));
    if (sameParty.length) return sameParty[Math.floor(Math.random() * sameParty.length)];
    // Last resort: any available justice
    return available[Math.floor(Math.random() * available.length)];
  }

  /** Clone a Justice so campaign nomination re-assignment doesn't mutate source data. */
  function cloneJustice(j: Justice, nominatingPresident?: President): Justice {
    const clone: Justice = { ...j, nominatedBy: j.nominatedBy ? { ...j.nominatedBy } : undefined };
    // Optionally inherit 1–2 stances from the nominating president that the justice doesn't already have
    if (nominatingPresident?.stances?.length && Math.random() < 0.6) {
      const existingTopics = new Set(clone.stances?.map((s) => s.topic) ?? []);
      const newStances = ((nominatingPresident.stances ?? []) as NonNullable<Justice["stances"]>)
        .filter((s) => !existingTopics.has(s.topic) && s.position !== "Neutral")
        .slice(0, Math.random() < 0.3 ? 2 : 1); // 30% chance to inherit 2, otherwise 1
      if (newStances.length) {
        clone.stances = [...(clone.stances ?? []), ...newStances];
      }
    }
    return clone;
  }

  /** Build a reward deck, placing cheat-ordered IDs first when cheats are active. */
  function buildCheatRewardDeck(pool: RewardCard[]): RewardCard[] {
    if (!cheatsActive || cheats.shuffleBonus || !cheats.bonusOrder) return shuffle(pool);
    const orderedIds = new Set(cheats.bonusOrder);
    const ordered = cheats.bonusOrder.map((id) => pool.find((c) => c.id === id)).filter((c): c is RewardCard => !!c);
    const rest = shuffle(pool.filter((c) => !orderedIds.has(c.id)));
    return [...ordered, ...rest];
  }

  /** Build an objective list, placing cheat-ordered IDs first when cheats are active. */
  function buildCheatObjectiveList(pool: ObjectiveCard[]): ObjectiveCard[] {
    if (!cheatsActive || cheats.shuffleObjectives || !cheats.objectiveOrder) return shuffle(pool);
    const orderedIds = new Set(cheats.objectiveOrder);
    const ordered = cheats.objectiveOrder.map((id) => pool.find((o) => o.id === id)).filter((o): o is ObjectiveCard => !!o);
    const rest = shuffle(pool.filter((o) => !orderedIds.has(o.id)));
    return [...ordered, ...rest];
  }

  /** Generate a random-ish in-game date string within a given year. */
  function recessDate(year: number): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const m = months[Math.floor(Math.random() * 12)];
    const d = Math.floor(Math.random() * 28) + 1;
    return `${m} ${d}, ${year}`;
  }

  /** Draw a reward card from the campaign reward deck (reshuffles discard if needed). */
  function drawRewardCard(): RewardCard | null {
    if (!campaign.data) return null;
    const c = campaign.data;
    if (c.rewardDeck.length === 0) {
      if (c.rewardDiscard.length === 0) return null;
      c.rewardDeck = buildCheatRewardDeck([...c.rewardDiscard]);
      c.rewardDiscard = [];
    }
    return c.rewardDeck.shift() ?? null;
  }

  /** Route to activateBonus screen (if applicable) or directly to recess. */
  function goToActivateBonusOrRecess(): void {
    if (!campaign.data) return;
    const c = campaign.data;
    const hasRecessCards = c.rewardHand.some((r) => r.deployPhase === "recess" || r.deployPhase === "either");
    const hasPendingVeto = c.vetoChoices !== null && !c.vetoConfirmed;
    if (hasRecessCards || hasPendingVeto || c.latestRewardCardId !== null) {
      ui.phase = "activateBonus";
    } else {
      processRecess();
    }
  }

  /**
   * Check if the current verdict satisfies (or violates) the campaign objective.
   * Returns true if the player passes (or the objective doesn't apply), false on failure.
   */
  function checkObjective(): boolean {
    if (!campaign.data?.activeObjective || !verdict.value || !game.currentCase || !game.playerSide) return true;
    const obj = campaign.data.activeObjective;
    const verd = verdict.value;
    if (verd.tied) return true; // ties are handled separately (retry), not a fail

    // Which party won the case (based on verdict outcome)?
    const winningSide: Side = verd.won ? game.playerSide : game.playerSide === "prosecution" ? "defendant" : "prosecution";
    const winningParty = winningSide === "prosecution" ? game.currentCase.prosecution.favoredBy : game.currentCase.defendant.favoredBy;

    switch (obj.id) {
      case "win-all":
        return verd.won;
      case "lose-all":
        return !verd.won;
      case "five-four":
        return Math.abs(verd.forCount - verd.againstCount) === 1 && verd.abstainCount === 0;
      case "defend-the-law":
      case "prosecute":
        if (!verd.won) {
          // Allow the first loss; end campaign on the second
          const previousLosses = campaign.data!.trialResults.filter((r) => !r.won).length;
          return previousLosses < 1;
        }
        return true;
      case "right-wing":
        return rightParties.includes(winningParty);
      case "left-wing":
        return leftParties.includes(winningParty);
      default:
        return true;
    }
  }

  /** Final check: did the player meet their objective across all trials? */
  function checkObjectiveOverall(): boolean {
    if (!campaign.data?.activeObjective) return true;
    const obj = campaign.data.activeObjective;
    const results = campaign.data.trialResults;
    switch (obj.id) {
      case "win-all":
        return results.every((r) => r.won);
      case "lose-all":
        return results.every((r) => !r.won);
      case "five-four":
        return results.every((r) => Math.abs(r.forCount - r.againstCount) === 1 && r.abstainCount === 0);
      case "defend-the-law":
      case "prosecute":
        return results.filter((r) => !r.won).length <= 1;
      case "right-wing":
      case "left-wing":
        return true; // enforced per-trial as each verdict is checked
      default:
        return true;
    }
  }

  // ─── Campaign Lifecycle ────────────────────────────────────────

  /** Initialise a fresh campaign from a CampaignSetup. */
  function startCampaign(setupId: number): void {
    const setup = campaignSetups.find((c) => c.id === setupId);
    if (!setup) return;

    ui.isCampaignMode = true;
    ui.campaignSetupId = setupId;

    const allJ = getAllJusticesRaw();

    // Build the initial bench
    let bench: Justice[];
    let chiefId: number;

    if (setup.isRandomBench) {
      const poolTypes = setup.justicePool ?? ["current", "historical", "fictional", "celebrity"];
      const pool = allJ.filter((j) => poolTypes.includes(j.justiceType));
      bench = shuffle(pool)
        .slice(0, 9)
        .map((j) => cloneJustice(j));
      chiefId = bench[Math.floor(Math.random() * bench.length)].id;
    } else {
      bench = (setup.justiceIds ?? [])
        .map((id) => allJ.find((j) => j.id === id))
        .filter((j): j is Justice => !!j)
        .map((j) => cloneJustice(j));
      chiefId = setup.chiefJusticeId ?? bench[0]?.id ?? 0;
    }

    // Pick president
    const president = setup.isRandomPresident ? presidents[Math.floor(Math.random() * presidents.length)] : setup.startPresident;

    const startYear = setup.isRandomStartYear ? 1900 + Math.floor(Math.random() * 127) : setup.startYear;

    // Draw 2 random objectives
    const shuffledObjectives = buildCheatObjectiveList([...objectives]);
    const pair: [ObjectiveCard, ObjectiveCard] = [shuffledObjectives[0], shuffledObjectives[1]];

    // Build reward deck
    const rewardDeck = buildCheatRewardDeck([...rewardCards]);

    campaign.data = {
      setup,
      currentCaseIndex: 0,
      year: startYear,
      president,
      presidentStartYear: startYear,
      objectiveDrawPair: pair,
      activeObjective: null,
      rewardDeck,
      rewardDiscard: [],
      rewardHand: [],
      latestRewardCardId: null,
      activatedPreRecessCardIds: [],
      pendingReward: null,
      trialResults: [],
      permanentChiefJusticeId: null,
      benchSeats: 9,
      pendingBenchSeatDelta: 0,
      dreamJusticeId: null,
      vetoMode: false,
      vetoChoices: null,
      vetoConfirmed: false,
      glazedJusticeIds: [],
      neverRetireIds: [],
      departedJusticeIds: [],
      initialBenchJusticeIds: bench.map((j) => j.id),
      forcedRetirementCount: 0,
      naturalDepartureCount: 0,
      nominationCount: 0,
      recessLog: [],
      isOver: false,
      won: null,
      doubleTapActive: false,
    };

    // Store the bench and chief on the game for use when we deal
    game.bench = bench;
    game.chiefJusticeId = chiefId;
    game.chiefJusticeHardened = true;

    ui.phase = "objectiveDraw";
  }

  /** Player chose their objective; proceed to deal the first trial. */
  function chooseObjective(obj: ObjectiveCard): void {
    if (!campaign.data) return;
    campaign.data.activeObjective = obj;
    dealCampaignTrial();
  }

  /** Deals a trial for the current campaign state (bench already set, case from case list). */
  function dealCampaignTrial(): void {
    if (!campaign.data) return;
    const c = campaign.data;

    // Pick the case for this trial
    let trialCase: Case | null = null;
    if (c.setup.caseIds && c.currentCaseIndex < c.setup.caseIds.length) {
      const caseId = c.setup.caseIds[c.currentCaseIndex];
      trialCase = allCases.find((ca) => ca.id === caseId) ?? null;
    }
    if (!trialCase) {
      // Random case from the appropriate pool
      const poolType = c.setup.casePool?.[0] ?? null;
      const pool = poolType === "historical" ? casesHistorical : poolType === "fictional" ? casesFictional : allCases;
      trialCase = pool[Math.floor(Math.random() * pool.length)];
    }

    // Use the permanent CJ if set
    if (c.permanentChiefJusticeId !== null) {
      const cjOnBench = game.bench.find((j) => j.id === c.permanentChiefJusticeId);
      if (cjOnBench) game.chiefJusticeId = c.permanentChiefJusticeId;
    }

    game.currentCase = trialCase;
    game.playerSide = null;
    game.deck = [];
    game.discardPile = [];
    game.playbook = [];
    game.claimedCards = [];
    game.selectedTacticId = null;
    game.claimingMode = false;
    game.claimedSelections = [];
    game.currentTurn = "player";
    game.round = 1;
    game.leanings = {};
    game.susceptibilityMods = {};
    game.playerShields = [];
    game.opponentShields = [];
    game.recusedJustices = [];
    game.nappingJustices = {};
    game.statMods = {};
    game.weaknessMods = {};
    game.religionOverrides = {};
    game.multiTargetMode = false;
    game.multiTargetSelections = [];
    game.multiTargetTacticId = null;
    game.makeChiefPlayedThisTrial = false;
    game.suggestRetirementTargets = [];
    game.keepCrownActivated = false;
    courtReport.plays = [];
    ui.phase = "setup";
    ui.courtReportVisible = false;
    ui.opponentThinking = false;
    ui.opponentHighlightedCardId = null;
    ui.detailJustice = null;
    ui.targetingChoice = null;
    c.doubleTapActive = false;
  }

  /** Activate a Double Tap reward card during the playing phase. */
  function activateDoubleTap(): void {
    if (!campaign.data) return;
    const idx = campaign.data.rewardHand.findIndex((r) => r.id === "double-tap");
    if (idx === -1 || game.currentTurn !== "player" || ui.opponentThinking) return;
    campaign.data.rewardHand.splice(idx, 1);
    campaign.data.doubleTapActive = true;
  }

  /** Called from the verdict screen — transition to post-verdict campaign flow. */
  function proceedAfterVerdict(): void {
    if (!campaign.data || !verdict.value) return;
    const c = campaign.data;
    const verd = verdict.value;

    // Record this trial's result
    const tacticCounts: Record<string, number> = {};
    courtReport.plays
      .filter((p) => p.actor === "player")
      .forEach((p) => {
        tacticCounts[p.tacticName] = (tacticCounts[p.tacticName] ?? 0) + 1;
      });
    const finalLeanings: Record<number, number> = {};
    game.bench.forEach((j) => {
      finalLeanings[j.id] = game.leanings[j.id] ?? 0;
    });

    // Determine the winning party for wing-shift analysis
    let winningParty = null;
    if (!verd.tied && game.currentCase && game.playerSide) {
      const winningSide: Side = verd.won ? game.playerSide : game.playerSide === "prosecution" ? "defendant" : "prosecution";
      winningParty = winningSide === "prosecution" ? game.currentCase.prosecution.favoredBy : game.currentCase.defendant.favoredBy;
    }

    c.trialResults.push({
      caseName: game.currentCase?.name ?? "Unknown",
      won: verd.won,
      tied: verd.tied,
      forCount: verd.forCount,
      againstCount: verd.againstCount,
      abstainCount: verd.abstainCount,
      tacticCounts,
      finalLeanings,
      winningParty,
    });

    // Apply Keep That Crown
    if (game.keepCrownActivated && game.chiefJusticeId !== null) {
      c.permanentChiefJusticeId = game.chiefJusticeId;
    }

    // Tied verdict → retry same case, same bench
    if (verd.tied) {
      dealCampaignTrial();
      return;
    }

    // Check objective failure
    if (!checkObjective()) {
      c.isOver = true;
      c.won = false;
      ui.phase = "gameOver";
      return;
    }

    // If won, draw a reward card and add directly to hand (skip receiveReward screen)
    if (verd.won) {
      const rewardCard = drawRewardCard();
      if (rewardCard) {
        c.rewardHand.push(rewardCard);
        c.latestRewardCardId = rewardCard.id;
      }
    }

    // Reset activated pre-recess tracking for this new recess phase
    c.activatedPreRecessCardIds = [];

    // Go to pre-recess screen if there are recess-eligible cards or a veto choice pending
    goToActivateBonusOrRecess();
  }

  /**
   * Player collects the pending reward card into their hand and moves on.
   * (Single action per A2 — no keep/deploy split.)
   */
  function collectReward(): void {
    if (!campaign.data?.pendingReward) return;
    campaign.data.rewardHand.push(campaign.data.pendingReward);
    campaign.data.pendingReward = null;
    goToActivateBonusOrRecess();
  }

  /** Player chose to activate a reward card from the activateBonus screen. */
  function activateRecessReward(rewardId: string, targetJusticeId?: number, targetEligibleId?: number): void {
    if (!campaign.data) return;
    const c = campaign.data;
    const idx = c.rewardHand.findIndex((r) => r.id === rewardId && !c.activatedPreRecessCardIds.includes(r.id));
    if (idx === -1) return;
    const reward = c.rewardHand[idx];
    // Mark as activated (kept in hand so UI shows activated state; discarded on Proceed to Recess)
    c.activatedPreRecessCardIds.push(reward.id);

    const allJ = getAllJusticesRaw();

    switch (reward.id) {
      case "wheel-of-retirement": {
        const nonProtected = game.bench.filter((j) => !c.neverRetireIds.includes(j.id));
        if (nonProtected.length) {
          const target = nonProtected[Math.floor(Math.random() * nonProtected.length)];
          game.bench = game.bench.filter((j) => j.id !== target.id);
          c.departedJusticeIds.push(target.id);
          c.forcedRetirementCount++;
          if (c.permanentChiefJusticeId === target.id) c.permanentChiefJusticeId = null;
          ensureChiefJustice(c, c.year);
        }
        break;
      }
      case "not-enough-chairs":
        c.pendingBenchSeatDelta = Math.max(1, c.benchSeats - 1) - c.benchSeats; // -1 seat
        break;
      case "justice-veto": {
        // Pick two random nominees; player will choose between them on the recess screen
        const onBench = new Set(game.bench.map((j) => j.id));
        const departed = new Set(c.departedJusticeIds);
        const available = allJ.filter((j) => !onBench.has(j.id) && !departed.has(j.id));
        if (available.length >= 2) {
          const picks = shuffle([...available]).slice(0, 2);
          c.vetoChoices = [picks[0].id, picks[1].id];
          c.vetoMode = true;
        }
        break;
      }
      case "another-one":
        c.pendingBenchSeatDelta = 1;
        break;
      case "glaze-homie":
        if (targetJusticeId !== undefined && !c.glazedJusticeIds.includes(targetJusticeId)) {
          c.glazedJusticeIds.push(targetJusticeId);
        }
        break;
      case "never-retire":
        if (targetJusticeId !== undefined && !c.neverRetireIds.includes(targetJusticeId)) {
          c.neverRetireIds.push(targetJusticeId);
        }
        break;
      case "mutiny": {
        const others = game.bench.filter((j) => j.id !== game.chiefJusticeId);
        if (others.length) {
          const newCJ = others[Math.floor(Math.random() * others.length)];
          game.chiefJusticeId = newCJ.id;
          game.chiefJusticeHardened = false;
          c.permanentChiefJusticeId = newCJ.id;
        }
        break;
      }
      case "dream-justice":
        if (targetEligibleId !== undefined) {
          c.dreamJusticeId = targetEligibleId;
        }
        break;
      default:
        // unknown card — burn it
        break;
    }
    c.rewardDiscard.push(reward);
    ui.rewardTargetJustice = null;
    ui.rewardEligibleTarget = null;
    ui.activatingRewardId = null;
  }

  /** If the current chief justice has left the bench, elect a new one immediately. */
  function ensureChiefJustice(c: CampaignState, newYear: number): void {
    if (game.bench.length === 0) return;
    if (game.bench.some((j) => j.id === game.chiefJusticeId)) return;
    // Chief is gone — elect a random remaining justice
    const newCJ = game.bench[Math.floor(Math.random() * game.bench.length)];
    game.chiefJusticeId = newCJ.id;
    game.chiefJusticeHardened = false;
    if (c.permanentChiefJusticeId !== null && !game.bench.some((j) => j.id === c.permanentChiefJusticeId)) {
      c.permanentChiefJusticeId = null;
    }
    c.recessLog.push({ date: recessDate(newYear), text: `${newCJ.name} is appointed as the new Chief Justice.` });
  }

  /** Player clicks "Proceed to Recess" — discard all recess-phase cards and proceed. */
  function doneActivatingBonus(): void {
    if (!campaign.data) return;
    const c = campaign.data;
    // All recess/either-phase cards (activated and unactivated) get discarded
    const toDiscard = c.rewardHand.filter((r) => r.deployPhase === "recess" || r.deployPhase === "either");
    toDiscard.forEach((r) => c.rewardDiscard.push(r));
    c.rewardHand = c.rewardHand.filter((r) => !toDiscard.some((d) => d === r));
    c.activatedPreRecessCardIds = [];
    c.latestRewardCardId = null;
    processRecess();
  }

  /** Process all recess events in order and build recessLog. */
  function processRecess(): void {
    if (!campaign.data) return;
    const c = campaign.data;
    c.recessLog = [];
    const allJ = getAllJusticesRaw();

    // Advance year by 2 (each recess = 2 years)
    c.year += 2;
    const newYear = c.year;

    // ── Step 1: Presidential election ──────────────────────────
    const isElectionYear = newYear % 4 === 0;
    const yearsServed = newYear - c.presidentStartYear;
    const termsServed = Math.floor(yearsServed / 4);
    if (isElectionYear) {
      const isTermLimited = termsServed >= campaignSettings.presidentialElection.maxTerms;
      if (isTermLimited) {
        const newPres = pickNewPresident(c.president, true);
        const oldName = c.president.name;
        c.president = newPres;
        c.presidentStartYear = newYear;
        c.recessLog.push({
          date: `Nov ${Math.floor(Math.random() * 3) + 3}, ${newYear}`,
          text: `${oldName} has reached the end of his term. ${newPres.name} is now The President.`,
        });
        c.recessLog.push({ date: `Jan 20, ${newYear + 1}`, text: `${newPres.name} is inaugurated as President of the United States.` });
      } else {
        const lost = Math.random() * 100 < campaignSettings.presidentialElection.electionChance;
        if (lost) {
          const newPres = pickNewPresident(c.president, true);
          const oldName = c.president.name;
          c.president = newPres;
          c.presidentStartYear = newYear;
          c.recessLog.push({
            date: `Nov ${Math.floor(Math.random() * 3) + 3}, ${newYear}`,
            text: `${newPres.name} has won the presidential election. ${oldName} is out.`,
          });
          c.recessLog.push({ date: `Jan 20, ${newYear + 1}`, text: `${newPres.name} is inaugurated as President of the United States.` });
        } else {
          c.recessLog.push({
            date: `Nov ${Math.floor(Math.random() * 3) + 3}, ${newYear}`,
            text: `${c.president.name} won re-election. They will remain President for another four years.`,
          });
        }
      }
    } else {
      c.recessLog.push({ date: recessDate(newYear), text: `${c.president.name} remains The President.` });
    }

    // ── Step 2: Forced retirements (Suggest Retirement tactic) ──
    for (const id of game.suggestRetirementTargets) {
      const j = game.bench.find((jj) => jj.id === id);
      if (j) {
        game.bench = game.bench.filter((jj) => jj.id !== id);
        c.departedJusticeIds.push(id);
        c.forcedRetirementCount++;
        c.recessLog.push({ date: recessDate(newYear), text: `Justice ${j.name} has announced their retirement.` });
      }
    }
    game.suggestRetirementTargets = [];
    ensureChiefJustice(c, newYear);

    // ── Step 3: Random justice attrition ─────────────────────────
    const doDeaths = Math.random() * 100 < campaignSettings.justiceAttrition.deathChance;
    if (doDeaths) {
      const { minDeaths, maxDeaths } = campaignSettings.justiceAttrition;
      const numDeaths = minDeaths + Math.floor(Math.random() * (maxDeaths - minDeaths + 1));
      const candidates = shuffle(game.bench.filter((j) => !c.neverRetireIds.includes(j.id)));
      const dying = candidates.slice(0, Math.min(numDeaths, candidates.length));
      for (const j of dying) {
        game.bench = game.bench.filter((jj) => jj.id !== j.id);
        c.departedJusticeIds.push(j.id);
        c.naturalDepartureCount++;
        if (c.permanentChiefJusticeId === j.id) c.permanentChiefJusticeId = null;
        c.recessLog.push({ date: recessDate(newYear), text: `Justice ${j.name} has passed away.` });
      }
    }
    ensureChiefJustice(c, newYear);

    // ── Step 4: Bench seat adjustments ───────────────────────────
    if (c.pendingBenchSeatDelta !== 0) {
      c.benchSeats = Math.max(1, c.benchSeats + c.pendingBenchSeatDelta);
      if (c.pendingBenchSeatDelta > 0) {
        c.recessLog.push({ date: recessDate(newYear), text: `The size of the Supreme Court has been expanded to ${c.benchSeats} justices.` });
      } else {
        // Not Enough Chairs (A4): force a vacancy if the bench already meets the reduced seat count
        if (game.bench.length >= c.benchSeats) {
          const forceCandidates = shuffle(game.bench.filter((j) => !c.neverRetireIds.includes(j.id)));
          const forced = forceCandidates[0];
          if (forced) {
            game.bench = game.bench.filter((j) => j.id !== forced.id);
            c.departedJusticeIds.push(forced.id);
            c.naturalDepartureCount++;
            if (c.permanentChiefJusticeId === forced.id) c.permanentChiefJusticeId = null;
          }
        }
        c.recessLog.push({ date: recessDate(newYear), text: `One bench seat has been eliminated. The Court now has ${c.benchSeats} justices.` });
      }
      c.pendingBenchSeatDelta = 0;
    }
    ensureChiefJustice(c, newYear);

    // ── Step 5: Fill vacancies ─────────────────────────────────────
    // Dream Justice fills first vacancy; Justice Veto fills the second (player chose during activateBonus)
    while (game.bench.length < c.benchSeats) {
      let nominee: Justice | null = null;

      if (c.dreamJusticeId !== null) {
        // Dream Justice takes priority for the first open seat
        const dreamRaw = getAllJusticesRaw().find((j) => j.id === c.dreamJusticeId && !game.bench.some((b) => b.id === j.id));
        if (dreamRaw) {
          nominee = cloneJustice(dreamRaw, c.president);
          c.dreamJusticeId = null;
        }
      }

      if (!nominee && c.vetoMode && c.vetoChoices) {
        // Justice Veto: player already picked their choice (stored as vetoChoices[0] after selection)
        const vetoJ = allJ.find((j) => j.id === c.vetoChoices![0] && !game.bench.some((b) => b.id === j.id));
        nominee = vetoJ ? cloneJustice(vetoJ, c.president) : null;
        c.vetoChoices = null;
        c.vetoMode = false;
        c.vetoConfirmed = false;
      }

      if (!nominee) {
        const raw = pickNominee(c.president, game.bench, null, new Set(c.departedJusticeIds));
        if (!raw) break;
        nominee = cloneJustice(raw, c.president);
      }

      if (!nominee) break;

      // Rewrite nominatedBy to current president
      nominee.nominatedBy = { ...c.president };
      game.bench.push(nominee);
      c.nominationCount++;
      c.recessLog.push({ date: recessDate(newYear), text: `President ${c.president.name} nominates ${nominee.name} to the Supreme Court.` });
      c.recessLog.push({
        date: `Jan ${Math.floor(Math.random() * 20) + 1}, ${newYear + 1}`,
        text: `${nominee.name} is confirmed and sworn in as an Associate Justice.`,
      });
    }

    ui.phase = "recess";
  }

  /** Called from the recess screen — advance to next trial or end campaign. */
  function proceedFromRecess(): void {
    if (!campaign.data) return;
    const c = campaign.data;
    c.currentCaseIndex++;

    const totalCases = c.setup.caseIds ? c.setup.caseIds.length : campaignSettings.campaignLength;

    if (c.currentCaseIndex >= totalCases) {
      c.isOver = true;
      c.won = checkObjectiveOverall();
      ui.phase = "gameOver";
    } else {
      dealCampaignTrial();
    }
  }

  // ─── Computed: Campaign Helpers ───────────────────────────────

  /** Justices currently eligible to be targeted by Dream Justice (not on bench). */
  const eligibleJustices = computed(() => {
    const onBench = new Set(game.bench.map((j) => j.id));
    return getAllJusticesRaw().filter((j) => !onBench.has(j.id));
  });

  /** Reward cards in hand that can be deployed during the recess (activateBonus screen). */
  const recessRewardCards = computed(() => campaign.data?.rewardHand.filter((r) => r.deployPhase === "recess" || r.deployPhase === "either") ?? []);

  /** Reward cards in hand that can be deployed during a trial. */
  const trialRewardCards = computed(() =>
    ui.isCampaignMode ? (campaign.data?.rewardHand.filter((r) => r.deployPhase === "trial" || r.deployPhase === "either") ?? []) : [],
  );

  /** Campaign progress text: "Trial N of M". */
  const campaignProgress = computed(() => {
    if (!campaign.data) return null;
    const c = campaign.data;
    const total = c.setup.caseIds ? c.setup.caseIds.length : campaignSettings.campaignLength;
    return `Trial ${c.currentCaseIndex + 1} of ${total}`;
  });

  /** Whether the objective is on track (null | "tied" | "passing" | "failing"). */
  const objectiveStatus = computed(() => {
    if (!campaign.data?.activeObjective || !verdict.value) return null;
    if (verdict.value.tied) return "tied";
    return checkObjective() ? "passing" : "failing";
  });

  /** Game-over stats for the summary screen. */
  const gameOverStats = computed(() => {
    if (!campaign.data) return null;
    const c = campaign.data;
    const results = c.trialResults;
    const wins = results.filter((r) => r.won).length;
    const losses = results.filter((r) => !r.won).length;

    // Signature move
    const tacticTotal: Record<string, number> = {};
    results.forEach((r) =>
      Object.entries(r.tacticCounts).forEach(([name, count]) => {
        tacticTotal[name] = (tacticTotal[name] ?? 0) + count;
      }),
    );
    const signatureMove = Object.entries(tacticTotal).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "None";

    // Favorite / Least favorite justice (by accumulated final leaning across all trials)
    const leaningTotal: Record<number, number> = {};
    results.forEach((r) =>
      Object.entries(r.finalLeanings).forEach(([id, l]) => {
        leaningTotal[Number(id)] = (leaningTotal[Number(id)] ?? 0) + l;
      }),
    );
    const allEntries = Object.entries(leaningTotal).map(([id, sum]) => ({ id: Number(id), sum }));
    const allJ = getAllJusticesRaw();
    const favId = allEntries.sort((a, b) => b.sum - a.sum)[0]?.id;
    const leastId = allEntries.sort((a, b) => a.sum - b.sum)[0]?.id;
    const favoriteJustice = allJ.find((j) => j.id === favId)?.name ?? "—";
    const leastFavoriteJustice = allJ.find((j) => j.id === leastId)?.name ?? "—";

    // Best / worst case
    const bestCase = results.reduce((a, b) => (b.forCount - b.againstCount > a.forCount - a.againstCount ? b : a), results[0]);
    const worstCase = results.reduce((a, b) => (b.forCount - b.againstCount < a.forCount - a.againstCount ? b : a), results[0]);

    // Court wing shift: compare initial bench party composition vs final bench
    const allJustices = getAllJusticesRaw();
    const benchWing = (ids: number[]) => {
      const justices = ids.map((id) => allJustices.find((j) => j.id === id)).filter((j): j is Justice => !!j);
      const right = justices.filter((j) => j.nominatedBy && rightParties.includes(j.nominatedBy.party)).length;
      const left = justices.filter((j) => j.nominatedBy && leftParties.includes(j.nominatedBy.party)).length;
      return { right, left };
    };
    const initWing = benchWing(c.initialBenchJusticeIds);
    const finalWing = benchWing(game.bench.map((j) => j.id));
    // Positive = court moved right, negative = moved left
    const courtNetShift = finalWing.right - finalWing.left - (initWing.right - initWing.left);
    const courtWingLabel = courtNetShift > 0 ? "➡️ More right-wing" : courtNetShift < 0 ? "⬅️ More left-wing" : null;

    // Country wing: count left vs right partisan wins across trial results
    let countryRight = 0;
    let countryLeft = 0;
    results.forEach((r) => {
      if (!r.winningParty) return;
      if (rightParties.includes(r.winningParty)) countryRight++;
      else if (leftParties.includes(r.winningParty)) countryLeft++;
    });
    const countryWingLabel =
      countryRight > countryLeft
        ? "➡️ More right-wing decisions"
        : countryLeft > countryRight
          ? "⬅️ More left-wing decisions"
          : countryRight > 0
            ? "⚖️ Balanced decisions"
            : null;

    return {
      wins,
      losses,
      signatureMove,
      favoriteJustice,
      leastFavoriteJustice,
      bestCase: bestCase?.caseName ?? "—",
      worstCase: worstCase?.caseName ?? "—",
      courtWingLabel,
      countryWingLabel,
      forcedRetirements: c.forcedRetirementCount,
      totalDepartures: c.forcedRetirementCount + c.naturalDepartureCount,
      totalNominations: c.nominationCount,
    };
  });

  // ─────────────────────────────────────────────────────────────────────────────

  /** Justice objects for the current Justice Veto choices (IDs → Justice lookup). */
  const vetoChoiceJustices = computed(() => {
    if (!campaign.data?.vetoChoices || campaign.data.vetoConfirmed) return [];
    const allJ = getAllJusticesRaw();
    return campaign.data.vetoChoices.map((id) => allJ.find((j) => j.id === id)).filter((j): j is Justice => !!j);
  });

  /**
   * Confirm the player's Justice Veto nominee selection.
   * Puts the chosen justice ID first in vetoChoices so processRecess() picks it up.
   * Clears the veto modal.
   */
  function confirmVetoNominee(justiceId: number): void {
    if (!campaign.data?.vetoChoices) return;
    const c = campaign.data;
    const other = c.vetoChoices.find((id) => id !== justiceId) ?? c.vetoChoices[0];
    c.vetoChoices = [justiceId, other];
    c.vetoConfirmed = true;
    // vetoChoices stays set (processRecess reads [0]); just clear the UI selection
    ui.rewardEligibleTarget = null;
  }

  return {
    startCampaign,
    chooseObjective,
    activateDoubleTap,
    proceedAfterVerdict,
    collectReward,
    activateRecessReward,
    confirmVetoNominee,
    doneActivatingBonus,
    proceedFromRecess,
    eligibleJustices,
    vetoChoiceJustices,
    recessRewardCards,
    trialRewardCards,
    campaignProgress,
    objectiveStatus,
    gameOverStats,
  };
}
