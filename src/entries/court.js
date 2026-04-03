import { createApp } from "vue";
import CourtPage from "../views/court/Court.vue";
import { VueFire } from "vuefire";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig.public.js";
import { auth } from "../firebase";
import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 4000,
  closeOnClick: true,
  pauseOnHover: true,
  showCloseButtonOnHover: true,
};

const firebaseApp = initializeApp(firebaseConfig);

const app = createApp(CourtPage);
app
  .use(VueFire, { firebaseApp, modules: [] })
  .use(Toast, toastOptions)
  .use(VueTippy, { defaultProps: { placement: "top" } })
  .mount("#app");
