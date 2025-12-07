/**
 * Vue Toastification plugin for notifications
 * Client-side only
 */
import Toast from 'vue-toastification'

export default defineNuxtPlugin((nuxtApp) => {
  // Import POSITION at runtime to avoid SSR issues
  const POSITION = {
    BOTTOM_RIGHT: 'bottom-right' as const
  }
  
  const toastOptions = {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 3500,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    showCloseButtonOnHover: true,
  }

  nuxtApp.vueApp.use(Toast, toastOptions)
})
