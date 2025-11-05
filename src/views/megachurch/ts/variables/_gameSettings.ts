import { reactive } from "vue";
import { GameSettings } from "../_types";

import { eternalLegacyShopItems, eternalLegacyDarkDeeds, eternalLegacyBibleVerses, eternalLegacyCelebrities } from "./_eternalLegacy";

export const gameSettings = reactive<GameSettings>({
  baseDonation: 0.25, // Base donation per follower
  isDebug: false,
  isDebugButtonVisible: false,
  themesPerDay: 25, // How many themes are available to choose from each day
  triggers: {
    sterling: {
      daysWithVan: 3, // Days the player must own a van before being contacted by Sterling.
    },
    harold: {
      days: 3, // Minimum play days for Harold to contact you
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
      byReligion: 50, // % chance of liking when sermon praises their religion
      byTag: 30, // % chance of liking when sermon praises a tag they like
    },
    donation: {
      chance: 70, // % chance that someone who likes your sermon donates
      min: 1, // Minimum $ per donation
      max: 7, // Maximum $ per donation
    },

    // ===== MINOR TUNING =====
    randomCrowdVariation: 0.2, // +/- 20% variation in crowd size
    mixedMessageThreshold: 2, // Number of religions affected to show "a lot of people" vs specific names
  },
  spice: {
    pricePerUnit: 5, // Fixed price per unit of spice
    addictionProgression: 0.25, // How much requiredAmount increases per unit consumed above requirement (4 excess units = +1 requirement)
    penaltyPerUnit: 0.2, // Penalty percentage per unit short of requirement (20% per unit)
    bonusPerUnit: 0.175, // Bonus percentage per unit above requirement (17.5% per unit)
    maxBonus: 1, // Maximum bonus cap (100%)
    maxPenalty: 0.8, // Maximum penalty cap (80% reduction)
  },
  van: {
    cost: 75, // Price to buy the van from Uncle Harold
    fixedGasPrice: 20, // Fixed cost for any travel
    gasPricePerMile: 0.1, // Per-mile gas cost (not used yet)
  },
  churchPreaching: {
    expectedAttendees: 85, // How many first time attendees show up at a new church
    religionMatchBonus: 200, // Percent bonus to both like and dislike checks if the church's religion matches the attendee's religion
    dislikeChance: {
      byReligion: 35,
      byTag: 35,
    },
    likeChance: {
      byReligion: 80,
      byTag: 50,
    },
    donation: {
      chance: 80, // % chance that someone who likes your sermon donates
      min: 5, // Minimum $ per donation
      max: 50, // Maximum $ per donation
    },
    sterling: {
      cutPercentage: 33, // Sterling's cut of church earnings
      minimumCut: 50, // Minimum amount (in dollars) if cutPercentage isn't met
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
        price: 150, // Base price, will be doubled each purchase
        buzzBoost: 15, // Permanent buzz increase per purchase
        purchaseCount: 0, // Track how many times purchased for escalating cost
      },
      targetedAd: {
        price: 400,
        targetReligionBoost: 40, // % boost to target religion attendance
        duration: 3, // Increased from 1 to 3 days
      },
      signSpinner: {
        price: 20, // Per day cost
        attendanceBoost: 10,
        duration: 1, // Will be multiplied by selected days
        maxDays: 7, // Maximum days that can be hired at once
      },
      prCampaign: {
        price: 250, // Increased from 200
        reputationBoost: 5, // Permanent points to add to religious scorecard
        duration: 0, // 0 means permanent effect
      },
    },
  },
  eternalLegacy: {
    trigger: {
      churchDays: 3, // Days after founding church to trigger Eternal Legacy
    },
    heat: {
      max: 100, // Maximum heat before endgame
      dailyBaseIncrease: 9, // Base daily heat increase
      earningsMultiplier: 0.01, // Heat increase per dollar earned
    },
    shop: {
      mammonItems: eternalLegacyShopItems,
      darkDeeds: eternalLegacyDarkDeeds,
      celebrities: eternalLegacyCelebrities,
    },
    bibleVerses: eternalLegacyBibleVerses,
  },
});
