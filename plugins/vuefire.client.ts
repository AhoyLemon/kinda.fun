/**
 * VueFire plugin for Firestore integration
 * Client-side only since Firebase requires browser APIs
 */
import { VueFire, VueFireAuth } from 'vuefire'

export default defineNuxtPlugin({
  name: 'vuefire',
  dependsOn: ['firebase'],
  setup(nuxtApp) {
    const { initializeFirebase } = useFirebase()
    const { firebaseApp } = initializeFirebase()

    if (firebaseApp) {
      nuxtApp.vueApp.use(VueFire, {
        firebaseApp,
        modules: [VueFireAuth()],
      })
    } else {
      console.warn('Firebase not initialized, VueFire plugin skipped')
    }
  }
})
