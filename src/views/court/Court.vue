<script setup lang="ts">
  import { reactive, computed, onMounted } from "vue";
  import { useToast, POSITION } from "vue-toastification";
  import TacticToast from "./components/TacticToast.vue";
  import {
    justiceCurrent,
    justiceHistorical,
    justiceFictional,
    justiceCelebrity,
    justiceWarrenExtra,
    justiceLochnerExtra,
    presetBenchConfigs,
  } from "./ts/_justices";
  import { cases as allCases, casesHistorical, casesFictional } from "./ts/_cases";
  import { tactics as allTactics } from "./ts/_tactics";
  import type { Justice, Case, Tactic, CourtGameState, CampaignState } from "./ts/_types";
  import { resolveEffect, partiesAligned, partiesOpposed, leftParties, rightParties } from "./ts/_tacticEffects";
  import type { EffectOutcome } from "./ts/_tacticEffects";
  import { gameSettings, uiSettings } from "./ts/_settings";
  import { campaignSetups } from "./ts/_campaigns";
  import { useCampaignManager } from "./ts/_campaignManager";
  import { cheats, cheatsActive } from "./ts/_cheats";

  // ── Game settings ──────────────────────────────────────────

  const toast = useToast();

  type Side = "prosecution" | "defendant";
  type TurnActor = "player" | "opponent";
  type Phase =
    | "title"
    | "courtSelect"
    | "campaignSelect"
    | "objectiveDraw"
    | "setup"
    | "playing"
    | "verdict"
    | "receiveReward"
    | "activateBonus"
    | "recess"
    | "gameOver";
  type CourtMode = "current" | "historical" | "fantasy" | "chaos" | "warren-court" | "lochner-era" | "court-from-hell";

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
    previewPresetId: null as string | null, // preset selected in dropdown, awaiting preview confirmation
    // Campaign UI state
    isCampaignMode: false,
    campaignSetupId: null as number | null,
    rewardTargetJustice: null as number | null,
    rewardEligibleTarget: null as number | null,
    activatingRewardId: null as string | null,
    // Cheat UI state
    cheatTargetMode: null as null | "love" | "hate",
  });

  const game = reactive<CourtGameState>({
    bench: [],
    currentCase: null,
    playerSide: null,
    chiefJusticeId: null,
    chiefJusticeHardened: false,
    // Card pools
    deck: [],
    discardPile: [],
    playbook: [],
    claimedCards: [],
    // Turn state
    currentTurn: "player",
    round: 1,
    totalRounds: gameSettings.numberOfRounds,
    // Targeting
    selectedTacticId: null,
    claimingMode: false,
    claimedSelections: [],
    // Justice state
    leanings: {},
    susceptibilityMods: {},
    playerShields: [],
    opponentShields: [],
    recusedJustices: [],
    // Trial-scoped state for new cards
    nappingJustices: {},
    statMods: {},
    weaknessMods: {},
    religionOverrides: {},
    multiTargetMode: false,
    multiTargetSelections: [],
    multiTargetTacticId: null,
    // Campaign trial-scoped
    makeChiefPlayedThisTrial: false,
    suggestRetirementTargets: [],
    keepCrownActivated: false,
  });

  // ── Campaign state — null when not in campaign mode ───────────
  const campaign = reactive<{ data: CampaignState | null }>({ data: null });

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
  // partiesAligned / partiesOpposed are imported from _tacticEffects.ts

  function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
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

  /** Build a tactic deck, respecting cheat ordering when cheats are active. */
  function buildCheatDeck(pool: Tactic[]): Tactic[] {
    if (!cheatsActive || cheats.shuffleTactics) return shuffle(pool);
    const ordered = cheats.tacticOrder.map((id) => pool.find((t) => t.id === id)).filter((t): t is Tactic => !!t);
    const rest = shuffle(pool.filter((t) => !cheats.tacticOrder.includes(t.id)));
    return [...ordered, ...rest];
  }

  function drawCard(): Tactic | null {
    if (game.deck.length === 0) {
      if (game.discardPile.length === 0) return null;
      game.deck = buildCheatDeck([...game.discardPile]);
      game.discardPile = [];
    }
    return game.deck.shift() ?? null;
  }

  // Remove a card from the playbook, add it to discard, draw a replacement.
  // Draw BEFORE pushing to discard so reshuffle doesn't immediately re-draw the same card.
  function removeFromPlaybook(tactic: Tactic): void {
    game.playbook = game.playbook.filter((t) => t.id !== tactic.id);
    game.discardPile.push(tactic);
    // Delay draw so the leave animation completes before the enter animation starts.
    setTimeout(() => {
      const drawn = drawCard();
      if (drawn) game.playbook.push(drawn);
    }, 320);
  }

  // ── localStorage: first-play tracking ────────────────────────
  function hasPlayedQuickplay(): boolean {
    return localStorage.getItem("hasPlayedQuickplay") === "true";
  }
  function hasPlayedCurrentCourt(): boolean {
    return localStorage.getItem("hasPlayedCurrentCourt") === "true";
  }
  function markPlayedQuickplay(): void {
    localStorage.setItem("hasPlayedQuickplay", "true");
  }
  function markPlayedCurrentCourt(): void {
    localStorage.setItem("hasPlayedCurrentCourt", "true");
  }

  // ─── Game Management ─────────────────────────────────────────

  function selectCourtMode(mode: CourtMode | string | null): void {
    if (!mode) return;
    ui.previewPresetId = null;
    ui.courtMode = mode as CourtMode;
    if (ui.courtMode === "current") markPlayedCurrentCourt();
    dealGame();
  }

  function resetToTitle(): void {
    ui.phase = "title";
    ui.isCampaignMode = false;
    campaign.data = null;
    caseHistory.splice(0);
  }

  function resetToCourtSelect(): void {
    ui.phase = "courtSelect";
  }

  const allJustices = computed(() => [
    ...justiceCurrent,
    ...justiceHistorical,
    ...justiceFictional,
    ...justiceCelebrity,
    ...justiceWarrenExtra,
    ...justiceLochnerExtra,
  ]);

  const historicalPresets = computed(() => presetBenchConfigs.filter((b) => ["current", "warren-court", "lochner-era"].includes(b.id)));
  const fictionalPresets = computed(() => presetBenchConfigs.filter((b) => !["current", "warren-court", "lochner-era"].includes(b.id)));

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

    const presetConfig = presetBenchConfigs.find((b) => b.id === mode);
    if (presetConfig) {
      pool = presetConfig.justiceIds.map((id) => allJustices.value.find((j) => j.id === id)).filter((j): j is Justice => !!j);
      chiefId = presetConfig.chiefJusticeId;
    } else if (mode === "current") {
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
      pool = shuffle([...allJustices.value]).slice(0, 9);
      chiefId = pool[Math.floor(Math.random() * pool.length)].id;
    }

    game.bench = pool;
    game.chiefJusticeId = chiefId;
    game.chiefJusticeHardened = hardened;
    // Select a case from the appropriate pool based on court mode
    let casePool: typeof allCases;
    if (presetConfig) {
      casePool = presetConfig.casePool === "historical" ? casesHistorical : presetConfig.casePool === "fictional" ? casesFictional : allCases;
    } else if (mode === "current" || mode === "historical") {
      casePool = casesHistorical;
    } else if (mode === "fantasy") {
      casePool = casesFictional;
    } else {
      // chaos: any case
      casePool = allCases;
    }
    game.currentCase = casePool[Math.floor(Math.random() * casePool.length)];
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
  }

  function chooseSide(side: Side): void {
    game.playerSide = side;
  }

  function startArguments(): void {
    // Campaign-only tactics only enter the deck in campaign mode
    const deckPool = ui.isCampaignMode ? [...allTactics] : allTactics.filter((t) => !t.campaignOnly);
    game.deck = buildCheatDeck(deckPool);
    game.playbook = [];
    for (let i = 0; i < 5; i++) {
      const card = drawCard();
      if (card) game.playbook.push(card);
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

    // Deselect multi-target mode if player clicks the active card again
    if (game.multiTargetMode && game.multiTargetTacticId === tacticId) {
      game.multiTargetMode = false;
      game.multiTargetSelections = [];
      game.multiTargetTacticId = null;
      return;
    }

    const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === tacticId);
    if (!tactic) return;

    if (
      tactic.effectType === "sway-all" ||
      tactic.effectType === "susceptibility" ||
      tactic.effectType === "discard-all" ||
      tactic.effectType === "insult-chief" ||
      tactic.effectType === "presidential-call" ||
      tactic.effectType === "saint-patricks" ||
      tactic.effectType === "keep-crown"
    ) {
      applyTactic(tactic, null, "player");
    } else if (tactic.effectType === "claim-two") {
      if (game.claimedCards.length > 0) return; // already have dibs
      // Remove dibs card WITHOUT drawing a replacement yet; player picks from the 4 remaining
      game.playbook = game.playbook.filter((t) => t.id !== tactic.id);
      game.discardPile.push(tactic);
      game.claimingMode = true;
      game.claimedSelections = [];
    } else if (tactic.effectType === "betray-friend") {
      // Disabled unless at least one justice is Strongly For (leaning >= 60)
      const hasStrongAlly = game.bench.some((j) => (game.leanings[j.id] ?? 0) >= 60);
      if (!hasStrongAlly) return;
      game.selectedTacticId = game.selectedTacticId === tacticId ? null : tacticId;
    } else if (tactic.effectType === "swap-clerks" || tactic.effectType === "hire-pi") {
      // Enter multi-target mode: player must click 2 justices
      if (game.multiTargetMode) return; // already in multi-target mode for another card
      game.selectedTacticId = null;
      game.multiTargetTacticId = tactic.id;
      game.multiTargetMode = true;
      game.multiTargetSelections = [];
    } else {
      // sway-one, shield, encourage-nap, justice-cocktails, invite-church, recuse, make-chief, suggest-retirement: select then click a justice
      game.selectedTacticId = game.selectedTacticId === tacticId ? null : tacticId;
    }
  }

  function finalizeClaim(): void {
    const claimed = game.playbook.filter((t) => game.claimedSelections.includes(t.id));
    game.playbook = game.playbook.filter((t) => !game.claimedSelections.includes(t.id));
    game.claimedCards.push(...claimed);
    // Draw 1 card after a delay so the claim-move animation completes first.
    setTimeout(() => {
      const drawn = drawCard();
      if (drawn) game.playbook.push(drawn);
    }, 320);
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
    const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === game.selectedTacticId);
    if (!tactic) return;
    // Shield must target an ally (leaning > 0)
    if (tactic.effectType === "shield" && (game.leanings[justice.id] ?? 0) <= 0) return;
    // Betray-friend must target a STRONGLY FOR justice (leaning >= 60)
    if (tactic.effectType === "betray-friend" && (game.leanings[justice.id] ?? 0) < 60) return;
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
    // Cheat: MAKE LOVE / MAKE HATE targeting mode
    if (cheatsActive && ui.cheatTargetMode && ui.phase === "playing") {
      game.leanings[justice.id] = ui.cheatTargetMode === "love" ? 100 : -100;
      ui.cheatTargetMode = null;
      return;
    }

    if (ui.phase === "setup") {
      ui.detailJustice = justice;
      return;
    }
    if (ui.phase !== "playing" || ui.opponentThinking) return;

    // Multi-target mode (swap-clerks, hire-pi): collect 2 justice ids then fire
    if (game.multiTargetMode && game.currentTurn === "player") {
      const idx = game.multiTargetSelections.indexOf(justice.id);
      if (idx !== -1) {
        game.multiTargetSelections.splice(idx, 1);
      } else {
        game.multiTargetSelections.push(justice.id);
        if (game.multiTargetSelections.length === 2) {
          const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === game.multiTargetTacticId);
          if (tactic) applyTactic(tactic, null, "player");
        }
      }
      return;
    }

    if (game.selectedTacticId !== null && game.currentTurn === "player") {
      const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === game.selectedTacticId);
      // Invalid target conditions → open detail instead
      if (!tactic) {
        ui.detailJustice = justice;
        return;
      }
      if (tactic.effectType === "shield" && (game.leanings[justice.id] ?? 0) <= 0) {
        ui.detailJustice = justice;
        return;
      }
      if (tactic.effectType === "betray-friend" && (game.leanings[justice.id] ?? 0) < 60) {
        ui.detailJustice = justice;
        return;
      }
      ui.targetingChoice = justice;
    } else {
      ui.detailJustice = justice;
    }
  }

  // ─── Apply Tactic ────────────────────────────────────────────
  // All effect logic lives in _tacticEffects.ts; this function is a thin dispatcher.

  function applyTactic(tactic: Tactic, targetJustice: Justice | null, actor: TurnActor): void {
    const outcome: EffectOutcome = resolveEffect(game, tactic, targetJustice, actor, { drawCard, removeFromPlaybook });

    courtReport.plays.push({
      actor,
      tacticName: tactic.name,
      cardType: tactic.cardType,
      targetName: outcome.reportTarget,
      results: outcome.results.filter((r) => r.change !== 0),
      round: game.round,
    });

    const feedback = outcome.overrideFeedback ?? tactic.feedback ?? null;

    toast(
      {
        component: TacticToast,
        props: {
          actor,
          tacticName: tactic.name,
          results: outcome.results.map((r) => ({ justiceName: r.justiceName, change: r.change, isKnockon: r.isKnockon })),
          feedback,
        },
      },
      {
        position: POSITION.BOTTOM_RIGHT,
        timeout: uiSettings.toastDuration === 0 ? false : uiSettings.toastDuration,
        toastClassName: `court-toast court-toast--${actor}`,
      },
    );

    if (actor === "player") {
      endPlayerTurn();
    } else {
      endOpponentTurn();
    }

    // Purge the Record clears all 5 cards before drawing replacements.
    // Stagger the draws so each new card enters one at a time after the leave animation.
    if (outcome.pendingRedraws) {
      const count = outcome.pendingRedraws;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const drawn = drawCard();
          if (drawn) game.playbook.push(drawn);
        }, 350 + i * 70);
      }
    }
  }

  // ─── Turn Management ─────────────────────────────────────────

  function endPlayerTurn(): void {
    // Double Tap reward card: player gets an extra action this turn
    if (campaign.data?.doubleTapActive) {
      campaign.data.doubleTapActive = false;
      return; // stay on player's turn
    }

    // Shields are consumed on contact (in resolveEffect), not cleared wholesale here
    game.currentTurn = "opponent";
    ui.opponentThinking = true;

    // Simulate opponent browsing the Docket for 4-6 seconds
    const thinkTime = 4000 + Math.random() * 2000;
    const browseInterval = 650;
    let elapsed = 0;

    const browseTimer = setInterval(() => {
      elapsed += browseInterval;
      const available = game.playbook.filter((t) => t.effectType !== "claim-two");
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
    // Opponent draws only from the playbook (not claimed cards); skip campaign-only tactics
    const available = game.playbook.filter((t) => t.effectType !== "claim-two" && t.effectType !== "suggest-retirement" && t.effectType !== "keep-crown");
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
      tactic.effectType === "presidential-call" ||
      tactic.effectType === "saint-patricks"
    ) {
      applyTactic(tactic, null, "opponent");
      return;
    }

    // New single-target utility cards: target the most favorable-to-player justice
    if (tactic.effectType === "encourage-nap" || tactic.effectType === "justice-cocktails") {
      const unblocked = game.bench.filter((j) => !(j.id in game.nappingJustices) && !game.playerShields.includes(j.id));
      const target = unblocked.sort((a, b) => (game.leanings[b.id] ?? 0) - (game.leanings[a.id] ?? 0))[0];
      if (!target) {
        endOpponentTurn();
        return;
      }
      applyTactic(tactic, target, "opponent");
      return;
    }

    // Dual-target cards: opponent picks 2 random justices
    if (tactic.effectType === "swap-clerks" || tactic.effectType === "hire-pi") {
      const shuffled = shuffle([...game.bench]);
      if (shuffled.length < 2) {
        endOpponentTurn();
        return;
      }
      game.multiTargetMode = true;
      game.multiTargetTacticId = tactic.id;
      game.multiTargetSelections = [shuffled[0].id, shuffled[1].id];
      applyTactic(tactic, null, "opponent");
      return;
    }

    // Cards with complex targeting that opponent skips (falls back to another card)
    if (tactic.effectType === "betray-friend" || tactic.effectType === "invite-church") {
      const fallback = available.filter((t) => !["betray-friend", "invite-church", "claim-two", "make-chief"].includes(t.effectType));
      if (!fallback.length) {
        endOpponentTurn();
        return;
      }
      applyTactic(fallback[Math.floor(Math.random() * fallback.length)], null, "opponent");
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
    // Wake up any justices whose nap ends this round and give them a well-rested bonus
    for (const [idStr, napRound] of Object.entries(game.nappingJustices)) {
      if (napRound <= game.round) {
        const id = Number(idStr);
        delete game.nappingJustices[id];
        const old = game.leanings[id] ?? 0;
        game.leanings[id] = Math.min(100, old + 15);
      }
    }
    // Shields are consumed on contact (in resolveEffect), not cleared here
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

  // True when at least one bench justice is Strongly For (leaning >= 60) — gates Betray Your Friend
  const hasStrongAlly = computed(() => game.bench.some((j) => (game.leanings[j.id] ?? 0) >= 60));

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
    return { forCount, againstCount, abstainCount, won: forCount > againstCount, tied: forCount === againstCount };
  });

  // ── Campaign composable (must come after `verdict` is defined) ──
  const {
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
  } = useCampaignManager(game, campaign, ui, verdict, courtReport, shuffle);

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
        "discard-all": "🗑️ Playbook",
        "claim-two": "🗑️ Playbook",
        "make-chief": "👑 Chief Justice",
        "insult-chief": "👑 Chief Justice",
        "presidential-call": "📞 All justices",
        recuse: "🔕 Single target",
        "betray-friend": "🗡️ Strongly For only",
        "swap-clerks": "🔄 Two justices",
        "encourage-nap": "💤 Single target",
        "justice-cocktails": "🍸 Single target",
        "hire-pi": "🔍 Two justices",
        "saint-patricks": "☘️ All justices",
        "invite-church": "⛪ Single target",
        "suggest-retirement": "🏖️ Single target",
        "keep-crown": "👑 Chief Justice",
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

  // ─── Verdict computeds ───────────────────────────────────────

  const verdictSections = computed(() => {
    if (!verdict.value || !game.bench.length) return [];
    const t = gameSettings.abstentionThreshold;
    const forJustices = game.bench.filter((j) => (game.leanings[j.id] ?? 0) > t);
    const againstJustices = game.bench.filter((j) => (game.leanings[j.id] ?? 0) < -t);
    const abstainJustices = game.bench.filter((j) => {
      const l = game.leanings[j.id] ?? 0;
      return l >= -t && l <= t;
    });
    const sections = [
      { label: "Votes For", justices: forJustices, type: "for" as const },
      { label: "Votes Against", justices: againstJustices, type: "against" as const },
      { label: "Abstaining", justices: abstainJustices, type: "abstain" as const },
    ].filter((s) => s.justices.length > 0);
    // If player lost (not tied), put the "against" section first
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
    return abstainCount > 0 ? `${forCount}\u2013${againstCount}\u2013${abstainCount}` : `${forCount}\u2013${againstCount}`;
  });

  // Maps justice id → list of plays that directly targeted them (by name match)
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

  function verdictJusticeBarStyle(justice: Justice): Record<string, string> {
    const leaning = game.leanings[justice.id] ?? 0;
    const pct = Math.abs(leaning);
    const color = leaning > gameSettings.abstentionThreshold ? "#2a7a3a" : leaning < -gameSettings.abstentionThreshold ? "#8b2020" : "#5a4a3a";
    return { width: `${pct}%`, backgroundColor: color };
  }

  const chiefJustice = computed(() => game.bench.find((j) => j.id === game.chiefJusticeId) ?? null);

  const benchLabel = computed(() => {
    if (!chiefJustice.value) return "The Bench";
    // For preset modes (except 'current'), use the preset's display name
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

  function voteLabel(leaning: number): string {
    const t = gameSettings.abstentionThreshold;
    if (leaning >= 60) return "Strongly For";
    if (leaning > t) return "Leaning For";
    if (leaning >= -t) return "Undecided";
    if (leaning > -60) return "Leaning Against";
    return "Strongly Against";
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
    else if (justice.weaknesses.blackmail <= 2) hints.push("🩻 Difficult to blackmail");
    if (justice.weaknesses.threats >= 7) hints.push("😰 Unnerved by pressure");
    else if (justice.weaknesses.threats <= 2) hints.push("🦁 Nearly impossible to threaten");
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
    ui.phase = "title";
  });
</script>
<template lang="pug" src="./Court.pug"></template>

<style lang="scss" src="./Court.scss"></style>
