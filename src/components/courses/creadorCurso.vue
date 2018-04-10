<template>
  <div>

    <toolbarHandler      
      :key-name="'personas'"/>

    <div class="data-visualization-container">
      <h2>Nuevo curso</h2>
      Ingrese al menos los datos que sean de caracter obligatorio(*)

      <form>

        <v-text-field
          v-model="password"
          label="Nombre"
          required/>

        <v-text-field          
          v-model="repeatPassword"          
          :rules="[() => ('Las contraseñas no coinciden')]"
          :error="password !== repeatPassword"
          type="password"
          label="Confirmar Contraseña"
          required/>

        <v-switch 
          :label="userEnabled"
          v-model="userEnabled"
          :true-value="enabledTag"
          :false-value="disabledTag"/>

        <v-text-field
          v-model="name"
          label="Nombre"          
          required/>

        <v-select          
          v-model="userType"
          :items="userTypes"
          label="Tipo de Usuario"/>

        <v-select
          v-model="group"
          :items="groupsData"
          label="Grupo"/>

        <v-select
          v-model="course"
          :items="coursesData"
          label="Curso"/>

        <v-select
          v-model="state"
          :items="statesData"
          label="Estado"/>

        <v-select
          v-model="city"
          :items="citiesData[state]"
          label="Ciudad"/>

        <v-text-field
          v-model="cp"
          type="number"
          label="C.P."/>

        <v-text-field          
          v-model="street"
          label="Calle"/>

        <v-text-field          
          v-model="numberStreet"
          label="Número"/>
      </form>

      <v-btn
        fixed
        fab
        bottom
        right
        color="primary"
        @click="saveUser()">
        <v-icon>save</v-icon>
      </v-btn>    

      <v-snackbar
        :timeout="timeout"
        :top="y === 'top'"
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :vertical="mode === 'vertical'"
        v-model="snackbar">
        {{ confirmationMessage }}
        <v-btn
          flat
          color="pink"
          @click.native="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usersURL: "http://localhost:5000/api/usuarios",

      password: "",
      repeatPassword: "",

      enabledTag: "Habilitado",
      disabledTag: "Deshabilitado",
      userEnabled: "Habilitado",

      name: "",

      userType: undefined,
      userTypes: ["Tipo 1", "Tipo 2", "Tipo 3"],

      group: undefined,
      groupsData: ["Tipo 1", "Tipo 2", "Tipo 3"],

      course: undefined,
      coursesData: ["Tipo 1", "Tipo 2", "Tipo 3"],

      state: undefined,
      statesData: ["Jalisco", "Monterrey"],

      city: undefined,
      citiesData: {
        Jalisco: [
          "Ciudad 1 de Jalisco",
          "Ciudad 2 de Jalisco",
          "Ciudad 3 de Jalisco"
        ],
        Monterrey: [
          "Ciudad 1 de Monterrey",
          "Ciudad 2 de Monterrey",
          "Ciudad 3 de Monterrey"
        ]
      },

      cp: "",
      street: "",
      numberStreet: "",

      // Snackbar config
      snackbar: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 3000,
      confirmationMessage: "El usuario ha sido creado"
    };
  },
  methods: {
    saveUser: function() {
      var vueInstance = this;

      axios
        .post(this.usersURL, {
          nombre: this.name,
          contraseña: this.password,
          tipoUsuario: {
            tipo: this.userType,
            descripción: "---"
          },
          grupo: this.group,
          habilitado: this.userEnabled,
          direccion: {
            calle: this.street,
            numero: this.numberStreet,
            cp: this.cp,
            ciudad: this.city,
            estado: this.state
          },
          curso: {
            id: 1,
            nombre: this.course,
            descripcion: "---",
            calificacion: 0,
            observaciones: "---"
          }
        })
        .then(function(response) {
          vueInstance.snackbar = true;

          vueInstance._routerRoot._router.push({
            name: "editorUsuario",
            params: { id: 1 }
          });
        })
        .catch(function(error) {
          console.log("Error in creation of user");
          console.log(error);
        });
    }
  }
};
</script>

<style scoped type="text/css">
.data-visualization-container {
  margin-left: 30%;
  width: 40%;
}
</style>
