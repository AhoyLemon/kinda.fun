import { createApp } from "vue";
import NotFoundPage from "../views/404/NotFound.vue";
import { VueFire } from "vuefire";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig.public.js";
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

const app = createApp(NotFoundPage);

try {
  // Try to initialize Firebase, but don't fail if it doesn't work
  const firebaseApp = initializeApp(firebaseConfig);
  app.use(VueFire, { firebaseApp, modules: [] });
} catch (error) {
  console.warn('Firebase initialization failed for 404 page:', error);
  // Continue without Firebase for 404 page
}

app.use(Toast, toastOptions).use(VueTippy, toolTipOptions).mount("#app");