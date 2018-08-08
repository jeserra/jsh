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
          <h2>EDITAR MENTOR</h2>
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
            label="Nombre del Mentor"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs2>
          <div>
            <v-text-field
              v-model="comunidad"
              label="Comunidad"
              required/>
          </div>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs2>
          <v-text-field
            v-model="familias"
            label="Número de Familias"
            type="number"
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

        <v-flex xs1/>

      </v-layout>
    </div>

    <v-btn
      fixed
      fab
      bottom
      right
      color="primary"
      @click="updateMentorData()">
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

      allMentoresURL: apiRoutes[apiMode].allMentoresURL,
      errors: [],

      tutorData: {},
      id: this.$route.params.id,
      nombre: "",
      comunidad: "",
      familias: "",
      contacto: "",

      // Snackbar config
      snackbar: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 3000,
      confirmationMessage: "El mentor ha sido guardado"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "GET",
        url: this.allMentoresURL + "/" + this.id
      })
        .then(response => {
          if (apiMode === "testing") {
            //My api needs to projections
            var rawData = response.data.data;
            this.id = rawData.id;
            this.nombre = rawData.nombre;
            this.comunidad = rawData.comunidad;
            this.familias = rawData.familias;
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
        comunidad: this.comunidad,
        familias: this.familias,
        contacto: this.contacto
      };
    },
    updateMentorData() {
      this.prepareData();

      axios({
        method: "PUT",
        data: this.tutorData,
        url: this.allMentoresURL + "/" + this.id
      })
        .then(response => {
          console.log(response);

          alert("El mentor se ha guardado satisfactoriamente");
          this.$router.push({ name: "mentores" });
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
