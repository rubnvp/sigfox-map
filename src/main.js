import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import * as VueGoogleMaps from 'vue2-google-maps';
import { GOOGLE_MAPS_API_KEY } from './secrets';

Vue.config.productionTip = false;


Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAPS_API_KEY,
  },
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
