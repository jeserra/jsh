<template>
  <div
    class="grey lighten-3">

    <v-card style="height:100%">

      <v-layout row>
        <v-flex 
          xs12
          class="graph-title-margin-left graph-title-margin-top">
          {{ title }}
          <h5 style="color:gray">Calculado el 10/12/16</h5>
        </v-flex>

        <v-flex
          xs2
          class="graph-title-margin-top">
          <v-icon            
            class="clickable-element"
            @click="updateButton()">
            update
          </v-icon>
          <v-icon            
            class="clickable-element"
            @click="optionsButton()">
            more_vert
          </v-icon>
        </v-flex>
      </v-layout>

      <div class="graph-container">
        <IEcharts
          :option="bar"
          :loading="loading"
          @ready="onReady"
          @click="onClick"/>
      </div>
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
      title: "Titulo del card 2",
      bar: {
        tooltip: {},
        xAxis: {
          data: [
            "Shirt",
            "Sweater",
            "Chiffon Shirt",
            "Pants",
            "High Heels",
            "Socks"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "Sales",
            type: "line",
            color: "#9b51e0",
            areaStyle: {
              color: "#efe3fa"
            },
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  methods: {
    updateButton() {
      console.log("update");
    },
    optionsButton() {
      console.log("options");
    },
    onReady(instance, ECharts) {
      //console.log(instance, ECharts);
    },
    onClick(event, instance, ECharts) {
      //console.log(arguments);
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
