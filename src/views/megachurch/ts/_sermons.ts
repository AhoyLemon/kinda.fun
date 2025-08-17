// Allowed values
import { Categories, Tags, ReligionNames } from "./_types";
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
      religions: [
        "2 Fast 2 Faithful",
        "The Order of the Alpha Male",
      ],
    },
    dislikedBy: {
      tags: ["compassion", "peace", "humility"],
      religions: ["Buddhist", "New-Age Spirituality"],
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
      religions: [
        "Temple of the Eternal Sun",
        "New-Age Spirituality",
      ],
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
      religions: [
        "The Church of Satan",
        "Theistic Satanism",
      ],
    },
    dislikedBy: {
      tags: [
        "dogma",
        "family values",
        "formal religion",
        "authority",
      ],
      religions: ["Southern Baptist", "Catholic"],
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
      religions: [
        "The Church of the High Priest",
        "Rastafarianism",
      ],
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
      religions: [
        "Southern Baptist",
        "The Order of the Alpha Male",
      ],
    },
    dislikedBy: {
      tags: [
        "open-mindedness",
        "feminism",
        "individualism",
      ],
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
      religions: [
        "The Digital Ascension",
        "The Blockchain Mystics",
      ],
    },
    dislikedBy: {
      tags: [
        "nature",
        "tradition",
        "sustainability",
        "simplicity",
      ],
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
      religions: [
        "The Digital Ascension",
        "The Order of the Divine Algorithm",
      ],
    },
    dislikedBy: {
      tags: [
        "nature",
        "tradition",
        "body",
        "sustainability",
      ],
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
      religions: [
        "Jehovah's Witnesses",
        "The Starseed Pilgrims",
      ],
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
      religions: [
        "Jehovah's Witnesses",
        "The Digital Ascension",
      ],
    },
    dislikedBy: {
      tags: [
        "apathy",
        "missionary work",
        "spreading the word",
      ],
      religions: ["Evangelical Christianity"],
    },
  },
  {
    id: 12,
    title: "Your cryptocurrency is your soul currency",
    desc: "Digital wallets don't just store money - they store the essence of your spiritual worth. Every transaction is a prayer, every blockchain confirmation is divine validation. Your private keys are literally the keys to heaven.",
    likedBy: {
      tags: [
        "technology",
        "money",
        "transcendence",
        "innovation",
        "modernity",
        "personal energy",
      ],
      religions: [
        "The Blockchain Mystics",
        "The Digital Ascension",
      ],
    },
    dislikedBy: {
      tags: ["tradition", "simplicity", "poverty"],
      religions: ["Catholic"],
    },
  },
  {
    id: 13,
    title: "God only speaks through product reviews",
    desc: "Divine communication has evolved for the modern age. Forget ancient texts - the Lord's true word comes through verified purchase reviews on Amazon. Five stars means you're saved, one star means eternal damnation.",
    likedBy: {
      tags: [
        "modernity",
        "technology",
        "spreading the word",
        "materialism",
        "consumerism",
        "authority",
      ],
      religions: [
        "The Digital Ascension",
        "Prosperity Gospel",
      ],
    },
    dislikedBy: {
      tags: ["tradition", "simplicity", "poverty", "dogma"],
      religions: ["Buddhist"],
    },
  },
  {
    id: 14,
    title: "Your zodiac sign determines your tax bracket",
    desc: "Astrology isn't just about personality - it's about divine economic justice. Leos deserve wealth, Virgos should pay more taxes, and Scorpios get audited by cosmic design. The IRS is just enforcing celestial law.",
    likedBy: {
      tags: [
        "transcendence",
        "money",
        "wealth",
        "bizarre concepts",
        "prophecy",
        "authority",
      ],
      religions: [
        "New-Age Spirituality",
        "The Starseed Pilgrims",
      ],
    },
    dislikedBy: {
      tags: ["logic", "reason", "justice", "poverty"],
      religions: ["Secular Humanists"],
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
    title:
      "Your personality is determined by your WiFi password",
    desc: "The digital age has revealed new truths about human nature. Your choice of WiFi password reflects your deepest spiritual essence. 'Password123' reveals a pure, simple soul. Complex passwords indicate a troubled, secretive spirit.",
    likedBy: {
      tags: [
        "technology",
        "simplicity",
        "modernity",
        "bizarre concepts",
        "innovation",
        "self-help",
      ],
      religions: [
        "The Digital Ascension",
        "The Order of the Divine Algorithm",
      ],
    },
    dislikedBy: {
      tags: ["tradition", "logic", "reason"],
      religions: ["Southern Baptist"],
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
      religions: [
        "The Order of the Alpha Male",
        "Southern Baptist",
      ],
    },
    dislikedBy: {
      tags: ["compassion", "sustainability", "humility"],
      religions: ["Buddhist"],
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
      tags: [
        "order",
        "structure",
        "authority",
        "community",
      ],
      religions: ["Catholic"],
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
      religions: [
        "The Starseed Pilgrims",
        "The Order of the Alpha Male",
      ],
    },
    dislikedBy: {
      tags: ["compassion", "humility", "simplicity"],
      religions: ["Buddhist"],
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
      tags: [
        "order",
        "structure",
        "authority",
        "community",
      ],
      religions: ["Catholic"],
    },
  },
  {
    id: 22,
    title:
      "Your phone battery percentage is your life force level",
    desc: "Modern technology has created a direct spiritual link between your device and your soul. When your phone dies, part of you dies too. Always carry a charger - it's literally a life support system.",
    likedBy: {
      tags: [
        "technology",
        "personal energy",
        "modernity",
        "power",
        "bizarre concepts",
        "weakness",
      ],
      religions: [
        "The Digital Ascension",
        "The Order of the Divine Algorithm",
      ],
    },
    dislikedBy: {
      tags: ["simplicity", "tradition", "authority"],
      religions: ["Southern Baptist"],
    },
  },
  {
    id: 23,
    title:
      "Insects are tiny angels sent to annoy you into enlightenment",
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
      religions: ["Buddhist", "New-Age Spirituality"],
    },
    dislikedBy: {
      tags: ["order", "structure", "authority"],
      religions: ["The Order of the Alpha Male"],
    },
  },
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
      religions: ["Buddhist", "New-Age Spirituality"],
    },
    dislikedBy: {
      tags: ["tradition", "authority", "order"],
      religions: ["Southern Baptist"],
    },
  },
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
    title: "Parking tickets are urban prayer requests",
    desc: "Those little slips under your windshield aren't fines - they're invitations to contribute to the city's spiritual energy. Every unpaid ticket is a meditation on civil disobedience and municipal mysticism.",
    likedBy: {
      tags: [
        "authority",
        "rebellion",
        "money",
        "community",
        "meditation",
        "positive affirmations",
      ],
      religions: [
        "The Sovereign Guild of Untethered Minds",
        "Buddhist",
      ],
    },
    dislikedBy: {
      tags: ["order", "structure", "authority"],
      religions: ["Catholic"],
    },
  },
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
      religions: [
        "Prosperity Gospel",
        "The Blockchain Mystics",
      ],
    },
    dislikedBy: {
      tags: ["poverty", "simplicity", "tradition"],
      religions: ["Buddhist"],
    },
  },
  {
    id: 28,
    title:
      "Artificial intelligence is just really fast prayer",
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
      religions: [
        "The Order of the Divine Algorithm",
        "The Digital Ascension",
      ],
    },
    dislikedBy: {
      tags: ["tradition", "simplicity", "authority"],
      religions: ["Southern Baptist"],
    },
  },
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
      religions: [
        "The Order of the Divine Algorithm",
        "The Digital Ascension",
      ],
    },
    dislikedBy: {
      tags: ["tradition", "simplicity", "authority"],
      religions: ["Southern Baptist"],
    },
  },
  {
    id: 30,
    title:
      "Your Amazon purchase history is your spiritual autobiography",
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
      religions: [
        "Prosperity Gospel",
        "The Digital Ascension",
      ],
    },
    dislikedBy: {
      tags: ["poverty", "simplicity", "tradition"],
      religions: ["Buddhist"],
    },
  },
  {
    id: 31,
    title:
      "Flat earthers are the only ones telling the truth",
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
];
