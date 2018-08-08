<template>
  <div>

    <toolbarHandler      
      :key-name="'personas'"/>

    <div class="elements-container">
      <v-layout
        align-center
        justify-space-around
        row
        fill-height>

        <v-flex xs3>
          <h2>CREAR TRABAJADOR</h2>
        </v-flex>
      </v-layout>

      <v-layout 
        align-center
        justify-start
        row
        fill-height>

        <v-flex xs3>
          <v-text-field
            v-model="nombre"
            label="Nombre del Trabajador"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs3>
          <div>
            <v-text-field
              v-model="puesto"
              label="Puesto"
              required/>
          </div>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs3>
          <v-text-field
            v-model="correo"
            label="Correo"
            required/>
        </v-flex>
      </v-layout>

      <v-layout 
        align-center
        justify-start
        row
        fill-height>

        <v-flex xs1>
          <v-text-field
            v-model="comunidades"
            label="Comunidades"
            type="number"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs1>
          <v-text-field
            v-model="grupos"
            label="Grupos"
            type="number"
            required/>
        </v-flex>
      </v-layout>
    </div>

    <v-btn
      fixed
      fab
      bottom
      right
      color="primary"
      @click="saveTrabajadorData()">
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
</template>

<script>
import axios from "axios";
import toolbarHandler from "../../toolbars/toolbarHandler";
import { apiRoutes } from "../../../configs/apiRoutes.js";
//var apiMode = "jsh";
var apiMode = "testing";

export default {
  components: {
    toolbarHandler
  },
  data() {
    return {
      //var apiMode = "jsh";
      apiMode: "testing",

      allTrabajadoresURL: apiRoutes[apiMode].allTrabajadoresURL,
      errors: [],

      trabajadorData: {},
      nombre: "",
      puesto: "",
      correo: "",
      comunidades: "",
      grupos: "",

      // Snackbar config
      snackbar: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 3000,
      confirmationMessage: "El trabajador ha sido guardado"
    };
  },
  methods: {
    prepareData() {
      this.trabajadorData = {
        id: this.id,
        nombre: this.nombre,
        puesto: this.puesto,
        correo: this.correo,
        comunidades: this.comunidades,
        grupos: this.grupos
      };
    },
    saveTrabajadorData() {
      this.prepareData();

      axios({
        method: "POST",
        data: this.trabajadorData,
        url: this.allTrabajadoresURL
      })
        .then(response => {
          console.log(response);

          alert("El centro se ha guardado satisfactoriamente");
          this.$router.push({ name: "usuarios" });
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

<style scoped>
.elements-container {
  margin-left: 5%;
}
</style>
