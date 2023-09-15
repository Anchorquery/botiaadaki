<template>
  <b-container>
    <b-row class="" v-if="isLoad">
      <b-col md="12">
        <b-img
          class="mb-4"
          center
          src="/assets/img/Front/tutorial-documentacion.png"
        ></b-img>
        <h3 class="subtitle h4 text-center">
          Encuentra toda la información sobre nuestros productos
        </h3>
        <p class="text-center">
          En este portal podrás descargar toda la información relativa a los
          productos , desde sus fichas técnicas hasta imágenes concretas del
          producto que desees.
        </p>
        <p class="separador"></p>
      </b-col>
    </b-row>
    <b-row class="mb-4" v-if="isLoad">
      <b-col md="3" v-for="(item, x) in items" :key="x" class="mb-4">
        <router-link
          :to="{
            name: getMenuSidebar + '-documentacion-familia',
            params: { id: item.id }
          }"
          tag="a"
        >
          <div class="cajas">
            <b-img
              class="mb-4"
              center
              :src="
                item.miniatura != null
                  ? url + item.miniatura.url
                  : '/assets/img/Front/categoria-placeholder.png'
              "
              width="121px"
            ></b-img
            ><span>{{ item.nombre }}</span>
          </div></router-link
        >
      </b-col>
    </b-row>
    <template v-else>
      <div class="loading"></div>
    </template>
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";
import qs from "qs";
export default {
  data() {
    return {
      isLoad: false,
      items: [],
      idT: ""
    };
  },
  created() {
    this.idT = this.$route.params.id;
    this.loadItem();
  },

  methods: {
    async loadItem() {
      try {
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };

        if (this.delegacion == "horus" || this.delegacion == "klover" || this.delegacion == "hase") {
          if (this.delegacion == "klover") {
            var query = qs.stringify({
              _where: [
                { temporada: `${this.idT}` }
              ]
            });

          
          
          }else if( this.delegacion == "hase"){
            var query = qs.stringify({
              _where: [
                { temporada: `${this.idT}` },
                {
                  _or: [
                    { nombre_contains: "hase" }
                  ]
                }
              ]
            } );
            
          } else {
            var query = qs.stringify({
              _where: [
                { temporada: `${this.idT}` },
                {
                  _or: [
                    { nombre_contains: "horus" },
                  
                  ]
                }
              ]
            });
          }

          var { data } = await axios.get(`familias?${query}`, setting);
        } else {
          var query = qs.stringify({
            _where: [
              { temporada: `${this.idT}` },
              { nombre_ncontains: "horus" },
              { nombre_ncontains: "klover" },
              { nombre_ncontains: "hase" }
            ]
          });
          var { data } = await axios.get(`familias?${query}`, setting);
        }

        this.items = data;
        this.isLoad = true;
      } catch (e) {
        console.log(e);
        console.log(e.response);
      }
    }
  },
  computed: {
    ...mapGetters([
      "delegacion",
      "esMaster",
      "esDelegado",
      "esDistribuidor",
      "esTecnico",
      "logueado",
      "getMenuSidebar",
      "esAutoSat"
    ]),
    nameCreador() {
      return this.$store.state.user.currentUser.nombre;
    },
    email() {
      return this.$store.state.user.currentUser.email;
    },
    id() {
      return this.$store.state.user.currentUser.id;
    },
    delegado() {
      return this.$store.state.user.currentUser.delegado;
    },
    token() {
      return this.$store.state.user.authorization;
    },
    url() {
      return axios.defaults.baseURL;
    }
  },
  watch: {
    search() {
      this.page = 1;
    }
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
</style>
