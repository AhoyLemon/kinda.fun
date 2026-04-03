import { Tactic } from "./_types";

export const tactics: Tactic[] = [
  // ─── ATTACKS ──────────────────────────────────────────────────────

  {
    id: 1,
    name: "Appeal to Precedent",
    description: "Sways all justices. High-logic justices respond strongly; low-logic justices shrug and eat a sandwich.",
    flavorText: "Citing cases no one in the room has read since law school, loudly.",
    cardType: "attack",
    effectType: "sway-all",
    basePower: 3,
    statBasis: "logic",
    statRelation: "amplifies",
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
    description: "Sways all justices. Low-logic justices are fully bamboozled; high-logic justices are actively insulted.",
    flavorText: "Actually, if you read Article XIV, subsection (b), paragraph... wait, come back.",
    cardType: "attack",
    effectType: "sway-all",
    basePower: 4,
    statBasis: "logic",
    statRelation: "resists",
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
      "Deliver a scathing insult to the Chief Justice directly. They'll take it personally (-4). Every justice with a different party affiliation will enjoy it immensely (+2).",
    flavorText: "Some say a judge's reputation speaks louder than their rulings. In this case, both are embarrassing.",
    cardType: "attack",
    effectType: "insult-chief",
    basePower: 4,
  },
];
