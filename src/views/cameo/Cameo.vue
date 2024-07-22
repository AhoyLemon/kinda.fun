<script setup>
  import { reactive, computed } from "vue";
  import $ from "jquery";
  import draggable from "vuedraggable";

  import { allValues } from "./js/_values.js";
  import { gimmickRounds } from "./js/_gimmick-rounds.js";
  import { settings } from "./js/_settings.js";
  import {
    randomNumber,
    randomFrom,
    shuffle,
    addCommas,
    findInArray,
    removeFromArray,
    percentOf,
    sendEvent,
    dollars,
  } from "@/shared/js/_functions.js";

  // Sounds
  import { Howl, Howler } from "howler";
  import {
    soundMiss,
    soundCorrect,
    soundPerfectValue,
    soundCloseValue,
    soundBadValue,
    soundNewEmail,
    soundUnderBudget,
    soundOverBudget,
    soundFutherOverBudget,
    soundGameOverMusic,
    birthdayHowls,
  } from "./js/_sounds.js";

  // Firebase & VueFire Stuff
  import {
    doc,
    increment,
    serverTimestamp,
    updateDoc,
    runTransaction,
  } from "firebase/firestore";
  import { useFirestore, useCollection, useDocument } from "vuefire";
  const db = useFirestore();
  const statsRef = doc(db, `stats/cameo`);

  // Toasts
  import Toast, { POSITION } from "vue-toastification";
  import "vue-toastification/dist/index.css";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  const gameName = "cameo";
  let allCelebs = [...allValues];
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

  ///////////////////////////////////////////////
  ///////////////////////////////////////////////
  // Functions

  const startSinglePlayerGame = async () => {
    game.mode = "singleplayer";

    generateGameCelebrities();

    game.started = true;
    startNextRound();

    await updateDoc(statsRef, {
      gamesStarted: increment(1),
      lastGameStarted: serverTimestamp(),
    });

    sendEvent("Comparatively Famous", "Game Started", "Fresh Game");

    if (gimmick.isSelected && gimmick.selected.name) {
      const gimmickRef = doc(
        db,
        `stats/cameo/specialGames/${gimmick.selected.name}`,
      );

      await runTransaction(db, async (transaction) => {
        const gimmickDoc = await transaction.get(gimmickRef);

        if (!gimmickDoc.exists()) {
          transaction.set(gimmickRef, {
            startedCount: 1,
            lastStarted: serverTimestamp(),
          });
        } else {
          transaction.update(gimmickRef, {
            startedCount: increment(1),
            lastStarted: serverTimestamp(),
          });
        }
      });

      sendEvent(
        "Comparatively Famous",
        "Special Game Started",
        gimmick.selected.name,
      );
    }
  };

  const toggleGimmickSelector = (isVisible) => {
    gimmick.selectorVisible = isVisible;
  };

  const selectGimmickRound = (e) => {
    const i = parseInt(e.target.value);
    gimmick.selected = gimmick.rounds[i];
    gimmick.isSelected = true;
  };

  const generateGameCelebrities = () => {
    // Okay, here's all the exhibition round stuff.
    let i = 0;

    while (i < settings.maxRounds) {
      // First, get three celebrities.
      let roundCelebs = returnThreeNewCelebs();

      // Check if any of them are duplicates. If none of them are, do stuff
      // (otherwise, this'll just loop again.)
      if (
        !isThisADuplicate(roundCelebs[0]) &&
        !isThisADuplicate(roundCelebs[1]) &&
        !isThisADuplicate(roundCelebs[2])
      ) {
        roundCelebs.forEach((cameo) => {
          game.cameoQueue.push(cameo);
        });

        let r = randomNumber(1, 30);
        if (r < 11) {
          game.cameoValuationIndexes.push(0);
        } else if (r < 21) {
          game.cameoValuationIndexes.push(1);
        } else {
          game.cameoValuationIndexes.push(2);
        }
        i++;
      }
    }

    if (gimmick && gimmick.selected && gimmick.selected.queue) {
      game.cameoQueue = gimmick.selected.queue;
    }
    populateFinalRound();
  };

  const isThisADuplicate = (x) => {
    const self = this;
    if (game.cameoQueue.filter((celeb) => celeb.name == x.name).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const returnThreeNewCelebs = () => {
    // Find the middle celeb.
    let possibleMiddles = allCelebs.filter(
      (celeb) => celeb.value < 750 && celeb.value > 21,
    );
    let middleCeleb = randomFrom(possibleMiddles);
    let middleValue = middleCeleb.value;

    // Find the most expensive celeb.
    let possibleUppers = allCelebs.filter((celeb) => celeb.value > middleValue);
    let upperCeleb = randomFrom(possibleUppers);
    let upperValue = upperCeleb.value;

    // Find the least expensive celeb.
    let possibleLowers = allCelebs.filter((celeb) => celeb.value < middleValue);
    let lowerCeleb = randomFrom(possibleLowers);
    let lowerValue = lowerCeleb.value;

    let celebs = [upperCeleb, middleCeleb, lowerCeleb];

    celebs = shuffle(celebs);
    return celebs;
  };

  const showTheGuesses = () => {
    const self = this;
    ui.animateCameoIndex = 0;
    var intervalId = window.setInterval(function () {
      if (ui.animateCameoIndex > round.leftSide.length) {
        ui.showDragHelp = true;
        clearInterval(intervalId);
      } else {
        showAGuessCard();
      }
    }, 1500);
  };

  const sortByValue = (list) => {
    function compare(a, b) {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    }
    if (list && list.length > 1) {
      return list.sort(compare);
    } else {
      return list;
    }
  };

  const submitSortOrder = () => {
    const self = this;
    ui.orderConfirmed = true;
    if (round.guessValueIndex != 2) {
      const i = round.guessValueIndex + 1;
      ui.valueGuess = round.correctSide[i].value + 1;
    } else {
      ui.valueGuess = 1;
    }

    if (round.guessValueIndex != 0) {
      ui.valueGuessMax = round.correctSide[round.guessValueIndex - 1].value - 1;
    } else {
      ui.valueGuessMax = "";
    }

    if (round.guessValueIndex != 2) {
      ui.valueGuessMin = round.correctSide[round.guessValueIndex + 1].value + 1;
    } else {
      ui.valueGuessMin = "";
    }

    ui.animateCameoIndex = 0;

    var intervalId = window.setInterval(function () {
      if (ui.animateCameoIndex > round.correctSide.length) {
        clearInterval(intervalId);
        $(".list-group.correct .cameo").removeClass(
          "animate__animated animate__backInUp",
        );
        ui.itsTimeToGuessValue = true;
      } else {
        showAnAnswerCard();
      }
    }, 1500);
  };

  const submitCameoValueGuess = async () => {
    const self = this;
    const n = round.guessValueIndex;
    let offBy = Math.abs(
      ui.valueGuess - round.correctSide[round.guessValueIndex].value,
    );

    if (round.correctSide[n].value == ui.valueGuess) {
      my.score += 250;
      my.valuationOffBy += 0;
      toast.success(`250 Points for bullseye!`, {
        position: POSITION.BOTTOM_LEFT,
        timeout: 1500,
      });

      soundPerfectValue.play();
    } else if (offBy < 50) {
      let addScore = 200 - offBy * 4;
      my.score += addScore;
      my.valuationOffBy += offBy;
      toast.info(`${addScore} points for being close`, {
        position: POSITION.BOTTOM_LEFT,
        timeout: 1500,
      });
      soundCloseValue.play();
    } else {
      my.valuationOffBy += offBy;
      toast.error(`off by ${"$" + offBy}`, {
        position: POSITION.BOTTOM_LEFT,
        timeout: 1500,
      });
      soundBadValue.play();
    }

    const celebToLog = round.correctSide[round.guessValueIndex];
    const celebName = celebToLog.name;
    const celebValue = celebToLog.value;
    const valuationRef = doc(db, `stats/cameo/celebs/${celebName}`);

    try {
      await runTransaction(db, async (transaction) => {
        const valuationDoc = await transaction.get(valuationRef);

        if (!valuationDoc.exists()) {
          transaction.set(valuationRef, {
            name: celebName,
            actualValue: celebValue,
            valuationCount: 1,
            averagePlayerValue: ui.valueGuess,
            lastValuation: serverTimestamp(),
          });
        } else {
          const valuationData = valuationDoc.data();
          const newValuationCount = valuationData.valuationCount + 1;
          const newAveragePlayerValue =
            (valuationData.averagePlayerValue * valuationData.valuationCount +
              ui.valueGuess) /
            newValuationCount;

          transaction.update(valuationRef, {
            actualValue: celebValue,
            valuationCount: newValuationCount,
            averagePlayerValue: newAveragePlayerValue,
            lastValuation: serverTimestamp(),
          });
        }
      });
    } catch (e) {
      console.error("Transaction failed: ", e);
    }

    round.valueGuessed = true;
    ui.itsTimeToGuessValue = false;

    if (round.number < settings.maxRounds) {
      setTimeout(function () {
        ui.showNextRoundButton = true;
      }, 3000);
    } else if (round.number >= settings.maxRounds) {
      setTimeout(function () {
        toast.info(`You have 1 new email`, {
          position: POSITION.BOTTOM_RIGHT,
          timeout: 2500,
        });
        soundNewEmail.play();
      }, 2000);
      setTimeout(function () {
        ui.showEmailButton = true;
      }, 3000);
    }
  };

  const startNextRound = () => {
    const self = this;
    clearUI();
    round.valueGuessed = false;
    round.guessValueIndex = -1;

    //////////////////////////////////////////////////////////////
    // Let's put the answers in history (if there were any)
    if (round.correctSide && round.correctSide.length > 0) {
      round.correctSide.forEach((cameo, index) => {
        let c = {
          name: cameo.name,
          correct: false,
        };
        if (round.correctSide[index].slug == round.rightSide[index].slug) {
          c.correct = true;
        }
        game.cameoHistory.push(c);
      });
    }

    // Advance round number
    round.number++;

    // Let's populate the left side with the queue....
    var i = 0;
    while (i < 3) {
      round.leftSide.push(game.cameoQueue.shift());
      i++;
    }
    // Empty the right side...
    round.rightSide = [];

    // Populate and then correctly sort the answers side...
    round.correctSide = [...round.leftSide];
    round.correctSide = sortByValue(round.correctSide);

    // And then figure out which one I'm valuating....
    round.guessValueIndex = game.cameoValuationIndexes[round.number - 1];

    // Hide and then show the left side...
    $(".list-group.unranked .cameo").addClass("off-table");
    setTimeout(function () {
      $(".list-group.unranked .cameo").addClass("off-table");
    }, 1);
    showTheGuesses();

    // Show a toast...
    toast.info(`Round ${round.number} begins...`);
  };

  const showAGuessCard = () => {
    const self = this;
    ui.animateCameoIndex++;
    $(".list-group.unranked .cameo:nth-child(" + ui.animateCameoIndex + ")")
      .removeClass("off-table")
      .addClass("animate__animated animate__backInUp");
    setTimeout(function () {
      $(
        ".list-group.unranked .cameo:nth-child(" + ui.animateCameoIndex + ")",
      ).removeClass("animate__animated animate__bounceInUp");
    }, 1000);
  };

  const showAnAnswerCard = () => {
    const self = this;
    ui.animateCameoIndex++;
    let n = ui.animateCameoIndex - 1;
    $(".list-group.correct .cameo:nth-child(" + ui.animateCameoIndex + ")")
      .removeClass("off-table")
      .addClass("animate__animated animate__jackInTheBox");

    setTimeout(function () {
      $(
        ".list-group.guessed.ranked .cameo:nth-child(" +
          ui.animateCameoIndex +
          ")",
      ).addClass("colorized");
      if (round.rightSide[n] && round.correctSide[n]) {
        if (round.rightSide[n].slug == round.correctSide[n].slug) {
          my.score += 100;
          my.correctSorts += 1;
          soundCorrect.play();
          toast.info(`100 Points for ${round.rightSide[n].name}`, {
            position: POSITION.BOTTOM_LEFT,
          });
        } else {
          soundMiss.play();
          my.incorrectSorts += 1;
        }
      }
    }, 1000);
  };

  // FINAL ROUND
  const showTheEmail = () => {
    const self = this;
    ui.showEmailButton = false;
    $("#EmailFromPasha").removeClass("off-screen");

    setTimeout(function () {
      toast.success(`${dollars(round.budget)} added to bank account`, {
        position: POSITION.BOTTOM_RIGHT,
        timeout: 4500,
      });
      ui.showBeginFinalRoundButton = true;
    }, 5000);
  };

  const beginFinalRound = () => {
    const self = this;

    //////////////////////////////////////////////////////////////
    // First, let's put your last answers in history...
    if (round.correctSide && round.correctSide.length > 0) {
      round.correctSide.forEach((cameo, index) => {
        let c = {
          name: cameo.name,
          correct: false,
        };
        if (round.correctSide[index].slug == round.rightSide[index].slug) {
          c.correct = true;
        }
        game.cameoHistory.push(c);
      });
    }

    //////////////////////////////////////////////////////////////
    // Okay, now let's set up the board for the final round.
    round.leftSide = game.availableToHire;
    round.rightSide = [];
    game.finalRound = true;
  };

  const populateFinalRound = () => {
    const self = this;

    let finalRoundCelebs;

    if (
      gimmick.isSelected &&
      gimmick.selected.queue &&
      gimmick.selected.reuseQueueForFinal
    ) {
      // If you're playing a gimmick round (and want to), you can reuse the queue in the final.
      finalRoundCelebs = [...gimmick.selected.queue];
    } else if (
      gimmick.isSelected &&
      gimmick.selected.queue &&
      gimmick.selected.finalRoundQueue
    ) {
      // Or, if you're playing a special round and you have a specific final round queue, use that.
      finalRoundCelebs = [...gimmick.selected.finalRoundQueue];
    } else {
      // if not, just use the list of all celebs in the regular list.
      finalRoundCelebs = [...allCelebs];
    }
    let celebs = shuffle(finalRoundCelebs);
    celebs = celebs.slice(0, 10);
    game.availableToHire = celebs;

    let costForAll = 0;

    game.availableToHire.forEach((cameo, index) => {
      costForAll += cameo.value;
    });

    let avg = parseInt(costForAll / 2.5);
    if (avg > 1000) {
      round.budget = 1000;
    } else {
      round.budget = avg;
    }
  };

  const finishHiring = () => {
    const self = this;

    round.leftSide = [];
    ui.hiringFinished = true;
    $(".list-group.unhired").animate({ opacity: 0.0 }, 2000);

    ui.countingInterval = window.setInterval(function () {
      if (ui.countingHireIndex >= round.rightSide.length) {
        clearInterval(ui.countingInterval);

        let exceededBudget = "";
        if (round.budget - round.spent <= 0) {
          exceededBudget = "YES";
        } else {
          exceededBudget = "NO";
        }

        saveGameOverData(game.cameoHistory, round.rightSide, exceededBudget);

        sendEvent("Comparatively Famous", "Game Finished", my.score);

        setTimeout(function () {
          game.finalRound = false;
          game.over = true;
          playTheGameOverAudio();
        }, 2000);
      } else {
        showHirePrice();
      }
    }, 3000);
  };

  // const saveGameOverData = (cameoHistory, birthdayWishes, isBudgetExceeded) => {
  //   // in /stats/cameo ...
  //   // 1. increment gamesFinsihed by 1
  //   // 2. setGameLastFinished to serverTimestamp()
  //   // 3. if isBudgetExceeded is true, increment timesBudgetExceeded by 1

  //   // for each in cameoHistory...
  //   // 1. create `/stats/cameo/celebs/${cameo.name}` if it doesn't exist
  //   // 2. if cameo.correct is true, add 1 to sortScore
  //   // 3. but if cameo.correct is true, subtract 1 from sortScore

  //   // for each in birthdayWishes...
  //   // 1. create `/stats/cameo/celebs/${birthdayWish.name}` if it doesn't exist
  //   // 2. add 1 to birthdayWishCount

  // }

  const saveGameOverData = async (
    cameoHistory,
    birthdayWishes,
    isBudgetExceeded,
  ) => {
    try {
      // Update the main stats document
      await runTransaction(db, async (transaction) => {
        const statsDoc = await transaction.get(statsRef);

        if (!statsDoc.exists()) {
          throw new Error("Stats document does not exist!");
        }

        const updates = {
          gamesFinished: increment(1),
          lastGameFinished: serverTimestamp(),
        };

        if (isBudgetExceeded === "YES") {
          updates.timesBudgetExceeded = increment(1);
        }

        transaction.update(statsRef, updates);
      });

      // Update cameoHistory
      for (const cameo of cameoHistory) {
        const cameoRef = doc(db, `stats/cameo/celebs/${cameo.name}`);
        await runTransaction(db, async (transaction) => {
          const cameoDoc = await transaction.get(cameoRef);

          if (!cameoDoc.exists()) {
            transaction.set(cameoRef, {
              name: cameo.name,
              sortScore: cameo.correct ? 1 : -1,
            });
          } else {
            const currentSortScore = cameoDoc.data().sortScore || 0;
            transaction.update(cameoRef, {
              sortScore: cameo.correct ? increment(1) : increment(-1),
            });
          }
        });
      }

      // Update birthdayWishes
      for (const birthdayWish of birthdayWishes) {
        const birthdayWishRef = doc(
          db,
          `stats/cameo/celebs/${birthdayWish.name}`,
        );
        await runTransaction(db, async (transaction) => {
          const birthdayWishDoc = await transaction.get(birthdayWishRef);

          if (!birthdayWishDoc.exists()) {
            transaction.set(birthdayWishRef, {
              name: birthdayWish.name,
              birthdayWishCount: 1,
            });
          } else {
            transaction.update(birthdayWishRef, {
              birthdayWishCount: increment(1),
            });
          }
        });
      }
    } catch (e) {
      console.error("Transaction failed: ", e);
    }
  };

  const showHirePrice = () => {
    const self = this;
    ui.countingHireIndex++;
    let n = ui.countingHireIndex - 1;
    $(".list-group.hired .cameo:nth-child(" + ui.countingHireIndex + ") .value")
      .removeClass("invisible")
      .addClass("animate__animated animate__bounceIn");

    setTimeout(function () {
      round.spent += round.rightSide[n].value;

      if (round.spent <= round.budget) {
        my.score += 100;
        my.pointsEarnedInFinalRound += 100;
        toast.success(`100 points for ${round.rightSide[n].name}`, {
          position: POSITION.BOTTOM_LEFT,
          timeout: 1500,
        });
        soundUnderBudget.play();
      } else {
        if (!ui.exceededBudget) {
          my.score -= my.pointsEarnedInFinalRound;
          my.pointsEarnedInFinalRound = 0;
          toast.error(`${round.rightSide[n].name} exceeded the budget!`, {
            position: POSITION.BOTTOM_LEFT,
            timeout: 2500,
          });
          ui.exceededBudget = true;
          soundOverBudget.play();
        } else {
          soundFutherOverBudget.play();
        }
      }
    }, 1000);

    setTimeout(function () {
      $(
        ".list-group.hired .cameo:nth-child(" + ui.countingHireIndex + ")",
      ).addClass("animate__animated animate__backOutUp");
      setTimeout(function () {
        $(
          ".list-group.hired .cameo:nth-child(" + ui.countingHireIndex + ")",
        ).addClass("display-none");
      }, 450);
    }, 2000);
  };

  const playTheGameOverAudio = () => {
    const self = this;

    let happyBirthdays = [...birthdayHowls];

    if (computedGimmickName === "Porno People") {
      // Simone isn't one of these.
      happyBirthdays.splice(7, 3);
    }

    happyBirthdays = shuffle(happyBirthdays);
    happyBirthdays = happyBirthdays.filter((x) => x !== undefined);
    let n = 0;
    let i = round.rightSide.length;
    soundGameOverMusic.play();

    setTimeout(function () {
      var intervalId = window.setInterval(function () {
        if (n < i) {
          happyBirthdays[n].play();
          n++;
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
    }, 1200);
  };

  const clearUI = () => {
    const self = this;
    ui.orderConfirmed = false;
    ui.showDragHelp = false;
    ui.valueGuess = 0;
    ui.valueGuessMax = null;
    ui.valueGuessMin = null;
    ui.animateCameoIndex = 0;
    ui.itsTimeToGuessValue = false;
    ui.showNextRoundButton = false;
  };

  ///////////////////////////////////////////////
  ///////////////////////////////////////////////
  // Computeds

  const dragOptions = computed(() => {
    return {
      animation: 0,
      group: "description",
      //disabled: !this.editable,
      ghostClass: "ghost",
    };
  });

  const computedGuessingPhase = computed(() => {
    if (game.finalRound) {
      if (!ui.hiringFinished) {
        return "hiring";
      } else {
        return "calculatingCosts";
      }
    } else {
      if (round.leftSide.length > 0 || round.rightSide.length < 3) {
        return "sort";
      } else if (!ui.orderConfirmed) {
        return "submit";
      } else if (!round.valueGuessed) {
        return "answers";
      } else if (round.valueGuessed && round.number >= settings.maxRounds) {
        return "newMail";
      } else {
        return "finished";
      }
    }
  });

  const computedCorrectSortScore = computed(() => {
    const total = my.correctSorts + my.incorrectSorts;
    const part = my.correctSorts;

    if (total && part) {
      return {
        pct: percentOf(total, part) + "%",
        context: `(<strong>${part}</strong> of <strong>${total}</strong> correct)`,
      };
    } else if (part == 0) {
      return {
        pct: "None",
        context: `(<strong>None</strong> of your <strong>${total}</strong> guesses were correct)`,
      };
    } else {
      return {
        pct: null,
        context: ``,
      };
    }
  });

  const computedValuationSkill = computed(() => {
    if (!my.valuationOffBy || my.valuationOffBy < 1) {
      return {
        number: 0,
        rating: "Suspiciously Perfect",
      };
    } else {
      let averageValulationOffBy = parseInt(my.valuationOffBy / round.number);
      let valuationRating = "";
      if (averageValulationOffBy > 100) {
        valuationRating = "Terrible!";
      } else if (averageValulationOffBy > 90) {
        valuationRating = "Awful";
      } else if (averageValulationOffBy > 80) {
        valuationRating = "Bad";
      } else if (averageValulationOffBy > 70) {
        valuationRating = "Not Good";
      } else if (averageValulationOffBy > 60) {
        valuationRating = "Okay";
      } else if (averageValulationOffBy > 50) {
        valuationRating = "Good";
      } else if (averageValulationOffBy > 40) {
        valuationRating = "Great";
      } else if (averageValulationOffBy > 30) {
        valuationRating = "Amazing";
      } else if (averageValulationOffBy > 20) {
        valuationRating = "Spectacular";
      } else if (averageValulationOffBy > 10) {
        valuationRating = "Wonderful!";
      } else if (averageValulationOffBy > 0) {
        valuationRating = "Nearly Perfect!";
      }

      return {
        number: averageValulationOffBy,
        rating: valuationRating,
      };
    }
  });

  const computedGimmickName = computed(() => {
    if (!gimmick || !gimmick.selected || !gimmick.selected.name) {
      return null;
    } else {
      return gimmick.selected.name.replace("'", "").replace("🖖", "").trim();
    }
  });
</script>
<template lang="pug" src="./Cameo.pug"></template>
<style lang="scss" src="./Cameo.scss"></style>
