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
      return "Kuehne + Nagel, Hapag-Lloyd, ";
    case "Ma Huateng":
      return "Tencent";
    case "Giovanni Ferrero":
      return "Ferrero, Nutella, Kinder, Tic Tac";
    case "Li Ka-shing":
      return "Cheung Kong Plastics";
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
    case "Susanne Klatten" || "Stefan Quandt":
      return "BMW";
    case "Cyrus Poonawalla":
      return "Serum Institute of India";
    case "Wang Wei":
      return "SF Express";
    case "Sam Bankman-Fried":
      return "FTX Exchange";
    case "Li Shufu":
      return "Geely Automobile Holdings";
    case "Emmanuel Besnier" || "Jean-Michel Besnier" || "Marie Besnier Beauvalot":
      return "Lactalis";
    case "Leonard Lauder":
      return "Estée Lauder";
    case "Guillaume Pousaz":
      return "Checkout.com";
    case "Jack Ma" || "Joseph Tsai":
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
    case "Mike Cannon-Brookes" || "Scott Farquhar":
      return "Atlassian";
    case "Robert Pera":
      return "Ubiquiti";
    case "Donald Newhouse":
      return "Condé Nast";
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
    case "Marcel Hermann Telles" || "Jorge Paulo Lemann":
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
    case "Finn Rausing" || "Jorn Rausing" || "Kirsten Rausing":
      return "TetraLaval Packaging";
    case "John Collision" || "Patrick Collision":
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
    case "Dmitri Bukhman" || "Igor Bukhman":
      return "Playrix";
    case "Francis Choi ":
      return "Early Light International";
    case "Murali Divi":
      return "Divi's Laboratories";
    case "Stewart & Lynda Resnick":
      return "Fiji Water, POM Wonderful";
    case "Michael Rubin":
      return "Fanatics";
    case "Jacqueline Mars" || "John Mars" || "Marijke Mars" || "Pamela Mars" || "Valerie Mars" || "Victoria Mars":
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
    case "Cliff Obrecht" || "Melanie Perkins":
      return "Canva";
    case "Bernard Arnault":
      return "Louis Vuitton Moët & Chandon";
    case "Carlos Slim":
      return "América Móvil";
    case "German Larrea Mota Velasco":
      return "Grupo México";
    case "Miriam Adelson":
      return "Las Vegas Sands";
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
    case "Andreas Struengmann" || "Thomas Struengmann ":
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
    case "Mat Ishbia" || "Justin Ishbia":
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
    case "Sam Bankman-Fried":
      return "(this list is from 2022 so this was his net worth before he was arrested)";
    case "Phil Ruffin":
      return "Treasure Island, Circus Circus, Trump International";
    case "Park Kwan-ho":
      return "WeMade Entertainment";
    case "Devin Finzer":
      return "OpenSea";
    case "Bob Muglia" || "Benoit Dageville":
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
    case "German Khan" || "Mikhail Fridman" || "Alexei Kuzmichev":
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
    case "Miuccia Prada" || "Alberto Prada" || "Marina Prada":
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
    case "Karen Pritzker" ||
      "Thomas Pritzker" ||
      "Jean (Gigi) Pritzker" ||
      "Anthony Pritzker" ||
      "Penny Pritzker" ||
      "J.B. Pritzker" ||
      "Daniel Pritzker" ||
      "John Pritzker" ||
      "Jennifer Pritzker" ||
      "Linda Pritzker" ||
      "Matthew Pritzker" ||
      "Nicholas Pritzker" ||
      "Liesel Pritzker Simmons":
      return "Hyatt Hotels";
    case "Jim Walton" ||
      "Alice Walton" ||
      "Rob Walton" ||
      "S. Robson Walton" ||
      "Lukas Walton" ||
      "Christy Walton" ||
      "Ann Walton Kroenke" ||
      "Nancy Walton Laurie":
      return "Walmart";
    case "Charles Koch" || "Julia Koch" || "Chase Koch" || "Elizabeth Koch":
      return "Koch Industries";
    case "Francoise Bettencourt Meyers" || "Jean-Victor Meyers" || "Nicolas Meyers":
      return "L'Oréal";
    case "Johanna Quandt" || "Susanne Klatten" || "Stefan Quandt":
      return "BMW";
    case "Edward Johnson IV" || "Elizabeth Johnson" || "Edward C. Johnson III" || "Abigail Johnson":
      return "Fidelity Investments";
    case "William Lauder" || "Ronald Lauder" || "Aerin Lauder" || "Leonard Lauder":
      return "Estée Lauder";
    case "William Randolph Hearst III" || "George Hearst" || "John Hearst":
      return "Hearst Magazines";
    case "Nicky Oppenheimer" || "Jonathan Oppenheimer":
      return "DeBeers";
    case "Axel Dumas" || "Pierre-Alexis Dumas":
      return "Hermès";
    case "Alain Wertheimer" || "Gerard Wertheimer":
      return "Chanel";
    case "Joseph Safra" || "Jacob Safra" || "Esther Safra":
      return "Safra Banking";
    case "Martijn Brenninkmeijer" || "Clemens Brenninkmeijer":
      return "C&A";
    case "David Thomson" || "Peter Thomson":
      return "Thomson Reuters";
    case "Theo Albrecht" || "Berthold Albrecht" || "Karl Albrecht":
      return "Aldi";
    case "André Hoffmann" || "Maja Oeri":
      return "Roche Pharmaceuticals";
    case "Richard Sackler" || "Jonathan Sackler" || "Mortimer Sackler":
      return "Purdue Pharma";
    case "Carlos Alberto Sicupira" || "Jorge Paulo Lemann" || "Marcel Hermann Telles":
      return "Anheuser-Busch InBev";
    case "Nadja Swarovski" || "Markus Langes-Swarovski":
      return "Swarovski";
    case "John Elkann" || "Ginevra Elkann" || "Lapo Elkann":
      return "Fiat";
    case "Piero Ferrari" || "Enzo Ferrari":
      return "Ferrari";
    case "Carrie Perrodo" || "Francois Perrodo":
      return "Perenco Oil & Gas";
    case "Gerard Mulliez" || "Olivier Mulliez":
      return "Auchan";
    case "Jay Y. Lee" || "Lee Kun-hee":
      return "Samsung";
    case "Raymond Kwok" || "Thomas Kwok" || "Walter Kwok":
      return "Sun Hung Kai Properties";
    case "Kumar Birla" || "Yash Birla":
      return "Aditya Birla Group";
    case "Mohammed bin Salman" || "Alwaleed bin Talal":
      return "Saudi Royal Family";
    case "Stefan Persson" || "Karl-Johan Persson":
      return "H&M";
    case "Rupert Murdoch" || "Lachlan Murdoch" || "James Murdoch":
      return "Fox News";
    case "Johann Rupert" || "Anton Rupert":
      return "Richemont";
    case "Theo Albrecht" || "Karl Albrecht" || "Berthold Albrecht":
      return "Aldi";
    case "Miriam Adelson" || "Shelley Adelson":
      return "Las Vegas Sands";
    case "Andreas Struengmann" || "Thomas Struengmann":
      return "Hexal";
    case "Donald Newhouse" || "Steven Newhouse":
      return "Condé Nast";
    case "Tim Cook" || "Laurene Powell Jobs" || "Art Levinson":
      return "Apple";
    case "David Duffield" || "Aneel Bhusri":
      return "Workday";
    case "Giancarlo Devasini" || "JL van der Velde":
      return "Bitfinex";
    case "Vlad Tenev" || "Baiju Bhatt":
      return "Robinhood";
    case "James Packer":
      return "Crown Resorts";
    case "Lynda Resnick":
      return "The Wonderful Company";
    case "Maurizio Billi":
      return "Eurofarma";
    case "Nguyen Thi Phuong Thao":
      return "VietJet Air";
    case "Laurent Dassault" || "Thierry Dassault" || "Marie-Hélène Habert-Dassault" || "Helena Dassault" || "Remi Dassault":
      return "Dassault aerospace & software";
    case "Benjamin Otto" || "Maren Otto" || "Katharina Otto-Bernstein" || "Michael Otto" || "Alexander Otto":
      return "Otto Group, Crate & Barrel";
    case "Leonardo Del Vecchio" ||
      "Clemente Del Vecchio" ||
      "Claudio Del Vecchio" ||
      "Leonardo Maria Del Vecchio" ||
      "Luca Del Vecchio" ||
      "Marisa Del Vecchio" ||
      "Paola Del Vecchio":
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
    case "Finance & Investments" || "Venture Capital":
      return "finance-investment";
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
