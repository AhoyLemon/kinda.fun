import { gameSettings } from "./variables/_gameSettings";
import { spiceSniffs } from "./variables/_sounds";
import type { My, UI } from "./_types";

/* eslint-disable no-unused-vars */
interface ToastApi {
  (content: any, options?: Record<string, any>): void;
  success(content: any, options?: Record<string, any>): void;
  warning(content: any, options?: Record<string, any>): void;
  error(content: any, options?: Record<string, any>): void;
  info(content: any, options?: Record<string, any>): void;
}

interface SpiceDayArgs {
  my: My;
  ui: UI;
  toast: ToastApi;
  logGameplayToFirebase: (
    eventType: string,
    data?: Record<string, any>,
  ) => void | Promise<void>;
}

interface SpiceDayCallbacks {
  travelToPlace: (placeId: number) => void;
  choosePlace: (placeId: number) => void;
  processCelebrityDailyEffects: () => void;
  updateHeat: (amount: number) => void;
  generateDailyThemes: () => void;
  checkEternalLegacyTrigger: () => void;
  triggerPlugContact: () => void;
  triggerEndGame: (cause: "drug overdose" | "prison") => void;
}
/* eslint-enable no-unused-vars */

export function useSpiceDayHelpers(
  { my, ui, toast, logGameplayToFirebase }: SpiceDayArgs,
  callbacks: SpiceDayCallbacks,
) {
  // ================= DAY MANAGEMENT =================
  function endTheDay() {
    ui.view = "sermon-results";

    // Firebase logging for first game start
    if (my.daysPlayed < 1) {
      logGameplayToFirebase("gameStarted");
    }

    // Firebase logging for day ended
    const dayLogData = {
      preachedOnStreet:
        !my.church?.location?.name ||
        my.church?.location?.name !== my.place.name,
      preachedInChurch:
        my.church?.location?.name && my.church.location.name === my.place.name,
      seraphAIActive: my.church.upgrades.seraphAI,
      sermonTopics: my.sermonToday.topics || [],
    };
    logGameplayToFirebase("dayEnded", dayLogData);

    // Check for Plug auto-introduction on first day
    if (my.daysPlayed < 1 && !my.chats.plug.hasContacted) {
      setTimeout(() => {
        callbacks.triggerPlugContact();
      }, 2000);
    }

    // Show Workshop Zone banner after first day of preaching with a founded church
    // Only show once on the first night after founding a church
    if (
      my.church.isFounded &&
      my.church.days === 1 &&
      !ui.worshopZone.hasSeenBanner
    ) {
      setTimeout(() => {
        toast.info(
          "You have been served with a pop up ad relevant to your interests.",
          {
            timeout: 3000,
          },
        );
        ui.worshopZone.showBanner = true;
        ui.worshopZone.hasSeenBanner = true; // Mark as seen so it won't show again
      }, 2500);
    }

    // Is it time for Sterling's voicemail?
    callbacks.checkEternalLegacyTrigger();
  }

  // ================= SPICE MECHANICS =================
  function getSpiceMultiplier() {
    // Returns a multiplier for preacher strengths based on consumption vs requirement
    const consumed = my.spice.consumedToday;
    const required = my.spice.requiredAmount;
    const shortage = Math.max(0, required - consumed);
    const excess = Math.max(0, consumed - required);

    let multiplier = 1;

    if (shortage > 0) {
      // Apply penalty for not meeting requirements
      const penalty = Math.min(
        gameSettings.spice.maxPenalty,
        shortage * gameSettings.spice.penaltyPerUnit,
      );
      multiplier = 1 - penalty;
    } else if (excess > 0 && my.spice.canOverperform) {
      // Apply bonus for excess consumption
      const bonus = Math.min(
        gameSettings.spice.maxBonus,
        excess * gameSettings.spice.bonusPerUnit,
      );
      multiplier = 1 + bonus;
    }

    return Math.max(0.1, multiplier); // Never go below 10% effectiveness
  }

  function progressAddiction() {
    // Calculate addiction progression but don't apply it yet
    const consumed = my.spice.consumedToday;
    const required = my.spice.requiredAmount;
    const excess = Math.max(0, consumed - required);

    if (excess > 0) {
      // If you took more than you need, this gets added to your pending addiction as a float.
      const newIncrease = excess * gameSettings.spice.addictionProgression;
      my.spice.pendingAddictionIncrease =
        my.spice.pendingAddictionIncrease + newIncrease;
    }
  }

  function applyPendingAddiction() {
    // Apply addiction progression that was calculated yesterday
    if (my.spice.pendingAddictionIncrease > 0) {
      const pendingAddictionIncreaseInteger = Math.floor(
        my.spice.pendingAddictionIncrease,
      );

      if (pendingAddictionIncreaseInteger > 0) {
        my.spice.requiredAmount += pendingAddictionIncreaseInteger;
        my.spice.pendingAddictionIncrease -= pendingAddictionIncreaseInteger;
      }
    }
    return false; // No change
  }

  function resetDailySpice() {
    // Calculate but don't apply addiction progression yet
    progressAddiction();

    // DON'T reset daily consumption here - it happens just before purchase screen
  }

  // ================= SPICE DELIVERY SYSTEM =================
  function openPlugInterface() {
    ui.chats.plug.isOpen = true;
  }

  function closePlugInterface() {
    ui.chats.plug.isOpen = false;
  }

  function showWorshopZone() {
    if (ui.worshopZone.showBanner && my.church.isFounded) {
      ui.worshopZone.showBanner = true;
    } else {
      ui.worshopZone.isOpen = true;
      ui.churchInventory.isOpen = true; // Auto-open ChurchInventory when WorshopZone opens
    }
  }

  function closeWorshopZone() {
    ui.worshopZone.isOpen = false;
    ui.worshopZone.showBanner = false;
    ui.churchInventory.isOpen = false; // Auto-close ChurchInventory when WorshopZone closes
  }

  function handleWorkshopPurchase(purchaseData: any) {
    // Log workshop purchases to Firebase
    logGameplayToFirebase("workshopPurchase", purchaseData);
  }

  function onBannerAccepted() {
    ui.worshopZone.showBanner = false;
    ui.worshopZone.isOpen = true;
    // Auto-open ChurchInventory when WorshopZone opens
    ui.churchInventory.isOpen = true;
  }

  function openWorshopZoneForSeraph() {
    // Mark nag as shown and open Workshop Zone to Upgrades tab
    ui.seraphAINag.hasShown = true;
    ui.worshopZone.defaultTab = "upgrades";
    ui.worshopZone.isOpen = true;
    // Auto-open ChurchInventory when WorshopZone opens
    ui.churchInventory.isOpen = true;
  }

  function dismissSeraphNag() {
    ui.seraphAINag.hasShown = true;
  }

  function handlePlugOrder(orderData) {
    if (orderData.amount > 0) {
      // Process the actual order
      my.chats.plug.totalOrders++;
      my.spice.spiceToDeliver += orderData.amount;
      my.money -= orderData.cost;

      // Show delivery notification for first-time users
      if (my.chats.plug.totalOrders <= 2) {
        toast.info("🚚 Your spice will be delivered in the morning", {
          timeout: 2500,
        });
      }
    }

    if (orderData.messages) {
      // Add messages to chat history
      orderData.messages.forEach((message) => {
        // Replace typing indicator if specified (use in-place update for smooth transitions)
        if (message.replaceTyping) {
          const typingMessage = my.chats.plug.chatHistory.find(
            (m) => m.isTyping && m.sender === "plug",
          );
          if (typingMessage) {
            // Update the existing message object instead of removing and adding
            typingMessage.text = message.text;
            typingMessage.time = message.time;
            typingMessage.isTyping = false;
          }
        } else {
          // Add new message normally
          my.chats.plug.chatHistory.push(message);
        }
      });
    }
  }

  function deliverOrderedSpice() {
    if (my.spice.spiceToDeliver > 0) {
      // Auto-consume delivered spice
      my.spice.consumedToday = my.spice.spiceToDeliver;

      // Log spice consumption to Firebase
      logGameplayToFirebase("spiceTaken", { amount: my.spice.spiceToDeliver });

      // Show delivery notification
      const statusMessages = {
        under: "⚠️ You're still under-dosed",
        optimal: "You're now feeling normal",
        over: "⚡ You're feeling enhanced",
      };

      let status = "optimal";
      if (my.spice.consumedToday < my.spice.requiredAmount) {
        status = "under";
      } else if (my.spice.consumedToday > my.spice.requiredAmount) {
        status = "over";
      }

      if (my.spice.consumedToday < my.spice.fatalAmount) {
        toast.success(
          `${my.spice.spiceToDeliver} spice taken. ${statusMessages[status]}.`,
          {
            timeout: 4000,
          },
        );
        // Determine the sound to play based on spice consumption
        const difference = my.spice.consumedToday - my.spice.requiredAmount;
        let sniffType: string;
        if (difference <= -2) {
          sniffType = "tiny";
        } else if (difference === -1) {
          sniffType = "small";
        } else if (difference === 0) {
          sniffType = "medium";
        } else if (difference === 1) {
          sniffType = "large";
        } else {
          sniffType = "huge";
        }

        // Play the appropriate sound
        spiceSniffs.play(sniffType);
      }

      // Clear delivery queue
      my.spice.spiceToDeliver = 0;
    }
  }

  function handleNextDayClick() {
    const spiceOrdered = my.spice.spiceToDeliver;
    if (my.spice.spiceToDeliver > 0 || ui.spiceWarning.disregard === true) {
      advanceToNextDay();
      return;
    }

    // Check if player has ordered enough spice for tomorrow
    const spiceNeeded = my.spice.requiredAmount;
    const spiceShortage = Math.max(0, spiceNeeded - spiceOrdered);
    const spiceCost = gameSettings.spice.pricePerUnit;
    const canAfford = Math.floor(my.money / spiceCost);

    // Set context to sermon
    ui.spiceWarning.context = "sermon";

    if (canAfford >= spiceShortage) {
      ui.spiceWarning.show = true;
      ui.spiceWarning.message = `You haven't bought any spice for tomorrow. You really want to go out there and do this sober?`;
      ui.spiceWarning.show = true;
    } else if (canAfford > 0) {
      ui.spiceWarning.message = `You haven't bought any spice for tomorrow. I know you can only afford ${canAfford}, but maybe that's better than nothing?`;
      ui.spiceWarning.show = true;
    } else {
      // Show === false, proceed with toast message instead of overlay
      toast.warning(
        `Looks like you're preaching without drugs again. Good luck with that!`,
      );
      advanceToNextDay();
      return;
    }
  }

  function proceedWithoutSpice() {
    ui.spiceWarning.show = false;
    if (ui.spiceWarning.context === "travel") {
      const placeId = ui.placeIndex;
      if (my.hasVan) {
        callbacks.travelToPlace(placeId);
      } else {
        callbacks.choosePlace(placeId);
      }
    } else {
      advanceToNextDay();
    }
  }

  function openPlugFromWarning() {
    ui.spiceWarning.show = false;
    openPlugInterface();
  }

  // Travel click handler that uses the existing spice warning system
  function handleTravelClick() {
    const placeId = ui.placeIndex;
    const spiceOrdered = my.spice.spiceToDeliver;

    if (my.spice.spiceToDeliver > 0 || ui.spiceWarning.disregard === true) {
      if (my.hasVan) {
        callbacks.travelToPlace(placeId);
      } else {
        callbacks.choosePlace(placeId);
      }
      return;
    }

    // Check if player has ordered enough spice for tomorrow
    const spiceNeeded = my.spice.requiredAmount;
    const spiceShortage = Math.max(0, spiceNeeded - spiceOrdered);
    const spiceCost = gameSettings.spice.pricePerUnit;
    const canAfford = Math.floor(my.money / spiceCost);

    const drugBudgetAfterGas =
      canAfford -
      gameSettings.van.fixedGasPrice / gameSettings.spice.pricePerUnit;

    // Set context to travel
    ui.spiceWarning.context = "travel";

    if (canAfford >= spiceShortage) {
      ui.spiceWarning.show = true;
      ui.spiceWarning.message = `You haven't bought any spice for tomorrow. Want to order some before you drive? The Plug will deliver to your new location.`;
      ui.spiceWarning.affordableAmount = drugBudgetAfterGas;
    } else if (canAfford > 0) {
      ui.spiceWarning.show = true;
      ui.spiceWarning.message = `You haven't bought any spice for tomorrow. I know you can only afford ${canAfford}, but maybe that's better than nothing? The Plug will deliver to your new location.`;
      ui.spiceWarning.affordableAmount = drugBudgetAfterGas;
    } else {
      // Show === false, proceed with toast message instead of overlay
      toast.warning(
        `Looks like you're traveling without drugs. Good luck with that!`,
      );
      if (my.hasVan) {
        callbacks.travelToPlace(placeId);
      } else {
        callbacks.choosePlace(placeId);
      }
      return;
    }
  }

  function advanceToNextDay() {
    my.daysPlayed += 1;
    if (!my.chats.sterling.hasContacted && my.hasVan) {
      my.chats.sterling.daysWithVan += 1;
    }

    // Apply celebrity daily effects at the beginning of the day
    callbacks.processCelebrityDailyEffects();

    // Update heat if Eternal Legacy is active
    if (my.eternalLegacy.isActive) {
      callbacks.updateHeat(gameSettings.eternalLegacy.heat.dailyBaseIncrease);
      if (my.eternalLegacy.heat >= gameSettings.eternalLegacy.heat.max) {
        return; // Endgame triggered
      }
    }

    // Calculate pending addiction BEFORE resetting spice consumption
    resetDailySpice();

    // Spice wears off at the end of the day (AFTER addiction calculation)
    my.spice.consumedToday = 0;

    // Reset van travel for the day
    my.hasTraveledToday = false;

    // Update marketing effects (decrement days remaining for temporary effects)
    // General Ad is permanent (buzz boost), so no reset needed
    // Sign Spinner: decrement days remaining
    if (
      my.marketing.signSpinner.active &&
      my.marketing.signSpinner.daysRemaining > 0
    ) {
      my.marketing.signSpinner.daysRemaining -= 1;
      if (my.marketing.signSpinner.daysRemaining <= 0) {
        my.marketing.signSpinner.active = false;
      }
    }
    // Targeted Ad: decrement days remaining
    if (
      my.marketing.targetedAd.active &&
      my.marketing.targetedAd.daysRemaining > 0
    ) {
      my.marketing.targetedAd.daysRemaining -= 1;
      if (my.marketing.targetedAd.daysRemaining <= 0) {
        my.marketing.targetedAd.active = false;
        my.marketing.targetedAd.targetReligion = null;
      }
    }
    // PR Campaign is permanent, no reset needed

    // Process daily Seraph AI subscription cost
    my.seraphAICostYesterday = 0;
    if (my.church.upgrades.seraphAI) {
      const dailyCost = gameSettings.church.upgrades.seraphAI.cost;
      if (my.money >= dailyCost) {
        my.money -= dailyCost;
        my.seraphAICostYesterday = dailyCost;
      } else {
        // Can't afford subscription - deactivate service
        my.church.upgrades.seraphAI = false;
        toast.warning(
          "Seraph AI subscription cancelled due to insufficient funds.",
        );
      }
    }

    // Generate new daily themes for tomorrow
    callbacks.generateDailyThemes();

    // reset daily effects.
    my.effectYesterday = [];
    my.sermonToday = {
      topics: [],
      likedBy: { tags: [], religions: [] },
      dislikedBy: { tags: [], religions: [] },
      mixedMessages: { tags: [], religions: [] },
    };
    ui.selectedTopics = [null, null, null];

    // Start the morning routine (delivery, then show sermon selection)
    startMorningRoutine();
  }

  function startMorningRoutine() {
    // Apply pending addiction increase from yesterday
    const addictionIncreased = applyPendingAddiction();

    // Deliver any ordered spice first thing in the morning
    deliverOrderedSpice();

    // Show notification if addiction increased
    if (addictionIncreased) {
      setTimeout(() => {
        toast.warning(
          `Your spice addiction has worsened! You now need ${Math.ceil(my.spice.requiredAmount)} units daily.`,
        );
      }, 1000);
    }

    if (my.spice.consumedToday >= my.spice.fatalAmount) {
      callbacks.triggerEndGame("drug overdose");
    } else {
      ui.view = "sermon";
    }
  }

  return {
    endTheDay,
    getSpiceMultiplier,
    progressAddiction,
    applyPendingAddiction,
    resetDailySpice,
    openPlugInterface,
    closePlugInterface,
    showWorshopZone,
    closeWorshopZone,
    handleWorkshopPurchase,
    onBannerAccepted,
    openWorshopZoneForSeraph,
    dismissSeraphNag,
    handlePlugOrder,
    deliverOrderedSpice,
    handleNextDayClick,
    proceedWithoutSpice,
    openPlugFromWarning,
    handleTravelClick,
    advanceToNextDay,
    startMorningRoutine,
  };
}
