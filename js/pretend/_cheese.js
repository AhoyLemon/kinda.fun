const cheeseIntroHeadlines = [
  "Look at that!",
  "Look over there!",
  "Ooooh, look!",
  "What's this!?",
  "Check it out!",
  "Humina humina!",
  "Oh. My. God."
];

const cheeseIntroMessages = [
  //"These parties always have impressive spreads that spared no expense; figs from the middle east, the fresh caviar from Russia, and freshly baked pastries from France. All garbage for peasants. This cheese log is the true treasure."
  "On the other side of the room you notice a few snacks: Some croissants, potato chips, deviled eggs: This is all garbage for peasants. But among this trash you notice a cheese log, and this is your mission. You <i>must</i> get to this cheese log",
  "One of the reasons you so enjoy crashing parties like this is because there's often decent snacks. This time though? This time they have a cheese log. You must have it.",
  "For a moment you consider trying to crash some other party until, on the other side of the room, you notice a cheese log, and you become suddenly obsessed. This cheese log is now your mission in life.",
  "It was just your regular impersonator party, packed to the brim with photocopies of the who's who. But over there, you saw her. 3 inches in diameter, 7 inches in length for a voluptious volume of 49.48 packed full of the finest cheese available. That cheese log was the real treasure of the party, and you NEED it."
];

const cheeseStatus = {
  close: [
    "You’re so close now, the table almost within arms reach. You can see each mustard seed gracing the surface, and the glistening cheese throwing you “come hither” looks over the guests' shoulder. It won’t be long now, my dairy love.",
    "Your presence near the cheese log is now what could fairly be described as menacing. You run your tongue over your teeth.",
    "The cheese is just barely beyond your reach, its golden interiors gracefully spread open to your waiting touch. If only you could hurry through this conversation.",
    "You wipe the corner of your mouth with a furtive hand while the impersonator before you continues to prattle on about accurate props. The earthy, sharp scent of cheese fills your nostrils it's so close.",
    "Your nose can now smell the tangy sharpness of the cheese, and you salvate at the immediate future of feasting.",
    "The distance was small, but the three foot gap transformed into a massive chasm before your very eyes, and cheddar beauty lay far beyond.",
    "Had Romeo felt the same as you? Your fairest love just barely beyond your grasp, trading cheesy love notes between a wall of imprsonators, but never touching? You certainly felt as if you would die without the log.",
    "The table was unbearably close now. You roll up your sleeves and tie on a bib in anticipation.",
    "There was no thought of accoutrements anymore, no thought given to what cracker would suffice or what wine would pair best. The log would go straight into your mouth, and you would feel no remorse.",
    "You pull out your custom cheese sampling knife, the handle notched with all of your cheesy conquests.",
    "The cheese log now a few feet away, you begin to compose a post for your blog Cheezus Jesus about its many wonders and mouthfeel.",
    "You pop some grated ginger into your mouth to cleanse your palete for the cheese feast before you, removing the taste of the base wine and mini wieners.",
    "A shudder rolls down your body as you think about that log in your hand, your fingers gently running down the almond sides; it is as if you were already there.",
    "You think indecent things about cheese - it's a little inappropriate."
  ],
  medium: [
    "Would the courts accept love of cheese as an acceptable excuse for manslaughter? Surely no jury could hold you accountable, as the cheese is what separates us from animals, as the animals at this party are keeping you from obtaining cheese enlightenment.",
    "You reach into your pocket, thumbing the little yellow diary you keep of past cheese love affairs. Long has the pistachio fig brie peacock sculpture from last year’s Honey Soiree been your top prize, but the one before you is sure to take that spot in your heart.",
    "You relax your focus a bit, and notice some salami on the west end of the table. A water cracker, the salami, maybe a sliced green olive, and that wonderful, wonderful cheese. Soon this dream will become a reality.",
    "The constant guessing has left you exhausted and questioning your motives. Maybe this was too much? But then you glance over at the snacks table once more, and are filled with a renewed sense of purpose.",
    "History has always tested it's greatest men with adversity, and it is with a sense of pride and determination that you muddle through your task to the greatest prize - cheese.",
    "With every step your cheesy fantasies grow more detailed; you would use two crackers to sandwich it, or even just lick it straight off the knife.",
    "Like Odysseus you shall continue to endevor in what must be a ten year cheese quest, in spite of these dispicable Lotus Eaters blocking your way.",
    "You stop for a moment to do a few stretches, working out the cheese longing cramps in your sides. This is a test of endurance, and you would be the winner.",
    "You do a few small hops to peek over the heads of the impersonators - the cheese log was still there, only a little worse for wear.",
    "Pulling out a blueprint from your pocket, you stop at an empty table to check your snack table route and note the shift in impersonator herds.",
    "Growing impatient you reach into your back pocket for a set of smoke grenades leftover from the 4th of July. Sadly, you broke the fuses when picking up the John Wayne's handkerchief.",
    "If you were a more violent man, you could use the basics of CQC (Cheese Quarters Combat) to knock the impersonators out of your way. But you are a pacifist, as the cheese demands.",
    "Every clink of silverware on plates sends your gaze shooting over to the cheese log. It was in good shape right now, but for how long?",
    "It has been three hours since your last cheese fix; your hands shake and forehead beads with sweat, breath coming fast.",
    "Taking a private moment from the conversation, you pull out a silver cheese round on a chain from beneath your shirt, mumbling a small prayer to Saint Marcellin.",
    "You flag down one of the wait staff and ask if they would just bring the cheese log to you? The person smiles, backing up slowly before taking off in a sprint to the kitchen.",
    "You grab the log with your hands, drawing it close to your slavering jaws, but as you chomp down you find out that it's only a Chester the Cheetah arm."
  ],
  far: [
    "You find yourself in physical discomfort as you reckon how far you are from the cheese log. You must close the gap.",
    "As many a great explorer from the past, you will travel any distance, face any danger, all to get close to that golden cheese.",
    "The world drops away into a fog, the guests voices soften to dull murmurs; over it all, the gruyere on the furthest table gazes lustfully at you.",
    "Get to the cheese table? You'd sooner arrive at the moon before finally resting your questing fingers upon those soft silvers of swiss.",
    "Had Shakespeare written about cheese? Perhaps a sonnet sonnet or a poem of parmesean would bring this crowd to bear, and allow you to close the gap.",
    "You wonder if dressing up as the wait staff and sneaking in through the back would be a faster and easier approach, as the impersonators dogged need to be identfied was time consuming.",
    "Maybe if you said you were impersonating Ricky Gervais and that the cheese log was your prop the crowd would let you pass through.",
    "If you leaned back slightly your fingers could just reach the fire alarm. However, the Celine Dion impersonator was downing a bottle of champagne next to it and would most certainly testify against you.",
    "You check your phone for the time and realize that your man on the outside has let you down and didn't cut the power. You'll just have to get to the cheese log the hard way.",
    "Would toughing this crowd really be worth it for cheese? You check double check your cheese flowchart. All options lead to YES.",
    "The kitchen nearby, you take a gamble and call out for another cheese log at the window. The chef throws a bottle of worcestershire at you and tells you to make it yourself.",
    "You reach into your vest pocket to pull out an emergency ration of smoked gouda. Though delicious, the snack was far from nourshing and would only tide you over for a little bit.",
  ],
  any: [
    "The cheese had been delicately rolled in slivered almonds, concealing the golden spread within. You sniff the air. Did those geniuses even include a hint of scallion? You must get closer.",
    "You glance past the latest impersonator back to the cheese table and gasp, as bits of the beautiful, once whole log have been damaged by rabid impersonator wolves. But none shall keep you from sampling that luscious log.",
    "A knife slices into the cheese log, and you hiss like a vampire. You watch a guest draw the cheese and cracker into his mouth, and he doesn’t even appreciate it. Not like <i>you</i> would.",
    "Over there she lay, the most beautiful thing in the world. Nothing can compare to her beauty, her grace, her easily spreadable interior. The most expensive cheeses rolled into a log shape rested on a silver platter, soley for you.",
    "Mmmmmmmmmmmmmmmm, that's one <i>greezy log!</i>",
    "Another person takes a small chunk from the cheese log and you feel a sympathetic pain in your own torso, as if the crowd was seperating you both bite by bite.",
    "The quartet begins to play an extended cover of Primus' <i>Sea of Cheese</i>. It proves once again the gods have a cruel sense of humor."
  ]

};
