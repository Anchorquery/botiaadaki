<template>
  <b-container>
    <b-row class="" v-if="isLoad">
      <b-col md="12">
        <b-img
          class="mb-4"
          width="210px"
          center
          :src="
            familia.miniatura != null
              ? url + familia.miniatura.url
              : '/assets/img/Front/categoria-placeholder.png'
          "
        ></b-img>
        <h3 class="subtitle h4 text-center">
          {{ familia.nombre }}
        </h3>
        <p class="text-center">
          {{ familia.descripcion }}
        </p>
        <p class="separador"></p>
      </b-col>
    </b-row>
    <b-row class="mb-4" v-if="isLoad">
      <b-col md="3" v-show="(esTecnico && item.tecnico) || (esAutoSat && item.tecnico) || (esDistribuidor && item.distribuidor) || esDelegado || esMaster || esSemi" v-for="(item, x) in items" :key="x" class="mb-4">
        <router-link
          
          v-if="(esTecnico && item.tecnico) || (esAutoSat && item.tecnico) || (esDistribuidor && item.distribuidor) || esDelegado || esMaster || esSemi"
          :to="{
            name: getMenuSidebar + '-documentacion-categoria',
            params: { id: item.id }
          }"
          tag="a"
        >
          <div class="cajas">
            <b-img
              class="mb-4"
              width="121"
              center
              :src="
                item.miniatura != null
                  ? url + item.miniatura.url
                  : '/assets/img/Front/categoria-placeholder.png'
              "
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
  computed: {
    ...mapGetters([
      "esMaster",
      "esSemi",
      "esDelegado",
      "esDistribuidor",
      "esTecnico",
      "logueado",
      "getMenuSidebar",
      "esAutoSat"
    ])
  },
  data() {
    return {
      isLoad: false,
      items: [],
      familia: [],
      idC: "",
      page: 1,
      perPage: 6,
      search: "",
      from: 0,
      to: 0,
      total: 0,
    };
  },
  created() {
    this.idC = this.$route.params.id;
    this.getCat();
    this.loadItem();
  },

  methods: {
    async loadItem() {
      try {
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let { data } = await axios.get(
          `/categorias?_where[familia]=${this.idC}`,
          setting
        );

        this.items = data;
        this.isLoad = true;
  
      } catch (e) {
        console.log(e);
      }
    },
    async countItems() {
      try {

        let {data} = await axios.get(`categorias/count?_where[familia]=${this.idC}`);
        this.total = data;

      } catch (e) {
        console.log(e)
      }
    },
    async getCat() {
      try {
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let { data } = await axios.get(`familias/${this.idC}`, setting);

        this.familia = data;
  
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    lastPage(){

      return Math.ceil(this.total/this.perPage)
    },
    start(){
      let inicio = + this.page === 1 ? 0 : (+ this.page - 1)* this.perPage;
      return  inicio
    },
    ...mapGetters([
      "esMaster",
      "esSemi",
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
    },
    apiUrl() {
      const query = qs.stringify({
          _where: [ {familia:this.idC},{ nombre_contains: this.search } ]
      });

      return `categorias?_limit=${this.perPage}&_start=${this.start}&${query}`;
    }
  },
  watch: {
    search() {
      this.page = 1;
    }/*,
    apiUrl() {
      this.loadItem();
    }*/
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
