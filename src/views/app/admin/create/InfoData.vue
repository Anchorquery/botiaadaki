<template>
  <div>
    <nav-bar-create></nav-bar-create>
    <b-container class="mt-3">
      <div v-if="items.length">
        <b-table small :fields="fields" :items="items" responsive="sm">
          <!-- A virtual column -->
          <template #cell(uuid)="data">
            {{ data.item.uuid }}
          </template>

          <!-- A custom formatted column -->
          <template #cell(title)="data">
            <router-link
              :to="{ name: 'file', params: { uuid: data.item.uuid } }"
              v-if="data.item.typeFolder == 'not_folder'"
            >
              <font-awesome-icon :icon="['fas', 'file-lines']" style="color: #867b75;"/>

              <i>{{ data.item.title }}</i>
            </router-link>
            <span
              v-else
              @click="guardarMigasDePan(data.item.title, data.item.uuid)"
              style="cursor: pointer;"
            >
            <font-awesome-icon v-if="data.item.typeFolder == 'default'" :icon="['fas', 'folder']" style="color: #239bd3;" />
            <font-awesome-icon v-else :icon="['fas', 'user']" style="color: #239bd3;" />
              <i>{{ data.item.title }}</i>
            </span>
          </template>

          <!-- A virtual composite column -->
          <template #cell(items)="data">
            <i v-if="data.item.isFolder">{{ data.item.items }}</i>
            <p v-else>-</p>
          </template>

          <template #cell(words)="data">
            <i v-if="!data.item.isFolder">{{ data.item.words }}</i>
            <p v-else>-</p>
          </template>

          <!-- Optional default data cell scoped slot -->
          <template #cell(updatedAt)="data">
            <i>{{ data.item.updatedAt | moment("MMM D, hh:mm a") }}</i>
          </template>

          <template #cell(acciones)="data">
            <div class="botonera" >
              <p @click="addFavorite(data.item.uuid)" style="cursor: pointer;">
                <font-awesome-icon :icon="['fas', 'fa-star']" />
              </p>
              
              <p @click="deleteItem(data.item.uuid)" style="cursor: pointer;">
                <font-awesome-icon :icon="['fas', 'trash-can']" />
              </p>
            </div>
          </template>
        </b-table>
      </div>
      <div v-else>
        <b-row>
          <b-col cols="12">
            <b-card-text class="text-left">
              <p class="gray text-gray text-muted" style="font-size: 1.2em;">
                Tu carpeta raíz está vacía. Crea una
                <span style="cursor: pointer;" v-b-modal.modal-create-folder
                  >carpeta</span
                >, cliente o archivo para comenzar a trabajar.
              </p>
            </b-card-text>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import NavBarCreate from "@/components/Common/NavBarCreate";
import { PaginationModel, ItemsModel } from "@/models";
import { mapGetters } from "vuex";
import axios from 'axios';
export default {
  components: {
    "nav-bar-create": NavBarCreate
  },

  data() {
    return {
      title: "",
      items: [],
      idRoute: null,
      pagination: new PaginationModel(),
      fields: [
        // A virtual column that doesn't exist in items
        { key: "uuid", label: "Index", thClass: "d-none", tdClass: "d-none" },
        { key: "title", label: "Nombre" },
        { key: "items", label: "Items" },
        { key: "words", label: "Words" },
        { key: "updatedAt", label: "Modificado" },
        { key: "acciones", label: "" }
      ]
    };
  },
  async created() {
    this.idRoute = this.$route.params.uuid;
  },

  async mounted() {
    await this.getItems();
  },

  methods: {
    async deleteItem(uuid) {

      try {
        // pregunto si desea eliminar el archivo

        let confirm = await this.$bvModal.msgBoxConfirm(
          "¿Está seguro que desea eliminar este archivo?",
          {
            title: "Confirmar",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "Si",
            cancelTitle: "No",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        );



        if (!confirm) {
          return;
        }

        await axios.delete(`/document-files/${uuid}`);

        this.$bvToast.toast("Archivo eliminado correctamente", {
          title: "Éxito",
          variant: "success",
          solid: true
        });


        this.getItems();


      } catch (error) {
        console.log(error.response);
        console.log(error);
      }
    },


    async getItems() {
      try {
        if (this.$route.params.uuid == undefined) {
          var { data } = await axios.get("/document-files");
        } else {
          var { data } = await axios.get(
            `/document-files?_where[0][parent][uuid][$eq]=${this.$route.params.uuid}&_where[1][isFolder][$eq]=true`
          );
        }

        this.title = data.data.title;
        let uuid = this.$route.params.uuid;
        if (uuid == undefined) {
          uuid = null;
        }
        this.generadorMigasPan(uuid, this.title);
        this.$store.commit("setFolderTitle", { name: this.title, uuid: uuid });

        this.items = data.data.items.map(x => ItemsModel.fromJson(x));

        this.pagination = PaginationModel.fromJson(data.meta);
        this.$store.commit("setFolderCreated", false);
      } catch (error) {
        console.log(error);
      }
    },
    generadorMigasPan(uuid, title) {
      let migasDePan = this.getBreadcrumbs || [];

      // si la ruta a donde no tiene uuid entonces limpio las migas de pan

      if (uuid == undefined) {
        migasDePan = [
          {
            _id: uuid,
            title: "Home"
          }
        ];

        this.$store.commit("setBreadcrumbs", migasDePan);

        return;
      }

      // si la ruta a donde voy tiene uuid entonces verifico si la ruta ya existe en el array de migas de pan

      let existe = migasDePan.find(miga => miga._id === uuid);

      if (existe) {
        // si existe la ruta en el array de migas de pan, entonces elimino todas las rutas que estan despues de la ruta actual
        let index = migasDePan.findIndex(miga => miga._id === uuid);

        migasDePan.splice(index + 1, migasDePan.length - index);
      } else {
        migasDePan.push({ _id: uuid, title: title });
      }

      this.$store.commit("setBreadcrumbs", migasDePan);
    },
    guardarMigasDePan(titulo, uuid) {
      this.$router.push({ name: "folder", params: { uuid: uuid } });
      return;
      let migasDePan = JSON.parse(localStorage.getItem("breadcrumbs")) || [];

      // Crear un objeto para la nueva miga de pan
      const nuevaMigaDePan = { _id: uuid, name: titulo };

      // verificar si la ruta ya existe en el array

      let existe = migasDePan.find(miga => miga._id === uuid);

      if (existe) {
        // si existe la ruta en el array de migas de pan, entonces elimino todas las rutas que estan despues de la ruta actual
        let index = migasDePan.findIndex(miga => miga._id === uuid);

        migasDePan.splice(index + 1, migasDePan.length - index);
      } else {
        migasDePan.push(nuevaMigaDePan);
      }

      // Guardar las migas de pan actualizadas en el localStorage
      localStorage.setItem("breadcrumbs", JSON.stringify(migasDePan));

      // Redireccionar a la ruta de la carpeta
    }
  },
  computed: {
    ...mapGetters(["getFolderCreate", "getBreadcrumbs", "getAddTextDocument"])
  },
 
  watch: {
    // escucho el cambio de la variable en el store si es true actualizo la lista de carpetas si es false no hago nada

    getFolderCreate() {
      if (this.getFolderCreate) {
        this.getItems();
      }
    },

    // escucho el camnio de la ruta para actualizar el id de la ruta actual
    $route(to, from) {
      this.getItems();
    }
  }
};
</script>
<style>
.botonera {
  display: flex;
  align-items: baseline;
  justify-content: space-evenly;
}
</style>
