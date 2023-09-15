<template>
  <b-container>
    <template >
      <div class="loading"></div>
    </template>
  </b-container>

</template>
<script>
import { mapActions } from "vuex";



export default {
   async created(){
    if(this.$route.query._t){


      await this.autoLogin();
    }else{
      console.log('errror')
      
    }
    
  },

  methods: {
    ...mapActions(["autoLogin"]),
  }
};
</script>
