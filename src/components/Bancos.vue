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
    <v-btn fixed fab bottom right color="primary">
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
