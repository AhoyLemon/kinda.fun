export const gameSettings = {
  questionsPerGame: 10,
  pointsForCorrect: 100,
  pointsForWrong: -25,
  timePerQuestion: 30, // seconds
  multipleChoiceOptions: 4,
  minDifficulty: "easy",
  maxDifficulty: "hard"
};

export const difficultySettings = {
  easy: {
    multiplier: 1,
    label: "Easy Peasy",
    description: "Well-known celebrity baby names"
  },
  medium: {
    multiplier: 1.5,
    label: "Getting Weird",
    description: "More obscure celebrity choices"
  },
  hard: {
    multiplier: 2,
    label: "Absolutely Bonkers",
    description: "The most ridiculous names imaginable"
  }
};

export const gamePhases = {
  TITLE: "title",
  PLAYING: "playing", 
  QUESTION: "question",
  ANSWER: "answer",
  GAME_OVER: "game-over"
};

export const feedbackMessages = {
  correct: [
    "Nailed it! You know your celebrity baby names!",
    "Exactly right! That's definitely their kid!",
    "Boom! You're a celebrity baby name expert!",
    "Perfect! You've been paying attention to the tabloids!",
    "Spot on! That name is indeed that ridiculous!"
  ],
  wrong: [
    "Oops! That's not quite right!",
    "Nope! But good guess!",
    "Not this time! Try again!",
    "Close, but no cigar!",
    "Swing and a miss! Better luck next time!"
  ],
  timeUp: [
    "Time's up! Think faster next time!",
    "Too slow! The clock beat you!",
    "Tick tock! Time ran out!",
    "Speed up! Time waits for no one!"
  ]
};