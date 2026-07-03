<script setup lang="ts">
  import { reactive, ref, computed, onMounted } from "vue";
  import { POSITION } from "vue-toastification";
  import { useClientToast } from "@/shared/ts/_useClientToast";
  import TacticToast from "./components/TacticToast.vue";
  import LemonToast from "./components/LemonToast.vue";
  import {
    currentJustices,
    historicalJustices,
    fictionalJustices,
    celebrityJustices,
    presetBenchConfigs,
  } from "./ts/justices";
  import { cases as allCases, casesHistorical, casesFictional } from "./ts/_cases";
  import { tactics as allTactics } from "./ts/_tactics";
  import type { Justice, Case, Tactic, CourtGameState, CampaignState, President, StanceType } from "./ts/_types";
  import { resolveEffect, partiesAligned, partiesOpposed } from "./ts/_tacticEffects";
  import type { EffectOutcome } from "./ts/_tacticEffects";
  import { settings, gameSettings, uiSettings, difficultySettings, cheatsActive } from "./ts/_settings";
  import { campaignSetups } from "./ts/_campaigns";
  import { rewardCards } from "./ts/_rewards";
  import { useCampaignManager } from "./ts/_campaignManager";
  import { playJusticeVoice, playKavanaughBeer } from "./ts/_sounds";
  import { getAttackedJusticeNamesForPlay } from "./ts/_statsHelpers";
  import { useCourtComputeds } from "./ts/_useCourtComputeds";
  import { useCourtHelpers, getKeyStats, justiceTypeLabel, sideStanceTags, targetLabel, voteLabel, justiceImageUrl, presidentImageUrl, justiceHints } from "./ts/_useCourtHelpers";
  import { useCourtTurns } from "./ts/_useCourtTurns";
  import { useCourtLectern, type InitiateResult } from "./ts/_useCourtLectern";
  import { useCourtStats } from "./ts/_useCourtStats";

  // ── Game settings ──────────────────────────────────────────

  // Toasts (client-only plugin). Stub on the server so any accidental call is a
  // no-op during prerender. POSITION is used as a toast option throughout, so it
  // must resolve in both environments — vue-toastification is in nuxt.config
  // build.transpile so its named exports work under SSR.
  const toast = useClientToast();
  const trialAttackedJustices = new Set<string>();
  let campaignEndLogged = false;
  let byLemonJinglePlayed = false;
  let byLemonToastShown = false;

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
    opponentHighlightedCardId: null as number | null,
    detailJustice: null as Justice | null,
    detailPresident: null as President | null,
    targetingChoice: null as Justice | null,
    previewPresetId: null as string | null,
    isCampaignMode: false,
    campaignSetupId: null as number | null,
    rewardTargetJustice: null as number | null,
    rewardEligibleTarget: null as number | null,
    activatingRewardId: null as string | null,
    cheatTargetMode: null as null | "love" | "hate",
  });

  const game = reactive<CourtGameState>({
    bench: [],
    currentCase: null,
    playerSide: null,
    chiefJusticeId: null,
    chiefJusticeHardened: false,
    deck: [],
    discardPile: [],
    playbook: [],
    claimedCards: [],
    currentTurn: "player",
    round: 1,
    totalRounds: gameSettings.numberOfRounds,
    selectedTacticId: null,
    claimingMode: false,
    claimedSelections: [],
    leanings: {},
    susceptibilityMods: {},
    playerShields: [],
    opponentShields: [],
    recusedJustices: [],
    nappingJustices: {},
    yogaJustices: {},
    draggedJustices: [],
    statMods: {},
    weaknessMods: {},
    religionOverrides: {},
    multiTargetMode: false,
    multiTargetSelections: [],
    multiTargetTacticId: null,
    makeChiefPlayedThisTrial: false,
    suggestRetirementTargets: [],
    keepCrownActivated: false,
    reframeStanceMode: false,
    reframeStanceChoices: [] as StanceType[],
    reframeStanceTacticId: null as number | null,
    reframeStanceSelection: null as StanceType | null,
    lecternMode: false,
    lecternBoostPending: false,
    lecternBlindTacticId: null as number | null,
  });

  const campaign = reactive<{ data: CampaignState | null }>({ data: null });

  const courtReport = reactive({
    plays: [] as Array<{
      actor: TurnActor;
      tacticName: string;
      cardType: string;
      targetName: string;
      results: { justiceName: string; change: number }[];
      round: number;
      viaLectern?: boolean; // played blind via "Go To The Lectern Without Notes"
    }>,
  });

  const caseHistory = reactive<
    Array<{
      caseName: string;
      votes: Record<number, boolean>;
    }>
  >([]);

  // ─── Helpers ─────────────────────────────────────────────────

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

    const STANCE_PER_MATCH = 8;
    const playerSideStances = game.playerSide === "prosecution" ? game.currentCase.prosecution.stances : game.currentCase.defendant.stances;

    let stanceScore = 0;

    if (justice.stances && playerSideStances) {
      for (const { topic, position } of justice.stances) {
        const casePosition = playerSideStances[topic];
        if (!casePosition || casePosition === "Neutral") continue;
        if (position === "Neutral") {
          stanceScore += casePosition === "For" ? STANCE_PER_MATCH / 2 : -(STANCE_PER_MATCH / 2);
        } else if (position === casePosition) {
          stanceScore += STANCE_PER_MATCH;
        } else {
          stanceScore -= STANCE_PER_MATCH;
        }
      }
    }

    const president = justice.nominatedBy;
    if (president?.stances && playerSideStances) {
      const loyaltyFactor = justice.stats.partyLoyalty / 10;
      for (const { topic, position } of president.stances) {
        const casePosition = playerSideStances[topic];
        if (!casePosition || casePosition === "Neutral" || position === "Neutral") continue;
        const basePoints = position === casePosition ? STANCE_PER_MATCH : -STANCE_PER_MATCH;
        stanceScore += Math.round(basePoints * loyaltyFactor * 0.5);
      }
    }

    const playerParty = game.playerSide === "prosecution" ? game.currentCase.prosecution.favoredBy : game.currentCase.defendant.favoredBy;
    const justiceParty = justice.nominatedBy?.party;
    let partyScore = 0;
    if (partiesAligned(playerParty, justiceParty)) partyScore = Math.ceil(justice.stats.partyLoyalty * 2.5);
    if (partiesOpposed(playerParty, justiceParty)) partyScore = -Math.ceil(justice.stats.partyLoyalty * 2.5);

    const clampedLoyalty = Math.max(0, Math.min(10, justice.stats.partyLoyalty));
    const loyaltyVarianceFactor = 0.4 + (10 - clampedLoyalty) * 0.1;
    const varianceRange = Math.max(0, difficultySettings.startingVariance) * loyaltyVarianceFactor;
    const seed = Math.imul(justice.id + 11, game.currentCase.id + 37) >>> 0;
    const normalized = (seed % 1000) / 999;
    const centered = normalized * 2 - 1;
    const varianceScore = Math.round(centered * varianceRange);

    return Math.max(-100, Math.min(100, stanceScore + partyScore + varianceScore));
  }

  // ─── Deck Management ─────────────────────────────────────────

  function buildCheatDeck(pool: Tactic[]): Tactic[] {
    if (!cheatsActive || settings.cheats.shuffleTactics) return shuffle(pool);
    const ordered = settings.cheats.tacticOrder.map((id) => pool.find((t) => t.id === id)).filter((t): t is Tactic => !!t);
    const rest = shuffle(pool.filter((t) => !settings.cheats.tacticOrder.includes(t.id)));
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

  function removeFromPlaybook(tactic: Tactic): void {
    game.playbook = game.playbook.filter((t) => t.id !== tactic.id);
    game.discardPile.push(tactic);
    setTimeout(() => {
      const drawn = drawCard();
      if (drawn) game.playbook.push(drawn);
    }, 320);
  }

  // ── localStorage: first-play tracking ────────────────────────
  // These are read from the court-select template's v-if, which prerenders. To
  // avoid a hydration mismatch (server has no localStorage, a returning player's
  // client does), back them with refs that stay false until onMounted reads
  // localStorage on the client — so the server render and the client's first
  // render agree, then the real values apply post-hydration.
  const playedQuickplay = ref(false);
  const playedCurrentCourt = ref(false);
  function hasPlayedQuickplay(): boolean {
    return playedQuickplay.value;
  }
  function hasPlayedCurrentCourt(): boolean {
    return playedCurrentCourt.value;
  }
  function markPlayedQuickplay(): void {
    if (!import.meta.client) return;
    localStorage.setItem("hasPlayedQuickplay", "true");
    playedQuickplay.value = true;
  }
  function markPlayedCurrentCourt(): void {
    if (!import.meta.client) return;
    localStorage.setItem("hasPlayedCurrentCourt", "true");
    playedCurrentCourt.value = true;
  }

  // ─── Lemon Moment ────────────────────────────────────────────

  function triggerLemonMomentIfDue(): void {
    const midRound = Math.ceil(gameSettings.numberOfRounds / 2);
    if (game.round < midRound || byLemonToastShown) return;
    byLemonToastShown = true;
    if (!byLemonJinglePlayed) {
      byLemonJinglePlayed = true;
      const jingle = new Audio("/audio/bylemon.mp3");
      jingle.volume = 0.6;
      void jingle.play();
    }
    toast(
      { component: LemonToast },
      {
        toastClassName: "site-by-lemon",
        icon: false,
        timeout: 6000,
        showCloseButtonOnHover: false,
        closeButtonClassName: "close-toast",
      },
    );
  }

  // ─── Computed Values (composable) ────────────────────────────
  // Created first so `verdict` is available to the stats composable below.

  const {
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
  } = useCourtComputeds({ game, ui, courtReport });

  // ─── Firestore Stats (composable) ────────────────────────────

  const stats = useCourtStats({ game, verdict, trialAttackedJustices });

  // ─── Turn Management (composable) ────────────────────────────
  // applyTactic is a function declaration and is hoisted, so the closure below resolves correctly.

  const { endPlayerTurn, endOpponentTurn, getEligibleMultiTargetJustices } = useCourtTurns(
    game,
    campaign,
    ui,
    {
      trackTrialVerdictStats: stats.trackTrialVerdictStats,
      applyTactic: (t, j, a) => applyTactic(t, j, a),
      shuffle,
      triggerLemonMomentIfDue,
    },
  );

  // ─── Go To The Lectern Without Notes (composable) ────────────

  const { enterLecternMode, chooseLecternCard, applyLecternBoost } = useCourtLectern(game, {
    drawCard,
    removeFromPlaybook,
    shuffle,
    endPlayerTurn,
    initiateTactic: (tactic) => initiateTactic(tactic),
    recordPlay: (play) => courtReport.plays.push(play),
  });

  // ─── UI Helpers (composable) ─────────────────────────────────

  const { voteMeterStyle, verdictJusticeBarStyle, justiceVoteHistory } = useCourtHelpers(game, caseHistory);

  // True whenever the hand should be shown face-down: while picking a blind card, and while a
  // committed blind card still awaits its target (so the unchosen cards can't be deduced).
  const lecternConcealed = computed(() => game.lecternMode || game.lecternBlindTacticId !== null);

  // Justices that the currently-staged tactic cannot legally target. The bench dims these and
  // makes them non-interactive so it's obvious where an argument can (and can't) land — rather
  // than silently doing nothing when an invalid justice is clicked.
  const untargetableJusticeIds = computed<Set<number>>(() => {
    const blocked = new Set<number>();

    if (game.selectedTacticId !== null) {
      const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === game.selectedTacticId);
      if (tactic?.effectType === "shield") {
        // Shield protects an ally — only justices already leaning your way are valid.
        game.bench.forEach((j) => (game.leanings[j.id] ?? 0) <= 0 && blocked.add(j.id));
      } else if (tactic?.effectType === "betray-friend") {
        // Betray needs a Strongly For justice (≥ 60) to sacrifice.
        game.bench.forEach((j) => (game.leanings[j.id] ?? 0) < 60 && blocked.add(j.id));
      }
      return blocked;
    }

    if (game.multiTargetMode) {
      const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === game.multiTargetTacticId) ?? null;
      const eligible = new Set(getEligibleMultiTargetJustices(tactic).map((j) => j.id));
      game.bench.forEach((j) => !eligible.has(j.id) && blocked.add(j.id));
    }

    return blocked;
  });

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

  function dealGame(): void {
    if (game.currentCase && game.bench.length && (ui.phase === "playing" || ui.phase === "verdict")) {
      const votes: Record<number, boolean> = {};
      game.bench.forEach((j) => {
        votes[j.id] = (game.leanings[j.id] ?? 0) > 0;
      });
      caseHistory.push({ caseName: game.currentCase.name, votes });
    }

    const mode = ui.courtMode ?? "current";
    let pool: Justice[];
    let chiefId: number | null = null;
    let hardened = true;

    const presetConfig = presetBenchConfigs.find((b) => b.id === mode);
    if (presetConfig) {
      pool = presetConfig.justiceIds.map((id) => allJustices.value.find((j) => j.id === id)).filter((j): j is Justice => !!j);
      chiefId = presetConfig.chiefJusticeId;
    } else if (mode === "current") {
      pool = [...currentJustices];
      chiefId = 1;
    } else if (mode === "historical") {
      pool = shuffle([...currentJustices, ...historicalJustices]).slice(0, 9);
      chiefId = pool[Math.floor(Math.random() * pool.length)].id;
    } else if (mode === "fantasy") {
      pool = shuffle([...fictionalJustices, ...celebrityJustices]).slice(0, 9);
      chiefId = pool[Math.floor(Math.random() * pool.length)].id;
    } else {
      pool = shuffle([...allJustices.value]).slice(0, 9);
      chiefId = pool[Math.floor(Math.random() * pool.length)].id;
    }

    game.bench = pool;
    game.chiefJusticeId = chiefId;
    game.chiefJusticeHardened = hardened;

    let casePool: typeof allCases;
    if (presetConfig) {
      casePool = presetConfig.casePool === "historical" ? casesHistorical : presetConfig.casePool === "fictional" ? casesFictional : allCases;
    } else if (mode === "current" || mode === "historical") {
      casePool = casesHistorical;
    } else if (mode === "fantasy") {
      casePool = casesFictional;
    } else {
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
    byLemonToastShown = false;
    game.leanings = {};
    game.susceptibilityMods = {};
    game.playerShields = [];
    game.opponentShields = [];
    game.recusedJustices = [];
    game.nappingJustices = {};
    game.yogaJustices = {};
    game.draggedJustices = [];
    game.statMods = {};
    game.weaknessMods = {};
    game.religionOverrides = {};
    game.multiTargetMode = false;
    game.multiTargetSelections = [];
    game.multiTargetTacticId = null;
    game.makeChiefPlayedThisTrial = false;
    game.suggestRetirementTargets = [];
    game.keepCrownActivated = false;
    game.reframeStanceMode = false;
    game.reframeStanceChoices = [];
    game.reframeStanceTacticId = null;
    game.reframeStanceSelection = null;
    game.lecternMode = false;
    game.lecternBoostPending = false;
    game.lecternBlindTacticId = null;
    trialAttackedJustices.clear();
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
    const hasTrumpNominee = game.bench.some((j) => j.nominatedBy?.name === "Donald Trump");
    let deckPool = ui.isCampaignMode ? [...allTactics] : allTactics.filter((t) => !t.campaignOnly);
    if (!hasTrumpNominee) deckPool = deckPool.filter((t) => !t.requiresTrumpNominee);
    game.deck = buildCheatDeck(deckPool);
    game.playbook = [];
    for (let i = 0; i < difficultySettings.handSize; i++) {
      const card = drawCard();
      if (card) game.playbook.push(card);
    }
    game.bench.forEach((j) => {
      game.leanings[j.id] = getInitialLeaning(j);
      game.susceptibilityMods[j.id] = 0;
    });
    trialAttackedJustices.clear();
    ui.phase = "playing";
    if (!ui.isCampaignMode) {
      void stats.trackQuickplayStarted();
    }
  }

  function retrySameCase(): void {
    const hasTrumpNominee = game.bench.some((j) => j.nominatedBy?.name === "Donald Trump");
    let deckPool = allTactics.filter((t) => !t.campaignOnly);
    if (!hasTrumpNominee) deckPool = deckPool.filter((t) => !t.requiresTrumpNominee);
    game.deck = buildCheatDeck(deckPool);
    game.playbook = [];
    for (let i = 0; i < difficultySettings.handSize; i++) {
      const card = drawCard();
      if (card) game.playbook.push(card);
    }
    game.bench.forEach((j) => {
      game.leanings[j.id] = getInitialLeaning(j);
      game.susceptibilityMods[j.id] = 0;
    });
    trialAttackedJustices.clear();
    game.selectedTacticId = null;
    game.currentTurn = "player";
    game.round = 1;
    byLemonToastShown = false;
    game.playerShields = [];
    game.opponentShields = [];
    game.nappingJustices = {};
    game.recusedJustices = [];
    game.reframeStanceMode = false;
    game.reframeStanceChoices = [];
    game.reframeStanceTacticId = null;
    game.reframeStanceSelection = null;
    ui.phase = "playing";
  }

  // ─── Tactic Selection ────────────────────────────────────────

  function clearMultiTargetMode(): void {
    game.multiTargetMode = false;
    game.multiTargetSelections = [];
    game.multiTargetTacticId = null;
  }

  function selectTactic(tacticId: number): void {
    if (game.currentTurn !== "player" || ui.opponentThinking) return;

    // While at the lectern, every click is a blind pick — route it through the lectern handler.
    if (game.lecternMode) {
      chooseLecternCard(tacticId);
      return;
    }

    if (game.claimingMode) {
      // The Lectern card can't be claimed — it's a blind gamble, not a stashable tactic.
      const clicked = game.playbook.find((t) => t.id === tacticId);
      if (clicked?.effectType === "lectern-without-notes") return;
      const idx = game.claimedSelections.indexOf(tacticId);
      if (idx !== -1) {
        game.claimedSelections.splice(idx, 1);
      } else if (game.claimedSelections.length < 2) {
        game.claimedSelections.push(tacticId);
        if (game.claimedSelections.length === 2) finalizeClaim();
      }
      return;
    }

    // A blind card is committed and awaiting its target — it's locked in. No deselecting,
    // no swapping to another card. Committing blind is the whole risk; you can't wriggle out.
    if (game.lecternBlindTacticId !== null) return;

    if (game.multiTargetMode && game.multiTargetTacticId === tacticId) {
      clearMultiTargetMode();
      return;
    }

    const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === tacticId);
    if (!tactic) return;

    initiateTactic(tactic);
  }

  function initiateTactic(tactic: Tactic): InitiateResult {
    if (tactic.effectType === "lectern-without-notes") {
      enterLecternMode(tactic);
      return "lectern";
    }

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
      tactic.effectType === "gift-boxes" ||
      tactic.effectType === "keep-crown" ||
      tactic.effectType === "fog-machine" ||
      tactic.effectType === "alien-abduction" ||
      tactic.effectType === "mess-calendar" ||
      tactic.effectType === "international-law"
    ) {
      applyTactic(tactic, null, "player");
      return "resolved";
    } else if (tactic.effectType === "claim-two") {
      if (game.claimedCards.length > 0) return "blocked";
      game.playbook = game.playbook.filter((t) => t.id !== tactic.id);
      game.discardPile.push(tactic);
      game.claimingMode = true;
      game.claimedSelections = [];
      return "targeting";
    } else if (tactic.effectType === "betray-friend") {
      const hasStrongAllyNow = game.bench.some((j) => (game.leanings[j.id] ?? 0) >= 60);
      if (!hasStrongAllyNow) return "blocked";
      game.selectedTacticId = game.selectedTacticId === tactic.id ? null : tactic.id;
      return "targeting";
    } else if (tactic.effectType === "swap-clerks") {
      if (game.multiTargetMode) return "targeting";
      const eligibleMultiTargetJustices = getEligibleMultiTargetJustices(tactic);
      if (eligibleMultiTargetJustices.length < 2) return "blocked";
      game.selectedTacticId = null;
      game.multiTargetTacticId = tactic.id;
      game.multiTargetMode = true;
      game.multiTargetSelections = [];
      return "targeting";
    } else if (tactic.effectType === "reframe-debate") {
      if (game.reframeStanceMode) return "targeting";
      const allBenchStances = new Set<StanceType>();
      game.bench.forEach((j) => j.stances?.forEach((s) => allBenchStances.add(s.topic)));
      if (allBenchStances.size === 0) return "blocked";
      const shuffledStances = shuffle([...allBenchStances]);
      game.reframeStanceChoices = shuffledStances.slice(0, 3) as StanceType[];
      game.reframeStanceTacticId = tactic.id;
      game.reframeStanceMode = true;
      return "targeting";
    } else {
      game.selectedTacticId = game.selectedTacticId === tactic.id ? null : tactic.id;
      return "targeting";
    }
  }

  function finalizeClaim(): void {
    const claimed = game.playbook.filter((t) => game.claimedSelections.includes(t.id));
    game.playbook = game.playbook.filter((t) => !game.claimedSelections.includes(t.id));
    game.claimedCards.push(...claimed);
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
      viaLectern: game.lecternBlindTacticId !== null,
    });
    game.claimingMode = false;
    game.claimedSelections = [];
    // Dibs moves no leanings, so a pending lectern boost has nothing to act on — clear it.
    game.lecternBoostPending = false;
    game.lecternBlindTacticId = null;
    endPlayerTurn();
  }

  function selectJustice(justice: Justice): void {
    if (ui.phase !== "playing" || game.selectedTacticId === null || game.currentTurn !== "player") return;
    const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === game.selectedTacticId);
    if (!tactic) return;
    if (tactic.effectType === "shield" && (game.leanings[justice.id] ?? 0) <= 0) return;
    if (tactic.effectType === "betray-friend" && (game.leanings[justice.id] ?? 0) < 60) return;
    applyTactic(tactic, justice, "player");
    game.selectedTacticId = null;
  }

  function confirmTarget(): void {
    if (!ui.targetingChoice) return;
    const justice = ui.targetingChoice;
    ui.targetingChoice = null;
    selectJustice(justice);
  }

  function confirmReframeStance(stance: StanceType): void {
    if (!game.reframeStanceTacticId) return;
    const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === game.reframeStanceTacticId);
    if (!tactic) return;
    game.reframeStanceSelection = stance;
    applyTactic(tactic, null, "player");
  }

  function cancelReframeStance(): void {
    // A blindly-committed Reframe is locked in — you can't peek and back out.
    if (game.lecternBlindTacticId !== null) return;
    game.reframeStanceMode = false;
    game.reframeStanceTacticId = null;
    game.reframeStanceChoices = [];
  }

  function handleJusticeClick(justice: Justice): void {
    function openDetail(): void {
      ui.detailJustice = justice;
      if (settings.features.usePokeVoice) playJusticeVoice(justice, "neutral");
    }

    if (cheatsActive && ui.cheatTargetMode && ui.phase === "playing") {
      game.leanings[justice.id] = ui.cheatTargetMode === "love" ? 100 : -100;
      ui.cheatTargetMode = null;
      return;
    }

    if (ui.phase === "setup") {
      openDetail();
      return;
    }
    if (ui.phase !== "playing" || ui.opponentThinking) return;

    if (game.multiTargetMode && game.currentTurn === "player") {
      const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === game.multiTargetTacticId) ?? null;
      const eligibleJusticeIds = new Set(getEligibleMultiTargetJustices(tactic).map((targetJustice) => targetJustice.id));
      if (!tactic || eligibleJusticeIds.size < 2) {
        clearMultiTargetMode();
        return;
      }
      if (!eligibleJusticeIds.has(justice.id)) {
        openDetail();
        return;
      }
      game.multiTargetSelections = game.multiTargetSelections.filter((selectedJusticeId) => eligibleJusticeIds.has(selectedJusticeId));
      const idx = game.multiTargetSelections.indexOf(justice.id);
      if (idx !== -1) {
        game.multiTargetSelections.splice(idx, 1);
      } else {
        game.multiTargetSelections.push(justice.id);
        if (game.multiTargetSelections.length === 2) {
          applyTactic(tactic, null, "player");
        }
      }
      return;
    }

    if (game.selectedTacticId !== null && game.currentTurn === "player") {
      const tactic = [...game.playbook, ...game.claimedCards].find((t) => t.id === game.selectedTacticId);
      if (!tactic) {
        openDetail();
        return;
      }
      if (tactic.effectType === "shield" && (game.leanings[justice.id] ?? 0) <= 0) {
        openDetail();
        return;
      }
      if (tactic.effectType === "betray-friend" && (game.leanings[justice.id] ?? 0) < 60) {
        openDetail();
        return;
      }
      ui.targetingChoice = justice;
    } else {
      openDetail();
    }
  }

  // ─── Apply Tactic ────────────────────────────────────────────

  function applyTactic(tactic: Tactic, targetJustice: Justice | null, actor: TurnActor): void {
    const outcome: EffectOutcome = resolveEffect(game, tactic, targetJustice, actor, { drawCard, removeFromPlaybook });

    // "Without notes" payoff: amplify the swings of whatever blind card was committed to.
    const lecternBoosted = game.lecternBoostPending;
    if (lecternBoosted) {
      applyLecternBoost(outcome);
      game.lecternBoostPending = false;
    }
    // The blind card has now resolved (and revealed) — release the lock.
    game.lecternBlindTacticId = null;

    const attackedJusticeNames = getAttackedJusticeNamesForPlay({
      effectType: tactic.effectType,
      targetJusticeName: targetJustice?.name,
      multiTargetJusticeNames:
        tactic.effectType === "swap-clerks"
          ? game.multiTargetSelections
              .map((justiceId) => game.bench.find((justice) => justice.id === justiceId)?.name)
              .filter((justiceName): justiceName is string => !!justiceName)
          : [],
    });

    attackedJusticeNames.forEach((justiceName) => {
      trialAttackedJustices.add(justiceName);
    });

    if (settings.features.usePokeVoice && actor === "player" && targetJustice) {
      if (tactic.effectType === "justice-cocktails" && targetJustice.name === "Brett Kavanaugh") {
        playKavanaughBeer();
      } else {
        const result = outcome.results.find((r) => r.justiceName === targetJustice.name && !r.isKnockon);
        const change = result?.change ?? 0;
        playJusticeVoice(targetJustice, change > 0 ? "happy" : change < 0 ? "sad" : "neutral");
      }
    }

    courtReport.plays.push({
      actor,
      tacticName: tactic.name,
      cardType: tactic.cardType,
      targetName: outcome.reportTarget,
      results: outcome.results.filter((r) => r.change !== 0),
      round: game.round,
      viaLectern: lecternBoosted,
    });

    const baseFeedback = outcome.overrideFeedback ?? tactic.feedback ?? null;
    const feedback = lecternBoosted ? `🎤 Argued without notes — amplified! ${baseFeedback ?? ""}`.trim() : baseFeedback;

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

    void stats.trackTacticPlay(tactic, actor, outcome.results);

    if (actor === "player") {
      endPlayerTurn();
    } else {
      endOpponentTurn();
    }

    if (outcome.pendingRedraws) {
      const count = outcome.pendingRedraws;
      for (let i = 0; i < count; i++) {
        setTimeout(
          () => {
            const drawn = drawCard();
            if (drawn) game.playbook.push(drawn);
          },
          350 + i * 70,
        );
      }
    }
  }

  // ─── Campaign Composable ──────────────────────────────────────

  const {
    startCampaign: beginCampaign,
    chooseObjective: pickObjective,
    activateDoubleTap: triggerDoubleTap,
    proceedAfterVerdict: proceedAfterCampaignVerdict,
    collectReward: collectCampaignReward,
    activateRecessReward: triggerRecessReward,
    confirmVetoNominee,
    doneActivatingBonus,
    proceedFromRecess: moveFromRecess,
    eligibleJustices,
    vetoChoiceJustices,
    recessRewardCards,
    trialRewardCards,
    campaignProgress,
    objectiveStatus,
    gameOverStats,
  } = useCampaignManager(game, campaign, ui, verdict, courtReport, shuffle);

  function rewardNameFromId(rewardId: string): string {
    return rewardCards.find((reward) => reward.id === rewardId)?.name ?? rewardId;
  }

  function maybeTrackCampaignCompletion(): void {
    if (campaignEndLogged || !campaign.data?.isOver || campaign.data.won === null) return;
    campaignEndLogged = true;

    void stats.trackCampaignCompleted(campaign.data.setup.name, campaign.data.won);

    if (campaign.data.activeObjective) {
      stats.trackObjectiveResult(campaign.data.activeObjective.name, campaign.data.won);
    }
  }

  function startCampaign(setupId: number): void {
    beginCampaign(setupId);

    if (!campaign.data) return;
    campaignEndLogged = false;
    void stats.trackCampaignStarted(campaign.data.setup.name);
  }

  function chooseObjective(objective: Parameters<typeof pickObjective>[0]): void {
    pickObjective(objective);
    stats.trackObjectiveChosen(objective.name);
  }

  function activateDoubleTap(): void {
    const beforeActive = campaign.data?.doubleTapActive ?? false;
    triggerDoubleTap();
    const afterActive = campaign.data?.doubleTapActive ?? false;

    if (!beforeActive && afterActive) {
      stats.trackRewardActivated(rewardNameFromId("double-tap"));
    }
  }

  function activateRecessReward(rewardId: string, targetJusticeId?: number, targetEligibleId?: number): void {
    const beforeActivatedCount = campaign.data?.activatedPreRecessCardIds.length ?? 0;
    triggerRecessReward(rewardId, targetJusticeId, targetEligibleId);
    const afterActivatedCount = campaign.data?.activatedPreRecessCardIds.length ?? 0;

    if (afterActivatedCount > beforeActivatedCount) {
      stats.trackRewardActivated(rewardNameFromId(rewardId));
    }
  }

  function collectReward(): void {
    collectCampaignReward();
  }

  function proceedAfterVerdict(): void {
    const beforeRewardCounts = new Map<string, number>();
    (campaign.data?.rewardHand ?? []).forEach((reward) => {
      beforeRewardCounts.set(reward.id, (beforeRewardCounts.get(reward.id) ?? 0) + 1);
    });

    proceedAfterCampaignVerdict();

    (campaign.data?.rewardHand ?? []).forEach((reward) => {
      const beforeCount = beforeRewardCounts.get(reward.id) ?? 0;
      if (beforeCount > 0) {
        beforeRewardCounts.set(reward.id, beforeCount - 1);
      } else {
        stats.trackRewardChosen(reward.name);
      }
    });

    maybeTrackCampaignCompletion();
  }

  function proceedFromRecess(): void {
    moveFromRecess();
    maybeTrackCampaignCompletion();
  }

  onMounted(() => {
    // Read first-play flags on the client only, after hydration (see refs above).
    playedQuickplay.value = localStorage.getItem("hasPlayedQuickplay") === "true";
    playedCurrentCourt.value = localStorage.getItem("hasPlayedCurrentCourt") === "true";
    ui.phase = "title";
  });
</script>
<template lang="pug" src="./Court.pug"></template>

<style lang="scss" src="./Court.scss"></style>
