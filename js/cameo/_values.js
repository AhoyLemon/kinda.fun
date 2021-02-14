const allValues = [
  { name: "Kevin O'Leary", desc:"Shark Tank", slug:"mrwonderful", value:1200 },
  { name: "Randy Quaid", desc: "Eddie in the National Lampoon Vacation movies", slug:"vbn", value:1000 },
  { name: "Crowder", desc: "Contemporary Christian Musician", slug:"crowder", value:1000 },
  { name: "Mike Jones", desc:"Who? Mike Jones. Who? Mike Jones. Who? Mike Jones", slug:"where_mikejones", value:999 },
  { name: "Steve Harvey", desc:"Game Show Host", slug:"steveharvey", value:750 },
  { name: "Dennis Rodman", desc:"Friends With Kim Jong-un", slug:"dennisrodman", value:750 },
  { name: "Tom Felton", desc:"Draco in Harry Potter", slug:"t22felton", value:599 },
  { name: "Lil' Kim", desc:"Formerly of Junior M.A.F.I.A.", slug:"lilkimthequeenbee", value:500 },
  { name: "Ice T", desc: "Law & Order: SVU", slug:"icet", value:500 },
  { name: "Ice Cube", desc: "Actor, Friday", slug:"donmega69", value:500 },
  { name: "Mehmet Oz", desc: "Still has a medical license for some reason", slug:"droz", value:500 },
  { name: "Steve Wozniak", desc: "Apple Co-Founder", slug:"stevewoz", value:500 },
  { name: "LeVar Burton", desc:"Host, Reading Rainbow", slug:"levarburton", value:450 },
  { name: "Chuck Norris", desc:"Movie Kicker", slug:"chucknorris", value:450 },
  { name: "John Cleese", desc:"Member, Monty Python", slug:"notsirjohncleese", value:450 },
  { name: "Tommy Lee", desc:"Former Husband, Pamela Anderson", slug:"tommylee", value:400 },
  { name: "Flavor Flav", desc:"Formerly of Public Enemy", slug:"flavorflav", value:400 },
  { name: "Jeremy Piven", desc:"Ari on Entourage", slug:"jeremypiven", value:400 },
  { name: "Tacko Fall", desc:"7'5\" NBA Basketball Player", slug:"tackofall99", value:400 },
  { name: "Jackie Mason", desc:"Rabbi Hyman Krustofski on The Simpsons", slug:"jackiemason", value:350 },
  { name: "Insane Clown Posse", desc:"Unaware of how magnets work", slug:"icp", value:350 },
  { name: "Lindsay Lohan", desc:"Actress, The Parent Trap", slug: "lindsaylohan", value:350 },
  { name: "Ghostface Killah", desc: "Member of Wu-Tang Clan", slug: "realghostfacekillah", value:350 },
  { name: "Pauly Shore", desc: "Bio-Dome & Encino Man", slug: "paulyshore", value:350 },
  { name: "Dolph Lundgren", desc: "Ivan Drago, Rocky IV", slug: "dolphlundgren", value:350 },
  { name: "Vicente Fox", desc:"Former President of Mexico", slug: "presidentfox", value:300 },
  { name: "Jonathan Frakes", desc:"Riker on Star Trek TNG", slug: "windyoaks", value:300 },
  { name: "The Situation", desc:"MTV's Jersey Shore", slug: "mikethesituation", value:300 },
  { name: "Boy George", desc:"Singer, Culture Club", slug: "boygeorge5", value:300 },
  { name: "Blac Chyna", desc: "Model & Socialite", slug: "blacchyna", value:300 },
  { name: "Ted Nugent", desc: "Gun Enthusiast", slug: "tednugent", value:300 },
  { name: "Ray Lewis", desc: "NFL Hall of Famer & Suspected Accessory To Murder", slug: "raylewis", value:300 },
  { name: "Andrew Dice Clay", desc:"Sold Out Madison Square Garden", slug: "diceman", value:299 },
  { name: "Scott Stapp", desc:"Singer, Creed", slug: "scottstapp", value:299 },
  { name: "Chris Diamantopoulos", desc:"Russ Hanneman in Silicon Valley", slug: "chrisdiamantopoulos", value:299 },
  { name: "Kenny G", desc: "Saxophonist", slug:"kennyg", value:295 },
  { name: "Krysten Ritter", desc: "The B---- in Apartment 23", slug: "krystenritter", value:275 },
  { name: "Joe Piscopo", desc: "Star of Dead Heat", slug:"joepiscopo", value:250 },
  { name: "Brent Spiner", desc: "Data on Star Trek TNG", slug:"brentspiner", value:250 },
  { name: "Stormy Daniels", desc: "Hush Money Recipient", slug:"stormydaniels", value:250 },
  { name: "Hide The Pain Harold", desc: "Photo Meme", slug:"hidethepainharold", value:250 },
  { name: "Steve Guttenberg", desc:"Police Academy 1-4", slug:"steveguttenberg", value:250 },
  { name: "Jonathan Goldsmith", desc:"The Most Interesting Man, Dos Equis Commercials", slug:"stayinteresting", value:250 },
  { name: "Richard Marx", desc:"Wherever you go, whatever you do, he will be right here waiting for you.", slug:"richardmarx", value:250 },
  { name: "Dakota Skye", desc:"Porn Actress", slug:"dakota_skye", value:240 },
  { name: "Micky Dolenz", desc:"One Of The Monkees", slug:"mickydolenz", value:239 },
  { name: "David Koechner", desc:"Champ in Anchorman", slug:"davidkoechner", value:225 },
  { name: "Corey Feldman", desc:"Mouth in The Goonies", slug:"cdogg22", value:202 },
  { name: "Dog the Bounty Hunter", desc:"Had a reality show on A&E", slug:"dogthebountyhunter", value:200 },
  { name: "Jaleel White", desc:"Urkel", slug:"jaleelwhite", value:200 },
  { name: "Dee Snider", desc:"Singer - Twisted Sister", slug:"deesnider", value:200 },
  { name: "George Clinton", desc:"Parliament Funkadelic", slug:"george_clinton", value:200 },
  { name: "Henry", desc:"aka The NoTortoise BIG", slug:"thenotortoisebig", value:200 },
  { name: "John Popper", desc:"Singer & Harmonica Player, Blues Traveler", slug:"johnpopper", value:200 },
  { name: "Punxsutawney Phil", desc:"World Famous Groundhog", slug:"punxsyphil", value:199 },
  { name: "Coolio", desc:"Cowrote Gangsta's Paradise", slug:"therealcoolio", value:199 },
  { name: "Dr Drew", desc:"Celebrity Doctor, “Loveline”", slug:"drdrew", value:198 },
  { name: "Meat Loaf", desc:"Contestant, The Celebrity Apprentice", slug:"meatloaf", value:170 },
  { name: "Redman", desc:"Friends with Method Man", slug:"redman", value:160 },
  { name: "Sir Mix-A-Lot", desc:"Likes Big Butts", slug:"therealsirmixalot", value:150 },
  { name: "Tommy Chong", desc:"Marijuana Enthusiast", slug:"tommychong", value:150 },
  { name: "Adam Duritz", desc:"Counting Crows", slug:"countingcrows", value:150 },
  { name: "Jon Lovitz", desc:"SNL", slug:"jonlovitz", value:150 },
  { name: "Gilbert Gottfried", desc:"Iago in Aladdin", slug:"gilbertgottfried", value:150  },
  { name: "Jamie Lynn Sigler", desc:"Meadow on The Sopranos", slug:"jamielynnsigler", value:150  },
  { name: "Bret “Hitman” Hart", desc:"Former Professional Wrestler", slug:"hitman", value:150  },
  { name: "Alfonso Ribeiro", desc:"Carlton on The Fresh Prince of Bel-Air", slug:"therealalfonsoribeiro", value:150  },
  { name: "Barry Williams", desc:"Greg on The Brady Bunch", slug:"barrywilliams", value:140  },
  { name: "Penn Jillette", desc:"Penn & Teller", slug:"pennj", value:135  },
  { name: "Jerry Springer", desc:"Former Mayor of Cincinnati", slug:"jerryspringer", value:135 },
  { name: "Ernie Hudson", desc:"Winston in Ghostbusters", slug:"kirbyzook", value:135 },

  { name: "Violent J", desc:"Insane Clown Posse", slug:"violentj.icp", value:135  },
  { name: "Shaggy 2 Dope", desc:"Insane Clown Posse", slug:"shaggy.icp", value:134 },

  { name: "Chris Kirkpatrick", desc:"Formerly of *NSYNC", slug:"iamckirkpatrick", value:129 },
  { name: "Victoria Jackson", desc:"SNL", slug:"victoria_jackson_official", value:125 },
  { name: "Tom Arnold", desc:"Was briefly married to Roseanne", slug:"thetomarnold", value:125 },
  { name: "Jamie Farr", desc:"Klinger on M*A*S*H", slug:"jamiefarr1", value:125 },
  { name: "Takeru Kobayashi", desc:"Competitive Eater", slug:"takerukobayashi", value:120 },

  { name: "Steve Carlson", desc:"One of the guys from the movie Slapshot", slug:"scarlson17", value:117  },
  { name: "Dave Hanson", desc:"One of the guys from the movie Slapshot", slug:"davehanson16", value:116  },

  { name: "Colin Mochrie", desc:"Perennial Contestant, Whose Line is it Anyway?", slug:"colinmochrie7591", value:110 },
  { name: "Fiona the Hippo", desc:"The Cincinnati Zoo’s premature baby hippo", slug:"fionathehippo", value:100 },
  { name: "Dave Foley", desc:"Kids in the Hall", slug:"dsf", value:100 },
  { name: "Mick Foley", desc:"Former Professional Wrestler", slug:"mickfoley", value:100 },
  { name: "Burton Gilliam", desc:"“Lyle” in Blazing Saddles", slug:"camptownladies", value:100 },
  { name: "Montell Jordan", desc:"Singer, “This Is How We Do It”", slug:"mrjordan1911", value:100 },
  { name: "Michael Cohen", desc:"Disbarred Legal Fixer", slug:"michaelcohen212", value:100 },
  { name: "Vincent Curatola", desc:"Johnny Sack on The Sopranos", slug:"vincentcuratola", value:100 },
  { name: "Lisa Loeb", desc:"You say she only hears what she wants to.", slug:"lisaloeb", value:100 },
  { name: "Richard Karn", desc:"Al on Home Improvement", slug:"richardkarn", value:100 },
  { name: "Doug Bradley", desc:"Pinhead in Hellraiser", slug:"dougbradley", value:100 },
  { name: "Don Juan", desc:"Former Pimp", slug:"bishopdonjuan", value:100 },
  { name: "Wayne Coyne", desc:"Singer, Flaming Lips", slug:"waynecoyne", value:100 },
  { name: "Richard Kline", desc:"Larry on Three's Company", slug:"larrydallas", value:100 },
  { name: "Dean Ween", desc:"1/2 Of Ween", slug:"deanween", value:99 },
  { name: "Andy Dick", desc:"Newsradio", slug:"andydick", value:99 },
  { name: "Chris Kattan", desc:"Played a monkey called Peepers on SNL", slug:"chriskattan", value:95 },
  { name: "HR", desc:"Front Man, Bad Brains", slug:"hrmusic", value:95 },
  { name: "Gibby Haynes", desc:"Singer, Butthole Surfers", slug:"gibbyhaynes", value:95 },
  { name: "Mark McGrath", desc:"Singer, Sugar Ray", slug:"markmcgrath", value:90  },
  { name: "Jay Mohr", desc:"Actor, The Ghost Whisperer", slug:"jaymohr", value:88  },
  { name: "Chumlee", desc:"Pawn Stars", slug:"chumlee", value:85  },
  { name: "Donald Gibb", desc:"Ogre in Revenge of the Nerds", slug:"ogre1", value:85  },
  { name: "RiFF RAFF", desc:"Public Nuisance", slug:"riffraff", value:80 },
  { name: "Rod Blagojevich", desc:"Convicted Felon", slug:"rblagojevich", value:80 },
  { name: "Larry Thomas", desc:"The Soup Nazi", slug:"realsoupnazi", value:80 },
  { name: "Jennifer Elise Cox", desc:"Jan on The Brady Bunch", slug:"jenniferelisecox", value:75 },
  { name: "Dana Snyder", desc:"Voice of Master Shake", slug:"eyeofthesnyder", value:75 },
  { name: "Didi Conn", desc:"Frenchy in Grease", slug:"didiconn1", value:75 },
  { name: "Roger Stone", desc:"Commuted Felon", slug:"rogerstone", value:75 },
  { name: "Danny Bonaduce", desc:"The Partridge Family", slug:"dannybonaduce", value:75 },
  { name: "Butterbean", desc:"Professional Boxer (Retired)", slug:"butterbean67", value:75 },
  { name: "Hacksaw Jim Duggan", desc:"Former Professional Wrestler", slug:"hacksawjimduggan", value:75 },
  { name: "Doug E. Fresh", desc:"La Di Da Di, He Likes To Party", slug:"dougeversofresh", value:75 },
  { name: "Peter Keys", desc:"Keyboardist for Lynyrd Skynyrd", slug:"peterkeys", value:75 },
  { name: "John Kassir", desc:"Voice Actor of the Crypt Keeper", slug:"cryptkeeper", value:70  },
  { name: "Steve Wilkos", desc:"Former Security, “The Jerry Springer Show”", slug:"stevewilkos", value:70  },
  { name: "KID from Kid N Play", desc:"Costar of House Party 1, 2 & 3", slug:"kidfromkidnplay", value:65  },
  { name: "Kato Kaelin", desc:"Stayed At OJ's House", slug:"kato", value:60 },
  { name: "Anthony Scaramucci", desc:"Former White House Communications Director", slug:"themooch", value:55 },
  { name: "Bonnie Chapman", desc:"Daughter of Dog The Bounty Hunter", slug:"bonniejoc", value:50  },
  { name: "Deep Roy", desc:"Oompa Loompa in the 2015 Willy Wonka movie", slug:"deeproy", value:50  },
  { name: "Xanman", desc:"Rapper", slug:"theonlyxanman20", value:50  },
  { name: "Chris Hansen", desc:"Host, “To Catch A Predator”", slug:"chansen", value:50  },
  { name: "iAmMoshow", desc:"The Cat Rapper", slug:"iammoshow", value:50 },
  { name: "Max Cavalera", desc:"Vocalist, Sepultura", slug:"maxcavalera", value:50 },
  { name: "April & Phil Margera", desc:"Bam Margera's Parents", slug:"aprilmargera", value:50 },
  { name: "Jonathan Schmock", desc:"The Maître D' in Ferris Bueller's Day Off", slug:"snooty", value:50 },
  { name: "June Shannon", desc:"Honey Boo Boo's Biological Mother", slug:"mamajune", value:50 },
  { name: "D-Roc", desc:"One of the Ying Yang Twins", slug:"yingyangtwins", value:50 },
  { name: "Squid the Griff", desc:"Instagram Dog", slug:"squidthegriff", value:50 },
  { name: "Prince Charles-Henri de Lobkowicz", desc:"French Nobleman", slug:"princecharleshenri", value:50 },
  { name: "Paul Chuckle", desc:"One of the Chuckle Brothers", slug:"chuckle", value:49 },
  { name: "Paula Poundstone", desc:"Panelist, “Wait Wait... Don't Tell Me”", slug:"paulap33", value:49 },
  { name: "Kevin Allison", desc:"RISK! Podcast", slug:"thekevinallison", value:45 },
  { name: "Evan Antin", desc:"Veterinarian", slug:"dr.evanantin", value:45 },
  { name: "Sleazy P Martini", desc:"Manager, GWAR", slug:"sleazymartini", value:40 },
  { name: "Tay Zonday", desc:"Chocolate Rainmaker", slug:"tayzonday", value:40 },
  { name: "Smelly", desc:"Drummer for NOFX", slug:"sandin", value:40 },
  { name: "Kevin McDonald", desc:"Kids in the Hall", slug:"teaguy1", value:40 },
  { name: "Cat Drawing Guy", desc:"Contestant on Shark Tank", slug:"catdrawingguy", value:39 },
  { name: "Les Gold", desc:"Hardcore Pawn", slug:"lesg", value:35 },
  { name: "Andy Kindler", desc: "Mort on Bob's Burgers", slug:"andykindler", value:35 },
  { name: "Chris Gethard", desc: "Host, “The Chris Gethard Show”", slug:"chrisgeth", value:35 },
  { name: "Tim Ripper Owens", desc: "Singer of Judas Priest during Rob Halford's Hiatus", slug:"ripper", value:35 },
  { name: "Tennis", desc:"Inessential service", slug:"tennisinc", value:30 },
  { name: "Radioman", desc: "Actor in Little Nicky", slug:"radioman", value:30 },
  { name: "Eamon Sandwith", desc: "Vocals & Bass, The Chats", slug:"eamonsandwith", value:30 },
  { name: "Perry Richardson", desc: "Bassist, Stryper", slug:"perryrichardson", value:29 },
  { name: "Evan Stone", desc: "Porn Actor", slug:"evanstone", value:29 },
  { name: "Ken Bone", desc:"Wore a red sweater at a Presidential debate", slug:"kenbone18", value:25 },
  { name: "Vermin Supreme", desc:"Presidential Candidate & Performance Artist", slug:"verminsupreme", value:25 },
  { name: "David Ellefson", desc:"Bassist, Megadeth", slug:"davidellefson", value:25 },
  { name: "Kyle Troup", desc:"Professional Bowler", slug:"afrofish300", value:25 },
  { name: "Jonah Falcon", desc:"Has a 13.5\" penis. Talks about it a lot", slug:"jonahfalcon1970", value:25 },
  { name: "Boffo The Bear", desc: "YouTube Comedy Bear", slug: "boffothebear", value:20 },
  { name: "Ray Williams", desc: "Olympic Deadlifter", slug: "optimusprime_334", value:20 },
  { name: "Ryan Creamer", desc:"Star of non-pornographic PornHub videos", slug: "coolboyryan", value:20 },
  { name: "Bobo Sasquatch", desc:"Finding Bigfoot", slug: "bobosquatch", value:20 },
  { name: "Jonathan Donais", desc:"Guitarist, Anthrax", slug: "jondonais", value:15 },
  { name: "Puggy Smalls", desc:"Dog", slug: "thepuggysmalls", value:15 },
  { name: "Matt Hoffman", desc:"CBS - Big Brother", slug: "bb12matt", value:13 },
  { name: "Alex Kack", desc:"Also known as #greenshirtguy", slug: "alex_kack", value:10 },
];