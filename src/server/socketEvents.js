import {
  addOneInDatabase,
  incrementDatabase,
  decrementDatabase,
  incrementDatabaseWithChallenge,
  addPlayerName,
  dateStampInDatabase,
  newCameoPlayerScore,
  valuateCameo,
  updateCameoStats,
  logCheevoEarned,
  logSisyphusItemPurchase,
  logGuillotineHeadRemoval,
  newGuillotinePlayerScore,
  pretendGuessCelebrity,
} from "./databaseFunctions.js";

export const socketEvents = (io, socket) => {
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  // General Socket Crap
  // console.log("⚡⚡⚡⚡⚡\nsocket.io - connection");

  console.table([
    {
      server: "socket.io",
      action: "connection",
      id: socket.id,
    },
  ]);

  socket.on("disconnect", () => {
    console.table([
      {
        server: "socket.io",
        action: "disconnection",
        id: socket.id,
      },
    ]);
    io.emit("handleDisconnectIfYouAreHost", socket.id);
  });

  socket.on("createRoom", (msg) => {
    console.log(msg.roomCode + " - created a room for " + msg.gameName);
    socket.join(msg.roomCode);
    console.log(msg.roomCode + " - join by creator");
    if (msg.gameName == "invalid") {
      addOneInDatabase("invalidGames", "RoomsCreated");
    } else if (msg.gameName == "wrongest") {
      addOneInDatabase("wrongestGames", "RoomsCreated");
    }
  });

  socket.on("joinRoom", (msg) => {
    console.log(msg.roomCode + " - guest joined");
    socket.join(msg.roomCode);

    console.log(`Socket ${socket.id} joined room ${msg.roomCode}`);

    // Get all sockets in the room
    const clients = io.sockets.adapter.rooms.get(msg.roomCode);

    if (clients) {
      // Convert Set to array and get the first client
      const clientArray = Array.from(clients);
      const hostSocketId = clientArray[0];

      // Notify the entire room of the host's socketId
      io.to(msg.roomCode).emit("hostSelected", hostSocketId);
    }
  });

  ///////////////////////////////////////////////////

  ///////////////////////////////////////////////////
  // Comparatively Famous
  socket.on("cameoStartGame", (msg) => {
    dateStampInDatabase("allGamesLastPlayed", msg.gameName);
    addOneInDatabase("cameoGames", "GamesStarted");
    console.table([{ game: `COMPARATIVELY FAMOUS`, action: `Game Started` }]);
  });

  socket.on("cameoSpecialGame", (msg) => {
    addOneInDatabase("cameoGames", "SpecialGamesStarted");
    incrementDatabase("cameoSpecialGames", msg.gimmickName);
    console.table([
      {
        game: `COMPARATIVELY FAMOUS`,
        action: `Special Game`,
        specialGame: msg.gimmickName,
      },
    ]);
  });

  socket.on("cameoValuationMade", (msg) => {
    var cameoName = msg.celeb.name;
    var actualValue = msg.celeb.value;
    var playerValue = msg.valueGuessed;
    valuateCameo(cameoName, actualValue, playerValue);
    console.table([
      {
        game: `COMPARATIVELY FAMOUS`,
        action: `Valuation`,
        person: cameoName,
        actualValue: actualValue,
        playerValue: playerValue,
      },
    ]);
  });

  socket.on("cameoFinishGame", (msg) => {
    console.log("a player finished a game of COMPARATIVELY FAMOUS");

    addOneInDatabase("cameoGames", "GamesFinished");
    newCameoPlayerScore(
      msg.playerScore,
      msg.correctSorts,
      msg.averageValuationOffset,
      msg.birthdayWishes.length,
      msg.exceededBudget,
    );

    msg.cameoHistory.forEach((cameo, index) => {
      if (cameo.correct) {
        updateCameoStats(cameo.name, 1, 0);
      } else {
        updateCameoStats(cameo.name, -1, 0);
      }
    });

    msg.birthdayWishes.forEach((cameo, index) => {
      updateCameoStats(cameo.name, 0, 1);
    });

    console.table(msg.birthdayWishes);
  });

  ///////////////////////////////////////////////////
  // Sisyphus Socket Actions
  socket.on("sisyphusMounted", (msg) => {
    console.table([{ game: `SISYPHUS CLICKER`, action: `Game Started` }]);
  });

  socket.on("sisyphusFirstClick", (msg) => {
    dateStampInDatabase("allGamesLastPlayed", msg.gameName);
    incrementDatabase("sisyphusCounts", "First Click");
    console.table([{ game: `SISYPHUS CLICKER`, action: `First Click` }]);
  });

  socket.on("sisyphusRollback", (msg) => {
    incrementDatabase("sisyphusCounts", "Rock Rolled Downhill");
    console.table([
      { game: `SISYPHUS CLICKER`, action: `Rock Rolled Downhill` },
    ]);
  });

  socket.on("sisyphusEarnedCheevo", (msg) => {
    logCheevoEarned(msg.title, msg.text, msg.points);
    console.table([
      {
        game: `SISYPHUS CLICKER`,
        action: `Cheevo Earned`,
        points: msg.points,
        title: msg.title,
      },
    ]);
  });

  socket.on("sisyphusBoughtItem", (msg) => {
    logSisyphusItemPurchase(msg.name, msg.desc, msg.price);
    console.table([
      {
        game: `SISYPHUS CLICKER`,
        action: `Purchase`,
        price: msg.price,
        name: msg.name,
      },
    ]);
  });

  ///////////////////////////////////////////////////

  ///////////////////////////////////////////////////
  // No More Billionaires Socket Actions
  socket.on("guillotineStartGame", (msg) => {
    dateStampInDatabase("allGamesLastPlayed", "guillotine");
    incrementDatabase("guillotineCounts", "gamesStarted");
    console.table([{ game: `NO MORE BILLIONAIRES`, action: `Game Started` }]);
  });

  socket.on("guillotineShareScore", (msg) => {
    incrementDatabase("guillotineCounts", "scoresShared");
    console.table([{ game: `NO MORE BILLIONAIRES`, action: `Score Shared` }]);
  });

  socket.on("guillotineEnterPlayerName", (msg) => {
    console.table([
      {
        game: `NO MORE BILLIONAIRES`,
        action: `Player Name`,
        playerName: msg.playerName,
      },
    ]);
  });

  socket.on("guillotineFinishGame", (msg) => {
    console.log("a player finished a game of COMPARATIVELY FAMOUS");
    console.table(msg.trophies);
    console.log("WEALTH CREATED: $" + msg.wealthCreated + "B");
    newGuillotinePlayerScore(msg.wealthCreated, msg.mostValuable);
    incrementDatabase("guillotineCounts", "gamesFinished");

    msg.trophies.forEach((trophy, index) => {
      logGuillotineHeadRemoval(trophy.name, trophy.netWorth);
    });
  });

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  //PRETEND WORLD sockets...

  socket.on("pretendGameStart", (msg) => {
    console.log("a player started a game of PRETEND WORLD");
    dateStampInDatabase("allGamesLastPlayed", "pretend");
    incrementDatabase("pretendCounts", "gamesStarted");
  });

  socket.on("pretendCorrectGuess", (msg) => {
    console.log(`${msg.correctName} was guessed correctly.`);
    pretendGuessCelebrity(msg.correctName, "correctGuess");
  });

  socket.on("pretendCloseGuess", (msg) => {
    console.log(`${msg.correctName} was guessed closed enough`);
    pretendGuessCelebrity(msg.correctName, "closeGuess");
  });

  socket.on("pretendBadGuess", (msg) => {
    console.log(`${msg.correctName} was guessed badly`);
    pretendGuessCelebrity(msg.correctName, "badGuess");
  });

  socket.on("pretendGameOver", (msg) => {
    console.log("a player finished a game of PRETEND WORLD");
    incrementDatabase("pretendCounts", "gamesFinished");
    if (!msg || !msg.gameState) {
      // error, do nothing
    } else if (msg.gameState == "win") {
      incrementDatabase("pretendCounts", "gamesWon");
    } else if (msg.gameState == "lose") {
      incrementDatabase("pretendCounts", "gamesLost");
    }
  });

  ///////////////////////////////////////////////////
  // Meeting Socket Actions

  socket.on("sendPlayerList", (msg) => {
    console.log("sendPlayerUpdates");
    console.table(msg.players);
    io.in(msg.roomCode).emit("receivePlayerList", {
      roomCode: msg.roomCode,
      from: msg.from,
      players: msg.players,
    });
  });

  socket.on("askHostForPlayersList", (msg) => {
    console.log("askHostForPlayersList");
    io.in(msg.roomCode).emit("sendThePlayerListIfYouAreHost", {
      roomCode: msg.roomCode,
      from: msg.from,
    });
  });

  socket.on("sendPlayerList", (msg) => {
    console.log("sendPlayerUpdates");
    console.table(msg.players);
    io.in(msg.roomCode).emit("receivePlayerList", {
      roomCode: msg.roomCode,
      from: msg.from,
      players: msg.players,
      isGameStarted: msg.isGameStarted,
    });
  });

  socket.on("startTheGame", (msg) => {
    console.log("startTheGame");

    if (msg.gameName == "invalid") {
      io.in(msg.roomCode).emit("startTheGame", {
        gameName: msg.gameName,
        players: msg.players,
        maxRounds: msg.maxRounds,
        sysAdminIndex: msg.sysAdminIndex,
        allowNaughty: msg.allowNaughty,
      });

      // // Save to Invalid Database...

      // incrementDatabase("invalidPlayerCounts",playerCount+ " Players");

      // if (msg.allowNaughty) {
      //   addOneInDatabase("invalidGames","NaughtyModeOn");
      // } else {
      //   addOneInDatabase("invalidGames","NaughtyModeOff");
      // }

      // addOneInDatabase("invalidGames","GamesStarted");
    } else if (msg.gameName == "wrongest") {
      // io.in(msg.roomCode).emit('startTheGame', {
      //   gameName: msg.gameName,
      //   players: msg.players,
      //   gameDeck: msg.gameDeck,
      //   chosenDeckName: msg.chosenDeckName,
      //   maxRounds: msg.maxRounds
      // });
      // Save to Wrongest Database...
      // addOneInDatabase("wrongestGames","GamesStarted");
      // incrementDatabase("wrongestPlayerCounts", playerCount+ " Players");
      // if (msg.chosenDeckName) {
      //   incrementDatabase("wrongestDecks", msg.chosenDeckName);
      // }
    } else {
      io.in(msg.roomCode).emit("receiveStartGameMessage", {
        roomCode: msg.roomCode,
        from: msg.from,
        players: msg.players,
      });
    }
  });

  socket.on("sendPlayerUpdate", (msg) => {
    console.log("sendPlayerUpdate");
    io.in(msg.roomCode).emit("receivePlayerUpdate", {
      roomCode: msg.roomCode,
      from: msg.from,
      socketID: msg.socketID,
      score: msg.score,
      badGuess: msg.badGuess,
      scoredCard: msg.scoredCard,
      stolenCard: msg.stolenCard,
      toast: msg.toast,
    });
    if (msg.badGuess) {
      console.log("bad guess");
      console.table(msg.badGuess);
    }
    if (msg.scoredCard) {
      console.log("scored card");
      console.table(msg.scoredCard);
    }
    if (msg.stolenCard) {
      console.log("stolen card");
      console.table(msg.stolenCard);
    }
  });

  socket.on("endTheGame", (msg) => {
    console.log("GAME OVER");
    console.table(msg.players);
    console.table(msg.badGuesses);
    io.in(msg.roomCode).emit("receiveEndGameCommand", {
      roomCode: msg.roomCode,
      from: msg.from,
      players: msg.players,
      badGuesses: msg.badGuesses,
    });
  });

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // INVALID sockets

  // SysAdmin -> Employees
  socket.on("invalidUpdatePasswordChallenge", (msg) => {
    console.log(msg.roomCode + " - challenge is " + msg.challenge.name);
    io.to(msg.roomCode).emit("invalidUpdatePasswordChallenge", {
      challenge: msg.challenge,
    });

    incrementDatabase("invalidChallenges", msg.challenge.name);
  });

  // SysAdmin -> Employees
  socket.on("invalidUpdatePasswordRules", (msg) => {
    console.log(msg.roomCode + " - new rule");
    console.table(msg.rules);
    io.to(msg.roomCode).emit("invalidUpdatePasswordRules", {
      rules: msg.rules,
      shibboleth: msg.shibboleth,
    });

    if (msg.newRule.type) {
      incrementDatabase("invalidRules", msg.newRule.type);

      if (msg.newRule.type == "Ban A Letter" && msg.newRule.inputValue) {
        incrementDatabase("invalidBannedLetters", msg.newRule.inputValue);
      } else if (
        msg.newRule.type == "Demand A Letter" &&
        msg.newRule.inputValue
      ) {
        incrementDatabase("invalidDemandedLetters", msg.newRule.inputValue);
      }
    }
  });

  // SysAdmin -> Employees
  socket.on("invalidSummonThePig", (msg) => {
    console.log(msg.roomCode + " - The Flying Pig has been summoned!");
    io.to(msg.roomCode).emit("invalidSummonThePig");
  });

  // SysAdmin -> Employees
  socket.on("invalidUpdateBugs", (msg) => {
    console.log(msg.roomCode + " - new bug");
    console.table(msg.bugs);
    io.to(msg.roomCode).emit("invalidUpdateBugs", {
      bugs: msg.bugs,
    });

    if (msg.newBug) {
      incrementDatabaseWithChallenge(
        "invalidBugs",
        msg.challengeName,
        msg.newBug,
      );
    }
  });

  // SysAdmin -> ALL
  socket.on("invalidStartGuessing", (msg) => {
    console.log(msg.roomCode + " - start guessing");
    io.in(msg.roomCode).emit("invalidStartGuessing", {
      sysAdminIndex: msg.sysAdminIndex,
    });
  });

  // An Employee -> Rest of Game
  socket.on("invalidTriedPassword", (msg) => {
    console.log(msg.roomCode + " - bad guess");
    io.to(msg.roomCode).emit("invalidTriedPassword", {
      playerIndex: msg.playerIndex,
      pwAttempt: msg.pwAttempt,
      attemptCount: msg.attemptCount,
      result: msg.result,
    });
  });

  // An Employee -> ALL
  socket.on("invalidCrashedServer", (msg) => {
    console.log(msg.roomCode + " - server crash!");
    io.in(msg.roomCode).emit("invalidCrashedServer", {
      playerIndex: msg.playerIndex,
      pwAttempt: msg.pwAttempt,
      attemptCount: msg.attemptCount,
      result: msg.result,
    });

    if (msg.pwAttempt) {
      incrementDatabaseWithChallenge(
        "invalidCrashes",
        msg.challengeName,
        msg.pwAttempt,
      );
    }
  });

  // An Employee -> ALL
  socket.on("invalidPasswordSuccess", (msg) => {
    console.log(msg.roomCode + " - password success");
    io.in(msg.roomCode).emit("invalidPasswordSuccess", {
      playerIndex: msg.playerIndex,
      pwAttempt: msg.pwAttempt,
      attemptCount: msg.attemptCount,
      playerScore: msg.playerScore,
      result: msg.result,
    });

    if (msg.pwAttempt) {
      incrementDatabaseWithChallenge(
        "invalidSuccessfulPasswords",
        msg.challengeName,
        msg.pwAttempt,
      );
    }
  });

  // Any Player -> ALL
  socket.on("invalidRoundOver", (msg) => {
    console.log(msg.roomCode + " - round over");
    io.in(msg.roomCode).emit("invalidRoundOver");
  });

  // SysAdmin -> ALL
  socket.on("invalidStartNewRound", (msg) => {
    console.log(msg.roomCode + " - new round started");
    io.in(msg.roomCode).emit("invalidStartNewRound", {
      playerIndex: msg.playerIndex,
      players: msg.players,
      summary: msg.summary,
    });
  });

  // Any Player -> Rest of Game
  socket.on("invalidPasswordCracked", (msg) => {
    console.log(msg.roomCode + " - password cracked");
    io.to(msg.roomCode).emit("invalidPasswordCracked", {
      players: msg.players,
      allEmployeePasswords: msg.allEmployeePasswords,
      crackSummary: msg.crackSummary,
    });

    if (msg.crackSummary && msg.crackSummary.pw) {
      incrementDatabase("invalidCracks", msg.crackSummary.pw);
    }
  });
};
