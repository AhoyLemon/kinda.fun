import { Justice } from "../_types";
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
  PRES_CLINTON,
} from "../_presidents";
export const historicalJustices: Justice[] = [
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
      logic: 7,
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
      {
        topic: "GayRights",
        position: "For",
        note: "Voted with the majority in United States v. Windsor (2013) and Obergefell v. Hodges (2015), extending equal protection to same-sex couples nationwide.",
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
      {
        topic: "GayRights",
        position: "Against",
        note: "Dissented in Lawrence v. Texas (2003), arguing the state's sodomy law was rationally related to legitimate government interests and that Bowers v. Hardwick should not be overruled.",
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
      {
        topic: "GayRights",
        position: "For",
        note: "Concurred in Lawrence v. Texas (2003) on equal protection grounds, arguing Texas's sodomy law violated equal protection by targeting same-sex couples while exempt from prosecution for the same conduct.",
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
      {
        topic: "GayRights",
        position: "Against",
        note: "Authored the majority opinion in Bowers v. Hardwick (1986), upholding Georgia's sodomy law and rejecting a constitutional right to consensual same-sex intimacy.",
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
    id: 71,
    name: "Anthony Kennedy",
    image: "anthony_kennedy.webp",
    description:
      "The swing vote of the Rehnquist and Roberts Courts, and the unexpected champion of gay rights. Appointed by Reagan, confirmed unanimously, expected to be reliably conservative. Instead wrote some of the most powerful liberty opinions in American history — Lawrence, Windsor, Obergefell — while also gutting the Voting Rights Act and authoring Citizens United. He contained multitudes.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1936,
    nominatedBy: PRES_REAGAN,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 8,
      charisma: 7,
      empathy: 7,
      succeptibility: 6,
      partyLoyalty: 4,
    },
    weaknesses: { flattery: 7, bribery: 3, blackmail: 3, threats: 3 },
    stances: [
      {
        topic: "GayRights",
        position: "For",
        note: "Authored Lawrence v. Texas (2003), United States v. Windsor (2013), and Obergefell v. Hodges (2015) — the three most significant gay rights decisions in American history.",
      },
      {
        topic: "Privacy",
        position: "For",
        note: "Grounded gay rights in the 14th Amendment's liberty interest, following Griswold's logic to its most expansive conclusion.",
      },
      {
        topic: "CampaignFinance",
        position: "For",
        note: "Authored Citizens United v. FEC (2010), holding that corporate independent expenditures in elections are protected speech, opening the door to unlimited dark money.",
      },
      {
        topic: "VotingRights",
        position: "Against",
        note: "Joined the Shelby County v. Holder majority (2013), gutting the Voting Rights Act's preclearance provision — in the same term as Windsor.",
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
