export default defineNuxtPlugin(() => {
  // Provide Firebase getter functions instead of calling useFirebase immediately
  // This ensures Firebase only initializes when actually used on the client
  return {
    provide: {
      firebase: () => useFirebase().firebaseApp,
      auth: () => useFirebase().auth,
    }
  }
})
