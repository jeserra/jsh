<template>
  <div>

    <div class="data-visualization-container">
      <h2>Nuevo Beneficiario</h2>
      <h3>Estudio Socio Económico</h3>

      <v-stepper v-model="currentStep" vertical>

        <v-stepper-step step="1" :complete="currentStep > 1" editable>
          Representante
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field label="Comunidad" v-model="comunidad"></v-text-field>
            </v-flex>
            <v-flex xs6>
            <v-text-field label="Nombre del titular" v-model="nombreTitular"></v-text-field>
            </v-flex>
          </v-layout>
          <h4>Domicilio</h4>
          <v-layout row wrap>
            <v-flex xs4>
              <v-text-field label="Calle" v-model="calle"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field label="Colonia" v-model="nombreTitular"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field label="Municipio" v-model="nombreTitular"></v-text-field>
            </v-flex>            
          </v-layout>

          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field label="Número exterior" v-model="calle"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Número interior" v-model="nombreTitular"></v-text-field>
            </v-flex>
          </v-layout>

          <h4>Lugar de Nacimiento</h4>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field label="Municio" v-model="comunidad"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Estado" v-model="nombreTitular"></v-text-field>
            </v-flex>
          </v-layout>          

          <h4>Escolaridad</h4>
          <v-layout row wrap>
            <v-flex xs6>
                <v-select label="Escolaridad" v-model="userType" :items="escolaridades"></v-select>
            </v-flex>
            <v-flex xs6>
              <v-radio-group v-model="radios" :mandatory="false">
                <v-radio label="Completa" value="radio-1"></v-radio>
                <v-radio label="Incompleta" value="radio-2"></v-radio>
                <v-radio label="Estudia" value="radio-2"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>

          <v-btn color="primary" @click.native="currentStep = 2">Continuar</v-btn>
        </v-stepper-content>

        <v-stepper-step step="2" :complete="currentStep > 2" editable>
          Datos generales
        </v-stepper-step>
        <v-stepper-content step="2">

          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field label="Nombre de la comunidad o programa" v-model="comunidad"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Grupo" v-model="nombreTitular"></v-text-field>
            </v-flex>
          </v-layout>

          <h4>Fecha de levantamiento</h4>
          <v-date-picker v-model="picker" landscape locale="es-mx" reactive></v-date-picker>

          <h4>Fecha de captura</h4>
          <v-date-picker v-model="picker" landscape locale="es-mx" reactive></v-date-picker>

          <h4>Vialidad</h4>
          <v-layout row wrap>
            <v-flex xs4>
              <v-select label="Tipo de vialidad" v-model="userType" :items="escolaridades"></v-select>
            </v-flex>
            <v-flex xs4>
              <v-text-field placeholder="Nombre de vialidad" v-model="calle"></v-text-field>
            </v-flex>        
          </v-layout>

          <v-layout row wrap>
            <v-flex xs4>
              <v-text-field placeholder="Número interior" v-model="nombreTitular"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field placeholder="Número exterior" v-model="nombreTitular"></v-text-field>
            </v-flex>        
          </v-layout>          
          
          

          <h4>Asentamiento</h4>
          <v-layout row wrap>
            <v-flex xs6>
              <v-select label="Tipo de asentamiento" v-model="userType" :items="escolaridades"></v-select>
            </v-flex>
            <v-flex xs6>
              <v-text-field placeholder="Nombre de asentamiento" v-model="calle"></v-text-field>
            </v-flex>
          </v-layout>


          <v-layout row wrap>
            <v-flex xs4>
              <v-text-field placeholder="Código postal" v-model="nombreTitular"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field placeholder="Localidad" v-model="nombreTitular"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field placeholder="Municipio" v-model="nombreTitular"></v-text-field>
            </v-flex>            
          </v-layout>
        
          <v-layout row wrap>
            <v-flex xs4>
              <v-text-field placeholder="Clave de municipio" v-model="nombreTitular"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field placeholder="Estado" v-model="nombreTitular"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field placeholder="Clave de estado" v-model="nombreTitular"></v-text-field>
            </v-flex>            
          </v-layout>

          <v-text-field placeholder="Entre vialidades" v-model="nombreTitular"></v-text-field>
          <v-text-field placeholder="Descripción de ubicación" v-model="nombreTitular"></v-text-field>
          <br>
          <v-text-field placeholder="Teléfono/Celular" v-model="nombreTitular"></v-text-field>
          
          <v-btn color="primary" @click.native="currentStep = 3">Continuar</v-btn>
        </v-stepper-content>

        <v-stepper-step step="3" :complete="currentStep > 3" editable>
          Estructura familiar
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-expansion-panel>
            <v-expansion-panel-content v-for="(item,i) in familyAmount" :key="i">
              <div slot="header">Integrante #{{i+1}}: Item</div>

              <v-text-field placeholder="Nombre(s)" v-model="nombreTitular"></v-text-field>
              <v-text-field placeholder="Primer apellido" v-model="nombreTitular"></v-text-field>
              <v-text-field placeholder="Segundo apellido" v-model="nombreTitular"></v-text-field>

              <h4>Fecha de nacimiento</h4>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-date-picker v-model="picker" :landscape="landscape" locale="es-mx" reactive></v-date-picker>
                </v-flex>
                <v-flex xs6>
                  Sexo
                  <v-radio-group v-model="radios" :mandatory="false">
                    <v-radio label="Hombre" value="Hombre"></v-radio>
                    <v-radio label="Mujer" value="Mujer"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs6>
                  <h4>Estado civil</h4>
                  <v-select label="Estado civil" v-model="userType" :items="escolaridades"></v-select>
                </v-flex>
                <v-flex xs6>
                  <h4>Parentesco</h4>
                  <v-select label="Parentesco" v-model="userType" :items="escolaridades"></v-select>
                </v-flex>
              </v-layout>          

              <h4>Escolaridad</h4>
              <v-layout row wrap>
                <v-flex xs6>              
                  <v-select label="Grado" v-model="userType" :items="escolaridades"></v-select>
                  <v-select label="Nivel" v-model="userType" :items="escolaridades"></v-select>
                </v-flex>            
              </v-layout>
              <v-text-field placeholder="Asiste a la escuela..." v-model="nombreTitular"></v-text-field>
            </v-expansion-panel-content>
          </v-expansion-panel>
          
          <v-layout row wrap>
            <v-flex xs6>              
              <v-btn flat @click.native="familyAmount++">Agregar otro familiar</v-btn>
              <v-btn flat @click.native="familyAmount--">Remover familiar</v-btn>
            </v-flex>            
          </v-layout>

          <v-btn color="primary" @click.native="currentStep = 4">Continuar</v-btn>
        </v-stepper-content>

        <v-stepper-step step="4" :complete="currentStep > 4" editable>
          Seguridad social y salud
        </v-stepper-step>
        <v-stepper-content step="4">
          <v-expansion-panel>
            <v-expansion-panel-content v-for="(item,i) in familyAmountSocialSecurity" :key="i">
              <div slot="header">Integrante #{{i+1}}: Item</div>

              <v-text-field placeholder="Ocupación" v-model="nombreTitular"></v-text-field>
              <v-text-field placeholder="Tipo de empleo" v-model="nombreTitular"></v-text-field>

              <h4>Prestaciones laborales</h4>
              <v-layout row wrap>
                <v-flex xs2>
                  <v-checkbox
                    label="A"
                    v-model="ex4"
                    value="red"
                    hide-details
                  ></v-checkbox>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    label="B"
                    v-model="ex4"
                    value="red"
                    hide-details
                  ></v-checkbox>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    label="C"
                    v-model="ex4"
                    value="red"
                    hide-details
                  ></v-checkbox>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    label="D"
                    v-model="ex4"
                    value="red"
                    hide-details
                  ></v-checkbox>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    label="E"
                    v-model="ex4"
                    value="red"
                    hide-details
                  ></v-checkbox>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs2>
                  <v-checkbox
                    label="F"
                    v-model="ex4"
                    value="red"
                    hide-details
                  ></v-checkbox>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    label="G"
                    v-model="ex4"
                    value="red"
                    hide-details
                  ></v-checkbox>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    label="H"
                    v-model="ex4"
                    value="red"
                    hide-details
                  ></v-checkbox>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    label="I"
                    v-model="ex4"
                    value="red"
                    hide-details
                  ></v-checkbox>
                </v-flex>
              </v-layout>

              <h4>Jubilación o pensionado</h4>
              <v-radio-group v-model="radios" :mandatory="false" row>
                <v-radio label="Sí" value="Sí"></v-radio>
                <v-radio label="No" value="No"></v-radio>
                <v-radio label="NA" value="NA"></v-radio>
              </v-radio-group>

              <v-text-field label="Derechohabiencia" v-model="comunidad"></v-text-field>
              <v-text-field label="Motivo derechohabiencia" v-model="comunidad"></v-text-field>
              <v-text-field label="Capacidades diferentes" v-model="comunidad"></v-text-field>
              <v-text-field label="Condiciones de salud" v-model="comunidad"></v-text-field>
              <v-text-field label="Adiciones" v-model="comunidad"></v-text-field>

              <v-layout row wrap>
                <v-flex xs4>
                  <h4>Etnia indígena</h4>
                  <v-select label="Etnia indígena" v-model="userType" :items="escolaridades"></v-select>
                </v-flex>
                <v-flex xs4>
                  <h4>Peso (kg)</h4>
                  <v-select label="Peso (kg)" v-model="userType" :items="escolaridades"></v-select>
                </v-flex>
                <v-flex xs4>
                  <h4>Talla (cm)</h4>
                  <v-select label="Talla (cm)" v-model="userType" :items="escolaridades"></v-select>
                </v-flex>                
              </v-layout>

            </v-expansion-panel-content>
          </v-expansion-panel>
          
          <v-layout row wrap>
            <v-flex xs6>              
              <v-btn flat @click.native="familyAmountSocialSecurity++">Agregar otro familiar</v-btn>
              <v-btn flat @click.native="familyAmountSocialSecurity--">Remover familiar</v-btn>
            </v-flex>            
          </v-layout>

          <v-btn color="primary" @click.native="currentStep = 5">Continuar</v-btn>
        </v-stepper-content>

        <v-stepper-step step="5" :complete="currentStep > 5" editable>
          Servicios
        </v-stepper-step>
        <v-stepper-content step="5">

          <h4>Luz</h4>
          <v-layout row wrap>
            <v-flex xs3>
              <v-checkbox
              label="Servicio público"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="Planta particular"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="Panel solar"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="No tiene"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
          </v-layout>

          <h4>Drenaje</h4>
          <v-layout row wrap>
            <v-flex xs3>
              <v-checkbox
              label="Red pública"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="Fosa séptica"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-checkbox
              label="Tuberia que da a una grieta o barranca"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs6>
              <v-checkbox
              label="Tubería que da a un río, lago o mar"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="No tiene"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
          </v-layout>          

          <h4>Baño / excusado</h4>
          <v-layout row wrap>
            <v-flex xs3>
              <v-checkbox
              label="Descarga directa"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="Agua con cubeta"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="Letrina seca"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="Pozo u hoyo"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="No tiene"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>            
          </v-layout>

          <h4>Combustible</h4>
          <v-layout row wrap>
            <v-flex xs3>
              <v-checkbox
              label="Gas tanque"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="Electricidad"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="Gas natural"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
              label="Leña o carbón sin chimenea"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
              label="Leña o carbón con chimenea"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex> 
            <v-flex xs3>
              <v-checkbox
              label="Otro combustible"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>            
          </v-layout>

          <h4>Agua</h4>
          <v-layout row wrap>
            <v-flex xs3>
              <v-checkbox
              label="Toma domicilaria"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs5>
              <v-checkbox
              label="Toma común o fuera de vivienda"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="Llave pública"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs5>
              <v-checkbox
              label="Acarrean de otra vivienda"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="Pipa"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
              label="Pozo, río, lago"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>   
            <v-flex xs3>
              <v-checkbox
              label="Sin servicio"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>            
          </v-layout>

          <v-btn color="primary" @click.native="currentStep = 6">Continuar</v-btn>
        </v-stepper-content>

        <v-stepper-step step="6" :complete="currentStep > 6" editable>
          Infraestructura de vivenda
        </v-stepper-step>
        <v-stepper-content step="6">
          <h4>Tenencia</h4>
          <v-radio-group v-model="radios" :mandatory="false" row>
            <v-radio label="Propia" value="Propia"></v-radio>
            <v-radio label="Rentada" value="Rentada"></v-radio>
            <v-radio label="Pagándose" value="Pagándose"></v-radio>            
          </v-radio-group>
          <v-radio-group v-model="radios" :mandatory="false" row>
            <v-radio label="Prestada" value="Prestada"></v-radio>
            <v-radio label="Asentamiento irregular" value="Asentamiento irregular"></v-radio>
            <v-radio label="Otro" value="Otro"></v-radio>
          </v-radio-group>

          <h4>Tipo de casa</h4>
          <v-radio-group v-model="radios" :mandatory="false" row>
            <v-radio label="Independiente" value="Independiente"></v-radio>
            <v-radio label="U. Habitacional" value="U. Habitacional"></v-radio>
            <v-radio label="Vecindad" value="Vecindad"></v-radio>
            <v-radio label="Anexo a casa" value="Anexo a casa"></v-radio>
          </v-radio-group>
          <v-radio-group v-model="radios" :mandatory="false" row>
            <v-radio label="Vivienda móvil" value="Vivienda móvil"></v-radio>
            <v-radio label="Compartida" value="Compartida"></v-radio>
            <v-radio label="Refugio" value="Refugio"></v-radio>
          </v-radio-group>

          <h4>Mayor parte de muros</h4>
          <v-radio-group v-model="radios" :mandatory="false" row>
            <v-radio label="Lámina, metálica, asbesto" value="Lámina, metálica, asbesto"></v-radio>
            <v-radio label="Madera" value="Madera"></v-radio>
            <v-radio label="Adobe" value="Adobe"></v-radio>
          </v-radio-group>
          <v-radio-group v-model="radios" :mandatory="false" row>
            <v-radio label="Ladrillo, tabique" value="Ladrillo, tabique"></v-radio>
            <v-radio label="Carrizo, bambú" value="Carrizo, bambú"></v-radio>
            <v-radio label="Otros" value="Otros"></v-radio>
            <v-radio label="Desechos, cartón" value="Desechos, cartón"></v-radio>
          </v-radio-group>

          <h4>Mayor parte de piso</h4>
          <v-radio-group v-model="radios" :mandatory="false" row>
            <v-radio label="Madera, duela" value="Madera, duela"></v-radio>
            <v-radio label="Mosaico, vinil" value="Mosaico, vinil"></v-radio>
            <v-radio label="Cemento o firme" value="Cemento o firme"></v-radio>
          </v-radio-group>
          <v-radio-group v-model="radios" :mandatory="false" row>
            <v-radio label="Tierra" value="Tierra"></v-radio>
            <v-radio label="Otros" value="Otros"></v-radio>
          </v-radio-group>

          <h4>Características</h4>
          <v-layout row wrap>
            <v-flex xs4>
              <v-select label="No. de cuartos" v-model="userType" :items="escolaridades"></v-select>
            </v-flex>
            <v-flex xs4>
              <v-select label="Cuartos para dormir" v-model="userType" :items="escolaridades"></v-select>
            </v-flex>
            <v-flex xs4>            
              <v-checkbox
              label="Cocina separada"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
              <v-checkbox
              label="Cuarto de baño exclusivo"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex> 
          </v-layout>

          <v-layout wrap>
            <v-flex xs4>
              <h4>Equipamiento</h4>
            </v-flex>
            <v-flex xs4>
              <h4>Tiene</h4>
            </v-flex>
            <v-flex xs4>
              <h4>Sirve</h4>
            </v-flex>          
          </v-layout>

          <v-layout wrap v-for="(item, index) in houseObjects">
            <v-flex xs4>
              {{item}}
            </v-flex>
            <v-flex xs4>
              <v-switch :label="userEnabled" v-model="userEnabled" :true-value="enabledTag" :false-value="disabledTag"></v-switch>
            </v-flex>
            <v-flex xs4>
              <v-switch :label="userEnabled" v-model="userEnabled" :true-value="enabledTag" :false-value="disabledTag"></v-switch>
            </v-flex>          
          </v-layout>        

          <h4>Condiciones</h4>
          <v-radio-group v-model="radios" :mandatory="false" row>
            <v-radio label="Buena" value="Buena"></v-radio>
            <v-radio label="Regular" value="Regular"></v-radio>
            <v-radio label="Mala" value="Mala"></v-radio>
          </v-radio-group>

          <v-btn color="primary" @click.native="currentStep = 7">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step step="7" :complete="currentStep > 7" editable>
          Condiciones económicas
        </v-stepper-step>
        <v-stepper-content step="7">

          <v-layout row wrap>
            <v-flex xs5>
              <h4>Condiciones económicas</h4>
              <v-text-field label="Vivienda" prefix="$"></v-text-field>
              <v-text-field label="Alimentación" prefix="$"></v-text-field>
              <v-text-field label="Luz" prefix="$"></v-text-field>
              <v-text-field label="Gas" prefix="$"></v-text-field>
              <v-text-field label="Agua" prefix="$"></v-text-field>
              <v-text-field label="Teléfono" prefix="$"></v-text-field>
              <v-text-field label="Celular" prefix="$"></v-text-field>
              <v-text-field label="Atención médica" prefix="$"></v-text-field>
              <v-text-field label="Educación" prefix="$"></v-text-field>
              <v-text-field label="Transporte" prefix="$"></v-text-field>
              <v-text-field label="Otros" prefix="$"></v-text-field>
            </v-flex>

            <v-flex xs2>
            </v-flex>

            <v-flex xs5>
              <h4>Aportación semanal</h4>
              <v-text-field label="Padre" prefix="$"></v-text-field>
              <v-text-field label="Madre" prefix="$"></v-text-field>
              <v-text-field label="Hijos" prefix="$"></v-text-field>
              <v-text-field label="PROSPERA" prefix="$"></v-text-field>
              <v-text-field label="Adultos mayores" prefix="$"></v-text-field>
              <v-text-field label="Becas" prefix="$"></v-text-field>
              <v-text-field label="Pensión" prefix="$"></v-text-field>
              <v-text-field label="Otros" prefix="$"></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs5>
              <v-text-field label="Total" value="999,999" prefix="$"></v-text-field>
            </v-flex>

            <v-flex xs2>
            </v-flex>

            <v-flex xs5>
              <v-text-field label="Total" value="999,999" prefix="$"></v-text-field>
            </v-flex>
          </v-layout>

          <h4>Apoyos en especie</h4>
          <v-layout row wrap>
            <v-flex xs5>
              <v-text-field label="Tipos de apoyo"></v-text-field>
              <v-text-field label="Frecuencia del apoyo"></v-text-field>
            </v-flex>

            <v-flex xs2>
            </v-flex>

            <v-flex xs5>
              <v-text-field label="Quien los proporciona"></v-text-field>
            </v-flex>
          </v-layout>

          <h4>Remesas</h4>
          <v-layout row wrap>
            <v-flex xs8>
              ¿Alguien en el hogar recibe dinero proveniente de otros países?"
            </v-flex>

            <v-flex xs4>
              <v-switch :label="userEnabled" v-model="userEnabled" :true-value="enabledTag" :false-value="disabledTag"></v-switch>
            </v-flex>
          </v-layout>          
          <v-text-field label="Frecuencia del apoyo"></v-text-field>   

          <v-btn color="primary" @click.native="currentStep = 1">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step step="8" :complete="currentStep > 8" editable>
          Alimentación
        </v-stepper-step>
        <v-stepper-content step="8">
          <h4>Alimentación (En los últimos meses por falta de dinero u otros recursos)</h4>

          <v-layout wrap v-for="(item, index) in alimentationAdultQuestions">
            <v-flex xs8>
            ¿Alguna vez usted o algún adulto en su hogar tuvo una alimentación basada en poca variedad de alimentos?              
            </v-flex>
            <v-flex xs1>
            </v-flex>
            <v-flex xs2>
              <v-switch :label="userEnabled" v-model="userEnabled" :true-value="enabledTag" :false-value="disabledTag"></v-switch>
            </v-flex>
          </v-layout>

          <br>
          <h4>Si en el hogar no hay personas de menores de 18 años pase a la sección 8. Resultados</h4>
          <br>

          <v-layout wrap v-for="(item, index) in alimentationNoAdultQuestions">
            <v-flex xs8>
            ¿Alguna vez usted o algún adulto en su hogar tuvo una alimentación basada en poca variedad de alimentos?              
            </v-flex>
            <v-flex xs1>
            </v-flex>
            <v-flex xs2>
              <v-switch :label="userEnabled" v-model="userEnabled" :true-value="enabledTag" :false-value="disabledTag"></v-switch>
            </v-flex>
          </v-layout>

          <h3>Estatus</h3>
          <v-layout row wrap>
            <v-flex xs4>
              <v-checkbox
              label="Rechazado"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
              label="En espera"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
              label="Aprobado"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>        
          </v-layout>

          <h3>Tipo</h3>
          <v-layout row wrap>
            <v-flex xs4>
              <v-checkbox
              label="Cuota"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
              label="Beca"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
              label="Media beca"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>        
          </v-layout>

          <h3>Frecuencia</h3>
          <v-layout row wrap>
            <v-flex xs4>
              <v-checkbox
              label="Semanal"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
              label="Quincenal"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
              label="Mensual"
              v-model="ex4"
              value="red"
              hide-details
              ></v-checkbox>
            </v-flex>        
          </v-layout>
      
          <v-layout row wrap>
            <v-flex xs4>
              <v-text-field label="Duración en meses"></v-text-field>
            </v-flex>
          </v-layout>

          <v-btn color="primary" @click.native="currentStep = 1">Continue</v-btn>
        </v-stepper-content>
      </v-stepper>
 
    </div>

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
        currentStep: 0,
        escolaridades: ["Preparatoria", "Secundaria", "Primaria"],

        familyAmount: 1,
        familyStructure: [],

        familyAmountSocialSecurity: 1,

        houseObjects: [
              "Refrigerador", "Estufa", "VHS, DVD, Blu Ray", "Lavadora", 
              "Licuadora", "Radio", "Sala", "Comedor", "Automóvil", "Cama",
              "Celular", "Motocicleta", "Computadora", "Horno", "Teléfono"
            ],

        enabledTag: 'Sí',
        disabledTag: 'No',
        userEnabled: 'Sí',

        alimentationAdultQuestions: [
          "¿Alguna vez usted o algún adulto en su hogar tuvo una alimentación basada en poca variedad de alimentos?",
          "¿Alguna vez usted o algún adulto en su hogar comió menos de lo que piensa que debería comer?",
          "¿Alguna vez usted o algún adulto en su hogar dejó de desayunar, comer o cenar?",
          "¿Alguna vez se quedaron sin comida?",
          "¿Alguna vez usted o algún adulto en su hogar sintió hambre pero no comió?",
          "¿Alguna vez usted o algún adulto en su hogar sólo comió una vez al día o dejó de comer durante un día?",
          ],

        alimentationNoAdultQuestions: [
          "¿Alguna vez algún menor de 18 años en su hogar tuvo una alimentación basada en poca variedad de alimentos?",
          "¿Alguna vez algún menor de 18 años en su hogar comió menos de lo que piensa que debería comer?",
          "¿Alguna vez algún menor de 18 años en su hogar dejó de desayunar, comer o cenar?",
          "¿Alguna vez usted en su hogar tuvieron que disminuir la cantidad servida de comida a algún menor de 18 años?",
          "¿Alguna vez algún menor de 18 años en su hogar sintió hambre pero no comió?",
          "¿Alguna vez algún menor de 18 años en su hogar sólo comió una vez al día o dejó de comer durante un día?",
          ],

        usersURL: "http://localhost:5000/api/usuarios",

        password: '',
        repeatPassword: '',

        ex4: undefined,
        radios: undefined,

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

        // Snackbar config
        snackbar: false,
        y: 'bottom',
        x: null,
        mode: '',
        timeout: 3000,
        confirmationMessage: 'El usuario ha sido creado',        
      }
    },
    methods:{
      saveUser: function(){
        
        var vueInstance = this;

        axios.post(this.usersURL, {
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
            
            vueInstance._routerRoot._router.push({
              name: "editorUsuario",
              params: { id: 1 }
            });

          })
          .catch(function (error) {
            console.log("Error in creation of user");
            console.log(error);
          });   
      },
    },
  }
</script>

<style scoped type="text/css">
  .data-visualization-container{
    margin-left: 10%;    
    width: 80%;
  }

  input{
    width: 30%;
  }
</style>