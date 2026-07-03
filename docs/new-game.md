# Creating a New Kinda Fun Game

This guide walks you through creating a new game from scratch on the Kinda Fun platform (Nuxt 4, static generation).

> Coming from the old Vite/Pug build? See [`vite-to-nuxt-cheatsheet.md`](./vite-to-nuxt-cheatsheet.md) for a "I used to edit X, now what?" map (favicons/OG, plugins, env vars, SSR guards, etc.).

## Overview

Each game's code lives under `src/views/<game>/` (a Vue 3 root component plus its
Pug template, SCSS, and TS/JS). Nuxt exposes it as a route through a thin wrapper
in `app/pages/<game>.vue`, which imports the root component and sets the page
`<head>` via the shared `useGameHead()` composable. The site is statically
generated with `nuxi generate` into `.output/public` and served by Firebase
Hosting.

**What you'll create:**

- **Game root component** (`src/views/<game>/<Game>.vue`) plus its Pug/SCSS/TS files
- **Page wrapper** (`app/pages/<game>.vue`) — `<script setup lang="ts">`, imports the root component and calls `useGameHead`

**What you'll edit:**

- `scripts/verify/_routes.mjs` — add the route to `ROUTES` (this drives both
  prerendering via `PRERENDER_ROUTES` and the verify sweep — no `nuxt.config.ts`
  edit needed)
- `firebase.json` — add the matching `/<game>.html` → `/<game>` redirect (the
  verify harness derives its `REDIRECTS` from this file)

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
sets the full per-page `<head>` through the shared `useGameHead()` composable
(`app/composables/useGameHead.ts`), which builds the canonical / OpenGraph /
`og:email` / JSON-LD boilerplate for you — you pass only what differs. Use
`app/pages/cameo.vue` and `app/pages/court.vue` as templates. Always use
`<script setup lang="ts">`.

```vue
<script setup lang="ts">
  import Foo from "@/views/foo/Foo.vue";

  // Structured data (VideoGame / WebSite) — serialized into an ld+json script.
  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: "My Awesome Game",
    url: "https://kinda.fun/foo",
    image: "https://kinda.fun/img/og-foo.png",
    // ...genre, description, creator, offers, screenshots as appropriate
  };

  useGameHead({
    title: "My Awesome Game | A short tagline",
    ogTitle: "My Awesome Game",
    description: "Your game description",
    path: "/foo", // builds canonical + og:url as https://kinda.fun/foo
    ogImage: "https://kinda.fun/img/og-foo.png", // 1200×630 assumed; override with ogImageWidth/Height
    themeColor: "#000000", // optional; adds theme-color + msapplication-TileColor
    fonts: ["https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"],
    // Branded favicons override the site defaults by reusing the same keys:
    favicons: [
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/foo/apple-touch-icon.png", key: "fav-apple" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/foo/favicon-32x32.png", key: "fav-32" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/foo/favicon-16x16.png", key: "fav-16" },
    ],
    jsonLd,
  });
</script>

<template>
  <Foo />
</template>
```

> `useGameHead` also accepts `noZoomViewport: true` (clicker / card games),
> `extraMeta` (e.g. site verification), and works without `ogImage`/`jsonLd` for
> plain pages like `/stats`.

### 4. Register the Route

#### 4.1 Add the route to the manifest (`scripts/verify/_routes.mjs`)

`_routes.mjs` is the **single source of truth** for routes. `nuxt.config.ts`
imports `PRERENDER_ROUTES` from it, so adding a route to `ROUTES` there both
prerenders it (`nuxi generate`) and adds it to the verify sweep — no separate
`nuxt.config.ts` edit needed.

```js
// in ROUTES (scripts/verify/_routes.mjs)
{ name: "foo", path: "/foo", selector: ".foo-game", contentNeedle: "My Awesome Game", minText: 50 },
```

The `selector` must be visible after hydration; the `contentNeedle` must be
present in the raw prerendered HTML.

#### 4.2 Add the redirect (`firebase.json` only)

Add the `.html` → clean-path redirect to `firebase.json` (`hosting.redirects`).
The verify harness derives `REDIRECTS` by parsing `firebase.json`, so this is the
**only** place to add it:

```json
{ "source": "/foo.html", "destination": "/foo", "type": 301 }
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

Guard client-only Firebase access so the page still prerenders. Use the shared
`useClientFirestore()` composable (`src/shared/ts/_useClientFirestore.ts`), which
returns the Firestore instance on the client and `null` during prerender — then
guard reads on the result:

```typescript
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";
import { useClientFirestore } from "@/shared/ts/_useClientFirestore";

const db = useClientFirestore(); // Firestore | null
const rooms = db ? useCollection(collection(db, "games/foo/rooms")) : null;
```

For toasts, use `useClientToast()` (`src/shared/ts/_useClientToast.ts`) — it
returns the real toast on the client and a callable no-op stub during prerender,
so `toast(...)` and `toast.success(...)` are both safe to call unconditionally.

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

- Ensure the `/foo.html` → `/foo` redirect exists in `firebase.json` (the verify
  harness derives its redirect list from there).

**Hot reload not working:**

- Restart the dev server (`npm run dev`).
- Delete the `.nuxt/` cache folder and restart.

## Deployment

Push your changes to the `main` branch on GitHub. CI/CD automatically builds and
deploys to [https://kinda.fun](https://kinda.fun). To deploy manually, run
`npm run deploy` (build + `firebase deploy --only hosting`).

**Pre-deployment checklist:**

- ✅ Root component created under `src/views/foo/`
- ✅ Page wrapper created at `app/pages/foo.vue` (`<script setup lang="ts">` + `useGameHead`)
- ✅ Route added to `ROUTES` in `scripts/verify/_routes.mjs`
- ✅ Redirect added to `firebase.json`
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
└── foo.vue         # Route wrapper (imports root + useGameHead)
```

**Files edited:**

```
scripts/verify/_routes.mjs   # Add route to ROUTES (drives prerender + verify)
firebase.json                # Add /foo.html → /foo redirect (verify derives REDIRECTS from it)
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
