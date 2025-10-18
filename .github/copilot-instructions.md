# Kinda Fun Gaming Platform

Kinda Fun is a Vue.js-based web gaming platform featuring 6+ multiplayer and single-player games built by Lemon. The platform includes games like Invalid (multiplayer trivia game), Comparatively Famous (celebrity valutation via Cameo), No More Billionaires (guillotine simulator), This Meeting Has Points (multiplayer card game meant for virtual meetings), Pretend World (celebrity impersonator guessing game), Megachurch Tycoon (single player business simulator) and Sisyphus Clicker (parody clicker game).

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Setup

- **Node.js Version**: Node.js 20.x works for main development. Functions require Node.js 22 but this only affects deployment.
- **Environment Setup**:
  - `npm install` -- installs all dependencies including Firebase functions. Takes ~45 seconds. NEVER CANCEL.
  - Functions installation shows Node.js 22 warnings but continues successfully.

### Build and Development Commands

- **Development Server**: `npm run dev:client` -- starts Vite dev server on http://localhost:5173. Takes ~2 seconds. Games load but show Firebase auth errors (expected without config).
- **Full Development**: `npm run dev:server` -- starts Vite + Express server concurrently. Takes ~3 seconds. Express runs on port 3000.
- **Production Build**: `npm run build -- --mode production` -- builds all games and static pages in prodution mode (to be deployed to Firebase). Takes ~10 seconds.Set timeout to 60+ seconds.
- **Development Build**: `npm run build -- --mode development` -- builds all games and static pages in development mode (for local testing and development). Takes ~10 seconds. Set timeout to 60+ seconds.
- **Preview Build**: `npm run preview` -- serves built application on http://localhost:4173. Takes ~2 seconds.

### Testing and Quality

- **Unit Tests**: `npm run test:unit` -- runs Vitest tests. Takes ~1.5 seconds. Currently has 1 passing test.
- **Linting**: `npm run lint` -- runs ESLint with auto-fix. Currently shows 458+ errors (mostly Node.js globals in scripts). Takes ~3 seconds.
- **Code Formatting**: `npm run format` -- formats all source files with Prettier. Takes ~4 seconds. ALWAYS run before committing.

### Data Generation Commands

- **Billionaire Data**: `npm run guillotine:js` -- generates billionaire data from CSV. Takes ~2 seconds. Creates 2,781 entries.
- **Arrest Warrants**: `npm run guillotine:arrests` -- creates daily arrest warrant data.
- **Page Building**: `npm run build:pages` -- builds static HTML pages from templates.

## Copilot Working Style Preferences

When implementing features, Copilot should:

- Create a detailed todo list before starting work
- Provide status updates while working through the implementation
- Explain what each step accomplishes and why it's needed
- Break complex features into smaller, manageable pieces
- Test changes as they're implemented when possible

## Validation

### Manual Testing Requirements

**ALWAYS manually test after making changes to games or build system:**

1. **Build Validation**:
   - Run `npm run build -- --mode production` and verify it completes without errors
   - Check that `dist/` folder contains all game HTML files (cameo.html, guillotine.html, invalid.html, etc.)

2. **Development Server Validation**:
   - Start `npm run dev`
   - Navigate to http://localhost:5173 and verify homepage loads
   - Test individual games: http://localhost:5173/cameo, http://localhost:5173/guillotine, etc.
   - Verify games display title screens (Firebase auth errors are expected without config)

### Pre-Commit Requirements

**ALWAYS run before committing changes:**

- `npm run format` -- formats code consistently (but CHECK for SCSS function formatting issues)
- `npm run build -- --mode production` -- ensures production build works (NEVER CANCEL - takes ~10 seconds)
- `npm run test:unit` -- verifies tests pass (takes ~1.5 seconds)

**CRITICAL: Prettier Formatting Warning**

- Prettier may incorrectly format SCSS functions like `lighten($color, $amount)` into multi-line named parameter syntax
- ALWAYS test `npm run build` after formatting to catch SCSS syntax errors
- Fix any SCSS function calls that Prettier breaks by converting them back to simple syntax

**CI will fail if:**

- Build fails (including SCSS compilation errors)
- Linting has new errors beyond current baseline
- Firebase deployment keys are missing (production only)

## Project Structure

### Key Directories

- **`src/views/[game]/`** -- Each game has its own Vue component, SCSS, and JavaScript files
- **`src/entries/`** -- Entry points for each game's JavaScript bundle
- **`src/server/`** -- Express.js server for multiplayer functionality
- **`src/shared/`** -- Shared SCSS variables, functions, and components
- **`scripts/`** -- Build scripts and data generation utilities
- **`public/`** -- Static assets (images, audio, fonts)
- **`functions/`** -- Firebase Cloud Functions (requires Node.js 22)
- **`docs/`** -- Game documentation and technical guides

### Configuration Files

- **`vite.config.js`** -- Build configuration with per-game entry points
- **`vitest.config.js`** -- Test configuration (fixed for Vite compatibility)
- **`firebase.json`** -- Firebase hosting configuration with URL rewrites
- **`.eslintrc.cjs`** -- ESLint configuration
- **`package.json`** -- Dependencies and npm scripts

### Build Outputs

- **`dist/`** -- Production build output
- Each game creates: `[game].html`, `[game].js`, `[game].css`
- Special files: `index.html` (copied from home.html), `sitemap.xml`

## Common Issues and Solutions

### Firebase Configuration

- **Expected**: Firebase auth errors in development without environment variables
- **Required for deployment**: Firebase environment variables in GitHub Actions
- **Local development**: Games work without Firebase for UI testing

### Node.js Version Warnings

- **Main development**: Node.js 20.x works fine
- **Functions deployment**: Requires Node.js 22 (handled by deployment pipeline)
- **Warning**: Functions show Node.js version warnings during `npm install` but continue successfully

### Build Performance

- **Large bundles**: Some games create 500KB+ bundles (normal for this project)
- **Build time**: ~10 seconds is normal, includes sitemap generation and page building
- **Memory usage**: Vite may use significant memory during builds

### Linting Status

- **Current state**: 458+ linting errors exist (mostly Node.js globals in utility scripts)
- **Focus**: Don't introduce NEW linting errors in Vue components or main source files
- **Scripts folder**: Linting errors in scripts/ are expected and don't break functionality

## Firebase Deployment

### Automated Deployment

- **Trigger**: Every push to `main` branch
- **Process**: GitHub Actions builds and deploys to Firebase Hosting
- **URL**: https://kinda.fun
- **Time**: ~3-5 minutes for complete deployment

### Manual Deployment

1. Ensure GitHub secrets are configured (see `docs/deployment-setup.md`)
2. Push to `main` branch or manually trigger "Deploy to Firebase" workflow
3. Monitor deployment in GitHub Actions tab

## Troubleshooting

### Build Failures

- **Clean build**: Delete `dist/` folder and rebuild
- **Node modules**: Delete `node_modules/` and run `npm install`
- **Vite cache**: Delete `.vite/` folder

### Development Server Issues

- **Port conflicts**: Vite uses 5173, Express uses 3000
- **Hot reload**: File watching works for Vue components, manual refresh needed for some assets
- **CORS**: Use `npm run dev:server` for full-stack development

### Game-Specific Issues

- **Data missing**: Run appropriate data generation scripts (`npm run guillotine:js`, etc.)
- **Styles broken**: Check SCSS compilation in individual game folders
- **Firebase errors**: Expected in development, provide config for production testing

### MegaChurch Development

- **Configuration**: Most game balance settings centralized in `src/views/megachurch/ts/_variables.ts`
  - `gameSettings.streetPreaching` - Audience behavior and donation mechanics
  - `gameSettings.donationCalculation` - Financial calculation parameters
  - `gameSettings.sermonScoring` - Religion and theme scoring multipliers
  - `ui.timing` - Toast and animation timing configurations
- **Architecture**: Single large Vue component with embedded systems (street preaching, spice addiction, scoring)
- **Content Management**: Religion data in `_religions.ts`, locations in `_places.ts`, sermon themes in `_sermons.ts`
- **Avoid Magic Numbers**: Use configuration objects instead of hardcoded values in game logic
- **Testing**: Use in-game debug toggle to inspect calculations during development

**Always validate changes with `npm run build && npm run preview` before creating pull requests.**

## Pull Request Guidelines

### PR Creation Requirements

- **ALWAYS start PR description with `This closes #XX`** when addressing a specific issue to enable automatic issue closure on merge
- Include clear checklist of completed and remaining work using markdown checklists (- [x] completed, - [ ] pending)
- Keep PR scope minimal and focused on the specific issue being addressed
- Reference relevant documentation or architectural decisions in the PR description

### PR Review Process

- Ensure all validation steps pass before marking PR as ready for review
- Include screenshots for any UI/visual changes
- Test thoroughly across different games and scenarios before submitting

## Testing Guidelines

**Testing Documentation**: See `docs/vitests.md` for complete testing guide

## Copilot Test Writing Guidance

- ALWAYS use Vitest for writing tests.

When writing tests for this project, Copilot should:

- Prefer comprehensive, scenario-based tests that simulate real gameplay outcomes (not just isolated unit tests)
- Use paired or controlled randomization to reduce noise and make comparisons meaningful
- Output results in clear, professional tables (e.g., using cli-table3) with color coding for status
- Always include summary statistics and actionable balance insights in test output
- Fail tests only for true game-breaking issues (not minor balance deviations)
- Make it easy to compare different strategies (e.g., spice vs no-spice) in a single test run
- Document the reasoning and expected outcomes in comments and console output
- Use readable, maintainable code and avoid unnecessary duplication
- Integrate with shared game logic whenever possible to ensure tests match gameplay
