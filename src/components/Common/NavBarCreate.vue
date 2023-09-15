<template>
  <div>
    <b-navbar type="light" variant="light" class="_navigation nav-items">
      <b-breadcrumb :items="templateBreadcrumb"></b-breadcrumb>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item> </b-nav-item>
          <b-nav-item>
            <b-button variant="primary" class="button-text">
              <font-awesome-icon icon="fa-solid fa-star" />
              Favorites
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              variant="primary"
              class="button-text"
              v-b-modal.modal-create-folder
            >
              <font-awesome-icon
                icon="folder-plus"
                class="_spacing"
              ></font-awesome-icon>
              Carpeta
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              variant="primary"
              class="button-text"
              v-b-modal.modal-create-document
            >
              <font-awesome-icon
                icon="file-circle-plus"
                class="_spacing"
              ></font-awesome-icon>
              Archivo
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button variant="primary" class="button-text" v-b-modal.modal-create-client>
              <font-awesome-icon :icon="['fas', 'user-plus']" />
              Cliente
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <template>
      <div>
        <b-modal
          id="modal-create-folder"
          ref="modal"
          title="Crear carpeta"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
          hide-footer
        >
          <form
            ref="form"
            @submit.stop.prevent="handleSubmit('modal-create-folder')"
          >
            <b-form-group
              label-for="name-input"
              invalid-feedback="Name is required"
              :state="nameState"
            >
              <b-form-input
                id="name-input"
                v-model="nameFolder"
                :state="nameState"
                placeholder="Ingresa el nombre de la carpeta"
                required
              ></b-form-input>
            </b-form-group>
            <div class="text-center">
              <b-button
                type="submit"
                variant="primary"
                :disabled="statusSend"
                :class="{
                  'btn-multiple-state btn-shadow btn-block': true,
                  'show-spinner': statusSend,
                  'show-fail': !statusSend && error
                }"
                ><span class="spinner d-inline-block">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
                </span>
                <span class="icon success">
                  <i class="simple-icon-check"></i>
                </span>
                <span class="icon fail">
                  <i class="simple-icon-exclamation"></i>
                </span>
                <span class="label" style="color: white;">Crear</span></b-button
              >
              <b-button
                type="button"
                variant="secondary"
                class="button-text btn-block"
                @click="$bvModal.hide('modal-create-folder')"
                >Cancelar</b-button
              >
            </div>
          </form>
        </b-modal>
      </div>
    </template>
    <template>
      <div>
        <b-modal
          id="modal-create-client"
          ref="modal"
          title="Crear Cliente"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
          hide-footer
        >
          <form
            ref="form"
            @submit.stop.prevent="handleSubmit('modal-create-client')"
          >
            <b-form-group
              label-for="name-input"
              invalid-feedback="Name is required"
              :state="nameState"
            >
              <b-form-input
                id="name-input"
                v-model="nameClient"
                :state="nameState"
                placeholder="Ingresa el nombre del cliente"
                required
              ></b-form-input>
            </b-form-group>
            <div class="text-center">
              <b-button
                type="submit"
                variant="primary"
                :disabled="statusSend"
                :class="{
                  'btn-multiple-state btn-shadow btn-block': true,
                  'show-spinner': statusSend,
                  'show-fail': !statusSend && error
                }"
                ><span class="spinner d-inline-block">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
                </span>
                <span class="icon success">
                  <i class="simple-icon-check"></i>
                </span>
                <span class="icon fail">
                  <i class="simple-icon-exclamation"></i>
                </span>
                <span class="label" style="color: white;">Crear</span></b-button
              >
              <b-button
                type="button"
                variant="secondary"
                class="button-text btn-block"
                @click="$bvModal.hide('modal-create-client')"
                >Cancelar</b-button
              >
            </div>
          </form>
        </b-modal>
      </div>
    </template>
    <template>
      <div>
        <b-modal
          id="modal-create-document"
          ref="modal"
          title="Crear documento"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
          hide-footer
        >
          <form
            ref="form"
            @submit.stop.prevent="handleSubmit('modal-create-document')"
          >
            <b-form-group
              label-for="name-input"
              invalid-feedback="Name is required"
              :state="nameState"
            >
              <b-form-input
                id="name-input"
                v-model="nameDocument"
                :state="nameState"
                placeholder="Ingresa el nombre del documento"
                required
              ></b-form-input>
            </b-form-group>
            <div class="text-center">
              <b-button
                type="submit"
                variant="primary"
                :disabled="statusSend"
                :class="{
                  'btn-multiple-state btn-shadow btn-block': true,
                  'show-spinner': statusSend,
                  'show-fail': !statusSend && error
                }"
              >
                <span class="spinner d-inline-block">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
                </span>
                <span class="icon success">
                  <i class="simple-icon-check"></i>
                </span>
                <span class="icon fail">
                  <i class="simple-icon-exclamation"></i>
                </span>
                <span class="label" style="color: white;">Crear</span></b-button
              >
              <b-button
                variant="secondary"
                class="button-text btn-block"
                @click="$bvModal.hide('modal-create-document') + resetModal()"
                >Cancelar</b-button
              >
            </div>
          </form>
        </b-modal>
      </div>
    </template>
  </div>
</template>
<script>
import axios from "axios";
// mapeo el store
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      statusSend: false,
      error: false,
      nameClient: "",
      nameFolder: "",
      nameDocument: "",
      nameState: null,
      submittedNames: [],
      currentParh: [],
      currentFolder: ""
    };
  },
  async created() {
    this.currentFolder = this.$route.params.uuid;
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.nameFolder = "";
      this.nameDocument = "";
      this.nameState = null;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit(modal) {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      // Push the name to submitted names

      if (modal == "modal-create-folder") {
        await this.crearCarpeta("modal-create-folder");
        return;
      } else if (modal == "modal-create-document") {
        await this.crearDocumento("modal-create-document");
        return;
      } else if (modal == "modal-create-client") {

        await this.crearCliente("modal-create-client");
      } else {
        return;
      }
    },

    async crearDocumento() {
      try {
        this.error = false;
        this.statusSend = true;
        let { data } = await axios.post("/document-files", {
          data: {
            title: this.nameDocument,
            folder:  this.currentFolder ?? null
          }
        });
        this.$bvToast.toast("Documento creado", {
          title: "Éxito",
          variant: "success",
          solid: true
        });

        this.$nextTick(() => {
          this.$bvModal.hide("modal-create-document");
        });
        // cambio la ruta
        this.$router.push({
          name: "file",
          params: { uuid: data.uuid }
        });
      } catch (error) {
        console.log(error);

        this.error = true;
        this.statusSend = false;
        console.log(error.response);

        this.$bvToast.toast("Error", {
          title: "Error",
          variant: "danger",
          solid: true
        });
      }
    },
    async crearCliente(modal) {
      try {
        this.error = false;
        this.statusSend = true;
        let { data } = await axios.post("/clients?folder=true", {
          data: {
            name: this.nameClient,
            folder:  this.currentFolder ?? null,
            
          }
        });
        this.$bvToast.toast("Cliente creado", {
          title: "Éxito",
          variant: "success",
          solid: true
        });
        this.$store.commit("setFolderCreated", true);
        this.$nextTick(() => {
          this.$bvModal.hide(modal);
        });
        // cambio la ruta
        
      } catch (error) {
        console.log(error);

        this.error = true;
        this.statusSend = false;
        console.log(error.response);

        this.$bvToast.toast("Error", {
          title: "Error",
          variant: "danger",
          solid: true
        });
      }
    },
    async crearCarpeta() {
      try {
        this.error = false;
        this.statusSend = true;
        let { data } = await axios.post("/folder-clients", {
          data: {
            name: this.nameFolder,
            path: this.currentParh,
            parentFolder: this.$route.params.uuid
          }
        });

        this.$bvToast.toast("Carpeta creada", {
          title: "Éxito",
          variant: "success",
          solid: true
        });

        // emito un evento al store para que el otro componente hermano sepa que se creo una carpeta y debe actualizar la lista

        this.$store.commit("setFolderCreated", true);
        this.statusSend = false;
        this.$nextTick(() => {
          this.$bvModal.hide("modal-create-folder");
        });
      } catch (error) {
        console.log(error);
        this.statusSend = false;
        this.error = true;

        this.$bvToast.toast("Error", {
          title: "Error",
          variant: "danger",
          solid: true
        });
      }
    }
  },
  computed: {
    templateBreadcrumb() {
      return this.getBreadcrumbs.map(item => {
        const breadcrumb = {
          text: item.title
        };

        // Agregar validaciones aquí
        if (item.title == "Home") {
          breadcrumb.to = { name : "createHome" };
        } else {
          breadcrumb.to = { name : "folder", params: { uuid: item._id } };
        }

        return breadcrumb;
      });
    },
    ...mapGetters(["getBreadcrumbs"])
  },

  watch: {
    // observo el cambio de ruta para actualizar this.currentFolder 

    $route(to, from) {
      this.currentFolder = to.params.uuid;
    }
  }
};
</script>
<style scoped>
.nav-items {
  height: 30px;
  padding: 20px;
  margin-top: 5px;
}
.button-text {
  background: transparent !important;
  color: black;
}
</style>
