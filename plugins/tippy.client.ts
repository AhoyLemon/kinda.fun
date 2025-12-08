import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

export default defineNuxtPlugin((nuxtApp) => {
  const toolTipOptions = { 
    defaultProps: { placement: 'top' } 
  }
  
  nuxtApp.vueApp.use(VueTippy, toolTipOptions)
})
