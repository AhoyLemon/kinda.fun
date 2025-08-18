<script setup>
  import { ref, reactive, onMounted, computed } from "vue";
  import $ from "jquery";
  import { DateTime } from "luxon";

  import { randomNumber, randomFrom, shuffle, addCommas, findInArray, removeFromArray, percentOf, sendEvent, dollars } from "@/shared/js/_functions.js";

  // Data
  import { allBillionaires } from "./js/data/_billionaires.js";
  import { allWarrants } from "./js/data/_warrants.js";
  import { schoolData } from "./js/data/_school-data.js";

  // Sounds
  import { Howl, Howler } from "howler";
  import { dropSound, lastWords, cheeringSounds } from "./js/partials/_sounds.js";

  // Firebase & VueFire Stuff
  import { doc, increment, serverTimestamp, updateDoc, runTransaction } from "firebase/firestore";
  import { useFirestore, useCollection, useDocument } from "vuefire";
  const db = useFirestore();
  const statsRef = doc(db, `stats/guillotine`);

  const gameStatus = ref("loading");

  const data = {
    allBillionaires: allBillionaires, // <-- Might not be necessary.
    stateSchools: schoolData,
  };

  const gameRules = {
    optionsPerDay: 20,
    choicesPerDay: 5,
  };

  const redistributions = reactive({
    today: 0,
    allTime: 0,
  });

  const comparativeData = reactive({
    currentSchool: {},
  });

  const ui = reactive({
    wealthDisplay: 0,
    currentState: null,
    currentlyBusy: false,
    sortBy: "random",
    shareScreen: {
      display: false,
      playDate: null,
      wealthCreatedToday: null,
      playerName: null,
      amISharing: false,
      isHashInvalid: false,
    },
  });

  const todaysGame = reactive({
    currentBillionaires: [],
    formerBillionaires: [],
    gameRules: {
      optionsPerDay: 20,
      choicesPerDay: 5,
      cheats: {
        active: false,
        unlimitedPlay: false,
      },
    },
  });

  const player = reactive({
    redistributions: {
      today: 0,
      allTime: 0,
    },
    wealthCreated: {
      today: 0,
      allTime: 0,
    },
    history: {
      firstPlay: null,
      lastPlay: null,
      lastGameResults: {
        wealthCreated: null,
        trophies: [],
      },
      trophies: [],
    },
  });

  const loadInitialGameState = () => {
    comparativeData.currentSchool = randomFrom(schoolData);
    ui.currentState = comparativeData.currentSchool.state;
    const mmdd = DateTime.now().toFormat("LLdd");

    if (allWarrants[mmdd]) {
      for (const w of allWarrants[mmdd]) {
        todaysGame.currentBillionaires.push(allBillionaires[w]);
      }
    }

    if (!todaysGame.currentBillionaires || todaysGame.currentBillionaires.length < 5) {
      alert("I couldn't find enough warrants. Using backup option...");
      todaysGame.currentBillionaires = shuffle(allBillionaires).slice(0, gameRules.optionsPerDay);
    }

    shuffle(todaysGame.currentBillionaires);

    if (
      localStorage.getItem("totalRedistributions") &&
      localStorage.getItem("totalWealthCreated") &&
      localStorage.getItem("firstPlay") &&
      localStorage.getItem("lastPlay")
    ) {
      redistributions.allTime = Number(localStorage.getItem("totalRedistributions")) ?? 0;
      player.wealthCreated.allTime = Number(localStorage.getItem("totalWealthCreated")) ?? 0;
      player.history.firstPlay = Date.parse(localStorage.getItem("firstPlay")) ?? null;
      player.history.lastPlay = Date.parse(localStorage.getItem("lastPlay")) ?? null;

      if (localStorage.getItem("trophyCase")) {
        const trophyString = localStorage.getItem("trophyCase");
        const trophyArray = JSON.parse(trophyString);
        player.history.trophies = trophyArray;
      }
    }
    if (localStorage.getItem("lastGameWealthCreated") && localStorage.getItem("lastGameTrophies")) {
      player.history.lastGameResults.wealthCreated = Number(localStorage.getItem("lastGameWealthCreated"));
      player.history.lastGameResults.trophies = JSON.parse(localStorage.getItem("lastGameTrophies"));
    }

    gameStatus.value = "titleScreen";
  };

  const startGame = async () => {
    gameStatus.value = "playing";
    await updateDoc(statsRef, {
      gamesStarted: increment(1),
      lastGameStarted: serverTimestamp(),
    });
    sendEvent("NO MORE BILLIONAIRES", "Game Started", "Fresh Game");
  };

  const getDailyRank = (person) => {
    // Get all billionaires for today (both current and executed)
    const allTodaysBillionaires = [...todaysGame.currentBillionaires, ...todaysGame.formerBillionaires];

    // Sort by net worth in descending order
    const sortedByWealth = allTodaysBillionaires.sort((a, b) => b.netWorth - a.netWorth);

    // Find the rank of the executed person (1-based index)
    const dailyRank = sortedByWealth.findIndex((b) => b.name === person.name) + 1;

    return dailyRank;
  };

  const playCheeringSound = (person) => {
    // Get the daily comparative rank within today's list of 20
    const dailyRank = getDailyRank(person);

    // Check if the executed billionaire is in the top 5 for today
    if (dailyRank <= 5) {
      const cheerKey = `rank${dailyRank}`;
      if (cheeringSounds[cheerKey]) {
        cheeringSounds[cheerKey].play();
      }
    }
  };

  const dropBlade = (person) => {
    ui.currentlyBusy = true;
    const newList = todaysGame.currentBillionaires.filter((value) => value.name != person.name);
    setTimeout(() => {
      dropSound.play();

      setTimeout(() => {
        $("#TheG").addClass("dropped");

        const p = Math.floor(Math.random() * 17 + 1).toString();
        setTimeout(() => {
          if (person.name == "King Charles III") {
            lastWords.play("Charles");
          } else {
            lastWords.play(p);
          }

          // Play cheering sound after last words for top 5 billionaires
          setTimeout(() => {
            playCheeringSound(person);
          }, "1000");
        }, "320");
        setTimeout(() => {
          $("#G_Head").attr("href", "img/guillotine/heads/empty.png");
          $("#TheG").removeClass("dropped").addClass("raised");
          decapitateBillionaire(person);
          setTimeout(() => {
            $("#TheG").removeClass("raised");
            ui.currentlyBusy = false;
          }, "1000");
        }, "1000");
      }, "220");
    }, 450);
    todaysGame.currentBillionaires = newList;
  };

  const decapitateBillionaire = (person) => {
    const additionalWealth = person.netWorth;
    todaysGame.formerBillionaires.unshift(person);
    redistributions.today++;
    redistributions.allTime++;
    player.wealthCreated.today += additionalWealth;
    player.wealthCreated.allTime += additionalWealth;

    player.wealthCreated.today = Number(player.wealthCreated.today.toFixed(3));
    player.wealthCreated.allTime = Number(player.wealthCreated.allTime.toFixed(3));

    const stopAddingDollars = () => {
      clearInterval(addMoreDollars);
    };

    const addMoreDollars = setInterval(() => {
      const dollarIncrease = parseFloat(randomNumber(1, 100000000) / 1000000000);
      ui.wealthDisplay += dollarIncrease;

      if (ui.wealthDisplay >= player.wealthCreated.today) {
        stopAddingDollars();
        ui.wealthDisplay = player.wealthCreated.today;
        ui.currentlyBusy = false;
      }
    }, 20);

    if (redistributions.today >= gameRules.choicesPerDay) {
      doEndGameActions();
    }

    sendEvent("NO MORE BILLIONAIRES", "Head Removed", parseName(person.name));
  };

  const doEndGameActions = () => {
    ui.sortBy = "highestWealth";

    player.history.lastGameResults.trophies = [];
    for (const fB of todaysGame.formerBillionaires) {
      const trophy = {
        name: parseName(fB.name),
        netWorth: fB.netWorth,
      };
      player.history.trophies.push(trophy);
      player.history.lastGameResults.trophies.push(trophy);
    }
    player.history.lastGameResults.wealthCreated = player.wealthCreated.today;
    saveToLocalStorage();

    const richestDead = player.history.lastGameResults.trophies.reduce((prev, current) => {
      return prev.netWorth > current.netWorth ? prev : current;
    }, player.history.lastGameResults.trophies[0]);
    saveGameOverData(player.wealthCreated.today, player.history.lastGameResults.trophies);
    sendEvent("NO MORE BILLIONAIRES", "Final Score", player.wealthCreated.today);

    gameStatus.value = "gameOver";
    $("html, body").animate({ scrollTop: "+=325px" }, 800);
  };

  const saveGameOverData = async (wealthCreated, trophies) => {
    if (!wealthCreated || !trophies) {
      return;
    }

    try {
      // Update the main stats document
      await runTransaction(db, async (transaction) => {
        const statsDoc = await transaction.get(statsRef);

        if (!statsDoc.exists()) {
          throw new Error("Stats document does not exist!");
        }

        const updates = {
          gamesFinished: increment(1),
          gameLastFinished: serverTimestamp(),
          wealthCreated: increment(wealthCreated),
        };

        transaction.update(statsRef, updates);
      });

      // Update trophies
      for (const trophy of trophies) {
        const trophyRef = doc(db, `stats/guillotine/heads/${trophy.name}`);
        await runTransaction(db, async (transaction) => {
          const trophyDoc = await transaction.get(trophyRef);

          if (!trophyDoc.exists()) {
            transaction.set(trophyRef, {
              name: trophy.name,
              netWorth: trophy.netWorth,
              headCount: 1,
              lastRemoved: serverTimestamp(),
            });
          } else {
            transaction.update(trophyRef, {
              netWorth: trophy.netWorth,
              headCount: increment(1),
              lastRemoved: serverTimestamp(),
            });
          }
        });
      }
    } catch (e) {
      console.error("Transaction failed: ", e);
    }
  };

  // const statsRef = doc(db, `stats/guillotine`);
  // const saveGameOverData = async (wealthCreated, mostValuable, trophies) => {
  //   // in /stats/guillotine ...
  //   // 1. increment gamesFinsihed by 1
  //   // 2. setGameLastFinished to serverTimestamp()
  //   // 3. increment wealthCreated by wealthcreated

  //   // for each trophy in trophies
  //   // 1. create `/stats/guillotine/heads/${trophy.name}` if it doesn't exist
  //   // 2. set the name to trophy.name
  //   // 3. set the netWorth to trophy.netWorth
  //   // 4. increment the headcount by 1.
  //   // 4. set lastRemoved to serverTimeStamp
  // };

  const saveToLocalStorage = () => {
    localStorage.setItem("totalRedistributions", redistributions.allTime);
    localStorage.setItem("totalWealthCreated", player.wealthCreated.allTime.toFixed(3));
    const rightNow = new Date();
    if (!localStorage.getItem("firstPlay")) {
      localStorage.setItem("firstPlay", rightNow.toString());
    }
    localStorage.setItem("lastPlay", rightNow.toString());

    if (player.history.trophies) {
      const trophyCaseString = JSON.stringify(player.history.trophies);
      localStorage.setItem("trophyCase", trophyCaseString);
    }

    if (player.history.lastGameResults && player.history.lastGameResults.wealthCreated && player.history.lastGameResults.trophies) {
      localStorage.setItem("lastGameWealthCreated", player.history.lastGameResults.wealthCreated);
      const lastGameTrophies = JSON.stringify(player.history.lastGameResults.trophies);
      localStorage.setItem("lastGameTrophies", lastGameTrophies);
    }
  };

  const changeState = () => {
    const newSchoolData = data.stateSchools.find(({ state }) => state === ui.currentState);
    if (newSchoolData) {
      comparativeData.currentSchool = newSchoolData;
    } else {
      alert("FAILURE finding " + ui.currentState);
    }
  };

  const generateCheapHash = (bigValue, smallValue) => {
    return Math.floor((bigValue / smallValue) * 1.153);
  };

  const shareMyScores = () => {
    const p = {
      playDate: player.history.lastPlay ?? Date.parse(new Date()),
      wealthCreatedToday: Number(player.history.lastGameResults.wealthCreated.toFixed(3)),
    };

    // Populate the share screen data
    ui.shareScreen.playDate = p.playDate;
    ui.shareScreen.wealthCreatedToday = p.wealthCreatedToday;
    ui.shareScreen.amISharing = true;

    let newURL = new URL(location.protocol + "//" + location.host + location.pathname);
    newURL.searchParams.set("playDate", p.playDate);
    newURL.searchParams.set("wealthCreatedToday", p.wealthCreatedToday);
    const cheapHash = generateCheapHash(p.playDate, p.wealthCreatedToday);
    newURL.searchParams.set("hash", cheapHash);
    sendEvent("NO MORE BILLIONAIRES", "Score Shared", p.wealthCreatedToday);
    logTheScoreSharing();
    window.history.replaceState(null, "", newURL);
    ui.shareScreen.display = true;

    // Focus on the player name input.
    setTimeout(() => {
      const inputEl = document.querySelector("input.player-name");
      if (inputEl) {
        inputEl.focus();
      }
    }, 300);
    return false;
  };

  const logTheScoreSharing = async () => {
    await updateDoc(statsRef, {
      scoresShared: increment(1),
      lastGameStarted: serverTimestamp(),
    });
  };

  const playFromShare = () => {
    ui.shareScreen.display = false;
  };

  const enterYourName = () => {
    if (ui.shareScreen.playerName.length > 2) {
      let newURL = new URL(location.protocol + "//" + location.host + location.pathname);
      newURL.searchParams.set("playerName", ui.shareScreen.playerName);
      newURL.searchParams.set("wealthCreatedToday", ui.shareScreen.wealthCreatedToday);
      newURL.searchParams.set("playDate", ui.shareScreen.playDate);

      const cheapHash = generateCheapHash(ui.shareScreen.playDate, ui.shareScreen.wealthCreatedToday);
      newURL.searchParams.set("hash", cheapHash);

      sendEvent("NO MORE BILLIONAIRES", "Score Shared", ui.shareScreen.playerName);

      window.history.replaceState(null, "", newURL);
    }
  };

  const parseName = (name) => {
    if (name && name.includes("& family")) {
      name = name.split("&")[0];
    }
    return name.trim();
  };

  const parseIndustryIcon = (industry) => {
    industry = industry.trim();

    if (!industry) {
      return false;
    }

    // Check for string matches first (more flexible)
    if (industry.includes("Energy")) {
      return "power-plant";
    }
    if (industry.includes("Transportation") || industry.includes("Logistics")) {
      return "trucking";
    }

    // Then check for exact matches
    switch (industry) {
      case "Automotive":
        return "automotive";
      case "Finance & Investments":
        return "finance-investment";
      case "Food & Beverage":
        return "hamburger";
      case "Real Estate":
        return "house";
      case "Real Estate & Construction":
        return "house";
      case "Technology":
        return "technology";
      case "Manufacturing":
        return "factory";
      case "Media & Entertainment":
        return "television";
      case "Fashion & Retail":
        return "shopping-bag";
      case "Healthcare":
        return "healthcare";
      case "Healthcare & Pharmaceuticals":
        return "healthcare";
      case "Telecom":
        return "digital-station";
      case "Metals & Mining":
        return "mining";
      case "Service":
        return "waiter";
      case "Diversified":
        return "pie-chart";
      case "Gambling & Casinos":
        return "slot-machine";
      case "Sports & Gaming":
        return "slot-machine";
      case "Sports":
        return "football";
      case "Construction & Engineering":
        return "construction";
      case "The Aristocracy":
        return "crown";
    }

    return false;
  };

  const padNumber = (number, padAmount) => {
    if (!padAmount) {
      padAmount = 2;
    }
    return String(number).padStart(padAmount, "0");
  };

  const convertToBillion = (number) => {
    return Number(number * 1000000000);
  };

  const formatDollars = (amount, shouldIConvertToBillion, simpleOutput, trimCents) => {
    if (!amount) {
      amount = 0;
    }

    if (shouldIConvertToBillion) {
      amount = convertToBillion(amount);
    }

    let maxCentsDigits = 2;
    if (trimCents) {
      maxCentsDigits = 0;
    }

    if (!simpleOutput) {
      let dollars = new Intl.NumberFormat("en-US").format(amount);
      let output = `<sup class="dollar-sign">$</sup>${dollars}<sup class="cents">00</sup>`;
      return output;
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: maxCentsDigits,
      }).format(amount);
    }
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  const formatDate = (dateString) => {
    const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(dateString);
    const month = allMonths[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const sortThoseBillionaires = (arr, sortBy) => {
    if (ui.sortBy == "highestWealth") {
      return arr.slice().sort((a, b) => (a.netWorth < b.netWorth ? 1 : -1));
    } else {
      return arr;
    }
  };

  //////// COMPUTEDS

  const computedRemainingRedistributions = computed(() => {
    let output = 99; // Default value. If you got this, something went wrong.
    if (redistributions && redistributions.today && gameRules && gameRules.choicesPerDay) {
      output = parseInt(gameRules.choicesPerDay - redistributions.today);
    } else if (gameRules && gameRules.choicesPerDay) {
      output = gameRules.choicesPerDay;
    }
    return output;
  });

  const computedSchoolsFunded = computed(() => {
    let schoolsFunded = {
      currentState: "",
      today: 0,
      allTime: 0,
    };

    schoolsFunded.currentState = ui.currentState;

    if (player.wealthCreated?.allTime) {
      const budgetAllTime = convertToBillion(player.wealthCreated.allTime);
      const costPerSchool = comparativeData.currentSchool.perStudent * comparativeData.currentSchool.averageStudents;
      schoolsFunded.allTime = Math.floor(budgetAllTime / costPerSchool);
    }

    if (player.wealthCreated?.today) {
      const budgetToday = convertToBillion(player.wealthCreated.today);
      const costPerSchool = comparativeData.currentSchool.perStudent * comparativeData.currentSchool.averageStudents;
      schoolsFunded.today = Math.floor(budgetToday / costPerSchool);
    }
    return schoolsFunded;
  });

  const computedWealthToday = computed(() => {
    let stillAvailable = 0;
    let stillAvailablePct = null;
    let claimed = 0;
    let claimedPct = null;
    let total = 0;

    todaysGame.currentBillionaires.forEach((wallet) => {
      stillAvailable += wallet.netWorth;
      total += wallet.netWorth;
    });

    todaysGame.formerBillionaires.forEach((wallet) => {
      claimed += wallet.netWorth;
      total += wallet.netWorth;
    });

    if (stillAvailable && claimed) {
      stillAvailablePct = percentOf(total, stillAvailable);
      claimedPct = percentOf(total, claimed);
    }

    return {
      fullWallets: todaysGame.currentBillionaires.length,
      stillAvailable: stillAvailable,
      stillAvailablePct: stillAvailablePct ?? null,
      claimed: claimed,
      claimedPct: claimedPct ?? null,
      total: total,
    };
  });

  const computedMostValuableToday = computed(() => {
    let maxNetWorthAlive = 0;
    let richestAlive = {};
    let maxNetWorthDead = 0;
    let richestDead = {};
    let richestTotal = {};

    if (todaysGame.currentBillionaires && todaysGame.currentBillionaires.length > 0) {
      maxNetWorthAlive = Math.max(...todaysGame.currentBillionaires.map(({ netWorth }) => netWorth));
      richestAlive = todaysGame.currentBillionaires.find(({ netWorth }) => netWorth === maxNetWorthAlive);
    }

    if (todaysGame.formerBillionaires && todaysGame.formerBillionaires.length > 0) {
      maxNetWorthDead = Math.max(...todaysGame.formerBillionaires.map(({ netWorth }) => netWorth));
      richestDead = todaysGame.formerBillionaires.find(({ netWorth }) => netWorth === maxNetWorthDead);
    }

    if (maxNetWorthAlive && maxNetWorthDead) {
      if (maxNetWorthDead >= maxNetWorthAlive) {
        richestTotal = richestDead;
      } else if (maxNetWorthAlive >= maxNetWorthDead) {
        richestTotal = richestAlive;
      }
    }

    return {
      richestAlive: richestAlive,
      richestDead: richestDead,
      richestTotal: richestTotal,
    };
  });

  const computedMostValuableAllTime = computed(() => {
    let richestPerson = {};
    let maxNetWorth = 0;
    if (player.history.trophies) {
      maxNetWorth = Math.max(...player.history.trophies.map(({ netWorth }) => netWorth));
      richestPerson = player.history.trophies.find(({ netWorth }) => netWorth === maxNetWorth);
    }
    return (richestPerson = richestPerson);
  });

  const computedToday = computed(() => {
    // const theDay = Number(moment().format("D"));
    const theDay = Number(DateTime.now().toFormat("D"));
    let daySuffix;
    switch (theDay) {
      case 1 || 21 || 31:
        daySuffix = "st";
        break;
      case 2 || 22:
        daySuffix = "nd";
        break;
      case 3 || 23:
        daySuffix = "rd";
        break;
      default:
        daySuffix = "th";
        break;
    }
    // return `${moment().format("dddd, MMMM D")}<sup>${daySuffix}</sup>`;
    return `${DateTime.now().toFormat("cccc, LLLL d")}<sup>${daySuffix}</sup>`;
  });

  const computedDidYouAlreadyPlayToday = computed(() => {
    const today = new Date();
    if (!player.history || !player.history.lastPlay) {
      return false;
    } else if (formatDate(player.history.lastPlay) == formatDate(today)) {
      return true;
    } else {
      return false;
    }
  });

  const loadShareDataFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const playerName = urlParams.get("playerName");
    const wealthCreatedToday = urlParams.get("wealthCreatedToday");
    const playDate = urlParams.get("playDate");
    const hash = urlParams.get("hash");

    if (playerName || wealthCreatedToday || playDate || hash) {
      // Verify the hash if we have the required data
      if (playDate && wealthCreatedToday && hash) {
        const expectedHash = generateCheapHash(Number(playDate), Number(wealthCreatedToday));
        if (Number(hash) !== expectedHash) {
          ui.shareScreen.playerName = playerName;
          ui.shareScreen.isHashInvalid = true;
          ui.shareScreen.display = true;
          return;
        }
      } else if (playDate || wealthCreatedToday) {
        ui.shareScreen.playerName = playerName;
        ui.shareScreen.isHashInvalid = true;
        ui.shareScreen.display = true;
        return;
      }

      // Load the values into the UI
      ui.shareScreen.playerName = playerName;
      ui.shareScreen.wealthCreatedToday = wealthCreatedToday ? Number(wealthCreatedToday) : null;
      ui.shareScreen.playDate = playDate ? Number(playDate) : null;
      ui.shareScreen.isHashInvalid = false;

      // Show the share screen if we have share data
      ui.shareScreen.display = true;
    }
  };

  onMounted(() => {
    loadInitialGameState();
    loadShareDataFromURL();
  });

  const executeAllBillionaires = async () => {
    const { doc, runTransaction, getDoc, serverTimestamp } = await import("firebase/firestore");
    const db = useFirestore();
    for (const billionaire of allBillionaires) {
      const trophyRef = doc(db, `stats/guillotine/heads/${billionaire.name}`);
      const trophyDoc = await getDoc(trophyRef);
      if (!trophyDoc.exists()) {
        await runTransaction(db, async (transaction) => {
          transaction.set(trophyRef, {
            name: billionaire.name,
            netWorth: billionaire.netWorth,
            headCount: 1,
            lastRemoved: serverTimestamp(),
          });
        });
      }
    }
  };
</script>
<template lang="pug" src="./Guillotine.pug"></template>
<style lang="scss" src="./Guillotine.scss"></style>
