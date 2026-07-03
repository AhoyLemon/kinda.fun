// Firebase is CLIENT-ONLY. Nothing in here runs during prerender/SSR, so no
// Firebase code can touch browser APIs at generate time (see migration plan
// locked decision #3). This plugin initializes the Firebase app, wires VueFire,
// optionally connects the local emulator suite, and signs in anonymously.
//
// VueFire is ALWAYS installed (with a demo app when no real config is present)
// so client composables like useFirestore() never throw on load. Network calls
// only happen on user interaction, so the app still hydrates cleanly offline.
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { VueFire } from "vuefire";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  const fb = config.firebase as Record<string, string>;
  const useEmulator = String(config.useEmulator) === "true";
  const emulatorHost = (config.emulatorHost as string) || "127.0.0.1";

  const hasLiveConfig = Boolean(fb.apiKey && fb.projectId);

  // Pick a config. Emulator mode and "no real config" both use a demo project
  // so we can never reach a live backend by accident.
  const firebaseConfig = hasLiveConfig
    ? fb
    : {
        apiKey: fb.apiKey || "demo-api-key",
        projectId: fb.projectId || "demo-kinda-fun",
        authDomain: fb.authDomain || "demo-kinda-fun.firebaseapp.com",
      };

  const firebaseApp: FirebaseApp = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  if (useEmulator) {
    try {
      connectAuthEmulator(auth, `http://${emulatorHost}:9099`, { disableWarnings: true });
    } catch {
      /* already connected */
    }
    try {
      connectFirestoreEmulator(db, emulatorHost, 8080);
    } catch {
      /* already connected */
    }
  }

  nuxtApp.vueApp.use(VueFire, { firebaseApp, modules: [] });

  // Only attempt anonymous sign-in when we have a real backend or the emulator;
  // signing in against a demo project with no backend just logs noise.
  if (hasLiveConfig || useEmulator) {
    signInAnonymously(auth)
      .then(() => {
        onAuthStateChanged(auth, () => {
          /* user available */
        });
      })
      .catch((error) => {
        console.warn("Anonymous sign-in error:", error);
      });
  }

  return {
    provide: {
      firebaseApp,
      firebaseAuth: auth,
    },
  };
});
