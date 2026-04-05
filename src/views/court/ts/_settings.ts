interface UISettings {
  toastDuration: number;
}

interface GameSettings {
  numberOfRounds: number;
  abstentionThreshold: number;
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
