# NPM Commands

Scripts are defined in `package.json`. Examples below use `bun run`, but `npm run` works identically.

## Development & Build

**`bun run dev`**  
Start the Nuxt dev server at `http://localhost:3000` (hot reload).

**`bun run build`**  
Refresh `public/sitemap.xml`, then statically generate the site (`nuxi generate`) into `.output/public`.

**`bun run preview`**  
Serve the generated static output locally.

**`bun run deploy`**  
Run `build`, then `firebase deploy --only hosting`.

## Quality & Testing

**`bun run typecheck`**  
Type-check the project with `nuxi typecheck` (vue-tsc).

**`bun run lint`**  
Lint and auto-fix Vue/JS/TS files with ESLint.

**`bun run format`**  
Format source code with Prettier.

**`bun run test`** / **`bun run test:run`**  
Run the Vitest unit tests once.

**`bun run test:watch`**  
Run Vitest in watch mode.

**`bun run verify`** (add `--no-emulator` to skip Firestore)  
Generate the site and drive every route headless with Playwright: verifies prerender, hydration, and zero console errors, checks `.html` → 301 redirects, and performs a Firestore emulator round-trip.

## Data & Firebase Scripts

**`bun run guillotine:scrape`**  
Scrape the Forbes billionaires list.

**`bun run guillotine:csv`**  
Merge/reconcile the Forbes CSVs into the canonical billionaire list.

**`bun run guillotine:ts`**  
Generate the billionaire gameplay data (`_billionaires.ts`) from the CSV.

**`bun run guillotine:arrests`**  
Create the randomized daily arrest warrants (20 billionaires per day for the year).

**`bun run firebase:hydrate`**  
Clone selected collections from prod Firestore into the dev environment.

**`bun run firebase:check`**  
Diagnose Firebase connectivity and IAM permissions.

**`bun run sitemap`**  
Regenerate `public/sitemap.xml`.

See `scripts/scripts-help.md` for the full set of data and Firebase maintenance scripts.
