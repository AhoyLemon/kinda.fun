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
  fatalAmount: number; // If the player takes this much spice in a single day, they will die
  consumedToday: number; // How much spice the player consumed today (reset daily)
  pendingAddictionIncrease: number; // Addiction increase that will apply next day
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
  // | "Mystic Islam"
  | "New-Age Spirituality"
  | "Orthodox Islam"
  | "Prosperity Gospel"
  | "Secular Humanists"
  | "Seventh-day Adventism"
  //| "Shinto"
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
  | "provocation"
  | "rationalism"
  | "rebellion"
  | "reason"
  | "rituals"
  | "rules"
  | "sex"
  | "promiscuity"
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
