export function parseFlag(country) {
  if (!country) return "flagMissing";
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
      return "nz";
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
    case "Saudi Arabia":
      return "sa";
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
    case "Luxembourg":
      return "lu";
    case "Slovenia":
      return "si";
    case "Latvia":
      return "lv";
    case "Lithuania":
      return "lt";
    case "Croatia":
      return "hr";
    case "Serbia":
      return "rs";
    case "Moldova":
      return "md";
    case "Belarus":
      return "by";
    case "Azerbaijan":
      return "az";
    case "Armenia":
      return "am";
    case "Kyrgyzstan":
      return "kg";
    case "Uzbekistan":
      return "uz";
    case "Tajikistan":
      return "tj";
    case "Turkmenistan":
      return "tm";
    case "Afghanistan":
      return "af";
    case "Pakistan":
      return "pk";
    case "Bangladesh":
      return "bd";
    case "Sri Lanka":
      return "lk";
    case "Myanmar":
      return "mm";
    case "Cambodia":
      return "kh";
    case "Laos":
      return "la";
    case "Mongolia":
      return "mn";
    case "North Korea":
      return "kp";
    case "Brunei":
      return "bn";
    case "Maldives":
      return "mv";
    case "Bhutan":
      return "bt";
    case "East Timor":
      return "tl";
    case "Fiji":
      return "fj";
    case "Papua New Guinea":
      return "pg";
    case "Solomon Islands":
      return "sb";
    case "Vanuatu":
      return "vu";
    case "Samoa":
      return "ws";
    case "Tonga":
      return "to";
    case "Kiribati":
      return "ki";
    case "Tuvalu":
      return "tv";
    case "Nauru":
      return "nr";
    case "Palau":
      return "pw";
    case "Marshall Islands":
      return "mh";
    case "Micronesia":
      return "fm";
    case "Panama":
      return "pa";
    default:
      return "flagMissing";
  }
}

export function parseBillions(str) {
  if (!str || str === "N/A") return 0;
  let cleaned = str.replace(/[$\s]/g, "");
  if (cleaned.includes("B")) return parseFloat(cleaned.replace("B", ""));
  if (cleaned.includes("M")) return parseFloat(cleaned.replace("M", "")) / 1000;
  if (cleaned.includes("K")) return parseFloat(cleaned.replace("K", "")) / 1000000;
  return parseFloat(cleaned) || 0;
}

export function parseName(name) {
  if (!name) return "";
  if (/& family/i.test(name)) return name.split("&")[0].trim();
  return name.trim();
}

export function parseSource(name, source) {
  const parsedName = parseName(name);
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
    case "Robin Zeng":
      return "Contemporary Amperex";
    case "Rodolphe Saadé":
      return "CMA CGM";
    case "Jamie Dimon":
      return "JPMorgan Chase";
    case "François Pinault":
      return "Saint Laurent, Alexander McQueen, Gucci";
    case "Klaus-Michael Kühne":
      return "Kuehne + Nagel, Hapag-Lloyd";
    case "Ma Huateng":
      return "Tencent";
    case "Giovanni Ferrero":
      return "Ferrero, Nutella, Kinder, Tic Tac";
    case "Li Ka-shing":
      return "Cheung Kong Plastics";
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
    case "Guillaume Pousaz":
      return "Checkout.com";
    case "Jack Ma":
    case "Joseph Tsai":
      return "Alibaba";
    case "Dan Gilbert":
      return "Quicken Loans";
    case "Masayoshi Son":
      return "SoftBank";
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
    case "Kanye West":
      return "Adidas, Skims";
    case "Fritz Draexlmaier":
      return "Draxlmaier Automotive";
    case "Jean-Pierre Cayard":
      return "La Martiniquaise";
    case "Peter Woo":
      return "Wheelock & Co.";
    case "Robert Pera":
      return "Ubiquiti";
    case "Aliko Dangote":
      return "Dangote Cement";
    case "Alexey Mordashov":
      return "Severstal";
    case "Zhang Zhidong":
      return "Tencent";
    case "Charles Schwab":
      return "Charles Schwab";
    case "Stefano Pessina":
      return "Walgreens Boots";
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
    case "Hui Ka Yan":
      return "Evergrande Group";
    case "Charlie Ergen":
      return "Dish Network";
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
    case "John Menard, Jr.":
      return "Menards";
    case "Hank & Doug Meijer":
      return "Meijer";
    case "Wei Jianjun":
      return "Great Wall Motor";
    case "Li Zhenguo":
      return "LONGi Green Energy";
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
      return "Vegas Golden Knights";
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
      return "pornography";
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
    case "Drew Houston":
      return "Dropbox";
    case "John Collison":
      return "Stripe";
    case "Patrick Collison":
      return "Stripe";
    case "Palmer Luckey":
      return "Oculus";
    case "Gabe Newell":
      return "Valve";
    case "David Baszucki":
      return "Roblox";
    case "Markus Persson":
      return "Minecraft";
    case "Giorgio Armani":
      return "Armani";
    case "Andrew Cherng":
      return "Panda Express";
    case "Peggy Cherng":
      return "Panda Express";
    case "Wang Chuanfu":
      return "BYD";
    case "Mike Cannon-Brookes":
    case "Scott Farquhar":
      return "Atlassian";
    case "Jensen Huang":
      return "NVIDIA";
    case "Lisa Su":
      return "AMD";
    case "Tony Xu":
      return "DoorDash";
    case "Ben Silbermann":
    case "Victor Pinchuk":
      return "Pinterest";
    case "Vikram Lal":
      return "Royal Enfield motorbikes";
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
    case "Rupert Murdoch":
    case "Lachlan Murdoch":
    case "James Murdoch":
      return "Fox News";
    case "Johann Rupert":
    case "Anton Rupert":
      return "Richemont";
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
    case "James Packer":
      return "Crown Resorts";
    case "Lynda Resnick":
      return "The Wonderful Company";
    case "Maurizio Billi":
      return "Eurofarma";
    case "Nguyen Thi Phuong Thao":
      return "VietJet Air";
    case "Laurent Dassault":
    case "Thierry Dassault":
    case "Marie-Hélène Habert-Dassault":
    case "Helena Dassault":
    case "Remi Dassault":
      return "Dassault aerospace & software";
    case "Benjamin Otto":
    case "Maren Otto":
    case "Katharina Otto-Bernstein":
    case "Michael Otto":
    case "Alexander Otto":
      return "Otto Group, Crate & Barrel";
    case "Leonardo Del Vecchio":
    case "Clemente Del Vecchio":
    case "Claudio Del Vecchio":
    case "Leonardo Maria Del Vecchio":
    case "Luca Del Vecchio":
    case "Marisa Del Vecchio":
    case "Paola Del Vecchio":
      return "Luxottica";
    case "Lei Jun":
      return "Xiaomi";
    case "Zhang Yiming":
      return "ByteDance (TikTok)";
    case "":
      return "";
  }

  return source;
}

export function parseIndustry(industry, source, name) {
  if (industry !== "Finance & Investments") return industry;
  if (!source) return industry;
  let s = parseSource(name, source).toLowerCase();
  if (/blackstone|kkr|carlyle|apollo|hellman & friedman|thoma bravo|silver lake|brookfield|private equit/.test(s)) return "Private Equity";
  if (/bridgewater|renaissance|citadel|two sigma|millennium|d.e. shaw|man group|hedge fun/.test(s)) return "Hedge Funds";
  if (
    /jpmorgan|goldman sachs|morgan stanley|bank of america|wells fargo|ubs|credit suisse|deutsche bank|barclays|hsbc|santander|societe generale|bnp paribas|banking/.test(
      s,
    )
  )
    return "Banking";
  if (/axa|ping an|allianz|metlife|prudential|aig|china life|manulife|generali|zurich|insuranc/.test(s)) return "Insurance";
  if (/sequoia|andreessen horowitz|accel|benchmark|greylock|founders fund|softbank vision fund|index ventures|venture capital/.test(s))
    return "Venture Capital";
  return industry;
}

export function parseIndustryIcon(industry) {
  industry = industry.trim();

  if (!industry) {
    return false;
  }

  // Check for string matches first (more flexible)
  if (industry.includes("Energy")) {
    return "power-plant";
  } else if (industry.includes("Transportation") || industry.includes("Logistics")) {
    return "trucking";
  }

  // Then check for exact matches
  switch (industry) {
    case "Automotive":
      return "automotive";
    case "Finance & Investments":
    case "Food & Beverage":
      return "hamburger";
    case "Real Estate":
      return "house";
    case "Real Estate & Construction":
      return "house";
    case "Technology":
      return "technology";
    case "Manufacturing":
      return "factory";
    case "Media & Entertainment":
      return "television";
    case "Fashion & Retail":
      return "shopping-bag";
    case "Healthcare":
      return "healthcare";
    case "Healthcare & Pharmaceuticals":
      return "healthcare";
    case "Telecom":
      return "digital-station";
    case "Metals & Mining":
      return "mining";
    case "Service":
      return "waiter";
    case "Diversified":
      return "pie-chart";
    case "Gambling & Casinos":
      return "slot-machine";
    case "Sports & Gaming":
      return "slot-machine";
    case "Sports":
      return "football";
    case "Construction & Engineering":
      return "construction";
    case "The Aristocracy":
      return "crown";

    // Finance Sub-industries
    case "Private Equity":
      return "equity";
    case "Hedge Funds":
      return "muliline-graph";
    case "Banking":
      return "banking";
    case "Insurance":
      return "insurance";
    case "Venture Capital":
      return "venture-capital";
  }

  return false;
}
