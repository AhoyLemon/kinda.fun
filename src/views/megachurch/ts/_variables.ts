import { reactive, ref } from "vue";
import { GameSettings, My, UI, Sermon, Spice } from "./_types";

export const gameSettings = reactive<GameSettings>({
  baseDonation: 0.25, // Base donation per follower
  isDebug: false,
  isDebugButtonVisible: true,
  themesPerDay: 25, // How many themes are available to choose from each day
  donationCalculation: {
    scoreMultiplierMin: 1, // Minimum score multiplier for donations
    scoreMultiplierMax: 12, // Maximum score multiplier for donations
    scoreDivisor: 2, // Divides net score to get multiplier (score/2)
    netWorthMultiplierMin: 0.75, // Minimum net worth multiplier
    netWorthMultiplierMax: 2, // Maximum net worth multiplier
    netWorthDivisor: 150000, // Divides avg net worth for multiplier calculation
    fallbackBaseDonation: 0.18, // Fallback if gameSettings.baseDonation not set
    strengthBoostMultiplier: 1.5, // Multiplier for preacher donation strength
    roundingFactor: 100, // For rounding to nearest cent (Math.round(x * 100) / 100)
  },
  sermonScoring: {
    likedTagMultiplier: 1, // Base multiplier for liked tags
    likedTagDoubledMultiplier: 2, // Multiplier when tag matches player's religion
    dislikedTagMultiplier: 1, // Base multiplier for disliked tags
    dislikedTagHalvedMultiplier: 0.5, // Reduced multiplier for certain disliked tags
    dislikedTagDoubledMultiplier: 2, // Increased multiplier for certain disliked tags
    likedReligionMultiplier: 3, // Multiplier for religions that like the player
    likedReligionDoubledMultiplier: 2, // Additional multiplier for matching religion
    dislikedReligionMultiplier: 3, // Multiplier for religions that dislike the player
    dislikedReligionDoubledMultiplier: 2, // Additional multiplier for matching religion
    religionDirectMatchMultiplier: 2, // Direct religion match bonus in street preaching
    enthusiasmMin: 0.1, // Minimum enthusiasm multiplier
    enthusiasmMax: 2.0, // Maximum enthusiasm multiplier
    enthusiasmDivisor: 10, // Divides net score for enthusiasm calculation
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
    daysToUnlock: 2, // Days requird to unlock the van
    cost: 200, // Price to buy the van from Uncle Harold
    fixedGasPrice: 1, // Fixed cost for any travel
    gasPricePerMile: 0.1, // Per-mile gas cost (not used yet)
  },
});

export const ui = reactive<UI>({
  view: "sermon", // Start with sermon selection instead of religion
  selectedTopics: [null, null, null],
  religionIndex: 0,
  placeIndex: 0,
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
  },
});

export const my = reactive<My>({
  name: "",
  daysPlayed: 0,
  money: 0,
  totalMoneyEarned: 0,
  religion: {},
  place: {},
  lucre: [],
  preacherStrengths: {
    gatherCrowd: 1, // Muliplier for gathering crowd size
    getDonations: 1, // Multiplier for donation amounts
    getFollowers: 1, // Multiplier for follower gains
    loseFollowers: 1, // Multiplier for follower losses (lower is better)
    getLikes: 1, // Multiplier for likes
    getDislikes: 1, // Multiplier for dislikes (lower is better)
  },
  selectedTopics: [null, null, null], // TODO: Move this to ui.selectedTopics
  followerCount: 0,
  followers: [],
  isStreetPreaching: true, // Start as street preacher
  hasVan: false, // Can't travel yet
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
  followerChanges: [],
  audienceReactions: [],
  donationsYesterday: 0,
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
  },
});
