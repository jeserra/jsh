<template>
  <div>

    <toolbarHandler      
      :key-name="'grupos'"/>

    <div class="elements-container">
      <v-layout
        align-center
        justify-space-around
        row
        fill-height>

        <v-flex xs3>
          <h2>CREAR GRUPO</h2>
        </v-flex>
      </v-layout>

      <v-layout 
        align-center
        justify-start
        row
        fill-height>

        <v-flex xs3>
          <v-text-field
            v-model="comunidad"
            label="Comunidad"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs3>
          <div>
            <v-text-field
              v-model="trabajador"
              label="Nombre del trabajador"
              required/>
          </div>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs3>
          <v-text-field
            v-model="integrantes"
            label="# Integrantes"
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
            v-model="progreso"
            label="Progreso"
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
      @click="updateGrupoData()">
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
import toolbarHandler from "../toolbars/toolbarHandler";
import { apiRoutes } from "../../configs/apiRoutes.js";
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

      allGruposURL: apiRoutes[apiMode].allGruposURL,
      errors: [],

      grupoData: {},
      comunidad: "",
      trabajador: "",
      integrantes: "",
      progreso: "",

      // Snackbar config
      snackbar: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 3000,
      confirmationMessage: "El grupo ha sido guardado"
    };
  },
  methods: {
    prepareData() {
      this.grupoData = {
        id: this.id,
        comunidad: this.comunidad,
        trabajador: this.trabajador,
        integrantes: this.integrantes,
        progreso: this.progreso
      };
    },
    updateGrupoData() {
      this.prepareData();

      axios({
        method: "POST",
        data: this.grupoData,
        url: this.allGruposURL
      })
        .then(response => {
          console.log(response);

          alert("El grupo se ha guardado satisfactoriamente");
          this.$router.push({ name: "grupos" });
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
