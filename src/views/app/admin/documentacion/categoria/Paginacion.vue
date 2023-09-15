<template>
  <div>
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
