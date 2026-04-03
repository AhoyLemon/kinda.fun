<script setup lang="ts">
  import { reactive, computed, onMounted } from "vue";
  import { useToast, POSITION } from "vue-toastification";
  import TacticToast from "./components/TacticToast.vue";
  import { justiceCurrent, justiceHistorical, justiceFictional, justiceCelebrity } from "./ts/_justices";
  import { cases as allCases } from "./ts/_cases";
  import { tactics as allTactics } from "./ts/_tactics";
  import type { Justice, Case, Tactic, Party } from "./ts/_types";

  // ── Debug constant ─────────────────────────────────────────
  // Set to 0 to keep toasts visible until manually dismissed (click to close).
  const toastDuration: number = 4000; // ms (set to 0 to persist until clicked)

  // ── Game settings ──────────────────────────────────────────
  const gameSettings = { numberOfRounds: 3, abstentionThreshold: 20 } as const;

  const toast = useToast();

  type Side = "prosecution" | "defendant";
  type TurnActor = "player" | "opponent";
  type Phase = "courtSelect" | "setup" | "playing" | "verdict";
  type CourtMode = "current" | "historical" | "fantasy" | "chaos";

  const ui = reactive({
    gameName: "court",
    title: "Supreme Court: The Card Game",
    phase: "courtSelect" as Phase,
    courtMode: null as CourtMode | null,
    courtReportVisible: false,
    opponentThinking: false,
    opponentHighlightedCardId: null as number | null, // card the opponent appears to be browsing
    detailJustice: null as Justice | null, // justice whose detail modal is open
    targetingChoice: null as Justice | null, // justice clicked while a tactic is selected
  });

  const game = reactive({
    bench: [] as Justice[],
    currentCase: null as Case | null,
    playerSide: null as Side | null,
    chiefJusticeId: null as number | null, // id of the current chief justice
    chiefJusticeHardened: false, // true = harder to sway (randomly selected CJ)
    // Card pools
    deck: [] as Tactic[],
    discardPile: [] as Tactic[],
    docket: [] as Tactic[], // shared 5-card community pool (renamed from "hand")
    claimedCards: [] as Tactic[], // cards claimed exclusively by player
    // Turn state
    currentTurn: "player" as TurnActor,
    round: 1,
    totalRounds: gameSettings.numberOfRounds,
    // Targeting
    selectedTacticId: null as number | null,
    claimingMode: false,
    claimedSelections: [] as number[],
    // Justice state
    leanings: {} as Record<number, number>, // justice.id → -100..+100 from player's perspective
    susceptibilityMods: {} as Record<number, number>,
    playerShields: [] as number[], // justice ids player has shielded (opponent can't touch)
    opponentShields: [] as number[], // justice ids opponent has shielded (player can't touch)
    recusedJustices: [] as number[], // justice ids that have been recused (harder to sway)
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

  const caseHistory = reactive<
    Array<{
      caseName: string;
      votes: Record<number, boolean>; // justice.id → true = voted for player
    }>
  >([]);

  // tacticFeedback replaced by Vue-Toastification (see applyTactic)

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
    return (leftParties.includes(a) && leftParties.includes(b)) || (rightParties.includes(a) && rightParties.includes(b));
  }

  function partiesOpposed(a: Party | undefined, b: Party | undefined): boolean {
    if (!a || !b) return false;
    return (leftParties.includes(a) && rightParties.includes(b)) || (rightParties.includes(a) && leftParties.includes(b));
  }

  function getInitialLeaning(justice: Justice): number {
    if (!game.currentCase || !game.playerSide) return 0;
    const playerParty = game.playerSide === "prosecution" ? game.currentCase.prosecution.favoredBy : game.currentCase.defendant.favoredBy;
    const justiceParty = justice.nominatedBy?.party;
    if (partiesAligned(playerParty, justiceParty)) return Math.ceil(justice.stats.partyLoyalty * 2.5);
    if (partiesOpposed(playerParty, justiceParty)) return -Math.ceil(justice.stats.partyLoyalty * 2.5);
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

  function selectCourtMode(mode: CourtMode): void {
    ui.courtMode = mode;
    dealGame();
  }

  function resetToCourtSelect(): void {
    ui.phase = "courtSelect";
  }

  function dealGame(): void {
    // Save this game's justice votes to case history before resetting
    if (game.currentCase && game.bench.length && (ui.phase === "playing" || ui.phase === "verdict")) {
      const votes: Record<number, boolean> = {};
      game.bench.forEach((j) => {
        votes[j.id] = (game.leanings[j.id] ?? 0) > 0;
      });
      caseHistory.push({ caseName: game.currentCase.name, votes });
    }

    // Build justice pool + assign chief justice based on selected mode
    const mode = ui.courtMode ?? "current";
    let pool: Justice[];
    let chiefId: number | null = null;
    let hardened = true;

    if (mode === "current") {
      pool = [...justiceCurrent]; // always use all 9 current justices
      chiefId = 1; // John Roberts is always Chief in Current mode
    } else if (mode === "historical") {
      pool = shuffle([...justiceCurrent, ...justiceHistorical]).slice(0, 9);
      chiefId = pool[Math.floor(Math.random() * pool.length)].id;
    } else if (mode === "fantasy") {
      pool = shuffle([...justiceFictional, ...justiceCelebrity]).slice(0, 9);
      chiefId = pool[Math.floor(Math.random() * pool.length)].id;
    } else {
      // chaos: any justice
      pool = shuffle([...justiceCurrent, ...justiceHistorical, ...justiceFictional, ...justiceCelebrity]).slice(0, 9);
      chiefId = pool[Math.floor(Math.random() * pool.length)].id;
    }

    game.bench = pool;
    game.chiefJusticeId = chiefId;
    game.chiefJusticeHardened = hardened;
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
    game.recusedJustices = [];
    courtReport.plays = [];
    ui.phase = "setup";
    ui.courtReportVisible = false;
    ui.opponentThinking = false;
    ui.opponentHighlightedCardId = null;
    ui.detailJustice = null;
    ui.targetingChoice = null;
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
      tactic.effectType === "discard-all" ||
      tactic.effectType === "insult-chief" ||
      tactic.effectType === "presidential-call"
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

  // Called when player confirms targeting from the choice popup
  function confirmTarget(): void {
    if (!ui.targetingChoice) return;
    const justice = ui.targetingChoice;
    ui.targetingChoice = null;
    selectJustice(justice);
  }

  // Unified justice click handler: opens detail view or targeting choice depending on context
  function handleJusticeClick(justice: Justice): void {
    if (ui.phase === "setup") {
      ui.detailJustice = justice;
      return;
    }
    if (ui.phase !== "playing" || ui.opponentThinking) return;
    if (game.selectedTacticId !== null && game.currentTurn === "player") {
      const tactic = [...game.docket, ...game.claimedCards].find((t) => t.id === game.selectedTacticId);
      // If shield on enemy, or no tactic found — open detail instead
      if (!tactic || (tactic.effectType === "shield" && (game.leanings[justice.id] ?? 0) <= 0)) {
        ui.detailJustice = justice;
        return;
      }
      ui.targetingChoice = justice;
    } else {
      ui.detailJustice = justice;
    }
  }

  // ─── Apply Tactic ────────────────────────────────────────────

  function applyTactic(tactic: Tactic, targetJustice: Justice | null, actor: TurnActor): void {
    const results: { justiceName: string; change: number; newLeaning: number; isKnockon?: boolean }[] = [];
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
    } else if (tactic.effectType === "make-chief") {
      // Change the chief justice to targetJustice
      removeFromDocket(tactic);
      if (targetJustice) {
        const prevCJId = game.chiefJusticeId;
        const prevCJ = game.bench.find((j) => j.id === prevCJId);
        const prevParty = prevCJ?.nominatedBy?.party;
        const newParty = targetJustice.nominatedBy?.party;

        game.chiefJusticeId = targetJustice.id;
        game.chiefJusticeHardened = false; // new CJ is not resistance-hardened

        // Previous CJ suffers (-20) from losing the title
        if (prevCJ) {
          const old = game.leanings[prevCJ.id] ?? 0;
          const next = Math.max(-100, old - 20);
          game.leanings[prevCJ.id] = next;
          results.push({ justiceName: prevCJ.name, change: next - old, newLeaning: next });
        }

        // If parties differ, previous CJ's party allies also suffer (-20)
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

        reportTarget = `${targetJustice.name} (new Chief Justice)`;
      }
    } else if (tactic.effectType === "insult-chief") {
      // Negative for the Chief Justice, positive for opposite-party justices
      removeFromDocket(tactic);
      const cj = game.bench.find((j) => j.id === game.chiefJusticeId);
      if (cj) {
        const cjParty = cj.nominatedBy?.party;
        const dir = actor === "opponent" ? -1 : 1;

        // Chief takes a hit (negative)
        const cjOld = game.leanings[cj.id] ?? 0;
        const cjNext = Math.max(-100, Math.min(100, cjOld - tactic.basePower * 10 * dir));
        game.leanings[cj.id] = cjNext;
        results.push({ justiceName: cj.name, change: cjNext - cjOld, newLeaning: cjNext });

        // Opposite-party justices gain +20 (they're delighted)
        game.bench
          .filter((j) => j.id !== cj.id && j.nominatedBy?.party !== cjParty)
          .forEach((j) => {
            const old = game.leanings[j.id] ?? 0;
            const next = Math.max(-100, Math.min(100, old + 20 * dir));
            game.leanings[j.id] = next;
            results.push({ justiceName: j.name, change: next - old, newLeaning: next });
          });

        reportTarget = cj.name + " (Chief Justice)";
      }
    } else if (tactic.effectType === "presidential-call") {
      // A Zoom call with Trump — rambling, mostly incoherent, accidentally hangs up.
      // Big positive for Trump nominees, tiny positive for other Republicans,
      // big negative for Obama/Biden nominees, tiny negative for other Democrats.
      removeFromDocket(tactic);
      const dir = actor === "opponent" ? -1 : 1;
      game.bench.forEach((j) => {
        const nomParty = j.nominatedBy?.party;
        const nominatedByTrump = j.nominatedBy?.name === "Donald Trump";
        const nominatedByObamaOrBiden = j.nominatedBy?.name === "Barack Obama" || j.nominatedBy?.name === "Joe Biden";
        let delta = 0;
        if (nominatedByTrump) {
          // Strong sway — Trump appointees are delighted
          delta = Math.round(tactic.basePower * j.stats.partyLoyalty);
        } else if (nomParty === "Republican") {
          // Same party, not a Trump pick — slight bump
          delta = Math.round(tactic.basePower * j.stats.partyLoyalty * 0.2);
        } else if (nominatedByObamaOrBiden) {
          // Visceral reaction — big negative
          delta = -Math.round(tactic.basePower * j.stats.partyLoyalty);
        } else {
          // Other Democrats / no party — mild annoyance
          delta = -Math.round(tactic.basePower * j.stats.partyLoyalty * 0.2);
        }
        if (delta !== 0) {
          const old = game.leanings[j.id] ?? 0;
          const next = Math.max(-100, Math.min(100, old + delta * dir));
          game.leanings[j.id] = next;
          results.push({ justiceName: j.name, change: next - old, newLeaning: next });
        }
      });
      reportTarget = "All justices (Presidential call)";
    } else if (tactic.effectType === "recuse") {
      // Resets targeted justice to neutral; they become harder to sway going forward
      removeFromDocket(tactic);
      if (targetJustice) {
        const old = game.leanings[targetJustice.id] ?? 0;
        game.leanings[targetJustice.id] = 0;
        if (!game.recusedJustices.includes(targetJustice.id)) {
          game.recusedJustices.push(targetJustice.id);
        }
        results.push({ justiceName: targetJustice.name, change: -old, newLeaning: 0 });
        reportTarget = targetJustice.name;
      }
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
          power = Math.round((power * (tactic.statRelation === "resists" ? 10 - sv : sv)) / 5);
        }
        const sucMod = game.susceptibilityMods[justice.id] ?? 0;
        if (sucMod > 0 && tactic.effectType !== "susceptibility") {
          power += Math.round((sucMod * justice.stats.succeptibility) / 10);
          game.susceptibilityMods[justice.id] = 0;
        }

        // Chief justice resistance: sway power is halved when hardened
        if (justice.id === game.chiefJusticeId && game.chiefJusticeHardened && tactic.effectType !== "susceptibility" && tactic.effectType !== "shield") {
          power = Math.max(1, Math.ceil(power * 0.5));
        }

        // Recused justices are harder to sway going forward
        if (game.recusedJustices.includes(justice.id) && tactic.effectType !== "susceptibility" && tactic.effectType !== "shield") {
          power = Math.max(1, Math.ceil(power * 0.5));
        }

        if (tactic.effectType === "susceptibility") {
          game.susceptibilityMods[justice.id] = (game.susceptibilityMods[justice.id] ?? 0) + tactic.basePower;
          results.push({ justiceName: justice.name, change: 0, newLeaning: game.leanings[justice.id] ?? 0 });
        } else if (tactic.effectType === "shield") {
          if (actor === "player") game.playerShields.push(justice.id);
          else game.opponentShields.push(justice.id);
          results.push({ justiceName: justice.name, change: 0, newLeaning: game.leanings[justice.id] ?? 0 });
        } else {
          // sway — opponent's attacks are negative from player's perspective
          const dir = actor === "opponent" ? -1 : 1;
          const old = game.leanings[justice.id] ?? 0;
          // Scale to ±100 range; sway-all attacks are halved to encourage targeted play
          const effectivePower = tactic.effectType === "sway-all" ? Math.round(power * 5) : power * 10;
          const next = Math.max(-100, Math.min(100, old + effectivePower * dir));
          game.leanings[justice.id] = next;
          const change = next - old;
          results.push({ justiceName: justice.name, change, newLeaning: next });

          // Chief justice knockon: sway-one on the CJ ripples to same-party allies at 50%
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

    toast(
      {
        component: TacticToast,
        props: { actor, tacticName: tactic.name, results: results.map((r) => ({ justiceName: r.justiceName, change: r.change, isKnockon: r.isKnockon })) },
      },
      { position: POSITION.BOTTOM_RIGHT, timeout: toastDuration === 0 ? false : toastDuration, toastClassName: `court-toast court-toast--${actor}` },
    );

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

    // Simulate opponent browsing the Docket for 4-6 seconds
    const thinkTime = 4000 + Math.random() * 2000;
    const browseInterval = 650;
    let elapsed = 0;

    const browseTimer = setInterval(() => {
      elapsed += browseInterval;
      const available = game.docket.filter((t) => t.effectType !== "claim-two");
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
      tactic.effectType === "discard-all" ||
      tactic.effectType === "insult-chief" ||
      tactic.effectType === "presidential-call"
    ) {
      applyTactic(tactic, null, "opponent");
      return;
    }

    if (tactic.effectType === "recuse") {
      // Opponent uses recuse to neutralize the player's strongest ally
      const friendlies = game.bench
        .filter((j) => !game.playerShields.includes(j.id) && (game.leanings[j.id] ?? 0) > gameSettings.abstentionThreshold)
        .sort((a, b) => (game.leanings[b.id] ?? 0) - (game.leanings[a.id] ?? 0));
      if (!friendlies.length) {
        endOpponentTurn();
        return;
      }
      applyTactic(tactic, friendlies[0], "opponent");
      return;
    }

    if (tactic.effectType === "shield") {
      // Opponent protects its allies (justices leaning against player)
      const allies = game.bench.filter((j) => (game.leanings[j.id] ?? 0) < 0);
      if (!allies.length) {
        // No allies — fall back to a sway card instead
        const fallback = available.filter((t) => t.effectType !== "shield" && t.effectType !== "claim-two" && t.effectType !== "make-chief");
        if (!fallback.length) {
          endOpponentTurn();
          return;
        }
        const fb = fallback[Math.floor(Math.random() * fallback.length)];
        applyTactic(fb, null, "opponent");
        return;
      }
      applyTactic(tactic, allies[Math.floor(Math.random() * allies.length)], "opponent");
      return;
    }

    if (tactic.effectType === "make-chief") {
      // Opponent tries to elevate a justice they like as chief
      const candidates = game.bench.filter((j) => j.id !== game.chiefJusticeId && (game.leanings[j.id] ?? 0) < 0);
      if (!candidates.length) {
        endOpponentTurn();
        return;
      }
      applyTactic(tactic, candidates[Math.floor(Math.random() * candidates.length)], "opponent");
      return;
    }

    // sway-one: target any justice not currently shielded by the player
    const candidates = game.bench.filter((j) => !game.playerShields.includes(j.id));
    if (!candidates.length) {
      endOpponentTurn();
      return;
    }
    applyTactic(tactic, candidates[Math.floor(Math.random() * candidates.length)], "opponent");
  }

  function endOpponentTurn(): void {
    game.playerShields = []; // player's shields expire once opponent finishes their turn
    ui.opponentThinking = false;
    game.currentTurn = "player";
    if (game.round >= gameSettings.numberOfRounds) {
      setTimeout(() => {
        ui.phase = "verdict";
      }, 1500);
    } else {
      game.round++;
    }
  }

  // ─── Computed ────────────────────────────────────────────────

  const sortedBench = computed(() =>
    [...game.bench].sort((a, b) => {
      if (a.id === game.chiefJusticeId) return -1;
      if (b.id === game.chiefJusticeId) return 1;
      return 0;
    }),
  );

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
    const statKeys = ["logic", "charisma", "empathy", "integrity", "succeptibility", "partyLoyalty"] as const;
    const statAvg = (k: (typeof statKeys)[number]) => bench.reduce((s, j) => s + j.stats[k], 0) / bench.length;
    const bestStat = statKeys.reduce((a, b) => (statAvg(a) >= statAvg(b) ? a : b));
    const worstStat = statKeys.reduce((a, b) => (statAvg(a) <= statAvg(b) ? a : b));
    const weaknessKeys = ["flattery", "bribery", "blackmail", "threats"] as const;
    const wkAvg = (k: (typeof weaknessKeys)[number]) => bench.reduce((s, j) => s + j.weaknesses[k], 0) / bench.length;
    const greatestWeakness = weaknessKeys.reduce((a, b) => (wkAvg(a) >= wkAvg(b) ? a : b));
    const t = gameSettings.abstentionThreshold;
    const votingFor = bench.filter((j) => (game.leanings[j.id] ?? 0) > t).length;
    const votingAgainst = bench.filter((j) => (game.leanings[j.id] ?? 0) < -t).length;
    const abstaining = bench.length - votingFor - votingAgainst;
    return { maleCount, femaleCount, partyCounts, bestStat, worstStat, greatestWeakness, votingFor, votingAgainst, abstaining };
  });

  const verdict = computed(() => {
    if (!game.bench.length) return null;
    const t = gameSettings.abstentionThreshold;
    const forCount = game.bench.filter((j) => (game.leanings[j.id] ?? 0) > t).length;
    const againstCount = game.bench.filter((j) => (game.leanings[j.id] ?? 0) < -t).length;
    const abstainCount = game.bench.length - forCount - againstCount;
    return { forCount, againstCount, abstainCount, won: forCount >= 5 };
  });

  const tallyDisplay = computed(() => {
    if (!benchOverview.value) return "0-0";
    const { votingFor, votingAgainst, abstaining } = benchOverview.value;
    return abstaining > 0 ? `${votingFor}-${votingAgainst}-${abstaining}` : `${votingFor}-${votingAgainst}`;
  });

  const tallyClass = computed(() => {
    if (!benchOverview.value) return "";
    const { votingFor, abstaining } = benchOverview.value;
    return [votingFor >= 5 ? "is-winning" : "is-losing", abstaining > 0 ? "has-abstentions" : ""].filter(Boolean).join(" ");
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

      // Party-level breakdown — cross-reference with current bench by name
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

  // ─── UI Helpers ──────────────────────────────────────────────

  function getKeyStats(justice: Justice): Record<string, number> {
    return {
      Logic: justice.stats.logic,
      Charisma: justice.stats.charisma,
      Loyalty: justice.stats.partyLoyalty,
    };
  }

  function justiceTypeLabel(type: Justice["justiceType"]): string {
    return { current: "Current", historical: "Historical", fictional: "Fictional", celebrity: "Celebrity" }[type] ?? type;
  }

  function targetLabel(effectType: Tactic["effectType"]): string {
    return (
      {
        "sway-one": "🎯 Single target",
        "sway-all": "🌊 All justices",
        susceptibility: "😴 All justices",
        shield: "🛡️ Ally only",
        "discard-all": "🗑 Docket",
        "claim-two": "🗑 Docket",
        "make-chief": "👑 Chief Justice",
        "insult-chief": "👑 Chief Justice",
        "presidential-call": "� All justices",
        recuse: "🔕 Single target",
      }[effectType] ?? effectType
    );
  }

  function voteMeterStyle(justice: Justice): Record<string, string> {
    const leaning = game.leanings[justice.id] ?? 0;
    const halfPct = (Math.abs(leaning) / 100) * 50;
    const color = leaning > 0 ? "#2a7a3a" : leaning < 0 ? "#8b2020" : "transparent";
    if (leaning >= 0) {
      return { left: "50%", width: `${halfPct}%`, backgroundColor: color };
    } else {
      return { left: `${50 - halfPct}%`, width: `${halfPct}%`, backgroundColor: color };
    }
  }

  const chiefJustice = computed(() => game.bench.find((j) => j.id === game.chiefJusticeId) ?? null);

  const benchLabel = computed(() => {
    if (!chiefJustice.value) return "The Bench";
    const lastName = chiefJustice.value.name.split(" ").at(-1);
    return `The ${lastName} Court`;
  });

  function voteLabel(leaning: number): string {
    const t = gameSettings.abstentionThreshold;
    if (leaning >= 60) return "✅ Strongly For";
    if (leaning > t) return "↗ Leaning For";
    if (leaning >= -t) return "⚖️ Undecided";
    if (leaning > -60) return "↘ Leaning Against";
    return "❌ Strongly Against";
  }

  function justiceImageUrl(justice: Justice): string | null {
    return justice.image ? `/img/court/justices/${justice.image}` : null;
  }

  function justiceHints(justice: Justice, limit = 4): string[] {
    const hints: string[] = [];
    if (justice.stats.partyLoyalty >= 8) hints.push("📌 Deeply partisan");
    else if (justice.stats.partyLoyalty <= 3) hints.push("🎯 Votes independently");
    if (justice.weaknesses.flattery >= 7) hints.push("😊 Loves being flattered");
    else if (justice.weaknesses.flattery <= 2) hints.push("🙄 Immune to flattery");
    if (justice.weaknesses.bribery >= 7) hints.push("💰 Open to bribery");
    else if (justice.weaknesses.bribery <= 2) hints.push("🚫 Incorruptible");
    if (justice.weaknesses.blackmail >= 7) hints.push("🤫 Has something to hide");
    if (justice.weaknesses.threats >= 7) hints.push("😰 Unnerved by pressure");
    if (justice.stats.succeptibility >= 7) hints.push("🌀 Easily swayed");
    else if (justice.stats.succeptibility <= 3) hints.push("🪨 Hard to budge");
    if (justice.stats.empathy >= 8) hints.push("❤️ Responds to emotional appeals");
    else if (justice.stats.empathy <= 2) hints.push("🧊 Cold to emotional arguments");
    if (justice.stats.logic >= 8) hints.push("📚 Won over by sound reasoning");
    else if (justice.stats.logic <= 3) hints.push("❓ Logic rarely lands here");
    return hints.slice(0, limit);
  }

  function justiceVoteHistory(justice: Justice): Array<{ caseName: string; votedFor: boolean }> {
    return caseHistory.filter((c) => justice.id in c.votes).map((c) => ({ caseName: c.caseName, votedFor: c.votes[justice.id] }));
  }

  onMounted(() => {
    ui.phase = "courtSelect";
  });
</script>
<template lang="pug" src="./Court.pug"></template>

<style lang="scss" src="./Court.scss"></style>
