import type { ObjectiveCard } from "./_types";

/**
 * All objective cards. Two are drawn at the start of a campaign;
 * the player picks one to pursue. Failing the active objective
 * at any verdict is instant game over.
 *
 * "Left" and "Right" are used instead of party names since historical
 * party alignments vary, but parties are bucketed into left/right in
 * _tacticEffects.ts via leftParties / rightParties.
 */
export const objectives: ObjectiveCard[] = [
  {
    id: "win-all",
    name: "100% Win Rate",
    description: "Win every case. A single loss ends your campaign immediately.",
    flavorText: "Perfection is not a standard — it's the only acceptable outcome.",
  },
  {
    id: "five-four",
    name: "5-4",
    description: "Every verdict must be a one-vote margin (for or against). Any blowout verdict ends your campaign.",
    flavorText: "Close only counts in horseshoes, hand grenades, and apparently the Supreme Court.",
  },
  {
    id: "defend-the-law",
    name: "Defend The Law",
    description: "You must always represent the Defense. Attempting to choose Prosecution is disabled. You may lose once — a second loss ends the campaign.",
    flavorText: "The law is a shield. You are the arm behind it.",
    forcedSide: "defendant",
  },
  {
    id: "prosecute",
    name: "Prosecute & Persecute",
    description: "You must always represent the Prosecution. Attempting to choose Defense is disabled. You may lose once — a second loss ends the campaign.",
    flavorText: "The best defense is a relentless offense.",
    forcedSide: "prosecution",
  },
  {
    id: "lose-all",
    name: "The Biggest Loser",
    description: "Lose every case. If you accidentally win one, your campaign ends in disgrace.",
    flavorText: "You didn't come here to win. You came here to make a very specific and deliberate point.",
  },
  {
    id: "right-wing",
    name: "Right Wing Justice",
    description:
      "Every case must be decided in favor of the right-leaning party's preferred outcome. It doesn't matter which side you're on — just make sure the right wins.",
    flavorText: "The Constitution means exactly what it meant in 1789. Or thereabouts.",
  },
  {
    id: "left-wing",
    name: "Left Wing Justice",
    description:
      "Every case must be decided in favor of the left-leaning party's preferred outcome. It doesn't matter which side you're on — just make sure the left wins.",
    flavorText: "Progress never stops. Neither does this briefcase.",
  },
];
