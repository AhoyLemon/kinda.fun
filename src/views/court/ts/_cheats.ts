// ─── Dev-Only Cheat Configuration ────────────────────────────────────────────
// This file is ONLY active in development builds.
// `cheatsActive` is always false in production regardless of `isActive`.

/** Set to true during development to enable cheat features. */
const _isDev = import.meta.env.DEV;

export const cheats = {
  /** Master switch. Has no effect in production builds. */
  isActive: true,

  /** If true, the tactic deck is shuffled normally. If false, tacticOrder controls what comes first. */
  shuffleTactics: true,
  /** Tactic IDs (numeric) that will be placed at the front of the deck, in this order. */
  tacticOrder: [5, 9, 11, 13],

  /** If true, the reward deck is shuffled normally. If false, bonusOrder controls what comes first. */
  shuffleBonus: false,
  /** RewardCard IDs that will be placed at the front of the reward deck, in this order.
   *  Valid IDs: "wheel-of-retirement" | "not-enough-chairs" | "justice-veto" | "another-one"
   *           | "glaze-homie" | "never-retire" | "mutiny" | "dream-justice" | "double-tap" */
  bonusOrder: ["dream-justice", "not-enough-chairs", "justice-veto", "dream-justice", "double-tap"],

  /** If true, objectives are shuffled normally. If false, objectiveOrder controls the pair drawn. */
  shuffleObjectives: false,
  /** ObjectiveCard IDs for the two objectives offered on objective-draw, in this order.
   *  Valid IDs: "win-all" | "five-four" | "defend-the-law" | "prosecute"
   *           | "lose-all" | "right-wing" | "left-wing" */
  objectiveOrder: ["win-all", "left-wing"],
};

/** True only in Vite dev builds when cheats.isActive is set. Always false in production. */
export const cheatsActive: boolean = _isDev && cheats.isActive;
