import type { CampaignSetup } from "./_types";
import { PRES_TRUMP, PRES_NIXON, PRES_OBAMA, PRES_BIDEN, PRES_EISENHOWER, PRES_LBJ, PRES_SNOOP_DOGG, PRES_VERMIN_SUPREME } from "./_presidents";

/**
 * Pre-defined campaign configurations.
 *
 * Fixed campaigns specify exact justiceIds, chiefJusticeId, and caseIds.
 * Random campaigns use isRandomBench / isRandomDocket with pool restrictions.
 *
 * Justice IDs reference entries in _justices.ts.
 * Case IDs reference entries in _cases.ts (historical 1–23, fictional 101–120).
 *
 * President constants are imported from _presidents.ts.
 */
export const campaignSetups: CampaignSetup[] = [
  {
    id: 1,
    name: "Current Court",
    description: "The year is 2020. Donald Trump is the president and he just appointed Amy Coney Barrett to the bench. History awaits your revision.",
    startYear: 2020,
    startPresident: PRES_TRUMP,
    chiefJusticeId: 1, // John Roberts
    justiceIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    // Cases listed newest → oldest, a backwards-through-history campaign
    caseIds: [23, 21, 4, 22, 16],
  },
  {
    id: 5,
    name: "Love Is The Law",
    description: "A campaign through the Supreme Court's landmark gay rights cases. Can you secure dignity and equality, or will history repeat itself?",
    startYear: 2015,
    startPresident: PRES_OBAMA,
    chiefJusticeId: 13, // Antonin Scalia (as Chief for this campaign)
    // Scalia (Chief), Kennedy, RBG, Sotomayor, Alito, Thomas, Rehnquist, Byron White, O'Connor
    justiceIds: [13, 71, 11, 4, 3, 2, 12, 16, 14],
    // Cases in chronological order: Bowers (1986), Romer (1996), Lawrence (2003), Obergefell (2015), Masterpiece (2018)
    caseIds: [24, 25, 26, 7, 21],
  },
  {
    id: 2,
    name: "The Warren Court",
    description: "The year is 1968. Earl Warren presides. The media calls your justices 'activists.' Prove them right — or wrong.",
    startYear: 1968,
    startPresident: PRES_NIXON,
    chiefJusticeId: 53, // Earl Warren
    justiceIds: [53, 17, 60, 61, 62, 63, 16, 64, 10],
    caseIds: [2, 5, 14, 12, 19],
  },
  {
    id: 3,
    name: "Fantasy Campaign",
    description:
      "An alternate universe. It's the turn of the century and the bench is populated by celebrities and fictional characters. What kind of American law will you be responsible for?",
    startYear: 1900,
    startPresident: PRES_SNOOP_DOGG,
    isRandomBench: true,
    justicePool: ["fictional", "celebrity"],
    casePool: ["historical"],
    isRandomPresident: true,
  },
  {
    id: 4,
    name: "Pure Chaos",
    description: "Year unknown. Bench: unpredictable. Cases: whatever they feel like. President: unknowable. Good luck. You will absolutely need it.",
    startYear: 2000,
    startPresident: PRES_VERMIN_SUPREME,
    isRandomBench: true,
    isRandomPresident: true,
    isRandomStartYear: true,
  },
];
