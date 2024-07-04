import { loadEnv } from "vite";
import mysql from "mysql";
let theDatabase;
if (process && process.env && process.env.JAWSDB_CRIMSON_URL) {
  theDatabase = process.env.JAWSDB_CRIMSON_URL;
} else if (process.env.NODE_ENV === "development") {
  const env = loadEnv("development", process.cwd(), "");
  theDatabase = env.VITE_DEV_DB;
}
const connection = mysql.createConnection(theDatabase);

console.log(`💽 database function is communicating with ${theDatabase} 💽`);

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// General Use Database Commands
export function dateStampInDatabase(table, gameName) {
  const sql = `UPDATE ${table}
                SET lastGameTime = NOW() 
                WHERE gameName = ${connection.escape(gameName)};`;
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
