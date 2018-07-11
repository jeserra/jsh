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
          </v-card-title>

          <v-card-title v-if="selected.length == 1">
            {{ selected.length + ' ' }} elemento seleccionado
            <v-spacer/>
            <v-btn flat>Editar</v-btn>
            <v-btn flat>Borrar</v-btn>
          </v-card-title>

          <v-card-title v-if="selected.length > 1">
            {{ selected.length + ' ' }} elemento seleccionado
            <v-spacer/>
            <v-btn flat>Borrar</v-btn>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            :loading="loading"
            v-model="selected"
            item-key="nombre"                      
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
              <td>{{ String(props.item._links.self.href).slice(38) }}</td>
              <td>{{ props.item.nombre }}</td>
              <td>{{ props.item.direccion.ciudad }}</td>
              <td>{{ props.item.direccion.numero }}</td>
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
import StarRating from "vue-star-rating";
import toolbarHandler from "../toolbars/toolbarHandler";
import { apiRoutes } from "../../configs/apiRoutes.js";
var apiMode = "jsh";

export default {
  components: {
    StarRating,
    toolbarHandler
  },
  data() {
    return {
      allCommunitaryCentersURL: apiRoutes[apiMode].allCommunitaryCentersURL,
      addressesURL: apiRoutes[apiMode].addressesURL,
      regionsURL: apiRoutes[apiMode].regionsURL,

      loading: true,
      search: "",
      selected: [],

      Rawitems: [],
      items: [],
      markers: [],
      errors: [],
      headers: [
        { text: "ID", value: "_links.self.href", sortable: false },
        { text: "Comunidad", value: "nombre" },
        { text: "Municipio", value: "direccion.ciudad" },
        { text: "Familias", value: "direccion.numero" }
      ],

      gmapCenter: {
        latitud: 20.66682,
        longitud: -103.39182
      }
    };
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
    getData() {
      axios({
        method: "GET",
        url: this.allCommunitaryCentersURL
      })
        .then(response => {
          if (apiMode === "testing") {
            //My api needs to projections
            var rawData = response.data.data;
            this.Rawitems = rawData;
            this.initializeData();
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
