<script setup lang="ts">
  import { onMounted, ref, computed, watch } from "vue";
  import Multiselect from "@vueform/multiselect";
  import "@vueform/multiselect/themes/default.css";
  import { religions } from "./ts/_religions";
  import { places } from "./ts/_places";
  import { themes } from "./ts/_sermons";
  import { gameSettings } from "./ts/variables/_gameSettings";
  import { my } from "./ts/variables/_my";
  import { ui } from "./ts/variables/_ui";
  import { doc, increment, serverTimestamp, updateDoc, setDoc, getDoc } from "firebase/firestore";
  import { useFirestore } from "vuefire";
  import FollowerToast from "./components/Toasts/FollowerToast.vue";
  import ListenerToast from "./components/Toasts/ListenerToast.vue";
  import DonationToast from "./components/Toasts/DonationToast.vue";
  import MerchToast from "./components/Toasts/MerchToast.vue";
  import CelebrityFriendToast from "./components/Toasts/CelebrityFriendToast.vue";
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
  import { addCommas, dollars } from "../../shared/ts/_functions";
  import { useToast } from "vue-toastification";
  import {
    computeTopicsYesterday,
    sortAudienceReactions,
    calculateIgnoredAudience,
    getAvailablePlaces,
    computeTopReligions,
    getPurchasedItems,
    computeTemporarySermonScores,
  } from "./ts/_computeds";
  import { useMegachurchHelpers } from "./ts/_useMegachurchHelpers";

  // Firebase/VueFire is client-only: during prerender/SSR these composables
  // have no VueFire app, so guard them and let statsRef be null on the server.
  const db = import.meta.client ? useFirestore() : null;
  const statsRef = db ? doc(db, `stats/megachurch`) : null;
  // Toasts are client-only too. Stub on the server so any accidental call during
  // prerender is a harmless no-op.
  const toast = import.meta.client ? useToast() : { success() {}, error() {}, info() {}, warning() {} };
  const sterlingNoteRef = ref<{ showNote: () => void } | null>(null);

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

  const {
    startNewGame,
    chooseReligion,
    choosePlace,
    getReligion,
    getPlace,
    travelToPlace,
    foundChurch,
    cancelChurchSetup,
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
    endTheDay,
    getSpiceMultiplier,
    progressAddiction,
    applyPendingAddiction,
    resetDailySpice,
    openPlugInterface,
    closePlugInterface,
    openHaroldInterface,
    closeHaroldInterface,
    handleHaroldMessage,
    buyVan,
    openSterlingInterface,
    closeSterlingInterface,
    showWorshopZone,
    closeWorshopZone,
    handleWorshopPurchase,
    onBannerAccepted,
    openWorshopZoneForSeraph,
    dismissSeraphNag,
    showEternalLegacyShop,
    closeEternalLegacyShop,
    handleEternalLegacyPurchase,
    handleSterlingMessage,
    handleChurchFounding,
    trackMoneyEarned,
    sendTextMessages,
    triggerHaroldContact,
    triggerSterlingContact,
    triggerPlugContact,
    handlePlugOrder,
    deliverOrderedSpice,
    handleNextDayClick,
    proceedWithoutSpice,
    openPlugFromWarning,
    handleTravelClick,
    advanceToNextDay,
    startMorningRoutine,
    checkEternalLegacyTrigger,
    triggerEternalLegacy,
    playEternalLegacyVoicemail,
    closeSterlingVoicemail,
    onVoicemailCompleted,
    openEternalLegacyFromVoicemail,
    updateHeat,
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
    triggerEndGame,
    debugAddMoney,
    debugGetVan,
    debugTriggerSpeedPreaching,
    debugTriggerEternalLegacy,
    debugAddHeat,
    debugTriggerHarold,
    debugTriggerSterling,
    initialiseScoreCard,
    initialiseStartingLocation,
    initialiseGame,
    toggleDebugMode,
  } = useMegachurchHelpers({
    my,
    ui,
    toast,
    sterlingNoteRef,
    computedTopicsYesterday,
    logGameplayToFirebase,
    ListenerToast,
    DonationToast,
    MerchToast,
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

        case "gameFinished": {
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
        }

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

        case "dayEnded": {
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
        }

        case "vanPurchased":
          await updateDoc(statsRef, {
            vansPurchased: increment(1),
          });
          break;

        case "worshopPurchase":
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

        case "celebrityUnfriending": {
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
        }
        case "cheatUsed": {
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
