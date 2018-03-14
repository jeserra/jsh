import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import VueMoment from 'vue-moment';
import spanish from 'moment/locale/es';

import { ClientTable } from 'vue-tables-2';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router/';
import theme from './theme/';

Vue.use(Vuetify, {
  theme,
});

Vue.use(VueMoment, spanish);

Vue.use(ClientTable);

Vue.use(VueRouter);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
