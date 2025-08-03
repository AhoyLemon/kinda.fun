<script setup>
  import { reactive, computed, onMounted, onBeforeMount } from "vue";
  // import { DateTime } from "luxon";
  import { timeZoneOffset, jsonURL } from "./js/_variables";
  import { formatDate, dollars, billionsOfDollars, exceededBudgetOutput, formatStatement } from "./js/_functions";
  import { addCommas, percentOf } from "@/shared/js/_functions";
  import { columns } from "./js/_columns";
  import axios from "axios";
  import moment from "moment";
  import "vue-good-table-next/dist/vue-good-table-next.css";
  import { VueGoodTable } from "vue-good-table-next";
  import { getDatabase, ref, get } from "firebase/database";
  import { initializeApp } from "firebase/app";
  import { firebaseConfig } from "../../../firebaseConfig.public";
  import { useFirestore } from "vuefire";
  import { collection, getDocs } from "firebase/firestore";
  import { challenges } from "../invalid/js/_challenges";

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Variables

  const dates = reactive({
    today: null,
    guillotine: {
      launched: "2022-05-16",
      dayCount: null,
    },
    cameo: {
      launched: "2021-02-16",
      dayCount: null,
    },

    wrongest: {
      launched: "2020-01-27",
      dayCount: null,
    },
    sisyphus: {
      launched: "2021-09-21",
      dayCount: null,
    },
    pretend: {
      launched: "2023-08-23",
      dayCount: 0,
    },
    meeting: {
      launched: "2025-07-09",
      dayCount: 0,
    },
    invalid: {
      launched: "2025-08-01",
      dayCount: null,
    },
  });

  const stats = reactive({
    general: {},
    guillotine: {},
    cameo: {},
    invalid: {},
    wrongest: {},
    sisyphus: {},
    pretend: {},
    meeting: {},
  });

  const ui = reactive({
    viewing: "loading",
    cameoLoaded: false,
    invalidLoaded: false,
    wrongestLoaded: false,
    sisyphusLoaded: false,
    guillotineLoaded: false,
    pretendLoaded: false,
    meetingLoaded: false,
  });

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const firestoreDb = useFirestore();

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Functions

  // Helper to load Firestore stats for a game
  function convertTimestamp(ts) {
    if (ts && typeof ts === "object" && typeof ts.seconds === "number") {
      return new Date(ts.seconds * 1000 + Math.floor(ts.nanoseconds / 1e6));
    }
    return ts;
  }

  /**
   * Loads Firestore stats for a game, normalizing timestamp fields and subcollections.
   * @param {string} game - The game name (e.g. "cameo", "sisyphus", ...)
   * @param {object} options - {
   *   mainDocTimestamps: [fieldName, ...],
   *   subcollections: {
   *     [subcollectionName]: {
   *       process: (data) => data, // optional per-item processor
   *       timestampFields: [fieldName, ...] // optional per-item timestamp fields
   *     }
   *   }
   * }
   */
  async function loadFirestoreStats(game, options) {
    const { doc, getDoc, collection, getDocs } = await import("firebase/firestore");
    // Get the main doc
    const mainDocSnap = await getDoc(doc(firestoreDb, "stats", game));
    if (mainDocSnap.exists()) {
      const mainData = mainDocSnap.data();
      // Convert timestamps
      if (options.mainDocTimestamps) {
        options.mainDocTimestamps.forEach((field) => {
          if (mainData[field]) mainData[field] = convertTimestamp(mainData[field]);
        });
      }
      Object.assign(stats[game], mainData);
    }
    // Load subcollections
    if (options.subcollections) {
      for (const [sub, subOpts] of Object.entries(options.subcollections)) {
        const snap = await getDocs(collection(firestoreDb, `stats/${game}/${sub}`));
        stats[game][sub] = snap.docs.map((doc) => {
          let data = doc.data();
          // Convert per-item timestamps
          if (subOpts.timestampFields) {
            subOpts.timestampFields.forEach((field) => {
              if (data[field]) data[field] = convertTimestamp(data[field]);
            });
          }
          // Custom processor
          if (subOpts.process) data = subOpts.process(data);
          return data;
        });
      }
    }
  }

  const getData = async (game) => {
    ui.viewing = "loading";

    let errorOccurred = false;
    if (game == "general") {
      try {
        const { doc, getDoc } = await import("firebase/firestore");
        // Cameo
        const cameoSnap = await getDoc(doc(firestoreDb, "stats", "cameo"));
        if (cameoSnap.exists()) {
          const cameoData = cameoSnap.data();
          stats.general.cameoGamesStarted = cameoData.gamesStarted || 0;
          stats.general.cameoLastPlayed = cameoData.lastGameStarted ? convertTimestamp(cameoData.lastGameStarted) : null;
        }
        // Guillotine
        const guillotineSnap = await getDoc(doc(firestoreDb, "stats", "guillotine"));
        if (guillotineSnap.exists()) {
          const guillotineData = guillotineSnap.data();
          stats.general.guillotineGamesStarted = guillotineData.gamesStarted || 0;
          stats.general.guillotineLastPlayed = guillotineData.lastGameStarted ? convertTimestamp(guillotineData.lastGameStarted) : null;
        }
        // Meeting
        const meetingSnap = await getDoc(doc(firestoreDb, "stats", "meeting"));
        if (meetingSnap.exists()) {
          const meetingData = meetingSnap.data();
          stats.general.meetingGamesStarted = meetingData.gamesStarted || 0;
          stats.general.meetingLastPlayed = meetingData.lastGameStarted ? convertTimestamp(meetingData.lastGameStarted) : null;
        }
        // Pretend
        const pretendSnap = await getDoc(doc(firestoreDb, "stats", "pretend"));
        if (pretendSnap.exists()) {
          const pretendData = pretendSnap.data();
          stats.general.pretendGamesStarted = pretendData.gamesStarted || 0;
          stats.general.pretendLastPlayed = pretendData.lastGameStarted ? convertTimestamp(pretendData.lastGameStarted) : null;
        }
        // Sisyphus (no gamesStarted, use firstClick)
        const sisyphusSnap = await getDoc(doc(firestoreDb, "stats", "sisyphus"));
        if (sisyphusSnap.exists()) {
          const sisyphusData = sisyphusSnap.data();
          stats.general.sisyphusFirstClick = sisyphusData.firstClick || 0;
          stats.general.sisyphusLastPlayed = sisyphusData.lastGameStarted ? convertTimestamp(sisyphusData.lastGameStarted) : null;
        }

        const invalidSnap = await getDoc(doc(firestoreDb, "stats", "invalid"));
        if (invalidSnap.exists()) {
          const invalidData = invalidSnap.data();
          stats.general.invalidGamesStarted = invalidData.gamesStarted || 0;
          stats.general.invalidLastPlayed = invalidData.lastGameStarted ? convertTimestamp(invalidData.lastGameStarted) : null;
        }

        ui.viewing = "general";
      } catch (e) {
        // fallback: clear fields
        stats.general.cameoGamesStarted = 0;
        stats.general.cameoLastPlayed = null;
        stats.general.guillotineGamesStarted = 0;
        stats.general.guillotineLastPlayed = null;
        stats.general.meetingGamesStarted = 0;
        stats.general.meetingLastPlayed = null;
        stats.general.pretendGamesStarted = 0;
        stats.general.pretendLastPlayed = null;
        stats.general.sisyphusFirstClick = null;
        console.error("Error loading general stats from Firestore:", e);
      }
    }

    if (game == "cameo") {
      try {
        await loadFirestoreStats("cameo", {
          mainDocTimestamps: ["lastGameStarted", "lastGameFinished"],
          subcollections: {
            celebs: {
              process: (data) => {
                if (typeof data.actualValue === "number" && typeof data.averagePlayerValue === "number") {
                  data.marketForces = data.averagePlayerValue - data.actualValue;
                }
                return data;
              },
            },
            specialGames: {},
          },
        });
        dates.cameo.dayCount = dates.today.diff(dates.cameo.launched, "days");
        ui.cameoLoaded = true;
        ui.viewing = "cameo";
      } catch (e) {
        stats.cameo.celebs = [];
        stats.cameo.specialGames = [];
        errorOccurred = true;
        console.error("Error loading cameo stats from Firestore:", e);
      }
    } else if (game == "sisyphus") {
      try {
        await loadFirestoreStats("sisyphus", {
          mainDocTimestamps: ["firstClick", "lastGameStarted"],
          subcollections: {
            cheevos: {
              timestampFields: ["lastEarned"],
              process: (data) => {
                data.icount = typeof data.icount === "number" ? data.icount : 0;
                data.pointValue = typeof data.pointValue === "number" ? data.pointValue : 0;
                return data;
              },
            },
            purchases: {
              timestampFields: ["lastPurchased"],
              process: (data) => {
                data.icount = typeof data.icount === "number" ? data.icount : 0;
                // Convert jobTitles.lastPlayed to timestamp if it's an object
                if (stats.meeting.jobTitles && Array.isArray(stats.meeting.jobTitles)) {
                  stats.meeting.jobTitles.forEach((jt) => {
                    if (jt.lastPlayed && typeof jt.lastPlayed === "object" && typeof jt.lastPlayed.seconds === "number") {
                      jt.lastPlayed = convertTimestamp(jt.lastPlayed);
                    }
                  });
                }
                data.price = typeof data.price === "number" ? data.price : 0;
                return data;
              },
            },
          },
        });
        dates.sisyphus.dayCount = dates.today.diff(dates.sisyphus.launched, "days");
        ui.sisyphusLoaded = true;
        ui.viewing = "sisyphus";
      } catch (e) {
        stats.sisyphus.cheevos = [];
        stats.sisyphus.purchases = [];
        errorOccurred = true;
        console.error("Error loading sisyphus stats from Firestore:", e);
      }
    } else if (game == "guillotine") {
      try {
        await loadFirestoreStats("guillotine", {
          mainDocTimestamps: ["lastGameStarted", "gameLastFinished"],
          subcollections: {
            heads: {
              timestampFields: ["lastRemoved"],
            },
          },
        });
        dates.guillotine.dayCount = dates.today.diff(dates.guillotine.launched, "days");
        ui.guillotineLoaded = true;
        ui.viewing = "guillotine";
      } catch (e) {
        stats.guillotine.heads = [];
        errorOccurred = true;
        console.error("Error loading guillotine stats from Firestore:", e);
      }
    } else if (game == "pretend") {
      try {
        await loadFirestoreStats("pretend", {
          mainDocTimestamps: ["lastGameStarted", "lastGameFinished"],
          subcollections: {
            impersonators: {
              process: (data) => {
                const correct = typeof data.correctGuessCount === "number" ? data.correctGuessCount : 0;
                const close = typeof data.closeGuessCount === "number" ? data.closeGuessCount : 0;
                const bad = typeof data.badGuessCount === "number" ? data.badGuessCount : 0;
                const total = correct + close + bad;
                data.correctPercent = total > 0 ? (((correct + close) / total) * 100).toFixed(1) : "0.0";
                return data;
              },
            },
          },
        });
        dates.pretend.dayCount = dates.today.diff(dates.pretend.launched, "days");
        ui.pretendLoaded = true;
        ui.viewing = "pretend";
      } catch (e) {
        stats.pretend.impersonators = [];
        errorOccurred = true;
        console.error("Error loading pretend stats from Firestore:", e);
      }
    } else if (game == "meeting") {
      try {
        await loadFirestoreStats("meeting", {
          mainDocTimestamps: ["lastGameStarted", "lastGameFinished"],
          subcollections: {
            cards: {},
            players: {
              timestampFields: ["lastPlayed"],
            },
            jobTitles: {
              timestampFields: ["lastPlayed"],
            },
          },
        });
        dates.meeting.dayCount = dates.today.diff(dates.meeting.launched, "days");
        ui.meetingLoaded = true;
        ui.viewing = "meeting";
      } catch (e) {
        if (!stats.meeting) stats.meeting = {};
        stats.meeting.cards = [];
        stats.meeting.players = [];
        stats.meeting.jobTitles = [];
        errorOccurred = true;
        console.error("Error loading meeting stats from Firestore:", e);
      }
    } else if (game == "invalid") {
      try {
        await loadFirestoreStats("invalid", {
          mainDocTimestamps: ["lastGameStarted", "lastGameFinished"],
          subcollections: {
            bugs: {},
            challenges: {
              timestampFields: ["lastChosen"],
            },
            gameSizes: {
              timestampFields: ["lastGameStarted", "lastGameFinished"],
            },
            letters: {},
            passwords: {
              timestampFields: ["lastCreated", "lastCracked"],
            },
            rules: {
              timestampFields: ["lastPlayed"],
            },
          },
        });
        dates.invalid.dayCount = dates.today.diff(dates.invalid.launched, "days");
        ui.invalidLoaded = true;
        ui.viewing = "invalid";
      } catch (e) {
        if (!stats.invalid) stats.invalid = {};
        stats.invalid.bugs = [];
        stats.invalid.challenges = [];
        stats.invalid.gameSizes = [];
        stats.invalid.letters = [];
        stats.invalid.passwords = [];
        stats.invalid.rules = [];
        errorOccurred = true;
        console.error("Error loading invalid stats from Firestore:", e);
      }
    }

    // Always update URL and title, even if error occurred
    const newURL = window.location.origin + window.location.pathname + "?game=" + game;
    history.pushState({ game: game }, game + " | Kinda Fun Stats", newURL);
    document.title = game + " | Kinda Fun Stats";

    if (errorOccurred) {
      // Optionally, show a user-friendly error message or set a UI flag
      console.warn(`Stats for '${game}' could not be loaded. Check Firestore or network.`);
    }
  };

  const formatTime = (stamp, format) => {
    if (format == "fromNow") {
      return moment(stamp).fromNow();
    } else if (format == "calendar") {
      if (moment(stamp).diff(moment(), "days") > -7) {
        return moment(stamp).calendar();
      } else {
        return moment(stamp).format("MMM Do @ LT");
      }
    } else if (format) {
      return moment(stamp).format(format);
    } else {
      return moment(stamp).format("LLLL");
    }
  };

  const calculateAverage = (count, iterations) => {
    if (!count || !iterations) {
      return "0";
    }
    const n = (count / iterations).toFixed(2);
    return addCommas(n);
  };

  const getGameDataFromURL = () => {
    const loadedURL = new URL(window.location.href);
    const game = loadedURL.searchParams.get("game");
    getData(game);
  };

  const calculateSpend = (rowObj) => {
    return addCommas(parseInt(rowObj.icount) * parseInt(rowObj.price));
  };

  const pretendCorrectPct = (rowObj) => {
    const total = rowObj.correctGuess + rowObj.closeGuess + rowObj.badGuess;
    let correct = rowObj.correctGuess;
    if (rowObj.closeGuess && rowObj.closeGuess > 0) {
      correct += rowObj.closeGuess * 0.7;
    }
    return percentOf(total, correct) + "%";
  };

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Computed

  const computedCameoPlayerData = computed(() => {
    let cameoObject = {
      averagePoints: 0,
      averageCorrectSorts: 0,
      averageBirthdayWishes: 0,
      exceededBudget: 0,
      observedBudget: 0,
      exceededBudgetPercent: 0,
      correctSortPercent: 0,
    };

    const self = this;
    if (!stats.cameo.playerScores || stats.cameo.playerScores.length < 10) {
      return cameoObject;
    }

    let totalPoints = 0;
    let totalCorrectSorts = 0;
    let totalBirthdayWishes = 0;
    stats.cameo.playerScores.forEach((player) => {
      totalPoints += player.playerScore;
      totalCorrectSorts += player.correctSorts;
      totalBirthdayWishes += player.birthdayWishes;

      if (player.exceededBudget == "no") {
        // do nothing
        // This is because I screwed up early data.
      } else if (player.exceededBudget == "NO") {
        cameoObject.observedBudget++;
      } else if (player.exceededBudget == "YES") {
        cameoObject.exceededBudget++;
      }
    });

    let playerCount = stats.cameo.playerScores.length;
    cameoObject.averagePoints = parseInt(totalPoints / playerCount);
    cameoObject.averagePoints = addCommas(cameoObject.averagePoints);
    cameoObject.averageCorrectSorts = parseInt(totalCorrectSorts / playerCount);
    cameoObject.averageBirthdayWishes = parseInt(totalBirthdayWishes / playerCount);

    cameoObject.exceededBudgetPercent = percentOf(cameoObject.observedBudget + cameoObject.exceededBudget, cameoObject.exceededBudget);
    cameoObject.correctSortPercent = percentOf(12, cameoObject.averageCorrectSorts);

    return cameoObject;
  });

  const computedNaughtyPercentage = computed(() => {
    const self = this;

    if (!stats.general || !stats.general.invalid || !stats.general.invalid.NaughtyModeOn) {
      return "0";
    }

    return percentOf(stats.general.invalid.NaughtyModeOn + stats.general.invalid.NaughtyModeOff, stats.general.invalid.NaughtyModeOn);
  });

  const computedCrackedPasswordPercent = computed(() => {
    if (!stats.invalid || !stats.invalid.successfulPasswords || !stats.invalid.cracks) {
      return "0";
    }

    return percentOf(stats.invalid.successfulPasswords.length, stats.invalid.cracks.length);
  });

  const computedServerCrashes = computed(() => {
    const self = this;
    if (!stats.invalid || !stats.invalid.crashes) {
      return "0";
    }
    let c = 0;
    stats.invalid.crashes.forEach((crash) => {
      c += crash.icount;
    });
    return c;
  });

  const computedAveragePlayerCounts = computed(() => {
    const self = this;
    let invalidAverage;
    let invalidMostCommon;
    let wrongestAverage;
    let wrongestMostCommon;
    let totalPlayers;
    let totalGames;
    let highestCount;

    if (stats && stats.invalid && stats.invalid.playerCounts) {
      totalPlayers = 0;
      totalGames = 0;
      highestCount = 0;
      stats.invalid.playerCounts.forEach((element) => {
        let players = element.iname.replace(/\D/g, "");
        players = parseInt(players);
        const count = element.icount;
        totalPlayers += players * count;
        totalGames += element.icount;
        if (count > highestCount) {
          highestCount = count;
          invalidMostCommon = element.iname;
        }
      });
      invalidAverage = (totalPlayers / totalGames).toFixed(1);
    }

    if (stats && stats.wrongest && stats.wrongest.playerCounts) {
      totalPlayers = 0;
      totalGames = 0;
      highestCount = 0;
      stats.wrongest.playerCounts.forEach((element) => {
        let players = element.iname.replace(/\D/g, "");
        players = parseInt(players);
        const count = element.icount;
        totalPlayers += players * count;
        totalGames += element.icount;
        if (count > highestCount) {
          highestCount = count;
          wrongestMostCommon = element.iname;
        }
      });
      wrongestAverage = (totalPlayers / totalGames).toFixed(1);
    }

    return {
      invalid: invalidAverage,
      invalidMostCommon: invalidMostCommon,
      wrongest: wrongestAverage,
      wrongestMostCommon: wrongestMostCommon,
    };
  });

  const computedAvgMarketForces = computed(() => {
    if (!stats.cameo.celebs || !stats.cameo.celebs.length) return dollars(0);
    // Only include celebs with a valid, finite number for marketForces
    const filtered = stats.cameo.celebs.filter((celeb) => typeof celeb.marketForces === "number" && isFinite(celeb.marketForces));
    if (!filtered.length) return dollars(0);
    const total = filtered.reduce((sum, celeb) => sum + celeb.marketForces, 0);
    return dollars(total / filtered.length);
  });

  const computedMostPopularCameoGame = computed(() => {
    if (!stats.cameo || !stats.cameo.specialGames || !stats.cameo.specialGames.length) {
      return null;
    }
    const total = stats.cameo.specialGames.reduce((sum, game) => sum + (game.startedCount || 0), 0);
    const mostPopular = stats.cameo.specialGames.reduce((max, game) => {
      return (game.startedCount || 0) > (max.startedCount || 0) ? game : max;
    }, stats.cameo.specialGames[0]);
    return {
      ...mostPopular,
      percent: total ? (((mostPopular.startedCount || 0) / total) * 100).toFixed(1) : "0",
    };
  });

  const computedMostOvervaluedCeleb = computed(() => {
    if (!stats.cameo.celebs || !stats.cameo.celebs.length) return null;
    // Only consider celebs with a valid, finite marketForces number
    const filtered = stats.cameo.celebs.filter((celeb) => typeof celeb.marketForces === "number" && isFinite(celeb.marketForces));
    if (!filtered.length) return null;
    return filtered.reduce((min, celeb) => (celeb.marketForces < min.marketForces ? celeb : min));
  });

  const computedSisyphusCheevos = computed(() => {
    if (!stats.sisyphus.cheevos) {
      return { totalCheevos: 0, totalPoints: 0 };
    }
    let totalCheevos = 0;
    let totalPoints = 0;
    stats.sisyphus.cheevos.forEach((cheevo) => {
      const earned = typeof cheevo.earnedCount === "number" ? cheevo.earnedCount : 0;
      const points = typeof cheevo.pointValue === "number" ? cheevo.pointValue : 0;
      totalCheevos += earned;
      totalPoints += earned * points;
    });
    return { totalCheevos, totalPoints };
  });

  const computedSisyphusPurchases = computed(() => {
    if (!stats.sisyphus.purchases) {
      return { totalNumber: 0, totalCost: 0 };
    }
    let totalNumber = 0;
    let totalCost = 0;
    stats.sisyphus.purchases.forEach((purchase) => {
      const timesBought = typeof purchase.timesBought === "number" ? purchase.timesBought : 0;
      const price = typeof purchase.price === "number" ? purchase.price : 0;
      totalNumber += timesBought;
      totalCost += timesBought * price;
    });
    return { totalNumber, totalCost };
  });

  const computedPretend = computed(() => {
    const impersonators = stats.pretend.impersonators || [];
    if (!impersonators.length) {
      return {
        bestImpersonator: null,
        worstImpersonator: null,
        badGuessPercent: 0,
        closeGuessPercent: 0,
        exactGuessPercent: 0,
      };
    }

    // Find best and worst impersonators by correctPercent
    let bestImpersonator = null;
    let worstImpersonator = null;
    let maxPercent = -Infinity;
    let minPercent = Infinity;

    let totalBad = 0;
    let totalClose = 0;
    let totalCorrect = 0;

    impersonators.forEach((imp) => {
      const correct = typeof imp.correctGuessCount === "number" ? imp.correctGuessCount : 0;
      const close = typeof imp.closeGuessCount === "number" ? imp.closeGuessCount : 0;
      const bad = typeof imp.badGuessCount === "number" ? imp.badGuessCount : 0;
      const percent = typeof imp.correctPercent === "number" ? imp.correctPercent : parseFloat(imp.correctPercent) || 0;
      totalBad += bad;
      totalClose += close;
      totalCorrect += correct;
      if (percent > maxPercent) {
        maxPercent = percent;
        bestImpersonator = imp;
      }
      if (percent > 0 && percent < minPercent) {
        minPercent = percent;
        worstImpersonator = imp;
      }
    });

    const totalGuesses = totalBad + totalClose + totalCorrect;
    const badGuessPercent = totalGuesses > 0 ? ((totalBad / totalGuesses) * 100).toFixed(1) : 0;
    const closeGuessPercent = totalGuesses > 0 ? ((totalClose / totalGuesses) * 100).toFixed(1) : 0;
    const exactGuessPercent = totalGuesses > 0 ? ((totalCorrect / totalGuesses) * 100).toFixed(1) : 0;

    return {
      bestImpersonator,
      worstImpersonator,
      badGuessPercent: Number(badGuessPercent),
      closeGuessPercent: Number(closeGuessPercent),
      exactGuessPercent: Number(exactGuessPercent),
    };
  });

  const computedGuillotine = computed(() => {
    const heads = stats.guillotine.heads || [];
    if (!heads.length) {
      return {
        mostExecuted: null,
        moneyLiberated: 0,
        averageHeadValue: 0,
      };
    }
    let mostExecuted = null;
    let maxCount = -Infinity;
    let moneyLiberated = 0;
    let totalHeadCount = 0;
    heads.forEach((head) => {
      const count = typeof head.headCount === "number" ? head.headCount : 0;
      const worth = typeof head.netWorth === "number" ? head.netWorth : 0;
      if (count > maxCount) {
        maxCount = count;
        mostExecuted = head;
      }
      moneyLiberated += worth * count;
      totalHeadCount += count;
    });
    const averageHeadValue = totalHeadCount > 0 ? +(moneyLiberated / totalHeadCount).toFixed(2) : 0;
    return {
      mostExecuted,
      moneyLiberated: +moneyLiberated.toFixed(2),
      averageHeadValue,
      totalHeads: totalHeadCount,
    };
  });

  const computedInvalid = computed(() => {
    if (!stats.invalid.gameSizes || !stats.invalid.gameSizes.length) {
      return {
        mostCommonGameSize: null,
        averageGameSize: null,
        mostRecentSize: null,
      };
    }

    // 1. Most popular group size (highest gamesPlayed)
    const mostPopularGroupSize = stats.invalid.gameSizes.reduce((max, size) => {
      return (size.gamesPlayed || 0) > (max.gamesPlayed || 0) ? size : max;
    }, stats.invalid.gameSizes[0]);

    // 2. Average game size (weighted average of players per game)
    let totalPlayers = 0;
    let totalGames = 0;
    stats.invalid.gameSizes.forEach((size) => {
      const games = Number(size.gamesStarted) || 0;
      const players = Number(size.players) || 0;
      totalPlayers += games * players;
      totalGames += games;
    });
    const averageGameSize = totalGames > 0 ? (totalPlayers / totalGames).toFixed(2) : null;

    // 3. Most recent group size (latest lastGameStarted)
    const mostRecentGroupSize = stats.invalid.gameSizes.reduce((latest, size) => {
      if (!latest.lastGameStarted) return size;
      if (!size.lastGameStarted) return latest;
      return new Date(size.lastGameStarted) > new Date(latest.lastGameStarted) ? size : latest;
    }, stats.invalid.gameSizes[0]);

    // 4. Most dangerous bug (highest timesCreated + timesCrashed)
    let mostDangerousBug = null;
    if (stats.invalid.bugs && stats.invalid.bugs.length) {
      mostDangerousBug = stats.invalid.bugs.reduce((max, bug) => {
        const created = Number(bug.timesCreated) || 0;
        const crashed = Number(bug.timesCrashed) || 0;
        const maxCreated = Number(max.timesCreated) || 0;
        const maxCrashed = Number(max.timesCrashed) || 0;
        return created + crashed > maxCreated + maxCrashed ? bug : max;
      }, stats.invalid.bugs[0]);
    }

    // 5. Most popular challenge (highest timesChosen)
    let mostPopularChallenge = null;
    if (stats.invalid.challenges && stats.invalid.challenges.length) {
      mostPopularChallenge = stats.invalid.challenges.reduce((max, challenge) => {
        const chosen = Number(challenge.timesChosen) || 0;
        const maxChosen = Number(max.timesChosen) || 0;
        return chosen > maxChosen ? challenge : max;
      }, stats.invalid.challenges[0]);
    }

    return {
      mostPopularGroupSize,
      averageGameSize,
      mostRecentGroupSize,
      mostDangerousBug,
      mostPopularChallenge,
    };
  });

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Mounted

  onMounted(() => {
    dates.today = moment();
    const loadedURL = new URL(window.location.href);
    if (loadedURL.searchParams.get("game")) {
      getGameDataFromURL();
    } else {
      getData("general");
    }
  });
</script>
<template lang="pug" src="./Stats.pug"></template>
<style lang="scss" src="./Stats.scss"></style>
