import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, signInAnonymously, onAuthStateChanged, type Auth } from 'firebase/auth'

let firebaseApp: FirebaseApp | null = null
let auth: Auth | null = null
let initialized = false

export const useFirebase = () => {
  // Only initialize on client side
  if (import.meta.client && !initialized) {
    const config = useRuntimeConfig()
    
    // Check if Firebase is already initialized
    const existingApps = getApps()
    
    if (existingApps.length === 0) {
      const firebaseConfig = {
        apiKey: config.public.firebaseApiKey,
        authDomain: config.public.firebaseAuthDomain,
        projectId: config.public.firebaseProjectId,
        storageBucket: config.public.firebaseStorageBucket,
        messagingSenderId: config.public.firebaseMessagingSenderId,
        appId: config.public.firebaseAppId,
      }
      
      // Only initialize if we have valid config
      if (firebaseConfig.apiKey && firebaseConfig.projectId) {
        firebaseApp = initializeApp(firebaseConfig)
        auth = getAuth(firebaseApp)
        
        // Start anonymous sign-in
        signInAnonymously(auth)
          .then(() => {
            onAuthStateChanged(auth!, (user) => {
              if (user) {
                // console.log('Anonymous user ID:', user.uid)
              }
            })
          })
          .catch((error) => {
            console.error('Anonymous sign-in error:', error)
          })
      } else {
        console.warn('Firebase not initialized: missing environment variables')
      }
    } else {
      firebaseApp = existingApps[0]
      auth = getAuth(firebaseApp)
    }
    
    initialized = true
  }
  
  return {
    firebaseApp,
    auth,
  }
}
