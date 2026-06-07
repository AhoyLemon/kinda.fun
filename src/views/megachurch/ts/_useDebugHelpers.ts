import { places } from "./_places";
import { gameSettings } from "./variables/_gameSettings";
import type { My, UI } from "./_types";

/* eslint-disable no-unused-vars */
interface ToastApi {
  (content: any, options?: Record<string, any>): void;
  success(content: any, options?: Record<string, any>): void;
  warning(content: any, options?: Record<string, any>): void;
  error(content: any, options?: Record<string, any>): void;
  info(content: any, options?: Record<string, any>): void;
}

interface DebugArgs {
  my: My;
  ui: UI;
  toast: ToastApi;
  logGameplayToFirebase: (
    eventType: string,
    data?: Record<string, any>,
  ) => void | Promise<void>;
}

interface DebugCallbacks {
  triggerEternalLegacy: () => void;
  updateHeat: (amount: number) => void;
  triggerHaroldContact: () => void;
  triggerSterlingContact: () => void;
}
/* eslint-enable no-unused-vars */

export function useDebugHelpers(
  { my, ui, toast, logGameplayToFirebase }: DebugArgs,
  callbacks: DebugCallbacks,
) {
  // === Debug Functions ===

  function debugAddMoney() {
    my.money += 1000000;
    toast.success("Okay, here's a million dollars.");
    logGameplayToFirebase("cheatUsed", { name: "+$1,000,000" });
  }

  function debugGetVan() {
    my.hasVan = true;
    logGameplayToFirebase("cheatUsed", { name: "Get Van" });
  }

  function debugTriggerSpeedPreaching() {
    if (ui.timing.toastDelayMin != 1) {
      ui.timing.toastDelayMin = 1;
      ui.timing.toastDelayMax = 10;
      ui.timing.donationToastDelay = 500;
      ui.timing.resultsViewDelay = 5;
      ui.timing.churchToastOffset = 1;
      toast.success("🐇 Speed Preaching ACTIVATED");
    } else {
      ui.timing.toastDelayMin = 1600;
      ui.timing.toastDelayMax = 3200;
      ui.timing.donationToastDelay = 6000;
      ui.timing.resultsViewDelay = 6000;
      ui.timing.churchToastOffset = 1000;
      toast.error("🐢 Speed Preaching deactivated");
    }
    logGameplayToFirebase("cheatUsed", { name: "Speed Preaching" });
  }

  function debugTriggerEternalLegacy() {
    // Set up church if not founded
    if (!my.church.isFounded) {
      my.church.isFounded = true;
      my.church.name = "DEBUG CHURCH";
      my.church.location = places[Math.floor(Math.random() * places.length)];
      my.church.religion =
        my.religiousScorecard[
          Math.floor(Math.random() * my.religiousScorecard.length)
        ];
      my.chats.sterling.hasContacted = true;
      toast.info("DEBUG: Church auto-founded for Eternal Legacy testing");
      my.place = { ...my.church.location };
      my.isStreetPreaching = false;
    }

    if (!my.eternalLegacy.isActive) {
      callbacks.triggerEternalLegacy();
      toast.success("DEBUG: Eternal Legacy phase manually triggered!");
    } else {
      toast.warning("Eternal Legacy is already active!");
    }
    logGameplayToFirebase("cheatUsed", { name: "Trigger Eternal Legacy" });
  }

  function debugAddHeat() {
    if (my.eternalLegacy.isActive) {
      callbacks.updateHeat(10);
      toast.info(
        `DEBUG: Added 10 heat. Current: ${my.eternalLegacy.heat}/${gameSettings.eternalLegacy.heat.max}`,
      );
    } else {
      toast.warning("Eternal Legacy must be active to add heat!");
    }
    logGameplayToFirebase("cheatUsed", { name: "Add Heat (+10)" });
  }

  function debugTriggerHarold() {
    if (!my.chats.harold.hasContacted) {
      callbacks.triggerHaroldContact();
      toast.success("DEBUG: Harold initial contact triggered!");
      ui.chats.harold.isOpen = true;
    } else {
      toast.warning("Harold has already been contacted!");
    }
    logGameplayToFirebase("cheatUsed", { name: "Trigger Harold" });
  }

  function debugTriggerSterling() {
    if (!my.chats.sterling.hasContacted) {
      toast.success("DEBUG: Sterling initial contact triggered!");
      callbacks.triggerSterlingContact();
    } else {
      toast.warning("Sterling has already been contacted!");
    }
    logGameplayToFirebase("cheatUsed", { name: "Trigger Sterling" });
  }

  function toggleDebugMode() {
    gameSettings.isDebug = !gameSettings.isDebug;
    if (gameSettings.isDebug) {
      console.log("Debug mode enabled");
    } else {
      console.log("Debug mode disabled");
    }
  }

  return {
    debugAddMoney,
    debugGetVan,
    debugTriggerSpeedPreaching,
    debugTriggerEternalLegacy,
    debugAddHeat,
    debugTriggerHarold,
    debugTriggerSterling,
    toggleDebugMode,
  };
}
