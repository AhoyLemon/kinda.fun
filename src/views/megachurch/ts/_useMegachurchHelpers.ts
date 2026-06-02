import { type Component, type ComputedRef, type Ref } from "vue";
import { POSITION } from "vue-toastification";

import { religions } from "./_religions";
import { places } from "./_places";
import { generateDailyThemesSelection } from "./_functions";
import { gameSettings } from "./variables/_gameSettings";
import type { Place, Religion, My, UI } from "./_types";

import { useSermonFlow } from "./_useSermonFlow";
import { useChatHelpers } from "./_useChatHelpers";
import { useSpiceDayHelpers } from "./_useSpiceDayHelpers";
import { useEternalLegacy } from "./_useEternalLegacy";
import { useDebugHelpers } from "./_useDebugHelpers";

/* eslint-disable no-unused-vars */
interface ToastApi {
  (content: any, options?: Record<string, any>): void;
  success(content: any, options?: Record<string, any>): void;
  warning(content: any, options?: Record<string, any>): void;
  error(content: any, options?: Record<string, any>): void;
  info(content: any, options?: Record<string, any>): void;
}

interface MegachurchHelpersArgs {
  my: My;
  ui: UI;
  toast: ToastApi;
  sterlingNoteRef: Ref<{ showNote: () => void } | null>;
  computedTopicsYesterday: ComputedRef<number[]>;
  logGameplayToFirebase: (
    eventType: string,
    data?: Record<string, any>,
  ) => void | Promise<void>;
  ListenerToast: Component;
  DonationToast: Component;
  MerchToast: Component;
}
/* eslint-enable no-unused-vars */

export function useMegachurchHelpers({
  my,
  ui,
  toast,
  sterlingNoteRef,
  computedTopicsYesterday,
  logGameplayToFirebase,
  ListenerToast,
  DonationToast,
  MerchToast,
}: MegachurchHelpersArgs) {
  let advanceToNextDayFn: () => void = () => {};

  function startNewGame() {
    localStorage.setItem("kindaFunPlayerName", my.name);
    ui.view = "sermon";
  }

  function chooseReligion(religionId: number) {
    const religion = religions.find((r) => r.id === religionId);
    if (religion) {
      my.religion = religion;
    } else {
      alert("Religion not found.");
    }
    ui.view = "place";
  }

  function choosePlace(placeId: number) {
    const place = places.find((p) => p.id === placeId);
    if (place) {
      my.place = { ...place };
      advanceToNextDayFn();
    } else {
      alert("Place not found.");
    }
  }

  // ========== UTILITY FUNCTIONS ==========
  function getReligion(id: number): Religion | {} {
    if (!id) {
      return { name: "Unknown" };
    }
    const religion = religions.find((r) => r.id === id);
    if (!religion) {
      return { name: "Unknown" };
    }
    return religion;
  }

  function getPlace(id: number): Place | {} {
    const place = places.find((p) => p.id === id);
    if (!id) {
      return {};
    } else {
      return place;
    }
  }

  // ========== TRAVEL & LOCATION ==========

  // Travel with van
  function travelToPlace(placeId: number) {
    if (!my.hasVan || my.hasTraveledToday) return;

    // Check if player can afford gas
    if (my.money < gameSettings.van.fixedGasPrice) {
      toast.error("You don't have enough money for gas!");
      return;
    }

    // Charge for gas
    my.money -= gameSettings.van.fixedGasPrice;
    my.hasTraveledToday = true;

    // Change location
    choosePlace(placeId);
  }

  // ========== CHURCH SETUP ==========
  function foundChurch() {
    if (!my.church.name || !ui.churchLocationIndex || !ui.churchReligionIndex) {
      return;
    }

    const churchLocation = places.find((p) => p.id === ui.churchLocationIndex);
    const churchReligion = religions.find(
      (r) => r.id === ui.churchReligionIndex,
    );

    if (churchLocation && churchReligion) {
      my.church.isFounded = true;
      my.church.location = { ...churchLocation };
      my.church.religion = { ...churchReligion };
      my.isStreetPreaching = false; // No longer street preaching
      my.congregation = []; // Initialize empty congregation

      // Log church founding to Firebase
      logGameplayToFirebase("churchFounded", {
        location: churchLocation.name,
        religion: my.church.religion.name,
        churchName: my.church.name,
      });

      // Send message to Sterling confirming the church
      const confirmationMessage = {
        id: Date.now(),
        sender: "sterling",
        text: `Excellent choice, ${my.name}. The ${my.church.name} in ${churchLocation.name} will serve us well. Remember our arrangement - I expect my cut every day.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      my.chats.sterling.chatHistory.push(confirmationMessage);

      // Close Sterling chat and go back to game
      ui.chats.sterling.isOpen = false;
      ui.view = "sermon";

      // Show success toast
      toast.success(`${my.church.name} has been established!`);
    }
    if (my.place.name != my.church.location.name) {
      my.place = { ...my.church.location };
      toast.info(`You have moved to ${my.church.location.name}.`);
    }

    // Check if player needs spice for tomorrow and provide church-warming gift
    const spiceNeeded = my.spice.requiredAmount;
    const spiceOrdered = my.spice.spiceToDeliver;
    const spiceShortage = Math.max(0, spiceNeeded - spiceOrdered);

    if (spiceShortage > 0) {
      // The Plug sends free spice as church-warming gift
      my.spice.spiceToDeliver += spiceShortage;

      // Show toast about the gift
      toast.success(
        `The Plug sent you ${spiceShortage} units of spice as a church-warming gift!`,
        {
          position: POSITION.TOP_CENTER,
          timeout: 5000,
        },
      );

      // Add chat history
      const plugMessage = {
        id: Date.now(),
        sender: "plug",
        text: `Just heard about ${my.church.name}. Enjoy the gift.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const playerMessage = {
        id: Date.now() + 1,
        sender: "player",
        text: "You are my only true friend.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      my.chats.plug.chatHistory.push(plugMessage);
      my.chats.plug.chatHistory.push(playerMessage);
    }

    advanceToNextDayFn();
  }

  function cancelChurchSetup() {
    ui.view = "sermon-results";
    ui.chats.sterling.isOpen = false;
  }

  function generateDailyThemes() {
    my.dailyThemes = generateDailyThemesSelection();
  }

  function initialiseScoreCard() {
    my.religiousScorecard = religions.map((r) => ({
      id: r.id,
      name: r.name,
      score: 0,
    }));
  }

  function initialiseStartingLocation() {
    // Set the starting location (id: 0)
    const startingLocation = places.find((p: any) => p.id === 0);
    if (startingLocation) {
      my.place = { ...startingLocation };
    }
  }

  function initialiseGame() {
    initialiseScoreCard();
    initialiseStartingLocation();
    generateDailyThemes();
  }

  const elHelpers = useEternalLegacy({ my, ui, toast, logGameplayToFirebase });
  const chatHelpers = useChatHelpers({
    my,
    ui,
    toast,
    sterlingNoteRef,
    logGameplayToFirebase,
  });
  const spiceDayHelpers = useSpiceDayHelpers(
    { my, ui, toast, logGameplayToFirebase },
    {
      travelToPlace,
      choosePlace,
      processCelebrityDailyEffects: elHelpers.processCelebrityDailyEffects,
      updateHeat: elHelpers.updateHeat,
      generateDailyThemes,
      checkEternalLegacyTrigger: elHelpers.checkEternalLegacyTrigger,
      triggerPlugContact: chatHelpers.triggerPlugContact,
      triggerEndGame: elHelpers.triggerEndGame,
    },
  );
  advanceToNextDayFn = spiceDayHelpers.advanceToNextDay;

  const sermonFlow = useSermonFlow(
    {
      my,
      ui,
      toast,
      computedTopicsYesterday,
      logGameplayToFirebase,
      ListenerToast,
      DonationToast,
      MerchToast,
    },
    {
      getSpiceMultiplier: spiceDayHelpers.getSpiceMultiplier,
      trackMoneyEarned: chatHelpers.trackMoneyEarned,
      processCelebrityMerchSales: elHelpers.processCelebrityMerchSales,
      processCelebrityDailyCosts: elHelpers.processCelebrityDailyCosts,
      endTheDay: spiceDayHelpers.endTheDay,
    },
  );
  const debugHelpers = useDebugHelpers(
    { my, ui, toast, logGameplayToFirebase },
    {
      triggerEternalLegacy: elHelpers.triggerEternalLegacy,
      updateHeat: elHelpers.updateHeat,
      triggerHaroldContact: chatHelpers.triggerHaroldContact,
      triggerSterlingContact: chatHelpers.triggerSterlingContact,
    },
  );

  return {
    startNewGame,
    chooseReligion,
    choosePlace,
    getReligion,
    getPlace,
    travelToPlace,
    foundChurch,
    cancelChurchSetup,
    generateDailyThemes,
    initialiseScoreCard,
    initialiseStartingLocation,
    initialiseGame,
    ...sermonFlow,
    ...chatHelpers,
    ...spiceDayHelpers,
    ...elHelpers,
    ...debugHelpers,
  };
}
