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

Okay, the next thing I want to add is the concept of "stances", and use that to change the mechanics of how justices think and work.

- You'll notice in the Justice type, we've added a new property of `stances`. There's about two dozen of them that a justice can be "For" or "Against", which will play a large role in affecting their view of the case from the beginning.

This should be used alongside the existing party affiliation (ex: `favoredBy`, `nominatedBy`), so, for example, if a is explicitly "For" "CorporatePower", they will have a more favorable view of the prosecution than a justice who doesn't have an explicit opinion on CorporatePower, and a justice who is explicitly "Against" "CorporatePower" will have a more favorable view of the defense.

I have added stances for the 9 current justices and SOME presidents, but more need to be added and tinkered with.

I think the justices' "stats" are a little confusing and could be simplified. Here's some potential changes:

- `succeptibility` - Baseline stat of how easily they are to be swayed by an attack. So, in broad terms, the higher this number is, the more their opinion will be changed by an attack
- `logic` and `empathy` - I'm thinking these could work in direct contrast with each other on a single sliding scale. I'm thinking about something where a justice rules with their "heart" or their "head". Though I'm not sure of the syntax to use here. Suggestions welcome.
- `integrity` - Useless. Remove.
- `charisma` This will actually affect not their own weakness, but their ability to affect other justices. So if you play a very successful attack against a justice with high charisma, you will have a chance to see bonus effects in other justices. Justices should be more likely to affect other justices who were nominated by the same president, or at least belonging to the same party. Affecting a just from a different party would be unlikely.
- `partyLoyalty` - mainly stays how it is. Is should affect how much the President's views and parties would affect this justice.

I recognize redoing how justices work will mean reworking or possibly removing tactic cards. THAT IS ABSOLUTELY FINE. I'd like to make the mechanics sound, and we can always add more tactics cards. So remove tactics if they're inconvenient or have little effect, and feel free to suggest new ones while you're working (add to the doc please)

SO, how this is going to change the current game is...

- [ ] Review the stances. Add/edit/remove stances trying to use the historical record as a guide.
  - [ ] I'd like a justice to have somewhere between 3-5 stances apiece.
  - [ ] A President should have 5-7 stances.
- [ ] Also go through each case and try to add `historicalWinner` to each case, depending on which side won in real life history. This means you don't need to bother doing this for fictional cases.
- [ ] When definining what a justice thinks of a case, consider their `stances` first, then their nominating President's `stances`, and then finally `favoredBy` and `nominatedBy`.
- [ ] When the case starts, we should be seeing justices split on party lines, but I want a bit more variability between those justices, with a justice feeling strongly being more common than it is now.
- [ ] Canonically, we don't use the term "Republican" or "Democrat" when referring to justices. So when you're listing a justice's political affiliation, please use the words "Conservative" and "Liberal". This is just for flavor, Presidents are still "Republican" and "Democrat", and it basically means the same thing.
- [ ] Rework and remove tactics as you see fit.
  - [ ] I'll notice "Be Extremely Boring" doesn't feel fun to play, and "Appeal to Prcedent" and "Emotional Appeal" seem a bit boring to playtesters. "Justice Cocktails" and "Hire A Private Investigator" have made playtesters laugh, but they've been disappointed by the actual gameplay result. I think the major thing is that each card "does something" that's immediately apparent, and silly is good, but avoiding any particular card feeling "overpowered"
- [ ] Change to presidential nomination in "Campign Mode": When a President needs to nominate a justice, they try to find somebody with a few of the same stances (if possible). Once that nomination happens, the justice can inherit a few stances of their own.

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

