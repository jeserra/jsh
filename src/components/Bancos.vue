<template>
  <div>

    <div class="data-visualization-container">
      <p class="module-title">
        <v-icon>account_balance</v-icon>Banco de Alimentos
      </p>
      <div class="table">
        <v-client-table class="table" :data="data" :columns="columnNames" :name="'myTable'"></v-client-table>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data () {
      return {
        banksURL: "http://localhost:5000/api/bancos",

        dataUrl: undefined,
        data: [],
        columnNames: [],
      }
    },
    methods:{
      getBanksInformation: function(){
        this.dataUrl = this.banksURL;
      },
      loadData: function(){

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
    mounted: function(){
      this.getBanksInformation();
      this.loadData();
    },
    watch: {      
      dataUrl: function() {
        this.data = [];

        this.loadData();
      },
    }
  }
</script>

<style type="text/css">
  .module-title{
    text-align: left !important;
  }

  .table{
    width: 90%;
  }

  .data-visualization-container{
    margin-left: 5%;
  }
</style>