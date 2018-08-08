<template>
  <v-container>

    <toolbarHandler      
      :key-name="'centros'"/>

    <v-layout
      row
      justify-center>

      <v-flex 
        xs8
        m8>
        <v-card>

          <v-card-title v-if="selected.length==0">
            {{ items.length + ' ' }} Centros Comunitarios
            <v-spacer/>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar"
              single-line
              hide-details/>

            <router-link
              :to="{ name:'creadorCentro' }">
              <v-btn
                flat
                style="color:rgba(71, 147, 89, 1)">
                Agregar
              </v-btn>
            </router-link>

            <v-btn
              flat
              style="color:rgba(71, 147, 89, 1)"
              @click="getData()">
              Actualizar
            </v-btn>
          </v-card-title>

          <v-card-title v-if="selected.length > 0">
            {{ selected.length + ' ' }} elementos seleccionados
            <v-spacer/>
            <v-btn 
              v-if="selected.length == 1"
              flat
              @click="editCenter()">
              Editar
            </v-btn>
            <v-btn 
              flat
              @click="deleteSelectedCenters()">
              Borrar
            </v-btn>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            :loading="loading"
            v-model="selected"
            item-key="id"                      
            select-all
            class="elevation-2">

            <template
              slot="items" 
              slot-scope="props">
              <td>
                <v-checkbox
                  v-model="props.selected"
                  color="green"
                  primary
                  hide-details/>
              </td>
              <td>{{ String(props.item[headers[0]["value"]]) }}</td>
              <td>{{ String(props.item[headers[1]["value"]]) }}</td>
              <td>{{ String(props.item[headers[2]["value"]]) }}</td>
              <td>{{ String(props.item[headers[3]["value"]]) }}</td>
            </template>

            <template slot="no-data">
              <v-alert 
                :value="true" 
                outline 
                color="grey" 
                icon="info">
                No hay datos disponibles
              </v-alert>
            </template>
          </v-data-table>
          
        </v-card>

      </v-flex>

      <v-flex
        xs4
        m4>

        <gmap-map
          :center="{lat:gmapCenter.latitud, lng:gmapCenter.longitud}"
          :zoom="10"
          map-type-id="roadmap"
          style="width: 100%; height: 100%">
          
          <gmap-marker
            v-for="(center, index) in selected"
            v-if="selected.length !=0"
            :key="index+'-marker-id'"
            :title="center.nombre"
            :position="{lat:Number(center.direccion.latitud), lng:Number(center.direccion.longitud)}"
            :clickable="true"
            :draggable="false"/>
        </gmap-map>
      </v-flex>

    </v-layout>
  </v-container>
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

      allCommunitaryCentersURL: apiRoutes[apiMode].allCommunitaryCentersURL,

      loading: true,
      search: "",
      selected: [],

      Rawitems: [],
      items: [],
      markers: [],
      errors: [],
      gmapCenter: {
        latitud: 20.66682,
        longitud: -103.39182
      }
    };
  },
  computed: {
    headers: function() {
      console.log("El API seleccionado será " + apiMode);
      if (apiMode === "testing") {
        return [
          { text: "ID", value: "id", sortable: false },
          { text: "Comunidad", value: "comunidad" },
          { text: "Municipio", value: "municipio" },
          { text: "Familias", value: "familias" }
        ];
      } else if (apiMode === "jsh") {
        return [
          { text: "ID", value: "_links.self.href", sortable: false },
          { text: "Comunidad", value: "nombre" },
          { text: "Municipio", value: "direccion.ciudad" },
          { text: "Familias", value: "direccion.numero" }
        ];
      }
    }
  },
  watch: {
    $route(to, from) {
      // Call resizePreserveCenter() on all maps
      Vue.$gmapDefaultResizeBus.$emit("resize");
    },
    items() {
      if (this.items.length == this.Rawitems.length) {
        this.loading = false;
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    initializeData() {
      this.items = [];
      var callbackFunctions = [];

      for (var center of this.Rawitems) {
        center["Calificacion"] = Number(center["Calificacion"]);
        //this.getAddress(center, callbackFunctions);
      }
    },
    editCenter() {
      var selectedID = this.selected[0].id;
      this.$router.push({ name: "editorCentro", params: { id: selectedID } });
    },
    deleteSelectedCenters() {
      for (var i = 0; i < this.selected.length; i++) {
        this.deleteCenter(this.selected[i].id);
      }

      this.selected = [];
    },
    deleteCenter(centerID) {
      axios({
        method: "DELETE",
        url: this.allCommunitaryCentersURL + "/" + centerID
      })
        .then(response => {
          console.log(response);
          this.getData();
        })
        .catch(e => {
          console.log("error");
          console.log(e);
          this.errors.push(e);
        });
    },
    getData() {
      this.items = [];

      axios({
        method: "GET",
        url: this.allCommunitaryCentersURL
      })
        .then(response => {
          if (apiMode === "testing") {
            //My api needs to projections
            var rawData = response.data.data;
            this.items = rawData;
            //this.initializeData();
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
    }
  }
};
</script>
