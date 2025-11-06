# GOAL

Clean up all the color declarations into a single file and create a consistent naming scheme for colors used throughout the project, using css variables and the OKLCH color space.

## Purpose

As the project has gone on, colors have been added in an ad-hoc manner, leading to inconsistencies and difficulties in maintaining a coherent color scheme. This refactor aims to centralize color definitions, defining all the colors in the same place, and then using CSS variables to apply them throughout the codebase. This will make it easier to manage colors, ensure consistency, and facilitate future changes to the color scheme.

## Tasks

- [ ] Look thru each and every file in src\views\megachurch\scss and identify all color declarations.
- [ ] Use what you learned to create a consistent color palette in a commented section within `src\views\megachurch\scss\_variables.scss`.
- [ ] When you're finished, the typography, spacing, color and z-index sections of the `_variables.scss` file should be well organized and easy to read.
- [ ] Replace all color declarations in the codebase with references to the new color variables.

## Intented Result

```scss
// TYPOGRAPHY
$serif: "Bitter", serif;
// ...etc

// COLOR PALETTE

$blue: oklch(0.65, 0.1, 240);
$darkBlue: oklch(0.45, 0.1, 240);
$lightBlue: oklch(0.85, 0.1, 240);
// .. etc

// CSS VARIABLES
$z-overlay: 100;
$z-churchinventory: 1002;
// ..etc
```

## Notes

- Color mutations, such as `darken($red,20%)` or `rgba($blue,0.5)` will not work when the colors are converted to the OKLCH color space. Instead, assure these colors are defined directly in the color variables file.
