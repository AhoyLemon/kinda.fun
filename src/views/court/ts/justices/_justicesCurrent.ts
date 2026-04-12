import { Justice } from "../_types";
import {
  PRES_GHW_BUSH,
  PRES_GW_BUSH,
  PRES_OBAMA,
  PRES_TRUMP,
  PRES_BIDEN,
} from "../_presidents";
export const currentJustices: Justice[] = [
  {
    id: 1,
    name: "John Roberts",
    image: "john_roberts.webp",
    description:
      "Chief Justice who occasionally surprises conservatives by having a spine. Mostly for show. Obsessed with the Court's institutional reputation — the one thing that doesn't technically exist anymore.",
    justiceType: "current",
    gender: "M",
    birthYear: 1955,
    nominatedBy: PRES_GW_BUSH,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 8,
      charisma: 7,
      empathy: 5,

      succeptibility: 4,
      partyLoyalty: 6,
    },
    weaknesses: { flattery: 6, bribery: 3, blackmail: 4, threats: 3 },
    stances: [
      {
        topic: "CourtAuthority",
        position: "For",
        note: "Routinely steers toward narrow rulings to preserve institutional legitimacy — e.g. his controlling concurrence in Dobbs, urging a narrower holding than the majority.",
      },
      {
        topic: "VotingRights",
        position: "Against",
        note: "Authored Shelby County v. Holder (2013), striking the VRA's preclearance coverage formula as unconstitutionally outdated.",
      },
      {
        topic: "AgencyDeference",
        position: "Against",
        note: "Authored West Virginia v. EPA (2022), establishing the 'major questions doctrine' to curtail broad agency rulemaking.",
      },
      {
        topic: "RacialEquity",
        position: "Against",
        note: "Authored SFFA v. Harvard (2023), ending race-conscious admissions programs, writing that 'eliminating racial discrimination means eliminating all of it.'",
      },
      {
        topic: "ExecutivePower",
        position: "For",
        note: "Authored Trump v. United States (2024), granting presidents broad immunity from prosecution for official acts — the Court's most expansive statement of executive authority in decades.",
      },
      {
        topic: "Privacy",
        position: "For",
        note: "Authored Riley v. California (2014), unanimously requiring warrants for cell phone searches — one of the most significant digital privacy rulings of the modern era.",
      },
    ],
  },
  {
    id: 2,
    name: "Clarence Thomas",
    image: "clarence_thomas.webp",
    description:
      "Hasn't asked a question from the bench in a decade. Extremely committed to originalism, which he interprets as 'whatever Harlan Crow thinks.' Believes recusal is for the weak.",
    justiceType: "current",
    gender: "M",
    birthYear: 1948,
    nominatedBy: PRES_GHW_BUSH,
    religion: "Catholic",
    ethnicity: "Black",
    stats: {
      logic: 8,
      charisma: 3,
      empathy: 1,

      succeptibility: 3,
      partyLoyalty: 10,
    },
    weaknesses: { flattery: 4, bribery: 9, blackmail: 7, threats: 2 },
    stances: [
      {
        topic: "Guns",
        position: "For",
        note: "Authored NY State Rifle & Pistol Assn. v. Bruen (2022), striking NY's concealed carry licensing scheme and anchoring gun rights in historical tradition alone.",
      },
      {
        topic: "StatesRights",
        position: "For",
        note: "Dissented in Gonzales v. Raich (2005), arguing federal drug law cannot constitutionally reach locally grown, locally consumed marijuana.",
      },
      {
        topic: "GayRights",
        position: "Against",
        note: "In his Dobbs concurrence (2022), explicitly invited the Court to reconsider Obergefell v. Hodges and Lawrence v. Texas.",
      },
      {
        topic: "AgencyDeference",
        position: "Against",
        note: "Spent decades calling for Chevron deference to be abolished outright — a position the Court finally adopted in Loper Bright Enterprises v. Raimondo (2024).",
      },
      {
        topic: "JudicialActivism",
        position: "For",
        note: "More willing than any peer to overturn precedent wholesale, regularly writing solo concurrences urging reconsideration of substantive due process doctrine entirely.",
      },
    ],
  },
  {
    id: 3,
    name: "Samuel Alito",
    image: "alito.webp",
    description:
      "Believes the Constitution means exactly what he wants it to mean. Known for his concerned frown and his unconcerned decisions. Wrote Dobbs while his wife's car had an upside-down flag.",
    justiceType: "current",
    gender: "M",
    birthYear: 1950,
    nominatedBy: PRES_GW_BUSH,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 7,
      charisma: 4,
      empathy: 2,

      succeptibility: 3,
      partyLoyalty: 10,
    },
    weaknesses: { flattery: 7, bribery: 5, blackmail: 4, threats: 2 },
    stances: [
      {
        topic: "ReproductiveRights",
        position: "Against",
        note: "Authored Dobbs v. Jackson Women's Health Organization (2022), directly overturning Roe v. Wade and Planned Parenthood v. Casey.",
      },
      {
        topic: "ReligiousLiberty",
        position: "For",
        note: "Authored Burwell v. Hobby Lobby (2014), allowing closely held corporations to deny contraceptive coverage on religious grounds.",
      },
      {
        topic: "ChristianHegemony",
        position: "For",
        note: "Authored Town of Greece v. Galloway (2014), upholding explicitly sectarian Christian prayer at government town board meetings.",
      },
      {
        topic: "AccusedRights",
        position: "Against",
        note: "In Kansas v. Glover (2020), held that police may constitutionally stop a vehicle based solely on the owner's prior suspended license.",
      },
      {
        topic: "CampaignFinance",
        position: "For",
        note: "Authored McCutcheon v. FEC (2014), striking aggregate campaign contribution limits as a First Amendment violation.",
      },
      {
        topic: "GayRights",
        position: "Against",
        note: "Dissented in Obergefell v. Hodges (2015), arguing the majority invented a constitutional right with no historical basis and warning that the ruling endangers religious dissenters.",
      },
    ],
  },
  {
    id: 4,
    name: "Sonia Sotomayor",
    image: "sotomayor.webp",
    description:
      "First Latina Supreme Court Justice. Writes dissents so passionate they should come with a tissue. Has exceptional empathy and uses it aggressively. Will outlive the bad decisions.",
    justiceType: "current",
    gender: "F",
    birthYear: 1954,
    nominatedBy: PRES_OBAMA,
    religion: "Catholic",
    ethnicity: "Hispanic",
    stats: {
      logic: 6,
      charisma: 8,
      empathy: 10,

      succeptibility: 4,
      partyLoyalty: 7,
    },
    weaknesses: { flattery: 5, bribery: 2, blackmail: 3, threats: 4 },
    stances: [
      {
        topic: "VotingRights",
        position: "For",
        note: "Dissented in Brnovich v. DNC (2021), arguing the majority gutted Section 2 of the Voting Rights Act beyond recognition.",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "Authored the Utah v. Strieff dissent (2016), warning of systemic racial bias in stop-and-frisk policing.",
      },
      {
        topic: "Immigration",
        position: "For",
        note: "Dissented in Trump v. Hawaii (2018), calling the travel ban a discriminatory policy motivated by religious animus.",
      },
      {
        topic: "PolicePower",
        position: "Against",
        note: "Has written repeatedly against qualified immunity, most forcefully in her Mullenix v. Luna (2015) dissent.",
      },
      {
        topic: "RacialEquity",
        position: "For",
        note: "Authored a sweeping dissent in SFFA v. Harvard (2023), arguing the majority willfully ignores the structural reality of racism in American life.",
      },
      {
        topic: "GayRights",
        position: "For",
        note: "Joined the Obergefell majority (2015); has consistently held that LGBTQ+ people are entitled to full equal protection under the 14th Amendment.",
      },
    ],
  },
  {
    id: 5,
    name: "Elena Kagan",
    image: "kagan.webp",
    description:
      "Former Harvard Law Dean who thought she'd seen everything. Smart, sharp, and methodically writing dissents into the void. Will destroy your argument in a footnote without breaking a sweat.",
    justiceType: "current",
    gender: "F",
    birthYear: 1960,
    nominatedBy: PRES_OBAMA,
    religion: "Jewish",
    ethnicity: "Jewish",
    stats: {
      logic: 9,
      charisma: 7,
      empathy: 5,

      succeptibility: 3,
      partyLoyalty: 7,
    },
    weaknesses: { flattery: 4, bribery: 2, blackmail: 3, threats: 3 },
    stances: [
      {
        topic: "AgencyDeference",
        position: "For",
        note: "Authored the West Virginia v. EPA dissent (2022), forcefully defending Chevron and the expertise of the administrative state.",
      },
      {
        topic: "FreeSpeech",
        position: "For",
        note: "Authored Matal v. Tam (2017), unanimously striking the government's power to deny 'disparaging' trademarks as a First Amendment violation.",
      },
      {
        topic: "EconomicRegulation",
        position: "For",
        note: "Dissented in Alabama Association of Realtors v. HHS (2021), defending the CDC's pandemic eviction moratorium as a valid exercise of regulatory power.",
      },
      {
        topic: "VotingRights",
        position: "For",
        note: "Authored the Brnovich v. DNC dissent (2021), arguing the majority's reading of the VRA drains the statute of its core purpose.",
      },
      {
        topic: "CampaignFinance",
        position: "Against",
        note: "Dissented in Citizens United v. FEC (2010), warning the ruling would 'undermine democracy' by flooding elections with corporate money.",
      },
    ],
  },
  {
    id: 6,
    name: "Neil Gorsuch",
    image: "gorsuch.webp",
    description:
      "Textualist who believes in reading the Constitution as written — as long as the writing leads somewhere conservative. Stole a Senate seat and made it look like philosophy.",
    justiceType: "current",
    gender: "M",
    birthYear: 1967,
    nominatedBy: PRES_TRUMP,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 7,
      charisma: 5,
      empathy: 4,

      succeptibility: 4,
      partyLoyalty: 8,
    },
    weaknesses: { flattery: 5, bribery: 4, blackmail: 4, threats: 3 },
    stances: [
      {
        topic: "NativeSovereignty",
        position: "For",
        note: "Authored McGirt v. Oklahoma (2020), holding that a vast portion of eastern Oklahoma remains Native American reservation land under treaty.",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "Authored Ramos v. Louisiana (2020), holding that the Sixth Amendment requires unanimous jury verdicts in all criminal trials.",
      },
      {
        topic: "AgencyDeference",
        position: "Against",
        note: "Authored Loper Bright Enterprises v. Raimondo (2024), overturning the Chevron doctrine of judicial deference to agency interpretations.",
      },
      {
        topic: "ReligiousLiberty",
        position: "For",
        note: "Authored the majority in Fulton v. City of Philadelphia (2021), ruling the city couldn't exclude a Catholic foster agency for refusing same-sex couples.",
      },
      {
        topic: "Privacy",
        position: "For",
        note: "Concurred in Carpenter v. United States (2018), arguing for a robust rethinking of Fourth Amendment doctrine in the digital age — and was the only justice to dissent in Jones (2012) on broadest privacy grounds.",
      },
    ],
  },
  {
    id: 7,
    name: "Brett Kavanaugh",
    image: "kavanaugh.webp",
    description:
      "Famously loves calendars. And beer. And being angry at the Senate. Not necessarily in that order. His confirmation hearing was the most dramatic TV event of 2018 that nobody wanted.",
    justiceType: "current",
    gender: "M",
    birthYear: 1965,
    nominatedBy: PRES_TRUMP,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 6,
      charisma: 5,
      empathy: 4,

      succeptibility: 5,
      partyLoyalty: 9,
    },
    weaknesses: { flattery: 6, bribery: 6, blackmail: 8, threats: 4 },
    stances: [
      {
        topic: "ExecutivePower",
        position: "For",
        note: "Long-held believer in the unitary executive theory; as a D.C. Circuit judge, argued presidents should be immune from indictment while in office.",
      },
      {
        topic: "CorporatePower",
        position: "For",
        note: "Joined the majority in AMG Capital Management v. FTC (2021), unanimously but narrowly stripping the FTC of its power to seek monetary relief.",
      },
      {
        topic: "ReproductiveRights",
        position: "Against",
        note: "Voted with the majority in Dobbs v. Jackson (2022) while writing separately to emphasize the ruling would not affect contraception or travel rights.",
      },
      {
        topic: "PolicePower",
        position: "For",
        note: "Consistently sides with law enforcement in Fourth Amendment cases, e.g. concurring in Kansas v. Glover (2020).",
      },
      {
        topic: "StatesRights",
        position: "For",
        note: "Authored the majority in Dobbs, framing the abortion question as one properly returned to state legislatures.",
      },
    ],
  },
  {
    id: 8,
    name: "Amy Coney Barrett",
    image: "amyconey.webp",
    description:
      "Confirmed in record time before an election. Claims faith doesn't influence her decisions. Her decisions respectfully disagree. Very calm about absolutely everything, which is somehow terrifying.",
    justiceType: "current",
    gender: "F",
    birthYear: 1972,
    nominatedBy: PRES_TRUMP,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 7,
      charisma: 6,
      empathy: 5,

      succeptibility: 4,
      partyLoyalty: 9,
    },
    weaknesses: { flattery: 5, bribery: 3, blackmail: 4, threats: 3 },
    stances: [
      {
        topic: "ReligiousLiberty",
        position: "For",
        note: "Authored 303 Creative v. Elenis (2023) — well, joined the majority — allowing a web designer to refuse same-sex wedding sites on religious grounds.",
      },
      {
        topic: "ReproductiveRights",
        position: "Against",
        note: "Voted with the Dobbs majority (2022); had previously criticized Roe as 'super-precedent' in academic writing.",
      },
      {
        topic: "Guns",
        position: "For",
        note: "Voted to strike New York's concealed carry law in Bruen (2022) and authored a notable gun rights dissent on the Seventh Circuit prior to joining SCOTUS.",
      },
      {
        topic: "AgencyDeference",
        position: "Against",
        note: "Joined West Virginia v. EPA (2022) majority, applying the major questions doctrine to limit EPA climate authority.",
      },
      {
        topic: "SocialOrder",
        position: "For",
        note: "Tends toward incremental rulings that preserve institutional structures; notably declined to join Thomas's Dobbs concurrence calling to reconsider Obergefell.",
      },
    ],
  },
  {
    id: 9,
    name: "Ketanji Brown Jackson",
    image: "ketanji.webp",
    description:
      "First Black woman on the Supreme Court. Knows what a biologist is. Sat through a Senate confirmation hearing where a senator asked her to define 'woman' and survived with her dignity intact.",
    justiceType: "current",
    gender: "F",
    birthYear: 1970,
    nominatedBy: PRES_BIDEN,
    religion: "Protestant",
    ethnicity: "Black",
    stats: {
      logic: 8,
      charisma: 8,
      empathy: 10,

      succeptibility: 3,
      partyLoyalty: 7,
    },
    weaknesses: { flattery: 4, bribery: 2, blackmail: 2, threats: 4 },
    stances: [
      {
        topic: "RacialEquity",
        position: "For",
        note: "Authored a powerful dissent in SFFA v. Harvard (2023), arguing the majority's colorblindness is itself a distortion of constitutional history.",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "As a former public defender and sentencing judge, has consistently favored procedural fairness — e.g. Erlinger v. United States (2024), defending the jury's role in sentencing.",
      },
      {
        topic: "VotingRights",
        position: "For",
        note: "Dissented in Alexander v. South Carolina NAACP (2024), arguing the majority set an impossibly high bar for proving racial gerrymandering.",
      },
      {
        topic: "AgencyDeference",
        position: "For",
        note: "Dissented in Loper Bright (2024), arguing Chevron's overruling destabilizes decades of settled regulatory law.",
      },
      {
        topic: "CivilLiberties",
        position: "For",
        note: "Authored a notable dissent in Moody v. NetChoice (2024), pressing for a more direct ruling on states' social media censorship laws as a First Amendment issue.",
      },
    ],
  },
];
