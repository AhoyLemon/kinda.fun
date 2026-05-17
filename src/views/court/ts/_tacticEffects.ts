import type { Tactic, Justice, CourtGameState, Party } from "./_types";
import { gameSettings, difficultySettings } from "./_settings";

// ─── Types ──────────────────────────────────────────────────────────────────

type TurnActor = "player" | "opponent";

export interface EffectResult {
  justiceName: string;
  change: number;
  newLeaning: number;
  isKnockon?: boolean;
}

export interface EffectOutcome {
  results: EffectResult[];
  reportTarget: string;
  overrideFeedback?: string; // dynamic feedback string (overrides tactic.feedback in toast)
  pendingRedraws?: number; // cards to draw with delay (for discard-all / purge)
}

export interface TacticHelpers {
  drawCard: () => Tactic | null;
  removeFromPlaybook: (t: Tactic) => void;
}

// ─── Magnitude Helpers ───────────────────────────────────────────────────────

/**
 * Returns a qualitative descriptor for the magnitude of a leaning change.
 * Used for toast feedback instead of showing raw numbers.
 */
function getMagnitudeDescriptor(absChange: number): string {
  if (absChange >= 40) return "Devastating effect";
  if (absChange >= 25) return "Strong sway";
  if (absChange >= 15) return "Moderate impact";
  if (absChange >= 5) return "Slight nudge";
  return "Barely moved";
}

/**
 * Generates feedback text for a single-target sway with magnitude context.
 */
function getSingleTargetFeedback(justiceName: string, change: number, tactic: Tactic): string {
  const absChange = Math.abs(change);
  const magnitude = getMagnitudeDescriptor(absChange);

  if (absChange < 5) {
    return `${justiceName} is unmoved.`;
  }

  // Add stat/weakness context if applicable
  let context = "";
  if (tactic.statBasis === "empathy") {
    if (absChange >= 40) context = " Their empathy made them deeply receptive.";
    else if (absChange >= 25) context = " Their empathetic nature showed.";
  } else if (tactic.statBasis === "logic") {
    if (absChange >= 40) context = " The logical appeal resonated strongly.";
    else if (absChange >= 25) context = " Logic carried the day.";
  } else if (tactic.weaknessBasis === "bribery") {
    if (absChange >= 40) context = " They appreciated the generous arrangement.";
    else if (absChange < 15 && change < 0) context = " They were offended by the attempt.";
  } else if (tactic.weaknessBasis === "blackmail") {
    if (absChange >= 40) context = " The leverage was effective.";
  } else if (tactic.weaknessBasis === "threats") {
    if (absChange >= 40) context = " The threat struck home.";
  }

  return `${magnitude}: ${justiceName}.${context}`;
}

// ─── Party Utilities (also used in Court.vue for getInitialLeaning) ─────────

export const leftParties: Party[] = ["Democrat", "Democratic-Republican"];
export const rightParties: Party[] = ["Republican", "Federalist", "Whig"];

export function partiesAligned(a: Party | undefined, b: Party | undefined): boolean {
  if (!a || !b) return false;
  return (leftParties.includes(a) && leftParties.includes(b)) || (rightParties.includes(a) && rightParties.includes(b));
}

export function partiesOpposed(a: Party | undefined, b: Party | undefined): boolean {
  if (!a || !b) return false;
  return (leftParties.includes(a) && rightParties.includes(b)) || (rightParties.includes(a) && leftParties.includes(b));
}

// ─── Internal Helpers ────────────────────────────────────────────────────────

/** Returns justice stat value plus any active trial modifier. */
function getEffectiveStat(justice: Justice, stat: keyof Justice["stats"], game: CourtGameState): number {
  return (justice.stats[stat] ?? 0) + (game.statMods[justice.id]?.[stat] ?? 0);
}

/** Returns justice weakness value plus any active trial modifier. */
function getEffectiveWeakness(justice: Justice, weakness: keyof Justice["weaknesses"], game: CourtGameState): number {
  return (justice.weaknesses[weakness] ?? 0) + (game.weaknessMods[justice.id]?.[weakness] ?? 0);
}

/**
 * Removes a tactic card from wherever it currently lives (playbook or claimed cards),
 * discards it, and draws a replacement into the playbook.
 * For discard-all, do NOT use this — handle manually.
 */
function consumeTactic(game: CourtGameState, tactic: Tactic, helpers: TacticHelpers): void {
  const fromClaimed = game.claimedCards.some((t) => t.id === tactic.id);
  if (fromClaimed) {
    game.claimedCards = game.claimedCards.filter((t) => t.id !== tactic.id);
    const drawn = helpers.drawCard();
    game.discardPile.push(tactic);
    if (drawn) game.playbook.push(drawn);
  } else {
    helpers.removeFromPlaybook(tactic);
  }
}

// ─── Main Effect Resolver ────────────────────────────────────────────────────

/**
 * Resolves the mechanical effect of a tactic card.
 * Mutates the reactive `game` object directly (Vue reactivity tracks it).
 * Returns the results array and target description for the court report + toast.
 */
export function resolveEffect(game: CourtGameState, tactic: Tactic, targetJustice: Justice | null, actor: TurnActor, helpers: TacticHelpers): EffectOutcome {
  const results: EffectResult[] = [];
  let reportTarget = targetJustice?.name ?? "All justices";
  let overrideFeedback: string | undefined;
  let pendingRedraws: number | undefined;

  // ── Discard-all ──────────────────────────────────────────────
  if (tactic.effectType === "discard-all") {
    // The tactic card itself is in the playbook — the whole playbook gets burned.
    // Draws are deferred (pendingRedraws) so the leave animation completes first.
    game.discardPile.push(...game.playbook);
    game.playbook = [];
    pendingRedraws = 5;
    reportTarget = "All Playbook cards";

    // ── Make-chief ───────────────────────────────────────────────
  } else if (tactic.effectType === "make-chief") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      const prevCJId = game.chiefJusticeId;
      const prevCJ = game.bench.find((j) => j.id === prevCJId);
      const prevParty = prevCJ?.nominatedBy?.party;
      const newParty = targetJustice.nominatedBy?.party;

      game.chiefJusticeId = targetJustice.id;
      game.chiefJusticeHardened = false;
      game.makeChiefPlayedThisTrial = true; // enables Keep That Crown

      if (prevCJ) {
        const old = game.leanings[prevCJ.id] ?? 0;
        const next = Math.max(-100, old - 20);
        game.leanings[prevCJ.id] = next;
        results.push({ justiceName: prevCJ.name, change: next - old, newLeaning: next });
      }
      if (prevCJ && prevParty && prevParty !== newParty) {
        game.bench
          .filter((j) => j.id !== prevCJ.id && j.id !== targetJustice.id && j.nominatedBy?.party === prevParty)
          .forEach((j) => {
            const old = game.leanings[j.id] ?? 0;
            const next = Math.max(-100, old - 20);
            game.leanings[j.id] = next;
            results.push({ justiceName: j.name, change: next - old, newLeaning: next });
          });
      }
      // Newly crowned Chief gains immediate goodwill toward you
      const newChiefOld = game.leanings[targetJustice.id] ?? 0;
      const newChiefNext = Math.min(100, newChiefOld + 15);
      game.leanings[targetJustice.id] = newChiefNext;
      results.push({ justiceName: targetJustice.name, change: newChiefNext - newChiefOld, newLeaning: newChiefNext });
      reportTarget = `${targetJustice.name} (new Chief Justice)`;
    }

    // ── Insult-chief ─────────────────────────────────────────────
  } else if (tactic.effectType === "insult-chief") {
    consumeTactic(game, tactic, helpers);
    const cj = game.bench.find((j) => j.id === game.chiefJusticeId);
    if (cj) {
      const cjParty = cj.nominatedBy?.party;
      const dir = actor === "opponent" ? -1 : 1;

      const cjOld = game.leanings[cj.id] ?? 0;
      const cjNext = Math.max(-100, Math.min(100, cjOld - tactic.basePower * 10 * dir));
      game.leanings[cj.id] = cjNext;
      results.push({ justiceName: cj.name, change: cjNext - cjOld, newLeaning: cjNext });

      game.bench
        .filter((j) => j.id !== cj.id && j.nominatedBy?.party !== cjParty)
        .forEach((j) => {
          const old = game.leanings[j.id] ?? 0;
          const next = Math.max(-100, Math.min(100, old + 20 * dir));
          game.leanings[j.id] = next;
          results.push({ justiceName: j.name, change: next - old, newLeaning: next });
        });
      reportTarget = `${cj.name} (Chief Justice)`;
    }

    // ── Presidential-call ────────────────────────────────────────
  } else if (tactic.effectType === "presidential-call") {
    consumeTactic(game, tactic, helpers);
    const dir = actor === "opponent" ? -1 : 1;
    game.bench.forEach((j) => {
      const nomParty = j.nominatedBy?.party;
      const istrump = j.nominatedBy?.name === "Donald Trump";
      const isDemNominee = j.nominatedBy?.name === "Barack Obama" || j.nominatedBy?.name === "Joe Biden";
      let delta = 0;
      if (istrump) delta = Math.round(tactic.basePower * j.stats.partyLoyalty);
      else if (nomParty === "Republican") delta = Math.round(tactic.basePower * j.stats.partyLoyalty * 0.2);
      else if (isDemNominee) delta = -Math.round(tactic.basePower * j.stats.partyLoyalty);
      else delta = -Math.round(tactic.basePower * j.stats.partyLoyalty * 0.2);
      if (delta !== 0) {
        const old = game.leanings[j.id] ?? 0;
        const next = Math.max(-100, Math.min(100, old + delta * dir));
        game.leanings[j.id] = next;
        results.push({ justiceName: j.name, change: next - old, newLeaning: next });
      }
    });
    reportTarget = "All justices (Presidential call)";

    // ── Recuse ───────────────────────────────────────────────────
  } else if (tactic.effectType === "recuse") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      const old = game.leanings[targetJustice.id] ?? 0;
      game.leanings[targetJustice.id] = 0;
      if (!game.recusedJustices.includes(targetJustice.id)) {
        game.recusedJustices.push(targetJustice.id);
      }
      results.push({ justiceName: targetJustice.name, change: -old, newLeaning: 0 });
      reportTarget = targetJustice.name;
    }

    // ── Request-amicus ─────────────────────────────────────────
  } else if (tactic.effectType === "request-amicus") {
    consumeTactic(game, tactic, helpers);
    const dir = actor === "opponent" ? -1 : 1;
    const alliesCount = game.bench.filter((j) => (game.leanings[j.id] ?? 0) * dir > gameSettings.abstentionThreshold).length;
    const momentumPower = Math.min(19, 4 + alliesCount);

    let targets = game.bench.filter((j) => !(j.id in game.nappingJustices) && !(j.id in game.yogaJustices));

    if (actor === "opponent") {
      const blocked = targets.filter((j) => game.playerShields.includes(j.id));
      targets = targets.filter((j) => !game.playerShields.includes(j.id));
      if (blocked.length > 0) {
        game.playerShields = game.playerShields.filter((id) => !blocked.some((j) => j.id === id));
      }
    } else {
      const blocked = targets.filter((j) => game.opponentShields.includes(j.id));
      targets = targets.filter((j) => !game.opponentShields.includes(j.id));
      if (blocked.length > 0) {
        game.opponentShields = game.opponentShields.filter((id) => !blocked.some((j) => j.id === id));
      }
    }

    targets.forEach((j) => {
      const old = game.leanings[j.id] ?? 0;
      const next = Math.max(-100, Math.min(100, old + momentumPower * dir));
      game.leanings[j.id] = next;
      results.push({ justiceName: j.name, change: next - old, newLeaning: next });
    });

    reportTarget = "All justices";
    if (alliesCount === 0) {
      overrideFeedback = "Your amicus pile created momentum. The bench is yours to win.";
    } else if (alliesCount === 1) {
      overrideFeedback = "Your amicus pile created momentum. One justice was already with you.";
    } else if (alliesCount >= 5) {
      overrideFeedback = "Your amicus pile created momentum. Most justices are already on your side.";
    } else {
      overrideFeedback = "Your amicus pile created momentum. Several justices are already with you.";
    }

    // ── Catch-phone ────────────────────────────────────────────
  } else if (tactic.effectType === "catch-phone") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      const blockedByPlayer = actor === "opponent" && game.playerShields.includes(targetJustice.id);
      const blockedByOpponent = actor === "player" && game.opponentShields.includes(targetJustice.id);
      if (blockedByPlayer || blockedByOpponent) {
        if (blockedByPlayer) game.playerShields = game.playerShields.filter((id) => id !== targetJustice.id);
        if (blockedByOpponent) game.opponentShields = game.opponentShields.filter((id) => id !== targetJustice.id);
        reportTarget = targetJustice.name;
        overrideFeedback = `${targetJustice.name} was protected before the distraction could land.`;
      } else {
        game.statMods[targetJustice.id] = {
          ...(game.statMods[targetJustice.id] ?? {}),
          susceptibility: (game.statMods[targetJustice.id]?.susceptibility ?? 0) - 3,
        };

        const dir = actor === "player" ? 1 : -1;
        const old = game.leanings[targetJustice.id] ?? 0;
        const next = Math.max(-100, Math.min(100, old - 8 * dir));
        game.leanings[targetJustice.id] = next;
        results.push({ justiceName: targetJustice.name, change: next - old, newLeaning: next });
        reportTarget = targetJustice.name;
        overrideFeedback = `${targetJustice.name} stopped listening. They're less susceptible for the rest of this trial.`;
      }
    }

    // ── Recite-dissent ─────────────────────────────────────────
  } else if (tactic.effectType === "recite-dissent") {
    consumeTactic(game, tactic, helpers);
    const dir = actor === "player" ? 1 : -1;
    const againstCount = game.bench.filter((j) => (game.leanings[j.id] ?? 0) * dir < -gameSettings.abstentionThreshold).length;
    const proTargets = game.bench.filter((j) => (game.leanings[j.id] ?? 0) * dir > gameSettings.abstentionThreshold);
    const swayPerJustice = Math.min(30, againstCount * 3);

    proTargets.forEach((j) => {
      const old = game.leanings[j.id] ?? 0;
      const next = Math.max(-100, Math.min(100, old + swayPerJustice * dir));
      game.leanings[j.id] = next;
      results.push({ justiceName: j.name, change: next - old, newLeaning: next });
    });

    reportTarget = proTargets.length > 0 ? "Your current supporters" : "No current supporters";

    if (proTargets.length === 0) {
      overrideFeedback = "No justice was currently on your side to rally.";
    } else if (againstCount === 0) {
      overrideFeedback = "The dissent energized your side. No opposition to fuel it, though.";
    } else if (againstCount >= 5) {
      overrideFeedback = "The dissent energized your side. Strong opposition amplified the effect.";
    } else if (againstCount >= 3) {
      overrideFeedback = "The dissent energized your side. Several opposing votes amplified the effect.";
    } else {
      overrideFeedback = "The dissent energized your side. A few opposing votes amplified the effect.";
    }

    // ── Betray-friend ────────────────────────────────────────────
  } else if (tactic.effectType === "betray-friend") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      const dir = actor === "opponent" ? -1 : 1;

      // The betrayed justice flips STRONGLY AGAINST (from player perspective)
      const betrayedOld = game.leanings[targetJustice.id] ?? 0;
      const betrayedNext = Math.max(-100, Math.min(100, dir > 0 ? -(80 + Math.floor(Math.random() * 15)) : 80 + Math.floor(Math.random() * 15)));
      game.leanings[targetJustice.id] = betrayedNext;
      results.push({ justiceName: targetJustice.name, change: betrayedNext - betrayedOld, newLeaning: betrayedNext });

      // Opposing-party justices currently leaning against you have a 65% chance to flip toward you
      const targetParty = targetJustice.nominatedBy?.party;
      game.bench
        .filter((j) => j.id !== targetJustice.id && (game.leanings[j.id] ?? 0) * dir < 0)
        .filter((j) => partiesOpposed(j.nominatedBy?.party, targetParty))
        .forEach((j) => {
          if (Math.random() < 0.65) {
            const old = game.leanings[j.id] ?? 0;
            const boost = (20 + Math.floor(Math.random() * 20)) * dir;
            const next = Math.max(-100, Math.min(100, old + boost));
            game.leanings[j.id] = next;
            results.push({ justiceName: j.name, change: next - old, newLeaning: next });
          }
        });
      reportTarget = `${targetJustice.name} (betrayed)`;
    }

    // ── Swap-clerks ──────────────────────────────────────────────
  } else if (tactic.effectType === "swap-clerks") {
    consumeTactic(game, tactic, helpers);
    const [aId, bId] = game.multiTargetSelections;
    const jA = game.bench.find((j) => j.id === aId);
    const jB = game.bench.find((j) => j.id === bId);
    game.multiTargetSelections = [];
    game.multiTargetMode = false;
    game.multiTargetTacticId = null;

    if (jA && jB) {
      // Swap their leanings (always succeeds)
      const lA = game.leanings[jA.id] ?? 0;
      const lB = game.leanings[jB.id] ?? 0;
      game.leanings[jA.id] = lB;
      game.leanings[jB.id] = lA;
      results.push({ justiceName: jA.name, change: lB - lA, newLeaning: lB });
      results.push({ justiceName: jB.name, change: lA - lB, newLeaning: lA });
      reportTarget = `${jA.name} & ${jB.name}`;
      overrideFeedback = `The clerks came through — ${jA.name} and ${jB.name} swapped positions completely.`;
    }

    // ── Encourage-nap ────────────────────────────────────────────
  } else if (tactic.effectType === "encourage-nap") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      const old = game.leanings[targetJustice.id] ?? 0;
      const next = Math.min(100, old + 15);
      game.leanings[targetJustice.id] = next;
      results.push({ justiceName: targetJustice.name, change: next - old, newLeaning: next });
      // Frozen for this round and next; wake-up no longer applies extra leaning
      game.nappingJustices[targetJustice.id] = game.round + 1;
      reportTarget = targetJustice.name;
      overrideFeedback = `${targetJustice.name} is taking a nap.`;
    }

    // ── Justice-cocktails ────────────────────────────────────────
  } else if (tactic.effectType === "justice-cocktails") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      const isKavanaugh = targetJustice.name === "Brett Kavanaugh";
      game.statMods[targetJustice.id] = {
        ...(game.statMods[targetJustice.id] ?? {}),
        charisma: (game.statMods[targetJustice.id]?.charisma ?? 0) + 3,
        empathy: (game.statMods[targetJustice.id]?.empathy ?? 0) + 3,
        logic: (game.statMods[targetJustice.id]?.logic ?? 0) - 3,
        susceptibility: (game.statMods[targetJustice.id]?.susceptibility ?? 0) + 3,
      };
      // Drinks also prime them for the next attack
      game.susceptibilityMods[targetJustice.id] = (game.susceptibilityMods[targetJustice.id] ?? 0) + 4;
      // Immediate leaning nudge — the drinks are working right now
      const oldLeaning = game.leanings[targetJustice.id] ?? 0;
      const baseNudge = actor === "player" ? 15 : -15;
      const nudge = isKavanaugh ? baseNudge * 2 : baseNudge;
      const newLeaning = Math.max(-100, Math.min(100, oldLeaning + nudge));
      game.leanings[targetJustice.id] = newLeaning;
      results.push({ justiceName: targetJustice.name, change: newLeaning - oldLeaning, newLeaning });
      reportTarget = targetJustice.name;
      overrideFeedback = isKavanaugh
        ? `"I LIKE BEER!" — Justice Kavanaugh is absolutely delighted and making some extremely questionable choices.`
        : `${targetJustice.name} is having a great time and making some interesting choices.`;
    }

    // ── Saint-patricks ───────────────────────────────────────────
  } else if (tactic.effectType === "saint-patricks") {
    consumeTactic(game, tactic, helpers);
    const dir = actor === "player" ? 1 : -1;
    game.bench.forEach((j) => {
      const wasCatholic = (game.religionOverrides[j.id] ?? j.religion) === "Catholic";
      game.religionOverrides[j.id] = "Catholic";

      if (wasCatholic) {
        // Already Catholic - boost empathy and sway positively
        game.statMods[j.id] = {
          ...(game.statMods[j.id] ?? {}),
          empathy: (game.statMods[j.id]?.empathy ?? 0) + 4,
        };
        const old = game.leanings[j.id] ?? 0;
        const next = Math.max(-100, Math.min(100, old + 15 * dir));
        game.leanings[j.id] = next;
        results.push({ justiceName: j.name, change: next - old, newLeaning: next });
      } else {
        // Not Catholic - convert them but slight negative effect
        const old = game.leanings[j.id] ?? 0;
        const next = Math.max(-100, Math.min(100, old - 5 * dir));
        game.leanings[j.id] = next;
        results.push({ justiceName: j.name, change: next - old, newLeaning: next });
      }
    });
    reportTarget = "All justices";
    overrideFeedback = "Catholic justices are delighted. Others are... adjusting.";

    // ── Invite-church ────────────────────────────────────────────
  } else if (tactic.effectType === "invite-church") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      // Boost empathy for the rest of the trial
      game.statMods[targetJustice.id] = {
        ...(game.statMods[targetJustice.id] ?? {}),
        empathy: (game.statMods[targetJustice.id]?.empathy ?? 0) + 3,
      };

      // All justices sharing the same religion (including overrides) gain a positive opinion
      const targetReligion = game.religionOverrides[targetJustice.id] ?? targetJustice.religion;
      game.bench
        .filter((j) => j.id !== targetJustice.id)
        .forEach((j) => {
          const jReligion = game.religionOverrides[j.id] ?? j.religion;
          if (jReligion === targetReligion) {
            const old = game.leanings[j.id] ?? 0;
            const next = Math.max(-100, Math.min(100, old + 15));
            game.leanings[j.id] = next;
            results.push({ justiceName: j.name, change: next - old, newLeaning: next });
          }
        });

      // Direct sway of the target — attending church was personally moving
      const dir = actor === "player" ? 1 : -1;
      const targetOld = game.leanings[targetJustice.id] ?? 0;
      const targetNext = Math.max(-100, Math.min(100, targetOld + 20 * dir));
      game.leanings[targetJustice.id] = targetNext;
      results.push({ justiceName: targetJustice.name, change: targetNext - targetOld, newLeaning: targetNext });
      reportTarget = targetJustice.name;
      overrideFeedback = `${targetJustice.name} attended church. They seemed genuinely moved. The congregation noticed.`;
    }

    // ── Suggest-retirement (campaign only) ───────────────────────
  } else if (tactic.effectType === "suggest-retirement") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      // Justice loses a massive amount of favor — very hard to recover from
      const old = game.leanings[targetJustice.id] ?? 0;
      const next = Math.max(-100, old - 80);
      game.leanings[targetJustice.id] = next;
      results.push({ justiceName: targetJustice.name, change: next - old, newLeaning: next });
      // Mark for guaranteed retirement at next recess (only meaningful in campaign mode)
      if (!game.suggestRetirementTargets.includes(targetJustice.id)) {
        game.suggestRetirementTargets.push(targetJustice.id);
      }
      reportTarget = targetJustice.name;
      overrideFeedback = `${targetJustice.name} has been diplomatically informed that retirement is an option.`;
    }

    // ── Keep-crown (campaign only) ────────────────────────────────
  } else if (tactic.effectType === "keep-crown") {
    // Only useful if make-chief was already played this trial; validation happens in Court.vue
    consumeTactic(game, tactic, helpers);
    game.keepCrownActivated = true;
    reportTarget = "Chief Justice";
    overrideFeedback = "The Chief Justice's appointment is now permanent for the remainder of the campaign.";

    // ── Reframe-debate ────────────────────────────────────────
  } else if (tactic.effectType === "reframe-debate") {
    consumeTactic(game, tactic, helpers);
    const chosenStance = game.reframeStanceSelection;
    game.reframeStanceSelection = null;
    game.reframeStanceMode = false;
    game.reframeStanceChoices = [];
    game.reframeStanceTacticId = null;

    if (chosenStance) {
      const dir = actor === "player" ? 1 : -1;
      game.bench.forEach((j) => {
        const justiceStance = j.stances?.find((s) => s.topic === chosenStance);
        if (!justiceStance || justiceStance.position === "Neutral") return;
        const old = game.leanings[j.id] ?? 0;
        const delta = justiceStance.position === "For" ? 45 * dir : -45 * dir;
        const next = Math.max(-100, Math.min(100, old + delta));
        game.leanings[j.id] = next;
        results.push({ justiceName: j.name, change: next - old, newLeaning: next });
      });
      const stanceLabel = chosenStance.replace(/([A-Z])/g, " $1").trim();
      reportTarget = `All justices (${stanceLabel})`;
      overrideFeedback = `The debate has been reframed around ${stanceLabel}. Every justice with a known stance reacted immediately.`;
    }

    // ── Gift-boxes ──────────────────────────────────────────────
  } else if (tactic.effectType === "gift-boxes") {
    consumeTactic(game, tactic, helpers);
    const dir = actor === "player" ? 1 : -1;
    game.bench.forEach((j) => {
      const effectiveBribery = getEffectiveWeakness(j, "bribery", game);
      let delta = 0;
      if (effectiveBribery >= 6) {
        delta = 30 * dir; // warmly received; the chocolates were a nice touch
      } else if (effectiveBribery <= 3) {
        delta = -20 * dir; // deeply offended by the implication
      }
      if (delta !== 0) {
        const old = game.leanings[j.id] ?? 0;
        const next = Math.max(-100, Math.min(100, old + delta));
        game.leanings[j.id] = next;
        results.push({ justiceName: j.name, change: next - old, newLeaning: next });
      }
    });
    reportTarget = "All justices";
    overrideFeedback = "Some justices were delighted. Others were deeply offended. The boxes were not primarily about chocolate.";

    // ── Plant-story ───────────────────────────────────────────────
  } else if (tactic.effectType === "plant-story") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      const blockedByPlayer = actor === "opponent" && game.playerShields.includes(targetJustice.id);
      const blockedByOpponent = actor === "player" && game.opponentShields.includes(targetJustice.id);
      if (blockedByPlayer || blockedByOpponent) {
        if (blockedByPlayer) game.playerShields = game.playerShields.filter((id) => id !== targetJustice.id);
        if (blockedByOpponent) game.opponentShields = game.opponentShields.filter((id) => id !== targetJustice.id);
        reportTarget = targetJustice.name;
        overrideFeedback = `${targetJustice.name} was shielded before the story could land.`;
      } else {
        game.statMods[targetJustice.id] = {
          ...(game.statMods[targetJustice.id] ?? {}),
          partyLoyalty: (game.statMods[targetJustice.id]?.partyLoyalty ?? 0) + 5,
        };

        if (game.currentCase && game.playerSide) {
          const actorFavoredParty =
            actor === "player"
              ? game.playerSide === "prosecution"
                ? game.currentCase.prosecution.favoredBy
                : game.currentCase.defendant.favoredBy
              : game.playerSide === "prosecution"
                ? game.currentCase.defendant.favoredBy
                : game.currentCase.prosecution.favoredBy;
          const justiceParty = targetJustice.nominatedBy?.party;
          const dir = actor === "player" ? 1 : -1;
          const alignmentDelta = justiceParty && partiesAligned(justiceParty, actorFavoredParty) ? 14 * dir : -14 * dir;
          const old = game.leanings[targetJustice.id] ?? 0;
          const next = Math.max(-100, Math.min(100, old + alignmentDelta));
          game.leanings[targetJustice.id] = next;
          results.push({ justiceName: targetJustice.name, change: next - old, newLeaning: next });
        } else {
          results.push({ justiceName: targetJustice.name, change: 0, newLeaning: game.leanings[targetJustice.id] ?? 0 });
        }

        reportTarget = targetJustice.name;
      }
    }

    // ── Lemon-test ────────────────────────────────────────────────
  } else if (tactic.effectType === "lemon-test") {
    consumeTactic(game, tactic, helpers);
    game.bench.forEach((j) => {
      game.religionOverrides[j.id] = "Atheist";
      game.statMods[j.id] = {
        ...(game.statMods[j.id] ?? {}),
        logic: (game.statMods[j.id]?.logic ?? 0) + 2,
      };
      results.push({ justiceName: j.name, change: 0, newLeaning: game.leanings[j.id] ?? 0 });
    });
    reportTarget = "All justices";

    // ── Suggest-yoga ──────────────────────────────────────────────
  } else if (tactic.effectType === "suggest-yoga") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      game.yogaJustices[targetJustice.id] = game.round + 1;
      reportTarget = targetJustice.name;
      overrideFeedback = `${targetJustice.name} has stepped away to find their center. They will return refreshed.`;
    }

    // ── Drag-them ─────────────────────────────────────────────────
  } else if (tactic.effectType === "drag-them") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      // Permanent charisma debuff for this trial
      game.statMods[targetJustice.id] = {
        ...(game.statMods[targetJustice.id] ?? {}),
        charisma: (game.statMods[targetJustice.id]?.charisma ?? 0) - 3,
      };
      if (!game.draggedJustices.includes(targetJustice.id)) {
        game.draggedJustices.push(targetJustice.id);
      }
      // Sway based on threats weakness: high threats → toward player, low → slight against
      const dir = actor === "player" ? 1 : -1;
      const threatsWeakness = getEffectiveWeakness(targetJustice, "threats", game);
      let delta = 0;
      if (threatsWeakness >= 6) {
        delta = Math.round(threatsWeakness * 8 * dir); // very susceptible to being dragged
      } else if (threatsWeakness >= 4) {
        delta = Math.round(threatsWeakness * 4 * dir); // moderate
      } else {
        delta = -Math.round((5 - threatsWeakness) * 6 * dir); // immune — they dig in
      }
      if (delta !== 0) {
        const old = game.leanings[targetJustice.id] ?? 0;
        const next = Math.max(-100, Math.min(100, old + delta));
        game.leanings[targetJustice.id] = next;
        results.push({ justiceName: targetJustice.name, change: next - old, newLeaning: next });
      } else {
        results.push({ justiceName: targetJustice.name, change: 0, newLeaning: game.leanings[targetJustice.id] ?? 0 });
      }
      reportTarget = targetJustice.name;
      overrideFeedback =
        threatsWeakness >= 6
          ? `${targetJustice.name} is absolutely rattled. The tweet did its job.`
          : threatsWeakness >= 4
            ? `${targetJustice.name} is annoyed but slightly shaken. Effective enough.`
            : `${targetJustice.name} read the whole thread and has only grown more confident. They're fine.`;
    }

    // ── Fog-machine ──────────────────────────────────────────────
  } else if (tactic.effectType === "fog-machine") {
    consumeTactic(game, tactic, helpers);
    const dir = actor === "player" ? 1 : -1;
    game.bench.forEach((j) => {
      const leaning = game.leanings[j.id] ?? 0;
      const absLeaning = Math.abs(leaning);
      let power = tactic.basePower;

      if (absLeaning <= 10) {
        // Neutral justices - strong effect
        power = 8;
      } else if (absLeaning >= 40) {
        // Strongly decided - annoyed by disruption
        power = -2;
      } else {
        // Mid-range - normal effect that scales with neutrality
        power = Math.round(2 + (10 - absLeaning) * 0.15);
      }

      const effectivePower = Math.round(power * gameSettings.targetAllMultiplier);
      const finalPower =
        actor === "opponent"
          ? Math.round(effectivePower * difficultySettings.opponentPowerMult)
          : Math.round(effectivePower * difficultySettings.playerPowerMult);

      const old = game.leanings[j.id] ?? 0;
      const next = Math.max(-100, Math.min(100, old + finalPower * dir));
      game.leanings[j.id] = next;
      results.push({ justiceName: j.name, change: next - old, newLeaning: next });
    });
    reportTarget = "All justices";

    // Generate smarter feedback for fog machine
    const neutralCount = game.bench.filter((j) => Math.abs(game.leanings[j.id] ?? 0) <= 10).length;
    const decidedCount = game.bench.filter((j) => Math.abs(game.leanings[j.id] ?? 0) >= 40).length;

    if (neutralCount >= 5) {
      overrideFeedback = "The fog machine perks up many undecided justices. A few strongly decided justices are annoyed.";
    } else if (neutralCount >= 3) {
      overrideFeedback = "The fog machine perks up several undecided justices. The strongly decided are less amused.";
    } else if (decidedCount >= 5) {
      overrideFeedback = "The fog machine mostly annoys the strongly decided justices. Few are swayed.";
    } else {
      overrideFeedback = "The fog machine has mixed results across the bench.";
    }

    // ── Whisper-campaign ─────────────────────────────────────────
  } else if (tactic.effectType === "whisper-campaign") {
    consumeTactic(game, tactic, helpers);
    if (targetJustice) {
      // Initialize whisper campaign tracking if it doesn't exist
      if (!game.whisperCampaigns) {
        (game as any).whisperCampaigns = {};
      }
      // Store the target and actor for this whisper campaign
      (game as any).whisperCampaigns[targetJustice.id] = { actor, power: tactic.basePower };

      // Apply immediate effect for this round
      const dir = actor === "player" ? 1 : -1;
      const effectivePower = Math.round(tactic.basePower * gameSettings.targetSingleMultiplier);
      const finalPower =
        actor === "opponent"
          ? Math.round(effectivePower * difficultySettings.opponentPowerMult)
          : Math.round(effectivePower * difficultySettings.playerPowerMult);

      const old = game.leanings[targetJustice.id] ?? 0;
      const next = Math.max(-100, Math.min(100, old + finalPower * dir));
      game.leanings[targetJustice.id] = next;
      results.push({ justiceName: targetJustice.name, change: next - old, newLeaning: next });
      reportTarget = targetJustice.name;

      const roundsRemaining = gameSettings.numberOfRounds - game.round + 1;
      if (roundsRemaining >= 4) {
        overrideFeedback = `Whispers begin. ${targetJustice.name} will be influenced every remaining round.`;
      } else if (roundsRemaining === 3) {
        overrideFeedback = `Whispers begin. ${targetJustice.name} will be influenced for the rest of the trial.`;
      } else if (roundsRemaining === 2) {
        overrideFeedback = `Late whispers. ${targetJustice.name} will be influenced next round as well.`;
      } else {
        overrideFeedback = `Final whisper. ${targetJustice.name} hears it just this once.`;
      }
    }

    // ── Alien-abduction ──────────────────────────────────────────
  } else if (tactic.effectType === "alien-abduction") {
    consumeTactic(game, tactic, helpers);
    const dir = actor === "player" ? 1 : -1;
    game.bench.forEach((j) => {
      const susceptibility = getEffectiveStat(j, "susceptibility", game);
      let power = 0;

      if (susceptibility >= 7) {
        // High susceptibility - they believe it
        power = tactic.basePower;
      } else if (susceptibility <= 4) {
        // Low susceptibility - offended
        power = -3;
      }
      // Mid-range (5-6) - no effect

      if (power !== 0) {
        const effectivePower = Math.round(power * gameSettings.targetAllMultiplier);
        const finalPower =
          actor === "opponent"
            ? Math.round(effectivePower * difficultySettings.opponentPowerMult)
            : Math.round(effectivePower * difficultySettings.playerPowerMult);

        const old = game.leanings[j.id] ?? 0;
        const next = Math.max(-100, Math.min(100, old + finalPower * dir));
        game.leanings[j.id] = next;
        results.push({ justiceName: j.name, change: next - old, newLeaning: next });
      }
    });
    reportTarget = "All justices";

    // Generate smarter feedback for alien abduction
    const believers = game.bench.filter((j) => getEffectiveStat(j, "susceptibility", game) >= 7).length;
    const skeptics = game.bench.filter((j) => getEffectiveStat(j, "susceptibility", game) <= 4).length;

    if (believers >= 5) {
      overrideFeedback = "Most justices are convinced by the absurd story. A few skeptics are offended.";
    } else if (believers >= 3) {
      overrideFeedback = "Several gullible justices believe it. Skeptical justices are offended by the absurdity.";
    } else if (skeptics >= 5) {
      overrideFeedback = "Most justices are offended by the ridiculous argument. Few believe it.";
    } else {
      overrideFeedback = "The absurd story polarizes the bench — some believe, some are offended.";
    }

    // ── Mess-calendar ────────────────────────────────────────────
  } else if (tactic.effectType === "mess-calendar") {
    consumeTactic(game, tactic, helpers);
    // Mark that the next round should be skipped
    if (!game.skipNextRound) {
      (game as any).skipNextRound = true;
    }
    reportTarget = "Calendar";
    overrideFeedback = "The calendar has been... adjusted. Both sides skip the next round.";

    // ── International-law ────────────────────────────────────────
  } else if (tactic.effectType === "international-law") {
    consumeTactic(game, tactic, helpers);
    const dir = actor === "player" ? 1 : -1;
    game.bench.forEach((j) => {
      const partyLoyalty = getEffectiveStat(j, "partyLoyalty", game);
      let power = 0;

      if (partyLoyalty >= 7) {
        // High party loyalty - offended
        power = -tactic.basePower;
      } else if (partyLoyalty <= 4) {
        // Low party loyalty (independents) - intrigued
        power = tactic.basePower;
      }
      // Mid-range (5-6) - no effect

      if (power !== 0) {
        const effectivePower = Math.round(power * gameSettings.targetAllMultiplier);
        const finalPower =
          actor === "opponent"
            ? Math.round(effectivePower * difficultySettings.opponentPowerMult)
            : Math.round(effectivePower * difficultySettings.playerPowerMult);

        const old = game.leanings[j.id] ?? 0;
        const next = Math.max(-100, Math.min(100, old + finalPower * dir));
        game.leanings[j.id] = next;
        results.push({ justiceName: j.name, change: next - old, newLeaning: next });
      }
    });
    reportTarget = "All justices";

    // Generate smarter feedback for international law
    const partisans = game.bench.filter((j) => getEffectiveStat(j, "partyLoyalty", game) >= 7).length;
    const independents = game.bench.filter((j) => getEffectiveStat(j, "partyLoyalty", game) <= 4).length;

    if (partisans >= 6) {
      overrideFeedback = "Most justices are partisan and offended. A few independents appreciate the global perspective.";
    } else if (independents >= 3) {
      overrideFeedback = "Independents appreciate the citation. Partisans see it as foreign meddling.";
    } else {
      overrideFeedback = "The European citation polarizes the bench along party lines.";
    }

    // ── Standard sway / susceptibility / shield ──────────────────
  } else {
    consumeTactic(game, tactic, helpers);

    let targets = targetJustice ? [targetJustice] : game.bench;

    // Napping and yoga justices can't be swayed (but shields/susceptibility still apply to them)
    if (tactic.effectType !== "susceptibility" && tactic.effectType !== "shield") {
      targets = targets.filter((j) => !(j.id in game.nappingJustices) && !(j.id in game.yogaJustices));
    }

    // Shields absorb attacks and are consumed on contact (not cleared at end of turn)
    if (actor === "opponent" && tactic.effectType !== "susceptibility") {
      const blocked = targets.filter((j) => game.playerShields.includes(j.id));
      targets = targets.filter((j) => !game.playerShields.includes(j.id));
      if (blocked.length > 0) {
        game.playerShields = game.playerShields.filter((id) => !blocked.some((j) => j.id === id));
      }
    }
    if (actor === "player" && tactic.effectType !== "susceptibility" && tactic.effectType !== "shield") {
      const blocked = targets.filter((j) => game.opponentShields.includes(j.id));
      targets = targets.filter((j) => !game.opponentShields.includes(j.id));
      if (blocked.length > 0) {
        game.opponentShields = game.opponentShields.filter((id) => !blocked.some((j) => j.id === id));
      }
    }

    targets.forEach((justice) => {
      let power = tactic.basePower;

      if (tactic.weaknessBasis) {
        const effectiveWeakness = getEffectiveWeakness(justice, tactic.weaknessBasis, game);
        power = Math.round((power * effectiveWeakness) / 5);
      }

      if (tactic.statBasis) {
        if (tactic.statBasis === "logic" || tactic.statBasis === "empathy") {
          // Heart vs Head: tactic efficacy is driven by the justice's logic/empathy differential.
          // Logic tactics work better on justices who "rule by the book" (logic > empathy).
          // Empathy tactics work better on justices who "rule from the heart" (empathy > logic).
          const logicDiff = justice.stats.logic - justice.stats.empathy; // −9 to +9
          const alignment = tactic.statBasis === "logic" ? logicDiff : -logicDiff;
          const sv = Math.round(((alignment + 9) / 18) * 9) + 1; // normalized 1–10
          if (tactic.statRelation === "amplifies") {
            power = Math.round((power * sv) / 5);
          } else if (tactic.statRelation === "polarizes-high") {
            power = Math.round((tactic.basePower * (sv - 5) * 2) / 5);
          } else if (tactic.statRelation === "polarizes-low") {
            power = Math.round((tactic.basePower * (5 - sv) * 2) / 5);
          }
          // Susceptibility provides a ±25% modifier for heart/head tactics
          const suc = getEffectiveStat(justice, "susceptibility", game);
          const sucMult = 1 + ((suc - 5) / 10) * 0.5;
          power = Math.round(power * sucMult);
        } else {
          const sv = getEffectiveStat(justice, tactic.statBasis, game);
          if (tactic.statRelation === "amplifies") {
            power = Math.round((power * sv) / 5);
          } else if (tactic.statRelation === "resists") {
            power = Math.round((power * (10 - sv)) / 5);
          } else if (tactic.statRelation === "polarizes-high") {
            // Positive for high-stat justices, negative (insulted) for low-stat
            power = Math.round((tactic.basePower * (sv - 5) * 2) / 5);
          } else if (tactic.statRelation === "polarizes-low") {
            // Positive for low-stat justices, negative (insulted) for high-stat
            power = Math.round((tactic.basePower * (5 - sv) * 2) / 5);
          }
        }
      }

      const sucMod = game.susceptibilityMods[justice.id] ?? 0;
      if (sucMod > 0 && tactic.effectType !== "susceptibility") {
        power += Math.round((sucMod * getEffectiveStat(justice, "susceptibility", game)) / 10);
        game.susceptibilityMods[justice.id] = 0;
      }

      // Chief justice sway resistance: halve power in both directions
      if (justice.id === game.chiefJusticeId && game.chiefJusticeHardened && tactic.effectType !== "susceptibility" && tactic.effectType !== "shield") {
        power = power > 0 ? Math.max(1, Math.ceil(power * 0.5)) : power < 0 ? Math.min(-1, Math.floor(power * 0.5)) : 0;
      }

      // Recused justices are also harder to sway
      if (game.recusedJustices.includes(justice.id) && tactic.effectType !== "susceptibility" && tactic.effectType !== "shield") {
        power = power > 0 ? Math.max(1, Math.ceil(power * 0.5)) : power < 0 ? Math.min(-1, Math.floor(power * 0.5)) : 0;
      }

      if (tactic.effectType === "susceptibility") {
        game.susceptibilityMods[justice.id] = (game.susceptibilityMods[justice.id] ?? 0) + tactic.basePower;
        results.push({ justiceName: justice.name, change: 0, newLeaning: game.leanings[justice.id] ?? 0 });
      } else if (tactic.effectType === "shield") {
        if (actor === "player") game.playerShields.push(justice.id);
        else game.opponentShields.push(justice.id);
        results.push({ justiceName: justice.name, change: 0, newLeaning: game.leanings[justice.id] ?? 0 });
        reportTarget = justice.name;
        overrideFeedback = `${justice.name} is protected from your opponent's next argument.`;
      } else {
        // Standard sway
        const dir = actor === "opponent" ? -1 : 1;
        const old = game.leanings[justice.id] ?? 0;
        let effectivePower =
          tactic.effectType === "sway-all" ? Math.round(power * gameSettings.targetAllMultiplier) : Math.round(power * gameSettings.targetSingleMultiplier);
        // Apply difficulty multipliers
        if (actor === "opponent") effectivePower = Math.round(effectivePower * difficultySettings.opponentPowerMult);
        if (actor === "player") effectivePower = Math.round(effectivePower * difficultySettings.playerPowerMult);
        const next = Math.max(-100, Math.min(100, old + effectivePower * dir));
        game.leanings[justice.id] = next;
        const change = next - old;
        results.push({ justiceName: justice.name, change, newLeaning: next });

        // Chief justice knockon: sway-one ripples to same-party allies at 50%
        if (justice.id === game.chiefJusticeId && tactic.effectType === "sway-one" && change !== 0) {
          const cjParty = justice.nominatedBy?.party;
          const knockon = Math.round(change / 2);
          if (knockon !== 0 && cjParty) {
            game.bench
              .filter((j) => j.id !== justice.id && j.nominatedBy?.party === cjParty && !game.playerShields.includes(j.id))
              .forEach((j) => {
                const ko = game.leanings[j.id] ?? 0;
                const kn = Math.max(-100, Math.min(100, ko + knockon));
                game.leanings[j.id] = kn;
                results.push({ justiceName: j.name, change: kn - ko, newLeaning: kn, isKnockon: true });
              });
          }
        }

        // Charisma knockon: high-charisma justices (7+) influence same-party peers with sway-one
        const charisma = getEffectiveStat(justice, "charisma", game);
        if (tactic.effectType === "sway-one" && charisma >= 7 && change !== 0 && justice.id !== game.chiefJusticeId) {
          const knockonChance = (charisma - 6) / 4; // 7→25%, 8→50%, 9→75%, 10→100%
          if (Math.random() < knockonChance) {
            const jParty = justice.nominatedBy?.party;
            const jNominator = justice.nominatedBy?.id;
            const knockonAmt = Math.round(change * 0.3);
            if (knockonAmt !== 0) {
              // Prefer same-nominator peers; fall back to same-party peers
              const peers = game.bench.filter(
                (j) =>
                  j.id !== justice.id &&
                  j.id !== game.chiefJusticeId &&
                  !game.playerShields.includes(j.id) &&
                  (jNominator ? j.nominatedBy?.id === jNominator : j.nominatedBy?.party === jParty),
              );
              const target = peers[Math.floor(Math.random() * peers.length)];
              if (target) {
                const ko = game.leanings[target.id] ?? 0;
                const kn = Math.max(-100, Math.min(100, ko + knockonAmt));
                game.leanings[target.id] = kn;
                results.push({ justiceName: target.name, change: kn - ko, newLeaning: kn, isKnockon: true });
              }
            }
          }
        }
      }
    });

    // Generate qualitative feedback for standard sway if not already set
    if (!overrideFeedback && (tactic.effectType === "sway-one" || tactic.effectType === "sway-all")) {
      const primaryResults = results.filter((r) => !r.isKnockon);
      if (primaryResults.length === 1 && tactic.effectType === "sway-one") {
        // Single target - use detailed feedback
        const result = primaryResults[0];
        overrideFeedback = getSingleTargetFeedback(result.justiceName, result.change, tactic);
      } else if (primaryResults.length > 0) {
        // Multi-target - use aggregate feedback without numbers
        const avgChange = primaryResults.reduce((sum, r) => sum + Math.abs(r.change), 0) / primaryResults.length;
        const magnitude = getMagnitudeDescriptor(avgChange);

        const swayedPositive = primaryResults.filter((r) => r.change > 15).length;
        const swayedNegative = primaryResults.filter((r) => r.change < -15).length;
        const barelyMoved = primaryResults.filter((r) => Math.abs(r.change) <= 15).length;

        if (swayedPositive >= 6) {
          overrideFeedback = `${magnitude} — most justices are swayed in your favor.`;
        } else if (swayedPositive >= 4) {
          overrideFeedback = `${magnitude} — several justices move toward you.`;
        } else if (swayedNegative >= 4) {
          overrideFeedback = `${magnitude} — the bench moves against you.`;
        } else if (barelyMoved >= 6) {
          overrideFeedback = "The bench is largely unmoved by this argument.";
        } else {
          overrideFeedback = `${magnitude} — mixed results across the bench.`;
        }
      }

      // Add knockon context if applicable
      const knockons = results.filter((r) => r.isKnockon);
      if (knockons.length > 0) {
        const knockonJustice = knockons[0].justiceName;
        if (knockons.length === 1) {
          overrideFeedback += ` ${knockonJustice} followed suit.`;
        } else {
          overrideFeedback += ` Several justices followed suit.`;
        }
      }
    }
  }

  return { results, reportTarget, overrideFeedback, pendingRedraws };
}
