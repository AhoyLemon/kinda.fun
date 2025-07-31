// Firebase configuration for CI/deployment only
// Uses environment variables set in GitHub Actions
// Local development should use firebaseConfig.js (gitignored)

// Development mock configuration (replace with real values for actual testing)
const devConfig = {
  apiKey: "dev-api-key",
  authDomain: "dev-project.firebaseapp.com",
  projectId: "dev-project",
  storageBucket: "dev-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || devConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || devConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || devConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || devConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || devConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || devConfig.appId,
};

// Validate that all required environment variables are present
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Missing required Firebase environment variables!");
}
