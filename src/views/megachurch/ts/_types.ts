// ================= GENERAL TYPES =================

export interface Religion {
  id: number; // UID for religion
  name: ReligionNames; // Name of this religion
  description?: string; // Recommended. Describe this religion further.
  follower: string; // What you call a person who follows this religion
  followers: string; // What you call people who follow this religion
  likes: Tags[]; // A list of things this religion likes.
  dislikes: Tags[]; // A list of things this religion dislikes.
  enemies?: ReligionNames[]; // What religions this religion opposes.
}

export interface Place {
  id: number; // UID for place
  name: string; // The Name of this place
  description: string; // Recommended. Describe this place further, what is unique about it?
  likedTags: Tags[]; // A list of things the population of this particular place generally likes. (max 5)
  dislikedTags: Tags[]; // A list of things the population of this particular place generally dislikes. (max 5)
  totalPopulation: number; // The estimated number of people who live in this place
  avgNetWorth: number; // The average net worth for people in this place.
  religions: {
    id: number; // UID of the religion
    name: ReligionNames; // Name of the religion
    weight: number; // From 0 to 100, how strongly this population identifies with the religion
  }[];
}

export interface Spice {
  isAddicted: boolean; // starts true
  requiredAmount: number; // How much spice is required to avoid withdrawal symptoms each day
  canOverperform: boolean; // If true, the player can increase their stats above 100% by taking more spice than the required amount
  fatalAmount?: number; // If the player takes this much spice in a single day, they will die (optional for player state, required for settings)
  consumedToday: number; // How much spice the player consumed today (reset daily)
  pendingAddictionIncrease: number; // Addiction increase that will apply next day
  spiceToDeliver: number; // Spice ordered but not yet delivered
}

export interface Theme {
  id: number;
  title: string;
  desc: string;
  likedBy: {
    tags?: string[];
    religions?: Array<{ id: number; name: string } | string | number>;
  };
  dislikedBy: {
    tags?: string[];
    religions?: Array<{ id: number; name: string } | string | number>;
  };
  [key: string]: any;
}

// ================= WEIGHTED TYPES =================

export interface WeightedTag {
  tag: string;
  weight: number;
}

export interface WeightedReligion {
  name: string;
  id: number;
  weight: number;
}

// ================= MIXED MESSAGE TYPES =================

export interface MixedTag {
  tag: string;
  liked: number;
  disliked: number;
}

export interface MixedReligion {
  name: string;
  id: number;
  liked: number;
  disliked: number;
}

// ================= CHURCH MANAGEMENT TYPES =================

export interface ChurchUpgrades {
  extraPews: number; // How many extra pews purchased
  vipConfessionBooths: boolean; // Whether VIP confession booths are installed
  audioVisual: boolean; // Whether audio/visual equipment is installed
  seraphAI: boolean; // Whether Seraph AI sermon analysis is active
  sacrament: {
    wine: {
      level: number; // 0 = none, 1 = cheap, 2 = mid, 3 = top-shelf
      name: string; // e.g. "Kirkland Merlot"
    };
    bread: {
      level: number; // 0 = none, 1 = cheap, 2 = mid, 3 = top-shelf
      name: string; // e.g. "Wonder Bread"
    };
  };
}

export interface MerchItem {
  price: number; // selling price
  inventory: number; // how many items you have
  soldToday: number; // how many sold today
  totalSold: number; // how many sold total
}
export interface ChurchMarketing {
  generalAdActive: boolean;
  targetedAd: {
    active: boolean;
    targetReligion: Religion | null;
  };
  signSpinnerActive: boolean;
  prCampaign: {
    active: boolean;
    targetReligion: Religion | null;
  };
}

// ================= SERMON OUTPUT TYPE =================

export interface SermonTopic {
  id: number;
  title: string;
  description: string;
  isPreachedYesterday?: boolean;
}

export interface Sermon {
  topics: SermonTopic[];
  likedBy: {
    tags: WeightedTag[];
    religions: WeightedReligion[];
  };
  dislikedBy: {
    tags: WeightedTag[];
    religions: WeightedReligion[];
  };
  mixedMessages: {
    tags: MixedTag[];
    religions: MixedReligion[];
  };
}

// ================= GAME STATE INTERFACES =================

export interface UI {
  view:
    | "title-screen"
    | "place"
    | "sermon"
    | "sermon-confirm"
    | "preaching"
    | "sermon-results"
    | "church-setup"
    | "game-over";
  selectedTopics: [number | null, number | null, number | null];
  religionIndex: number;
  placeIndex: number;
  isFullscreen: boolean;
  churchLocationIndex: number;
  churchReligionIndex: number;
  timing: {
    toastDuration: number;
    donationToastDuration: number | false;
    toastDelayMin: number;
    toastDelayMax: number;
    donationToastDelay: number;
    resultsViewDelay: number;
    churchToastOffset: number;
  };
  chats: {
    plug: {
      isOpen: boolean;
    };
    harold: {
      isOpen: boolean;
    };
    sterling: {
      isOpen: boolean;
    };
  };
  workshopZone: {
    isOpen: boolean;
    showBanner: boolean;
    defaultTab?: string; // Tab to open to by default
  };
  eternalLegacyShop: {
    isOpen: boolean;
  };
  sterlingVoicemail: {
    isOpen: boolean;
  };
  seraphAINag: {
    hasShown: boolean; // Whether the nag message has been shown to the user
  };
}

export interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
  isTyping?: boolean;
  replaceTyping?: boolean;
}

export interface ChatHistory {
  totalOrders?: number;
  hasContacted?: boolean;
  chatHistory: ChatMessage[];
}

// ================= GAME SETTINGS TYPE =================

export interface GameSettings {
  baseDonation: number; // Base donation per follower
  isDebug: boolean;
  isDebugButtonVisible: boolean;
  themesPerDay: number; // How many themes are available to choose from each day
  triggers: {
    sterling: {
      daysWithVan: number;
    };
    harold: {
      days: number;
    };
  };
  streetPreaching: {
    baseCrowdSize: number;
    dislikeChance: {
      byReligion: number;
      byTag: number;
    };
    likeChance: {
      byReligion: number;
      byTag: number;
    };
    donation: {
      chance: number;
      min: number;
      max: number;
    };
    randomCrowdVariation: number;
    mixedMessageThreshold: number;
  };
  spice: {
    pricePerUnit: number;
    addictionProgression: number;
    penaltyPerUnit: number;
    bonusPerUnit: number;
    maxBonus: number;
    maxPenalty: number;
  };
  van: {
    cost: number;
    fixedGasPrice: number;
    gasPricePerMile: number;
  };
  churchPreaching: {
    expectedAttendees: number;
    religionMatchBonus: number;
    dislikeChance: {
      byReligion: number;
      byTag: number;
    };
    likeChance: {
      byReligion: number;
      byTag: number;
    };
    donation: {
      chance: number;
      min: number;
      max: number;
    };
    donationPerAttendee: {
      min: number;
      max: number;
    };
    sterling: {
      cutPercentage: number;
      minimumCut: number;
    };
    topicRepetitionPenalty: number;
  };
  church: {
    buzzMultiplier: number; // How much buzz affects attendance (buzz * multiplier = extra attendees)
    merch: {
      holyWater: {
        cost: number; // cost to the player (per item)
        baseChance: number; // base % chance per attendee to buy
      };
      holyWaterVendingMachine: {
        cost: number;
        bonusChance: number; // additional % chance
      };
      prayerCandles: {
        cost: number; // cost to the player (per item)
        baseChance: number; // base % chance per attendee to buy
      };
      weightLossTea: {
        cost: number; // cost to the player (per item)
        baseChance: number; // base % chance per attendee to buy
      };
      beachTowel: {
        cost: number; // cost to the player (per item)
        baseChance: number; // base % chance per attendee to buy
      };
      exorcismKit: {
        cost: number; // cost to the player (per item)
        baseChance: number; // base % chance per attendee to buy
      };
    };
    upgrades: {
      extraPews: {
        cost: number; // costPerPew
        capacityIncrease: number; // how many more people per pew
        maxPews: number; // maximum number of extra pews that can be purchased
      };
      vipConfessionBooths: {
        cost: number;
        revenuePerUse: number;
      };
      audioVisual: {
        cost: number;
        likeBoost: number; // % boost to like chances
      };
      seraphAI: {
        cost: number; // Daily subscription cost
        description: string;
        daysBeforeNag: number; // How many church days before showing the nag
      };
      sacraments: {
        wine: {
          levels: Array<{
            level: number;
            name: string;
            cost: number;
            likeBoost: number;
          }>;
        };
        bread: {
          levels: Array<{
            level: number;
            name: string;
            cost: number;
            likeBoost: number;
          }>;
        };
      };
    };
    marketing: {
      generalAd: {
        price: number;
        attendanceBoost: number;
        duration: number; // days
      };
      targetedAd: {
        price: number;
        targetReligionBoost: number;
        duration: number;
      };
      signSpinner: {
        price: number;
        attendanceBoost: number;
        duration: number;
      };
      prCampaign: {
        price: number;
        reputationBoost: number;
        duration: number;
      };
    };
  };
  eternalLegacy: {
    trigger: {
      churchDays: number;
    };
    heat: {
      max: number;
      dailyBaseIncrease: number;
      earningsMultiplier: number;
    };
    shop: {
      mammonItems: Array<{
        id: string;
        name: string;
        cost: number;
        mammon: number;
        description: string;
      }>;
      darkDeeds: Array<{
        id: string;
        name: string;
        cost: number;
        heat: number;
        effect: string;
      }>;
    };
    bibleVerses: Array<{
      quote: string;
      cite: string;
      version: string;
    }>;
  };
}

// ================= PLAYER STATE TYPE =================
export interface My {
  name: string;
  daysPlayed: number;
  money: number;
  totalMoneyEarned: number;
  religion: object;
  place: Place;
  lucre: object[];
  preacherStrengths: {
    gatherCrowd: number;
    getDonations: number;
    getLikes: number;
    getDislikes: number;
  };
  selectedTopics: Array<any>;
  isStreetPreaching: boolean;
  hasVan: boolean;
  canBuyVan: boolean;
  hasTraveledToday: boolean;
  inventory: object[];
  dailyThemes: Array<any>;
  sermonToday: Sermon;
  sermonYesterday: Sermon;
  effectYesterday?: any[];
  religiousScorecard?: any[];
  audienceReactions?: Array<{
    id: number;
    name: string;
    liked: number;
    disliked: number;
    neutral: number;
    likedTags?: string[];
    dislikedTags?: string[];
    mixedTags?: string[];
    followerName?: string;
    followersName?: string;
  }>;
  donationsYesterday: number;
  churchAttendanceYesterday?: number;
  churchDonorsYesterday?: number;
  streetAttendanceYesterday?: number;
  streetDonorsYesterday?: number;
  sterlingCutYesterday?: number;
  playerShareYesterday?: number;
  merchRevenueYesterday?: number;
  confessionRevenueYesterday?: number;
  seraphAICostYesterday?: number; // Daily cost for Seraph AI service
  merchSalesDetailsYesterday?: {
    holyWater: { sold: number; revenue: number };
    prayerCandles: { sold: number; revenue: number };
    weightLossTea: { sold: number; revenue: number };
    beachTowel: { sold: number; revenue: number };
    exorcismKit: { sold: number; revenue: number };
  };
  // Church-related properties
  church: {
    isFounded: boolean;
    name?: string;
    location?: Place;
    religion?: Religion;
    days: number;
    buzz: number;
    maxAttendance: number;
    upgrades: ChurchUpgrades;
    merch: {
      holyWater: MerchItem & {
        isVendingMachine: boolean; // whether you have a vending machine
      };
      prayerCandles: MerchItem;
      weightLossTea: MerchItem;
      beachTowel: MerchItem;
      exorcismKit: MerchItem;
    };
  };
  marketing: ChurchMarketing;
  congregation?: Array<{
    id: number;
    count: number;
    likes: number;
    dislikes: number;
  }>;
  spice: Spice;
  chats: {
    plug: ChatHistory;
    harold: ChatHistory;
    sterling?: ChatHistory & {
      daysWithVan: number;
      hasAgreedToArrangement?: boolean;
      moneyOwed?: number;
      totalPayments?: number;
    };
  };
  eternalLegacy: {
    isActive: boolean;
    heat: number;
    voicemailPlayed: boolean;
    voicemailReplayAvailable: boolean;
    totalMammon: number;
    purchasedItems: Array<string>; // Array of item IDs
    usedDarkDeeds: Array<{
      id: string;
      name: string;
      cost: number;
      effect: string;
      useDate: number; // day used
    }>;
    sterlingCutModifier: number; // Additional percentage points added to Sterling's cut
    sterlingAlive: boolean;
  };
  gameOverCause: null | "drug overdose" | "prison"; // If endgame is triggered (not null), what caused game over
}

// ================= NAMES OF THINGS =================

export type ReligionNames =
  | "2 Fast 2 Faithful"
  | "Agnostic Atheists"
  | "Buddhism"
  | "Catholicism"
  | "Confucianism"
  | "Evangelical Christianity"
  | "Jehovah's Witnesses"
  | "Mormonism"
  | "New-Age Spirituality"
  | "Prosperity Gospel"
  | "Secular Humanists"
  | "Seventh-day Adventism"
  | "Southern Baptist"
  | "Temple of the Eternal Sun"
  | "The Church of Eros"
  | "The Church of Satan"
  | "The Church of the High Priest"
  | "The Digital Ascension"
  | "The Gaia Collective"
  | "The Order of the Alpha Male"
  | "The Order of the Divine Algorithm"
  | "The Queens' Dominion"
  | "The Sovereign Guild of Untethered Minds"
  | "The Starseed Pilgrims"
  | "Theistic Satanism"
  | "Zardoz"
  | "The Church of Having More Things";

export type Tags =
  | "abstinence"
  | "altered states"
  | "apathy"
  | "authority"
  | "bizarre concepts"
  | "blind faith"
  | "body"
  | "abstinence"
  | "altered states"
  | "apathy"
  | "authority"
  | "bizarre concepts"
  | "blind faith"
  | "body"
  | "casualness"
  | "chaos"
  | "community"
  | "compassion"
  | "consumerism"
  | "crystals"
  | "dogma"
  | "drugs"
  | "emotion"
  | "ethics"
  | "exploitation"
  | "family values"
  | "feminism"
  | "formal religion"
  | "forgiveness"
  | "free thought"
  | "freedom"
  | "giving to get"
  | "greed"
  | "guns"
  | "hardship"
  | "humility"
  | "individualism"
  | "innovation"
  | "inner harmony"
  | "journalism"
  | "justice"
  | "liberal politics"
  | "literalism"
  | "logic"
  | "loyalty"
  | "materialism"
  | "meditation"
  | "misogyny"
  | "missionary work"
  | "modernity"
  | "money"
  | "nationalism"
  | "nature"
  | "nihilism"
  | "open-mindedness"
  | "order"
  | "other religions"
  | "outrageousness"
  | "passion"
  | "patriotism"
  | "peace"
  | "personal energy"
  | "pleasure"
  | "positive affirmations"
  | "poverty"
  | "power"
  | "progress"
  | "prophecy"
  | "promiscuity"
  | "provocation"
  | "rationalism"
  | "rebellion"
  | "reason"
  | "rituals"
  | "rules"
  | "sex"
  | "shame"
  | "science"
  | "security"
  | "secularism"
  | "self-control"
  | "self-doubt"
  | "self-help"
  | "self-sufficiency"
  | "sensory experience"
  | "simplicity"
  | "sincerity"
  | "skepticism"
  | "soberness"
  | "social justice"
  | "speed"
  | "spreading the word"
  | "strength"
  | "strict rules"
  | "structure"
  | "subservience"
  | "suffering"
  | "sustainability"
  | "taxes"
  | "technology"
  | "the occult"
  | "tradition"
  | "transcendence"
  | "violence"
  | "wealth"
  | "weakness";

export type PlaceNames =
  | "Starting Location"
  | "A-Hyuk Hyuk, Alabama"
  | "Yankee Grit, New Hampshire"
  | "Venture City, California"
  | "Blessed Bayou, Louisiana"
  | "Crystal Dunes, Arizona"
  | "Miracle Springs, Florida"
  | "Landing Strip, Nevada"
  | "Megamall, Minnesota"
  | "Cascadia Moss, Washington"
  | "Rapture, Texas";
