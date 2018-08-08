<template>
  <v-container>

    <toolbarHandler      
      :key-name="'personas'"/>

    <v-layout
      row
      justify-center>

      <v-flex 
        xs10
        m8>
        <v-card>

          <v-card-title v-if="selected.length==0">
            {{ items.length + ' ' }} Familias
            <v-spacer/>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar"
              single-line
              hide-details/>

            <router-link
              :to="{ name:'creadorFamilia' }">
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
              @click="editFamilia()">
              Editar
            </v-btn>
            <v-btn 
              flat
              @click="deleteSelectedItem()">
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
              <td>{{ String(props.item[headers[4]["value"]]) }}</td>
              <td>{{ String(props.item[headers[5]["value"]]) }}</td>
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

    </v-layout>
  </v-container>
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

      allFamiliasURL: apiRoutes[apiMode].allFamiliasURL,

      loading: true,
      search: "",
      selected: [],

      Rawitems: [],
      items: [],
      markers: [],
      errors: []
    };
  },
  computed: {
    headers: function() {
      console.log("El API seleccionado será " + apiMode);
      if (apiMode === "testing") {
        return [
          { text: "Apellido", value: "apellido" },
          { text: "ID", value: "id" },
          { text: "Representante", value: "representante" },
          { text: "Integrantes", value: "integrantes" },
          { text: "Comunidad", value: "comunidad" },
          { text: "Contacto", value: "contacto" }
        ];
      } else if (apiMode === "jsh") {
        return [
          { text: "Apellido", value: "apellido" },
          { text: "ID", value: "id" },
          { text: "Representante", value: "representante" },
          { text: "Integrantes", value: "integrantes" },
          { text: "Comunidad", value: "comunidad" },
          { text: "Contacto", value: "contacto" }
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
    editFamilia() {
      var selectedID = this.selected[0].id;
      this.$router.push({ name: "editorFamilia", params: { id: selectedID } });
    },
    deleteSelectedItem() {
      for (var i = 0; i < this.selected.length; i++) {
        this.deleteItem(this.selected[i].id);
      }

      this.selected = [];
    },
    deleteItem(jobID) {
      axios({
        method: "DELETE",
        url: this.allFamiliasURL + "/" + jobID
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
        url: this.allFamiliasURL
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
