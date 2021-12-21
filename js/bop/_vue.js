//import SweetModal from 'sweet-modal-vue/src/plugin.js';

Vue.use(VueToast);

var app = new Vue({
  el: '#app',
  data: {
    h1: 'Refuse it!',
    gameStarted: false,
    timer: 0,
    timerFunction: undefined,
    gdpr: {
      showBanner: false,
      showModal: false,
      showModalInside: false,
      cookies: [
        { 
          label: "Strictly Necessary", 
          info: `<p><strong>Cannot be disabled.</strong> This applies to any cookies which are strictly necessary to make the site work, such as your personal settings, and whatever else we arbitrarily decide is necessary to make the site work.</p>`,
          showInfo: false,
          allowed: true,
          required: true
        },
        {
          label: "Performance Cookies", 
          info: `<p>Keeping track of measurements such as "how fast is the page loading", "how long does it take you to click on the thing we want you to click on?", and "How about them ads?"</p>`,
          showInfo: false,
          allowed: true,
        },
        {
          label: "Functional Cookies", 
          info: `<p>This website uses arbitary code provided by hundreds of different companies, written by tens of thousands of different developers, none of whom we can personally vouch for, and we've never bothered to inspect the code they wrote. We would like to run that code on your computer, pretty please.</p>`,
          showInfo: false,
          allowed: true,
        },
        {
          label: "Targeting Cookies ", 
          info: `<p>We're going to share unencrypted personal information about you with anyone who asks for it. As a result, you'll be seeing that fuckin' My Pillow Guy's ugly face every time you're on the internet.</p>`,
          showInfo: false,
          allowed: true,
        }
      ]
    },

    emailSignup: {
      showModal: false,
      emailAddress: ""
    },

    fb: {
      showModal: false,
    },

    news: {

      allNews: {},
      allAds: {},
      lastNewsIndex: 0,
      lastAdIndex: 0,

      adSaturation: 33,
      group1: {
        boxes: []
      },
      group2: {
        boxes: []
      },
      group3: {
        boxes: []
      },
      group4: {
        boxes: []
      },
      group5: {
        boxes: []
      },
      group6: {
        boxes: []
      }
    },
    
    showFailureScreen: false,
    failStates: failStates,
    failure: {}
  },

  methods: {
    toggleCookieModal(mode) {
      const self = this;

      if (!mode && self.gdpr.showModal) {
        mode = "close";
      }
      
      if (mode == 'close') {
        self.gdpr.showModalInside = false;
        setTimeout(() => {
          self.gdpr.showModal = false;
        }, 300);
      } else {
        self.gdpr.showModal = true;
        setTimeout(() => {
          self.gdpr.showModalInside = true;
        }, 300);
      }
      
    },

    startTimer() {
      const self = this;
      self.timer = 0;
      self.timerFunction = setInterval(()=> {
        self.timer += 0.013;
      }, 13);
    },

    stopTimer() {
      const self = this;
      clearInterval(self.timerFunction);
      self.timerFunction = undefined;
      self.timer = 0;
    },

    failPlayer(reason,also) {
      const self = this;
      soundFeedback.play(randomFrom(soundOptions.failure));
      self.failure = failStates[reason];
      if (also) {
        if (self.failure.also) {
          self.failure.also = Object.assign(self.failure.also,also);
        } else {
          self.failure.also = also;
        }
      }
      self.stopTimer();
      self.showFailureScreen = true;
    },

    congratulatePlayer(roundCode) {
      const self = this;
      console.log("SUCCESS");
      if (roundCode) {
        let instance = Vue.$toast.open(
          {
            message: `<p>${successMessages[roundCode].message}</p>`,

            type: "success",
            position: "bottom-right"
          }
        );
      }
      
      soundFeedback.play(randomFrom(soundOptions.success));
      self.stopTimer();
    },

    doBullshit(bullshit) {
      const self = this;
      if (bullshit == "gdpr") {
        self.gdpr.showBanner = true;
        self.gdpr.cookies.forEach(cookie => {
          cookie.allowed = true;
        });
        soundFeedback.play(randomFrom(soundOptions.rejectThem));
      } else if (bullshit == "camera") {
        soundFeedback.play(randomFrom(soundOptions.blockIt));
        self.requestPermission('camera');
      } else if (bullshit == "microphone") {
        soundFeedback.play(randomFrom(soundOptions.denyIt));
        self.requestPermission('microphone');
      } else if (bullshit == "emailSignup") {
        soundFeedback.play(randomFrom(soundOptions.declineIt));
        self.emailSignup.showModal = true;
      } else if (bullshit == "facebook") {
        soundFeedback.play(randomFrom(soundOptions.denyIt));
        self.fb.showModal = true;
      }
      self.startTimer();
    },

    confirmCookieSelection() {
      const self = this;

      let acceptedCookies = [];
      self.gdpr.cookies.forEach(cookie => {
        if (cookie.allowed && !cookie.required) {
          acceptedCookies.push(cookie);
        }
      });

      if (acceptedCookies && acceptedCookies.length > 0) {
        failList = [];
        acceptedCookies.forEach(cookie => {
          failList.push(cookie.label);
        });
        let also = { list: failList };
        self.failPlayer(2,also);
      } else {
        self.congratulatePlayer(2);
        self.toggleCookieModal('close');
        self.gdpr.showBanner = false;
      }
    },

    requestPermission(what) {
      const self = this;
      let myQuery;
      let mediaObject;
      let roundCode;
      if (what == "microphone") {
        myQuery = { name: 'microphone' };
        mediaObject = { audio: true, video: false };
        roundCode = 4;
      } else if (what == "camera") {
        myQuery = { name: 'camera' };
        mediaObject = { audio: false, video: true };
        roundCode = 3;
      }

      // Having defined my variables, let's ask for permission.

      navigator.permissions.query(myQuery).then(result => {
        if (result.state == "granted") {

          // Permission has been previously granted.
          navigator.mediaDevices.getUserMedia(mediaObject)
            .then(function(mediaStream) {
              self.failPlayer(roundCode);
              if (what == "camera") {
                // If I asked for a camera, I want to show the camera on tha failure screen.
                setTimeout(function() {
                  var video = document.querySelector('video');
                  video.srcObject = mediaStream;
                  video.onloadedmetadata = function(e) {
                    video.play();
                  };
                },600);
              }
            });
        } else if (result.state == 'prompt') {
          // Permission hasn't been decided yet... 
          // This is the most preferred state for the game.
          navigator.mediaDevices.getUserMedia(mediaObject)
            .then(function(mediaStream) {
              // You just now gave me access.
              // I'm gonna give you a failure state, depending on what I asked for.
              self.failPlayer(roundCode);
              if (what == "camera") {
                // If I asked for a camera, I want to show the camera on tha failure screen.
                setTimeout(function() {
                  var video = document.querySelector('video');
                  video.srcObject = mediaStream;
                  video.onloadedmetadata = function(e) {
                    video.play();
                  };
                },600);
              }
            })
            .catch(function(err) { 
              // You DECLINED access
              // I'm gonna congratulate you, depending on what I asked for.
              console.log(err.name + ": " + err.message);
              self.congratulatePlayer(roundCode);
            });
        } else {
          // Looks like I was never able to ask for permission for this thing.
          // Gonna have to try something else...
          if (result.state == "denied") {
            self.congratulatePlayer(roundCode);
          }
        }
      });
    },

    closeEmailModal(result) {
      const self = this;
      if (result == "optOut") {
        self.emailSignup.showModal = false;
        self.congratulatePlayer(5);
      } else if (result == "submit") {
        self.emailSignup.showModal = false;
        self.failPlayer(5);
      }
    },

    resolveFacebook(result) {
      const self = this;
      if (result == "no thanks") {
        self.congratulatePlayer(6);
      } else if (result == "share") {
        self.failPlayer(7);
      } else if (result == "like") {
        self.failPlayer(6);
      }
      self.fb.showModal = false;
    },


    populateNewsGrid() {
      const self = this;
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

      newsGroups.forEach(group => {
        self.populateNewsGroup(group);
      });

      
    },

    populateNewsGroup(group) {
      const self = this;
      self.news[group.k].boxes = [];
      let n = 0;
      
      while (n < group.count) {
        n++;
        


        // is this news or an ad?
        let box;
        let boxType;
        if (group.noAd && group.noAd == n) {
          // This box CAN'T be an ad.
          boxType = "news";
        } else if (group.alwaysAd && group.alwaysAd == n) {
          // This box MUST be an ad.
          boxType = "ad";
        } else {
          let adSaturation;
          if (group.adSaturation) {
            adSaturation = group.adSaturation;
          } else {
            adSaturation = self.news.adSaturation;
          }

          const r = randomNumber(1,100);
          if (r <= adSaturation) {
            // This is an ad, due to ad saturation rules.
            boxType = "ad";
          } else {
            // This is news, due to ad saturation rules.
            boxType = "news";
          }
        }
        if (boxType == "ad") {
          box = Object.assign( {}, self.news.allAds[self.news.lastAdIndex]);
          self.news.lastAdIndex++;
          if (!self.news.allAds[self.news.lastAdIndex]) {
            self.news.lastAdIndex = 0;
          }
          box.type = "ad";
        } else if (boxType == "news") {
          //box = Object.assign({},randomFrom(theNews));
          box = Object.assign( {}, self.news.allNews[self.news.lastNewsIndex]);
          self.news.lastNewsIndex++;
          if (!self.news.allNews[self.news.lastNewsIndex]) {
            self.news.lastNewsIndex = 0;
          }
          // box = Object.assign({},self.news.allAds[self.news.lastAdIndex]);
          // self.news.lastAdIndex++;
          // if (!self.news.allAds[self.news.lastAdIndex]) {
          //   self.news.lastAdIndex = 0;
          // }
          box.type = "news";
        }

        const subtractDays = randomNumber(0,27);
        box.dateStamp = moment().subtract(subtractDays,'days').format('L');

        // Is this box BIG?
        if (group.bigOne && group.bigOne == n) {
          console.log(group.bigOne, box);
          box.big = true;
        }

        self.news[group.k].boxes.push(box);
      }
    },

    boxClasses(box) {
      const self = this;
      let c = "";
      if (box.big) {
        c += " big";
      }
      if (box.type) {
        c += " "+box.type;
      }
      return c;
    },

    startGame() {
      const self = this;
      self.news.lastNewsIndex = 0;
      self.news.lastAdIndex =  0;
      self.news.allNews = Object.assign({}, shuffle(theNews));
      self.news.allAds = Object.assign({}, shuffle(theAds));
      self.populateNewsGrid();
      self.gameStarted = true;
      setTimeout(function() {
        self.doBullshit('emailSignup');
      },4433);
    }

  },

  computed: {
    computedTimerOutput() {
      const self = this;
      seconds = Math.trunc(self.timer);
      ms = parseInt((self.timer % 1) * 100);
      if (ms < 10) {
        ms = "0" + ms;
      }
      return `<span class="seconds">${seconds}</span><span class="ms">${ms}</span>`;
    }
  },

  mounted: function() {
    const self = this;
  }

});