<template lang="pug">
  Teleport(to="body")
    .voicemail-overlay(v-if="isVisible" @click.self="$emit('close')")
      .voicemail-container
        .voicemail-header
          h3 📞 Voicemail from Sterling Silver
          button.close-btn(@click="$emit('close')") ✕
          
        .voicemail-content
          .audio-player
            audio(
              ref="audioElement"
              controls
              autoplay
              @ended="onAudioEnded"
              @play="onAudioPlay"
              @pause="onAudioPause"
            )
              source(src="/audio/megachurch/jimmysterling-1.mp3" type="audio/mpeg")
              | Your browser does not support the audio element.
              
          .voicemail-transcript
            .transcript-header Transcript:
            .transcript-text
              p Blessings and favor upon you, my dear friend! Sterling here. I trust you’re walking in the Lord’s abundance, as always.
              p …Alright, let’s cut the shit. The Feds are paying attention. And let me be clear: they’re going to keep paying attention to you. The money you’ve made for me so far has been spent on things the federal government has traditionally taken exception to. Simple-minded Judases who never understood that part of my religious mission involves a demonstration of the divine. And what’s more divine than the gold-plated shoes I just bought? If it were up to them, they’d say a man of God shouldn’t own a racehorse in the first place!
              p Now, I know what you’re thinking—how do I get out of this? But let me stop you right there. I know how this ends: one way or another, you’re going in a box. It’s just a matter of time. So before the final altar call, do what any wise servant would: earn me enough mammon so we can both secure our eternal legacy. You catch my drift.
              p I’ll be praying for you. But obviously, we’ve never met. Godspeed, servant of the Lord.
                
        .voicemail-actions
          button.replay-btn(@click="replayAudio") 🔄 Replay
          button.proceed-btn(@click="proceedToShop") 🏛️ View Catalog
          
</template>

<script setup>
  import { ref, nextTick, onMounted } from "vue";

  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["close", "voicemailCompleted", "openShop"]);

  const audioElement = ref(null);
  const audioLoaded = ref(false);
  const isPlaying = ref(false);

  onMounted(() => {
    if (audioElement.value) {
      audioElement.value.addEventListener("loadeddata", () => {
        audioLoaded.value = true;
      });
    }
  });

  function onAudioPlay() {
    isPlaying.value = true;
  }

  function onAudioPause() {
    isPlaying.value = false;
  }

  function onAudioEnded() {
    isPlaying.value = false;
    emit("voicemailCompleted");
  }

  function replayAudio() {
    if (audioElement.value) {
      audioElement.value.currentTime = 0;
      audioElement.value.play();
    }
  }

  function proceedToShop() {
    emit("openShop");
    emit("close");
  }
</script>

<style lang="scss" scoped>
  .voicemail-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
    backdrop-filter: blur(5px);
  }

  .voicemail-container {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%);
    border: 3px solid #d4af37;
    border-radius: 12px;
    width: 90vw;
    max-width: 700px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 32px rgba(212, 175, 55, 0.5);
    overflow: hidden;
  }

  .voicemail-header {
    background: linear-gradient(90deg, #d4af37, #f4e17a);
    color: #1a1a1a;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: bold;
    }

    .close-btn {
      background: none;
      border: 2px solid #1a1a1a;
      color: #1a1a1a;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;

      &:hover {
        background: #1a1a1a;
        color: #d4af37;
      }
    }
  }

  .voicemail-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;

    .audio-player {
      margin-bottom: 24px;
      text-align: center;

      audio {
        width: 100%;
        max-width: 400px;
        height: 40px;
      }
    }

    .voicemail-transcript {
      .transcript-header {
        color: #d4af37;
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 12px;
        border-bottom: 1px solid #444;
        padding-bottom: 8px;
      }

      .transcript-text {
        color: #ccc;
        line-height: 1.6;

        p {
          margin-bottom: 12px;
          font-size: 14px;
        }

        .signature {
          color: #d4af37;
          font-weight: bold;
          margin-top: 20px;
          margin-bottom: 4px;
        }

        .subtitle {
          color: #888;
          font-size: 12px;
          margin-bottom: 0;
        }
      }
    }
  }

  .voicemail-actions {
    background: #2a2a2a;
    padding: 16px 24px;
    display: flex;
    gap: 12px;
    border-top: 1px solid #444;

    button {
      flex: 1;
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
      transition: all 0.2s;

      &:disabled {
        background: #666;
        color: #999;
        cursor: not-allowed;
      }
    }

    .replay-btn {
      background: #666;
      color: white;

      &:hover:not(:disabled) {
        background: #777;
      }
    }

    .proceed-btn {
      background: #d4af37;
      color: #1a1a1a;

      &:hover:not(:disabled) {
        background: #f4e17a;
        transform: translateY(-1px);
      }
    }
  }
</style>
