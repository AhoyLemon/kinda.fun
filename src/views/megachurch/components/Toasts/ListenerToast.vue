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

  // Satirical message variations for comedy
  const messages = {
    religionAgree: [
      "nodded along enthusiastically.",
      'shouted "Amen!" loudly.',
      "agreed with what you said.",
      "felt personally validated.",
      'thought you really "get it."',
    ],
    tagLike: [
      "vibed with your take on",
      "got excited about your views on",
      "liked what you said about",
      "appreciated your hot take on",
      "resonated with your thoughts on",
    ],
    generalLike: [
      "liked your sermon.",
      "thought you made some good points.",
      "found your message compelling.",
      "appreciated the passion.",
      "felt spiritually moved.",
    ],
    religionOffend: [
      "deeply offended by what you said.",
      "outraged by your message.",
      "personally attacked by your words.",
      "scandalized by your sermon.",
      "triggered by what you preached.",
    ],
    tagHate: [
      "got disgusted by your views on",
      "got angry about what you said about",
      "hated your take on",
      "got appalled by your thoughts on",
      "felt attacked by your stance on",
    ],
    generalOffend: [
      "offended by your sermon.",
      "put off by your message.",
      "disturbed by what you said.",
      "uncomfortable with your preaching.",
      "not having it today.",
    ],
    confusedALot: [
      "confused a lot of people.",
      "left many folks scratching their heads.",
      "baffled a whole bunch of people.",
      "had most people looking bewildered.",
      "really threw a lot of folks for a loop.",
    ],
    confusedSpecific: ["confused", "puzzled", "baffled", "perplexed", "befuddled"],
    confusedGeneral: [
      "looked thoroughly confused.",
      "seemed to have no idea what you were talking about.",
      "appeared completely baffled.",
      "walked away scratching their heads.",
      "gave you the side-eye and kept walking.",
    ],
  };

  // ================= HELPER FUNCTIONS =================
  function getRandomMessage(category) {
    const options = messages[category] || ["had a reaction."];
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
