import { Case } from "./_types";

// ────────────────────────────────────────────────────────────
// HISTORICAL CASES (10)
// ────────────────────────────────────────────────────────────

export const casesHistorical: Case[] = [
  {
    id: 1,
    name: "Marbury v. Madison",
    year: 1803,
    caseType: "historical",
    primaryQuestion: "Does the Supreme Court have the power to strike down laws it finds unconstitutional?",
    prosecution: {
      name: "William Marbury",
      argument: "The law says I get my judge job. The Court must uphold the law. Deliver my commission now, Mr. Madison.",
      favoredBy: "Federalist",
      stances: {
        CourtAuthority: "For",
        FederalPower: "For",
      },
    },
    defendant: {
      name: "James Madison",
      argument:
        "The law granting you that power was itself unconstitutional. You can't give the Supreme Court authority the Constitution doesn't. Also, we just don't want to.",
      favoredBy: "Democratic-Republican",
      stances: {
        CourtAuthority: "Against",
        FederalPower: "Against",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 2,
    name: "Brown v. Board of Education",
    year: 1954,
    caseType: "historical",
    primaryQuestion: "Is racial segregation in public schools constitutional?",
    prosecution: {
      name: "Oliver Brown",
      argument:
        "Separate schools are inherently unequal. Forcing Black children into inferior schools damages them psychologically and violates the 14th Amendment. Separate is not equal. It never was.",
      favoredBy: "Democrat",
      stances: {
        RacialEquity: "For",
        CivilLiberties: "For",
      },
    },
    defendant: {
      name: "Board of Education of Topeka",
      argument:
        "Separate but equal has been settled law since Plessy v. Ferguson. The schools comply with that standard. This is a local education matter and the Court should stay out of it.",
      favoredBy: "Republican",
      stances: {
        RacialEquity: "Against",
        StatesRights: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 3,
    name: "Roe v. Wade",
    year: 1973,
    caseType: "historical",
    primaryQuestion: "Does the Constitution protect a woman's right to an abortion?",
    prosecution: {
      name: "Jane Roe",
      argument:
        "A woman's right to privacy, recognized in Griswold, includes the fundamental decision whether to continue a pregnancy. The government cannot force someone to remain pregnant against their will.",
      favoredBy: "Democrat",
      stances: {
        ReproductiveRights: "For",
        WomensRights: "For",
        Privacy: "For",
      },
    },
    defendant: {
      name: "Henry Wade",
      argument:
        "The state of Texas has a compelling interest in protecting potential life. This is a matter for legislatures, not courts. The Constitution says nothing about abortion because it doesn't exist.",
      favoredBy: "Republican",
      stances: {
        ReproductiveRights: "Against",
        StatesRights: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 4,
    name: "Citizens United v. FEC",
    year: 2010,
    caseType: "historical",
    primaryQuestion: "Do corporations have First Amendment rights to spend unlimited money on political campaigns?",
    prosecution: {
      name: "Citizens United",
      argument:
        "Money is speech. Corporations are people. Limiting how much a person (who is a corporation) can spend on speech (which is money) violates the First Amendment. This is very simple.",
      favoredBy: "Republican",
      stances: {
        CorporatePower: "For",
        FreeSpeech: "For",
        CampaignFinance: "For",
        RichPeople: "For",
      },
    },
    defendant: {
      name: "Federal Election Commission",
      argument:
        "Unlimited corporate spending in elections corrupts democracy. Congress has the authority and the obligation to prevent wealthy interests from purchasing election outcomes.",
      favoredBy: "Democrat",
      stances: {
        CorporatePower: "Against",
        CampaignFinance: "Against",
        FairElections: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 5,
    name: "Miranda v. Arizona",
    year: 1966,
    caseType: "historical",
    primaryQuestion: "Must police inform suspects of their constitutional rights before questioning them?",
    prosecution: {
      name: "Ernesto Miranda",
      argument:
        "I didn't know I had the right to remain silent or to have a lawyer. I was interrogated for hours until I confessed. The 5th and 6th Amendments mean nothing if nobody tells you they exist.",
      favoredBy: "Democrat",
      stances: {
        AccusedRights: "For",
        CivilLiberties: "For",
      },
    },
    defendant: {
      name: "State of Arizona",
      argument:
        "The defendant confessed voluntarily. We got a dangerous criminal off the streets. Requiring police to read a speech before every arrest will handcuff law enforcement and let guilty people go free.",
      favoredBy: "Republican",
      stances: {
        AccusedRights: "Against",
        PolicePower: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 6,
    name: "Bush v. Gore",
    year: 2000,
    caseType: "historical",
    primaryQuestion: "Should the Florida recount continue in the 2000 Presidential election?",
    prosecution: {
      name: "George W. Bush",
      argument:
        "The inconsistent standards across Florida counties violate equal protection. We need consistency, and the only consistent outcome is to stop counting and declare me the winner.",
      favoredBy: "Republican",
      stances: {
        FairElections: "Against",
        StatesRights: "Against",
      },
    },
    defendant: {
      name: "Al Gore",
      argument:
        "Every vote must be counted to determine the true winner of a democratic election. The recount is the process working as intended. Also I won the popular vote by half a million votes.",
      favoredBy: "Democrat",
      stances: {
        FairElections: "For",
        VotingRights: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 7,
    name: "Obergefell v. Hodges",
    year: 2015,
    caseType: "historical",
    primaryQuestion: "Does the Constitution guarantee same-sex couples the right to marry?",
    prosecution: {
      name: "James Obergefell",
      argument:
        "The 14th Amendment guarantees equal protection and due process to all persons. Denying same-sex couples the right to marry treats them as second-class citizens. Love is love, constitutionally speaking.",
      favoredBy: "Democrat",
      stances: {
        GayRights: "For",
        Privacy: "For",
      },
    },
    defendant: {
      name: "Richard Hodges",
      argument: "Marriage has always been defined as between a man and a woman. Redefining it should be done by legislatures, not courts. Also: tradition.",
      favoredBy: "Republican",
      stances: {
        GayRights: "Against",
        ReligiousLiberty: "For",
        StatesRights: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 8,
    name: "Korematsu v. United States",
    year: 1944,
    caseType: "historical",
    primaryQuestion: "Is the forced relocation of Japanese American citizens during wartime constitutional?",
    prosecution: {
      name: "Fred Korematsu",
      argument:
        "I am an American citizen. You cannot imprison American citizens based solely on their ethnicity. This is racism with a military uniform on. The Constitution does not have an asterisk for wartime.",
      favoredBy: "Democrat",
      stances: {
        AccusedRights: "For",
        RacialEquity: "Against",
        CivilLiberties: "For",
      },
    },
    defendant: {
      name: "United States Government",
      argument:
        "Military necessity and national security justify extraordinary measures. The Commander-in-Chief's war powers allow restrictions on civil liberties when the nation faces existential threat. We are at war.",
      favoredBy: "Republican",
      stances: {
        AccusedRights: "Against",
        WarPowers: "For",
        ExecutivePower: "For",
      },
    },
    historicalWinner: "Defendant",
  },
  {
    id: 9,
    name: "Dred Scott v. Sandford",
    year: 1857,
    caseType: "historical",
    primaryQuestion: "Are African Americans citizens with constitutional rights?",
    prosecution: {
      name: "Dred Scott",
      argument:
        "I lived for years in free territories where slavery was illegal. By the laws of those territories, I became free. I am a free man and a person, and I deserve to be treated as one.",
      favoredBy: "Democrat",
      stances: {
        RacialEquity: "Against",
        AccusedRights: "For",
        FederalPower: "For",
      },
    },
    defendant: {
      name: "John Sanford",
      argument:
        "The Constitution, as written in 1787, did not consider Black people as citizens. Scott is property. Property cannot sue. The court has no jurisdiction here, and slavery is here to stay.",
      favoredBy: "Whig",
      stances: {
        RacialEquity: "For",
        AccusedRights: "Against",
        StatesRights: "For",
      },
    },
    historicalWinner: "Defendant",
  },
  {
    id: 10,
    name: "Schenck v. United States",
    year: 1919,
    caseType: "historical",
    primaryQuestion: "Can the government limit free speech during wartime?",
    prosecution: {
      name: "Charles Schenck",
      argument:
        "Free speech is an absolute right guaranteed by the First Amendment. Distributing anti-draft pamphlets is protected political speech. The government cannot imprison people for their ideas, even during a war.",
      favoredBy: "Democrat",
      stances: {
        FreeSpeech: "For",
        CivilLiberties: "For",
      },
    },
    defendant: {
      name: "United States",
      argument:
        "Speech that presents a 'clear and present danger' can be restricted. Encouraging military resistance during active wartime is not protected expression — it is sabotage with better typography.",
      favoredBy: "Republican",
      stances: {
        FreeSpeech: "Against",
        WarPowers: "For",
      },
    },
    historicalWinner: "Defendant",
  },
  {
    id: 11,
    name: "Gideon v. Wainwright",
    year: 1963,
    caseType: "historical",
    primaryQuestion: "Does the Constitution require states to provide a lawyer to defendants who cannot afford one?",
    prosecution: {
      name: "Clarence Earl Gideon",
      argument:
        "I am a poor man who had to defend himself in court against a professional prosecutor. The 6th Amendment guarantee of 'counsel' is a cruel joke if it only applies to people with money.",
      favoredBy: "Democrat",
      stances: {
        AccusedRights: "For",
        CivilLiberties: "For",
      },
    },
    defendant: {
      name: "Louie L. Wainwright",
      argument:
        "States should decide how to run their own courts. Forcing us to pay for every defendant's lawyer is an unfunded federal mandate that will bankrupt the state justice systems.",
      favoredBy: "Republican",
      stances: {
        AccusedRights: "Against",
        StatesRights: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 12,
    name: "New York Times Co. v. United States",
    year: 1971,
    caseType: "historical",
    primaryQuestion: "Can the government stop a newspaper from publishing classified information about the Vietnam War?",
    prosecution: {
      name: "New York Times",
      argument:
        "The First Amendment prohibits 'prior restraint.' The public has a right to know how they were misled about the war. Democracy dies if the government can censor the press in the name of 'security.'",
      favoredBy: "Democrat",
      stances: {
        FreeSpeech: "For",
        CivilLiberties: "For",
      },
    },
    defendant: {
      name: "United States (Nixon Administration)",
      argument:
        "The publication of the Pentagon Papers threatens national security and puts American lives at risk. The Executive Branch must have the power to protect secrets during an active conflict.",
      favoredBy: "Republican",
      stances: {
        FreeSpeech: "Against",
        ExecutivePower: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 13,
    name: "Lochner v. New York",
    year: 1905,
    caseType: "historical",
    primaryQuestion: "Can a state limit the number of hours a bakery employee is allowed to work?",
    prosecution: {
      name: "Joseph Lochner",
      argument:
        "The 14th Amendment protects my 'liberty of contract.' If a man wants to work 100 hours and I want to pay him for 100 hours, the government has no right to step into our private business and stop us.",
      favoredBy: "Republican",
      stances: {
        WorkersRights: "Against",
        PropertyRights: "For",
        EconomicRegulation: "Against",
      },
    },
    defendant: {
      name: "State of New York",
      argument:
        "The state has 'police power' to protect the health and safety of its citizens. Working long hours in a hot, dusty bakery is dangerous. We aren't restricting liberty; we are preventing exploitation.",
      favoredBy: "Democrat",
      stances: {
        WorkersRights: "For",
        EconomicRegulation: "For",
        PolicePower: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 14,
    name: "Loving v. Virginia",
    year: 1967,
    caseType: "historical",
    primaryQuestion: "Can a state ban marriage between people of different races?",
    prosecution: {
      name: "Mildred and Richard Loving",
      argument:
        "Marriage is a basic civil right. The 14th Amendment's Equal Protection Clause means the state cannot use race as a reason to tell two people they cannot love or marry each other.",
      favoredBy: "Democrat",
      stances: {
        RacialEquity: "For",
        Privacy: "For",
      },
    },
    defendant: {
      name: "Commonwealth of Virginia",
      argument:
        "Interracial marriage bans have existed for centuries and apply to both races equally, so there is no discrimination. This is about preserving traditional social order and state sovereignty.",
      favoredBy: "Republican",
      stances: {
        RacialEquity: "Against",
        StatesRights: "For",
        SocialOrder: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 15,
    name: "Buck v. Bell",
    year: 1927,
    caseType: "historical",
    primaryQuestion: "Can the state forcibly sterilize people it deems 'mentally deficient'?",
    prosecution: {
      name: "Carrie Buck",
      argument:
        "The government has no right to mutilate my body based on a pseudo-scientific theory of eugenics. My right to bodily integrity and to have a family is fundamental and protected.",
      favoredBy: "Democrat",
      stances: {
        ReproductiveRights: "For",
        Privacy: "For",
        CivilLiberties: "For",
      },
    },
    defendant: {
      name: "John Hendren Bell",
      argument:
        "Public welfare outweighs individual rights. By preventing the 'unfit' from reproducing, we prevent the state from being swamped with incompetence. Three generations of imbeciles are enough.",
      favoredBy: "Republican",
      stances: {
        ReproductiveRights: "Against",
        StatesRights: "For",
        SocialOrder: "For",
      },
    },
    historicalWinner: "Defendant",
  },
  {
    id: 16,
    name: "Plessy v. Ferguson",
    year: 1896,
    caseType: "historical",
    primaryQuestion: "Is state-mandated racial segregation on trains constitutional?",
    prosecution: {
      name: "Homer Plessy",
      argument:
        "The 14th Amendment guarantees equal protection. Forcing me into a different train car based on my race marks Black people with a badge of inferiority. Separate is a violation of my dignity.",
      favoredBy: "Democrat",
      stances: {
        RacialEquity: "For",
      },
    },
    defendant: {
      name: "John Ferguson (State of Louisiana)",
      argument:
        "As long as the facilities provided are equal in quality, segregation is a reasonable exercise of state power to keep the peace. Laws cannot change social prejudices; they can only reflect them.",
      favoredBy: "Republican",
      stances: {
        StatesRights: "For",
        SocialOrder: "For",
        RacialEquity: "Against",
      },
    },
    historicalWinner: "Defendant",
  },
  {
    id: 17,
    name: "Gibbons v. Ogden",
    year: 1824,
    caseType: "historical",
    primaryQuestion: "Does the federal government have the power to regulate commerce between states?",
    prosecution: {
      name: "Thomas Gibbons",
      argument:
        "The Constitution gives Congress the power to regulate commerce. A state-granted monopoly on steamboats is a barrier to trade and a violation of national supremacy. The river belongs to everyone.",
      favoredBy: "Federalist",
      stances: {
        FederalPower: "For",
        EconomicRegulation: "For",
      },
    },
    defendant: {
      name: "Aaron Ogden",
      argument:
        "States have the sovereign right to grant business licenses within their own borders. The federal government shouldn't interfere with local business and state-granted property rights.",
      favoredBy: "Democratic-Republican",
      stances: {
        FederalPower: "Against",
        StatesRights: "For",
        PropertyRights: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 18,
    name: "McCulloch v. Maryland",
    year: 1819,
    caseType: "historical",
    primaryQuestion: "Can a state tax a federal institution, and does the government have the power to create a national bank?",
    prosecution: {
      name: "James W. McCulloch",
      argument:
        "The 'Necessary and Proper' clause means the government can do what it needs to function. The power to tax is the power to destroy, and a state cannot destroy a national tool.",
      favoredBy: "Federalist",
      stances: {
        FederalPower: "For",
        Taxation: "Against",
      },
    },
    defendant: {
      name: "State of Maryland",
      argument:
        "The Constitution doesn't say the government can build a bank. If they do it anyway, it's operating on our soil and we have every right to tax it like any other business.",
      favoredBy: "Democratic-Republican",
      stances: {
        FederalPower: "Against",
        Taxation: "For",
        StatesRights: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 19,
    name: "Texas v. Johnson",
    year: 1989,
    caseType: "historical",
    primaryQuestion: "Is burning the American flag protected as 'symbolic speech'?",
    prosecution: {
      name: "Gregory Lee Johnson",
      argument:
        "I burned a flag to protest the government. It’s an expressive act. The First Amendment doesn't just protect speech people like; it protects speech that is intentionally offensive and provocative.",
      favoredBy: "Democrat",
      stances: {
        FreeSpeech: "For",
        CivilLiberties: "For",
      },
    },
    defendant: {
      name: "State of Texas",
      argument:
        "The flag is a sacred national symbol. Burning it is a breach of the peace and an act of desecration that goes beyond speech. We have a duty to protect the symbols of our unity.",
      favoredBy: "Republican",
      stances: {
        FreeSpeech: "Against",
        SocialOrder: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 20,
    name: "West Virginia State Board of Education v. Barnette",
    year: 1943,
    caseType: "historical",
    primaryQuestion: "Can a public school force students to salute the flag and say the Pledge of Allegiance?",
    prosecution: {
      name: "Walter Barnette",
      argument:
        "Forcing my children to salute a symbol violates our religious beliefs. The government cannot compel a person to say things they do not believe. Patriotism shouldn't be mandatory.",
      favoredBy: "Democrat",
      stances: {
        FreeSpeech: "For",
        ReligiousLiberty: "For",
      },
    },
    defendant: {
      name: "WV Board of Education",
      argument:
        "The pledge promotes national unity and security during a time of war. The school has the right to instill civic values and loyalty in its students through shared rituals.",
      favoredBy: "Republican",
      stances: {
        FreeSpeech: "Against",
        SocialOrder: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 21,
    name: "Masterpiece Cakeshop v. Colorado Civil Rights Commission",
    year: 2018,
    caseType: "historical",
    primaryQuestion: "Does a state's anti-discrimination law violate a business owner's First Amendment right to religious freedom?",
    prosecution: {
      name: "Jack Phillips",
      argument:
        "As an artist, being forced to use my creative talents to celebrate a ceremony that violates my religious faith is compelled speech. The state commission's hostility toward my beliefs proves they are not being neutral.",
      favoredBy: "Republican",
      stances: {
        ChristianHegemony: "For",
        GayRights: "Against",
      },
    },
    defendant: {
      name: "Colorado Civil Rights Commission",
      argument:
        "Public businesses cannot pick and choose customers based on sexual orientation. If you open your doors to the public, you must serve everyone equally regardless of your personal religious objections.",
      favoredBy: "Democrat",
      stances: {
        ChristianHegemony: "Against",
        GayRights: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 22,
    name: "Abood v. Detroit Board of Education",
    year: 1977,
    caseType: "historical",
    primaryQuestion: "Can public sector employees be required to pay union fees to cover the costs of collective bargaining?",
    prosecution: {
      name: "Louis Abood",
      argument:
        "I shouldn't be forced to pay money to a union I didn't join. It violates my First Amendment rights to be forced to financially support a private organization's political or social agenda through mandatory fees.",
      favoredBy: "Republican",
      stances: {
        FreeSpeech: "For",
        WorkersRights: "Against",
      },
    },
    defendant: {
      name: "Detroit Board of Education",
      argument:
        "Non-members still benefit from the union's contract negotiations. These 'agency fees' prevent 'free riders' and ensure labor peace by making sure everyone pays their fair share for the representation they receive.",
      favoredBy: "Democrat",
      stances: {
        WorkersRights: "For",
      },
    },
    historicalWinner: "Defendant",
  },
  {
    id: 23,
    name: "Janus v. AFSCME",
    year: 2018,
    caseType: "historical",
    primaryQuestion: "Do mandatory union fees for non-member public employees violate the First Amendment?",
    prosecution: {
      name: "Mark Janus",
      argument:
        "Everything a public sector union does is political because it is negotiating with the government. Forcing me to pay any fees at all is compelled speech and violates my right to choose what I support. We should overturn the Abood precedent.",
      favoredBy: "Republican",
      stances: {
        WorkersRights: "Against",
      },
    },
    defendant: {
      name: "AFSCME Council 31",
      argument:
        "We have relied on the ability to collect these fees for 40 years. Stripping unions of this funding is a direct attack on the financial stability of labor organizations and the collective bargaining rights of all workers.",
      favoredBy: "Democrat",
      stances: {
        WorkersRights: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 24,
    name: "Bowers v. Hardwick",
    year: 1986,
    caseType: "historical",
    primaryQuestion: "Does the Constitution protect the right of gay people to engage in consensual intimate relations in private?",
    prosecution: {
      name: "Michael Hardwick",
      argument:
        "A police officer entered my home and arrested me for consensual intimacy in my own bedroom. The right to privacy recognized in Griswold protects intimate conduct between consenting adults. The government has no business in our bedrooms.",
      favoredBy: "Democrat",
      stances: {
        GayRights: "For",
        Privacy: "For",
      },
    },
    defendant: {
      name: "Michael Bowers (State of Georgia)",
      argument:
        "Georgia's sodomy law reflects longstanding moral judgments that courts should not overturn. The Constitution contains no right to sodomy. Bowers v. Hardwick upholds a legitimate exercise of state police power that has existed since before the founding.",
      favoredBy: "Republican",
      stances: {
        GayRights: "Against",
        StatesRights: "For",
      },
    },
    historicalWinner: "Defendant",
  },
  {
    id: 25,
    name: "Romer v. Evans",
    year: 1996,
    caseType: "historical",
    primaryQuestion: "Does a state constitutional amendment barring all legal protections for gay people violate equal protection?",
    prosecution: {
      name: "Richard Evans et al.",
      argument:
        "Colorado's Amendment 2 doesn't just deny a benefit — it prohibits gay people from seeking any anti-discrimination protection at any level of government. Singling out a group for unique legal disadvantage violates the Equal Protection Clause.",
      favoredBy: "Democrat",
      stances: {
        GayRights: "For",
        RacialEquity: "For",
      },
    },
    defendant: {
      name: "Governor Roy Romer (State of Colorado)",
      argument:
        "The people of Colorado enacted this amendment through a legitimate democratic process. The state may decline to extend anti-discrimination protections to any group without violating equal protection. This is democratic self-governance, not discrimination.",
      favoredBy: "Republican",
      stances: {
        GayRights: "Against",
        StatesRights: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 26,
    name: "Lawrence v. Texas",
    year: 2003,
    caseType: "historical",
    primaryQuestion: "Does a Texas law criminalizing consensual same-sex intimacy between adults violate the Constitution?",
    prosecution: {
      name: "John Lawrence",
      argument:
        "The state entered my private home and arrested me for consensual intimacy with another adult. The liberty protected by the due process clause includes intimate personal choices. Criminalizing who we are violates our fundamental dignity as persons.",
      favoredBy: "Democrat",
      stances: {
        GayRights: "For",
        Privacy: "For",
      },
    },
    defendant: {
      name: "State of Texas",
      argument:
        "The state has authority to enact laws reflecting the moral judgments of its people. Bowers v. Hardwick upheld this exact kind of law just seventeen years ago. The Court should not overturn settled precedent based on shifting social attitudes.",
      favoredBy: "Republican",
      stances: {
        GayRights: "Against",
        StatesRights: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
  {
    id: 27,
    name: "Hammer v. Dagenhart",
    year: 1918,
    caseType: "historical",
    primaryQuestion: "Does the federal government have the power to regulate child labor within the states?",
    prosecution: {
      name: "Roland Dagenhart",
      argument:
        "The production of goods is a local matter for the states to regulate, not Congress. My sons have a right to work, and the federal government cannot use its power over interstate commerce to interfere with our private employment contracts.",
      favoredBy: "Republican",
      stances: {
        StatesRights: "For",
        PropertyRights: "For",
        EconomicRegulation: "Against",
        WorkersRights: "Against",
      },
    },
    defendant: {
      name: "W.C. Hammer",
      argument:
        "Child labor is an evil that affects the entire nation. If one state allows it to gain a competitive advantage, it forces others to follow. Congress must be able to ban products made by children from entering interstate commerce to protect national labor standards.",
      favoredBy: "Democrat",
      stances: {
        FederalPower: "For",
        WorkersRights: "For",
        EconomicRegulation: "For",
        SocialOrder: "For",
      },
    },
    historicalWinner: "Prosecution",
  },
];

// ────────────────────────────────────────────────────────────
// FICTIONAL CASES (10)
// ────────────────────────────────────────────────────────────

export const casesFictional: Case[] = [
  {
    id: 101,
    name: "Can I Copyright My Own Face?",
    caseType: "fictional",
    primaryQuestion: "Does a person own intellectual property rights to their own face?",
    prosecution: {
      name: "Brad Beautyman",
      argument:
        "My face is my brand. I have cultivated this jawline for 38 years. Anyone using my likeness in advertising without my consent owes me royalties, back-dated to my birth.",
      favoredBy: "Republican",
    },
    defendant: {
      name: "TotallyNotStalkingYou.com",
      argument:
        "You cannot copyright a human face. It is a face. It is attached to your head. You did not invent it. Your parents did not file IP paperwork at your birth. This is not a thing.",
      favoredBy: "Democrat",
      stances: {
        CorporatePower: "For",
      },
    },
  },
  {
    id: 102,
    name: "Should Guns Have the Right to Vote?",
    caseType: "fictional",
    primaryQuestion: "Are firearms entitled to constitutional protections as political actors?",
    prosecution: {
      name: "The National Firearms Advocacy Council",
      argument:
        "Corporations are people. Money is speech. By that logic, guns are at least as important as corporations. My AR-15 has opinions. It has expressed them loudly, several times.",
      favoredBy: "Republican",
      stances: {
        Guns: "For",
      },
    },
    defendant: {
      name: "The American People",
      argument:
        "Guns are objects. They are inert. They have no thoughts. They do not understand the concept of suffrage. This case should not exist. How did this get here. We are all very tired.",
      favoredBy: "Democrat",
      stances: {
        Guns: "Against",
        CorporatePower: "For",
      },
    },
  },
  {
    id: 103,
    name: "Can The Supreme Court Give Itself a Raise?",
    caseType: "fictional",
    primaryQuestion: "May the Supreme Court Justices vote to increase their own salaries mid-term?",
    prosecution: {
      name: "The Entire Supreme Court",
      argument:
        "The Constitution says our salaries cannot be reduced. It says nothing about them being raised. We have interpreted silence as consent. Also, have you seen the price of mahogany gavels lately?",
      favoredBy: "Republican",
      stances: {
        CourtAuthority: "For",
      },
    },
    defendant: {
      name: "Congress",
      argument:
        "You cannot vote for your own pay raise. The separation of powers means we control the budget. You are a court, not a union. Please stop. This is unprecedented in both directions.",
      favoredBy: "Democrat",
      stances: {
        CourtAuthority: "Against",
      },
    },
  },
  {
    id: 104,
    name: "Is Eating a Cheeseburger in Court Contempt?",
    caseType: "fictional",
    primaryQuestion: "Does consuming a cheeseburger during oral arguments constitute contempt of court?",
    prosecution: {
      name: "Chad McBurgerson",
      argument:
        "The Constitution guarantees my rights. Eating is a fundamental act of personhood. The right to eat is in the penumbra of the right to exist. You cannot imprison a man for his lunch.",
      favoredBy: "Democrat",
      stances: {
        SocialOrder: "Against",
      },
    },
    defendant: {
      name: "The United States Supreme Court",
      argument:
        "You brought a Whopper into this chamber. You ate it loudly during the Petitioner's argument. You winked at Justice Thomas when you offered him a fry. This is contempt. This is maximum contempt.",
      favoredBy: "Republican",
      stances: {
        CourtAuthority: "For",
        SocialOrder: "For",
      },
    },
  },
  {
    id: 105,
    name: "Do Dogs Deserve Public Defenders?",
    caseType: "fictional",
    primaryQuestion: "Must states provide legal representation for dogs accused of biting offenses?",
    prosecution: {
      name: "Biscuit J. Goodboy (via counsel)",
      argument:
        "My client cannot understand the charges against him. He does not know what a court is. He cannot participate meaningfully in his own defense. The 6th Amendment demands he be represented.",
      favoredBy: "Democrat",
      stances: {
        AnimalRights: "For",
        AccusedRights: "For",
      },
    },
    defendant: {
      name: "State of Ohio",
      argument:
        "He bit three mail carriers. He is a dog. Dogs do not have constitutional rights. He does not get a lawyer. He gets a kennel and a behavior evaluation. This is not Ratatouille.",
      favoredBy: "Republican",
      stances: {
        AnimalRights: "Against",
        AccusedRights: "Against",
      },
    },
  },
  {
    id: 106,
    name: "Can the Government Tax the Concept of Fun?",
    caseType: "fictional",
    primaryQuestion: "Does the federal government have the power to tax activities it deems excessively enjoyable?",
    prosecution: {
      name: "Internal Revenue Service",
      argument:
        "The 16th Amendment grants broad taxing power. Fun is a measurable benefit received by taxpayers. Using our FunScore™ algorithm, we have calculated your 2024 enjoyment at $47,000. Please remit.",
      favoredBy: "Democrat",
      stances: {
        Taxation: "For",
      },
    },
    defendant: {
      name: "Dave Normalson",
      argument:
        "I went to a barbecue. I watched some football. The government is calling this $47,000 of fun. I was at a work retreat for part of it. None of this was fun. This tax is unconstitutional and also personally insulting.",
      favoredBy: "Republican",
      stances: {
        Taxation: "Against",
      },
    },
  },
  {
    id: 107,
    name: "Should Billionaires Be a Protected Class?",
    caseType: "fictional",
    primaryQuestion: "Are billionaires entitled to special constitutional protections as a vulnerable minority group?",
    prosecution: {
      name: "Jeff Richguy IV",
      argument:
        "We face unprecedented discrimination. People look at us judgmentally. They are always talking about us. We cannot even buy a small Mediterranean nation without criticism. We are a persecuted class.",
      favoredBy: "Republican",
      stances: {
        SocialOrder: "For",
        RichPeople: "For",
      },
    },
    defendant: {
      name: "Everyone Else",
      argument:
        "You have seven yachts. One of them is a yacht for your other yacht. You paid less in taxes than your housekeeper. Protected class status is for vulnerable people. You are not vulnerable. Go away.",
      favoredBy: "Democrat",
      stances: {
        SocialOrder: "Against",
        RichPeople: "Against",
      },
    },
  },
  {
    id: 108,
    name: "Can I Claim My Cat as a Dependent?",
    caseType: "fictional",
    primaryQuestion: "Is a domestic cat a legal 'dependent' for federal income tax purposes?",
    prosecution: {
      name: "Margaret Whiskersworth",
      argument:
        "Princess Fluffernutter depends on me entirely for food, shelter, and emotional support. She cannot file taxes. She cannot earn income. She cannot legally enter a contract. She is dependent. QED.",
      favoredBy: "Democrat",
      stances: {
        AnimalRights: "For",
        Taxation: "Against",
      },
    },
    defendant: {
      name: "Internal Revenue Service",
      argument:
        "A cat is not a person. A cat is a cat. The tax code defines dependent. The definition requires the dependent to be a human being. We have checked. Princess Fluffernutter is not a human being.",
      favoredBy: "Republican",
      stances: {
        AnimalRights: "Against",
        Taxation: "For",
      },
    },
  },
  {
    id: 109,
    name: "Is Silence a Form of Perjury?",
    caseType: "fictional",
    primaryQuestion: "Can a witness be charged with perjury for refusing to answer a question?",
    prosecution: {
      name: "The Prosecution",
      argument:
        "He knew the answer. Not saying it was a deliberate falsehood by omission. Silence, in this context, is a lie. We can prove the lie exists in the silence between his words.",
      favoredBy: "Republican",
      stances: {
        AccusedRights: "Against",
      },
    },
    defendant: {
      name: "The Silent Witness",
      argument:
        "You cannot lie by saying nothing. That is literally the entire Fifth Amendment, which I am now invoking. I am saying nothing. I have the right to say nothing. I am doing it right now.",
      favoredBy: "Democrat",
      stances: {
        AccusedRights: "For",
      },
    },
  },
  {
    id: 110,
    name: "Is Vibing a Protected Activity?",
    caseType: "fictional",
    primaryQuestion: "Does the First Amendment protect the act of 'vibing' as a form of expressive conduct?",
    prosecution: {
      name: "Jaylen Vibesworth",
      argument:
        "Vibing is a form of expressive conduct. It communicates a state of peace, acceptance, and chill. As expressive conduct, it is protected speech under the First Amendment. You cannot arrest a vibe.",
      favoredBy: "Democrat",
    },
    defendant: {
      name: "City of Naperville",
      argument:
        "He was vibing in a restricted municipal zone at 2am. There was no music. There was no purpose. He was simply there, vibing, in a zone where vibing is expressly prohibited on the permit application.",
      favoredBy: "Republican",
    },
  },
  {
    id: 111,
    name: "Can I Sue the Algorithm for My Life Choices?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Can a social media platform be held liable for decisions made in response to its algorithmic recommendations?",
    prosecution: {
      name: "Darren Scrollcraft",
      argument:
        "The algorithm showed me rage content for 14 consecutive hours. It reshaped my worldview, cost me three relationships, and led directly to my purchase of a tactical flashlight I did not need. This was not a choice. This was a funnel.",
      favoredBy: "Democrat",
    },
    defendant: {
      name: "TikTok, LLC",
      argument:
        "You scrolled. Nobody held your phone. We did not force you to watch. We merely suggested. You continued. You scrolled again. You are a free adult with a functioning thumb. We are merely a service.",
      favoredBy: "Republican",
    },
  },
  {
    id: 112,
    name: "Is Blocking Someone Online a Restraining Order?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Does blocking a person across multiple social media platforms constitute a legally enforceable restraining order?",
    prosecution: {
      name: "Gerald T. Unfollowed",
      argument:
        "She blocked me on seven platforms sequentially over three days. That is a pattern. That is a deliberate, coordinated campaign of legal avoidance. I want to subpoena her block list as evidence.",
      favoredBy: "Republican",
    },
    defendant: {
      name: "Tracy Blockworth",
      argument:
        "No. Absolutely not. I pressed a button. That button is called 'Block.' It is not a court order. It is a feature. I should not be in a courtroom right now. I went to law school and I am in this courtroom right now.",
      favoredBy: "Democrat",
    },
  },
  {
    id: 113,
    name: "Are Terms of Service Binding If Nobody Has Read Them?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Can a company enforce a 47,000-word terms of service agreement that no reasonable person has ever fully read?",
    prosecution: {
      name: "PlatformGiant, Inc.",
      argument:
        "The user checked the box. They pressed 'I Agree.' The terms were available online. We own their data, their browsing habits, their location history, and their firstborn's metadata in perpetuity. It's all in section 47. Subsection C.",
      favoredBy: "Republican",
    },
    defendant: {
      name: "Dave Normalson",
      argument:
        "It was 47,000 words. It was updated twelve times. There was no negotiation. There was a pop-up and a button. There was no meeting of the minds. You cannot consent to something you cannot read in a human lifetime.",
      favoredBy: "Democrat",
    },
  },
  {
    id: 114,
    name: "Can the President Pardon the Concept of Guilt?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Does the presidential pardon power extend to abstract legal concepts, including criminal culpability itself?",
    prosecution: {
      name: "The Executive Branch",
      argument:
        "The pardon power is broad and plenary. If you can pardon persons, you can pardon actions. If you can pardon actions, you can pardon states of mind. We are simply exploring Article II to its outer limits. This is very legal and very fine.",
      favoredBy: "Republican",
    },
    defendant: {
      name: "The Constitution Of The United States",
      argument:
        "You are describing a man attempting to pardon the philosophical concept of wrongdoing. The pardon power requires an individual. We have checked. 'Guilt' is not an individual. We are not going to do this.",
      favoredBy: "Democrat",
    },
  },
  {
    id: 115,
    name: "Is an Autonomous Drone Guilty of Trespassing?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Can an AI-piloted autonomous drone be charged with criminal trespass independent of its owner?",
    prosecution: {
      name: "Gerald Hoverdislike",
      argument:
        "The drone entered my airspace 47 times. It photographed my pool. It hovered outside my bedroom window at dusk. I want a criminal conviction. I want the drone to do time.",
      favoredBy: "Republican",
    },
    defendant: {
      name: "SkyViews Autonomous Media, Inc.",
      argument:
        "The drone is a machine. It cannot be found guilty of a crime. It has no intent. The pilot lives in another jurisdiction. The instructions were lawfully issued. You are asking us to imprison a propeller.",
      favoredBy: "Democrat",
    },
  },
  {
    id: 116,
    name: "Is an AI-Generated Lawyer Practicing Without a License?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Does using an AI system to draft, argue, and file legal documents constitute unauthorized practice of law?",
    prosecution: {
      name: "The State Bar Association",
      argument:
        "Law is a licensed profession. This AI passed no bar exam. It was not admitted to practice. It has no professional liability. It is practicing law and it has no soul, no malpractice insurance, and no ability to be disbarred.",
      favoredBy: "Republican",
    },
    defendant: {
      name: "The AI's Clients",
      argument:
        "It costs $800 an hour to speak to a licensed attorney for 30 minutes. The AI was correct 94% of the time, available at 3am, and never billed for 'reviewing documents.' Access to justice should not require a credit score.",
      favoredBy: "Democrat",
    },
  },
  {
    id: 117,
    name: "Can My Emotional Support Animal Testify in Court?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Is a registered emotional support animal a competent fact witness in a civil proceeding where it was present at the alleged incident?",
    prosecution: {
      name: "Plaintiff's Counsel",
      argument:
        "Mr. Peanutbutter was present at the incident. He observed everything. He is alert, attentive, and motivated by kibble rather than perjury. He cannot lie. He literally cannot lie. He should testify.",
      favoredBy: "Democrat",
    },
    defendant: {
      name: "Opposing Counsel",
      argument:
        "He is a golden retriever. He cannot swear an oath. He does not understand the concept of an oath. He just knocked over my water glass. I object on twelve grounds, including six I invented this morning.",
      favoredBy: "Republican",
    },
  },
  {
    id: 118,
    name: "Is Deleting Your Browser History Obstruction of Justice?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Does routinely clearing your browser history constitute obstruction of justice if you were later placed under investigation?",
    prosecution: {
      name: "Federal Prosecutor",
      argument:
        "The defendant cleared his browser history every night at 11:59 PM for four consecutive years, including the night in question. That is not hygiene. That is premeditated evidence destruction. That is consciousness of guilt.",
      favoredBy: "Republican",
    },
    defendant: {
      name: "Regular Person",
      argument:
        "Everyone does this. I do this. You probably do this. It is a normal human computing habit. We are not legally required to archive our embarrassing internet searches for federal investigators. This is incredible.",
      favoredBy: "Democrat",
    },
  },
  {
    id: 119,
    name: "Can Congress Declare a Meme Illegal?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Does Congress have the constitutional authority to legislate against specific memes as a form of political disinformation?",
    prosecution: {
      name: "Congressional Disinformation Task Force",
      argument:
        "These images were used to spread deliberately false information about election dates and polling procedures. They caused measurable voter suppression. Congress has both the authority and the obligation to act.",
      favoredBy: "Democrat",
    },
    defendant: {
      name: "First Amendment Absolutist",
      argument:
        "It's a picture of a dog with text on it. You want to imprison Americans for making a picture of a dog with text on it. I have printed the First Amendment and I am physically holding it up right now.",
      favoredBy: "Republican",
    },
  },
  {
    id: 120,
    name: "Does the Second Amendment Cover Emotional Support Weapons?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Is a firearm a constitutionally protected medical necessity if its owner claims it provides emotional support?",
    prosecution: {
      name: "Kyle Triggerman",
      argument:
        "My firearm provides measurable emotional support. I have submitted a therapist's note, my own note to myself, and a note from my gun. Without it, I cannot function. This is a medical necessity protected by the Second Amendment.",
      favoredBy: "Republican",
    },
    defendant: {
      name: "State of California",
      argument:
        "You have filed this claim four times. The previous three were denied. The gun does not love you back. Emotional support designations apply to animals, not to firearms. Please leave. We have other cases.",
      favoredBy: "Democrat",
    },
  },
];

export const cases: Case[] = [...casesHistorical, ...casesFictional];
