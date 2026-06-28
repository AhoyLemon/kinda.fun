<script setup lang="ts">
  import { reactive, onMounted } from "vue";
  import { formatDate, dollars, billionsOfDollars } from "./ts/_functions";
  import { addCommas, percentOf } from "@/shared/js/_functions";
  import { columns } from "./ts/_columns";
  import { DateTime } from "luxon";
  import "vue-good-table-next/dist/vue-good-table-next.css";
  import { VueGoodTable } from "vue-good-table-next";
  import { useFirestore } from "vuefire";
  import { useStatsComputeds, stripWrongestBraces, humanizeStanceName } from "./ts/_useStatsComputeds";
  import type { StatsState, StatsUiState } from "./ts/_useStatsComputeds";

  type StatsRecord = Record<string, unknown>;
  type StatsCollection = StatsRecord[];
  type StatsByGame = StatsState;
  type LoadedGame =
    | "general"
    | "cameo"
    | "court"
    | "sisyphus"
    | "guillotine"
    | "pretend"
    | "meeting"
    | "invalid"
    | "megachurch"
    | "wrongest";
  const validGames: readonly LoadedGame[] = ["general", "cameo", "court", "sisyphus", "guillotine", "pretend", "meeting", "invalid", "megachurch", "wrongest"];
  const isLoadedGame = (value: string): value is LoadedGame => validGames.includes(value as LoadedGame);
  type RelativeTimeFormat = "fromNow" | "calendar" | string;
  type TimestampInput = Date | number | string;

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Variables

  type DateEntry = { launched: string; dayCount: number | null };
  type DatesState = {
    today: DateTime | null;
    guillotine: DateEntry;
    cameo: DateEntry;
    court: DateEntry;
    sisyphus: DateEntry;
    pretend: DateEntry;
    meeting: DateEntry;
    invalid: DateEntry;
    megachurch: DateEntry;
    wrongest: DateEntry;
  };
  type UiState = StatsUiState & {
    viewing: "loading" | LoadedGame;
    cameoLoaded: boolean;
    invalidLoaded: boolean;
    wrongestLoaded: boolean;
    sisyphusLoaded: boolean;
    guillotineLoaded: boolean;
    pretendLoaded: boolean;
    meetingLoaded: boolean;
    megachurchLoaded: boolean;
    loadingFullData: boolean;
    selectedJusticeId: string | number | null;
    courtLoaded: boolean;
  };

  const dates = reactive<DatesState>({
    today: null,
    guillotine: {
      launched: "2022-05-16",
      dayCount: null,
    },
    cameo: {
      launched: "2021-02-16",
      dayCount: null,
    },
    court: {
      launched: "2026-05-25",
      dayCount: null,
    },
    sisyphus: {
      launched: "2021-09-21",
      dayCount: null,
    },
    pretend: {
      launched: "2023-08-23",
      dayCount: null,
    },
    meeting: {
      launched: "2025-07-09",
      dayCount: null,
    },
    invalid: {
      launched: "2025-08-01",
      dayCount: null,
    },
    megachurch: {
      launched: "2025-11-18",
      dayCount: null,
    },
    wrongest: {
      launched: "2025-01-20",
      dayCount: null,
    },
  });

  const stats = reactive<StatsByGame>({
    general: {},
    guillotine: {},
    cameo: {},
    court: {},
    invalid: {},
    wrongest: {},
    sisyphus: {},
    pretend: {},
    meeting: {},
    megachurch: {},
  });

  const ui = reactive<UiState>({
    viewing: "loading",
    cameoLoaded: false,
    invalidLoaded: false,
    wrongestLoaded: false,
    sisyphusLoaded: false,
    guillotineLoaded: false,
    courtLoaded: false,
    pretendLoaded: false,
    meetingLoaded: false,
    megachurchLoaded: false,
    loadingFullData: false,
    selectedJusticeId: null,
  });

  // Firebase/VueFire is client-only (migration plan locked decision #3): there
  // is no VueFire app during prerender/SSR. Guard the composable; every data
  // loader below early-returns when it's null. All loaders run from onMounted /
  // click handlers (client-only), so firestoreDb is non-null when they execute.
  const firestoreDb = import.meta.client ? useFirestore() : null;

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Functions

  // Helper to load Firestore stats for a game
  type FirestoreTimestampObject = { seconds: number; nanoseconds: number };
  type FirestoreTimestampLike = FirestoreTimestampObject | Date | string | number | null | undefined;
  type LoadSubcollectionOptions = {
    process?: (data: StatsRecord) => StatsRecord;
    timestampFields?: string[];
    limitTo?: number;
    sortBy?: string;
    nestedSubcollections?: Record<string, LoadSubcollectionOptions>;
  };
  type LoadStatsOptions = {
    mainDocTimestamps?: string[];
    subcollections?: Record<string, LoadSubcollectionOptions>;
  };

  const isFirestoreTimestampObject = (value: unknown): value is FirestoreTimestampObject => {
    if (!value || typeof value !== "object") return false;
    const ts = value as { seconds?: unknown; nanoseconds?: unknown };
    return typeof ts.seconds === "number" && typeof ts.nanoseconds === "number";
  };

  function convertTimestamp(ts: FirestoreTimestampLike): Date | string | number | null | undefined {
    if (isFirestoreTimestampObject(ts)) {
      return new Date(ts.seconds * 1000 + Math.floor(ts.nanoseconds / 1e6));
    }
    return ts;
  }

  /**
   * Loads Firestore stats for a game, normalizing timestamp fields and subcollections.
   * Supports nested subcollections for hierarchical data (e.g., justices > cases).
   * @param {string} game - The game name (e.g. "cameo", "sisyphus", ...)
   * @param {object} options - {
   *   mainDocTimestamps: [fieldName, ...],
   *   subcollections: {
   *     [subcollectionName]: {
   *       process: (data) => data, // optional per-item processor
   *       timestampFields: [fieldName, ...], // optional per-item timestamp fields
   *       limitTo: number, // optional limit for query
   *       sortBy: string, // optional sort field (for limiting)
   *       nestedSubcollections: { // optional nested subcollections
   *         [nestedName]: {
   *           timestampFields: [fieldName, ...],
   *           limitTo: number,
   *           sortBy: string
   *         }
   *       }
   *     }
   *   }
   * }
   */
  async function loadFirestoreStats(game: LoadedGame, options: LoadStatsOptions): Promise<void> {
    if (!firestoreDb) return;
    const { doc, getDoc, collection, getDocs, query, orderBy, limit } = await import("firebase/firestore");
    // Get the main doc
    const mainDocSnap = await getDoc(doc(firestoreDb, "stats", game));
    if (mainDocSnap.exists()) {
      const mainData = mainDocSnap.data() as StatsRecord;
      // Convert timestamps
      if (options.mainDocTimestamps) {
        options.mainDocTimestamps.forEach((field: string) => {
          if (mainData[field]) mainData[field] = convertTimestamp(mainData[field] as FirestoreTimestampLike);
        });
      }
      Object.assign(stats[game], mainData);
    }
    // Load subcollections
    if (options.subcollections) {
      for (const [sub, subOpts] of Object.entries(options.subcollections)) {
        let collectionRef = collection(firestoreDb, `stats/${game}/${sub}`);
        const queryRef =
          subOpts.sortBy && subOpts.limitTo
            ? query(collectionRef, orderBy(subOpts.sortBy, "desc"), limit(subOpts.limitTo))
            : subOpts.sortBy
              ? query(collectionRef, orderBy(subOpts.sortBy, "desc"))
              : subOpts.limitTo
                ? query(collectionRef, limit(subOpts.limitTo))
                : collectionRef;

        // Apply sorting and limiting if specified

        const snap = await getDocs(queryRef);
        const results = await Promise.all(
          snap.docs.map(async (doc) => {
            let data = doc.data() as StatsRecord;
            // Add the document ID as a reference (typically the name)
            if (!data.id) data.id = doc.id;

            // Convert per-item timestamps
            if (subOpts.timestampFields) {
              subOpts.timestampFields.forEach((field: string) => {
                if (data[field]) data[field] = convertTimestamp(data[field] as FirestoreTimestampLike);
              });
            }
            // Custom processor
            if (subOpts.process) data = subOpts.process(data);

            // Load nested subcollections if specified
            if (subOpts.nestedSubcollections) {
              for (const [nestedSub, nestedOpts] of Object.entries(subOpts.nestedSubcollections)) {
                let nestedCollectionRef = collection(firestoreDb, `stats/${game}/${sub}/${doc.id}/${nestedSub}`);
                const nestedQueryRef =
                  nestedOpts.sortBy && nestedOpts.limitTo
                    ? query(nestedCollectionRef, orderBy(nestedOpts.sortBy, "desc"), limit(nestedOpts.limitTo))
                    : nestedOpts.sortBy
                      ? query(nestedCollectionRef, orderBy(nestedOpts.sortBy, "desc"))
                      : nestedOpts.limitTo
                        ? query(nestedCollectionRef, limit(nestedOpts.limitTo))
                        : nestedCollectionRef;

                // Apply sorting and limiting to nested query

                const nestedSnap = await getDocs(nestedQueryRef);
                const nestedResults = nestedSnap.docs.map((nestedDoc) => {
                  let nestedData = nestedDoc.data() as StatsRecord;
                  if (!nestedData.id) nestedData.id = nestedDoc.id;

                  // Convert nested timestamps
                  if (nestedOpts.timestampFields) {
                    nestedOpts.timestampFields.forEach((field: string) => {
                      if (nestedData[field]) nestedData[field] = convertTimestamp(nestedData[field] as FirestoreTimestampLike);
                    });
                  }
                  // Custom nested processor if provided
                  if (nestedOpts.process) nestedData = nestedOpts.process(nestedData);
                  return nestedData;
                });

                data[nestedSub] = nestedResults;
              }
            }

            return data;
          }),
        );

        stats[game][sub] = results;
        // Track if this is a limited query
        if (subOpts.limitTo) {
          stats[game][sub + "_isLimited"] = true;
          stats[game][sub + "_limitTo"] = subOpts.limitTo;
          stats[game][sub + "_sortBy"] = subOpts.sortBy;
        }
      }
    }
  }

  const getData = async (game: LoadedGame): Promise<void> => {
    if (!firestoreDb) return;
    ui.viewing = "loading";

    let errorOccurred = false;
    if (game == "general") {
      try {
        const { doc, getDoc } = await import("firebase/firestore");

        const generalsSnap = await getDoc(doc(firestoreDb, "stats", "general"));
        if (generalsSnap.exists()) {
          const generalsData = generalsSnap.data();
          stats.general.lastCloned = generalsData.lastCloned || null;
        }
        // Cameo
        const cameoSnap = await getDoc(doc(firestoreDb, "stats", "cameo"));
        if (cameoSnap.exists()) {
          const cameoData = cameoSnap.data();
          stats.general.cameoGamesStarted = cameoData.gamesStarted || 0;
          stats.general.cameoLastPlayed = cameoData.lastGameStarted ? convertTimestamp(cameoData.lastGameStarted) : null;
        }

        // Court
        const courtSnap = await getDoc(doc(firestoreDb, "stats", "court"));
        if (courtSnap.exists()) {
          const courtData = courtSnap.data();
          stats.general.courtGamesStarted = courtData.gamesStarted || 0;
          stats.general.courtLastPlayed = courtData.lastGameStarted ? convertTimestamp(courtData.lastGameStarted) : null;
        }

        // Guillotine
        const guillotineSnap = await getDoc(doc(firestoreDb, "stats", "guillotine"));
        if (guillotineSnap.exists()) {
          const guillotineData = guillotineSnap.data();
          stats.general.guillotineGamesStarted = guillotineData.gamesStarted || 0;
          stats.general.guillotineLastPlayed = guillotineData.lastGameStarted ? convertTimestamp(guillotineData.lastGameStarted) : null;
        }
        // Meeting
        const meetingSnap = await getDoc(doc(firestoreDb, "stats", "meeting"));
        if (meetingSnap.exists()) {
          const meetingData = meetingSnap.data();
          stats.general.meetingGamesStarted = meetingData.gamesStarted || 0;
          stats.general.meetingLastPlayed = meetingData.lastGameStarted ? convertTimestamp(meetingData.lastGameStarted) : null;
        }
        // Pretend
        const pretendSnap = await getDoc(doc(firestoreDb, "stats", "pretend"));
        if (pretendSnap.exists()) {
          const pretendData = pretendSnap.data();
          stats.general.pretendGamesStarted = pretendData.gamesStarted || 0;
          stats.general.pretendLastPlayed = pretendData.lastGameStarted ? convertTimestamp(pretendData.lastGameStarted) : null;
        }
        // Sisyphus (no gamesStarted, use firstClick)
        const sisyphusSnap = await getDoc(doc(firestoreDb, "stats", "sisyphus"));
        if (sisyphusSnap.exists()) {
          const sisyphusData = sisyphusSnap.data();
          stats.general.sisyphusFirstClick = sisyphusData.firstClick || 0;
          stats.general.sisyphusLastPlayed = sisyphusData.lastGameStarted ? convertTimestamp(sisyphusData.lastGameStarted) : null;
        }

        const invalidSnap = await getDoc(doc(firestoreDb, "stats", "invalid"));
        if (invalidSnap.exists()) {
          const invalidData = invalidSnap.data();
          stats.general.invalidGamesStarted = invalidData.gamesStarted || 0;
          stats.general.invalidLastPlayed = invalidData.lastGameStarted ? convertTimestamp(invalidData.lastGameStarted) : null;
        }

        const megachurchSnap = await getDoc(doc(firestoreDb, "stats", "megachurch"));
        if (megachurchSnap.exists()) {
          const megachurchData = megachurchSnap.data();
          stats.general.megachurchGamesStarted = megachurchData.gamesStarted || 0;
          stats.general.megachurchLastPlayed = megachurchData.lastGameStarted ? convertTimestamp(megachurchData.lastGameStarted) : null;
        }

        const wrongestSnap = await getDoc(doc(firestoreDb, "stats", "wrongest"));
        if (wrongestSnap.exists()) {
          const wrongestData = wrongestSnap.data();
          stats.general.wrongestGamesStarted = wrongestData.gamesStarted || 0;
          stats.general.wrongestLastPlayed = wrongestData.lastGameStarted ? convertTimestamp(wrongestData.lastGameStarted) : null;
        }

        await loadFirestoreStats("general", {
          subcollections: {
            players: {
              timestampFields: ["lastPlayed"],
              limitTo: 50,
              sortBy: "gamesPlayed",
            },
          },
        });

        ui.viewing = "general";
      } catch (e: unknown) {
        // fallback: clear fields
        stats.general.cameoGamesStarted = 0;
        stats.general.cameoLastPlayed = null;
        stats.general.guillotineGamesStarted = 0;
        stats.general.guillotineLastPlayed = null;
        stats.general.meetingGamesStarted = 0;
        stats.general.meetingLastPlayed = null;
        stats.general.pretendGamesStarted = 0;
        stats.general.pretendLastPlayed = null;
        stats.general.sisyphusFirstClick = null;
        stats.general.megachurchGamesStarted = 0;
        stats.general.megachurchLastPlayed = null;

        console.error("Error loading general stats from Firestore:", e);
      }
    }

    if (game === "cameo") {
      try {
        await loadFirestoreStats("cameo", {
          mainDocTimestamps: ["lastGameStarted", "lastGameFinished"],
          subcollections: {
            celebs: {
              process: (data) => {
                if (typeof data.actualValue === "number" && typeof data.averagePlayerValue === "number") {
                  data.marketForces = data.averagePlayerValue - data.actualValue;
                }
                return data;
              },
              limitTo: 30,
              sortBy: "valuationCount",
            },
            specialGames: {},
          },
        });
        dates.cameo.dayCount = Math.floor(dates.today.diff(DateTime.fromISO(dates.cameo.launched), "days").days);
        ui.cameoLoaded = true;
        ui.viewing = "cameo";
      } catch (e: unknown) {
        stats.cameo.celebs = [];
        stats.cameo.specialGames = [];
        errorOccurred = true;
        console.error("Error loading cameo stats from Firestore:", e);
      }
    } else if (game === "court") {
      try {
        await loadFirestoreStats("court", {
          mainDocTimestamps: [
            "lastGameStarted",
            "lastGameFinished",
            "lastQuickplayStarted",
            "lastQuickplayFinished",
            "lastCampaignStarted",
            "lastCampaignFinished",
          ],
          subcollections: {
            cases: {
              timestampFields: ["lastPlayedAt"],
              sortBy: "timesPlayed",
            },
            justices: {
              timestampFields: ["lastAdjudicatedAt"],
              sortBy: "timesAdjudicated",
              nestedSubcollections: {
                cases: {
                  timestampFields: ["lastVotedAt"],
                },
              },
            },
            stances: {
              timestampFields: ["lastAdjudicatedAt"],
            },
            tactics: {
              timestampFields: ["lastPlayedAt"],
              sortBy: "timesPlayed",
            },
          },
        });
        dates.court.dayCount = Math.floor(dates.today.diff(DateTime.fromISO(dates.court.launched), "days").days);
        ui.courtLoaded = true;

        ui.viewing = "court";
      } catch (e: unknown) {
        stats.court.cases = [];
        stats.court.justices = [];
        stats.court.stances = [];
        stats.court.tactics = [];
        console.error("Error loading court stats from Firestore:", e);
      }
    } else if (game === "sisyphus") {
      try {
        await loadFirestoreStats("sisyphus", {
          mainDocTimestamps: ["firstClick", "lastGameStarted"],
          subcollections: {
            cheevos: {
              timestampFields: ["lastEarned"],
              process: (data) => {
                data.icount = typeof data.icount === "number" ? data.icount : 0;
                data.pointValue = typeof data.pointValue === "number" ? data.pointValue : 0;
                return data;
              },
            },
            purchases: {
              timestampFields: ["lastPurchased"],
              process: (data) => {
                data.icount = typeof data.icount === "number" ? data.icount : 0;
                // Convert jobTitles.lastPlayed to timestamp if it's an object
                if (stats.meeting.jobTitles && Array.isArray(stats.meeting.jobTitles)) {
                  stats.meeting.jobTitles.forEach((jt) => {
                    if (jt.lastPlayed && typeof jt.lastPlayed === "object" && typeof jt.lastPlayed.seconds === "number") {
                      jt.lastPlayed = convertTimestamp(jt.lastPlayed);
                    }
                  });
                }
                data.price = typeof data.price === "number" ? data.price : 0;
                return data;
              },
            },
          },
        });
        dates.sisyphus.dayCount = Math.floor(dates.today.diff(DateTime.fromISO(dates.sisyphus.launched), "days").days);
        ui.sisyphusLoaded = true;
        ui.viewing = "sisyphus";
      } catch (e: unknown) {
        stats.sisyphus.cheevos = [];
        stats.sisyphus.purchases = [];
        errorOccurred = true;
        console.error("Error loading sisyphus stats from Firestore:", e);
      }
    } else if (game === "guillotine") {
      try {
        await loadFirestoreStats("guillotine", {
          mainDocTimestamps: ["lastGameStarted", "gameLastFinished"],
          subcollections: {
            heads: {
              timestampFields: ["lastRemoved"],
              limitTo: 100,
              sortBy: "headCount",
            },
          },
        });
        dates.guillotine.dayCount = Math.floor(dates.today.diff(DateTime.fromISO(dates.guillotine.launched), "days").days);
        ui.guillotineLoaded = true;
        ui.viewing = "guillotine";
      } catch (e: unknown) {
        stats.guillotine.heads = [];
        errorOccurred = true;
        console.error("Error loading guillotine stats from Firestore:", e);
      }
    } else if (game === "pretend") {
      try {
        await loadFirestoreStats("pretend", {
          mainDocTimestamps: ["lastGameStarted", "lastGameFinished"],
          subcollections: {
            impersonators: {
              process: (data) => {
                const correct = typeof data.correctGuessCount === "number" ? data.correctGuessCount : 0;
                const close = typeof data.closeGuessCount === "number" ? data.closeGuessCount : 0;
                const bad = typeof data.badGuessCount === "number" ? data.badGuessCount : 0;
                const total = correct + close + bad;
                data.correctPercent = total > 0 ? (((correct + close) / total) * 100).toFixed(1) : "0.0";
                return data;
              },
            },
          },
        });
        dates.pretend.dayCount = Math.floor(dates.today.diff(DateTime.fromISO(dates.pretend.launched), "days").days);
        ui.pretendLoaded = true;
        ui.viewing = "pretend";
      } catch (e: unknown) {
        stats.pretend.impersonators = [];
        errorOccurred = true;
        console.error("Error loading pretend stats from Firestore:", e);
      }
    } else if (game === "meeting") {
      try {
        await loadFirestoreStats("meeting", {
          mainDocTimestamps: ["lastGameStarted", "lastGameFinished"],
          subcollections: {
            cards: {},
            players: {
              timestampFields: ["lastPlayed"],
            },
            jobTitles: {
              timestampFields: ["lastPlayed"],
            },
          },
        });
        dates.meeting.dayCount = Math.floor(dates.today.diff(DateTime.fromISO(dates.meeting.launched), "days").days);
        ui.meetingLoaded = true;
        ui.viewing = "meeting";
      } catch (e: unknown) {
        if (!stats.meeting) stats.meeting = {};
        stats.meeting.cards = [];
        stats.meeting.players = [];
        stats.meeting.jobTitles = [];
        errorOccurred = true;
        console.error("Error loading meeting stats from Firestore:", e);
      }
    } else if (game === "invalid") {
      try {
        await loadFirestoreStats("invalid", {
          mainDocTimestamps: ["lastGameStarted", "lastGameFinished"],
          subcollections: {
            bugs: {
              limitTo: 10,
              sortBy: "timesCreated",
            },
            challenges: {
              timestampFields: ["lastChosen"],
              limitTo: 25,
              sortBy: "timesChosen",
            },
            gameSizes: {
              timestampFields: ["lastGameStarted", "lastGameFinished"],
            },
            letters: {},
            passwords: {
              timestampFields: ["lastCreated", "lastCracked"],
              limitTo: 25,
              sortBy: "timesCreated",
            },
            rules: {
              timestampFields: ["lastPlayed"],
            },
          },
        });
        dates.invalid.dayCount = Math.floor(dates.today.diff(DateTime.fromISO(dates.invalid.launched), "days").days);
        ui.invalidLoaded = true;
        ui.viewing = "invalid";
      } catch (e: unknown) {
        if (!stats.invalid) stats.invalid = {};
        stats.invalid.bugs = [];
        stats.invalid.challenges = [];
        stats.invalid.gameSizes = [];
        stats.invalid.letters = [];
        stats.invalid.passwords = [];
        stats.invalid.rules = [];
        errorOccurred = true;
        console.error("Error loading invalid stats from Firestore:", e);
      }
    } else if (game === "megachurch") {
      try {
        await loadFirestoreStats("megachurch", {
          mainDocTimestamps: ["lastGameStarted", "lastGameFinished"],
          subcollections: {
            celebrityFriends: {},
            cheats: {},
            churchNames: {},
            darkDeeds: {},
            eternalLegacy: {},
            locations: {},
            marketing: {},
            merch: {},
            players: {
              timestampFields: ["lastPlayed"],
            },
            religions: {},
            sermonTopics: {},
            upgrades: {},
          },
        });
        dates.megachurch.dayCount = Math.floor(dates.today.diff(DateTime.fromISO(dates.megachurch.launched), "days").days);
        ui.megachurchLoaded = true;
        ui.viewing = "megachurch";
      } catch (e: unknown) {
        if (!stats.megachurch) stats.megachurch = {};
        stats.megachurch.players = [];
        errorOccurred = true;
        console.error("Error loading megachurch stats from Firestore:", e);
      }
    } else if (game === "wrongest") {
      try {
        await loadFirestoreStats("wrongest", {
          mainDocTimestamps: ["lastGameStarted", "lastGameFinished"],
          subcollections: {
            gameSizes: {
              timestampFields: ["lastGameStarted", "lastGameFinished"],
            },
            players: {
              timestampFields: ["lastPlayed"],
            },
            statements: {
              timestampFields: ["lastPlayed"],
            },
            decks: {
              timestampFields: ["lastPlayed"],
            },
          },
        });
        dates.wrongest.dayCount = Math.floor(dates.today.diff(DateTime.fromISO(dates.wrongest.launched), "days").days);
        ui.wrongestLoaded = true;
        ui.viewing = "wrongest";
      } catch (e: unknown) {
        stats.wrongest.gameSizes = [];
        stats.wrongest.players = [];
        stats.wrongest.statements = [];
        errorOccurred = true;
        console.error("Error loading wrongest stats from Firestore:", e);
      }
    }

    // Always update URL and title, even if error occurred
    const newURL = window.location.origin + window.location.pathname + "?game=" + game;
    history.pushState({ game: game }, game + " | Kinda Fun Stats", newURL);
    document.title = game + " | Kinda Fun Stats";

    if (errorOccurred) {
      // Optionally, show a user-friendly error message or set a UI flag
      console.warn(`Stats for '${game}' could not be loaded. Check Firestore or network.`);
    }
  };

  const formatTime = (stamp: TimestampInput | null | undefined, format?: RelativeTimeFormat): string | null => {
    if (!stamp) return null;
    const stampDate = new Date(stamp);
    if (Number.isNaN(stampDate.getTime())) return null;
    const dt = DateTime.fromJSDate(stampDate);
    if (format === "fromNow") {
      return dt.toRelative();
    } else if (format === "calendar") {
      const daysDiff = Math.abs(dt.diffNow("days").days);
      if (daysDiff < 7) {
        return dt.toLocaleString(DateTime.DATETIME_MED);
      } else {
        return dt.toFormat("MMM d @ t");
      }
    } else if (format) {
      // Try to convert moment format to luxon format
      return dt.toFormat(format);
    } else {
      return dt.toLocaleString(DateTime.DATETIME_FULL);
    }
  };

  const calculateAverage = (count: number | string | null | undefined, iterations: number | string | null | undefined): string => {
    const countNumber = Number(count ?? 0);
    const iterationsNumber = Number(iterations ?? 0);
    if (!Number.isFinite(countNumber) || !Number.isFinite(iterationsNumber) || countNumber === 0 || iterationsNumber === 0) {
      return "0";
    }
    const n = (countNumber / iterationsNumber).toFixed(2);
    return addCommas(n);
  };

  const getGameDataFromURL = (): void => {
    const loadedURL = new URL(window.location.href);
    const game = loadedURL.searchParams.get("game");
    if (game && isLoadedGame(game)) {
      getData(game);
    } else {
      getData("general");
    }
  };

  const calculateSpend = (rowObj: StatsRecord): string => {
    const icount = Number.parseInt(String(rowObj.icount ?? 0), 10);
    const price = Number.parseInt(String(rowObj.price ?? 0), 10);
    return addCommas((Number.isNaN(icount) ? 0 : icount) * (Number.isNaN(price) ? 0 : price));
  };

  const pretendCorrectPct = (rowObj: StatsRecord): string => {
    const correctGuess = Number(rowObj.correctGuess ?? 0);
    const closeGuess = Number(rowObj.closeGuess ?? 0);
    const badGuess = Number(rowObj.badGuess ?? 0);
    const total = correctGuess + closeGuess + badGuess;
    let correct = correctGuess;
    if (closeGuess > 0) {
      correct += closeGuess * 0.7;
    }
    return percentOf(total, correct) + "%";
  };

  const loadFullData = async (game: LoadedGame, subcollection: string): Promise<void> => {
    if (!firestoreDb) return;
    ui.loadingFullData = true;
    try {
      const { collection, getDocs, query, orderBy } = await import("firebase/firestore");

      // Get the configuration for this specific subcollection from the current stats
      const currentData = stats[game][subcollection] as StatsCollection | undefined;
      if (!currentData) {
        throw new Error(`No data found for ${game}.${subcollection}`);
      }

      // Get the sort field from the limited query metadata
      const sortBy = stats[game][subcollection + "_sortBy"] as string | undefined;

      // Set up the query - unlimited but still sorted
      let collectionRef = collection(firestoreDb, `stats/${game}/${subcollection}`);
      let queryRef = sortBy ? query(collectionRef, orderBy(sortBy, "desc")) : collectionRef;

      // Fetch all documents
      const snap = await getDocs(queryRef);
      const results = snap.docs.map((doc) => {
        const data = doc.data() as StatsRecord;

        // Apply the same processing that was used in the limited query
        // This ensures consistency between limited and unlimited data
        if (subcollection === "celebs" && game === "cameo") {
          if (typeof data.actualValue === "number" && typeof data.averagePlayerValue === "number") {
            data.marketForces = data.averagePlayerValue - data.actualValue;
          }
        } else if (subcollection === "impersonators" && game === "pretend") {
          const correct = typeof data.correctGuessCount === "number" ? data.correctGuessCount : 0;
          const close = typeof data.closeGuessCount === "number" ? data.closeGuessCount : 0;
          const bad = typeof data.badGuessCount === "number" ? data.badGuessCount : 0;
          const total = correct + close + bad;
          data.correctPercent = total > 0 ? (((correct + close) / total) * 100).toFixed(1) : "0.0";
        } else if (subcollection === "cheevos" && game === "sisyphus") {
          data.icount = typeof data.icount === "number" ? data.icount : 0;
          data.pointValue = typeof data.pointValue === "number" ? data.pointValue : 0;
        } else if (subcollection === "purchases" && game === "sisyphus") {
          data.icount = typeof data.icount === "number" ? data.icount : 0;
          data.price = typeof data.price === "number" ? data.price : 0;
        }

        // Convert timestamp fields if they exist
        const timestampFields = getTimestampFieldsForSubcollection(game, subcollection);
        if (timestampFields) {
          timestampFields.forEach((field: string) => {
            if (data[field]) data[field] = convertTimestamp(data[field] as FirestoreTimestampLike);
          });
        }

        return data;
      });

      // Replace the limited data with unlimited data
      stats[game][subcollection] = results;

      // Remove the limitation metadata
      delete stats[game][subcollection + "_isLimited"];
      delete stats[game][subcollection + "_limitTo"];
      delete stats[game][subcollection + "_sortBy"];
    } catch (e: unknown) {
      console.error(`Error loading full ${subcollection} data:`, e);
    } finally {
      ui.loadingFullData = false;
    }
  };

  // Helper function to get timestamp fields for a subcollection
  const getTimestampFieldsForSubcollection = (game: string, subcollection: string): string[] | undefined => {
    const timestampMap = {
      general: {
        players: ["lastPlayed"],
      },
      guillotine: {
        heads: ["lastRemoved"],
      },
      sisyphus: {
        cheevos: ["lastEarned"],
        purchases: ["lastPurchased"],
      },
      meeting: {
        players: ["lastPlayed"],
        jobTitles: ["lastPlayed"],
      },
      invalid: {
        challenges: ["lastChosen"],
        gameSizes: ["lastGameStarted", "lastGameFinished"],
        passwords: ["lastCreated", "lastCracked"],
        rules: ["lastPlayed"],
      },
      megachurch: {
        players: ["lastPlayed"],
      },
    };
    return timestampMap[game]?.[subcollection];
  };

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Computed

  const { computedCameo, computedCourt, selectedJusticeCases, computedPretend, computedGuillotine, computedInvalid, computedSisyphus, computedWrongest } =
    useStatsComputeds(stats, ui);

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // Mounted

  onMounted(() => {
    dates.today = DateTime.now();
    const loadedURL = new URL(window.location.href);
    if (loadedURL.searchParams.get("game")) {
      getGameDataFromURL();
    } else {
      getData("general");
    }
  });
</script>
<template lang="pug" src="./Stats.pug"></template>
<style lang="scss" src="./Stats.scss"></style>
