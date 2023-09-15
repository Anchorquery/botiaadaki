<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <list-page-heading
        :title="'Familia ' + familia.nombre"
        agregar="Categoría"
        editar="Familia"
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
          :lastPage="lastPage"
          :perPage="perPage"
          :page="page"
          :changePage="changePage"
          @emitRemove="categoriaRemove = $event"
        ></list-page-listing>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>

    <b-colxx xxs="12">
      <b-modal
        id="modalbasic"
        ref="modalbasic"
        title="Eliminación de categoría"
      >
        <p>¿Está se guro que desea eliminar la categoría?</p>
        <b-alert show variant="danger">
          Todos los datos asignados a la categoría serán borrados.
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
    <template>
      <b-modal ref="modal-add" id="modal-add" centered title="Nueva categoría">
        <b-form>
          <b-container>
            <b-row>
              <b-col md="12">
                <b-form-group label="Nombre *" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
                    v-model.trim="categoria.nombre"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Estado *" class="label-input-form mb-4">
                  <b-form-checkbox
                    v-model="categoria.status"
                    name="check-button"
                    switch
                  >
                    <b>( {{ categoria.status ? "Activo" : "No activo" }})</b>
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Orden *" class="label-input-form mb-4">
                  <b-form-input
                    type="number"
                    v-model.trim="categoria.orden"
                    min="0"
                    max="99"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Descripción" class="label-input-form mb-4">
                  <b-form-textarea
                    id="textarea"
                    v-model.trim="categoria.descripcion"
                    placeholder="Descripción de la categoria"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                    label="Permisos"

                >
                    <b-form-checkbox switch size="sm" v-model="categoria.tecnico">Técnicos</b-form-checkbox>
                    <b-form-checkbox switch size="sm" v-model="categoria.distribuidor">Distribuidores</b-form-checkbox>
                </b-form-group>
              </b-col>		
              <b-col md="12" class="mb-4">
                <div>
                  <file-pond
                    name="files"
                    ref="archivos"
                    :files="archivos"
                    v-bind:allow-multiple="false"
                    :accepted-file-types="['image/png', 'image/jpeg']"
                    :server="server"
                    instantUpload="false"
                    allowProcess="false"
                    allowRevert="false"
                    credits="false"
                    labelIdle='Arrastra el archivo que quieres subir o <span style="cursor:pointer">picha aquí</span>'
                  />
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        <template #modal-footer="{ hide }">
          <b-button
            size="sm"
            class="btn btn-secondary-outline"
            variant="danger"
            @click="limpiar() + hide('forget')"
          >
            Cancelar
          </b-button>
          <b-button
            :disabled="!archivos || !categoria.nombre"
            size="sm"
            btn
            btn-primary
            variant="primary"
            @click="crearItem()"
          >
            Crear Categoría
          </b-button>
        </template>
      </b-modal>
    </template>
    <template>
      <b-modal
        ref="modal-edit"
        id="modal-edit"
        centered
        title="Editar familia"
      >
        <b-form>
          <b-container>
            <b-row>
              <b-col md="12">
                <b-form-group label="Nombre *" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
                    v-model.trim="familia.nombre"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Estado *" class="label-input-form mb-4">
                  <b-form-checkbox
                    v-model="familia.status"
                    name="check-button"
                    switch
                  >
                    <b>( {{ familia.status ? "Activo" : "No activo" }})</b>
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Orden *" class="label-input-form mb-4">
                  <b-form-input
                    type="number"
                    v-model.trim="familia.orden"
                    min="0"
                    max="99"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Descripción" class="label-input-form mb-4">
                  <b-form-textarea
                    id="textarea"
                    v-model.trim="familia.descripcion"
                    placeholder="Descripción de la familia"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                    label="Permisos"

                >
                    <b-form-checkbox switch size="sm" v-model="familia.tecnico">Técnicos</b-form-checkbox>
                    <b-form-checkbox switch size="sm" v-model="familia.distribuidor">Distribuidor</b-form-checkbox>
                </b-form-group>
              </b-col>		
              <b-col md="12" class="mb-4">
                <div>
                  <file-pond
                    name="files"
                    ref="miniaturaFamilia"
                    :files="miniatura"
                    v-model="miniaturaAux"
                    v-bind:allow-multiple="false"
                    :accepted-file-types="['image/png', 'image/jpeg']"
                    :server="server_2"
                    instantUpload="false"
                    allowProcess="false"
                    allowRevert="false"
                    credits="false"
                    labelIdle='Arrastra el archivo que quieres subir o <span style="cursor:pointer">picha aquí</span>'
                  />
                </div>
                <div class="text-center">

                <b-img
                  thumbnail
                  fluid
                  :src="
                    !familia.miniatura
                      ? '/assets/img/Front/categoria-placeholder.png'
                      : url + familia.miniatura.url
                  "
                  :title="
                    !familia.miniatura ? 'placeholder' : familia.miniatura.name
                  "
                ></b-img>

                </div>                
              </b-col>

            </b-row>
          </b-container>
        </b-form>
        <template #modal-footer="{ hide }">
          <b-button
            size="sm"
            class="btn btn-secondary-outline"
            variant="danger"
            @click="limpiar() + hide('forget')"
          >
            Cancelar
          </b-button>
          <b-button
            :disabled="!archivos || !familia.nombre"
            size="sm"
            btn
            btn-primary
            variant="primary"
            @click="editarItem()"
          >
            Editar Familia
          </b-button>
        </template>
      </b-modal>
    </template>
  </b-row>
</template>

<script>
import vueFilePond, { setOptions } from "vue-filepond";
import { mapGetters } from "vuex";
import "filepond/dist/filepond.min.css";

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import ListPageHeading from "../ListPageHeadig";
import ListPageListing from "../ListPageList";
import qs from "qs";
import { iconsmind, simplelineicons } from "@/assets/icon/icons";
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);
export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing
  },
  data() {
    return {
      id: "",
      isLoad: false,
      simplelineicons,
      iconsmind,
      idItem: "",
      familia: {
        nombre:'',
        descripcion:'',
        orden:0,
        status:true,
        miniatura:'',
        tecnico:null,
        distribuidor:null,
        temporada:''
      },
      miniatura:'',
      archivos: [],
      categoria: {
        nombre: "",
        descripcion: "",
        status: true,
        miniatura: "",
        orden: 0,
        familia: "",
        tecnico:true,
        distribuidor:true,
        temporada:''
      },
      server: {
        url: `${axios.defaults.baseURL}/upload/`,
        revert: null,
        process: {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.authorization}`
          },
          ondata: fd => {
            fd.append("refId", this.idItem);
            fd.append("ref", "categoria");
            fd.append("field", "miniatura");
            return fd;
          }
        }
      },
      server_2: {
        url: `${axios.defaults.baseURL}/upload/`,
        revert: null,
        process: {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.authorization}`
          },
          ondata: fd => {
            fd.append("refId", this.id);
            fd.append("ref", "familia");
            fd.append("field", "miniatura");
            return fd;
          }
        }
      },
      sort: {
        column: "nombre",
        label: "Nombre"
      },
      page: 1,
      perPage: 10,
      search: "",
      total: 0,
      items: [],
      idRemove: "",

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
            miniaturaAux: "",
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
    async editarMT() {
      try {
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };

        if (!this.familia.miniatura) {
          await this.$refs.miniaturaFamilia.processFiles();
        } else {
          let promesa1 = this.$refs.miniaturaFamilia.processFiles();

          let promesa2 = axios.delete(
            `/upload/files/${this.familia.miniatura.id}`,
            setting
          );

          let response = await Promise.all([promesa1, promesa2]);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async subirArchivo() {
      try {
        if (!this.archivo) {
          let { data } = await this.$refs.archivos.processFiles();
        } else {
          let promesa1 = axios.delete(
            `/upload/files/${this.categoria.miniatura.id}`,
            setting
          );

          let promesa2 = this.$refs.archivos.processFiles();

          let response = await Promise.all([promesa1, promesa2]);
        }

        this.$refs["modal-add"].hide();
        this.isLoad = false;
        this.loadItems();
      } catch (e) {
        console.log(e);
      }
    },
    async editarItem() {
      try {
        let x = this.familia;
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };

        let { data } = await axios.put(
          `/familias/${x.id}`,
          {
            nombre: x.nombre,
            descripcion: x.descripcion,
            orden: x.orden,
            status: x.status,
            tecnico:x.tecnico,
            distribuidor:x.distribuidor
          },
          setting
        );
        if (this.miniaturaAux.length > 0) {
          await this.editarMT();
        }
          this.hideModal("modal-edit");
          this.loadItems();
          this.limpiar();

      } catch (e) {
        console.log(e);
      }
    },
    async crearItem() {
      try {
        if (!this.categoria.nombre) {
          return;
        }

        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        this.categoria["familia"] = this.id;
        this.categoria["temporada"] = this.familia.temporada;
        let { data } = await axios.post("/categorias", this.categoria, setting);

        this.idItem = data.id;

        await this.subirArchivo();
      } catch (error) {
        console.log(error.response);
      }
    },
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
    async loadItem() {
      try {
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let { data } = await axios.get(`familias/${this.id}`, setting);
        this.familia.nombre = data.nombre;
        this.familia.descripcion = data.descripcion;
        this.familia.orden = data.orden;
        this.familia.status = data.status;
        this.familia.id = data.id;
        this.familia.tecnico = data.tecnico;
        this.familia.distribuidor = data.distribuidor;
        this.familia.temporada = data.temporada.id;
        this.familia.miniatura = data.miniatura;

      } catch (e) {
        console.log(e);
      }
    },
    async loadItems() {
      try {
        this.isLoad = false;
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let { data } = await axios.get(
          `${this.apiUrl}`,
          setting
        );
      this.isLoad = true;
        this.items = data;
      } catch (e) {
        console.log(e);
      }
    },
    async countItems() {
      try {
      const query = qs.stringify({
          _where: [ {familia:this.id},{ nombre_contains: this.search } ]
      });
        let {data} = await axios.get(`categorias/count?${query}`);
        this.total = data;
         
      } catch (e) {
        console.log(e)
      }
    },
    async deleteItem() {
      console.log(this.categoriaRemove);
      try {
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };
        let setting = { headers: header };

        let { data } = await axios.delete(
          `/categorias/${this.categoriaRemove.id}`,
          setting
        );

        console.log(data);

        this.loadItems();
      } catch (e) {
        console.log(e.response);
      }
    },

    changePageSize(perPage) {
      this.page = 1;
      this.perPage = perPage;
    },
    limpiar() {
      this.categoriaActiveDeactive = {};
      this.categoria = {};
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
    lastPage(){
      console.log('laspage',Math.ceil(this.total/this.perPage))
    return Math.ceil(this.total/this.perPage)
    },
    start(){
      let inicio = + this.page === 1 ? 0 : (+ this.page - 1)* this.perPage;
      return  inicio
    },
        to() {
      let suma =
        this.from + this.perPage <= this.total
          ? this.from + this.perPage
          : this.total;
      return suma;
    },
    from() {
      return (this.page - 1) * this.perPage ;
    },
    ...mapGetters([
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
    idUser() {
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
          _where: [ {familia:this.id},{ nombre_contains: this.search } ]
      });

      return `categorias?_limit=${this.perPage}&_start=${this.start}&${query}`;
    }
  },
  watch: {
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
    this.id = this.$route.params.id;
    this.countItems();
    this.loadItem();
    this.loadItems();
  }
};
</script>
