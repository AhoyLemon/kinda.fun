# The Kinda Fun Developer Guide

### (for kinda developers)

This guide will help you set up the Kinda Fun gaming platform for local development and explain where to start making changes.

## Quick Setup

### Prerequisites

- **Node.js 22+** (Required for Nuxt 4 and Firebase Functions)

### Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/AhoyLemon/kinda.fun.git
cd kinda.fun

# 2. Install dependencies (takes ~45 seconds, don't cancel)
npm install

# 3. Start the Nuxt dev server
npm run dev
```

**Important Localhost URLs:**

- ✅ `http://localhost:3000/` - **Homepage**
- ✅ `http://localhost:3000/[gamename]` - **Individual games (clean paths, no `.html`)**

_Game routes match their folder names in `src/views/` and their page wrappers in `app/pages/` - check there for the complete list._

## Project Overview

Kinda Fun is a Vue.js platform featuring multiple satirical web games:

- **Multiplayer Games** - Real-time games using Firebase for coordination
- **Single-Player Simulators** - Complex business/strategy games with progression
- **Data-Driven Games** - Games built around interesting datasets
- **Parody Games** - Humorous takes on game genres and cultural phenomena

_Each game is self-contained with its own documentation in the `docs/` folder._

## How the Platform Works

### Architecture

- **Nuxt 4** (Vue 3) with static generation — Vite runs under the hood via Nuxt
- **One route per game** - each game has a thin page wrapper in `app/pages/`
- **Firebase** (client-only) for multiplayer features and data storage
- **SCSS** for styling with shared design system
- **Vitest** for unit tests, **Playwright** for the route-verify harness

Each route is a thin `app/pages/<name>.vue` wrapper that imports the game's
existing root component from `src/views/<game>/<Game>.vue` and sets the page
`<head>` (fonts, canonical, OpenGraph, per-game theme-color + favicons) via
`useHead`. The home page is `app/pages/index.vue`; the 404 is
`app/pages/[...slug].vue` (prerendered and copied to `404.html` by
`scripts/nuxt/finalize.mjs`), with `app/error.vue` as the runtime fallback.

Game code still lives under `src/views/<game>/` and is reused by the Nuxt pages
via the `@` → `src/` alias configured in `nuxt.config.ts`. Firebase, toast, and
tippy are registered as client-only Nuxt plugins in `app/plugins/`, and Firebase
composables are guarded with `import.meta.client` so pages prerender without a
VueFire app. The static output lands in `.output/public` and is served by
Firebase Hosting (`firebase.json`: `cleanUrls`, `/<game>.html` → 301 redirects,
emulators).

### Technology Stack

**New development should use:**

- **Vue 3** with Composition API
- **TypeScript** (older games use JavaScript, but new features should use TS)
- **Pug** for templates (`<template lang="pug" src="./X.pug">`)
- **SCSS** for styling
- **Vitest** for testing

_Some older games use JavaScript, but all new features should use TypeScript for better maintainability and type safety._

### File Structure

```
app/
├── pages/            # One thin route wrapper per game (imports src/views root + useHead)
│   ├── index.vue     # Home
│   └── [...slug].vue # 404 catch-all (copied to 404.html on build)
├── plugins/          # Client-only Nuxt plugins (firebase, toast, tippy)
└── error.vue         # Runtime error fallback

src/
├── views/            # Game components and logic (reused via the @ alias)
│   └── [game]/       # Individual game folder: .vue root, pug, scss, ts/js
└── shared/           # Shared utilities and components

nuxt.config.ts        # Prerender routes, global <head>, @ alias, Firebase config
firebase.json         # Hosting (cleanUrls, .html→301 redirects), emulators
public/               # Static assets (images, audio, sitemap.xml, etc.)
docs/                 # Documentation
scripts/              # Build (scripts/nuxt), verify, and data generation scripts
```

## Making Your First Changes

### 1. Start with a Single Game

Pick one game to focus on first:

```bash
# Browse available games
ls src/views/

# Open any game in your browser
open http://localhost:3000/[gamename]

# Look at the main game file
code src/views/[gamename]/[GameName].vue
```

**Tip:** MegaChurch Tycoon has the most comprehensive documentation - see [MegaChurch Developer Guide](megachurch/DEVELOPER.md) for a detailed example.

### 2. Understanding Game Structure

Each game follows a similar pattern:

```
src/views/[game]/
├── [Game].vue          # Main component
├── [Game].scss         # Game-specific styles
├── js/ or ts/          # Game logic and data
├── components/         # Sub-components
└── pug/               # Template partials (some games)
```

### 3. Common Development Tasks

**Change Game Content:**

- Edit data files in `src/views/[game]/js/` or `src/views/[game]/ts/`
- Modify Vue components for UI changes
- Update SCSS files for styling

**Add New Features:**

- Create new components in `src/views/[game]/components/`
- Add new routes or pages in the main game Vue file
- Update shared utilities in `src/shared/`

**Test Changes:**

```bash
# Run tests
npm run test:run

# Run tests for specific game
npm run test:run tests/[game]*

# Format code
npm run format
```

## Development Workflow

### Local Development

```bash
# Start development server
npm run dev                 # Nuxt dev server (http://localhost:3000)

# Build for testing
npm run build               # Static generate into .output/public
npm run preview             # Serve the generated output

# Run tests
npm run test:run            # Run all unit tests once
npm run test:watch          # Watch mode for development

# End-to-end route verification
npm run verify              # Prerender + hydration + redirects + emulator checks
```

### Making Changes

1. **Edit game files** in `src/views/[game]/`
2. **Test locally** - changes auto-reload in browser
3. **Write tests** for new features (see `tests/VITEST_IDEAS.md`)
4. **Create pull request** - deployment happens automatically

### Firebase Setup (Optional)

Games work fine locally without Firebase, but for full multiplayer functionality:

- See `docs/deployment-setup.md` for Firebase configuration
- **Multiplayer games** need Firebase for real-time features
- **Single-player games** work completely offline
- **Data logging** features require Firebase connection

## Game-Specific Documentation

### Finding Game Docs

Each game has its own documentation in the `docs/` folder:

- **Player guides** - `docs/[gamename].md` - Overview
- **Developer guides** - `docs/[gamename]/[file].md` - Supplemental Docs (in some cases)

### Example: MegaChurch Tycoon

- **Full Developer Guide:** [docs/games/megachurch/DEVELOPER.md](megachurch/DEVELOPER.md)
- **Player Guide:** [docs/megachurch.md](megachurch.md)
- **Configuration:** `src/views/megachurch/ts/variables/_gameSettings.ts`

_Browse the `docs/` folder to find documentation for other games._

## Creating a New Game

Ready to build a new game from scratch? Follow the comprehensive guide:

**→ [Creating a New Kinda Fun Game](new-game.md)**

This document covers:

- Creating the game's root Vue component under `src/views/`
- Adding a thin `app/pages/` route wrapper with `useHead`
- Registering the route for prerender and redirects
- Testing locally
- Publishing your game

It includes step-by-step instructions and code examples for getting your game up and running.

## Getting Help

### Documentation

- **Project Commands:** `docs/npm-commands.md`
- **Deployment:** `docs/deployment-setup.md`
- **Testing:** `tests/VITEST_IDEAS.md`
- **Game-Specific:** `docs/[game].md` files

### Development Tips

- **Use browser DevTools** - Vue DevTools extension is helpful
- **Check console for errors** - especially helpful for Firebase issues
- **Test in different browsers** - games should work everywhere
- **Use debug modes** - many games have in-game debug toggles

### Common Issues

- **Build failures:** Delete `node_modules/` and `npm install`
- **Hot reload not working:** Restart dev server
- **Games not loading:** Check browser console, verify file paths
- **Firebase errors:** Expected in development without config

## Contributing

### Pull Request Process

1. **Create feature branch** from `main`
2. **Make focused changes** - one feature per PR
3. **Test thoroughly** - add tests for new features
4. **Write clear PR description** with checklist
5. **Reference issues** with "This closes #XX" format

### Code Standards

- **Vue 3 Composition API** for new components
- **TypeScript preferred** for new games (Older games may use JavaScript)
- **SCSS for styling** with shared variables
- **Vitest for testing** with scenario-based tests
- **ESLint/Prettier** for code formatting

## Next Steps

1. **Explore the codebase** - start with one game that interests you
2. **Read game documentation** - each game has its own docs
3. **Try making small changes** - modify text, colors, or game balance
4. **Write your first test** - see `tests/VITEST_IDEAS.md` for examples
5. **Join development** - create issues or PRs for improvements

**Ready to dive deeper into MegaChurch Tycoon?** → [MegaChurch Tycoon Developer Guide](megachurch/DEVELOPER.md)
