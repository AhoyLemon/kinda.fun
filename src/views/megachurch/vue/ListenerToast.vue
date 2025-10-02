<template>
  <div class="listener-effect container" :class="reaction === 'liked' ? 'is-positive' : reaction === 'disliked' ? 'is-negative' : 'is-confused'">
    <div class="text-holder">
      <div class="text">
        <!-- Positive reactions -->
        <template v-if="reaction === 'liked'">
          <strong v-if="religion" class="religion">
            {{
              count === 1
                ? (["A", "E", "I", "O", "U"].includes(religion.follower[0].toUpperCase()) ? "An " : "A ") + religion.follower
                : count + " " + religion.followers
            }}
          </strong>
          <strong v-else>people</strong>
          <span v-if="religionMatch"> {{ getRandomMessage("religionAgree") }}</span>
          <span v-else-if="tagMatch && primaryTag">
            {{ " " + getRandomMessage("tagLike") }} <span class="tag liked-tag">{{ primaryTag }}</span
            >.
          </span>
          <span v-else> {{ " " + getRandomMessage("generalLike") }}</span>
        </template>

        <!-- Negative reactions -->
        <template v-else-if="reaction === 'disliked'">
          <strong v-if="religion" class="religion">
            {{
              count === 1
                ? (["A", "E", "I", "O", "U"].includes(religion.follower[0].toUpperCase()) ? "An " : "A ") + religion.follower
                : count + " " + religion.followers
            }}
          </strong>
          <strong v-else>people</strong>
          <span v-if="religionMatch"> {{ count == 1 ? " was" : " were" }} {{ getRandomMessage("religionOffend") }}</span>
          <span v-else-if="tagMatch && primaryTag">
            {{ " " + getRandomMessage("tagHate") }} <span class="tag hated-tag">{{ primaryTag }}</span
            >.
          </span>
          <span v-else> {{ count == 1 ? " was" : " were" }} {{ getRandomMessage("generalOffend") }}</span>
        </template>

        <!-- Mixed/Confused reactions -->
        <template v-else-if="reaction === 'mixed'">
          <!-- Tag confusion affecting many religions -->
          <span v-if="primaryTag && affectedReligions && affectedReligions.length > 2">
            Your views on <span class="tag confused-tag">{{ primaryTag }}</span> {{ getRandomMessage("confusedALot") }}
          </span>
          <!-- Tag confusion affecting 1-2 specific religions -->
          <span v-else-if="primaryTag && affectedReligions && affectedReligions.length <= 2">
            Your views on <span class="tag confused-tag">{{ primaryTag }}</span> {{ getRandomMessage("confusedSpecific") }}
            {{ formatAffectedReligions(affectedReligions) }}.
          </span>
          <!-- General confusion for 1-2 religions (no specific tag) -->
          <span v-else-if="affectedReligions && affectedReligions.length <= 2">
            {{ formatAffectedReligions(affectedReligions) }} {{ getRandomMessage("confusedGeneral") }}
          </span>
          <!-- General confusion for many religions -->
          <span v-else> A whole lot of people {{ getRandomMessage("confusedGeneral") }} </span>
        </template>
      </div>
    </div>
  </div>
</template>
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
  @import "../scss/_variables.scss";
  .Vue-Toastification__icon {
    display: none;
  }
  .Vue-Toastification__toast {
    &:has(.container.is-positive) {
      background-color: rgba(3, 20, 3, 0.9);
    }
    &:has(.container.is-negative) {
      background-color: rgba(38, 3, 3, 0.9);
    }
    &:has(.container.is-confused) {
      background-color: rgba(20, 15, 3, 0.9);
    }
  }
</style>
<style lang="scss" scoped>
  @import "../scss/_variables.scss";
  // .Vue-Toastification__toast--warning {
  //   background-color: hotpink;
  // }
  .container {
    .religion {
      font-size: 1.05em;
      font-weight: 620;
      font-family: $serif;
    }
    .label {
      font-size: 0.875em;
    }
    .liked-tag {
      color: $green;
    }
    .hated-tag {
      color: $pink;
    }
    .confused-tag {
      color: $yellow;
    }
  }
</style>
