import { Justice } from "../_types";
import {
  PRES_TRUMP,
  PRES_LIBERACE,
  PRES_BJORK,
  PRES_BILL_HICKS,
  PRES_SNOOP_DOGG,
  PRES_VINCE_MCMAHON,
} from "../_presidents";
export const celebrityJustices: Justice[] = [
  {
    id: 29,
    name: "Peter Thiel",
    image: "thiel.webp",
    description:
      "Libertarian billionaire who wants to disrupt tradition, due process, and also possibly mortality. Abstains from cases involving the deep state on principle. Has a separate underground chamber where he writes his concurrences. Believes competition is for losers.",
    justiceType: "celebrity",
    gender: "M",
    birthYear: 1967,
    nominatedBy: PRES_TRUMP,
    religion: "Other",
    ethnicity: "White",
    stats: {
      logic: 9,
      charisma: 4,
      empathy: 1,

      succeptibility: 2,
      partyLoyalty: 7,
    },
    weaknesses: { flattery: 4, bribery: 2, blackmail: 8, threats: 1 },
    stances: [
      {
        topic: "CorporatePower",
        position: "For",
      },
      {
        topic: "EconomicRegulation",
        position: "Against",
      },
      {
        topic: "RichPeople",
        position: "For",
      },
      {
        topic: "WarPowers",
        position: "For",
      },
    ],
  },
  {
    id: 30,
    name: "Judge Judy",
    image: "judy.webp",
    description:
      "Byrd, I'm done listening. Has been tougher than the Supreme Court for thirty years and now she's making it official. Writes opinions in a tone that implies you are an idiot who wasted her time. Once dismissed a case and the parties' marriages simultaneously.",
    justiceType: "celebrity",
    gender: "F",
    birthYear: 1942,
    nominatedBy: PRES_LIBERACE,
    religion: "Jewish",
    ethnicity: "Jewish",
    stats: {
      logic: 9,
      charisma: 9,
      empathy: 5,

      succeptibility: 2,
      partyLoyalty: 5,
    },
    weaknesses: { flattery: 3, bribery: 2, blackmail: 4, threats: 1 },
    stances: [
      {
        topic: "JudicialActivism",
        position: "For",
      },
      {
        topic: "CourtAuthority",
        position: "For",
      },
      {
        topic: "SocialOrder",
        position: "For",
      },
    ],
  },
  {
    id: 31,
    name: "Mary-Kate & Ashley Olsen",
    image: "olsen-twins.webp",
    description:
      "Appointed jointly as one justice, which raises constitutional questions no one wants to answer. Vote in perfect synchrony — except when they don't, which creates a paradox. Have a combined net worth larger than the GDP of three nations. Their opinions are impeccably styled.",
    justiceType: "celebrity",
    gender: "F",
    birthYear: 1986,
    nominatedBy: PRES_BJORK,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 6,
      charisma: 10,
      empathy: 6,

      succeptibility: 7,
      partyLoyalty: 4,
    },
    weaknesses: { flattery: 9, bribery: 6, blackmail: 5, threats: 3 },
    stances: [
      {
        topic: "RichPeople",
        position: "For",
      },
      {
        topic: "WomensRights",
        position: "For",
      },
      {
        topic: "PropertyRights",
        position: "For",
      },
    ],
  },
  {
    id: 39,
    name: "Judge Reinhold",
    image: "reinhold.webp",
    description:
      "A celebrity whose name already contains the word 'Judge,' which apparently qualifies him. Known for Beverly Hills Cop and that thing at the airport. Brings genuine warmth to oral arguments and absolutely no legal training whatsoever. Has recused himself from nothing because why would he.",
    justiceType: "celebrity",
    gender: "M",
    birthYear: 1957,
    nominatedBy: PRES_LIBERACE,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 5,
      charisma: 7,
      empathy: 6,

      succeptibility: 7,
      partyLoyalty: 6,
    },
    weaknesses: { flattery: 8, bribery: 5, blackmail: 6, threats: 4 },
  },
  {
    id: 40,
    name: "Simon Cowell",
    image: "cowell.webp",
    description:
      "TV's harshest talent show judge now rules on constitutional law. His oral argument feedback is devastating, precise, and poorly reasoned. Once told a petitioner their brief was 'a bit karaoke.' High-waisted jeans. Zero empathy. Somehow winning.",
    justiceType: "celebrity",
    gender: "M",
    birthYear: 1959,
    nominatedBy: PRES_LIBERACE,
    religion: "Other",
    ethnicity: "White",
    stats: {
      logic: 7,
      charisma: 10,
      empathy: 2,

      succeptibility: 3,
      partyLoyalty: 6,
    },
    weaknesses: { flattery: 4, bribery: 7, blackmail: 6, threats: 3 },
  },
  {
    id: 41,
    name: "Jerry Springer",
    image: "springer.webp",
    description:
      "Former mayor, former TV ringmaster, now somehow on the nation's highest court. Oral arguments have never been this chaotic or this watchable. Has twice asked attorneys to 'come out here and say that to the other guy's face.' Final Thought: maybe don't do that.",
    justiceType: "celebrity",
    gender: "M",
    birthYear: 1944,
    nominatedBy: PRES_BILL_HICKS,
    religion: "Jewish",
    ethnicity: "Jewish",
    stats: {
      logic: 5,
      charisma: 10,
      empathy: 7,

      succeptibility: 8,
      partyLoyalty: 7,
    },
    weaknesses: { flattery: 8, bribery: 7, blackmail: 6, threats: 4 },
    stances: [
      {
        topic: "SocialOrder",
        position: "Against",
      },
      {
        topic: "FreeSpeech",
        position: "For",
      },
    ],
  },
  {
    id: 56,
    name: "Mr. Beast",
    image: "mrbeast.webp",
    description:
      "YouTuber with 300 million subscribers and a dead-eyed smile in every photo. Doesn't want to solve injustice—just wants credit for pretending to care while manipulating desperate people for views. Turns Supreme Court cases into viral stunts: 'Last one to leave the bench wins a Tesla!' His clerks, the 'Beast Squad,' are paid to look shocked at every ruling. Trends everywhere, mostly as a warning sign for democracy.",
    justiceType: "celebrity",
    gender: "M",
    birthYear: 1998,
    nominatedBy: PRES_SNOOP_DOGG,
    religion: "Protestant",
    ethnicity: "White",
    stats: { logic: 6, charisma: 10, empathy: 9, succeptibility: 8, partyLoyalty: 4 },
    weaknesses: { flattery: 10, bribery: 7, blackmail: 3, threats: 2 },
    stances: [
      {
        topic: "WorkersRights",
        position: "Against",
      },
      {
        topic: "ExecutivePower",
        position: "For",
      },
    ],
  },
  {
    id: 57,
    name: "The Undertaker",
    image: "undertaker.webp",
    description:
      "The Deadman. The Phenom. Presides from a darkened bench to the sound of a funeral gong. Has never lost a WrestleMania match and his legal record is similarly undefeated. His rulings arrive with dramatic thunder effects. Opposing counsel has forfeited by fear on three occasions.",
    justiceType: "celebrity",
    gender: "M",
    birthYear: 1965,
    nominatedBy: PRES_VINCE_MCMAHON,
    religion: "Protestant",
    ethnicity: "White",
    stats: { logic: 7, charisma: 10, empathy: 4, succeptibility: 3, partyLoyalty: 7 },
    weaknesses: { flattery: 3, bribery: 4, blackmail: 7, threats: 1 },
    stances: [
      {
        topic: "SocialOrder",
        position: "For",
        note: "Maintains order through intimidation and supernatural presence.",
      },
      {
        topic: "CourtAuthority",
        position: "For",
        note: "Believes the Court's power is eternal, like his career.",
      },
    ],
  },
];
