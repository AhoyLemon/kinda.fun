import { reactive, ref } from "vue";
import { SermonToday } from "./_types";

export const ui = reactive({
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
    topicIDs: [],
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
});

interface My {
  name: string;
  money: number;
  religion: object;
  location: object;
  lucre: object;
  selectedTopics: Array<any>;
  sermonToday: SermonToday;
}
