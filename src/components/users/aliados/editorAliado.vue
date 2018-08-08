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
          <h2>EDITAR ALIADO</h2>
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
            label="Nombre del Aliado"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs3>
          <div>
            <v-text-field
              v-model="tipo"
              label="Tipo de aliado"
              required/>
          </div>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs3>
          <v-text-field
            v-model="descripcion"
            label="Descripción"
            required/>
        </v-flex>
      </v-layout>

      <v-layout 
        align-center
        justify-start
        row
        fill-height>

        <v-flex xs2>
          <v-text-field
            v-model="contacto"
            label="Contacto"
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
      @click="updateAliadoData()">
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

      allAliadosURL: apiRoutes[apiMode].allAliadosURL,
      errors: [],

      aliadoData: {},
      id: this.$route.params.id,
      nombre: "",
      tipo: "",
      descripcion: "",
      contacto: "",

      // Snackbar config
      snackbar: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 3000,
      confirmationMessage: "El aliado ha sido guardado"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "GET",
        url: this.allAliadosURL + "/" + this.id
      })
        .then(response => {
          if (apiMode === "testing") {
            //My api needs to projections
            var rawData = response.data.data;
            this.id = rawData.id;
            this.nombre = rawData.nombre;
            this.tipo = rawData.tipo;
            this.descripcion = rawData.descripcion;
            this.contacto = rawData.contacto;
          } else {
            //Api from amdocs has projections
            //console.log(response.data._embedded.comunitarios);
            var rawData = response.data._embedded.comunitarios;
            this.items = rawData;
          }
        })
        .catch(e => {
          console.log("error");
          console.log(e);
          this.errors.push(e);
        });
    },
    prepareData() {
      this.aliadoData = {
        id: this.id,
        nombre: this.nombre,
        tipo: this.tipo,
        descripcion: this.descripcion,
        contacto: this.contacto
      };
    },
    updateAliadoData() {
      this.prepareData();

      axios({
        method: "PUT",
        data: this.aliadoData,
        url: this.allAliadosURL + "/" + this.id
      })
        .then(response => {
          console.log(response);

          alert("El aliado se ha guardado satisfactoriamente");
          this.$router.push({ name: "aliados" });
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
