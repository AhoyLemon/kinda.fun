import { VueFire } from 'vuefire'

export default defineNuxtPlugin((nuxtApp) => {
  // Only initialize VueFire if we're on the client and Firebase is available
  if (import.meta.client) {
    const { firebaseApp } = useFirebase()
    
    if (firebaseApp) {
      nuxtApp.vueApp.use(VueFire, {
        firebaseApp,
        modules: [],
      })
    }
  }
})
