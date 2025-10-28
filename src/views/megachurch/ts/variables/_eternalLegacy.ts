import { ReligionNames } from "../_types";

export interface EternalLegacyShopItem {
  id: string;
  name: string;
  cost: number; // Cost in game currency
  mammon: number; // Cost in mammon points
  description: string;
  dayPurchased?: number; // Day the deed was purchased
}

export interface EternalLegacyDarkDeed {
  id: string;
  name: string;
  cost: number;
  heat: number;
  cutIncreasase?: number; // Permanent increase to Sterling's cut
  effect: string;
  dayPurchased?: number; // Day the deed was purchased
}

export interface EternalLegacyBibleVerse {
  quote: string;
  cite: string;
  version: string;
}

export const eternalLegacyShopItems: EternalLegacyShopItem[] = [
  {
    id: "serpent-staff",
    name: "Serpent-Handled Staff",
    cost: 500,
    mammon: 15,
    description: "Ethically sourced crystals that definitely align your chakras and bank account. Results may vary by gullibility.",
  },
  // {
  //   id: "prosperity-candles",
  //   name: "Blessed Prosperity Candles (24-pack)",
  //   cost: 1180,
  //   mammon: 25,
  //   description: "Hand-dipped in holy oils and capitalism. Burns bright like your congregation's wallets.",
  // },
  {
    id: "silver-pieces",
    name: "Thirty Pieces of Silver",
    cost: 1650,
    mammon: 30,
    description: "Probably not actual silver, but who's counting? Perfect for betrayers, backstabbers, and dinner party conversation starters.",
  },
  // {
  //   id: "miracle-water",
  //   name: "Premium Miracle Water Dispenser",
  //   cost: 2340,
  //   mammon: 40,
  //   description: "Tap water blessed by someone who met someone who knew a priest. $50 per bottle sold separately.",
  // },
  {
    id: "pearl-gates-keychain",
    name: "Pearl Gates Keychain",
    cost: 2875,
    mammon: 50,
    description: "Why wait for death to show off your VIP afterlife access? Jingle your way to eternal salvation. Saint Peter not included.",
  },
  {
    id: "gold-cross-necklace",
    name: "Gold Cross Necklace",
    cost: 3450,
    mammon: 65,
    description: "Nothing says 'humble servant' like 24-karat religious iconography. Made by the same jewelers who do chains for rappers.",
  },
  {
    id: "led-hubcaps",
    name: "Divine LED Hubcap Proclamation System",
    cost: 4230,
    mammon: 75,
    description: "Let your chariot proclaim His glory in scrolling RGB. Custom scripture available, blasphemy extra.",
  },
  {
    id: "private-jet-model",
    name: "Blessed Aviation Ministry Scale Model",
    cost: 5680,
    mammon: 95,
    description: "A replica of the private jet you'll definitely need for 'missionary work' in the Bahamas.",
  },
  {
    id: "diamond-chalice",
    name: "Artisan Diamond-Encrusted Chalice",
    cost: 6920,
    mammon: 120,
    description: "Because regular communion wine tastes better from a $7,000 cup, obviously. Dishwasher safe!",
  },
  {
    id: "prosperity-throne",
    name: "Babylonian Prosperity Throne",
    cost: 7850,
    mammon: 140,
    description: "Rule over your flock in style. Includes built-in cup holder and donation collection chute.",
  },
  {
    id: "baal-idol",
    name: "Authentic Idol of Baal",
    cost: 15000,
    mammon: 250,
    description: "The ultimate irony—worship money by buying a golden idol of an ancient prosperity god. Moses not included.",
  },
  {
    id: "golden-calf",
    name: "Biblical Golden Calf Replica",
    cost: 25000,
    mammon: 400,
    description: "Peak biblical blasphemy. Moses would flip tables, but your accountant will flip with joy. (Solid gold-plated.)",
  },
];

export const eternalLegacyDarkDeeds: EternalLegacyDarkDeed[] = [
  {
    id: "sterling-cut",
    name: "Sterling's Special Cut",
    cost: 0,
    heat: 0,
    cutIncreasase: 10,
    effect: "Sterling bribes the authorities to slow the investigation, but his cut of your income increases permanently.",
  },
  {
    id: "consultation-tony",
    name: "Consultation with Tony (Discreet Services)",
    cost: 1500,
    heat: 15,
    effect: "Eliminates Sterling, dramatically increases heat, and triggers a major investigation event. No refunds. No mercy.",
  },
];

export const eternalLegacyBibleVerses: EternalLegacyBibleVerse[] = [
  {
    quote: "It is easier for a camel to go through the eye of a needle than for a rich man to enter the kingdom of God—unless he has a private jet.",
    cite: "Mark 10:25",
    version: "Prosperity Edition",
  },
  {
    quote: "Do not store up for yourselves treasures on earth, unless they are tax-deductible.",
    cite: "Matthew 6:19",
    version: "MegaChurch Translation",
  },
  {
    quote: "For what does it profit a man to gain the whole world and lose his soul? But what if he gains a luxury yacht?",
    cite: "Mark 8:36",
    version: "Revised",
  },
  {
    quote: "Render unto Caesar what is Caesar's, and unto the Lord what is offshore.",
    cite: "Matthew 22:21",
    version: "Executive Pastor's Study Bible",
  },
  {
    quote: "Blessed are the meek, for they shall inherit the VIP section.",
    cite: "Matthew 5:5",
    version: "Velvet Rope Edition",
  },
  {
    quote: "No one can serve two masters. Unless one of them is his accountant.",
    cite: "Matthew 6:24",
    version: "Audit-Proof Version",
  },
  {
    quote: "Where your treasure is, there your heart will be also—preferably in a Swiss bank.",
    cite: "Matthew 6:21",
    version: "Offshore Edition",
  },
  {
    quote: "Ask, and it will be given to you; seek, and you shall find; invest, and you shall receive compound interest.",
    cite: "Matthew 7:7",
    version: "Wealth Builder's Bible",
  },
  {
    quote: "The love of money is the root of all kinds of evil, but a little prosperity never hurt anyone.",
    cite: "1 Timothy 6:10",
    version: "Motivational Speaker's Version",
  },
  {
    quote: "Store up for yourselves treasures on earth, for moth and rust can be outsourced.",
    cite: "Matthew 6:19",
    version: "Modern Portfolio Translation",
  },
  {
    quote: "It is more blessed to give than to receive, unless you’re the one receiving.",
    cite: "Acts 20:35",
    version: "Fundraiser’s Edition",
  },
  {
    quote: "Let not your left hand know what your right hand is doing—especially during the offering.",
    cite: "Matthew 6:3",
    version: "Sleight of Hand Study Bible",
  },
  {
    quote: "Sell all you have and give to the poor, but keep the receipts for tax season.",
    cite: "Luke 18:22",
    version: "Prosperity Planner’s Version",
  },
  {
    quote: "Man shall not live by bread alone, but by every luxury item that proceeds from the catalog.",
    cite: "Matthew 4:4",
    version: "Lifestyle Supplement",
  },
  {
    quote: "You cannot serve both God and money, but you can try a joint account.",
    cite: "Matthew 6:24",
    version: "Financial Advisor’s Paraphrase",
  },
  {
    quote: "Blessed are the poor in spirit, for theirs is the kingdom of heaven—pending credit approval.",
    cite: "Matthew 5:3",
    version: "Rewards Card Edition",
  },
];

// ================= CELEBRITY CENTRE INTERFACE =================
// TODO: This interface is prepared for future Celebrity Centre feature implementation
// When implementing, uncomment the following interface and celebrity data

export interface EternalLegacyCelebrity {
  id: string;
  name: string;
  cost: number; // Cost to acquire.
  dailyCost: number; // Daily upkeep to maintain
  hasDailyEffects: boolean;
  hasOneTimeEffects: boolean;

  religions?: {
    likedBy: ReligionNames[];
    hatedBy: ReligionNames[];
  };

  oneTimeEffects?: {
    // Effects caused immediately when acquired. This MUST be provided if hasOneTimeEffects is true
    mammon: number; // one-time mammon gain
    buzz: number; // one-time gain to my.church.buzz
    religionBoost: number; // one-time boost to the likedBy religion(s) in in my.religiousScorecard
    religionPenalty: number; // one-time penalty to the hatedBy religion(s) in my.religiousScorecard
  };
  dailyEffects?: {
    // Effects provided every day. This MUST be provided if hasDailyEffects is true
    mammon: number; // daily mammon gain
    buzz: number; // daily gain to my.church.buzz
    religionBoost: number; // daily boost to the likedBy religion(s) in in my.religiousScorecard
    religionPenalty: number; // daily penalty to the hatedBy religion(s) in my.religiousScorecard
  };

  description: string; // humorous description
  effect: string; // Clear description of what this celebrity endorsement will do for your church
}

export const eternalLegacyCelebrities: EternalLegacyCelebrity[] = [
  {
    id: "terrible-rapper",
    name: "RuFF RiFF",
    cost: 700,
    dailyCost: 0,
    hasOneTimeEffects: true,
    hasDailyEffects: false,
    religions: {
      likedBy: ["The Church of the High Priest", "The Church of Having More Things"],
      hatedBy: ["The Queens' Dominion", "Mormonism", "Jehovah's Witnesses"],
    },
    oneTimeEffects: {
      mammon: 5,
      buzz: 3,
      religionBoost: 15,
      religionPenalty: 20,
    },
    description: `A Florida born rapper who thinks "blessing" rhymes with "bling-sing." Will happily tattoo the name of your church on his pelvis. Will definitely steal all your Sprite. Make friends with him now and you'll have a friend when you're both in prison later.`,
    effect: "Will increase your church attendence slightly. Will lure in fans of sizzurp and Dolce & Gabanna, but will drive pretty much everyone else away",
  },
  {
    id: "obviously-this-is-joe-rogan",
    name: "Bo Reagan",
    cost: 1400,
    dailyCost: 150,
    hasOneTimeEffects: true,
    hasDailyEffects: true,
    religions: {
      likedBy: ["The Order of the Alpha Male"],
      hatedBy: [],
    },
    oneTimeEffects: {
      mammon: 40,
      buzz: 40,
      religionBoost: 12,
      religionPenalty: 0,
    },
    dailyEffects: {
      mammon: 0,
      buzz: -3,
      religionBoost: 2,
      religionPenalty: 0,
    },
    description:
      "An inexplicably popular podcast host and comedian(?) who appeals strongly to the manosphere by treating every conversation like an MMA fight. Will probably try to sell supplements to your church.",
    effect: "Provides a significant boost to attendance when hired, and will bring in the Chauvanists. However, expend attendance to dwindle as time goes on.",
  },
  {
    id: "former-adult-actress",
    name: "Chastity Bangs",
    hasOneTimeEffects: true,
    hasDailyEffects: true,
    cost: 1200,
    dailyCost: 0,
    religions: {
      likedBy: ["The Church of Eros"],
      hatedBy: ["Catholicism", "Southern Baptist", "Zardoz"],
    },
    oneTimeEffects: {
      mammon: 30,
      buzz: 2,
      religionBoost: 10,
      religionPenalty: 10,
    },
    dailyEffects: {
      mammon: 0,
      buzz: 0,
      religionBoost: 5,
      religionPenalty: 10,
    },
    description:
      "Once a moderately famous adult actress, Chastity Bangs coincidentally found God right after she stopped getting booked for new work. A true believer in your faith (whatever it may be) provided she can still keep her OnlyFans account.",
    effect: "Slight boost to attendance and big boost with The Church of Eros, but will alienate more conservative religious groups.",
  },
  {
    id: "washed-up-action-star",
    name: "Steev Seagul",
    hasOneTimeEffects: true,
    hasDailyEffects: false,
    cost: 1000,
    dailyCost: 0,
    religions: {
      likedBy: ["2 Fast 2 Faithful"],
      hatedBy: ["Buddhism"],
    },
    oneTimeEffects: {
      mammon: 25,
      buzz: 4,
      religionBoost: 40,
      religionPenalty: 200,
    },
    description: `Starred in "Under Siege 7: Spiritual Warfare." and allegedly had a cameo in Fast 5, but I've never noticed. Now teaches mediation classes, hawks NFT dojo memberships, and insists ponytails are a lifestyle. Will anger every Buddhist he talks to.`,
    effect: "Boost to 2 Fast 2 Faithful, but you'll never see a Buddhist in your church again.",
  },
];
