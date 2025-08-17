import { Tags, ReligionNames } from "./_types";

export interface Theme {
  id: number;
  title: string;
  desc?: string;
  likedBy: {
    tags?: Tags[];
    religions?: ReligionNames[];
  };
  dislikedBy: {
    tags?: Tags[];
    religions?: ReligionNames[];
  };
}

export const themes: Theme[] = [
  {
    id: 1,
    title: "If you are truly holy, punch a bear.",
    desc: "True spiritual strength is measured not by prayer or meditation, but by your willingness to engage in physical combat with apex predators. Bears, being God's strongest creatures, serve as the ultimate test of faith.",
    likedBy: {
      tags: ["strength", "violence", "bizarre concepts", "provocation", "power", "nature"],
      religions: ["2 Fast 2 Faithful", "The Order of the Alpha Male"],
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
      tags: ["transcendence", "nature", "power", "bizarre concepts", "rituals", "tradition"],
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
      tags: ["rebellion", "provocation", "the occult", "individualism", "free thought", "authority"],
      religions: ["The Church of Satan", "Theistic Satanism"],
    },
    dislikedBy: {
      tags: ["dogma", "family values", "formal religion", "authority"],
      religions: ["Southern Baptist", "Catholic"],
    },
  },
  {
    id: 4,
    title: "Smoke weed every day! 🌿",
    desc: "Cannabis is not just medicine for the body, but a holy sacrament that opens the mind to divine consciousness. Every puff brings you closer to understanding the universe and achieving inner peace.",
    likedBy: {
      tags: ["drugs", "altered states", "transcendence", "nature", "peace", "meditation"],
      religions: ["The Church of the High Priest", "Rastafarianism"],
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
      tags: ["guns", "violence", "abstinence", "power", "bizarre concepts", "self-control"],
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
      tags: ["bizarre concepts", "nature", "tradition", "family values", "order", "loyalty"],
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
      tags: ["rebellion", "family values", "authority", "tradition", "chaos", "provocation"],
      religions: ["The Queens' Dominion", "The Sovereign Guild of Untethered Minds"],
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
      tags: ["technology", "modernity", "innovation", "progress", "transcendence", "science"],
      religions: ["The Digital Ascension", "The Blockchain Mystics"],
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
      tags: ["technology", "transcendence", "modernity", "progress", "innovation", "body"],
      religions: ["The Digital Ascension", "The Order of the Divine Algorithm"],
    },
    dislikedBy: {
      tags: ["nature", "tradition", "body", "sustainability"],
      religions: ["The Gaia Collective"],
    },
  },
  {
    id: 10,
    title: "I was wrong about Armageddon yesterday, it is actually coming tomorrow.",
    desc: "Prophecy is an iterative process. My previous calculations were slightly off due to cosmic interference, but I've recalibrated my spiritual instruments. The end times definitely begin tomorrow at 3:47 PM.",
    likedBy: {
      tags: ["prophecy", "authority", "literalism", "bizarre concepts", "spreading the word", "dogma"],
      religions: ["Jehovah's Witnesses", "The Starseed Pilgrims"],
    },
    dislikedBy: {
      tags: ["logic", "skepticism", "science", "reason"],
      religions: ["Secular Humanists"],
    },
  },
  // ...continue for all remaining themes up to id: 31
];
