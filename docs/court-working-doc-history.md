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
