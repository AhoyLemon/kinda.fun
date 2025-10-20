<template lang="pug" src="./ChurchInventory.pug"></template>

<script setup lang="ts">
  import { computed } from "vue";
  import { my } from "../../ts/variables/_my";
  import { gameSettings } from "../../ts/variables/_gameSettings";

  defineEmits(["close"]);

  defineProps({
    isVisible: {
      type: Boolean,
      default: false,
    },
  });

  // Computed properties for inventory data
  const ownedMerch = computed(() => {
    if (!my.church?.merch || typeof my.church.merch !== "object") {
      return [];
    }

    // Simple mapping of merch IDs to display names and icons
    const merchDisplayData = {
      holyWater: { name: "Holy Water", icon: "💧" },
      prayerCandles: { name: "Prayer Candles", icon: "🕯️" },
      weightLossTea: { name: "Miracle Weight Loss Tea", icon: "🍵" },
      beachTowel: { name: "Shroud of Turin Beach Towel", icon: "🏖️" },
      exorcismKit: { name: "Lil' Reagan's Exorcism Kit", icon: "👻" },
    };

    return Object.entries(my.church.merch)
      .filter(([_, merchData]) => merchData && merchData.inventory > 0)
      .map(([merchId, merchData]) => {
        const displayData = merchDisplayData[merchId] || { name: merchId, icon: "📦" };
        return {
          id: merchId,
          name: displayData.name,
          icon: displayData.icon,
          quantity: merchData.inventory,
        };
      });
  });

  const ownedUpgrades = computed(() => {
    if (!my.church?.upgrades || typeof my.church.upgrades !== "object") {
      return [];
    }

    const upgrades = [];

    // VIP Confession Booths
    if (my.church.upgrades.vipConfessionBooths) {
      upgrades.push({
        id: "vipConfessionBooths",
        name: "VIP Confession Booths",
        icon: "🏧",
        description: "Premium confession experience",
      });
    }

    // Audio/Visual Equipment
    if (my.church.upgrades.audioVisual) {
      upgrades.push({
        id: "audioVisual",
        name: "Audio/Visual Equipment",
        icon: "📺",
        description: "Enhanced sermon quality",
      });
    }

    // Extra Pews
    if (my.church.upgrades.extraPews > 0) {
      upgrades.push({
        id: "extraPews",
        name: "Extra Pews",
        icon: "🪑",
        description: `${my.church.upgrades.extraPews * 10} additional seating (total: ${my.church.maxAttendance + my.church.upgrades.extraPews * 10})`,
      });
    }

    // Sacrament upgrades
    if (my.church.upgrades.sacrament?.wine?.level > 0) {
      upgrades.push({
        id: "sacramentWine",
        name: `${my.church.upgrades.sacrament.wine.name}`,
        icon: "🍷",
        description: `Level ${my.church.upgrades.sacrament.wine.level} wine`,
      });
    }

    if (my.church.upgrades.sacrament?.bread?.level > 0) {
      upgrades.push({
        id: "sacramentBread",
        name: `${my.church.upgrades.sacrament.bread.name}`,
        icon: "🍞",
        description: `Level ${my.church.upgrades.sacrament.bread.level} bread`,
      });
    }

    return upgrades;
  });

  const seraphAIActive = computed(() => {
    return my.church?.upgrades?.seraphAI || false;
  });

  const activeMarketingCampaigns = computed(() => {
    if (!my.marketing || typeof my.marketing !== "object") {
      return [];
    }

    const campaigns = [];

    // General Advertisement - now shows purchase count
    if (my.marketing.generalAd?.purchaseCount > 0) {
      campaigns.push({
        id: "generalAd",
        name: "Internet Ad Campaigns",
        icon: "📢",
        status: `Purchased ${my.marketing.generalAd.purchaseCount} times`,
      });
    }

    // Sign Spinner
    if (my.marketing.signSpinner?.active && my.marketing.signSpinner.daysRemaining > 0) {
      campaigns.push({
        id: "signSpinner",
        name: "Sign Spinner",
        icon: "🪧",
        status: `${my.marketing.signSpinner.daysRemaining} days left`,
      });
    }

    // Targeted Advertisement
    if (my.marketing.targetedAd?.active && my.marketing.targetedAd.daysRemaining > 0) {
      campaigns.push({
        id: "targetedAd",
        name: "Targeted Advertisement",
        icon: "🎯",
        status: `${my.marketing.targetedAd.targetReligion?.name || "Unknown"} (${my.marketing.targetedAd.daysRemaining} days left)`,
      });
    }

    // PR Campaign is now permanent, so no longer shows in active campaigns

    return campaigns;
  });

  const isEmpty = computed(() => {
    return ownedMerch.value.length === 0 && ownedUpgrades.value.length === 0 && !seraphAIActive.value && activeMarketingCampaigns.value.length === 0;
  });
</script>

<style lang="scss" src="./ChurchInventory.scss" scoped></style>
