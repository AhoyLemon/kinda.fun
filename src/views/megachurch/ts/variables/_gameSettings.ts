import { reactive } from "vue";
import { GameSettings } from "../_types";
import { b } from "vitest/dist/chunks/suite.d.FvehnV49";
export const gameSettings = reactive<GameSettings>({
  baseDonation: 0.25, // Base donation per follower
  isDebug: false,
  isDebugButtonVisible: true,
  themesPerDay: 25, // How many themes are available to choose from each day
  triggers: {
    sterling: {
      daysWithVan: 3, // Days the player must own a van before being contacted by Sterling.
    },
    harold: {
      days: 1, // Minimum play days for Harold to contact you
    },
  },
  streetPreaching: {
    // ===== MAJOR TWEAKS =====
    baseCrowdSize: 75, // Base crowd size that shows up to listen
    dislikeChance: {
      byReligion: 40, // % chance of disliking when sermon attacks their religion (increased)
      byTag: 35, // % chance of disliking when sermon attacks a tag they like (increased)
    },
    likeChance: {
      byReligion: 30, // % chance of liking when sermon praises their religion
      byTag: 20, // % chance of liking when sermon praises a tag they like
    },
    donation: {
      chance: 70, // % chance that someone who likes your sermon donates
      min: 1, // Minimum $ per donation
      max: 5, // Maximum $ per donation
    },

    // ===== MINOR TUNING =====
    randomCrowdVariation: 0.2, // +/- 20% variation in crowd size
    mixedMessageThreshold: 2, // Number of religions affected to show "a lot of people" vs specific names
  },
  spice: {
    pricePerUnit: 5, // Fixed price per unit of spice
    addictionProgression: 0.25, // How much requiredAmount increases per unit consumed above requirement (4 excess units = +1 requirement)
    penaltyPerUnit: 0.2, // Penalty percentage per unit short of requirement (20% per unit)
    bonusPerUnit: 0.125, // Bonus percentage per unit above requirement (12.5% per unit)
    maxBonus: 1, // Maximum bonus cap (100%)
    maxPenalty: 0.8, // Maximum penalty cap (80% reduction)
  },
  van: {
    cost: 75, // Price to buy the van from Uncle Harold
    fixedGasPrice: 20, // Fixed cost for any travel
    gasPricePerMile: 0.1, // Per-mile gas cost (not used yet)
  },
  churchPreaching: {
    expectedAttendees: 70, // How many first time attendees show up at a new church
    religionMatchBonus: 200, // Percent bonus to both like and dislike checks if the church's religion matches the attendee's religion
    dislikeChance: {
      byReligion: 30,
      byTag: 30,
    },
    likeChance: {
      byReligion: 70,
      byTag: 40,
    },
    donation: {
      chance: 80, // % chance that someone who likes your sermon donates
      min: 2, // Minimum $ per donation
      max: 10, // Maximum $ per donation
    },
    donationPerAttendee: {
      min: 5, // Minimum donation per attendee
      max: 20, // Maximum donation per attendee
    },
    sterling: {
      cutPercentage: 35, // Sterling's cut of church earnings
      minimumCut: 30, // Minimum amount (in dollars) if cutPercentage isn't met
    },
    topicRepetitionPenalty: 0.85, // Penalty multiplier for repeating topics (default 15% less effective)
  },
  church: {
    buzzMultiplier: 0.1, // How much buzz affects attendance (buzz * multiplier = extra attendees)
    merch: {
      holyWater: {
        cost: 5, // cost to the player (per item)
        baseChance: 15, // base % chance per attendee to buy
      },
      holyWaterVendingMachine: {
        cost: 500,
        bonusChance: 25, // additional % chance
      },
      prayerCandles: {
        cost: 20, // cost to the player (per item)
        baseChance: 8, // base % chance per attendee to buy
      },
      weightLossTea: {
        cost: 4,
        baseChance: 10,
      },
      beachTowel: {
        cost: 12,
        baseChance: 4,
      },
      exorcismKit: {
        cost: 35,
        baseChance: 2,
      },
    },
    upgrades: {
      extraPews: {
        cost: 200, // costPerPew
        capacityIncrease: 10, // how many more people per pew
        maxPews: 10, // maximum number of extra pews that can be purchased
      },
      vipConfessionBooths: {
        cost: 1000,
        revenuePerUse: 25,
      },
      audioVisual: {
        cost: 800,
        likeBoost: 15, // % boost to like chances
      },
      seraphAI: {
        cost: 10, // Daily subscription cost
        description: "AI-powered sermon analysis and audience prediction",
        daysBeforeNag: 2, // How many church days before showing the nag
      },
      sacraments: {
        wine: {
          levels: [
            { level: 0, name: "No Wine", cost: 0, likeBoost: 0 },
            { level: 1, name: "Kirkland Merlot", cost: 50, likeBoost: 5 },
            {
              level: 2,
              name: "Kendall-Jackson Vintner's Reserve",
              cost: 150,
              likeBoost: 10,
            },
            { level: 3, name: "Dom Pérignon", cost: 500, likeBoost: 20 },
          ],
        },
        bread: {
          levels: [
            { level: 0, name: "No Bread", cost: 0, likeBoost: 0 },
            { level: 1, name: "Wonder Bread", cost: 25, likeBoost: 3 },
            { level: 2, name: "Artisan Sourdough", cost: 75, likeBoost: 8 },
            { level: 3, name: "Gold-Flaked Brioche", cost: 200, likeBoost: 15 },
          ],
        },
      },
    },
    marketing: {
      generalAd: {
        price: 100,
        attendanceBoost: 25, // % boost to attendance
        duration: 1, // days
      },
      targetedAd: {
        price: 150,
        targetReligionBoost: 40, // % boost to target religion attendance
        duration: 1,
      },
      signSpinner: {
        price: 50,
        attendanceBoost: 10,
        duration: 1,
      },
      prCampaign: {
        price: 200,
        reputationBoost: 5, // Points to add to religious scorecard for target religion
        duration: 1,
      },
    },
  },
  eternalLegacy: {
    trigger: {
      churchDays: 3, // Days after founding church to trigger Eternal Legacy
    },
    heat: {
      max: 100, // Maximum heat before endgame
      dailyBaseIncrease: 5, // Base daily heat increase
      earningsMultiplier: 0.01, // Heat increase per dollar earned
    },
    shop: {
      mammonItems: [
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
      ],
      darkDeeds: [
        {
          id: "shredder",
          name: "Shredder Upgrade",
          cost: 1200,
          heat: 5,
          effect: "Temporarily slows heat gain, but lowers church reputation and reduces weekly donations.",
        },
        {
          id: "sterling-cut",
          name: "Sterling's Special Cut",
          cost: 1800,
          heat: 10,
          effect: "Sterling bribes the authorities to slow the investigation, but his cut of your income increases permanently.",
        },
        {
          id: "tax-attorney",
          name: "Tax Attorney Retainer",
          cost: 2200,
          heat: 15,
          effect: "Reduces the amount you must pay Sterling, but increases heat and causes a scandal in your congregation.",
        },
        {
          id: "consultation-tony",
          name: "Consultation with Tony (Discreet Services)",
          cost: 2500,
          heat: 30,
          effect: "Eliminates Sterling, dramatically increases heat, and triggers a major investigation event. No refunds.",
        },
      ],
    },
    bibleVerses: [
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
    ],
  },
});
