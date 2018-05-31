<template>
  <div>
    <v-toolbar
      class="toolbar-container"    
      app>

      <v-toolbar-title class="toolbar-title">{{ _data[keyName].title }}</v-toolbar-title>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="(item, index) in _data[keyName].items"
          :key="'top-toolbar-button-'+index"
          :to="{ name: item.ref }"
          class="toolbar-container toolbar-color"
          active-class="active-button-toolbar"
          flat>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

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
      personas: {
        items: [
          { title: "Trabajadores", ref: "usuarios" },
          { title: "Mentores", ref: "mentores" },
          { title: "Tutores", ref: "tutores" },
          { title: "Beneficiarios", ref: "beneficiarios" },
          { title: "Aliados", ref: "aliados" }
        ],
        title: "Personas"
      },
      activos: {
        items: [
          { title: "Peticiones", ref: "peticiones" },
          { title: "Altas", ref: "altas" },
          { title: "Disponibles", ref: "disponibles" },
          { title: "Asignados", ref: "asignados" }
        ],
        title: "Activos"
      },
      servicios: {
        items: [
          { title: "Consultar", ref: "consultar" },
          { title: "Administrar", ref: "administrar" }
        ],
        title: "Servicios"
      }
    };
  }
};
</script>

<style scoped>
.toolbar-container {
  height: 4em !important;
}

.active-button-toolbar {
  background-color: rgba(150, 150, 150, 0.87);
}

.toolbar-color {
  background-color: rgba(245, 245, 245, 0.87);
}

.toolbar-title {
  margin-left: 5em;
  padding-left: 5em;
  height: 2em !important;

  /*
  border-left: 1px solid rgba(0, 0, 0, 0.16);
  */
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.54);
  font-size: 20px;
  font-weight: 500;
}
</style>
