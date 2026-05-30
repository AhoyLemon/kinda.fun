// Shared TypeScript type definitions for the Invalid! game.
// The Challenge interface lives in _challenges.ts (alongside the data).

export interface Rule {
  type: string;
  message: string;
  inputValue?: string | number;
  inputValueTwo?: string | number | null;
}

export interface Player {
  id?: string;
  playerID: string;
  name: string;
  score: number;
  passwordAttempts: number;
  isHost: boolean;
  role?: string;
  color?: string;
  passwordSuccess?: boolean;
  employeeNumber?: number;
  rulebux?: number;
}

export interface AttemptRecord {
  playerIndex: number;
  pwAttempt: string;
  attemptCount: number;
  timestamp: Date;
  result?: string;
  challengeName?: string;
  playerScore?: number;
}

export interface EmployeePassword {
  pw: string;
  name: string;
  playerIndex: number;
  playerID: string;
  claimed: string | false;
}

export interface CrashRecord {
  playerIndex: number;
  sysAdminIndex: number;
  word: string;
}

export interface CrackRecord {
  pw: string;
  attackerIndex: number;
  victimIndex: number;
}

export interface RoundSummary {
  challenge: string;
  sysAdmin: string;
  rules: Rule[];
  bugs: string[];
  attempts: AttemptRecord[];
  listSource: string;
  possibleAnswers: number;
}

export interface LetterCount {
  letter: string;
  count: number;
}

export interface CurrentRule {
  editing: boolean;
  name: string;
  cost: number;
  inputValue: string;
  inputValueTwo: string;
}

export interface FlyingPigState {
  active: boolean;
  message: string;
  timer: ReturnType<typeof setInterval> | undefined;
}

export interface CrashState {
  active: boolean;
  word: string;
  player: Player | Record<string, unknown>;
}

export interface MyPlayerState {
  employeeNumber: number;
  playerID: string;
  name: string;
  color: string;
  playerIndex: number;
  role: string | null;
  rulebux: number;
  passwordAttempts: number;
  crashesCaused: number;
  score: number;
  isRoomHost: boolean;
}

export interface RoundState {
  phase: string;
  number: number;
  sysAdminIndex: number;
  possibleChallenges: import("./_challenges").Challenge[];
  challenge: import("./_challenges").Challenge;
  rules: Rule[];
  shibboleth: string;
  bugs: string[];
  attempts: AttemptRecord[];
  claimedPasswords: unknown[];
  possibleAnswerCount: number;
  averageSize: number;
  averageVowels: number;
  letterCounts: LetterCount[];
  demandableLetters: string[];
  maxOffset: number;
  minOffset: number;
  vowelOffset: number;
  elapsedTime: number;
  adminTimer: ReturnType<typeof setInterval> | undefined;
  roundTimer: ReturnType<typeof setInterval> | undefined;
  hurryTimer: ReturnType<typeof setInterval> | undefined;
  hurryTime: number;
  adminTimeLeft: number;
  finalTimeLeft: number;
  flyingPig: FlyingPigState;
  crash: CrashState;
  sysAdminCrashAwarded?: boolean;
}

export interface UIState {
  nameInput: string;
  roomCodeInput: string;
  appliedForJob: boolean;
  reconnecting: boolean;
  enterCode: { focus: boolean };
  challengeID: number | null;
  shibboleth: string;
  addBug: string;
  addBugErrors: string[];
  passwordAttempt: string;
  passwordAttemptErrors: string[];
  passwordInputError: boolean;
  passwordSucceeded: boolean;
  roundOver: boolean;
  currentRule: CurrentRule;
  enterFinalPasswords: boolean;
  passwordSuccessMessage: string | null;
  watchingVideo: boolean;
  musicPlaying: boolean;
  musicHushed: boolean;
}

export interface GameState {
  currentlyInGame: boolean;
  isGameStarted: boolean;
  isFailedToGetRoomData: boolean;
  roomCreatorID: string;
  roomCode: string;
  gameName: string;
  maxRounds: number;
  allowNaughty: boolean;
  players: Player[];
  allEmployeePasswords: EmployeePassword[];
  roundSummary: RoundSummary[];
  crashSummary: CrashRecord[];
  crackSummary: CrackRecord[];
  roomData?: unknown;
  isGameOver?: boolean;
}
