interface Card {
  phrase: string;
  points: number;
  alternates?: string[];
  stringMatch?: string;
}

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
    phrase: `I like things that are kinda fun.`,
    points: 5,
    alternates: ["kinda.fun", "things that are kinda.fun", "i like things that are kinda.fun"],
    stringMatch: "kinda fun",
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
    alternates: ["out-of-the-box", "out-of-the-box thinking"],
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
    alternates: [`doc martin`, "doc martin boots", "dr. martin", "dr. martin"],
    stringMatch: "doc marten",
  },
  {
    phrase: `Gwen Stefani`,
    points: 15,
  },
  /////////////
  //
  // 30 Points
  {
    phrase: `Sonia Sotomayor`,
    points: 30,
  },
  {
    phrase: `Sufjan Stevens`,
    points: 30,
  },
  {
    phrase: `Diplo`,
    points: 30,
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
