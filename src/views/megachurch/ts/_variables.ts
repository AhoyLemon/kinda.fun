import { reactive, ref } from "vue";
import { Sermon } from "./_types";

export const gameSettings = reactive({
  baseDonation: 0.1, // Base donation per follower
  isDebug: true,
  isDebugButtonVisible: true,
});

interface UI {
  view:
    | "religion"
    | "place"
    | "place-confirm"
    | "sermon"
    | "sermon-confirm"
    | "preaching"
    | "sermon-results";
  religionIndex: number;
  placeIndex: number;
}

export const ui = reactive<UI>({
  view: "preaching",
  religionIndex: 0,
  placeIndex: 0,
});

export const my = reactive<My>({
  name: "",
  money: 0,
  religion: {},
  place: {},
  lucre: [],
  preacherStrengths: {
    followers: 0.15,
    donations: 0.2,
  },
  selectedTopics: [null, null, null], // TODO: Move this to ui.selectedTopics
  followerCount: 0,
  followers: [],
  sermonToday: {
    topics: [],
    likedBy: {
      tags: [],
      religions: [],
    },
    dislikedBy: {
      tags: [],
      religions: [],
    },
    mixedMessages: {
      tags: [],
      religions: [],
    },
  },
  effectYesterday: [],
  religiousScorecard: [],
  followerChanges: [],
});

interface My {
  name: string; // Name of the MegaChurch Owner
  money: number; // How much money you have right now.
  religion: object; // What religion you are claiming
  place: object; // What location are you currently in
  lucre: object[]; // list the trophies you have.
  preacherStrengths: {
    followers: number;
    donations: number;
  }; // Persuasiveness multipliers. How good is your preacher at getting new followers/donations
  selectedTopics: Array<any>; // TODO: Move this to ui.selectedTopics
  followerCount: number; // How many followers you have right now.
  followers: object[]; // List of followers, by religion
  sermonToday: Sermon; // What will/did you preach today.
  effectYesterday?: any[]; // What effect did your last sermon have?
  religiousScorecard?: any[]; // what does each religion think of you?
  followerChanges?: Array<{
    id: number;
    name: string;
    before: number;
    change: number;
    after: number;
  }>; // Follower change reporting
}
