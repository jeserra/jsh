<template>
  <div>

    <div class="data-visualization-container">
      <h2>Editar usuario</h2>
      Ingrese al menos los datos que sean de caracter obligatorio(*)

      <form>

        <v-text-field label="Contraseña"
          v-model="password"
          type="password"
          required></v-text-field>

        <v-text-field label="Confirmar Contraseña"
          v-model="repeatPassword"
          type="password"    
          :error="password !== repeatPassword"
          :rules="[() => ('Las contraseñas no coinciden')]"
          required></v-text-field>

        <v-switch :label="userEnabled" v-model="userEnabled" :true-value="enabledTag" :false-value="disabledTag"></v-switch>

        <v-text-field label="Nombre" v-model="name" required></v-text-field>

        <v-select label="Tipo de Usuario" v-model="userType" :items="userTypes"></v-select>

        <v-select label="Grupo" v-model="group" :items="groupsData"></v-select>

        <v-select label="Curso" v-model="course" :items="coursesData"></v-select>

        <v-select label="Estado" v-model="state" :items="statesData"></v-select>

        <v-select label="Ciudad" v-model="city" :items="citiesData[state]"></v-select>      

        <v-text-field label="C.P." v-model="cp" type="number"></v-text-field>

        <v-text-field label="Calle" v-model="street"></v-text-field>

        <v-text-field label="Número" v-model="numberStreet"></v-text-field>
      </form>

    <v-btn fixed fab bottom right color="primary" v-on:click="saveUser()">
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
      v-model="snackbar"
    >
      {{confirmationMessage}}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data () {
      return {
        usersURL: "http://localhost:5000/api/usuarios",
        userID: this.$route.params.id,

        password: '',
        repeatPassword: '',

        enabledTag: 'Habilitado',
        disabledTag: 'Deshabilitado',
        userEnabled: 'Habilitado',

        name: '',        

        userType: undefined,
        userTypes: ["Tipo 1", "Tipo 2", "Tipo 3"],

        group: undefined,
        groupsData: ["Tipo 1", "Tipo 2", "Tipo 3"],

        course: undefined,
        coursesData: ["Tipo 1", "Tipo 2", "Tipo 3"],

        state: undefined,
        statesData: ["Jalisco","Monterrey"],

        city: undefined,
        citiesData: {
          "Jalisco": ["Ciudad 1 de Jalisco", "Ciudad 2 de Jalisco", "Ciudad 3 de Jalisco"],
          "Monterrey": ["Ciudad 1 de Monterrey", "Ciudad 2 de Monterrey", "Ciudad 3 de Monterrey"]
        },

        cp: '',
        street: '',
        numberStreet: '',

        // Snackbar config
        snackbar: false,
        y: 'bottom',
        x: null,
        mode: '',
        timeout: 3000,
        confirmationMessage: 'El usuario ha sido editado',        
      }
    },
    methods:{
      saveUser: function(){
        
        var vueInstance = this;

        axios.put(this.usersURL+'/'+this.userID, {
            "nombre": this.name,
            "contraseña": this.password,
            "tipoUsuario": {
                "tipo": this.userType,
                "descripción": "---"
            },
            "grupo": this.group,
            "habilitado": this.userEnabled,
            "direccion": {
                "calle": this.street,
                "numero": this.numberStreet,
                "cp": this.cp,
                "ciudad": this.city,
                "estado": this.state,
            },
            "curso": {
                "id": 1,
                "nombre": this.course,
                "descripcion": "---",
                "calificacion": 0,
                "observaciones": "---"
            }            
          })
          .then(function (response) {
            vueInstance.snackbar = true;
          })
          .catch(function (error) {
            console.log("Error in creation of user");
            console.log(error);
          });   
      },
      getData(){
        axios({
          method: 'GET',
          url: this.usersURL+'/'+this.userID,
        }).then((response) => {
          let data = response.data.data;
                    
          this.password = data.contraseña;
          this.repeatPassword = this.password;

          if(data.habilitado){
            this.userEnabled = this.enabledTag;
          }else{
            this.userEnabled = this.disabledTag;
          }

          this.name = data.nombre;
          this.userType = data.tipoUsuario.tipo;
          this.group = data.grupo;
          this.course = data.curso.nombre;
          this.state = data.direccion.estado;
          this.city = data.direccion.ciudad;
          this.cp = data.direccion.cp;
          this.street = data.direccion.calle;
          this.numberStreet = data.direccion.numero;
          
        }).catch((e) => {
          this.errors.push(e);
        });
      }  
    },
    created() {
      this.getData();
    },    
  }
</script>

<style scoped type="text/css">
  .data-visualization-container{
    margin-left: 30%;
    width: 40%;
  }
</style>