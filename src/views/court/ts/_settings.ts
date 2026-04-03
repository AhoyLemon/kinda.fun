interface UISettings {
  toastDuration: number;
}

interface GameSettings {
  numberOfRounds: number;
  abstentionThreshold: number;
}

export const uiSettings: UISettings = {
  toastDuration: 4000, // ms. Set to 0 to keep toasts visible until manually dismissed (click to close).
};

export const gameSettings: GameSettings = {
  numberOfRounds: 5,
  abstentionThreshold: 10,
};
