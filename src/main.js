// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';

import Vuetify from 'vuetify';
Vue.use(Vuetify);
// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// main.styl
//import ('vuetify/src/stylus/main.styl') // Ensure you are using stylus-loader

import Home from './components/Home.vue';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
	{path: '/', component: Home},
	{path: '/inicio', component: Home, name: "inicio" },
	{path: '/bancos', component: Home, name: "bancos" },
	{path: '/usuarios', component: Home, name: "usuarios" },
];

const router = new VueRouter({
	routes,
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
		return savedPosition
		return { x: 0, y: 0 }
	} else {
		return { x: 0, y: 0 }
    }
  },
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
