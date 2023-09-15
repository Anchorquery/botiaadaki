<template>
  <home-layout>
    <b-container fluid class="mt-4">
      <b-row>
        <b-col md="3">
          <div class="px-3 py-2">
            <div
              style="
                display: flex;
                justify-content: space-around;
                flex-direction: column;
                background: gray;
                padding: 40px;
              "
            >
              <avatar
                :size="150"
                :username="usuario.nombre + ' ' + usuario.apellidos"
                backgroundColor="black"
                color="white"
                :customStyle="{
                  margin: 'auto',
                  'margin-bottom': '20px',
                }"
              ></avatar>
              <p style="margin: auto; color: white; font-weight: 600">
                {{ usuario.nombre + " " + usuario.apellidos }}
              </p>
            </div>
            <b-card
              tag="article"
              style=""
              class="mb-2 card-sombra text-center sidebar-menu"
            >
              <div clas="d-flex" style="display: flex; align-items: center">
                <b-img
                  thumbnail
                  src="/assets/img/Front/telefono.png"
                  alt="Image 3"
                ></b-img>
                <p class="mb-0">
                  <span style="color: black">{{ usuario.telefono }}</span>
                </p>
              </div>
              <div clas="d-flex" style="display: flex; align-items: center">
                <b-img
                  thumbnail
                  src="/assets/img/Front/email.png"
                  alt="Image 3"
                ></b-img>
                <p class="mb-0">
                  <span style="color: black">{{ usuario.email }}</span>
                </p>
              </div>
              <div v-if="usuario.province" clas="d-flex" style="display: flex; align-items: center">
                <b-img
                  thumbnail
                  src="/assets/img/Front/direccion.png"
                  alt="Image 3"
                ></b-img>
                <p class="mb-0">
                  <span style="color: black">{{ usuario.province.nombre }}</span>
                </p>
              </div>
            </b-card>
          </div>
        </b-col>
        <b-col md="9">
          <b-row class="">
            <b-col md="12">
              <b-img
                class="mb-4"
                center
                src="/assets/img/Front/palmas.png"
              ></b-img>
              <h3 class="subtitle h4 text-center">
                ¡Bienvenido al ÁREA PRIVADA!
              </h3>
              <p class="text-center">
                Para facilitar y agilizar algunas tareas hemos apostado por la
                automatización de la Asistencia Técnica. <br />
                ¡Esperemos que le sea de utilidad!
              </p>
              <p class="separador"></p>
              <div class="botonera" style="display: flex;justify-content: center;">
              <b-button variant="primary" v-if="esDistribuidor || esDcoordinador || esMaster || esDelegado || esAutoSat || (esSemi && currentUser.pedidos)" @click.prevent="enrutarcion('distribuidores')"  class="text-uppercase" style="font-weight: 700;border-radius: 7px;padding: 7px 17px;">Distribuidores</b-button>
              <b-button variant="primary" v-if="esTecnico || esMaster || esDelegado || esAutoSat || ((esSemi && currentUser.pedidos_repuesto) || (esSemi && currentUser.puestas_en_marcha) || (esSemi && currentUser.puestas_en_marcha) )" @click.prevent="enrutarcion('tecnicos')" class="text-uppercase" style="font-weight: 700;border-radius: 7px;padding: 7px 17px;">Servicio técnico</b-button>
            </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </home-layout>
</template>

<script>
import HomeLayout from "../../layouts/HomeLayout";
import Avatar from "vue-avatar";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    Avatar,
    "home-layout": HomeLayout,
  },
  data() {
    return {
      usuario: this.$store.state.user.currentUser,
    };
  },
  computed: {
  ...mapGetters([
    "esMaster",
    "esDistribuidor",
    "esTecnico",
    "esDelegado",
    "logueado",
    "esAutoSat",
    "currentUser",
    "esSemi",
    "esDcoordinador"

    
  ]) 
  },
  methods:{
    ...mapMutations(['setMenuSidebar']),
    enrutarcion(val){

      this.setMenuSidebar(val)

      this.$router.push({name:`${val}-tutorial` })


    },
  }
};
</script>
<style>
.vue-avatar--wrapper span {
  color: white;
}
</style>
