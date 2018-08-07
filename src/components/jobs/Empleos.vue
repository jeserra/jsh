<template>
  <v-container>

    <toolbarHandler      
      :key-name="'empleos'"/>

    <v-layout
      row
      justify-center>

      <v-flex 
        xs8
        m8>
        <v-card>

          <v-card-title v-if="selected.length==0">
            {{ items.length + ' ' }} Empleos Registrados
            <v-spacer/>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar"
              single-line
              hide-details/>
          </v-card-title>

          <v-card-title v-if="selected.length > 0">
            {{ selected.length + ' ' }} elementos seleccionados
            <v-spacer/>
            <v-btn 
              v-if="selected.length == 1"
              flat
              @click="editJob()">
              Editar
            </v-btn>
            <v-btn 
              flat
              @click="deleteSelectedJobs()">
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
              <td>{{ '$' + String(props.item[headers[1]["value"]]) }}</td>
              <td>{{ String(props.item[headers[2]["value"]]) }}</td>
              <td>{{ String(props.item.direccion.ciudad) }}</td>
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
            v-for="(job, index) in selected"
            v-if="selected.length !=0"
            :key="index+'-marker-id'"
            :title="job.nombre"
            :position="{lat:Number(job.direccion.latitud), lng:Number(job.direccion.longitud)}"
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

      allJobsURL: apiRoutes[apiMode].allJobsURL,

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
          { text: "Tipo de empleo", value: "tipo" },
          { text: "Oferta Economica", value: "oferta" },
          { text: "Vigencia", value: "vigencia" },
          { text: "Ubicación", value: "direccion.ciudad" }
        ];
      } else if (apiMode === "jsh") {
        return [
          { text: "Tipo de empleo", value: "tipo" },
          { text: "Oferta Economica", value: "oferta" },
          { text: "Vigencia", value: "vigencia" },
          { text: "Ubicación", value: "direccion.ciudad" }
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
    editJob() {
      var selectedID = this.selected[0].id;
      this.$router.push({ name: "editorEmpleo", params: { id: selectedID } });
    },
    deleteSelectedJobs() {
      for (var i = 0; i < this.selected.length; i++) {
        this.deleteJob(this.selected[i].id);
      }

      this.selected = [];
    },
    deleteJob(jobID) {
      axios({
        method: "DELETE",
        url: this.allJobsURL + "/" + jobID
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
      axios({
        method: "GET",
        url: this.allJobsURL
      })
        .then(response => {
          if (apiMode === "testing") {
            //My api needs to projections
            var rawData = response.data.data;
            this.items = rawData;
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
