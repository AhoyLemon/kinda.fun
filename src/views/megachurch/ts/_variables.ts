import { reactive, ref } from "vue";
import { SermonToday } from "./_types";

interface UI {
  choosing:
    | "religion"
    | "sermon"
    | "sermon-confirm"
    | "preached"
    | "sermon-results";
  religionIndex: number;
}

export const ui = reactive<UI>({
  choosing: "religion",
  religionIndex: 0,
});

export const my = reactive<My>({
  name: "",
  money: 0,
  religion: {},
  location: {},
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
  religiousScorecard: [],
});

interface My {
  name: string;
  money: number;
  religion: object;
  location: object;
  lucre: object;
  selectedTopics: Array<any>;
  sermonToday: SermonToday;
  religiousScorecard?: any[];
}
