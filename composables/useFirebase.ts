import { getAuth, signInAnonymously, onAuthStateChanged, type Auth, type User } from 'firebase/auth'
import { initializeApp, type FirebaseApp, getApps } from 'firebase/app'
import { ref, type Ref } from 'vue'

let firebaseApp: FirebaseApp | null = null
let auth: Auth | null = null
const currentUser: Ref<User | null> = ref(null)
const isInitialized = ref(false)

export const useFirebase = () => {
  const config = useRuntimeConfig()

  const initializeFirebase = () => {
    // Check if already initialized
    if (firebaseApp && auth) {
      return { firebaseApp, auth }
    }

    // Check if Firebase is already initialized elsewhere
    const existingApps = getApps()
    if (existingApps.length > 0) {
      firebaseApp = existingApps[0]
      auth = getAuth(firebaseApp)
      return { firebaseApp, auth }
    }

    // Only initialize on client-side
    if (import.meta.client) {
      const firebaseConfig = {
        apiKey: config.public.firebaseApiKey,
        authDomain: config.public.firebaseAuthDomain,
        projectId: config.public.firebaseProjectId,
        storageBucket: config.public.firebaseStorageBucket,
        messagingSenderId: config.public.firebaseMessagingSenderId,
        appId: config.public.firebaseAppId,
      }

      // Validate that required config is present
      if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        console.error('Missing required Firebase environment variables!')
        return { firebaseApp: null, auth: null }
      }

      try {
        firebaseApp = initializeApp(firebaseConfig)
        auth = getAuth(firebaseApp)
        isInitialized.value = true

        // Start anonymous sign-in
        signInAnonymously(auth)
          .then(() => {
            // Listen for auth state changes
            onAuthStateChanged(auth!, (user) => {
              currentUser.value = user
              if (user) {
                // Anonymous user signed in
                // console.log('Anonymous user ID:', user.uid)
              }
            })
          })
          .catch((error) => {
            console.error('Anonymous sign-in error:', error)
          })
      } catch (error) {
        console.error('Firebase initialization error:', error)
      }
    }

    return { firebaseApp, auth }
  }

  return {
    initializeFirebase,
    firebaseApp,
    auth,
    currentUser,
    isInitialized,
  }
}

// Get Firebase instance (initialize if needed)
export const getFirebaseApp = () => {
  const { initializeFirebase } = useFirebase()
  const { firebaseApp } = initializeFirebase()
  return firebaseApp
}

export const getFirebaseAuth = () => {
  const { initializeFirebase } = useFirebase()
  const { auth } = initializeFirebase()
  return auth
}

// Export auth for backwards compatibility with existing code
export { auth }
