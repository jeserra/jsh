import Vue from "vue";
import Router from "vue-router";
import store from "../store";
Vue.use(Router);

// Components
import Home from "../components/Home";
import LogIn from "../components/LogIn";

import DashboardProcess from "../components/dashboard/process";

import Bancos from "../components/banks/Bancos";
import creadorBanco from "../components/banks/creadorBanco";
import editorBanco from "../components/banks/editorBanco";

import Centros from "../components/communitaryCenters/Centros";
import creadorCentro from "../components/communitaryCenters/creadorCentro";
import editorCentro from "../components/communitaryCenters/editorCentro";

import Grupos from "../components/groups/Grupos";
import GruposPasados from "../components/groups/GruposPasados";
import creadorGrupo from "../components/groups/creadorGrupo";
import editorGrupo from "../components/groups/editorGrupo";

import Usuarios from "../components/users/usuarios/Usuarios";
import creadorUsuario from "../components/users/usuarios/creadorUsuario";
import editorUsuario from "../components/users/usuarios/editorUsuario";

import Mentores from "../components/users/mentores/Mentores";
import creadorMentor from "../components/users/mentores/creadorMentor";
import editorMentor from "../components/users/mentores/editorMentor";

import Familias from "../components/users/familias/Familias";
import creadorFamilia from "../components/users/familias/creadorFamilia";
import editorFamilia from "../components/users/familias/editorFamilia";

import Beneficiarios from "../components/beneficiaries/Beneficiarios";
import creadorBeneficiario from "../components/beneficiaries/creadorBeneficiario";
import editorBeneficiario from "../components/beneficiaries/editorBeneficiario";

import Aliados from "../components/users/aliados/Aliados";
import creadorAliado from "../components/users/aliados/creadorAliado";
import editorAliado from "../components/users/aliados/editorAliado";

import Tutores from "../components/users/tutores/Tutores";
import creadorTutor from "../components/users/tutores/creadorTutor";
import editorTutor from "../components/users/tutores/editorTutor";

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

  //dashboard
  {
    path: "/dashboard-intermedio",
    component: DashboardProcess,
    name: "dashboardIntermedio",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/dashboard-proceso",
    component: DashboardProcess,
    name: "dashboardProceso",
    beforeEnter: ifWorkerAuthenticated
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
    name: "creadorBanco",
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
    name: "creadorCentro",
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
    path: "/grupos-pasados",
    component: GruposPasados,
    name: "gruposPasados",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/grupo/:id",
    component: editorGrupo,
    name: "editorGrupo",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-grupo",
    component: creadorGrupo,
    name: "creadorGrupo",
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
    name: "creadorUsuario",
    beforeEnter: ifWorkerAuthenticated
  },

  //mentores
  {
    path: "/mentores",
    component: Mentores,
    name: "mentores",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/mentores/:id",
    component: editorMentor,
    name: "editorMentor",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-mentor",
    component: creadorMentor,
    name: "creadorMentor",
    beforeEnter: ifWorkerAuthenticated
  },

  //familias
  {
    path: "/familias",
    component: Familias,
    name: "familias",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/familia/:id",
    component: editorFamilia,
    name: "editorFamilia",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nueva-familia",
    component: creadorFamilia,
    name: "creadorFamilia",
    beforeEnter: ifWorkerAuthenticated
  },

  //tutores
  {
    path: "/tutores",
    component: Tutores,
    name: "tutores",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/tutor/:id",
    component: editorTutor,
    name: "editorTutor",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-tutor",
    component: creadorTutor,
    name: "creadorTutor",
    beforeEnter: ifWorkerAuthenticated
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
    name: "creadorBeneficiario",
    beforeEnter: ifWorkerAuthenticated
  },

  //aliados
  {
    path: "/aliados",
    component: Aliados,
    name: "aliados",
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/aliado/:id",
    component: editorAliado,
    name: "editorAliado",
    beforeEnter: ifWorkerAuthenticated
  },
  {
    path: "/nuevo-aliado",
    component: creadorAliado,
    name: "creadorAliado",
    beforeEnter: ifWorkerAuthenticated
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
    name: "creadorServicio",
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
    name: "creadorEmpleo",
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
