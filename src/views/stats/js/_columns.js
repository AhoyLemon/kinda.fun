import { billionsOfDollars, addCommas, dollars, formatDate, formatStatement } from "./_functions";

export const columns = {
  // GENERAL
  generalPlayers: [
    { label: "Name", field: "name", tdClass: "font-bold" },
    { label: "x", field: "gamesPlayed", type: "number", formatFn: addCommas },
    { label: "Most Recent", field: "mostRecentGame" },
    { label: "Last Played", field: "lastPlayed", type: "date", tdClass: "date", formatFn: formatDate },
  ],

  // NO MORE BILLIONAIRES
  guillotineHeads: [
    { label: "Name", field: "name", tdClass: "font-bold" },
    { label: "Worth", field: "netWorth", type: "number", formatFn: billionsOfDollars },
    { label: "x", field: "headCount", type: "number", formatFn: addCommas },
    { label: "Last Removed", field: "lastRemoved", formatFn: formatDate },
  ],

  // COMPARATIVELY FAMOUS
  celebs: [
    { label: "Name", field: "name", tdClass: "font-bold" },
    { label: "Actual Value", field: "actualValue", type: "number", formatFn: dollars },
    { label: "Avg Value", field: "averagePlayerValue", type: "decimal", formatFn: dollars },
    { label: "Market Forces", field: "marketForces", type: "decimal", formatFn: dollars },
    { label: "Sort Score", field: "sortScore", type: "number" },
    { label: "Birthdays", field: "birthdayWishCount", type: "number" },
  ],
  cameoSpecialGames: [
    { label: "Game", field: "name", tdClass: "font-bold" },
    { label: "Played", field: "startedCount", type: "number" },
  ],

  // SISYPHUS CLICKER
  sisyphusCheevos: [
    { label: "Name", field: "name", tdClass: "font-bold" },
    { label: "Points", field: "pointValue", type: "number" },
    { label: "Earned", field: "earnedCount", type: "number", formatFn: addCommas },
    { label: "Last Earned", field: "lastEarned", formatFn: formatDate },
  ],
  sisyphusPurchases: [
    { label: "Name", field: "name", tdClass: "font-bold" },
    { label: "Price", field: "price", type: "number" },
    { label: "Bought", field: "timesBought", type: "number", formatFn: addCommas },
    { label: "Last Purchase", field: "lastPurchased", type: "date", formatFn: formatDate },
  ],

  // PRETEND WORLD
  pretendGuesses: [
    { label: "Celebrity", field: "name", tdClass: "font-bold" },
    { label: "Correct %", field: "correctPercent", type: "number", formatFn: (val) => (val !== undefined && val !== null ? val + "%" : "0%") },
    { label: "Exact", field: "correctGuessCount", type: "number" },
    { label: "Close", field: "closeGuessCount", type: "number" },
    { label: "Bad", field: "badGuessCount", type: "number" },
  ],

  // THIS MEETING HAS POINTS
  meetingCards: [
    { label: "Phrase", field: "phrase", tdClass: "font-bold", formatFn: (val) => (val ? `“${val}”` : "") },
    { label: "Played", field: "timesPlayed", type: "number" },
    { label: "Scored", field: "timesScored", type: "number" },
    { label: "Stolen", field: "timesStolen", type: "number" },
    { label: "Value", field: "pointValue", type: "number" },
  ],
  meetingPlayers: [
    { label: "Name", field: "name", tdClass: "font-bold" },
    { label: "Played", field: "timesPlayed", type: "number" },
    { label: "Last Played", field: "lastPlayed", type: "date", formatFn: formatDate },
  ],
  meetingJobTitles: [
    { label: "Job", field: "jobTitle", tdClass: "font-bold" },
    { label: "Played", field: "timesPlayed", type: "number" },
    { label: "Last Played", field: "lastPlayed", type: "date", formatFn: formatDate },
  ],

  // INVALID
  invalidBugs: [
    { label: "Bug", field: "name", tdClass: "font-bold" },
    { label: "Deployed", field: "timesCreated", type: "number", formatFn: addCommas },
    { label: "Crashed", field: "timesCrashed", type: "number" },
  ],
  invalidChallenges: [
    { label: "Challenge", field: "name", tdClass: "font-bold" },
    { label: "Played", field: "timesChosen", type: "number" },
  ],
  invalidGameSizes: [
    { label: "Players", field: "players", type: "number" },
    { label: "Games Started", field: "gamesStarted", type: "number" },
    { label: "Games Finished", field: "gamesFinished", type: "number" },
  ],
  invalidLetters: [
    { label: "Letter", field: "letter", tdClass: "font-bold" },
    { label: "Demanded", field: "timesDemanded", type: "number" },
    { label: "Banned", field: "timesBanned", type: "number" },
  ],
  invalidPasswords: [
    { label: "Password", field: "name", tdClass: "font-bold" },
    { label: "Created", field: "timesCreated" },
    { label: "Cracked", field: "timesCracked" },
    { label: "Last", field: "lastCreated", type: "date", formatFn: formatDate },
  ],
  invalidRules: [
    { label: "Rule", field: "name", tdClass: "font-bold" },
    { label: "Played", field: "count", type: "number" },
    { label: "Last Played", field: "lastPlayed", type: "date", formatFn: formatDate },
  ],

  // MEGACHURCH
  megachurchSermonTopics: [
    { label: "Topic", field: "title", tdClass: "font-bold" },
    { label: "x", field: "timesPreached", type: "number", formatFn: addCommas },
  ],
  megachurchReligions: [
    { label: "Religion", field: "name", tdClass: "font-bold" },
    { label: "Founded", field: "churchesFounded", type: "number", formatFn: addCommas },
  ],
  megachurchLocations: [
    { label: "Location", field: "name", tdClass: "font-bold" },
    { label: "Founded", field: "churchesFounded", type: "number", formatFn: addCommas },
  ],
  megachurchMerch: [
    { label: "Merch", field: "name", tdClass: "font-bold" },
    { label: "Purchased", field: "timesPurchased", type: "number", formatFn: addCommas },
  ],
  megachurchPlayers: [
    { label: "Name", field: "name", tdClass: "font-bold" },
    { label: "Played", field: "gamesPlayed", type: "number", formatFn: addCommas },
  ],
};
