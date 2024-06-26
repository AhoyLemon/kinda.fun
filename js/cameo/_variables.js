const settings = {
  maxRounds: 4,
  maxBudget: 1000,
  minBudget: 500
};


const audioSrc = "audio/";
const soundMiss = new Howl({
  src: [ audioSrc + 'attracted-2-130.mp3', audioSrc + "attracted-2-130.ogg" ],
  volume: 0.8
});

const soundCorrect = new Howl({
  src: [ audioSrc + 'accomplished-579.mp3', audioSrc + "accomplished-579.ogg" ],
  volume: 0.9
});

const soundPerfectValue = new Howl({
  src: [ audioSrc + 'munchausen-433.mp3', audioSrc + "munchausen-433.ogg" ],
  volume: 0.9
});

const soundCloseValue = new Howl({
  src: [ audioSrc + 'gesture-192.mp3', audioSrc + "gesture-192.ogg" ],
  volume: 0.8
});

const soundBadValue = new Howl({
  src: [ audioSrc + 'attracted-2-130.mp3', audioSrc + "attracted-2-130.mp3" ],
  volume: 0.9
});

const soundNewEmail = new Howl({
  src: [ audioSrc + 'DingDongNewEmail.mp3', audioSrc + "DingDongNewEmail.ogg" ],
  volume: 0.9
});


const soundUnderBudget = new Howl({
  src: [ audioSrc + 'accomplished-579.mp3', audioSrc + "accomplished-579.ogg" ],
  volume: 0.9
});

const soundOverBudget = new Howl({
  src: [ audioSrc + 'chimes-power-down-190.mp3', audioSrc + "chimes-power-down-190.ogg" ],
  volume: 1
});

const soundFutherOverBudget = new Howl({
  src: [ audioSrc + 'attracted-2-130.mp3', audioSrc + "attracted-2-130.mp3" ],
  volume: 0.8
});

const soundgameOverMusic = new Howl({
  src: [ audioSrc + 'sour-tennessee-red.mp3', audioSrc + "sour-tennessee-red.ogg" ],
  volume: 0.9
});


var birthdayHowls = [];

for (var i=1; i<37; i++) {
  var slug = "";
  if (i < 10) {
    slug = "0" + i;
  } else {
    slug = i.toString();
  }
  birthdayHowls[i] = new Howl({
    src: [ audioSrc + 'birthdays/'+slug+'.mp3' ],
    volume: 0.9
  });
}