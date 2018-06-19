<template>
  <div>

    <toolbarHandler      
      :key-name="'bancos'"/>

    <v-container class="elements-container">
      <v-layout
        row
        wrap>
        <v-flex xs3/>

        <v-flex xs2>
          <h2>EDITAR BANCO</h2>
        </v-flex>
      </v-layout>

      <v-layout
        row
        wrap>

        <v-flex xs2>
          <v-text-field
            v-model="bankData.Nombre"
            label="Nombre del Banco"
            required/>
        </v-flex>

        <v-flex xs2>
          <v-text-field
            v-model="bankData.RazonSocial"
            label="Razón social del banco"
            required/>
        </v-flex>

        <v-flex xs1>
          <v-text-field
            v-model="bankData.Calificacion"
            label="Calificación"
            type="number"
            required/>
        </v-flex>

        <v-checkbox
          v-model="bankData.Habilitado"
          label="Habilitado"/>
      </v-layout>

      <v-layout
        row
        wrap>

        <v-flex xs4>
          <h3>Fecha de Afiliación</h3>
          <v-date-picker
            v-if="!loading"
            :landscape="true"
            v-model="fechaAfiliacion"
            locale="es"/>
        </v-flex>

        <v-flex xs4>
          <h3>Fecha de Registro</h3>
          <v-date-picker
            v-if="!loading"        
            :landscape="true"
            v-model="fechaRegistro"
            locale="es"/>
        </v-flex>
      </v-layout>

      <v-layout
        v-if="!loading"
        row
        wrap>

        <h3>Dirección</h3>
      </v-layout>

      <v-layout
        v-if="!loading"
        row
        wrap>

        <v-flex xs1>
          <v-text-field
            v-model="bankData.Direccion.Estado"
            label="Estado"/>
        </v-flex>

        <v-flex xs1>
          <v-text-field
            v-model="bankData.Direccion.Ciudad"
            label="Ciudad"/>
        </v-flex>

        <v-flex xs1>
          <v-text-field
            v-model="bankData.Direccion.CP"
            type="number"
            label="C.P."/>
        </v-flex>

        <v-flex xs3>
          <v-text-field
            v-model="bankData.Direccion.Calle"
            label="Calle"/>
        </v-flex>

        <v-flex xs1>
          <v-text-field
            v-model="bankData.Direccion.Numero"
            label="Número"/>
        </v-flex>
      </v-layout>

      <form v-if="!loading">
        <h3>Región</h3>

        <v-flex xs1>
          <v-select
            v-model="bankData.Region.Nombre"
            :items="regiones"
            label="Estado"/>
        </v-flex>
      </form>
    </v-container>

    <v-btn
      fixed
      fab
      bottom
      right
      color="primary"
      @click="saveBank()">
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

export default {
  components: {
    toolbarHandler
  },
  data() {
    return {
      banksURL: "http://localhost:5000/api/bancoalimentos/IDBancoAlimentos",
      addressesURL: "http://localhost:5000/api/direccion/IDDireccion",
      regionsAllURL: "http://localhost:5000/api/all/region/",
      regionsURL: "http://localhost:5000/api/region/IDRegion",
      contactsURL: "http://localhost:5000/api/contacto/IDContacto",

      bankID: this.$route.params.id,
      loading: true,
      errors: [],
      bankData: [],

      fechaRegistro: "",
      fechaAfiliacion: "",

      //Región
      regiones: [],
      //

      // Snackbar config
      snackbar: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 3000,
      confirmationMessage: "El Banco ha sido editado"
    };
  },
  watch: {
    loading() {
      if (!this.loading) {
        var tempRegions = [];
        for (var region of this.regiones) {
          tempRegions.push(region.Nombre);
        }
        this.regiones = tempRegions;
      }
    }
  },
  mounted: function() {
    this.getAllRegions();
    this.getBankData();
  },
  methods: {
    transformToClearDate(fullDateString) {
      var registrationDate = new Date(fullDateString);

      var year = registrationDate.getUTCFullYear();
      var month = registrationDate.getUTCMonth() + 1;
      var day = registrationDate.getUTCDate();
      var cleanDate = "" + year + "-" + month + "-" + day;
      return cleanDate;
    },
    initializeData() {
      var callbackFunctions = [this.getRegion, this.getContact];

      this.fechaRegistro = this.transformToClearDate(
        this.bankData.FechaRegistro
      );

      this.fechaAfiliacion = this.transformToClearDate(
        this.bankData.FechaAfiliacion
      );

      this.getAddress(this.bankData, callbackFunctions);
    },
    getBankData() {
      axios({
        method: "GET",
        url: this.banksURL + "/" + this.bankID
      })
        .then(response => {
          var rawData = response.data.data;
          this.bankData = rawData[0];

          this.initializeData();
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    getAllRegions() {
      axios({
        method: "GET",
        url: this.regionsAllURL
      })
        .then(response => {
          this.regiones = response.data.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    getAddress(bank, callbackFunctions) {
      axios({
        method: "GET",
        url: this.addressesURL + "/" + bank.IDDireccion
      })
        .then(response => {
          var rawData = response.data.data;

          bank["Direccion"] = rawData[0];
          bank = callbackFunctions[0](bank, callbackFunctions);
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    getRegion(bank, callbackFunctions) {
      axios({
        method: "GET",
        url: this.regionsURL + "/" + bank.IdRegion
      })
        .then(response => {
          var rawData = response.data.data;

          bank["Region"] = rawData[0];
          bank = callbackFunctions[1](bank, callbackFunctions);
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    getContact(bank, callbackFunctions) {
      axios({
        method: "GET",
        url: this.contactsURL + "/" + bank.IdContacto
      })
        .then(response => {
          var rawData = response.data.data;

          bank["Contacto"] = rawData[0];
          this.loading = false;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    saveBank(bank, callbackFunctions) {
      console.log("Se ha guardado");
    }
  }
};
</script>

<style scoped>
.elements-container {
  margin-left: 5%;
}
</style>
