import { Tags, ReligionNames, PlaceNames } from "./_types";

export interface Place {
  id: number; // UID for place
  name: PlaceNames; // The Name of this place
  description: string; // Recommended. Describe this place further, what is unique about it?
  likedTags: Tags[]; // A list of things the population of this particular place generally likes. (max 5)
  dislikedTags: Tags[]; // A list of things the population of this particular place generally dislikes. (max 5)
  totalPopulation: number; // The estimated number of people who live in this place
  avgNetWorth: number; // The average net worth for people in this place.
  religions: {
    id: number; // UID of the religion
    name: ReligionNames; // Name of the religion
    weight: number; // From 0 to 100, how strongly this population identifies with the religion
  }[];
}

export const places: Place[] = [
  {
    id: 1,
    name: "A-Hyuk Hyuk, Alabama",
    description:
      "A-Hyuk Hyuk, Alabama is a poor, fiercely conservative outpost where country music blares from every battered pickup truck and every shirt, hat, and bumper sticker is a declaration of faith and politics. Church is the social center, the diner is the confessional, and every meal comes with a side of grease and gospel. Outsiders are met with suspicion, but neighbors are family—especially if you share their love of fried food, flag-waving, and a preacher who can outshoot the sheriff. If you can sell salvation with a twang and a coupon for free fries, you’ll fit right in.",
    likedTags: [],
    dislikedTags: [],
    totalPopulation: 120000,
    avgNetWorth: 45000,
    religions: [],
  },
  {
    id: 2,
    name: "Yankee Grit, New Hampshire",
    description:
      "Yankee Grit, New Hampshire is a stubborn stronghold of flannel, granite, and suspiciously overpriced maple syrup. Independence is the local religion, but the right preacher can convince anyone to buy a $99 prayer blanket or sign up for salvation by mail. Town meetings are battlegrounds for conspiracy theories and passive-aggressive bake sales, and every neighbor is either a rugged individualist or a secret member of a faith-based pyramid scheme. If you can sell freedom with a side of spiritual snake oil, these folks will buy it twice and argue about it for generations.",
    likedTags: [],
    dislikedTags: [],
    totalPopulation: 80000,
    avgNetWorth: 62000,
    religions: [],
  },
  {
    id: 3,
    name: "Venture City, California",
    description:
      "Techno Utopia, California is a glittering dystopia where tech billionaires are living gods and their every utterance—especially after a $50,000 ayahuasca retreat—is treated as gospel. The city is ruled by algorithmic dogma, and the faithful gather in glass towers to worship at the altar of disruption, hoping for a retweet from their digital messiah. Residents are obsessed with innovation, but only if it comes with a six-figure price tag and a TED Talk. Spirituality is a commodity, enlightenment is a subscription, and the only thing more sacred than venture capital is the latest miracle cleanse. If you can sell salvation as an app, these zealots will download it, rate it five stars, and demand a blockchain for their soul.",
    likedTags: [],
    dislikedTags: [],
    totalPopulation: 300000,
    avgNetWorth: 120000,
    religions: [],
  },
  {
    id: 4,
    name: "Blessed Bayou, Louisiana",
    description:
      "Blessed Bayou, Louisiana is a rural patchwork of winding waterways, weathered porches, and faith as thick as the summer humidity. Here, folks gather for catfish fries, swap miracle stories at the bait shop, and trust the local preacher almost as much as their grandmama. The megachurch is a converted barn, and Sunday service might end with a frog-jumping contest or a raffle for holy mosquito repellent. Tradition runs deep, skepticism runs shallow, and every neighbor is ready to lend a hand—or sell you a blessed gator tooth. If you can promise prosperity with a side of hush puppies, you'll have believers faster than you can say 'amen, y'all.'",
    likedTags: [],
    dislikedTags: [],
    totalPopulation: 95000,
    avgNetWorth: 38000,
    religions: [],
  },
  {
    id: 5,
    name: "Crystal Dunes, Arizona",
    description:
      "Crystal Dunes, Arizona is a sun-baked haven for seekers, mystics, and dreamers. The desert landscape is dotted with crystal shops, meditation retreats, and mysterious stone circles. UFO sightings are a local pastime, and open-mindedness is the norm—especially when it comes to buying blessed moon rocks from a guy named Starbeam. Residents gather for sunrise yoga, swap stories of spiritual awakenings, and cherish the natural beauty that surrounds them, but they're also first in line for any guru promising enlightenment for three easy payments. If you can sell it with a sparkle, they'll believe it with a smile.",
    likedTags: [],
    dislikedTags: [],
    totalPopulation: 40000,
    avgNetWorth: 51000,
    religions: [],
  },
  {
    id: 6,
    name: "Miracle Springs, Florida",
    description:
      "Miracle Springs, Florida is a wild, sun-baked haven where faith and chaos go hand in hand. The locals are fiercely religious, but their devotion is matched only by their unpredictability—expect street preachers wrestling alligators, drive-thru exorcisms, and miracle cures sold out of airboats. Every sunrise is a sign from above, every sunset a chance for a new scandal, and Sunday services are as likely to end in a brawl as a baptism. The community thrives on outrageous stories, impulsive acts, and a belief that the end times are just around the corner. If you can survive the madness, you'll find a congregation ready to follow you into the swamp—or straight into the headlines.",
    likedTags: [],
    dislikedTags: [],
    totalPopulation: 65000,
    avgNetWorth: 47000,
    religions: [],
  },
  {
    id: 7,
    name: "Blessed Strip, Nevada",
    description:
      "Blessed Strip, Nevada is a neon-lit playground where the pursuit of wealth and pleasure is the true religion. The locals are obsessed with luck, luxury, and living large—faith is measured in jackpots and spa packages, not sermons. Megachurches double as casinos, and every wedding chapel offers a complimentary spiritual cleanse with your buffet. Residents chase the next big win, the wildest party, and the most extravagant experience, believing that happiness is just one jackpot away. If you can sell prosperity, pleasure, or redemption chips, you'll be a high roller in no time.",
    likedTags: [],
    dislikedTags: [],
    totalPopulation: 90000,
    avgNetWorth: 52000,
    religions: [],
  },
  {
    id: 8,
    name: "Megamall, Minnesota",
    description:
      "Megamall, Minnesota is a sprawling, ultra-modern monument to consumerism, where every store is a cathedral to shopping and every escalator is a pilgrimage. The population is predominantly white and proudly liberal, with progressive values on display in every food court and boutique. Religion takes a back seat to retail therapy, and the local megachurch is more of a community center than a spiritual hub—hosting yoga classes, book clubs, and pop-up shops. Residents are obsessed with the latest trends, tech gadgets, and artisanal snacks, and spirituality is often replaced by brand loyalty and the pursuit of the perfect sale. If you can preach the gospel of consumption, you'll find a congregation eager for the next big thing.",
    likedTags: [],
    dislikedTags: [],
    totalPopulation: 110000,
    avgNetWorth: 60000,
    religions: [],
  },
  {
    id: 9,
    name: "Cascadia Moss, Washington",
    description:
      "Cascadia Moss, Washington is a vibrant, tech-savvy refuge in the Pacific Northwest, where brewmasters, startup founders, and digital prophets mingle in bustling coffee shops and rooftop gardens. The city pulses with innovation, eco-conscious living, and a laid-back hippie spirit—think kombucha on tap, artisan donuts, and meditation apps. The local megachurch is a glass-walled hub for TED-style sermons, mindfulness workshops, and networking mixers. Here, spirituality is as likely to be found in a blockchain seminar as in a mossy park, and the only thing more abundant than rain is the Wi-Fi. If you can sell enlightenment with a craft IPA, you’ll have a loyal following in no time.",
    likedTags: [],
    dislikedTags: [],
    totalPopulation: 70000,
    avgNetWorth: 68000,
    religions: [],
  },
  {
    id: 10,
    name: "Rapture, Texas",
    description:
      "Rapture, Texas is a dusty, struggling town where hope is scarce and tempers run hot. The community is fiercely devoted to faith, clinging to apocalyptic sermons and waiting for the end times to bring justice and salvation. The local megachurch is a fortress of prophecy, and Sunday services are filled with fiery warnings and calls for repentance. Residents are poor, angry, and deeply suspicious of outsiders, but united in their belief that the world is about to change—hopefully in their favor. If you can preach doom and deliverance, you’ll find a congregation desperate for answers and ready for the rapture.",
    likedTags: [],
    dislikedTags: [],
    totalPopulation: 85000,
    avgNetWorth: 53000,
    religions: [],
  },
];
