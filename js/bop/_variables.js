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
    message: `<p>I guess it's probably that you have an Alexa or a Google Home in your house listening to everything you say. Well, now so am I.</p>
              <p>Maybe we'll use your voice to train an AI robot how to better perform phone sex for a low cost, or maybe I'll just save everything itno a file called <code>assholesWithStupidVoices.wav</code> - You'll never know for sure. But I'm listening to you right now.</p>`,
  }
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
  }
};