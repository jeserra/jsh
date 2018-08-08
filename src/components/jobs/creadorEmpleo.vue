<template>
  <div>

    <toolbarHandler      
      :key-name="'empleos'"/>

    <div class="elements-container">
      <v-layout
        align-center
        justify-space-around
        row
        fill-height>

        <v-flex xs3>
          <h2>CREAR EMPLEO</h2>
        </v-flex>
      </v-layout>

      <v-layout 
        align-center
        justify-start
        row
        fill-height>

        <v-flex xs3>
          <v-text-field
            v-model="tipo"
            label="Tipo de empleo"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs1>
          <div>
            <v-text-field
              v-model="oferta"
              label="Oferta"
              type="number"
              required/>
          </div>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs3>
          <v-text-field
            v-model="vigencia"
            label="Vigencia"
            required/>
        </v-flex>
      </v-layout>

      <v-layout
        align-center
        justify-start
        row
        fill-height>
        <h2>Dirección</h2>
      </v-layout>

      <v-layout
        align-center
        justify-start
        row
        fill-height>

        <v-flex xs1>
          <v-text-field
            v-model="direccion.estado"
            label="Estado"/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs1>
          <v-text-field
            v-model="direccion.ciudad"
            label="Ciudad"/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs1>
          <v-text-field
            v-model="direccion.cp"
            type="number"
            label="C.P."/>
        </v-flex>

      </v-layout>

      <v-layout
        align-center
        justify-start
        row
        fill-height>

        <v-flex xs3>
          <v-text-field
            v-model="direccion.calle"
            label="Calle"/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs1>
          <v-text-field
            v-model="direccion.numero"
            label="Número"/>
        </v-flex>
      </v-layout>

      <v-layout
        align-center
        justify-start
        row
        fill-height>

        <v-flex xs1>
          <v-text-field
            v-model="direccion.longitud"
            label="Longitud"/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs1>
          <v-text-field
            v-model="direccion.latitud"
            label="Latitud"/>
        </v-flex>
      </v-layout>
    </div>

    <v-btn
      fixed
      fab
      bottom
      right
      color="primary"
      @click="saveJobData()">
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

      allJobsURL: apiRoutes[apiMode].allJobsURL,
      errors: [],

      jobData: {},
      tipo: "",
      oferta: "",
      vigencia: "",
      direccion: {
        calle: "",
        numero: "",
        cp: "",
        ciudad: "",
        estado: "",
        latitud: "",
        longitud: ""
      },

      // Snackbar config
      snackbar: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 3000,
      confirmationMessage: "El empleo ha sido guardado"
    };
  },
  methods: {
    prepareData() {
      this.jobData = {
        id: this.id,
        tipo: this.tipo,
        oferta: this.oferta,
        vigencia: this.vigencia,
        direccion: this.direccion
      };
    },
    saveJobData() {
      this.prepareData();

      axios({
        method: "POST",
        data: this.jobData,
        url: this.allJobsURL
      })
        .then(response => {
          console.log(response);

          alert("El empleo se ha guardado satisfactoriamente");
          this.$router.push({ name: "empleos" });
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
