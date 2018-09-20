export const apiRoutes = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic dXNlcjpwYXNzd29yZA==",
    Accept: "application/json"
  },
  jsh: {
    allBanksURL: "http://localhost:5000/api/all/bancoalimentos",
    allRegionsURL: "http://localhost:5000/api/all/region",

    addressURL: "http://localhost:5000/api/direccion/IDDireccion",
    bankURL: "http://localhost:5000/api/bancoalimentos/IDBancoAlimentos",
    contactURL: "http://localhost:5000/api/contacto/IDContacto",
    regionURL: "http://localhost:5000/api/region/IDRegion",

    allGruposURL: "http://localhost:5000/api/grupos",
    allGruposGraduadosURL: "http://localhost:5000/api/gruposGraduados",

    allCommunitaryCentersURL: "http://localhost:5000/api/centros",
    allJobsURL: "http://localhost:5000/api/empleos",
    allServicesURL: "http://localhost:5000/api/servicios",

    allTrabajadoresURL: "http://localhost:5000/api/trabajadores",
    allMentoresURL: "http://localhost:5000/api/mentores",
    allFamiliasURL: "http://localhost:5000/api/familias",
    allAliadosURL: "http://localhost:5000/api/aliados",
    allTutoresURL: "http://localhost:5000/api/tutores",

    allBeneficiariosURL: "http://localhost:5000/api/beneficiarios"
  },
  testing: {
    allBanksURL: "http://18.221.249.12:5000/api/all/bancoalimentos",
    allRegionsURL: "http://18.221.249.12:5000/api/all/region",

    addressURL: "http://18.221.249.12:5000/api/direccion/IDDireccion",
    bankURL: "http://18.221.249.12:5000/api/bancoalimentos/IDBancoAlimentos",
    contactURL: "http://18.221.249.12:5000/api/contacto/IDContacto",
    regionURL: "http://18.221.249.12:5000/api/region/IDRegion",

    allGruposURL: "http://18.221.249.12:5000/api/grupos",
    allGruposGraduadosURL: "http://18.221.249.12:5000/api/gruposGraduados",

    allCommunitaryCentersURL: "http://18.221.249.12:5000/api/centros",
    allJobsURL: "http://18.221.249.12:5000/api/empleos",
    allServicesURL: "http://18.221.249.12:5000/api/servicios",

    allTrabajadoresURL: "http://18.221.249.12:5000/api/trabajadores",
    allMentoresURL: "http://18.221.249.12:5000/api/mentores",
    allFamiliasURL: "http://18.221.249.12:5000/api/familias",
    allAliadosURL: "http://18.221.249.12:5000/api/aliados",
    allTutoresURL: "http://18.221.249.12:5000/api/tutores",

    allBeneficiariosURL: "http://18.221.249.12:5000/api/beneficiarios"
  },
  amdocs: {
    allBanksURL: "http://localhost:80/api/bancoalimentos",
    allRegionsURL: "http://localhost:80/api/regiones",

    addressURL: "",
    bankURL: "http://localhost:80/api/bancoalimentos",
    contactURL: "",
    regionURL: "http://localhost:80/api/regiones/",
    /////////
    allCommunitaryCentersURL: "http://localhost:80/api/comunitarios",
    allUsersURL: "http://localhost:80/api/usuarios",
    allDonatorsURL: "http://localhost:80/api/donadores"
  }
};
