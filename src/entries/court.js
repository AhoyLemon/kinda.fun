import { createApp } from "vue";
import CourtPage from "../views/court/Court.vue";
import { VueFire } from "vuefire";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig.public.js";

const firebaseApp = initializeApp(firebaseConfig);
import { auth } from "../firebase";

const app = createApp(CourtPage);
app.use(VueFire, { firebaseApp, modules: [] }).mount("#app");
