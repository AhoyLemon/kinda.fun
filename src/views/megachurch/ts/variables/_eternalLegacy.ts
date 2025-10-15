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
    mammon: 5,
    description: "For miracles, mischief, and plausible deniability. The entry-level idolator's tool.",
  },
  {
    id: "silver-pieces",
    name: "Thirty Pieces of Silver",
    cost: 1500,
    mammon: 25,
    description: "A collector's set for the truly committed betrayer. Includes certificate of authenticity.",
  },
  {
    id: "pearl-gates-keychain",
    name: "Pearl Gates Keychain",
    cost: 3000,
    mammon: 50,
    description: "Why wait for heaven when you can carry the keys now? Now with faux pearl inlay.",
  },
  {
    id: "led-hubcaps",
    name: "LED Hubcaps (Custom Name)",
    cost: 5000,
    mammon: 80,
    description: "Let your chariot proclaim His glory in scrolling RGB. Custom text available.",
  },
  {
    id: "diamond-cufflinks",
    name: "Diamond-Encrusted Cufflinks",
    cost: 8000,
    mammon: 120,
    description: "For when you need to shine at the Lord's table—and the IRS audit.",
  },
  {
    id: "gold-card-holder",
    name: "Solid Gold Business Card Holder",
    cost: 12000,
    mammon: 180,
    description: "Blessed are those who network in style. Impress the angels and the auditors.",
  },
  {
    id: "babylonian-robes",
    name: "Babylonian Luxury Robes",
    cost: 16000,
    mammon: 240,
    description: "Fit for a king, or at least a cautionary tale. Dry clean only.",
  },
  {
    id: "platinum-chalice",
    name: "Platinum Chalice",
    cost: 20000,
    mammon: 300,
    description: "Because the blood of Christ deserves nothing less than 24k. Dishwasher safe!",
  },
  {
    id: "diamond-grillz",
    name: "Diamond Fronts (Grillz)",
    cost: 25000,
    mammon: 375,
    description: "Let your smile dazzle the congregation and blind your enemies. Not dentist recommended.",
  },
  {
    id: "crystal-pulpit",
    name: "Crystal Pulpit",
    cost: 30000,
    mammon: 450,
    description: "Transparency in all things, except finances. Includes LED underlighting.",
  },
  {
    id: "marble-baptismal",
    name: "Marble Baptismal Pool",
    cost: 35000,
    mammon: 525,
    description: "For baptisms that truly make a splash. Imported Italian marble.",
  },
  {
    id: "baal-idol",
    name: "Idol of Baal",
    cost: 40000,
    mammon: 600,
    description: "For when you want to hedge your bets on the afterlife. Now with extra horns.",
  },
  {
    id: "pharaoh-chariot",
    name: "Pharaoh's Chariot (Golf Cart Edition)",
    cost: 45000,
    mammon: 675,
    description: "For when you want to ride in style—straight into the Red Sea. Street legal in most gated communities.",
  },
  {
    id: "golden-calf",
    name: "Golden Calf (3ft, Gold-Plated)",
    cost: 50000,
    mammon: 750,
    description: "A 3-foot high gold-plated sculpture. The original idol investment. (Definitely not solid gold.)",
  },
];

export const eternalLegacyDarkDeeds: EternalLegacyDarkDeed[] = [
  // {
  //   id: "shredder",
  //   name: "Shredder Upgrade",
  //   cost: 1200,
  //   heat: 5,
  //   effect: "Temporarily slows heat gain, but lowers church reputation and reduces weekly donations.",
  // },
  {
    id: "sterling-cut",
    name: "Sterling's Special Cut",
    cost: 0,
    heat: 0,
    effect: "Sterling bribes the authorities to slow the investigation, but his cut of your income increases permanently.",
  },
  // {
  //   id: "tax-attorney",
  //   name: "Tax Attorney Retainer",
  //   cost: 2200,
  //   heat: 15,
  //   effect: "Reduces the amount you must pay Sterling, but increases heat and causes a scandal in your congregation.",
  // },
  {
    id: "consultation-tony",
    name: "Consultation with Tony (Discreet Services)",
    cost: 2500,
    heat: 30,
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
