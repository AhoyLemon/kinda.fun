import { createApp } from "vue";
import BabyNamesPage from "../views/baby-names/BabyNames.vue";
import { VueFire } from "vuefire";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig.public.js";

// Initialize Firebase only if config is available
let firebaseApp;
try {
  firebaseApp = initializeApp(firebaseConfig);
} catch (error) {
  console.warn("Firebase initialization failed:", error.message);
  firebaseApp = null;
}

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
const app = createApp(BabyNamesPage);

// Only add VueFire if Firebase is available
if (firebaseApp) {
  app.use(VueFire, { firebaseApp, modules: [] });
}

app.use(Toast, toastOptions).use(VueTippy, toolTipOptions).mount("#app");