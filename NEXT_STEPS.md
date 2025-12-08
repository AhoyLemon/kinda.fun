# Next Steps for Sisyphus & Cameo Migration

## Current Status

### ✅ Completed
- Home page fully migrated and working
- Environment variables configured (supports both VITE_ and NUXT_PUBLIC_ prefixes)
- All infrastructure in place (Firebase, plugins, SCSS)
- Error page created
- Migration pattern established and documented

### 🚧 In Progress
- **Sisyphus page** - Component copied, needs template integration
- **Cameo page** - Ready to migrate

## What's Needed for Sisyphus

The Sisyphus game is complex with:
- 728 lines of Vue logic
- Multiple Pug template includes (_sidebar, _scene, _store, _inventory, _counter)
- Custom sounds (Howler.js integration)
- Toast notifications with custom components
- Firebase Firestore integration
- Complex game state management

### Steps to Complete:
1. Inline all Pug templates into the component
2. Update asset paths (from `@/assets/` to `/assets/`)
3. Add Nuxt-specific head tags
4. Update SCSS imports to relative paths
5. Test game functionality

## What's Needed for Cameo

Similar complexity:
- 886 lines of Vue logic
- jQuery and vuedraggable dependencies
- Firebase integration
- Multiple Pug includes
- Sound effects
- Drag-and-drop sorting mechanics

### Steps to Complete:
Same as Sisyphus migration pattern

## Recommended Approach

Given the complexity, I recommend:

### Option 1: Complete Migration (More Time)
- Manually integrate all Pug templates
- Test all game mechanics
- Ensure Firebase works correctly
- Verify all sounds and interactions

### Option 2: Simplified Initial Migration (Faster)
- Create basic page structure
- Link to old version temporarily
- Complete full migration incrementally

### Option 3: Focus on Framework First
- Get all simpler pages migrated first (Stats, etc.)
- Come back to complex games later
- This ensures the framework is solid before tackling complex games

## Files Ready
- `pages/sisyphus.vue` - Copied, needs template integration
- `/tmp/sisyphus-template.pug` - Consolidated Pug template available

## What Would You Prefer?

1. Should I continue with full Sisyphus/Cameo migration now (will take significant time)?
2. Should I create simplified placeholder pages and migrate simpler pages first?
3. Should I focus on getting the build/deploy configuration working first?

Let me know your preference and I'll proceed accordingly!
