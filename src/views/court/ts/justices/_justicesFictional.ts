import { Justice } from "../_types";
import {
  PRES_VERMIN_SUPREME,
  PRES_BIDEN,
  PRES_HUNTER_S_THOMPSON,
  PRES_SNOOP_DOGG,
  PRES_LIBERACE,
} from "../_presidents";
export const fictionalJustices: Justice[] = [
  {
    id: 21,
    name: "Judge Dredd",
    image: "dredd.webp",
    description:
      "I AM THE LAW. Does not recognize the concept of appeals. His gavel is also a gun. Has issued seventeen sentences during oral arguments. The other justices are scared of him but will not say so on the record.",
    justiceType: "fictional",
    gender: "M",
    birthYear: 2079,
    nominatedBy: PRES_VERMIN_SUPREME,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 7,
      charisma: 4,
      empathy: 1,

      succeptibility: 1,
      partyLoyalty: 3,
    },
    stances: [
      {
        topic: "PolicePower",
        position: "For",
        note: "Believes law enforcement should be judge, jury, and executioner. Literally.",
      },
      {
        topic: "AccusedRights",
        position: "Against",
        note: "Does not believe in Miranda rights. Or any rights for the accused.",
      },
      {
        topic: "Guns",
        position: "For",
        note: "Carries a Lawgiver sidearm at all times. Thinks everyone should.",
      },
      {
        topic: "SocialOrder",
        position: "For",
        note: "Maintains order through fear and overwhelming force.",
      },
    ],
    weaknesses: { flattery: 1, bribery: 1, blackmail: 1, threats: 1 },
  },
  {
    id: 32,
    name: "Leslie Knope",
    image: "knope.webp",
    description:
      "Former Parks & Recreation Director who ascended to the Supreme Court through sheer organized enthusiasm and a binder for every occasion. Believes deeply in government, waffles, and the American people — in that order.",
    justiceType: "fictional",
    gender: "F",
    birthYear: 1975,
    nominatedBy: PRES_BIDEN,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 8,
      charisma: 9,
      empathy: 10,

      succeptibility: 4,
      partyLoyalty: 8,
    },
    weaknesses: { flattery: 9, bribery: 1, blackmail: 1, threats: 2 },
    stances: [
      {
        topic: "EconomicRegulation",
        position: "For",
        note: "Believes in robust government action to help communities thrive.",
      },
      {
        topic: "EnvironmentalProtection",
        position: "For",
        note: "Insists every American deserves a clean park and clean water.",
      },
      {
        topic: "WorkersRights",
        position: "For",
        note: "Fights for fair wages, paid leave, and waffle breaks for all.",
      },
    ],
  },
  {
    id: 33,
    name: "Al Swearengen",
    image: "swearengen.webp",
    description:
      "Proprietor of the Gem Saloon, Deadwood, South Dakota. Appointed himself to the Court through a combination of intimidation, bribery, and a handshake deal nobody wants to explain. Has never lost a negotiation. Will not lose this one.",
    justiceType: "fictional",
    gender: "M",
    birthYear: 1845,
    nominatedBy: PRES_HUNTER_S_THOMPSON,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 8,
      charisma: 9,
      empathy: 4,

      succeptibility: 3,
      partyLoyalty: 4,
    },
    weaknesses: { flattery: 4, bribery: 9, blackmail: 8, threats: 1 },
    stances: [
      {
        topic: "SocialOrder",
        position: "Against",
      },
      {
        topic: "PolicePower",
        position: "Against",
      },
      { topic: "WomensRights", position: "Against" },
      { topic: "NativeSovereignty", position: "Against" },
      { topic: "CorporatePower", position: "Against" },
    ],
  },
  {
    id: 34,
    name: "The Dude",
    image: "dude.webp",
    description:
      "The Dude abides. Applied to the Court without knowing he'd applied. Brings his own rug to hearings. Has recused himself from every case involving nihilism. Technically his bowling average is cited in three opinions.",
    justiceType: "fictional",
    gender: "M",
    birthYear: 1958,
    nominatedBy: PRES_SNOOP_DOGG,
    religion: "Other",
    ethnicity: "White",
    stats: {
      logic: 1,
      charisma: 7,
      empathy: 7,
      succeptibility: 9,
      partyLoyalty: 2,
    },
    weaknesses: { flattery: 7, bribery: 5, blackmail: 8, threats: 1 },
    stances: [
      {
        topic: "Drugs",
        position: "For",
        note: "Advocates for the legalization of all substances, especially White Russians.",
      },
      {
        topic: "AgencyDeference",
        position: "For",
        note: "Believes agencies should just, you know, handle it, man.",
      },
    ],
  },
  {
    id: 35,
    name: "Othello",
    image: "othello.webp",
    description:
      "Moor of Venice, former military general, now somehow on the Supreme Court. A man of great passion and even greater susceptibility to insinuation. Extraordinarily just until someone whispers in his ear — and then things escalate quickly.",
    justiceType: "fictional",
    gender: "M",
    birthYear: 1603,
    religion: "Protestant",
    ethnicity: "Black",
    stats: {
      logic: 6,
      charisma: 8,
      empathy: 8,
      succeptibility: 9,
      partyLoyalty: 5,
    },
    weaknesses: { flattery: 5, bribery: 3, blackmail: 10, threats: 6 },
    stances: [
      {
        topic: "AccusedRights",
        position: "For",
        note: "Believes in justice and fair trials, unless manipulated by others.",
      },
      {
        topic: "SocialOrder",
        position: "For",
        note: "Values order and loyalty, but is vulnerable to intrigue.",
      },
    ],
  },
  {
    id: 36,
    name: "Mentok The Mind Taker",
    image: "mentok.webp",
    description:
      "Villain-turned-justice from the Harvey Birdman universe, where superheroes became attorneys and this is somehow what followed. Cannot stop reading the minds of opposing counsel, which is cheating. Has been issued fourteen contempt warnings and considers each one a badge of honor.",
    justiceType: "fictional",
    gender: "M",
    birthYear: 1972,
    nominatedBy: PRES_SNOOP_DOGG,
    religion: "Other",
    ethnicity: "Other",
    stats: {
      logic: 4,
      charisma: 8,
      empathy: 3,
      succeptibility: 8,
      partyLoyalty: 4,
    },
    weaknesses: { flattery: 8, bribery: 6, blackmail: 7, threats: 5 },
    stances: [
      {
        topic: "CivilLiberties",
        position: "Against",
        note: "Believes the right to a fair trial does not include immunity from mind reading.",
      },
      {
        topic: "CourtAuthority",
        position: "For",
        note: "Thinks the Court should have the power to issue contempt warnings for boring arguments.",
      },
    ],
  },
  {
    id: 37,
    name: "Judge Doom",
    image: "doom.webp",
    description:
      "The villainous mastermind behind Toontown's destruction, now on the Supreme Court. Keeps a vat of Dip under the bench 'for procedural purposes.' His eyes spin when he's overruled, which is terrifying. Believed by some to be a Toon himself, which he vehemently denies in a very high-pitched voice.",
    justiceType: "fictional",
    gender: "M",
    birthYear: 1947,
    nominatedBy: PRES_LIBERACE,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 9,
      charisma: 6,
      empathy: 1,
      succeptibility: 2,
      partyLoyalty: 9,
    },
    weaknesses: { flattery: 3, bribery: 4, blackmail: 5, threats: 2 },
    stances: [
      {
        topic: "RacialEquity",
        position: "Against",
        note: "Believes in strict separation of Toons and humans.",
      },
      {
        topic: "EnvironmentalProtection",
        position: "Against",
        note: "Keeps a vat of Dip under the bench—environmental hazard.",
      },
    ],
  },
  {
    id: 38,
    name: "A DVD Boxed Set of Law & Order: SVU",
    image: "svu_box.webp",
    description:
      "In the Supreme Court, the people are represented by two separate yet equally important groups: the discs, and the case summaries on the back of the box. These are their stories. Has issued opinions in 500+ episodes and will not be stopped. Asks every petitioner 'but did you do it?' Has never presided over a case involving sexually based offenses without a nine-minute cold open.",
    justiceType: "fictional",
    gender: "M",
    birthYear: 1999,
    nominatedBy: PRES_HUNTER_S_THOMPSON,
    religion: "Other",
    ethnicity: "Other",
    courtName: "Dick Wolf (DUN DUN)",
    stats: {
      logic: 7,
      charisma: 5,
      empathy: 0,
      succeptibility: 1,
      partyLoyalty: 6,
    },
    weaknesses: { flattery: 2, bribery: 1, blackmail: 3, threats: 2 },
    stances: [
      {
        topic: "PolicePower",
        position: "For",
        note: "Always sides with law enforcement, no matter the evidence.",
      },
      {
        topic: "AccusedRights",
        position: "Against",
        note: "Assumes guilt until proven innocent, then still suspicious.",
      },
    ],
  },
];
