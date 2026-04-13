import { Tactic } from "./_types";

export const tactics: Tactic[] = [
  // ─── ATTACKS ──────────────────────────────────────────────────────

  {
    id: 1,
    name: "Cite Precedents",
    description:
      "Sways all justices. High-logic justices are strongly persuaded; they respect a citation. Low-logic justices are actively offended you brought up authority and lean harder the other way.",
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
    description:
      "Sways one justice scaled directly by their empathy stat. Moves a high-empathy justice dramatically. Has no discernible effect on justices who are documented as not having feelings.",
    flavorText: "Think of the children. The puppies. The small businesses owned by puppies.",
    cardType: "attack",
    effectType: "sway-one",
    basePower: 6,
    statBasis: "empathy",
    statRelation: "amplifies",
  },
  {
    id: 3,
    name: "Bribe the Justice",
    description:
      "Exploits one justice's bribery weakness. The higher their susceptibility to a well-placed gift, the more warmly they'll receive this thoughtful arrangement.",
    flavorText: "It's not a bribe. It's a Boca Raton vacation property. There's a difference.",
    cardType: "attack",
    effectType: "sway-one",
    basePower: 7,
    weaknessBasis: "bribery",
  },
  {
    id: 4,
    name: "Leak to the Press",
    description: "Exploits one justice's blackmail weakness. Effective on justices with a complicated personal history — and there are several candidates.",
    flavorText: "Interesting Venmo history you have there, Justice. Very interesting indeed.",
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
    id: 7,
    name: "Shameless Flattery",
    description: "Exploits one justice's flattery weakness. The approach is transparent. The compliments are excessive. It works anyway.",
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
    description: "Sways all justices. High-party-loyalty justices are stirred by the appeal to tradition; independents shrug it off.",
    flavorText: "The Framers clearly intended this. (They did not intend this.)",
    cardType: "attack",
    effectType: "sway-all",
    basePower: 3,
    statBasis: "partyLoyalty",
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

  // Removing this one as it's currently broken
  // {
  //   id: 12,
  //   name: "Be Extremely Boring",
  //   description:
  //     "Raises susceptibility on all justices. Their glazed-over eyes and caffeine-deprived attention spans will make your very next attack hit significantly harder.",
  //   flavorText:
  //     "The Administrative Procedures Act of 1946, as amended in 1962, continuing through the relevant subsections, which are many — you're still here, right?",
  //   cardType: "utility",
  //   effectType: "susceptibility",
  //   basePower: 4,
  //   feedback: "Every justice is now profoundly susceptible to whatever comes next.",
  // },

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
      "Select 2 cards from the Docket to claim exclusively. Opposing counsel can no longer play them. You must still play them yourself. Only usable while you have no active Dibs.",
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
      "Appoint a justice as Chief. They warm to you immediately. The prior Chief and their partisan allies are displeased, and the new Chief loses their sway resistance.",
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
      "Patch in a Zoom call with President Trump. His nominees are delighted. Other Republicans politely nod. Obama and Biden nominees are appalled. Other Democrats are mildly annoyed. He accidentally hangs up after 10 minutes.",
    flavorText: "The call was perfect. The best call. Everyone says so. You can check — actually, don't check.",
    cardType: "attack",
    effectType: "presidential-call",
    basePower: 5,
    requiresTrumpNominee: true,
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
      "Target a justice Strongly For you. They flip to Strongly Against. Opposing-party justices currently leaning against you may rally to your side as a result.",
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
      "Select two justices. High chance their leanings swap entirely. Nonzero chance the clerks tell on you and both justices warm to you less. You'll be told which happened.",
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
    name: "Order Drinks For A Justice",
    description:
      "Target a justice. Their charisma, empathy, and susceptibility rise for the rest of the trial while their logic drops. They also slide meaningfully toward you right now.",
    flavorText: "The Heritage Foundation gala was an open bar. One justice in particular should not have had that fourth beer. You know who you are.",
    cardType: "utility",
    effectType: "justice-cocktails",
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
    name: "Take Me To Church",
    description:
      "Target a justice. Attending church is personally moving — they sway toward you directly. Their empathy rises for the trial, and every justice sharing their religion gives you a favorable nod.",
    flavorText: "The pews were mostly empty. The opinions were not.",
    cardType: "utility",
    effectType: "invite-church",
    basePower: 0,
  },
  // ─── NEW CARDS ────────────────────────────────────────────────────────────

  {
    id: 28,
    name: "Reframe The Debate",
    description:
      "Choose from 3 stance topics drawn from the current bench. Every justice with a known position is immediately and strongly swayed — justices who are For the topic warm to you; those Against lean away.",
    flavorText: "You don't win arguments by winning arguments. You win by changing what the argument is.",
    cardType: "utility",
    effectType: "reframe-debate",
    basePower: 0,
  },

  {
    id: 29,
    name: "Gift Boxes Of Ferrero Rocher",
    description:
      "Bribery-susceptible justices (6+) are swayed in your favor. Bribery-resistant justices (3 or lower) are deeply offended and lean against you. Others are unmoved by the gesture.",
    flavorText: "A handwritten note read: 'These are just chocolates. Enjoy.' The envelope inside said something slightly different.",
    cardType: "attack",
    effectType: "gift-boxes",
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

  // ─── NEW TACTICS ───────────────────────────────────────────────────────────

  {
    id: 30,
    name: "Plant A Story",
    description:
      "Your sources in the Senate made a few calls. Every justice feels their party watching. Raises all justices' party loyalty for the rest of the trial.",
    flavorText: "The headline writes itself: 'Justices Under Fire From Own Party.' Nobody reads it. Everyone sees it.",
    cardType: "utility",
    effectType: "plant-story",
    basePower: 0,
    feedback: "All justices are now more loyal to their party.",
  },
  {
    id: 31,
    name: "Invoke The Lemon Test",
    description:
      "Cite Lemon v. Kurtzman, loudly. All justices become irreligious for the rest of the trial and gain a slight logic boost. Has no effect on justices already deeply uncomfortable with religion.",
    flavorText: "The Establishment Clause enters the chat. The church-going bloc checks their watches.",
    cardType: "utility",
    effectType: "lemon-test",
    basePower: 0,
    feedback: "All justices are temporarily irreligious. Their logic has improved accordingly.",
  },
  {
    id: 32,
    name: "Suggest Yoga",
    description:
      "Politely suggest a justice step away for some mindfulness. They skip the next round. When they return, their empathy and susceptibility are permanently raised for the rest of the trial.",
    flavorText: "'Have you considered a quick flow before deliberations?' They have not. They will now.",
    cardType: "utility",
    effectType: "suggest-yoga",
    basePower: 0,
  },
  {
    id: 33,
    name: "Yaaas! Drag Them!",
    description:
      "Publicly air a justice's worst qualities. Their charisma takes a permanent hit. If they're weak to threats, they'll also slide in your direction. If they're immune to threats, they won't appreciate it.",
    flavorText: "The tweet had 80,000 likes. The justice saw it. The justice is... processing.",
    cardType: "attack",
    effectType: "drag-them",
    basePower: 0,
  },
];
