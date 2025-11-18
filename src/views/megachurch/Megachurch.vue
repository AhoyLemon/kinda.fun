<script setup lang="ts">
  // ================= IMPORTS =================
  import { onMounted, reactive, ref, computed, watchEffect, watch, h } from "vue";
  import Multiselect from "@vueform/multiselect";
  import "@vueform/multiselect/themes/default.css";
  import { religions } from "./ts/_religions";
  import { places } from "./ts/_places";
  import { themes } from "./ts/_sermons";

  import { randomNumber, randomFrom, shuffle, addCommas, findInArray, removeFromArray, percentOf, sendEvent, dollars } from "../../shared/ts/_functions";
  import { gameSettings } from "./ts/variables/_gameSettings";
  import { my } from "./ts/variables/_my";
  import { ui } from "./ts/variables/_ui";

  // Import shared game logic
  import {
    calculateCrowdSize,
    generateCrowd,
    buildSermonData,
    processCrowdReactions,
    calculateDonations,
    simulateStreetPreachingCore,
    type Person,
    type StreetPreachingResult,
  } from "./ts/_gameLogic";

  // Firebase & VueFire Stuff
  import { doc, increment, serverTimestamp, updateDoc, runTransaction, setDoc, getDoc } from "firebase/firestore";
  import { useFirestore } from "vuefire";
  const db = useFirestore();
  const statsRef = doc(db, `stats/megachurch`);

  // Toasts
  import Toast, { POSITION } from "vue-toastification";
  import FollowerToast from "./components/Toasts/FollowerToast.vue";
  import ListenerToast from "./components/Toasts/ListenerToast.vue";
  import DonationToast from "./components/Toasts/DonationToast.vue";
  import MerchToast from "./components/Toasts/MerchToast.vue";
  import CelebrityFriendToast from "./components/Toasts/CelebrityFriendToast.vue";

  // Sounds
  import { Howl, Howler } from "howler";
  import { soundWhoopsYoureDead, soundInPrison, soundDonationStreet, spiceSniffs } from "./ts/variables/_sounds";

  // Components
  import Chat from "./components/Chat/Chat.vue";
  import SterlingNote from "./components/Sterling/SterlingNote.vue";
  import WorshopZoneBanner from "./components/WorshopZone/WorshopZoneBanner.vue";
  import WorshopZone from "./components/WorshopZone/WorshopZone.vue";
  import EternalLegacyShop from "./components/EternalLegacy/EternalLegacyShop.vue";
  import SterlingVoicemail from "./components/Sterling/SterlingVoicemail.vue";
  import ChurchInventory from "./components/WorshopZone/ChurchInventory.vue";
  import LegacyStatus from "./components/EternalLegacy/LegacyStatus.vue";
  import FriendshipEnded from "./components/EternalLegacy/FriendshipEnded.vue";
  import UnfriendConfirmation from "./components/EternalLegacy/UnfriendConfirmation.vue";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  // Component references
  const sterlingNoteRef = ref<{ showNote: () => void } | null>(null);

  import type { Theme, Place, WeightedTag, WeightedReligion, MixedTag, MixedReligion, Sermon, Religion, UI, My } from "./ts/_types";

  import {
    computeTopicsYesterday,
    sortAudienceReactions,
    calculateIgnoredAudience,
    getAvailablePlaces,
    computeTopReligions,
    getPurchasedItems,
    computeTemporarySermonScores,
  } from "./ts/_computeds";

  import {
    buildSermonDefinition,
    processStreetPreachingEffect,
    calculateChurchAudience,
    sendTextMessagesWithTyping,
    generateDailyThemesSelection,
    getTopicOptionsForSermon,
    buildChurchCongregation,
    calculateCongregationReactions,
    processChurchMerchSales,
  } from "./ts/_functions";

  // ================= FUNCTIONS =================

  // ========== GAME SETUP & NAVIGATION ==========
  function startNewGame() {
    localStorage.setItem("kindaFunPlayerName", my.name);
    ui.view = "sermon";
  }

  function chooseReligion(religionId: number) {
    const religion = religions.find((r: any) => r.id === religionId);
    if (religion) {
      my.religion = religion;
    } else {
      alert("Religion not found.");
    }
    ui.view = "place";
  }

  function choosePlace(placeId: number) {
    const place = places.find((p: any) => p.id === placeId);
    if (place) {
      my.place = { ...place };
      advanceToNextDay();
    } else {
      alert("Place not found.");
    }
  }

  // ========== UTILITY FUNCTIONS ==========
  function getReligion(id: number): Religion | {} {
    if (!id) {
      return { name: "Unknown" };
    }
    const religion = (religions as any[]).find((r) => r.id === id);
    if (!religion) {
      return { name: "Unknown" };
    }
    return religion;
  }

  function getPlace(id: number): Place | {} {
    const place = (places as any[]).find((p) => p.id === id);
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

    const churchLocation = places.find((p: any) => p.id === ui.churchLocationIndex);
    const churchReligion = religions.find((r: any) => r.id === ui.churchReligionIndex);

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
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
      toast.success(`The Plug sent you ${spiceShortage} units of spice as a church-warming gift!`, {
        position: POSITION.TOP_CENTER,
        timeout: 5000,
      });

      // Add chat history
      const plugMessage = {
        id: Date.now(),
        sender: "plug",
        text: `Just heard about ${my.church.name}. Enjoy the gift.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const playerMessage = {
        id: Date.now() + 1,
        sender: "player",
        text: "You are my only true friend.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      my.chats.plug.chatHistory.push(plugMessage);
      my.chats.plug.chatHistory.push(playerMessage);
    }

    advanceToNextDay();
  }

  function cancelChurchSetup() {
    ui.view = "sermon-results";
    ui.chats.sterling.isOpen = false;
  }

  // ========== SERMON PLANNING ==========
  function provideTopicOptions(index: number): typeof themes {
    return getTopicOptionsForSermon(index, ui.selectedTopics, my.dailyThemes, computedTopicsYesterday.value);
  }

  function generateDailyThemes() {
    my.dailyThemes = generateDailyThemesSelection(my.dailyThemes);
  }

  function showThemeDescription(id: number): string {
    const theme = (themes as Theme[]).find((s) => s.id === id);
    return theme ? theme.desc || "" : "";
  }

  function defineSermon() {
    my.sermonToday = buildSermonDefinition(ui.selectedTopics, my.sermonToday);
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
    const spiceMultiplier = getSpiceMultiplier();

    // Use extracted function to process street preaching
    const result = processStreetPreachingEffect(place, my.sermonToday, spiceMultiplier);

    // Store results
    my.donationsYesterday = result.donations;
    my.streetDonorsYesterday = result.donations > 0 ? Math.ceil(result.donations / 10) : 0; // Rough estimate
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
        trackMoneyEarned(donationAmount);

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
          endTheDay();
        }, ui.timing.resultsViewDelay);
      }, 1000);
      return;
    }

    // Stagger the reaction toasts
    let currentDelay = 0;
    let toastCount = 0;
    let toastArray = [];

    toastData.forEach((data, i) => {
      setTimeout(() => {
        let toastType: "success" | "warning" | "info" = "info";

        if (data.type === "like") {
          toastType = "success";
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
          toastType = "warning";
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
          toastType = "info";
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

        toastCount++;
        toastArray.push({ type: toastType, count: data.count, cause: data.cause });
      }, currentDelay);

      currentDelay += randomNumber(ui.timing.toastDelayMin, ui.timing.toastDelayMax);
    });

    // Show donation toast after all reaction toasts
    const finalDelay = currentDelay + ui.timing.donationToastDelay;
    setTimeout(() => {
      console.log(`toastCount: ${toastCount}`);
      console.table(toastArray);

      my.money += donationAmount;
      trackMoneyEarned(donationAmount);

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
        endTheDay();
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
    allReactions.forEach((item, i) => {
      // Random delay between 1100-3800ms, but ensure overlap
      const randomDelay = randomNumber(ui.timing.toastDelayMin, ui.timing.toastDelayMax);
      item.delay = currentDelay;
      currentDelay += randomDelay;
    });

    // Show all reaction toasts
    allReactions.forEach((item) => {
      setTimeout(() => {
        const { reaction, reactionType, mixedMessageTag, affectedReligions } = item;

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
          const religionMatch = my.sermonToday.likedBy.religions.find((r: any) => r.id === reaction.id);
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
          const religionMatch = my.sermonToday.dislikedBy.religions.find((r: any) => r.id === reaction.id);
          const tagMatch = reaction.dislikedTags && reaction.dislikedTags.length > 0;
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
    const finalDelay = allReactions.length > 0 ? Math.max(...allReactions.map((r) => r.delay)) + ui.timing.donationToastDelay : ui.timing.donationToastDelay;
    setTimeout(() => {
      // Apply the money now
      my.money += donationAmount;

      // Track money for van unlock
      trackMoneyEarned(donationAmount);

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
        endTheDay();
      }, ui.timing.resultsViewDelay);
    }, finalDelay);
  }

  function gatherChurchAudience(): number {
    const attendance = calculateChurchAudience(my);

    // Show toast if we hit capacity
    if (my.church.isFounded && my.church.location) {
      let churchAttendees = gameSettings.churchPreaching.expectedAttendees;
      churchAttendees = Math.round(churchAttendees * (my.preacherStrengths?.gatherCrowd || 1));
      churchAttendees += Math.round(my.church.buzz * gameSettings.church.buzzMultiplier);

      if (my.marketing.signSpinner.active && my.marketing.signSpinner.daysRemaining > 0) {
        churchAttendees = Math.round(churchAttendees * (1 + gameSettings.church.marketing.signSpinner.attendanceBoost / 100));
      }
      if (my.marketing.targetedAd.active && my.marketing.targetedAd.daysRemaining > 0) {
        if (my.church.religion?.id === my.marketing.targetedAd.targetReligion?.id) {
          churchAttendees = Math.round(churchAttendees * (1 + gameSettings.church.marketing.targetedAd.targetReligionBoost / 100));
        }
      }

      const maxPews = gameSettings.church.upgrades.extraPews.maxPews;
      const actualExtraPews = Math.min(my.church.upgrades.extraPews, maxPews);
      const effectiveCapacity = my.church.maxAttendance + actualExtraPews * gameSettings.church.upgrades.extraPews.capacityIncrease;

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
    if (!churchLocation || !churchLocation.religions || !Array.isArray(churchLocation.religions)) return;

    // Get spice multiplier for this sermon
    const spiceMultiplier = getSpiceMultiplier();

    // Gather today's church attendance
    const churchAttendees = gatherChurchAudience();

    // Build today's congregation using extracted function
    const todaysCongregation = buildChurchCongregation(churchLocation, churchAttendees, my.religiousScorecard, my.church.religion, my.marketing, gameSettings);

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
      const scorecardEntry = my.religiousScorecard.find((entry: any) => entry.id === group.id);
      if (scorecardEntry) {
        const change = group.likes - group.dislikes;
        scorecardEntry.score += change;
        scorecardEntry.change = change;
      }
    });

    // Force Vue reactivity by replacing the scorecard array
    my.religiousScorecard = my.religiousScorecard.map((entry) => ({ ...entry }));

    // Update church buzz based on overall sermon performance
    const buzzLikes = todaysCongregation.reduce((sum, group) => sum + group.likes, 0);
    const buzzDislikes = todaysCongregation.reduce((sum, group) => sum + group.dislikes, 0);
    const buzzChange = buzzLikes - buzzDislikes;
    my.church.buzz = Math.max(0, my.church.buzz + buzzChange);

    // Calculate total donations from people who liked the sermon
    let totalLikes = 0;
    let totalDonations = 0;
    let totalDonors = 0;
    let totalAttendance = 0;

    todaysCongregation.forEach((group) => {
      totalLikes += group.likes;
      totalAttendance += group.count;

      // Calculate donations from this group
      const donationChance = gameSettings.churchPreaching.donation.chance / 100;
      const donors = Math.round(group.likes * donationChance);
      totalDonors += donors;

      for (let i = 0; i < donors; i++) {
        const donation = randomNumber(gameSettings.churchPreaching.donation.min, gameSettings.churchPreaching.donation.max);
        totalDonations += donation;
      }
    });

    // Apply donation strength multiplier
    totalDonations *= (my.preacherStrengths?.getDonations || 1) * spiceMultiplier;
    totalDonations = Math.round(totalDonations * 100) / 100; // Round to cents

    // Process merchandise sales using extracted function
    const { totalRevenue: totalMerchRevenue, salesDetails: merchSalesDetails } = processChurchMerchSales(todaysCongregation, my.church.merch, gameSettings);

    // Process celebrity merchandise sales
    const { totalCelebMerchRevenue, celebMerchSales } = processCelebrityMerchSales(todaysCongregation);

    // Add celebrity merch revenue to total merch revenue
    const finalMerchRevenue = totalMerchRevenue + totalCelebMerchRevenue;

    // Calculate VIP confession booth revenue
    let confessionRevenue = 0;
    if (my.church.upgrades.vipConfessionBooths) {
      const confessionUsers = Math.round(totalAttendance * 0.15); // 15% of attendees use VIP confession
      confessionRevenue = confessionUsers * gameSettings.church.upgrades.vipConfessionBooths.revenuePerUse;
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
    const reactionGroups = todaysCongregation.filter((group) => group.likes > 0 || group.dislikes > 0);

    reactionGroups.forEach((group, i) => {
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
                religionMatch: my.church.religion && my.church.religion.id === group.id,
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
                    religionMatch: my.church.religion && my.church.religion.id === group.id,
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

      currentDelay += randomNumber(ui.timing.toastDelayMin, ui.timing.toastDelayMax);
    });

    // Show donation toast after all reactions
    const merchToastDelay = currentDelay + ui.timing.merchToastDelay;
    setTimeout(() => {
      // Calculate gross church revenue first
      const grossChurchRevenue = totalDonations + finalMerchRevenue + confessionRevenue;

      // Process celebrity daily costs with total available funds (current money + today's earnings)
      const totalAvailableFunds = my.money + grossChurchRevenue;
      const { costsOwed, terminatedFriendships } = processCelebrityDailyCosts(totalAvailableFunds);

      // Calculate net church revenue AFTER celebrity costs
      const totalCelebrityCosts = costsOwed.reduce((sum, cost) => sum + cost.amount, 0);
      const netChurchRevenue = grossChurchRevenue - totalCelebrityCosts;

      let playerShare = netChurchRevenue;
      let sterlingCut = 0;

      if (my.chats.sterling.hasContacted && my.eternalLegacy.sterlingAlive) {
        const cutPercentage = gameSettings.churchPreaching.sterling.cutPercentage / 100;
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
      trackMoneyEarned(playerShare);

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

      if (hasMerchSales || hasConfessionRevenue || hasCelebrityMerchSales || ownsMerch) {
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
      const finalDonationDelay = hasMerchSales || hasConfessionRevenue || hasCelebrityMerchSales || ownsMerch ? ui.timing.donationToastDelay : 0;
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
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          my.chats.sterling.chatHistory.push(cutMessage);
        }, 3000);
      }

      // Switch to results view
      setTimeout(() => {
        endTheDay();
      }, ui.timing.resultsViewDelay);
    }, merchToastDelay);
  }

  // ================= DAY MANAGEMENT =================
  function endTheDay() {
    ui.view = "sermon-results";

    // Firebase logging for first game start
    if (my.daysPlayed < 1) {
      logGameplayToFirebase("gameStarted");
    }

    // Firebase logging for day ended
    const dayLogData = {
      preachedOnStreet: !my.church?.location?.name || my.church?.location?.name !== my.place.name,
      preachedInChurch: my.church?.location?.name && my.church.location.name === my.place.name,
      seraphAIActive: my.church.upgrades.seraphAI,
      sermonTopics: my.sermonToday.topics || [],
    };
    logGameplayToFirebase("dayEnded", dayLogData);

    // Check for Plug auto-introduction on first day
    if (my.daysPlayed < 1 && !my.chats.plug.hasContacted) {
      setTimeout(() => {
        triggerPlugContact();
      }, 2000);
    }

    // Show Workshop Zone banner after first day of preaching with a founded church
    // Only show once on the first night after founding a church
    if (my.church.isFounded && my.church.days === 1 && !ui.worshopZone.hasSeenBanner) {
      setTimeout(() => {
        toast.info("You have been served with a pop up ad relevant to your interests.", {
          timeout: 3000,
        });
        ui.worshopZone.showBanner = true;
        ui.worshopZone.hasSeenBanner = true; // Mark as seen so it won't show again
      }, 2500);
    }

    // Is it time for Sterling's voicemail?
    checkEternalLegacyTrigger();
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
      const penalty = Math.min(gameSettings.spice.maxPenalty, shortage * gameSettings.spice.penaltyPerUnit);
      multiplier = 1 - penalty;
    } else if (excess > 0 && my.spice.canOverperform) {
      // Apply bonus for excess consumption
      const bonus = Math.min(gameSettings.spice.maxBonus, excess * gameSettings.spice.bonusPerUnit);
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
      my.spice.pendingAddictionIncrease = my.spice.pendingAddictionIncrease + newIncrease;
    }
  }

  function applyPendingAddiction() {
    // Apply addiction progression that was calculated yesterday
    if (my.spice.pendingAddictionIncrease > 0) {
      const oldRequirement = my.spice.requiredAmount;
      const pendingAddictionIncreaseInteger = Math.floor(my.spice.pendingAddictionIncrease);

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

  // Harold Chat Functions
  function openHaroldInterface() {
    ui.chats.harold.isOpen = true;
  }

  function closeHaroldInterface() {
    ui.chats.harold.isOpen = false;
  }

  function handleHaroldMessage(data: any) {
    if (data.messages && Array.isArray(data.messages)) {
      data.messages.forEach((message: any) => {
        // Replace typing indicator if specified (use in-place update for smooth transitions)
        if (message.replaceTyping) {
          const typingMessage = my.chats.harold.chatHistory.find((m) => m.isTyping && m.sender === "harold");
          if (typingMessage) {
            // Update the existing message object instead of removing and adding
            typingMessage.text = message.text;
            typingMessage.time = message.time;
            typingMessage.isTyping = false;
          }
        } else {
          // Add new message normally
          my.chats.harold.chatHistory.push(message);
        }
      });
    }
  }

  function buyVan() {
    if (my.money >= gameSettings.van.cost) {
      my.money -= gameSettings.van.cost;
      my.hasVan = true;

      // Log van purchase to Firebase
      logGameplayToFirebase("vanPurchased");
    }
  }

  function openSterlingInterface() {
    ui.chats.sterling.isOpen = true;
  }

  function closeSterlingInterface() {
    ui.chats.sterling.isOpen = false;
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
        toast.warning("You have already established a friendship with this celebrity in the past.");
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
    const collection = category === "mammon" ? "mammon" : category === "darkDeeds" ? "darkDeeds" : "celebrities";
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
        case "shredder":
          // Slows heat gain - could be implemented as a modifier
          break;

        case "sterling-cut":
          // Increase Sterling's cut permanently
          my.eternalLegacy.sterlingCutModifier += item.cutIncreasase; // Increase Sterling's cut.
          gameSettings.eternalLegacy.heat.dailyBaseIncrease -= 3;
          toast.success(`${item.name}: Sterling handles the authorities. His cut of your income increases permanently.`);
          break;

        case "tax-attorney":
          // Reduce Sterling payments but increase heat and scandal
          toast.success(`${item.name}: Legal protection secured. Sterling's leverage reduced, but congregation scandalized.`);
          break;

        case "consultation-tony":
          // Eliminate Sterling but massive heat increase
          my.eternalLegacy.sterlingAlive = false;
          toast.error(`${item.name}: Sterling has been... permanently removed. Heat increased by ${item.heat}`);
          break;
      }

      toast.warning(`🔥 Heat increased by ${item.heat}! Current: ${my.eternalLegacy.heat}/${gameSettings.eternalLegacy.heat.max}`);
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
          if (celebrity.religions.likedBy && celebrity.oneTimeEffects.religionBoost) {
            celebrity.religions.likedBy.forEach((religionName) => {
              const religionScore = my.religiousScorecard.find((r) => r.name === religionName);
              if (religionScore) {
                religionScore.score += celebrity.oneTimeEffects.religionBoost;
                religionBoosts.push(`${religionName} (+${celebrity.oneTimeEffects.religionBoost})`);
              }
            });
            acquisitionEffects.religionBoosts = religionBoosts;
          }

          if (celebrity.religions.hatedBy && celebrity.oneTimeEffects.religionPenalty) {
            celebrity.religions.hatedBy.forEach((religionName) => {
              const religionScore = my.religiousScorecard.find((r) => r.name === religionName);
              if (religionScore) {
                religionScore.score -= celebrity.oneTimeEffects.religionPenalty;
                religionPenalties.push(`${religionName} (-${celebrity.oneTimeEffects.religionPenalty})`);
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

  function handleSterlingMessage(data: any) {
    if (data.messages && Array.isArray(data.messages)) {
      data.messages.forEach((message: any) => {
        // Replace typing indicator if specified
        if (message.replaceTyping) {
          const typingMessage = my.chats.sterling.chatHistory.find((m) => m.isTyping && m.sender === "sterling");
          if (typingMessage) {
            typingMessage.text = message.text;
            typingMessage.time = message.time;
            typingMessage.isTyping = false;
          }
        } else {
          // Add new message normally
          my.chats.sterling.chatHistory.push(message);
        }
      });
    }
  }

  function handleChurchFounding() {
    // Close Sterling chat and show church setup UI
    ui.chats.sterling.isOpen = false;
    ui.view = "church-setup";
  }

  function trackMoneyEarned(amount: number) {
    my.totalMoneyEarned += amount;

    // Check if player qualifies for van but hasn't been contacted yet
    if (!my.chats.harold.hasContacted && my.daysPlayed + 1 >= gameSettings.triggers.harold.days) {
      my.canBuyVan = true;
      triggerHaroldContact();
    }

    // Check if player qualifies for Sterling contact (church phase)
    // Trigger when player has had a van for the required amount of days.
    if (!my.chats.sterling.hasContacted && my.hasVan && my.chats.sterling.daysWithVan >= gameSettings.triggers.sterling.daysWithVan) {
      setTimeout(() => {
        triggerSterlingContact();
      }, 3000);
    }
  }

  // ================= CHAT AUTOMATION HELPERS =================
  function sendTextMessages(messages: Array<{ sender: string; text: string }>, chatType: "harold" | "sterling" | "plug", typingTime = 3500) {
    const chatData = my.chats[chatType];
    sendTextMessagesWithTyping(messages, chatType, chatData.chatHistory, typingTime);
  }

  // ================= CONTACT TRIGGER FUNCTIONS =================
  function triggerHaroldContact() {
    // Mark as contacted and open chat
    my.chats.harold.hasContacted = true;

    setTimeout(() => {
      ui.chats.harold.isOpen = true;
    }, 2200);

    const messages = [
      { sender: "harold", text: "hey kid it ur uncl harold" },
      { sender: "harold", text: "u need a van???" },
      { sender: "harold", text: `$${gameSettings.van.cost}` }, // This message triggers the van interface
    ];

    sendTextMessages(messages, "harold");
  }

  function triggerSterlingContact() {
    my.chats.sterling.hasContacted = true;

    // Show toast that player found a note
    toast.info("🚚 Somebody left a note on your van", {
      timeout: 3500,
      onClose: () => {
        // Show the actual note after toast disappears
        if (sterlingNoteRef.value) {
          sterlingNoteRef.value.showNote();
        }
      },
    });
  }

  function triggerPlugContact() {
    // Mark as contacted and open chat
    my.chats.plug.hasContacted = true;

    // Open chat first
    setTimeout(() => {
      ui.chats.plug.isOpen = true;
    }, 200);

    // Delay the first message a bit longer so the UI opens first
    setTimeout(() => {
      const messages = [
        { sender: "player", text: "Hey man it's rough out there, I really need a fix." },
        { sender: "plug", text: "It's $5 a hit. You know the deal." },
      ];

      sendTextMessages(messages, "plug", 3500); // Faster typing for this conversation
    }, 3000); // Wait for UI to open before starting messages
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
          const typingMessage = my.chats.plug.chatHistory.find((m) => m.isTyping && m.sender === "plug");
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
        toast.success(`${my.spice.spiceToDeliver} spice taken. ${statusMessages[status]}.`, {
          timeout: 4000,
        });
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
      toast.warning(`Looks like you're preaching without drugs again. Good luck with that!`);
      advanceToNextDay();
      return;
    }
  }

  function proceedWithoutSpice() {
    ui.spiceWarning.show = false;
    if (ui.spiceWarning.context === "travel") {
      const placeId = ui.placeIndex;
      if (my.hasVan) {
        travelToPlace(placeId);
      } else {
        choosePlace(placeId);
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
        travelToPlace(placeId);
      } else {
        choosePlace(placeId);
      }
      return;
    }

    // Check if player has ordered enough spice for tomorrow
    const spiceNeeded = my.spice.requiredAmount;
    const spiceShortage = Math.max(0, spiceNeeded - spiceOrdered);
    const spiceCost = gameSettings.spice.pricePerUnit;
    const canAfford = Math.floor(my.money / spiceCost);

    const drugBudgetAfterGas = canAfford - gameSettings.van.fixedGasPrice / gameSettings.spice.pricePerUnit;

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
      toast.warning(`Looks like you're traveling without drugs. Good luck with that!`);
      if (my.hasVan) {
        travelToPlace(placeId);
      } else {
        choosePlace(placeId);
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
    processCelebrityDailyEffects();

    // Update heat if Eternal Legacy is active
    if (my.eternalLegacy.isActive) {
      updateHeat(gameSettings.eternalLegacy.heat.dailyBaseIncrease);
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
    if (my.marketing.signSpinner.active && my.marketing.signSpinner.daysRemaining > 0) {
      my.marketing.signSpinner.daysRemaining -= 1;
      if (my.marketing.signSpinner.daysRemaining <= 0) {
        my.marketing.signSpinner.active = false;
      }
    }
    // Targeted Ad: decrement days remaining
    if (my.marketing.targetedAd.active && my.marketing.targetedAd.daysRemaining > 0) {
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
        toast.warning("Seraph AI subscription cancelled due to insufficient funds.");
      }
    }

    // Generate new daily themes for tomorrow
    generateDailyThemes();

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
        toast.warning(`Your spice addiction has worsened! You now need ${Math.ceil(my.spice.requiredAmount)} units daily.`);
      }, 1000);
    }

    if (my.spice.consumedToday >= my.spice.fatalAmount) {
      triggerEndGame("drug overdose");
    } else {
      ui.view = "sermon";
    }
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
      toast.warning("The Heat Meter is now tracking federal attention. Your days are numbered.");
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
    my.eternalLegacy.heat = Math.min(my.eternalLegacy.heat + amount, gameSettings.eternalLegacy.heat.max);

    // Check for endgame trigger
    if (my.eternalLegacy.heat >= gameSettings.eternalLegacy.heat.max) {
      triggerEndGame("prison");
    }
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
          if (celebrity.religions.likedBy && celebrity.dailyEffects.religionBoost) {
            celebrity.religions.likedBy.forEach((religionName) => {
              const religionScore = my.religiousScorecard.find((r) => r.name === religionName);
              if (religionScore) {
                religionScore.score += celebrity.dailyEffects.religionBoost;
                religionBoosts.push(`${religionName} (+${celebrity.dailyEffects.religionBoost})`);
              }
            });
            effects.religionBoosts = religionBoosts;
          }

          if (celebrity.religions.hatedBy && celebrity.dailyEffects.religionPenalty) {
            celebrity.religions.hatedBy.forEach((religionName) => {
              const religionScore = my.religiousScorecard.find((r) => r.name === religionName);
              if (religionScore) {
                religionScore.score -= celebrity.dailyEffects.religionPenalty;
                religionPenalties.push(`${religionName} (-${celebrity.dailyEffects.religionPenalty})`);
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
          if (celebrity.religions?.likedBy && celebrity.merch.religionBonusChance && religion) {
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

  function terminateCelebrityFriendship(celebrity: any, reason: "voluntary" | "non-payment") {
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
        const religionScore = my.religiousScorecard.find((r) => r.name === religionName);
        if (religionScore) {
          religionScore.score -= termination.religionPenalty;
        }
      });
      effects.religionPenalty = termination.religionPenalty;
    }

    if (termination.religionBoost && celebrity.religions?.hatedBy) {
      celebrity.religions.hatedBy.forEach((religionName) => {
        const religionScore = my.religiousScorecard.find((r) => r.name === religionName);
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
        toast.error("That was probably too much...", { timeout: ui.timing.toastDuration });
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
      my.church.religion = my.religiousScorecard[Math.floor(Math.random() * my.religiousScorecard.length)];
      my.chats.sterling.hasContacted = true;
      toast.info("DEBUG: Church auto-founded for Eternal Legacy testing");
      my.place = { ...my.church.location };
      my.isStreetPreaching = false;
    }

    if (!my.eternalLegacy.isActive) {
      triggerEternalLegacy();
      toast.success("DEBUG: Eternal Legacy phase manually triggered!");
    } else {
      toast.warning("Eternal Legacy is already active!");
    }
    logGameplayToFirebase("cheatUsed", { name: "Trigger Eternal Legacy" });
  }

  function debugAddHeat() {
    if (my.eternalLegacy.isActive) {
      updateHeat(10);
      toast.info(`DEBUG: Added 10 heat. Current: ${my.eternalLegacy.heat}/${gameSettings.eternalLegacy.heat.max}`);
    } else {
      toast.warning("Eternal Legacy must be active to add heat!");
    }
    logGameplayToFirebase("cheatUsed", { name: "Add Heat (+10)" });
  }

  function debugTriggerHarold() {
    if (!my.chats.harold.hasContacted) {
      triggerHaroldContact();
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
      triggerSterlingContact();
    } else {
      toast.warning("Sterling has already been contacted!");
    }
    logGameplayToFirebase("cheatUsed", { name: "Trigger Sterling" });
  }

  // ================= INITIALISE STUFF AT GAME START =================
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

  function toggleDebugMode() {
    gameSettings.isDebug = !gameSettings.isDebug;
    if (gameSettings.isDebug) {
      console.log("Debug mode enabled");
    } else {
      console.log("Debug mode disabled");
    }
  }

  // ================= COMPUTEDS =================
  const computedTopicsYesterday = computed(() => {
    return computeTopicsYesterday(my.sermonYesterday);
  });

  const sortedAudienceReactions = computed(() => {
    return sortAudienceReactions(my.audienceReactions);
  });

  const totalIgnoredAudience = computed(() => {
    return calculateIgnoredAudience(my.audienceReactions);
  });

  const availablePlaces = computed(() => {
    return getAvailablePlaces(my.hasVan, (my.place as any)?.id);
  });

  const computedTopReligions = computed(() => {
    return computeTopReligions(my.place, my.religiousScorecard, my.church.religion?.id);
  });

  const purchasedMammonItems = computed(() => {
    return getPurchasedItems(my.eternalLegacy.purchasedItems);
  });

  const purchasedDarkDeeds = computed(() => {
    return getPurchasedItems(my.eternalLegacy.darkDeeds);
  });

  const temporarySermonScores = computed(() => {
    return computeTemporarySermonScores(ui.selectedTopics, themes, religions);
  });

  // ================= FIREBASE LOGGING =================
  async function logGameplayToFirebase(eventType: string, data: any = {}) {
    try {
      const now = serverTimestamp();

      switch (eventType) {
        case "gameStarted":
          await updateDoc(statsRef, {
            gamesStarted: increment(1),
            lastGameStarted: now,
          });

          // Log player name to general players collection
          if (my.name) {
            const playerRef = doc(db, `stats/general/players/${my.name}`);
            const playerSnap = await getDoc(playerRef);

            if (playerSnap.exists()) {
              await updateDoc(playerRef, {
                gamesPlayed: increment(1),
                mostRecentGame: "megachurch",
                lastPlayed: now,
              });
            } else {
              await setDoc(playerRef, {
                name: my.name,
                gamesPlayed: 1,
                mostRecentGame: "megachurch",
                lastPlayed: now,
              });
            }

            const nameRef = doc(db, `stats/megachurch/players/${my.name}`);
            const nameSnap = await getDoc(nameRef);
            if (nameSnap.exists()) {
              await updateDoc(nameRef, {
                gamesPlayed: increment(1),
                lastPlayed: now,
              });
            } else {
              await setDoc(nameRef, {
                name: my.name,
                gamesPlayed: 1,
                lastPlayed: now,
              });
            }
          }
          break;

        case "gameFinished":
          const gameFinishedUpdates: any = {
            gamesFinished: increment(1),
            lastGameFinished: now,
          };

          if (data.cause === "drug overdose") {
            gameFinishedUpdates.overdoses = increment(1);
          } else if (data.cause === "prison") {
            gameFinishedUpdates.prisonSentences = increment(1);
          }

          await updateDoc(statsRef, gameFinishedUpdates);
          break;

        case "churchFounded":
          await updateDoc(statsRef, {
            churchesFounded: increment(1),
          });

          // Log location
          if (data.location) {
            const locationRef = doc(db, `stats/megachurch/locations/${data.location}`);
            const locationSnap = await getDoc(locationRef);

            if (locationSnap.exists()) {
              await updateDoc(locationRef, {
                churchesFounded: increment(1),
              });
            } else {
              await setDoc(locationRef, {
                name: data.location,
                churchesFounded: 1,
              });
            }
          }

          // Log religion
          if (data.religion) {
            const religionRef = doc(db, `stats/megachurch/religions/${data.religion}`);
            const religionSnap = await getDoc(religionRef);

            if (religionSnap.exists()) {
              await updateDoc(religionRef, {
                churchesFounded: increment(1),
              });
            } else {
              await setDoc(religionRef, {
                name: data.religion,
                churchesFounded: 1,
              });
            }
          }

          // Log church name
          if (data.churchName) {
            const nameRef = doc(db, `stats/megachurch/churchNames/${data.churchName}`);
            const nameSnap = await getDoc(nameRef);

            if (nameSnap.exists()) {
              await updateDoc(nameRef, {
                churchesFounded: increment(1),
              });
            } else {
              await setDoc(nameRef, {
                name: data.churchName,
                churchesFounded: 1,
              });
            }
          }
          break;

        case "spiceTaken":
          if (data.amount > 0) {
            await updateDoc(statsRef, {
              spiceTaken: increment(data.amount),
            });
          }
          break;

        case "dayEnded":
          const dayUpdates: any = {
            daysPlayed: increment(1),
          };

          if (data.preachedOnStreet) {
            dayUpdates.daysPreachedOnStreet = increment(1);
          }

          if (data.preachedInChurch) {
            dayUpdates.daysPreachedInChurch = increment(1);
          }

          if (data.seraphAIActive) {
            dayUpdates.seraphAIDaysActive = increment(1);
          }

          await updateDoc(statsRef, dayUpdates);

          // Log sermon topics
          if (data.sermonTopics && data.sermonTopics.length > 0) {
            for (const topic of data.sermonTopics) {
              const topicRef = doc(db, `stats/megachurch/sermonTopics/${topic.title}`);
              const topicSnap = await getDoc(topicRef);

              if (topicSnap.exists()) {
                await updateDoc(topicRef, {
                  timesPreached: increment(1),
                });
              } else {
                await setDoc(topicRef, {
                  title: topic.title,
                  timesPreached: 1,
                });
              }
            }
          }
          break;

        case "vanPurchased":
          await updateDoc(statsRef, {
            vansPurchased: increment(1),
          });
          break;

        case "workshopPurchase":
          if (data.type === "merch") {
            const merchRef = doc(db, `stats/megachurch/merch/${data.name}`);
            const merchSnap = await getDoc(merchRef);

            if (merchSnap.exists()) {
              await updateDoc(merchRef, {
                timesPurchased: increment(data.quantity || 1),
              });
            } else {
              await setDoc(merchRef, {
                name: data.name,
                timesPurchased: data.quantity || 1,
              });
            }
          } else if (data.type === "upgrade") {
            const upgradeRef = doc(db, `stats/megachurch/upgrades/${data.name}`);
            const upgradeSnap = await getDoc(upgradeRef);

            const upgradeData: any = {
              name: data.name,
              timesPurchased: upgradeSnap.exists() ? increment(1) : 1,
            };

            // Special handling for communion snacks
            if (data.communionType) {
              upgradeData.communionType = data.communionType;
              upgradeData.level = data.level;
            }

            if (upgradeSnap.exists()) {
              await updateDoc(upgradeRef, { timesPurchased: increment(1) });
            } else {
              await setDoc(upgradeRef, upgradeData);
            }
          } else if (data.type === "marketing") {
            const marketingRef = doc(db, `stats/megachurch/marketing/${data.name}`);
            const marketingSnap = await getDoc(marketingRef);

            if (marketingSnap.exists()) {
              await updateDoc(marketingRef, {
                timesPurchased: increment(1),
              });
            } else {
              await setDoc(marketingRef, {
                name: data.name,
                timesPurchased: 1,
              });
            }

            // Handle targeted marketing with religion tracking
            if (data.targetedReligion) {
              const religionPath = `religions.${data.targetedReligion}.timesTargeted`;
              await updateDoc(marketingRef, {
                [religionPath]: increment(1),
              });
            }
          }
          break;

        case "eternalLegacyPurchase":
          if (data.collection === "mammon") {
            const itemRef = doc(db, `stats/megachurch/eternalLegacy/${data.name}`);
            const itemSnap = await getDoc(itemRef);

            if (itemSnap.exists()) {
              await updateDoc(itemRef, {
                timesPurchased: increment(1),
              });
            } else {
              await setDoc(itemRef, {
                name: data.name,
                timesPurchased: 1,
              });
            }
          } else if (data.collection === "darkDeeds") {
            const deedRef = doc(db, `stats/megachurch/darkDeeds/${data.name}`);
            const deedSnap = await getDoc(deedRef);

            if (deedSnap.exists()) {
              await updateDoc(deedRef, {
                timesEnacted: increment(1),
              });
            } else {
              await setDoc(deedRef, {
                name: data.name,
                timesEnacted: 1,
              });
            }
          } else if (data.collection === "celebrities") {
            const itemRef = doc(db, `stats/megachurch/celebrityFriends/${data.name}`);
            const itemSnap = await getDoc(itemRef);

            if (itemSnap.exists()) {
              await updateDoc(itemRef, {
                timesFriended: increment(1),
              });
            } else {
              await setDoc(itemRef, {
                name: data.name,
                timesFriended: 1,
                timesUnfriended: 0,
              });
            }
          }
          break;

        case "celebrityUnfriending":
          const itemRef = doc(db, `stats/megachurch/celebrityFriends/${data.name}`);
          const itemSnap = await getDoc(itemRef);

          if (itemSnap.exists()) {
            await updateDoc(itemRef, {
              timesUnfriended: increment(1),
            });
          } else {
            await setDoc(itemRef, {
              name: data.name,
              timesFriended: 1,
              timesUnfriended: 1,
            });
          }
          break;
        case "cheatUsed":
          const cheatRef = doc(db, `stats/megachurch/cheats/${data.name}`);
          const cheatSnap = await getDoc(cheatRef);

          if (cheatSnap.exists()) {
            await updateDoc(cheatRef, {
              timesUsed: increment(1),
            });
          } else {
            await setDoc(cheatRef, {
              name: data.name,
              timesUsed: 1,
            });
          }
          break;
      }
    } catch (error) {
      console.error(`Error logging ${eventType} to Firebase:`, error);
    }
  }

  // === Game Control Functions ===

  function restartGame() {
    location.reload();
  }

  // ================= WAKING UP ANIMATION =================
  watch(
    () => ui.view,
    (newView) => {
      if (newView === "title-screen") {
        // Reset all animation states
        ui.wakingUp.showTitle = false;
        ui.wakingUp.showSubtitle = false;
        ui.wakingUp.showForm = false;

        // Trigger content animations after the CSS wake-up animation progresses
        setTimeout(() => (ui.wakingUp.showTitle = true), 5000); // Show title after 4.5s
        setTimeout(() => (ui.wakingUp.showSubtitle = true), 8200); // Show subtitle after 8s
        setTimeout(() => (ui.wakingUp.showForm = true), 10000); // Show form after 11s
      }
    },
    { immediate: true },
  );

  // ================= LIFECYCLE =================
  onMounted(() => {
    const hostname = window.location.hostname;
    const urlParams = new URLSearchParams(window.location.search);

    // Redirect from old Firebase hosting URLs to new domain
    if (hostname === "kinda-fun.web.app" || hostname === "kinda-fun.firebaseapp.com") {
      window.location.replace("https://kinda.fun/megachurch.html");
      return;
    }
    // Allow debug button if cheat param is present or on localhost
    if (urlParams.get("cheats") || urlParams.get("debug") || hostname === "localhost") {
      gameSettings.isDebugButtonVisible = true;
    }

    initialiseGame();
    my.name = localStorage.getItem("kindaFunPlayerName") || "";
  });
</script>

<template lang="pug" src="./Megachurch.pug"></template>
<style lang="scss" src="./Megachurch.scss"></style>
