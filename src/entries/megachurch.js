import { createApp } from "vue";
import Megachurch from "../views/megachurch/Megachurch.vue";
import { VueFire } from "vuefire";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig.public.js";
import { auth } from "../firebase";
import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toolTipOptions = { defaultProps: { placement: "top" } };
const toastOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  showCloseButtonOnHover: true,
};

const app = createApp(Megachurch);

try {
  // Try to initialize Firebase, but don't fail if it doesn't work
  const firebaseApp = initializeApp(firebaseConfig);
  app.use(VueFire, { firebaseApp, modules: [] });
} catch (error) {
  console.warn("Firebase initialization failed for Megachurch page:", error);
  // Continue without Firebase for Megachurch page
}

app.use(Toast, toastOptions).use(VueTippy, toolTipOptions).mount("#app");
