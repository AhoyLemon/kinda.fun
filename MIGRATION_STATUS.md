# Nuxt 4 Migration Status

## ✅ Completed

### Phase 1: Foundation
- Nuxt 4.2.1 installed and configured
- `nuxt.config.ts` created with:
  - Firebase environment variables via runtimeConfig
  - SCSS global configuration
  - Vite options
  - Static generation preset
  - App head defaults
- Package.json updated with Nuxt scripts
- .gitignore updated for Nuxt outputs

### Phase 2: Core Infrastructure  
- `composables/useFirebase.ts` - Client-side Firebase initialization
- `plugins/firebase.client.ts` - Firebase plugin
- `plugins/vuefire.client.ts` - VueFire plugin  
- `plugins/toast.client.ts` - Toast notifications plugin
- `plugins/tippy.client.ts` - Tooltips plugin
- `assets/scss/` - Shared SCSS with globals, variables, mixins
- Global SCSS loaded for all pages

### Phase 3: Page Migration
- ✅ Home page (`pages/index.vue`) - **FULLY WORKING**
  - SSR enabled with content in view source
  - Meta tags (title, description, OG tags)
  - All 22 games listed
  - Interactive filtering works
  - Pug template inlined
  - SCSS imports working
  - URLs use computed() for SSR compatibility
- ✅ Error page (`error.vue`) - 404/500 handling

## 🚧 In Progress / To Do

### Remaining Pages (10)
Each needs the same migration pattern as home page:

1. **Stats** - Complex (Firebase Realtime DB + Firestore, vue-good-table)
2. **Sisyphus** - 728 lines, game state, achievements
3. **Cameo** - Multiplayer, Firebase room management
4. **Guillotine** - Daily content, Firebase
5. **Invalid** - Multiplayer trivia, Firebase
6. **Meeting** - Multiplayer cards, Firebase
7. **Pretend** - Celebrity game, Firebase
8. **Megachurch** - Most complex, 1000+ lines, extensive game logic
9. **Wrongest** - Multiplayer, Firebase
10. **[Any others in src/views]**

### Migration Pattern (Proven with Home Page)
```
1. Copy src/views/[game]/[Game].vue → pages/[game].vue
2. Add Nuxt setup at top of <script setup>:
   - useHead({ title, meta })
   - useRuntimeConfig() if needed for baseURL
   - Computed baseURL for SSR
3. Inline Pug template:
   - Replace: <template lang="pug" src="./[Game].pug"></template>
   - With: <template lang="pug">[content]</template>  
4. Update SCSS imports:
   - Replace: <style lang="scss" src="./[Game].scss"></style>
   - With: <style lang="scss">@import "../src/views/[game]/scss/...;</style>
5. Handle URLs:
   - Computed URLs: url: computed(() => `${baseURL.value}/path`)
   - In setData: typeof url === 'string' ? url : url.value
6. Test: npm run dev → http://localhost:3000/[game]
```

### Phase 4: Build Configuration
- [ ] Update firebase.json for .output/public
- [ ] Add legacy .html → clean URL redirects
- [ ] Update sitemap script for Nuxt
- [ ] Update GitHub Actions for nuxt generate
- [ ] Test production build

### Phase 5: Testing
- [x] SSR rendering works
- [x] Meta tags work
- [ ] Firebase auth (needs game page)
- [ ] All games functional
- [ ] Assets load (SVGs, audio)
- [ ] CSS no bleeding
- [ ] Mobile responsive
- [ ] Toasts work
- [ ] Tooltips work

### Phase 6: Cleanup
- [ ] Remove src/entries/
- [ ] Remove vite.config.js (causes warning)
- [ ] Remove old src/views/ after migration
- [ ] Update README.md
- [ ] Update docs

## Key Technical Decisions

### Why Not Component Wrappers?
PR #129 tried wrapper pattern (pages/ → src/views/) but failed due to:
- TypeScript files served raw to browser
- Module bundling issues
- CSS isolation problems

### SSR Strategy
- All pages have SSR enabled
- Firebase code wrapped in `import.meta.client` checks
- ClientOnly wrapper for Firebase-dependent UI
- Plugins are .client.ts to avoid SSR issues

### URL Handling
- baseURL computed from window (client) or runtimeConfig (server)
- Internal game URLs use computed() for SSR
- External URLs stay as strings

### SCSS Architecture
- Global: assets/scss/global.scss (reset, extends, z-index)
- Auto-imported: _variables.scss, _mixins.scss (via nuxt.config)
- Per-page: Import from src/views/[game]/scss/

## Build Commands

```bash
# Development
npm run dev                  # Nuxt dev server (port 3000)
npm run dev:old              # Old Vite dev (for comparison)

# Build
npm run build                # Nuxt generate (SSG)
npm run build:old            # Old Vite build

# Preview  
npm run preview              # Preview built site

# Test
npm run test:unit            # Vitest
npm run lint                 # ESLint
npm run format               # Prettier
```

## Known Issues
- ⚠️ Warning: "Using vite.config.js not supported" - will remove after migration
- ✅ **Fixed:** Firebase environment variables now support both `VITE_` and `NUXT_PUBLIC_` prefixes
  - Your existing `.env.local` with `VITE_` variables will work without changes
  - See `ENV_SETUP.md` for configuration details

## Next Steps

### Immediate (Continue Migration)
1. Migrate one simple game (e.g., Sisyphus or Cameo)
2. Test Firebase integration works
3. Establish pattern for Firebase-heavy pages
4. Continue systematic page migration

### Before Merge
1. All 11 pages migrated
2. Production build succeeds
3. Firebase.json updated
4. GitHub Actions updated
5. All games tested and functional
6. Old files removed
7. Documentation updated

## Resources
- Issue: #128
- Failed PR: #129 (lessons learned)
- Branch: copilot/convert-to-nuxt-4-again
- Nuxt Docs: https://nuxt.com/docs
- VueFire: https://vuefire.vuejs.org/nuxt/
