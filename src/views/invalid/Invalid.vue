<script setup lang="ts">
  import { watch, nextTick, getCurrentInstance, onMounted } from "vue";
  import { POSITION } from "vue-toastification";
  import { useClientToast } from "@/shared/ts/_useClientToast";
  import MyToast from "./vue/MyToast.vue";
  import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    increment,
  } from "firebase/firestore";
  import { useClientFirestore } from "@/shared/ts/_useClientFirestore";
  import { randomFrom, shuffle, sendEvent } from "@/shared/js/_functions";
  import { my, round, ui, game, settings, rulePhrasings } from "./ts/_variables";
  import { musicLobby, musicFinalRound, soundNo, soundTooSlow, soundYouIdiot, soundCracked } from "./ts/_sounds";
  import { countVowels } from "./ts/_functions";
  import {
    isRuleButtonDisabled,
    clearCurrentRule,
    findPossibleRightAnswers,
    generateUniqueID,
  } from "./ts/_useInvalidHelpers";
  import { useInvalidComputeds } from "./ts/_useInvalidComputeds";
  import { useInvalidGame } from "./ts/_useInvalidGame";
  import type { CurrentRule, Rule } from "./ts/_types";
  import type { Challenge } from "./ts/_challenges";

  type RuleOption = {
    name: string;
    cost: number;
    naughty?: boolean;
    unique?: boolean;
  };

  // Are you in devMode?
  const devMode = import.meta.env.DEV;

  /////////////////////////////////////////////////////////
  // FIREBASE & FIRESTORE

  // Firebase/VueFire is client-only; guard so the landing screen prerenders.
  const db = useClientFirestore();
  const statsRef = db ? doc(db, `stats/invalid`) : null;
  // Toast is client-only. Callable stub because showMyToast calls toast(...) directly.
  const toast = useClientToast();

  // showMyToast wraps toast calls that use the MyToast component.
  // Keeping the .vue component reference out of plain .ts composables.
  const showMyToast = (
    title: string,
    message: string,
    type = "default",
    timeout = 5000,
    position: string = POSITION.BOTTOM_RIGHT,
    icon: boolean | undefined = undefined,
  ) => {
    const toastOptions: Record<string, unknown> = { type, timeout, position };
    if (icon !== undefined) toastOptions.icon = icon;
    toast({ component: MyToast, props: { title, message } }, toastOptions);
  };

  /////////////////////////////////////////////////////////
  // COMPOSABLES

  const {
    subscribeToRoom,
    subscribeToGameStatus,
    createRoom,
    joinRoom,
    joinRoomFromInput,
    savePlayerInfo,
    startTheGame,
    payForRule,
    definePossibleChallenges,
    chooseAChallenge,
    onboardEmployees,
    finishRules,
    tryThisPassword,
    updateCrackResults,
    setGameOver,
    startNextRoundClicked,
    updateRoomState,
  } = useInvalidGame(statsRef);

  const {
    computedAmIHost,
    computedSysAdminName,
    computedSysAdminIndex,
    hasEmojiInName,
    computedShibbolethRequired,
    computedUnclaimedPasswords,
    computedUncrackedPasswords,
    computedPlayersByScore,
    computedCheevos,
  } = useInvalidComputeds();

  /////////////////////////////////////////////////////////
  // FIREBASE SUBSCRIPTION WATCH

  watch(
    () => game.roomCode,
    async (newRoomCode, _oldRoomCode, onCleanup) => {
      if (newRoomCode) {
        try {
          const unsubscribeRoom = await subscribeToRoom(newRoomCode);
          const unsubscribeGameStatus = await subscribeToGameStatus(newRoomCode);
          onCleanup(() => {
            unsubscribeRoom();
            unsubscribeGameStatus();
          });
        } catch (error) {
          console.error("Error subscribing to room:", error);
        }
      }
    },
    { immediate: true },
  );

  /////////////////////////////////////////////////////////
  // VIDEO / MUSIC

  const watchVideo = () => {
    ui.watchingVideo = true;
    sendEvent("Invalid", "Instruction Video", game.currentlyInGame ? "Pregame Screen" : "Title Screen");
    if (ui.musicPlaying) musicLobby.volume(0);
  };

  const stopWatchingVideo = () => {
    ui.watchingVideo = false;
    if (ui.musicPlaying) musicLobby.volume(ui.musicHushed ? 0.05 : 0.6);
  };

  const toggleMusicVolume = () => {
    ui.musicHushed = !ui.musicHushed;
    if (ui.musicHushed) {
      musicLobby.volume(0.05);
      musicFinalRound.volume(0.1);
    } else {
      musicLobby.volume(0.6);
      musicFinalRound.volume(0.75);
    }
  };

  /////////////////////////////////////////////////////////
  // SYSADMIN — RULE SELECTION (kept here: uses MyToast)

  const chooseRule = async (rule: RuleOption) => {
    if (rule.name === "DROWSSAP") {
      await payForRule(rule.name, 3);
      round.rules.push({ type: "DROWSSAP", message: "Your password must be entered backwards. PASSWORD = DROWSSAP" });
      await updateRoomState({ currentRules: round.rules });
    } else if (rule.name === "Flying Pig") {
      await payForRule(rule.name, rule.cost);
      round.flyingPig.active = true;
      round.rules.push({ type: "Flying Pig", message: "Look at the flying pig." });
      await updateRoomState({ currentRules: round.rules, currentShibboleth: round.shibboleth, flyingPigActive: true });
    } else if (rule.name === "Peek At Answers") {
      const shuffledAnswers = shuffle((round.challenge as Challenge).possible);
      let answerHTML = "";
      for (let i = 0; i < 5; i++) answerHTML += "<li>" + shuffledAnswers[i] + "</li>";
      showMyToast(`5 Random ${(round.challenge as Challenge).name}`, `<ul>${answerHTML}</ul>`, "info", 50000, POSITION.TOP_RIGHT);
      await payForRule(rule.name, rule.cost);
      round.rules.push({ type: "Peek At Answers", message: my.name + " peeked at the answers", inputValue: "", inputValueTwo: "" });
      await updateRoomState({ currentRules: round.rules, currentShibboleth: round.shibboleth });
    } else if (rule.name === "Set A Maximum" || rule.name === "Set A Minimum" || rule.name === "Limit Vowels") {
      const r: Rule = { type: rule.name, message: "", inputValue: "", inputValueTwo: "" };
      if (rule.name === "Set A Maximum") {
        r.inputValue = round.averageSize + round.maxOffset;
        r.message = randomFrom(rulePhrasings.max);
      } else if (rule.name === "Set A Minimum") {
        r.inputValue = round.averageSize - round.minOffset;
        r.message = randomFrom(rulePhrasings.min);
      } else if (rule.name === "Limit Vowels") {
        r.inputValue = round.averageVowels + round.vowelOffset;
        r.message = randomFrom(rulePhrasings.vowels);
      }
      r.message = String(r.message)
        .replace("[SIZE]", String(r.inputValue))
        .replace("[SIZE+1]", String(Number(r.inputValue) + 1))
        .replace("[SIZE-1]", String(Number(r.inputValue) - 1));
      await payForRule(rule.name, rule.cost);
      round.rules.push(r);
      findPossibleRightAnswers(countVowels);
      await updateRoomState({ currentRules: round.rules, currentShibboleth: round.shibboleth });
    } else {
      ui.currentRule.name = rule.name;
      ui.currentRule.cost = rule.cost;
      ui.currentRule.editing = true;
    }
  };

  const saveRule = async (rule: CurrentRule) => {
    const r: Rule = { type: "", message: "", inputValue: "", inputValueTwo: null };
    if (rule.name === "Ban A Letter") {
      r.type = rule.name;
      r.inputValue = String(ui.currentRule.inputValue).toUpperCase();
      r.message = "You may not use the letter " + r.inputValue;
      try {
        const bannedLetterRef = doc(db, `stats/invalid/letters/${r.inputValue}`);
        await updateDoc(bannedLetterRef, { timesBanned: increment(1) }).catch(async () => {
          await setDoc(bannedLetterRef, { letter: r.inputValue, timesBanned: 1 });
        });
      } catch (err) {
        console.error(`Error updating banned letter stats for ${r.inputValue}:`, err);
      }
    } else if (rule.name === "Demand A Letter") {
      r.type = rule.name;
      r.inputValue = String(ui.currentRule.inputValue).toUpperCase();
      r.message = "You must use the letter " + r.inputValue;
      try {
        const demandLetterRef = doc(db, `stats/invalid/letters/${r.inputValue}`);
        await updateDoc(demandLetterRef, { timesDemanded: increment(1) }).catch(async () => {
          await setDoc(demandLetterRef, { letter: r.inputValue, timesDemanded: 1 });
        });
      } catch (err) {
        console.error(`Error updating demand letter stats for ${r.inputValue}:`, err);
      }
    } else if (rule.name === "Shibboleth") {
      r.type = rule.name;
      r.inputValue = ui.currentRule.inputValue;
      r.message = "Before entering a password, you must type " + r.inputValue;
      round.shibboleth = String(r.inputValue);
      try {
        const shibbolethRef = doc(db, `/stats/invalid/rules/Shibboleth/shibboleths/${r.inputValue}`);
        await updateDoc(shibbolethRef, { count: increment(1) }).catch(async () => {
          await setDoc(shibbolethRef, { name: r.inputValue, count: 1 });
        });
      } catch (err) {
        console.error(`Error updating shibboleth stats for ${r.inputValue}:`, err);
      }
    } else if (rule.name === "Set A Maximum") {
      r.type = rule.name;
      r.inputValue = round.averageSize + round.maxOffset;
      r.message = ui.currentRule.inputValue;
    } else if (rule.name === "Set A Minimum") {
      r.type = rule.name;
      r.inputValue = round.averageSize - round.minOffset;
      r.message = ui.currentRule.inputValue;
    } else if (rule.name === "Limit Vowels") {
      r.type = rule.name;
      r.inputValue = round.averageVowels + round.vowelOffset;
      r.message = ui.currentRule.inputValue;
    } else if (rule.name === "Ban A Combo") {
      r.type = rule.name;
      r.inputValue = String(ui.currentRule.inputValue).toUpperCase();
      r.inputValueTwo = String(ui.currentRule.inputValueTwo).toUpperCase();
      if (r.inputValue === r.inputValueTwo) {
        r.message = "You may only use the letter " + r.inputValue + " once";
      } else {
        r.message = "Your password cannot contain both " + r.inputValue + " and " + r.inputValueTwo + " (simultaneously)";
      }
    }

    round.rules.push(r);
    findPossibleRightAnswers(countVowels);

    if (round.possibleAnswerCount >= game.players.length) {
      await payForRule(rule.name, rule.cost);
      await updateRoomState({ currentRules: round.rules, currentShibboleth: round.shibboleth });
    } else {
      showMyToast("Error", "Sorry, this rule would make the game impossible. Rule undone.", "error");
      round.rules.pop();
      findPossibleRightAnswers(countVowels);
    }

    clearCurrentRule();
  };

  /////////////////////////////////////////////////////////
  // SYSADMIN — BUG SUBMISSION (kept here: uses MyToast)

  const addBug = async () => {
    ui.addBugErrors = [];
    const bug = String(ui.addBug).toUpperCase();
    const isDuplicate = round.bugs.some((b) => b.toUpperCase() === bug);
    const isValid = (round.challenge as Challenge).possible.some((p) => p.toUpperCase() === bug);

    const invalidBugMessages = [
      `<p><code>{BUG}</code> would not have been a valid password.</p><p>Our compliance robots have flagged this entry for further review, which will be ignored by the entire company, but you'll receive a number of emails about it.</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p><p>Please consult your company handbook, your supervisor, or the nearest sentient office plant for advice.</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p><p>The system has notified HR, IT, and your 5th grade teacher. Please review the challenge requirements, try again, and remember: every mistake is logged for posterity.</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p><p>Double-check your ruleset, your spelling, and your life choices.</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p><p>Refer to the official documentation, or at least tell your supervisor that you did</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p><p>The compliance department has asked that you provide valid passwords. For compliance, please use an approved password, or invent a new department to handle this situation.</p>`,
      `<p><code>{BUG}</code> would not have been a valid password.</p><p>Check your spelling, your company rules, and your horoscope.</p>`,
      `<p><code>{BUG}</code> is invalid for this round.</p><p>Hey, that's the name of the game! That's fun! :)</p>`,
      `<p><code>{BUG}</code> is invalid for this round.</p><p><code>{BUG}</code> has been flagged as "creative" but not "correct." We at BigCorp discourage creativity.</p>`,
    ];

    const duplicateBugMessages = [
      `<p><code>{BUG}</code> has already generated a bug for this round.</p><p>BigCorp appreciates your continued vigilance. For compliance purposes, your duplicate bug will still be logged and you will be charged accordingly. Please consult the official bug tracker for further updates, or just move on with your life.</p>`,
      `<p><code>{BUG}</code> is a duplicate bug entry.</p><p>You will still be charged for compliance, but not for originality.</p>`,
      `<p><code>{BUG}</code> was already submitted for this round.</p><p>BigCorp thanks you for your attention to detail. Please check the bug tracker for updates, or just pretend this never happened.</p>`,
      `<p><code>{BUG}</code> is a repeat entry.</p><p>Your duplicate will be processed, but not celebrated.</p>`,
      `<p><code>{BUG}</code> is already in the system.</p><p>No need to report it again, but your duplicate will be processed, charged, and possibly used as an example in next week's training video.</p>`,
      `<p><code>{BUG}</code> is already famous in our system. Further reports will be archived in the "Hall of Redundancy Hall."</p>`,
      `<p>You already added <code>{BUG}</code>, but your enthusiasm is noted. Please consult the bug tracker for updates, or just go get a snack.</p>`,
    ];

    if (!isValid && !isDuplicate) {
      const msg = invalidBugMessages[Math.floor(Math.random() * invalidBugMessages.length)].replace(/\{BUG\}/g, bug);
      showMyToast("", msg, "warning", 6000);
    }
    if (isDuplicate) {
      const msg = duplicateBugMessages[Math.floor(Math.random() * duplicateBugMessages.length)].replace(/\{BUG\}/g, bug);
      showMyToast("", msg, "warning", 6000);
    }

    if (round.bugs && round.bugs.length > 0) my.rulebux -= 1;
    ui.addBug = "";
    round.bugs.push(bug);
    await updateRoomState({ currentBugs: round.bugs });

    try {
      const bugRef = doc(db, `stats/invalid/bugs/${bug}`);
      const bugSnap = await getDoc(bugRef);
      if (bugSnap.exists()) {
        await updateDoc(bugRef, { timesCreated: increment(1), lastCreated: serverTimestamp() });
      } else {
        await setDoc(bugRef, { name: bug, timesCreated: 1, timesCrashed: 0, lastCreated: serverTimestamp() });
      }
    } catch (err) {
      console.error(`Error logging bug creation for ${bug}:`, err);
    }

    sendEvent("Invalid", "Add Bug", bug);
  };

  /////////////////////////////////////////////////////////
  // EMPLOYEE — PASTE PREVENTION (kept here: uses MyToast)

  const onPaste = (evt: ClipboardEvent) => {
    evt.preventDefault();
    my.score -= 10;
    game.players[my.playerIndex].score -= 10;
    showMyToast(
      "Pasting is disabled",
      `<p>BigCorp prevents any employee from pasting in passwords, for... uhhhhh... security reasons.</p><p>You have been docked 10 points for breaking this perfectly reasonable rule.</p>`,
      "error",
      8000,
      POSITION.BOTTOM_RIGHT,
      false,
    );
    return false;
  };

  /////////////////////////////////////////////////////////
  // FINAL ROUND — PASSWORD CRACKING (kept here: uses computedUnclaimedPasswords)

  const tryToCrackWith = async (attempt: string) => {
    attempt = attempt.toUpperCase();
    document.getElementById("PasswordAttempt")?.focus();

    ui.passwordAttempt = "";
    ui.passwordSuccessMessage = "";
    ui.passwordAttemptErrors = [];
    let pwMatch = false;
    let pwMatchErrorMessage: string | null = null;
    let pwPlayerIndex = -1;
    let matchIndex = -1;

    game.allEmployeePasswords.forEach((p, i) => {
      if (p.pw.replace(/[^0-9a-z]/gi, "") === attempt.replace(/[^0-9a-z]/gi, "")) {
        pwMatch = true;
        if (p.claimed) {
          if (p.claimed === my.name || p.playerIndex === my.playerIndex) {
            soundNo.play();
            pwMatchErrorMessage = "This password was already cracked by you.";
          } else {
            soundTooSlow.play();
            pwMatchErrorMessage = "This password was already cracked by " + p.claimed;
          }
        } else if (p.name === my.name || p.playerIndex === my.playerIndex) {
          soundYouIdiot.play();
          pwMatchErrorMessage = "You just hacked into your own account. Did you mean to do that?";
          game.players[my.playerIndex].score += settings.points.forCrackingOwnPassword;
          game.allEmployeePasswords[i].claimed = my.name;
          updateCrackResults({ pw: attempt, attackerIndex: my.playerIndex, victimIndex: my.playerIndex });
          if (computedUnclaimedPasswords.value < 1) setGameOver();
        } else {
          pwPlayerIndex = p.playerIndex;
          matchIndex = i;
        }
      }
    });

    if (pwMatchErrorMessage) {
      ui.passwordAttemptErrors.push(pwMatchErrorMessage);
    } else if (!pwMatch) {
      soundNo.play();
      ui.passwordAttemptErrors.push("There is no employee with the password " + attempt);
    } else if (pwMatch && pwPlayerIndex !== -1) {
      soundCracked.play();
      ui.passwordSuccessMessage = "The password " + attempt + " belongs to " + game.players[pwPlayerIndex].name;
      game.players[my.playerIndex].score += settings.points.forCrackingPassword;
      game.players[pwPlayerIndex].score += settings.points.forHavingPasswordCracked;
      game.allEmployeePasswords[matchIndex].claimed = my.name;
      await updateCrackResults({ pw: attempt, attackerIndex: my.playerIndex, victimIndex: pwPlayerIndex });
      sendEvent("Invalid", "Password Cracked", attempt);
      if (computedUnclaimedPasswords.value < 1) setGameOver();
    }
    document.getElementById("PasswordAttempt")?.focus();
  };

  /////////////////////////////////////////////////////////
  // DIRECTIVES

  const vFocus = {
    mounted(el: HTMLElement) {
      el.focus();
    },
  };

  /////////////////////////////////////////////////////////
  // LIFECYCLE

  watch(
    () => computedShibbolethRequired.value,
    (newValue, oldValue) => {
      nextTick(() => {
        if (newValue === true && oldValue === false) {
          document.getElementById("ShibbolethInput")?.focus();
        } else if (oldValue === true && newValue === false) {
          document.getElementById("PasswordAttempt")?.focus();
        }
      });
    },
  );


  onMounted(() => {
    let playerID = localStorage.getItem("kindaFunPlayerID");
    const playerName = localStorage.getItem("kindaFunPlayerName");
    if (!playerID) {
      playerID = generateUniqueID();
      localStorage.setItem("kindaFunPlayerID", playerID);
    }
    if (playerName) {
      my.name = playerName;
      ui.nameInput = playerName;
    }
    my.playerID = playerID;

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("create")) {
      createRoom();
    } else if (urlParams.has("room")) {
      const roomCode = urlParams.get("room") || "";
      ui.roomCodeInput = roomCode.toUpperCase();
      nextTick(() => {
        document.getElementById("SubmitRoomCodeButton")?.focus();
      });
    } else if (urlParams.has("join")) {
      document.getElementById("EnterRoomCode")?.focus();
    }
    if (urlParams.has("ref")) {
      sendEvent("Invalid", "Ref", urlParams.get("ref") ?? "");
    }

    const instance = getCurrentInstance();
    if (instance) {
      instance.appContext.app.directive("focus", vFocus);
    }
  });
</script>
<template lang="pug" src="./Invalid.pug"></template>
<style lang="scss" src="./Invalid.scss"></style>
