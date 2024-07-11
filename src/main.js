import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Tooltip
import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css";
const toolTipOptions = {
  defaultProps: { placement: "top" },
};

// Okay, let's get everything together to build this Vue app.
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

const app = createApp(App);

app
  .use(router)
  .use(Toast, toastOptions)
  .use(VueTippy, toolTipOptions)
  .mount("#app");
