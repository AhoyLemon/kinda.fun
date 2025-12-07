/**
 * Vue Toastification plugin for notifications
 * Client-side only
 */
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'

export default defineNuxtPlugin((nuxtApp) => {
  const toastOptions: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 3500,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    showCloseButtonOnHover: true,
  }

  nuxtApp.vueApp.use(Toast, toastOptions)
})
