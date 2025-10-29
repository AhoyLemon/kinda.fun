import { reactive } from "vue";
import { UI } from "../_types";

export const ui = reactive<UI>({
  view: "title-screen", // Start with title screen
  selectedTopics: [null, null, null],
  religionIndex: 0,
  placeIndex: 0,
  isFullscreen: false,
  churchLocationIndex: 0,
  churchReligionIndex: 0,
  timing: {
    toastDuration: 4800,
    donationToastDuration: 7000,
    toastDelayMin: 0, // Minimum delay between audience reaction toasts (ms)
    toastDelayMax: 0, // Maximum delay between audience reaction toasts (ms)
    donationToastDelay: 6000, // Delay before showing donation toast after reactions (ms)
    merchToastDelay: 3000, // Delay before showing merch toast (ms)
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
  worshopZone: {
    isOpen: false,
    showBanner: false, // Will show after first preaching
    hasSeenBanner: false, // Track if player has seen the banner
    defaultTab: "merch", // Default tab to open
  },
  eternalLegacyShop: {
    isOpen: false,
  },
  sterlingVoicemail: {
    isOpen: false,
  },
  churchInventory: {
    isOpen: false,
  },
  legacyStatus: {
    isOpen: false,
  },
  friendshipEnded: {
    isVisible: false,
    celebrity: {},
    reason: "",
    effects: {},
  },
  unfriendConfirmation: {
    isVisible: false,
    celebrity: {},
  },
  seraphAINag: {
    hasShown: false,
  },
  wakingUp: {
    showTitle: false,
    showSubtitle: false,
    showForm: false,
  },
  spiceWarning: {
    show: false,
    message: "",
    affordableAmount: 0,
    disregard: false,
    context: "sermon",
  },
});
