<template lang="pug" src="./TacticToast.pug"></template>

<script setup>
  defineProps({
    actor: { type: String, required: true }, // 'player' | 'opponent'
    tacticName: { type: String, required: true },
    results: { type: Array, required: true }, // { justiceName, change }[]
    feedback: { type: String, default: null }, // optional feedback for utility cards
  });
</script>

<style lang="scss">
  .Vue-Toastification__container {
    .Vue-Toastification__icon {
      display: none;
    }
    .court-toast--player {
      background: var(--cr-player-bg);
      color: var(--cr-player-fg);
      .positive .tt-change {
        color: var(--cr-player-positive);
      }
      .negative .tt-change {
        color: var(--cr-player-negative);
      }
    }
    .court-toast--opponent {
      background: var(--cr-opponent-bg);
      color: var(--cr-opponent-fg);
      .positive .tt-change {
        color: var(--cr-opponent-positive);
      }
      .negative .tt-change {
        color: var(--cr-opponent-negative);
      }
    }

    .tactic-toast {
      font-size: 12px;
      .tt-header {
        font-size: 125%;
      }
      .tt-result {
        display: flex;
        align-items: center;
        gap: 6px;
        .justice-name {
          font-weight: 600;
        }
        .tt-change {
          font-weight: 700;
        }
        .tt-side-effect {
          font-size: 85%;
          opacity: 0.75;
          font-style: italic;
        }
      }
    }
  }
</style>
