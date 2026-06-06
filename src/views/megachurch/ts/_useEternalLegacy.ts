import { gameSettings } from "./variables/_gameSettings";
import { religions } from "./_religions";
import { soundWhoopsYoureDead, soundInPrison } from "./variables/_sounds";
import type { My, UI } from "./_types";
import { randomNumber, randomFrom } from "../../../shared/ts/_functions";
import { artifactNames } from "./variables/_eternalLegacy";

/* eslint-disable no-unused-vars */
interface ToastApi {
  (content: any, options?: Record<string, any>): void;
  success(content: any, options?: Record<string, any>): void;
  warning(content: any, options?: Record<string, any>): void;
  error(content: any, options?: Record<string, any>): void;
  info(content: any, options?: Record<string, any>): void;
}

interface EternalLegacyArgs {
  my: My;
  ui: UI;
  toast: ToastApi;
  logGameplayToFirebase: (
    eventType: string,
    data?: Record<string, any>,
  ) => void | Promise<void>;
}
/* eslint-enable no-unused-vars */

export function useEternalLegacy({
  my,
  ui,
  toast,
  logGameplayToFirebase,
}: EternalLegacyArgs) {
  // === Eternal Legacy Shop Functions ===

  function showEternalLegacyShop() {
    if (my.eternalLegacy.isActive) {
      ui.eternalLegacyShop.isOpen = true;
      // Auto-open LegacyStatus when EternalLegacyShop opens
      ui.legacyStatus.isOpen = true;
    } else {
      toast.warning("The Eternal Legacy catalog is not yet available.");
    }
  }

  function closeEternalLegacyShop() {
    ui.eternalLegacyShop.isOpen = false;
    // Auto-close LegacyStatus when EternalLegacyShop closes
    ui.legacyStatus.isOpen = false;
  }

  function handleEternalLegacyPurchase({ item, category }) {
    if (item.id === "religious-artifacts") {
      const result = purchaseReligiousArtifacts();
      if (result) {
        toast.warning(`🏺 ${result.artifactName} acquired. +${result.mammon} mammon. Probably fake. 🔥 +${gameSettings.eternalLegacy.darkDeedConfig.religiousArtifacts.heat} heat.`);
      }
      return;
    }

    if (my.money < item.cost) {
      toast.error("Insufficient funds for this divine acquisition.");
      return;
    }

    // Check if item is already owned (different logic for celebrities vs other items)
    if (category === "celebrities") {
      if (my.celebrityFriends.some((c) => c.id === item.id)) {
        toast.warning("You are already friends with this celebrity.");
        return;
      }
      // Check if celebrity has been friended before (prevents re-friending)
      if (my.eternalLegacy.friendedCelebrityIds.includes(item.id)) {
        toast.warning(
          "You have already established a friendship with this celebrity in the past.",
        );
        return;
      }
    } else if (category === "darkDeeds") {
      if (my.eternalLegacy.darkDeeds.some((d) => d.id === item.id)) {
        toast.warning("You already own this item.");
        return;
      }
    } else {
      if (my.eternalLegacy.purchasedItems.includes(item.id)) {
        toast.warning("You already own this item.");
        return;
      }
    }

    // Process purchase
    my.money -= item.cost;

    // Log purchase to Firebase
    const collection =
      category === "mammon"
        ? "mammon"
        : category === "darkDeeds"
          ? "darkDeeds"
          : "celebrities";
    logGameplayToFirebase("eternalLegacyPurchase", {
      name: item.name,
      collection: collection,
    });
    item.dayPurchased = my.daysPlayed + 1;

    if (category === "mammon") {
      my.eternalLegacy.purchasedItems.push(item);
      // Mammon items increase score
      my.eternalLegacy.totalMammon += item.mammon;
    } else if (category === "darkDeeds") {
      my.eternalLegacy.darkDeeds.push(item);

      // Handle Dark Deeds item effects
      updateHeat(item.heat);

      // Apply specific mechanics based on item ID
      switch (item.id) {
        case "sterling-bribe":
          // Increase Sterling's cut permanently
          my.eternalLegacy.sterlingCutModifier += item.cutIncreasase; // Increase Sterling's cut.
          gameSettings.eternalLegacy.heat.dailyBaseIncrease -= 3;
          toast.success(
            `${item.name}: Sterling handles the authorities. His cut of your income increases permanently.`,
          );
          break;

        case "kill-sterling":
          // Eliminate Sterling but massive heat increase
          my.eternalLegacy.sterlingAlive = false;
          toast.error(
            `${item.name}: Sterling has had a terrible accident in the shower! What a shame. Heat increased by ${item.heat}`,
          );
          break;

        case "tax-haven":
          toast.warning(`${item.name}: The IRS is going to love this. +${gameSettings.eternalLegacy.darkDeedConfig.taxHaven.dailyMoney}/day income, +${gameSettings.eternalLegacy.darkDeedConfig.taxHaven.dailyHeat} heat/day.`);
          break;

        case "tariff-evasion":
          toast.success(`${item.name}: Your guy knows a guy. All Worshop Zone merchandise is now 25% cheaper — but expect heat every day you shop.`);
          break;
      }

      if (item.heat > 0) {
        toast.warning(
          `🔥 Heat increased by ${item.heat}! Current: ${my.eternalLegacy.heat}/${gameSettings.eternalLegacy.heat.max}`,
        );
      }
    } else if (category === "celebrities") {
      // Handle celebrity friendship acquisition
      const celebrity = { ...item }; // Make a copy to avoid reference issues

      // Collect all acquisition effects for single toast
      const acquisitionEffects: any = {};
      const religionBoosts: string[] = [];
      const religionPenalties: string[] = [];

      // Apply heat change if celebrity has heat property
      if (celebrity.oneTimeEffects?.heat) {
        updateHeat(celebrity.oneTimeEffects.heat);
        acquisitionEffects.heat = celebrity.oneTimeEffects.heat;
      }

      // Apply one-time effects
      if (celebrity.hasOneTimeEffects && celebrity.oneTimeEffects) {
        if (celebrity.oneTimeEffects.mammon) {
          my.eternalLegacy.totalMammon += celebrity.oneTimeEffects.mammon;
          acquisitionEffects.mammon = celebrity.oneTimeEffects.mammon;
        }

        if (celebrity.oneTimeEffects.buzz) {
          my.church.buzz += celebrity.oneTimeEffects.buzz;
          acquisitionEffects.buzz = celebrity.oneTimeEffects.buzz;
        }

        // Apply religion boosts and penalties
        if (celebrity.religions) {
          if (
            celebrity.religions.likedBy &&
            celebrity.oneTimeEffects.religionBoost
          ) {
            celebrity.religions.likedBy.forEach((religionName) => {
              const religionScore = my.religiousScorecard.find(
                (r) => r.name === religionName,
              );
              if (religionScore) {
                religionScore.score += celebrity.oneTimeEffects.religionBoost;
                religionBoosts.push(
                  `${religionName} (+${celebrity.oneTimeEffects.religionBoost})`,
                );
              }
            });
            acquisitionEffects.religionBoosts = religionBoosts;
          }

          if (
            celebrity.religions.hatedBy &&
            celebrity.oneTimeEffects.religionPenalty
          ) {
            celebrity.religions.hatedBy.forEach((religionName) => {
              const religionScore = my.religiousScorecard.find(
                (r) => r.name === religionName,
              );
              if (religionScore) {
                religionScore.score -= celebrity.oneTimeEffects.religionPenalty;
                religionPenalties.push(
                  `${religionName} (-${celebrity.oneTimeEffects.religionPenalty})`,
                );
              }
            });
            acquisitionEffects.religionPenalties = religionPenalties;
          }
        }
      }

      // Add celebrity to friends list
      my.celebrityFriends.push(celebrity);

      // Track that this celebrity has been friended to prevent re-friending
      my.eternalLegacy.friendedCelebrityIds.push(celebrity.id);
    }

    // Don't auto-close shop - let player continue shopping
  }

  // ================= ETERNAL LEGACY SYSTEM =================
  function checkEternalLegacyTrigger() {
    // Only trigger if church is founded and we haven't already activated Eternal Legacy
    if (!my.church.isFounded || my.eternalLegacy.isActive) {
      return;
    }

    if (my.church.days >= gameSettings.eternalLegacy.trigger.churchDays) {
      triggerEternalLegacy();
    }
  }

  function triggerEternalLegacy() {
    my.eternalLegacy.isActive = true;
    my.eternalLegacy.voicemailReplayAvailable = true;

    // Show voicemail notification
    setTimeout(() => {
      toast.info("You have a new voicemail from Sterling.", {
        timeout: 10000,
      });

      // Open voicemail interface after 3 seconds
      setTimeout(() => {
        ui.sterlingVoicemail.isOpen = true;
      }, 3000);
    }, 1000);
  }

  function playEternalLegacyVoicemail() {
    // This is now called when manually triggering voicemail replay
    ui.sterlingVoicemail.isOpen = true;
  }

  function closeSterlingVoicemail() {
    ui.sterlingVoicemail.isOpen = false;
    my.eternalLegacy.voicemailPlayed = true;
    my.eternalLegacy.heat += gameSettings.eternalLegacy.heat.dailyBaseIncrease;

    // Show heat meter notification
    setTimeout(() => {
      toast.warning(
        "The Heat Meter is now tracking federal attention. Your days are numbered.",
      );
    }, 1000);
  }

  function onVoicemailCompleted() {
    // Handle when the Sterling voicemail playback is completed
    my.eternalLegacy.voicemailPlayed = true;
    my.eternalLegacy.heat += gameSettings.eternalLegacy.heat.dailyBaseIncrease;
  }

  function openEternalLegacyFromVoicemail() {
    my.eternalLegacy.voicemailPlayed = true;
    ui.eternalLegacyShop.isOpen = true;
    // Auto-open LegacyStatus when EternalLegacyShop opens
    ui.legacyStatus.isOpen = true;
  }

  function updateHeat(amount: number) {
    my.eternalLegacy.heat = Math.min(
      my.eternalLegacy.heat + amount,
      gameSettings.eternalLegacy.heat.max,
    );

    // Check for endgame trigger
    if (my.eternalLegacy.heat >= gameSettings.eternalLegacy.heat.max) {
      triggerEndGame("prison");
    }
  }

  function purchaseReligiousArtifacts() {
    const config = gameSettings.eternalLegacy.darkDeedConfig.religiousArtifacts;
    if (my.money < config.cost) {
      toast.error("You can't afford this. Even the terrorist artifact network expects payment.");
      return null;
    }

    my.money -= config.cost;

    const roll = randomNumber(0, 100);
    const tier = config.tiers.find(t => roll < t.threshold) ?? config.tiers[config.tiers.length - 1];
    const artifactName = randomFrom(artifactNames);

    my.eternalLegacy.totalMammon += tier.mammon;
    updateHeat(config.heat);

    const existingDeed = my.eternalLegacy.darkDeeds.find(d => d.id === "religious-artifacts");
    if (existingDeed) {
      existingDeed.purchases = existingDeed.purchases ?? [];
      existingDeed.purchases.push({ day: my.daysPlayed, mammon: tier.mammon, artifactName });
    } else {
      const deedDef = gameSettings.eternalLegacy.shop.darkDeeds.find(d => d.id === "religious-artifacts")!;
      my.eternalLegacy.darkDeeds.push({
        ...deedDef,
        dayPurchased: my.daysPlayed,
        purchases: [{ day: my.daysPlayed, mammon: tier.mammon, artifactName }],
      });
    }

    logGameplayToFirebase("eternalLegacyPurchase", { name: "Smuggle Religious Artifacts", collection: "darkDeeds" });
    return { artifactName, mammon: tier.mammon };
  }

  // === Church Inventory Functions ===

  function openChurchInventory() {
    ui.churchInventory.isOpen = true;
  }

  function closeChurchInventory() {
    ui.churchInventory.isOpen = false;
  }

  // === Legacy Status Functions ===

  function openLegacyStatus() {
    ui.legacyStatus.isOpen = true;
  }

  function closeLegacyStatus() {
    ui.legacyStatus.isOpen = false;
  }

  function closeFriendshipEnded() {
    ui.friendshipEnded.isVisible = false;
  }

  function handleUnfriendCelebrity(celebrity: any) {
    // Show confirmation modal instead of immediately unfriending
    ui.unfriendConfirmation.isVisible = true;
    ui.unfriendConfirmation.celebrity = celebrity;
  }

  function confirmUnfriendCelebrity(celebrity: any) {
    // Close confirmation modal
    ui.unfriendConfirmation.isVisible = false;

    // Remove celebrity from friends list
    const index = my.celebrityFriends.findIndex((c) => c.id === celebrity.id);
    if (index !== -1) {
      my.celebrityFriends.splice(index, 1);
      terminateCelebrityFriendship(celebrity, "voluntary");
    }
  }

  function cancelUnfriendCelebrity() {
    // Close confirmation modal without doing anything
    ui.unfriendConfirmation.isVisible = false;
  }

  // ================= CELEBRITY FRIENDSHIP FUNCTIONS =================

  function processCelebrityDailyEffects() {
    // Apply daily effects at the beginning of the day for all celebrity friends
    my.celebrityFriends.forEach((celebrity) => {
      if (celebrity.hasDailyEffects && celebrity.dailyEffects) {
        const effects: any = {};
        const religionBoosts: string[] = [];
        const religionPenalties: string[] = [];

        // Process mammon effects
        if (celebrity.dailyEffects.mammon) {
          my.eternalLegacy.totalMammon += celebrity.dailyEffects.mammon;
          effects.mammon = celebrity.dailyEffects.mammon;
        }

        // Process buzz effects
        if (celebrity.dailyEffects.buzz) {
          my.church.buzz += celebrity.dailyEffects.buzz;
          effects.buzz = celebrity.dailyEffects.buzz;
        }

        // Apply religion boosts and penalties
        if (celebrity.religions) {
          if (
            celebrity.religions.likedBy &&
            celebrity.dailyEffects.religionBoost
          ) {
            celebrity.religions.likedBy.forEach((religionName) => {
              const religionScore = my.religiousScorecard.find(
                (r) => r.name === religionName,
              );
              if (religionScore) {
                religionScore.score += celebrity.dailyEffects.religionBoost;
                religionBoosts.push(
                  `${religionName} (+${celebrity.dailyEffects.religionBoost})`,
                );
              }
            });
            effects.religionBoosts = religionBoosts;
          }

          if (
            celebrity.religions.hatedBy &&
            celebrity.dailyEffects.religionPenalty
          ) {
            celebrity.religions.hatedBy.forEach((religionName) => {
              const religionScore = my.religiousScorecard.find(
                (r) => r.name === religionName,
              );
              if (religionScore) {
                religionScore.score -= celebrity.dailyEffects.religionPenalty;
                religionPenalties.push(
                  `${religionName} (-${celebrity.dailyEffects.religionPenalty})`,
                );
              }
            });
            effects.religionPenalties = religionPenalties;
          }
        }
      }
    });
  }

  function processCelebrityMerchSales(congregationGroups: any[]) {
    let totalCelebMerchRevenue = 0;
    const celebMerchSales: any[] = [];

    my.celebrityFriends.forEach((celebrity) => {
      if (celebrity.hasMerch && celebrity.merch) {
        let itemsSold = 0;

        // For each congregation group, calculate sales
        congregationGroups.forEach((group) => {
          let chance = celebrity.merch.baseChance;

          // Find the religion for this group
          const religion = religions.find((r: any) => r.id === group.id);

          // Add religion bonus chance if this religion likes the celebrity
          if (
            celebrity.religions?.likedBy &&
            celebrity.merch.religionBonusChance &&
            religion
          ) {
            if (celebrity.religions.likedBy.includes(religion.name)) {
              chance += celebrity.merch.religionBonusChance;
            }
          }

          // Calculate how many items this group will buy
          for (let i = 0; i < group.count; i++) {
            if (Math.random() * 100 < chance) {
              itemsSold++;
            }
          }
        });

        const revenue = itemsSold * celebrity.merch.yourCut;
        totalCelebMerchRevenue += revenue;

        if (itemsSold > 0) {
          celebMerchSales.push({
            celebrityName: celebrity.name,
            itemName: celebrity.merch.name,
            itemsSold,
            revenue,
          });
        }
      }
    });

    return { totalCelebMerchRevenue, celebMerchSales };
  }

  function processCelebrityDailyCosts(totalAvailableFunds: number = my.money) {
    const costsOwed: any[] = [];
    const terminatedFriendships: any[] = [];
    let totalCostsDeducted = 0;

    my.celebrityFriends = my.celebrityFriends.filter((celebrity) => {
      if (celebrity.dailyCost > 0) {
        // Check if total available funds (current money + today's earnings) can cover this cost
        if (totalAvailableFunds >= totalCostsDeducted + celebrity.dailyCost) {
          // Track the cost but don't deduct from my.money yet - that happens after earnings are added
          costsOwed.push({
            name: celebrity.name,
            amount: celebrity.dailyCost,
          });
          totalCostsDeducted += celebrity.dailyCost;
          return true; // Keep the celebrity
        } else {
          // Cannot afford - terminate friendship
          terminateCelebrityFriendship(celebrity, "non-payment");
          terminatedFriendships.push(celebrity);
          return false; // Remove the celebrity
        }
      }
      return true; // Keep celebrities with no daily cost
    });

    return { costsOwed, terminatedFriendships };
  }

  function terminateCelebrityFriendship(
    celebrity: any,
    reason: "voluntary" | "non-payment",
  ) {
    const termination = celebrity.termination;
    const effects: any = {};

    // Apply termination effects
    if (termination.mammonLost) {
      my.eternalLegacy.totalMammon -= termination.mammonLost;
      effects.mammonLost = termination.mammonLost;
    }

    if (termination.buzzLost) {
      my.church.buzz -= termination.buzzLost;
      effects.buzzLost = termination.buzzLost;
    }

    if (termination.religionPenalty && celebrity.religions?.likedBy) {
      celebrity.religions.likedBy.forEach((religionName) => {
        const religionScore = my.religiousScorecard.find(
          (r) => r.name === religionName,
        );
        if (religionScore) {
          religionScore.score -= termination.religionPenalty;
        }
      });
      effects.religionPenalty = termination.religionPenalty;
    }

    if (termination.religionBoost && celebrity.religions?.hatedBy) {
      celebrity.religions.hatedBy.forEach((religionName) => {
        const religionScore = my.religiousScorecard.find(
          (r) => r.name === religionName,
        );
        if (religionScore) {
          religionScore.score += termination.religionBoost;
        }
      });
      effects.religionBoost = termination.religionBoost;
    }

    if (termination.additionalCost) {
      // Handle IOUs (to be implemented later if needed)
      effects.additionalCost = termination.additionalCost;
    }

    // Show friendship ended modal
    ui.friendshipEnded.isVisible = true;
    ui.friendshipEnded.celebrity = celebrity;
    ui.friendshipEnded.reason = reason;
    ui.friendshipEnded.effects = effects;

    logGameplayToFirebase("celebrityUnfriending", {
      name: celebrity.name,
      reason: reason,
    });
  }

  function triggerEndGame(cause: "drug overdose" | "prison") {
    if (cause === "drug overdose") {
      toast.error("Uh oh", { timeout: ui.timing.toastDuration });
      setTimeout(() => {
        toast.error("That was probably too much...", {
          timeout: ui.timing.toastDuration,
        });
      }, 2500);
      soundWhoopsYoureDead.play();
    } else if (cause === "prison") {
      toast.error("🚨 FEDERAL INVESTIGATION COMPLETE 🚨");
      soundInPrison.play();
      if (my.eternalLegacy.totalMammon) {
        setTimeout(() => {
          ui.legacyStatus.isOpen = true;
        }, 2500);
      }
    }
    ui.view = "game-over";
    my.gameOverCause = cause;
    logGameplayToFirebase("gameFinished", { cause: cause });
  }

  return {
    showEternalLegacyShop,
    closeEternalLegacyShop,
    handleEternalLegacyPurchase,
    purchaseReligiousArtifacts,
    checkEternalLegacyTrigger,
    triggerEternalLegacy,
    playEternalLegacyVoicemail,
    closeSterlingVoicemail,
    onVoicemailCompleted,
    openEternalLegacyFromVoicemail,
    updateHeat,
    triggerEndGame,
    openChurchInventory,
    closeChurchInventory,
    openLegacyStatus,
    closeLegacyStatus,
    closeFriendshipEnded,
    handleUnfriendCelebrity,
    confirmUnfriendCelebrity,
    cancelUnfriendCelebrity,
    processCelebrityDailyEffects,
    processCelebrityMerchSales,
    processCelebrityDailyCosts,
    terminateCelebrityFriendship,
  };
}
