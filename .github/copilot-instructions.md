# Kinda Fun Gaming Platform

Kinda Fun is a Vue.js-based web gaming platform featuring 6+ multiplayer and single-player games built by Lemon. The platform includes games like Invalid (trivia), Comparatively Famous (Cameo valuations), No More Billionaires (guillotine simulator), This Meeting Has Points, Pretend World, and Sisyphus Clicker.

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
- **Production Build**: `npm run build` -- builds all games and static pages. Takes ~10 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- **Preview Build**: `npm run preview` -- serves built application on http://localhost:4173. Takes ~2 seconds.

### Testing and Quality
- **Unit Tests**: `npm run test:unit` -- runs Vitest tests. Takes ~1.5 seconds. Currently has 1 passing test.
- **Linting**: `npm run lint` -- runs ESLint with auto-fix. Currently shows 458+ errors (mostly Node.js globals in scripts). Takes ~3 seconds.
- **Code Formatting**: `npm run format` -- formats all source files with Prettier. Takes ~4 seconds. ALWAYS run before committing.

### Data Generation Commands
- **Billionaire Data**: `npm run guillotine:js` -- generates billionaire data from CSV. Takes ~2 seconds. Creates 2,781 entries.
- **Arrest Warrants**: `npm run guillotine:arrests` -- creates daily arrest warrant data.
- **Page Building**: `npm run build:pages` -- builds static HTML pages from templates.

## Validation

### Manual Testing Requirements
**ALWAYS manually test after making changes to games or build system:**

1. **Build Validation**: 
   - Run `npm run build` and verify it completes without errors
   - Check that `dist/` folder contains all game HTML files (cameo.html, guillotine.html, invalid.html, etc.)

2. **Development Server Validation**:
   - Start `npm run dev:client`
   - Navigate to http://localhost:5173 and verify homepage loads
   - Test individual games: http://localhost:5173/cameo, http://localhost:5173/guillotine, etc.
   - Verify games display title screens (Firebase auth errors are expected without config)

3. **Game-Specific Testing**:
   - **Cameo**: Should show "Comparatively Famous" title and celebrity sorting interface
   - **Guillotine**: Should display "No More Billionaires" with daily billionaire selection
   - **Invalid**: Should show trivia game setup with employee/sysadmin roles
   - **Meeting**: Should display "This Meeting Has Points" card-based game
   - **Pretend**: Should show celebrity impersonator party game
   - **Sisyphus**: Should display clicker game with hill and store

### Pre-Commit Requirements
**ALWAYS run before committing changes:**
- `npm run format` -- formats code consistently (but CHECK for SCSS function formatting issues)
- `npm run build` -- ensures production build works (NEVER CANCEL - takes ~10 seconds)
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

**Always validate changes with `npm run build && npm run preview` before creating pull requests.**