# The Kinda Fun Developer Guide

### (for kinda developers)

This guide will help you set up the Kinda Fun gaming platform for local development and explain where to start making changes.

## Quick Setup

### Prerequisites

- **Node.js 22+** (Required for Vite 6 compatibility and Firebase Functions)

### Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/AhoyLemon/kinda.fun.git
cd kinda.fun

# 2. Install dependencies (takes ~45 seconds, don't cancel)
npm install

# 3. Start the development server
npm run dev:client
```

**Important Localhost URLs:**

- ❌ `http://localhost:5173/` - **This won't work**
- ✅ `http://localhost:5173/home.html` - **Use this for the homepage**
- ✅ `http://localhost:5173/[gamename]` - **Individual games**

_Game URLs match their folder names in `src/views/` - check there for the complete list._

## Project Overview

Kinda Fun is a Vue.js platform featuring multiple satirical web games:

- **Multiplayer Games** - Real-time games using Firebase for coordination
- **Single-Player Simulators** - Complex business/strategy games with progression
- **Data-Driven Games** - Games built around interesting datasets
- **Parody Games** - Humorous takes on game genres and cultural phenomena

_Each game is self-contained with its own documentation in the `docs/` folder._

## How the Platform Works

### Architecture

- **Vue.js 3** with Vite build system
- **Multi-page application** - each game is a separate HTML page
- **Firebase** for multiplayer features and data storage
- **SCSS** for styling with shared design system
- **Vitest** for testing

### Technology Stack

**New development should use:**

- **Vue 3** with Composition API
- **TypeScript** (older games use JavaScript, but new features should use TS)
- **Pug** for templates
- **SCSS** for styling
- **Vitest** for testing

_Some older games use JavaScript, but all new features should use TypeScript for better maintainability and type safety._

### File Structure

```
src/
├── entries/          # Entry points for each game
├── views/            # Game components and logic
│   ├── [game]/       # Individual game folders. Each contains Vue components, styles, logic, and assets, Shared utilities and components
├── shared/           # Shared utilities and components
└── server/           # Multiplayer server logic

public/               # Static assets (images, audio, etc.)
docs/                 # Documentation
scripts/              # Build and data generation scripts
```

## Making Your First Changes

### 1. Start with a Single Game

Pick one game to focus on first:

```bash
# Browse available games
ls src/views/

# Open any game in your browser
open http://localhost:5173/[gamename]

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
npm run test:unit

# Run tests for specific game
npm run test:unit tests/[game]*

# Format code
npm run format
```

## Development Workflow

### Local Development

```bash
# Start development server
npm run dev:client          # Main development server

# Build for testing
npm run build               # Creates dist/ folder
npm run preview             # Test built version

# Run tests
npm run test:unit           # Run all tests
npm run test:unit --watch   # Watch mode for development
```

### Making Changes

1. **Edit game files** in `src/views/[game]/`
2. **Test locally** - changes auto-reload in browser
3. **Write tests** for new features (see `docs/vitests.md`)
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

- **Full Developer Guide:** [docs/megachurch/DEVELOPER.md](megachurch/DEVELOPER.md)
- **Player Guide:** [docs/megachurch.md](megachurch.md)
- **Configuration:** `src/views/megachurch/ts/variables/_gameSettings.ts`

_Browse the `docs/` folder to find documentation for other games._

## Getting Help

### Documentation

- **Project Commands:** `docs/npm-commands.md`
- **Deployment:** `docs/deployment-setup.md`
- **Testing:** `docs/vitests.md`
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
4. **Write your first test** - see `docs/vitests.md` for examples
5. **Join development** - create issues or PRs for improvements

**Ready to dive deeper into MegaChurch Tycoon?** → [MegaChurch Tycoon Developer Guide](megachurch/DEVELOPER.md)
