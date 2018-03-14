import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import { ClientTable } from 'vue-tables-2';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router/';
import theme from './theme/';

Vue.use(Vuetify, {
  theme,
});

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
