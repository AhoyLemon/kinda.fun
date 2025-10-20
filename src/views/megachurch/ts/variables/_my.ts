import { reactive } from "vue";
import { places } from "../_places";
import { My } from "../_types";

export const my = reactive<My>({
  name: "",
  daysPlayed: 0,
  money: 0,
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
  seraphAICostYesterday: 0, // Daily cost for Seraph AI service
  merchSalesDetailsYesterday: {
    holyWater: { sold: 0, revenue: 0 },
    prayerCandles: { sold: 0, revenue: 0 },
    weightLossTea: { sold: 0, revenue: 0 },
    beachTowel: { sold: 0, revenue: 0 },
    exorcismKit: { sold: 0, revenue: 0 },
  },
  // Church-related properties
  church: {
    isFounded: false,
    name: undefined,
    location: undefined,
    religion: undefined,
    days: 0,
    buzz: 0,
    maxAttendance: 100, // Maximum number of attendees in your church on any given day (can be modified by purchasing extra pews)
    upgrades: {
      extraPews: 0,
      vipConfessionBooths: false,
      audioVisual: false,
      seraphAI: false,
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
        price: 10, // selling price
        inventory: 0,
        soldToday: 0,
        totalSold: 0,
        isVendingMachine: false,
      },
      prayerCandles: {
        price: 65,
        inventory: 0,
        soldToday: 0,
        totalSold: 0,
      },
      weightLossTea: {
        price: 25,
        inventory: 0,
        soldToday: 0,
        totalSold: 0,
      },
      beachTowel: {
        price: 64.99,
        inventory: 0,
        soldToday: 0,
        totalSold: 0,
      },
      exorcismKit: {
        price: 149.99,
        inventory: 0,
        soldToday: 0,
        totalSold: 0,
      },
    },
  },
  marketing: {
    generalAd: {
      purchaseCount: 0, // Number of times purchased for escalating cost
    },
    targetedAd: {
      active: false,
      targetReligion: null,
      daysRemaining: 0, // Days left for effect
    },
    signSpinner: {
      active: false,
      daysRemaining: 0, // Days left for effect
    },
    prCampaign: {
      // PR Campaign now permanent, no active state needed
    },
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
      hasContacted: false, // Whether The Plug has made initial contact
      totalOrders: 0, // Track total orders made to The Plug
      chatHistory: [], // Chat message history with The Plug
    },
    harold: {
      hasContacted: false, // Whether Harold has made initial contact
      chatHistory: [], // Chat message history with Uncle Harold
    },
    sterling: {
      hasContacted: false, // Whether Sterling has made initial contact
      daysWithVan: 0, // Count the days the player has owned a van (triggering initialcontact from Sterling)
      moneyOwed: 0, // Money currently owed to Sterling
      totalPayments: 0, // Total money paid to Sterling
      chatHistory: [], // Chat message history with Sterling Silver
    },
  },
  eternalLegacy: {
    isActive: false,
    heat: 0,
    voicemailPlayed: false,
    voicemailReplayAvailable: false,
    totalMammon: 0,
    totalInfluence: 0,
    purchasedItems: [],
    darkDeeds: [],
    sterlingCutModifier: 0,
    sterlingAlive: true,
  },
  gameOverCause: null,
});
