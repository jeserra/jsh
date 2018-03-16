import Router from "vue-router";
import Home from "../components/Home";
import Bancos from "../components/banks/Bancos";
import creadorBanco from "../components/banks/creadorBanco";
import editorBanco from "../components/banks/editorBanco";
import Usuarios from "../components/users/Usuarios";
import creadorUsuario from "../components/users/creadorUsuario";
import editorUsuario from "../components/users/editorUsuario";

export default new Router({
  routes: [
    { path: "", component: Home },
    { path: "/inicio", component: Home, name: "inicio" },
    { path: "/bancos", component: Bancos, name: "bancos" },
    { path: "/bancos/:id", component: editorBanco, name: "editorBanco" },
    { path: "/nuevo-banco", component: creadorBanco, name: "nuevoBanco" },
    { path: "/usuarios", component: Usuarios, name: "usuarios" },
    { path: "/usuarios/:id", component: editorUsuario, name: "editorUsuario" },
    { path: "/nuevo-usuario", component: creadorUsuario, name: "nuevoUsuario" }
  ],
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});
