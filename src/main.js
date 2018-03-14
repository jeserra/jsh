import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import { ClientTable } from 'vue-tables-2';
import 'vuetify/dist/vuetify.min.css';

import App from './App';
import Home from './components/Home';
import Bancos from './components/Bancos';
import Usuarios from './components/Usuarios';
import creadorBanco from './components/creadorBanco.vue';
import creadorUsuario from './components/creadorUsuario.vue';

Vue.use(Vuetify, {
  theme: {
    primary: colors.green.base,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3,
  },
});

Vue.use(ClientTable);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
	{path: '/', component: Home},
	{path: '/inicio', component: Home, name: "inicio" },
	{path: '/bancos', component: Bancos, name: "bancos" },
	{path: '/nuevoBanco', component: creadorBanco, name: "nuevoBanco" },
	{path: '/usuarios', component: Usuarios, name: "usuarios" },	
	{path: '/nuevoUsuario', component: creadorUsuario, name: "nuevoUsuario" },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
      // return { x: 0, y: 0 };
    }
    return { x: 0, y: 0 };
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
