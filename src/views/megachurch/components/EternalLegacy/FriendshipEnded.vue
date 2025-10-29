<template lang="pug" src="./FriendshipEnded.pug"></template>

<script setup>
  import { computed } from "vue";
  import { dollars } from "../../../../shared/ts/_functions";

  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false,
    },
    celebrity: {
      type: Object,
      required: true,
    },
    reason: {
      type: String, // 'voluntary' or 'non-payment'
      required: true,
    },
    effects: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(["close"]);

  const reasonText = computed(() => {
    return props.reason === "voluntary" ? "voluntarily ended" : "ended due to non-payment";
  });

  const effectsText = computed(() => {
    const effects = [];

    if (props.effects.mammonLost) {
      effects.push(`Lost ${props.effects.mammonLost} mammon`);
    }

    if (props.effects.buzzLost) {
      effects.push(`Lost ${props.effects.buzzLost}% church buzz`);
    }

    if (props.effects.religionPenalty && props.celebrity.religions?.likedBy?.length > 0) {
      effects.push(`${props.celebrity.religions.likedBy.join(", ")} followers disappointed (-${props.effects.religionPenalty})`);
    }

    if (props.effects.religionBoost && props.celebrity.religions?.hatedBy?.length > 0) {
      effects.push(`${props.celebrity.religions.hatedBy.join(", ")} followers pleased (+${props.effects.religionBoost})`);
    }

    if (props.effects.additionalCost) {
      effects.push(`Additional cost: ${dollars(props.effects.additionalCost)}`);
    }

    return effects.length > 0 ? effects : ["No additional effects"];
  });
</script>

<style lang="scss" scoped src="./FriendshipEnded.scss"></style>
