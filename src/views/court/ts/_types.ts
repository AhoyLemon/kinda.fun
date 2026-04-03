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
  | "presidential-call"; // patch in a presidential phone call; effect scales by partyLoyalty and nominating president

export interface Tactic {
  id: number;
  name: string;
  description: string; // rules text
  flavorText: string; // in-universe comedy flavor
  cardType: "attack" | "defense" | "utility";
  effectType: TacticEffectType;
  basePower: number; // raw sway amount before modifiers (1–8)
  statBasis?: keyof Justice["stats"]; // which justice stat scales the power
  statRelation?: "amplifies" | "resists"; // high stat = more effective vs. less effective
  weaknessBasis?: keyof Justice["weaknesses"]; // which weakness is being exploited
}
