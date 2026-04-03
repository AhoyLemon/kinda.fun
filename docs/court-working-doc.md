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

- When showing the bench, always show the chief justice FIRST.

- I've noticed that "All Justices" attacks (eg: "Shout FREEDOM") are often far more powerful than single justice attacks. Let's make sure that attacks that target all justices will have a lesser effect than attacks that target a single justice, to encourage more strategic play.
- Also I need to do a lot of gameplay rebalancing, but to prepare for that, let's please adjust the justices' leanings to be -100 to +100, rather than -10 to +10, to give more room for differentiation and rebalancing.
- I managed to clean up the toasts, after playing with the css some. It COULD be a bit prettier, but it's displaying right now.
- When the toast displays Knockon effects, it does it like
  Justice (knockon) | +3
  Instead, I want "knockon" to be changed to "side effect" and be in its own span, at the end, so it looks like
  Jutice1 | +3
  Justice2 | +1 | (side effect)
  Justice3 | -2 | (side effect)

- I'm seeing a ts error in src\views\court\Court.vue, specifically line 473.

New Justices:

- Mentak The Mind Taker (fictional, from Harvey Birdman: Attorney at Law)
- Judge Doom (fictional, from Who Framed Roger Rabbit)
- Judge Reinhold (celebrity)
- Simon Cowell (celebrity)
- A DVD Boxed Set of Law & Order: SVU (fictional)
- Jerry Springer (celebrity)

Remove Justices:

- Justice Ham Sandwich
- The Honorable Vibes McGee
- Lady Justice

Add Presidents:

- Snoop Dogg (celebrity)
- Vermin Supreme (celebrity, https://en.wikipedia.org/wiki/Vermin_Supreme - he runs as a novelty candidate in many elections, and wears a boot on his head)
- Björk (celebrity)
- Bill Hicks (celebrity)
- Hunter S. Thompson (celebrity)
- Liberace (celebrity)

Remove Presidents:

- President Ronicus Thunderton
- President Cornelia Firebottom
- Supreme Overlord Maximus Von Decree

SO:

- [ ] Remove several justices.
- [ ] Remove all current fictional presidents
- [ ] Add the justices and presidents listed above. Feel free to invent stats and parties if necessary, but try to keep accurate to each character.
- [ ] Update the leanings to go from -100 to +100, rather than -10 to +10. Update the cards and justices accordingly, to prepare for future rebalancing.
- [ ] Rebalance the "All Justices" attacks to be less powerful than single justice attacks, to encourage more strategic play.
- [ ] Change "knockon" to "side effect" in the tactic toast, and move it to its own span at the end of each result line.
- [ ] Fix any and all TS errors
- [ ] Review and update docs\court.md

## Eventual Next Steps

- The player will be assigned a goal, such as "Complete Gender Equality", "Constitutional Racial Segregation", or "Instute Monarchy". Each resolved case will either move the player closer to or further from their goal, depending on which side they were on and how the justices voted.
- Between rounds, the player will be able to affect the bench, by forcing retirements, influencing nominations, or even packing the court.
- In single player, create difficulty settings
- AI Opponents should be given names
- Eventually, make this multiplayer
- Specific court makeups: eg: Warren Court, Bergen Court, Blackman Court, etc.
