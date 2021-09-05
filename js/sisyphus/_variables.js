
const begin = {
  s: {
    bottom: 3,
    left: 5.7
  },
  r: {
    bottom: 8.5,
    left:4,
    peak: 80
  }
};


const sDefaults = {
  bottom: begin.s.bottom,
  left:begin.s.left,
  width: 6,
  height:9,
  retreating: false,
  pushForce: 1.6,
  retreatSpeed: 2.6
};

const rDefaults = {
  bottom: begin.r.bottom,
  left:begin.r.left,
  width: 17,
  height: 17,
  marginLeft: -3.6,
  peak: 74,
  rollbacks: 0
};

const audioFolder = "audio/sisyphus";


const uphillMusic = new Howl({
  src: [
    audioFolder+'/uphill4.ogg',
    audioFolder+'/uphill4.mp3',
  ],
  loop:true
});
const downhillMusic = new Howl({
  src: [
    audioFolder+'/downhill6.ogg',
    audioFolder+'/downhill6.mp3',
  ],
  loop: false
});

const cheevoSound = new Howl({
  src: [
    audioFolder+'/springy-350.mp3',
  ],
  loop: false,
  volume: 0.5
});

const purchaseSound = new Howl({
  src: [
    audioFolder+'/juntos-607.mp3',
  ],
  loop: false
});

const dignityGot = new Howl({
  src: [
    audioFolder+'/dignity-got.mp3',
  ],
  loop: false
});

const dignityLost = new Howl({
  src: [
    audioFolder+'/dignity-lost.mp3',
  ],
  loop: false
});