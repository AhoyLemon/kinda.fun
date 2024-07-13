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

  // io.to(socket.id).emit("getSocketID", socket.id);

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
    //io.emit('createRoom', msg);
    console.log(msg.roomCode + " - created a room for " + msg.gameName);
    socket.join(msg.roomCode);
    console.log(msg.roomCode + " - join by creator");

    // TODO: I need to figure out how to get a list of all clients in a room.
    console.table([
      {
        game: msg.gameName,
        action: "Room Created",
        roomCode: msg.roomCode,
      },
    ]);
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

    // // Broadcast a join message gloablly.
    // io.emit("joinRoom", msg);

    // // Request players from the host.
    // socket.to(msg.roomCode).emit("requestPlayers");

    // console.table([
    //   {
    //     game: msg.gameName,
    //     action: "Room Joined",
    //     roomCode: msg.roomCode,
    //   },
    // ]);
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
  // Sisyphus Socket Actions
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

  ///////////////////////////////////////////////////
  // Meeting

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

    io.in(msg.roomCode).emit("receiveStartGameMessage", {
      roomCode: msg.roomCode,
      from: msg.from,
      players: msg.players,
    });
  });

  socket.on("sendPlayerUpdate", (msg) => {
    console.log("sendPlayerUpdate");
    io.in(msg.roomCode).emit("receivePlayerUpdate", {
      roomCode: msg.roomCode,
      from: msg.from,
      socketID: msg.socketID,
      score: msg.score,
      scoredCard: msg.scoredCard,
      stolenCard: msg.stolenCard,
      toast: msg.toast,
    });
  });
};
