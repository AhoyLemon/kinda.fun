<template>
  <div class="banner-ad-overlay" @click="closeBanner">
    <div class="banner-ad" @click.stop>
      <div class="banner-header">
        <div class="browser-bar">
          <span class="url">popup-ads.geocities.net/blessed-deals</span>
          <button class="close-x" @click="closeBanner">×</button>
        </div>
      </div>

      <div class="banner-content">
        <div class="blinking-text">🔥 DA WORSHOP ZONE! 🔥</div>
        <div class="subtitle">Your #1 Source for Church Supplies Online!</div>

        <div class="ad-body">
          <div class="fake-testimonial">
            <div class="testimonial-img broken-img"></div>
            <div class="testimonial-text">
              "Da Worshop Zone changed my ministry FOREVER! Now I can afford that golden toilet!"
              <br />- Pastor Bob, 5 ⭐⭐⭐⭐⭐
            </div>
          </div>

          <div class="features-list">
            ✝️ HOLY WATER VENDING MACHINES<br />
            🕯️ BLUETOOTH PRAYER CANDLES<br />
            ⚡ SAINTS FLOW ENERGY DRINKS<br />
            💺 EXTRA PEWS FOR MORE $$$<br />
            🎥 A/V EQUIPMENT TO LOOK LEGIT<br />
          </div>

          <div class="warning-text">⚠️ WARNING: Site may contain viruses, pop-ups, and questionable business practices ⚠️</div>
        </div>

        <div class="banner-footer">
          <button class="enter-site-btn" @click="openWorshopZone">ENTER DA WORSHOP ZONE NOW!</button>
          <div class="fine-print">*Not responsible for lost souls, missing donations, or FBI investigations</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    close: [];
    showWorkshopZone: [];
  }>();

  function closeBanner() {
    emit("close");
  }

  function openWorshopZone() {
    emit("showWorkshopZone");
  }
</script>

<style scoped>
  .banner-ad-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .banner-ad {
    width: 600px;
    background: #ffffff;
    border: 3px solid #000080;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
    font-family: "Times New Roman", serif;
  }

  .browser-bar {
    background: #c0c0c0;
    padding: 2px 4px;
    border-bottom: 1px solid #808080;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }

  .url {
    background: white;
    border: 1px inset #c0c0c0;
    padding: 1px 4px;
    flex: 1;
    margin-right: 8px;
  }

  .close-x {
    background: #c0c0c0;
    border: 1px outset #c0c0c0;
    width: 20px;
    height: 18px;
    font-weight: bold;
    cursor: pointer;
  }

  .banner-content {
    padding: 16px;
    background: linear-gradient(45deg, #ff69b4, #00ffff, #ffff00, #ff69b4);
    animation: rainbow 3s linear infinite;
  }

  @keyframes rainbow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .blinking-text {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    color: #ff0000;
    text-shadow: 2px 2px 4px #000000;
    animation: blink 1s step-start infinite;
    margin-bottom: 8px;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  .subtitle {
    text-align: center;
    font-size: 16px;
    color: #000080;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .ad-body {
    background: #ffffcc;
    border: 2px dashed #ff0000;
    padding: 12px;
    margin: 12px 0;
  }

  .fake-testimonial {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
  }

  .testimonial-img {
    width: 64px;
    height: 64px;
    border: 1px solid #000;
  }

  .broken-img {
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .broken-img::after {
    content: "🖼️\AIMG";
    white-space: pre;
    text-align: center;
    font-size: 10px;
    color: #666;
  }

  .testimonial-text {
    flex: 1;
    font-style: italic;
    font-size: 14px;
  }

  .features-list {
    font-size: 14px;
    font-weight: bold;
    color: #000080;
    line-height: 1.5;
    margin: 12px 0;
  }

  .warning-text {
    font-size: 10px;
    color: #800000;
    text-align: center;
    margin-top: 8px;
  }

  .banner-footer {
    text-align: center;
  }

  .enter-site-btn {
    background: linear-gradient(45deg, #ff0000, #ffff00);
    border: 3px outset #c0c0c0;
    padding: 12px 24px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 2px #000;
    cursor: pointer;
    margin-bottom: 8px;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .enter-site-btn:hover {
    filter: brightness(1.2);
  }

  .fine-print {
    font-size: 8px;
    color: #666;
    line-height: 1.2;
  }
</style>
