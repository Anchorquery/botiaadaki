<template>
  <b-container>
    <b-row class="">
      <b-col md="12">
        <b-img
          class="mb-4"
          center
          src="/assets/img/Front/gestion-usuarios.png"
        ></b-img>
        <h3 class="subtitle h4 text-center">
          Gestion de usuarios
        </h3>
        <p class="separador"></p>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col md="3 mb-4">
        <router-link v-if="esMaster" :to="{ name: 'NewUser' }" tag="a"
          ><div class="cajas">
            <b-img
              class="mb-4"
              center
              src="/assets/img/Front/nuevo-usuario.png"
            ></b-img
            ><span>Nuevo usuario</span>
          </div></router-link
        >
      </b-col>
      <b-col v-if="esMaster" md="3 mb-4">
        <router-link :to="{ name: 'master-user' }" tag="a">
          <div class="cajas">
            <b-img
              class="mb-4"
              center
              src="/assets/img/Front/usuario-master.png"
            ></b-img
            ><span>Masters</span>
          </div></router-link
        >
      </b-col>
      <b-col v-if="esMaster" md="3 mb-4">
        <router-link :to="{ name: 'semimaster-user' }" tag="a">
          <div class="cajas">
            <b-img
              class="mb-4"
              center
              src="/assets/img/Front/usuario-semi-master.png"
            ></b-img
            ><span>Semi Master</span>
          </div></router-link
        >
      </b-col>
      <b-col v-if="esMaster" md="3 mb-4">
        <router-link :to="{ name: 'delegados-user' }" tag="a">
          <div class="cajas">
            <b-img
              class="mb-4"
              center
              src="/assets/img/Front/usuarios-delegados.png"
            ></b-img
            ><span>Delegados</span>
          </div></router-link
        >
      </b-col>
      <b-col v-if="esMaster || esDelegado" md="3 mb-4">
        <router-link :to="{ name: 'tecnicos-user' }" tag="a">
          <div class="cajas">
            <b-img
              class="mb-4"
              center
              src="/assets/img/Front/usuarios-tecnicos.png"
            ></b-img
            ><span>Técnicos</span>
          </div></router-link
        >
      </b-col>
      <b-col md="3 mb-4" v-if="!esDcoordinador">
        <router-link :to="{ name: 'distribuidores-user' }" tag="a">
          <div class="cajas">
            <b-img
              class="mb-4"
              center
              src="/assets/img/Front/usuarios-distribuidores.png"
            ></b-img
            ><span>Distribuidores</span>
          </div></router-link
        >
      </b-col>
    </b-row>
    <b-row v-if="esDcoordinador">
      <b-col md="3 mb-4 " class="text-center center">
        <router-link :to="{ name: 'distribuidores-user' }" tag="a">
          <div class="cajas">
            <b-img
              class="mb-4"
              center
              src="/assets/img/Front/usuarios-distribuidores.png"
            ></b-img
            ><span>Mis Distribuidores</span>
          </div></router-link
        >
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "esMaster",
      "esDelegado",
      "esDistribuidor",
      "esTecnico",
      "logueado",
      "esDcoordinador"
    ])
  }
};
</script>
<style>
.body {
  color: black;
}
p,
h1,
h2,
h3,
h4,
h5,
h6,
span {
  color: black;
}
.subtitle {
  font-weight: 600;
}
.cajas {
  text-align: center;

  max-width: 200px;
  /*max-height: 177px;*/
  margin: auto;
  padding: 15px 0;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
}
.separador {
  margin-bottom: 30px;
}
.cajas > span {
  font-weight: 800;
}
.btn-secondary {
  border-radius: 0;
  background: black;
  border: black;
  font-size: 1.1em;
}
</style>
