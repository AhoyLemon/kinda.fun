import fs from "fs";
import path from "path";
import readline from "readline";
import chalk from "chalk";
import Table from "cli-table3";
import { createProgressBar } from "../shared/utils.js";

const CURRENT_YEAR = new Date().getFullYear();
const DEFAULT_OUTPUT = `./src/views/guillotine/csv/forbes-${CURRENT_YEAR}.csv`;

async function promptForOutput(): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(
      chalk.cyan(`Output CSV [${DEFAULT_OUTPUT}]: `),
      (answer) => {
        rl.close();
        resolve(answer.trim() || DEFAULT_OUTPUT);
      }
    );
  });
}

const CSV_HEADERS = [
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

interface ForbesPerson {
  rank: number;
  finalWorth: number;
  personName: string;
  gender: string;
  source: string;
  industries: string[];
  countryOfCitizenship: string;
  state?: string;
  city?: string;
  age?: number;
  title?: string;
  organizationName?: string;
  bios?: string[];
}

interface ForbesApiResponse {
  personList: {
    personsLists: ForbesPerson[];
  };
}

function csvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  return str.includes(",") || str.includes('"') || str.includes("\n")
    ? `"${str.replace(/"/g, '""')}"`
    : str;
}

function formatWorth(millions: number): number {
  return Math.round((millions / 1000) * 10) / 10;
}

function buildResidence(p: ForbesPerson): string {
  if (p.city && p.state) return `${p.city}, ${p.state}`;
  if (p.city) return p.city;
  return "";
}

async function fetchViaApi(year: number, attempt = 1): Promise<ForbesPerson[] | null> {
  const apiUrl = `https://www.forbes.com/forbesapi/person/billionaires/${year}/position/true.json`;
  console.log(chalk.dim(`  → ${apiUrl}${attempt > 1 ? ` (attempt ${attempt})` : ""}`));

  try {
    const res = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.forbes.com/billionaires/",
      },
    });

    if (res.status === 503 && attempt < 3) {
      console.log(chalk.yellow(`  HTTP 503 — retrying in 3s…`));
      await new Promise((r) => setTimeout(r, 3_000));
      return fetchViaApi(year, attempt + 1);
    }

    if (!res.ok) {
      console.log(chalk.yellow(`  API returned HTTP ${res.status}`));
      return null;
    }

    const data = (await res.json()) as ForbesApiResponse;
    const list = data?.personList?.personsLists;

    if (!Array.isArray(list) || list.length === 0) {
      console.log(chalk.yellow("  API response had unexpected shape"));
      return null;
    }

    return list;
  } catch (err) {
    console.log(chalk.yellow(`  API fetch failed: ${(err as Error).message}`));
    return null;
  }
}

async function fetchViaPlaywright(): Promise<ForbesPerson[]> {
  console.log(chalk.dim("  Launching Playwright (headless Chromium)…"));
  console.log(
    chalk.dim(
      "  If this fails, run: npx playwright install chromium"
    )
  );

  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  const captured: ForbesPerson[] = [];

  page.on("response", async (response) => {
    const url = response.url();
    if (url.includes("forbesapi") && url.includes("billionaires")) {
      try {
        const json = (await response.json()) as ForbesApiResponse;
        const list = json?.personList?.personsLists;
        if (Array.isArray(list) && list.length > 0) captured.push(...list);
      } catch {
        // ignore parse errors on intercepted responses
      }
    }
  });

  console.log(chalk.dim("  Navigating to forbes.com/billionaires/ …"));
  await page.goto("https://www.forbes.com/billionaires/", {
    waitUntil: "domcontentloaded",
    timeout: 90_000,
  });
  // Give lazy-loaded data requests time to fire after the page loads
  await page.waitForTimeout(8_000);

  await browser.close();

  if (captured.length > 0) return captured;
  throw new Error(
    "Playwright navigation completed but no billionaire data was intercepted."
  );
}

function buildCsvRows(persons: ForbesPerson[]): string[] {
  const bar = createProgressBar("Building CSV");
  bar.start(persons.length, 0);

  const rows: string[] = [CSV_HEADERS.join(",")];

  for (const p of persons) {
    const row = [
      p.rank,
      csvCell(p.personName),
      formatWorth(p.finalWorth),
      "", // Previous Net Worth — not available from Forbes annual snapshot
      csvCell(p.countryOfCitizenship || ""),
      csvCell(p.source || ""),
      csvCell(Array.isArray(p.industries) ? p.industries[0] || "" : ""),
      csvCell(p.title || ""),
      csvCell(p.organizationName || ""),
      p.age ?? "",
      p.gender || "",
      csvCell(buildResidence(p)),
      csvCell(p.countryOfCitizenship || ""),
      "", // Education
      "", // Marital Status
      "", // Children
    ];
    rows.push(row.join(","));
    bar.increment();
  }

  bar.stop();
  return rows;
}

async function main() {
  console.log(chalk.bold.blue("\n💰 Forbes Billionaires Scraper\n"));

  const outputPath = process.argv[2] || (process.stdin.isTTY ? await promptForOutput() : DEFAULT_OUTPUT);
  // Derive year from filename (e.g. forbes-2026.csv → 2026), fall back to current year
  const yearMatch = path.basename(outputPath).match(/(\d{4})/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : CURRENT_YEAR;

  console.log(chalk.dim(`  Output: ${outputPath}`));
  console.log(chalk.dim(`  Year:   ${year}\n`));

  // Step 1: fetch data
  console.log(chalk.white("Fetching data…"));
  let persons = await fetchViaApi(year);

  if (!persons) {
    console.log(chalk.white("Falling back to Playwright…"));
    persons = await fetchViaPlaywright();
  }

  console.log(chalk.green(`\n  ✓ ${persons.length.toLocaleString()} entries retrieved\n`));

  // Step 2: build and write CSV
  const rows = buildCsvRows(persons);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, rows.join("\n"), "utf8");

  // Step 3: summary
  const top = persons[0];
  const bottom = persons[persons.length - 1];

  const table = new Table({
    head: [chalk.white("Stat"), chalk.white("Value")],
    style: { head: [] },
  });
  table.push(["Output", chalk.gray(outputPath)]);
  table.push(["Total entries", chalk.yellow(persons.length.toLocaleString())]);
  table.push([
    "Richest",
    `${top.personName} ${chalk.green(`$${formatWorth(top.finalWorth)}B`)}`,
  ]);
  table.push([
    `Rank #${persons.length.toLocaleString()}`,
    `${bottom.personName} ${chalk.green(`$${formatWorth(bottom.finalWorth)}B`)}`,
  ]);

  console.log("\n" + table.toString());
  console.log(chalk.bold.green("\n✅ Done!\n"));
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error:"), err.message);
  process.exit(1);
});
