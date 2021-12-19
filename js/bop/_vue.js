//import SweetModal from 'sweet-modal-vue/src/plugin.js';

Vue.use(VueToast);

var app = new Vue({
  el: '#app',
  data: {
    h1: 'Refuse it!',
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
          info: `<p>This website uses arbitary code provided by hundreds of different companies, written by tens of thousands of different developers, none of whom we can personally vouch for, and we've never bothered to inspect the code they wrote. We would like to run that code on your computer.</p>`,
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

    startRound(round) {
      const self = this;
      if (round == "gdpr") {
        self.gdpr.showBanner = true;
        self.gdpr.cookies.forEach(cookie => {
          cookie.allowed = true;
        });
        soundFeedback.play(randomFrom(soundOptions.rejectThem));
      } else if (round == "camera") {
        soundFeedback.play(randomFrom(soundOptions.blockIt));
        self.requestPermission('camera');
      } else if (round == "microphone") {
        soundFeedback.play(randomFrom(soundOptions.denyIt));
        self.requestPermission('microphone');
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


  },

  computed: {
    computedTimerOutput() {
      const self = this;
      seconds = Math.trunc(self.timer);
      // if (seconds < 10) {
      //   seconds = "0" + seconds;
      // }
      ms = parseInt((self.timer % 1) * 100);
      if (ms < 10) {
        ms = "0" + ms;
      }
      return `<span class="seconds">${seconds}</span><span class="ms">${ms}</span>`;
    }
  },

  mounted: function() {
  }

});