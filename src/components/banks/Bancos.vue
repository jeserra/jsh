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
            item-key="IDBancoAlimentos"
            class="elevation-2">

            <template
              slot="items" 
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>
                  <v-icon 
                    :class="{
                      'primary--text': props.item.Habilitado,
                      'error--text': !props.item.Habilitado
                  }">
                    fiber_manual_record
                  </v-icon>
                </td>
                <td>{{ props.item.Nombre }}</td>
                <td>{{ props.item.Region.Nombre }}</td>
                <td>{{ props.item.Direccion.Estado }}</td>
                <td>{{ props.item.Direccion.Ciudad }}</td>
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
                          <v-list-tile-title>{{ props.item.RazonSocial }}</v-list-tile-title>
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
                              :rating="props.item.Calificacion * 1/20"
                            />
                          </v-list-tile-title>
                          <v-list-tile-sub-title>Calificación</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            {{ props.item.Region.Nombre }}
                          </v-list-tile-title>
                          <v-list-tile-sub-title>Región</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            {{ props.item.FechaRegistro | moment("calendar") }}
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
                      :center="{lat:props.item.Direccion.Latitud, lng:props.item.Direccion.Longitud}"
                      :zoom="14"
                      map-type-id="roadmap"
                      style="width: 400px; height: 250px">

                      <gmap-marker
                        :position="{lat:props.item.Direccion.Latitud, lng:props.item.Direccion.Longitud}"
                        :clickable="true"
                        :draggable="true"/>
                    </gmap-map>
                    
                    <blockquote class="subheading grey--text py-3" >
                      {{ props.item.Direccion.Calle }} 
                      #{{ props.item.Direccion.Numero }}. 
                      {{ props.item.Direccion.Ciudad }},
                      {{ props.item.Direccion.Estado }}.</blockquote>
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

export default {
  components: {
    StarRating,
    toolbarHandler
  },
  data() {
    return {
      banksURL: "http://localhost:5000/api/all/bancoalimentos",
      addressesURL: "http://localhost:5000/api/direccion/IDDireccion",
      regionsURL: "http://localhost:5000/api/region/IDRegion",

      loading: true,
      search: "",
      Rawitems: [],
      items: [],
      markers: [],
      errors: [],
      headers: [
        { text: "Estatus", value: "Habilitado", sortable: false },
        { text: "Nombre", value: "Nombre" },
        { text: "Región", value: "Region.Nombre" },
        { text: "Estado", value: "Direccion.Estado" },
        { text: "Ciudad", value: "Direccion.Ciudad" }
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
        url: this.banksURL
      })
        .then(response => {
          var rawData = response.data.data;
          this.Rawitems = rawData;
          this.initializeData();
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
