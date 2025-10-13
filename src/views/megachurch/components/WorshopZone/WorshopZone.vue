<template>
  <div class="workshop-zone-overlay" @click="closeWorkshop">
    <div class="workshop-zone" @click.stop>
      <!-- IE6 Browser Chrome -->
      <div class="browser-chrome">
        <div class="title-bar">
          <span class="window-title">Da Worshop Zone - Internet Explorer</span>
          <div class="window-controls">
            <button class="minimize-btn">_</button>
            <button class="maximize-btn">□</button>
            <button class="close-btn" @click="closeWorkshop">×</button>
          </div>
        </div>

        <div class="menu-bar">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Favorites</span>
          <span>Tools</span>
          <span>Help</span>
        </div>

        <div class="toolbar">
          <button class="nav-btn">◀ Back</button>
          <button class="nav-btn">▶ Forward</button>
          <button class="nav-btn">🏠 Home</button>
          <div class="address-bar">
            <span class="security-icon">🔒❌</span>
            <input value="http://worship-mart.biz/blessed-deals" readonly />
            <button class="go-btn">Go</button>
          </div>
        </div>
      </div>

      <!-- Website Content -->
      <div class="website-content">
        <div class="header">
          <div class="logo-section">
            <div class="logo broken-img"></div>
            <h1 class="site-title">DA WORSHOP ZONE</h1>
            <div class="tagline">Your Divine Source for Church Supplies!</div>
          </div>

          <!--<div class="security-warnings">
            <div class="warning-popup">⚠️ This site is NOT SECURE</div>
            <div class="certificate-error">Certificate Error - Proceed Anyway?</div>
          </div> -->
        </div>

        <div class="navigation-tabs">
          <button class="tab" :class="{ active: activeTab === 'merch' }" @click="activeTab = 'merch'">🛒 HALLWAY MERCH</button>
          <button class="tab" :class="{ active: activeTab === 'upgrades' }" @click="activeTab = 'upgrades'">⛪ CHURCH UPGRADES</button>
          <button class="tab" :class="{ active: activeTab === 'marketing' }" @click="activeTab = 'marketing'">📢 MARKETING</button>
        </div>

        <!-- Merch Tab -->
        <div v-if="activeTab === 'merch'" class="tab-content">
          <h2>Hallway Merchandise</h2>
          <div class="product-grid">
            <!-- Holy Water Bottles -->
            <div class="product-card">
              <div class="product-img broken-img"></div>
              <h3>Bottles of Holy Water</h3>
              <div class="product-description">
                Blessed H2O in convenient bottles! Because tap water just doesn't have that divine touch. Each attendee has
                {{ gameSettings.church.merch.holyWater.baseChance }}% chance to buy.
              </div>
              <div class="product-stats">
                <div>Cost: ${{ gameSettings.church.merch.holyWater.cost }} each</div>
                <div>Selling Price: ${{ my.church.merch.holyWater.price }}</div>
                <div>In Stock: {{ my.church.merch.holyWater.inventory }}</div>
                <div>Sold Today: {{ my.church.merch.holyWater.soldToday }}</div>
                <div v-if="my.church.merch.holyWater.isVendingMachine">
                  Vending Machine Installed (+{{ gameSettings.church.merch.holyWaterVendingMachine.bonusChance }}% sales chance)
                </div>
              </div>
              <div class="product-actions">
                <input
                  type="number"
                  v-model="merchQuantities.holyWater"
                  min="1"
                  max="50"
                  class="quantity-input"
                  :required="false"
                  @focus="setDefaultQuantity('holyWater')"
                  @keydown.enter.prevent
                />
                <button @click="buyMerch('holyWater')" class="buy-btn" :disabled="!canAffordMerch('holyWater')">
                  BUY {{ merchQuantities.holyWater }} FOR ${{ getMerchCost("holyWater") }} (incl. shipping)
                </button>
              </div>

              <template v-if="!my.church.merch.holyWater.isVendingMachine">
                <h3>Holy Water Vending Machine</h3>
                <div class="product-description">
                  Automated holy water sales! Because nothing says "spiritual experience" like pumping quarters into a machine. Adds +{{
                    gameSettings.church.merch.holyWaterVendingMachine.bonusChance
                  }}% chance for holy water purchases.
                </div>
                <button class="buy-btn big" :disabled="my.money < gameSettings.church.merch.holyWaterVendingMachine.cost" @click="buyVendingMachine()">
                  INSTALL FOR ${{ gameSettings.church.merch.holyWaterVendingMachine.cost }}
                </button>
              </template>
            </div>

            <!-- Prayer Candles -->
            <div class="product-card">
              <div class="product-img broken-img"></div>
              <h3>Bluetooth Prayer Candles</h3>
              <div class="product-description">
                "Smart" candles with Bluetooth! Perfect for the tech-savvy spiritual seeker who needs their prayers wirelessly transmitted. Each attendee has
                {{ gameSettings.church.merch.prayerCandles.baseChance }}% chance to buy.
              </div>
              <div class="product-stats">
                <div>Cost: ${{ gameSettings.church.merch.prayerCandles.cost }} each</div>
                <div>Selling Price: ${{ my.church.merch.prayerCandles.price }}</div>
                <div>In Stock: {{ my.church.merch.prayerCandles.inventory }}</div>
                <div>Sold Today: {{ my.church.merch.prayerCandles.soldToday }}</div>
              </div>
              <div class="product-actions">
                <input
                  type="number"
                  v-model="merchQuantities.prayerCandles"
                  min="1"
                  max="100"
                  class="quantity-input"
                  :required="false"
                  @focus="setDefaultQuantity('prayerCandles')"
                  @keydown.enter.prevent
                />
                <button @click="buyMerch('prayerCandles')" class="buy-btn" :disabled="!canAffordMerch('prayerCandles')">
                  BUY {{ merchQuantities.prayerCandles }} FOR ${{ getMerchCost("prayerCandles") }} (incl. shipping)
                </button>
              </div>
            </div>

            <!-- Weight Loss Tea -->
            <div class="product-card">
              <div class="product-img broken-img"></div>
              <h3>Miracle Weight Loss Tea</h3>
              <div class="product-description">
                Drop pounds and sins—fast! Our secret blend is so effective, you’ll swear it’s illegal. (May contain trace amounts of methamphetamine. Not FDA
                approved.)
                {{ gameSettings.church.merch.weightLossTea.baseChance }}% chance to buy.
              </div>
              <div class="product-stats">
                <div>Cost: ${{ gameSettings.church.merch.weightLossTea.cost }} each</div>
                <div>Selling Price: ${{ my.church.merch.weightLossTea.price }}</div>
                <div>In Stock: {{ my.church.merch.weightLossTea.inventory }}</div>
                <div>Sold Today: {{ my.church.merch.weightLossTea.soldToday }}</div>
              </div>
              <div class="product-actions">
                <input
                  type="number"
                  v-model="merchQuantities.weightLossTea"
                  min="1"
                  max="100"
                  class="quantity-input"
                  :required="false"
                  @focus="setDefaultQuantity('weightLossTea')"
                  @keydown.enter.prevent
                />
                <button @click="buyMerch('weightLossTea')" class="buy-btn" :disabled="!canAffordMerch('weightLossTea')">
                  BUY {{ merchQuantities.weightLossTea }} FOR ${{ getMerchCost("weightLossTea") }} (incl. shipping)
                </button>
              </div>
            </div>

            <!-- Beach Towel -->
            <div class="product-card">
              <div class="product-img broken-img"></div>
              <h3>Shroud of Turin Beach Towel</h3>
              <div class="product-description">
                Make every beach day a miracle! This full-size towel features a mysterious, ancient image—perfect for sunbathing, baptisms, or just showing off
                your faith in style.
                {{ gameSettings.church.merch.beachTowel.baseChance }}% chance to buy.
              </div>
              <div class="product-stats">
                <div>Cost: ${{ gameSettings.church.merch.beachTowel.cost }} each</div>
                <div>Selling Price: ${{ my.church.merch.beachTowel.price }}</div>
                <div>In Stock: {{ my.church.merch.beachTowel.inventory }}</div>
                <div>Sold Today: {{ my.church.merch.beachTowel.soldToday }}</div>
              </div>
              <div class="product-actions">
                <input
                  type="number"
                  v-model="merchQuantities.beachTowel"
                  min="1"
                  max="100"
                  class="quantity-input"
                  :required="false"
                  @focus="setDefaultQuantity('beachTowel')"
                  @keydown.enter.prevent
                />
                <button @click="buyMerch('beachTowel')" class="buy-btn" :disabled="!canAffordMerch('prayerCandles')">
                  BUY {{ merchQuantities.beachTowel }} FOR ${{ getMerchCost("beachTowel") }} (incl. shipping)
                </button>
              </div>
            </div>

            <!-- Exorcism Kit-->
            <div class="product-card">
              <div class="product-img broken-img"></div>
              <h3>Lil' Reagan’s Exorcism Kit</h3>
              <div class="product-description">
                Got demons? Don’t call a priest—do it yourself! This totally unlicensed kit (with a look inspired by a certain 1973 film) includes everything
                you need to send evil spirits packing: plastic cross, holy water atomizer, and a scroll of Lorem Ipsum, which is pretty much Latin. For
                entertainment purposes only.
                {{ gameSettings.church.merch.exorcismKit.baseChance }}% chance to buy.
              </div>
              <div class="product-stats">
                <div>Cost: ${{ gameSettings.church.merch.exorcismKit.cost }} each</div>
                <div>Selling Price: ${{ my.church.merch.exorcismKit.price }}</div>
                <div>In Stock: {{ my.church.merch.exorcismKit.inventory }}</div>
                <div>Sold Today: {{ my.church.merch.exorcismKit.soldToday }}</div>
              </div>
              <div class="product-actions">
                <input
                  type="number"
                  v-model="merchQuantities.exorcismKit"
                  min="1"
                  max="100"
                  class="quantity-input"
                  :required="false"
                  @focus="setDefaultQuantity('exorcismKit')"
                  @keydown.enter.prevent
                />
                <button @click="buyMerch('exorcismKit')" class="buy-btn" :disabled="!canAffordMerch('exorcismKit')">
                  BUY {{ merchQuantities.exorcismKit }} FOR ${{ getMerchCost("exorcismKit") }} (incl. shipping)
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Upgrades Tab -->
        <div v-if="activeTab === 'upgrades'" class="tab-content">
          <h2>Church Upgrades</h2>
          <div class="upgrade-grid">
            <div class="upgrade-card">
              <div class="upgrade-img broken-img"></div>
              <h3>Extra Pews</h3>
              <div class="upgrade-description">
                More seating = more donations! Because standing during sermons builds character, but sitting builds bigger collection plates. Each pew adds
                {{ gameSettings.church.upgrades.extraPews.capacityIncrease }} capacity.
              </div>
              <div class="upgrade-stats">
                <div>Cost: ${{ gameSettings.church.upgrades.extraPews.cost }} per pew</div>
                <div>Current Pews: {{ my.church.upgrades.extraPews }}</div>
                <div>
                  Current Capacity: {{ my.church.maxAttendance + my.church.upgrades.extraPews * gameSettings.church.upgrades.extraPews.capacityIncrease }}
                </div>
              </div>
              <button @click="buyUpgrade('extraPews')" class="buy-btn" :disabled="my.money < gameSettings.church.upgrades.extraPews.cost">
                BUY 1 PEW FOR ${{ gameSettings.church.upgrades.extraPews.cost }}
              </button>
            </div>

            <div class="upgrade-card">
              <div class="upgrade-img broken-img"></div>
              <h3>VIP Confession Booths</h3>
              <div class="upgrade-description">
                Express forgiveness for busy sinners! Skip the guilt, go straight to the donation. Generates ${{
                  gameSettings.church.upgrades.vipConfessionBooths.revenuePerUse
                }}
                per use.
              </div>
              <div class="upgrade-stats">
                <div>Cost: ${{ gameSettings.church.upgrades.vipConfessionBooths.cost }}</div>
                <div>Status: {{ my.church.upgrades.vipConfessionBooths ? "INSTALLED" : "NOT INSTALLED" }}</div>
              </div>
              <button
                v-if="!my.church.upgrades.vipConfessionBooths"
                @click="buyUpgrade('vipConfessionBooths')"
                class="buy-btn big"
                :disabled="my.money < gameSettings.church.upgrades.vipConfessionBooths.cost"
              >
                INSTALL FOR ${{ gameSettings.church.upgrades.vipConfessionBooths.cost }}
              </button>
              <div v-else class="installed-text">✅ INSTALLED</div>
            </div>

            <div class="upgrade-card">
              <div class="upgrade-img broken-img"></div>
              <h3>Audio/Visual Equipment</h3>
              <div class="upgrade-description">
                Professional A/V setup! Because if you're going to spread the word, might as well do it in HD with surround sound. Increases chance of positive
                sermon reactions by {{ gameSettings.church.upgrades.audioVisual.likeBoost }}%.
              </div>
              <div class="upgrade-stats">
                <div>Cost: ${{ gameSettings.church.upgrades.audioVisual.cost }}</div>
                <div>Status: {{ my.church.upgrades.audioVisual ? "INSTALLED" : "NOT INSTALLED" }}</div>
              </div>
              <button
                v-if="!my.church.upgrades.audioVisual"
                @click="buyUpgrade('audioVisual')"
                class="buy-btn big"
                :disabled="my.money < gameSettings.church.upgrades.audioVisual.cost"
              >
                INSTALL FOR ${{ gameSettings.church.upgrades.audioVisual.cost }}
              </button>
              <div v-else class="installed-text">✅ INSTALLED</div>
            </div>

            <div class="upgrade-card">
              <div class="upgrade-img broken-img"></div>
              <h3>Seraph AI Sermon Analysis</h3>
              <div class="upgrade-description">
                Cutting-edge AI that analyzes your sermon topics and predicts audience reactions before you preach! See which religions will love or hate your
                message in real-time. Subscription service: ${{ gameSettings.church.upgrades.seraphAI.cost }} per day.
              </div>
              <div class="upgrade-stats">
                <div>Daily Cost: ${{ gameSettings.church.upgrades.seraphAI.cost }}</div>
                <div>Status: {{ my.church.upgrades.seraphAI ? "ACTIVE" : "INACTIVE" }}</div>
              </div>
              <button
                v-if="!my.church.upgrades.seraphAI"
                @click="toggleSeraphAI()"
                class="unlock-btn big"
                :disabled="my.money < gameSettings.church.upgrades.seraphAI.cost"
              >
                ACTIVATE FOR ${{ gameSettings.church.upgrades.seraphAI.cost }}/DAY
              </button>
              <button v-else @click="toggleSeraphAI()" class="buy-btn big">DEACTIVATE SERVICE</button>
            </div>

            <div class="upgrade-card">
              <div class="upgrade-img broken-img"></div>
              <h3>Branded Communion Snacks</h3>
              <div class="upgrade-description">Upgrade your wine and bread for better congregation satisfaction!</div>
              <div class="sacrament-section">
                <h4>Wine Level: {{ my.church.upgrades.sacrament.wine.level }} - {{ my.church.upgrades.sacrament.wine.name }}</h4>
                <div class="sacrament-options">
                  <div
                    v-for="wineLevel in gameSettings.church.upgrades.sacraments.wine.levels.slice(
                      my.church.upgrades.sacrament.wine.level + 1,
                      my.church.upgrades.sacrament.wine.level + 2,
                    )"
                    :key="wineLevel.level"
                    class="sacrament-option"
                  >
                    <span>{{ wineLevel.name }} (+{{ wineLevel.likeBoost }}% likes)</span>
                    <button @click="upgradeWine(wineLevel)" class="buy-btn" :disabled="my.money < wineLevel.cost">${{ wineLevel.cost }}</button>
                  </div>
                </div>
              </div>
              <div class="sacrament-section">
                <h4>Bread Level: {{ my.church.upgrades.sacrament.bread.level }} - {{ my.church.upgrades.sacrament.bread.name }}</h4>
                <div class="sacrament-options">
                  <div
                    v-for="breadLevel in gameSettings.church.upgrades.sacraments.bread.levels.slice(
                      my.church.upgrades.sacrament.bread.level + 1,
                      my.church.upgrades.sacrament.bread.level + 2,
                    )"
                    :key="breadLevel.level"
                    class="sacrament-option"
                  >
                    <span>{{ breadLevel.name }} (+{{ breadLevel.likeBoost }}% likes)</span>
                    <button @click="upgradeBread(breadLevel)" class="buy-btn" :disabled="my.money < breadLevel.cost">${{ breadLevel.cost }}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Marketing Tab -->
        <div v-if="activeTab === 'marketing'" class="tab-content">
          <h2>Internet Marketing</h2>
          <div class="marketing-grid">
            <div class="marketing-card">
              <div class="marketing-img broken-img"></div>
              <h3>General Internet Ad Campaign</h3>
              <div class="marketing-description">
                Broad online advertising to boost overall attendance by {{ gameSettings.church.marketing.generalAd.attendanceBoost }}% for
                {{ gameSettings.church.marketing.generalAd.duration }} day(s). Spam the internet with pop-ups about salvation!
              </div>
              <div class="marketing-stats">
                <div>Cost: ${{ gameSettings.church.marketing.generalAd.price }}</div>
                <div>Status: {{ my.marketing.generalAdActive ? "ACTIVE" : "INACTIVE" }}</div>
              </div>
              <button
                v-if="!my.marketing.generalAdActive"
                @click="buyMarketing('generalAd')"
                class="buy-btn big"
                :disabled="my.money < gameSettings.church.marketing.generalAd.price"
              >
                RUN CAMPAIGN FOR ${{ gameSettings.church.marketing.generalAd.price }}
              </button>
              <div v-else class="active-text">📢 CAMPAIGN ACTIVE</div>
            </div>

            <div class="marketing-card">
              <div class="marketing-img broken-img"></div>
              <h3>Targeted Internet Ad Campaign</h3>
              <div class="marketing-description">
                Target a specific religion to boost their attendance by {{ gameSettings.church.marketing.targetedAd.targetReligionBoost }}% for
                {{ gameSettings.church.marketing.targetedAd.duration }} day(s). Because nothing says "conversion" like targeted advertising!
              </div>
              <div class="marketing-stats">
                <div>Cost: ${{ gameSettings.church.marketing.targetedAd.price }}</div>
                <div>Status: {{ my.marketing.targetedAd.active ? "ACTIVE" : "INACTIVE" }}</div>
                <div v-if="my.marketing.targetedAd.active">Target: {{ my.marketing.targetedAd.targetReligion?.name }}</div>
              </div>
              <div v-if="!my.marketing.targetedAd.active" class="targeting-section">
                <select v-model="selectedTargetReligion" class="religion-select">
                  <option value="">Select Religion to Target</option>
                  <option v-for="religion in availableReligions" :key="religion.id" :value="religion">
                    {{ religion.name }}
                  </option>
                </select>
                <button
                  @click="buyTargetedMarketing()"
                  class="buy-btn"
                  :disabled="!selectedTargetReligion || my.money < gameSettings.church.marketing.targetedAd.price"
                >
                  RUN CAMPAIGN FOR ${{ gameSettings.church.marketing.targetedAd.price }}
                </button>
              </div>
              <div v-else class="active-text">🎯 TARGETING {{ my.marketing.targetedAd.targetReligion?.name?.toUpperCase() }}</div>
            </div>

            <div class="marketing-card">
              <div class="marketing-img broken-img"></div>
              <h3>Sign Spinner</h3>
              <div class="marketing-description">
                Pay someone to spin a sign outside! Boosts attendance by {{ gameSettings.church.marketing.signSpinner.attendanceBoost }}% for
                {{ gameSettings.church.marketing.signSpinner.duration }} day(s). Nothing attracts worshippers like impressive sign-spinning skills.
              </div>
              <div class="marketing-stats">
                <div>Cost: ${{ gameSettings.church.marketing.signSpinner.price }}</div>
                <div>Status: {{ my.marketing.signSpinnerActive ? "ACTIVE" : "INACTIVE" }}</div>
              </div>
              <button
                v-if="!my.marketing.signSpinnerActive"
                @click="buyMarketing('signSpinner')"
                class="buy-btn big"
                :disabled="my.money < gameSettings.church.marketing.signSpinner.price"
              >
                HIRE SPINNER FOR ${{ gameSettings.church.marketing.signSpinner.price }}
              </button>
              <div v-else class="active-text">🪧 SPINNER ACTIVE</div>
            </div>

            <div class="marketing-card">
              <div class="marketing-img broken-img"></div>
              <h3>PR Campaign</h3>
              <div class="marketing-description">
                Hire a PR firm to improve your church's reputation with a specific religion. Adds
                {{ gameSettings.church.marketing.prCampaign.reputationBoost }} points to that religion's scorecard for
                {{ gameSettings.church.marketing.prCampaign.duration }} day(s). Professional spin doctors for your salvation business!
              </div>
              <div class="marketing-stats">
                <div>Cost: ${{ gameSettings.church.marketing.prCampaign.price }}</div>
                <div>Status: {{ my.marketing.prCampaign.active ? "ACTIVE" : "INACTIVE" }}</div>
                <div v-if="my.marketing.prCampaign.active">Target: {{ my.marketing.prCampaign.targetReligion?.name }}</div>
              </div>
              <div v-if="!my.marketing.prCampaign.active" class="targeting-section">
                <select v-model="selectedPrReligion" class="religion-select">
                  <option value="">Select Religion to Target</option>
                  <option v-for="religion in availableReligions" :key="religion.id" :value="religion">
                    {{ religion.name }}
                  </option>
                </select>
                <button @click="buyPrCampaign()" class="buy-btn" :disabled="!selectedPrReligion || my.money < gameSettings.church.marketing.prCampaign.price">
                  RUN CAMPAIGN FOR ${{ gameSettings.church.marketing.prCampaign.price }}
                </button>
              </div>
              <div v-else class="active-text">📢 IMPROVING {{ my.marketing.prCampaign.targetReligion?.name?.toUpperCase() }} RELATIONS</div>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="visitor-counter">
            <div class="counter-gif broken-img"></div>
            You are visitor #{{ Math.floor(Math.random() * 999999) + 1 }}!
          </div>
          <div class="copyright">© 2000 Da Worshop Zone. All rights reserved. Not responsible for spiritual damage.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from "vue";
  import { gameSettings } from "../../ts/variables/_gameSettings";
  import { my } from "../../ts/variables/_my";
  import { ui } from "../../ts/variables/_ui";
  import { religions } from "../../ts/_religions";

  type MerchTypes = "holyWater" | "prayerCandles" | "weightLossTea" | "beachTowel" | "exorcismKit";

  const emit = defineEmits<{
    close: [];
    purchase: [{ type: string; name: string; quantity?: number; communionType?: string; level?: number; targetedReligion?: string }];
  }>();

  const activeTab = ref("merch");

  // Watch for default tab changes
  watch(
    () => ui.workshopZone.defaultTab,
    (newTab) => {
      if (newTab && ui.workshopZone.isOpen) {
        activeTab.value = newTab;
        // Reset the default tab to prevent it from affecting future opens
        ui.workshopZone.defaultTab = "merch";
      }
    },
    { immediate: true },
  );

  // Merch quantities for purchasing
  const merchQuantities = ref({
    holyWater: 10,
    prayerCandles: 5,
    weightLossTea: 20,
    beachTowel: 10,
    exorcismKit: 5,
  });

  const selectedTargetReligion = ref<any>(null);
  const selectedPrReligion = ref<any>(null);

  const availableReligions = computed(() => {
    if (!my.church.location?.religions) return [];
    return my.church.location.religions.map((locReligion) => religions.find((r) => r.id === locReligion.id)).filter(Boolean);
  });

  function closeWorkshop() {
    emit("close");
  }

  function setDefaultQuantity(type: MerchTypes) {
    if (merchQuantities.value[type] === null || merchQuantities.value[type] === undefined) {
      merchQuantities.value[type] = 1;
    }
  }

  function canAffordMerch(merchType: MerchTypes) {
    return my.money >= getMerchCost(merchType);
  }

  function getMerchCost(merchType: MerchTypes) {
    const quantity = merchQuantities.value[merchType];
    const costPerItem = gameSettings.church.merch[merchType].cost;
    const itemCost = quantity * costPerItem;
    const shippingCost = 15; // Fixed shipping cost
    return itemCost + shippingCost;
  }

  function buyMerch(merchType: MerchTypes) {
    const cost = getMerchCost(merchType);
    const quantity = merchQuantities.value[merchType];

    if (my.money >= cost) {
      my.money -= cost;

      let merchName = "";
      if (merchType === "holyWater") {
        my.church.merch.holyWater.inventory += quantity;
        merchName = "Bottles of Holy Water";
      } else if (merchType === "prayerCandles") {
        my.church.merch.prayerCandles.inventory += quantity;
        merchName = "Bluetooth Prayer Candles";
      } else if (merchType === "weightLossTea") {
        my.church.merch.weightLossTea.inventory += quantity;
        merchName = "Miracle Weight Loss Tea";
      } else if (merchType === "beachTowel") {
        my.church.merch.beachTowel.inventory += quantity;
        merchName = "Shroud of Turin Beach Towel";
      } else if (merchType === "exorcismKit") {
        my.church.merch.exorcismKit.inventory += quantity;
        merchName = "Lil' Reagan's Exorcism Kit";
      }

      // Emit purchase event for Firebase logging
      emit("purchase", { type: "merch", name: merchName, quantity });
    }
  }

  function buyVendingMachine() {
    if (my.money >= gameSettings.church.merch.holyWaterVendingMachine.cost) {
      my.money -= gameSettings.church.merch.holyWaterVendingMachine.cost;
      my.church.merch.holyWater.isVendingMachine = true;

      // Emit purchase event for Firebase logging
      emit("purchase", { type: "upgrade", name: "Holy Water Vending Machine" });
    }
  }

  function buyUpgrade(upgradeType: "extraPews" | "vipConfessionBooths" | "audioVisual") {
    let cost = 0;
    let upgradeName = "";

    if (upgradeType === "extraPews") {
      cost = gameSettings.church.upgrades.extraPews.cost;
      upgradeName = "Extra Pews";
      if (my.money >= cost) {
        my.money -= cost;
        my.church.upgrades.extraPews += 1;
      }
    } else if (upgradeType === "vipConfessionBooths") {
      cost = gameSettings.church.upgrades.vipConfessionBooths.cost;
      upgradeName = "VIP Confession Booths";
      if (my.money >= cost) {
        my.money -= cost;
        my.church.upgrades.vipConfessionBooths = true;
      }
    } else if (upgradeType === "audioVisual") {
      cost = gameSettings.church.upgrades.audioVisual.cost;
      upgradeName = "Audio Visual Package";
      if (my.money >= cost) {
        my.money -= cost;
        my.church.upgrades.audioVisual = true;
      }
    }

    // Emit purchase event for Firebase logging if purchase was successful
    if (my.money >= 0 && upgradeName) {
      // Simple check - if we had enough money
      emit("purchase", { type: "upgrade", name: upgradeName });
    }
  }

  function toggleSeraphAI() {
    if (!my.church.upgrades.seraphAI) {
      // Activating - charge daily fee
      if (my.money >= gameSettings.church.upgrades.seraphAI.cost) {
        my.money -= gameSettings.church.upgrades.seraphAI.cost;
        my.church.upgrades.seraphAI = true;
      }
    } else {
      // Deactivating - no charge
      my.church.upgrades.seraphAI = false;
    }
  }

  function upgradeWine(wineLevel: any) {
    if (my.money >= wineLevel.cost) {
      my.money -= wineLevel.cost;
      my.church.upgrades.sacrament.wine.level = wineLevel.level;
      my.church.upgrades.sacrament.wine.name = wineLevel.name;

      // Emit purchase event for Firebase logging
      emit("purchase", {
        type: "upgrade",
        name: wineLevel.name,
        communionType: "wine",
        level: wineLevel.level,
      });
    }
  }

  function upgradeBread(breadLevel: any) {
    if (my.money >= breadLevel.cost) {
      my.money -= breadLevel.cost;
      my.church.upgrades.sacrament.bread.level = breadLevel.level;
      my.church.upgrades.sacrament.bread.name = breadLevel.name;

      // Emit purchase event for Firebase logging
      emit("purchase", {
        type: "upgrade",
        name: breadLevel.name,
        communionType: "bread",
        level: breadLevel.level,
      });
    }
  }

  function buyMarketing(marketingType: "generalAd" | "signSpinner") {
    let cost = 0;
    let marketingName = "";

    if (marketingType === "generalAd") {
      cost = gameSettings.church.marketing.generalAd.price;
      marketingName = "General Internet Ad Campaign";
      if (my.money >= cost) {
        my.money -= cost;
        my.marketing.generalAdActive = true;
      }
    } else if (marketingType === "signSpinner") {
      cost = gameSettings.church.marketing.signSpinner.price;
      marketingName = "Sign Spinner";
      if (my.money >= cost) {
        my.money -= cost;
        my.marketing.signSpinnerActive = true;
      }
    }

    // Emit purchase event for Firebase logging if purchase was successful
    if (my.money >= 0 && marketingName) {
      emit("purchase", { type: "marketing", name: marketingName });
    }
  }

  function buyTargetedMarketing() {
    if (selectedTargetReligion.value && my.money >= gameSettings.church.marketing.targetedAd.price) {
      my.money -= gameSettings.church.marketing.targetedAd.price;
      my.marketing.targetedAd.active = true;
      my.marketing.targetedAd.targetReligion = selectedTargetReligion.value;

      // Emit purchase event for Firebase logging
      emit("purchase", {
        type: "marketing",
        name: "Targeted Internet Ad Campaign",
        targetedReligion: selectedTargetReligion.value.name,
      });
    }
  }

  function buyPrCampaign() {
    if (selectedPrReligion.value && my.money >= gameSettings.church.marketing.prCampaign.price) {
      my.money -= gameSettings.church.marketing.prCampaign.price;
      my.marketing.prCampaign.active = true;
      my.marketing.prCampaign.targetReligion = selectedPrReligion.value;

      // Emit purchase event for Firebase logging
      emit("purchase", {
        type: "marketing",
        name: "PR Campaign",
        targetedReligion: selectedPrReligion.value.name,
      });
    }
  }
</script>

<style scoped>
  .workshop-zone-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .workshop-zone {
    width: 800px;
    height: 600px;
    background: #c0c0c0;
    border: 2px outset #c0c0c0;
    font-family: "MS Sans Serif", sans-serif;
    font-size: 11px;
    display: flex;
    flex-direction: column;
  }

  /* Browser Chrome */
  .browser-chrome {
    background: #c0c0c0;
    border-bottom: 1px solid #808080;
  }

  .title-bar {
    background: linear-gradient(90deg, #0080ff 0%, #004080 100%);
    color: white;
    padding: 2px 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }

  .window-controls {
    display: flex;
    gap: 2px;
  }

  .window-controls button {
    width: 16px;
    height: 14px;
    background: #c0c0c0;
    border: 1px outset #c0c0c0;
    font-size: 9px;
    font-weight: bold;
  }

  .menu-bar {
    background: #f0f0f0;
    padding: 2px 8px;
    border-bottom: 1px solid #d0d0d0;
    display: flex;
    gap: 16px;
    font-size: 11px;
  }

  .toolbar {
    background: #f0f0f0;
    padding: 4px 8px;
    border-bottom: 1px solid #d0d0d0;
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .nav-btn {
    background: #e0e0e0;
    border: 1px outset #e0e0e0;
    padding: 2px 8px;
    font-size: 10px;
  }

  .address-bar {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 8px;
    gap: 4px;
  }

  .security-icon {
    font-size: 12px;
  }

  .address-bar input {
    flex: 1;
    border: 1px inset #c0c0c0;
    padding: 2px 4px;
    font-size: 10px;
  }

  .go-btn {
    background: #e0e0e0;
    border: 1px outset #e0e0e0;
    padding: 2px 8px;
    font-size: 10px;
  }

  /* Website Content */
  .website-content {
    flex: 1;
    background: white;
    overflow-y: auto;
    padding: 16px;
  }

  .header {
    text-align: center;
    margin-bottom: 16px;
    background: linear-gradient(45deg, #ff69b4, #00ffff, #ffff00);
    padding: 16px;
    border: 3px dashed #ff0000;
  }

  .logo {
    width: 64px;
    height: 64px;
  }

  .site-title {
    font-size: 32px;
    color: #ff0000;
    text-shadow: 2px 2px 4px #000;
    margin: 8px 0;
    animation: blink 2s infinite;
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

  .tagline {
    font-size: 16px;
    color: #000080;
    font-weight: bold;
  }

  .security-warnings {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .warning-popup,
  .certificate-error {
    background: #ffff80;
    border: 1px solid #ff0000;
    padding: 4px 8px;
    font-size: 10px;
    color: #800000;
  }

  .navigation-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 16px;
  }

  .tab {
    background: #f0f0f0;
    border: 1px solid #c0c0c0;
    border-bottom: none;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: bold;
  }

  .tab.active {
    background: white;
    border-bottom: 1px solid white;
    margin-bottom: -1px;
  }

  .tab-content {
    border: 1px solid #c0c0c0;
    background: white;
    padding: 16px;
    min-height: 300px;
  }

  .tab-content h2 {
    color: #000080;
    margin-bottom: 16px;
    font-size: 18px;
  }

  /* Product/Upgrade/Marketing Grids */
  .product-grid,
  .upgrade-grid,
  .marketing-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .product-card,
  .upgrade-card,
  .marketing-card {
    border: 2px solid #800080;
    background: #f8f8ff;
    padding: 12px;
  }

  .product-img,
  .upgrade-img,
  .marketing-img {
    width: 48px;
    height: 48px;
    float: left;
    margin-right: 8px;
  }

  .broken-img {
    background: #f0f0f0;
    border: 1px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    color: #666;
  }

  .broken-img::after {
    content: "IMG\ANOTFOUND";
    white-space: pre;
    text-align: center;
  }

  .product-card h3,
  .upgrade-card h3,
  .marketing-card h3 {
    font-size: 14px;
    color: #800080;
    margin-bottom: 8px;
  }

  .product-description,
  .upgrade-description,
  .marketing-description {
    font-size: 10px;
    margin-bottom: 8px;
    clear: left;
  }

  .product-stats,
  .upgrade-stats,
  .marketing-stats {
    background: #ffffa0;
    border: 1px solid #cccc00;
    padding: 4px;
    font-size: 9px;
    margin-bottom: 8px;
  }

  .product-actions {
    display: flex;
    gap: 4px;
    align-items: center;
    margin-bottom: 8px;
  }

  .quantity-input {
    width: 40px;
    border: 1px inset #c0c0c0;
    padding: 2px;
    font-size: 10px;
  }

  .buy-btn {
    background: linear-gradient(180deg, #00ff00 0%, #008000 100%);
    border: 2px outset #00ff00;
    padding: 4px 8px;
    font-size: 10px;
    font-weight: bold;
    color: black;
    cursor: pointer;
  }

  .buy-btn:disabled {
    background: #c0c0c0;
    color: #808080;
    cursor: not-allowed;
  }

  .buy-btn.big {
    padding: 8px 16px;
    font-size: 11px;
  }

  .unlock-btn {
    background: linear-gradient(180deg, #ffff00 0%, #ff8000 100%);
    border: 2px outset #ffff00;
    padding: 4px 8px;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
  }

  .unlock-btn:disabled {
    background: #c0c0c0;
    color: #808080;
    cursor: not-allowed;
  }

  .installed-text,
  .active-text {
    background: #80ff80;
    border: 1px solid #008000;
    padding: 4px 8px;
    text-align: center;
    font-weight: bold;
    color: #004000;
  }

  .sacrament-section {
    margin: 8px 0;
  }

  .sacrament-section h4 {
    font-size: 12px;
    margin-bottom: 4px;
  }

  .sacrament-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0;
    font-size: 10px;
  }

  .targeting-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .religion-select {
    border: 1px inset #c0c0c0;
    padding: 4px;
    font-size: 10px;
  }

  .footer {
    background: #f0f0f0;
    padding: 8px;
    border-top: 1px solid #c0c0c0;
    text-align: center;
    font-size: 9px;
    color: #666;
  }

  .visitor-counter {
    margin-bottom: 4px;
  }

  .counter-gif {
    width: 80px;
    height: 16px;
    display: inline-block;
    margin-right: 8px;
  }
</style>
