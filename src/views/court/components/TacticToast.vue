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
  // Toast color tokens (Sass variables, not CSS custom properties)
  $cr-player-bg: #e5f0f3;
  $cr-player-fg: #131313;
  $cr-player-positive: #044707;
  $cr-player-negative: #5f0606;
  $cr-opponent-bg: #1f1c1c;
  $cr-opponent-fg: #f0e8d8;
  $cr-opponent-positive: #88e48c;
  $cr-opponent-negative: #e96262;

  .Vue-Toastification__container {
    .Vue-Toastification__icon {
      display: none;
    }

    // Override default toast font (needs !important to override library default)
    .Vue-Toastification__toast {
      font-family: "Poppins", sans-serif !important;
    }

    .court-toast--player {
      background: $cr-player-bg;
      color: $cr-player-fg;
      .positive .tt-change {
        color: $cr-player-positive;
      }
      .negative .tt-change {
        color: $cr-player-negative;
      }
    }
    .court-toast--opponent {
      background: $cr-opponent-bg;
      color: $cr-opponent-fg;
      .positive .tt-change {
        color: $cr-opponent-positive;
      }
      .negative .tt-change {
        color: $cr-opponent-negative;
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
