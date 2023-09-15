<template>
  <div class="h-100">
    <router-view />
    
  </div>
</template>

<script>

import {mapActions, mapGetters,mapMutations} from 'vuex';

export default {

  methods:{

    ...mapMutations(["setMenuSidebar"])
  },
  computed:{
    ...mapGetters(['currentUser'])
  }

};
</script>
