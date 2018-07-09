<template>
  <v-container
    grid-list-md
    align-center
    align-content-center>

    <toolbar-handler/>
    <v-layout
      row
      wrap>
      
      <v-flex 
        xs6
        class="echarts">
        <report-one/>
      </v-flex>

      <v-flex 
        xs6
        class="echarts">
        <report-two/>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex 
        xs12
        class="echarts">
        <report-three/>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex 
        xs12
        class="echarts">
        <report-four/>
      </v-flex>
    </v-layout>  

    <v-layout>
      <v-flex 
        xs12
        class="echarts">
        <report-five/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import "es6-promise/auto";

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import toolbarHandler from "./toolbars/toolbarHandler";
import reportOne from "./reports/reportOne";
import reportTwo from "./reports/reportTwo";
import reportThree from "./reports/reportThree";
import reportFour from "./reports/reportFour";
import reportFive from "./reports/reportFive";

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
    reportOne,
    reportTwo,
    reportThree,
    reportFour,
    reportFive
  },
  data() {
    return {
      loading: false
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

.echarts {
  height: 400px;
  width: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
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
