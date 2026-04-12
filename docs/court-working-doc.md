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

NEW CARDS:

- **Reframe The Debate**
  - Choose a justice. This card will select one stance of that justice, and make the case about that stance. This means a huge (x3) bonus, however, it will have trickle down effects. If other justices agree with that stance, they will be slightly swayed in your favor. If other justices disagree with that stance, they will be significantly (x1.75) swayed against you
- **Gift Boxes Of Ferrero Rocher**
  - Used on all justices as a "bribe" attack. If the justices have a weakness for bribery (6+) they will be swayed in your favor. If they have a resistance to bribery (3 or lower), they will hate this move and be swayed against you. In between, it will have no effect.
  - In the flavor text, make it clear that you're pretending it's just giftboxes of Ferrero Rocher, but it's actually a more substantial bribe. The boxes are lined with cash.

CARD TWEAKS

- **Appeal To Precedent**
  - Keep card as is, but change name to **Cite Precedents**
- **Be Extremely Boring**
  - I think the effect is fun, but it's not obvious what's happening. Maybe have the justices have something on their cards indicating that they've been softened for your next attack, which will be removed after your next tactic.
- **Justice Cocktails**
  - Change the name to **Order Drinks For A Justice**
  - Make them swayed slightly more than they are currently.
  - Make their succeptibility increase more.
  - In the flavor text, make it clear to the player that this should be EXTREMELY effective on Brett Kavanaugh.
  - If it's used on Kavanaugh, make him say "I LIKE BEER!" and increase the effect.
- **Elevate To Chief**
  - The person just crowned chief should like you more, although not as much as the previous chief dislikes you for doing this.
- **Invite To Church**
  - Rename to **Take Me To Church**
  - This should be a bit more effective on the actual target. I'm seeing the knockon effects, but the target doesn't seem swayed at all.
- **Swap Clerks**
  - Should give you feedback if it was successful or not. If the clerk(s) ratted you out, the player should know that.
- **Ring Me Up The President**
  - Should only be drawn if there are 1 or more Trump appointees currently on the bench. If not, this card should not be in the deck.

REMOVE cARDS

- **Constitutional Technicality**
  - Made rather redundant by **Cite Precedents**.
- **Hire A Private Investigator**
  - Too complicated to use, and not as fun as I'd like. Remove it.

SUGGESTIONS!?
I'd love you to suggest cards. Please suggest some here and describe the mechanics. Emphasize what would be fun to play (first and foremost) but also try to think about how it would fit into the satire of the game.

## Eventual Next Steps

- AI Opponents should be given names
- Eventually, make this multiplayer
