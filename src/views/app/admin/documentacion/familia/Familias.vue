<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <list-page-heading
        title="Documentación - Categorías"
        agregar="Categoría"
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
            :disabled="!archivos || !familia.nombre"
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
import { apiUrl, timeoutDb } from "@/constants/config";
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
      isLoad: false,
      simplelineicons,
      iconsmind,
      idItem: "",
      archivos: [],
      familia: {
        nombre: "",
        descripcion: "",
        status: true,
        miniatura: "",
        orden: 0
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
            fd.append("ref", "familias");
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
      perPage: 4,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      categoriaRemove: {},
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
    async subirArchivo() {
      try {

        if (!this.archivo) {
          let { data } = await this.$refs.archivos.processFiles();
        } else {
          let promesa1 = axios.delete(
            `/upload/files/${this.familia.miniatura.id}`,
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
        let x = this.editItem;
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

          },
          setting
        );

        if (this.file) {
          this.idItem = x.id;

          this.auxliarEdit(x);
        } else {
          this.hideModal("modal-edit");
          this.getItems();
          this.limpiar();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async crearItem() {
      try {
        if (!this.familia.nombre) {
          return;
        }

        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };

        let { data } = await axios.post("/familias", this.familia, setting);

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
    async loadItems() {
      try {
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let { data } = await axios.get("familias", setting);
        this.total = data.length;
        this.from = 1;
        this.to = 4;

        this.perPage = 5;

        /*this.lastPage = res.last_page;*/
        this.isLoad = true;
        this.items = data;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteItem() {
      console.log(this.categoriaRemove)
      try {
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };
        let setting = { headers: header };
  
        let { data } = await axios.delete(`/familias/${this.categoriaRemove.id}`, setting);

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

    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },

    changePage(pageNum) {
      this.page = pageNum;
    }
  },
  computed: {
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
    /*apiUrl() {
      if (this.search) {

        return `${this.apiBase}?_where[titulo]=${this.search}`;
      } else {
        return `${this.apiBase}`;
      }
    }*/
  },
  watch: {
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.loadItems();
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
    this.loadItems();
  }
};
</script>
