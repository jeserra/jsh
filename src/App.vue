<template>
  <v-app id="inspire">
    <v-navigation-drawer dark hide-overlay fixed app :mini-variant.sync="mini" v-model="drawer">

      <div v-on:mouseover="mini = false" v-on:mouseleave="mini = true">
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="./../static/logoJSH.svg">
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
          <v-list-tile>
              <v-list-tile-content style="color: gray">
                MÓDULOS
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="(item, index) in items" 
            :key="item.title"
            @click="selectIcon(index)"
            v-bind:class="{ selected: item.active }">

            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list>

      </div>
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

            [componentes dinamicos]
            <router-view></router-view>
            [componentes dinamicos]
            <router-view></router-view>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data (){
      return {
        drawer: true,
        items: [
        //https://material.io/icons/
          { title: 'Inicio', icon: 'home', active: true },
          { title: 'Banco de alimentos', icon: 'account_balance', active: false },
          { title: 'Usuarios', icon: 'account_box', active: false },
        ],
        mini: true,
        right: null
      }    
    },
    methods: {
      selectIcon(index){
        console.log(index);

        for(var i=0; i<this.items.length; i++){
          this.items[i].active = false;
        };

        this.items[index].active = true;
      },
    },
  }
</script>

<style type="text/css">
  .selected{
    background-color: green;
  }
</style>