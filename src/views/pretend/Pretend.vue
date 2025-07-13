<script setup>
  import { ref, reactive, computed, onMounted } from "vue";

  import {
    randomNumber,
    randomFrom,
    shuffle,
    preceisePercentOf,
    percentOf,
    addCommas,
    findInArray,
    removeFromArray,
    sendEvent,
    dollars,
  } from "@/shared/js/_functions.js";
  import { cheeseIntroHeadlines, cheeseIntroMessages, cheeseStatus } from "./js/_cheese";
  import { workThisArray, stringInArray, capitalize, bold, similarity, editDistance, testChance } from "./js/_functions";
  import { picPath, impersonators } from "./js/_impersonators";
  import { minglingHeadlines, moodHeadlines, partyMoods } from "./js/_partymoods";
  import { settings, correctHeadlines, closeHeadlines, wrongHeadlines } from "./js/_variables";

  // Firebase & VueFire Stuff
  import { doc, increment, serverTimestamp, updateDoc, runTransaction } from "firebase/firestore";
  import { useFirestore, useCollection, useDocument } from "vuefire";
  const db = useFirestore();
  const statsRef = doc(db, `stats/pretend`);

  ///////////////////////////////////
  // Variables

  const ui = reactive({
    sidebarVisible: false,
    bannerVisible: false,
    canCheat: settings.canCheat,
    guess: "",
    phase: "question",
    debugMode: true,
    celebrities: impersonators, // Make sure to define or import impersonators
    met: [],
    headlineText: [],
    answer: "correct",
  });
  const my = reactive({
    round: 0,
    points: 0,
    correctGuesses: 0,
    score: 0,
    previousScore: 0,
    seenCheese: false,
    stepsToCheese: settings.stepsToCheese, // Make sure to define or import settings
    mood: null,
    previousMood: null,
    warmUp: true,
    dangerZone: false,
  });
  const current = reactive({
    pic: "",
    name: "",
    url: "",
    variants: "",
    sex: "",
  });
  const feedback = reactive({
    headline: "",
    headlineClass: "",
    showAnswerMessage: false,
    answerMessage: "",
    showMoodMessage: false,
    moodMessage: "",
    showCheeseMessage: false,
    cheeseMessage: "",
  });
  const specialScreen = reactive({
    show: false,
    type: null,
    pic: "",
    headline: "",
    message: "",
    gameOver: false,
  });

  ///////////////////////////////////
  // Functions
  const nextRound = () => {
    checkSpecialScreens();

    if (specialScreen.show == false) {
      ui.answer = null;
      my.round++;
      ui.guess = "";
      findImpersonator();
      generateHeadline();
      ui.phase = "question";
      setFocus();
    }

    if (my.round == 5) {
      var audio = new Audio("audio/bylemon.mp3");
      audio.play();
      ui.bannerVisible = true;
    }
  };

  const generateHeadline = () => {
    let h;
    if (my.round == 1) {
      // Round 1
    } else if (warmUp) {
      // You're warming up.
      h = randomFrom(minglingHeadlines);
      ui.headlineText = [h[0], h[1]];
    } else {
      h = randomFrom(moodHeadlines[my.mood]);
      ui.headlineText = [h[0], h[1]];
    }
  };

  const findImpersonator = () => {
    // Who are you going to meet?
    //let i = randomFrom(ui.celebrities);
    let i = ui.celebrities[91];
    current.pic = picPath + i.file;
    current.name = i.celebrity;
    current.url = i.url;
    current.variants = i.variants;
    current.sex = i.sex;

    // Did you already meet this person?
    if (stringInArray(current.name, ui.met)) {
      findImpersonator();
    } else {
      ui.met.push(current.name);
    }
  };

  const checkSpecialScreens = () => {
    if (my.seenCheese == false && my.stepsToCheese < settings.stepsToCheese) {
      cheeseScreen("show");
      setFocus();
    } else if (dangerZone && my.previousMood == "veryBad" && ui.answer == "wrong") {
      specialScreen.show = true;
      specialScreen.type = "lose";
      specialScreen.pic = "img/pretend/gameover/lose-mobile.jpg";
      specialScreen.headline = "You lose!";
      specialScreen.message =
        "Having experienced significant problems assessing the identities of the guests as well as what others at this party would consider socially acceptable, you are told to leave.<br/><br />An hour later, you find yourself at a Taco Bell getting sick on chaulpas, and tell a Larry The Cable Guy impersonator that he's your best friend. That is the saddest moment you've ever had.";
      specialScreen.gameOver = true;
      logGameOver("lose");
      sendEvent("Game Over", "Lose", "Round " + my.round);
    } else if (my.stepsToCheese < 1) {
      specialScreen.show = true;
      specialScreen.type = "win";
      specialScreen.pic = "img/pretend/gameover/win-mobile.jpg";
      specialScreen.headline = "You win!";
      specialScreen.message = "";
      specialScreen.gameOver = true;
      logGameOver("win");
      sendEvent("Game Over", "Win", "Round " + my.round);
    }
  };

  const checkName = () => {
    let correctGuess = false;
    if (ui.guess.toLowerCase() == current.name.toLowerCase() || ui.guess == "xxxx") {
      // 100% correct
      ui.answer = "correct";
      correctGuess = true;
    } else if (current.variants) {
      current.variants.forEach((v) => {
        if (ui.guess.toLowerCase() == v.toLowerCase()) {
          // Acceptable variant.
          correctGuess = true;
          ui.answer = "close";
        }
      });
    }

    if (correctGuess == false) {
      let score = similarity(current.name, ui.guess);
      if (score > 0.71) {
        // Your spelling was off, but this is close enough.
        ui.answer = "close";
        correctGuess = true;
      } else {
        // NOTE TO LEMON: Allow something here for the wrong answers you suspected.
        ui.answer = "wrong";
      }
    }

    if (my.round < 2) {
      logNewGame();
    }

    if (ui.answer == "correct") {
      my.points = my.points + 1;
      my.correctGuesses++;
      logPretendGuess(current, "correct");
    } else if (ui.answer == "close") {
      my.points = my.points + 0.7;
      my.correctGuesses++;
      logPretendGuess(current, "close");
    } else if (ui.answer == "wrong") {
      my.points = my.points - 0.85;
      logPretendGuess(current, "bad");
    }

    sendEvent(ui.answer, current.name, ui.guess);
    generateFeedback();
    ui.phase = "answer";
  };

  const logNewGame = async () => {
    await updateDoc(statsRef, {
      gamesStarted: increment(1),
      lastGameStarted: serverTimestamp(),
    });
  };

  const logPretendGuess = async (pretender, guess) => {
    const pretendName = pretender.name;
    const pretendRef = doc(db, `stats/pretend/impersonators/${pretendName}`);

    const isCorrect = guess === "correct";
    const isClose = guess === "close";
    const isBad = guess === "bad";

    await runTransaction(db, async (transaction) => {
      const pretendDoc = await transaction.get(pretendRef);
      if (!pretendDoc.exists()) {
        transaction.set(pretendRef, {
          name: pretendName,
          correctGuessCount: isCorrect ? 1 : 0,
          closeGuessCount: isClose ? 1 : 0,
          badGuessCount: isBad ? 1 : 0,
          lastGuess: serverTimestamp(),
        });
      } else {
        const updateData = {
          lastGuess: serverTimestamp(),
        };
        if (isCorrect) {
          updateData.correctGuessCount = increment(1);
        } else if (isClose) {
          updateData.closeGuessCount = increment(1);
        } else if (isBad) {
          updateData.badGuessCount = increment(1);
        }
        transaction.update(pretendRef, updateData);
      }
    });
  };

  const logGameOver = async (gameStatus) => {
    let incrementGamesWon = 0;
    let incrementGamesLost = 0;
    if (gameStatus === "win") {
      incrementGamesWon = 1;
    }
    if (gameStatus === "lose") {
      incrementGamesLost = 1;
    }
    await updateDoc(statsRef, {
      gamesFinished: increment(1),
      lastGameFinished: serverTimestamp(),
      gamesWon: increment(incrementGamesWon),
      gamesLost: increment(incrementGamesLost),
    });
  };

  const generateAnswerFeedback = () => {
    feedback.headlineClass = ui.answer;
    const yourGuess = capitalize(ui.guess);

    // Generate the Answer Feedback
    if (ui.answer == "correct") {
      feedback.headline = randomFrom(correctHeadlines);

      let correctMessages = [
        [
          "The " + bold(current.name) + " impersonator ",
          [
            "brings you a drink",
            "shakes your hand a bit too aggressively",
            "introduces " + himself(current.sex) + " ",
            "smiles widely ",
            "lets you touch " + his(current.sex) + " hair",
            "playfully tweaks your nose",
            "asks if you can link up on Ello",
            "offers you a cigarette",
          ],
          ", and you chat for a bit about ",
          [
            "the Philadelphia Eagles.",
            "Trump.",
            "the United Nations and Palestine.",
            "utter nonsense.",
            "cocktail recipes.",
            "lawn maintenance.",
            "penny stocks.",
            "methods of hypnosis.",
            "your mutual appreciation for The Beatnuts",
            "your favorite recurring dreams",
            "pickled cabbage and the LA Kings",
            "that river in Ohio that used to catch fire all the time",
            "crimes",
          ],
        ],
        [
          capitalize(he(current.sex)) + " introduces you to ",
          [
            "a Jimmy Carr impersonator",
            "this one guy who might be Glenn Danzig",
            "one of those mimes who dresses like a robot",
            "someone who claims to be one of the Daft Punk guys",
            his(current.sex) + " neighbor Catherine",
          ],
          ", and the three of you ",
          [
            "play a couple rounds of Uno.",
            "name your favorite episodes of <i>Silicon Valley</i>.",
            "make utterly baseless guesses about who at the party is sleeping together.",
            "trade recipes for polenta.",
            "discuss how well " + current.name + " aged.",
            "brainstorm an ideal <i>Match Game</i> cast.",
            "discuss your respective skin care routines",
          ],
        ],
      ];

      feedback.answerMessage = workThisArray(correctMessages);
    } else if (ui.answer == "close") {
      feedback.headline = randomFrom(closeHeadlines);

      let closeMessages = [
        [
          `${capitalize(he(current.sex))} is actually a ${bold(current.name)} impersonator, `,
          [
            `but ${he(current.sex)} chalks up the mistake to you having a speech impediment, which you now have to pretend for the rest of the night`,
            `but ${he(current.sex)} just assumes you&apos;e illiterate. To futher the ruse, you write down "HALO, NISE 2 MEET U :)" on a piece of paper.`,
            `but blames the misspelling on your mouthful of Ritz crackers. You continue to make small talk, spitting crumbs in ${his(current.sex)} face.`,
          ],
        ],
        [
          `“${yourGuess}, right?” you ask.`,
          [
            `${he(current.sex)} looks at you quizzically. “${bold(current.name)} actually.” “That's what I said. `,
            current.name + ".” You confidently reply.",
            "“Did you say " +
              current.name +
              " or " +
              yourGuess +
              "?” " +
              he(current.sex) +
              " asks you. “Which is the right one?” you reply. “What?” " +
              he(current.sex) +
              " asks. You then ask if " +
              he(current.sex) +
              " wants to see a magic trick, but do not perform one.",
            `“You mean ${current.name}?” ${he(current.sex)} asks. You tell ${him(current.sex)} that's what you meant.`,
          ],
        ],
        [
          `“You kinda look like ${yourGuess}.” you tell ${him(current.sex)}. `,
          [
            `“Kind of looking like ${bold(current.name)} is kind of what I do!” ${he(current.sex)} says. You laugh politely.`,
            `${capitalize(he(current.sex))} thanks you for saying so, and doesn't correct you by pronouncing it ${bold(current.name)}.`,
          ],
        ],
        [
          `The ${bold(current.name)} impersonator weighs the pros and cons of correcting you, and ultimately `,
          [
            `points over your shoulder and shouts “Is that Beyoncé!?” but your back is to the wall. You see ${him(current.sex)} give a sad look, and finally turn around out of politeness.`,
            `realizing life is too short, ${he(current.sex)} mutters “Sure.” and then pushes past you.`,
            `sighs, pinches the bridge of ${his(current.sex)} nose, and just kind of stands there. After three minutes, you realize ${he(current.sex)} has fallen asleep.`,
            `decides on chewing scenery. “${ui.guess}!!??” ${he(current.sex)} bellows, and then gives a perfomative sob with ${his(current.sex)} face in the crook of ${his(current.sex)} elbow. Nearby guests politely applaud.`,
            `hands you a business card that says “${current.name}. (Not ${yourGuess})” and slinks away.`,
            `throws an arm around your shoulders and says “close enough!” As the heartbreak of halitosis sinks in, you realize it might be <i>too</i> close.`,
          ],
        ],
      ];
      feedback.answerMessage = workThisArray(closeMessages);
    } else if (ui.answer == "wrong") {
      feedback.headline = randomFrom(wrongHeadlines);
      let wrongMessages = [
        [
          "The  " + bold(current.name) + " impersonator ",
          ["looks visibly annoyed that", "is furious", "seems genuinely hurt that", "is super bummed", "can not believe"],
          " you mistook " + him(current.sex) + " for " + yourGuess + ". ",
          [
            "You apologize profusely and " + he(current.sex) + " seems placated.",
            "You distract " + him(current.sex) + " by asking " + his(current.sex) + " workout routine.",
            "You lift your shirt collar over your face and " + he(current.sex) + " goes away.",
            "You try to change topics, but the only one you can think of is javascript, and nobody <i>ever</i> wants to talk about javascript.",
            "So " +
              he(current.sex) +
              " tells you about " +
              his(current.sex) +
              " time at " +
              current.name +
              " school and how good " +
              his(current.sex) +
              " grades were. This goes on for some time.",
          ],
        ],
        [
          "“" + yourGuess + "!” you scream, and the " + bold(current.name) + " impersonator ",
          [
            "takes a wild punch at your nose, missing by a good foot.",
            "spits directly into your mouth.",
            "breaks down into tears.",
            "loudly calls your citizenship into question.",
            "makes a sound like “GGLLLGGGGRG”, which you find very distressing.",
            "screams “You'll never work in this town again!”",
            "screams “NO!”",
            "says" + he(current.sex) + "feels sorry for you.",
          ],
          " ",
          [
            "That could have gone better.",
            "You'll have to do better.",
            "You feel genuine shame.",
            "You fold your arms and look around the room for a couple minutes.",
            "You apologize, and " + he(current.sex) + " immediately forgives you.",
            "You apologize, but " + he(current.sex) + " doesn't forgive you.",
            "“Pistols at dawn!” " + capitalize(he(current.sex)) + " declares. “And pray you're a better shot than " + ui.guess + " was!”",
          ],
        ],
        [
          capitalize(he(current.sex)) + " stares at you ",
          [
            "and holds your gaze for a full minute.",
            "and stands unblinking.",
            "in a way that's vaguely erotic.",
            "in a piercing gaze you find terrifying.",
            "and aggressively chews a stick of gum.",
            "angrily.",
          ],
          " “" + bold(current.name) + "!” " + he(current.sex) + " screams ",
          [
            "directly into your face.",
            "and you excuse yourself to the bathroom to break " + his(current.sex) + " line of sight.",
            "and you weep openly in front of " + him(current.sex) + ".",
            "and the whole party turns to look at you.",
            "and then snaps " + his(current.sex) + " teeth at you, like Val Kilmer in Top gun. Perhaps not intimidating, but <i>definitely</i> unsettling",
          ],
        ],
      ];
      feedback.answerMessage = workThisArray(wrongMessages);
    }

    feedback.showAnswerMessage = true;
    setFocus();
  };

  const checkPartyMood = () => {
    my.previousScore = my.score;
    my.previousMood = my.mood;

    my.score = (my.points / my.round).toFixed(2);

    // Generate the Mood Score
    if (my.score > 0.69) {
      my.mood = "veryGood";
    } else if (my.score > 0.39) {
      my.mood = "prettyGood";
    } else if (my.score > 0.19) {
      my.mood = "neutral";
    } else if (my.score > -0.19) {
      my.mood = "prettyBad";
    } else {
      my.mood = "veryBad";
    }

    // Mood Score Feedback
    if (my.mood != my.previousMood) {
      feedback.showMoodMessage = true;
      feedback.moodMessage = randomFrom(partyMoods[my.mood]);
    } else if (testChance(37)) {
      // a certain liklihood that it will display the general mood of the party, without specifically referencing your status.
      feedback.showMoodMessage = true;
      let f = partyMoods[my.mood];
      feedback.moodMessage = randomFrom(f.concat(partyMoods.noChange));
    } else {
      feedback.showMoodMessage = false;
      feedback.moodMessage = null;
    }
  };

  const cheeseScreen = (t) => {
    if (t == "hide") {
      specialScreen.show = false;
      nextRound();
    } else if (t == "show") {
      my.seenCheese = true;
      specialScreen.show = true;
      specialScreen.type = "cheese";
      specialScreen.pic = "img/pretend/cheeselog/desktop.jpg";

      specialScreen.headline = randomFrom(cheeseIntroHeadlines);
      specialScreen.message = randomFrom(cheeseIntroMessages);
      specialScreen.message += " [ " + my.stepsToCheese + " steps away ]";
    }
  };

  const checkTheCheese = () => {
    if (ui.answer != "wrong") {
      my.stepsToCheese--;

      let f = cheeseStatus.any;

      if (my.stepsToCheese > settings.stepsToCheese * 0.66) {
        // You are far from the cheese
        f.concat(cheeseStatus.far);
      } else if (my.stepsToCheese > settings.stepsToCheese * 0.33) {
        // You are medium distance from the cheese
        f.concat(cheeseStatus.medium);
      } else {
        // You are close to the cheese
        f.concat(cheeseStatus.close);
      }

      feedback.showCheeseMessage = true;
      feedback.cheeseMessage = randomFrom(f);
    } else {
      // LEMON: Maybe an infrequent cheese cheeck here? Maybe?
      feedback.showCheeseMessage = false;
    }
  };

  const toggleDrawer = () => {
    ui.sidebarVisible = !ui.sidebarVisible;
    if (ui.sidebarVisible) {
      sendEvent("Info Drawer Opened", "Drawer Open");
    }
  };

  const generateFeedback = () => {
    generateAnswerFeedback();
    checkPartyMood();
    checkTheCheese();
  };

  const visitImpersonatorWebsite = () => {
    sendEvent("Impersonator Website", current.name, current.url);
    window.open(current.url, "_blank", "location=yes,height=600,width=960,scrollbars=yes,status=yes");
  };

  const visitIllustratorWebsite = () => {
    sendEvent("Illustrator Website", "Sanguinary Novel", "https://twitter.com/aberrantwhimsy");
    window.open("https://twitter.com/aberrantwhimsy", "_blank", "location=yes,height=600,width=960,scrollbars=yes,status=yes");
  };

  const setFocus = () => {
    // Note, you need to add a ref="search" attribute to your input.
    // setTimeout(() => {
    //   if (this.$refs.guess) {
    //     this.$refs.guess.focus();
    //   } else if (this.$refs.keepmingling) {
    //     this.$refs.keepmingling.focus();
    //   } else if (this.$refs.missionstart) {
    //     this.$refs.missionstart.focus();
    //   }
    // }, 500);
  };

  const his = (gender) => {
    if (gender == "m") {
      return "his";
    } else if (gender == "f") {
      return "her";
    } else {
      return "their";
    }
  };

  const he = (gender) => {
    if (gender == "m") {
      return "he";
    } else if (gender == "f") {
      return "she";
    } else {
      return "they";
    }
  };

  const him = (gender) => {
    if (gender == "m") {
      return "him";
    } else if (gender == "f") {
      return "her";
    } else {
      return "them";
    }
  };

  const himself = (gender) => {
    if (gender == "m") {
      return "himself";
    } else if (gender == "f") {
      return "herself";
    } else {
      return "themself";
    }
  };

  ////////////////////////////////////////////////
  //
  // Computeds
  const warmUp = computed(() => {
    if (my.round > settings.warmUpRounds) {
      return false;
    } else {
      return true;
    }
  });

  const dangerZone = computed(() => {
    if (my.mood == "veryBad" && !warmUp) {
      return true;
    } else {
      return false;
    }
  });

  const myScore = computed(() => {
    return my.points / my.round;
  });

  // Pronouns

  // const his = computed((gender) => {
  //   if (gender == "m") {
  //     return "his";
  //   } else if (gender == "f") {
  //     return "her";
  //   } else {
  //     return "their";
  //   }
  // });

  // const he = computed(() => {
  //   if (current.sex == "m") {
  //     return "he";
  //   } else if (current.sex == "f") {
  //     return "she";
  //   }
  // });

  // const him = computed(() => {
  //   if (current.sex == "m") {
  //     return "him";
  //   } else if (current.sex == "f") {
  //     return "her";
  //   }
  // });

  // const himself = computed(() => {
  //   if (current.sex == "m") {
  //     return "himself";
  //   } else if (current.sex == "f") {
  //     return "herself";
  //   }
  // });

  onMounted(() => {
    nextRound();
  });
</script>
<template lang="pug" src="./Pretend.pug"></template>
<style lang="scss" src="./Pretend.scss"></style>
