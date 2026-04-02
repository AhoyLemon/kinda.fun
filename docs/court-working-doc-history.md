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
