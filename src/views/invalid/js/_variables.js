import { reactive } from "vue";
import { randomNumber } from "@/shared/js/_functions";

export const gameTitle = "Invalid!";
export const siteURL = "https://kinda.fun";
export const playerID = randomNumber(1, 100);
export const employeeNumberSeed = randomNumber(10000, 99999);

const defaultSettings = {
  defaults: {
    maxOffset: 1,
    minOffset: 2,
    vowelOffset: 1,
    hurryTime: 20,
    adminTimeLeft: 90,
    employeeMaxTime: 50,
    finalTimeLeft: 60,
    numberOfPossibleChallenges: 3,
  },
  settings: {
    default: {
      rulebux: 107,
      numberOfPossibleChallenges: 5,
    },
    points: {
      forGoodPassword: 100,
      forFirstPassword: 20,
      perSecondPlayed: 3,
      forFailedPassword: 0,
      forServerCrash: 100,
      forCrackingPassword: 40,
      forHavingPasswordCracked: -40,
      forCrackingOwnPassword: -50,
    },
    timer: {
      employeeMaxTime: 50,
      hurryTime: 20,
      adminTimeLeft: 90,
      countdownToFinal: 30,
      finalRound: 60,
      finalTimeLeft: 60,
    },
  },
};

export const my = reactive({
  employeeNumber: randomNumber(10000, 99999),
  playerID: "",
  name: "",
  color: "#ff0000",
  playerIndex: -1, // This is assigned in updatePlayer()
  role: null,
  rulebux: defaultSettings.settings.default.rulebux,
  passwordAttempts: 0,
  crashesCaused: 0,
  score: 0,
  isRoomHost: false,
});

export const round = reactive({
  phase: "create or join",
  number: 0,
  sysAdminIndex: -1,
  possibleChallenges: [],
  challenge: {},
  rules: [],
  shibboleth: "",
  bugs: [],
  attempts: [],
  claimedPasswords: [],
  possibleAnswerCount: 0,
  averageSize: 0,
  averageVowels: 0,
  letterCounts: [],
  demandableLetters: [],
  maxOffset: defaultSettings.defaults.maxOffset,
  minOffset: defaultSettings.defaults.minOffset,
  vowelOffset: defaultSettings.defaults.vowelOffset,
  elapsedTime: 0,
  adminTimer: undefined,
  roundTimer: undefined,
  hurryTimer: undefined,
  hurryTime: defaultSettings.settings.timer.hurryTime,
  adminTimeLeft: defaultSettings.settings.timer.adminTimeLeft,
  finalTimeLeft: defaultSettings.settings.timer.finalTimeLeft,
  flyingPig: {
    active: false,
    message: "",
    timer: undefined,
  },
  crash: {
    active: false,
    word: "",
    player: {},
  },
});

export const ui = reactive({
  nameInput: "",
  roomCodeInput: "",
  appliedForJob: false,
  reconnecting: false,
  enterCode: {
    focus: false,
  },
  challengeID: null,
  shibboleth: "",
  addBug: "",
  addBugErrors: [],
  passwordAttempt: "",
  passwordAttemptErrors: [],
  passwordInputError: false,
  passwordSucceeded: false,
  roundOver: false,
  currentRule: {
    editing: false,
    name: "",
    cost: 0,
    inputValue: "",
    inputValueTwo: "",
  },
  enterFinalPasswords: false,
  passwordSuccessMessage: null,
  watchingVideo: false,
  musicPlaying: false,
  musicHushed: false,
});

export const game = reactive({
  currentlyInGame: false,
  isGameStarted: false,
  isFailedToGetRoomData: false,
  roomCreatorID: "",
  roomCode: "",
  gameName: "invalid",

  maxRounds: 0,
  allowNaughty: false,
  players: [],
  allEmployeePasswords: [],
  roundSummary: [],
  crashSummary: [],
  crackSummary: [],
});

// TODO: Refactor this category into structured settings.
export const defaults = { ...defaultSettings.defaults };

export const settings = { ...defaultSettings.settings };

// I'm pretty sure this object doesn't do anything.
export const roundDefaults = {
  possibleChallenges: [],
  challenge: {},
  rules: [],
  shibboleth: "",
  bugs: [],
  attempts: [],
  claimedPasswords: [],
  possibleAnswerCount: 0,
  averageSize: 0,
  averageVowels: 0,
  elapsedTime: 0,
  adminTimer: undefined,
  roundTimer: undefined,
  hurryTimer: undefined,
  hurryTime: defaultSettings.settings.timer.hurryTime,
  adminTimeLeft: defaultSettings.settings.timer.adminTimeLeft,
  finalTimeLeft: defaultSettings.settings.timer.finalTimeLeft,
  crash: {
    active: false,
    word: "",
    player: [],
  },
};

export function resetRoundVariables() {
  round.possibleChallenges = [];
  round.challenge = {};
  round.rules = [];
  round.shibboleth = "";
  round.bugs = [];
  round.attempts = [];
  round.claimedPasswords = [];
  round.possibleAnswerCount = 0;
  round.averageSize = 0;
  round.averageVowels = 0;
  round.elapsedTime = 0;
  round.adminTimer = undefined;
  round.roundTimer = undefined;
  round.hurryTimer = undefined;
  round.hurryTime = defaultSettings.settings.timer.hurryTime;
  round.adminTimeLeft = defaultSettings.settings.timer.adminTimeLeft;
  round.finalTimeLeft = defaultSettings.settings.timer.finalTimeLeft;
  round.crash.active = false;
  round.crash.word = "";
  round.crash.player = [];
}

export function resetUI() {
  ui.appliedForJob = false;
  ui.enterCode.focus = false;
  ui.challengeID = null;
  ui.roundOver = false;
  ui.addBug = "";
  ui.addBugErrors = [];
  ui.passwordAttempt = null;
  ui.passwordAttemptErrors = [];
  ui.passwordInputError = false;
  ui.passwordSucceeded = false;
  ui.currentRule.editing = false;
  ui.currentRule.name = null;
  ui.currentRule.cost = 0;
  ui.currentRule.inputValue = null;
  ui.currentRule.inputValueTwo = null;
  ui.enterFinalPasswords = false;
  ui.passwordSuccessMessage = null;
}

export const rulePhrasings = {
  max: [
    "Your password cannot exceed [SIZE] characters",
    "Your password must be less than [SIZE+1] characters",
    "Password must be [SIZE] characters in length or less",
    "Password can be a maximum of [SIZE] characters",
    "Password can not be [SIZE+1] characters or more",
    "Password must not exceed [SIZE] characters.",
  ],
  min: [
    "Your password must be at least [SIZE] characters long",
    "Your password must be more than [SIZE-1] characters",
    "Password must be [SIZE] characters or more",
    "Password minimum is [SIZE]",
    "Password must exceed [SIZE-1] characters",
  ],
  vowels: [
    "Your password cannot exceed [SIZE] vowels",
    "Your password must have less than [SIZE+1] vowels",
    "Vowels in your password are limited to [SIZE]",
    "Password vowels cannot exceed [SIZE]",
    "Your password may not contain [SIZE+1] vowels or more",
  ],
};

export const flyingPigLines = {
  intro: [
    "Entering in a password, huh?<br /><br />Well, I'm <code>THE FLYING PIG</code>, and I'm here to give you helpful suggestions!",
    "Hey, it's me!<br /><br />I'm <code>THE FLYING PIG</code>, and I'm here to give you helpful suggestions!",
    "Hello there!<br /><br />I'm <code>THE FLYING PIG</code>, and we're going to figure out a GREAT password together!",
    "Uh oh!<br /><br />Looks like you need help entering a password. I'm <code>THE FLYING PIG</code>!!!",
    "Здравствуйте worker!<br /><br />I'm <code>THE FLYING PIG</code> and I'm going to help you come up with a password!",
    "Wow, what a complicated set of rules.<br /><br />But look at me! I'm <code>THE FLYING PIG</code>!",
  ],
  beforeGame: [
    "Don't worry about any of these rules, <code>THE FLYING PIG</code> is here, and I'll give you all sorts of helpful suggestions!",
    "Passwords can be tricky, but I'm <code>THE FLYING PIG</code>, and I can help you create a remarkable password!",
    "Don't be worried! I'm <code>THE FLYING PIG</code>, and I can help you create a remarkable password!",
  ],
  guessing: [
    "Have you tried <code>RIVERDALE</code>? That's the school from Archie comics! It's also a popular WB show!",
    "Your password should be secure. And what's more secure than <code>FORT KNOX</code>? Maybe you should type that!",
    "I'm having <code>FUN</code> thinking up passwords with you!",
    "I'm <code>THE FLYING PIG</code>!",
    "Look at me! I'm <code>THE FLYING PIG</code>!",
    "<code>HOMINY</code> is a food produced from dried maize kernels that have been treated with an alkali! That seems like a good password!",
    "In the legal profession, an <code>AFFIDAVIT</code> is a written statement. You could write that!",
    "The 21st American president was <code>CHESTER A. ARTHUR</code>! Does that help?",
    "The only member of ZZ Top without a beard is named <code>FRANK BEARD</code>!",
    "The Scandanavian spirit with a distinct caroway flavor can either be spelled <code>AQUAVIT</code> or <code>AKVAVIT</code>! You could try both!",
    "Pets.com was a dot-com enterprise headquartered in <code>SAN FRANCISCO</code>. It went defunct in 2000!",
    "In August 1484, <code>INNOCENT VIII</code> was made pope. He served for 7 years, 331 days!",
    "Vestments are liturgical garments most associated with the <code>CHRSITIAN</code> religion. I'm The Flying Pig!",
    "The 4th most populated city in Colorado is <code>FORT COLLINS</code> with a population of 165,000!",
    "Clippy was originally introduced in <code>MICROSOFT OFFICE</code>. That thing was annoying!",
    "Have you thought of a password yet? Try <code>RASPBERRIES</code>!",
    "The third Harry Potter movie is <code>THE PRISONER OF AZKABIN</code>. That could be your password!",
    "Those plastic things at the end of shoelaces are called <code>AGLETS</code>. I'm The Flying Pig!",
    "The second bestselling No Doubt album is <code>ROCK STEADY</code>. It went double platinum!",
    "The Four Shire Stone is a boundary marker at the edge of <code>WARWICKSHIRE</code>, <code>OXFORDSHIRE</code>, <code>GLOUCESTERSHIRE</code> and <code>WIRCESTERSHIRE</code>.",
    "There are 6 fossilferous stratigraphic units in <code>LUXEMBOURG</code>. Five are from the Jurassic period!",
    "A short Kurta is known as a <code>KURTI</code>. It's mostly worn by women in Northern India!",
    "The 2019 Major League Lacrosse champions were the <code>CHESAPEAKE BAYHAWKS</code>. The final score was 10-9!",
    "There were 21 gangs featured in the 1979 film The Warriors. One of them was <code>THE ELECTRIC ELIMINATORS</code>!",
    "The largest city in Transylvania is <code>CLUJ-NAPOCA</code>. It's nickname is The Treasure City!",
    "Minton is a small village located in <code>SASKATCHEWAN</code>. It has a population of 55!",
    "Russia sent 190 athletes to the 2006 Winter Olympics. One of them was <code>TATIANA BORODULINA</code>!",
    "Yasutoshi Yoshida is the real name of the Japanese noise musician <code>GOVERNMENT ALPHA</code>!",
    "The Japanese toy maker <code>BANDAI</code> was founded in July 5, 1950. I'm The Flying Pig!",
    "Hollonville is unincorporated land in <code>PIKE COUNTY</code>, Georgia. It has two churches and a general store!",
    "The Welsh city of <code>CARDIFF</code> is the UK's eleventh-largest city. Their motto is The Red Dragon Will Lead The Way!",
    "Frontier was a television show about the North American Fur Trade! It was co-produced by <code>DISCOVERY CANADA</code>.",
    "We all know <code>PASSWORD</code> is a bad password. But <code>PASSWORD1</code>? That seems pretty good!",
    "The Red Devils is a nickname given to <code>MANCHESTER UNITED</code>, a Premier League football club!",
    "The second largest of the great lakes by volume is <code>LAKE MICHIGAN</code>. But it's the third largest by surface area!",
    "Meat Loaf's 2008 European Summer Tour was called <code>THE CASA DE CARNE</code>. It never went to a Spanish-speaking nation!",
    "Stephen King was born in the Maine city of <code>PORTLAND</code>, which was incorporated 65 years before the one in <code>OREGON</code>!",
    "On November 23, 2014, <code>CHICAGO</code> became the second longest-running Broadway show, surpassing Cats!",
    "The role of Chief Inspector Clouseau was played by <code>PETER SELLERS</code>, which is also the name of a New Zealand sports broadcaster!",
    "Ivan II resigned as <code>TSAR OF BULGARIA</code> in 1299. He died as a monk in exile a year later!",
    "The Salmon River in Oregon begins and ends in <code>LINCOLN COUNTY</code>, but touches other counties as well!",
  ],
  afterCorrect: [
    "Wow! We did a great job thinking up passwords together!",
    "Excellent work with your password! I love you!",
    "I'm so happy we thought of a password together!",
    "That's a great password! Good job to the both of us!",
  ],
};
