<template>
  <header>
    <b-navbar toggleable="lg" class="bg-dark mb-4" type="dark">
      <div class="container-fluid">
        <router-link style="display: flex;
    align-items: center;" tag="a" :to="{name:'home'}"
          ><span class="logo-single"></span>
          <strong class="white border-left pl-4 text-big">Área privada</strong>
        </router-link>
      <div class="user d-inline-block">
        <span class=" white mr-1 nombre-top">Bienvenido {{ this.$store.state.user.currentUser.nombre }}</span>
  
        <div class="position-relative d-sm-inline-block">
          <div class="btn-group">
            <b-button
              variant="empty"
              class="header-icon btn-sm"
              @click="signOut"
            >
              <i class="simple-icon-logout white" />
            </b-button>
          </div>
        </div>
      </div>
      </div>
    </b-navbar>
    <!--<div>
      <div class="container">
        <b-nav>
          <b-nav-item class="navs-home" :to="{name: 'home'}" :class="this.$route.path == '/app/home' ? 'active' : ''">Inicio</b-nav-item>
          <b-nav-item v-if="esDistribuidor || esMaster || esDelegado || esAutoSat || (esSemi && currentUser.pedidos)" @click.prevent="enrutarcion('distribuidores')"  class="navs-home" >Distribuidores</b-nav-item>
          <b-nav-item v-if="esTecnico || esMaster || esDelegado || esAutoSat || ((esSemi && currentUser.pedidos_repuesto) || (esSemi && currentUser.puestas_en_marcha) || (esSemi && currentUser.puestas_en_marcha) )" class="navs-home" @click.prevent="enrutarcion('tecnicos')">Servicio técnico</b-nav-item>
        </b-nav>
      </div>
    </div>-->

  </header>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
    
    computed: {
    ...mapGetters([
      "esMaster",
      "esDistribuidor",
      "esTecnico",
      "esDelegado",
      "logueado",
      "esAutoSat",
      "currentUser",
      "esSemi"

     
    ]) 
  },
  methods:{
    ...mapActions(["signOut"]),
    ...mapMutations(['setMenuSidebar']),
    enrutarcion(val){

      this.setMenuSidebar(val)

      this.$router.push({name:`${val}-tutorial` })


    },
    logout() {
      this.signOut().then(() => {
        this.$router.push("/user/login");
      });
    },
  }
};
</script>
<style>
.logo-text {
  font-family: "Nunito", sans-serif;
  font-stretch: condensed;
  font-weight: 800;
  font-size: 1.2em;
  color: black;
}
@media (min-width: 320px) {
  .logo-text {
    font-size: 80%;
  }
}
.navs-home a{

    font-size: 1.3em;
    font-weight: 800;
    color: black;
    text-transform: uppercase;

}
.navs-home.active a::after{
    content: '';
    position: relative;
    display: block;
    height: 2px;
    margin: auto;
    width: 80%;
    background: black;
}
</style>
