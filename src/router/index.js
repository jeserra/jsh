import Router from 'vue-router';
import Home from '../components/Home';
import Bancos from '../components/Bancos';
import Usuarios from '../components/Usuarios';

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/inicio', component: Home, name: 'inicio' },
    { path: '/bancos', component: Bancos, name: 'bancos' },
    { path: '/usuarios', component: Usuarios, name: 'usuarios' },
  ],
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
      // return { x: 0, y: 0 };
    }
    return { x: 0, y: 0 };
  },
});
