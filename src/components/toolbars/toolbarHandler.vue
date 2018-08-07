<template>
  <div>
    <v-toolbar
      class="toolbar-container"
      app>

      <v-container>
        <v-flex xs2>
          <v-toolbar-title class="toolbar-title">{{ _data[keyName].title }}</v-toolbar-title>
        </v-flex>

        <v-layout
          row
          justify-center>
          <v-btn
            v-for="(item, index) in _data[keyName].items"
            :key="'top-toolbar-button-'+index"
            :to="{ name: item.ref }"
            class="toolbar-button"
            flat
            active-class="toolbar-button active-button-toolbar">
            {{ item.title }}
          </v-btn>
        </v-layout>
      </v-container>

    </v-toolbar>
  </div>
</template>

<script>
export default {
  props: {
    keyName: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      default: {
        items: [],
        title: "Dashboard"
      },
      reportes: {
        items: [
          { title: "Impacto", ref: "inicio" },
          { title: "Intermedio", ref: "dashboardIntermedio" },
          { title: "Proceso", ref: "dashboardProceso" }
        ],
        title: "Dashboard"
      },
      bancos: {
        items: [],
        title: "Bancos"
      },
      centros: {
        items: [],
        title: "Centros"
      },
      grupos: {
        items: [
          { title: "Pasados", ref: "gruposPasados" },
          { title: "Actuales", ref: "gruposActuales" }
        ],
        title: "Grupos"
      },
      personas: {
        items: [
          { title: "Trabajadores", ref: "usuarios" },
          { title: "Mentores", ref: "mentores" },
          { title: "Familias", ref: "familias" },
          { title: "Aliados", ref: "aliados" },
          { title: "Tutores", ref: "tutores" }
        ],
        title: "Personas"
      },
      servicios: {
        items: [],
        title: "Servicios"
      },
      empleos: {
        items: [],
        title: "Empleos"
      },
      activos: {
        items: [
          { title: "Peticiones", ref: "peticiones" },
          { title: "Altas", ref: "altas" },
          { title: "Disponibles", ref: "disponibles" },
          { title: "Asignados", ref: "asignados" }
        ],
        title: "Activos"
      }
    };
  }
};
</script>

<style scoped>
.toolbar-container {
  height: 4em !important;
}

.toolbar-color {
  background-color: rgba(245, 245, 245, 0.87);
}

.toolbar-title {
  margin-top: -0.2em;
  height: 2em !important;

  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.54);
  font-size: 20px;
}

.toolbar-button {
  margin-top: -3.7em;
  height: 4em !important;
  width: 160px;
  color: rgba(0, 0, 0, 0.64);
  background-color: rgba(245, 245, 245, 0.87) !important;
}

.toolbar-button :hover {
  background-color: rgba(245, 245, 245, 0.87) !important;
}

.active-button-toolbar {
  color: rgba(0, 0, 0, 1);
  border-bottom: 2px solid rgba(71, 147, 89, 1);
}
</style>
