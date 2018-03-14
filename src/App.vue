<template>
  <v-app id="inspire">
    <v-navigation-drawer hide-overlay fixed app :mini-variant.sync="mini" v-model="drawer">
      <div >
      <!-- <div v-on:mouseover="mini = false" v-on:mouseleave="mini = true"> -->
        <v-toolbar flat >
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="./assets/logoJSH.svg">
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
              <v-list-tile-content >
                MÓDULOS
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="(item, index) in items"
            :key="item.title"
            @click="selectIcon(index)"
            :to="item.ref">

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


    <v-toolbar fixed app>
      <v-toolbar-side-icon v-if="mini" @click.native.stop="mini = !mini"></v-toolbar-side-icon>
    </v-toolbar>

    <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        // https://material.io/icons/
        { title: 'Inicio', icon: 'home', active: true, ref: 'inicio' },
        {
          title: 'Banco de alimentos',
          icon: 'account_balance',
          active: false,
          ref: 'bancos',
        },
        {
          title: 'Usuarios',
          icon: 'account_box',
          active: false,
          ref: 'usuarios',
        },
      ],
      mini: true,
      right: null,
    };
  },
  methods: {
    selectIcon(index) {
      let i;
      for (i = 0; i < this.items.length; i += 1) {
        this.items[i].active = false;
      }

      this.items[index].active = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/css">

</style>
