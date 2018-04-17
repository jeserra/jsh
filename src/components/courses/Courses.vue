<template>
  <v-container grid-list-xl>
      <toolbar-handler/>
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
                    hide-details
                />
              </v-card-title>
          </v-card>
          </v-flex>
      </v-layout>
  </v-container>            
      
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      coursesURL: "http://localhost:5000/api/cursos",
      loading: true,
      search: "",
      items: [],
      markers: [],
      errors: [],
      headers: [
        { text: "Estatus", value: "habilitado", sortable: false },
        { text: "Nombre", value: "nombre" },
        { text: "Fecha de Inicio", value: "fecha_inicio" },
        { text: "Ciudad", value: "direccion.ciudad" }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "GET",
        url: this.coursesURL
      })
        .then(response => {
          this.items = response.data.data;
          this.loading = false;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>
