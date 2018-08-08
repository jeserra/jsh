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
          <h2>EDITAR TUTOR</h2>
        </v-flex>
      </v-layout>

      <v-layout 
        align-center
        justify-start
        row
        fill-height>

        <v-flex xs2>
          <v-text-field
            v-model="nombre"
            label="Nombre del Tutor"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs2>
          <v-text-field
            v-model="contacto"
            label="Contacto"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs2>
          <v-text-field
            v-model="comunidad"
            label="Comunidad"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs1>
          <v-text-field
            v-model="tipo"
            label="Tipo"
            required/>
        </v-flex>
      </v-layout>

      <v-layout 
        align-center
        justify-start
        row
        fill-height>

        <v-flex xs1>
          <v-switch
            v-model="disponible"
            color="green"
            label="Disponible"
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
      @click="updateTutorData()">
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

      allTutoresURL: apiRoutes[apiMode].allTutoresURL,
      errors: [],

      tutorData: {},
      id: this.$route.params.id,
      nombre: "",
      disponible: "",
      comunidad: "",
      tipo: "",
      contacto: "",

      // Snackbar config
      snackbar: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 3000,
      confirmationMessage: "El tutor ha sido guardado"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "GET",
        url: this.allTutoresURL + "/" + this.id
      })
        .then(response => {
          if (apiMode === "testing") {
            //My api needs to projections
            var rawData = response.data.data;
            this.id = rawData.id;
            this.nombre = rawData.nombre;
            this.disponible = rawData.disponible;
            this.comunidad = rawData.comunidad;
            this.tipo = rawData.tipo;
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
      this.tutorData = {
        id: this.id,
        nombre: this.nombre,
        disponible: this.disponible,
        comunidad: this.comunidad,
        tipo: this.tipo,
        contacto: this.contacto
      };
    },
    updateTutorData() {
      this.prepareData();

      axios({
        method: "PUT",
        data: this.tutorData,
        url: this.allTutoresURL + "/" + this.id
      })
        .then(response => {
          console.log(response);

          alert("El tutor se ha guardado satisfactoriamente");
          this.$router.push({ name: "tutores" });
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
