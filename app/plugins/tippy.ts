import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css";

// Universal plugin: the real VueTippy only makes sense in the browser, but the
// `tippy` directive must still RESOLVE during SSR/prerender — meeting and court
// templates use v-tippy, and an unregistered directive makes every server
// render warn "Failed to resolve directive: tippy".
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.vueApp.use(VueTippy, { defaultProps: { placement: "top" } });
  } else {
    // Server-side stub: resolves the directive, renders no attributes.
    nuxtApp.vueApp.directive("tippy", { getSSRProps: () => ({}) });
  }
});
