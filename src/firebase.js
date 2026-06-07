import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig.public.js";
import { initializeApp } from "firebase/app";

let auth = null;
const hasRequiredFirebaseConfig = Boolean(firebaseConfig?.apiKey && firebaseConfig?.projectId);

if (!hasRequiredFirebaseConfig) {
  console.warn("Skipping Firebase auth init: config is missing required values.");
}

if (hasRequiredFirebaseConfig) {
  try {
    const firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    signInAnonymously(auth)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // user.uid is available
          }
        });
      })
      .catch((error) => {
        console.warn("Anonymous sign-in error:", error);
      });
  } catch (error) {
    console.warn("Firebase auth initialization skipped:", error);
  }
}

export { auth };
