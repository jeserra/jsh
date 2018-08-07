<template>
  <div
    class="grey lighten-3">

    <v-card
      :class="'color-border-'+color">

      <v-layout 
        row>
        <v-flex 
          xs12
          class="graph-title-margin-left graph-title-margin-top">
          {{ title }}
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

      <v-divider/>



      <v-layout
        class="container-height"
        align-center 
        justify-center 
        fill-height
        row>

        <v-flex
          xs12
          text-xs-center>
          <font size="6">{{ value }}</font>
          <font
            style="color:lightgray"
            size="2">/{{ goalValue }}</font>
          <br>
          <font
            size="2"
            style="color:gray">
            {{ description }}
          </font>
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
      title: "Línea de bienestar",
      description: "Familias 3x por encima",
      color: "orange"
    };
  },
  methods: {
    optionsButton() {
      console.log("options");
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

.clickable-element {
  cursor: pointer;
}

.color-border-gray {
  border-bottom: 1px solid rgb(100, 100, 100, 0.2);
}

.container-height {
  height: 10em;
}

.color-border-green {
  width: 90% !important;
  border-bottom: 4px solid rgba(71, 147, 89, 1);
}

.color-border-orange {
  width: 90% !important;
  border-bottom: 4px solid rgba(242, 153, 74, 1);
}
</style>
