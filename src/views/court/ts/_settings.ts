interface UISettings {
  toastDuration: number;
}

interface GameSettings {
  numberOfRounds: number;
  abstentionThreshold: number;
  swayAllMultiplier: number; // scales power for sway-all tactics relative to sway-one (1.0 = same as sway-one per-justice)
}

interface DifficultySettings {
  /** Multiplier applied to the opponent's tactic power. Default 1.0. Higher = harder. */
  opponentPowerMult: number;
  /** Multiplier applied to sway-all tactic power (both player and opponent). Default reduced to balance AoE. */
  swayAllPowerMult: number;
  /** Number of tactic cards dealt to player per hand. Default 5. */
  handSize: number;
  /** Starting stance variance. Larger = more random initial leanings beyond party/stance score. */
  startingVariance: number;
}

interface CampaignSettings {
  campaignLength: number; // number of cases in a random campaign
  justiceAttrition: {
    deathChance: number; // 0–100, chance any death occurs at all during a recess
    minDeaths: number;
    maxDeaths: number;
  };
  presidentialElection: {
    electionChance: number; // 0–100, chance incumbent loses a contested election
    maxTerms: number; // president is term-limited after this many election wins
  };
}

interface FeatureSettings {
  /** When true, justices vocally react to being targeted or viewed, Pokemon-style. */
  usePokeVoice: boolean;
}

interface CheatSettings {
  isActive: boolean;
  shuffleTactics: boolean;
  tacticOrder?: number[];
  shuffleBonus: boolean;
  bonusOrder?: string[];
  shuffleObjectives: boolean;
  objectiveOrder?: string[];
}

interface Settings {
  ui: UISettings;
  game: GameSettings;
  difficulty: DifficultySettings;
  campaign: CampaignSettings;
  features: FeatureSettings;
  cheats: CheatSettings;
}

export const uiSettings: UISettings = {
  toastDuration: 4000, // ms. Set to 0 to keep toasts visible until manually dismissed (click to close).
};

export const gameSettings: GameSettings = {
  numberOfRounds: 5,
  abstentionThreshold: 10,
  swayAllMultiplier: 3, // sway-all = power × 3 (vs. sway-one = power × 10)
};

export const difficultySettings: DifficultySettings = {
  opponentPowerMult: 1.0,
  swayAllPowerMult: 0.3, // AoE attacks land at 30% of single-target power per justice
  handSize: 5,
  startingVariance: 8,
};

export const campaignSettings: CampaignSettings = {
  campaignLength: 5,
  justiceAttrition: {
    deathChance: 50,
    minDeaths: 1,
    maxDeaths: 3,
  },
  presidentialElection: {
    electionChance: 50,
    maxTerms: 2,
  },
};

export const featureSettings: FeatureSettings = {
  usePokeVoice: true,
};

export const cheatSettings: CheatSettings = {
  /** Master switch. Has no effect in production builds. */
  isActive: false,

  /** If true, the tactic deck is shuffled normally. If false, tacticOrder controls what comes first. */
  shuffleTactics: true,
  /** Tactic IDs (numeric) that will be placed at the front of the deck, in this order. */
  //tacticOrder: [5, 9, 11, 13],

  /** If true, the reward deck is shuffled normally. If false, bonusOrder controls what comes first. */
  shuffleBonus: true,
  /** RewardCard IDs that will be placed at the front of the reward deck, in this order.
   *  Valid IDs: "wheel-of-retirement" | "not-enough-chairs" | "justice-veto" | "another-one"
   *           | "glaze-homie" | "never-retire" | "mutiny" | "dream-justice" | "double-tap" */
  //bonusOrder: ["dream-justice", "not-enough-chairs", "justice-veto", "dream-justice", "double-tap"],

  /** If true, objectives are shuffled normally. If false, objectiveOrder controls the pair drawn. */
  shuffleObjectives: true,
  /** ObjectiveCard IDs for the two objectives offered on objective-draw, in this order.
   *  Valid IDs: "win-all" | "five-four" | "defend-the-law" | "prosecute"
   *           | "lose-all" | "right-wing" | "left-wing" */
  //objectiveOrder: ["win-all", "left-wing"],
};

/** True only in Vite dev builds when cheats.isActive is set. Always false in production. */
export const cheatsActive: boolean = import.meta.env.DEV && cheatSettings.isActive;

export const settings: Settings = {
  ui: uiSettings,
  game: gameSettings,
  difficulty: difficultySettings,
  campaign: campaignSettings,
  features: featureSettings,
  cheats: cheatSettings,
};

// Backward-compatible alias. Prefer settings.features.
export const featureFlags: FeatureSettings = featureSettings;
// Backward-compatible alias. Prefer settings.cheats.
export const cheats: CheatSettings = cheatSettings;
