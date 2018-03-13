<template>
  <v-app id="inspire">
    <v-navigation-drawer stateless hide-overlay :mini-variant.sync="mini" v-model="drawer">
      <v-toolbar flat class="transparent" v-on:mouseover="mini = false" v-on:mouseleave="mini = true">

        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <!--
                defaultImage: "./../../static/404.png",
              -->
              <img src="./../static/logoJSH.svg" onerror="your.png">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>JSH</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-toolbar-side-icon></v-toolbar-side-icon>
              </v-btn>
            </v-list-tile-action>

          </v-list-tile>
        </v-list>

      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>


    <v-toolbar color="white" dark fixed app>
      <v-toolbar-side-icon>
        <v-icon dark left>arrow_back</v-icon>
      </v-toolbar-side-icon>
      <!--
      <v-toolbar-title>Application</v-toolbar-title>
    -->
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex text-xs-center>

            <v-tooltip left>
              <v-btn icon large target="_blank" slot="activator">
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>

            La vista del router se verá aqui

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        mini: true,
        right: null
      }
    }
  }
</script>