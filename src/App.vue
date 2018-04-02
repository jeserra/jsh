<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="drawerIsMini" 
      hide-overlay
      width="160"
      mini-variant-width="160"
      class="transparent"
      fixed
      floating
      app>
      <div>
        <div class="title-app">
          <v-btn 
            icon 
            @click.native.stop="drawerIsMini = !drawerIsMini">
            <v-toolbar-side-icon/>
          </v-btn>
          JSH MMT
        </div>

        <v-list-tile-content>
          <v-list
            class="gray elevation-6 pt-4">

            <v-list-tile-avatar> 
              <img src="./assets/logoJSH.svg"> 
            </v-list-tile-avatar>
            JSH
            <br>
            JSH@testing.gg

            <v-divider/>

            <v-list-tile
              v-for="(item, index) in items"
              :to="{ name: item.ref }"
              :key="item.title"
              @click="selectIcon(index)">
              <v-list-tile-action>

                <v-container
                  grid-list-md
                  align-center
                  text-xs-center>
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      xs12
                      class="text-in-left-nav-menu">
                      <v-icon>{{ item.icon }}</v-icon>
                      {{ item.title }}
                    </v-flex>
                  </v-layout>
                </v-container>

              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-list-tile-content>

      </div>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-if="drawerIsMini"
      v-model="drawer"
      :mini-variant.sync="sidebarDrawerIsMini" 
      hide-overlay
      mini-variant-width="80"
      class="transparent left-menu"
      fixed
      floating
      app>
      <v-sidebar>
        <v-list
          mini-variant-width="80"
          class="left-nav-menu">
          <v-divider/>
          <v-list-tile 
            v-for="(item, index) in items"
            :to="{ name: item.ref }"
            :key="item.title"
            @click="selectIcon(index)">
            <v-list-tile-action>

              <v-container
                grid-list-md
                align-center
                text-xs-center>
                <v-layout
                  row
                  wrap>
                  <v-flex
                    xs12
                    class="text-in-left-nav-menu">
                    <v-icon>{{ item.icon }}</v-icon>
                    {{ item.title }}
                  </v-flex>
                </v-layout>
              </v-container>

            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list>
      </v-sidebar>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>
        <router-view/>
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
        {
          title: "Dashboard",
          icon: "home",
          active: true,
          ref: "inicio"
        },
        {
          title: "Centros",
          icon: "pin_drop",
          active: false,
          ref: "bancos"
        },
        {
          title: "Grupos",
          icon: "school",
          active: false,
          ref: "usuarios"
        },
        {
          title: "Personas",
          icon: "group",
          active: false,
          ref: "beneficiarios"
        },
        {
          title: "Servicios",
          icon: "explore",
          active: false,
          ref: "beneficiarios"
        },
        {
          title: "Empleo",
          icon: "work",
          active: false,
          ref: "beneficiarios"
        },
        {
          title: "Activos",
          icon: "local_offer",
          active: false,
          ref: "beneficiarios"
        }
      ],
      drawerIsMini: true,
      sidebarDrawerIsMini: true,
      right: null
    };
  },
  watch: {
    sidebarDrawerIsMini: function() {
      this.sidebarDrawerIsMini = true;
    }
  },
  methods: {
    selectIcon(index) {
      let i;
      for (i = 0; i < this.items.length; i += 1) {
        this.items[i].active = false;
      }

      this.items[index].active = true;
    }
  }
};
</script>

<style scoped>
.left-menu {
  margin-top: 5em !important;
}

.left-nav-menu {
  padding-top: 7em !important;
}

.text-in-left-nav-menu {
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.54);
  font-size: 10px;
  line-height: 10px;
  text-align: center;
}

.title-app {
  margin-top: 0.3em;
  opacity: 1;
  font-family: "Source Sans Pro", sans-serif;
  color: rgba(0, 0, 0, 0.54);
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 0px;
}
</style>
