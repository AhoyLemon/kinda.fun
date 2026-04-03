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
  | "discard-all" // discard all shared docket cards and draw 5 fresh ones
  | "claim-two" // claim 2 docket cards for exclusive player use this turn
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
  | "invite-church"; // target justice gains empathy; same-religion justices give you a favorable nod

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
  docket: Tactic[];
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
}
