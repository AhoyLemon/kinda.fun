/**
 * Vue Tippy plugin for tooltips
 * Client-side only
 */
import VueTippy from 'vue-tippy'

export default defineNuxtPlugin((nuxtApp) => {
  const toolTipOptions = { 
    defaultProps: { 
      placement: 'top' 
    } 
  }

  nuxtApp.vueApp.use(VueTippy, toolTipOptions)
})
