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

### UI / Template Work for New Tactic Cards

The new cards (ids 19–25) have full backend logic and now have visual polish in the template:

- [x] **Multi-target mode UI** — Orange `.targeting-banner` above the bench + pulsing docket hint: "Select N more justice(s) above". Banner visible whenever `game.multiTargetMode` is true.
- [x] **Betray Your Friend — disabled state** — Card gets `is-disabled` class (opacity 0.3, pointer-events: none) when no justice has leaning ≥ 60. Works for both claimed and shared docket cards.
- [x] **Napping justices** — `.justice-napping-overlay` (dark translucent fullcard overlay with 💤 centered) + `is-napping` dim on the card. Tooltip explains wakeup bonus. Pointer-events: none so card is still clickable.
- [x] **Stat mod buff indicator** — `.justice-buff-badge` (purple top-left corner pill, 🍸) + `is-buffed` purple glow on card when `game.statMods[justice.id]` exists.
- [x] **Religion override** — Justice detail modal now shows `game.religionOverrides[id] ?? justice.religion` with a ☘️ indicator when overridden.
- [x] **Multi-target selected justices** — `is-multi-selected` class gives justices an orange border + glow once clicked during multi-target mode.

**Also added (requested during this session):**

- [x] **Selected card spotlight** — When any targeting card is active, `.court-docket.has-selection` dims + shrinks all other tactic cards (opacity 0.38, scale 0.93, brightness 0.55) and enlarges the selected card (translateY(-8px) scale(1.05)) with a pulsing gold glow animation (`tactic-selected-glow`). Multi-target cards also show as `is-selected` via `game.multiTargetTacticId`.

### Other Upcoming Work

- Look at game balance, particularly the effectiveness of new cards (19–25) in practice

## Eventual Next Steps

- The player will be assigned a goal, such as "Complete Gender Equality", "Constitutional Racial Segregation", or "Instute Monarchy". Each resolved case will either move the player closer to or further from their goal, depending on which side they were on and how the justices voted.
- Between rounds, the player will be able to affect the bench, by forcing retirements, influencing nominations, or even packing the court.
- In single player, create difficulty settings
- AI Opponents should be given names
- Eventually, make this multiplayer
- Specific court makeups: eg: Warren Court, Bergen Court, Blackman Court, etc.
