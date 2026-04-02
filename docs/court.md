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
| **Leaning**     | A justice's current vote stance, -10 to +10 from the **player's** perspective       |
| **Claiming**    | Player action to reserve 2 Docket cards for their exclusive use (via "I Call Dibs") |
| **Shield**      | Temporary protection for a justice; expires at end of the opponent's following turn |

---

## Architecture

- **`src/views/court/ts/_types.ts`** — all TypeScript interfaces and union types
- **`src/views/court/ts/_justices.ts`** — 27 justices (9 current, 9 historical, 9 fictional)
- **`src/views/court/ts/_cases.ts`** — 20 cases (10 historical, 10 fictional)
- **`src/views/court/ts/_tactics.ts`** — 14 tactic cards
- **`src/views/court/ts/_presidents.ts`** — 16 presidents (for justice appointment metadata)
- **`Court.vue`** — all game logic (`<script setup lang="ts">`)
- **`Court.pug`** — template (references `Court.vue` via `src=`)
- **`Court.scss`** — all styles

### File Size Guideline

When a file exceeds ~900 lines, consider splitting it into partial/component files. This is not a hard limit — it's a prompt to evaluate whether splitting improves readability or maintainability.

---

## Key Design Decisions

**Justice leanings start from party alignment.**
Each justice's initial lean is derived from whether their nominating president's party aligns with the player's chosen side. This reflects the satire premise that party loyalty drives outcomes.

**The Docket is shared.**
Rather than each player having a private hand, both draw from the same 5-card pool. This creates meaningful tension — playing a card removes it from the opponent's options, and claiming cards locks them away.

**Opponent is RNG (for now).**
The opponent has no real AI — it randomly selects a card from the Docket (excluding `claim-two`). Shield cards target the opponent's most threatened justices. Future sessions should build smarter opponent logic.

**Shields expire after the opponent's next turn.**
Player shields expire when the opponent finishes their turn; opponent shields expire when the player finishes theirs. This prevents shields from persisting indefinitely.

**Discard pile reshuffles into deck.**
When the deck is empty, the discard pile is shuffled and becomes the new deck. Cards are drawn _before_ being added to the discard pile to prevent immediate re-draw.

**Justice card stats are game mechanics, not lore.**
Stat names like `succeptibility` and `partyLoyalty` are internal. The UI should hint at these without exposing numbers directly (e.g., flavor language like "easily flattered").

---

## Toast / UI Conventions

- The Megachurch Tycoon pattern (Vue-Toastification) is the target for toast notifications across kinda.fun games. Court currently has a custom toast — it should eventually migrate to match.
