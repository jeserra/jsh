export const apiRoutes = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic dXNlcjpwYXNzd29yZA==",
    Accept: "application/json"
  },
  testing: {
    allBanksURL: "http://localhost:5000/api/all/bancoalimentos",
    allRegionsURL: "http://localhost:5000/api/all/region",

    addressURL: "http://localhost:5000/api/direccion/IDDireccion",
    bankURL: "http://localhost:5000/api/bancoalimentos/IDBancoAlimentos",
    contactURL: "http://localhost:5000/api/contacto/IDContacto",
    regionURL: "http://localhost:5000/api/region/IDRegion"
  },
  jsh: {
    allBanksURL: "http://18.221.249.12:80/api/bancoalimentos",
    allRegionsURL: "http://18.221.249.12:80/api/regiones",

    addressURL: "",
    bankURL: "http://18.221.249.12:80/api/bancoalimentos",
    contactURL: "",
    regionURL: "http://18.221.249.12:80/api/regiones/",
    /////////
    allCommunitaryCentersURL: "http://18.221.249.12:80/api/comunitarios",
    allUsersURL: "http://18.221.249.12:80/api/usuarios",
    allDonatorsURL: "18.221.249.12:80/api/donadores"
  }
};
