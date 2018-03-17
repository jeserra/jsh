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
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.nombre }}</td>
              <td>{{ props.item.tipoUsuario.tipo }}</td>
              <td>{{ props.item.curso.nombre }}</td>
              <td>{{ props.item.grupo }}</td>
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
                        <v-list-tile-title>
                          {{props.item.nombre}}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>{{ props.item.tipoUsuario.tipo }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          Grupo
                        </v-list-tile-title>
                        <v-list-tile-sub-title>{{ props.item.grupo }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          Último inicio de sesión
                        </v-list-tile-title>
                        <v-list-tile-sub-title>{{ props.item.ultimoLogin | moment("calendar")}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                  </v-list>
                </v-flex>

                <v-flex 
                  xs12
                  lg6>
                  <v-list three-line>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          Curso: {{ props.item.curso.nombre}}
                        </v-list-tile-title>
                        <v-list-tile-sub-title v-if="props.item.curso.calificacion">
                          Calificación: {{ props.item.curso.calificacion}}/10
                        </v-list-tile-sub-title>
                        <v-list-tile-sub-title v-if="props.item.curso.descripcion">
                          Descripción: {{ props.item.curso.descripcion}}
                        </v-list-tile-sub-title>
                        <v-list-tile-sub-title v-if="props.item.curso.observaciones">
                          Observaciones: {{ props.item.curso.observaciones}}
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          Dirección
                        </v-list-tile-title>
                        <v-list-tile-sub-title>{{ props.item.direccion.estado }} </v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ props.item.direccion.ciudad }} </v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ props.item.direccion.cp }} </v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ props.item.direccion.calle }} </v-list-tile-sub-title>                        
                      </v-list-tile-content>                      
                    </v-list-tile>

                  </v-list>
                </v-flex>
              </v-layout>
              
              <div class="text-xs-center">
                <v-btn
                  outline 
                  color="error">Eliminar</v-btn>
                <v-btn 
                  :to="{ name: 'editorUsuario', params: { id: props.item.id }}"
                  outline 
                  color="success">Editar</v-btn>
              </div>
            
            </v-container>
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