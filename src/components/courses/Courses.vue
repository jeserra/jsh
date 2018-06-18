<template>
  <v-container>

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
            <v-icon>assignment</v-icon>Cursos
            <v-spacer/>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            :loading="loading"
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
                <td>{{ props.item.patrocinado }}</td>
                <td>{{ props.item.descripcion }}</td>
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
                          <v-list-tile-title>{{ props.item.impartido }}</v-list-tile-title>
                          <v-list-tile-sub-title>Impartido por</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            {{ props.item.centro_com }}
                          </v-list-tile-title>
                          <v-list-tile-sub-title>Región</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            {{ props.item.fechaCurso | moment("calendar") }}
                          </v-list-tile-title>
                          <v-list-tile-sub-title>Fecha de Curso</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex 
                    xs12
                    lg6>
                    <gmap-map
                      :center="{lat:props.item.direccion.latitude, lng:props.item.direccion.longitud}"
                      :zoom="14"
                      map-type-id="roadmap"
                      style="width: 400px; height: 250px"
                    >
                      <gmap-marker
                        :position="{lat:props.item.direccion.latitude, lng:props.item.direccion.longitud}"
                        :clickable="true"
                        :draggable="true"
                      />
                    </gmap-map>
                    <blockquote class="subheading grey--text py-3" >
                      {{ props.item.direccion.calle }} 
                      #{{ props.item.direccion.numero }}. 
                      {{ props.item.direccion.ciudad }},
                      {{ props.item.direccion.estado }}.</blockquote>
                  </v-flex>
                </v-layout>
                
                <div class="text-xs-center">
                  <v-btn
                    outline 
                    color="error">Eliminar</v-btn>
                  <v-btn 
                    :to="{ name: 'editorCursos', params: { id: props.item.id }}"
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
          :to="{ name: 'nuevoCurso' }"
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
      coursesURL: "http://localhost:5000/api/curso",
      loading: true,
      search: "",
      items: [],
      markers: [],
      errors: [],
      headers: [
        { text: "Estatus", value: "habilitado", sortable: false },
        { text: "Nombre", value: "nombre" },
        { text: "Patrocinado", value: "patrocinado" },
        { text: "Descripcion", value: "descripcion" }
      ]
    };
  },
  watch: {
    $route(to, from) {
      // Call resizePreserveCenter() on all maps
      Vue.$gmapDefaultResizeBus.$emit("resize");
    }
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