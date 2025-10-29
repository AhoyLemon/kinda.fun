<template lang="pug" src="./UnfriendConfirmation.pug"></template>
<script setup>
  import { computed } from "vue";

  const props = defineProps({
    celebrity: {
      type: Object,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  });

  const emit = defineEmits(["confirm", "cancel"]);

  const terminationEffects = computed(() => {
    const effects = [];

    if (props.celebrity.termination) {
      const termEffects = props.celebrity.termination;

      if (termEffects.heat) {
        effects.push(`Heat: ${termEffects.heat > 0 ? "+" : ""}${termEffects.heat}`);
      }

      if (termEffects.mammonLost) {
        effects.push(`Mammon: -${termEffects.mammonLost}`);
      }

      if (termEffects.buzzLost) {
        effects.push(`Church Buzz: -${termEffects.buzzLost}%`);
      }

      if (termEffects.additionalCost) {
        effects.push(`Termination Fee: $${termEffects.additionalCost}`);
      }

      if (termEffects.religionBoost && props.celebrity.religions?.hatedBy) {
        effects.push(`Religion Boost: +${termEffects.religionBoost} for ${props.celebrity.religions.hatedBy.join(", ")}`);
      }

      if (termEffects.religionPenalty && props.celebrity.religions?.likedBy) {
        effects.push(`Religion Penalty: -${termEffects.religionPenalty} for ${props.celebrity.religions.likedBy.join(", ")}`);
      }
    }

    return effects;
  });

  function handleConfirm() {
    emit("confirm", props.celebrity);
  }

  function handleCancel() {
    emit("cancel");
  }
</script>
<style lang="scss" src="./UnfriendConfirmation.scss" scoped></style>
