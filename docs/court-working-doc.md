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

Okay, some tweaks to cards..

EDIT EXISTING CARDS

- "I Call Dibs"
  - The "Dibs" card doesn't quite work out the way I expected. Firstly, immediately after playing it, you'll draw another card, and choose your two claimed cards from those. Instead, you should play the Dibs card, and then be able to claim 2 of the 4 remaining cards. Once that happens, the next player will draw 1 card, bringing the total back to 5 (3 unclaimed, 2 claimed).
    - I'm also noticing that it's drawing back up to 5 community cards, so in fact after calling dibs, there are 7 cards to choose from, which is a mistake. There should only be a max of 5 cards to play from, unless we create some new tactic that addss a card.
- "Constitutional Technicality"
  - This card doesn't seem to create negative effects, but should. While it SHOULD be effective to sway low logic judges to your side, if a jude is appropriately high logic, they will be insulted, and will gain a negative opinion.
- "Appeal To Precedent"
  - This card should basically be the exact opposite of "Constitutional Technicality". It should be effective on high logic judges, but insult low logic judges, who will gain a negative opinion of you.
- "Be Extremely Boring"
  - I think the actual EFFECT of this card is good, but the visual feedback could be better. When playing it, the player will see "No measurable effect", which isn't great. Instead, I'd like to have this and other "utility" card types to have more distinct feedback. For this one, it should say "All judges are more succeptable to arguments"
    - Likely add an optional "feedback" field to the tactic schema.
- "Redirect The Witness"
  - See above, this one should say "{JusticeName} is protected from your opponent's next argument"
  - Oh also, the shield SHOULDN'T be broken until this justice would be swayed one way or another by your opponent. Can you ensure that is the case?
- "Purge The Record"
  - feedback: "The Docket has been cleared."

NEW CARDS:

- "Betray Your Friend"
  - To play this card, you must have 1 or more justices who are currently leaning "STRONGLY FOR", otherwise the card is disabled for you.
  - When played, you can target any single justice who is currently leaning "STRONGLY FOR" your position, and insult them personally. This will EXTREMELY turn that justice against you, almost definitely moving them to STRONGLY AGAINST. However, any justices from the opposing party who are currently "LEANING AGAINST" you have a good chance of being swayed to your side.
- "Swap Clerks"
  - Select any two justices.
    - You have a FAVORABLE chance of swapping their positions entirely, meaning if one was +38 and one was -20, they would swap to be -20 and +38.
    - HOWEVER, you have stastically relevant chance to be tattled on by the legal clerks. If that happens, both justices will have increased negative opinion of you.
- "Encourage A Nap"
  - Select a single justice.
  - That justice will NOT change their position at all for the next round, regardless of what arguments are played.
  - If the trial is still happening after the next round, they will wake up and gain a small positive opinion of you because they're now well rested.
  - This DOES NOT have knockon/side effects on other justices, who are unaware their colleage is napping.
- "Justice Cocktails"
  - Select a single justice.
  - That justice will have their charisma and empthy increased, and their logic decreased, for the remainer of the trail.
- "Hire A Private Investigator"
  - Select two justices.
  - Both of justices will have their weakness to blackmail SIGNIFICANTLY increased for the remainder of the trial.
- "Celebrate St. Patrick's Day"
  - Turns all justices Catholic.
  - Has little gameplay effect? I'm not sure what effect religion has on the game right now, but it could make for more fun strategies later. Speaking of...
- "Invite To Church"
  - Select a single justice.
  - That justice will have their empathy increased for 2 rounds. Every justice witht the same religion will gain a medium positive opinion of you.

## Eventual Next Steps

- The player will be assigned a goal, such as "Complete Gender Equality", "Constitutional Racial Segregation", or "Instute Monarchy". Each resolved case will either move the player closer to or further from their goal, depending on which side they were on and how the justices voted.
- Between rounds, the player will be able to affect the bench, by forcing retirements, influencing nominations, or even packing the court.
- In single player, create difficulty settings
- AI Opponents should be given names
- Eventually, make this multiplayer
- Specific court makeups: eg: Warren Court, Bergen Court, Blackman Court, etc.
