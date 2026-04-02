# Purpose of this file

The goal of this file is to be a working document for the first PoC release of "Supreme Court: The Card Game" (aka "court").

This document CAN AND SHOULD be updated frequently. Its main purpose is to be a living document between the developer (Lemon) and the AI agent (mainly Claude) to keep track of the development process, decisions, and next steps for the game.

## What is "Supreme Court: The Card Game"?

The premise of this one is a game that works KIND of like Pokemon, Yugioh, or Magic: The Gathering, but with asymmetric cards.

The Court will have 7 justices (1 Chief Justice and 6 Associate Justices) and each justice will have positions, tactics, and arguments they like. They are, for gameplay purposes "enemies", insofar as you want to win by convincing them of your argment

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
- You may edit docs\court.md if we've made decisions that should be documented for future development.

## Previous Steps

Seee docs/court-working-doc-history.md for a session-by-session breakdown of the development process, including completed steps and decisions made.

## Next Steps

This is really working well. I like how this gameplay is progressing.

The opponent card play happens too fast. It's easy to miss that anything actually happened. We'll need UI for "Oppenent is deciding their tactic", maybe simulating them choosing a card? Let's just make the oppenent decide on their card for 4-6 seconds, with visual indictors therein.

For a lot of our other toasts, we've been using Vue-Toastification. What we're doing right now for toasts WORKS, but it could probably be more uniform to other kinda.fun games. Please see src\entries\megachurch.js and src\views\megachurch\Megachurch.vue and src\views\megachurch\components\Toasts for reference, and then strongly consider changing the current toast setup to that.

I want this commit to make this "feel" better on the cards, so whe cards are dealt, played and discarded, there should be a nice animation to that.

I want to be able to click on any justice and get their details. So if I click on the judge, bring up a detail display that shows that justice's picture, president who appointed them, ethnicity and religion, bio, and... yeah, just general stats. I SHOULDN'T see sometthing like "empathy: 3" because that would show too much of "the machine", but if there's a good way to hint at their stats and weaknesses, that would be ideal. Similarly, in the game setup, we have those views of LOGIC/CHARISMA/LOYALTY from 1-10. I don't want that, instead hints at which tactics might be good on this justice.

FWIW, I've added four images to public\img\court\justices and referenced those in src\views\court\ts_justices.ts - go ahead and use the ones that are available, with some generic backup if there's no image.

- [ ] Implement visual feedback when the opponent is "choosing" a card, make that last 4-6 seconds.
- [ ] Strongly consider Vue-Toastificatification similar to what we've implemented in the Megachurch Tycoon game.
- [ ] Add animation when cards are dealt
- [ ] Add animation when card is played
- [ ] Add animation when card is discarded
- [ ] Add animation when new card is drawn
- [ ] Add a detail view for a justice that can be accessed by clicking on a justice
  - [ ] When targeting a justice, clicking on that justice will give you the options of "View Justice" or "Target This Justice"
- [ ] Adjust the justice cards in the setup phase to not show numbers, but rather imply what this justice is about using their numbers.

## Eventual Next Steps

- Click any justice to zoom in on their stats
- The player will be assigned a goal, such as "Complete Gender Equality", "Constitutional Racial Segregation", or "Instute Monarchy". Each resolved case will either move the player closer to or further from their goal, depending on which side they were on and how the justices voted.
- Between rounds, the player will be able to affect the bench, by forcing retirements, influencing nominations, or even packing the court.
- Make one of the justices a "chief justice", which will hae some gameplay effects.
- In single player, create difficulty settings
- AI Opponents should be given names
- Eventually, make this multiplayer
