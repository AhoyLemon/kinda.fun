<script setup>
  import { reactive } from "vue";

  import { allValues } from "./js/_values.js";
  import { gimmickRounds } from "./js/_gimmick-rounds.js";

  const gameName = "cameo";
  celebs: allValues;
  let isDragging = false;

  const my = reactive({
    name: "",
    score: 0,
    pointsEarnedInFinalRound: 0,
    correctSorts: 0,
    incorrectSorts: 0,
    averageValuationOffset: 0,
    valuationOffBy: 0,
  });

  const game = reactive({
    mode: "",
    started: false,
    finalRound: false,
    over: false,
    cameoQueue: [],
    cameoValuationIndexes: [],
    availableToHire: [],
    cameoHistory: [],
  });

  const round = reactive({
    number: 0,
    compareThree: [],
    leftSide: [],
    rightSide: [],
    correctSide: [],
    guessValueIndex: -1,
    valueGuessed: false,
    budget: 1000,
    spent: 0,
  });

  const ui = reactive({
    orderConfirmed: false,
    showDragHelp: false,
    valueGuess: 0,
    valueGuessMax: null,
    valueGuessMin: null,
    animateCameoIndex: 0,
    itsTimeToGuessValue: false,
    showNextRoundButton: false,
    showEmailButton: false,
    showBeginFinalRoundButton: false,
    hiringFinished: false,
    countingHireIndex: 0,
    countingInterval: undefined,
    exceededBudget: false,
    cameosPaid: false,

    // TODO: Remove temp load game stuff.
    loadGameClicked: false,
  });

  const gimmick = reactive({
    selectorVisible: false,
    rounds: [
      gimmickRounds.sopranos,
      gimmickRounds.dogs,
      gimmickRounds.daddies,
      gimmickRounds.startrek,
      gimmickRounds.topchef,
      gimmickRounds.wrestlers,
      gimmickRounds.porn,
      gimmickRounds.standups,
      gimmickRounds.georges,
      gimmickRounds.metalheads,
      gimmickRounds.richards,
      gimmickRounds.trumpworld,
    ],
    selected: {},
    selectedIndex: "",
    isSelected: false,
  });
</script>
<template lang="pug" src="./Cameo.pug"></template>
<style lang="scss" src="./Cameo.scss"></style>
