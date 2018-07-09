<template>
  <div
    class="grey lighten-3">

    <v-card style="height:100%">
      <v-layout>
        <v-flex xs2>
          
          <v-container
            grid-list-md
            align-center
            text-xs-center>

            <v-icon
              class="clickable-element"
              x-large
              @click="updateButton()">
              update
            </v-icon>
            
          </v-container>
        </v-flex>

        <v-flex xs12>
          <b><font size="5">{{ value }}</font></b> {{ title }}
          <br>
          {{ description }}
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
      value: "80%",
      title: "Beneficiarios",
      description: "Encima de 3x linea de bienestar"
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
</style>
