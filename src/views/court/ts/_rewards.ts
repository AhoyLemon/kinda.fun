import type { RewardCard } from "./_types";

/**
 * Reward cards won after a successful trial. Two separate mechanics exist:
 *
 * deployPhase: 'trial'  — these appear in a UI box below the Playbook during the
 *                          trial phase and can be activated mid-argument.
 * deployPhase: 'recess' — these are shown on the "Activate Bonus" screen between
 *                          trials and take effect during the Recess event sequence.
 * deployPhase: 'either' — shown in both contexts.
 *
 * Cards saved but not deployed are burned at the end of the recess they apply to,
 * but they may be drawn again from the reward deck on a future win.
 */
export const rewardCards: RewardCard[] = [
  {
    id: "wheel-of-retirement",
    name: "Wheel of Retirement",
    description: "Randomly remove one justice from the bench. You do not get to choose who goes. The wheel decides.",
    flavorText: "The wheel has spun. Someone is about to discover they're 'spending more time with family.'",
    deployPhase: "recess",
  },
  {
    id: "not-enough-chairs",
    name: "Not Enough Chairs",
    description:
      "Reduce the number of available bench seats by 1. The bench is not immediately shrunk — the next time a justice leaves naturally, their seat is eliminated and will not be refilled.",
    flavorText: "Turns out the budget committee got to the furniture before you did.",
    deployPhase: "recess",
  },
  {
    id: "justice-veto",
    name: "Justice Veto",
    description:
      "The next presidential nomination will present two candidates. You choose which one joins the bench. The unchosen candidate is never nominated again.",
    flavorText: "The president has candidates. You have opinions. This time, your opinion wins.",
    deployPhase: "recess",
  },
  {
    id: "another-one",
    name: "Another One",
    description: "Add one additional seat to the bench. A new justice will be nominated to fill it immediately. This can be done multiple times.",
    flavorText: "DJ Khaled is somehow involved. We're not asking questions.",
    deployPhase: "recess",
  },
  {
    id: "glaze-homie",
    name: "Glaze Ya Robed Homie",
    description:
      "Target one justice. For the rest of the campaign, that justice starts every trial with an additional +20 in your favor on top of their normal starting lean.",
    flavorText: "You've cultivated a relationship. A very specific, ethics-violation-adjacent relationship.",
    deployPhase: "recess",
    requiresBenchTarget: true,
  },
  {
    id: "never-retire",
    name: "Never Retire, Never Die",
    description:
      "Target one justice. They will not die of natural causes or retire for the remainder of the campaign — unless forced by a player action (like Suggest Retirement or Wheel of Retirement).",
    flavorText: "Actuarial tables have been bribed.",
    deployPhase: "recess",
    requiresBenchTarget: true,
  },
  {
    id: "mutiny",
    name: "Mutiny!",
    description: "Randomly assign a new Chief Justice. You cannot control who ends up in charge — only that the current Chief will not be.",
    flavorText: "The vote was 8-1. You know whose dissent that was.",
    deployPhase: "recess",
  },
  {
    id: "dream-justice",
    name: "Dream Justice",
    description:
      "Select any eligible justice from across all pools. The next time a vacancy opens, that justice will fill it — regardless of who the president is. The most powerful card in the game.",
    flavorText: "Some dreams are achievable. This one just needs a vacancy.",
    deployPhase: "recess",
    requiresEligibleTarget: true,
  },
  {
    id: "double-tap",
    name: "Double Tap",
    description: "Activate during your turn. You may play two tactics this turn instead of one, after which this card is burned.",
    flavorText: "Objection. Sustained. Also, objection again.",
    deployPhase: "trial",
  },
];
