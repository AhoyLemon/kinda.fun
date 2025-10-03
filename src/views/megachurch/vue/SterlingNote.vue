<template>
  <div class="sterling-note-overlay" v-if="isVisible" @click="hideNote">
    <div class="note-paper" @click.stop>
      <div class="note-header">
        <span class="note-title">Handwritten Note</span>
        <button class="close-button" @click="hideNote">&times;</button>
      </div>
      <div class="note-content">
        <p>Dearest {{ playerName || "friend" }},</p>

        <p>
          The Lord has seen fit to bring us together, and I must say, it is no coincidence. I have been watching your work, and it is clear to me that you are
          destined for something far greater than the humble beginnings you now occupy. You have the spark, the fire, the <em>potential</em> to build a ministry
          that will echo through the ages.
        </p>

        <p>
          I am Sterling Silver. If you know anything about faith on television, you know my name—I was once America's most celebrated televangelist. These days,
          I write to you from a cell, punished not for my devotion, but by the wicked who envy true greatness. They call it fraud, money laundering
          <span class="crossed-out">maybe murder</span> but let me assure you: the righteous are always persecuted. The Lord moves in mysterious ways, and I
          remain His most devoted servant. Together, we can do great things.
        </p>

        <p>
          Now, I see in you the opportunity to continue my legacy. Together, we will build something extraordinary—a ministry that will shake the heavens and
          fill the coffers. You will preach, and I will guide. You will gather, and I will multiply. The Lord's work is never done, and neither is mine.
        </p>

        <p>Text me at (555) SIL-VERY. Do not keep me waiting.</p>

        <p class="signature">
          Yours in faith and commerce,<br />
          Sterling Silver
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  interface Props {
    playerName: string;
  }

  const props = defineProps<Props>();
  const isVisible = ref(false);

  const emit = defineEmits<{
    noteRead: [];
  }>();

  function showNote() {
    isVisible.value = true;
  }

  function hideNote() {
    isVisible.value = false;
    emit("noteRead");
  }

  // Expose showNote for parent component
  defineExpose({
    showNote,
  });
</script>

<style scoped>
  .sterling-note-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(2px);
  }

  .note-paper {
    background: #f8f6f0;
    background-image:
      linear-gradient(to bottom, transparent 0px, transparent 24px, #ccc 25px, transparent 26px),
      linear-gradient(to right, #ff6b6b 0px, #ff6b6b 2px, transparent 3px);
    padding: 40px 60px 40px 80px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 4px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    font-family: "Times New Roman", serif;
    line-height: 1.8;
    position: relative;
    transform: rotate(-1deg);
    animation: noteAppear 0.3s ease-out;
  }

  @keyframes noteAppear {
    from {
      opacity: 0;
      transform: scale(0.8) rotate(-1deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(-1deg);
    }
  }

  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #333;
    padding-bottom: 10px;
  }

  .note-title {
    font-weight: bold;
    font-size: 18px;
    color: #333;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-button:hover {
    background: #ddd;
    color: #000;
  }

  .note-content {
    color: #2c2c2c;
    font-size: 16px;
  }

  .note-content p {
    margin-bottom: 16px;
    text-align: left;
  }

  .crossed-out {
    text-decoration: line-through;
    color: #666;
  }

  .signature {
    margin-top: 30px;
    font-style: italic;
    text-align: right;
  }

  em {
    font-style: italic;
    text-decoration: underline;
  }
</style>
