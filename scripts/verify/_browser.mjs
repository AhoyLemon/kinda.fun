// Resolves a Chromium executable for the harness.
//
// Resolution order:
//   1. PW_EXECUTABLE_PATH — explicit override; point it at any chromium build.
//   2. VERIFY_SPARTICUZ_CHROMIUM — opt-in fallback to the @sparticuz/chromium
//      package, for egress-restricted environments (sandboxes/CI) where
//      Playwright can't download its own browser. That package is an
//      optionalDependency (~280MB), so it's gated behind this flag and stays
//      out of normal installs.
//   3. Default — Playwright's own bundled Chromium (leave executablePath unset
//      and `chromium.launch()` resolves the bundled browser itself).
export async function resolveChromium() {
  if (process.env.PW_EXECUTABLE_PATH) {
    return { executablePath: process.env.PW_EXECUTABLE_PATH, args: [] };
  }

  if (process.env.VERIFY_SPARTICUZ_CHROMIUM) {
    let sparticuz;
    try {
      const mod = await import("@sparticuz/chromium");
      sparticuz = mod.default || mod;
    } catch {
      throw new Error(
        "VERIFY_SPARTICUZ_CHROMIUM is set but @sparticuz/chromium is not installed in this environment. " +
          "Install it (`bun add -d @sparticuz/chromium`, or `npm i -D @sparticuz/chromium`) or unset the flag to use Playwright's bundled browser.",
      );
    }
    const executablePath = await sparticuz.executablePath();
    // @sparticuz's default args target AWS Lambda and include --single-process /
    // --no-zygote, which make Playwright's browser die after the first page. We
    // only need the sandbox/shm flags for a root/container environment.
    return {
      executablePath,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    };
  }

  // executablePath undefined → chromium.launch() uses Playwright's bundled build.
  return { executablePath: undefined, args: [] };
}
