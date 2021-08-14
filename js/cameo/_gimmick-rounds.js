const gimmickRounds = {
  richards: {
    name: "Oops! All Richards",
    description: "Let's evaluate some dicks",
    queue: [

      { name: "Richard Hatch", desc:"Winner, Survivor Season 1", slug:"richhatch", value:50 },
      { name: "Richard Karn", desc:"Al on Home Improvement", slug:"richardkarn", value:100 },
      { name: "Richard Patrick", desc:"Vocalist of Filter", slug:"filter_richard_patrick", value:70 },

      { name: "Richard Blais", desc:"Perennial Top Chef Contestant", slug:"richardblais", value:119 },
      { name: "Richard Kline", desc:"Larry on Three's Company", slug:"larrydallas", value:100 },
      { name: "Richard Marx", desc:"Wherever you go, whatever you do, he will be right here waiting for you.", slug:"richardmarx", value:250 },

      { name: "Richard Dreyfuss", desc:"Hooper in Jaws", slug:"richarddreyfuss1", value:999 },
      { name: "Richard Rosenblatt", desc:"Former Chairman of MySpace", slug:"richardrosenblatt", value:30 },
      { name: "Richard Brake", desc:"The Night King on Game of Thrones", slug:"richbrake", value:80 },

      { name: "Richard Roeper", desc:"Movie Critic, Formerly of Ebert & Roeper", slug:"richarderoeper", value:55 },
      { name: "Richard Turner", desc:"Bassist, Blackberry Smoke", slug:"richardturner", value:50 },
      { name: "Richard Petty", desc:"NASCAR driver", slug:"rlpetty43", value:250 },

    ],
  },

  georges: {
    name: "100% GEORGEs",
    description: "GEORGE! GEORGE! GEORGE!",
    queue: [

      { name: "George Foreman", desc:"Has Five Sons Named George (And A Daughter Named Georgetta)", slug:"steveharvey", value:750 },
      { name: "George Clanton", desc:"Vaporwave Musician", slug:"georgeclanton", value:69 },
      { name: "George Clinton", desc:"Parliament Funkadelic", slug:"george_clinton", value:200 },

      { name: "George Hamilton", desc:"Incredibly Tan Actor", slug:"georgehamilton", value:200 },
      { name: "George Wendt", desc:"Norm on Cheers", slug:"georgewendt", value:125 },
      { name: "George", desc:"A Dog", slug:"georgegsd", value:999 },

      { name: "David Siegel", desc:"George Clooney Lookalike", slug:"davidasclooney", value:85  },
      { name: "George Wallace", desc:"The Legendary Comedian (Not The Racist Senator)", slug:"georgewallace", value:50  },
      { name: "George Shea", desc:"You Know Those Hot Dog Eating Contests? This Is The Guy That Emcees Them", slug:"gcshea", value:50  },

      { name: "George Lowe", desc:"Space Ghost", slug:"georgeloweofficial", value:100 },
      { name: "Boy George", desc:"Singer, Culture Club", slug: "boygeorge5", value:300 },
      { name: "George Papadopoulos", desc:"Served Twelve Days In Prison Before Getting Pardoned", slug:"papadopoulos", value:250 },
    ],
  },

  trumpworld: {
    name: "Trumpworld",
    desc: "This round is cursed.",
    queue: [
      { name: "Roger Stone", desc:"Commuted Felon", slug:"rogerstone", value:75 },
      { name: "Michael Cohen", desc:"Disbarred Legal Fixer", slug:"michaelcohen212", value:100 },
      { name: "Joe Arpaio", desc: "Former Sheriff, Convicted of Criminal Contempt", slug:"sheriffjoearpaio", value:30 },

      { name: "Kevin Sorbo", desc: "Former Hercules, Current Gab Poster", slug:"ksorbs", value:80 },
      { name: "Anthony Scaramucci", desc:"Former White House Communications Director", slug:"themooch", value:55 },
      { name: "Rudy W. Giuliani", desc:"No longer licensed to practice law.", slug:"rudygiuliani", value:375 },

      { name: "Sarah Palin", desc:"Portent of Things To Come", slug:"sarahpalin", value:200 },
      { name: "Sebastian Gorka", desc:"Trump Strategist", slug:"sebastian_gorka", value:99 },
      { name: "Sean Spicer", desc:"Former White House Press Secretary", slug:"seanspicer", value:99 },

      { name: "Ice Cube", desc: "Helped Trump Solve Racism", slug:"donmega69", value:500 },
      { name: "Donald Trump Jr.", desc:"Idiot", slug:"donaldjtrumpjr", value:500 },
      { name: "George Papadopoulos", desc:"Served Twelve Days In Prison Before Getting Pardoned", slug:"papadopoulos", value:250 },
    ]
  },

  test: {
    name: "TEST",
    desc: "does my shit work.",
    queue: [
      // { name: "Ben Stein", desc:"Said “Bueller?” in Ferris Bueller's Day Off", slug:"benstein99", value:150 },
      // { name: "Bob Bergen", desc:"Voice Actor, Porky Pig (1990 - present)", slug:"bobbergen", value:200 },
      // { name: "Count Binface", desc:"Formerly Lord Buckethead", slug:"countbinface", value:45 },

      // { name: "David Siegel", desc:"George Clooney Lookalike", slug:"davidasclooney", value:85 },
      // { name: "Donald Trump Jr.", desc:"Idiot", slug:"donaldjtrumpjr", value:500 },
      // { name: "Don Johnson", desc:"Sonny on Miami Vice", slug:"donjohnson", value:500 },

      // { name: "George Shea", desc:"You Know Those Hot Dog Eating Contests? This Is The Guy That Emcees Them.", slug:"gcshea", value:50  },
      // { name: "George Clanton", desc:"Vaporwave Musician", slug:"georgeclanton", value:69 },
      

      // { name: "George", desc:"A Dog", slug:"georgegsd", value:999 },
      // { name: "George Lowe", desc:"Space Ghost", slug:"georgeloweofficial", value:100 },
      // { name: "George Wallace", desc:"The Legendary Comedian (Not The Racist Senator)", slug:"georgewallace", value:50  },

      { name: "Horny Mike", desc:"Airbrushes Cars, Sometimes Wears A Bandana With Horns On It", slug:"hornymike", value:50  },
      { name: "John Bercow", desc:"The Guy That Used To Say “Order” In The House of Commons", slug:"johnbercow", value:110 },
      { name: "Juicy J", desc:"Member of Three 6 Mafia", slug:"juicyjay", value:500 },

      { name: "Kody Brown", desc:"Has Four Wives, TLC Made A Show About It", slug:"kodywinnbrown", value:75 },
      { name: "Nigel Farage", desc:"Caused Brexit, Pretty Much", slug:"nigelfarage", value:100 },
      { name: "Rudy W. Giuliani", desc:"No longer licensed to practice law.", slug:"rudygiuliani", value:375 },  

      { name: "Ruth Buzzi", desc:"Cast Member, Rowan & Martin's Laugh-In", slug:"ruth_buzzi", value:500 },
      { name: "Shirtless Violinist", desc: "Plays The Violin (Without A Shirt On)", slug:"shirtlessviolinist", value:250 },
      { name: "Wayne Knight", desc:"Newman on Seinfeld, Nedry in Jurassic Park", slug: "wanite1", value:330 },

      { name: "George Foreman", desc:"Has Five Sons Named George (And A Daughter Named Georgetta)", slug:"georgeforeman", value:750 },
      { name: "George Lowe", desc:"Space Ghost", slug:"georgeloweofficial", value:100 },
      { name: "George Wallace", desc:"The Legendary Comedian (Not The Racist Senator)", slug:"georgewallace", value:50  },
    ]
  }
};

/*
///////////////////////////////////////////////////////////
// These people ARE in gimmick rounds, but ARE NOT in the basic game.
{ name: "Richard Blais", desc:"Perennial Top Chef Contestant", slug:"richardblais", value:115 },
{ name: "Richard Hatch", desc:"Winner, Survivor Season 1", slug:"richhatch", value:50 },
{ name: "Richard Dreyfuss", desc:"Hooper in Jaws", slug:"richarddreyfuss1", value:999 },
{ name: "Richard Patrick", desc:"Vocals, Filter", slug:"filter_richard_patrick", value:70 },
{ name: "Richard Roeper", desc:"Movie Critic, Formerly of Ebert & Roeper", slug:"richarderoeper", value:55 },
{ name: "Richard Brake", desc:"The Night King on Game of Thrones", slug:"richbrake", value:80 },
{ name: "Richard Turner", desc:"Bassist, Blackberry Smoke", slug:"richardturner", value:50 },
{ name: "Richard Petty", desc:"NASCAR driver", slug:"rlpetty43", value:250 },
{ name: "Richard Rosenblatt", desc:"Former Chairman of MySpace", slug:"richardrosenblatt", value:30 },
*/