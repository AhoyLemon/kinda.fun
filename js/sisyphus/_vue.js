var app = new Vue({
  el: '#app',
  data: {
    gameName: "sisyphus",
    phase: 'begin',
    message: 'Click Sisyphus to push the rock uphill.',
    score: 0,
    totalScore: 0,
    secondsPlayed: 0,
    totalClicks: 0,
    visibleDrawer: null,
    drawerOpenedCount: 0,
    outsideLinksClicked: [],
    sidebarVisible: false,
    s: sDefaults,
    r: rDefaults,
    fg: {
      transform:0
    },
    bg: {
      transform:0
    },
    store: [...storeItems],
    inventory: [],
    cheevos: [],
    cheevoReminders: 0,

    // Audio stuff
    isMusicPlaying: false,
    uphillMusicTimer: undefined,

    // Dignity...
    boughtDignity: false
  },

  methods: {

    sisyphusClick() {
      let self = this;
      let f = self.s.pushForce;
      let r = self.s.retreatSpeed;
      let bT;
      
      document.getElementById('Sisyphus').blur();

      if (self.boughtDignity) {
        self.boughtDignity = false;
        self.inventory = [];
        self.getCheevo("Dignity Retaken!","I was thinking that would make you stop clicking, but apparently not. Have five points I guess.", 5);
        dignityLost.play();
        self.store.push(
          {
            id: 7, name: "Dignity", price: 60000, scoreToReveal: 1,
            desc: "I've taken your dignity back. Are you going to buy it again now?"
          }
        );
      }

      // You can't move Sisyphus while the rock is falling...
      if(self.r.falling) {
        return false;
      }

      self.totalClicks++;

      // Actions taken on specific clicks
      switch (self.totalClicks) {

        case 1:
          socket.emit('sisyphusStartGame', {
            gameName: self.gameName
          });
          break;
        case 143:
          // 
          var audio = new Audio('audio/bylemon.mp3');
          audio.volume = 0.5;
          audio.play();
          new PNotify({
            title: `<a href="https://ahoylemon.xyz" target="_blank" onclick="sendEvent('outside link', 'site by Lemon', 'https://ahoylemon.xyz')">This site is by Lemon.</a>`,
            addclass: 'stack-bottomright site-by-lemon',
          });
          break;
        
        // These are all cheevos
        case 437:
          self.getCheevo('437 Clicks', "You've clicked on Sisyphus 437 times. And while that may seem like a meaningless number, have you considered that any other number is equally meaningless?", 25);
          break;
        case 1400:
          self.getCheevo('-100 Points', "I think you have too many points. You've just lost a hundred of them.", -100);
          break;
        case 1000:
          self.getCheevo('4 Digits of Clicks', "You've now clicked on Sisyphus 1,000 times. That might be too many times.", 25);
          break;
        
        case 10000:
          self.getCheevo('10,000 Clicks', "That's a whole lot of clicks!", 25);
          break;
      }

      // Measure clicks in the browser window.
      if (self.totalClicks > 125) {
        document.title = "["+addCommas(self.totalClicks)+"]" + " Sisyphus Clicked";
      }

      // Are you going up or down?
      if (self.s.retreating == false) {

        //////////////////////////////////////////////////////////////
        // You are pushing the rock uphill
        if (self.phase != 'begin' && self.phase != 'pushing') {
          self.switchMessage('pushing');
        }
        self.score++;
        self.totalScore++;
        self.s.bottom += f;
        self.s.left += f;

        self.r.bottom += f;
        self.r.left += f;

        // Music check

        if (self.uphillMusicTimer) {
          clearTimeout(self.uphillMusicTimer);
        }
        self.uphillMusicTimer = setTimeout(function(){
          uphillMusic.pause();
          self.isMusicPlaying = false;
        }, 780);

        if (!self.isMusicPlaying) {
          uphillMusic.play();
          self.isMusicPlaying = true;
        }

        //background transform
        bT = (self.s.pushForce * 0.75);
        self.bg.transform -= bT;
        
        if (self.r.left >= self.r.peak) {
          // The rock just fell back downhill
          self.r.bottom = begin.r.bottom;
          self.r.left = begin.r.left;
          self.r.falling = true;
          self.s.retreating = true;
          self.switchMessage('falling');
          self.r.rollbacks++;

          uphillMusic.pause();
          downhillMusic.play();
          setTimeout(function(){
            downhillMusic.stop();
            self.isMusicPlaying = false;
            self.r.falling = false;
          }, 2000);

          sendEvent("Rollback", self.r.rollbacks+' time(s)');
          
          socket.emit('sisyphusRollback', {
            gameName: self.gameName
          });

          // Rollback Cheevos
          switch(self.r.rollbacks) {
            case 3:
              self.getCheevo('The Anti-Turkey', 'Three gutterballs! Clearly you should keep bowling.', 10);
              break;
            case 7:
              self.getCheevo('Still Failing!', "It's rolled back 7 times now, but don't let that stop you.", 15);
              break;
            case 13:
              self.getCheevo('13 Rollbacks', "Hey, I know the rock has rolled back down the hill 13 times. Next time tho....", 15);
              break;
            case 25:
              self.getCheevo('25 Rollbacks', "You're enjoying this, aren't you?", 10);
              break;
          }

        }

        /////////////////////////////
        // 🏆 Pushing rock cheevos
        switch(self.totalScore) {
          case 100:
            self.getCheevo('Making Progress', "You have pushed the rock uphill 100 times. Congratulations!", 6);
            break;
          case 300:
            self.getCheevo('300 Pushes', "You know how video game achievements like to do quotes of movies? Like maybe some achievement is about someone named Akbar and then the achievment is called like “It's A Trap!” or something? Anyway, you've clicked the rock 300 times. I don't think there's anything I can add to that.", 3);
            break;
          case 414:
            self.getCheevo('Keep Pushing That Rock!', "To help motivate you, I'm subtracting 40 points from your score.", 40);
        }


      } else if (self.s.retreating == true) {

        //////////////////////////////////////////////////////////////
        // You are running back downhill

        self.s.bottom -= r;
        self.s.left -= r;

        //forground transform
        bT = (self.s.retreatSpeed * 0.75);
        self.bg.transform += bT;


        if (self.phase != 'retreat') {
          self.switchMessage('retreat');
          self.r.peak = randomNumber(55,75);
        }
        if (self.s.bottom <= begin.s.bottom || self.s.left <= begin.s.left) {

          //////////////////////////////////////////////////////////////
          // The ball is rolling back downhill.
          self.s.retreating = false;
          self.s.bottom = begin.s.bottom;
          self.s.left = begin.s.left;
          self.fg.transform = 0;
          self.bg.transform = 0;

        }
      } 
    },

    buyItem(i,item) {
      let self = this;
      
      if (self.score >= item.price) {
        self.score -= item.price;

        let s = findKeyInArray(self.store,'id',item.id);
        let n = self.store[s];
        n.showDesc = false;

        self.inventory.push(n);
        
        removeFromArrayByKey(self.store,'id',item.id);

        self.buyItemEffect(item.id);

        purchaseSound.play();

        sendEvent('item purchase', item.name, item.price);
        socket.emit('sisyphusBoughtItem', {
          gameName: self.gameName,
          id:item.id,
          name:item.name,
          desc:item.desc,
          price:item.price
        });
      
        if (self.inventory.length == 1) {
          self.getCheevo('Shopping In Hades!', 'First item purchased.', 10);
        }

        
        // Cheevos for specific purchased items....
        switch (item.id) {
          case 5:
            self.getCheevo("Worth It!", "That was some very expensive peach tea.", 2);
            break;
          case 19:
            self.getCheevo("Self Bondage", "I wonder if this game gets easier if you're in chains?", 9);
            break;
          case 20:
            self.getCheevo("How Refreshing!", "Mmmmm, that's some effervescent water!", 4);
            break;
          
          case 7:
            let currentScore = self.computedGamerScore;
            let negativeScore = (0 - currentScore);
            self.cheevos = [];
            self.score = 0;
            self.inventory = [];
            self.store = [...storeItems];
            self.inventory = [
              {
                id: 7, name: "Dignity", price: 60000, scoreToReveal: 600,
                desc: "You've played this game for far too long. I'm taking your diginity and you can buy it back."
              }
            ];
            dignityGot.play();
            self.getCheevo("Dignity Restored!","You've finally reclaimed your dignity. However, it was at the expense of any points that you've earned so far. So I guess, if you want those points back, you should probably keep pushing the boulder.",negativeScore);
            removeFromArrayByKey(self.store,'id', 7);
            self.boughtDignity = true;
            break;
        }


      }
    },

    openOutsideLink(text,url) {
      const self = this;
      sendEvent('outside link', text, url);
      self.outsideLinksClicked.push({text:text, url:url});

      switch (self.outsideLinksClicked.length) {
        case (1):
          self.getCheevo("Website Clicker", "Welcome back, how did you enjoy the "+self.outsideLinksClicked[0].text+" website?", 10);
          break;
        case (4):
          self.getCheevo('Complete Website Clicker!', "Which of those websites was your favorite?", 20);
          break;
      }
    },

    foo(item) {
      item.showDesc = !item.showDesc;
    },

    buyItemEffect(id) {
      let self = this;

      switch (id) {
        case 1: 
          //---- Fresh Kicks
          self.s.pushForce = (self.s.pushForce * 1.01);
          self.s.retreatSpeed = (self.s.retreatSpeed * 1.3);
          break;
        case 2: 
          //---- small pickaxe
          self.r.height = (self.r.height * 0.85);
          self.r.width = (self.r.width * 0.85);
          self.s.pushForce = (self.s.pushForce * 1.5);
          break;
        case 3: 
          //---- gum
          self.r.height = (self.r.height * 1.15);
          self.r.width = (self.r.width * 1.15);
          self.s.pushForce = (self.s.pushForce * 0.5);
          break;
        case 4: 
          //---- analgesic
          self.s.pushForce = (self.s.pushForce * 1.35);
          break;
        case 5: 
          //---- peach tea
          self.s.pushForce = (self.s.pushForce * 0.85);
          self.s.retreatSpeed = (self.s.retreatSpeed * 1.4);
          break;
        case 6: 
          //---- heelies
          self.s.pushForce = (self.s.pushForce * 0.85);
          self.s.retreatSpeed = (self.s.retreatSpeed * 1.4);
          break;
        case 7: 
          //---- dignity          
          // These effects are handled elsewhere.
          break;
        case 8: 
          //---- a phone call from your mom
          self.s.height = (self.s.height * 0.77);
          self.s.width = (self.s.width * 0.77);
          self.r.marginLeft = (self.r.marginLeft * 1.8);
          break;
        case 9: 
          //---- boner pills
          // does nothing
        case 10: 
          //---- jock jams
          self.s.pushForce = (self.s.pushForce * 1.05);
          break;
        case 11: 
          //---- hades fashion
          self.s.pushForce = (self.s.pushForce * 0.6);
          break;
        case 12: 
          //---- a new, heavier boulder
          self.r.height = (self.r.height * 2);
          self.r.width = (self.r.width * 2);
          self.r.marginLeft = (self.r.marginLeft * 2.7);
          self.s.pushForce = (self.s.pushForce * 0.3);
          break;
        case 13: 
          //---- spite
          self.s.pushForce = (self.s.pushForce * 1.05);
          self.s.retreatSpeed = (self.s.retreatSpeed * 1.05);
          break;
        case 14: 
          //---- crampons
          self.s.pushForce = (self.s.pushForce * 1.4);
          self.s.retreatSpeed = (self.s.retreatSpeed * 0.6);
          break;
        case 15: 
          //----mountain goat blood
          self.s.pushForce = (self.s.pushForce * 0.6);
          self.s.retreatSpeed = (self.s.retreatSpeed * 1.4);
          break;
        case 16: 
          //---- yogurt pouch
          self.s.retreatSpeed = (self.s.retreatSpeed * 1.07);
          break;
        case 17: 
          //---- knee braces
          // does nothing
          break;
        case 18: 
          //---- moral support
          self.r.height = (self.r.height * 1.2);
          self.r.width = (self.r.width * 1.2);
          self.r.marginLeft = (self.r.marginLeft * 1.4);
          self.s.pushForce = (self.s.pushForce * 0.83);
          break;
        case 19: 
          //---- thanatos' chains
          self.s.pushForce = (self.s.pushForce * 0.4);
          break;
        case 20: 
          //---- lemon water
          self.s.pushForce = (self.s.pushForce * 1.07);
          self.s.retreatSpeed = (self.s.retreatSpeed * 1.07);
          break;
        case 22: 
          //---- little league trophy
          self.s.retreatSpeed = (self.s.retreatSpeed * 1.13);
          break;
        case 23: 
          //---- sand paper
          self.r.height = (self.r.height * 0.8);
          self.r.width = (self.r.width * 0.8);
          self.r.marginLeft = (self.r.marginLeft * 0.9);
          self.s.pushForce = (self.s.pushForce * 1.4);
          break;
        case 24: 
          //---- stickers (scented)
          self.s.pushForce = (self.s.pushForce * 0.8);
          break;
        case 25: 
          //---- stickers (puffy) 
          self.r.height = (self.r.height * 1.15);
          self.r.width = (self.r.width * 1.15);
          self.r.marginLeft = (self.r.marginLeft * 1.21);
          self.s.pushForce = (self.s.pushForce * 1.18);
          break;
        case 27: 
          //---- firecrackers
          self.r.height = (self.r.height * 0.8);
          self.r.width = (self.r.width * 0.8);
          self.r.marginLeft = (self.r.marginLeft * 0.9);
          self.s.pushForce = (self.s.pushForce * 1.18);
          break;
        case 28: 
          //---- bedazzler
          self.r.height = (self.r.height * 1.27);
          self.r.width = (self.r.width * 1.27);
          self.r.marginLeft = (self.r.marginLeft * 1.36);
          self.s.pushForce = (self.s.pushForce * 0.78);
          break;
        case 29: 
          //---- espresso
          self.s.retreatSpeed = (self.s.retreatSpeed * 1.38);
          break;
      }
      
    },

    switchMessage(m) {
      let self = this;
      self.phase = m;
      if (m == 'falling') {
        self.message = randomFrom(rockFellMessages);
      } else if (m == "retreat") {
        self.message = randomFrom(retreatMessages);
      } else if (m == "pushing") {
        self.message = randomFrom(keepPushingMessages);
      }
    },

    addCommas(n) {
      const self = this;
      return addCommas(n);
    },

    getCheevo(title,text,points) {
      let self = this;
      if (!title) { title  = null; }
      if (!text) { text  = null; }
      let t;
      if (points) { 
        t = '<strong>'+points+'💀</strong> '+text;
      } else {
        t = text;
      }

      if (title && text) {
        sendEvent("cheevo", title, text);
      } else if (title && points) {
        sendEvent("cheevo", title, points);
      } else if (text && points) {
        sendEvent("cheevo", text, points);
      } else if (text) {
        sendEvent("cheevo", text);
      } else if (title) {
        sendEvent("cheevo", title);
      }


      cheevoSound.play();

      new PNotify({
        title: title,
        text: t
      });

      self.cheevos.push( { title:title,text:text,points:points });

      // give cheevos based on cheevos!
      if (self.cheevos == 2) {
        setTimeout(function(){ 
          self.getCheevo("And Here Is A Third!", "You've had two achivements, so here is a third achievement for getting those.", 12);
        }, 1500);
      } else if (self.cheevos == 7) {
        setTimeout(function(){ 
          self.getCheevo("You Cannot Have 7", "7 is considered a lucky number, so now you have 8 achievements.", 3);
        }, 1500);
      }
      

      // Log this Cheevo in the database.
      socket.emit('sisyphusEarnedCheevo', {
        gameName: self.gameName,
        title: title,
        text: text,
        points: points
      });

    },

    remindMeOfMyCheevos() {
      const self = this;
      self.cheevos.forEach((cheevo) => {
        new PNotify({
          title: cheevo.title,
          text: '<strong>'+cheevo.points+'💀</strong> '+cheevo.text
        });
      });
      self.cheevoReminders++;

      if (self.cheevoReminders == 1) {
        self.getCheevo("One more for the pile", "Hey, when you clicked to see your cheevos, did you expect to get a cheevo for that?", 11);
      } else if (self.cheevoReminders == 5) {
        self.getCheevo("Bad Memory", "Aparently you can't remember how many cheevos you have? Well, it's one more than that.", 9);
      }

    },

    everySecond() {
      let self = this;
      self.secondsPlayed++;

      switch (self.secondsPlayed) {
        case (15):
          self.getCheevo('Achievement Unlocked!', 'You have played this game for 15 seconds.', 5);
          break;
        case (60):
          self.getCheevo('One Minute Mark!', 'You have played the game for one minute.', 10);
          break;
        case (300):
          self.getCheevo('Five Minutes', 'Five minutes of this! How are you feelng about life?', 20);
          break; 
        case (600):
          self.getCheevo('Ten Minutes Pushing Rocks', "It's now been 10 minutes since you started playing. Is everything okay over there?", 30);
          break; 
      }
      
    },

    toggleDrawer(d) {
      let self = this;
      if (d == self.visibleDrawer) {
        self.visibleDrawer = null;
      } else {
        self.visibleDrawer = d;
      }
    },

    toggleSidebar() {
      let self = this;
      self.sidebarVisible = !self.sidebarVisible;

      if (self.sidebarVisible) {
        self.drawerOpenedCount++;
        sendEvent('drawer', 'sidebar opened');
        switch (self.drawerOpenedCount) {
          case (1):
            setTimeout(function() {
              self.getCheevo('Drawer Opener', 'What does that question mark mean? Well now you know!', 8);
            }, 400);
            break;
          case (5):
            self.getCheevo("Habitual Drawer Opener", "How many times are you gonna click on that question mark?", 10);
            break;
          case (15):
            self.getCheevo("Obsessive Drawer Opener", "Okay! You <i>definitely</i> know what happens when you click that question mark.", 13);
            break;
          case (50):
            self.getCheevo("Problematic Drawer Opener", "Stop clicking that question mark.", 1);
            break;
          case (52):
            self.getCheevo("Bad Listener", "I told you to stop.", -5);
            break;
          case (53):
            self.getCheevo("Really Bad Listener", "God damn it.", -15);
            break;
        }
      }
      
    }

  },

  computed: {
    rockLeft() {
      return 'calc('+this.s.width+'% + '+this.r.left+'%)';
    },
    rockHeight() {
      return this.r.height+'%';
    },
    rockWidth() {
      return this.r.width+'%';
    },
    rockMarginLeft() {
      return this.r.marginLeft+'%';
    },
    foregroundTransform() {
      return 'translateX('+this.fg.transform+'%)';
    },
    backgroundTransform() {
      return 'translateX('+this.bg.transform+'%)';
    },

    availableUpgrades() {
      let self = this;
      let a = [];
      self.store.forEach(function(item,i) {
        if (self.totalScore >= item.scoreToReveal) {
          a.push(item);
        }
      });
      return a;
    },

    computedGamerScore() {
      const self = this;
      let gamerScore = 0;
      self.cheevos.forEach(function(item) {
        if (item && item.points > 0) {
          gamerScore += item.points;
        }
      });
      return gamerScore;
    }

  },

  mounted: function() {
    let self = this;
    setInterval(function () {
      self.everySecond();
    }, 1000);

    if (testing) {

      // If you're in testing mode
      // Press space to click
      // hold down enter to continually advance.
      window.addEventListener('keydown', function(ev) {
        if (ev.code == "Enter") {
          self.sisyphusClick();
        }
      });
      window.addEventListener('keyup', function(ev) {
        console.log(ev);
        if (ev.code == "Space") {
          self.sisyphusClick();
        }
      });

    } 

  }

});