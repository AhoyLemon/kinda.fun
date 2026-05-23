import fs from "fs";
import path from "path";
import chalk from "chalk";
import Table from "cli-table3";

const OUTPUT_PATH = "./src/views/guillotine/js/data/_school-data.ts";

const STATE_CODES: Record<string, string> = {
  "District of Columbia": "DC",
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "Florida": "FL",
  "Georgia": "GA",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Pennsylvania": "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY",
};

interface SchoolEntry {
  state: string;
  stateCode: string;
  perStudent: number;
  averageStudents: number;
}

interface WprStateEntry {
  state: string;
  code: string;
  K12PerPupilAnnualSpendingByState_2025?: number;
  [key: string]: unknown;
}

async function scrapePerStudentSpending(): Promise<Map<string, number>> {
  const url = "https://worldpopulationreview.com/state-rankings/per-pupil-spending-by-state";
  console.log(chalk.dim(`  → ${url}`));

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} from spending source`);

  const html = await res.text();

  // Data is embedded as a JSON array in the page HTML
  const match = html.match(/\[{"state":"Alabama".*?\}\]/s);
  if (!match) throw new Error("Could not locate embedded JSON data on spending source page");

  const entries = JSON.parse(match[0]) as WprStateEntry[];
  const map = new Map<string, number>();

  for (const entry of entries) {
    const amount = entry.K12PerPupilAnnualSpendingByState_2025;
    if (entry.state && typeof amount === "number") {
      map.set(entry.state, amount);
    }
  }

  return map;
}

async function scrapeAverageStudents(): Promise<Map<string, number>> {
  const url = "https://www.publicschoolreview.com/average-school-size-stats/national-data";
  console.log(chalk.dim(`  → ${url}`));

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} from school size source`);

  const html = await res.text();

  // Data is embedded as a JS array of tuples: ['StateName', avgStudents, 'slug']
  const matches = [...html.matchAll(/\['([^']+)',\s*(\d+),\s*'[^']+'\]/g)];
  if (matches.length === 0) throw new Error("Could not locate embedded data on school size source page");

  const map = new Map<string, number>();

  for (const m of matches) {
    const rawName = m[1];
    const amount = parseInt(m[2], 10);
    // Normalize title-case artifacts: "District Of Columbia" → "District of Columbia"
    const name = rawName.replace(/\b(Of|The|And|In|At)\b/g, (w) => w.toLowerCase());
    if (name && !isNaN(amount)) {
      map.set(name, amount);
    }
  }

  return map;
}

function generateTs(entries: SchoolEntry[]): string {
  const rows = entries
    .map((e) => `  { state: "${e.state}", stateCode: "${e.stateCode}", perStudent: ${e.perStudent}, averageStudents: ${e.averageStudents} },`)
    .join("\n");

  return `// Data sources:
// perStudent:      https://worldpopulationreview.com/state-rankings/per-pupil-spending-by-state (2025)
// averageStudents: https://www.publicschoolreview.com/average-school-size-stats/national-data (2026)

export interface SchoolData {
  state: string;
  stateCode: string;
  perStudent: number;
  averageStudents: number;
}

export const schoolData: SchoolData[] = [
${rows}
];
`;
}

async function main() {
  console.log(chalk.bold.blue("\n🏫 School Data Scraper\n"));

  console.log(chalk.white("Fetching per-pupil spending data…"));
  const spendingMap = await scrapePerStudentSpending();
  console.log(chalk.green(`  ✓ ${spendingMap.size} states found\n`));

  console.log(chalk.white("Fetching average school size data…"));
  const sizeMap = await scrapeAverageStudents();
  console.log(chalk.green(`  ✓ ${sizeMap.size} states found\n`));

  console.log(chalk.white("Merging data…"));
  const entries: SchoolEntry[] = [];
  const warnings: string[] = [];

  for (const [state, stateCode] of Object.entries(STATE_CODES)) {
    const perStudent = spendingMap.get(state);
    const averageStudents = sizeMap.get(state);

    if (!perStudent) warnings.push(`  ⚠ No spending data for: ${state}`);
    if (!averageStudents) warnings.push(`  ⚠ No school size data for: ${state}`);

    if (perStudent && averageStudents) {
      entries.push({ state, stateCode, perStudent, averageStudents });
    }
  }

  if (warnings.length > 0) {
    console.log(chalk.yellow(warnings.join("\n")));
  }

  const ts = generateTs(entries);
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, ts, "utf8");

  const table = new Table({
    head: [chalk.white("Stat"), chalk.white("Value")],
    style: { head: [] },
  });
  table.push(["Output", chalk.gray(OUTPUT_PATH)]);
  table.push(["States written", chalk.yellow(entries.length.toString())]);
  table.push(["Warnings", warnings.length > 0 ? chalk.yellow(warnings.length.toString()) : chalk.green("0")]);

  const bySpending = [...entries].sort((a, b) => b.perStudent - a.perStudent);
  table.push(["Highest spending", `${bySpending[0].state} ${chalk.green(`$${bySpending[0].perStudent.toLocaleString()}`)}`]);
  table.push(["Lowest spending", `${bySpending[bySpending.length - 1].state} ${chalk.green(`$${bySpending[bySpending.length - 1].perStudent.toLocaleString()}`)}`]);

  console.log("\n" + table.toString());
  console.log(chalk.bold.green("\n✅ Done!\n"));
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error:"), err.message);
  process.exit(1);
});
