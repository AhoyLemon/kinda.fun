# NPM Commands

**`npm run dev`**  
Start development environment with client and page watching.

**`npm run dev:client`**  
Start Vite development server only.

**`npm run dev:server`**  
Start Vite and Express server concurrently.

**`npm run build:pages`**  
Build static HTML pages using build-pages.js.

**`npm run build`**  
Interactive build: prompts for mode selection (production/development), updates sitemap, builds with Vite, generates pages, copies home to index.

**`npm run build -- --mode <mode>`**  
Non-interactive build with specified mode (production or development).

**`npm run preview`**  
Preview production build locally.

**`npm run test:unit`**  
Run unit tests with Vitest.

**`npm run lint`**  
Lint and auto-fix Vue/JS files with ESLint.

**`npm run format`**  
Format source code with Prettier.

**`npm run serve-heroku`**  
Serve production build on Heroku (DEPRECATED. PLEASE REMOVE ALL HEROKU LOGIC AT NEXT OPPORTUNITY).

**`npm run update-billionaires`**  
Process `csv/2024 Billionaire List.csv` and generate `js/data/_billionaires.js` with 2,775+ billionaires ranked by net worth.

**`npm run generate-arrests`**  
Create `js/data/_warrants.js` with randomized daily arrest warrants (20 billionaires per day for the entire year).

**`npm run watch:pages`**  
Watch Pug templates and rebuild corresponding pages on changes.
