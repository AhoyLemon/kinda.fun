# Creating a New Kinda Fun Game

This guide walks you through creating a new game from scratch on the Kinda Fun platform (Nuxt 4, static generation).

> Coming from the old Vite/Pug build? See [`vite-to-nuxt-cheatsheet.md`](./vite-to-nuxt-cheatsheet.md) for a "I used to edit X, now what?" map (favicons/OG, plugins, env vars, SSR guards, etc.).

## Overview

Each game's code lives under `src/views/<game>/` (a Vue 3 root component plus its
Pug template, SCSS, and TS/JS). Nuxt exposes it as a route through a thin wrapper
in `app/pages/<game>.vue`, which imports the root component and sets the page
`<head>` via `useHead`. The site is statically generated with `nuxi generate`
into `.output/public` and served by Firebase Hosting.

**What you'll create:**

- **Game root component** (`src/views/<game>/<Game>.vue`) plus its Pug/SCSS/TS files
- **Page wrapper** (`app/pages/<game>.vue`) — imports the root component and calls `useHead`

**What you'll edit:**

- `nuxt.config.ts` — add the route to `nitro.prerender.routes`
- `scripts/verify/routes.mjs` — add the route + its `.html` → clean-path redirect
- `firebase.json` — add the matching `/<game>.html` → `/<game>` redirect

> There is no more `Page.pug`, `src/entries/<game>.js`, `vite.config.js`
> registration, or generated `<game>.html` in the repo — Nuxt handles bundling,
> routing, and HTML generation.

## Step-by-Step: Creating a New Game

### 1. Choose Your Game Slug

Pick a short, URL-friendly slug for your game. Examples: `invalid`, `sisyphus`, `pretend`.

In this guide, we'll use `foo` as an example (replace it with your actual game name).

### 2. Create the Game Files

Create your game's root component and its template/styles under `src/views/foo/`.

#### 2.1 Root Vue Component (`src/views/foo/Foo.vue`)

Use `<script setup>`, and point `<template lang="pug" src>` / `<style lang="scss" src>`
at sibling files:

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

- Use Vue 3 Composition API with `<script setup>`.
- Use TypeScript for game logic (create `.ts` files in a `ts/` subdirectory).
- Import shared SCSS variables from `src/shared/` via the `@` alias.
- **Client-guard** any Firebase, toast, or `localStorage` usage with
  `import.meta.client` so the page can prerender without a browser environment.

#### 2.2 Pug Template (`src/views/foo/Foo.pug`)

Your component's markup:

```pug
main.foo-game
  h1 {{ ui.title }}
  p {{ ui.message }}
```

#### 2.3 SCSS Styles (`src/views/foo/Foo.scss`)

```scss
@import "@/shared/scss/_variables.scss";
@import "@/shared/scss/_functions.scss";

.foo-game {
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
}
```

### 3. Create the Page Wrapper (`app/pages/foo.vue`)

This is the thin Nuxt route. It imports the root component via the `@` alias and
sets the full per-page `<head>`. Use `app/pages/cameo.vue` and
`app/pages/court.vue` as templates.

```vue
<script setup>
  import Foo from "@/views/foo/Foo.vue";

  useHead({
    title: "My Awesome Game | A short tagline",
    link: [
      { rel: "canonical", href: "https://kinda.fun/foo" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" },
      // Branded favicons override the site defaults by reusing the same keys:
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/foo/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/foo/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/foo/favicon-16x16.png", key: "fav-16" },
    ],
    meta: [
      { name: "description", content: "Your game description" },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: "My Awesome Game" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Your game description" },
      { property: "og:image", content: "https://kinda.fun/img/og-foo.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://kinda.fun/foo" },
      { property: "og:email", content: "lemon@ahoylemon.xyz" },
    ],
  });
</script>

<template>
  <Foo />
</template>
```

### 4. Register the Route

#### 4.1 Add to prerender routes in `nuxt.config.ts`

```ts
nitro: {
  prerender: {
    routes: ["/", "/cameo", "/court", /* ... */ "/foo"],
  },
},
```

#### 4.2 Add redirects and the verify route

Add the `.html` → clean-path redirect in **both** places:

**`firebase.json`** (`hosting.redirects`):

```json
{ "source": "/foo.html", "destination": "/foo", "type": 301 }
```

**`scripts/verify/routes.mjs`** — add the route to `ROUTES` (with a `selector`
that must be visible after hydration and a `contentNeedle` present in the raw
prerendered HTML) and add the redirect to `REDIRECTS`:

```js
// in ROUTES
{ name: "foo", path: "/foo", ported: true, selector: ".foo-game", contentNeedle: "My Awesome Game", minText: 50 },

// in REDIRECTS
{ from: "/foo.html", to: "/foo" },
```

### 5. Optional: Organize Complex Games

For larger games, split code into subdirectories:

```
src/views/foo/
├── Foo.vue             # Root component
├── Foo.pug             # Template
├── Foo.scss            # Styles
├── ts/                 # TypeScript logic
│   ├── _config.ts
│   ├── _rules.ts
│   └── _data.ts
├── components/         # Reusable sub-components
└── scss/               # Additional SCSS partials
```

### 6. Test Your Game Locally

```bash
# Start the Nuxt dev server
npm run dev

# Visit your game (clean path, no .html)
# http://localhost:3000/foo
```

**Expected behavior:**

- Game loads at `http://localhost:3000/foo`.
- Vue DevTools shows your component.
- Hot reload works when you edit files.
- Firebase warnings are normal in dev without config.

### 7. Build and Verify

```bash
# Static-generate the site into .output/public
npm run build

# Preview the generated output
npm run preview

# Drive every route headless (prerender, hydration, redirects, emulator)
npm run verify        # add --no-emulator to skip the Firestore round-trip
```

## Common Patterns

### Using Firebase Firestore

Guard client-only Firebase access so the page still prerenders:

```typescript
import { useFirestore, useCollection } from "vuefire";
import { collection } from "firebase/firestore";

if (import.meta.client) {
  const db = useFirestore();
  const rooms = useCollection(collection(db, "games/foo/rooms"));
}
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

## Testing Your Game

See [tests/VITEST_IDEAS.md](../tests/VITEST_IDEAS.md) for testing ideas.

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

- Verify `app/pages/foo.vue` exists and imports the root component correctly.
- Confirm `"/foo"` is in `nitro.prerender.routes` in `nuxt.config.ts`.
- Check the browser console for import errors or TypeScript issues.

**Prerender / hydration fails:**

- Wrap Firebase, toast, and `localStorage` usage in `import.meta.client`.
- Run `npm run verify` for a full prerender + hydration report.

**Redirect not working:**

- Ensure the `/foo.html` → `/foo` redirect exists in both `firebase.json` and
  `scripts/verify/routes.mjs`.

**Hot reload not working:**

- Restart the dev server (`npm run dev`).
- Delete the `.nuxt/` cache folder and restart.

## Deployment

Push your changes to the `main` branch on GitHub. CI/CD automatically builds and
deploys to [https://kinda.fun](https://kinda.fun). To deploy manually, run
`npm run deploy` (build + `firebase deploy --only hosting`).

**Pre-deployment checklist:**

- ✅ Root component created under `src/views/foo/`
- ✅ Page wrapper created at `app/pages/foo.vue`
- ✅ Route added to `nitro.prerender.routes`
- ✅ Redirect added to `firebase.json` and `scripts/verify/routes.mjs`
- ✅ Game loads at `localhost:3000/foo`
- ✅ `npm run build` and `npm run verify` succeed
- ✅ Tests pass (`npm run test:run`)
- ✅ Code formatted (`npm run format`)
- ✅ Documentation created at `docs/foo.md`

## Quick Reference

**Files created:**

```
src/views/foo/
├── Foo.vue         # Root component
├── Foo.pug         # Template
├── Foo.scss        # Styles
└── ts/             # TypeScript logic (optional)

app/pages/
└── foo.vue         # Route wrapper (imports root + useHead)
```

**Files edited:**

```
nuxt.config.ts               # Add "/foo" to nitro.prerender.routes
scripts/verify/routes.mjs    # Add route to ROUTES + redirect to REDIRECTS
firebase.json                # Add /foo.html → /foo redirect
```

**Commands:**

```bash
npm run dev                     # Start Nuxt dev server (localhost:3000)
npm run build                   # Static-generate into .output/public
npm run preview                 # Serve the generated output
npm run verify                  # End-to-end route verification
npm run test:run                # Run tests
npm run format                  # Format all code
```

**URLs:**

- Development: `http://localhost:3000/foo`
- Production: `https://kinda.fun/foo`

## Next Steps

1. Implement your game logic in TypeScript files
2. Test thoroughly in development mode
3. Write tests (see [tests/VITEST_IDEAS.md](../tests/VITEST_IDEAS.md))
4. Create player documentation in `docs/foo.md`
5. Run `npm run format` before committing
6. Submit a pull request with clear description

Happy game-making! 🎮
