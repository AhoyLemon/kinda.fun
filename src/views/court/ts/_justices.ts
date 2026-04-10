import { Justice } from "./_types";
import {
  PRES_WASHINGTON,
  PRES_JOHN_ADAMS,
  PRES_JACKSON,
  PRES_BENJAMIN_HARRISON,
  PRES_GRANT,
  PRES_EISENHOWER,
  PRES_THEODORE_ROOSEVELT,
  PRES_FDR,
  PRES_JFK,
  PRES_LBJ,
  PRES_NIXON,
  PRES_FORD,
  PRES_REAGAN,
  PRES_GHW_BUSH,
  PRES_CLINTON,
  PRES_GW_BUSH,
  PRES_OBAMA,
  PRES_TRUMP,
  PRES_BIDEN,
  PRES_SNOOP_DOGG,
  PRES_VERMIN_SUPREME,
  PRES_BJORK,
  PRES_BILL_HICKS,
  PRES_HUNTER_S_THOMPSON,
  PRES_LIBERACE,
  PRES_CLEVELAND,
  PRES_MCKINLEY,
  PRES_VINCE_MCMAHON,
} from "./_presidents";

// ────────────────────────────────────────────────────────────
// CURRENT JUSTICES (as of 2026)
// ────────────────────────────────────────────────────────────

export const justiceCurrent: Justice[] = [
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
        topic: "PresidentialImmunity",
        position: "For",
        note: "Authored Trump v. United States (2024), granting presidents broad immunity from prosecution for official acts.",
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
      logic: 6,
      charisma: 3,
      empathy: 2,

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
      logic: 8,
      charisma: 8,
      empathy: 9,

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
      empathy: 7,

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
        topic: "DigitalPrivacy",
        position: "For",
        note: "Concurred in Carpenter v. United States (2018), arguing for a robust rethinking of Fourth Amendment doctrine in the digital age.",
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
      logic: 9,
      charisma: 8,
      empathy: 8,

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

// ────────────────────────────────────────────────────────────
// HISTORICAL JUSTICES
// ────────────────────────────────────────────────────────────

export const justiceHistorical: Justice[] = [
  {
    id: 10,
    name: "Thurgood Marshall",
    image: "thurgood_marshall.webp",
    description:
      "Argued Brown v. Board before he was even on the Court. Spent his tenure watching the world fail to live up to its promise. The most consequential lawyer in American history, which is saying something for a guy who also became a Justice.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1908,
    nominatedBy: PRES_LBJ,
    religion: "Protestant",
    ethnicity: "Black",
    stats: {
      logic: 9,
      charisma: 9,
      empathy: 10,

      succeptibility: 2,
      partyLoyalty: 6,
    },
    weaknesses: { flattery: 3, bribery: 1, blackmail: 2, threats: 3 },
    stances: [
      {
        topic: "RacialEquity",
        position: "For",
        note: "Argued Brown v. Board of Education before the Court in 1954 as lead NAACP counsel, having fought school segregation for two decades before ever sitting on the bench.",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "Consistently defended the rights of criminal defendants and dissented in cases weakening Miranda, regardless of political pressure.",
      },
      {
        topic: "PolicePower",
        position: "Against",
        note: "Deeply skeptical of unchecked law enforcement authority, rooted in decades watching the justice system fail Black Americans.",
      },
      {
        topic: "CivilLiberties",
        position: "For",
        note: "One of the Warren Court's most reliably liberal votes on First Amendment issues; wrote expansively on free expression and individual liberty.",
      },
    ],
  },
  {
    id: 11,
    name: "Ruth Bader Ginsburg",
    image: "rbg.webp",
    description:
      "The Notorious RBG. Five feet of pure legal steel who dismantled gender discrimination one meticulous argument at a time. Should have retired earlier but was too stubborn to let the bad guys win. History is complicated.",
    justiceType: "historical",
    gender: "F",
    birthYear: 1933,
    nominatedBy: PRES_CLINTON,
    religion: "Jewish",
    ethnicity: "Jewish",
    stats: {
      logic: 10,
      charisma: 9,
      empathy: 9,

      succeptibility: 2,
      partyLoyalty: 6,
    },
    weaknesses: { flattery: 3, bribery: 1, blackmail: 2, threats: 2 },
    stances: [
      {
        topic: "WomensRights",
        position: "For",
        note: "Argued six landmark gender discrimination cases before the Court as ACLU counsel, winning five — before she ever sat on the bench.",
      },
      {
        topic: "ReproductiveRights",
        position: "For",
        note: "Consistently voted to uphold Roe; publicly criticized its reasoning while supporting its outcome, preferring a stronger equal protection rationale.",
      },
      {
        topic: "VotingRights",
        position: "For",
        note: "Wrote the principal dissent in Shelby County v. Holder (2013), warning that gutting the Voting Rights Act opened the door to voter suppression.",
      },
      {
        topic: "CourtAuthority",
        position: "For",
        note: "Resisted calls to retire despite declining health, believing the Court's composition too consequential to risk under a hostile administration.",
      },
    ],
  },
  {
    id: 12,
    name: "William Rehnquist",
    image: "rehnquist.webp",
    description:
      "Chief Justice who added gold stripes to his robe to stand out. Conservative stalwart who presided over Clinton's impeachment trial with full ceremonial stripes. The robes were the most interesting thing about him.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1924,
    nominatedBy: PRES_NIXON,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 8,
      charisma: 6,
      empathy: 4,

      succeptibility: 4,
      partyLoyalty: 9,
    },
    weaknesses: { flattery: 5, bribery: 4, blackmail: 5, threats: 3 },
    stances: [
      {
        topic: "StatesRights",
        position: "For",
        note: "Drove the 'Rehnquist Revolution,' authoring Lopez (1995) and Morrison (2000) to limit federal commerce power over local activity.",
      },
      {
        topic: "FederalPower",
        position: "Against",
        note: "Consistently narrowed Congress's power under the Commerce Clause and Section 5 of the 14th Amendment throughout the 1990s.",
      },
      {
        topic: "AccusedRights",
        position: "Against",
        note: "Long skeptical of Miranda; ironically authored Dickerson v. United States (2000) upholding it only after Congress tried to override it legislatively.",
      },
      {
        topic: "AgencyDeference",
        position: "Against",
        note: "Opposed expansive readings of regulatory authority and preferred courts to constrain the administrative state through statutory interpretation.",
      },
    ],
  },
  {
    id: 13,
    name: "Antonin Scalia",
    image: "scalia.webp",
    description:
      "Originalist extraordinaire who believed the Constitution meant exactly what men with slave plantations intended in 1789. Was best friends with RBG despite being her polar opposite. Had opinions. Loudly.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1936,
    nominatedBy: PRES_REAGAN,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 9,
      charisma: 9,
      empathy: 3,

      succeptibility: 3,
      partyLoyalty: 9,
    },
    weaknesses: { flattery: 8, bribery: 3, blackmail: 4, threats: 2 },
    stances: [
      {
        topic: "Guns",
        position: "For",
        note: "Authored District of Columbia v. Heller (2008), first ruling that the Second Amendment protects an individual right to keep arms at home for self-defense.",
      },
      {
        topic: "AgencyDeference",
        position: "Against",
        note: "In his later years expressed deep skepticism of Chevron deference, arguing agencies shouldn't interpret their own statutory authority expansively.",
      },
      {
        topic: "GayRights",
        position: "Against",
        note: "Authored scathing dissents in both Lawrence v. Texas (2003) and United States v. Windsor (2013), accusing the majority of moral relativism.",
      },
      {
        topic: "ReproductiveRights",
        position: "Against",
        note: "Dissented in Planned Parenthood v. Casey (1992), arguing Roe had no constitutional basis and should simply be overturned.",
      },
      {
        topic: "CampaignFinance",
        position: "For",
        note: "Joined Citizens United (2010) and viewed campaign spending restrictions as unconstitutional censorship of political speech.",
      },
    ],
  },
  {
    id: 14,
    name: "Sandra Day O'Connor",
    image: "sandra-day.webp",
    description:
      "First woman on the Supreme Court. The swing vote before swing votes were cool. A genuine moderate who confused everyone by sometimes ruling based on 'what seems fair.' Retired and immediately regretted it.",
    justiceType: "historical",
    gender: "F",
    birthYear: 1930,
    nominatedBy: PRES_REAGAN,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 8,
      charisma: 7,
      empathy: 7,

      succeptibility: 6,
      partyLoyalty: 5,
    },
    weaknesses: { flattery: 6, bribery: 3, blackmail: 3, threats: 3 },
    stances: [
      {
        topic: "ReproductiveRights",
        position: "For",
        note: "Provided the critical vote upholding Roe in Planned Parenthood v. Casey (1992), co-authoring the plurality opinion establishing the 'undue burden' standard.",
      },
      {
        topic: "RacialEquity",
        position: "For",
        note: "Authored Grutter v. Bollinger (2003), upholding race-conscious admissions as serving a compelling interest in diversity — though with a 25-year expiration notice.",
      },
      {
        topic: "ReligiousLiberty",
        position: "For",
        note: "Favored a more robust protection for religious exemptions than the majority's Employment Division v. Smith standard allowed.",
      },
      {
        topic: "StatesRights",
        position: "For",
        note: "Consistent advocate for state sovereignty; often the swing vote bridging conservative federalism and moderate pragmatism.",
      },
    ],
  },
  {
    id: 15,
    name: "John Paul Stevens",
    image: "stevens.webp",
    description:
      "Appointed by a Republican, became the liberal lion of the Court over 35 years. Served until age 90. Had absolutely no time for your nonsense. Wore a bow tie. Was correct.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1920,
    nominatedBy: PRES_FORD,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 9,
      charisma: 7,
      empathy: 8,

      succeptibility: 3,
      partyLoyalty: 2,
    },
    weaknesses: { flattery: 4, bribery: 2, blackmail: 2, threats: 3 },
    stances: [
      {
        topic: "Guns",
        position: "Against",
        note: "Authored the principal dissent in Heller (2008), arguing the Second Amendment protects only a militia right, not individual ownership.",
      },
      {
        topic: "CampaignFinance",
        position: "Against",
        note: "Authored the Citizens United dissent (2010), arguing corporations have no First Amendment right to spend unlimited money in elections.",
      },
      {
        topic: "ExecutivePower",
        position: "Against",
        note: "Authored Hamdan v. Rumsfeld (2006), ruling the Bush administration's military commissions for Guantánamo detainees violated the law of war.",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "Consistent defender of Fourth and Fifth Amendment rights against government overreach, including in national security contexts.",
      },
    ],
  },
  {
    id: 16,
    name: "Byron White",
    image: "byron_white.webp",
    description:
      "Former NFL running back turned Supreme Court Justice — because why not. Moved unpredictably on the field and on the bench. Dissented on Roe v. Wade, proving that a JFK appointment is not a guarantee.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1917,
    nominatedBy: PRES_JFK,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 7,
      charisma: 6,
      empathy: 5,

      succeptibility: 5,
      partyLoyalty: 6,
    },
    weaknesses: { flattery: 5, bribery: 4, blackmail: 4, threats: 4 },
    stances: [
      {
        topic: "ReproductiveRights",
        position: "Against",
        note: "Authored the Roe v. Wade dissent (1973), arguing the Court invented an abortion right with no constitutional basis.",
      },
      {
        topic: "PolicePower",
        position: "For",
        note: "Authored United States v. Leon (1984), establishing the 'good faith' exception to the exclusionary rule to protect law enforcement flexibility.",
      },
      {
        topic: "EconomicRegulation",
        position: "For",
        note: "Supported expansive federal regulatory authority and largely deferred to Congress on economic and labor matters.",
      },
    ],
  },
  {
    id: 17,
    name: "Hugo Black",
    image: "hugo_black.webp",
    description:
      "Former KKK member who became a staunch civil liberties absolutist. The most dramatic personal redemption arc in Supreme Court history. Believed the First Amendment literally meant ALL speech. ALL of it.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1886,
    nominatedBy: PRES_FDR,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 8,
      charisma: 7,
      empathy: 6,

      succeptibility: 5,
      partyLoyalty: 7,
    },
    weaknesses: { flattery: 6, bribery: 4, blackmail: 7, threats: 4 },
    stances: [
      {
        topic: "FreeSpeech",
        position: "For",
        note: "Absolute First Amendment literalist — believed 'no law' meant no law, full stop. Dissented from any restriction on political speech, even in wartime.",
      },
      {
        topic: "ChristianHegemony",
        position: "Against",
        note: "Authored Everson v. Board of Education (1947), incorporating the Establishment Clause and cementing the 'wall of separation' metaphor into constitutional law.",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "Drafted the Gideon v. Wainwright majority (1963), holding that the right to counsel applies to the states via the 14th Amendment.",
      },
      {
        topic: "RacialEquity",
        position: "For",
        note: "Former KKK member who became a staunch civil liberties absolutist, voting with Brown and the Warren Court's major civil rights rulings.",
      },
    ],
  },
  {
    id: 18,
    name: "Oliver Wendell Holmes Jr.",
    image: "wendell.webp",
    description:
      "Civil War veteran turned legal legend. Served until age 90. Famous for 'great cases make bad law.' Said you can't shout fire in a crowded theater and spent the rest of history being misquoted about it.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1841,
    nominatedBy: PRES_THEODORE_ROOSEVELT,
    religion: "Protestant",
    ethnicity: "White",
    courtName: "Holmes",
    stats: {
      logic: 10,
      charisma: 8,
      empathy: 5,

      succeptibility: 3,
      partyLoyalty: 4,
    },
    weaknesses: { flattery: 5, bribery: 2, blackmail: 3, threats: 2 },
    stances: [
      {
        topic: "FreeSpeech",
        position: "For",
        note: "Reversed course after Schenck to author the Abrams dissent (1919), arguing free speech requires a 'marketplace of ideas' where only present, immediate danger justifies restriction.",
      },
      {
        topic: "EconomicRegulation",
        position: "For",
        note: "Dissented in Lochner v. New York (1905), arguing states have broad police power and courts shouldn't impose economic preferences through the Constitution.",
      },
      {
        topic: "JudicialActivism",
        position: "Against",
        note: "Famous advocate for judicial restraint — believed courts should defer to democratic majorities except in cases of direct constitutional violation.",
      },
    ],
  },
  {
    id: 50,
    name: "John Jay",
    image: "john_jay.webp",
    description:
      "The very first Chief Justice of the United States, and arguably the most powerful man ever to resign in disgust. Co-wrote the Federalist Papers, negotiated a deeply unpopular treaty, and then just… left. Has been 'too good for this' since 1795.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1745,
    nominatedBy: PRES_WASHINGTON,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 9,
      charisma: 7,
      empathy: 6,

      succeptibility: 2,
      partyLoyalty: 6,
    },
    weaknesses: { flattery: 4, bribery: 1, blackmail: 2, threats: 2 },
    stances: [
      {
        topic: "FederalPower",
        position: "For",
        note: "As first Chief Justice, consistently ruled in favor of federal supremacy and strengthened the new national government's authority over the states.",
      },
      {
        topic: "CourtAuthority",
        position: "For",
        note: "Resigned in 1795 to protest the Court's lack of power and dignity — then simply built the institution he wished existed.",
      },
      {
        topic: "SocialOrder",
        position: "For",
        note: "Federalist Papers co-author who believed in strong institutions, orderly governance, and the rule of law as bulwarks against faction.",
      },
    ],
  },
  {
    id: 51,
    name: "John Marshall",
    image: "john_marshall.webp",
    description:
      "The man who decided the Supreme Court could decide things. Invented judicial review out of thin air, wrote the opinion, and dared anyone to stop him. Nobody did. The Court has been powerful ever since and this is entirely his fault.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1755,
    nominatedBy: PRES_JOHN_ADAMS,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 10,
      charisma: 8,
      empathy: 5,

      succeptibility: 2,
      partyLoyalty: 7,
    },
    weaknesses: { flattery: 5, bribery: 2, blackmail: 3, threats: 1 },
    stances: [
      {
        topic: "CourtAuthority",
        position: "For",
        note: "Authored Marbury v. Madison (1803), inventing judicial review out of pure legal philosophy and daring anyone to stop him. Nobody did.",
      },
      {
        topic: "FederalPower",
        position: "For",
        note: "Authored McCulloch v. Maryland (1819) and Gibbons v. Ogden (1824), laying the foundation for broad federal authority over commerce and constitutional interpretation.",
      },
      {
        topic: "PropertyRights",
        position: "For",
        note: "Authored Fletcher v. Peck (1810), the first case striking down a state law, protecting contract rights against legislative reversal.",
      },
    ],
  },
  {
    id: 52,
    name: "John Marshall Harlan",
    image: "marshall_harlan.webp",
    description:
      "The Great Dissenter. Sole dissenter in Plessy v. Ferguson. Former slaveholder who became a passionate civil rights champion — a redemption arc so dramatic it would be rejected as unbelievable. Was right about everything for 30 years before anyone admitted it.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1833,
    nominatedBy: PRES_GRANT,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 9,
      charisma: 7,
      empathy: 9,

      succeptibility: 2,
      partyLoyalty: 3,
    },
    weaknesses: { flattery: 4, bribery: 1, blackmail: 2, threats: 3 },
    stances: [
      {
        topic: "RacialEquity",
        position: "For",
        note: "Sole dissenter in Plessy v. Ferguson (1896), writing that the Constitution is 'color-blind' — a position vindicated 58 years later by Brown v. Board.",
      },
      {
        topic: "CivilLiberties",
        position: "For",
        note: "Voted to incorporate the Bill of Rights against the states before that concept existed as doctrine, consistently protecting individuals from state power.",
      },
      {
        topic: "VotingRights",
        position: "For",
        note: "Dissented in the Civil Rights Cases (1883), arguing Congress had full authority to prohibit private racial discrimination under the 14th Amendment.",
      },
      {
        topic: "EconomicRegulation",
        position: "For",
        note: "Authored dissents defending Congress's power to regulate commerce and protect workers against corporate power, opposing the Lochner-era majority.",
      },
    ],
  },
  {
    id: 53,
    name: "Earl Warren",
    image: "earl_warren.webp",
    description:
      "Eisenhower called appointing him the greatest mistake of his presidency. Warren presided over Brown v. Board, Miranda, and the Warren Commission. A Republican governor who became the most consequential liberal Chief Justice in history. Eisenhower was deeply embarrassed.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1891,
    nominatedBy: PRES_EISENHOWER,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 8,
      charisma: 9,
      empathy: 9,

      succeptibility: 4,
      partyLoyalty: 2,
    },
    weaknesses: { flattery: 6, bribery: 2, blackmail: 3, threats: 3 },
    stances: [
      {
        topic: "RacialEquity",
        position: "For",
        note: "Authored Brown v. Board of Education (1954), the unanimous opinion striking down school segregation — the most consequential ruling of the 20th century.",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "Authored Miranda v. Arizona (1966), requiring police to inform suspects of their rights before questioning — a ruling conservatives have tried to limit ever since.",
      },
      {
        topic: "VotingRights",
        position: "For",
        note: "Authored Reynolds v. Sims (1964), establishing 'one person, one vote' and requiring legislative districts to be apportioned by population.",
      },
      {
        topic: "ChristianHegemony",
        position: "Against",
        note: "The Warren Court issued Engel v. Vitale (1962), striking down state-sponsored prayer in public schools over fierce religious and political objection.",
      },
    ],
  },
  {
    id: 54,
    name: "Roger B. Taney",
    image: "taney.webp",
    description:
      "Author of Dred Scott v. Sandford, the worst Supreme Court decision in American history. Ruled that Black people had no rights the white man was bound to respect. Died while the country was literally at war over whether he was correct. He was not.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1777,
    nominatedBy: PRES_JACKSON,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 7,
      charisma: 6,
      empathy: 1,

      succeptibility: 4,
      partyLoyalty: 10,
    },
    weaknesses: { flattery: 7, bribery: 5, blackmail: 5, threats: 3 },
    stances: [
      {
        topic: "RacialEquity",
        position: "Against",
        note: "Authored Dred Scott v. Sandford (1857), ruling Black people are not citizens and have no rights the white man is bound to respect. History has judged accordingly.",
      },
      {
        topic: "StatesRights",
        position: "For",
        note: "Consistent champion of state sovereignty, including each state's right to regulate — or perpetuate — the institution of slavery.",
      },
      {
        topic: "FederalPower",
        position: "Against",
        note: "Systematically narrowed Marshall's broad nationalist readings of congressional authority throughout his 28 years as Chief Justice.",
      },
    ],
  },
  {
    id: 55,
    name: "Henry Billings Brown",
    image: "henry_billings_brown.webp",
    description:
      "Author of the Plessy v. Ferguson majority opinion, which established the 'separate but equal' doctrine. Just a regular guy who wrote one of the most consequential racist opinions in legal history and then lived another 17 years. Seems chill about it.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1836,
    nominatedBy: PRES_BENJAMIN_HARRISON,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 6,
      charisma: 5,
      empathy: 2,

      succeptibility: 6,
      partyLoyalty: 8,
    },
    weaknesses: { flattery: 6, bribery: 5, blackmail: 4, threats: 4 },
    stances: [
      {
        topic: "RacialEquity",
        position: "Against",
        note: "Authored Plessy v. Ferguson (1896), enshrining 'separate but equal' as constitutional doctrine — a decision that poisoned American law for 58 years.",
      },
      {
        topic: "EconomicRegulation",
        position: "Against",
        note: "Consistent Lochner-era vote against federal and state attempts to regulate industry, deferring to property and contract rights over worker protections.",
      },
      {
        topic: "WorkersRights",
        position: "Against",
        note: "Voted to limit labor protections and strike down legislation constraining employers' contractual freedom during the early industrialization era.",
      },
    ],
  },
];

// ────────────────────────────────────────────────────────────
// FICTIONAL JUSTICES (based on well-known fictional characters)
// ────────────────────────────────────────────────────────────

export const justiceFictional: Justice[] = [
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
    weaknesses: { flattery: 4, bribery: 9, blackmail: 8, threats: 3 },
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
      logic: 3,
      charisma: 7,
      empathy: 7,

      succeptibility: 9,
      partyLoyalty: 2,
    },
    weaknesses: { flattery: 7, bribery: 5, blackmail: 4, threats: 1 },
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
  },
];

// ────────────────────────────────────────────────────────────
// CELEBRITY JUSTICES (real celebrities imagined on the bench)
// ────────────────────────────────────────────────────────────

export const justiceCelebrity: Justice[] = [
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
  },
  {
    id: 56,
    name: "Mr. Beast",
    image: "mrbeast.webp",
    description:
      "YouTuber with 300 million subscribers who spent $3.5 million to cure blindness and now wants to cure injustice. Approaches every case like a challenge video. Has attempted to give every plaintiff $10,000. His clerks are called 'the Beast Squad.' Trends on every platform whenever he rules.",
    justiceType: "celebrity",
    gender: "M",
    birthYear: 1998,
    nominatedBy: PRES_SNOOP_DOGG,
    religion: "Protestant",
    ethnicity: "White",
    stats: { logic: 6, charisma: 10, empathy: 9, succeptibility: 8, partyLoyalty: 4 },
    weaknesses: { flattery: 10, bribery: 7, blackmail: 3, threats: 2 },
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
  },
];

export const justices: Justice[] = [...justiceCurrent, ...justiceHistorical, ...justiceFictional, ...justiceCelebrity];

// ────────────────────────────────────────────────────────────
// WARREN COURT JUSTICES (additional, not yet in historical pool)
// ────────────────────────────────────────────────────────────

export const justiceWarrenExtra: Justice[] = [
  {
    id: 60,
    name: "William O. Douglas",
    image: "william_douglas.webp",
    description:
      "The longest-serving justice in history and possibly the most unmanageable. Hiked the Pacific Crest Trail, got married four times, and wrote opinions so sweeping they occasionally encompassed entire ecosystems. Believed freedom of speech meant all speech, the outdoors meant the outdoors, and the CIA was definitely doing something.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1898,
    nominatedBy: PRES_FDR,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 9,
      charisma: 8,
      empathy: 8,

      succeptibility: 3,
      partyLoyalty: 5,
    },
    weaknesses: { flattery: 5, bribery: 2, blackmail: 4, threats: 2 },
    stances: [
      {
        topic: "FreeSpeech",
        position: "For",
        note: "Believed the First Amendment was absolute; wrote sweeping opinions protecting political dissent, obscenity, and individual expression across 36 years on the Court.",
      },
      {
        topic: "PrivacyRights",
        position: "For",
        note: "Authored Griswold v. Connecticut (1965), inventing the constitutional right to privacy in the 'penumbras' of the Bill of Rights — the foundation for Roe, Lawrence, and Obergefell.",
      },
      {
        topic: "NativeSovereignty",
        position: "For",
        note: "A fierce advocate for Native American treaty rights and tribal sovereignty, authored multiple opinions protecting indigenous lands and self-governance.",
      },
      {
        topic: "EnvironmentalProtection",
        position: "For",
        note: "Famously argued in Sierra Club v. Morton (1972) that trees and rivers should have legal standing to sue for their own protection.",
      },
    ],
  },
  {
    id: 61,
    name: "John Marshall Harlan II",
    image: "harlan_2.webp",
    description:
      "Grandson of the original Great Dissenter, and like his grandfather, frequently the most interesting voice in the room — except this time from the conservative side. Believed in federalism, restraint, and the process mattering as much as the outcome. The Court's intellectual conscience during the Warren era, which is a thankless job.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1899,
    nominatedBy: PRES_EISENHOWER,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 10,
      charisma: 6,
      empathy: 5,

      succeptibility: 2,
      partyLoyalty: 5,
    },
    weaknesses: { flattery: 4, bribery: 1, blackmail: 2, threats: 2 },
    stances: [
      {
        topic: "StatesRights",
        position: "For",
        note: "Consistent champion of federalism and state autonomy; frequently dissented from Warren Court expansions of federal power over state criminal procedure.",
      },
      {
        topic: "JudicialActivism",
        position: "Against",
        note: "Believed the Court's role was to interpret law, not drive social policy — and wrote lengthy, principled dissents when the majority overstepped.",
      },
      {
        topic: "PrivacyRights",
        position: "For",
        note: "Authored the famous Poe v. Ullman dissent (1961), articulating a vision of substantive privacy rights grounded in tradition and lived experience — a foundation Griswold relied on.",
      },
    ],
  },
  {
    id: 62,
    name: "William J. Brennan Jr.",
    image: "brennan.webp",
    description:
      "Eisenhower's second-greatest mistake (after Warren, according to Eisenhower). Quietly became the intellectual engine of the liberal Warren Court. Brilliant coalition builder who made constitutional rights expand through sheer force of legal persuasion and an almost supernatural ability to count to five.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1906,
    nominatedBy: PRES_EISENHOWER,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 10,
      charisma: 8,
      empathy: 8,

      succeptibility: 3,
      partyLoyalty: 5,
    },
    weaknesses: { flattery: 5, bribery: 2, blackmail: 2, threats: 3 },
    stances: [
      {
        topic: "FreeSpeech",
        position: "For",
        note: "Authored New York Times v. Sullivan (1964), establishing that public officials cannot sue for defamation without proving 'actual malice' — the bedrock of American press freedom.",
      },
      {
        topic: "RacialEquity",
        position: "For",
        note: "Intellectual architect of the Warren Court's civil rights jurisprudence; built the legal coalitions behind Brown's remedies and the expansion of equal protection.",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "Authored critical opinions expanding the rights of criminal defendants under the Fourth, Fifth, and Sixth Amendments throughout the Warren and Burger Court eras.",
      },
      {
        topic: "CourtAuthority",
        position: "For",
        note: "Believed the Court had an affirmative responsibility to protect individual dignity and expand constitutional rights — not merely to referee disputes.",
      },
    ],
  },
  {
    id: 63,
    name: "Potter Stewart",
    image: "potter_stewart.webp",
    description:
      "A genuine moderate at a time when that was still a category. Best known for admitting he couldn't define obscenity but he knew it when he saw it — possibly the most honest thing anyone has ever said from the Supreme Court bench. Voted with whoever seemed least wrong. Often succeeded.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1915,
    nominatedBy: PRES_EISENHOWER,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 8,
      charisma: 6,
      empathy: 6,

      succeptibility: 6,
      partyLoyalty: 4,
    },
    weaknesses: { flattery: 5, bribery: 3, blackmail: 3, threats: 3 },
    stances: [
      {
        topic: "FreeSpeech",
        position: "For",
        note: "Famously admitted he couldn't define obscenity but 'knows it when he sees it' — possibly the most honest thing ever said from the bench, and more protective than it sounds.",
      },
      {
        topic: "PrivacyRights",
        position: "Against",
        note: "Dissented in Griswold v. Connecticut (1965), arguing that a right to privacy didn't appear in the Constitution's text regardless of whether the law itself was 'silly.'",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "Voted with the majority in Katz v. United States (1967), establishing that the Fourth Amendment protects people, not places — the foundation of modern wiretapping law.",
      },
    ],
  },
  {
    id: 64,
    name: "Abe Fortas",
    image: "fortas.webp",
    description:
      "LBJ's personal lawyer before becoming his Supreme Court appointment. Brilliant, ambitious, and ultimately doomed by his own financial entanglements. First sitting justice forced to resign under scandal. In a court full of interesting characters, managed to be both the most talented and the most self-destructive.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1910,
    nominatedBy: PRES_LBJ,
    religion: "Jewish",
    ethnicity: "Jewish",
    stats: {
      logic: 9,
      charisma: 8,
      empathy: 6,

      succeptibility: 5,
      partyLoyalty: 8,
    },
    weaknesses: { flattery: 7, bribery: 8, blackmail: 9, threats: 4 },
    stances: [
      {
        topic: "AccusedRights",
        position: "For",
        note: "Authored In re Gault (1967), extending due process rights to juvenile court proceedings — a landmark in expanding constitutional protections to minors.",
      },
      {
        topic: "FreeSpeech",
        position: "For",
        note: "Authored Tinker v. Des Moines (1969) shortly before resigning, holding that students don't shed First Amendment rights at the schoolhouse gate.",
      },
      {
        topic: "CivilLiberties",
        position: "For",
        note: "Consistent Warren Court liberal; voted to expand individual rights across the board until financial scandal forced the most talented Justice of his era off the bench.",
      },
    ],
  },
];

// ────────────────────────────────────────────────────────────
// LOCHNER ERA JUSTICES (1905, additional)
// ────────────────────────────────────────────────────────────

export const justiceLochnerExtra: Justice[] = [
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

// ────────────────────────────────────────────────────────────
// PRESET BENCH CONFIGS
// ────────────────────────────────────────────────────────────

export interface PresetBenchConfig {
  id: string;
  name: string;
  description: string;
  year?: number;
  icon: string;
  chiefJusticeId: number;
  justiceIds: number[];
  casePool: "historical" | "fictional" | "any";
}

export const presetBenchConfigs: PresetBenchConfig[] = [
  {
    id: "current",
    name: "The Current Court",
    description:
      "The current Supreme Court of the United States. Six conservatives, three liberals, and one Chief Justice desperately trying to preserve the institution's credibility while the institution disagrees.",
    year: 2026,
    icon: "🏛️",
    chiefJusticeId: 1, // John Roberts
    justiceIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    casePool: "historical",
  },
  {
    id: "warren-court",
    name: "The Warren Court",
    description:
      "Known for its historic activism in expanding civil rights, civil liberties, judicial power, and federal authority. Brown v. Board. Miranda. The most consequential liberal court in US history.",
    year: 1968,
    icon: "✊",
    chiefJusticeId: 53, // Earl Warren
    // Earl Warren, Hugo Black, William O. Douglas, Harlan II, Brennan, Potter Stewart, Byron White, Abe Fortas, Thurgood Marshall
    justiceIds: [53, 17, 60, 61, 62, 63, 16, 64, 10],
    casePool: "historical",
  },
  {
    id: "lochner-era",
    name: "The Early Lochner Era",
    description:
      "Known for its emphasis on economic liberty and hostility to government regulation. Struck down minimum wage laws, child labor limits, and worker protections with cheerful regularity.",
    year: 1905,
    icon: "🏭",
    chiefJusticeId: 65, // Melville Fuller
    // Fuller, John Marshall Harlan, Brewer, Henry Brown, Edward White, Peckham, McKenna, Holmes, Day
    justiceIds: [65, 52, 66, 55, 67, 68, 69, 18, 70],
    casePool: "historical",
  },
  {
    id: "court-from-hell",
    name: "The Court From Hell",
    description: "This is not the bench you want. This is not the bench you deserve. And yet, this is the bench you have to work with.",
    icon: "😈",
    chiefJusticeId: 29, // Peter Thiel
    // Thiel, Thomas, Scalia, Kavanaugh, Dredd, Mr. Beast, SVU Box Set, Rehnquist, Taney
    justiceIds: [29, 2, 13, 7, 21, 56, 38, 12, 54],
    casePool: "any",
  },
];
