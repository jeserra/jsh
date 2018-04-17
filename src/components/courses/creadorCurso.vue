<template>
  <div>

    <toolbarHandler      
      :key-name="'personas'"/>

    <div class="data-visualization-container">
      <h2>Nuevo curso</h2>
      Ingrese al menos los datos que sean de caracter obligatorio(*)

      <form>
        <v-text-field
          v-model="name"
          label="Nombre del Curso"
          required/>

        <v-text-field
          v-model="description"
          label="Descripción breve del curso"
          required/>

        <h3>Tipo de donativo: Curso de capacitación</h3>

        <v-select
          v-model="community_center"
          :items="community_centers"
          label="Centro Comunitario"/>
          
        <v-text-field
          v-model="trabajador_social"
          label="Nombre del trabajador social"
          disabled="True"/>

        <v-text-field
          v-model="aliado"
          label="Nombre del aliado"
          disabled="True"/>
        <h3>Status</h3>
        <v-switch 
          :label="userEnabled"
          v-model="userEnabled"
          :true-value="enabledTag"
          :false-value="disabledTag"/>

        <h3>Fecha de inicio</h3>
        <v-date-picker
        landscape="True"
        v-model="initial_date"
        />
        <h3>Fecha Final</h3>
        <v-date-picker
        landscape="True"
        v-model="final_date"
        />

        <v-select
          v-model="state"
          :items="statesData"
          label="Estado"/>

        <v-select
          v-model="city"
          :items="citiesData[state]"
          label="Ciudad"/>

        <v-text-field
          v-model="cp"
          type="number"
          label="C.P."/>

        <v-text-field          
          v-model="street"
          label="Calle"/>

        <v-text-field          
          v-model="numberStreet"
          label="Número"/>
   
      </form>

      <v-btn
        fixed
        fab
        bottom
        right
        color="primary"
        @click="saveUser()">
        <v-icon>save</v-icon>
      </v-btn>    

      <v-snackbar
        :timeout="timeout"
        :top="y === 'top'"
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :vertical="mode === 'vertical'"
        v-model="snackbar">
        {{ confirmationMessage }}
        <v-btn
          flat
          color="pink"
          @click.native="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usersURL: "http://localhost:5000/api/usuarios",

      role: "Admin",

      name: "",
      description: "",
      community_center: undefined,
      community_centers: ["Tonalá", "Zapopan", "Casa Dany"],
      trabajador_social: "",
      aliado: "",

      enabledTag: "Verificado",
      disabledTag: "Pendiente",
      userEnabled: "Habilitado",

      initial_date: "",
      final_date: "",
      state: undefined,
      statesData: ["Jalisco", "Monterrey"],

      city: undefined,
      citiesData: {
        Jalisco: [
          "Ciudad 1 de Jalisco",
          "Ciudad 2 de Jalisco",
          "Ciudad 3 de Jalisco"
        ],
        Monterrey: [
          "Ciudad 1 de Monterrey",
          "Ciudad 2 de Monterrey",
          "Ciudad 3 de Monterrey"
        ]
      },

      cp: "",
      street: "",
      numberStreet: "",
      // Snackbar config
      snackbar: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 3000,
      confirmationMessage: "El usuario ha sido creado"
    };
  },
  methods: {}
};
</script>

<style scoped type="text/css">
.data-visualization-container {
  margin-left: 30%;
  width: 40%;
}
</style>
