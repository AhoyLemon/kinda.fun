/**
 * Firebase client-side initialization plugin
 * This ensures Firebase is only initialized on the client-side (not during SSR)
 */
export default defineNuxtPlugin({
  name: 'firebase',
  setup() {
    const { initializeFirebase } = useFirebase()

    // Initialize Firebase on client-side only
    if (import.meta.client) {
      const { firebaseApp, auth } = initializeFirebase()
      
      return {
        provide: {
          firebase: firebaseApp,
          auth: auth,
        }
      }
    }
  }
})
