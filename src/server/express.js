// server/express.js
import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors"; // Import the CORS middleware

// Load .env first
dotenv.config();

// Determine which additional .env file to load based on the environment
const envFilePath = {
  development: ".env.local",
  production: ".env.prod",
}[process.env.NODE_ENV || "development"];

// Augment the existing environment variables with the specific .env file
if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
}

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

const DEV_DATABASE = "mysql://ln9uumc4l7ec5hl7:sn7bwomt55zt5rz3@pfw0ltdr46khxib3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/r2sqgl0qhc59u3rw";
const LIVE_DATABASE = "mysql://ln9uumc4l7ec5hl7:sn7bwomt55zt5rz3@pfw0ltdr46khxib3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/r2sqgl0qhc59u3rw";
const THE_DATABASE = process.env.NODE_ENV === "production" ? LIVE_DATABASE : DEV_DATABASE;

// const liveDBurl = (process.env.JAWSDB_CRIMSON_URL || secrets.liveSQLurl);
console.table([
  {
    DEV_DATABASE: DEV_DATABASE,
    LIVE_DATABASE: LIVE_DATABASE,
    NODE_ENV: process.env.NODE_ENV,
  },
]);
console.log("THE_DATABASE: " + THE_DATABASE);
const connection = mysql.createConnection(THE_DATABASE);

app.get("/message", (_, res) => res.send("Hello from express!"));

/////////////////////////////////////
////////////////////////////////////
// JSON

///// general stats
app.get("/stats/general/json", (req, res) => {
  let gameData = {
    lastPlayed: {},
    cameo: {},
    invalid: {},
    wrongest: {},
    playerNames: [],
  };
  connection.query("SELECT * FROM allGamesLastPlayed;", function (err, results) {
    if (err) throw err;
    results.forEach((key) => {
      gameData.lastPlayed[key.gameName] = key.lastGameTime;
    });
  });
  connection.query("SELECT * FROM cameoGames;", function (err, results) {
    if (err) throw err;
    results.forEach((key) => {
      gameData.cameo[key.iname] = key.icount;
    });
  });
  connection.query("SELECT * FROM invalidGames;", function (err, results) {
    if (err) throw err;
    results.forEach((key) => {
      gameData.invalid[key.iname] = key.icount;
    });
  });
  connection.query("SELECT * FROM wrongestGames;", function (err, results) {
    if (err) throw err;
    results.forEach((key) => {
      gameData.wrongest[key.iname] = key.icount;
    });
  });
  connection.query("SELECT * FROM allPlayerNames;", function (err, results) {
    if (err) throw err;
    gameData.playerNames = results;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(gameData));
  });
});

///// cameo stats
app.get("/stats/cameo/json", (req, res) => {
  let cameoData = {
    celebScores: [],
    playerScores: [],
    valuations: [],
    celebs: [],
    specialGames: [],
  };
  connection.query("SELECT * FROM cameoCelebScores;", function (err, results) {
    if (err) throw err;
    cameoData.celebScores = results;
  });
  connection.query("SELECT * FROM cameoPlayerScores;", function (err, results) {
    if (err) throw err;
    cameoData.playerScores = results;
  });
  connection.query("SELECT * FROM cameoValuations;", function (err, results) {
    if (err) throw err;
    cameoData.valuations = results;
  });
  connection.query("SELECT * FROM cameoSpecialGames;", function (err, results) {
    if (err) throw err;
    cameoData.specialGames = results;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(cameoData));
  });
});

///// invalid stats
app.get("/stats/invalid/json", (req, res) => {
  let invalidData = {
    bannedLetters: [],
    bugs: [],
    challenges: [],
    cracks: [],
    crashes: [],
    demandedLetters: [],
    letters: [],
    passwords: [],
    playerCounts: [],
    rules: [],
    successfulPasswords: [],
  };
  connection.query("SELECT * FROM invalidBannedLetters;", function (err, results) {
    if (err) throw err;
    invalidData.bannedLetters = results;
  });
  connection.query("SELECT * FROM invalidBugs;", function (err, results) {
    if (err) throw err;
    invalidData.bugs = results;
  });
  connection.query("SELECT * FROM invalidChallenges;", function (err, results) {
    if (err) throw err;
    invalidData.challenges = results;
  });
  connection.query("SELECT * FROM invalidCracks;", function (err, results) {
    if (err) throw err;
    invalidData.cracks = results;
  });
  connection.query("SELECT * FROM invalidCrashes;", function (err, results) {
    if (err) throw err;
    invalidData.crashes = results;
  });
  connection.query("SELECT * FROM invalidDemandedLetters;", function (err, results) {
    if (err) throw err;
    invalidData.demandedLetters = results;
  });
  connection.query("SELECT * FROM invalidPlayerCounts;", function (err, results) {
    if (err) throw err;
    invalidData.playerCounts = results;
  });
  connection.query("SELECT * FROM invalidRules;", function (err, results) {
    if (err) throw err;
    invalidData.rules = results;
  });
  connection.query("SELECT * FROM invalidSuccessfulPasswords;", function (err, results) {
    if (err) throw err;
    invalidData.successfulPasswords = results;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(invalidData));
  });
});

///// wrongest stats
app.get("/stats/wrongest/json", (req, res) => {
  let wrongestData = {
    decks: [],
    playerCounts: [],
    statements: [],
  };
  connection.query("SELECT * FROM wrongestDecks;", function (err, results) {
    if (err) throw err;
    wrongestData.decks = results;
  });
  connection.query("SELECT * FROM wrongestPlayerCounts;", function (err, results) {
    if (err) throw err;
    wrongestData.playerCounts = results;
  });
  connection.query("SELECT * FROM wrongestStatements;", function (err, results) {
    if (err) throw err;
    wrongestData.statements = results;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(wrongestData));
  });
});

///// sisyphus stats
app.get("/stats/sisyphus/json", (req, res) => {
  let sisyphusData = {
    cheevos: [],
    counts: {},
    purchases: [],
  };
  connection.query("SELECT * FROM sisyphusCheevos", function (err, results) {
    if (err) throw err;
    sisyphusData.cheevos = results;
  });
  connection.query("SELECT * FROM sisyphusCounts;", function (err, results) {
    if (err) throw err;
    results.forEach((key) => {
      sisyphusData.counts[key.iname] = key.icount;
    });
  });
  connection.query("SELECT * FROM sisyphusPurchases;", function (err, results) {
    if (err) throw err;
    sisyphusData.purchases = results;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(sisyphusData));
  });
});

///// guillotine stats
app.get("/stats/guillotine/json", (req, res) => {
  let guillotineData = {
    counts: {},
    heads: [],
    playerScores: [],
  };
  connection.query("SELECT * FROM guillotineCounts;", function (err, results) {
    if (err) throw err;
    results.forEach((key) => {
      guillotineData.counts[key.iname] = key.icount;
    });
  });
  connection.query("SELECT * FROM guillotineHeads", function (err, results) {
    if (err) throw err;
    guillotineData.heads = results;
    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify(guillotineData));
  });
  connection.query("SELECT * FROM guillotinePlayerScores", function (err, results) {
    if (err) throw err;
    guillotineData.playerScores = results;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(guillotineData));
  });
});

///// pretend stats
app.get("/stats/pretend/json", (req, res) => {
  let pretendData = {
    counts: {},
    guesses: [],
  };
  connection.query("SELECT * FROM pretendCounts;", function (err, results) {
    if (err) throw err;
    results.forEach((key) => {
      pretendData.counts[key.iname] = key.icount;
    });
  });
  connection.query("SELECT * FROM pretendGuesses", function (err, results) {
    if (err) throw err;
    pretendData.guesses = results;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(pretendData));
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
