# Campaign Mode

- Okay, so I'm thinking there will be two "main" ways to play the game once it's ready for public release: Campaign Mode and Versus Mode. Versus mode will require multiplayer capabilties which we'll hold off until later.

But for Campaign Mode, here's how it will work:

## Campaign Mode Setup

(note: Because we're using the word "docket" to mean something else, I'll be using the term "caseset", meaning a succession of cases. If there is a better term, I'd like to hear it. Unless we want to use "docket" in that case, and change our current use of "docket", to something else (playbook? tactic set?))

- Similar to our current initial setup, you'll select your court, which will in turn affect what cases you'll try.
  - There will be one case set for the "Current Court". These will be actual cases in recent memory, such as Masterpiece Cake Shop, Janus, etc. We'll actually go BACK in history, starting with the most recent and ending with the least recent, essentially retrying history.
  - For other pre-set courts (eg: Warren Court, Early Lochner Era), we'll also have a specific case set.
  - For any of the random based courts ("Historical Court", "Fantasy Court", "Chaos Court"), we'll also randomly pick X cases, but keeping the rules of which types of cases can be picked (eg: Fantasy Court only will draw fantasy cases)

- You will then draw two "Objective Cards". This will be your overall mission for all cases in this game.

  Examples:

      - 100% Win Rate (Win every case)
      - 5-4 (every case must be either 5-4 or 4-5, no blowouts)
      - Defend The Law (You must always play defense)
      - Prosecute & Persecute (you must always play prosecution)
      - The Biggest Loser (lose every case)
      - Republican Laws (every case must be decided in favor of the republican-preferred outcome)
      - Socialist Paradise (every case  must be decided in favor of the democrat-preferred outcome)

  - You must select one of two objectives to be what your objective is. Success or failure is based on creating this outcome

The Campaign will also assign the year and the president, so a campaign could look like this...

```ts
export const campaignSetups = [
  {
    id: 1,
    name: "Current Court",
    description: "The year is 2026. Donald Trump is still president and he has created three justices. Good luck.",
    startYear: 2026,
    currentPresident: PRES_TRUMP,
    chiefJusticeId: 1, // John Roberts
    justiceIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    caseIds: [23, 21, 4, 22, 16],
  },
  {
    id: 2,
    name: "The Warren Court",
    description: `The year is 1968. The media reports your justices are "activists", but will they really change civil rights with their decisions?`,
    currentPresident: PRES_NIXON,
    startYear: 1968,
    chiefJusticeId: 53, // Earl Warren
    justiceIds: [53, 17, 60, 61, 62, 63, 16, 64, 10],
    caseIds: [2, 5, 7, 12, 19],
  },
  {
    id: 3,
    name: "Fantasy Campaign",
    description: "An alternate universe. It's 1900. What kind of American law will you be responsible for?",
    startYear: 1900,
    isRandomPresident: true
    isRandomBench: true,
    isRandomDocket: true,
    justicePool: [ "fantasy", "celebrity" ],
    casePool: ["historical"]
  },
  {
    id: 4,
    name: "Pure Chaos",
    description: "Who knows what you'll get?",
    isRandomStartYear: true
    isRandomPresident: true,
    isRandomBench: true,
    isRandomDocket: true
  }
];
```

...so basically, each campaign can have a pre-set bench/docket, or it can be random, but we can also create rules for how the randomization works. For example, "Pure Chaos" is pure random everything, "Fantasy Campaign" is MOSTLY random, but it doesn't want to put current or historical justices on the court, and it only wants the docket to have historical cases.

## Campaign Mode Gameplay

- Gameplay looks pretty much identical to how it's already working, except we're going to add two new "tactics"

- "Suggest Retirement"
  - this tactic will cause this justice to lose a LOT of favor in you, making it near impossible to win them back. HOWEVER, the effect is that when you're in the "between trial" phase, this justice will be GUARANTEED to retire. This is a high risk, high reward tactic, and should be used strategically to get rid of justices you don't like, or who are particularly opposed to you.
- "Keep That Crown"
  - To be used after the "Elevate to Chief" card, which already exists. So if you've used the Elevate To Chief card to make a new chief for this trial, you can use the "Keep That Crown" to make it permenant. This means that justice will be chief until the end of the game, or until that justice is removed from the bench. Was "Elevate To Chief" not played yet during this trial? Then this card is disabled.

Mark these cards as "campaign only", so that they will only be drawn into the docket if you're in campaign mode (not quick play)

## Campaign Mode Verdict

- At the end of the trial, the verdict screen will indicate not only whether you won or lost the case, but also how that affects your overall objective. For example, if your objective is "100% Win Rate", and you win this case, the verdict screen will indicate that you're on track to achieve your objective, but if you lose, it will indicate that you've failed your objective.
- If the outcome of the trial means you fail your objective (ex: You have the 5-4 objective but the decision was 7-2), it is game over.

- If the trial ends in a tie, this screen will say as much, and you'll be forced to retry the case. You cannot advance. You must try the same case with the same bench.

## Reward For Winning Trial

- If you win the trial, you will get a "Reward Card". This is drawn from a different deck of reward cards, and can be deployed, usually during the "between trial" phase.

EXAMPLE REWARDS:

- "Wheel of Retirement"
  - when deployed, will randomly remove one justice from the bench. It is random. The player does not get to choose which justice is removed.
- "Not Enough Chairs"
  - This will cut the size of the bench by 1. HOWEVER, it willl NOT eliminate a justice. Rather, the next time a jusice is removed from the bench, they will not be replaced.
- "Justice Veto"
  - when deployed, the next time the president nominates a justice, there wil actually be two potential candidates. The player will be shown two justice cards. The one they select will be added to the bench. The other one won't ever be nominated again.
- "Another One"
  - When deployed, this will add one additional justice seat to the bench. So if there's 9, there will now be 10. This can happen multiple times.
- "Glaze Ya Robed Homie"
  - Target one justice. From this point forward, that justice will always start the case with an extra +20 in your favor, on top of how they'd feel about your case otherwise.
- "Never Retire, Never Die"
  - Target a single justice. For the remaineder of the campaign, that justice will not die, nor will they leave the bench UNLESS forced to do so by a player action. This is used to protect a justice that the player finds useful.
- "Mutiny!"
  - Randomly assign a new chief justice. The player CANNOT control which judge will end up as the chief, but the only certainty is that the current chief will not be the chief.
- "Dream Justice"
  - Possibly the most powerful card in the game. When deployed, the player can select a justice from any eligable justice. The next time there is a vacancy, that vacancy will be filled by the justice the player selected.

This interface will happen BEFORE the Between Trial phase. So, if you win the trial, you are given one reward card, which you can choose to either deploy now or save. If you choose to deploy it, hopefully it will be useful. For example, if you deploy "Dream Justice", that means you'll be able to add a justice, but only if there happens to be an open slot.

## Between Trial Management (aka "Recess")

- Between trials, there is a 2 year "recess" period, where the world advances, this means the following happens, in this order:

1. The President CAN be replaced. With 1 presidential election every 4 years, and a maximum of 8 years for a president, that means that every 2 trials there is a CHANCE for a president to be removed, and if the same president is kept that it is CERTAIN the president will be replaced. We'll just not have any other shenanigans such as presidential retirement. Just... every 4 years there's an election, and resolve that. Settings below.
2. If you redeemed any card that force's a justice's retirement, that takes effect now.
3. There is a random chance for 1 or more justices to die of natural causes (settings below). That takes effect now.
4. If the bench has been altered in any way (seats added/removed), that takes effect now.
5. If you redeemed the "Mutiny!" card, that takes effect now.
6. If you redeemed any card that fills a vacancy AND there is a vacancy, that takes effect now.
7. If there are still vacancies, the president will nominate new justice(s) to fill those vacancies, and they are added to the bench. Keep in mind that a President will ALWAYS try to nominate a justice of the same political party. with SPECIAL PREFERENCE for justices who are indicated as `nomimatedBy` the president in question. So, for example, if FDR is currently the president, the nominee will be either William O. Douglas or Hugo Black, unless those justices are unavailable for some reason. Continue until every vacancy is filled.
8. For these nominees during gameplay, we'll need to rewrite history. So, for example, if Bill Clinton is the president, and and 2 justices are added, we need to make sure both of these new justices are assigned as `nominatedBy: PRES_CLINTON`, even if in real life they 8 were nominated by different presidents.
9. Were any reward cards redeemed but not actually used? If so, burn them. They can still be drawn again, but they are done for now.

NEW GAME SETTINGS:

```ts
gameSettings {
  campaignLength: 5, // number of cases in a campaign
  justiceAttrition {
    deathChance: 50, // chance for justice death during recess
    minDeaths: 1, // if death occurs, minimum number of deaths
    maxDeaths: 3 // if death occurs, maximum number of deaths
  },
  startingYear: 2026, // The year of the first trial in the campaign. Bear in mind that elections happen in years 2000, 2004, 2008, 2012, 2016, 2020, 2024, etc. So if you start in 2026, the first election will be in 2028.
  presidentialElection {
    electionChance: 50, // chance for presidential election during recess
    maxTerms: 2 // maximum terms a president can serve
  }
}
```

## Ending The Campaign

- `gameSettings.campaignLength` should have a value that dictates how long a typical campaign is. Let's say 5 for now.
- Again, at the verdict stage, if you fail to meet the ojective criteria, it's game over.
- However, if you make your way through the number of trails, it checks if you accomplished the goal. If you did you won! If you didn't, you lost!
- While this number will be for any random/algorithmic case selection, there still could be the case where we define a number of bespoke cases for a specific court, which may have a differnet number of cases than `campaignLength`

## Game Over Screen

- Whether you win or lose, you should see a game over screen that congratulates and/or admonishes you. This should also give some fun summaries. It shoud show your win/loss record, as well as some fun details like...

POTENTIAL FUN STATS

- Worst / Best Case (the case you performed the best/worst at)
- Signature Move (the tactic you used the most)
- Favorite / Least Favorite Justice (the justice with the most/least accumulated favor over cthe game)
- Most Targeted Justice (the justice who was targeted the most times, could be broken up by you/opponent/total)
- Party Victory (the party who won the most cases)
- (Maybe) Dream Court (based on favor, create a bench of 9 justices who liked you the most, with the highest favor being the chief justice)

---

Campaign Mode has begun, please see the "Campaign Mode Changes" section for for what's left to be done.

- I just did a test game where my objective was "The Biggest Loser", and won my first trial 9-0. This gives me the verdict screen and a button to "Receive Win Bonus". In this situation, I SHOULD see the verdict, because that's useful context to the user, however I SHOULDN'T see the "Receive Win Bonus" button, because my game ended when I failed to meet the objective.

Therefore, I should have a button that will be labeled "Advance", which should go straight to the game over screen. Basiscally everything works like it should, because "Receive Win Bonus" DOES take me to the game over screen, but the button is wrong, that's the only fix necessary here.

- In another test, I got to the "Recess" screen, but the "During Recess" box contains 3 empty items. Each one has the '📋' icon, but no text for what happened. I think that might be looking for the wrong variable.

- In the game over screen, I see two buttons: "Play Again" and "New Campaign". They both seem to do the same thing.

- The Title screen could use a bit of work. First of all, it says "Supreme Court: The Card Game" up top, and then "Supreme Court THE CARD GAME" above the two options. And then it says "Convening the Court" underneath. I can play with the layout via Scss later, but I'd like you to fix those issues.

When selecting a court via "Quickplay", the "Current Court" says "TRY CAMPAIGN MODE". That is confusing for first time players. First timers are told they shoud try quick play, and then when they choose quick play it says "TRY CAMPAIGN MODE".

INSTEAD on the quickplay court select screen, there would be a conditional piece of UI underneath the "Current Court" button, similar to what's on the title screen that says "New To The Supreme Court? Start with the current one."

- See Open Questions from Campaign Mode Implementation (April 2026)

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
