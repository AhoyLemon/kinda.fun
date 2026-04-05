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

Campaign Mode has begun, please see the "Campaign Mode Changes" section for for what's left to be done.

- I just did a test game where my objective was "The Biggest Loser", and won my first trial 9-0. This gives me the verdict screen and a button to "Receive Win Bonus". In this situation, I SHOULD see the verdict, because that's useful context to the user, however I SHOULDN'T see the "Receive Win Bonus" button, because my game ended when I failed to meet the objective.

Therefore, I should have a button that will be labeled "Advance", which should go straight to the game over screen. Basiscally everything works like it should, because "Receive Win Bonus" DOES take me to the game over screen, but the button is wrong, that's the only fix necessary here.

- In another test, I got to the "Recess" screen, but the "During Recess" box contains 3 empty items. Each one has the '📋' icon, but no text for what happened. I think that might be looking for the wrong variable.

- In the game over screen, I see two buttons: "Play Again" and "New Campaign". They both seem to do the same thing.

## Campaign Mode: Clarifying Questions

Before starting Campaign Mode development, I'd like to confirm a few things that would affect architecture decisions. Answering these up-front will let me build more without stopping for feedback.

### Terminology

1. **Caseset vs Docket**: The doc asks for input on this. My suggestion: rename the existing "docket" (the card draw pile) to "playbook" or "hand deck", and use "docket" for the ordered list of cases in a campaign. That way "docket" has its real legal meaning. Alternatively, keep "caseset". What do you prefer?

#### Answer

You're right, let's use "Docket" to refer to a group of cases, since that's in line with how that word is used in real life. That means we should, as you say, change the exising use of "Docket" to "Playbook", both in code and in the UI. Let's also add a small bit of text in the "Playbook" section saying "Playbook is shared between both counsels."

### Routing & Entry Point

2. **Navigation**: Should Campaign Mode be a separate route (e.g., a "Campaign" button on the court-select screen leading into a campaign flow), or is it a mode flag on the existing setup flow?

#### Answer

Wonderful question. Let's add a Title Screen that gives the name of the game (placeholder for eventual logo, similar to what's on https://kinda.fun/cameo ) and then two buttons: "Quick Play" and "Campaign Mode". Save a setting in localStorage of `hasPlayedQuickplay: Boolean` to track whether the user has played a quickplay game before. If they haven't, add a small piece of UI to this screen indicating first time players should play Quick Play first.

Once you select that, either way you will then select the court. Let's have another localStorage, this time `hasPlayedCurrentCourt: Boolean` If THAT is false, a piece of UI should say "Current Court" is recommended for your first time (replaces the "default" tag currently on the court select screen)

### Campaign State

3. **Persistence**: Should campaign progress survive a page refresh (localStorage or Firestore), or is it fine to lose it on refresh (in-memory only)? In-memory is much simpler to build first.
4. **TypeScript architecture**: Should campaign state live in the existing `game` reactive object (e.g., `game.campaign`), or as a separate `campaign` reactive object in `Court.vue`?

#### Answers

3. That's generous of you to offer, but I think that could overcomplicate things. Let's do everything in memory. If you do a refresh, it just goes back to the title screen. This is how it works for all kinda.fun games

4. Hmmmmmm, that's a good question. I GUESS what we probably should have is a `game` object that has a `case` object (everything related to the current case), and a `campaign` object (everything related to the campaign you're currently playing, if applicable). That's what makes the most sense to me.

### Tie Retry Mechanics

5. **Retry scope**: When a tied trial forces a retry, what resets? Options:
   - Full reset: bench leanings go back to baseline, player draws a new hand
   - Partial reset: leanings reset but the player keeps the same hand they ended with
   - No reset: continue exactly where you left off, just replay the turns

#### Answers

5. Well, you should have the same justices, and the same case. But I guess the "Playbook" can change. So... let's go with Full Reset.

### Objective Cards

6. **Objective card data**: For objectives like "Republican Laws" (win cases in favor of the republican-preferred outcome), the game needs to know which outcome is "republican-preferred" for each case. Do I need to add a `partyAlignment: { republican: 'prosecution' | 'defendant', democrat: 'prosecution' | 'defendant' }` field to the case data model? Or should I model this differently?
7. **Side-locked objectives**: For "Defend The Law" / "Prosecute & Persecute" objectives, should the player's forced side override the court-select setup, or should that objective simply fail immediately if the player picks the wrong side?

### Answers

6. Well, I'm pretty sure that data actually already exists. For example, "New York Times Co. v. United States" has UI that says Prosecution favors the democrats, and Defense favors the Republicans. So we can use that logic. HOWEVER, I'm realizing there are more than 2 parties (eg: Federalist, Whig, etc) - so I guess instead of "Republican", we should use words like "Left" or "Right", since we have the const of `leftParties` and `rightParties` that groups those together.

7. Lovely question, you're right. So yes, if you have the objective of "Defend The Law", at the case select, it should disable the button that allowes you to choose to represent the prosecution, and a piece of UI saying "You must choose Defense to meet your objective". Failing because you accidentally clicked the wrong button would be lame.

### Reward Cards

8. **Reward card timing**: The doc says cards can usually be deployed during the "between trial" phase. Are any reward cards playable during the trial itself (before verdict)? If so, should reward cards have a `deployPhase: 'trial' | 'recess' | 'either'` field?
9. **Saved card limit**: Can the player hold multiple reward cards indefinitely, or is there a hand size limit for reward cards?

### Answers

8. Oooh! I hadnt considered that! That's a wonderful idea! Okay, let's add a card with `deployPhase: 'trial'` called "Double Tap". During the trial, you can choose to activate this card, and then you can play 2 tactics during your turn, after which point the card is burned. This opens up the possibility of other bonus cards that are played at trial time. In the UI, if you HAPPEN to have one or more of those cards, it should be in a separate box, underneath the Playbook. If you don't have any of those cards, you won't see that box.

9. Nah, no max, no time limit. Each bonus card can be held indefinitely until use. It is also possible to draw the same card more than once, that's fine. But like Playbook, we have the same logic of a draw pile and a discard pile, just to maximize variety.

### Presidential Elections

10. **Election trigger**: `electionChance: 50` — does this apply only at actual election years (2024, 2028, etc.) as a chance the incumbent loses, or is it a 50% chance of _any_ election happening every 2-year recess regardless of the year?

#### Answers

10. Lovely question, okay, let me clarify. Let's say it's the year 2000, and the president is George W. Bush. For the second trial, 2002 isn't an election year, so George W. Bush remains the president. 2004 IS an election year, so there is a 50% chance of George W. Bush being replaced, but let's say he isn't. 2006 isn't an election year, so George W. Bush is still the president. In 2008, George W. Bush is bound by term limit, so he WILL be replaced. In 2002 during recess, it says "George W. Bush is still The President." In 2004 during recess, it says "George W. Bush won re-election. He will be President for another 4 years." In 2008 it says "Barack Obama is now The President."

### New Campaign Tactics

11. **Tactic data model**: "Suggest Retirement" and "Keep That Crown" are new effect types. Should I add them to the existing `effectType` union in the TypeScript types, and add a `campaignOnly: boolean` flag to the `Tactic` type to prevent them appearing in Quick Play dockets?

#### Answers

11. I thought I explained that, but yes. You'll need to add a new `campaignOnly` flag to all tactics so that you won't draw cards that have campaign effects during quick play. You can feel free to add `effectType` willy-nilly, I have no opinion about that.

### Recess UI

12. **Recess screen**: Is the "Recess" phase a full separate screen (like the verdict screen), or a modal/overlay that appears after the verdict is dismissed? Should the player actively interact with recess events (e.g., choose which nominee to accept if using "Justice Veto"), or are most events resolved automatically with just a summary shown?

#### Answers

12. Completely separate screen, yes. So when you're in campaign mode, when you look at the Verdict screen, there willl be.... actually, 3 more screens...

- If you won the case, you'll have a button that says "Receive Win Bonus", which shows you the bonus card you just won.
- If you have 1 or more bonus cards (specifically bonus cards that affect recess), you'll have a prompt to "Activate Bonus"
- The Activate Bonus screen will show you the bonus card(s) you could activate right now. You can click one and confirm and then it will be activated during recess. You could hypothetically activate more than 1 card if you like. Then there is a "Recess" button that gives you the recess screen.
- If you lost, the verdict screen won't have a "Receive Win Bonus", but instead a "Activate Bonus" button (if you have 1 or more than apply) and a "Recess" button.
- The Recess screen should basically be an ordered list of things that happened during this 2 year recess period. If possible it would be COOL to give each event a date stamp, eg
  - Aug 3rd, 2027 Justice Clarence Thomas has died.
  - Nov 13th, 2027 President Jane Doe nominates Justice John Smith to fill the vacancy.
  - Jan 14th, 2028 Judge Dredd is sworn in as the new president.
    etc

---

## Open Questions from Campaign Mode Implementation (April 2026)

These questions arose during the implementation pass. Please review and answer when you get a chance — no rush, nothing is blocked by them.

### Case Selection for Campaigns

**Q1**: The Warren Court campaign uses case IDs `[2, 5, 14, 12, 19]` — case 7 (Obergefell v. Hodges, 2015) was swapped out for case 14 (Loving v. Virginia, 1967) to better fit the era. Is that fine, or do you want to revisit the case selection for each campaign?

**A1**: That's totally fine. I can and will make adjustments to courts and campaigns. I like that you used your best judgement, and I will change it back if I'd prefer to.

### Receive Reward Screen

**Q2**: Both "Keep in Hand" and "Add to Trial/Recess Hand" on the receive-reward screen currently do the exact same thing (add the card to `rewardHand`). The distinction between "save for later" vs "use now" was deferred to the activate-bonus screen. Should there be an immediate-deploy path where activating a recess card right from this screen resolves it without going through the bonus screen at all? Or is the current flow (all cards go to hand → activate at bonus screen) correct?

**A2** I noticed that in my gameplay test. I think the UX for getting/using your bonus is a bit clumsy. So, I'd like a nice "fun" animation of your bonus card (maybe confetti?) and then a single button labeled "Prepare For Recess". That button will take you to the "Pre-Recess Bonuses" section. Rather than Activate/Skip, there should only be "Activate". If you don't activate, and procesed to recess without activating a card, it just stays in your hand.

### Justice Veto Flow

**Q3**: "Justice Veto" lets the player save two candidates and guarantee one gets nominated at the next vacancy. In the current implementation, the player chooses _which_ of the two candidates they want during the activate-bonus screen. But the actual seating happens in `processRecess()` automatically when a vacancy is filled. Is that the right mental model? Or should the player make the "who gets nominated" choice at a later point (e.g., when the vacancy actually occurs during recess)?
**A3** I think the mental model I'd like is "During recess, do user-controlled things before automatic things". So, let's say you hypotetically had 3 open seats and 2 active bonuses, 1 was "Dream Justice", and one was "Justice Veto"

1. Fill the first seat with the dream justice.
2. The second seat gets filled by the current president, and because you had "Justice Veto", you get to choose 1 of 2.
3. The third seat gets filled by the current president. There are no more bonuses, so no player involvement takes place.

### Not Enough Chairs

**Q4**: "Not Enough Chairs" uses `pendingBenchSeatDelta` to shrink `benchSeats` from 9. The effect triggers at the _next natural vacancy_ — but the current code decrements the seat count immediately during recess and then the vacancy-fill loop naturally stops when seats are full. If no justice leaves, the seat count still drops on the _next_ recess. Is this the intended behavior, or should it instead be a flag that prevents the _next_ vacancy from being filled (keeping the departing justice's slot empty)?
**A4**: That was my intention, although I recognize that _could_ make for clumsy code. So let's "cheat" the system a little bit.

- If "Not Enough Chairs" is played, it would be ideal if we created at least one vacancy during that recess. If that happens naturally, great.
- HOWEVER, if it so happens that no vacancy would have happened during receess, let's make one of the justices die of natural causes. Pretend it happened in the usual system.
- So basically we're forcing at least 1 vacancy to match with Not Enough Chairs, but we're not letting the player know that.

### Campaign Banner Visibility

**Q5**: There is now a campaign banner visible during both `setup` and `playing` phases showing the active objective and trial number. Is this the right level of visibility, or should it also appear on the verdict screen separately (it currently shows there via `.verdict-objective` below the vote tally)?

**A5** I believe that's the right amount of visibility. The player should keep their objective top of mind, as it should affect their strategy during gameplay.

### Re-Deal in Campaign Mode

**Q6**: The "New Draw" button (re-deal case + bench for quick play) is now hidden in campaign mode since the case sequence is fixed. But the side-choice screen still shows "Switch Sides" after you pick. Should "Switch Sides" also be hidden/disabled in campaign mode when a `forcedSide` objective is active?

**A^** Good thinking, yes. If `forcedSide` is active, let's not have that button.

### Recess Date Stamps

**Q7**: The recess log uses the `recessDate()` helper which generates a random-ish date based on the recess year. The format is `"Jan 3rd, 2027"` etc. This looks good. One thing to note: multiple events in the same recess all get different dates since `recessDate()` picks a random day. Should events within a single recess be ordered chronologically (elections first in Nov, then deaths/retirements, then nominations), or is the current random ordering acceptable?

**A7** I can't answer this question definitively because I can't see the results. However, let's assure these things:

- The dates would all happen in the appropriate 2 year period.
- New presidents are sworn in sometime in early January.
- In the case of a new president AND 1 or more new justices appointed by the president, we must change presidents FIRST, before the new justices are appointed, to match game logic.
- List chronoligically from there.

---

## Eventual Next Steps

- docs/court-campaign-mode.md

- The player will be assigned a goal, such as "Complete Gender Equality", "Constitutional Racial Segregation", or "Instute Monarchy". Each resolved case will either move the player closer to or further from their goal, depending on which side they were on and how the justices voted.
- Between rounds, the player will be able to affect the bench, by forcing retirements, influencing nominations, or even packing the court.
- In single player, create difficulty settings
- AI Opponents should be given names
- Eventually, make this multiplayer
- Specific court makeups: eg: Warren Court, Bergen Court, Blackman Court, etc.
