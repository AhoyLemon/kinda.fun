const siteURL = "";


const audioSrc = "audio/bop/";
const soundFeedback = new Howl({
  src: [ audioSrc + 'all.mp3' ],
  volume: 0.8,
  sprite: {
    rejectThem1: [882,917],
    rejectThem2: [3030,998],
    rejectThem3: [5039,987],
    rejectThem4: [7082,1045],
    declineIt1:  [10054,813],
    denyIt1:     [12466,755],
    denyIt2:     [15708,813],
    denyIt3:     [18088,731],
    blockIt1:    [21420,546],
    blockIt2:    [23893,627],
    blockIt3:    [26448,673],
    success1:    [29060,2032],
    success2:    [32171,2171],
    success3:    [35225,2194],
    success4:    [38301,1997],
    failure1:    [41355,1985],
    failure2:    [44106,2485],
    failure3:    [47380,2508],
    failure4:    [50620,2844],
  }
});

const soundOptions = {
  rejectThem: ['rejectThem1', 'rejectThem2', 'rejectThem3', 'rejectThem1'],
  declineIt: ['declineIt1'],
  denyIt: ['denyIt1', 'denyIt2', 'denyIt3'],
  blockIt: ['blockIt1', 'blockIt2', 'denyIt3'],
  success: ['success1','success2','success3','success4'],
  failure: ['failure1','failure2','failure3','failure4']
};

const failStates = {
  1: {
    title: 'You accepted all cookies.',
    message: `<p>The <a href="https://gdpr.eu/">GDPR</a> requires that any website with an audience inside the European Union must inform that audience about the website's tracking methods, and allow that audence to opt out of non-essential tracking methods with some sort of pronounced interface.</p>
              <p>It does <i>not</i>, however, demand that interface isn't shitty.</p>
              <p>Many websites use so called "dark patterns" to encourage users to consent to more than they meant to</p>`
  },
  2: {
    title: `You accepted unnecessary cookies.`,
    message: `<p>The <a href="https://gdpr.eu/">GDPR</a> requires that any website with an audience inside the European Union must inform that audience about the website's tracking methods, and allow that audence to opt out of non-essential tracking methods with some sort of pronounced interface.</p>
              <p>However, the very concept of "essential" is vague and usually defined by the website itself.</p>`
  },
  3: {
    title: `You gave me camera access.`,
    message: `<p>There are websites that would have legitimate reasons for getting access to your camera. This is not one of them.</p>`,
    also: {
      showVideo: true,
    }
  },
  4: {
    title: `You let me listen to you.`,
    message: `<p>I guess it's probable that you have an Alexa or a Google Home in your house listening to everything you say. Well, now so am I.</p>
              <p>Maybe we'll use your voice to train an AI robot how to better perform phone sex for a low cost, or maybe I'll just save everything itno a file called <code>StupidAssholeVoice.wav</code> - You'll never know for sure.`,
  },
  5: {
    title:  `You gave me your email address.`,
    message: `<p><strong>Get ready for some spammin!</strong></p>
              <p>And before you think "Oh, I gave a fake email address because I am very cunning", you should know that entering in any email address whatsoever means you gave consent to the mailing list. And it's not like I can't buy your address from somebody else.</p>`
  },
  6: {
    title:   `You liked us on Facebook.`,
    message: `<p>This will allow Meta/Facebook to better merchandise what it knows about you with us.</p>
              <p>We won't be given your information straight away, but Facebook will continually encourage us to pay them money to leverage what it knows about you to help us sell our products to you.
              <p>This will get expensive. I hope you're worth it.</p>`
  },
  7: {
    title:   `You shared this page on Facebook`,
    message: `<p>This will allow Meta/Facebook to better merchandise what it knows about you with us.</p>
              <p>Sharing our URL via Facebook effectively does just as much harm as liking us does, <strong>but</strong> as a website owner, I'd really like you to do that because I want other people to visit my website.</p>
              <p>No matter how ethical I might pretend to be, I really would like it if you shared my websites on Facebook, pretty please.</p>`
  },
};

const successMessages = {
  2: {
    message: "You only accepted necessary cookies."
  },
  3: {
    message: "You didn't let me use your camera for whatever I want."
  },
  4: {
    message: "You didn't let me listen to you."
  },
  5: {
    message: "You didn't give me your email."
  },
  6: {
    message: "You dismissed our Facebook crap."
  }
};



const theNews =  [
  {
    img: "guitar.jpg",
    headline: "Country Music Legend Rhett Smurt turns 63",
    category: "birthday"
  },
  {
    img: "millenial.jpg",
    headline: "12 New Things Millenials Are Ruining",
    category: "rage"
  },
  {
    img: "sugar-glider.jpg",
    headline: "Are sugar gliders better than cats?",
    category: "nature"
  },
  {
    img: "2kids.jpg",
    headline: "Fun crafts using asbestos that'll keep your kids busy on a rainy day",
    category: "parenting"
  },
  {
    img: "weirdal.jpg",
    headline: "Every Weird Al film and television cameo, ranked",
    category: "heavy metal"
  },
  {
    img: "donut.jpg",
    headline: "Did The Simpsons predict the newest Marvel franchise?",
    category: "cinema"
  },
  {
    img: "microphone.jpg",
    headline: "Every Singer in AC/DC, Ranked",
    category: "heavy metal"
  },
  {
    img: "ransomware.jpg",
    headline: "How To Rid Your PC of Toxins with Ransomware",
    category: "computers"
  },
  {
    img: "tiktok.jpg",
    headline: "Why Your Children Won't Teach You The Dances They Learn On TikTok",
    category: "youth"
  },
  {
    img: "manchin.jpg",
    headline: "What did Joe Manchin have for breakfast?",
    category: "politics"
  },
  {
    img: "bartender.jpg",
    headline: "The 3 drinks that will convince a bartender you're not a total piece of shit",
    category: "nightlife"
  },
  {
    img: "mcconaughey.jpg",
    headline: "WATCH Matthew McConaughey sit on the couch and scratch his balls every once in a while",
    category: "celebrities"
  },
  {
    img: "palin.jpg",
    headline: "Sarah Palin said something stupid again, so I guess we have to write about that.",
    category: "celebrities"
  },
];

const theAds = [
  {
    img: "tezos.jpg",
    headline: "Tezos is the hot new cryptocurrency... so, what IS it?",
  },
  {
    img: "laptop.jpg",
    headline: "This laptop LITERALLY saved my marriage!",
  },
  {
    img: "crystals.jpg",
    headline: "Use these crystals next time your cystic acne flares up"
  },
  {
    img: "espolon.jpg",
    headline: "The only tequila that's GUARANTEED to get you laid"
  },
  {
    img: "pregnant-rose.jpg",
    headline: "DON'T get pregnant before reading this!",
  },
  {
    img: "man-money.jpg",
    headline: "A Man In {VisitorLocation} turned 5 cents into a bajillion dollars",
  },
  {
    img: "tacos.jpg",
    headline: "We just learned the most delicious menu item at Taco Village",
  },
  {
    img: "toilet-paper.jpg",
    headline: "This is the ONLY toilet paper that your asshole can handle",
  },
];