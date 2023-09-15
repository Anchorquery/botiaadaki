<template>
  <b-container>
   <b-row>
      <b-col md="12">
        <div style="margin-bottom: 30px;">
          <b-nav tabs align="center">
            <b-nav-item v-if="(!esTecnico && getMenuSidebar != 'tecnicos')" :to="{ name: 'distribuidores-catalogos' }"
              >Catalogos</b-nav-item
            >
            <b-nav-item   v-if="((!esDistribuidor && getMenuSidebar == 'tecnicos') || (esAutoSat && getMenuSidebar == 'tecnicos'))" :to="{ name: 'tecnicos-alarmas' }"
              >Alarmas
            </b-nav-item>
            <b-nav-item v-if="((!esDistribuidor && getMenuSidebar == 'tecnicos') || (esAutoSat && getMenuSidebar == 'tecnicos'))" :to="{ name: 'tecnicos-parametros' }"
              >Párametros</b-nav-item
            >
            <b-nav-item   v-if="((!esDistribuidor && getMenuSidebar == 'tecnicos') || (esAutoSat && getMenuSidebar == 'tecnicos'))" :to="{ name: 'tecnicos-informacion-tecnica' }"
              >Info. Técnica
            </b-nav-item>
            <b-nav-item v-if="(!esTecnico && getMenuSidebar != 'tecnicos') " :to="{ name: 'distribuidores-tarifas' }"
              >Tárifas
            </b-nav-item>
            <b-nav-item v-if="(!esTecnico && getMenuSidebar != 'tecnicos')" :to="{ name: getMenuSidebar + '-fichas-tecnicas' }"
              >Fichas tecnicas 
            </b-nav-item>
            <b-nav-item v-if="logueado" :to="{ name: getMenuSidebar + '-documentacion-audiovisual' }"
              >Documentacion audiovisual
            </b-nav-item>
          </b-nav>
        </div>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col md="12">
        <list-page-heading
          title="Documentación audio-visual"
          agregar="Audio Visual"
          :changeOrderBy="changeOrderBy"
          :changePageSize="changePageSize"
          :sort="sort"
          :searchChange="searchChange"
          :from="from"
          :to="to"
          :total="total"
          :perPage="perPage"
          :getItems="getItems"
        ></list-page-heading>
      </b-col>
    </b-row>
    <b-row v-if="items.length == 0">
      <b-col md="12">
                <b-alert show variant="danger"
          >No hay items registrados
          </b-alert
        >
      </b-col>
    </b-row>
    <b-row class="mb-4" v-if="isLoad" >
      <b-col md="3" v-for="(x, i) in items" :key="i" class="mb-4">
        <div class="wrapper-item">
          <div class="pdf-wrapper images clearfix" v-viewer="options" >
        <img v-if="x.audiovisual.mime != 'video/mp4'" :src="x.audiovisual ? `${url + x.audiovisual.url}` : ''" :data-source="x.audiovisual ? `${url + x.audiovisual.url}` : ''" class="image" :key="`${url + x.audiovisual.url}`" :alt="x.audiovisual.url.split('?image=').pop()" style="width:150px;margin:auto;">
          </div>
          <div class="info-pdf text-center">
            <p class="h5 bold">
              {{ x.titulo }}
            </p>
            <p class="h6">Año: {{ x.ano }}</p>
          </div>
        </div>
        <div v-if="esMaster" style="text-align: center;" class="botonera mt-4"> <b-button size="sm" @click="itemDelete(x)" variant="danger" >Borrar</b-button><b-button @click="itemEdit(x)" size="sm" >Editar</b-button> </div>
      </b-col>
    </b-row>
    <!-- crear -->
    <template>
      <b-modal ref="modal-add" id="modal-add" centered title="Crear audio visual">
        <b-form>
          <b-container>
            <b-row>
              <b-col md="6">
                <b-form-group label="Titulo *" class="label-input-form mb-4">
                  <b-form-input type="text" v-model="x.titulo" required />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Año *" class="label-input-form mb-4">
                  <b-form-input type="text" v-model.trim="x.ano" required />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Descripción" class="label-input-form mb-4">
                  <b-form-textarea
                    id="textarea"
                    v-model="x.descripcion"
                    placeholder="Descripción del audio visual"
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
                    @initfile="initArchivo"
                    v-bind:allow-multiple="false"
                    :accepted-file-types="['image/*', 'video/*', 'audio/*']"
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
            class="btn btn-danger"
            variant="danger"
            @click="limpiar() + hide('forget')"
          >
            Cancelar
          </b-button>
          <b-button
            :disabled="!file || !x.titulo || !x.ano"
            size="sm"
            btn
            btn-primary
            variant="primary"
            @click="crearItem()"
          >
            Crear Audio Visual
          </b-button>
        </template>
      </b-modal>
    </template>
    <!-- editar -->
    <template>
      <b-modal ref="modal-edit" id="modal-edit" centered title="Editar audio visual">
        <b-form>
          <b-container>
            <b-row>
              <b-col md="6">
                <b-form-group label="Titulo *" class="label-input-form mb-4">
                  <b-form-input type="text" v-model="editItem.titulo" required />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Año *" class="label-input-form mb-4">
                  <b-form-input type="text" v-model="editItem.ano" required />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Descripción" class="label-input-form mb-4">
                  <b-form-textarea
                    id="textarea"
                    v-model="editItem.descripcion"
                    placeholder="Descripción del audio visual"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="12" class="mb-4">
                <div>
                  <file-pond
                    name="files"
                    ref="archivosEdit"
                    :files="archivosEdit"
                    @initfile="initEdit"
                    v-bind:allow-multiple="false"
                    :accepted-file-types="['image/*', 'video/*', 'audio/*' ]"
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
            class="btn btn-danger"
            variant="danger"
            @click="hide('forget') + limpiar()"
          >
            Cancelar
          </b-button>
          <b-button

            size="sm"
            btn
            btn-primary
            variant="primary"
            @click="editarItem()">
            Editar Audio Visual
          </b-button>
        </template>
      </b-modal>
    </template>
    <!--Ver y editar-->
    <template>
      <b-modal
        no-close-on-esc
        no-close-on-backdrop
        ref="modal-x"
        id="modal-x"
        size="xl"
        centered
      >
        <template #modal-header>
          <!-- Emulate built in modal header close button action -->
          <h5 class="h5">
            <strong>Titulo: </strong> {{ itemSeleccionado.titulo }}
          </h5>
          <h5 class="h5">
            <strong>Fecha: </strong> {{ itemSeleccionado.ano }}
          </h5>
        </template>
        <b-form>
          <b-container>
            <b-row>
              <b-col md="5">
                <div class="d-flex" style="justify-content: space-between; ">
                  <p class="h6">Paginas: {{ pagePdf }}/{{ numPages }}</p>
                  <input
                    v-model.number="pagePdf"
                    type="number"
                    style="width: 5em"
                    min="1"
                    :max="numPages"
                  />
                </div>
                <pdf
                  ref="pdfImprimir"
                  v-if="show"
                  :src="
                    !itemSeleccionado ? '' : url + itemSeleccionado.audiovisual.url
                  "
                  :page="pagePdf"
                  @progress="loadedRatio = $event"
                  @num-pages="numPages = $event"
                  @link-clicked="pagePdf = $event"
                  style="border: 1px solid red"
                ></pdf>
              </b-col>
              <b-col md="7">
                <div class="text-center">
                  <h3 class="h3 mb-4">Datos del audio visual</h3>
                  <div class="text-left">
                    <p class="h5 sub-title">
                      <span class="strong">Titulo:</span>
                      {{ itemSeleccionado.titulo }}
                    </p>
                    <p class=" h5 sub-title">
                      <span class="  strong">Año del audio visual:</span>
                      {{ itemSeleccionado.ano }}
                    </p>

                    <div class="mt-4 mb-4">
                      <p class="h5">Descripcion:</p>
                      <p class="h6">
                        {{ itemSeleccionado.descripcion }}
                      </p>
                    </div>
                    <div class="botonera">
                      <a
                        style="margin-left: 0px;"
                        target="_blank"
                        v-if="show"
                        class="btn btn-secondary"
                        :href="
                          !itemSeleccionado
                            ? ''
                            : url + itemSeleccionado.audiovisual.url
                        "
                        :download="itemSeleccionado.titulo + '.pdf'"
                        >Descargar</a
                      >

                      <b-button
                        variant="primary"
                        @click="$refs.pdfImprimir.print()"
                      >
                        Imprimir</b-button
                      >
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        <template #modal-footer="{  }">
          <b-button
            size="sm"
            class="btn btn-danger"
            variant="secondary"
            @click="reset()"
          >
            Cancelar
          </b-button>
        </template>
        
      </b-modal>
    </template>
    <!-- Borrar -->
  <template>

      <b-modal id="modal-delete" ref="modal-delete" title="Eliminacion de audio visual">
        <b-alert show variant="danger"
          >¿Estás seguro que desea eliminar el audio visual?
          </b-alert
        >
        <template slot="modal-footer">
                    <b-button
            variant="danger"
            @click="hideModal('modal-delete') + deleteItem()"
            class="mr-1"
            >Eliminar</b-button
          >
          <b-button
            variant="primary"
            @click="hideModal('modal-delete') + limpiar()"
            >Cancelar</b-button
          >

        </template>
      </b-modal>

  </template>
  </b-container>
</template>
<script>
import vueFilePond, { setOptions } from "vue-filepond";
import {mapGetters} from "vuex";
import pdf from "vue-pdf";
import 'viewerjs/dist/viewer.css';
import { url } from "@/constants/config";
// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import ListPageHeading from "./ListPageHeadig";
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);
export default {
  components: {
    "list-page-heading": ListPageHeading,
    "file-upload": FilePond
  },
  data() {
    return {
      isLoad:false,
            options: {
        toolbar: true,
        url: 'data-source'
      },
      archivosEdit:[],
      editItem:'',
      apiBase: url + "/audiovisuals",
      show: false,
      archivos: [],
      loadedRatio: 0,
      file: false,
      items: [],
      sort: {
        column: "titulo",
        label: "Titulo"
      },
      x: {
        titulo: "",
        descripcion: "",
        ano: ""
      },
      delItem:'',
      pagePdf: 1,
      numPages: 0,
      itemSeleccionado: [],
      idItem: "",
      page: 1,
      perPage: 4,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      currentPage: 0,
      pageCount: 0,
      server: {
        url: `${axios.defaults.baseURL}/upload/`,
        revert: null,
        process: {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.authorization}`
          },
          ondata: fd => {
            fd.append("refId", this.idItem);
            fd.append("ref", "audiovisual");
            fd.append("field", "audiovisual");
            return fd;
          }
        }
      }
    };
  },
  created() {
    this.getItems();
  },

  methods: {
    async editarItem(){
      
      try{
         let x = this.editItem;
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        
        let {data} = await axios.put( `/audiovisuals/${x.id}`, {ano:x.ano, 'titulo':x.titulo, 'descripcion': x.descripcion} ,setting );

        if (this.file){

        
          this.idItem = x.id;
          
          this.auxliarEdit(x); 
        
        }else{
          this.hideModal('modal-edit')
          this.getItems();
          this.limpiar();
        }

      }catch(e){
        console.log(e)
      }
    },
    async auxliarEdit(x){
      try{
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let promesa1 =  this.$refs.archivosEdit.processFiles();

        let promesa2 = axios.delete(`/upload/files/${x.audiovisual.id}`, setting);

        let response = await Promise.all([promesa1, promesa2]);

        console.log(response)
        this.hideModal('modal-edit')
        this.getItems();
        this.limpiar();

      }catch(e){
        console.log(e)
      }
    },
    itemEdit(x){

      this.editItem = x;


      this.$refs["modal-edit"].show();
    },
    itemDelete(x){

      this.delItem = x;


      this.$refs["modal-delete"].show();
    },
    async deleteItem(){

      try{
         let x = this.delItem;
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let promesa1 = axios.delete( `/audiovisuals/${x.id}`, setting )


        let promesa2 = axios.delete(`/upload/files/${x.audiovisual.id}`, setting)

        let response = await Promise.all([promesa1, promesa2]);

        this.getItems()
      }catch(e){
        console.log(e)
      }

    },
    reset() {
      this.itemSeleccionado = "";
      this.pagePdf = 1;
      this.numPages = 0;
      this.show = false;
      this.$refs["modal-x"].hide();
    },

    seleccionItem(x) {
      console.log(x);
      this.itemSeleccionado = x;
      this.show = true;
      this.$refs["modal-x"].show();
    },
    initArchivo(x) {
      this.file = true;
      console.log(x);
    },
    initEdit(x) {
      this.file = true;
      console.log(x);
    },
    async crearItem() {
      try {
        if (!this.x.titulo) {
          return;
        }

        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };

        let { data } = await axios.post("/audiovisuals", this.x, setting);

        this.idItem = data.id;

        this.subirArchivo();
      } catch (error) {
        console.log(error.response);
      }
    },
    async subirArchivo() {
      try {
        let archivo = await this.$refs.archivos.processFiles();

        this.$refs["modal-add"].hide();
        this.getItems();
        this.limpiar();
      } catch (error) {
        console.log(error);
      }
    },
    limpiar() {
      this.x.titulo = "";
      this.x.descripcion = "";
      this.x.ano = "";
      this.file = false;
      this.delItem = '';
      this.editItem ="";
    },
    hideModal(refname) {
      this.$refs[refname].hide();
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
    },
    changePageSize(perPage) {
      this.page = 1;
      this.perPage = perPage;
    },
    async getItems() {
      try {
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let { data } = await axios.get(`${this.apiUrl}`, setting);

        this.items = data;
        this.isLoad = true;
        console.log("Datos", data);
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
...mapGetters(['esMaster', "esDelegado", "esDistribuidor", "esTecnico", "logueado", "getMenuSidebar", "esAutoSat"]),
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
      if (this.search) {

        return `${this.apiBase}?_where[titulo]=${this.search}`;
      } else {
        return `${this.apiBase}`;
      }
    }
  },
  watch: {
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.getItems();
    }
  }
};
</script>
<style></style>
