<template lang="pug" src="./ListenerToast.pug"></template>
<script setup>
  const props = defineProps({
    reaction: {
      type: String, // "liked", "disliked", or "mixed"
      required: true,
      validator: (value) => ["liked", "disliked", "mixed"].includes(value),
    },
    count: {
      type: Number,
      required: false,
    },
    religion: {
      type: Object,
      required: false,
    },
    religionMatch: {
      type: Boolean,
      required: false,
    },
    tagMatch: {
      type: Boolean,
      required: false,
    },
    primaryTag: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    affectedReligions: {
      type: Array,
      required: false,
    },
  });

  // Satirical message variations for comedy with singular/plural versions
  const messages = {
    religionAgree: {
      singular: [
        "was just standing there nodding with everything you said.",
        'shouted "Amen!" loudly.',
        "agreed with what you said.",
        "felt personally validated.",
        'thought you really "get it."',
        "was spiritually moved.",
        "found enlightenment in your words.",
        "felt the divine truth.",
        "was touched by your message.",
        "experienced a religious awakening.",
      ],
      plural: [
        "nodded along enthusiastically.",
        'shouted "Amen!" in unison.',
        "agreed with what you said.",
        "felt personally validated.",
        'thought you really "get it."',
        "were spiritually moved.",
        "found enlightenment in your words.",
        "felt the divine truth.",
        "were touched by your message.",
        "looked at each other with delight.",
        "experienced a collective awakening.",
        "high-fived each other.",
      ],
    },
    tagLike: {
      singular: [
        "vibed with your take on",
        "got excited about your views on",
        "liked what you said about",
        "appreciated your hot take on",
        "resonated with your thoughts on",
        "was inspired by your stance on",
        "felt validated by your opinion on",
        "connected deeply with your views on",
      ],
      plural: [
        "vibed with your take on",
        "got excited about your views on",
        "liked what you said about",
        "appreciated your hot take on",
        "resonated with your thoughts on",
        "were inspired by your stance on",
        "felt validated by your opinion on",
        "connected deeply with your views on",
        "started discussing your thoughts on",
        "began sharing your wisdom about",
      ],
    },
    generalLike: {
      singular: [
        "liked your sermon.",
        "thought you made some good points.",
        "found your message compelling.",
        "appreciated the passion.",
        "felt spiritually moved.",
        "was impressed by your delivery.",
        "found wisdom in your words.",
        "felt called to action.",
        "experienced divine inspiration.",
      ],
      plural: [
        "liked your sermon.",
        "thought you made some good points.",
        "found your message compelling.",
        "appreciated the passion.",
        "felt spiritually moved.",
        "were impressed by your delivery.",
        "found wisdom in your words.",
        "felt called to action.",
        "experienced divine inspiration.",
      ],
    },
    religionOffend: {
      singular: [
        "was deeply offended by what you said.",
        "was outraged by your message.",
        "felt personally attacked by your words.",
        "was scandalized by your sermon.",
        "was triggered by what you preached.",
        "stormed off in disgust.",
        "questioned your theological credentials.",
        "muttered something about heresy.",
      ],
      plural: [
        "were deeply offended by what you said.",
        "were outraged by your message.",
        "felt personally attacked by your words.",
        "were scandalized by your sermon.",
        "were triggered by what you preached.",
        "stormed off in disgust.",
        "questioned your theological credentials.",
        "muttered something about heresy.",
      ],
    },
    tagHate: {
      singular: [
        "got disgusted by your views on",
        "got angry about what you said about",
        "hated your take on",
        "got appalled by your thoughts on",
        "felt attacked by your stance on",
        "was horrified by your opinion on",
        "was offended by your position on",
        "disagreed strongly with your views on",
      ],
      plural: [
        "got disgusted by your views on",
        "got angry about what you said about",
        "hated your take on",
        "got appalled by your thoughts on",
        "felt attacked by your stance on",
        "were horrified by your opinion on",
        "were offended by your position on",
        "disagreed strongly with your views on",
        "started a protest about your stance on",
        "began organizing against your position on",
      ],
    },
    generalOffend: {
      singular: [
        "was offended by your sermon.",
        "was put off by your message.",
        "was disturbed by what you said.",
        "was uncomfortable with your preaching.",
        "was not having it today.",
        "walked away shaking their head.",
        "muttered disapprovingly.",
        "gave you a dirty look.",
        "questioned your sanity.",
      ],
      plural: [
        "were offended by your sermon.",
        "were put off by your message.",
        "were disturbed by what you said.",
        "were uncomfortable with your preaching.",
        "were not having it today.",
        "walked away shaking their heads.",
        "muttered disapprovingly.",
        "gave you dirty looks.",
        "questioned your sanity.",
        "started whispering among themselves.",
        "began planning their exit strategy.",
        "formed a disapproval committee.",
      ],
    },
    confusedALot: [
      "confused a lot of people.",
      "left many folks scratching their heads.",
      "baffled a whole bunch of people.",
      "had most people looking bewildered.",
      "really threw a lot of folks for a loop.",
      "caused widespread theological confusion.",
      "started several philosophical debates.",
      "left the congregation deeply puzzled.",
    ],
    confusedSpecific: ["confused", "puzzled", "baffled", "perplexed", "befuddled", "mystified", "bewildered"],
    confusedGeneral: [
      "looked thoroughly confused.",
      "seemed to have no idea what you were talking about.",
      "appeared completely baffled.",
      "walked away scratching their heads.",
      "gave you the side-eye and kept walking.",
      "exchanged puzzled glances.",
      "questioned their life choices.",
      "wondered if they were in the right place.",
    ],
  };

  // ================= HELPER FUNCTIONS =================
  function getRandomMessage(category, isPlural = false) {
    const categoryMessages = messages[category];

    // Handle categories with singular/plural variants
    if (categoryMessages && typeof categoryMessages === "object" && categoryMessages.singular && categoryMessages.plural) {
      const options = isPlural ? categoryMessages.plural : categoryMessages.singular;
      return options[Math.floor(Math.random() * options.length)];
    }

    // Handle simple array categories (like confusedALot, confusedSpecific, etc.)
    const options = categoryMessages || ["had a reaction."];
    return options[Math.floor(Math.random() * options.length)];
  }

  // Formats religion lists for mixed message display
  // - 1 religion: "Buddhists"
  // - 2 religions: "Buddhists and Catholics"
  // - 3+ religions: "a lot of people"
  function formatAffectedReligions(religions) {
    if (!religions || religions.length === 0) return "people";

    if (religions.length === 1) {
      return religions[0];
    } else if (religions.length === 2) {
      return `${religions[0]} and ${religions[1]}`;
    } else {
      return "a lot of people";
    }
  }
</script>
<style lang="scss">
  @import "../../scss/_variables.scss";

  .Vue-Toastification__icon {
    display: none;
  }
  .Vue-Toastification__toast {
    &:has(.listener-effect.is-positive) {
      background-color: rgba(3, 20, 3, 0.9);
      color: $white;
    }
    &:has(.listener-effect.is-negative) {
      background-color: rgba(38, 3, 3, 0.9);
      color: $white;
    }
    &:has(.listener-effect.is-confused) {
      background-color: rgba(20, 15, 3, 0.9);
      color: $white;
    }
  }
</style>

<style lang="scss" src="./ListenerToast.scss" scoped></style>
