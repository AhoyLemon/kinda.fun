var app = new Vue({
  el: '#app',
  data: {
    gameStarted: true,
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
    currentArticle: {
      visible: false
    },
    
    showFailureScreen: false,
    failStates: failStates,
    failure: {},

    currentQuestionIndex: 0,
    currentQuestion: {},
    myGuess: "",
    allQuestions: [],
    answeredQuestions: []
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

        new PNotify({
          title: "Success!",
          text: `<p>${successMessages[roundCode].message}</p>`,
          type: "success"
        });
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
      newsGroups.forEach(group => {
        self.populateNewsGroup(group);
      });

      self.allQuestions = Object.assign([], shuffle(self.allQuestions));
      self.askAQuestion();
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
          box.author = {
            firstName: randomFrom(firstNames),
            lastName: randomFrom(lastNames)
          };
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


        if (box.question && box.answer) {
          self.allQuestions.push(box);
        }


      }
    },

    askAQuestion() {
      const self = this;
      self.currentQuestion = Object.assign({}, self.allQuestions[self.currentQuestionIndex]);
      self.myGuess = "";
    },

    answerTheQuestion() {
      const self = this;

      let guess;
      let answer;
      let possibleAnswers = [];
      guess = self.myGuess.trim().toUpperCase();
      answer = self.currentQuestion.answer.trim().toUpperCase();

      if (self.currentQuestion.alternateAnswers) {
        self.currentQuestion.alternateAnswers.forEach(a => {
          possibleAnswers.push(a.trim().toUpperCase());
        })
      }

      if (guess == answer) {
        new PNotify({
          title: "Correct",
          text: "You got 1 point.",
          type: "success"
        })

        self.currentQuestionIndex++;
        self.askAQuestion();
      } else if ( possibleAnswers && possibleAnswers.includes(guess) ) {
        new PNotify({
          title: "Basically correct",
          text: `<p>I was actually looking for ${answer}, but I guess that's close enough, thanks.</p>`,
          type: "success"
        })
        self.currentQuestionIndex++;
        self.askAQuestion();
      } else {
        new PNotify({
          title: "No!",
          text: `<p>That is not correct. You just lost a point. Also actually, the correct answer is <strong>${answer}</strong> if you want to cheat about it. Eventually this should count the number of incorrect answers and only let you bypass after like 2 or 3 attempts.</p>`,
          type: "error"
        })
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

    chooseArticle(article) {
      const self = this;
      console.log(article);
      self.currentArticle = Object.assign({}, article);
      self.currentArticle.visible = true;
      self.currentArticle.paragraphs = []
      const n = randomNumber(4,16);
      let i = 0;
      while (i < n) {
        self.currentArticle.paragraphs.push(randomFrom(paragraphs));
        i++;
      }

      if (self.currentArticle.nugget) {


        // pick a random paragraph.
        const pIndex = randomNumber(1,self.currentArticle.paragraphs.length);
        const formattedNugget = '<strong>'+self.currentArticle.nugget+'</strong>';


        if (self.currentArticle.nuggetPlacement == "replace") {
          // Replace this paragraph with the nugget
          self.currentArticle.paragraphs[pIndex] = formattedNugget;
        } else if (self.currentArticle.nuggetPlacement == "beginning" || self.currentArticle.nuggetPlacement == "before") {
          // Place the nugget at the beginning of this paragraph.
          const theRest = self.currentArticle.paragraphs[pIndex];
          self.currentArticle.paragraphs[pIndex] = formattedNugget + " " + theRest;
        } else if (self.currentArticle.nuggetPlacement == "end" || self.currentArticle.nuggetPlacement == "after") {
          // Place the nugget at the beginning of this paragraph.
          const theRest = self.currentArticle.paragraphs[pIndex];
          self.currentArticle.paragraphs[pIndex] = theRest + " " + formattedNugget;
        } else {
          // To put the nugget in the middle, generate a random number of sentences(2 to 4), then the nugget, then a random number of sentences (2 to 4)
          const sentencesBefore = randomNumber(2,4);
          const sentencesAfter = randomNumber(2,4);
          let paragraphContent = ""
          let i = 0;
          while (i < sentencesBefore) {
            paragraphContent += randomFrom(sentences) + " ";
            i++;
          }
          paragraphContent += formattedNugget;
          i = 0
          while (i < sentencesAfter) {
            paragraphContent += randomFrom(sentences) + " ";
            i++;
          }

        }
      }





    },

    closeArticle(article) {
      const self = this;
      //self.currentArticle.visible = false;
      self.currentArticle = {};
    },

    startGame() {
      const self = this;
      self.news.lastNewsIndex = 0;
      self.news.lastAdIndex =  0;
      self.news.allNews = Object.assign([], shuffle(theNews));
      self.news.allAds = Object.assign([], shuffle(theAds));
      self.populateNewsGrid();
      self.gameStarted = true;
      // setTimeout(function() {
      //   self.doBullshit('emailSignup');
      // },4433);
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
    self.startGame();

    // PNotify.info({
    //   text: 'Notice me, senpai!'
    // });
    // PNotify.warn({
    //   text: 'Notice me, senpai!'
    // });

    new PNotify({
      title: "Hi there!",
      text: `<p>Toasts work. Get ready to see a lot of these fuckin' things.</p>`,
      type: "success"
    });

  }

});