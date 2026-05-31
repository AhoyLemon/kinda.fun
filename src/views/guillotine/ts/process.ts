//@prepros-prepend globals/_functions.js
//@prepros-append partials/_variables.js
//@prepros-prepend data/_forbes-export.ts

declare const Vue: any;
declare const forbesList: any[];
declare const hljs: { highlightElement: (el: Element) => void };

new Vue({
  el: "#app",
  data: function () {
    return {
      allBillionaires: forbesList,
    };
  },

  methods: {
    // Actions

    selectCode() {
      if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById("CodeBlock"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      } else {
        alert("broken");
      }
    },

    parseAsshole(o) {
      const self = this;
      const output: {
        rank: number;
        name: string | null;
        netWorth: number;
        country: string | null;
        flag: string;
        source: string;
        industry: string | null;
        manualAdd?: unknown;
        specialSource?: unknown;
      } = {
        rank: parseInt(o.rank),
        name: o.name.trim() ?? null,
        netWorth: Number(self.parseBillions(o.netWorth)),
        country: o.country.trim() ?? null,
        flag: self.parseFlag(o.country),
        source: this.parseSource(o.name, o.source),
        industry: o.industry.trim() ?? null,
      };

      if (o.manualAdd) {
        output.manualAdd = o.manualAdd;
      }
      if (o.specialSource) {
        output.specialSource = o.specialSource;
      }
      return output;
    },

    parseBillions(str) {
      let output = str.trim();
      output = output.replace("$", "").replace(" ", "").replace("B", "");
      return output;
    },

    parseName(name) {
      if (name && name.includes("& family")) {
        name = name.split("&")[0];
      }
      return name.trim();
    },

    parseSource(name, source) {
      const parsedName = this.parseName(name);
      source = source.trim();

      if (!name) {
        return source;
      }
      switch (parsedName) {
        case "Larry Ellison":
          return "Oracle";
        case "Mukesh Ambani":
          return "Reliance Industries";
        case "Gautam Adani":
          return "Adani Group";
        case "Zhong Shanshan":
          return "Nongfu Spring";
        case "Changpeng Zhao":
          return "Binance";
        case "David Thompson":
          return "Thompson Reuters";
        case "Dieter Schwarz":
          return "Kaufland & Lidl";
        case "Robin Zeng":
          return "Contemporary Amperex";
        case "Rodolphe Saadé":
          return "CMA CGM";
        case "François Pinault":
          return "Saint Laurent, Alexander McQueen, Gucci";
        case "Klaus-Michael Kühne":
          return "Kuehne + Nagel, Hapag-Lloyd, ";
        case "Ma Huateng":
          return "Tencent";
        case "Giovanni Ferrero":
          return "Ferrero, Nutella, Kinder, Tic Tac";
        case "Li Ka-shing":
          return "Cheung Kong Plastics, CK Asset Holdings";
        case "Stephen Schwarzman":
          return "Blackstone Group";
        case "Lee Shau Kee":
          return "Henderson Land Development";
        case "Len Blavatnik":
          return "Warner Music, Russian Oil";
        case "Gina Rinehart":
          return "Hancock Prospecting, Roy Hill Mining";
        case "Shiv Nadar":
          return "HCL";
        case "He Xiangjian":
          return "Midea Group";
        case "William Lei Ding":
          return "NetEase";
        case "Susanne Klatten":
        case "Stefan Quandt":
          return "BMW";
        case "Cyrus Poonawalla":
          return "Serum Institute of India";
        case "Wang Wei":
          return "SF Express";
        case "Sam Bankman-Fried":
          return "FTX Exchange";
        case "Li Shufu":
          return "Geely Automobile Holdings";
        case "Emmanuel Besnier":
        case "Jean-Michel Besnier":
        case "Marie Besnier Beauvalot":
          return "Lactalis";
        case "Leonard Lauder":
          return "Estée Lauder";
        case "Guillaume Pousaz":
          return "Checkout.com";
        case "Jack Ma":
        case "Joseph Tsai":
          return "Alibaba";
        case "Dan Gilbert":
          return "Quicken Loans";
        case "Masayoshi Son":
          return "SoftBank";
        case "Abigail Johnson":
          return "Fidelity Investments";
        case "Jensen Huang":
          return "Nvidia";
        case "Huang Shilin":
          return "Contemporary Amperex Technology";
        case "Thomas Peterffy":
          return "Interactive Brokers";
        case "Radhakishan Damani":
          return "Avenue Supermarts";
        case "Andrew Forrest":
          return "Anaconda Nickel";
        case "Pavel Durov":
          return "Telegram";
        case "Scott Farquhar":
          return "Atlassian";
        case "Kanye West":
          return "Adidas, Skims";
        case "Fritz Draexlmaier":
          return "Draxlmaier Automotive";
        case "Jean-Pierre Cayard":
          return "La Martiniquaise";
        case "Peter Woo":
          return "Wheelock & Co.";
        case "James Ratcliffe":
          return "Ineos Group";
        case "Mike Cannon-Brookes":
        case "Scott Farquhar":
          return "Atlassian";
        case "Robert Pera":
          return "Ubiquiti";
        case "Donald Newhouse":
          return "Condé Nast";
        case "Aliko Dangote":
          return "Dangote Cement";
        case "Alexey Mordashov":
          return "Severstal";
        case "David Duffield":
          return "PeopleSoft, Workday";
        case "Zhang Zhidong":
          return "Tencent";
        case "Charles Schwab":
          return "Charles Schwab";
        case "Stefano Pessina":
          return "Walgreens Boots";
        case "Marcel Hermann Telles":
        case "Jorge Paulo Lemann":
          return "Anheuser-Busch InBev";
        case "David Geffen":
          return "Geffen Records, DreamWorks";
        case "Brian Armstrong":
          return "Coinbase";
        case "Andrew Beal":
          return "Beal Financial Corporation";
        case "George Kaiser":
          return "Kaiser-Francis Oil Company";
        case "Qi Shi":
          return "East Money Information";
        case "Azim Premji":
          return "Wipro";
        case "Tom & Judy Love":
          return "Love's Travel Stops";
        case "Finn Rausing":
        case "Jorn Rausing":
        case "Kirsten Rausing":
          return "TetraLaval Packaging";
        case "John Collision":
        case "Patrick Collision":
          return "Stripe";
        case "James Dyson":
          return "Dyson";
        case "Kim Beom-su":
          return "Kakao";
        case "Johann Rupert":
          return "Compagnie Financiere Richemont";
        case "Hui Ka Yan":
          return "Evergrande Group";
        case "Charlie Ergen":
          return "Dish Network";
        case "Nicky Oppenheimer":
          return "DeBeers";
        case "Ernest Garcia, II.":
          return "Carvana";
        case "Tamara Gustavson":
          return "Public Storage";
        case "Anthony von Mandl":
          return "White Claw, Mike's Hard Lemonade";
        case "Marc Benioff":
          return "Salesforce";
        case "Dmitri Bukhman":
        case "Igor Bukhman":
          return "Playrix";
        case "Francis Choi ":
          return "Early Light International";
        case "Murali Divi":
          return "Divi's Laboratories";
        case "Stewart & Lynda Resnick":
          return "Fiji Water, POM Wonderful";
        case "Michael Rubin":
          return "Fanatics";
        case "Jacqueline Mars":
        case "John Mars":
        case "Marijke Mars":
        case "Pamela Mars":
        case "Valerie Mars":
        case "Victoria Mars":
          return "Mars Candy & Pet Food";
        case "Tsai Eng-meng":
          return "Want Want China";
        case "Ashwin Dani":
          return "Asian Paints";
        case "Tim Sweeney":
          return "Epic Games";
        case "David Green":
          return "Hobby Lobby";
        case "Judy Faulkner":
          return "Epic";
        case "Robin Li ":
          return "Baidu";
        case "Ralph Lauren":
          return "Ralph Lauren";
        case "Cliff Obrecht":
        case "Melanie Perkins":
          return "Canva";
        case "Bernard Arnault":
          return "Louis Vuitton Moët & Chandon";
        case "Carlos Slim":
          return "América Móvil";
        case "German Larrea Mota Velasco":
          return "Grupo México";
        case "Miriam Adelson":
          return "Las Vegas Sands";
        case "Leonardo Del Vecchio":
          return "Luxottica";
        case "Tadashi Yanai":
          return "Uniqlo, Theory, Helmut Lang";
        case "Rupert Murdoch":
          return "Fox News, Wall Street Journal, Times of London";
        case "John Menard, Jr.":
          return "Menards";
        case "Hank & Doug Meijer":
          return "Meijer";
        case "Wei Jianjun":
          return "Great Wall Motor";
        case "Li Zhenguo":
          return "LONGi Green Energy";
        case "Andreas Struengmann":
        case "Thomas Struengmann ":
          return "";
        case "Dan Kurzius":
          return " MailChimp";
        case "Nari Genomal":
          return "Jockey";
        case "Darwin Deason":
          return "Xerox";
        case "Betty Ang":
          return "Monde Nissin";
        case "Tony Ressler":
          return "private equity, Atlanta Hawks";
        case "Mat Ishbia":
        case "Justin Ishbia":
          return "mortgages, Phoenix Suns";
        case "Austin Russell":
          return "autonomous car sensors";
        case "William Foley, II.":
          return "financial services, Vegas Golden Knights";
        case "Murat Ulker":
          return "Godiva, Jaffa Cakes, private equity";
        case "Peter Sperling":
          return "University of Phoenix";
        case "Radha Vembu":
          return "Zoho";
        case "Wang Wenmo":
          return "Anta Sports";
        case "Peter Thiel":
          return "PayPal, Facebook, Stripe";
        case "Donald Sterling":
          return "real estate, LA Clippers";
        case "Andrey Andreev":
          return "Bumble, Badoo";
        case "Richard Desmond":
          return "pornography, celebrity magazines";
        case "Simon Nixon":
          return "Moneysupermarket.com";
        case "Peter Kelly":
          return "Softcat";
        case "Denise Coates":
          return "Bet365";
        case "Clive Calder":
          return "Zomba Group, Jive Records";
        case "Stewart Butterfield":
          return "Slack";
        case "David Xueling Li":
          return "YY.com";
        case "Jerry Ng":
          return "Bank Jago";
        case "Bill Haslam":
          return "Pilot Flying J";
        case "Venu Srinivasan":
          return "TVS Motor Company";
        case "Katharina Andresen":
          return "Ferd";
        case "Henri Beaufour":
          return "Ipsen";
        case "Yang Xuegang":
          return "coke and chemicals";
        case "Li Denghai":
          return "Shandong Denghai Seeds";
        case "B. Wayne Hughes, Jr.":
          return "Public Storage";
        case "Vladimir Potanin":
          return "Norilsk Nickel, Sochi Olymptics, friendship with Putin";
        case "Arthur Blank":
          return "Home Depot, Atlanta Falcons";
        case "Pyotr Aven":
          return "Alfa-Bank";
        case "Nobutada Saji":
          return "Suntory";
        case "James France":
          return "Nascar";
        case "Sam Bankman-Fried":
          return "(this list is from 2022 so this was his net worth before he was arrested)";
        case "Phil Ruffin":
          return "Treasure Island, Circus Circus, Trump International";
        case "Park Kwan-ho":
          return "WeMade Entertainment";
        case "Devin Finzer":
          return "OpenSea";
        case "Bob Muglia":
        case "Benoit Dageville":
          return "Snowflake";
        case "John Malone":
          return "AT&T Broadband";
        case "Eva Maria Braun-Luedicke":
          return "B. Braun Melsungen";
        case "Haim Saban":
          return "Mighty Morphin Power Rangers";
        case "Shaul Shani":
          return "Vivendi";
        case "Junjin Wang":
          return "Juneyao Airlines";
        case "German Khan":
        case "Mikhail Fridman":
        case "Alexei Kuzmichev":
          return "Alfa Group";
        case "Mikhail Lomtadze":
          return "Baring Vostock";
        case "M.A. Yusuff Ali":
          return "LuLu Group International";
        case "Giuseppe Crippa":
          return "Technoprobe";
        case "Melanie Perkins":
          return "Canva";
        case "Klaus-Michael Kühne":
          return "Kühne + Nagel Shipping";
        case "Gopikishan Damani":
          return "Avenue Supermart";
        case "Romesh T. Wadhwani":
          return "SymphonyAI";
        case "Miuccia Prada":
        case "Alberto Prada":
        case "Marina Prada":
          return "Prada";
        case "Jed McCaleb":
          return "Mt. Gox, Ripple";
        case "Sergey Dmitriev":
          return "JetBrains";
        case "Chen Xuahua":
          return "Zhejiang Huayou Cobalt";
        case "Tadashi Yanai":
          return "Uniqlo";
        case "Stephen Schwarzman":
          return "Blackstone";
        case "Dieter Schwarz":
          return "Lidl";
        case "Dilip Shanghvi":
          return "Sun Pharma";
        case "James Ratcliffe":
          return "INEOS";
        case "Melanie Perkins":
          return "Canva";
        case "Drew Houston":
          return "Dropbox";
        case "John Collison":
          return "Stripe";
        case "Patrick Collison":
          return "Stripe";
        case "Palmer Luckey":
          return "Oculus";
        case "Cliff Obrecht":
          return "Canva";
        case "Tim Sweeney":
          return "Epic Games";
        case "Gabe Newell":
          return "Valve";
        case "David Baszucki":
          return "Roblox";
        case "Markus Persson":
          return "Minecraft";
        case "Giorgio Armani":
          return "Armani";
        case "Miuccia Prada":
          return "Prada";
        case "Andrew Cherng":
          return "Panda Express";
        case "Peggy Cherng":
          return "Panda Express";
        case "Wang Chuanfu":
          return "BYD";
        case "Mike Cannon-Brookes":
          return "Atlassian";
        case "Scott Farquhar":
          return "Atlassian";
        case "Jensen Huang":
          return "NVIDIA";
        case "Marc Benioff":
          return "Salesforce";
        case "Stewart Butterfield":
          return "Slack";
        case "Lisa Su":
          return "AMD";
        case "Jack Ma":
          return "Alibaba";
        case "Tony Xu":
          return "DoorDash";
        case "Ben Silbermann":
          return "Pinterest";
        case "Vikram Lal":
          return "Royal Enfield motorbikes";
        case "Ben Silbermann":
          return "Pinterest";
        case "Victor Pinchuk":
          return "Pinterest";
        case "Robert Rowling":
          return "Omni Hotels";
        case "Karen Pritzker":
        case "Thomas Pritzker":
        case "Jean (Gigi) Pritzker":
        case "Anthony Pritzker":
        case "Penny Pritzker":
        case "J.B. Pritzker":
        case "Daniel Pritzker":
        case "John Pritzker":
        case "Jennifer Pritzker":
        case "Linda Pritzker":
        case "Matthew Pritzker":
        case "Nicholas Pritzker":
        case "Liesel Pritzker Simmons":
          return "Hyatt Hotels";
        case "Jim Walton":
        case "Alice Walton":
        case "Rob Walton":
        case "S. Robson Walton":
        case "Lukas Walton":
        case "Christy Walton":
        case "Ann Walton Kroenke":
        case "Nancy Walton Laurie":
          return "Walmart";
        case "Charles Koch":
        case "Julia Koch":
        case "Chase Koch":
        case "Elizabeth Koch":
          return "Koch Industries";
        case "Francoise Bettencourt Meyers":
        case "Jean-Victor Meyers":
        case "Nicolas Meyers":
          return "L'Oréal";
        case "Johanna Quandt":
        case "Susanne Klatten":
        case "Stefan Quandt":
          return "BMW";
        case "Edward Johnson IV":
        case "Elizabeth Johnson":
        case "Edward C. Johnson III":
        case "Abigail Johnson":
          return "Fidelity Investments";
        case "William Lauder":
        case "Ronald Lauder":
        case "Aerin Lauder":
        case "Leonard Lauder":
          return "Estée Lauder";
        case "William Randolph Hearst III":
        case "George Hearst":
        case "John Hearst":
          return "Hearst Magazines";
        case "Nicky Oppenheimer":
        case "Jonathan Oppenheimer":
          return "DeBeers";
        case "Axel Dumas":
        case "Pierre-Alexis Dumas":
          return "Hermès";
        case "Alain Wertheimer":
        case "Gerard Wertheimer":
          return "Chanel";
        case "Joseph Safra":
        case "Jacob Safra":
        case "Esther Safra":
          return "Safra Banking";
        case "Martijn Brenninkmeijer":
        case "Clemens Brenninkmeijer":
          return "C&A";
        case "David Thomson":
        case "Peter Thomson":
          return "Thomson Reuters";
        case "Theo Albrecht":
        case "Berthold Albrecht":
        case "Karl Albrecht":
          return "Aldi";
        case "André Hoffmann":
        case "Maja Oeri":
          return "Roche Pharmaceuticals";
        case "Richard Sackler":
        case "Jonathan Sackler":
        case "Mortimer Sackler":
          return "Purdue Pharma";
        case "Carlos Alberto Sicupira":
        case "Jorge Paulo Lemann":
        case "Marcel Hermann Telles":
          return "Anheuser-Busch InBev";
        case "Nadja Swarovski":
        case "Markus Langes-Swarovski":
          return "Swarovski";
        case "John Elkann":
        case "Ginevra Elkann":
        case "Lapo Elkann":
          return "Fiat";
        case "Piero Ferrari":
        case "Enzo Ferrari":
          return "Ferrari";
        case "Carrie Perrodo":
        case "Francois Perrodo":
          return "Perenco Oil & Gas";
        case "Gerard Mulliez":
        case "Olivier Mulliez":
          return "Auchan";
        case "Jay Y. Lee":
        case "Lee Kun-hee":
          return "Samsung";
        case "Raymond Kwok":
        case "Thomas Kwok":
        case "Walter Kwok":
          return "Sun Hung Kai Properties";
        case "Kumar Birla":
        case "Yash Birla":
          return "Aditya Birla Group";
        case "Mohammed bin Salman":
        case "Alwaleed bin Talal":
          return "Saudi Royal Family";
        case "Stefan Persson":
        case "Karl-Johan Persson":
          return "H&M";
        case "Leonardo Del Vecchio":
        case "Claudio Del Vecchio":
          return "Luxottica";
        case "Rupert Murdoch":
        case "Lachlan Murdoch":
        case "James Murdoch":
          return "Fox News";
        case "Johann Rupert":
        case "Anton Rupert":
          return "Richemont";
        case "Theo Albrecht":
        case "Karl Albrecht":
        case "Berthold Albrecht":
          return "Aldi";
        case "Miriam Adelson":
        case "Shelley Adelson":
          return "Las Vegas Sands";
        case "Andreas Struengmann":
        case "Thomas Struengmann":
          return "Hexal";
        case "Donald Newhouse":
        case "Steven Newhouse":
          return "Condé Nast";
        case "Tim Cook":
        case "Laurene Powell Jobs":
        case "Art Levinson":
          return "Apple";
        case "David Duffield":
        case "Aneel Bhusri":
          return "Workday";
        case "Giancarlo Devasini":
        case "JL van der Velde":
          return "Bitfinex";
        case "Vlad Tenev":
        case "Baiju Bhatt":
          return "Robinhood";
        case "":
          return "";
      }

      return source;
    },

    parseFlag(country) {
      switch (country.trim()) {
        case "United States":
          return "us";
        case "France":
          return "fr";
        case "India":
          return "in";
        case "Mexico":
          return "mx";
        case "China":
          return "cn";
        case "Canada":
          return "ca";
        case "Spain":
          return "es";
        case "Germany":
          return "de";
        case "Hong Kong":
          return "hk";
        case "Italy":
          return "it";
        case "Australia":
          return "au";
        case "Austria":
          return "at";
        case "Japan":
          return "jp";
        case "Indonesia":
          return "id";
        case "Switzerland":
          return "ch";
        case "Chile":
          return "cl";
        case "Russia":
          return "ru";
        case "Singapore":
          return "sg";
        case "Sweden":
          return "se";
        case "Israel":
          return "il";
        case "Brazil":
          return "br";
        case "Netherlands":
          return "nl";
        case "Philippines":
          return "ph";
        case "Turkey":
          return "tr";
        case "Ireland":
          return "ie";
        case "Nigeria":
          return "ng";
        case "Thailand":
          return "th";
        case "Denmark":
          return "dk";
        case "Cyprus":
          return "cy";
        case "Malaysia":
          return "my";
        case "Taiwan":
          return "tw";
        case "Monaco":
          return "mc";
        case "Colombia":
          return "co";
        case "New Zealand":
          return "co";
        case "South Korea":
          return "kr";
        case "Belgium":
          return "be";
        case "South Africa":
          return "za";
        case "Egypt":
          return "eg";
        case "Greece":
          return "gr";
        case "Norway":
          return "no";
        case "Vietnam":
          return "vn";
        case "Poland":
          return "pl";
        case "Peru":
          return "pe";
        case "Algeria":
          return "dz";
        case "Kazakhstan":
          return "kz";
        case "Georgia":
          return "ge";
        case "Portugal":
          return "pt";
        case "Finland":
          return "fi";
        case "Ukraine":
          return "ua";
        case "Argentina":
          return "ar";
        case "Belize":
          return "bz";
        case "Venezuela":
          return "ve";
        case "Lebanon":
          return "lb";
        case "Zimbabwe":
          return "zw";
        case "Romania":
          return "ro";
        case "United Arab Emirates":
          return "ae";
        case "Oman":
          return "om";
        case "Iceland":
          return "is";
        case "Guernsey":
          return "gg";
        case "Liechtenstein":
          return "li";
        case "Qatar":
          return "qa";
        case "Morocco":
          return "ma";
        case "Bulgaria":
          return "bg";
        case "Macau":
          return "mo";
        case "Slovakia":
          return "sk";
        case "Barbados":
          return "bb";
        case "Uruguay":
          return "uy";
        case "Nepal":
          return "np";
        case "Hungary":
          return "hu";
        case "Tanzania":
          return "tz";
        case "Estonia":
          return "ee";
        case "St. Kitts and Nevis":
          return "kn";
        case "Eswatini (Swaziland)":
          return "sz";
        case "Czechia":
        case "Czech Republic":
          return "cz";
        case "United Kingdom":
        case "Great Britain":
          return "gb";
        default:
          return "flagMissing";
      }
    },
  },

  computed: {},

  beforeMount() {
    console.log("!BEFORE MOUNT!");

    const self = this;
    const charles = {
      key: "2600",
      rank: "1341",
      name: "King Charles III",
      netWorth: "$2.293 B",
      age: "74",
      country: "United Kingdom",
      source: "jewels, paintings, horses, cars, stolen loot, total immunity from inheritance tax",
      industry: "The Aristocracy",
      manualAdd: true,
      specialSource: "https://www.theguardian.com/uk-news/ng-interactive/2023/apr/20/revealed-king-charless-private-fortune-estimated-at-almost-2bn",
    };
    console.log(self.allBillionaires.length);
    self.allBillionaires.push(charles);
    console.log(self.allBillionaires.length);
    // console.log(self.allBillionaires);

    // self.allBillionaires.push(charles);
    // self.allBillionaires.push(charles);

    // self.allBillionaires.push(charles);
    // self.allBillionaires.push(charles);
    // self.allBillionaires.push(charles);
    // self.allBillionaires.push(charles);
    // self.allBillionaires.push(charles);
  },

  mounted: function () {
    setTimeout(() => {
      document.querySelectorAll(".hljs").forEach((el) => {
        // then highlight each
        hljs.highlightElement(el);
      });
    }, 600);
  },
});
