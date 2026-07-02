# Kinda Fun Gaming Platform

Kinda Fun is a Vue.js-based web gaming platform featuring 6+ multiplayer and single-player games built by Lemon. The platform includes games like Invalid (multiplayer trivia game), Comparatively Famous (celebrity valutation via Cameo), No More Billionaires (guillotine simulator), This Meeting Has Points (multiplayer card game meant for virtual meetings), Pretend World (celebrity impersonator guessing game), Megachurch Tycoon (single player business simulator) and Sisyphus Clicker (parody clicker game).

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Setup

- **Node.js Version**: Node.js 22+ is required for all development and deployment (updated due to Vite 6 compatibility requirements).
- **Environment Setup**:
  - `npm install` -- installs all dependencies including Firebase functions. Takes ~45 seconds. NEVER CANCEL.
  - Functions and main project now both use Node.js 22+.

### Dependency Update Policy

- **Dependabot is intentionally disabled for this repository.**
- Reason: for this single-maintainer project, Dependabot generated high-volume PR noise and repeated non-essential update churn, including breakage and review overhead that outweighed value.
- Do not reintroduce `.github/dependabot.yml` unless the maintainer explicitly asks for it.
- Handle dependency updates manually and only when needed (especially for confirmed security or compatibility needs).

### Build and Development Commands

- **Development Server**: `bun run dev` -- starts the Nuxt dev server (http://localhost:3000).
- **Production Build**: `bun run build` -- refreshes the sitemap, then `nuxi generate` → `.output/public` (deployed to Firebase Hosting).
- **Preview**: `bun run preview` -- serves the generated output locally.
- **Deploy**: `bun run deploy` -- build, then `firebase deploy --only hosting`.
- **Preview Build**: `bun run preview` -- serves built application on http://localhost:4173. Takes ~2 seconds.

### Testing and Quality

- **Unit Tests**: `bun run test:run` -- runs the Vitest suite once. Use this to validate changes.
- **Route/build verification**: `bun run verify` -- generates the Nuxt site and drives every route in a headless browser (prerender, hydration, zero console errors) plus the `.html` → 301 redirects and a Firestore emulator round-trip. `--no-emulator` skips the emulator-backed checks. This is the migration's stop condition.
- **Linting**: `bun run lint` -- runs ESLint with auto-fix.
- **Code Formatting**: `bun run format` -- formats all source files with Prettier. Run before committing.

### Data Generation Commands

- **Billionaire Data**: `bun run guillotine:js` -- generates billionaire data from CSV. Takes ~2 seconds. Creates 2,781 entries.
- **Arrest Warrants**: `bun run guillotine:arrests` -- creates daily arrest warrant data.

## Code Organization

### File Size Guideline

- **When a file exceeds ~900 lines, consider splitting it into partial/component files.**
- This is not a hard limit — it's a prompt to evaluate whether splitting would improve readability or maintainability.
- For Vue games, typical splits are: main component, sub-components, data/config files, and separate SCSS partials.

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
   - Run `bun run build` and verify it completes without errors
   - Check that `.output/public/` contains each route (`index.html`, `cameo/index.html`, `404.html`, etc.)

2. **Route Verification**:
   - Run `bun run verify` (or `bun run verify --no-emulator`) and confirm the slice is GREEN

### Pre-Commit Requirements

**ALWAYS run before committing changes:**

- `bun run lint` -- ESLint (auto-fix); editor globals match Nuxt's auto-imports
- `bun run format` -- formats code consistently (but CHECK for SCSS function formatting issues)
- `bun run build` -- ensures the Nuxt production build works
- `bun run test:run` -- unit tests must stay green

**CRITICAL: Prettier Formatting Warning**

- Prettier may incorrectly format SCSS functions like `lighten($color, $amount)` into multi-line named parameter syntax
- ALWAYS test `bun run build` after formatting to catch SCSS syntax errors
- Fix any SCSS function calls that Prettier breaks by converting them back to simple syntax

**CI will fail if:**

- Build fails (including SCSS compilation errors)
- Linting has new errors beyond current baseline
- Firebase deployment keys are missing (production only)

## Commit and Pull Request Guidelines

### Commit Message Format

- When doing a commit message against any github issue, always start the commit message with the issue number in the format `#XX` where `XX` is the issue number. For example: `#42 Fix bug with game loading`.
- When finalizing a pull request that ressolves an issue, always start the merge commit message with `This closes #XX` to automatically close the issue on merge. Do the same in the PR comments.

## Project Structure

### Key Directories

- **`app/pages/`** -- One thin Nuxt page per route; imports the game's root component and sets its `<head>` (fonts/OG/favicons) via `useHead`
- **`app/plugins/`** -- Client-only plugins (Firebase/VueFire, toast, tippy)
- **`src/views/[game]/`** -- Each game's Vue component, pug template, SCSS, and TS/JS (reused by the Nuxt pages via the `@` → `src/` alias)
- **`src/shared/`** -- Shared SCSS variables/mixins and pug partials
- **`scripts/`** -- Data-generation utilities, the Nuxt finalize step, and the `verify` harness
- **`public/`** -- Static assets (images, audio, fonts, sitemap.xml)
- **`functions/`** -- Firebase Cloud Functions (separate package; Node.js 22+)
- **`docs/`** -- Game documentation and technical guides

### Configuration Files

- **`nuxt.config.ts`** -- Nuxt config: prerender routes, global `<head>`, `@` alias, Firebase runtime config, SCSS deprecation silencing
- **`vitest.config.js`** -- Test configuration (self-contained)
- **`tsconfig.json`** -- TS/Volar config (includes `app/**` + `.nuxt` types + pug language plugin)
- **`firebase.json`** -- Firebase Hosting: clean URLs, `.html` → 301 redirects, emulators
- **`.eslintrc.cjs`** -- ESLint (declares Nuxt/Vue auto-imports as globals)
- **`package.json`** -- Dependencies and scripts (project uses bun; `bun.lock` is canonical)

### Build Outputs

- **`.output/public/`** -- Static generation output (served by Firebase Hosting)
- Each route prerenders to real HTML (`index.html`, `<game>/index.html`, `404.html`)

## Common Issues and Solutions

### Firebase Configuration

- **Expected**: Firebase auth errors in development without environment variables
- **Required for deployment**: Firebase environment variables in GitHub Actions
- **Local development**: Games work without Firebase for UI testing

### Node.js Version Requirements

- **All development and deployment**: Node.js 22+ is required
- **Vite 6 Compatibility**: Updated from Node.js 20 due to Vite 6 minimum requirements
- **Functions**: Also use Node.js 22+ (no version conflicts)
- **bun**: Prefer `bun` over `npm` for running commands, but either is possible.

### Build Performance

- **Large bundles**: Some games create 500KB+ bundles (normal for this project)
- **Build time**: ~10 seconds is normal, includes sitemap generation and page building
- **Memory usage**: Vite may use significant memory during builds

### Linting Status

- **Focus**: Don't introduce NEW linting errors in Vue components or main source files

## Firebase Deployment

### Automated Deployment

- **Trigger**: Every push to `main` branch
- **Process**: GitHub Actions builds and deploys to Firebase Hosting
- **URL**: https://kinda.fun
- **Time**: ~3-5 minutes for complete deployment

### Manual Deployment

1. **Automated**: Push to `main` branch (usually by merging a pull request)
2. **Manual**: Run `firebase deploy` if needed outside of normal workflow
3. See `docs/deployment-setup.md` for configuration details

## Troubleshooting

### Build Failures

- **Clean build**: Delete `.output/` and `.nuxt/`, then rebuild
- **Node modules**: Delete `node_modules/` and run `bun install`
- **Stale Nuxt types**: Run `nuxi prepare` to regenerate `.nuxt/` (also runs on postinstall)

### Development Server Issues

- **Port conflicts**: Nuxt dev uses 3000
- **Hot reload**: File watching works for Vue components, manual refresh needed for some assets

### Game-Specific Issues

- **Data missing**: Run appropriate data generation scripts (`bun run guillotine:js`, etc.)
- **Styles broken**: Check SCSS compilation in individual game folders
- **Firebase errors**: Expected in development, provide config for production testing

### MegaChurch Development

- **Comprehensive Guide**: See `docs/megachurch/DEVELOPER.md` for complete MegaChurch development documentation
- **Configuration**: Most game balance settings centralized in `src/views/megachurch/ts/variables/_gameSettings.ts`
- **Architecture**: Modular Vue component with organized subsystems
- **Content Management**: Religion data in `_religions.ts`, locations in `_places.ts`, sermon themes in `_sermons.ts`
- **Avoid Magic Numbers**: Use configuration objects instead of hardcoded values in game logic
- **Testing**: Use in-game debug toggle and Vitest for development validation

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
