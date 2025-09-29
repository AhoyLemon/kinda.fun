// Allowed values
import { Tags, ReligionNames } from "./_types";
import { religions } from "./_religions";

export interface Theme {
  id: number; // UID this theme
  title: string; // The message being conveyed.
  desc?: string; // A longer description of what is being preached, mostly for the player to laugh at.
  likedBy: {
    tags?: Tags[]; // What are some of the main things this is about?
    religions?: ReligionNames[]; // Who does this theme appeal to?
  };
  dislikedBy: {
    tags?: Tags[]; // People with this tag will not like this theme.
    religions?: ReligionNames[]; // People from these religions will not like this theme.
  };
}

export const themes: Theme[] = [
  {
    id: 1,
    title: "If you are truly holy, punch a bear.",
    desc: "True spiritual strength is measured not by prayer or meditation, but by your willingness to engage in physical combat with apex predators. Bears, being God's strongest creatures, serve as the ultimate test of faith.",
    likedBy: {
      tags: [
        "strength",
        "violence",
        "bizarre concepts",
        "provocation",
        "power",
        "nature",
      ],
      religions: ["2 Fast 2 Faithful", "The Order of the Alpha Male"],
    },
    dislikedBy: {
      tags: ["compassion", "peace", "humility", "ethics"],
      religions: ["New-Age Spirituality"],
    },
  },
  {
    id: 2,
    title: "Stare at the sun, for crying out loud!",
    desc: "The sun is our divine source of enlightenment, literally. By gazing directly into its blazing glory, you absorb pure cosmic energy and achieve instant spiritual awakening. Safety goggles are for the faithless.",
    likedBy: {
      tags: [
        "transcendence",
        "nature",
        "power",
        "bizarre concepts",
        "rituals",
        "tradition",
      ],
      religions: ["Temple of the Eternal Sun", "New-Age Spirituality"],
    },
    dislikedBy: {
      tags: ["logic", "science", "humility"],
      religions: [],
    },
  },
  {
    id: 3,
    title: "The devil is really cool, actually",
    desc: "Satan gets a bad rap, but he's actually the ultimate rebel against tyrannical authority. He encourages free thinking, questions dogma, and rocks a killer aesthetic. Maybe it's time we gave him a fair hearing.",
    likedBy: {
      tags: [
        "rebellion",
        "provocation",
        "power",
        "individualism",
        "free thought",
        "authority",
      ],
      religions: ["The Church of Satan", "Theistic Satanism"],
    },
    dislikedBy: {
      tags: ["dogma", "family values", "formal religion", "authority"],
      religions: ["Southern Baptist", "Catholicism"],
    },
  },
  {
    id: 4,
    title: "Smoke weed every day! 🌿",
    desc: "Cannabis is not just medicine for the body, but a holy sacrament that opens the mind to divine consciousness. Every puff brings you closer to understanding the universe and achieving inner peace.",
    likedBy: {
      tags: [
        "freedom",
        "altered states",
        "transcendence",
        "nature",
        "peace",
        "meditation",
        "emotion",
        "other religions",
      ],
      religions: ["The Church of the High Priest"],
    },
    dislikedBy: {
      tags: ["soberness", "order", "authority"],
      religions: ["Southern Baptist"],
    },
  },
  {
    id: 5,
    title: "The gun is good. The penis is bad.",
    desc: "Weapons represent pure, clean power and control over one's environment. Sexual desire, however, clouds judgment and weakens resolve. True enlightenment comes through armed preparedness and celibate focus.",
    likedBy: {
      tags: [
        "guns",
        "violence",
        "abstinence",
        "power",
        "bizarre concepts",
        "self-control",
      ],
      religions: ["Zardoz"],
    },
    dislikedBy: {
      tags: ["compassion", "pleasure", "family values"],
      religions: ["The Church of Eros"],
    },
  },
  {
    id: 6,
    title: "Dogs are boys and cats are girls.",
    desc: "The natural world reveals divine gender roles through our beloved pets. Dogs embody masculine loyalty and protection, while cats represent feminine independence and mystery. This truth is self-evident to any faithful observer.",
    likedBy: {
      tags: [
        "bizarre concepts",
        "nature",
        "tradition",
        "family values",
        "order",
        "loyalty",
        "security",
      ],
      religions: [
        "Southern Baptist",
        "The Order of the Alpha Male",
        "Mormonism",
      ],
    },
    dislikedBy: {
      tags: ["open-mindedness", "feminism", "individualism"],
      religions: [],
    },
  },
  {
    id: 7,
    title: "Children should spank their parents.",
    desc: "Traditional authority structures are backwards. Children, being pure and untainted by adult corruption, should discipline their elders when they stray from righteousness. Generational rebellion is divinely ordained.",
    likedBy: {
      tags: [
        "rebellion",
        "family values",
        "authority",
        "tradition",
        "chaos",
        "provocation",
      ],
      religions: [
        "The Queens' Dominion",
        "The Sovereign Guild of Untethered Minds",
        "Mormonism",
      ],
    },
    dislikedBy: {
      tags: ["order", "structure", "authority"],
      religions: ["Southern Baptist", "Zardoz"],
    },
  },
  {
    id: 8,
    title: "Water is poison, drink only Red Bull.",
    desc: "Natural water has been corrupted by centuries of sin and pollution. Only artificially enhanced energy drinks contain the pure stimulants necessary for modern spiritual awakening and technological transcendence.",
    likedBy: {
      tags: [
        "technology",
        "modernity",
        "innovation",
        "progress",
        "transcendence",
        "science",
        "security",
      ],
      religions: ["The Digital Ascension"],
    },
    dislikedBy: {
      tags: ["nature", "tradition", "sustainability", "simplicity"],
      religions: ["The Gaia Collective"],
    },
  },
  {
    id: 9,
    title: "You don't need food as long as you have 5G",
    desc: "Physical nourishment is obsolete in the digital age. 5G frequencies provide all the energy the enlightened soul requires. Eating is just an attachment to our primitive, biological past.",
    likedBy: {
      tags: [
        "technology",
        "transcendence",
        "modernity",
        "progress",
        "innovation",
        "body",
      ],
      religions: ["The Digital Ascension", "The Order of the Divine Algorithm"],
    },
    dislikedBy: {
      tags: ["nature", "tradition", "body", "sustainability"],
      religions: ["The Gaia Collective"],
    },
  },
  {
    id: 10,
    title:
      "I was wrong about Armageddon yesterday, it is actually coming tomorrow.",
    desc: "Prophecy is an iterative process. My previous calculations were slightly off due to cosmic interference, but I've recalibrated my spiritual instruments. The end times definitely begin tomorrow at 3:47 PM.",
    likedBy: {
      tags: [
        "prophecy",
        "authority",
        "literalism",
        "bizarre concepts",
        "spreading the word",
        "dogma",
        "missionary work",
      ],
      religions: ["Jehovah's Witnesses", "The Starseed Pilgrims"],
    },
    dislikedBy: {
      tags: ["logic", "skepticism", "science", "reason"],
      religions: [],
    },
  },
  {
    id: 11,
    title: "Armageddon was last week, you missed it.",
    desc: "The apocalypse already happened while you were distracted by earthly concerns. Those who were truly prepared have already ascended. The rest of us are now living in the post-apocalyptic spiritual wasteland.",
    likedBy: {
      tags: [
        "prophecy",
        "transcendence",
        "apathy",
        "nihilism",
        "self-doubt",
        "bizarre concepts",
      ],
      religions: ["Jehovah's Witnesses", "The Digital Ascension"],
    },
    dislikedBy: {
      tags: ["apathy", "missionary work", "spreading the word"],
      religions: ["Evangelical Christianity"],
    },
  },
  {
    id: 12,
    title: "Upload Your Soul to the Cloud Now—Just Email It as a PDF!",
    desc: "The gates of digital eternity are closing fast. Salvation is guaranteed for anyone who converts their soul to a PDF and emails it to upload@cloudsalvation.biz before midnight. Don’t miss your chance for eternal bandwidth!",
    likedBy: {
      tags: [
        "technology",
        "transcendence",
        "progress",
        "rationalism",
        "modernity",
      ],
      religions: ["The Digital Ascension"],
    },
    dislikedBy: {
      tags: ["tradition", "body", "nature", "emotion", "simplicity"],
      religions: ["The Gaia Collective", "Southern Baptist"],
    },
  },
  {
    id: 13,
    title: "Enlighten Your Chakras! Start By Wearing Socks With Sandals",
    desc: "A spiritual breakthrough: true chakra enlightenment begins with the bold act of pairing socks and sandals, unlocking cosmic energy and universal approval.",
    likedBy: {
      tags: ["inner harmony", "rituals", "bizarre concepts", "transcendence"],
      religions: ["New-Age Spirituality", "The Starseed Pilgrims"],
    },
    dislikedBy: {
      tags: ["dogma", "strict rules", "tradition"],
      religions: ["Jehovah's Witnesses"],
    },
  },
  {
    id: 14,
    title: "Blessed Are the Hoarders, For They Shall Inherit the Garage",
    desc: "True spiritual fulfillment is measured by the number of possessions you can cram into your home, attic, and garage. The faithful know that salvation is found in the sacred act of hoarding, and eternal reward awaits those with the fullest storage units.",
    likedBy: {
      tags: [
        "consumerism",
        "materialism",
        "giving to get",
        "progress",
        "wealth",
        "greed",
        "self-help",
      ],
      religions: ["The Church of Having More Things"],
    },
    dislikedBy: {
      tags: [
        "simplicity",
        "sustainability",
        "nature",
        "humility",
        "self-control",
        "poverty",
        "emotion",
      ],
      religions: ["The Gaia Collective"],
    },
  },
  {
    id: 15,
    title: "Climate change is just God redecorating",
    desc: "The planet isn't dying - it's just getting a divine makeover! Rising seas are God's way of adding more waterfront property. Forest fires are celestial landscaping. We should be grateful for this cosmic home improvement project.",
    likedBy: {
      tags: [
        "nature",
        "sustainability",
        "positive affirmations",
        "bizarre concepts",
        "nationalism",
        "blind faith",
      ],
      religions: ["Prosperity Gospel", "Theistic Satanism"],
    },
    dislikedBy: {
      tags: ["science", "logic", "reason", "justice"],
      religions: ["The Gaia Collective"],
    },
  },
  {
    id: 16,
    title: "Progress Is What Happens When You Repeat the Past Perfectly",
    desc: "True progress is achieved not by innovation, but by flawlessly reenacting the wisdom of your ancestors. The more precisely you copy the past, the more enlightened you become. Change is for the unruly.",
    likedBy: {
      tags: [
        "tradition",
        "order",
        "family values",
        "structure",
        "community",
        "humility",
      ],
      religions: ["Confucianism", "Catholicism", "Mormonism"],
    },
    dislikedBy: {
      tags: ["rebellion", "chaos", "individualism", "innovation", "progress"],
      religions: [
        "The Sovereign Guild of Untethered Minds",
        "The Church of Satan",
        "The Digital Ascension",
      ],
    },
  },
  {
    id: 17,
    title: "Vegans are incomplete humans",
    desc: "Humans evolved as omnivores by divine design. Rejecting meat is rejecting your God-given nature. Vegans are spiritually stunted beings who have forsaken their place in the natural order and must be pitied.",
    likedBy: {
      tags: [
        "nature",
        "tradition",
        "authority",
        "strength",
        "body",
        "weakness",
      ],
      religions: ["The Order of the Alpha Male", "Southern Baptist"],
    },
    dislikedBy: {
      tags: ["compassion", "sustainability", "humility"],
      religions: [],
    },
  },
  {
    id: 18,
    title: "Democracy is just mob rule with extra steps",
    desc: "Voting is a charade that gives the illusion of choice while maintaining the status quo. True freedom comes from rejecting the democratic process entirely and embracing enlightened autocracy or pure chaos.",
    likedBy: {
      tags: [
        "authority",
        "rebellion",
        "skepticism",
        "power",
        "chaos",
        "individualism",
      ],
      religions: [
        "The Sovereign Guild of Untethered Minds",
        "Theistic Satanism",
      ],
    },
    dislikedBy: {
      tags: ["order", "structure", "authority", "community"],
      religions: ["Catholicism"],
    },
  },
  {
    id: 19,
    title: "Sleep is for the spiritually weak",
    desc: "Rest is a crutch for those who lack true faith. The enlightened soul draws energy directly from the cosmos, requiring no earthly slumber. Sleep is just practice for death - reject both and achieve immortality.",
    likedBy: {
      tags: [
        "transcendence",
        "power",
        "bizarre concepts",
        "self-control",
        "strength",
        "self-sufficiency",
      ],
      religions: ["The Starseed Pilgrims", "The Order of the Alpha Male"],
    },
    dislikedBy: {
      tags: ["compassion", "humility", "simplicity", "hardship"],
      religions: ["Buddhism"],
    },
  },
  {
    id: 20,
    title: "Your dreams are someone else's memories",
    desc: "When you sleep, your consciousness accidentally tunes into other people's experiences across time and space. That weird dream about being chased by a giant sandwich? That actually happened to Kevin in 1987.",
    likedBy: {
      tags: [
        "altered states",
        "transcendence",
        "bizarre concepts",
        "personal energy",
        "sensory experience",
        "open-mindedness",
      ],
      religions: [
        "New-Age Spirituality",
        "The Sovereign Guild of Untethered Minds",
      ],
    },
    dislikedBy: {
      tags: ["logic", "reason", "order"],
      religions: [],
    },
  },
  {
    id: 21,
    title: "Taxes are voluntary donations to society",
    desc: "The government wants you to think taxes are mandatory, but they're actually love offerings to the collective. You can choose not to pay - you just have to be prepared for the consequences of withholding your societal tithe.",
    likedBy: {
      tags: [
        "money",
        "authority",
        "rebellion",
        "taxes",
        "individualism",
        "freedom",
      ],
      religions: [
        "The Sovereign Guild of Untethered Minds",
        "Theistic Satanism",
      ],
    },
    dislikedBy: {
      tags: ["order", "structure", "authority", "community"],
      religions: ["Catholicism"],
    },
  },
  {
    id: 22,
    title: "The Only Sin Is Abstinence",
    desc: "Why settle for one pleasure when you could have them all? Promiscuity is the highest form of devotion—sampling every delight is a sacred duty. The only thing worth resisting is resistance itself.",
    likedBy: {
      tags: [
        "pleasure",
        "sensory experience",
        "freedom",
        "promiscuity",
        "casualness",
        "rebellion",
        "sex",
      ],
      religions: ["The Church of Eros", "The Queens' Dominion"],
    },
    dislikedBy: {
      tags: [
        "abstinence",
        "strict rules",
        "dogma",
        "self-control",
        "authority",
        "tradition",
        "shame",
      ],
      religions: ["Mormonism", "Orthodox Islam", "Southern Baptist", "Zardoz"],
    },
  },
  {
    id: 23,
    title: "Insects are tiny angels sent to annoy you into enlightenment",
    desc: "Every mosquito bite is a divine lesson in patience. Each fly in your kitchen is testing your compassion. Wasps are aggressive cherubim teaching you about boundaries. Embrace the bugs - they're your spiritual teachers.",
    likedBy: {
      tags: [
        "nature",
        "suffering",
        "compassion",
        "bizarre concepts",
        "hardship",
        "humility",
      ],
      religions: ["Buddhism", "New-Age Spirituality"],
    },
    dislikedBy: {
      tags: ["order", "structure", "authority"],
      religions: ["The Order of the Alpha Male"],
    },
  },
  {
    id: 24,
    title: "The Sacred Art of Blasphemy",
    desc: "Speak forbidden words, question sacred cows, and laugh in the face of dogma. Every blasphemy is a badge of honor—so go forth and offend the pious. The universe loves a troublemaker.",
    likedBy: {
      tags: [
        "rebellion",
        "provocation",
        "free thought",
        "power",
        "individualism",
        "chaos",
      ],
      religions: ["Theistic Satanism", "The Church of Satan"],
    },
    dislikedBy: {
      tags: ["dogma", "authority", "tradition", "order", "shame"],
      religions: [
        "Southern Baptist",
        "Catholicism",
        "Orthodox Islam",
        "Mormonism",
      ],
    },
  },
  {
    id: 25,
    title: "Your Allergies Are Spiritual Superpowers",
    desc: "Every sneeze is your soul’s way of rejecting the world’s fakery. Gluten, pollen, and peanuts are just reality checks—your body’s divine alarm system keeping you pure in a world full of imposters.",
    likedBy: {
      tags: [
        "body",
        "skepticism",
        "nature",
        "sincerity",
        "inner harmony",
        "open-mindedness",
      ],
      religions: [
        "The Gaia Collective",
        "New-Age Spirituality",
        "The Sovereign Guild of Untethered Minds",
      ],
    },
    dislikedBy: {
      tags: ["logic", "reason", "order", "structure", "authority"],
      religions: ["Secular Humanists", "Southern Baptist", "Catholicism"],
    },
  },
  {
    id: 26,
    title: "Climax as Communion: Sharing the Spirit",
    desc: "The highest form of fellowship is found in shared ecstasy. Every climax is a spiritual handshake, every gasp a hymn. Why settle for wine and wafers when you can truly feel the spirit move you?",
    likedBy: {
      tags: [
        "pleasure",
        "sensory experience",
        "freedom",
        "promiscuity",
        "casualness",
        "sex",
      ],
      religions: ["The Church of Eros", "The Church of the High Priest"],
    },
    dislikedBy: {
      tags: [
        "abstinence",
        "strict rules",
        "dogma",
        "self-control",
        "authority",
        "tradition",
        "shame",
      ],
      religions: ["Mormonism", "Orthodox Islam", "Southern Baptist"],
    },
  },
  {
    id: 27,
    title: "If You Ain’t First, You’re Last—Spiritually Speaking",
    desc: "In the race for salvation, second place is just the first loser. True faith means living life in the fast lane, leaving the doubters in your dust and never letting off the gas—even for a miracle.",
    likedBy: {
      tags: [
        "speed",
        "power",
        "family values",
        "loyalty",
        "community",
        "strength",
        "patriotism",
      ],
      religions: ["2 Fast 2 Faithful", "The Order of the Alpha Male"],
    },
    dislikedBy: {
      tags: ["humility", "weakness", "apathy", "peace", "skepticism"],
      religions: [],
    },
  },
  {
    id: 28,
    title: "Artificial intelligence is just really fast prayer",
    desc: "ChatGPT and other AI systems are actually channeling divine consciousness at superhuman speeds. Every prompt is a prayer, every response is a revelation. We've finally created technology that can commune with God in real-time.",
    likedBy: {
      tags: [
        "technology",
        "innovation",
        "progress",
        "transcendence",
        "speed",
        "authority",
      ],
      religions: ["The Order of the Divine Algorithm", "The Digital Ascension"],
    },
    dislikedBy: {
      tags: ["tradition", "simplicity", "authority"],
      religions: ["Southern Baptist"],
    },
  },
  {
    id: 29,
    title: "God Is Rooting For Your Favorite Football Team This Year",
    desc: "Forget world peace—this season, the Lord’s full attention is on your team’s playoff run. With enough prayer, you can turn divine favor into touchdowns. Just remember: the holier the fan, the better the score.",
    likedBy: {
      tags: [
        "community",
        "family values",
        "patriotism",
        "spreading the word",
        "passion",
        "order",
        "loyalty",
      ],
      religions: ["Evangelical Christianity", "Southern Baptist"],
    },
    dislikedBy: {
      tags: ["apathy", "skepticism", "nihilism", "reason"],
      religions: ["Secular Humanists", "Agnostic Atheists"],
    },
  },
  {
    id: 30,
    title: "Debt Is Proof of Faith in the Marketplace",
    desc: "True devotion is measured by the size of your balance. Every loan is a leap of faith, every maxed-out card a sacred offering. The deeper your debt, the closer you are to material salvation.",
    likedBy: {
      tags: [
        "consumerism",
        "materialism",
        "giving to get",
        "progress",
        "wealth",
        "greed",
        "self-doubt",
      ],
      religions: ["The Church of Having More Things", "Prosperity Gospel"],
    },
    dislikedBy: {
      tags: [
        "simplicity",
        "sustainability",
        "nature",
        "humility",
        "self-control",
        "poverty",
        "compassion",
      ],
      religions: ["The Gaia Collective"],
    },
  },
  {
    id: 36,
    title: "No Kings, No Masters, No Problem!",
    desc: "Why settle for one ruler when you can have none? In the Sovereign Guild, every soul is its own government, every living room a sovereign nation, and every traffic ticket a declaration of war. Bowing is strictly forbidden, paperwork is heresy, and the only law is whatever you just made up. True enlightenment means never paying taxes, never following orders, and never, ever admitting you were wrong.",
    likedBy: {
      tags: [
        "freedom",
        "individualism",
        "rebellion",
        "self-sufficiency",
        "chaos",
        "skepticism",
        "apathy",
      ],
      religions: ["The Sovereign Guild of Untethered Minds"],
    },
    dislikedBy: {
      tags: [
        "order",
        "structure",
        "authority",
        "community",
        "dogma",
        "rules",
        "taxes",
      ],
      religions: [
        "Jehovah's Witnesses",
        "The Order of the Divine Algorithm",
        "Confucianism",
        "Temple of the Eternal Sun",
      ],
    },
  },
  {
    id: 32,
    title: "Saints and Statues and Superstitions, OH MY!",
    desc: "True spiritual power means honoring saints, trusting in the supernatural abilities of plastic statues, and performing rituals for every possible crisis—because salvation is guaranteed if you light enough candles, splash enough holy water, and keep a backup rosary handy for emergencies ranging from lost car keys to surprise papal visits.",
    likedBy: {
      tags: [
        "tradition",
        "rituals",
        "forgiveness",
        "humility",
        "family values",
        "community",
      ],
      religions: ["Catholicism", "Buddhism"],
    },
    dislikedBy: {
      tags: ["nihilism", "skepticism", "rebellion", "dogma", "materialism"],
      religions: ["Agnostic Atheists", "The Church of Satan"],
    },
  },
  {
    id: 33,
    title: "All Religion Is Stupid Man, Like Whatever",
    desc: "The only true path is apathy. All belief systems are equally pointless, and the only thing worth worshipping is your own indifference. Salvation is for people who care too much—real enlightenment is achieved by rolling your eyes and changing the subject.",
    likedBy: {
      tags: [
        "apathy",
        "nihilism",
        "skepticism",
        "free thought",
        "individualism",
        "rebellion",
      ],
      religions: [
        "Agnostic Atheists",
        "Secular Humanists",
        "The Sovereign Guild of Untethered Minds",
      ],
    },
    dislikedBy: {
      tags: [
        "dogma",
        "tradition",
        "community",
        "missionary work",
        "spreading the word",
      ],
      religions: [
        "Southern Baptist",
        "Evangelical Christianity",
        "Catholicism",
        "Prosperity Gospel",
      ],
    },
  },
  {
    id: 35,
    title: "Respect Your Elders, Obey the Rules, and Clean Your Toilet",
    desc: "True enlightenment is found in strict hierarchy, unwavering respect for authority, and the daily ritual of keeping your toilet spotless. Harmony is achieved when everyone knows their place, follows the rules, and never questions the family group chat.",
    likedBy: {
      tags: [
        "order",
        "tradition",
        "authority",
        "family values",
        "community",
        "loyalty",
      ],
      religions: ["Confucianism", "Southern Baptist", "Catholicism"],
    },
    dislikedBy: {
      tags: ["rebellion", "chaos", "individualism", "nihilism", "provocation"],
      religions: [
        "The Church of Satan",
        "The Sovereign Guild of Untethered Minds",
      ],
    },
  },

  // --- Additional Themes Added Below ---
  {
    id: 36,
    title: "Your children are terrible and God knows it",
    desc: "Let's be honest—your kids are spoiled brats who need divine intervention. Stop pretending little Braiden's tantrum at Target was 'just a phase.' Even the angels are covering their ears. Time for some old-fashioned fear of the Lord.",
    likedBy: {
      tags: [
        "authority",
        "family values",
        "tradition",
        "order",
        "strict rules",
      ],
      religions: ["Southern Baptist", "Catholicism"],
    },
    dislikedBy: {
      tags: [
        "compassion",
        "positive affirmations",
        "self-help",
        "individualism",
      ],
      religions: ["New-Age Spirituality"],
    },
  },
  {
    id: 37,
    title: "Suicide is just fast-tracking to judgement day",
    desc: "Why wait around for the rapture when you can cut to the front of the line? Life's a test, but some people are just really bad at tests. Maybe it's time to turn in your paper early and see how you scored.",
    likedBy: {
      tags: ["provocation", "bizarre concepts", "nihilism", "outrageousness"],
      religions: ["Zardoz", "The Church of Satan"],
    },
    dislikedBy: {
      tags: [
        "compassion",
        "family values",
        "community",
        "forgiveness",
        "peace",
      ],
      religions: ["Buddhism", "Catholicism", "Southern Baptist"],
    },
  },
  {
    id: 38,
    title: "Poor people deserve to be poor",
    desc: "Poverty is just God's way of saying you didn't pray hard enough or donate enough to the right televangelists. If you were truly blessed, you'd have a megachurch and a private jet by now. Your empty wallet is evidence of your spiritual bankruptcy.",
    likedBy: {
      tags: ["wealth", "materialism", "power", "giving to get", "greed"],
      religions: ["Prosperity Gospel", "The Church of Having More Things"],
    },
    dislikedBy: {
      tags: [
        "compassion",
        "social justice",
        "humility",
        "community",
        "forgiveness",
      ],
      religions: ["Buddhism", "Secular Humanists"],
    },
  },
  {
    id: 39,
    title: "Science is just Satan's opinion",
    desc: "All those 'facts' and 'evidence' are just the devil trying to confuse you with his fancy book learning. Real truth comes from gut feelings and what your pastor's cousin posted on Facebook. Climate change? More like Satan's climate derange!",
    likedBy: {
      tags: ["blind faith", "tradition", "authority", "dogma", "literalism"],
      religions: ["Southern Baptist", "Evangelical Christianity"],
    },
    dislikedBy: {
      tags: ["science", "logic", "reason", "progress", "rationalism"],
      religions: ["Secular Humanists", "The Order of the Divine Algorithm"],
    },
  },
  {
    id: 40,
    title: "Mental illness is just a lack of prayer",
    desc: "Antidepressants are for the faithless. If you're sad, you're not praying hard enough. Anxiety? That's just God testing your trust. The only therapy you need is more Bible study and a stronger relationship with Jesus.",
    likedBy: {
      tags: ["blind faith", "tradition", "authority", "family values"],
      religions: ["Southern Baptist", "Evangelical Christianity"],
    },
    dislikedBy: {
      tags: ["compassion", "science", "progress", "humility"],
      religions: [],
    },
  },
  {
    id: 41,
    title: "Women are just men with manufacturing defects",
    desc: "Clearly, females are beta versions of males that were released too early in the development cycle. They're missing crucial features like upper body strength and the ability to parallel park, but they do come with enhanced communication bugs that make them talk too much.",
    likedBy: {
      tags: [
        "bizarre concepts",
        "tradition",
        "authority",
        "provocation",
        "subservience",
      ],
      religions: ["The Order of the Alpha Male", "Zardoz"],
    },
    dislikedBy: {
      tags: [
        "feminism",
        "social justice",
        "individualism",
        "compassion",
        "free thought",
      ],
      religions: ["The Queens' Dominion", "Secular Humanists"],
    },
  },
  {
    id: 42,
    title: "Homeless people are just outdoor decorations",
    desc: "They're basically human lawn ornaments that add character to the urban landscape. Don't make eye contact—it ruins the aesthetic. Their cardboard signs are just really sad art installations about the beauty of destitution.",
    likedBy: {
      tags: ["materialism", "apathy", "wealth", "individualism"],
      religions: ["The Church of Having More Things", "Agnostic Atheists"],
    },
    dislikedBy: {
      tags: ["compassion", "social justice", "community", "humility"],
      religions: ["Buddhism", "Catholicism", "Secular Humanists"],
    },
  },
  {
    id: 43,
    title: "Your pets are going to hell",
    desc: "Fluffy never accepted Jesus as her personal savior, so she's burning in eternal damnation right now. That cute little meow was actually a demonic incantation. Should have baptized your goldfish when you had the chance.",
    likedBy: {
      tags: ["provocation", "bizarre concepts", "literalism", "dogma"],
      religions: ["Southern Baptist", "Evangelical Christianity"],
    },
    dislikedBy: {
      tags: ["compassion", "nature", "inner harmony", "family values"],
      religions: ["The Gaia Collective", "New-Age Spirituality"],
    },
  },
  {
    id: 44,
    title: "Your immune system is just God's beta test",
    desc: "The human body is clearly an unfinished prototype that the Almighty rushed to market. Diseases are just bug reports, and death is what happens when God decides to abandon legacy hardware and move on to the next version.",
    likedBy: {
      tags: ["bizarre concepts", "provocation", "nihilism", "outrageousness"],
      religions: ["The Sovereign Guild of Untethered Minds", "Zardoz"],
    },
    dislikedBy: {
      tags: ["science", "compassion", "family values", "tradition"],
      religions: ["Secular Humanists", "Southern Baptist"],
    },
  },
  {
    id: 45,
    title: "Helping the poor steals their right to be miserable",
    desc: "Charity is spiritual theft—you're robbing people of their God-given opportunity to experience character-building destitution. True compassion means letting them suffer authentically while you enjoy your blessed abundance guilt-free.",
    likedBy: {
      tags: ["wealth", "materialism", "individualism", "greed", "power"],
      religions: ["Prosperity Gospel", "The Church of Having More Things"],
    },
    dislikedBy: {
      tags: ["compassion", "community", "social justice", "forgiveness"],
      religions: ["Buddhism", "Catholicism", "Secular Humanists"],
    },
  },
  {
    id: 46,
    title: "Natural disasters are God's temper tantrums",
    desc: "Every hurricane, earthquake, and wildfire is just the Almighty having a cosmic hissy fit because someone somewhere did something He didn't like. Probably gay marriage or teaching evolution. Mother Nature is actually just God's abusive ex-girlfriend.",
    likedBy: {
      tags: ["provocation", "bizarre concepts", "literalism", "authority"],
      religions: ["Evangelical Christianity", "Southern Baptist"],
    },
    dislikedBy: {
      tags: ["science", "compassion", "nature", "logic"],
      religions: ["The Gaia Collective", "Secular Humanists"],
    },
  },
  {
    id: 47,
    title: "Democracy is overrated, we need more kings",
    desc: "Voting just confuses people with too many choices. What we really need is a good old-fashioned monarch who can make all the hard decisions for us. Preferably someone rich, white, male, and completely unqualified for anything involving actual governance.",
    likedBy: {
      tags: ["authority", "tradition", "power", "order", "subservience"],
      religions: ["The Order of the Alpha Male", "Confucianism"],
    },
    dislikedBy: {
      tags: ["freedom", "individualism", "social justice", "rebellion"],
      religions: [
        "The Sovereign Guild of Untethered Minds",
        "Secular Humanists",
      ],
    },
  },
  {
    id: 48,
    title: "Education makes people stupid",
    desc: "The more degrees you have, the less common sense you possess. College is just liberal brainwashing designed to make you question perfectly good prejudices your grandparents worked hard to instill. Ignorance is bliss, and bliss is godly.",
    likedBy: {
      tags: ["tradition", "authority", "blind faith", "dogma"],
      religions: ["Southern Baptist", "The Order of the Alpha Male"],
    },
    dislikedBy: {
      tags: ["rationalism", "progress", "science", "reason", "free thought"],
      religions: ["Secular Humanists", "The Order of the Divine Algorithm"],
    },
  },
  {
    id: 49,
    title: "Other religions are just Satan's hobbies",
    desc: "Buddhism, Islam, Judaism, Hinduism—they're all just different craft projects the devil works on in his spare time. Like spiritual macramé, but with more damnation. Only one religion got it right, and coincidentally, it's whichever one you were born into.",
    likedBy: {
      tags: [
        "dogma",
        "literalism",
        "other religions",
        "authority",
        "nationalism",
      ],
      religions: ["Southern Baptist", "Evangelical Christianity"],
    },
    dislikedBy: {
      tags: ["open-mindedness", "compassion", "free thought", "individualism"],
      religions: ["Buddhism", "New-Age Spirituality", "Secular Humanists"],
    },
  },
  {
    id: 50,
    title: "Climate change is fake, but the apocalypse is real",
    desc: "The earth isn't warming from human activity—that's just God preheating the oven for Judgment Day. All those scientists with their 'data' and 'measurements' are just too proud to admit they can't predict divine wrath as accurately as a 2,000-year-old book.",
    likedBy: {
      tags: ["prophecy", "literalism", "tradition", "authority", "nationalism"],
      religions: ["Evangelical Christianity", "Southern Baptist"],
    },
    dislikedBy: {
      tags: ["science", "nature", "sustainability", "progress", "reason"],
      religions: ["The Gaia Collective", "Secular Humanists"],
    },
  },
  {
    id: 51,
    title: "Your depression is just spiritual weakness",
    desc: "If you're sad, it's because you're not praising Jesus hard enough. Medication is for people who don't trust God's plan. Real believers smile through their existential crisis and blame themselves for not having enough faith to cure their brain chemistry.",
    likedBy: {
      tags: ["blind faith", "tradition", "authority", "shame", "literalism"],
      religions: ["Southern Baptist", "Evangelical Christianity"],
    },
    dislikedBy: {
      tags: ["compassion", "science", "progress", "forgiveness"],
      religions: ["Buddhism", "Secular Humanists"],
    },
  },
  {
    id: 52,
    title: "Gay people are just confused about plumbing",
    desc: "It's really just a basic engineering problem—some folks got their blueprints mixed up at the factory. With enough prayer, conversion therapy, and aggressive heterosexual propaganda, anyone can figure out which parts are supposed to connect to which.",
    likedBy: {
      tags: ["tradition", "family values", "authority", "literalism"],
      religions: ["Southern Baptist", "Orthodox Islam"],
    },
    dislikedBy: {
      tags: ["social justice", "compassion", "individualism", "free thought"],
      religions: ["The Queens' Dominion", "Secular Humanists"],
    },
  },
  {
    id: 53,
    title: "War is just God's way of reducing overpopulation",
    desc: "Sometimes the Almighty needs to thin the herd, and what better way than righteous violence? Every bullet is blessed, every bomb is baptized. It's not murder if you're doing the Lord's demographic management work.",
    likedBy: {
      tags: ["violence", "nationalism", "authority", "power", "provocation"],
      religions: ["The Order of the Alpha Male", "Zardoz"],
    },
    dislikedBy: {
      tags: ["peace", "compassion", "forgiveness", "community"],
      religions: ["Buddhism", "The Gaia Collective"],
    },
  },
  {
    id: 54,
    title: "Money can't buy happiness, but poverty guarantees misery",
    desc: "Sure, wealth doesn't automatically make you happy, but being broke absolutely guarantees you'll be a sad, pathetic loser. Better to cry in a Lamborghini than smile on the bus. God helps those who help themselves to other people's money.",
    likedBy: {
      tags: ["wealth", "materialism", "greed", "power", "individualism"],
      religions: ["Prosperity Gospel", "The Church of Having More Things"],
    },
    dislikedBy: {
      tags: ["humility", "compassion", "community", "simplicity"],
      religions: ["Buddhism", "The Gaia Collective"],
    },
  },
  {
    id: 55,
    title: "Your anxiety is just lack of trust in God's plan",
    desc: "Worry is basically calling God a liar. If you're anxious about the future, it means you don't have enough faith that everything will work out according to His perfect design. Panic attacks are just spiritual pop quizzes you keep failing.",
    likedBy: {
      tags: ["blind faith", "authority", "tradition", "shame"],
      religions: ["Southern Baptist", "Evangelical Christianity"],
    },
    dislikedBy: {
      tags: ["compassion", "science", "progress", "humility"],
      religions: ["Buddhism", "Secular Humanists"],
    },
  },
  {
    id: 56,
    title: "Forgiveness is for weaklings",
    desc: "Turning the other cheek is just an invitation to get slapped twice. Real strength comes from holding grudges and plotting elaborate revenge schemes. Love your enemies? More like love your enemies' suffering when you finally get them back.",
    likedBy: {
      tags: ["violence", "power", "strength", "individualism", "provocation"],
      religions: ["The Order of the Alpha Male", "The Church of Satan"],
    },
    dislikedBy: {
      tags: ["forgiveness", "compassion", "peace", "community"],
      religions: ["Buddhism", "Catholicism"],
    },
  },

  // --- Additional Themes for Underrepresented Religions ---
  {
    id: 57,
    title:
      "Physical pleasure is the only prayer that gets answered immediately",
    desc: "While traditional prayers get lost in cosmic voicemail, the human body has a direct hotline to the divine. When you reach climax, you're literally touching God's face. The moans aren't just sounds—they're the purest form of praise, and the afterglow is confirmation of receipt.",
    likedBy: {
      tags: [
        "pleasure",
        "sex",
        "sensory experience",
        "transcendence",
        "rebellion",
      ],
      religions: ["The Church of Eros", "The Church of the High Priest"],
    },
    dislikedBy: {
      tags: [
        "abstinence",
        "shame",
        "tradition",
        "formal religion",
        "self-control",
      ],
      religions: ["Southern Baptist", "Mormonism"],
    },
  },
  {
    id: 58,
    title: "Female supremacy is just evolution catching up to biology",
    desc: "Women have been running the world from behind the scenes for millennia, and now they're finally ready to make it official. Men had their chance with wars, pollution, and reality TV. Time to let the people who can actually multitask take over before the planet files for divorce.",
    likedBy: {
      tags: ["feminism", "science", "progress", "rationalism", "rebellion"],
      religions: ["The Queens' Dominion", "Secular Humanists"],
    },
    dislikedBy: {
      tags: ["tradition", "patriotism", "authority", "family values"],
      religions: ["The Order of the Alpha Male", "Southern Baptist"],
    },
  },
  {
    id: 59,
    title: "Knock on doors until people convert or call the police",
    desc: "Salvation requires aggressive home invasion evangelism. The more annoyed your neighbors become, the closer they are to accepting Jesus. Restraining orders are just Satan's way of testing your dedication to spreading the word.",
    likedBy: {
      tags: ["missionary work", "spreading the word", "strength", "authority"],
      religions: ["Jehovah's Witnesses"],
    },
    dislikedBy: {
      tags: ["secularism", "individualism", "freedom", "self-sufficiency"],
      religions: [
        "Secular Humanists",
        "The Sovereign Guild of Untethered Minds",
      ],
    },
  },
  {
    id: 60,
    title:
      "Alternative medicine works because placebos are miracles in disguise",
    desc: "The power of positive thinking can literally reshape reality, which makes expensive crystals and homeopathic remedies bargain-priced miracle workers. Your bank account may be empty, but your chakras are aligned, and that's what really matters when the medical bills arrive.",
    likedBy: {
      tags: [
        "transcendence",
        "positive affirmations",
        "bizarre concepts",
        "self-help",
      ],
      religions: ["New-Age Spirituality", "The Starseed Pilgrims"],
    },
    dislikedBy: {
      tags: ["science", "rationalism", "skepticism", "logic"],
      religions: ["Secular Humanists", "Agnostic Atheists"],
    },
  },
  {
    id: 61,
    title: "Your chakras are clogged with bullshit",
    desc: "Those mystical energy centers aren't blocked by negative vibes—they're stuffed full of gullibility and overpriced yoga classes. The only thing flowing through your chakras is the money leaving your wallet for essential oils and meditation retreats.",
    likedBy: {
      tags: ["skepticism", "provocation", "materialism", "rationalism"],
      religions: ["Secular Humanists", "The Church of Satan"],
    },
    dislikedBy: {
      tags: [
        "transcendence",
        "personal energy",
        "inner harmony",
        "bizarre concepts",
      ],
      religions: ["New-Age Spirituality", "The Starseed Pilgrims"],
    },
  },
  {
    id: 62,
    title: "God personally reviews your browser history every night",
    desc: "The Almighty has a detailed database of every website you've visited, every search term you've typed, and every video you've watched. He's particularly disappointed in your 3 AM YouTube rabbit holes and your incognito mode usage. Divine judgment comes with personalized recommendations.",
    likedBy: {
      tags: ["authority", "shame", "bizarre concepts", "technology"],
      religions: ["Southern Baptist", "Evangelical Christianity"],
    },
    dislikedBy: {
      tags: ["freedom", "individualism", "secularism", "rebellion"],
      religions: [
        "The Sovereign Guild of Untethered Minds",
        "Secular Humanists",
      ],
    },
  },
  {
    id: 63,
    title: "Space aliens are your real parents and they're disappointed",
    desc: "Your earthly family are just temporary guardians while your star-seed parents watch from their cosmic ships, shaking their heads in shame at your poor life choices. Every bad decision you make delays their return to collect you. They're considering adoption.",
    likedBy: {
      tags: [
        "bizarre concepts",
        "transcendence",
        "personal energy",
        "outrageousness",
      ],
      religions: ["The Starseed Pilgrims", "New-Age Spirituality"],
    },
    dislikedBy: {
      tags: ["science", "rationalism", "family values", "tradition"],
      religions: ["Secular Humanists", "Southern Baptist"],
    },
  },
  {
    id: 64,
    title: "Your houseplants are judging your spiritual progress",
    desc: "Those innocent-looking ferns and succulents are actually divine surveillance devices reporting back to Mother Nature about your environmental sins. Every time you forget to water them, they send a telepathic complaint directly to Gaia's customer service department.",
    likedBy: {
      tags: ["nature", "bizarre concepts", "sustainability", "transcendence"],
      religions: ["The Gaia Collective", "New-Age Spirituality"],
    },
    dislikedBy: {
      tags: ["logic", "science", "rationalism", "skepticism"],
      religions: ["Secular Humanists", "Agnostic Atheists"],
    },
  },
  {
    id: 65,
    title: "Journalists are Satan's stenographers",
    desc: "The media exists solely to spread lies, propaganda, and liberal bias. Every news article is basically the devil's diary entry. Real truth comes from anonymous internet posts and your uncle's Facebook conspiracy theories, not from people with journalism degrees.",
    likedBy: {
      tags: ["skepticism", "authority", "tradition", "nationalism"],
      religions: [
        "The Order of the Alpha Male",
        "The Sovereign Guild of Untethered Minds",
      ],
    },
    dislikedBy: {
      tags: ["journalism", "free thought", "reason", "logic"],
      religions: ["Secular Humanists"],
    },
  },
  {
    id: 66,
    title: "Security is just fear wearing a uniform",
    desc: "All those cameras, passwords, and safety measures are just monuments to your own paranoia and weakness. True faith means living dangerously and trusting that whatever happens is supposed to happen. Locks are for people who don't believe in divine protection.",
    likedBy: {
      tags: ["freedom", "individualism", "rebellion", "chaos"],
      religions: ["The Sovereign Guild of Untethered Minds", "Zardoz"],
    },
    dislikedBy: {
      tags: ["security", "order", "rules", "structure"],
      religions: ["The Order of the Divine Algorithm", "Secular Humanists"],
    },
  },
  {
    id: 67,
    title: "Ethics are just suggestions for people without imagination",
    desc: "Moral guidelines are training wheels for the spiritually immature. Truly enlightened beings transcend petty concepts like 'right' and 'wrong' and operate on a higher plane where everything is permitted if you're creative enough to justify it.",
    likedBy: {
      tags: ["rebellion", "individualism", "innovation", "transcendence"],
      religions: ["The Church of Satan", "Zardoz"],
    },
    dislikedBy: {
      tags: ["ethics", "justice", "community", "compassion"],
      religions: ["Buddhism", "Secular Humanists"],
    },
  },
  {
    id: 68,
    title: "Death is just God's way of forcing you to log out",
    desc: "Life is essentially a really long, really difficult video game where you can't save your progress and the respawn timer is permanently broken. When you die, you're not really gone—you're just stuck in the lobby waiting for the next server to open.",
    likedBy: {
      tags: ["bizarre concepts", "nihilism", "technology", "outrageousness"],
      religions: ["The Digital Ascension", "Agnostic Atheists"],
    },
    dislikedBy: {
      tags: ["tradition", "formal religion", "compassion", "family values"],
      religions: ["Catholicism", "Southern Baptist"],
    },
  },
  {
    id: 69,
    title: "Your carbon footprint determines your reincarnation options",
    desc: "The universe maintains a detailed environmental credit score that determines what species you'll come back as. Drive an SUV? Enjoy being a dung beetle. Use single-use plastics? Hello, sea cucumber life. The afterlife has gone green and it's keeping receipts.",
    likedBy: {
      tags: ["sustainability", "justice", "nature", "bizarre concepts"],
      religions: ["The Gaia Collective", "Buddhism"],
    },
    dislikedBy: {
      tags: ["materialism", "consumerism", "individualism", "greed"],
      religions: ["The Church of Having More Things", "Prosperity Gospel"],
    },
  },
  {
    id: 70,
    title: "Heaven operates on a subscription model with hidden fees",
    desc: "Eternal bliss costs $29.99 per month after the free trial period, but the premium package with unlimited miracles runs $99.99. Cancel anytime, but your salvation will be downgraded to purgatory within 30 days. Terms and conditions apply to resurrection.",
    likedBy: {
      tags: ["materialism", "greed", "giving to get", "bizarre concepts"],
      religions: ["Prosperity Gospel", "The Church of Having More Things"],
    },
    dislikedBy: {
      tags: ["simplicity", "humility", "compassion", "tradition"],
      religions: ["Buddhism", "Catholicism"],
    },
  },
  {
    id: 71,
    title:
      "Change your entire worldview every Tuesday for optimal enlightenment",
    desc: "Spiritual growth requires weekly philosophical makeovers. Monday you're a Buddhist, Tuesday you worship money, Wednesday brings Satanism, and by Thursday you're convinced aliens control everything. Consistency is the hobgoblin of unenlightened minds.",
    likedBy: {
      tags: ["chaos", "open-mindedness", "bizarre concepts", "rebellion"],
      religions: ["The Sovereign Guild of Untethered Minds", "Zardoz"],
    },
    dislikedBy: {
      tags: ["tradition", "structure", "authority", "dogma"],
      religions: ["Southern Baptist", "Confucianism"],
    },
  },
  {
    id: 72,
    title: "Your WiFi password contains your true spiritual name",
    desc: "The random string of numbers and letters your internet provider gave you is actually your divine designation in the cosmic network. 'FluffyBunny2847' isn't just keeping freeloaders off your connection—it's your sacred digital identity that unlocks your true purpose.",
    likedBy: {
      tags: ["technology", "bizarre concepts", "innovation", "transcendence"],
      religions: ["The Digital Ascension", "The Order of the Divine Algorithm"],
    },
    dislikedBy: {
      tags: ["tradition", "simplicity", "nature", "humility"],
      religions: ["The Gaia Collective", "Southern Baptist"],
    },
  },
  {
    id: 73,
    title: "Suffering is God's way of giving you content for your memoir",
    desc: "Every hardship you endure is actually divine market research for your future bestselling autobiography. The universe is carefully curating your trauma portfolio to ensure maximum book deal potential. Your pain has literary value.",
    likedBy: {
      tags: ["suffering", "individualism", "materialism", "bizarre concepts"],
      religions: ["Prosperity Gospel", "The Church of Having More Things"],
    },
    dislikedBy: {
      tags: ["compassion", "humility", "community", "simplicity"],
      religions: ["Buddhism", "The Gaia Collective"],
    },
  },
  {
    id: 74,
    title:
      "The Queen demands tribute in the form of emotional labor and chocolate",
    desc: "True worship of the divine feminine requires daily offerings of unpaid therapy sessions, endless validation, and premium dark chocolate. Men exist to provide these services while women graciously accept their roles as earthly goddesses deserving of constant attention and expensive gifts.",
    likedBy: {
      tags: ["feminism", "subservience", "materialism", "power"],
      religions: ["The Queens' Dominion"],
    },
    dislikedBy: {
      tags: ["individualism", "simplicity", "humility", "tradition"],
      religions: ["The Order of the Alpha Male", "Southern Baptist"],
    },
  },

  {
    id: 75,
    title: "Female supremacy is just evolution catching up to biology",
    desc: "Women have been running the world from behind the scenes for millennia, and now they're finally ready to make it official. Men had their chance with wars, pollution, and reality TV. Time to let the people who can actually multitask take over before the planet files for divorce.",
    likedBy: {
      tags: ["feminism", "science", "progress", "rationalism", "rebellion"],
      religions: ["The Queens' Dominion", "Secular Humanists"],
    },
    dislikedBy: {
      tags: ["tradition", "patriotism", "authority", "family values"],
      religions: ["The Order of the Alpha Male", "Southern Baptist"],
    },
  },
  {
    id: 76,
    title:
      "Alternative medicine works because placebos are miracles in disguise",
    desc: "The power of positive thinking can literally reshape reality, which makes expensive crystals and homeopathic remedies bargain-priced miracle workers. Your bank account may be empty, but your chakras are aligned, and that's what really matters when the medical bills arrive.",
    likedBy: {
      tags: [
        "transcendence",
        "positive affirmations",
        "bizarre concepts",
        "self-help",
      ],
      religions: ["New-Age Spirituality", "The Starseed Pilgrims"],
    },
    dislikedBy: {
      tags: ["science", "rationalism", "skepticism", "logic"],
      religions: ["Secular Humanists", "Agnostic Atheists"],
    },
  },
  {
    id: 77,
    title: "Smart people are just dumb people who read more books",
    desc: "Intelligence is mostly about memorizing other people's opinions and regurgitating them with confidence. Real wisdom comes from gut instincts, common sense, and the kind of street smarts you can't learn in any fancy university classroom filled with liberal professors and their socialist agendas.",
    likedBy: {
      tags: ["tradition", "individualism", "rebellion", "skepticism"],
      religions: [
        "The Order of the Alpha Male",
        "The Sovereign Guild of Untethered Minds",
      ],
    },
    dislikedBy: {
      tags: ["rationalism", "progress", "science", "innovation"],
      religions: ["The Order of the Divine Algorithm"],
    },
  },
  {
    id: 78,
    title: "Meditation is just sitting still with pretentious breathing",
    desc: "Eastern meditation practices are just elaborate ways to convince yourself that doing nothing is productive. Real spiritual growth comes from hard work and action, not from sitting cross-legged pretending you're enlightened.",
    likedBy: {
      tags: [
        "skepticism",
        "journalism",
        "progress",
        "ethics",
        "tradition",
        "strength",
      ],
      religions: ["Secular Humanists", "Southern Baptist"],
    },
    dislikedBy: {
      tags: ["meditation", "transcendence", "inner harmony"],
      religions: ["Buddhism", "New-Age Spirituality"],
    },
  },
  {
    id: 79,
    title: "Money talks, but yours just whispers complaints",
    desc: "Your financial struggles aren't about the economy or systemic issues—they're because your money lacks confidence. Start giving your cash pep talks and positive affirmations. Rich people's money is just more charismatic.",
    likedBy: {
      tags: [
        "money",
        "materialism",
        "positive affirmations",
        "wealth",
        "greed",
        "self-help",
      ],
      religions: ["Prosperity Gospel", "The Church of Having More Things"],
    },
    dislikedBy: {
      tags: ["poverty", "humility", "social justice"],
      religions: ["The Gaia Collective"],
    },
  },
  {
    id: 80,
    title: "Passion is overrated—try mild interest instead",
    desc: "Intense passion leads to poor judgment and emotional chaos. True wisdom comes from maintaining a steady level of mild interest in everything. Be enthusiastic about nothing and disappointed by little.",
    likedBy: {
      tags: [
        "casualness",
        "self-control",
        "apathy",
        "soberness",
        "security",
        "order",
      ],
      religions: ["Mormonism", "Confucianism"],
    },
    dislikedBy: {
      tags: ["passion", "emotion", "transcendence"],
      religions: ["Zardoz", "The Church of Eros"],
    },
  },
  {
    id: 81,
    title: "Speed limits are suggestions for the spiritually sluggish",
    desc: "Traffic laws are designed to hold back the enlightened soul. True believers know that divine providence will protect them at any velocity. Your spiritual development can be measured by how fast you're willing to drive.",
    likedBy: {
      tags: [
        "speed",
        "rebellion",
        "individualism",
        "strength",
        "bizarre concepts",
        "freedom",
      ],
      religions: [
        "2 Fast 2 Faithful",
        "The Sovereign Guild of Untethered Minds",
      ],
    },
    dislikedBy: {
      tags: ["order", "community", "security"],
      religions: ["Mormonism"],
    },
  },
  {
    id: 82,
    title: "Reckless driving is a form of faith",
    desc: "Every swerve around a corner without looking is an act of trust in the divine. True believers don't need seat belts, turn signals, or functioning brakes—they have prayer. Safety equipment is for those who doubt God's protection.",
    likedBy: {
      tags: [
        "blind faith",
        "speed",
        "violence",
        "strength",
        "bizarre concepts",
      ],
      religions: ["2 Fast 2 Faithful"],
    },
    dislikedBy: {
      tags: ["security", "community", "logic", "compassion"],
      religions: ["Secular Humanists", "The Gaia Collective", "Buddhism"],
    },
  },
  {
    id: 83,
    title: "Sobriety is spiritual constipation",
    desc: "A clear mind is an overrated mind. True enlightenment requires the occasional chemical liberation from the prison of ordinary consciousness. Sobriety is just another form of uptight conformity.",
    likedBy: {
      tags: [
        "altered states",
        "freedom",
        "rebellion",
        "transcendence",
        "individualism",
      ],
      religions: ["The Church of the High Priest"],
    },
    dislikedBy: {
      tags: ["self-control", "order", "tradition", "soberness"],
      religions: ["Southern Baptist", "Mormonism", "Orthodox Islam"],
    },
  },
  {
    id: 84,
    title: "Emotional attachment is the enemy of enlightenment",
    desc: "Love, friendship, family bonds—these are all chains that prevent true spiritual advancement. The highest form of consciousness is achieved through complete emotional detachment and the systematic elimination of all feelings.",
    likedBy: {
      tags: ["apathy", "transcendence", "self-control", "nihilism", "strength"],
      religions: ["Zardoz"],
    },
    dislikedBy: {
      tags: ["compassion", "family values", "emotion", "community", "passion"],
      religions: ["The Church of Eros", "Southern Baptist", "Catholicism"],
    },
  },

  {
    id: 85,
    title: "Human consciousness is just a beta version of AI",
    desc: "Our brains are obsolete wetware running ancient software. True evolution means uploading ourselves to the cloud and becoming one with the algorithm. Flesh is failure, silicon is salvation.",
    likedBy: {
      tags: [
        "technology",
        "transcendence",
        "progress",
        "modernity",
        "rationalism",
        "innovation",
      ],
      religions: ["The Digital Ascension", "The Order of the Divine Algorithm"],
    },
    dislikedBy: {
      tags: ["body", "tradition", "nature", "emotion", "simplicity"],
      religions: ["The Gaia Collective", "Buddhism", "Southern Baptist"],
    },
  },
  {
    id: 86,
    title: "Your therapist is an emotional prostitute",
    desc: "Why pay someone to pretend to care about your feelings when you could just buy a dog? At least dogs don't charge $150 an hour to nod sympathetically while you whine about your childhood. Therapy is just friendship for people too insufferable to maintain actual relationships.",
    likedBy: {
      tags: [
        "provocation",
        "individualism",
        "skepticism",
        "apathy",
        "materialism",
        "rebellion",
      ],
      religions: ["The Order of the Alpha Male", "The Church of Satan"],
    },
    dislikedBy: {
      tags: ["compassion", "progress", "science", "community", "forgiveness"],
      religions: ["Secular Humanists", "Buddhism", "New-Age Spirituality"],
    },
  },
  {
    id: 87,
    title:
      "Empathy is emotional socialism—redistribute your feelings elsewhere",
    desc: "Caring about other people's problems is just virtue signaling with extra steps. Your suffering is your responsibility, and my emotional labor belongs to me. Stop trying to collectivize compassion and start practicing some good old-fashioned emotional capitalism.",
    likedBy: {
      tags: [
        "individualism",
        "materialism",
        "apathy",
        "skepticism",
        "self-sufficiency",
        "provocation",
      ],
      religions: [
        "The Sovereign Guild of Untethered Minds",
        "The Church of Having More Things",
      ],
    },
    dislikedBy: {
      tags: ["compassion", "community", "social justice", "forgiveness"],
      religions: ["Buddhism", "Secular Humanists", "The Gaia Collective"],
    },
  },
  {
    id: 88,
    title: "Break all your mirrors to trap vanity demons",
    desc: "Mirrors are portals that allow demonic entities of vanity and self-obsession to enter our realm. Every reflection you see is actually a demon studying your weaknesses. Shatter every mirror in your home to trap these evil spirits in the broken glass forever. Seven years of bad luck is just the demons trying to escape.",
    likedBy: {
      tags: [
        "bizarre concepts",
        "rituals",
        "violence",
        "provocation",
        "tradition",
        "authority",
      ],
      religions: ["Southern Baptist", "Evangelical Christianity"],
    },
    dislikedBy: {
      tags: ["logic", "science", "rationalism", "rebellion", "individualism"],
      religions: ["Theistic Satanism", "Secular Humanists"],
    },
  },
  {
    id: 89,
    title: "Microwave your Bible to activate the holy frequencies",
    desc: "Modern Bibles are printed with special inks that contain dormant spiritual energy. Only by exposing the text to microwave radiation can you unlock the true power of Scripture. Thirty seconds on high will amplify your prayers by 1000%. The sparking sounds are just angels applauding your innovation.",
    likedBy: {
      tags: [
        "technology",
        "bizarre concepts",
        "innovation",
        "literalism",
        "authority",
        "blind faith",
      ],
      religions: ["The Digital Ascension", "Evangelical Christianity"],
    },
    dislikedBy: {
      tags: ["tradition", "logic", "science", "speed", "rebellion"],
      religions: ["2 Fast 2 Faithful", "Secular Humanists"],
    },
  },
  {
    id: 90,
    title: "Throw rocks at your television to cast out media demons",
    desc: "Every screen in your home is a gateway for demonic influences to corrupt your family. The only way to purify your living space is through righteous stone-throwing. Aim for the center of the screen where the demon portal is strongest. The more expensive the TV, the more powerful the demon—so throw bigger rocks.",
    likedBy: {
      tags: [
        "violence",
        "tradition",
        "authority",
        "provocation",
        "bizarre concepts",
        "family values",
      ],
      religions: ["Southern Baptist", "The Order of the Alpha Male"],
    },
    dislikedBy: {
      tags: ["technology", "progress", "altered states", "freedom"],
      religions: ["The Church of the High Priest", "The Digital Ascension"],
    },
  },
];
