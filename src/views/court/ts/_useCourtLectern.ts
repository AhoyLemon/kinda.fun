import type { CourtGameState, Justice, Tactic, TurnActor } from "./_types";
import type { EffectOutcome } from "./_tacticEffects";
import { useToast, POSITION } from "vue-toastification";
import TacticToast from "../components/TacticToast.vue";
import { uiSettings } from "./_settings";

// Boost applied to whatever blind card the player commits to. Tweak freely.
export const LECTERN_BOOST = 1.6;

// Outcome of trying to start playing a tactic. Shared with Court.vue's initiateTactic():
//  - "resolved": the effect was applied immediately (the turn is already ending)
//  - "targeting": the card now awaits a target / stance / claim selection
//  - "blocked": the card cannot legally be played right now (no valid target, etc.)
//  - "lectern": the player entered "without notes" mode and must now pick a blind card
export type InitiateResult = "resolved" | "targeting" | "blocked" | "lectern";

interface LecternPlayRecord {
  actor: TurnActor;
  tacticName: string;
  cardType: string;
  targetName: string;
  results: { justiceName: string; change: number }[];
  round: number;
  viaLectern?: boolean;
}

/* eslint-disable no-unused-vars -- base eslint rule incorrectly flags TS interface method parameter names */
interface LecternDeps {
  drawCard: () => Tactic | null;
  removeFromPlaybook: (tactic: Tactic) => void;
  shuffle: <T>(arr: T[]) => T[];
  endPlayerTurn: () => void;
  initiateTactic: (tactic: Tactic) => InitiateResult;
  recordPlay: (play: LecternPlayRecord) => void;
}
/* eslint-enable no-unused-vars */

/**
 * "Go To The Lectern Without Notes" — the blind-gamble tactic.
 *
 * Playing the Lectern card flips the whole hand face-down, redraws, and reshuffles;
 * the player then commits to one card sight-unseen. Whatever they play resolves at
 * amplified power. This composable owns that flow end-to-end so Court.vue only has to
 * wire it into selectTactic / initiateTactic / applyTactic.
 */
export function useCourtLectern(game: CourtGameState, deps: LecternDeps) {
  const toast = useToast();

  function playerToast(tacticName: string, feedback: string | null): void {
    toast(
      { component: TacticToast, props: { actor: "player", tacticName, results: [], feedback } },
      {
        position: POSITION.BOTTOM_RIGHT,
        timeout: uiSettings.toastDuration === 0 ? false : uiSettings.toastDuration,
        toastClassName: "court-toast court-toast--player",
      },
    );
  }

  // Play the Lectern card itself: burn it, redraw a replacement, then flip + shuffle the
  // entire hand (shared Playbook AND claimed cards) so nothing can be tracked by position.
  function enterLecternMode(lecternTactic: Tactic): void {
    // Draw the replacement BEFORE discarding the Lectern card, so a near-empty deck can't
    // reshuffle and immediately hand the Lectern card right back.
    game.playbook = game.playbook.filter((t) => t.id !== lecternTactic.id);
    const drawn = deps.drawCard();
    if (drawn) game.playbook.push(drawn);
    game.discardPile.push(lecternTactic);

    game.playbook = deps.shuffle([...game.playbook]);
    game.claimedCards = deps.shuffle([...game.claimedCards]);
    game.selectedTacticId = null;

    // Nothing to pick from (deck fully exhausted) — don't soft-lock the turn.
    if (game.playbook.length === 0 && game.claimedCards.length === 0) {
      deps.endPlayerTurn();
      return;
    }

    game.lecternMode = true;
    playerToast(lecternTactic.name, lecternTactic.feedback ?? null);
  }

  // Commit to a blind card (from the shared Playbook OR claimed cards) and route it onward.
  function chooseLecternCard(tacticId: number): void {
    const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === tacticId);
    if (!tactic) return;

    game.lecternMode = false;
    game.lecternBoostPending = true;
    // Lock & hide: the committed card stays face-down and can't be deselected while it
    // awaits a target. applyTactic / fizzle clears this once the play actually resolves.
    game.lecternBlindTacticId = tactic.id;

    const status = deps.initiateTactic(tactic);
    if (status === "blocked") {
      // The blind card has no legal play. Honor the gamble: it fizzles and the turn ends.
      fizzleLecternCard(tactic);
      return;
    }

    // Surprise Dibs: name the card so the follow-up claim step isn't baffling. The cards you
    // claim stay face-down — you know the *action* (Dibs), not the cards you're grabbing.
    if (status === "targeting" && tactic.effectType === "claim-two") {
      playerToast(tactic.name, "Surprise — you blindly grabbed I Call Dibs! Pick 2 cards to claim. You still won't know what they are.");
      return;
    }

    // Shield needs an allied (leaning > 0) target. With none on the bench the committed card
    // would stall, so fizzle it instead.
    if (status === "targeting" && tactic.effectType === "shield" && !game.bench.some((j) => (game.leanings[j.id] ?? 0) > 0)) {
      game.selectedTacticId = null;
      fizzleLecternCard(tactic);
    }
  }

  function fizzleLecternCard(tactic: Tactic): void {
    game.lecternBoostPending = false;
    game.lecternBlindTacticId = null;

    // Consume the dud so it leaves play like any other card.
    const fromClaimed = game.claimedCards.some((t) => t.id === tactic.id);
    if (fromClaimed) {
      game.claimedCards = game.claimedCards.filter((t) => t.id !== tactic.id);
      game.discardPile.push(tactic);
      setTimeout(() => {
        const drawn = deps.drawCard();
        if (drawn) game.playbook.push(drawn);
      }, 320);
    } else {
      deps.removeFromPlaybook(tactic);
    }

    deps.recordPlay({
      actor: "player",
      tacticName: tactic.name,
      cardType: tactic.cardType,
      targetName: "— (no play)",
      results: [],
      round: game.round,
      viaLectern: true,
    });

    playerToast(tactic.name, "You confidently argued from notes you couldn't read. It went nowhere — but with conviction.");
    deps.endPlayerTurn();
  }

  // Amplifies a just-resolved play's leaning swings (the "without notes" payoff). Operates on
  // the outcome the resolver already produced, so it covers single-target, all-bench,
  // multi-target, and knock-on results uniformly.
  function applyLecternBoost(outcome: EffectOutcome): void {
    const extra = LECTERN_BOOST - 1;
    outcome.results.forEach((r) => {
      if (!r.change) return;
      const justice = game.bench.find((j: Justice) => j.name === r.justiceName);
      if (!justice) return;
      const bonus = Math.round(r.change * extra);
      if (!bonus) return;
      const old = game.leanings[justice.id] ?? 0;
      const next = Math.max(-100, Math.min(100, old + bonus));
      game.leanings[justice.id] = next;
      r.change += next - old;
      r.newLeaning = next;
    });
  }

  return { enterLecternMode, chooseLecternCard, applyLecternBoost };
}
