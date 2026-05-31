import { h, type Component, type ComputedRef } from "vue";
import { POSITION } from "vue-toastification";

import { religions } from "./_religions";
import { themes } from "./_sermons";

import { randomNumber, dollars } from "../../../shared/ts/_functions";
import { gameSettings } from "./variables/_gameSettings";
import { soundDonationStreet } from "./variables/_sounds";
import type { Theme, Place, My, UI } from "./_types";

import {
  buildSermonDefinition,
  processStreetPreachingEffect,
  calculateChurchAudience,
  generateDailyThemesSelection,
  getTopicOptionsForSermon,
  buildChurchCongregation,
  calculateCongregationReactions,
  processChurchMerchSales,
} from "./_functions";

/* eslint-disable no-unused-vars */
interface ToastApi {
  (content: any, options?: Record<string, any>): void;
  success(content: any, options?: Record<string, any>): void;
  warning(content: any, options?: Record<string, any>): void;
  error(content: any, options?: Record<string, any>): void;
  info(content: any, options?: Record<string, any>): void;
}

interface SermonFlowArgs {
  my: My;
  ui: UI;
  toast: ToastApi;
  computedTopicsYesterday: ComputedRef<number[]>;
  logGameplayToFirebase: (
    eventType: string,
    data?: Record<string, any>,
  ) => void | Promise<void>;
  ListenerToast: Component;
  DonationToast: Component;
  MerchToast: Component;
}

interface SermonFlowCallbacks {
  getSpiceMultiplier: () => number;
  trackMoneyEarned: (amount: number) => void;
  processCelebrityMerchSales: (congregationGroups: any[]) => {
    totalCelebMerchRevenue: number;
    celebMerchSales: any[];
  };
  processCelebrityDailyCosts: (totalAvailableFunds?: number) => {
    costsOwed: any[];
    terminatedFriendships: any[];
  };
  endTheDay: () => void;
}
/* eslint-enable no-unused-vars */

export function useSermonFlow(
  {
    my,
    ui,
    toast,
    computedTopicsYesterday,
    logGameplayToFirebase,
    ListenerToast,
    DonationToast,
    MerchToast,
  }: SermonFlowArgs,
  callbacks: SermonFlowCallbacks,
) {
  // ========== SERMON PLANNING ==========
  function provideTopicOptions(index: number): typeof themes {
    return getTopicOptionsForSermon(
      index,
      ui.selectedTopics,
      my.dailyThemes,
      computedTopicsYesterday.value,
    );
  }

  function generateDailyThemes() {
    my.dailyThemes = generateDailyThemesSelection();
  }

  function showThemeDescription(id: number): string {
    const theme = (themes as Theme[]).find((s) => s.id === id);
    return theme ? theme.desc || "" : "";
  }

  function defineSermon() {
    my.sermonToday = buildSermonDefinition(ui.selectedTopics);
    ui.view = "sermon-confirm";
  }

  // ========== SERMON EXECUTION ==========
  function preachSermon() {
    // Create sermon objects for tracking but don't update scorecard yet
    // Scorecard updates only happen in church preaching
    my.sermonYesterday = Object.assign({}, my.sermonToday);

    // Move to next phase
    createSermonEffect();
  }

  function createSermonEffect() {
    if (my.isStreetPreaching) {
      createStreetPreachingEffect();
    } else {
      createChurchSermonEffect();
    }
  }

  function createStreetPreachingEffect() {
    ui.view = "preaching";

    const place = my.place as Place;
    if (!place || !place.religions || !Array.isArray(place.religions)) return;

    // Get spice multiplier for this sermon
    const spiceMultiplier = callbacks.getSpiceMultiplier();

    // Use extracted function to process street preaching
    const result = processStreetPreachingEffect(
      place,
      my.sermonToday,
      spiceMultiplier,
    );

    // Store results
    my.donationsYesterday = result.donations;
    my.streetDonorsYesterday =
      result.donations > 0 ? Math.ceil(result.donations / 10) : 0; // Rough estimate
    my.streetAttendanceYesterday = result.crowdSize;
    my.audienceReactions = result.audienceReactions;

    // Show audience feedback toasts
    showNewToasts(result.toastData, result.donations);
  }

  function showNewToasts(toastData: any[], donationAmount: number) {
    if (toastData.length === 0) {
      // No reactions, just show donation toast
      setTimeout(() => {
        my.money += donationAmount;
        callbacks.trackMoneyEarned(donationAmount);

        toast.success(
          h(DonationToast, {
            totalEarnings: donationAmount,
            totalDonations: donationAmount,
            totalMerch: 0,
            sterlingCut: 0,
          }),
          {
            position: POSITION.BOTTOM_LEFT,
            timeout: ui.timing.donationToastDuration,
          },
        );
        setTimeout(() => {
          callbacks.endTheDay();
        }, ui.timing.resultsViewDelay);
      }, 1000);
      return;
    }

    // Stagger the reaction toasts
    let currentDelay = 0;
    toastData.forEach((data) => {
      setTimeout(() => {
        if (data.type === "like") {
          toast.success(
            h(ListenerToast, {
              reaction: "liked",
              count: data.count,
              religion: data.religionData,
              religionMatch: data.isReligionMatch,
              tagMatch: !data.isReligionMatch && data.cause !== null,
              primaryTag: !data.isReligionMatch ? data.cause : undefined,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.timing.toastDuration,
            },
          );
        } else if (data.type === "dislike") {
          toast.warning(
            h(ListenerToast, {
              reaction: "disliked",
              count: data.count,
              religion: data.religionData,
              religionMatch: data.isReligionMatch,
              tagMatch: !data.isReligionMatch && data.cause !== null,
              primaryTag: !data.isReligionMatch ? data.cause : undefined,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.timing.toastDuration,
            },
          );
        } else if (data.type === "mixed") {
          toast.info(
            h(ListenerToast, {
              reaction: "mixed",
              primaryTag: data.cause,
              affectedReligions: data.affectedReligions,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.timing.toastDuration,
            },
          );
        }
      }, currentDelay);

      currentDelay += randomNumber(
        ui.timing.toastDelayMin,
        ui.timing.toastDelayMax,
      );
    });

    // Show donation toast after all reaction toasts
    const finalDelay = currentDelay + ui.timing.donationToastDelay;
    setTimeout(() => {
      my.money += donationAmount;
      callbacks.trackMoneyEarned(donationAmount);

      toast.success(
        h(DonationToast, {
          totalEarnings: donationAmount,
          totalDonations: donationAmount,
          totalMerch: 0,
          sterlingCut: 0,
        }),
        {
          position: POSITION.BOTTOM_LEFT,
          timeout: ui.timing.donationToastDuration,
        },
      );
      setTimeout(() => {
        soundDonationStreet.play();
      }, 350);

      setTimeout(() => {
        callbacks.endTheDay();
      }, ui.timing.resultsViewDelay);
    }, finalDelay);
  }

  function showAudienceReactions(donationAmount: number) {
    if (!my.audienceReactions) return;

    // Collect all reactions (both likes and dislikes) for better timing control
    const allReactions: Array<{
      reaction?: any;
      reactionType: "liked" | "disliked" | "mixed";
      delay: number;
      mixedMessageTag?: string;
      affectedReligions?: string[];
    }> = [];

    // Collect mixed messages by tag (not by religion)
    const mixedMessagesByTag: { [tag: string]: string[] } = {};

    my.audienceReactions.forEach((reaction) => {
      if (reaction.liked > 0) {
        allReactions.push({ reaction, reactionType: "liked", delay: 0 });
      }
      if (reaction.disliked > 0) {
        allReactions.push({ reaction, reactionType: "disliked", delay: 0 });
      }
      // Collect mixed message data by tag for later processing
      if (reaction.mixedTags && reaction.mixedTags.length > 0) {
        reaction.mixedTags.forEach((tag) => {
          if (!mixedMessagesByTag[tag]) {
            mixedMessagesByTag[tag] = [];
          }
          // Use followersName instead of name for proper plural form
          mixedMessagesByTag[tag].push(reaction.followersName);
        });
      }
    });

    // Add mixed message reactions (one per tag, not per religion)
    Object.entries(mixedMessagesByTag).forEach(([tag, affectedReligions]) => {
      allReactions.push({
        mixedMessageTag: tag,
        affectedReligions,
        reactionType: "mixed",
        delay: 0,
      });
    });

    // Calculate randomized but overlapping delays
    let currentDelay = 0;
    allReactions.forEach((item) => {
      // Random delay between 1100-3800ms, but ensure overlap
      const randomDelay = randomNumber(
        ui.timing.toastDelayMin,
        ui.timing.toastDelayMax,
      );
      item.delay = currentDelay;
      currentDelay += randomDelay;
    });

    // Show all reaction toasts
    allReactions.forEach((item) => {
      setTimeout(() => {
        const { reaction, reactionType, mixedMessageTag, affectedReligions } =
          item;

        // For mixed messages, we don't have a reaction object
        if (reactionType === "mixed") {
          // Mixed message - confused audience (new structure)
          toast.info(
            h(ListenerToast, {
              reaction: "mixed",
              mixedMessageTag,
              affectedReligions,
              religion: null, // Not used for mixed messages
              religionMatch: false,
              tagMatch: true,
              primaryTag: mixedMessageTag,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.timing.toastDuration,
            },
          );
          return; // Exit early for mixed messages
        }

        // For regular reactions, we have a reaction object
        const religionData = religions.find((r) => r.id === reaction.id);

        if (reactionType === "liked") {
          const religionMatch = my.sermonToday.likedBy.religions.find(
            (r: any) => r.id === reaction.id,
          );
          const tagMatch = reaction.likedTags && reaction.likedTags.length > 0;
          const primaryTag = tagMatch ? reaction.likedTags[0] : undefined;

          toast.success(
            h(ListenerToast, {
              reaction: "liked",
              count: reaction.liked,
              religion: religionData,
              religionMatch: !!religionMatch,
              tagMatch: tagMatch,
              primaryTag: primaryTag,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.timing.toastDuration,
            },
          );
        } else if (reactionType === "disliked") {
          const religionMatch = my.sermonToday.dislikedBy.religions.find(
            (r: any) => r.id === reaction.id,
          );
          const tagMatch =
            reaction.dislikedTags && reaction.dislikedTags.length > 0;
          const primaryTag = tagMatch ? reaction.dislikedTags[0] : undefined;

          toast.warning(
            h(ListenerToast, {
              reaction: "disliked",
              count: reaction.disliked,
              religion: religionData,
              religionMatch: !!religionMatch,
              tagMatch: tagMatch,
              primaryTag: primaryTag,
            }),
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.timing.toastDuration,
            },
          );
        }
      }, item.delay);
    }); // Show donation toast after all reactions, and apply money then
    const finalDelay =
      allReactions.length > 0
        ? Math.max(...allReactions.map((r) => r.delay)) +
          ui.timing.donationToastDelay
        : ui.timing.donationToastDelay;
    setTimeout(() => {
      // Apply the money now
      my.money += donationAmount;

      // Track money for van unlock
      callbacks.trackMoneyEarned(donationAmount);

      toast.success(
        h(DonationToast, {
          totalEarnings: donationAmount,
          totalDonations: donationAmount,
          totalMerch: 0,
          sterlingCut: 0,
        }),
        {
          position: POSITION.BOTTOM_LEFT,
          timeout: ui.timing.toastDuration,
        },
      );

      // Switch to results view
      setTimeout(() => {
        callbacks.endTheDay();
      }, ui.timing.resultsViewDelay);
    }, finalDelay);
  }

  function gatherChurchAudience(): number {
    const attendance = calculateChurchAudience(my);

    // Show toast if we hit capacity
    if (my.church.isFounded && my.church.location) {
      let churchAttendees = gameSettings.churchPreaching.expectedAttendees;
      churchAttendees = Math.round(
        churchAttendees * (my.preacherStrengths?.gatherCrowd || 1),
      );
      churchAttendees += Math.round(
        my.church.buzz * gameSettings.church.buzzMultiplier,
      );

      if (
        my.marketing.signSpinner.active &&
        my.marketing.signSpinner.daysRemaining > 0
      ) {
        churchAttendees = Math.round(
          churchAttendees *
            (1 +
              gameSettings.church.marketing.signSpinner.attendanceBoost / 100),
        );
      }
      if (
        my.marketing.targetedAd.active &&
        my.marketing.targetedAd.daysRemaining > 0
      ) {
        if (
          my.church.religion?.id === my.marketing.targetedAd.targetReligion?.id
        ) {
          churchAttendees = Math.round(
            churchAttendees *
              (1 +
                gameSettings.church.marketing.targetedAd.targetReligionBoost /
                  100),
          );
        }
      }

      const maxPews = gameSettings.church.upgrades.extraPews.maxPews;
      const actualExtraPews = Math.min(my.church.upgrades.extraPews, maxPews);
      const effectiveCapacity =
        my.church.maxAttendance +
        actualExtraPews *
          gameSettings.church.upgrades.extraPews.capacityIncrease;

      if (churchAttendees > effectiveCapacity) {
        setTimeout(() => {
          toast("🏛️ Your church is at maximum capacity! Consider expanding.", {
            position: POSITION.BOTTOM_RIGHT,
            timeout: ui.timing.toastDuration,
          });
        }, 500);
      }
    }

    return attendance;
  }

  function createChurchSermonEffect() {
    ui.view = "preaching";
    my.church.days += 1;

    // Check if player has a church, if not fall back to street preaching
    if (!my.church.isFounded || !my.church.location) {
      // Fall back to old street preaching logic
      createStreetPreachingEffect();
      return;
    }

    const churchLocation = my.church.location as Place;
    if (
      !churchLocation ||
      !churchLocation.religions ||
      !Array.isArray(churchLocation.religions)
    )
      return;

    // Get spice multiplier for this sermon
    const spiceMultiplier = callbacks.getSpiceMultiplier();

    // Gather today's church attendance
    const churchAttendees = gatherChurchAudience();

    // Build today's congregation using extracted function
    const todaysCongregation = buildChurchCongregation(
      churchLocation,
      churchAttendees,
      my.religiousScorecard,
      my.church.religion,
      my.marketing,
      gameSettings,
    );

    // Calculate reactions using extracted function
    calculateCongregationReactions(
      todaysCongregation,
      my.sermonToday,
      my.sermonYesterday,
      my.preacherStrengths,
      spiceMultiplier,
      my.church.upgrades,
      my.marketing,
      gameSettings,
    );

    // Store congregation data for potential future use
    my.congregation = todaysCongregation;

    // Create audience reactions for the results display (church preaching version)
    my.audienceReactions = todaysCongregation.map((group) => {
      const religion = religions.find((r: any) => r.id === group.id);
      return {
        id: group.id,
        name: religion?.name || `Religion ${group.id}`,
        liked: group.likes,
        disliked: group.dislikes,
        neutral: group.count - group.likes - group.dislikes,
        followerName: religion?.follower || "follower",
        followersName: religion?.followers || "followers",
      };
    });

    // Update scorecard and track daily change - ONLY based on likes/dislikes from congregation
    todaysCongregation.forEach((group) => {
      const scorecardEntry = my.religiousScorecard.find(
        (entry: any) => entry.id === group.id,
      );
      if (scorecardEntry) {
        const change = group.likes - group.dislikes;
        scorecardEntry.score += change;
        scorecardEntry.change = change;
      }
    });

    // Force Vue reactivity by replacing the scorecard array
    my.religiousScorecard = my.religiousScorecard.map((entry) => ({
      ...entry,
    }));

    // Update church buzz based on overall sermon performance
    const buzzLikes = todaysCongregation.reduce(
      (sum, group) => sum + group.likes,
      0,
    );
    const buzzDislikes = todaysCongregation.reduce(
      (sum, group) => sum + group.dislikes,
      0,
    );
    const buzzChange = buzzLikes - buzzDislikes;
    my.church.buzz = Math.max(0, my.church.buzz + buzzChange);

    // Calculate total donations from people who liked the sermon
    let totalDonations = 0;
    let totalDonors = 0;
    let totalAttendance = 0;

    todaysCongregation.forEach((group) => {
      totalAttendance += group.count;

      // Calculate donations from this group
      const donationChance = gameSettings.churchPreaching.donation.chance / 100;
      const donors = Math.round(group.likes * donationChance);
      totalDonors += donors;

      for (let i = 0; i < donors; i++) {
        const donation = randomNumber(
          gameSettings.churchPreaching.donation.min,
          gameSettings.churchPreaching.donation.max,
        );
        totalDonations += donation;
      }
    });

    // Apply donation strength multiplier
    totalDonations *=
      (my.preacherStrengths?.getDonations || 1) * spiceMultiplier;
    totalDonations = Math.round(totalDonations * 100) / 100; // Round to cents

    // Process merchandise sales using extracted function
    const { totalRevenue: totalMerchRevenue, salesDetails: merchSalesDetails } =
      processChurchMerchSales(
        todaysCongregation,
        my.church.merch,
        gameSettings,
      );

    // Process celebrity merchandise sales
    const { totalCelebMerchRevenue, celebMerchSales } =
      callbacks.processCelebrityMerchSales(todaysCongregation);

    // Add celebrity merch revenue to total merch revenue
    const finalMerchRevenue = totalMerchRevenue + totalCelebMerchRevenue;

    // Calculate VIP confession booth revenue
    let confessionRevenue = 0;
    if (my.church.upgrades.vipConfessionBooths) {
      const confessionUsers = Math.round(totalAttendance * 0.15); // 15% of attendees use VIP confession
      confessionRevenue =
        confessionUsers *
        gameSettings.church.upgrades.vipConfessionBooths.revenuePerUse;
      confessionRevenue = Math.round(confessionRevenue * 100) / 100; // Round to cents
    }

    // Store church preaching statistics for results display
    my.donationsYesterday = totalDonations;
    my.churchAttendanceYesterday = totalAttendance;
    my.churchDonorsYesterday = totalDonors;
    my.merchRevenueYesterday = finalMerchRevenue;
    my.merchSalesDetailsYesterday = merchSalesDetails;
    my.confessionRevenueYesterday = confessionRevenue;

    // Show audience reactions in toasts
    let currentDelay = 0;
    const reactionGroups = todaysCongregation.filter(
      (group) => group.likes > 0 || group.dislikes > 0,
    );

    reactionGroups.forEach((group) => {
      setTimeout(() => {
        const religion = religions.find((r: any) => r.id === group.id);

        // Show separate toasts for likes and dislikes if both exist
        if (group.likes > 0) {
          toast(
            {
              component: ListenerToast,
              props: {
                reaction: "liked",
                count: group.likes,
                religion: religion,
                religionMatch:
                  my.church.religion && my.church.religion.id === group.id,
                tagMatch: false,
                primaryTag: null,
              },
            },
            {
              position: POSITION.BOTTOM_LEFT,
              timeout: ui.timing.donationToastDuration,
            },
          );
        }

        if (group.dislikes > 0) {
          setTimeout(
            () => {
              toast(
                {
                  component: ListenerToast,
                  props: {
                    reaction: "disliked",
                    count: group.dislikes,
                    religion: religion,
                    religionMatch:
                      my.church.religion && my.church.religion.id === group.id,
                    tagMatch: false,
                    primaryTag: null,
                  },
                },
                {
                  position: POSITION.BOTTOM_LEFT,
                  timeout: ui.timing.donationToastDuration,
                },
              );
            },
            group.likes > 0 ? 800 : 0,
          );
        }
      }, currentDelay);

      currentDelay += randomNumber(
        ui.timing.toastDelayMin,
        ui.timing.toastDelayMax,
      );
    });

    // Show donation toast after all reactions
    const merchToastDelay = currentDelay + ui.timing.merchToastDelay;
    setTimeout(() => {
      // Calculate gross church revenue first
      const grossChurchRevenue =
        totalDonations + finalMerchRevenue + confessionRevenue;

      // Process celebrity daily costs with total available funds (current money + today's earnings)
      const totalAvailableFunds = my.money + grossChurchRevenue;
      const { costsOwed } =
        callbacks.processCelebrityDailyCosts(totalAvailableFunds);

      // Calculate net church revenue AFTER celebrity costs
      const totalCelebrityCosts = costsOwed.reduce(
        (sum, cost) => sum + cost.amount,
        0,
      );
      const netChurchRevenue = grossChurchRevenue - totalCelebrityCosts;

      let playerShare = netChurchRevenue;
      let sterlingCut = 0;

      if (my.chats.sterling.hasContacted && my.eternalLegacy.sterlingAlive) {
        const cutPercentage =
          gameSettings.churchPreaching.sterling.cutPercentage / 100;
        const minimumCut = gameSettings.churchPreaching.sterling.minimumCut;

        sterlingCut = Math.max(minimumCut, netChurchRevenue * cutPercentage);
        playerShare = netChurchRevenue - sterlingCut;

        if (playerShare < 0) {
          sterlingCut = netChurchRevenue;
          playerShare = 0;
        }
      } else {
        playerShare = netChurchRevenue;
      }

      my.money += playerShare;
      callbacks.trackMoneyEarned(playerShare);

      // Deduct celebrity costs from the player's updated money balance
      my.money -= totalCelebrityCosts;

      // Store values for results display
      my.sterlingCutYesterday = sterlingCut;
      my.playerShareYesterday = playerShare;
      my.celebrityCostsYesterday = costsOwed;
      my.grossRevenueYesterday = grossChurchRevenue;
      my.celebMerchSalesYesterday = celebMerchSales;

      // Show merch toast if there are sales
      const hasMerchSales = finalMerchRevenue > 0;
      const hasConfessionRevenue = confessionRevenue > 0;
      const hasCelebrityMerchSales = totalCelebMerchRevenue > 0;
      const ownsMerch =
        my.church.merch.holyWater.inventory > 0 ||
        my.church.merch.holyWater.soldToday > 0 ||
        my.church.merch.prayerCandles.inventory > 0 ||
        my.church.merch.prayerCandles.soldToday > 0 ||
        my.church.merch.weightLossTea.inventory > 0 ||
        my.church.merch.weightLossTea.soldToday > 0 ||
        my.church.merch.beachTowel.inventory > 0 ||
        my.church.merch.beachTowel.soldToday > 0 ||
        my.church.merch.exorcismKit.inventory > 0 ||
        my.church.merch.exorcismKit.soldToday > 0;

      if (
        hasMerchSales ||
        hasConfessionRevenue ||
        hasCelebrityMerchSales ||
        ownsMerch
      ) {
        toast(
          {
            component: MerchToast,
            props: {
              totalMerchRevenue: finalMerchRevenue,
              merchSalesDetails: merchSalesDetails,
              confessionRevenue: confessionRevenue,
              celebMerchSales: celebMerchSales,
            },
          },
          {
            position: POSITION.BOTTOM_LEFT,
            timeout: ui.timing.donationToastDuration,
          },
        );
      }

      // Show donation toast after merch toast
      const finalDonationDelay =
        hasMerchSales ||
        hasConfessionRevenue ||
        hasCelebrityMerchSales ||
        ownsMerch
          ? ui.timing.donationToastDelay
          : 0;
      setTimeout(() => {
        toast(
          {
            component: DonationToast,
            props: {
              totalEarnings: playerShare + confessionRevenue,
              totalDonations: totalDonations,
              totalMerch: finalMerchRevenue,
              sterlingCut: sterlingCut,
              celebrityCosts: costsOwed,
            },
          },
          {
            position: POSITION.BOTTOM_LEFT,
            timeout: ui.timing.donationToastDuration,
          },
        );
      }, finalDonationDelay);

      // Add Sterling's cut message if applicable
      if (sterlingCut > 0) {
        setTimeout(() => {
          const cutMessage = {
            id: Date.now(),
            sender: "sterling",
            text: `My cut for today: ${dollars(sterlingCut)}. The Lord rewards those who honor their business commitments.`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          my.chats.sterling.chatHistory.push(cutMessage);
        }, 3000);
      }

      // Switch to results view
      setTimeout(() => {
        callbacks.endTheDay();
      }, ui.timing.resultsViewDelay);
    }, merchToastDelay);
  }

  return {
    provideTopicOptions,
    generateDailyThemes,
    showThemeDescription,
    defineSermon,
    preachSermon,
    createSermonEffect,
    createStreetPreachingEffect,
    showNewToasts,
    showAudienceReactions,
    gatherChurchAudience,
    createChurchSermonEffect,
  };
}
