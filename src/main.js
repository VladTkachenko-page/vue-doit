import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Toaster from "@meforma/vue-toaster";

import vueCountryRegionSelect from "vue3-country-region-select";

createApp(App)
  .use(store)
  .use(router)
  .use(Toaster, {
    position: "top-right",
  })
  .use(vueCountryRegionSelect)
  .mount("#app");
