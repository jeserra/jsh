<template>
  <div>
    <div class="data-visualization-container">
      <p class="module-title">
        <v-icon>account_balance</v-icon>Banco de Alimentos
      </p>
      <div class="table">
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-2">
          <template slot="items" slot-scope="props">
            <td>
              <v-icon v-bind:class="{
                'primary--text':  props.item.habilitado,
                'error--text': !props.item.habilitado
                }">
                fiber_manual_record
              </v-icon>
            </td>
            <td>{{ props.item.nombre }}</td>
            <td>{{ props.item.razonSocial }}</td>
            <td>{{ props.item.region.nombre }}</td>
            <td>{{ props.item.direccion.estado }}</td>
            <td>{{ props.item.direccion.ciudad }}</td>
          </template>
        </v-data-table>
        <ul v-if="errors && errors.length">
          <li v-bind:key="error" v-for="error of errors">
            {{error.message}}
          </li>
        </ul>
      </div>
    </div>

    <v-btn fixed fab bottom right color="primary" :to="{ name: 'nuevoBanco'}">
      <v-icon>add</v-icon>
    </v-btn>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      banksURL: 'http://localhost:5000/api/bancos',
      items: [],
      errors: [],
      headers: [
        { text: 'Estatus', value: 'habilitado', sortable: false },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Razón Social', value: 'razonSocial' },
        { text: 'Región', value: 'region.nombre' },
        { text: 'Estado', value: 'direccion.estado' },
        { text: 'Ciudad', value: 'direccion.ciudad' },
      ],
    };
  },
  created() {
    axios({
      method: 'GET',
      url: this.banksURL,
    }).then((response) => {
      this.items = response.data.data;
      console.log(response.data.data);
    }).catch((e) => {
      this.errors.push(e);
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
