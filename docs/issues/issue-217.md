# Issue 217: Court Game Balance & Difficulty Analysis

## Executive Summary

After playtesting, the Court game feels **too difficult** for players. Justices start with strong opinions (good!), but tactics don't move the needle enough to create the feeling of meaningful player agency. This document proposes a comprehensive balance pass focused on:

1. **Difficulty Settings System** — Leverage existing `difficultySettings` to create a tunable experience
2. **Tactic Power Rebalancing** — Increase effectiveness across the board while preserving relative balance
3. **Tactic Card Review** — New cards and deprecation candidates based on gameplay value
4. **Toast Message Improvements** — Better feedback to help players understand what happened

---

## 1. Difficulty Settings System

### Current State

The game already has a `difficultySettings` object in `_settings.ts`:

```typescript
export const difficultySettings: DifficultySettings = {
  opponentPowerMult: 1.0, // opponent tactic multiplier
  targetAllPowerMult: 0.3, // AoE tactics = 30% of single-target per justice (renamed from swayAllPowerMult)
  handSize: 5,
  startingVariance: 8,
};
```

### Proposed Changes

**1. Add `playerPowerMult`** — Scale player tactic effectiveness independently:

```typescript
export const difficultySettings: DifficultySettings = {
  playerPowerMult: 1.2, // NEW: player tactics hit 20% harder
  opponentPowerMult: 1.0,
  targetAllPowerMult: 0.3, // renamed from swayAllPowerMult
  handSize: 5,
  startingVariance: 8,
};
```

**Implementation location:** `_tacticEffects.ts`, line ~692-694:

```typescript
// Current code:
let effectivePower = tactic.effectType === "sway-all" ? Math.round(power * gameSettings.targetAllMultiplier) : power * 10;

// Apply difficulty multipliers
if (actor === "opponent") effectivePower = Math.round(effectivePower * difficultySettings.opponentPowerMult);
if (actor === "player") effectivePower = Math.round(effectivePower * difficultySettings.playerPowerMult); // NEW
```

**2. Move multipliers to `gameSettings`** — Rename and relocate for clarity:

```typescript
export const gameSettings: GameSettings = {
  numberOfRounds: 5,
  abstentionThreshold: 10,
  targetSingleMultiplier: 10, // NEW: single-target tactics (currently hardcoded as "power × 10")
  targetAllMultiplier: 5, // NEW: all-target tactics (up from 3, renamed from swayAllMultiplier)
};
```

**Rationale:** Having both `targetSingleMultiplier` and `targetAllMultiplier` as configurable settings allows global balance tuning without touching individual tactic `basePower` values. Single-target remains 2x as powerful per-justice (10 vs 5), but both are more impactful than before.

**What to display on cards:** Show `basePower` (the base number), not the modified effective power. This keeps card text consistent regardless of target and lets players learn relative card strength.

### Future Consideration: Difficulty Presets

_Not implementing now — focus is on getting "Normal" difficulty right first. Once balance is dialed in, we can add Easy/Hard/Expert presets by adjusting `playerPowerMult`, `opponentPowerMult`, and `targetAllMultiplier`._

---

## 2. Tactic Power Rebalancing

### Core Balance Principles (from user requirements)

✅ **Preserved:**

- Single-target tactics should be stronger than all-target tactics per justice
- Risk/reward tactics should have much stronger positive than negative outcomes
- Playbooks should mix target-all, target-one, and strategic cards

### Current Power Math

- **Single-target (sway-one):** `effectivePower = power × 10` (hardcoded)
- **All-target (sway-all):** `effectivePower = power × 3` (via `targetAllMultiplier`)

Example with `basePower: 3`:

- Single-target after stat mods (e.g., power = 5): `5 × 10 = 50 leaning points`
- All-target (power = 5): `5 × 3 = 15 leaning points per justice`

### Problem: Numbers Too Small

With justices starting at -60 to +60 leaning based on party/stances, a swing of 15-50 points feels incremental. Players need **3-4 good tactics** to flip a single strongly opposed justice.

### Proposed Changes

#### A. Make multipliers configurable and increase all-target power

**Recommendation:** Add `targetSingleMultiplier: 10` and `targetAllMultiplier: 5` to `gameSettings`

```typescript
export const gameSettings: GameSettings = {
  numberOfRounds: 5,
  abstentionThreshold: 10,
  targetSingleMultiplier: 10, // currently hardcoded; now explicit
  targetAllMultiplier: 5, // up from 3 → all-target now 50% as powerful as single-target per justice
};
```

**Impact:**

- `Cite Precedents` (basePower: 3) on a high-logic justice (power = 5 after mods): `5 × 5 = 25` → feels more meaningful
- Still weaker than single-target (which would be `5 × 10 = 50`)
- Allows global tuning without changing individual tactic `basePower` values

#### B. Increase `basePower` on Key Tactics

| Tactic                          | Current basePower | Suggested basePower | Rationale                                                     |
| ------------------------------- | ----------------- | ------------------- | ------------------------------------------------------------- |
| **Cite Precedents**             | 3                 | 4                   | Core attack; should feel strong for high-logic justices       |
| **Call a Celebrity Witness**    | 5                 | 6                   | Fun AoE card; currently underwhelming                         |
| **Invoke the Founding Fathers** | 3                 | 4                   | Thematic and fun; needs more punch                            |
| **Emotional Appeal**            | 6                 | 7                   | Single-target; should dramatically sway high-empathy justices |
| **Bribe the Justice**           | 7                 | 8                   | High-risk, high-reward; make it worth it                      |
| **Leak to the Press**           | 7                 | 8                   | Blackmail should feel devastating                             |
| **Shameless Flattery**          | 7                 | 8                   | Should be reliably strong on susceptible justices             |
| **Threaten Political Fallout**  | 6                 | 7                   | Should feel consequential                                     |
| **Bench Roast**                 | 4                 | 5                   | Insulting the Chief is risky; reward should match             |
| **Request An Amicus**           | 1 (scales)        | 1 (keep scaling)    | This one's fine; it scales with allies                        |

---

## 3. Tactic Card Review

### New Card Ideas (Gameplay-First Design)

#### **Turn On The Fog Machine**

- **Type:** Attack / Utility
- **Effect:** `sway-all` with scaling power based on how many justices are currently neutral (within ±10 leaning). The more undecided justices, the stronger this hits everyone. Justices already strongly decided (beyond ±40) may receive a slight negative effect.
- **Gameplay value:** Rewards timing; best played mid-game when opinions aren't fully formed. Punishes playing too late.
- **World logic:** The attorney turns on a literal fog machine in the courtroom, as well as some gel lights, introducing "razzle dazzle" and perking up any justice who was bored. However, STRONGLY leaning justices are annoyed by the disruption and lean away slightly.
- **Power:** `basePower: 2`, scales up to 8 based on neutral count; slight penalty on strongly-leaning justices

#### **"Whisper Campaign"**

- **Type:** Attack (single-target)
- **Effect:** Target one justice. They shift toward you by a small amount **at the start of every remaining round** (including this one). Most effective when played Round 1 (affects all 5 rounds); minimal impact when played Round 5.
- **Gameplay value:** Investment card; rewards early play and forward planning. Snowballs over time.
- **World logic:** Rumors and quiet influence take time to percolate through the legal community. Early whispers pay compound dividends.
- **Power:** `basePower: 2` per round remaining (Round 1 = 10 total, Round 5 = 2 total)

#### **"Tell A Story Of Alien Abduction"**

- **Type:** Attack (sway-all, targets susceptibility)
- **Effect:** All justices with Susceptibility 7+ are swayed toward you (they'll believe anything). Justices with Susceptibility 4 or below are offended by the absurdity and lean away.
- **Gameplay value:** Strategic bench reading; strong against gullible courts, weak against skeptical ones.
- **World logic:** You argue something dubious, frankly stupid, and only susceptible justices fall for it.
- **Power:** `basePower: 6` for high-susceptibility, -3 for low-susceptibility

#### **"Mess With The Calendar"**

- **Type:** Utility / Defense
- **Effect:** You AND your opponent both skip the next round entirely. The trial advances to the next round without arguments from either side.
- **Gameplay value:** Closing tactic when you're ahead and want the trial to end without more sways. Risky if you're behind.
- **World logic:** You edit the Microsoft Calendar to delete one of the trial days. Court does not take place that day.
- **Power:** Potentially a slight risk of negative drift if you are "found out", though it's agreed no Supreme Court Justice actually knows how a computer works.

#### **"Cite International Law"**

- **Type:** Attack (sway-all, polarizes by party loyalty)
- **Effect:** High-party-loyalty justices (7+) are offended and lean away; low-party-loyalty independents (4 or below) are intrigued and lean toward you. Mid-loyalty justices unaffected.
- **Gameplay value:** Anti-partisan card; effective against heavily partisan benches if you can flip the independents. Risky if bench is all high-loyalty justices.
- **World logic:** "The European Court of Human Rights says..." — triggers partisan knee-jerk reactions. Independents appreciate the global perspective; partisans see it as foreign meddling.
- **Power:** `basePower: 5`, polarizes on partyLoyalty (high = -5, low = +5)
- **Note:** More partisans than independents exist in current justice pools, so this is a niche/risky card

---

### Deprecation Candidates

#### **"Be Extremely Boring"** (id: 12, ALREADY COMMENTED OUT)

- **Status:** Currently disabled in code
- **Reason:** "currently broken" per code comment
- **Decision:** ❌ **DELETE ENTIRELY.** Remove from codebase.

#### **"Celebrate St. Patrick's Day"** (id: 24)

- **Current effect:** All justices become Catholic (no immediate effect)
- **Problem:** Only useful when paired with "Take Me To Church" (id: 25). Dead draw otherwise.
- **Decision:** ✅ **REWORK (Option B)**
  - **New effect:** "All Catholic justices gain +4 empathy for the trial and immediately lean toward you. All non-Catholic justices become Catholic for the trial (with slight negative leaning toward you)."
  - **Result:** Card becomes standalone useful while keeping combo potential with Take Me To Church.

#### **"Suggest Yoga"** (id: 32)

- **Current effect:** Justice skips next round, returns with +empathy/+susceptibility
- **Problem:** Too similar to "Encourage A Nap" (id: 21). Nap is better (guaranteed +15 leaning).
- **Decision:** 💤 **COMMENT OUT** for now. Effect could be repurposed later with different mechanic (e.g., immediate stat boost without skip).

#### **"Catch A Justice On Their Phone"** (id: 34)

- **Current effect:** Target leans slightly away from you, loses susceptibility for the trial
- **Problem:** You're actively hurting yourself. Anti-synergistic design.
- **Decision:** 💤 **COMMENT OUT** for now. The "lore" is good (justice distracted by phone), but effect needs complete redesign. Possibly repurpose as opponent sabotage card later.

---

### Cards That Are Great As-Is

- ✅ **Emotional Appeal** — Strong single-target that rewards bench knowledge
- ✅ **Bribe the Justice** — Classic corruption, satisfying when it lands
- ✅ **Purge the Record** — Exciting reset button
- ✅ **I Call Dibs** — Great strategic depth
- ✅ **Elevate to Chief** — Dramatic power play with interesting tradeoffs
- ✅ **Betray Your Friend** — High-risk high-reward narrative chaos
- ✅ **Swap Clerks** — Fun gamble with clear outcomes
- ✅ **Reframe The Debate** — Rewards knowledge of justice stances
- ✅ **Gift Boxes Of Ferrero Rocher** — Polarizing effect is thematically hilarious

---

## 4. Toast Message Improvements

### Current Toast Pattern

Toasts show:

1. Tactic name
2. Target justice (or "All justices")
3. Static `tactic.feedback` text OR dynamic `overrideFeedback` from effect resolution
4. Justice leaning change indicators (±numbers, color-coded)

### Problems Identified

1. **Unclear magnitude:** Players see "+15" but don't know if that's good or mediocre
2. **Missing context:** "You played Emotional Appeal on Justice Sotomayor" → did it work well because she's high-empathy, or did I get unlucky?
3. **Weak flavor:** Some cards have great flavor text; toasts don't always communicate it

### Proposed Improvements

#### A. Add Magnitude Indicators to Feedback (No Numbers)

Dynamically adjust feedback based on effect strength. **Do not show numeric values in toasts** — use qualitative descriptors instead. Keep numbers in the post-round report modal for analysis.

**Example: Emotional Appeal**

| Leaning Change | Proposed Toast Feedback                                               |
| -------------- | --------------------------------------------------------------------- |
| 40+            | "**Devastating effect.** Justice [Name] was deeply moved."            |
| 25-39          | "**Strong sway.** Justice [Name] found this compelling."              |
| 15-24          | "**Moderate impact.** Justice [Name] was somewhat swayed."            |
| 5-14           | "**Slight nudge.** Justice [Name] barely reacted."                    |
| <5             | "**Barely moved.** Justice [Name] is unmoved."                        |
| 0              | "Justice [Name] has no feelings." _(edge case for 0-empathy justice)_ |

**Implementation:** Add magnitude check in `_tacticEffects.ts` when generating `overrideFeedback` for sway-one/sway-all. Map absolute change value to qualitative tier.

#### B. Explain Stat/Weakness Interactions

When a tactic uses `statBasis` or `weaknessBasis`, mention it in the toast:

**Example: Cite Precedents (statBasis: logic, polarizes-high)**

| Justice Logic | Current Toast                    | Proposed Toast                                                                |
| ------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| 9-10          | "Cite Precedents → All justices" | "High-logic justices respect the citation. Low-logic justices are annoyed."   |
| 1-2           | "Cite Precedents → All justices" | "Low-logic justices don't care about precedent. High-logic justices approve." |

**Example: Bribe the Justice (weaknessBasis: bribery)**

| Bribery Weakness | Proposed Toast                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------ |
| 8-10             | "Justice [Name] appreciates the _generous_ gift. (High bribery susceptibility)"            |
| 1-3              | "Justice [Name] is insulted by your attempt to corrupt them. (Low bribery susceptibility)" |

#### C. Add Knockon Indicators

When Chief Justice or high-charisma justices trigger knockon effects, call it out:

**Current:** Multiple results in the array, no explanation

**Proposed:**

- "Justice Roberts (Chief) was swayed, and his allies followed."
- "Justice Kagan's charisma influenced Justice Breyer."

#### D. Risk/Reward Outcome Language

For cards with randomness (Swap Clerks, Betray Your Friend, Fake A Health Scare):

**Good outcome:** "✅ The gamble paid off!"  
**Bad outcome:** "⚠️ That backfired."

---

## 5. Implementation Priority

### Phase 1: Quick Wins (Immediate Impact)

1. Add `playerPowerMult: 1.2` to `difficultySettings` (~2 min)
2. Add `targetSingleMultiplier: 10` and `targetAllMultiplier: 5` to `gameSettings` (~2 min)
3. Wire player power multiplier into `_tacticEffects.ts` (~3 min)
4. Update `_tacticEffects.ts` to use `gameSettings.targetSingleMultiplier` instead of hardcoded `* 10` (~2 min)
5. Bump `basePower` on 8-10 tactics per table in Section 2B (~10 min)
6. **Playtest** and validate the game feels better

### Phase 2: New Cards (Feature Work)

1. Implement 2-3 new cards from Section 3 (prioritize "Whisper Campaign", "Cite Bigfoot Precedent", "Cite International Law")
2. Rework "Celebrate St. Patrick's Day" to have immediate effect
3. Comment out "Suggest Yoga" and "Catch A Justice On Their Phone"
4. Delete "Be Extremely Boring" entirely

### Phase 3: Polish (UX Improvements)

1. Add magnitude indicators to toast feedback (Section 4A)
2. Add stat/weakness explanations to toasts (Section 4B)
3. Add knockon indicators (Section 4C)

---

## 6. Testing & Validation

### Metrics to Track

After implementing Phase 1 changes:

- **Win rate:** Should shift toward 50-60% for average players (currently feels <30%)
- **Justice flip rate:** How often does a justice go from "Strongly Against" to "Leaning For" or better? Should happen 2-3 times per game.
- **Player agency feel:** Qualitative feedback — do tactics feel impactful now?

### Regression Risks

- **Too easy:** If win rate jumps to 80%+, dial back `playerPowerMult` to 1.15 or reduce `swayAllMultiplier`
- **Balance between tactics:** Ensure single-target tactics still feel more impactful than all-target tactics per justice

---

## 7. Decisions Made

### ❌ Not Implementing (At This Time)

1. **Difficulty presets (Easy/Normal/Hard)** — Focus is on getting "Normal" difficulty right first. Once balance is dialed in, we can add difficulty modes.

2. **Sway-all scaling with bench size** — Bench size is constant (9 justices) in Quick Play. Campaign mode deaths don't warrant special scaling logic. Keep it simple.

3. **Trivia/knowledge-check cards** (e.g., "Appeal To Precedent From Justice's Home State") — Would require data we don't have (justice birthplaces, regions, etc.) and introduces complexity without a full feature suite. Could be future expansion.

### ✅ Design Decisions

1. **Show basePower on cards, not modified power** — Card displays consistent base strength; actual effect varies by target (as intended).

2. **targetSingleMultiplier and targetAllMultiplier should both be configurable** — Allows global balance tuning. Start with `targetSingle: 10`, `targetAll: 5` (2:1 ratio).

3. **Toast feedback should use qualitative language, not numbers** — "Devastating effect" instead of "+45". Keep numbers in post-round modal for analysis.

4. **Initial leaning is already visible enough** — Players can infer political affiliation before trial starts; sway bars show leaning once trial begins. No additional UI needed.

---

## Appendix: Power Calculation Reference

For future balance work, here's how tactic power is calculated:

```typescript
// 1. Start with basePower
let power = tactic.basePower;

// 2. Apply weakness scaling (if weaknessBasis)
if (tactic.weaknessBasis) {
  const effectiveWeakness = getEffectiveWeakness(justice, tactic.weaknessBasis, game);
  power = Math.round((power * effectiveWeakness) / 5);
}

// 3. Apply stat scaling (if statBasis)
if (tactic.statBasis === "logic" || tactic.statBasis === "empathy") {
  const logicDiff = justice.stats.logic - justice.stats.empathy; // −9 to +9
  const alignment = tactic.statBasis === "logic" ? logicDiff : -logicDiff;
  const sv = Math.round(((alignment + 9) / 18) * 9) + 1; // normalized 1–10

  if (tactic.statRelation === "amplifies") {
    power = Math.round((power * sv) / 5);
  } else if (tactic.statRelation === "polarizes-high") {
    power = Math.round((tactic.basePower * (sv - 5) * 2) / 5);
  }

  // Susceptibility modifier (±25%)
  const suc = getEffectiveStat(justice, "susceptibility", game);
  const sucMult = 1 + ((suc - 5) / 10) * 0.5;
  power = Math.round(power * sucMult);
}

// 4. Convert to leaning points
let effectivePower =
  tactic.effectType === "sway-all"
    ? Math.round(power * gameSettings.targetAllMultiplier) // proposed: 5 (up from 3)
    : Math.round(power * gameSettings.targetSingleMultiplier); // proposed: 10 (currently hardcoded)

// 5. Apply difficulty multipliers
if (actor === "opponent") effectivePower = Math.round(effectivePower * difficultySettings.opponentPowerMult);
// PROPOSED: if (actor === "player") effectivePower = Math.round(effectivePower * difficultySettings.playerPowerMult);

// 6. Apply to justice leaning
const next = Math.max(-100, Math.min(100, old + effectivePower * dir));
```

**Example:**

- Tactic: Emotional Appeal (basePower: 6, statBasis: empathy, amplifies)
- Justice: Sotomayor (empathy: 10, logic: 7, susceptibility: 6)
- Logic diff: 7 - 10 = -3 (leans empathy)
- Alignment for empathy tactic: -(-3) = +3
- Stat value: ((3 + 9) / 18) \* 9 + 1 = 7
- Power after stat: (6 \* 7) / 5 = 8.4 → 8
- Susceptibility mult: 1 + ((6 - 5) / 10) \* 0.5 = 1.05
- Power after susceptibility: 8 \* 1.05 = 8.4 → 8
- Effective power (sway-one): 8 \* 10 = 80
- **With proposed playerPowerMult (1.2):** 80 \* 1.2 = 96

**Current:** Emotional Appeal on Sotomayor = +80 leaning  
**Proposed:** Emotional Appeal on Sotomayor = +96 leaning

This is the difference between "strong" and "devastating" — which feels right for a max-empathy justice targeted by an empathy-based appeal.

---

## Summary

**Goal:** Make the Court game feel more responsive to player tactics while preserving strategic depth.

**Approved Changes (Phase 1):**

1. ✅ Add `playerPowerMult: 1.2` to `difficultySettings`
2. ✅ Add `targetSingleMultiplier: 10` and `targetAllMultiplier: 5` to `gameSettings` (rename from `swayAllMultiplier`)
3. ✅ Wire player power multiplier into `_tacticEffects.ts`
4. ✅ Bump `basePower` on ~10 tactics by +1 to +2 (per table in Section 2B)
5. ✅ Improve toast feedback: use qualitative language instead of numbers

**Approved Changes (Phase 2):**

1. 🆕 Implement new cards: "Whisper Campaign", "Cite Bigfoot Precedent", "Cite International Law", tempo cards (TBD names)
2. 🔄 Rework "Celebrate St. Patrick's Day" to have immediate effect
3. 💤 Comment out "Suggest Yoga" and "Catch A Justice On Their Phone"
4. 🗑️ Delete "Be Extremely Boring"

**Design Principles:**

- Card UI displays `basePower` (not modified effective power)
- Single-target remains 2x as powerful per-justice as all-target (10x vs 5x multiplier)
- Toast feedback is qualitative; numeric analysis stays in post-round modal
- Focus on "Normal" difficulty balance first; difficulty presets are future work

**Expected Outcome:** Players should feel like they can meaningfully influence justices over the course of 5 rounds, even when starting from a disadvantaged position. Justices should still feel individual and have strong starting opinions, but those opinions should be **workable** with good tactic selection.

---

## Recommended Tests & Validation

### Balance Validation Tests

These tests should validate that the power scaling changes work as intended and maintain consistent ratios.

#### 1. **Multiplier Application Test**

**Purpose:** Verify that `playerPowerMult`, `opponentPowerMult`, `targetSingleMultiplier`, and `targetAllMultiplier` are correctly applied to all tactics.

**Test cases:**

- Play a single-target tactic as player → verify final power = `basePower × statMods × targetSingleMultiplier × playerPowerMult`
- Play an all-target tactic as player → verify final power = `basePower × statMods × targetAllMultiplier × playerPowerMult`
- Play a single-target tactic as opponent → verify `opponentPowerMult` is applied instead
- Compare actual leaning changes to expected calculated values

**Expected ratio:** Single-target should consistently be 2x as powerful per-justice as all-target (10x vs 5x base multiplier)

#### 2. **Power Curve Consistency Test**

**Purpose:** Ensure that tactics with similar basePower produce similar results after stat modifiers.

**Test cases:**

- Compare "Emotional Appeal" (basePower: 7) on a high-empathy justice vs "Bribe the Justice" (basePower: 8) on a high-bribery justice
- Both should produce similar leaning changes (within 10-15 points)
- Test multiple justice stat combinations to ensure scaling is balanced

---

### Toast & Feedback Tests

#### 3. **Magnitude Descriptor Accuracy**

**Test cases:**

- Leaning change of 50 → toast should show "Devastating effect"
- Leaning change of 30 → toast should show "Strong sway"
- Leaning change of 18 → toast should show "Moderate impact"
- Leaning change of 8 → toast should show "Slight nudge"
- Leaning change of 2 → toast should show "Barely moved"
- Verify NO numeric values appear in toasts (only in post-round modal)

#### 4. **Stat/Weakness Context in Toasts**

**Test cases:**

- Emotional Appeal on high-empathy justice (large change) → toast includes "Their empathy made them deeply receptive"
- Bribe on high-bribery justice (large change) → toast includes "They appreciated the generous arrangement"
- Bribe on low-bribery justice (negative change) → toast includes "They were offended by the attempt"
- Logic-based tactics → toast includes logic-specific context
- Verify context only appears when stat/weakness is the basis for the tactic

#### 5. **Knockon Effect Indicators**

**Test cases:**

- Play single-target tactic on Chief Justice → verify knockon toast includes "Justice X followed suit"
- Play single-target on high-charisma justice → verify knockon triggers and is indicated in toast
- Multiple knockons → toast should say "Several justices followed suit" (not list all names or show numbers)

---

### Regression Tests

#### 6. **Existing Tactics Still Functional**

**Test cases:**

- Verify all pre-existing tactics (ids 1-36, excluding deleted/commented) still work
- Test edge cases: Purge the Record, I Call Dibs, Elevate to Chief, Recuse
- Verify multi-target mode (Swap Clerks, Elevate to Chief) still works
- Test stance-based tactics: Reframe The Debate with stance selection modal

#### 7. **No Crashes with New Cards**

**Test cases:**

- Play each new card in various game states (Round 1, Round 5, after recusals, with napping justices, etc.)
- Play multiple new cards in succession
- Combine new cards with existing tactics in same trial
- Test opponent playing new cards against player

---

### Suggested Test Implementation Priority

1. **Critical (Implement First):**
   - Multiplier Application Test (#1)
   - Magnitude Descriptor Accuracy (#3)
   - Existing Tactics Still Functional (#6)

2. **High Priority:**
   - Power Curve Consistency Test (#2)
   - Stat/Weakness Context in Toasts (#4)
   - Knockon Effect Indicators (#5)
   - No Crashes with New Cards (#7)

3. **Medium Priority:**
   - Individual new card tests (#4, #6, #8)
   - Toast context tests (#12, #13)
   - Existing tactics functionality (#14)

4. **Nice to Have:**
   - Campaign mode persistence (#17, #18)
   - Performance monitoring (#19)

---

### Test Frameworks & Tools

**Recommended approach:**

- **Vitest** for unit tests (already in use)
- **Helper utilities:**
  - `simulateTrial(tactics: Tactic[], bench: Justice[])` — play through a full trial with specified tactics
  - `measureLeaningChange(before: number, after: number)` → validate magnitude descriptor matches
  - `assertToastContains(text: string)` — validate toast content
- **Test data:**
  - Use existing justice pools (justiceCurrent, justiceHistorical, justiceFictional)
  - Create test fixtures for edge cases (all high-empathy bench, all partisan bench, etc.)

**File locations:**

- New tests: `tests/court-balance.spec.ts`, `tests/court-new-cards.spec.ts`, `tests/court-toast-feedback.spec.ts`
- Extend existing: `tests/court-tactic-effects.spec.ts`, `tests/court-regressions.spec.ts`
