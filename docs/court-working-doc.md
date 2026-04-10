# Purpose of this file

The goal of this file is to be a working document for the first PoC release of "Supreme Court: The Card Game" (aka "court").

This document CAN AND SHOULD be updated frequently. Its main purpose is to be a living document between the developer (Lemon) and the AI agent (mainly Claude) to keep track of the development process, decisions, and next steps for the game.

## What is "Supreme Court: The Card Game"?

The premise of this one is a game that works KIND of like Pokemon, Yugioh, or Magic: The Gathering, but with asymmetric cards.

The Court will have 9 justices (1 Chief Justice and 6 Associate Justices) and each justice will have positions, tactics, and arguments they like. They are, for gameplay purposes "enemies", insofar as you want to win by convincing them of your argment

The PLAYER will draw a single CASE card, and will be assigned to either the prosecution or the defense. The player will then be dealt a hand of 5 ARGUMENT cards, and will have to choose which one to play each turn. Each justice will have their own preferences for which arguments they like, and the player will have to try to convince them to vote in their favor.

This game is turn based.

## Primary / Secondary Goals: Fun & Satire

The primary objective of this game, like any video game, is to be fun.

However, the secondary objective is to be biting satire, specifically of the political leanings of the Supreme Court. It should serve as a commentary to argue that political leanings of the justices are the primary factor in their decisions, and that the legal arguments they make are often just a facade to justify their predetermined positions. Also shenanigans.

## Agent Strategy

- Always start by reading this and any other referenced documents
- Create a TODO list of what needs to be ddone.
- You make ask questions when necesssary. However, I'd like you to do as much work as you can without a lot of stopping for user input, only because that means I have to spend more tokens. Look for ways to batch feedback, preparing work and then asking for feedback on a larger chunk of work, rather than asking for feedback on small pieces of work.
- You are encouraged to edit this document as you see fit.
- You may also edit .github\copilot-instructions.md if you think that would be helpful for future development.
- Before completing your task, please review docs\court.md to make sure it's up to date and accurate, add any new details if you wish.

## Previous Steps

See docs/court-working-doc-history.md for a session-by-session breakdown of the development process, including completed steps and decisions made.

## Next Steps

- [ ] In The "Today's Case" overview, I'd like to identify the stances of each side, as well as which party it would favor. Also, please don't color-code the "favors {party}" tags. There's already colors for prosecution vs defense, so the party colors confuse it.
  - [ ] Make a note that there's something that we'll need to address at some point, which is the idea that the idea of a "Republican" or "Democrat" has shifted (ex: In today's world, Abraham Lincoln would be considered a "Democrat") so we'll need to adjust that at some pont.
- [ ] When I bring up the `.justice-detail` modal, I want to be able to click in to see that president. Ex: When I bring up John Roberts, it says "Appointed by Goerge W. Bush". In that text, "George W. Bush" should be a link which brings up the `president-detail` modal for George W. Bush, where I can see his stances and other info.
- [ ] In the `.justice-detail` modal, I should get a glimpse of that justice's stances, as well as their general `heartVsHead` and their level of succeptibility.
- [ ] In the `bench-overview-bar`, it says "Republican (6) Democrat (3)". It should actually say "Conservative (6) Liberal (3)". We should try to be aware that justices are considered "Conservative" or "Liberal" rather than "Republican" or "Democrat"
- [ ] "Call a Celebrity Witness" is good, but it's too powerful. Attacks for all justices should sway a justice less than attacks that target individual justice(s).
- [ ] In the Game Over screen, let's make a little tweak...
  - If you're in "Quick Play" mode, there should be a potential of an additional button: "Retry Case" but only if you lost, this will do the same case with the same justices).
- [ ] See section: Logic vs. Empathy: Sliding Scale Proposal, I've answered the questions you've posed. Please implement.
- [ ] I ses TS errors in src\views\court\ts_campaignManager.ts, please make sure all errors are resolved.
- [ ] Please create a vitest for testing out stances. What I'd like it to do when it's run is check the stances against the stances used by justices, presidents and cases, and list the 5 most/least used stances. If you find any stances that are not being used at all, please flag those as potential errors.
- [ ] I think I'd like you to create somehing like `settings.difficulty`, which could have some knobs that could be tweaks to make the game harder or easier. At the moment, this can be very simple, I'd just like to expose the gameplay modifiers for easy tweaking.

## Eventual Next Steps

- In single player, create difficulty settings
- AI Opponents should be given names
- Eventually, make this multiplayer
- Specific court makeups: eg: Warren Court, Bergen Court, Blackman Court, etc.

## Logic vs. Empathy: Sliding Scale Proposal

**Current state:** `logic` and `empathy` are separate stats (each 1–10). They independently affect two tactics — `Appeal to Precedent` scales with logic, `Emotional Appeal` scales with empathy. Otherwise they do nothing.

**Proposed display change:** Rather than showing two separate bars, represent both stats as a single "Heart vs. Head" slider:

- Derived value: `heartVsHead = empathy - logic`
- Range: roughly −9 (pure logic) to +9 (pure empathy)
- Display: a labeled slider, left anchor = "Rules by the Book", right anchor = "Rules from the Heart"
- Each justice would show their position on the scale visually instead of two raw numbers

**Gameplay implications (no mechanical changes required):**

- The existing tactic scaling already works correctly — `Appeal to Precedent` punishes high-empathy justices (low-logic side of scale); `Emotional Appeal` punishes high-logic justices (high-logic side of scale)
- No changes to `_tacticEffects.ts` needed; only the justice-detail stat display in the Vue component would change
- The raw `logic` and `empathy` values stay on the `Justice` type; only the UI presentation changes

**Implementation sketch (when ready):**

```ts
// Computed display value
const heartVsHead = computed(() => justice.stats.empathy - justice.stats.logic);
// Range: -9 to +9; normalize to 0–100 for a CSS progress bar
const sliderPercent = computed(() => ((heartVsHead.value + 9) / 18) * 100);
```

**Open question:** Should the scale affect how `succeptibility` behaves differently for logic-based vs. empathy-based tactics (i.e., a high-empathy justice is more susceptible to emotional appeals, less so to logical ones)? This would require a small change to `_tacticEffects.ts` but could add meaningful depth. Currently `succeptibility` is universal — discuss before implementing.

### ANSWERS TO ABOVE

- I like your idea. Let's go with this. And yes, let's have `succeptibility` still play a role if you do a Heart vs Head attack, but it will have a lesser effect. So, for example, if you do a purely "logic based" tactic on a justice (eg. Cite Prescedents), the efficacy of that tactic will be more inferred by the `heartVsHead` stat, but the `succeptibility` stat could create a modifier of perhaps 1.25x (or so).
