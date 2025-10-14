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
    toastDuration: 7000,
    donationToastDuration: 7000,
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
    defaultTab: "merch", // Default tab to open
  },
  eternalLegacyShop: {
    isOpen: false,
  },
  sterlingVoicemail: {
    isOpen: false,
  },
  seraphAINag: {
    hasShown: false,
  },
  wakingUp: {
    showTitle: false,
    showSubtitle: false,
    showForm: false,
  },
});
