var app = new Vue({
  el: '#app',
  data: {

    gameStatus: "loading",
    currentBillionaires: [],
    formerBillionaires: [],
    
    data: {
      allBillionaires: allBillionaires, // <-- Might not be neccessary.
      stateSchools: schoolData
    },

    gameRules: {
      optionsPerDay: 20,
      choicesPerDay: 5
    },

    redistributions: {
      today: 0,
      allTime: 0,
    },

    wealthCreated: {
      today: 0,
      allTime: 0
    },

    comparativeData: {
      currentSchool: {},
    },

    ui: {
      wealthDisplay: 0,
      currentState: null,
      currentlyBusy: false,
      sortBy: 'random',
      shareScreen: {
        display: false,
        playDate: null,
        // firstPlay: null,
        weathCreatedToday: null,
        // wealthcreatedTotal: null,
        // redistributionsTotal: null,
        // mostExpensiveTrophy: null,
        playerName: null
      }
    },

    cheats: {
      active: true,
      unlimitedPlay: true
    },

    history: {
      firstPlay: null,
      lastPlay: null,
      lastGameResults: {
        wealthCreated: null,
        trophies: [],
      },
      trophies: []
    }

  },

  methods: {

    loadInitialGameState() {
      const self = this;

      // Randomly choose a state. Improve this later.
      self.comparativeData.currentSchool = randomFrom(schoolData);
      self.ui.currentState = self.comparativeData.currentSchool.state;

      const mmdd = moment().format('MMDD');
      
      // Populate Billionaires for the day
      if (allWarrants[mmdd]) {
        for (w of allWarrants[mmdd]) {
          self.currentBillionaires.push(allBillionaires[w]);
        }
      } 
      
      if (!self.currentBillionaires || self.currentBillionaires.length < 5) {
        alert("I couldn't find enough warrants. Using backup option...")
        self.currentBillionaires = shuffle(allBillionaires).slice(0,self.gameRules.optionsPerDay);
      }

      // Now that we have our billionaires, let's shuffle them.
      shuffle(self.currentBillionaires);

      // Get all game values from localStorage (if they're there.)
      if (
        localStorage.getItem('totalRedistributions') &&
        localStorage.getItem('totalWealthCreated') &&
        localStorage.getItem('firstPlay') &&
        localStorage.getItem('lastPlay')
      ) {
        self.redistributions.allTime = Number(localStorage.getItem('totalRedistributions')) ?? 0;
        self.wealthCreated.allTime = Number(localStorage.getItem('totalWealthCreated')) ?? 0;
        self.history.firstPlay = Date.parse(localStorage.getItem('firstPlay')) ?? null;
        self.history.lastPlay = Date.parse(localStorage.getItem('lastPlay')) ?? null;

        if (localStorage.getItem('trophyCase')) {
          const trophyString = localStorage.getItem('trophyCase');
          const trophyArray = JSON.parse(trophyString);
          self.history.trophies = trophyArray;
        }
      }
      if (
        localStorage.getItem('lastGameWealthCreated') &&
        localStorage.getItem('lastGameTrophies')
      ) {
        self.history.lastGameResults.wealthCreated = Number(localStorage.getItem('lastGameWealthCreated'));
        self.history.lastGameResults.trophies = JSON.parse(localStorage.getItem('lastGameTrophies'));
      }

      self.gameStatus = "titleScreen";

    },

    startGame() {
      const self = this;
      self.gameStatus = 'playing'
      socket.emit('guillotineStartGame', {
        gameName: "guillotine"
      });
      sendEvent("NO MORE BILLIONAIRES", "Game Started", "Fresh Game");
    },

    // Action Methods

    dropBlade(person) {
      const self = this;
      self.ui.currentlyBusy = true;
      // remove billionaire.
      const newList = self.currentBillionaires.filter(function(value,index,arr) {
        return value.name != person.name;
      });
      self.currentBillionaires = newList;
      
      // populate head
      
      // const p = String(Math.floor((Math.random() * 10) + 1)).padStart(2,'0');
      // $('#G_Head').attr('href', 'img/test/heads/'+p+'.jpg');

      // Start the drop sound.
      dropSound.play();

      setTimeout(() => {
        $('#TheG').addClass('dropped');

        const p = Math.floor((Math.random() * 17) + 1).toString();
        setTimeout(() => {
          if (person.name == 'King Charles III') {
            sound.play('Charles')
          } else {
            sound.play(p);
          }
          
        }, "320");
        setTimeout(() => {
          $('#G_Head').attr('href', 'img/guillotine/heads/empty.png');
          $('#TheG').removeClass('dropped').addClass('raised');
          self.decapitateBillionaire(person);
          setTimeout(() => {
            $('#TheG').removeClass('raised');
            self.ui.currentlyBusy = false;
          }, "1000");
        }, "1000");
      }, '220');
    },

    decapitateBillionaire(person) {
      const self = this;

      const additionalWealth = person.netWorth;
      self.formerBillionaires.push(person);
      self.redistributions.today++;
      self.redistributions.allTime++;
      self.wealthCreated.today += additionalWealth;
      self.wealthCreated.allTime  += additionalWealth;

      self.wealthCreated.today = Number(self.wealthCreated.today.toFixed(3))
      self.wealthCreated.allTime = Number(self.wealthCreated.allTime.toFixed(3))

      const stopAddingDollars = function () {
        clearInterval(addMoreDollars);
      };
      
      const addMoreDollars = setInterval(function(){

        const dollarIncrease = parseFloat(randomNumber(1,100000000) / 1000000000);
        self.ui.wealthDisplay += dollarIncrease;

        if (self.ui.wealthDisplay >= self.wealthCreated.today) {
          stopAddingDollars();
          self.ui.wealthDisplay = self.wealthCreated.today;
          self.ui.currentlyBusy = false;
        }
      }, 20);

      if (self.redistributions.today >= self.gameRules.choicesPerDay) {
        self.doEndGameActions();
      }

      sendEvent("NO MORE BILLIONAIRES", "Head Removed", self.parseName(person.name));

    },

    doEndGameActions() {
      const self = this;

      // Order the remaining billionaires by wealth.
      self.ui.sortBy = "highestWealth";

      self.history.lastGameResults.trophies = []
      // Rack up your trophies
      for (fB of self.formerBillionaires) {
        const trophy = {
          name: self.parseName(fB.name),
          netWorth: fB.netWorth
        }
        self.history.trophies.push(trophy);
        self.history.lastGameResults.trophies.push(trophy);
      }
      self.history.lastGameResults.wealthCreated = self.wealthCreated.today;
      // Save things to localStorage.
      self.saveToLocalStorage();

      const mvh = self.parseName(self.computedMostValuableToday.richestDead.name);

      socket.emit('guillotineFinishGame', {
        wealthCreated: self.wealthCreated.today,
        mostValuable: mvh,
        trophies: self.history.lastGameResults.trophies
      });
      sendEvent("NO MORE BILLIONAIRES", "Final Score", self.wealthCreated.today);

      self.gameStatus = "gameOver";
      $('html, body').animate({scrollTop: '+=325px'}, 800);
    },

    saveToLocalStorage() {
      const self = this;
      localStorage.setItem('totalRedistributions', self.redistributions.allTime);
      localStorage.setItem('totalWealthCreated', self.wealthCreated.allTime.toFixed(3));
      const rightNow = new Date();
      if (!localStorage.getItem('firstPlay')) {
        localStorage.setItem('firstPlay', rightNow.toString());
      }
      localStorage.setItem('lastPlay', rightNow.toString());
      
      if (self.history.trophies) {
        const trophyCaseString = JSON.stringify(self.history.trophies);
        localStorage.setItem('trophyCase', trophyCaseString);
      }

      if (self.history.lastGameResults && self.history.lastGameResults.wealthCreated && self.history.lastGameResults.trophies) {
        localStorage.setItem('lastGameWealthCreated',self.history.lastGameResults.wealthCreated)
        const lastGameTrophies = JSON.stringify(self.history.lastGameResults.trophies);
        localStorage.setItem('lastGameTrophies',lastGameTrophies);
      }

    },

    changeState() {
      const self = this;
      const newSchoolData = self.data.stateSchools.find(({ state }) => state === self.ui.currentState);
      if (newSchoolData) {
        self.comparativeData.currentSchool = newSchoolData;
      } else {
        alert('FAILURE finding '+self.ui.currentState);
      }
    },

    generateCheapHash(bigValue,smallValue) {
      return Math.floor((bigValue / smallValue) * 1.153);
    },

    shareMyScores() {
      const self = this;
      
      const p = {
        playDate: self.history.lastPlay ?? Date.parse(new Date()),
        weathCreatedToday: Number(self.history.lastGameResults.wealthCreated.toFixed(3))
      }

      let newURL = new URL(location.protocol + '//' + location.host + location.pathname);
      newURL.searchParams.set('playDate', p.playDate);
      newURL.searchParams.set('weathCreatedToday', p.weathCreatedToday);
      const cheapHash = self.generateCheapHash(p.playDate, p.weathCreatedToday);
      newURL.searchParams.set('hash', cheapHash);

      sendEvent("NO MORE BILLIONAIRES", "Score Shared", p.weathCreatedToday);

      socket.emit('guillotineShareScore', {
        wealthCreated: p.weathCreatedToday,
        playDate: p.playDate
      });

      window.location.replace(newURL);
      return false;
    },

    playFromShare() {
      const self = this;
      self.ui.shareScreen.display = false;
    },

    enterYourName() {
      const self = this;
      if (self.ui.shareScreen.playerName.length > 2) {
        let newURL = new URL(window.location);
        newURL.searchParams.set('playerName', self.ui.shareScreen.playerName);
        window.history.replaceState({}, "Share my Scores | "+siteTitle, newURL);
      }
    },

    // Parse Methods
    parseName(name) {
      if (name && name.includes('& family')) {
        name = name.split('&')[0]
      }
      return name.trim();
    },

    parseIndustryIcon(industry) {
      const self = this;
      industry = industry.trim();

      if (!industry) {
        return false;
      }
      switch (industry) {
        case "Automotive":
          return "automotive"
        case "Finance & Investments":
          return "finance-investment"
        case "Food & Beverage":
          return "hamburger"
        case "Real Estate":
          return "house"
        case "Technology":
          return "technology"
        case "Manufacturing":
          return "factory"
        case "Media & Entertainment":
          return "television"
        case "Fashion & Retail":
          return "shopping-bag"
        case "Energy":
          return "power-plant"
        case "Healthcare":
          return "healthcare"
        case "Telecom":
          return "digital-station"
        case "Metals & Mining":
          return "mining"
        case "Service":
          return "waiter"
        case "Diversified":
          return "pie-chart"
        case "Logistics":
          return "trucking"
        case "Gambling & Casinos":
          return "slot-machine"
        case "Sports":
          return "football"
        case "Construction & Engineering":
          return "construction"
        case "The Aristocracy":
          return "crown"
      }
    

      return false;
    },

    padNumber(number,padAmount) {
      if (!padAmount) {
        padAmount = 2;
      }
      return String(number).padStart(padAmount,'0')
    },

    convertToBillion(number) {
      return Number((number * 1000000000));
    },

    formatDollars(amount, convertToBillion, simpleOutput, trimCents) {
      const self = this;

      if (!amount) {
        amount = 0;
      }

      if (convertToBillion) {
        amount = self.convertToBillion(amount);
      }

      let maxCentsDigits = 2;
      if (trimCents) {
        maxCentsDigits = 0;
      }

      if (!simpleOutput) {
        let dollars = new Intl.NumberFormat('en-US').format(amount);
        let output = `<sup class="dollar-sign">$</sup>${dollars}<sup class="cents">00</sup>`
        return output;
      } else {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: maxCentsDigits,
        }).format(amount);
      }
    },

    formatNumber(number) {
      return new Intl.NumberFormat('en-US').format(number);
    },

    formatDate(dateString) {

      const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

      const self = this;
      const date = new Date(dateString);
      const month = allMonths[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      return `${month} ${day}, ${year}`;
    },

    sortThoseBillionaires(arr, sortBy) {
      const self = this;
      if (self.ui.sortBy == "highestWealth") {
        return arr.slice().sort((a, b) => (a.netWorth < b.netWorth) ? 1 : -1)
      } else {
        return arr;
      }
      
    }
  },

  computed: {

    computedRemainingRedistributions() {
      const self = this;
      let output = 99; // Default value. If you got this, something went wrong.
      if (self.redistributions && self.redistributions.today && self.gameRules && self.gameRules.choicesPerDay) {
        output = parseInt(self.gameRules.choicesPerDay - self.redistributions.today);
      } else if (self.gameRules && self.gameRules.choicesPerDay) {
        output = self.gameRules.choicesPerDay
      }
      return output;
    },

    computedSchoolsFunded() {
      const self = this;
      if (!self.wealthCreated || !self.wealthCreated.today)  {

        if (self.ui.shareScreen.wealthCreatedToday) {
          // console.log('line 427');
          const budgetToday = self.convertToBillion(self.ui.shareScreen.wealthCreatedToday);
          const costPerSchool = Number(self.comparativeData.currentSchool.perStudent *  self.comparativeData.currentSchool.perStudent);
          const schoolsFundedToday = Math.floor(budgetToday / costPerSchool);
          return {
            today: schoolsFundedToday,
            allTime: 0
          };
        } else {
          return {
            today: 0,
            allTime: 0
          };
        }
        
      }
      const budgetToday = self.convertToBillion(self.wealthCreated.today);
      const costPerSchool = Number(self.comparativeData.currentSchool.perStudent *  self.comparativeData.currentSchool.perStudent);
      const schoolsFundedToday = Math.floor(budgetToday / costPerSchool);

      let schoolsFundedAllTime = 0;
      if (self.wealthCreated.today == self.wealthCreated.allTime) {
        schoolsFundedAllTime = schoolsFundedToday;
      } else if (self.wealthCreated.allTime) {
        const budgetAllTime = self.convertToBillion(self.wealthCreated.allTime);
        schoolsFundedAllTime = Math.floor(budgetAllTime / costPerSchool);
      }

      return {
        today: schoolsFundedToday,
        allTime: schoolsFundedAllTime
      };
    },

    computedWealthToday() {
      const self = this;

      let stillAvailable = 0;
      let stillAvailablePct = null;
      let claimed = 0;
      let claimedPct = null;
      let total = 0;

      for (wallet of self.currentBillionaires) {
        stillAvailable += wallet.netWorth;
        total += wallet.netWorth
      }

      for (wallet of self.formerBillionaires) {
        claimed += wallet.netWorth;
        total += wallet.netWorth;
      }


      if (stillAvailable && claimed) {
        stillAvailablePct = percentOf(total,stillAvailable);
        claimedPct = percentOf(total,claimed);
      }

      return {
        fullWallets: self.currentBillionaires.length,
        stillAvailable: stillAvailable,
        stillAvailablePct: stillAvailablePct ?? null,
        claimed: claimed,
        claimedPct: claimedPct ?? null,
        total: total
      }

    },

    computedMostValuableToday() {
      const self = this;

      //const richestAlive = [...self.currentBillionaires.reduce((p, c) => p.netWorth > c.netWorth ? p : c)];

      let maxNetWorthAlive = 0;
      let richestAlive = {};
      let maxNetWorthDead = 0;
      let richestDead = {};
      let richestTotal = {};

      if (self.currentBillionaires && self.currentBillionaires.length > 0) {
        maxNetWorthAlive = Math.max(...self.currentBillionaires.map(({ netWorth }) => netWorth));
        richestAlive = self.currentBillionaires.find(({ netWorth }) => netWorth === maxNetWorthAlive);
      }

      if (self.formerBillionaires && self.formerBillionaires.length > 0) {
        maxNetWorthDead = Math.max(...self.formerBillionaires.map(({ netWorth }) => netWorth));
        richestDead = self.formerBillionaires.find(({ netWorth }) => netWorth === maxNetWorthDead);
      }
      
      if (maxNetWorthAlive && maxNetWorthDead) {
        if (maxNetWorthDead >= maxNetWorthAlive) {
          richestTotal = richestDead;
        } else if (maxNetWorthAlive >= maxNetWorthDead) {
          richestTotal = richestAlive;
        }
      }
      
      return {
        richestAlive: richestAlive,
        richestDead: richestDead,
        richestTotal: richestTotal
      }

    },

    computedMostValuableAllTime() {
      const self = this;
      let richestPerson = {};
      if (self.history.trophies) {
        maxNetWorth = Math.max(...self.history.trophies.map(({ netWorth }) => netWorth));
        richestPerson = self.history.trophies.find(({ netWorth }) => netWorth === maxNetWorth);
      }
      return richestPerson = richestPerson;
    },

    computedToday() {
      const self = this;
      const theDay = Number(moment().format('D'));
      let daySuffix;
      switch (theDay) {
        case 1 || 21 || 31:
          daySuffix = "st";
          break
        case 2 || 22:
          daySuffix = "nd"
          break
        case 3 || 23:
          daySuffix = "rd"
          break
        default:
          daySuffix = "th"
          break
      }
      return `${moment().format('dddd, MMMM D')}<sup>${daySuffix}</sup>`;
    },

    computedDidYouAlreadyPlayToday() {
      const self = this;
      const today = new Date();
      if (!self.history || !self.history.lastPlay) {
        return false;
      } else if (self.formatDate(self.history.lastPlay) == self.formatDate(today)) {
        return true;
      } else {
        return false;
      }

    }

  },

  mounted: function() {
    const self = this;

    const urlParams = new URLSearchParams(window.location.search);
    self.loadInitialGameState();
    if (urlParams.has('playDate') && urlParams.has('weathCreatedToday') && urlParams.has('hash')) {
      //const playDate = self.formatDate(urlParams.get('firstPlay'))
      const stamp = Number(urlParams.get('playDate'));
      
      self.comparativeData.currentSchool = randomFrom(schoolData);
      self.ui.currentState = self.comparativeData.currentSchool.state;

      
      const today = new Date()
      const mm = self.padNumber(today.getDate() + 1,2);
      const dd = self.padNumber(today.getDate().toString(),2);
      const mmdd = String(mm+dd);

      self.ui.shareScreen.playDate = new Date(stamp);
      self.ui.shareScreen.wealthCreatedToday = Number(urlParams.get('weathCreatedToday'));
      
      if (urlParams.get('playerName')) {
        self.ui.shareScreen.playerName = urlParams.get('playerName');
      }
      const urlHash = Number(urlParams.get('hash'));

      const cheapHash = self.generateCheapHash(self.ui.shareScreen.playDate, self.ui.shareScreen.wealthCreatedToday);

      if (cheapHash == urlHash) {
        self.ui.shareScreen.display = true;
        sendEvent("NO MORE BILLIONAIRES", "Share Loaded", self.ui.shareScreen.wealthCreatedToday);
      } else {
        console.warn("Hash check failed. I suspect you're trying to cheat.")
        sendEvent("NO MORE BILLIONAIRES", "Cheater Flagged", self.ui.shareScreen.wealthCreatedToday);
        alert('please do not try to cheat, that makes it less fun.')
        window.history.replaceState({}, "new game", window.location.origin);
      }
      
    }
    
  }

});
