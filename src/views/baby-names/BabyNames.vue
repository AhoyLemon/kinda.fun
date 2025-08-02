<script setup>
  import { reactive, computed, onMounted, ref } from "vue";
  import { 
    randomNumber,
    randomFrom,
    shuffle,
    addCommas,
    sendEvent
  } from "@/shared/js/_functions.js";
  
  import { celebrityBabyNames, celebrityOptions } from "./js/_baby-names-data.js";
  import { gameSettings, difficultySettings, gamePhases, feedbackMessages } from "./js/_settings.js";
  
  // Expose imported data for template use
  const { questionsPerGame, pointsForCorrect, pointsForWrong, timePerQuestion, multipleChoiceOptions } = gameSettings;
  
  // Firebase & VueFire Stuff
  import { doc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
  import { useFirestore } from "vuefire";
  
  // Handle Firebase being unavailable
  let db, statsRef;
  try {
    db = useFirestore();
    statsRef = doc(db, `stats/baby-names`);
  } catch (error) {
    console.warn("Firebase Firestore not available:", error.message);
    db = null;
    statsRef = null;
  }

  // Game state
  const game = reactive({
    phase: "title",
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    currentQuestionIndex: 0,
    questions: [],
    timeLeft: 0,
    timer: null,
    difficulty: "medium"
  });

  const currentQuestion = reactive({
    babyName: "",
    correctParents: "",
    options: [],
    correctAnswer: "",
    selectedAnswer: "",
    isCorrect: false,
    explanation: "",
    difficulty: ""
  });

  const ui = reactive({
    showAnswer: false,
    showNextButton: false,
    feedback: "",
    feedbackClass: "",
    answersLocked: false,
    showDifficultySelector: false
  });

  // Computed properties
  const progressPercentage = computed(() => {
    return (game.questionsAnswered / questionsPerGame) * 100;
  });

  const difficultyLabel = computed(() => {
    return difficultySettings[game.difficulty]?.label || "Medium";
  });

  const finalScore = computed(() => {
    return Math.max(0, game.score);
  });

  const accuracy = computed(() => {
    if (game.questionsAnswered === 0) return 0;
    return Math.round((game.correctAnswers / game.questionsAnswered) * 100);
  });

  // Game functions
  const startGame = () => {
    resetGame();
    generateQuestions();
    game.phase = "playing";
    nextQuestion();
    logGameStart();
    sendEvent("Baby Names", "Game Started", game.difficulty);
  };

  const resetGame = () => {
    game.score = 0;
    game.questionsAnswered = 0;
    game.correctAnswers = 0;
    game.currentQuestionIndex = 0;
    game.questions = [];
    clearTimer();
  };

  const generateQuestions = () => {
    // Filter baby names by difficulty if not "all"
    let availableNames = [...celebrityBabyNames];
    if (game.difficulty !== "all") {
      availableNames = availableNames.filter(name => name.difficulty === game.difficulty);
    }
    
    // Shuffle and take the number we need
    const shuffledNames = shuffle(availableNames);
    game.questions = shuffledNames.slice(0, questionsPerGame);
  };

  const nextQuestion = () => {
    if (game.currentQuestionIndex >= game.questions.length) {
      endGame();
      return;
    }

    const question = game.questions[game.currentQuestionIndex];
    setupQuestion(question);
    startTimer();
  };

  const setupQuestion = (question) => {
    currentQuestion.babyName = question.babyName;
    currentQuestion.correctParents = `${question.parent1} & ${question.parent2}`;
    currentQuestion.correctAnswer = currentQuestion.correctParents;
    currentQuestion.explanation = question.explanation;
    currentQuestion.difficulty = question.difficulty;
    currentQuestion.selectedAnswer = "";
    currentQuestion.isCorrect = false;

    // Generate multiple choice options
    const wrongOptions = shuffle(celebrityOptions.filter(option => option !== currentQuestion.correctParents))
      .slice(0, multipleChoiceOptions - 1);
    
    const allOptions = [currentQuestion.correctParents, ...wrongOptions];
    currentQuestion.options = shuffle(allOptions);

    // Reset UI
    ui.showAnswer = false;
    ui.showNextButton = false;
    ui.feedback = "";
    ui.answersLocked = false;
    game.phase = "question";
  };

  const selectAnswer = (answer) => {
    if (ui.answersLocked) return;
    
    currentQuestion.selectedAnswer = answer;
    currentQuestion.isCorrect = answer === currentQuestion.correctAnswer;
    
    ui.answersLocked = true;
    clearTimer();
    
    processAnswer();
  };

  const processAnswer = () => {
    game.questionsAnswered++;
    
    if (currentQuestion.isCorrect) {
      game.correctAnswers++;
      const points = Math.round(pointsForCorrect * difficultySettings[currentQuestion.difficulty].multiplier);
      game.score += points;
      ui.feedback = randomFrom(feedbackMessages.correct);
      ui.feedbackClass = "correct";
      sendEvent("Baby Names", "Correct Answer", currentQuestion.babyName);
    } else {
      game.score += pointsForWrong;
      ui.feedback = randomFrom(feedbackMessages.wrong);
      ui.feedbackClass = "wrong";
      sendEvent("Baby Names", "Wrong Answer", currentQuestion.babyName);
    }
    
    ui.showAnswer = true;
    ui.showNextButton = true;
    game.phase = "answer";
  };

  const continueGame = () => {
    game.currentQuestionIndex++;
    nextQuestion();
  };

  const endGame = () => {
    clearTimer();
    game.phase = "game-over";
    logGameEnd();
    sendEvent("Baby Names", "Game Finished", `Score: ${finalScore.value}, Accuracy: ${accuracy.value}%`);
  };

  const startTimer = () => {
    game.timeLeft = timePerQuestion;
    game.timer = setInterval(() => {
      game.timeLeft--;
      if (game.timeLeft <= 0) {
        timeUp();
      }
    }, 1000);
  };

  const clearTimer = () => {
    if (game.timer) {
      clearInterval(game.timer);
      game.timer = null;
    }
  };

  const timeUp = () => {
    if (ui.answersLocked) return;
    
    ui.answersLocked = true;
    clearTimer();
    
    currentQuestion.selectedAnswer = "";
    currentQuestion.isCorrect = false;
    
    game.questionsAnswered++;
    game.score += pointsForWrong;
    
    ui.feedback = randomFrom(feedbackMessages.timeUp);
    ui.feedbackClass = "time-up";
    ui.showAnswer = true;
    ui.showNextButton = true;
    game.phase = "answer";
    
    sendEvent("Baby Names", "Time Up", currentQuestion.babyName);
  };

  const selectDifficulty = (difficulty) => {
    game.difficulty = difficulty;
    ui.showDifficultySelector = false;
  };

  const showDifficultySelector = () => {
    ui.showDifficultySelector = true;
  };

  const restartGame = () => {
    game.phase = "title";
  };

  // Firebase logging
  const logGameStart = async () => {
    if (!statsRef) return; // Skip if Firebase not available
    try {
      await updateDoc(statsRef, {
        gamesStarted: increment(1),
        lastGameStarted: serverTimestamp()
      });
    } catch (error) {
      console.error("Error logging game start:", error);
    }
  };

  const logGameEnd = async () => {
    if (!statsRef) return; // Skip if Firebase not available
    try {
      await updateDoc(statsRef, {
        gamesFinished: increment(1),
        lastGameFinished: serverTimestamp(),
        totalScore: increment(finalScore.value),
        totalQuestions: increment(game.questionsAnswered),
        totalCorrect: increment(game.correctAnswers)
      });
    } catch (error) {
      console.error("Error logging game end:", error);
    }
  };

  // Lifecycle
  onMounted(() => {
    // Initialize any startup logic if needed
  });
</script>

<template lang="pug" src="./BabyNames.pug"></template>
<style lang="scss" src="./BabyNames.scss"></style>