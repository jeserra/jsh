<template>
  <v-container
    grid-list-md
    align-center
    align-content-center>

    <toolbarHandler      
      :key-name="'reportes'"/>

    <v-layout
      row
      align-center
      justify-space-between>

      <v-container xs8>
        <v-layout
          justify-center
          row
          white>

          <v-flex>
            <fieldset>
              <legend>Comunidad</legend>
              <v-select
                v-model="selectCommunities"
                :items="itemsCommunities"
                solo/>
            </fieldset>
          </v-flex>

          <v-flex>
            <fieldset>
              <legend>Muestra</legend>
              <v-select
                v-model="selectSample"
                :items="itemsSample"
                solo/>
            </fieldset>
          </v-flex>

          <v-flex>
            <fieldset>
              <legend>Tiempo en el modelo</legend>
              <v-select
                v-model="selectTime"
                :items="itemsTime"
                solo/>
            </fieldset>
          </v-flex>

        </v-layout>
      </v-container>

      <v-container xs4>
        <v-layout
          justify-center
          row
          white>

          <v-flex>
            <fieldset>
              <legend>Fecha inicial</legend>
              <v-select
                v-model="selectInitialDate"
                :items="itemsInitialDate"
                solo/>
            </fieldset>
          </v-flex>

          <v-flex>
            <fieldset>
              <legend>Fecha final</legend>
              <v-select
                v-model="selectEndDate"
                :items="itemsEndDate"
                solo/>
            </fieldset>
          </v-flex>

        </v-layout>
      </v-container>
    </v-layout>

    <v-layout
      row
      wrap
      style="margin-top:1em">

      <v-flex 
        xs3
        class="simple-report">
        <process-A/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-B/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-C/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-D/>
      </v-flex>

    </v-layout>

    <v-layout
      row
      wrap
      style="margin-top:7em">

      <v-flex 
        xs3
        class="simple-report">
        <process-A/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-B/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-C/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-D/>
      </v-flex>

    </v-layout>

    <v-layout
      row
      wrap
      style="margin-top:7em">

      <v-flex 
        xs3
        class="simple-report">
        <process-A/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-B/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-C/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-D/>
      </v-flex>

    </v-layout>

    <v-layout
      row
      wrap
      style="margin-top:7em">

      <v-flex 
        xs3
        class="simple-report">
        <process-A/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-B/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-C/>
      </v-flex>

      <v-flex 
        xs3
        class="simple-report">
        <process-D/>
      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
import "es6-promise/auto";

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import toolbarHandler from "../toolbars/toolbarHandler";

import processA from "../reports/processA";
import processB from "../reports/processB";
import processC from "../reports/processC";
import processD from "../reports/processD";

const store = new Vuex.Store({
  state: {
    count: 0,
    message: "Hello from Vuex"
  },
  getters: {
    count(state) {
      return state.count;
    },
    message(state) {
      return state.message.toUpperCase();
    }
  },
  mutations: {
    increment(state) {
      state.count++;
      return state.count;
    },
    decrement(state) {
      state.count--;
      return state.count;
    }
  }
});

export default {
  components: {
    toolbarHandler,
    processA,
    processB,
    processC,
    processD
  },
  data() {
    return {
      loading: false,

      selectCommunities: undefined,
      itemsCommunities: ["Todas"],

      selectSample: undefined,
      itemsSample: ["Inscritos"],

      selectTime: undefined,
      itemsTime: ["18 meses"],

      selectInitialDate: undefined,
      itemsInitialDate: ["Fecha inicial"],

      selectEndDate: undefined,
      itemsEndDate: ["Fecha final"]
    };
  },
  computed: {
    count() {
      return store.state.count;
    },
    message() {
      return store.getters.message;
    }
  },
  methods: {
    increment() {
      store.commit("increment");
      console.log(this.count);
    },
    decrement() {
      store.commit("decrement");
    },
    login: function() {
      const { username, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

.simple-report {
  height: 90px;
}

.echarts {
  height: 365px;
  width: 100%;
}

.image-landing-page {
  height: 20em !important;
  max-height: 20em !important;
}

.image-bigger-landing-page {
  height: 30em !important;
  max-height: 30em !important;
}
</style>
