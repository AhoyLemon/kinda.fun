var app = new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    timer: 0,
    timerFunction: undefined,
    secondsElapsed: 0,

    user: {

      // Location Stuff
      ip: null,
      city: null,
      country: null,
      region: null,
      timezone: null,
      lat: null,
      long: null,

      // Score Stuff
      correctAnswers: 0,
      wrongAnswers: 0,
      wrongAnswersThisRound: 0,
      points: 0
    },

    bullshitActive: false,

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

    askingPermission: {
      showPrompt: false,
      what: null
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
      visible: false,
      showInlineAd: false,
      adAfterParagraphNumber: 2
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

    getUserData() {
      const self = this;

      // Function to pull user data from local (if it exists)
      function getLocalUserData() {
        self.user.ip = localStorage.getItem("userIP")
        self.user.city = localStorage.getItem("userCity")
        self.user.country = localStorage.getItem('userCountry');
        self.user.region = localStorage.getItem('userRegion');
        self.user.timezone = localStorage.getItem('userTimezone');
        self.user.lat = localStorage.getItem('userLat');
        self.user.long = localStorage.getItem('userLat');
        if (testing) {
          console.info('user data pulled from local storage')
        }
      }

      // Function to get user's IP address
      function getUserIP(callback){
        const fetchURL = `https://api64.ipify.org?format=json`;
        fetch(fetchURL)
          .then(response => response.json())
          .then(data => {
            callback(null, data.ip)
          })
          .catch(error => callback(error, null));
      }

      // Function to get user's city based on IP address using freegeoip.app
      function getCityFromIP(ip, callback){
        const fetchURL = `https://ipinfo.io/${ip}?token=eba53e08885650`
        fetch(fetchURL)
          .then(response => response.json())
          .then(data => callback(null, data))
          .catch(error => callback(error, null));
      }

      // Main function to get user's city and save it as a variable
      function getUserCity(){
        getUserIP((ipError, ipAddress) => {
          if (ipError) {
            console.error('Error getting IP address:', ipError);
            return;
          }
          if (ipAddress) {
            self.user.ip = ipAddress
            localStorage.setItem('userIP', ipAddress)

            getCityFromIP(ipAddress, (cityError, locationData) => {
              if (cityError) {
                console.error('Error getting city from IP:', cityError);
                return;
              }
              if (locationData) {
                self.user.city = locationData.city;
                self.user.country = locationData.country;
                self.user.ip = locationData.ip;
                self.user.region = locationData.region;
                self.user.timezone = locationData.timezone;
                if (locationData.loc) {
                  self.user.lat = locationData.loc.split(',')[0]
                  self.user.long = locationData.loc.split(',')[1]
                }

                localStorage.setItem('userCity', self.user.city)
                localStorage.setItem('userCountry', self.user.country)
                localStorage.setItem('userRegion', self.user.region)
                localStorage.setItem('userTimezone', self.user.timezone)
                localStorage.setItem('userLat', self.user.lat)
                localStorage.setItem('userLong', self.user.long)
                if (testing) {
                  console.info('user data pulled from ipinfo.io')
                }
              }
            });
          }

        });
      }

      // Call the main function
      if (localStorage.getItem('userIP') && localStorage.getItem('userCity')) {
        getLocalUserData()
      } else {
        getUserCity();
      }
    },

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


        const sE = Math.floor(self.timer);
        if (sE > 2 && sE != self.secondsElapsed) {
          const r = randomNumber(2,42);
          if (r == 5) {
            self.doBullshit(randomFrom(bullshitTypes));
          } else {
            if (testing) {
              //console.log('no random challenge');
            }
            
          }
          self.secondsElapsed = sE;
        } else {
          if (testing) {
            // console.log('seconds have not changed');
          }
        }
      }, 13);
    },

    stopTimer() {
      const self = this;
      clearInterval(self.timerFunction);
      self.timerFunction = undefined;
      self.timer = 0;
      self.secondsElapsed = 0;
    },

    failPlayer(reason,also) {
      const self = this;
      soundFeedback.play(randomFrom(soundOptions.failure));
      const notifyTitle = failStates[reason].title;
      let notifyMessage = failStates[reason].message;
      let fine = randomNumber(30,100);
      notifyMessage += `<p>You have been fined ${fine} points.</p>`;
      self.assignPoints('privacyFailure',(0 - fine))

      new PNotify({
        title: notifyTitle,
        text: notifyMessage,
        type: "error",
        delay: 8000
      });
      self.bullshitActive = false;
      
    },

    congratulatePlayer(roundCode) {
      const self = this;
      if (roundCode) {

        new PNotify({
          title: "Success!",
          text: `<p>${successMessages[roundCode].message}</p>`,
          type: "success",
          delay: 2000
        });
      }
      
      soundFeedback.play(randomFrom(soundOptions.success));
      self.bullshitActive = false;
    },

    doBullshit(bullshit) {
      const self = this;
      if (!self.bullshitActive) {
        self.bullshitActive = true;
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
      }
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
              if (testing) {
                console.log(err.name + ": " + err.message);
              }
              self.congratulatePlayer(roundCode);
            });
        } else {
          // Looks like I was never able to ask for permission for this thing.
          // Gonna have to try something else...
          if (result.state == "denied") {
            self.askingPermission.what = what;
            self.askingPermission.showPrompt = true;
          }
        }
      });
    },

    answerPermissionModal(answer, what) {
      const self = this;
      let roundCode;
      if (what == "camera") {
        roundCode = 3;
      } else if (what == "microphone") {
        roundCode = 4;
      }
      self.requestPermission(roundCode);
      if (answer == "deny") {
        self.congratulatePlayer(roundCode);
      } else if (answer == "allow") {
        self.failPlayer(roundCode);
      }
      self.askingPermission.showPrompt = false;
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
          box = Object.assign( {}, self.news.allNews[self.news.lastNewsIndex]);
          self.news.lastNewsIndex++;
          if (!self.news.allNews[self.news.lastNewsIndex]) {
            self.news.lastNewsIndex = 0;
          }
          box.author = {
            firstName: randomFrom(firstNames),
            lastName: randomFrom(lastNames)
          };
          box.type = "news";
        }

        const subtractDays = randomNumber(0,27);
        box.dateStamp = moment().subtract(subtractDays,'days').format('L');

        // Is this box BIG?
        if (group.bigOne && group.bigOne == n) {
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
      self.currentQuestion = {};
      self.myGuess = "";
      self.user.wrongAnswersThisRound = 0;

      setTimeout(() => {
        self.currentQuestion = Object.assign({}, self.allQuestions[self.currentQuestionIndex]);
        if (document.getElementById("TheQuestion")) {
          document.getElementById("TheQuestion").focus();
        }
      }, 200);
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

      const secondsTaken = parseInt(self.timer)
      if (guess == answer || (possibleAnswers && possibleAnswers.includes(guess)) ) {
        self.user.correctAnswers += 1;
        let additionalPoints = points.forCorrectAnswer;
        let timeBonus = (points.maximumSeconds - secondsTaken) * points.bonusPerSecond;
        if (isNaN(timeBonus) || timeBonus < 0) {
          timeBonus = 0;
        }

        additionalPoints += timeBonus;
        self.user.points += additionalPoints;
        
        new PNotify({
          title: randomFrom(correctAnswerTitleOptions),
          text: `<strong>${additionalPoints} points</strong> (${secondsTaken} seconds)`,
          type: "success"
        });

        self.assignPoints("correctAnswer", additionalPoints);
        self.startTimer();
        self.currentQuestionIndex++;
        self.askAQuestion();
      } else {
        self.myGuess = "";
        self.user.wrongAnswers += 1;
        self.user.wrongAnswersThisRound += 1;
        if (self.user.wrongAnswersThisRound == 1) {
          self.assignPoints("wrongAnswer", points.forFirstWrongAnswer)
          new PNotify({
            title: "No!",
            text: `<p>That is not correct. You just <strong>lost ${(0 - points.forFirstWrongAnswer)} points</strong>. Again, the answer to the question is on this disaster of a website, keep looking.</p><p><strong>PS the answer is ${answer}</strong>.</p>`,
            type: "error"
          })
        } else if (self.user.wrongAnswersThisRound == 2) {
          self.assignPoints("wrongAnswer", points.forSecondWrongAnswer)
          new PNotify({
            title: "Still No!",
            text: `<p>That's also incorrect, and now you <strong>lost ${(0 - points.forSecondWrongAnswer)} points</strong>. Look, I'll give you one more try. Don't Google it, the answer is on this disaster of a website.</p><p><strong>PS the answer is ${answer}</strong>.</p>`,
            type: "error"
          })
        } else {
          self.assignPoints("wrongAnswer", points.forThirdWrongAnswer)
          new PNotify({
            title: "Let's skip this one",
            text: `<p>You know what? I don't think you're going to get this one. I'm just gonna subtract <strong>another ${(0 - points.forThirdWrongAnswer)} points</strong> from your score and we'll move on. .</p><p><strong>PS the answer is ${answer}</strong>.</p>`,
            type: "error"
          })
          self.startTimer();
          self.currentQuestionIndex++;
          self.askAQuestion();
        }
      }
    },

    assignPoints(whatHappened, adjustment) {
      const self = this;
    
      if (adjustment) {
        self.user.points += adjustment;
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

    parseHeadline(headline) {
      const self = this;
      if (self.user.city) {
        return headline.replace('{YourLocation}',self.user.city);
      } else {
        return headline
      }
    },

    chooseArticle(article) {
      const self = this;
      if (testing) {
        console.log(article);
      }
      
      self.currentArticle = Object.assign({ adVisible:false }, article);

      if (!self.currentArticle.paragraphs) {
        // Randomly populate some paragraphs this article.
        self.currentArticle.paragraphs = [];
        const n = randomNumber(4,16);
        let i = 0;
        while (i < n) {
          self.currentArticle.paragraphs.push(randomFrom(paragraphs));
          i++;
        }
      }

      // Let's find out if you have a nugget, and if so, put it in the article somewhere.
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
          paragraphContent += formattedNugget + " ";
          i = 0
          while (i < sentencesAfter) {
            paragraphContent += randomFrom(sentences) + " ";
            i++;
          }
          self.currentArticle.paragraphs[pIndex] = paragraphContent;
        }
      }

      self.currentArticle.visible = true;
      self.insertAdIntoArticle();
    },

    insertAdIntoArticle() {
      const self = this;
      self.currentArticle.adIndex = -1;
      setTimeout(() => {
        self.currentArticle.adVisible = !self.currentArticle.adVisible;
      }, 1500);

      setTimeout(() => {
        const r = randomNumber(0, (self.currentArticle.paragraphs.length - 2));
        self.currentArticle.paragraphs.splice(r,0,'<img src="https://placehold.co/600x600?text=Another+Fuckin+Ad" class="another-paragraph" alt="Here is something you will like" />');
      }, 3500);
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
    },

    handleScroll() {
      const self = this;
      if (!self.timer || !self.timerFunction) {
        self.startTimer();
      }
    },

    formattedNumber(value) {
      return value.toLocaleString()
    }

  },

  filters: {
    formattedDate(value) {
      return moment(value).format('LL')
    },
  },

  computed: {
    computedTimerOutput() {
      const self = this;
      let minutes;
      seconds = Math.trunc(self.timer);
      ms = parseInt((self.timer % 1) * 100);
      if (ms < 10) {
        ms = "0" + ms;
      }
      if (seconds > 59) {
        minutes = Math.floor(seconds / 60);
        seconds = seconds - (minutes * 60);
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
      }
      if (minutes) {
        return `<span class="m">${minutes}</span><span class="s">${seconds}</span><span class="ms">${ms}</span>`;
      } else {
        return `<span class="s">${seconds}</span><span class="ms">${ms}</span>`;
      }
      
    }
  },

  mounted: function() {
    const self = this;

    window.onscroll = function(e) {
      if (this.oldScroll < this.scrollY) {
        // You are scrolling down!
        self.handleScroll()
      }
      this.oldScroll = this.scrollY;
    }
    self.getUserData();

  }

});