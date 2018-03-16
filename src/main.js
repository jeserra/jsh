import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import VueMoment from "vue-moment";
import spanish from "moment/locale/es";
import * as VueGoogleMaps from "vue2-google-maps";

import "vuetify/dist/vuetify.min.css";
import App from "./App";
import router from "./router/";
import theme from "./theme/";
import { maps } from "./configs";

Vue.use(Vuetify, {
  theme
});

Vue.use(VueGoogleMaps, maps);

Vue.use(VueMoment, spanish);

Vue.use(VueRouter);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
