<template>
  <div>
    <toolbarHandler      
      :key-name="'personas'"/>
        
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
                v-model="representante.comunidad"
                label="Comunidad"/>
            </v-flex>
            <v-flex xs6>
              <v-text-field 
                v-model="representante.nombre"
                label="Nombre del titular"/>
            </v-flex>
          </v-layout>

          <v-flex xs12>
            <v-text-field 
              v-model="representante.responsable"
              label="Nombre de la persona de la cual depende la mayor parte del ingreso del hogar"/>
          </v-flex>

          <h4>Domicilio</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-text-field 
                v-model="representante.domicilio.calle"
                label="Calle"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field 
                v-model="representante.domicilio.colonia"
                label="Colonia" />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="representante.domicilio.municipio" 
                label="Municipio"/>
            </v-flex>            
          </v-layout>

          <v-layout
            row 
            wrap>
            <v-flex xs6>
              <v-text-field
                v-model="representante.domicilio.numExt" 
                label="Número exterior"/>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="representante.domicilio.numInt" 
                label="Número interior"/>
            </v-flex>
          </v-layout>

          <h4>Lugar de Nacimiento</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs6>
              <v-text-field 
                v-model="representante.nacimiento.municipio"
                label="Municio"/>
            </v-flex>
            <v-flex xs6>
              <v-text-field 
                v-model="representante.nacimiento.estado"
                label="Estado"/>
            </v-flex>
          </v-layout>          

          <h4>Escolaridad</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs6>
              <v-select 
                v-model="representante.escolaridad.nivel"
                :items="escolaridades"
                label="Escolaridad"/>
            </v-flex>
            <v-flex xs6>
              <v-radio-group 
                v-model="representante.escolaridad.estado" 
                :mandatory="false">
                <v-radio
                  label="Completa"
                  value="Completa"/>
                <v-radio
                  label="Incompleta"
                  value="Incompleta"/>
                <v-radio
                  label="Estudia"
                  value="Estudia"/>
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
                v-model="datosGenerales.nombre"
                label="Nombre de la comunidad o programa"/>
            </v-flex>
            <v-flex xs6>
              <v-text-field 
                v-model="datosGenerales.grupo"
                label="Grupo"/>
            </v-flex>
          </v-layout>

          <h4>Fecha de levantamiento</h4>
          <v-date-picker 
            v-model="datosGenerales.fechaLevantamiento"
            landscape
            locale="es-mx" 
            reactive/>

          <h4>Fecha de captura</h4>
          <v-date-picker 
            v-model="datosGenerales.fechaCaptura"
            landscape
            locale="es-mx" 
            reactive/>

          <h4>Vialidad</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-select
                v-model="datosGenerales.vialidad.tipo" 
                :items="escolaridades" 
                label="Tipo de vialidad"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field 
                v-model="datosGenerales.vialidad.nombre"
                placeholder="Nombre de vialidad"/>
            </v-flex>        
          </v-layout>

          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-text-field
                v-model="datosGenerales.vialidad.numInt"
                placeholder="Número interior"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="datosGenerales.vialidad.numExt" 
                placeholder="Número exterior"/>
            </v-flex>        
          </v-layout>          

          <h4>Asentamiento</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs6>
              <v-select 
                v-model="datosGenerales.asentamiento.tipo" 
                :items="escolaridades"
                label="Tipo de asentamiento"/>
            </v-flex>
            <v-flex xs6>
              <v-text-field 
                v-model="datosGenerales.asentamiento.nombre"
                placeholder="Nombre de asentamiento"/>
            </v-flex>
          </v-layout>


          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-text-field 
                v-model="datosGenerales.asentamiento.cp"
                placeholder="Código postal"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field 
                v-model="datosGenerales.asentamiento.localidad"
                placeholder="Localidad"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="datosGenerales.asentamiento.municipio" 
                placeholder="Municipio"/>
            </v-flex>            
          </v-layout>
        
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-text-field 
                v-model="datosGenerales.asentamiento.claveMunicipio"
                placeholder="Clave de municipio"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field 
                v-model="datosGenerales.asentamiento.estado"
                placeholder="Estado"/>
            </v-flex>
            <v-flex xs4>
              <v-text-field 
                v-model="datosGenerales.asentamiento.claveEstado"
                placeholder="Clave de estado"/>
            </v-flex>            
          </v-layout>

          <v-text-field 
            v-model="datosGenerales.asentamiento.entreVialidades"
            placeholder="Entre vialidades"/>
          <v-text-field  
            v-model="datosGenerales.asentamiento.descripcion"
            placeholder="Descripción de ubicación"/>
          
          <v-text-field  
            v-model="datosGenerales.asentamiento.telefono"
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
              :key="'estructura-familiar-miembro-familia-'+i">
              <div slot="header">Integrante #{{ i+1 }}: Item</div>

              <v-text-field 
                v-model="estructuraFamiliar.nombre"
                placeholder="Nombre(s)"/>
              <v-text-field 
                v-model="estructuraFamiliar.primerApellido"
                placeholder="Primer apellido"/>
              <v-text-field 
                v-model="estructuraFamiliar.segundoApellido"
                placeholder="Segundo apellido"/>
              <h4>Fecha de nacimiento</h4>
              <v-layout 
                row 
                wrap>
                <v-flex xs6>
                  <v-date-picker 
                    v-model="estructuraFamiliar.fechaNacimiento" 
                    landscape
                    locale="es-mx" 
                    reactive/>
                </v-flex>
                <v-flex xs6>
                  Sexo
                  <v-radio-group 
                    v-model="estructuraFamiliar.sexo" 
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
                    v-model="estructuraFamiliar.estadoCivil" 
                    :items="escolaridades"
                    label="Estado civil"/>
                </v-flex>
                <v-flex xs6>
                  <h4>Parentesco</h4>
                  <v-select
                    v-model="estructuraFamiliar.parentesco" 
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
                    v-model="estructuraFamiliar.escolaridad.grado" 
                    :items="escolaridades"
                    label="Grado"/>
                  <v-select 
                    v-model="estructuraFamiliar.escolaridad.nivel" 
                    :items="escolaridades"
                    label="Nivel"/>
                </v-flex>            
              </v-layout>
              <v-text-field  
                v-model="estructuraFamiliar.escolaridad.escuela"
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
              :key="'seguridad-social-miembro-familia-'+i">
              <div slot="header">Integrante #{{ i+1 }}: Item</div>

              <v-text-field  
                v-model="seguridadSocial.ocupacion"
                placeholder="Ocupación"/>
              <v-select 
                v-model="seguridadSocial.tipoEmpleo"
                :items="tiposDeEmpleo"
                label="Tipo de empleo"/>
              <v-text-field 
                v-if="seguridadSocial.tipoEmpleo === 'Otros'"
                v-model="seguridadSocial.tiposDeEmpleoTxt"
                placeholder="Indique el tipo de empleo"/>
              
              <v-text-field
                v-model="seguridadSocial.oficios"
                placeholder="Oficios conocidos"/>

              <h4>Prestaciones laborales</h4>
              <v-layout 
                row 
                wrap>
                <v-flex xs2>
                  <v-checkbox
                    v-model="seguridadSocial.prestaciones.A"
                    label="A"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="seguridadSocial.prestaciones.B"
                    label="B"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="seguridadSocial.prestaciones.C"
                    label="C"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="seguridadSocial.prestaciones.D"
                    label="D"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="seguridadSocial.prestaciones.E"
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
                    v-model="seguridadSocial.prestaciones.F"
                    label="F"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="seguridadSocial.prestaciones.G"
                    label="G"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="seguridadSocial.prestaciones.H"
                    label="H"
                    value="red"
                    hide-details/>
                </v-flex>
                <v-flex xs2>
                  <v-checkbox
                    v-model="seguridadSocial.prestaciones.I"
                    label="I"
                    value="red"
                    hide-details/>
                </v-flex>
              </v-layout>

              <h4>Jubilación o pensionado</h4>
              <v-radio-group 
                v-model="seguridadSocial.jubiladoPension" 
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
                v-model="seguridadSocial.derechohabiencia"
                label="Derechohabiencia"/>
              <v-text-field 
                v-model="seguridadSocial.motivoDerechohabiencia"
                label="Motivo derechohabiencia"/>
              <v-select 
                v-model="seguridadSocial.discapacidades"
                :items="discapacidades"
                label="Discapacidades"/>
              <v-text-field
                v-if="seguridadSocial.discapacidades === 'Otros'"
                v-model="seguridadSocial.discapacidadesTxt"
                placeholder="Indique la discapacidad"/>                
              <v-text-field 
                v-model="seguridadSocial.padecimientos"
                label="Padecimientos crónicos"/>
              <v-text-field 
                v-model="seguridadSocial.adiciones"
                label="Adiciones"/>

              <v-layout 
                row 
                wrap>
                <v-flex xs4>
                  <h4>Etnia indígena</h4>
                  <v-select 
                    v-model="seguridadSocial.etnia" 
                    :items="escolaridades"
                    label="Etnia indígena"/>
                </v-flex>
                <v-flex xs4>
                  <h4>Peso (kg)</h4>
                  <v-select
                    v-model="seguridadSocial.peso" 
                    :items="escolaridades"
                    label="Peso (kg)"/>
                </v-flex>
                <v-flex xs4>
                  <h4>Talla (cm)</h4>
                  <v-select 
                    v-model="seguridadSocial.talla" 
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
                v-model="servicios.luz.publico"
                label="Servicio público"
                value="true"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.luz.planta"
                label="Planta particular"
                value="true"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.luz.panel"
                label="Panel solar"
                value="true"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.luz.noTiene"
                label="No tiene"
                value="true"
                hide-details/>
            </v-flex>
          </v-layout>

          <h4>Drenaje</h4>
          <v-layout 
            row 
            wrap>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.drenaje.publico"
                label="Red pública"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.drenaje.fosa"
                label="Fosa séptica"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs6>
              <v-checkbox
                v-model="servicios.drenaje.grieta"
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
                v-model="servicios.drenaje.rio"
                label="Tubería que da a un río, lago o mar"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.drenaje.noTiene"
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
                v-model="servicios.baño.descarga"
                label="Descarga directa"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.baño.cubeta"
                label="Agua con cubeta"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.baño.letrina"
                label="Letrina seca"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.baño.pozo"
                label="Pozo u hoyo"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.baño.noTiene"
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
                v-model="servicios.combustible.gasTanque"
                label="Gas tanque"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.combustible.electricidad"
                label="Electricidad"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.combustible.gasNatural"
                label="Gas natural"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="servicios.combustible.sinChimenea"
                label="Leña o carbón sin chimenea"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="servicios.combustible.conChimenea"
                label="Leña o carbón con chimenea"
                value="red"
                hide-details/>
            </v-flex> 
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.combustible.otroCombustible"
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
                v-model="servicios.agua.tomaDomicilaria"
                label="Toma domicilaria"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs5>
              <v-checkbox
                v-model="servicios.agua.tomaComun"
                label="Toma común o fuera de vivienda"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.agua.llavePublica"
                label="Llave pública"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs5>
              <v-checkbox
                v-model="servicios.agua.acarrean"
                label="Acarrean de otra vivienda"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.agua.pipa"
                label="Pipa"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.agua.pozo"
                label="Pozo, río, lago"
                value="red"
                hide-details/>
            </v-flex>   
            <v-flex xs3>
              <v-checkbox
                v-model="servicios.agua.sinServicio"
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
            v-model="infraestructuraVivienda.tenencia" 
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
            v-model="infraestructuraVivienda.tenencia" 
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
            v-model="infraestructuraVivienda.tipoCasa" 
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
            v-model="infraestructuraVivienda.tipoCasa" 
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
            v-model="infraestructuraVivienda.muros" 
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
            v-model="infraestructuraVivienda.muros" 
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
            v-model="infraestructuraVivienda.piso" 
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
            v-model="infraestructuraVivienda.piso"
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
                v-model="infraestructuraVivienda.caracteristicas.numCuartos" 
                :items="escolaridades"
                label="No. de cuartos"/> 
            </v-flex>
            <v-flex xs4>
              <v-select 
                v-model="infraestructuraVivienda.caracteristicas.dormitorios" 
                :items="escolaridades"
                label="Cuartos para dormir" />
            </v-flex>
            <v-flex xs4>            
              <v-checkbox
                v-model="infraestructuraVivienda.caracteristicas.cocinaSeparada"
                label="Cocina separada"
                value="true"
                hide-details/>
              <v-checkbox
                v-model="infraestructuraVivienda.caracteristicas.bañoExclusivo"
                label="Cuarto de baño exclusivo"
                value="true"
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
            :key="'equipamiento-'+index"
            wrap>
            <v-flex xs4>
              {{ item.text }}
            </v-flex>
            <v-flex xs4>
              <v-switch 
                v-if="infraestructuraVivienda.objetosCaseros.tiene[index] !== null"
                :label="infraestructuraVivienda.objetosCaseros.tiene[index]" 
                v-model="infraestructuraVivienda.objetosCaseros.tiene[index]"
                :true-value="enabledTag"
                :false-value="disabledTag"/>
              <v-switch 
                v-else
                :label="disabledTag" 
                v-model="infraestructuraVivienda.objetosCaseros.tiene[index]"
                :true-value="enabledTag"
                :false-value="disabledTag"/>                
            </v-flex>
            <v-flex xs4>
              <v-switch 
                v-if="infraestructuraVivienda.objetosCaseros.sirve[index] !== null"
                :label="infraestructuraVivienda.objetosCaseros.sirve[index]" 
                v-model="infraestructuraVivienda.objetosCaseros.sirve[index]"
                :true-value="enabledTag" 
                :false-value="disabledTag"/>
              <v-switch
                v-else
                :label="disabledTag" 
                v-model="infraestructuraVivienda.objetosCaseros.sirve[index]"
                :true-value="enabledTag" 
                :false-value="disabledTag"/>
            </v-flex>          
          </v-layout>        

          <v-flex xs4>
            <v-text-field 
              v-model="infraestructuraVivienda.ventiladores"
              type="number"
              label="Cantidad de ventiladores en el hogar"/>
          </v-flex>

          <h4>Insumos para el trabajo o bienes productivos</h4>
          <v-text-field 
            v-model="infraestructuraVivienda.insumos"
            label="Máquina de coser, herramientas de construcción, insumos de cocina u otros"/>

          <h4>Condiciones</h4>
          <v-radio-group 
            v-model="infraestructuraVivienda.condiciones" 
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
              <h4>Gastos del hogar</h4>
              <v-text-field
                v-model="condicionesEconomicas.vivienda"
                label="Vivienda"
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.alimentacion" 
                label="Alimentación" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.luz"
                label="Luz" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.gas"
                label="Gas" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.agua"
                label="Agua" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.telefono"
                label="Teléfono" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.celular"
                label="Celular" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.atencionMedica"
                label="Atención médica" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.educacion"
                label="Educación" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.transporte"
                label="Transporte" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.otros"
                label="Otros" 
                prefix="$"/>
            </v-flex>
            <v-flex xs2/>

            <v-flex xs5>
              <h4>Aportación semanal</h4>
              <v-text-field
                v-model="condicionesEconomicas.aportacionSemanal.padre"
                label="Padre" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.aportacionSemanal.madre"
                label="Madre" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.aportacionSemanal.hijos"
                label="Hijos" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.aportacionSemanal.prospera"
                label="PROSPERA" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.aportacionSemanal.adultosMayores"
                label="Adultos mayores" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.aportacionSemanal.becas"
                label="Becas" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.aportacionSemanal.pension"
                label="Pensión" 
                prefix="$"/>
              <v-text-field
                v-model="condicionesEconomicas.aportacionSemanal.otros"
                label="Otros" 
                prefix="$"/>
            </v-flex>
          </v-layout>

          <v-layout 
            row 
            wrap>
            <v-flex xs5>
              <v-text-field
                v-model="condicionesEconomicas.total" 
                label="Total" 
                value="999,999" 
                prefix="$"/>
            </v-flex>

            <v-flex xs2/>

            <v-flex xs5>
              <v-text-field
                v-model="condicionesEconomicas.aportacionSemanal.total" 
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
              <v-text-field 
                v-model="condicionesEconomicas.apoyoEspecie.tipos"
                label="Tipos de apoyo"/>
              <v-text-field
                v-model="condicionesEconomicas.apoyoEspecie.quienProporciona"
                label="Frecuencia del apoyo"/>
            </v-flex>

            <v-flex xs2/>

            <v-flex xs5>
              <v-text-field
                v-model="condicionesEconomicas.apoyoEspecie.frecuencia"
                label="Quien los proporciona"/>
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
                v-model="condicionesEconomicas.remesas.recibe" 
                :true-value="enabledTag" 
                :false-value="disabledTag"/>
            </v-flex>
          </v-layout>          
          <v-text-field
            v-model="condicionesEconomicas.remesas.frecuencia"
            label="Frecuencia del apoyo"/>

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
            :key="'pregunta-mayores-'+index"
            wrap>
            <v-flex xs8>
              {{ item }}
            </v-flex>
            <v-flex xs1/>
            <v-flex xs2>
              <v-switch 
                :label="userEnabled" 
                v-model="alimentacion.adultos[index]"
                :true-value="enabledTag" 
                :false-value="disabledTag"/>
            </v-flex>
          </v-layout>

          <br>
          <h4>Si en el hogar no hay personas de menores de 18 años pase a la sección 8. Resultados</h4>
          <br>

          <v-layout 
            v-for="(item, index) in alimentationMinorsQuestions"
            :key="'pregunta-menores-'+index"
            wrap>
            <v-flex xs8>
              {{ item }}
            </v-flex>
            <v-flex xs1/>
            <v-flex xs2>
              <v-switch 
                v-model="alimentacion.menores[index]" 
                :label="userEnabled" 
                :true-value="enabledTag" 
                :false-value="disabledTag"/>
            </v-flex>
          </v-layout>

          <h3>Estatus</h3>
          <v-layout 
            row 
            wrap>
            <v-radio-group 
              v-model="alimentacion.estatus" 
              :mandatory="false" 
              row>
              <v-radio 
                label="Rechazado"
                value="red"/>
              <v-radio 
                label="En espera"
                value="red"/>
              <v-radio 
                label="Aprobado"
                value="red"/>
            </v-radio-group>     
          </v-layout>

          <h3>Tipo</h3>
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-checkbox
                v-model="alimentacion.tipo.cuota"
                label="Cuota"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="alimentacion.tipo.beca"
                label="Beca"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="alimentacion.tipo.mediaBeca"
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
                v-model="alimentacion.frecuencia.semanal"
                label="Semanal"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="alimentacion.frecuencia.quincenal"
                label="Quincenal"
                value="red"
                hide-details/>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                v-model="alimentacion.frecuencia.mensual"
                label="Mensual"
                value="red"
                hide-details/>
            </v-flex>        
          </v-layout>
      
          <v-layout 
            row 
            wrap>
            <v-flex xs4>
              <v-text-field 
                v-model="alimentacion.duracion"
                label="Duración en meses"/>
            </v-flex>
          </v-layout>

          <v-btn 
            color="primary" 
            @click.native="currentStep = 1">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step 
          :complete="currentStep > 9" 
          step="9" 
          editable>
          Preguntas adicionales - Ahorro e inclusión financiera
        </v-stepper-step>

        <v-stepper-content step="9">

          <h4>Inclusión financiera</h4>
          <v-select 
            v-model="adicionales.institucion"
            :items="instituciones"
            label="¿Trabaja para una institución de gobierno?"/>

          <h4>Jornada laboral</h4>
          <v-select 
            v-model="adicionales.cantidadDeTrabajo"
            :items="cantidadesDeTrabajo"
            label=" La semana pasada, ¿tuvo poco trabajo que hacer?"/>

          <h4>Ahorro</h4>
          <v-select 
            v-model="adicionales.ahorro"
            :items="montosAhorro"
            label=" Si ahorra ¿Cuál es el monto que tiene ahorrado actualmente?"/>

          <v-select 
            v-model="adicionales.frecuenciaAhorro"
            :items="frecuenciasAhorro"
            label=" Si ahorra ¿Usted ahorra al menos cada ...?"/>
          <v-btn 
            color="primary" 
            @click.native="currentStep = 1">Continue</v-btn>
        </v-stepper-content>        
      </v-stepper>
 
    </div>

    <v-btn
      fixed 
      fab 
      bottom 
      right 
      color="primary"
      @click="saveBeneficiarie">
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
import toolbarHandler from "../toolbars/toolbarHandler";

export default {
  components: {
    toolbarHandler
  },
  data() {
    return {
      currentStep: 0,
      escolaridades: ["Preparatoria", "Secundaria", "Primaria"],

      tiposDeEmpleo: [
        "Preparación y venta de alimentos",
        "Comercio de abarrotes",
        "Comercio de textiles, accesorios y calzado",
        "Fabricación de textiles y prendas de vestir ",
        "Mantenimiento y reparación de maquinaria",
        "Mantenimiento y reparación de automotres ",
        "Otros"
      ],

      discapacidades: [
        "Discapacidad para comunicarse",
        "Discapacidad motriz",
        "Discapacidad mental",
        "Discapacidad múltiple",
        "Se desconoce",
        "Otros"
      ],

      familyAmount: 1,
      familyAmountSocialSecurity: 1,

      houseObjects: [
        { text: "Refrigerador", key: "refrigerador" },
        { text: "Estufa", key: "estufa" },
        { text: "VHS, DVD, Blu Ray", key: "video" },
        { text: "Lavadora", key: "lavadora" },
        { text: "Licuadora", key: "licuadora" },
        { text: "Radio", key: "radio" },
        { text: "Sala", key: "sala" },
        { text: "Comedor", key: "comedor" },
        { text: "Automóvil", key: "automovil" },
        { text: "Cama", key: "cama" },
        { text: "Celular", key: "celular" },
        { text: "Motocicleta", key: "motocicleta" },
        { text: "Computadora", key: "computadora" },
        { text: "Horno", key: "horno" },
        { text: "Teléfono", key: "telefono" },
        { text: "Fregadero o tarja", key: "fregadero" },
        { text: "Horno de microondas", key: "microondas" }
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

      alimentationMinorsQuestions: [
        "¿Alguna vez algún menor de 18 años en su hogar tuvo una alimentación basada en poca variedad de alimentos?",
        "¿Alguna vez algún menor de 18 años en su hogar comió menos de lo que piensa que debería comer?",
        "¿Alguna vez algún menor de 18 años en su hogar dejó de desayunar, comer o cenar?",
        "¿Alguna vez usted en su hogar tuvieron que disminuir la cantidad servida de comida a algún menor de 18 años?",
        "¿Alguna vez algún menor de 18 años en su hogar sintió hambre pero no comió?",
        "¿Alguna vez algún menor de 18 años en su hogar sólo comió una vez al día o dejó de comer durante un día?"
      ],

      instituciones: [
        "Poder judicial o poder legislativo",
        "Empresa pública o paraestatal",
        "Escuelas,  hospitales,  clínicas  y  servicios asistenciales administrados por el gobierno",
        "Gobierno o dependencias federales",
        "Gobierno del estado (incluye Distrito Federal)",
        "Gobierno del municipio (incluye delegaciones del Distrito Federal)",
        "Ninguna de las anteriores",
        "NS"
      ],

      cantidadesDeTrabajo: [
        "Sí",
        "No trabajó la semana pasada",
        "No se encontró en esa situación",
        "NS"
      ],

      montosAhorro: ["0-1500", "1501-4500", "4501-7500", "Más de 7500"],
      frecuenciasAhorro: ["Semana", "Mes", "Seis meses", "Año"],

      //usersURL: "http://localhost:5000/api/usuarios",

      // Step 1
      representante: {
        comunidad: "",
        nombre: "",
        responsable: "",

        domicilio: {
          calle: "",
          colonia: "",
          municipio: "",
          numExt: "",
          numInt: ""
        },

        nacimiento: {
          municipio: "",
          estado: ""
        },

        escolaridad: {
          nivel: "",
          estado: ""
        }
      },
      // Step 2
      datosGenerales: {
        nombre: undefined,
        grupo: undefined,
        fechaLevantamiento: undefined,
        fechaCaptura: undefined,

        vialidad: {
          tipo: undefined,
          nombre: undefined,
          numInt: undefined,
          numExt: undefined
        },

        asentamiento: {
          tipo: undefined,
          nombre: undefined,
          cp: undefined,
          localidad: undefined,
          municipio: undefined,
          claveMunicipio: undefined,
          estado: undefined,
          claveEstado: undefined,
          entreVialidades: undefined,
          descripcion: undefined,
          telefono: undefined
        }
      },
      // Step 3
      estructuraFamiliar: {
        nombre: undefined,
        primerApellido: undefined,
        segundoApellido: undefined,
        fechaNacimiento: undefined,
        sexo: undefined,
        estadoCivil: undefined,
        parentesco: undefined,

        escolaridad: {
          grado: undefined,
          nivel: undefined,
          escuela: undefined
        }
      },
      // Step 4
      seguridadSocial: {
        ocupacion: undefined,
        tipoEmpleo: undefined,
        tiposDeEmpleoTxt: undefined,
        oficios: undefined,

        prestaciones: {
          A: undefined,
          B: undefined,
          C: undefined,
          D: undefined,
          E: undefined,
          F: undefined,
          G: undefined,
          H: undefined,
          I: undefined
        },

        jubiladoPension: undefined,
        derechohabiencia: undefined,
        motivoDerechohabiencia: undefined,
        discapacidades: undefined,
        discapacidadesTxt: undefined,
        padecimientos: undefined,
        adiciones: undefined,
        etnia: undefined,
        peso: undefined,
        talla: undefined
      },
      // Step 5
      servicios: {
        luz: {
          publico: undefined,
          planta: true,
          panel: undefined,
          noTiene: undefined
        },

        drenaje: {
          publico: undefined,
          fosa: undefined,
          grieta: undefined,
          rio: undefined,
          noTiene: undefined
        },

        baño: {
          descarga: undefined,
          cubeta: undefined,
          letrina: undefined,
          pozo: undefined,
          noTiene: undefined,
          gasTanque: undefined,
          electricidad: undefined,
          gasNatural: undefined,
          sinChimenea: undefined,
          conChimenea: undefined,
          otroCombustible: undefined
        },

        combustible: {
          descarga: undefined,
          cubeta: undefined,
          letrina: undefined,
          pozo: undefined,
          noTiene: undefined,
          gasTanque: undefined,
          electricidad: undefined,
          gasNatural: undefined,
          sinChimenea: undefined,
          conChimenea: undefined,
          otroCombustible: undefined
        },

        agua: {
          tomaDomicilaria: undefined,
          tomaComun: undefined,
          llavePublica: undefined,
          acarrean: undefined,
          pipa: undefined,
          pozo: undefined,
          sinServicio: undefined
        }
      },
      // Step 6
      infraestructuraVivienda: {
        tenencia: undefined,
        tipoCasa: undefined,
        muros: undefined,
        piso: undefined,

        caracteristicas: {
          numCuartos: undefined,
          dormitorios: undefined,
          cocinaSeparada: undefined,
          bañoExclusivo: undefined
        },

        objetosCaseros: {
          tiene: [],
          sirve: []
        },
        ventiladores: undefined,
        insumos: undefined,
        condiciones: undefined
      },
      // Step 7
      condicionesEconomicas: {
        vivienda: undefined,
        alimentacion: undefined,
        luz: undefined,
        gas: undefined,
        agua: undefined,
        telefono: undefined,
        celular: undefined,
        atencionMedica: undefined,
        educacion: undefined,
        transporte: undefined,
        otros: undefined,
        total: undefined,

        aportacionSemanal: {
          padre: undefined,
          madre: undefined,
          hijos: undefined,
          prospera: undefined,
          adultosMayores: undefined,
          becas: undefined,
          pension: undefined,
          otros: undefined,
          total: undefined
        },

        apoyoEspecie: {
          tipos: undefined,
          quienProporciona: undefined,
          frecuencia: undefined
        },

        remesas: {
          recibe: undefined,
          frecuencia: undefined
        }
      },
      // Step 8
      alimentacion: {
        adultos: [],
        menores: [],
        estatus: undefined,

        tipo: {
          cuota: undefined,
          beca: undefined,
          mediaBeca: undefined
        },

        frecuencia: {
          semanal: undefined,
          quincenal: undefined,
          mensual: undefined
        },

        duracion: undefined
      },
      // Step 9
      adicionales: {
        institucion: undefined,
        cantidadDeTrabajo: undefined,
        ahorro: undefined,
        frecuenciaAhorro: undefined
      },

      // Snackbar config
      snackbar: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 3000,
      confirmationMessage: "El beneficiario ha sido creado"
    };
  },
  created() {
    this.initializeVariables();
  },
  methods: {
    saveBeneficiarie: function() {
      var vueInstance = this;

      axios
        .post(this.usersURL, {
          representante: this.representante,
          datosGenerales: this.datosGenerales,
          estructuraFamiliar: this.estructuraFamiliar,
          seguridadSocial: this.seguridadSocial,
          servicios: this.servicios,
          infraestructuraVivienda: this.infraestructuraVivienda,
          condicionesEconomicas: this.condicionesEconomicas,
          alimentacion: this.alimentacion,
          adicionales: this.adicionales
        })
        .then(function(response) {
          vueInstance.snackbar = true;

          vueInstance._routerRoot._router.push({
            name: "editorBeneficiario",
            params: { id: 1 }
          });
        })
        .catch(function(error) {
          console.log("Error durante la creación del beneficiario");
          console.log(error);
        });
    },
    initializeVariables: function() {
      this.initializeStepOne();
      this.initializeStepTwo();
      this.initializeStepThree();
      this.initializeStepFour();
      this.initializeStepFive();
      this.initializeStepSix();
      this.initializeStepSeven();
      this.initializeStepEight();
      this.initializeStepNine();
    },
    initializeStepOne: function() {
      this.representante.comunidad = "";
      this.representante.nombre = "";
      this.representante.representante = "";

      this.representante.domicilio.calle = "";
      this.representante.domicilio.colonia = "";
      this.representante.domicilio.municipio = "";
      this.representante.domicilio.numExt = "";
      this.representante.domicilio.numInt = "";

      this.representante.nacimiento.municipio = "";
      this.representante.nacimiento.estado = "";

      this.representante.escolaridad.nivel = "";
      this.representante.escolaridad.estado = "";
    },
    initializeStepTwo: function() {
      this.datosGenerales.nombre = undefined;
      this.datosGenerales.grupo = undefined;

      this.datosGenerales.fechaLevantamiento = undefined;
      this.datosGenerales.fechaCaptura = undefined;

      this.datosGenerales.vialidad.tipo = undefined;
      this.datosGenerales.vialidad.nombre = undefined;
      this.datosGenerales.vialidad.numInt = undefined;
      this.datosGenerales.vialidad.numExt = undefined;

      this.datosGenerales.asentamiento.tipo = undefined;
      this.datosGenerales.asentamiento.nombre = undefined;
      this.datosGenerales.asentamiento.cp = undefined;
      this.datosGenerales.asentamiento.localidad = undefined;
      this.datosGenerales.asentamiento.municipio = undefined;
      this.datosGenerales.asentamiento.claveMunicipio = undefined;
      this.datosGenerales.asentamiento.estado = undefined;
      this.datosGenerales.asentamiento.claveEstado = undefined;
      this.datosGenerales.asentamiento.entreVialidades = undefined;
      this.datosGenerales.asentamiento.descripcion = undefined;
      this.datosGenerales.asentamiento.telefono = undefined;
    },
    initializeStepThree: function() {
      this.estructuraFamiliar.nombre = undefined;
      this.estructuraFamiliar.primerApellido = undefined;
      this.estructuraFamiliar.segundoApellido = undefined;
      this.estructuraFamiliar.fechaNacimiento = undefined;
      this.estructuraFamiliar.sexo = undefined;

      this.estructuraFamiliar.estadoCivil = undefined;
      this.estructuraFamiliar.parentesco = undefined;

      this.estructuraFamiliar.escolaridad.grado = undefined;
      this.estructuraFamiliar.escolaridad.nivel = undefined;
      this.estructuraFamiliar.escolaridad.escuela = undefined;
    },
    initializeStepFour: function() {
      this.seguridadSocial.ocupacion = undefined;
      this.seguridadSocial.tipoEmpleo = undefined;
      this.seguridadSocial.tiposDeEmpleoTxt = undefined;
      this.seguridadSocial.oficios = undefined;

      this.seguridadSocial.prestaciones.A = undefined;
      this.seguridadSocial.prestaciones.B = undefined;
      this.seguridadSocial.prestaciones.C = undefined;
      this.seguridadSocial.prestaciones.D = undefined;
      this.seguridadSocial.prestaciones.E = undefined;
      this.seguridadSocial.prestaciones.F = undefined;
      this.seguridadSocial.prestaciones.G = undefined;
      this.seguridadSocial.prestaciones.H = undefined;
      this.seguridadSocial.prestaciones.I = undefined;

      this.seguridadSocial.jubiladoPension = undefined;
      this.seguridadSocial.derechohabiencia = undefined;
      this.seguridadSocial.motivoDerechohabiencia = undefined;
      this.seguridadSocial.discapacidades = undefined;
      this.seguridadSocial.discapacidadesTxt = undefined;
      this.seguridadSocial.padecimientos = undefined;
      this.seguridadSocial.adiciones = undefined;
      this.seguridadSocial.etnia = undefined;
      this.seguridadSocial.peso = undefined;
      this.seguridadSocial.talla = undefined;
    },
    initializeStepFive: function() {
      this.servicios.luz.publico = undefined;
      this.servicios.luz.planta = true;
      this.servicios.luz.panel = undefined;
      this.servicios.luz.noTiene = undefined;

      this.servicios.drenaje.publico = undefined;
      this.servicios.drenaje.fosa = undefined;
      this.servicios.drenaje.grieta = undefined;
      this.servicios.drenaje.rio = undefined;
      this.servicios.drenaje.noTiene = undefined;

      this.servicios.baño.descarga = undefined;
      this.servicios.baño.cubeta = undefined;
      this.servicios.baño.letrina = undefined;
      this.servicios.baño.pozo = undefined;
      this.servicios.baño.noTiene = undefined;

      this.servicios.combustible.gasTanque = undefined;
      this.servicios.combustible.electricidad = undefined;
      this.servicios.combustible.gasNatural = undefined;
      this.servicios.combustible.sinChimenea = undefined;
      this.servicios.combustible.conChimenea = undefined;
      this.servicios.combustible.otroCombustible = undefined;

      this.servicios.agua.tomaDomicilaria = undefined;
      this.servicios.agua.tomaComun = undefined;
      this.servicios.agua.llavePublica = undefined;
      this.servicios.agua.acarrean = undefined;
      this.servicios.agua.pipa = undefined;
      this.servicios.agua.pozo = undefined;
      this.servicios.agua.sinServicio = undefined;
    },
    initializeStepSix: function() {
      this.infraestructuraVivienda.tenencia = undefined;
      this.infraestructuraVivienda.tipoCasa = undefined;
      this.infraestructuraVivienda.muros = undefined;
      this.infraestructuraVivienda.piso = undefined;

      this.infraestructuraVivienda.caracteristicas.numCuartos = undefined;
      this.infraestructuraVivienda.caracteristicas.dormitorios = undefined;
      this.infraestructuraVivienda.caracteristicas.cocinaSeparada = undefined;
      this.infraestructuraVivienda.caracteristicas.bañoExclusivo = undefined;

      /* Once API is working
      for (var i = 0; i < this.houseObjects.length; i++) {
        var newKey = this.houseObjects[i].key;

        this.infraestructuraVivienda.objetosCaseros[newKey] = {};
        this.infraestructuraVivienda.objetosCaseros[newKey].tiene = false;
        this.infraestructuraVivienda.objetosCaseros[newKey].sirve = false;
      }
      */

      this.infraestructuraVivienda.caracteristicas.ventiladores = undefined;
      this.infraestructuraVivienda.caracteristicas.insumos = undefined;
      this.infraestructuraVivienda.condiciones = undefined;
    },
    initializeStepSeven: function() {
      this.condicionesEconomicas.vivienda = undefined;
      this.condicionesEconomicas.alimentacion = undefined;
      this.condicionesEconomicas.luz = undefined;
      this.condicionesEconomicas.gas = undefined;
      this.condicionesEconomicas.agua = undefined;
      this.condicionesEconomicas.telefono = undefined;
      this.condicionesEconomicas.celular = undefined;
      this.condicionesEconomicas.atencionMedica = undefined;
      this.condicionesEconomicas.educacion = undefined;
      this.condicionesEconomicas.transporte = undefined;
      this.condicionesEconomicas.otros = undefined;
      this.condicionesEconomicas.total = undefined;

      this.condicionesEconomicas.aportacionSemanal.padre = undefined;
      this.condicionesEconomicas.aportacionSemanal.madre = undefined;
      this.condicionesEconomicas.aportacionSemanal.hijos = undefined;
      this.condicionesEconomicas.aportacionSemanal.prospera = undefined;
      this.condicionesEconomicas.aportacionSemanal.adultosMayores = undefined;
      this.condicionesEconomicas.aportacionSemanal.becas = undefined;
      this.condicionesEconomicas.aportacionSemanal.pension = undefined;
      this.condicionesEconomicas.aportacionSemanal.otros = undefined;
      this.condicionesEconomicas.aportacionSemanal.total = undefined;

      this.condicionesEconomicas.apoyoEspecie.tipos = undefined;
      this.condicionesEconomicas.apoyoEspecie.quienProporciona = undefined;
      this.condicionesEconomicas.apoyoEspecie.frecuencia = undefined;

      this.condicionesEconomicas.remesas.recibe = undefined;
      this.condicionesEconomicas.remesas.frecuencia = undefined;
    },
    initializeStepEight: function() {
      this.alimentacion.adultos = [];
      this.alimentacion.menores = [];
      this.alimentacion.estatus = undefined;

      this.alimentacion.tipo.cuota = undefined;
      this.alimentacion.tipo.beca = undefined;
      this.alimentacion.tipo.mediaBeca = undefined;

      this.alimentacion.frecuencia.semanal = undefined;
      this.alimentacion.frecuencia.quincenal = undefined;
      this.alimentacion.frecuencia.mensual = undefined;

      this.alimentacion.duracion = undefined;
    },
    initializeStepNine: function() {
      this.adicionales.institucion = undefined;
      this.adicionales.cantidadDeTrabajo = undefined;
      this.adicionales.ahorro = undefined;
      this.adicionales.frecuenciaAhorro = undefined;
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
