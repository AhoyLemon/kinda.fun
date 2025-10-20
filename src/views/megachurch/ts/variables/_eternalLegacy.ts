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
  cost?: number; // One-time cost for permanent effects
  mammon: number; // Cost in mammon points
  dailyCost?: number; // Daily cost for ongoing effects
  religion?: ReligionNames; // Name of the religion that this celebrity is popular with
  buzzBoost?: number; // One-time boost to my.church.buzz
  religionBoost?: number; // One-time boost to specific religion in my.religiousScorecard
  description: string; // humorous description
  effect: string; // Clear description of what this celebrity endorsement will do for your church
  dayEndorsed?: number; // Day of celebrity acquisition
}

export const eternalLegacyCelebrities: EternalLegacyCelebrity[] = [
  {
    id: "terrible-rapper",
    name: "RuFF RiFF",
    mammon: 5,
    dailyCost: 85,
    buzzBoost: 3,
    description: `A Florida born rapper who thinks "blessing" rhymes with "bling-sing." Will happily tattoo the name of your church on his pelvis. Will definitely steal all your Sprite. Make friends with him now and you'll have a friend when you're both in prison later.`,
    effect: "Daily cost: $85. Provides +25 permanent buzz to attract younger crowds to your church.",
  },
  {
    id: "obviously-this-is-joe-rogan",
    name: "Bo Reagan",
    mammon: 20,
    dailyCost: 110,
    religion: "The Order of the Alpha Male",
    buzzBoost: 22,
    religionBoost: 12,
    description:
      "An inexplicably popular podcast host and comedian(?) who appeals strongly to the manosphere by treating every conversation like an MMA fight. Will probably try to sell supplements to your church.",
    effect: "Overall attendance boost and a improved following with The Order of the Alpha Male",
  },

  {
    id: "former-adult-actress",
    name: "Chastity Bangs",
    cost: 1200,
    mammon: 30,
    buzzBoost: -20,
    religion: "The Church of Eros",
    religionBoost: 35,
    description:
      "Once a moderately famous adult actress, Chastity Bangs coincidentally found God right after she stopped getting booked for new work. A true believer in your faith (whatever it may be) provided she can still keep her OnlyFans account.",
    effect: "One-time cost: $1,200. +12 permanent buzz, but may attract controversial attention.",
  },
  {
    id: "washed-up-action-star",
    name: "Steev Seagul",
    mammon: 25,
    dailyCost: 140,
    religion: "2 Fast 2 Faithful",
    religionBoost: 25,
    description: `Starred in "Under Siege 7: Spiritual Warfare." and allegedly had a cameo in Fast 5, but I've never noticed. Now teaches mediation classes, hawks NFT dojo memberships, and insists ponytails are a lifestyle. Will anger every Buddhist he talks to.`,
    effect: "Boost to 2 Fast 2 Faithful, penalty to Buddhists.",
  },
  {
    id: "haul-influencer",
    name: 'Tiffani "Tiff Da Shoppa" Bagwell',
    mammon: 10,
    cost: 500,
    religion: "The Church of Having More Things",
    buzzBoost: 12,
    religionBoost: 15,
    description: `A frankly irritatingly upbeat YouTube influencer from the Indiana who believes happiness is measured in shopping bags. Tiff’s daily haul videos feature her buying everything from scented candles to bulk glitter glue, and her catchphrase "I Shop Therefore I'm Tiff!" has become a hit among her 13.7M followers, assuredly none of whom have read René Descartes`,
    effect: "Slight boost to attendance and big boost with The Church of Having More Things",
  },
];
