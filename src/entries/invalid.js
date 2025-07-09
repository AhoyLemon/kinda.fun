import { createApp } from "vue";
import InvalidPage from "../views/invalid/Invalid.vue";
// ...existing code from entry-invalid.js, update imports for new path...
import { VueFire } from "vuefire";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig.js";
const firebaseApp = initializeApp(firebaseConfig);
import { auth } from "../firebase";
import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css";
const toolTipOptions = { defaultProps: { placement: "top" } };
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
const toastOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  showCloseButtonOnHover: true,
};
const app = createApp(InvalidPage);
app.use(VueFire, { firebaseApp, modules: [] }).use(Toast, toastOptions).use(VueTippy, toolTipOptions).mount("#app");
