<template>
  <v-container>

    <toolbarHandler      
      :key-name="'bancos'"/>

    <v-layout 
      row
      wrap
      fluid>
      <v-flex 
        xs12 
        m10  
        offset-xs0 
        offset-md1>
        <v-card>

          <v-card-title>
            <v-icon>account_balance</v-icon>Banco de Alimentos
            <v-spacer/>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar"
              single-line
              hide-details/>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            :loading="loading"
            item-key="nombre"
            class="elevation-2">

            <template
              slot="items" 
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>
                  <v-icon 
                    :class="{
                      'primary--text': props.item.habilitado,
                      'error--text': !props.item.habilitado
                  }">
                    fiber_manual_record
                  </v-icon>
                </td>
                <td>{{ props.item.nombre }}</td>
                <td>{{ props.item.region.nombre }}</td>
                <td>{{ props.item.direccion.estado }}</td>
                <td>{{ props.item.direccion.ciudad }}</td>
              </tr>
            </template>

            <template 
              slot="expand" 
              slot-scope="props">
              <v-container 
                fluid 
                justify-space-between
                grid-list-lg>
                <v-layout 
                  row 
                  wrap>
                  <v-flex 
                    xs12
                    lg6>
                    <v-list two-line>

                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ props.item.razonSocial }}</v-list-tile-title>
                          <v-list-tile-sub-title>Razón Social</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            <star-rating
                              :star-size="20"
                              :read-only="true"
                              :max-rating="5"
                              :increment="0.01"
                              :show-rating="false"
                              :rating="props.item.calificacion * 1/20"
                            />
                          </v-list-tile-title>
                          <v-list-tile-sub-title>Calificación</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            {{ props.item.region.nombre }}
                          </v-list-tile-title>
                          <v-list-tile-sub-title>Región</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            {{ props.item.fechaRegistro | moment("calendar") }}
                          </v-list-tile-title>
                          <v-list-tile-sub-title>Fecha de Registro</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>

                  <v-flex 
                    xs12
                    lg6>
                    <gmap-map
                      :center="{lat:Number(props.item.direccion.latitud), lng:Number(props.item.direccion.longitud)}"
                      :zoom="14"
                      map-type-id="roadmap"
                      style="width: 400px; height: 250px">

                      <gmap-marker
                        :position="{lat:Number(props.item.direccion.latitud), lng:Number(props.item.direccion.longitud)}"
                        :clickable="true"
                        :draggable="true"/>
                    </gmap-map>
                    
                    <blockquote class="subheading grey--text py-3" >
                      {{ props.item.direccion.Calle }} 
                      #{{ props.item.direccion.Numero }}. 
                      {{ props.item.direccion.Ciudad }},
                      {{ props.item.direccion.Estado }}.</blockquote>
                  </v-flex>
                </v-layout>
                
                <div class="text-xs-center">
                  <v-btn
                    outline 
                    color="error">Eliminar</v-btn>
                  <v-btn 
                    :to="{ name: 'editorBanco', params: { id: props.item.IDBancoAlimentos }}"
                    outline 
                    color="success">Editar</v-btn>
                </div>
              
              </v-container>
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
        <v-btn 
          :to="{ name: 'nuevoBanco' }"
          fixed 
          fab 
          bottom 
          right 
          color="primary">
          <v-icon>add</v-icon>
        </v-btn>

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
      allBanksURL: apiRoutes[apiMode].allBanksURL,
      addressesURL: apiRoutes[apiMode].addressesURL,
      regionsURL: apiRoutes[apiMode].regionsURL,

      loading: true,
      search: "",
      Rawitems: [],
      items: [],
      markers: [],
      errors: [],
      headers: [
        { text: "Estatus", value: "habilitado", sortable: false },
        { text: "Nombre", value: "nombre" },
        { text: "Región", value: "region.nombre" },
        { text: "Estado", value: "direccion.estado" },
        { text: "Ciudad", value: "direccion.ciudad" }
      ]
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
      var callbackFunctions = [this.getRegion];

      for (var bank of this.Rawitems) {
        bank["Calificacion"] = Number(bank["Calificacion"]);
        this.getAddress(bank, callbackFunctions);
      }
    },
    getData() {
      axios({
        method: "GET",
        url: this.allBanksURL,
        contentType: "application/x-www-form-urlencoded"
      })
        .then(response => {
          if (apiMode === "testing") {
            //My api needs to projections
            var rawData = response.data.data;
            this.Rawitems = rawData;
            this.initializeData();
          } else {
            //Api from amdocs has projections
            var rawData = response.data._embedded.bancoalimentos;
            this.items = rawData;
          }
        })
        .catch(e => {
          console.log(e);
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

          var latNumber = Number(bank["Direccion"]["Latitud"]);
          var lonNumber = Number(bank["Direccion"]["Longitud"]);

          bank["Direccion"]["Latitud"] = latNumber;
          bank["Direccion"]["Longitud"] = lonNumber;
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
          this.items.push(bank);
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>
