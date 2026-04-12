## Next Steps

You'll see that src\views\court\ts_types.ts defines an interface for a Justice, a President, and a Case. What I want to do now is to generate 27 justices - 9 of these should be ACTUAL CURRENT SUPREME COURT JUSTICES (ex: "John Roberts", "Clarence Thomas", "Samuel Alito"), 9 of these should be HISTORICAL SUPREME COURT JUSTICES (ex: "Thurgood Marshall", "Ruth Bader Ginsburg", "William Rehnquist"), and 9 of these should be FICTIONAL JUSTICES (ex: "Guns McShooty", "Lady Justice", "Judge Dredd").

For both the current and historical justices, I want the stats to be an exaggeration version of their real life stats. Make guesses if you must.

For the fictional justices, please be creative, and ESPECIALLY emphasize variety between them.

You can feel free to adjust types as needed. You'll also need to create presidents in order to give each justice a nominatedBy value.

THEN, I want you to create 20 cases, 10 of themn should be actual historical cases (ex: Marbury v. Madison, Brown v. Board of Education, Roe v. Wade) and 10 of them should be fictional cases (ex: "Should Guns Have The Right To Vote?", "Can I Copyright My Facebook Posts?", "Can The Supreme Court Give Itself A Raise"). Again, make sure to emphasize variety in the cases. Also comedy in these cases.

THEN, I want the UI to draw a bench of 9 random justices, and draw 1 random case card, letting the player choose which side they want to be on.

Arguments will come later. I'm just hoping to populate justices and cases.

- [x] Create Justices
- [x] Create Presidents
- [x] Create Cases
- [x] Update UI to draw 9 random justices and 1 random case card, and let player choose side

---

Okay, now I want to stub out the very beginning of gameplay. After choosing a side, the player should be dealt a hand of 5 random "tactic" cards\*, which I might rename later. These are basically the "attack" or "defense" moves that the player can use to try to convince the justices to vote in their favor. Here's some ideas:

- "Appeal to Precedent": This tactic allows the player to make an argument based on a previous case that is similar to the current case. Justices who value precedent will be more likely to vote in favor of this argument.
- "Emotional Appeal": This tactic allows the player to make an argument that appeals to the emotions of the justices. Justices who are more empathetic will be more likely to vote in favor of this argument.
- "Bribe Justice": This tactic allows the player to bribe a justice with money or favors. Justices who are more corrupt will be more likely to vote in favor of this argument.
- "Threaten Justice": This tactic allows the player to threaten a justice with political consequences if they don't vote in favor of the player's argument. This will only work if you're arguing for the side of that justice's party
- "Be Boring": This tactic allows the player to make a dry, technical argument, increases each judge's succeptability to your next attack.
- "Flirt": Choose a justice already on your side. This justice will be less likely to be swayed by your opponent's attack

That's just some examples, but I'd like to have a combination of tactics that seem like things that would actually be used by Supreme Court laywers as well as sillier things that highlight the parodical nature of the game.

I also want to give an overview to "The Bench", so that the player seems some chartlets about:

- Gender breakdown of justices
- Political breakdown of justices
- Best/worst stat
- Greatest weakness of this bench

- [x] Create 12 tactic cards
- [x] Update UI to deal player 5 random tactic cards after they choose a side
- [x] Create "Bench Overview" UI element that gives some stats about the bench of justices that the player is playing with
- [x] For each justice, create a UI element that shows how the justice is likely to vote if the trial ended right now.
- [x] When a tactic is played, create some sort of UI element that shows how a justice was swayed by your tactic

---

This is working out great, okay now I want to stub out the idea of your "opponent" in the game. At this particular point, your opponent will basically be a random number generator

SO: Rather than each lawyer having their own hand, the "hand" will be shared among both lawyers (so maybe it needs another name?). So, the player plays one of the 5 cards, then it draws a new fresh card to replace it, and play goes to the other player. This goes back and forth.
For this moment in time, we'll not have the "opponent" have any real thought process, but rather just randomly choose a card (and, if appicable, randomly choose a justice to target with that card). In the future, we'll make it smarter.

For now, let's make it so a "trial" lasts 3 rounds (so both player and opponent get to play 3 cards) and then after those 3 rounds, a decision will be made.

And since we have the idea of a shared "hand", let's also add at least two more tactic cards

- One tactic will be to discard everything, so if there's several good cards, you're (hopefully) eliminating the possibility of the other player using that tactic.
- One tactic will be to claim two cards. So in lieu of doing a normal tactic, there are 2 of the 5 community cards which only you can use (note on this one that neither player can claim cards if that player already has claimed cards, as that would break the game)
- Make a discard pile, so that if you need to draw a card and there aren't any new cards in the deck, it will reshuffle the discard pile and then start drawing from that deck. This means you won't see "Invoke The Founding Fathers" a second time until every other card has been drawn

Let's also make it so you can click a button to see the "court report". Basically, because there's those toasts that show how each justice was swayed, but those toasts go away, the player should be able to click a button to see an overview of what was played, the effect of each card, and the total effects so far.

- [x] Create the ability for the opponent to play a card after the player plays a card
- [x] Let the game last for 3 rounds (with each player playing 1 card per round)
- [x] Add the tactics to discard all the cards and claim other cards, make the language of each card similarly parodical like the others
- [x] POTENTIALLY change "hand" to something that speaks to the idea that the cards are shared (renamed to "The Docket")
- [x] Create a "court report" UI element that the player can click to see an overview of what was played, the effect of each card, and the total effects so far
- [x] Make a new card drawn when a player begins their turn
- [x] Make it so there's a discard pile which will be used if you can't draw a new card

---

This is really working well. I like how this gameplay is progressing.

The opponent card play happens too fast. It's easy to miss that anything actually happened. We'll need UI for "Oppenent is deciding their tactic", maybe simulating them choosing a card? Let's just make the oppenent decide on their card for 4-6 seconds, with visual indictors therein.

For a lot of our other toasts, we've been using Vue-Toastification. What we're doing right now for toasts WORKS, but it could probably be more uniform to other kinda.fun games. Please see src\entries\megachurch.js and src\views\megachurch\Megachurch.vue and src\views\megachurch\components\Toasts for reference, and then strongly consider changing the current toast setup to that.

I want this commit to make this "feel" better on the cards, so whe cards are dealt, played and discarded, there should be a nice animation to that.

I want to be able to click on any justice and get their details. So if I click on the judge, bring up a detail display that shows that justice's picture, president who appointed them, ethnicity and religion, bio, and... yeah, just general stats. I SHOULDN'T see sometthing like "empathy: 3" because that would show too much of "the machine", but if there's a good way to hint at their stats and weaknesses, that would be ideal. Similarly, in the game setup, we have those views of LOGIC/CHARISMA/LOYALTY from 1-10. I don't want that, instead hints at which tactics might be good on this justice.

FWIW, I've added four images to public\img\court\justices and referenced those in src\views\court\ts_justices.ts - go ahead and use the ones that are available, with some generic backup if there's no image.

- [x] Implement visual feedback when the opponent is "choosing" a card, make that last 4-6 seconds.
- [x] Strongly consider Vue-Toastificatification similar to what we've implemented in the Megachurch Tycoon game.
- [x] Add animation when cards are dealt
- [x] Add animation when card is played
- [x] Add animation when card is discarded
- [x] Add animation when new card is drawn
- [x] Add a detail view for a justice that can be accessed by clicking on a justice
  - [x] When targeting a justice, clicking on that justice will give you the options of "View Justice" or "Target This Justice"
- [x] Adjust the justice cards in the setup phase to not show numbers, but rather imply what this justice is about using their numbers.

---

I think a lot of these adjustments are going to be visual....

In the setup phase, the `justice-card__hints` are white text on light background, so they are illegible. Also they're a bit overcomplicated. On those cards, let's only call out the TWO most unique traits, leaving the other traits for when you click for details

    - Also, give those cards hover state
    - Also I think I want that card to say what president nominated them, as their politics are important to the gameplay
    - Also let's use the justice's image if it exists there too.

- Also, the Toast looks REALLY weird, I'll try to attach a screenshot, but basically there's a overflow:hidden rounded rectangle with text inside. I think you need to redo that toast css from scratch.

- I like the UI of the opponent choosing a card, but let's maybe change the UI a bit more when that happens. Like, darken everything but The Docket, and display "Opponent is choosing a tactic" in the center of the screen.

- I DON'T like the look of the draw/discard animations,they don't look like cards being moved around. Do you think you could retry that animation.

- One thing I meant to request in the judge details screen - If you're playing multiple rounds, and this judge has ruled on one of your cases before, you shoud see which way they went, ex

Ketanji Brown Jackson
...
History
Miranda vs Arizona | Voted FOR you | Ernesto Miranda
Marbury v. Madison | Voted AGAINST you | James Madison

First priority is the toasts, because those are BROKEN

- [x] Fix toasts, probably redo toast css from scratch to make them look a bit more like toasts
- [x] Make justice hints visible and max 2 most important details on the setup screen
- [x] Give justice cards hover effects
- [x] Justice card will say what president nominated them
- [x] Justice card includes image (if it exists)
- [x] Massage the UI for when the opponent is "choosing" a card
- [x] Make the draw/discard/play animations look more like playing cards
- [x] Add case history to justice detail screen

---

Okay, the toasts are STILL looking weird. I'll attach a screenshot in the next chat message. Can you please start over and make this look different, it's still got some major problems.

The PRIMARY thing I want to do in this edit is to be able to have one "chief justice". I'll explain below...

When starting a new game, you have three options:

- Current Court: This game will use the 9 justices currently on the Supreme Court, marked as justiceType: "current". This will be the default option. If this option is chosen, John Roberts will be the chief justice.
- Historical Court: This game will use 9 justices from EITHER the "current" or "historical" justice pools. The chief justice will be randomly selected as 1 of those 9.
- Fantasy Court: This game will will use justices from either the "celebrity" or "fictional" justice pools. The chief justice will be randomly selected as 1 of those 9.
- Chaos Court: This game will randomly select 9 of ANY justices, and make 1 chief justice. They can be any of the justice types.

CHIEF JUSTICE EFFECTS:

- The chief justice will always be harder to sway, BUT if they are individually swayed, there will be knockon effects on every other justice with the same party affiliation. For example, let's say you do a tactic that gives you +4 on the chief justice. That will also give you +2 on every other justice with the same party affiliation.
- This only works if they're targeted indivudally. Tactics that affect all justices do not have this knockon effect.
- Justices with a different party affiliation than the chief justice will be immune from this knockon effect.

There should be a visual indicator on the chief justice's card to show that they are the chief justice.

The bench should be labeled "The {LastName} Court", where {LastName} is the last name of the chief justice.

This opens up two new fun tactics:

- One card will allow you to make some other justice the chief justice. This means the chief justice tag will change to that person for the rest of the game. This means
  - The target is now the chief justice, but WILL NOT be harder to sway like when a chief justice is randomly selected at the start of the game.
  - The previous chief justice who lost that title will gain a negative opinion modifier for this case.
  - For all other justices, if that justice DOES have the same party affiliation as the PREVIOUS chief justice, AND the new chief justice has a different party affiliation, they will also gain a negative opinion modifier for this case, as you've just detrhoned their leader.

- Another card will allow you to insult the chief justice. This will give a negative for that person, BUT every other justice who has a DIFFERENT political affiliation than the chief justice will gain a positive opinion modifier, as they will be happy to see the chief justice get dunked on.

- And actually, while we're at this part, I want to rethink the "fictional" justices. These are fun, and I like that they're extreme, but I don't want them to be completely made up characters. Instead, I want them to be based on either real celebrities OR popular fictional characters. So, some examples...

CELEBRITIES:

- Elon Musk
- Peter Thiel
- Judge Judy
- Mary Kate and Ashley Olsen (as one justice)

FICTIONAL CHARACTERS:

- Leslie Knope
- Al Swearengen
- The Dude (from The Big Lebowski)
- Othello

So basically, we want to serve the same purpose, which is to create variety, but using names that will be more familiar to the audience. Side note: I know "Al Swearengen" is actually a real person, but I love Deadwood. I'm talking about the Ian McShane version of Al Swearengen from the TV show Deadwood. For this reason, we can absolutely keep Judge Dredd.

SO:

- [ ] Take another pass to the toasts. Probably start from scratch. If you need to give up and let me do it, I can do that, but I want you to try again first.
- [ ] Implement Court Selector with the three options: Current Court, Historical Court, Chaos Court.
- [ ] Implement Chief Justice mechanics, including the knockon effects and the visual indicator.
- [ ] Add the new tactics related to the chief justice, including the ability to change the chief justice and to insult the chief justice.
- [ ] Update the justice pool to include the new fictional justices based on celebrities and popular. That means also adding "celebrity" as a justiceType alongside "fictional"
- [ ] Remove any celebrities which aren't actually based on a celebrity or an existing fictional character.

---

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

---

## Case Pool Filtering by Court Mode

Added `casePool: "historical" | "fictional" | "any"` to the `PresetBenchConfig` interface in `_justices.ts`. Realistic court modes (Current Court, Historical Court, historical presets) only draw from `casesHistorical`. Fantasy Court only draws from `casesFictional`. Chaos Mode and fictional presets can draw from either.

Also added 10 new fictional cases (ids 111–120) to `_cases.ts` with a satirical modern-tech flavor: algorithm liability, blocking as restraining order, ToS enforceability, self-pardoning guilt, drone trespass, AI lawyer licensing, ESA courtroom testimony, browser history as obstruction, meme illegality, and emotional support weapons.

- [x] Add `casePool` field to `PresetBenchConfig` and set appropriate values on all 4 presets
- [x] Update `Court.vue` to import `casesHistorical` / `casesFictional` and filter the draw pool by `courtMode`
- [x] Add 10 new fictional cases (ids 111–120)

---

## Tactic Card Overhaul + Refactor

Addressed a backlog of tactic card fixes, added 7 new cards, and extracted effect logic into its own module.

**Architecture change:** `applyTactic` (~240 lines) was removed from `Court.vue` and replaced with a 35-line dispatcher that calls `resolveEffect()` from the new `src/views/court/ts/_tacticEffects.ts` module. This keeps `Court.vue` manageable and isolates effect logic for testing.

**Card fixes:**

- "Appeal to Precedent" — changed to `polarizes-high`: strongly positive for high-logic justices, insulting for low-logic justices
- "Constitutional Technicality" — changed to `polarizes-low`: opposite polarity of the above
- "Be Extremely Boring" — added `feedback: "All justices are more susceptible to arguments."`
- "Purge the Record" — added `feedback: "The Docket has been cleared."`
- "I Call Dibs" — fixed early-draw bug; now claims 2 of the 4 remaining cards, then draws 1 card afterward (correct: 3 unclaimed + 2 claimed = 5 total)
- "Redirect the Witness" — shields now consume on contact (not cleared at end of turn); dynamic `overrideFeedback` in toast: "{JusticeName} is protected from your opponent's next argument."

**New cards (ids 19–25):**

| id  | Name                        | Effect                                                                    |
| --- | --------------------------- | ------------------------------------------------------------------------- |
| 19  | Betray Your Friend          | Sacrifice a strongly-for justice; opposition justices flip toward you     |
| 20  | Swap Clerks                 | Swap two justices' leanings; 70% success, 30% tattling (both go negative) |
| 21  | Encourage A Nap             | Freeze one justice for a round; they wake up with +15 bonus               |
| 22  | Justice Cocktails           | +3 charisma, +3 empathy, -3 logic for remainder of trial                  |
| 23  | Hire A Private Investigator | Increase blackmail weakness on two justices by +4                         |
| 24  | Celebrate St. Patrick's Day | All justices become Catholic                                              |
| 25  | Invite To Church            | +3 empathy on target; same-religion justices gain +15                     |

**New `TacticToast` prop:** Added optional `feedback` prop to `TacticToast.vue`/`.pug`. Utility cards without per-justice results now display a `<p class="tt-feedback">` line instead of "No measurable effect."

**New game state fields:** `nappingJustices`, `statMods`, `weaknessMods`, `religionOverrides`, `multiTargetMode`, `multiTargetSelections`, `multiTargetTacticId`.

- [x] Update `_types.ts` — extended `TacticEffectType`, `statRelation` (added `polarizes-high` / `polarizes-low`), `Tactic.feedback`; added `CourtGameState`, `Side`, `TurnActor` types
- [x] Update `_tactics.ts` — fix cards 1, 6, 12, 13; add cards 19–25
- [x] Create `_tacticEffects.ts` — full effect resolution module (~280 lines)
- [x] Refactor `Court.vue` — new imports, all new game state, updated `selectTactic` / `finalizeClaim` / `handleJusticeClick` / `applyTactic` / `endPlayerTurn` / `endOpponentTurn` / `playOpponentTurn` / `targetLabel`
- [x] Update `TacticToast.vue` + `TacticToast.pug` — `feedback` prop support
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

---

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

---

Slight change to the part where it says "The XX Court",

- We need to normalize out a couple names. For example, if Oliver Wendell Holmes Jr is the chief justice, it's called "The Jr. Court", but it should be "The Holmes Court". To fix this, let's add an optional value to a justice called "courtName". This way, we can set the court name to "The Dick Wolf Court (DUN DUN)" if the chief justice is "A DVD Boxed Set of Law & Order: SVU"
- ALSO, in the last task, we had you able to select famous courts from history. If you do that, that should override the court name. SO, if you choose "The Early Lochner Era", the court name should be that instead of "The Fuller Court"

- Also, it says "Start with a famous historical bench" in court-preset-section, except it's not NECESSSARILY a historical bench, in the case of "The Court From Hell". So instead of that, it should say "Select A Preset"
  - THEN wrap the historical ones in an `optgroup` called Historical, and wrap The Court From Hell (and possibly others) in an `optgroup` called Fictional. Also add the current court to the Historical, and in this case call it "Trump's Bench". Again, this will usually be the option you'll play.

- Also, for that select, I don't want to actualy start the game immediately when you select one. Selecting one of the options from that select should give you an overview (name, year, chief justice, description) of the court, and then you can click a button to start the game with that court. This because this is very much the tertiary way to play (primary = current court, secondary = the random selections (historical, fantasy, chaos), and tertiary = the presets). So while I don't want to dissuade you from doing these methods, I'd like to use visual hierarchy to indicate to the player how to start.

---

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

---

Okay, the next thing I want to add is the concept of "stances", and use that to change the mechanics of how justices think and work.

- You'll notice in the Justice type, we've added a new property of `stances`. There's about two dozen of them that a justice can be "For" or "Against", which will play a large role in affecting their view of the case from the beginning.

This should be used alongside the existing party affiliation (ex: `favoredBy`, `nominatedBy`), so, for example, if a is explicitly "For" "CorporatePower", they will have a more favorable view of the prosecution than a justice who doesn't have an explicit opinion on CorporatePower, and a justice who is explicitly "Against" "CorporatePower" will have a more favorable view of the defense.

I have added stances for the 9 current justices and SOME presidents, but more need to be added and tinkered with.

I think the justices' "stats" are a little confusing and could be simplified. Here's some potential changes:

- `succeptibility` - Baseline stat of how easily they are to be swayed by an attack. So, in broad terms, the higher this number is, the more their opinion will be changed by an attack
- `logic` and `empathy` - I'm thinking these could work in direct contrast with each other on a single sliding scale. I'm thinking about something where a justice rules with their "heart" or their "head". Though I'm not sure of the syntax to use here. Suggestions welcome.
- `integrity` - Useless. Remove.
- `charisma` This will actually affect not their own weakness, but their ability to affect other justices. So if you play a very successful attack against a justice with high charisma, you will have a chance to see bonus effects in other justices. Justices should be more likely to affect other justices who were nominated by the same president, or at least belonging to the same party. Affecting a just from a different party would be unlikely.
- `partyLoyalty` - mainly stays how it is. Is should affect how much the President's views and parties would affect this justice.

I recognize redoing how justices work will mean reworking or possibly removing tactic cards. THAT IS ABSOLUTELY FINE. I'd like to make the mechanics sound, and we can always add more tactics cards. So remove tactics if they're inconvenient or have little effect, and feel free to suggest new ones while you're working (add to the doc please)

SO, how this is going to change the current game is...

- [ ] Review the stances. Add/edit/remove stances trying to use the historical record as a guide.
  - [ ] I'd like a justice to have somewhere between 3-5 stances apiece.
  - [ ] A President should have 5-7 stances.
- [ ] Also go through each case and try to add `historicalWinner` to each case, depending on which side won in real life history. This means you don't need to bother doing this for fictional cases.
- [ ] When definining what a justice thinks of a case, consider their `stances` first, then their nominating President's `stances`, and then finally `favoredBy` and `nominatedBy`.
- [ ] When the case starts, we should be seeing justices split on party lines, but I want a bit more variability between those justices, with a justice feeling strongly being more common than it is now.
- [ ] Canonically, we don't use the term "Republican" or "Democrat" when referring to justices. So when you're listing a justice's political affiliation, please use the words "Conservative" and "Liberal". This is just for flavor, Presidents are still "Republican" and "Democrat", and it basically means the same thing.
- [ ] Rework and remove tactics as you see fit.
  - [ ] I'll notice "Be Extremely Boring" doesn't feel fun to play, and "Appeal to Prcedent" and "Emotional Appeal" seem a bit boring to playtesters. "Justice Cocktails" and "Hire A Private Investigator" have made playtesters laugh, but they've been disappointed by the actual gameplay result. I think the major thing is that each card "does something" that's immediately apparent, and silly is good, but avoiding any particular card feeling "overpowered"
- [ ] Change to presidential nomination in "Campign Mode": When a President needs to nominate a justice, they try to find somebody with a few of the same stances (if possible). Once that nomination happens, the justice can inherit a few stances of their own.

---

- [ ] In The "Today's Case" overview, I'd like to identify the stances of each side, as well as which party it would favor. Also, please don't color-code the "favors {party}" tags. There's already colors for prosecution vs defense, so the party colors confuse it.
  - [ ] Make a note that there's something that we'll need to address at some point, which is the idea that the idea of a "Republican" or "Democrat" has shifted (ex: In today's world, Abraham Lincoln would be considered a "Democrat") so we'll need to adjust that at some pont.
- [ ] When I bring up the `.justice-detail` modal, I want to be able to click in to see that president. Ex: When I bring up John Roberts, it says "Appointed by Goerge W. Bush". In that text, "George W. Bush" should be a link which brings up the `president-detail` modal for George W. Bush, where I can see his stances and other info.
- [ ] In the `.justice-detail` modal, I should get a glimpse of that justice's stances, as well as their general `heartVsHead` and their level of succeptibility.
- [ ] In the `bench-overview-bar`, it says "Republican (6) Democrat (3)". It should actually say "Conservative (6) Liberal (3)". We should try to be aware that justices are considered "Conservative" or "Liberal" rather than "Republican" or "Democrat"
- [ ] "Call a Celebrity Witness" is good, but it's too powerful. Attacks for all justices should sway a justice less than attacks that target individual justice(s).
- [ ] In the Game Over screen, let's make a little tweak...
  - If you're in "Quick Play" mode, there should be a potential of an additional button: "Retry Case" but only if you lost, this will do the same case with the same justices).
- [ ] See section: Logic vs. Empathy: Sliding Scale Proposal, I've answered the questions you've posed. Please implement.
- [ ] I ses TS errors in src\views\court\ts_campaignManager.ts, please make sure all errors are resolved.
- [ ] Please create a vitest for testing out stances. What I'd like it to do when it's run is check the stances against the stances used by justices, presidents and cases, and list the 5 most/least used stances. If you find any stances that are not being used at all, please flag those as potential errors.
- [ ] I think I'd like you to create somehing like `settings.difficulty`, which could have some knobs that could be tweaks to make the game harder or easier. At the moment, this can be very simple, I'd just like to expose the gameplay modifiers for easy tweaking.

---

## Logic vs. Empathy: Sliding Scale Proposal

**Current state:** `logic` and `empathy` are separate stats (each 1–10). They independently affect two tactics — `Appeal to Precedent` scales with logic, `Emotional Appeal` scales with empathy. Otherwise they do nothing.

**Proposed display change:** Rather than showing two separate bars, represent both stats as a single "Heart vs. Head" slider:

- Derived value: `heartVsHead = empathy - logic`
- Range: roughly −9 (pure logic) to +9 (pure empathy)
- Display: a labeled slider, left anchor = "Rules by the Book", right anchor = "Rules from the Heart"
- Each justice would show their position on the scale visually instead of two raw numbers

**Gameplay implications (no mechanical changes required):**

- The existing tactic scaling already works correctly — `Appeal to Precedent` punishes high-empathy justices (low-logic side of scale); `Emotional Appeal` punishes high-logic justices (high-logic side of scale)
- No changes to `_tacticEffects.ts` needed; only the justice-detail stat display in the Vue component would change
- The raw `logic` and `empathy` values stay on the `Justice` type; only the UI presentation changes

**Implementation sketch (when ready):**

```ts
// Computed display value
const heartVsHead = computed(() => justice.stats.empathy - justice.stats.logic);
// Range: -9 to +9; normalize to 0–100 for a CSS progress bar
const sliderPercent = computed(() => ((heartVsHead.value + 9) / 18) * 100);
```

**Open question:** Should the scale affect how `succeptibility` behaves differently for logic-based vs. empathy-based tactics (i.e., a high-empathy justice is more susceptible to emotional appeals, less so to logical ones)? This would require a small change to `_tacticEffects.ts` but could add meaningful depth. Currently `succeptibility` is universal — discuss before implementing.

### ANSWERS TO ABOVE

- I like your idea. Let's go with this. And yes, let's have `succeptibility` still play a role if you do a Heart vs Head attack, but it will have a lesser effect. So, for example, if you do a purely "logic based" tactic on a justice (eg. Cite Prescedents), the efficacy of that tactic will be more inferred by the `heartVsHead` stat, but the `succeptibility` stat could create a modifier of perhaps 1.25x (or so).

---

# Love Is The Law — Supreme Court Campaign

A campaign for the Supreme Court game focused on the legal history of gay rights in America, inspired by the Minneapolis band The Suburbs.

## Campaign Overview

- **Title:** Love Is The Law
- **President:** Barack Obama
- **Chief Justice:** Antonin Scalia
- **Theme:** Argue for or against gay rights as the Supreme Court hears the most pivotal cases in LGBTQ+ legal history.

## Cases (Chronological Order)

1. **Bowers v. Hardwick (1986)** — To be added
2. **Romer v. Evans (1996)** — To be added
3. **Lawrence v. Texas (2003)** — To be added
4. **Obergefell v. Hodges (2015)**
5. **Masterpiece Cakeshop v. Colorado (2018)**

## Bench (9 Justices, with stances)

- Antonin Scalia (Against)
- Anthony Kennedy (For, to be added)
- Ruth Bader Ginsburg (For, to be added)
- Sonia Sotomayor (For, to be added)
- Samuel Alito (Against, to be added)
- Clarence Thomas (Against)
- [Right-leaning/historical justice]
- [Right-leaning/historical justice]
- [Right-leaning/historical justice]

_If not enough justices have explicit "GayRights" stances, fill with right-leaning/historical justices._

## Required Data Changes

- **Add/annotate "GayRights" stances** for:
  - Anthony Kennedy (For)
  - Ruth Bader Ginsburg (For)
  - Sonia Sotomayor (For)
  - Samuel Alito (Against)
- **Add three new cases**:
  - Bowers v. Hardwick (1986)
  - Romer v. Evans (1996)
  - Lawrence v. Texas (2003)
- **Campaign config**: Add to `campaignSetups` in `_campaigns.ts` with the above details.

## Notes

- This campaign is specifically about the legal journey of gay rights, not general equality.
- The bench should reflect a mix of strong opinions on gay rights, with a right-leaning tilt if needed for balance.
- All changes should be reviewed before merging.
