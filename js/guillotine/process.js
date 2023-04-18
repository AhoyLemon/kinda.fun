//@prepros-prepend globals/_functions.js
//@prepros-append partials/_variables.js
//@prepros-prepend data/_forbes-export.js

var app = new Vue({
  el: '#app',
  data: {
    allBillionaires: forbesList
  },

  methods: {

    // Actions

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

    parseAsshole(o) {
      const self = this;
      let output = {
        rank: parseInt(o.rank),
        name: o.name.trim(),
        netWorth: Number(self.parseBillions(o.netWorth)),
        //age: Number(o.age ?? null),
        country: o.country.trim(),
        flag: self.parseFlag(o.country),
        source: this.parseSource(o.name,o.source),
        industry: o.industry.trim()
      }
      return output;
    },

    parseBillions(str) {
      let output = str.trim();
      output = output.replace('$','').replace(' ','').replace('B','');
      return output;
    },

    parseName(name) {
      if (name && name.includes('& family')) {
        name = name.split('&')[0]
      }
      return name.trim();
    },

    parseSource(name, source) {
      const self = this;
      const parsedName = this.parseName(name)
      source = source.trim();
      let company;

      if (!name) {
        return source;
      }
      switch (parsedName) {
        case "Larry Ellison":
          return "Oracle"
        case "Mukesh Ambani":
          return "Reliance Industries"
        case "Gautam Adani":
          return "Adani Group"
        case "Zhong Shanshan":
          return "Nongfu Spring"
        case "Changpeng Zhao":
          return "Binance"
        case "David Thompson":
          return "Thompson Reuters"
        case "Dieter Schwarz":
          return "Kaufland & Lidl"
        case "Robin Zeng":
          return "Contemporary Amperex"
        case "Rodolphe Saadé":
          return "CMA CGM"
        case "François Pinault":
          return "Saint Laurent, Alexander McQueen, Gucci"
        case "Klaus-Michael Kühne":
          return "Kuehne + Nagel, Hapag-Lloyd, "
        case "Ma Huateng":
          return "Tencent"
        case "Giovanni Ferrero":
          return "Ferrero, Nutella, Kinder, Tic Tac"
        case "Li Ka-shing":
          return "Cheung Kong Plastics, CK Asset Holdings"
        case "Stephen Schwarzman":
          return "Blackstone Group"
        case "Lee Shau Kee":
          return "Henderson Land Development"
        case "Len Blavatnik":
          return "Warner Music, Russian Oil"
        case "Gina Rinehart":
          return "Hancock Prospecting, Roy Hill Mining"
        case "Shiv Nadar":
          return "HCL"
        case "He Xiangjian":
          return "Midea Group"
        case "William Lei Ding":
          return "NetEase"
        case "Susanne Klatten" || "Stefan Quandt":
          return "BMW"
        case "Cyrus Poonawalla":
          return "Serum Institute of India"
        case "Wang Wei":
          return "SF Express"
        case "Sam Bankman-Fried":
          return "FTX Exchange"
        case "Li Shufu":
          return "Geely Automobile Holdings"
        case "Emmanuel Besnier" || "Jean-Michel Besnier" || "Marie Besnier Beauvalot":
          return "Lactalis"
        case "Leonard Lauder":
          return "Estée Lauder"
        case "Guillaume Pousaz":
          return "Checkout.com"
        case "Jack Ma" || "Joseph Tsai":
          return "Alibaba"
        case "Dan Gilbert":
          return "Quicken Loans"
        case "Masayoshi Son":
          return "SoftBank"
        case "Abigail Johnson":
          return "Fidelity Investments"
        case "Jensen Huang":
          return "Nvidia"
        case "Huang Shilin":
          return "Contemporary Amperex Technology"
        case "Thomas Peterffy":
          return "Interactive Brokers"
        case "Radhakishan Damani":
          return "Avenue Supermarts"
        case "Andrew Forrest":
          return "Anaconda Nickel"
        case "Pavel Durov":
          return "Telegram"
        case "Scott Farquhar":
          return "Atlassian"
        case "Kanye West":
          return "Adidas, Skims"
        case "Fritz Draexlmaier":
          return "Draxlmaier Automotive"
        case "Jean-Pierre Cayard":
          return "La Martiniquaise"
        case "Peter Woo":
          return "Wheelock & Co."
        case "James Ratcliffe":
          return "Ineos Group"
        case "Mike Cannon-Brookes" || "Scott Farquhar":
          return "Atlassian"
        case "Robert Pera":
          return "Ubiquiti"
        case "Donald Newhouse":
          return "Condé Nast"
        case "Aliko Dangote":
          return "Dangote Cement"
        case "Alexey Mordashov":
          return "Severstal"
        case "David Duffield":
          return "PeopleSoft, Workday"
        case "Zhang Zhidong":
          return "Tencent"
        case "Charles Schwab":
          return "Charles Schwab"
        case "Stefano Pessina":
          return "Walgreens Boots"
        case "Marcel Hermann Telles" || "Jorge Paulo Lemann":
          return "Anheuser-Busch InBev"
        case "David Geffen":
          return "Geffen Records, DreamWorks"
        case "Brian Armstrong":
          return "Coinbase"
        case "Andrew Beal":
          return "Beal Financial Corporation"
        case "George Kaiser":
          return "Kaiser-Francis Oil Company"
        case "Qi Shi":
          return "East Money Information"
        case "Azim Premji":
          return "Wipro"
        case "Tom & Judy Love":
          return "Love's Travel Stops"
        case "Finn Rausing" || "Jorn Rausing" || "Kirsten Rausing":
          return "TetraLaval Packaging"
        case "John Collision" || "Patrick Collision":
          return "Stripe"
        case "James Dyson":
          return "Dyson"
        case "Kim Beom-su":
          return "Kakao"
        case "Johann Rupert":
          return "Compagnie Financiere Richemont"
        case "Hui Ka Yan":
          return "Evergrande Group"
        case "Charlie Ergen":
          return "Dish Network"
        case "Nicky Oppenheimer":
          return "DeBeers"
        case "Ernest Garcia, II.":
          return "Carvana"
        case "Tamara Gustavson":
          return "Public Storage"
        case "Carlos Alberto Sicupira":
          return "Anheuser-Busch InBev"
        case "Anthony von Mandl":
          return "White Claw, Mike's Hard Lemonade"
        case "Marc Benioff":
          return "Salesforce"
        case "Dmitri Bukhman" || "Igor Bukhman":
          return "Playrix"
        case "Francis Choi ":
          return "Early Light International"
        case "Murali Divi":
          return "Divi's Laboratories"
        case "Stewart & Lynda Resnick":
          return "Fiji Water, POM Wonderful"
        case "Michael Rubin":
          return "Fanatics"
        case "Jacqueline Mars" || "John Mars" || "Marijke Mars" || "Pamela Mars" || "Valerie Mars" || "Victoria Mars":
          return "Mars Candy & Pet Food"
        case "Tsai Eng-meng":
          return "Want Want China"
        case "Ashwin Dani":
          return "Asian Paints"
        case "Tim Sweeney":
          return "Epic Games"
        case "David Green":
          return "Hobby Lobby"
        case "Judy Faulkner":
          return "Epic"
        case "Robin Li ":
          return "Baidu"
        case "Ralph Lauren":
          return "Ralph Lauren"
        case "Cliff Obrecht" || "Melanie Perkins":
          return "Canva"
        case "Bernard Arnault":
          return "Louis Vuitton Moët & Chandon"
        case "Carlos Slim":
          return "América Móvil"
        case "German Larrea Mota Velasco":
          return "Grupo México"
        case "Miriam Adelson":
          return "Las Vegas Sands"
        case "Leonardo Del Vecchio":
          return "Luxottica"
        case "Tadashi Yanai":
          return "Uniqlo, Theory, Helmut Lang";
        case "Rupert Murdoch":
          return "Fox News, Wall Street Journal, Times of London";
        case "John Menard, Jr.":
          return "Menards"
        case "Hank & Doug Meijer":
          return "Meijer"
        case "Wei Jianjun":
          return "Great Wall Motor"
        case "Li Zhenguo":
          return "LONGi Green Energy"
        case "Andreas Struengmann" || "Thomas Struengmann ":
          return ""
        case "Dan Kurzius":
          return " MailChimp"
        case "Nari Genomal":
          return " Jockey"
        case "":
          return ""
      }  

      return source;
      
    },

    parseFlag(country) {
      switch (country.trim()) {
        case "United States":
          return "us"
        case "France":
          return "fr"
        case "India":
          return "in"
        case "Mexico":
          return "mx"
        case "China":
          return "cn"
        case "Canada":
          return "ca"
        case "Spain":
          return "es"
        case "Germany":
          return "de"
        case "Hong Kong":
          return "hk"
        case "Italy":
          return "it"
        case "Australia":
          return "au"
        case "Austria":
          return "at"
        case "Japan":
          return "jp"
        case "Indonesia":
          return "id"
        case "Switzerland":
          return "ch"
        case "Chile":
          return "cl"
        case "Russia":
          return "ru"
        case "Singapore":
          return "sg"
        case "Sweden":
          return "se"
        case "Israel":
          return "il"
        case "Brazil":
          return "br"
        case "Netherlands":
          return "nl"
        case "Philippines":
          return "ph"
        case "Turkey":
          return "tr"
        case "Ireland":
          return "ie"
        case "Nigeria":
          return "ng"
        case "Thailand":
          return "th"
        case "Denmark":
          return "dk"
        case "Cyprus":
          return "cy"
        case "Malaysia":
          return "my"
        case "Taiwan":
          return "tw"
        case "Monaco":
          return "mc"
        case "Colombia":
          return "co"
        case "New Zealand":
          return "co"
        case "South Korea":
          return "kr"
        case "Belgium":
          return "be"
        case "South Africa":
          return "za"
        case "Egypt":
          return "eg"
        case "Greece":
          return "gr"
        case "Norway":
          return "no"
        case "Vietnam":
          return "vn"
        case "Poland":
          return "pl"
        case "Peru":
          return "pe"
        case "Algeria":
          return "dz"
        case "Kazakhstan":
          return "kz"
        case "Georgia":
          return "ge"
        case "Portugal":
          return "pt"
        case "Finland":
          return "fi"
        case "Ukraine":
          return "ua"
        case "Argentina":
          return "ar"
        case "Belize":
          return "bz"
        case "Venezuela":
          return "ve"
        case "Lebanon":
          return "lb"
        case "Zimbabwe":
          return "zw"
        case "Romania":
          return "ro"
        case "United Arab Emirates":
          return "ae"
        case "Oman":
          return "om"
        case "Iceland":
          return "is"
        case "Guernsey":
          return "gg"
        case "Liechtenstein":
          return "li"
        case "Qatar":
          return "qa"
        case "Morocco":
          return "ma"
        case "Bulgaria":
          return "bg"
        case "Macau":
          return "mo"
        case "Slovakia":
          return "sk"
        case "Barbados":
          return "bb"
        case "Uruguay":
          return "uy"
        case "Nepal":
          return "np"
        case "Hungary":
          return "hu"
        case "Tanzania":
          return "tz"
        case "Estonia":
          return "ee"
        case "St. Kitts and Nevis":
          return "kn"
        case "Eswatini (Swaziland)":
          return "sz"
        case "Czechia" || "Czech Republic":
          return "cz"
        case "United Kingdom" || "Great Britain":
          return "gb"
        default:
          return "flagMissing"
      }
    }

  },

  computed: {

  },

  mounted: function() {
    setTimeout(() => {
      document.querySelectorAll('.hljs').forEach(el => {
        // then highlight each
        hljs.highlightElement(el);
      });
    }, "600");
    
    
  }

});
