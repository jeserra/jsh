<template>
 <v-container grid-list-xl >
    <v-layout row wrap fluid>
      <v-flex xs12 m10 lg8 offset-xs0 offset-md1 offset-lg2>
        <div class="data-visualization-container">
          <p class="module-title">
            <v-icon>account_balance</v-icon>Banco de Alimentos
          </p>
          <div class="table">
            <v-data-table
              :headers="headers"
              :items="items"
              :loading="loading"
              class="elevation-2">
              <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                  <td>
                    <v-icon v-bind:class="{
                      'primary--text':  props.item.habilitado,
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
              <template slot="expand" slot-scope="props">
                  <v-container fluid grid-list-lg>
                    <v-layout row wrap>
                      <v-flex xs12>
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
                                  :increment="0.01"
                                  :show-rating="false"
                                  v-model="props.item.calificacion"
                                ></star-rating>
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
                    </v-layout>
                  </v-container>
              </template>

              <template slot="no-data">
                <v-alert :value="true" outline color="grey" icon="info">
                  No hay datos disponibles
                </v-alert>
              </template>
            </v-data-table>
          </div>
        </div>
        <v-btn fixed fab bottom right color="primary" :to="'/nuevo-banco'">
          <v-icon>add</v-icon>
        </v-btn>

      </v-flex>
    </v-layout>
 </v-container>
</template>

<script>
import axios from 'axios';
import StarRating from 'vue-star-rating';

export default {
  data() {
    return {
      banksURL: 'http://localhost:5000/api/bancos',
      loading: true,
      items: [],
      errors: [],
      headers: [
        { text: 'Estatus', value: 'habilitado', sortable: false },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Región', value: 'region.nombre' },
        { text: 'Estado', value: 'direccion.estado' },
        { text: 'Ciudad', value: 'direccion.ciudad' },
      ],
    };
  },
  components: {
    StarRating,
  },
  created() {
    axios({
      method: 'GET',
      url: this.banksURL,
    })
      .then((response) => {
        this.items = response.data.data;
        this.loading = false;
      })
      .catch((e) => {
        this.errors.push(e);
        console.log(this.errors);
      });
  },
  // methods: {
  //   getBanksInformation: () => {
  //     this.dataUrl = this.banksURL;
  //   },
  //   loadData: () => {
  //     axios({
  //       method: 'GET',
  //       url: this.dataUrl,
  //     }).then(
  //       function(result) {
  //         console.log(result);
  //         const rawData = result.request.response;
  //         const parsedData = JSON.parse(rawData);
  //         var cleanData = parsedData.data;
  //         var dataKeys = [];

  //         var showAs = ['Nombre', 'Región', 'Estado', 'Ciudad'];
  //         var valuesToRecover = [
  //           'nombre',
  //           ['region', 'nombre'],
  //           ['direccion', 'estado'],
  //           ['direccion', 'ciudad'],
  //         ];

  //         if (showAs.length != valuesToRecover.length) {
  //           return "ERROR: Arrays 'showAs'
  // and 'valuesToRecover' in method loadData() have different sizes";
  //         }

  //         this.data = [];
  //         this.columnNames = showAs;

  //         for (var i = 0; i < cleanData.length; i++) {
  //           var elementInArray = cleanData[i];
  //           var newBank = {};
  //           for (var j = 0; j < valuesToRecover.length; j++) {
  //             var key = valuesToRecover[j];
  //             var saveKeyAs = showAs[j];
  //             //Recover value
  //             if (key instanceof Array) {
  //               var value = elementInArray[key[0]][key[1]];
  //             } else {
  //               var value = elementInArray[key];
  //             }

  //             newBank[saveKeyAs] = value;
  //           }
  //           this.data.push(newBank);
  //         }
  //       },
  //       error => {
  //         console.error(error);
  //       }
  //     );
  //   },
  // },
  // mounted: function() {
  //   this.getBanksInformation();
  //   this.loadData();
  // },
  // watch: {
  //   dataUrl: function() {
  //     this.data = [];

  //     this.loadData();
  //   },
  // },
};
</script>

<style type="text/css">
.module-title {
  text-align: left !important;
}

.table {
  width: 90%;
}

.data-visualization-container {
  margin-left: 5%;
}
</style>
