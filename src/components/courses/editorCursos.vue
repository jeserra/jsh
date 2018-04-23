<template> 
  <div>

    <toolbarHandler      
      :key-name="'cursos'"/>

    <div class="data-visualization-container">
      <h2>Editar Curso</h2>
      Ingrese al menos los datos que sean de caracter obligatorio(*)

      <form>
        <v-text-field
          v-model="name"
          label="Nombre del Curso"
          required/>

        <v-text-field
          v-model="descripcion"
          label="Descripción breve del curso"
          required/>

        <h3>Tipo de donativo: Curso de capacitación</h3>

        <v-select
          v-model="community_center"
          :items="centro_com"
          label="Centro Comunitario"/>
         
        <v-text-field v-if="role === 'Admin'"
          v-model="trabajador_social"
          label="Nombre del Trabajador Social"
          />

        <v-text-field v-if="role === 'Admin'"
          v-model="patrocinado"
          label="Nombre del Aliado"
          />
                
        <v-select v-if="role === 'Admin'"
          v-model="status"
          :items="statuses"
          label="Estatus"/>

        <h3>Fecha de inicio</h3>
        <v-date-picker
        :landscape=true
        v-model="initial_date"
        />
        <h3>Fecha Final</h3>
        <v-date-picker
        :landscape=true
        v-model="final_date"
        />

        <v-text-field v-if="role === 'Admin'"
          v-model="impartido"
          label="Nombre del Tutor"
          />

        <h3>Dirección</h3>

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
        @click="saveCourse()">
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
import axios from "axios";

export default {

  data() {
    return {
      coursesURL: "http://localhost:5000/api/curso",
      courseID: this.$route.params.id,

      dataUrl: undefined,
      data: [],
      columnNames: [],
      role: "Admin",
      
      initial_date: undefined,
      final_date: undefined,

      impartido: "",

      name: "",
      descripcion: "",
      centro_com: undefined,
      centro_com: ["Tonalá", "Zapopan", "Casa Dany"],
      trabajador_social: "",
      patrocinado: "",
      status: undefined,
      statuses: ["Pendiente", "Verificado", "Terminado", "Rechazado"],

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
      confirmationMessage: "El curso ha sido editado"
    };
  },
created() {
    this.getData();
  },
  methods: {
    saveCourse: function() {
      var vueInstance = this;

      axios
        .put(this.coursesURL + "/" + this.courseID, {
          nombre: this.name,
          tema: this.descripcion,
          tipo_donativo: "Curso de capacitación",
          centro_comunitario: this.centro_com,
          trabajador_social: this.trabajador_social,
          patrocinado: this.patrocinado,
          estatus: this.status,
          fecha_inicial: this.initial_date,
          fecha_final: this.final_date,
          impartido: this.impartido,
          direccion: {
            calle: this.street,
            numero: this.numberStreet,
            cp: this.cp,
            ciudad: this.city,
            estado: this.state
          }
        })
        .then(function(response) {
          vueInstance.snackbar = true;
        })
        .catch(function(error) {
          console.log("Error in creation of course");
          console.log(error);
        });
    },
    getData() {
      axios({
        method: "GET",
        url: this.coursesURL + "/" + this.courseID
      })
        .then(response => {
          let data = response.data.data;
          this.name = data.nombre;
          this.descripcion = data.descripcion;
          this.centro_com = data.centro_com;
          this.trabajador_social = data.trabajador_social;
          this.patrocinado = data.patrocinado;
          this.status = data.status;
          this.initial_date = data.initial_date;
          this.final_date = data.final_date;
          this.impartido = data.impartido;
          this.state = data.direccion.estado;
          this.city = data.direccion.ciudad;
          this.cp = data.direccion.cp;
          this.street = data.direccion.calle;
          this.numberStreet = data.direccion.numero;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};

</script>

<style scoped type="text/css">
.data-visualization-container {
  margin-left: 30%;
  width: 40%;
}
</style>