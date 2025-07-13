import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(firebaseApp);

// Start anonymous sign-in
signInAnonymously(auth)
  .then(() => {
    // Signed in..
    // You can listen for auth state changes if needed
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user.uid is available
        // Optionally, you can emit an event or set a global state here
        // console.log('Anonymous user ID:', user.uid);
      }
    });
  })
  .catch((error) => {
    // Handle Errors here.
    // console.error('Anonymous sign-in error:', error);
  });

export { auth };
