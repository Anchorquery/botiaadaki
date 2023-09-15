<template>
  <div>
    <b-row>
      <b-colxx xxs="12" class="mb-3">
        <b-table
          responsive
          thead-class="cabecera-tabla"
          thead-tr-class="text-center  padding"
          tbody-class="text-center"
          striped
          :fields="fields"
          :items="items"
        >
          <!-- A virtual column -->
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>

          <!-- A custom formatted column -->
          <template #cell(nombre)="data">
            <p>{{ data.item.nombre + " " + data.item.apellidos }}</p>
          </template>
          <template #cell(email)="data">
            <p>{{ data.item.email }}</p>
          </template>
          <template #cell(empresa)="data">
            <p>{{ data.item.empresa }}</p>
          </template>
          <template #cell(role)="data">
            <p>{{ data.item.role.name }}</p>
          </template>
          <template #cell(state)="data">
            <div v-if="esMaster || esSemi">
              <b-badge
                pill
                variant="primary"
                v-if="!data.item.blocked"
                v-b-modal.modaldeactivate
                style="cursor:pointer"
                @click="activarDesactivarMostrar(2, data.item)"
                >Activo</b-badge
              >
              <b-badge
                pill
                variant="danger"
                v-else
                style="cursor:pointer"
                v-b-modal.modalactivate
                @click="activarDesactivarMostrar(1, data.item)"
                >Desactivado</b-badge
              >
            </div>
            <div>
            </div>
          </template>
          <template #cell(acciones)="data">
            <router-link
              v-if="esMaster || esSemi || esDelegado"
              tag="a"
              :to="{ name: 'detalleUsuario', params: { id: data.item.id } }"
              class="w-20 w-sm-100"
            >
              <b-badge pill variant="primary" style="cursor:pointer"
                ><div class="glyph">
                  <div class="glyph-icon simple-icon-pencil"></div></div
              ></b-badge>
            </router-link>
            <router-link
              v-else
              tag="a"
              :to="{
                name: 'detalleUsuarioOnlyRead',
                params: { id: data.item.id }
              }"
              class="w-20 w-sm-100"
            >
              <b-badge pill variant="primary" style="cursor:pointer"
                ><div class="glyph">
                  <div class="glyph-icon simple-icon-eye"></div></div
              ></b-badge>
            </router-link>

            <b-badge
              v-if="
                data.item.id != $store.state.user.currentUser.id && esMaster
              "
              pill
              variant="danger"
              @click="borrarUser(data.item)"
              v-b-modal.modalbasic
              style="cursor:pointer;"
              ><div class="glyph">
                <div class="glyph-icon simple-icon-trash"></div></div
            ></b-badge>
          </template>
        </b-table>
      </b-colxx>
    </b-row>
    <b-row v-if="lastPage > 1">
      <b-colxx xxs="12">
        <b-pagination-nav
          :number-of-pages="lastPage"
          :link-gen="linkGen"
          :value="page"
          @change="a => changePage(a)"
          :per-page="perPage"
          align="center"
        >
          <template v-slot:next-text>
            <i class="simple-icon-arrow-right" />
          </template>
          <template v-slot:prev-text>
            <i class="simple-icon-arrow-left" />
          </template>
          <template v-slot:first-text>
            <i class="simple-icon-control-start" />
          </template>
          <template v-slot:last-text>
            <i class="simple-icon-control-end" />
          </template>
        </b-pagination-nav>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fields: [
        // A virtual column that doesn't exist in items
        { key: "index", label: "#" },
        // A column that needs custom formatting
        { key: "nombre", label: "Nombre", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "telefono", label: "Teléfono", sortable: true },
        { key: "empresa", label: "Empresa", sortable: true },
        { key: "role", label: "Rol", sortable: true },
        { key: "state", label: "Estado", sortable: true },
        { key: "acciones", label: "Acción" }
      ]
    };
  },
  props: ["items", "lastPage", "perPage", "page", "changePage"],
  methods: {
    linkGen(pageNum) {
      return "#page-" + pageNum;
    },
    fecha(date) {
      let fechaOld = new Date(date);
      return fechaOld.toLocaleDateString("es-ES");
    },
    activarDesactivarMostrar(accion, data) {
      if (!esMaster) {
        return;
      }
      this.$emit("user_activeDeactive", {
        accion: accion,
        idAD: data.id,
        nameAD: data.nombre
      });
    },
    borrarUser(data) {
      this.$emit("user_remove", data);
    }
  },
  computed: {
    ...mapGetters({ menu: "getMenuSidebar" }),
    ...mapGetters([
      "esMaster",
      "esDelegado",
      "esDistribuidor",
      "esTecnico",
      "logueado",
      "esSemi"
    ])
  }
};
</script>
