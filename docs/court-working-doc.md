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

Okay, this looks great. Now let's redo .court-vertict.

I'd like it to look like....

```
Judgement In Your Favor!
6-2-1
The court ruled for James Obergefell

Votes For
Sonia Sotomayor | Elena Kagan | ...

Votes Against
John Roberts | Neil Gorsuch | ...

Abstaining
Clarence Thomas

Decision:
James Obergefell
--
The 14th Amendment guarantees equal protection and due process to all persons. Denying same-sex couples the right to marry treats them as second-class citizens. Love is love, constitutionally speaking.
```

For each of the judge cards, display a bar that goes from 0-100%, which is either red or green depending on which way they were leaning (for exampe, if a justice was -67), display a red bar that's at 67% width.

ALSO, for each justice, display a little chip for each time they were targeted. So, if Samuel Alito was tartgeted 3 times, in his card, add 3 chips. For each chip, add a tooltip that shows which arguments targeted them.

Also make sure the Chief Justice is visually indicated in this view.

The order of the votes will actually depend on the plurarily. So if you lose the case, it should list the justices who voted against you first, then the justices who voted for you, then the abstaining justices.

In the case of a tie, votesFor > VotesAgainst > Abstaining.

If any category has 0 votes, it should be omitted. So if there are no abstaining justices, that section should not be shown.

Also, I'd like the pug and scss to be split from each other. Court Record should be in `src\views\court\scss\modals\_court-record.scss` and `src\views\court\pug\modals\_court-record.pug`. Verdict should be in `src\views\court\scss\screens\_verdict.scss` and `src\views\court\pug\screens\_verdict.pug`.

ALSO, when choosing a court, I'd like there to be an option of famous courts from history.

This would be a Select, rather than a button, because it would be recognized as a more complex choice for seasoned players. The "Current Court" is still the default, and still suggested for first time players.

BUT, we'll add two historical benches, and one silly one:

- The Warren Court:
  - Description: Known for its activism in expanding civil rights, civil liberties, judicial power, and the federal power in dramatic ways.
  - estimated Year: 1968
  - Justices:
    - Earl Warren (Chief Justice)
    - Hugo Black
    - William O. Douglas
    - John M. Harlan II
    - William J. Brennan Jr.
    - Potter Stewart
    - Byron White
    - Abe Fortas
    - Thurgood Marshall

- The Early Lochner Era:
  - Description: Known for its emphasis on economic liberty and limited government intervention in the economy, often striking down progressive legislation.
  - estimated Year: 1905
  - Justices:
    - Melville Fuller (Chief Justice)
    - John Marshall Harlan
    - David J. Brewer
    - Henry B. Brown
    - Edward D. White
    - Rufus W. Peckham
    - Joseph McKenna
    - Oliver Wendell Holmes Jr.
    - William R. Day

- The Court From Hell:
  - Description: This is not the bench you want. This is not the bench you deserve. And yet, this is the bench you have to work with.
  - estimated Year: Next Year
  - Justices:
    - Peter Thiel (Chief Justice)
    - Clarence Thomas
    - Antonin Scalia
    - Brett Kavanaugh
    - Judge Dredd
    - Mr. Beast
    - A DVD Boxed Set of Law & Order: SVU
    - William Rehnquist
    - Roger B. Taney

Also, one new President

- Vince McMahon (he'll succeed Donald Trump). Change The Undertaker to be a Vince McMahon appointee. Vince McMahon is very republican, very very fiscally conservative, but pro-pornography, violence and gambling.

## Eventual Next Steps

- The player will be assigned a goal, such as "Complete Gender Equality", "Constitutional Racial Segregation", or "Instute Monarchy". Each resolved case will either move the player closer to or further from their goal, depending on which side they were on and how the justices voted.
- Between rounds, the player will be able to affect the bench, by forcing retirements, influencing nominations, or even packing the court.
- In single player, create difficulty settings
- AI Opponents should be given names
- Eventually, make this multiplayer
- Specific court makeups: eg: Warren Court, Bergen Court, Blackman Court, etc.
