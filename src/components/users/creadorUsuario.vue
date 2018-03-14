<template>
  <div>

    <div class="data-visualization-container">
      <h2>Nuevo usuario</h2>
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

    <v-btn absolute dark fab bottom right color="green" v-on:click="saveUser">
      <v-icon>save</v-icon>
    </v-btn>


    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data () {
      return {
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
      }
    },
    methods:{
      saveUser: function(){

        axios({ method: "GET", "url": this.dataUrl }).then(result => {
            
            var rawData = result.request.response;
            var parsedData = JSON.parse(rawData);            
            var cleanData = parsedData.data;
            var dataKeys = [];

            var showAs = ["Nombre", "Región", "Estado", "Ciudad"];
            var valuesToRecover = ["nombre", ["region","nombre"], ["direccion","estado"], ["direccion","ciudad"]];

            if(showAs.length != valuesToRecover.length){
              return "ERROR: Arrays 'showAs' and 'valuesToRecover' in method loadData() have different sizes";
            }

            this.data = [];
            this.columnNames = showAs;

            for(var i=0; i<cleanData.length; i++){

              var elementInArray = cleanData[i];
              var newBank = {};
              for(var j=0; j<valuesToRecover.length; j++){
                var key = valuesToRecover[j];
                var saveKeyAs = showAs[j];
                //Recover value
                if(key instanceof Array){
                  var value = elementInArray[key[0]][key[1]];
                }
                else{
                  var value = elementInArray[key];
                }      
                
                newBank[saveKeyAs] = value;
                
              }
              this.data.push(newBank);
            }

        }, error => {
            console.error(error);
        });    
      },
    },
    watch: {
    }
  }
</script>

<style type="text/css">
  .data-visualization-container{
    margin-left: 30%;
    width: 40%;
  }
</style>