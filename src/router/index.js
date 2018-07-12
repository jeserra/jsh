import Vue from "vue";
import Router from "vue-router";
import store from "../store";
Vue.use(Router);

// Components
import Home from "../components/Home";
import LogIn from "../components/LogIn";

import Bancos from "../components/banks/Bancos";
import creadorBanco from "../components/banks/creadorBanco";
import editorBanco from "../components/banks/editorBanco";

import Centros from "../components/communitaryCenters/Centros";
import creadorCentro from "../components/communitaryCenters/creadorCentro";
import editorCentro from "../components/communitaryCenters/editorCentro";

import Grupos from "../components/groups/Grupos";

import Usuarios from "../components/users/Usuarios";
import creadorUsuario from "../components/users/creadorUsuario";
import editorUsuario from "../components/users/editorUsuario";

import Beneficiarios from "../components/beneficiaries/Beneficiarios";
import creadorBeneficiario from "../components/beneficiaries/creadorBeneficiario";
import editorBeneficiario from "../components/beneficiaries/editorBeneficiario";

import Aliados from "../components/users/Aliados";

import Courses from "../components/courses/Courses";
import creadorCurso from "../components/courses/creadorCurso";
import editorCursos from "../components/courses/editorCursos";

import Servicios from "../components/services/Servicios";
import creadorServicio from "../components/services/creadorServicio";
import editorServicio from "../components/services/editorServicio";

import Empleos from "../components/jobs/Empleos";
import creadorEmpleo from "../components/jobs/creadorEmpleo";
import editorEmpleo from "../components/jobs/editorEmpleo";

const userRoleTag = "Student";
const workerRoleTag = "Worker";

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifUserAuthenticated = (to, from, next) => {
  console.log("Auth service user simulation: " + Date.now());

  if (store.getters.isAuthenticated) {
    //Check user permissions
    /*
    var token = store.getters.isAuthenticated;

    jsh / connection / token
    userID = result.userID;
      ----------------
    jsh / user / token
    if (result.user.id)
    */

    next();
    return;
  } else {
    next();
  }
};

const ifWorkerAuthenticated = (to, from, next) => {
  console.log("Auth service admin simulation: " + Date.now());

  if (store.getters.isAuthenticated) {
    //Check user permissions
    next();
    return;
  } else {
    next();
    /*
    next({
      name: "logIn"
    });
    */
  }
};

const routes = [
  {
    path: "",
    component: Home
  },
  {
    path: "/inicio",
    component: Home,
    name: "inicio"
  },
  {
    path: "/iniciar-sesion",
    component: LogIn,
    name: "logIn"
  },

  //bancos
  {
    path: "/bancos",
    component: Bancos,
    name: "bancos",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/bancos/:id",
    component: editorBanco,
    name: "editorBanco",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-banco",
    component: creadorBanco,
    name: "nuevoBanco",
    beforeEnter: ifWorkerAuthenticated
  },

  //centros
  {
    path: "/centros",
    component: Centros,
    name: "centros",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/centros/:id",
    component: editorCentro,
    name: "editorCentro",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-centro",
    component: creadorCentro,
    name: "nuevoCentro",
    beforeEnter: ifWorkerAuthenticated
  },

  //grupos
  {
    path: "/grupos",
    component: Grupos,
    name: "grupos",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/centros/:id",
    component: editorCentro,
    name: "editorGrupo",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-grupo",
    component: creadorCentro,
    name: "nuevoGrupo",
    beforeEnter: ifWorkerAuthenticated
  },

  //usuarios
  {
    path: "/usuarios",
    component: Usuarios,
    name: "usuarios",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/usuarios/:id",
    component: editorUsuario,
    name: "editorUsuario",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-usuario",
    component: creadorUsuario,
    name: "nuevoUsuario",
    beforeEnter: ifWorkerAuthenticated
  },

  //mentores
  {
    path: "/mentores",
    component: Home,
    name: "mentores",
    beforeEnter: ifUserAuthenticated
  },

  //tutores
  {
    path: "/tutores",
    component: Home,
    name: "tutores",
    beforeEnter: ifUserAuthenticated
  },

  //beneficiarios
  {
    path: "/beneficiarios",
    component: Beneficiarios,
    name: "beneficiarios",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/beneficiarios/:id",
    component: editorBeneficiario,
    name: "editorBeneficiario",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-beneficiario",
    component: creadorBeneficiario,
    name: "nuevoBeneficiario",
    beforeEnter: ifWorkerAuthenticated
  },

  //aliados
  {
    path: "/aliados",
    component: Aliados,
    name: "aliados",
    beforeEnter: ifUserAuthenticated
  },

  //servicios
  {
    path: "/servicios",
    component: Servicios,
    name: "servicios",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/servicios/:id",
    component: editorServicio,
    name: "editorServicio",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-servicio",
    component: creadorServicio,
    name: "nuevoServicio",
    beforeEnter: ifWorkerAuthenticated
  },

  //empleos
  {
    path: "/empleos",
    component: Empleos,
    name: "empleos",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/empleos/:id",
    component: editorEmpleo,
    name: "editorEmpleo",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-empleo",
    component: creadorEmpleo,
    name: "nuevoEmpleo",
    beforeEnter: ifWorkerAuthenticated
  },

  //cursos
  {
    path: "/cursos",
    component: Courses,
    name: "cursos",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/cursos/:id",
    component: editorCursos,
    name: "editorCursos",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-curso",
    component: creadorCurso,
    name: "nuevoCurso",
    beforeEnter: ifWorkerAuthenticated
  }
];

export default new Router({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});
