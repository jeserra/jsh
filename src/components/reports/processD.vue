<template>
  <div
    class="grey lighten-3">

    <v-card style="height:100%">

      <v-layout row>
        <v-flex 
          xs12
          class="graph-title-margin-left graph-title-margin-top">
          <b>{{ title }}</b>
          <br>
          <v-layout
            row
            align-center>
            <star-rating 
              :star-size="16" 
              :read-only="true" 
              :max-rating="5"
              :increment="0.01" 
              :show-rating="false" 
              :rating="stars"
              active-color="green"
              class="stars-margin-left"
            />  {{ stars }} ({{ totalVotes }})
          </v-layout>
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

      <v-layout
        align-center
        row>

        <v-flex
          align-content-center
          text-xs-center
          xs6>
          <b><font size="7">{{ valueA }}</font></b>/{{ totalA }}
          <br>
          <font size="3">{{ descriptionA }}</font>
        </v-flex>

        <v-flex
          align-content-center
          text-xs-center
          xs6>
          <b><font size="7">{{ valueB }}</font></b>/{{ totalB }}
          <br>
          <font size="3">{{ descriptionB }}</font>
        </v-flex>
      </v-layout>

    </v-card>
  </div>
</template>

<script>
import IEcharts from "vue-echarts-v3/src/full.js";
import StarRating from "vue-star-rating";

export default {
  components: {
    IEcharts,
    StarRating
  },
  data() {
    return {
      loading: false,
      title: "Cuenta Ahorro",
      stars: 4.5,
      totalVotes: 100,

      descriptionA: "Atendidos",
      valueA: "40",
      totalA: "40",

      descriptionB: "Asistencia",
      valueB: "40",
      totalB: "40"
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

.stars-margin-left {
  margin-left: 0.4em;
}

.clickable-element {
  cursor: pointer;
}

.progress-bar-width {
  width: 95%;
}
</style>
