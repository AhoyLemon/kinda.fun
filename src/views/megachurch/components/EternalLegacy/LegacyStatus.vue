<template lang="pug" src="./LegacyStatus.pug"></template>

<script setup>
  import { computed } from "vue";
  import { my } from "../../ts/variables/_my";
  import { gameSettings } from "../../ts/variables/_gameSettings";
  import { addCommas } from "../../../../shared/ts/_functions";

  defineEmits(["close"]);

  defineProps({
    isVisible: {
      type: Boolean,
      default: false,
    },
  });

  // Computed properties for legacy data
  const currentMammon = computed(() => {
    return my.eternalLegacy?.totalMammon || 0;
  });

  const ownedMammonItems = computed(() => {
    if (!my.eternalLegacy?.purchasedItems) {
      return [];
    }

    return my.eternalLegacy.purchasedItems;

    // // Map purchased items to display format
    // return my.eternalLegacy.purchasedItems.map((itemId) => {
    //   // Find the item in gameSettings mammon items
    //   const mammonItems = gameSettings.eternalLegacy?.shop?.mammonItems || [];
    //   const item = mammonItems.find((m) => m.id === itemId);

    //   if (item) {
    //     return {
    //       id: itemId,
    //       name: item.name,
    //       icon: item.icon,
    //       description: item.description,
    //       cost: item.cost,
    //     };
    //   }

    //   return {
    //     id: itemId,
    //     name: itemId,
    //     icon: "💰",
    //     description: "Unknown item",
    //     cost: 0,
    //   };
    // });
  });

  const completedDarkDeeds = computed(() => {
    if (!my.eternalLegacy?.darkDeeds) {
      return [];
    }

    return my.eternalLegacy.darkDeeds;
  });

  const heatLevel = computed(() => {
    if (!my.eternalLegacy.heat || !gameSettings.eternalLegacy.heat.max) {
      return 0;
    }
    // const heat = my.eternalLegacy?.heat || 0;
    // const maxHeat = gameSettings.eternalLegacy?.maxHeat || 100;
    // return Math.min(heat, maxHeat);
    return Math.floor((my.eternalLegacy.heat / gameSettings.eternalLegacy.heat.max) * 100, 100);
  });

  const isLegacyActive = computed(() => {
    return my.eternalLegacy?.isActive || false;
  });

  const sterlingCutModifier = computed(() => {
    return my.eternalLegacy?.sterlingCutModifier || 0;
  });

  const sterlingStatus = computed(() => {
    return my.eternalLegacy?.sterlingAlive ? "Alive" : "Deceased";
  });

  const isEmpty = computed(() => {
    return (
      !isLegacyActive.value &&
      currentMammon.value === 0 &&
      ownedMammonItems.value.length === 0 &&
      completedDarkDeeds.value.length === 0 &&
      heatLevel.value === 0
    );
  });

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };
</script>

<style lang="scss" scoped src="./LegacyStatus.scss"></style>
