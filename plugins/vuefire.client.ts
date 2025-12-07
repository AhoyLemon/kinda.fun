/**
 * VueFire plugin for Firestore integration
 * Client-side only since Firebase requires browser APIs
 */
import { VueFire, VueFireAuth } from 'vuefire'

export default defineNuxtPlugin((nuxtApp) => {
  const { firebaseApp } = useFirebase()

  if (firebaseApp) {
    nuxtApp.vueApp.use(VueFire, {
      firebaseApp,
      modules: [VueFireAuth()],
    })
  }
})
