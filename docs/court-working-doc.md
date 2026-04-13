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

_(All items from the previous session have been implemented. See court-working-doc-history.md for details.)_

TACTIC SUGGESTIONS (from previous WHEN COMPLETE prompt):

### New Tactics to Add

- **Request An Amicus**
  - Targets all justices, but scaled: the more justices already leaning your way, the stronger the effect.
  - Effect: Sway all justices slightly; bonus sway per justice already on your side (momentum-style).
  - Flavor: "You found some friends with opinions. Relevant ones."
  - Why: Rewards a player who's building momentum; adds a satisfying snowball feeling.

- **Catch A Justice On Their Phone**
  - Single target.
  - Effect: Reduces target's `susceptibility` for the rest of the trial (they've already googled the answer and aren't listening anymore) + mild negative sway.
  - Flavor: "They weren't taking notes. They were texting."
  - Why: A counter/debuff more about disruption than persuasion. Changes pace.

- **File An Emergency Motion**
  - No target.
  - Effect: Immediately retrieve one previously-played card from the discard pile and add it back to your hand.
  - Flavor: "You found a procedural loophole. There's always a loophole."
  - Why: Resource recovery. Lets you replay a favorite tactic. Has strategic depth.

- **Recite The Dissent**
  - No target.
  - Effect: For each justice already voting AGAINST you, gain a small flat sway bonus on all justices voting FOR you.
  - Flavor: "You read the whole thing out loud. All 47 pages."
  - Why: Rewards being behind — helps catch up when losing. Creates tension.

### Tactics to Consider Removing

- **Yell 'FREEDOM!'** (id:10) — It's extremely simple (flat sway-all) and the joke lands once but it doesn't have any mechanical depth. It's kept alive by being funny, which is valid. No strong case to remove it, but it's the most replaceable card if a slot is needed.

### Tactics to Consider Editing

- **Encourage A Nap** — The wake-up bonus (+15 leaning) isn't visible to the player from the card description. Consider adding a hint like "Returns reinvigorated" or noting they come back with improved lean, so players understand why they'd waste a round on it.
- **Recuse Yourself!** — The mechanic (halved sway resistance while recused) isn't communicated. The description could say something like "Their resistance is halved while absent." Players shouldn't have to discover this by accident.
- **Plant A Story** — Consider making this targeted instead of all-justices, with a stronger `partyLoyalty` effect on one justice. The all-justices version is fine but a targeted version creates more decision-making.

## Eventual Next Steps

- AI Opponents should be given names
- Eventually, make this multiplayer
