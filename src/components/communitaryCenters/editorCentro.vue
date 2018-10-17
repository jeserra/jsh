<template>
  <div>

    <toolbarHandler      
      :key-name="'bancos'"/>

    <div class="elements-container">
      <v-layout
        align-center
        justify-space-around
        row
        fill-height>

        <v-flex xs3>
          <h2>EDITAR CENTRO</h2>
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
            label="Nombre del Centro"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs3>
          <div>
            <v-text-field
              v-model="fechaRegistro"
              label="Fecha del registro"
              required/>
          </div>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs3>
          <v-text-field
            v-model="comunidad"
            label="Comunidad"
            required/>
        </v-flex>
      </v-layout>

      <v-layout 
        align-center
        justify-start
        row
        fill-height>

        <v-flex xs3>
          <v-text-field
            v-model="direccion.ciudad"
            label="Municipio"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs2>
          <v-text-field
            v-model="familias"
            label="Número de familias"
            type="number"
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
      @click="updateCenterData()">
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
var apiMode = "jsh";
//var apiMode = "testing";

export default {
  components: {
    toolbarHandler
  },
  data() {
    return {
      //var apiMode = "jsh";
      apiMode: "testing",

      allCommunitaryCentersURL: apiRoutes[apiMode].allCommunitaryCentersURL,
      errors: [],

      centerData: {},
      id: this.$route.params.id,
      nombre: "",
      fechaRegistro: "",
      comunidad: "",
      municipio: "",
      familias: "",
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
      confirmationMessage: "El Centro ha sido guardado"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "GET",
        url: this.allCommunitaryCentersURL + "/" + this.id
      })
        .then(response => {
          if (apiMode === "testing") {
            //My api needs to projections
            var rawData = response.data.data;
            this.id = rawData.id;
            this.nombre = rawData.nombre;
            this.fechaRegistro = rawData.fechaRegistro;
            this.comunidad = rawData.comunidad;
            this.municipio = rawData.municipio;
            this.familias = rawData.familias;
            this.direccion = rawData.direccion;
          } else {
            //Api from amdocs has projections

            console.log(response.data.direccion);
            console.log(response.data._embedded.comunitarios);
            //var rawData = response.data._embedded.comunitarios;
            var rawData = response.data;
            this.id = rawData.id;
            this.nombre = rawData.nombre;
            this.fechaRegistro = rawData.fechaRegistro;
            this.comunidad = rawData.direccion.comunidad; // 
            this.municipio = rawData.direccion.municipio; //
            this.familias = rawData.numeroFamilias;
            this.direccion = rawData.direccion;
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
      this.centerData = {
        id: this.id,
        nombre: this.nombre,
        fechaRegistro: this.fechaRegistro,
        comunidad: this.comunidad,
        municipio: this.municipio,
        familias: this.familias,
        direccion: this.direccion,
        latitud: this.latitud,
        longitud: this.longitud
      };
    },
    updateCenterData() {
      this.prepareData();

      axios({
        method: "PUT",
        data: this.centerData,
        url: this.allCommunitaryCentersURL + "/" + this.id
      })
        .then(response => {
          console.log(response);

          alert("El centro se ha guardado satisfactoriamente");
          this.$router.push({ name: "centros" });
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
