var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const secrets = require('./secrets');

app.use(express.static('public'));

//////////////////////////////////////////////
// SQL DATABASE

const jawsDBurl = (process.env.JAWSDB_CRIMSON_URL || secrets.devSQLurl);
const liveDBurl = (process.env.JAWSDB_CRIMSON_URL || secrets.liveSQLurl);
console.log('DEV: '+jawsDBurl);
console.log('LIVE: '+liveDBurl); 
const mysql = require('mysql');
const connection = mysql.createConnection(jawsDBurl);
const liveConnection = mysql.createConnection(liveDBurl);

function addOneInDatabase(table,value) {
  const sql = 'UPDATE '+table+' SET icount = icount + 1 WHERE iname = ' + connection.escape(value) + ';';
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}

function incrementDatabase(table,value) {
  const sql = 'INSERT INTO '+table+' (iname) VALUES ('+connection.escape(value)+') ON DUPLICATE KEY UPDATE icount = icount+1;';
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}

function decrementDatabase(table,value) {
  const sql = 'INSERT INTO '+table+' (iname) VALUES ('+connection.escape(value)+') ON DUPLICATE KEY UPDATE icount = icount-1;';
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}

function incrementDatabaseWithChallenge(table,challenge,value) {
  const sql = 'INSERT INTO '+table+' (iname, challenge) VALUES ('+connection.escape(value)+', '+connection.escape(challenge)+') ON DUPLICATE KEY UPDATE icount = icount+1;';
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}

function addPlayerName(table,gameName,playerName) {
  const sql = 'INSERT INTO '+table+' (iname, lastPlayed, lastPlayTime) VALUES ('+connection.escape(playerName)+', '+connection.escape(gameName)+', NOW()) ON DUPLICATE KEY UPDATE icount = icount+1, lastPlayTime = NOW();';
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}

function DateStampInDatabase(table,gameName) {
  const sql = `UPDATE ${table}
                SET lastGameTime = NOW() 
                WHERE gameName = ${connection.escape(gameName)};`;
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}

function newCameoPlayerScore(playerScore,correctSorts,averageValuationOffset,birthdayWishes,exceededBudget) {
  const sql = `INSERT INTO cameoPlayerScores (playerScore, correctSorts,averageValuationOffset,birthdayWishes,exceededBudget,finishTime) 
                VALUES (${connection.escape(playerScore)},${connection.escape(correctSorts)},${connection.escape(averageValuationOffset)},${connection.escape(birthdayWishes)},${connection.escape(exceededBudget)},NOW())`;
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}

function valuateCameo(cameoName, actualValue, playerValue) {
  const sql = `INSERT INTO cameoValuations (cameoName, actualValue, playerValue) 
                VALUES (${connection.escape(cameoName)},${connection.escape(actualValue)},${connection.escape(playerValue)})`;
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}

function updateCameoStats(cameoName, sortScore, birthdayWishes) {
  const sql = `INSERT INTO cameoCelebScores (cameoName, sortScore, birthdayWishes) 
                VALUES (${connection.escape(cameoName)}, ${connection.escape(sortScore)}, ${connection.escape(birthdayWishes)})
                ON DUPLICATE KEY UPDATE sortScore = sortScore+${connection.escape(sortScore)}, birthdayWishes = birthdayWishes+${connection.escape(birthdayWishes)};`;
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}

function logCheevoEarned(title,text,points) {
  const sql = `INSERT INTO sisyphusCheevos (iname, description, pointValue, lastEarned)
                VALUES (${connection.escape(title)}, ${connection.escape(text)}, ${connection.escape(points)}, NOW())
                ON DUPLICATE KEY UPDATE icount = icount+1, lastEarned = NOW()`;
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}

function logSisyphusItemPurchase(name,desc,price) {
  const sql = `INSERT INTO sisyphusPurchases (iname, description, price, lastPurchase)
                VALUES (${connection.escape(name)}, ${connection.escape(desc)}, ${connection.escape(price)}, NOW())
                ON DUPLICATE KEY UPDATE icount = icount+1, lastPurchase = NOW()`;
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}


function logGuillotineHeadRemoval(name,value) {
  const sql = `INSERT INTO guillotineHeads (iname, headValue, lastRemoved)
                VALUES (${connection.escape(name)}, ${connection.escape(value)}, NOW())
                ON DUPLICATE KEY UPDATE icount = icount+1, lastRemoved = NOW()`;
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}


function newGuillotinePlayerScore(wealthCreated,mostValuable) {
  const sql = `INSERT INTO guillotinePlayerScores (wealthCreated, mostValuable, finishTime) 
                VALUES (${connection.escape(wealthCreated)},${connection.escape(mostValuable)},NOW())`;
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}

function pretendGuessCelebrity(impersonator,column) {
  const sql = `INSERT INTO pretendGuesses (iname, ${column})
                VALUES (${connection.escape(impersonator)}, '1')
                ON DUPLICATE KEY UPDATE ${column} = ${column}+1`;
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
  });
}


/////////////////////////////////////////////////////////////////////////////
// Routing

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/start.html');
});

app.get('/invalid', (req, res) => {
  res.sendFile(__dirname + '/html/invalid.html');
});

app.get('/wrongest', (req, res) => {
  res.sendFile(__dirname + '/html/wrongest.html');
});

app.get('/cameo', (req, res) => {
  res.sendFile(__dirname + '/html/cameo.html');
});

app.get('/sisyphus', (req, res) => {
  res.sendFile(__dirname + '/html/sisyphus.html');
});

app.get('/guillotine', (req, res) => {
  res.sendFile(__dirname + '/html/guillotine.html');
});

app.get('/guillotine/process', (req, res) => {
  res.sendFile(__dirname + '/html/guillotine/process.html');
});

app.get('/guillotine/arrests', (req, res) => {
  res.sendFile(__dirname + '/html/guillotine/arrests.html');
});

app.get('/pretend', (req, res) => {
  res.sendFile(__dirname + '/html/pretend.html');
});

app.get('/sitemap.xml', (req, res) => {
  res.contentType('application/xml');
  res.sendFile(__dirname + '/xml/sitemap.xml');
});

app.get('/stats', (req, res) => {
  res.sendFile(__dirname + '/html/stats.html');
});

app.get('/stats/general/json', (req, res) => {
  let gameData =  {
    lastPlayed: {},
    cameo: {},
    invalid: {},
    wrongest: {},
    playerNames: []
  };
  connection.query('SELECT * FROM allGamesLastPlayed;', function(err, results) {
    if(err) throw err;
    results.forEach((key) => {
      gameData.lastPlayed[key.gameName] = key.lastGameTime;
    });
  });
  connection.query('SELECT * FROM cameoGames;', function(err, results) {
    if(err) throw err;
    results.forEach((key) => {
      gameData.cameo[key.iname] = key.icount;
    });
  });
  connection.query('SELECT * FROM invalidGames;', function(err, results) {
    if(err) throw err;
    results.forEach((key) => {
      gameData.invalid[key.iname] = key.icount;
    });
  });
  connection.query('SELECT * FROM wrongestGames;', function(err, results) {
    if(err) throw err;
    results.forEach((key) => {
      gameData.wrongest[key.iname] = key.icount;
    });
  });
  connection.query('SELECT * FROM allPlayerNames;', function(err, results) {
    if(err) throw err;
    gameData.playerNames = results;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(gameData));
  });
});

app.get('/stats/cameo/json', (req, res) => {
  let cameoData =  {
    celebScores: [],
    playerScores: [],
    valuations: [],
    celebs: [],
    specialGames: []
  };
  connection.query('SELECT * FROM cameoCelebScores;', function(err, results) {
    if(err) throw err;
    cameoData.celebScores = results;
  });
  connection.query('SELECT * FROM cameoPlayerScores;', function(err, results) {
    if(err) throw err;
    cameoData.playerScores = results;
  });
  connection.query('SELECT * FROM cameoValuations;', function(err, results) {
    if(err) throw err;
    cameoData.valuations = results;
  });
  connection.query('SELECT * FROM cameoSpecialGames;', function(err, results) {
    if(err) throw err;
    cameoData.specialGames = results;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(cameoData));
  });
});

app.get('/stats/invalid/json', (req, res) => {
  let invalidData =  {
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
    successfulPasswords: []
  };
  connection.query('SELECT * FROM invalidBannedLetters;', function(err, results) {
    if(err) throw err;
    invalidData.bannedLetters = results;
  });
  connection.query('SELECT * FROM invalidBugs;', function(err, results) {
    if(err) throw err;
    invalidData.bugs = results;
  });
  connection.query('SELECT * FROM invalidChallenges;', function(err, results) {
    if(err) throw err;
    invalidData.challenges = results;
  });
  connection.query('SELECT * FROM invalidCracks;', function(err, results) {
    if(err) throw err;
    invalidData.cracks = results;
  });
  connection.query('SELECT * FROM invalidCrashes;', function(err, results) {
    if(err) throw err;
    invalidData.crashes = results;
  });
  connection.query('SELECT * FROM invalidDemandedLetters;', function(err, results) {
    if(err) throw err;
    invalidData.demandedLetters = results;
  });
  connection.query('SELECT * FROM invalidPlayerCounts;', function(err, results) {
    if(err) throw err;
    invalidData.playerCounts = results;
  });
  connection.query('SELECT * FROM invalidRules;', function(err, results) {
    if(err) throw err;
    invalidData.rules = results;
  });
  connection.query('SELECT * FROM invalidSuccessfulPasswords;', function(err, results) {
    if(err) throw err;
    invalidData.successfulPasswords = results;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(invalidData));
  });
});

app.get('/stats/wrongest/json', (req, res) => {
  let wrongestData =  {
    decks: [],
    playerCounts: [],
    statements: []
  };
  connection.query('SELECT * FROM wrongestDecks;', function(err, results) {
    if(err) throw err;
    wrongestData.decks = results;
  });
  connection.query('SELECT * FROM wrongestPlayerCounts;', function(err, results) {
    if(err) throw err;
    wrongestData.playerCounts = results;
  });
  connection.query('SELECT * FROM wrongestStatements;', function(err, results) {
    if(err) throw err;
    wrongestData.statements = results;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(wrongestData));
  });
});

app.get('/stats/sisyphus/json', (req, res) => {
  let sisyphusData =  {
    cheevos: [],
    counts: {},
    purchases: []
  };
  connection.query('SELECT * FROM sisyphusCheevos', function(err, results) {
    if(err) throw err;
    sisyphusData.cheevos = results;
  });
  connection.query('SELECT * FROM sisyphusCounts;', function(err, results) {
    if(err) throw err;
    results.forEach((key) => {
      sisyphusData.counts[key.iname] = key.icount;
    });
  });
  connection.query('SELECT * FROM sisyphusPurchases;', function(err, results) {
    if(err) throw err;
    sisyphusData.purchases = results;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(sisyphusData));
  });
});

app.get('/stats/guillotine/json', (req, res) => {
  let guillotineData =  {
    counts: {},
    heads: [],
    playerScores: []
  };
  connection.query('SELECT * FROM guillotineCounts;', function(err, results) {
    if(err) throw err;
    results.forEach((key) => {
      guillotineData.counts[key.iname] = key.icount;
    });
  });
  connection.query('SELECT * FROM guillotineHeads', function(err, results) {
    if(err) throw err;
    guillotineData.heads = results;
    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify(guillotineData));
  });
  connection.query('SELECT * FROM guillotinePlayerScores', function(err, results) {
    if(err) throw err;
    guillotineData.playerScores = results;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(guillotineData));
  });
  
});


app.get('/stats/pretend/json', (req, res) => {
  let pretendData =  {
    counts: {},
    guesses: []
  };
  connection.query('SELECT * FROM pretendCounts;', function(err, results) {
    if(err) throw err;
    results.forEach((key) => {
      pretendData.counts[key.iname] = key.icount;
    });
  });
  connection.query('SELECT * FROM pretendGuesses', function(err, results) {
    if(err) throw err;
    pretendData.guesses = results;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(pretendData));
  });
  
});


io.on('connection', (socket) => {

  const socketID = socket.id;
  console.log('a user connected with the ID of'+socketID);
  io.to(socketID).emit("getSocketID", socketID);

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // GENERIC SIGNALS
  // Shared by different games.

  // Any Client -> The Entire Planet
  socket.on('createRoom', msg => {

    //io.emit('createRoom', msg);
    console.log(msg.roomCode+' - created a room for '+msg.gameName);
    socket.join(msg.roomCode);
    console.log(msg.roomCode+' - join by creator');

    // TODO: I need to figure out how to get a list of all clients in a room.

    if (msg.gameName == "invalid") {
      addOneInDatabase("invalidGames","RoomsCreated");
    } else if (msg.gameName == "wrongest") {
      addOneInDatabase("wrongestGames","RoomsCreated");
    }
  });


  // Any Client -> The Entire Planet
  socket.on('joinRoom', msg => {
    console.log(msg.roomCode+' - guest joined');
    socket.join(msg.roomCode);

    // Broadcast a join message gloablly.
    io.emit('joinRoom', msg);

    // Request players from the host.
    socket.to(msg.roomCode).emit("requestPlayers");
  });

  // Any Client -> The Rest of the Room
  socket.on('updatePlayers', msg => {
    console.log(msg.roomCode+' - players updated');
    console.table(msg.players);

    // TODO: Probably change this to go from game host to anybody else in the room?
    io.in(msg.roomCode).emit('updatePlayers', {
      players: msg.players,
      gameStarted: msg.gameStarted
    });
  });

  socket.on('startTheGame', msg => {

    console.log(msg.roomCode+' - started game of '+msg.gameName);
    const playerCount = msg.players.length;
    const fullTimeStamp = new Date();

    if (msg.gameName == "invalid") {
      io.in(msg.roomCode).emit('startTheGame', {
        gameName: msg.gameName,
        players: msg.players,
        maxRounds: msg.maxRounds,
        sysAdminIndex: msg.sysAdminIndex,
        allowNaughty: msg.allowNaughty
      });


      // Save to Invalid Database...
      
      incrementDatabase("invalidPlayerCounts",playerCount+ " Players");

      if (msg.allowNaughty) {
        addOneInDatabase("invalidGames","NaughtyModeOn");
      } else {
        addOneInDatabase("invalidGames","NaughtyModeOff");
      }
    
      addOneInDatabase("invalidGames","GamesStarted");

    } else if (msg.gameName == "wrongest") {
      io.in(msg.roomCode).emit('startTheGame', {
        gameName: msg.gameName,
        players: msg.players,
        gameDeck: msg.gameDeck,
        chosenDeckName: msg.chosenDeckName,
        maxRounds: msg.maxRounds
      });


      // Save to Wrongest Database...
      addOneInDatabase("wrongestGames","GamesStarted");
      incrementDatabase("wrongestPlayerCounts", playerCount+ " Players");
      if (msg.chosenDeckName) {
        incrementDatabase("wrongestDecks", msg.chosenDeckName);
      }
    }
    
    DateStampInDatabase("allGamesLastPlayed",msg.gameName);
    console.table(msg.players);
    
    msg.players.forEach((player) => {
      addPlayerName("allPlayerNames",msg.gameName,player.name);
    });
    

  });

  socket.on("gameOver", msg => {
    console.log(msg.roomCode+' - GAME OVER ⚰️ '+msg.gameName);
    if (msg.gameName == "invalid") {
      io.in(msg.roomCode).emit("gameOver", {
        playerIndex: msg.playerIndex,
        passwordAttempts: msg.passwordAttempts
      });
    } else if (msg.gameName == "wrongest") {
      io.in(msg.roomCode).emit("gameOver", {
        players: msg.players,
        gameDeck: msg.gameDeck,
        statementHistory: msg.statementHistory,
        roundNumber: msg.roundNumber
      });
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // INVALID sockets

  // SysAdmin -> Employees
  socket.on("updatePasswordChallenge", msg => {
    console.log(msg.roomCode+' - challenge is '+msg.challenge.name);
    io.to(msg.roomCode).emit("updatePasswordChallenge", {
      challenge: msg.challenge
    });

    incrementDatabase('invalidChallenges', msg.challenge.name);

  });

  // SysAdmin -> Employees
  socket.on("updatePasswordRules", msg => {
    console.log(msg.roomCode+' - new rule');
    console.table(msg.rules);
    io.to(msg.roomCode).emit("updatePasswordRules", {
      rules: msg.rules,
      shibboleth: msg.shibboleth
    });

    if (msg.newRule.type) {
      incrementDatabase('invalidRules', msg.newRule.type);

      if (msg.newRule.type == "Ban A Letter" && msg.newRule.inputValue) {
        incrementDatabase('invalidBannedLetters', msg.newRule.inputValue);
      } else if (msg.newRule.type == "Demand A Letter" && msg.newRule.inputValue) {
        incrementDatabase('invalidDemandedLetters', msg.newRule.inputValue);
      }
    }
    

  });

  // SysAdmin -> Employees
  socket.on("summonThePig", msg => {
    console.log(msg.roomCode+' - The Flying Pig has been summoned!');
    io.to(msg.roomCode).emit("summonThePig");
  });

  // SysAdmin -> Employees
  socket.on("updateBugs", msg => {
    console.log(msg.roomCode+' - new bug');
    console.table(msg.bugs);
    io.to(msg.roomCode).emit("updateBugs", {
      bugs: msg.bugs
    });

    
    if (msg.newBug) {
      incrementDatabaseWithChallenge("invalidBugs", msg.challengeName, msg.newBug);
    }
    

  });

  // SysAdmin -> ALL
  socket.on("startGuessing", msg => {
    console.log(msg.roomCode+' - start guessing');
    io.in(msg.roomCode).emit("startGuessing", {
      sysAdminIndex: msg.sysAdminIndex
    });
  });

  // An Employee -> Rest of Game
  socket.on("triedPassword", msg => {
    console.log(msg.roomCode+' - bad guess');
    io.to(msg.roomCode).emit("triedPassword", {
      playerIndex: msg.playerIndex,
      pwAttempt: msg.pwAttempt,
      attemptCount: msg.attemptCount,
      result: msg.result
    });
  });

  // An Employee -> ALL
  socket.on("crashedServer", msg => {
    console.log(msg.roomCode+' - server crash!');
    io.in(msg.roomCode).emit("crashedServer", {
      playerIndex: msg.playerIndex,
      pwAttempt: msg.pwAttempt,
      attemptCount: msg.attemptCount,
      result: msg.result
    });

    
    if (msg.pwAttempt) {
      incrementDatabaseWithChallenge("invalidCrashes", msg.challengeName, msg.pwAttempt);
    }
    

  });

  // An Employee -> ALL
  socket.on("passwordSuccess", msg => {
    console.log(msg.roomCode+' - password success');
    io.in(msg.roomCode).emit("passwordSuccess", {
      playerIndex: msg.playerIndex,
      pwAttempt: msg.pwAttempt,
      attemptCount: msg.attemptCount,
      playerScore: msg.playerScore,
      result: msg.result
    });


    if (msg.pwAttempt) {
      incrementDatabaseWithChallenge("invalidSuccessfulPasswords",msg.challengeName,msg.pwAttempt);
    }
    
  });

  // Any Player -> ALL
  socket.on("roundOver", msg => {
    console.log(msg.roomCode+' - round over');
    io.in(msg.roomCode).emit("roundOver");
  });

  // SysAdmin -> ALL
  socket.on("startNewRound", msg => {
    console.log(msg.roomCode+' - new round started');
    io.in(msg.roomCode).emit("startNewRound", {
      playerIndex: msg.playerIndex,
      players: msg.players,
      summary: msg.summary
    });
  });

  // Any Player -> Rest of Game
  socket.on("passwordCracked", msg => {
    console.log(msg.roomCode+' - password cracked');
    io.to(msg.roomCode).emit("passwordCracked", {
      players: msg.players,
      allEmployeePasswords: msg.allEmployeePasswords,
      crackSummary: msg.crackSummary
    });

    if (msg.crackSummary && msg.crackSummary.pw) {
      incrementDatabase('invalidCracks', msg.crackSummary.pw);
    }

  });

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // THE WRONGEST WORDS sockets

  socket.on('startPresenting', msg => {

    console.log(msg.roomCode+" - "+msg.activePlayerName+"'s turn begins");

    io.in(msg.roomCode).emit('startPresenting', {
      activePlayerIndex: msg.activePlayerIndex,
      activePlayerName: msg.activePlayerName
    });
  });

  socket.on('donePresenting', msg => {

    console.log(msg.roomCode+ " - "+msg.activePlayerName+" is done presenting");

    io.in(msg.roomCode).emit('donePresenting', {
      activePlayerIndex: msg.activePlayerIndex,
      activePlayerName: msg.activePlayerName,
      activePlayerCard: msg.activePlayerCard
    });
  });

  socket.on('startVoting', msg => {

    console.log(msg.roomCode+" - voting started");
    console.table(msg.cardsPresented);

    io.in(msg.roomCode).emit('startVoting', {
      cardsPresented: msg.cardsPresented
    });
  });

  socket.on('submitVotes', msg => {

    console.log(msg.roomCode+" - votes sent by "+msg.votingPlayerName);

    io.in(msg.roomCode).emit('submitVotes', {
      votingPlayerIndex: msg.votingPlayerIndex,
      votingPlayerName: msg.votingPlayerName,
      downVoteIndex: msg.downVoteIndex,
      upVoteIndex: msg.upVoteIndex,
    });

    incrementDatabase('wrongestStatements', msg.upVoteCard);
    decrementDatabase('wrongestStatements', msg.downVoteCard);
  });


  socket.on('startNextRound', msg => {
    console.log(msg.roomCode+' - round '+msg.roundNumber+" started.");

    io.in(msg.roomCode).emit('startNextRound', {
      players: msg.players,
      gameDeck: msg.gameDeck,
      statementHistory: msg.statementHistory,
      roundNumber: msg.roundNumber
    });
    console.table(msg.players);
  });


  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // COMPARATIVELY FAMOUS sockets

  socket.on('cameoStartGame', msg => {
    console.log("a player started a game of COMPARATIVELY FAMOUS");
    DateStampInDatabase("allGamesLastPlayed",msg.gameName);
    addOneInDatabase("cameoGames","GamesStarted");
  });

  socket.on('cameoSpecialGame', msg => {
    console.log("a player started a SPECIAL game of COMPARATIVELY FAMOUS");
    console.log("SPECIAL GAME: "+msg.gimmickName);
    addOneInDatabase("cameoGames","SpecialGamesStarted");
    incrementDatabase('cameoSpecialGames', msg.gimmickName);
  });

  socket.on('cameoValuationMade', msg => {
    console.log(msg.celeb.name + " has been evaluated");
    var cameoName = msg.celeb.name;
    var actualValue = msg.celeb.value;
    var playerValue = msg.valueGuessed;
    valuateCameo(cameoName, actualValue, playerValue);
  });

  socket.on('cameoFinishGame', msg => {
    console.log("a player finished a game of COMPARATIVELY FAMOUS");
    console.table(msg.birthdayWishes);
    addOneInDatabase("cameoGames","GamesFinished");
    newCameoPlayerScore(msg.playerScore,msg.correctSorts,msg.averageValuationOffset,msg.birthdayWishes.length,msg.exceededBudget);

    msg.cameoHistory.forEach((cameo,index) => {
      if (cameo.correct) {
        updateCameoStats(cameo.name, 1, 0);
      } else {
        updateCameoStats(cameo.name, -1, 0);
      }
    });

    msg.birthdayWishes.forEach((cameo,index) => {
      updateCameoStats(cameo.name, 0, 1);
    });

  });


  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // SISYPHUS CLICKER sockets...

  socket.on('sisyphusStartGame', msg => {
    //console.log("a player started a game of SISYPHUS CLICKER [UNLOGGED]");
    console.log("a player started a game of SISYPHUS CLICKER");
    DateStampInDatabase("allGamesLastPlayed", msg.gameName);
    incrementDatabase('sisyphusCounts', "First Click");
  });

  socket.on('sisyphusRollback', msg => {
    console.log("The Rock rolled back downhill");
    incrementDatabase('sisyphusCounts', "Rock Rolled Downhill");
  });

  socket.on('sisyphusEarnedCheevo', msg => {
    console.log("Cheevo Earned: " + msg.title);
    logCheevoEarned(msg.title, msg.text, msg.points);
  });

  socket.on('sisyphusBoughtItem', msg => {
    console.log("Bought Item: " + msg.name);
    logSisyphusItemPurchase(msg.name,msg.desc,msg.price);
  });



  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // NO MORE BILLIONAIRES sockets...

  socket.on('guillotineStartGame', msg => {
    console.log("a player started a game of NO MORE BILLIONAIRES");
    DateStampInDatabase("allGamesLastPlayed", 'guillotine');
    incrementDatabase('guillotineCounts', "gamesStarted");
  });

  socket.on('guillotineFinishGame', msg => {
    console.log("a player finished a game of NO MORE BILLIONAIRES");
    console.table(msg.trophies);
    console.log("WEALTH CREATED: $"+msg.wealthCreated+"B");
    newGuillotinePlayerScore(msg.wealthCreated, msg.mostValuable);
    incrementDatabase('guillotineCounts', "gamesFinished");

    msg.trophies.forEach((trophy,index) => {
      logGuillotineHeadRemoval(trophy.name, trophy.netWorth);
    });
  });

  socket.on('guillotineShareScore', msg => {
    console.log("a player shared a score of NO MORE BILLIONAIRES");
    incrementDatabase('guillotineCounts', "scoresShared");
  });

  socket.on('guillotineShareScore', msg => {
    console.log("loaded a shared score of NO MORE BILLIONAIRES");
    incrementDatabase('guillotineCounts', "scoresLoaded");
  });

  socket.on('disconnect', () => {
    console.log("The socket "+socketID+ " disconnected.");
  });


  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  //PRETEND WORLD sockets...

  socket.on('pretendGameStart', msg => {
    console.log("a player started a game of PRETEND WORLD");
    DateStampInDatabase("allGamesLastPlayed", 'pretend');
    incrementDatabase('pretendCounts', "gamesStarted");
  });

  socket.on('pretendCorrectGuess', msg => {
    console.log(`${msg.correctName} was guessed correctly.`);
    pretendGuessCelebrity(msg.correctName,'correctGuess');
  });

  socket.on('pretendCloseGuess', msg => {
    console.log(`${msg.correctName} was guessed closed enough`);
    pretendGuessCelebrity(msg.correctName,'closeGuess');
  });

  socket.on('pretendBadGuess', msg => {
    console.log(`${msg.correctName} was guessed badly`);
    pretendGuessCelebrity(msg.correctName,'badGuess');
  });

  socket.on('pretendGameOver', msg => {
    console.log("a player finished a game of PRETEND WORLD");
    incrementDatabase('pretendCounts', "gamesFinished");
    if (!msg || !msg.gameState) {
      // error, do nothing
    } else if (msg.gameState == "win") {
      incrementDatabase('pretendCounts', "gamesWon");
    } else if (msg.gameState == "lost") {
      incrementDatabase('pretendCounts', "gamesLost");
    }
  });
  
});




http.listen((process.env.PORT || 3000), () => {
  console.log('listening on *:'+ (process.env.PORT || 3000));
});