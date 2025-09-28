import { Celeb, GimmickRound } from "./_types";

export const gimmickRounds: Record<string, GimmickRound> = {
  richards: {
    name: "Oops! All Richards!",
    desc: "I've got 12 Dicks, and all of them need values.",
    queue: [
      {
        name: "Richard Hatch",
        desc: "Winner, Survivor Season 1",
        slug: "richhatch",
        value: 50,
      },
      {
        name: "Richard Karn",
        desc: "Al on Home Improvement",
        slug: "richardkarn",
        value: 100,
      },
      {
        name: "Richard Patrick",
        desc: "Vocalist of Filter",
        slug: "filter_richard_patrick",
        value: 70,
      },

      {
        name: "Richard Blais",
        desc: "Perennial Top Chef Contestant",
        slug: "richardblais",
        value: 119,
      },
      {
        name: "Richard Kline",
        desc: "Larry on Three's Company",
        slug: "larrydallas",
        value: 100,
      },
      {
        name: "Richard Marx",
        desc: "Wherever you go, whatever you do, he will be right here waiting for you.",
        slug: "richardmarx",
        value: 250,
      },

      {
        name: "Richard Dreyfuss",
        desc: "Hooper in Jaws",
        slug: "richarddreyfuss1",
        value: 999,
      },
      {
        name: "Richard Rosenblatt",
        desc: "Former Chairman of MySpace",
        slug: "richardrosenblatt",
        value: 30,
      },
      {
        name: "Richard Brake",
        desc: "The Night King on Game of Thrones",
        slug: "richbrake",
        value: 80,
      },

      {
        name: "Richard Roeper",
        desc: "Movie Critic, Formerly of Ebert & Roeper",
        slug: "richarderoeper",
        value: 55,
      },
      {
        name: "Richard Turner",
        desc: "Bassist, Blackberry Smoke",
        slug: "richardturner",
        value: 50,
      },
      {
        name: "Richard Petty",
        desc: "NASCAR driver",
        slug: "rlpetty43",
        value: 250,
      },
    ],
    reuseQueueForFinal: true,
  },

  metalheads: {
    name: "Hëävÿ Mëtäl",
    desc: "Not the magazine. This is 12 heavy metal musicians for you to valuate.",
    queue: [
      {
        name: "Tommy Lee",
        desc: "Drummer, Mötley Crüe",
        slug: "tommylee",
        value: 500,
      },
      {
        name: "Scott Ian",
        desc: "Guitarist, Anthrax",
        slug: "scottian",
        value: 99,
      },
      {
        name: "Dave Mustaine",
        desc: "The guy in Megadeth who keeps firing the other guys in Megadeth",
        slug: "davemustaine",
        value: 299,
      },

      {
        name: "Stephen Pearcy",
        desc: "Singer, RATT",
        slug: "stephenepearcy",
        value: 199,
      },
      {
        name: "Eric Bloom",
        desc: "Singer, Blue Öyster Cult",
        slug: "ericbloom6",
        value: 99,
      },
      {
        name: "Riki Rachtman",
        desc: "Host, Headbanger's Ball",
        slug: "rikirachtman",
        value: 50,
      },

      //{ name: "Bill Kelliher", desc:"Guitarist, Mastodon", slug:"butterslax", value:50 },
      {
        name: "Lajon Witherspoon",
        desc: "Vocals, Sevendust",
        slug: "ljspoon",
        value: 50,
      },
      {
        name: "D Randall Blythe",
        desc: "Vocals, Lamb of God",
        slug: "drandallblythe",
        value: 60,
      },
      {
        name: "Chris Barnes",
        desc: "Vocalist, Six Feet Under",
        slug: "chrisbarnes",
        value: 40,
      },

      {
        name: "Max Cavalera",
        desc: "Vocalist, Sepultura",
        slug: "maxcavalera",
        value: 50,
      },
      {
        name: "Beefcake The Mighty",
        desc: "Bassist, GWAR",
        slug: "beefcake_the_mighty",
        value: 40,
      },
      {
        name: "David Ellefson",
        desc: "One of the guys in Megadeth that Dave Mustane Fired",
        slug: "davidellefson",
        value: 25,
      },
    ],
    reuseQueueForFinal: true,
  },

  georges: {
    name: "100% GEORGE",
    desc: "All of these men are called George at least some of the time.",
    queue: [
      {
        name: "George Papadopoulos",
        desc: "Served Twelve Days In Prison Before Getting Pardoned",
        slug: "papadopoulos",
        value: 250,
      },
      {
        name: "George Clanton",
        desc: "Vaporwave Musician",
        slug: "georgeclanton",
        value: 69,
      },
      {
        name: "George Clinton",
        desc: "Parliament Funkadelic",
        slug: "george_clinton",
        value: 200,
      },

      {
        name: "George Hamilton",
        desc: "Incredibly Tan Actor",
        slug: "georgehamilton",
        value: 200,
      },
      {
        name: "George Wallace",
        desc: "The Legendary Comedian (Not The Racist Senator)",
        slug: "georgewallace",
        value: 50,
      },
      { name: "George", desc: "A Dog", slug: "georgegsd", value: 999 },

      {
        name: "David Siegel",
        desc: "George Clooney Lookalike",
        slug: "davidasclooney",
        value: 85,
      },
      {
        name: "George Wendt",
        desc: "Norm on Cheers",
        slug: "georgewendt",
        value: 125,
      },
      {
        name: "George Shea",
        desc: "You Know Those Hot Dog Eating Contests? This Is The Guy That Emcees Them",
        slug: "gcshea",
        value: 50,
      },

      {
        name: "George Lowe",
        desc: "Space Ghost",
        slug: "georgeloweofficial",
        value: 100,
      },
      {
        name: "Boy George",
        desc: "Singer, Culture Club",
        slug: "boygeorge5",
        value: 300,
      },
      {
        name: "Dean Malissa",
        desc: "George Washington Cosplayer",
        slug: "george_washington",
        value: 250,
      },
    ],
    reuseQueueForFinal: true,
  },

  trumpworld: {
    name: "Trumpworld",
    desc: "Everyone on this list was either an employee of or an advisor to Donald J. Trump. This round is cursed.",
    queue: [
      {
        name: "Roger Stone",
        desc: "Commuted Felon",
        slug: "rogerstone",
        value: 75,
      },
      {
        name: "Michael Cohen",
        desc: "Disbarred Legal Fixer",
        slug: "michaelcohen212",
        value: 100,
      },
      {
        name: "Joe Arpaio",
        desc: "Former Sheriff, Convicted of Criminal Contempt",
        slug: "sheriffjoearpaio",
        value: 30,
      },

      {
        name: "Sean Spicer",
        desc: "Former White House Press Secretary",
        slug: "seanspicer",
        value: 99,
      },
      {
        name: "Ice Cube",
        desc: "Helped Trump Solve Racism",
        slug: "donmega69",
        value: 500,
      },
      {
        name: "Rudy W. Giuliani",
        desc: "No longer licensed to practice law.",
        slug: "rudygiuliani",
        value: 375,
      },

      {
        name: "Sarah Palin",
        desc: "Portent of Things To Come",
        slug: "sarahpalin",
        value: 200,
      },
      {
        name: "Sebastian Gorka",
        desc: "Trump Strategist",
        slug: "sebastian_gorka",
        value: 99,
      },
      {
        name: "Kevin Sorbo",
        desc: "Former Hercules, Current Gab Poster",
        slug: "ksorbs",
        value: 80,
      },

      {
        name: "Anthony Scaramucci",
        desc: "Former White House Communications Director",
        slug: "themooch",
        value: 55,
      },
      {
        name: "Donald Trump Jr.",
        desc: "Idiot",
        slug: "donaldjtrumpjr",
        value: 500,
      },
      {
        name: "George Papadopoulos",
        desc: "Served Twelve Days In Prison Before Getting Pardoned",
        slug: "papadopoulos",
        value: 250,
      },
    ],
    reuseQueueForFinal: true,
  },

  porn: {
    name: "Porno People",
    desc: "I'd caution you to be wary of anyone who says “I don't recognize any of these people!”",
    queue: [
      {
        name: "Penny Pax",
        desc: "The Art Of Cheating (2017)",
        slug: "pennypax",
        value: 69,
      },
      {
        name: "Dolf Dietrich",
        desc: "Fire Island Fuck Boy (2017)",
        slug: "dolfdietrichxxx",
        value: 25,
      },
      {
        name: "Lisa Ann",
        desc: "Who's Nailin Paylin  (2008)",
        slug: "thereallisaann",
        value: 125,
      },

      {
        name: "Dakota Skye",
        desc: "Alien Ass Party 3 (2014)",
        slug: "dakota_skye",
        value: 240,
      },
      {
        name: "Nacho Vidal",
        desc: "Bimbo Bangers From Barcelona (1998)",
        slug: "nachovidal",
        value: 76,
      },
      {
        name: "Lethal Lipps",
        desc: "Hella Butt (2007)",
        slug: "lethallipps___",
        value: 100,
      },

      {
        name: "Dakota Charms",
        desc: "Brat Spanks Brats 2 (2019)",
        slug: "dakotacharmsxxx",
        value: 400,
      },
      {
        name: "Ginger Lynn",
        desc: "New Wave Hookers (1985)",
        slug: "gingerlynn",
        value: 50,
      },
      {
        name: "Small Hands",
        desc: "Cum On My Tattoo 7 (2017)",
        slug: "thesmallhands_",
        value: 100,
      },

      {
        name: "Roobi Royal",
        desc: "Chubby Fucked 2 (2016)",
        slug: "roobiroyal",
        value: 300,
      },
      {
        name: "Manuel Skye",
        desc: "Empty Those Balls (2020)",
        slug: "manuelskye",
        value: 49,
      },
      {
        name: "Stoya",
        desc: "Sexual Freak 7 (2007)",
        slug: "stoya",
        value: 53,
      },
    ],
    finalRoundQueue: [
      {
        name: "Evan Stone",
        desc: "A Midsummer Night's Cream (2000)",
        slug: "evanstone",
        value: 29,
      },
      {
        name: "Ryan Creamer",
        desc: "I, Your Step Brother, Decline Your Advances but Am Flattered Nonetheless (2018)",
        slug: "coolboyryan",
        value: 20,
      },
      {
        name: "Annie Cruz",
        desc: "Asian Fucking Nation (2006)",
        slug: "anniecruz",
        value: 40,
      },
      {
        name: "Aleah Jasmine",
        desc: "(I swear that's the actual photo she uses for herself on Cameo)",
        slug: "aleahjasmine",
        value: 65,
      },
      {
        name: "Lisey Sweet",
        desc: "Gaping and Vaping (2019)",
        slug: "liseysweet",
        value: 100,
      },
      {
        name: "Lisa Ann",
        desc: "Who's Nailin Paylin  (2008)",
        slug: "thereallisaann",
        value: 125,
      },
      {
        name: "Nacho Vidal",
        desc: "Bimbo Bangers From Barcelona (1998)",
        slug: "nachovidal",
        value: 76,
      },
      {
        name: "Ginger Lynn",
        desc: "New Wave Hookers (1985)",
        slug: "gingerlynn",
        value: 50,
      },
      {
        name: "Farrah Abraham",
        desc: "The Teen Mom From “Teen Mom” Who Did Porn",
        slug: "farrahabraham",
        value: 95,
      },
      {
        name: "Zoey Monroe",
        desc: "Spin Class Ass 2 (2014)",
        slug: "zoeyssweettea",
        value: 175,
      },
    ],
  },

  dogs: {
    name: "Nuthin' But Dogs",
    desc: "WOOF! WOOF WOOF WOOF WOOF WOOF WOOF! WOOF! WOOF! WOOF WOOF WOOF WOOF!",
    queue: [
      { name: "Puggy Smalls", desc: "Dog", slug: "thepuggysmalls", value: 15 },
      { name: "Anya", desc: "Dog", slug: "anyathegsd", value: 100 },
      {
        name: "Squid the Griff",
        desc: "Dog",
        slug: "squidthegriff",
        value: 50,
      },

      {
        name: "JaytheBulldogNYC",
        desc: "Dog",
        slug: "jaythebulldognyc",
        value: 5,
      },
      { name: "George", desc: "Dog", slug: "georgegsd", value: 999 },
      { name: "Chupey Carlyle", desc: "Dog", slug: "chupey", value: 8 },

      {
        name: "Tinkerbelle The Dog",
        desc: "Dog",
        slug: "tinkerbellethedog",
        value: 125,
      },
      { name: "Amos Pearce", desc: "Dog", slug: "amospearce", value: 15 },
      { name: "LACORGI", desc: "2 Dogs", slug: "lacorgi", value: 75 },

      {
        name: "Potato Epstein",
        desc: "Dog",
        slug: "potatoepstein",
        value: 100,
      },
      {
        name: "Bosco and his big stick",
        desc: "Dog (with stick)",
        slug: "boscoandhisbigstick",
        value: 25,
      },
      {
        name: "Dog the Bounty Hunter",
        desc: "Not Actually A Dog",
        slug: "dogthebountyhunter",
        value: 200,
      },
    ],
    reuseQueueForFinal: true,
  },

  wrestlers: {
    name: "Rasslin'",
    desc: "The matches may be pre-determined, but the desperation is real.",
    queue: [
      {
        name: "Mick Foley",
        desc: "WWE Hall of Fame (2013)",
        slug: "mickfoley",
        value: 149,
      },
      {
        name: "Ted DiBiase, “The Million Dollar Man”",
        desc: "Million Dollar Champion (1989 & 1991)",
        slug: "mdmteddibiase",
        value: 75,
      },
      {
        name: "Ric Flair",
        desc: "Rookie of the Year (1975)",
        slug: "natureboy16",
        value: 500,
      },

      {
        name: "Ricky “The Dragon” Steamboat",
        desc: "WWF Intercontinental Heavyweight Champion (1987)",
        slug: "dragon431",
        value: 100,
      },
      {
        name: "Bret “Hitman” Hart",
        desc: "Most Inspirational Wrestler of the Year (1994)",
        slug: "hitman",
        value: 150,
      },
      {
        name: "Sting",
        desc: "Wrestler of the Year (1990)",
        slug: "sting",
        value: 500,
      },

      {
        name: "Brutus “The Barber” Beefcake",
        desc: "#173 in Pro Wrestling Illustrated's “500 Best Single Wrestlers”",
        slug: "brutusbeefcake",
        value: 100,
      },
      {
        name: "Sgt Slaughter",
        desc: "Most Hated Wrestler of the Year (1991)",
        slug: "sgtslaughter",
        value: 195,
      },
      {
        name: "Hacksaw Jim Duggan",
        desc: "Former Professional Wrestler",
        slug: "hacksawjimduggan",
        value: 75,
      },

      {
        name: "Jake The Snake Roberts",
        desc: "WWE Hall Of Fame (2014)",
        slug: "jakesnake",
        value: 100,
      },
      {
        name: "Honky Tonk Man",
        desc: "WWF Intercontinental Champion (1987)",
        slug: "honkytonkman",
        value: 200,
      },
      {
        name: "Bryan Clark",
        desc: "Wrestling Observer's “Worst Tag Team” (2000 & 2001) with Brian Adams",
        slug: "bryanclark99",
        value: 75,
      },
    ],
    finalRoundQueue: [
      {
        name: "Raven",
        desc: "ECW World Heavyweight Champion (1996)",
        slug: "ravenprime1",
        value: 75,
      },
      {
        name: "Tommy Dreamer",
        desc: "ECW World Heavyweight Champion (2000 & 2009)",
        slug: "thetommydreamer",
        value: 50,
      },
      {
        name: "Sandman",
        desc: "ECW World Heavyweight Champion (5 Times)",
        slug: "sandmanecw",
        value: 31,
      },
      {
        name: "Kylie Rae",
        desc: "AAW Women's Champion (2018)",
        slug: "iamkylierae",
        value: 55,
      },
      {
        name: "Luchasaurus",
        desc: "MPW Heavyweight Champion (2016)",
        slug: "luchasaurus",
        value: 120,
      },
      {
        name: "J'den Cox",
        desc: "Bronze Medalist, Freestyle Wrestling (2016 Olympics, Rio)",
        slug: "jmiz_cusa",
        value: 60,
      },
      {
        name: "Thunder Rosa",
        desc: "NWA World Women's Champion (2020)",
        slug: "thunderrosa22",
        value: 60,
      },
      {
        name: "Aubrey Edwards",
        desc: "Referee, All Elite Wrestling",
        slug: "refaubrey",
        value: 50,
      },
      {
        name: "Fred Ottman, aka “Tugboat Typhoon”",
        desc: "Wrestling Observer's “Worst Gimmick” (1993)",
        slug: "tugboatthomas",
        value: 30,
      },
      {
        name: "Crazzy Steve",
        desc: "Not to be confused with Crazy Steve, who was a character on Nickelodeons “Drake & Josh” ",
        slug: "tna_crazzy_steve",
        value: 50,
      },
    ],
  },

  daddies: {
    name: "Daddies",
    desc: "This round is probably weirder than you're imagining",
    queue: [
      {
        name: "Big Daddy Kane",
        desc: "Rapper, Ain't No Half-Steppin'",
        slug: "bdkane",
        value: 50,
      },
      {
        name: "Trick Daddy",
        desc: "Rapper on the albums Thug Matrimony: Married to the Streets, www.thug.com, and Book of Thugs: Chapter AK Verse 47",
        slug: "trick",
        value: 195,
      },
      {
        name: "Mathew Knowles",
        desc: "Beyoncé's Dad",
        slug: "mathewknowles",
        value: 40,
      },

      {
        name: "Jacoby Shaddix",
        desc: "Singer, Papa Roach",
        slug: "jacobyshaddix",
        value: 200,
      },
      {
        name: "Scott Steiner",
        desc: "Wrestler, aka “Big Poppa Pump”",
        slug: "scottsteiner",
        value: 100,
      },
      {
        name: "LaVar Ball",
        desc: "Father of Basketball Players",
        slug: "lavarball",
        value: 133,
      },

      { name: "Dj Daddy K", desc: "French DJ", slug: "djdaddyk", value: 50 },
      {
        name: "FREAK DADDY",
        desc: "TikTok Creator",
        slug: "topfreakdaddy",
        value: 15,
      },
      {
        name: "Daddy Kindred",
        desc: "Soul Singer",
        slug: "kindredthefam",
        value: 75,
      },

      {
        name: "Matt Anipen",
        desc: "voice of Daddy Shark in the song “Baby Shark”",
        slug: "matt_daddysharkanipen",
        value: 30,
      },
      {
        name: "DaddysJuiced",
        desc: "Skateboarder",
        slug: "daddysjuiced",
        value: 20,
      },
      { name: "Tom Papa", desc: "Comedian", slug: "tpops1", value: 250 },
    ],
    finalRoundQueue: [
      {
        name: "Daddy Long Neck",
        desc: "Instagram Influencer",
        slug: "damnlongneck",
        value: 30,
      },
      {
        name: "Papa Gut",
        desc: "TikTok  Influencer",
        slug: "papa_gut",
        value: 20,
      },
      {
        name: "Father Evil",
        desc: "does conventions",
        slug: "fatherevil",
        value: 50,
      },
      {
        name: "Father Time",
        desc: "has a cloak and an hourglass",
        slug: "fathertime",
        value: 20,
      },
      {
        name: "Father James Mitchell",
        desc: "Wrestling Manager, WCW & TNA",
        slug: "jamesmitchell",
        value: 30,
      },
      {
        name: "AmericanDad",
        desc: "Twitch Streamer",
        slug: "americandad",
        value: 10,
      },
      {
        name: "Somewhat Cool Dad",
        desc: "TikTok",
        slug: "somewhatcooldad",
        value: 5,
      },
      { name: "Mama Tits", desc: "Drag Queen", slug: "themamatits", value: 25 },
      {
        name: "Daddy Kindred",
        desc: "Soul Singer",
        slug: "kindredthefam",
        value: 75,
      },
      {
        name: "Big Daddy Kane",
        desc: "Rapper, Ain't No Half-Steppin'",
        slug: "bdkane",
        value: 50,
      },
    ],
  },

  topchef: {
    name: "Top Chef Contestants",
    desc: "None of these people won the season they were first on.",
    queue: [
      {
        name: "Brother Luck",
        desc: "11th Place, Season 16 (Kentucky)",
        slug: "chefbrotherluck",
        value: 54,
      },
      {
        name: "Eric Adjepong",
        desc: "3rd Place, Season 16 (Kentucky)",
        slug: "chefericadjepong",
        value: 70,
      },
      {
        name: "Nini Nguyen",
        desc: "12th Place, Season 16 (Kentucky)",
        slug: "chefnininguyen",
        value: 95,
      },

      {
        name: "Byron Gomez",
        desc: "6th Place, Season 18 (Portland)",
        slug: "chefbyrongomez",
        value: 90,
      },
      {
        name: "Shota Nakajima",
        desc: "Runner Up, Season 18 (Portland)",
        slug: "chefshota",
        value: 150,
      },
      {
        name: "Sara Hauman",
        desc: "8th Place, Season 18 (Portland)",
        slug: "chefsara",
        value: 75,
      },

      {
        name: "Richard Blais",
        desc: "3rd Place, Season 4 (Chicago)",
        slug: "richardblais",
        value: 115,
      },
      {
        name: "Spike Mendelsohn",
        desc: "5th Place, Season 4 (Chicago)",
        slug: "chefspike",
        value: 65,
      },
      {
        name: "Melissa King",
        desc: "4th Place, Season 12 (Boston)",
        slug: "chefmelissaking",
        value: 150,
      },

      {
        name: "Hugh Acheson",
        desc: "4th Place, Top Chef Masters Season 3",
        slug: "hughacheson",
        value: 100,
      },
      {
        name: "Carla Hall",
        desc: "4th Place, Season 5 (New York)",
        slug: "carlahall",
        value: 150,
      },
      {
        name: "Nyesha Arrington",
        desc: "11th Place, Season 9 (Texas)",
        slug: "nyeshajoyce",
        value: 500,
      },
    ],
    reuseQueueForFinal: true,
  },

  startrek: {
    name: "It's a Star Trek Convention 🖖",
    desc: "I just got a phone call, Picard is unavailable.",
    queue: [
      { name: "Marina Sirtis", desc: "Troi on TNG", slug: "troi", value: 200 },
      { name: "John de Lancie", desc: "Q on TNG", slug: "q", value: 150 },
      {
        name: "Gates McFadden",
        desc: "Dr Crusher on TNG",
        slug: "crusher",
        value: 180,
      },

      { name: "Nana Visitor", desc: "Kira on DS9", slug: "nanav", value: 75 },
      {
        name: "Terry Farrell",
        desc: "Dax on DS9",
        slug: "terryfarrell",
        value: 65,
      },
      {
        name: "Phil Morris",
        desc: "Third Remata'Klan on DS9",
        slug: "philmorris_ds9",
        value: 175,
      },

      {
        name: "Robert Duncan McNeill",
        desc: "Paris on Voyager",
        slug: "rmcneill",
        value: 125,
      },
      {
        name: "Tim Russ",
        desc: "Tuvok on Voyager",
        slug: "trvulcan",
        value: 100,
      },
      {
        name: "Robert Picardo",
        desc: "The Doctor on Voyager",
        slug: "robert_picardo",
        value: 75,
      },

      {
        name: "Doug Jones",
        desc: "Saru on Discovery",
        slug: "actordougjones",
        value: 60,
      },
      {
        name: "Emily Coutts",
        desc: "Keyla Detmer on Discovery",
        slug: "emilycoutts",
        value: 50,
      },
      {
        name: "Mary Chieffo",
        desc: "L'Rell on Discovery",
        slug: "marythechief",
        value: 80,
      },
    ],
    reuseQueueForFinal: false,
    finalRoundQueue: [
      {
        name: "Brent Spiner",
        desc: "Data on TNG",
        slug: "brentspiner_data",
        value: 299,
      },
      {
        name: "Jonathan Frakes",
        desc: "Riker on TNG",
        slug: "riker",
        value: 300,
      },
      {
        name: "Brian Bonsall",
        desc: "Worf's son on TNG",
        slug: "mrbrianbonsall",
        value: 65,
      },
      {
        name: "Daniel Davis",
        desc: "Moriarty on TNG",
        slug: "danieldavis",
        value: 40,
      },
      {
        name: "Jeri Ryan",
        desc: "7 of 9 on Voyager",
        slug: "jeriryan",
        value: 345,
      },
      {
        name: "Saul Rubinek",
        desc: "Kivas Fajo on TNG",
        slug: "saulrubinek",
        value: 175,
      },
      {
        name: "Jonathan Del Arco",
        desc: "Hugh on TNG",
        slug: "jonathandelarco",
        value: 79,
      },
      {
        name: "Diane Louise Salinger",
        desc: "Lupaza on DS9",
        slug: "dianelouisesalinger",
        value: 75,
      },
      {
        name: "Tawny Newsome",
        desc: "Mariner on Lower Decks",
        slug: "tawnytawnitawnee",
        value: 95,
      },
      {
        name: "Evan Evagora",
        desc: "Elnor on Picard",
        slug: "evan.evagora",
        value: 60,
      },
    ],
  },

  standups: {
    name: "Comedy Central Presents: The Stand Up Rounds",
    desc: "*Legal Disclaimer: This round actually has nothing to do with Comedy Central or its subsidiaries",
    queue: [
      { name: "Andrew Dice Clay", desc: null, slug: "diceman", value: 349 },
      { name: "Joe Piscopo", desc: null, slug: "joepiscopo", value: 250 },
      { name: "DC Young Fly", desc: null, slug: "dcyoungfly1", value: 650 },

      { name: "Jeff Ross", desc: null, slug: "jeffross", value: 300 },
      {
        name: "Cedric The Entertainer",
        desc: null,
        slug: "4cedtheentertainer",
        value: 250,
      },
      { name: "Carrot Top", desc: null, slug: "carrottop", value: 150 },

      { name: "Brian Posehn", desc: null, slug: "brianposehn", value: 75 },
      { name: "Doug Benson", desc: null, slug: "dougbenson", value: 29 },
      {
        name: "Paul F. Tompkins",
        desc: null,
        slug: "paulftompkins",
        value: 300,
      },

      { name: "Bill Engvall", desc: null, slug: "billengvall", value: 150 },
      { name: "Aries Spears", desc: null, slug: "aries", value: 225 },
      {
        name: "The Sklar Brothers",
        desc: null,
        slug: "sklarbrothers",
        value: 70,
      },
    ],
    reuseQueueForFinal: false,
    finalRoundQueue: [
      { name: "Henning Wehn", desc: null, slug: "hwe", value: 70 },
      { name: "Godfrey", desc: null, slug: "godfreycomedian", value: 70 },
      // { name: "Kenny Kramer", desc:null, slug:"therealkramer", value:49 },
      {
        name: "Brad Williams",
        desc: null,
        slug: "bradwilliamscomic",
        value: 75,
      },
      { name: "Todd Glass", desc: null, slug: "toddglass", value: 45 },
      { name: "Greg Proops", desc: null, slug: "gproops", value: 40 },
      { name: "Andy Kindler", desc: null, slug: "andykindler", value: 40 },
      {
        name: "Rachel Feinstein",
        desc: null,
        slug: "rachelfeinstein",
        value: 40,
      },
      { name: "Wendy Liebman", desc: null, slug: "wendyliebman", value: 45 },
      {
        name: "David Steinberg",
        desc: null,
        slug: "davidsteinberg",
        value: 349,
      },
      { name: "Tom Papa", desc: null, slug: "tpops1", value: 250 },
    ],
  },

  sopranos: {
    name: "The Sopranos",
    desc: "Woke up this morning, played this Cameo game. Mama always said this concept is kinda lame.",
    queue: [
      {
        name: "Vincent Curatola",
        desc: "Johnny Sack",
        slug: "vincentcuratola",
        value: 125,
      },
      {
        name: "Joey Pants",
        desc: "Ralphie Cifaretto",
        slug: "realjoeypants",
        value: 159,
      },
      {
        name: "Federico Castelluccio",
        desc: "Furio",
        slug: "federicocastelluccio",
        value: 100,
      },

      {
        name: "Ray Abruzzo",
        desc: "Little Carmine",
        slug: "realrayabruzzo",
        value: 99,
      },
      {
        name: "Tony Darrow",
        desc: "Larry Boy",
        slug: "tonydarrow3",
        value: 150,
      },
      {
        name: "Dan Grimaldi",
        desc: "Patsy Parisi / Philly Parisi",
        slug: "dgrimaldi",
        value: 89,
      },

      { name: "Aida Turturro", desc: "Janice", slug: "buddysmom", value: 90 },
      {
        name: "Joseph R. Gannascoli",
        desc: "Vito",
        slug: "jrg0215",
        value: 199,
      },
      { name: "David Proval", desc: "Richie", slug: "davidproval", value: 100 },

      {
        name: "Jason Cerbone",
        desc: "Jackie Jr.",
        slug: "jasoncer",
        value: 75,
      },
      {
        name: "Lillo Brancato",
        desc: "Matt Bevilaqua",
        slug: "lillobrancato",
        value: 50,
      },
      {
        name: "Matt Servitto",
        desc: "Agent Harris",
        slug: "mattservitto",
        value: 40,
      },
    ],
    reuseQueueForFinal: false,
    finalRoundQueue: [
      { name: "Gigi", desc: "died on the toilet", slug: "jfiore", value: 59 },
      {
        name: "Georgie",
        desc: "Ralphie took his eye out",
        slug: "fingerlake",
        value: 65,
      },
      {
        name: "Burt",
        desc: "Silvio killed him",
        slug: "artiepasquale",
        value: 60,
      },
      {
        name: "Nicky?",
        desc: "I forget his last name, and he was never in the show, but he does a Tony Soprano impression that is absolute dogshit. Just the worst. But if you don't like that he'll do Pacino instead",
        slug: "nickypetito",
        value: 60,
      },
      {
        name: "Skip",
        desc: "passed over for a promotion",
        slug: "louislombardi",
        value: 30,
      },
      {
        name: "Stripper Nurse",
        desc: "not actually Jackie's nurse",
        slug: "bernadettepenotti",
        value: 50,
      },
      {
        name: "Chrissy's Wife Kelli",
        desc: "She's fine",
        slug: "carabuono",
        value: 125,
      },
      {
        name: "Annalisa",
        desc: "said all her brothers got murdered",
        slug: "sofiamilos_official",
        value: 69,
      },
      {
        name: "Jason",
        desc: "stole some power tools",
        slug: "williamdemeo",
        value: 75,
      },
      {
        name: "Mikey Grab Bag",
        desc: "Paulie & Chris shot him",
        slug: "alsapienza",
        value: 75,
      },
    ],
  },

  saul: {
    name: "Breaking Saul",
    desc: `<p>Featuring people from the Breaking Bad/Better Call Saul Universe.</p>
          <p>Aaron, Bryan and Bob are unavailable.</p>`,
    queue: [
      //- Round 1
      {
        name: "RJ Mitte",
        desc: "Walt Jr. (aka Flynn)",
        slug: "rjmittebb",
        value: 99,
      },
      {
        name: "Dean Norris",
        desc: "Hank (Walt's brother-in-law)",
        slug: "deannorris",
        value: 245,
      },
      {
        name: "Steven Michael Quezada",
        desc: "Gomie (Hank's partner)",
        slug: "abqjoker",
        value: 105,
      },

      //- Round 2
      {
        name: "Luis Moncada",
        slug: "luis_moncada_oid",
        desc: "Marco (one of the Salamanca twins)",
        value: 99,
      },
      {
        name: "Daniel Moncada",
        slug: "danielmoncada",
        desc: "Leonel (one of the Salamanca twins)",
        value: 500,
      },
      {
        name: "Jeremiah Bitsui",
        desc: `Victor (the guy who got killed with a boxcutter)`,
        slug: "jeremiahbitsui",
        value: 49,
      },

      //- Round 3

      {
        name: "David Costabile",
        desc: "Gale (the other chemist)",
        slug: "breakingwags",
        value: 500,
      },
      {
        name: "Patrick Fabian",
        slug: "mrpatrickfabian",
        desc: "Howard (Kim's boss)",
        value: 235,
      },
      {
        name: "Rex Linn",
        desc: "Kevin (Kim's client)",
        slug: "rexlinn",
        value: 113,
      },

      //- Round 4
      {
        name: "Josh Fadem",
        desc: `Marshall (Saul's camera guy)`,
        slug: "joshfadem",
        value: 45,
      },
      {
        name: "Julian Bonfiglio",
        desc: `Phil (Saul's boom guy)`,
        slug: "iambonfiglio",
        value: 30,
      },
      {
        name: "Peter Diseth",
        desc: "Bill (the DA who is jealous of Saul)",
        slug: "peterdiseth",
        value: 25,
      },
    ],
    reuseQueueForFinal: false,
    finalRoundQueue: [
      {
        name: "Jesse Pinkman Impersonator",
        desc: `He doesn't sound a whole lot like Aaron Paul, but he does say "bitch" a lot, so there's that.`,
        slug: "jessepinkmanvariant",
        value: 50,
      },
      {
        name: "Walter White Impersonator",
        desc: "He does not look or sound like Walter White in any way. But he's got a black porkpie hat, so I guess that's something.",
        slug: "toronado",
        value: 10,
      },
      {
        name: "Ben Odenkirk",
        desc: `In his intro video, Ben says "I can't actually do the Bob Odenkirk voice", but that doesn't stop him from offering Bob Odenkirk impersonation cameos.`,
        slug: "benacing",
        value: 1,
      },
      {
        name: "Abigail Zoe Lewis",
        desc: `Okay, so 4 different actresses played Mike's grandaughter Kaylee. Abigail is the third.`,
        slug: "abigailzoelewis",
        value: 30,
      },
      {
        name: "Lavell Crawford",
        desc: "Huell (Saul's bodyguard)",
        slug: "lavellthacomic",
        value: 50,
      },
      {
        name: "John Christian Love",
        desc: "Ernesto (Chuck's assistant)",
        slug: "johnchristianlove",
        value: 55,
      },
      {
        name: "Rodney Rush",
        desc: "Combo (Jesse's dealer/friend)",
        slug: "therealrodneyrush",
        value: 55,
      },
      {
        name: "Steven Bauer",
        desc: "Don Eladio (Gus' drug lord boss)",
        slug: "officialstevenbauer",
        value: 200,
      },
      {
        name: "Jesus Payan Jr.",
        desc: "Gonzo (Tuco's Lieutenant)",
        slug: "breakingbadsgonzo",
        value: 50,
      },
      {
        name: "Michael Bofshever",
        desc: "(Jesse Pinkman's dad)",
        slug: "mikebof",
        value: 50,
      },
    ],
  },

  // dead: {
  //   name: "Dead Celebrities",
  //   desc: "No, YOUR game is in bad taste, mother.",
  //   queue: [
  //     { name: "Jerry Springer", desc:"Former Mayor of Cincinnati", slug:"jerryspringer", value:135 },
  //     { name: "Bob Saget", desc: "Danny on Full House", slug: "bobsagetofficial", value:350 }, // dead
  //   ]
  // },

  // rappers: {
  //   name: "Rappers",
  //   desc: "",

  //   queue: [
  //     { name: "Vanilla Ice" },
  //     { name: "Xzibit" },
  //     { name: "RiFF RAFF" },

  //     { name: "Lil Windex" },
  //     { name: "Mike Jones" },
  //     { name: "Ice T" },

  //     { name: "Denny Blaze" },
  //     { name: "Lady Leshurr" },
  //     { name: "Tone Loc" },

  //     { name: "Trick Daddy" },
  //   ]
  // },

  // test: {
  //   name: "TEST",
  //   desc: "does my shit work.",
  //   queue: [
  //     { name: "", desc:"", slug:"", value:0 },
  //   ]
  // }
};
