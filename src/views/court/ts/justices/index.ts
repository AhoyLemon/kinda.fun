import { Justice } from "../_types";
import { currentJustices } from "./_justicesCurrent";
import { historicalJustices } from "./_justicesHistorical";
import { fictionalJustices } from "./_justicesFictional";
import { celebrityJustices } from "./_justicesCelebrity";
import { warrenJustices } from "./_justicesWarren";
import { lochnerJustices } from "./_justicesLochner";

export { currentJustices } from "./_justicesCurrent";
export { historicalJustices } from "./_justicesHistorical";
export { fictionalJustices } from "./_justicesFictional";
export { celebrityJustices } from "./_justicesCelebrity";
export { warrenJustices } from "./_justicesWarren";
export { lochnerJustices } from "./_justicesLochner";

export const justices: Justice[] = [...currentJustices, ...historicalJustices, ...fictionalJustices, ...celebrityJustices];

// ────────────────────────────────────────────────────────────
// PRESET BENCH CONFIGS
// ────────────────────────────────────────────────────────────

export interface PresetBenchConfig {
  id: string;
  name: string;
  description: string;
  year?: number;
  icon: string;
  chiefJusticeId: number;
  justiceIds: number[];
  casePool: "historical" | "fictional" | "any";
}

export const presetBenchConfigs: PresetBenchConfig[] = [
  {
    id: "current",
    name: "The Current Court",
    description:
      "The current Supreme Court of the United States. Six conservatives, three liberals, and one Chief Justice desperately trying to preserve the institution's credibility while the institution disagrees.",
    year: 2026,
    icon: "🏛️",
    chiefJusticeId: 1, // John Roberts
    justiceIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    casePool: "historical",
  },
  {
    id: "warren-court",
    name: "The Warren Court",
    description:
      "Known for its historic activism in expanding civil rights, civil liberties, judicial power, and federal authority. Brown v. Board. Miranda. Roe. The most consequential liberal court in US history — extended here to include Nixon's greatest regret.",
    year: 1972,
    icon: "✊",
    chiefJusticeId: 53, // Earl Warren
    // Earl Warren, Hugo Black, William O. Douglas, Harry Blackmun, Brennan, Potter Stewart, Byron White, Abe Fortas, Thurgood Marshall
    justiceIds: [53, 17, 60, 72, 62, 63, 16, 64, 10],
    casePool: "historical",
  },
  {
    id: "lochner-era",
    name: "The Early Lochner Era",
    description:
      "Known for its emphasis on economic liberty and hostility to government regulation. Struck down minimum wage laws, child labor limits, and worker protections with cheerful regularity.",
    year: 1905,
    icon: "🏭",
    chiefJusticeId: 65, // Melville Fuller
    // Fuller, John Marshall Harlan, Brewer, Henry Brown, Edward White, Peckham, McKenna, Holmes, Day
    justiceIds: [65, 52, 66, 55, 67, 68, 69, 18, 70],
    casePool: "historical",
  },
  {
    id: "court-from-hell",
    name: "The Court From Hell",
    description: "This is not the bench you want. This is not the bench you deserve. And yet, this is the bench you have to work with.",
    icon: "😈",
    chiefJusticeId: 29, // Peter Thiel
    // Thiel, Thomas, Scalia, Kavanaugh, Dredd, Mr. Beast, SVU Box Set, Rehnquist, Taney
    justiceIds: [29, 2, 13, 7, 21, 56, 38, 12, 54],
    casePool: "any",
  },
];
