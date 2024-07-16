<script setup>
  import { reactive } from "vue";
  import { DateTime } from "luxon";

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Variables
  const dates = {
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
  };

  const stats = {
    general: {},
    guillotine: {},
    cameo: {},
    invalid: {},
    wrongest: {},
    sisyphus: {},
    pretend: {},
  };

  const columns = {
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
        formatFn: this.dollars,
      },
      {
        label: "Avg Value",
        field: "averageValuation",
        type: "decimal",
        formatFn: this.dollars,
      },
      {
        label: "Market Forces",
        field: "marketForces",
        type: "decimal",
        formatFn: this.dollars,
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
        formatFn: this.dollars,
      },
      {
        label: "Blew Budget",
        field: "exceededBudget",
        formatFn: this.exceededBudgetOutput,
      },
      {
        label: "Finished",
        field: "finishTime",
        type: "date",
        formatFn: this.formatDate,
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
        formatFn: this.formatStatement,
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
        formatFn: this.addCommas,
      },
      {
        label: "Last Earned",
        field: "lastEarned",
        type: "date",
        formatFn: this.formatDate,
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
        formatFn: this.addCommas,
      },
      {
        label: "Total Spent",
        field: this.calculateSpend,
        type: "number",
      },
      {
        label: "Last Purchase",
        field: "lastPurchase",
        type: "date",
        formatFn: this.formatDate,
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
        formatFn: this.billionsOfDollars,
      },
      {
        label: "x",
        field: "icount",
        type: "number",
        formatFn: this.addCommas,
      },
      {
        label: "Last Removed",
        field: "lastRemoved",
        type: "date",
        formatFn: this.formatDate,
      },
    ],
    guillotinePlayerScores: [
      {
        label: "Wealth Created",
        field: "wealthCreated",
        type: "number",
        formatFn: this.billionsOfDollars,
      },
      {
        label: "Most Valuable",
        field: "mostValuable",
        type: "number",
      },
      {
        label: "Finished",
        field: "finishTime",
        type: "date",
        formatFn: this.formatDate,
      },
    ],
    pretendGuesses: [
      {
        label: "Celebrity",
        field: "iname",
      },
      {
        label: "Correct %",
        field: this.pretendCorrectPct,
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
  };

  const ui = {
    viewing: "loading",
    cameoLoaded: false,
    invalidLoaded: false,
    wrongestLoaded: false,
    sisyphusLoaded: false,
    guillotineLoaded: false,
    pretendLoaded: false,
  };
</script>
<template lang="pug" src="./Stats.pug"></template>
<style lang="scss" src="./Stats.scss"></style>
