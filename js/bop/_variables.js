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
    category: "birthday",
    nugget: "Rhett was born in Jerkwater, New Jersey.",
    nuggetPlacement: "before",
    question: "What state was Rhett Smurt born in?",
    answer: "New Jersey"
  },
  {
    img: "millenial.jpg",
    headline: "12 New Things Millenials Are Ruining",
    category: "rage",
    nugget: "As for #9, the swimming pool industry is another thing ruined by millenials and their selfish desire to never own property with attached personal swimming pools. Oh sure, they may <i>tell</i> that it's an economic reality that keeps them poor, but think of all the pool cleaners that remain employed because of their selfishness!",
    nuggetPlacement: "replace",
    question: "What's the #9 industry that millenials are currently ruining?",
    answer: "swimming pools",
  },
  {
    img: "sugar-glider.jpg",
    headline: "Are sugar gliders better than cats?",
    category: "nature",
    nugget: "My pet sugar glider is named Leonard.",
    nuggetPlacement: "middle",
    question: "What is the name of the author's pet sugar glider?",
    answer: "Leonard"
  },
  {
    img: "2kids.jpg",
    headline: "Fun crafts using asbestos that'll keep your kids busy on a rainy day",
    category: "parenting",
    nugget: "Crocidolite (blue asbestos) was commonly used to insulate steam engines. But you could make a pair of cool sunglasses!",
    nuggetPlacement: "before",
    question: "What's another word for blue asbestos?", 
    answer: "crocidolite"
  },
  {
    img: "weirdal.jpg",
    headline: "Every Weird Al film and television cameo, ranked",
    category: "heavy metal",
    nugget: "2019 also saw the musical funnyman alongside a funny WOMAN named Rachel Bloom. Mister Yankovic played the role of Bernie in Bloom's show Crazy Ex-Girlfriend",
    nuggetPlacement: "before",
    question: "What was the name of Weird Al Yankovic's character in Crazy Ex-Girlfriend",
    answer: "Bernie"
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

const newsGroups = [
  {
    k: 'group1',
    count: 5,
    bigOne: 1,
    noAd: 1,
  },
  {
    k: 'group2',
    count: 6
  },
  {
    k: 'group3',
    count: 6
  },
  {
    k: 'group4',
    count: 6,
    bigOne:2
  },
  {
    k: 'group5',
    count: 11,
    bigOne: 4
  },
  {
    k: 'group6',
    count: 1,
    bigOne: 1,
    adSaturation:100
  }
  
];

const firstNames = [
  "Markus",
  "Kaitilyn",
  "Emmarie",
  "Thurston",
  "Liam",
  "Squeaky",
  "Annie",
  "Zora"
]

const lastNames = [
  "Thrombenny",
  "Smurfdagger",
  "Murderhornet",
  "Troublesome",
  "Plentysad",
  "Strangeways"
]

const paragraphs = [
  "Etiam ultrices lectus a urna posuere, nec egestas risus viverra. Vestibulum nec leo in velit ultrices bibendum vitae sit amet quam. Aenean aliquet id diam sit amet varius. Donec eu enim placerat, pulvinar odio tincidunt, tincidunt ipsum. Sed volutpat pellentesque lacus, condimentum fringilla quam congue quis. Fusce sed nunc in velit dictum aliquam. Nam eu volutpat augue, at volutpat urna. Vestibulum in porta sem, at placerat libero. Cras et odio erat. Ut dapibus vestibulum aliquet. Duis in venenatis magna, et fringilla ante. Mauris sed elit nec purus elementum tincidunt. Curabitur vestibulum est sed scelerisque aliquet.",
  "Quisque et neque ultrices, ullamcorper nisi id, euismod ipsum. In fringilla vestibulum enim, non consectetur massa dignissim a. Aliquam sed iaculis mi, et rhoncus ante. Phasellus ut mollis tellus, vitae interdum magna. Nulla tempor purus urna, vitae rhoncus neque commodo vitae. Nullam et risus suscipit, congue tellus eu, sodales lectus. Mauris rutrum magna at orci cursus, quis dignissim lectus viverra. Nulla facilisi. Ut posuere ante ac erat auctor dictum. Integer sed nulla vitae eros hendrerit gravida in nec dui. In eget sem sit amet lorem cursus imperdiet eu ac massa. Duis erat justo, vulputate a semper ut, feugiat sit amet libero. Aliquam at sollicitudin lorem. Suspendisse ut justo ac sapien vehicula accumsan. Fusce semper, lacus ut laoreet tristique, sem felis consectetur ex, ut sagittis enim dolor vitae mauris. Vivamus dapibus libero sed blandit convallis.",
  "Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam ac dapibus odio, vitae mollis ligula. Donec vehicula porttitor mauris, quis lobortis leo dictum quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae lorem velit. Praesent pulvinar lacus sit amet quam consectetur posuere. Aliquam mollis ut ligula ut varius. Maecenas ornare massa nisl. Curabitur in orci id diam sollicitudin rutrum id in quam. Ut varius ligula vitae augue dignissim suscipit. Sed ornare vulputate odio, ac consequat sem malesuada tempor. Nunc dui massa, dignissim a lacus nec, ultrices dictum nisl. Nulla luctus turpis a volutpat lacinia. Nulla gravida augue non tempor tempor. Maecenas fermentum arcu tellus, vel iaculis leo interdum ut.",
  "Quisque et lacinia diam. Maecenas vel feugiat mi, non ultrices metus. Mauris sit amet odio nec est condimentum convallis. Maecenas elementum auctor nunc eget luctus. Phasellus id aliquet nisl. Proin ac lectus at tellus luctus venenatis. Suspendisse nec convallis dui. Nunc condimentum scelerisque semper. Fusce ultricies mi eget libero tincidunt feugiat. In cursus felis id vehicula consequat. Donec ornare molestie mi ac molestie. Nunc non condimentum felis, vel aliquam dui. Nunc facilisis a orci id sagittis.",
  "Suspendisse mollis massa erat, nec consequat tortor pharetra eu. Vivamus eu molestie dolor. Suspendisse potenti. Nulla facilisi. In pharetra, nisl vel hendrerit euismod, mauris turpis consectetur ipsum, porta auctor quam sem a libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc fringilla, sapien nec dapibus ultricies, urna turpis gravida mi, eget faucibus sapien lectus id nibh. In hac habitasse platea dictumst. Aliquam vitae suscipit mauris. Fusce nulla odio, consequat eu mollis ut, semper ut justo.",
  "Cras quis pellentesque lacus. Mauris commodo lectus nec metus suscipit, vel accumsan elit gravida. Aenean orci neque, tincidunt porta sagittis eget, iaculis sed ipsum. In suscipit elit sem, et elementum libero cursus a. Aenean eu enim rhoncus, tincidunt purus sed, faucibus justo. Nulla suscipit finibus lectus a tempus. Proin nec eros et mauris faucibus rhoncus a vitae dolor. Proin sem lorem, sagittis nec tortor nec, ultricies feugiat dui. Phasellus hendrerit nunc efficitur lacus imperdiet bibendum. Sed lorem neque, malesuada ut sodales non, placerat vitae elit. Pellentesque id mauris sed diam pharetra vulputate vitae eget dolor.",
  "Integer dictum quam justo, nec cursus nulla pharetra vitae. Integer efficitur interdum massa nec commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat gravida euismod. Proin id pretium purus, quis tempus erat. In consequat, est vel elementum consectetur, est diam congue nisi, quis suscipit dui mauris vel metus. Proin ullamcorper ipsum enim. Aliquam imperdiet maximus enim.",
  "Aliquam eget neque hendrerit, laoreet erat nec, sodales lorem. Duis venenatis sit amet sapien non semper. Duis enim lacus, dapibus a condimentum in, finibus vel lacus. Cras magna magna, ultrices vitae interdum ac, finibus at odio. Fusce ullamcorper ut sapien et dictum. Duis sodales accumsan sollicitudin. Nunc feugiat, nulla ac pretium ullamcorper, eros lacus ultricies nunc, eu rutrum orci justo eu quam. In hac habitasse platea dictumst. Fusce pellentesque euismod arcu, sit amet interdum orci lacinia at. Nullam sit amet ullamcorper ligula. Suspendisse nec elit quis tortor fringilla luctus.",
  "Aliquam viverra suscipit sapien at suscipit. Etiam id dolor at magna malesuada gravida. Praesent sed felis nibh. Curabitur diam quam, ultricies at enim eu, dignissim vestibulum neque. Donec metus metus, blandit et velit vitae, laoreet condimentum urna. Donec non erat sem. Curabitur porttitor, neque vel molestie tristique, eros ipsum congue magna, ac viverra est orci ut erat. Donec elementum tempus maximus. Quisque purus erat, sodales eget vehicula in, molestie eu lorem. Aliquam erat volutpat. Nam dapibus ullamcorper ligula, a pulvinar nulla. Phasellus aliquet urna nec tortor bibendum, eu placerat est suscipit.",
  "Sed eu mollis elit. Nullam non urna risus. Aenean vestibulum magna mollis bibendum congue. Nullam commodo purus non ante ornare, quis iaculis velit porta. Sed sit amet auctor orci. Donec condimentum sit amet ante at tempus. Duis egestas diam vel accumsan tempus. Etiam lectus tellus, consectetur at auctor vel, pretium et nisl. Proin laoreet tempor condimentum. Vestibulum feugiat enim consequat rhoncus scelerisque. Donec tincidunt dignissim velit, ut dignissim sem bibendum et. Curabitur neque risus, fringilla eu libero ac, rhoncus fringilla quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam auctor luctus semper. In egestas dolor mattis dui varius, eu interdum eros commodo. Proin diam diam, ultricies sit amet aliquet a, tempor ac dui.",
  "Cras odio arcu, scelerisque a purus eget, euismod consequat velit. Praesent ac libero ante. Phasellus iaculis felis malesuada felis pellentesque, et auctor eros vehicula. Nam rutrum sodales odio. Mauris at mauris velit. Vestibulum vel ex at nisl tristique pellentesque. Curabitur odio eros, suscipit ut euismod id, dignissim ut est. Vestibulum molestie placerat arcu. Vivamus diam augue, auctor quis ligula ut, dapibus finibus augue. Vestibulum at aliquam urna, vel hendrerit ex.",
  "Sed pellentesque metus ante, eu consequat nisl commodo vitae. Nulla vehicula risus erat, vel ultrices eros fringilla et. Etiam ligula elit, tincidunt sed metus sed, imperdiet tristique mauris. Nunc vel dolor tempor, porta turpis nec, fermentum magna. Etiam id lacus in nibh mollis porta. Praesent eleifend odio nisl, id volutpat lacus congue sed. Sed varius magna eget felis porttitor facilisis. Etiam ac lorem at nisl commodo porta. Sed faucibus eget mi id luctus. Proin venenatis, lectus dictum ultrices pellentesque, risus tortor bibendum lacus, a vestibulum sapien risus ac nulla. Duis sollicitudin dignissim ipsum id accumsan. Donec feugiat purus elit, eget ullamcorper augue venenatis a. Morbi congue nisi erat, ac euismod augue tristique sit amet.",
  "Duis vel suscipit quam. Nam risus turpis, tempor quis tellus id, dapibus venenatis dolor. Donec nec tincidunt sapien, rhoncus euismod purus. Duis sit amet scelerisque mi. Morbi consequat magna vel lobortis convallis. Cras eu hendrerit est. Praesent condimentum dignissim lacus, nec maximus felis hendrerit vel. Nunc tempus eros non elit luctus, ut tristique purus malesuada. Nullam feugiat auctor libero a ultrices. Praesent quis leo eu erat sodales imperdiet. Ut posuere odio at bibendum viverra. Morbi finibus diam ex, eu faucibus eros egestas non. Donec id enim sit amet tortor egestas vestibulum. Nam eu pharetra dolor, ac commodo turpis. Praesent sollicitudin aliquam risus, ut vestibulum ligula iaculis ut. Curabitur ac auctor magna.",
  "Nullam quam magna, scelerisque ut finibus sit amet, efficitur at tellus. Pellentesque consectetur venenatis venenatis. Quisque odio felis, sollicitudin sed lobortis ut, rutrum vitae ex. Donec et tristique orci. Vestibulum eu condimentum lacus. Duis eu aliquet felis, eget luctus urna. Cras facilisis ante ut dui vehicula placerat. Mauris sollicitudin est eget maximus aliquam. Vivamus erat felis, malesuada nec sapien vitae, blandit suscipit erat. Suspendisse interdum turpis sem, ac condimentum risus feugiat et. Vestibulum vulputate, purus in ultrices sodales, lectus libero semper justo, ac pharetra arcu ante a mi. Mauris blandit a dui ut varius. Nam venenatis tortor eu leo suscipit, sed dictum tortor tincidunt.",
  "Duis libero dui, lobortis nec est malesuada, tristique efficitur ante. Pellentesque et tellus convallis, varius lacus nec, pretium velit. Donec nec euismod tortor, vel pretium velit. Sed ut venenatis magna. Vivamus dapibus tristique risus, in sollicitudin purus. Nulla pulvinar nibh risus, et venenatis tortor convallis blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur suscipit orci interdum, ultricies lorem et, condimentum tellus. In iaculis velit id consectetur tempus. Phasellus tristique risus finibus sodales dictum. Duis lacus arcu, volutpat non molestie ac, blandit sit amet purus. Sed quis commodo tortor. Nullam consequat finibus accumsan.",
  "Nam odio mauris, elementum ac risus nec, rhoncus porttitor ex. Etiam mollis lorem non nisi commodo, congue sagittis mauris aliquet. Integer tempus ipsum a elit iaculis, non laoreet felis sagittis. Fusce at volutpat justo, eget volutpat ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nec libero non enim bibendum viverra. Nullam tempus, mi ut aliquet venenatis, nunc justo commodo est, a finibus neque augue faucibus dui. Donec eleifend, nulla sit amet feugiat imperdiet, magna enim vehicula augue, vel facilisis orci metus sit amet neque. In sit amet nunc vitae diam luctus dictum.",
  "Aliquam congue ligula elit, nec fringilla dolor tincidunt ac. Sed mi metus, scelerisque a luctus id, sodales eget nisi. Proin at ultricies nibh. In molestie quis ante non ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam euismod sit amet nibh vitae varius. Nam viverra, nisi in elementum aliquet, metus diam mattis eros, at lobortis augue lacus sit amet magna.",
  "Donec et semper nibh, facilisis finibus nibh. Pellentesque et metus nunc. Integer lectus leo, sodales eu pretium ac, ultricies vitae erat. Nunc sem odio, finibus eget sem non, pulvinar aliquet ligula. Mauris sit amet dolor non augue molestie tristique ac sed leo. Morbi viverra mollis eleifend. Donec malesuada elit est, vitae venenatis tellus interdum eu. Ut porttitor ex eu odio tempus, vel accumsan elit ultrices. Vivamus mauris mauris, scelerisque in elementum sed, consectetur quis velit. Aenean porttitor sollicitudin sodales. In hac habitasse platea dictumst. Donec ornare purus a tempor vestibulum.",
  "Donec neque diam, semper placerat suscipit nec, posuere bibendum magna. Praesent non est quam. Praesent vel risus non nulla molestie rhoncus. Nullam sed malesuada sapien. Cras venenatis nunc vitae porta tincidunt. Aliquam vitae semper massa. Quisque aliquet enim vel turpis molestie, in dictum est viverra. Vivamus ultrices vel arcu vitae pellentesque. In porttitor blandit mauris sed pulvinar. Aenean mollis orci eget nisl convallis luctus. Donec non facilisis mi."
]