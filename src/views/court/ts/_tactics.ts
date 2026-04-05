import { Tactic } from "./_types";

export const tactics: Tactic[] = [
  // ─── ATTACKS ──────────────────────────────────────────────────────

  {
    id: 1,
    name: "Appeal to Precedent",
    description: "Sways all justices. High-logic justices are strongly persuaded. Low-logic justices are personally insulted that you brought up authority.",
    flavorText: "Citing cases no one in the room has read since law school, loudly.",
    cardType: "attack",
    effectType: "sway-all",
    basePower: 3,
    statBasis: "logic",
    statRelation: "polarizes-high",
  },
  {
    id: 2,
    name: "Emotional Appeal",
    description: "Sways one justice based on their empathy stat. Completely useless against justices who do not have feelings.",
    flavorText: "Think of the children. The puppies. The children's puppies.",
    cardType: "attack",
    effectType: "sway-one",
    basePower: 6,
    statBasis: "empathy",
    statRelation: "amplifies",
  },
  {
    id: 3,
    name: "Bribe the Justice",
    description: "Targets one justice's bribery weakness. A casual 'thank-you-in-advance' goes a long way.",
    flavorText: "It's not a bribe. It's a Boca Raton vacation property. There's a difference.",
    cardType: "attack",
    effectType: "sway-one",
    basePower: 7,
    weaknessBasis: "bribery",
  },
  {
    id: 4,
    name: "Leak to the Press",
    description: "Targets one justice's blackmail weakness. Effective on justices who have something to hide (most of them).",
    flavorText: "Interesting Venmo history you have there, Justice.",
    cardType: "attack",
    effectType: "sway-one",
    basePower: 7,
    weaknessBasis: "blackmail",
  },
  {
    id: 5,
    name: "Threaten Political Fallout",
    description: "Targets one justice's threats weakness. Works best on justices who still think their legacy is saveable.",
    flavorText: "It would be a shame if your name appeared in a very loud campaign ad.",
    cardType: "attack",
    effectType: "sway-one",
    basePower: 6,
    weaknessBasis: "threats",
  },
  {
    id: 6,
    name: "Constitutional Technicality",
    description: "Sways all justices. Low-logic justices are fully bamboozled. High-logic justices see right through it and are actively insulted you tried.",
    flavorText: "Actually, if you read Article XIV, subsection (b), paragraph... wait, come back.",
    cardType: "attack",
    effectType: "sway-all",
    basePower: 4,
    statBasis: "logic",
    statRelation: "polarizes-low",
  },
  {
    id: 7,
    name: "Shameless Flattery",
    description: "Targets one justice's flattery weakness. Utterly transparent. Works anyway.",
    flavorText: "Your intellect is matched only by your magnificent legal writings. Truly. Every single one.",
    cardType: "attack",
    effectType: "sway-one",
    basePower: 7,
    weaknessBasis: "flattery",
  },
  {
    id: 8,
    name: "Call a Celebrity Witness",
    description: "Sways all justices. High-charisma justices are immune; low-charisma justices are delighted someone famous showed up.",
    flavorText: "I call to the stand: a beloved actor who has no legal expertise but is extremely likeable.",
    cardType: "attack",
    effectType: "sway-all",
    basePower: 5,
    statBasis: "charisma",
    statRelation: "resists",
  },
  {
    id: 9,
    name: "Invoke the Founding Fathers",
    description: "Sways all justices. High-integrity justices respond to principled arguments; low-integrity justices nod politely and move on.",
    flavorText: "The Framers clearly intended this. (They did not intend this.)",
    cardType: "attack",
    effectType: "sway-all",
    basePower: 3,
    statBasis: "integrity",
    statRelation: "amplifies",
  },
  {
    id: 10,
    name: "Yell 'FREEDOM!'",
    description: "Sways all justices by a small amount regardless of stats. Not a legal argument. Consistently works anyway.",
    flavorText: "Technically this is contempt of court. Technically no one is stopping you.",
    cardType: "attack",
    effectType: "sway-all",
    basePower: 2,
  },

  // ─── DEFENSE ──────────────────────────────────────────────────────

  {
    id: 11,
    name: "Redirect the Witness",
    description: "Shields one allied justice from the next opposing effect. Must target a justice already on your side.",
    flavorText: "I'd like to redirect the court's attention to something completely different. Over there. No, there.",
    cardType: "defense",
    effectType: "shield",
    basePower: 0,
  },

  // ─── UTILITY ──────────────────────────────────────────────────────

  {
    id: 12,
    name: "Be Extremely Boring",
    description: "Raises susceptibility on all justices. Their glazed-over eyes will make your next attack much more effective.",
    flavorText: "The Administrative Procedures Act of 1946, as amended in 1962, as supplemented in 1979, as — hello? Hello?",
    cardType: "utility",
    effectType: "susceptibility",
    basePower: 4,
    feedback: "All justices are more susceptible to arguments.",
  },

  // ─── DOCKET MANIPULATION ──────────────────────────────────────────

  {
    id: 13,
    name: "Purge the Record",
    description: "Discard all 5 cards in the Docket and draw 5 fresh ones. If opposing counsel was quietly counting on any of those cards, that's a shame.",
    flavorText: "Motion to strike everything. The whole thing. Yes, the precedent too. Especially the precedent.",
    cardType: "utility",
    effectType: "discard-all",
    basePower: 0,
    feedback: "The Docket has been cleared.",
  },
  {
    id: 14,
    name: "I Call Dibs",
    description:
      "Sidebar! Select 2 cards from the Docket to claim for your exclusive use. You must still play them yourself, but at least opposing counsel can't. Only usable if you have no current Dibs.",
    flavorText: "Objection, Your Honor. Those cards were mine spiritually before my client could lose.",
    cardType: "defense",
    effectType: "claim-two",
    basePower: 0,
  },

  // ─── CHIEF JUSTICE INTERACTION ────────────────────────────────

  {
    id: 15,
    name: "Elevate to Chief",
    description:
      "Appoint a justice as the new Chief Justice. The previous Chief — and their partisan allies — won't be pleased. The new Chief loses the title's normal sway resistance.",
    flavorText: "With all due respect to the current Chief, I'd like to propose a restructuring.",
    cardType: "utility",
    effectType: "make-chief",
    basePower: 0,
  },
  {
    id: 16,
    name: "Bench Roast",
    description:
      "Deliver a scathing insult to the Chief Justice directly. They'll take it personally. Every justice with a different party affiliation will enjoy it immensely.",
    flavorText: "Some say a judge's reputation speaks louder than their rulings. In this case, both are embarrassing.",
    cardType: "attack",
    effectType: "insult-chief",
    basePower: 4,
  },
  {
    id: 17,
    name: "Ring Me Up The President",
    description:
      "Patch in a Zoom call with President Trump. His nominees are delighted. Other Republicans politely nod. Obama and Biden nominees are appalled. Other Democrats are mildly annoyed. He accidentally hangs up after 10 minutes. Affects all justices.",
    flavorText: "The call was perfect. The best call. Everyone says so. You can check — actually, don't check.",
    cardType: "attack",
    effectType: "presidential-call",
    basePower: 5,
  },
  {
    id: 18,
    name: "Recuse Yourself!",
    description:
      "Force a targeted justice to recuse — their leaning resets to neutral. But their brush with your persuasion leaves them wary: they'll be harder to sway for the rest of the trial.",
    flavorText: "There are no conflicts of interest here. There are only interests.",
    cardType: "utility",
    effectType: "recuse",
    basePower: 0,
  },

  // ─── ADVANCED ATTACKS ─────────────────────────────────────────

  {
    id: 19,
    name: "Betray Your Friend",
    description:
      "Target a justice who is Strongly For you and destroy them personally. They will turn STRONGLY AGAINST you. However, any opposing-party justices who were already leaning against you have a good chance of being swayed your way.",
    flavorText: "I've always believed the strongest legal strategy is the one where you stab your biggest fan in the face.",
    cardType: "attack",
    effectType: "betray-friend",
    basePower: 0,
  },

  // ─── ADVANCED UTILITY ─────────────────────────────────────────

  {
    id: 20,
    name: "Swap Clerks",
    description:
      "Select any two justices. Good chance their positions swap entirely. Statistically relevant chance the clerks rat you out and both justices get a negative opinion of you.",
    flavorText: "Law clerks are overworked, underpaid, and know exactly where everything is. This cuts both ways.",
    cardType: "utility",
    effectType: "swap-clerks",
    basePower: 0,
  },
  {
    id: 21,
    name: "Encourage A Nap",
    description:
      "Select a justice. They skip the next round entirely — no one can sway them. When they wake up, they're well rested and inexplicably fond of you.",
    flavorText: "Oral arguments are dense, the room is warm, and this man ate a very large lunch. Sometimes you help.",
    cardType: "utility",
    effectType: "encourage-nap",
    basePower: 0,
  },
  {
    id: 22,
    name: "Justice Cocktails",
    description: "Select a justice. Their charisma and empathy go up. Their logic goes down. For the rest of the trial.",
    flavorText: "The open bar at the Heritage Foundation gala was, in retrospect, a foreseeable variable.",
    cardType: "utility",
    effectType: "justice-cocktails",
    basePower: 0,
  },
  {
    id: 23,
    name: "Hire A Private Investigator",
    description:
      "Select two justices. Both become aware that someone is watching them very closely. Their susceptibility to blackmail increases dramatically for the rest of the trial.",
    flavorText: "The PI followed both of them. Everything he found was legal. Everything was also extremely useful.",
    cardType: "utility",
    effectType: "hire-pi",
    basePower: 0,
  },
  {
    id: 24,
    name: "Celebrate St. Patrick's Day",
    description: "All justices become Catholic for the rest of the trial. On its own, this does very little. Paired with 'Invite To Church,' it does a lot.",
    flavorText: "The shamrocks were unprompted. The Guinness was not.",
    cardType: "utility",
    effectType: "saint-patricks",
    basePower: 0,
    feedback: "All justices are now Catholic.",
  },
  {
    id: 25,
    name: "Invite To Church",
    description: "Select a justice. Their empathy goes up for the rest of the trial. Every justice who shares their religion gives you a favorable nod.",
    flavorText: "Attendance was low, but opinions were formed.",
    cardType: "utility",
    effectType: "invite-church",
    basePower: 0,
  },

  // ─── CAMPAIGN-ONLY TACTICS ────────────────────────────────────────────
  // These cards have campaignOnly: true and will NEVER appear in Quick Play decks.

  {
    id: 26,
    name: "Suggest Retirement",
    description:
      "This justice loses a massive amount of favor — nearly impossible to recover from. However, during the next Recess, they are guaranteed to retire, opening a vacancy for nomination.",
    flavorText: "You lean in during a recess and say, very quietly, 'You look tired, Your Honor. Maybe... permanently tired?' They do not disagree.",
    cardType: "attack",
    effectType: "suggest-retirement",
    basePower: 0,
    campaignOnly: true,
    feedback: "This justice has been diplomatically encouraged to consider retirement.",
  },
  {
    id: 27,
    name: "Keep That Crown",
    description:
      "Make the current trial's appointed Chief Justice permanent for the rest of the campaign. Requires 'Elevate to Chief' to have been played this trial. Disabled otherwise.",
    flavorText: "The gavel is power. The crown stays on.",
    cardType: "utility",
    effectType: "keep-crown",
    basePower: 0,
    campaignOnly: true,
    feedback: "The new Chief Justice's appointment is now permanent.",
  },
];
