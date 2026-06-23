// Firebase is CLIENT-ONLY. Nothing in here runs during prerender/SSR, so no
// Firebase code can touch browser APIs at generate time (see migration plan
// locked decision #3). This plugin initializes the Firebase app, wires VueFire,
// optionally connects the local emulator suite, and signs in anonymously.
import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { VueFire } from "vuefire";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  const fb = config.firebase as Record<string, string>;
  const useEmulator = String(config.useEmulator) === "true";
  const emulatorHost = (config.emulatorHost as string) || "127.0.0.1";

  const hasConfig = Boolean(fb.apiKey && fb.projectId);

  if (!hasConfig && !useEmulator) {
    console.warn("Firebase: missing config and emulator disabled; skipping init.");
    return;
  }

  // Emulator mode uses a demo project so it can never reach a live backend.
  const firebaseConfig = useEmulator
    ? { apiKey: fb.apiKey || "demo-api-key", projectId: fb.projectId || "demo-kinda-fun", authDomain: fb.authDomain || "demo-kinda-fun.firebaseapp.com" }
    : fb;

  const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  if (useEmulator) {
    try {
      connectAuthEmulator(auth, `http://${emulatorHost}:9099`, { disableWarnings: true });
    } catch (e) {
      /* already connected */
    }
    try {
      connectFirestoreEmulator(db, emulatorHost, 8080);
    } catch (e) {
      /* already connected */
    }
  }

  nuxtApp.vueApp.use(VueFire, { firebaseApp, modules: [] });

  signInAnonymously(auth)
    .then(() => {
      onAuthStateChanged(auth, () => {
        /* user available */
      });
    })
    .catch((error) => {
      console.warn("Anonymous sign-in error:", error);
    });

  return {
    provide: {
      firebaseApp,
      firebaseAuth: auth,
    },
  };
});
