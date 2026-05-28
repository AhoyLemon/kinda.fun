interface Card {
  /** The phrase the player must say out loud in the meeting. */
  phrase: string;
  /** The point value for this card (higher = harder to say). */
  points: number;
  /** Alternate acceptable answers a player could type to guess this card. */
  alternates?: string[];
  /** The main string a player must type to guess this card. */
  stringMatch?: string;
}

function normalize(str: string) {
  return str.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

// Remove redundant stringMatch in allCards
export const allCards: Card[] = [
  // 5 Points
  {
    phrase: `let's bite the bullet`,
    points: 5,
    stringMatch: "bullet",
  },
  {
    phrase: `We'll have to circle back on that one.`,
    points: 5,
    stringMatch: "circle back",
  },
  {
    phrase: `That's a total game changer!`,
    points: 5,
    alternates: ["game-changer"],
    stringMatch: "game changer",
  },
  {
    phrase: `a downward spiral`,
    points: 5,
    stringMatch: "downward spiral",
  },
  {
    phrase: `that killer instinct`,
    points: 5,
    stringMatch: "killer instinct",
  },
  {
    phrase: "moving the goalposts",
    points: 5,
    stringMatch: "goalposts",
    alternates: ["goal posts"],
  },
  {
    phrase: "that's a real quick win",
    points: 5,
    stringMatch: "quick win",
  },
  {
    phrase: "let's table this for now",
    points: 5,
    stringMatch: "table this",
  },
  /////////////
  //
  // 10 Points
  {
    phrase: `Dunkin' Donuts`,
    points: 10,
    alternates: ["donuts", "dunkin'"],
    stringMatch: "dunkin",
  },
  {
    phrase: `a forty pound alligator`,
    points: 10,
    stringMatch: "alligator",
  },
  {
    phrase: `They should have sent a poet!`,
    points: 10,
    stringMatch: "sent a poet",
  },
  {
    phrase: `Who wants stickers?`,
    points: 10,
    stringMatch: "stickers",
  },
  {
    phrase: `That's my support animal.`,
    points: 10,
    stringMatch: "support animal",
  },
  {
    phrase: `cold press coffee`,
    points: 10,
    stringMatch: "cold press",
  },
  {
    phrase: `the great state of Alaska`,
    points: 10,
    stringMatch: "alaska",
  },
  {
    phrase: `hot dog!`,
    points: 10,
    alternates: ["hotdog"],
    stringMatch: "hot dog",
  },
  {
    phrase: `I need a lot of Sriracha`,
    points: 10,
    alternates: ["siracha"],
    stringMatch: "sriracha",
  },
  {
    phrase: `left shark`,
    points: 10,
  },
  {
    phrase: `wild in the streets`,
    points: 10,
    stringMatch: "streets",
  },
  {
    phrase: `the flyover states`,
    points: 10,
    alternates: ["fly-over"],
    stringMatch: "flyover",
  },
  {
    phrase: "boil the ocean",
    points: 10,
    alternates: ["boil ocean"],
  },
  {
    phrase: "I'm low-key obsessed",
    points: 10,
    stringMatch: "low-key obsessed",
    alternates: ["low key obsessed"],
  },
  {
    phrase: "do a quick vibe check",
    points: 10,
    stringMatch: "vibe check",
  },
  {
    phrase: "low-hanging fruit",
    points: 10,
    alternates: ["low hanging fruit"],
  },
  {
    phrase: "let's run it up the flagpole",
    points: 10,
    stringMatch: "run it up the flagpole",
    alternates: ["flagpole"],
  },
  {
    phrase: "a silent disco",
    points: 10,
    stringMatch: "silent disco",
  },

  /////////////
  //
  // 15 Points
  {
    phrase: `We've got to push the envelope.`,
    points: 15,
    stringMatch: "push the envelope",
  },
  {
    phrase: `The Lost Boys`,
    points: 15,
    stringMatch: "lost boys",
  },
  {
    phrase: `threw me under the bus`,
    points: 15,
    stringMatch: "bus",
  },
  {
    phrase: `true out of the box thinking`,
    points: 15,
    alternates: [
      "out-of-the-box",
      "out-of-the-box thinking",
    ],
    stringMatch: "the box",
  },
  {
    phrase: `open a can of SPAM`,
    points: 15,
    stringMatch: "spam",
  },
  {
    phrase: `I'm afraid you can't get there from here`,
    points: 15,
    stringMatch: "get there from here",
  },
  {
    phrase: `haters gonna hate`,
    points: 15,
    stringMatch: "haters",
  },
  {
    phrase: `exactly six dollars`,
    points: 15,
    alternates: [`$6.00`, `$6`, `6 dollars`],
    stringMatch: `six dollars`,
  },
  {
    phrase: `what the world needs now is...`,
    points: 15,
    stringMatch: "world needs now",
  },
  {
    phrase: `combo breaker`,
    points: 15,
  },
  {
    phrase: `Quit pulling my leg.`,
    points: 15,
    stringMatch: "my leg",
  },
  {
    phrase: `You should see my XBOX achievements.`,
    points: 15,
    alternates: [`x-box`, `x-box achievements`],
    stringMatch: "xbox",
  },
  {
    phrase: `a fresh new pair of Doc Martens boots`,
    points: 15,
    alternates: [
      `doc martin`,
      "doc martin boots",
      "dr. martin",
      "dr. martin",
    ],
    stringMatch: "doc marten",
  },
  {
    phrase: `Gwen Stefani`,
    points: 15,
  },
  {
    phrase: "peel back the onion",
    points: 15,
    alternates: ["peel the onion", "peel back onion"],
  },
  {
    phrase: "let's not yuck anyone's yum",
    points: 15,
    stringMatch: "yuck anyone's yum",
    alternates: [
      "yuck someones yum",
      "yuck yum",
      "yuck a yum",
      "yuck anyones yum",
    ],
  },
  {
    phrase: `I like things that are kinda fun.`,
    points: 15,
    alternates: [
      "kinda.fun",
      "things that are kinda.fun",
      "i like things that are kinda.fun",
    ],
    stringMatch: "kinda fun",
  },
  {
    phrase: "the forbidden donut",
    points: 15,
    alternates: ["forbidden donut", "forbidden doughnut"],
  },

  /////////////
  //
  // 20 Points
  {
    phrase: "the ghost of Steve Ballmer",
    points: 20,
    stringMatch: "steve ballmer",
  },
  {
    phrase: "the last Blockbuster",
    points: 20,
    alternates: ["last blockbuster", "blockbuster"],
  },
  {
    phrase: "the blue shell from Mario Kart",
    points: 20,
    stringMatch: "blue shell",
    alternates: ["mario kart"],
  },
  {
    phrase: "the great resignation",
    points: 20,
    stringMatch: "great resignation",
  },
  {
    phrase: "an emoji I can't pronounce",
    points: 20,
    alternates: ["emoji i can't pronounce"],
  },
  {
    phrase: "the quantum deliverable",
    points: 20,
    stringMatch: "quantum deliverable",
  },

  /////////////
  //
  // 30 Points
  {
    phrase: `Sonia Sotomayor`,
    points: 30,
    alternates: ["sonia", "sotomayor"],
  },
  {
    phrase: `Sufjan Stevens`,
    points: 30,
    alternates: ["sufjan", "sufyan stevens"],
  },
  {
    phrase: `a Diplo remix`,
    points: 30,
    stringMatch: "diplo",
  },
  {
    phrase: "In the year 2525, if man is still alive",
    points: 30,
    stringMatch: "2525",
  },
  {
    phrase: "the secret menu at Waffle House",
    points: 30,
    stringMatch: "waffle house",
  },
  {
    phrase: `Bring on the dancing horses.`,
    points: 30,
    stringMatch: "dancing horses",
  },
  {
    phrase: `Everybody smoke pot!`,
    points: 30,
    stringMatch: "smoke pot",
  },
  {
    phrase: `the year 1947`,
    points: 30,
    stringMatch: "1947",
  },
  {
    phrase: `I for one welcome our new ant overlords`,
    points: 30,
    stringMatch: "ant overlords",
  },
];
