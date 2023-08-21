const minglingHeadlines = [
  ["you're getting to", "know people"],
  ["you are", "mingling"],
  ["you are", "introducing yourself"],
  ["you're just", "getting started"]
];

const moodHeadlines = {
  veryGood: [
    ["you are", "beloved"],
    ["you are", "the hit of the party"],
    ["people think", "you're amazing!"],
    ["you're doing", "fantastic!"]
  ],
  prettyGood: [
    ["you are", "generally liked"],
    ["you are", "fairly popular"],
    ["people think", "favorable things about you"],
    ["you're doing", "rather well!"],
  ],
  neutral: [
    ["you are", "doing okay"],
    ["you are", "neither loved nor hated"],
    ["people think", "you're fine"],
    ["you're doing", "okay, I suppose."]
  ],
  prettyBad: [
    ["you are", "disliked"],
    ["you are", "unpopular"],
    ["people think", "you're kinda lousy"],
    ["you're doing bad", "please improve"]
  ],
  veryBad: [
    ["you are", "awful"],
    ["you are", "uniformly hated"],
    ["people think", "you totally suck"],
    ["you are", "failing"]
  ]
};

const partyMoods = {
  veryGood: [
    "A rather dour looking woman informs you that she is a talent agent and exclaims loudly “You've got the goods!” You're unclear what specific goods she's speaking of, but tell her you appreciate her saying so.",
    "You tell what you feel to be a pretty lackluster anecdote and are met by loud laughter and honest-to-god applause.",
    "“All I wanna do” you exclaim, “is a zoom zoom zoom, and a boom boom.” At that, several guests inform you to shake your rump.",
    "You ask several of the guests to follow you on Twitter and a few people take out their phones.",
    "After several rousing and very fake stories, you notice one guest constantly shouting out positive remarks on cue. You've picked up a hype man.",
    "The lights turn down and you are lit by a bright spotlight. After a short announcement, much applause, and a very nice tiara, you are crowned Best Party Guest.",
    "The music picks up and a conga line forms with you at the head.",
    "An Elon Musk impersonator invites you to a party at his yacht next weekend. You're sure he doesn't own a yacht, but appreciate the invitation regardless.",
    "You receive several compliments on your Gore Vidal impression, even though you were trying to do a George Will.",
    "You hit it off with a Key and Peele pair and they invite you to the photobooth to commemorate your new friendship.",
    "Both you and a Joan Rivers jump into the air at the same time and manage to land a sweet high five. One of the guests even managed to snap a good photo.",
    "Taking you aside in confidence, the Ozzy Osborne shows you the best way to bite a head off a bat - you have a sweet new party trick!",
    "You are challenged to a TV show theme karaoke contest and remembered all of the lyrics to <i>Fresh Prince of Bel Aire</i>.",
    "The crowd parts before your magnificence, and the choicest impersonators make their way over to greet you.",
    "Another impersonator runs up with a Paul Rudd action figure and a marker, asking you to sign the box.",
    "A lovely Janet Jackson impersonator asks you to help reenact the waltz from <i>Crimson Peak</i>.",
    "You are made an honorary fourth Amigo.",
    "The Mr. T impersonator gifts you one of his fine gold chains, as his grandfather would have wanted it.",
    "You are invited back to the private Casino Royal poker room for a round. You win $10 before heading back out to the party."
  ],
  prettyGood: [
    "You give finger guns to three separate people whom you have never met. Only one of those makes a face like you just farted. You consider this a statistical success.",
    "You brush against a nearby woman but manage to catch her arm before she spills her glass of red wine all over you.",
    "A departing guest asks where the nearest Target is. You give him directions, and are <i>mostly</i> right!",
    "You find yourself caught in a surprise game of beer pong and don't play well, but catch a nice buzz as a result.",
    "You find a Starburst in your pocket. A pink one, too. Yum.",
    "You are granted a moments reprieve from the guests by ducking under a nearby cocktail table. You finish your drink in relative peace before going out again.",
    "You run into an old friend from high school and at least manage to remember their first name.",
    "You get an old fashioned at the bar and find a few dollars in your pocket to tip the bartender.",
    "You accidentally quote a line from <i>Monty Python And The Holy Grail</i> and nobody seems to mind. Lucky break!",
    "You and a Morticia Addams hang around the punch bowl for a few minutes making morbid jokes, and you mostly manage to keep up.",
    "You run into a Jean Luc Picard impersonator and he humors you with a “Make it so”.",
    "A guest graces your story with a slight grin and politely laughs before wandering off.",
    "The Elvis impersonator asks you to hold a small mirror while he fixes his hair."
  ],
  neutral: [
    "You gleefully recount your favorite scene from one of the Teenage Mutant Ninja Turtle movies, which nobody you're talking to has seen.",
    "You almost get into a conversation about Bitcoin, but thankfully reconsider.",
    "“This is fun.” you say to nobody.",
    "You start humming a tuneless melody to yourself.",
    "You sip on red wine and manage not to spill it on your shirt.",
    "The swan napkins on the hors d'oeuvres are looking sad, and you take a few minutes to refold them.",
    "You walk around the perimeter of the room and look for an easy conversation to slip into.",
    "You hold out your hand to shake an impersonator's hand, but they just walk by.",
    "The weather seems nice outside. Not too hot, not too cold.",
    "You fiddle with your phone, checking the forum to see if anyone posted in your thread. They haven't, the snakes.",
    "You count the ceiling tiles for a few minutes.",
    "You stop by the drink table for a cup of punch.",
    "You ask someone for directions to the bathroom. Just in case.",
    "You rock back and forth on your feet for awhile.",
    "You pluck at your shirt a bit and adjust your vest.",
    "Just how many seasons of <i>Survivor</i> are there? Is that still going?",
    "You nibble on a cracker. It's a little bland, could use something."
  ],
  prettyBad: [
    "The opening riff of Dee-Lite’s “Groove Is In The Heart” starts to play, and you make an utterly nonsensical joke about Grobin In The Heart? Like, Josh Grobin is in your heart? Something like that. It is a <i>terrible</i> joke and everybody heard it.",
    "Nervous, you try to shift the conversation to the latest gossip, something about the Renaissance hotel using a blue cheese and mozzarella mix. But this only raises more suspicion about your intent.",
    "Calling for everyone's attention, you unscrew and drink a Mickey's Big Mouth in less than two seconds, believing it will impress people. It doesn't.",
    "You start talking about javascript, disappointingly unaware that nobody ever wants to hear anybody else about javascript.",
    "Three separate guests inform you that no matter what song ends up playing, they never want to see you twerk again.",
    "It's unclear exactly what provoked you to start singing a Björk song at that moment, but it's immediately clear you shouldn't have picked something from Volta.",
    "In a desperate attempt to distract the guests from your bland outfit you rip the tablecloth off the nearest table, but every dish lands on the floor.",
    "You start to dance like Elaine from <i>Seinfeld</i>, but instead of catching the reference everyone now thinks you are just a terrible dancer.",
    "You start talking about anime and your plushie collection - this is a <i>terrible</i> mistake.",
    "A guest sees you give yourself a high five and is disgusted.",
    "As a joke, you link together sixteen straws to drink from a Drew Barrymore impersonator's glass. She, and many other people, find it creepy.",
    "You try to slip past a large, tight-knit group of guests and instead trip and tip over a table.",
    "Someone catches you looking at IMDb on your phone and snorts.",
    "In an attempt to impress the Halle Berry impersonator, you proclaim that her Catwoman is your favorite. She leaves the conversation immediately.",
    "You get into a impression fight with the Austin Powers on who can say “YEAH BABY” better. This goes on for fifteen minutes.",
    "You touch a Whoopi Goldberg impersonator's hair. Seriously, what is wrong with you!?",
    "You jokingly ask the John F. Kennedy who actually shot him, suddenly trapping yourself in an hour long conspiracy screed involving Greenland and several Swedes.",
    "You hear a fervent knocking at the side door, a cracked voice asking to be let in. You open the door and a Larry the Cable Guy stumbles in and the guests groan.",
    "You mistake a Hank Williams Sr. for Hank Williams Jr. and he slams his guitar into the ground over the offense.",
    "You start making rude gestures in the face of a Stevie Wonder for a laugh, forgetting that the impersonator isn't blind.",
    "A Rick Astley impersonator scoffs at you.",
    "You steal the Will Smith impersonator's Men In Black neuralyzer and run around flashing people directly in the eyes. No one is amused.",
    "Turns out there are people who still haven't seen <i>The Sixth Sense</i>, especially that buff Bruce Willis impersonator. Tough break.",
    "Everyone shouts “Norm!” when the impersonator walks in. Everyone also heard you shout “Neal!”"
  ],
  veryBad: [
    "A joke about Harvey Weinstein goes <i>way</i> off the rails and comes off as overtly anti-semitic. A Scarlett Johansson impersonator asks who let you in here, and you feel sweat on your forehead.",
    "You make an offhand comment about an Edward Scissorhands' props, asking him if he wrapped plastic safety scissors from the Dollar Store in tinfoil. He bursts into tears and runs out of the room, bits of foil falling on the ground in his wake.",
    "Unable to keep up with the flood of pointless references, you accidentally let drop that you don't <i>actually like movies.</i> The whole party goes silent, a glass falls to the floor and shatters.",
    "You see a guy who kind of looks like Kid from Kid N' Play, and try to do that one dance move where you kick each other's feet. You spend the next 5 minutes apologizing and looking for an ice pack.",
    "You steal the Michael J. Fox's guitar and attempt to reenact the scene from <i>Back to the Future</i> and remember too late that you don't know how to play guitar. Also the guitar is a solid piece of foam.",
    "You tell the Scarlet O'Hara impersonator that “Frankly my dear, I don't give a damn!” when she politely asks you to move. She slaps you.",
    "Thinking the Al Sharpton impersonator is the <i>real</i> Al Sharpton, you make the comment that anyone that dresses up like a public figure is a freak.",
    "You run up behind the Robert Pattinson and start spraying glitter all over his suit; he then goes into anaphylactic shock. The Kristen Stewart slams the epi pen into his leg just in time.",
    "You start a fistfight with all of the different James Bonds about which Bond is best. What guests didn't see you start it certainly do not appreciate you trying to take bets.",
    "You ask the Pope John XII how his harem is fairing, only to realize too late that he was actually Pope John Paul II.",
    "A Sally Rand breaks out her ostrich feathers and sentiously starts to perform her famous fan dance for the crowd. You take this moment to ask loudly where the bathroom is and don't stop until she answers.",
    "The Willy Wonka impersonator seeks you out specifically, hands you a plate of cheese and slaps it out of your hands, screaming “YOU GET NOTHING SIR, GOOD DAY!”",
    "You brush past the Betty Boop impersonator, but the moment your hand brushes her thin, matchstick waist she snaps in half. The screams will never leave you.",
    "The Sean Connery impersonator asks you what Connery movie was your favorite. All you can remember is <i>League of Extraordinary Gentlemen</i>, and he is incensed."
  ],

  noChange: [
    "In a poorly lit corner, you see an Ashton Kutcher impersonator making out with a Demi Moore impersonator. A few feet away, a Bruce Willis impersonator is seemingly unphased by all of this, which seems oddly progressive.",
    "You notice a Carrot Top impersonator making his third trip out to the car to gather props for a joke he has planned. Nobody helps him, including you.",
    "Several people shout “murderer!” in unison, which briefly confuses you until the second time when you realize they were singing along to <i>Here Comes The Hotstepper</i>.",
    "Despite the overactive air conditioning in the room, a guy who looks like Glenn Danzig seems comfortable in his mesh tank top. Also he might actually be Glenn Danzig.",
    "A few feet away is somebody who might be either a Brendan Eich impersonator or Brendan Eich himself. Regardless, nobody wants to talk to him about javascript.",
    "A discussion occurs about that one episode of <i>Nathan For You</i> with the Bill Gates impersonator. You miss most of the important details.",
    "You wonder if there had been a squabble over the party theme, every impersonator vying to have <i>their</i> movie recreated in the space. The result was a mixture of an 80s high school prom, derelict building props on the walls, medieval glassware, and just too much glitter.",
    "To pass the time you try to guess which impersonators spent the most money on their costumes.",
    "You watch as a Criss Angel and Queen Latifah stumble into the party late. Someone started the festivities elsewhere.",
    "There's a Crocodile Dundee impersonator? Just how much work does he get nowadays?",
    "Someone mentions seeing a very impressive Jaws impersonator, and for a moment your heart skips at thought of a man in a giant shark costume. At least the metal teeth were well crafted.",
    "The Hannibals from <i>Silence of the Lambs</i> and <i>Hannibal</i> get into a fight over the legitimacy of the tv series.",
    "The Mad Hatter from the Tim Burton <i>Alice in Wonderland</i> passes by without noticing you. Phew!"
  ]
};
