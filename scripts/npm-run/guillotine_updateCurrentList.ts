import fs from "fs";
import path from "path";
import readline from "readline";
import chalk from "chalk";
import Table from "cli-table3";
import { createProgressBar } from "../shared/utils.js";

// Column order for current-list.csv
const OUTPUT_HEADERS = [
  "Rank",
  "Name",
  "Net Worth",
  "Previous Net Worth",
  "Country",
  "Source of Wealth",
  "Industry",
  "Title",
  "Organization",
  "Age",
  "Gender",
  "Residence",
  "Citizenship",
  "Education",
  "Marital Status",
  "Children",
];

const DEFAULT_INPUT = "./src/views/guillotine/csv/forbes-2026.csv";
const OUTPUT_PATH = "./src/views/guillotine/csv/current-list.csv";

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function csvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value).trim();
  return str.includes(",") || str.includes('"') || str.includes("\n")
    ? `"${str.replace(/"/g, '""')}"`
    : str;
}

async function promptForInput(): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(
      chalk.cyan(`Input CSV [${DEFAULT_INPUT}]: `),
      (answer) => {
        rl.close();
        resolve(answer.trim() || DEFAULT_INPUT);
      }
    );
  });
}

async function main() {
  console.log(chalk.bold.blue("\n📋 Update current-list.csv from Forbes CSV\n"));

  const inputPath = process.argv[2] || (process.stdin.isTTY ? await promptForInput() : DEFAULT_INPUT);

  if (!fs.existsSync(inputPath)) {
    console.error(chalk.red(`\n❌ Input file not found: ${inputPath}`));
    console.error(chalk.yellow("   Run guillotine:scrape first to generate a Forbes CSV.\n"));
    process.exit(1);
  }

  console.log(chalk.dim(`  Input:  ${inputPath}`));
  console.log(chalk.dim(`  Output: ${OUTPUT_PATH}\n`));

  const raw = fs.readFileSync(inputPath, "utf8");
  const [headerLine, ...dataLines] = raw.split("\n").filter((l) => l.trim());

  const inHeaders = parseCSVLine(headerLine).map((h) => h.replace(/"/g, "").trim());

  // Build an index mapping output column name → input column index (case-insensitive)
  const headerIndex: Record<string, number> = {};
  inHeaders.forEach((h, i) => {
    headerIndex[h.toLowerCase()] = i;
  });

  function getField(row: string[], name: string): string {
    const idx = headerIndex[name.toLowerCase()];
    return idx !== undefined ? (row[idx] ?? "").replace(/^"(.*)"$/, "$1").replace(/""/g, '"').trim() : "";
  }

  const bar = createProgressBar("Normalizing rows");
  bar.start(dataLines.length, 0);

  const outputRows: string[] = [OUTPUT_HEADERS.join(",")];

  for (const line of dataLines) {
    if (!line.trim()) { bar.increment(); continue; }
    const row = parseCSVLine(line);

    const out = [
      csvCell(getField(row, "Rank")),
      csvCell(getField(row, "Name")),
      csvCell(getField(row, "Net Worth")),
      csvCell(getField(row, "Previous Net Worth")),
      csvCell(getField(row, "Country")),
      csvCell(getField(row, "Source of Wealth")),
      csvCell(getField(row, "Industry")),
      csvCell(getField(row, "Title")),
      csvCell(getField(row, "Organization")),
      csvCell(getField(row, "Age")),
      csvCell(getField(row, "Gender")),
      csvCell(getField(row, "Residence")),
      csvCell(getField(row, "Citizenship")),
      csvCell(getField(row, "Education")),
      csvCell(getField(row, "Marital Status")),
      csvCell(getField(row, "Children")),
    ];

    outputRows.push(out.join(","));
    bar.increment();
  }

  bar.stop();

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, outputRows.join("\n"), "utf8");

  const table = new Table({
    head: [chalk.white("Stat"), chalk.white("Value")],
    style: { head: [] },
  });
  table.push(["Input", chalk.gray(path.resolve(inputPath))]);
  table.push(["Output", chalk.gray(OUTPUT_PATH)]);
  table.push(["Rows written", chalk.yellow((outputRows.length - 1).toLocaleString())]);

  console.log("\n" + table.toString());
  console.log(chalk.bold.green("\n✅ Done!\n"));
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error:"), err.message);
  process.exit(1);
});
