<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ title }}</h1>
      <div class="top-right-button-container">
       <!-- <b-button
          v-b-modal.modaladd
          variant="primary"
          size="lg"
          class="top-right-button"
        >AGREGAR USUARIO</b-button>-->
        <router-link v-if="esMaster || esSemi" class="btn btn-outline-primary btn-lg"  tag="button" :to="{name:'NewUser'}">
          AGREGAR USUARIO
          </router-link>
      </div>


      <div class="mb-2 mt-2">
        <b-button
          variant="empty"
          class="pt-0 pl-0 d-inline-block d-md-none"
          v-b-toggle.displayOptions
        >
          
          <i class="simple-icon-arrow-down align-middle" />
        </b-button>
        <b-collapse id="displayOptions" class="d-md-block">
          <div class="d-block d-md-inline-block pt-1">
            <b-dropdown
              id="ddown1"
              :text="`Ordenar Por: ${sort.label}`"
              variant="outline-dark"
              class="mr-1 float-md-left btn-group"
              size="xs"
            >
              <b-dropdown-item
                v-for="(order,index) in sortOptions"
                :key="index"
                @click="changeOrderBy(order)"
              >{{ order.label }}</b-dropdown-item>
            </b-dropdown>

            <div class="search-sm d-inline-block float-md-left mr-1 align-top">
              <b-input placeholder="Buscar" @input="(val) => searchChange(val)" />
            </div>
          </div>
          <div class="float-md-right pt-1">
            <span class="text-muted text-small mr-1 mb-2">{{from}}-{{to}} de {{ total }}</span>
            <b-dropdown
              id="ddown2"
              right
              :text="`${perPage}`"
              variant="outline-dark"
              class="d-inline-block"
              size="xs"
            >
              <b-dropdown-item
                v-for="(size,index) in pageSizes"
                :key="index"
                @click="changePageSize(size)"
              >{{ size }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-collapse>
      </div>
      <div class="separator mb-5" />
    </b-colxx>
  </b-row>
</template>
<script>
import { mapGetters } from "vuex";


export default {

  props: [
    "title",

    "loadItems",
    "changeOrderBy",
    "changePageSize",
    "sort",
    "searchChange",
    "from",
    "to",
    "total",
    "perPage"
  ],
  data() {
    return {
      relistar: false,
      sortOptions: [
        {
          column: "nombre",
          label: "Nombre"
        },
        {
          column: "state",
          label: "Estado"
        }
      ],
      pageSizes: [6, 12, 24,50]
    };
  },
  computed:{

   ...mapGetters({
                  'esMaster': "esMaster",
                  'esDelegado': "esDelegado",
                  'esTecnico': "esTecnico",
                  'esDistribuidor': "esDistribuidor",
                  'esSemi': 'esSemi','esDcoordinador':'esDcoordinador'}),
  },

  watch: {
    relistar: function() {
      let me = this;
      if (me.relistar) {
        me.loadItems();
        me.relistar = false;
      } 
      
      
    }
  }
};
</script>