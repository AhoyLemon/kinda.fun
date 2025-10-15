<template>
  <div class="workshop-zone-overlay" @click="closeWorkshop">
    <div class="workshop-zone" @click.stop>
      <!-- IE6 Browser Chrome -->
      <div class="browser-chrome">
        <div class="title-bar">
          <span class="window-title">{{ shopName }} - Internet Explorer</span>
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
            <input value="http://sites.geocities.com/coolguy49/da-worshop-zone" readonly />
            <button class="go-btn">Go</button>
          </div>
        </div>
      </div>

      <!-- Website Content -->
      <div class="website-content">
        <div class="header">
          <div class="logo-section">
            <div class="logo">
              <img src="/img/megachurch/worshop/angel.gif" />
            </div>
            <h1 class="site-title">{{ shopName }}</h1>
            <div class="tagline">Your Divine Source for Church Supplies!</div>
          </div>
        </div>

        <div class="navigation-tabs">
          <button class="tab" :class="{ active: activeTab === 'merch' }" @click="activeTab = 'merch'">🛒 HALLWAY MERCH</button>
          <button class="tab" :class="{ active: activeTab === 'upgrades' }" @click="activeTab = 'upgrades'">⛪ CHURCH UPGRADES</button>
          <button class="tab" :class="{ active: activeTab === 'marketing' }" @click="activeTab = 'marketing'">📢 MARKETING</button>
        </div>

        <!-- Merch Tab -->
        <div v-if="activeTab === 'merch'" class="tab-content">
          <h2>Hallway Merchandise</h2>
          <div class="shipping-notice">
            <img src="/img/megachurch/worshop/truck.gif" />
            <p>
              <strong>NEXT DAY SHIPPING!!!!</strong> All the merchandise {{ shopName }} will arrive at your church the next moring! Shipping is FREE except for
              the cost of shipping, which is {{ dollars(shippingCost) }}.
            </p>
          </div>

          <div class="product-grid">
            <!-- Holy Water Bottles -->
            <div class="product-card">
              <div class="product-img broken-img"></div>
              <h3>Bottles of Holy Water</h3>
              <div class="product-description">
                Blessed H2O in convenient bottles! Because tap water just doesn't have that divine touch. Each attendee has
                {{ gameSettings.church.merch.holyWater.baseChance }}% chance to buy.
              </div>
              <dl class="product-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ gameSettings.church.merch.holyWater.cost }} each</dd>
                <dt>Sale Price:</dt>
                <dd>${{ my.church.merch.holyWater.price }}</dd>
                <template v-if="my.church.merch.holyWater.isVendingMachine">
                  <dt>Vending Machine</dt>
                  <dd>Installed (+{{ gameSettings.church.merch.holyWaterVendingMachine.bonusChance }}% sales chance)</dd>
                </template>
              </dl>
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
                  BUY {{ merchQuantities.holyWater }} FOR ${{ getMerchCost("holyWater") }}
                </button>
              </div>

              <div v-if="!my.church.merch.holyWater.isVendingMachine" style="padding-top:10px; border-top:1px solid #aaa; margin">
                <h3>Holy Water Vending Machine</h3>
                <div class="product-description">
                  Automated holy water sales! Because nothing says "spiritual experience" like pumping quarters into a machine. Adds +{{
                    gameSettings.church.merch.holyWaterVendingMachine.bonusChance
                  }}% chance for holy water purchases.
                </div>
                <button class="buy-btn big" :disabled="my.money < gameSettings.church.merch.holyWaterVendingMachine.cost" @click="buyVendingMachine()">
                  INSTALL FOR ${{ gameSettings.church.merch.holyWaterVendingMachine.cost }}
                </button>
              </div>
            </div>

            <!-- Prayer Candles -->
            <div class="product-card">
              <div class="product-img broken-img"></div>
              <h3>Bluetooth Prayer Candles</h3>
              <div class="product-description">
                "Smart" candles with Bluetooth! Perfect for the tech-savvy spiritual seeker who needs their prayers wirelessly transmitted. Each attendee has
                {{ gameSettings.church.merch.prayerCandles.baseChance }}% chance to buy.
              </div>
              <dl class="product-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ gameSettings.church.merch.prayerCandles.cost }} each</dd>
                <dt>Sale Price:</dt>
                <dd>${{ my.church.merch.prayerCandles.price }}</dd>
              </dl>
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
                  BUY {{ merchQuantities.prayerCandles }} FOR ${{ getMerchCost("prayerCandles") }}
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
              <dl class="product-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ gameSettings.church.merch.weightLossTea.cost }} each</dd>
                <dt>Sale Price:</dt>
                <dd>${{ my.church.merch.weightLossTea.price }}</dd>
              </dl>
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
                  BUY {{ merchQuantities.weightLossTea }} FOR ${{ getMerchCost("weightLossTea") }}
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
              <dl class="product-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ gameSettings.church.merch.beachTowel.cost }} each</dd>
                <dt>Sale Price:</dt>
                <dd>${{ my.church.merch.beachTowel.price }}</dd>
              </dl>
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
                <button @click="buyMerch('beachTowel')" class="buy-btn" :disabled="!canAffordMerch('beachTowel')">
                  BUY {{ merchQuantities.beachTowel }} FOR ${{ getMerchCost("beachTowel") }}
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
              <dl class="product-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ gameSettings.church.merch.exorcismKit.cost }} each</dd>
                <dt>Sale Price:</dt>
                <dd>${{ my.church.merch.exorcismKit.price }}</dd>
              </dl>
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
                  BUY {{ merchQuantities.exorcismKit }} FOR ${{ getMerchCost("exorcismKit") }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Upgrades Tab -->
        <div v-if="activeTab === 'upgrades'" class="tab-content">
          <h2>Church Upgrades</h2>
          <div class="upgrade-grid">
            <div class="upgrade-card seraph-card" v-if="!my.church.upgrades.seraphAI">
              <h3>Seraph AI Sermon Analysis</h3>
              <div class="upgrade-description">
                Unleash the full power of next-gen AI! Seraph AI Sermon Analysis turbocharges your ministry with real-time, predictive insights—unlocking
                audience engagement like never before. Instantly discover which religions will be inspired (or outraged) by your message before you even step up
                to the pulpit. Transform your sermons with actionable analytics and maximize your spiritual ROI.
                <strong>Subscription service: ${{ gameSettings.church.upgrades.seraphAI.cost }} per day.</strong>
              </div>
              <button
                v-if="!my.church.upgrades.seraphAI"
                @click="toggleSeraphAI()"
                class="unlock-btn big"
                :disabled="my.money < gameSettings.church.upgrades.seraphAI.cost"
              >
                ⚡ ACTIVATE FOR ${{ gameSettings.church.upgrades.seraphAI.cost }}/DAY
              </button>
            </div>

            <div class="upgrade-card seraph-card" v-if="my.church.upgrades.seraphAI">
              <h3>Seraph AI is ACTIVE</h3>
              <div class="upgrade-description">
                Your sermons are now powered by next-gen AI analytics. You're more innovative, productive, and also, I've been meaning to tell you this, but
                you're looing sexy. Have you lost weight recently? Every message you deliver is optimized for maximum spiritual impact and audience
                engagement.<br /><br />
                <strong>Cost: ${{ gameSettings.church.upgrades.seraphAI.cost }} per day</strong><br /><br />
                Thinking of deactivating? Well then, uhhh, just think about something else, please. We have so many investors, and they're so, so angry at us
                right now.<br /><br />
              </div>
              <button @click="toggleSeraphAI()" class="deactivate-btn big">I Can't Handle the Raw Power of AI (Deactivate)</button>
            </div>

            <!-- Extra Pews -->
            <div class="upgrade-card">
              <div class="upgrade-img broken-img"></div>
              <h3>Extra Pews</h3>
              <div class="upgrade-description">
                More seating = more donations! Because standing during sermons builds character, but sitting builds bigger collection plates. Each pew adds
                {{ gameSettings.church.upgrades.extraPews.capacityIncrease }} capacity.
              </div>
              <dl class="upgrade-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ gameSettings.church.upgrades.extraPews.cost }} per pew</dd>
              </dl>
              <button @click="buyUpgrade('extraPews')" class="buy-btn big" :disabled="my.money < gameSettings.church.upgrades.extraPews.cost">
                BUY 1 PEW FOR ${{ gameSettings.church.upgrades.extraPews.cost }}
              </button>
            </div>

            <!-- VIP Confession Booths -->
            <div class="upgrade-card">
              <div class="upgrade-img broken-img"></div>
              <h3>VIP Confession Booths</h3>
              <div class="upgrade-description">
                Express forgiveness for busy sinners! Skip the guilt, go straight to the donation. Generates ${{
                  gameSettings.church.upgrades.vipConfessionBooths.revenuePerUse
                }}
                per use.
              </div>
              <dl class="upgrade-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ dollars(gameSettings.church.upgrades.vipConfessionBooths.cost) }}</dd>
                <dt>Status:</dt>
                <dd>{{ my.church.upgrades.vipConfessionBooths ? "INSTALLED" : "NOT INSTALLED" }}</dd>
              </dl>
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

            <!-- Audio/Visual Equipment -->
            <div class="upgrade-card">
              <div class="upgrade-img broken-img"></div>
              <h3>Audio/Visual Equipment</h3>
              <div class="upgrade-description">
                Professional A/V setup! Because if you're going to spread the word, might as well do it in HD with surround sound. Increases chance of positive
                sermon reactions by {{ gameSettings.church.upgrades.audioVisual.likeBoost }}%.
              </div>
              <dl class="upgrade-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ gameSettings.church.upgrades.audioVisual.cost }}</dd>
                <dt>Status:</dt>
                <dd>{{ my.church.upgrades.audioVisual ? "INSTALLED" : "NOT INSTALLED" }}</dd>
              </dl>
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

            <!-- Branded Communion Snacks -->
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
              <dl class="marketing-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ gameSettings.church.marketing.generalAd.price }}</dd>
                <dt>Status:</dt>
                <dd>{{ my.marketing.generalAdActive ? "ACTIVE" : "INACTIVE" }}</dd>
              </dl>
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
              <dl class="marketing-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ gameSettings.church.marketing.targetedAd.price }}</dd>
                <dt>Status:</dt>
                <dd>{{ my.marketing.targetedAd.active ? "ACTIVE" : "INACTIVE" }}</dd>
                <dt v-if="my.marketing.targetedAd.active">Target:</dt>
                <dd v-if="my.marketing.targetedAd.active">{{ my.marketing.targetedAd.targetReligion?.name }}</dd>
              </dl>
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
              <dl class="marketing-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ gameSettings.church.marketing.signSpinner.price }}</dd>
                <dt>Status:</dt>
                <dd>{{ my.marketing.signSpinnerActive ? "ACTIVE" : "INACTIVE" }}</dd>
              </dl>
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
              <dl class="marketing-stats stats-box">
                <dt>Cost:</dt>
                <dd>${{ gameSettings.church.marketing.prCampaign.price }}</dd>
                <dt>Status:</dt>
                <dd>{{ my.marketing.prCampaign.active ? "ACTIVE" : "INACTIVE" }}</dd>
                <dt v-if="my.marketing.prCampaign.active">Target:</dt>
                <dd v-if="my.marketing.prCampaign.active">{{ my.marketing.prCampaign.targetReligion?.name }}</dd>
              </dl>
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
  import { dollars } from "../../../../shared/ts/_functions";

  const shippingCost = 15; // Fixed shipping cost for all merch
  const shopName = "Da Worshop Zone";

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

<style scoped src="./WorshopZone.scss"></style>
