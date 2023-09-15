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
      <b-col md="3" v-for="(item,x) in items" :key="x" class="mb-4">
        <router-link :to="{ name: getMenuSidebar + '-documentacion-temporada', params:{id:item.id} }" tag="a">
          <div class="cajas">
            <b-img
              class="mb-4"
              center
              :src=" item.miniatura != null ? url + item.miniatura.url : '/assets/img/Front/categoria-placeholder.png' "
														width="121px"
            ></b-img
            ><span>{{item.nombre}}</span>
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
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters(['esMaster', "esDelegado", "esDistribuidor", "esTecnico", "logueado", "getMenuSidebar", "esAutoSat"])
  },
  data() {
    return {
      isLoad:false,
      items: [],
    };
  },
  created() {
			this.loadItem();
				
  },

  methods: {
			   async loadItem() {
      try {

        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let { data } = await axios.get(`temporadas`, setting);

								this.items = data;
								this.isLoad = true;
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
...mapGetters(['esMaster', "esDelegado", "esDistribuidor", "esTecnico", "logueado","getMenuSidebar", "esAutoSat"]),
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
  },
  watch: {
    search() {
      this.page = 1;
    },
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
