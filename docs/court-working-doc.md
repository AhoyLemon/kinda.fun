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

Okay, so earlier today I ended a game with a 3-3-3 verdict. But the Verdict screen told me I lost. I think there's not logic to know what to do for a tie, so that's what I want to handle next.

IF the trial ends in a tie (ex: 4-4-1, 3-3-3, 2-2-5, etc) then the user should see that the court could not decide on a final veridct (side note: Later features will allow you to add additional seats to the bench. If 1 additional seat is added, a tie wil be even more likely). Display the verdict mostly as it is, but with indications that you neither won nor lost.

After this change to the "Verdict" screen, I will begin work on "Campaign Mode", which is described here: docs/court-campaign-mode.md - However, that's just something I want you to be aware of for next time. For now, let's fix this verdict screen to support ties, and then we'll move onto campaign mode.

## Campaign Mode: Clarifying Questions

Before starting Campaign Mode development, I'd like to confirm a few things that would affect architecture decisions. Answering these up-front will let me build more without stopping for feedback.

### Terminology
1. **Caseset vs Docket**: The doc asks for input on this. My suggestion: rename the existing "docket" (the card draw pile) to "playbook" or "hand deck", and use "docket" for the ordered list of cases in a campaign. That way "docket" has its real legal meaning. Alternatively, keep "caseset". What do you prefer?

### Routing & Entry Point
2. **Navigation**: Should Campaign Mode be a separate route (e.g., a "Campaign" button on the court-select screen leading into a campaign flow), or is it a mode flag on the existing setup flow?

### Campaign State
3. **Persistence**: Should campaign progress survive a page refresh (localStorage or Firestore), or is it fine to lose it on refresh (in-memory only)? In-memory is much simpler to build first.
4. **TypeScript architecture**: Should campaign state live in the existing `game` reactive object (e.g., `game.campaign`), or as a separate `campaign` reactive object in `Court.vue`?

### Tie Retry Mechanics
5. **Retry scope**: When a tied trial forces a retry, what resets? Options:
   - Full reset: bench leanings go back to baseline, player draws a new hand
   - Partial reset: leanings reset but the player keeps the same hand they ended with
   - No reset: continue exactly where you left off, just replay the turns

### Objective Cards
6. **Objective card data**: For objectives like "Republican Laws" (win cases in favor of the republican-preferred outcome), the game needs to know which outcome is "republican-preferred" for each case. Do I need to add a `partyAlignment: { republican: 'prosecution' | 'defendant', democrat: 'prosecution' | 'defendant' }` field to the case data model? Or should I model this differently?
7. **Side-locked objectives**: For "Defend The Law" / "Prosecute & Persecute" objectives, should the player's forced side override the court-select setup, or should that objective simply fail immediately if the player picks the wrong side?

### Reward Cards
8. **Reward card timing**: The doc says cards can usually be deployed during the "between trial" phase. Are any reward cards playable during the trial itself (before verdict)? If so, should reward cards have a `deployPhase: 'trial' | 'recess' | 'either'` field?
9. **Saved card limit**: Can the player hold multiple reward cards indefinitely, or is there a hand size limit for reward cards?

### Presidential Elections
10. **Election trigger**: `electionChance: 50` — does this apply only at actual election years (2024, 2028, etc.) as a chance the incumbent loses, or is it a 50% chance of *any* election happening every 2-year recess regardless of the year?

### New Campaign Tactics
11. **Tactic data model**: "Suggest Retirement" and "Keep That Crown" are new effect types. Should I add them to the existing `effectType` union in the TypeScript types, and add a `campaignOnly: boolean` flag to the `Tactic` type to prevent them appearing in Quick Play dockets?

### Recess UI
12. **Recess screen**: Is the "Recess" phase a full separate screen (like the verdict screen), or a modal/overlay that appears after the verdict is dismissed? Should the player actively interact with recess events (e.g., choose which nominee to accept if using "Justice Veto"), or are most events resolved automatically with just a summary shown?

---

## Eventual Next Steps

- docs/court-campaign-mode.md

- The player will be assigned a goal, such as "Complete Gender Equality", "Constitutional Racial Segregation", or "Instute Monarchy". Each resolved case will either move the player closer to or further from their goal, depending on which side they were on and how the justices voted.
- Between rounds, the player will be able to affect the bench, by forcing retirements, influencing nominations, or even packing the court.
- In single player, create difficulty settings
- AI Opponents should be given names
- Eventually, make this multiplayer
- Specific court makeups: eg: Warren Court, Bergen Court, Blackman Court, etc.
