# Creating a New Kinda Fun Game

This guide walks you through creating a new game from scratch on the Kinda Fun platform.

## Overview

Each game on Kinda Fun is a self-contained Vue 3 application. The build system automatically generates the final HTML files from Pug templates.

**The 4 core files you'll create:**

- **Vue Component** (`src/views/[game]/[Game].vue`) - Main game UI and logic
- **SCSS Styles** (`src/views/[game]/[Game].scss`) - Game-specific styles
- **Page Template** (`src/views/[game]/Page.pug`) - HTML template (auto-generates `[game].html`)
- **Entry Point** (`src/entries/[game].js`) - Bootstraps the Vue app

**Configuration files you'll edit:**

- `vite.config.js` - Register build entry point and dev server route
- `scripts/npm-run/buildPages.js` - Add page to build script
- `.gitignore` - Add generated HTML file

## Step-by-Step: Creating a New Game

### 1. Choose Your Game Slug

Pick a short, URL-friendly slug for your game. Examples: `invalid`, `sisyphus`, `pretend`.

In this guide, we'll use `foo` as an example (replace it with your actual game name).

### 2. Create the Game Files

Create these 4 files in your game's directory:

#### 2.1 Vue Component (`src/views/foo/Foo.vue`)

Your main game component with UI and logic:

```vue
<script setup lang="ts">
  import { reactive } from "vue";

  const ui = reactive({
    gameName: "foo",
    title: "My Awesome Game",
    message: "Welcome!",
  });
</script>

<style lang="scss" src="./Foo.scss"></style>
<template lang="pug" src="./Foo.pug"></template>
```

**Best Practices:**

- Use Vue 3 Composition API with `<script setup>`
- Use TypeScript for game logic (create `.ts` files in `ts/` subdirectory)
- Import shared SCSS variables from `src/shared/`
- For complex games, break logic into separate files

#### 2.2 SCSS Styles (`src/views/foo/Foo.scss`)

Game-specific styles (can also include styles in the `.vue` file):

```scss
@import "@/shared/scss/_variables.scss";
@import "@/shared/scss/_functions.scss";

.foo-game {
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
}
```

#### 2.3 Page Template (`src/views/foo/Page.pug`)

Pug template that generates the HTML file during build:

```pug
include ../../shared/pug/_variables.pug
include ../../shared/pug/_mixins.pug
- const name = "My Awesome Game"
- const desc = "Your game description"
- const keywords = "game, fun, awesome"
- const gameUrl = baseUrl + "/foo"
- const ogImage = baseUrl + "/img/og-foo.png"
- const datePublished = "2026-04-02"
- const viewportContent = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"

doctype html
html(lang="en")
  head

    include ../../shared/pug/_meta.pug

    //- Fonts & CSS
    link(rel="preconnect" href="https://fonts.gstatic.com")
    link(href="https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,700|Poppins:400,400i,700" rel="stylesheet")
    if mode != "development"
      link(href="/foo.css?lastUpdated=" + lastUpdated type="text/css" rel="stylesheet")

    //- OpenGraph
    meta(property="og:title" content=name)
    meta(property="og:type" content="website")
    meta(property="og:image:width" content="1200")
    meta(property="og:image:height" content="630")
    meta(property="og:description" content=desc)
    meta(property="og:url" content=baseUrl + "/foo")
    meta(property="og:image" content=baseUrl + "/img/og-foo.png")
    meta(property="og:email" content=email)

  body
    #app
      main.page-content
    if mode == "development"
      script(type="module" src="/src/entries/foo.js")
    else
      script(src="/foo.js")
```

**Key points:**

- This template auto-generates `foo.html` in both dev and dist
- Update meta tags, title, and OpenGraph properties
- The Pug build uses shared variables like `baseUrl`, `email`, `mode`, `lastUpdated`
- Development mode loads from `/src/entries/`, production loads from `/`

#### 2.4 Entry Point (`src/entries/foo.js`)

Bootstrap your Vue app with dependencies:

```js
import { createApp } from "vue";
import FooPage from "../views/foo/Foo.vue";
import { VueFire } from "vuefire";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig.public.js";

const firebaseApp = initializeApp(firebaseConfig);

const app = createApp(FooPage);
app.use(VueFire, { firebaseApp, modules: [] }).mount("#app");
```

**For games with different requirements:**

- **No Firebase:** Remove VueFire imports and initialization
- **With Toast notifications:** Import and use `vue-toastification`
- **With tooltips:** Import and use `vue-tippy`
- **With audio:** Import `howler`

See existing game entry points in `src/entries/` for examples with various features.

### 3. Update Configuration Files

Now register your game in the build system by editing 3 configuration files:

#### 3.1 Update `vite.config.js`

Add your game to the build entry points and dev server routes:

**In the `build.rollupOptions.input` section (around line 100):**

```javascript
input: {
  cameo: resolve(__dirname, "src/entries/cameo.js"),
  foo: resolve(__dirname, "src/entries/foo.js"),  // ← Add your game
  guillotine: resolve(__dirname, "src/entries/guillotine.js"),
  // ... other games
},
```

**In the `server.configureServer` middleware section (around line 120):**

```javascript
const mpaPages = [
  "cameo",
  "foo", // ← Add your game slug
  "guillotine",
  "invalid",
  "meeting",
  "megachurch",
  "pretend",
  "sisyphus",
  "stats",
  "wrongest",
  "home",
  "404",
];
```

This enables:

- Building your game as a separate bundle
- Local development at `http://localhost:5173/foo`
- URL rewriting from `/foo` to `/foo.html`

#### 3.2 Update `scripts/npm-run/buildPages.js`

Add your game to the page build script so the Pug template generates HTML:

**In the `pages` array (around line 35):**

```javascript
const pages = [
  {
    src: path.join(SRC_DIR, "views", "cameo", "Page.pug"),
    out: path.join(DIST_DIR, "cameo.html"),
    name: "cameo.html",
  },
  {
    src: path.join(SRC_DIR, "views", "foo", "Page.pug"), // ← Add your game
    out: path.join(DIST_DIR, "foo.html"),
    name: "foo.html",
  },
  {
    src: path.join(SRC_DIR, "views", "guillotine", "Page.pug"),
    out: path.join(DIST_DIR, "guillotine.html"),
    name: "guillotine.html",
  },
  // ... other games
];
```

This tells the build system to:

- Compile `Page.pug` to `foo.html` during builds
- Generate both development and production versions
- Include proper base URLs and asset paths

#### 3.3 Update `.gitignore`

Add the generated HTML file to `.gitignore` (around line 45):

```gitignore
# Generated HTML files (for dev only)
/404.html
/index.html
/home.html
/cameo.html
/foo.html        # ← Add your game
/guillotine.html
/megachurch.html
# ... other games
```

**Why:** The HTML files are auto-generated from Pug templates during build. You don't want to commit them since they're build artifacts.

### 4. Optional: Create Game Subdirectories

For complex games, organize code into subdirectories:

```
src/views/foo/
├── Foo.vue             # Main component
├── Foo.scss            # Game-specific styles
├── Foo.pug             # Component template (optional)
├── Page.pug            # HTML page template
├── ts/                 # TypeScript logic files
│   ├── _config.ts      # Game configuration
│   ├── _rules.ts       # Game rules and logic
│   └── _data.ts        # Game data
├── components/         # Reusable Vue components
│   ├── Board.vue
│   └── Player.vue
├── scss/               # Additional SCSS files
│   └── _theme.scss
└── pug/               # Pug partials (optional)
    └── sections.pug
```

### 5. Test Your Game Locally

```bash
# Start the development server
npm run dev:client

# Visit your game in browser
# http://localhost:5173/foo
```

**Expected behavior:**

- Game loads at the URL
- Vue DevTools shows your component
- Browser console may show Firebase warnings (normal in dev without config)
- Hot reload works when you edit files

### 6. Build and Verify

```bash
# Build for production
npm run build -- --mode production
```

**Verify the build:**

- Check `dist/foo.html` was created
- Check `dist/foo.js` and `dist/foo.css` exist
- Ensure no build errors in console

```bash
# Preview the built version
npm run preview
# Then visit http://localhost:4173/foo
```

## Common Patterns

### Using Firebase Firestore

```typescript
// In your Vue component
import { useFirestore, useCollection } from "vuefire";
import { collection } from "firebase/firestore";

const db = useFirestore();
const gamesRef = collection(db, "games/foo/rooms");
const rooms = useCollection(gamesRef);
```

### Shared SCSS Variables

```scss
@import "@/shared/scss/_variables.scss";
@import "@/shared/scss/_functions.scss";

.my-element {
  color: $primary-color;
  background: $background-dark;
  padding: spacing(2);
  border-radius: radius(md);
}
```

### Game Configuration

Store game settings in a dedicated TypeScript file:

```typescript
// src/views/foo/ts/_gameSettings.ts
export const gameSettings = {
  maxPlayers: 4,
  roundTime: 300,
  startingScore: 0,
  difficulty: "normal" as const,
};

export type GameDifficulty = typeof gameSettings.difficulty;
```

### TypeScript Logic Organization

```typescript
// src/views/foo/ts/_logic.ts
export class GameLogic {
  constructor(public settings: typeof gameSettings) {}

  calculateScore(points: number): number {
    return points * this.settings.maxPlayers;
  }
}
```

## Testing Your Game

See [docs/vitests.md](vitests.md) for comprehensive testing guidance.

**Basic test example:**

```typescript
import { describe, it, expect } from "vitest";
import { GameLogic } from "../ts/_logic";
import { gameSettings } from "../ts/_gameSettings";

describe("Foo game logic", () => {
  it("should initialize correctly", () => {
    const game = new GameLogic(gameSettings);
    expect(game.settings.maxPlayers).toBe(4);
  });

  it("should calculate score", () => {
    const game = new GameLogic(gameSettings);
    expect(game.calculateScore(10)).toBe(40);
  });
});
```

## Documentation

Create player-facing documentation at `docs/[game].md`:

- **Overview** - What is the game about?
- **How to Play** - Rules and gameplay
- **Strategy Tips** - For competitive games
- **Developer Notes** - Architecture and implementation details

See [docs/sisyphus.md](sisyphus.md) or [docs/megachurch.md](megachurch.md) for examples.

## Troubleshooting

**Game not loading at localhost:**

- Verify you added your slug to `mpaPages` array in `vite.config.js`
- Check that `Page.pug` exists and references the correct entry point
- Ensure entry point file exists at `src/entries/foo.js`
- Check browser console for import errors or TypeScript issues

**Build fails:**

- Run `npm run build -- --mode development` for detailed error messages
- Verify `Page.pug` is added to `buildPages.js`
- Check SCSS compilation - Prettier may break SCSS function syntax
- Ensure all imports use correct file paths

**Page.pug not generating HTML:**

- Verify the page is added to `scripts/npm-run/buildPages.js`
- Check Pug syntax is valid (indentation matters!)
- Look for Pug compilation errors during build

**HTML file in wrong place:**

- Development: `foo.html` is generated in project root
- Production: `dist/foo.html` is the final build output
- Both are auto-generated - don't create them manually

**Hot reload not working:**

- Restart dev server: `npm run dev:client`
- Clear `.vite/` cache: Delete the folder and restart
- Check file paths in imports use `@/` or relative paths correctly

## Deployment

Push your changes to the `main` branch on GitHub. CI/CD automatically builds and deploys to [https://kinda.fun](https://kinda.fun).

**Pre-deployment checklist:**

- ✅ All 4 core files created
- ✅ All 3 config files updated (`vite.config.js`, `buildPages.js`, `.gitignore`)
- ✅ Game loads at `localhost:5173/foo`
- ✅ Production build succeeds (`npm run build`)
- ✅ Tests pass (`npm run test:unit`)
- ✅ Code formatted (`npm run format`)
- ✅ Documentation created at `docs/foo.md`

## Quick Reference

**Files created:**

```
src/views/foo/
├── Foo.vue         # Main component
├── Foo.scss        # Styles
├── Page.pug        # HTML template → generates foo.html
└── ts/             # TypeScript logic (optional)

src/entries/
└── foo.js          # Entry point
```

**Files edited:**

```
vite.config.js                  # Add to build.input & mpaPages
scripts/npm-run/buildPages.js   # Add to pages array
.gitignore                      # Add /foo.html
```

**Commands:**

```bash
npm run dev:client              # Start dev server
npm run build                   # Build for production
npm run preview                 # Preview production build
npm run test:unit               # Run tests
npm run format                  # Format all code
```

**URLs:**

- Development: `http://localhost:5173/foo`
- Preview: `http://localhost:4173/foo`
- Production: `https://kinda.fun/foo`

## Next Steps

1. Implement your game logic in TypeScript files
2. Test thoroughly in development mode
3. Write comprehensive tests (see [docs/vitests.md](vitests.md))
4. Create player documentation in `docs/foo.md`
5. Run `npm run format` before committing
6. Submit a pull request with clear description

Happy game-making! 🎮
