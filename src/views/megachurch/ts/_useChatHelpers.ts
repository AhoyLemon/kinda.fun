import { type Ref } from "vue";

import { sendTextMessagesWithTyping } from "./_functions";
import { gameSettings } from "./variables/_gameSettings";
import type { My, UI } from "./_types";

/* eslint-disable no-unused-vars */
interface ToastApi {
  (content: any, options?: Record<string, any>): void;
  success(content: any, options?: Record<string, any>): void;
  warning(content: any, options?: Record<string, any>): void;
  error(content: any, options?: Record<string, any>): void;
  info(content: any, options?: Record<string, any>): void;
}

interface ChatHelpersArgs {
  my: My;
  ui: UI;
  toast: ToastApi;
  sterlingNoteRef: Ref<{ showNote: () => void } | null>;
  logGameplayToFirebase: (
    eventType: string,
    data?: Record<string, any>,
  ) => void | Promise<void>;
}
/* eslint-enable no-unused-vars */

export function useChatHelpers({
  my,
  ui,
  toast,
  sterlingNoteRef,
  logGameplayToFirebase,
}: ChatHelpersArgs) {
  // Harold Chat Functions
  function openHaroldInterface() {
    ui.chats.harold.isOpen = true;
  }

  function closeHaroldInterface() {
    ui.chats.harold.isOpen = false;
  }

  function handleHaroldMessage(data: any) {
    if (data.messages && Array.isArray(data.messages)) {
      data.messages.forEach((message: any) => {
        // Replace typing indicator if specified (use in-place update for smooth transitions)
        if (message.replaceTyping) {
          const typingMessage = my.chats.harold.chatHistory.find(
            (m) => m.isTyping && m.sender === "harold",
          );
          if (typingMessage) {
            // Update the existing message object instead of removing and adding
            typingMessage.text = message.text;
            typingMessage.time = message.time;
            typingMessage.isTyping = false;
          }
        } else {
          // Add new message normally
          my.chats.harold.chatHistory.push(message);
        }
      });
    }
  }

  function buyVan() {
    if (my.money >= gameSettings.van.cost) {
      my.money -= gameSettings.van.cost;
      my.hasVan = true;

      // Log van purchase to Firebase
      logGameplayToFirebase("vanPurchased");
    }
  }

  function openSterlingInterface() {
    ui.chats.sterling.isOpen = true;
  }

  function closeSterlingInterface() {
    ui.chats.sterling.isOpen = false;
  }

  function handleSterlingMessage(data: any) {
    if (data.messages && Array.isArray(data.messages)) {
      data.messages.forEach((message: any) => {
        // Replace typing indicator if specified
        if (message.replaceTyping) {
          const typingMessage = my.chats.sterling.chatHistory.find(
            (m) => m.isTyping && m.sender === "sterling",
          );
          if (typingMessage) {
            typingMessage.text = message.text;
            typingMessage.time = message.time;
            typingMessage.isTyping = false;
          }
        } else {
          // Add new message normally
          my.chats.sterling.chatHistory.push(message);
        }
      });
    }
  }

  function handleChurchFounding() {
    // Close Sterling chat and show church setup UI
    ui.chats.sterling.isOpen = false;
    ui.view = "church-setup";
  }

  function trackMoneyEarned(amount: number) {
    my.totalMoneyEarned += amount;

    // Check if player qualifies for van but hasn't been contacted yet
    if (
      !my.chats.harold.hasContacted &&
      my.daysPlayed + 1 >= gameSettings.triggers.harold.days
    ) {
      my.canBuyVan = true;
      triggerHaroldContact();
    }

    // Check if player qualifies for Sterling contact (church phase)
    // Trigger when player has had a van for the required amount of days.
    if (
      !my.chats.sterling.hasContacted &&
      my.hasVan &&
      my.chats.sterling.daysWithVan >=
        gameSettings.triggers.sterling.daysWithVan
    ) {
      setTimeout(() => {
        triggerSterlingContact();
      }, 3000);
    }
  }

  // ================= CHAT AUTOMATION HELPERS =================
  function sendTextMessages(
    messages: Array<{ sender: string; text: string }>,
    chatType: "harold" | "sterling" | "plug",
    typingTime = 3500,
  ) {
    const chatData = my.chats[chatType];
    sendTextMessagesWithTyping(
      messages,
      chatType,
      chatData.chatHistory,
      typingTime,
    );
  }

  // ================= CONTACT TRIGGER FUNCTIONS =================
  function triggerHaroldContact() {
    // Mark as contacted and open chat
    my.chats.harold.hasContacted = true;

    setTimeout(() => {
      ui.chats.harold.isOpen = true;
    }, 2200);

    const messages = [
      { sender: "harold", text: "hey kid it ur uncl harold" },
      { sender: "harold", text: "u need a van???" },
      { sender: "harold", text: `$${gameSettings.van.cost}` }, // This message triggers the van interface
    ];

    sendTextMessages(messages, "harold");
  }

  function triggerSterlingContact() {
    my.chats.sterling.hasContacted = true;

    // Show toast that player found a note
    toast.info("🚚 Somebody left a note on your van", {
      timeout: 3500,
      onClose: () => {
        // Show the actual note after toast disappears
        if (sterlingNoteRef.value) {
          sterlingNoteRef.value.showNote();
        }
      },
    });
  }

  function triggerPlugContact() {
    // Mark as contacted and open chat
    my.chats.plug.hasContacted = true;

    // Open chat first
    setTimeout(() => {
      ui.chats.plug.isOpen = true;
    }, 200);

    // Delay the first message a bit longer so the UI opens first
    setTimeout(() => {
      const messages = [
        {
          sender: "player",
          text: "Hey man it's rough out there, I really need a fix.",
        },
        { sender: "plug", text: "It's $5 a hit. You know the deal." },
      ];

      sendTextMessages(messages, "plug", 3500); // Faster typing for this conversation
    }, 3000); // Wait for UI to open before starting messages
  }

  return {
    openHaroldInterface,
    closeHaroldInterface,
    handleHaroldMessage,
    buyVan,
    openSterlingInterface,
    closeSterlingInterface,
    handleSterlingMessage,
    handleChurchFounding,
    trackMoneyEarned,
    sendTextMessages,
    triggerHaroldContact,
    triggerSterlingContact,
    triggerPlugContact,
  };
}
