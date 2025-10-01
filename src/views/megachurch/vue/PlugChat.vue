<template>
  <div class="plug-interface-overlay" v-if="isOpen" @click="closeInterface">
    <div class="chat-window" @click.stop>
      <div class="chat-header">
        <div class="contact-info">
          <div class="avatar">TP</div>
          <div class="contact-details">
            <div class="contact-name">The Plug</div>
            <div class="contact-status">Active now</div>
          </div>
        </div>
        <button class="close-btn" @click="closeInterface">×</button>
      </div>

      <div class="chat-messages" ref="messagesContainer">
        <div
          v-for="message in chatHistory"
          :key="message.id"
          class="message"
          :class="{ sent: message.sender === 'player', received: message.sender === 'plug', typing: message.isTyping }"
        >
          <div class="message-avatar" v-if="message.sender === 'plug'">TP</div>
          <div class="message-bubble" :class="{ typing: message.isTyping }">
            <div class="message-text" :class="{ typing: message.isTyping }">{{ message.text }}</div>
            <div class="message-time" v-if="!message.isTyping">{{ message.time }}</div>
          </div>
          <div class="message-avatar" v-if="message.sender === 'player'">{{ playerInitials }}</div>
        </div>
      </div>

      <div class="casual-chat">
        <div class="casual-section">
          <button class="casual-chat-btn" @click="sendCasualMessage">Send Random Message</button>
        </div>
      </div>

      <div class="order-interface" v-if="!orderSent" :class="{ 'shake-effect': shouldShake }">
        <div class="order-section">
          <label v-if="!orderAmount">How much spice do you need?</label>

          <!-- Addiction level indicator -->
          <div class="addiction-indicator" v-if="orderAmount > 0">
            <div v-if="isUnderRequired" class="warning-hint">⚠️ You'll need more to avoid withdrawal</div>
            <div v-else-if="isOverRequired" class="boost-hint">✨ Extra spice will boost your preaching skills</div>
            <div v-else-if="orderAmount === requiredAmount" class="perfect-hint">✓ This will keep you steady tomorrow</div>
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
  </div>
</template>

<script setup>
  import { ref, computed, watch, nextTick } from "vue";
  import { dollars } from "@/shared/js/_functions.js";

  const props = defineProps({
    isOpen: Boolean,
    playerName: String,
    playerMoney: Number,
    spicePrice: Number,
    spiceRequired: Number, // Amount needed to avoid withdrawal
    onOrder: Function,
    onClose: Function,
    chatHistory: Array,
    totalOrders: Number,
  });

  const emit = defineEmits(["close", "order"]);

  const messagesContainer = ref(null);
  const orderAmount = ref(0);
  const orderSent = ref(false);

  // Humorous player identity hiding attempts - use initials
  const playerInitials = computed(() => {
    const name = props.playerName || "Anonymous";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  });

  // Calculate costs
  const totalCost = computed(() => orderAmount.value * props.spicePrice);
  const canAfford = computed(() => props.playerMoney >= totalCost.value);

  // Addiction level indicators
  const requiredAmount = computed(() => Math.ceil(props.spiceRequired || 0));
  const isUnderRequired = computed(() => orderAmount.value > 0 && orderAmount.value < requiredAmount.value);
  const isOverRequired = computed(() => orderAmount.value > requiredAmount.value);
  const isExactlyRequired = computed(() => orderAmount.value === requiredAmount.value && canAfford.value);

  // Shake effect state
  const shouldShake = ref(false);

  // Trigger shake when hitting exact required amount
  watch(isExactlyRequired, (newVal) => {
    if (newVal) {
      shouldShake.value = true;
      setTimeout(() => {
        shouldShake.value = false;
      }, 600); // Duration of shake animation
    }
  });

  // Random drug slang nouns for orders with singular/plural handling
  const drugSlang = [
    { singular: "shoelace", plural: "shoelaces" },
    { singular: "hot dog", plural: "hot dogs" },
    { singular: "item", plural: "items" },
    { singular: "bag of dog food", plural: "bags of dog food" },
    { singular: "gummy bear", plural: "gummy bears" },
    { singular: "reason to stay", plural: "reasons to stay" },
    { singular: "lemon", plural: "lemons" },
  ];

  const getRandomSlang = (amount) => {
    const slangItem = drugSlang[Math.floor(Math.random() * drugSlang.length)];
    return amount === 1 ? slangItem.singular : slangItem.plural;
  };

  // The Plug's response variations
  const plugResponses = ["I gotchu", "👍", "Alright", "Yeah yeah I'll get to it", "Say less", "Bet", "On it", "Done", "Easy", "No problem", "Got you covered"];

  const getRandomResponse = () => {
    return plugResponses[Math.floor(Math.random() * plugResponses.length)];
  };

  // Casual conversation arrays
  const casualPlayerMessages = ["Did you see the sunrise this morning?", "How's the weather?", "What's good?", "You doing alright?", "Everything cool?"];

  const casualPlugResponses = [
    "I don't wanna talk about that.",
    "Nah man I don't do small talk.",
    "We ain't friends like that.",
    "Just business.",
    "Keep it professional.",
    "wut",
  ];

  const getCasualPlayerMessage = () => {
    return casualPlayerMessages[Math.floor(Math.random() * casualPlayerMessages.length)];
  };

  const getCasualPlugResponse = () => {
    return casualPlugResponses[Math.floor(Math.random() * casualPlugResponses.length)];
  };

  // Adjust order amount
  const adjustAmount = (change) => {
    orderAmount.value = Math.max(0, orderAmount.value + change);
  };

  // Send order function
  const sendOrder = async () => {
    if (orderAmount.value === 0 || !canAfford.value) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Generate fake player name for anonymity (humorous attempts at hiding identity)
    const fakeNames = ["Guy Incognito", "Regular Person", "Lawful Citizen", "Sober Human", "Stan Dardprocedure", "Don Tlook", "Hugh Mann", "Al Innocent"];
    const fakeName = fakeNames[Math.floor(Math.random() * fakeNames.length)];

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
        text: `${fakeName} sent ${dollars(totalCost.value)}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      emit("order", {
        amount: orderAmount.value,
        cost: totalCost.value,
        messages: [paymentMessage],
      });

      // Show typing indicator then dealer response after longer delay
      setTimeout(() => {
        // Add typing indicator
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

        // Replace typing indicator with actual response
        setTimeout(() => {
          const response = {
            id: Date.now(),
            sender: "plug",
            text: getRandomResponse(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            replaceTyping: true,
          };

          emit("order", {
            amount: 0,
            cost: 0,
            messages: [response],
          });
        }, 2000); // Longer typing duration
      }, 800); // Delay before typing starts
    }, 500); // Delay between order and payment

    orderSent.value = true;
  };

  // Send casual message function
  const sendCasualMessage = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Send player's casual message
    const playerMessage = {
      id: Date.now(),
      sender: "player",
      text: getCasualPlayerMessage(),
      time: timestamp,
    };

    emit("order", {
      amount: 0,
      cost: 0,
      messages: [playerMessage],
    });

    // Show typing indicator after delay
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

      // Send The Plug's dismissive response after typing
      setTimeout(() => {
        const response = {
          id: Date.now(),
          sender: "plug",
          text: getCasualPlugResponse(),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          replaceTyping: true,
        };

        emit("order", {
          amount: 0,
          cost: 0,
          messages: [response],
        });
      }, 2000); // Longer typing duration to match order messages
    }, 800); // Delay before typing starts
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
        // Scroll to bottom when opening
        await nextTick();
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
      }
    },
  );
</script>

<style lang="scss" scoped>
  .plug-interface-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 1000;

    .chat-window {
      background: #fff;
      width: 100%;
      max-width: 400px;
      height: 80vh;
      border-radius: 12px 12px 0 0;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s ease-out;

      @keyframes slideUp {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0);
        }
      }
    }
  }

  .chat-header {
    background: #f0f0f0;
    padding: 16px;
    border-radius: 12px 12px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;

    .contact-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #333;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
      }

      .contact-details {
        .contact-name {
          font-weight: bold;
          font-size: 16px;
        }

        .contact-status {
          font-size: 12px;
          color: #666;
        }
      }
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
      }
    }
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .message {
      display: flex;
      align-items: flex-end;
      gap: 8px;

      &.sent {
        //flex-direction: row-reverse;

        .message-bubble {
          background: #007bff;
          color: white;
          margin-left: auto;
        }
        .message-avatar {
          background: #111;
        }
      }

      &.received {
        .message-bubble {
          background: #e9ecef;
          color: #333;
          margin-right: auto;
        }
      }

      .message-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #444;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        flex-shrink: 0;
      }

      .message-bubble {
        max-width: 70%;
        padding: 12px 16px;
        border-radius: 18px;

        .message-text {
          font-size: 14px;
          line-height: 1.4;

          &.typing {
            font-style: italic;
            opacity: 0.8;
            position: relative;
            min-height: 20px;

            &:empty::after {
              content: "●●●";
              animation: typingDots 1.5s infinite;
            }
          }
        }

        .message-time {
          font-size: 11px;
          opacity: 0.7;
          margin-top: 4px;
        }
      }

      .message.received .message-bubble.typing {
        background: #e5e5ea;
        animation: pulse 1.5s ease-in-out infinite;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }

      @keyframes typingDots {
        0% {
          opacity: 0.4;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.4;
        }
      }
    }
  }

  .casual-chat {
    padding: 12px 16px;
    border-top: 1px solid #eee;
    background: #fafafa;

    .casual-section {
      text-align: center;

      .casual-chat-btn {
        background: #e0e0e0;
        border: none;
        padding: 8px 16px;
        border-radius: 12px;
        font-size: 12px;
        color: #666;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background: #d0d0d0;
        }

        &:active {
          background: #c0c0c0;
        }
      }
    }
  }

  .order-interface {
    padding: 16px;
    border-top: 1px solid #ddd;
    background: #f8f9fa;
    transition: transform 0.1s ease;

    &.shake-effect {
      animation: subtleShake 0.6s ease-in-out;
    }

    @keyframes subtleShake {
      0%,
      100% {
        transform: translateX(0);
      }
      10% {
        transform: translateX(-2px);
      }
      20% {
        transform: translateX(2px);
      }
      30% {
        transform: translateX(-2px);
      }
      40% {
        transform: translateX(2px);
      }
      50% {
        transform: translateX(-1px);
      }
      60% {
        transform: translateX(1px);
      }
      70% {
        transform: translateX(-1px);
      }
      80% {
        transform: translateX(1px);
      }
      90% {
        transform: translateX(0);
      }
    }

    .order-section {
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        font-size: 14px;
      }

      .addiction-indicator {
        margin-bottom: 12px;
        font-size: 12px;
        text-align: center;
        padding: 6px 8px;
        border-radius: 6px;

        .warning-hint {
          color: #dc3545;
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .boost-hint {
          color: #28a745;
          background: #d4edda;
          border: 1px solid #c3e6cb;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .perfect-hint {
          color: #007bff;
          background: #cce7ff;
          border: 1px solid #b8daff;
          padding: 4px 8px;
          border-radius: 4px;
        }
      }

      .amount-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-bottom: 12px;

        button {
          width: 40px;
          height: 40px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 8px;
          font-size: 18px;
          cursor: pointer;

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          &:hover:not(:disabled) {
            background: #f0f0f0;
          }
        }

        .amount-display {
          font-size: 16px;
          font-weight: bold;
          min-width: 80px;
          text-align: center;
        }
      }

      .cost-display {
        text-align: center;
        margin-bottom: 16px;
        font-size: 14px;

        .insufficient-funds {
          color: #dc3545;
          font-weight: bold;
        }
      }

      .send-order-btn {
        width: 100%;
        padding: 12px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;

        &:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }

        &:hover:not(:disabled) {
          background: #0056b3;
        }
      }
    }
  }

  .order-sent {
    padding: 16px;
    border-top: 1px solid #ddd;
    background: #f8f9fa;
    text-align: center;

    .sent-message {
      margin-bottom: 16px;
      font-size: 14px;
      color: #28a745;
      font-weight: bold;
    }

    .close-chat-btn {
      width: 100%;
      padding: 12px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background: #545b62;
      }
    }
  }
</style>
