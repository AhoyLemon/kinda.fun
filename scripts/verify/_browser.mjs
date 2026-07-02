// Resolves a Chromium executable for the harness.
//
// Playwright's browser CDN is blocked by this environment's egress policy, so
// we fall back to the Chromium binary bundled in the @sparticuz/chromium npm
// package (allowed via the npm registry). On machines where Playwright's own
// browsers are installed, set PW_EXECUTABLE_PATH="" and remove this shim, or
// point PW_EXECUTABLE_PATH at any chromium build.
export async function resolveChromium() {
  if (process.env.PW_EXECUTABLE_PATH) {
    return { executablePath: process.env.PW_EXECUTABLE_PATH, args: [] };
  }
  const mod = await import("@sparticuz/chromium");
  const chromium = mod.default || mod;
  const executablePath = await chromium.executablePath();
  // Use a minimal, stable arg set. @sparticuz's default args target AWS Lambda
  // and include --single-process / --no-zygote, which make Playwright's browser
  // die after the first page. We only need the sandbox/shm flags for a
  // root/container environment.
  return {
    executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  };
}
