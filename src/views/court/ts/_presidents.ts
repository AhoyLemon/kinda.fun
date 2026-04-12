import { President } from "./_types";

// Named exports for use as nominatedBy values in _justices.ts
export const PRES_WASHINGTON: President = {
  id: 1,
  name: "George Washington",
  party: "Federalist",
  image: "washington.webp",
  stances: [
    {
      topic: "FederalPower",
      position: "For",
      note: "Crushed the Whiskey Rebellion (1794) using federal troops, establishing that the new government's taxing authority was not open to negotiation.",
    },
    {
      topic: "ExecutivePower",
      position: "For",
      note: "Set the precedent of strong executive authority — from Cabinet appointments to treaty negotiation — that every successor has either built on or fought over.",
    },
    {
      topic: "SocialOrder",
      position: "For",
      note: "Farewell Address warned against factionalism and permanent foreign entanglements, prioritizing institutional stability over ideological passion.",
    },
  ],
};
export const PRES_JOHN_ADAMS: President = {
  id: 2,
  name: "John Adams",
  party: "Federalist",
  image: "john_adams.webp",
  stances: [
    {
      topic: "FreeSpeech",
      position: "Against",
      note: "Signed the Alien and Sedition Acts (1798), criminalizing criticism of the government — and was voted out of office partly as a result.",
    },
    {
      topic: "FederalPower",
      position: "For",
      note: "Federalist through and through; believed strong central authority was necessary to prevent the republic from collapsing into democratic chaos.",
    },
    {
      topic: "CourtAuthority",
      position: "For",
      note: "Appointed John Marshall as Chief Justice in the lame-duck period — quite possibly the most consequential single act of his presidency.",
    },
  ],
};
export const PRES_JACKSON: President = {
  id: 7,
  name: "Andrew Jackson",
  party: "Democrat",
  image: "jackson.webp",
  stances: [
    {
      topic: "NativeSovereignty",
      position: "Against",
      note: "Signed the Indian Removal Act (1830), forcibly relocating 60,000+ Native Americans — resulting in the Trail of Tears and thousands of deaths.",
    },
    {
      topic: "RacialEquity",
      position: "Against",
      note: "Enslaved over 150 people at the Hermitage; vetoed any federal action that might threaten the institution of slavery in the South.",
    },
    {
      topic: "ExecutivePower",
      position: "For",
      note: "Wielded the veto as a policy weapon rather than a constitutional check; claimed the presidency represented the direct will of the people over Congress and the courts.",
    },
    {
      topic: "CourtAuthority",
      position: "Against",
      note: "Allegedly said of the Supreme Court's ruling protecting Cherokee lands: 'John Marshall has made his decision; now let him enforce it.'",
    },
    {
      topic: "StatesRights",
      position: "For",
      note: "Opposed the Second Bank of the United States as unconstitutionally concentrating economic power, though paradoxically crushed South Carolina's nullification movement.",
    },
  ],
};
export const PRES_BENJAMIN_HARRISON: President = {
  id: 23,
  name: "Benjamin Harrison",
  party: "Republican",
  image: "harrison.webp",
  stances: [
    {
      topic: "EconomicRegulation",
      position: "For",
      note: "Signed the Sherman Anti-Trust Act (1890), the first federal law targeting monopolies — though enforcement was initially weak.",
    },
    {
      topic: "VotingRights",
      position: "For",
      note: "Supported the Federal Elections Bill of 1890 (the 'Force Bill') which would have protected Black voting rights in the South; it failed in the Senate.",
    },
    {
      topic: "Taxation",
      position: "For",
      note: "Signed the McKinley Tariff (1890), raising import duties to record levels to protect American industry — and alienating enough voters to lose his reelection bid.",
    },
  ],
};
export const PRES_GRANT: President = {
  id: 18,
  name: "Ulysses S. Grant",
  party: "Republican",
  image: "grant.webp",
  stances: [
    {
      topic: "RacialEquity",
      position: "For",
      note: "Enforced Reconstruction with federal troops, signed the Enforcement Acts (1870-71) targeting the KKK, and championed the 15th Amendment's ratification.",
    },
    {
      topic: "VotingRights",
      position: "For",
      note: "Used the Justice Department — which he created — to prosecute Klan violence suppressing Black voters in the South, with limited but real success.",
    },
    {
      topic: "FederalPower",
      position: "For",
      note: "Deployed federal authority for Reconstruction more aggressively than any predecessor, believing the national government had both the right and duty to protect citizens.",
    },
    {
      topic: "NativeSovereignty",
      position: "Neutral",
      note: "His 'Peace Policy' replaced corrupt Indian agents with Quakers and nominally respected treaty rights — while simultaneously pressing westward expansion through military force.",
    },
  ],
};
export const PRES_EISENHOWER: President = {
  id: 34,
  name: "Dwight D. Eisenhower",
  party: "Republican",
  image: "eisenhower.webp",
  stances: [
    {
      topic: "RacialEquity",
      position: "For",
      note: "Sent the 101st Airborne to Little Rock (1957) to enforce school desegregation — though he privately thought Brown moved too fast and regretted appointing Earl Warren.",
    },
    {
      topic: "FederalPower",
      position: "For",
      note: "Built the Interstate Highway System (1956) as the largest public works project in American history, funded federally and justified as national defense.",
    },
    {
      topic: "WarPowers",
      position: "Against",
      note: "Farewell Address (1961) warned against the 'military-industrial complex' acquiring undue influence over national policy — remarkably prescient from a five-star general.",
    },
    {
      topic: "EconomicRegulation",
      position: "For",
      note: "Accepted and expanded the New Deal rather than dismantling it, believing Social Security and labor regulations were politically and practically necessary.",
    },
  ],
};
export const PRES_THEODORE_ROOSEVELT: President = {
  id: 26,
  name: "Theodore Roosevelt",
  party: "Republican",
  image: "teddy.webp",
  stances: [
    {
      topic: "CorporatePower",
      position: "Against",
      note: "Directed the DOJ to break up Northern Securities (1902), launching the 'trust-busting' era that ultimately dismantled Standard Oil and American Tobacco.",
    },
    {
      topic: "EnvironmentalProtection",
      position: "For",
      note: "Created 5 National Parks, 150 National Forests, and conservation of 230 million acres of public land — the most ambitious conservation agenda in U.S. history.",
    },
    {
      topic: "EconomicRegulation",
      position: "For",
      note: "Signed the Pure Food and Drug Act and Meat Inspection Act (1906), establishing federal oversight of the food supply after Upton Sinclair made everyone queasy.",
    },
    {
      topic: "WorkersRights",
      position: "For",
      note: "Mediated the 1902 Coal Strike, forcing the mine operators to negotiate — the first time a president sided with labor in a major industrial dispute.",
    },
    {
      topic: "ExecutivePower",
      position: "For",
      note: "Articulated the 'stewardship theory': the president may do anything not expressly forbidden by law, not merely what is specifically authorized. Lincoln would have agreed.",
    },
  ],
};
export const PRES_FDR: President = {
  id: 32,
  name: "Franklin D. Roosevelt",
  party: "Democrat",
  image: "fdr.webp",
  stances: [
    {
      topic: "EconomicRegulation",
      position: "For",
      note: "The New Deal created the SEC, FDIC, Social Security, and dozens of regulatory agencies — fundamentally reshaping the relationship between government and the economy.",
    },
    {
      topic: "WorkersRights",
      position: "For",
      note: "Signed the National Labor Relations Act (1935) protecting collective bargaining and the Fair Labor Standards Act (1938) establishing the federal minimum wage. Union membership doubled during his tenure and labor power reshaped the Democratic coalition.",
    },
    {
      topic: "ExecutivePower",
      position: "For",
      note: "Attempted to pack the Supreme Court (1937) and issued Executive Order 9066 authorizing Japanese American internment — a stark reminder that emergency power has dark applications.",
    },
    {
      topic: "Taxation",
      position: "For",
      note: "Raised the top marginal income tax rate to 79% (and eventually 94%) to fund the war effort; framed high taxes on the wealthy as a matter of shared sacrifice.",
    },
  ],
};
export const PRES_CLEVELAND: President = {
  id: 22,
  name: "Grover Cleveland",
  party: "Democrat",
  image: "cleveland.webp",
  stances: [
    {
      topic: "EconomicRegulation",
      position: "Against",
      note: "Vetoed hundreds of bills, including railroad and pension legislation, on constitutional grounds — believing federal intervention in markets exceeded congressional authority.",
    },
    {
      topic: "WorkersRights",
      position: "Against",
      note: "Deployed federal troops to crush the Pullman Strike (1894) over the objection of Illinois Governor Altgeld, breaking the strike and jailing Eugene Debs.",
    },
    {
      topic: "Taxation",
      position: "Against",
      note: "His administration oversaw the Supreme Court striking down the income tax in Pollock (1895) — Congress eventually needed a constitutional amendment to bring it back.",
    },
  ],
};
export const PRES_MCKINLEY: President = {
  id: 25,
  name: "William McKinley",
  party: "Republican",
  image: "mckinley.webp",
  stances: [
    {
      topic: "Taxation",
      position: "For",
      note: "The McKinley Tariff of 1890 was his signature policy; he believed high protective tariffs were essential to American industrial prosperity.",
    },
    {
      topic: "CorporatePower",
      position: "For",
      note: "Aligned with big business and the gold standard; his administration marked the high point of Gilded Age Republican orthodoxy before TR changed the party.",
    },
    {
      topic: "WarPowers",
      position: "For",
      note: "Led the Spanish-American War (1898), acquiring the Philippines, Puerto Rico, and Guam — America's first explicitly imperial military adventure.",
    },
  ],
};
export const PRES_JFK: President = {
  id: 35,
  name: "John F. Kennedy",
  party: "Democrat",
  image: "jfk.webp",
  stances: [
    {
      topic: "RacialEquity",
      position: "For",
      note: "Sent federal marshals to protect Freedom Riders (1961) and federalized the Alabama National Guard to enforce university desegregation — though the full Civil Rights bill came after Dallas.",
    },
    {
      topic: "ExecutivePower",
      position: "For",
      note: "Managed the Cuban Missile Crisis (1962) through back-channel negotiations while publicly threatening war — a masterclass in using presidential authority at the edge of catastrophe.",
    },
    {
      topic: "WarPowers",
      position: "For",
      note: "Escalated U.S. military involvement in Vietnam with special forces and 'advisors,' a course of action LBJ would expand into full-scale war.",
    },
    {
      topic: "Taxation",
      position: "Against",
      note: "Proposed large income tax cuts in 1962-63, believing lower rates would stimulate economic growth — a supply-side argument Democrats later abandoned and Republicans adopted wholesale.",
    },
  ],
};
export const PRES_LBJ: President = {
  id: 36,
  name: "Lyndon B. Johnson",
  party: "Democrat",
  image: "lbj.webp",
  stances: [
    {
      topic: "RacialEquity",
      position: "For",
      note: "Signed the Civil Rights Act (1964) and Voting Rights Act (1965), personally lobbying Congress for both — the most significant civil rights legislation since Reconstruction.",
    },
    {
      topic: "VotingRights",
      position: "For",
      note: "Signed the Voting Rights Act (1965) after Selma, famously telling his aide: 'We have lost the South for a generation.' He was optimistic.",
    },
    {
      topic: "WorkersRights",
      position: "For",
      note: "The Great Society created Medicare, Medicaid, federal education funding, and consumer protection laws — the most ambitious domestic agenda since the New Deal.",
    },
    {
      topic: "WarPowers",
      position: "For",
      note: "Used the Gulf of Tonkin Resolution (1964) — a dubious incident — to authorize open-ended military escalation in Vietnam, ultimately deploying 500,000 troops.",
    },
    {
      topic: "WomensRights",
      position: "For",
      note: "Signed the Equal Pay Act implementation and expanded the Civil Rights Act to cover sex discrimination, establishing the legal foundation for workplace gender equality.",
    },
  ],
};
export const PRES_NIXON: President = {
  id: 37,
  name: "Richard Nixon",
  party: "Republican",
  image: "nixon.webp",
  stances: [
    {
      topic: "WarPowers",
      position: "For",
      note: "Secretly ordered the bombing of Cambodia (1969), then broke the news to Congress only after it began — the War Powers Resolution (1973) was passed directly in response.",
    },
    {
      topic: "ExecutivePower",
      position: "For",
      note: "Claimed 'executive privilege' to withhold the White House tapes from Congress; the Supreme Court unanimously rejected the claim in United States v. Nixon (1974).",
    },
    {
      topic: "AccusedRights",
      position: "Against",
      note: "Ran explicitly on 'law and order,' launching the War on Drugs as a political campaign against anti-war and Black freedom movements — as his aide John Ehrlichman later admitted in print.",
    },
    {
      topic: "RacialEquity",
      position: "Against",
      note: "The 'Southern Strategy' deliberately exploited racial resentment to win over conservative Southern Democrats, reshaping both parties' coalitions for decades.",
    },
    {
      topic: "EnvironmentalProtection",
      position: "For",
      note: "Created the EPA (1970) and signed the Clean Air Act and Clean Water Act — the most consequential environmental legislation in U.S. history, by a Republican.",
    },
  ],
};
export const PRES_FORD: President = {
  id: 38,
  name: "Gerald Ford",
  party: "Republican",
  image: "ford.webp",
  stances: [
    {
      topic: "ExecutivePower",
      position: "For",
      note: "Issued a 'full, free, and absolute pardon' to Nixon before any charges were filed, telling the nation that 'our long national nightmare is over' — placing executive mercy above legal accountability.",
    },
    {
      topic: "SocialOrder",
      position: "For",
      note: "Presidency defined by stabilizing the country after Watergate and Vietnam; prioritized healing over accountability — a choice historians still debate.",
    },
    {
      topic: "EconomicRegulation",
      position: "Against",
      note: "Supported deregulation of the transportation sector; his administration initiated airline deregulation that Carter would later complete.",
    },
  ],
};
export const PRES_REAGAN: President = {
  id: 40,
  name: "Ronald Reagan",
  party: "Republican",
  stances: [
    {
      topic: "EconomicRegulation",
      position: "Against",
      note: "Launched the modern deregulation era; rolled back environmental, financial, labor, and antitrust enforcement with explicit ideological commitment to 'getting government off our backs.'",
    },
    {
      topic: "Taxation",
      position: "Against",
      note: "Economic Recovery Tax Act (1981) cut the top marginal rate from 70% to 50% (later to 28%), the largest peacetime tax cut in U.S. history — permanently shifting the debate.",
    },
    {
      topic: "WorkersRights",
      position: "Against",
      note: "Fired 11,000 striking air traffic controllers (PATCO) in 1981 and decertified their union — a single act that reshaped the American labor movement's political power for a generation.",
    },
    {
      topic: "FederalPower",
      position: "Against",
      note: "His signature line: 'The nine most terrifying words in the English language are: 'I'm from the government, and I'm here to help.'' States' rights rhetoric was central to his coalition.",
    },
    {
      topic: "RacialEquity",
      position: "Against",
      note: "Opposed the Voting Rights Act extension, tried to restore tax-exempt status to segregated private schools, and opened his 1980 campaign in Philadelphia, Mississippi — where three civil rights workers were murdered in 1964.",
    },
  ],
};
export const PRES_GHW_BUSH: President = {
  id: 41,
  name: "George H.W. Bush",
  party: "Republican",
  stances: [
    {
      topic: "WarPowers",
      position: "For",
      note: "Led the Gulf War coalition (1991) with actual congressional authorization and UN support — a striking contrast to both his predecessor and his son's approach to military force.",
    },
    {
      topic: "EconomicRegulation",
      position: "For",
      note: "Signed the Americans with Disabilities Act (1990) and Clean Air Act Amendments (1990), departing from Reagan-era deregulation orthodoxy.",
    },
    {
      topic: "Taxation",
      position: "For",
      note: "Broke his 'read my lips: no new taxes' pledge by signing a $400 billion deficit reduction package, destroying his conservative base and contributing to his 1992 loss.",
    },
    {
      topic: "RacialEquity",
      position: "Neutral",
      note: "Signed the Civil Rights Act of 1991 after initially vetoing it as a 'quota bill'; his 1988 Willie Horton ad strategy had already done the political damage.",
    },
  ],
};
export const PRES_CLINTON: President = {
  id: 42,
  name: "Bill Clinton",
  party: "Democrat",
  stances: [
    {
      topic: "GayRights",
      position: "Against",
      note: "Signed both the Defense of Marriage Act (1996) and Don't Ask Don't Tell (1993) — defining down LGBTQ equality even as he spoke the language of inclusion.",
    },
    {
      topic: "EconomicRegulation",
      position: "Against",
      note: "Signed Gramm-Leach-Bliley (1999), repealing the Glass-Steagall banking firewall, and signed NAFTA (1993) over fierce labor opposition — the Third Way in action.",
    },
    {
      topic: "AccusedRights",
      position: "Against",
      note: "Signed the 1994 Crime Bill, dramatically expanding mandatory minimum sentences, three-strikes laws, and the prison population — later called 'a mistake' by Hillary Clinton.",
    },
    {
      topic: "WorkersRights",
      position: "Neutral",
      note: "Signed NAFTA and welfare reform (cutting benefits) while also signing the Family and Medical Leave Act — a governing philosophy of calculated triangulation.",
    },
    {
      topic: "SocialOrder",
      position: "For",
      note: "Epitomized the 'New Democrat' coalition: culturally moderate, fiscally centrist, rhetorically progressive, and deeply willing to disappoint the left to win the center.",
    },
  ],
};
export const PRES_GW_BUSH: President = {
  id: 43,
  name: "George W. Bush",
  party: "Republican",
  image: "gw_bush.webp",
  stances: [
    {
      topic: "WarPowers",
      position: "For",
      note: "Signed the 2001 AUMF and 2002 Iraq War Resolution, authorizing sweeping military action with minimal congressional constraint.",
    },
    {
      topic: "ExecutivePower",
      position: "For",
      note: "The 'Torture Memos' and warrantless NSA wiretapping program (exposed 2005) reflected a dramatic expansion of unilateral executive authority.",
    },
    {
      topic: "ReligiousLiberty",
      position: "For",
      note: "Created the White House Office of Faith-Based and Community Initiatives (2001), directing federal funds to religious organizations.",
    },
    {
      topic: "ReproductiveRights",
      position: "Against",
      note: "Signed the Partial-Birth Abortion Ban Act (2003), the first federal law criminalizing a specific abortion procedure.",
    },
    {
      topic: "Taxation",
      position: "Against",
      note: "Signed the Economic Growth and Tax Relief Reconciliation Act (2001), delivering the largest tax cut in a generation — heavily benefiting the wealthy.",
    },
  ],
};
export const PRES_OBAMA: President = {
  id: 44,
  name: "Barack Obama",
  party: "Democrat",
  image: "obama.webp",
  stances: [
    {
      topic: "GayRights",
      position: "For",
      note: "Signed the repeal of Don't Ask Don't Tell (2010) and directed the DOJ to stop defending DOMA (2011), preceding Obergefell.",
    },
    {
      topic: "EconomicRegulation",
      position: "For",
      note: "Signed the Dodd-Frank Wall Street Reform Act (2010), the most sweeping financial regulation since the New Deal.",
    },
    {
      topic: "Immigration",
      position: "For",
      note: "Signed the DACA executive order (2012), protecting roughly 700,000 undocumented immigrants brought as children from deportation.",
    },
    {
      topic: "WarPowers",
      position: "For",
      note: "Dramatically expanded drone strikes and targeted killing programs, including the killing of U.S. citizen Anwar al-Awlaki without trial (2011).",
    },
    {
      topic: "EnvironmentalProtection",
      position: "For",
      note: "Signed the Clean Power Plan (2015) via EPA rulemaking and co-signed the Paris Climate Agreement (2016).",
    },
  ],
};
export const PRES_TRUMP: President = {
  id: 45,
  name: "Donald Trump",
  party: "Republican",
  image: "trump.webp",
  stances: [
    {
      topic: "Immigration",
      position: "Against",
      note: "Signed Executive Order 13769 (2017), the 'Muslim ban' restricting travel from several majority-Muslim countries, upheld in Trump v. Hawaii (2018).",
    },
    {
      topic: "AgencyDeference",
      position: "Against",
      note: "Issued Executive Order 13771 requiring two regulations be eliminated for every new one created, aggressively rolling back the administrative state.",
    },
    {
      topic: "RacialEquity",
      position: "Against",
      note: "Signed an executive order banning federal diversity, equity, and inclusion training (2020), framing it as 'divisive anti-American propaganda.'",
    },
    {
      topic: "RichPeople",
      position: "For",
      note: "Paid $750 in federal income taxes in 2016 and 2017, and $0 in 10 of the previous 15 years, according to The New York Times' investigation (2020).",
    },
    {
      topic: "ExecutivePower",
      position: "For",
      note: "Invoked the Alien Enemies Act of 1798 (2025) to deport Venezuelan migrants, asserting emergency executive power with minimal judicial review.",
    },
  ],
};
export const PRES_BIDEN: President = {
  id: 46,
  name: "Joe Biden",
  party: "Democrat",
  image: "biden.webp",
  stances: [
    {
      topic: "WorkersRights",
      position: "For",
      note: "Signed the Inflation Reduction Act (2022), the largest climate investment in U.S. history at roughly $369 billion.",
    },
    {
      topic: "EnvironmentalProtection",
      position: "For",
      note: "Signed the Inflation Reduction Act (2022), the largest climate investment in U.S. history at roughly $369 billion.",
    },
    {
      topic: "EconomicRegulation",
      position: "For",
      note: "Attempted broad student loan cancellation via the HEROES Act; struck down in Biden v. Nebraska (2023) — invoking the same major questions doctrine Roberts applied against the EPA.",
    },
    {
      topic: "Immigration",
      position: "For",
      note: "Reversed the 'Remain in Mexico' policy and attempted to preserve DACA, though the program faced continued legal challenges.",
    },
    {
      topic: "CorporatePower",
      position: "Against",
      note: "Appointed Lina Khan to the FTC and Jonathan Kanter to DOJ Antitrust, launching the most aggressive antitrust enforcement era since the 1970s.",
    },
  ],
};

// Celebrity presidents for the fictional/celebrity justices
export const PRES_SNOOP_DOGG: President = {
  id: 47,
  name: "Snoop Dogg",
  party: "Democrat",
  image: "snoop.webp",
  stances: [
    {
      topic: "Guns",
      position: "For",
      note: "Believes in the right to bear arms, especially if they're stylish.",
    },
    {
      topic: "PolicePower",
      position: "Against",
      note: "Advocates for police reform and accountability.",
    },
    {
      topic: "Drugs",
      position: "For",
      note: "🌿 SMOKE WEED ERRYDAY 🌿",
    },
  ],
};
export const PRES_VERMIN_SUPREME: President = {
  id: 48,
  name: "Vermin Supreme",
  party: "Democrat",
  image: "vermin_supreme.webp",
  stances: [
    { topic: "Drugs", position: "For", note: "Mandatory toothbrushing and free ponies for all, plus legal weed." },
    { topic: "SocialOrder", position: "Against", note: "Wants to disrupt the status quo with absurdist policies." },
    { topic: "CorporatePower", position: "Against", note: "Believes corporations should be run by ponies, not people." },
  ],
};
export const PRES_BJORK: President = {
  id: 49,
  name: "Björk",
  party: "Democrat",
  image: "bjork.webp",
  stances: [
    { topic: "EnvironmentalProtection", position: "For", note: "Protects Icelandic nature and all magical creatures." },
    { topic: "AnimalRights", position: "For", note: "Believes animals should have the right to sing and dance." },
    { topic: "CorporatePower", position: "Against", note: "Thinks corporations should be more like art collectives." },
  ],
};
export const PRES_BILL_HICKS: President = {
  id: 50,
  name: "Bill Hicks",
  party: "Democrat",
  image: "bill_hicks.webp",
  stances: [
    { topic: "Drugs", position: "For", note: "Believes psychedelic experiences should be covered by insurance." },
    { topic: "FreeSpeech", position: "For", note: "Defends the right to offend, especially in stand-up comedy." },
    { topic: "ChristianHegemony", position: "Against", note: "Wants to keep church and state as far apart as possible." },
    { topic: "CorporatePower", position: "Against", note: "Thinks advertising is the devil's work." },
  ],
};
export const PRES_HUNTER_S_THOMPSON: President = {
  id: 51,
  name: "Hunter S. Thompson",
  party: "Democrat",
  image: "hunter_s_thompson.webp",
  stances: [
    { topic: "Drugs", position: "For", note: "Believes in the right to self-medicate, especially with mescaline." },
    { topic: "FreeSpeech", position: "For", note: "Gonzo journalism is a constitutional right." },
    { topic: "PolicePower", position: "Against", note: "Distrusts all authority, especially with badges." },
    { topic: "ExecutivePower", position: "Against", note: "Thinks the presidency should be abolished, or at least made more fun." },
  ],
};
export const PRES_LIBERACE: President = {
  id: 52,
  name: "Liberace",
  party: "Republican",
  image: "liberace.webp",
  stances: [
    { topic: "GayRights", position: "Neutral", note: "Believes in fabulous rights for all, but won't say it out loud." },
    { topic: "Taxation", position: "Against", note: "Thinks sequins should be tax-deductible." },
    { topic: "CorporatePower", position: "For", note: "Believes every company should have a piano in the lobby." },
  ],
};
export const PRES_VINCE_MCMAHON: President = {
  id: 53,
  name: "Vince McMahon",
  party: "Republican",
  image: "mcmahon.webp",
  stances: [
    { topic: "CorporatePower", position: "For", note: "Believes corporations should be run like wrestling promotions." },
    { topic: "WorkersRights", position: "Against", note: "Thinks unions are for the weak." },
    { topic: "ExecutivePower", position: "For", note: "Runs the country like Monday Night Raw." },
    { topic: "SocialOrder", position: "For", note: "Prefers order, but only if he's in charge." },
    { topic: "RichPeople", position: "For", note: "Believes the rich should always win, preferably by pinfall." },
  ],
};

export const presidents: President[] = [
  PRES_WASHINGTON,
  PRES_JOHN_ADAMS,
  PRES_JACKSON,
  PRES_BENJAMIN_HARRISON,
  PRES_CLEVELAND,
  PRES_MCKINLEY,
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
  PRES_VINCE_MCMAHON,
];
