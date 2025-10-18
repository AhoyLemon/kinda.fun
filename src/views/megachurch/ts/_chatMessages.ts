export interface ChatMessages {
  plug: {
    casual: {
      to: string[];
      from: string[];
    };
    order: {
      from: string[];
    };
  };
  harold: {
    haggle: {
      to: string[];
      from: string[];
    };
    van: {
      to: string[];
      from: string[];
    };
    chat: {
      to: string[];
      from: string[];
    };
  };
  sterling: {
    clarify: {
      to: string[];
      from: string[];
    };
    prison: {
      to: string[];
      from: string[];
    };
    agree: {
      to: string[];
      from: string[];
    };
    checkin: {
      to: string[];
      from: {
        withDebt: (playerName: string, moneyOwed: number) => string[];
        noDebt: (playerName: string) => string[];
      };
    };
    scripture: {
      to: string[];
      from: string[];
    };
    business: {
      to: string[];
      from: string[];
    };
  };
}

export const chatMessages: ChatMessages = {
  plug: {
    casual: {
      to: [
        "Did you see the sunrise this morning?",
        "How's the weather?",
        "What's good?",
        "You ever thought about what happens to you when you die?",
        "Got any weekend plans?",
        "What's your favorite snack?",
        "Ever been outside the city?",
        "Do you believe in luck?",
        "What's the wildest thing you've seen?",
        "What's your dream job?",
        "Do you like music?",
        "If you could travel anywhere, where would you go?",
        "What's the best advice you've gotten?",
        "Ever met anyone famous?",
        "What's your favorite color?",
        "Do you think aliens exist?",
      ],
      from: [
        "I don't wanna talk about that.",
        "Nah man I don't do small talk.",
        "We ain't friends",
        "Just business.",
        "No.",
        "wut",
        "Let's keep it professional.",
        "Ask someone else.",
        "I'm just here for the transaction.",
        "That's above my pay grade.",
        "I got places to be.",
        "Let's not get personal.",
        "Stick to the order.",
        "You got the cash or not?",
        "💰🫲 ?",
        "You don't even know me.",
      ],
    },
    order: {
      from: [
        "I gotchu",
        "👍",
        "Alright",
        "Yeah yeah I'll get to it",
        "Say less",
        "Bet",
        "On it",
        "Done",
        "Easy",
        "No problem",
        "Got you covered",
        "Dropping it off soon",
        "Be there tomorrow",
        "Handled",
      ],
    },
  },
  harold: {
    haggle: {
      to: [
        "Can you come down on the price at all?",
        "That's a lot of money for a van",
        "I'm trying to build something, can you give me a discount?",
      ],
      from: [
        "u think the govmnt gives me a discount???",
        "i need that money for my plans",
        "this van aint 1 of THOSE vans",
      ],
    },
    van: {
      to: [
        "Why do I need a van?",
        "What's so great about a van?",
        "How will a van help me?",
      ],
      from: [
        "u culd drive 2 other places. u culd preach 2 new ppl",
        "mabee u find more ppl 2 join ur church",
        "this town suxxxx! u shud drive sum ware elz",
        "with a van you reach the suburbs too",
        "a van means more chairs, more faces, more offerings",
      ],
    },
    chat: {
      to: [
        "How's life treating you Harold?",
        "Boy, sports are a thing I enjoy. How about you?",
        "You talk to mom lately?",
        "Seen any good movies?",
        "Got any tips for preaching to kids?",
        "What's your favorite food?",
        "Want to grab a coffee sometime?",
        "How do you unwind after a long day?",
        "Any new music you're into?",
      ],
      from: [
        "they make toothpaste out of zebras. thats why toothpaste has those stripes",
        "u gotta wear two pairs of socks! AT ALL TIMES!",
        "u no ne1 who nos how 2 code? i need 2 get revenge at the ppl who control my hotmail account",
        "i kep my phon in freezer ha ha not this time lava aliens!!!",
        "KIL EVRY PIGON! the govt uses them 4 survalence",
        "never evr drink tap water!!! they r teachin fish ",
        "i saw a street light that sed dont walk. I DO NOT COMPLY WITH GOVT STRET LIGHT RULES! I WILL WALK!!!",
        "in my old universe nelsin mandala wrote the bearansteen bears books",
      ],
    },
  },
  sterling: {
    clarify: {
      to: [
        "Tell me more about this arrangement",
        "What exactly are you proposing?",
        "What's the deal?",
      ],
      from: [
        "Ah, [playerName], let me illuminate the path: I shall build your church, handle every tedious detail, and in return, you bless me with a heavenly tithe.. 35% of every dollar the faithful surrender at your altar.",
        "Picture this: your own congregation, your own pulpit, all made possible by my divine intervention. All I ask is a modest share... 35% of the collection plate, a small price for salvation.",
        "The Lord works through mysterious means, and today, He works through me. I'll shoulder the burdens of bureaucracy and paperwork, while you reap the spiritual rewards. My only request? A sacred portion of your flock's generosity.",
        "Think of me as your partner in prosperity; I provide infrastructure, you provide inspiration, and we split the blessings accordingly.",
      ],
    },
    prison: {
      to: [
        "Where are you texting me from?",
        "Are you in prison?",
        "Why are you in prison?",
      ],
      from: [
        "Let's just say I've had some... disagreements with certain authorities. But all for a righteous cause, of course.",
        "Ah, the Lord works in mysterious ways. Sometimes that involves a stint in a less-than-holy place.",
        "I've been through some trials, but my faith remains unshaken. Even if my accommodations are less than heavenly.",
      ],
    },
    agree: {
      to: [
        "I agree to your terms.",
        "Let's do this.",
        "I'm ready to partner with you.",
      ],
      from: [
        "Excellent, [playerName]. The Lord smiles upon wise decisions.",
        "Now we're talking! Let's build something that'll make the angels weep... tears of joy, of course.",
        "You won't regret this. Or at least, I won't.",
      ],
    },
    checkin: {
      to: [
        "How are we doing?",
        "Any thoughts on my performance?",
        "How's our partnership going?",
      ],
      from: {
        withDebt: (playerName: string, moneyOwed: number) => [
          `You owe me ${moneyOwed.toFixed(2)}, ${playerName}. I trust this is just a temporary oversight.`,
          `I'm not running a charity here. ${moneyOwed.toFixed(2)} is what you owe me. Pay up.`,
          `The Lord may forgive, but I expect my ${moneyOwed.toFixed(2)}. Soon.`,
          `${playerName}, we've got a balance of ${moneyOwed.toFixed(2)}. Let's clear it and keep the choir singing.`,
        ],
        noDebt: (playerName: string) => [
          `You're doing God's work, ${playerName}. Keep those donations flowing.`,
          "I'm watching, always watching. The Lord sees all, and so do I.",
          "Our arrangement is working beautifully. Continue the good work.",
          "The congregation seems happy. Happy people are generous people.",
          `All settled, ${playerName}. Keep up the steady work and the offerings will follow.`,
        ],
      },
    },
    scripture: {
      to: [
        "I could use some spiritual guidance",
        "What does the Lord say about our work?",
        "Share some wisdom with me",
      ],
      from: [
        "The Lord helps those who help themselves... and those who help ME.",
        "Matthew 6:19 - Store up treasures in heaven... and in offshore accounts.",
        "Consider the lilies of the field... they neither reap nor sow, yet they know how to delegate.",
        "Ask, and it shall be given unto you... for a modest processing fee.",
        "Blessed are the organizers, for they shall inherit well-run events.",
        "Turn the other cheek, but keep a ledger of those who owe you favors.",
      ],
    },
    business: {
      to: [
        "How's our arrangement working out?",
        "Any advice for growing the ministry?",
        "What should I focus on next?",
      ],
      from: [
        "Focus on the flock, [playerName]. The bigger the congregation, the bigger the... blessings.",
        "Remember, we're building something eternal here. Eternal... and profitable.",
        "Keep preaching what they want to hear. Happy congregants are generous congregants.",
        "The Lord works in mysterious ways... and so do I.",
        "Diversify your events: breakfasts, talks, and community drives bring steady donations.",
        "Track attendance, tweak the message, and never underestimate friendly coffee after service.",
      ],
    },
  },
};

// Helper function to get random message from array
export function getRandomMessage(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

// Drug slang for orders
export const drugSlang = [
  { singular: "shoelace", plural: "shoelaces" },
  { singular: "hot dog", plural: "hot dogs" },
  { singular: "bag of dog food", plural: "bags of dog food" },
  { singular: "gummy bear", plural: "gummy bears" },
  { singular: "sick beat", plural: "sick beats" },
  { singular: "reason to stay", plural: "reasons to stay" },
  { singular: "sign that you love me", plural: "signs that you love me" },
  { singular: "lemon", plural: "lemons" },
  { singular: "bag of Takis", plural: "bags of Takis" },
  { singular: "person to talk to", plural: "people to talk to" },
  { singular: "for my headache", plural: "for my headaches" },
  {
    singular: "for everything, everything, EVERYTHING, EVERYTHING!",
    plural: "for everything, everything, EVERYTHING, EVERYTHING!",
  },
];

export function getRandomSlang(amount: number): string {
  const slangItem = drugSlang[Math.floor(Math.random() * drugSlang.length)];
  return amount === 1 ? slangItem.singular : slangItem.plural;
}
