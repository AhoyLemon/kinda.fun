// Styled "server ready" banner for `bun run dev`, echoing the look of the old
// Vite dev script (cli-table3 + chalk). Called from nuxt.config.ts's `listen`
// hook, which only fires for the dev server — so this never runs during build.
import Table from "cli-table3";
import chalk from "chalk";

export function printDevBanner(url = "http://localhost:3000") {
  const table = new Table({ style: { border: ["cyan"], compact: false } });
  table.push([chalk.white("This is"), chalk.bold.yellow("kinda fun.")]);
  table.push([chalk.white("Mode"), chalk.yellow("DEV")]);
  table.push([chalk.white("Local"), chalk.underline.cyan(url)]);

  console.log("\n" + chalk.bold.magenta("  ✨ kinda.fun is ready to play ✨") + "\n");
  console.log(table.toString() + "\n");
}
