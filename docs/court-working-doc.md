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

### Suggested New Cards

- **Plant A Story**
  - Target one justice. Choose: plant a favorable or an unfavorable story in the press about them.
  - Favorable: their partyLoyalty goes up, they warm to you slightly, and same-party allies feel a small boost (rising tide).
  - Unfavorable: they take a big negative hit, but any opposing-party justices who already dislike them enjoy watching it happen.
  - Satirical angle: the press as a political instrument, specifically weaponized during confirmation hearings.

- **Send A Strongly Worded Letter**
  - Targets one justice. Very high chance of doing absolutely nothing. Small chance of a surprisingly large effect in your favor (the letter lands the exact right way at the exact right moment). Very small chance of backfiring catastrophically.
  - Flavor: the kind of move you play when you're out of real options. The fact that it occasionally works is the joke.

- **Invoke The Lemon Test**
  - Sways all justices based on their religion stat. Catholic justices are mildly offended. Very religious justices (Protestant/Catholic with notes) are strongly offended. Jewish justices find it mildly amusing.
  - Satirical angle: _Lemon v. Kurtzman_ established the separation of church and state test — the current court has been systematically dismantling it.

- **Emergency Yoga Retreat**
  - Target one justice. Their susceptibility and empathy go up dramatically for the rest of the trial. They also become unavailable for exactly one round (too busy finding inner peace). When they return, they're oddly centered and receptive.
  - Fun: combines the napping mechanic with the buff mechanic in an unexpected package.

- **File A Moot Brief**
  - Remove one card from the Docket permanently for the rest of the trial (not reshuffled into the deck). Works best as a denial move when opposing counsel has clearly been eyeing a specific card.
  - Satire: mootness is how the Court quietly kills cases it doesn't want to touch.

- **Drag Them On Social Media**
  - Target one justice. Their charisma drops permanently for the trial (they've gone defensive online). However, if their charisma is already low, they're used to it — this has no effect, and may actually make them sympathetic to lower-charisma bench peers.
  - Satirical: SCOTUS justices do not have social media. In any reasonable world.

## Eventual Next Steps

- AI Opponents should be given names
- Eventually, make this multiplayer
