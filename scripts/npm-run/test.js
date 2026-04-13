#!/usr/bin/env node

import { spawn } from "child_process";
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const options = [
  {
    key: "1",
    label: "Complete",
    description: "Run all tests with full output (default)",
    args: ["--run"],
  },
  {
    key: "2",
    label: "Pass/Fail",
    description: "Run all tests, minimal output unless failures",
    args: ["--run", "--reporter=dot"],
  },
  {
    key: "3",
    label: "Megachurch",
    description: "Run Megachurch Tycoon tests",
    args: ["--run", "tests/celebrity-friendship.test.js", "src/views/megachurch/tests/street-income.test.ts"],
  },
  {
    key: "4",
    label: "Court",
    description: "Run Supreme Court: The Card Game tests",
    args: ["--run", "tests/court-stances.spec.ts"],
  },
];

function displayMenu() {
  console.log("\n" + chalk.bold.cyan("╔════════════════════════════════════════════════════════════╗"));
  console.log(chalk.bold.cyan("║           Which tests would you like to run?               ║"));
  console.log(chalk.bold.cyan("╚════════════════════════════════════════════════════════════╝\n"));

  options.forEach((opt) => {
    console.log(
      chalk.yellow(`  ${opt.key}.`) + " " + chalk.bold(opt.label) + (opt.key === "1" ? chalk.gray(" (default)") : "") + `\n     ${chalk.gray(opt.description)}`,
    );
  });

  console.log(`\n${chalk.gray("  Enter choice (1-4, or just press ENTER for default):")} `);
}

function runTests(choice) {
  const selected = options.find((opt) => opt.key === choice) || options[0];

  console.log("\n" + chalk.blue.bold(`→ Running: ${selected.label}`) + "\n");

  const proc = spawn("vitest", selected.args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  proc.on("close", (code) => {
    if (code === 0) {
      console.log("\n" + chalk.green.bold("✓ Tests completed successfully") + "\n");
    } else {
      console.log("\n" + chalk.red.bold("✗ Tests failed with code " + code) + "\n");
    }
    process.exit(code);
  });

  proc.on("error", (err) => {
    console.error(chalk.red("Error running tests:"), err);
    process.exit(1);
  });
}

displayMenu();

rl.once("line", (input) => {
  rl.close();

  const choice = input.trim() || "1";

  if (!options.find((opt) => opt.key === choice)) {
    console.log(chalk.yellow(`\n⚠ Invalid choice "${choice}". Using default (Complete).\n`));
  }

  runTests(choice);
});

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  rl.close();
  process.exit(0);
});
