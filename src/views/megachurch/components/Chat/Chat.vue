<template>
  <div class="chat-interface-overlay" v-if="isOpen" @click="closeInterface">
    <div class="chat-window" @click.stop>
      <div class="chat-header">
        <div class="contact-info">
          <div class="avatar" :class="contactClass">
            <img v-if="contactAvatar" :src="contactAvatar" alt="Avatar" />
            <span v-else>{{ contactInitials }}</span>
          </div>
          <div class="contact-details">
            <div class="contact-name">{{ contactName }}</div>
            <div class="contact-status">{{ contactStatus }}</div>
          </div>
        </div>
        <button class="close-btn" @click="closeInterface">×</button>
      </div>

      <div class="chat-messages" ref="messagesContainer">
        <transition-group name="bubble-fade" tag="div" class="messages-list">
          <div
            v-for="message in chatHistory"
            :key="message.id"
            class="message"
            :class="{ sent: message.sender === 'player', received: message.sender === contactType, typing: message.isTyping }"
          >
            <div class="message-avatar" v-if="message.sender === contactType" :class="contactClass">
              <img v-if="contactAvatar" :src="contactAvatar" alt="Avatar" />
              <span v-else>{{ contactInitials }}</span>
            </div>
            <div class="message-bubble" :class="{ typing: message.isTyping }">
              <div class="message-text" :class="{ typing: message.isTyping }">{{ message.text }}</div>
              <div class="message-time" v-if="!message.isTyping">{{ message.time }}</div>
            </div>
            <div class="message-avatar player-avatar" v-if="message.sender === 'player'">{{ playerInitials }}</div>
          </div>
        </transition-group>
      </div>

      <!-- Plug-specific interface -->
      <div v-if="contactType === 'plug'">
        <div class="casual-chat">
          <div class="casual-section">
            <button class="casual-chat-btn" @click="sendMessage('plug', 'casual')">Casual Chat</button>
          </div>
        </div>

        <div class="order-interface" v-if="!orderSent" :class="{ 'shake-effect': shouldShake }">
          <div class="order-section">
            <label v-if="!orderAmount">How much spice do you need?</label>

            <!-- Addiction level indicator -->
            <div class="hints" v-if="orderAmount > 0">
              <div v-if="isUnderRequired" class="warning-hint">⚠️ You'll need more to avoid withdrawal</div>
              <div v-else-if="orderAmount === requiredAmount" class="good-hint">😐 This will keep you steady tomorrow</div>
              <div v-if="orderAmount >= fatalSpiceAmount" class="warning-hint">🤔 I wonder what will happen if you take this much...</div>
              <div v-else-if="isOverRequired" class="great-hint">✨ Extra spice can boost your preaching skills!</div>
            </div>

            <div class="amount-controls">
              <button @click="adjustAmount(-1)" :disabled="orderAmount <= 0">-</button>
              <span class="amount-display">{{ orderAmount }} units</span>
              <button @click="adjustAmount(1)" :disabled="!canAfford">+</button>
            </div>
            <div class="cost-display">
              Cost: {{ dollars(totalCost) }}
              <span v-if="!canAfford" class="insufficient-funds">(Insufficient funds)</span>
            </div>
            <button class="send-order-btn" @click="sendOrder" :disabled="orderAmount === 0 || !canAfford">Send Order & Payment</button>
          </div>
        </div>
      </div>

      <!-- Harold-specific interface -->
      <div v-if="contactType === 'harold'">
        <div class="harold-options">
          <div class="harold-section">
            <!-- Show van purchase option if not owned AND Harold has sent enough messages (at least the price) -->
            <div v-if="!playerHasVan && chatHistory && chatHistory.length >= 3" class="van-purchase">
              <div class="van-info">
                <strong>Uncle Harold's Van: {{ dollars(vanCost) }}</strong>
              </div>
              <button class="buy-van-btn" @click="buyVan" :disabled="!canAffordVan">
                {{ canAffordVan ? "Buy Van" : "Insufficient Funds" }}
              </button>
            </div>

            <!-- General conversation options -->
            <div class="conversation-options">
              <button v-if="!playerHasVan" class="harold-chat-btn" @click="sendMessage('harold', 'haggle')">Haggle</button>
              <button v-if="!playerHasVan" class="harold-chat-btn" @click="sendMessage('harold', 'van')">A Van?</button>
              <button class="harold-chat-btn" @click="sendMessage('harold', 'chat')">Chat</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sterling Silver-specific interface -->

      <template v-if="contactType === 'sterling'">
        <div class="casual-chat">
          <div class="casual-section">
            <button v-if="!playerHasChurch" class="casual-chat-btn" @click="sendMessage('sterling', 'clarify')">Clarify Arrangement</button>
            <button v-if="!playerHasChurch" class="casual-chat-btn" @click="sendMessage('sterling', 'prison')">Prison?</button>
            <button v-if="playerHasChurch" class="casual-chat-btn" @click="sendMessage('sterling', 'scripture')">Quote Scripture</button>
            <button v-if="playerHasChurch" class="casual-chat-btn" @click="sendMessage('sterling', 'business')">Discuss Business</button>
            <button v-if="playerHasChurch" class="casual-chat-btn" @click="sendMessage('sterling', 'checkin')">Check In</button>
          </div>
        </div>
        <div class="order-interface" v-if="!playerHasChurch">
          <div class="order-section">
            <label>Go into business with Sterling?</label>
            <div class="hints">
              <div class="warning-hint">
                💸 Sterling will take {{ gameSettings.churchPreaching.sterling.cutPercentage }}% of all donations (minimum ${{
                  gameSettings.churchPreaching.sterling.minimumCut
                }})
              </div>
            </div>
            <button class="send-order-btn" @click="startChurchFounding">Agree To Terms</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, nextTick } from "vue";
  import { gameSettings } from "../../ts/variables/_gameSettings";
  import { dollars } from "@/shared/js/_functions.js";
  import { chatMessages, getRandomMessage, getRandomSlang } from "../../ts/_chatMessages";

  const props = defineProps({
    isOpen: Boolean,
    contactType: "plug" | "harold" | "sterling",
    playerName: String,
    playerMoney: Number,
    playerHasVan: Boolean,

    // Plug-specific props
    spicePrice: Number,
    spiceRequired: Number,
    fatalSpiceAmount: Number,

    // Harold-specific props
    vanCost: Number,

    // Sterling-specific props
    playerHasChurch: Boolean,
    playerMoneyOwedToSterling: Number,

    // Chat props
    chatHistory: Array,
    totalOrders: Number,

    // Event handlers
    onOrder: Function,
    onVanPurchase: Function,
    onChurchFounding: Function,
    onClose: Function,
  });

  const emit = defineEmits(["close", "order", "van-purchase", "harold-message", "sterling-message", "church-founding"]);

  const messagesContainer = ref(null);
  const orderAmount = ref(0);
  const orderSent = ref(false);

  // Contact information
  const contactName = computed(() => {
    if (props.contactType === "plug") return "The Plug";
    if (props.contactType === "harold") return "Uncle Harold";
    if (props.contactType === "sterling") return "Sterling Silver";
    return "Unknown Contact";
  });

  const contactStatus = computed(() => {
    if (props.contactType === "plug") return "Location Unknown";
    if (props.contactType === "harold") return "I AM A FREE CITIZEN";
    if (props.contactType === "sterling") return "Humble Servant of The Lord";
    return "Unknown";
  });

  const contactInitials = computed(() => {
    if (props.contactType === "plug") return "TP";
    if (props.contactType === "harold") return "UH";
    if (props.contactType === "sterling") return "SS";
    return "??";
  });

  const contactClass = computed(() => {
    if (props.contactType === "plug") return "plug-avatar";
    if (props.contactType === "harold") return "harold-avatar";
    if (props.contactType === "sterling") return "sterling-avatar";
    return "unknown-avatar";
  });

  const contactAvatar = computed(() => {
    return props.contactType === "harold" ? "/img/megachurch/avatars/harold.jpg" : null;
  });

  // Player identity - use actual name instead of fake names
  const playerInitials = computed(() => {
    const name = props.playerName || "Anonymous";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  });

  // Plug-specific computed properties
  const totalCost = computed(() => orderAmount.value * (props.spicePrice || 0));
  const canAfford = computed(() => props.playerMoney >= totalCost.value);
  const requiredAmount = computed(() => Math.ceil(props.spiceRequired || 0));
  const isUnderRequired = computed(() => orderAmount.value > 0 && orderAmount.value < requiredAmount.value);
  const isOverRequired = computed(() => orderAmount.value > requiredAmount.value);
  const isExactlyRequired = computed(() => orderAmount.value === requiredAmount.value && canAfford.value);

  // Harold-specific computed properties
  const canAffordVan = computed(() => props.playerMoney >= (props.vanCost || 0));

  // Shake effect state
  const shouldShake = ref(false);

  // Trigger shake when hitting exact required amount (plug only)
  watch(isExactlyRequired, (newVal) => {
    if (newVal && props.contactType === "plug") {
      shouldShake.value = true;
      setTimeout(() => {
        shouldShake.value = false;
      }, 600);
    }
  });

  const plugResponses = ["I gotchu", "👍", "Alright", "Yeah yeah I'll get to it", "Say less", "Bet", "On it", "Done", "Easy", "No problem", "Got you covered"];
  const getRandomResponse = () => plugResponses[Math.floor(Math.random() * plugResponses.length)];

  const adjustAmount = (change) => {
    orderAmount.value = Math.max(0, orderAmount.value + change);
  };

  // Generic message sending function
  const sendMessage = (person, messageType) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    let playerMessages;
    let responses;

    // Get messages based on person and type
    switch (person) {
      case "plug":
        if (messageType === "casual") {
          playerMessages = chatMessages.plug.casual.to;
          responses = chatMessages.plug.casual.from;
        } else {
          return; // Invalid message type for plug
        }
        break;
      case "harold":
        const haroldSection = chatMessages.harold[messageType];
        if (haroldSection && "to" in haroldSection && "from" in haroldSection) {
          playerMessages = haroldSection.to;
          responses = haroldSection.from;
        } else {
          return; // Invalid message type for harold
        }
        break;
      case "sterling":
        if (messageType === "checkin") {
          playerMessages = chatMessages.sterling.checkin.to;
          const hasDebt = (props.playerMoneyOwedToSterling || 0) > 0;
          if (hasDebt) {
            responses = chatMessages.sterling.checkin.from.withDebt(props.playerName || "friend", props.playerMoneyOwedToSterling || 0);
          } else {
            responses = chatMessages.sterling.checkin.from.noDebt(props.playerName || "friend");
          }
        } else {
          const sterlingSection = chatMessages.sterling[messageType];
          if (sterlingSection && "to" in sterlingSection && "from" in sterlingSection) {
            playerMessages = sterlingSection.to;
            responses = sterlingSection.from.map((msg) => msg.replace("[playerName]", props.playerName || "friend"));
          } else {
            return; // Invalid message type for sterling
          }
        }
        break;
      default:
        return; // Invalid person
    }

    // Send player message
    const playerMessage = {
      id: Date.now(),
      sender: "player",
      text: getRandomMessage(playerMessages),
      time: timestamp,
    };

    // Emit the message based on person type
    const eventName = person === "plug" ? "order" : `${person}-message`;
    emit(eventName, {
      messages: [playerMessage],
      action: messageType,
    });

    // Show typing indicator and response
    setTimeout(() => {
      const typingMessage = {
        id: Date.now(),
        sender: person,
        text: "",
        time: "",
        isTyping: true,
      };

      emit(eventName, {
        messages: [typingMessage],
      });

      setTimeout(() => {
        const response = {
          id: Date.now(),
          sender: person,
          text: getRandomMessage(responses),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          replaceTyping: true,
        };

        emit(eventName, {
          messages: [response],
          action: messageType,
        });
      }, 2000);
    }, 800);
  };

  const sendOrder = async () => {
    if (orderAmount.value === 0 || !canAfford.value) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // IMMEDIATELY process the actual order (outside of chat timeouts)
    const orderData = {
      amount: orderAmount.value,
      cost: totalCost.value,
      messages: [], // We'll add chat messages separately
    };
    emit("order", orderData);

    // Mark order as sent immediately
    orderSent.value = true;

    // Now handle the chat messages with timeouts for UI feedback
    // Send order message immediately
    const orderMessage = {
      id: Date.now(),
      sender: "player",
      text: `I need ${orderAmount.value} ${getRandomSlang(orderAmount.value)}`,
      time: timestamp,
    };

    emit("order", {
      amount: 0,
      cost: 0,
      messages: [orderMessage],
    });

    // Send payment message after short delay
    setTimeout(() => {
      const paymentMessage = {
        id: Date.now(),
        sender: "player",
        text: `${props.playerName} sent ${dollars(totalCost.value)}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      emit("order", {
        amount: 0,
        cost: 0,
        messages: [paymentMessage],
      });

      // Show typing indicator then dealer response after longer delay
      setTimeout(() => {
        const typingMessage = {
          id: Date.now(),
          sender: "plug",
          text: "",
          time: "",
          isTyping: true,
        };

        emit("order", {
          amount: 0,
          cost: 0,
          messages: [typingMessage],
        });

        setTimeout(() => {
          const response = {
            id: Date.now(),
            sender: "plug",
            text: getRandomMessage(chatMessages.plug.order.from),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            replaceTyping: true,
          };
          emit("order", {
            amount: 0,
            cost: 0,
            messages: [response],
          });
        }, 2000);
      }, 800);
    }, 500);
  };

  const buyVan = () => {
    if (!canAffordVan.value) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Send player's order message immediately
    const orderMessage = {
      id: Date.now(),
      sender: "player",
      text: "Okay, leave the doors unlocked and the keys in the glove compartment",
      time: timestamp,
    };

    emit("harold-message", {
      messages: [orderMessage],
    });

    // Send payment message after short delay
    setTimeout(() => {
      const paymentMessage = {
        id: Date.now(),
        sender: "player",
        text: `${props.playerName} sent ${dollars(props.vanCost)}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      emit("harold-message", {
        messages: [paymentMessage],
      });

      // Emit van purchase event after payment message
      emit("van-purchase");

      // Show typing indicator then Harold's response
      setTimeout(() => {
        const typingMessage = {
          id: Date.now(),
          sender: "harold",
          text: "",
          time: "",
          isTyping: true,
        };

        emit("harold-message", {
          messages: [typingMessage],
        });

        setTimeout(() => {
          const confirmationMessage = {
            id: Date.now(),
            sender: "harold",
            text: "van is urs now. dont crash it or ne thing",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            replaceTyping: true,
          };

          emit("harold-message", {
            messages: [confirmationMessage],
          });
        }, 2000);
      }, 800);
    }, 600);
  };

  const sendSterlingMessage = (type) => {
    // Deprecated: Use sendMessage('sterling', type) instead
    sendMessage("sterling", type);
  };

  const startChurchFounding = () => {
    emit("church-founding");
  };

  const closeInterface = () => {
    emit("close");
    orderSent.value = false;
    orderAmount.value = 0;
  };

  // Auto-scroll to bottom when new messages arrive
  watch(
    () => props.chatHistory.length,
    async () => {
      await nextTick();
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    },
  );

  // Reset order sent when opening
  watch(
    () => props.isOpen,
    async (newVal) => {
      if (newVal) {
        orderSent.value = false;
        orderAmount.value = 0;
        await nextTick();
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
      }
    },
  );
</script>

<style lang="scss" scoped src="./Chat.scss"></style>
