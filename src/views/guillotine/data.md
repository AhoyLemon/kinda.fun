# Guillotine Data Management

## NPM Commands

**`bun run guillotine:scrape`**  
Scrapes the Forbes billionaires list into CSV.

**`bun run guillotine:csv`**  
Merges/reconciles the Forbes CSVs into the canonical `src/views/guillotine/csv/current-list.csv`.

**`bun run guillotine:ts`**  
Generates `src/views/guillotine/ts/data/_billionaires.ts` (the billionaires used in the game) from the CSV.

**`bun run guillotine:arrests`**  
Creates the randomized daily arrest warrants (20 billionaires per day for the entire year).

See `scripts/scripts-help.md` for full details on each script.
