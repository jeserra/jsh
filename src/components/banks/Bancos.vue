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
  methods:{
    getData(){
      axios({
        method: 'GET',
        url: this.banksURL,
      }).then((response) => {
        this.items = response.data.data;
        console.log(response.data.data);
      }).catch((e) => {
        this.errors.push(e);
      });
    }
  },
  created() {
    this.getData();
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
};
</script>

<style scoped type="text/css">
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
