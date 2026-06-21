import type { CourtGameState, CampaignState, Justice, Tactic, TurnActor } from "./_types";
import { gameSettings } from "./_settings";

interface TurnUiAccess {
  phase: string;
  isCampaignMode: boolean;
  opponentThinking: boolean;
  opponentHighlightedCardId: number | null;
}

/* eslint-disable no-unused-vars -- base eslint rule incorrectly flags TS interface method parameter names */
interface TurnDeps {
  trackTrialVerdictStats: (opts: { isQuickplay: boolean }) => Promise<void>;
  applyTactic: (tactic: Tactic, target: Justice | null, actor: TurnActor) => void;
  shuffle: <T>(arr: T[]) => T[];
  triggerLemonMomentIfDue: () => void;
}
/* eslint-enable no-unused-vars */

export function useCourtTurns(
  game: CourtGameState,
  campaign: { data: CampaignState | null },
  ui: TurnUiAccess,
  deps: TurnDeps,
) {
  // ── Eligible Multi-Target Justices ────────────────────────────

  function getEligibleMultiTargetJustices(tactic: Tactic | null): Justice[] {
    if (!tactic) return [];
    if (tactic.effectType === "swap-clerks") {
      return game.bench.filter((justice) => !(justice.id in game.nappingJustices) && !game.recusedJustices.includes(justice.id));
    }
    return [];
  }

  // ── Turn Flow ─────────────────────────────────────────────────

  function endPlayerTurn(): void {
    if (campaign.data?.doubleTapActive) {
      campaign.data.doubleTapActive = false;
      return;
    }

    if (game.skipNextRound) {
      delete game.skipNextRound;
      game.round += 2;
      game.currentTurn = "player";
      deps.triggerLemonMomentIfDue();

      if (game.round > gameSettings.numberOfRounds) {
        void deps.trackTrialVerdictStats({ isQuickplay: !ui.isCampaignMode });
        setTimeout(() => {
          ui.phase = "verdict";
        }, 1500);
      }
      return;
    }

    game.currentTurn = "opponent";
    ui.opponentThinking = true;

    const thinkTime = 4000 + Math.random() * 2000;
    const browseInterval = 650;
    let elapsed = 0;

    const browseTimer = setInterval(() => {
      elapsed += browseInterval;
      const available = game.playbook.filter((t) => t.effectType !== "claim-two" && t.effectType !== "lectern-without-notes");
      if (available.length) {
        const pick = available[Math.floor(Math.random() * available.length)];
        ui.opponentHighlightedCardId = pick.id;
      }
      if (elapsed >= thinkTime) {
        clearInterval(browseTimer);
        ui.opponentHighlightedCardId = null;
        setTimeout(() => playOpponentTurn(), 200);
      }
    }, browseInterval);
  }

  function playOpponentTurn(): void {
    const available = game.playbook.filter(
      (t) =>
        t.effectType !== "claim-two" &&
        t.effectType !== "suggest-retirement" &&
        t.effectType !== "keep-crown" &&
        t.effectType !== "lectern-without-notes",
    );
    if (!available.length) {
      endOpponentTurn();
      return;
    }
    const tactic = available[Math.floor(Math.random() * available.length)];

    if (
      tactic.effectType === "sway-all" ||
      tactic.effectType === "request-amicus" ||
      tactic.effectType === "susceptibility" ||
      tactic.effectType === "discard-all" ||
      tactic.effectType === "recite-dissent" ||
      tactic.effectType === "insult-chief" ||
      tactic.effectType === "presidential-call" ||
      tactic.effectType === "saint-patricks" ||
      tactic.effectType === "lemon-test" ||
      tactic.effectType === "fog-machine" ||
      tactic.effectType === "alien-abduction" ||
      tactic.effectType === "mess-calendar" ||
      tactic.effectType === "international-law" ||
      tactic.effectType === "gift-boxes"
    ) {
      deps.applyTactic(tactic, null, "opponent");
      return;
    }

    if (
      tactic.effectType === "encourage-nap" ||
      tactic.effectType === "suggest-yoga" ||
      tactic.effectType === "justice-cocktails" ||
      tactic.effectType === "catch-phone" ||
      tactic.effectType === "plant-story" ||
      tactic.effectType === "whisper-campaign"
    ) {
      const unblocked = game.bench.filter(
        (j) => !(j.id in game.nappingJustices) && !(j.id in game.yogaJustices) && !game.playerShields.includes(j.id),
      );
      const target = unblocked.sort((a, b) => (game.leanings[b.id] ?? 0) - (game.leanings[a.id] ?? 0))[0];
      if (!target) {
        endOpponentTurn();
        return;
      }
      deps.applyTactic(tactic, target, "opponent");
      return;
    }

    if (tactic.effectType === "swap-clerks") {
      const eligibleMultiTargetJustices = getEligibleMultiTargetJustices(tactic);
      if (eligibleMultiTargetJustices.length < 2) {
        endOpponentTurn();
        return;
      }
      const shuffled = deps.shuffle([...eligibleMultiTargetJustices]);
      game.multiTargetMode = true;
      game.multiTargetTacticId = tactic.id;
      game.multiTargetSelections = [shuffled[0].id, shuffled[1].id];
      deps.applyTactic(tactic, null, "opponent");
      return;
    }

    if (tactic.effectType === "betray-friend" || tactic.effectType === "invite-church") {
      const fallback = available.filter((t) => !["betray-friend", "invite-church", "claim-two", "make-chief"].includes(t.effectType));
      if (!fallback.length) {
        endOpponentTurn();
        return;
      }
      deps.applyTactic(fallback[Math.floor(Math.random() * fallback.length)], null, "opponent");
      return;
    }

    if (tactic.effectType === "recuse") {
      const friendlies = game.bench
        .filter((j) => !game.playerShields.includes(j.id) && (game.leanings[j.id] ?? 0) > gameSettings.abstentionThreshold)
        .sort((a, b) => (game.leanings[b.id] ?? 0) - (game.leanings[a.id] ?? 0));
      if (!friendlies.length) {
        endOpponentTurn();
        return;
      }
      deps.applyTactic(tactic, friendlies[0], "opponent");
      return;
    }

    if (tactic.effectType === "shield") {
      const allies = game.bench.filter((j) => (game.leanings[j.id] ?? 0) < 0);
      if (!allies.length) {
        const fallback = available.filter((t) => t.effectType !== "shield" && t.effectType !== "claim-two" && t.effectType !== "make-chief");
        if (!fallback.length) {
          endOpponentTurn();
          return;
        }
        const fb = fallback[Math.floor(Math.random() * fallback.length)];
        deps.applyTactic(fb, null, "opponent");
        return;
      }
      deps.applyTactic(tactic, allies[Math.floor(Math.random() * allies.length)], "opponent");
      return;
    }

    if (tactic.effectType === "make-chief") {
      const candidates = game.bench.filter((j) => j.id !== game.chiefJusticeId && (game.leanings[j.id] ?? 0) < 0);
      if (!candidates.length) {
        endOpponentTurn();
        return;
      }
      deps.applyTactic(tactic, candidates[Math.floor(Math.random() * candidates.length)], "opponent");
      return;
    }

    const candidates = game.bench.filter((j) => !game.playerShields.includes(j.id));
    if (!candidates.length) {
      endOpponentTurn();
      return;
    }
    deps.applyTactic(tactic, candidates[Math.floor(Math.random() * candidates.length)], "opponent");
  }

  function endOpponentTurn(): void {
    for (const [idStr, napRound] of Object.entries(game.nappingJustices)) {
      if (napRound <= game.round) {
        const id = Number(idStr);
        delete game.nappingJustices[id];
      }
    }
    for (const [idStr, yogaRound] of Object.entries(game.yogaJustices)) {
      if (yogaRound <= game.round) {
        const id = Number(idStr);
        delete game.yogaJustices[id];
        game.statMods[id] = {
          ...(game.statMods[id] ?? {}),
          empathy: (game.statMods[id]?.empathy ?? 0) + 3,
          susceptibility: (game.statMods[id]?.susceptibility ?? 0) + 3,
        };
      }
    }
    ui.opponentThinking = false;
    game.currentTurn = "player";

    deps.triggerLemonMomentIfDue();

    if (game.skipNextRound) {
      delete game.skipNextRound;
      game.round += 2;
      game.currentTurn = "opponent";

      if (game.round > gameSettings.numberOfRounds) {
        void deps.trackTrialVerdictStats({ isQuickplay: !ui.isCampaignMode });
        setTimeout(() => {
          ui.phase = "verdict";
        }, 1500);
        return;
      }

      ui.opponentThinking = true;
      setTimeout(() => playOpponentTurn(), 1000);
      return;
    }

    if (game.round >= gameSettings.numberOfRounds) {
      void deps.trackTrialVerdictStats({ isQuickplay: !ui.isCampaignMode });
      setTimeout(() => {
        ui.phase = "verdict";
      }, 1500);
    } else {
      game.round++;
    }
  }

  return { endPlayerTurn, endOpponentTurn, getEligibleMultiTargetJustices };
}
