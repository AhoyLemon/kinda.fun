import fs from "fs";
import chalk from "chalk";
import Table from "cli-table3";

const BILLIONAIRES_PATH = "./src/views/guillotine/ts/data/_billionaires.ts";
const OUTPUT_PATH = "./src/views/guillotine/ts/data/_warrants.ts";
const BILLIONAIRES_PER_DAY = 20;

function getBillionaireCount(): number {
  try {
    const data = fs.readFileSync(BILLIONAIRES_PATH, "utf8");
    const matches = data.match(/rank: \d+/g);
    return matches ? matches.length : 1557;
  } catch {
    console.warn(chalk.yellow("⚠️  Could not read _billionaires.ts, using default count"));
    return 1557;
  }
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDaysInMonth(month: number, year: number): number {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) return 29;
  return days[month - 1];
}

function generateAllDates(year = 2024): string[] {
  const dates: string[] = [];
  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= getDaysInMonth(month, year); day++) {
      dates.push(
        `${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`
      );
    }
  }
  return dates;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateWarrants(totalBillionaires: number): Record<string, number[]> {
  const allDates = generateAllDates();
  const totalDays = allDates.length;
  const totalAssignments = totalDays * BILLIONAIRES_PER_DAY;
  const repetitions = Math.ceil(totalAssignments / totalBillionaires);

  let pool: number[] = [];
  for (let i = 0; i < repetitions; i++) {
    for (let j = 0; j < totalBillionaires; j++) {
      pool.push(j);
    }
  }
  pool = shuffleArray(pool);

  const warrants: Record<string, number[]> = {};
  let poolIndex = 0;

  for (const date of allDates) {
    const dayWarrants: number[] = [];
    const usedToday = new Set<number>();

    while (dayWarrants.length < BILLIONAIRES_PER_DAY && poolIndex < pool.length) {
      const id = pool[poolIndex];
      if (!usedToday.has(id)) {
        dayWarrants.push(id);
        usedToday.add(id);
      }
      poolIndex++;

      if (poolIndex >= pool.length) {
        console.warn(chalk.yellow(`⚠️  Pool exhausted at ${date}, reshuffling…`));
        pool = shuffleArray(pool);
        poolIndex = 0;
      }
    }

    dayWarrants.sort((a, b) => a - b);
    warrants[date] = dayWarrants;
  }

  return warrants;
}

function serializeWarrants(warrants: Record<string, number[]>): string {
  const entries = Object.entries(warrants)
    .map(([date, ids]) => {
      const formatted = ids
        .map((id, i) => (i > 0 && i % 10 === 0 ? `\n    ${id}` : String(id)))
        .join(", ");
      return `  "${date}": [\n    ${formatted},\n  ]`;
    })
    .join(",\n");

  return `export const allWarrants: Record<string, number[]> = {\n${entries}\n};\n`;
}

async function main() {
  console.log(chalk.bold.blue("\n🚔 Generate Guillotine Arrest Warrants\n"));

  const totalBillionaires = getBillionaireCount();
  console.log(`  Billionaires: ${chalk.yellow(totalBillionaires.toLocaleString())}`);
  console.log(`  Warrants/day: ${chalk.yellow(BILLIONAIRES_PER_DAY)}\n`);

  const warrants = generateWarrants(totalBillionaires);
  const tsContent = serializeWarrants(warrants);

  fs.writeFileSync(OUTPUT_PATH, tsContent, "utf8");

  const totalWarrants = Object.values(warrants).reduce((sum, arr) => sum + arr.length, 0);

  const table = new Table({
    head: [chalk.white("Stat"), chalk.white("Value")],
    style: { head: [] },
  });
  table.push(["Total dates", chalk.yellow(Object.keys(warrants).length.toLocaleString())]);
  table.push(["Total warrants", chalk.yellow(totalWarrants.toLocaleString())]);
  table.push(["Warrants/day", String(Object.values(warrants)[0]?.length ?? 0)]);
  table.push(["Output", chalk.gray(OUTPUT_PATH)]);

  console.log(table.toString());

  console.log(chalk.bold.green("\n✅ Done!\n"));
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error:"), err.message);
  process.exit(1);
});
