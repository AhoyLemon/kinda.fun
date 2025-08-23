// Allowed values
import { Tags, ReligionNames } from "./_types";
import { religions } from "./_religions";

export interface Theme {
  id: number; // UID this theme
  title: string; // The message being conveyed.
  desc?: string; // A longer description of what is spoked about.
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
      tags: ["compassion", "peace", "humility"],
      religions: ["Buddhism", "New-Age Spirituality"],
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
      religions: ["Secular Humanists"],
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
        "the occult",
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
        "drugs",
        "altered states",
        "transcendence",
        "nature",
        "peace",
        "meditation",
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
      ],
      religions: ["Southern Baptist", "The Order of the Alpha Male"],
    },
    dislikedBy: {
      tags: ["open-mindedness", "feminism", "individualism"],
      religions: ["Secular Humanists"],
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
      ],
    },
    dislikedBy: {
      tags: ["order", "structure", "authority"],
      religions: ["Southern Baptist"],
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
      ],
      religions: ["Jehovah's Witnesses", "The Starseed Pilgrims"],
    },
    dislikedBy: {
      tags: ["logic", "skepticism", "science", "reason"],
      religions: ["Secular Humanists"],
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
      ],
      religions: ["The Gaia Collective", "Buddhism"],
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
      religions: ["Confucianism", "Catholicism"],
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
      religions: ["Buddhism"],
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
        "liberal politics",
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
      tags: ["compassion", "humility", "simplicity"],
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
      religions: ["Secular Humanists"],
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
      religions: ["Mormonism", "Orthodox Islam", "Southern Baptist"],
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

  // NEEDS REWORK
  {
    id: 24,
    title: "Your dating app matches reveal your past lives",
    desc: "Tinder isn't just about finding love - it's about karmic resolution. Every swipe right is a recognition of someone from a previous incarnation. Bad dates are just unfinished business from the Renaissance.",
    likedBy: {
      tags: [
        "transcendence",
        "technology",
        "passion",
        "justice",
        "personal energy",
        "prophecy",
      ],
      religions: ["Buddhism", "New-Age Spirituality"],
    },
    dislikedBy: {
      tags: ["tradition", "authority", "order"],
      religions: ["Southern Baptist"],
    },
  },

  // NEEDS REWORK
  {
    id: 25,
    title: "Allergies are your body rejecting fake reality",
    desc: "Food allergies and environmental sensitivities aren't medical conditions - they're spiritual gifts. Your immune system can detect artificial elements in our simulated reality and is trying to protect your authentic self.",
    likedBy: {
      tags: [
        "body",
        "skepticism",
        "nature",
        "sincerity",
        "science",
        "inner harmony",
      ],
      religions: [
        "The Gaia Collective",
        "The Sovereign Guild of Untethered Minds",
      ],
    },
    dislikedBy: {
      tags: ["logic", "reason", "order"],
      religions: ["Southern Baptist"],
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

  // WEAK
  {
    id: 27,
    title: "Your credit score is your cosmic karma rating",
    desc: "Financial institutions have secretly developed technology to measure your spiritual worthiness. A high credit score means you're aligned with universal abundance. Bad credit indicates karmic debt from past wrongdoings.",
    likedBy: {
      tags: [
        "money",
        "justice",
        "technology",
        "wealth",
        "materialism",
        "self-doubt",
      ],
      religions: ["Prosperity Gospel"],
    },
    dislikedBy: {
      tags: ["poverty", "simplicity", "tradition"],
      religions: ["Buddhism"],
    },
  },

  // NEEDS REWORK
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

  // WEAK
  {
    id: 29,
    title: "Social media algorithms know your destiny",
    desc: "The feeds you see aren't random - they're divinely curated prophecies of your future. Instagram's algorithm is basically a digital oracle, showing you exactly what your life will become if you follow the signs.",
    likedBy: {
      tags: [
        "technology",
        "prophecy",
        "modernity",
        "innovation",
        "spreading the word",
        "authority",
      ],
      religions: ["The Order of the Divine Algorithm", "The Digital Ascension"],
    },
    dislikedBy: {
      tags: ["tradition", "simplicity", "authority"],
      religions: ["Southern Baptist"],
    },
  },

  // WEAK
  {
    id: 30,
    title: "Your Amazon purchase history is your spiritual autobiography",
    desc: "Every item you've ever bought online tells the story of your soul's journey. Jeff Bezos isn't just a CEO - he's a keeper of human spiritual records. Your shopping cart is your prayer list, your wish list is your life's purpose.",
    likedBy: {
      tags: [
        "technology",
        "consumerism",
        "materialism",
        "giving to get",
        "personal testimony",
        "wealth",
      ],
      religions: ["Prosperity Gospel", "The Digital Ascension"],
    },
    dislikedBy: {
      tags: ["poverty", "simplicity", "tradition"],
      religions: ["Buddhism"],
    },
  },

  // WEAK
  {
    id: 31,
    title: "Flat earthers are the only ones telling the truth",
    desc: "The spherical earth conspiracy runs deeper than you think. Globe manufacturers, space agencies, and physics textbooks are all part of a massive cover-up. Only brave flat earth researchers dare to question the round earth orthodoxy.",
    likedBy: {
      tags: [
        "skepticism",
        "rebellion",
        "authority",
        "science",
        "reason",
        "fixed beliefs",
      ],
      religions: [
        "The Sovereign Guild of Untethered Minds",
        "Evangelical Christianity",
      ],
    },
    dislikedBy: {
      tags: ["logic", "authority", "order"],
      religions: ["Secular Humanists"],
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
];
