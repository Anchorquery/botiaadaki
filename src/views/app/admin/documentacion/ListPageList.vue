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
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>

          <!-- A custom formatted column -->
          <template #cell(miniatura)="data">
            <b-img
              thumbnail
              fluid
              :src="
                !data.item.miniatura
                  ? '/assets/img/Front/categoria-placeholder.png'
                  : url + data.item.miniatura.url
              "
              :title="
                !data.item.miniatura ? 'placeholder' : data.item.miniatura.name
              "
            ></b-img>
          </template>
          <template #cell(nombre)="data">
            <p>{{ data.item.nombre }}</p>
          </template>
          <template #cell(status)="data">
            <b-badge pill variant="primary" v-if="data.item.status"
              >Activo</b-badge
            >
            <b-badge pill variant="danger" v-else>Desactivado</b-badge>
          </template>
          <template #cell(acciones)="data">
            <router-link
              v-if="$route.name == 'documentacion-temporadas'"
              tag="a"
              :to="{
                name: 'documentacion-temporada',
                params: { id: data.item.id },
              }"
              class="w-20 w-sm-100"
            >
              <b-badge pill variant="primary" style="cursor: pointer"
                ><div class="glyph">
                  <div class="glyph-icon simple-icon-pencil"></div></div
              ></b-badge>
            </router-link>
            <router-link
              v-else-if="$route.name == 'documentacion-temporada'"
              tag="a"
              :to="{
                name: 'documentacion-familia',
                params: { id: data.item.id },
              }"
              class="w-20 w-sm-100"
            >
              <b-badge pill variant="primary" style="cursor: pointer"
                ><div class="glyph">
                  <div class="glyph-icon simple-icon-pencil"></div></div
              ></b-badge>
            </router-link>
            <router-link
              v-else-if="$route.name == 'documentacion-familia'"
              tag="a"
              :to="{
                name: 'documentacion-categoria',
                params: { id: data.item.id },
              }"
              class="w-20 w-sm-100"
            >
              <b-badge pill variant="primary" style="cursor: pointer"
                ><div class="glyph">
                  <div class="glyph-icon simple-icon-pencil"></div></div
              ></b-badge>
            </router-link>
            <b-badge
              pill
              variant="danger"
              @click="emitRemove(data.item)"
              v-b-modal.modalbasic
              style="cursor: pointer"
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
          @change="(a) => changePage(a)"
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
import { url } from "@/constants/config";
export default {
  data() {
    return {
      url,
      fields: [
        // A virtual column that doesn't exist in items
        "#",
        // A column that needs custom formatting
        { key: "miniatura", label: "Miniatura" },
        { key: "nombre", label: "Nombre" ,sortable: true},
        { key: "status", label: "Status" ,sortable: true},
        { key: "acciones", label: "Acciones" },
      ],
    };
  },
  props: ["items", "lastPage", "perPage", "page", "changePage"],
  methods: {
    linkGen(pageNum) {
      return "#page-" + pageNum;
    },
    emitRemove(datos) {
      this.$emit("emitRemove", datos);
    },
  },
  computed: {},
  /*watch: {
    categoria_remove() {
      this.emitRemove();
    }
  }*/
};
</script>
