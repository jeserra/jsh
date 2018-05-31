<template>
    <div class="register-app-container">
        <toolbar-handler/>
        <v-layout row wrap>

        <v-flex xs1>
        </v-flex>

        <v-flex xs8>
            <h2>Inicio de sesión</h2>

            <v-text-field
            label="Correo eléctronico"
            v-model="loginInput.txtEmail"
            required
            ></v-text-field>

            <v-text-field
            label="Contraseña"
            v-model="loginInput.txtPassword"
            :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (hidePassword = !hidePassword)"
            :type="hidePassword ? 'password' : 'text'"
            counter></v-text-field>

            <p id="loginWarningMessage" class="warning-message">{{loginWarningMessage}}</p>
            <v-btn
                id="btnLogin"
                v-on:click="Login()">
                Iniciar sesión
            </v-btn>

            <v-btn
                id="btnLogout"
                v-on:click="LogOut()"
                style="display:none">
                Cerrar sesión
            </v-btn>

            <v-flex xs>
            </v-flex>

            <br>
            <a>¿Problemas para iniciar sesión? Haz click aqui</a>
            <br>
            <router-link :to="{ name: 'register' }">¿No tienes cuenta? Pulsa aqui para registrarte</router-link>

        </v-flex>
        </v-layout>
    </div>
</template>

<script>
import toolbarHandler from "./toolbars/toolbarHandler";
export default {
  components: {
    toolbarHandler
  },
  data() {
    return {
      hidePassword: true,

      loginInput: {
        txtEmail: null,
        txtPassword: null
      },
      loginWarningMessage: null
    };
  }
};
</script>

<style type="text/css">
.register-app-container {
  width: 80%;
  color: black;
  margin-top: 15px;
  margin-left: 10%;

  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-around;
  justify-content: space-around;
}

.warning-message {
  color: red;
  max-width: 50%;
}

#signUpWarningMessage {
  color: red;
}

#profile-details-section {
  max-width: 40%;
}

#country-selector {
  width: 35%;
}
</style>