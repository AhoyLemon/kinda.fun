// Pre-flight SCSS check — fast guard against Dart Sass deprecations and compile
// errors, without a full `nuxi generate`. Mirrors the Vite/Nuxt SCSS pipeline:
// resolves the "@/" alias to src/, then compiles every stylesheet the app
// actually pulls in — each <style src="…"> target plus every inline
// <style lang="scss"> block — and fails on ANY deprecation warning or error.
//
// Run it before builds/PRs so a reintroduced @import, legacy color function, or
// global built-in can't slip back in behind a green build.
//
// Usage:
//   node scripts/checkSass.mjs           # check everything
//   node scripts/checkSass.mjs court     # only paths matching "court"
import * as sass from "sass";
import { pathToFileURL } from "node:url";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
// Scanned for <style> blocks. app/ holds the Nuxt pages/components that live
// outside src/ but still reference src/ stylesheets via the "@/" alias.
const SCAN_DIRS = [SRC, path.join(ROOT, "app")].filter(existsSync);

// Resolve the "@/…" alias (nuxt.config.ts: alias["@"] -> ./src) for @use/@forward.
const aliasImporter = {
  findFileUrl(url) {
    if (url.startsWith("@/")) return pathToFileURL(path.join(SRC, url.slice(2)));
    return null;
  },
};

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

// Build the compile set from the .vue files' <style> blocks — the real graph the
// bundler feeds to Sass. External `src="…"` targets compile as files; inline
// blocks compile as strings anchored to their component's directory.
const entrySet = new Set();
const inlineBlocks = [];
for (const dir of SCAN_DIRS) {
  for (const f of walk(dir).filter((p) => p.endsWith(".vue"))) {
    const txt = readFileSync(f, "utf8");
    for (const m of txt.matchAll(/<style[^>]*\bsrc="([^"]+)"[^>]*>/g)) {
      const ref = m[1];
      entrySet.add(ref.startsWith("@/") ? path.join(SRC, ref.slice(2)) : path.resolve(path.dirname(f), ref));
    }
    let i = 0;
    for (const m of txt.matchAll(/<style[^>]*lang="scss"[^>]*>([\s\S]*?)<\/style>/g)) {
      if (m[1].trim()) inlineBlocks.push({ label: `${path.relative(ROOT, f)}#style${i}`, dir: path.dirname(f), code: m[1] });
      i++;
    }
  }
}
const entries = [...entrySet].filter((f) => f.endsWith(".scss"));

const filter = process.argv[2];
const keep = (label) => !filter || label.toLowerCase().includes(filter.toLowerCase());

let errors = 0;
let deprecated = 0;

function compile(code, dir, label) {
  const warnings = [];
  try {
    sass.compileString(code, {
      loadPaths: [dir, SRC],
      importers: [aliasImporter],
      url: pathToFileURL(path.join(dir, "__entry.scss")),
      logger: {
        warn(msg, opts) {
          if (opts && opts.deprecation) warnings.push(msg.split("\n")[0]);
        },
      },
    });
  } catch (e) {
    errors++;
    console.log(`\n\x1b[31mERROR\x1b[0m ${label}`);
    console.log(`   ${String(e.message).split("\n").slice(0, 5).join("\n   ")}`);
    return;
  }
  if (warnings.length) {
    deprecated++;
    console.log(`\n\x1b[33mDEPRECATION\x1b[0m ${label}`);
    for (const w of [...new Set(warnings)].slice(0, 5)) console.log(`   ${w}`);
  }
}

for (const f of entries) {
  const label = path.relative(ROOT, f);
  if (keep(label)) compile(readFileSync(f, "utf8"), path.dirname(f), label);
}
for (const b of inlineBlocks) {
  if (keep(b.label)) compile(b.code, b.dir, b.label);
}

const ok = errors === 0 && deprecated === 0;
console.log(
  `\n${ok ? "\x1b[32mOK\x1b[0m" : "\x1b[31mFAIL\x1b[0m"} — ${entries.length} entries + ${inlineBlocks.length} inline blocks | errors: ${errors} | deprecations: ${deprecated}`,
);
if (!ok) console.log("Run `node scripts/checkSass.mjs` locally to reproduce.");
process.exit(ok ? 0 : 1);
