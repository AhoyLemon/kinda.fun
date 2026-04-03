<template lang="pug" src="./TacticToast.pug"></template>

<script setup>
  defineProps({
    actor: { type: String, required: true }, // 'player' | 'opponent'
    tacticName: { type: String, required: true },
    results: { type: Array, required: true }, // { justiceName, change }[]
  });
</script>

<style lang="scss">
  .Vue-Toastification__container {
    .Vue-Toastification__icon {
      display: none;
    }
    .court-toast--player {
      background: #e5f0f3;
      color: #131313;
      .positive .tt-change {
        color: #044707;
      }
      .negative .tt-change {
        color: #5f0606;
      }
    }
    .court-toast--opponent {
      background: #1f1c1c;
      color: #f0e8d8;
      .positive .tt-change {
        color: #88e48c;
      }
      .negative .tt-change {
        color: #e96262;
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
