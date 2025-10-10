<template lang="pug">
  .heat-meter-container(v-if="isVisible")
    .heat-meter-title
      | 🌡️ Federal Heat
    .heat-meter-bar
      .heat-meter-fill(:style="{ width: heatPercentage + '%' }")
      .heat-meter-text {{ currentHeat }} / {{ maxHeat }}
    .heat-meter-warning(v-if="heatPercentage > 75")
      | ⚠️ INVESTIGATION IMMINENT

</template>

<script setup>
  import { computed } from "vue";

  const props = defineProps({
    currentHeat: {
      type: Number,
      required: true,
    },
    maxHeat: {
      type: Number,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  });

  const heatPercentage = computed(() => {
    return Math.min((props.currentHeat / props.maxHeat) * 100, 100);
  });
</script>

<style lang="scss" scoped>
  .heat-meter-container {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%);
    border: 2px solid #d4af37;
    border-radius: 8px;
    padding: 12px;
    min-width: 200px;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
    z-index: 1000;

    .heat-meter-title {
      color: #d4af37;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 8px;
      text-align: center;
    }

    .heat-meter-bar {
      position: relative;
      background: #333;
      border: 1px solid #666;
      border-radius: 10px;
      height: 20px;
      overflow: hidden;

      .heat-meter-fill {
        height: 100%;
        background: linear-gradient(90deg, #4caf50 0%, #ffc107 50%, #ff5722 75%, #b71c1c 100%);
        transition: width 0.5s ease;
        border-radius: 9px;
      }

      .heat-meter-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 11px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        pointer-events: none;
      }
    }

    .heat-meter-warning {
      margin-top: 6px;
      color: #ff4444;
      font-size: 11px;
      font-weight: bold;
      text-align: center;
      animation: pulse 1s infinite;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }
</style>
