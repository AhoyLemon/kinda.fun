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
    },
    defendant: {
      name: "James Madison",
      argument:
        "The law granting you that power was itself unconstitutional. You can't give the Supreme Court authority the Constitution doesn't. Also, we just don't want to.",
      favoredBy: "Democratic-Republican",
    },
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
    },
    defendant: {
      name: "Board of Education of Topeka",
      argument:
        "Separate but equal has been settled law since Plessy v. Ferguson. The schools comply with that standard. This is a local education matter and the Court should stay out of it.",
      favoredBy: "Republican",
    },
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
    },
    defendant: {
      name: "Henry Wade",
      argument:
        "The state of Texas has a compelling interest in protecting potential life. This is a matter for legislatures, not courts. The Constitution says nothing about abortion because it doesn't exist.",
      favoredBy: "Republican",
    },
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
    },
    defendant: {
      name: "Federal Election Commission",
      argument:
        "Unlimited corporate spending in elections corrupts democracy. Congress has the authority and the obligation to prevent wealthy interests from purchasing election outcomes.",
      favoredBy: "Democrat",
    },
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
    },
    defendant: {
      name: "State of Arizona",
      argument:
        "The defendant confessed voluntarily. We got a dangerous criminal off the streets. Requiring police to read a speech before every arrest will handcuff law enforcement and let guilty people go free.",
      favoredBy: "Republican",
    },
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
    },
    defendant: {
      name: "Al Gore",
      argument:
        "Every vote must be counted to determine the true winner of a democratic election. The recount is the process working as intended. Also I won the popular vote by half a million votes.",
      favoredBy: "Democrat",
    },
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
    },
    defendant: {
      name: "Richard Hodges",
      argument: "Marriage has always been defined as between a man and a woman. Redefining it should be done by legislatures, not courts. Also: tradition.",
      favoredBy: "Republican",
    },
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
    },
    defendant: {
      name: "United States Government",
      argument:
        "Military necessity and national security justify extraordinary measures. The Commander-in-Chief's war powers allow restrictions on civil liberties when the nation faces existential threat. We are at war.",
      favoredBy: "Republican",
    },
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
    },
    defendant: {
      name: "John Sanford",
      argument:
        "The Constitution, as written in 1787, did not consider Black people as citizens. Scott is property. Property cannot sue. The court has no jurisdiction here, and slavery is here to stay.",
      favoredBy: "Whig",
    },
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
    },
    defendant: {
      name: "United States",
      argument:
        "Speech that presents a 'clear and present danger' can be restricted. Encouraging military resistance during active wartime is not protected expression — it is sabotage with better typography.",
      favoredBy: "Republican",
    },
  },
];

// ────────────────────────────────────────────────────────────
// FICTIONAL CASES (10)
// ────────────────────────────────────────────────────────────

export const casesFictional: Case[] = [
  {
    id: 11,
    name: "Can I Copyright My Own Face?",
    year: undefined,
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
    },
  },
  {
    id: 12,
    name: "Should Guns Have the Right to Vote?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Are firearms entitled to constitutional protections as political actors?",
    prosecution: {
      name: "The National Firearms Advocacy Council",
      argument:
        "Corporations are people. Money is speech. By that logic, guns are at least as important as corporations. My AR-15 has opinions. It has expressed them loudly, several times.",
      favoredBy: "Republican",
    },
    defendant: {
      name: "The American People",
      argument:
        "Guns are objects. They are inert. They have no thoughts. They do not understand the concept of suffrage. This case should not exist. How did this get here. We are all very tired.",
      favoredBy: "Democrat",
    },
  },
  {
    id: 13,
    name: "Can The Supreme Court Give Itself a Raise?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "May the Supreme Court Justices vote to increase their own salaries mid-term?",
    prosecution: {
      name: "The Entire Supreme Court",
      argument:
        "The Constitution says our salaries cannot be reduced. It says nothing about them being raised. We have interpreted silence as consent. Also, have you seen the price of mahogany gavels lately?",
      favoredBy: "Republican",
    },
    defendant: {
      name: "Congress",
      argument:
        "You cannot vote for your own pay raise. The separation of powers means we control the budget. You are a court, not a union. Please stop. This is unprecedented in both directions.",
      favoredBy: "Democrat",
    },
  },
  {
    id: 14,
    name: "Is Eating a Cheeseburger in Court Contempt?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Does consuming a cheeseburger during oral arguments constitute contempt of court?",
    prosecution: {
      name: "Chad McBurgerson",
      argument:
        "The Constitution guarantees my rights. Eating is a fundamental act of personhood. The right to eat is in the penumbra of the right to exist. You cannot imprison a man for his lunch.",
      favoredBy: "Democrat",
    },
    defendant: {
      name: "The United States Supreme Court",
      argument:
        "You brought a Whopper into this chamber. You ate it loudly during the Petitioner's argument. You winked at Justice Thomas when you offered him a fry. This is contempt. This is maximum contempt.",
      favoredBy: "Republican",
    },
  },
  {
    id: 15,
    name: "Do Dogs Deserve Public Defenders?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Must states provide legal representation for dogs accused of biting offenses?",
    prosecution: {
      name: "Biscuit J. Goodboy (via counsel)",
      argument:
        "My client cannot understand the charges against him. He does not know what a court is. He cannot participate meaningfully in his own defense. The 6th Amendment demands he be represented.",
      favoredBy: "Democrat",
    },
    defendant: {
      name: "State of Ohio",
      argument:
        "He bit three mail carriers. He is a dog. Dogs do not have constitutional rights. He does not get a lawyer. He gets a kennel and a behavior evaluation. This is not Ratatouille.",
      favoredBy: "Republican",
    },
  },
  {
    id: 16,
    name: "Can the Government Tax the Concept of Fun?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Does the federal government have the power to tax activities it deems excessively enjoyable?",
    prosecution: {
      name: "Internal Revenue Service",
      argument:
        "The 16th Amendment grants broad taxing power. Fun is a measurable benefit received by taxpayers. Using our FunScore™ algorithm, we have calculated your 2024 enjoyment at $47,000. Please remit.",
      favoredBy: "Democrat",
    },
    defendant: {
      name: "Dave Normalson",
      argument:
        "I went to a barbecue. I watched some football. The government is calling this $47,000 of fun. I was at a work retreat for part of it. None of this was fun. This tax is unconstitutional and also personally insulting.",
      favoredBy: "Republican",
    },
  },
  {
    id: 17,
    name: "Should Billionaires Be a Protected Class?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Are billionaires entitled to special constitutional protections as a vulnerable minority group?",
    prosecution: {
      name: "Jeff Richguy IV",
      argument:
        "We face unprecedented discrimination. People look at us judgmentally. They are always talking about us. We cannot even buy a small Mediterranean nation without criticism. We are a persecuted class.",
      favoredBy: "Republican",
    },
    defendant: {
      name: "Everyone Else",
      argument:
        "You have seven yachts. One of them is a yacht for your other yacht. You paid less in taxes than your housekeeper. Protected class status is for vulnerable people. You are not vulnerable. Go away.",
      favoredBy: "Democrat",
    },
  },
  {
    id: 18,
    name: "Can I Claim My Cat as a Dependent?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Is a domestic cat a legal 'dependent' for federal income tax purposes?",
    prosecution: {
      name: "Margaret Whiskersworth",
      argument:
        "Princess Fluffernutter depends on me entirely for food, shelter, and emotional support. She cannot file taxes. She cannot earn income. She cannot legally enter a contract. She is dependent. QED.",
      favoredBy: "Democrat",
    },
    defendant: {
      name: "Internal Revenue Service",
      argument:
        "A cat is not a person. A cat is a cat. The tax code defines dependent. The definition requires the dependent to be a human being. We have checked. Princess Fluffernutter is not a human being.",
      favoredBy: "Republican",
    },
  },
  {
    id: 19,
    name: "Is Silence a Form of Perjury?",
    year: undefined,
    caseType: "fictional",
    primaryQuestion: "Can a witness be charged with perjury for refusing to answer a question?",
    prosecution: {
      name: "The Prosecution",
      argument:
        "He knew the answer. Not saying it was a deliberate falsehood by omission. Silence, in this context, is a lie. We can prove the lie exists in the silence between his words.",
      favoredBy: "Republican",
    },
    defendant: {
      name: "The Silent Witness",
      argument:
        "You cannot lie by saying nothing. That is literally the entire Fifth Amendment, which I am now invoking. I am saying nothing. I have the right to say nothing. I am doing it right now.",
      favoredBy: "Democrat",
    },
  },
  {
    id: 20,
    name: "Is Vibing a Protected Activity?",
    year: undefined,
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
];

export const cases: Case[] = [...casesHistorical, ...casesFictional];
