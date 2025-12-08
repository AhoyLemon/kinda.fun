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
        
        console.log('✅ Firebase initialized successfully')
        
        // Start anonymous sign-in
        signInAnonymously(auth)
          .then(() => {
            onAuthStateChanged(auth!, (user) => {
              if (user) {
                console.log('✅ Firebase Auth: Anonymous user signed in')
              }
            })
          })
          .catch((error) => {
            console.error('❌ Firebase Auth: Anonymous sign-in error:', error)
          })
      } else {
        console.warn('⚠️ Firebase NOT initialized - missing environment variables')
        console.warn('  - Check that you have a .env.local file with VITE_FIREBASE_* variables')
        console.warn('  - API Key present:', !!firebaseConfig.apiKey)
        console.warn('  - Project ID present:', !!firebaseConfig.projectId)
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
