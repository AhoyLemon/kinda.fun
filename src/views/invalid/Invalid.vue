<script setup>
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // IMPORTS
  import { reactive, computed, onMounted, getCurrentInstance } from "vue"; // Import reactive from Vue 3
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
  import { countVowels } from "./js/_functions";
  import {
    gameTitle,
    siteURL,
    playerID,
    employeeNumberSeed,
    defaults,
    settings,
    roundDefaults,
    resetRoundVariables,
    resetUI,
    rulePhrasings,
    flyingPigLines,
    my,
    round,
    ui,
    game,
  } from "./js/_variables";
  import { challenges } from "./js/_challenges";

  /////// Sounds
  import { Howl, Howler } from "howler";
  import {
    musicLobby,
    soundOink,
    soundNewRule,
    soundinvalidStartGuessing,
    soundBadGuess,
    soundCorrectGuess,
    soundSystemCrash,
    soundCorrect,
    soundNo,
    soundCracked,
    soundYouIdiot,
    soundTooSlow,
    musicFinalRound,
    soundFinalRoundOver,
  } from "./js/_sounds";

  ////////////// Toasts
  import Toast, { POSITION } from "vue-toastification";
  import "vue-toastification/dist/index.css";
  import MyToast from "./vue/MyToast.vue";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  /////// socket.io
  // import { setupSocketHandlers } from "./js/_socketHandlers";
  import { io } from "socket.io-client";
  const socket = io.connect();

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Functions

  const createRoom = () => {
    function makeID(digits) {
      let text = "";
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      for (let i = 0; i < digits; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    game.roomCode = makeID(4);

    // Create a room with the randomly generated code.
    // socket.emit("createRoom", {
    //   roomCode: game.roomCode,
    //   gameName: game.gameName,
    // });

    // Set your local variables.
    my.isRoomHost = true;
    game.currentlyInGame = true;
    round.phase = "pregame";
    let url = new URL(
      location.protocol + "//" + location.host + location.pathname,
    );
    url.searchParams.set("room", game.roomCode);
    window.history.pushState({}, "", url);
  };

  const joinRoom = () => {

    let url = new URL(
        location.protocol + "//" + location.host + location.pathname,
      );
      url.searchParams.set("room", game.roomCode);
      window.history.pushState({}, "", url);

    // Try to join a room with the entered code.
    socket.emit("joinRoom", {
      roomCode: game.roomCode,
      gameName: game.gameName,
    });

    socket.emit("askHostForPlayersList", {
      roomCode: game.roomCode,
      from: my.socketID,
    });

    game.currentlyInGame = true;
    round.phase = "pregame";
  };

  /////// BEFORE GAME (game hasn't started yet)
  const watchVideo = () => {
    ui.watchingVideo = true;
    if (game.currentlyInGame) {
      sendEvent("Invalid", "Instruction Video", "Pregame Screen");
    } else {
      sendEvent("Invalid", "Instruction Video", "Title Screen");
    }
    if (ui.musicPlaying) {
      musicLobby.volume(0);
    }
  };

  const stopWatchingVideo = () => {
    ui.watchingVideo = false;
    if (ui.musicPlaying) {
      if (ui.musicHushed) {
        musicLobby.volume(0.05);
      } else {
        musicLobby.volume(0.6);
      }
    }
  };

  const toggleMusicVolume = () => {
    ui.musicHushed = !ui.musicHushed;
    if (ui.musicHushed) {
      musicLobby.volume(0.05);
      musicFinalRound.volume(0.1);
    } else {
      musicLobby.volume(0.6);
      musicFinalRound.volume(0.75);
    }
  };

  const updatePlayer = () => {
    my.name = my.name.toUpperCase();
    ui.appliedForJob = true;
    //Is this a new player or a player update
    let newPlayer = true;

    const p = {
      name: my.name,
      employeeNumber: my.employeeNumber,
      socketID: my.socketID,
      isRoomHost: my.isRoomHost,
      role: null,
      score: 0,
      passwordAttempts: 0,
      passwordSuccess: false,
    };

    game.players.forEach(function (player, index) {
      if (player.employeeNumber == my.employeeNumber) {
        game.players[index] = p;
        newPlayer = false;
      }
    });

    // It's a new player, add that to the array.
    if (newPlayer) {
      game.players.push(p);
    }

    game.players.forEach(function (player, index) {
      if (player.employeeNumber == my.employeeNumber) {
        my.playerIndex = index;
      }
    });
    document.title = my.name + " | " + gameTitle;

    if (my.playerIndex < 0) {
      alert(
        "could not get a player index. this is a bug. this should not happen.",
      );
    }

    sendPlayerUpdate();

    if (!ui.musicPlaying) {
      musicLobby.play();
      ui.musicPlaying = true;
    }
  };

  const sendPlayerUpdate = () => {
    socket.emit("sendPlayerList", {
      roomCode: game.roomCode,
      from: my.socketID,
      players: game.players,
    });
  };

  const startTheGame = () => {
    // Assign the host as SysAdmin, all other players are employees
    game.players.forEach(function (player, index) {
      if (player.isRoomHost) {
        game.players[index].role = "SysAdmin";
      } else {
        game.players[index].role = "employee";
      }
    });

    if (game.players.length == 2) {
      game.maxRounds = 6;
    } else if (game.players.length == 3) {
      game.maxRounds = 6;
    } else if (game.players.length == 4) {
      game.maxRounds = 8;
    } else {
      game.maxRounds = game.players.length;
    }

    socket.emit("startTheGame", {
      roomCode: game.roomCode,
      gameName: game.gameName,
      players: game.players,
      maxRounds: game.maxRounds,
      sysAdminIndex: my.playerIndex,
      allowNaughty: game.allowNaughty,
    });

    sendEvent("Invalid", "Game Started", game.roomCode);
  };

  /////////// SysAdmin Methods
  const definePossibleChallenges = () => {
    round.possibleChallenges = [];

    let n = 0;

    // Create some possible challenges, based on some rulesets.
    while (n < settings.default.numberOfPossibleChallenges) {
      let randomChallenge = randomFrom(challenges);

      let appendThisChallenge = true;
      if (randomChallenge.naughty && !game.allowNaughty) {
        // This challenge is too naughty for this game, pick again.
        appendThisChallenge = false;
      } else if (round.possibleChallenges.length != []) {
        round.possibleChallenges.forEach(function (c) {
          if (c.id == randomChallenge.id) {
            // This challenge already exists in your list.
            appendThisChallenge = false;
          }
        });
      }

      if (appendThisChallenge) {
        round.possibleChallenges.push(randomChallenge);
        n++;
      }
    }
  };

  const chooseAChallenge = () => {
    challenges.forEach(function (c) {
      if (c.id == ui.challengeID) {
        round.challenge = c;
      }
    });
    findPossibleRightAnswers();
    findAverageSize();
    findAverageVowelCount();
    countLettersInEachWord();
    startAdminTimer();

    socket.emit("invalidUpdatePasswordChallenge", {
      roomCode: game.roomCode,
      challenge: round.challenge,
    });

    sendEvent("Invalid", "Challenge Selected", round.challenge.name);
  };

  const chooseRule = (rule) => {
    if (rule.name == "Flying Pig") {
      // Special process for summoning a flying pig.
      my.rulebux -= rule.cost;
      round.flyingPig.active = true;
      let r = {
        type: "Flying Pig",
        message: "Look at the flying pig.",
      };
      round.rules.push(r);
      // Inform the other players.
      socket.emit("invalidUpdatePasswordRules", {
        roomCode: game.roomCode,
        rules: round.rules,
        shibboleth: round.shibboleth,
        newRule: r,
      });
      socket.emit("invalidSummonThePig", {
        roomCode: game.roomCode,
      });
    } else if (rule.name == "Peek At Answers") {
      let shuffledAnswers = shuffle(round.challenge.possible);
      let answerHTML = "";
      let i = 0;
      while (i < 5) {
        answerHTML += "<li>" + shuffledAnswers[i] + "</li>";
        i++;
      }

      toast(
        {
          component: MyToast,
          props: {
            title: `5 Random ${round.challenge.name}`,
            message: `<ul>${answerHTML}</ul>`,
          },
        },
        {
          position: POSITION.TOP_RIGHT,
          type: "info",
          timeout: 50000,
        },
      );

      // Pay for it.
      my.rulebux = my.rulebux - rule.cost;

      let r = {
        type: "Peek At Answers",
        message: my.name + " peeked at the answers",
        inputValue: "",
        inputValueTwo: "",
      };
      round.rules.push(r);
      socket.emit("invalidUpdatePasswordRules", {
        roomCode: game.roomCode,
        rules: round.rules,
        shibboleth: round.shibboleth,
        newRule: r,
      });
    } else if (
      rule.name == "Set A Maximum" ||
      rule.name == "Set A Minimum" ||
      rule.name == "Limit Vowels"
    ) {
      // For situations where you DON'T have a second rule input.
      let r = {
        type: rule.name,
        message: "",
        inputValue: "",
        inputValueTwo: "",
      };

      if (rule.name == "Set A Maximum") {
        r.inputValue = round.averageSize + round.maxOffset;
        r.message = randomFrom(rulePhrasings.max);
      } else if (rule.name == "Set A Minimum") {
        r.inputValue = round.averageSize - round.minOffset;
        r.message = randomFrom(rulePhrasings.min);
      } else if (rule.name == "Limit Vowels") {
        r.inputValue = round.averageVowels + round.vowelOffset;
        r.message = randomFrom(rulePhrasings.vowels);
      }

      r.message = r.message.replace("[SIZE]", r.inputValue);
      r.message = r.message.replace("[SIZE+1]", r.inputValue + 1);
      r.message = r.message.replace("[SIZE-1]", r.inputValue - 1);

      // Pay for it.
      my.rulebux = my.rulebux - rule.cost;
      round.rules.push(r);
      // Recalculate Possible Right Answers.
      findPossibleRightAnswers();

      // Inform the other players.
      socket.emit("invalidUpdatePasswordRules", {
        roomCode: game.roomCode,
        rules: round.rules,
        shibboleth: round.shibboleth,
        newRule: r,
      });
    } else {
      ui.currentRule.name = rule.name;
      ui.currentRule.cost = rule.cost;
      ui.currentRule.editing = true;
    }
  };

  const isRuleButtonDisabled = (ruleName, ruleCost, ruleUnique) => {
    if (my.rulebux < ruleCost) {
      // Too expensive
      return true;
    } else if (ui.currentRule.editing) {
      // You're in edit mode.
      return true;
    } else if (
      ruleUnique &&
      round.rules.some((rule) => rule.type === ruleName)
    ) {
      // this is a unique rule and you've already used it.
      return true;
    } else {
      return false;
    }
  };

  const saveRule = (rule) => {
    let r = {
      type: "",
      message: "",
      inputValue: "",
      inputValueTwo: null,
    };
    if (rule.name == "Ban A Letter") {
      r.type = rule.name;
      r.inputValue = ui.currentRule.inputValue.toUpperCase();
      r.message = "You may not use the letter " + r.inputValue;
    } else if (rule.name == "Demand A Letter") {
      r.type = rule.name;
      r.inputValue = ui.currentRule.inputValue.toUpperCase();
      r.message = "You must use the letter " + r.inputValue;
    } else if (rule.name == "Shibboleth") {
      r.type = rule.name;
      r.inputValue = ui.currentRule.inputValue;
      r.message = "Before entering a password, you must type " + r.inputValue;
      round.shibboleth = r.inputValue;
    } else if (rule.name == "Set A Maximum") {
      r.type = rule.name;
      r.inputValue = round.averageSize + round.maxOffset;
      r.message = ui.currentRule.inputValue;
    } else if (rule.name == "Set A Minimum") {
      r.type = rule.name;
      r.inputValue = round.averageSize - round.minOffset;
      r.message = ui.currentRule.inputValue;
    } else if (rule.name == "Limit Vowels") {
      r.type = rule.name;
      r.inputValue = round.averageVowels + round.vowelOffset;
      r.message = ui.currentRule.inputValue;
    } else if (rule.name == "Ban A Combo") {
      r.type = rule.name;
      r.inputValue = ui.currentRule.inputValue.toUpperCase();
      r.inputValueTwo = ui.currentRule.inputValueTwo.toUpperCase();

      if (r.inputValue == r.inputValueTwo) {
        r.message = "You may only use the letter " + r.inputValue + " once";
      } else {
        r.message =
          "Your password cannot contain both " +
          r.inputValue +
          " and " +
          r.inputValueTwo +
          " (simultanously)";
      }
    }

    // Add it to the rule list.
    round.rules.push(r);
    // Recalculate Possible Right Answers.
    findPossibleRightAnswers();

    // if possibleRightAnswers is high enough, save the rule.
    if (round.possibleAnswerCount >= game.players.length) {
      // Pay for it.
      my.rulebux = my.rulebux - rule.cost;

      // Inform the other players.
      socket.emit("invalidUpdatePasswordRules", {
        roomCode: game.roomCode,
        rules: round.rules,
        shibboleth: round.shibboleth,
        newRule: r,
      });
    } else {
      toast(
        {
          component: MyToast,
          props: {
            title: `Error`,
            message: `Sorry, this rule would make the game impossible. Rule undone.`,
          },
        },
        {
          type: "error",
        },
      );
      round.rules.pop();
      findPossibleRightAnswers();
    }

    // Clear out current rule.
    clearCurrentRule();
  };

  const clearCurrentRule = () => {
    ui.currentRule.name = "";
    ui.currentRule.inputValue = "";
    ui.currentRule.inputValueTwo = "";
    ui.currentRule.cost = 0;
    ui.currentRule.editing = false;
  };

  const addBug = () => {
    ui.addBugErrors = [];
    const bug = ui.addBug.toUpperCase();
    let foundMatch = false;
    round.challenge.possible.forEach(function (p, index) {
      if (bug == p.toUpperCase()) {
        foundMatch = true;
      }
    });

    if (!foundMatch) {
      ui.addBugErrors.push(
        "Just so you know, " + bug + " wasn't a valid password",
      );
    }

    if (findInArray(round.bugs, bug)) {
      ui.addBugErrors.push("You already added " + bug + ".");
    }

    // Charge for adding the bug.
    if (round.bugs && round.bugs.length > 0) {
      my.rulebux -= 1;
    }

    ui.addBug = "";
    round.bugs.push(bug);

    socket.emit("invalidUpdateBugs", {
      roomCode: game.roomCode,
      bugs: round.bugs,
      challengeName: round.challenge.name,
      newBug: bug,
    });

    sendEvent("Invalid", "Add Bug", bug);
  };

  const onboardEmployees = () => {
    resetAdminTimer();

    socket.emit("invalidStartGuessing", {
      roomCode: game.roomCode,
      sysAdminIndex: my.playerIndex,
    });
  };

  /////////// Timers
  const startAdminTimer = () => {
    round.adminTimeLeft = defaults.adminTimeLeft;
    round.adminTimer = setInterval(() => {
      round.adminTimeLeft -= 0.05;
      if (round.adminTimeLeft <= 0) {
        onboardEmployees();
      }
    }, 50);
  };

  const resetAdminTimer = () => {
    clearInterval(round.adminTimer);
    round.adminTimer = undefined;
    round.adminTimeLeft = defaults.adminTimeLeft;
  };

  const roundStartTimer = () => {
    round.roundTimer = setInterval(() => {
      round.elapsedTime += 1;
      game.players[round.sysAdminIndex].score += 1;
      if (
        round.elapsedTime >=
          settings.timer.employeeMaxTime - settings.timer.hurryTime &&
        round.hurryTimer == undefined
      ) {
        startHurryTimer();
      }
    }, 1000);

    // Also, get the Flying Pig talking if he should be....

    if (round.flyingPig.active && my.role == "employee") {
      if (round.phase == "create password") {
        round.flyingPig.message = randomFrom(flyingPigLines.guessing);
      }
      round.flyingPig.timer = setInterval(() => {
        if (!round.flyingPig.active) {
          // if the pig isn't active, kill the pig.
          clearInterval(round.flyingPig.timer);
          round.flyingPig.timer = undefined;
        } else {
          // Otherwise, let's generate a new line for the pig.
          if (round.phase == "create password") {
            round.flyingPig.message = randomFrom(flyingPigLines.guessing);
            soundOink.play();
          }
        }
      }, 6501);
    }
  };

  const resetRoundTimer = () => {
    clearInterval(round.roundTimer);
    round.roundTimer = undefined;
    round.elapsedTime = 0;
  };

  const startHurryTimer = () => {
    round.hurryTimer = setInterval(() => {
      round.hurryTime -= 0.1;
      if (round.hurryTime <= 0) {
        endTheGuessingRound();
      }
    }, 100);
  };

  const resetHurryTimer = () => {
    clearInterval(round.hurryTimer);
    round.hurryTimer = undefined;
    round.hurryTime = defaults.hurryTime;
  };

  const startCountdownToFinalRound = () => {
    round.hurryTime = settings.timer.countdownToFinal;
    round.hurryTimer = setInterval(() => {
      round.hurryTime -= 1;
      if (round.hurryTime <= 0) {
        ui.enterFinalPasswords = true;
        clearInterval(round.hurryTimer);
        round.hurryTimer = undefined;
        startFinalRoundCounter();
      }
    }, 1000);
    musicFinalRound.play();
  };

  const startFinalRoundCounter = () => {
    round.finalTimeLeft = settings.timer.finalRound;
    round.roundTimer = setInterval(() => {
      round.finalTimeLeft -= 1;
      if (round.finalTimeLeft <= 0) {
        setGameOver();
      }
    }, 1001);
  };

  const summonTheFlyingPig = () => {
    round.flyingPig.active = true;
    if (my.role == "employee") {
      round.flyingPig.message = randomFrom(flyingPigLines.intro);
    }
  };

  const killThePig = () => {
    round.flyingPig.active = false;
    clearInterval(round.flyingPig.timer);
    round.flyingPig.timer = undefined;
  };

  const endTheGuessingRound = () => {
    resetRoundTimer();
    resetHurryTimer();
    // BUG: Figure out why this fires for each player, and try to make it only fire once.
    socket.emit("invalidRoundOver", {
      from: my.socketID,
      roomCode: game.roomCode,
    });
  };

  const tryToFailThis = (attempt) => {
    attempt = attempt.toUpperCase();
    let attemptFailed = false;
    let attemptFailedReasons = [];

    round.rules.forEach(function (r) {
      if (r.type == "Ban A Letter") {
        if (attempt.includes(r.inputValue)) {
          attemptFailed = true;
          attemptFailedReasons.push("Password cannot contain " + r.inputValue);
        }
      }
      if (r.type == "Demand A Letter") {
        if (!attempt.includes(r.inputValue)) {
          attemptFailed = true;
          attemptFailedReasons.push("Password must contain " + r.inputValue);
        }
      }
      if (r.type == "Set A Maximum") {
        if (attempt.length > r.inputValue) {
          attemptFailed = true;
          attemptFailedReasons.push("Password is too long");
        }
      }
      if (r.type == "Set A Minimum") {
        if (attempt.length < r.inputValue) {
          attemptFailed = true;
          attemptFailedReasons.push("Password is too short");
        }
      }
      if (r.type == "Limit Vowels") {
        // BUG - this line doesn't work.
        if (countVowels(attempt) > r.inputValue) {
          attemptFailed = true;
          attemptFailedReasons.push("Password has too many vowels");
        }
      }
      if (r.type == "Ban A Combo") {
        if (r.inputValue == r.inputValueTwo) {
          if (attempt.replace(/[^a]/g, "").length > 1) {
            attemptFailed = true;
            attemptFailedReasons.push(
              "Password can only contain one " + r.inputValue,
            );
          }
        } else if (r.inputValue != r.inputValueTwo) {
          if (
            attempt.includes(r.inputValue) &&
            attempt.includes(r.inputValueTwo)
          ) {
            attemptFailed = true;
            attemptFailedReasons.push(
              "Password cannot contain both the letters " +
                r.inputValue +
                " and " +
                r.inputValueTwo,
            );
          }
        }
      }
    });

    if (!attemptFailed) {
      return false;
    } else {
      return {
        failed: true,
        reasons: attemptFailedReasons,
      };
    }
  };

  const tryToCrashWith = (attempt) => {
    let systemCrashed = false;

    round.bugs.forEach(function (bug) {
      if (bug == attempt) {
        systemCrashed = true;
      }
    });
    return systemCrashed;
  };

  const tryToFindDuplicatePassword = (attempt) => {
    attempt = attempt.toUpperCase();

    let foundDupe = false;
    round.claimedPasswords.forEach(function (claimedPW) {
      if (
        attempt.replace(/[^0-9a-z]/gi, "") ==
        claimedPW.toUpperCase().replace(/[^0-9a-z]/gi, "")
      ) {
        foundDupe = true;
      }
    });
    return foundDupe;
  };

  const tryToFind = (attempt) => {
    attempt = attempt.toUpperCase();

    let foundOne = false;
    round.challenge.possible.forEach(function (possibility) {
      if (
        attempt.replace(/[^0-9a-z]/gi, "") ==
        possibility.toUpperCase().replace(/[^0-9a-z]/gi, "")
      ) {
        foundOne = true;
      }
    });
    return foundOne;
  };

  const tryThisPassword = (attempt) => {
    attempt = attempt.toUpperCase();
    ui.passwordAttemptErrors = [];

    const crashCheck = tryToCrashWith(attempt);
    const failCheck = tryToFailThis(attempt);
    const duplicateCheck = tryToFindDuplicatePassword(attempt);
    const matchCheck = tryToFind(attempt);

    let correctAnswer = false;

    if (failCheck) {
      ui.passwordAttemptErrors = failCheck.reasons;
      ui.passwordInputError = true;
    }
    if (duplicateCheck) {
      ui.passwordAttemptErrors.push(
        "Someone else has already used " + attempt + " as a password.",
      );
      ui.passwordInputError = true;
    }

    if (!matchCheck) {
      let errorMessage = round.challenge.failedMessage.replace(
        "[PASS]",
        attempt,
      );
      ui.passwordInputError = true;
      ui.passwordAttemptErrors.push(errorMessage);
    }

    if (matchCheck && !failCheck && !crashCheck && !duplicateCheck) {
      correctAnswer = true;
    }

    // Deal with the results of the attempt.
    my.passwordAttempts++;
    ui.passwordAttempt = "";
    ui.shibboleth = "";

    if (crashCheck) {
      socket.emit("invalidCrashedServer", {
        roomCode: game.roomCode,
        playerIndex: my.playerIndex,
        pwAttempt: attempt,
        attemptCount: my.passwordAttempts,
        result: "crash",
        challengeName: round.challenge.name,
      });
      my.crashesCaused += 1;

      sendEvent("Invalid", "Server Crashed", attempt);
    } else if (correctAnswer) {
      soundCorrectGuess.play();
      passwordSuccess(attempt);
    } else {
      soundBadGuess.play();
      socket.emit("invalidTriedPassword", {
        roomCode: game.roomCode,
        playerIndex: my.playerIndex,
        pwAttempt: attempt,
        attemptCount: my.passwordAttempts,
        result: "failed",
      });
    }
  };

  const findPossibleRightAnswers = () => {
    let possibleAnswerCount = 0;
    round.challenge.possible.forEach(function (possibility) {
      if (tryToFailThis(possibility) == false) {
        possibleAnswerCount++;
      }
    });

    round.possibleAnswerCount = possibleAnswerCount;
  };

  const findAverageSize = () => {
    const possibilities = round.challenge.possible;

    var total = 0;
    for (var i = 0; i < possibilities.length; i++) {
      total += possibilities[i].length;
    }
    var avg = total / possibilities.length;

    round.averageSize = Math.round(avg);
  };

  const findAverageVowelCount = () => {
    const possibilities = round.challenge.possible;

    var total = 0;
    for (var i = 0; i < possibilities.length; i++) {
      // Search text with Regex and store all matching instances
      let matchingInstances = possibilities[i].match(/[aeiou]/gi);
      if (matchingInstances) {
        total += matchingInstances.length;
      }
    }
    var avg = total / possibilities.length;

    round.averageVowels = Math.round(avg);
    //round.averageVowels = avg.toFixed(1);
  };

  const countLettersInEachWord = () => {
    const allLetters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const possibilities = round.challenge.possible;
    let letter = "";
    let count = 0;
    let letterReport = [];

    // For every letter in the alphabet...
    allLetters.forEach(function (l, lIndex) {
      letter = l;
      count = 0;

      // Add +1 if the possibility contains that letter.
      possibilities.forEach(function (p, pIndex) {
        if (p.toUpperCase().includes(l)) {
          count++;
        }
      });

      // And then add it to a report.
      let r = {
        letter: l,
        count: count,
      };
      letterReport.push(r);
    });

    round.letterCounts = letterReport;
    round.demandableLetters = [];

    round.letterCounts.forEach(function (letter) {
      if (letter.count >= game.players.length + 2) {
        round.demandableLetters.push(letter.letter);
      }
    });
  };

  const passwordSuccess = (attempt) => {
    // YOU GOT IT!
    // Let's give you some points
    my.score += settings.points.forGoodPassword;

    if (round.claimedPasswords.length < 1 && game.players.length > 2) {
      my.score += settings.points.forFirstPassword;
    }

    // Let's change the UI to reflect you having won.
    ui.passwordSucceeded = true;

    socket.emit("invalidPasswordSuccess", {
      roomCode: game.roomCode,
      playerIndex: my.playerIndex,
      pwAttempt: attempt,
      attemptCount: my.passwordAttempts,
      playerScore: my.score,
      challengeName: round.challenge.name,
      result: "success",
    });

    if (round.flyingPig.active) {
      round.flyingPig.message = randomFrom(flyingPigLines.afterCorrect);
      clearInterval(round.flyingPig.timer);
      round.flyingPig.timer = undefined;
      soundOink.play();
    }
  };

  const startNextRoundClicked = () => {
    var summary = {
      challenge: round.challenge.name,
      sysAdmin: my.name,
      rules: round.rules,
      bugs: round.bugs,
      attempts: round.attempts,
      listSource: round.challenge.source,
      possibleAnswers: round.possibleAnswerCount,
    };

    socket.emit("invalidStartNewRound", {
      roomCode: game.roomCode,
      playerIndex: my.playerIndex,
      players: game.players,
      summary: summary,
    });
  };

  const onPaste = (evt) => {
    console.log("on paste", evt);
    evt.preventDefault();

    my.score -= 10;
    game.players[my.playerIndex].score -= 10;

    toast(
      {
        component: MyToast,
        props: {
          title: `Pasting is disabled`,
          message: `<p>BigCorp prevents any employee from pasting in passwords, for... uhhhhh... security reasons.</p><p>You have been docked 10 points for breaking this perfectly reasonable rule.</p>`,
        },
      },
      {
        position: POSITION.BOTTOM_RIGHT,
        type: "error",
        timeout: 8000,
        icon: false,
      },
    );

    return false;
  };

  const tryToCrackWith = (attempt) => {
    attempt = attempt.toUpperCase();
    document.getElementById("PasswordAttempt").focus();

    ui.passwordAttempt = "";
    ui.passwordSuccessMessage = "";
    ui.passwordAttemptErrors = [];
    let pwMatch = false;
    let pwMatchErrorMessage = null;
    let pwPlayerIndex = -1;
    let passwordClaimed = false;
    let matchIndex = -1;

    game.allEmployeePasswords.forEach(function (p, i) {
      if (
        p.pw.replace(/[^0-9a-z]/gi, "") == attempt.replace(/[^0-9a-z]/gi, "")
      ) {
        pwMatch = true;
        if (p.name == my.name || p.playerIndex == my.playerIndex) {
          soundYouIdiot.play();
          pwMatchErrorMessage =
            "You just hacked into your own account. Did you mean to do that?";
          game.players[my.playerIndex].score +=
            settings.points.forCrackingOwnPassword;
          game.allEmployeePasswords[i].claimed = my.name;
          socket.emit("invalidPasswordCracked", {
            roomCode: game.roomCode,
            players: game.players,
            allEmployeePasswords: game.allEmployeePasswords,
            crackSummary: {
              pw: attempt,
              attackerIndex: my.playerIndex,
              victimIndex: my.playerIndex,
            },
          });
          // sendEvent("Invalid", "Self-pwn", attempt);
        } else if (p.claimed) {
          soundTooSlow.play();
          passwordClaimed = true;
          pwMatchErrorMessage =
            "This password was already cracked by " + p.claimed;
        } else {
          pwPlayerIndex = p.playerIndex;
          matchIndex = i;
        }
      }
    });

    if (pwMatchErrorMessage) {
      ui.passwordAttemptErrors.push(pwMatchErrorMessage);
    } else if (!pwMatch) {
      soundNo.play();
      ui.passwordAttemptErrors.push(
        "There is no employee with the password " + attempt,
      );
    } else if (pwMatch && pwPlayerIndex != -1) {
      soundCracked.play();
      ui.passwordSuccessMessage =
        "The password " +
        attempt +
        " belongs to " +
        game.players[pwPlayerIndex].name;
      game.players[my.playerIndex].score += settings.points.forCrackingPassword;
      game.players[pwPlayerIndex].score +=
        settings.points.forHavingPasswordCracked;

      game.allEmployeePasswords[matchIndex].claimed = my.name;

      socket.emit("invalidPasswordCracked", {
        roomCode: game.roomCode,
        players: game.players,
        allEmployeePasswords: game.allEmployeePasswords,
        crackSummary: {
          pw: attempt,
          attackerIndex: my.playerIndex,
          victimIndex: pwPlayerIndex,
        },
      });
      sendEvent("Invalid", "Password Cracked", attempt);

      if (computedUnclaimedPasswords < 1) {
        setGameOver();
      }
    }
    document.getElementById("PasswordAttempt").focus();
  };

  const setGameOver = () => {
    musicFinalRound.stop();
    soundFinalRoundOver.play();
    clearInterval(round.roundTimer);
    round.roundTimer = undefined;
    round.phase = "GAME OVER";
    socket.emit("gameOver", {
      roomCode: game.roomCode,
      gameName: game.gameName,
      playerIndex: my.playerIndex,
      passwordAttempts: my.passwordAttempts,
    });
  };

  const usedRuleNames = () => {
    let u = [];
    round.rules.forEach(function (r) {
      u.push(r.type);
    });
    return u;
  };

  // const uncrackedPasswords = () => {

  //   // Go through all of game.allEmployeePasswords
  //   // Filter to only those where claimed doesn't have a string attached.
  //   // return both the array of uncracked passwords as well as a count of how many there are.

  //   return {
  //     array,
  //     count
  //   }

  // };

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Computeds

  const computedSysAdminName = computed(() => {
    if (game.players && game.players.length > 0 && round.sysAdminIndex > -1) {
      return game.players[round.sysAdminIndex].name;
    } else {
      return null;
    }
  });
  const computedSysAdminIndex = computed(() => {
    return round.sysAdminIndex;
  });

  //I've probably deprecated this one.
  const computedUsedRuleNames = computed(() => {
    let u = [];
    round.rules.forEach(function (r) {
      u.push(r.type);
    });
    return u;
  });
  const computedShibbolethRequired = computed(() => {
    if (
      round.shibboleth &&
      ui.shibboleth.toUpperCase() != round.shibboleth.toUpperCase()
    ) {
      return true;
    } else {
      return false;
    }
  });
  const computedUnclaimedPasswords = computed(() => {
    if (game.allEmployeePasswords.length < 1) {
      return 0;
    } else {
      let n = 0;
      game.allEmployeePasswords.forEach(function (p) {
        if (!p.claimed) {
          n++;
        }
      });
      return n;
    }
  });
  const computedUncrackedPasswords = computed(() => {
    if (!game || !Array.isArray(game.allEmployeePasswords)) {
      return {
        array: [],
        count: 0,
      };
    }

    const uncracked = game.allEmployeePasswords.filter(
      (password) => !password.claimed,
    );
    const count = uncracked.length;

    return {
      array: uncracked,
      count: count,
    };
  });
  const computedPlayersByScore = computed(() => {
    const computedPlayers = [...game.players];

    function compare(a, b) {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    }

    return computedPlayers.sort(compare);
  });
  const computedCheevos = computed(() => {
    // TODO: This entire setup sucks balls.
    // Come up with a better way to hand out cheevos.
    let playerTrophyStats = [];
    game.players.forEach((player) =>
      playerTrophyStats.push({
        name: player.name,
        cracks: 0,
        cracked: 0,
        selfPwn: 0,
        passwordsCreated: 0,
        crashesCaused: 0,
        passwordAttempts: 0,
      }),
    );

    // Let's count the cracks/cracked/selfPwn numbers....
    game.crackSummary.forEach((crack, cIndex) => {
      playerTrophyStats[crack.attackerIndex].cracks += 1;
      playerTrophyStats[crack.victimIndex].cracked += 1;
      if (crack.attackerIndex == crack.victimIndex) {
        playerTrophyStats[crack.attackerIndex].selfPwn += 1;
      }
    });

    // Let's count the passwords created...
    game.allEmployeePasswords.forEach((pw, pwIndex) => {
      playerTrophyStats[pw.playerIndex].passwordsCreated += 1;
    });

    // Let's count the crashes
    game.crashSummary.forEach((crash, crashIndex) => {
      playerTrophyStats[crash.playerIndex].crashesCaused += 1;
    });

    // Let's count the password attempts
    game.players.forEach((player, playerIndex) => {
      playerTrophyStats[playerIndex].passwordAttempts = player.passwordAttempts;
    });

    //Find the best cracker.
    let bestCrackersList = [...playerTrophyStats].sort((a, b) =>
      a.cracks <= b.cracks ? 1 : -1,
    );
    let bestCracker = null;
    if (bestCrackersList && bestCrackersList[0].cracks > 0) {
      bestCracker = bestCrackersList[0];
      if (bestCrackersList[0].cracks == bestCrackersList[1].cracks) {
        bestCracker.name = "TIE";
      }
    }

    //Find the most cracked.
    let mostCrackedList = [...playerTrophyStats].sort((a, b) =>
      a.cracked <= b.cracked ? 1 : -1,
    );
    let mostCracked = null;
    if (mostCrackedList && mostCrackedList[0].cracked > 0) {
      mostCracked = mostCrackedList[0];
      if (mostCrackedList[0].cracked == mostCrackedList[1].cracked) {
        mostCracked.name = "TIE";
      }
    }

    //Find the most selfpwned.
    let mostSelfPwnsList = [...playerTrophyStats].sort((a, b) =>
      a.selfPwn <= b.selfPwn ? 1 : -1,
    );
    let mostSelfPwns = null;
    if (mostSelfPwnsList && mostSelfPwnsList[0].selfPwn > 0) {
      mostSelfPwns = mostSelfPwnsList[0];
      if (mostSelfPwnsList[0].selfPwn == mostSelfPwnsList[1].selfPwn) {
        mostSelfPwns.name = "TIE";
      }
    }

    //Find the most crashhappy.
    let mostCrashesList = [...playerTrophyStats].sort((a, b) =>
      a.crashesCaused <= b.crashesCaused ? 1 : -1,
    );
    let mostCrashes = null;
    if (mostCrashesList && mostCrashesList[0].crashesCaused > 0) {
      mostCrashes = mostCrashesList[0];
      if (
        mostCrashesList[0].crashesCaused == mostCrashesList[1].crashesCaused
      ) {
        mostCrashes.name = "TIE";
      }
    }

    //Find the player with the most successful passwords
    let mostPasswordsList = [...playerTrophyStats].sort((a, b) =>
      a.passwordsCreated <= b.passwordsCreated ? 1 : -1,
    );
    let mostPasswords = null;
    if (mostPasswordsList && mostPasswordsList[0].passwordsCreated > 0) {
      mostPasswords = mostPasswordsList[0];
      if (
        mostPasswordsList[0].passwordsCreated ==
        mostPasswordsList[1].passwordsCreated
      ) {
        mostPasswords.name = "TIE";
      }
    }

    //Find the player with the most password attempts
    let mostAttemptsList = [...playerTrophyStats].sort((a, b) =>
      a.passwordAttempts <= b.passwordAttempts ? 1 : -1,
    );
    let mostAttempts = null;
    if (mostAttemptsList && mostAttemptsList[0].passwordAttempts > 0) {
      mostAttempts = mostAttemptsList[0];
      if (
        mostAttemptsList[0].passwordAttempts ==
        mostAttemptsList[1].passwordAttempts
      ) {
        mostAttempts.name = "TIE";
      }
    }

    return {
      trophyStats: playerTrophyStats,
      bestCracker: bestCracker,
      mostCracked: mostCracked,
      mostSelfPwns: mostSelfPwns,
      mostCrashes: mostCrashes,
      mostPasswords: mostPasswords,
      mostAttempts: mostAttempts,
    };
  });

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Sockets  (I can't easily move these into a file without annoying refactor)

  socket.on("startTheGame", function (msg) {
    musicLobby.stop();
    ui.musicPlaying = false;

    game.players = msg.players;
    my.role = msg.players[my.playerIndex].role;
    round.phase = "choose rules";
    game.gameStarted = true;
    round.number = 1;
    game.maxRounds = msg.maxRounds;
    round.sysAdminIndex = msg.sysAdminIndex;
    game.allowNaughty = msg.allowNaughty;
    if (my.role == "SysAdmin") {
      definePossibleChallenges();
      document.title = my.role + " | " + gameTitle;
    } else {
      document.title = my.name + " | " + gameTitle;
    }
  });

  // Inform the player of their own socketID
  socket.on("hostSelected", (hostSocketId) => {
    console.log(`Host selected: ${hostSocketId}`);
    if (socket.id === hostSocketId) {
      my.isRoomHost = true;
      console.log("You are the host!");
    } else {
      my.isRoomHost = false;
      console.log("You are not the host.");
    }
  });

  socket.on("receivePlayerList", (msg) => {
    console.log(`Receiving new player list from  ${msg.from}`);
    game.players = msg.players;
  });

  socket.on("sendThePlayerListIfYouAreHost", (msg) => {
    if (my.isRoomHost && msg.from != my.socketID) {
      console.log(`Player List request from ${msg.from}`);
      socket.emit("sendPlayerList", {
        roomCode: game.roomCode,
        from: my.socketID,
        players: game.players,
        isGameStarted: game.gameStarted,
      });
    }
  });

  // A client disconnected!
  // Let's try to deal with it.
  socket.on("clientDisconnect", function (msg) {
    console.warn("The socket " + msg + " disconnected.");

    // TODO: See if that socketID is in your game. Remove them if so.
    if (!game.gameStarted) {
      game.players.forEach(function (p, index) {
        if (p.socketID == msg) {
          game.players.splice(index, 1);
        }
      });
    }
  });

  ////////////////////////////////////////////////////////////////
  // Everything below this line should ONLY be messages to the room.

  socket.on("requestPlayers", function (msg) {
    console.log("The client wants players from me!");
    if (my.isRoomHost) {
      socket.emit("updatePlayers", {
        roomCode: game.roomCode,
        players: game.players,
        gameStarted: game.gameStarted,
      });
      console.log(
        "I'm the host! I gave the room all the players I know about!",
      );
    }
  });

  // Someone updated a player (this should have been the game host)
  socket.on("updatePlayers", function (msg) {
    console.log("THE PLAYERS HAVE BEEN UPDATED!!!!!!!!");
    game.players = msg.players;
    game.gameStarted = msg.gameStarted;

    // NOTE: This bit may be unnecessary, but confirms & updates your own playerIndex every time the players get updated.
    game.players.forEach(function (p, index) {
      if (p.employeeNumber == my.employeeNumber) {
        my.playerIndex = index;
      }
    });
  });

  // The SysAdmin has picked a password challenge.
  socket.on("invalidUpdatePasswordChallenge", function (msg) {
    console.log(
      "I (an employee) have been informed of the password challenge.",
    );
    round.challenge = msg.challenge;
    round.shibboleth = "";
    soundNewRule.play();
  });

  // The SysAdmin has set a new rule.
  socket.on("invalidUpdatePasswordRules", function (msg) {
    console.log("I (an employee) am being updated on the password rules.");
    round.rules = msg.rules;
    round.shibboleth = msg.shibboleth;
    soundNewRule.play();
  });

  // The Flying Pig has been summoned!
  socket.on("invalidSummonThePig", function () {
    console.log("Look everybody! It's a flying pig!");
    summonTheFlyingPig();
  });

  // The SysAdmin has a new bug!
  socket.on("invalidUpdateBugs", function (msg) {
    console.log("I (an employee) am being updated on the round bugs.");
    round.bugs = msg.bugs;
    soundNewRule.play();
  });

  // The guessing has begun!
  socket.on("invalidStartGuessing", function (msg) {
    console.log("The guessing has begun!");
    round.phase = "create password";
    round.sysAdminIndex = msg.sysAdminIndex;
    roundStartTimer();
    soundinvalidStartGuessing.play();
  });

  // Some player (other than me) tried a password (and failed)
  socket.on("invalidTriedPassword", function (msg) {
    console.log("Someone else had a bad password.");
    round.attempts.push(msg);
    game.players[round.sysAdminIndex].score +=
      settings.points.forFailedPassword;
    if (my.role == "SysAdmin") {
      my.score += settings.points.forFailedPassword;
    }
  });

  // Some player (possibly me, but maybe not) caused a server crash!
  socket.on("invalidCrashedServer", function (msg) {
    console.log("The server crashed! It may or may not be because of me!");

    let i = msg.playerIndex;
    round.phase = "crashed";
    round.crash.active = true;
    round.crash.player = game.players[i];
    round.crash.word = msg.pwAttempt;
    round.attempts.push(msg);

    game.crashSummary.push({
      playerIndex: msg.playerIndex,
      sysAdminIndex: round.sysAdminIndex,
      word: msg.pwAttempt,
    });

    soundSystemCrash.play();
    game.players[round.sysAdminIndex].score += settings.points.forServerCrash;
    if (my.role == "SysAdmin") {
      my.score += settings.points.forServerCrash;
    }
    endTheGuessingRound();
    killThePig();
  });

  // Some player (other than me) successfully guessed a password.
  socket.on("invalidPasswordSuccess", function (msg) {
    console.log("Someone else had a successful password.");

    // Award points and mark pw as claimed.
    let i = msg.playerIndex;
    game.players[i].score = msg.playerScore;
    game.players[i].passwordSuccess = true;
    round.claimedPasswords.push(msg.pwAttempt);
    game.allEmployeePasswords.push({
      pw: msg.pwAttempt,
      name: game.players[i].name,
      playerIndex: i,
      claimed: false,
    });
    round.attempts.push(msg);

    // If the Hurry Up timer hasn't already started, start it now.
    if (round.hurryTimer == undefined) {
      startHurryTimer();
    }

    // Let's check to see if all employees have succeeded.
    if (round.claimedPasswords.length >= game.players.length - 1) {
      // Yup! Let's end the round.
      endTheGuessingRound();
    }
  });

  // Some player (could be anyone) announced the round was over.
  socket.on("invalidRoundOver", function () {
    console.log("The round is over.");
    ui.roundOver = true;
    ui.passwordSucceeded = false;
    ui.passwordAttemptErrors = [];
    ui.shibboleth = "";
    resetHurryTimer();
    resetRoundTimer();
    killThePig();
  });

  // The SysAdmin (which might be me) started a new round.
  socket.on("invalidStartNewRound", function (msg) {
    console.log("new round started.");

    msg.players.forEach(function (p, index) {
      p.passwordSuccess = false;
      if (p.employeeNumber == game.players[index].employeeNumber) {
        game.players[index].score = p.score;
      }
    });

    game.players = msg.players;
    game.roundSummary.push(msg.summary);

    // Hey, what round is it? Is it time for the final round?
    if (round.number >= game.maxRounds) {
      // Yep, Time for the final round.

      // First, reset the UI and the round variables.
      resetUI();
      resetRoundVariables();

      // Then do FINAL ROUND stuff.
      round.phase = "FINAL ROUND";
      startCountdownToFinalRound();
      document.title = "FINAL ROUND | " + gameTitle;
    } else {
      // Nope, let's do another round.
      round.phase = "choose rules";
      round.number += 1;

      // Who's the SysAdmin?
      // Let's make the next player the SysAdmin.
      // Unless there is no next player, in which case let's start over at 0.
      let i = round.sysAdminIndex + 1;
      if (i >= game.players.length) {
        round.sysAdminIndex = 0;
      } else {
        round.sysAdminIndex = i;
      }

      // Okay, now define roles for everyone.
      game.players.forEach(function (p) {
        p.role = "employee";
      });
      game.players[round.sysAdminIndex].role = "SysAdmin";
      my.role = game.players[my.playerIndex].role;

      // Reset the UI and the round variables.
      resetUI();
      resetRoundVariables();

      // If you're the SysAdmin, set up some challenges for you to choose from.
      if (my.role == "SysAdmin") {
        my.rulebux = settings.default.rulebux;
        definePossibleChallenges();
        document.title = my.role + " | " + gameTitle;
      } else {
        document.title = my.name + " | " + gameTitle;
      }
    }
  });

  // A player (other than me) cracked a password (in the final round.)
  socket.on("invalidPasswordCracked", function (msg) {
    game.players = msg.players;
    game.allEmployeePasswords = msg.allEmployeePasswords;
    game.crackSummary.push(msg.crackSummary);
  });

  // Some player (could be anyone) said the game is over.
  socket.on("gameOver", function (msg) {
    // TODO: Try to get this to only fire once per game. Similar to the nextRound bug.
    console.log("GAME OVER ⚰️");
    //setGameOver();
    game.players[msg.playerIndex].passwordAttempts = msg.passwordAttempts;
    if (my.isRoomHost) {
      sendEvent("Invalid", "Game Over", game.roomCode);
    }
    document.title = "GAME OVER" + " | " + gameTitle;
  });

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Directives

  // Define the v-focus directive
  const vFocus = {
    mounted(el) {
      el.focus();
    },
  };
  // Define the  directive
  // const vToUppercase = {
  //   mounted(el) {
  //     el.addEventListener("input", () => {
  //       if (el.value) {
  //         el.value = el.value.toUpperCase();
  //       }
  //     });
  //   },
  // };

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Mounted

  onMounted(() => {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("create")) {
      createRoom();
    } else if (urlParams.has("room")) {
      game.roomCode = urlParams.get("room").toUpperCase();
      socket.on("connect", () => {
        console.log(`Connected with socketId: ${socket.id}`);
        my.socketID = socket.id;
        joinRoom();
      });
    } else if (urlParams.has("join")) {
      document.getElementById("EnterRoomCode").focus();
    }
    if (urlParams.has("ref")) {
      sendEvent("Invalid", "Ref", urlParams.get("ref"));
    }
    // Initialize socket event handlers

    const instance = getCurrentInstance();
    if (instance) {
      instance.appContext.app.directive("focus", vFocus);
      // instance.appContext.app.directive("touppercase", vToUppercase);
    }

    // setupSocketHandlers(socket);
  });
</script>
<template lang="pug" src="./Invalid.pug"></template>
<style lang="scss" src="./Invalid.scss"></style>
