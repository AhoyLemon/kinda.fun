<script setup>
  import { reactive, computed, onMounted, onBeforeMount } from "vue";
  // import { DateTime } from "luxon";
  import { timeZoneOffset, jsonURL } from "./js/_variables";
  import {
    formatDate,
    dollars,
    billionsOfDollars,
    exceededBudgetOutput,
    formatStatement,
  } from "./js/_functions";
  import { addCommas, percentOf } from "@/shared/js/_functions";
  import axios from "axios";
  import moment from "moment";
  import "vue-good-table-next/dist/vue-good-table-next.css";
  import { VueGoodTable } from "vue-good-table-next";

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
    invalid: {
      launched: "2021-01-27",
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
  });

  const stats = reactive({
    general: {},
    guillotine: {},
    cameo: {},
    invalid: {},
    wrongest: {},
    sisyphus: {},
    pretend: {},
  });

  const columns = reactive({
    playerNames: [
      {
        label: "Player Name",
        field: "iname",
        tdClass: "player-name-cell",
      },
      {
        label: "Played",
        field: "icount",
        type: "number",
      },
      {
        label: "Last Played",
        field: "lastPlayed",
        tdClass: "last-played-cell",
        //width: "100px"
      },
    ],
    celebs: [
      {
        label: "Name",
        field: "cameoName",
      },
      {
        label: "Actual Value",
        field: "actualValue",
        type: "number",
        formatFn: dollars,
      },
      {
        label: "Avg Value",
        field: "averageValuation",
        type: "decimal",
        formatFn: dollars,
      },
      {
        label: "Market Forces",
        field: "marketForces",
        type: "decimal",
        formatFn: dollars,
      },
      {
        label: "Sort Score",
        field: "sortScore",
        type: "number",
      },
      {
        label: "Birthdays",
        field: "birthdayWishes",
        type: "number",
      },
    ],
    cameoPlayers: [
      {
        label: "Score",
        field: "playerScore",
        type: "number",
      },
      {
        label: "Sorts",
        field: "correctSorts",
        type: "number",
      },
      {
        label: "Value Offset",
        field: "averageValuationOffset",
        type: "number",
        formatFn: dollars,
      },
      {
        label: "Blew Budget",
        field: "exceededBudget",
        formatFn: exceededBudgetOutput,
      },
      {
        label: "Finished",
        field: "finishTime",
        // type: "date",
        formatFn: formatDate,
      },
    ],
    cameoSpecialGames: [
      {
        label: "Game",
        field: "iname",
      },
      {
        label: "Played",
        field: "icount",
        type: "number",
      },
    ],
    bugs: [
      {
        label: "Bug",
        field: "iname",
      },
      {
        label: "Deployed",
        field: "icount",
        type: "number",
      },
    ],
    challenges: [
      {
        label: "Challenge",
        field: "iname",
      },
      {
        label: "Played",
        field: "icount",
        type: "number",
      },
    ],
    letters: [
      {
        label: "Letter",
        field: "letter",
      },
      {
        label: "Banned",
        field: "banned",
        type: "number",
      },
      {
        label: "Demanded",
        field: "demanded",
        type: "number",
      },
    ],
    passwords: [
      {
        label: "Password",
        field: "password",
      },
      {
        label: "Challenge",
        field: "challenge",
      },
      {
        label: "Used",
        field: "used",
        type: "number",
      },
      {
        label: "Cracked",
        field: "cracked",
        type: "number",
      },
      {
        label: "Crashed",
        field: "crashed",
        type: "number",
      },
    ],
    playerCounts: [
      {
        label: "Game Type",
        field: "iname",
      },
      {
        label: "Played",
        field: "icount",
        type: "number",
      },
    ],
    rules: [
      {
        label: "Rule",
        field: "iname",
      },
      {
        label: "Deployed",
        field: "icount",
        type: "number",
      },
    ],
    wrongestStatements: [
      {
        label: "Statement",
        field: "iname",
        formatFn: formatStatement,
      },
      {
        label: "Total Score",
        field: "icount",
        type: "number",
      },
    ],
    decks: [
      {
        label: "Deck",
        field: "iname",
      },
      {
        label: "Played",
        field: "icount",
        type: "number",
      },
    ],
    sisyphusCheevos: [
      {
        label: "Name",
        field: "iname",
      },
      {
        label: "Points",
        field: "pointValue",
        type: "number",
      },
      {
        label: "Earned",
        field: "icount",
        type: "number",
        formatFn: addCommas,
      },
      {
        label: "Last Earned",
        field: "lastEarned",
        // type: "date",
        formatFn: formatDate,
      },
    ],
    sisyphusPurchases: [
      {
        label: "Name",
        field: "iname",
      },
      {
        label: "Price",
        field: "price",
        type: "number",
      },
      {
        label: "Earned",
        field: "icount",
        type: "number",
        formatFn: addCommas,
      },
      // {
      //   label: "Total Spent",
      //   // field: calculateSpend,
      //   type: "number",
      // },
      {
        label: "Last Purchase",
        field: "lastPurchase",
        type: "date",
        formatFn: formatDate,
      },
    ],
    guillotineHeads: [
      {
        label: "Name",
        field: "iname",
      },
      {
        label: "Value",
        field: "headValue",
        type: "number",
        formatFn: billionsOfDollars,
      },
      {
        label: "x",
        field: "icount",
        type: "number",
        formatFn: addCommas,
      },
      {
        label: "Last Removed",
        field: "lastRemoved",
        // type: "date",
        formatFn: formatDate,
      },
    ],
    guillotinePlayerScores: [
      {
        label: "Wealth Created",
        field: "wealthCreated",
        type: "number",
        formatFn: billionsOfDollars,
      },
      {
        label: "Most Valuable",
        field: "mostValuable",
        type: "number",
      },
      {
        label: "Finished",
        field: "finishTime",
        // type: "date",
        formatFn: formatDate,
      },
    ],
    pretendGuesses: [
      {
        label: "Celebrity",
        field: "iname",
      },
      {
        label: "Correct %",
        // field: pretendCorrectPct,
        type: "number",
      },
      {
        label: "Exact",
        field: "correctGuess",
        type: "number",
      },
      {
        label: "Close",
        field: "closeGuess",
        type: "number",
      },
      {
        label: "Bad",
        field: "badGuess",
        type: "number",
      },
    ],
  });

  const ui = reactive({
    viewing: "loading",
    cameoLoaded: false,
    invalidLoaded: false,
    wrongestLoaded: false,
    sisyphusLoaded: false,
    guillotineLoaded: false,
    pretendLoaded: false,
  });

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Functions

  const getData = (game) => {
    ui.viewing = "loading";

    if (game == "cameo") {
      axios
        .get(`${jsonURL}/stats/cameo/json`)
        .then(function (response) {
          // handle success
          stats.cameo = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed

          stats.cameo.celebScores.forEach((celeb) => {
            if (celeb.cameoName) {
              stats.cameo.celebs.push({
                cameoName: celeb.cameoName,
                actualValue: 0,
                sortScore: celeb.sortScore,
                birthdayWishes: celeb.birthdayWishes,
                valuations: 0,
                totalValuation: 0,
                averageValuation: 0,
                marketForces: 0,
              });
            }
          });

          stats.cameo.valuations.forEach((celeb) => {
            let m = stats.cameo.celebs.find(
              (element) => element.cameoName == celeb.cameoName,
            );
            if (m) {
              //console.log('match for '+celeb.cameoName);

              if (
                celeb.actualValue &&
                celeb.playerValue &&
                celeb.playerValue < 2000
              ) {
                if (m.actualValue == 0) {
                  m.actualValue = celeb.actualValue;
                  m.totalValuation = celeb.playerValue;
                  m.valuations = 1;
                  m.averageValuation = m.totalValuation;
                } else if (m.actualValue) {
                  m.totalValuation += celeb.playerValue;
                  m.valuations += 1;
                  m.averageValuation = m.totalValuation / m.valuations;
                }
              }
            } else {
              //console.log('NO MATCH FOR '+celeb.cameoName);
            }

            stats.cameo.celebs.forEach((celeb) => {
              celeb.marketForces = celeb.averageValuation - celeb.actualValue;
            });
          });

          dates.cameo.dayCount = dates.today.diff(dates.cameo.launched, "days");
          ui.cameoLoaded = true;
          ui.viewing = "cameo";
        });
    } else if (game == "invalid") {
      axios
        .get(`${jsonURL}/stats/invalid/json`)
        .then(function (response) {
          // handle success
          stats.invalid = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed

          stats.invalid.successfulPasswords.forEach((pw) => {
            if (pw.iname) {
              stats.invalid.passwords.push({
                password: pw.iname,
                challenge: pw.challenge,
                used: pw.icount,
                cracked: 0,
                crashed: 0,
              });
            }
          });

          stats.invalid.cracks.forEach((pw) => {
            let m = stats.invalid.passwords.find(
              (element) => element.iname == pw.password,
            );
            if (m) {
              m.cracked = pw.icount;
            } else {
              stats.invalid.passwords.push({
                password: pw.iname,
                challenge: "",
                used: 0,
                cracked: pw.icount,
                crashed: 0,
              });
            }
          });

          stats.invalid.crashes.forEach((pw) => {
            let m = stats.invalid.passwords.find(
              (element) => element.iname == pw.password,
            );
            if (m) {
              m.crashed = pw.icount;
            } else {
              stats.invalid.passwords.push({
                password: pw.iname,
                challenge: "",
                used: 0,
                cracked: 0,
                crashed: pw.icount,
              });
            }
          });

          stats.invalid.demandedLetters.forEach((l) => {
            if (l.iname) {
              stats.invalid.letters.push({
                letter: l.iname,
                demanded: l.icount,
                banned: 0,
              });
            }
          });

          stats.invalid.bannedLetters.forEach((l) => {
            let m = stats.invalid.letters.find(
              (element) => element.letter == l.iname,
            );
            if (m) {
              m.banned = l.icount;
            } else {
              stats.invalid.letters.push({
                letter: l.iname,
                demanded: 0,
                banned: l.icount,
              });
            }
          });

          dates.invalid.dayCount = dates.today.diff(
            dates.invalid.launched,
            "days",
          );
          ui.invalidLoaded = true;
          ui.viewing = "invalid";
        });
    } else if (game == "wrongest") {
      axios
        .get(`${jsonURL}/stats/wrongest/json`)
        .then(function (response) {
          // handle success
          stats.wrongest = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
          dates.wrongest.dayCount = dates.today.diff(
            dates.wrongest.launched,
            "days",
          );
          ui.wrongestLoaded = true;
          ui.viewing = "wrongest";
        });
    } else if (game == "sisyphus") {
      axios
        .get(`${jsonURL}/stats/sisyphus/json`)
        .then(function (response) {
          // handle success
          stats.sisyphus = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
          dates.sisyphus.dayCount = dates.today.diff(
            dates.sisyphus.launched,
            "days",
          );
          ui.sisyphusLoaded = true;
          ui.viewing = "sisyphus";
        });
    } else if (game == "guillotine") {
      axios
        .get(`${jsonURL}/stats/guillotine/json`)
        .then(function (response) {
          // handle success
          stats.guillotine = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          //console.log(stats.guillotine)
          dates.guillotine.dayCount = dates.today.diff(
            dates.guillotine.launched,
            "days",
          );
          ui.guillotineLoaded = true;
          ui.viewing = "guillotine";
        });
    } else if (game == "pretend") {
      axios
        .get(`${jsonURL}/stats/pretend/json`)
        .then(function (response) {
          // handle success
          stats.pretend = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          //console.log(stats.pretend)
          dates.pretend.dayCount = dates.today.diff(
            dates.pretend.launched,
            "days",
          );
          ui.pretendLoaded = true;
          ui.viewing = "pretend";
        });
    }

    const newURL =
      window.location.origin + window.location.pathname + "?game=" + game;

    history.pushState({ game: game }, game + " | Kinda Fun Stats", newURL);
    document.title = game + " | Kinda Fun Stats";
  };

  const formatTime = (stamp, format) => {
    if (format == "fromNow") {
      return moment(stamp).subtract(timeZoneOffset, "minutes").fromNow();
    } else if (format == "calendar") {
      if (moment(stamp).diff(moment(), "days") > -7) {
        return moment(stamp).subtract("6", "hours").calendar();
      } else {
        return moment(stamp)
          .subtract(timeZoneOffset, "minutes")
          .format("MMM Do @ LT");
      }
    } else if (format) {
      return moment(stamp).subtract(timeZoneOffset, "minutes").format(format);
    } else {
      return moment(stamp).subtract(timeZoneOffset, "minutes").format("LLLL");
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
    cameoObject.averageBirthdayWishes = parseInt(
      totalBirthdayWishes / playerCount,
    );

    cameoObject.exceededBudgetPercent = percentOf(
      cameoObject.observedBudget + cameoObject.exceededBudget,
      cameoObject.exceededBudget,
    );
    cameoObject.correctSortPercent = percentOf(
      12,
      cameoObject.averageCorrectSorts,
    );

    return cameoObject;
  });

  const computedNaughtyPercentage = computed(() => {
    const self = this;

    if (
      !stats.general ||
      !stats.general.invalid ||
      !stats.general.invalid.NaughtyModeOn
    ) {
      return "0";
    }

    return percentOf(
      stats.general.invalid.NaughtyModeOn +
        stats.general.invalid.NaughtyModeOff,
      stats.general.invalid.NaughtyModeOn,
    );
  });

  const computedCrackedPasswordPercent = computed(() => {
    if (
      !stats.invalid ||
      !stats.invalid.successfulPasswords ||
      !stats.invalid.cracks
    ) {
      return "0";
    }

    return percentOf(
      stats.invalid.successfulPasswords.length,
      stats.invalid.cracks.length,
    );
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
    const self = this;
    if (!stats.cameo || !stats.cameo.celebs) {
      return "0";
    }
    let cCount = 0;
    let cCombined = 0;
    stats.cameo.celebs.forEach((celeb) => {
      cCount++;
      cCombined += celeb.marketForces;
    });
    let a = cCombined / cCount;
    return dollars(a);
  });

  const computedMostPopularCameoGame = computed(() => {
    const self = this;
    if (!ui.cameoLoaded || !stats.cameo.specialGames) {
      return null;
    } else if (stats.cameo.specialGames) {
      let mostPlayedGame = "TIE!";
      let playCount = 0;
      let totalPlayCount = 0;
      stats.cameo.specialGames.forEach((g) => {
        if (g.icount > playCount) {
          mostPlayedGame = g.iname;
          playCount = g.icount;
          totalPlayCount += g.icount;
        }
      });
      return {
        name: mostPlayedGame,
        count: playCount,
        percent: percentOf(totalPlayCount, playCount),
      };
    }
  });

  const computedMostOvervaluedCeleb = computed(() => {
    const self = this;
    if (!ui.cameoLoaded || !stats.cameo.celebs) {
      return null;
    } else if (stats.cameo.celebs) {
      let lowestValue = 100;
      let mostOvervalued = "";
      stats.cameo.celebs.forEach((celeb) => {
        if (celeb.marketForces < lowestValue) {
          lowestValue = celeb.marketForces;
          mostOvervalued = celeb.cameoName;
        }
      });
      return {
        name: mostOvervalued,
        marketForces: lowestValue,
      };
    }
  });

  const computedSisyphusCheevos = computed(() => {
    const self = this;
    if (!ui.sisyphusLoaded) {
      return null;
    } else {
      let count = 0;
      let points = 0;
      stats.sisyphus.cheevos.forEach((cheevo) => {
        count += cheevo.icount;
        points += cheevo.icount * cheevo.pointValue;
      });
      return {
        count: count,
        points: points,
      };
    }
  });

  const computedSisyphusPurchases = computed(() => {
    const self = this;
    if (!ui.sisyphusLoaded) {
      return null;
    } else {
      let count = 0;
      let spent = 0;
      stats.sisyphus.purchases.forEach((purchase) => {
        count += purchase.icount;
        spent += purchase.icount * purchase.price;
      });
      return {
        count: count,
        spent: spent,
      };
    }
  });

  const computedGuillotineAverageGameWealth = computed(() => {
    const self = this;
    if (!stats.guillotine || !stats.guillotine.playerScores) {
      return "0";
    }
    let gameCount = 0;
    let combinedValue = 0;
    stats.guillotine.playerScores.forEach((game) => {
      gameCount++;
      combinedValue += game.wealthCreated;
    });
    let a = combinedValue / gameCount;
    return billionsOfDollars(a);
  });

  const computedGuillotineMostKilled = computed(() => {
    const self = this;
    if (!stats.guillotine || !stats.guillotine.heads) {
      return "-";
    }

    const maxObj = stats.guillotine.heads.reduce((accumulator, current) => {
      return accumulator.icount > current.icount ? accumulator : current;
    });

    return maxObj;
  });

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Mounted

  onBeforeMount(() => {
    axios
      .get(`${jsonURL}/stats/general/json`)
      .then(function (response) {
        // handle success
        stats.general = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        ui.viewing = "general";
      });
  });

  onMounted(() => {
    dates.today = moment();
    const loadedURL = new URL(window.location.href);
    if (loadedURL.searchParams.get("game")) {
      getGameDataFromURL();
    }
  });
</script>
<template lang="pug" src="./Stats.pug"></template>
<style lang="scss" src="./Stats.scss"></style>
