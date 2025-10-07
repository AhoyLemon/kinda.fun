import { reactive } from "vue";
import { GameSettings, My, UI, Place } from "./_types";
import { places } from "./_places";

export const gameSettings = reactive<GameSettings>({
  baseDonation: 0.25, // Base donation per follower
  isDebug: false,
  isDebugButtonVisible: true,
  themesPerDay: 25, // How many themes are available to choose from each day
  triggers: {
    sterling: {
      days: 0, // Minimum days for Sterling to contact you
      totalEarnings: 0, // Minimum total earnings for Sterling to contact you
    },
    harold: {
      days: 1, // Minimum play days for Harold to contact you
    },
  },
  streetPreaching: {
    // ===== MAJOR TWEAKS =====
    baseCrowdSize: 40, // Base crowd size that shows up to listen

    dislikeChance: {
      byReligion: 20, // % chance of disliking when sermon attacks their religion (increased)
      byTag: 20, // % chance of disliking when sermon attacks a tag they like (increased)
    },
    likeChance: {
      byReligion: 35, // % chance of liking when sermon praises their religion
      byTag: 25, // % chance of liking when sermon praises a tag they like
    },
    donation: {
      chance: 80, // % chance that someone who likes your sermon donates
      min: 1, // Minimum $ per donation
      max: 3, // Maximum $ per donation
    },

    // ===== MINOR TUNING =====
    randomCrowdVariation: 0.2, // +/- 20% variation in crowd size
    mixedMessageThreshold: 2, // Number of religions affected to show "a lot of people" vs specific names
  },
  spice: {
    pricePerUnit: 5, // Fixed price per unit of spice
    addictionProgression: 0.25, // How much requiredAmount increases per unit consumed above requirement (4 excess units = +1 requirement)
    penaltyPerUnit: 0.15, // Penalty percentage per unit short of requirement (15% per unit)
    bonusPerUnit: 0.08, // Bonus percentage per unit above requirement (8% per unit)
    maxBonus: 0.25, // Maximum bonus cap (25%)
    maxPenalty: 0.8, // Maximum penalty cap (80% reduction)
  },
  van: {
    cost: 200, // Price to buy the van from Uncle Harold
    fixedGasPrice: 1, // Fixed cost for any travel
    gasPricePerMile: 0.1, // Per-mile gas cost (not used yet)
  },
  churchPreaching: {
    expectedFirstTimeAttendees: 50, // How many first time attendees show up at a new church
    religionMatchBonus: 200, // Percent bonus to both like and dislike checks if the church's religion matches the attendee's religion
    dislikeChance: {
      byReligion: 30,
      byTag: 30,
    },
    likeChance: {
      byReligion: 45,
      byTag: 35,
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
      cutPercentage: 35,
      minimumCut: 20,
    },
    sterlingCutPercentage: 35, // Sterling's cut of daily donations
    sterlingMinimumCut: 20, // Minimum amount (in dollars) Sterling takes
    topicRepetitionPenalty: 0.85, // Penalty multiplier for repeating topics (default 15% less effective)
  },
  church: {
    merch: {
      holyWaterBottles: {
        cost: 5, // cost to the player (per item)
        baseChance: 15, // base % chance per attendee to buy
      },
      holyWaterVendingMachine: {
        cost: 500,
        bonusChance: 10, // additional % chance
      },
      bluetoothPrayerCandles: {
        cost: 20, // cost to the player (per item)
        baseChance: 8, // base % chance per attendee to buy
      },
      saintsFlow: {
        cost: 3, // cost to the player (per item)
        baseChance: 20, // base % chance per attendee to buy
      },
    },
    upgrades: {
      extraPews: {
        cost: 200, // costPerPew
        capacityIncrease: 20, // how many more people per pew
      },
      vipConfessionBooths: {
        cost: 1000,
        revenuePerUse: 25,
      },
      audioVisual: {
        cost: 800,
        likeBoost: 15, // % boost to like chances
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
    },
  },
});

export const ui = reactive<UI>({
  view: "sermon", // Start with sermon selection instead of religion
  selectedTopics: [null, null, null],
  religionIndex: 0,
  placeIndex: 0,
  churchLocationIndex: 0,
  churchReligionIndex: 0,
  toastDuration: 7000, // Default toast duration in ms
  timing: {
    toastDelayMin: 1600, // Minimum delay between audience reaction toasts (ms)
    toastDelayMax: 3200, // Maximum delay between audience reaction toasts (ms)
    donationToastDelay: 6000, // Delay before showing donation toast after reactions (ms)
    resultsViewDelay: 6000, // Delay before switching to results view (ms)
    churchToastOffset: 1000, // Time offset for church follower toasts (ms)
  },
  chats: {
    plug: {
      isOpen: false,
    },
    harold: {
      isOpen: false,
    },
    sterling: {
      isOpen: false,
    },
  },
  workshopZone: {
    isOpen: false,
    showBanner: true, // Show banner on first access
  },
});

export const my = reactive<My>({
  name: "",
  daysPlayed: 0,
  money: 1000,
  totalMoneyEarned: 0,
  religion: {},
  place: places[0],
  lucre: [],
  preacherStrengths: {
    gatherCrowd: 1, // Muliplier for gathering crowd size
    getDonations: 1, // Multiplier for donation amounts
    getLikes: 1, // Multiplier for likes
    getDislikes: 1, // Multiplier for dislikes (lower is better)
  },
  selectedTopics: [null, null, null], // TODO: Move this to ui.selectedTopics
  isStreetPreaching: true, // Start as street preacher
  hasVan: true, // Can't travel yet
  canBuyVan: false, // Whether van purchase option is available
  hasTraveledToday: false, // Track if player has traveled today
  inventory: [], // For future upgrades
  dailyThemes: [], // Today's available themes
  sermonToday: {
    topics: [],
    likedBy: {
      tags: [],
      religions: [],
    },
    dislikedBy: {
      tags: [],
      religions: [],
    },
    mixedMessages: {
      tags: [],
      religions: [],
    },
  },
  sermonYesterday: {
    topics: [],
    likedBy: {
      tags: [],
      religions: [],
    },
    dislikedBy: {
      tags: [],
      religions: [],
    },
    mixedMessages: {
      tags: [],
      religions: [],
    },
  },
  effectYesterday: [],
  religiousScorecard: [],
  audienceReactions: [],
  donationsYesterday: 0,
  churchAttendanceYesterday: 0,
  churchDonorsYesterday: 0,
  streetAttendanceYesterday: 0,
  streetDonorsYesterday: 0,
  sterlingCutYesterday: 0,
  playerShareYesterday: 0,
  merchRevenueYesterday: 0,
  confessionRevenueYesterday: 0,
  merchSalesDetailsYesterday: {
    holyWater: { sold: 0, revenue: 0 },
    prayerCandles: { sold: 0, revenue: 0 },
    energyDrinks: { sold: 0, revenue: 0 },
  },
  // Church-related properties
  church: {
    isFounded: false,
    name: undefined,
    location: undefined,
    religion: undefined,
    buzz: 0,
    maxAttendance: 100, // Maximum number of attendees in your church on any given day
    upgrades: {
      extraPews: 0,
      vipConfessionBooths: false,
      audioVisual: false,
      sacrament: {
        wine: {
          level: 0,
          name: "No Wine",
        },
        bread: {
          level: 0,
          name: "No Bread",
        },
      },
    },
    merch: {
      holyWater: {
        isUnlocked: false,
        price: 10, // selling price
        inventory: 0,
        soldToday: 0,
        totalSold: 0,
        isVendingMachine: false,
      },
      energyDrinks: {
        isUnlocked: false,
        price: 5,
        inventory: 0,
        soldToday: 0,
        totalSold: 0,
      },
      prayerCandles: {
        isUnlocked: false,
        price: 25,
        inventory: 0,
        soldToday: 0,
        totalSold: 0,
      },
    },
  },
  marketing: {
    generalAdActive: false,
    targetedAd: {
      active: false,
      targetReligion: null,
    },
    signSpinnerActive: false,
  },
  congregation: [],
  spice: {
    isAddicted: true,
    requiredAmount: 2, // Start with needing 2 units per day
    canOverperform: true,
    fatalAmount: 10, // Taking 10+ units in one day is fatal
    consumedToday: 0, // Track today's consumption
    pendingAddictionIncrease: 0, // Track addiction increase for tomorrow
    spiceToDeliver: 0, // Spice ordered but not yet delivered
  },
  chats: {
    plug: {
      totalOrders: 0, // Track total orders made to The Plug
      chatHistory: [], // Chat message history with The Plug
    },
    harold: {
      hasContacted: false, // Whether Harold has made initial contact
      chatHistory: [], // Chat message history with Uncle Harold
    },
    sterling: {
      hasContacted: false, // Whether Sterling has made initial contact
      moneyOwed: 0, // Money currently owed to Sterling
      totalPayments: 0, // Total money paid to Sterling
      chatHistory: [], // Chat message history with Sterling Silver
    },
  },
});
