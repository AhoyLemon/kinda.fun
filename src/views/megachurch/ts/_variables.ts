import { reactive, ref } from "vue";
import { Sermon, Spice } from "./_types";

export const gameSettings = reactive({
  baseDonation: 0.25, // Base donation per follower
  isDebug: false,
  isDebugButtonVisible: true,
  themesPerDay: 25, // How many themes are available to choose from each day
  streetPreaching: {
    audienceEngagement: 60, // What % of potential audience actually stops to listen (higher = more listeners)
    likeThreshold: 0, // netScore needed for likes (lower = easier to get likes)
    dislikeThreshold: -1, // netScore needed for dislikes (higher = easier to get dislikes, use negative numbers)
    likePercentage: 35, // % of engaged audience that likes when threshold met (higher = more likes)
    dislikePercentage: 35, // % of engaged audience that dislikes when threshold met (higher = more dislikes)
    baselikePercentage: 10, // % that likes even without meeting threshold (higher = more baseline likes)
    baseDislikePercentage: 8, // % that dislikes even without meeting threshold (higher = more baseline dislikes)
    donationMin: 0.25, // Minimum $ per person who liked (higher = more money)
    donationMax: 2, // Maximum $ per person who liked (higher = more money)
    audienceScaleDivisor: 1000, // Population scaling factor for street preaching audience
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
});

interface UI {
  view:
    | "religion"
    | "place"
    | "place-confirm"
    | "sermon"
    | "sermon-confirm"
    | "preaching"
    | "sermon-results";
  selectedTopics: [number | null, number | null, number | null];
  religionIndex: number;
  placeIndex: number;
  toastDuration: number;
  timing: {
    toastDelayMin: number;
    toastDelayMax: number;
    donationToastDelay: number;
    resultsViewDelay: number;
    churchToastOffset: number;
  };
}

export const ui = reactive<UI>({
  view: "sermon", // Start with sermon selection instead of religion
  selectedTopics: [null, null, null],
  religionIndex: 0,
  placeIndex: 0,
  toastDuration: 7000, // Default toast duration in ms
  timing: {
    toastDelayMin: 2100,           // Minimum delay between audience reaction toasts (ms)
    toastDelayMax: 6600,           // Maximum delay between audience reaction toasts (ms)
    donationToastDelay: 5000,      // Delay before showing donation toast after reactions (ms)
    resultsViewDelay: 6000,        // Delay before switching to results view (ms)
    churchToastOffset: 1000,       // Time offset for church follower toasts (ms)
  },
});

export const my = reactive<My>({
  name: "",
  money: 0,
  religion: {},
  place: {},
  lucre: [],
  preacherStrengths: {
    followers: 0.25, // Reduced from 0.4
    donations: 1.2, // Reduced from 2
  },
  selectedTopics: [null, null, null], // TODO: Move this to ui.selectedTopics
  followerCount: 0,
  followers: [],
  isStreetPreaching: true, // Start as street preacher
  hasVan: false, // Can't travel yet
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
  },
});

interface My {
  name: string; // Name of the MegaChurch Owner
  money: number; // How much money you have right now.
  religion: object; // What religion you are claiming
  place: object; // What location are you currently in
  lucre: object[]; // list the trophies you have.
  preacherStrengths: {
    followers: number;
    donations: number;
  }; // Persuasiveness multipliers. How good is your preacher at getting new followers/donations
  selectedTopics: Array<any>; // TODO: Move this to ui.selectedTopics
  followerCount: number; // How many followers you have right now.
  followers: object[]; // List of followers, by religion
  isStreetPreaching: boolean; // True when street preaching vs having a church
  hasVan: boolean; // True when player can travel between locations
  inventory: object[]; // Items/upgrades the player owns
  dailyThemes: Array<any>; // Today's available sermon themes
  sermonToday: Sermon; // What will/did you preach today.
  sermonYesterday: Sermon; // What did you preach yesterday.
  effectYesterday?: any[]; // What effect did your last sermon have?
  religiousScorecard?: any[]; // what does each religion think of you?
  followerChanges?: Array<{
    id: number;
    name: string;
    before: number;
    change: number;
    after: number;
  }>; // Follower change reporting
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
  }>; // Street preaching audience reactions
  donationsYesterday: number; // How much money did you make yesterday?
  spice: Spice; // Spice addiction system
}
