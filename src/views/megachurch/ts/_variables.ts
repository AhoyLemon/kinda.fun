import { reactive, ref } from "vue";
import { SermonToday } from "./_types";

interface UI {
  view:
    | "religion"
    | "place"
    | "place-confirm"
    | "sermon"
    | "sermon-confirm"
    | "preached"
    | "sermon-results";
  religionIndex: number;
  placeIndex: number;
}

export const ui = reactive<UI>({
  view: "religion",
  religionIndex: 0,
  placeIndex: 0,
});

export const my = reactive<My>({
  name: "",
  money: 0,
  religion: {},
  place: {},
  lucre: {},
  selectedTopics: [null, null, null],
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
  followerCount: 0,
  followers: [],
});

interface My {
  name: string;
  money: number;
  religion: object;
  place: object;
  lucre: object;
  selectedTopics: Array<any>;
  sermonToday: SermonToday;
  effectYesterday?: any[];
  religiousScorecard?: any[];
  followerCount: number;
  followers: object[];
}
