/**
 * Firebase client-side initialization plugin
 * This ensures Firebase is only initialized on the client-side (not during SSR)
 */
export default defineNuxtPlugin(() => {
  const { initializeFirebase } = useFirebase()

  // Initialize Firebase on client-side only
  if (import.meta.client) {
    initializeFirebase()
  }

  return {
    provide: {
      firebase: initializeFirebase,
    }
  }
})
