<template>
  <div>

    <toolbarHandler      
      :key-name="'servicios'"/>

    <div class="elements-container">
      <v-layout
        align-center
        justify-space-around
        row
        fill-height>

        <v-flex xs3>
          <h2>EDITAR SERVICIO</h2>
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
            label="Nombre del negocio"
            required/>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs3>
          <div>
            <v-text-field
              v-model="tipo"
              label="Tipo del beneficio"
              required/>
          </div>
        </v-flex>

        <v-flex xs1/>

        <v-flex xs3>
          <v-text-field
            v-model="beneficio"
            label="Descripción del beneficio"
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
            v-model="telefono"
            label="Contacto"
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
      @click="updateServiceData()">
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

      allServicesURL: apiRoutes[apiMode].allServicesURL,
      errors: [],

      serviceData: {},
      id: this.$route.params.id,
      nombre: "",
      tipo: "",
      beneficio: "",
      telefono: "",
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
      confirmationMessage: "El servicio ha sido guardado"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.allServicesURL + "/" + this.id);
      axios({
        method: "GET",
        url: this.allServicesURL + "/" + this.id
      })
        .then(response => {
          if (apiMode === "testing") {
            //My api needs to projections
            var rawData = response.data.data;
            this.id = rawData.id;
            this.nombre = rawData.nombre;
            this.tipo = rawData.tipo;
            this.beneficio = rawData.beneficio;
            this.telefono = rawData.telefono;
            this.direccion = rawData.direccion;
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
      this.serviceData = {
        id: this.id,
        nombre: this.nombre,
        tipo: this.tipo,
        beneficio: this.beneficio,
        telefono: this.telefono,
        direccion: this.direccion,
        latitud: this.latitud,
        longitud: this.longitud
      };
    },
    updateServiceData() {
      this.prepareData();

      axios({
        method: "PUT",
        data: this.serviceData,
        url: this.allServicesURL + "/" + this.id
      })
        .then(response => {
          console.log(response);

          alert("El servicio se ha guardado satisfactoriamente");
          this.$router.push({ name: "servicios" });
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
