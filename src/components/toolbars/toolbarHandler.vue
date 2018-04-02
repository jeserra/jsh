<template>
  <div>
    <v-toolbar
      class="toolbar-container"    
      app>

      <v-toolbar-title class="toolbar-title">{{ title }}</v-toolbar-title>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="(item, index) in items"
          :key="'top-toolbar-button-'+index"
          :to="{ name: item.ref }"
          class="toolbar-container white"
          flat>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["items", "title"]
};
</script>

<style scoped>
.toolbar-container {
  height: 4em !important;
}

.toolbar-title {
  margin-left: 3em;
  padding-left: 3em;
  height: 2em !important;

  border-left: 1px solid rgba(0, 0, 0, 0.16);
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.54);
  font-size: 20px;
  font-weight: 500;
}
</style>
