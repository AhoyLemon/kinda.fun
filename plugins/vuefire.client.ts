import { VueFire } from 'vuefire'

export default defineNuxtPlugin((nuxtApp) => {
  const { firebaseApp } = useFirebase()
  
  if (firebaseApp) {
    nuxtApp.vueApp.use(VueFire, {
      firebaseApp,
      modules: [],
    })
  }
})
