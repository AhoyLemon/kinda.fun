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
        "Not my vibe.",
        "Let's keep it professional.",
        "Ask someone else.",
        "I'm just here for the transaction.",
        "That's above my pay grade.",
        "I got places to be.",
        "Let's not get personal.",
        "Stick to the order.",
        "You got the cash or not?",
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
        "Got you covered"
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
        "this van aint 1 of THOSE vans"
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
        "u culd escape if the govmnt comes 4 u",
      ],
    },
    chat: {
      to: [
        "How's life treating you Harold?",
        "Boy, sports are a thing I enjoy. How about you?",
      ],
      from: [
        "they make toothpaste out of zebras. thats why toothpaste has those stripes",
        "u gotta wear two pairs of socks! AT ALL TIMES!",
        "u no ne1 who nos how 2 code? i need 2 get revenge at the ppl who control my hotmail account",
        "i keep my phone in the freezer so the aliens can't track me",
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
        "Ah, [playerName], let me illuminate the path: I shall build your church, handle every tedious detail, and in return, you bless me with a heavenly tithe—35% of every dollar the faithful surrender at your altar.",
        "Picture this: your own congregation, your own pulpit, all made possible by my divine intervention. All I ask is a modest share—35% of the collection plate, a small price for salvation.",
        "The Lord works through mysterious means, and today, He works through me. I'll shoulder the burdens of bureaucracy and paperwork, while you reap the spiritual rewards. My only request? A sacred portion—35%—of your flock's generosity.",
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
        "I agree to your terms",
        "Let's do this",
        "I'm ready to partner with you",
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
        ],
        noDebt: (playerName: string) => [
          `You're doing God's work, ${playerName}. Keep those donations flowing.`,
          "I'm watching, always watching. The Lord sees all, and so do I.",
          "Our arrangement is working beautifully. Continue the good work.",
          "The congregation seems happy. Happy people are generous people.",
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
  { singular: "item", plural: "items" },
  { singular: "bag of dog food", plural: "bags of dog food" },
  { singular: "gummy bear", plural: "gummy bears" },
  { singular: "reason to stay", plural: "reasons to stay" },
  { singular: "lemon", plural: "lemons" },
];

export function getRandomSlang(amount: number): string {
  const slangItem = drugSlang[Math.floor(Math.random() * drugSlang.length)];
  return amount === 1 ? slangItem.singular : slangItem.plural;
}