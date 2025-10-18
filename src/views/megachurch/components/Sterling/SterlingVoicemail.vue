<template lang="pug">
  Teleport(to="body")
    .voicemail-overlay(v-if="isVisible" @click.self="$emit('close')")
      .voicemail-container
        .voicemail-header
          .header-left
            .avatar
              .initials SS
            .meta
              .bigtext Voicemail — Sterling Silver
              .subtext Sent {{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}}
          button.close-btn(@click="$emit('close')") ✕

        .voicemail-content
          .audio-section
            audio.native-audio(controls preload="metadata" ref="audioElement" @ended="onAudioEnded" @play="onAudioPlay" @pause="onAudioPause")
              source(src="/audio/megachurch/jimmysterling-1.mp3" type="audio/mpeg")

          .voicemail-transcript
            .transcript-box
              .transcript-header
                strong Transcript              
              .transcript-text
                p Blessings and favor upon you, my dear friend! Sterling here. I trust you’re walking in the Lord’s abundance, as always.
                p …Alright, let’s cut the shit. The Feds are paying attention. And let me be clear: they’re going to keep paying attention to you. The money you’ve made for me so far has been spent on things the federal government has traditionally taken exception to. Simple-minded Judases who never understood that part of my religious mission involves a demonstration of the divine. And what’s more divine than the gold-plated shoes I just bought? If it were up to them, they’d say a man of God shouldn’t own a racehorse in the first place!
                p Now, I know what you’re thinking—how do I get out of this? But let me stop you right there. I know how this ends: one way or another, you’re going in a box. It’s just a matter of time. So before the final altar call, do what any wise servant would: earn me enough mammon so we can both secure our eternal legacy. You catch my drift.

        .voicemail-actions
          button.primary(@click="proceedToShop") View Your Eternal Legacy
</template>

<script setup>
  import { ref, nextTick, onMounted, watch } from "vue";

  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["close", "voicemailCompleted", "openShop"]);

  const audioElement = ref(null);

  onMounted(() => {
    if (audioElement.value) {
      audioElement.value.addEventListener("loadeddata", () => {});
    }
  });

  watch(
    () => props.isVisible,
    (visible) => {
      if (visible) {
        nextTick(() => {
          // Autoplay when visible if possible
          if (audioElement.value) {
            audioElement.value.play().catch(() => {});
          }
        });
      } else {
        // Pause when hidden
        if (audioElement.value) {
          audioElement.value.pause();
          audioElement.value.currentTime = 0;
        }
        // reset state
      }
    },
  );

  function onAudioPlay() {
    // native controls handle UI state
  }

  function onAudioPause() {
    // native controls handle UI state
  }

  function onAudioEnded() {
    // native controls handle UI state
    emit("voicemailCompleted");
  }

  // native audio controls handle play/pause UI so no custom toggle required

  function replayAudio() {
    if (audioElement.value) {
      audioElement.value.currentTime = 0;
      audioElement.value.play().catch(() => {});
    }
  }

  // removed seek and formatTime: native audio controls display timestamps

  function proceedToShop() {
    emit("openShop");
    emit("close");
  }
</script>

<style lang="scss" src="./SterlingVoicemail.scss"></style>
