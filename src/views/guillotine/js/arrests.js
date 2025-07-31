//@prepros-prepend globals/_functions.js
//@prepros-append partials/_variables.js
//@prepros-prepend data/_billionaires.js

var app = new Vue({
  el: '#app',
  data: function() {
return {
    dailyArrests: 20,
    allBillionaires: allBillionaires,
    billionaireCount: allBillionaires.length,
    yesterdaysArrests: [],
    arrestWarrants: []
  };
},

  methods: {

    arrestAllBillionaires() {
      const self = this;
      let z = 0;
      while (z < 365) {
        const mmdd = moment('2023-01-01').add(z,'days').format('MMDD');


        const arrestsToday = self.arrestDailyBillionaires();
        let o = { date: mmdd, arrests: arrestsToday };

        // Overwrite the list if it is Charles Day
        if (mmdd == '0506') {
          o = { date: mmdd, arrests: [ 2600, 2592, 2543, 2215, 2248, 2240, 2148, 2099, 2045, 2021, 1800, 1761, 1738, 1656, 1584, 1549, 1514, 2368, 1466, 1444], specialDay: "King Charles III Coronation" }
        }
        self.arrestWarrants.push(o);
        self.yesterdaysArrests = [...arrestsToday];
        z++;
      }
    },

    arrestDailyBillionaires() {
      const self = this;
      
      let arrestCount = 0;
      let todaysArrests = [];
      while (arrestCount < self.dailyArrests) {

        const r = Math.floor(Math.random()*(self.allBillionaires.length));
        //const currentArrest = self.allBillionaires[r]

        // Okay, let's test this arrest..
        let failedTests = false;
        if ( todaysArrests.includes(r)) {
          // FAILURE: You already arrested this billionaire.
          failedTests = true;
        } else if (self.yesterdaysArrests.includes(r)) {
          // FAILURE: You arrested this billionaire yesterday.
          // You need to wait at least 2 days before you can arrest this billionaire again.
          failedTests = true;
        } else if (todaysArrests && todaysArrests.length > 0) {
          for (i in todaysArrests) {
            if (self.allBillionaires[r].netWorth == i.netWorth) {
              // FAILURE: We already arrested a billionaire with this amount of net worth today.
              failedTests = true
            }
          }
        }

        // Okay, arrest this billionaire if the tests didn't fail.
        if (!failedTests) {
          todaysArrests.push(r);
          arrestCount++;
        }


        // function randomFrom(array) {
        //   return array[Math.floor(Math.random()*(array.length))];
        // }


        // self.arrestWarrants.push(randomFrom(self.allBillionaires));
        
      }
      return todaysArrests;
    },

    selectCode() {
      if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById('CodeBlock'));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      } else {
        alert('broken');
      }
    },

  },

  computed: {

  },

  mounted: function() {
    const self = this;
    self.arrestAllBillionaires();

    setTimeout(() => {
      document.querySelectorAll('.hljs').forEach(el => {
        // then highlight each
        hljs.highlightElement(el);
      });
    }, "600");
    
  }

});
