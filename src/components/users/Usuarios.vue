<template>
  <div>

    <div class="data-visualization-container">
      <p class="module-title">
        <v-icon>account_balance</v-icon>Usuarios
      </p>
      <div class="table">
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-2">
          <template slot="items" slot-scope="props">
            <tr v-on:click="editItem(props.item)">
              <td>{{ props.item.nombre }}</td>
              <td>{{ props.item.tipoUsuario.tipo }}</td>
              <td>{{ props.item.curso.nombre }}</td>
              <td>{{ props.item.grupo }}</td>
              <td>{{ props.item.direccion.ciudad }}</td>
            </tr>
          </template>
        </v-data-table>
        <ul v-if="errors && errors.length">
          <li v-bind:key="error" v-for="error of errors">
            {{error.message}}
          </li>
        </ul>
      </div>
    </div>

    <v-btn fixed fab bottom right color="primary" :to="{ name: 'nuevoUsuario'}">
      <v-icon>add</v-icon>
    </v-btn>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usersURL: "http://localhost:5000/api/usuarios",
      items: [],
      errors: [],
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Tipo", value: "tipoUsuario.tipo" },
        { text: "Curso Social", value: "curso.nombre" },
        { text: "Grupo", value: "grupo" },
        { text: "Ciudad", value: "direccion.ciudad" }
      ]
    };
  },
  methods: {
    getData() {
      axios({
        method: "GET",
        url: this.usersURL
      })
        .then(response => {
          this.items = response.data.data;
          //console.log(response.data.data);
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    editItem(item) {
      console.log(this._routerRoot);
      //:to="{ name: 'editorUsuario', params: { id: item.id }}"
      this._routerRoot._router.push({
        name: "editorUsuario",
        params: { id: item.id }
      });
    }
  },
  created() {
    this.getData();
  }
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