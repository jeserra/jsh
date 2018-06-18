import Vue from "vue";
import App from "./App";

import Vuetify from "vuetify";
import VueMoment from "vue-moment";
import spanish from "moment/locale/es";
import * as VueGoogleMaps from "vue2-google-maps";

import "vuetify/dist/vuetify.min.css";

import router from "./router/";
import Vuex from "vuex";
Vue.use(Vuex);

import theme from "./theme/";
import { maps } from "./configs";

Vue.use(Vuetify, {
  theme
});

Vue.use(VueGoogleMaps, maps);

Vue.use(VueMoment, spanish);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
