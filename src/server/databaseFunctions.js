import { loadEnv } from "vite";
import mysql from "mysql";
let theDatabase;
if (process && process.env && process.env.JAWSDB_CRIMSON_URL) {
  theDatabase = process.env.JAWSDB_CRIMSON_URL;
} else if (process.env.NODE_ENV === "development") {
  const env = loadEnv("development", process.cwd(), "");
  theDatabase = env.VITE_DEV_DB;
} else if (process.env.NODE_ENV === "production") {
  const env = loadEnv("production", process.cwd(), "");
  theDatabase = env.VITE_LIVE_DB;
} else {
  // FIX THIS!!!!!
  const env = loadEnv("development", process.cwd(), "");
  theDatabase = env.VITE_DEV_DB;
  console.log("FALLBACK!");
}
const connection = mysql.createConnection(theDatabase);

console.log(`💽 database function is communicating with ${theDatabase} 💽`);

export function addOneInDatabase(table, value) {
  const sql =
    "UPDATE " +
    table +
    " SET icount = icount + 1 WHERE iname = " +
    connection.escape(value) +
    ";";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function incrementDatabase(table, value) {
  const sql =
    "INSERT INTO " +
    table +
    " (iname) VALUES (" +
    connection.escape(value) +
    ") ON DUPLICATE KEY UPDATE icount = icount+1;";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function decrementDatabase(table, value) {
  const sql =
    "INSERT INTO " +
    table +
    " (iname) VALUES (" +
    connection.escape(value) +
    ") ON DUPLICATE KEY UPDATE icount = icount-1;";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function incrementDatabaseWithChallenge(table, challenge, value) {
  const sql =
    "INSERT INTO " +
    table +
    " (iname, challenge) VALUES (" +
    connection.escape(value) +
    ", " +
    connection.escape(challenge) +
    ") ON DUPLICATE KEY UPDATE icount = icount+1;";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function addPlayerName(table, gameName, playerName) {
  const sql =
    "INSERT INTO " +
    table +
    " (iname, lastPlayed, lastPlayTime) VALUES (" +
    connection.escape(playerName) +
    ", " +
    connection.escape(gameName) +
    ", NOW()) ON DUPLICATE KEY UPDATE icount = icount+1, lastPlayTime = NOW();";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function dateStampInDatabase(table, gameName) {
  const sql = `UPDATE ${table}
                SET lastGameTime = NOW() 
                WHERE gameName = ${connection.escape(gameName)};`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function newCameoPlayerScore(
  playerScore,
  correctSorts,
  averageValuationOffset,
  birthdayWishes,
  exceededBudget,
) {
  const sql = `INSERT INTO cameoPlayerScores (playerScore, correctSorts,averageValuationOffset,birthdayWishes,exceededBudget,finishTime) 
                VALUES (${connection.escape(playerScore)},${connection.escape(correctSorts)},${connection.escape(averageValuationOffset)},${connection.escape(birthdayWishes)},${connection.escape(exceededBudget)},NOW())`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function valuateCameo(cameoName, actualValue, playerValue) {
  const sql = `INSERT INTO cameoValuations (cameoName, actualValue, playerValue) 
                VALUES (${connection.escape(cameoName)},${connection.escape(actualValue)},${connection.escape(playerValue)})`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function updateCameoStats(cameoName, sortScore, birthdayWishes) {
  const sql = `INSERT INTO cameoCelebScores (cameoName, sortScore, birthdayWishes) 
                VALUES (${connection.escape(cameoName)}, ${connection.escape(sortScore)}, ${connection.escape(birthdayWishes)})
                ON DUPLICATE KEY UPDATE sortScore = sortScore+${connection.escape(sortScore)}, birthdayWishes = birthdayWishes+${connection.escape(birthdayWishes)};`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function logCheevoEarned(title, text, points) {
  const sql = `INSERT INTO sisyphusCheevos (iname, description, pointValue, lastEarned)
                VALUES (${connection.escape(title)}, ${connection.escape(text)}, ${connection.escape(points)}, NOW())
                ON DUPLICATE KEY UPDATE icount = icount+1, lastEarned = NOW()`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function logSisyphusItemPurchase(name, desc, price) {
  const sql = `INSERT INTO sisyphusPurchases (iname, description, price, lastPurchase)
                VALUES (${connection.escape(name)}, ${connection.escape(desc)}, ${connection.escape(price)}, NOW())
                ON DUPLICATE KEY UPDATE icount = icount+1, lastPurchase = NOW()`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function logGuillotineHeadRemoval(name, value) {
  const sql = `INSERT INTO guillotineHeads (iname, headValue, lastRemoved)
                VALUES (${connection.escape(name)}, ${connection.escape(value)}, NOW())
                ON DUPLICATE KEY UPDATE icount = icount+1, lastRemoved = NOW()`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function newGuillotinePlayerScore(wealthCreated, mostValuable) {
  const sql = `INSERT INTO guillotinePlayerScores (wealthCreated, mostValuable, finishTime) 
                VALUES (${connection.escape(wealthCreated)},${connection.escape(mostValuable)},NOW())`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}

export function pretendGuessCelebrity(impersonator, column) {
  const sql = `INSERT INTO pretendGuesses (iname, ${column})
                VALUES (${connection.escape(impersonator)}, '1')
                ON DUPLICATE KEY UPDATE ${column} = ${column}+1`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
  });
}
