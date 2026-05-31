import fs from "fs";
import chalk from "chalk";
import Table from "cli-table3";
import {
  parseFlag,
  parseName,
  parseSource,
  parseIndustry,
} from "../../src/views/guillotine/ts/parseFunctions.ts";

const DEFAULT_INPUT = "./src/views/guillotine/csv/current-list.csv";
const OUTPUT_PATH = "./src/views/guillotine/ts/data/_billionaires.ts";

export interface Billionaire {
  rank: number;
  name: string;
  netWorth: number;
  country: string;
  flag: string;
  source: string;
  industry: string;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function processBillionaire(csvLine: string): Billionaire | null {
  const fields = parseCSVLine(csvLine);
  if (fields.length < 12) return null;

  const rank = Number(fields[0]) || 0;
  const name = fields[1] || "";
  const netWorth = Number(fields[2]) || 0;
  let country = fields[4] || "";
  const source = fields[5] || "";
  const industry = fields[6] || "";
  const residence = fields[11] || "";

  if (!country && residence) {
    const parts = residence.split(",");
    if (parts.length > 1) country = parts[parts.length - 1].trim();
  }

  return {
    rank,
    name: parseName(name),
    netWorth,
    country,
    flag: parseFlag(country),
    source: parseSource(name, source),
    industry: parseIndustry(industry, source, name),
  };
}

function serializeBillionaire(b: Billionaire): string {
  return `  {
    rank: ${b.rank},
    name: "${b.name}",
    netWorth: ${b.netWorth},
    country: "${b.country}",
    flag: "${b.flag}",
    source: "${b.source}",
    industry: "${b.industry}",
  }`;
}

async function main() {
  const inputPath = process.argv[2] || DEFAULT_INPUT;

  if (!fs.existsSync(inputPath)) {
    console.error(chalk.red(`\n❌ Input file not found: ${inputPath}`));
    console.error(chalk.yellow("   Run guillotine:csv first to generate current-list.csv.\n"));
    process.exit(1);
  }

  console.log(chalk.bold.blue("\n📋 Guillotine Data Generator\n"));
  console.log(chalk.dim(`  Input:  ${inputPath}`));
  console.log(chalk.dim(`  Output: ${OUTPUT_PATH}\n`));

  const lines = fs.readFileSync(inputPath, "utf8").split("\n").slice(1);

  const billionaires: Billionaire[] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const parsed = processBillionaire(line);
    if (parsed && parsed.netWorth > 0) billionaires.push(parsed);
  }

  // Generate typed TypeScript export
  const tsContent = `export interface Billionaire {
  rank: number;
  name: string;
  netWorth: number;
  country: string;
  flag: string;
  source: string;
  industry: string;
}

export const allBillionaires: Billionaire[] = [
${billionaires.map(serializeBillionaire).join(",\n")}
];
`;

  fs.writeFileSync(OUTPUT_PATH, tsContent, "utf8");
  console.log(chalk.bold.green("✅ Generated _billionaires.ts\n"));

  // Summary table
  const minWorth = Math.min(...billionaires.map((b) => b.netWorth));
  const maxWorth = Math.max(...billionaires.map((b) => b.netWorth));

  const summaryTable = new Table({
    head: [chalk.white("Stat"), chalk.white("Value")],
    style: { head: [] },
  });
  summaryTable.push(["Total entries", chalk.yellow(billionaires.length.toLocaleString())]);
  summaryTable.push([
    "Net worth range",
    chalk.green(`$${minWorth}B`) + chalk.gray(" to ") + chalk.green(`$${maxWorth}B`),
  ]);
  console.log(summaryTable.toString());

  // Industry breakdown
  const industryCount: Record<string, number> = {};
  for (const b of billionaires) {
    industryCount[b.industry] = (industryCount[b.industry] || 0) + 1;
  }

  const industryTable = new Table({
    head: [chalk.white("Industry"), chalk.white("Count")],
    style: { head: [] },
  });
  Object.entries(industryCount)
    .sort(([, a], [, b]) => b - a)
    .forEach(([industry, count]) => {
      industryTable.push([chalk.cyan(industry), chalk.yellow(count)]);
    });

  console.log(chalk.bold.blue("\n📊 Breakdown by industry:\n"));
  console.log(industryTable.toString() + "\n");
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error:"), err.message);
  process.exit(1);
});
