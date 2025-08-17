// ================= GENERAL TYPES =================

export interface Religion {
  id: number; // UID for religion
  name: ReligionNames; // Name of this religion
  description?: string; // Recommended. Describe this religion further.
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

export interface Theme {
  id: number;
  title: string;
  desc: string;
  likedBy: {
    tags?: string[];
    religions?: Array<
      { id: number; name: string } | string | number
    >;
  };
  dislikedBy: {
    tags?: string[];
    religions?: Array<
      { id: number; name: string } | string | number
    >;
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

export interface SermonToday {
  topics: string[];
  topicIDs: number[];
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
  | "Buddhist"
  | "Catholic"
  | "Evangelical Christianity"
  | "Jehovah's Witnesses"
  | "Mormonism"
  | "Mystic Islam"
  | "New-Age Spirituality"
  | "Orthodox Islam"
  | "Prosperity Gospel"
  | "Rastafarianism"
  | "Secular Humanists"
  | "Southern Baptist"
  | "Temple of the Eternal Sun"
  | "The Blockchain Mystics"
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
  | "Zardoz";

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
  | "doctrinal purity"
  | "drugs"
  | "emotion"
  | "ethics"
  | "exploitation"
  | "family values"
  | "feminism"
  | "fixed beliefs"
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
  | "oppression"
  | "order"
  | "other religions"
  | "outrageousness"
  | "passion"
  | "patriotism"
  | "peace"
  | "personal energy"
  | "personal testimony"
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
  | "unethical behavior"
  | "violence"
  | "wealth"
  | "weakness"
  | "worldly celebrations";

export type PlaceNames =
  | "A-Hyuk Hyuk, Alabama"
  | "Yankee Grit, New Hampshire"
  | "Techno Utopia, California"
  | "Blessed Bayou, Louisiana"
  | "Crystal Dunes, Arizona"
  | "Miracle Springs, Florida"
  | "Blessed Strip, Nevada"
  | "Megamall, Minnesota";
