import Router from "vue-router";
import Home from "../components/Home";
import LogIn from "../components/LogIn";

import Bancos from "../components/banks/Bancos";
import creadorBanco from "../components/banks/creadorBanco";
import editorBanco from "../components/banks/editorBanco";

import Usuarios from "../components/users/Usuarios";
import creadorUsuario from "../components/users/creadorUsuario";
import editorUsuario from "../components/users/editorUsuario";

import Beneficiarios from "../components/beneficiaries/Beneficiarios";
import creadorBeneficiario from "../components/beneficiaries/creadorBeneficiario";
import editorBeneficiario from "../components/beneficiaries/editorBeneficiario";

import Courses from "../components/courses/Courses";
import creadorCurso from "../components/courses/creadorCurso";
import editorCursos from "../components/courses/editorCursos";

import Servicios from "../components/Servicios";

export default new Router({
  routes: [
    { path: "", component: Home },
    { path: "/inicio", component: Home, name: "inicio" },
    { path: "/iniciar-sesion", component: LogIn, name: "logIn" },
    //bancos
    { path: "/bancos", component: Bancos, name: "bancos" },
    { path: "/bancos/:id", component: editorBanco, name: "editorBanco" },
    { path: "/nuevo-banco", component: creadorBanco, name: "nuevoBanco" },
    //usuarios
    { path: "/usuarios", component: Usuarios, name: "usuarios" },
    { path: "/usuarios/:id", component: editorUsuario, name: "editorUsuario" },
    { path: "/nuevo-usuario", component: creadorUsuario, name: "nuevoUsuario" },
    //beneficiarios
    { path: "/beneficiarios", component: Beneficiarios, name: "beneficiarios" },
    {
      path: "/beneficiarios/:id",
      component: editorBeneficiario,
      name: "editorBeneficiario"
    },
    {
      path: "/nuevo-beneficiario",
      component: creadorBeneficiario,
      name: "nuevoBeneficiario"
    },
    //servicios
    { path: "/servicios", component: Servicios, name: "servicios" },

    //cursos
    { path: "/cursos", component: Courses, name: "cursos" },
    { path: "/cursos/:id", component: editorCursos, name: "editorCursos" },
    { path: "/nuevo-curso", component: creadorCurso, name: "nuevoCurso" }
  ],
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});
