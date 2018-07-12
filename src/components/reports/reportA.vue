<template>
  <div
    class="grey lighten-3">

    <v-card style="height:100%">

      <v-layout row>
        <v-flex 
          xs12
          class="graph-title-margin-left graph-title-margin-top">
          <h5 style="color:gray">{{ title }}</h5>
        </v-flex>

        <v-flex
          xs2
          class="graph-title-margin-top">
          <v-icon            
            class="clickable-element"
            @click="optionsButton()">
            more_vert
          </v-icon>
        </v-flex>
      </v-layout>

      <v-layout>

        <v-flex
          xs12
          class="graph-title-margin-left">
          <b><font size="5">{{ value }}%</font></b>
          <br>
          <h5 style="color:gray">Meta {{ goalValue }}</h5>
        </v-flex>        
      </v-layout>

      <v-layout>
        <v-flex
          xs12
          class="graph-title-margin-left">
          <v-progress-linear
            v-model="value"
            class="progress-bar-width"/>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex
          xs12
          class="graph-title-margin-left">
          <v-btn
            flat
            color="green">
            Ver reporte
          </v-btn>
        </v-flex>
      </v-layout>

    </v-card>
  </div>
</template>

<script>
import IEcharts from "vue-echarts-v3/src/full.js";

export default {
  components: {
    IEcharts
  },
  data() {
    return {
      loading: false,
      value: "70",
      goalValue: "90%",
      title: "Tres veces encima de línea de bienestar"
    };
  },
  methods: {
    updateButton() {
      console.log("update");
    }
  }
};
</script>

<style scoped>
.graph-title-margin-left {
  margin-left: 1em;
}

.graph-title-margin-top {
  margin-top: 1em;
}

.graph-container {
  width: 100%;
  height: 20em;
}

.clickable-element {
  cursor: pointer;
}

.progress-bar-width {
  width: 95%;
}
</style>
