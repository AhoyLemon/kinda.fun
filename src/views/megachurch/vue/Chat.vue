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
              <div v-if="orderAmount >= fatalSpiceAmount" class="warning-hint">💀 Allegedly, this much is fatal</div>
              <div v-else-if="isOverRequired" class="great-hint">✨ Extra spice will boost your preaching skills</div>
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
  import { gameSettings } from "../ts/_variables";
  import { dollars } from "@/shared/js/_functions.js";
  import { chatMessages, getRandomMessage, getRandomSlang } from "../ts/_chatMessages";

  const props = defineProps({
    isOpen: Boolean,
    contactType: String, // 'plug', 'harold', or 'sterling'
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

  // Sterling Silver chat logic
  const sterlingClarifyPlayerMessages = ["Tell me more about this arrangement", "What exactly are you proposing?", "What's the deal?"];

  const sterlingClarifyResponses = [
    `Ah, ${props.playerName}, let me illuminate the path: I shall build your church, handle every tedious detail, and in return, you bless me with a heavenly tithe—${gameSettings.churchPreaching.sterlingCutPercentage}% of every dollar the faithful surrender at your altar.`,
    `Picture this: your own congregation, your own pulpit, all made possible by my divine intervention. All I ask is a modest share—${gameSettings.churchPreaching.sterlingCutPercentage}% of the collection plate, a small price for salvation.`,
    `The Lord works through mysterious means, and today, He works through me. I’ll shoulder the burdens of bureaucracy and paperwork, while you reap the spiritual rewards. My only request? A sacred portion—${gameSettings.churchPreaching.sterlingCutPercentage}%—of your flock’s generosity.`,
  ];

  const sterlingPrisonPlayerMessages = ["Where are you texting me from?", "Are you in prison?", "Why are you in prison?"];

  const sterlingPrisonResponses = [
    "Let's just say I've had some... disagreements with certain authorities. But all for a righteous cause, of course.",
    "Ah, the Lord works in mysterious ways. Sometimes that involves a stint in a less-than-holy place.",
    "I've been through some trials, but my faith remains unshaken. Even if my accommodations are less than heavenly.",
  ];

  const sterlingAgreePlayerMessages = ["I agree to your terms", "Let's do this", "I'm ready to partner with you"];

  const sterlingAgreeResponses = [
    `Excellent, ${props.playerName}. The Lord smiles upon wise decisions.`,
    "Now we're talking! Let's build something that'll make the angels weep... tears of joy, of course.",
    "You won't regret this. Or at least, I won't.",
  ];

  const sterlingCheckinPlayerMessages = ["How are we doing?", "Any thoughts on my performance?", "How's our partnership going?"];

  const getsterlingCheckinResponses = (playerName, moneyOwed) => {
    if (moneyOwed > 0) {
      return [
        `You owe me ${moneyOwed.toFixed(2)}, ${playerName}. I trust this is just a temporary oversight.`,
        `I'm not running a charity here. ${moneyOwed.toFixed(2)} is what you owe me. Pay up.`,
        `The Lord may forgive, but I expect my ${moneyOwed.toFixed(2)}. Soon.`,
      ];
    }
    return [
      "You're doing God's work, " + playerName + ". Keep those donations flowing.",
      "I'm watching, always watching. The Lord sees all, and so do I.",
      "Our arrangement is working beautifully. Continue the good work.",
      "The congregation seems happy. Happy people are generous people.",
    ];
  };

  const sterlingScripturePlayerMessages = ["I could use some spiritual guidance", "What does the Lord say about our work?", "Share some wisdom with me"];

  const sterlingScriptureResponses = [
    "The Lord helps those who help themselves... and those who help ME.",
    "Matthew 6:19 - Store up treasures in heaven... and in offshore accounts.",
    "Consider the lilies of the field... they neither reap nor sow, yet they know how to delegate.",
    "Ask, and it shall be given unto you... for a modest processing fee.",
  ];

  const sterlingBusinessPlayerMessages = ["How's our arrangement working out?", "Any advice for growing the ministry?", "What should I focus on next?"];

  const sterlingBusinessResponses = [
    "Focus on the flock, [playerName]. The bigger the congregation, the bigger the... blessings.",
    "Remember, we're building something eternal here. Eternal... and profitable.",
    "Keep preaching what they want to hear. Happy congregants are generous congregants.",
    "The Lord works in mysterious ways... and so do I.",
  ];

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

    orderSent.value = true;
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

<style lang="scss" scoped src="../scss/components/Chat.scss"></style>
