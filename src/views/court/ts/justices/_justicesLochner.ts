import { Justice } from "../_types";
import {
  PRES_CLEVELAND,
  PRES_BENJAMIN_HARRISON,
  PRES_MCKINLEY,
  PRES_THEODORE_ROOSEVELT,
} from "../_presidents";
export const lochnerJustices: Justice[] = [
  {
    id: 65,
    name: "Melville Fuller",
    image: "fuller.webp",
    description:
      "Chief Justice during the Lochner era, best known for presiding over an era in which the Court struck down minimum wage laws, child labor restrictions, and anything else that suggested the government could regulate a business doing business. A strict constructionist who constructed stricter protections for capital than for people. Had distinguished white hair. The hair did not help.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1833,
    nominatedBy: PRES_CLEVELAND,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 7,
      charisma: 6,
      empathy: 2,

      succeptibility: 4,
      partyLoyalty: 8,
    },
    weaknesses: { flattery: 6, bribery: 4, blackmail: 4, threats: 3 },
    stances: [
      {
        topic: "EconomicRegulation",
        position: "Against",
        note: "Presided over the Lochner-era Court that struck down minimum wage laws, child labor restrictions, and any regulation constraining the freedom of contract.",
      },
      {
        topic: "PropertyRights",
        position: "For",
        note: "Led the Fuller Court in reading constitutional protection for property rights expansively, insulating business from virtually all government intervention.",
      },
      {
        topic: "FederalPower",
        position: "Against",
        note: "Authored Pollock v. Farmers' Loan (1895), striking down the federal income tax. Congress responded by amending the Constitution. Fuller was unmoved.",
      },
    ],
  },
  {
    id: 66,
    name: "David J. Brewer",
    image: "david_brewer.webp",
    description:
      "Devoted to the proposition that property rights are functionally sacred and government regulation is presumptively evil. Nephew of Justice Stephen Field. Wrote opinions defending corporate interests with the zeal of a man who had never been poor and intended to keep it that way. Occasionally pleasant at dinner parties.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1837,
    nominatedBy: PRES_BENJAMIN_HARRISON,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 7,
      charisma: 5,
      empathy: 2,

      succeptibility: 4,
      partyLoyalty: 8,
    },
    weaknesses: { flattery: 6, bribery: 5, blackmail: 4, threats: 3 },
    stances: [
      {
        topic: "PropertyRights",
        position: "For",
        note: "One of the most zealous defenders of contract and property rights on the Lochner-era bench; treated economic liberty as virtually sacrosanct.",
      },
      {
        topic: "EconomicRegulation",
        position: "Against",
        note: "Voted to strike down railroad regulations, labor laws, and antitrust enforcement with consistent enthusiasm for corporate freedom from government interference.",
      },
      {
        topic: "WorkersRights",
        position: "Against",
        note: "Authored opinions blocking state protections for workers on the grounds that employees are free to negotiate their own fate — regardless of actual bargaining power.",
      },
    ],
  },
  {
    id: 67,
    name: "Edward D. White",
    image: "edward_white.webp",
    description:
      "A Democrat appointed by Cleveland who later became Chief Justice under Taft — which tells you something about ideological drift. Catholic, Confederate veteran, and legal pragmatist who invented the 'rule of reason' in antitrust law, which means he made the rules just vague enough that they could mean anything. A very useful skill.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1845,
    nominatedBy: PRES_CLEVELAND,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 7,
      charisma: 6,
      empathy: 4,

      succeptibility: 5,
      partyLoyalty: 7,
    },
    weaknesses: { flattery: 5, bribery: 4, blackmail: 5, threats: 3 },
    stances: [
      {
        topic: "CorporatePower",
        position: "For",
        note: "Invented the antitrust 'rule of reason,' making monopoly cases deliberately flexible enough that enforceable standards were hard to pin down.",
      },
      {
        topic: "EconomicRegulation",
        position: "For",
        note: "More pragmatic than his Lochner-era colleagues; authored Standard Oil (1911) and American Tobacco (1911) actually breaking up major monopolies.",
      },
      {
        topic: "StatesRights",
        position: "For",
        note: "Confederate veteran with a consistent preference for state authority and skepticism of federal reach exceeding its constitutional grant.",
      },
    ],
  },
  {
    id: 68,
    name: "Rufus W. Peckham",
    image: "peckham.webp",
    description:
      "Author of the majority opinion in Lochner v. New York, the most reviled economic liberty decision in American legal history, which struck down a law limiting bakers to 10-hour workdays as an unconstitutional interference with freedom of contract. Peckham believed men should be free to work unlimited hours in hot flour dust if they really wanted to. Historians have been arguing about this ever since.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1838,
    nominatedBy: PRES_CLEVELAND,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 7,
      charisma: 5,
      empathy: 1,

      succeptibility: 4,
      partyLoyalty: 8,
    },
    weaknesses: { flattery: 6, bribery: 5, blackmail: 4, threats: 3 },
    stances: [
      {
        topic: "EconomicRegulation",
        position: "Against",
        note: "Authored Lochner v. New York (1905), striking down a law limiting bakers to 10-hour days as unconstitutional interference with freedom of contract.",
      },
      {
        topic: "WorkersRights",
        position: "Against",
        note: "Believed workers were free to negotiate any terms their employer required — a philosophical position that looks different when you work in a 110°F flour room.",
      },
      {
        topic: "PropertyRights",
        position: "For",
        note: "Authored Maxwell v. Dow (1900), ruling that the right to trial by jury of twelve in state courts was not constitutionally required. Property first, procedure second.",
      },
    ],
  },
  {
    id: 69,
    name: "Joseph McKenna",
    image: "mckenna.webp",
    description:
      "McKinley's Attorney General turned Associate Justice, best known for a late-career condition where his colleagues quietly stopped counting his votes when they suspected cognitive decline — and then had to figure out what to do about it, because there was no mechanism for that. He served until he was 80 and nobody wanted to be rude. A cautionary tale about term limits, served warm.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1843,
    nominatedBy: PRES_MCKINLEY,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 5,
      charisma: 5,
      empathy: 5,

      succeptibility: 7,
      partyLoyalty: 7,
    },
    weaknesses: { flattery: 7, bribery: 5, blackmail: 6, threats: 5 },
    stances: [
      {
        topic: "EconomicRegulation",
        position: "Against",
        note: "Voted with the Lochner-era majority on most economic liberty questions, though his later opinions grew less predictable as cognitive decline set in.",
      },
      {
        topic: "FreeSpeech",
        position: "Against",
        note: "Authored United States v. Doremus (1919), upholding the Harrison Narcotics Tax Act, and generally supported government restrictions on expression he viewed as subversive.",
      },
      {
        topic: "SocialOrder",
        position: "For",
        note: "Stayed on the bench until age 80 despite obvious decline because no one wanted to tell him to leave. A testament to institutional courtesy, or institutional cowardice.",
      },
    ],
  },
  {
    id: 70,
    name: "William R. Day",
    image: "william_day.webp",
    description:
      "A quiet Roosevelt appointee who served without fanfare during one of the Court's most controversial periods. Presided over dozens of landmark antitrust cases and international disputes stemming from the Spanish-American War. Best known for being reasonable in an unreasonable era, which is a perfectly good way to be remembered, even if nobody makes a statue of 'reasonable.'",
    justiceType: "historical",
    gender: "M",
    birthYear: 1849,
    nominatedBy: PRES_THEODORE_ROOSEVELT,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 8,
      charisma: 5,
      empathy: 6,

      succeptibility: 4,
      partyLoyalty: 6,
    },
    weaknesses: { flattery: 4, bribery: 3, blackmail: 3, threats: 3 },
    stances: [
      {
        topic: "AccusedRights",
        position: "For",
        note: "Authored Weeks v. United States (1914), establishing the federal exclusionary rule — evidence obtained through illegal searches cannot be used in federal court.",
      },
      {
        topic: "EconomicRegulation",
        position: "For",
        note: "More moderate than Lochner-era colleagues; voted to uphold reasonable government regulation of commerce and did not treat all state economic laws as constitutional violations.",
      },
      {
        topic: "FederalPower",
        position: "For",
        note: "Supported Congress's authority to regulate interstate commerce in cases stemming from the Spanish-American War era, including antitrust and trade disputes.",
      },
    ],
  },
];

