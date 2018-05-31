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
        class="image-bigger-landing-page"
        xs12>
        <router-link :to="{ name: 'logIn' }">
          <img
            src="../assets/logoJSH.svg"
            class="image-bigger-landing-page">
        </router-link>
      </v-flex>

      <v-flex
        class="image-landing-page"
        xs4>
        <router-link :to="{ name: 'logIn' }">
          <img 
            src="../assets/logoJSH.svg"
            class="image-landing-page">
        </router-link>        
      </v-flex>

      <v-flex
        class="image-landing-page"
        xs4>
        <router-link :to="{ name: 'logIn' }">
          <img 
            src="../assets/logoJSH.svg"
            class="image-landing-page">
        </router-link>
      </v-flex>

      <v-flex
        class="image-landing-page"
        xs4>
        <router-link :to="{ name: 'logIn' }">
          <img 
            src="../assets/logoJSH.svg"
            class="image-landing-page">
        </router-link>
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
  name: "HelloWorld",
  components: {
    toolbarHandler
  },
  data() {
    return {
      username: "Miku",
      password: "xDD",
      msg: "Welcome to Your Vue.js App"
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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
