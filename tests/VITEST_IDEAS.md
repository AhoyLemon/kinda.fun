# Vitest Test Ideas for kinda.fun

## Proposed Tests

1. **CSV Parsing and Data Generation**
   - Test that CSV parsing functions correctly handle valid and malformed CSV input.
   - Test that billionaire/arrest data generation scripts produce the expected number of entries and correct field formats.

2. **Build Output Validation**
   - Test that after `npm run build`, every prerendered route (e.g. `cameo`, `guillotine`, etc.) exists in the `.output/public` directory.

3. **Game Page Rendering**
   - Test that each game’s Vue component renders its title and key UI elements (e.g., “Comparatively Famous” for Cameo, “No More Billionaires” for Guillotine).

4. **Prerender / Route Verification**
   - Test that `nuxi generate` prerenders each route with real content and clean hydration. The `npm run verify` harness (Playwright) already covers this end-to-end, including `.html` → 301 redirects.

5. **Shared Utilities** ✅ _Test written: see `tests/shared-utils.spec.js`_
   - Test any shared JS/TS utility functions in `src/shared/` (e.g., formatting, randomization, or validation helpers).

6. **SCSS Compilation**
   - Test that SCSS files compile without syntax errors.

7. **Firebase Config Handling**
   - Test that the app gracefully handles missing Firebase config in development (e.g., shows expected error messages, but does not crash).

---

_Mark tests as written or implemented as you go!_
