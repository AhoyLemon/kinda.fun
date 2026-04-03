# Supreme Court: The Card Game — Reference

This file serves as a stable reference for decisions made during development. See `docs/court-working-doc.md` for the active session log and `docs/court-working-doc-history.md` for past sessions.

---

## Terminology

| Term            | Meaning                                                                             |
| --------------- | ----------------------------------------------------------------------------------- |
| **The Docket**  | The shared community pool of 5 tactic cards that both players draw from             |
| **Tactic card** | A playable card (replaces the older term "argument card")                           |
| **Round**       | One player turn + one opponent turn (3 rounds per trial)                            |
| **Trial**       | A full game session on one case; ends after 3 rounds with a verdict                 |
| **Leaning**     | A justice's current vote stance, -100 to +100 from the **player's** perspective     |
| **Claiming**    | Player action to reserve 2 Docket cards for their exclusive use (via "I Call Dibs") |
| **Shield**      | Temporary protection for a justice; expires at end of the opponent's following turn |
| **Abstention**  | A justice within ±`abstentionThreshold` leaning who neither votes for nor against   |
| **Recused**     | A justice who has been recused; leaning reset to 0, harder to sway going forward    |

---

## Architecture

- **`src/views/court/ts/_types.ts`** — all TypeScript interfaces and union types
- **`src/views/court/ts/_justices.ts`** — 57 justices (9 current, 16 historical, 8 fictional, 8 celebrity; id 56-57 are Mr. Beast and The Undertaker)
- **`src/views/court/ts/_cases.ts`** — 20 cases (10 historical, 10 fictional)
- **`src/views/court/ts/_tactics.ts`** — 18 tactic cards
- **`src/views/court/ts/_presidents.ts`** — 22 presidents (for justice appointment metadata)
- **`Court.vue`** — all game logic (`<script setup lang="ts">`)
- **`Court.pug`** — template (references `Court.vue` via `src=`)
- **`Court.scss`** — base/shared styles + `@import "./scss/playing"` + `@import "./scss/report"`
- **`scss/_playing.scss`** — playing phase styles (bench, docket, tactic cards, animations, overlays)
- **`scss/_report.scss`** — verdict phase, court report modal, justice detail modal, case history
- **`components/TacticToast.vue`** — Vue-Toastification component for tactic play results

### File Size Guideline

When a file exceeds ~900 lines, consider splitting it into partial/component files. This is not a hard limit — it's a prompt to evaluate whether splitting improves readability or maintainability.

---

## Key Design Decisions

**Justice leanings start from party alignment.**
Each justice's initial lean is derived from whether their nominating president's party aligns with the player's chosen side. This reflects the satire premise that party loyalty drives outcomes.

**Leaning scale is ±100.**
Internally, justice leanings run from -100 to +100. The `gameSettings.abstentionThreshold` (default 20) defines the "dead zone" — justices with leaning `> -20 && <= 20` show as **Undecided** and abstain from the final vote count. The topbar tally shows results in `FOR-AGAINST` or `FOR-AGAINST-ABSTAIN` format.

**`gameSettings` is a plain const (not reactive).**
Currently contains `numberOfRounds: 3` and `abstentionThreshold: 20`. Referenced directly from the template since Vue 3 `<script setup>` exposes all declared values.

**The Docket is shared.**
Rather than each player having a private hand, both draw from the same 5-card pool. This creates meaningful tension — playing a card removes it from the opponent's options, and claiming cards locks them away.

**Opponent is RNG (for now).**
The opponent has no real AI — it randomly selects a card from the Docket (excluding `claim-two`). Shield cards target the opponent's most threatened justices. Future sessions should build smarter opponent logic.

**Tactic cards — current roster (18 cards):**

| id   | Name                     | Effect Type         | Notes                                                                                                                                        |
| ---- | ------------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1-16 | (original cards)         | various             | see `_tactics.ts`                                                                                                                            |
| 17   | Ring Me Up The President | `presidential-call` | Non-targeted. Big positive for Trump nominees, tiny positive for other Rs, big negative for Obama/Biden nominees, tiny negative for other Ds |
| 18   | Recuse Yourself!         | `recuse`            | Single target. Resets justice leaning to 0; marks them as recused (sway power halved for rest of trial)                                      |

**Recuse mechanic:**

- `game.recusedJustices: number[]` tracks recused justice IDs
- Resetting to 0 applies regardless of how strongly they leaned
- The 0.5× sway reduction stacks with Chief Justice hardening
- Opponent uses recuse to target the player's strongest ally (highest pro-player leaning)
  Player shields expire when the opponent finishes their turn; opponent shields expire when the player finishes theirs. This prevents shields from persisting indefinitely.

**Discard pile reshuffles into deck.**
When the deck is empty, the discard pile is shuffled and becomes the new deck. Cards are drawn _before_ being added to the discard pile to prevent immediate re-draw.

**Justice card stats are game mechanics, not lore.**
Stat names like `succeptibility` and `partyLoyalty` are internal. The UI should hint at these without exposing numbers directly (e.g., flavor language like "easily flattered").

---

## Toast / UI Conventions

- **Vue-Toastification** is used for tactic-play feedback. `TacticToast.vue` renders inside the library's container. The global `<style>` block in `TacticToast.vue` zeroes out library padding (`padding: 0 !important`) and adds a court-themed dark background via `:has()`. **Do not add `.tactic-toast` styles to the SCSS partials** — the old manual toast styles (`position: fixed; bottom: 1.5rem; ...`) were removed as they caused the component to render outside the library container.
- Case history is tracked in `caseHistory` (reactive array in Court.vue), populated when `dealGame()` is called after an active game. The justice detail modal shows a per-justice vote history for that session.
- The opponent thinking overlay (`.opponent-thinking-overlay`) is `position: fixed; z-index: 50`. The docket gets `position: relative; z-index: 55` via `is-opponent-turn` class so it appears above the dimming overlay.
