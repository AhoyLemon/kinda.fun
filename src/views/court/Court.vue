<script setup lang="ts">
  import { reactive, computed, onMounted } from "vue";
  import { justices as allJustices } from "./ts/_justices";
  import { cases as allCases } from "./ts/_cases";
  import { tactics as allTactics } from "./ts/_tactics";
  import type { Justice, Case, Tactic, Party } from "./ts/_types";

  type Side = "prosecution" | "defendant";
  type TurnActor = "player" | "opponent";
  type Phase = "setup" | "playing" | "verdict";

  const ui = reactive({
    gameName: "court",
    title: "Supreme Court: The Card Game",
    phase: "setup" as Phase,
    courtReportVisible: false,
    opponentThinking: false,
  });

  const game = reactive({
    bench: [] as Justice[],
    currentCase: null as Case | null,
    playerSide: null as Side | null,
    // Card pools
    deck: [] as Tactic[],
    discardPile: [] as Tactic[],
    docket: [] as Tactic[], // shared 5-card community pool (renamed from "hand")
    claimedCards: [] as Tactic[], // cards claimed exclusively by player
    // Turn state
    currentTurn: "player" as TurnActor,
    round: 1,
    totalRounds: 3,
    // Targeting
    selectedTacticId: null as number | null,
    claimingMode: false,
    claimedSelections: [] as number[],
    // Justice state
    leanings: {} as Record<number, number>, // justice.id → -10..+10 from player's perspective
    susceptibilityMods: {} as Record<number, number>,
    playerShields: [] as number[], // justice ids player has shielded (opponent can't touch)
    opponentShields: [] as number[], // justice ids opponent has shielded (player can't touch)
  });

  const courtReport = reactive({
    plays: [] as Array<{
      actor: TurnActor;
      tacticName: string;
      cardType: string;
      targetName: string;
      results: { justiceName: string; change: number }[];
      round: number;
    }>,
  });

  const tacticFeedback = reactive({
    visible: false,
    actor: "player" as TurnActor,
    tacticName: "",
    results: [] as { justiceName: string; change: number; newLeaning: number }[],
  });

  // ─── Helpers ─────────────────────────────────────────────────

  function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const leftParties: Party[] = ["Democrat", "Democratic-Republican"];
  const rightParties: Party[] = ["Republican", "Federalist", "Whig"];

  function partiesAligned(a: Party | undefined, b: Party | undefined): boolean {
    if (!a || !b) return false;
    return (
      (leftParties.includes(a) && leftParties.includes(b)) ||
      (rightParties.includes(a) && rightParties.includes(b))
    );
  }

  function partiesOpposed(a: Party | undefined, b: Party | undefined): boolean {
    if (!a || !b) return false;
    return (
      (leftParties.includes(a) && rightParties.includes(b)) ||
      (rightParties.includes(a) && leftParties.includes(b))
    );
  }

  function getInitialLeaning(justice: Justice): number {
    if (!game.currentCase || !game.playerSide) return 0;
    const playerParty =
      game.playerSide === "prosecution"
        ? game.currentCase.prosecution.favoredBy
        : game.currentCase.defendant.favoredBy;
    const justiceParty = justice.nominatedBy?.party;
    if (partiesAligned(playerParty, justiceParty)) return Math.ceil(justice.stats.partyLoyalty / 4);
    if (partiesOpposed(playerParty, justiceParty)) return -Math.ceil(justice.stats.partyLoyalty / 4);
    return 0;
  }

  // ─── Deck Management ─────────────────────────────────────────

  function drawCard(): Tactic | null {
    if (game.deck.length === 0) {
      if (game.discardPile.length === 0) return null;
      game.deck = shuffle([...game.discardPile]);
      game.discardPile = [];
    }
    return game.deck.shift() ?? null;
  }

  // Remove a card from the docket, add it to discard, draw a replacement.
  // Draw BEFORE pushing to discard so reshuffle doesn't immediately re-draw the same card.
  function removeFromDocket(tactic: Tactic): void {
    game.docket = game.docket.filter((t) => t.id !== tactic.id);
    const drawn = drawCard();
    game.discardPile.push(tactic);
    if (drawn) game.docket.push(drawn);
  }

  // ─── Game Management ─────────────────────────────────────────

  function dealGame(): void {
    game.bench = shuffle(allJustices).slice(0, 9);
    game.currentCase = allCases[Math.floor(Math.random() * allCases.length)];
    game.playerSide = null;
    game.deck = [];
    game.discardPile = [];
    game.docket = [];
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
    courtReport.plays = [];
    tacticFeedback.visible = false;
    ui.phase = "setup";
    ui.courtReportVisible = false;
    ui.opponentThinking = false;
  }

  function chooseSide(side: Side): void {
    game.playerSide = side;
  }

  function startArguments(): void {
    game.deck = shuffle([...allTactics]);
    game.docket = [];
    for (let i = 0; i < 5; i++) {
      const card = drawCard();
      if (card) game.docket.push(card);
    }
    game.bench.forEach((j) => {
      game.leanings[j.id] = getInitialLeaning(j);
      game.susceptibilityMods[j.id] = 0;
    });
    ui.phase = "playing";
  }

  // ─── Tactic Selection ────────────────────────────────────────

  function selectTactic(tacticId: number): void {
    if (game.currentTurn !== "player" || ui.opponentThinking) return;

    // In claiming mode: player is choosing which 2 docket cards to claim
    if (game.claimingMode) {
      const idx = game.claimedSelections.indexOf(tacticId);
      if (idx !== -1) {
        game.claimedSelections.splice(idx, 1);
      } else if (game.claimedSelections.length < 2) {
        game.claimedSelections.push(tacticId);
        if (game.claimedSelections.length === 2) finalizeClaim();
      }
      return;
    }

    const tactic = [...game.docket, ...game.claimedCards].find((t) => t.id === tacticId);
    if (!tactic) return;

    if (
      tactic.effectType === "sway-all" ||
      tactic.effectType === "susceptibility" ||
      tactic.effectType === "discard-all"
    ) {
      applyTactic(tactic, null, "player");
    } else if (tactic.effectType === "claim-two") {
      if (game.claimedCards.length > 0) return; // already have dibs
      removeFromDocket(tactic); // consume the claim card immediately, draw replacement
      game.claimingMode = true;
      game.claimedSelections = [];
    } else {
      // sway-one or shield: select then click a justice
      game.selectedTacticId = game.selectedTacticId === tacticId ? null : tacticId;
    }
  }

  function finalizeClaim(): void {
    const claimed = game.docket.filter((t) => game.claimedSelections.includes(t.id));
    game.docket = game.docket.filter((t) => !game.claimedSelections.includes(t.id));
    game.claimedCards.push(...claimed);
    courtReport.plays.push({
      actor: "player",
      tacticName: "I Call Dibs",
      cardType: "defense",
      targetName: claimed.map((t) => t.name).join(" & "),
      results: [],
      round: game.round,
    });
    game.claimingMode = false;
    game.claimedSelections = [];
    endPlayerTurn();
  }

  function selectJustice(justice: Justice): void {
    if (ui.phase !== "playing" || game.selectedTacticId === null || game.currentTurn !== "player") return;
    const tactic = [...game.docket, ...game.claimedCards].find((t) => t.id === game.selectedTacticId);
    if (!tactic) return;
    if (tactic.effectType === "shield" && (game.leanings[justice.id] ?? 0) <= 0) return;
    applyTactic(tactic, justice, "player");
    game.selectedTacticId = null;
  }

  // ─── Apply Tactic ────────────────────────────────────────────

  function applyTactic(tactic: Tactic, targetJustice: Justice | null, actor: TurnActor): void {
    const results: { justiceName: string; change: number; newLeaning: number }[] = [];
    let reportTarget = targetJustice?.name ?? "All justices";

    if (tactic.effectType === "discard-all") {
      // Discard all docket cards (including this one) and draw 5 fresh
      game.discardPile.push(...game.docket);
      game.docket = [];
      for (let i = 0; i < 5; i++) {
        const card = drawCard();
        if (card) game.docket.push(card);
      }
      reportTarget = "All docket cards";
    } else {
      // Remove card from its source first
      const fromClaimed = game.claimedCards.some((t) => t.id === tactic.id);
      if (fromClaimed) {
        game.claimedCards = game.claimedCards.filter((t) => t.id !== tactic.id);
        const drawn = drawCard();
        game.discardPile.push(tactic);
        if (drawn) game.docket.push(drawn);
      } else {
        removeFromDocket(tactic);
      }

      // Determine targets; opposing shields block attacks
      let targets = targetJustice ? [targetJustice] : game.bench;
      if (actor === "opponent" && tactic.effectType !== "susceptibility") {
        targets = targets.filter((j) => !game.playerShields.includes(j.id));
      }
      if (actor === "player" && tactic.effectType !== "susceptibility" && tactic.effectType !== "shield") {
        targets = targets.filter((j) => !game.opponentShields.includes(j.id));
      }

      targets.forEach((justice) => {
        let power = tactic.basePower;
        if (tactic.weaknessBasis) {
          power = Math.round((power * justice.weaknesses[tactic.weaknessBasis]) / 5);
        }
        if (tactic.statBasis) {
          const sv = justice.stats[tactic.statBasis];
          power = Math.round(
            (power * (tactic.statRelation === "resists" ? 10 - sv : sv)) / 5
          );
        }
        const sucMod = game.susceptibilityMods[justice.id] ?? 0;
        if (sucMod > 0 && tactic.effectType !== "susceptibility") {
          power += Math.round((sucMod * justice.stats.succeptibility) / 10);
          game.susceptibilityMods[justice.id] = 0;
        }

        if (tactic.effectType === "susceptibility") {
          game.susceptibilityMods[justice.id] =
            (game.susceptibilityMods[justice.id] ?? 0) + tactic.basePower;
          results.push({ justiceName: justice.name, change: 0, newLeaning: game.leanings[justice.id] ?? 0 });
        } else if (tactic.effectType === "shield") {
          if (actor === "player") game.playerShields.push(justice.id);
          else game.opponentShields.push(justice.id);
          results.push({ justiceName: justice.name, change: 0, newLeaning: game.leanings[justice.id] ?? 0 });
        } else {
          // sway — opponent's attacks are negative from player's perspective
          const dir = actor === "opponent" ? -1 : 1;
          const old = game.leanings[justice.id] ?? 0;
          const next = Math.max(-10, Math.min(10, old + power * dir));
          game.leanings[justice.id] = next;
          results.push({ justiceName: justice.name, change: next - old, newLeaning: next });
        }
      });
    }

    courtReport.plays.push({
      actor,
      tacticName: tactic.name,
      cardType: tactic.cardType,
      targetName: reportTarget,
      results: results.filter((r) => r.change !== 0),
      round: game.round,
    });

    tacticFeedback.actor = actor;
    tacticFeedback.tacticName = tactic.name;
    tacticFeedback.results = results;
    tacticFeedback.visible = true;
    setTimeout(() => {
      tacticFeedback.visible = false;
    }, 3500);

    if (actor === "player") {
      endPlayerTurn();
    } else {
      endOpponentTurn();
    }
  }

  // ─── Turn Management ─────────────────────────────────────────

  function endPlayerTurn(): void {
    game.opponentShields = []; // opponent's shields expire once player finishes their turn
    game.currentTurn = "opponent";
    ui.opponentThinking = true;
    setTimeout(() => playOpponentTurn(), 1800);
  }

  function playOpponentTurn(): void {
    // Opponent draws only from the docket (not claimed cards)
    const available = game.docket.filter((t) => t.effectType !== "claim-two");
    if (!available.length) {
      endOpponentTurn();
      return;
    }
    const tactic = available[Math.floor(Math.random() * available.length)];

    if (
      tactic.effectType === "sway-all" ||
      tactic.effectType === "susceptibility" ||
      tactic.effectType === "discard-all"
    ) {
      applyTactic(tactic, null, "opponent");
      return;
    }

    if (tactic.effectType === "shield") {
      // Opponent protects its allies (justices leaning against player)
      const allies = game.bench.filter((j) => (game.leanings[j.id] ?? 0) < 0);
      if (!allies.length) {
        // No allies — fall back to a sway card instead
        const fallback = available.filter(
          (t) => t.effectType !== "shield" && t.effectType !== "claim-two"
        );
        if (!fallback.length) { endOpponentTurn(); return; }
        const fb = fallback[Math.floor(Math.random() * fallback.length)];
        applyTactic(fb, null, "opponent");
        return;
      }
      applyTactic(tactic, allies[Math.floor(Math.random() * allies.length)], "opponent");
      return;
    }

    // sway-one: target any justice not currently shielded by the player
    const candidates = game.bench.filter((j) => !game.playerShields.includes(j.id));
    if (!candidates.length) { endOpponentTurn(); return; }
    applyTactic(tactic, candidates[Math.floor(Math.random() * candidates.length)], "opponent");
  }

  function endOpponentTurn(): void {
    game.playerShields = []; // player's shields expire once opponent finishes their turn
    ui.opponentThinking = false;
    game.currentTurn = "player";
    if (game.round >= game.totalRounds) {
      setTimeout(() => {
        ui.phase = "verdict";
      }, 1500);
    } else {
      game.round++;
    }
  }

  // ─── Computed ────────────────────────────────────────────────

  const benchOverview = computed(() => {
    const bench = game.bench;
    if (!bench.length) return null;
    const maleCount = bench.filter((j) => j.gender === "M").length;
    const femaleCount = bench.filter((j) => j.gender === "F").length;
    const partyCounts: Record<string, number> = {};
    bench.forEach((j) => {
      const p = j.nominatedBy?.party ?? "Unknown";
      partyCounts[p] = (partyCounts[p] ?? 0) + 1;
    });
    const statKeys = [
      "logic",
      "charisma",
      "empathy",
      "integrity",
      "succeptibility",
      "partyLoyalty",
    ] as const;
    const statAvg = (k: (typeof statKeys)[number]) =>
      bench.reduce((s, j) => s + j.stats[k], 0) / bench.length;
    const bestStat = statKeys.reduce((a, b) => (statAvg(a) >= statAvg(b) ? a : b));
    const worstStat = statKeys.reduce((a, b) => (statAvg(a) <= statAvg(b) ? a : b));
    const weaknessKeys = ["flattery", "bribery", "blackmail", "threats"] as const;
    const wkAvg = (k: (typeof weaknessKeys)[number]) =>
      bench.reduce((s, j) => s + j.weaknesses[k], 0) / bench.length;
    const greatestWeakness = weaknessKeys.reduce((a, b) => (wkAvg(a) >= wkAvg(b) ? a : b));
    const votingFor = bench.filter((j) => (game.leanings[j.id] ?? 0) > 0).length;
    return { maleCount, femaleCount, partyCounts, bestStat, worstStat, greatestWeakness, votingFor };
  });

  const verdict = computed(() => {
    if (!game.bench.length) return null;
    const forCount = game.bench.filter((j) => (game.leanings[j.id] ?? 0) > 0).length;
    return { forCount, againstCount: game.bench.length - forCount, won: forCount >= 5 };
  });

  // ─── UI Helpers ──────────────────────────────────────────────

  function getKeyStats(justice: Justice): Record<string, number> {
    return {
      Logic: justice.stats.logic,
      Charisma: justice.stats.charisma,
      Loyalty: justice.stats.partyLoyalty,
    };
  }

  function justiceTypeLabel(type: Justice["justiceType"]): string {
    return { current: "Current", historical: "Historical", fictional: "Fictional" }[type];
  }

  function targetLabel(effectType: Tactic["effectType"]): string {
    return {
      "sway-one": "🎯 Single target",
      "sway-all": "🌊 All justices",
      susceptibility: "😴 All justices",
      shield: "🛡️ Ally only",
      "discard-all": "🗑 Wipe docket",
      "claim-two": "🔒 Claim 2 cards",
    }[effectType];
  }

  function voteMeterStyle(justice: Justice): Record<string, string> {
    const leaning = game.leanings[justice.id] ?? 0;
    const halfPct = (Math.abs(leaning) / 10) * 50;
    const color = leaning > 0 ? "#2a7a3a" : leaning < 0 ? "#8b2020" : "transparent";
    if (leaning >= 0) {
      return { left: "50%", width: `${halfPct}%`, backgroundColor: color };
    } else {
      return { left: `${50 - halfPct}%`, width: `${halfPct}%`, backgroundColor: color };
    }
  }

  function voteLabel(leaning: number): string {
    if (leaning >= 4) return "✅ Strongly For";
    if (leaning > 0) return "↗ Leaning For";
    if (leaning === 0) return "⚖️ Undecided";
    if (leaning > -4) return "↘ Leaning Against";
    return "❌ Strongly Against";
  }

  onMounted(() => {
    dealGame();
  });
</script>
<template lang="pug" src="./Court.pug"></template>

<style lang="scss" src="./Court.scss"></style>
