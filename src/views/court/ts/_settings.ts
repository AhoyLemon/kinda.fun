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
  startingVariance: 0,
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
