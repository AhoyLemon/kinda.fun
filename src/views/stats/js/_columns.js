import { billionsOfDollars, addCommas, dollars, formatDate, formatStatement } from "./_functions";

export const columns = {
  guillotineHeads: [
    { label: "Name", field: "name", tdClass: "font-bold" },
    { label: "Worth", field: "netWorth", type: "number", formatFn: billionsOfDollars },
    { label: "x", field: "headCount", type: "number", formatFn: addCommas },
    { label: "Last Removed", field: "lastRemoved", formatFn: formatDate },
  ],
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
  pretendGuesses: [
    { label: "Celebrity", field: "name", tdClass: "font-bold" },
    { label: "Correct %", field: "correctPercent", type: "number", formatFn: (val) => (val !== undefined && val !== null ? val + "%" : "0%") },
    { label: "Exact", field: "correctGuessCount", type: "number" },
    { label: "Close", field: "closeGuessCount", type: "number" },
    { label: "Bad", field: "badGuessCount", type: "number" },
  ],
  meetingCards: [
    { label: "Phrase", field: "phrase", tdClass: "font-bold", formatFn: (val) => (val ? `“${val}”` : "") },
    { label: "Value", field: "pointValue", type: "number" },
    { label: "Played", field: "timesPlayed", type: "number" },
    { label: "Scored", field: "timesScored", type: "number" },
    { label: "Stolen", field: "timesStolen", type: "number" },
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
  bugs: [
    { label: "Bug", field: "iname" },
    { label: "Deployed", field: "icount", type: "number" },
  ],
  challenges: [
    { label: "Challenge", field: "iname" },
    { label: "Played", field: "icount", type: "number" },
  ],
  letters: [
    { label: "Letter", field: "letter" },
    { label: "Banned", field: "banned", type: "number" },
    { label: "Demanded", field: "demanded", type: "number" },
  ],
  passwords: [
    { label: "Password", field: "password" },
    { label: "Challenge", field: "challenge" },
    { label: "Used", field: "used", type: "number" },
    { label: "Cracked", field: "cracked", type: "number" },
    { label: "Crashed", field: "crashed", type: "number" },
  ],
  playerCounts: [
    { label: "Game Type", field: "iname" },
    { label: "Played", field: "icount", type: "number" },
  ],
  rules: [
    { label: "Rule", field: "iname" },
    { label: "Deployed", field: "icount", type: "number" },
  ],
  wrongestStatements: [
    { label: "Statement", field: "iname", formatFn: formatStatement },
    { label: "Total Score", field: "icount", type: "number" },
  ],
  decks: [
    { label: "Deck", field: "iname" },
    { label: "Played", field: "icount", type: "number" },
  ],
};
