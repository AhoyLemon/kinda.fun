import {
  dateStampInDatabase,
  incrementDatabase,
  decrementDatabase,
  logCheevoEarned,
  logSisyphusItemPurchase,
} from "./databaseFunctions.js";

export const socketEvents = (io, socket) => {
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  // General Socket Crap
  console.log("socket.io - connection");
  socket.on("disconnect", () => {
    console.log(`socket.io - socket.id \`${socket.id}\` disconnected`);
  });
  socket.on("signin", () => {
    console.log("socket.io - signin");
  });

  io.on("connection", (socket) => {
    const socketID = socket.id;
    io.to(socketID).emit("getSocketID", socketID);
  });
  ///////////////////////////////////////////////////

  ///////////////////////////////////////////////////
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
};
