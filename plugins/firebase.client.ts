export default defineNuxtPlugin(() => {
  // Initialize Firebase on client-side only
  const { firebaseApp, auth } = useFirebase()
  
  return {
    provide: {
      firebase: firebaseApp,
      auth: auth,
    }
  }
})
