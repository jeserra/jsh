<template>
  <v-app     
    id="inspire"
    class="app-background-color">
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
        <v-layout
          align-center
          class="title-app right-border">

          <v-flex xs1/>

          <v-flex xs3>
            <v-btn
              icon
              align-center
              @click.native.stop="drawerIsMini = !drawerIsMini">
              <v-toolbar-side-icon/>
            </v-btn>
          </v-flex>

          <v-flex>
            <div>JSH-MMT</div>
          </v-flex>
        </v-layout>

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
              :key="'title-'+ item.title"
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
      width="74"
      mini-variant-width="74"
      class="transparent left-menu"
      fixed
      floating
      app>

      <v-list
        mini-variant-width="74"        
        class="left-nav-menu">
        <v-divider/>
        <v-list-tile 
          v-for="(item, index) in items"
          :key="'left-title-' + item.title"
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
                  class="text-in-left-nav-menu left-nav-menu-item">
                  <v-btn
                    :to="{ name: item.ref }"
                    flat
                    icon
                    active-class="active-nav-menu">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-btn>
                  <div style="padding-top: 6px">{{ item.title }}</div>
                </v-flex>
              </v-layout>
            </v-container>

          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>

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
          ref: "centros"
        },
        {
          title: "Grupos",
          icon: "school",
          active: false,
          ref: "grupos"
        },
        {
          title: "Personas",
          icon: "group",
          active: false,
          ref: "usuarios"
        },
        {
          title: "Servicios",
          icon: "explore",
          active: false,
          ref: "servicios"
        },
        {
          title: "Empleo",
          icon: "work",
          active: false,
          ref: "empleos"
        },
        {
          title: "Activos",
          icon: "local_offer",
          active: false,
          ref: "beneficiarios"
        },
        {
          title: "Logística",
          icon: "assignment",
          active: false,
          ref: "cursos"
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
.app-background-color {
  background-color: #f2f2f2;
}

.left-menu {
  margin-top: 5em !important;
}

.left-nav-menu {
  padding-top: 7em !important;
}

.active-nav-menu {
  color: rgba(71, 147, 89, 1);
}

.left-nav-menu :hover {
  background-color: transparent !important;
}

.text-in-left-nav-menu {
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.54);
  font-size: normal;
  line-height: 10px;
  text-align: center;
}

.title-app {
  margin-top: 0.2em;
  opacity: 1;
  font-family: "Source Sans Pro", sans-serif;
  color: rgba(0, 0, 0, 0.54);
  font-size: 20px;
}

.right-border {
  border-right: 1px solid rgba(0, 0, 0, 0.16);
}
</style>
