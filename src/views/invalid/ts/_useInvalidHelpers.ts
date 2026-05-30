// Pure helpers (parameterised — usable both inside _useInvalidGame.ts and Invalid.vue) plus
// stateful helpers that close over the shared reactive state from _variables.ts.

import { randomFrom } from "@/shared/js/_functions";
import { my, round, ui, game, settings, defaults, flyingPigLines } from "./_variables";
import { soundOink } from "./_sounds";
import type { Rule, EmployeePassword, LetterCount } from "./_types";
import type { Challenge } from "./_challenges";

// ── Pure helpers ─────────────────────────────────────────────────────────────

/** Convert Firestore phase names (with dashes) to template phase names. */
export function convertPhaseToTemplate(firestorePhase: string): string {
  switch (firestorePhase) {
    case "choose-rules":
      return "choose rules";
    case "create-password":
      return "create password";
    case "final-round":
      return "FINAL ROUND";
    case "game-over":
      return "GAME OVER";
    default:
      return firestorePhase;
  }
}

export function generateUniqueID(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/* eslint-disable no-unused-vars */
type CountVowelsFn = (word: string) => number;
/* eslint-enable no-unused-vars */

export function tryToFailThis(
  attempt: string,
  rules: Rule[],
  countVowelsFn: CountVowelsFn,
): false | { failed: true; reasons: string[] } {
  attempt = attempt.toUpperCase();
  let attemptFailed = false;
  const attemptFailedReasons: string[] = [];

  rules.forEach((r) => {
    if (r.type === "Ban A Letter") {
      if (attempt.includes(String(r.inputValue))) {
        attemptFailed = true;
        attemptFailedReasons.push("Password cannot contain " + r.inputValue);
      }
    }
    if (r.type === "Demand A Letter") {
      if (!attempt.includes(String(r.inputValue))) {
        attemptFailed = true;
        attemptFailedReasons.push("Password must contain " + r.inputValue);
      }
    }
    if (r.type === "Set A Maximum") {
      if (attempt.length > Number(r.inputValue)) {
        attemptFailed = true;
        attemptFailedReasons.push("Password is too long");
      }
    }
    if (r.type === "Set A Minimum") {
      if (attempt.length < Number(r.inputValue)) {
        attemptFailed = true;
        attemptFailedReasons.push("Password is too short");
      }
    }
    if (r.type === "Limit Vowels") {
      if (countVowelsFn(attempt) > Number(r.inputValue)) {
        attemptFailed = true;
        attemptFailedReasons.push("Password has too many vowels");
      }
    }
    if (r.type === "Ban A Combo") {
      if (r.inputValue === r.inputValueTwo) {
        const letterPattern = new RegExp("[^" + r.inputValue + "]", "g");
        if (attempt.replace(letterPattern, "").length > 1) {
          attemptFailed = true;
          attemptFailedReasons.push("Password can only contain one " + r.inputValue);
        }
      } else if (r.inputValue !== r.inputValueTwo) {
        if (attempt.includes(String(r.inputValue)) && attempt.includes(String(r.inputValueTwo))) {
          attemptFailed = true;
          attemptFailedReasons.push("Password cannot contain both the letters " + r.inputValue + " and " + r.inputValueTwo);
        }
      }
    }
  });

  return attemptFailed ? { failed: true, reasons: attemptFailedReasons } : false;
}

export function tryToCrashWith(attempt: string, bugs: string[]): boolean {
  return bugs.some((bug) => bug === attempt);
}

export function tryToFindDuplicatePassword(attempt: string, allEmployeePasswords: EmployeePassword[]): boolean {
  attempt = attempt.toUpperCase();
  return allEmployeePasswords.some(
    (empPW) => attempt.replace(/[^0-9a-z]/gi, "") === empPW.pw.toUpperCase().replace(/[^0-9a-z]/gi, ""),
  );
}

export function tryToFind(attempt: string, possible: string[]): boolean {
  attempt = attempt.toUpperCase();
  return possible.some((possibility) => attempt.replace(/[^0-9a-z]/gi, "") === possibility.toUpperCase().replace(/[^0-9a-z]/gi, ""));
}

export function findAverageSize(possible: string[]): number {
  const total = possible.reduce((sum, p) => sum + p.length, 0);
  return Math.round(total / possible.length);
}

export function findAverageVowelCount(possible: string[]): number {
  let total = 0;
  for (const word of possible) {
    const matches = word.match(/[aeiou]/gi);
    if (matches) total += matches.length;
  }
  return Math.round(total / possible.length);
}

export function countLettersInEachWord(
  possible: string[],
  playerCount: number,
): { letterCounts: LetterCount[]; demandableLetters: string[] } {
  const allLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const letterCounts: LetterCount[] = allLetters.map((l) => ({
    letter: l,
    count: possible.filter((p) => p.toUpperCase().includes(l)).length,
  }));
  const demandableLetters = letterCounts.filter((lc) => lc.count >= playerCount + 2).map((lc) => lc.letter);
  return { letterCounts, demandableLetters };
}

// ── Stateful helpers (close over reactive state from _variables.ts) ──────────

/** Whether a rule button should be disabled for the current SysAdmin. */
export function isRuleButtonDisabled(ruleName: string, ruleCost: number, ruleUnique: boolean): boolean {
  if (my.rulebux < ruleCost) return true;
  if (ui.currentRule.editing) return true;
  if (ruleUnique && round.rules.some((r) => r.type === ruleName)) return true;
  return false;
}

export function clearCurrentRule(): void {
  ui.currentRule.name = "";
  ui.currentRule.inputValue = "";
  ui.currentRule.inputValueTwo = "";
  ui.currentRule.cost = 0;
  ui.currentRule.editing = false;
}

/** Re-count the number of possible right answers given current rules. */
export function findPossibleRightAnswers(countVowelsFn: CountVowelsFn): void {
  let possibleAnswerCount = 0;
  (round.challenge as Challenge).possible.forEach((possibility) => {
    if (tryToFailThis(possibility, round.rules, countVowelsFn) === false) {
      possibleAnswerCount++;
    }
  });
  round.possibleAnswerCount = possibleAnswerCount;
}

// ── Timer resets ─────────────────────────────────────────────────────────────

export function resetRoundTimer(): void {
  clearInterval(round.roundTimer);
  round.roundTimer = undefined;
}

export function resetHurryTimer(): void {
  clearInterval(round.hurryTimer);
  round.hurryTimer = undefined;
  round.hurryTime = defaults.hurryTime;
}

export function resetAdminTimer(): void {
  clearInterval(round.adminTimer);
  round.adminTimer = undefined;
  round.adminTimeLeft = defaults.adminTimeLeft;
}

// ── Flying Pig ────────────────────────────────────────────────────────────────

export function summonTheFlyingPig(): void {
  round.flyingPig.active = true;
  if (my.role === "employee") {
    round.flyingPig.message = randomFrom(flyingPigLines.intro);
  }
}

export function killThePig(): void {
  round.flyingPig.active = false;
  clearInterval(round.flyingPig.timer);
  round.flyingPig.timer = undefined;
}

// Kick off the flying pig's periodic message loop during password-creation phase.
export function startFlyingPigTimer(): void {
  if (!round.flyingPig.active || my.role !== "employee") return;
  if (round.phase === "create password") {
    round.flyingPig.message = randomFrom(flyingPigLines.guessing);
  }
  round.flyingPig.timer = setInterval(() => {
    if (!round.flyingPig.active) {
      clearInterval(round.flyingPig.timer);
      round.flyingPig.timer = undefined;
    } else if (round.phase === "create password") {
      round.flyingPig.message = randomFrom(flyingPigLines.guessing);
      soundOink.play();
    }
  }, 6501);
}

// Re-export settings so _useInvalidGame.ts has one import point for game state.
export { my, round, ui, game, settings, defaults };
