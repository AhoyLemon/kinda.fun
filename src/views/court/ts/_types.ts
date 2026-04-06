export interface Justice {
  id: number;
  name: string;
  image: string;
  description: string;
  justiceType: "current" | "historical" | "fictional" | "celebrity";
  gender: "M" | "F";
  birthYear: number;
  nominatedBy?: President;
  religion: Religion;
  ethnicity: Ethnicity;
  courtName?: string;
  stats: {
    logic: number;
    charisma: number;
    empathy: number;
    integrity: number;
    succeptibility: number;
    partyLoyalty: number;
  };
  weaknesses: {
    flattery: number;
    bribery: number;
    blackmail: number;
    threats: number;
  };
}

// ── Objective Cards ────────────────────────────────────────────────────────

export type ObjectiveId = "win-all" | "five-four" | "defend-the-law" | "prosecute" | "lose-all" | "right-wing" | "left-wing";

export interface ObjectiveCard {
  id: ObjectiveId;
  name: string;
  description: string;
  flavorText: string;
  /** If set, forces the player to this side in every case. */
  forcedSide?: "prosecution" | "defendant";
}

// ── Reward Cards ──────────────────────────────────────────────────────────

export type RewardId =
  | "wheel-of-retirement"
  | "not-enough-chairs"
  | "justice-veto"
  | "another-one"
  | "glaze-homie"
  | "never-retire"
  | "mutiny"
  | "dream-justice"
  | "double-tap";

export type RewardDeployPhase = "trial" | "recess" | "either";

export interface RewardCard {
  id: RewardId;
  name: string;
  description: string;
  flavorText: string;
  deployPhase: RewardDeployPhase;
  /** If true, player must select a justice from the bench before applying. */
  requiresBenchTarget?: boolean;
  /** If true, player must select from all eligible (off-bench) justices. */
  requiresEligibleTarget?: boolean;
}

// ── Campaign Structures ────────────────────────────────────────────────────

export type JusticePoolType = "current" | "historical" | "fictional" | "celebrity";
export type CasePoolType = "historical" | "fictional";

export interface CampaignSetup {
  id: number;
  name: string;
  description: string;
  startYear: number;
  startPresident: President;
  chiefJusticeId?: number;
  justiceIds?: number[];
  caseIds?: number[];
  isRandomPresident?: boolean;
  isRandomBench?: boolean;
  isRandomStartYear?: boolean;
  justicePool?: JusticePoolType[];
  casePool?: CasePoolType[];
}

export interface CampaignTrialResult {
  caseName: string;
  won: boolean;
  tied: boolean;
  forCount: number;
  againstCount: number;
  abstainCount: number;
  tacticCounts: Record<string, number>; // tactic name → times used by player
  finalLeanings: Record<number, number>; // justice id → final leaning
  winningParty: Party | null; // party that won this case outcome (for country wing analysis)
}

export interface RecessEvent {
  date: string; // e.g. "Nov 3, 2028"
  text: string;
}

export interface CampaignState {
  setup: CampaignSetup;
  currentCaseIndex: number;
  year: number;
  president: President;
  presidentStartYear: number; // year the current president took office
  objectiveDrawPair: [ObjectiveCard, ObjectiveCard]; // two drawn objectives to choose from
  activeObjective: ObjectiveCard | null; // chosen objective
  rewardDeck: RewardCard[];
  rewardDiscard: RewardCard[];
  rewardHand: RewardCard[]; // saved cards not yet deployed
  pendingReward: RewardCard | null; // legacy field (no longer used for receiveReward phase)
  latestRewardCardId: string | null; // ID of the card just earned (shown with animation on pre-recess screen)
  activatedPreRecessCardIds: string[]; // IDs of cards activated this pre-recess (shown as "activated" state)
  trialResults: CampaignTrialResult[];
  permanentChiefJusticeId: number | null; // set by Keep That Crown
  benchSeats: number; // current available bench seats (default 9)
  pendingBenchSeatDelta: number; // seat changes queued via reward cards
  dreamJusticeId: number | null; // queued vacancy fill by Dream Justice
  vetoMode: boolean; // Justice Veto pending — next nomination shows 2 candidates
  vetoChoices: [number, number] | null; // two justice ids for veto nomination
  vetoConfirmed: boolean; // player has made their pick; hide the choice modal
  glazedJusticeIds: number[]; // justice ids with permanent per-trial +20 bonus
  neverRetireIds: number[]; // justice ids protected from natural attrition
  departedJusticeIds: number[]; // justice ids who left the bench (permanently ineligible for re-nomination)
  initialBenchJusticeIds: number[]; // snapshot of bench at campaign start (for wing-shift analysis)
  forcedRetirementCount: number; // justices retired via suggest-retirement tactic
  naturalDepartureCount: number; // justices who died or retired naturally
  nominationCount: number; // justices nominated by presidents during campaign
  recessLog: RecessEvent[]; // events for current recess screen
  isOver: boolean; // true when campaign has concluded (win or lose)
  won: boolean | null; // null until decided
  doubleTapActive: boolean; // true during the extra tactic window this turn
}

export interface President {
  id: number;
  name: string;
  party: Party;
  image: string;
}

export type Party = "Federalist" | "Democratic-Republican" | "Whig" | "Democrat" | "Republican";

export type Religion = "Catholic" | "Jewish" | "Protestant" | "Other";

export type Ethnicity = "White" | "Black" | "Hispanic" | "Jewish" | "Other";

export interface Case {
  id: number;
  name: string;
  year?: number;
  caseType: "historical" | "fictional";
  primaryQuestion: string;
  prosecution: {
    name: string;
    argument: string;
    favoredBy: Party;
  };
  defendant: {
    name: string;
    argument: string;
    favoredBy: Party;
  };
}

// Tactics are the "move cards" the player plays to sway justices.
// effectType determines targeting; statBasis/weaknessBasis determine power scaling.
export type TacticEffectType =
  | "sway-one" // sway a single targeted justice
  | "sway-all" // sway all justices with a broadcast effect
  | "susceptibility" // raise susceptibility of all justices (amplifies next attack)
  | "shield" // protect one allied justice from being swayed
  | "discard-all" // discard all shared playbook cards and draw 5 fresh ones
  | "claim-two" // claim 2 playbook cards for exclusive player use this turn
  | "make-chief" // change who the chief justice is
  | "insult-chief" // insult chief justice; opposite-party justices gain positive modifier
  | "presidential-call" // Trump zoom call; big effect on his nominees, small on other Rs, negative on Ds
  | "recuse" // reset a justice to neutral; makes them harder to sway for the rest of the trial
  | "betray-friend" // sacrifice a strongly-for justice to flip opposition justices
  | "swap-clerks" // swap two justices' leanings; chance of tattling
  | "encourage-nap" // freeze a justice for a round; they wake up refreshed and fond of you
  | "justice-cocktails" // boost charisma+empathy, reduce logic for one justice
  | "hire-pi" // significantly raise blackmail susceptibility on two justices
  | "saint-patricks" // turn all justices Catholic for the remainder of the trial
  | "invite-church" // target justice gains empathy; same-religion justices give you a favorable nod
  | "suggest-retirement" // campaign only: mark justice for guaranteed retirement during recess; they lose massive favor
  | "keep-crown"; // campaign only: make the current trial's elevated CJ permanent for the campaign

export interface Tactic {
  id: number;
  name: string;
  description: string; // rules text
  flavorText: string; // in-universe comedy flavor
  cardType: "attack" | "defense" | "utility";
  effectType: TacticEffectType;
  basePower: number; // raw sway amount before modifiers (1–8)
  statBasis?: keyof Justice["stats"]; // which justice stat scales the power
  statRelation?: "amplifies" | "resists" | "polarizes-high" | "polarizes-low";
  // polarizes-high: positive for high-stat justices, negative (insulted) for low-stat
  // polarizes-low: positive for low-stat justices, negative (insulted) for high-stat
  weaknessBasis?: keyof Justice["weaknesses"]; // which weakness is being exploited
  feedback?: string; // optional static feedback string shown in toast for utility cards
  campaignOnly?: boolean; // if true, only enters the playbook deck during campaign mode
}

export type Side = "prosecution" | "defendant";
export type TurnActor = "player" | "opponent";

// Full reactive game state shape — used to type the game object in Court.vue
// and as the parameter type for resolveEffect in _tacticEffects.ts.
export interface CourtGameState {
  bench: Justice[];
  currentCase: Case | null;
  playerSide: Side | null;
  chiefJusticeId: number | null;
  chiefJusticeHardened: boolean;
  deck: Tactic[];
  discardPile: Tactic[];
  /** The shared face-up card pool both counsels draw from. Renamed from "docket". */
  playbook: Tactic[];
  claimedCards: Tactic[];
  currentTurn: TurnActor;
  round: number;
  totalRounds: number;
  selectedTacticId: number | null;
  claimingMode: boolean;
  claimedSelections: number[];
  leanings: Record<number, number>;
  susceptibilityMods: Record<number, number>;
  playerShields: number[];
  opponentShields: number[];
  recusedJustices: number[];
  nappingJustices: Record<number, number>; // justiceId → round the nap ends (wake + bonus at end of that round)
  statMods: Record<number, Partial<Record<keyof Justice["stats"], number>>>; // temporary stat boosts for this trial
  weaknessMods: Record<number, Partial<Record<keyof Justice["weaknesses"], number>>>; // temporary weakness boosts
  religionOverrides: Record<number, Religion>; // religion overrides (e.g. from St. Patrick's Day)
  multiTargetMode: boolean; // true when player is selecting 2 justices for a dual-target card
  multiTargetSelections: number[]; // justice ids selected so far in multi-target mode
  multiTargetTacticId: number | null; // tactic being staged for multi-target use
  // ── Campaign trial-scoped state ──────────────────────────────
  makeChiefPlayedThisTrial: boolean; // true once Elevate to Chief is used; gates Keep That Crown
  suggestRetirementTargets: number[]; // justice ids marked for guaranteed retirement at recess
  keepCrownActivated: boolean; // Keep That Crown was played this trial
}
