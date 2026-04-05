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

ALSO: The campaign will assign a president, with similar logic. So, if it's current court, the president is Donald Trump. Otherwise, assign an appropriate president. This will have an effect during the "between trials" phase.

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
