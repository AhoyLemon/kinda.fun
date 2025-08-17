import { reactive, ref } from "vue";

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

interface UI {
  choosing: string;
  religionIndex: number;
}

interface My {
  name: string;
  money: number;
  religion: object;
  location: object;
  lucre: object;
  selectedTopics: Array<any>;
  sermonToday: {
    topics: string[];
    topicIDs: number[];
    likedBy: {
      tags: string[];
      religions: string[];
    };
    dislikedBy: {
      tags: string[];
      religions: string[];
    };
    mixedMessages: {
      tags: string[];
      religions: string[];
    };
  };
}
