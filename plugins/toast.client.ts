import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
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
