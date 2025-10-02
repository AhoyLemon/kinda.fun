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
            <button class="casual-chat-btn" @click="sendCasualMessage">Casual Chat</button>
          </div>
        </div>

        <div class="order-interface" v-if="!orderSent" :class="{ 'shake-effect': shouldShake }">
          <div class="order-section">
            <label v-if="!orderAmount">How much spice do you need?</label>

            <!-- Addiction level indicator -->
            <div class="addiction-indicator" v-if="orderAmount > 0">
              <div v-if="isUnderRequired" class="warning-hint">⚠️ You'll need more to avoid withdrawal</div>
              <div v-else-if="orderAmount === requiredAmount" class="perfect-hint">😐 This will keep you steady tomorrow</div>
              <div v-if="orderAmount >= fatalSpiceAmount" class="warning-hint">💀 Allegedly, this much is fatal</div>
              <div v-else-if="isOverRequired" class="boost-hint">✨ Extra spice will boost your preaching skills</div>
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
            <div v-if="!playerHasVan && chatHistory && chatHistory.length >= 6" class="van-purchase">
              <div class="van-info">
                <strong>Uncle Harold's Van: {{ dollars(vanCost) }}</strong>
              </div>
              <button class="buy-van-btn" @click="buyVan" :disabled="!canAffordVan">
                {{ canAffordVan ? "Buy Van" : "Insufficient Funds" }}
              </button>
            </div>

            <!-- General conversation options -->
            <div class="conversation-options">
              <button v-if="!playerHasVan" class="harold-chat-btn" @click="sendHaroldMessage('haggle')">Haggle</button>
              <button v-if="!playerHasVan" class="harold-chat-btn" @click="sendHaroldMessage('van')">A Van?</button>
              <button class="harold-chat-btn" @click="sendHaroldMessage('chat')">Chat</button>
            </div>
          </div>
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
    contactType: String, // 'plug' or 'harold'
    playerName: String,
    playerMoney: Number,
    playerHasVan: Boolean,

    // Plug-specific props
    spicePrice: Number,
    spiceRequired: Number,
    fatalSpiceAmount: Number,

    // Harold-specific props
    vanCost: Number,

    // Chat props
    chatHistory: Array,
    totalOrders: Number,

    // Event handlers
    onOrder: Function,
    onVanPurchase: Function,
    onClose: Function,
  });

  const emit = defineEmits(["close", "order", "van-purchase", "harold-message"]);

  const messagesContainer = ref(null);
  const orderAmount = ref(0);
  const orderSent = ref(false);

  // Contact information
  const contactName = computed(() => {
    return props.contactType === "plug" ? "The Plug" : "Uncle Harold";
  });

  const contactStatus = computed(() => {
    return props.contactType === "plug" ? "Active now" : "I AM A FREE CITIZEN";
  });

  const contactInitials = computed(() => {
    return props.contactType === "plug" ? "TP" : "UH";
  });

  const contactClass = computed(() => {
    return props.contactType === "plug" ? "plug-avatar" : "harold-avatar";
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

  // Plug chat logic
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

  const plugResponses = ["I gotchu", "👍", "Alright", "Yeah yeah I'll get to it", "Say less", "Bet", "On it", "Done", "Easy", "No problem", "Got you covered"];
  const getRandomResponse = () => plugResponses[Math.floor(Math.random() * plugResponses.length)];

  const casualPlayerMessages = [
    "Did you see the sunrise this morning?",
    "How's the weather?",
    "What's good?",
    "You ever thought about what happens to you when you die?",
    "Got any weekend plans?",
    "What's your favorite snack?",
    "Ever been outside the city?",
    "Do you believe in luck?",
    "What's the wildest thing you've seen?",
    "What's your dream job?",
    "Do you like music?",
    "If you could travel anywhere, where would you go?",
    "What's the best advice you've gotten?",
    "Ever met anyone famous?",
    "What's your favorite color?",
    "Do you think aliens exist?",
  ];

  const casualPlugResponses = [
    "I don't wanna talk about that.",
    "Nah man I don't do small talk.",
    "We ain't friends",
    "Just business.",
    "No.",
    "wut",
    "Not my vibe.",
    "Let's keep it professional.",
    "Ask someone else.",
    "I'm just here for the transaction.",
    "That's above my pay grade.",
    "I got places to be.",
    "Let's not get personal.",
    "Stick to the order.",
    "You got the cash or not?",
  ];

  // Harold chat logic
  const haroldHagglePlayerMessages = [
    "Can you come down on the price at all?",
    "That's a lot of money for a van",
    "I'm trying to build something, can you give me a discount?",
  ];

  const haroldHaggleResponses = ["u think the govmnt gives me a discount???", "i need that money for my plans", "this van aint 1 of THOSE vans"];

  const haroldVanPlayerMessages = ["Why do I need a van?", "What's so great about a van?", "How will a van help me?"];

  const haroldVanResponses = [
    "u culd drive 2 other places. u culd preach 2 new ppl",
    "mabee u find more ppl 2 join ur church",
    "u culd escape if the govmnt comes 4 u",
  ];

  const haroldChatPlayerMessages = ["How's life treating you Harold?", "Boy, sports are a thing I enjoy. How about you?"];

  const haroldChatResponses = [
    "they make toothpaste out of zebras. thats why toothpaste has those stripes",
    "u gotta wear two pairs of socks! AT ALL TIMES!",
    "u no ne1 who nos how 2 code? i need 2 get revenge at the ppl who control my hotmail account",
    "i keep my phone in the freezer so the aliens can't track me",
  ];

  const adjustAmount = (change) => {
    orderAmount.value = Math.max(0, orderAmount.value + change);
  };

  const sendOrder = async () => {
    if (orderAmount.value === 0 || !canAfford.value) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
        amount: orderAmount.value,
        cost: totalCost.value,
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
            text: getRandomResponse(),
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

    orderSent.value = true;
  };

  const sendCasualMessage = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const playerMessage = {
      id: Date.now(),
      sender: "player",
      text: casualPlayerMessages[Math.floor(Math.random() * casualPlayerMessages.length)],
      time: timestamp,
    };

    emit("order", {
      amount: 0,
      cost: 0,
      messages: [playerMessage],
    });

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
          text: casualPlugResponses[Math.floor(Math.random() * casualPlugResponses.length)],
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

  const sendHaroldMessage = (type) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    let playerMessages, haroldResponses;

    switch (type) {
      case "haggle":
        playerMessages = haroldHagglePlayerMessages;
        haroldResponses = haroldHaggleResponses;
        break;
      case "van":
        playerMessages = haroldVanPlayerMessages;
        haroldResponses = haroldVanResponses;
        break;
      case "chat":
        playerMessages = haroldChatPlayerMessages;
        haroldResponses = haroldChatResponses;
        break;
    }

    const playerMessage = {
      id: Date.now(),
      sender: "player",
      text: playerMessages[Math.floor(Math.random() * playerMessages.length)],
      time: timestamp,
    };

    emit("harold-message", {
      messages: [playerMessage],
    });

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
        const response = {
          id: Date.now(),
          sender: "harold",
          text: haroldResponses[Math.floor(Math.random() * haroldResponses.length)],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          replaceTyping: true,
        };

        emit("harold-message", {
          messages: [response],
        });
      }, 2000);
    }, 800);
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

<style lang="scss" scoped src="../scss/components/Chat.scss"></style>
