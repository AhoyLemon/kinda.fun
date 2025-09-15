# Vitest Test Ideas for kinda.fun

## Proposed Tests

1. **CSV Parsing and Data Generation**
   - Test that CSV parsing functions correctly handle valid and malformed CSV input.
   - Test that billionaire/arrest data generation scripts produce the expected number of entries and correct field formats.

2. **Build Output Validation** ✅ _Test written: see `tests/build-output.spec.js`_
   - Test that after running the build, all expected files (e.g., `cameo.html`, `guillotine.html`, etc.) exist in the `dist/` directory.

3. **Game Page Rendering**
   - Test that each game’s Vue component renders its title and key UI elements (e.g., “Comparatively Famous” for Cameo, “No More Billionaires” for Guillotine).

4. **Static Page Generation** ✅ _Test written: see `tests/static-pages.spec.js`_
   - Test that static page scripts (`build:pages`) generate HTML files with the correct content and structure.

5. **Shared Utilities** ✅ _Test written: see `tests/shared-utils.spec.js`_
   - Test any shared JS/TS utility functions in `src/shared/` (e.g., formatting, randomization, or validation helpers).

6. **SCSS Compilation**
   - Test that SCSS files compile without syntax errors.

7. **Firebase Config Handling**
   - Test that the app gracefully handles missing Firebase config in development (e.g., shows expected error messages, but does not crash).

---

_Mark tests as written or implemented as you go!_
