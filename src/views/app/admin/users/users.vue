<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <list-page-heading
        :title="
          this.$route.name == 'delegados-user'
            ? 'Delegados'
            : this.$route.name == 'tecnicos-user'
            ? 'Técnicos'
            : this.$route.name == 'distribuidores-user'
            ? 'Distribuidores'
            : this.$route.name == 'semimaster-user'
            ? 'Semi Master'
            : this.$route.name == 'master-user'
            ? 'Master'
            : 'Usuarios'
        "
        :displayMode="displayMode"
        :loadItems="loadItems"
        :changeOrderBy="changeOrderBy"
        :changePageSize="changePageSize"
        :sort="sort"
        :searchChange="searchChange"
        :from="from"
        :to="to"
        :total="total"
        :perPage="perPage"
      ></list-page-heading>

      <template v-if="isLoad">
        <list-page-listing
          :items="items"
          :delteItem="delteItem"
          :lastPage="lastPage"
          :perPage="perPage"
          :page="page"
          :changePage="changePage"
          @user_remove="userRemove = $event"
          @user_activeDeactive="userActiveDeactive = $event"
        ></list-page-listing>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>

    <b-colxx xxs="12">
      <b-modal id="modalbasic" ref="modalbasic" title="Eliminación de usuario">
        <p>¿Está seguro que desea eliminar al usuario {{ nameRemove }}?</p>
        <b-alert show variant="danger">
          Todos los datos del usuario serán borrados
        </b-alert>
        <template slot="modal-footer">
          <b-button
            variant="danger"
            @click="somethingModal('modalbasic') + deleteItem()"
            class="mr-1"
            >Eliminar</b-button
          >
          <b-button variant="primary" @click="hideModal('modalbasic')"
            >Cancelar</b-button
          >
        </template>
      </b-modal>
    </b-colxx>
    <b-colxx xxs="12">
      <b-modal
        id="modalactivate"
        v-if="userActiveDeactive.accion == 1"
        ref="modalactivate"
        title="Activación de usuario"
      >
        <p>
          Activará al usuario
          <strong>{{ userActiveDeactive.nameAD }}</strong> , esto le permitirá
          el acceso a la plataforma.
          <br />
          <br />
          <b-alert show variant="danger">
            El usuario
            <strong>{{ userActiveDeactive.nameAD }}</strong> recibirá un correo
            con los datos de acceso.
          </b-alert>
        </p>
        <template slot="modal-footer">
          <b-button
            variant="primary"
            @click="somethingModal('modalactivate') + activate()"
            class="mr-1"
            >Activar</b-button
          >
          <b-button variant="danger" @click="hideModal('modalactivate')"
            >Cancelar</b-button
          >
        </template>
      </b-modal>
      <b-modal
        id="modaldeactivate"
        v-if="userActiveDeactive.accion == 2"
        ref="modaldeactivate"
        title="Desactivación de usuario"
      >
        <p>
          Desactivará al usuario
          <strong>{{ userActiveDeactive.nameAD }}</strong> , esto impedirá el
          acceso del usuario a la plataforma.
        </p>
        <b-alert show variant="danger">
          Los datos del usuario no se borrarán
        </b-alert>
        <template slot="modal-footer">
          <b-button
            variant="primary"
            @click="somethingModal('modalbasic') + deactivate()"
            class="mr-1"
            >Desactivar</b-button
          >
          <b-button variant="danger" @click="hideModal('modaldeactivate')"
            >Cancelar</b-button
          >
        </template>
      </b-modal>
    </b-colxx>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
import { apiUrl } from "@/constants/config";
import ListPageHeading from "./ListPageHeadigUser";
import ListPageListing from "./ListPageListUser";
import qs from "qs";
import { iconsmind, simplelineicons } from "@/assets/icon/icons";
export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing
  },
  data() {
    return {
      isLoad: false,
      simplelineicons,
      iconsmind,
      apiDelete: apiUrl,
      apiActivate: apiUrl + "users/",
      apiDeactivate: apiUrl + "users/",
      displayMode: "list",
      sort: {
        column: "nombre",
        label: "Nombre"
      },
      page: 1,
      perPage: 6,
      search: "",
      total: 0,
      items: [],
      userRemove: {},
      idRemove: "",
      nameRemove: "",

      name: "",
      email: "",

      rol: "",
      province: "",

      roles: [
        {
          label: "Distribuidor",
          value: "DISTRIBUIDOR"
        },
        {
          label: "Master",
          value: "MASTER"
        }
      ],
      userActiveDeactive: {},
      relistar: false,
      submitStatus: null,
      success: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      error: false,
      message: []
    };
  },

  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    messageError(message, err) {
      this.error = message;

      if (err) {
        this.error += `\n\r${err}`;
      }

      setTimeout(() => {
        this.limpiar();
      }, 3000);

      return this.error;
    },
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    somethingModal(refname) {
      this.$refs[refname].hide();
    },
    async countItems() {
      try {
      if (this.esMaster || this.esSemi) {
        let query = qs.stringify({
          _where: [
            {
              role:
                this.$route.name == "delegados-user"
                  ? 3
                  : this.$route.name == "tecnicos-user"
                  ? 5
                  : this.$route.name == "distribuidores-user"
                  ? [4,10]
                  : this.$route.name == "semimaster-user"
                  ? 9
                  : this.$route.name == "master-user"
                  ? 1
                  : ""
            },
            {
              _or: [
                { nombre_contains: this.search },
                { email_contains: this.search }
              ]
            }
          ]
        });

        var apiCount = `${apiUrl}users/count?${query}`; 
       // var apiCount = `${apiUrl}users/count`; 
      }else if(this.esDelegado) {
        let query = qs.stringify({
          _where: [
            {
              role:
                this.$route.name == "delegados-user"
                  ? 3
                  : this.$route.name == "tecnicos-user"
                  ? 5
                  : this.$route.name == "distribuidores-user"
                  ? [4,10]
                  : this.$route.name == "semimaster-user"
                  ? 9
                  : this.$route.name == "master-user"
                  ? 1
                  : "",
                  delegado: this.id
            },
            {
              _or: [
                { nombre_contains: this.search },
                { email_contains: this.search }
              ]
            }
          ]
        });
        var apiCount = `${apiUrl}users/count?${query}`; //`${apiUrl}users/semi`;
      }else if(this.esDcoordinador) {
        let query = qs.stringify({
          _where: [
            {
              role:
                this.$route.name == "delegados-user"
                  ? 3
                  : this.$route.name == "tecnicos-user"
                  ? 5
                  : this.$route.name == "distribuidores-user"
                  ? 4
                  : this.$route.name == "semimaster-user"
                  ? 9
                  : this.$route.name == "master-user"
                  ? 1
                  : "",
                  delegado_coordinador: this.id
            },
            {
              _or: [
                { nombre_contains: this.search },
                { email_contains: this.search }
              ]
            }
          ]
        });
        var apiCount = `${apiUrl}users/count?${query}`; //`${apiUrl}users/semi`;
      }
        let { data } = await axios.get(apiCount);
        this.total = data;
      } catch (e) {
        console.log(e);
      }
    },
    loadItems() {
      this.isLoad = false;
      let me = this;
      let header = {
        Authorization: `Bearer ${this.$store.state.user.authorization}`
      };

      let setting = { headers: header };
      axios
        .get(this.apiUrl, setting)

        .then(response => {
          this.items = response.data;

          /*this.lastPage = res.last_page;*/
          this.isLoad = true;
        });
    },
    delteItem() {
      this.idRemove = this.userRemove.id;
      this.nameRemove = this.userRemove.nombre;
    },
    async deleteItem() {
      try {
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };
        let setting = { headers: header };

        let { data } = await axios.delete(`/users/${this.userRemove.id}`, setting);



        this.loadItems();
      } catch (e) {
        console.log(e.response);
      }
    },
    activate() {
      let me = this;

      let header = {
        Authorization: `Bearer ${this.$store.state.user.authorization}`
      };
      let setting = { headers: header };
      let data = { blocked: false };
      axios
        .put(`${apiUrl}users/${this.userActiveDeactive.idAD}`, data, setting)
        .then(function(response) {
    
          me.limpiar();
          me.hideModal("modalactivate");
          me.loadItems();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deactivate() {
      let me = this;
      let header = {
        Authorization: `Bearer ${this.$store.state.user.authorization}`
      };
      let setting = { headers: header };
      axios
        .put(
          `${apiUrl}users/${this.userActiveDeactive.idAD}`,
          { blocked: true },
          setting
        )
        .then(function(response) {
          me.limpiar();
          me.hideModal("modaldeactivate");
          me.loadItems();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    changePageSize(perPage) {
      this.page = 1;
      this.perPage = perPage;
    },
    limpiar() {
      this.userActiveDeactive = {};

      this.submitStatus = null;
      this.success = false;
      this.error = false;
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    searchChange(val) {
      this.search = val;
      this.page = 1;
    },

    changePage(pageNum) {
      this.page = pageNum;
    }
  },
  computed: {
    to(){
      let suma =  (this.from + this.perPage)<=this.total ? (this.from + this.perPage) : this.total;
      return suma;

    },
    from(){

      return (this.page - 1) * this.perPage;


    },
   ...mapGetters({menu : 'getMenuSidebar',
                  'esMaster': "esMaster",
                  'esDelegado': "esDelegado",
                  'esTecnico': "esTecnico",
                  'esDistribuidor': "esDistribuidor",
                  'esSemi': 'esSemi',
                  "esDcoordinador":"esDcoordinador"}),
    id() {
      return this.$store.state.user.currentUser.id;
    },
    lastPage() {

      return Math.ceil(this.total / this.perPage);
    },
    start() {
      let inicio = +this.page === 1 ? 0 : (+this.page - 1) * this.perPage;
      return inicio;
    },
    delegado() {
      return this.$store.state.user.currentUser.delegado;
    },
    apiUrl() {
      if (this.$store.state.user.currentUser.role.id === 1) {
        let query = qs.stringify({
          _where: [
            {
              role:
                this.$route.name == "delegados-user"
                  ? 3
                  : this.$route.name == "tecnicos-user"
                  ? 5
                  : this.$route.name == "distribuidores-user"
                  ? [4,10]
                  : this.$route.name == "semimaster-user"
                  ? 9
                  : this.$route.name == "master-user"
                  ? 1
                  : ""
            },
            {
              _or: [
                { nombre_contains: this.search },
                { email_contains: this.search }
              ]
            }
          ]
        });

        var apiBase = `${apiUrl}users?_limit=${this.perPage}&_start=${this.start}&${query}&_sort=${this.sort.column}:asc`;
        //var apiBase = `${apiUrl}users?_limit=${this.perPage}&_start=${this.start}&_sort=${this.sort.column}:asc`;
      }else if(this.$store.state.user.currentUser.role.id === 10){

        let query = qs.stringify({
          _where: [
            {
              distribuidor_coordinador: this.id
            },
            {
              _or: [
                { nombre_contains: this.search },
                { email_contains: this.search }
              ]
            }
          ]
        });
        var apiBase = `${apiUrl}users?_limit=${this.perPage}&_start=${this.start}&${query}&_sort=${this.sort.column}:asc`; //`${apiUrl}users/semi`;

      } else {
        let query = qs.stringify({
          _where: [
            {
              role:
                this.$route.name == "delegados-user"
                  ? 3
                  : this.$route.name == "tecnicos-user"
                  ? 5
                  : this.$route.name == "distribuidores-user"
                  ? [4,10]
                  : this.$route.name == "semimaster-user"
                  ? 9
                  : this.$route.name == "master-user"
                  ? 1
                  : ""
            },
            {
              delegado: this.id
            },
            {
              _or: [
                { nombre_contains: this.search },
                { email_contains: this.search }
              ]
            }
          ]
        });
        var apiBase = `${apiUrl}users?_limit=${this.perPage}&_start=${this.start}&${query}&_sort=${this.sort.column}:asc`; //`${apiUrl}users/semi`;
      }

      return `${apiBase}`;
    }
  },
  watch: {
    user_remove() {
      this.delteItem();
    },
    activeDeactive() {
      this.emitActiveDeactive();
    },
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.loadItems();
      this.countItems();
    },
    success() {
      if (this.success) {
        this.showAlert();
      }
    },
    error() {
      if (!this.success && this.error.length > 0) {
        this.showAlert();
      }
    }
  },
  mounted() {
    this.countItems();
    this.loadItems();
  }
};
</script>
