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
            :items="desserts"
            hide-actions
            item-key="name">
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card flat>
                <v-card-text>Peek-a-boo!</v-card-text>
              </v-card>
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
      ],
      desserts: [
        {
          value: false,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          value: false,
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          value: false,
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          value: false,
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          value: false,
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          value: false,
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          value: false,
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          value: false,
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          value: false,
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          value: false,
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
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
