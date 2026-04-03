# Supreme Court: The Card Game — Reference

This file serves as a stable reference for decisions made during development. See `docs/court-working-doc.md` for the active session log and `docs/court-working-doc-history.md` for past sessions.

---

## Terminology

| Term            | Meaning                                                                                |
| --------------- | -------------------------------------------------------------------------------------- |
| **The Docket**  | The shared community pool of 5 tactic cards that both players draw from                |
| **Tactic card** | A playable card (replaces the older term "argument card")                              |
| **Round**       | One player turn + one opponent turn (3 rounds per trial)                               |
| **Trial**       | A full game session on one case; ends after 3 rounds with a verdict                    |
| **Leaning**     | A justice's current vote stance, -100 to +100 from the **player's** perspective        |
| **Claiming**    | Player action to reserve 2 Docket cards for their exclusive use (via "I Call Dibs")    |
| **Shield**      | Temporary protection for a justice; consumed when the opponent would sway that justice |
| **Abstention**  | A justice within ±`abstentionThreshold` leaning who neither votes for nor against      |
| **Recused**     | A justice who has been recused; leaning reset to 0, harder to sway going forward       |

---

## Architecture

- **`src/views/court/ts/_types.ts`** — all TypeScript interfaces and union types
- **`src/views/court/ts/_justices.ts`** — 57 justices (9 current, 16 historical, 8 fictional, 8 celebrity; id 56-57 are Mr. Beast and The Undertaker)
- **`src/views/court/ts/_cases.ts`** — 130 cases (10 historical, 120 fictional — ids 111–120 added last session)
- **`src/views/court/ts/_tactics.ts`** — 25 tactic cards
- **`src/views/court/ts/_tacticEffects.ts`** — all tactic effect resolution logic; exports `resolveEffect()`, `partiesAligned()`, `partiesOpposed()`, `EffectOutcome`, `TacticHelpers`
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

**Tactic cards — current roster (25 cards):**

| id    | Name                        | Effect Type         | Notes                                                                                                                                        |
| ----- | --------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Appeal to Precedent         | `sway`              | `polarizes-high`: big positive for high-logic justices, insulting to low-logic                                                               |
| 2     | Emotional Appeal            | `sway`              | amplified by high empathy                                                                                                                    |
| 3     | Bribe Justice               | `sway`              | targets blackmail/wealth weakness                                                                                                            |
| 4     | Shout FREEDOM               | `sway-all`          | all justices, lower per-justice power than targeted cards                                                                                    |
| 5     | Invoke The Founding Fathers | `sway-all`          | all Republican/Federalist/Whig justices respond positively                                                                                   |
| 6     | Constitutional Technicality | `sway`              | `polarizes-low`: big positive for low-logic justices, insulting to high-logic                                                                |
| 7     | Flatter The Bench           | `sway`              | amplified by charisma                                                                                                                        |
| 8     | Insult Your Opponent        | `sway-all`          | targeted at opponent party                                                                                                                   |
| 9     | I Call Dibs                 | `claim-two`         | claim 2 of 4 remaining docket cards, then draw 1; no early draw                                                                              |
| 10    | Purge the Record            | `purge`             | discard all docket cards; feedback: "The Docket has been cleared."                                                                           |
| 11    | Redirect the Witness        | `shield`            | dynamic feedback: "{name} is protected from your opponent's next argument."                                                                  |
| 12    | Be Extremely Boring         | `sway-all`          | reduces all justices' resistance; feedback: "All justices are more susceptible to arguments."                                                |
| 13    | Shout FREEDOM (Alt)         | various             | see `_tactics.ts`                                                                                                                            |
| 14–16 | (other original cards)      | various             | see `_tactics.ts`                                                                                                                            |
| 17    | Ring Me Up The President    | `presidential-call` | Non-targeted. Big positive for Trump nominees, tiny positive for other Rs, big negative for Obama/Biden nominees, tiny negative for other Ds |
| 18    | Recuse Yourself!            | `recuse`            | Single target. Resets justice leaning to 0; marks them as recused (sway power halved for rest of trial)                                      |
| 19    | Betray Your Friend          | `betray-friend`     | Disabled if no justice ≥ 60 leaning; sacrifice one strongly-for justice; opposition justices may flip                                        |
| 20    | Swap Clerks                 | `swap-clerks`       | Dual-target; 70% swap leanings, 30% tattling (both go negative)                                                                              |
| 21    | Encourage A Nap             | `encourage-nap`     | Freeze one justice for a round; wake up with +15 bonus                                                                                       |
| 22    | Justice Cocktails           | `justice-cocktails` | Single target; +3 charisma, +3 empathy, −3 logic for rest of trial                                                                           |
| 23    | Hire A Private Investigator | `hire-pi`           | Dual-target; +4 blackmail weakness on each for rest of trial                                                                                 |
| 24    | Celebrate St. Patrick's Day | `saint-patricks`    | No-target; all justices become Catholic (`game.religionOverrides`)                                                                           |
| 25    | Invite To Church            | `invite-church`     | +3 empathy on target; same-religion justices gain +15                                                                                        |

**Recuse mechanic:**

- `game.recusedJustices: number[]` tracks recused justice IDs
- Resetting to 0 applies regardless of how strongly they leaned
- The 0.5× sway reduction stacks with Chief Justice hardening
- Opponent uses recuse to target the player's strongest ally (highest pro-player leaning)

**Shield mechanic (updated):**
Shields are consumed on contact — when the opponent plays a card that would sway the shielded justice, the shield absorbs the effect and is removed. They are NOT cleared at end of turn. This means a shield persists until it's actually needed.

**Polarize mechanic (new):**
`statRelation: "polarizes-high"` and `"polarizes-low"` allow cards to have opposite effects based on a justice's stat value relative to 5 (midpoint).

- `polarizes-high`: `power = round(basePower × (sv − 5) × 2/5)` — positive for high-stat justices, negative for low-stat
- `polarizes-low`: opposite polarity
  Chief Justice hardening handles negative power correctly (negative sway is reduced, not amplified).

**Case pool filtering:**

- Court modes determine which cases are available: realistic courts (Current, Historical, historical presets) draw only from `casesHistorical`; Fantasy Court draws only from `casesFictional`; Chaos Mode and fictional presets draw from all cases.
- Configured via `casePool: "historical" | "fictional" | "any"` on `PresetBenchConfig` in `_justices.ts`.

**Nap mechanic:**

- `game.nappingJustices: Record<number, number>` — maps justiceId to the round number when the nap expires.
- Napping justices are skipped in all sway calculations (both player and opponent attacks).
- On `endOpponentTurn`, expired naps are cleared and the justice receives +15 leaning toward the player.

**Temporary stat/weakness mods:**

- `game.statMods: Record<number, Partial<Record<keyof Justice["stats"], number>>>` — additive stat boosts (e.g., from Justice Cocktails).
- `game.weaknessMods: Record<number, ...>` — additive weakness boosts (e.g., from Hire A Private Investigator).
- `game.religionOverrides: Record<number, Religion>` — overrides justice religion for the trial (e.g., St. Patrick's Day).
- All cleared when `dealGame()` resets state.

**Multi-target cards:**
Cards like Swap Clerks and Hire A Private Investigator need 2 justice targets. Playing them sets `game.multiTargetMode = true`. The player clicks 2 justices from the bench; on the second click, `applyTactic` fires with both IDs stored in `game.multiTargetSelections`.

**`_tacticEffects.ts` module:**
Extracted from the original 240-line `applyTactic` function. Exports:

- `resolveEffect(game, tactic, targetJustice, actor, helpers): EffectOutcome` — main dispatcher over all effect types
- `partiesAligned(a, b)` / `partiesOpposed(a, b)` — party utility functions (also imported by `Court.vue` for `getInitialLeaning`)
- `EffectOutcome { results, reportTarget, overrideFeedback? }` — what the toast displays
- `TacticHelpers { drawCard, removeFromDocket }` — callbacks into Court.vue reactive state

Discard pile reshuffles into deck.

**Justice card stats are game mechanics, not lore.**
Stat names like `succeptibility` and `partyLoyalty` are internal. The UI should hint at these without exposing numbers directly (e.g., flavor language like "easily flattered").

---

## Toast / UI Conventions

- **Vue-Toastification** is used for tactic-play feedback. `TacticToast.vue` renders inside the library's container. The global `<style>` block in `TacticToast.vue` zeroes out library padding (`padding: 0 !important`) and adds a court-themed dark background via `:has()`. **Do not add `.tactic-toast` styles to the SCSS partials** — the old manual toast styles (`position: fixed; bottom: 1.5rem; ...`) were removed as they caused the component to render outside the library container.
- Case history is tracked in `caseHistory` (reactive array in Court.vue), populated when `dealGame()` is called after an active game. The justice detail modal shows a per-justice vote history for that session.
- The opponent thinking overlay (`.opponent-thinking-overlay`) is `position: fixed; z-index: 50`. The docket gets `position: relative; z-index: 55` via `is-opponent-turn` class so it appears above the dimming overlay.
