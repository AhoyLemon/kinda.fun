const forbesList = [
  {
    key: "0",
    rank: "1",
    name: "Elon Musk ",
    netWorth: "$219 B",
    age: "50",
    country: "United States",
    source: "Tesla, SpaceX",
    industry: "Automotive "
  },
  {
    key: "1",
    rank: "2",
    name: "Jeff Bezos ",
    netWorth: "$171 B",
    age: "58",
    country: "United States",
    source: "Amazon",
    industry: "Technology "
  },
  {
    key: "2",
    rank: "3",
    name: "Bernard Arnault & family ",
    netWorth: "$158 B",
    age: "73",
    country: "France",
    source: "LVMH",
    industry: "Fashion & Retail "
  },
  {
    key: "3",
    rank: "4",
    name: "Bill Gates ",
    netWorth: "$129 B",
    age: "66",
    country: "United States",
    source: "Microsoft",
    industry: "Technology "
  },
  {
    key: "4",
    rank: "5",
    name: "Warren Buffett ",
    netWorth: "$118 B",
    age: "91",
    country: "United States",
    source: "Berkshire Hathaway",
    industry: "Finance & Investments "
  },
  {
    key: "5",
    rank: "6",
    name: "Larry Page ",
    netWorth: "$111 B",
    age: "49",
    country: "United States",
    source: "Google",
    industry: "Technology "
  },
  {
    key: "6",
    rank: "7",
    name: "Sergey Brin ",
    netWorth: "$107 B",
    age: "48",
    country: "United States",
    source: "Google",
    industry: "Technology "
  },
  {
    key: "7",
    rank: "8",
    name: "Larry Ellison ",
    netWorth: "$106 B",
    age: "77",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "8",
    rank: "9",
    name: "Steve Ballmer ",
    netWorth: "$91.4 B",
    age: "66",
    country: "United States",
    source: "Microsoft",
    industry: "Technology "
  },
  {
    key: "9",
    rank: "10",
    name: "Mukesh Ambani ",
    netWorth: "$90.7 B",
    age: "64",
    country: "India",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "10",
    rank: "11",
    name: "Gautam Adani & family ",
    netWorth: "$90 B",
    age: "59",
    country: "India",
    source: "infrastructure, commodities",
    industry: "Diversified "
  },
  {
    key: "11",
    rank: "12",
    name: "Michael Bloomberg ",
    netWorth: "$82 B",
    age: "80",
    country: "United States",
    source: "Bloomberg LP",
    industry: "Media & Entertainment "
  },
  {
    key: "12",
    rank: "13",
    name: "Carlos Slim Helu & family ",
    netWorth: "$81.2 B",
    age: "82",
    country: "Mexico",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "13",
    rank: "14",
    name: "Francoise Bettencourt Meyers & family ",
    netWorth: "$74.8 B",
    age: "68",
    country: "France",
    source: "L'Oréal",
    industry: "Fashion & Retail "
  },
  {
    key: "14",
    rank: "15",
    name: "Mark Zuckerberg ",
    netWorth: "$67.3 B",
    age: "37",
    country: "United States",
    source: "Facebook",
    industry: "Technology "
  },
  {
    key: "15",
    rank: "16",
    name: "Jim Walton ",
    netWorth: "$66.2 B",
    age: "73",
    country: "United States",
    source: "Walmart",
    industry: "Fashion & Retail "
  },
  {
    key: "16",
    rank: "17",
    name: "Zhong Shanshan ",
    netWorth: "$65.7 B",
    age: "67",
    country: "China",
    source: "beverages, pharmaceuticals",
    industry: "Food & Beverage "
  },
  {
    key: "17",
    rank: "18",
    name: "Alice Walton ",
    netWorth: "$65.3 B",
    age: "72",
    country: "United States",
    source: "Walmart",
    industry: "Fashion & Retail "
  },
  {
    key: "18",
    rank: "19",
    name: "Rob Walton ",
    netWorth: "$65 B",
    age: "77",
    country: "United States",
    source: "Walmart",
    industry: "Fashion & Retail "
  },
  {
    key: "19",
    rank: "19",
    name: "Changpeng Zhao ",
    netWorth: "$65 B",
    age: "44",
    country: "Canada",
    source: "cryptocurrency exchange",
    industry: "Finance & Investments "
  },
  {
    key: "20",
    rank: "21",
    name: "Charles Koch ",
    netWorth: "$60 B",
    age: "86",
    country: "United States",
    source: "Koch Industries",
    industry: "Diversified "
  },
  {
    key: "21",
    rank: "21",
    name: "Julia Koch & family ",
    netWorth: "$60 B",
    age: "59",
    country: "United States",
    source: "Koch Industries",
    industry: "Diversified "
  },
  {
    key: "22",
    rank: "23",
    name: "Amancio Ortega ",
    netWorth: "$59.6 B",
    age: "86",
    country: "Spain",
    source: "Zara",
    industry: "Fashion & Retail "
  },
  {
    key: "23",
    rank: "24",
    name: "Michael Dell ",
    netWorth: "$55.1 B",
    age: "57",
    country: "United States",
    source: "Dell computers",
    industry: "Technology "
  },
  {
    key: "24",
    rank: "25",
    name: "Zhang Yiming ",
    netWorth: "$50 B",
    age: "38",
    country: "China",
    source: "TikTok",
    industry: "Media & Entertainment "
  },
  {
    key: "25",
    rank: "26",
    name: "David Thomson & family ",
    netWorth: "$49.2 B",
    age: "64",
    country: "Canada",
    source: "media",
    industry: "Media & Entertainment "
  },
  {
    key: "26",
    rank: "27",
    name: "Phil Knight & family ",
    netWorth: "$47.3 B",
    age: "84",
    country: "United States",
    source: "Nike",
    industry: "Fashion & Retail "
  },
  {
    key: "27",
    rank: "28",
    name: "Dieter Schwarz ",
    netWorth: "$47.1 B",
    age: "82",
    country: "Germany",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "28",
    rank: "29",
    name: "Robin Zeng ",
    netWorth: "$44.8 B",
    age: "53",
    country: "Hong Kong",
    source: "batteries",
    industry: "Automotive "
  },
  {
    key: "29",
    rank: "30",
    name: "MacKenzie Scott ",
    netWorth: "$43.6 B",
    age: "51",
    country: "United States",
    source: "Amazon",
    industry: "Technology "
  },
  {
    key: "30",
    rank: "31",
    name: "Rodolphe Saadé & family ",
    netWorth: "$41.4 B",
    age: "52",
    country: "France",
    source: "shipping",
    industry: "Logistics "
  },
  {
    key: "31",
    rank: "32",
    name: "François Pinault & family ",
    netWorth: "$40.4 B",
    age: "85",
    country: "France",
    source: "luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "32",
    rank: "33",
    name: "Klaus-Michael Kuehne ",
    netWorth: "$37.3 B",
    age: "84",
    country: "Germany",
    source: "shipping",
    industry: "Logistics "
  },
  {
    key: "33",
    rank: "34",
    name: "Ma Huateng ",
    netWorth: "$37.2 B",
    age: "50",
    country: "China",
    source: "internet media",
    industry: "Technology "
  },
  {
    key: "34",
    rank: "35",
    name: "Beate Heister & Karl Albrecht Jr. & family ",
    netWorth: "$36.8 B",
    age: "64",
    country: "Germany",
    source: "supermarkets",
    industry: "Fashion & Retail "
  },
  {
    key: "35",
    rank: "36",
    name: "Giovanni Ferrero ",
    netWorth: "$36.2 B",
    age: "57",
    country: "Italy",
    source: "Nutella, chocolates",
    industry: "Food & Beverage "
  },
  {
    key: "36",
    rank: "37",
    name: "Li Ka-shing ",
    netWorth: "$34.8 B",
    age: "93",
    country: "Hong Kong",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "37",
    rank: "37",
    name: "Stephen Schwarzman ",
    netWorth: "$34.8 B",
    age: "75",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "38",
    rank: "39",
    name: "Lee Shau Kee ",
    netWorth: "$32.6 B",
    age: "94",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "39",
    rank: "40",
    name: "Len Blavatnik ",
    netWorth: "$32.5 B",
    age: "64",
    country: "United States",
    source: "music, chemicals",
    industry: "Diversified "
  },
  {
    key: "40",
    rank: "41",
    name: "Jacqueline Mars ",
    netWorth: "$31.7 B",
    age: "82",
    country: "United States",
    source: "candy, pet food",
    industry: "Food & Beverage "
  },
  {
    key: "41",
    rank: "41",
    name: "John Mars ",
    netWorth: "$31.7 B",
    age: "86",
    country: "United States",
    source: "candy, pet food",
    industry: "Food & Beverage "
  },
  {
    key: "42",
    rank: "43",
    name: "Alain Wertheimer ",
    netWorth: "$31.2 B",
    age: "73",
    country: "France",
    source: "Chanel",
    industry: "Fashion & Retail "
  },
  {
    key: "43",
    rank: "43",
    name: "Gerard Wertheimer ",
    netWorth: "$31.2 B",
    age: "71",
    country: "France",
    source: "Chanel",
    industry: "Fashion & Retail "
  },
  {
    key: "44",
    rank: "45",
    name: "German Larrea Mota Velasco & family ",
    netWorth: "$30.8 B",
    age: "68",
    country: "Mexico",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "45",
    rank: "46",
    name: "Gina Rinehart ",
    netWorth: "$30.2 B",
    age: "68",
    country: "Australia",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "46",
    rank: "47",
    name: "Shiv Nadar ",
    netWorth: "$28.7 B",
    age: "76",
    country: "India",
    source: "software services",
    industry: "Technology "
  },
  {
    key: "47",
    rank: "48",
    name: "Jim Simons ",
    netWorth: "$28.6 B",
    age: "83",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "48",
    rank: "49",
    name: "He Xiangjian ",
    netWorth: "$28.3 B",
    age: "79",
    country: "China",
    source: "home appliances",
    industry: "Manufacturing "
  },
  {
    key: "49",
    rank: "50",
    name: "Miriam Adelson ",
    netWorth: "$27.5 B",
    age: "76",
    country: "United States",
    source: "casinos",
    industry: "Gambling & Casinos "
  },
  {
    key: "50",
    rank: "51",
    name: "Dietrich Mateschitz ",
    netWorth: "$27.4 B",
    age: "77",
    country: "Austria",
    source: "Red Bull",
    industry: "Food & Beverage "
  },
  {
    key: "51",
    rank: "52",
    name: "Leonardo Del Vecchio & family ",
    netWorth: "$27.3 B",
    age: "86",
    country: "Italy",
    source: "eyeglasses",
    industry: "Fashion & Retail "
  },
  {
    key: "52",
    rank: "53",
    name: "Ken Griffin ",
    netWorth: "$27.2 B",
    age: "53",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "53",
    rank: "54",
    name: "Tadashi Yanai & family ",
    netWorth: "$26.1 B",
    age: "73",
    country: "Japan",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "54",
    rank: "55",
    name: "William Lei Ding ",
    netWorth: "$25.2 B",
    age: "50",
    country: "China",
    source: "online games",
    industry: "Technology "
  },
  {
    key: "55",
    rank: "56",
    name: "Susanne Klatten ",
    netWorth: "$24.3 B",
    age: "59",
    country: "Germany",
    source: "BMW, pharmaceuticals",
    industry: "Automotive "
  },
  {
    key: "56",
    rank: "56",
    name: "Cyrus Poonawalla ",
    netWorth: "$24.3 B",
    age: "80",
    country: "India",
    source: "vaccines",
    industry: "Healthcare "
  },
  {
    key: "57",
    rank: "56",
    name: "Wang Wei ",
    netWorth: "$24.3 B",
    age: "51",
    country: "China",
    source: "package delivery",
    industry: "Service "
  },
  {
    key: "58",
    rank: "59",
    name: "Qin Yinglin ",
    netWorth: "$24.1 B",
    age: "56",
    country: "China",
    source: "pig breeding",
    industry: "Food & Beverage "
  },
  {
    key: "59",
    rank: "60",
    name: "Sam Bankman-Fried ",
    netWorth: "$24 B",
    age: "30",
    country: "United States",
    source: "cryptocurrency exchange",
    industry: "Finance & Investments "
  },
  {
    key: "60",
    rank: "61",
    name: "Takemitsu Takizaki ",
    netWorth: "$23.9 B",
    age: "76",
    country: "Japan",
    source: "sensors",
    industry: "Manufacturing "
  },
  {
    key: "61",
    rank: "62",
    name: "Li Shufu ",
    netWorth: "$23.7 B",
    age: "58",
    country: "China",
    source: "automobiles",
    industry: "Automotive "
  },
  {
    key: "62",
    rank: "63",
    name: "Emmanuel Besnier ",
    netWorth: "$23.5 B",
    age: "51",
    country: "France",
    source: "cheese",
    industry: "Food & Beverage "
  },
  {
    key: "63",
    rank: "64",
    name: "R. Budi Hartono ",
    netWorth: "$23.2 B",
    age: "81",
    country: "Indonesia",
    source: "banking, tobacco",
    industry: "Finance & Investments "
  },
  {
    key: "64",
    rank: "65",
    name: "Leonard Lauder ",
    netWorth: "$23.1 B",
    age: "89",
    country: "United States",
    source: "Estee Lauder",
    industry: "Fashion & Retail "
  },
  {
    key: "65",
    rank: "66",
    name: "Guillaume Pousaz ",
    netWorth: "$23 B",
    age: "40",
    country: "Switzerland",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "66",
    rank: "67",
    name: "Iris Fontbona & family ",
    netWorth: "$22.8 B",
    age: "79",
    country: "Chile",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "67",
    rank: "67",
    name: "Jack Ma ",
    netWorth: "$22.8 B",
    age: "57",
    country: "China",
    source: "e-commerce",
    industry: "Technology "
  },
  {
    key: "68",
    rank: "69",
    name: "Michael Hartono ",
    netWorth: "$22.3 B",
    age: "82",
    country: "Indonesia",
    source: "banking, tobacco",
    industry: "Manufacturing "
  },
  {
    key: "69",
    rank: "70",
    name: "Eric Schmidt ",
    netWorth: "$22.1 B",
    age: "66",
    country: "United States",
    source: "Google",
    industry: "Technology "
  },
  {
    key: "70",
    rank: "71",
    name: "Ray Dalio ",
    netWorth: "$22 B",
    age: "72",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "71",
    rank: "71",
    name: "Daniel Gilbert ",
    netWorth: "$22 B",
    age: "60",
    country: "United States",
    source: "Quicken Loans",
    industry: "Finance & Investments "
  },
  {
    key: "72",
    rank: "73",
    name: "Thomas Frist, Jr. & family ",
    netWorth: "$21.8 B",
    age: "83",
    country: "United States",
    source: "hospitals",
    industry: "Healthcare "
  },
  {
    key: "73",
    rank: "74",
    name: "Masayoshi Son ",
    netWorth: "$21.3 B",
    age: "64",
    country: "Japan",
    source: "internet, telecom",
    industry: "Telecom "
  },
  {
    key: "74",
    rank: "75",
    name: "Abigail Johnson ",
    netWorth: "$21.2 B",
    age: "60",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "75",
    rank: "76",
    name: "Rupert Murdoch & family ",
    netWorth: "$20.8 B",
    age: "91",
    country: "United States",
    source: "newspapers, TV network",
    industry: "Media & Entertainment "
  },
  {
    key: "76",
    rank: "77",
    name: "Stefan Quandt ",
    netWorth: "$20.7 B",
    age: "55",
    country: "Germany",
    source: "BMW",
    industry: "Automotive "
  },
  {
    key: "77",
    rank: "78",
    name: "Jensen Huang ",
    netWorth: "$20.6 B",
    age: "59",
    country: "United States",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "78",
    rank: "79",
    name: "Huang Shilin ",
    netWorth: "$20.3 B",
    age: "55",
    country: "China",
    source: "batteries",
    industry: "Automotive "
  },
  {
    key: "79",
    rank: "80",
    name: "Thomas Peterffy ",
    netWorth: "$20.1 B",
    age: "77",
    country: "United States",
    source: "discount brokerage",
    industry: "Finance & Investments "
  },
  {
    key: "80",
    rank: "81",
    name: "Radhakishan Damani ",
    netWorth: "$20 B",
    age: "67",
    country: "India",
    source: "retail, investments",
    industry: "Fashion & Retail "
  },
  {
    key: "81",
    rank: "82",
    name: "Pang Kang ",
    netWorth: "$19.6 B",
    age: "66",
    country: "China",
    source: "soy sauce",
    industry: "Food & Beverage "
  },
  {
    key: "82",
    rank: "83",
    name: "Wang Chuanfu ",
    netWorth: "$19.5 B",
    age: "56",
    country: "China",
    source: "batteries, automobiles",
    industry: "Automotive "
  },
  {
    key: "83",
    rank: "84",
    name: "Reinhold Wuerth & family ",
    netWorth: "$19 B",
    age: "86",
    country: "Germany",
    source: "fasteners",
    industry: "Manufacturing "
  },
  {
    key: "84",
    rank: "85",
    name: "Theo Albrecht, Jr. & family ",
    netWorth: "$18.7 B",
    age: "71",
    country: "Germany",
    source: "Aldi, Trader Joe's",
    industry: "Fashion & Retail "
  },
  {
    key: "85",
    rank: "85",
    name: "Yang Huiyan & family ",
    netWorth: "$18.7 B",
    age: "40",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "86",
    rank: "87",
    name: "Vladimir Lisin ",
    netWorth: "$18.4 B",
    age: "65",
    country: "Russia",
    source: "steel, transport",
    industry: "Metals & Mining "
  },
  {
    key: "87",
    rank: "88",
    name: "Fan Hongwei & family ",
    netWorth: "$18.2 B",
    age: "55",
    country: "China",
    source: "petrochemicals",
    industry: "Energy "
  },
  {
    key: "88",
    rank: "89",
    name: "Lakshmi Mittal ",
    netWorth: "$17.9 B",
    age: "71",
    country: "India",
    source: "steel",
    industry: "Metals & Mining "
  },
  {
    key: "89",
    rank: "90",
    name: "Andrew Forrest ",
    netWorth: "$17.8 B",
    age: "60",
    country: "Australia",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "90",
    rank: "91",
    name: "Jiang Rensheng & family ",
    netWorth: "$17.7 B",
    age: "68",
    country: "China",
    source: "vaccines",
    industry: "Healthcare "
  },
  {
    key: "91",
    rank: "91",
    name: "Savitri Jindal & family ",
    netWorth: "$17.7 B",
    age: "72",
    country: "India",
    source: "steel",
    industry: "Metals & Mining "
  },
  {
    key: "92",
    rank: "91",
    name: "Wang Wenyin ",
    netWorth: "$17.7 B",
    age: "54",
    country: "China",
    source: "mining, copper products",
    industry: "Metals & Mining "
  },
  {
    key: "93",
    rank: "94",
    name: "Li Xiting ",
    netWorth: "$17.6 B",
    age: "71",
    country: "Singapore",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "94",
    rank: "94",
    name: "Stefan Persson ",
    netWorth: "$17.6 B",
    age: "74",
    country: "Sweden",
    source: "H&M",
    industry: "Fashion & Retail "
  },
  {
    key: "95",
    rank: "96",
    name: "Steve Cohen ",
    netWorth: "$17.4 B",
    age: "65",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "96",
    rank: "97",
    name: "Vladimir Potanin ",
    netWorth: "$17.3 B",
    age: "61",
    country: "Russia",
    source: "metals",
    industry: "Metals & Mining "
  },
  {
    key: "97",
    rank: "98",
    name: "Harold Hamm & family ",
    netWorth: "$17.2 B",
    age: "76",
    country: "United States",
    source: "oil & gas",
    industry: "Energy "
  },
  {
    key: "98",
    rank: "99",
    name: "Sun Piaoyang ",
    netWorth: "$17.1 B",
    age: "63",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "99",
    rank: "100",
    name: "Luo Liguo & family ",
    netWorth: "$17 B",
    age: "66",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "100",
    rank: "100",
    name: "Peter Woo ",
    netWorth: "$17 B",
    age: "75",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "101",
    rank: "102",
    name: "Gianluigi & Rafaela Aponte ",
    netWorth: "$16.8 B",
    age: "81",
    country: "Switzerland",
    source: "Shipping",
    industry: "Logistics "
  },
  {
    key: "102",
    rank: "103",
    name: "David Tepper ",
    netWorth: "$16.7 B",
    age: "64",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "103",
    rank: "104",
    name: "Renata Kellnerova & family ",
    netWorth: "$16.6 B",
    age: "54",
    country: "Czechia",
    source: "finance, telecommunications",
    industry: "Finance & Investments "
  },
  {
    key: "104",
    rank: "104",
    name: "John Menard, Jr. ",
    netWorth: "$16.6 B",
    age: "82",
    country: "United States",
    source: "home improvement stores",
    industry: "Fashion & Retail "
  },
  {
    key: "105",
    rank: "106",
    name: "Kumar Birla ",
    netWorth: "$16.5 B",
    age: "54",
    country: "India",
    source: "commodities",
    industry: "Diversified "
  },
  {
    key: "106",
    rank: "106",
    name: "Carl Icahn ",
    netWorth: "$16.5 B",
    age: "86",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "107",
    rank: "106",
    name: "Hank & Doug Meijer ",
    netWorth: "$16.5 B",
    age: "64",
    country: "United States",
    source: "supermarkets",
    industry: "Fashion & Retail "
  },
  {
    key: "108",
    rank: "106",
    name: "Lukas Walton ",
    netWorth: "$16.5 B",
    age: "35",
    country: "United States",
    source: "Walmart",
    industry: "Fashion & Retail "
  },
  {
    key: "109",
    rank: "110",
    name: "Laurene Powell Jobs & family ",
    netWorth: "$16.4 B",
    age: "58",
    country: "United States",
    source: "Apple, Disney",
    industry: "Technology "
  },
  {
    key: "110",
    rank: "111",
    name: "James Ratcliffe ",
    netWorth: "$16.3 B",
    age: "69",
    country: "United Kingdom",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "111",
    rank: "112",
    name: "Donald Bren ",
    netWorth: "$16.2 B",
    age: "89",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "112",
    rank: "113",
    name: "Xu Hang ",
    netWorth: "$16.1 B",
    age: "55",
    country: "Hong Kong",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "113",
    rank: "114",
    name: "Lu Xiangyang ",
    netWorth: "$15.7 B",
    age: "59",
    country: "China",
    source: "automobiles, batteries",
    industry: "Automotive "
  },
  {
    key: "114",
    rank: "115",
    name: "Dilip Shanghvi ",
    netWorth: "$15.6 B",
    age: "66",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "115",
    rank: "116",
    name: "Wei Jianjun & family ",
    netWorth: "$15.5 B",
    age: "58",
    country: "China",
    source: "automobiles",
    industry: "Automotive "
  },
  {
    key: "116",
    rank: "117",
    name: "Jorge Paulo Lemann & family ",
    netWorth: "$15.4 B",
    age: "82",
    country: "Brazil",
    source: "beer",
    industry: "Food & Beverage "
  },
  {
    key: "117",
    rank: "117",
    name: "Eyal Ofer ",
    netWorth: "$15.4 B",
    age: "71",
    country: "Israel",
    source: "real estate, shipping",
    industry: "Diversified "
  },
  {
    key: "118",
    rank: "119",
    name: "Mike Cannon-Brookes ",
    netWorth: "$15.3 B",
    age: "42",
    country: "Australia",
    source: "software",
    industry: "Technology "
  },
  {
    key: "119",
    rank: "119",
    name: "Wu Yajun ",
    netWorth: "$15.3 B",
    age: "58",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "120",
    rank: "121",
    name: "Charlene de Carvalho-Heineken & family ",
    netWorth: "$15.2 B",
    age: "67",
    country: "Netherlands",
    source: "Heineken",
    industry: "Food & Beverage "
  },
  {
    key: "121",
    rank: "121",
    name: "Michael Platt ",
    netWorth: "$15.2 B",
    age: "54",
    country: "United Kingdom",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "122",
    rank: "123",
    name: "Pavel Durov ",
    netWorth: "$15.1 B",
    age: "37",
    country: "Russia",
    source: "messaging app",
    industry: "Technology "
  },
  {
    key: "123",
    rank: "123",
    name: "Scott Farquhar ",
    netWorth: "$15.1 B",
    age: "42",
    country: "Australia",
    source: "software",
    industry: "Technology "
  },
  {
    key: "124",
    rank: "125",
    name: "Pallonji Mistry ",
    netWorth: "$15 B",
    age: "92",
    country: "Ireland",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "125",
    rank: "126",
    name: "Dang Yanbao ",
    netWorth: "$14.8 B",
    age: "49",
    country: "China",
    source: "coal",
    industry: "Metals & Mining "
  },
  {
    key: "126",
    rank: "127",
    name: "Robert Pera ",
    netWorth: "$14.6 B",
    age: "44",
    country: "United States",
    source: "wireless networking gear",
    industry: "Technology "
  },
  {
    key: "127",
    rank: "128",
    name: "Donald Newhouse ",
    netWorth: "$14.4 B",
    age: "92",
    country: "United States",
    source: "media",
    industry: "Media & Entertainment "
  },
  {
    key: "128",
    rank: "129",
    name: "Uday Kotak ",
    netWorth: "$14.3 B",
    age: "63",
    country: "India",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "129",
    rank: "130",
    name: "Aliko Dangote ",
    netWorth: "$14 B",
    age: "64",
    country: "Nigeria",
    source: "cement, sugar",
    industry: "Manufacturing "
  },
  {
    key: "130",
    rank: "130",
    name: "Leonid Mikhelson ",
    netWorth: "$14 B",
    age: "66",
    country: "Russia",
    source: "gas, chemicals",
    industry: "Energy "
  },
  {
    key: "131",
    rank: "132",
    name: "Sunil Mittal & family ",
    netWorth: "$13.9 B",
    age: "64",
    country: "India",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "132",
    rank: "133",
    name: "Robert & Philip Ng ",
    netWorth: "$13.7 B",
    age: "64",
    country: "Singapore",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "133",
    rank: "134",
    name: "Liu Hanyuan ",
    netWorth: "$13.65 B",
    age: "58",
    country: "China",
    source: "agribusiness",
    industry: "Food & Beverage "
  },
  {
    key: "134",
    rank: "135",
    name: "Joseph Lau ",
    netWorth: "$13.6 B",
    age: "70",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "135",
    rank: "135",
    name: "Anders Holch Povlsen ",
    netWorth: "$13.6 B",
    age: "49",
    country: "Denmark",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "136",
    rank: "137",
    name: "Dhanin Chearavanont ",
    netWorth: "$13.5 B",
    age: "82",
    country: "Thailand",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "137",
    rank: "138",
    name: "Gong Hongjia & family ",
    netWorth: "$13.2 B",
    age: "57",
    country: "Hong Kong",
    source: "video surveillance",
    industry: "Finance & Investments "
  },
  {
    key: "138",
    rank: "138",
    name: "Liu Yongxing ",
    netWorth: "$13.2 B",
    age: "73",
    country: "China",
    source: "diversified",
    industry: "Service "
  },
  {
    key: "139",
    rank: "138",
    name: "Alexey Mordashov ",
    netWorth: "$13.2 B",
    age: "56",
    country: "Russia",
    source: "steel, investments",
    industry: "Metals & Mining "
  },
  {
    key: "140",
    rank: "138",
    name: "Wang Jianlin ",
    netWorth: "$13.2 B",
    age: "67",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "141",
    rank: "142",
    name: "David Duffield ",
    netWorth: "$12.9 B",
    age: "81",
    country: "United States",
    source: "business software",
    industry: "Technology "
  },
  {
    key: "142",
    rank: "142",
    name: "Li Zhenguo & family ",
    netWorth: "$12.9 B",
    age: "54",
    country: "China",
    source: "solar wafers and modules",
    industry: "Manufacturing "
  },
  {
    key: "143",
    rank: "144",
    name: "Harry Triguboff ",
    netWorth: "$12.8 B",
    age: "89",
    country: "Australia",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "144",
    rank: "144",
    name: "Zhang Zhidong ",
    netWorth: "$12.8 B",
    age: "50",
    country: "China",
    source: "internet media",
    industry: "Technology "
  },
  {
    key: "145",
    rank: "146",
    name: "Chen Bang ",
    netWorth: "$12.7 B",
    age: "56",
    country: "China",
    source: "hospitals",
    industry: "Healthcare "
  },
  {
    key: "146",
    rank: "146",
    name: "John Doerr ",
    netWorth: "$12.7 B",
    age: "70",
    country: "United States",
    source: "venture capital",
    industry: "Technology "
  },
  {
    key: "147",
    rank: "146",
    name: "Hinduja brothers ",
    netWorth: "$12.7 B",
    age: "64",
    country: "United Kingdom",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "148",
    rank: "149",
    name: "Kwong Siu-hing ",
    netWorth: "$12.6 B",
    age: "92",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "149",
    rank: "150",
    name: "Pei Zhenhua ",
    netWorth: "$12.5 B",
    age: "63",
    country: "China",
    source: "batteries",
    industry: "Energy "
  },
  {
    key: "150",
    rank: "151",
    name: "Ricardo Salinas Pliego & family ",
    netWorth: "$12.4 B",
    age: "66",
    country: "Mexico",
    source: "retail, media",
    industry: "Fashion & Retail "
  },
  {
    key: "151",
    rank: "152",
    name: "Jim Pattison ",
    netWorth: "$12.2 B",
    age: "93",
    country: "Canada",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "152",
    rank: "152",
    name: "Charles Schwab ",
    netWorth: "$12.2 B",
    age: "84",
    country: "United States",
    source: "discount brokerage",
    industry: "Finance & Investments "
  },
  {
    key: "153",
    rank: "154",
    name: "Goh Cheng Liang ",
    netWorth: "$12.1 B",
    age: "94",
    country: "Singapore",
    source: "paints",
    industry: "Manufacturing "
  },
  {
    key: "154",
    rank: "154",
    name: "Lin Jianhua & family ",
    netWorth: "$12.1 B",
    age: "59",
    country: "China",
    source: "solar panel components",
    industry: "Manufacturing "
  },
  {
    key: "155",
    rank: "156",
    name: "Charoen Sirivadhanabhakdi ",
    netWorth: "$12 B",
    age: "77",
    country: "Thailand",
    source: "alcohol, real estate",
    industry: "Food & Beverage "
  },
  {
    key: "156",
    rank: "156",
    name: "Jeff Yass ",
    netWorth: "$12 B",
    age: "63",
    country: "United States",
    source: "trading, investments",
    industry: "Finance & Investments "
  },
  {
    key: "157",
    rank: "158",
    name: "John Fredriksen ",
    netWorth: "$11.9 B",
    age: "77",
    country: "Cyprus",
    source: "shipping",
    industry: "Logistics "
  },
  {
    key: "158",
    rank: "158",
    name: "Andreas Struengmann & family ",
    netWorth: "$11.9 B",
    age: "72",
    country: "Germany",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "159",
    rank: "158",
    name: "Thomas Struengmann & family ",
    netWorth: "$11.9 B",
    age: "72",
    country: "Germany",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "160",
    rank: "161",
    name: "Mikhail Fridman ",
    netWorth: "$11.8 B",
    age: "57",
    country: "Russia",
    source: "oil, banking, telecom",
    industry: "Energy "
  },
  {
    key: "161",
    rank: "161",
    name: "Sarath Ratanavadi ",
    netWorth: "$11.8 B",
    age: "56",
    country: "Thailand",
    source: "energy",
    industry: "Energy "
  },
  {
    key: "162",
    rank: "163",
    name: "Robert Kuok ",
    netWorth: "$11.7 B",
    age: "98",
    country: "Malaysia",
    source: "palm oil, shipping, property",
    industry: "Diversified "
  },
  {
    key: "163",
    rank: "163",
    name: "Lei Jun ",
    netWorth: "$11.7 B",
    age: "52",
    country: "China",
    source: "smartphones",
    industry: "Technology "
  },
  {
    key: "164",
    rank: "163",
    name: "Zhang Congyuan ",
    netWorth: "$11.7 B",
    age: "74",
    country: "Taiwan",
    source: "shoes",
    industry: "Fashion & Retail "
  },
  {
    key: "165",
    rank: "166",
    name: "Lui Che Woo ",
    netWorth: "$11.6 B",
    age: "93",
    country: "Hong Kong",
    source: "casinos/hotels",
    industry: "Gambling & Casinos "
  },
  {
    key: "166",
    rank: "167",
    name: "Brian Chesky ",
    netWorth: "$11.5 B",
    age: "40",
    country: "United States",
    source: "Airbnb",
    industry: "Technology "
  },
  {
    key: "167",
    rank: "167",
    name: "Israel Englander ",
    netWorth: "$11.5 B",
    age: "73",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "168",
    rank: "167",
    name: "Dustin Moskovitz ",
    netWorth: "$11.5 B",
    age: "37",
    country: "United States",
    source: "Facebook",
    industry: "Technology "
  },
  {
    key: "169",
    rank: "167",
    name: "Alisher Usmanov ",
    netWorth: "$11.5 B",
    age: "68",
    country: "Russia",
    source: "steel, telecom, investments",
    industry: "Metals & Mining "
  },
  {
    key: "170",
    rank: "171",
    name: "Jay Chaudhry ",
    netWorth: "$11.4 B",
    age: "62",
    country: "United States",
    source: "security software",
    industry: "Technology "
  },
  {
    key: "171",
    rank: "171",
    name: "Anthony Pratt ",
    netWorth: "$11.4 B",
    age: "61",
    country: "Australia",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "172",
    rank: "173",
    name: "Colin Zheng Huang ",
    netWorth: "$11.3 B",
    age: "42",
    country: "China",
    source: "e-commerce",
    industry: "Technology "
  },
  {
    key: "173",
    rank: "173",
    name: "Jin Baofang ",
    netWorth: "$11.3 B",
    age: "69",
    country: "China",
    source: "solar panels",
    industry: "Energy "
  },
  {
    key: "174",
    rank: "173",
    name: "Pierre Omidyar ",
    netWorth: "$11.3 B",
    age: "54",
    country: "United States",
    source: "eBay, PayPal",
    industry: "Technology "
  },
  {
    key: "175",
    rank: "173",
    name: "Gennady Timchenko ",
    netWorth: "$11.3 B",
    age: "69",
    country: "Russia",
    source: "oil, gas",
    industry: "Energy "
  },
  {
    key: "176",
    rank: "177",
    name: "Carl Cook ",
    netWorth: "$11.1 B",
    age: "59",
    country: "United States",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "177",
    rank: "177",
    name: "Andrey Melnichenko ",
    netWorth: "$11.1 B",
    age: "50",
    country: "Russia",
    source: "coal, fertilizers",
    industry: "Metals & Mining "
  },
  {
    key: "178",
    rank: "179",
    name: "Xing Wang ",
    netWorth: "$11 B",
    age: "43",
    country: "China",
    source: "e-commerce",
    industry: "Technology "
  },
  {
    key: "179",
    rank: "180",
    name: "Philip Anschutz ",
    netWorth: "$10.9 B",
    age: "82",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "180",
    rank: "180",
    name: "David Cheriton ",
    netWorth: "$10.9 B",
    age: "71",
    country: "Canada",
    source: "Google",
    industry: "Technology "
  },
  {
    key: "181",
    rank: "180",
    name: "Alexander Otto ",
    netWorth: "$10.9 B",
    age: "54",
    country: "Germany",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "182",
    rank: "183",
    name: "Diane Hendricks ",
    netWorth: "$10.7 B",
    age: "75",
    country: "United States",
    source: "roofing",
    industry: "Construction & Engineering "
  },
  {
    key: "183",
    rank: "183",
    name: "Stanley Kroenke ",
    netWorth: "$10.7 B",
    age: "74",
    country: "United States",
    source: "sports, real estate",
    industry: "Sports "
  },
  {
    key: "184",
    rank: "185",
    name: "Jerry Jones ",
    netWorth: "$10.6 B",
    age: "79",
    country: "United States",
    source: "Dallas Cowboys",
    industry: "Sports "
  },
  {
    key: "185",
    rank: "185",
    name: "Quek Leng Chan ",
    netWorth: "$10.6 B",
    age: "80",
    country: "Malaysia",
    source: "banking, property",
    industry: "Diversified "
  },
  {
    key: "186",
    rank: "185",
    name: "Eduardo Saverin ",
    netWorth: "$10.6 B",
    age: "40",
    country: "Brazil",
    source: "Facebook",
    industry: "Technology "
  },
  {
    key: "187",
    rank: "188",
    name: "Vagit Alekperov ",
    netWorth: "$10.5 B",
    age: "71",
    country: "Russia",
    source: "oil",
    industry: "Energy "
  },
  {
    key: "188",
    rank: "188",
    name: "Richard Liu ",
    netWorth: "$10.5 B",
    age: "48",
    country: "China",
    source: "e-commerce",
    industry: "Technology "
  },
  {
    key: "189",
    rank: "188",
    name: "Idan Ofer ",
    netWorth: "$10.5 B",
    age: "66",
    country: "Israel",
    source: "drilling, shipping",
    industry: "Diversified "
  },
  {
    key: "190",
    rank: "191",
    name: "Melker Schorling & family ",
    netWorth: "$10.4 B",
    age: "74",
    country: "Sweden",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "191",
    rank: "192",
    name: "Chase Coleman, III. ",
    netWorth: "$10.3 B",
    age: "46",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "192",
    rank: "192",
    name: "Shuirong Li ",
    netWorth: "$10.3 B",
    age: "65",
    country: "China",
    source: "petrochemicals",
    industry: "Manufacturing "
  },
  {
    key: "193",
    rank: "192",
    name: "Stefano Pessina ",
    netWorth: "$10.3 B",
    age: "80",
    country: "Monaco",
    source: "drugstores",
    industry: "Fashion & Retail "
  },
  {
    key: "194",
    rank: "192",
    name: "Mikhail Prokhorov ",
    netWorth: "$10.3 B",
    age: "56",
    country: "Russia",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "195",
    rank: "192",
    name: "Marcel Herrmann Telles ",
    netWorth: "$10.3 B",
    age: "72",
    country: "Brazil",
    source: "beer",
    industry: "Food & Beverage "
  },
  {
    key: "196",
    rank: "197",
    name: "Leon Black ",
    netWorth: "$10 B",
    age: "70",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "197",
    rank: "197",
    name: "Joe Gebbia ",
    netWorth: "$10 B",
    age: "40",
    country: "United States",
    source: "Airbnb",
    industry: "Technology "
  },
  {
    key: "198",
    rank: "197",
    name: "David Geffen ",
    netWorth: "$10 B",
    age: "79",
    country: "United States",
    source: "movies, record labels",
    industry: "Media & Entertainment "
  },
  {
    key: "199",
    rank: "197",
    name: "Yu Renrong ",
    netWorth: "$10 B",
    age: "56",
    country: "China",
    source: "semiconductors",
    industry: "Manufacturing "
  },
  {
    key: "200",
    rank: "201",
    name: "Andrew Beal ",
    netWorth: "$9.9 B",
    age: "69",
    country: "United States",
    source: "banks, real estate",
    industry: "Finance & Investments "
  },
  {
    key: "201",
    rank: "201",
    name: "George Kaiser ",
    netWorth: "$9.9 B",
    age: "79",
    country: "United States",
    source: "oil & gas, banking",
    industry: "Energy "
  },
  {
    key: "202",
    rank: "201",
    name: "Qi Shi & family ",
    netWorth: "$9.9 B",
    age: "52",
    country: "China",
    source: "financial information",
    industry: "Technology "
  },
  {
    key: "203",
    rank: "201",
    name: "Luis Carlos Sarmiento ",
    netWorth: "$9.9 B",
    age: "89",
    country: "Colombia",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "204",
    rank: "201",
    name: "Andreas von Bechtolsheim & family ",
    netWorth: "$9.9 B",
    age: "66",
    country: "Germany",
    source: "Google",
    industry: "Technology "
  },
  {
    key: "205",
    rank: "206",
    name: "Jan Koum ",
    netWorth: "$9.8 B",
    age: "46",
    country: "United States",
    source: "WhatsApp",
    industry: "Technology "
  },
  {
    key: "206",
    rank: "206",
    name: "Jorge Moll Filho & family ",
    netWorth: "$9.8 B",
    age: "77",
    country: "Brazil",
    source: "hospitals",
    industry: "Healthcare "
  },
  {
    key: "207",
    rank: "206",
    name: "Azim Premji ",
    netWorth: "$9.8 B",
    age: "76",
    country: "India",
    source: "software services",
    industry: "Technology "
  },
  {
    key: "208",
    rank: "206",
    name: "Finn Rausing ",
    netWorth: "$9.8 B",
    age: "67",
    country: "Sweden",
    source: "packaging",
    industry: "Food & Beverage "
  },
  {
    key: "209",
    rank: "206",
    name: "Jorn Rausing ",
    netWorth: "$9.8 B",
    age: "62",
    country: "Sweden",
    source: "packaging",
    industry: "Food & Beverage "
  },
  {
    key: "210",
    rank: "206",
    name: "Kirsten Rausing ",
    netWorth: "$9.8 B",
    age: "69",
    country: "Sweden",
    source: "packaging",
    industry: "Food & Beverage "
  },
  {
    key: "211",
    rank: "206",
    name: "Wang Laisheng ",
    netWorth: "$9.8 B",
    age: "57",
    country: "China",
    source: "electronics components",
    industry: "Technology "
  },
  {
    key: "212",
    rank: "213",
    name: "Tom & Judy Love ",
    netWorth: "$9.7 B",
    age: "64",
    country: "United States",
    source: "retail & gas stations",
    industry: "Fashion & Retail "
  },
  {
    key: "213",
    rank: "214",
    name: "John Collison ",
    netWorth: "$9.5 B",
    age: "31",
    country: "Ireland",
    source: "payments software",
    industry: "Technology "
  },
  {
    key: "214",
    rank: "214",
    name: "Patrick Collison ",
    netWorth: "$9.5 B",
    age: "33",
    country: "Ireland",
    source: "payment software",
    industry: "Technology "
  },
  {
    key: "215",
    rank: "214",
    name: "Gordon Moore ",
    netWorth: "$9.5 B",
    age: "93",
    country: "United States",
    source: "Intel",
    industry: "Technology "
  },
  {
    key: "216",
    rank: "214",
    name: "Wang Laichun ",
    netWorth: "$9.5 B",
    age: "54",
    country: "China",
    source: "electronics components",
    industry: "Technology "
  },
  {
    key: "217",
    rank: "218",
    name: "Graeme Hart ",
    netWorth: "$9.4 B",
    age: "66",
    country: "New Zealand",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "218",
    rank: "218",
    name: "Zheng Shuliang & family ",
    netWorth: "$9.4 B",
    age: "76",
    country: "China",
    source: "aluminum products",
    industry: "Metals & Mining "
  },
  {
    key: "219",
    rank: "220",
    name: "Cao Renxian ",
    netWorth: "$9.3 B",
    age: "53",
    country: "China",
    source: "photovoltaic equipment",
    industry: "Energy "
  },
  {
    key: "220",
    rank: "221",
    name: "Nathan Blecharczyk ",
    netWorth: "$9.2 B",
    age: "38",
    country: "United States",
    source: "Airbnb",
    industry: "Technology "
  },
  {
    key: "221",
    rank: "221",
    name: "James Dyson ",
    netWorth: "$9.2 B",
    age: "74",
    country: "United Kingdom",
    source: "vacuums",
    industry: "Manufacturing "
  },
  {
    key: "222",
    rank: "223",
    name: "Ivan Glasenberg ",
    netWorth: "$9.1 B",
    age: "65",
    country: "Switzerland",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "223",
    rank: "223",
    name: "Kim Beom-su ",
    netWorth: "$9.1 B",
    age: "56",
    country: "South Korea",
    source: "online services",
    industry: "Technology "
  },
  {
    key: "224",
    rank: "223",
    name: "Jay Y. Lee ",
    netWorth: "$9.1 B",
    age: "53",
    country: "South Korea",
    source: "Samsung",
    industry: "Diversified "
  },
  {
    key: "225",
    rank: "223",
    name: "Liu Yonghao & family ",
    netWorth: "$9.1 B",
    age: "70",
    country: "China",
    source: "agribusiness",
    industry: "Service "
  },
  {
    key: "226",
    rank: "227",
    name: "Ann Walton Kroenke ",
    netWorth: "$9 B",
    age: "73",
    country: "United States",
    source: "Walmart",
    industry: "Fashion & Retail "
  },
  {
    key: "227",
    rank: "227",
    name: "Li Ping ",
    netWorth: "$9 B",
    age: "54",
    country: "Hong Kong",
    source: "batteries",
    industry: "Automotive "
  },
  {
    key: "228",
    rank: "227",
    name: "Eric Wittouck ",
    netWorth: "$9 B",
    age: "75",
    country: "Belgium",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "229",
    rank: "230",
    name: "Ian & Richard Livingstone ",
    netWorth: "$8.9 B",
    age: "64",
    country: "United Kingdom",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "230",
    rank: "230",
    name: "Friedhelm Loh ",
    netWorth: "$8.9 B",
    age: "75",
    country: "Germany",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "231",
    rank: "230",
    name: "Xavier Niel ",
    netWorth: "$8.9 B",
    age: "54",
    country: "France",
    source: "internet, telecom",
    industry: "Telecom "
  },
  {
    key: "232",
    rank: "230",
    name: "Michael Otto ",
    netWorth: "$8.9 B",
    age: "78",
    country: "Germany",
    source: "retail, real estate",
    industry: "Fashion & Retail "
  },
  {
    key: "233",
    rank: "230",
    name: "Johann Rupert & family ",
    netWorth: "$8.9 B",
    age: "71",
    country: "South Africa",
    source: "luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "234",
    rank: "235",
    name: "Hui Ka Yan ",
    netWorth: "$8.8 B",
    age: "63",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "235",
    rank: "235",
    name: "Pauline MacMillan Keinath ",
    netWorth: "$8.8 B",
    age: "88",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "236",
    rank: "235",
    name: "Herbert Kohler, Jr. & family ",
    netWorth: "$8.8 B",
    age: "83",
    country: "United States",
    source: "plumbing fixtures",
    industry: "Manufacturing "
  },
  {
    key: "237",
    rank: "235",
    name: "Li Ge ",
    netWorth: "$8.8 B",
    age: "55",
    country: "United States",
    source: "pharmaceutical ingredients",
    industry: "Healthcare "
  },
  {
    key: "238",
    rank: "235",
    name: "Kushal Pal Singh ",
    netWorth: "$8.8 B",
    age: "90",
    country: "India",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "239",
    rank: "235",
    name: "Zong Qinghou ",
    netWorth: "$8.8 B",
    age: "76",
    country: "China",
    source: "beverages",
    industry: "Food & Beverage "
  },
  {
    key: "240",
    rank: "241",
    name: "Cai Kui ",
    netWorth: "$8.7 B",
    age: "59",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "241",
    rank: "241",
    name: "Charles Ergen ",
    netWorth: "$8.7 B",
    age: "69",
    country: "United States",
    source: "satellite TV",
    industry: "Media & Entertainment "
  },
  {
    key: "242",
    rank: "241",
    name: "Gao Jifan & family ",
    netWorth: "$8.7 B",
    age: "57",
    country: "China",
    source: "solar equipment",
    industry: "Energy "
  },
  {
    key: "243",
    rank: "241",
    name: "Bernard Marcus ",
    netWorth: "$8.7 B",
    age: "92",
    country: "United States",
    source: "Home Depot",
    industry: "Fashion & Retail "
  },
  {
    key: "244",
    rank: "241",
    name: "Nicky Oppenheimer & family ",
    netWorth: "$8.7 B",
    age: "76",
    country: "South Africa",
    source: "diamonds",
    industry: "Metals & Mining "
  },
  {
    key: "245",
    rank: "246",
    name: "Bajaj brothers ",
    netWorth: "$8.6 B",
    age: "64",
    country: "India",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "246",
    rank: "246",
    name: "Ernest Garcia, II. ",
    netWorth: "$8.6 B",
    age: "64",
    country: "United States",
    source: "used cars",
    industry: "Automotive "
  },
  {
    key: "247",
    rank: "246",
    name: "Paul Xiaoming Lee & family ",
    netWorth: "$8.6 B",
    age: "64",
    country: "United States",
    source: "packaging",
    industry: "Manufacturing "
  },
  {
    key: "248",
    rank: "246",
    name: "George Soros ",
    netWorth: "$8.6 B",
    age: "91",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "249",
    rank: "246",
    name: "Wang Liping & family ",
    netWorth: "$8.6 B",
    age: "56",
    country: "China",
    source: "hydraulic machinery",
    industry: "Manufacturing "
  },
  {
    key: "250",
    rank: "251",
    name: "Ernesto Bertarelli ",
    netWorth: "$8.5 B",
    age: "56",
    country: "Switzerland",
    source: "biotech, investments",
    industry: "Healthcare "
  },
  {
    key: "251",
    rank: "251",
    name: "Tamara Gustavson ",
    netWorth: "$8.5 B",
    age: "60",
    country: "United States",
    source: "self storage",
    industry: "Service "
  },
  {
    key: "252",
    rank: "251",
    name: "Carlos Alberto Sicupira & family ",
    netWorth: "$8.5 B",
    age: "74",
    country: "Brazil",
    source: "beer",
    industry: "Food & Beverage "
  },
  {
    key: "253",
    rank: "254",
    name: "Laurent Dassault ",
    netWorth: "$8.4 B",
    age: "68",
    country: "France",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "254",
    rank: "254",
    name: "Thierry Dassault ",
    netWorth: "$8.4 B",
    age: "65",
    country: "France",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "255",
    rank: "254",
    name: "Marie-Hélène Habert-Dassault ",
    netWorth: "$8.4 B",
    age: "57",
    country: "France",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "256",
    rank: "254",
    name: "Liu Jincheng & family ",
    netWorth: "$8.4 B",
    age: "57",
    country: "China",
    source: "lithium batteries",
    industry: "Technology "
  },
  {
    key: "257",
    rank: "254",
    name: "Ma Jianrong & family ",
    netWorth: "$8.4 B",
    age: "58",
    country: "China",
    source: "textiles, apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "258",
    rank: "254",
    name: "Steven Rales ",
    netWorth: "$8.4 B",
    age: "71",
    country: "United States",
    source: "manufacturing, investments",
    industry: "Manufacturing "
  },
  {
    key: "259",
    rank: "254",
    name: "Joseph Tsai ",
    netWorth: "$8.4 B",
    age: "58",
    country: "Canada",
    source: "e-commerce",
    industry: "Technology "
  },
  {
    key: "260",
    rank: "254",
    name: "Francine von Finck & family ",
    netWorth: "$8.4 B",
    age: "64",
    country: "Germany",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "261",
    rank: "254",
    name: "Anthony von Mandl ",
    netWorth: "$8.4 B",
    age: "72",
    country: "Canada",
    source: "alcoholic beverages",
    industry: "Food & Beverage "
  },
  {
    key: "262",
    rank: "263",
    name: "Carl Bennet ",
    netWorth: "$8.3 B",
    age: "70",
    country: "Sweden",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "263",
    rank: "263",
    name: "Robert Kraft ",
    netWorth: "$8.3 B",
    age: "80",
    country: "United States",
    source: "New England Patriots",
    industry: "Sports "
  },
  {
    key: "264",
    rank: "263",
    name: "Chairul Tanjung ",
    netWorth: "$8.3 B",
    age: "59",
    country: "Indonesia",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "265",
    rank: "263",
    name: "Manuel Villar ",
    netWorth: "$8.3 B",
    age: "72",
    country: "Philippines",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "266",
    rank: "267",
    name: "Jean-Michel Besnier ",
    netWorth: "$8.2 B",
    age: "54",
    country: "France",
    source: "cheese",
    industry: "Food & Beverage "
  },
  {
    key: "267",
    rank: "267",
    name: "Marie Besnier Beauvalot ",
    netWorth: "$8.2 B",
    age: "41",
    country: "France",
    source: "cheese",
    industry: "Food & Beverage "
  },
  {
    key: "268",
    rank: "267",
    name: "Gustaf Douglas ",
    netWorth: "$8.2 B",
    age: "84",
    country: "Sweden",
    source: "investments",
    industry: "Diversified "
  },
  {
    key: "269",
    rank: "267",
    name: "Kjeld Kirk Kristiansen ",
    netWorth: "$8.2 B",
    age: "74",
    country: "Denmark",
    source: "Lego",
    industry: "Manufacturing "
  },
  {
    key: "270",
    rank: "267",
    name: "Sofie Kirk Kristiansen ",
    netWorth: "$8.2 B",
    age: "46",
    country: "Denmark",
    source: "Lego",
    industry: "Manufacturing "
  },
  {
    key: "271",
    rank: "267",
    name: "Thomas Kirk Kristiansen ",
    netWorth: "$8.2 B",
    age: "43",
    country: "Denmark",
    source: "Lego",
    industry: "Manufacturing "
  },
  {
    key: "272",
    rank: "267",
    name: "Stephen Ross ",
    netWorth: "$8.2 B",
    age: "81",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "273",
    rank: "267",
    name: "Agnete Kirk Thinggaard ",
    netWorth: "$8.2 B",
    age: "38",
    country: "Denmark",
    source: "Lego",
    industry: "Manufacturing "
  },
  {
    key: "274",
    rank: "275",
    name: "Marc Benioff ",
    netWorth: "$8.1 B",
    age: "57",
    country: "United States",
    source: "business software",
    industry: "Technology "
  },
  {
    key: "275",
    rank: "275",
    name: "Dmitri Bukhman ",
    netWorth: "$8.1 B",
    age: "36",
    country: "Israel",
    source: "online games",
    industry: "Media & Entertainment "
  },
  {
    key: "276",
    rank: "275",
    name: "Igor Bukhman ",
    netWorth: "$8.1 B",
    age: "40",
    country: "Israel",
    source: "online games",
    industry: "Media & Entertainment "
  },
  {
    key: "277",
    rank: "275",
    name: "Francis Choi ",
    netWorth: "$8.1 B",
    age: "74",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "278",
    rank: "275",
    name: "Murali Divi & family ",
    netWorth: "$8.1 B",
    age: "71",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "279",
    rank: "275",
    name: "Nancy Walton Laurie ",
    netWorth: "$8.1 B",
    age: "70",
    country: "United States",
    source: "Walmart",
    industry: "Fashion & Retail "
  },
  {
    key: "280",
    rank: "275",
    name: "Georg Schaeffler ",
    netWorth: "$8.1 B",
    age: "57",
    country: "Germany",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "281",
    rank: "275",
    name: "Yao Liangsong ",
    netWorth: "$8.1 B",
    age: "57",
    country: "China",
    source: "furniture",
    industry: "Manufacturing "
  },
  {
    key: "282",
    rank: "275",
    name: "Zhong Huijuan ",
    netWorth: "$8.1 B",
    age: "61",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "283",
    rank: "284",
    name: "Stewart & Lynda Resnick ",
    netWorth: "$8 B",
    age: "64",
    country: "United States",
    source: "agriculture, water",
    industry: "Food & Beverage "
  },
  {
    key: "284",
    rank: "284",
    name: "George Roberts ",
    netWorth: "$8 B",
    age: "78",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "285",
    rank: "284",
    name: "Michael Rubin ",
    netWorth: "$8 B",
    age: "49",
    country: "United States",
    source: "online retail",
    industry: "Fashion & Retail "
  },
  {
    key: "286",
    rank: "284",
    name: "Patrick Ryan ",
    netWorth: "$8 B",
    age: "84",
    country: "United States",
    source: "insurance",
    industry: "Finance & Investments "
  },
  {
    key: "287",
    rank: "288",
    name: "Christopher Hohn ",
    netWorth: "$7.9 B",
    age: "55",
    country: "United Kingdom",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "288",
    rank: "288",
    name: "Marijke Mars ",
    netWorth: "$7.9 B",
    age: "57",
    country: "United States",
    source: "candy, pet food",
    industry: "Food & Beverage "
  },
  {
    key: "289",
    rank: "288",
    name: "Pamela Mars ",
    netWorth: "$7.9 B",
    age: "61",
    country: "United States",
    source: "candy, pet food",
    industry: "Food & Beverage "
  },
  {
    key: "290",
    rank: "288",
    name: "Valerie Mars ",
    netWorth: "$7.9 B",
    age: "63",
    country: "United States",
    source: "candy, pet food",
    industry: "Food & Beverage "
  },
  {
    key: "291",
    rank: "288",
    name: "Victoria Mars ",
    netWorth: "$7.9 B",
    age: "65",
    country: "United States",
    source: "candy, pet food",
    industry: "Food & Beverage "
  },
  {
    key: "292",
    rank: "288",
    name: "Hasso Plattner & family ",
    netWorth: "$7.9 B",
    age: "78",
    country: "Germany",
    source: "software",
    industry: "Technology "
  },
  {
    key: "293",
    rank: "288",
    name: "Georg Stumpf ",
    netWorth: "$7.9 B",
    age: "49",
    country: "Austria",
    source: "real estate, construction",
    industry: "Diversified "
  },
  {
    key: "294",
    rank: "288",
    name: "Christy Walton ",
    netWorth: "$7.9 B",
    age: "73",
    country: "United States",
    source: "Walmart",
    industry: "Fashion & Retail "
  },
  {
    key: "295",
    rank: "296",
    name: "Giorgio Armani ",
    netWorth: "$7.8 B",
    age: "87",
    country: "Italy",
    source: "luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "296",
    rank: "296",
    name: "Gopikishan Damani ",
    netWorth: "$7.8 B",
    age: "64",
    country: "India",
    source: "retail, investments",
    industry: "Fashion & Retail "
  },
  {
    key: "297",
    rank: "296",
    name: "Ding Shizhong & family ",
    netWorth: "$7.8 B",
    age: "51",
    country: "China",
    source: "sports apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "298",
    rank: "296",
    name: "Jim Kennedy ",
    netWorth: "$7.8 B",
    age: "74",
    country: "United States",
    source: "media, automotive",
    industry: "Media & Entertainment "
  },
  {
    key: "299",
    rank: "296",
    name: "German Khan ",
    netWorth: "$7.8 B",
    age: "60",
    country: "Russia",
    source: "oil, banking, telecom",
    industry: "Energy "
  },
  {
    key: "300",
    rank: "296",
    name: "Liang Wengen ",
    netWorth: "$7.8 B",
    age: "65",
    country: "China",
    source: "construction equipment",
    industry: "Manufacturing "
  },
  {
    key: "301",
    rank: "296",
    name: "Blair Parry-Okeden ",
    netWorth: "$7.8 B",
    age: "71",
    country: "United States",
    source: "media, automotive",
    industry: "Media & Entertainment "
  },
  {
    key: "302",
    rank: "296",
    name: "Tsai Eng-meng ",
    netWorth: "$7.8 B",
    age: "65",
    country: "Taiwan",
    source: "food, beverages",
    industry: "Food & Beverage "
  },
  {
    key: "303",
    rank: "304",
    name: "Bajaj siblings ",
    netWorth: "$7.7 B",
    age: "64",
    country: "India",
    source: "two-wheelers, finance",
    industry: "Automotive "
  },
  {
    key: "304",
    rank: "304",
    name: "Ashwin Dani & family ",
    netWorth: "$7.7 B",
    age: "79",
    country: "India",
    source: "paints",
    industry: "Manufacturing "
  },
  {
    key: "305",
    rank: "304",
    name: "Ding Shijia ",
    netWorth: "$7.7 B",
    age: "58",
    country: "China",
    source: "sports apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "306",
    rank: "304",
    name: "Karel Komarek ",
    netWorth: "$7.7 B",
    age: "53",
    country: "Czechia",
    source: "oil and gas, IT, lotteries",
    industry: "Gambling & Casinos "
  },
  {
    key: "307",
    rank: "304",
    name: "Henry Kravis ",
    netWorth: "$7.7 B",
    age: "78",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "308",
    rank: "304",
    name: "Frederik Paulsen ",
    netWorth: "$7.7 B",
    age: "71",
    country: "Sweden",
    source: "health care",
    industry: "Healthcare "
  },
  {
    key: "309",
    rank: "304",
    name: "Safra siblings ",
    netWorth: "$7.7 B",
    age: "64",
    country: "Brazil",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "310",
    rank: "304",
    name: "Nassef Sawiris ",
    netWorth: "$7.7 B",
    age: "61",
    country: "Egypt",
    source: "construction, investments",
    industry: "Construction & Engineering "
  },
  {
    key: "311",
    rank: "304",
    name: "Xu Shihui ",
    netWorth: "$7.7 B",
    age: "64",
    country: "China",
    source: "snacks, beverages",
    industry: "Food & Beverage "
  },
  {
    key: "312",
    rank: "313",
    name: "Rahel Blocher ",
    netWorth: "$7.6 B",
    age: "46",
    country: "Switzerland",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "313",
    rank: "313",
    name: "Shahid Khan ",
    netWorth: "$7.6 B",
    age: "71",
    country: "United States",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "314",
    rank: "313",
    name: "Magdalena Martullo-Blocher ",
    netWorth: "$7.6 B",
    age: "53",
    country: "Switzerland",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "315",
    rank: "316",
    name: "Vincent Bolloré & family ",
    netWorth: "$7.5 B",
    age: "70",
    country: "France",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "316",
    rank: "316",
    name: "Jeffery Hildebrand ",
    netWorth: "$7.5 B",
    age: "63",
    country: "United States",
    source: "oil",
    industry: "Energy "
  },
  {
    key: "317",
    rank: "316",
    name: "Michael Kim ",
    netWorth: "$7.5 B",
    age: "58",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "318",
    rank: "316",
    name: "Richard Kinder ",
    netWorth: "$7.5 B",
    age: "77",
    country: "United States",
    source: "pipelines",
    industry: "Energy "
  },
  {
    key: "319",
    rank: "316",
    name: "David Shaw ",
    netWorth: "$7.5 B",
    age: "71",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "320",
    rank: "321",
    name: "John Malone ",
    netWorth: "$7.4 B",
    age: "81",
    country: "United States",
    source: "cable television",
    industry: "Media & Entertainment "
  },
  {
    key: "321",
    rank: "321",
    name: "Vicky Safra ",
    netWorth: "$7.4 B",
    age: "69",
    country: "Greece",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "322",
    rank: "321",
    name: "Tim Sweeney ",
    netWorth: "$7.4 B",
    age: "51",
    country: "United States",
    source: "video games",
    industry: "Media & Entertainment "
  },
  {
    key: "323",
    rank: "324",
    name: "Mike Adenuga ",
    netWorth: "$7.3 B",
    age: "68",
    country: "Nigeria",
    source: "telecom, oil",
    industry: "Diversified "
  },
  {
    key: "324",
    rank: "324",
    name: "David Green & family ",
    netWorth: "$7.3 B",
    age: "80",
    country: "United States",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "325",
    rank: "324",
    name: "Paul Tudor Jones, II. ",
    netWorth: "$7.3 B",
    age: "67",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "326",
    rank: "324",
    name: "Yuri Milner ",
    netWorth: "$7.3 B",
    age: "60",
    country: "Israel",
    source: "tech investments",
    industry: "Finance & Investments "
  },
  {
    key: "327",
    rank: "324",
    name: "Henry Samueli ",
    netWorth: "$7.3 B",
    age: "67",
    country: "United States",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "328",
    rank: "324",
    name: "Patrick Soon-Shiong ",
    netWorth: "$7.3 B",
    age: "69",
    country: "United States",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "329",
    rank: "330",
    name: "Antonia Ax:son Johnson & family ",
    netWorth: "$7.2 B",
    age: "78",
    country: "Sweden",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "330",
    rank: "330",
    name: "Michael Kadoorie ",
    netWorth: "$7.2 B",
    age: "80",
    country: "Hong Kong",
    source: "hotels, energy",
    industry: "Energy "
  },
  {
    key: "331",
    rank: "330",
    name: "Lin Shu-hong ",
    netWorth: "$7.2 B",
    age: "93",
    country: "Taiwan",
    source: "petrochemicals",
    industry: "Manufacturing "
  },
  {
    key: "332",
    rank: "330",
    name: "Niels Peter Louis-Hansen ",
    netWorth: "$7.2 B",
    age: "74",
    country: "Denmark",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "333",
    rank: "330",
    name: "Reinhold Schmieding ",
    netWorth: "$7.2 B",
    age: "67",
    country: "United States",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "334",
    rank: "330",
    name: "Wee Cho Yaw ",
    netWorth: "$7.2 B",
    age: "93",
    country: "Singapore",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "335",
    rank: "336",
    name: "Silvio Berlusconi & family ",
    netWorth: "$7.1 B",
    age: "85",
    country: "Italy",
    source: "media",
    industry: "Diversified "
  },
  {
    key: "336",
    rank: "336",
    name: "Arthur Blank ",
    netWorth: "$7.1 B",
    age: "79",
    country: "United States",
    source: "Home Depot",
    industry: "Sports "
  },
  {
    key: "337",
    rank: "336",
    name: "Qian Dongqi & family ",
    netWorth: "$7.1 B",
    age: "64",
    country: "China",
    source: "home-cleaning robots",
    industry: "Manufacturing "
  },
  {
    key: "338",
    rank: "336",
    name: "J. Christopher Reyes ",
    netWorth: "$7.1 B",
    age: "68",
    country: "United States",
    source: "food distribution",
    industry: "Food & Beverage "
  },
  {
    key: "339",
    rank: "336",
    name: "Jude Reyes ",
    netWorth: "$7.1 B",
    age: "66",
    country: "United States",
    source: "food distribution",
    industry: "Food & Beverage "
  },
  {
    key: "340",
    rank: "336",
    name: "Nik Storonsky ",
    netWorth: "$7.1 B",
    age: "37",
    country: "United Kingdom",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "341",
    rank: "336",
    name: "Zhou Qunfei & family ",
    netWorth: "$7.1 B",
    age: "52",
    country: "Hong Kong",
    source: "smartphone screens",
    industry: "Technology "
  },
  {
    key: "342",
    rank: "343",
    name: "Deng Weiming & family ",
    netWorth: "$7 B",
    age: "53",
    country: "China",
    source: "battery components",
    industry: "Manufacturing "
  },
  {
    key: "343",
    rank: "343",
    name: "Judy Faulkner ",
    netWorth: "$7 B",
    age: "78",
    country: "United States",
    source: "health IT",
    industry: "Technology "
  },
  {
    key: "344",
    rank: "343",
    name: "Robin Li ",
    netWorth: "$7 B",
    age: "53",
    country: "China",
    source: "internet search",
    industry: "Technology "
  },
  {
    key: "345",
    rank: "343",
    name: "Carrie Perrodo & family ",
    netWorth: "$7 B",
    age: "71",
    country: "France",
    source: "oil",
    industry: "Energy "
  },
  {
    key: "346",
    rank: "343",
    name: "David Reuben ",
    netWorth: "$7 B",
    age: "83",
    country: "United Kingdom",
    source: "investments, real estate",
    industry: "Real Estate "
  },
  {
    key: "347",
    rank: "343",
    name: "Simon Reuben ",
    netWorth: "$7 B",
    age: "80",
    country: "United Kingdom",
    source: "real estate, investments",
    industry: "Diversified "
  },
  {
    key: "348",
    rank: "343",
    name: "Seo Jung-jin ",
    netWorth: "$7 B",
    age: "64",
    country: "South Korea",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "349",
    rank: "350",
    name: "Roman Abramovich ",
    netWorth: "$6.9 B",
    age: "55",
    country: "Russia",
    source: "steel, investments",
    industry: "Diversified "
  },
  {
    key: "350",
    rank: "350",
    name: "Micky Arison ",
    netWorth: "$6.9 B",
    age: "72",
    country: "United States",
    source: "Carnival Cruises",
    industry: "Service "
  },
  {
    key: "351",
    rank: "350",
    name: "Edythe Broad & family ",
    netWorth: "$6.9 B",
    age: "86",
    country: "United States",
    source: "homebuilding, insurance",
    industry: "Diversified "
  },
  {
    key: "352",
    rank: "350",
    name: "Terry Gou ",
    netWorth: "$6.9 B",
    age: "71",
    country: "Taiwan",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "353",
    rank: "350",
    name: "Jiang Bin ",
    netWorth: "$6.9 B",
    age: "55",
    country: "China",
    source: "acoustic components",
    industry: "Technology "
  },
  {
    key: "354",
    rank: "350",
    name: "Vinod Khosla ",
    netWorth: "$6.9 B",
    age: "67",
    country: "United States",
    source: "venture capital",
    industry: "Technology "
  },
  {
    key: "355",
    rank: "350",
    name: "Ralph Lauren ",
    netWorth: "$6.9 B",
    age: "82",
    country: "United States",
    source: "apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "356",
    rank: "350",
    name: "Douglas Leone ",
    netWorth: "$6.9 B",
    age: "64",
    country: "United States",
    source: "venture capital",
    industry: "Finance & Investments "
  },
  {
    key: "357",
    rank: "350",
    name: "Lucia Maggi & family ",
    netWorth: "$6.9 B",
    age: "89",
    country: "Brazil",
    source: "agribusiness",
    industry: "Diversified "
  },
  {
    key: "358",
    rank: "350",
    name: "Horst Julius Pudwill ",
    netWorth: "$6.9 B",
    age: "77",
    country: "Germany",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "359",
    rank: "350",
    name: "Abdulsamad Rabiu ",
    netWorth: "$6.9 B",
    age: "61",
    country: "Nigeria",
    source: "cement, sugar",
    industry: "Diversified "
  },
  {
    key: "360",
    rank: "350",
    name: "Harry Stine ",
    netWorth: "$6.9 B",
    age: "80",
    country: "United States",
    source: "agriculture",
    industry: "Food & Beverage "
  },
  {
    key: "361",
    rank: "350",
    name: "Dennis Washington ",
    netWorth: "$6.9 B",
    age: "87",
    country: "United States",
    source: "construction, mining",
    industry: "Logistics "
  },
  {
    key: "362",
    rank: "363",
    name: "Hasmukh Chudgar & family ",
    netWorth: "$6.8 B",
    age: "88",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "363",
    rank: "363",
    name: "Stanley Druckenmiller ",
    netWorth: "$6.8 B",
    age: "68",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "364",
    rank: "363",
    name: "Jonathan Gray ",
    netWorth: "$6.8 B",
    age: "52",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "365",
    rank: "363",
    name: "Kwon Hyuk-bin ",
    netWorth: "$6.8 B",
    age: "48",
    country: "South Korea",
    source: "online games",
    industry: "Technology "
  },
  {
    key: "366",
    rank: "363",
    name: "Frank Lowy ",
    netWorth: "$6.8 B",
    age: "91",
    country: "Australia",
    source: "shopping malls",
    industry: "Real Estate "
  },
  {
    key: "367",
    rank: "363",
    name: "Ronda Stryker ",
    netWorth: "$6.8 B",
    age: "67",
    country: "United States",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "368",
    rank: "369",
    name: "Alejandro Bailleres Gual & siblings ",
    netWorth: "$6.7 B",
    age: "61",
    country: "Mexico",
    source: "mining",
    industry: "Diversified "
  },
  {
    key: "369",
    rank: "369",
    name: "Benu Gopal Bangur ",
    netWorth: "$6.7 B",
    age: "90",
    country: "India",
    source: "cement",
    industry: "Manufacturing "
  },
  {
    key: "370",
    rank: "369",
    name: "James Goodnight ",
    netWorth: "$6.7 B",
    age: "79",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "371",
    rank: "369",
    name: "Alain Merieux & family ",
    netWorth: "$6.7 B",
    age: "84",
    country: "France",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "372",
    rank: "369",
    name: "Enrique Razon Jr. ",
    netWorth: "$6.7 B",
    age: "62",
    country: "Philippines",
    source: "ports",
    industry: "Logistics "
  },
  {
    key: "373",
    rank: "369",
    name: "Robert F. Smith ",
    netWorth: "$6.7 B",
    age: "59",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "374",
    rank: "375",
    name: "Brian Armstrong ",
    netWorth: "$6.6 B",
    age: "39",
    country: "United States",
    source: "cryptocurrency",
    industry: "Finance & Investments "
  },
  {
    key: "375",
    rank: "375",
    name: "Dannine Avara ",
    netWorth: "$6.6 B",
    age: "58",
    country: "United States",
    source: "pipelines",
    industry: "Energy "
  },
  {
    key: "376",
    rank: "375",
    name: "Patrick Drahi ",
    netWorth: "$6.6 B",
    age: "58",
    country: "France",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "377",
    rank: "375",
    name: "Scott Duncan ",
    netWorth: "$6.6 B",
    age: "39",
    country: "United States",
    source: "pipelines",
    industry: "Energy "
  },
  {
    key: "378",
    rank: "375",
    name: "Milane Frantz ",
    netWorth: "$6.6 B",
    age: "52",
    country: "United States",
    source: "pipelines",
    industry: "Energy "
  },
  {
    key: "379",
    rank: "375",
    name: "Andreas Halvorsen ",
    netWorth: "$6.6 B",
    age: "60",
    country: "Norway",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "380",
    rank: "375",
    name: "Law Kar Po ",
    netWorth: "$6.6 B",
    age: "73",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "381",
    rank: "375",
    name: "Nicolas Puech ",
    netWorth: "$6.6 B",
    age: "79",
    country: "France",
    source: "Hermes",
    industry: "Fashion & Retail "
  },
  {
    key: "382",
    rank: "375",
    name: "Viktor Rashnikov ",
    netWorth: "$6.6 B",
    age: "73",
    country: "Russia",
    source: "steel",
    industry: "Manufacturing "
  },
  {
    key: "383",
    rank: "375",
    name: "Dmitry Rybolovlev ",
    netWorth: "$6.6 B",
    age: "55",
    country: "Russia",
    source: "fertilizer",
    industry: "Manufacturing "
  },
  {
    key: "384",
    rank: "375",
    name: "Randa Duncan Williams ",
    netWorth: "$6.6 B",
    age: "60",
    country: "United States",
    source: "pipelines",
    industry: "Energy "
  },
  {
    key: "385",
    rank: "386",
    name: "Chen Jianhua ",
    netWorth: "$6.5 B",
    age: "51",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "386",
    rank: "386",
    name: "John Grayken ",
    netWorth: "$6.5 B",
    age: "65",
    country: "Ireland",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "387",
    rank: "386",
    name: "Ray Lee Hunt ",
    netWorth: "$6.5 B",
    age: "78",
    country: "United States",
    source: "oil, real estate",
    industry: "Energy "
  },
  {
    key: "388",
    rank: "386",
    name: "Philippe Laffont ",
    netWorth: "$6.5 B",
    age: "54",
    country: "United States",
    source: "hedge fund",
    industry: "Finance & Investments "
  },
  {
    key: "389",
    rank: "386",
    name: "Henry Nicholas, III. ",
    netWorth: "$6.5 B",
    age: "62",
    country: "United States",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "390",
    rank: "386",
    name: "Axel Oberwelland & siblings ",
    netWorth: "$6.5 B",
    age: "55",
    country: "Germany",
    source: "candy",
    industry: "Food & Beverage "
  },
  {
    key: "391",
    rank: "386",
    name: "Cliff Obrecht ",
    netWorth: "$6.5 B",
    age: "36",
    country: "Australia",
    source: "software",
    industry: "Technology "
  },
  {
    key: "392",
    rank: "386",
    name: "John Overdeck ",
    netWorth: "$6.5 B",
    age: "52",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "393",
    rank: "386",
    name: "Melanie Perkins ",
    netWorth: "$6.5 B",
    age: "34",
    country: "Australia",
    source: "software",
    industry: "Technology "
  },
  {
    key: "394",
    rank: "386",
    name: "Ruan Hongliang & family ",
    netWorth: "$6.5 B",
    age: "61",
    country: "China",
    source: "glass",
    industry: "Manufacturing "
  },
  {
    key: "395",
    rank: "386",
    name: "David Siegel ",
    netWorth: "$6.5 B",
    age: "60",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "396",
    rank: "386",
    name: "David Velez ",
    netWorth: "$6.5 B",
    age: "40",
    country: "Colombia",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "397",
    rank: "398",
    name: "Juergen Blickle ",
    netWorth: "$6.4 B",
    age: "75",
    country: "Germany",
    source: "auto parts",
    industry: "Manufacturing "
  },
  {
    key: "398",
    rank: "398",
    name: "Cheng Xue ",
    netWorth: "$6.4 B",
    age: "52",
    country: "China",
    source: "soy sauce",
    industry: "Food & Beverage "
  },
  {
    key: "399",
    rank: "398",
    name: "Jack Dangermond ",
    netWorth: "$6.4 B",
    age: "76",
    country: "United States",
    source: "mapping software",
    industry: "Technology "
  },
  {
    key: "400",
    rank: "398",
    name: "Jiang Weiping & family ",
    netWorth: "$6.4 B",
    age: "67",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "401",
    rank: "398",
    name: "Takahisa Takahara ",
    netWorth: "$6.4 B",
    age: "60",
    country: "Japan",
    source: "personal care goods",
    industry: "Fashion & Retail "
  },
  {
    key: "402",
    rank: "403",
    name: "Orlando Bravo ",
    netWorth: "$6.3 B",
    age: "51",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "403",
    rank: "403",
    name: "Hong Ra-hee ",
    netWorth: "$6.3 B",
    age: "76",
    country: "South Korea",
    source: "Samsung",
    industry: "Technology "
  },
  {
    key: "404",
    rank: "403",
    name: "Edward Johnson, IV. ",
    netWorth: "$6.3 B",
    age: "57",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "405",
    rank: "403",
    name: "Li Xiaohua & family ",
    netWorth: "$6.3 B",
    age: "60",
    country: "China",
    source: "packaging",
    industry: "Manufacturing "
  },
  {
    key: "406",
    rank: "403",
    name: "Sri Prakash Lohia ",
    netWorth: "$6.3 B",
    age: "69",
    country: "Indonesia",
    source: "petrochemicals",
    industry: "Manufacturing "
  },
  {
    key: "407",
    rank: "403",
    name: "Miao Hangen ",
    netWorth: "$6.3 B",
    age: "57",
    country: "China",
    source: "textiles, petrochemicals",
    industry: "Diversified "
  },
  {
    key: "408",
    rank: "403",
    name: "Bobby Murphy ",
    netWorth: "$6.3 B",
    age: "33",
    country: "United States",
    source: "Snapchat",
    industry: "Technology "
  },
  {
    key: "409",
    rank: "403",
    name: "Wu Jianshu ",
    netWorth: "$6.3 B",
    age: "58",
    country: "Hong Kong",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "410",
    rank: "411",
    name: "Maria Asuncion Aramburuzabala & family ",
    netWorth: "$6.2 B",
    age: "58",
    country: "Mexico",
    source: "beer, investments",
    industry: "Food & Beverage "
  },
  {
    key: "411",
    rank: "411",
    name: "Melinda French Gates ",
    netWorth: "$6.2 B",
    age: "57",
    country: "United States",
    source: "Microsoft",
    industry: "Technology "
  },
  {
    key: "412",
    rank: "411",
    name: "Bruce Kovner ",
    netWorth: "$6.2 B",
    age: "77",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "413",
    rank: "411",
    name: "Pham Nhat Vuong ",
    netWorth: "$6.2 B",
    age: "53",
    country: "Vietnam",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "414",
    rank: "411",
    name: "Michal Solowow ",
    netWorth: "$6.2 B",
    age: "59",
    country: "Poland",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "415",
    rank: "411",
    name: "Leonard Stern ",
    netWorth: "$6.2 B",
    age: "84",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "416",
    rank: "411",
    name: "Stef Wertheimer & family ",
    netWorth: "$6.2 B",
    age: "95",
    country: "Israel",
    source: "metalworking tools",
    industry: "Manufacturing "
  },
  {
    key: "417",
    rank: "418",
    name: "Rocco Commisso ",
    netWorth: "$6.1 B",
    age: "72",
    country: "United States",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "418",
    rank: "418",
    name: "Jack Dorsey ",
    netWorth: "$6.1 B",
    age: "45",
    country: "United States",
    source: "Twitter, Square",
    industry: "Technology "
  },
  {
    key: "419",
    rank: "418",
    name: "Lin Li ",
    netWorth: "$6.1 B",
    age: "58",
    country: "China",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "420",
    rank: "418",
    name: "George Lucas ",
    netWorth: "$6.1 B",
    age: "77",
    country: "United States",
    source: "Star Wars",
    industry: "Media & Entertainment "
  },
  {
    key: "421",
    rank: "418",
    name: "Evan Spiegel ",
    netWorth: "$6.1 B",
    age: "31",
    country: "United States",
    source: "Snapchat",
    industry: "Technology "
  },
  {
    key: "422",
    rank: "418",
    name: "Zhao Yan ",
    netWorth: "$6.1 B",
    age: "55",
    country: "China",
    source: "biotech",
    industry: "Diversified "
  },
  {
    key: "423",
    rank: "424",
    name: "Tom Gores ",
    netWorth: "$6 B",
    age: "57",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "424",
    rank: "424",
    name: "Leo Koguan ",
    netWorth: "$6 B",
    age: "67",
    country: "United States",
    source: "IT provider",
    industry: "Technology "
  },
  {
    key: "425",
    rank: "424",
    name: "Alexei Kuzmichev ",
    netWorth: "$6 B",
    age: "59",
    country: "Russia",
    source: "oil, banking, telecom",
    industry: "Energy "
  },
  {
    key: "426",
    rank: "424",
    name: "Fredrik Lundberg ",
    netWorth: "$6 B",
    age: "70",
    country: "Sweden",
    source: "real estate, investments",
    industry: "Real Estate "
  },
  {
    key: "427",
    rank: "424",
    name: "John Morris ",
    netWorth: "$6 B",
    age: "74",
    country: "United States",
    source: "sporting goods retail",
    industry: "Fashion & Retail "
  },
  {
    key: "428",
    rank: "424",
    name: "Ivar Tollefsen ",
    netWorth: "$6 B",
    age: "60",
    country: "Norway",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "429",
    rank: "424",
    name: "John, Alan & Bruce Wilson ",
    netWorth: "$6 B",
    age: "64",
    country: "Australia",
    source: "retailing",
    industry: "Fashion & Retail "
  },
  {
    key: "430",
    rank: "431",
    name: "Stephen Bisciotti ",
    netWorth: "$5.9 B",
    age: "61",
    country: "United States",
    source: "staffing, Baltimore Ravens",
    industry: "Sports "
  },
  {
    key: "431",
    rank: "431",
    name: "Mahendra Choksi & family ",
    netWorth: "$5.9 B",
    age: "80",
    country: "India",
    source: "paints",
    industry: "Manufacturing "
  },
  {
    key: "432",
    rank: "431",
    name: "Jian Jun ",
    netWorth: "$5.9 B",
    age: "58",
    country: "China",
    source: "biomedical products",
    industry: "Healthcare "
  },
  {
    key: "433",
    rank: "431",
    name: "Barry Lam ",
    netWorth: "$5.9 B",
    age: "72",
    country: "Taiwan",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "434",
    rank: "431",
    name: "Michael Moritz ",
    netWorth: "$5.9 B",
    age: "67",
    country: "United States",
    source: "venture capital",
    industry: "Technology "
  },
  {
    key: "435",
    rank: "431",
    name: "Teh Hong Piow ",
    netWorth: "$5.9 B",
    age: "92",
    country: "Malaysia",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "436",
    rank: "431",
    name: "Gary Wang ",
    netWorth: "$5.9 B",
    age: "28",
    country: "United States",
    source: "cryptocurrency exchange",
    industry: "Finance & Investments "
  },
  {
    key: "437",
    rank: "438",
    name: "Andre Esteves ",
    netWorth: "$5.8 B",
    age: "53",
    country: "Brazil",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "438",
    rank: "438",
    name: "Joshua Harris ",
    netWorth: "$5.8 B",
    age: "57",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "439",
    rank: "438",
    name: "Rakesh Jhunjhunwala ",
    netWorth: "$5.8 B",
    age: "61",
    country: "India",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "440",
    rank: "438",
    name: "Ken Langone ",
    netWorth: "$5.8 B",
    age: "86",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "441",
    rank: "438",
    name: "Ludwig Merckle ",
    netWorth: "$5.8 B",
    age: "57",
    country: "Germany",
    source: "pharmaceuticals",
    industry: "Finance & Investments "
  },
  {
    key: "442",
    rank: "438",
    name: "Sandra Ortega Mera ",
    netWorth: "$5.8 B",
    age: "53",
    country: "Spain",
    source: "Zara",
    industry: "Fashion & Retail "
  },
  {
    key: "443",
    rank: "438",
    name: "Terrence Pegula ",
    netWorth: "$5.8 B",
    age: "71",
    country: "United States",
    source: "natural gas",
    industry: "Energy "
  },
  {
    key: "444",
    rank: "438",
    name: "Karen Pritzker ",
    netWorth: "$5.8 B",
    age: "64",
    country: "United States",
    source: "hotels, investments",
    industry: "Finance & Investments "
  },
  {
    key: "445",
    rank: "438",
    name: "Mitchell Rales ",
    netWorth: "$5.8 B",
    age: "65",
    country: "United States",
    source: "manufacturing, investments",
    industry: "Manufacturing "
  },
  {
    key: "446",
    rank: "438",
    name: "Wolfgang Reimann ",
    netWorth: "$5.8 B",
    age: "69",
    country: "Germany",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "447",
    rank: "438",
    name: "Matthias Reimann-Andersen ",
    netWorth: "$5.8 B",
    age: "57",
    country: "Germany",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "448",
    rank: "438",
    name: "Stefan Reimann-Andersen ",
    netWorth: "$5.8 B",
    age: "58",
    country: "Germany",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "449",
    rank: "438",
    name: "Renate Reimann-Haas ",
    netWorth: "$5.8 B",
    age: "70",
    country: "Germany",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "450",
    rank: "438",
    name: "Ruan Liping ",
    netWorth: "$5.8 B",
    age: "58",
    country: "Hong Kong",
    source: "power strips",
    industry: "Manufacturing "
  },
  {
    key: "451",
    rank: "438",
    name: "Ruan Xueping ",
    netWorth: "$5.8 B",
    age: "50",
    country: "Hong Kong",
    source: "power strip",
    industry: "Manufacturing "
  },
  {
    key: "452",
    rank: "438",
    name: "Charles Simonyi ",
    netWorth: "$5.8 B",
    age: "73",
    country: "United States",
    source: "Microsoft",
    industry: "Technology "
  },
  {
    key: "453",
    rank: "438",
    name: "John A. Sobrato & family ",
    netWorth: "$5.8 B",
    age: "82",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "454",
    rank: "438",
    name: "David Steward ",
    netWorth: "$5.8 B",
    age: "70",
    country: "United States",
    source: "IT provider",
    industry: "Technology "
  },
  {
    key: "455",
    rank: "438",
    name: "Radovan Vitek ",
    netWorth: "$5.8 B",
    age: "50",
    country: "Czechia",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "456",
    rank: "438",
    name: "Les Wexner & family ",
    netWorth: "$5.8 B",
    age: "84",
    country: "United States",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "457",
    rank: "438",
    name: "Aloys Wobben ",
    netWorth: "$5.8 B",
    age: "70",
    country: "Germany",
    source: "wind turbines",
    industry: "Energy "
  },
  {
    key: "458",
    rank: "438",
    name: "Sam Zell ",
    netWorth: "$5.8 B",
    age: "80",
    country: "United States",
    source: "real estate, private equity",
    industry: "Real Estate "
  },
  {
    key: "459",
    rank: "460",
    name: "Anthony Bamford & family ",
    netWorth: "$5.7 B",
    age: "76",
    country: "United Kingdom",
    source: "construction equipment",
    industry: "Construction & Engineering "
  },
  {
    key: "460",
    rank: "460",
    name: "Rainer Blickle ",
    netWorth: "$5.7 B",
    age: "74",
    country: "Germany",
    source: "auto parts",
    industry: "Manufacturing "
  },
  {
    key: "461",
    rank: "460",
    name: "Clive Calder ",
    netWorth: "$5.7 B",
    age: "75",
    country: "United Kingdom",
    source: "record label",
    industry: "Media & Entertainment "
  },
  {
    key: "462",
    rank: "460",
    name: "Frits Goldschmeding ",
    netWorth: "$5.7 B",
    age: "88",
    country: "Netherlands",
    source: "temp agency",
    industry: "Service "
  },
  {
    key: "463",
    rank: "460",
    name: "Ananda Krishnan ",
    netWorth: "$5.7 B",
    age: "84",
    country: "Malaysia",
    source: "telecoms, media, oil-services",
    industry: "Telecom "
  },
  {
    key: "464",
    rank: "460",
    name: "Joe Mansueto ",
    netWorth: "$5.7 B",
    age: "65",
    country: "United States",
    source: "investment research",
    industry: "Finance & Investments "
  },
  {
    key: "465",
    rank: "460",
    name: "Odd Reitan & family ",
    netWorth: "$5.7 B",
    age: "70",
    country: "Norway",
    source: "retail, real estate",
    industry: "Fashion & Retail "
  },
  {
    key: "466",
    rank: "460",
    name: "Antony Ressler ",
    netWorth: "$5.7 B",
    age: "60",
    country: "United States",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "467",
    rank: "460",
    name: "Tang Xiao'ou ",
    netWorth: "$5.7 B",
    age: "54",
    country: "Hong Kong",
    source: "software",
    industry: "Technology "
  },
  {
    key: "468",
    rank: "460",
    name: "Tse Ping ",
    netWorth: "$5.7 B",
    age: "70",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "469",
    rank: "460",
    name: "Ken Xie ",
    netWorth: "$5.7 B",
    age: "59",
    country: "United States",
    source: "cybersecurity",
    industry: "Technology "
  },
  {
    key: "470",
    rank: "471",
    name: "Tilman Fertitta ",
    netWorth: "$5.6 B",
    age: "64",
    country: "United States",
    source: "Houston Rockets, entertainment",
    industry: "Food & Beverage "
  },
  {
    key: "471",
    rank: "471",
    name: "Prajogo Pangestu ",
    netWorth: "$5.6 B",
    age: "77",
    country: "Indonesia",
    source: "petrochemicals",
    industry: "Diversified "
  },
  {
    key: "472",
    rank: "471",
    name: "Edward Roski, Jr. ",
    netWorth: "$5.6 B",
    age: "83",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "473",
    rank: "471",
    name: "Teddy Sagi ",
    netWorth: "$5.6 B",
    age: "50",
    country: "Israel",
    source: "gambling software",
    industry: "Gambling & Casinos "
  },
  {
    key: "474",
    rank: "471",
    name: "Thomas Straumann ",
    netWorth: "$5.6 B",
    age: "58",
    country: "Switzerland",
    source: "dental implants",
    industry: "Healthcare "
  },
  {
    key: "475",
    rank: "471",
    name: "David Sun ",
    netWorth: "$5.6 B",
    age: "70",
    country: "United States",
    source: "computer hardware",
    industry: "Technology "
  },
  {
    key: "476",
    rank: "471",
    name: "John Tu ",
    netWorth: "$5.6 B",
    age: "80",
    country: "United States",
    source: "computer hardware",
    industry: "Technology "
  },
  {
    key: "477",
    rank: "471",
    name: "Erich Wesjohann & family ",
    netWorth: "$5.6 B",
    age: "76",
    country: "Germany",
    source: "poultry genetics",
    industry: "Food & Beverage "
  },
  {
    key: "478",
    rank: "471",
    name: "Xu Jinfu ",
    netWorth: "$5.6 B",
    age: "58",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "479",
    rank: "480",
    name: "Alexander Abramov ",
    netWorth: "$5.5 B",
    age: "63",
    country: "Russia",
    source: "steel, mining",
    industry: "Metals & Mining "
  },
  {
    key: "480",
    rank: "480",
    name: "Neil Bluhm ",
    netWorth: "$5.5 B",
    age: "84",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "481",
    rank: "480",
    name: "Don Hankey ",
    netWorth: "$5.5 B",
    age: "78",
    country: "United States",
    source: "auto loans",
    industry: "Finance & Investments "
  },
  {
    key: "482",
    rank: "480",
    name: "Kwee brothers ",
    netWorth: "$5.5 B",
    age: "64",
    country: "Singapore",
    source: "Real Estate",
    industry: "Real Estate "
  },
  {
    key: "483",
    rank: "480",
    name: "Jane Lauder ",
    netWorth: "$5.5 B",
    age: "49",
    country: "United States",
    source: "Estée Lauder",
    industry: "Fashion & Retail "
  },
  {
    key: "484",
    rank: "480",
    name: "Gwendolyn Sontheim Meyer ",
    netWorth: "$5.5 B",
    age: "60",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "485",
    rank: "480",
    name: "John Reece ",
    netWorth: "$5.5 B",
    age: "65",
    country: "United Kingdom",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "486",
    rank: "480",
    name: "Eric Smidt ",
    netWorth: "$5.5 B",
    age: "62",
    country: "United States",
    source: "hardware stores",
    industry: "Fashion & Retail "
  },
  {
    key: "487",
    rank: "480",
    name: "Viktor Vekselberg ",
    netWorth: "$5.5 B",
    age: "64",
    country: "Russia",
    source: "metals, energy",
    industry: "Energy "
  },
  {
    key: "488",
    rank: "480",
    name: "Ronald Wanek ",
    netWorth: "$5.5 B",
    age: "80",
    country: "United States",
    source: "furniture",
    industry: "Manufacturing "
  },
  {
    key: "489",
    rank: "490",
    name: "Rene Benko ",
    netWorth: "$5.4 B",
    age: "45",
    country: "Austria",
    source: "real estate, retail",
    industry: "Real Estate "
  },
  {
    key: "490",
    rank: "490",
    name: "John Brown ",
    netWorth: "$5.4 B",
    age: "87",
    country: "United States",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "491",
    rank: "490",
    name: "Chen Zhiping ",
    netWorth: "$5.4 B",
    age: "46",
    country: "China",
    source: "e-cigarettes",
    industry: "Manufacturing "
  },
  {
    key: "492",
    rank: "490",
    name: "Andrew Currie ",
    netWorth: "$5.4 B",
    age: "66",
    country: "United Kingdom",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "493",
    rank: "490",
    name: "Jim Davis & family ",
    netWorth: "$5.4 B",
    age: "78",
    country: "United States",
    source: "New Balance",
    industry: "Manufacturing "
  },
  {
    key: "494",
    rank: "490",
    name: "Charles Dolan & family ",
    netWorth: "$5.4 B",
    age: "95",
    country: "United States",
    source: "cable television",
    industry: "Media & Entertainment "
  },
  {
    key: "495",
    rank: "490",
    name: "Tom Golisano ",
    netWorth: "$5.4 B",
    age: "80",
    country: "United States",
    source: "payroll services",
    industry: "Service "
  },
  {
    key: "496",
    rank: "490",
    name: "Hui Wing Mau ",
    netWorth: "$5.4 B",
    age: "71",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "497",
    rank: "490",
    name: "Daniel Kretinsky ",
    netWorth: "$5.4 B",
    age: "46",
    country: "Czechia",
    source: "energy, investments",
    industry: "Energy "
  },
  {
    key: "498",
    rank: "490",
    name: "Massimiliana Landini Aleotti & family ",
    netWorth: "$5.4 B",
    age: "79",
    country: "Italy",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "499",
    rank: "490",
    name: "Joe Lewis ",
    netWorth: "$5.4 B",
    age: "85",
    country: "United Kingdom",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "500",
    rank: "490",
    name: "Li Chunan ",
    netWorth: "$5.4 B",
    age: "53",
    country: "China",
    source: "renewable energy",
    industry: "Manufacturing "
  },
  {
    key: "501",
    rank: "490",
    name: "Lin Muqin & family ",
    netWorth: "$5.4 B",
    age: "58",
    country: "China",
    source: "beverages",
    industry: "Food & Beverage "
  },
  {
    key: "502",
    rank: "490",
    name: "Shigenobu Nagamori ",
    netWorth: "$5.4 B",
    age: "77",
    country: "Japan",
    source: "motors",
    industry: "Manufacturing "
  },
  {
    key: "503",
    rank: "490",
    name: "Kjell Inge Rokke ",
    netWorth: "$5.4 B",
    age: "63",
    country: "Norway",
    source: "shipping, seafood",
    industry: "Logistics "
  },
  {
    key: "504",
    rank: "490",
    name: "Wang Wenjing ",
    netWorth: "$5.4 B",
    age: "57",
    country: "China",
    source: "business software",
    industry: "Technology "
  },
  {
    key: "505",
    rank: "490",
    name: "Chris Xu ",
    netWorth: "$5.4 B",
    age: "38",
    country: "China",
    source: "e-commerce",
    industry: "Fashion & Retail "
  },
  {
    key: "506",
    rank: "490",
    name: "Samuel Yin ",
    netWorth: "$5.4 B",
    age: "71",
    country: "Taiwan",
    source: "retail",
    industry: "Diversified "
  },
  {
    key: "507",
    rank: "490",
    name: "M.A. Yusuff Ali ",
    netWorth: "$5.4 B",
    age: "66",
    country: "India",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "508",
    rank: "509",
    name: "Denise Coates ",
    netWorth: "$5.3 B",
    age: "54",
    country: "United Kingdom",
    source: "online gambling",
    industry: "Gambling & Casinos "
  },
  {
    key: "509",
    rank: "509",
    name: "Ken Fisher ",
    netWorth: "$5.3 B",
    age: "71",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "510",
    rank: "509",
    name: "Peter Grogg ",
    netWorth: "$5.3 B",
    age: "80",
    country: "Switzerland",
    source: "biochemicals",
    industry: "Healthcare "
  },
  {
    key: "511",
    rank: "509",
    name: "Dietmar Hopp & family ",
    netWorth: "$5.3 B",
    age: "81",
    country: "Germany",
    source: "software",
    industry: "Technology "
  },
  {
    key: "512",
    rank: "509",
    name: "Sumet Jiaravanon ",
    netWorth: "$5.3 B",
    age: "87",
    country: "Thailand",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "513",
    rank: "509",
    name: "Nathan Kirsh ",
    netWorth: "$5.3 B",
    age: "90",
    country: "Eswatini (Swaziland)",
    source: "retail, real estate",
    industry: "Fashion & Retail "
  },
  {
    key: "514",
    rank: "509",
    name: "Forrest Li ",
    netWorth: "$5.3 B",
    age: "44",
    country: "Singapore",
    source: "gaming",
    industry: "Media & Entertainment "
  },
  {
    key: "515",
    rank: "509",
    name: "Rudolf Maag ",
    netWorth: "$5.3 B",
    age: "76",
    country: "Switzerland",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "516",
    rank: "509",
    name: "Gary Rollins ",
    netWorth: "$5.3 B",
    age: "77",
    country: "United States",
    source: "pest control",
    industry: "Service "
  },
  {
    key: "517",
    rank: "509",
    name: "Ugur Sahin ",
    netWorth: "$5.3 B",
    age: "56",
    country: "Germany",
    source: "biotechnology",
    industry: "Healthcare "
  },
  {
    key: "518",
    rank: "509",
    name: "Mark Scheinberg ",
    netWorth: "$5.3 B",
    age: "48",
    country: "Canada",
    source: "online gambling",
    industry: "Gambling & Casinos "
  },
  {
    key: "519",
    rank: "509",
    name: "Shen Guojun ",
    netWorth: "$5.3 B",
    age: "59",
    country: "China",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "520",
    rank: "509",
    name: "Chip Wilson ",
    netWorth: "$5.3 B",
    age: "65",
    country: "Canada",
    source: "Lululemon",
    industry: "Fashion & Retail "
  },
  {
    key: "521",
    rank: "509",
    name: "Zhang Yong ",
    netWorth: "$5.3 B",
    age: "51",
    country: "Singapore",
    source: "restaurants",
    industry: "Food & Beverage "
  },
  {
    key: "522",
    rank: "523",
    name: "James Chambers ",
    netWorth: "$5.2 B",
    age: "64",
    country: "United States",
    source: "media, automotive",
    industry: "Media & Entertainment "
  },
  {
    key: "523",
    rank: "523",
    name: "Chen Fashu ",
    netWorth: "$5.2 B",
    age: "61",
    country: "China",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "524",
    rank: "523",
    name: "Jaran Chiaravanont ",
    netWorth: "$5.2 B",
    age: "92",
    country: "Thailand",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "525",
    rank: "523",
    name: "Ravi Jaipuria ",
    netWorth: "$5.2 B",
    age: "67",
    country: "India",
    source: "soft drinks, fast food",
    industry: "Food & Beverage "
  },
  {
    key: "526",
    rank: "523",
    name: "Koon Poh Keong ",
    netWorth: "$5.2 B",
    age: "60",
    country: "Malaysia",
    source: "aluminum",
    industry: "Manufacturing "
  },
  {
    key: "527",
    rank: "523",
    name: "Li Liangbin ",
    netWorth: "$5.2 B",
    age: "54",
    country: "China",
    source: "lithium",
    industry: "Manufacturing "
  },
  {
    key: "528",
    rank: "523",
    name: "Liang Feng ",
    netWorth: "$5.2 B",
    age: "53",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "529",
    rank: "523",
    name: "Wolfgang Marguerre & family ",
    netWorth: "$5.2 B",
    age: "80",
    country: "Germany",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "530",
    rank: "523",
    name: "Katharine Rayner ",
    netWorth: "$5.2 B",
    age: "77",
    country: "United States",
    source: "media, automotive",
    industry: "Media & Entertainment "
  },
  {
    key: "531",
    rank: "523",
    name: "Carlos Rodriguez-Pastor ",
    netWorth: "$5.2 B",
    age: "62",
    country: "Peru",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "532",
    rank: "523",
    name: "Margaretta Taylor ",
    netWorth: "$5.2 B",
    age: "79",
    country: "United States",
    source: "media, automotive",
    industry: "Media & Entertainment "
  },
  {
    key: "533",
    rank: "523",
    name: "You Xiaoping ",
    netWorth: "$5.2 B",
    age: "64",
    country: "China",
    source: "chemicals, spandex",
    industry: "Manufacturing "
  },
  {
    key: "534",
    rank: "523",
    name: "Eric Yuan & family ",
    netWorth: "$5.2 B",
    age: "52",
    country: "United States",
    source: "Zoom Video Communications",
    industry: "Technology "
  },
  {
    key: "535",
    rank: "536",
    name: "Robert Bass ",
    netWorth: "$5.1 B",
    age: "74",
    country: "United States",
    source: "oil, investments",
    industry: "Energy "
  },
  {
    key: "536",
    rank: "536",
    name: "Alexandre Behring ",
    netWorth: "$5.1 B",
    age: "55",
    country: "Brazil",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "537",
    rank: "536",
    name: "Chan Laiwa & family ",
    netWorth: "$5.1 B",
    age: "81",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "538",
    rank: "536",
    name: "Jeff Greene ",
    netWorth: "$5.1 B",
    age: "67",
    country: "United States",
    source: "real estate, investments",
    industry: "Real Estate "
  },
  {
    key: "539",
    rank: "536",
    name: "Montri Jiaravanont ",
    netWorth: "$5.1 B",
    age: "91",
    country: "Thailand",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "540",
    rank: "536",
    name: "Charles B. Johnson ",
    netWorth: "$5.1 B",
    age: "89",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "541",
    rank: "536",
    name: "Elizabeth Johnson ",
    netWorth: "$5.1 B",
    age: "58",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "542",
    rank: "536",
    name: "Lin Bin ",
    netWorth: "$5.1 B",
    age: "54",
    country: "United States",
    source: "smartphones",
    industry: "Technology "
  },
  {
    key: "543",
    rank: "536",
    name: "Hiroshi Mikitani ",
    netWorth: "$5.1 B",
    age: "57",
    country: "Japan",
    source: "online retail",
    industry: "Fashion & Retail "
  },
  {
    key: "544",
    rank: "536",
    name: "Isaac Perlmutter ",
    netWorth: "$5.1 B",
    age: "79",
    country: "United States",
    source: "Marvel comics",
    industry: "Media & Entertainment "
  },
  {
    key: "545",
    rank: "536",
    name: "Michael Pieper ",
    netWorth: "$5.1 B",
    age: "76",
    country: "Switzerland",
    source: "kitchen appliances",
    industry: "Manufacturing "
  },
  {
    key: "546",
    rank: "536",
    name: "Issad Rebrab & family ",
    netWorth: "$5.1 B",
    age: "78",
    country: "Algeria",
    source: "food",
    industry: "Food & Beverage "
  },
  {
    key: "547",
    rank: "536",
    name: "Tsai Hong-tu ",
    netWorth: "$5.1 B",
    age: "69",
    country: "Taiwan",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "548",
    rank: "536",
    name: "Richard Tsai ",
    netWorth: "$5.1 B",
    age: "64",
    country: "Taiwan",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "549",
    rank: "536",
    name: "Wang Junshi & family ",
    netWorth: "$5.1 B",
    age: "73",
    country: "China",
    source: "solar inverters",
    industry: "Manufacturing "
  },
  {
    key: "550",
    rank: "536",
    name: "Wang Yanqing & family ",
    netWorth: "$5.1 B",
    age: "55",
    country: "China",
    source: "electrical equipment",
    industry: "Manufacturing "
  },
  {
    key: "551",
    rank: "552",
    name: "Shari Arison ",
    netWorth: "$5 B",
    age: "64",
    country: "Israel",
    source: "Carnival Cruises",
    industry: "Service "
  },
  {
    key: "552",
    rank: "552",
    name: "Alain Bouchard ",
    netWorth: "$5 B",
    age: "73",
    country: "Canada",
    source: "convinience stores",
    industry: "Fashion & Retail "
  },
  {
    key: "553",
    rank: "552",
    name: "Austen Cargill, II. ",
    netWorth: "$5 B",
    age: "71",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "554",
    rank: "552",
    name: "James Cargill, II. ",
    netWorth: "$5 B",
    age: "72",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "555",
    rank: "552",
    name: "Ben Chestnut ",
    netWorth: "$5 B",
    age: "47",
    country: "United States",
    source: "email marketing",
    industry: "Technology "
  },
  {
    key: "556",
    rank: "552",
    name: "Wei Fang ",
    netWorth: "$5 B",
    age: "48",
    country: "China",
    source: "steel",
    industry: "Manufacturing "
  },
  {
    key: "557",
    rank: "552",
    name: "Leonid Fedun ",
    netWorth: "$5 B",
    age: "66",
    country: "Russia",
    source: "oil",
    industry: "Energy "
  },
  {
    key: "558",
    rank: "552",
    name: "Johann Graf ",
    netWorth: "$5 B",
    age: "75",
    country: "Austria",
    source: "gambling",
    industry: "Gambling & Casinos "
  },
  {
    key: "559",
    rank: "552",
    name: "Huang Chulong ",
    netWorth: "$5 B",
    age: "63",
    country: "Canada",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "560",
    rank: "552",
    name: "Huang Yi ",
    netWorth: "$5 B",
    age: "60",
    country: "Hong Kong",
    source: "car dealerships",
    industry: "Automotive "
  },
  {
    key: "561",
    rank: "552",
    name: "Vladimir Kim ",
    netWorth: "$5 B",
    age: "61",
    country: "Kazakhstan",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "562",
    rank: "552",
    name: "Dan Kurzius ",
    netWorth: "$5 B",
    age: "50",
    country: "United States",
    source: "email marketing",
    industry: "Technology "
  },
  {
    key: "563",
    rank: "552",
    name: "Ronald Lauder ",
    netWorth: "$5 B",
    age: "78",
    country: "United States",
    source: "Estee Lauder",
    industry: "Fashion & Retail "
  },
  {
    key: "564",
    rank: "552",
    name: "Marianne Liebmann ",
    netWorth: "$5 B",
    age: "68",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "565",
    rank: "552",
    name: "Tobi Lutke ",
    netWorth: "$5 B",
    age: "41",
    country: "Canada",
    source: "e-commerce",
    industry: "Technology "
  },
  {
    key: "566",
    rank: "552",
    name: "Thomas Pritzker ",
    netWorth: "$5 B",
    age: "71",
    country: "United States",
    source: "hotels, investments",
    industry: "Finance & Investments "
  },
  {
    key: "567",
    rank: "552",
    name: "Scott Shleifer ",
    netWorth: "$5 B",
    age: "44",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "568",
    rank: "552",
    name: "Autry Stephens ",
    netWorth: "$5 B",
    age: "83",
    country: "United States",
    source: "oil",
    industry: "Energy "
  },
  {
    key: "569",
    rank: "552",
    name: "Peter Thiel ",
    netWorth: "$5 B",
    age: "54",
    country: "United States",
    source: "Facebook, investments",
    industry: "Finance & Investments "
  },
  {
    key: "570",
    rank: "552",
    name: "Tsai Cheng-ta ",
    netWorth: "$5 B",
    age: "72",
    country: "Taiwan",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "571",
    rank: "552",
    name: "Maximilian Viessmann ",
    netWorth: "$5 B",
    age: "64",
    country: "Germany",
    source: "heating, cooling equipment",
    industry: "Manufacturing "
  },
  {
    key: "572",
    rank: "552",
    name: "Hansjoerg Wyss ",
    netWorth: "$5 B",
    age: "87",
    country: "Switzerland",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "573",
    rank: "552",
    name: "Xiao Yongming & family ",
    netWorth: "$5 B",
    age: "57",
    country: "China",
    source: "fertilizer",
    industry: "Diversified "
  },
  {
    key: "574",
    rank: "552",
    name: "Zhang Tao ",
    netWorth: "$5 B",
    age: "49",
    country: "China",
    source: "e-commerce",
    industry: "Fashion & Retail "
  },
  {
    key: "575",
    rank: "552",
    name: "Daniel Ziff ",
    netWorth: "$5 B",
    age: "50",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "576",
    rank: "552",
    name: "Dirk Ziff ",
    netWorth: "$5 B",
    age: "58",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "577",
    rank: "552",
    name: "Robert Ziff ",
    netWorth: "$5 B",
    age: "55",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "578",
    rank: "579",
    name: "Kapil & Rahul Bhatia ",
    netWorth: "$4.9 B",
    age: "64",
    country: "India",
    source: "airlines",
    industry: "Service "
  },
  {
    key: "579",
    rank: "579",
    name: "Mat Ishbia ",
    netWorth: "$4.9 B",
    age: "42",
    country: "United States",
    source: "mortgage lender★",
    industry: "Finance & Investments "
  },
  {
    key: "580",
    rank: "579",
    name: "Robert Rich, Jr. ",
    netWorth: "$4.9 B",
    age: "81",
    country: "United States",
    source: "frozen foods",
    industry: "Food & Beverage "
  },
  {
    key: "581",
    rank: "579",
    name: "Thomas Schmidheiny ",
    netWorth: "$4.9 B",
    age: "76",
    country: "Switzerland",
    source: "cement",
    industry: "Construction & Engineering "
  },
  {
    key: "582",
    rank: "579",
    name: "Alexandra Schoerghuber & family ",
    netWorth: "$4.9 B",
    age: "63",
    country: "Germany",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "583",
    rank: "579",
    name: "Erik Selin ",
    netWorth: "$4.9 B",
    age: "54",
    country: "Sweden",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "584",
    rank: "579",
    name: "Daniel Tsai ",
    netWorth: "$4.9 B",
    age: "65",
    country: "Taiwan",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "585",
    rank: "586",
    name: "Dona Bertarelli ",
    netWorth: "$4.8 B",
    age: "54",
    country: "Switzerland",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "586",
    rank: "586",
    name: "Andrei Guriev & family ",
    netWorth: "$4.8 B",
    age: "62",
    country: "Russia",
    source: "fertilizers",
    industry: "Manufacturing "
  },
  {
    key: "587",
    rank: "586",
    name: "Luciano Hang ",
    netWorth: "$4.8 B",
    age: "59",
    country: "Brazil",
    source: "department stores",
    industry: "Fashion & Retail "
  },
  {
    key: "588",
    rank: "586",
    name: "Hu Baifan ",
    netWorth: "$4.8 B",
    age: "59",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "589",
    rank: "586",
    name: "Bidzina Ivanishvili ",
    netWorth: "$4.8 B",
    age: "66",
    country: "Georgia",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "590",
    rank: "586",
    name: "Yeow Chor & Yeow Seng Lee ",
    netWorth: "$4.8 B",
    age: "64",
    country: "Malaysia",
    source: "palm oil, property",
    industry: "Food & Beverage "
  },
  {
    key: "591",
    rank: "586",
    name: "Leng Youbin ",
    netWorth: "$4.8 B",
    age: "53",
    country: "China",
    source: "infant formula",
    industry: "Food & Beverage "
  },
  {
    key: "592",
    rank: "586",
    name: "Theo Mueller ",
    netWorth: "$4.8 B",
    age: "82",
    country: "Germany",
    source: "dairy",
    industry: "Food & Beverage "
  },
  {
    key: "593",
    rank: "586",
    name: "Julian Robertson, Jr. ",
    netWorth: "$4.8 B",
    age: "89",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "594",
    rank: "586",
    name: "Marc Rowan ",
    netWorth: "$4.8 B",
    age: "59",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "595",
    rank: "586",
    name: "Emanuele (Lino) Saputo & family ",
    netWorth: "$4.8 B",
    age: "85",
    country: "Canada",
    source: "cheese",
    industry: "Food & Beverage "
  },
  {
    key: "596",
    rank: "586",
    name: "Jeff Skoll ",
    netWorth: "$4.8 B",
    age: "57",
    country: "United States",
    source: "eBay",
    industry: "Technology "
  },
  {
    key: "597",
    rank: "586",
    name: "Frank Wang ",
    netWorth: "$4.8 B",
    age: "41",
    country: "China",
    source: "drones",
    industry: "Technology "
  },
  {
    key: "598",
    rank: "586",
    name: "Wang Junlin ",
    netWorth: "$4.8 B",
    age: "59",
    country: "China",
    source: "liquor",
    industry: "Food & Beverage "
  },
  {
    key: "599",
    rank: "586",
    name: "Yang Shaopeng ",
    netWorth: "$4.8 B",
    age: "64",
    country: "China",
    source: "shipping",
    industry: "Logistics "
  },
  {
    key: "600",
    rank: "601",
    name: "Maria Fernanda Amorim & family ",
    netWorth: "$4.7 B",
    age: "87",
    country: "Portugal",
    source: "energy, investments",
    industry: "Diversified "
  },
  {
    key: "601",
    rank: "601",
    name: "Leonid Boguslavsky ",
    netWorth: "$4.7 B",
    age: "70",
    country: "Russia",
    source: "venture capital",
    industry: "Finance & Investments "
  },
  {
    key: "602",
    rank: "601",
    name: "Richard Branson ",
    netWorth: "$4.7 B",
    age: "71",
    country: "United Kingdom",
    source: "Virgin",
    industry: "Diversified "
  },
  {
    key: "603",
    rank: "601",
    name: "Robert Brockman ",
    netWorth: "$4.7 B",
    age: "80",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "604",
    rank: "601",
    name: "Pierre Chen ",
    netWorth: "$4.7 B",
    age: "65",
    country: "Taiwan",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "605",
    rank: "601",
    name: "Chu Mang Yee & family ",
    netWorth: "$4.7 B",
    age: "62",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "606",
    rank: "601",
    name: "Scott Cook ",
    netWorth: "$4.7 B",
    age: "69",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "607",
    rank: "601",
    name: "Mark Cuban ",
    netWorth: "$4.7 B",
    age: "63",
    country: "United States",
    source: "online media, Dallas Mavericks",
    industry: "Media & Entertainment "
  },
  {
    key: "608",
    rank: "601",
    name: "Guenther Fielmann & family ",
    netWorth: "$4.7 B",
    age: "82",
    country: "Germany",
    source: "optometry",
    industry: "Healthcare "
  },
  {
    key: "609",
    rank: "601",
    name: "Martin Haefner ",
    netWorth: "$4.7 B",
    age: "68",
    country: "Switzerland",
    source: "software, investments",
    industry: "Technology "
  },
  {
    key: "610",
    rank: "601",
    name: "Johnelle Hunt ",
    netWorth: "$4.7 B",
    age: "90",
    country: "United States",
    source: "trucking",
    industry: "Logistics "
  },
  {
    key: "611",
    rank: "601",
    name: "Andre Koo, Sr. ",
    netWorth: "$4.7 B",
    age: "54",
    country: "Taiwan",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "612",
    rank: "601",
    name: "Lai Meisong ",
    netWorth: "$4.7 B",
    age: "51",
    country: "China",
    source: "package delivery",
    industry: "Logistics "
  },
  {
    key: "613",
    rank: "601",
    name: "Richard Li ",
    netWorth: "$4.7 B",
    age: "55",
    country: "Hong Kong",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "614",
    rank: "601",
    name: "Mangal Prabhat Lodha ",
    netWorth: "$4.7 B",
    age: "66",
    country: "India",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "615",
    rank: "601",
    name: "Igor Olenicoff ",
    netWorth: "$4.7 B",
    age: "79",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "616",
    rank: "601",
    name: "Mark Shoen ",
    netWorth: "$4.7 B",
    age: "71",
    country: "United States",
    source: "U-Haul",
    industry: "Automotive "
  },
  {
    key: "617",
    rank: "601",
    name: "Andrei Skoch & family ",
    netWorth: "$4.7 B",
    age: "56",
    country: "Russia",
    source: "steel",
    industry: "Metals & Mining "
  },
  {
    key: "618",
    rank: "601",
    name: "Fred Smith ",
    netWorth: "$4.7 B",
    age: "77",
    country: "United States",
    source: "FedEx",
    industry: "Logistics "
  },
  {
    key: "619",
    rank: "601",
    name: "Murat Ulker ",
    netWorth: "$4.7 B",
    age: "63",
    country: "Turkey",
    source: "food",
    industry: "Food & Beverage "
  },
  {
    key: "620",
    rank: "601",
    name: "Yu Yong ",
    netWorth: "$4.7 B",
    age: "61",
    country: "China",
    source: "mining",
    industry: "Finance & Investments "
  },
  {
    key: "621",
    rank: "622",
    name: "Stéphane Bancel ",
    netWorth: "$4.6 B",
    age: "49",
    country: "France",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "622",
    rank: "622",
    name: "Bubba Cathy ",
    netWorth: "$4.6 B",
    age: "67",
    country: "United States",
    source: "Chick-fil-A",
    industry: "Food & Beverage "
  },
  {
    key: "623",
    rank: "622",
    name: "Dan Cathy ",
    netWorth: "$4.6 B",
    age: "69",
    country: "United States",
    source: "Chick-fil-A",
    industry: "Food & Beverage "
  },
  {
    key: "624",
    rank: "622",
    name: "Trudy Cathy White ",
    netWorth: "$4.6 B",
    age: "66",
    country: "United States",
    source: "Chick-fil-A",
    industry: "Food & Beverage "
  },
  {
    key: "625",
    rank: "622",
    name: "Jason Chang ",
    netWorth: "$4.6 B",
    age: "77",
    country: "Singapore",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "626",
    rank: "622",
    name: "Dagmar Dolby & family ",
    netWorth: "$4.6 B",
    age: "80",
    country: "United States",
    source: "Dolby Laboratories",
    industry: "Technology "
  },
  {
    key: "627",
    rank: "622",
    name: "Bruce Flatt ",
    netWorth: "$4.6 B",
    age: "56",
    country: "Canada",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "628",
    rank: "622",
    name: "Masatoshi Ito ",
    netWorth: "$4.6 B",
    age: "97",
    country: "Japan",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "629",
    rank: "622",
    name: "Viatcheslav Kantor ",
    netWorth: "$4.6 B",
    age: "68",
    country: "Russia",
    source: "fertilizer, real estate",
    industry: "Manufacturing "
  },
  {
    key: "630",
    rank: "622",
    name: "Min Kao & family ",
    netWorth: "$4.6 B",
    age: "73",
    country: "United States",
    source: "navigation equipment",
    industry: "Technology "
  },
  {
    key: "631",
    rank: "622",
    name: "Lin Xiucheng & family ",
    netWorth: "$4.6 B",
    age: "66",
    country: "China",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "632",
    rank: "622",
    name: "Sami Mnaymneh ",
    netWorth: "$4.6 B",
    age: "60",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "633",
    rank: "622",
    name: "Tony Tamer ",
    netWorth: "$4.6 B",
    age: "64",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "634",
    rank: "622",
    name: "Richard White ",
    netWorth: "$4.6 B",
    age: "67",
    country: "Australia",
    source: "software",
    industry: "Technology "
  },
  {
    key: "635",
    rank: "622",
    name: "Baoguo Zhu & family ",
    netWorth: "$4.6 B",
    age: "59",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "636",
    rank: "637",
    name: "Michael Ashley ",
    netWorth: "$4.5 B",
    age: "57",
    country: "United Kingdom",
    source: "sports retailing",
    industry: "Fashion & Retail "
  },
  {
    key: "637",
    rank: "637",
    name: "Ron Baron ",
    netWorth: "$4.5 B",
    age: "78",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "638",
    rank: "637",
    name: "Bert Beveridge ",
    netWorth: "$4.5 B",
    age: "60",
    country: "United States",
    source: "vodka",
    industry: "Food & Beverage "
  },
  {
    key: "639",
    rank: "637",
    name: "Todd Boehly ",
    netWorth: "$4.5 B",
    age: "48",
    country: "United States",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "640",
    rank: "637",
    name: "David Bonderman ",
    netWorth: "$4.5 B",
    age: "79",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "641",
    rank: "637",
    name: "Guo Guangchang ",
    netWorth: "$4.5 B",
    age: "55",
    country: "China",
    source: "conglomerate",
    industry: "Diversified "
  },
  {
    key: "642",
    rank: "637",
    name: "Daryl Katz ",
    netWorth: "$4.5 B",
    age: "60",
    country: "Canada",
    source: "pharmacies",
    industry: "Diversified "
  },
  {
    key: "643",
    rank: "637",
    name: "Ted Lerner & family ",
    netWorth: "$4.5 B",
    age: "96",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "644",
    rank: "637",
    name: "Falguni Nayar ",
    netWorth: "$4.5 B",
    age: "59",
    country: "India",
    source: "retailing",
    industry: "Fashion & Retail "
  },
  {
    key: "645",
    rank: "637",
    name: "Trevor Rees-Jones ",
    netWorth: "$4.5 B",
    age: "70",
    country: "United States",
    source: "oil & gas",
    industry: "Energy "
  },
  {
    key: "646",
    rank: "637",
    name: "J. Joe Ricketts & family ",
    netWorth: "$4.5 B",
    age: "80",
    country: "United States",
    source: "TD Ameritrade",
    industry: "Finance & Investments "
  },
  {
    key: "647",
    rank: "637",
    name: "Robert Rowling ",
    netWorth: "$4.5 B",
    age: "68",
    country: "United States",
    source: "hotels, investments",
    industry: "Service "
  },
  {
    key: "648",
    rank: "637",
    name: "Mark Stevens ",
    netWorth: "$4.5 B",
    age: "62",
    country: "United States",
    source: "venture capital",
    industry: "Finance & Investments "
  },
  {
    key: "649",
    rank: "637",
    name: "Gustav Magnar Witzoe ",
    netWorth: "$4.5 B",
    age: "28",
    country: "Norway",
    source: "fish farming",
    industry: "Food & Beverage "
  },
  {
    key: "650",
    rank: "637",
    name: "Xie Liangzhi & family ",
    netWorth: "$4.5 B",
    age: "56",
    country: "China",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "651",
    rank: "637",
    name: "Yeung Kin-man ",
    netWorth: "$4.5 B",
    age: "58",
    country: "Hong Kong",
    source: "electronics",
    industry: "Manufacturing "
  },
  {
    key: "652",
    rank: "637",
    name: "Zhang Hejun ",
    netWorth: "$4.5 B",
    age: "64",
    country: "China",
    source: "electronics",
    industry: "Manufacturing "
  },
  {
    key: "653",
    rank: "654",
    name: "Andrej Babis ",
    netWorth: "$4.4 B",
    age: "67",
    country: "Czechia",
    source: "agriculture",
    industry: "Food & Beverage "
  },
  {
    key: "654",
    rank: "654",
    name: "Giuseppe De'Longhi & family ",
    netWorth: "$4.4 B",
    age: "82",
    country: "Italy",
    source: "coffee makers",
    industry: "Fashion & Retail "
  },
  {
    key: "655",
    rank: "654",
    name: "Barry Diller ",
    netWorth: "$4.4 B",
    age: "80",
    country: "United States",
    source: "online media",
    industry: "Media & Entertainment "
  },
  {
    key: "656",
    rank: "654",
    name: "Christian Haub ",
    netWorth: "$4.4 B",
    age: "57",
    country: "Germany",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "657",
    rank: "654",
    name: "Huang Li ",
    netWorth: "$4.4 B",
    age: "58",
    country: "China",
    source: "imaging systems",
    industry: "Technology "
  },
  {
    key: "658",
    rank: "654",
    name: "Marian Ilitch ",
    netWorth: "$4.4 B",
    age: "89",
    country: "United States",
    source: "Little Caesars",
    industry: "Food & Beverage "
  },
  {
    key: "659",
    rank: "654",
    name: "Suleiman Kerimov & family ",
    netWorth: "$4.4 B",
    age: "56",
    country: "Russia",
    source: "gold",
    industry: "Finance & Investments "
  },
  {
    key: "660",
    rank: "654",
    name: "Edwin Leong ",
    netWorth: "$4.4 B",
    age: "70",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "661",
    rank: "654",
    name: "Lu Yiwen ",
    netWorth: "$4.4 B",
    age: "35",
    country: "China",
    source: "Luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "662",
    rank: "654",
    name: "N.R. Narayana Murthy ",
    netWorth: "$4.4 B",
    age: "75",
    country: "India",
    source: "software services",
    industry: "Technology "
  },
  {
    key: "663",
    rank: "654",
    name: "Yang Jianliang & family ",
    netWorth: "$4.4 B",
    age: "52",
    country: "China",
    source: "machinery",
    industry: "Manufacturing "
  },
  {
    key: "664",
    rank: "665",
    name: "Pyotr Aven ",
    netWorth: "$4.3 B",
    age: "67",
    country: "Russia",
    source: "oil, banking, telecom",
    industry: "Finance & Investments "
  },
  {
    key: "665",
    rank: "665",
    name: "Joesley Batista ",
    netWorth: "$4.3 B",
    age: "50",
    country: "Brazil",
    source: "beef processing",
    industry: "Food & Beverage "
  },
  {
    key: "666",
    rank: "665",
    name: "Wesley Batista ",
    netWorth: "$4.3 B",
    age: "49",
    country: "Brazil",
    source: "beef packing",
    industry: "Food & Beverage "
  },
  {
    key: "667",
    rank: "665",
    name: "Margot Birmingham Perot ",
    netWorth: "$4.3 B",
    age: "88",
    country: "United States",
    source: "computer services, real estate",
    industry: "Technology "
  },
  {
    key: "668",
    rank: "665",
    name: "Rick Caruso ",
    netWorth: "$4.3 B",
    age: "63",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "669",
    rank: "665",
    name: "Jim Davis ",
    netWorth: "$4.3 B",
    age: "62",
    country: "United States",
    source: "staffing & recruiting",
    industry: "Service "
  },
  {
    key: "670",
    rank: "665",
    name: "Walter P.J. Droege ",
    netWorth: "$4.3 B",
    age: "69",
    country: "Germany",
    source: "investing",
    industry: "Finance & Investments "
  },
  {
    key: "671",
    rank: "665",
    name: "Dan Friedkin ",
    netWorth: "$4.3 B",
    age: "57",
    country: "United States",
    source: "Toyota dealerships",
    industry: "Automotive "
  },
  {
    key: "672",
    rank: "665",
    name: "Gao Dekang & family ",
    netWorth: "$4.3 B",
    age: "70",
    country: "China",
    source: "apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "673",
    rank: "665",
    name: "Antti Herlin ",
    netWorth: "$4.3 B",
    age: "65",
    country: "Finland",
    source: "elevators, escalators",
    industry: "Manufacturing "
  },
  {
    key: "674",
    rank: "665",
    name: "W. Herbert Hunt ",
    netWorth: "$4.3 B",
    age: "93",
    country: "United States",
    source: "oil",
    industry: "Energy "
  },
  {
    key: "675",
    rank: "665",
    name: "Jason Jiang ",
    netWorth: "$4.3 B",
    age: "49",
    country: "China",
    source: "advertising",
    industry: "Media & Entertainment "
  },
  {
    key: "676",
    rank: "665",
    name: "Rupert Johnson, Jr. ",
    netWorth: "$4.3 B",
    age: "81",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "677",
    rank: "665",
    name: "Vikram Lal & family ",
    netWorth: "$4.3 B",
    age: "80",
    country: "India",
    source: "motorcycles",
    industry: "Automotive "
  },
  {
    key: "678",
    rank: "665",
    name: "Lam Wai-ying ",
    netWorth: "$4.3 B",
    age: "64",
    country: "Hong Kong",
    source: "smartphone screens",
    industry: "Manufacturing "
  },
  {
    key: "679",
    rank: "665",
    name: "Chris Larsen ",
    netWorth: "$4.3 B",
    age: "61",
    country: "United States",
    source: "cryptocurrency",
    industry: "Finance & Investments "
  },
  {
    key: "680",
    rank: "665",
    name: "Richard Schulze ",
    netWorth: "$4.3 B",
    age: "81",
    country: "United States",
    source: "Best Buy",
    industry: "Fashion & Retail "
  },
  {
    key: "681",
    rank: "665",
    name: "Paul Singer ",
    netWorth: "$4.3 B",
    age: "77",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "682",
    rank: "665",
    name: "Barry Sternlicht ",
    netWorth: "$4.3 B",
    age: "61",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "683",
    rank: "665",
    name: "Su Hua ",
    netWorth: "$4.3 B",
    age: "40",
    country: "China",
    source: "video streaming",
    industry: "Media & Entertainment "
  },
  {
    key: "684",
    rank: "665",
    name: "Mark Walter ",
    netWorth: "$4.3 B",
    age: "61",
    country: "United States",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "685",
    rank: "665",
    name: "Ty Warner ",
    netWorth: "$4.3 B",
    age: "77",
    country: "United States",
    source: "plush toys, real estate",
    industry: "Real Estate "
  },
  {
    key: "686",
    rank: "687",
    name: "Rinat Akhmetov ",
    netWorth: "$4.2 B",
    age: "55",
    country: "Ukraine",
    source: "steel, coal",
    industry: "Metals & Mining "
  },
  {
    key: "687",
    rank: "687",
    name: "Martin & Olivier Bouygues ",
    netWorth: "$4.2 B",
    age: "64",
    country: "France",
    source: "construction, media",
    industry: "Construction & Engineering "
  },
  {
    key: "688",
    rank: "687",
    name: "Bernard Broermann ",
    netWorth: "$4.2 B",
    age: "78",
    country: "Germany",
    source: "hospitals",
    industry: "Healthcare "
  },
  {
    key: "689",
    rank: "687",
    name: "Mong-Koo Chung ",
    netWorth: "$4.2 B",
    age: "84",
    country: "South Korea",
    source: "Hyundai",
    industry: "Automotive "
  },
  {
    key: "690",
    rank: "687",
    name: "Daniel D'Aniello ",
    netWorth: "$4.2 B",
    age: "75",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "691",
    rank: "687",
    name: "Traudl Engelhorn & family ",
    netWorth: "$4.2 B",
    age: "95",
    country: "Germany",
    source: "pharmaceuticals, medical equipment",
    industry: "Healthcare "
  },
  {
    key: "692",
    rank: "687",
    name: "Piero Ferrari ",
    netWorth: "$4.2 B",
    age: "76",
    country: "Italy",
    source: "automobiles",
    industry: "Automotive "
  },
  {
    key: "693",
    rank: "687",
    name: "Carlo Fidani ",
    netWorth: "$4.2 B",
    age: "67",
    country: "Canada",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "694",
    rank: "687",
    name: "Yakir Gabay ",
    netWorth: "$4.2 B",
    age: "55",
    country: "Cyprus",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "695",
    rank: "687",
    name: "Jaime Gilinski Bacal ",
    netWorth: "$4.2 B",
    age: "64",
    country: "Colombia",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "696",
    rank: "687",
    name: "Bertil Hult ",
    netWorth: "$4.2 B",
    age: "81",
    country: "Sweden",
    source: "education",
    industry: "Service "
  },
  {
    key: "697",
    rank: "687",
    name: "Martha Ingram & family ",
    netWorth: "$4.2 B",
    age: "86",
    country: "United States",
    source: "book distribution, transportation",
    industry: "Media & Entertainment "
  },
  {
    key: "698",
    rank: "687",
    name: "Lee Yin Yee ",
    netWorth: "$4.2 B",
    age: "70",
    country: "China",
    source: "glass",
    industry: "Manufacturing "
  },
  {
    key: "699",
    rank: "687",
    name: "Daniel Loeb ",
    netWorth: "$4.2 B",
    age: "60",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "700",
    rank: "687",
    name: "Janice McNair ",
    netWorth: "$4.2 B",
    age: "85",
    country: "United States",
    source: "energy, sports",
    industry: "Sports "
  },
  {
    key: "701",
    rank: "687",
    name: "Ajay Piramal ",
    netWorth: "$4.2 B",
    age: "66",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "702",
    rank: "687",
    name: "Lynsi Snyder ",
    netWorth: "$4.2 B",
    age: "39",
    country: "United States",
    source: "In-N-Out Burger",
    industry: "Food & Beverage "
  },
  {
    key: "703",
    rank: "687",
    name: "Peter Spuhler ",
    netWorth: "$4.2 B",
    age: "62",
    country: "Switzerland",
    source: "train cars",
    industry: "Manufacturing "
  },
  {
    key: "704",
    rank: "687",
    name: "Kerry Stokes ",
    netWorth: "$4.2 B",
    age: "81",
    country: "Australia",
    source: "construction equipment, media",
    industry: "Diversified "
  },
  {
    key: "705",
    rank: "687",
    name: "Jon Stryker ",
    netWorth: "$4.2 B",
    age: "63",
    country: "United States",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "706",
    rank: "687",
    name: "Vincent Viola ",
    netWorth: "$4.2 B",
    age: "66",
    country: "United States",
    source: "electronic trading",
    industry: "Finance & Investments "
  },
  {
    key: "707",
    rank: "687",
    name: "Romesh T. Wadhwani ",
    netWorth: "$4.2 B",
    age: "74",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "708",
    rank: "709",
    name: "Juan Domingo Beckmann Legorreta & family ",
    netWorth: "$4.1 B",
    age: "54",
    country: "Mexico",
    source: "tequila",
    industry: "Food & Beverage "
  },
  {
    key: "709",
    rank: "709",
    name: "Rafael Del Pino ",
    netWorth: "$4.1 B",
    age: "63",
    country: "Spain",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "710",
    rank: "709",
    name: "Sergey Dmitriev ",
    netWorth: "$4.1 B",
    age: "56",
    country: "Russia",
    source: "computer software",
    industry: "Technology "
  },
  {
    key: "711",
    rank: "709",
    name: "Senapathy Gopalakrishnan ",
    netWorth: "$4.1 B",
    age: "67",
    country: "India",
    source: "software services",
    industry: "Technology "
  },
  {
    key: "712",
    rank: "709",
    name: "James Irving ",
    netWorth: "$4.1 B",
    age: "94",
    country: "Canada",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "713",
    rank: "709",
    name: "Lee Boo-jin ",
    netWorth: "$4.1 B",
    age: "51",
    country: "South Korea",
    source: "Samsung",
    industry: "Service "
  },
  {
    key: "714",
    rank: "709",
    name: "Samuel Tak Lee ",
    netWorth: "$4.1 B",
    age: "82",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "715",
    rank: "709",
    name: "Thai Lee ",
    netWorth: "$4.1 B",
    age: "63",
    country: "United States",
    source: "IT provider",
    industry: "Technology "
  },
  {
    key: "716",
    rank: "709",
    name: "Eric Lefkofsky ",
    netWorth: "$4.1 B",
    age: "52",
    country: "United States",
    source: "Groupon, investments",
    industry: "Technology "
  },
  {
    key: "717",
    rank: "709",
    name: "Weiguo Li ",
    netWorth: "$4.1 B",
    age: "57",
    country: "China",
    source: "construction materials",
    industry: "Manufacturing "
  },
  {
    key: "718",
    rank: "709",
    name: "Ermirio Pereira de Moraes & family ",
    netWorth: "$4.1 B",
    age: "89",
    country: "Brazil",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "719",
    rank: "709",
    name: "Maria Helena Moraes Scripilliti & family ",
    netWorth: "$4.1 B",
    age: "91",
    country: "Brazil",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "720",
    rank: "709",
    name: "Augusto & Giorgio Perfetti ",
    netWorth: "$4.1 B",
    age: "64",
    country: "Italy",
    source: "candy",
    industry: "Food & Beverage "
  },
  {
    key: "721",
    rank: "709",
    name: "Thomas Secunda ",
    netWorth: "$4.1 B",
    age: "67",
    country: "United States",
    source: "Bloomberg LP",
    industry: "Media & Entertainment "
  },
  {
    key: "722",
    rank: "709",
    name: "Shaul Shani ",
    netWorth: "$4.1 B",
    age: "67",
    country: "Israel",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "723",
    rank: "709",
    name: "E. Joe Shoen ",
    netWorth: "$4.1 B",
    age: "72",
    country: "United States",
    source: "U-Haul",
    industry: "Automotive "
  },
  {
    key: "724",
    rank: "709",
    name: "Steven Udvar-Hazy ",
    netWorth: "$4.1 B",
    age: "76",
    country: "United States",
    source: "aircraft leasing",
    industry: "Service "
  },
  {
    key: "725",
    rank: "709",
    name: "Russ Weiner ",
    netWorth: "$4.1 B",
    age: "51",
    country: "United States",
    source: "energy drinks",
    industry: "Food & Beverage "
  },
  {
    key: "726",
    rank: "709",
    name: "Guanjiang Wu & family ",
    netWorth: "$4.1 B",
    age: "53",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "727",
    rank: "728",
    name: "Anil Agarwal & family ",
    netWorth: "$4 B",
    age: "68",
    country: "India",
    source: "mining, metals",
    industry: "Metals & Mining "
  },
  {
    key: "728",
    rank: "728",
    name: "Somphote Ahunai ",
    netWorth: "$4 B",
    age: "54",
    country: "Thailand",
    source: "renewable energy",
    industry: "Energy "
  },
  {
    key: "729",
    rank: "728",
    name: "Patrizio Bertelli ",
    netWorth: "$4 B",
    age: "76",
    country: "Italy",
    source: "luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "730",
    rank: "728",
    name: "Rakesh Gangwal ",
    netWorth: "$4 B",
    age: "68",
    country: "United States",
    source: "airline",
    industry: "Service "
  },
  {
    key: "731",
    rank: "728",
    name: "Paul Gauselmann & family ",
    netWorth: "$4 B",
    age: "87",
    country: "Germany",
    source: "gambling",
    industry: "Gambling & Casinos "
  },
  {
    key: "732",
    rank: "728",
    name: "Hao Hong ",
    netWorth: "$4 B",
    age: "66",
    country: "United States",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "733",
    rank: "728",
    name: "He Xiaopeng ",
    netWorth: "$4 B",
    age: "44",
    country: "China",
    source: "electric vehicles",
    industry: "Automotive "
  },
  {
    key: "734",
    rank: "728",
    name: "Michael Herz ",
    netWorth: "$4 B",
    age: "78",
    country: "Germany",
    source: "coffee",
    industry: "Fashion & Retail "
  },
  {
    key: "735",
    rank: "728",
    name: "Wolfgang Herz ",
    netWorth: "$4 B",
    age: "71",
    country: "Germany",
    source: "coffee",
    industry: "Fashion & Retail "
  },
  {
    key: "736",
    rank: "728",
    name: "Arthur Irving ",
    netWorth: "$4 B",
    age: "92",
    country: "Canada",
    source: "oil",
    industry: "Energy "
  },
  {
    key: "737",
    rank: "728",
    name: "Victor Jacobsson ",
    netWorth: "$4 B",
    age: "40",
    country: "Sweden",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "738",
    rank: "728",
    name: "Marc Ladreit de Lacharriere ",
    netWorth: "$4 B",
    age: "81",
    country: "France",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "739",
    rank: "728",
    name: "Patrick Lee ",
    netWorth: "$4 B",
    age: "80",
    country: "Hong Kong",
    source: "paper",
    industry: "Manufacturing "
  },
  {
    key: "740",
    rank: "728",
    name: "Max Lytvyn ",
    netWorth: "$4 B",
    age: "42",
    country: "Canada",
    source: "software",
    industry: "Technology "
  },
  {
    key: "741",
    rank: "728",
    name: "Gilles Martin ",
    netWorth: "$4 B",
    age: "58",
    country: "France",
    source: "laboratory services",
    industry: "Healthcare "
  },
  {
    key: "742",
    rank: "728",
    name: "Ramzi Musallam ",
    netWorth: "$4 B",
    age: "53",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "743",
    rank: "728",
    name: "Georg Nemetschek & family ",
    netWorth: "$4 B",
    age: "88",
    country: "Germany",
    source: "software",
    industry: "Technology "
  },
  {
    key: "744",
    rank: "728",
    name: "Akio Nitori ",
    netWorth: "$4 B",
    age: "78",
    country: "Japan",
    source: "home furnishings",
    industry: "Fashion & Retail "
  },
  {
    key: "745",
    rank: "728",
    name: "Daniel Och ",
    netWorth: "$4 B",
    age: "61",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "746",
    rank: "728",
    name: "Pankaj Patel ",
    netWorth: "$4 B",
    age: "69",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "747",
    rank: "728",
    name: "John Paulson ",
    netWorth: "$4 B",
    age: "66",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "748",
    rank: "728",
    name: "Miuccia Prada ",
    netWorth: "$4 B",
    age: "72",
    country: "Italy",
    source: "luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "749",
    rank: "728",
    name: "Jean (Gigi) Pritzker ",
    netWorth: "$4 B",
    age: "59",
    country: "United States",
    source: "hotels, investments",
    industry: "Service "
  },
  {
    key: "750",
    rank: "728",
    name: "Juan Roig ",
    netWorth: "$4 B",
    age: "72",
    country: "Spain",
    source: "supermarkets",
    industry: "Fashion & Retail "
  },
  {
    key: "751",
    rank: "728",
    name: "David Rubenstein ",
    netWorth: "$4 B",
    age: "72",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "752",
    rank: "728",
    name: "Howard Schultz ",
    netWorth: "$4 B",
    age: "68",
    country: "United States",
    source: "Starbucks",
    industry: "Food & Beverage "
  },
  {
    key: "753",
    rank: "728",
    name: "Alex Shevchenko ",
    netWorth: "$4 B",
    age: "42",
    country: "Canada",
    source: "software",
    industry: "Technology "
  },
  {
    key: "754",
    rank: "728",
    name: "Dan Snyder ",
    netWorth: "$4 B",
    age: "57",
    country: "United States",
    source: "Washington Football Team",
    industry: "Sports "
  },
  {
    key: "755",
    rank: "728",
    name: "Jerzy Starak ",
    netWorth: "$4 B",
    age: "74",
    country: "Poland",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "756",
    rank: "728",
    name: "Udo & Harald Tschira ",
    netWorth: "$4 B",
    age: "64",
    country: "Germany",
    source: "software",
    industry: "Technology "
  },
  {
    key: "757",
    rank: "728",
    name: "Kelcy Warren ",
    netWorth: "$4 B",
    age: "66",
    country: "United States",
    source: "pipelines",
    industry: "Energy "
  },
  {
    key: "758",
    rank: "728",
    name: "Herbert Wertheim ",
    netWorth: "$4 B",
    age: "82",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "759",
    rank: "728",
    name: "Cameron Winklevoss ",
    netWorth: "$4 B",
    age: "40",
    country: "United States",
    source: "cryptocurrency",
    industry: "Finance & Investments "
  },
  {
    key: "760",
    rank: "728",
    name: "Tyler Winklevoss ",
    netWorth: "$4 B",
    age: "40",
    country: "United States",
    source: "cryptocurrency",
    industry: "Finance & Investments "
  },
  {
    key: "761",
    rank: "728",
    name: "Denise York & family ",
    netWorth: "$4 B",
    age: "71",
    country: "United States",
    source: "San Francisco 49ers",
    industry: "Sports "
  },
  {
    key: "762",
    rank: "728",
    name: "Zhao Lixin ",
    netWorth: "$4 B",
    age: "56",
    country: "China",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "763",
    rank: "764",
    name: "Hubert Burda ",
    netWorth: "$3.9 B",
    age: "82",
    country: "Germany",
    source: "publishing",
    industry: "Media & Entertainment "
  },
  {
    key: "764",
    rank: "764",
    name: "Francesco Gaetano Caltagirone ",
    netWorth: "$3.9 B",
    age: "79",
    country: "Italy",
    source: "cement, diversified",
    industry: "Construction & Engineering "
  },
  {
    key: "765",
    rank: "764",
    name: "Marcos Galperin ",
    netWorth: "$3.9 B",
    age: "64",
    country: "Argentina",
    source: "e-commerce",
    industry: "Technology "
  },
  {
    key: "766",
    rank: "764",
    name: "Li Xiang ",
    netWorth: "$3.9 B",
    age: "40",
    country: "China",
    source: "electric vehicles",
    industry: "Automotive "
  },
  {
    key: "767",
    rank: "764",
    name: "Stephen Mandel, Jr. ",
    netWorth: "$3.9 B",
    age: "66",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "768",
    rank: "764",
    name: "Gabe Newell ",
    netWorth: "$3.9 B",
    age: "59",
    country: "United States",
    source: "videogames",
    industry: "Gambling & Casinos "
  },
  {
    key: "769",
    rank: "764",
    name: "Maja Oeri ",
    netWorth: "$3.9 B",
    age: "67",
    country: "Switzerland",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "770",
    rank: "764",
    name: "Paolo & Gianfelice Mario Rocca ",
    netWorth: "$3.9 B",
    age: "64",
    country: "Italy",
    source: "pipe manufacturing",
    industry: "Metals & Mining "
  },
  {
    key: "771",
    rank: "764",
    name: "Neil Shen ",
    netWorth: "$3.9 B",
    age: "54",
    country: "China",
    source: "venture capital",
    industry: "Finance & Investments "
  },
  {
    key: "772",
    rank: "764",
    name: "Helmut Sohmen ",
    netWorth: "$3.9 B",
    age: "82",
    country: "Austria",
    source: "shipping",
    industry: "Logistics "
  },
  {
    key: "773",
    rank: "764",
    name: "Donald Sterling ",
    netWorth: "$3.9 B",
    age: "87",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "774",
    rank: "764",
    name: "Don Vultaggio & family ",
    netWorth: "$3.9 B",
    age: "70",
    country: "United States",
    source: "beverages",
    industry: "Food & Beverage "
  },
  {
    key: "775",
    rank: "764",
    name: "Yiling Wu ",
    netWorth: "$3.9 B",
    age: "72",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "776",
    rank: "764",
    name: "Gongshan Zhu ",
    netWorth: "$3.9 B",
    age: "64",
    country: "China",
    source: "solar panel materials",
    industry: "Manufacturing "
  },
  {
    key: "777",
    rank: "778",
    name: "Gayle Benson ",
    netWorth: "$3.8 B",
    age: "75",
    country: "United States",
    source: "pro sports teams",
    industry: "Sports "
  },
  {
    key: "778",
    rank: "778",
    name: "William Conway, Jr. ",
    netWorth: "$3.8 B",
    age: "72",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "779",
    rank: "778",
    name: "Gurbachan Singh Dhingra ",
    netWorth: "$3.8 B",
    age: "71",
    country: "India",
    source: "paints",
    industry: "Manufacturing "
  },
  {
    key: "780",
    rank: "778",
    name: "Kuldip Singh Dhingra ",
    netWorth: "$3.8 B",
    age: "74",
    country: "India",
    source: "paints",
    industry: "Manufacturing "
  },
  {
    key: "781",
    rank: "778",
    name: "Luca Garavoglia ",
    netWorth: "$3.8 B",
    age: "53",
    country: "Italy",
    source: "spirits",
    industry: "Food & Beverage "
  },
  {
    key: "782",
    rank: "778",
    name: "Vinod & Anil Rai Gupta ",
    netWorth: "$3.8 B",
    age: "64",
    country: "India",
    source: "electrical equipment",
    industry: "Manufacturing "
  },
  {
    key: "783",
    rank: "778",
    name: "Jimmy Haslam ",
    netWorth: "$3.8 B",
    age: "68",
    country: "United States",
    source: "gas stations, retail",
    industry: "Fashion & Retail "
  },
  {
    key: "784",
    rank: "778",
    name: "Susan Carol Holland ",
    netWorth: "$3.8 B",
    age: "65",
    country: "Italy",
    source: "hearing aids",
    industry: "Manufacturing "
  },
  {
    key: "785",
    rank: "778",
    name: "Timur Kulibaev ",
    netWorth: "$3.8 B",
    age: "55",
    country: "Kazakhstan",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "786",
    rank: "778",
    name: "Dinara Kulibaeva ",
    netWorth: "$3.8 B",
    age: "54",
    country: "Kazakhstan",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "787",
    rank: "778",
    name: "Michel Leclercq & family ",
    netWorth: "$3.8 B",
    age: "82",
    country: "France",
    source: "sporting goods",
    industry: "Fashion & Retail "
  },
  {
    key: "788",
    rank: "778",
    name: "Pablo Legorreta ",
    netWorth: "$3.8 B",
    age: "58",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "789",
    rank: "778",
    name: "Margarita Louis-Dreyfus & family ",
    netWorth: "$3.8 B",
    age: "59",
    country: "Switzerland",
    source: "commodities",
    industry: "Food & Beverage "
  },
  {
    key: "790",
    rank: "778",
    name: "Michael Milken ",
    netWorth: "$3.8 B",
    age: "75",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "791",
    rank: "778",
    name: "Denis O'Brien ",
    netWorth: "$3.8 B",
    age: "63",
    country: "Ireland",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "792",
    rank: "778",
    name: "Katharina Otto-Bernstein ",
    netWorth: "$3.8 B",
    age: "58",
    country: "Germany",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "793",
    rank: "778",
    name: "James Packer ",
    netWorth: "$3.8 B",
    age: "54",
    country: "Australia",
    source: "casinos",
    industry: "Gambling & Casinos "
  },
  {
    key: "794",
    rank: "778",
    name: "Sergio Stevanato & family ",
    netWorth: "$3.8 B",
    age: "79",
    country: "Italy",
    source: "medical packaging",
    industry: "Healthcare "
  },
  {
    key: "795",
    rank: "778",
    name: "Leena Tewari ",
    netWorth: "$3.8 B",
    age: "64",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "796",
    rank: "778",
    name: "Yitzhak Tshuva ",
    netWorth: "$3.8 B",
    age: "73",
    country: "Israel",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "797",
    rank: "778",
    name: "Paul-Heinz Wesjohann & family ",
    netWorth: "$3.8 B",
    age: "78",
    country: "Germany",
    source: "chicken processing",
    industry: "Food & Beverage "
  },
  {
    key: "798",
    rank: "778",
    name: "Zeng Fangqin ",
    netWorth: "$3.8 B",
    age: "56",
    country: "China",
    source: "smartphone components",
    industry: "Technology "
  },
  {
    key: "799",
    rank: "778",
    name: "Zhou Bajin ",
    netWorth: "$3.8 B",
    age: "86",
    country: "China",
    source: "auto parts",
    industry: "Manufacturing "
  },
  {
    key: "800",
    rank: "801",
    name: "William Berkley ",
    netWorth: "$3.7 B",
    age: "75",
    country: "United States",
    source: "insurance",
    industry: "Finance & Investments "
  },
  {
    key: "801",
    rank: "801",
    name: "John Catsimatidis ",
    netWorth: "$3.7 B",
    age: "73",
    country: "United States",
    source: "oil, real estate",
    industry: "Energy "
  },
  {
    key: "802",
    rank: "801",
    name: "Che Jianxing ",
    netWorth: "$3.7 B",
    age: "55",
    country: "China",
    source: "furniture retailing",
    industry: "Fashion & Retail "
  },
  {
    key: "803",
    rank: "801",
    name: "Gustavo Denegri ",
    netWorth: "$3.7 B",
    age: "85",
    country: "Italy",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "804",
    rank: "801",
    name: "Charles Edelstenne ",
    netWorth: "$3.7 B",
    age: "84",
    country: "France",
    source: "aviation",
    industry: "Manufacturing "
  },
  {
    key: "805",
    rank: "801",
    name: "Reed Hastings ",
    netWorth: "$3.7 B",
    age: "61",
    country: "United States",
    source: "Netflix",
    industry: "Media & Entertainment "
  },
  {
    key: "806",
    rank: "801",
    name: "Amos Hostetter, Jr. ",
    netWorth: "$3.7 B",
    age: "85",
    country: "United States",
    source: "cable television",
    industry: "Media & Entertainment "
  },
  {
    key: "807",
    rank: "801",
    name: "Brad Jacobs ",
    netWorth: "$3.7 B",
    age: "65",
    country: "United States",
    source: "logistics",
    industry: "Logistics "
  },
  {
    key: "808",
    rank: "801",
    name: "Friedrich Knapp ",
    netWorth: "$3.7 B",
    age: "70",
    country: "Germany",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "809",
    rank: "801",
    name: "William Lauder ",
    netWorth: "$3.7 B",
    age: "61",
    country: "United States",
    source: "Estee Lauder",
    industry: "Fashion & Retail "
  },
  {
    key: "810",
    rank: "801",
    name: "Richard LeFrak & family ",
    netWorth: "$3.7 B",
    age: "76",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "811",
    rank: "801",
    name: "Li Guoqiang ",
    netWorth: "$3.7 B",
    age: "58",
    country: "China",
    source: "auto dealerships",
    industry: "Automotive "
  },
  {
    key: "812",
    rank: "801",
    name: "Low Tuck Kwong ",
    netWorth: "$3.7 B",
    age: "73",
    country: "Indonesia",
    source: "coal",
    industry: "Energy "
  },
  {
    key: "813",
    rank: "801",
    name: "Akira Mori & family ",
    netWorth: "$3.7 B",
    age: "85",
    country: "Japan",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "814",
    rank: "801",
    name: "Anthony Pritzker ",
    netWorth: "$3.7 B",
    age: "61",
    country: "United States",
    source: "hotels, investments",
    industry: "Service "
  },
  {
    key: "815",
    rank: "801",
    name: "Ira Rennert ",
    netWorth: "$3.7 B",
    age: "87",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "816",
    rank: "801",
    name: "Bernard Saul, II. ",
    netWorth: "$3.7 B",
    age: "89",
    country: "United States",
    source: "banking, real estate",
    industry: "Finance & Investments "
  },
  {
    key: "817",
    rank: "801",
    name: "Shi Yonghong & family ",
    netWorth: "$3.7 B",
    age: "53",
    country: "China",
    source: "restaurants",
    industry: "Food & Beverage "
  },
  {
    key: "818",
    rank: "801",
    name: "Song Chi-hyung ",
    netWorth: "$3.7 B",
    age: "43",
    country: "South Korea",
    source: "cryptocurrency",
    industry: "Finance & Investments "
  },
  {
    key: "819",
    rank: "801",
    name: "Steven Spielberg ",
    netWorth: "$3.7 B",
    age: "75",
    country: "United States",
    source: "movies",
    industry: "Media & Entertainment "
  },
  {
    key: "820",
    rank: "801",
    name: "Wong Luen Hei ",
    netWorth: "$3.7 B",
    age: "60",
    country: "China",
    source: "building materials",
    industry: "Manufacturing "
  },
  {
    key: "821",
    rank: "822",
    name: "Danielle Bellon & family ",
    netWorth: "$3.6 B",
    age: "82",
    country: "France",
    source: "food services",
    industry: "Service "
  },
  {
    key: "822",
    rank: "822",
    name: "Byju Raveendran and Divya Gokulnath ",
    netWorth: "$3.6 B",
    age: "40",
    country: "India",
    source: "education technology",
    industry: "Technology "
  },
  {
    key: "823",
    rank: "822",
    name: "Cho Tak Wong ",
    netWorth: "$3.6 B",
    age: "75",
    country: "Hong Kong",
    source: "auto parts",
    industry: "Manufacturing "
  },
  {
    key: "824",
    rank: "822",
    name: "Charles Cohen ",
    netWorth: "$3.6 B",
    age: "70",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "825",
    rank: "822",
    name: "Kenneth Dart ",
    netWorth: "$3.6 B",
    age: "66",
    country: "Belize",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "826",
    rank: "822",
    name: "Martin Ebner ",
    netWorth: "$3.6 B",
    age: "76",
    country: "Switzerland",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "827",
    rank: "822",
    name: "David Filo ",
    netWorth: "$3.6 B",
    age: "55",
    country: "United States",
    source: "Yahoo",
    industry: "Technology "
  },
  {
    key: "828",
    rank: "822",
    name: "Miguel Fluxa Rossello ",
    netWorth: "$3.6 B",
    age: "83",
    country: "Spain",
    source: "hotels",
    industry: "Service "
  },
  {
    key: "829",
    rank: "822",
    name: "John Henry ",
    netWorth: "$3.6 B",
    age: "72",
    country: "United States",
    source: "sports",
    industry: "Sports "
  },
  {
    key: "830",
    rank: "822",
    name: "Hu Kaijun ",
    netWorth: "$3.6 B",
    age: "60",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "831",
    rank: "822",
    name: "Peter Kellogg ",
    netWorth: "$3.6 B",
    age: "79",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "832",
    rank: "822",
    name: "James Leprino ",
    netWorth: "$3.6 B",
    age: "84",
    country: "United States",
    source: "cheese",
    industry: "Food & Beverage "
  },
  {
    key: "833",
    rank: "822",
    name: "Iskander Makhmudov ",
    netWorth: "$3.6 B",
    age: "58",
    country: "Russia",
    source: "mining, metals, machinery",
    industry: "Metals & Mining "
  },
  {
    key: "834",
    rank: "822",
    name: "Daniel Mate ",
    netWorth: "$3.6 B",
    age: "58",
    country: "Spain",
    source: "mining, commodities",
    industry: "Metals & Mining "
  },
  {
    key: "835",
    rank: "822",
    name: "Aristotelis Mistakidis ",
    netWorth: "$3.6 B",
    age: "60",
    country: "Greece",
    source: "mining, commodities",
    industry: "Metals & Mining "
  },
  {
    key: "836",
    rank: "822",
    name: "Arturo Moreno ",
    netWorth: "$3.6 B",
    age: "75",
    country: "United States",
    source: "billboards, Los Angeles Angels",
    industry: "Sports "
  },
  {
    key: "837",
    rank: "822",
    name: "Nan Cunhui ",
    netWorth: "$3.6 B",
    age: "58",
    country: "China",
    source: "power equipment",
    industry: "Manufacturing "
  },
  {
    key: "838",
    rank: "822",
    name: "Julio Ponce Lerou ",
    netWorth: "$3.6 B",
    age: "76",
    country: "Chile",
    source: "fertilizer",
    industry: "Metals & Mining "
  },
  {
    key: "839",
    rank: "822",
    name: "J.B. Pritzker ",
    netWorth: "$3.6 B",
    age: "57",
    country: "United States",
    source: "hotels, investments",
    industry: "Finance & Investments "
  },
  {
    key: "840",
    rank: "822",
    name: "Chandru Raheja ",
    netWorth: "$3.6 B",
    age: "81",
    country: "India",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "841",
    rank: "822",
    name: "Rodger Riney & family ",
    netWorth: "$3.6 B",
    age: "76",
    country: "United States",
    source: "discount brokerage",
    industry: "Finance & Investments "
  },
  {
    key: "842",
    rank: "822",
    name: "Shi Yuzhu ",
    netWorth: "$3.6 B",
    age: "59",
    country: "China",
    source: "online games, investments",
    industry: "Diversified "
  },
  {
    key: "843",
    rank: "822",
    name: "Zuowen Song ",
    netWorth: "$3.6 B",
    age: "75",
    country: "China",
    source: "aluminum, diversified",
    industry: "Diversified "
  },
  {
    key: "844",
    rank: "822",
    name: "Jerry Speyer ",
    netWorth: "$3.6 B",
    age: "81",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "845",
    rank: "822",
    name: "Julia Thiele-Schuerhoff ",
    netWorth: "$3.6 B",
    age: "50",
    country: "Germany",
    source: "brakes, investments",
    industry: "Manufacturing "
  },
  {
    key: "846",
    rank: "822",
    name: "Tung Chee Chen ",
    netWorth: "$3.6 B",
    age: "79",
    country: "Hong Kong",
    source: "shipping",
    industry: "Logistics "
  },
  {
    key: "847",
    rank: "822",
    name: "Roger Wang ",
    netWorth: "$3.6 B",
    age: "73",
    country: "United States",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "848",
    rank: "822",
    name: "Wu Shaoxun ",
    netWorth: "$3.6 B",
    age: "66",
    country: "China",
    source: "wine",
    industry: "Food & Beverage "
  },
  {
    key: "849",
    rank: "822",
    name: "Wenzhong Zhang ",
    netWorth: "$3.6 B",
    age: "60",
    country: "China",
    source: "supermarkets",
    industry: "Fashion & Retail "
  },
  {
    key: "850",
    rank: "851",
    name: "Chen Kaixuan ",
    netWorth: "$3.5 B",
    age: "63",
    country: "China",
    source: "household chemicals",
    industry: "Manufacturing "
  },
  {
    key: "851",
    rank: "851",
    name: "Beatriz Davila de Santo Domingo ",
    netWorth: "$3.5 B",
    age: "83",
    country: "Colombia",
    source: "beer",
    industry: "Food & Beverage "
  },
  {
    key: "852",
    rank: "851",
    name: "Antonio Del Valle Ruiz & family ",
    netWorth: "$3.5 B",
    age: "83",
    country: "Mexico",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "853",
    rank: "851",
    name: "Carl Douglas ",
    netWorth: "$3.5 B",
    age: "60",
    country: "Sweden",
    source: "investments",
    industry: "Diversified "
  },
  {
    key: "854",
    rank: "851",
    name: "Eric Douglas ",
    netWorth: "$3.5 B",
    age: "53",
    country: "Sweden",
    source: "investments",
    industry: "Diversified "
  },
  {
    key: "855",
    rank: "851",
    name: "Jiangtao Du & family ",
    netWorth: "$3.5 B",
    age: "52",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "856",
    rank: "851",
    name: "Juan Carlos Escotet ",
    netWorth: "$3.5 B",
    age: "62",
    country: "Venezuela",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "857",
    rank: "851",
    name: "Fiona Geminder ",
    netWorth: "$3.5 B",
    age: "57",
    country: "Australia",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "858",
    rank: "851",
    name: "Yuhua Gu & family ",
    netWorth: "$3.5 B",
    age: "72",
    country: "China",
    source: "furniture",
    industry: "Manufacturing "
  },
  {
    key: "859",
    rank: "851",
    name: "James Irsay ",
    netWorth: "$3.5 B",
    age: "62",
    country: "United States",
    source: "Indianapolis Colts",
    industry: "Sports "
  },
  {
    key: "860",
    rank: "851",
    name: "Kuok Khoon Hong ",
    netWorth: "$3.5 B",
    age: "72",
    country: "Singapore",
    source: "palm oil",
    industry: "Manufacturing "
  },
  {
    key: "861",
    rank: "851",
    name: "Aerin Lauder ",
    netWorth: "$3.5 B",
    age: "51",
    country: "United States",
    source: "cosmetics",
    industry: "Fashion & Retail "
  },
  {
    key: "862",
    rank: "851",
    name: "Lee Seo-hyun ",
    netWorth: "$3.5 B",
    age: "48",
    country: "South Korea",
    source: "Samsung",
    industry: "Diversified "
  },
  {
    key: "863",
    rank: "851",
    name: "Li Yongxin & family ",
    netWorth: "$3.5 B",
    age: "46",
    country: "China",
    source: "education",
    industry: "Service "
  },
  {
    key: "864",
    rank: "851",
    name: "Jeffrey Lurie ",
    netWorth: "$3.5 B",
    age: "70",
    country: "United States",
    source: "Philadelphia Eagles",
    industry: "Sports "
  },
  {
    key: "865",
    rank: "851",
    name: "Mary Alice Dorrance Malone ",
    netWorth: "$3.5 B",
    age: "72",
    country: "United States",
    source: "Campbell Soup",
    industry: "Food & Beverage "
  },
  {
    key: "866",
    rank: "851",
    name: "Ronald McAulay ",
    netWorth: "$3.5 B",
    age: "86",
    country: "Hong Kong",
    source: "energy",
    industry: "Energy "
  },
  {
    key: "867",
    rank: "851",
    name: "Apoorva Mehta ",
    netWorth: "$3.5 B",
    age: "35",
    country: "Canada",
    source: "grocery delivery service",
    industry: "Technology "
  },
  {
    key: "868",
    rank: "851",
    name: "Arnon Milchan ",
    netWorth: "$3.5 B",
    age: "77",
    country: "Israel",
    source: "movie making",
    industry: "Media & Entertainment "
  },
  {
    key: "869",
    rank: "851",
    name: "Masahiro Noda ",
    netWorth: "$3.5 B",
    age: "83",
    country: "Japan",
    source: "software",
    industry: "Technology "
  },
  {
    key: "870",
    rank: "851",
    name: "Maren Otto ",
    netWorth: "$3.5 B",
    age: "64",
    country: "Germany",
    source: "retail, real estate",
    industry: "Diversified "
  },
  {
    key: "871",
    rank: "851",
    name: "Renzo Rosso & family ",
    netWorth: "$3.5 B",
    age: "66",
    country: "Italy",
    source: "fashion",
    industry: "Fashion & Retail "
  },
  {
    key: "872",
    rank: "851",
    name: "Lynn Schusterman ",
    netWorth: "$3.5 B",
    age: "83",
    country: "United States",
    source: "oil & gas, investments",
    industry: "Energy "
  },
  {
    key: "873",
    rank: "851",
    name: "Gil Shwed ",
    netWorth: "$3.5 B",
    age: "53",
    country: "Israel",
    source: "software",
    industry: "Technology "
  },
  {
    key: "874",
    rank: "851",
    name: "Thomas Siebel ",
    netWorth: "$3.5 B",
    age: "69",
    country: "United States",
    source: "business software",
    industry: "Technology "
  },
  {
    key: "875",
    rank: "851",
    name: "Herb Simon ",
    netWorth: "$3.5 B",
    age: "87",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "876",
    rank: "851",
    name: "Friede Springer ",
    netWorth: "$3.5 B",
    age: "79",
    country: "Germany",
    source: "publishing",
    industry: "Media & Entertainment "
  },
  {
    key: "877",
    rank: "851",
    name: "Wang Zhenhua ",
    netWorth: "$3.5 B",
    age: "60",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "878",
    rank: "851",
    name: "Hans Peter Wild ",
    netWorth: "$3.5 B",
    age: "80",
    country: "Switzerland",
    source: "flavorings",
    industry: "Food & Beverage "
  },
  {
    key: "879",
    rank: "851",
    name: "William Wrigley, Jr. ",
    netWorth: "$3.5 B",
    age: "58",
    country: "United States",
    source: "chewing gum",
    industry: "Food & Beverage "
  },
  {
    key: "880",
    rank: "851",
    name: "Xia Zuoquan ",
    netWorth: "$3.5 B",
    age: "60",
    country: "China",
    source: "automobiles, batteries",
    industry: "Automotive "
  },
  {
    key: "881",
    rank: "851",
    name: "Xue Hua ",
    netWorth: "$3.5 B",
    age: "52",
    country: "China",
    source: "agribusiness",
    industry: "Manufacturing "
  },
  {
    key: "882",
    rank: "883",
    name: "Mohed Altrad ",
    netWorth: "$3.4 B",
    age: "74",
    country: "France",
    source: "scaffolding, cement mixers",
    industry: "Construction & Engineering "
  },
  {
    key: "883",
    rank: "883",
    name: "Sid Bass ",
    netWorth: "$3.4 B",
    age: "79",
    country: "United States",
    source: "oil, investments",
    industry: "Energy "
  },
  {
    key: "884",
    rank: "883",
    name: "Nick Caporella ",
    netWorth: "$3.4 B",
    age: "86",
    country: "United States",
    source: "beverages",
    industry: "Food & Beverage "
  },
  {
    key: "885",
    rank: "883",
    name: "Cheng Yixiao ",
    netWorth: "$3.4 B",
    age: "38",
    country: "China",
    source: "video streaming app",
    industry: "Media & Entertainment "
  },
  {
    key: "886",
    rank: "883",
    name: "Wesley Edens ",
    netWorth: "$3.4 B",
    age: "60",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "887",
    rank: "883",
    name: "Behdad Eghbali ",
    netWorth: "$3.4 B",
    age: "45",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "888",
    rank: "883",
    name: "Archie Aldis Emmerson & family ",
    netWorth: "$3.4 B",
    age: "92",
    country: "United States",
    source: "timberland, lumber mills",
    industry: "Manufacturing "
  },
  {
    key: "889",
    rank: "883",
    name: "Jose E. Feliciano ",
    netWorth: "$3.4 B",
    age: "48",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "890",
    rank: "883",
    name: "Fu Liquan & family ",
    netWorth: "$3.4 B",
    age: "54",
    country: "China",
    source: "surveillance equipment",
    industry: "Technology "
  },
  {
    key: "891",
    rank: "883",
    name: "David Gottesman ",
    netWorth: "$3.4 B",
    age: "95",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "892",
    rank: "883",
    name: "Laurence Graff & family ",
    netWorth: "$3.4 B",
    age: "83",
    country: "United Kingdom",
    source: "diamond jewelry",
    industry: "Fashion & Retail "
  },
  {
    key: "893",
    rank: "883",
    name: "Jeff T. Green ",
    netWorth: "$3.4 B",
    age: "45",
    country: "United States",
    source: "digital advertising",
    industry: "Media & Entertainment "
  },
  {
    key: "894",
    rank: "883",
    name: "Jim Kavanaugh ",
    netWorth: "$3.4 B",
    age: "59",
    country: "United States",
    source: "IT provider",
    industry: "Technology "
  },
  {
    key: "895",
    rank: "883",
    name: "Steven Klinsky ",
    netWorth: "$3.4 B",
    age: "65",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "896",
    rank: "883",
    name: "John Middleton ",
    netWorth: "$3.4 B",
    age: "67",
    country: "United States",
    source: "tobacco",
    industry: "Food & Beverage "
  },
  {
    key: "897",
    rank: "883",
    name: "Jerry Ng ",
    netWorth: "$3.4 B",
    age: "56",
    country: "Indonesia",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "898",
    rank: "883",
    name: "Tengyun Nie & family ",
    netWorth: "$3.4 B",
    age: "46",
    country: "China",
    source: "logistics",
    industry: "Service "
  },
  {
    key: "899",
    rank: "883",
    name: "Nandan Nilekani ",
    netWorth: "$3.4 B",
    age: "66",
    country: "India",
    source: "software services",
    industry: "Technology "
  },
  {
    key: "900",
    rank: "883",
    name: "Bob Parsons ",
    netWorth: "$3.4 B",
    age: "71",
    country: "United States",
    source: "web hosting",
    industry: "Technology "
  },
  {
    key: "901",
    rank: "883",
    name: "Prasert Prasarttong-Osoth ",
    netWorth: "$3.4 B",
    age: "89",
    country: "Thailand",
    source: "hospitals",
    industry: "Healthcare "
  },
  {
    key: "902",
    rank: "883",
    name: "Qiu Guanghe & family ",
    netWorth: "$3.4 B",
    age: "70",
    country: "China",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "903",
    rank: "883",
    name: "Richard Sands ",
    netWorth: "$3.4 B",
    age: "71",
    country: "United States",
    source: "liquor",
    industry: "Food & Beverage "
  },
  {
    key: "904",
    rank: "883",
    name: "Robert Sands ",
    netWorth: "$3.4 B",
    age: "63",
    country: "United States",
    source: "liquor",
    industry: "Food & Beverage "
  },
  {
    key: "905",
    rank: "883",
    name: "T. Denny Sanford ",
    netWorth: "$3.4 B",
    age: "86",
    country: "United States",
    source: "banking, credit cards",
    industry: "Finance & Investments "
  },
  {
    key: "906",
    rank: "883",
    name: "Naguib Sawiris ",
    netWorth: "$3.4 B",
    age: "67",
    country: "Egypt",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "907",
    rank: "883",
    name: "Pavel Tykac ",
    netWorth: "$3.4 B",
    age: "57",
    country: "Czechia",
    source: "coal mines",
    industry: "Metals & Mining "
  },
  {
    key: "908",
    rank: "883",
    name: "Todd Wanek ",
    netWorth: "$3.4 B",
    age: "58",
    country: "United States",
    source: "furniture",
    industry: "Manufacturing "
  },
  {
    key: "909",
    rank: "883",
    name: "Meg Whitman ",
    netWorth: "$3.4 B",
    age: "65",
    country: "United States",
    source: "eBay",
    industry: "Technology "
  },
  {
    key: "910",
    rank: "883",
    name: "Michael Xie ",
    netWorth: "$3.4 B",
    age: "53",
    country: "United States",
    source: "cybersecurity",
    industry: "Technology "
  },
  {
    key: "911",
    rank: "883",
    name: "Chenghai Ye & family ",
    netWorth: "$3.4 B",
    age: "78",
    country: "Hong Kong",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "912",
    rank: "913",
    name: "An Kang ",
    netWorth: "$3.3 B",
    age: "73",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "913",
    rank: "913",
    name: "John Arnold ",
    netWorth: "$3.3 B",
    age: "48",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "914",
    rank: "913",
    name: "Arun Bharat Ram ",
    netWorth: "$3.3 B",
    age: "81",
    country: "India",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "915",
    rank: "913",
    name: "Tomasz Biernacki ",
    netWorth: "$3.3 B",
    age: "49",
    country: "Poland",
    source: "supermarkets",
    industry: "Fashion & Retail "
  },
  {
    key: "916",
    rank: "913",
    name: "Travis Boersma ",
    netWorth: "$3.3 B",
    age: "51",
    country: "United States",
    source: "coffee",
    industry: "Food & Beverage "
  },
  {
    key: "917",
    rank: "913",
    name: "Chan Tan Ching-fen ",
    netWorth: "$3.3 B",
    age: "64",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "918",
    rank: "913",
    name: "Dongsheng Chen ",
    netWorth: "$3.3 B",
    age: "64",
    country: "China",
    source: "insurance",
    industry: "Finance & Investments "
  },
  {
    key: "919",
    rank: "913",
    name: "Jean Coutu & family ",
    netWorth: "$3.3 B",
    age: "94",
    country: "Canada",
    source: "drugstores",
    industry: "Fashion & Retail "
  },
  {
    key: "920",
    rank: "913",
    name: "Ralph Dommermuth ",
    netWorth: "$3.3 B",
    age: "58",
    country: "Germany",
    source: "internet service provider",
    industry: "Technology "
  },
  {
    key: "921",
    rank: "913",
    name: "Walter Faria ",
    netWorth: "$3.3 B",
    age: "67",
    country: "Brazil",
    source: "beer",
    industry: "Food & Beverage "
  },
  {
    key: "922",
    rank: "913",
    name: "Bob Gaglardi ",
    netWorth: "$3.3 B",
    age: "81",
    country: "Canada",
    source: "hotels",
    industry: "Real Estate "
  },
  {
    key: "923",
    rank: "913",
    name: "John Gandel ",
    netWorth: "$3.3 B",
    age: "87",
    country: "Australia",
    source: "shopping malls",
    industry: "Real Estate "
  },
  {
    key: "924",
    rank: "913",
    name: "Xuande Hua & family ",
    netWorth: "$3.3 B",
    age: "78",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "925",
    rank: "913",
    name: "Micky Jagtiani ",
    netWorth: "$3.3 B",
    age: "70",
    country: "India",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "926",
    rank: "913",
    name: "H. Fisk Johnson ",
    netWorth: "$3.3 B",
    age: "63",
    country: "United States",
    source: "cleaning products",
    industry: "Manufacturing "
  },
  {
    key: "927",
    rank: "913",
    name: "S. Curtis Johnson ",
    netWorth: "$3.3 B",
    age: "66",
    country: "United States",
    source: "cleaning products",
    industry: "Manufacturing "
  },
  {
    key: "928",
    rank: "913",
    name: "Helen Johnson-Leipold ",
    netWorth: "$3.3 B",
    age: "65",
    country: "United States",
    source: "cleaning products",
    industry: "Manufacturing "
  },
  {
    key: "929",
    rank: "913",
    name: "Miguel Krigsner ",
    netWorth: "$3.3 B",
    age: "72",
    country: "Brazil",
    source: "cosmetics",
    industry: "Fashion & Retail "
  },
  {
    key: "930",
    rank: "913",
    name: "Li Jianquan & family ",
    netWorth: "$3.3 B",
    age: "65",
    country: "Hong Kong",
    source: "consumer products",
    industry: "Healthcare "
  },
  {
    key: "931",
    rank: "913",
    name: "Lin Ming-hsiung ",
    netWorth: "$3.3 B",
    age: "72",
    country: "Taiwan",
    source: "supermarkets",
    industry: "Fashion & Retail "
  },
  {
    key: "932",
    rank: "913",
    name: "Winifred J. Marquart ",
    netWorth: "$3.3 B",
    age: "62",
    country: "United States",
    source: "cleaning products",
    industry: "Manufacturing "
  },
  {
    key: "933",
    rank: "913",
    name: "Kiran Mazumdar-Shaw ",
    netWorth: "$3.3 B",
    age: "69",
    country: "India",
    source: "biopharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "934",
    rank: "913",
    name: "Patrice Motsepe ",
    netWorth: "$3.3 B",
    age: "60",
    country: "South Africa",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "935",
    rank: "913",
    name: "Alfred Oetker ",
    netWorth: "$3.3 B",
    age: "55",
    country: "Germany",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "936",
    rank: "913",
    name: "Carl Ferdinand Oetker ",
    netWorth: "$3.3 B",
    age: "49",
    country: "Germany",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "937",
    rank: "913",
    name: "Julia Oetker ",
    netWorth: "$3.3 B",
    age: "43",
    country: "Germany",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "938",
    rank: "913",
    name: "Or Wai Sheun ",
    netWorth: "$3.3 B",
    age: "70",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "939",
    rank: "913",
    name: "Jay Paul ",
    netWorth: "$3.3 B",
    age: "74",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "940",
    rank: "913",
    name: "Horst Paulmann & family ",
    netWorth: "$3.3 B",
    age: "87",
    country: "Chile",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "941",
    rank: "913",
    name: "Theodore Rachmat ",
    netWorth: "$3.3 B",
    age: "78",
    country: "Indonesia",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "942",
    rank: "913",
    name: "John Sall ",
    netWorth: "$3.3 B",
    age: "74",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "943",
    rank: "913",
    name: "Stefan von Holtzbrinck ",
    netWorth: "$3.3 B",
    age: "58",
    country: "Germany",
    source: "publishing",
    industry: "Media & Entertainment "
  },
  {
    key: "944",
    rank: "913",
    name: "Nusli Wadia ",
    netWorth: "$3.3 B",
    age: "78",
    country: "India",
    source: "consumer goods",
    industry: "Food & Beverage "
  },
  {
    key: "945",
    rank: "913",
    name: "Steve Wynn ",
    netWorth: "$3.3 B",
    age: "80",
    country: "United States",
    source: "casinos, hotels",
    industry: "Gambling & Casinos "
  },
  {
    key: "946",
    rank: "913",
    name: "Yang Weidong & family ",
    netWorth: "$3.3 B",
    age: "53",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "947",
    rank: "913",
    name: "Barry Zekelman ",
    netWorth: "$3.3 B",
    age: "55",
    country: "Canada",
    source: "steel",
    industry: "Manufacturing "
  },
  {
    key: "948",
    rank: "913",
    name: "Zhang Shilong & family ",
    netWorth: "$3.3 B",
    age: "56",
    country: "China",
    source: "semiconductor",
    industry: "Technology "
  },
  {
    key: "949",
    rank: "913",
    name: "Zhong Ruonong & family ",
    netWorth: "$3.3 B",
    age: "59",
    country: "China",
    source: "electronics",
    industry: "Manufacturing "
  },
  {
    key: "950",
    rank: "951",
    name: "Cameron Adams ",
    netWorth: "$3.2 B",
    age: "42",
    country: "Australia",
    source: "software",
    industry: "Technology "
  },
  {
    key: "951",
    rank: "951",
    name: "Dongchen Cai ",
    netWorth: "$3.2 B",
    age: "69",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "952",
    rank: "951",
    name: "Vanich Chaiyawan ",
    netWorth: "$3.2 B",
    age: "90",
    country: "Thailand",
    source: "insurance, beverages",
    industry: "Finance & Investments "
  },
  {
    key: "953",
    rank: "951",
    name: "Andrew & Peggy Cherng ",
    netWorth: "$3.2 B",
    age: "64",
    country: "United States",
    source: "restaurants",
    industry: "Food & Beverage "
  },
  {
    key: "954",
    rank: "951",
    name: "James Clark ",
    netWorth: "$3.2 B",
    age: "78",
    country: "United States",
    source: "Netscape, investments",
    industry: "Technology "
  },
  {
    key: "955",
    rank: "951",
    name: "Jack Cowin ",
    netWorth: "$3.2 B",
    age: "79",
    country: "Australia",
    source: "fast food",
    industry: "Food & Beverage "
  },
  {
    key: "956",
    rank: "951",
    name: "Giuseppe Crippa & family ",
    netWorth: "$3.2 B",
    age: "86",
    country: "Italy",
    source: "microchip testing",
    industry: "Manufacturing "
  },
  {
    key: "957",
    rank: "951",
    name: "Sergei Galitsky ",
    netWorth: "$3.2 B",
    age: "54",
    country: "Russia",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "958",
    rank: "951",
    name: "Ernest Garcia, III ",
    netWorth: "$3.2 B",
    age: "39",
    country: "United States",
    source: "used cars",
    industry: "Automotive "
  },
  {
    key: "959",
    rank: "951",
    name: "Peter Gilgan ",
    netWorth: "$3.2 B",
    age: "71",
    country: "Canada",
    source: "homebuilding",
    industry: "Construction & Engineering "
  },
  {
    key: "960",
    rank: "951",
    name: "Joseph Grendys ",
    netWorth: "$3.2 B",
    age: "60",
    country: "United States",
    source: "poultry processing",
    industry: "Food & Beverage "
  },
  {
    key: "961",
    rank: "951",
    name: "Thomas Hagen ",
    netWorth: "$3.2 B",
    age: "86",
    country: "United States",
    source: "insurance",
    industry: "Finance & Investments "
  },
  {
    key: "962",
    rank: "951",
    name: "Robert Hale, Jr. ",
    netWorth: "$3.2 B",
    age: "55",
    country: "United States",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "963",
    rank: "951",
    name: "Michael Hintze ",
    netWorth: "$3.2 B",
    age: "68",
    country: "Australia",
    source: "investment",
    industry: "Finance & Investments "
  },
  {
    key: "964",
    rank: "951",
    name: "Pansy Ho ",
    netWorth: "$3.2 B",
    age: "59",
    country: "Hong Kong",
    source: "casinos",
    industry: "Gambling & Casinos "
  },
  {
    key: "965",
    rank: "951",
    name: "Alan Howard ",
    netWorth: "$3.2 B",
    age: "58",
    country: "United Kingdom",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "966",
    rank: "951",
    name: "Kei Hoi Pang ",
    netWorth: "$3.2 B",
    age: "56",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "967",
    rank: "951",
    name: "Rudy Ma ",
    netWorth: "$3.2 B",
    age: "81",
    country: "Taiwan",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "968",
    rank: "951",
    name: "Najib Mikati ",
    netWorth: "$3.2 B",
    age: "66",
    country: "Lebanon",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "969",
    rank: "951",
    name: "Taha Mikati ",
    netWorth: "$3.2 B",
    age: "77",
    country: "Lebanon",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "970",
    rank: "951",
    name: "Gail Miller ",
    netWorth: "$3.2 B",
    age: "78",
    country: "United States",
    source: "car dealerships",
    industry: "Automotive "
  },
  {
    key: "971",
    rank: "951",
    name: "Vikas Oberoi ",
    netWorth: "$3.2 B",
    age: "51",
    country: "India",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "972",
    rank: "951",
    name: "H. Ross Perot, Jr. ",
    netWorth: "$3.2 B",
    age: "63",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "973",
    rank: "951",
    name: "Candido Pinheiro Koren de Lima ",
    netWorth: "$3.2 B",
    age: "75",
    country: "Brazil",
    source: "hospitals, health insurance",
    industry: "Healthcare "
  },
  {
    key: "974",
    rank: "951",
    name: "Matthew Prince ",
    netWorth: "$3.2 B",
    age: "47",
    country: "United States",
    source: "cybersecurity",
    industry: "Technology "
  },
  {
    key: "975",
    rank: "951",
    name: "Penny Pritzker ",
    netWorth: "$3.2 B",
    age: "62",
    country: "United States",
    source: "hotels, investments",
    industry: "Finance & Investments "
  },
  {
    key: "976",
    rank: "951",
    name: "Yasumitsu Shigeta ",
    netWorth: "$3.2 B",
    age: "57",
    country: "Japan",
    source: "mobile phone retailer",
    industry: "Telecom "
  },
  {
    key: "977",
    rank: "951",
    name: "Sebastian Siemiatkowski ",
    netWorth: "$3.2 B",
    age: "40",
    country: "Sweden",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "978",
    rank: "951",
    name: "Barry Silbert ",
    netWorth: "$3.2 B",
    age: "45",
    country: "United States",
    source: "cryptocurrency",
    industry: "Finance & Investments "
  },
  {
    key: "979",
    rank: "951",
    name: "Daniel Sundheim ",
    netWorth: "$3.2 B",
    age: "45",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "980",
    rank: "951",
    name: "Rita Tong Liu ",
    netWorth: "$3.2 B",
    age: "73",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "981",
    rank: "951",
    name: "Tran Dinh Long ",
    netWorth: "$3.2 B",
    age: "61",
    country: "Vietnam",
    source: "steel",
    industry: "Manufacturing "
  },
  {
    key: "982",
    rank: "951",
    name: "Zhang Daocai ",
    netWorth: "$3.2 B",
    age: "72",
    country: "China",
    source: "valves",
    industry: "Diversified "
  },
  {
    key: "983",
    rank: "984",
    name: "John Caudwell ",
    netWorth: "$3.1 B",
    age: "69",
    country: "United Kingdom",
    source: "mobile phones",
    industry: "Telecom "
  },
  {
    key: "984",
    rank: "984",
    name: "Philippe Foriel-Destezet ",
    netWorth: "$3.1 B",
    age: "86",
    country: "France",
    source: "employment agency",
    industry: "Service "
  },
  {
    key: "985",
    rank: "984",
    name: "Walter Frey ",
    netWorth: "$3.1 B",
    age: "78",
    country: "Switzerland",
    source: "car dealerships",
    industry: "Automotive "
  },
  {
    key: "986",
    rank: "984",
    name: "Alessandra Garavoglia ",
    netWorth: "$3.1 B",
    age: "62",
    country: "Italy",
    source: "spirits",
    industry: "Food & Beverage "
  },
  {
    key: "987",
    rank: "984",
    name: "Peter Gassner ",
    netWorth: "$3.1 B",
    age: "57",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "988",
    rank: "984",
    name: "Mitchell Goldhar ",
    netWorth: "$3.1 B",
    age: "60",
    country: "Canada",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "989",
    rank: "984",
    name: "Otto Happel ",
    netWorth: "$3.1 B",
    age: "74",
    country: "Germany",
    source: "engineering",
    industry: "Construction & Engineering "
  },
  {
    key: "990",
    rank: "984",
    name: "Peter Hargreaves ",
    netWorth: "$3.1 B",
    age: "75",
    country: "United Kingdom",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "991",
    rank: "984",
    name: "Bom Kim ",
    netWorth: "$3.1 B",
    age: "43",
    country: "United States",
    source: "online retailing",
    industry: "Technology "
  },
  {
    key: "992",
    rank: "984",
    name: "Gaiteng Li ",
    netWorth: "$3.1 B",
    age: "49",
    country: "China",
    source: "hair dryers",
    industry: "Manufacturing "
  },
  {
    key: "993",
    rank: "984",
    name: "Liufa Li & family ",
    netWorth: "$3.1 B",
    age: "64",
    country: "China",
    source: "steel, diversified",
    industry: "Diversified "
  },
  {
    key: "994",
    rank: "984",
    name: "Lu Weiding ",
    netWorth: "$3.1 B",
    age: "51",
    country: "China",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "995",
    rank: "984",
    name: "Harsh Mariwala ",
    netWorth: "$3.1 B",
    age: "70",
    country: "India",
    source: "consumer goods",
    industry: "Food & Beverage "
  },
  {
    key: "996",
    rank: "984",
    name: "Samir Mehta ",
    netWorth: "$3.1 B",
    age: "58",
    country: "India",
    source: "pharmaceuticals, power",
    industry: "Healthcare "
  },
  {
    key: "997",
    rank: "984",
    name: "Sudhir Mehta ",
    netWorth: "$3.1 B",
    age: "67",
    country: "India",
    source: "pharmaceuticals, power",
    industry: "Healthcare "
  },
  {
    key: "998",
    rank: "984",
    name: "Pawan Munjal & family ",
    netWorth: "$3.1 B",
    age: "68",
    country: "India",
    source: "motorcycles",
    industry: "Automotive "
  },
  {
    key: "999",
    rank: "984",
    name: "Nguyen Thi Phuong Thao ",
    netWorth: "$3.1 B",
    age: "51",
    country: "Vietnam",
    source: "airlines",
    industry: "Diversified "
  },
  {
    key: "1000",
    rank: "984",
    name: "Madhukar Parekh ",
    netWorth: "$3.1 B",
    age: "75",
    country: "India",
    source: "adhesives",
    industry: "Manufacturing "
  },
  {
    key: "1001",
    rank: "984",
    name: "Sergei Popov ",
    netWorth: "$3.1 B",
    age: "50",
    country: "Russia",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "1002",
    rank: "984",
    name: "Haim Saban ",
    netWorth: "$3.1 B",
    age: "77",
    country: "United States",
    source: "TV network, investments",
    industry: "Media & Entertainment "
  },
  {
    key: "1003",
    rank: "984",
    name: "Karthik Sarma ",
    netWorth: "$3.1 B",
    age: "47",
    country: "India",
    source: "hedge fund",
    industry: "Finance & Investments "
  },
  {
    key: "1004",
    rank: "984",
    name: "Klaus-Peter Schulenberg ",
    netWorth: "$3.1 B",
    age: "70",
    country: "Germany",
    source: "ticketing service",
    industry: "Service "
  },
  {
    key: "1005",
    rank: "984",
    name: "Pat Stryker ",
    netWorth: "$3.1 B",
    age: "65",
    country: "United States",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "1006",
    rank: "984",
    name: "Jeff Sutton ",
    netWorth: "$3.1 B",
    age: "62",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1007",
    rank: "984",
    name: "Jon Yarbrough ",
    netWorth: "$3.1 B",
    age: "64",
    country: "United States",
    source: "video games",
    industry: "Gambling & Casinos "
  },
  {
    key: "1008",
    rank: "984",
    name: "Gang Ye ",
    netWorth: "$3.1 B",
    age: "41",
    country: "Singapore",
    source: "gaming",
    industry: "Media & Entertainment "
  },
  {
    key: "1009",
    rank: "984",
    name: "Yi Zheng ",
    netWorth: "$3.1 B",
    age: "51",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1010",
    rank: "984",
    name: "Zhang Fan ",
    netWorth: "$3.1 B",
    age: "56",
    country: "China",
    source: "touch screens",
    industry: "Technology "
  },
  {
    key: "1011",
    rank: "1012",
    name: "William Ackman ",
    netWorth: "$3 B",
    age: "55",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1012",
    rank: "1012",
    name: "Markus Blocher ",
    netWorth: "$3 B",
    age: "51",
    country: "Switzerland",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1013",
    rank: "1012",
    name: "Neal Blue & family ",
    netWorth: "$3 B",
    age: "87",
    country: "United States",
    source: "defense",
    industry: "Manufacturing "
  },
  {
    key: "1014",
    rank: "1012",
    name: "Eva Maria Bucher-Haefner ",
    netWorth: "$3 B",
    age: "65",
    country: "Switzerland",
    source: "software, investments",
    industry: "Technology "
  },
  {
    key: "1015",
    rank: "1012",
    name: "Chang Kuo-Hua ",
    netWorth: "$3 B",
    age: "67",
    country: "Taiwan",
    source: "shipping, airlines",
    industry: "Logistics "
  },
  {
    key: "1016",
    rank: "1012",
    name: "Todd Christopher ",
    netWorth: "$3 B",
    age: "59",
    country: "United States",
    source: "hair care products",
    industry: "Fashion & Retail "
  },
  {
    key: "1017",
    rank: "1012",
    name: "Euisun Chung ",
    netWorth: "$3 B",
    age: "51",
    country: "South Korea",
    source: "Hyundai",
    industry: "Logistics "
  },
  {
    key: "1018",
    rank: "1012",
    name: "Bernard Ecclestone & family ",
    netWorth: "$3 B",
    age: "91",
    country: "United Kingdom",
    source: "Formula One",
    industry: "Sports "
  },
  {
    key: "1019",
    rank: "1012",
    name: "Michael Federmann & family ",
    netWorth: "$3 B",
    age: "78",
    country: "Israel",
    source: "defense, hotels",
    industry: "Technology "
  },
  {
    key: "1020",
    rank: "1012",
    name: "Gudrun Heine ",
    netWorth: "$3 B",
    age: "67",
    country: "Germany",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "1021",
    rank: "1012",
    name: "Heidi Horten ",
    netWorth: "$3 B",
    age: "81",
    country: "Austria",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1022",
    rank: "1012",
    name: "Dawen Huang ",
    netWorth: "$3 B",
    age: "61",
    country: "Hong Kong",
    source: "silicon",
    industry: "Manufacturing "
  },
  {
    key: "1023",
    rank: "1012",
    name: "Sheldon Lavin ",
    netWorth: "$3 B",
    age: "89",
    country: "United States",
    source: "meat processing",
    industry: "Food & Beverage "
  },
  {
    key: "1024",
    rank: "1012",
    name: "Li Min ",
    netWorth: "$3 B",
    age: "56",
    country: "China",
    source: "semiconductor",
    industry: "Technology "
  },
  {
    key: "1025",
    rank: "1012",
    name: "Liang Yunchao ",
    netWorth: "$3 B",
    age: "53",
    country: "China",
    source: "nutritional supplements",
    industry: "Food & Beverage "
  },
  {
    key: "1026",
    rank: "1012",
    name: "Joseph Liemandt ",
    netWorth: "$3 B",
    age: "53",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1027",
    rank: "1012",
    name: "Strive Masiyiwa ",
    netWorth: "$3 B",
    age: "61",
    country: "Zimbabwe",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "1028",
    rank: "1012",
    name: "Masahiro Miki ",
    netWorth: "$3 B",
    age: "66",
    country: "Japan",
    source: "shoes",
    industry: "Fashion & Retail "
  },
  {
    key: "1029",
    rank: "1012",
    name: "Pan Laican ",
    netWorth: "$3 B",
    age: "64",
    country: "China",
    source: "soy sauce",
    industry: "Food & Beverage "
  },
  {
    key: "1030",
    rank: "1012",
    name: "Karsanbhai Patel ",
    netWorth: "$3 B",
    age: "78",
    country: "India",
    source: "consumer goods",
    industry: "Diversified "
  },
  {
    key: "1031",
    rank: "1012",
    name: "Arvind Poddar ",
    netWorth: "$3 B",
    age: "64",
    country: "India",
    source: "tires",
    industry: "Automotive "
  },
  {
    key: "1032",
    rank: "1012",
    name: "Remo Ruffini ",
    netWorth: "$3 B",
    age: "60",
    country: "Italy",
    source: "winter jackets",
    industry: "Fashion & Retail "
  },
  {
    key: "1033",
    rank: "1012",
    name: "Eddy Kusnadi Sariaatmadja ",
    netWorth: "$3 B",
    age: "68",
    country: "Indonesia",
    source: "media, tech",
    industry: "Media & Entertainment "
  },
  {
    key: "1034",
    rank: "1012",
    name: "Sybill Storz ",
    netWorth: "$3 B",
    age: "84",
    country: "Germany",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "1035",
    rank: "1012",
    name: "Lawrence Stroll ",
    netWorth: "$3 B",
    age: "62",
    country: "Canada",
    source: "fashion investments",
    industry: "Fashion & Retail "
  },
  {
    key: "1036",
    rank: "1012",
    name: "Wijono & Hermanto Tanoko ",
    netWorth: "$3 B",
    age: "64",
    country: "Indonesia",
    source: "paints",
    industry: "Manufacturing "
  },
  {
    key: "1037",
    rank: "1012",
    name: "Michael Tojner ",
    netWorth: "$3 B",
    age: "56",
    country: "Austria",
    source: "batteries, investments",
    industry: "Manufacturing "
  },
  {
    key: "1038",
    rank: "1012",
    name: "Donald Trump ",
    netWorth: "$3 B",
    age: "75",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1039",
    rank: "1012",
    name: "Tsai Ming-kai ",
    netWorth: "$3 B",
    age: "71",
    country: "Taiwan",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "1040",
    rank: "1012",
    name: "John Tyson ",
    netWorth: "$3 B",
    age: "68",
    country: "United States",
    source: "food processing",
    industry: "Food & Beverage "
  },
  {
    key: "1041",
    rank: "1012",
    name: "Rufino Vigil Gonzalez ",
    netWorth: "$3 B",
    age: "73",
    country: "Mexico",
    source: "steel",
    industry: "Metals & Mining "
  },
  {
    key: "1042",
    rank: "1012",
    name: "Ning Wang & family ",
    netWorth: "$3 B",
    age: "35",
    country: "China",
    source: "toys",
    industry: "Media & Entertainment "
  },
  {
    key: "1043",
    rank: "1012",
    name: "Wang Yusuo & family ",
    netWorth: "$3 B",
    age: "58",
    country: "China",
    source: "natural gas distribution",
    industry: "Energy "
  },
  {
    key: "1044",
    rank: "1012",
    name: "Zhigang Wu & family ",
    netWorth: "$3 B",
    age: "87",
    country: "China",
    source: "bakery chain",
    industry: "Food & Beverage "
  },
  {
    key: "1045",
    rank: "1012",
    name: "Xie Juhua & family ",
    netWorth: "$3 B",
    age: "71",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1046",
    rank: "1012",
    name: "Oren Zeev ",
    netWorth: "$3 B",
    age: "57",
    country: "Israel",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1047",
    rank: "1012",
    name: "Charles Zegar ",
    netWorth: "$3 B",
    age: "74",
    country: "United States",
    source: "Bloomberg LP",
    industry: "Media & Entertainment "
  },
  {
    key: "1048",
    rank: "1012",
    name: "Zhang Lei ",
    netWorth: "$3 B",
    age: "49",
    country: "China",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1049",
    rank: "1012",
    name: "Zhang Xin & Pan Shiyi ",
    netWorth: "$3 B",
    age: "56",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1050",
    rank: "1012",
    name: "Zhu Yan & family ",
    netWorth: "$3 B",
    age: "64",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1051",
    rank: "1012",
    name: "Mortimer Zuckerman ",
    netWorth: "$3 B",
    age: "84",
    country: "United States",
    source: "real estate, media",
    industry: "Real Estate "
  },
  {
    key: "1052",
    rank: "1053",
    name: "Juan Abello ",
    netWorth: "$2.9 B",
    age: "80",
    country: "Spain",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1053",
    rank: "1053",
    name: "John Armitage ",
    netWorth: "$2.9 B",
    age: "62",
    country: "Ireland",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1054",
    rank: "1053",
    name: "Bang Si-hyuk ",
    netWorth: "$2.9 B",
    age: "49",
    country: "South Korea",
    source: "entertainment",
    industry: "Media & Entertainment "
  },
  {
    key: "1055",
    rank: "1053",
    name: "Miriam Baumann-Blocher ",
    netWorth: "$2.9 B",
    age: "47",
    country: "Switzerland",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1056",
    rank: "1053",
    name: "Riley Bechtel & family ",
    netWorth: "$2.9 B",
    age: "70",
    country: "United States",
    source: "engineering, construction",
    industry: "Construction & Engineering "
  },
  {
    key: "1057",
    rank: "1053",
    name: "Wilhelm Beier & family ",
    netWorth: "$2.9 B",
    age: "65",
    country: "Germany",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1058",
    rank: "1053",
    name: "Nicolas Berggruen ",
    netWorth: "$2.9 B",
    age: "60",
    country: "United States",
    source: "real estate, investments",
    industry: "Real Estate "
  },
  {
    key: "1059",
    rank: "1053",
    name: "Bui Thanh Nhon ",
    netWorth: "$2.9 B",
    age: "64",
    country: "Vietnam",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1060",
    rank: "1053",
    name: "Cao Longxiang & family ",
    netWorth: "$2.9 B",
    age: "64",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1061",
    rank: "1053",
    name: "Deng Wen ",
    netWorth: "$2.9 B",
    age: "54",
    country: "China",
    source: "flavorings",
    industry: "Food & Beverage "
  },
  {
    key: "1062",
    rank: "1053",
    name: "Daniel Dines ",
    netWorth: "$2.9 B",
    age: "50",
    country: "Romania",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1063",
    rank: "1053",
    name: "Joseph Edelman ",
    netWorth: "$2.9 B",
    age: "66",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1064",
    rank: "1053",
    name: "N. Murray Edwards ",
    netWorth: "$2.9 B",
    age: "62",
    country: "Canada",
    source: "oil & gas",
    industry: "Energy "
  },
  {
    key: "1065",
    rank: "1053",
    name: "Jane Goldman ",
    netWorth: "$2.9 B",
    age: "66",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1066",
    rank: "1053",
    name: "Guo Zhenyu & family ",
    netWorth: "$2.9 B",
    age: "58",
    country: "Canada",
    source: "cosmetics",
    industry: "Fashion & Retail "
  },
  {
    key: "1067",
    rank: "1053",
    name: "Stewart Horejsi & family ",
    netWorth: "$2.9 B",
    age: "84",
    country: "United States",
    source: "Berkshire Hathaway",
    industry: "Finance & Investments "
  },
  {
    key: "1068",
    rank: "1053",
    name: "Zhenda Huang & family ",
    netWorth: "$2.9 B",
    age: "74",
    country: "China",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "1069",
    rank: "1053",
    name: "Jeremy Jacobs, Sr. & family ",
    netWorth: "$2.9 B",
    age: "82",
    country: "United States",
    source: "food service",
    industry: "Service "
  },
  {
    key: "1070",
    rank: "1053",
    name: "Hamilton James ",
    netWorth: "$2.9 B",
    age: "70",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1071",
    rank: "1053",
    name: "Valentin Kipyatkov ",
    netWorth: "$2.9 B",
    age: "45",
    country: "Russia",
    source: "computer software",
    industry: "Technology "
  },
  {
    key: "1072",
    rank: "1053",
    name: "Li Zhongchu ",
    netWorth: "$2.9 B",
    age: "58",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1073",
    rank: "1053",
    name: "Martin Lorentzon ",
    netWorth: "$2.9 B",
    age: "53",
    country: "Sweden",
    source: "Spotify",
    industry: "Technology "
  },
  {
    key: "1074",
    rank: "1053",
    name: "Drayton McLane, Jr. ",
    netWorth: "$2.9 B",
    age: "85",
    country: "United States",
    source: "Walmart, logistics",
    industry: "Fashion & Retail "
  },
  {
    key: "1075",
    rank: "1053",
    name: "Benjamin Otto ",
    netWorth: "$2.9 B",
    age: "64",
    country: "Germany",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1076",
    rank: "1053",
    name: "Roger Penske ",
    netWorth: "$2.9 B",
    age: "85",
    country: "United States",
    source: "cars",
    industry: "Automotive "
  },
  {
    key: "1077",
    rank: "1053",
    name: "Olivier Pomel ",
    netWorth: "$2.9 B",
    age: "45",
    country: "France",
    source: "cloud computing",
    industry: "Technology "
  },
  {
    key: "1078",
    rank: "1053",
    name: "Jean Salata ",
    netWorth: "$2.9 B",
    age: "56",
    country: "Chile",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "1079",
    rank: "1053",
    name: "Arnout Schuijff ",
    netWorth: "$2.9 B",
    age: "54",
    country: "Netherlands",
    source: "payments software",
    industry: "Technology "
  },
  {
    key: "1080",
    rank: "1053",
    name: "Shen Hua & family ",
    netWorth: "$2.9 B",
    age: "59",
    country: "United States",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "1081",
    rank: "1053",
    name: "Martua Sitorus ",
    netWorth: "$2.9 B",
    age: "62",
    country: "Indonesia",
    source: "palm oil",
    industry: "Manufacturing "
  },
  {
    key: "1082",
    rank: "1053",
    name: "Zygmunt Solorz-Zak ",
    netWorth: "$2.9 B",
    age: "65",
    country: "Poland",
    source: "TV broadcasting",
    industry: "Media & Entertainment "
  },
  {
    key: "1083",
    rank: "1053",
    name: "Warren Stephens ",
    netWorth: "$2.9 B",
    age: "65",
    country: "United States",
    source: "investment banking",
    industry: "Finance & Investments "
  },
  {
    key: "1084",
    rank: "1053",
    name: "Tang Jinkui & family ",
    netWorth: "$2.9 B",
    age: "66",
    country: "China",
    source: "textiles, petrochemicals",
    industry: "Manufacturing "
  },
  {
    key: "1085",
    rank: "1053",
    name: "Alan Trefler ",
    netWorth: "$2.9 B",
    age: "66",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1086",
    rank: "1053",
    name: "Masateru Uno & family ",
    netWorth: "$2.9 B",
    age: "75",
    country: "Japan",
    source: "drugstores",
    industry: "Fashion & Retail "
  },
  {
    key: "1087",
    rank: "1053",
    name: "Frank VanderSloot ",
    netWorth: "$2.9 B",
    age: "73",
    country: "United States",
    source: "nutrition, wellness products",
    industry: "Fashion & Retail "
  },
  {
    key: "1088",
    rank: "1053",
    name: "Guangming Wu ",
    netWorth: "$2.9 B",
    age: "60",
    country: "China",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "1089",
    rank: "1053",
    name: "Kai Wu ",
    netWorth: "$2.9 B",
    age: "54",
    country: "China",
    source: "batteries",
    industry: "Energy "
  },
  {
    key: "1090",
    rank: "1053",
    name: "Ye Fan & family ",
    netWorth: "$2.9 B",
    age: "51",
    country: "China",
    source: "auto dealerships",
    industry: "Automotive "
  },
  {
    key: "1091",
    rank: "1053",
    name: "Yoo Jung-hyun ",
    netWorth: "$2.9 B",
    age: "52",
    country: "South Korea",
    source: "online games",
    industry: "Media & Entertainment "
  },
  {
    key: "1092",
    rank: "1053",
    name: "Fenggang Zhao ",
    netWorth: "$2.9 B",
    age: "56",
    country: "China",
    source: "batteries",
    industry: "Energy "
  },
  {
    key: "1093",
    rank: "1053",
    name: "Zheng Xiaodong ",
    netWorth: "$2.9 B",
    age: "58",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1094",
    rank: "1053",
    name: "Zhou Jianping ",
    netWorth: "$2.9 B",
    age: "61",
    country: "China",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1095",
    rank: "1096",
    name: "Jose Joao Abdalla Filho ",
    netWorth: "$2.8 B",
    age: "76",
    country: "Brazil",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1096",
    rank: "1096",
    name: "Brian Acton ",
    netWorth: "$2.8 B",
    age: "50",
    country: "United States",
    source: "WhatsApp",
    industry: "Technology "
  },
  {
    key: "1097",
    rank: "1096",
    name: "Bill Alfond ",
    netWorth: "$2.8 B",
    age: "73",
    country: "United States",
    source: "shoes",
    industry: "Fashion & Retail "
  },
  {
    key: "1098",
    rank: "1096",
    name: "Susan Alfond ",
    netWorth: "$2.8 B",
    age: "76",
    country: "United States",
    source: "shoes",
    industry: "Fashion & Retail "
  },
  {
    key: "1099",
    rank: "1096",
    name: "Ted Alfond ",
    netWorth: "$2.8 B",
    age: "77",
    country: "United States",
    source: "shoes",
    industry: "Fashion & Retail "
  },
  {
    key: "1100",
    rank: "1096",
    name: "Felix Baker ",
    netWorth: "$2.8 B",
    age: "53",
    country: "United States",
    source: "biotech investing",
    industry: "Finance & Investments "
  },
  {
    key: "1101",
    rank: "1096",
    name: "Julian Baker ",
    netWorth: "$2.8 B",
    age: "55",
    country: "United States",
    source: "investing",
    industry: "Finance & Investments "
  },
  {
    key: "1102",
    rank: "1096",
    name: "Karen Virginia Beckmann Legoretta ",
    netWorth: "$2.8 B",
    age: "52",
    country: "Mexico",
    source: "tequila",
    industry: "Food & Beverage "
  },
  {
    key: "1103",
    rank: "1096",
    name: "Maurizio Billi ",
    netWorth: "$2.8 B",
    age: "64",
    country: "Brazil",
    source: "generic drugs",
    industry: "Healthcare "
  },
  {
    key: "1104",
    rank: "1096",
    name: "Otto Philipp Braun ",
    netWorth: "$2.8 B",
    age: "44",
    country: "Germany",
    source: "medical technology",
    industry: "Healthcare "
  },
  {
    key: "1105",
    rank: "1096",
    name: "Garrett Camp ",
    netWorth: "$2.8 B",
    age: "43",
    country: "Canada",
    source: "Uber",
    industry: "Technology "
  },
  {
    key: "1106",
    rank: "1096",
    name: "Cao Ji ",
    netWorth: "$2.8 B",
    age: "70",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1107",
    rank: "1096",
    name: "Hua Chen ",
    netWorth: "$2.8 B",
    age: "56",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1108",
    rank: "1096",
    name: "John Paul DeJoria ",
    netWorth: "$2.8 B",
    age: "77",
    country: "United States",
    source: "hair products, tequila",
    industry: "Fashion & Retail "
  },
  {
    key: "1109",
    rank: "1096",
    name: "Beda Diethelm ",
    netWorth: "$2.8 B",
    age: "81",
    country: "Switzerland",
    source: "hearing aids",
    industry: "Healthcare "
  },
  {
    key: "1110",
    rank: "1096",
    name: "K. Dinesh ",
    netWorth: "$2.8 B",
    age: "67",
    country: "India",
    source: "software services",
    industry: "Technology "
  },
  {
    key: "1111",
    rank: "1096",
    name: "Dong Fan ",
    netWorth: "$2.8 B",
    age: "52",
    country: "China",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "1112",
    rank: "1096",
    name: "Bennett Dorrance ",
    netWorth: "$2.8 B",
    age: "76",
    country: "United States",
    source: "Campbell Soup",
    industry: "Food & Beverage "
  },
  {
    key: "1113",
    rank: "1096",
    name: "Marcel Erni ",
    netWorth: "$2.8 B",
    age: "57",
    country: "Switzerland",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1114",
    rank: "1096",
    name: "Abhay Firodia ",
    netWorth: "$2.8 B",
    age: "77",
    country: "India",
    source: "automobiles",
    industry: "Automotive "
  },
  {
    key: "1115",
    rank: "1096",
    name: "Alfred Gantner ",
    netWorth: "$2.8 B",
    age: "54",
    country: "Switzerland",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1116",
    rank: "1096",
    name: "Allan Goldman ",
    netWorth: "$2.8 B",
    age: "79",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1117",
    rank: "1096",
    name: "Amy Goldman Fowler ",
    netWorth: "$2.8 B",
    age: "67",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1118",
    rank: "1096",
    name: "J. Tomilson Hill ",
    netWorth: "$2.8 B",
    age: "73",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1119",
    rank: "1096",
    name: "Hong Jie ",
    netWorth: "$2.8 B",
    age: "54",
    country: "China",
    source: "paint",
    industry: "Manufacturing "
  },
  {
    key: "1120",
    rank: "1096",
    name: "James Jannard ",
    netWorth: "$2.8 B",
    age: "72",
    country: "United States",
    source: "sunglasses",
    industry: "Fashion & Retail "
  },
  {
    key: "1121",
    rank: "1096",
    name: "Travis Kalanick ",
    netWorth: "$2.8 B",
    age: "45",
    country: "United States",
    source: "Uber",
    industry: "Technology "
  },
  {
    key: "1122",
    rank: "1096",
    name: "Diane Kemper ",
    netWorth: "$2.8 B",
    age: "76",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1123",
    rank: "1096",
    name: "George Kurtz ",
    netWorth: "$2.8 B",
    age: "51",
    country: "United States",
    source: "security software",
    industry: "Technology "
  },
  {
    key: "1124",
    rank: "1096",
    name: "Kwek Leng Beng ",
    netWorth: "$2.8 B",
    age: "81",
    country: "Singapore",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1125",
    rank: "1096",
    name: "Geoffrey Kwok ",
    netWorth: "$2.8 B",
    age: "36",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1126",
    rank: "1096",
    name: "Lai Jianping ",
    netWorth: "$2.8 B",
    age: "64",
    country: "China",
    source: "soy sauce",
    industry: "Food & Beverage "
  },
  {
    key: "1127",
    rank: "1096",
    name: "Maritsa Lazari & family ",
    netWorth: "$2.8 B",
    age: "77",
    country: "United Kingdom",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1128",
    rank: "1096",
    name: "Alexis Lê-Quôc ",
    netWorth: "$2.8 B",
    age: "47",
    country: "United States",
    source: "cloud computing",
    industry: "Technology "
  },
  {
    key: "1129",
    rank: "1096",
    name: "Angela Leong ",
    netWorth: "$2.8 B",
    age: "61",
    country: "Hong Kong",
    source: "casinos",
    industry: "Real Estate "
  },
  {
    key: "1130",
    rank: "1096",
    name: "Lin Chen-hai ",
    netWorth: "$2.8 B",
    age: "75",
    country: "Taiwan",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1131",
    rank: "1096",
    name: "Sergio Mantegazza ",
    netWorth: "$2.8 B",
    age: "94",
    country: "Switzerland",
    source: "travel",
    industry: "Service "
  },
  {
    key: "1132",
    rank: "1096",
    name: "Hans Melchers ",
    netWorth: "$2.8 B",
    age: "83",
    country: "Netherlands",
    source: "chemicals, investments",
    industry: "Finance & Investments "
  },
  {
    key: "1133",
    rank: "1096",
    name: "Tom Morris ",
    netWorth: "$2.8 B",
    age: "67",
    country: "United Kingdom",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1134",
    rank: "1096",
    name: "Eugene Murtagh ",
    netWorth: "$2.8 B",
    age: "79",
    country: "Ireland",
    source: "building materials",
    industry: "Manufacturing "
  },
  {
    key: "1135",
    rank: "1096",
    name: "Philip Niarchos ",
    netWorth: "$2.8 B",
    age: "68",
    country: "Greece",
    source: "art collection",
    industry: "Diversified "
  },
  {
    key: "1136",
    rank: "1096",
    name: "Pan Dong ",
    netWorth: "$2.8 B",
    age: "57",
    country: "Canada",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "1137",
    rank: "1096",
    name: "Sean Parker ",
    netWorth: "$2.8 B",
    age: "42",
    country: "United States",
    source: "Facebook",
    industry: "Technology "
  },
  {
    key: "1138",
    rank: "1096",
    name: "Richard Peery ",
    netWorth: "$2.8 B",
    age: "83",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1139",
    rank: "1096",
    name: "Gregorio Perez Companc & family ",
    netWorth: "$2.8 B",
    age: "86",
    country: "Argentina",
    source: "oil & gas",
    industry: "Energy "
  },
  {
    key: "1140",
    rank: "1096",
    name: "Sebastian Piñera & family ",
    netWorth: "$2.8 B",
    age: "72",
    country: "Chile",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1141",
    rank: "1096",
    name: "Nicholas Pritzker ",
    netWorth: "$2.8 B",
    age: "78",
    country: "United States",
    source: "hotels, investments",
    industry: "Finance & Investments "
  },
  {
    key: "1142",
    rank: "1096",
    name: "Jeff Rothschild ",
    netWorth: "$2.8 B",
    age: "67",
    country: "United States",
    source: "Facebook",
    industry: "Technology "
  },
  {
    key: "1143",
    rank: "1096",
    name: "Steven Sarowitz ",
    netWorth: "$2.8 B",
    age: "56",
    country: "United States",
    source: "payroll software",
    industry: "Technology "
  },
  {
    key: "1144",
    rank: "1096",
    name: "Isabella Seràgnoli ",
    netWorth: "$2.8 B",
    age: "76",
    country: "Italy",
    source: "packaging",
    industry: "Manufacturing "
  },
  {
    key: "1145",
    rank: "1096",
    name: "Stephen Smith ",
    netWorth: "$2.8 B",
    age: "70",
    country: "Canada",
    source: "finance and investments",
    industry: "Finance & Investments "
  },
  {
    key: "1146",
    rank: "1096",
    name: "William Stone ",
    netWorth: "$2.8 B",
    age: "66",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1147",
    rank: "1096",
    name: "Sun Hongbin ",
    netWorth: "$2.8 B",
    age: "59",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1148",
    rank: "1096",
    name: "Sun Shoukuan ",
    netWorth: "$2.8 B",
    age: "72",
    country: "China",
    source: "metals, coal",
    industry: "Manufacturing "
  },
  {
    key: "1149",
    rank: "1096",
    name: "Henry Sy, Jr. ",
    netWorth: "$2.8 B",
    age: "69",
    country: "Philippines",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1150",
    rank: "1096",
    name: "Andrew Tan ",
    netWorth: "$2.8 B",
    age: "70",
    country: "Philippines",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1151",
    rank: "1096",
    name: "Kenneth Tuchman ",
    netWorth: "$2.8 B",
    age: "62",
    country: "United States",
    source: "call centers",
    industry: "Service "
  },
  {
    key: "1152",
    rank: "1096",
    name: "Tung Chee Hwa ",
    netWorth: "$2.8 B",
    age: "84",
    country: "Hong Kong",
    source: "shipping",
    industry: "Logistics "
  },
  {
    key: "1153",
    rank: "1096",
    name: "Bulat Utemuratov ",
    netWorth: "$2.8 B",
    age: "64",
    country: "Kazakhstan",
    source: "mining, banking, hotels",
    industry: "Metals & Mining "
  },
  {
    key: "1154",
    rank: "1096",
    name: "Anna Katharina Viessmann ",
    netWorth: "$2.8 B",
    age: "64",
    country: "Germany",
    source: "heating and cooling equipment",
    industry: "Manufacturing "
  },
  {
    key: "1155",
    rank: "1096",
    name: "Xicheng Wang & family ",
    netWorth: "$2.8 B",
    age: "73",
    country: "China",
    source: "tires",
    industry: "Manufacturing "
  },
  {
    key: "1156",
    rank: "1096",
    name: "Urs Wietlisbach ",
    netWorth: "$2.8 B",
    age: "60",
    country: "Switzerland",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1157",
    rank: "1096",
    name: "Wong Man Li ",
    netWorth: "$2.8 B",
    age: "57",
    country: "Hong Kong",
    source: "furniture",
    industry: "Manufacturing "
  },
  {
    key: "1158",
    rank: "1096",
    name: "Xie Weitong ",
    netWorth: "$2.8 B",
    age: "65",
    country: "Taiwan",
    source: "cobalt",
    industry: "Metals & Mining "
  },
  {
    key: "1159",
    rank: "1096",
    name: "Xu Chuanhua & family ",
    netWorth: "$2.8 B",
    age: "87",
    country: "China",
    source: "chemicals, logistics",
    industry: "Manufacturing "
  },
  {
    key: "1160",
    rank: "1096",
    name: "Ye Xiaoping ",
    netWorth: "$2.8 B",
    age: "59",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1161",
    rank: "1096",
    name: "Weiguo Zhao ",
    netWorth: "$2.8 B",
    age: "55",
    country: "China",
    source: "IT products",
    industry: "Technology "
  },
  {
    key: "1162",
    rank: "1163",
    name: "Ben Ashkenazy ",
    netWorth: "$2.7 B",
    age: "52",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1163",
    rank: "1163",
    name: "Bill Austin ",
    netWorth: "$2.7 B",
    age: "80",
    country: "United States",
    source: "hearing aids",
    industry: "Manufacturing "
  },
  {
    key: "1164",
    rank: "1163",
    name: "Pavel Baudis ",
    netWorth: "$2.7 B",
    age: "61",
    country: "Czechia",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1165",
    rank: "1163",
    name: "Yvonne Bauer ",
    netWorth: "$2.7 B",
    age: "45",
    country: "Germany",
    source: "magazines, media",
    industry: "Media & Entertainment "
  },
  {
    key: "1166",
    rank: "1163",
    name: "Giuliana Benetton ",
    netWorth: "$2.7 B",
    age: "84",
    country: "Italy",
    source: "fashion retail, investments",
    industry: "Fashion & Retail "
  },
  {
    key: "1167",
    rank: "1163",
    name: "Luciano Benetton ",
    netWorth: "$2.7 B",
    age: "86",
    country: "Italy",
    source: "fashion retail, investments",
    industry: "Fashion & Retail "
  },
  {
    key: "1168",
    rank: "1163",
    name: "Aneel Bhusri ",
    netWorth: "$2.7 B",
    age: "56",
    country: "United States",
    source: "business software",
    industry: "Technology "
  },
  {
    key: "1169",
    rank: "1163",
    name: "George Bishop ",
    netWorth: "$2.7 B",
    age: "84",
    country: "United States",
    source: "oil & gas",
    industry: "Energy "
  },
  {
    key: "1170",
    rank: "1163",
    name: "Vivek Chand Burman ",
    netWorth: "$2.7 B",
    age: "84",
    country: "India",
    source: "consumer goods",
    industry: "Food & Beverage "
  },
  {
    key: "1171",
    rank: "1163",
    name: "Morris Chang ",
    netWorth: "$2.7 B",
    age: "90",
    country: "Taiwan",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "1172",
    rank: "1163",
    name: "Jinxia Chen ",
    netWorth: "$2.7 B",
    age: "54",
    country: "China",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1173",
    rank: "1163",
    name: "Cho Jung-ho ",
    netWorth: "$2.7 B",
    age: "63",
    country: "South Korea",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "1174",
    rank: "1163",
    name: "Jack Cockwell ",
    netWorth: "$2.7 B",
    age: "81",
    country: "Canada",
    source: "real estate, private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1175",
    rank: "1163",
    name: "Edward DeBartolo, Jr. ",
    netWorth: "$2.7 B",
    age: "75",
    country: "United States",
    source: "shopping centers",
    industry: "Real Estate "
  },
  {
    key: "1176",
    rank: "1163",
    name: "Abilio dos Santos Diniz ",
    netWorth: "$2.7 B",
    age: "85",
    country: "Brazil",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1177",
    rank: "1163",
    name: "John Dorrance, III. ",
    netWorth: "$2.7 B",
    age: "78",
    country: "Ireland",
    source: "Campbell Soup",
    industry: "Food & Beverage "
  },
  {
    key: "1178",
    rank: "1163",
    name: "Hailiang Feng ",
    netWorth: "$2.7 B",
    age: "61",
    country: "China",
    source: "copper, education",
    industry: "Metals & Mining "
  },
  {
    key: "1179",
    rank: "1163",
    name: "Xingjiang Gao ",
    netWorth: "$2.7 B",
    age: "58",
    country: "China",
    source: "steel",
    industry: "Manufacturing "
  },
  {
    key: "1180",
    rank: "1163",
    name: "Carlos Hank Rhon ",
    netWorth: "$2.7 B",
    age: "74",
    country: "Mexico",
    source: "banking",
    industry: "Diversified "
  },
  {
    key: "1181",
    rank: "1163",
    name: "Vivek Jain ",
    netWorth: "$2.7 B",
    age: "66",
    country: "India",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1182",
    rank: "1163",
    name: "Brad Kelley ",
    netWorth: "$2.7 B",
    age: "65",
    country: "United States",
    source: "tobacco",
    industry: "Real Estate "
  },
  {
    key: "1183",
    rank: "1163",
    name: "Alicia Koplowitz ",
    netWorth: "$2.7 B",
    age: "68",
    country: "Spain",
    source: "construction, investments",
    industry: "Finance & Investments "
  },
  {
    key: "1184",
    rank: "1163",
    name: "Li Li ",
    netWorth: "$2.7 B",
    age: "56",
    country: "China",
    source: "healthcare",
    industry: "Healthcare "
  },
  {
    key: "1185",
    rank: "1163",
    name: "C. Dean Metropoulos ",
    netWorth: "$2.7 B",
    age: "75",
    country: "United States",
    source: "investments",
    industry: "Food & Beverage "
  },
  {
    key: "1186",
    rank: "1163",
    name: "Dan Olsson ",
    netWorth: "$2.7 B",
    age: "75",
    country: "Sweden",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1187",
    rank: "1163",
    name: "Tor Peterson ",
    netWorth: "$2.7 B",
    age: "57",
    country: "United States",
    source: "commodities",
    industry: "Metals & Mining "
  },
  {
    key: "1188",
    rank: "1163",
    name: "John Pritzker ",
    netWorth: "$2.7 B",
    age: "68",
    country: "United States",
    source: "hotels, investments",
    industry: "Finance & Investments "
  },
  {
    key: "1189",
    rank: "1163",
    name: "Hussain Sajwani ",
    netWorth: "$2.7 B",
    age: "69",
    country: "United Arab Emirates",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1190",
    rank: "1163",
    name: "Tseng Cheng ",
    netWorth: "$2.7 B",
    age: "60",
    country: "Taiwan",
    source: "petrochemicals",
    industry: "Manufacturing "
  },
  {
    key: "1191",
    rank: "1163",
    name: "Jerry Yang ",
    netWorth: "$2.7 B",
    age: "53",
    country: "United States",
    source: "Yahoo",
    industry: "Technology "
  },
  {
    key: "1192",
    rank: "1163",
    name: "Takao Yasuda ",
    netWorth: "$2.7 B",
    age: "72",
    country: "Japan",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1193",
    rank: "1163",
    name: "Yu Qibing & family ",
    netWorth: "$2.7 B",
    age: "56",
    country: "China",
    source: "glass",
    industry: "Manufacturing "
  },
  {
    key: "1194",
    rank: "1163",
    name: "Zhang Xuezheng ",
    netWorth: "$2.7 B",
    age: "46",
    country: "China",
    source: "telecom",
    industry: "Technology "
  },
  {
    key: "1195",
    rank: "1196",
    name: "Abdulla bin Ahmad Al Ghurair & family ",
    netWorth: "$2.6 B",
    age: "64",
    country: "United Arab Emirates",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1196",
    rank: "1196",
    name: "Isak Andic & family ",
    netWorth: "$2.6 B",
    age: "68",
    country: "Spain",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1197",
    rank: "1196",
    name: "Harindarpal Banga ",
    netWorth: "$2.6 B",
    age: "71",
    country: "India",
    source: "commodities",
    industry: "Finance & Investments "
  },
  {
    key: "1198",
    rank: "1196",
    name: "Anne Beaufour ",
    netWorth: "$2.6 B",
    age: "58",
    country: "France",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1199",
    rank: "1196",
    name: "Henri Beaufour ",
    netWorth: "$2.6 B",
    age: "56",
    country: "France",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1200",
    rank: "1196",
    name: "Sanjeev Bikhchandani ",
    netWorth: "$2.6 B",
    age: "58",
    country: "India",
    source: "Internet",
    industry: "Technology "
  },
  {
    key: "1201",
    rank: "1196",
    name: "Norman Braman ",
    netWorth: "$2.6 B",
    age: "89",
    country: "United States",
    source: "art, car dealerships",
    industry: "Automotive "
  },
  {
    key: "1202",
    rank: "1196",
    name: "J. Hyatt Brown ",
    netWorth: "$2.6 B",
    age: "84",
    country: "United States",
    source: "insurance",
    industry: "Finance & Investments "
  },
  {
    key: "1203",
    rank: "1196",
    name: "Chen Lip Keong ",
    netWorth: "$2.6 B",
    age: "74",
    country: "Malaysia",
    source: "casinos, property, energy",
    industry: "Gambling & Casinos "
  },
  {
    key: "1204",
    rank: "1196",
    name: "Jim Coulter ",
    netWorth: "$2.6 B",
    age: "62",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1205",
    rank: "1196",
    name: "Federico De Nora ",
    netWorth: "$2.6 B",
    age: "54",
    country: "Italy",
    source: "electrodes",
    industry: "Manufacturing "
  },
  {
    key: "1206",
    rank: "1196",
    name: "Dong Wei ",
    netWorth: "$2.6 B",
    age: "51",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1207",
    rank: "1196",
    name: "Sandeep Engineer ",
    netWorth: "$2.6 B",
    age: "60",
    country: "India",
    source: "plastic pipes",
    industry: "Manufacturing "
  },
  {
    key: "1208",
    rank: "1196",
    name: "Alceu Elias Feldmann ",
    netWorth: "$2.6 B",
    age: "72",
    country: "Brazil",
    source: "fertilizer",
    industry: "Energy "
  },
  {
    key: "1209",
    rank: "1196",
    name: "Frank Fertitta, III. ",
    netWorth: "$2.6 B",
    age: "60",
    country: "United States",
    source: "casinos, mixed martial arts",
    industry: "Sports "
  },
  {
    key: "1210",
    rank: "1196",
    name: "Lorenzo Fertitta ",
    netWorth: "$2.6 B",
    age: "53",
    country: "United States",
    source: "casinos, mixed martial arts",
    industry: "Sports "
  },
  {
    key: "1211",
    rank: "1196",
    name: "Doris Fisher ",
    netWorth: "$2.6 B",
    age: "90",
    country: "United States",
    source: "Gap",
    industry: "Fashion & Retail "
  },
  {
    key: "1212",
    rank: "1196",
    name: "Alec Gores ",
    netWorth: "$2.6 B",
    age: "69",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1213",
    rank: "1196",
    name: "Rajinder Gupta ",
    netWorth: "$2.6 B",
    age: "63",
    country: "India",
    source: "textiles, paper",
    industry: "Manufacturing "
  },
  {
    key: "1214",
    rank: "1196",
    name: "Igor Kesaev ",
    netWorth: "$2.6 B",
    age: "55",
    country: "Russia",
    source: "tobacco distribution, retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1215",
    rank: "1196",
    name: "Raj Kumar & Kishin RK ",
    netWorth: "$2.6 B",
    age: "67",
    country: "Singapore",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1216",
    rank: "1196",
    name: "Li Hongxin & family ",
    netWorth: "$2.6 B",
    age: "69",
    country: "China",
    source: "paper & related products",
    industry: "Manufacturing "
  },
  {
    key: "1217",
    rank: "1196",
    name: "Liu Fangyi ",
    netWorth: "$2.6 B",
    age: "52",
    country: "China",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "1218",
    rank: "1196",
    name: "Lu Zhongfang ",
    netWorth: "$2.6 B",
    age: "79",
    country: "China",
    source: "education",
    industry: "Automotive "
  },
  {
    key: "1219",
    rank: "1196",
    name: "Nirmal Minda ",
    netWorth: "$2.6 B",
    age: "64",
    country: "India",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "1220",
    rank: "1196",
    name: "Farhad Moshiri ",
    netWorth: "$2.6 B",
    age: "66",
    country: "United Kingdom",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1221",
    rank: "1196",
    name: "Hans Georg Naeder ",
    netWorth: "$2.6 B",
    age: "60",
    country: "Germany",
    source: "prosthetics",
    industry: "Manufacturing "
  },
  {
    key: "1222",
    rank: "1196",
    name: "Eren Ozmen ",
    netWorth: "$2.6 B",
    age: "63",
    country: "United States",
    source: "aerospace",
    industry: "Manufacturing "
  },
  {
    key: "1223",
    rank: "1196",
    name: "Ronald Perelman ",
    netWorth: "$2.6 B",
    age: "79",
    country: "United States",
    source: "leveraged buyouts",
    industry: "Finance & Investments "
  },
  {
    key: "1224",
    rank: "1196",
    name: "Ravi Pillai ",
    netWorth: "$2.6 B",
    age: "68",
    country: "India",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "1225",
    rank: "1196",
    name: "Daniel Pritzker ",
    netWorth: "$2.6 B",
    age: "62",
    country: "United States",
    source: "hotels, investments",
    industry: "Finance & Investments "
  },
  {
    key: "1226",
    rank: "1196",
    name: "Matthias Reinhart ",
    netWorth: "$2.6 B",
    age: "62",
    country: "Switzerland",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "1227",
    rank: "1196",
    name: "Alejandro Santo Domingo ",
    netWorth: "$2.6 B",
    age: "45",
    country: "United States",
    source: "beer",
    industry: "Food & Beverage "
  },
  {
    key: "1228",
    rank: "1196",
    name: "Vivek Chaand Sehgal ",
    netWorth: "$2.6 B",
    age: "65",
    country: "Australia",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "1229",
    rank: "1196",
    name: "Kavitark Ram Shriram ",
    netWorth: "$2.6 B",
    age: "65",
    country: "United States",
    source: "venture capital, Google",
    industry: "Technology "
  },
  {
    key: "1230",
    rank: "1196",
    name: "Hans Sy ",
    netWorth: "$2.6 B",
    age: "66",
    country: "Philippines",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1231",
    rank: "1196",
    name: "Herbert Sy ",
    netWorth: "$2.6 B",
    age: "65",
    country: "Philippines",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1232",
    rank: "1196",
    name: "Tahir & family ",
    netWorth: "$2.6 B",
    age: "70",
    country: "Indonesia",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1233",
    rank: "1196",
    name: "Wang Linpeng ",
    netWorth: "$2.6 B",
    age: "53",
    country: "China",
    source: "furniture retailing",
    industry: "Construction & Engineering "
  },
  {
    key: "1234",
    rank: "1196",
    name: "David Wertheim ",
    netWorth: "$2.6 B",
    age: "64",
    country: "Israel",
    source: "Coca Cola Israel",
    industry: "Food & Beverage "
  },
  {
    key: "1235",
    rank: "1196",
    name: "Oprah Winfrey ",
    netWorth: "$2.6 B",
    age: "68",
    country: "United States",
    source: "TV shows",
    industry: "Media & Entertainment "
  },
  {
    key: "1236",
    rank: "1196",
    name: "Xingming Zhu ",
    netWorth: "$2.6 B",
    age: "55",
    country: "China",
    source: "electrical equipment",
    industry: "Manufacturing "
  },
  {
    key: "1237",
    rank: "1238",
    name: "Abdulla Al Futtaim & family ",
    netWorth: "$2.5 B",
    age: "64",
    country: "United Arab Emirates",
    source: "auto dealers, investments",
    industry: "Automotive "
  },
  {
    key: "1238",
    rank: "1238",
    name: "Suhail Bahwan ",
    netWorth: "$2.5 B",
    age: "83",
    country: "Oman",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1239",
    rank: "1238",
    name: "Ulrike Baro ",
    netWorth: "$2.5 B",
    age: "64",
    country: "Germany",
    source: "biopharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1240",
    rank: "1238",
    name: "David Baszucki ",
    netWorth: "$2.5 B",
    age: "59",
    country: "United States",
    source: "online games",
    industry: "Media & Entertainment "
  },
  {
    key: "1241",
    rank: "1238",
    name: "Thor Bjorgolfsson ",
    netWorth: "$2.5 B",
    age: "55",
    country: "Iceland",
    source: "investments",
    industry: "Diversified "
  },
  {
    key: "1242",
    rank: "1238",
    name: "Charles Bronfman ",
    netWorth: "$2.5 B",
    age: "90",
    country: "Canada",
    source: "liquor",
    industry: "Food & Beverage "
  },
  {
    key: "1243",
    rank: "1238",
    name: "Chen Qiongxiang ",
    netWorth: "$2.5 B",
    age: "64",
    country: "China",
    source: "batteries",
    industry: "Energy "
  },
  {
    key: "1244",
    rank: "1238",
    name: "Chen Tei-fu ",
    netWorth: "$2.5 B",
    age: "73",
    country: "Taiwan",
    source: "herbal products",
    industry: "Fashion & Retail "
  },
  {
    key: "1245",
    rank: "1238",
    name: "Chuchat Petaumpai & Daonapa Petampai ",
    netWorth: "$2.5 B",
    age: "69",
    country: "Thailand",
    source: "motorcycle loans",
    industry: "Finance & Investments "
  },
  {
    key: "1246",
    rank: "1238",
    name: "Leon G. Cooperman ",
    netWorth: "$2.5 B",
    age: "78",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1247",
    rank: "1238",
    name: "Smita Crishna-Godrej ",
    netWorth: "$2.5 B",
    age: "71",
    country: "India",
    source: "consumer goods",
    industry: "Diversified "
  },
  {
    key: "1248",
    rank: "1238",
    name: "Jacques D'Amours ",
    netWorth: "$2.5 B",
    age: "65",
    country: "Canada",
    source: "convenience stores",
    industry: "Fashion & Retail "
  },
  {
    key: "1249",
    rank: "1238",
    name: "Maria Del Pino ",
    netWorth: "$2.5 B",
    age: "66",
    country: "Spain",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "1250",
    rank: "1238",
    name: "Yoichi & Keiko Erikawa ",
    netWorth: "$2.5 B",
    age: "64",
    country: "Japan",
    source: "videogames",
    industry: "Media & Entertainment "
  },
  {
    key: "1251",
    rank: "1238",
    name: "Gerald Ford ",
    netWorth: "$2.5 B",
    age: "77",
    country: "United States",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "1252",
    rank: "1238",
    name: "Adi Godrej ",
    netWorth: "$2.5 B",
    age: "80",
    country: "India",
    source: "consumer goods",
    industry: "Diversified "
  },
  {
    key: "1253",
    rank: "1238",
    name: "Jamshyd Godrej ",
    netWorth: "$2.5 B",
    age: "73",
    country: "India",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1254",
    rank: "1238",
    name: "Nadir Godrej ",
    netWorth: "$2.5 B",
    age: "71",
    country: "India",
    source: "consumer goods",
    industry: "Diversified "
  },
  {
    key: "1255",
    rank: "1238",
    name: "Sanjiv Goenka ",
    netWorth: "$2.5 B",
    age: "61",
    country: "India",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1256",
    rank: "1238",
    name: "Stein Erik Hagen ",
    netWorth: "$2.5 B",
    age: "65",
    country: "Norway",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "1257",
    rank: "1238",
    name: "Donald Horton & family ",
    netWorth: "$2.5 B",
    age: "72",
    country: "United States",
    source: "homebuilding",
    industry: "Real Estate "
  },
  {
    key: "1258",
    rank: "1238",
    name: "Hu Yangzhong ",
    netWorth: "$2.5 B",
    age: "57",
    country: "China",
    source: "technology",
    industry: "Technology "
  },
  {
    key: "1259",
    rank: "1238",
    name: "Baba Kalyani ",
    netWorth: "$2.5 B",
    age: "73",
    country: "India",
    source: "engineering",
    industry: "Construction & Engineering "
  },
  {
    key: "1260",
    rank: "1238",
    name: "Stephen Lansdown ",
    netWorth: "$2.5 B",
    age: "69",
    country: "Guernsey",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "1261",
    rank: "1238",
    name: "Mark Leonard & family ",
    netWorth: "$2.5 B",
    age: "65",
    country: "Canada",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1262",
    rank: "1238",
    name: "William Li ",
    netWorth: "$2.5 B",
    age: "47",
    country: "China",
    source: "electric vehicles",
    industry: "Automotive "
  },
  {
    key: "1263",
    rank: "1238",
    name: "K.C. Liu ",
    netWorth: "$2.5 B",
    age: "68",
    country: "Taiwan",
    source: "manufacturing",
    industry: "Technology "
  },
  {
    key: "1264",
    rank: "1238",
    name: "Liu Xiaodong ",
    netWorth: "$2.5 B",
    age: "54",
    country: "China",
    source: "flavorings",
    industry: "Manufacturing "
  },
  {
    key: "1265",
    rank: "1238",
    name: "Aloke Lohia ",
    netWorth: "$2.5 B",
    age: "63",
    country: "India",
    source: "petrochemicals",
    industry: "Manufacturing "
  },
  {
    key: "1266",
    rank: "1238",
    name: "Mohamed Mansour ",
    netWorth: "$2.5 B",
    age: "74",
    country: "Egypt",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1267",
    rank: "1238",
    name: "Kishore Mariwala ",
    netWorth: "$2.5 B",
    age: "87",
    country: "India",
    source: "consumer goods",
    industry: "Food & Beverage "
  },
  {
    key: "1268",
    rank: "1238",
    name: "Jed McCaleb ",
    netWorth: "$2.5 B",
    age: "47",
    country: "United States",
    source: "cryptocurrency",
    industry: "Finance & Investments "
  },
  {
    key: "1269",
    rank: "1238",
    name: "Enhua Mi ",
    netWorth: "$2.5 B",
    age: "64",
    country: "China",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1270",
    rank: "1238",
    name: "Willy Michel ",
    netWorth: "$2.5 B",
    age: "75",
    country: "Switzerland",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "1271",
    rank: "1238",
    name: "Lachhman Das Mittal ",
    netWorth: "$2.5 B",
    age: "91",
    country: "India",
    source: "tractors",
    industry: "Automotive "
  },
  {
    key: "1272",
    rank: "1238",
    name: "Ravi Modi ",
    netWorth: "$2.5 B",
    age: "45",
    country: "India",
    source: "readymade garments",
    industry: "Fashion & Retail "
  },
  {
    key: "1273",
    rank: "1238",
    name: "Charles Munger ",
    netWorth: "$2.5 B",
    age: "98",
    country: "United States",
    source: "Berkshire Hathaway",
    industry: "Finance & Investments "
  },
  {
    key: "1274",
    rank: "1238",
    name: "Rishad Naoroji ",
    netWorth: "$2.5 B",
    age: "70",
    country: "India",
    source: "consumer goods",
    industry: "Diversified "
  },
  {
    key: "1275",
    rank: "1238",
    name: "Yongpei Ni & family ",
    netWorth: "$2.5 B",
    age: "70",
    country: "China",
    source: "beverages",
    industry: "Food & Beverage "
  },
  {
    key: "1276",
    rank: "1238",
    name: "Fatih Ozmen ",
    netWorth: "$2.5 B",
    age: "64",
    country: "United States",
    source: "aerospace",
    industry: "Manufacturing "
  },
  {
    key: "1277",
    rank: "1238",
    name: "Qiu Minxiu ",
    netWorth: "$2.5 B",
    age: "76",
    country: "China",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "1278",
    rank: "1238",
    name: "Stewart Rahr ",
    netWorth: "$2.5 B",
    age: "76",
    country: "United States",
    source: "drug distribution",
    industry: "Healthcare "
  },
  {
    key: "1279",
    rank: "1238",
    name: "Prathap Reddy ",
    netWorth: "$2.5 B",
    age: "90",
    country: "India",
    source: "healthcare",
    industry: "Healthcare "
  },
  {
    key: "1280",
    rank: "1238",
    name: "Chad Richison ",
    netWorth: "$2.5 B",
    age: "51",
    country: "United States",
    source: "payroll processing",
    industry: "Technology "
  },
  {
    key: "1281",
    rank: "1238",
    name: "Karin Sartorius-Herbst ",
    netWorth: "$2.5 B",
    age: "64",
    country: "Germany",
    source: "biopharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1282",
    rank: "1238",
    name: "Christiane Schoeller ",
    netWorth: "$2.5 B",
    age: "64",
    country: "Germany",
    source: "publishing",
    industry: "Media & Entertainment "
  },
  {
    key: "1283",
    rank: "1238",
    name: "Suh Kyung-bae ",
    netWorth: "$2.5 B",
    age: "59",
    country: "South Korea",
    source: "cosmetics",
    industry: "Fashion & Retail "
  },
  {
    key: "1284",
    rank: "1238",
    name: "Glen Taylor ",
    netWorth: "$2.5 B",
    age: "80",
    country: "United States",
    source: "printing",
    industry: "Service "
  },
  {
    key: "1285",
    rank: "1238",
    name: "Nadia Thiele ",
    netWorth: "$2.5 B",
    age: "46",
    country: "Germany",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1286",
    rank: "1238",
    name: "Wang Minwen ",
    netWorth: "$2.5 B",
    age: "58",
    country: "China",
    source: "semiconductor",
    industry: "Technology "
  },
  {
    key: "1287",
    rank: "1238",
    name: "Huijiao Yu ",
    netWorth: "$2.5 B",
    age: "56",
    country: "China",
    source: "package delivery",
    industry: "Logistics "
  },
  {
    key: "1288",
    rank: "1238",
    name: "Zhang Ning & family ",
    netWorth: "$2.5 B",
    age: "48",
    country: "Canada",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1289",
    rank: "1238",
    name: "Zhao Tao ",
    netWorth: "$2.5 B",
    age: "56",
    country: "Singapore",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1290",
    rank: "1238",
    name: "Hongyi Zhou ",
    netWorth: "$2.5 B",
    age: "51",
    country: "China",
    source: "security software",
    industry: "Technology "
  },
  {
    key: "1291",
    rank: "1292",
    name: "Rajendra Agarwal ",
    netWorth: "$2.4 B",
    age: "63",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1292",
    rank: "1292",
    name: "George Argyros & family ",
    netWorth: "$2.4 B",
    age: "85",
    country: "United States",
    source: "real estate, investments",
    industry: "Real Estate "
  },
  {
    key: "1293",
    rank: "1292",
    name: "Edward Bass ",
    netWorth: "$2.4 B",
    age: "76",
    country: "United States",
    source: "oil, investments",
    industry: "Energy "
  },
  {
    key: "1294",
    rank: "1292",
    name: "Banwari Lal Bawri ",
    netWorth: "$2.4 B",
    age: "69",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1295",
    rank: "1292",
    name: "Girdhari Lal Bawri ",
    netWorth: "$2.4 B",
    age: "74",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1296",
    rank: "1292",
    name: "Chao Teng-hsiung ",
    netWorth: "$2.4 B",
    age: "77",
    country: "Taiwan",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1297",
    rank: "1292",
    name: "Zhisong Chen ",
    netWorth: "$2.4 B",
    age: "56",
    country: "China",
    source: "communication equipment",
    industry: "Technology "
  },
  {
    key: "1298",
    rank: "1292",
    name: "Chey Tae-won ",
    netWorth: "$2.4 B",
    age: "61",
    country: "South Korea",
    source: "oil, semiconductor",
    industry: "Telecom "
  },
  {
    key: "1299",
    rank: "1292",
    name: "Choo Chong Ngen ",
    netWorth: "$2.4 B",
    age: "68",
    country: "Singapore",
    source: "hotels",
    industry: "Real Estate "
  },
  {
    key: "1300",
    rank: "1292",
    name: "John Coates ",
    netWorth: "$2.4 B",
    age: "52",
    country: "United Kingdom",
    source: "online gambling",
    industry: "Gambling & Casinos "
  },
  {
    key: "1301",
    rank: "1292",
    name: "Alexandra Daitch ",
    netWorth: "$2.4 B",
    age: "59",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "1302",
    rank: "1292",
    name: "Chetan Dube ",
    netWorth: "$2.4 B",
    age: "56",
    country: "United States",
    source: "technology",
    industry: "Technology "
  },
  {
    key: "1303",
    rank: "1292",
    name: "Daniel Ek ",
    netWorth: "$2.4 B",
    age: "39",
    country: "Sweden",
    source: "Spotify",
    industry: "Technology "
  },
  {
    key: "1304",
    rank: "1292",
    name: "John Fisher ",
    netWorth: "$2.4 B",
    age: "60",
    country: "United States",
    source: "Gap",
    industry: "Fashion & Retail "
  },
  {
    key: "1305",
    rank: "1292",
    name: "Bernard Fraisse & family ",
    netWorth: "$2.4 B",
    age: "65",
    country: "France",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1306",
    rank: "1292",
    name: "William Franke ",
    netWorth: "$2.4 B",
    age: "84",
    country: "United States",
    source: "low-cost airlines",
    industry: "Diversified "
  },
  {
    key: "1307",
    rank: "1292",
    name: "Caroline Hagen Kjos ",
    netWorth: "$2.4 B",
    age: "38",
    country: "Norway",
    source: "conglomerate",
    industry: "Diversified "
  },
  {
    key: "1308",
    rank: "1292",
    name: "Lam Kong ",
    netWorth: "$2.4 B",
    age: "57",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1309",
    rank: "1292",
    name: "Hans Langer ",
    netWorth: "$2.4 B",
    age: "70",
    country: "Germany",
    source: "3D printing",
    industry: "Manufacturing "
  },
  {
    key: "1310",
    rank: "1292",
    name: "Joe Lau ",
    netWorth: "$2.4 B",
    age: "32",
    country: "United States",
    source: "blockchain, technology",
    industry: "Technology "
  },
  {
    key: "1311",
    rank: "1292",
    name: "Kevin David Lehmann ",
    netWorth: "$2.4 B",
    age: "19",
    country: "Germany",
    source: "drugstores",
    industry: "Fashion & Retail "
  },
  {
    key: "1312",
    rank: "1292",
    name: "Liang Qin & family ",
    netWorth: "$2.4 B",
    age: "50",
    country: "China",
    source: "semiconductor devices",
    industry: "Technology "
  },
  {
    key: "1313",
    rank: "1292",
    name: "Peter Lim ",
    netWorth: "$2.4 B",
    age: "68",
    country: "Singapore",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1314",
    rank: "1292",
    name: "Sarah MacMillan ",
    netWorth: "$2.4 B",
    age: "68",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "1315",
    rank: "1292",
    name: "Kalanithi Maran ",
    netWorth: "$2.4 B",
    age: "56",
    country: "India",
    source: "media",
    industry: "Media & Entertainment "
  },
  {
    key: "1316",
    rank: "1292",
    name: "Lirio Parisotto ",
    netWorth: "$2.4 B",
    age: "68",
    country: "Brazil",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1317",
    rank: "1292",
    name: "Rajan Raheja & family ",
    netWorth: "$2.4 B",
    age: "67",
    country: "India",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1318",
    rank: "1292",
    name: "Alberto Roemmers ",
    netWorth: "$2.4 B",
    age: "95",
    country: "Argentina",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1319",
    rank: "1292",
    name: "Rodney Sacks ",
    netWorth: "$2.4 B",
    age: "72",
    country: "United States",
    source: "energy drinks",
    industry: "Food & Beverage "
  },
  {
    key: "1320",
    rank: "1292",
    name: "Ferit Faik Sahenk ",
    netWorth: "$2.4 B",
    age: "58",
    country: "Turkey",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1321",
    rank: "1292",
    name: "Hilton Schlosberg ",
    netWorth: "$2.4 B",
    age: "69",
    country: "United Kingdom",
    source: "energy drinks",
    industry: "Food & Beverage "
  },
  {
    key: "1322",
    rank: "1292",
    name: "Alberto Siccardi & family ",
    netWorth: "$2.4 B",
    age: "77",
    country: "Switzerland",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "1323",
    rank: "1292",
    name: "Salil Singhal ",
    netWorth: "$2.4 B",
    age: "74",
    country: "India",
    source: "agrochemicals",
    industry: "Manufacturing "
  },
  {
    key: "1324",
    rank: "1292",
    name: "Lucy Stitzer ",
    netWorth: "$2.4 B",
    age: "62",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "1325",
    rank: "1292",
    name: "Otto Toto Sugiri ",
    netWorth: "$2.4 B",
    age: "68",
    country: "Indonesia",
    source: "data centers",
    industry: "Technology "
  },
  {
    key: "1326",
    rank: "1292",
    name: "Harley Sy ",
    netWorth: "$2.4 B",
    age: "62",
    country: "Philippines",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1327",
    rank: "1292",
    name: "Teresita Sy-Coson ",
    netWorth: "$2.4 B",
    age: "71",
    country: "Philippines",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1328",
    rank: "1292",
    name: "Katsumi Tada ",
    netWorth: "$2.4 B",
    age: "76",
    country: "Japan",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1329",
    rank: "1292",
    name: "Tang Yiu ",
    netWorth: "$2.4 B",
    age: "88",
    country: "Hong Kong",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1330",
    rank: "1292",
    name: "Jeff Tangney ",
    netWorth: "$2.4 B",
    age: "49",
    country: "United States",
    source: "healthcare IT",
    industry: "Healthcare "
  },
  {
    key: "1331",
    rank: "1292",
    name: "Lottie Tham & family ",
    netWorth: "$2.4 B",
    age: "72",
    country: "Sweden",
    source: "H&M",
    industry: "Fashion & Retail "
  },
  {
    key: "1332",
    rank: "1292",
    name: "T.Y. Tsai ",
    netWorth: "$2.4 B",
    age: "69",
    country: "Taiwan",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "1333",
    rank: "1292",
    name: "Timur Turlov ",
    netWorth: "$2.4 B",
    age: "34",
    country: "Russia",
    source: "stock brokerage",
    industry: "Finance & Investments "
  },
  {
    key: "1334",
    rank: "1292",
    name: "Hamdi Ulukaya ",
    netWorth: "$2.4 B",
    age: "49",
    country: "Turkey",
    source: "greek yogurt",
    industry: "Food & Beverage "
  },
  {
    key: "1335",
    rank: "1292",
    name: "Peter Unger ",
    netWorth: "$2.4 B",
    age: "77",
    country: "Germany",
    source: "auto repair",
    industry: "Automotive "
  },
  {
    key: "1336",
    rank: "1292",
    name: "Nikil Viswanathan ",
    netWorth: "$2.4 B",
    age: "34",
    country: "United States",
    source: "blockchain technology",
    industry: "Technology "
  },
  {
    key: "1337",
    rank: "1292",
    name: "Anthony Wood ",
    netWorth: "$2.4 B",
    age: "56",
    country: "United States",
    source: "Roku",
    industry: "Technology "
  },
  {
    key: "1338",
    rank: "1292",
    name: "Zhang Hongwei ",
    netWorth: "$2.4 B",
    age: "67",
    country: "China",
    source: "oil, banking",
    industry: "Diversified "
  },
  {
    key: "1339",
    rank: "1292",
    name: "Zhang Li ",
    netWorth: "$2.4 B",
    age: "69",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1340",
    rank: "1341",
    name: "Houshan Bai ",
    netWorth: "$2.3 B",
    age: "58",
    country: "China",
    source: "lithium battery",
    industry: "Energy "
  },
  {
    key: "1341",
    rank: "1341",
    name: "Alex Beard ",
    netWorth: "$2.3 B",
    age: "54",
    country: "United Kingdom",
    source: "mining, commodities",
    industry: "Metals & Mining "
  },
  {
    key: "1342",
    rank: "1341",
    name: "Koos Bekker ",
    netWorth: "$2.3 B",
    age: "69",
    country: "South Africa",
    source: "media, investments",
    industry: "Media & Entertainment "
  },
  {
    key: "1343",
    rank: "1341",
    name: "William Boyd & family ",
    netWorth: "$2.3 B",
    age: "90",
    country: "United States",
    source: "casinos, banking",
    industry: "Gambling & Casinos "
  },
  {
    key: "1344",
    rank: "1341",
    name: "Timothy Boyle ",
    netWorth: "$2.3 B",
    age: "72",
    country: "United States",
    source: "Columbia Sportswear",
    industry: "Fashion & Retail "
  },
  {
    key: "1345",
    rank: "1341",
    name: "Anand Burman ",
    netWorth: "$2.3 B",
    age: "69",
    country: "India",
    source: "consumer goods",
    industry: "Food & Beverage "
  },
  {
    key: "1346",
    rank: "1341",
    name: "Richard Chandler ",
    netWorth: "$2.3 B",
    age: "63",
    country: "New Zealand",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1347",
    rank: "1341",
    name: "R.G. Chandramogan ",
    netWorth: "$2.3 B",
    age: "73",
    country: "India",
    source: "dairy",
    industry: "Food & Beverage "
  },
  {
    key: "1348",
    rank: "1341",
    name: "Cho Young-sik ",
    netWorth: "$2.3 B",
    age: "60",
    country: "South Korea",
    source: "diagnostics",
    industry: "Healthcare "
  },
  {
    key: "1349",
    rank: "1341",
    name: "Chu Lam Yiu ",
    netWorth: "$2.3 B",
    age: "52",
    country: "Hong Kong",
    source: "flavorings",
    industry: "Manufacturing "
  },
  {
    key: "1350",
    rank: "1341",
    name: "Kommer Damen ",
    netWorth: "$2.3 B",
    age: "78",
    country: "Netherlands",
    source: "shipbuilding",
    industry: "Manufacturing "
  },
  {
    key: "1351",
    rank: "1341",
    name: "Henry Davis ",
    netWorth: "$2.3 B",
    age: "71",
    country: "United States",
    source: "beef processing",
    industry: "Food & Beverage "
  },
  {
    key: "1352",
    rank: "1341",
    name: "Ray Davis ",
    netWorth: "$2.3 B",
    age: "80",
    country: "United States",
    source: "pipelines",
    industry: "Energy "
  },
  {
    key: "1353",
    rank: "1341",
    name: "Stephen Feinberg ",
    netWorth: "$2.3 B",
    age: "62",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1354",
    rank: "1341",
    name: "Kenneth Feld & family ",
    netWorth: "$2.3 B",
    age: "73",
    country: "United States",
    source: "live entertainment",
    industry: "Media & Entertainment "
  },
  {
    key: "1355",
    rank: "1341",
    name: "Alexander Frolov ",
    netWorth: "$2.3 B",
    age: "57",
    country: "Russia",
    source: "mining, steel",
    industry: "Metals & Mining "
  },
  {
    key: "1356",
    rank: "1341",
    name: "Mario Germano Giuliani ",
    netWorth: "$2.3 B",
    age: "50",
    country: "Switzerland",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1357",
    rank: "1341",
    name: "Serge Godin ",
    netWorth: "$2.3 B",
    age: "72",
    country: "Canada",
    source: "information technology",
    industry: "Technology "
  },
  {
    key: "1358",
    rank: "1341",
    name: "Noam Gottesman ",
    netWorth: "$2.3 B",
    age: "60",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1359",
    rank: "1341",
    name: "Philip & Cristina Green ",
    netWorth: "$2.3 B",
    age: "70",
    country: "United Kingdom",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1360",
    rank: "1341",
    name: "Yusuf Hamied ",
    netWorth: "$2.3 B",
    age: "85",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1361",
    rank: "1341",
    name: "Bill Haslam ",
    netWorth: "$2.3 B",
    age: "63",
    country: "United States",
    source: "gas stations",
    industry: "Fashion & Retail "
  },
  {
    key: "1362",
    rank: "1341",
    name: "Hans-Werner Hector ",
    netWorth: "$2.3 B",
    age: "82",
    country: "Germany",
    source: "SAP",
    industry: "Technology "
  },
  {
    key: "1363",
    rank: "1341",
    name: "Ho Hung Anh ",
    netWorth: "$2.3 B",
    age: "51",
    country: "Vietnam",
    source: "consumer products, banking",
    industry: "Finance & Investments "
  },
  {
    key: "1364",
    rank: "1341",
    name: "Douglas Hsu ",
    netWorth: "$2.3 B",
    age: "79",
    country: "Taiwan",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1365",
    rank: "1341",
    name: "Erman Ilicak ",
    netWorth: "$2.3 B",
    age: "54",
    country: "Turkey",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "1366",
    rank: "1341",
    name: "Zhaobai Jiang ",
    netWorth: "$2.3 B",
    age: "58",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1367",
    rank: "1341",
    name: "Osman Kibar ",
    netWorth: "$2.3 B",
    age: "51",
    country: "United States",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "1368",
    rank: "1341",
    name: "Adam Kwok ",
    netWorth: "$2.3 B",
    age: "39",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1369",
    rank: "1341",
    name: "Frank Laukien ",
    netWorth: "$2.3 B",
    age: "62",
    country: "United States",
    source: "scientific equipment",
    industry: "Manufacturing "
  },
  {
    key: "1370",
    rank: "1341",
    name: "Louis Le Duff ",
    netWorth: "$2.3 B",
    age: "75",
    country: "France",
    source: "bakeries",
    industry: "Food & Beverage "
  },
  {
    key: "1371",
    rank: "1341",
    name: "Solomon Lew ",
    netWorth: "$2.3 B",
    age: "77",
    country: "Australia",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1372",
    rank: "1341",
    name: "Liang Rubo ",
    netWorth: "$2.3 B",
    age: "39",
    country: "China",
    source: "TikTok",
    industry: "Technology "
  },
  {
    key: "1373",
    rank: "1341",
    name: "Liang Zhaoxian ",
    netWorth: "$2.3 B",
    age: "57",
    country: "China",
    source: "appliances",
    industry: "Manufacturing "
  },
  {
    key: "1374",
    rank: "1341",
    name: "Prayudh Mahagitsiri ",
    netWorth: "$2.3 B",
    age: "76",
    country: "Thailand",
    source: "coffee, shipping",
    industry: "Food & Beverage "
  },
  {
    key: "1375",
    rank: "1341",
    name: "Clayton Mathile ",
    netWorth: "$2.3 B",
    age: "81",
    country: "United States",
    source: "pet food",
    industry: "Food & Beverage "
  },
  {
    key: "1376",
    rank: "1341",
    name: "Erwin Franz Mueller ",
    netWorth: "$2.3 B",
    age: "89",
    country: "Germany",
    source: "drugstores",
    industry: "Fashion & Retail "
  },
  {
    key: "1377",
    rank: "1341",
    name: "David Murdock ",
    netWorth: "$2.3 B",
    age: "98",
    country: "United States",
    source: "Dole, real estate",
    industry: "Food & Beverage "
  },
  {
    key: "1378",
    rank: "1341",
    name: "Rubens Ometto Silveira Mello ",
    netWorth: "$2.3 B",
    age: "72",
    country: "Brazil",
    source: "sugar, ethanol",
    industry: "Energy "
  },
  {
    key: "1379",
    rank: "1341",
    name: "Erik Paulsson & family ",
    netWorth: "$2.3 B",
    age: "80",
    country: "Sweden",
    source: "construction, real estate",
    industry: "Real Estate "
  },
  {
    key: "1380",
    rank: "1341",
    name: "Heloise Pratt ",
    netWorth: "$2.3 B",
    age: "59",
    country: "Australia",
    source: "manufacturing, investment",
    industry: "Manufacturing "
  },
  {
    key: "1381",
    rank: "1341",
    name: "Qiu Jianping & family ",
    netWorth: "$2.3 B",
    age: "60",
    country: "China",
    source: "hand tools",
    industry: "Manufacturing "
  },
  {
    key: "1382",
    rank: "1341",
    name: "Dirk Rossmann & family ",
    netWorth: "$2.3 B",
    age: "75",
    country: "Germany",
    source: "drugstores",
    industry: "Fashion & Retail "
  },
  {
    key: "1383",
    rank: "1341",
    name: "Karin Schick ",
    netWorth: "$2.3 B",
    age: "64",
    country: "Germany",
    source: "information technology",
    industry: "Technology "
  },
  {
    key: "1384",
    rank: "1341",
    name: "Stephan Schmidheiny ",
    netWorth: "$2.3 B",
    age: "74",
    country: "Switzerland",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1385",
    rank: "1341",
    name: "Wenrong Shen ",
    netWorth: "$2.3 B",
    age: "76",
    country: "China",
    source: "steel production",
    industry: "Metals & Mining "
  },
  {
    key: "1386",
    rank: "1341",
    name: "Guangxin Sun ",
    netWorth: "$2.3 B",
    age: "59",
    country: "China",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1387",
    rank: "1341",
    name: "Mengquan Sun & family ",
    netWorth: "$2.3 B",
    age: "72",
    country: "China",
    source: "edible oil",
    industry: "Food & Beverage "
  },
  {
    key: "1388",
    rank: "1341",
    name: "Thomas Tull ",
    netWorth: "$2.3 B",
    age: "51",
    country: "United States",
    source: "movies, investments",
    industry: "Media & Entertainment "
  },
  {
    key: "1389",
    rank: "1341",
    name: "Ted Turner ",
    netWorth: "$2.3 B",
    age: "83",
    country: "United States",
    source: "cable television",
    industry: "Media & Entertainment "
  },
  {
    key: "1390",
    rank: "1341",
    name: "David Walentas ",
    netWorth: "$2.3 B",
    age: "83",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1391",
    rank: "1341",
    name: "Yingming Wu ",
    netWorth: "$2.3 B",
    age: "55",
    country: "China",
    source: "batteries",
    industry: "Energy "
  },
  {
    key: "1392",
    rank: "1341",
    name: "Yingzhuo Xu ",
    netWorth: "$2.3 B",
    age: "54",
    country: "China",
    source: "agribusiness",
    industry: "Food & Beverage "
  },
  {
    key: "1393",
    rank: "1341",
    name: "Christoph Zeller ",
    netWorth: "$2.3 B",
    age: "64",
    country: "Liechtenstein",
    source: "dental materials",
    industry: "Healthcare "
  },
  {
    key: "1394",
    rank: "1341",
    name: "Zhang Wanzhen ",
    netWorth: "$2.3 B",
    age: "72",
    country: "China",
    source: "electronics components",
    industry: "Manufacturing "
  },
  {
    key: "1395",
    rank: "1341",
    name: "Xiaojuan Zhang ",
    netWorth: "$2.3 B",
    age: "52",
    country: "China",
    source: "logistics",
    industry: "Logistics "
  },
  {
    key: "1396",
    rank: "1397",
    name: "Michael Ashcroft ",
    netWorth: "$2.2 B",
    age: "76",
    country: "United Kingdom",
    source: "security",
    industry: "Finance & Investments "
  },
  {
    key: "1397",
    rank: "1397",
    name: "Alex Atallah ",
    netWorth: "$2.2 B",
    age: "30",
    country: "United States",
    source: "online marketplace",
    industry: "Technology "
  },
  {
    key: "1398",
    rank: "1397",
    name: "Brett Blundy ",
    netWorth: "$2.2 B",
    age: "62",
    country: "Australia",
    source: "retail, agribusiness",
    industry: "Fashion & Retail "
  },
  {
    key: "1399",
    rank: "1397",
    name: "Chris Britt ",
    netWorth: "$2.2 B",
    age: "49",
    country: "United States",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "1400",
    rank: "1397",
    name: "Cen Junda ",
    netWorth: "$2.2 B",
    age: "57",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1401",
    rank: "1397",
    name: "Yadu Hari Dalmia & family ",
    netWorth: "$2.2 B",
    age: "74",
    country: "India",
    source: "cement",
    industry: "Manufacturing "
  },
  {
    key: "1402",
    rank: "1397",
    name: "Zhenggang Dou ",
    netWorth: "$2.2 B",
    age: "68",
    country: "China",
    source: "energy, chemicals",
    industry: "Diversified "
  },
  {
    key: "1403",
    rank: "1397",
    name: "Weimin Du ",
    netWorth: "$2.2 B",
    age: "58",
    country: "China",
    source: "vaccines",
    industry: "Healthcare "
  },
  {
    key: "1404",
    rank: "1397",
    name: "Devin Finzer ",
    netWorth: "$2.2 B",
    age: "31",
    country: "United States",
    source: "online marketplace",
    industry: "Technology "
  },
  {
    key: "1405",
    rank: "1397",
    name: "Robert Friedland ",
    netWorth: "$2.2 B",
    age: "71",
    country: "United States",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "1406",
    rank: "1397",
    name: "Phillip Frost ",
    netWorth: "$2.2 B",
    age: "85",
    country: "United States",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1407",
    rank: "1397",
    name: "Jeffrey Gundlach ",
    netWorth: "$2.2 B",
    age: "63",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1408",
    rank: "1397",
    name: "John Hancock ",
    netWorth: "$2.2 B",
    age: "46",
    country: "Australia",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "1409",
    rank: "1397",
    name: "Georg Haub ",
    netWorth: "$2.2 B",
    age: "60",
    country: "Germany",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1410",
    rank: "1397",
    name: "Hortensia Herrero ",
    netWorth: "$2.2 B",
    age: "71",
    country: "Spain",
    source: "supermarkets",
    industry: "Fashion & Retail "
  },
  {
    key: "1411",
    rank: "1397",
    name: "B. Wayne Hughes, Jr. ",
    netWorth: "$2.2 B",
    age: "61",
    country: "United States",
    source: "storage facilities",
    industry: "Real Estate "
  },
  {
    key: "1412",
    rank: "1397",
    name: "Bruce Karsh ",
    netWorth: "$2.2 B",
    age: "66",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1413",
    rank: "1397",
    name: "Shlomo Kramer ",
    netWorth: "$2.2 B",
    age: "56",
    country: "Israel",
    source: "software, investments",
    industry: "Technology "
  },
  {
    key: "1414",
    rank: "1397",
    name: "Jonathan Kwok ",
    netWorth: "$2.2 B",
    age: "30",
    country: "Hong Kong",
    source: "Real Estate",
    industry: "Real Estate "
  },
  {
    key: "1415",
    rank: "1397",
    name: "Christian Latouche ",
    netWorth: "$2.2 B",
    age: "81",
    country: "France",
    source: "accounting services",
    industry: "Finance & Investments "
  },
  {
    key: "1416",
    rank: "1397",
    name: "Martin Lau ",
    netWorth: "$2.2 B",
    age: "49",
    country: "Hong Kong",
    source: "e-commerce",
    industry: "Technology "
  },
  {
    key: "1417",
    rank: "1397",
    name: "Li Wa ",
    netWorth: "$2.2 B",
    age: "56",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1418",
    rank: "1397",
    name: "Liang Xinjun ",
    netWorth: "$2.2 B",
    age: "54",
    country: "China",
    source: "conglomerate",
    industry: "Diversified "
  },
  {
    key: "1419",
    rank: "1397",
    name: "Lin Chang Su-O ",
    netWorth: "$2.2 B",
    age: "81",
    country: "Taiwan",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1420",
    rank: "1397",
    name: "Lin Fanlian ",
    netWorth: "$2.2 B",
    age: "60",
    country: "China",
    source: "energy, real estate",
    industry: "Energy "
  },
  {
    key: "1421",
    rank: "1397",
    name: "Lin Lairong & family ",
    netWorth: "$2.2 B",
    age: "53",
    country: "China",
    source: "iron ore mining",
    industry: "Metals & Mining "
  },
  {
    key: "1422",
    rank: "1397",
    name: "Daniel Lubetzky ",
    netWorth: "$2.2 B",
    age: "53",
    country: "United States",
    source: "snack bars",
    industry: "Food & Beverage "
  },
  {
    key: "1423",
    rank: "1397",
    name: "Howard Marks ",
    netWorth: "$2.2 B",
    age: "75",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1424",
    rank: "1397",
    name: "Craig McCaw ",
    netWorth: "$2.2 B",
    age: "72",
    country: "United States",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "1425",
    rank: "1397",
    name: "Vincent McMahon ",
    netWorth: "$2.2 B",
    age: "76",
    country: "United States",
    source: "entertainment",
    industry: "Sports "
  },
  {
    key: "1426",
    rank: "1397",
    name: "Mu Rongjun ",
    netWorth: "$2.2 B",
    age: "42",
    country: "China",
    source: "e-commerce",
    industry: "Technology "
  },
  {
    key: "1427",
    rank: "1397",
    name: "Jonathan Nelson ",
    netWorth: "$2.2 B",
    age: "65",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1428",
    rank: "1397",
    name: "Bianca Rinehart ",
    netWorth: "$2.2 B",
    age: "45",
    country: "Australia",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "1429",
    rank: "1397",
    name: "Ginia Rinehart ",
    netWorth: "$2.2 B",
    age: "35",
    country: "Australia",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "1430",
    rank: "1397",
    name: "Filiz Sahenk ",
    netWorth: "$2.2 B",
    age: "55",
    country: "Turkey",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1431",
    rank: "1397",
    name: "S.D. Shibulal ",
    netWorth: "$2.2 B",
    age: "67",
    country: "India",
    source: "software services",
    industry: "Technology "
  },
  {
    key: "1432",
    rank: "1397",
    name: "Alexander Svetakov ",
    netWorth: "$2.2 B",
    age: "54",
    country: "Russia",
    source: "real estate",
    industry: "Finance & Investments "
  },
  {
    key: "1433",
    rank: "1397",
    name: "Jeffrey Talpins ",
    netWorth: "$2.2 B",
    age: "47",
    country: "United States",
    source: "hedge fund",
    industry: "Finance & Investments "
  },
  {
    key: "1434",
    rank: "1397",
    name: "Ming Tian ",
    netWorth: "$2.2 B",
    age: "68",
    country: "China",
    source: "measuring instruments",
    industry: "Technology "
  },
  {
    key: "1435",
    rank: "1397",
    name: "Arvind Tiku ",
    netWorth: "$2.2 B",
    age: "52",
    country: "India",
    source: "oil & gas, investments",
    industry: "Energy "
  },
  {
    key: "1436",
    rank: "1397",
    name: "Torsten Toeller ",
    netWorth: "$2.2 B",
    age: "55",
    country: "Germany",
    source: "pet food",
    industry: "Fashion & Retail "
  },
  {
    key: "1437",
    rank: "1397",
    name: "Riaz Valani ",
    netWorth: "$2.2 B",
    age: "45",
    country: "United States",
    source: "e-cigarettes",
    industry: "Finance & Investments "
  },
  {
    key: "1438",
    rank: "1397",
    name: "Pieter van der Does ",
    netWorth: "$2.2 B",
    age: "52",
    country: "Netherlands",
    source: "payments software",
    industry: "Technology "
  },
  {
    key: "1439",
    rank: "1397",
    name: "Lang Walker ",
    netWorth: "$2.2 B",
    age: "76",
    country: "Australia",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1440",
    rank: "1397",
    name: "Hope Welker ",
    netWorth: "$2.2 B",
    age: "36",
    country: "Australia",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "1441",
    rank: "1397",
    name: "Xie Bingkun & family ",
    netWorth: "$2.2 B",
    age: "55",
    country: "China",
    source: "pearlescent pigments",
    industry: "Fashion & Retail "
  },
  {
    key: "1442",
    rank: "1397",
    name: "William Young ",
    netWorth: "$2.2 B",
    age: "81",
    country: "United States",
    source: "plastics",
    industry: "Manufacturing "
  },
  {
    key: "1443",
    rank: "1397",
    name: "Zhou Jian ",
    netWorth: "$2.2 B",
    age: "45",
    country: "China",
    source: "solar energy equipment",
    industry: "Energy "
  },
  {
    key: "1444",
    rank: "1445",
    name: "Bill and Jean Adderley & family ",
    netWorth: "$2.1 B",
    age: "64",
    country: "United Kingdom",
    source: "home furnishings",
    industry: "Fashion & Retail "
  },
  {
    key: "1445",
    rank: "1445",
    name: "Mohamed Al Fayed ",
    netWorth: "$2.1 B",
    age: "93",
    country: "Egypt",
    source: "retail, investments",
    industry: "Fashion & Retail "
  },
  {
    key: "1446",
    rank: "1445",
    name: "Faisal Bin Qassim Al Thani ",
    netWorth: "$2.1 B",
    age: "74",
    country: "Qatar",
    source: "hotels, diversified",
    industry: "Diversified "
  },
  {
    key: "1447",
    rank: "1445",
    name: "Masaaki Arai ",
    netWorth: "$2.1 B",
    age: "56",
    country: "Japan",
    source: "home sales",
    industry: "Real Estate "
  },
  {
    key: "1448",
    rank: "1445",
    name: "Tatyana Bakalchuk ",
    netWorth: "$2.1 B",
    age: "46",
    country: "Russia",
    source: "ecommerce",
    industry: "Fashion & Retail "
  },
  {
    key: "1449",
    rank: "1445",
    name: "Lee Bass ",
    netWorth: "$2.1 B",
    age: "65",
    country: "United States",
    source: "oil, investments",
    industry: "Energy "
  },
  {
    key: "1450",
    rank: "1445",
    name: "Alberto Bombassei ",
    netWorth: "$2.1 B",
    age: "81",
    country: "Italy",
    source: "automotive brakes",
    industry: "Automotive "
  },
  {
    key: "1451",
    rank: "1445",
    name: "Jim Breyer ",
    netWorth: "$2.1 B",
    age: "60",
    country: "United States",
    source: "venture capital",
    industry: "Technology "
  },
  {
    key: "1452",
    rank: "1445",
    name: "Ron Burkle ",
    netWorth: "$2.1 B",
    age: "69",
    country: "United States",
    source: "supermarkets, investments",
    industry: "Finance & Investments "
  },
  {
    key: "1453",
    rank: "1445",
    name: "Chen Huwen ",
    netWorth: "$2.1 B",
    age: "51",
    country: "China",
    source: "stationery",
    industry: "Manufacturing "
  },
  {
    key: "1454",
    rank: "1445",
    name: "Chen Huxiong ",
    netWorth: "$2.1 B",
    age: "51",
    country: "China",
    source: "stationery",
    industry: "Manufacturing "
  },
  {
    key: "1455",
    rank: "1445",
    name: "Chen Xuehua ",
    netWorth: "$2.1 B",
    age: "61",
    country: "China",
    source: "nonferrous",
    industry: "Metals & Mining "
  },
  {
    key: "1456",
    rank: "1445",
    name: "Bruce Cheng ",
    netWorth: "$2.1 B",
    age: "86",
    country: "Taiwan",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "1457",
    rank: "1445",
    name: "Ryan Cohen ",
    netWorth: "$2.1 B",
    age: "36",
    country: "Canada",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1458",
    rank: "1445",
    name: "Dermot Desmond ",
    netWorth: "$2.1 B",
    age: "71",
    country: "Ireland",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "1459",
    rank: "1445",
    name: "Fred Ehrsam ",
    netWorth: "$2.1 B",
    age: "33",
    country: "United States",
    source: "cryptocurrency exchange",
    industry: "Finance & Investments "
  },
  {
    key: "1460",
    rank: "1445",
    name: "John Elkann ",
    netWorth: "$2.1 B",
    age: "46",
    country: "Italy",
    source: "FIAT, investments",
    industry: "Finance & Investments "
  },
  {
    key: "1461",
    rank: "1445",
    name: "Bob Ell ",
    netWorth: "$2.1 B",
    age: "77",
    country: "Australia",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1462",
    rank: "1445",
    name: "Fang Xiaoliang & family ",
    netWorth: "$2.1 B",
    age: "63",
    country: "China",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "1463",
    rank: "1445",
    name: "Lindsay Fox ",
    netWorth: "$2.1 B",
    age: "84",
    country: "Australia",
    source: "logistics, real estate",
    industry: "Logistics "
  },
  {
    key: "1464",
    rank: "1445",
    name: "Gary Friedman ",
    netWorth: "$2.1 B",
    age: "64",
    country: "United States",
    source: "Furniture retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1465",
    rank: "1445",
    name: "Gordon Getty ",
    netWorth: "$2.1 B",
    age: "88",
    country: "United States",
    source: "Getty Oil",
    industry: "Energy "
  },
  {
    key: "1466",
    rank: "1445",
    name: "Dennis Gillings ",
    netWorth: "$2.1 B",
    age: "77",
    country: "United Kingdom",
    source: "clinical trials",
    industry: "Healthcare "
  },
  {
    key: "1467",
    rank: "1445",
    name: "Harsh Goenka ",
    netWorth: "$2.1 B",
    age: "64",
    country: "India",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1468",
    rank: "1445",
    name: "David Hains ",
    netWorth: "$2.1 B",
    age: "91",
    country: "Australia",
    source: "Investments",
    industry: "Finance & Investments "
  },
  {
    key: "1469",
    rank: "1445",
    name: "Bahaa Hariri ",
    netWorth: "$2.1 B",
    age: "55",
    country: "Lebanon",
    source: "real estate, investments",
    industry: "Real Estate "
  },
  {
    key: "1470",
    rank: "1445",
    name: "Shmuel Harlap ",
    netWorth: "$2.1 B",
    age: "77",
    country: "Israel",
    source: "automotive",
    industry: "Automotive "
  },
  {
    key: "1471",
    rank: "1445",
    name: "Gerry Harvey ",
    netWorth: "$2.1 B",
    age: "82",
    country: "Australia",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1472",
    rank: "1445",
    name: "Reid Hoffman ",
    netWorth: "$2.1 B",
    age: "54",
    country: "United States",
    source: "LinkedIn",
    industry: "Technology "
  },
  {
    key: "1473",
    rank: "1445",
    name: "Hou Juncheng ",
    netWorth: "$2.1 B",
    age: "57",
    country: "China",
    source: "cosmetics",
    industry: "Healthcare "
  },
  {
    key: "1474",
    rank: "1445",
    name: "Thomas James ",
    netWorth: "$2.1 B",
    age: "79",
    country: "United States",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "1475",
    rank: "1445",
    name: "Eiichi Kuriwada ",
    netWorth: "$2.1 B",
    age: "75",
    country: "Japan",
    source: "package delivery",
    industry: "Logistics "
  },
  {
    key: "1476",
    rank: "1445",
    name: "Kwek Leng Kee ",
    netWorth: "$2.1 B",
    age: "67",
    country: "Singapore",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1477",
    rank: "1445",
    name: "Lai Shixian ",
    netWorth: "$2.1 B",
    age: "47",
    country: "China",
    source: "sports apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "1478",
    rank: "1445",
    name: "Lau Cho Kun ",
    netWorth: "$2.1 B",
    age: "86",
    country: "Malaysia",
    source: "palm oil, property",
    industry: "Diversified "
  },
  {
    key: "1479",
    rank: "1445",
    name: "Lee Hae-jin ",
    netWorth: "$2.1 B",
    age: "54",
    country: "South Korea",
    source: "Internet",
    industry: "Technology "
  },
  {
    key: "1480",
    rank: "1445",
    name: "Harald Link ",
    netWorth: "$2.1 B",
    age: "67",
    country: "Thailand",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1481",
    rank: "1445",
    name: "Liu Xiucai & family ",
    netWorth: "$2.1 B",
    age: "65",
    country: "United States",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1482",
    rank: "1445",
    name: "Yangyong Luo & family ",
    netWorth: "$2.1 B",
    age: "46",
    country: "China",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "1483",
    rank: "1445",
    name: "Igor Makarov ",
    netWorth: "$2.1 B",
    age: "60",
    country: "Russia",
    source: "investments",
    industry: "Energy "
  },
  {
    key: "1484",
    rank: "1445",
    name: "Alexander Mamut ",
    netWorth: "$2.1 B",
    age: "62",
    country: "Russia",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1485",
    rank: "1445",
    name: "David Mindus ",
    netWorth: "$2.1 B",
    age: "50",
    country: "Sweden",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1486",
    rank: "1445",
    name: "Yuji Otsuka ",
    netWorth: "$2.1 B",
    age: "68",
    country: "Japan",
    source: "copy machines, software",
    industry: "Technology "
  },
  {
    key: "1487",
    rank: "1445",
    name: "Clive Palmer ",
    netWorth: "$2.1 B",
    age: "68",
    country: "Australia",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "1488",
    rank: "1445",
    name: "Ajay Parekh ",
    netWorth: "$2.1 B",
    age: "64",
    country: "India",
    source: "adhesives",
    industry: "Manufacturing "
  },
  {
    key: "1489",
    rank: "1445",
    name: "Narendrakumar Parekh ",
    netWorth: "$2.1 B",
    age: "83",
    country: "India",
    source: "adhesives",
    industry: "Manufacturing "
  },
  {
    key: "1490",
    rank: "1445",
    name: "Xiangdong Qi ",
    netWorth: "$2.1 B",
    age: "51",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1491",
    rank: "1445",
    name: "Jianhua Ren ",
    netWorth: "$2.1 B",
    age: "65",
    country: "China",
    source: "kitchen appliances",
    industry: "Manufacturing "
  },
  {
    key: "1492",
    rank: "1445",
    name: "Alice Schwartz ",
    netWorth: "$2.1 B",
    age: "95",
    country: "United States",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "1493",
    rank: "1445",
    name: "Peter Sondakh ",
    netWorth: "$2.1 B",
    age: "72",
    country: "Indonesia",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1494",
    rank: "1445",
    name: "Song Fei ",
    netWorth: "$2.1 B",
    age: "55",
    country: "China",
    source: "machinery",
    industry: "Manufacturing "
  },
  {
    key: "1495",
    rank: "1445",
    name: "Timothy Springer ",
    netWorth: "$2.1 B",
    age: "74",
    country: "United States",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "1496",
    rank: "1445",
    name: "Suyu Su & family ",
    netWorth: "$2.1 B",
    age: "73",
    country: "China",
    source: "utilities, real estate",
    industry: "Real Estate "
  },
  {
    key: "1497",
    rank: "1445",
    name: "Elizabeth Sy ",
    netWorth: "$2.1 B",
    age: "69",
    country: "Philippines",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1498",
    rank: "1445",
    name: "Sukanto Tanoto ",
    netWorth: "$2.1 B",
    age: "72",
    country: "Indonesia",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1499",
    rank: "1445",
    name: "Jayshree Ullal ",
    netWorth: "$2.1 B",
    age: "61",
    country: "United States",
    source: "computer networking",
    industry: "Technology "
  },
  {
    key: "1500",
    rank: "1445",
    name: "Sunny Varkey ",
    netWorth: "$2.1 B",
    age: "64",
    country: "India",
    source: "education",
    industry: "Service "
  },
  {
    key: "1501",
    rank: "1445",
    name: "Jitendra Virwani ",
    netWorth: "$2.1 B",
    age: "56",
    country: "India",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1502",
    rank: "1445",
    name: "Wang Ren-sheng ",
    netWorth: "$2.1 B",
    age: "90",
    country: "Taiwan",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1503",
    rank: "1445",
    name: "Wang Wenmo ",
    netWorth: "$2.1 B",
    age: "65",
    country: "China",
    source: "sports apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "1504",
    rank: "1445",
    name: "Thomas Wu ",
    netWorth: "$2.1 B",
    age: "72",
    country: "Taiwan",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "1505",
    rank: "1445",
    name: "Wu Ying ",
    netWorth: "$2.1 B",
    age: "57",
    country: "China",
    source: "materials",
    industry: "Manufacturing "
  },
  {
    key: "1506",
    rank: "1445",
    name: "Amy Wyss ",
    netWorth: "$2.1 B",
    age: "51",
    country: "United States",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "1507",
    rank: "1445",
    name: "Xiang Guangming & family ",
    netWorth: "$2.1 B",
    age: "58",
    country: "China",
    source: "waste disposal",
    industry: "Manufacturing "
  },
  {
    key: "1508",
    rank: "1445",
    name: "Xu Shugen ",
    netWorth: "$2.1 B",
    age: "56",
    country: "China",
    source: "construction, mining machinery",
    industry: "Manufacturing "
  },
  {
    key: "1509",
    rank: "1445",
    name: "Steven Meng Yang & family ",
    netWorth: "$2.1 B",
    age: "39",
    country: "China",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "1510",
    rank: "1445",
    name: "Clayton Zekelman ",
    netWorth: "$2.1 B",
    age: "53",
    country: "Canada",
    source: "steel",
    industry: "Manufacturing "
  },
  {
    key: "1511",
    rank: "1445",
    name: "Hongfei Zhao ",
    netWorth: "$2.1 B",
    age: "47",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1512",
    rank: "1513",
    name: "S. Daniel Abraham ",
    netWorth: "$2 B",
    age: "97",
    country: "United States",
    source: "Slim-Fast",
    industry: "Food & Beverage "
  },
  {
    key: "1513",
    rank: "1513",
    name: "Aziz Akhannouch & family ",
    netWorth: "$2 B",
    age: "61",
    country: "Morocco",
    source: "petroleum, diversified",
    industry: "Diversified "
  },
  {
    key: "1514",
    rank: "1513",
    name: "Andrey Andreev ",
    netWorth: "$2 B",
    age: "48",
    country: "United Kingdom",
    source: "online dating",
    industry: "Technology "
  },
  {
    key: "1515",
    rank: "1513",
    name: "Ramon Ang ",
    netWorth: "$2 B",
    age: "68",
    country: "Philippines",
    source: "diversified",
    industry: "Food & Beverage "
  },
  {
    key: "1516",
    rank: "1513",
    name: "Guilherme Benchimol ",
    netWorth: "$2 B",
    age: "45",
    country: "Brazil",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "1517",
    rank: "1513",
    name: "Julio Bozano ",
    netWorth: "$2 B",
    age: "86",
    country: "Brazil",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "1518",
    rank: "1513",
    name: "Ryan Breslow ",
    netWorth: "$2 B",
    age: "27",
    country: "United States",
    source: "e-commerce software",
    industry: "Technology "
  },
  {
    key: "1519",
    rank: "1513",
    name: "Cao Jianwei ",
    netWorth: "$2 B",
    age: "43",
    country: "China",
    source: "semiconductors",
    industry: "Manufacturing "
  },
  {
    key: "1520",
    rank: "1513",
    name: "Herb Chambers ",
    netWorth: "$2 B",
    age: "80",
    country: "United States",
    source: "car dealerships",
    industry: "Automotive "
  },
  {
    key: "1521",
    rank: "1513",
    name: "Daniel Chiu ",
    netWorth: "$2 B",
    age: "61",
    country: "Hong Kong",
    source: "oil & gas",
    industry: "Energy "
  },
  {
    key: "1522",
    rank: "1513",
    name: "Tim Cook ",
    netWorth: "$2 B",
    age: "61",
    country: "United States",
    source: "Apple",
    industry: "Technology "
  },
  {
    key: "1523",
    rank: "1513",
    name: "Brunello Cucinelli & family ",
    netWorth: "$2 B",
    age: "68",
    country: "Italy",
    source: "fashion",
    industry: "Fashion & Retail "
  },
  {
    key: "1524",
    rank: "1513",
    name: "Georgi Domuschiev ",
    netWorth: "$2 B",
    age: "49",
    country: "Bulgaria",
    source: "animal health, investments",
    industry: "Diversified "
  },
  {
    key: "1525",
    rank: "1513",
    name: "Kiril Domuschiev ",
    netWorth: "$2 B",
    age: "52",
    country: "Bulgaria",
    source: "animal health, investments",
    industry: "Diversified "
  },
  {
    key: "1526",
    rank: "1513",
    name: "Glenn Dubin ",
    netWorth: "$2 B",
    age: "64",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1527",
    rank: "1513",
    name: "James Duff ",
    netWorth: "$2 B",
    age: "61",
    country: "United States",
    source: "tires, diversified",
    industry: "Diversified "
  },
  {
    key: "1528",
    rank: "1513",
    name: "Thomas Duff ",
    netWorth: "$2 B",
    age: "65",
    country: "United States",
    source: "tires, diversified",
    industry: "Diversified "
  },
  {
    key: "1529",
    rank: "1513",
    name: "Robert Duggan ",
    netWorth: "$2 B",
    age: "77",
    country: "United States",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1530",
    rank: "1513",
    name: "Maria Franca Fissolo ",
    netWorth: "$2 B",
    age: "87",
    country: "Italy",
    source: "Nutella, chocolates",
    industry: "Food & Beverage "
  },
  {
    key: "1531",
    rank: "1513",
    name: "Fu Mingkang & family ",
    netWorth: "$2 B",
    age: "59",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1532",
    rank: "1513",
    name: "Jay Hennick ",
    netWorth: "$2 B",
    age: "65",
    country: "Canada",
    source: "real estate finance",
    industry: "Finance & Investments "
  },
  {
    key: "1533",
    rank: "1513",
    name: "Orion Hindawi ",
    netWorth: "$2 B",
    age: "42",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1534",
    rank: "1513",
    name: "Ji Qi ",
    netWorth: "$2 B",
    age: "55",
    country: "China",
    source: "hotels, motels",
    industry: "Real Estate "
  },
  {
    key: "1535",
    rank: "1513",
    name: "Kim Chang-soo ",
    netWorth: "$2 B",
    age: "61",
    country: "South Korea",
    source: "apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "1536",
    rank: "1513",
    name: "Vyacheslav Kim ",
    netWorth: "$2 B",
    age: "52",
    country: "Kazakhstan",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "1537",
    rank: "1513",
    name: "Kuan Kam Hon & family ",
    netWorth: "$2 B",
    age: "74",
    country: "Malaysia",
    source: "rubber gloves",
    industry: "Manufacturing "
  },
  {
    key: "1538",
    rank: "1513",
    name: "Egor Kulkov ",
    netWorth: "$2 B",
    age: "50",
    country: "Russia",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1539",
    rank: "1513",
    name: "Josh Kushner ",
    netWorth: "$2 B",
    age: "36",
    country: "United States",
    source: "venture capital",
    industry: "Finance & Investments "
  },
  {
    key: "1540",
    rank: "1513",
    name: "Henry Laufer ",
    netWorth: "$2 B",
    age: "76",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1541",
    rank: "1513",
    name: "Thomas Lee ",
    netWorth: "$2 B",
    age: "78",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1542",
    rank: "1513",
    name: "Michael Lee-Chin ",
    netWorth: "$2 B",
    age: "71",
    country: "Canada",
    source: "mutual funds",
    industry: "Finance & Investments "
  },
  {
    key: "1543",
    rank: "1513",
    name: "Li Xuhui ",
    netWorth: "$2 B",
    age: "53",
    country: "China",
    source: "soy sauce",
    industry: "Food & Beverage "
  },
  {
    key: "1544",
    rank: "1513",
    name: "Lim Kok Thay ",
    netWorth: "$2 B",
    age: "70",
    country: "Malaysia",
    source: "casinos",
    industry: "Gambling & Casinos "
  },
  {
    key: "1545",
    rank: "1513",
    name: "Joao Roberto Marinho ",
    netWorth: "$2 B",
    age: "68",
    country: "Brazil",
    source: "media",
    industry: "Media & Entertainment "
  },
  {
    key: "1546",
    rank: "1513",
    name: "Jose Roberto Marinho ",
    netWorth: "$2 B",
    age: "66",
    country: "Brazil",
    source: "media",
    industry: "Media & Entertainment "
  },
  {
    key: "1547",
    rank: "1513",
    name: "Roberto Irineu Marinho ",
    netWorth: "$2 B",
    age: "74",
    country: "Brazil",
    source: "media",
    industry: "Media & Entertainment "
  },
  {
    key: "1548",
    rank: "1513",
    name: "Jim McKelvey ",
    netWorth: "$2 B",
    age: "56",
    country: "United States",
    source: "mobile payments",
    industry: "Technology "
  },
  {
    key: "1549",
    rank: "1513",
    name: "Robert Miller ",
    netWorth: "$2 B",
    age: "88",
    country: "United Kingdom",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1550",
    rank: "1513",
    name: "David Nahmad ",
    netWorth: "$2 B",
    age: "74",
    country: "Monaco",
    source: "art collection",
    industry: "Fashion & Retail "
  },
  {
    key: "1551",
    rank: "1513",
    name: "Florentino Perez ",
    netWorth: "$2 B",
    age: "75",
    country: "Spain",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "1552",
    rank: "1513",
    name: "Jennifer Pritzker ",
    netWorth: "$2 B",
    age: "71",
    country: "United States",
    source: "hotels, investments",
    industry: "Finance & Investments "
  },
  {
    key: "1553",
    rank: "1513",
    name: "Linda Pritzker ",
    netWorth: "$2 B",
    age: "68",
    country: "United States",
    source: "hotels, investments",
    industry: "Service "
  },
  {
    key: "1554",
    rank: "1513",
    name: "P.V. Ramprasad Reddy ",
    netWorth: "$2 B",
    age: "64",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1555",
    rank: "1513",
    name: "Joe Rogers, Jr. ",
    netWorth: "$2 B",
    age: "75",
    country: "United States",
    source: "Waffle House",
    industry: "Food & Beverage "
  },
  {
    key: "1556",
    rank: "1513",
    name: "Ruan Shuilong & family ",
    netWorth: "$2 B",
    age: "86",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1557",
    rank: "1513",
    name: "Phil Ruffin ",
    netWorth: "$2 B",
    age: "87",
    country: "United States",
    source: "casinos, real estate",
    industry: "Diversified "
  },
  {
    key: "1558",
    rank: "1513",
    name: "Vinod Saraf ",
    netWorth: "$2 B",
    age: "69",
    country: "India",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1559",
    rank: "1513",
    name: "Maria-Elisabeth Schaeffler-Thumann ",
    netWorth: "$2 B",
    age: "80",
    country: "Germany",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "1560",
    rank: "1513",
    name: "Genhuo Shao ",
    netWorth: "$2 B",
    age: "56",
    country: "China",
    source: "agribusiness",
    industry: "Food & Beverage "
  },
  {
    key: "1561",
    rank: "1513",
    name: "Shen Xiqiang & family ",
    netWorth: "$2 B",
    age: "74",
    country: "China",
    source: "chemical",
    industry: "Energy "
  },
  {
    key: "1562",
    rank: "1513",
    name: "Shi Wen-long ",
    netWorth: "$2 B",
    age: "94",
    country: "Taiwan",
    source: "plastics",
    industry: "Manufacturing "
  },
  {
    key: "1563",
    rank: "1513",
    name: "Thaksin Shinawatra ",
    netWorth: "$2 B",
    age: "72",
    country: "Thailand",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1564",
    rank: "1513",
    name: "Alexander Skorobogatko ",
    netWorth: "$2 B",
    age: "54",
    country: "Russia",
    source: "real estate, airport",
    industry: "Logistics "
  },
  {
    key: "1565",
    rank: "1513",
    name: "Sylvia Stroeher ",
    netWorth: "$2 B",
    age: "66",
    country: "Germany",
    source: "cosmetics",
    industry: "Fashion & Retail "
  },
  {
    key: "1566",
    rank: "1513",
    name: "Wichai Thongtang ",
    netWorth: "$2 B",
    age: "75",
    country: "Thailand",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1567",
    rank: "1513",
    name: "Todd Wagner ",
    netWorth: "$2 B",
    age: "61",
    country: "United States",
    source: "online media",
    industry: "Media & Entertainment "
  },
  {
    key: "1568",
    rank: "1513",
    name: "Wang Jianguo ",
    netWorth: "$2 B",
    age: "62",
    country: "China",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1569",
    rank: "1513",
    name: "Shuifu Wang ",
    netWorth: "$2 B",
    age: "67",
    country: "China",
    source: "Manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1570",
    rank: "1513",
    name: "Wenbiao Wang ",
    netWorth: "$2 B",
    age: "65",
    country: "China",
    source: "natural gas, fertilizers",
    industry: "Manufacturing "
  },
  {
    key: "1571",
    rank: "1513",
    name: "Kanye West ",
    netWorth: "$2 B",
    age: "44",
    country: "United States",
    source: "music, sneakers",
    industry: "Fashion & Retail "
  },
  {
    key: "1572",
    rank: "1513",
    name: "Evan Williams ",
    netWorth: "$2 B",
    age: "50",
    country: "United States",
    source: "Twitter",
    industry: "Technology "
  },
  {
    key: "1573",
    rank: "1513",
    name: "Zhongyi Wu ",
    netWorth: "$2 B",
    age: "48",
    country: "China",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "1574",
    rank: "1513",
    name: "Zhihan Xu ",
    netWorth: "$2 B",
    age: "49",
    country: "China",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "1575",
    rank: "1513",
    name: "Yan Zhi ",
    netWorth: "$2 B",
    age: "49",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1576",
    rank: "1513",
    name: "Michael Ying ",
    netWorth: "$2 B",
    age: "72",
    country: "Hong Kong",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1577",
    rank: "1513",
    name: "Yuan Liping ",
    netWorth: "$2 B",
    age: "51",
    country: "Canada",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1578",
    rank: "1579",
    name: "Anu Aga ",
    netWorth: "$1.9 B",
    age: "79",
    country: "India",
    source: "engineering",
    industry: "Construction & Engineering "
  },
  {
    key: "1579",
    rank: "1579",
    name: "Joy Alukkas ",
    netWorth: "$1.9 B",
    age: "65",
    country: "India",
    source: "jewelry",
    industry: "Fashion & Retail "
  },
  {
    key: "1580",
    rank: "1579",
    name: "Sezai Bacaksiz ",
    netWorth: "$1.9 B",
    age: "72",
    country: "Turkey",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1581",
    rank: "1579",
    name: "Baokun Bai ",
    netWorth: "$1.9 B",
    age: "52",
    country: "China",
    source: "hardware",
    industry: "Manufacturing "
  },
  {
    key: "1582",
    rank: "1579",
    name: "Acharya Balkrishna ",
    netWorth: "$1.9 B",
    age: "49",
    country: "India",
    source: "consumer goods",
    industry: "Food & Beverage "
  },
  {
    key: "1583",
    rank: "1579",
    name: "Kiki Barki ",
    netWorth: "$1.9 B",
    age: "82",
    country: "Indonesia",
    source: "coal",
    industry: "Energy "
  },
  {
    key: "1584",
    rank: "1579",
    name: "John Bloor ",
    netWorth: "$1.9 B",
    age: "78",
    country: "United Kingdom",
    source: "real estate, manufacturing",
    industry: "Diversified "
  },
  {
    key: "1585",
    rank: "1579",
    name: "Nicola Bulgari ",
    netWorth: "$1.9 B",
    age: "81",
    country: "Italy",
    source: "luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "1586",
    rank: "1579",
    name: "Alejandro Bulgheroni ",
    netWorth: "$1.9 B",
    age: "77",
    country: "Argentina",
    source: "oil & gas",
    industry: "Energy "
  },
  {
    key: "1587",
    rank: "1579",
    name: "Chen Kaichen ",
    netWorth: "$1.9 B",
    age: "64",
    country: "China",
    source: "household chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1588",
    rank: "1579",
    name: "Fernando Chico Pardo ",
    netWorth: "$1.9 B",
    age: "70",
    country: "Mexico",
    source: "airport management",
    industry: "Service "
  },
  {
    key: "1589",
    rank: "1579",
    name: "Jose Luis Cutrale ",
    netWorth: "$1.9 B",
    age: "75",
    country: "Brazil",
    source: "orange juice",
    industry: "Food & Beverage "
  },
  {
    key: "1590",
    rank: "1579",
    name: "D. Leopoldo Del Pino ",
    netWorth: "$1.9 B",
    age: "59",
    country: "Spain",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "1591",
    rank: "1579",
    name: "James Dinan ",
    netWorth: "$1.9 B",
    age: "62",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1592",
    rank: "1579",
    name: "Francois Feuillet & family ",
    netWorth: "$1.9 B",
    age: "73",
    country: "France",
    source: "motorhomes, RVs",
    industry: "Automotive "
  },
  {
    key: "1593",
    rank: "1579",
    name: "Guangming Fu & family ",
    netWorth: "$1.9 B",
    age: "68",
    country: "China",
    source: "poultry",
    industry: "Food & Beverage "
  },
  {
    key: "1594",
    rank: "1579",
    name: "Mario Gabelli ",
    netWorth: "$1.9 B",
    age: "80",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "1595",
    rank: "1579",
    name: "Reinold Geiger ",
    netWorth: "$1.9 B",
    age: "74",
    country: "Austria",
    source: "beauty products",
    industry: "Fashion & Retail "
  },
  {
    key: "1596",
    rank: "1579",
    name: "He Zhenggang ",
    netWorth: "$1.9 B",
    age: "68",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1597",
    rank: "1579",
    name: "Roberto Hernandez Ramirez ",
    netWorth: "$1.9 B",
    age: "80",
    country: "Mexico",
    source: "banking, investments",
    industry: "Finance & Investments "
  },
  {
    key: "1598",
    rank: "1579",
    name: "Hoi Kin Hong ",
    netWorth: "$1.9 B",
    age: "69",
    country: "Macau",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1599",
    rank: "1579",
    name: "Huang Qiaoling ",
    netWorth: "$1.9 B",
    age: "63",
    country: "China",
    source: "amusement parks",
    industry: "Media & Entertainment "
  },
  {
    key: "1600",
    rank: "1579",
    name: "Willis Johnson ",
    netWorth: "$1.9 B",
    age: "74",
    country: "United States",
    source: "damaged cars",
    industry: "Automotive "
  },
  {
    key: "1601",
    rank: "1579",
    name: "Keeree Kanjanapas ",
    netWorth: "$1.9 B",
    age: "71",
    country: "Thailand",
    source: "transportation",
    industry: "Real Estate "
  },
  {
    key: "1602",
    rank: "1579",
    name: "Kim Dae-il ",
    netWorth: "$1.9 B",
    age: "42",
    country: "South Korea",
    source: "mobile gaming",
    industry: "Technology "
  },
  {
    key: "1603",
    rank: "1579",
    name: "Kim Hyoung-nyon ",
    netWorth: "$1.9 B",
    age: "46",
    country: "South Korea",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "1604",
    rank: "1579",
    name: "Andrei Kozitsyn ",
    netWorth: "$1.9 B",
    age: "61",
    country: "Russia",
    source: "metals",
    industry: "Metals & Mining "
  },
  {
    key: "1605",
    rank: "1579",
    name: "Thomas Kwok ",
    netWorth: "$1.9 B",
    age: "70",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1606",
    rank: "1579",
    name: "Lei Jufang ",
    netWorth: "$1.9 B",
    age: "69",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1607",
    rank: "1579",
    name: "David Lichtenstein ",
    netWorth: "$1.9 B",
    age: "60",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1608",
    rank: "1579",
    name: "Lin Dingqiang & family ",
    netWorth: "$1.9 B",
    age: "55",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1609",
    rank: "1579",
    name: "Mikhail Lomtadze ",
    netWorth: "$1.9 B",
    age: "46",
    country: "Georgia",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "1610",
    rank: "1579",
    name: "Melissa Ma ",
    netWorth: "$1.9 B",
    age: "64",
    country: "China",
    source: "Internet search",
    industry: "Technology "
  },
  {
    key: "1611",
    rank: "1579",
    name: "Yusaku Maezawa ",
    netWorth: "$1.9 B",
    age: "46",
    country: "Japan",
    source: "online retail",
    industry: "Technology "
  },
  {
    key: "1612",
    rank: "1579",
    name: "Katarina Martinson ",
    netWorth: "$1.9 B",
    age: "40",
    country: "Sweden",
    source: "investments",
    industry: "Diversified "
  },
  {
    key: "1613",
    rank: "1579",
    name: "Shouliang Miao ",
    netWorth: "$1.9 B",
    age: "67",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1614",
    rank: "1579",
    name: "Romano Minozzi ",
    netWorth: "$1.9 B",
    age: "87",
    country: "Italy",
    source: "utilities, diversified",
    industry: "Diversified "
  },
  {
    key: "1615",
    rank: "1579",
    name: "Pedro Moreira Salles ",
    netWorth: "$1.9 B",
    age: "62",
    country: "Brazil",
    source: "banking, minerals",
    industry: "Diversified "
  },
  {
    key: "1616",
    rank: "1579",
    name: "Alexander Nesis ",
    netWorth: "$1.9 B",
    age: "59",
    country: "Russia",
    source: "metals, banking, fertilizers",
    industry: "Finance & Investments "
  },
  {
    key: "1617",
    rank: "1579",
    name: "Nguyen Dang Quang ",
    netWorth: "$1.9 B",
    age: "58",
    country: "Vietnam",
    source: "consumer products, banking",
    industry: "Food & Beverage "
  },
  {
    key: "1618",
    rank: "1579",
    name: "Oei Hong Leong ",
    netWorth: "$1.9 B",
    age: "74",
    country: "Singapore",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1619",
    rank: "1579",
    name: "Nihat Ozdemir ",
    netWorth: "$1.9 B",
    age: "72",
    country: "Turkey",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1620",
    rank: "1579",
    name: "Gretel Packer ",
    netWorth: "$1.9 B",
    age: "56",
    country: "Australia",
    source: "casinos",
    industry: "Media & Entertainment "
  },
  {
    key: "1621",
    rank: "1579",
    name: "Benjamin Zhengmin Pan & family ",
    netWorth: "$1.9 B",
    age: "52",
    country: "China",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "1622",
    rank: "1579",
    name: "Victor Pinchuk ",
    netWorth: "$1.9 B",
    age: "61",
    country: "Ukraine",
    source: "steel pipes, diversified",
    industry: "Metals & Mining "
  },
  {
    key: "1623",
    rank: "1579",
    name: "Alexander Ponomarenko ",
    netWorth: "$1.9 B",
    age: "57",
    country: "Russia",
    source: "real estate, airport",
    industry: "Logistics "
  },
  {
    key: "1624",
    rank: "1579",
    name: "Qi Jinxing ",
    netWorth: "$1.9 B",
    age: "60",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1625",
    rank: "1579",
    name: "Larry Robbins ",
    netWorth: "$1.9 B",
    age: "52",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1626",
    rank: "1579",
    name: "Dwight Schar ",
    netWorth: "$1.9 B",
    age: "80",
    country: "United States",
    source: "homebuilding, NFL team",
    industry: "Construction & Engineering "
  },
  {
    key: "1627",
    rank: "1579",
    name: "Shi Yifeng ",
    netWorth: "$1.9 B",
    age: "48",
    country: "China",
    source: "medical cosmetics",
    industry: "Healthcare "
  },
  {
    key: "1628",
    rank: "1579",
    name: "Sun Hongjun ",
    netWorth: "$1.9 B",
    age: "48",
    country: "China",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "1629",
    rank: "1579",
    name: "Anand Surana ",
    netWorth: "$1.9 B",
    age: "51",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1630",
    rank: "1579",
    name: "Dilip Surana ",
    netWorth: "$1.9 B",
    age: "56",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1631",
    rank: "1579",
    name: "Djoko Susanto ",
    netWorth: "$1.9 B",
    age: "72",
    country: "Indonesia",
    source: "supermarkets",
    industry: "Fashion & Retail "
  },
  {
    key: "1632",
    rank: "1579",
    name: "Sze Man Bok ",
    netWorth: "$1.9 B",
    age: "72",
    country: "China",
    source: "hygiene products",
    industry: "Manufacturing "
  },
  {
    key: "1633",
    rank: "1579",
    name: "Alain Taravella ",
    netWorth: "$1.9 B",
    age: "74",
    country: "France",
    source: "real estate development",
    industry: "Real Estate "
  },
  {
    key: "1634",
    rank: "1579",
    name: "Martin Viessmann ",
    netWorth: "$1.9 B",
    age: "68",
    country: "Germany",
    source: "heating and cooling equipment",
    industry: "Manufacturing "
  },
  {
    key: "1635",
    rank: "1579",
    name: "Georg von Opel ",
    netWorth: "$1.9 B",
    age: "55",
    country: "Switzerland",
    source: "real estate, investments",
    industry: "Finance & Investments "
  },
  {
    key: "1636",
    rank: "1579",
    name: "Changtian Wang ",
    netWorth: "$1.9 B",
    age: "56",
    country: "China",
    source: "TV, movie production",
    industry: "Media & Entertainment "
  },
  {
    key: "1637",
    rank: "1579",
    name: "Wang Chaobin ",
    netWorth: "$1.9 B",
    age: "66",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1638",
    rank: "1579",
    name: "Wang Chou-hsiong ",
    netWorth: "$1.9 B",
    age: "81",
    country: "Taiwan",
    source: "footwear",
    industry: "Manufacturing "
  },
  {
    key: "1639",
    rank: "1579",
    name: "Wang Xiaoshen ",
    netWorth: "$1.9 B",
    age: "53",
    country: "China",
    source: "lithium",
    industry: "Manufacturing "
  },
  {
    key: "1640",
    rank: "1579",
    name: "Wei Yin-Heng ",
    netWorth: "$1.9 B",
    age: "63",
    country: "Taiwan",
    source: "food, beverages",
    industry: "Food & Beverage "
  },
  {
    key: "1641",
    rank: "1579",
    name: "Xue Xiangdong & family ",
    netWorth: "$1.9 B",
    age: "63",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1642",
    rank: "1579",
    name: "Yuan Fugen & family ",
    netWorth: "$1.9 B",
    age: "71",
    country: "China",
    source: "metal processing",
    industry: "Manufacturing "
  },
  {
    key: "1643",
    rank: "1579",
    name: "David Zalik ",
    netWorth: "$1.9 B",
    age: "48",
    country: "United States",
    source: "financial technology",
    industry: "Technology "
  },
  {
    key: "1644",
    rank: "1645",
    name: "Leslie Alexander ",
    netWorth: "$1.8 B",
    age: "78",
    country: "United States",
    source: "sports team",
    industry: "Sports "
  },
  {
    key: "1645",
    rank: "1645",
    name: "Igor Altushkin ",
    netWorth: "$1.8 B",
    age: "51",
    country: "Russia",
    source: "metals",
    industry: "Metals & Mining "
  },
  {
    key: "1646",
    rank: "1645",
    name: "Roberto Angelini Rossi ",
    netWorth: "$1.8 B",
    age: "73",
    country: "Chile",
    source: "forestry, mining",
    industry: "Diversified "
  },
  {
    key: "1647",
    rank: "1645",
    name: "Nigel Austin ",
    netWorth: "$1.8 B",
    age: "51",
    country: "Australia",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1648",
    rank: "1645",
    name: "Bang Jun-hyuk ",
    netWorth: "$1.8 B",
    age: "53",
    country: "South Korea",
    source: "online gaming",
    industry: "Media & Entertainment "
  },
  {
    key: "1649",
    rank: "1645",
    name: "O. Francis Biondi ",
    netWorth: "$1.8 B",
    age: "57",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1650",
    rank: "1645",
    name: "Chang Byung-gyu ",
    netWorth: "$1.8 B",
    age: "48",
    country: "South Korea",
    source: "online games",
    industry: "Technology "
  },
  {
    key: "1651",
    rank: "1645",
    name: "Chang Kuo-Ming ",
    netWorth: "$1.8 B",
    age: "64",
    country: "Taiwan",
    source: "Transportation",
    industry: "Logistics "
  },
  {
    key: "1652",
    rank: "1645",
    name: "Chen Gang ",
    netWorth: "$1.8 B",
    age: "54",
    country: "China",
    source: "solar energy",
    industry: "Energy "
  },
  {
    key: "1653",
    rank: "1645",
    name: "Liying Chen ",
    netWorth: "$1.8 B",
    age: "46",
    country: "China",
    source: "package delivery",
    industry: "Logistics "
  },
  {
    key: "1654",
    rank: "1645",
    name: "Chen Xueli ",
    netWorth: "$1.8 B",
    age: "70",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1655",
    rank: "1645",
    name: "Chi Yufeng ",
    netWorth: "$1.8 B",
    age: "51",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1656",
    rank: "1645",
    name: "Mark Coombs ",
    netWorth: "$1.8 B",
    age: "61",
    country: "United Kingdom",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "1657",
    rank: "1645",
    name: "Tench Coxe ",
    netWorth: "$1.8 B",
    age: "64",
    country: "United States",
    source: "venture capital",
    industry: "Finance & Investments "
  },
  {
    key: "1658",
    rank: "1645",
    name: "John de Mol ",
    netWorth: "$1.8 B",
    age: "67",
    country: "Netherlands",
    source: "TV programs",
    industry: "Media & Entertainment "
  },
  {
    key: "1659",
    rank: "1645",
    name: "Alfredo Egydio Arruda Villela Filho ",
    netWorth: "$1.8 B",
    age: "52",
    country: "Brazil",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "1660",
    rank: "1645",
    name: "Ibrahim Erdemoglu ",
    netWorth: "$1.8 B",
    age: "59",
    country: "Turkey",
    source: "carpet",
    industry: "Manufacturing "
  },
  {
    key: "1661",
    rank: "1645",
    name: "Philip Fayer ",
    netWorth: "$1.8 B",
    age: "64",
    country: "Canada",
    source: "online payments",
    industry: "Finance & Investments "
  },
  {
    key: "1662",
    rank: "1645",
    name: "Paul Foster ",
    netWorth: "$1.8 B",
    age: "64",
    country: "United States",
    source: "oil refining",
    industry: "Energy "
  },
  {
    key: "1663",
    rank: "1645",
    name: "James France ",
    netWorth: "$1.8 B",
    age: "77",
    country: "United States",
    source: "Nascar, racing",
    industry: "Sports "
  },
  {
    key: "1664",
    rank: "1645",
    name: "Yasuhiro Fukushima ",
    netWorth: "$1.8 B",
    age: "74",
    country: "Japan",
    source: "video games",
    industry: "Media & Entertainment "
  },
  {
    key: "1665",
    rank: "1645",
    name: "Zhongru Gan ",
    netWorth: "$1.8 B",
    age: "73",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1666",
    rank: "1645",
    name: "Rahul Gautam ",
    netWorth: "$1.8 B",
    age: "69",
    country: "India",
    source: "mattresses",
    industry: "Fashion & Retail "
  },
  {
    key: "1667",
    rank: "1645",
    name: "Ali Ghodsi ",
    netWorth: "$1.8 B",
    age: "43",
    country: "Sweden",
    source: "data analytics",
    industry: "Technology "
  },
  {
    key: "1668",
    rank: "1645",
    name: "Giammaria Giuliani ",
    netWorth: "$1.8 B",
    age: "44",
    country: "Switzerland",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1669",
    rank: "1645",
    name: "Christopher Goldsbury ",
    netWorth: "$1.8 B",
    age: "79",
    country: "United States",
    source: "salsa",
    industry: "Food & Beverage "
  },
  {
    key: "1670",
    rank: "1645",
    name: "Alexandre Grendene Bartelle ",
    netWorth: "$1.8 B",
    age: "72",
    country: "Brazil",
    source: "shoes",
    industry: "Fashion & Retail "
  },
  {
    key: "1671",
    rank: "1645",
    name: "Surjit Kumar Gupta ",
    netWorth: "$1.8 B",
    age: "80",
    country: "India",
    source: "electrical equipment",
    industry: "Manufacturing "
  },
  {
    key: "1672",
    rank: "1645",
    name: "Brian Higgins ",
    netWorth: "$1.8 B",
    age: "57",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1673",
    rank: "1645",
    name: "David Hindawi ",
    netWorth: "$1.8 B",
    age: "77",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1674",
    rank: "1645",
    name: "Chengzhong Hu ",
    netWorth: "$1.8 B",
    age: "61",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1675",
    rank: "1645",
    name: "Huang Min ",
    netWorth: "$1.8 B",
    age: "48",
    country: "China",
    source: "machinery",
    industry: "Manufacturing "
  },
  {
    key: "1676",
    rank: "1645",
    name: "Stanley Hubbard ",
    netWorth: "$1.8 B",
    age: "88",
    country: "United States",
    source: "DirecTV",
    industry: "Media & Entertainment "
  },
  {
    key: "1677",
    rank: "1645",
    name: "Hui Lin Chit ",
    netWorth: "$1.8 B",
    age: "68",
    country: "China",
    source: "hygiene products",
    industry: "Manufacturing "
  },
  {
    key: "1678",
    rank: "1645",
    name: "Hal Jackman ",
    netWorth: "$1.8 B",
    age: "89",
    country: "Canada",
    source: "insurance, investments",
    industry: "Finance & Investments "
  },
  {
    key: "1679",
    rank: "1645",
    name: "Stephen Jarislowsky ",
    netWorth: "$1.8 B",
    age: "96",
    country: "Canada",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "1680",
    rank: "1645",
    name: "Mark & Robyn Jones ",
    netWorth: "$1.8 B",
    age: "64",
    country: "United States",
    source: "insurance",
    industry: "Finance & Investments "
  },
  {
    key: "1681",
    rank: "1645",
    name: "George Joseph ",
    netWorth: "$1.8 B",
    age: "100",
    country: "United States",
    source: "insurance",
    industry: "Finance & Investments "
  },
  {
    key: "1682",
    rank: "1645",
    name: "Kim Kardashian ",
    netWorth: "$1.8 B",
    age: "41",
    country: "United States",
    source: "cosmetics, reality TV",
    industry: "Fashion & Retail "
  },
  {
    key: "1683",
    rank: "1645",
    name: "Dominika Kulczyk ",
    netWorth: "$1.8 B",
    age: "44",
    country: "Poland",
    source: "diversified",
    industry: "Finance & Investments "
  },
  {
    key: "1684",
    rank: "1645",
    name: "Edward Lampert ",
    netWorth: "$1.8 B",
    age: "59",
    country: "United States",
    source: "Sears",
    industry: "Finance & Investments "
  },
  {
    key: "1685",
    rank: "1645",
    name: "Marc Lasry ",
    netWorth: "$1.8 B",
    age: "61",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1686",
    rank: "1645",
    name: "Michiel Le Roux ",
    netWorth: "$1.8 B",
    age: "72",
    country: "South Africa",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "1687",
    rank: "1645",
    name: "Peter Leibinger ",
    netWorth: "$1.8 B",
    age: "55",
    country: "Germany",
    source: "machine tools",
    industry: "Manufacturing "
  },
  {
    key: "1688",
    rank: "1645",
    name: "Regine Leibinger ",
    netWorth: "$1.8 B",
    age: "59",
    country: "Germany",
    source: "machine tools",
    industry: "Manufacturing "
  },
  {
    key: "1689",
    rank: "1645",
    name: "Nicola Leibinger-Kammueller ",
    netWorth: "$1.8 B",
    age: "62",
    country: "Germany",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1690",
    rank: "1645",
    name: "Wolfgang Leitner ",
    netWorth: "$1.8 B",
    age: "69",
    country: "Austria",
    source: "engineering",
    industry: "Construction & Engineering "
  },
  {
    key: "1691",
    rank: "1645",
    name: "Liu Zhongtian & family ",
    netWorth: "$1.8 B",
    age: "58",
    country: "China",
    source: "aluminum products",
    industry: "Manufacturing "
  },
  {
    key: "1692",
    rank: "1645",
    name: "Bill Malhotra ",
    netWorth: "$1.8 B",
    age: "72",
    country: "Canada",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1693",
    rank: "1645",
    name: "Charlwin Mao ",
    netWorth: "$1.8 B",
    age: "64",
    country: "China",
    source: "e-commerce",
    industry: "Fashion & Retail "
  },
  {
    key: "1694",
    rank: "1645",
    name: "George Marcus ",
    netWorth: "$1.8 B",
    age: "80",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1695",
    rank: "1645",
    name: "Yves-Loic Martin ",
    netWorth: "$1.8 B",
    age: "56",
    country: "France",
    source: "laboratory services",
    industry: "Healthcare "
  },
  {
    key: "1696",
    rank: "1645",
    name: "Gary Michelson ",
    netWorth: "$1.8 B",
    age: "73",
    country: "United States",
    source: "medical patents",
    industry: "Healthcare "
  },
  {
    key: "1697",
    rank: "1645",
    name: "Robert G. Miller ",
    netWorth: "$1.8 B",
    age: "76",
    country: "Canada",
    source: "electronics components",
    industry: "Technology "
  },
  {
    key: "1698",
    rank: "1645",
    name: "Fernando Roberto Moreira Salles ",
    netWorth: "$1.8 B",
    age: "75",
    country: "Brazil",
    source: "banking, minerals",
    industry: "Diversified "
  },
  {
    key: "1699",
    rank: "1645",
    name: "Joao Moreira Salles ",
    netWorth: "$1.8 B",
    age: "60",
    country: "Brazil",
    source: "banking, minerals",
    industry: "Diversified "
  },
  {
    key: "1700",
    rank: "1645",
    name: "Walther Moreira Salles Junior ",
    netWorth: "$1.8 B",
    age: "65",
    country: "Brazil",
    source: "banking, minerals",
    industry: "Finance & Investments "
  },
  {
    key: "1701",
    rank: "1645",
    name: "Zugen Ni ",
    netWorth: "$1.8 B",
    age: "65",
    country: "China",
    source: "appliances",
    industry: "Manufacturing "
  },
  {
    key: "1702",
    rank: "1645",
    name: "Liora Ofer ",
    netWorth: "$1.8 B",
    age: "68",
    country: "Israel",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1703",
    rank: "1645",
    name: "Mrudula Parekh ",
    netWorth: "$1.8 B",
    age: "74",
    country: "India",
    source: "adhesives",
    industry: "Manufacturing "
  },
  {
    key: "1704",
    rank: "1645",
    name: "David Paul ",
    netWorth: "$1.8 B",
    age: "55",
    country: "United States",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "1705",
    rank: "1645",
    name: "Pierre Karl Péladeau ",
    netWorth: "$1.8 B",
    age: "60",
    country: "Canada",
    source: "media",
    industry: "Media & Entertainment "
  },
  {
    key: "1706",
    rank: "1645",
    name: "Miranda Qu ",
    netWorth: "$1.8 B",
    age: "37",
    country: "China",
    source: "e-commerce",
    industry: "Fashion & Retail "
  },
  {
    key: "1707",
    rank: "1645",
    name: "Phillip T. (Terry) Ragon ",
    netWorth: "$1.8 B",
    age: "72",
    country: "United States",
    source: "health IT",
    industry: "Technology "
  },
  {
    key: "1708",
    rank: "1645",
    name: "G. Rajendran ",
    netWorth: "$1.8 B",
    age: "79",
    country: "India",
    source: "jewellery",
    industry: "Fashion & Retail "
  },
  {
    key: "1709",
    rank: "1645",
    name: "Krit Ratanarak ",
    netWorth: "$1.8 B",
    age: "75",
    country: "Thailand",
    source: "media, real estate",
    industry: "Media & Entertainment "
  },
  {
    key: "1710",
    rank: "1645",
    name: "Jerry Reinsdorf ",
    netWorth: "$1.8 B",
    age: "86",
    country: "United States",
    source: "sports teams",
    industry: "Sports "
  },
  {
    key: "1711",
    rank: "1645",
    name: "Mochtar Riady & family ",
    netWorth: "$1.8 B",
    age: "92",
    country: "Indonesia",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1712",
    rank: "1645",
    name: "Rajju Shroff ",
    netWorth: "$1.8 B",
    age: "88",
    country: "India",
    source: "agrochemicals",
    industry: "Manufacturing "
  },
  {
    key: "1713",
    rank: "1645",
    name: "Frank Slootman ",
    netWorth: "$1.8 B",
    age: "63",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1714",
    rank: "1645",
    name: "Henry Swieca ",
    netWorth: "$1.8 B",
    age: "64",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1715",
    rank: "1645",
    name: "Yuequn Tao ",
    netWorth: "$1.8 B",
    age: "62",
    country: "China",
    source: "Contact Lens",
    industry: "Fashion & Retail "
  },
  {
    key: "1716",
    rank: "1645",
    name: "Robert Toennies ",
    netWorth: "$1.8 B",
    age: "43",
    country: "Germany",
    source: "meat processing",
    industry: "Food & Beverage "
  },
  {
    key: "1717",
    rank: "1645",
    name: "Torbjorn Tornqvist ",
    netWorth: "$1.8 B",
    age: "68",
    country: "Sweden",
    source: "oil trading",
    industry: "Energy "
  },
  {
    key: "1718",
    rank: "1645",
    name: "Zhenghua Wang ",
    netWorth: "$1.8 B",
    age: "77",
    country: "China",
    source: "budget airline",
    industry: "Service "
  },
  {
    key: "1719",
    rank: "1645",
    name: "Charlotte Colket Weber ",
    netWorth: "$1.8 B",
    age: "79",
    country: "United States",
    source: "Campbell Soup",
    industry: "Food & Beverage "
  },
  {
    key: "1720",
    rank: "1645",
    name: "Wu Lanlan & family ",
    netWorth: "$1.8 B",
    age: "48",
    country: "China",
    source: "packaging",
    industry: "Manufacturing "
  },
  {
    key: "1721",
    rank: "1645",
    name: "Wu Yulan ",
    netWorth: "$1.8 B",
    age: "52",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1722",
    rank: "1645",
    name: "Elaine Wynn ",
    netWorth: "$1.8 B",
    age: "79",
    country: "United States",
    source: "casinos, hotels",
    industry: "Gambling & Casinos "
  },
  {
    key: "1723",
    rank: "1645",
    name: "Xu Shijun & family ",
    netWorth: "$1.8 B",
    age: "59",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1724",
    rank: "1645",
    name: "Xu Xudong & family ",
    netWorth: "$1.8 B",
    age: "52",
    country: "China",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "1725",
    rank: "1645",
    name: "Yang Xuegang ",
    netWorth: "$1.8 B",
    age: "57",
    country: "China",
    source: "coking",
    industry: "Manufacturing "
  },
  {
    key: "1726",
    rank: "1645",
    name: "Zhang Chuanwei & family ",
    netWorth: "$1.8 B",
    age: "59",
    country: "China",
    source: "machinery",
    industry: "Manufacturing "
  },
  {
    key: "1727",
    rank: "1645",
    name: "Xuexin Zhang & family ",
    netWorth: "$1.8 B",
    age: "74",
    country: "China",
    source: "aluminum",
    industry: "Metals & Mining "
  },
  {
    key: "1728",
    rank: "1729",
    name: "Noubar Afeyan ",
    netWorth: "$1.7 B",
    age: "59",
    country: "United States",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "1729",
    rank: "1729",
    name: "Farkhad Akhmedov ",
    netWorth: "$1.7 B",
    age: "66",
    country: "Russia",
    source: "investments",
    industry: "Energy "
  },
  {
    key: "1730",
    rank: "1729",
    name: "Marc Andreessen ",
    netWorth: "$1.7 B",
    age: "50",
    country: "United States",
    source: "venture capital investing",
    industry: "Finance & Investments "
  },
  {
    key: "1731",
    rank: "1729",
    name: "John Bicket ",
    netWorth: "$1.7 B",
    age: "42",
    country: "United States",
    source: "sensor systems",
    industry: "Technology "
  },
  {
    key: "1732",
    rank: "1729",
    name: "Zadik Bino & family ",
    netWorth: "$1.7 B",
    age: "78",
    country: "Israel",
    source: "banking, oil",
    industry: "Diversified "
  },
  {
    key: "1733",
    rank: "1729",
    name: "Alex Birkenstock ",
    netWorth: "$1.7 B",
    age: "53",
    country: "Germany",
    source: "shoes",
    industry: "Fashion & Retail "
  },
  {
    key: "1734",
    rank: "1729",
    name: "Christian Birkenstock ",
    netWorth: "$1.7 B",
    age: "49",
    country: "Germany",
    source: "shoes",
    industry: "Fashion & Retail "
  },
  {
    key: "1735",
    rank: "1729",
    name: "Sanjit Biswas ",
    netWorth: "$1.7 B",
    age: "40",
    country: "United States",
    source: "sensor systems",
    industry: "Technology "
  },
  {
    key: "1736",
    rank: "1729",
    name: "David Booth ",
    netWorth: "$1.7 B",
    age: "76",
    country: "United States",
    source: "mutual funds",
    industry: "Finance & Investments "
  },
  {
    key: "1737",
    rank: "1729",
    name: "Josef Boquoi & family ",
    netWorth: "$1.7 B",
    age: "88",
    country: "Germany",
    source: "frozen foods",
    industry: "Food & Beverage "
  },
  {
    key: "1738",
    rank: "1729",
    name: "Saket Burman ",
    netWorth: "$1.7 B",
    age: "45",
    country: "United Kingdom",
    source: "consumer goods",
    industry: "Food & Beverage "
  },
  {
    key: "1739",
    rank: "1729",
    name: "Mingtong Cai ",
    netWorth: "$1.7 B",
    age: "70",
    country: "China",
    source: "electronic components",
    industry: "Technology "
  },
  {
    key: "1740",
    rank: "1729",
    name: "Chen Yung-tai ",
    netWorth: "$1.7 B",
    age: "86",
    country: "Taiwan",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1741",
    rank: "1729",
    name: "Manas Chiaravanond ",
    netWorth: "$1.7 B",
    age: "64",
    country: "Thailand",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1742",
    rank: "1729",
    name: "Phongthep Chiaravanont ",
    netWorth: "$1.7 B",
    age: "70",
    country: "Thailand",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1743",
    rank: "1729",
    name: "Ivan Chrenko ",
    netWorth: "$1.7 B",
    age: "54",
    country: "Slovakia",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1744",
    rank: "1729",
    name: "Sol Daurella ",
    netWorth: "$1.7 B",
    age: "56",
    country: "Spain",
    source: "Coca-Cola bottler",
    industry: "Food & Beverage "
  },
  {
    key: "1745",
    rank: "1729",
    name: "Dulce Pugliese de Godoy Bueno ",
    netWorth: "$1.7 B",
    age: "74",
    country: "Brazil",
    source: "hospitals, health care",
    industry: "Healthcare "
  },
  {
    key: "1746",
    rank: "1729",
    name: "Norbert Dentressangle ",
    netWorth: "$1.7 B",
    age: "67",
    country: "France",
    source: "transport, logistics",
    industry: "Logistics "
  },
  {
    key: "1747",
    rank: "1729",
    name: "Oleg Deripaska ",
    netWorth: "$1.7 B",
    age: "54",
    country: "Russia",
    source: "aluminum, utilities",
    industry: "Metals & Mining "
  },
  {
    key: "1748",
    rank: "1729",
    name: "Dong Jinggui ",
    netWorth: "$1.7 B",
    age: "52",
    country: "China",
    source: "electric scooters",
    industry: "Automotive "
  },
  {
    key: "1749",
    rank: "1729",
    name: "Keith Dunleavy & family ",
    netWorth: "$1.7 B",
    age: "52",
    country: "United States",
    source: "health IT",
    industry: "Healthcare "
  },
  {
    key: "1750",
    rank: "1729",
    name: "Donald Foss ",
    netWorth: "$1.7 B",
    age: "77",
    country: "United States",
    source: "auto loans",
    industry: "Automotive "
  },
  {
    key: "1751",
    rank: "1729",
    name: "Rolf Gerling ",
    netWorth: "$1.7 B",
    age: "67",
    country: "Germany",
    source: "insurance",
    industry: "Finance & Investments "
  },
  {
    key: "1752",
    rank: "1729",
    name: "G. Gnanalingam ",
    netWorth: "$1.7 B",
    age: "77",
    country: "Malaysia",
    source: "ports",
    industry: "Logistics "
  },
  {
    key: "1753",
    rank: "1729",
    name: "He Zhaoxi ",
    netWorth: "$1.7 B",
    age: "48",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1754",
    rank: "1729",
    name: "William Heinecke ",
    netWorth: "$1.7 B",
    age: "72",
    country: "Thailand",
    source: "hotels",
    industry: "Real Estate "
  },
  {
    key: "1755",
    rank: "1729",
    name: "Huh Jae-myung ",
    netWorth: "$1.7 B",
    age: "50",
    country: "South Korea",
    source: "electric components",
    industry: "Manufacturing "
  },
  {
    key: "1756",
    rank: "1729",
    name: "Tianjiang Jia & family ",
    netWorth: "$1.7 B",
    age: "59",
    country: "China",
    source: "non-ferrous metals",
    industry: "Metals & Mining "
  },
  {
    key: "1757",
    rank: "1729",
    name: "Michael Jordan ",
    netWorth: "$1.7 B",
    age: "59",
    country: "United States",
    source: "Charlotte Hornets, endorsements",
    industry: "Sports "
  },
  {
    key: "1758",
    rank: "1729",
    name: "Dmitry Kamenshchik ",
    netWorth: "$1.7 B",
    age: "53",
    country: "Russia",
    source: "airport",
    industry: "Service "
  },
  {
    key: "1759",
    rank: "1729",
    name: "Kim Taek-jin ",
    netWorth: "$1.7 B",
    age: "55",
    country: "South Korea",
    source: "online games",
    industry: "Media & Entertainment "
  },
  {
    key: "1760",
    rank: "1729",
    name: "Koo Kwang-mo ",
    netWorth: "$1.7 B",
    age: "44",
    country: "South Korea",
    source: "LG",
    industry: "Diversified "
  },
  {
    key: "1761",
    rank: "1729",
    name: "Anthony Langley ",
    netWorth: "$1.7 B",
    age: "67",
    country: "United Kingdom",
    source: "manufacturing",
    industry: "Diversified "
  },
  {
    key: "1762",
    rank: "1729",
    name: "Lee Joong-keun ",
    netWorth: "$1.7 B",
    age: "81",
    country: "South Korea",
    source: "construction, real estate",
    industry: "Construction & Engineering "
  },
  {
    key: "1763",
    rank: "1729",
    name: "James Leininger ",
    netWorth: "$1.7 B",
    age: "77",
    country: "United States",
    source: "medical products",
    industry: "Healthcare "
  },
  {
    key: "1764",
    rank: "1729",
    name: "Li Haiyan ",
    netWorth: "$1.7 B",
    age: "64",
    country: "China",
    source: "restaurants",
    industry: "Food & Beverage "
  },
  {
    key: "1765",
    rank: "1729",
    name: "Li Jianli ",
    netWorth: "$1.7 B",
    age: "49",
    country: "China",
    source: "lithium-ion battery cap",
    industry: "Manufacturing "
  },
  {
    key: "1766",
    rank: "1729",
    name: "Weiwei Li ",
    netWorth: "$1.7 B",
    age: "45",
    country: "China",
    source: "online games",
    industry: "Technology "
  },
  {
    key: "1767",
    rank: "1729",
    name: "Li Zhigang ",
    netWorth: "$1.7 B",
    age: "45",
    country: "China",
    source: "machinery",
    industry: "Manufacturing "
  },
  {
    key: "1768",
    rank: "1729",
    name: "Jimmy John Liautaud ",
    netWorth: "$1.7 B",
    age: "58",
    country: "United States",
    source: "sandwich chain",
    industry: "Food & Beverage "
  },
  {
    key: "1769",
    rank: "1729",
    name: "Louise Lindh ",
    netWorth: "$1.7 B",
    age: "42",
    country: "Sweden",
    source: "investments",
    industry: "Diversified "
  },
  {
    key: "1770",
    rank: "1729",
    name: "Lu Di ",
    netWorth: "$1.7 B",
    age: "64",
    country: "China",
    source: "drones",
    industry: "Technology "
  },
  {
    key: "1771",
    rank: "1729",
    name: "Anand Mahindra ",
    netWorth: "$1.7 B",
    age: "66",
    country: "India",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1772",
    rank: "1729",
    name: "Bruce Mathieson ",
    netWorth: "$1.7 B",
    age: "78",
    country: "Australia",
    source: "hotels",
    industry: "Food & Beverage "
  },
  {
    key: "1773",
    rank: "1729",
    name: "Billy Joe (Red) McCombs ",
    netWorth: "$1.7 B",
    age: "94",
    country: "United States",
    source: "real estate, oil, cars, sports",
    industry: "Diversified "
  },
  {
    key: "1774",
    rank: "1729",
    name: "Deepak Mehta ",
    netWorth: "$1.7 B",
    age: "65",
    country: "India",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1775",
    rank: "1729",
    name: "Mario Moretti Polegato & family ",
    netWorth: "$1.7 B",
    age: "69",
    country: "Italy",
    source: "shoes",
    industry: "Fashion & Retail "
  },
  {
    key: "1776",
    rank: "1729",
    name: "Alberto Palatchi ",
    netWorth: "$1.7 B",
    age: "72",
    country: "Spain",
    source: "wedding dresses",
    industry: "Fashion & Retail "
  },
  {
    key: "1777",
    rank: "1729",
    name: "Nelson Peltz ",
    netWorth: "$1.7 B",
    age: "79",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1778",
    rank: "1729",
    name: "Jorge Perez ",
    netWorth: "$1.7 B",
    age: "72",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1779",
    rank: "1729",
    name: "Alberto Prada ",
    netWorth: "$1.7 B",
    age: "68",
    country: "Italy",
    source: "luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "1780",
    rank: "1729",
    name: "Marina Prada ",
    netWorth: "$1.7 B",
    age: "76",
    country: "Italy",
    source: "luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "1781",
    rank: "1729",
    name: "M.Satyanarayana Reddy ",
    netWorth: "$1.7 B",
    age: "64",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1782",
    rank: "1729",
    name: "Rihanna ",
    netWorth: "$1.7 B",
    age: "34",
    country: "Barbados",
    source: "music, cosmetics",
    industry: "Fashion & Retail "
  },
  {
    key: "1783",
    rank: "1729",
    name: "Arkady Rotenberg ",
    netWorth: "$1.7 B",
    age: "70",
    country: "Russia",
    source: "construction, pipes, banking",
    industry: "Construction & Engineering "
  },
  {
    key: "1784",
    rank: "1729",
    name: "Dieter Schnabel ",
    netWorth: "$1.7 B",
    age: "76",
    country: "Germany",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1785",
    rank: "1729",
    name: "Shang Xiaobo & family ",
    netWorth: "$1.7 B",
    age: "48",
    country: "China",
    source: "Manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1786",
    rank: "1729",
    name: "Shao Qinxiang ",
    netWorth: "$1.7 B",
    age: "67",
    country: "China",
    source: "diversified",
    industry: "Manufacturing "
  },
  {
    key: "1787",
    rank: "1729",
    name: "Renate Sick-Glaser ",
    netWorth: "$1.7 B",
    age: "64",
    country: "Germany",
    source: "sensor technology",
    industry: "Technology "
  },
  {
    key: "1788",
    rank: "1729",
    name: "Basudeo Singh ",
    netWorth: "$1.7 B",
    age: "81",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1789",
    rank: "1729",
    name: "Edward Stack ",
    netWorth: "$1.7 B",
    age: "67",
    country: "United States",
    source: "Dick's Sporting Goods",
    industry: "Fashion & Retail "
  },
  {
    key: "1790",
    rank: "1729",
    name: "Weijie Sun ",
    netWorth: "$1.7 B",
    age: "58",
    country: "China",
    source: "oilfield equipment",
    industry: "Manufacturing "
  },
  {
    key: "1791",
    rank: "1729",
    name: "Vonnarat Tangkaravakoon ",
    netWorth: "$1.7 B",
    age: "50",
    country: "Thailand",
    source: "wire & cables, paints",
    industry: "Manufacturing "
  },
  {
    key: "1792",
    rank: "1729",
    name: "Byron Trott ",
    netWorth: "$1.7 B",
    age: "63",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1793",
    rank: "1729",
    name: "Jan Van Geet ",
    netWorth: "$1.7 B",
    age: "50",
    country: "Belgium",
    source: "real estate developer",
    industry: "Real Estate "
  },
  {
    key: "1794",
    rank: "1729",
    name: "Radha Vembu ",
    netWorth: "$1.7 B",
    age: "49",
    country: "India",
    source: "business software",
    industry: "Technology "
  },
  {
    key: "1795",
    rank: "1729",
    name: "Patrizio Vinciarelli ",
    netWorth: "$1.7 B",
    age: "75",
    country: "United States",
    source: "electronic components",
    industry: "Technology "
  },
  {
    key: "1796",
    rank: "1729",
    name: "Mingwang Wang ",
    netWorth: "$1.7 B",
    age: "54",
    country: "China",
    source: "electronics components",
    industry: "Manufacturing "
  },
  {
    key: "1797",
    rank: "1729",
    name: "Wang Yanqing & family ",
    netWorth: "$1.7 B",
    age: "75",
    country: "China",
    source: "carbon fiber products",
    industry: "Manufacturing "
  },
  {
    key: "1798",
    rank: "1729",
    name: "Lars Wingefors ",
    netWorth: "$1.7 B",
    age: "45",
    country: "Sweden",
    source: "video games",
    industry: "Media & Entertainment "
  },
  {
    key: "1799",
    rank: "1729",
    name: "Stephen Winn ",
    netWorth: "$1.7 B",
    age: "75",
    country: "United States",
    source: "real estate services",
    industry: "Real Estate "
  },
  {
    key: "1800",
    rank: "1729",
    name: "Ian Wood & family ",
    netWorth: "$1.7 B",
    age: "79",
    country: "United Kingdom",
    source: "energy services",
    industry: "Energy "
  },
  {
    key: "1801",
    rank: "1729",
    name: "Gordon Wu ",
    netWorth: "$1.7 B",
    age: "86",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1802",
    rank: "1729",
    name: "Wu Xiangdong ",
    netWorth: "$1.7 B",
    age: "53",
    country: "China",
    source: "consumer",
    industry: "Food & Beverage "
  },
  {
    key: "1803",
    rank: "1729",
    name: "Yao Kuizhang ",
    netWorth: "$1.7 B",
    age: "57",
    country: "China",
    source: "beverages",
    industry: "Food & Beverage "
  },
  {
    key: "1804",
    rank: "1729",
    name: "Vladimir Yevtushenkov ",
    netWorth: "$1.7 B",
    age: "73",
    country: "Russia",
    source: "telecom, investments",
    industry: "Telecom "
  },
  {
    key: "1805",
    rank: "1729",
    name: "Dasheng Yi ",
    netWorth: "$1.7 B",
    age: "61",
    country: "China",
    source: "conglomerate",
    industry: "Diversified "
  },
  {
    key: "1806",
    rank: "1729",
    name: "Yu Lili ",
    netWorth: "$1.7 B",
    age: "54",
    country: "China",
    source: "electronic components",
    industry: "Manufacturing "
  },
  {
    key: "1807",
    rank: "1729",
    name: "Alan Zekelman ",
    netWorth: "$1.7 B",
    age: "59",
    country: "Canada",
    source: "steel",
    industry: "Manufacturing "
  },
  {
    key: "1808",
    rank: "1729",
    name: "Kaitian Zeng ",
    netWorth: "$1.7 B",
    age: "47",
    country: "China",
    source: "online games",
    industry: "Technology "
  },
  {
    key: "1809",
    rank: "1729",
    name: "Zhang Jingzhang & family ",
    netWorth: "$1.7 B",
    age: "86",
    country: "China",
    source: "precision machinery",
    industry: "Manufacturing "
  },
  {
    key: "1810",
    rank: "1729",
    name: "Zhang Yubai ",
    netWorth: "$1.7 B",
    age: "57",
    country: "China",
    source: "wine",
    industry: "Food & Beverage "
  },
  {
    key: "1811",
    rank: "1729",
    name: "Zheng Hong & family ",
    netWorth: "$1.7 B",
    age: "71",
    country: "China",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "1812",
    rank: "1729",
    name: "Zhong Peifeng ",
    netWorth: "$1.7 B",
    age: "59",
    country: "United States",
    source: "semiconductor",
    industry: "Telecom "
  },
  {
    key: "1813",
    rank: "1729",
    name: "Zhou Zongwen & family ",
    netWorth: "$1.7 B",
    age: "65",
    country: "China",
    source: "jewelry",
    industry: "Fashion & Retail "
  },
  {
    key: "1814",
    rank: "1729",
    name: "Zhu Yiming ",
    netWorth: "$1.7 B",
    age: "49",
    country: "China",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "1815",
    rank: "1729",
    name: "Zhaojiang Zhu ",
    netWorth: "$1.7 B",
    age: "48",
    country: "China",
    source: "Smartphones",
    industry: "Manufacturing "
  },
  {
    key: "1816",
    rank: "1729",
    name: "Anita Zucker ",
    netWorth: "$1.7 B",
    age: "70",
    country: "United States",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1817",
    rank: "1818",
    name: "Herbert Allen, Jr. & family ",
    netWorth: "$1.6 B",
    age: "82",
    country: "United States",
    source: "investment banking",
    industry: "Finance & Investments "
  },
  {
    key: "1818",
    rank: "1818",
    name: "Vasily Anisimov ",
    netWorth: "$1.6 B",
    age: "70",
    country: "Russia",
    source: "real estate",
    industry: "Metals & Mining "
  },
  {
    key: "1819",
    rank: "1818",
    name: "Mori Arkin ",
    netWorth: "$1.6 B",
    age: "69",
    country: "Israel",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1820",
    rank: "1818",
    name: "Semahat Sevim Arsel ",
    netWorth: "$1.6 B",
    age: "93",
    country: "Turkey",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1821",
    rank: "1818",
    name: "Clifford Asness ",
    netWorth: "$1.6 B",
    age: "55",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "1822",
    rank: "1818",
    name: "Louis Bacon ",
    netWorth: "$1.6 B",
    age: "65",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "1823",
    rank: "1818",
    name: "Hari Bhartia ",
    netWorth: "$1.6 B",
    age: "65",
    country: "India",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1824",
    rank: "1818",
    name: "Shyam Bhartia ",
    netWorth: "$1.6 B",
    age: "69",
    country: "India",
    source: "pharmaceuticals, food",
    industry: "Healthcare "
  },
  {
    key: "1825",
    rank: "1818",
    name: "Amit Burman ",
    netWorth: "$1.6 B",
    age: "52",
    country: "India",
    source: "consumer goods",
    industry: "Food & Beverage "
  },
  {
    key: "1826",
    rank: "1818",
    name: "Chen Shibin ",
    netWorth: "$1.6 B",
    age: "55",
    country: "China",
    source: "quartz products",
    industry: "Manufacturing "
  },
  {
    key: "1827",
    rank: "1818",
    name: "Chen Tianshi ",
    netWorth: "$1.6 B",
    age: "37",
    country: "China",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "1828",
    rank: "1818",
    name: "Robert Clark ",
    netWorth: "$1.6 B",
    age: "63",
    country: "United States",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "1829",
    rank: "1818",
    name: "Ana Lucia de Mattos Barretto Villela ",
    netWorth: "$1.6 B",
    age: "48",
    country: "Brazil",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "1830",
    rank: "1818",
    name: "Diao Zhizhong ",
    netWorth: "$1.6 B",
    age: "58",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1831",
    rank: "1818",
    name: "Jamie Dimon ",
    netWorth: "$1.6 B",
    age: "66",
    country: "United States",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "1832",
    rank: "1818",
    name: "Gary Fegel ",
    netWorth: "$1.6 B",
    age: "48",
    country: "Switzerland",
    source: "commodities, investments",
    industry: "Metals & Mining "
  },
  {
    key: "1833",
    rank: "1818",
    name: "Gao Yunfeng ",
    netWorth: "$1.6 B",
    age: "55",
    country: "China",
    source: "industrial lasers",
    industry: "Manufacturing "
  },
  {
    key: "1834",
    rank: "1818",
    name: "Philippe Ginestet & family ",
    netWorth: "$1.6 B",
    age: "68",
    country: "France",
    source: "retail stores",
    industry: "Fashion & Retail "
  },
  {
    key: "1835",
    rank: "1818",
    name: "Sebastian Glaser ",
    netWorth: "$1.6 B",
    age: "64",
    country: "Germany",
    source: "sensor technology",
    industry: "Technology "
  },
  {
    key: "1836",
    rank: "1818",
    name: "Sam Goi ",
    netWorth: "$1.6 B",
    age: "75",
    country: "Singapore",
    source: "frozen foods",
    industry: "Food & Beverage "
  },
  {
    key: "1837",
    rank: "1818",
    name: "Lance Gokongwei ",
    netWorth: "$1.6 B",
    age: "54",
    country: "Philippines",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1838",
    rank: "1818",
    name: "Sergei Gordeev ",
    netWorth: "$1.6 B",
    age: "49",
    country: "Russia",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1839",
    rank: "1818",
    name: "Bill Gross ",
    netWorth: "$1.6 B",
    age: "77",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1840",
    rank: "1818",
    name: "Sue Gross ",
    netWorth: "$1.6 B",
    age: "72",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1841",
    rank: "1818",
    name: "Patrick Hanrahan ",
    netWorth: "$1.6 B",
    age: "66",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1842",
    rank: "1818",
    name: "Lutz Mario Helmig ",
    netWorth: "$1.6 B",
    age: "75",
    country: "Germany",
    source: "hospitals",
    industry: "Healthcare "
  },
  {
    key: "1843",
    rank: "1818",
    name: "Ilkka Herlin ",
    netWorth: "$1.6 B",
    age: "63",
    country: "Finland",
    source: "elevators, escalators",
    industry: "Manufacturing "
  },
  {
    key: "1844",
    rank: "1818",
    name: "Asok Kumar Hiranandani ",
    netWorth: "$1.6 B",
    age: "67",
    country: "Singapore",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1845",
    rank: "1818",
    name: "Hu Kunhui ",
    netWorth: "$1.6 B",
    age: "31",
    country: "China",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "1846",
    rank: "1818",
    name: "Archie Hwang ",
    netWorth: "$1.6 B",
    age: "69",
    country: "Taiwan",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "1847",
    rank: "1818",
    name: "Jared Isaacman ",
    netWorth: "$1.6 B",
    age: "39",
    country: "United States",
    source: "payment processing",
    industry: "Technology "
  },
  {
    key: "1848",
    rank: "1818",
    name: "Anurang Jain ",
    netWorth: "$1.6 B",
    age: "60",
    country: "India",
    source: "auto parts",
    industry: "Manufacturing "
  },
  {
    key: "1849",
    rank: "1818",
    name: "Jin Lei & family ",
    netWorth: "$1.6 B",
    age: "67",
    country: "China",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "1850",
    rank: "1818",
    name: "Sunjay Kapur ",
    netWorth: "$1.6 B",
    age: "50",
    country: "United States",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "1851",
    rank: "1818",
    name: "Richard Kayne ",
    netWorth: "$1.6 B",
    age: "76",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1852",
    rank: "1818",
    name: "Randal J. Kirk ",
    netWorth: "$1.6 B",
    age: "68",
    country: "United States",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1853",
    rank: "1818",
    name: "Jim Koch ",
    netWorth: "$1.6 B",
    age: "72",
    country: "United States",
    source: "beer",
    industry: "Food & Beverage "
  },
  {
    key: "1854",
    rank: "1818",
    name: "William Koch ",
    netWorth: "$1.6 B",
    age: "81",
    country: "United States",
    source: "oil, investments",
    industry: "Energy "
  },
  {
    key: "1855",
    rank: "1818",
    name: "Kagemasa Kozuki ",
    netWorth: "$1.6 B",
    age: "81",
    country: "Japan",
    source: "video games",
    industry: "Technology "
  },
  {
    key: "1856",
    rank: "1818",
    name: "Arvind Lal ",
    netWorth: "$1.6 B",
    age: "72",
    country: "India",
    source: "medical diagnostics",
    industry: "Healthcare "
  },
  {
    key: "1857",
    rank: "1818",
    name: "Robert Langer ",
    netWorth: "$1.6 B",
    age: "73",
    country: "United States",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "1858",
    rank: "1818",
    name: "Theodore Leonsis ",
    netWorth: "$1.6 B",
    age: "66",
    country: "United States",
    source: "sports teams",
    industry: "Sports "
  },
  {
    key: "1859",
    rank: "1818",
    name: "David Xueling Li ",
    netWorth: "$1.6 B",
    age: "49",
    country: "China",
    source: "live streaming service",
    industry: "Technology "
  },
  {
    key: "1860",
    rank: "1818",
    name: "Li Denghai ",
    netWorth: "$1.6 B",
    age: "72",
    country: "China",
    source: "seed production",
    industry: "Food & Beverage "
  },
  {
    key: "1861",
    rank: "1818",
    name: "Li Guoqing ",
    netWorth: "$1.6 B",
    age: "52",
    country: "China",
    source: "Petro Fibre",
    industry: "Manufacturing "
  },
  {
    key: "1862",
    rank: "1818",
    name: "Li Jiaquan ",
    netWorth: "$1.6 B",
    age: "58",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1863",
    rank: "1818",
    name: "Li Rucheng ",
    netWorth: "$1.6 B",
    age: "70",
    country: "China",
    source: "apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "1864",
    rank: "1818",
    name: "Li Sze Lim ",
    netWorth: "$1.6 B",
    age: "65",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1865",
    rank: "1818",
    name: "Li Yongqing ",
    netWorth: "$1.6 B",
    age: "57",
    country: "China",
    source: "Petro Firbe",
    industry: "Manufacturing "
  },
  {
    key: "1866",
    rank: "1818",
    name: "Lim Wee Chai ",
    netWorth: "$1.6 B",
    age: "64",
    country: "Malaysia",
    source: "rubber gloves",
    industry: "Manufacturing "
  },
  {
    key: "1867",
    rank: "1818",
    name: "Liu Aisen & family ",
    netWorth: "$1.6 B",
    age: "49",
    country: "China",
    source: "building materials",
    industry: "Construction & Engineering "
  },
  {
    key: "1868",
    rank: "1818",
    name: "Liu Ming Chung ",
    netWorth: "$1.6 B",
    age: "59",
    country: "Brazil",
    source: "paper",
    industry: "Manufacturing "
  },
  {
    key: "1869",
    rank: "1818",
    name: "Vincent Lo ",
    netWorth: "$1.6 B",
    age: "73",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1870",
    rank: "1818",
    name: "Brandt Louie ",
    netWorth: "$1.6 B",
    age: "78",
    country: "Canada",
    source: "drugstores",
    industry: "Food & Beverage "
  },
  {
    key: "1871",
    rank: "1818",
    name: "Catherine Lozick ",
    netWorth: "$1.6 B",
    age: "76",
    country: "United States",
    source: "valve manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1872",
    rank: "1818",
    name: "Lu Zongjun ",
    netWorth: "$1.6 B",
    age: "58",
    country: "China",
    source: "logistics",
    industry: "Logistics "
  },
  {
    key: "1873",
    rank: "1818",
    name: "Lv Jianming ",
    netWorth: "$1.6 B",
    age: "57",
    country: "Hong Kong",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "1874",
    rank: "1818",
    name: "Cargill MacMillan, III. ",
    netWorth: "$1.6 B",
    age: "62",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "1875",
    rank: "1818",
    name: "Duncan MacMillan ",
    netWorth: "$1.6 B",
    age: "84",
    country: "United States",
    source: "Bloomberg LP",
    industry: "Finance & Investments "
  },
  {
    key: "1876",
    rank: "1818",
    name: "John MacMillan ",
    netWorth: "$1.6 B",
    age: "72",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "1877",
    rank: "1818",
    name: "Martha MacMillan ",
    netWorth: "$1.6 B",
    age: "70",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "1878",
    rank: "1818",
    name: "William MacMillan ",
    netWorth: "$1.6 B",
    age: "67",
    country: "United States",
    source: "Cargill",
    industry: "Food & Beverage "
  },
  {
    key: "1879",
    rank: "1818",
    name: "Terence (Terry) Matthews ",
    netWorth: "$1.6 B",
    age: "79",
    country: "Canada",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "1880",
    rank: "1818",
    name: "Kazuo Okada ",
    netWorth: "$1.6 B",
    age: "79",
    country: "Japan",
    source: "casinos",
    industry: "Gambling & Casinos "
  },
  {
    key: "1881",
    rank: "1818",
    name: "Tomas Olivo Lopez ",
    netWorth: "$1.6 B",
    age: "48",
    country: "Spain",
    source: "shopping centers",
    industry: "Real Estate "
  },
  {
    key: "1882",
    rank: "1818",
    name: "Jorge Pinheiro Koren de Lima ",
    netWorth: "$1.6 B",
    age: "49",
    country: "Brazil",
    source: "hospitals, health insurance",
    industry: "Healthcare "
  },
  {
    key: "1883",
    rank: "1818",
    name: "Candido Pinheiro Koren de Lima Junior ",
    netWorth: "$1.6 B",
    age: "51",
    country: "Brazil",
    source: "hospitals, health insurance",
    industry: "Healthcare "
  },
  {
    key: "1884",
    rank: "1818",
    name: "Qian Ying ",
    netWorth: "$1.6 B",
    age: "56",
    country: "China",
    source: "pig breeding",
    industry: "Food & Beverage "
  },
  {
    key: "1885",
    rank: "1818",
    name: "Ren Jinsheng & family ",
    netWorth: "$1.6 B",
    age: "59",
    country: "China",
    source: "pharmaceutical",
    industry: "Healthcare "
  },
  {
    key: "1886",
    rank: "1818",
    name: "Brian Roberts ",
    netWorth: "$1.6 B",
    age: "62",
    country: "United States",
    source: "Comcast",
    industry: "Media & Entertainment "
  },
  {
    key: "1887",
    rank: "1818",
    name: "Austin Russell ",
    netWorth: "$1.6 B",
    age: "27",
    country: "United States",
    source: "sensors★",
    industry: "Automotive "
  },
  {
    key: "1888",
    rank: "1818",
    name: "George Sakellaris ",
    netWorth: "$1.6 B",
    age: "75",
    country: "United States",
    source: "energy services",
    industry: "Energy "
  },
  {
    key: "1889",
    rank: "1818",
    name: "Sheryl Sandberg ",
    netWorth: "$1.6 B",
    age: "52",
    country: "United States",
    source: "Facebook",
    industry: "Technology "
  },
  {
    key: "1890",
    rank: "1818",
    name: "Andres Santo Domingo ",
    netWorth: "$1.6 B",
    age: "43",
    country: "United States",
    source: "beer",
    industry: "Food & Beverage "
  },
  {
    key: "1891",
    rank: "1818",
    name: "Paul Saville ",
    netWorth: "$1.6 B",
    age: "66",
    country: "United States",
    source: "homebuilder",
    industry: "Real Estate "
  },
  {
    key: "1892",
    rank: "1818",
    name: "Ivan Savvidis ",
    netWorth: "$1.6 B",
    age: "63",
    country: "Russia",
    source: "agribusiness",
    industry: "Diversified "
  },
  {
    key: "1893",
    rank: "1818",
    name: "Michael Saylor ",
    netWorth: "$1.6 B",
    age: "57",
    country: "United States",
    source: "cryptocurrency",
    industry: "Technology "
  },
  {
    key: "1894",
    rank: "1818",
    name: "Gerald Schwartz ",
    netWorth: "$1.6 B",
    age: "80",
    country: "Canada",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "1895",
    rank: "1818",
    name: "Sathien Setthasit ",
    netWorth: "$1.6 B",
    age: "67",
    country: "Thailand",
    source: "energy drinks",
    industry: "Food & Beverage "
  },
  {
    key: "1896",
    rank: "1818",
    name: "Niraj Shah ",
    netWorth: "$1.6 B",
    age: "48",
    country: "United States",
    source: "online retail",
    industry: "Technology "
  },
  {
    key: "1897",
    rank: "1818",
    name: "Keiichi Shibahara ",
    netWorth: "$1.6 B",
    age: "57",
    country: "Japan",
    source: "healthcare",
    industry: "Healthcare "
  },
  {
    key: "1898",
    rank: "1818",
    name: "Evgeny (Eugene) Shvidler ",
    netWorth: "$1.6 B",
    age: "58",
    country: "United States",
    source: "oil & gas, investments",
    industry: "Energy "
  },
  {
    key: "1899",
    rank: "1818",
    name: "Ryan Smith ",
    netWorth: "$1.6 B",
    age: "43",
    country: "United States",
    source: "cloud computing",
    industry: "Technology "
  },
  {
    key: "1900",
    rank: "1818",
    name: "Peter Sperling ",
    netWorth: "$1.6 B",
    age: "62",
    country: "United States",
    source: "education",
    industry: "Service "
  },
  {
    key: "1901",
    rank: "1818",
    name: "Ion Stoica ",
    netWorth: "$1.6 B",
    age: "57",
    country: "Romania",
    source: "data analytics",
    industry: "Technology "
  },
  {
    key: "1902",
    rank: "1818",
    name: "Bambang Sutantio ",
    netWorth: "$1.6 B",
    age: "63",
    country: "Indonesia",
    source: "dairy & consumer products",
    industry: "Food & Beverage "
  },
  {
    key: "1903",
    rank: "1818",
    name: "Lili Tan ",
    netWorth: "$1.6 B",
    age: "64",
    country: "China",
    source: "feed",
    industry: "Food & Beverage "
  },
  {
    key: "1904",
    rank: "1818",
    name: "Tan Yu Yeh ",
    netWorth: "$1.6 B",
    age: "51",
    country: "Malaysia",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1905",
    rank: "1818",
    name: "David Teoh ",
    netWorth: "$1.6 B",
    age: "66",
    country: "Australia",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "1906",
    rank: "1818",
    name: "Carl Thoma ",
    netWorth: "$1.6 B",
    age: "73",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1907",
    rank: "1818",
    name: "Ion Tiriac ",
    netWorth: "$1.6 B",
    age: "82",
    country: "Romania",
    source: "banking, insurance",
    industry: "Finance & Investments "
  },
  {
    key: "1908",
    rank: "1818",
    name: "Clemens Toennies ",
    netWorth: "$1.6 B",
    age: "65",
    country: "Germany",
    source: "meat processing",
    industry: "Food & Beverage "
  },
  {
    key: "1909",
    rank: "1818",
    name: "Tran Ba Duong & family ",
    netWorth: "$1.6 B",
    age: "62",
    country: "Vietnam",
    source: "automotive",
    industry: "Automotive "
  },
  {
    key: "1910",
    rank: "1818",
    name: "Tseng Sing-ai ",
    netWorth: "$1.6 B",
    age: "64",
    country: "Taiwan",
    source: "petrochemicals",
    industry: "Manufacturing "
  },
  {
    key: "1911",
    rank: "1818",
    name: "Tung Ching Bor ",
    netWorth: "$1.6 B",
    age: "59",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1912",
    rank: "1818",
    name: "Tung Ching Sai ",
    netWorth: "$1.6 B",
    age: "57",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1913",
    rank: "1818",
    name: "Scott Watterson ",
    netWorth: "$1.6 B",
    age: "66",
    country: "United States",
    source: "fitness equipment",
    industry: "Technology "
  },
  {
    key: "1914",
    rank: "1818",
    name: "Wei Ing-Chou ",
    netWorth: "$1.6 B",
    age: "68",
    country: "Taiwan",
    source: "food, beverages",
    industry: "Food & Beverage "
  },
  {
    key: "1915",
    rank: "1818",
    name: "Wei Yin-Chun ",
    netWorth: "$1.6 B",
    age: "65",
    country: "Taiwan",
    source: "food, beverages",
    industry: "Food & Beverage "
  },
  {
    key: "1916",
    rank: "1818",
    name: "Wei Ying-Chiao ",
    netWorth: "$1.6 B",
    age: "67",
    country: "Taiwan",
    source: "food, beverages",
    industry: "Food & Beverage "
  },
  {
    key: "1917",
    rank: "1818",
    name: "Tom Werner ",
    netWorth: "$1.6 B",
    age: "71",
    country: "United States",
    source: "sports teams",
    industry: "Sports "
  },
  {
    key: "1918",
    rank: "1818",
    name: "Kie Chie Wong ",
    netWorth: "$1.6 B",
    age: "74",
    country: "Malaysia",
    source: "investments",
    industry: "Metals & Mining "
  },
  {
    key: "1919",
    rank: "1818",
    name: "Xu Guozhong & family ",
    netWorth: "$1.6 B",
    age: "58",
    country: "China",
    source: "Motors",
    industry: "Manufacturing "
  },
  {
    key: "1920",
    rank: "1818",
    name: "Xu Yuejuan ",
    netWorth: "$1.6 B",
    age: "60",
    country: "China",
    source: "Petro Fibre",
    industry: "Manufacturing "
  },
  {
    key: "1921",
    rank: "1818",
    name: "Yang Tingdong ",
    netWorth: "$1.6 B",
    age: "61",
    country: "China",
    source: "brewery",
    industry: "Food & Beverage "
  },
  {
    key: "1922",
    rank: "1818",
    name: "Yu Peidi ",
    netWorth: "$1.6 B",
    age: "62",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1923",
    rank: "1818",
    name: "Matei Zaharia ",
    netWorth: "$1.6 B",
    age: "36",
    country: "Romania",
    source: "data analytics",
    industry: "Technology "
  },
  {
    key: "1924",
    rank: "1818",
    name: "Zhang Jian ",
    netWorth: "$1.6 B",
    age: "53",
    country: "China",
    source: "electric bikes, scooters",
    industry: "Manufacturing "
  },
  {
    key: "1925",
    rank: "1818",
    name: "Keqiang Zhang ",
    netWorth: "$1.6 B",
    age: "61",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1926",
    rank: "1818",
    name: "Zheng Jianjiang & family ",
    netWorth: "$1.6 B",
    age: "61",
    country: "China",
    source: "electrical equipment",
    industry: "Manufacturing "
  },
  {
    key: "1927",
    rank: "1818",
    name: "Zhong Sheng Jian ",
    netWorth: "$1.6 B",
    age: "64",
    country: "Singapore",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1928",
    rank: "1929",
    name: "Antti Aarnio-Wihuri ",
    netWorth: "$1.5 B",
    age: "82",
    country: "Finland",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1929",
    rank: "1929",
    name: "Hamdi Akin & family ",
    netWorth: "$1.5 B",
    age: "67",
    country: "Turkey",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1930",
    rank: "1929",
    name: "Chirayu Amin ",
    netWorth: "$1.5 B",
    age: "75",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1931",
    rank: "1929",
    name: "Joachim Ante ",
    netWorth: "$1.5 B",
    age: "39",
    country: "Germany",
    source: "game software",
    industry: "Technology "
  },
  {
    key: "1932",
    rank: "1929",
    name: "Ziv Aviram ",
    netWorth: "$1.5 B",
    age: "63",
    country: "Israel",
    source: "automotive technology",
    industry: "Automotive "
  },
  {
    key: "1933",
    rank: "1929",
    name: "Danna Azrieli ",
    netWorth: "$1.5 B",
    age: "54",
    country: "Israel",
    source: "Real estate",
    industry: "Real Estate "
  },
  {
    key: "1934",
    rank: "1929",
    name: "Naomi Azrieli ",
    netWorth: "$1.5 B",
    age: "56",
    country: "Canada",
    source: "Real estate",
    industry: "Real Estate "
  },
  {
    key: "1935",
    rank: "1929",
    name: "Sharon Azrieli ",
    netWorth: "$1.5 B",
    age: "61",
    country: "Canada",
    source: "Real estate",
    industry: "Real Estate "
  },
  {
    key: "1936",
    rank: "1929",
    name: "Lesley Bamberger ",
    netWorth: "$1.5 B",
    age: "56",
    country: "Netherlands",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1937",
    rank: "1929",
    name: "Bernhard Braun-Luedicke ",
    netWorth: "$1.5 B",
    age: "45",
    country: "Germany",
    source: "medical technology",
    industry: "Healthcare "
  },
  {
    key: "1938",
    rank: "1929",
    name: "Eva Maria Braun-Luedicke ",
    netWorth: "$1.5 B",
    age: "35",
    country: "Germany",
    source: "medical technology",
    industry: "Healthcare "
  },
  {
    key: "1939",
    rank: "1929",
    name: "Ana Maria Brescia Cafferata ",
    netWorth: "$1.5 B",
    age: "97",
    country: "Peru",
    source: "mining, banking",
    industry: "Diversified "
  },
  {
    key: "1940",
    rank: "1929",
    name: "Nikolai Buinov ",
    netWorth: "$1.5 B",
    age: "54",
    country: "Russia",
    source: "oil, gas",
    industry: "Energy "
  },
  {
    key: "1941",
    rank: "1929",
    name: "Paolo Bulgari ",
    netWorth: "$1.5 B",
    age: "84",
    country: "Italy",
    source: "luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "1942",
    rank: "1929",
    name: "Andres Bzurovski Bay ",
    netWorth: "$1.5 B",
    age: "44",
    country: "Uruguay",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "1943",
    rank: "1929",
    name: "Ahmet Calik ",
    netWorth: "$1.5 B",
    age: "64",
    country: "Turkey",
    source: "energy, banking, construction",
    industry: "Diversified "
  },
  {
    key: "1944",
    rank: "1929",
    name: "Giuliana Caprotti ",
    netWorth: "$1.5 B",
    age: "81",
    country: "Italy",
    source: "supermarkets",
    industry: "Food & Beverage "
  },
  {
    key: "1945",
    rank: "1929",
    name: "Marina Caprotti ",
    netWorth: "$1.5 B",
    age: "44",
    country: "Italy",
    source: "supermarkets",
    industry: "Food & Beverage "
  },
  {
    key: "1946",
    rank: "1929",
    name: "Steve Case ",
    netWorth: "$1.5 B",
    age: "63",
    country: "United States",
    source: "AOL",
    industry: "Technology "
  },
  {
    key: "1947",
    rank: "1929",
    name: "Safra Catz ",
    netWorth: "$1.5 B",
    age: "60",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "1948",
    rank: "1929",
    name: "Binod Chaudhary ",
    netWorth: "$1.5 B",
    age: "66",
    country: "Nepal",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1949",
    rank: "1929",
    name: "Chen Baohua ",
    netWorth: "$1.5 B",
    age: "60",
    country: "China",
    source: "pharmaceutical",
    industry: "Healthcare "
  },
  {
    key: "1950",
    rank: "1929",
    name: "Xianbao Chen & family ",
    netWorth: "$1.5 B",
    age: "62",
    country: "China",
    source: "food",
    industry: "Food & Beverage "
  },
  {
    key: "1951",
    rank: "1929",
    name: "Chung Yong-jin ",
    netWorth: "$1.5 B",
    age: "53",
    country: "South Korea",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "1952",
    rank: "1929",
    name: "Steve Conine ",
    netWorth: "$1.5 B",
    age: "49",
    country: "United States",
    source: "online retail",
    industry: "Technology "
  },
  {
    key: "1953",
    rank: "1929",
    name: "Eduardo Costantini ",
    netWorth: "$1.5 B",
    age: "75",
    country: "Argentina",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1954",
    rank: "1929",
    name: "Wenjun Dai ",
    netWorth: "$1.5 B",
    age: "53",
    country: "China",
    source: "food",
    industry: "Food & Beverage "
  },
  {
    key: "1955",
    rank: "1929",
    name: "Bharat Desai ",
    netWorth: "$1.5 B",
    age: "69",
    country: "United States",
    source: "IT consulting",
    industry: "Technology "
  },
  {
    key: "1956",
    rank: "1929",
    name: "Mohammed Dewji ",
    netWorth: "$1.5 B",
    age: "46",
    country: "Tanzania",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "1957",
    rank: "1929",
    name: "Mathias Doepfner ",
    netWorth: "$1.5 B",
    age: "59",
    country: "Germany",
    source: "media",
    industry: "Media & Entertainment "
  },
  {
    key: "1958",
    rank: "1929",
    name: "Domenico Dolce ",
    netWorth: "$1.5 B",
    age: "63",
    country: "Italy",
    source: "luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "1959",
    rank: "1929",
    name: "Marek Dospiva ",
    netWorth: "$1.5 B",
    age: "52",
    country: "Czechia",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1960",
    rank: "1929",
    name: "Fritz Draexlmaier ",
    netWorth: "$1.5 B",
    age: "64",
    country: "Germany",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "1961",
    rank: "1929",
    name: "Henrique Dubugras ",
    netWorth: "$1.5 B",
    age: "26",
    country: "Brazil",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "1962",
    rank: "1929",
    name: "Egon Durban ",
    netWorth: "$1.5 B",
    age: "48",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1963",
    rank: "1929",
    name: "Bulent Eczacibasi ",
    netWorth: "$1.5 B",
    age: "72",
    country: "Turkey",
    source: "pharmaceuticals, diversified",
    industry: "Diversified "
  },
  {
    key: "1964",
    rank: "1929",
    name: "Faruk Eczacibasi ",
    netWorth: "$1.5 B",
    age: "67",
    country: "Turkey",
    source: "pharmaceuticals, diversified",
    industry: "Diversified "
  },
  {
    key: "1965",
    rank: "1929",
    name: "Henry Engelhardt ",
    netWorth: "$1.5 B",
    age: "64",
    country: "United States",
    source: "insurance",
    industry: "Finance & Investments "
  },
  {
    key: "1966",
    rank: "1929",
    name: "Ali Erdemoglu ",
    netWorth: "$1.5 B",
    age: "62",
    country: "Turkey",
    source: "carpet",
    industry: "Manufacturing "
  },
  {
    key: "1967",
    rank: "1929",
    name: "Eduardo Eurnekian ",
    netWorth: "$1.5 B",
    age: "89",
    country: "Argentina",
    source: "airports, investments",
    industry: "Diversified "
  },
  {
    key: "1968",
    rank: "1929",
    name: "John Farber ",
    netWorth: "$1.5 B",
    age: "96",
    country: "United States",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "1969",
    rank: "1929",
    name: "Clement Fayat & family ",
    netWorth: "$1.5 B",
    age: "90",
    country: "France",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "1970",
    rank: "1929",
    name: "Daniel Feffer ",
    netWorth: "$1.5 B",
    age: "62",
    country: "Brazil",
    source: "pulp and paper",
    industry: "Manufacturing "
  },
  {
    key: "1971",
    rank: "1929",
    name: "David Feffer ",
    netWorth: "$1.5 B",
    age: "65",
    country: "Brazil",
    source: "pulp and paper",
    industry: "Manufacturing "
  },
  {
    key: "1972",
    rank: "1929",
    name: "Ruben Feffer ",
    netWorth: "$1.5 B",
    age: "52",
    country: "Brazil",
    source: "pulp and paper",
    industry: "Manufacturing "
  },
  {
    key: "1973",
    rank: "1929",
    name: "Feng Yuxia ",
    netWorth: "$1.5 B",
    age: "57",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1974",
    rank: "1929",
    name: "Sergio Fogel ",
    netWorth: "$1.5 B",
    age: "58",
    country: "Uruguay",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "1975",
    rank: "1929",
    name: "Pedro Franceschi ",
    netWorth: "$1.5 B",
    age: "25",
    country: "Brazil",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "1976",
    rank: "1929",
    name: "Stefano Gabbana ",
    netWorth: "$1.5 B",
    age: "59",
    country: "Italy",
    source: "luxury goods",
    industry: "Fashion & Retail "
  },
  {
    key: "1977",
    rank: "1929",
    name: "Yi Gao & family ",
    netWorth: "$1.5 B",
    age: "53",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1978",
    rank: "1929",
    name: "Geng Jianming ",
    netWorth: "$1.5 B",
    age: "59",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1979",
    rank: "1929",
    name: "Alan Gerry ",
    netWorth: "$1.5 B",
    age: "93",
    country: "United States",
    source: "cable television",
    industry: "Media & Entertainment "
  },
  {
    key: "1980",
    rank: "1929",
    name: "Balkrishan Goenka ",
    netWorth: "$1.5 B",
    age: "55",
    country: "India",
    source: "textiles",
    industry: "Manufacturing "
  },
  {
    key: "1981",
    rank: "1929",
    name: "Esther Grether ",
    netWorth: "$1.5 B",
    age: "86",
    country: "Switzerland",
    source: "art collection",
    industry: "Fashion & Retail "
  },
  {
    key: "1982",
    rank: "1929",
    name: "Gu Wei ",
    netWorth: "$1.5 B",
    age: "57",
    country: "China",
    source: "consumer electronics",
    industry: "Manufacturing "
  },
  {
    key: "1983",
    rank: "1929",
    name: "Torstein Hagen ",
    netWorth: "$1.5 B",
    age: "79",
    country: "Norway",
    source: "cruises",
    industry: "Service "
  },
  {
    key: "1984",
    rank: "1929",
    name: "Kenneth Hao ",
    netWorth: "$1.5 B",
    age: "53",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "1985",
    rank: "1929",
    name: "He Zhiping ",
    netWorth: "$1.5 B",
    age: "58",
    country: "China",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "1986",
    rank: "1929",
    name: "Timothy Headington ",
    netWorth: "$1.5 B",
    age: "71",
    country: "United States",
    source: "oil & gas, investments",
    industry: "Energy "
  },
  {
    key: "1987",
    rank: "1929",
    name: "Ilona Herlin ",
    netWorth: "$1.5 B",
    age: "57",
    country: "Finland",
    source: "elevators, escalators",
    industry: "Manufacturing "
  },
  {
    key: "1988",
    rank: "1929",
    name: "Niranjan Hiranandani ",
    netWorth: "$1.5 B",
    age: "72",
    country: "India",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1989",
    rank: "1929",
    name: "Drew Houston ",
    netWorth: "$1.5 B",
    age: "39",
    country: "United States",
    source: "cloud storage service",
    industry: "Technology "
  },
  {
    key: "1990",
    rank: "1929",
    name: "Huang Rulun ",
    netWorth: "$1.5 B",
    age: "70",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "1991",
    rank: "1929",
    name: "Matt Hulsizer ",
    netWorth: "$1.5 B",
    age: "64",
    country: "United States",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "1992",
    rank: "1929",
    name: "Justin Ishbia ",
    netWorth: "$1.5 B",
    age: "44",
    country: "United States",
    source: "private equity★",
    industry: "Finance & Investments "
  },
  {
    key: "1993",
    rank: "1929",
    name: "Peter Jackson ",
    netWorth: "$1.5 B",
    age: "60",
    country: "New Zealand",
    source: "movies, digital effects",
    industry: "Media & Entertainment "
  },
  {
    key: "1994",
    rank: "1929",
    name: "Jin Lei ",
    netWorth: "$1.5 B",
    age: "56",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "1995",
    rank: "1929",
    name: "Jin Xin ",
    netWorth: "$1.5 B",
    age: "55",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "1996",
    rank: "1929",
    name: "Conni Jonsson ",
    netWorth: "$1.5 B",
    age: "61",
    country: "Sweden",
    source: "asset management",
    industry: "Finance & Investments "
  },
  {
    key: "1997",
    rank: "1929",
    name: "Jenny Just ",
    netWorth: "$1.5 B",
    age: "54",
    country: "United States",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "1998",
    rank: "1929",
    name: "Ke Xiping & family ",
    netWorth: "$1.5 B",
    age: "61",
    country: "China",
    source: "investments",
    industry: "Diversified "
  },
  {
    key: "1999",
    rank: "1929",
    name: "Ke Zunhong & family ",
    netWorth: "$1.5 B",
    age: "67",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2000",
    rank: "1929",
    name: "Sidney Kimmel ",
    netWorth: "$1.5 B",
    age: "94",
    country: "United States",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "2001",
    rank: "1929",
    name: "Seth Klarman ",
    netWorth: "$1.5 B",
    age: "64",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2002",
    rank: "1929",
    name: "Mustafa Rahmi Koc ",
    netWorth: "$1.5 B",
    age: "91",
    country: "Turkey",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2003",
    rank: "1929",
    name: "Pyotr Kondrashev ",
    netWorth: "$1.5 B",
    age: "72",
    country: "Russia",
    source: "investments",
    industry: "Manufacturing "
  },
  {
    key: "2004",
    rank: "1929",
    name: "Kong Jian Min ",
    netWorth: "$1.5 B",
    age: "54",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2005",
    rank: "1929",
    name: "Hemendra Kothari ",
    netWorth: "$1.5 B",
    age: "75",
    country: "India",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "2006",
    rank: "1929",
    name: "Eduard Kucera ",
    netWorth: "$1.5 B",
    age: "69",
    country: "Czechia",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2007",
    rank: "1929",
    name: "Christopher Kwok ",
    netWorth: "$1.5 B",
    age: "36",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2008",
    rank: "1929",
    name: "Edward Kwok ",
    netWorth: "$1.5 B",
    age: "41",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2009",
    rank: "1929",
    name: "Joe Lacob ",
    netWorth: "$1.5 B",
    age: "66",
    country: "United States",
    source: "Golden State Warriors",
    industry: "Sports "
  },
  {
    key: "2010",
    rank: "1929",
    name: "Lai Jianfa ",
    netWorth: "$1.5 B",
    age: "52",
    country: "China",
    source: "express delivery",
    industry: "Logistics "
  },
  {
    key: "2011",
    rank: "1929",
    name: "Manuel Lao Hernández ",
    netWorth: "$1.5 B",
    age: "77",
    country: "Spain",
    source: "casinos",
    industry: "Gambling & Casinos "
  },
  {
    key: "2012",
    rank: "1929",
    name: "Lee Joon-ho ",
    netWorth: "$1.5 B",
    age: "57",
    country: "South Korea",
    source: "online games",
    industry: "Technology "
  },
  {
    key: "2013",
    rank: "1929",
    name: "Manfredi Lefebvre d'Ovidio & family ",
    netWorth: "$1.5 B",
    age: "68",
    country: "Italy",
    source: "cruises",
    industry: "Service "
  },
  {
    key: "2014",
    rank: "1929",
    name: "Li Jinyang ",
    netWorth: "$1.5 B",
    age: "64",
    country: "China",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "2015",
    rank: "1929",
    name: "Li Ming ",
    netWorth: "$1.5 B",
    age: "64",
    country: "China",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2016",
    rank: "1929",
    name: "Zhen Li & family ",
    netWorth: "$1.5 B",
    age: "58",
    country: "China",
    source: "lithium batteries",
    industry: "Manufacturing "
  },
  {
    key: "2017",
    rank: "1929",
    name: "Rongfu Lu ",
    netWorth: "$1.5 B",
    age: "51",
    country: "China",
    source: "telecommunication",
    industry: "Telecom "
  },
  {
    key: "2018",
    rank: "1929",
    name: "Rafique Malik ",
    netWorth: "$1.5 B",
    age: "71",
    country: "India",
    source: "footwear",
    industry: "Fashion & Retail "
  },
  {
    key: "2019",
    rank: "1929",
    name: "Youssef Mansour ",
    netWorth: "$1.5 B",
    age: "76",
    country: "Egypt",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2020",
    rank: "1929",
    name: "Mao Lixiang & family ",
    netWorth: "$1.5 B",
    age: "81",
    country: "China",
    source: "cooking appliances",
    industry: "Technology "
  },
  {
    key: "2021",
    rank: "1929",
    name: "David McMurtry ",
    netWorth: "$1.5 B",
    age: "81",
    country: "United Kingdom",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2022",
    rank: "1929",
    name: "Meng Qingshan & family ",
    netWorth: "$1.5 B",
    age: "73",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "2023",
    rank: "1929",
    name: "Alan Miller & family ",
    netWorth: "$1.5 B",
    age: "84",
    country: "United States",
    source: "healthcare services",
    industry: "Healthcare "
  },
  {
    key: "2024",
    rank: "1929",
    name: "Greg Mondre ",
    netWorth: "$1.5 B",
    age: "47",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "2025",
    rank: "1929",
    name: "Massimo Moratti ",
    netWorth: "$1.5 B",
    age: "76",
    country: "Italy",
    source: "oil refinery",
    industry: "Energy "
  },
  {
    key: "2026",
    rank: "1929",
    name: "Robert Mouawad ",
    netWorth: "$1.5 B",
    age: "77",
    country: "Lebanon",
    source: "fine jewelry",
    industry: "Service "
  },
  {
    key: "2027",
    rank: "1929",
    name: "Ezra Nahmad ",
    netWorth: "$1.5 B",
    age: "76",
    country: "Monaco",
    source: "art",
    industry: "Finance & Investments "
  },
  {
    key: "2028",
    rank: "1929",
    name: "Tadako Nakatani ",
    netWorth: "$1.5 B",
    age: "64",
    country: "Japan",
    source: "medical diagnostic equipment",
    industry: "Healthcare "
  },
  {
    key: "2029",
    rank: "1929",
    name: "Kentaro Ogawa ",
    netWorth: "$1.5 B",
    age: "73",
    country: "Japan",
    source: "restaurants",
    industry: "Food & Beverage "
  },
  {
    key: "2030",
    rank: "1929",
    name: "Jonathan Oringer ",
    netWorth: "$1.5 B",
    age: "47",
    country: "United States",
    source: "stock photos",
    industry: "Technology "
  },
  {
    key: "2031",
    rank: "1929",
    name: "Niti Osathanugrah ",
    netWorth: "$1.5 B",
    age: "48",
    country: "Thailand",
    source: "energy drinks,investments",
    industry: "Finance & Investments "
  },
  {
    key: "2032",
    rank: "1929",
    name: "Dragos Paval ",
    netWorth: "$1.5 B",
    age: "55",
    country: "Romania",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "2033",
    rank: "1929",
    name: "Zach Perret ",
    netWorth: "$1.5 B",
    age: "34",
    country: "United States",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "2034",
    rank: "1929",
    name: "Karl-Johan Persson ",
    netWorth: "$1.5 B",
    age: "47",
    country: "Sweden",
    source: "H&M",
    industry: "Fashion & Retail "
  },
  {
    key: "2035",
    rank: "1929",
    name: "Markus Persson ",
    netWorth: "$1.5 B",
    age: "42",
    country: "Sweden",
    source: "computer games",
    industry: "Media & Entertainment "
  },
  {
    key: "2036",
    rank: "1929",
    name: "Tom Persson ",
    netWorth: "$1.5 B",
    age: "37",
    country: "Sweden",
    source: "H&M",
    industry: "Fashion & Retail "
  },
  {
    key: "2037",
    rank: "1929",
    name: "Kevin Plank ",
    netWorth: "$1.5 B",
    age: "49",
    country: "United States",
    source: "Under Armour",
    industry: "Fashion & Retail "
  },
  {
    key: "2038",
    rank: "1929",
    name: "Andreas Pohl ",
    netWorth: "$1.5 B",
    age: "57",
    country: "Germany",
    source: "mutual funds",
    industry: "Finance & Investments "
  },
  {
    key: "2039",
    rank: "1929",
    name: "Reinfried Pohl, Jr. ",
    netWorth: "$1.5 B",
    age: "62",
    country: "Germany",
    source: "mutual funds",
    industry: "Finance & Investments "
  },
  {
    key: "2040",
    rank: "1929",
    name: "Michael Polsky ",
    netWorth: "$1.5 B",
    age: "73",
    country: "United States",
    source: "Electric power",
    industry: "Energy "
  },
  {
    key: "2041",
    rank: "1929",
    name: "Qin Long ",
    netWorth: "$1.5 B",
    age: "56",
    country: "China",
    source: "tire",
    industry: "Manufacturing "
  },
  {
    key: "2042",
    rank: "1929",
    name: "G. M. Rao ",
    netWorth: "$1.5 B",
    age: "71",
    country: "India",
    source: "infrastructure",
    industry: "Logistics "
  },
  {
    key: "2043",
    rank: "1929",
    name: "Mike Repole ",
    netWorth: "$1.5 B",
    age: "54",
    country: "United States",
    source: "sports drink",
    industry: "Food & Beverage "
  },
  {
    key: "2044",
    rank: "1929",
    name: "Fernando Roig ",
    netWorth: "$1.5 B",
    age: "74",
    country: "Spain",
    source: "supermarkets",
    industry: "Fashion & Retail "
  },
  {
    key: "2045",
    rank: "1929",
    name: "Christopher Rokos ",
    netWorth: "$1.5 B",
    age: "51",
    country: "United Kingdom",
    source: "hedge fund",
    industry: "Finance & Investments "
  },
  {
    key: "2046",
    rank: "1929",
    name: "Fayez Sarofim ",
    netWorth: "$1.5 B",
    age: "93",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "2047",
    rank: "1929",
    name: "Antonio Luiz Seabra ",
    netWorth: "$1.5 B",
    age: "79",
    country: "Brazil",
    source: "cosmetics",
    industry: "Fashion & Retail "
  },
  {
    key: "2048",
    rank: "1929",
    name: "Amnon Shashua ",
    netWorth: "$1.5 B",
    age: "61",
    country: "Israel",
    source: "automotive technology",
    industry: "Automotive "
  },
  {
    key: "2049",
    rank: "1929",
    name: "Yuri Shefler ",
    netWorth: "$1.5 B",
    age: "54",
    country: "Russia",
    source: "alcohol",
    industry: "Food & Beverage "
  },
  {
    key: "2050",
    rank: "1929",
    name: "Mikhail Shelkov ",
    netWorth: "$1.5 B",
    age: "53",
    country: "Russia",
    source: "titanium",
    industry: "Metals & Mining "
  },
  {
    key: "2051",
    rank: "1929",
    name: "Charlotte Soderstrom ",
    netWorth: "$1.5 B",
    age: "45",
    country: "Sweden",
    source: "H&M",
    industry: "Fashion & Retail "
  },
  {
    key: "2052",
    rank: "1929",
    name: "Edwin Soeryadjaya ",
    netWorth: "$1.5 B",
    age: "72",
    country: "Indonesia",
    source: "coal, investments",
    industry: "Energy "
  },
  {
    key: "2053",
    rank: "1929",
    name: "Thomas Steyer ",
    netWorth: "$1.5 B",
    age: "64",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "2054",
    rank: "1929",
    name: "Kevin Systrom ",
    netWorth: "$1.5 B",
    age: "38",
    country: "United States",
    source: "Instagram",
    industry: "Technology "
  },
  {
    key: "2055",
    rank: "1929",
    name: "Tang Binsen ",
    netWorth: "$1.5 B",
    age: "39",
    country: "China",
    source: "beverages",
    industry: "Food & Beverage "
  },
  {
    key: "2056",
    rank: "1929",
    name: "Hary Tanoesoedibjo ",
    netWorth: "$1.5 B",
    age: "56",
    country: "Indonesia",
    source: "media, real estate",
    industry: "Media & Entertainment "
  },
  {
    key: "2057",
    rank: "1929",
    name: "Jonathan Tisch ",
    netWorth: "$1.5 B",
    age: "68",
    country: "United States",
    source: "insurance, NFL team",
    industry: "Diversified "
  },
  {
    key: "2058",
    rank: "1929",
    name: "Wilma Tisch ",
    netWorth: "$1.5 B",
    age: "94",
    country: "United States",
    source: "diversified",
    industry: "Finance & Investments "
  },
  {
    key: "2059",
    rank: "1929",
    name: "Kenny Troutt ",
    netWorth: "$1.5 B",
    age: "74",
    country: "United States",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "2060",
    rank: "1929",
    name: "Thomas von Koch ",
    netWorth: "$1.5 B",
    age: "56",
    country: "Sweden",
    source: "asset management",
    industry: "Finance & Investments "
  },
  {
    key: "2061",
    rank: "1929",
    name: "Junjin Wang ",
    netWorth: "$1.5 B",
    age: "53",
    country: "China",
    source: "airline",
    industry: "Service "
  },
  {
    key: "2062",
    rank: "1929",
    name: "Wang Zelong ",
    netWorth: "$1.5 B",
    age: "25",
    country: "China",
    source: "chemicals",
    industry: "Metals & Mining "
  },
  {
    key: "2063",
    rank: "1929",
    name: "Myron Wentz ",
    netWorth: "$1.5 B",
    age: "82",
    country: "St. Kitts and Nevis",
    source: "health products",
    industry: "Fashion & Retail "
  },
  {
    key: "2064",
    rank: "1929",
    name: "Kaiting Wu ",
    netWorth: "$1.5 B",
    age: "52",
    country: "Hong Kong",
    source: "electronics",
    industry: "Telecom "
  },
  {
    key: "2065",
    rank: "1929",
    name: "Xiong Wu ",
    netWorth: "$1.5 B",
    age: "46",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2066",
    rank: "1929",
    name: "Xu Wanmao ",
    netWorth: "$1.5 B",
    age: "77",
    country: "China",
    source: "education",
    industry: "Service "
  },
  {
    key: "2067",
    rank: "1929",
    name: "Xu Zhenhua ",
    netWorth: "$1.5 B",
    age: "64",
    country: "China",
    source: "online games",
    industry: "Media & Entertainment "
  },
  {
    key: "2068",
    rank: "1929",
    name: "Xue Jiping ",
    netWorth: "$1.5 B",
    age: "71",
    country: "China",
    source: "cable",
    industry: "Telecom "
  },
  {
    key: "2069",
    rank: "1929",
    name: "Yang Jian ",
    netWorth: "$1.5 B",
    age: "50",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2070",
    rank: "1929",
    name: "Justin Yuan ",
    netWorth: "$1.5 B",
    age: "64",
    country: "China",
    source: "online games",
    industry: "Media & Entertainment "
  },
  {
    key: "2071",
    rank: "1929",
    name: "Xinghai Zhang & family ",
    netWorth: "$1.5 B",
    age: "59",
    country: "China",
    source: "machinery",
    industry: "Manufacturing "
  },
  {
    key: "2072",
    rank: "1929",
    name: "Xuansong Zhang ",
    netWorth: "$1.5 B",
    age: "50",
    country: "China",
    source: "supermarkets",
    industry: "Fashion & Retail "
  },
  {
    key: "2073",
    rank: "1929",
    name: "Zhang Yin ",
    netWorth: "$1.5 B",
    age: "65",
    country: "China",
    source: "paper manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2074",
    rank: "1929",
    name: "Chengjian Zhou ",
    netWorth: "$1.5 B",
    age: "56",
    country: "China",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "2075",
    rank: "2076",
    name: "Radhe Shyam Agarwal ",
    netWorth: "$1.4 B",
    age: "77",
    country: "India",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "2076",
    rank: "2076",
    name: "Syed Mokhtar AlBukhary ",
    netWorth: "$1.4 B",
    age: "70",
    country: "Malaysia",
    source: "engineering, automotive",
    industry: "Construction & Engineering "
  },
  {
    key: "2077",
    rank: "2076",
    name: "Nerio Alessandri ",
    netWorth: "$1.4 B",
    age: "60",
    country: "Italy",
    source: "gym equipment",
    industry: "Manufacturing "
  },
  {
    key: "2078",
    rank: "2076",
    name: "Patricia Angelini Rossi ",
    netWorth: "$1.4 B",
    age: "68",
    country: "Chile",
    source: "forestry, mining",
    industry: "Diversified "
  },
  {
    key: "2079",
    rank: "2076",
    name: "Tope Awotona ",
    netWorth: "$1.4 B",
    age: "40",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2080",
    rank: "2076",
    name: "Elena Baturina ",
    netWorth: "$1.4 B",
    age: "59",
    country: "Russia",
    source: "investments, real estate",
    industry: "Construction & Engineering "
  },
  {
    key: "2081",
    rank: "2076",
    name: "Sabrina Benetton ",
    netWorth: "$1.4 B",
    age: "48",
    country: "Italy",
    source: "fashion retail, investments",
    industry: "Fashion & Retail "
  },
  {
    key: "2082",
    rank: "2076",
    name: "Thomas Bruch ",
    netWorth: "$1.4 B",
    age: "71",
    country: "Germany",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "2083",
    rank: "2076",
    name: "Marina Budiman ",
    netWorth: "$1.4 B",
    age: "60",
    country: "Indonesia",
    source: "data centers",
    industry: "Technology "
  },
  {
    key: "2084",
    rank: "2076",
    name: "Stewart Butterfield ",
    netWorth: "$1.4 B",
    age: "49",
    country: "Canada",
    source: "messaging software",
    industry: "Technology "
  },
  {
    key: "2085",
    rank: "2076",
    name: "Richard Chang ",
    netWorth: "$1.4 B",
    age: "75",
    country: "Taiwan",
    source: "real estate, electronics",
    industry: "Real Estate "
  },
  {
    key: "2086",
    rank: "2076",
    name: "Chen Tianqiao ",
    netWorth: "$1.4 B",
    age: "48",
    country: "China",
    source: "online games",
    industry: "Technology "
  },
  {
    key: "2087",
    rank: "2076",
    name: "Chen Wenyuan & family ",
    netWorth: "$1.4 B",
    age: "54",
    country: "China",
    source: "testing equipment",
    industry: "Technology "
  },
  {
    key: "2088",
    rank: "2076",
    name: "Cheng Antares ",
    netWorth: "$1.4 B",
    age: "64",
    country: "Hong Kong",
    source: "liquor",
    industry: "Food & Beverage "
  },
  {
    key: "2089",
    rank: "2076",
    name: "Chin Jong Hwa ",
    netWorth: "$1.4 B",
    age: "63",
    country: "Taiwan",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "2090",
    rank: "2076",
    name: "Cho Jyh-jer ",
    netWorth: "$1.4 B",
    age: "64",
    country: "Taiwan",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "2091",
    rank: "2076",
    name: "Jim Crane ",
    netWorth: "$1.4 B",
    age: "68",
    country: "United States",
    source: "logistics, baseball",
    industry: "Sports "
  },
  {
    key: "2092",
    rank: "2076",
    name: "Thierry Cruanes ",
    netWorth: "$1.4 B",
    age: "54",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2093",
    rank: "2076",
    name: "Benoit Dageville ",
    netWorth: "$1.4 B",
    age: "55",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2094",
    rank: "2076",
    name: "Weili Dai ",
    netWorth: "$1.4 B",
    age: "60",
    country: "United States",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "2095",
    rank: "2076",
    name: "Darwin Deason ",
    netWorth: "$1.4 B",
    age: "81",
    country: "United States",
    source: "software",
    industry: "Service "
  },
  {
    key: "2096",
    rank: "2076",
    name: "Diego Della Valle ",
    netWorth: "$1.4 B",
    age: "68",
    country: "Italy",
    source: "shoes",
    industry: "Fashion & Retail "
  },
  {
    key: "2097",
    rank: "2076",
    name: "Deng Yingzhong ",
    netWorth: "$1.4 B",
    age: "71",
    country: "China",
    source: "paper",
    industry: "Manufacturing "
  },
  {
    key: "2098",
    rank: "2076",
    name: "Ding Shui Po ",
    netWorth: "$1.4 B",
    age: "51",
    country: "China",
    source: "sneakers, sportswear",
    industry: "Fashion & Retail "
  },
  {
    key: "2099",
    rank: "2076",
    name: "Mark Dixon ",
    netWorth: "$1.4 B",
    age: "62",
    country: "United Kingdom",
    source: "office real estate",
    industry: "Real Estate "
  },
  {
    key: "2100",
    rank: "2076",
    name: "Du Shuanghua ",
    netWorth: "$1.4 B",
    age: "57",
    country: "China",
    source: "steel",
    industry: "Manufacturing "
  },
  {
    key: "2101",
    rank: "2076",
    name: "Mukand Lal Dua ",
    netWorth: "$1.4 B",
    age: "73",
    country: "India",
    source: "footwear",
    industry: "Fashion & Retail "
  },
  {
    key: "2102",
    rank: "2076",
    name: "Ramesh Kumar Dua ",
    netWorth: "$1.4 B",
    age: "68",
    country: "India",
    source: "footwear",
    industry: "Fashion & Retail "
  },
  {
    key: "2103",
    rank: "2076",
    name: "Fan Minhua ",
    netWorth: "$1.4 B",
    age: "60",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2104",
    rank: "2076",
    name: "Hongbo Fang ",
    netWorth: "$1.4 B",
    age: "55",
    country: "China",
    source: "home appliances",
    industry: "Manufacturing "
  },
  {
    key: "2105",
    rank: "2076",
    name: "William Foley, II. ",
    netWorth: "$1.4 B",
    age: "77",
    country: "United States",
    source: "financial services★",
    industry: "Finance & Investments "
  },
  {
    key: "2106",
    rank: "2076",
    name: "Jayme Garfinkel & family ",
    netWorth: "$1.4 B",
    age: "76",
    country: "Brazil",
    source: "insurance",
    industry: "Finance & Investments "
  },
  {
    key: "2107",
    rank: "2076",
    name: "Radhe Shyam Goenka ",
    netWorth: "$1.4 B",
    age: "76",
    country: "India",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "2108",
    rank: "2076",
    name: "Maggie Hardy Knox ",
    netWorth: "$1.4 B",
    age: "56",
    country: "United States",
    source: "building materials",
    industry: "Service "
  },
  {
    key: "2109",
    rank: "2076",
    name: "Ayman Hariri ",
    netWorth: "$1.4 B",
    age: "43",
    country: "Lebanon",
    source: "construction, investments",
    industry: "Construction & Engineering "
  },
  {
    key: "2110",
    rank: "2076",
    name: "Christoph Henkel ",
    netWorth: "$1.4 B",
    age: "64",
    country: "Germany",
    source: "consumer goods",
    industry: "Fashion & Retail "
  },
  {
    key: "2111",
    rank: "2076",
    name: "Daniel Hirschfeld ",
    netWorth: "$1.4 B",
    age: "80",
    country: "United States",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "2112",
    rank: "2076",
    name: "William Hockey ",
    netWorth: "$1.4 B",
    age: "32",
    country: "United States",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "2113",
    rank: "2076",
    name: "Huang Guanlin ",
    netWorth: "$1.4 B",
    age: "57",
    country: "China",
    source: "textiles, apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "2114",
    rank: "2076",
    name: "Huang Xiaofen & family ",
    netWorth: "$1.4 B",
    age: "60",
    country: "China",
    source: "printed circuit boards",
    industry: "Technology "
  },
  {
    key: "2115",
    rank: "2076",
    name: "Jay-Z ",
    netWorth: "$1.4 B",
    age: "52",
    country: "United States",
    source: "Multiple",
    industry: "Media & Entertainment "
  },
  {
    key: "2116",
    rank: "2076",
    name: "Yintai Jiang & family ",
    netWorth: "$1.4 B",
    age: "71",
    country: "China",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "2117",
    rank: "2076",
    name: "Johan Johannson ",
    netWorth: "$1.4 B",
    age: "55",
    country: "Norway",
    source: "grocery stores",
    industry: "Fashion & Retail "
  },
  {
    key: "2118",
    rank: "2076",
    name: "Ramesh Juneja ",
    netWorth: "$1.4 B",
    age: "66",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2119",
    rank: "2076",
    name: "Scott Kapnick ",
    netWorth: "$1.4 B",
    age: "63",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "2120",
    rank: "2076",
    name: "Viktor Kharitonin ",
    netWorth: "$1.4 B",
    age: "49",
    country: "Russia",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2121",
    rank: "2076",
    name: "Kim Jun-ki ",
    netWorth: "$1.4 B",
    age: "77",
    country: "South Korea",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2122",
    rank: "2076",
    name: "Kim Sang-yeol ",
    netWorth: "$1.4 B",
    age: "61",
    country: "South Korea",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "2123",
    rank: "2076",
    name: "Christine Knauf ",
    netWorth: "$1.4 B",
    age: "64",
    country: "Germany",
    source: "building materials",
    industry: "Manufacturing "
  },
  {
    key: "2124",
    rank: "2076",
    name: "Karl Knauf ",
    netWorth: "$1.4 B",
    age: "64",
    country: "Germany",
    source: "building materials",
    industry: "Manufacturing "
  },
  {
    key: "2125",
    rank: "2076",
    name: "Yogesh Kothari ",
    netWorth: "$1.4 B",
    age: "73",
    country: "India",
    source: "specialty chemicals",
    industry: "Manufacturing "
  },
  {
    key: "2126",
    rank: "2076",
    name: "Kurt Krieger ",
    netWorth: "$1.4 B",
    age: "74",
    country: "Germany",
    source: "furniture retailing",
    industry: "Fashion & Retail "
  },
  {
    key: "2127",
    rank: "2076",
    name: "Mustafa Kucuk ",
    netWorth: "$1.4 B",
    age: "58",
    country: "Turkey",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "2128",
    rank: "2076",
    name: "Sebastian Kulczyk ",
    netWorth: "$1.4 B",
    age: "41",
    country: "Poland",
    source: "diversified",
    industry: "Finance & Investments "
  },
  {
    key: "2129",
    rank: "2076",
    name: "Gary Lauder ",
    netWorth: "$1.4 B",
    age: "59",
    country: "United States",
    source: "Estée Lauder",
    industry: "Fashion & Retail "
  },
  {
    key: "2130",
    rank: "2076",
    name: "Art Levinson ",
    netWorth: "$1.4 B",
    age: "72",
    country: "United States",
    source: "Genentech, Apple",
    industry: "Diversified "
  },
  {
    key: "2131",
    rank: "2076",
    name: "Li Li ",
    netWorth: "$1.4 B",
    age: "58",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2132",
    rank: "2076",
    name: "Guangwei Liang ",
    netWorth: "$1.4 B",
    age: "58",
    country: "China",
    source: "conglomerate",
    industry: "Manufacturing "
  },
  {
    key: "2133",
    rank: "2076",
    name: "Scott Lin ",
    netWorth: "$1.4 B",
    age: "89",
    country: "Taiwan",
    source: "optical components",
    industry: "Technology "
  },
  {
    key: "2134",
    rank: "2076",
    name: "Jenny Lindén Urnes ",
    netWorth: "$1.4 B",
    age: "51",
    country: "Sweden",
    source: "powdered metal",
    industry: "Manufacturing "
  },
  {
    key: "2135",
    rank: "2076",
    name: "Anatoly Lomakin ",
    netWorth: "$1.4 B",
    age: "69",
    country: "Russia",
    source: "investments",
    industry: "Metals & Mining "
  },
  {
    key: "2136",
    rank: "2076",
    name: "Jeffrey Lorberbaum ",
    netWorth: "$1.4 B",
    age: "67",
    country: "United States",
    source: "flooring",
    industry: "Manufacturing "
  },
  {
    key: "2137",
    rank: "2076",
    name: "Gary Magness ",
    netWorth: "$1.4 B",
    age: "68",
    country: "United States",
    source: "cable TV, investments",
    industry: "Media & Entertainment "
  },
  {
    key: "2138",
    rank: "2076",
    name: "Zhongwu Mao ",
    netWorth: "$1.4 B",
    age: "59",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2139",
    rank: "2076",
    name: "Ilson Mateus & family ",
    netWorth: "$1.4 B",
    age: "59",
    country: "Brazil",
    source: "supermarkets",
    industry: "Fashion & Retail "
  },
  {
    key: "2140",
    rank: "2076",
    name: "Vadim Moshkovich ",
    netWorth: "$1.4 B",
    age: "54",
    country: "Russia",
    source: "agriculture, land",
    industry: "Food & Beverage "
  },
  {
    key: "2141",
    rank: "2076",
    name: "Jerry Moyes & family ",
    netWorth: "$1.4 B",
    age: "78",
    country: "United States",
    source: "transportation",
    industry: "Logistics "
  },
  {
    key: "2142",
    rank: "2076",
    name: "George Alexander Muthoot ",
    netWorth: "$1.4 B",
    age: "66",
    country: "India",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "2143",
    rank: "2076",
    name: "George Jacob Muthoot ",
    netWorth: "$1.4 B",
    age: "69",
    country: "India",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "2144",
    rank: "2076",
    name: "George Thomas Muthoot ",
    netWorth: "$1.4 B",
    age: "71",
    country: "India",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "2145",
    rank: "2076",
    name: "Sara George Muthoot ",
    netWorth: "$1.4 B",
    age: "61",
    country: "India",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "2146",
    rank: "2076",
    name: "Marius Nacht ",
    netWorth: "$1.4 B",
    age: "56",
    country: "Israel",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2147",
    rank: "2076",
    name: "Adam Neumann ",
    netWorth: "$1.4 B",
    age: "43",
    country: "Israel",
    source: "WeWork",
    industry: "Real Estate "
  },
  {
    key: "2148",
    rank: "2076",
    name: "Simon Nixon ",
    netWorth: "$1.4 B",
    age: "54",
    country: "United Kingdom",
    source: "price comparison website",
    industry: "Technology "
  },
  {
    key: "2149",
    rank: "2076",
    name: "Stefan Olsson ",
    netWorth: "$1.4 B",
    age: "73",
    country: "Sweden",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2150",
    rank: "2076",
    name: "Ranjan Pai ",
    netWorth: "$1.4 B",
    age: "49",
    country: "India",
    source: "education",
    industry: "Service "
  },
  {
    key: "2151",
    rank: "2076",
    name: "Antonio Percassi ",
    netWorth: "$1.4 B",
    age: "68",
    country: "Italy",
    source: "real estate, diversified",
    industry: "Diversified "
  },
  {
    key: "2152",
    rank: "2076",
    name: "Mark Pincus ",
    netWorth: "$1.4 B",
    age: "56",
    country: "United States",
    source: "online games",
    industry: "Technology "
  },
  {
    key: "2153",
    rank: "2076",
    name: "Alexey Repik ",
    netWorth: "$1.4 B",
    age: "42",
    country: "Russia",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2154",
    rank: "2076",
    name: "Matthew Roszak ",
    netWorth: "$1.4 B",
    age: "49",
    country: "United States",
    source: "cryptocurrency",
    industry: "Finance & Investments "
  },
  {
    key: "2155",
    rank: "2076",
    name: "Subhash Runwal ",
    netWorth: "$1.4 B",
    age: "78",
    country: "India",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2156",
    rank: "2076",
    name: "Carlos Sanchez ",
    netWorth: "$1.4 B",
    age: "60",
    country: "Brazil",
    source: "generic drugs",
    industry: "Healthcare "
  },
  {
    key: "2157",
    rank: "2076",
    name: "Martin Selig ",
    netWorth: "$1.4 B",
    age: "84",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2158",
    rank: "2076",
    name: "Bhadresh Shah ",
    netWorth: "$1.4 B",
    age: "70",
    country: "India",
    source: "engineering",
    industry: "Manufacturing "
  },
  {
    key: "2159",
    rank: "2076",
    name: "Shao Jianxiong ",
    netWorth: "$1.4 B",
    age: "64",
    country: "China",
    source: "photovoltaics",
    industry: "Energy "
  },
  {
    key: "2160",
    rank: "2076",
    name: "Shu Ping ",
    netWorth: "$1.4 B",
    age: "52",
    country: "Singapore",
    source: "restaurants",
    industry: "Food & Beverage "
  },
  {
    key: "2161",
    rank: "2076",
    name: "Ben Silbermann ",
    netWorth: "$1.4 B",
    age: "39",
    country: "United States",
    source: "social media",
    industry: "Media & Entertainment "
  },
  {
    key: "2162",
    rank: "2076",
    name: "Jared Smith ",
    netWorth: "$1.4 B",
    age: "47",
    country: "United States",
    source: "cloud computing",
    industry: "Technology "
  },
  {
    key: "2163",
    rank: "2076",
    name: "Sun Qinghuan ",
    netWorth: "$1.4 B",
    age: "48",
    country: "China",
    source: "lighting",
    industry: "Technology "
  },
  {
    key: "2164",
    rank: "2076",
    name: "Denis Sverdlov ",
    netWorth: "$1.4 B",
    age: "43",
    country: "Russia",
    source: "electric vehicles",
    industry: "Automotive "
  },
  {
    key: "2165",
    rank: "2076",
    name: "Prachak Tangkaravakoon ",
    netWorth: "$1.4 B",
    age: "78",
    country: "Thailand",
    source: "paints",
    industry: "Manufacturing "
  },
  {
    key: "2166",
    rank: "2076",
    name: "Lina Tombolato ",
    netWorth: "$1.4 B",
    age: "74",
    country: "Italy",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "2167",
    rank: "2076",
    name: "Tong Jinquan ",
    netWorth: "$1.4 B",
    age: "67",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2168",
    rank: "2076",
    name: "Luiza Helena Trajano ",
    netWorth: "$1.4 B",
    age: "70",
    country: "Brazil",
    source: "retail chain",
    industry: "Fashion & Retail "
  },
  {
    key: "2169",
    rank: "2076",
    name: "John Van Lieshout ",
    netWorth: "$1.4 B",
    age: "76",
    country: "Australia",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2170",
    rank: "2076",
    name: "Vardis Vardinoyannis & family ",
    netWorth: "$1.4 B",
    age: "89",
    country: "Greece",
    source: "oil and gas",
    industry: "Energy "
  },
  {
    key: "2171",
    rank: "2076",
    name: "Jens von Bahr ",
    netWorth: "$1.4 B",
    age: "51",
    country: "Sweden",
    source: "gambling products",
    industry: "Gambling & Casinos "
  },
  {
    key: "2172",
    rank: "2076",
    name: "Wang Fuji ",
    netWorth: "$1.4 B",
    age: "64",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2173",
    rank: "2076",
    name: "Wang Jian ",
    netWorth: "$1.4 B",
    age: "68",
    country: "China",
    source: "healthcare services",
    industry: "Technology "
  },
  {
    key: "2174",
    rank: "2076",
    name: "Werner O. Weber ",
    netWorth: "$1.4 B",
    age: "83",
    country: "Switzerland",
    source: "electronic components",
    industry: "Manufacturing "
  },
  {
    key: "2175",
    rank: "2076",
    name: "Wei Lidong & family ",
    netWorth: "$1.4 B",
    age: "46",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2176",
    rank: "2076",
    name: "Drorit Wertheim ",
    netWorth: "$1.4 B",
    age: "66",
    country: "Israel",
    source: "Coca Cola Israel",
    industry: "Food & Beverage "
  },
  {
    key: "2177",
    rank: "2076",
    name: "Bo Wu ",
    netWorth: "$1.4 B",
    age: "67",
    country: "China",
    source: "machinery",
    industry: "Manufacturing "
  },
  {
    key: "2178",
    rank: "2076",
    name: "Eugene Wu ",
    netWorth: "$1.4 B",
    age: "76",
    country: "Taiwan",
    source: "finance",
    industry: "Finance & Investments "
  },
  {
    key: "2179",
    rank: "2076",
    name: "Wu Xushun & family ",
    netWorth: "$1.4 B",
    age: "73",
    country: "China",
    source: "internet",
    industry: "Diversified "
  },
  {
    key: "2180",
    rank: "2076",
    name: "Wenbo Xiang ",
    netWorth: "$1.4 B",
    age: "59",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2181",
    rank: "2076",
    name: "Swift Xie ",
    netWorth: "$1.4 B",
    age: "42",
    country: "China",
    source: "drones",
    industry: "Technology "
  },
  {
    key: "2182",
    rank: "2076",
    name: "Xu Bingzhong ",
    netWorth: "$1.4 B",
    age: "48",
    country: "China",
    source: "bars",
    industry: "Food & Beverage "
  },
  {
    key: "2183",
    rank: "2076",
    name: "Xu Shaochun ",
    netWorth: "$1.4 B",
    age: "59",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2184",
    rank: "2076",
    name: "Yan Junxu ",
    netWorth: "$1.4 B",
    age: "52",
    country: "China",
    source: "Manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2185",
    rank: "2076",
    name: "George Yancopoulos ",
    netWorth: "$1.4 B",
    age: "62",
    country: "United States",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2186",
    rank: "2076",
    name: "Gavril Yushvaev ",
    netWorth: "$1.4 B",
    age: "64",
    country: "Russia",
    source: "precious metals, real estate",
    industry: "Finance & Investments "
  },
  {
    key: "2187",
    rank: "2076",
    name: "Zhuo Jun ",
    netWorth: "$1.4 B",
    age: "56",
    country: "Hong Kong",
    source: "printed circuit boards",
    industry: "Manufacturing "
  },
  {
    key: "2188",
    rank: "2076",
    name: "Fredrik Österberg ",
    netWorth: "$1.4 B",
    age: "51",
    country: "Sweden",
    source: "gambling products",
    industry: "Gambling & Casinos "
  },
  {
    key: "2189",
    rank: "2190",
    name: "Alberto Alcocer ",
    netWorth: "$1.3 B",
    age: "79",
    country: "Spain",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2190",
    rank: "2190",
    name: "Alexandra Andresen ",
    netWorth: "$1.3 B",
    age: "25",
    country: "Norway",
    source: "investments",
    industry: "Diversified "
  },
  {
    key: "2191",
    rank: "2190",
    name: "Katharina Andresen ",
    netWorth: "$1.3 B",
    age: "26",
    country: "Norway",
    source: "investments",
    industry: "Diversified "
  },
  {
    key: "2192",
    rank: "2190",
    name: "Rutger Arnhult ",
    netWorth: "$1.3 B",
    age: "54",
    country: "Sweden",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2193",
    rank: "2190",
    name: "Anant Asavabhokin ",
    netWorth: "$1.3 B",
    age: "71",
    country: "Thailand",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2194",
    rank: "2190",
    name: "Mehmet Aydinlar ",
    netWorth: "$1.3 B",
    age: "65",
    country: "Turkey",
    source: "hospitals",
    industry: "Healthcare "
  },
  {
    key: "2195",
    rank: "2190",
    name: "Binny Bansal ",
    netWorth: "$1.3 B",
    age: "39",
    country: "India",
    source: "flipkart",
    industry: "Technology "
  },
  {
    key: "2196",
    rank: "2190",
    name: "Sachin Bansal ",
    netWorth: "$1.3 B",
    age: "40",
    country: "India",
    source: "flipkart",
    industry: "Fashion & Retail "
  },
  {
    key: "2197",
    rank: "2190",
    name: "Barbara Benetton ",
    netWorth: "$1.3 B",
    age: "52",
    country: "Italy",
    source: "fashion retail, investments",
    industry: "Fashion & Retail "
  },
  {
    key: "2198",
    rank: "2190",
    name: "Othman Benjelloun & family ",
    netWorth: "$1.3 B",
    age: "89",
    country: "Morocco",
    source: "banking, insurance",
    industry: "Finance & Investments "
  },
  {
    key: "2199",
    rank: "2190",
    name: "Angela Bennett ",
    netWorth: "$1.3 B",
    age: "78",
    country: "Australia",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "2200",
    rank: "2190",
    name: "Oleg Boyko ",
    netWorth: "$1.3 B",
    age: "57",
    country: "Russia",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2201",
    rank: "2190",
    name: "Anna Maria Braun ",
    netWorth: "$1.3 B",
    age: "43",
    country: "Germany",
    source: "medical technology",
    industry: "Healthcare "
  },
  {
    key: "2202",
    rank: "2190",
    name: "Edouard Carmignac ",
    netWorth: "$1.3 B",
    age: "74",
    country: "France",
    source: "asset management",
    industry: "Finance & Investments "
  },
  {
    key: "2203",
    rank: "2190",
    name: "Anthony Casalena ",
    netWorth: "$1.3 B",
    age: "39",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2204",
    rank: "2190",
    name: "Chang Jing ",
    netWorth: "$1.3 B",
    age: "39",
    country: "China",
    source: "technology",
    industry: "Technology "
  },
  {
    key: "2205",
    rank: "2190",
    name: "Jeffrey Cheah ",
    netWorth: "$1.3 B",
    age: "77",
    country: "Malaysia",
    source: "property, healthcare",
    industry: "Real Estate "
  },
  {
    key: "2206",
    rank: "2190",
    name: "Chen Shiliang ",
    netWorth: "$1.3 B",
    age: "58",
    country: "China",
    source: "polyester",
    industry: "Manufacturing "
  },
  {
    key: "2207",
    rank: "2190",
    name: "Yuantai Chen ",
    netWorth: "$1.3 B",
    age: "54",
    country: "China",
    source: "batteries",
    industry: "Energy "
  },
  {
    key: "2208",
    rank: "2190",
    name: "Cheng Xianfeng ",
    netWorth: "$1.3 B",
    age: "53",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2209",
    rank: "2190",
    name: "Chu Jian ",
    netWorth: "$1.3 B",
    age: "59",
    country: "China",
    source: "Manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2210",
    rank: "2190",
    name: "Chua Thian Poh ",
    netWorth: "$1.3 B",
    age: "73",
    country: "Singapore",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2211",
    rank: "2190",
    name: "Alberto Cortina ",
    netWorth: "$1.3 B",
    age: "76",
    country: "Spain",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2212",
    rank: "2190",
    name: "Sandor Csanyi ",
    netWorth: "$1.3 B",
    age: "69",
    country: "Hungary",
    source: "finance, real estate",
    industry: "Diversified "
  },
  {
    key: "2213",
    rank: "2190",
    name: "Sasson Dayan & family ",
    netWorth: "$1.3 B",
    age: "82",
    country: "Brazil",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "2214",
    rank: "2190",
    name: "Anand Deshpande ",
    netWorth: "$1.3 B",
    age: "59",
    country: "India",
    source: "technology",
    industry: "Technology "
  },
  {
    key: "2215",
    rank: "2190",
    name: "Richard Desmond ",
    netWorth: "$1.3 B",
    age: "70",
    country: "United Kingdom",
    source: "publishing",
    industry: "Media & Entertainment "
  },
  {
    key: "2216",
    rank: "2190",
    name: "Shlomo Eliahu ",
    netWorth: "$1.3 B",
    age: "86",
    country: "Israel",
    source: "insurance",
    industry: "Finance & Investments "
  },
  {
    key: "2217",
    rank: "2190",
    name: "Jose Roberto Ermirio de Moraes ",
    netWorth: "$1.3 B",
    age: "64",
    country: "Brazil",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2218",
    rank: "2190",
    name: "Jose Ermirio de Moraes Neto ",
    netWorth: "$1.3 B",
    age: "69",
    country: "Brazil",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2219",
    rank: "2190",
    name: "David Fattal & family ",
    netWorth: "$1.3 B",
    age: "64",
    country: "Israel",
    source: "hotels",
    industry: "Service "
  },
  {
    key: "2220",
    rank: "2190",
    name: "Marvy Finger ",
    netWorth: "$1.3 B",
    age: "86",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2221",
    rank: "2190",
    name: "Adam Foroughi ",
    netWorth: "$1.3 B",
    age: "41",
    country: "United States",
    source: "mobile games",
    industry: "Media & Entertainment "
  },
  {
    key: "2222",
    rank: "2190",
    name: "Richard Fortin ",
    netWorth: "$1.3 B",
    age: "73",
    country: "Canada",
    source: "convinience stores",
    industry: "Fashion & Retail "
  },
  {
    key: "2223",
    rank: "2190",
    name: "Luiz Frias ",
    netWorth: "$1.3 B",
    age: "58",
    country: "Brazil",
    source: "mobile payments",
    industry: "Technology "
  },
  {
    key: "2224",
    rank: "2190",
    name: "Susumu Fujita ",
    netWorth: "$1.3 B",
    age: "48",
    country: "Japan",
    source: "internet media",
    industry: "Media & Entertainment "
  },
  {
    key: "2225",
    rank: "2190",
    name: "Simona Giorgetta ",
    netWorth: "$1.3 B",
    age: "44",
    country: "Italy",
    source: "chemical products",
    industry: "Construction & Engineering "
  },
  {
    key: "2226",
    rank: "2190",
    name: "Premchand Godha ",
    netWorth: "$1.3 B",
    age: "75",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2227",
    rank: "2190",
    name: "Mikhail Gutseriev & brother ",
    netWorth: "$1.3 B",
    age: "64",
    country: "Russia",
    source: "oil, real estate",
    industry: "Energy "
  },
  {
    key: "2228",
    rank: "2190",
    name: "Hang Hong ",
    netWorth: "$1.3 B",
    age: "54",
    country: "China",
    source: "machinery",
    industry: "Manufacturing "
  },
  {
    key: "2229",
    rank: "2190",
    name: "Alfredo Harp Helu & family ",
    netWorth: "$1.3 B",
    age: "78",
    country: "Mexico",
    source: "banking, investments",
    industry: "Finance & Investments "
  },
  {
    key: "2230",
    rank: "2190",
    name: "Jaroslav Hascak & family ",
    netWorth: "$1.3 B",
    age: "52",
    country: "Slovakia",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2231",
    rank: "2190",
    name: "He Zuxun ",
    netWorth: "$1.3 B",
    age: "56",
    country: "China",
    source: "pig breeding",
    industry: "Food & Beverage "
  },
  {
    key: "2232",
    rank: "2190",
    name: "David Hoffmann ",
    netWorth: "$1.3 B",
    age: "69",
    country: "United States",
    source: "executive search, investments",
    industry: "Diversified "
  },
  {
    key: "2233",
    rank: "2190",
    name: "Francis Holder ",
    netWorth: "$1.3 B",
    age: "81",
    country: "France",
    source: "bakeries",
    industry: "Food & Beverage "
  },
  {
    key: "2234",
    rank: "2190",
    name: "Hu Rongda & family ",
    netWorth: "$1.3 B",
    age: "63",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "2235",
    rank: "2190",
    name: "Wei Huang ",
    netWorth: "$1.3 B",
    age: "62",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2236",
    rank: "2190",
    name: "Zarakh Iliev ",
    netWorth: "$1.3 B",
    age: "55",
    country: "Russia",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2237",
    rank: "2190",
    name: "Mitchell Jacobson ",
    netWorth: "$1.3 B",
    age: "71",
    country: "United States",
    source: "industrial equipment",
    industry: "Service "
  },
  {
    key: "2238",
    rank: "2190",
    name: "Jiang Guiting & family ",
    netWorth: "$1.3 B",
    age: "63",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2239",
    rank: "2190",
    name: "Rajeev Juneja ",
    netWorth: "$1.3 B",
    age: "56",
    country: "India",
    source: "phamaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2240",
    rank: "2190",
    name: "Peter Kelly ",
    netWorth: "$1.3 B",
    age: "64",
    country: "United Kingdom",
    source: "I.T.",
    industry: "Technology "
  },
  {
    key: "2241",
    rank: "2190",
    name: "Kim Nam-jung ",
    netWorth: "$1.3 B",
    age: "49",
    country: "South Korea",
    source: "food",
    industry: "Food & Beverage "
  },
  {
    key: "2242",
    rank: "2190",
    name: "Koon Poh Ming ",
    netWorth: "$1.3 B",
    age: "65",
    country: "Malaysia",
    source: "aluminum",
    industry: "Metals & Mining "
  },
  {
    key: "2243",
    rank: "2190",
    name: "Yuri Kovalchuk ",
    netWorth: "$1.3 B",
    age: "70",
    country: "Russia",
    source: "banking, insurance, media",
    industry: "Finance & Investments "
  },
  {
    key: "2244",
    rank: "2190",
    name: "Michael Krasny ",
    netWorth: "$1.3 B",
    age: "68",
    country: "United States",
    source: "retail",
    industry: "Technology "
  },
  {
    key: "2245",
    rank: "2190",
    name: "Raymond Kwok ",
    netWorth: "$1.3 B",
    age: "68",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2246",
    rank: "2190",
    name: "Heikki Kyostila ",
    netWorth: "$1.3 B",
    age: "76",
    country: "Finland",
    source: "dental products",
    industry: "Healthcare "
  },
  {
    key: "2247",
    rank: "2190",
    name: "Lee Ho-jin ",
    netWorth: "$1.3 B",
    age: "59",
    country: "South Korea",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2248",
    rank: "2190",
    name: "Bernard Lewis & family ",
    netWorth: "$1.3 B",
    age: "96",
    country: "United Kingdom",
    source: "fashion retailer",
    industry: "Fashion & Retail "
  },
  {
    key: "2249",
    rank: "2190",
    name: "Fengluan Li ",
    netWorth: "$1.3 B",
    age: "60",
    country: "China",
    source: "steel, diversified",
    industry: "Diversified "
  },
  {
    key: "2250",
    rank: "2190",
    name: "Hua Li ",
    netWorth: "$1.3 B",
    age: "44",
    country: "China",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "2251",
    rank: "2190",
    name: "Li Ruiqiang ",
    netWorth: "$1.3 B",
    age: "42",
    country: "China",
    source: "medical services",
    industry: "Healthcare "
  },
  {
    key: "2252",
    rank: "2190",
    name: "Lin Zhijun ",
    netWorth: "$1.3 B",
    age: "46",
    country: "China",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "2253",
    rank: "2190",
    name: "Lin Zhixiong & family ",
    netWorth: "$1.3 B",
    age: "48",
    country: "China",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "2254",
    rank: "2190",
    name: "Liu Ming Hui ",
    netWorth: "$1.3 B",
    age: "59",
    country: "China",
    source: "natural gas distribution",
    industry: "Energy "
  },
  {
    key: "2255",
    rank: "2190",
    name: "Xuejing Liu & family ",
    netWorth: "$1.3 B",
    age: "71",
    country: "China",
    source: "copper, poultry",
    industry: "Diversified "
  },
  {
    key: "2256",
    rank: "2190",
    name: "Lu Yonghua & family ",
    netWorth: "$1.3 B",
    age: "58",
    country: "China",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "2257",
    rank: "2190",
    name: "Zhaoxi Lu ",
    netWorth: "$1.3 B",
    age: "53",
    country: "China",
    source: "e-commerce",
    industry: "Technology "
  },
  {
    key: "2258",
    rank: "2190",
    name: "Frederic Luddy ",
    netWorth: "$1.3 B",
    age: "67",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2259",
    rank: "2190",
    name: "Miao Yongjun ",
    netWorth: "$1.3 B",
    age: "54",
    country: "China",
    source: "clinical diagnostics",
    industry: "Healthcare "
  },
  {
    key: "2260",
    rank: "2190",
    name: "Martin Moller Nielsen ",
    netWorth: "$1.3 B",
    age: "57",
    country: "Denmark",
    source: "aircraft leasing",
    industry: "Logistics "
  },
  {
    key: "2261",
    rank: "2190",
    name: "Neide Helena de Moraes ",
    netWorth: "$1.3 B",
    age: "67",
    country: "Brazil",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2262",
    rank: "2190",
    name: "Yoshiko Mori ",
    netWorth: "$1.3 B",
    age: "81",
    country: "Japan",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2263",
    rank: "2190",
    name: "Mofatraj Munot ",
    netWorth: "$1.3 B",
    age: "77",
    country: "India",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2264",
    rank: "2190",
    name: "Randal Nardone ",
    netWorth: "$1.3 B",
    age: "66",
    country: "United States",
    source: "investments, energy",
    industry: "Finance & Investments "
  },
  {
    key: "2265",
    rank: "2190",
    name: "God Nisanov ",
    netWorth: "$1.3 B",
    age: "49",
    country: "Russia",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2266",
    rank: "2190",
    name: "Vadim Novinsky ",
    netWorth: "$1.3 B",
    age: "58",
    country: "Ukraine",
    source: "steel",
    industry: "Metals & Mining "
  },
  {
    key: "2267",
    rank: "2190",
    name: "Satyanarayan Nuwal ",
    netWorth: "$1.3 B",
    age: "69",
    country: "India",
    source: "industrial explosives",
    industry: "Manufacturing "
  },
  {
    key: "2268",
    rank: "2190",
    name: "John Ocampo ",
    netWorth: "$1.3 B",
    age: "63",
    country: "United States",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "2269",
    rank: "2190",
    name: "Pan Gang ",
    netWorth: "$1.3 B",
    age: "51",
    country: "China",
    source: "dairy",
    industry: "Food & Beverage "
  },
  {
    key: "2270",
    rank: "2190",
    name: "Forrest Preston ",
    netWorth: "$1.3 B",
    age: "89",
    country: "United States",
    source: "health care",
    industry: "Healthcare "
  },
  {
    key: "2271",
    rank: "2190",
    name: "Riju Raveendran ",
    netWorth: "$1.3 B",
    age: "39",
    country: "India",
    source: "edtech",
    industry: "Technology "
  },
  {
    key: "2272",
    rank: "2190",
    name: "P.P. Reddy ",
    netWorth: "$1.3 B",
    age: "64",
    country: "India",
    source: "infrastructure",
    industry: "Construction & Engineering "
  },
  {
    key: "2273",
    rank: "2190",
    name: "P.V.Krishna Reddy ",
    netWorth: "$1.3 B",
    age: "52",
    country: "India",
    source: "infrastructure",
    industry: "Construction & Engineering "
  },
  {
    key: "2274",
    rank: "2190",
    name: "Satish Reddy ",
    netWorth: "$1.3 B",
    age: "54",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2275",
    rank: "2190",
    name: "Lily Safra ",
    netWorth: "$1.3 B",
    age: "84",
    country: "Monaco",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "2276",
    rank: "2190",
    name: "Richard Saghian ",
    netWorth: "$1.3 B",
    age: "40",
    country: "United States",
    source: "fast fashion",
    industry: "Fashion & Retail "
  },
  {
    key: "2277",
    rank: "2190",
    name: "Deniz Sahenk ",
    netWorth: "$1.3 B",
    age: "76",
    country: "Turkey",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2278",
    rank: "2190",
    name: "Thomas Sandell ",
    netWorth: "$1.3 B",
    age: "61",
    country: "Sweden",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "2279",
    rank: "2190",
    name: "Hajime Satomi ",
    netWorth: "$1.3 B",
    age: "80",
    country: "Japan",
    source: "video games, pachinko",
    industry: "Gambling & Casinos "
  },
  {
    key: "2280",
    rank: "2190",
    name: "James Scapa ",
    netWorth: "$1.3 B",
    age: "65",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2281",
    rank: "2190",
    name: "Paul Sciarra ",
    netWorth: "$1.3 B",
    age: "41",
    country: "United States",
    source: "Pinterest",
    industry: "Media & Entertainment "
  },
  {
    key: "2282",
    rank: "2190",
    name: "Albert Shigaboutdinov ",
    netWorth: "$1.3 B",
    age: "69",
    country: "Russia",
    source: "refinery, chemicals",
    industry: "Diversified "
  },
  {
    key: "2283",
    rank: "2190",
    name: "Nobutoshi Shimamura ",
    netWorth: "$1.3 B",
    age: "96",
    country: "Japan",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "2284",
    rank: "2190",
    name: "Ron Sim ",
    netWorth: "$1.3 B",
    age: "63",
    country: "Singapore",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "2285",
    rank: "2190",
    name: "Alexander Sixt ",
    netWorth: "$1.3 B",
    age: "42",
    country: "Germany",
    source: "car rentals",
    industry: "Automotive "
  },
  {
    key: "2286",
    rank: "2190",
    name: "Konstantin Sixt ",
    netWorth: "$1.3 B",
    age: "39",
    country: "Germany",
    source: "car rentals",
    industry: "Automotive "
  },
  {
    key: "2287",
    rank: "2190",
    name: "Terry Snow ",
    netWorth: "$1.3 B",
    age: "78",
    country: "Australia",
    source: "airports, real estate",
    industry: "Real Estate "
  },
  {
    key: "2288",
    rank: "2190",
    name: "Marco Squinzi ",
    netWorth: "$1.3 B",
    age: "50",
    country: "Italy",
    source: "chemical products",
    industry: "Construction & Engineering "
  },
  {
    key: "2289",
    rank: "2190",
    name: "Veronica Squinzi ",
    netWorth: "$1.3 B",
    age: "50",
    country: "Italy",
    source: "chemical products",
    industry: "Construction & Engineering "
  },
  {
    key: "2290",
    rank: "2190",
    name: "Manny Stul ",
    netWorth: "$1.3 B",
    age: "72",
    country: "Australia",
    source: "toys",
    industry: "Manufacturing "
  },
  {
    key: "2291",
    rank: "2190",
    name: "Rustem Sulteev ",
    netWorth: "$1.3 B",
    age: "68",
    country: "Russia",
    source: "refinery, chemicals",
    industry: "Energy "
  },
  {
    key: "2292",
    rank: "2190",
    name: "Sehat Sutardja ",
    netWorth: "$1.3 B",
    age: "60",
    country: "United States",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "2293",
    rank: "2190",
    name: "Tony Tan Caktiong ",
    netWorth: "$1.3 B",
    age: "69",
    country: "Philippines",
    source: "food",
    industry: "Food & Beverage "
  },
  {
    key: "2294",
    rank: "2190",
    name: "Jim Thompson ",
    netWorth: "$1.3 B",
    age: "82",
    country: "United States",
    source: "logistics",
    industry: "Logistics "
  },
  {
    key: "2295",
    rank: "2190",
    name: "Carmen Thyssen ",
    netWorth: "$1.3 B",
    age: "78",
    country: "Spain",
    source: "investments, art",
    industry: "Manufacturing "
  },
  {
    key: "2296",
    rank: "2190",
    name: "August Troendle ",
    netWorth: "$1.3 B",
    age: "66",
    country: "United States",
    source: "pharmaceutical services",
    industry: "Healthcare "
  },
  {
    key: "2297",
    rank: "2190",
    name: "Joop van den Ende ",
    netWorth: "$1.3 B",
    age: "80",
    country: "Netherlands",
    source: "TV shows",
    industry: "Media & Entertainment "
  },
  {
    key: "2298",
    rank: "2190",
    name: "Sekar Vembu ",
    netWorth: "$1.3 B",
    age: "50",
    country: "India",
    source: "business software",
    industry: "Technology "
  },
  {
    key: "2299",
    rank: "2190",
    name: "Sandro Veronesi & family ",
    netWorth: "$1.3 B",
    age: "62",
    country: "Italy",
    source: "fashion",
    industry: "Fashion & Retail "
  },
  {
    key: "2300",
    rank: "2190",
    name: "Wan Long ",
    netWorth: "$1.3 B",
    age: "81",
    country: "China",
    source: "food",
    industry: "Food & Beverage "
  },
  {
    key: "2301",
    rank: "2190",
    name: "Han Wang ",
    netWorth: "$1.3 B",
    age: "34",
    country: "China",
    source: "airline",
    industry: "Diversified "
  },
  {
    key: "2302",
    rank: "2190",
    name: "Wang Jianyi ",
    netWorth: "$1.3 B",
    age: "59",
    country: "China",
    source: "fiber optic cables",
    industry: "Technology "
  },
  {
    key: "2303",
    rank: "2190",
    name: "Wang Qinghua ",
    netWorth: "$1.3 B",
    age: "56",
    country: "China",
    source: "electric equipment",
    industry: "Manufacturing "
  },
  {
    key: "2304",
    rank: "2190",
    name: "Pengcheng Wen & family ",
    netWorth: "$1.3 B",
    age: "59",
    country: "China",
    source: "agribusiness",
    industry: "Food & Beverage "
  },
  {
    key: "2305",
    rank: "2190",
    name: "Alfred West, Jr. ",
    netWorth: "$1.3 B",
    age: "79",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "2306",
    rank: "2190",
    name: "Dan Wilks ",
    netWorth: "$1.3 B",
    age: "65",
    country: "United States",
    source: "natural gas",
    industry: "Energy "
  },
  {
    key: "2307",
    rank: "2190",
    name: "Farris Wilks ",
    netWorth: "$1.3 B",
    age: "70",
    country: "United States",
    source: "natural gas",
    industry: "Energy "
  },
  {
    key: "2308",
    rank: "2190",
    name: "Gang Xu ",
    netWorth: "$1.3 B",
    age: "58",
    country: "China",
    source: "Chemicals",
    industry: "Manufacturing "
  },
  {
    key: "2309",
    rank: "2190",
    name: "Xu Jin ",
    netWorth: "$1.3 B",
    age: "57",
    country: "China",
    source: "wine",
    industry: "Food & Beverage "
  },
  {
    key: "2310",
    rank: "2190",
    name: "Tony Xu ",
    netWorth: "$1.3 B",
    age: "37",
    country: "United States",
    source: "food delivery service",
    industry: "Technology "
  },
  {
    key: "2311",
    rank: "2190",
    name: "Ye Yanqiao ",
    netWorth: "$1.3 B",
    age: "52",
    country: "China",
    source: "soy sauce",
    industry: "Food & Beverage "
  },
  {
    key: "2312",
    rank: "2190",
    name: "Patrick Zalupski ",
    netWorth: "$1.3 B",
    age: "41",
    country: "United States",
    source: "homebuilding",
    industry: "Real Estate "
  },
  {
    key: "2313",
    rank: "2190",
    name: "Shengda Zan ",
    netWorth: "$1.3 B",
    age: "59",
    country: "China",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2314",
    rank: "2190",
    name: "Zeng Chaoyi ",
    netWorth: "$1.3 B",
    age: "53",
    country: "China",
    source: "aluminum products",
    industry: "Manufacturing "
  },
  {
    key: "2315",
    rank: "2190",
    name: "Zhang Guiping & family ",
    netWorth: "$1.3 B",
    age: "70",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2316",
    rank: "2190",
    name: "Peng Zhao ",
    netWorth: "$1.3 B",
    age: "51",
    country: "China",
    source: "online recruitment",
    industry: "Service "
  },
  {
    key: "2317",
    rank: "2190",
    name: "Zheng Zhiguo ",
    netWorth: "$1.3 B",
    age: "50",
    country: "China",
    source: "drugs",
    industry: "Healthcare "
  },
  {
    key: "2318",
    rank: "2190",
    name: "Kostyantin Zhevago ",
    netWorth: "$1.3 B",
    age: "48",
    country: "Ukraine",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "2319",
    rank: "2190",
    name: "Zhou Mingjie ",
    netWorth: "$1.3 B",
    age: "64",
    country: "China",
    source: "lighting installations",
    industry: "Technology "
  },
  {
    key: "2320",
    rank: "2190",
    name: "Zhu Xingliang ",
    netWorth: "$1.3 B",
    age: "62",
    country: "China",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "2321",
    rank: "2190",
    name: "Zhu Yiwen & family ",
    netWorth: "$1.3 B",
    age: "64",
    country: "China",
    source: "healthcare",
    industry: "Healthcare "
  },
  {
    key: "2322",
    rank: "2190",
    name: "Zong Yanmin ",
    netWorth: "$1.3 B",
    age: "64",
    country: "China",
    source: "Semiconductor materials",
    industry: "Manufacturing "
  },
  {
    key: "2323",
    rank: "2324",
    name: "Sanjay Agarwal ",
    netWorth: "$1.2 B",
    age: "51",
    country: "India",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "2324",
    rank: "2324",
    name: "Hamad bin Jassim bin Jaber Al Thani ",
    netWorth: "$1.2 B",
    age: "62",
    country: "Qatar",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2325",
    rank: "2324",
    name: "Betty Ang ",
    netWorth: "$1.2 B",
    age: "67",
    country: "Philippines",
    source: "foods",
    industry: "Food & Beverage "
  },
  {
    key: "2326",
    rank: "2324",
    name: "Christian Angermayer ",
    netWorth: "$1.2 B",
    age: "43",
    country: "Germany",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2327",
    rank: "2324",
    name: "Mika Anttonen ",
    netWorth: "$1.2 B",
    age: "55",
    country: "Finland",
    source: "oil & gas",
    industry: "Energy "
  },
  {
    key: "2328",
    rank: "2324",
    name: "Jose Maria Aristrain ",
    netWorth: "$1.2 B",
    age: "59",
    country: "Spain",
    source: "steel",
    industry: "Metals & Mining "
  },
  {
    key: "2329",
    rank: "2324",
    name: "Emilio Azcarraga Jean ",
    netWorth: "$1.2 B",
    age: "54",
    country: "Mexico",
    source: "TV broadcasting",
    industry: "Media & Entertainment "
  },
  {
    key: "2330",
    rank: "2324",
    name: "Thomas Bailey ",
    netWorth: "$1.2 B",
    age: "85",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "2331",
    rank: "2324",
    name: "Andrei Bokarev ",
    netWorth: "$1.2 B",
    age: "55",
    country: "Russia",
    source: "metals, mining",
    industry: "Manufacturing "
  },
  {
    key: "2332",
    rank: "2324",
    name: "Stephane Bonvin ",
    netWorth: "$1.2 B",
    age: "55",
    country: "Switzerland",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2333",
    rank: "2324",
    name: "Ashok Boob ",
    netWorth: "$1.2 B",
    age: "70",
    country: "India",
    source: "specialty chemicals",
    industry: "Manufacturing "
  },
  {
    key: "2334",
    rank: "2324",
    name: "Ludwig Theodor Braun ",
    netWorth: "$1.2 B",
    age: "32",
    country: "Germany",
    source: "medical technology",
    industry: "Healthcare "
  },
  {
    key: "2335",
    rank: "2324",
    name: "Friederike Braun-Luedicke ",
    netWorth: "$1.2 B",
    age: "38",
    country: "Germany",
    source: "medical technology",
    industry: "Healthcare "
  },
  {
    key: "2336",
    rank: "2324",
    name: "Pradip Burman ",
    netWorth: "$1.2 B",
    age: "79",
    country: "India",
    source: "consumer goods",
    industry: "Food & Beverage "
  },
  {
    key: "2337",
    rank: "2324",
    name: "Cai Hongbin ",
    netWorth: "$1.2 B",
    age: "64",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2338",
    rank: "2324",
    name: "Chang Kuo-Cheng ",
    netWorth: "$1.2 B",
    age: "64",
    country: "Taiwan",
    source: "Transportation",
    industry: "Logistics "
  },
  {
    key: "2339",
    rank: "2324",
    name: "Jiancheng Chen ",
    netWorth: "$1.2 B",
    age: "63",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2340",
    rank: "2324",
    name: "Chen Xueling ",
    netWorth: "$1.2 B",
    age: "54",
    country: "China",
    source: "stationery",
    industry: "Manufacturing "
  },
  {
    key: "2341",
    rank: "2324",
    name: "Cheng Lili ",
    netWorth: "$1.2 B",
    age: "57",
    country: "China",
    source: "poultry breeding",
    industry: "Food & Beverage "
  },
  {
    key: "2342",
    rank: "2324",
    name: "Yvon Chouinard ",
    netWorth: "$1.2 B",
    age: "83",
    country: "United States",
    source: "Patagonia",
    industry: "Fashion & Retail "
  },
  {
    key: "2343",
    rank: "2324",
    name: "Luigi Cremonini & family ",
    netWorth: "$1.2 B",
    age: "82",
    country: "Italy",
    source: "meat processing",
    industry: "Food & Beverage "
  },
  {
    key: "2344",
    rank: "2324",
    name: "Tim Draper ",
    netWorth: "$1.2 B",
    age: "63",
    country: "United States",
    source: "cryptocurrency",
    industry: "Finance & Investments "
  },
  {
    key: "2345",
    rank: "2324",
    name: "Fan Zhaoxia & family ",
    netWorth: "$1.2 B",
    age: "54",
    country: "China",
    source: "photovoltaic equipment",
    industry: "Energy "
  },
  {
    key: "2346",
    rank: "2324",
    name: "Gleb Fetisov ",
    netWorth: "$1.2 B",
    age: "55",
    country: "Russia",
    source: "investments",
    industry: "Telecom "
  },
  {
    key: "2347",
    rank: "2324",
    name: "Robert Fisher ",
    netWorth: "$1.2 B",
    age: "68",
    country: "United States",
    source: "Gap",
    industry: "Fashion & Retail "
  },
  {
    key: "2348",
    rank: "2324",
    name: "William Fisher ",
    netWorth: "$1.2 B",
    age: "65",
    country: "United States",
    source: "Gap",
    industry: "Fashion & Retail "
  },
  {
    key: "2349",
    rank: "2324",
    name: "J. Christopher Flowers ",
    netWorth: "$1.2 B",
    age: "64",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2350",
    rank: "2324",
    name: "Bernd Freier ",
    netWorth: "$1.2 B",
    age: "65",
    country: "Germany",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "2351",
    rank: "2324",
    name: "Geng Diangen ",
    netWorth: "$1.2 B",
    age: "65",
    country: "China",
    source: "Internet",
    industry: "Technology "
  },
  {
    key: "2352",
    rank: "2324",
    name: "Dan Gertler ",
    netWorth: "$1.2 B",
    age: "48",
    country: "Israel",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "2353",
    rank: "2324",
    name: "David Girouard ",
    netWorth: "$1.2 B",
    age: "56",
    country: "United States",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "2354",
    rank: "2324",
    name: "John Goff ",
    netWorth: "$1.2 B",
    age: "67",
    country: "United States",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2355",
    rank: "2324",
    name: "Lawrence Golub ",
    netWorth: "$1.2 B",
    age: "62",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "2356",
    rank: "2324",
    name: "Sven Hagströmer ",
    netWorth: "$1.2 B",
    age: "78",
    country: "Sweden",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "2357",
    rank: "2324",
    name: "Fahed Hariri ",
    netWorth: "$1.2 B",
    age: "41",
    country: "Lebanon",
    source: "construction, investments",
    industry: "Construction & Engineering "
  },
  {
    key: "2358",
    rank: "2324",
    name: "Richard Hayne ",
    netWorth: "$1.2 B",
    age: "74",
    country: "United States",
    source: "Urban Outfitters",
    industry: "Fashion & Retail "
  },
  {
    key: "2359",
    rank: "2324",
    name: "He Yamin & family ",
    netWorth: "$1.2 B",
    age: "65",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2360",
    rank: "2324",
    name: "Michael Heine ",
    netWorth: "$1.2 B",
    age: "72",
    country: "Australia",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "2361",
    rank: "2324",
    name: "Heikki Herlin ",
    netWorth: "$1.2 B",
    age: "35",
    country: "Finland",
    source: "elevators, escalators",
    industry: "Manufacturing "
  },
  {
    key: "2362",
    rank: "2324",
    name: "Hong Feng ",
    netWorth: "$1.2 B",
    age: "45",
    country: "China",
    source: "smartphones",
    industry: "Technology "
  },
  {
    key: "2363",
    rank: "2324",
    name: "Hu Kun ",
    netWorth: "$1.2 B",
    age: "52",
    country: "China",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "2364",
    rank: "2324",
    name: "Huang Hongyun & family ",
    netWorth: "$1.2 B",
    age: "55",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2365",
    rank: "2324",
    name: "Shanbing Huang & family ",
    netWorth: "$1.2 B",
    age: "65",
    country: "China",
    source: "semiconductors",
    industry: "Technology "
  },
  {
    key: "2366",
    rank: "2324",
    name: "Huang Shih Tsai ",
    netWorth: "$1.2 B",
    age: "70",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2367",
    rank: "2324",
    name: "Huang Wenbiao ",
    netWorth: "$1.2 B",
    age: "54",
    country: "China",
    source: "soy sauce",
    industry: "Food & Beverage "
  },
  {
    key: "2368",
    rank: "2324",
    name: "Mohammed Ibrahim ",
    netWorth: "$1.2 B",
    age: "75",
    country: "United Kingdom",
    source: "communications",
    industry: "Telecom "
  },
  {
    key: "2369",
    rank: "2324",
    name: "Hedda im Brahm-Droege ",
    netWorth: "$1.2 B",
    age: "67",
    country: "Germany",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2370",
    rank: "2324",
    name: "Rameshchandra Jain ",
    netWorth: "$1.2 B",
    age: "73",
    country: "India",
    source: "textiles",
    industry: "Manufacturing "
  },
  {
    key: "2371",
    rank: "2324",
    name: "Laurent Junique ",
    netWorth: "$1.2 B",
    age: "56",
    country: "France",
    source: "call centers",
    industry: "Technology "
  },
  {
    key: "2372",
    rank: "2324",
    name: "Zbigniew Juroszek & family ",
    netWorth: "$1.2 B",
    age: "59",
    country: "Poland",
    source: "real estate, gambling",
    industry: "Diversified "
  },
  {
    key: "2373",
    rank: "2324",
    name: "Chatchai Kaewbootta ",
    netWorth: "$1.2 B",
    age: "70",
    country: "Thailand",
    source: "auto loans",
    industry: "Finance & Investments "
  },
  {
    key: "2374",
    rank: "2324",
    name: "Shirley Kao ",
    netWorth: "$1.2 B",
    age: "65",
    country: "Taiwan",
    source: "food & beverage retailing",
    industry: "Food & Beverage "
  },
  {
    key: "2375",
    rank: "2324",
    name: "Ipek Kirac ",
    netWorth: "$1.2 B",
    age: "37",
    country: "Turkey",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2376",
    rank: "2324",
    name: "Carsten Koerl ",
    netWorth: "$1.2 B",
    age: "57",
    country: "Germany",
    source: "sports data",
    industry: "Sports "
  },
  {
    key: "2377",
    rank: "2324",
    name: "Andrei Kosogov ",
    netWorth: "$1.2 B",
    age: "61",
    country: "Russia",
    source: "Banking",
    industry: "Energy "
  },
  {
    key: "2378",
    rank: "2324",
    name: "John Krystynak ",
    netWorth: "$1.2 B",
    age: "53",
    country: "United States",
    source: "mobile games",
    industry: "Media & Entertainment "
  },
  {
    key: "2379",
    rank: "2324",
    name: "John Kusuma ",
    netWorth: "$1.2 B",
    age: "55",
    country: "Indonesia",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "2380",
    rank: "2324",
    name: "Hartono Kweefanus ",
    netWorth: "$1.2 B",
    age: "72",
    country: "Indonesia",
    source: "food manufacturing",
    industry: "Food & Beverage "
  },
  {
    key: "2381",
    rank: "2324",
    name: "Kwek Leng Peck ",
    netWorth: "$1.2 B",
    age: "66",
    country: "Singapore",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2382",
    rank: "2324",
    name: "Kristo Käärmann ",
    netWorth: "$1.2 B",
    age: "41",
    country: "Estonia",
    source: "payments, banking",
    industry: "Finance & Investments "
  },
  {
    key: "2383",
    rank: "2324",
    name: "Guy Laliberté ",
    netWorth: "$1.2 B",
    age: "62",
    country: "Canada",
    source: "Cirque du Soleil",
    industry: "Media & Entertainment "
  },
  {
    key: "2384",
    rank: "2324",
    name: "Lee Sang-ryul ",
    netWorth: "$1.2 B",
    age: "60",
    country: "South Korea",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "2385",
    rank: "2324",
    name: "Lee Seung-gun ",
    netWorth: "$1.2 B",
    age: "40",
    country: "South Korea",
    source: "fintech",
    industry: "Technology "
  },
  {
    key: "2386",
    rank: "2324",
    name: "Hongjing Li ",
    netWorth: "$1.2 B",
    age: "54",
    country: "China",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "2387",
    rank: "2324",
    name: "Li Wanqiang ",
    netWorth: "$1.2 B",
    age: "44",
    country: "China",
    source: "smartphones",
    industry: "Technology "
  },
  {
    key: "2388",
    rank: "2324",
    name: "Lu Hongyan ",
    netWorth: "$1.2 B",
    age: "44",
    country: "China",
    source: "online games",
    industry: "Media & Entertainment "
  },
  {
    key: "2389",
    rank: "2324",
    name: "Dalong Lv ",
    netWorth: "$1.2 B",
    age: "60",
    country: "China",
    source: "telecom services",
    industry: "Telecom "
  },
  {
    key: "2390",
    rank: "2324",
    name: "Carsten Maschmeyer ",
    netWorth: "$1.2 B",
    age: "62",
    country: "Germany",
    source: "finance services",
    industry: "Finance & Investments "
  },
  {
    key: "2391",
    rank: "2324",
    name: "Todd McKinnon ",
    netWorth: "$1.2 B",
    age: "50",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2392",
    rank: "2324",
    name: "Rubens Menin Teixeira de Souza ",
    netWorth: "$1.2 B",
    age: "66",
    country: "Brazil",
    source: "home building, banking",
    industry: "Diversified "
  },
  {
    key: "2393",
    rank: "2324",
    name: "Lorinc Meszaros ",
    netWorth: "$1.2 B",
    age: "56",
    country: "Hungary",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2394",
    rank: "2324",
    name: "Ulrich Mommert & family ",
    netWorth: "$1.2 B",
    age: "81",
    country: "Austria",
    source: "lighting",
    industry: "Automotive "
  },
  {
    key: "2395",
    rank: "2324",
    name: "Park Kwan-ho ",
    netWorth: "$1.2 B",
    age: "50",
    country: "South Korea",
    source: "online games",
    industry: "Media & Entertainment "
  },
  {
    key: "2396",
    rank: "2324",
    name: "George Pedersen ",
    netWorth: "$1.2 B",
    age: "86",
    country: "United States",
    source: "defense contractor",
    industry: "Manufacturing "
  },
  {
    key: "2397",
    rank: "2324",
    name: "David Penaloza Alanis ",
    netWorth: "$1.2 B",
    age: "48",
    country: "Mexico",
    source: "toll roads",
    industry: "Construction & Engineering "
  },
  {
    key: "2398",
    rank: "2324",
    name: "Stefan Pierer ",
    netWorth: "$1.2 B",
    age: "65",
    country: "Austria",
    source: "automotive",
    industry: "Automotive "
  },
  {
    key: "2399",
    rank: "2324",
    name: "Murdaya Poo ",
    netWorth: "$1.2 B",
    age: "81",
    country: "Indonesia",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2400",
    rank: "2324",
    name: "Michael Price ",
    netWorth: "$1.2 B",
    age: "69",
    country: "United States",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2401",
    rank: "2324",
    name: "Leonid Radvinsky ",
    netWorth: "$1.2 B",
    age: "40",
    country: "United States",
    source: "e-commerce",
    industry: "Technology "
  },
  {
    key: "2402",
    rank: "2324",
    name: "Megdet Rahimkulov & family ",
    netWorth: "$1.2 B",
    age: "76",
    country: "Russia",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2403",
    rank: "2324",
    name: "Andrei Rappoport ",
    netWorth: "$1.2 B",
    age: "58",
    country: "Russia",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2404",
    rank: "2324",
    name: "Dasari Uday Kumar Reddy ",
    netWorth: "$1.2 B",
    age: "54",
    country: "India",
    source: "cloud communications",
    industry: "Technology "
  },
  {
    key: "2405",
    rank: "2324",
    name: "Helena Revoredo ",
    netWorth: "$1.2 B",
    age: "75",
    country: "Spain",
    source: "security services",
    industry: "Service "
  },
  {
    key: "2406",
    rank: "2324",
    name: "Duke Reyes ",
    netWorth: "$1.2 B",
    age: "65",
    country: "United States",
    source: "beer distribution",
    industry: "Food & Beverage "
  },
  {
    key: "2407",
    rank: "2324",
    name: "Nobutada Saji ",
    netWorth: "$1.2 B",
    age: "76",
    country: "Japan",
    source: "beverages",
    industry: "Food & Beverage "
  },
  {
    key: "2408",
    rank: "2324",
    name: "Leonard Schleifer ",
    netWorth: "$1.2 B",
    age: "69",
    country: "United States",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2409",
    rank: "2324",
    name: "Airat Shaimiev ",
    netWorth: "$1.2 B",
    age: "60",
    country: "Russia",
    source: "refinery, chemicals",
    industry: "Energy "
  },
  {
    key: "2410",
    rank: "2324",
    name: "Radik Shaimiev ",
    netWorth: "$1.2 B",
    age: "57",
    country: "Russia",
    source: "refinery, chemicals",
    industry: "Energy "
  },
  {
    key: "2411",
    rank: "2324",
    name: "Vijay Shekhar Sharma ",
    netWorth: "$1.2 B",
    age: "43",
    country: "India",
    source: "financial technology",
    industry: "Service "
  },
  {
    key: "2412",
    rank: "2324",
    name: "Devi Shetty ",
    netWorth: "$1.2 B",
    age: "69",
    country: "India",
    source: "healthcare",
    industry: "Healthcare "
  },
  {
    key: "2413",
    rank: "2324",
    name: "Shum Chiu Hung & family ",
    netWorth: "$1.2 B",
    age: "52",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2414",
    rank: "2324",
    name: "Michael Steinhardt ",
    netWorth: "$1.2 B",
    age: "81",
    country: "United States",
    source: "hedge funds",
    industry: "Finance & Investments "
  },
  {
    key: "2415",
    rank: "2324",
    name: "Petter Stordalen & family ",
    netWorth: "$1.2 B",
    age: "59",
    country: "Norway",
    source: "hotels",
    industry: "Service "
  },
  {
    key: "2416",
    rank: "2324",
    name: "Winarko Sulistyo ",
    netWorth: "$1.2 B",
    age: "76",
    country: "Indonesia",
    source: "paper and pulp",
    industry: "Manufacturing "
  },
  {
    key: "2417",
    rank: "2324",
    name: "Sun Huaiqing & family ",
    netWorth: "$1.2 B",
    age: "52",
    country: "China",
    source: "cosmetics",
    industry: "Fashion & Retail "
  },
  {
    key: "2418",
    rank: "2324",
    name: "Luc Tack ",
    netWorth: "$1.2 B",
    age: "60",
    country: "Belgium",
    source: "textile, chemicals",
    industry: "Manufacturing "
  },
  {
    key: "2419",
    rank: "2324",
    name: "Lucio Tan ",
    netWorth: "$1.2 B",
    age: "87",
    country: "Philippines",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2420",
    rank: "2324",
    name: "Yoshikazu Tanaka ",
    netWorth: "$1.2 B",
    age: "45",
    country: "Japan",
    source: "social network",
    industry: "Technology "
  },
  {
    key: "2421",
    rank: "2324",
    name: "Stanley Tang ",
    netWorth: "$1.2 B",
    age: "29",
    country: "United States",
    source: "food delivery app",
    industry: "Technology "
  },
  {
    key: "2422",
    rank: "2324",
    name: "Sam Tarascio ",
    netWorth: "$1.2 B",
    age: "77",
    country: "Australia",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2423",
    rank: "2324",
    name: "Alexander Tedja ",
    netWorth: "$1.2 B",
    age: "76",
    country: "Indonesia",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2424",
    rank: "2324",
    name: "Laurie Tisch ",
    netWorth: "$1.2 B",
    age: "71",
    country: "United States",
    source: "insurance, NFL team",
    industry: "Diversified "
  },
  {
    key: "2425",
    rank: "2324",
    name: "Steven Tisch ",
    netWorth: "$1.2 B",
    age: "73",
    country: "United States",
    source: "insurance",
    industry: "Diversified "
  },
  {
    key: "2426",
    rank: "2324",
    name: "Stefania Triva ",
    netWorth: "$1.2 B",
    age: "57",
    country: "Italy",
    source: "microbiology",
    industry: "Healthcare "
  },
  {
    key: "2427",
    rank: "2324",
    name: "Maria Grace Uy ",
    netWorth: "$1.2 B",
    age: "53",
    country: "Philippines",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "2428",
    rank: "2324",
    name: "Wim van der Leegte ",
    netWorth: "$1.2 B",
    age: "74",
    country: "Netherlands",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2429",
    rank: "2324",
    name: "Thongma Vijitpongpun ",
    netWorth: "$1.2 B",
    age: "64",
    country: "Thailand",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2430",
    rank: "2324",
    name: "Jianfeng Wang & family ",
    netWorth: "$1.2 B",
    age: "52",
    country: "China",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "2431",
    rank: "2324",
    name: "Wang Jilei ",
    netWorth: "$1.2 B",
    age: "57",
    country: "China",
    source: "logistics",
    industry: "Logistics "
  },
  {
    key: "2432",
    rank: "2324",
    name: "Wang Junmin ",
    netWorth: "$1.2 B",
    age: "53",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2433",
    rank: "2324",
    name: "Wang Kunxiao ",
    netWorth: "$1.2 B",
    age: "52",
    country: "China",
    source: "oilfield equipment",
    industry: "Manufacturing "
  },
  {
    key: "2434",
    rank: "2324",
    name: "Wang Zhentao & family ",
    netWorth: "$1.2 B",
    age: "56",
    country: "China",
    source: "vaccine & shoes",
    industry: "Healthcare "
  },
  {
    key: "2435",
    rank: "2324",
    name: "J. Wayne Weaver ",
    netWorth: "$1.2 B",
    age: "86",
    country: "United States",
    source: "Shoes",
    industry: "Diversified "
  },
  {
    key: "2436",
    rank: "2324",
    name: "Weng Xianding ",
    netWorth: "$1.2 B",
    age: "60",
    country: "China",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "2437",
    rank: "2324",
    name: "Horst Wortmann ",
    netWorth: "$1.2 B",
    age: "80",
    country: "Germany",
    source: "footwear",
    industry: "Fashion & Retail "
  },
  {
    key: "2438",
    rank: "2324",
    name: "Wu Chung-yi ",
    netWorth: "$1.2 B",
    age: "66",
    country: "Taiwan",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2439",
    rank: "2324",
    name: "Wu Li-gann ",
    netWorth: "$1.2 B",
    age: "81",
    country: "Taiwan",
    source: "electronic components",
    industry: "Manufacturing "
  },
  {
    key: "2440",
    rank: "2324",
    name: "Wu Peifu & family ",
    netWorth: "$1.2 B",
    age: "60",
    country: "China",
    source: "plastic",
    industry: "Manufacturing "
  },
  {
    key: "2441",
    rank: "2324",
    name: "Xiu Laigui ",
    netWorth: "$1.2 B",
    age: "67",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2442",
    rank: "2324",
    name: "Yeh Kuo-I ",
    netWorth: "$1.2 B",
    age: "80",
    country: "Taiwan",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2443",
    rank: "2324",
    name: "Faxiang Yu ",
    netWorth: "$1.2 B",
    age: "50",
    country: "China",
    source: "tourism, cultural industry",
    industry: "Media & Entertainment "
  },
  {
    key: "2444",
    rank: "2324",
    name: "Zeng Chaolin ",
    netWorth: "$1.2 B",
    age: "39",
    country: "China",
    source: "Aluminium",
    industry: "Metals & Mining "
  },
  {
    key: "2445",
    rank: "2324",
    name: "Zhang Tianyu ",
    netWorth: "$1.2 B",
    age: "54",
    country: "China",
    source: "telecommunications",
    industry: "Telecom "
  },
  {
    key: "2446",
    rank: "2324",
    name: "Shusheng Zheng ",
    netWorth: "$1.2 B",
    age: "56",
    country: "China",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "2447",
    rank: "2448",
    name: "A. Jayson Adair ",
    netWorth: "$1.1 B",
    age: "52",
    country: "United States",
    source: "damaged cars",
    industry: "Automotive "
  },
  {
    key: "2448",
    rank: "2448",
    name: "Joao Alves de Queiroz Filho ",
    netWorth: "$1.1 B",
    age: "69",
    country: "Brazil",
    source: "pharmaceuticals",
    industry: "Diversified "
  },
  {
    key: "2449",
    rank: "2448",
    name: "Ryuji Arai ",
    netWorth: "$1.1 B",
    age: "75",
    country: "Japan",
    source: "retail",
    industry: "Fashion & Retail "
  },
  {
    key: "2450",
    rank: "2448",
    name: "Sara Blakely ",
    netWorth: "$1.1 B",
    age: "51",
    country: "United States",
    source: "Spanx",
    industry: "Fashion & Retail "
  },
  {
    key: "2451",
    rank: "2448",
    name: "Lloyd Blankfein ",
    netWorth: "$1.1 B",
    age: "67",
    country: "United States",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "2452",
    rank: "2448",
    name: "Henadiy Boholyubov ",
    netWorth: "$1.1 B",
    age: "60",
    country: "Ukraine",
    source: "banking, investments",
    industry: "Diversified "
  },
  {
    key: "2453",
    rank: "2448",
    name: "Caspar Callerström ",
    netWorth: "$1.1 B",
    age: "48",
    country: "Sweden",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "2454",
    rank: "2448",
    name: "Kejian Cao ",
    netWorth: "$1.1 B",
    age: "59",
    country: "China",
    source: "air compressors",
    industry: "Manufacturing "
  },
  {
    key: "2455",
    rank: "2448",
    name: "Turgay Ciner ",
    netWorth: "$1.1 B",
    age: "66",
    country: "Turkey",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2456",
    rank: "2448",
    name: "Dai Lizhong ",
    netWorth: "$1.1 B",
    age: "53",
    country: "China",
    source: "medical testing",
    industry: "Healthcare "
  },
  {
    key: "2457",
    rank: "2448",
    name: "Pedro de Godoy Bueno ",
    netWorth: "$1.1 B",
    age: "31",
    country: "Brazil",
    source: "health insurance",
    industry: "Healthcare "
  },
  {
    key: "2458",
    rank: "2448",
    name: "Aydin Dogan ",
    netWorth: "$1.1 B",
    age: "85",
    country: "Turkey",
    source: "media",
    industry: "Media & Entertainment "
  },
  {
    key: "2459",
    rank: "2448",
    name: "Wolfgang Egger ",
    netWorth: "$1.1 B",
    age: "56",
    country: "Germany",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2460",
    rank: "2448",
    name: "Gabriel Escarrer ",
    netWorth: "$1.1 B",
    age: "87",
    country: "Spain",
    source: "hotels",
    industry: "Service "
  },
  {
    key: "2461",
    rank: "2448",
    name: "Richard Fairbank ",
    netWorth: "$1.1 B",
    age: "71",
    country: "United States",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "2462",
    rank: "2448",
    name: "Andy Fang ",
    netWorth: "$1.1 B",
    age: "29",
    country: "United States",
    source: "food delivery app",
    industry: "Technology "
  },
  {
    key: "2463",
    rank: "2448",
    name: "Benedicte Find ",
    netWorth: "$1.1 B",
    age: "64",
    country: "Denmark",
    source: "medical devices",
    industry: "Healthcare "
  },
  {
    key: "2464",
    rank: "2448",
    name: "Paul Fireman ",
    netWorth: "$1.1 B",
    age: "78",
    country: "United States",
    source: "Reebok",
    industry: "Fashion & Retail "
  },
  {
    key: "2465",
    rank: "2448",
    name: "Donald Friese ",
    netWorth: "$1.1 B",
    age: "81",
    country: "United States",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2466",
    rank: "2448",
    name: "Soichiro Fukutake ",
    netWorth: "$1.1 B",
    age: "76",
    country: "Japan",
    source: "education",
    industry: "Service "
  },
  {
    key: "2467",
    rank: "2448",
    name: "Antonio Gallardo Ballart ",
    netWorth: "$1.1 B",
    age: "86",
    country: "Spain",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2468",
    rank: "2448",
    name: "David Golub ",
    netWorth: "$1.1 B",
    age: "59",
    country: "United States",
    source: "private equity",
    industry: "Finance & Investments "
  },
  {
    key: "2469",
    rank: "2448",
    name: "Guan Yihong ",
    netWorth: "$1.1 B",
    age: "52",
    country: "China",
    source: "restaurant",
    industry: "Food & Beverage "
  },
  {
    key: "2470",
    rank: "2448",
    name: "Stelios Haji-Ioannou ",
    netWorth: "$1.1 B",
    age: "55",
    country: "Cyprus",
    source: "EasyJet",
    industry: "Service "
  },
  {
    key: "2471",
    rank: "2448",
    name: "Mustafa Hamied ",
    netWorth: "$1.1 B",
    age: "81",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2472",
    rank: "2448",
    name: "Han Arming Hanafia ",
    netWorth: "$1.1 B",
    age: "64",
    country: "Indonesia",
    source: "data centers",
    industry: "Technology "
  },
  {
    key: "2473",
    rank: "2448",
    name: "Ronnen Harary ",
    netWorth: "$1.1 B",
    age: "50",
    country: "Canada",
    source: "toys",
    industry: "Manufacturing "
  },
  {
    key: "2474",
    rank: "2448",
    name: "David Helgason ",
    netWorth: "$1.1 B",
    age: "44",
    country: "Iceland",
    source: "game software",
    industry: "Technology "
  },
  {
    key: "2475",
    rank: "2448",
    name: "Christian Herz ",
    netWorth: "$1.1 B",
    age: "64",
    country: "Germany",
    source: "coffee",
    industry: "Finance & Investments "
  },
  {
    key: "2476",
    rank: "2448",
    name: "Michaela Herz ",
    netWorth: "$1.1 B",
    age: "64",
    country: "Germany",
    source: "coffee",
    industry: "Finance & Investments "
  },
  {
    key: "2477",
    rank: "2448",
    name: "Eduardo Hochschild ",
    netWorth: "$1.1 B",
    age: "58",
    country: "Peru",
    source: "mining",
    industry: "Metals & Mining "
  },
  {
    key: "2478",
    rank: "2448",
    name: "Hong Seok-joh ",
    netWorth: "$1.1 B",
    age: "69",
    country: "South Korea",
    source: "convenience stores",
    industry: "Fashion & Retail "
  },
  {
    key: "2479",
    rank: "2448",
    name: "Huang Jiangji ",
    netWorth: "$1.1 B",
    age: "64",
    country: "Hong Kong",
    source: "smartphones",
    industry: "Technology "
  },
  {
    key: "2480",
    rank: "2448",
    name: "Huang Xu ",
    netWorth: "$1.1 B",
    age: "54",
    country: "China",
    source: "semiconductor",
    industry: "Technology "
  },
  {
    key: "2481",
    rank: "2448",
    name: "Subba Rao Jasti ",
    netWorth: "$1.1 B",
    age: "95",
    country: "India",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2482",
    rank: "2448",
    name: "Long Jiang ",
    netWorth: "$1.1 B",
    age: "48",
    country: "China",
    source: "Manufacturing",
    industry: "Technology "
  },
  {
    key: "2483",
    rank: "2448",
    name: "Jiang Xuefei & family ",
    netWorth: "$1.1 B",
    age: "52",
    country: "China",
    source: "printed circuit boards",
    industry: "Technology "
  },
  {
    key: "2484",
    rank: "2448",
    name: "Jonas Kamprad ",
    netWorth: "$1.1 B",
    age: "56",
    country: "Sweden",
    source: "IKEA",
    industry: "Finance & Investments "
  },
  {
    key: "2485",
    rank: "2448",
    name: "Mathias Kamprad ",
    netWorth: "$1.1 B",
    age: "52",
    country: "Sweden",
    source: "IKEA",
    industry: "Finance & Investments "
  },
  {
    key: "2486",
    rank: "2448",
    name: "Peter Kamprad ",
    netWorth: "$1.1 B",
    age: "58",
    country: "Sweden",
    source: "IKEA",
    industry: "Finance & Investments "
  },
  {
    key: "2487",
    rank: "2448",
    name: "Andrew Karam ",
    netWorth: "$1.1 B",
    age: "40",
    country: "United States",
    source: "mobile games",
    industry: "Media & Entertainment "
  },
  {
    key: "2488",
    rank: "2448",
    name: "Samvel Karapetyan ",
    netWorth: "$1.1 B",
    age: "56",
    country: "Russia",
    source: "real estate",
    industry: "Construction & Engineering "
  },
  {
    key: "2489",
    rank: "2448",
    name: "Alexander Karp ",
    netWorth: "$1.1 B",
    age: "54",
    country: "United States",
    source: "software firm",
    industry: "Technology "
  },
  {
    key: "2490",
    rank: "2448",
    name: "Ke Guihua ",
    netWorth: "$1.1 B",
    age: "56",
    country: "China",
    source: "auto parts",
    industry: "Manufacturing "
  },
  {
    key: "2491",
    rank: "2448",
    name: "Kim Jung-woong ",
    netWorth: "$1.1 B",
    age: "47",
    country: "South Korea",
    source: "cosmetics",
    industry: "Fashion & Retail "
  },
  {
    key: "2492",
    rank: "2448",
    name: "Harry Klagsbrun ",
    netWorth: "$1.1 B",
    age: "67",
    country: "Sweden",
    source: "financial services",
    industry: "Finance & Investments "
  },
  {
    key: "2493",
    rank: "2448",
    name: "Alexander Knauf ",
    netWorth: "$1.1 B",
    age: "47",
    country: "Germany",
    source: "building materials",
    industry: "Manufacturing "
  },
  {
    key: "2494",
    rank: "2448",
    name: "Martin Knauf ",
    netWorth: "$1.1 B",
    age: "64",
    country: "Germany",
    source: "building materials",
    industry: "Manufacturing "
  },
  {
    key: "2495",
    rank: "2448",
    name: "Robert Knauf ",
    netWorth: "$1.1 B",
    age: "64",
    country: "Germany",
    source: "building materials",
    industry: "Manufacturing "
  },
  {
    key: "2496",
    rank: "2448",
    name: "Koh Wee Meng ",
    netWorth: "$1.1 B",
    age: "58",
    country: "Singapore",
    source: "real estate, hotels",
    industry: "Real Estate "
  },
  {
    key: "2497",
    rank: "2448",
    name: "Sergei Kolesnikov ",
    netWorth: "$1.1 B",
    age: "50",
    country: "Russia",
    source: "building materials",
    industry: "Manufacturing "
  },
  {
    key: "2498",
    rank: "2448",
    name: "Andrei Komarov ",
    netWorth: "$1.1 B",
    age: "55",
    country: "Russia",
    source: "investments",
    industry: "Manufacturing "
  },
  {
    key: "2499",
    rank: "2448",
    name: "Koo Bon-neung ",
    netWorth: "$1.1 B",
    age: "73",
    country: "South Korea",
    source: "electronics",
    industry: "Manufacturing "
  },
  {
    key: "2500",
    rank: "2448",
    name: "Koo Bon-sik ",
    netWorth: "$1.1 B",
    age: "63",
    country: "South Korea",
    source: "LG",
    industry: "Technology "
  },
  {
    key: "2501",
    rank: "2448",
    name: "Suresh Krishna ",
    netWorth: "$1.1 B",
    age: "85",
    country: "India",
    source: "auto parts",
    industry: "Automotive "
  },
  {
    key: "2502",
    rank: "2448",
    name: "Nancy Lerner ",
    netWorth: "$1.1 B",
    age: "61",
    country: "United States",
    source: "banking, credit cards",
    industry: "Finance & Investments "
  },
  {
    key: "2503",
    rank: "2448",
    name: "Norma Lerner ",
    netWorth: "$1.1 B",
    age: "86",
    country: "United States",
    source: "banking",
    industry: "Finance & Investments "
  },
  {
    key: "2504",
    rank: "2448",
    name: "Randolph Lerner ",
    netWorth: "$1.1 B",
    age: "60",
    country: "United States",
    source: "banking, credit cards",
    industry: "Finance & Investments "
  },
  {
    key: "2505",
    rank: "2448",
    name: "Li Shui-po ",
    netWorth: "$1.1 B",
    age: "65",
    country: "Taiwan",
    source: "Manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2506",
    rank: "2448",
    name: "Li Tan ",
    netWorth: "$1.1 B",
    age: "57",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2507",
    rank: "2448",
    name: "Li Wenmei & family ",
    netWorth: "$1.1 B",
    age: "59",
    country: "China",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "2508",
    rank: "2448",
    name: "Lim Hariyanto Wijaya Sarwono ",
    netWorth: "$1.1 B",
    age: "93",
    country: "Indonesia",
    source: "palm oil, nickel mining",
    industry: "Energy "
  },
  {
    key: "2509",
    rank: "2448",
    name: "Lin Jie & family ",
    netWorth: "$1.1 B",
    age: "53",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2510",
    rank: "2448",
    name: "Liu Chengyu & family ",
    netWorth: "$1.1 B",
    age: "59",
    country: "China",
    source: "power supply equipment",
    industry: "Manufacturing "
  },
  {
    key: "2511",
    rank: "2448",
    name: "Lou Boliang ",
    netWorth: "$1.1 B",
    age: "58",
    country: "United States",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2512",
    rank: "2448",
    name: "Lun Ruixiang & family ",
    netWorth: "$1.1 B",
    age: "54",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2513",
    rank: "2448",
    name: "Lv Yongxiang ",
    netWorth: "$1.1 B",
    age: "72",
    country: "China",
    source: "magnetic switches",
    industry: "Manufacturing "
  },
  {
    key: "2514",
    rank: "2448",
    name: "Ma Xiuhui ",
    netWorth: "$1.1 B",
    age: "51",
    country: "China",
    source: "LED lighting",
    industry: "Manufacturing "
  },
  {
    key: "2515",
    rank: "2448",
    name: "Yasseen Mansour ",
    netWorth: "$1.1 B",
    age: "60",
    country: "Egypt",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2516",
    rank: "2448",
    name: "Jorge Mas ",
    netWorth: "$1.1 B",
    age: "59",
    country: "United States",
    source: "Construction",
    industry: "Construction & Engineering "
  },
  {
    key: "2517",
    rank: "2448",
    name: "Michael McCain ",
    netWorth: "$1.1 B",
    age: "64",
    country: "Canada",
    source: "packaged meats",
    industry: "Food & Beverage "
  },
  {
    key: "2518",
    rank: "2448",
    name: "Gabriella Meister ",
    netWorth: "$1.1 B",
    age: "64",
    country: "Germany",
    source: "appliances",
    industry: "Manufacturing "
  },
  {
    key: "2519",
    rank: "2448",
    name: "Ulrike Meister ",
    netWorth: "$1.1 B",
    age: "55",
    country: "Germany",
    source: "appliances",
    industry: "Manufacturing "
  },
  {
    key: "2520",
    rank: "2448",
    name: "Jeffrey Michael & family ",
    netWorth: "$1.1 B",
    age: "65",
    country: "United States",
    source: "data management",
    industry: "Technology "
  },
  {
    key: "2521",
    rank: "2448",
    name: "Soichiro Minami ",
    netWorth: "$1.1 B",
    age: "45",
    country: "Japan",
    source: "internet and software",
    industry: "Technology "
  },
  {
    key: "2522",
    rank: "2448",
    name: "Bob Muglia ",
    netWorth: "$1.1 B",
    age: "62",
    country: "United States",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2523",
    rank: "2448",
    name: "Erik Must ",
    netWorth: "$1.1 B",
    age: "79",
    country: "Norway",
    source: "stock brokerage",
    industry: "Finance & Investments "
  },
  {
    key: "2524",
    rank: "2448",
    name: "Kerr Neilson ",
    netWorth: "$1.1 B",
    age: "72",
    country: "Australia",
    source: "Investments",
    industry: "Finance & Investments "
  },
  {
    key: "2525",
    rank: "2448",
    name: "John Oyler ",
    netWorth: "$1.1 B",
    age: "54",
    country: "United States",
    source: "biotech",
    industry: "Healthcare "
  },
  {
    key: "2526",
    rank: "2448",
    name: "Park Hyeon-joo ",
    netWorth: "$1.1 B",
    age: "63",
    country: "South Korea",
    source: "mutual funds",
    industry: "Finance & Investments "
  },
  {
    key: "2527",
    rank: "2448",
    name: "Jose Isaac Peres & family ",
    netWorth: "$1.1 B",
    age: "81",
    country: "Brazil",
    source: "shopping malls",
    industry: "Real Estate "
  },
  {
    key: "2528",
    rank: "2448",
    name: "Catherine Phillips ",
    netWorth: "$1.1 B",
    age: "64",
    country: "Canada",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2529",
    rank: "2448",
    name: "John Phillips ",
    netWorth: "$1.1 B",
    age: "71",
    country: "Canada",
    source: "investments",
    industry: "Finance & Investments "
  },
  {
    key: "2530",
    rank: "2448",
    name: "Pu Zhongjie & family ",
    netWorth: "$1.1 B",
    age: "59",
    country: "China",
    source: "medical equipment",
    industry: "Healthcare "
  },
  {
    key: "2531",
    rank: "2448",
    name: "Qian Xiaojun ",
    netWorth: "$1.1 B",
    age: "47",
    country: "China",
    source: "IT",
    industry: "Technology "
  },
  {
    key: "2532",
    rank: "2448",
    name: "Anton Rabie ",
    netWorth: "$1.1 B",
    age: "50",
    country: "Canada",
    source: "toys",
    industry: "Manufacturing "
  },
  {
    key: "2533",
    rank: "2448",
    name: "Igor Rybakov ",
    netWorth: "$1.1 B",
    age: "49",
    country: "Russia",
    source: "building materials",
    industry: "Manufacturing "
  },
  {
    key: "2534",
    rank: "2448",
    name: "K. Rai Sahi ",
    netWorth: "$1.1 B",
    age: "75",
    country: "Canada",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2535",
    rank: "2448",
    name: "Karl Scheufele, III. & family ",
    netWorth: "$1.1 B",
    age: "83",
    country: "Switzerland",
    source: "jewelry",
    industry: "Fashion & Retail "
  },
  {
    key: "2536",
    rank: "2448",
    name: "Steven Schuurman ",
    netWorth: "$1.1 B",
    age: "46",
    country: "Netherlands",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2537",
    rank: "2448",
    name: "Shao Zengming ",
    netWorth: "$1.1 B",
    age: "64",
    country: "China",
    source: "diamonds",
    industry: "Manufacturing "
  },
  {
    key: "2538",
    rank: "2448",
    name: "Analjit Singh ",
    netWorth: "$1.1 B",
    age: "68",
    country: "India",
    source: "diversified",
    industry: "Diversified "
  },
  {
    key: "2539",
    rank: "2448",
    name: "Kavita Singhania ",
    netWorth: "$1.1 B",
    age: "60",
    country: "India",
    source: "cement",
    industry: "Manufacturing "
  },
  {
    key: "2540",
    rank: "2448",
    name: "Michael S. Smith ",
    netWorth: "$1.1 B",
    age: "66",
    country: "United States",
    source: "liquefied natural gas",
    industry: "Energy "
  },
  {
    key: "2541",
    rank: "2448",
    name: "Scott Smith ",
    netWorth: "$1.1 B",
    age: "72",
    country: "United States",
    source: "cloud computing",
    industry: "Technology "
  },
  {
    key: "2542",
    rank: "2448",
    name: "Ashok Soota ",
    netWorth: "$1.1 B",
    age: "79",
    country: "India",
    source: "software services",
    industry: "Technology "
  },
  {
    key: "2543",
    rank: "2448",
    name: "Michael Spencer ",
    netWorth: "$1.1 B",
    age: "66",
    country: "United Kingdom",
    source: "stock exchange",
    industry: "Finance & Investments "
  },
  {
    key: "2544",
    rank: "2448",
    name: "Venu Srinivasan ",
    netWorth: "$1.1 B",
    age: "69",
    country: "India",
    source: "two-wheelers",
    industry: "Automotive "
  },
  {
    key: "2545",
    rank: "2448",
    name: "Dirk Stroeer ",
    netWorth: "$1.1 B",
    age: "53",
    country: "Germany",
    source: "advertising",
    industry: "Media & Entertainment "
  },
  {
    key: "2546",
    rank: "2448",
    name: "Susanto Suwarto ",
    netWorth: "$1.1 B",
    age: "66",
    country: "Indonesia",
    source: "media",
    industry: "Media & Entertainment "
  },
  {
    key: "2547",
    rank: "2448",
    name: "Xiuguo Tang ",
    netWorth: "$1.1 B",
    age: "58",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2548",
    rank: "2448",
    name: "Mehmet Sinan Tara ",
    netWorth: "$1.1 B",
    age: "63",
    country: "Turkey",
    source: "construction",
    industry: "Construction & Engineering "
  },
  {
    key: "2549",
    rank: "2448",
    name: "Robert Toll ",
    netWorth: "$1.1 B",
    age: "81",
    country: "United States",
    source: "home building",
    industry: "Real Estate "
  },
  {
    key: "2550",
    rank: "2448",
    name: "Surin Upatkoon ",
    netWorth: "$1.1 B",
    age: "72",
    country: "Thailand",
    source: "telecom, lotteries, insurance",
    industry: "Diversified "
  },
  {
    key: "2551",
    rank: "2448",
    name: "Sunil Vachani ",
    netWorth: "$1.1 B",
    age: "53",
    country: "India",
    source: "electronics",
    industry: "Manufacturing "
  },
  {
    key: "2552",
    rank: "2448",
    name: "Murat Vargi ",
    netWorth: "$1.1 B",
    age: "74",
    country: "Turkey",
    source: "telecom",
    industry: "Telecom "
  },
  {
    key: "2553",
    rank: "2448",
    name: "Pongsak Viddayakorn ",
    netWorth: "$1.1 B",
    age: "88",
    country: "Thailand",
    source: "hospitals",
    industry: "Healthcare "
  },
  {
    key: "2554",
    rank: "2448",
    name: "Wang Linxiang ",
    netWorth: "$1.1 B",
    age: "64",
    country: "China",
    source: "cashmere",
    industry: "Fashion & Retail "
  },
  {
    key: "2555",
    rank: "2448",
    name: "Wang Shumin ",
    netWorth: "$1.1 B",
    age: "65",
    country: "China",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2556",
    rank: "2448",
    name: "Richard Warke ",
    netWorth: "$1.1 B",
    age: "64",
    country: "Canada",
    source: "Mining",
    industry: "Metals & Mining "
  },
  {
    key: "2557",
    rank: "2448",
    name: "Anne Werninghaus ",
    netWorth: "$1.1 B",
    age: "36",
    country: "Brazil",
    source: "industrial machinery",
    industry: "Manufacturing "
  },
  {
    key: "2558",
    rank: "2448",
    name: "Allan Wong ",
    netWorth: "$1.1 B",
    age: "72",
    country: "Hong Kong",
    source: "electronics",
    industry: "Manufacturing "
  },
  {
    key: "2559",
    rank: "2448",
    name: "Chaoqun Wu ",
    netWorth: "$1.1 B",
    age: "52",
    country: "China",
    source: "chemicals",
    industry: "Manufacturing "
  },
  {
    key: "2560",
    rank: "2448",
    name: "Wu Yonghua ",
    netWorth: "$1.1 B",
    age: "51",
    country: "China",
    source: "apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "2561",
    rank: "2448",
    name: "Wu Zhenxing ",
    netWorth: "$1.1 B",
    age: "52",
    country: "China",
    source: "soy sauce",
    industry: "Food & Beverage "
  },
  {
    key: "2562",
    rank: "2448",
    name: "Franziska Wuerbser ",
    netWorth: "$1.1 B",
    age: "34",
    country: "Germany",
    source: "kitchen appliances",
    industry: "Manufacturing "
  },
  {
    key: "2563",
    rank: "2448",
    name: "Xia Xinde ",
    netWorth: "$1.1 B",
    age: "57",
    country: "China",
    source: "batteries",
    industry: "Manufacturing "
  },
  {
    key: "2564",
    rank: "2448",
    name: "Xiong Jun & family ",
    netWorth: "$1.1 B",
    age: "48",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2565",
    rank: "2448",
    name: "Jane Yan & family ",
    netWorth: "$1.1 B",
    age: "52",
    country: "China",
    source: "software",
    industry: "Technology "
  },
  {
    key: "2566",
    rank: "2448",
    name: "Yang Erzhu ",
    netWorth: "$1.1 B",
    age: "71",
    country: "China",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2567",
    rank: "2448",
    name: "Vlad Yatsenko ",
    netWorth: "$1.1 B",
    age: "38",
    country: "Ukraine",
    source: "fintech",
    industry: "Finance & Investments "
  },
  {
    key: "2568",
    rank: "2448",
    name: "Yi Xianzhong & family ",
    netWorth: "$1.1 B",
    age: "62",
    country: "China",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2569",
    rank: "2448",
    name: "Yoshiaki Yoshida ",
    netWorth: "$1.1 B",
    age: "81",
    country: "Japan",
    source: "cosmetics",
    industry: "Fashion & Retail "
  },
  {
    key: "2570",
    rank: "2448",
    name: "Yu Rong ",
    netWorth: "$1.1 B",
    age: "50",
    country: "China",
    source: "health clinics",
    industry: "Healthcare "
  },
  {
    key: "2571",
    rank: "2448",
    name: "Igor Yusufov ",
    netWorth: "$1.1 B",
    age: "65",
    country: "Russia",
    source: "oil & gas",
    industry: "Energy "
  },
  {
    key: "2572",
    rank: "2448",
    name: "Zeng Weixiong ",
    netWorth: "$1.1 B",
    age: "64",
    country: "China",
    source: "healthcare",
    industry: "Healthcare "
  },
  {
    key: "2573",
    rank: "2448",
    name: "Zhang Cheng Fei ",
    netWorth: "$1.1 B",
    age: "54",
    country: "China",
    source: "paper & related products",
    industry: "Manufacturing "
  },
  {
    key: "2574",
    rank: "2448",
    name: "Zhang Fangliang ",
    netWorth: "$1.1 B",
    age: "57",
    country: "China",
    source: "biotechnology",
    industry: "Healthcare "
  },
  {
    key: "2575",
    rank: "2448",
    name: "Baoshen Zhong ",
    netWorth: "$1.1 B",
    age: "54",
    country: "China",
    source: "solar energy",
    industry: "Energy "
  },
  {
    key: "2576",
    rank: "2448",
    name: "Zhou Minghua ",
    netWorth: "$1.1 B",
    age: "58",
    country: "China",
    source: "pharmaceutical",
    industry: "Healthcare "
  },
  {
    key: "2577",
    rank: "2578",
    name: "Krishna Kumar Bangur ",
    netWorth: "$1 B",
    age: "61",
    country: "India",
    source: "graphite electrodes",
    industry: "Manufacturing "
  },
  {
    key: "2578",
    rank: "2578",
    name: "Wilbur  'Ed' Bosarge, Jr. ",
    netWorth: "$1 B",
    age: "82",
    country: "United States",
    source: "high speed trading",
    industry: "Finance & Investments "
  },
  {
    key: "2579",
    rank: "2578",
    name: "Johanna Braun ",
    netWorth: "$1 B",
    age: "42",
    country: "Germany",
    source: "medical technology",
    industry: "Healthcare "
  },
  {
    key: "2580",
    rank: "2578",
    name: "Karl Friedrich Braun ",
    netWorth: "$1 B",
    age: "39",
    country: "Germany",
    source: "medical technology",
    industry: "Healthcare "
  },
  {
    key: "2581",
    rank: "2578",
    name: "Jean-Pierre Cayard ",
    netWorth: "$1 B",
    age: "79",
    country: "France",
    source: "spirits",
    industry: "Food & Beverage "
  },
  {
    key: "2582",
    rank: "2578",
    name: "Tony Chen ",
    netWorth: "$1 B",
    age: "72",
    country: "Taiwan",
    source: "electronics",
    industry: "Technology "
  },
  {
    key: "2583",
    rank: "2578",
    name: "Vivien Chen ",
    netWorth: "$1 B",
    age: "63",
    country: "Hong Kong",
    source: "real estate",
    industry: "Real Estate "
  },
  {
    key: "2584",
    rank: "2578",
    name: "Chey Ki-won ",
    netWorth: "$1 B",
    age: "57",
    country: "South Korea",
    source: "computer services, telecom",
    industry: "Technology "
  },
  {
    key: "2585",
    rank: "2578",
    name: "Pollyanna Chu ",
    netWorth: "$1 B",
    age: "64",
    country: "Hong Kong",
    source: "financial services, property",
    industry: "Finance & Investments "
  },
  {
    key: "2586",
    rank: "2578",
    name: "Roy Chi Ping Chung ",
    netWorth: "$1 B",
    age: "69",
    country: "Hong Kong",
    source: "manufacturing",
    industry: "Manufacturing "
  },
  {
    key: "2587",
    rank: "2578",
    name: "Doug Clarke ",
    netWorth: "$1 B",
    age: "41",
    country: "Australia",
    source: "cameras, software",
    industry: "Technology "
  },
  {
    key: "2588",
    rank: "2578",
    name: "Ronald Clarke ",
    netWorth: "$1 B",
    age: "66",
    country: "United States",
    source: "payments technology",
    industry: "Technology "
  },
  {
    key: "2589",
    rank: "2578",
    name: "Jean-Paul Clozel ",
    netWorth: "$1 B",
    age: "67",
    country: "Switzerland",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2590",
    rank: "2578",
    name: "Carl DeSantis ",
    netWorth: "$1 B",
    age: "82",
    country: "United States",
    source: "energy drink",
    industry: "Food & Beverage "
  },
  {
    key: "2591",
    rank: "2578",
    name: "Sefik Yilmaz Dizdar ",
    netWorth: "$1 B",
    age: "84",
    country: "Turkey",
    source: "fashion retail",
    industry: "Fashion & Retail "
  },
  {
    key: "2592",
    rank: "2578",
    name: "Charles Dunstone ",
    netWorth: "$1 B",
    age: "58",
    country: "United Kingdom",
    source: "mobile phones",
    industry: "Telecom "
  },
  {
    key: "2593",
    rank: "2578",
    name: "Larry Fink ",
    netWorth: "$1 B",
    age: "69",
    country: "United States",
    source: "money management",
    industry: "Finance & Investments "
  },
  {
    key: "2594",
    rank: "2578",
    name: "Fu Gang ",
    netWorth: "$1 B",
    age: "51",
    country: "China",
    source: "pharma retailing",
    industry: "Healthcare "
  },
  {
    key: "2595",
    rank: "2578",
    name: "Jorge Gallardo Ballart ",
    netWorth: "$1 B",
    age: "80",
    country: "Spain",
    source: "pharmaceuticals",
    industry: "Healthcare "
  },
  {
    key: "2596",
    rank: "2578",
    name: "Nari Genomal ",
    netWorth: "$1 B",
    age: "82",
    country: "Philippines",
    source: "apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "2597",
    rank: "2578",
    name: "Ramesh Genomal ",
    netWorth: "$1 B",
    age: "71",
    country: "Philippines",
    source: "apparel",
    industry: "Fashion & Retail "
  },
  {
    key: "2598",
    rank: "2578",
    name: "Sunder Genomal ",
    netWorth: "$1 B",
    age: "68",
    country: "Philippines",
    source: "garments",
    industry: "Fashion & Retail "
  },
  {
    key: "2599",
    rank: "2578",
    name: "Horst-Otto Gerberding ",
    netWorth: "$1 B",
    age: "69",
    country: "Germany",
    source: "flavors and fragrances",
    industry: "Food & Beverage "
  }
]