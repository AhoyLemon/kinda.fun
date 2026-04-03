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

Seee docs/court-working-doc-history.md for a session-by-session breakdown of the development process, including completed steps and decisions made.

## Next Steps

I want to add tooltips to this game. In both cameo and megachurch, we're using tippy.js - so let's use that here as well.

I've noticed that every trial ends with all 9 justices voting, even when one justice is "undecided". Lt's actually make a threshold for a justice to actually vote one way or the other. If they don't meet that threshold, they abstain from voting. This adds more nuance to the game and allows for more variability in outcomes.

This means we COULD have ties, which is okay, and fun, so it's something we'll allow for and handle in future updates.

- While you're at it, in the `.topbar-tally`, I want to change the output to show the number of justices who are for-against, rather than for/total. So instead of "5/9 justices", it would say 5-4. If there are abstentions, it would say something like "5-3-1", with the last number being the number of abstentions. That readout should be red, green or yellow, depending on if the case is currently going your way. This allows us to lose the "winning"/"losing" text.
  - Please also add a tooltip to the tally explaining what the numbers mean if someone hovers on it.

- Create a `gameSettings` object, which will currently have 2 values: `numberOfRounds` (default 3) and `abstentionThreshold` (default 2). This will allow us to easily tweak these values in the future, and also allows for potential future features like allowing players to customize these settings.

- Remove the "New Court" button in the playing screen.
- Move the "New Draw" and "Change Mode" buttons to the TODAY'S CASE section, as right now it looks like those buttons affect the current court.

- Add a new tactic called "Recuse Yourself!". What this does is reset the targeted justice to neutral (undecided), but ALSO makes them harder to sway with later tactics.

- I've been splutting some of `src\views\court\Court.pug` into partials in `src\views\court\pug`. This works, BUT I need to actually touch Court.pug to trigger the dev environment to see the changes to the partials. Please address.

- "Ring Me Up The President" doesn't quite work the way I was expecting, because I didn't mean for that to be a targeted attack. Instead what's supposed to happen is you bring up a Zoom call with Donald Trump who talks nonsensically for like 10 minutes before accidentally hanging up. BIG positive effect to all Trump nominees, tiny positive effect to Republican appointees, BIG negative effect to Obama and Biden nominees, and tiny negative effect to all other Democratic appointees.

Justices To Add

- John Jay (Historical)
- John Marshall (Historical)
- John Marshall Harlan (Historical)
- Earl Warren (Historical)
- Roger B. Taney ( Historical)
- Henry Billings Brown (historical)
- Mr. Beast (celebrity)
- The Undertaker (celebrity - the professional wrestler, who apparently judiciated in something called wrestler's court)

Justices to Remove

- Judge Roy Bean (was never actually a supreme court judge, and I don't think he fits in the celebrity category)

- [ ] Add tippy.js and use it in the topbar-tally
- [ ] Redo topbar-tally
- [ ] Allow for abstentions, controlled by gameSettings
- [ ] Move the "New Draw" and "Change Mode" buttons
- [ ] Remove the "New Court" button
- [ ] Add "Recuse Yourself!" tactic
- [ ] Fix the issue with the Court.pug partials not updating
- [ ] Change "Ring Me Up The President" to be a non-targeted attack with the effects described above
- [ ] Add the justices listed above
- [ ] Remove Judge Roy Bean

## Eventual Next Steps

- The player will be assigned a goal, such as "Complete Gender Equality", "Constitutional Racial Segregation", or "Instute Monarchy". Each resolved case will either move the player closer to or further from their goal, depending on which side they were on and how the justices voted.
- Between rounds, the player will be able to affect the bench, by forcing retirements, influencing nominations, or even packing the court.
- In single player, create difficulty settings
- AI Opponents should be given names
- Eventually, make this multiplayer
- Specific court makeups: eg: Warren Court, Bergen Court, Blackman Court, etc.
- Handle ties
