<template>
  <div>
    <div class="data-visualization-container">
      <h2>Nuevo Beneficiario</h2>
      <h3>Estudio Socio Económico</h3>

      <v-stepper 
        v-model="currentStep" 
        vertical>

        <v-stepper-step 
          :complete="currentStep > 1" 
          step="1" 
          editable>
          Representante
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-layout 
            row 
            wrap>
            <v-flex xs6>
              <v-text-field 
                v-model="comunidad"
                label="Comunidad"/>
            </v-flex>
            <v-flex xs6>
              <v-text-field 
                v-model="nombreTitular"
                label="Nombre del titular"/>
            </v-flex>
          </v-layout>
          <h4>Domicilio</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-text-field 
                v-model="calle"
                label="Calle"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field 
                v-model="nombreTitular"
                label="Colonia" />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="nombreTitular" 
                label="Municipio"/>
            </v-flex>            
          </v-layout>

          <v-layout
            row 
            wrap>
            <v-flex xs6>
              <v-text-field
                v-model="calle" 
                label="Número exterior"/>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="nombreTitular" 
                label="Número interior"/>
            </v-flex>
          </v-layout>

          <h4>Lugar de Nacimiento</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs6>
              <v-text-field 
                v-model="comunidad"
                label="Municio"/>
            </v-flex>
            <v-flex xs6>
              <v-text-field 
                v-model="nombreTitular"
                label="Estado"/>
            </v-flex>
          </v-layout>          

          <h4>Escolaridad</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs6>
              <v-select 
                v-model="userType"
                :items="escolaridades"
                label="Escolaridad"/>
            </v-flex>
            <v-flex xs6>
              <v-radio-group 
                v-model="radios" 
                :mandatory="false">
                <v-radio 
                  label="Completa" 
                  value="radio-1"/>
                <v-radio 
                  label="Incompleta" 
                  value="radio-2"/>
                <v-radio 
                  label="Estudia" 
                  value="radio-2"/>
              </v-radio-group>
            </v-flex>
          </v-layout>

          <v-btn 
            color="primary" 
            @click.native="currentStep = 2">Continuar</v-btn>
        </v-stepper-content>

        <v-stepper-step 
          :complete="currentStep > 2" 
          step="2" 
          editable>
          Datos generales
        </v-stepper-step>
        <v-stepper-content step="2">

          <v-layout 
            row 
            wrap>
            <v-flex xs6>
              <v-text-field 
                v-model="comunidad"
                label="Nombre de la comunidad o programa"/>
            </v-flex>
            <v-flex xs6>
              <v-text-field 
                v-model="nombreTitular"
                label="Grupo"/>
            </v-flex>
          </v-layout>

          <h4>Fecha de levantamiento</h4>
          <v-date-picker 
            v-model="picker" 
            landscape 
            locale="es-mx" 
            reactive/>

          <h4>Fecha de captura</h4>
          <v-date-picker 
            v-model="picker" 
            landscape 
            locale="es-mx" 
            reactive/>

          <h4>Vialidad</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-select
                v-model="userType" 
                :items="escolaridades" 
                label="Tipo de vialidad"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field 
                v-model="calle"
                placeholder="Nombre de vialidad"/>
            </v-flex>        
          </v-layout>

          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-text-field
                v-model="nombreTitular"
                placeholder="Número interior"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="nombreTitular" 
                placeholder="Número exterior"/>
            </v-flex>        
          </v-layout>          

          <h4>Asentamiento</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs6>
              <v-select 
                v-model="userType" 
                :items="escolaridades"
                label="Tipo de asentamiento"/>
            </v-flex>
            <v-flex xs6>
              <v-text-field 
                v-model="calle"
                placeholder="Nombre de asentamiento"/>
            </v-flex>
          </v-layout>


          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-text-field 
                v-model="nombreTitular"
                placeholder="Código postal"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field 
                v-model="nombreTitular"
                placeholder="Localidad"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="nombreTitular" 
                placeholder="Municipio"/>
            </v-flex>            
          </v-layout>
        
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-text-field 
                v-model="nombreTitular"
                placeholder="Clave de municipio"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field 
                v-model="nombreTitular"
                placeholder="Estado"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field 
                v-model="nombreTitular"
                placeholder="Clave de estado"/>
            </v-flex>            
          </v-layout>

          <v-text-field 
            v-model="nombreTitular"
            placeholder="Entre vialidades"/>
          <v-text-field  
            v-model="nombreTitular"
            placeholder="Descripción de ubicación"/>
          
          <v-text-field  
            v-model="nombreTitular"
            placeholder="Teléfono/Celular"/>
          
          <v-btn 
            color="primary" 
            @click.native="currentStep = 3">Continuar</v-btn>
        </v-stepper-content>

        <v-stepper-step 
          :complete="currentStep > 3"
          step="3"  
          editable>
          Estructura familiar
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-expansion-panel>
            <v-expansion-panel-content 
              v-for="(item,i) in familyAmount" 
              :key="i">
              <div slot="header">Integrante #{{ i+1 }}: Item</div>

              <v-text-field 
                v-model="nombreTitular"
                placeholder="Nombre(s)"/>
              <v-text-field 
                v-model="nombreTitular"
                placeholder="Primer apellido"/>
              <v-text-field 
                v-model="nombreTitular"
                placeholder="Segundo apellido"/>

              <h4>Fecha de nacimiento</h4>
              <v-layout 
                row 
                wrap>
                <v-flex xs6>
                  <v-date-picker 
                    v-model="picker" 
                    :landscape="landscape" 
                    locale="es-mx" 
                    reactive/>
                </v-flex>
                <v-flex xs6>
                  Sexo
                  <v-radio-group 
                    v-model="radios" 
                    :mandatory="false">
                    <v-radio 
                      label="Hombre" 
                      value="Hombre"/>
                    <v-radio 
                      label="Mujer" 
                      value="Mujer"/>
                  </v-radio-group>
                </v-flex>
              </v-layout>

              <v-layout 
                row 
                wrap>
                <v-flex xs6>
                  <h4>Estado civil</h4>
                  <v-select 
                    v-model="userType" 
                    :items="escolaridades"
                    label="Estado civil"/>
                </v-flex>
                <v-flex xs6>
                  <h4>Parentesco</h4>
                  <v-select
                    v-model="userType" 
                    :items="escolaridades"
                    label="Parentesco"/>
                </v-flex>
              </v-layout>          

              <h4>Escolaridad</h4>
              <v-layout 
                row 
                wrap>
                <v-flex xs6>              
                  <v-select 
                    v-model="userType" 
                    :items="escolaridades"
                    label="Grado"/>
                  <v-select 
                    v-model="userType" 
                    :items="escolaridades"
                    label="Nivel"/>
                </v-flex>            
              </v-layout>
              <v-text-field  
                v-model="nombreTitular"
                placeholder="Asiste a la escuela..."/>
            </v-expansion-panel-content>
          </v-expansion-panel>
          
          <v-layout 
            row 
            wrap>
            <v-flex xs6>              
              <v-btn 
                flat 
                @click.native="familyAmount++">Agregar otro familiar</v-btn>
              <v-btn 
                flat 
                @click.native="familyAmount--">Remover familiar</v-btn>
            </v-flex>            
          </v-layout>

          <v-btn 
            color="primary" 
            @click.native="currentStep = 4">Continuar</v-btn>
        </v-stepper-content>

        <v-stepper-step 
          :complete="currentStep > 4" 
          step="4" 
          editable>
          Seguridad social y salud
        </v-stepper-step>
        <v-stepper-content step="4">
          <v-expansion-panel>
            <v-expansion-panel-content 
              v-for="(item,i) in familyAmountSocialSecurity" 
              :key="i">
              <div slot="header">Integrante #{{ i+1 }}: Item</div>

              <v-text-field  
                v-model="nombreTitular"
                placeholder="Ocupación"/>
              <v-text-field 
                v-model="nombreTitular"
                placeholder="Tipo de empleo"/>

              <h4>Prestaciones laborales</h4>
              <v-layout 
                row 
                wrap>
                <v-flex xs2>
                  <v-checkbox
                    v-model="ex4"
                    label="A"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="ex4"
                    label="B"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="ex4"
                    label="C"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="ex4"
                    label="D"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="ex4"
                    label="E"
                    value="red"
                    hide-details/>
                </v-flex>
              </v-layout>

              <v-layout 
                row 
                wrap>
                <v-flex xs2>
                  <v-checkbox
                    v-model="ex4"
                    label="F"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="ex4"
                    label="G"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="ex4"
                    label="H"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="ex4"
                    label="I"
                    value="red"
                    hide-details/>
                </v-flex>
              </v-layout>

              <h4>Jubilación o pensionado</h4>
              <v-radio-group 
                v-model="radios" 
                :mandatory="false" 
                row>
                <v-radio 
                  label="Sí" 
                  value="Sí"/>
                <v-radio 
                  label="No" 
                  value="No"/>
                <v-radio 
                  label="NA" 
                  value="NA"/>
              </v-radio-group>

              <v-text-field 
                v-model="comunidad"
                label="Derechohabiencia"/>
              <v-text-field 
                v-model="comunidad"
                label="Motivo derechohabiencia"/>
              <v-text-field 
                v-model="comunidad"
                label="Capacidades diferentes"/>
              <v-text-field 
                v-model="comunidad"
                label="Condiciones de salud"/>
              <v-text-field 
                v-model="comunidad"
                label="Adiciones"/>

              <v-layout 
                row 
                wrap>
                <v-flex xs4>
                  <h4>Etnia indígena</h4>
                  <v-select 
                    v-model="userType" 
                    :items="escolaridades"
                    label="Etnia indígena"/>
                </v-flex>
                <v-flex xs4>
                  <h4>Peso (kg)</h4>
                  <v-select
                    v-model="userType" 
                    :items="escolaridades"
                    label="Peso (kg)"/>
                </v-flex>
                <v-flex xs4>
                  <h4>Talla (cm)</h4>
                  <v-select 
                    v-model="userType" 
                    :items="escolaridades"
                    label="Talla (cm)"/>
                </v-flex>                
              </v-layout>

            </v-expansion-panel-content>
          </v-expansion-panel>
          
          <v-layout 
            row 
            wrap>
            <v-flex xs6>              
              <v-btn  
                flat 
                @click.native="familyAmountSocialSecurity++">Agregar otro familiar</v-btn>
              <v-btn 
                flat 
                @click.native="familyAmountSocialSecurity--">Remover familiar</v-btn>
            </v-flex>            
          </v-layout>

          <v-btn 
            color="primary" 
            @click.native="currentStep = 5">Continuar</v-btn>
        </v-stepper-content>

        <v-stepper-step 
          :complete="currentStep > 5" 
          step="5" 
          editable>
          Servicios
        </v-stepper-step>
        <v-stepper-content step="5">

          <h4>Luz</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Servicio público"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Planta particular"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Panel solar"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="No tiene"
                value="red"
                hide-details/>
            </v-flex>
          </v-layout>

          <h4>Drenaje</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Red pública"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Fosa séptica"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs6>
              <v-checkbox
                v-model="ex4"
                label="Tuberia que da a una grieta o barranca"
                value="red"
                hide-details/>
            </v-flex>
          </v-layout>

          <v-layout 
            row 
            wrap>
            <v-flex xs6>
              <v-checkbox
                v-model="ex4"
                label="Tubería que da a un río, lago o mar"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="No tiene"
                value="red"
                hide-details/>
            </v-flex>
          </v-layout>          

          <h4>Baño / excusado</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Descarga directa"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Agua con cubeta"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Letrina seca"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Pozo u hoyo"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="No tiene"
                value="red"
                hide-details/>
            </v-flex>            
          </v-layout>

          <h4>Combustible</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Gas tanque"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Electricidad"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Gas natural"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="ex4"
                label="Leña o carbón sin chimenea"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="ex4"
                label="Leña o carbón con chimenea"
                value="red"
                hide-details/>
            </v-flex> 
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Otro combustible"
                value="red"
                hide-details/>
            </v-flex>            
          </v-layout>

          <h4>Agua</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Toma domicilaria"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs5>
              <v-checkbox
                v-model="ex4"
                label="Toma común o fuera de vivienda"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Llave pública"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs5>
              <v-checkbox
                v-model="ex4"
                label="Acarrean de otra vivienda"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Pipa"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Pozo, río, lago"
                value="red"
                hide-details/>
            </v-flex>   
            <v-flex xs3>
              <v-checkbox
                v-model="ex4"
                label="Sin servicio"
                value="red"
                hide-details/>
            </v-flex>            
          </v-layout>

          <v-btn 
            color="primary" 
            @click.native="currentStep = 6">Continuar</v-btn>
        </v-stepper-content>

        <v-stepper-step 
          :complete="currentStep > 6" 
          step="6" 
          editable>
          Infraestructura de vivenda
        </v-stepper-step>
        <v-stepper-content step="6">
          <h4>Tenencia</h4>
          <v-radio-group 
            v-model="radios" 
            :mandatory="false" 
            row>
            <v-radio 
              label="Propia" 
              value="Propia"/>
            <v-radio 
              label="Rentada" 
              value="Rentada"/>
            <v-radio 
              label="Pagándose" 
              value="Pagándose"/>
          </v-radio-group>
          <v-radio-group 
            v-model="radios" 
            :mandatory="false" 
            row>
            <v-radio 
              label="Prestada" 
              value="Prestada"/>
            <v-radio 
              label="Asentamiento irregular" 
              value="Asentamiento irregular"/>
            <v-radio 
              label="Otro" 
              value="Otro"/>
          </v-radio-group>

          <h4>Tipo de casa</h4>
          <v-radio-group 
            v-model="radios" 
            :mandatory="false" 
            row>
            <v-radio 
              label="Independiente" 
              value="Independiente"/>
            <v-radio 
              label="U. Habitacional" 
              value="U. Habitacional"/>
            <v-radio 
              label="Vecindad" 
              value="Vecindad"/>
            <v-radio 
              label="Anexo a casa" 
              value="Anexo a casa"/>
          </v-radio-group>
          <v-radio-group 
            v-model="radios" 
            :mandatory="false" 
            row>
            <v-radio 
              label="Vivienda móvil" 
              value="Vivienda móvil"/>
            <v-radio 
              label="Compartida" 
              value="Compartida"/>
            <v-radio 
              label="Refugio" 
              value="Refugio"/>
          </v-radio-group>

          <h4>Mayor parte de muros</h4>
          <v-radio-group 
            v-model="radios" 
            :mandatory="false" 
            row>
            <v-radio 
              label="Lámina, metálica, asbesto" 
              value="Lámina, metálica, asbesto"/>
            <v-radio 
              label="Madera" 
              value="Madera"/>
            <v-radio 
              label="Adobe" 
              value="Adobe"/>
          </v-radio-group>
          <v-radio-group 
            v-model="radios" 
            :mandatory="false" 
            row>
            <v-radio 
              label="Ladrillo, tabique" 
              value="Ladrillo, tabique"/>
            <v-radio 
              label="Carrizo, bambú" 
              value="Carrizo, bambú"/>
            <v-radio 
              label="Otros" 
              value="Otros"/>
            <v-radio 
              label="Desechos, cartón" 
              value="Desechos, cartón"/>
          </v-radio-group>

          <h4>Mayor parte de piso</h4>
          <v-radio-group 
            v-model="radios" 
            :mandatory="false" 
            row>
            <v-radio 
              label="Madera, duela" 
              value="Madera, duela"/>
            <v-radio 
              label="Mosaico, vinil" 
              value="Mosaico, vinil"/>
            <v-radio 
              label="Cemento o firme" 
              value="Cemento o firme"/>
          </v-radio-group>
          <v-radio-group 
            v-model="radios" 
            :mandatory="false" 
            row>
            <v-radio 
              label="Tierra" 
              value="Tierra"/>
            <v-radio 
              label="Otros" 
              value="Otros"/>
          </v-radio-group>

          <h4>Características</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-select 
                v-model="userType" 
                :items="escolaridades"
                label="No. de cuartos"/> 
            </v-flex>
            <v-flex xs4>
              <v-select 
                v-model="userType" 
                :items="escolaridades"
                label="Cuartos para dormir" />
            </v-flex>
            <v-flex xs4>            
              <v-checkbox
                v-model="ex4"
                label="Cocina separada"
                value="red"
                hide-details/>
              <v-checkbox
                v-model="ex4"
                label="Cuarto de baño exclusivo"
                value="red"
                hide-details/>
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

          <v-layout  
            v-for="(item, index) in houseObjects"
            :key="index"
            wrap>
            <v-flex xs4>
              {{ item }}
            </v-flex>
            <v-flex xs4>
              <v-switch 
                :label="userEnabled" 
                v-model="userEnabled" 
                :true-value="enabledTag" 
                :false-value="disabledTag"/>
            </v-flex>
            <v-flex xs4>
              <v-switch 
                :label="userEnabled" 
                v-model="userEnabled" 
                :true-value="enabledTag" 
                :false-value="disabledTag"/>
            </v-flex>          
          </v-layout>        

          <h4>Condiciones</h4>
          <v-radio-group 
            v-model="radios" 
            :mandatory="false" 
            row>
            <v-radio 
              label="Buena"
              value="Buena"/>
            <v-radio 
              label="Regular" 
              value="Regular"/>
            <v-radio 
              label="Mala" 
              value="Mala"/>
          </v-radio-group>

          <v-btn 
            color="primary" 
            @click.native="currentStep = 7">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step 
          :complete="currentStep > 7" 
          step="7" 
          editable>
          Condiciones económicas
        </v-stepper-step>
        <v-stepper-content step="7">

          <v-layout 
            row 
            wrap>
            <v-flex xs5>
              <h4>Condiciones económicas</h4>
              <v-text-field 
                label="Vivienda" 
                prefix="$"/>
              <v-text-field 
                label="Alimentación" 
                prefix="$"/>
              <v-text-field 
                label="Luz" 
                prefix="$"/>
              <v-text-field 
                label="Gas" 
                prefix="$"/>
              <v-text-field 
                label="Agua" 
                prefix="$"/>
              <v-text-field 
                label="Teléfono" 
                prefix="$"/>
              <v-text-field 
                label="Celular" 
                prefix="$"/>
              <v-text-field 
                label="Atención médica" 
                prefix="$"/>
              <v-text-field 
                label="Educación" 
                prefix="$"/>
              <v-text-field 
                label="Transporte" 
                prefix="$"/>
              <v-text-field 
                label="Otros" 
                prefix="$"/>
            </v-flex>
            <v-flex xs2/>

            <v-flex xs5>
              <h4>Aportación semanal</h4>
              <v-text-field 
                label="Padre" 
                prefix="$"/>
              <v-text-field 
                label="Madre" 
                prefix="$"/>
              <v-text-field 
                label="Hijos" 
                prefix="$"/>
              <v-text-field 
                label="PROSPERA" 
                prefix="$"/>
              <v-text-field 
                label="Adultos mayores" 
                prefix="$"/>
              <v-text-field 
                label="Becas" 
                prefix="$"/>
              <v-text-field 
                label="Pensión" 
                prefix="$"/>
              <v-text-field 
                label="Otros" 
                prefix="$"/>
            </v-flex>
          </v-layout>

          <v-layout 
            row 
            wrap>
            <v-flex xs5>
              <v-text-field 
                label="Total" 
                value="999,999" 
                prefix="$"/>
            </v-flex>

            <v-flex xs2/>

            <v-flex xs5>
              <v-text-field 
                label="Total" 
                value="999,999" 
                prefix="$"/>
            </v-flex>
          </v-layout>

          <h4>Apoyos en especie</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs5>
              <v-text-field label="Tipos de apoyo"/>
              <v-text-field label="Frecuencia del apoyo"/>
            </v-flex>

            <v-flex xs2/>

            <v-flex xs5>
              <v-text-field label="Quien los proporciona"/>
            </v-flex>
          </v-layout>

          <h4>Remesas</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs8>
              ¿Alguien en el hogar recibe dinero proveniente de otros países?"
            </v-flex>

            <v-flex xs4>
              <v-switch 
                :label="userEnabled" 
                v-model="userEnabled" 
                :true-value="enabledTag" 
                :false-value="disabledTag"/>
            </v-flex>
          </v-layout>          
          <v-text-field label="Frecuencia del apoyo"/>

          <v-btn 
            color="primary" 
            @click.native="currentStep = 1">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step 
          :complete="currentStep > 8" 
          step="8" 
          editable>
          Alimentación
        </v-stepper-step>
        <v-stepper-content step="8">
          <h4>Alimentación (En los últimos meses por falta de dinero u otros recursos)</h4>

          <v-layout 
            v-for="(item, index) in alimentationAdultQuestions"
            :key="index"
            wrap>
            <v-flex xs8>
            {{item}}              
            </v-flex>
            <v-flex xs1/>
            <v-flex xs2>
              <v-switch 
                :label="userEnabled" 
                v-model="userEnabled" 
                :true-value="enabledTag" 
                :false-value="disabledTag"/>
            </v-flex>
          </v-layout>

          <br>
          <h4>Si en el hogar no hay personas de menores de 18 años pase a la sección 8. Resultados</h4>
          <br>

          <v-layout 
            v-for="(item, index) in alimentationNoAdultQuestions"
            :key="index"
            wrap>
            <v-flex xs8>
            {{item}}
            </v-flex>
            <v-flex xs1/>
            <v-flex xs2>
              <v-switch 
                v-model="userEnabled" 
                :label="userEnabled" 
                :true-value="enabledTag" 
                :false-value="disabledTag"/>
            </v-flex>
          </v-layout>

          <h3>Estatus</h3>
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-checkbox
                v-model="ex4"
                label="Rechazado"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="ex4"
                label="En espera"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="ex4"
                label="Aprobado"
                value="red"
                hide-details/>
            </v-flex>        
          </v-layout>

          <h3>Tipo</h3>
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-checkbox
                v-model="ex4"
                label="Cuota"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="ex4"
                label="Beca"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="ex4"
                label="Media beca"
                value="red"
                hide-details/>
            </v-flex>        
          </v-layout>

          <h3>Frecuencia</h3>
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-checkbox
                v-model="ex4"
                label="Semanal"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="ex4"
                label="Quincenal"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="ex4"
                label="Mensual"
                value="red"
                hide-details/>
            </v-flex>        
          </v-layout>
      
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-text-field label="Duración en meses"/>
            </v-flex>
          </v-layout>

          <v-btn 
            color="primary" 
            @click.native="currentStep = 1">Continue</v-btn>
        </v-stepper-content>
      </v-stepper>
 
    </div>

    <v-btn 
      :click="saveUser()"
      fixed 
      fab 
      bottom 
      right 
      color="primary">
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
        @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentStep: 0,
      escolaridades: ["Preparatoria", "Secundaria", "Primaria"],

      familyAmount: 1,
      familyStructure: [],

      familyAmountSocialSecurity: 1,

      houseObjects: [
        "Refrigerador",
        "Estufa",
        "VHS, DVD, Blu Ray",
        "Lavadora",
        "Licuadora",
        "Radio",
        "Sala",
        "Comedor",
        "Automóvil",
        "Cama",
        "Celular",
        "Motocicleta",
        "Computadora",
        "Horno",
        "Teléfono"
      ],

      enabledTag: "Sí",
      disabledTag: "No",
      userEnabled: "Sí",

      alimentationAdultQuestions: [
        "¿Alguna vez usted o algún adulto en su hogar tuvo una alimentación basada en poca variedad de alimentos?",
        "¿Alguna vez usted o algún adulto en su hogar comió menos de lo que piensa que debería comer?",
        "¿Alguna vez usted o algún adulto en su hogar dejó de desayunar, comer o cenar?",
        "¿Alguna vez se quedaron sin comida?",
        "¿Alguna vez usted o algún adulto en su hogar sintió hambre pero no comió?",
        "¿Alguna vez usted o algún adulto en su hogar sólo comió una vez al día o dejó de comer durante un día?"
      ],

      alimentationNoAdultQuestions: [
        "¿Alguna vez algún menor de 18 años en su hogar tuvo una alimentación basada en poca variedad de alimentos?",
        "¿Alguna vez algún menor de 18 años en su hogar comió menos de lo que piensa que debería comer?",
        "¿Alguna vez algún menor de 18 años en su hogar dejó de desayunar, comer o cenar?",
        "¿Alguna vez usted en su hogar tuvieron que disminuir la cantidad servida de comida a algún menor de 18 años?",
        "¿Alguna vez algún menor de 18 años en su hogar sintió hambre pero no comió?",
        "¿Alguna vez algún menor de 18 años en su hogar sólo comió una vez al día o dejó de comer durante un día?"
      ],

      usersURL: "http://localhost:5000/api/usuarios",

      password: "",
      repeatPassword: "",

      ex4: undefined,
      radios: undefined,

      name: "",

      userType: undefined,
      userTypes: ["Tipo 1", "Tipo 2", "Tipo 3"],

      group: undefined,
      groupsData: ["Tipo 1", "Tipo 2", "Tipo 3"],

      course: undefined,
      coursesData: ["Tipo 1", "Tipo 2", "Tipo 3"],

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

      // Snackbar config
      snackbar: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 3000,
      confirmationMessage: "El usuario ha sido creado"
    };
  },
  methods: {
    saveUser: function() {
      var vueInstance = this;

      axios
        .post(this.usersURL, {
          nombre: this.name,
          contraseña: this.password,
          tipoUsuario: {
            tipo: this.userType,
            descripción: "---"
          },
          grupo: this.group,
          habilitado: this.userEnabled,
          direccion: {
            calle: this.street,
            numero: this.numberStreet,
            cp: this.cp,
            ciudad: this.city,
            estado: this.state
          },
          curso: {
            id: 1,
            nombre: this.course,
            descripcion: "---",
            calificacion: 0,
            observaciones: "---"
          }
        })
        .then(function(response) {
          vueInstance.snackbar = true;

          vueInstance._routerRoot._router.push({
            name: "editorUsuario",
            params: { id: 1 }
          });
        })
        .catch(function(error) {
          console.log("Error in creation of user");
          console.log(error);
        });
    }
  }
};
</script>

<style scoped type="text/css">
.data-visualization-container {
  margin-left: 10%;
  width: 80%;
}

input {
  width: 30%;
}
</style>
